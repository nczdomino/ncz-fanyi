// js/data/common-words.js - Curated high-frequency additions to MINI_DICT - Dependencies: js/data/mini-dict.js
//
// Why this file exists:
// The embedded dictionary shipped with 1,481 hand-picked entries and was missing words that
// learners search every day (火, 困, 起床, 知道, 电话, 公司, 生日快乐, 我爱你, 河粉...).
// A correct ranking engine cannot fix a missing entry, so this file fills the most obvious
// gaps without touching the original dataset.
//
// Rules used here:
//   * Simplified characters only (the app targets zh-CN).
//   * Natural Vietnamese first, then English glosses, then the Japanese meaning.
//   * `hsk` is only set when the word really is HSK 1-6 vocabulary; everyday phrases and
//     culture-specific nouns intentionally carry no level so the UI shows no HSK badge.
//   * Nothing is overwritten: an existing MINI_DICT entry always wins.

const COMMON_WORDS = {
  // ---------------------------------------------------------------- thiên nhiên, thời tiết
  "火": { pinyin: "huǒ", en: ["fire"], vi: "lửa", ja: "火", type: "n", hsk: 3 },
  "下雨": { pinyin: "xià yǔ", en: ["to rain", "rainy"], vi: "mưa, trời mưa", ja: "雨が降る", type: "v", hsk: 2 },
  "下雪": { pinyin: "xià xuě", en: ["to snow", "snowy"], vi: "tuyết rơi", ja: "雪が降る", type: "v", hsk: 3 },
  "刮风": { pinyin: "guā fēng", en: ["windy", "the wind blows"], vi: "gió thổi, trời gió", ja: "風が吹く", type: "v", hsk: 4 },
  "星星": { pinyin: "xīng xing", en: ["star"], vi: "ngôi sao", ja: "星", type: "n", hsk: 4 },

  // --------------------------------------------------------------------- cơ thể, sức khỏe
  "困": { pinyin: "kùn", en: ["sleepy", "tired"], vi: "buồn ngủ, mệt", ja: "眠い", type: "adj", hsk: 4 },
  "病": { pinyin: "bìng", en: ["illness", "to be sick"], vi: "bệnh, ốm", ja: "病気", type: "n", hsk: 3 },
  "头疼": { pinyin: "tóu téng", en: ["headache"], vi: "đau đầu", ja: "頭痛", type: "v", hsk: 4 },

  // ------------------------------------------------------------------------ người, gia đình
  "爷爷": { pinyin: "yé ye", en: ["grandfather (paternal)"], vi: "ông nội", ja: "おじいさん", type: "n", hsk: 3 },
  "奶奶": { pinyin: "nǎi nai", en: ["grandmother (paternal)"], vi: "bà nội", ja: "おばあさん", type: "n", hsk: 3 },
  "哥哥": { pinyin: "gē ge", en: ["elder brother"], vi: "anh trai", ja: "兄", type: "n", hsk: 2 },
  "姐姐": { pinyin: "jiě jie", en: ["elder sister"], vi: "chị gái", ja: "姉", type: "n", hsk: 2 },
  "弟弟": { pinyin: "dì di", en: ["younger brother"], vi: "em trai", ja: "弟", type: "n", hsk: 2 },
  "妹妹": { pinyin: "mèi mei", en: ["younger sister"], vi: "em gái", ja: "妹", type: "n", hsk: 2 },
  "丈夫": { pinyin: "zhàng fu", en: ["husband"], vi: "chồng", ja: "夫", type: "n", hsk: 5 },
  "妻子": { pinyin: "qī zi", en: ["wife"], vi: "vợ", ja: "妻", type: "n", hsk: 5 },

  // ------------------------------------------------------------------------- nghề nghiệp
  "警察": { pinyin: "jǐng chá", en: ["police", "police officer"], vi: "cảnh sát", ja: "警察", type: "n", hsk: 4 },
  "律师": { pinyin: "lǜ shī", en: ["lawyer"], vi: "luật sư", ja: "弁護士", type: "n", hsk: 5 },
  "老板": { pinyin: "lǎo bǎn", en: ["boss", "shop owner"], vi: "ông chủ, sếp", ja: "社長、上司", type: "n", hsk: 4 },

  // ------------------------------------------------------------------------- nơi chốn
  "银行": { pinyin: "yín háng", en: ["bank"], vi: "ngân hàng", ja: "銀行", type: "n", hsk: 3 },
  "车站": { pinyin: "chē zhàn", en: ["station", "bus stop"], vi: "bến xe, ga", ja: "駅、バス停", type: "n", hsk: 3 },
  "公司": { pinyin: "gōng sī", en: ["company", "firm"], vi: "công ty", ja: "会社", type: "n", hsk: 4 },
  "酒店": { pinyin: "jiǔ diàn", en: ["hotel"], vi: "khách sạn", ja: "ホテル", type: "n", hsk: 4 },

  // ------------------------------------------------------------------------- giao thông
  "公交车": { pinyin: "gōng jiāo chē", en: ["bus"], vi: "xe buýt", ja: "バス", type: "n", hsk: 3 },
  "自行车": { pinyin: "zì xíng chē", en: ["bicycle", "bike"], vi: "xe đạp", ja: "自転車", type: "n", hsk: 3 },
  "火车": { pinyin: "huǒ chē", en: ["train"], vi: "tàu hỏa", ja: "列車", type: "n", hsk: 2 },
  "电车": { pinyin: "diàn chē", en: ["tram", "electric train"], vi: "tàu điện", ja: "電車", type: "n" },
  "摩托车": { pinyin: "mó tuō chē", en: ["motorcycle", "motorbike"], vi: "xe máy", ja: "バイク", type: "n", hsk: 4 },
  "船": { pinyin: "chuán", en: ["boat", "ship"], vi: "thuyền, tàu", ja: "船", type: "n", hsk: 4 },
  "机票": { pinyin: "jī piào", en: ["plane ticket"], vi: "vé máy bay", ja: "航空券", type: "n", hsk: 4 },

  // ------------------------------------------------------------------------- hành động
  "起床": { pinyin: "qǐ chuáng", en: ["to get up", "get out of bed"], vi: "thức dậy, rời giường", ja: "起きる", type: "v", hsk: 2 },
  "吃饭": { pinyin: "chī fàn", en: ["to eat", "eat a meal"], vi: "ăn cơm, dùng bữa", ja: "ご飯を食べる", type: "v", hsk: 1 },
  "回家": { pinyin: "huí jiā", en: ["to go home", "go home"], vi: "về nhà", ja: "帰る", type: "v", hsk: 2 },
  "上班": { pinyin: "shàng bān", en: ["to go to work"], vi: "đi làm", ja: "出勤する", type: "v", hsk: 2 },
  "下班": { pinyin: "xià bān", en: ["to get off work"], vi: "tan làm", ja: "退勤する", type: "v", hsk: 2 },
  "放假": { pinyin: "fàng jià", en: ["to have a holiday", "be on holiday"], vi: "nghỉ lễ, được nghỉ", ja: "休みになる", type: "v", hsk: 3 },
  "知道": { pinyin: "zhī dào", en: ["to know", "know"], vi: "biết, hiểu", ja: "知る、わかる", type: "v", hsk: 2 },
  "觉得": { pinyin: "jué de", en: ["to feel", "to think"], vi: "cảm thấy, cho rằng", ja: "〜と感じる、〜と思う", type: "v", hsk: 2 },
  "打算": { pinyin: "dǎ suàn", en: ["to plan", "plan"], vi: "dự định, toan tính", ja: "つもり、予定", type: "v", hsk: 3 },
  "讨厌": { pinyin: "tǎo yàn", en: ["to hate", "annoying"], vi: "ghét, đáng ghét", ja: "嫌い、うるさい", type: "v", hsk: 4 },
  "画画": { pinyin: "huà huà", en: ["to draw", "to paint"], vi: "vẽ tranh", ja: "絵を描く", type: "v", hsk: 2 },
  "打电话": { pinyin: "dǎ diàn huà", en: ["to make a phone call"], vi: "gọi điện thoại", ja: "電話をかける", type: "v", hsk: 2 },

  // ------------------------------------------------------------------------- tính từ
  "旧": { pinyin: "jiù", en: ["old", "used"], vi: "cũ, cũ kỹ", ja: "古い", type: "adj", hsk: 3 },
  "脏": { pinyin: "zāng", en: ["dirty"], vi: "bẩn, dơ", ja: "汚い", type: "adj", hsk: 4 },
  "有意思": { pinyin: "yǒu yì si", en: ["interesting", "fun"], vi: "thú vị, hay", ja: "面白い", type: "adj", hsk: 2 },
  "危险": { pinyin: "wēi xiǎn", en: ["dangerous"], vi: "nguy hiểm", ja: "危ない、危険", type: "adj", hsk: 4 },
  "难过": { pinyin: "nán guò", en: ["sad", "unhappy"], vi: "buồn, khó chịu", ja: "悲しい、つらい", type: "adj", hsk: 3 },
  "矮": { pinyin: "ǎi", en: ["short (height)"], vi: "thấp, lùn", ja: "背が低い", type: "adj", hsk: 3 },
  "短": { pinyin: "duǎn", en: ["short (length)"], vi: "ngắn", ja: "短い", type: "adj", hsk: 3 },

  // ------------------------------------------------------------------------- ăn uống
  "电话": { pinyin: "diàn huà", en: ["telephone", "phone call"], vi: "điện thoại", ja: "電話", type: "n", hsk: 2 },
  "啤酒": { pinyin: "pí jiǔ", en: ["beer"], vi: "bia", ja: "ビール", type: "n", hsk: 3 },
  "果汁": { pinyin: "guǒ zhī", en: ["juice"], vi: "nước ép trái cây", ja: "ジュース", type: "n", hsk: 3 },
  "蛋糕": { pinyin: "dàn gāo", en: ["cake"], vi: "bánh kem, bánh ngọt", ja: "ケーキ", type: "n", hsk: 3 },
  "巧克力": { pinyin: "qiǎo kè lì", en: ["chocolate"], vi: "sô-cô-la", ja: "チョコレート", type: "n", hsk: 3 },
  "冰淇淋": { pinyin: "bīng qí lín", en: ["ice cream"], vi: "kem", ja: "アイスクリーム", type: "n" },
  "刀": { pinyin: "dāo", en: ["knife"], vi: "dao", ja: "ナイフ", type: "n", hsk: 4 },
  "叉子": { pinyin: "chā zi", en: ["fork"], vi: "nĩa", ja: "フォーク", type: "n", hsk: 4 },
  "辣椒": { pinyin: "là jiāo", en: ["chili pepper"], vi: "ớt", ja: "唐辛子", type: "n", hsk: 5 },
  "草莓": { pinyin: "cǎo méi", en: ["strawberry"], vi: "dâu tây", ja: "いちご", type: "n", hsk: 4 },
  "橘子": { pinyin: "jú zi", en: ["tangerine", "mandarin"], vi: "quýt", ja: "みかん", type: "n", hsk: 4 },
  "桃子": { pinyin: "táo zi", en: ["peach"], vi: "đào", ja: "桃", type: "n", hsk: 4 },
  "梨": { pinyin: "lí", en: ["pear"], vi: "lê", ja: "梨", type: "n", hsk: 4 },

  // ------------------------------------------------------------------------- giải trí
  "游戏": { pinyin: "yóu xì", en: ["game"], vi: "trò chơi", ja: "ゲーム", type: "n", hsk: 3 },
  "篮球": { pinyin: "lán qiú", en: ["basketball"], vi: "bóng rổ", ja: "バスケットボール", type: "n", hsk: 4 },
  "足球": { pinyin: "zú qiú", en: ["football", "soccer"], vi: "bóng đá", ja: "サッカー", type: "n", hsk: 3 },

  // ------------------------------------------------- ẩm thực & văn hoá Việt Nam / Trung Quốc
  "河粉": { pinyin: "hé fěn", en: ["pho", "rice noodles"], vi: "phở, bánh phở", ja: "フォー", type: "n" },
  "米粉": { pinyin: "mǐ fěn", en: ["rice noodles", "vermicelli"], vi: "bún, bún tươi", ja: "ビーフン", type: "n" },
  "春卷": { pinyin: "chūn juǎn", en: ["spring roll"], vi: "nem rán, chả giò", ja: "春巻き", type: "n" },
  "奥黛": { pinyin: "ào dài", en: ["ao dai (Vietnamese dress)"], vi: "áo dài", ja: "アオザイ", type: "n" },
  "旗袍": { pinyin: "qí páo", en: ["cheongsam", "qipao"], vi: "sườn xám", ja: "チャイナドレス", type: "n" },

  // ------------------------------------------------------------- câu giao tiếp hằng ngày
  "早上好": { pinyin: "zǎo shang hǎo", en: ["good morning"], vi: "chào buổi sáng", ja: "おはようございます", type: "expression" },
  "晚上好": { pinyin: "wǎn shang hǎo", en: ["good evening"], vi: "chào buổi tối", ja: "こんばんは", type: "expression" },
  "晚安": { pinyin: "wǎn ān", en: ["good night"], vi: "chúc ngủ ngon", ja: "おやすみなさい", type: "expression" },
  "生日快乐": { pinyin: "shēng rì kuài lè", en: ["happy birthday"], vi: "chúc mừng sinh nhật", ja: "誕生日おめでとう", type: "expression" },
  "我爱你": { pinyin: "wǒ ài nǐ", en: ["I love you"], vi: "tôi yêu bạn, anh yêu em", ja: "愛してる", type: "expression" },
  "你好吗": { pinyin: "nǐ hǎo ma", en: ["how are you"], vi: "bạn khỏe không", ja: "元気ですか", type: "expression" },
  "我不知道": { pinyin: "wǒ bù zhī dào", en: ["I don't know"], vi: "tôi không biết", ja: "分かりません", type: "expression" },
  "等一下": { pinyin: "děng yī xià", en: ["wait a moment"], vi: "đợi một chút", ja: "ちょっと待って", type: "expression" },
  "帮帮我": { pinyin: "bāng bang wǒ", en: ["help me"], vi: "giúp tôi với", ja: "助けてください", type: "expression" },
  "让我看看": { pinyin: "ràng wǒ kàn kan", en: ["let me see"], vi: "cho tôi xem", ja: "見せてください", type: "expression" },
  "非常感谢": { pinyin: "fēi cháng gǎn xiè", en: ["thank you very much"], vi: "cảm ơn rất nhiều", ja: "どうもありがとうございます", type: "expression" }
};

// Merge without ever replacing an existing curated entry.
(function mergeCommonWords() {
  if (typeof MINI_DICT === 'undefined' || !MINI_DICT) return;
  for (const key in COMMON_WORDS) {
    if (!Object.prototype.hasOwnProperty.call(COMMON_WORDS, key)) continue;
    if (!MINI_DICT[key]) MINI_DICT[key] = COMMON_WORDS[key];
  }
})();

if (typeof window !== 'undefined') window.COMMON_WORDS = COMMON_WORDS;
if (typeof module !== 'undefined' && module.exports) module.exports = { COMMON_WORDS };
