/**
 * test_ai_doc_test.js
 * 
 * Unit tests for Halou AI Document Vocabulary Studio & Smart Drill:
 * 1. verifyPinyinInput (toneless 'ni hao', 'nihao', Vietnamese keyboard 'đian nao', numeric 'ni3 hao3', 'lv you')
 * 2. extractLocalVocabFromText (NLP tokenization, stopwords filter, comprehensive word retention up to 45 words, 1-char verbs)
 * 3. Quick-Select choices & Reveal actions
 * 4. Presets integrity (SAMPLE_PRESETS valid Chinese texts & titles)
 * 5. Drill Session State Machine (marking correct, review queue loop, 100% mastery finish)
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
// Suite 1: Mobile-Friendly Toneless Pinyin Input Verification
// -------------------------------------------------------------
console.log('--- 1. Mobile-Friendly Toneless Pinyin Input Verification ---');

test('Toneless pinyin accepted effortlessly (ni hao for nǐ hǎo)', () => {
  const res = AiDocTest.verifyPinyinInput('ni hao', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
});

test('Spaceless toneless pinyin accepted (nihao for nǐ hǎo)', () => {
  const res = AiDocTest.verifyPinyinInput('nihao', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
});

test('Vietnamese mobile keyboard auto-accent & đ tolerance (đian nao for diànnǎo)', () => {
  const res = AiDocTest.verifyPinyinInput('đian nao', 'diànnǎo');
  assert.strictEqual(res.correct, true);
});

test('Pinyin letter v for ü tolerance (lv you for lǚyóu)', () => {
  const res = AiDocTest.verifyPinyinInput('lv you', 'lǚyóu');
  assert.strictEqual(res.correct, true);
});

test('Exact match with accent marks', () => {
  const res = AiDocTest.verifyPinyinInput('nǐ hǎo', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
  assert.strictEqual(res.exactTone, true);
});

test('Numeric pinyin input converted to tone accents (ni3 hao3 -> nǐ hǎo)', () => {
  const res = AiDocTest.verifyPinyinInput('ni3 hao3', 'nǐ hǎo');
  assert.strictEqual(res.correct, true);
});

test('Compound multi-syllable word tolerance (rengong zhineng for réngōng zhìnéng)', () => {
  const resToneless = AiDocTest.verifyPinyinInput('rengong zhineng', 'réngōng zhìnéng');
  const resSpaceless = AiDocTest.verifyPinyinInput('rengongzhineng', 'réngōng zhìnéng');
  assert.strictEqual(resToneless.correct, true);
  assert.strictEqual(resSpaceless.correct, true);
});

test('Completely incorrect pinyin rejected', () => {
  const res = AiDocTest.verifyPinyinInput('xie xie', 'nǐ hǎo');
  assert.strictEqual(res.correct, false);
});

test('Empty or invalid input handling', () => {
  assert.strictEqual(AiDocTest.verifyPinyinInput('', 'nǐ hǎo').correct, false);
  assert.strictEqual(AiDocTest.verifyPinyinInput(null, 'nǐ hǎo').correct, false);
  assert.strictEqual(AiDocTest.verifyPinyinInput('ni hao', '').correct, false);
});

// -------------------------------------------------------------
// Suite 2: Local NLP Extractor & Comprehensive Word Retention
// -------------------------------------------------------------
console.log('\n--- 2. Comprehensive Word Extraction & Local NLP Engine ---');

test('Extracts comprehensive vocabulary and binds original context sentence', () => {
  const sampleDoc = "随着人工智能的快速发展，越来越多的年轻人开始使用智能工具。专家表示掌握先进技能具备显著优势。我们在餐馆喝茶吃菜，非常高兴。";
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

test('Does not artificially truncate list to 12 words when document has more', () => {
  // A text containing many words
  const longDoc = "北京、上海、广州、深圳是中国的大城市。科技、经济、文化、艺术、教育、医疗、交通和旅游都很繁荣。工人和学生努力工作与学习，为了美好未来而奋斗。每天清晨大家跑步运动，晚上看书听音乐。";
  const result = AiDocTest.extractLocalVocabFromText(longDoc, 'vi');
  assert.ok(result.totalWords > 12, `Extracted ${result.totalWords} words, should be > 12 without dropping valuable terms`);
});

test('Scales up to 200-300 vocabulary words when large document provided', () => {
  const commonWords = [
    '天气', '时间', '朋友', '家庭', '工作', '学习', '旅行', '运动', '音乐', '电影',
    '春天', '夏天', '秋天', '冬天', '太阳', '月亮', '星星', '白云', '森林', '大海',
    '飞机', '火车', '汽车', '轮船', '地铁', '单车', '公交', '车站', '码头', '机场',
    '面包', '米饭', '面条', '水饺', '包子', '牛奶', '咖啡', '果汁', '绿茶', '红茶'
  ];
  let doc = '';
  // Generate multi-sentence document with diverse words
  commonWords.forEach((w, i) => {
    doc += `今天我们讨论${w}的相关情况。这个${w}对大家的影响非常重要。`;
  });
  const result = AiDocTest.extractLocalVocabFromText(doc, 'vi');
  assert.ok(result.totalWords >= 40, `Extracted ${result.totalWords} words`);
  assert.ok(result.totalWords <= 300, `Cap should respect 300 words limit`);
});

test('Filters out pure stop words (的, 了, 是, etc.) but retains terms', () => {
  const doc = "的 了 是 我 你 他 她 它 们 在 有 和 电脑 手机";
  const result = AiDocTest.extractLocalVocabFromText(doc, 'vi');
  
  const words = result.words.map(w => w.word);
  assert.strictEqual(words.includes('的'), false, 'Should filter 的');
  assert.strictEqual(words.includes('了'), false, 'Should filter 了');
  assert.strictEqual(words.includes('是'), false, 'Should filter 是');
  assert.strictEqual(words.includes('电脑'), true, 'Should retain 电脑');
  assert.strictEqual(words.includes('手机'), true, 'Should retain 手机');
});

test('Supports trilingual locales (vi, en, ja)', () => {
  const doc = "我非常喜欢学习汉语。";
  const resVi = AiDocTest.extractLocalVocabFromText(doc, 'vi');
  const resEn = AiDocTest.extractLocalVocabFromText(doc, 'en');
  const resJa = AiDocTest.extractLocalVocabFromText(doc, 'ja');

  assert.ok(resVi.words.length > 0);
  assert.ok(resEn.words.length > 0);
  assert.ok(resJa.words.length > 0);
});

// -------------------------------------------------------------
// Suite 3: Presets & Mobile Quick-Select Choices
// -------------------------------------------------------------
console.log('\n--- 3. Presets & Mobile Quick-Select Choices ---');

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

test('Quick-Select choice pills generator and tap action', () => {
  AiDocTest.aiDocTestState.data = {
    summary: 'Test',
    totalWords: 2,
    words: [
      { id: 'w1', word: '你好', pinyin: 'nǐ hǎo' },
      { id: 'w2', word: '世界', pinyin: 'shìjiè' }
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

  // Test 1-tap select choice
  AiDocTest.aiDocTestSelectPinyinChoice('ni hao', 'w1');
  assert.strictEqual(AiDocTest.aiDocTestState.session.results['w1'].pinyinOk, true);

  // Test reveal pinyin
  AiDocTest.aiDocTestRevealPinyin('w2');
  assert.strictEqual(AiDocTest.aiDocTestState.session.userInputs['w2'], 'shìjiè');
});

// -------------------------------------------------------------
// Suite 4: Drill Session State Machine & 100% Mastery Loop
// -------------------------------------------------------------
console.log('\n--- 4. Drill Session State Machine & 100% Mastery Loop ---');

test('Full drill lifecycle: toneless input, review loop on error, 100% mastery finish', () => {
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

  // 3. Second word toneless input (zai jian)
  state.session.userInputs['test_2'] = 'zai jian';
  AiDocTest.aiDocTestCheckPinyin('test_2');

  assert.strictEqual(state.session.results['test_2'].pinyinOk, true, 'test_2 should be marked correct via toneless input');
  assert.strictEqual(state.session.masteredCount, 1, 'Mastered count should be 1');

  // 4. Advance from last word -> should loop back to review queue!
  AiDocTest.aiDocTestNextWord();
  assert.strictEqual(state.session.isReviewingLoop, true, 'Should enter review loop');
  assert.strictEqual(state.session.currentIndex, 0, 'Should loop back to word 0 in review queue');
  assert.strictEqual(state.session.isFinished, false, 'Should not be finished yet');

  // 5. User corrects first word in review loop (nihao without space or tones)
  state.session.userInputs['test_1'] = 'nihao';
  AiDocTest.aiDocTestCheckPinyin('test_1');

  assert.strictEqual(state.session.results['test_1'].pinyinOk, true);
  assert.strictEqual(state.session.masteredCount, 2);
  assert.strictEqual(state.session.reviewQueue.length, 0, 'Review queue should be empty');

  // 6. Advance -> all words mastered -> finished!
  AiDocTest.aiDocTestNextWord();
  assert.strictEqual(state.session.isFinished, true, 'Should be 100% finished and mastered');
});

console.log(`\n🎉 All ${passedCount} tests passed successfully!`);
