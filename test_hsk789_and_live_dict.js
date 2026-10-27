// test_hsk789_and_live_dict.js - Automated Test for HSK 7-9 & Extended Reverse Dictionary Engine
const assert = require('assert');

// 1. Mock MINI_DICT before loading hsk789.js to verify auto-merging
global.MINI_DICT = {
  "你好": { "pinyin": "nǐ hǎo", "vi": "xin chào", "hsk": 1 }
};

// 2. Load HSK 7-9 data
const { HSK789_DATA } = require('./js/data/hsk789.js');

// 3. Load Reverse Dict Data
const { REVERSE_DICT_ENTRIES, findReverseMatches } = require('./js/data/reverse-dict.js');

// 4. Load Search Engine
const {
  stripVietnameseTones,
  normalizeJapaneseQuery,
  stemEnglishWord,
  detectSearchLanguage
} = require('./js/features/dict-search-engine.js');

console.log('🧪 Starting HSK 7-9 & Extended Multi-Lingual Dict Tests...\n');

// Test 1: HSK 7-9 Vocabulary Verification
console.log('--- Test 1: HSK 7-9 Vocabulary Coverage ---');
assert.ok(Object.keys(HSK789_DATA).length >= 40, 'HSK 7-9 should have at least 40 words');
assert.ok(HSK789_DATA['标杆'], 'Expected 标杆 in HSK789_DATA');
assert.strictEqual(HSK789_DATA['标杆'].hsk, '7-9');
assert.ok(HSK789_DATA['标杆'].vi.includes('chuẩn mực') || HSK789_DATA['标杆'].vi.includes('tiêu chuẩn'));

assert.ok(HSK789_DATA['契机'], 'Expected 契机 in HSK789_DATA');
assert.strictEqual(HSK789_DATA['契机'].hsk, '7-9');

assert.ok(HSK789_DATA['妥协'], 'Expected 妥协 in HSK789_DATA');
assert.strictEqual(HSK789_DATA['妥协'].hsk, '7-9');

assert.ok(HSK789_DATA['韬光养晦'], 'Expected 韬光养晦 in HSK789_DATA');
assert.strictEqual(HSK789_DATA['韬光养晦'].type, 'idiom');

assert.ok(HSK789_DATA['未雨绸缪'], 'Expected 未雨绸缪 in HSK789_DATA');
assert.strictEqual(HSK789_DATA['未雨绸缪'].type, 'idiom');

// Verify auto-merge into MINI_DICT
assert.ok(global.MINI_DICT['标杆'], 'Expected MINI_DICT to be auto-merged with 标杆');
assert.ok(global.MINI_DICT['未雨绸缪'], 'Expected MINI_DICT to be auto-merged with 未雨绸缪');
console.log(`✅ HSK 7-9 verified with ${Object.keys(HSK789_DATA).length} words and successfully auto-merged into MINI_DICT`);

// Test 2: Extended Reverse Dictionary Coverage
console.log('\n--- Test 2: Extended Business, Tech & Life Reverse Lookup ---');
const rNegotiate = findReverseMatches('dam phan');
assert.ok(rNegotiate.some(m => m.zh === '谈判'), 'Expected "dam phan" to match "谈判"');

const rInvest = findReverseMatches('dau tu');
assert.ok(rInvest.some(m => m.zh === '投资'), 'Expected "dau tu" to match "投资"');

const rEconomy = findReverseMatches('kinh te');
assert.ok(rEconomy.some(m => m.zh === '经济'), 'Expected "kinh te" to match "经济"');

const rAI = findReverseMatches('tri tue nhan tao');
assert.ok(rAI.some(m => m.zh === '人工智能'), 'Expected "tri tue nhan tao" to match "人工智能"');

const rPersist = findReverseMatches('kien tri');
assert.ok(rPersist.some(m => m.zh === '坚持'), 'Expected "kien tri" to match "坚持"');

const rJaKeizai = findReverseMatches('けいざい');
assert.ok(rJaKeizai.some(m => m.zh === '经济'), 'Expected "けいざい" to match "经济"');

const rEnNegotiate = findReverseMatches('negotiate');
assert.ok(rEnNegotiate.some(m => m.zh === '谈判'), 'Expected "negotiate" to match "谈判"');

console.log('✅ Extended Reverse Dictionary returns accurate matches across VI, EN, and JA');

// Test 3: the Google live-dictionary call was removed in v1.1.12 (P2). It cost a
// third-party request per keystroke, returned low-quality machine translations and
// duplicated what the local extended dictionary + AI fallback already answer better.
console.log('\n--- Test 3: Live Google Dictionary removed ---');
const fs = require('fs');
const dictSrc = fs.readFileSync('./js/features/dict.js', 'utf8');
assert.ok(!/translate\.googleapis\.com/.test(dictSrc), 'dict.js still calls the Google live dictionary');
assert.ok(!/triggerLiveDictSearch|renderLiveDictResults|LIVE_DICT_CACHE/.test(dictSrc), 'live dictionary code still present');
assert.ok(!/dict-live-results-container|dict-live-section/.test(dictSrc), 'live dictionary markup still present');
const cssSrc = fs.readFileSync('./css/dict.css', 'utf8');
assert.ok(!/\.dict-live-/.test(cssSrc), 'live dictionary CSS still present');
console.log('✅ Google live dictionary fully removed from JS, markup and CSS');

// Test 4: i18n Completeness for HSK 7-9 & Extended Dict
console.log('\n--- Test 4: i18n Completeness ---');
const i18nContent = fs.readFileSync('./js/data/i18n-data.js', 'utf8');
assert.ok(i18nContent.includes('hsk789'), 'Expected i18n-data.js to have hsk789');
assert.ok(!i18nContent.includes('liveDictTitle'), 'liveDictTitle should be gone with the live dictionary');
assert.ok(i18nContent.includes('HSK 1 - 9'), 'Expected i18n-data.js to have HSK 1 - 9');
console.log('✅ i18n keys for HSK 7-9 verified; live-dict key removed');

console.log('\n🎉 ALL HSK 7-9 & EXTENDED MULTI-LINGUAL TESTS PASSED WITH 100% SUCCESS!');

