// test_dict_search.js - Test suite for Intelligent Multi-Lingual & Reverse Search Engine
const assert = require('assert');

// 1. Load Search Engine
const {
  stripVietnameseTones,
  normalizeVietnameseQuery,
  normalizeJapaneseQuery,
  stemEnglishWord,
  levenshteinDistance,
  detectSearchLanguage,
  getLanguageBadgeInfo
} = require('./js/features/dict-search-engine.js');

// 2. Load Reverse Dict Data
const {
  REVERSE_DICT_ENTRIES,
  findReverseMatches
} = require('./js/data/reverse-dict.js');

// 3. Load Synsets Data
const {
  DICT_SYNSETS,
  findMatchingSynset
} = require('./js/data/dict-synsets.js');

console.log('🧪 Starting Dictionary Search Tests...\n');

// Test 1: Vietnamese Diacritics Normalization
console.log('--- Test 1: Vietnamese Diacritics Normalizer ---');
assert.strictEqual(stripVietnameseTones('xin chào'), 'xin chao');
assert.strictEqual(stripVietnameseTones('cảm ơn'), 'cam on');
assert.strictEqual(stripVietnameseTones('cà phê'), 'ca phe');
assert.strictEqual(stripVietnameseTones('thầy giáo'), 'thay giao');
assert.strictEqual(stripVietnameseTones('Đà Nẵng'), 'Da Nang');
console.log('✅ stripVietnameseTones works perfectly');

// Test 2: Japanese Kana & Romaji Normalizer
console.log('\n--- Test 2: Japanese Kana & Romaji Normalizer ---');
const jaTaberu = normalizeJapaneseQuery('taberu');
assert.strictEqual(jaTaberu.hiragana, 'たべる');
assert.strictEqual(jaTaberu.kanjiEquivalent, '食べる');

const jaArigato = normalizeJapaneseQuery('arigato');
assert.strictEqual(jaArigato.hiragana, 'ありがとう');

const jaKata = normalizeJapaneseQuery('コーヒー');
assert.strictEqual(jaKata.hiragana, 'こーひー');
console.log('✅ normalizeJapaneseQuery works perfectly');

// Test 3: English Lemmatizer & Stemming
console.log('\n--- Test 3: English Stemming ---');
assert.strictEqual(stemEnglishWord('eating'), 'eat');
assert.strictEqual(stemEnglishWord('worked'), 'work');
assert.strictEqual(stemEnglishWord('studies'), 'study');
assert.strictEqual(stemEnglishWord('learning'), 'learn');
console.log('✅ stemEnglishWord works perfectly');

// Test 4: Levenshtein Distance
console.log('\n--- Test 4: Levenshtein Distance (Typo Tolerance) ---');
assert.strictEqual(levenshteinDistance('xinchao', 'xinchao'), 0);
assert.strictEqual(levenshteinDistance('xin chao', 'xinh chao'), 1);
assert.strictEqual(levenshteinDistance('ca phe', 'caphe'), 1);
console.log('✅ levenshteinDistance works accurately');

// Test 5: Automatic Language Routing Detection
console.log('\n--- Test 5: Language Detection ---');
assert.strictEqual(detectSearchLanguage('你好'), 'zh');
assert.strictEqual(detectSearchLanguage('たべる'), 'ja');
assert.strictEqual(detectSearchLanguage('arigato'), 'ja');
assert.strictEqual(detectSearchLanguage('xin chào'), 'vi');
assert.strictEqual(detectSearchLanguage('nǐ hǎo'), 'pinyin');
assert.strictEqual(detectSearchLanguage('xin chao'), 'latin');

const viBadge = getLanguageBadgeInfo('vi', 'xin chào', 'vi');
assert.ok(viBadge.badge.includes('Tiếng Việt') || viBadge.badge.includes('Việt'));
const jaBadge = getLanguageBadgeInfo('ja', 'たべる', 'vi');
assert.ok(jaBadge.badge.includes('日本語') || jaBadge.desc.includes('Nhật'));
console.log('✅ detectSearchLanguage and badges work accurately');

// Test 6: Reverse Dictionary Offline Lookup (0 Tokens)
console.log('\n--- Test 6: Reverse Dictionary Offline Lookup ---');
const r1 = findReverseMatches('xin chao');
assert.ok(r1.some(m => m.zh === '你好'), 'Expected "xin chao" to find "你好"');

const r2 = findReverseMatches('cam on');
assert.ok(r2.some(m => m.zh === '谢谢'), 'Expected "cam on" to find "谢谢"');

const r3 = findReverseMatches('ca phe');
assert.ok(r3.some(m => m.zh === '咖啡'), 'Expected "ca phe" to find "咖啡"');

const r4 = findReverseMatches('an com');
assert.ok(r4.some(m => m.zh === '吃饭' || m.zh === '吃'), 'Expected "an com" to find "吃饭"');

const r5 = findReverseMatches('thay giao');
assert.ok(r5.some(m => m.zh === '老师'), 'Expected "thay giao" to find "老师"');

const r6 = findReverseMatches('san bay');
assert.ok(r6.some(m => m.zh === '机场'), 'Expected "san bay" to find "机场"');

const r7 = findReverseMatches('arigato');
assert.ok(r7.some(m => m.zh === '谢谢'), 'Expected "arigato" to find "谢谢"');

const r8 = findReverseMatches('eating');
assert.ok(r8.some(m => m.zh === '吃' || m.zh === '吃饭'), 'Expected "eating" to find "吃"');

console.log('✅ findReverseMatches returned instant results for all test phrases');

// Test 7: Semantic Word Mindmaps & Nuance Gradients
console.log('\n--- Test 7: Semantic Word Mindmap / Nuance Hierarchy ---');
const sLove = findMatchingSynset('yeu');
assert.ok(sLove !== null, 'Expected "yeu" to match Love synset');
assert.strictEqual(sLove.id, 'love');
assert.strictEqual(sLove.tiers.length, 4); // HSK 1-2, HSK 3-5, HSK 6/Idioms, Slang Gen Z

const sSad = findMatchingSynset('buon');
assert.ok(sSad !== null, 'Expected "buon" to match Sadness synset');
assert.strictEqual(sSad.id, 'sadness');
assert.ok(sSad.tiers.some(t => t.words.some(w => w.zh === '破防'))); // Slang Gen Z

const sFood = findMatchingSynset('an uong');
assert.ok(sFood !== null, 'Expected "an uong" to match Food synset');
assert.strictEqual(sFood.id, 'food');

const sWork = findMatchingSynset('cong viec');
assert.ok(sWork !== null, 'Expected "cong viec" to match Work synset');
assert.strictEqual(sWork.id, 'work');
assert.ok(sWork.tiers.some(t => t.words.some(w => w.zh === '躺平'))); // Slang Gen Z

console.log('✅ findMatchingSynset returned rich 4-tier mindmaps for all core human themes');

console.log('\n🎉 ALL 7 DICTIONARY SEARCH ENGINE TESTS PASSED WITH 100% SUCCESS!');
