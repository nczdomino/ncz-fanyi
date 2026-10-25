// test_i18n_langs.js - Language-completeness tests (vi / ja / en).
//
// The reported bug: with the UI in Japanese, parts of the interface still showed
// Vietnamese, and a dictionary meaning sometimes came back in Vietnamese.
//
// Root causes found and guarded here:
//   1. t() returns the key itself when a translation is missing, and applyI18n wrote it
//      straight into the DOM — so missing keys rendered as "btnClear"/"hwUndo" anywhere.
//   2. The word sheet fell back to `dictEntry.vi` when the Japanese meaning could not be
//      produced, so a Japanese user occasionally saw Vietnamese.
//   3. A leftover parallel meaning language (state.meaningLang2) survived a UI language
//      switch and kept showing the previous language next to the new one.
//   4. A handful of UI strings were hard-coded Vietnamese.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

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

console.log('\n🧪 Language completeness tests\n');

const ctx = { console, module: { exports: {} }, globalThis: null };
ctx.globalThis = ctx;
ctx.window = ctx;
ctx.document = {
  documentElement: { lang: 'vi' },
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {},
};
ctx.localStorage = { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; } };
ctx.navigator = { language: 'vi-VN' };
vm.createContext(ctx);

for (const f of ['js/core/storage.js', 'js/data/i18n-data.js', 'js/core/state.js', 'js/core/utils.js', 'js/features/theme-i18n.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, f), 'utf8'), ctx, { filename: f });
}

const I18N = vm.runInContext('I18N_DATA', ctx);
const VI_ONLY = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (['.git', 'node_modules', '.cache', 'vendor', 'tools'].includes(f)) continue;
      walk(p, out);
    } else if (/\.(js|html)$/.test(f) && !/i18n-data|^test/.test(f)) {
      out.push(p);
    }
  }
  return out;
}
const files = walk(__dirname).filter(f => !f.includes(`${path.sep}tests${path.sep}`));

// ============================================================ data completeness
console.log('--- Translation tables ---');

check('all three languages define exactly the same keys', () => {
  const vi = new Set(Object.keys(I18N.vi));
  for (const lang of ['en', 'ja']) {
    const other = new Set(Object.keys(I18N[lang]));
    const missing = [...vi].filter(k => !other.has(k));
    const extra = [...other].filter(k => !vi.has(k));
    assert.strictEqual(missing.length, 0, lang + ' is missing: ' + missing.join(', '));
    assert.strictEqual(extra.length, 0, lang + ' has extra keys: ' + extra.join(', '));
  }
});

check('English and Japanese values contain no Vietnamese diacritics', () => {
  for (const lang of ['en', 'ja']) {
    const bad = Object.entries(I18N[lang]).filter(([, v]) => typeof v === 'string' && VI_ONLY.test(v));
    assert.strictEqual(bad.length, 0,
      lang + ' values still in Vietnamese: ' + bad.slice(0, 5).map(([k]) => k).join(', '));
  }
});

check('no translation is an empty string', () => {
  for (const lang of ['vi', 'en', 'ja']) {
    const empty = Object.entries(I18N[lang]).filter(([, v]) => v === '');
    assert.strictEqual(empty.length, 0, lang + ' has empty values: ' + empty.map(([k]) => k).join(', '));
  }
});

// ============================================================ key usage
console.log('\n--- Key usage ---');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

check('every t() key used in code exists in all three languages', () => {
  const used = new Set();
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z0-9_]+)'\s*\)/g)) used.add(m[1]);
  }
  const missing = [...used].filter(k => !I18N.vi[k] || !I18N.en[k] || !I18N.ja[k]);
  assert.strictEqual(missing.length, 0, 'missing translations: ' + missing.join(', '));
});

check('every data-i18n key in index.html exists in all three languages', () => {
  const used = new Set();
  for (const m of html.matchAll(/data-i18n(?:-ph|-title|-placeholder|-aria-label)?="([a-zA-Z0-9_]+)"/g)) used.add(m[1]);
  const missing = [...used].filter(k => !I18N.vi[k] || !I18N.en[k] || !I18N.ja[k]);
  assert.strictEqual(missing.length, 0, 'missing translations: ' + missing.join(', '));
});

check('the reported keys btnClear / hwClear / hwUndo are translated', () => {
  for (const k of ['btnClear', 'hwClear', 'hwUndo']) {
    for (const lang of ['vi', 'en', 'ja']) {
      assert.ok(I18N[lang][k], `${k} missing in ${lang}`);
    }
  }
});

// ============================================================ runtime behaviour
console.log('\n--- Runtime behaviour ---');

check('t() and tx() follow the selected language', () => {
  vm.runInContext("state.uiLang = 'ja'", ctx);
  assert.strictEqual(vm.runInContext("t('btnClear')", ctx), I18N.ja.btnClear);
  assert.strictEqual(vm.runInContext("tx('vi','en','ja')", ctx), 'ja');
  vm.runInContext("state.uiLang = 'en'", ctx);
  assert.strictEqual(vm.runInContext("t('btnClear')", ctx), I18N.en.btnClear);
  vm.runInContext("state.uiLang = 'vi'", ctx);
});

check('a missing key never overwrites the DOM with its raw name', () => {
  const src = fs.readFileSync(path.join(__dirname, 'js/features/theme-i18n.js'), 'utf8');
  assert.ok(/const val = t\(key\);\s*\n\s*if \(val && val !== key\)/.test(src),
    'applyI18n still writes raw keys into the DOM');
});

check('switching language clears a stale parallel meaning language', () => {
  const src = fs.readFileSync(path.join(__dirname, 'js/features/theme-i18n.js'), 'utf8');
  assert.ok(/state\.meaningLang2 === lang/.test(src), 'setUiLang does not reset meaningLang2');
  assert.ok(/cr_meaningLang2/.test(src), 'stale locale preference is not removed');
});

// ============================================================ meaning fallback
console.log('\n--- Dictionary meaning fallback ---');

const sheetSrc = fs.readFileSync(path.join(__dirname, 'js/features/word-sheet.js'), 'utf8');

check('a Japanese/English reader is never shown a Vietnamese fallback meaning', () => {
  // The fallback must be guarded by lang === 'vi'.
  const idx = sheetSrc.indexOf('const fallback =');
  assert.ok(idx !== -1, 'fallback block missing');
  const block = sheetSrc.slice(idx, idx + 420);
  assert.ok(/lang === 'vi'/.test(block), 'the fallback is not guarded by the meaning language');
  assert.ok(/dictEntry && dictEntry\.en/.test(block), 'English is not used as the neutral fallback');
});

check('getMeaningFromEntry returns nothing (not Vietnamese) when Japanese is unavailable', () => {
  const start = sheetSrc.indexOf('function getMeaningFromEntry');
  const end = sheetSrc.indexOf('return m ? { text: m, isCustom: false } : null;', start);
  const body = sheetSrc.slice(start, end);
  const jaBranch = body.slice(body.indexOf("targetLang === 'ja'"), body.indexOf('} else {', body.indexOf("targetLang === 'ja'")));
  assert.ok(jaBranch.indexOf('entry.vi') === -1, 'the Japanese branch falls back to Vietnamese');
});

// ============================================================ hard-coded strings
console.log('\n--- Hard-coded strings ---');

check('these UI strings are wrapped in tx() rather than hard-coded', () => {
  // The Vietnamese text still exists — it is the source text for tx(vi, en, ja) — so the
  // assertion is that every line holding it also calls tx().
  const checks = [
    ['js/features/translate.js', '✓ Đã chép!', 'copy confirmation'],
    ['js/features/translate.js', 'Không có văn bản để dịch.', 'empty translate message'],
    ['js/features/word-sheet.js', 'Lỗi khi gọi trực tiếp Google API', 'AI error'],
    ['js/features/word-sheet.js', 'Phản hồi từ AI không đúng cấu trúc.', 'AI error'],
    ['js/features/tts.js', 'Được đề xuất', 'voice test label'],
    ['js/features/dict.js', 'Bộ ${label}', 'radical label'],
  ];
  const problems = [];
  for (const [file, needle, what] of checks) {
    const lines = fs.readFileSync(path.join(__dirname, file), 'utf8').split('\n');
    const hits = lines.filter(l => l.indexOf(needle) !== -1);
    if (!hits.length) { problems.push(`${file}: ${what} (phrase missing entirely?)`); continue; }
    if (!hits.every(l => l.indexOf('tx(') !== -1)) problems.push(`${file}: ${what} not wrapped in tx()`);
  }
  assert.strictEqual(problems.length, 0, problems.join('; '));
});

check('example source badges are localised, not Vietnamese literals', () => {
  const enrich = fs.readFileSync(path.join(__dirname, 'js/features/enrich.js'), 'utf8');
  assert.ok(enrich.indexOf("source: '🎬 Phụ đề đời thực'") === -1, 'enrich.js still emits a Vietnamese badge');
  assert.ok(enrich.indexOf("source: 'mymemory'") !== -1, 'enrich.js should emit a canonical source id');
  const ex = fs.readFileSync(path.join(__dirname, 'js/features/examples.js'), 'utf8');
  assert.ok(/function exampleSourceLabel/.test(ex), 'no localised badge helper');
  assert.ok(/Phụ đề đời thực', 'Real-life subtitles', '実生活の字幕'/.test(ex), 'badge translations missing');
});

// ============================================================ accessibility labels
console.log('\n--- Accessibility and tab title ---');

check('screen-reader labels are localised, not Vietnamese', () => {
  const theme = fs.readFileSync(path.join(__dirname, 'js/features/theme-i18n.js'), 'utf8');
  assert.ok(/data-i18n-aria-label/.test(theme), 'applyI18n does not handle aria-label translation');
  const html2 = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert.ok(/data-i18n-aria-label="titleUiLanguage"/.test(html2), 'language group aria-label not hooked');

  const pad = fs.readFileSync(path.join(__dirname, 'js/features/handwriting/pad.js'), 'utf8');
  const bad = pad.match(/aria-label="[^"]*[àáảãạăâđêôơư][^"]*"/);
  assert.strictEqual(bad, null, 'pad.js still has a Vietnamese aria-label: ' + (bad && bad[0]));
});

check('the accessibility keys exist in all three languages', () => {
  for (const k of ['titleUiLanguage', 'hwCandidateBar', 'hwChangeGrid', 'appDocTitle', 'hwUndoStroke', 'hwClearCanvas']) {
    for (const lang of ['vi', 'en', 'ja']) {
      assert.ok(I18N[lang][k], `${k} missing in ${lang}`);
    }
  }
});

check('server error messages are localised on the client', () => {
  const ocr = fs.readFileSync(path.join(__dirname, 'js/features/ocr.js'), 'utf8');
  assert.ok(/const known = \{/.test(ocr), 'no localised error-code map in ocr.js');
  assert.ok(/KNOWN|RATE_LIMITED/.test(ocr), 'rate-limit code not mapped');
  // The raw server `message` must not be thrown straight to the UI.
  const idx = ocr.indexOf('const known = {');
  const tail = ocr.slice(idx, idx + 2200);
  assert.ok(tail.indexOf('throw new Error(msg)') !== -1, 'the localised message is not what gets thrown');
});

check('the browser tab title follows the UI language', () => {
  const theme = fs.readFileSync(path.join(__dirname, 'js/features/theme-i18n.js'), 'utf8');
  assert.ok(/document\.title = docTitle/.test(theme), 'document.title is never localized');
  assert.notStrictEqual(I18N.vi.appDocTitle, I18N.ja.appDocTitle, 'the tab title is not translated');
});

console.log(`\n${failed === 0 ? '🎉' : '❌'} ${passed} passed, ${failed} failed.\n`);
process.exit(failed === 0 ? 0 : 1);
