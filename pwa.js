// pwa.js - Dynamic PWA manifest blob injection - Dependencies: none
(function() {
  try {
    const origin = (window.location && window.location.origin && window.location.origin.startsWith('http')) 
      ? window.location.origin 
      : '';
    const pathname = (window.location && window.location.pathname) ? window.location.pathname : '/';
    const startUrl = origin ? (origin + pathname) : '.';

    const manifest = {
      name: "Halou – Chinese Dictionary & Smart Translator with Pinyin",
      short_name: "Halou",
      description: "The ultimate Chinese smart dictionary and context-aware translator with instant Pinyin annotation for learners and readers.",
      author: "聂诚忠 (Nie Thanh Trung)",
      start_url: startUrl,
      scope: origin ? (origin + pathname) : './',
      display: "standalone",
      orientation: "any",
      background_color: "#F8F9FA",
      theme_color: "#E8344E",
      icons: [
        {
          src: (function() { try { return new URL('assets/icons/icon-192.png', document.baseURI || window.location.href).href; } catch(e) { return 'assets/icons/icon-192.png'; } })(),
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: (function() { try { return new URL('assets/icons/icon-512.png', document.baseURI || window.location.href).href; } catch(e) { return 'assets/icons/icon-512.png'; } })(),
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    };
    const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(blob);
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = manifestUrl;
    document.head.appendChild(link);
  } catch(e) {
    console.warn("Manifest injection warning", e);
  }
})();

// --- Service worker registration (makes offline use real) ---
// Kept separate from the manifest blob above so a registration failure can never stop
// the manifest from being injected.
(function registerServiceWorker() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  if (typeof location === 'undefined' || !/^https?:$/.test(location.protocol)) return;
  window.addEventListener('load', function () {
    var swUrl;
    try {
      swUrl = new URL('sw.js', document.baseURI).href;
    } catch (e) {
      return;
    }
    navigator.serviceWorker.register(swUrl, { scope: './' })
      .catch(function (err) { console.warn('Service worker registration failed', err); });
  });
})();
