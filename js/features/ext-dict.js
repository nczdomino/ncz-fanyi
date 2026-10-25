// js/features/ext-dict.js - Lazy loader for the optional CC-CEDICT extended dictionary
// Dependencies: js/features/dict-scoring.js (DICT_SCORING.setExtendedDictionary)
//
// Why this is lazy and opt-in:
//   js/data/cedict.json is ~7 MB raw (~2.9 MB over the wire once the host gzips it).
//   Downloading that on first paint would be hostile to mobile users, so it is fetched
//   only when a search finds nothing useful, and then cached by the service worker.
//
// Data: CC-CEDICT (https://cc-cedict.org/) - CC BY-SA 4.0. See js/data/cedict-LICENSE.txt.

const EXT_DICT = {
  url: 'js/data/cedict.json',
  loaded: false,
  loading: null,
  count: 0,
  error: null,
};

/**
 * Fetch and register the extended dictionary. Safe to call repeatedly.
 * @returns {Promise<boolean>} true when the dictionary is available
 */
function ensureExtDict() {
  if (EXT_DICT.loaded) return Promise.resolve(true);
  if (EXT_DICT.loading) return EXT_DICT.loading;

  EXT_DICT.loading = fetch(EXT_DICT.url, { cache: 'force-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      if (!data || typeof data !== 'object') throw new Error('invalid payload');
      if (typeof DICT_SCORING === 'undefined' || !DICT_SCORING.setExtendedDictionary) {
        throw new Error('dict-scoring.js is not loaded');
      }
      const count = DICT_SCORING.setExtendedDictionary(data);
      if (!count) throw new Error('empty payload');
      EXT_DICT.loaded = true;
      EXT_DICT.count = count;
      EXT_DICT.error = null;
      return true;
    })
    .catch(function (err) {
      EXT_DICT.error = err;
      EXT_DICT.loading = null;
      console.warn('Extended dictionary unavailable:', err && err.message);
      return false;
    });

  return EXT_DICT.loading;
}

if (typeof window !== 'undefined') {
  window.EXT_DICT = EXT_DICT;
  window.ensureExtDict = ensureExtDict;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXT_DICT, ensureExtDict };
}
