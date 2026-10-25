// js/features/dict-search-engine.js - Intelligent Multi-Lingual & Reverse Search Engine
// 100% Client-Side, 0 AI Tokens, Offline-First, Microsecond Execution (~0.005s)
// Features:
// 1. Vietnamese Diacritics & Telex Fault Tolerance (gõ "xin chao", "cam on", "an com", "thay giao" đều tìm ra)
// 2. Japanese Kana & Romaji Normalizer (gõ Hiragana "たべる", Romaji "arigato" đều tìm ra)
// 3. English Lemmatizer & Stemming (gõ "eating", "learned" đều tìm ra "eat", "learn")
// 4. Fuzzy Levenshtein Typo Tolerance (gõ sai chính tả 1 ký tự vẫn tìm ra)
// 5. Automatic Bidirectional Language Routing (VI -> ZH, JA -> ZH, EN -> ZH, ZH -> VI/EN/JA)

// --- 1. Vietnamese Tone & Accent Normalizer ---
const VI_DIACRITICS_MAP = {
  'a': /[àáảãạăắằẳẵặâấầẩẫậ]/g,
  'e': /[èéẻẽẹêếềểễệ]/g,
  'i': /[ìíỉĩị]/g,
  'o': /[òóỏõọôốồổỗộơớờởỡợ]/g,
  'u': /[ùúủũụưứừửữự]/g,
  'y': /[ỳýỷỹỵ]/g,
  'd': /[đ]/g,
  'A': /[ÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ]/g,
  'E': /[ÈÉẺẼẸÊẾỀỂỄỆ]/g,
  'I': /[ÌÍỈĨỊ]/g,
  'O': /[ÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ]/g,
  'U': /[ÙÚỦŨỤƯỨỪỬỮỰ]/g,
  'Y': /[ỲÝỶỸỴ]/g,
  'D': /[Đ]/g,
};

function stripVietnameseTones(str) {
  if (!str) return '';
  let res = String(str);
  for (const [nonTone, regex] of Object.entries(VI_DIACRITICS_MAP)) {
    res = res.replace(regex, nonTone);
  }
  // NFD splits precomposed characters so the combining marks can be removed, but it
  // also decomposes Japanese kana with dakuten/handakuten (ず -> す + U+3099). Those
  // marks are outside U+0300..U+036F, so without re-composing to NFC every kana query
  // containing が/ず/で/ぼ/ぱ no longer matches the dictionary text.
  return res.normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC');
}

function normalizeVietnameseQuery(str) {
  if (!str) return '';
  let q = str.trim().toLowerCase();
  q = q.replace(/^k(?=[aeiouy])/g, 'c'); // e.g. "kảm ơn" -> "cảm ơn"
  return q;
}

// --- 2. Japanese Hiragana, Katakana & Romaji Normalizer ---
const ROMAJI_TO_HIRAGANA = {
  'arigatou': 'ありがとう', 'arigato': 'ありがとう',
  'ohayou': 'おはよう', 'ohayo': 'おはよう',
  'konnichiwa': 'こんにちは', 'konbanwa': 'こんばんは',
  'sayounara': 'さようなら', 'sayonara': 'さようなら',
  'sumimasen': 'すみません', 'gomen': 'ごめん',
  'taberu': 'たべる', 'nomu': 'のむ', 'miru': 'みる', 'kiku': 'きく',
  'iku': 'いく', 'kuru': 'くる', 'kaeru': 'かえる',
  'hanasu': 'はなす', 'kaku': 'かく', 'yomu': 'よむ',
  'benkyou': 'べんきょう', 'shigoto': 'しごと',
  'tomodachi': 'ともだち', 'kazoku': 'かぞく',
  'sensei': 'せんせい', 'gakusei': 'がくせい',
  'nihon': 'にほん', 'chuugoku': 'ちゅうごく',
  'daisuki': 'だいすき', 'suki': 'すき', 'ai': 'あい',
  'oishii': 'おいしい', 'umai': 'うまい',
  'tanoshii': 'たのしい', 'ureshii': 'うれしい',
  'kanashii': 'かなしい', 'tsukareta': 'つかれた',
  'kawaii': 'かわいい', 'kirei': 'きれい',
  'chichi': 'ちち', 'haha': 'はは', 'ani': 'あに', 'ane': 'あね',
  'watashi': 'わたし', 'anata': 'あなた',
  'chizu': 'ちず', 'hon': 'ほん', 'kuruma': 'くるま',
  'densha': 'でんしゃ', 'hikouki': 'ひこうき',
  'kitte': 'きって', 'tegami': 'てがみ', 'denwa': 'でんわ',
};

// Maps common Hiragana verbs/adjectives to their dictionary Kanji
const HIRAGANA_TO_KANJI_MAP = {
  'たべる': '食べる', 'のむ': '飲む', 'みる': '見る', 'きく': '聞く',
  'いく': '行く', 'くる': '来る', 'かえる': '帰る',
  'はなす': '話す', 'かく': '書く', 'よむ': '読む',
  'べんきょう': '勉強', 'しごと': '仕事', 'ともだち': '友達',
  'せんせい': '先生', 'がくせい': '学生', 'すき': '好き',
  'あい': '愛', 'おいしい': '美味しい', 'ありがとう': '感謝',
  'こんにちは': '挨拶', 'さようなら': '別れ', 'かわいい': '可愛い',
  'きれい': '綺麗', 'おおきい': '大きい', 'ちいさい': '小さい',
  'たかい': '高い', 'やすい': '安い', 'あたらしい': '新しい',
  'ふるい': '古い', 'あつい': '暑い', 'さむい': '寒い',
  'くるま': '車', 'でんしゃ': '電車', 'ほん': '本',
  'わたし': '私', 'あなた': '貴方', 'ちち': '父', 'はは': '母',
};

function katakanaToHiragana(str) {
  if (!str) return '';
  // NFC first: a decomposed katakana (e.g. ガ as カ + U+3099) would otherwise leave the
  // voiced mark behind and produce a non-standard hiragana sequence.
  const s = String(str).normalize('NFC');
  return s.replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

function normalizeJapaneseQuery(str) {
  if (!str) return { raw: '', hiragana: '', kanjiEquivalent: '' };
  let q = str.trim().toLowerCase();
  if (ROMAJI_TO_HIRAGANA[q]) {
    q = ROMAJI_TO_HIRAGANA[q];
  }
  const hira = katakanaToHiragana(q);
  return {
    raw: q,
    hiragana: hira,
    kanjiEquivalent: HIRAGANA_TO_KANJI_MAP[hira] || '',
  };
}

// --- 3. English Lemmatizer & Stemming ---
function stemEnglishWord(word) {
  if (!word || word.length <= 3) return word || '';
  let w = word.toLowerCase();
  if (w.endsWith('ing') && w.length > 4) {
    w = w.slice(0, -3);
    // Double consonant check: e.g. runn -> run, swimm -> swim
    if (w.length >= 3 && w[w.length - 1] === w[w.length - 2]) {
      w = w.slice(0, -1);
    }
  } else if (w.endsWith('ed') && w.length > 4) {
    w = w.slice(0, -2);
    if (w.endsWith('i')) w = w.slice(0, -1) + 'y'; // studied -> study
  } else if (w.endsWith('ies') && w.length > 4) {
    w = w.slice(0, -3) + 'y'; // studies -> study
  } else if (w.endsWith('es') && w.length > 4) {
    w = w.slice(0, -2);
  } else if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) {
    w = w.slice(0, -1);
  }
  return w;
}

// --- 4. Levenshtein Distance for Typo Tolerance ---
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// --- 5. Language Detection ---
function detectSearchLanguage(query) {
  if (!query) return 'all';
  const q = query.trim();

  // Contains Chinese Hanzi
  if (/[\u4e00-\u9fff]/.test(q)) {
    return 'zh';
  }

  // Contains Japanese Hiragana or Katakana
  if (/[\u3040-\u30ff]/.test(q)) {
    return 'ja';
  }

  // Contains specific Vietnamese diacritics
  if (/[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(q)) {
    return 'vi';
  }

  // Pinyin with tone marks: ā á ǎ à ē é ě è ī í ǐ ì ō ó ǒ ò ū ú ǔ ù ǖ ǘ ǚ ǜ
  if (/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(q)) {
    return 'pinyin';
  }

  // Check if it's recognizable Romaji
  if (ROMAJI_TO_HIRAGANA[q.toLowerCase()]) {
    return 'ja';
  }

  // If Latin without accents, could be Vietnamese unaccented, English, Pinyin, or Romaji
  return 'latin';
}

function getLanguageBadgeInfo(langCode, query, uiLang = 'vi') {
  const isJa = uiLang === 'ja';
  const isEn = uiLang === 'en';

  switch (langCode) {
    case 'zh':
      return {
        badge: '🇨🇳 中文 → 🇻🇳/🇯🇵/🇬🇧',
        class: 'zh',
        desc: isJa ? '漢字・ピンイン検索' : (isEn ? 'Chinese Hanzi Lookup' : 'Tra chữ Hán & Pinyin')
      };
    case 'vi':
      return {
        badge: '🇻🇳 Tiếng Việt → 🇨🇳 中文',
        class: 'vi',
        desc: isJa ? 'ベトナム語逆引き' : (isEn ? 'Vietnamese Reverse Lookup' : 'Tra ngược tiếng Việt (có dấu)')
      };
    case 'ja':
      return {
        badge: '🇯🇵 日本語 → 🇨🇳 中文',
        class: 'ja',
        desc: isJa ? '日本語逆引き (かな・ローマ字)' : (isEn ? 'Japanese Reverse Lookup' : 'Tra ngược tiếng Nhật (Kana / Romaji)')
      };
    case 'pinyin':
      return {
        badge: '🔤 Pinyin → 🇨🇳 中文',
        class: 'pinyin',
        desc: isJa ? 'ピンイン発音記号検索' : (isEn ? 'Toned Pinyin Lookup' : 'Tra theo phiên âm có dấu')
      };
    default:
      return {
        badge: '🌐 Multi-Lingual → 🇨🇳 中文',
        class: 'multi',
        desc: isJa
          ? '自動認識 (ベトナム語・英語・ピンイン・ローマ字)'
          : (isEn ? 'Auto Smart Routing (Vietnamese, English, Pinyin, Romaji)' : 'Tự động nhận diện (Việt không dấu, Tiếng Anh, Pinyin, Romaji)')
      };
  }
}

// Global & module exports
if (typeof window !== 'undefined') {
  window.stripVietnameseTones = stripVietnameseTones;
  window.normalizeVietnameseQuery = normalizeVietnameseQuery;
  window.katakanaToHiragana = katakanaToHiragana;
  window.normalizeJapaneseQuery = normalizeJapaneseQuery;
  window.stemEnglishWord = stemEnglishWord;
  window.levenshteinDistance = levenshteinDistance;
  window.detectSearchLanguage = detectSearchLanguage;
  window.getLanguageBadgeInfo = getLanguageBadgeInfo;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    stripVietnameseTones,
    normalizeVietnameseQuery,
    normalizeJapaneseQuery,
    katakanaToHiragana,
    stemEnglishWord,
    levenshteinDistance,
    detectSearchLanguage,
    getLanguageBadgeInfo,
  };
}
