// js/features/nlp.js - Word segmentation, pinyin, phonetic mapping, and slang dictionary - Dependencies: js/core/storage.js, js/data/mini-dict.js, js/data/han-viet.js, js/data/kanji-data.js, js/data/slang-data.js

// Remote slang dictionary cache in localStorage
function enrichLoadRemoteSlang() {
  if (ENRICH.loaded) return;
  ENRICH.loaded = true;
  try {
    const c = JSON.parse(localStorage.getItem('cr_slang_remote') || 'null');
    if (c && Array.isArray(c.items)) ENRICH.remote = c.items;
  } catch (e) {}
  rebuildSlangMap();
}

function rebuildSlangMap() {
  SLANG_MAP = {};
  const all = (ENRICH.remote || []).concat(SLANG_BUILTIN || []);
  for (const it of all) {
    if (!it || !it.w) continue;
    const entry = {
      word: it.w,
      pinyin: it.py || '',
      vi: it.vi || '',
      en: it.en ? (Array.isArray(it.en) ? it.en : [it.en]) : [],
      ja: it.ja || '',
      type: 'slang',
      isSlang: true,
      alias: it.alias || []
    };
    SLANG_MAP[String(it.w).toLowerCase()] = entry;
    if (it.alias && Array.isArray(it.alias)) {
      for (const al of it.alias) {
        if (al) SLANG_MAP[String(al).toLowerCase()] = entry;
      }
    }
  }
}

function getSlangEntry(word) {
  if (!word) return null;
  if (!SLANG_MAP || Object.keys(SLANG_MAP).length === 0) rebuildSlangMap();
  return SLANG_MAP[String(word).toLowerCase()] || null;
}

// --- Module: Word Segmentation & Tokenization ---
function segmentSentence(text) {
  if (!text) return [];
  const userDict = getUserDict();

  function isKnownPhrase(w) {
    if (MINI_DICT[w]) return true;
    if (getSlangEntry(w)) return true;
    if (userDict['vi:' + w] || userDict['en:' + w] || userDict['ja:' + w]) return true;
    return false;
  }

  let tokens = [];
  // Use Intl.Segmenter if supported
  if ('Segmenter' in Intl) {
    try {
      const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
      tokens = [...segmenter.segment(text)].map(s => s.segment);
    } catch (e) {
      console.warn('Intl.Segmenter fallback', e);
    }
  }

  // Fallback: Greedy Forward Match
  if (!tokens || tokens.length === 0) {
    let i = 0;
    const maxLen = 8;
    while (i < text.length) {
      let matched = null;
      for (let l = maxLen; l >= 1; l--) {
        if (i + l <= text.length) {
          const sub = text.slice(i, i + l);
          if (isKnownPhrase(sub)) {
            matched = sub;
            break;
          }
        }
      }
      if (matched) {
        tokens.push(matched);
        i += matched.length;
      } else {
        tokens.push(text[i]);
        i += 1;
      }
    }
    return tokens;
  }

  // Post-processing: Ghép các từ đơn/mảnh nhỏ thành thành ngữ / tiếng lóng / cụm từ tùy chỉnh
  const merged = [];
  let idx = 0;
  while (idx < tokens.length) {
    let combined = null;
    let consumeCount = 1;
    // Thử ghép 5, 4, 3, 2 token liền kề nếu tạo thành thành ngữ hoặc cụm từ đã biết
    for (let count = Math.min(5, tokens.length - idx); count >= 2; count--) {
      const candidate = tokens.slice(idx, idx + count).join('');
      if (isKnownPhrase(candidate)) {
        combined = candidate;
        consumeCount = count;
        break;
      }
    }
    if (combined) {
      merged.push(combined);
      idx += consumeCount;
    } else {
      merged.push(tokens[idx]);
      idx += 1;
    }
  }
  return merged;
}

// --- Module: Pinyin & Phonetics ---
function getWordPinyin(word) {
  if (!word) return '';
  const sl = getSlangEntry(word);
  if (sl && sl.pinyin) return sl.pinyin;
  // Check if pinyin-pro is loaded on window
  if (window.pinyinPro && typeof window.pinyinPro.pinyin === 'function') {
    try {
      return window.pinyinPro.pinyin(word, { toneType: 'symbol' });
    } catch (e) {}
  }
  // Check embedded dictionary
  if (MINI_DICT[word] && MINI_DICT[word].pinyin) {
    return MINI_DICT[word].pinyin;
  }
  // Check single characters in dictionary
  const parts = [];
  for (const ch of word) {
    if (MINI_DICT[ch] && MINI_DICT[ch].pinyin) {
      parts.push(MINI_DICT[ch].pinyin);
    } else {
      parts.push(ch);
    }
  }
  return parts.join(' ');
}

function getWordHanViet(word) {
  if (!word) return '';
  if (MINI_DICT[word] && MINI_DICT[word].hanviet) {
    return MINI_DICT[word].hanviet;
  }
  const parts = [];
  for (const ch of word) {
    parts.push(HAN_VIET[ch] || '');
  }
  const filtered = parts.filter(Boolean);
  return filtered.length > 0 ? filtered.join(' ') : '';
}

function getWordKanji(word) {
  if (!word) return null;
  for (const ch of word) {
    if (KANJI_DATA[ch]) return KANJI_DATA[ch];
  }
  return null;
}
