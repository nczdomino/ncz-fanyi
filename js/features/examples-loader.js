// js/features/examples-loader.js - Lazy loader for the two large example corpora
// Dependencies: js/features/examples.js (resetWordExamplesIndex)
//
// Why this is lazy:
//   js/data/examples.js (~211 KB) and js/data/examples-corpus.js (~580 KB) are only
//   needed when a word sheet is opened. Shipping them on first paint cost ~790 KB for a
//   screen most visitors never reach, so they are injected on demand instead.
//
// The service worker's stale-while-revalidate rule caches these scripts after the first
// open, so the second word sheet is instant and still works offline.

const EXAMPLES_DATA = {
  files: ['js/data/examples.js', 'js/data/examples-corpus.js'],
  loaded: false,
  loading: null,
  error: null,
};

function loadExamplesScript(src) {
  return new Promise(function (resolve, reject) {
    const existing = document.querySelector('script[data-examples-src="' + src + '"]');
    if (existing) {
      if (existing.getAttribute('data-loaded') === '1') return resolve(true);
      existing.addEventListener('load', function () { resolve(true); });
      existing.addEventListener('error', function () { reject(new Error('failed to load ' + src)); });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false; // preserve declaration order: examples.js before the corpus
    script.setAttribute('data-examples-src', src);
    script.onload = function () {
      script.setAttribute('data-loaded', '1');
      resolve(true);
    };
    script.onerror = function () { reject(new Error('failed to load ' + src)); };
    document.head.appendChild(script);
  });
}

/**
 * Download and evaluate both example corpora. Safe to call repeatedly; concurrent calls
 * share one promise.
 * @returns {Promise<boolean>} true when the data is available
 */
function ensureExamplesData() {
  if (EXAMPLES_DATA.loaded) return Promise.resolve(true);
  if (EXAMPLES_DATA.loading) return EXAMPLES_DATA.loading;

  EXAMPLES_DATA.loading = EXAMPLES_DATA.files.reduce(function (chain, src) {
    return chain.then(function () { return loadExamplesScript(src); });
  }, Promise.resolve())
    .then(function () {
      EXAMPLES_DATA.loaded = true;
      EXAMPLES_DATA.error = null;
      // The index may have been built while the data was still absent (an empty map).
      if (typeof resetWordExamplesIndex === 'function') resetWordExamplesIndex();
      return true;
    })
    .catch(function (err) {
      EXAMPLES_DATA.error = err;
      console.warn('Example corpus unavailable:', err && err.message);
      return false;
    })
    .finally(function () {
      EXAMPLES_DATA.loading = null;
    });

  return EXAMPLES_DATA.loading;
}

/** Warm the corpus during idle time without blocking the current interaction. */
function prefetchExamplesData() {
  if (EXAMPLES_DATA.loaded || EXAMPLES_DATA.loading) return;
  if (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData) return;
  const run = function () { ensureExamplesData(); };
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 2500);
  }
}
if (typeof window !== 'undefined') {
  window.EXAMPLES_DATA = EXAMPLES_DATA;
  window.ensureExamplesData = ensureExamplesData;
  window.prefetchExamplesData = prefetchExamplesData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXAMPLES_DATA, ensureExamplesData, prefetchExamplesData };
}
