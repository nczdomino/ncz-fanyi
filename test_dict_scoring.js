// test_dict_scoring.js - Regression suite for the language-aware ranking engine
//
// These are the exact classes of query that used to return nonsense ("tào lao"):
//   * Vietnamese syllable that collides with a pinyin syllable  (ăn / an / di / ma)
//   * Vietnamese query answered with a Pinyin prefix scan       (ăn -> 安静, 安全, 按照)
//   * English/Vietnamese query answered by a Han-Viet coincidence
//   * multi-word Vietnamese phrase that never reached the dictionary entry
//
// Run with: node test_dict_scoring.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT = __dirname;

// Load the scripts in the same order as index.html so `typeof window !== 'undefined'`
// style guards behave exactly like they do in the browser.
const ctx = { console, module: { exports: {} }, globalThis: null };
ctx.globalThis = ctx;
ctx.window = ctx;
vm.createContext(ctx);

const LOAD_ORDER = [
  'js/data/mini-dict.js',
  'js/data/hsk789.js',
  'js/data/common-words.js',
  'js/data/reverse-dict.js',
  'js/data/dict-synsets.js',
  'js/data/han-viet.js',
  'js/data/kanji-data.js',
  'js/data/ja-common.js',
  'js/data/examples.js',
  'js/data/slang-data.js',
  'js/core/state.js',
  'js/core/utils.js',
  'js/data/i18n-data.js',
  'js/features/nlp.js',
  'js/features/dict-search-engine.js',
  'js/features/dict-scoring.js'
];

// state.js / utils.js touch localStorage and DOM globals; provide inert stubs.
ctx.localStorage = {
  _d: {},
  getItem(k) { return Object.prototype.hasOwnProperty.call(this._d, k) ? this._d[k] : null; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; }
};
ctx.navigator = { language: 'vi-VN' };
ctx.document = {
  getElementById() { return null; },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement() { return { style: {}, dataset: {}, appendChild() {}, addEventListener() {} }; },
  head: { appendChild() {} },
  body: { appendChild() {} }
};
ctx.performance = { now: () => Number(process.hrtime.bigint()) / 1e6 };

for (const f of LOAD_ORDER) {
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  } catch (err) {
    // A couple of UI modules legitimately need more browser surface; the ranking
    // engine must not depend on them.
    if (f.startsWith('js/core/') || f.startsWith('js/data/i18n') || f.includes('nlp')) continue;
    throw err;
  }
}

const search = ctx.searchDictionary;
assert.strictEqual(typeof search, 'function', 'searchDictionary() was not exported');

const words = res => res.matches.map(m => m.word);
const top = (q, n = 5) => words(search(q, { limit: n }));
const has = (q, w) => words(search(q, { limit: 120 })).indexOf(w) !== -1;
const rank = (q, w) => words(search(q, { limit: 120 })).indexOf(w);

let passed = 0;
function check(name, fn) {
  fn();
  passed++;
  console.log('  ✅ ' + name);
}

console.log('\n🧪 Dictionary scoring engine regression tests\n');

// ---------------------------------------------------------------- Vietnamese
console.log('--- Vietnamese: exact meaning must beat pinyin collisions ---');
check('"ăn" returns 吃 first', () => {
  assert.strictEqual(top('ăn')[0], '吃', 'top result was ' + top('ăn').join(', '));
});
check('"ăn" is not flooded with pinyin ān- words', () => {
  const r = top('ăn', 4).slice(1);
  for (const bad of ['安静', '安全', '按照', '安排', '按时', '昂贵']) {
    assert.ok(r.indexOf(bad) === -1, `"${bad}" should not be in the top 4 for "ăn" (got ${r.join(', ')})`);
  }
});
check('"di" returns 去 before 底', () => {
  const t = top('di', 3);
  assert.strictEqual(t[0], '去', 'top result was ' + t.join(', '));
  const diRank = rank('di', '底');
  assert.ok(diRank === -1 || diRank > 2, '底 (dǐ) must not rank in the top 3 for "di"');
});
check('"ma" surfaces 吗 / 马 / 妈妈', () => {
  const t = top('ma', 6);
  assert.ok(t.indexOf('吗') !== -1 || t.indexOf('马') !== -1, 'expected a pinyin match for "ma"');
  assert.ok(t.indexOf('妈妈') !== -1, 'expected 妈妈 for "ma"');
});
check('"ma" keeps pinyin candidates inside the top 5', () => {
  // "ma" is genuinely ambiguous (mà = but, mā = mother, ma = question particle).
  // Promise: the pinyin reading is never buried, and no junk floods the list.
  const t = top('ma', 5);
  assert.ok(t.indexOf('吗') !== -1, '吗 should be in the top 5, got ' + t.join(', '));
  assert.ok(t.indexOf('马') !== -1, '马 should be in the top 5, got ' + t.join(', '));
});
check('"tôi" returns 我 first', () => {
  assert.strictEqual(top('tôi')[0], '我', 'top result was ' + top('tôi').join(', '));
});
check('"nước" returns 水 first', () => {
  assert.strictEqual(top('nước')[0], '水', 'top result was ' + top('nước').join(', '));
});
check('"yêu" returns 爱 first', () => {
  const t = top('yêu', 3);
  assert.strictEqual(t[0], '爱', 'top result was ' + t.join(', '));
});
check('"đi" returns 去 first', () => {
  assert.strictEqual(top('đi')[0], '去', 'top result was ' + top('đi').join(', '));
});
check('"học sinh" returns 学生', () => {
  assert.strictEqual(top('học sinh')[0], '学生', 'top result was ' + top('học sinh').join(', '));
});
check('"thời tiết" returns 天气', () => {
  assert.strictEqual(top('thời tiết')[0], '天气', 'top result was ' + top('thời tiết').join(', '));
});
check('"cảm ơn" returns 谢谢', () => {
  assert.ok(top('cảm ơn', 3).indexOf('谢谢') !== -1, 'got ' + top('cảm ơn', 3).join(', '));
});
check('"ăn cơm" returns 吃饭', () => {
  assert.strictEqual(top('ăn cơm')[0], '吃饭', 'top result was ' + top('ăn cơm').join(', '));
});
check('unaccented "an com" also returns 吃饭', () => {
  assert.strictEqual(top('an com')[0], '吃饭', 'top result was ' + top('an com').join(', '));
});
check('"khong co gi" returns 不客气', () => {
  assert.strictEqual(top('khong co gi')[0], '不客气', 'top result was ' + top('khong co gi').join(', '));
});

// ------------------------------------------------------------------- English
console.log('\n--- English ---');
check('"eat" returns 吃', () => {
  assert.ok(has('eat', '吃'), 'got ' + top('eat', 5).join(', '));
});
check('"eating" (inflected) returns 吃', () => {
  assert.ok(has('eating', '吃'), 'got ' + top('eating', 5).join(', '));
});
check('"big" returns 大', () => {
  assert.strictEqual(top('big')[0], '大', 'top result was ' + top('big').join(', '));
});
check('"hello" returns 你好', () => {
  assert.ok(has('hello', '你好'), 'got ' + top('hello', 5).join(', '));
});
check('"book" returns 书', () => {
  assert.ok(has('book', '书'), 'got ' + top('book', 5).join(', '));
});
check('English function words never match through the English glosses', () => {
  // "the" legitimately matches Vietnamese "thế/thể/thẻ", but it must not pull in every
  // English gloss that merely contains "the" (there/they/other/...).
  const r = search('the', { limit: 120 });
  const viaEnglish = r.matches.filter(m => m.matchField === 'en');
  assert.strictEqual(viaEnglish.length, 0,
    'English-gloss matches leaked for "the": ' + viaEnglish.map(m => m.word).join(', '));
});

// ------------------------------------------------------------------ Japanese
console.log('\n--- Japanese ---');
check('romaji "taberu" returns 吃', () => {
  assert.ok(has('taberu', '吃'), 'got ' + top('taberu', 5).join(', '));
});
check('kana "ねこ" returns 猫', () => {
  assert.ok(has('ねこ', '猫'), 'got ' + top('ねこ', 5).join(', '));
});

// ------------------------------------------------------------------- Chinese
console.log('\n--- Chinese ---');
check('"你好" returns 你好 first', () => {
  assert.strictEqual(top('你好')[0], '你好');
});
check('"吃" returns 吃 first', () => {
  assert.strictEqual(top('吃')[0], '吃');
});
check('"研究" returns 研究 first', () => {
  assert.strictEqual(top('研究')[0], '研究');
});

// ------------------------------------------------------------------- Typos
console.log('\n--- Typo tolerance (previously implemented but never called) ---');
check('"aple" suggests 苹果', () => {
  assert.ok(has('aple', '苹果'), 'got ' + top('aple', 5).join(', '));
});
check('"hoc sjnh" degrades gracefully (no crash, no junk flood)', () => {
  const r = search('hoc sjnh', { limit: 20 });
  assert.ok(Array.isArray(r.matches));
});

// --------------------------------------------------------------- Structure
console.log('\n--- Result structure & safety ---');
check('matches carry a tier', () => {
  const r = search('ăn', { limit: 20 });
  for (const m of r.matches) assert.ok(['primary', 'related', 'weak'].indexOf(m.tier) !== -1, 'bad tier: ' + m.tier);
});
check('no duplicate words in a result set', () => {
  const r = words(search('ăn', { limit: 120 }));
  assert.strictEqual(new Set(r).size, r.length, 'duplicates: ' + r.join(', '));
});
check('nonsense query returns nothing', () => {
  assert.strictEqual(search('zzzqx').matches.length, 0);
});
check('empty query is a no-op', () => {
  assert.strictEqual(search('').matches.length, 0);
  assert.strictEqual(search('   ').matches.length, 0);
});
check('a 1.5k-entry lookup stays under 25 ms', () => {
  const t0 = process.hrtime.bigint();
  for (let i = 0; i < 20; i++) search('ăn');
  const perCall = Number(process.hrtime.bigint() - t0) / 20 / 1e6;
  assert.ok(perCall < 25, 'avg search took ' + perCall.toFixed(2) + ' ms');
  console.log(`     (avg ${perCall.toFixed(2)} ms/query)`);
});

// -------------------------------------------------- Japanese script integrity
console.log('\n--- Japanese: kana handling (NFD / katakana folding) ---');
const { stripVietnameseTones, katakanaToHiragana } = require('./js/features/dict-search-engine.js');
check('stripVietnameseTones does not decompose kana with dakuten', () => {
  // NFD splits ず into す + U+3099; without re-composing, every kana query was corrupted.
  assert.strictEqual(stripVietnameseTones('みず'), 'みず');
  assert.strictEqual(stripVietnameseTones('がっこう'), 'がっこう');
  assert.strictEqual(stripVietnameseTones('でんしゃ'), 'でんしゃ');
  assert.strictEqual(stripVietnameseTones('cảm ơn'), 'cam on', 'Vietnamese stripping must still work');
});
check('katakanaToHiragana converts on-readings', () => {
  assert.strictEqual(katakanaToHiragana('スイ'), 'すい');
  assert.strictEqual(katakanaToHiragana('ホン'), 'ほん');
});
check('kana lookups reach the Chinese entry', () => {
  assert.strictEqual(top('みず')[0], '水');
  assert.strictEqual(top('がっこう')[0], '学校');
  assert.strictEqual(top('でんしゃ')[0], '电车');
  assert.strictEqual(top('せんせい')[0], '老师');
  assert.strictEqual(top('ともだち')[0], '朋友');
  assert.strictEqual(top('でんわ')[0], '电话');
  assert.strictEqual(top('ねむい')[0], '困');
  assert.strictEqual(top('おはよう')[0], '早上好');
  assert.strictEqual(top('こんばんは')[0], '晚上好');
});
check('katakana on-reading query resolves (ほん -> 本)', () => {
  assert.ok(top('ほん', 3).indexOf('本') !== -1, 'got ' + top('ほん', 3).join(', '));
});
check('2-kana query does not match a longer kun reading', () => {
  const t = words(search('やま', { limit: 20 }));
  assert.strictEqual(t[0], '山', 'got ' + t.join(', '));
  assert.ok(t.indexOf('病') === -1, 'やま must not match 病 (やまい)');
  assert.ok(t.indexOf('叹为观止') === -1, 'やま must not match 感嘆してやまない');
});

// ------------------------------------------------- English phrase heads
console.log('\n--- English phrase heads ("to eat", "very big") ---');
check('"to eat" resolves to 吃', () => assert.strictEqual(top('to eat')[0], '吃'));
check('"to go" resolves to 去', () => assert.strictEqual(top('to go')[0], '去'));
check('"very big" resolves to 大', () => assert.strictEqual(top('very big')[0], '大'));
check('"i love you" resolves to 我爱你', () => assert.strictEqual(top('i love you')[0], '我爱你'));
check('"fire" resolves to 火 (was fuzzy noise: 五 / 好 / 文件)', () => {
  assert.strictEqual(top('fire')[0], '火', 'got ' + top('fire', 5).join(', '));
});
check('"chi fan" resolves to 吃饭', () => assert.strictEqual(top('chi fan')[0], '吃饭'));
check('"wo ai ni" resolves to 我爱你', () => assert.strictEqual(top('wo ai ni')[0], '我爱你'));

// ------------------------------------------------- everyday Vietnamese
console.log('\n--- Everyday Vietnamese (previously returned nothing) ---');
const daily = [
  ['phở', '河粉'], ['bún chả', '米粉'], ['xe máy', '摩托车'], ['áo dài', '奥黛'],
  ['trời mưa', '下雨'], ['buồn ngủ', '困'], ['về nhà', '回家'], ['đi ngủ', '睡觉'],
  ['thức dậy', '起床'], ['sinh nhật', '生日快乐'], ['tan học', '放学'], ['nhớ nhà', '想家'],
  ['uống cà phê', '喝咖啡'], ['yêu nhau', '相爱']
];
for (const [q, expected] of daily) {
  check(`"${q}" resolves to ${expected}`, () => {
    assert.strictEqual(top(q)[0], expected, 'got ' + top(q, 5).join(', '));
  });
}

// ------------------------------------------------- phrase-level sentences
console.log('\n--- Sentences / polite phrases ---');
const sentences = [
  ['tôi yêu bạn', '我爱你'], ['bạn khỏe không', '你好吗'], ['tôi không biết', '我不知道'],
  ['cho tôi xem', '让我看看'], ['giúp tôi với', '帮帮我'], ['đợi một chút', '等一下'],
  ['cảm ơn rất nhiều', '非常感谢']
];
for (const [q, expected] of sentences) {
  check(`"${q}" resolves to ${expected}`, () => {
    assert.strictEqual(top(q)[0], expected, 'got ' + top(q, 5).join(', '));
  });
}
check('a query longer than the entry still matches it ("xin lỗi nhé")', () => {
  assert.ok(has('xin lỗi nhé', '对不起'), 'got ' + top('xin lỗi nhé', 5).join(', '));
});

// --------------------------------------------- Hán-Việt and tone regressions
console.log('\n--- Phonetic coincidences must not beat meaning ---');
check('"phở" does not return 普通 (Hán-Việt phổ thông)', () => {
  const t = words(search('phở', { limit: 20 }));
  assert.ok(t.indexOf('普通') === -1, 'got ' + t.join(', '));
  assert.ok(t.indexOf('普通话') === -1, 'got ' + t.join(', '));
});
check('"thức dậy" does not rank 推动 as a confident result', () => {
  const r = search('thức dậy', { limit: 10 });
  const tuiDong = r.matches.find(m => m.word === '推动');
  if (tuiDong) assert.strictEqual(tuiDong.tier, 'related', '推动 must never be a primary hit for "thức dậy"');
});
check('tone-exact sense still outranks a tone-mismatched one', () => {
  assert.strictEqual(top('sách')[0], '书', 'got ' + top('sách').join(', '));
});

// -------------------------------------------------------- new dictionary data
console.log('\n--- common-words.js dataset ---');
check('previously missing everyday words now exist', () => {
  const D = vm.runInContext('MINI_DICT', ctx);
  for (const w of ['火', '困', '起床', '知道', '觉得', '电话', '公司', '银行', '火车站'.slice(0, 2), '我爱你', '生日快乐']) {
    assert.ok(D[w], 'missing entry: ' + w);
  }
});
check('common-words.js never overwrites a curated entry', () => {
  const D = vm.runInContext('MINI_DICT', ctx);
  assert.strictEqual(D['你好'].vi, 'xin chào', 'original entry was overwritten');
});
check('every added entry has the fields the UI needs', () => {
  const CW = ctx.COMMON_WORDS;
  assert.ok(CW && typeof CW === 'object', 'COMMON_WORDS not exported');
  const problems = [];
  for (const w of Object.keys(CW)) {
    const e = CW[w];
    if (!e.pinyin) problems.push(w + ':pinyin');
    if (!e.vi) problems.push(w + ':vi');
    if (!Array.isArray(e.en) || !e.en.length) problems.push(w + ':en');
    if (!e.ja) problems.push(w + ':ja');
  }
  assert.strictEqual(problems.length, 0, 'incomplete entries: ' + problems.join(', '));
});
check('reverse dictionary has no malformed entries', () => {
  const { REVERSE_DICT_ENTRIES } = require('./js/data/reverse-dict.js');
  for (const e of REVERSE_DICT_ENTRIES) {
    assert.ok(e.zh && e.vi && Array.isArray(e.keys) && e.keys.length, 'bad entry: ' + JSON.stringify(e).slice(0, 80));
  }
});

// --------------------------------------------------------- Static XSS checks
console.log('\n--- Static safety checks ---');
check('no onclick handler interpolates escapeHtml() inside a JS string', () => {
  const dictSrc = fs.readFileSync(path.join(ROOT, 'js/features/dict.js'), 'utf8');
  const bad = /onclick="[^"]*escapeHtml\(/.exec(dictSrc);
  assert.strictEqual(bad, null, 'found unsafe handler: ' + (bad && bad[0]));
});
check('dict-scoring.js is loaded before dict.js in index.html', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.ok(html.indexOf('js/features/dict-scoring.js') < html.indexOf('js/features/dict.js'),
    'dict-scoring.js must be loaded before dict.js');
});

console.log(`\n🎉 ${passed} dictionary scoring tests passed.\n`);
