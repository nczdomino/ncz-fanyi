#!/usr/bin/env node
// tools/build-examples-corpus.js - Build a real example-sentence corpus from Tatoeba.
//
// The bundled corpus (js/data/examples.js) has 400 hand-written sentences and covers only
// 37% of the dictionary. Tatoeba provides human-written Mandarin sentences with human
// translations, under CC BY 2.0 FR.
//
// This produces js/data/examples-corpus.js:
//   {
//     "提高": { "e": [["句子","vi","ja","en"], ...], "c": [["水平", 12], ["效率", 8]] }
//   }
// where `e` are ranked example sentences and `c` are collocations (the characters that
// most often follow/precede the word in real sentences).
//
// Usage:
//   node tools/build-examples-corpus.js
//   node tools/build-examples-corpus.js --dir /tmp/tatoeba   (use already-downloaded files)
//
// Attribution: Tatoeba - https://tatoeba.org - CC BY 2.0 FR. See js/data/tatoeba-LICENSE.txt

const fs = require('fs');
const path = require('path');
const { spawn, execFileSync } = require('child_process');
const vm = require('vm');

const BASE = 'https://downloads.tatoeba.org/exports';
const CACHE_DIR = path.join(__dirname, '..', '.cache', 'tatoeba');
const OUT_FILE = path.join(__dirname, '..', 'js', 'data', 'examples-corpus.js');

const SOURCES = {
  cmn_sentences: 'per_language/cmn/cmn_sentences.tsv.bz2',
  vie_sentences: 'per_language/vie/vie_sentences.tsv.bz2',
  jpn_sentences: 'per_language/jpn/jpn_sentences.tsv.bz2',
  eng_sentences: 'per_language/eng/eng_sentences.tsv.bz2',
  cmn_vie_links: 'per_language/cmn/cmn-vie_links.tsv.bz2',
  cmn_jpn_links: 'per_language/cmn/cmn-jpn_links.tsv.bz2',
  cmn_eng_links: 'per_language/cmn/cmn-eng_links.tsv.bz2',
};

const MAX_EXAMPLES = 3;
const MIN_EXAMPLE_LEN = 4;
const MAX_EXAMPLE_LEN = 40;
const MAX_COLLOCATIONS = 5;
const MIN_COLLOCATION_COUNT = 3;

// ---------------------------------------------------------------- utilities
function ensureDownloaded(name, relPath, dir) {
  const file = path.join(dir, path.basename(relPath));
  if (fs.existsSync(file) && fs.statSync(file).size > 0) return file;
  console.log('  downloading', name, '...');
  execFileSync('curl', ['-sS', '-L', '--max-time', '600', '-o', file, BASE + '/' + relPath], {
    stdio: 'inherit',
  });
  return file;
}

/** Stream a .bz2 TSV file line by line without loading the whole thing in memory. */
function streamBz2(file, onLine) {
  return new Promise((resolve, reject) => {
    const child = spawn('bunzip2', ['-c', file], { stdio: ['ignore', 'pipe', 'inherit'] });
    let buf = '';
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      buf += chunk;
      let idx;
      while ((idx = buf.indexOf('\n')) !== -1) {
        const line = buf.slice(0, idx);
        buf = buf.slice(idx + 1);
        if (line) onLine(line);
      }
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (buf) onLine(buf);
      if (code === 0) resolve();
      else reject(new Error('bunzip2 exited with ' + code + ' for ' + file));
    });
  });
}

function loadDictionaryWords() {
  const ctx = { console, module: { exports: {} }, window: {} };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  for (const f of ['js/data/mini-dict.js', 'js/data/hsk789.js', 'js/data/common-words.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'), ctx, { filename: f });
  }
  const dict = vm.runInContext('MINI_DICT', ctx);
  return Object.keys(dict).filter((w) => /^[\u4e00-\u9fff]{1,6}$/.test(w));
}

const EXAMPLES_CORE = require('../js/features/examples-core.js');
const MINI_DICT = (() => {
  const ctx = { console, module: { exports: {} }, window: {} };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  for (const f of ['js/data/mini-dict.js', 'js/data/hsk789.js', 'js/data/common-words.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'), ctx, { filename: f });
  }
  return vm.runInContext('MINI_DICT', ctx);
})();

// Only windows that are real dictionary words count as collocations. Without this the
// top "collocations" of 提高 were 了 / 的 / 个 — function words, useless to a learner.
const KNOWN_WORDS = (() => {
  const set = new Set(Object.keys(MINI_DICT));
  try {
    const cedict = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'js', 'data', 'cedict.json'), 'utf8'));
    for (const w of Object.keys(cedict)) set.add(w);
  } catch (e) {
    console.warn('  (cedict.json not available; collocations limited to the bundled dictionary)');
  }
  return set;
})();

// High-frequency function phrases that are real words but teach nothing as a collocation.
const COLLOC_STOPWORDS = new Set([
  '这个', '那个', '哪个', '什么', '怎么', '怎样', '这样', '那样', '一个', '一些', '有些',
  '我们', '你们', '他们', '她们', '它们', '咱们', '可以', '因为', '所以', '但是', '如果',
  '没有', '就是', '还是', '也是', '都是', '不是', '为了', '成了', '得很', '的人', '的话',
  '有人', '时候', '现在', '已经', '应该', '可能', '知道', '觉得', '起来', '下来',
]);

function isKnownWord(w) {
  return !!w && KNOWN_WORDS.has(w) && !COLLOC_STOPWORDS.has(w);
}

function hskOf(token) {
  const e = MINI_DICT[token];
  if (!e) return undefined;
  if (typeof e.hsk === 'number') return e.hsk;
  if (typeof e.hsk === 'string' && /^\d+$/.test(e.hsk)) return parseInt(e.hsk, 10);
  return undefined;
}

const segmenter = (() => {
  try {
    const seg = new Intl.Segmenter('zh', { granularity: 'word' });
    return (text) => [...seg.segment(text)].map((s) => s.segment);
  } catch (e) {
    return null;
  }
})();

async function main() {
  const dirFlag = process.argv.indexOf('--dir');
  const dir = dirFlag !== -1 && process.argv[dirFlag + 1] ? process.argv[dirFlag + 1] : CACHE_DIR;
  fs.mkdirSync(dir, { recursive: true });

  console.log('1/5 downloading sources');
  const files = {};
  for (const [name, rel] of Object.entries(SOURCES)) {
    files[name] = ensureDownloaded(name, rel, dir);
  }

  console.log('2/5 reading Mandarin sentences');
  const cmnText = new Map(); // id -> text
  await streamBz2(files.cmn_sentences, (line) => {
    const parts = line.split('\t');
    if (parts.length < 3) return;
    cmnText.set(parts[0], parts[2]);
  });
  console.log('     ', cmnText.size, 'Mandarin sentences');

  console.log('3/5 reading translation links');
  const wanted = { vie: new Set(), jpn: new Set(), eng: new Set() };
  const links = { vie: [], jpn: [], eng: [] }; // [cmnId, otherId]
  for (const lang of ['vie', 'jpn', 'eng']) {
    await streamBz2(files['cmn_' + lang + '_links'], (line) => {
      const parts = line.split('\t');
      if (parts.length < 2) return;
      const cmnId = parts[0];
      const otherId = parts[1];
      if (!cmnText.has(cmnId)) return;
      links[lang].push([cmnId, otherId]);
      wanted[lang].add(otherId);
    });
    console.log('     ', lang, links[lang].length, 'links');
  }

  console.log('4/5 reading translated sentences');
  const translated = { vie: new Map(), jpn: new Map(), eng: new Map() };
  for (const lang of ['vie', 'jpn', 'eng']) {
    await streamBz2(files[lang + '_sentences'], (line) => {
      const parts = line.split('\t');
      if (parts.length < 3) return;
      if (!wanted[lang].has(parts[0])) return;
      translated[lang].set(parts[0], parts[2]);
    });
    console.log('     ', lang, translated[lang].size, 'matched translations');
  }

  // Join into one record per Mandarin sentence.
  const best = { vie: new Map(), jpn: new Map(), eng: new Map() };
  for (const lang of ['vie', 'jpn', 'eng']) {
    for (const [cmnId, otherId] of links[lang]) {
      const text = translated[lang].get(otherId);
      if (!text) continue;
      if (!best[lang].has(cmnId)) best[lang].set(cmnId, text);
    }
  }

  console.log('5/5 indexing against the dictionary');
  const words = loadDictionaryWords();
  const wordSet = new Map(); // first char -> words
  for (const w of words) {
    const c = w.charAt(0);
    if (!wordSet.has(c)) wordSet.set(c, []);
    wordSet.get(c).push(w);
  }

  const results = Object.create(null);
  const collocCounts = Object.create(null);

  for (const [id, zh] of cmnText) {
    if (!zh || zh.length < MIN_EXAMPLE_LEN || zh.length > MAX_EXAMPLE_LEN) continue;
    if (!/[\u4e00-\u9fff]/.test(zh)) continue;
    if (/[A-Za-z]{3,}/.test(zh)) continue;

    const chars = new Set(zh);
    const candidates = [];
    for (const ch of chars) {
      const list = wordSet.get(ch);
      if (!list) continue;
      for (const word of list) {
        if (zh.indexOf(word) === -1) continue;
        candidates.push(word);
      }
    }
    if (!candidates.length) continue;

    const vi = best.vie.get(id) || '';
    const ja = best.jpn.get(id) || '';
    const en = best.eng.get(id) || '';
    if (!vi && !ja && !en) continue; // an example the learner cannot read is not useful

    for (const word of candidates) {
      if (!results[word]) results[word] = [];
      results[word].push({ zh, vi, ja, en, id });

      // Collocations: real words that sit close to the target in real sentences
      // (提高 … 水平 / 英语 / 能力). Only 2- and 3-character windows that exist in the
      // dictionary are kept, which filters out function words.
      if (!collocCounts[word]) collocCounts[word] = Object.create(null);
      const counts = collocCounts[word];
      let from = 0;
      let idx;
      while ((idx = zh.indexOf(word, from)) !== -1) {
        const afterStart = idx + word.length;
        const beforeEnd = idx;
        from = afterStart;

        for (const len of [2, 3]) {
          for (let d = 0; d <= 4; d++) {
            const after = zh.slice(afterStart + d, afterStart + d + len);
            if (after.length === len && isKnownWord(after) && after.indexOf(word) === -1) {
              counts[after] = (counts[after] || 0) + 1;
            }
            const before = zh.slice(beforeEnd - d - len, beforeEnd - d);
            if (before.length === len && isKnownWord(before) && before.indexOf(word) === -1) {
              counts[before] = (counts[before] || 0) + 1;
            }
          }
        }
      }
    }
  }

  const out = Object.create(null);
  let exampleCount = 0;
  let collocWords = 0;
  for (const word of Object.keys(results)) {
    const ranked = EXAMPLES_CORE.rankExamples(results[word], word, {
      lookupHsk: hskOf,
      segment: segmenter,
      lang: 'vi',
    });
    const picked = EXAMPLES_CORE.pickDiverse(ranked, MAX_EXAMPLES, word, 0);
    if (!picked.length) continue;

    const colloc = Object.entries(collocCounts[word] || {})
      .filter(([, n]) => n >= MIN_COLLOCATION_COUNT)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_COLLOCATIONS)
      .map(([w, n]) => [w, n]);
    if (colloc.length) collocWords++;

    out[word] = {
      e: picked.map((p) => [p.zh, p.vi || '', p.ja || '', p.en || '']),
      c: colloc,
    };
    exampleCount += picked.length;
  }

  const json = JSON.stringify(out);
  const body = '// js/data/examples-corpus.js - Generated by tools/build-examples-corpus.js\n' +
    '// Source: Tatoeba (https://tatoeba.org) - CC BY 2.0 FR. See js/data/tatoeba-LICENSE.txt\n' +
    '// Do not edit by hand.\n' +
    'window.EXAMPLES_CORPUS = ' + json + ';\n';
  fs.writeFileSync(OUT_FILE, body);

  console.log('');
  console.log('  dictionary words   :', words.length);
  console.log('  words with examples:', Object.keys(out).length);
  console.log('  examples total     :', exampleCount);
  console.log('  words with colloc  :', collocWords);
  console.log('  output             :', path.relative(process.cwd(), OUT_FILE),
    (Buffer.byteLength(body) / 1024 / 1024).toFixed(2), 'MB');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('build-examples-corpus failed:', err.message);
    process.exit(1);
  });
}

module.exports = { loadDictionaryWords };
