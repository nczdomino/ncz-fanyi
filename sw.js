// sw.js - Service worker: makes the "offline-first" claim in the codebase actually true.
//
// Before this file there was no service worker anywhere in the repo, so installing the PWA
// gained nothing: every visit re-downloaded ~2 MB of dictionary data and the app broke the
// moment the network did.
//
// Strategy
//   /api/*            -> network only (never cache AI/OCR responses)
//   navigations       -> network first, fall back to the cached shell
//   same-origin JS/CSS-> stale-while-revalidate (fast start, updates on next visit)
//   cross-origin      -> cache first (fonts, CDN libraries)
//
// The precache list is derived from index.html at install time, so adding a <script> tag
// does not require editing this file.

// Guarded so the file can also be required from Node in test_sw.js.
const IS_SW = typeof self !== 'undefined' && typeof self.addEventListener === 'function';

const VERSION = 'hl-v1.4.7'; // bumped: audio cache strategy added
const SHELL_CACHE = VERSION + '-shell';
const RUNTIME_CACHE = VERSION + '-runtime';
const AUDIO_CACHE = VERSION + '-audio';
const MAX_RUNTIME_ENTRIES = 120;
// TTS clips are ~10 KB each and are the one thing users replay constantly, so they get
// their own cache with a much higher ceiling.
const MAX_AUDIO_ENTRIES = 200;
const AUDIO_HOSTS = ['dict.youdao.com', 'fanyi.baidu.com', 'translate.google.com'];

const SHELL_URLS = ['./', './index.html'];

if (IS_SW) self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    // The app shell must be cached even if a single asset fails below.
    await Promise.allSettled(SHELL_URLS.map((u) => cache.add(new URL(u, self.registration.scope).href)));

    // Parse index.html and precache every local script/stylesheet it references.
    try {
      const indexUrl = new URL('./index.html', self.registration.scope).href;
      const res = await fetch(indexUrl, { cache: 'no-cache' });
      if (res.ok) {
        const html = await res.text();
        const assets = extractAssets(html, indexUrl);
        await Promise.allSettled(assets.map((u) => cache.add(u)));
      }
    } catch (e) {
      // A partial precache still leaves the app usable; do not fail the install.
    }

    await self.skipWaiting();
  })());
});

if (IS_SW) self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE && k !== AUDIO_CACHE)
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

if (IS_SW) self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

if (IS_SW) self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }

  // Never cache API traffic: these are personalised, rate-limited and often uncacheable.
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) return;

  // App navigation: prefer the network so a deploy is picked up immediately, but fall
  // back to the cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // TTS audio: dedicated cache so replay works offline and never evicts app assets.
  if (url.protocol === 'https:' && AUDIO_HOSTS.indexOf(url.hostname) !== -1) {
    event.respondWith(audioCacheFirst(req, url));
    return;
  }

  // Cross-origin: fonts and CDN scripts rarely change, so cache-first is safe.
  if (url.protocol === 'https:') {
    event.respondWith(cacheFirst(req));
  }
});

// --------------------------------------------------------------------- helpers
function extractAssets(html, baseUrl) {
  const out = new Set();
  let base;
  try {
    base = new URL(baseUrl);
  } catch (e) {
    return [];
  }
  const re = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(String(html || ''))) !== null) {
    const raw = m[1];
    if (!raw || raw.startsWith('data:') || raw.startsWith('blob:') || raw.startsWith('#')) continue;
    if (!/\.(?:js|css)(?:\?|$)/i.test(raw)) continue;
    try {
      const abs = new URL(raw, base);
      if (abs.origin === base.origin) out.add(abs.href);
    } catch (e) { /* ignore malformed URLs */ }
  }
  return [...out];
}

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(new URL('./index.html', self.registration.scope).href, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = (await cache.match(request)) ||
      (await cache.match(new URL('./index.html', self.registration.scope).href)) ||
      (await cache.match(new URL('./', self.registration.scope).href));
    if (cached) return cached;
    return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  if (cached) return cached;
  const fresh = await network;
  if (fresh) return fresh;
  return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res && (res.ok || res.type === 'opaque')) {
      await cache.put(request, res.clone());
      await trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
    }
    return res;
  } catch (e) {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

// Media elements may send Range headers (which produce 206 responses that cannot be
// replayed as a full clip), so clips are stored and matched by plain URL instead.
async function audioCacheFirst(request, url) {
  const cache = await caches.open(AUDIO_CACHE);
  const cached = await cache.match(url.href);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res && (res.ok || res.type === 'opaque')) {
      await cache.put(url.href, res.clone());
      await trimCache(AUDIO_CACHE, MAX_AUDIO_ENTRIES);
    }
    return res;
  } catch (e) {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

async function trimCache(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
}

// Exposed for the Node test in test_sw.js (service worker globals are absent there).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { extractAssets, AUDIO_HOSTS, AUDIO_CACHE, MAX_AUDIO_ENTRIES };
}
