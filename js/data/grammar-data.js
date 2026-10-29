/**
 * grammar-data.js
 * 
 * HSK Grammar datasets for Halou Chinese.
 * Cleaned and ready for custom grammar system dataset import.
 * 
 * Compatible with CommonJS (Node.js/testing) and direct Browser <script> tags.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var data = factory();
    root.HSK_GRAMMAR_CATALOG = data.HSK_GRAMMAR_CATALOG;
    root.HSK_GRAMMAR_SAMPLES = data.HSK_GRAMMAR_SAMPLES;
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  var HSK_GRAMMAR_CATALOG = [];
  var HSK_GRAMMAR_SAMPLES = [];

  return {
    HSK_GRAMMAR_CATALOG: HSK_GRAMMAR_CATALOG,
    HSK_GRAMMAR_SAMPLES: HSK_GRAMMAR_SAMPLES
  };
});
