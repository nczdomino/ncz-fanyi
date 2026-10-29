// pwa.js - PWA manifest verification and Service Worker registration
(function() {
  try {
    // If manifest link is not present, add it pointing to static manifest.json
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = 'manifest.json';
      document.head.appendChild(link);
    }
  } catch(e) {
    console.warn("Manifest check warning", e);
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
