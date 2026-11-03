/**
 * test_learn_service.js
 * 
 * Comprehensive Unit Test Suite for Halou Smart Study Hub (Học tập & Luyện phản xạ):
 * - Dataset integrity (12 categories, 214 Kangxi radicals, 1400+ vocabulary)
 * - Multi-language coverage (VI, JA, EN)
 * - Multi-field search (Hanzi, Pinyin with/without tones, Hán-Việt, Trilingual meanings)
 * - Spaced Repetition System (SRS SM-2 hybrid engine)
 * - Starred Favorites & Progress tracking
 * - Dynamic 4-option Quiz Generator (Meaning Match, Pinyin Match, Audio Listening)
 * - 214 Radicals queries by stroke count and keyword
 * - Safe progress reset for shared devices
 */

const assert = require('assert');

// Mock localStorage for Node.js test environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
};

const LearnService = require('./js/features/learn-service.js');
const dataset = require('./js/data/learn-data.js');

console.log('\n🧪 Running Halou Smart Study Hub (LearnService) Unit Tests...\n');

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ==========================================
// Suite 1: Dataset Integrity & Schema Compliance
// ==========================================
console.log('--- Suite 1: Dataset Integrity & Schema Compliance ---');

test('Dataset has valid meta and expected counts', () => {
  assert.ok(dataset.meta, 'meta object should exist');
  assert.strictEqual(dataset.categories.length, 12, 'Must have exactly 12 categories');
  assert.strictEqual(dataset.radicals.length, 214, 'Must have exactly 214 Kangxi radicals');
  assert.ok(dataset.vocabulary.length >= 1400, 'Must have at least 1400 vocabulary items');
});

test('All 12 categories define tri-lingual names and icons', () => {
  const cats = LearnService.getCategories();
  assert.strictEqual(cats.length, 12);
  cats.forEach(c => {
    assert.ok(c.id, 'category has id');
    assert.ok(c.icon, 'category has icon');
    assert.ok(c.name.vi, 'category has vi name');
    assert.ok(c.name.en, 'category has en name');
    assert.ok(c.name.ja, 'category has ja name');
  });
});

test('All 214 Radicals cover strokes from 1 to 17', () => {
  const radicals = LearnService.getRadicals('all');
  assert.strictEqual(radicals.length, 214);
  const strokeCounts = new Set(radicals.map(r => r.strokes));
  for (let s = 1; s <= 17; s++) {
    assert.ok(strokeCounts.has(s), `Stroke count ${s} must be represented in radicals`);
  }
  radicals.forEach(r => {
    assert.ok(r.radical, `${r.id} must have radical character`);
    assert.ok(r.pinyin, `${r.id} must have pinyin`);
    assert.ok(r.hanviet, `${r.id} must have hanviet`);
    assert.ok(r.meaning && r.meaning.vi, `${r.id} must have vi meaning`);
  });
});

test('Vocabulary items adhere to strict schema with Pinyin, Hán-Việt, Meanings', () => {
  const list = LearnService.getVocabList();
  assert.ok(list.length >= 1400);
  list.slice(0, 100).forEach(v => {
    assert.ok(v.id, 'vocab has id');
    assert.ok(v.hanzi, 'vocab has hanzi');
    assert.ok(v.pinyin, 'vocab has pinyin');
    assert.ok(v.level, 'vocab has level');
    assert.ok(v.category, 'vocab has category');
    assert.ok(v.meanings && v.meanings.vi, `${v.hanzi} must have vi meaning`);
  });
});

// ==========================================
// Suite 2: Search Engine & Indexing
// ==========================================
console.log('\n--- Suite 2: Multi-Field Search Engine ---');

test('Search finds exact Hanzi terms', () => {
  const res = LearnService.getVocabList({ query: '你好' });
  assert.ok(res.length > 0);
  assert.strictEqual(res[0].hanzi, '你好');
});

test('Search finds terms using tone-marked Pinyin', () => {
  const res = LearnService.getVocabList({ query: 'nǐ hǎo' });
  assert.ok(res.length > 0);
  assert.ok(res.some(r => r.hanzi === '你好'));
});

test('Search finds terms using tone-less fuzzy Pinyin', () => {
  const res = LearnService.getVocabList({ query: 'ni hao' });
  assert.ok(res.length > 0);
  assert.ok(res.some(r => r.hanzi === '你好'));
});

test('Search finds terms using Vietnamese keywords', () => {
  const res = LearnService.getVocabList({ query: 'xin chào' });
  assert.ok(res.length > 0);
  assert.ok(res.some(r => r.hanzi === '你好'));
});

test('Search finds terms using English keywords', () => {
  const res = LearnService.getVocabList({ query: 'hello' });
  assert.ok(res.length > 0);
  assert.ok(res.some(r => r.hanzi === '你好' || r.hanzi === '您好'));
});

test('Search supports category and level filtering', () => {
  const hsk1List = LearnService.getVocabList({ level: 'hsk1' });
  assert.ok(hsk1List.length > 0);
  hsk1List.forEach(item => assert.strictEqual(item.level, 'hsk1'));

  const foodList = LearnService.getVocabList({ category: 'food' });
  assert.ok(foodList.length > 0);
  foodList.forEach(item => assert.strictEqual(item.category, 'food'));
});

// ==========================================
// Suite 3: Spaced Repetition System (SRS)
// ==========================================
console.log('\n--- Suite 3: Spaced Repetition System (SRS) ---');

test('SRS initial card state is fresh (reps = 0)', () => {
  const state = LearnService.getSrsRecord('voc_0001');
  assert.strictEqual(state.reps, 0);
  assert.strictEqual(state.interval, 0);
});

test('SRS rating "good" advances repetition and interval', () => {
  const rec1 = LearnService.recordSrsReview('voc_0001', 'good');
  assert.strictEqual(rec1.reps, 1);
  assert.strictEqual(rec1.interval, 1);

  const rec2 = LearnService.recordSrsReview('voc_0001', 'good');
  assert.strictEqual(rec2.reps, 2);
  assert.strictEqual(rec2.interval, 3);
});

test('SRS rating "again" resets repetitions to 0 and drops interval to 1', () => {
  const recReset = LearnService.recordSrsReview('voc_0001', 'again');
  assert.strictEqual(recReset.reps, 0);
  assert.strictEqual(recReset.interval, 1);
});

test('SRS rating "easy" awards bonus interval and mastery boost', () => {
  const recEasy = LearnService.recordSrsReview('voc_0002', 'easy');
  assert.strictEqual(recEasy.reps, 2);
  assert.ok(recEasy.interval >= 4);
});

test('SRS stats correctly compute learning, reviewed, and streak count', () => {
  const stats = LearnService.getSrsStats();
  assert.ok(stats.totalVocab >= 1400);
  assert.ok(stats.reviewedCount >= 1);
  assert.ok(stats.streak >= 1);
});

// ==========================================
// Suite 4: Starred Favorites & Bookmarks
// ==========================================
console.log('\n--- Suite 4: Starred Favorites & Bookmarks ---');

test('Toggle favorites adds and removes item from storage', () => {
  assert.strictEqual(LearnService.isFavorite('voc_0001'), false);
  const isNowFav = LearnService.toggleFavorite('voc_0001');
  assert.strictEqual(isNowFav, true);
  assert.strictEqual(LearnService.isFavorite('voc_0001'), true);

  const isRemoved = LearnService.toggleFavorite('voc_0001');
  assert.strictEqual(isRemoved, false);
  assert.strictEqual(LearnService.isFavorite('voc_0001'), false);
});

test('Favorites-only filter returns only starred vocabulary', () => {
  LearnService.toggleFavorite('voc_0001');
  LearnService.toggleFavorite('voc_0002');
  const favs = LearnService.getVocabList({ favoritesOnly: true });
  assert.strictEqual(favs.length, 2);
  assert.ok(favs.some(f => f.id === 'voc_0001'));
  assert.ok(favs.some(f => f.id === 'voc_0002'));
});

// ==========================================
// Suite 5: Dynamic 4-Option Quiz Generator
// ==========================================
console.log('\n--- Suite 5: Dynamic 4-Option Quiz Generator ---');

test('Meaning Quiz produces 4 distinct choices with exactly 1 correct answer', () => {
  const q = LearnService.generateQuizQuestion({ type: 'meaning', locale: 'vi' });
  assert.ok(q.targetWord);
  assert.ok(q.promptHanzi);
  assert.strictEqual(q.choices.length, 4);
  const correctChoices = q.choices.filter(c => c.isCorrect);
  assert.strictEqual(correctChoices.length, 1);
  assert.strictEqual(q.choices[q.correctIndex].isCorrect, true);
});

test('Pinyin Quiz produces 4 choices with correct pinyin', () => {
  const q = LearnService.generateQuizQuestion({ type: 'pinyin' });
  assert.ok(q.targetWord);
  assert.strictEqual(q.choices.length, 4);
  const correctChoice = q.choices[q.correctIndex];
  assert.strictEqual(correctChoice.text, q.targetWord.pinyin);
});

test('Listening Quiz produces 4 choices and target audio text', () => {
  const q = LearnService.generateListeningQuestion({ locale: 'vi' });
  assert.ok(q.targetWord);
  assert.strictEqual(q.audioText, q.targetWord.hanzi);
  assert.strictEqual(q.choices.length, 4);
  assert.strictEqual(q.choices[q.correctIndex].isCorrect, true);
});

// ==========================================
// Suite 6: 214 Radicals Explorer
// ==========================================
console.log('\n--- Suite 6: 214 Radicals Explorer ---');

test('Get radicals by stroke count filters correctly', () => {
  const r1 = LearnService.getRadicals(1);
  assert.strictEqual(r1.length, 6, '1-stroke radicals must be exactly 6');
  r1.forEach(r => assert.strictEqual(r.strokes, 1));

  const r2 = LearnService.getRadicals(2);
  assert.strictEqual(r2.length, 23, '2-stroke radicals must be exactly 23');
  r2.forEach(r => assert.strictEqual(r.strokes, 2));
});

test('Search radicals by character or Pinyin', () => {
  const foundWater = LearnService.searchRadicals('水');
  assert.ok(foundWater.length > 0);
  assert.ok(foundWater.some(r => r.radical.includes('水')));

  const foundXin = LearnService.searchRadicals('xin');
  assert.ok(foundXin.length > 0);
  assert.ok(foundXin.some(r => r.radical.includes('心')));
});

// ==========================================
// Suite 7: Progress Reset
// ==========================================
console.log('\n--- Suite 7: Multi-User Progress Reset ---');

test('resetAllProgress wipes SRS records and stats cleanly', () => {
  LearnService.recordSrsReview('voc_0001', 'good');
  assert.ok(LearnService.getSrsRecord('voc_0001').reps > 0);
  
  LearnService.resetAllProgress();
  const resetState = LearnService.getSrsRecord('voc_0001');
  assert.strictEqual(resetState.reps, 0);
  assert.strictEqual(resetState.interval, 0);
});

console.log(`\n🎉 All ${passedTests} Halou Smart Study Hub unit tests passed with 100% success!\n`);

