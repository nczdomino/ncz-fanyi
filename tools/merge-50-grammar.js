/**
 * tools/merge-50-grammar.js
 * 
 * Merges all 50 new grammar lessons (Batches 1-6) into:
 * - js/data/hsk_grammar_generated_samples.json (Total will be 67)
 * - js/data/grammar-data.js
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const b1 = require('./data-batch-1.js');
const b2 = require('./data-batch-2.js');
const b3 = require('./data-batch-3.js');
const b4 = require('./data-batch-4.js');
const b5 = require('./data-batch-5.js');
const b6 = require('./data-batch-6.js');

const new50 = [...b1, ...b2, ...b3, ...b4, ...b5, ...b6];
assert.strictEqual(new50.length, 50, 'Exactly 50 items must be provided');

const samplesPath = path.join(__dirname, '../js/data/hsk_grammar_generated_samples.json');
const bundlePath = path.join(__dirname, '../js/data/grammar-data.js');
const catalogPath = path.join(__dirname, '../js/data/hsk_catalog_2.0_3.0_all_levels.json');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const currentSamples = JSON.parse(fs.readFileSync(samplesPath, 'utf8'));

console.log(`Current samples count: ${currentSamples.length}`);

// Check uniqueness
const existingIds = new Set(currentSamples.map(x => x.id));
new50.forEach(item => {
  if (existingIds.has(item.id)) {
    throw new Error(`Duplicate id detected: ${item.id}`);
  }
  existingIds.add(item.id);
});

// Merge
const mergedSamples = [...currentSamples, ...new50];
assert.strictEqual(mergedSamples.length, 67, 'Total merged samples must be 67');

// Save JSON
fs.writeFileSync(samplesPath, JSON.stringify(mergedSamples, null, 2), 'utf8');
console.log(`✅ Saved ${mergedSamples.length} total samples into ${samplesPath}`);

// Update grammar-data.js bundle
const bundleContent = `/**
 * grammar-data.js
 * 
 * Auto-generated and consolidated HSK Grammar datasets for Halou Chinese:
 * - HSK_GRAMMAR_CATALOG: 81 points across HSK 1 -> HSK 7-9
 * - HSK_GRAMMAR_SAMPLES: ${mergedSamples.length} detailed rule blueprints with rich pedagogical metadata
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
  var HSK_GRAMMAR_CATALOG = ${JSON.stringify(catalog, null, 2)};

  var HSK_GRAMMAR_SAMPLES = ${JSON.stringify(mergedSamples, null, 2)};

  return {
    HSK_GRAMMAR_CATALOG: HSK_GRAMMAR_CATALOG,
    HSK_GRAMMAR_SAMPLES: HSK_GRAMMAR_SAMPLES
  };
});
`;

fs.writeFileSync(bundlePath, bundleContent, 'utf8');
console.log(`✅ Updated offline bundle in ${bundlePath}`);
console.log(`🎉 50 new grammar lessons successfully merged! Total detailed lessons: ${mergedSamples.length}!`);
