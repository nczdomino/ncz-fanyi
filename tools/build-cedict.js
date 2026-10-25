#!/usr/bin/env node
// tools/build-cedict.js - Regenerate js/data/cedict.json from CC-CEDICT.
//
// The bundled MINI_DICT has ~1.6k entries. This produces the optional extended
// dictionary (~118k headwords) that the app lazy-loads only when a search finds nothing.
//
// Data source: CC-CEDICT (https://cc-cedict.org/), published under CC BY-SA 4.0.
//   Direct download: https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz
// Attribution is kept in js/data/cedict-LICENSE.txt and shown in the UI when extended
// results are displayed.
//
// Usage:
//   node tools/build-cedict.js                 # download + rebuild
//   node tools/build-cedict.js --input /tmp/cedict.txt
//
// Output format (deliberately compact):
//   { "简体": "pinyin|def1; def2", ... }
// pinyin is converted to tone marks so it matches what users type.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const https = require('https');

const { pinyinNumberToTone } = require('../js/features/dict-search-engine.js');

const SOURCE_URL = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz';
const OUT_FILE = path.join(__dirname, '..', 'js', 'data', 'cedict.json');

// Entries whose first gloss is one of these are cross-references or proper-noun stubs;
// they add bulk without helping a learner.
const LOW_VALUE = /^(?:variant of|old variant of|surname|abbr\. for|see also|used in|Japanese variant|Korean variant|archaic variant|erhua variant|also written|same as|old form of|surname |name of a person)/i;

const MAX_DEFS = 2;
const MAX_DEF_LENGTH = 60;
const MAX_DEF_TOTAL = 110;

const CEDICT_LINE = /^(\S+)\s+(\S+)\s+\[([^\]]*)\]\s+\/(.*)\/\s*$/;

function download(url) {
  return new Promise((resolve, reject) => {
    const follow = (target, redirects = 0) => {
      if (redirects > 5) return reject(new Error('too many redirects'));
      https.get(target, { headers: { 'User-Agent': 'halou-cedict-builder' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return follow(new URL(res.headers.location, target).href, redirects + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error('HTTP ' + res.statusCode + ' for ' + target));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', reject);
    };
    follow(url);
  });
}

function parse(text) {
  const out = Object.create(null);
  let lines = 0;
  let kept = 0;
  let dropped = 0;

  for (const line of text.split('\n')) {
    if (!line || line.charAt(0) === '#') continue;
    lines += 1;
    const m = CEDICT_LINE.exec(line);
    if (!m) { dropped += 1; continue; }

    const simplified = m[2];
    let defs = m[4].split('/').filter(Boolean);
    if (!defs.length) { dropped += 1; continue; }
    if (LOW_VALUE.test(defs[0])) { dropped += 1; continue; }

    defs = defs.slice(0, MAX_DEFS).map((d) =>
      d
        // CC-CEDICT writes "開金|开金[kai1 jin1]" inside glosses. The romanisation hints
        // add bulk and the "|" breaks the "pinyin|definition" invariant, so flatten both.
        .replace(/\[[^\]]*\]/g, '')
        .replace(/\|/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, MAX_DEF_LENGTH));
    const definition = defs.join('; ').slice(0, MAX_DEF_TOTAL);
    if (!definition) { dropped += 1; continue; }

    const rawPinyin = m[3].trim();
    // CC-CEDICT capitalises proper nouns ("Píng guǒ" = Apple Inc vs "píng guǒ" = apple).
    // Prefer the common-noun reading when both exist for the same headword.
    const isProperNoun = /^[A-Z]/.test(rawPinyin);
    const existing = out[simplified];
    if (existing) {
      const existingRaw = existing.pinyinRaw;
      const existingIsProper = /^[A-Z]/.test(existingRaw);
      if (!(existingIsProper && !isProperNoun)) { dropped += 1; continue; }
    }

    out[simplified] = {
      pinyinRaw: rawPinyin,
      value: pinyinNumberToTone(rawPinyin) + '|' + definition,
    };
    kept += 1;
  }
  const flat = Object.create(null);
  for (const k of Object.keys(out)) flat[k] = out[k].value;
  return { dict: flat, lines, kept, dropped };
}

async function main() {
  const inputFlag = process.argv.indexOf('--input');
  let text;
  if (inputFlag !== -1 && process.argv[inputFlag + 1]) {
    const file = process.argv[inputFlag + 1];
    console.log('Reading', file);
    text = fs.readFileSync(file, 'utf8');
  } else {
    console.log('Downloading', SOURCE_URL);
    const gz = await download(SOURCE_URL);
    console.log('  compressed:', (gz.length / 1024 / 1024).toFixed(2), 'MB');
    text = zlib.gunzipSync(gz).toString('utf8');
  }

  const { dict, lines, kept, dropped } = parse(text);
  const json = JSON.stringify(dict);
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, json);

  console.log('  entry lines :', lines);
  console.log('  kept        :', kept);
  console.log('  dropped     :', dropped);
  console.log('  output      :', path.relative(process.cwd(), OUT_FILE),
    (Buffer.byteLength(json) / 1024 / 1024).toFixed(2), 'MB raw,',
    (zlib.gzipSync(Buffer.from(json)).length / 1024 / 1024).toFixed(2), 'MB gzip');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('build-cedict failed:', err.message);
    process.exit(1);
  });
}

module.exports = { parse };
