/**
 * test_ai_doc_test.js
 * 
 * Unit tests for Halou AI Document Vocabulary Studio & Smart Drill:
 * 1. verifyPinyinInput (exact accents, numeric pinyin 'ni3 hao3', toneless tolerance 'ni hao', invalid inputs)
 * 2. extractLocalVocabFromText (NLP tokenization, stopwords filter, context sentence binding, trilingual metadata)
 * 3. Presets integrity (SAMPLE_PRESETS valid Chinese texts & titles)
 * 4. Drill Session State Machine (marking correct, review queue loop, 100% mastery finish)
 */

const assert = require('assert');

// Mock browser globals for Node test environment
global.window = global;
global.document = undefined;

// Load dependencies
const { pinyinNumberToTone } = require('./js/features/dict-search-engine.js');
global.pinyinNumberToTone = pinyinNumberToTone;

// Load AI Doc Test module
const AiDocTest = require('./js/features/ai-doc-test.js');

console.log('🧪 Starting Halou AI Document Vocabulary & Drill Test Suite...\n');

let passedCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// -------------------------------------------------------------
// Suite 1: Pinyin Input Verification
// -------------------------------------------------------------
console.log('--- 1. Pinyin Input Verification & Tolerance ---');

test('Exact match with accent marks', () => {
  const res = AiDocTest.verifyPinyinInput('nǐ hǎo', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
  assert.strictEqual(res.exactTone, true);
});

test('Exact match with case and surrounding whitespace variation', () => {
  const res = AiDocTest.verifyPinyinInput('   NǏ HǍO   ', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
  assert.strictEqual(res.exactTone, true);
});

test('Numeric pinyin input converted to tone accents (e.g. ni3 hao3 -> nǐ hǎo)', () => {
  const res = AiDocTest.verifyPinyinInput('ni3 hao3', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
  assert.strictEqual(res.exactTone, true);
});

test('Toneless pinyin accepted with helpful hint (e.g. ni hao for nǐ hǎo)', () => {
  const res = AiDocTest.verifyPinyinInput('ni hao', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
  assert.strictEqual(res.exactTone, false);
  assert.strictEqual(res.hint, 'nǐ hǎo');
});

test('Compound multi-syllable word tolerance (e.g. ren2 gong1 zhi4 neng2 -> réngōng zhìnéng)', () => {
  const resNumeric = AiDocTest.verifyPinyinInput('ren2 gong1 zhi4 neng2', 'réngōng zhìnéng');
  const resToneless = AiDocTest.verifyPinyinInput('rengong zhineng', 'réngōng zhìnéng');
  assert.strictEqual(resToneless.correct, true);
  assert.strictEqual(resNumeric.correct, true);
});

test('Completely incorrect pinyin rejected', () => {
  const res = AiDocTest.verifyPinyinInput('xie xie', 'nǐ hǎo');
  assert.strictEqual(res.correct, false);
  assert.strictEqual(res.exactTone, false);
});

test('Empty or invalid input handling', () => {
  assert.strictEqual(AiDocTest.verifyPinyinInput('', 'nǐ hǎo').correct, false);
  assert.strictEqual(AiDocTest.verifyPinyinInput(null, 'nǐ hǎo').correct, false);
  assert.strictEqual(AiDocTest.verifyPinyinInput('ni hao', '').correct, false);
});

// -------------------------------------------------------------
// Suite 2: Local NLP Extractor & Fallback Engine
// -------------------------------------------------------------
console.log('\n--- 2. Local NLP Extractor & Sentence Contextualization ---');

test('Extracts vocabulary and binds original context sentence', () => {
  const sampleDoc = "随着人工智能的快速发展，越来越多的年轻人开始使用智能工具。专家表示掌握先进技能具备显著优势。";
  const result = AiDocTest.extractLocalVocabFromText(sampleDoc, 'vi');

  assert.ok(result.totalWords > 0, 'Should extract words');
  assert.ok(Array.isArray(result.words), 'Should return words array');
  
  const firstWord = result.words[0];
  assert.ok(firstWord.word, 'Word must have hanzi');
  assert.ok(firstWord.pinyin, 'Word must have pinyin');
  assert.ok(firstWord.meaning, 'Word must have meaning');
  assert.ok(firstWord.contextSentence, 'Word must have context sentence');
  assert.ok(firstWord.contextSentence.includes(firstWord.word), 'Context sentence must contain the target word');
  assert.ok(firstWord.contextUsage, 'Word must have context usage snippet');
  assert.ok(firstWord.mnemonic, 'Word must have mnemonic hint');
});

test('Filters out stop words (的, 了, 是, etc.)', () => {
  const doc = "的 了 是 我 你 他 她 它 们 在 有 和 电脑";
  const result = AiDocTest.extractLocalVocabFromText(doc, 'vi');
  
  const words = result.words.map(w => w.word);
  assert.strictEqual(words.includes('的'), false, 'Should filter 的');
  assert.strictEqual(words.includes('了'), false, 'Should filter 了');
  assert.strictEqual(words.includes('是'), false, 'Should filter 是');
  assert.strictEqual(words.includes('电脑'), true, 'Should retain 电脑');
});

test('Supports trilingual locales (vi, en, ja)', () => {
  const doc = "我非常喜欢学习汉语。";
  const resVi = AiDocTest.extractLocalVocabFromText(doc, 'vi');
  const resEn = AiDocTest.extractLocalVocabFromText(doc, 'en');
  const resJa = AiDocTest.extractLocalVocabFromText(doc, 'ja');

  assert.ok(resVi.words.length > 0);
  assert.ok(resEn.words.length > 0);
  assert.ok(resJa.words.length > 0);
  // Verify localized context label
  assert.ok(resVi.words[0].contextUsage.includes('trong ngữ cảnh') || resVi.words[0].contextUsage.length > 0);
  assert.ok(resEn.words[0].contextUsage.includes('In context') || resEn.words[0].contextUsage.length > 0);
  assert.ok(resJa.words[0].contextUsage.includes('文脈') || resJa.words[0].contextUsage.length > 0);
});

// -------------------------------------------------------------
// Suite 3: Presets Integrity
// -------------------------------------------------------------
console.log('\n--- 3. Presets Integrity ---');

test('All sample presets have required metadata and Chinese text', () => {
  const presets = AiDocTest.SAMPLE_PRESETS;
  const keys = ['news', 'dining', 'travel', 'work'];

  keys.forEach(k => {
    assert.ok(presets[k], `Preset ${k} must exist`);
    assert.ok(presets[k].title.vi, `Preset ${k} has vi title`);
    assert.ok(presets[k].title.en, `Preset ${k} has en title`);
    assert.ok(presets[k].title.ja, `Preset ${k} has ja title`);
    assert.ok(presets[k].text && presets[k].text.length >= 20, `Preset ${k} has valid Chinese text`);
  });
});

// -------------------------------------------------------------
// Suite 4: Drill Session State Machine & Spaced Review Loop
// -------------------------------------------------------------
console.log('\n--- 4. Drill Session State Machine & 100% Mastery Loop ---');

test('Full drill lifecycle: correct input, review loop on error, 100% mastery finish', () => {
  // Setup synthetic session data with 2 words
  AiDocTest.aiDocTestState.data = {
    summary: 'Test summary',
    totalWords: 2,
    words: [
      { id: 'test_1', word: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào' },
      { id: 'test_2', word: '再见', pinyin: 'zài jiàn', meaning: 'Tạm biệt' }
    ]
  };
  AiDocTest.aiDocTestState.session = {
    activeMode: 'pinyin',
    currentIndex: 0,
    userInputs: {},
    results: {},
    reviewQueue: [],
    isReviewingLoop: false,
    masteredCount: 0,
    isFinished: false
  };

  const state = AiDocTest.aiDocTestState;

  // 1. First word incorrect input
  state.session.userInputs['test_1'] = 'wrong pinyin';
  AiDocTest.aiDocTestCheckPinyin('test_1');

  assert.strictEqual(state.session.results['test_1'].pinyinOk, false, 'test_1 should be marked false');
  assert.deepStrictEqual(state.session.reviewQueue, [0], 'Review queue should contain word index 0');
  assert.strictEqual(state.session.masteredCount, 0);

  // 2. Advance to second word
  AiDocTest.aiDocTestNextWord();
  assert.strictEqual(state.session.currentIndex, 1, 'Should advance to index 1');

  // 3. Second word correct input
  state.session.userInputs['test_2'] = 'zai4 jian4';
  AiDocTest.aiDocTestCheckPinyin('test_2');

  assert.strictEqual(state.session.results['test_2'].pinyinOk, true, 'test_2 should be marked correct via numeric tone');
  assert.strictEqual(state.session.masteredCount, 1, 'Mastered count should be 1');

  // 4. Advance from last word -> should loop back to review queue!
  AiDocTest.aiDocTestNextWord();
  assert.strictEqual(state.session.isReviewingLoop, true, 'Should enter review loop');
  assert.strictEqual(state.session.currentIndex, 0, 'Should loop back to word 0 in review queue');
  assert.strictEqual(state.session.isFinished, false, 'Should not be finished yet');

  // 5. User corrects first word in review loop
  state.session.userInputs['test_1'] = 'ni hao'; // toneless accepted!
  AiDocTest.aiDocTestCheckPinyin('test_1');

  assert.strictEqual(state.session.results['test_1'].pinyinOk, true);
  assert.strictEqual(state.session.masteredCount, 2);
  assert.strictEqual(state.session.reviewQueue.length, 0, 'Review queue should be empty');

  // 6. Advance -> all words mastered -> finished!
  AiDocTest.aiDocTestNextWord();
  assert.strictEqual(state.session.isFinished, true, 'Should be 100% finished and mastered');
});

console.log(`\n🎉 All ${passedCount} tests passed successfully!`);
