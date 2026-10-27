// test_dict_render.js - End-to-end render smoke test for the dictionary view.
//
// Run with: node test_dict_render.js
//
// Loads the real scripts in index.html order against a tiny fake DOM and asserts that
// renderDictView() produces the expected cards. This catches integration mistakes that
// unit-testing the scoring engine alone would miss (missing globals, bad template strings).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const ctx = { console, module: { exports: {} }, globalThis: null };
ctx.globalThis = ctx;
ctx.window = ctx;
vm.createContext(ctx);

function stubEl(id) {
  return {
    id,
    style: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    dataset: {},
    innerHTML: '',
    textContent: '',
    value: '',
    nextElementSibling: null,
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener() {},
    appendChild() {},
    focus() {},
    getAttribute() { return null; },
    setAttribute() {},
  };
}

const els = new Map();
ctx.document = {
  getElementById(id) {
    if (!els.has(id)) els.set(id, stubEl(id));
    return els.get(id);
  },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement() { return stubEl('created'); },
  head: { appendChild() {} },
  body: { appendChild() {} },
};
ctx.navigator = { language: 'vi-VN' };
ctx.localStorage = {
  _d: {},
  getItem(k) { return Object.prototype.hasOwnProperty.call(this._d, k) ? this._d[k] : null; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; },
};
ctx.performance = { now: () => 0 };
ctx.setTimeout = setTimeout;
ctx.clearTimeout = clearTimeout;
ctx.fetch = () => Promise.reject(new Error('network disabled in smoke test'));
ctx.Intl = Intl;

const ORDER = [
  'js/core/storage.js',
  'js/data/i18n-data.js',
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
  'js/features/nlp.js',
  'js/features/dict-search-engine.js',
  'js/features/dict-scoring.js',
  'js/features/ext-dict.js',
  'js/features/dict.js',
];

for (const f of ORDER) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
}

// dict.js calls translateTextOnline() only for ja meaning; provide an inert version.
ctx.translateTextOnline = () => Promise.resolve('');
vm.runInContext('translateTextOnline = function () { return Promise.resolve(""); };', ctx);

const results = ctx.document.getElementById('dict-results-container');
let failures = 0;

function render(query) {
  results.innerHTML = '';
  vm.runInContext('state.searchQuery = ' + JSON.stringify(query) + '; renderDictView();', ctx);
  return results.innerHTML;
}

function expect(query, needles, forbidden) {
  let html;
  try {
    html = render(query);
  } catch (err) {
    failures++;
    console.log(`  ❌ "${query}" threw: ${err.message}`);
    return;
  }
  const ok = needles.every(n => html.indexOf(n) !== -1);
  const clean = (forbidden || []).every(n => html.indexOf(n) === -1);
  if (ok && clean) {
    console.log(`  ✅ "${query}" renders (${html.length} bytes)`);
  } else {
    failures++;
    const missing = needles.filter(n => html.indexOf(n) === -1);
    const leaked = (forbidden || []).filter(n => html.indexOf(n) !== -1);
    console.log(`  ❌ "${query}" missing=[${missing}] forbidden=[${leaked}]`);
  }
}

console.log('\n🧪 Dictionary view render smoke test\n');

expect('ăn', ['吃', 'dict-item-card'], ['安静']);
expect('ăn cơm', ['吃饭']);
expect('cảm ơn', ['谢谢']);
expect('tôi', ['我']);
expect('di', ['去']);
expect('học sinh', ['学生']);
expect('big', ['大']);
expect('hello', ['你好']);
expect('你好', ['你好']);
expect('zzzqx', ['dict-no-match-wrapper']);
// Round two: entries and kana paths added after the first pass.
expect('でんしゃ', ['电车']);
expect('phở', ['河粉']);
expect('tôi yêu bạn', ['我爱你']);
expect('buồn ngủ', ['困']);
expect('to eat', ['吃']);

// Round three: typo suggestions and matched-fragment highlighting.
const suggHtml = render('aple');
console.log(suggHtml.indexOf('dict-suggest-divider') !== -1
  ? '  ✅ "did you mean" group renders for a typo'
  : '  ❌ "did you mean" group missing for "aple"');
if (suggHtml.indexOf('dict-suggest-divider') === -1) failures++;

const hitHtml = render('ăn');
console.log(hitHtml.indexOf('<mark class="dict-hit">') !== -1
  ? '  ✅ matched fragment is highlighted in the definition'
  : '  ❌ no <mark class="dict-hit"> in the rendered result');
if (hitHtml.indexOf('<mark class="dict-hit">') === -1) failures++;

// The related-words divider must appear for a query with secondary hits.
const html = render('ăn');
if (html.indexOf('dict-related-divider') !== -1) {
  console.log('  ✅ related-words divider rendered for "ăn"');
} else {
  failures++;
  console.log('  ❌ related-words divider missing for "ăn"');
}

// Browse modes must keep working (they use a separate branch of renderDictView).
function renderBrowse(setup) {
  results.innerHTML = '';
  vm.runInContext(setup, ctx);
  return results.innerHTML;
}
try {
  const hskHtml = renderBrowse('state.searchQuery = ""; state.showHskBrowser = true; state.dictFilterHSK = "1"; renderDictView();');
  console.log(hskHtml.indexOf('dict-item-card') !== -1
    ? '  ✅ HSK browse mode renders'
    : '  ❌ HSK browse mode rendered nothing');
  if (hskHtml.indexOf('dict-item-card') === -1) failures++;
} catch (err) {
  failures++;
  console.log('  ❌ browse mode threw: ' + err.message);
}
vm.runInContext('state.showHskBrowser = false; state.dictFilterHSK = "all";', ctx);

// The extended dictionary (~2.8 MB) must only be fetched when it could possibly help:
// CC-CEDICT has Chinese headwords with English glosses, so kana and accented-Vietnamese
// queries must never trigger the download.
let extCalls = 0;
ctx.ensureExtDictFor = function () {
  extCalls += 1;
  return Promise.resolve(false);
};
ctx.ensureExtDict = function () {
  extCalls += 1;
  return Promise.resolve(false);
};
// The real prefetcher would fire background timers/fetches during the test.
ctx.prefetchExtDict = function () {};
ctx.prefetchExtDictForQuery = function () {};

function resetExtState() {
  vm.runInContext('_extDictAttempts.clear(); EXT_DICT.loaded = false; EXT_DICT.loading = null; EXT_DICT.index = null;', ctx);
}

resetExtState();
extCalls = 0;
render('ひらがなのたんご');
console.log(extCalls === 0
  ? '  ✅ kana queries do not trigger the extended-dictionary download'
  : `  ❌ kana query triggered ${extCalls} download(s)`);
if (extCalls !== 0) failures++;

resetExtState();
extCalls = 0;
render('bánh xèo');
console.log(extCalls === 0
  ? '  ✅ accented Vietnamese queries do not trigger the download'
  : `  ❌ Vietnamese query triggered ${extCalls} download(s)`);
if (extCalls !== 0) failures++;

resetExtState();
extCalls = 0;
render('zzzqx');
console.log(extCalls === 1
  ? '  ✅ a plain-ASCII miss does trigger the download once'
  : `  ❌ expected 1 download for an ASCII miss, got ${extCalls}`);
if (extCalls !== 1) failures++;

resetExtState();
extCalls = 0;
render('龘');
console.log(extCalls === 1
  ? '  ✅ a Hanzi miss triggers the download'
  : `  ❌ expected 1 download for a Hanzi miss, got ${extCalls}`);
if (extCalls !== 1) failures++;
resetExtState();

// XSS regression: a hostile "word" must not be able to break out of the onclick handler.
// MINI_DICT is a lexical binding inside the vm realm, so mutate it there and make the
// scoring engine rebuild its index.
vm.runInContext(
  'MINI_DICT["<img src=x onerror=alert(1)>"] = { pinyin: "x", vi: "xss probe", en: ["xss probe"], hanviet: "", hsk: 1, type: "word" };' +
  ' if (typeof dictSearchInvalidate === "function") dictSearchInvalidate();',
  ctx
);
const xssHtml = render('xss probe');
// The payload may survive as *escaped text* (harmless); what must never appear is a
// raw tag or an unquoted attribute that the browser would parse as markup.
if (xssHtml.indexOf('<img') === -1 && xssHtml.indexOf('" onerror=') === -1 && xssHtml.indexOf("' onerror=") === -1) {
  console.log('  ✅ hostile dictionary entry is escaped (no injected <img>)');
} else {
  failures++;
  console.log('  ❌ XSS: hostile entry produced raw HTML');
}

// Chinese–Chinese mode: the definition cached from the AI card is reused on every
// re-render and survives switching to another meaning language and back.
vm.runInContext(
  'state.cachedTranslations["zh:吃"] = "把食物放进嘴里咀嚼并吞下"; setDictMeaningLang("zh");',
  ctx
);
const zhHtml = render('吃');
if (zhHtml.indexOf('把食物放进嘴里咀嚼并吞下') !== -1 && zhHtml.indexOf('dict-item-card') !== -1) {
  console.log('  ✅ Chinese mode renders the cached Chinese definition');
} else {
  failures++;
  console.log('  ❌ Chinese mode did not render the cached definition');
}

vm.runInContext('setDictMeaningLang("vi");', ctx);
const viAfterZhHtml = render('吃');
if (viAfterZhHtml.indexOf('ăn') !== -1 && viAfterZhHtml.indexOf('把食物放进嘴里咀嚼并吞下') === -1) {
  console.log('  ✅ switching back to Vietnamese restores the local meaning');
} else {
  failures++;
  console.log('  ❌ Vietnamese mode leaked or lost the Chinese definition');
}

vm.runInContext('setDictMeaningLang("zh");', ctx);
const zhAgainHtml = render('吃');
if (zhAgainHtml.indexOf('把食物放进嘴里咀嚼并吞下') !== -1) {
  console.log('  ✅ switching back to Chinese reuses the cached definition');
} else {
  failures++;
  console.log('  ❌ Chinese definition disappeared after a round-trip');
}
vm.runInContext('setDictMeaningLang("vi"); delete state.cachedTranslations["zh:吃"];', ctx);

// Mobile and IME search interactions:
console.log('\n--- Mobile & IME search interaction tests ---');
// 1. handleDictSearchInput with isComposing: true (standard on Android Gboard predictive text)
vm.runInContext(`
  handleDictSearchInput({ target: { value: '你好' }, isComposing: true });
`, ctx);
const hanziInputHtml = results.innerHTML;
if (hanziInputHtml.indexOf('dict-item-card') !== -1 && hanziInputHtml.indexOf('你好') !== -1) {
  console.log('  ✅ handleDictSearchInput triggers search even when isComposing is true (Gboard/Android)');
} else {
  failures++;
  console.log('  ❌ handleDictSearchInput dropped search when isComposing was true');
}

// 2. handleDictSearchCompositionEnd
vm.runInContext(`
  handleDictSearchCompositionEnd({ target: { value: '吃' } });
`, ctx);
const compEndHtml = results.innerHTML;
if (compEndHtml.indexOf('dict-item-card') !== -1 && compEndHtml.indexOf('吃') !== -1) {
  console.log('  ✅ handleDictSearchCompositionEnd immediately searches committed text');
} else {
  failures++;
  console.log('  ❌ handleDictSearchCompositionEnd failed to search committed text');
}

// 3. handleDictSearchSubmit (Mobile keyboard Go/Search action or Form Submit)
let blurred = false;
const searchInpEl = ctx.document.getElementById('dict-search-input');
searchInpEl.value = '学习';
searchInpEl.blur = () => { blurred = true; };
vm.runInContext(`
  handleDictSearchSubmit({ preventDefault: () => {} });
`, ctx);
const submitHtml = results.innerHTML;
if (submitHtml.indexOf('dict-item-card') !== -1 && submitHtml.indexOf('学习') !== -1 && blurred) {
  console.log('  ✅ handleDictSearchSubmit executes search and blurs input to hide mobile keyboard');
} else {
  failures++;
  console.log('  ❌ handleDictSearchSubmit failed to execute search or blur input');
}

// 4. handleDictSearchKeydown with Enter key
blurred = false;
searchInpEl.value = '谢谢';
vm.runInContext(`
  handleDictSearchKeydown({ key: 'Enter', keyCode: 13, target: document.getElementById('dict-search-input'), preventDefault: () => {} });
`, ctx);
const enterHtml = results.innerHTML;
if (enterHtml.indexOf('dict-item-card') !== -1 && enterHtml.indexOf('谢谢') !== -1 && blurred) {
  console.log('  ✅ handleDictSearchKeydown with Enter executes search immediately');
} else {
  failures++;
  console.log('  ❌ handleDictSearchKeydown with Enter failed to execute search');
}

console.log(failures === 0 ? '\n🎉 render smoke test passed.\n' : `\n❌ ${failures} render failures\n`);
process.exit(failures === 0 ? 0 : 1);
