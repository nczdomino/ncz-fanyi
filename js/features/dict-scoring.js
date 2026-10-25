// js/features/dict-scoring.js - Language-aware dictionary ranking engine (pure, DOM-free)
// Dependencies: js/features/dict-search-engine.js (helpers, optional), data files (optional at load time)
//
// Why this file exists (root cause of "tra từ ra kết quả tào lao"):
//  1. The old scoring loop let *Pinyin* outrank real meanings, so a Vietnamese query such as
//     "di" returned 底 (dǐ) above 去 (qù), and "ăn" was flooded with 安静/安全/按照.
//  2. Definitions were matched as one long blob with substring/`includes` checks instead of
//     individual synonyms, so every tie collapsed to "shortest word wins".
//  3. `levenshteinDistance()` was written but never called: typo tolerance was advertised, not real.
//
// This engine fixes that with, in order of precedence:
//   language detection -> synonym-level exact match -> boundary-aware prefix/token match ->
//   pinyin (demoted whenever a real meaning match exists) -> fuzzy typo pass.
// All work is pre-indexed once, so a lookup costs well under a millisecond for ~1.5k entries.

(function () {
  'use strict';

  // ---------------------------------------------------------------- constants
  var SC = {
    HANZI_EXACT: 1000,
    HANZI_PREFIX: 900,
    HANZI_CONTAINS: 800,

    REVERSE_EXACT: 970,
    REVERSE_PREFIX: 600,

    VI_EXACT: 950,
    VI_PHRASE: 860,
    VI_PREFIX: 820,
    VI_TOKEN: 700,
    VI_CONTAINS: 610,

    EN_EXACT: 940,
    EN_PHRASE: 880,
    EN_PREFIX: 690,
    EN_TOKEN: 650,

    JA_EXACT: 900,
    JA_PHRASE: 840,
    JA_CONTAINS: 700,
    JA_READING: 640,

    PINYIN_EXACT: 880,
    // Kept above Vi token/prefix noise so pinyin users still see 底/的/第 for "di",
    // but below every real meaning match.
    PINYIN_EXACT_DEMOTED: 845,
    PINYIN_PREFIX: 420,
    PINYIN_CONTAINS: 300,

    // Extended (CC-CEDICT) results always rank below curated entries.
    EXT_HANZI_EXACT: 960,
    EXT_HANZI_PREFIX: 870,
    EXT_HANZI_CONTAINS: 800,
    EXT_EN_EXACT: 870,
    EXT_EN_CONTAINS: 780,

    HANVIET_EXACT: 640,
    HANVIET_TOKEN: 520,
    HANVIET_PREFIX: 460,

    FUZZY_BASE: 430,
    FUZZY_PENALTY: 45,

    // A Vietnamese user who types tone marks means those exact tones, so prefix/token
    // matches that differ only by a tone mark are rejected outright (see scoreSenses).
    ACCENT_PREFIX_PENALTY: 135,
    ACCENT_TOKEN_PENALTY: 95,
    // Unaccented input cannot confirm tones, so an "exact" hit like mà for "ma" is
    // weaker evidence than a toned hit. Small penalty, not a demotion.
    ACCENT_MISMATCH_EXACT_PENALTY: 60,
    ACCENT_MISMATCH_TONED_PENALTY: 210,
    ACCENT_EXACT_BONUS: 25,

    SLANG_BONUS: 15,
    REVERSE_BONUS: 10
  };

  var PRIMARY_MIN = 850;   // shown as a confident result
  var RELATED_MIN = 560;   // shown under "related words"
  var MAX_SENSES = 8;
  var MAX_RESULTS = 120;

  // Very common English function words: they match hundreds of glosses and are pure noise.
  var EN_STOPWORDS = {
    a: 1, an: 1, the: 1, of: 1, to: 1, in: 1, on: 1, at: 1, for: 1, with: 1, and: 1,
    or: 1, is: 1, are: 1, be: 1, as: 1, by: 1, it: 1, this: 1, that: 1, from: 1, up: 1
  };

  // Minimal English irregular lemmas (stemming alone gets these wrong).
  var EN_IRREGULAR = {
    was: 'be', were: 'be', been: 'be', am: 'be', is: 'be', are: 'be',
    went: 'go', gone: 'go', ate: 'eat', eaten: 'eat', saw: 'see', seen: 'see',
    took: 'take', taken: 'take', made: 'make', gave: 'give', given: 'give',
    got: 'get', gotten: 'get', bought: 'buy', brought: 'bring', thought: 'think',
    taught: 'teach', told: 'tell', said: 'say', found: 'find', left: 'leave',
    felt: 'feel', kept: 'keep', slept: 'sleep', ran: 'run', came: 'come',
    children: 'child', people: 'person', men: 'man', women: 'woman', feet: 'foot',
    teeth: 'tooth', mice: 'mouse', better: 'good', best: 'good', worse: 'bad',
    worst: 'bad', more: 'many', most: 'many'
  };

  // ------------------------------------------------------------- dependencies
  function stripVi(s) {
    if (typeof stripVietnameseTones === 'function') return stripVietnameseTones(String(s || ''));
    var out = String(s || '').replace(/đ/g, 'd').replace(/Đ/g, 'D').normalize('NFD');
    // Re-compose: NFD decomposes kana with dakuten too (ず -> す + U+3099).
    return out.replace(/[\u0300-\u036f]/g, '').normalize('NFC');
  }

  // Katakana -> hiragana. KANJI_DATA stores on-readings in katakana (スイ, ホン) while
  // learners type hiragana (すい, ほん), so both sides must be folded before comparing.
  function kataToHira(s) {
    if (typeof katakanaToHiragana === 'function') return katakanaToHiragana(String(s || ''));
    return String(s || '').normalize('NFC')
      .replace(/[\u30a1-\u30f6]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x60); });
  }

  function lev(a, b) {
    if (typeof levenshteinDistance === 'function') return levenshteinDistance(a, b);
    if (a === b) return 0;
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var prev = new Array(n + 1), cur = new Array(n + 1), i, j, tmp;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1)
        );
      }
      tmp = prev; prev = cur; cur = tmp;
    }
    return prev[n];
  }

  // Learners type numeric pinyin ("ni3 hao3") at least as often as tone marks.
  function normalizePinyinDigits(q) {
    if (typeof pinyinNumberToTone !== 'function') return q;
    if (!/[1-5]/.test(q)) return q;
    if (!/^[a-zA-Z\u00fc\u00dc1-5\s'.:]+$/.test(q)) return q;
    var conv = pinyinNumberToTone(q);
    return conv || q;
  }

  function detectLang(q) {
    if (typeof detectSearchLanguage === 'function') return detectSearchLanguage(q);
    if (/[\u4e00-\u9fff]/.test(q)) return 'zh';
    if (/[\u3040-\u30ff]/.test(q)) return 'ja';
    if (/[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(q)) return 'vi';
    if (/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(q)) return 'pinyin';
    return 'latin';
  }

  // Normalise a query the same way the Japanese helpers do.
  function normalizeJa(q) {
    if (typeof normalizeJapaneseQuery === 'function') return normalizeJapaneseQuery(q);
    return { raw: q, hiragana: '', kanjiEquivalent: '' };
  }

  // ------------------------------------------------------------ normalisation
  var PUNCT_RE = /[.,;:!?"'`()\[\]{}<>|•·…~～〜^_=+*#$%&@\\\/。，、；：！？・「」『』（）【】《》]/g;
  var SENSE_SPLIT = /[,;，；、\/|•·・]+/;

  function norm(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(PUNCT_RE, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normNoTone(s) { return norm(stripVi(s)); }

  function stripParens(s) {
    return String(s || '')
      .replace(/[（(][^）)]*[）)]/g, ' ')
      .replace(/\[[^\]]*\]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function splitRaw(v, out) {
    out = out || [];
    if (v == null) return out;
    if (Array.isArray(v)) {
      for (var i = 0; i < v.length && out.length < MAX_SENSES; i++) splitRaw(v[i], out);
      return out;
    }
    var parts = String(v).split(SENSE_SPLIT);
    for (var p = 0; p < parts.length && out.length < MAX_SENSES; p++) {
      var t = parts[p].trim();
      if (t) out.push(t);
    }
    return out;
  }

  function lemma(word) {
    var w = String(word || '').toLowerCase();
    if (!w) return '';
    if (EN_IRREGULAR[w]) return EN_IRREGULAR[w];
    if (typeof stemEnglishWord === 'function') {
      var s = stemEnglishWord(w);
      if (s && s !== w) return s;
    }
    if (w.length > 4 && w.charAt(w.length - 1) === 's' && w.charAt(w.length - 2) !== 's') return w.slice(0, -1);
    return w;
  }

  // -------------------------------------------------------------- data access
  function dict() {
    return (typeof MINI_DICT !== 'undefined' && MINI_DICT) ? MINI_DICT : {};
  }
  function slangAll(extra) {
    var out = [];
    if (Array.isArray(extra)) out = out.concat(extra);
    else {
      if (typeof ENRICH !== 'undefined' && ENRICH && Array.isArray(ENRICH.remote)) out = out.concat(ENRICH.remote);
      if (typeof SLANG_BUILTIN !== 'undefined' && Array.isArray(SLANG_BUILTIN)) out = out.concat(SLANG_BUILTIN);
    }
    return out;
  }
  function kanjiTable() {
    return (typeof KANJI_DATA !== 'undefined' && KANJI_DATA) ? KANJI_DATA : {};
  }

  // ------------------------------------------------------- precomputed index
  // Building this once turns a per-keystroke cost of ~55 ms into < 1 ms.
  var _index = null;

  function buildSenseList(list) {
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var raw = list[i];
      var clean = norm(stripParens(raw));
      if (!clean) continue;
      var nt = normNoTone(clean);
      out.push({ raw: raw, norm: clean, nt: nt, tokens: nt ? nt.split(' ') : [] });
    }
    return out;
  }

  function joinBlob(viSenses, enGlosses, jaSenses, py, hv, kanjiBits) {
    var parts = [];
    for (var i = 0; i < viSenses.length; i++) parts.push(viSenses[i].nt);
    for (var j = 0; j < enGlosses.length; j++) parts.push(enGlosses[j].nt);
    for (var k = 0; k < jaSenses.length; k++) parts.push(jaSenses[k].norm);
    if (py) parts.push(py);
    if (hv) parts.push(hv);
    if (kanjiBits) parts.push(kanjiBits);
    return ' ' + parts.join(' ') + ' ';
  }

  function buildIndex() {
    var D = dict();
    var words = Object.keys(D);
    var size = words.length;
    if (_index && _index.dict === D && _index.size === size) return _index;

    var items = new Array(size);
    for (var i = 0; i < size; i++) {
      var w = words[i];
      var e = D[w] || {};
      var viSenses = e.vi ? buildSenseList(splitRaw(e.vi)) : [];
      var enGlosses = [];
      if (e.en) {
        var enRaw = Array.isArray(e.en) ? e.en : [e.en];
        for (var g = 0; g < enRaw.length && g < MAX_SENSES; g++) {
          var gloss = stripParens(enRaw[g]);
          var gn = norm(gloss);
          if (!gn) continue;
          var toks = gn.split(' '), lem = [];
          for (var t = 0; t < toks.length; t++) {
            var lt = lemma(toks[t]);
            if (lt) lem.push(lt);
          }
          enGlosses.push({ norm: gn, nt: normNoTone(gn), tokens: lem });
        }
      }
      // 1,469 of 1,615 entries have no `ja` field, but JA_COMMON_DICT covers every one of
      // them. Resolve it here so scoring *and* the rendered card get a Japanese meaning
      // without shipping a duplicated data file.
      var jaValue = e.ja || '';
      if (!jaValue && typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT) {
        jaValue = JA_COMMON_DICT[w] || '';
      }
      var jaSenses = [];
      if (jaValue) {
        var jaRaw = splitRaw(jaValue);
        for (var j = 0; j < jaRaw.length; j++) {
          var jn = norm(stripParens(jaRaw[j]));
          if (jn) jaSenses.push({ norm: jn, hira: kataToHira(jn) });
        }
      }
      var py = '';
      if (e.pinyin) py = normNoTone(e.pinyin).replace(/\s+/g, '');
      // Many entries (and every JA_COMMON-only word) have no stored Hán-Việt reading.
      // It is fully derivable from the character table, so derive it instead of showing
      // nothing for Vietnamese/Japanese users.
      var hvDisplay = e.hanviet || '';
      if (!hvDisplay && typeof getWordHanViet === 'function') {
        try { hvDisplay = getWordHanViet(w) || ''; } catch (e2) { hvDisplay = ''; }
      }
      var hvToned = hvDisplay ? norm(hvDisplay) : '';
      var hv = hvToned ? normNoTone(hvDisplay) : '';
      var hvTokens = hv ? hv.split(' ') : [];

      // Japanese readings live in KANJI_DATA, not in the entry, so they must be part of
      // the pre-filter blob or kana queries ("ねこ") never reach scoreKanjiReadings().
      var kdEntry = kanjiTable()[w];
      var kanjiBits = '';
      if (kdEntry) {
        kanjiBits = [kdEntry.on, kdEntry.kun, kdEntry.ja_meaning]
          .map(function (x) { return (x && x !== '-') ? kataToHira(norm(x)) : ''; })
          .filter(Boolean)
          .join(' ');
      }

      items[i] = {
        word: w,
        entry: e,
        vi: viSenses,
        en: enGlosses,
        ja: jaSenses,
        jaDisplay: jaValue,
        py: py,
        hv: hv,
        hvToned: hvToned,
        hvDisplay: hvDisplay,
        hvTokens: hvTokens,
        hsk: e.hsk,
        // Fast pre-filter: every non-fuzzy match requires the query to appear in here.
        blob: joinBlob(viSenses, enGlosses, jaSenses, py, hv, kanjiBits)
      };
    }

    _index = { dict: D, size: size, items: items };
    return _index;
  }

  // ---------------------------------------------------------------- JA index
  // JA_COMMON_DICT maps Chinese -> Japanese ("山" -> "山 (やま)"). Reversed, it is a
  // 1.7k-entry Japanese lookup table that the old scoring loop never consulted, which is
  // why a Japanese user searching でんしゃ / がっこう / 先生 got nothing at all.
  var _jaIdx = null;

  function buildJaReverseIndex() {
    var JA = (typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT) ? JA_COMMON_DICT : null;
    if (!JA) return null;
    var keys = Object.keys(JA);
    if (_jaIdx && _jaIdx.src === JA && _jaIdx.size === keys.length) return _jaIdx;

    var map = Object.create(null);
    function add(value, zh) {
      if (!value) return;
      var k = kataToHira(norm(value));
      if (!k || k.length < 2) return;
      if (!map[k]) map[k] = [];
      if (map[k].length < 6 && map[k].indexOf(zh) === -1) map[k].push(zh);
    }

    for (var i = 0; i < keys.length; i++) {
      var zh = keys[i];
      var val = JA[zh];
      if (!val || typeof val !== 'string') continue;
      var variants = splitRaw(val);
      for (var v = 0; v < variants.length; v++) {
        var raw = variants[v];
        // "山 (やま)" carries the reading in parentheses: index both forms.
        var paren = /[（(]([^）)]*)[）)]/.exec(raw);
        if (paren) add(paren[1], zh);
        add(stripParens(raw), zh);
      }
    }
    _jaIdx = { src: JA, size: keys.length, map: map };
    return _jaIdx;
  }

  function lookupJaIndex(ctx) {
    if (ctx.lang !== 'ja' && !ctx.jaHira) return [];
    var idx = buildJaReverseIndex();
    if (!idx) return [];
    var out = [];
    var seen = Object.create(null);
    var probes = [];
    var q = kataToHira(ctx.qNorm);
    if (q && q.length >= 2) probes.push(q);
    if (ctx.jaHira) {
      var h = kataToHira(norm(ctx.jaHira));
      if (h && h.length >= 2 && probes.indexOf(h) === -1) probes.push(h);
    }
    for (var p = 0; p < probes.length; p++) {
      var hit = idx.map[probes[p]];
      if (!hit) continue;
      for (var i = 0; i < hit.length; i++) {
        if (seen[hit[i]]) continue;
        seen[hit[i]] = 1;
        out.push(hit[i]);
      }
    }
    return out;
  }

  var _slangIdx = null;

  // Slang data is small but rebuilding its normalised senses on every keystroke
  // dominated the profile, so memoise it the same way as the main dictionary.
  function buildSlangIndex(extra) {
    var list = slangAll(extra);
    var key = list.length + ':' + (list[0] ? String(list[0].w) : '') + ':' + (extra ? 'x' : '');
    if (_slangIdx && _slangIdx.key === key) return _slangIdx.items;

    var items = new Array(list.length);
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      if (!s || !s.w) { items[i] = null; continue; }
      items[i] = {
        word: String(s.w),
        raw: s,
        vi: s.vi ? buildSenseList(splitRaw(s.vi)) : [],
        en: s.en ? buildEnGlosses(s.en) : [],
        ja: s.ja ? buildJaSenses(s.ja) : [],
        py: s.py ? normNoTone(s.py).replace(/\s+/g, '') : '',
        alias: Array.isArray(s.alias) ? s.alias : null
      };
    }
    _slangIdx = { key: key, items: items };
    return items;
  }

  function invalidateIndex() { _index = null; _slangIdx = null; _jaIdx = null; }

  // --------------------------------------------------------------- scoring
  function startsAtBoundary(text, q) {
    if (!q) return false;
    if (text === q) return true;
    if (text.indexOf(q) !== 0) return false;
    var next = text.charAt(q.length);
    return next === '' || next === ' ';
  }

  function hasToken(text, q) {
    if (!q || q.indexOf(' ') !== -1) return false;
    var tokens = text.split(' ');
    for (var i = 0; i < tokens.length; i++) if (tokens[i] === q) return true;
    return false;
  }

  // True when the longer user query contains the whole entry sense as a phrase that
  // covers at least half of the query ("xin lỗi nhé" contains "xin lỗi").
  function coversMost(query, sense) {
    if (!query || !sense) return false;
    if (sense.length * 2 < query.length) return false;
    return hasPhrase(query, sense);
  }

  // Phrase containment on whole-syllable boundaries.
  function hasPhrase(text, q) {
    var idx = text.indexOf(q);
    while (idx !== -1) {
      var before = idx === 0 ? '' : text.charAt(idx - 1);
      var afterPos = idx + q.length;
      var after = afterPos >= text.length ? '' : text.charAt(afterPos);
      if ((before === '' || before === ' ') && (after === '' || after === ' ')) return true;
      idx = text.indexOf(q, idx + 1);
    }
    return false;
  }

  /**
   * Score a precomputed sense list. Returns the best {score, field, exact} or null.
   */
  function scoreSenses(senses, ctx, weights, field) {
    var best = null;
    var n = senses.length;
    if (!n) return null;
    for (var i = 0; i < n; i++) {
      var s = senses[i];
      var nt = s.nt;
      if (!nt) continue;
      var sc = 0;
      var exact = false;
      var penalty = 0;

      if (nt === ctx.qN) {
        sc = weights.exact;
        exact = true;
        if (field === 'vi') {
          if (s.norm === ctx.qNorm) {
            sc += SC.ACCENT_EXACT_BONUS;
          } else if (!ctx.viToned) {
            penalty = SC.ACCENT_MISMATCH_EXACT_PENALTY;
          } else {
            // Tones were typed and they differ: e.g. "thức dậy" vs "thúc đẩy".
            // Keep it (a partially-mistyped tone is common) but never as a primary hit.
            penalty = SC.ACCENT_MISMATCH_TONED_PENALTY;
          }
        }
      } else if (ctx.hasSpace && hasPhrase(nt, ctx.qN)) {
        // A toned query pins the tone marks, so "an toàn" is NOT a match for "ăn".
        // Dropping beats penalising: otherwise every "phổ…" word surfaces for "phở".
        if (field === 'vi' && ctx.viToned && !hasPhrase(s.norm, ctx.qNorm)) continue;
        sc = weights.phrase;
      } else if (startsAtBoundary(nt, ctx.qN)) {
        if (field === 'vi' && ctx.viToned && !startsAtBoundary(s.norm, ctx.qNorm)) continue;
        sc = weights.prefix;
      } else if (s.tokens.indexOf(ctx.qN) !== -1) {
        if (field === 'vi' && ctx.viToned && !hasToken(s.norm, ctx.qNorm)) continue;
        sc = weights.token;
      } else if (weights.contains && ctx.hasSpace && coversMost(ctx.qN, nt)) {
        // The user typed more than the entry says ("xin lỗi nhé" vs "xin lỗi").
        // Requiring the sense to cover at least half of the query keeps this precise.
        if (field === 'vi' && ctx.viToned && !hasPhrase(ctx.qNorm, s.norm)) continue;
        sc = weights.contains;
      }

      if (!sc) continue;
      sc -= penalty;
      // Earlier senses are the primary meaning -> higher confidence.
      sc -= Math.min(i, 6) * 8;
      // A definition with few senses is more specific than a long synonym blob.
      sc += Math.max(0, 10 - n * 3);

      if (!best || sc > best.score) best = { score: sc, field: field, exact: exact, senseIndex: i };
    }
    return best;
  }

  function scoreEnglish(item, ctx) {
    var list = item.en;
    if (!list || !list.length) return null;
    // A query that is itself an English function word ("the", "to", "of") is never a
    // meaningful English gloss search: it would match most of the dictionary.
    if (EN_STOPWORDS[ctx.qNorm]) return null;
    var best = null;
    for (var i = 0; i < list.length; i++) {
      var g = list[i];
      var sc = 0;
      var exact = false;

      if (g.nt === ctx.qNorm) {
        sc = SC.EN_EXACT;
        exact = true;
      } else if (ctx.qNorm.length >= 3 && startsAtBoundary(g.nt, ctx.qNorm)) {
        sc = SC.EN_PREFIX;
      } else if (ctx.hasSpace && hasPhrase(g.nt, ctx.qNorm)) {
        sc = SC.EN_PHRASE;
      } else if (ctx.qLemma && !EN_STOPWORDS[ctx.qLemma] && g.tokens.indexOf(ctx.qLemma) !== -1) {
        sc = SC.EN_TOKEN;
      }

      if (!sc) continue;
      sc -= Math.min(i, 6) * 8;
      if (!best || sc > best.score) best = { score: sc, field: 'en', exact: exact, senseIndex: i };
    }
    return best;
  }

  function scoreJapanese(item, ctx) {
    if (ctx.lang !== 'ja' && !ctx.jaHira) return null;
    var list = item.ja;
    if (!list || !list.length) return null;
    var best = null;
    var targets = [kataToHira(ctx.qNorm)];
    if (ctx.jaHira) targets.push(kataToHira(norm(ctx.jaHira)));

    for (var i = 0; i < list.length; i++) {
      var s = list[i].hira || kataToHira(list[i].norm);
      if (!s) continue;
      var sc = 0;
      var exact = false;
      for (var t = 0; t < targets.length; t++) {
        var q = targets[t];
        if (!q) continue;
        if (s === q) { sc = Math.max(sc, SC.JA_EXACT); exact = true; }
        else if (ctx.jaGuessed) continue; // romaji guess: exact only
        else if (q.length >= 3 && s.indexOf(q) !== -1) {
          // Long substrings are meaningful inside a Japanese phrase (でんしゃ in でんしゃ).
          sc = Math.max(sc, SC.JA_PHRASE);
        } else if (q.length === 2 && (s.indexOf(q) === 0 || s.lastIndexOf(q) === s.length - 2)) {
          // A 2-kana query must sit on a word boundary: やま must not match 感嘆してやまない.
          sc = Math.max(sc, SC.JA_PHRASE);
        }
      }
      if (!sc) continue;
      sc -= Math.min(i, 6) * 6;
      if (!best || sc > best.score) best = { score: sc, field: 'ja', exact: exact, senseIndex: i };
    }
    return best;
  }

  function scoreKanjiReadings(word, ctx) {
    if (ctx.lang !== 'ja' && !ctx.jaHira) return null;
    var kd = kanjiTable()[word];
    if (!kd) return null;
    var q = kataToHira(ctx.qNorm);
    var kana = ctx.jaHira ? kataToHira(norm(ctx.jaHira)) : '';
    var fields = [kd.on, kd.kun, kd.ja_meaning];
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (!f || f === '-') continue;
      var nf = kataToHira(norm(f));
      if (!nf) continue;
      if (kana && (nf === kana || (!ctx.jaGuessed && hasToken(nf, kana)))) {
        return { score: SC.JA_READING, field: 'ja', exact: nf === kana };
      }
      // Exact reading only, or a 3+ kana prefix. A 2-kana prefix would make やま match
      // 病 through its kun reading やまい.
      if (ctx.jaGuessed) {
        if (q && nf === q) return { score: SC.JA_READING, field: 'ja', exact: true };
        continue;
      }
      if (q && (nf === q || (q.length >= 3 && nf.indexOf(q) === 0) || (q.length >= 3 && hasToken(nf, q)))) {
        return { score: SC.JA_READING, field: 'ja', exact: nf === q };
      }
    }
    return null;
  }

  function scorePinyin(item, ctx) {
    if (!item.py) return null;
    var qc = ctx.qCompact;
    if (!qc || /[^a-z]/.test(qc)) return null;
    if (item.py === qc) return { score: SC.PINYIN_EXACT, field: 'pinyin', exact: true };
    if (qc.length >= 2 && item.py.indexOf(qc) === 0) return { score: SC.PINYIN_PREFIX, field: 'pinyin', exact: false };
    if (qc.length >= 3 && item.py.indexOf(qc) !== -1) return { score: SC.PINYIN_CONTAINS, field: 'pinyin', exact: false };
    return null;
  }

  function scoreHanViet(item, ctx) {
    var hv = item.hv;
    if (!hv) return null;

    // A Hán-Việt reading is a *phonetic* coincidence, not a meaning. When the user types
    // tone marks ("phở") it must not match an unrelated reading ("phổ thông" -> 普通).
    var toned = item.hvToned || hv;
    var toneOk = !ctx.viToned || toned.indexOf(ctx.qNorm) !== -1 || hv.indexOf(ctx.qN) === -1;

    if (hv === ctx.qN) {
      if (ctx.viToned && toned.indexOf(ctx.qNorm) === -1) return null;
      return { score: SC.HANVIET_EXACT, field: 'hanviet', exact: true };
    }
    if (item.hvTokens.indexOf(ctx.qN) !== -1) {
      if (!hasToken(toned, ctx.qNorm)) return null;
      return { score: SC.HANVIET_TOKEN, field: 'hanviet', exact: false };
    }
    if (ctx.qN.length >= 3 && startsAtBoundary(hv, ctx.qN)) {
      if (!startsAtBoundary(toned, ctx.qNorm)) return null;
      return { score: SC.HANVIET_PREFIX, field: 'hanviet', exact: false };
    }
    return null;
  }

  function pick(a, b) {
    if (!a) return b;
    if (!b) return a;
    return b.score > a.score ? b : a;
  }

  function specificBonus(hsk) {
    return typeof hsk === 'number' ? (10 - Math.min(hsk, 9)) : 0;
  }

  // Score every entry against a list of normalised English variants.
  function searchEnglishByVariants(variants, ctx) {
    var out = [];
    var items = buildIndex().items;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (!item.en.length) continue;
      var best = null;
      for (var v = 0; v < variants.length; v++) {
        var q = variants[v];
        var qLem = lemma(q);
        for (var g = 0; g < item.en.length; g++) {
          var gloss = item.en[g];
          var sc = 0;
          var exact = false;
          if (gloss.nt === q) { sc = SC.EN_EXACT - 15 * (v + 1); exact = true; }
          else if (q.length >= 3 && startsAtBoundary(gloss.nt, q)) sc = SC.EN_PREFIX - 15 * (v + 1);
          else if (qLem && !EN_STOPWORDS[qLem] && gloss.tokens.indexOf(qLem) !== -1) sc = SC.EN_TOKEN - 15 * (v + 1);
          if (!sc) continue;
          if (!best || sc > best.score) best = { score: sc, field: 'en', exact: exact };
        }
      }
      if (best) out.push({ word: item.word, scored: best });
    }
    return out;
  }

  // --------------------------------------------------- extended dictionary
  // CC-CEDICT (~119k headwords) is loaded on demand by js/features/ext-dict.js.
  // It is kept out of the main index so the hot path stays at ~1 ms: it is only
  // consulted when the curated dictionary found (almost) nothing.
  var _ext = null;
  var _extKeys = null;
  var _extBlob = null;
  var _extOffsets = null;
  var _extGlossMap = null;

  /**
   * Register the extended dictionary.
   * @param {Object<string,string>} map  { simplified: "pinyin|definition" }
   * @returns {number} entry count
   */
  function setExtendedDictionary(map) {
    _ext = null;
    _extKeys = null;
    _extBlob = null;
    _extOffsets = null;
    _extGlossMap = null;
    if (!map || typeof map !== 'object') return 0;
    _ext = map;
    _extKeys = Object.keys(map);
    return _extKeys.length;
  }

  // One lower-cased blob of all definitions, so English lookups cost a single indexOf
  // instead of 119k toLowerCase() allocations.
  function buildExtBlob() {
    if (_extBlob !== null || !_extKeys) return;
    var n = _extKeys.length;
    var offsets = new Array(n);
    var parts = new Array(n);
    var pos = 0;
    for (var i = 0; i < n; i++) {
      var v = _ext[_extKeys[i]] || '';
      var bar = v.indexOf('|');
      var def = bar === -1 ? v : v.slice(bar + 1);
      var lower = def.toLowerCase();
      offsets[i] = pos;
      parts[i] = lower;
      pos += lower.length + 1;
    }
    _extBlob = parts.join('\u0001');
    _extOffsets = offsets;
  }

  function extIndexAt(offset) {
    var lo = 0;
    var hi = _extOffsets.length - 1;
    var ans = 0;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      if (_extOffsets[mid] <= offset) { ans = mid; lo = mid + 1; } else { hi = mid - 1; }
    }
    return ans;
  }

  // Index of first-gloss -> headwords. CC-CEDICT orders glosses by importance, so an
  // entry whose FIRST gloss is exactly the query ("mahjong") is a much better answer than
  // one that merely mentions it ("mahjong table"). Built once, on first English lookup,
  // and only for single-word glosses to keep it small.
  var GLOSS_LEAD_IN = /^(?:to\s+|\([a-z][^)]{0,20}\)\s*|the\s+|a\s+|an\s+)/;

  function normalizeGloss(text) {
    return String(text || '')
      .toLowerCase()
      .replace(GLOSS_LEAD_IN, '')
      .replace(/[^a-z'-]/g, '')
      .trim();
  }

  function buildExtGlossMap() {
    if (_extGlossMap || !_extKeys) return;
    var map = Object.create(null);
    var n = _extKeys.length;
    for (var i = 0; i < n; i++) {
      var word = _extKeys[i];
      var v = _ext[word] || '';
      var bar = v.indexOf('|');
      if (bar === -1) continue;
      var def = v.slice(bar + 1);
      var semi = def.indexOf(';');
      var key = normalizeGloss(semi === -1 ? def : def.slice(0, semi));
      if (!key || key.length < 3 || key.indexOf(' ') !== -1) continue;
      var list = map[key];
      if (!list) { map[key] = [word]; continue; }
      if (list.length < 8) list.push(word);
    }
    _extGlossMap = map;
  }

  function isExtBoundary(ch) {
    return ch === '' || ch === '\u0001' || ch === ' ' || ch === ';' || ch === ',' ||
      ch === '.' || ch === '(' || ch === ')' || ch === '[' || ch === ']' || ch === '/';
  }

  function extEntryFor(word, scored) {
    var raw = _ext[word] || '';
    var bar = raw.indexOf('|');
    var pinyin = bar === -1 ? raw : raw.slice(0, bar);
    var def = bar === -1 ? '' : raw.slice(bar + 1);
    return {
      entry: {
        pinyin: pinyin,
        vi: '',
        en: def ? [def] : [],
        ja: '',
        hanviet: '',
        type: 'word'
      },
      scored: scored
    };
  }

  function scanExtended(ctx, isHanzi, q) {
    if (!_ext || !_extKeys) return [];
    var out = [];
    var MAX = 20;

    if (isHanzi) {
      var exact = [];
      var prefix = [];
      var contains = [];
      for (var i = 0; i < _extKeys.length; i++) {
        var w = _extKeys[i];
        if (w === q) { exact.push(w); continue; }
        if (w.length > 6) continue;
        if (w.indexOf(q) === 0) { prefix.push(w); continue; }
        if (contains.length < MAX * 2 && w.indexOf(q) !== -1) contains.push(w);
      }
      var byLen = function (a, b) { return a.length - b.length; };
      prefix.sort(byLen);
      contains.sort(byLen);
      var take = function (list, score) {
        for (var k = 0; k < list.length && out.length < MAX; k++) {
          var item = extEntryFor(list[k], { score: score, field: 'cedict', exact: score === SC.EXT_HANZI_EXACT });
          out.push({ word: list[k], entry: item.entry, scored: item.scored });
        }
      };
      take(exact, SC.EXT_HANZI_EXACT);
      take(prefix, SC.EXT_HANZI_PREFIX);
      take(contains, SC.EXT_HANZI_CONTAINS);
      return out;
    }

    // English / pinyin lookup.
    //  1. exact first-gloss match (fast and precise: "mahjong" -> 麻将, "travel" -> 旅行)
    //  2. blob scan fallback for partial matches ("noodle" inside "instant noodles")
    if (!q || q.length < 3) return [];
    buildExtGlossMap();

    var probes = [q];
    if (ctx.qLemma && ctx.qLemma !== q && ctx.qLemma.length >= 3) probes.push(ctx.qLemma);

    var picked = Object.create(null);
    var order = [];
    function addPick(word, exact) {
      if (!word || picked[word]) return;
      picked[word] = exact ? 2 : 1;
      order.push(word);
    }

    if (_extGlossMap) {
      for (var pi = 0; pi < probes.length; pi++) {
        var hitList = _extGlossMap[probes[pi]];
        if (!hitList) continue;
        for (var hi = 0; hi < hitList.length; hi++) addPick(hitList[hi], true);
      }
    }

    if (order.length < 5) {
      buildExtBlob();
      if (_extBlob) {
        for (var pf = 0; pf < probes.length; pf++) {
          var probe = probes[pf];
          var from = 0;
          var scanned = 0;
          while (order.length < 40 && scanned < 800) {
            var idx = _extBlob.indexOf(probe, from);
            if (idx === -1) break;
            from = idx + 1;
            scanned++;
            if (!isExtBoundary(idx === 0 ? '' : _extBlob.charAt(idx - 1))) continue;
            if (!isExtBoundary(_extBlob.charAt(idx + probe.length))) continue;
            addPick(_extKeys[extIndexAt(idx)], false);
          }
          if (order.length >= 5) break;
        }
      }
    }

    // 2-character headwords first: learners search 麻将, not 牌桌 or 麻将牌.
    var lenRank = function (n) {
      if (n === 2) return 0;
      if (n === 3) return 1;
      if (n === 1) return 2;
      return 3 + Math.max(0, n - 4);
    };
    order.sort(function (a, b) {
      if (picked[a] !== picked[b]) return picked[b] - picked[a];
      var la = lenRank(a.length);
      var lb = lenRank(b.length);
      if (la !== lb) return la - lb;
      return a < b ? -1 : (a > b ? 1 : 0);
    });

    for (var oi = 0; oi < order.length && out.length < MAX; oi++) {
      var w2 = order[oi];
      var exactHit = picked[w2] === 2;
      var item = extEntryFor(w2, {
        score: exactHit ? SC.EXT_EN_EXACT : SC.EXT_EN_CONTAINS,
        field: 'cedict',
        exact: exactHit
      });
      out.push({ word: w2, entry: item.entry, scored: item.scored });
    }
    return out;
  }

  // ------------------------------------------------------------ public search
  /**
   * @param {string} rawQuery
   * @param {{limit?:number, includeSlang?:boolean, slang?:Array, fuzzy?:boolean}} [opts]
   * @returns {{query:string, detected:string, matches:Array, stats:Object}}
   */
  function searchDictionary(rawQuery, opts) {
    opts = opts || {};
    var limit = Math.min(Math.max(opts.limit || MAX_RESULTS, 1), 500);
    var query = String(rawQuery == null ? '' : rawQuery).trim();
    var result = { query: query, detected: 'all', matches: [], stats: { total: 0, primary: 0, related: 0 } };
    if (!query) return result;

    var t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : 0;

    // Numeric pinyin is rewritten to tone marks before anything else looks at the string.
    var workingQuery = normalizePinyinDigits(query);

    var qNorm = norm(workingQuery);
    var qN = normNoTone(workingQuery);
    if (!qNorm && !qN) return result;

    var lang = detectLang(workingQuery);
    // A query that started as "ni3 hao3" is unambiguously pinyin, whatever the tone marks
    // happen to look like.
    if (workingQuery !== query) lang = 'pinyin';
    result.detected = lang;

    var isHanzi = /[\u4e00-\u9fff]/.test(workingQuery);
    var jaInfo = normalizeJa(workingQuery);
    var jaHira = (jaInfo && jaInfo.hiragana && norm(jaInfo.hiragana) !== qNorm) ? jaInfo.hiragana : '';

    var ctx = {
      lang: lang,
      qNorm: qNorm,
      qN: qN,
      qCompact: qN.replace(/\s+/g, ''),
      qLemma: lemma(qNorm),
      qLemmaPlural: null,
      hasSpace: qN.indexOf(' ') !== -1,
      viToned: /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(workingQuery),
      jaHira: jaHira,
      // True when jaHira came from a romaji conversion rather than a real kana query.
      // In that case only exact Japanese hits are accepted, so English words whose
      // mechanical conversion looks kana-ish cannot pollute the results.
      jaGuessed: !!jaHira && lang !== 'ja',
      isHanzi: isHanzi
    };

    var pinyinAllowed = !isHanzi && lang !== 'vi' && lang !== 'ja';

    var matches = [];
    var byWord = Object.create(null);
    var strongestDefinition = 0;
    var bestPinyin = 0;

    function noteScore(scored) {
      if (!scored) return;
      if (scored.field === 'pinyin') {
        if (scored.score > bestPinyin) bestPinyin = scored.score;
      } else if (scored.field !== 'hanzi' && scored.score > strongestDefinition) {
        strongestDefinition = scored.score;
      }
    }

    function push(word, entry, scored, source, extra) {
      if (!word) return;
      noteScore(scored);
      var scoreVal = scored ? scored.score : 0;
      var existing = byWord[word];
      if (existing) {
        if (scoreVal > existing.score) {
          existing.score = scoreVal;
          existing.matchField = scored ? scored.field : existing.matchField;
          existing.exact = scored ? !!scored.exact : existing.exact;
        }
        if (existing.sources.indexOf(source) === -1) existing.sources.push(source);
        if (!existing.ja && entry && entry.ja) existing.ja = entry.ja;
        if (!existing.vi && entry && entry.vi) existing.vi = entry.vi;
        if (!existing.pinyin && entry && entry.pinyin) existing.pinyin = entry.pinyin;
        if (!existing.en.length && entry && entry.en) {
          existing.en = Array.isArray(entry.en) ? entry.en : [entry.en];
        }
        return;
      }
      // Centralised Japanese fallback: covers the Hanzi path, the reverse dictionary and
      // the slang dictionary as well as the main scan.
      var jaFallback = '';
      if (!(entry && entry.ja) && typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT) {
        jaFallback = JA_COMMON_DICT[word] || '';
      }
      var item = {
        word: word,
        pinyin: (entry && entry.pinyin) || '',
        vi: (entry && entry.vi) || '',
        en: entry && entry.en ? (Array.isArray(entry.en) ? entry.en : [entry.en]) : [],
        ja: (entry && entry.ja) || jaFallback || '',
        hanviet: (entry && entry.hanviet) || '',
        type: (entry && entry.type) || 'word',
        hsk: entry ? entry.hsk : undefined,
        score: scoreVal,
        matchField: scored ? scored.field : '',
        exact: scored ? !!scored.exact : false,
        sources: [source]
      };
      if (extra) for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) item[k] = extra[k];
      byWord[word] = item;
      matches.push(item);
    }

    var idx = buildIndex();
    var items = idx.items;

    // ---- 1. Hanzi lookup -------------------------------------------------
    if (isHanzi) {
      for (var i = 0; i < items.length; i++) {
        var it0 = items[i];
        var w = it0.word;
        var sc0;
        if (w === workingQuery) sc0 = SC.HANZI_EXACT;
        else if (w.indexOf(workingQuery) === 0) sc0 = SC.HANZI_PREFIX;
        else if (w.indexOf(workingQuery) !== -1) sc0 = SC.HANZI_CONTAINS;
        else continue;
        push(w, it0.entry, { score: sc0, field: 'hanzi', exact: w === query }, 'dict');
      }
    }

    // ---- 2. Reverse dictionary (curated phrase book) ----------------------
    if (!isHanzi && typeof findReverseMatches === 'function') {
      var revQueries = [query];
      if (jaHira && revQueries.indexOf(jaHira) === -1) revQueries.push(jaHira);
      for (var rq = 0; rq < revQueries.length; rq++) {
        var revList = [];
        try { revList = findReverseMatches(revQueries[rq], 20) || []; } catch (e) { revList = []; }
        for (var r = 0; r < revList.length; r++) {
          var hit = revList[r];
          var rs = (hit.matchType === 'exact' ? SC.REVERSE_EXACT : SC.REVERSE_PREFIX) + SC.REVERSE_BONUS;
          var mini = dict()[hit.zh];
          var entryLike = mini || {
            pinyin: hit.py || '',
            vi: hit.vi || '',
            en: [],
            ja: '',
            hanviet: typeof getWordHanViet === 'function' ? getWordHanViet(hit.zh) : ''
          };
          push(hit.zh, entryLike, {
            score: rs,
            field: 'reverse',
            exact: hit.matchType === 'exact'
          }, 'reverse', { isReverseMatch: true });
        }
      }
    }

    // ---- 2b. Japanese -> Chinese table ----------------------------------
    if (lang === 'ja' || jaHira) {
      var jaZh = lookupJaIndex(ctx);
      var JA_MAP_SCORE = SC.JA_EXACT + 10;
      for (var jz = 0; jz < jaZh.length; jz++) {
        var zhWord = jaZh[jz];
        var jaVal = (typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT) ? JA_COMMON_DICT[zhWord] : '';
        var miniEntry = dict()[zhWord];
        var jaEntry = miniEntry || {
          pinyin: typeof getWordPinyin === 'function' ? getWordPinyin(zhWord) : '',
          vi: '',
          en: [],
          ja: jaVal || '',
          hanviet: typeof getWordHanViet === 'function' ? getWordHanViet(zhWord) : ''
        };
        push(zhWord, jaEntry, { score: JA_MAP_SCORE, field: 'ja', exact: true }, 'ja-common');
      }
    }

    // ---- 3. Definition / pinyin / han-viet scan --------------------------
    if (!isHanzi) {
      var jaHiraN = jaHira ? norm(jaHira) : '';
      for (var n = 0; n < items.length; n++) {
        var item = items[n];

        // Cheap necessary-condition filter: skip ~90% of entries before real scoring.
        // For multi-word queries the entry may sit *inside* the query ("xin lỗi nhé"),
        // so the whole query is not a substring of the blob — probe with the first word.
        var probeWord = ctx.hasSpace ? qN.split(' ')[0] : qN;
        if (item.blob.indexOf(probeWord) === -1 &&
            (!pinyinAllowed || item.py.indexOf(ctx.qCompact) === -1) &&
            (!jaHiraN || item.blob.indexOf(jaHiraN) === -1)) {
          continue;
        }

        var best = null;

        best = pick(best, scoreSenses(item.vi, ctx, {
          exact: SC.VI_EXACT, phrase: SC.VI_PHRASE, prefix: SC.VI_PREFIX,
          token: SC.VI_TOKEN, contains: SC.VI_CONTAINS
        }, 'vi'));
        best = pick(best, scoreEnglish(item, ctx));
        best = pick(best, scoreJapanese(item, ctx));
        best = pick(best, scoreKanjiReadings(item.word, ctx));
        if (pinyinAllowed) best = pick(best, scorePinyin(item, ctx));
        best = pick(best, scoreHanViet(item, ctx));

        if (best) {
          best.score += specificBonus(item.hsk);
          push(item.word, item.entry, best, 'dict', {
            hanviet: item.hvDisplay,
            ja: item.jaDisplay || (item.entry && item.entry.ja) || ''
          });
        }
      }
    }

    // ---- 4. Slang / enrichment data --------------------------------------
    if (opts.includeSlang !== false) {
      var slang = buildSlangIndex(opts.slang);
      for (var si = 0; si < slang.length; si++) {
        var sItem = slang[si];
        if (!sItem) continue;
        var s = sItem.raw;
        var sBest = null;
        var sw = sItem.word;

        if (isHanzi) {
          if (sw === workingQuery) sBest = { score: SC.HANZI_EXACT, field: 'hanzi', exact: true };
          else if (sw.indexOf(workingQuery) === 0) sBest = { score: SC.HANZI_PREFIX, field: 'hanzi', exact: false };
          else if (sw.indexOf(workingQuery) !== -1) sBest = { score: SC.HANZI_CONTAINS, field: 'hanzi', exact: false };
          if (!sBest && sItem.alias) {
            for (var a = 0; a < sItem.alias.length; a++) {
              if (norm(sItem.alias[a]) === qNorm) { sBest = { score: SC.HANZI_EXACT, field: 'hanzi', exact: true }; break; }
            }
          }
        } else {
          sBest = pick(sBest, scoreSenses(sItem.vi, ctx, {
            exact: SC.VI_EXACT, phrase: SC.VI_PHRASE, prefix: SC.VI_PREFIX,
            token: SC.VI_TOKEN, contains: SC.VI_CONTAINS
          }, 'vi'));
          sBest = pick(sBest, scoreEnglish({ en: sItem.en }, ctx));
          sBest = pick(sBest, scoreJapanese({ ja: sItem.ja }, ctx));
          if (pinyinAllowed && sItem.py) sBest = pick(sBest, scorePinyin({ py: sItem.py }, ctx));
        }

        if (sBest) {
          sBest.score += SC.SLANG_BONUS;
          push(sw, {
            pinyin: s.py || '',
            vi: s.vi || '',
            en: s.en,
            ja: s.ja || '',
            hanviet: '',
            type: 'slang',
            isSlang: true
          }, sBest, 'slang', { isSlang: true });
        }
      }
    }

    // ---- 4b. English phrase heads ---------------------------------------
    // "to eat", "very big", "a book" are how learners actually type, but a gloss is
    // stored as "eat" / "big" / "book". Retry the query with the leading function word
    // removed; it never overrides an exact match on the full phrase.
    if (lang === 'latin' || lang === 'pinyin') {
      var variants = [];
      var stripped = qNorm.replace(/^(?:to|a|an|the|very|really|quite|so)\s+/, '');
      if (stripped && stripped !== qNorm) variants.push(stripped);
      var noTo = qNorm.replace(/^to\s+/, '');
      if (noTo && noTo !== qNorm && variants.indexOf(noTo) === -1) variants.push(noTo);
      if (variants.length) {
        var extra = searchEnglishByVariants(variants, ctx);
        for (var ex = 0; ex < extra.length; ex++) {
          var cand = dict()[extra[ex].word];
          if (!cand) continue;
          push(extra[ex].word, cand, extra[ex].scored, 'dict-en');
        }
      }
    }

    // ---- 4c. Extended dictionary (only when the curated one is empty) -----
    var extUsed = 0;
    if (_ext && matches.length < 3 && (isHanzi || lang === 'latin' || lang === 'pinyin')) {
      var extHits = scanExtended(ctx, isHanzi, isHanzi ? workingQuery : qNorm);
      for (var eh = 0; eh < extHits.length; eh++) {
        var hitE = extHits[eh];
        if (byWord[hitE.word]) continue;
        push(hitE.word, hitE.entry, hitE.scored, 'cedict', { ext: true });
        extUsed++;
      }
    }
    // ---- 5. Pinyin demotion ---------------------------------------------
    // Root cause of "ăn" -> 安静/安全/按照: a coincidental pinyin hit must never compete
    // with a real meaning match.
    var pinyinDemoted = false;
    if (strongestDefinition >= 850) {
      pinyinDemoted = true;
      for (var mi = 0; mi < matches.length; mi++) {
        var m = matches[mi];
        if (m.matchField !== 'pinyin') continue;
        m.score = m.score >= SC.PINYIN_EXACT ? SC.PINYIN_EXACT_DEMOTED : 0;
      }
    } else if (lang === 'latin' && bestPinyin >= SC.PINYIN_EXACT && strongestDefinition > 0) {
      for (var mj = 0; mj < matches.length; mj++) {
        if (matches[mj].matchField === 'pinyin' && matches[mj].score >= SC.PINYIN_EXACT) {
          matches[mj].score = SC.VI_TOKEN;
        }
      }
    }

    // ---- 6. Fuzzy / typo pass -------------------------------------------
    var fuzzyCount = 0;
    var shouldFuzzy = opts.fuzzy !== false && !isHanzi && !ctx.hasSpace &&
      qN.length >= 3 && qN.length <= 24 && strongestDefinition < 900;
    if (shouldFuzzy) {
      var maxDist = qN.length <= 5 ? 1 : 2;
      var firstChar = qN.charAt(0);
      for (var fi = 0; fi < items.length && fuzzyCount < 8; fi++) {
        var fItem = items[fi];
        if (byWord[fItem.word]) continue;

        var fScore = 0;
        var viS = fItem.vi;
        for (var vi2 = 0; vi2 < viS.length && !fScore; vi2++) {
          var cand = viS[vi2].nt;
          if (!cand || cand.charAt(0) !== firstChar) continue;
          if (Math.abs(cand.length - qN.length) > 1) continue;
          var d = lev(cand, qN);
          if (d > 0 && d <= maxDist) fScore = SC.FUZZY_BASE - d * SC.FUZZY_PENALTY;
        }
        // Fuzzy matching against English glosses only makes sense for unaccented Latin
        // input. For a toned Vietnamese query ("phở") it produced pure noise (博士).
        if (!fScore && ctx.lang === 'latin') {
          var enS = fItem.en;
          for (var ei = 0; ei < enS.length && !fScore; ei++) {
            var g2 = enS[ei].nt;
            if (!g2 || g2.charAt(0) !== firstChar) continue;
            if (Math.abs(g2.length - qNorm.length) > 1) continue;
            var d2 = lev(g2, qNorm);
            if (d2 > 0 && d2 <= maxDist) fScore = SC.FUZZY_BASE - d2 * SC.FUZZY_PENALTY - 20;
          }
        }
        if (!fScore) continue;
        fuzzyCount++;
        push(fItem.word, fItem.entry, { score: fScore, field: 'fuzzy', exact: false }, 'fuzzy');
      }
    }

    // ---- 7. Tiering + ordering -------------------------------------------
    var final = [];
    var primaryCount = 0;
    var relatedCount = 0;
    var suggestionCount = 0;
    var weak = [];

    for (var ci = 0; ci < matches.length; ci++) {
      var cm = matches[ci];
      if (cm.score <= 0) continue;
      if (cm.score >= PRIMARY_MIN) { cm.tier = 'primary'; primaryCount++; }
      else if (cm.score >= RELATED_MIN) { cm.tier = 'related'; relatedCount++; }
      else { weak.push(cm); continue; }
      final.push(cm);
    }

    // "Did you mean ..." — only when nothing confident was found, so it never competes
    // with a real answer. Fuzzy typo hits are preferred over other weak matches.
    if (!primaryCount) {
      weak.sort(function (a, b) {
        var af = a.matchField === 'fuzzy' ? 0 : 1;
        var bf = b.matchField === 'fuzzy' ? 0 : 1;
        if (af !== bf) return af - bf;
        return b.score - a.score;
      });
      var showSuggestions = weak.slice(0, relatedCount ? 4 : 8);
      for (var wk = 0; wk < showSuggestions.length; wk++) {
        showSuggestions[wk].tier = 'suggestion';
        suggestionCount++;
        final.push(showSuggestions[wk]);
      }
    }

    final.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      if (a.exact !== b.exact) return a.exact ? -1 : 1;
      if (a.word.length !== b.word.length) return a.word.length - b.word.length;
      var ha = typeof a.hsk === 'number' ? a.hsk : 99;
      var hb = typeof b.hsk === 'number' ? b.hsk : 99;
      if (ha !== hb) return ha - hb;
      return a.word < b.word ? -1 : (a.word > b.word ? 1 : 0);
    });

    if (final.length > limit) final = final.slice(0, limit);

    result.matches = final;
    result.stats = {
      total: final.length,
      primary: primaryCount,
      related: relatedCount,
      suggestions: suggestionCount,
      fuzzy: fuzzyCount,
      extUsed: extUsed,
      strongestDefinition: Math.round(strongestDefinition),
      pinyinDemoted: pinyinDemoted,
      ms: t0 ? Math.round((performance.now() - t0) * 100) / 100 : 0
    };
    return result;
  }

  function buildEnGlosses(enRaw) {
    var list = Array.isArray(enRaw) ? enRaw : [enRaw];
    var out = [];
    for (var i = 0; i < list.length && i < MAX_SENSES; i++) {
      var gn = norm(stripParens(list[i]));
      if (!gn) continue;
      var toks = gn.split(' '), lem = [];
      for (var t = 0; t < toks.length; t++) {
        var lt = lemma(toks[t]);
        if (lt) lem.push(lt);
      }
      out.push({ norm: gn, nt: normNoTone(gn), tokens: lem });
    }
    return out;
  }

  function buildJaSenses(jaRaw) {
    var raw = splitRaw(jaRaw);
    var out = [];
    for (var i = 0; i < raw.length; i++) {
      var jn = norm(stripParens(raw[i]));
      if (jn) out.push({ norm: jn, hira: kataToHira(jn) });
    }
    return out;
  }

  // ------------------------------------------------------------- browse mode
  /**
   * Browse / filter the embedded dictionary without a text query.
   * @param {{hsk?:string|number, radicalChars?:string[], limit?:number}} [opts]
   */
  function browseDictionary(opts) {
    opts = opts || {};
    var limit = opts.limit || 80;
    var D = dict();
    var out = [];
    var hsk = opts.hsk == null ? 'all' : opts.hsk;
    var radSet = null;
    if (opts.radicalChars && opts.radicalChars.length) {
      radSet = Object.create(null);
      for (var rc = 0; rc < opts.radicalChars.length; rc++) radSet[opts.radicalChars[rc]] = 1;
    }

    for (var w in D) {
      if (!Object.prototype.hasOwnProperty.call(D, w)) continue;
      var e = D[w];
      if (radSet) {
        var keep = false;
        for (var c = 0; c < w.length; c++) if (radSet[w.charAt(c)]) { keep = true; break; }
        if (!keep) continue;
      }
      if (hsk !== 'all') {
        var lvl = String(e.hsk);
        if (hsk === '7-9') {
          if (!(lvl === '7' || lvl === '8' || lvl === '9' || lvl === '7-9')) continue;
        } else if (lvl !== String(hsk)) {
          continue;
        }
      }
      out.push({
        word: w,
        pinyin: e.pinyin || '',
        vi: e.vi || '',
        en: e.en ? (Array.isArray(e.en) ? e.en : [e.en]) : [],
        ja: e.ja || '',
        hanviet: e.hanviet || '',
        type: e.type || 'word',
        hsk: e.hsk,
        score: 0,
        matchField: 'browse',
        sources: ['dict']
      });
      if (out.length >= limit) break;
    }
    return out;
  }

  // ---------------------------------------------------------------- exports
  var api = {
    searchDictionary: searchDictionary,
    browseDictionary: browseDictionary,
    invalidateIndex: invalidateIndex,
    setExtendedDictionary: setExtendedDictionary,
    SC: SC,
    _internals: {
      norm: norm,
      normNoTone: normNoTone,
      splitRaw: splitRaw,
      lemma: lemma,
      scoreSenses: scoreSenses,
      buildIndex: buildIndex
    }
  };

  if (typeof window !== 'undefined') {
    window.searchDictionary = api.searchDictionary;
    window.browseDictionary = api.browseDictionary;
    window.dictSearchInvalidate = api.invalidateIndex;
    window.dictSetExtendedDictionary = api.setExtendedDictionary;
    window.DICT_SCORING = api;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof globalThis !== 'undefined') globalThis.DICT_SCORING = api;
})();
