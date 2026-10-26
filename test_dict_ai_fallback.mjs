// test_dict_ai_fallback.js - Tests for the automatic, cost-controlled AI dictionary fallback.
//
// This feature spends real Gemini quota every time a lookup misses, so the guarantees that
// matter are the cost ones:
//   1. only eligible queries are sent (no offline, no 1-character descriptions, no digits);
//   2. typing is debounced instead of one request per keystroke;
//   3. the answer is cached (RAM + IndexedDB) so a repeat lookup is free;
//   4. the client budget stops the 7th request inside one minute;
//   5. failures are cached too, so a broken backend is not hammered;
//   6. Hanzi misses use /api/translate?type=dict_lookup, descriptions use
//      /api/dict/semantic with fast:true (cheap model + short prompt).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert';

const SRC = fs.readFileSync(path.join(import.meta.dirname, 'js/features/dict-ai-fallback.js'), 'utf8');

let passed = 0;
let failed = 0;

async function check(name, fn) {
  try {
    await fn();
    passed++;
    console.log('  ✅ ' + name);
  } catch (e) {
    failed++;
    console.log('  ❌ ' + name + '\n     ' + (e && e.message));
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeQuotes(str) {
  if (!str) return '';
  return escapeHtml(String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' '));
}

/**
 * Load the module into an isolated VM context with just enough browser surface for it.
 * @param {{online?:boolean, respond?:(url:string)=>{ok?:boolean,status?:number,payload:any}}} [opts]
 */
function makeHarness(opts) {
  opts = opts || {};
  const els = new Map();
  const timers = [];
  const db = new Map();
  const calls = [];

  const ctx = {
    console,
    JSON, Math, Date, Promise, Map, Set, Object, Array, String, Number, Boolean, RegExp, Error,
    tx: (vi) => vi,
    escapeHtml,
    escapeQuotes,
    localStorage: {
      _m: new Map(),
      getItem(k) { return this._m.has(k) ? this._m.get(k) : null; },
      setItem(k, v) { this._m.set(k, String(v)); },
      removeItem(k) { this._m.delete(k); },
    },
    navigator: { onLine: opts.online !== false },
    setTimeout(fn) { timers.push(fn); return timers.length; },
    clearTimeout() {},
    getFromDB(store, key) { return Promise.resolve(db.get(key) || null); },
    putToDB(store, row) { db.set(row.q, row); return Promise.resolve(); },
    document: {
      getElementById(id) {
        if (!els.has(id)) els.set(id, { id, innerHTML: '' });
        return els.get(id);
      },
    },
    state: { searchQuery: '', meaningLang: 'vi', uiLang: 'vi' },
    fetch(url, init) {
      calls.push({ url: String(url), body: init && init.body ? JSON.parse(init.body) : null });
      const out = (opts.respond ? opts.respond(String(url)) : { payload: {} }) || {};
      return Promise.resolve({
        ok: out.ok !== false,
        status: out.status || 200,
        json: () => Promise.resolve(out.payload),
      });
    },
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx);

  return {
    ctx,
    els,
    timers,
    db,
    calls,
    container() { return ctx.document.getElementById('dict-ai-fallback-container'); },
    /** Run whatever the debounce scheduled. */
    flushTimers() {
      const pending = timers.splice(0, timers.length);
      pending.forEach((fn) => fn());
    },
  };
}

const tick = () => new Promise((r) => setImmediate(r));
async function settle() {
  for (let i = 0; i < 6; i++) await tick();
}

console.log('\n🧪 AI dictionary fallback tests\n');

// ============================================================ 1. eligibility
console.log('--- Eligibility (what we are willing to pay for) ---');
{
  const h = makeHarness();

  await check('a single Hanzi is a valid word lookup', () => {
    assert.strictEqual(h.ctx.aiLookupEligible('龘', 'word'), true);
  });

  await check('Hanzi is never sent to the semantic endpoint', () => {
    assert.strictEqual(h.ctx.aiLookupEligible('测试', 'semantic'), false);
  });

  await check('a 1-character description is skipped (typing, not a query)', () => {
    assert.strictEqual(h.ctx.aiLookupEligible('a', 'semantic'), false);
  });

  await check('a real description is eligible', () => {
    assert.strictEqual(h.ctx.aiLookupEligible('buồn ngủ', 'semantic'), true);
    assert.strictEqual(h.ctx.aiLookupEligible('電車に乗る', 'semantic'), true);
    assert.strictEqual(h.ctx.aiLookupEligible('to fall asleep', 'semantic'), true);
  });

  await check('a Japanese description with kanji is routed to the semantic path', () => {
    // detectSearchLanguage() reports 'zh' for anything containing Hanzi, so kana is the
    // only reliable signal that this is a sentence and not a headword.
    assert.strictEqual(h.ctx.aiLookupMode('電車に乗る', 'zh'), 'semantic');
    assert.strictEqual(h.ctx.aiLookupMode('龘', 'zh'), 'word');
    assert.strictEqual(h.ctx.aiLookupMode('buồn ngủ', 'vi'), 'semantic');
  });

  await check('kana never reaches the Chinese headword path', () => {
    assert.strictEqual(h.ctx.aiLookupEligible('電車に乗る', 'word'), false);
  });

  await check('pure digits are skipped', () => {
    assert.strictEqual(h.ctx.aiLookupEligible('12345', 'semantic'), false);
  });

  await check('an offline browser makes no request at all', () => {
    const off = makeHarness({ online: false });
    assert.strictEqual(off.ctx.aiLookupEligible('buồn ngủ', 'semantic'), false);
    off.ctx.state.searchQuery = 'buồn ngủ';
    off.ctx.autoAiLookup('buồn ngủ', 'latin');
    off.flushTimers();
    assert.strictEqual(off.calls.length, 0, 'offline must not call fetch');
  });
}

// ============================================================ 2. debounce + word path
console.log('\n--- Debounce and the Hanzi word path ---');
{
  const h = makeHarness({
    respond: () => ({ payload: { entry: { word: '龘', pinyin: 'dá', primaryMeaning: 'rồng bay' } } }),
  });

  await check('nothing is requested until the user stops typing', () => {
    h.ctx.state.searchQuery = '龘';
    h.ctx.autoAiLookup('龘', 'zh');
    assert.strictEqual(h.calls.length, 0, 'request fired immediately');
    assert.strictEqual(h.timers.length, 1, 'debounce timer not scheduled');
  });

  await check('after the debounce it posts type=dict_lookup to /api/translate', async () => {
    h.flushTimers();
    await settle();
    assert.strictEqual(h.calls.length, 1, 'expected exactly one request');
    assert.ok(h.calls[0].url.indexOf('/api/translate') !== -1, 'wrong endpoint: ' + h.calls[0].url);
    assert.strictEqual(h.calls[0].body.type, 'dict_lookup');
    assert.strictEqual(h.calls[0].body.text, '龘');
  });

  await check('the AI card is rendered into the fallback container', () => {
    const html = h.container().innerHTML;
    assert.ok(html.indexOf('rồng bay') !== -1, 'missing meaning');
    assert.ok(html.indexOf('dá') !== -1, 'missing pinyin');
  });

  await check('a second identical lookup is served from cache (no new request)', async () => {
    h.ctx.state.searchQuery = '';
    h.ctx.state.searchQuery = '龘';
    h.ctx.autoAiLookup('龘', 'zh');
    h.flushTimers();
    await settle();
    assert.strictEqual(h.calls.length, 1, 'cache miss cost a second request');
    assert.ok(h.container().innerHTML.indexOf('rồng bay') !== -1, 'cached card not re-rendered');
  });

  await check('the IndexedDB cache is written for the 30-day offline reuse', () => {
    const key = h.ctx.aiLookupKey('word', 'vi', '龘');
    const row = h.db.get(key);
    assert.ok(row, 'no IndexedDB row for ' + key);
    assert.strictEqual(row.result.ok, true);
    assert.strictEqual(row.result.data.kind, 'word');
  });
}

// ============================================================ 3. semantic path
console.log('\n--- Semantic (reverse) path ---');
{
  const h = makeHarness({
    respond: () => ({
      payload: {
        success: true,
        concept: 'buồn ngủ',
        matches: [{ word: '困', pinyin: 'kùn', meaning: 'buồn ngủ', hsk: 'HSK 3' }],
      },
    }),
  });

  await check('a description posts fast:true to /api/dict/semantic', async () => {
    h.ctx.state.searchQuery = 'buồn ngủ';
    h.ctx.autoAiLookup('buồn ngủ', 'latin');
    h.flushTimers();
    await settle();
    assert.strictEqual(h.calls.length, 1);
    assert.ok(h.calls[0].url.indexOf('/api/dict/semantic') !== -1, 'wrong endpoint: ' + h.calls[0].url);
    assert.strictEqual(h.calls[0].body.fast, true, 'fast mode not requested');
    assert.strictEqual(h.calls[0].body.query, 'buồn ngủ');
  });

  await check('the suggested word is rendered', () => {
    const html = h.container().innerHTML;
    assert.ok(html.indexOf('困') !== -1, 'missing suggested word');
    assert.ok(html.indexOf('kùn') !== -1, 'missing pinyin');
  });

  await check('a repeat semantic lookup is free', async () => {
    h.ctx.state.searchQuery = '';
    h.ctx.state.searchQuery = 'buồn ngủ';
    h.ctx.autoAiLookup('buồn ngủ', 'latin');
    h.flushTimers();
    await settle();
    assert.strictEqual(h.calls.length, 1, 'cache miss cost a second request');
  });
}

// ============================================================ 4. client budget
console.log('\n--- Client budget (6/minute) ---');
{
  const h = makeHarness({ respond: () => ({ payload: { entry: { word: 'x', primaryMeaning: 'y' } } }) });

  await check('six lookups in a minute are allowed', async () => {
    for (let i = 1; i <= 6; i++) {
      h.ctx.state.searchQuery = 'từ số ' + i;
      h.ctx.autoAiLookup('từ số ' + i, 'latin');
      h.flushTimers();
      await settle();
    }
    assert.strictEqual(h.calls.length, 6, 'expected 6 requests, got ' + h.calls.length);
  });

  await check('the seventh is blocked and explains why', async () => {
    h.ctx.state.searchQuery = 'từ số 7';
    h.ctx.autoAiLookup('từ số 7', 'latin');
    h.flushTimers();
    await settle();
    assert.strictEqual(h.calls.length, 6, 'budget did not stop the 7th request');
    assert.ok(/tiết kiệm chi phí/.test(h.container().innerHTML), 'no budget notice rendered');
  });

  await check('the budget counter is persisted in localStorage', () => {
    const b = JSON.parse(h.ctx.localStorage.getItem('cr_ai_lookup_budget'));
    assert.strictEqual(b.minCount, 6);
    assert.strictEqual(b.dayCount, 6);
  });
}

// ============================================================ 5. failure caching
console.log('\n--- Failure handling ---');
{
  const h = makeHarness({ respond: () => ({ ok: false, status: 500, payload: { error: 'boom' } }) });

  await check('a backend failure shows a retry card instead of throwing', async () => {
    h.ctx.state.searchQuery = 'từ lỗi';
    h.ctx.autoAiLookup('từ lỗi', 'latin');
    h.flushTimers();
    await settle();
    assert.strictEqual(h.calls.length, 1);
    assert.ok(h.container().innerHTML.indexOf('AI chưa trả được kết quả') !== -1, 'no error card');
  });

  await check('the failure is cached for 10 minutes, not retried on re-render', async () => {
    h.ctx.state.searchQuery = '';
    h.ctx.state.searchQuery = 'từ lỗi';
    h.ctx.autoAiLookup('từ lỗi', 'latin');
    h.flushTimers();
    await settle();
    assert.strictEqual(h.calls.length, 1, 'cached failure triggered another request');
  });

  await check('the explicit retry button does spend one more request', async () => {
    h.ctx.retryAutoAiLookup('từ lỗi', 'semantic', 'vi');
    await settle();
    assert.strictEqual(h.calls.length, 2, 'retry did not reach the network');
  });

  await check('the upstream error message is not leaked to the user', () => {
    assert.ok(h.container().innerHTML.indexOf('boom') === -1, 'raw upstream error leaked');
  });
}

// ============================================================ 6. wiring
console.log('\n--- Wiring ---');
{
  await check('all four locale entry points load the module before dict.js', () => {
    ['index.html', 'ja/index.html', 'en/index.html', 'vi/index.html'].forEach((file) => {
      const html = fs.readFileSync(path.join(import.meta.dirname, file), 'utf8');
      const ai = html.indexOf('js/features/dict-ai-fallback.js');
      const dict = html.indexOf('js/features/dict.js');
      assert.ok(ai !== -1, file + ' does not load the fallback module');
      assert.ok(ai < dict, file + ' loads the module after dict.js');
    });
  });

  await check('the word sheet auto-analyzes only genuinely unknown Hanzi words', () => {
    const src = fs.readFileSync(path.join(import.meta.dirname, 'js/features/word-sheet.js'), 'utf8');
    assert.ok(src.indexOf('autoAnalyzeWordWithAi(') !== -1, 'word sheet never auto-analyzes');
    assert.ok(src.indexOf('isUnknownWord') !== -1, 'no local-dictionary guard');
  });
}

console.log('\n' + (failed === 0
  ? '🎉 AI fallback tests passed (' + passed + ' checks).'
  : '❌ ' + failed + ' check(s) failed, ' + passed + ' passed.'));
if (failed > 0) process.exitCode = 1;
