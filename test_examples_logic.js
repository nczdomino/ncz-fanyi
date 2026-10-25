// test_examples_logic.js - Regression tests for example-sentence selection.
//
// The old selector accepted any sentence that merely contained all of the word's
// characters, so 107 of the 1,615 dictionary words were shown an example that did not
// contain the word at all (好吃 with "吃好", 多少 with "减少…多…"), and in 106 cases it was
// the first example the learner saw. The first check below is exactly that regression.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const CORE = require('./js/features/examples-core.js');

let passed = 0;
let failed = 0;
function check(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✅ ' + name);
  } catch (err) {
    failed++;
    console.log('  ❌ ' + name);
    console.log('     ' + err.message);
  }
}

console.log('\n🧪 Example sentence tests\n');

// ---------------------------------------------------------------- vm harness
function makeContext() {
  const ctx = { console, module: { exports: {} }, globalThis: null, Intl };
  ctx.globalThis = ctx;
  ctx.window = ctx;
  vm.createContext(ctx);

  for (const f of [
    'js/data/mini-dict.js',
    'js/data/hsk789.js',
    'js/data/common-words.js',
    'js/data/ja-common.js',
    'js/data/examples.js',
    'js/features/examples-core.js',
    'js/features/examples.js',
  ]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, f), 'utf8'), ctx, { filename: f });
  }

  ctx.state = {
    meaningLang: 'vi',
    meaningLang2: null,
    activeWord: '',
    sentences: [],
    translations: {},
    cachedTranslations: {},
  };
  ctx.getUserDict = () => ({});
  ctx.getWordPinyin = () => '';
  ctx.escapeHtml = (s) => String(s == null ? '' : s);
  ctx.t = (k) => k;
  ctx.tx = (vi, en, ja) => vi;
  ctx.getLangName = (c) => c;
  ctx.fetchOnlineExamples = async () => [];
  ctx.translateTextOnline = async () => '';
  ctx.document = { getElementById: () => null, querySelectorAll: () => [] };
  return ctx;
}

const ctx = makeContext();
const MINI_DICT = vm.runInContext('MINI_DICT', ctx);
const WORD_EXAMPLES_LIST = vm.runInContext('WORD_EXAMPLES_LIST', ctx);
const dictWords = Object.keys(MINI_DICT);

// ================================================== the headline regression
console.log('--- Every shown example must contain the word ---');

check('no dictionary word is shown an example that omits it', () => {
  const offenders = [];
  for (const word of dictWords) {
    const list = ctx.getWordCandidateExamples(word, { limit: 3, rotate: true });
    for (const item of list) {
      if (!item || !item.zh) continue;
      if (item.zh.indexOf(word) === -1) {
        offenders.push(word + ' → ' + item.zh);
        break;
      }
    }
  }
  assert.strictEqual(offenders.length, 0,
    offenders.length + ' word(s) still get an unrelated example:\n     ' + offenders.slice(0, 5).join('\n     '));
});

check('the specific old false positives are gone', () => {
  const cases = [['好吃', '吃好'], ['多少', '减少'], ['您好', '准备好您的'], ['去年', '年假']];
  for (const [word] of cases) {
    for (const item of ctx.getWordCandidateExamples(word, { limit: 4, rotate: true })) {
      assert.ok(item.zh.indexOf(word) !== -1, `${word} got "${item.zh}" which lacks the word`);
    }
  }
});

// ================================================== ranking behaviour
console.log('\n--- Ranking ---');

check('an example with the word in the middle beats one that starts with it', () => {
  const list = [
    { zh: '大学学生很多。', vi: 'Trường đại học có nhiều sinh viên.' },
    { zh: '我认识这个学生。', vi: 'Tôi quen học sinh này.' },
  ];
  const ranked = CORE.rankExamples(list, '学生', { lookupHsk: () => 2, lang: 'vi' });
  assert.strictEqual(ranked[0].zh, '我认识这个学生。');
});

check('shorter, easier sentences win over long hard ones', () => {
  const easy = { zh: '我是学生。', vi: 'Tôi là học sinh.' };
  const hard = { zh: '这次讨论让所有参加者都对学生提出了更高的要求。', vi: 'Cuộc thảo luận này đặt ra yêu cầu cao hơn cho học sinh.' };
  const easySeg = () => ['我', '是', '学生'];
  const hardSeg = () => ['这次', '讨论', '参加者', '学生', '提出', '要求'];
  const lookupEasy = (t) => ({ 我: 1, 是: 1, 学生: 1 }[t]);
  const lookupHard = (t) => ({ 学生: 1, 讨论: 6, 参加者: 6, 提出: 6, 要求: 6 }[t]);
  const rankedEasy = CORE.rankExamples([hard], '学生', { lookupHsk: lookupHard, segment: hardSeg, lang: 'vi' });
  const rankedShort = CORE.rankExamples([easy], '学生', { lookupHsk: lookupEasy, segment: easySeg, lang: 'vi' });
  assert.ok(rankedShort[0]._score > rankedEasy[0]._score,
    `short/easy ${rankedShort[0]._score} should beat long/hard ${rankedEasy[0]._score}`);
});

check('an example matching the meaning on screen is preferred', () => {
  const list = [
    { zh: '他学习很努力。', vi: 'Anh ấy học tập rất chăm chỉ.' },
    { zh: '这个学生很优秀。', vi: 'Học sinh này rất xuất sắc.' },
  ];
  const ranked = CORE.rankExamples(list, '学生', { lookupHsk: () => 2, lang: 'vi', senseText: 'học sinh' });
  assert.strictEqual(ranked[0].zh, '这个学生很优秀。');
});

// ================================================== difficulty
console.log('\n--- Difficulty ---');

check('difficulty follows the hardest known word', () => {
  const seg = (t) => t.match(/[\u4e00-\u9fff]{0,2}/g).filter(Boolean);
  assert.strictEqual(CORE.estimateDifficulty('我是学生', () => 1, (t) => ['我', '是', '学生']), 1);
  assert.strictEqual(
    CORE.estimateDifficulty('我是学生', (t) => (t === '学生' ? 2 : 1), (t) => ['我', '是', '学生']), 2);
  const lookup = (t) => ({ 今天: 1, 经济: 5, 发展: 4 }[t]);
  assert.strictEqual(CORE.estimateDifficulty('今天经济发展', lookup, (t) => ['今天', '经济', '发展']), 5);
  // Without a segmenter the sentence falls back to characters, which must not throw.
  assert.strictEqual(typeof CORE.estimateDifficulty('我是学生', () => 1), 'number');
});

check('buckets map to learner-friendly labels', () => {
  assert.strictEqual(CORE.difficultyBucket(1), 'beginner');
  assert.strictEqual(CORE.difficultyBucket(4), 'intermediate');
  assert.strictEqual(CORE.difficultyBucket(6), 'advanced');
  assert.strictEqual(CORE.difficultyBucket(0), 'unknown');
});

// ================================================== diversity
console.log('\n--- Diversity ---');

check('the picked set varies by length and by word position', () => {
  const ranked = CORE.rankExamples([
    { zh: '学生来了。', vi: 'Học sinh đến rồi.' },
    { zh: '他是学生。', vi: 'Anh ấy là học sinh.' },
    { zh: '老师说这个学生今天表现特别好。', vi: 'Giáo viên nói học sinh này hôm nay rất tốt.' },
    { zh: '我认识一个来自南方城市的学生。', vi: 'Tôi quen một học sinh đến từ thành phố phía nam.' },
  ], '学生', { lookupHsk: () => 1, lang: 'vi' });
  const picked = CORE.pickDiverse(ranked, 3, '学生', 0);
  assert.strictEqual(picked.length, 3);
  assert.strictEqual(new Set(picked.map(p => p.zh)).size, 3, 'duplicate examples picked');
});

check('rotation changes which good examples are shown', () => {
  const ranked = CORE.rankExamples([
    { zh: '学生来了。', vi: 'a' }, { zh: '他是学生。', vi: 'b' },
    { zh: '这个学生很好。', vi: 'c' }, { zh: '我认识学生。', vi: 'd' },
  ], '学生', { lookupHsk: () => 1, lang: 'vi' });
  const a = CORE.pickDiverse(ranked, 1, '学生', 0).map(x => x.zh).join();
  const b = CORE.pickDiverse(ranked, 1, '学生', 1).map(x => x.zh).join();
  assert.notStrictEqual(a, b, 'rotation had no effect');
});

// ================================================== online filter
console.log('\n--- Online candidate quality gate ---');

check('rejects sentences that do not contain the word', () => {
  assert.strictEqual(CORE.isUsableOnlineExample({ zh: '我学中文，他生在中国。' }, '学生'), false);
  assert.strictEqual(CORE.isUsableOnlineExample({ zh: '他是一名大学生。' }, '学生'), true);
});

check('rejects bare words, fragments and Latin noise', () => {
  assert.strictEqual(CORE.isUsableOnlineExample({ zh: '学生' }, '学生'), false);
  assert.strictEqual(CORE.isUsableOnlineExample({ zh: 'This is 学生 stuff' }, '学生'), false);
  assert.strictEqual(CORE.isUsableOnlineExample({ zh: '学' }, '学生'), false);
  assert.strictEqual(CORE.isUsableOnlineExample({ zh: '' }, '学生'), false);
});

check('human corpora outrank machine translation memory', () => {
  assert.ok(CORE.sourceRank({ source: 'tatoeba' }) > CORE.sourceRank({ source: 'mymemory' }));
  assert.ok(CORE.sourceRank({ source: 'context', isContext: true }) > CORE.sourceRank({ source: 'tatoeba' }));
});

// ================================================== wiring
console.log('\n--- Wiring ---');

const examplesSrc = fs.readFileSync(path.join(__dirname, 'js/features/examples.js'), 'utf8');

check('the character-scatter matcher is gone', () => {
  assert.ok(examplesSrc.indexOf('allCharsPresent') === -1, 'the old character-scatter layer is still present');
  assert.ok(/containsWord/.test(examplesSrc), 'the new containment check is not used');
});

check('selection goes through the ranker and the diversity picker', () => {
  assert.ok(/EXAMPLES_CORE/.test(examplesSrc) || /examplesCore\(\)/.test(examplesSrc), 'examples-core is not used');
  assert.ok(/rankExamples\(/.test(examplesSrc), 'rankExamples is not called');
  assert.ok(/pickDiverse\(/.test(examplesSrc), 'pickDiverse is not called');
});

check('the network is only used when the corpus cannot fill the list', () => {
  assert.ok(/localExamples\.length >= 3/.test(examplesSrc), 'online fetch is not gated on local coverage');
});

check('the index is built even without Intl.Segmenter', () => {
  assert.ok(/exampleSegmenter\(\)/.test(examplesSrc), 'segmenter helper missing');
  const seg = examplesSrc.slice(examplesSrc.indexOf('function initWordExamplesIndex'));
  assert.ok(/match\(\/\[\\u4e00-\\u9fff\]\/g\)/.test(seg), 'no character fallback for the index');
});

check('a difficulty badge and repeat button are rendered', () => {
  assert.ok(/example-level/.test(examplesSrc), 'difficulty badge missing');
  assert.ok(/repeatSpeak\(/.test(examplesSrc), 'repeat button missing');
  const css = fs.readFileSync(path.join(__dirname, 'css/components.css'), 'utf8');
  assert.ok(/\.example-level-beginner/.test(css), 'difficulty badge styles missing');
});

check('state.translations exists and the reader fills it', () => {
  const st = fs.readFileSync(path.join(__dirname, 'js/core/state.js'), 'utf8');
  assert.ok(/translations:\s*\{\}/.test(st), 'state.translations missing');
  const reader = fs.readFileSync(path.join(__dirname, 'js/features/reader.js'), 'utf8');
  assert.ok(/state\.translations\[sentence\]\s*=/.test(reader), 'the reader never fills state.translations');
});

check('examples-core.js loads before examples.js', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const core = html.indexOf('js/features/examples-core.js');
  const ex = html.indexOf('js/features/examples.js');
  assert.ok(core !== -1 && ex !== -1, 'a script tag is missing');
  assert.ok(core < ex, 'examples-core.js must load first');
});

check('the curated corpus is fully trilingual', () => {
  const bad = WORD_EXAMPLES_LIST.filter(x => !x.vi || !x.en || !x.ja);
  assert.strictEqual(bad.length, 0, bad.length + ' sentence(s) lack a translation');
});

check('coverage is measured, not assumed', () => {
  let covered = 0;
  for (const word of dictWords) {
    if (ctx.getWordCandidateExamples(word, { limit: 1, rotate: true }).length) covered++;
  }
  const pct = (covered / dictWords.length * 100).toFixed(1);
  console.log(`     (curated corpus covers ${covered}/${dictWords.length} words = ${pct}%)`);
  assert.ok(covered > 500, 'coverage collapsed: ' + covered);
});

console.log(`\n${failed === 0 ? '🎉' : '❌'} ${passed} passed, ${failed} failed.\n`);
process.exit(failed === 0 ? 0 : 1);
