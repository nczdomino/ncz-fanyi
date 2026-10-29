/**
 * tools/generate-missing-14-grammar.js
 * 
 * Consolidates all 14 missing advanced HSK grammar detail items (Batches 1 & 2)
 * into:
 *   - js/data/hsk_grammar_generated_samples.json (81 total items)
 *   - js/data/grammar-data.js
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '..');
const samplesJsonPath = path.join(rootDir, 'js/data/hsk_grammar_generated_samples.json');
const bundlePath = path.join(rootDir, 'js/data/grammar-data.js');
const catalogPath = path.join(rootDir, 'js/data/hsk_catalog_2.0_3.0_all_levels.json');

const p1 = require('./missing-grammar-part1.js');
const p2 = require('./missing-grammar-part2.js');

const all14 = [...p1, ...p2];
assert.strictEqual(all14.length, 14, 'Must supply exactly 14 items');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const currentSamples = JSON.parse(fs.readFileSync(samplesJsonPath, 'utf8'));

console.log(`Initial samples count: ${currentSamples.length}`);

// Deduplicate / Merge
const existingMap = new Map();
currentSamples.forEach(s => existingMap.set(s.id, s));

all14.forEach(item => {
  existingMap.set(item.id, item);
});

const mergedSamples = Array.from(existingMap.values());
assert.strictEqual(mergedSamples.length, 81, 'Total merged samples must be exactly 81');

// Verify that all 81 catalog items now have a matching detailed sample!
const catalogIds = catalog.map(c => c.id);
const sampleIdSet = new Set(mergedSamples.map(s => s.id));

catalogIds.forEach(id => {
  assert(sampleIdSet.has(id), `Missing detail for catalog id: ${id}`);
});

console.log(`✅ All 81 catalog items now have 100% full detailed blueprints!`);

// Write to JSON
fs.writeFileSync(samplesJsonPath, JSON.stringify(mergedSamples, null, 2), 'utf8');
console.log(`✅ Saved ${mergedSamples.length} samples to ${samplesJsonPath}`);

// Update grammar-data.js bundle
const bundleContent = `/**
 * grammar-data.js
 * 
 * Auto-generated and consolidated HSK Grammar datasets for Halou Chinese:
 * - HSK_GRAMMAR_CATALOG: 81 points across HSK 1 -> HSK 7-9 (100% complete)
 * - HSK_GRAMMAR_SAMPLES: 81 detailed rule blueprints with rich pedagogical metadata (100% complete)
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
  var HSK_GRAMMAR_CATALOG = ${JSON.stringify(catalog)};

  var HSK_GRAMMAR_SAMPLES = ${JSON.stringify(mergedSamples)};

  return {
    HSK_GRAMMAR_CATALOG: HSK_GRAMMAR_CATALOG,
    HSK_GRAMMAR_SAMPLES: HSK_GRAMMAR_SAMPLES
  };
});
`;

fs.writeFileSync(bundlePath, bundleContent, 'utf8');
console.log(`✅ Updated offline bundle in ${bundlePath}`);
console.log(`🎉 100% of all 81 HSK Grammar lessons successfully merged and bundled!`);
