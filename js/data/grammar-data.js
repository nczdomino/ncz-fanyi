/**
 * grammar-data.js
 * 
 * Chinese Grammar Canvas - Stage 1 Curated Core Datasets
 * Designed for visual clarity, interactive Lego builder, and frictionless learning.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var data = factory();
    root.HSK_GRAMMAR_CATALOG = data.HSK_GRAMMAR_CATALOG;
    root.HSK_GRAMMAR_SAMPLES = data.HSK_GRAMMAR_SAMPLES;
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  var HSK_GRAMMAR_CATALOG = [
    {
      id: "hsk1_shi",
      level: "HSK1",
      stage: 1,
      order: 1,
      zh_name: "是",
      formula: "[Chủ ngữ] + 是 + [Danh từ]",
      vi_name: "Câu chữ 是 (A là B)",
      en_name: "The 是 (shì) Sentence (A is B)",
      ja_name: "「是」構文（AはBです）",
      icon: "👤",
      difficulty: 1
    },
    {
      id: "hsk1_you",
      level: "HSK1",
      stage: 1,
      order: 2,
      zh_name: "有 / 没有",
      formula: "[Chủ ngữ] + 有/没有 + [Đồ vật]",
      vi_name: "Có & Không có (有 / 没有)",
      en_name: "Possession with 有 and 没有",
      ja_name: "所有を表す「有／没有」（〜がある／ない）",
      icon: "📦",
      difficulty: 1
    },
    {
      id: "hsk1_zai_location",
      level: "HSK1",
      stage: 1,
      order: 3,
      zh_name: "在 + Nơi chốn + V",
      formula: "[Chủ ngữ] + 在 [Nơi chốn] + [Hành động]",
      vi_name: "Ở đâu làm gì? (在 + Địa điểm + Động từ)",
      en_name: "Doing actions at a location (在 + Place + Verb)",
      ja_name: "「在＋場所＋動詞」（〜で〜をする）",
      icon: "📍",
      difficulty: 1
    },
    {
      id: "hsk1_ma_question",
      level: "HSK1",
      stage: 1,
      order: 4,
      zh_name: "……吗？",
      formula: "[Câu khẳng định] + 吗？",
      vi_name: "Câu hỏi Có/Không với trợ từ 吗",
      en_name: "Yes-No Questions with 吗 (ma)",
      ja_name: "語気助詞「吗」による疑問文",
      icon: "❓",
      difficulty: 1
    },
    {
      id: "hsk1_tai_le",
      level: "HSK1",
      stage: 1,
      order: 5,
      zh_name: "太……了！",
      formula: "太 + [Tính từ] + 了！",
      vi_name: "Cảm thán: Quá... rồi! (太...了)",
      en_name: "Exclamations: Too / Extremely! (太...了)",
      ja_name: "感嘆文「太＋形容詞＋了」（〜すぎる！）",
      icon: "✨",
      difficulty: 1
    }
  ];

  var HSK_GRAMMAR_SAMPLES = [
    // 1. hsk1_shi
    {
      id: "hsk1_shi",
      level: "HSK1",
      zh_name: "是",
      formula: "[S] + 是 / 不是 + [N]",
      localizations: {
        vi: {
          title: "Câu chữ 是 (A là B)",
          quick_rule: "Dùng để giới thiệu danh tính, nghề nghiệp hoặc quốc tịch (A = B).",
          trap_wrong: "她是很漂亮。",
          trap_correct: "她很漂亮。",
          trap_why: "Tiếng Trung không dùng 是 trước tính từ miêu tả thông thường (dùng 很 thay thế)."
        },
        en: {
          title: "The 是 (shì) Sentence (A is B)",
          quick_rule: "Connects two nouns to identify who or what someone is (A = B).",
          trap_wrong: "她是很漂亮。",
          trap_correct: "她很漂亮。",
          trap_why: "In Chinese, standalone adjectives act as verbs with 很 and do NOT use 是."
        },
        ja: {
          title: "「是」構文（AはBです）",
          quick_rule: "主語と名詞を結び、「AはBです」と身分・職業・国籍を紹介する超基本構文です。",
          trap_wrong: "她是很漂亮。",
          trap_correct: "她很漂亮。",
          trap_why: "中国語では形容詞の前に「是」は使えません（「很」を用います）。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🧑 Chủ ngữ", en: "🧑 Subject", ja: "🧑 主語" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "Tôi", en: "I", ja: "私" } },
            { zh: "他", py: "tā", tr: { vi: "Anh ấy", en: "He", ja: "彼" } },
            { zh: "这", py: "zhè", tr: { vi: "Đây", en: "This", ja: "これ" } }
          ]
        },
        {
          slot_label: { vi: "🔗 Từ nối", en: "🔗 Copula", ja: "🔗 繋辞" },
          options: [
            { zh: "是", py: "shì", tr: { vi: "là", en: "is/am", ja: "〜です" } },
            { zh: "不是", py: "bú shì", tr: { vi: "không phải là", en: "is not", ja: "〜ではありません" } }
          ]
        },
        {
          slot_label: { vi: "🏷️ Là ai / Cái gì?", en: "🏷️ Identity", ja: "🏷️ 身分・名称" },
          options: [
            { zh: "学生", py: "xuésheng", tr: { vi: "học sinh", en: "student", ja: "学生" } },
            { zh: "老师", py: "lǎoshī", tr: { vi: "giáo viên", en: "teacher", ja: "先生" } },
            { zh: "中国人", py: "zhōngguórén", tr: { vi: "người Trung Quốc", en: "Chinese", ja: "中国人" } },
            { zh: "汉语书", py: "hànyǔ shū", tr: { vi: "sách tiếng Trung", en: "Chinese book", ja: "中国語の本" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你是学生吗？",
          py: "Nǐ shì xuésheng ma?",
          tr: { vi: "Bạn có phải là học sinh không?", en: "Are you a student?", ja: "あなたは学生ですか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "是的，我是学生。",
          py: "Shì de, wǒ shì xuésheng.",
          tr: { vi: "Đúng vậy, tôi là học sinh.", en: "Yes, I am a student.", ja: "はい、私は学生です。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp các từ thành câu: 'Tôi là giáo viên'",
          en: "Arrange the words to say: 'I am a teacher'",
          ja: "並べ替えて「私は先生です」を作ってください"
        },
        tokens: ["老师", "我", "是"],
        correct_order: ["我", "是", "老师"]
      }
    },

    // 2. hsk1_you
    {
      id: "hsk1_you",
      level: "HSK1",
      zh_name: "有 / 没有",
      formula: "[S] + 有 / 没有 + [O]",
      localizations: {
        vi: {
          title: "Có & Không có (有 / 没有)",
          quick_rule: "Dùng '有' để nói có cái gì. Phủ định bắt buộc là '没有' (tuyệt đối không nói 不有).",
          trap_wrong: "我不有钱。",
          trap_correct: "我没有钱。",
          trap_why: "Phủ định của động từ '有' luôn luôn là '没' hoặc '没有', không bao giờ dùng '不'."
        },
        en: {
          title: "Possession with 有 and 没有",
          quick_rule: "Use '有' (yǒu) to express having something. The negative form is always '没有' (never 不有).",
          trap_wrong: "我不有钱。",
          trap_correct: "我没有钱。",
          trap_why: "The verb '有' can only be negated by '没' or '没有', never by '不'."
        },
        ja: {
          title: "所有を表す「有／没有」（〜がある／ない）",
          quick_rule: "「有」で所有を表し、否定は必ず「没有」を用います（「不有」とは決して言いません）。",
          trap_wrong: "我不有钱。",
          trap_correct: "我没有钱。",
          trap_why: "動詞「有」の否定は必ず「没／没有」を使い、「不」で否定することはできません。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🧑 Ai?", en: "🧑 Who?", ja: "🧑 誰が？" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "Tôi", en: "I", ja: "私" } },
            { zh: "他", py: "tā", tr: { vi: "Anh ấy", en: "He", ja: "彼" } },
            { zh: "朋友", py: "péngyou", tr: { vi: "Bạn bè", en: "Friend", ja: "友達" } }
          ]
        },
        {
          slot_label: { vi: "📦 Có / Không có", en: "📦 Have / Not have", ja: "📦 ある／ない" },
          options: [
            { zh: "有", py: "yǒu", tr: { vi: "có", en: "have", ja: "ある・持っている" } },
            { zh: "没有", py: "méiyǒu", tr: { vi: "không có", en: "do not have", ja: "ない・持っていない" } }
          ]
        },
        {
          slot_label: { vi: "✨ Cái gì?", en: "✨ What?", ja: "✨ 何を？" },
          options: [
            { zh: "时间", py: "shíjiān", tr: { vi: "thời gian", en: "time", ja: "時間" } },
            { zh: "钱", py: "qián", tr: { vi: "tiền", en: "money", ja: "お金" } },
            { zh: "问题", py: "wèntí", tr: { vi: "câu hỏi / vấn đề", en: "question/problem", ja: "質問・問題" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你现在有时间吗？",
          py: "Nǐ xiànzài yǒu shíjiān ma?",
          tr: { vi: "Bây giờ bạn có thời gian không?", en: "Do you have time right now?", ja: "今、時間はありますか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "对不起，我没有时间。",
          py: "Duìbuqǐ, wǒ méiyǒu shíjiān.",
          tr: { vi: "Xin lỗi, tôi không có thời gian.", en: "Sorry, I don't have time.", ja: "すみません、時間がありません。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp các từ thành câu: 'Tôi không có tiền'",
          en: "Arrange the words to say: 'I don't have money'",
          ja: "並べ替えて「私にはお金がありません」を作ってください"
        },
        tokens: ["钱", "我", "没有"],
        correct_order: ["我", "没有", "钱"]
      }
    },

    // 3. hsk1_zai_location
    {
      id: "hsk1_zai_location",
      level: "HSK1",
      zh_name: "在 + Nơi chốn + V",
      formula: "[Chủ ngữ] + 在 [Nơi chốn] + [Hành động]",
      localizations: {
        vi: {
          title: "Ở đâu làm gì? (在 + Địa điểm + Động từ)",
          quick_rule: "Quy tắc vàng: Phải ĐẾN ĐỊA ĐIỂM trước rồi mới LÀM HÀNH ĐỘNG (ngược với tiếng Việt 'học ở trường').",
          trap_wrong: "我看书在学校。",
          trap_correct: "我在学校看书。",
          trap_why: "Trong tiếng Trung, trạng ngữ chỉ nơi chốn (在 + địa điểm) luôn đứng TRƯỚC động từ, không đứng sau."
        },
        en: {
          title: "Doing actions at a location (在 + Place + Verb)",
          quick_rule: "Golden rule: Express the location BEFORE the verb (opposite to English 'I study at school').",
          trap_wrong: "我看书在学校。",
          trap_correct: "我在学校看书。",
          trap_why: "Location phrases with '在' must be placed BEFORE the action verb, not at the end of the sentence."
        },
        ja: {
          title: "「在＋場所＋動詞」（〜で〜をする）",
          quick_rule: "黄金ルール：場所を表す「在＋場所」を必ず動詞の「前」に置きます（日本語と同じ語順です）。",
          trap_wrong: "我看书在学校。",
          trap_correct: "我在学校看书。",
          trap_why: "場所表現「在学校」を動詞の後ろに置くことはできません。必ず動詞の前に置きます。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🧑 Ai?", en: "🧑 Who?", ja: "🧑 誰が？" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "Tôi", en: "I", ja: "私" } },
            { zh: "妈妈", py: "māma", tr: { vi: "Mẹ", en: "Mom", ja: "母" } },
            { zh: "朋友", py: "péngyou", tr: { vi: "Bạn", en: "Friend", ja: "友達" } }
          ]
        },
        {
          slot_label: { vi: "📍 Ở đâu?", en: "📍 Where?", ja: "📍 どこで？" },
          options: [
            { zh: "在家", py: "zài jiā", tr: { vi: "ở nhà", en: "at home", ja: "家で" } },
            { zh: "在学校", py: "zài xuéxiào", tr: { vi: "ở trường", en: "at school", ja: "学校で" } },
            { zh: "在公司", py: "zài gōngsī", tr: { vi: "ở công ty", en: "at company", ja: "会社で" } }
          ]
        },
        {
          slot_label: { vi: "🎬 Làm gì?", en: "🎬 Action?", ja: "🎬 何をする？" },
          options: [
            { zh: "看书", py: "kàn shū", tr: { vi: "đọc sách", en: "read book", ja: "本を読む" } },
            { zh: "睡觉", py: "shuìjiào", tr: { vi: "ngủ", en: "sleep", ja: "寝る" } },
            { zh: "做饭", py: "zuò fàn", tr: { vi: "nấu ăn", en: "cook", ja: "ご飯を作る" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你在哪儿呢？",
          py: "Nǐ zài nǎr ne?",
          tr: { vi: "Bạn đang ở đâu đấy?", en: "Where are you?", ja: "どこにいるの？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我在家看书呢。",
          py: "Wǒ zài jiā kàn shū ne.",
          tr: { vi: "Tôi đang ở nhà đọc sách.", en: "I am reading books at home.", ja: "家で本を読んでいるよ。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Mẹ nấu ăn ở nhà'",
          en: "Arrange the words to say: 'Mom cooks at home'",
          ja: "並べ替えて「母は家で料理をします」を作ってください"
        },
        tokens: ["在家", "做饭", "妈妈"],
        correct_order: ["妈妈", "在家", "做饭"]
      }
    },

    // 4. hsk1_ma_question
    {
      id: "hsk1_ma_question",
      level: "HSK1",
      zh_name: "……吗？",
      formula: "[Câu khẳng định] + 吗？",
      localizations: {
        vi: {
          title: "Câu hỏi Có/Không với trợ từ 吗",
          quick_rule: "Giữ nguyên thứ tự câu khẳng định, chỉ cần thêm chữ '吗' ở cuối là thành câu hỏi.",
          trap_wrong: "你是谁吗？",
          trap_correct: "你是谁？",
          trap_why: "Câu đã có từ để hỏi (như 谁, 什么, 哪儿) thì không được thêm 吗 ở cuối nữa."
        },
        en: {
          title: "Yes-No Questions with 吗 (ma)",
          quick_rule: "Take any normal statement and place '吗' at the end to turn it into a yes-no question.",
          trap_wrong: "你是谁吗？",
          trap_correct: "你是谁？",
          trap_why: "If a sentence already has a question pronoun (who, what, where), do NOT add 吗."
        },
        ja: {
          title: "語気助詞「吗」による疑問文",
          quick_rule: "普通の平叙文の語順のまま、文末に「吗」を添えるだけで「〜ですか？」の疑問文になります。",
          trap_wrong: "你是谁吗？",
          trap_correct: "你是谁？",
          trap_why: "文中に「谁」「什么」「哪儿」などの疑問詞がある文には、「吗」を重ねて使えません。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "💬 Câu kể", en: "💬 Statement", ja: "💬 平叙文" },
          options: [
            { zh: "你好", py: "nǐ hǎo", tr: { vi: "bạn khỏe", en: "you are good", ja: "元気だ" } },
            { zh: "你去", py: "nǐ qù", tr: { vi: "bạn đi", en: "you go", ja: "行く" } },
            { zh: "他喝茶", py: "tā hē chá", tr: { vi: "anh ấy uống trà", en: "he drinks tea", ja: "彼はお茶を飲む" } }
          ]
        },
        {
          slot_label: { vi: "❓ Trợ từ hỏi", en: "❓ Question particle", ja: "❓ 疑問助詞" },
          options: [
            { zh: "吗？", py: "ma?", tr: { vi: "không / à?", en: "?", ja: "〜ですか？" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你好吗？",
          py: "Nǐ hǎo ma?",
          tr: { vi: "Bạn khỏe không?", en: "How are you?", ja: "お元気ですか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我很好，你呢？",
          py: "Wǒ hěn hǎo, nǐ ne?",
          tr: { vi: "Tôi rất khỏe, còn bạn?", en: "I am fine, and you?", ja: "とても元気です、あなたは？" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp thành câu hỏi: 'Bạn đi không?'",
          en: "Arrange the words to ask: 'Are you going?'",
          ja: "並べ替えて「あなたは行きますか？」を作ってください"
        },
        tokens: ["吗", "你", "去"],
        correct_order: ["你", "去", "吗"]
      }
    },

    // 5. hsk1_tai_le
    {
      id: "hsk1_tai_le",
      level: "HSK1",
      zh_name: "太……了！",
      formula: "太 + [Tính từ] + 了！",
      localizations: {
        vi: {
          title: "Cảm thán: Quá... rồi! (太...了)",
          quick_rule: "Kẹp tính từ vào giữa '太' và '了' để thốt lên khen ngợi hoặc than phiền (quá... rồi!).",
          trap_wrong: "太好！",
          trap_correct: "太好了！",
          trap_why: "Cấu trúc cảm thán '太' thường bắt buộc phải có trợ từ '了' ở cuối câu đi kèm."
        },
        en: {
          title: "Exclamations: Too / Extremely! (太...了)",
          quick_rule: "Enclose an adjective between '太' and '了' to express an intense reaction or exclamation.",
          trap_wrong: "太好！",
          trap_correct: "太好了！",
          trap_why: "The exclamation structure '太...' almost always pairs with '了' at the end."
        },
        ja: {
          title: "感嘆文「太＋形容詞＋了」（〜すぎる！）",
          quick_rule: "「太」と「了」で形容詞を挟み込み、「〜すぎる！」「とても〜だ！」と感情を込めて感嘆します。",
          trap_wrong: "太好！",
          trap_correct: "太好了！",
          trap_why: "「太」を用いた感嘆文では、文末の「了」とセットで用いるのが原則です。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "✨ Tiền tố cảm thán", en: "✨ Prefix", ja: "✨ 感嘆接頭詞" },
          options: [
            { zh: "太", py: "tài", tr: { vi: "quá / cực kỳ", en: "too / so", ja: "あまりに・とても" } }
          ]
        },
        {
          slot_label: { vi: "🎨 Tính từ", en: "🎨 Adjective", ja: "🎨 形容詞" },
          options: [
            { zh: "好", py: "hǎo", tr: { vi: "tốt / hay", en: "good", ja: "良い" } },
            { zh: "贵", py: "guì", tr: { vi: "đắt", en: "expensive", ja: "高い" } },
            { zh: "热", py: "rè", tr: { vi: "nóng", en: "hot", ja: "暑い" } },
            { zh: "累", py: "lèi", tr: { vi: "mệt", en: "tired", ja: "疲れた" } }
          ]
        },
        {
          slot_label: { vi: "🎉 Hậu tố cảm thán", en: "🎉 Particle", ja: "🎉 感嘆語気詞" },
          options: [
            { zh: "了！", py: "le!", tr: { vi: "rồi!", en: "!", ja: "〜だ！" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "这个汉语词典多少钱？",
          py: "Zhège hànyǔ cídiǎn duōshao qián?",
          tr: { vi: "Cuốn từ điển tiếng Trung này bao nhiêu tiền?", en: "How much is this Chinese dictionary?", ja: "この中国語辞典はいくらですか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "二百块。太贵了！",
          py: "Èrbǎi kuài. Tài guì le!",
          tr: { vi: "200 tệ. Đắt quá rồi!", en: "200 RMB. Too expensive!", ja: "200元です。高すぎます！" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp thành câu cảm thán: 'Tốt quá rồi!'",
          en: "Arrange the words to say: 'That's great!'",
          ja: "並べ替えて「素晴らしすぎる！」を作ってください"
        },
        tokens: ["了", "好", "太"],
        correct_order: ["太", "好", "了"]
      }
    }
  ];

  return {
    HSK_GRAMMAR_CATALOG: HSK_GRAMMAR_CATALOG,
    HSK_GRAMMAR_SAMPLES: HSK_GRAMMAR_SAMPLES
  };
});
