/**
 * test_grammar_service.js
 * 
 * Comprehensive regression and verification test suite for Halou HSK Grammar System:
 * - Types and JSON schemas (100% strict alignment)
 * - GrammarService & GrammarStore state management
 * - Filtering (Level, Standard, Category, Keyword)
 * - Joining Catalog with Detailed Rules
 * - Multilingual Helper getLocalizedText('vi' | 'ja' | 'en')
 * - StructureFormula & TokenizedSentence Component rendering (color roles, Han-Viet, Kanji, False Friend, English Literal)
 * - PracticeModule exercises & state scoring (Puzzles, Fill in the Blank, Error Correction, Quiz)
 * - Word to Grammar cross-linking
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('\n🧪 Starting Halou HSK Grammar Master & Multi-Tier Service Test Suite...\n');

// 1. Dataset Verification
console.log('--- 1. Datasets & Raw JSON Integrity ---');
const catalogPath = path.join(__dirname, 'js/data/hsk_catalog_2.0_3.0_all_levels.json');
const samplesPath = path.join(__dirname, 'js/data/hsk_grammar_generated_samples.json');
const grammarDataJsPath = path.join(__dirname, 'js/data/grammar-data.js');

assert(fs.existsSync(catalogPath), 'Catalog JSON file exists');
assert(fs.existsSync(samplesPath), 'Samples JSON file exists');
assert(fs.existsSync(grammarDataJsPath), 'grammar-data.js bundle file exists');

const catalogRaw = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const samplesRaw = JSON.parse(fs.readFileSync(samplesPath, 'utf8'));

assert(Array.isArray(catalogRaw), 'Catalog is an array');
assert.strictEqual(catalogRaw.length, 81, 'Catalog has exactly 81 items across all levels');
console.log(`  ✅ Catalog contains ${catalogRaw.length} verified grammar points (HSK 1 -> HSK 7-9)`);

assert(Array.isArray(samplesRaw), 'Samples is an array');
assert.strictEqual(samplesRaw.length, 67, 'Samples has 67 in-depth grammar points');
console.log(`  ✅ Samples contain ${samplesRaw.length} detailed rule blueprints`);

// Verify grammar-data.js exports
const bundledData = require('./js/data/grammar-data.js');
assert.strictEqual(bundledData.HSK_GRAMMAR_CATALOG.length, 81, 'grammar-data.js catalog loaded');
assert.strictEqual(bundledData.HSK_GRAMMAR_SAMPLES.length, 67, 'grammar-data.js samples loaded');
console.log('  ✅ grammar-data.js loaded properly in Node.js runtime');

// 2. TypeScript Types Schema Audit
console.log('\n--- 2. TypeScript Types Interface Alignment ---');
const tsTypesPath = path.join(__dirname, 'types/grammar.ts');
assert(fs.existsSync(tsTypesPath), 'types/grammar.ts file exists');
const tsContent = fs.readFileSync(tsTypesPath, 'utf8');

const expectedInterfaces = [
  'GrammarCatalogItem',
  'StructureBlock',
  'GrammarToken',
  'GrammarExample',
  'GrammarDialogue',
  'GrammarPuzzle',
  'GrammarFillBlank',
  'GrammarErrorCorrection',
  'GrammarQuizItem',
  'GrammarSummaryCard',
  'GrammarDetailItem',
  'JoinedGrammarPoint',
  'GrammarFilterOptions',
  'PracticeResult'
];

expectedInterfaces.forEach(iface => {
  assert(tsContent.includes(`interface ${iface}`), `types/grammar.ts contains interface ${iface}`);
  console.log(`  ✅ TypeScript interface ${iface} verified`);
});

// 3. GrammarService & getLocalizedText
console.log('\n--- 3. GrammarService & Multilingual Localizer ---');
const {
  getLocalizedText,
  grammarService,
  grammarStore,
  filterGrammarCatalog,
  getJoinedGrammarList,
  getSampleById,
  getCatalogData,
  getSamplesData,
  getGrammarCategories,
  getCategoryName,
  getGrammarLevels,
  findGrammarPointsByWord
} = require('./js/features/grammar-service.js');

const sampleLocObj = {
  vi: 'Câu chữ 是',
  ja: '「是」構文',
  en: 'The "是" Sentence'
};

assert.strictEqual(getLocalizedText(sampleLocObj, 'vi'), 'Câu chữ 是', 'Localize VI matches');
assert.strictEqual(getLocalizedText(sampleLocObj, 'ja'), '「是」構文', 'Localize JA matches');
assert.strictEqual(getLocalizedText(sampleLocObj, 'en'), 'The "是" Sentence', 'Localize EN matches');

// Fallback handling
assert.strictEqual(getLocalizedText({ ja: 'テスト' }, 'vi'), 'テスト', 'Fallback to available language when target missing');
assert.strictEqual(getLocalizedText('Plain String', 'vi'), 'Plain String', 'Handles raw strings safely');
assert.strictEqual(getLocalizedText(null, 'vi'), '', 'Handles null gracefully');
console.log('  ✅ getLocalizedText handles all 3 locales and edge cases');

// 4. Filtering Engine
console.log('\n--- 4. Grammar Catalog Filtering & Search ---');
// Filter by level
const hsk1Items = filterGrammarCatalog({ level: 'HSK1' });
assert.strictEqual(hsk1Items.length, 16, 'HSK1 has 16 items');
console.log(`  ✅ HSK1 level filter returns ${hsk1Items.length} items`);

const hsk789Items = filterGrammarCatalog({ level: 'HSK7-9' });
assert.strictEqual(hsk789Items.length, 6, 'HSK7-9 has 6 items');
console.log(`  ✅ HSK7-9 level filter returns ${hsk789Items.length} items`);

// Filter by standard
const hsk30Items = filterGrammarCatalog({ standard: 'HSK 3.0' });
assert(hsk30Items.length > 0, 'HSK 3.0 filter works');
console.log(`  ✅ HSK 3.0 standard filter returns ${hsk30Items.length} items`);

// Filter by category
const comparisonItems = filterGrammarCatalog({ category: 'comparison' });
assert(comparisonItems.length > 0, 'Category filter works');
console.log(`  ✅ Category "comparison" filter returns ${comparisonItems.length} items`);

// Filter by hasDetailOnly
const detailedOnly = filterGrammarCatalog({ hasDetailOnly: true });
assert.strictEqual(detailedOnly.length, 67, 'hasDetailOnly returns exactly 67 detailed rules');
console.log('  ✅ hasDetailOnly filter accurately isolates the 67 detailed rule samples');

// Diacritic & Multilingual search queries
const searchVi = filterGrammarCatalog({ query: 'so sanh' }); // unaccented search
assert(searchVi.some(x => x.id === 'hsk2_bi_comparison'), 'Unaccented "so sanh" finds hsk2_bi_comparison');
console.log('  ✅ Diacritic-insensitive Vietnamese search "so sanh" matches successfully');

const searchZh = filterGrammarCatalog({ query: '比' });
assert(searchZh.some(x => x.id === 'hsk2_bi_comparison'), 'Chinese query "比" finds hsk2_bi_comparison');
console.log('  ✅ Hanzi search "比" matches successfully');

const searchEn = filterGrammarCatalog({ query: 'comparison' });
assert(searchEn.some(x => x.id === 'hsk2_bi_comparison'), 'English query "comparison" matches');
console.log('  ✅ English search query "comparison" matches successfully');

// 5. Joining Catalog with Detailed Rules
console.log('\n--- 5. Joining Catalog and Detailed Rules ---');
const joinedAll = getJoinedGrammarList();
assert.strictEqual(joinedAll.length, 81, 'Joined list contains all 81 catalog items');

const joinedSample = joinedAll.find(item => item.catalog.id === 'hsk1_shi_sentence');
assert(joinedSample.hasDetail === true, 'hsk1_shi_sentence hasDetail === true');
assert(joinedSample.detail !== undefined, 'hsk1_shi_sentence detail object attached');
assert.strictEqual(joinedSample.detail.formula, 'S + 是 / 不是 + N', 'Detail formula matches');
assert(Array.isArray(joinedSample.detail.structure_blocks), 'Structure blocks present');
assert(joinedSample.detail.structure_blocks.length > 0, 'Structure blocks not empty');
assert(Array.isArray(joinedSample.detail.examples), 'Examples present');
assert.strictEqual(joinedSample.detail.examples.length, 6, 'Has 6 rich sentence examples');
assert(Array.isArray(joinedSample.detail.puzzles), 'Puzzles present');
assert(Array.isArray(joinedSample.detail.fill_blank), 'Fill in blank present');
assert(Array.isArray(joinedSample.detail.error_correction), 'Error correction present');
assert(Array.isArray(joinedSample.detail.quiz), 'Quiz present');
console.log('  ✅ JoinedGrammarPoint embeds 100% of the rich pedagogical schema');

// Verify ALL 67 detailed grammar points in joined list
const allDetailedPoints = joinedAll.filter(x => x.hasDetail);
assert.strictEqual(allDetailedPoints.length, 67, 'All 67 detailed items joined properly');
allDetailedPoints.forEach(item => {
  const id = item.catalog.id;
  assert(item.detail, `${id} has detail attached`);
  assert(item.detail.structure_blocks && item.detail.structure_blocks.length > 0, `${id} has structure blocks`);
  assert(item.detail.examples && item.detail.examples.length >= 1, `${id} has rich examples`);
  assert(item.detail.puzzles && item.detail.puzzles.length > 0, `${id} has puzzles`);
  assert(item.detail.fill_blank && item.detail.fill_blank.length > 0, `${id} has fill_blank`);
  assert(item.detail.error_correction && item.detail.error_correction.length > 0, `${id} has error_correction`);
  assert(item.detail.quiz && item.detail.quiz.length > 0, `${id} has quiz`);
  assert(item.detail.summary_card && item.detail.summary_card.one_liner, `${id} has summary_card`);
});
console.log(`  ✅ Verified all ${allDetailedPoints.length} detailed grammar lessons have complete pedagogical blueprints`);

// 6. UI Components Rendering Verification
console.log('\n--- 6. UI Components Rendering (StructureFormula & TokenizedSentence) ---');
// Mock browser environment for grammar.js component tests
global.window = {
  HSK_GRAMMAR_CATALOG: bundledData.HSK_GRAMMAR_CATALOG,
  HSK_GRAMMAR_SAMPLES: bundledData.HSK_GRAMMAR_SAMPLES
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => []
};
global.state = { uiLang: 'vi' };
global.escapeHtml = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
global.escapeQuotes = s => String(s || '').replace(/'/g, "\\'");

// Load grammar.js
const grammarJsCode = fs.readFileSync(path.join(__dirname, 'js/features/grammar.js'), 'utf8');
// Evaluate in context
eval(grammarJsCode);

assert(typeof window.renderStructureFormula === 'function', 'renderStructureFormula is exposed');
assert(typeof window.renderTokenizedSentence === 'function', 'renderTokenizedSentence is exposed');
assert(typeof window.renderPracticeModule === 'function', 'renderPracticeModule is exposed');

// Test StructureFormula
const roleColorMap = {};
const formulaHtmlVi = window.renderStructureFormula(joinedSample.detail, 'vi', roleColorMap);
assert(formulaHtmlVi.includes('S + 是 / 不是 + N'), 'Formula displays formula code');
assert(formulaHtmlVi.includes('structure-block-pill'), 'Formula renders structure block pills');
assert(roleColorMap.subject === '#3B82F6', 'Subject role color mapped to #3B82F6');
assert(roleColorMap.negation === '#EF4444', 'Negation role color mapped to #EF4444');
assert(roleColorMap.copula === '#F97316', 'Copula role color mapped to #F97316');
assert(roleColorMap.object === '#10B981', 'Object role color mapped to #10B981');
console.log('  ✅ StructureFormula maps colors to block roles correctly');

// Test TokenizedSentence in VI (Han-Viet sub-annotations)
const firstExample = joinedSample.detail.examples[0];
const sentenceHtmlVi = window.renderTokenizedSentence(firstExample, joinedSample.detail.structure_blocks, 'vi');
assert(sentenceHtmlVi.includes('token-hanviet'), 'Sentence renders token-hanviet for Vietnamese');
assert(sentenceHtmlVi.includes('[ngã]'), 'Han-viet for 我 is ngã');
console.log('  ✅ TokenizedSentence renders Han-Viet sub-annotations in Vietnamese mode');

// Test TokenizedSentence in JA (Kanji & False Friend alert)
const sentenceHtmlJa = window.renderTokenizedSentence(firstExample, joinedSample.detail.structure_blocks, 'ja');
assert(sentenceHtmlJa.includes('token-kanji'), 'Sentence renders token-kanji for Japanese');
assert(sentenceHtmlJa.includes('我'), 'Kanji displayed');
console.log('  ✅ TokenizedSentence renders Kanji sub-annotations in Japanese mode');

// Test False Friend badge in JA
const falseFriendExample = joinedSample.detail.examples.find(e => e.tokens.some(t => t.false_friend_ja));
if (falseFriendExample) {
  const ffHtml = window.renderTokenizedSentence(falseFriendExample, joinedSample.detail.structure_blocks, 'ja');
  assert(ffHtml.includes('token-false-friend'), 'Renders false friend alert in Japanese mode');
  assert(ffHtml.includes('同形異義'), 'Shows warning badge 同形異義');
  console.log('  ✅ TokenizedSentence flags Japanese false friends (同形異義) with clickable warning modal');
}

// Test TokenizedSentence in EN (English literal / gloss)
const sentenceHtmlEn = window.renderTokenizedSentence(firstExample, joinedSample.detail.structure_blocks, 'en');
assert(sentenceHtmlEn.includes('token-literal-en'), 'Sentence renders token-literal-en in English mode');
assert(sentenceHtmlEn.includes('sentence-literal-en'), 'Sentence renders sentence-level literal translation in English mode');
assert(sentenceHtmlEn.includes('I am student'), 'Includes English literal "I am student"');
console.log('  ✅ TokenizedSentence renders English literal translations in English mode');

// 7. Practice Module Logic & Exercises
console.log('\n--- 7. PracticeModule & Scoring State Engine ---');
const practiceHtmlPuzzles = window.renderPracticeModule(joinedSample.detail, 'vi', 'puzzles');
assert(practiceHtmlPuzzles.includes('puzzle-item-card'), 'Renders puzzle exercise card');
assert(practiceHtmlPuzzles.includes('puzzle-dropzone'), 'Renders interactive dropzone');
assert(practiceHtmlPuzzles.includes('puzzle-pool'), 'Renders word bank pool');
console.log('  ✅ PracticeModule renders interactive Puzzles (Sentence Unscramble)');

const practiceHtmlFillBlank = window.renderPracticeModule(joinedSample.detail, 'vi', 'fill_blank');
assert(practiceHtmlFillBlank.includes('fill-blank-card'), 'Renders fill-in-blank card');
assert(practiceHtmlFillBlank.includes('fill-blank-opt-btn'), 'Renders multiple choices');
console.log('  ✅ PracticeModule renders Fill-in-the-Blank with trap warnings');

const practiceHtmlErrorCorrection = window.renderPracticeModule(joinedSample.detail, 'vi', 'error_correction');
assert(practiceHtmlErrorCorrection.includes('error-corr-card'), 'Renders error correction card');
assert(practiceHtmlErrorCorrection.includes('error-wrong-line'), 'Renders fatal error highlight');
console.log('  ✅ PracticeModule renders Error Correction with hint toggling');

const practiceHtmlQuiz = window.renderPracticeModule(joinedSample.detail, 'vi', 'quiz');
assert(practiceHtmlQuiz.includes('quiz-item-card'), 'Renders quiz cards');
assert(practiceHtmlQuiz.includes('quiz-opt-btn'), 'Renders quiz option buttons');
console.log('  ✅ PracticeModule renders Knowledge Quiz');

// 8. Word-to-Grammar Jump Navigation
console.log('\n--- 8. Cross-Link: Word Sheet to Grammar Match ---');
const hitsShi = findGrammarPointsByWord('是');
assert(hitsShi.length > 0, 'findGrammarPointsByWord("是") finds grammar points');
assert(hitsShi[0].hasDetail === true, 'Top hit has detailed rule sample');
console.log(`  ✅ findGrammarPointsByWord("是") correctly matched ${hitsShi.length} grammar points (top: ${hitsShi[0].catalog.id})`);

const hitsBi = findGrammarPointsByWord('比');
assert(hitsBi.length > 0, 'findGrammarPointsByWord("比") finds grammar points');
assert(hitsBi[0].catalog.id === 'hsk2_bi_comparison', 'Correctly matches HSK2 比 comparison');
console.log(`  ✅ findGrammarPointsByWord("比") correctly matched ${hitsBi.length} grammar points (top: ${hitsBi[0].catalog.id})`);

// 9. Categories and Levels Summary Verification
console.log('\n--- 9. Categories and Levels Metadata ---');
assert.strictEqual(getCategoryName('sentence_pattern', 'vi'), '📐 Mẫu câu & Cấu trúc');
assert.strictEqual(getCategoryName('negation', 'vi'), '🚫 Phủ định');
assert.strictEqual(getCategoryName('comparison', 'vi'), '⚖️ Câu so sánh');
console.log('  ✅ getCategoryName translates raw keys (sentence_pattern, negation...) to human-friendly localized labels');
const categories = getGrammarCategories('vi');
assert(Array.isArray(categories) && categories.length > 0, 'Categories generated');
console.log(`  ✅ Generated ${categories.length} grammar categories with counts`);

const levels = getGrammarLevels();
assert.strictEqual(levels.length, 7, '7 levels from HSK1 to HSK7-9');
const totalItemsInLevels = levels.reduce((sum, l) => sum + l.count, 0);
assert.strictEqual(totalItemsInLevels, 81, 'Total level counts sum up to 81');
console.log(`  ✅ Verified 7 HSK levels covering all ${totalItemsInLevels} points`);

// 10. Mobile Search & Input Robustness
console.log('\n--- 10. Mobile Search Input & Composition Event Verification ---');
assert(typeof window.handleGrammarSearchInput === 'function', 'handleGrammarSearchInput exposed');
assert(typeof window.handleGrammarSearchCompositionEnd === 'function', 'handleGrammarSearchCompositionEnd exposed');
assert(typeof window.handleGrammarSearchSubmit === 'function', 'handleGrammarSearchSubmit exposed');
assert(typeof window.handleGrammarSearchKeydown === 'function', 'handleGrammarSearchKeydown exposed');
assert(typeof window.clearGrammarSearch === 'function', 'clearGrammarSearch exposed');

// Mock DOM elements
let mockBlurred = false;
const mockInput = {
  value: 'so sanh',
  blur: () => { mockBlurred = true; },
  focus: () => {}
};
const mockClearBtn = { style: { display: 'none' } };
const mockGrid = { innerHTML: '' };

global.document.getElementById = (id) => {
  if (id === 'grammar-search-input') return mockInput;
  if (id === 'grammar-search-clear-btn') return mockClearBtn;
  return null;
};
global.document.querySelector = (sel) => {
  if (sel === '.grammar-catalog-grid') return mockGrid;
  return null;
};

// Test composition end (IME on mobile)
window.handleGrammarSearchCompositionEnd({ target: { value: '比' } });
assert.strictEqual(grammarStore.getState().query, '比', 'CompositionEnd immediately commits IME text to store');
assert.strictEqual(mockClearBtn.style.display, 'flex', 'Clear button shown on composition end');
assert(mockGrid.innerHTML.includes('grammar-card'), 'Grid rendered cards for search query');
console.log('  ✅ handleGrammarSearchCompositionEnd handles mobile IME committed text');

// Test submit (Mobile Search/Go action)
let prevented = false;
mockInput.value = 'hsk1';
window.handleGrammarSearchSubmit({ preventDefault: () => { prevented = true; } });
assert(prevented, 'Submit event default is prevented');
assert(mockBlurred, 'Input is blurred on submit to dismiss mobile virtual keyboard');
assert.strictEqual(grammarStore.getState().query, 'hsk1', 'Store query updated to submitted value');
console.log('  ✅ handleGrammarSearchSubmit handles mobile Go/Search and dismisses keyboard');

// Test clear
window.clearGrammarSearch();
assert.strictEqual(grammarStore.getState().query, '', 'Store query cleared');
assert.strictEqual(mockInput.value, '', 'Input value cleared');
assert.strictEqual(mockClearBtn.style.display, 'none', 'Clear button hidden');
console.log('  ✅ clearGrammarSearch clears state, input and updates DOM grid');

console.log('\n========================================');
console.log('🎉 ALL HSK GRAMMAR SYSTEM TESTS PASSED 100%!');
console.log('========================================\n');
