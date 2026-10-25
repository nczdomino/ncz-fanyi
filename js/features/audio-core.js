// js/features/audio-core.js - Pure logic for the speech pipeline (no DOM, no network)
// Dependencies: none
//
// Why this module exists:
//   * tts.js used to send `clean.slice(0, 300)` to the URL engines, so any text longer
//     than 300 characters was silently truncated — a whole paragraph played only its
//     first 300 characters.
//   * There was no chunking at all, and Chrome's speechSynthesis drops long utterances
//     after roughly 15 seconds, so long sentences were cut short on the system engine too.
//   * Engine selection was buried inside speakText(), which made it impossible to test
//     and impossible to keep consistent between the two playback paths.
//
// Everything here is synchronous and side-effect free, so it can be unit tested in Node.

(function () {
  'use strict';

  // ~13-15 s of speech at normal rate: short enough to dodge Chrome's utterance cutoff
  // and to give pause/resume sensible granularity.
  var CHUNK_MAX = 60;

  var SENTENCE_END = /[。！？!?；;…\n\r]/;
  var SOFT_BREAK = /[，、,：:—–\s]/;

  function normalizeSpeechText(text) {
    return String(text == null ? '' : text)
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Split into sentences, keeping the terminating punctuation.
   * Written without a lookbehind regex so it also runs on older Safari.
   */
  function splitSentences(text) {
    var src = normalizeSpeechText(text);
    if (!src) return [];
    var out = [];
    var start = 0;
    for (var i = 0; i < src.length; i++) {
      if (!SENTENCE_END.test(src.charAt(i))) continue;
      // Swallow a run of closing punctuation/quotes, e.g. ！」 or …」
      var end = i + 1;
      while (end < src.length && /[」』）)】》"]/.test(src.charAt(end))) end++;
      var piece = src.slice(start, end).trim();
      if (piece) out.push(piece);
      start = end;
      i = end - 1;
    }
    var tail = src.slice(start).trim();
    if (tail) out.push(tail);
    return out;
  }

  /** Split one over-long sentence on soft breaks, then hard-split whatever is left. */
  function splitLongSentence(sentence, maxLen) {
    var out = [];
    var buf = '';
    var pieces = [];
    var cur = '';
    for (var i = 0; i < sentence.length; i++) {
      var ch = sentence.charAt(i);
      cur += ch;
      if (SOFT_BREAK.test(ch)) {
        pieces.push(cur);
        cur = '';
      }
    }
    if (cur) pieces.push(cur);
    if (!pieces.length) pieces = [sentence];

    for (var p = 0; p < pieces.length; p++) {
      var piece = pieces[p];
      while (piece.length > maxLen) {
        out.push(piece.slice(0, maxLen));
        piece = piece.slice(maxLen);
      }
      if (!piece) continue;
      if ((buf + piece).length > maxLen && buf) {
        out.push(buf);
        buf = piece;
      } else {
        buf += piece;
      }
    }
    if (buf.trim()) out.push(buf);
    return out.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  /**
   * Break text into speakable chunks.
   * @param {string} text
   * @param {number} [maxLen]
   * @returns {string[]}
   */
  function chunkText(text, maxLen) {
    var max = maxLen && maxLen > 4 ? maxLen : CHUNK_MAX;
    var src = normalizeSpeechText(text);
    if (!src) return [];
    if (src.length <= max) return [src];

    var sentences = splitSentences(src);
    var chunks = [];
    var buf = '';

    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i];
      if (sentence.length > max) {
        if (buf) { chunks.push(buf.trim()); buf = ''; }
        var parts = splitLongSentence(sentence, max);
        for (var p = 0; p < parts.length; p++) chunks.push(parts[p]);
        continue;
      }
      if ((buf + sentence).length > max && buf) {
        chunks.push(buf.trim());
        buf = sentence;
      } else {
        buf += sentence;
      }
    }
    if (buf.trim()) chunks.push(buf.trim());
    return chunks.filter(Boolean);
  }

  /**
   * Ordered list of engines to try for a chunk.
   *
   * @param {{engine?:string, online?:boolean, hasNeuralVoice?:boolean, saveData?:boolean,
   *          textLength?:number}} opts
   * @returns {string[]} subset of ['youdao','baidu','google','system']
   */
  function buildEnginePlan(opts) {
    var o = opts || {};
    var engine = o.engine || 'auto';
    var online = o.online !== false;

    if (engine === 'system') return ['system'];
    if (engine === 'youdao') return online ? ['youdao', 'baidu', 'system'] : ['system'];
    if (engine === 'baidu') return online ? ['baidu', 'youdao', 'system'] : ['system'];
    if (engine === 'google') return online ? ['google', 'baidu', 'system'] : ['system'];

    // auto
    if (!online) return ['system'];                       // network engines are useless offline
    var len = o.textLength || 0;

    // Data Saver: a local voice costs nothing and is instant.
    if (o.saveData) {
      return o.hasNeuralVoice ? ['system', 'youdao'] : ['youdao', 'system'];
    }
    if (len <= 6) return ['youdao', 'baidu', 'google', 'system'];
    if (o.hasNeuralVoice) return ['system', 'baidu', 'google'];
    return ['baidu', 'google', 'youdao', 'system'];
  }

  /** URL for a network TTS engine, or '' for the system engine. */
  function buildAudioUrl(engine, text, speed) {
    var clean = normalizeSpeechText(text);
    if (!clean) return '';
    var encoded = encodeURIComponent(clean);
    var rate = typeof speed === 'number' && speed > 0 ? speed : 1.0;
    var isSlow = rate < 0.9;
    if (engine === 'youdao') {
      return 'https://dict.youdao.com/dictvoice?audio=' + encoded + '&le=zh';
    }
    if (engine === 'baidu') {
      var spd = isSlow ? 4 : (rate > 1.1 ? 6 : 5);
      return 'https://fanyi.baidu.com/gettts?lan=zh&text=' + encoded + '&spd=' + spd + '&source=web';
    }
    if (engine === 'google') {
      return 'https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=' + encoded +
        (isSlow ? '&ttsspeed=0.24' : '');
    }
    return '';
  }

  /** Cache key for remembering which engine worked for a given text. */
  function engineMemoKey(text) {
    var clean = normalizeSpeechText(text);
    return clean.length + ':' + clean.slice(0, 12);
  }

  var api = {
    CHUNK_MAX: CHUNK_MAX,
    normalizeSpeechText: normalizeSpeechText,
    splitSentences: splitSentences,
    splitLongSentence: splitLongSentence,
    chunkText: chunkText,
    buildEnginePlan: buildEnginePlan,
    buildAudioUrl: buildAudioUrl,
    engineMemoKey: engineMemoKey,
  };

  if (typeof window !== 'undefined') window.AUDIO_CORE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof globalThis !== 'undefined') globalThis.AUDIO_CORE = api;
})();
