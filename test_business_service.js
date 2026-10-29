/**
 * test_business_service.js
 * 
 * Comprehensive Unit Test Suite for Business Chinese (商务中文) module:
 * - Dataset integrity (12 categories, 144 vocab, 11 emails, 10 trade docs, 10 scenarios, 24 quizzes)
 * - Multi-language coverage (VI, JA, EN)
 * - Fast normalized in-memory search (Hanzi, Pinyin with/without tones, localized meanings)
 * - Leitner / SM-2 hybrid Spaced Repetition System (SRS)
 * - User Favorites & Progress tracking
 * - Dynamic email template placeholder compilation
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

const BusinessService = require('./js/features/business-service.js');
const dataset = require('./js/data/business-data.js');

console.log('🧪 Running Business Chinese Service Unit Tests...\n');

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
// Suite 1: Dataset Integrity & Counts
// ==========================================
console.log('--- Suite 1: Dataset Integrity & Schema Compliance ---');

test('Dataset has valid meta and expected counts', () => {
  assert.ok(dataset.meta, 'meta object should exist');
  assert.strictEqual(dataset.categories.length, 12, 'Must have exactly 12 categories');
  assert.strictEqual(dataset.vocabulary.length, 144, 'Must have exactly 144 vocabulary items');
  assert.strictEqual(dataset.emailTemplates.length, 11, 'Must have exactly 11 email templates');
  assert.strictEqual(dataset.tradeDocuments.length, 10, 'Must have exactly 10 trade documents');
  assert.strictEqual(dataset.scenarios.length, 10, 'Must have exactly 10 scenarios');
  assert.strictEqual(dataset.quizzes.length, 24, 'Must have exactly 24 situational quizzes');
});

test('All 12 categories define tri-lingual names and icons', () => {
  const cats = BusinessService.getCategories();
  assert.strictEqual(cats.length, 12);
  cats.forEach(c => {
    assert.ok(c.id, 'Category must have id');
    assert.ok(c.zhName, `Category ${c.id} must have zhName`);
    assert.ok(c.icon, `Category ${c.id} must have icon`);
    assert.ok(c.name.vi && c.name.ja && c.name.en, `Category ${c.id} must have vi, ja, en names`);
    assert.ok(c.description.vi && c.description.ja && c.description.en, `Category ${c.id} must have vi, ja, en descriptions`);
  });
});

test('Every category has exactly 12 curated vocabulary items', () => {
  const cats = BusinessService.getCategories();
  cats.forEach(c => {
    const items = dataset.vocabulary.filter(v => v.category === c.id);
    assert.strictEqual(items.length, 12, `Category ${c.id} must have 12 items, found ${items.length}`);
  });
});

test('Vocabulary items conform to strict schema with examples and tips', () => {
  dataset.vocabulary.forEach(item => {
    assert.ok(item.id, 'Vocab must have id');
    assert.ok(item.term, 'Vocab must have term');
    assert.ok(item.pinyin, `Vocab ${item.term} must have pinyin`);
    assert.ok(item.partOfSpeech, `Vocab ${item.term} must have partOfSpeech`);
    assert.ok(['beginner', 'intermediate', 'advanced'].includes(item.level), `Vocab ${item.term} invalid level`);
    assert.ok(item.translations.vi && item.translations.vi.meaning, `Vocab ${item.term} missing VI meaning`);
    assert.ok(item.translations.ja && item.translations.ja.meaning, `Vocab ${item.term} missing JA meaning`);
    assert.ok(item.translations.en && item.translations.en.meaning, `Vocab ${item.term} missing EN meaning`);
    assert.ok(Array.isArray(item.examples) && item.examples.length > 0, `Vocab ${item.term} must have examples`);
  });
});

test('Quizzes have exactly one correct option and explanations', () => {
  dataset.quizzes.forEach(q => {
    assert.ok(q.id, 'Quiz must have id');
    assert.ok(q.question.vi && q.question.ja && q.question.en, `Quiz ${q.id} missing tri-lingual question`);
    assert.ok(q.explanation.vi && q.explanation.ja && q.explanation.en, `Quiz ${q.id} missing explanation`);
    assert.ok(Array.isArray(q.options) && q.options.length >= 3, `Quiz ${q.id} must have >= 3 options`);
    const correctCount = q.options.filter(o => o.isCorrect).length;
    assert.strictEqual(correctCount, 1, `Quiz ${q.id} must have exactly 1 correct option, got ${correctCount}`);
  });
});

// ==========================================
// Suite 2: Search Engine & Indexing
// ==========================================
console.log('\n--- Suite 2: Search Engine & Indexing ---');

test('Search finds exact Hanzi terms', () => {
  const res = BusinessService.searchVocabulary('离岸价');
  assert.ok(res.length > 0);
  assert.strictEqual(res[0].term, '离岸价');
});

test('Search finds terms using tone-marked Pinyin', () => {
  const res = BusinessService.searchVocabulary('qiàtán');
  assert.ok(res.length > 0);
  assert.strictEqual(res[0].term, '洽谈');
});

test('Search finds terms using tone-less fuzzy Pinyin', () => {
  const res = BusinessService.searchVocabulary('qiatan');
  assert.ok(res.length > 0);
  assert.strictEqual(res[0].term, '洽谈');
});

test('Search finds terms using English trade acronyms (FOB, CIF, AWB)', () => {
  const fobRes = BusinessService.searchVocabulary('fob');
  assert.ok(fobRes.some(r => r.term === '离岸价'));

  const cifRes = BusinessService.searchVocabulary('cif');
  assert.ok(cifRes.some(r => r.term === '到岸价'));

  const awbRes = BusinessService.searchVocabulary('awb');
  assert.ok(awbRes.some(r => r.term === '空运单'));
});

test('Search finds terms using Vietnamese keywords', () => {
  const res = BusinessService.searchVocabulary('hóa đơn');
  assert.ok(res.length >= 2, 'Should match multiple invoice terms');
});

test('Search supports category and level filtering', () => {
  const beginnerBasics = BusinessService.searchVocabulary('', { category: 'basic', level: 'beginner' });
  assert.ok(beginnerBasics.length > 0);
  beginnerBasics.forEach(item => {
    assert.strictEqual(item.category, 'basic');
    assert.strictEqual(item.level, 'beginner');
  });
});

// ==========================================
// Suite 3: Spaced Repetition System (SRS)
// ==========================================
console.log('\n--- Suite 3: Spaced Repetition System (SRS) ---');

test('SRS initial card state is new', () => {
  const state = BusinessService.getSRSCardState('bc_basic_001');
  assert.strictEqual(state.cardId, 'bc_basic_001');
  assert.strictEqual(state.repetitions, 0);
  assert.strictEqual(state.status, 'new');
});

test('SRS SM-2 rating "good" advances repetition and interval', () => {
  const cardId = 'test_card_001';
  // First review "good" -> interval 1d, repetitions 1
  const rev1 = BusinessService.recordSRSReview(cardId, 'good');
  assert.strictEqual(rev1.repetitions, 1);
  assert.strictEqual(rev1.interval, 1);

  // Second review "good" -> interval 6d, repetitions 2
  const rev2 = BusinessService.recordSRSReview(cardId, 'good');
  assert.strictEqual(rev2.repetitions, 2);
  assert.strictEqual(rev2.interval, 6);
});

test('SRS SM-2 rating "again" resets repetitions to 0 and drops interval to 1', () => {
  const cardId = 'test_card_002';
  BusinessService.recordSRSReview(cardId, 'good'); // rep 1
  BusinessService.recordSRSReview(cardId, 'good'); // rep 2
  
  const reset = BusinessService.recordSRSReview(cardId, 'again');
  assert.strictEqual(reset.repetitions, 0);
  assert.strictEqual(reset.interval, 1);
  assert.strictEqual(reset.status, 'learning');
});

test('SRS stats correctly compute learning, due, and unseen counts', () => {
  const stats = BusinessService.getSRSStats();
  assert.ok(stats.totalVocab === 144);
  assert.ok(typeof stats.dueToday === 'number');
  assert.ok(typeof stats.mastered === 'number');
});

// ==========================================
// Suite 4: Favorites & User Progress
// ==========================================
console.log('\n--- Suite 4: Favorites & Progress Tracking ---');

test('Favorites toggle persists in localStorage', () => {
  const termId = 'bc_trade_002';
  assert.strictEqual(BusinessService.isFavorite(termId), false);

  BusinessService.toggleFavorite(termId);
  assert.strictEqual(BusinessService.isFavorite(termId), true);

  BusinessService.toggleFavorite(termId);
  assert.strictEqual(BusinessService.isFavorite(termId), false);
});

test('Progress tracking records quiz and scenario completion', () => {
  BusinessService.recordQuizCompleted('quiz_001_incoterms_cif_vs_fob', true);
  BusinessService.recordScenarioCompleted('scen_001_inquiry_initial');

  const prog = BusinessService.getProgress();
  assert.ok(prog.completedQuizzes['quiz_001_incoterms_cif_vs_fob']);
  assert.strictEqual(prog.completedQuizzes['quiz_001_incoterms_cif_vs_fob'].isCorrect, true);
  assert.ok(prog.completedScenarios.includes('scen_001_inquiry_initial'));
});

// ==========================================
// Suite 5: Dynamic Email Template Compiler
// ==========================================
console.log('\n--- Suite 5: Dynamic Email Template Compiler ---');

test('Email compiler replaces custom placeholders', () => {
  const rendered = BusinessService.renderEmailTemplate('email_001_intro', {
    MyCompanyName: 'Vietnam Trade Corp',
    ClientName: 'Mr. Zhang'
  }, false, 'zh');

  assert.ok(rendered.subject.includes('Vietnam Trade Corp'), 'Subject should contain custom company name');
  assert.ok(rendered.body.includes('Mr. Zhang'), 'Body should contain custom recipient name');
  assert.ok(!rendered.body.includes('[MyCompanyName]'), 'All company placeholders should be replaced');
});

test('Email compiler falls back to default example values when omitted', () => {
  const rendered = BusinessService.renderEmailTemplate('email_001_intro', {}, false, 'zh');
  assert.ok(!rendered.subject.includes('[MyCompanyName]'), 'Placeholders should default to example values');
  assert.ok(!rendered.body.includes('[ClientName]'), 'Placeholders should default to example values');
});

test('Email compiler supports concise messaging mode', () => {
  const formal = BusinessService.renderEmailTemplate('email_004_po_confirm', {}, false, 'zh');
  const concise = BusinessService.renderEmailTemplate('email_004_po_confirm', {}, true, 'zh');

  assert.ok(formal.body.length > concise.body.length, 'Formal body should be longer than concise body');
});

console.log(`\n🎉 All ${passedTests} Business Chinese unit tests passed with 100% success!`);

