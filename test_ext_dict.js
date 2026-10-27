// test_ext_dict.js - Tests for the optional CC-CEDICT extended dictionary.
//
// Covers three things that can break independently:
//   1. the build pipeline (tools/build-cedict.js) — pinyin, proper nouns, filtering;
//   2. the ranking behaviour — curated entries always win, ext only fills gaps;
//   3. the wiring — the dataset is lazy, licensed and actually reachable from the UI.
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

let passed = 0;
function check(name, fn) {
  fn();
  passed++;
  console.log('  ✅ ' + name);
}

console.log('\n🧪 Extended dictionary tests\n');

// ============================================================ build pipeline
console.log('--- Build pipeline ---');
const { parse, split, writeSplit, SHARD_COUNT } = require('./tools/build-cedict.js');

const SAMPLE = [
  '# comment line',
  '旅行 旅行 [lu:3 xing2] /to travel; journey; trip/',
  '蘋果 苹果 [Ping2 guo3] /Apple (American tech company)/',
  '苹果 苹果 [ping2 guo3] /apple/',
  '略 略 [lu:e4] /brief; sketchy/',
  '女 女 [nu:3] /female; woman/',
  '舊 旧 [jiu4] /old variant of 舊|旧[jiu4]/',
  '蘋果 苹果 [Ping2 guo3] /duplicate line should not overwrite/',
].join('\n');

check('entries are parsed and keyed by simplified form', () => {
  const { dict, kept } = parse(SAMPLE);
  assert.ok(kept >= 4, 'kept ' + kept);
  assert.ok(dict['旅行'], '旅行 missing');
  assert.ok(dict['略'], '略 missing');
});

check('"u:" pinyin is converted to ü with the right tone', () => {
  const { dict } = parse(SAMPLE);
  assert.ok(dict['旅行'].startsWith('lǚ xíng'), 'got ' + dict['旅行']);
  assert.ok(dict['女'].startsWith('nǚ'), 'got ' + dict['女']);
  assert.ok(dict['略'].startsWith('lüè'), 'got ' + dict['略']);
});

check('common-noun reading wins over the proper noun', () => {
  const { dict } = parse(SAMPLE);
  // "Ping2 guo3" (Apple Inc) comes first, but "ping2 guo3" (apple) must win.
  assert.ok(dict['苹果'].endsWith('|apple'), 'got ' + dict['苹果']);
});

check('variant / cross-reference stubs are dropped', () => {
  const { dict } = parse(SAMPLE);
  assert.ok(!dict['旧'], '旧 should have been dropped as a variant stub');
});

check('definitions are capped so the payload stays bounded', () => {
  const long = '测 测 [ce4] /' + Array.from({ length: 8 }, (_, i) => 'definition number ' + i + ' with padding text').join('/') + '/';
  const { dict } = parse(long);
  const def = dict['测'].split('|')[1];
  assert.ok(def.length <= 110, 'definition too long: ' + def.length);
  assert.ok(def.split('; ').length <= 2, 'too many glosses: ' + def);
});

// --------------------------------------------------------------- shard split
console.log('\n--- Shard split ---');

check('split() puts every entry in exactly one shard', () => {
  const dict = { '大': 'a', '大学': 'b', '中': 'c', 'A': 'd' };
  const { index, shards } = split(dict, 4);
  assert.strictEqual(shards.length, 4);
  const seen = new Set();
  shards.forEach((shard) => {
    for (const k of Object.keys(shard)) {
      assert.ok(!seen.has(k), 'duplicated entry: ' + k);
      seen.add(k);
    }
  });
  assert.deepStrictEqual(Array.from(seen).sort(), Object.keys(dict).sort());
  assert.strictEqual(index.count, 4);
  assert.strictEqual(index.shardCount, 4);
  assert.strictEqual(index.shardPattern, 'js/data/cedict-shard-{id}.json');
});

check('the first-character index points at the shard that owns each character', () => {
  const dict = { '大': 'a', '大学': 'b', '中': 'c' };
  const { index, shards } = split(dict, SHARD_COUNT);
  assert.strictEqual(index.chars['大'], '大'.codePointAt(0) % SHARD_COUNT);
  assert.strictEqual(index.chars['中'], '中'.codePointAt(0) % SHARD_COUNT);
  assert.ok(shards[index.chars['大']]['大'], '大 missing from its shard');
  assert.ok(shards[index.chars['大']]['大学'], '大学 missing from 大 shard');
  assert.ok(shards[index.chars['中']]['中'], '中 missing from its shard');
});

check('writeSplit() writes the index and all zero-padded shard files', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cedict-split-'));
  try {
    const dict = { '旅行': 'lǚ xíng|to travel', '火锅': 'huǒ guō|hotpot' };
    const result = writeSplit(dict, { dir, shardCount: 16 });
    assert.ok(fs.existsSync(path.join(dir, 'cedict-index.json')), 'index file missing');
    for (let i = 0; i < 16; i++) {
      const name = 'cedict-shard-' + String(i).padStart(2, '0') + '.json';
      assert.ok(fs.existsSync(path.join(dir, name)), name + ' missing');
    }
    const index = JSON.parse(fs.readFileSync(path.join(dir, 'cedict-index.json'), 'utf8'));
    assert.strictEqual(index.count, 2);
    assert.strictEqual(index.shardCount, 16);
    assert.strictEqual(result.files, 16);
    assert.ok(result.maxBytes > 0, 'no bytes written');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// ============================================================ ranking rules
console.log('\n--- Ranking: curated entries always win ---');

// Load the app the same way index.html does.
const ctx = { console, module: { exports: {} }, globalThis: null };
ctx.globalThis = ctx;
ctx.window = ctx;
vm.createContext(ctx);
ctx.localStorage = { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem() {}, removeItem() {} };
ctx.navigator = { language: 'vi' };
ctx.document = {
  getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; },
  createElement() { return { style: {}, dataset: {}, appendChild() {}, addEventListener() {} }; },
  head: { appendChild() {} }, body: { appendChild() {} },
};
ctx.performance = { now: () => 0 };

for (const f of [
  'js/core/storage.js', 'js/data/i18n-data.js', 'js/data/mini-dict.js', 'js/data/hsk789.js',
  'js/data/common-words.js', 'js/data/reverse-dict.js', 'js/data/dict-synsets.js',
  'js/data/han-viet.js', 'js/data/kanji-data.js', 'js/data/ja-common.js', 'js/data/slang-data.js',
  'js/core/state.js', 'js/core/utils.js', 'js/features/nlp.js',
  'js/features/dict-search-engine.js', 'js/features/dict-scoring.js',
]) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, f), 'utf8'), ctx, { filename: f });
}

const search = ctx.searchDictionary;
const words = (q, n = 5) => search(q, { limit: n }).matches.map(m => m.word);

const SYNTHETIC_EXT = {
  '旅行': 'lǚ xíng|to travel; journey; trip',
  '旅行社': 'lǚ xíng shè|travel agency',
  '火锅': 'huǒ guō|hotpot',
  '麻将': 'má jiàng|mahjong',
  '牌桌': 'pái zhuō|mahjong table; card table',
  '沙发': 'shā fā|(loanword) sofa',
};
ctx.dictSetExtendedDictionary(SYNTHETIC_EXT);

check('a word only in the extended dictionary is found', () => {
  assert.strictEqual(words('旅行')[0], '旅行');
});
check('Hanzi prefix and containment work through the extended dictionary', () => {
  assert.ok(words('旅行社', 3).indexOf('旅行社') !== -1, 'exact miss');
  assert.ok(words('旅行', 5).indexOf('旅行社') !== -1, 'prefix miss');
});
check('English glosses resolve through the extended dictionary', () => {
  assert.strictEqual(words('mahjong')[0], '麻将', 'got ' + words('mahjong', 5).join(', '));
  assert.strictEqual(words('hotpot')[0], '火锅', 'got ' + words('hotpot', 5).join(', '));
});
check('"to <verb>" glosses match a bare verb query', () => {
  assert.ok(words('travel', 5).indexOf('旅行') !== -1, 'got ' + words('travel', 5).join(', '));
});
check('extended results are flagged so the UI can badge them', () => {
  const hit = search('旅行', { limit: 1 }).matches[0];
  assert.strictEqual(hit.ext, true);
  assert.ok(hit.en.length, 'extended entries must carry the English gloss');
});
check('curated entries still rank above extended ones', () => {
  // 西瓜 exists in MINI_DICT; the extended dictionary must not displace it.
  const top = words('西瓜', 3);
  assert.strictEqual(top[0], '西瓜');
  const first = search('西瓜', { limit: 1 }).matches[0];
  assert.ok(!first.ext, 'a curated entry was replaced by an extended one');
});
check('the extended dictionary is not consulted when the curated one has answers', () => {
  const r = search('ăn', { limit: 10 });
  assert.strictEqual(r.stats.extUsed, 0, 'ext was scanned for a well-covered query');
});
check('removing the extended dictionary restores the plain behaviour', () => {
  ctx.dictSetExtendedDictionary(null);
  assert.strictEqual(words('旅行', 3).length, 0);
  ctx.dictSetExtendedDictionary(SYNTHETIC_EXT);
});

// ============================================================ shipped dataset
console.log('\n--- Shipped dataset ---');

const CEDICT_PATH = path.join(__dirname, 'js', 'data', 'cedict.json');

check('js/data/cedict.json exists and is reasonably sized', () => {
  assert.ok(fs.existsSync(CEDICT_PATH), 'cedict.json is missing (run: node tools/build-cedict.js)');
  const size = fs.statSync(CEDICT_PATH).size;
  assert.ok(size > 1024 * 1024, 'suspiciously small: ' + size);
  assert.ok(size < 9 * 1024 * 1024, 'larger than expected: ' + (size / 1024 / 1024).toFixed(2) + ' MB');
});

check('the dataset has >100k entries in the expected format', () => {
  const data = JSON.parse(fs.readFileSync(CEDICT_PATH, 'utf8'));
  const keys = Object.keys(data);
  assert.ok(keys.length > 100000, 'only ' + keys.length + ' entries');
  const bad = keys.slice(0, 400).filter(k => !/^[^|]+\|[^|]+$/.test(data[k]));
  assert.strictEqual(bad.length, 0, 'malformed values: ' + bad.slice(0, 3).join(', '));
});

check('known entries survived the build filters', () => {
  const data = JSON.parse(fs.readFileSync(CEDICT_PATH, 'utf8'));
  for (const w of ['旅行', '火锅', '麻将', '螺蛳粉']) {
    assert.ok(data[w], 'missing entry: ' + w);
  }
  assert.ok(/^lǚ xíng\|/.test(data['旅行']), 'pinyin not toned: ' + data['旅行']);
  // "旧" is a real word ("old"), so only the *variant stub* must be gone.
  if (data['旧']) {
    assert.ok(!/^old variant of/i.test(data['旧'].split('|')[1]),
      'variant stub survived for 旧: ' + data['旧']);
  }
});

check('licence attribution ships with the data', () => {
  const licence = path.join(__dirname, 'js', 'data', 'cedict-LICENSE.txt');
  assert.ok(fs.existsSync(licence), 'missing cedict-LICENSE.txt');
  const text = fs.readFileSync(licence, 'utf8');
  assert.ok(/CC BY-SA 4\.0/.test(text), 'licence text must name CC BY-SA 4.0');
  assert.ok(/cc-cedict\.org/.test(text), 'licence text must name the source');
});

const INDEX_PATH = path.join(__dirname, 'js', 'data', 'cedict-index.json');

check('the first-character index ships and matches the monolith', () => {
  assert.ok(fs.existsSync(INDEX_PATH), 'cedict-index.json is missing (run: node tools/build-cedict.js --split-existing)');
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  const data = JSON.parse(fs.readFileSync(CEDICT_PATH, 'utf8'));
  assert.strictEqual(index.count, Object.keys(data).length, 'index count differs from the monolith');
  assert.strictEqual(index.shardCount, 16);
  assert.strictEqual(index.shardPattern, 'js/data/cedict-shard-{id}.json');
  const chars = Object.keys(index.chars);
  assert.ok(chars.length > 9000, 'only ' + chars.length + ' first characters indexed');
  const bad = chars.filter(c => index.chars[c] < 0 || index.chars[c] >= index.shardCount);
  assert.strictEqual(bad.length, 0, 'invalid shard ids for: ' + bad.slice(0, 5).join(', '));
});

check('every shard exists and together they rebuild the monolith', () => {
  const data = JSON.parse(fs.readFileSync(CEDICT_PATH, 'utf8'));
  let total = 0;
  let largest = 0;
  for (let i = 0; i < 16; i++) {
    const name = 'cedict-shard-' + String(i).padStart(2, '0') + '.json';
    const file = path.join(__dirname, 'js', 'data', name);
    assert.ok(fs.existsSync(file), name + ' is missing');
    largest = Math.max(largest, fs.statSync(file).size);
    const shard = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const k of Object.keys(shard)) {
      assert.strictEqual(k.codePointAt(0) % 16, i, 'entry stored in the wrong shard: ' + k);
      assert.strictEqual(shard[k], data[k], 'shard value differs from the monolith for ' + k);
      total += 1;
    }
  }
  assert.strictEqual(total, Object.keys(data).length, 'shards do not cover the monolith');
  assert.ok(largest < 1024 * 1024, 'a shard is larger than 1 MB: ' + (largest / 1024).toFixed(0) + ' KB');
});

// ============================================================ lazy wiring
console.log('\n--- Lazy loading wiring ---');

check('ext-dict.js is loaded after dict-scoring.js and before dict.js', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const scoring = html.indexOf('js/features/dict-scoring.js');
  const ext = html.indexOf('js/features/ext-dict.js');
  const dict = html.indexOf('js/features/dict.js');
  assert.ok(scoring !== -1 && ext !== -1 && dict !== -1, 'a script tag is missing');
  assert.ok(scoring < ext && ext < dict, 'wrong load order');
});

check('the dataset is fetched lazily, never from index.html', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert.ok(html.indexOf('cedict.json') === -1, 'cedict.json must not be a <script>/<link> tag');
  const loader = fs.readFileSync(path.join(__dirname, 'js/features/ext-dict.js'), 'utf8');
  assert.ok(/force-cache/.test(loader), 'the loader should reuse the HTTP/service-worker cache');
  assert.ok(/ensureExtDict/.test(loader), 'ensureExtDict not exported');
});

check('dict.js triggers the shard-aware loader from the no-match branch', () => {
  const src = fs.readFileSync(path.join(__dirname, 'js/features/dict.js'), 'utf8');
  assert.ok(/tryExtDictForQuery\(/.test(src), 'dict.js never calls the shard-aware loader');
  assert.ok(/ensureExtDictFor/.test(src), 'the loader is not consulted per query');
  assert.ok(/prefetchExtDictForQuery/.test(src), 'Hanzi input does not warm its shard');
  assert.ok(!/_extDictRequested/.test(src), 'the stale permanent guard is still present');
  assert.ok(/dict-ext-credit/.test(src), 'missing CC-CEDICT attribution in the UI');
  const loader = fs.readFileSync(path.join(__dirname, 'js/features/ext-dict.js'), 'utf8');
  assert.ok(/ensureExtDictShard/.test(loader), 'shard loader missing');
  assert.ok(/canRetry/.test(loader), 'failed fetches have no cooldown/retry');
  assert.ok(/cedict-index\.json/.test(loader), 'index URL missing');
});

check('the service worker will cache the dataset for repeat visits', () => {
  const sw = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/staleWhileRevalidate/.test(sw), 'same-origin static files must be cached');
});

console.log(`\n🎉 ${passed} extended dictionary tests passed.\n`);
