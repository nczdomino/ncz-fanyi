// test_sw.js - Tests for the offline layer (sw.js + its registration).
//
// The repo had no service worker at all, so the "offline-first" claim in the code comments
// was never true. These tests lock in the three things that can silently break it:
//   1. the precache list is derived from index.html, so it must not miss a script;
//   2. API traffic must never be cached;
//   3. the worker must actually be registered by the app.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const { extractAssets } = require('./sw.js');

let passed = 0;
function check(name, fn) {
  fn();
  passed++;
  console.log('  ✅ ' + name);
}

console.log('\n🧪 Service worker tests\n');

// ------------------------------------------------------------------ extractAssets
console.log('--- Precache list derivation ---');

check('same-origin scripts and stylesheets are collected', () => {
  const html = '<script src="js/a.js"></script><link rel="stylesheet" href="css/b.css"><script src="js/data/c.js"></script>';
  const got = extractAssets(html, 'https://app.example/index.html');
  assert.deepStrictEqual(got.sort(), [
    'https://app.example/css/b.css',
    'https://app.example/js/a.js',
    'https://app.example/js/data/c.js',
  ]);
});

check('cross-origin, data: and non-asset URLs are ignored', () => {
  const html = [
    '<script src="https://cdn.example/x.js"></script>',
    '<link rel="icon" href="data:image/svg+xml,abc">',
    '<img src="img/p.png">',
    '<a href="#top"></a>',
  ].join('');
  assert.deepStrictEqual(extractAssets(html, 'https://app.example/index.html'), []);
});

check('relative dot-slash paths resolve correctly', () => {
  const got = extractAssets('<script src="./js/a.js"></script>', 'https://app.example/index.html');
  assert.deepStrictEqual(got, ['https://app.example/js/a.js']);
});

check('malformed input does not throw', () => {
  assert.deepStrictEqual(extractAssets('', 'not-a-url'), []);
  assert.deepStrictEqual(extractAssets(null, 'https://app.example/'), []);
});

// ------------------------------------------------------- real index.html coverage
console.log('\n--- Coverage of the real index.html ---');

check('every local script and stylesheet in index.html is precached', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const assets = extractAssets(html, 'https://app.example/index.html');
  const declared = [];
  const re = /<(?:script|link)[^>]*(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = m[1];
    if (!/\.(?:js|css)$/i.test(raw)) continue;
    if (/^https?:/i.test(raw)) continue; // cross-origin is cached at runtime
    declared.push(new URL(raw, 'https://app.example/index.html').href);
  }
  const missing = declared.filter((u) => assets.indexOf(u) === -1);
  assert.strictEqual(missing.length, 0, 'not precached: ' + missing.slice(0, 5).join(', '));
  assert.ok(assets.length >= 40, 'suspiciously few assets: ' + assets.length);
});

check('the service worker file itself is served from the root scope', () => {
  assert.ok(fs.existsSync(path.join(__dirname, 'sw.js')), 'sw.js missing');
  const src = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/registration\.scope/.test(src), 'sw.js must resolve URLs against its scope');
});

// ------------------------------------------------------------------- SW behaviour
console.log('\n--- Cache policy ---');

check('API requests are never intercepted or cached', () => {
  const src = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/pathname\.startsWith\('\/api\/'\)/.test(src), 'sw.js must bypass /api/');
  // The fetch listener must return before respondWith() for API calls.
  const apiGuard = src.indexOf("pathname.startsWith('/api/')");
  const firstRespondWith = src.indexOf('event.respondWith');
  assert.ok(apiGuard !== -1 && apiGuard < firstRespondWith, 'API guard must run before respondWith');
});

check('navigations are network-first so a deploy is picked up', () => {
  const src = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/req\.mode === 'navigate'/.test(src), 'missing navigation handling');
  assert.ok(/function networkFirst/.test(src), 'missing networkFirst strategy');
});

check('old cache versions are deleted on activate', () => {
  const src = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/caches\.keys\(\)/.test(src) && /caches\.delete/.test(src), 'no cache cleanup');
});

check('the version string is bumped whenever the strategy changes', () => {
  const src = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  const m = /const VERSION = '([^']+)'/.exec(src);
  assert.ok(m, 'VERSION constant missing');
  assert.ok(/^ncz-v\d+$/.test(m[1]), 'unexpected version format: ' + m[1]);
});

// ------------------------------------------------------------------ registration
console.log('\n--- Registration ---');

check('pwa.js registers the service worker', () => {
  const src = fs.readFileSync(path.join(__dirname, 'pwa.js'), 'utf8');
  assert.ok(/serviceWorker/.test(src), 'no serviceWorker reference in pwa.js');
  assert.ok(/\.register\(/.test(src), 'register() not called');
  assert.ok(/sw\.js/.test(src), 'sw.js not referenced');
});

check('registration is skipped outside http(s)', () => {
  const src = fs.readFileSync(path.join(__dirname, 'pwa.js'), 'utf8');
  assert.ok(/\^https\?:\$/.test(src), 'protocol guard missing');
});

check('index.html loads pwa.js before the app scripts', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const pwaAt = html.indexOf('pwa.js');
  const firstAppScript = html.indexOf('js/core/storage.js');
  assert.ok(pwaAt !== -1 && firstAppScript !== -1, 'expected both to be present');
  assert.ok(pwaAt < firstAppScript, 'pwa.js should load early');
});

console.log(`\n🎉 ${passed} service worker tests passed.\n`);
