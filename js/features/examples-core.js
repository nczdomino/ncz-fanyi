// js/features/examples-core.js - Pure logic for choosing and ranking example sentences
// Dependencies: none (the caller passes a HSK lookup function)
//
// Why this module exists
//   The old selector matched "all the characters appear anywhere in the sentence", which
//   produced 107 dictionary words with an example that did not contain the word at all
//   (好吃 shown with "吃好", 多少 with "减少…多…"). It also returned the first two
//   sentences in file order, so every word always showed the same examples.
//
// Everything here is synchronous and side-effect free so it can be unit tested.

(function () {
  'use strict';

  var CJK = /[\u4e00-\u9fff]/;

  /** True when the sentence really contains the word as a contiguous string. */
  function containsWord(zh, word) {
    if (!zh || !word) return false;
    return String(zh).indexOf(String(word)) !== -1;
  }

  function cjkTokens(zh, segment) {
    var text = String(zh || '');
    if (!text) return [];
    if (segment) {
      try {
        return segment(text).filter(function (t) { return CJK.test(t); });
      } catch (e) { /* fall through to characters */ }
    }
    return text.split('').filter(function (ch) { return CJK.test(ch); });
  }

  /**
   * Rough HSK difficulty of a sentence: the highest HSK level among its known words.
   * Unknown words are ignored rather than counted as hard, which keeps sentences with
   * names or rare characters from being pushed to "advanced".
   * @param {string} zh
   * @param {function(string):(number|undefined)} lookupHsk
   * @param {function(string):string[]} [segment] word segmenter
   * @returns {number} 0 when nothing is known
   */
  function estimateDifficulty(zh, lookupHsk, segment) {
    if (!zh || typeof lookupHsk !== 'function') return 0;
    var tokens = cjkTokens(zh, segment);
    var max = 0;
    for (var i = 0; i < tokens.length; i++) {
      var h = lookupHsk(tokens[i]);
      if (typeof h === 'number' && h > max) max = h;
    }
    return max;
  }

  function difficultyBucket(level) {
    if (!level) return 'unknown';
    if (level <= 2) return 'beginner';
    if (level <= 4) return 'intermediate';
    return 'advanced';
  }

  var TRANSLATION_STOPWORDS = {
    a: 1, an: 1, the: 1, to: 1, of: 1, in: 1, on: 1, at: 1, for: 1, and: 1, or: 1,
    is: 1, are: 1, be: 1, it: 1, this: 1, that: 1, with: 1, as: 1, by: 1,
    la: 1, le: 1, les: 1, un: 1, une: 1, des: 1, et: 1, en: 1, du: 1, de: 1,
    cua: 1, va: 1, thi: 1, la: 1, mot: 1, nhung: 1, cho: 1, voi: 1,
  };

  function translationTokens(text) {
    if (!text) return [];
    var out = [];
    var parts = String(text).toLowerCase().split(/[^a-z0-9\u00c0-\u024f\u1e00-\u1eff]+/);
    for (var i = 0; i < parts.length; i++) {
      var t = parts[i];
      if (!t || t.length < 2) continue;
      if (TRANSLATION_STOPWORDS[t]) continue;
      out.push(t);
    }
    return out;
  }

  /**
   * How much an example's translation overlaps the meaning the user is currently looking
   * at. Used to prefer the example that illustrates the sense on screen.
   * @returns {number} 0..1
   */
  function senseOverlap(translation, senseText) {
    var sense = translationTokens(senseText);
    if (!sense.length) return 0;
    var trans = translationTokens(translation);
    if (!trans.length) return 0;
    var seen = Object.create(null);
    for (var i = 0; i < trans.length; i++) seen[trans[i]] = 1;
    var hit = 0;
    for (var j = 0; j < sense.length; j++) {
      if (seen[sense[j]]) hit++;
    }
    return Math.min(1, hit / sense.length);
  }

  /**
   * Score one example. Higher is better.
   * @param {{zh:string, vi?:string, ja?:string, en?:string}} item
   * @param {string} word
   * @param {{lookupHsk?:Function, segment?:Function, senseText?:string, lang?:string}} [opts]
   * @returns {number} -Infinity when the sentence does not contain the word
   */
  function scoreExample(item, word, opts) {
    var o = opts || {};
    var zh = item && item.zh ? String(item.zh) : '';
    if (!containsWord(zh, word)) return -Infinity;

    var idx = zh.indexOf(word);
    var len = zh.length;
    var score = 100;

    // The word should be visible in context, not dangling at an edge.
    if (idx > 0 && idx + word.length < len) score += 15;
    else if (idx === 0) score -= 8;
    else score -= 4;

    // One screen line, one breath. Very long sentences lose outright: a short easy
    // sentence is a better dictionary example than a long one with the word mid-sentence.
    if (len >= 8 && len <= 20) score += 20;
    else if (len <= 26) score += 5;
    else score -= 20;
    if (len < 8) score -= 5;

    // Translations matter: a sentence already translated into the user's language avoids
    // a machine-translation round trip. Tatoeba has almost no Vietnamese pairs, so this
    // keeps the hand-curated trilingual corpus in front for Vietnamese users.
    if (item.vi) score += 5;
    if (item.ja) score += 4;
    if (item.en) score += 3;
    if (item.vi && item.ja && item.en) score += 8;
    var lang = o.lang || 'vi';
    if (item[lang]) score += 10;

    // Slightly prefer human-written corpora over scraped / machine memories.
    score += sourceRank(item) / 20;

    // Easier sentences first; anything above HSK 2 loses ground quickly.
    var level = estimateDifficulty(zh, o.lookupHsk, o.segment);
    if (level > 2) score -= (level - 2) * 12;

    // Prefer the example that illustrates the sense currently on screen.
    if (o.senseText) {
      score += Math.round(senseOverlap(item[lang], o.senseText) * 30);
    }

    // Quoted or exclamatory fragments make poor dictionary examples.
    if (/^[「『""'']/.test(zh)) score -= 6;
    if (!/[。！？!?]$/.test(zh)) score -= 3;

    return score;
  }

  /**
   * Filter to examples that really contain the word, dedupe by text, and sort by score.
   * @returns {Array<object>} items annotated with `_score` and `_level`
   */
  function rankExamples(list, word, opts) {
    var o = opts || {};
    var out = [];
    var seen = Object.create(null);
    for (var i = 0; i < (list || []).length; i++) {
      var item = list[i];
      if (!item || !item.zh) continue;
      if (!containsWord(item.zh, word)) continue;
      if (seen[item.zh]) continue;
      seen[item.zh] = 1;
      var score = scoreExample(item, word, o);
      if (score === -Infinity) continue;
      out.push({
        zh: item.zh,
        pinyin: item.pinyin,
        vi: item.vi,
        ja: item.ja,
        en: item.en,
        source: item.source,
        isContext: item.isContext,
        _score: score,
        _level: estimateDifficulty(item.zh, o.lookupHsk, o.segment),
      });
    }
    out.sort(function (a, b) {
      if (b._score !== a._score) return b._score - a._score;
      return a.zh.length - b.zh.length;
    });
    return out;
  }

  /**
   * Pick `n` examples with variety: different word positions and different lengths, so the
   * learner sees the word used in more than one way.
   * @param {Array<object>} ranked  output of rankExamples
   * @param {number} n
   * @param {string} word
   * @param {number} [rotate=0]  shift the window to vary results between openings
   */
  function pickDiverse(ranked, n, word, rotate) {
    var limit = Math.max(0, n | 0);
    if (!limit) return [];
    var pool = (ranked || []).slice();
    if (!pool.length) return [];
    var offset = ((rotate || 0) % pool.length + pool.length) % pool.length;
    if (offset > 0) pool = pool.slice(offset).concat(pool.slice(0, offset));

    function positionOf(item) {
      var idx = String(item.zh || '').indexOf(String(word || ''));
      if (idx < 0) return 'none';
      if (idx === 0) return 'start';
      if (idx + String(word).length >= item.zh.length) return 'end';
      return 'mid';
    }
    function lengthOf(item) {
      var len = String(item.zh || '').length;
      return len <= 14 ? 'short' : (len <= 24 ? 'medium' : 'long');
    }

    var chosen = [];
    var used = Object.create(null);

    // First pass: one example per (length, position) bucket.
    for (var i = 0; i < pool.length && chosen.length < limit; i++) {
      var key = lengthOf(pool[i]) + '|' + positionOf(pool[i]);
      if (used[key]) continue;
      used[key] = 1;
      chosen.push(pool[i]);
    }
    // Second pass: fill the remainder in rank order.
    for (var j = 0; j < pool.length && chosen.length < limit; j++) {
      if (chosen.indexOf(pool[j]) === -1) chosen.push(pool[j]);
    }
    return chosen.slice(0, limit);
  }

  /**
   * Quality gate for a sentence coming from an online source.
   * Machine-translation memories and scraped corpora produce a lot of noise.
   */
  function isUsableOnlineExample(item, word) {
    if (!item || !item.zh) return false;
    var zh = String(item.zh).trim();
    if (!containsWord(zh, word)) return false;
    if (zh.length < 4 || zh.length > 60) return false;
    if (!CJK.test(zh)) return false;
    // Mixed Latin inside a Chinese sentence is usually a parsing artefact.
    if (/[A-Za-z]{3,}/.test(zh)) return false;
    // A "sentence" that is just the word (possibly repeated) teaches nothing.
    if (zh.replace(/\s/g, '') === String(word)) return false;
    if (zh.split(word).join('').length < 2) return false;
    return true;
  }

  /** Source priority: human-written corpora first, machine translation memory last. */
  var SOURCE_RANK = { context: 100, corpus: 90, tatoeba: 80, wiktionary: 60, jukuu: 40, mymemory: 20 };

  function sourceRank(item) {
    if (!item) return 0;
    var key = String(item.source || '').toLowerCase();
    for (var k in SOURCE_RANK) {
      if (key.indexOf(k) !== -1) return SOURCE_RANK[k];
    }
    return item.isContext ? SOURCE_RANK.context : 30;
  }

  var api = {
    containsWord: containsWord,
    estimateDifficulty: estimateDifficulty,
    difficultyBucket: difficultyBucket,
    senseOverlap: senseOverlap,
    scoreExample: scoreExample,
    rankExamples: rankExamples,
    pickDiverse: pickDiverse,
    isUsableOnlineExample: isUsableOnlineExample,
    sourceRank: sourceRank,
    translationTokens: translationTokens,
  };

  if (typeof window !== 'undefined') window.EXAMPLES_CORE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof globalThis !== 'undefined') globalThis.EXAMPLES_CORE = api;
})();
