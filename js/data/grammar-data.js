/**
 * grammar-data.js
 * 
 * Chinese Grammar Canvas - Multi-Stage Curated Interactive Datasets
 * Stage 1: Sinh tồn & Giao tiếp nền tảng (HSK 1 - 5 cấu trúc)
 * Stage 2: Trật tự thời gian & Phương thức hành động (HSK 1 - 5 cấu trúc)
 * Stage 3: Trạng thái & So sánh thực tế (HSK 2 - 5 cấu trúc)
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
    // --- STAGE 1: Sinh tồn & Giao tiếp nền tảng ---
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
      vi_name: "Ở đâu làm gì? (在 + Nơi chốn + Động từ)",
      en_name: "Actions at a location (在 + Place + Verb)",
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
    },

    // --- STAGE 2: Trật tự thời gian & Phương thức hành động ---
    {
      id: "hsk1_time_order",
      level: "HSK1",
      stage: 2,
      order: 6,
      zh_name: "时间 + 动作",
      formula: "[Chủ ngữ] + [Thời gian] + [Hành động]",
      vi_name: "Khi nào làm gì? (Thời gian trước hành động)",
      en_name: "Time before Verb word order",
      ja_name: "時間詞の位置（時間の後に動作）",
      icon: "⏰",
      difficulty: 1
    },
    {
      id: "hsk1_gen_with",
      level: "HSK1",
      stage: 2,
      order: 7,
      zh_name: "跟……一起 + V",
      formula: "[Chủ ngữ] + 跟 [Người] + 一起 + [Hành động]",
      vi_name: "Cùng ai làm gì? (跟 / 和 + Người + Động từ)",
      en_name: "Doing actions with someone (跟 / 和 + Someone + Verb)",
      ja_name: "「跟／和＋人＋一起＋動詞」（〜と一緒に〜する）",
      icon: "🤝",
      difficulty: 1
    },
    {
      id: "hsk1_ne_question",
      level: "HSK1",
      stage: 2,
      order: 8,
      zh_name: "……呢？",
      formula: "[Người / Đồ vật] + 呢？",
      vi_name: "Câu hỏi tỉnh lược (Còn... thì sao? / ...đâu rồi?)",
      en_name: "Elliptical follow-up questions with 呢 (ne)",
      ja_name: "省略疑問文を作る「呢」（〜は？）",
      icon: "💬",
      difficulty: 1
    },
    {
      id: "hsk1_hui_ability",
      level: "HSK1",
      stage: 2,
      order: 9,
      zh_name: "会 + V",
      formula: "[Chủ ngữ] + 会 / 不会 + [Kỹ năng]",
      vi_name: "Diễn tả kỹ năng học mới biết (会 + Động từ)",
      en_name: "Learned skills and abilities with 会 (huì)",
      ja_name: "習得能力を表す「会」（〜できる）",
      icon: "🧠",
      difficulty: 1
    },
    {
      id: "hsk1_de_possessive",
      level: "HSK1",
      stage: 2,
      order: 10,
      zh_name: "……的 + N",
      formula: "[Chủ sở hữu / Tính chất] + 的 + [Danh từ]",
      vi_name: "Sở hữu & Bổ nghĩa danh từ (...的 + Danh từ)",
      en_name: "Possession and modification with 的 (de)",
      ja_name: "修飾・所有の構造助詞「的」（〜の…）",
      icon: "🏷️",
      difficulty: 1
    },

    // --- STAGE 3: Trạng thái & So sánh thực tế (HSK 2) ---
    {
      id: "hsk2_guo_experience",
      level: "HSK2",
      stage: 3,
      order: 11,
      zh_name: "V + 过",
      formula: "[Chủ ngữ] + 没/没有 + [V] + 过 + [Tân ngữ]",
      vi_name: "Đã từng làm việc gì (Động từ + 过)",
      en_name: "Past experience with particle 过 (guò)",
      ja_name: "経験を表すアスペクト助詞「过」（〜したことがある）",
      icon: "🚀",
      difficulty: 2
    },
    {
      id: "hsk2_bi_comparison",
      level: "HSK2",
      stage: 3,
      order: 12,
      zh_name: "A + 比 + B + Adj",
      formula: "[A] + 比 + [B] + [Tính từ]",
      vi_name: "Câu so sánh hơn với chữ 比 (A hơn B)",
      en_name: "Comparisons using 比 (bǐ - A is more than B)",
      ja_name: "「比」を用いた比較文（AはBより〜）",
      icon: "⚖️",
      difficulty: 2
    },
    {
      id: "hsk2_zhe_state",
      level: "HSK2",
      stage: 3,
      order: 13,
      zh_name: "V + 着",
      formula: "[Chủ ngữ / Nơi chốn] + [V] + 着",
      vi_name: "Trạng thái đang duy trì (Động từ + 着)",
      en_name: "Continuous state particle 着 (zhe)",
      ja_name: "状態の持続を表す「着」（〜している／〜てある）",
      icon: "🚪",
      difficulty: 2
    },
    {
      id: "hsk2_kuai_le",
      level: "HSK2",
      stage: 3,
      order: 14,
      zh_name: "快要……了！",
      formula: "[Chủ ngữ] + 快要 + [Hành động] + 了！",
      vi_name: "Sắp sửa diễn ra (快要...了 / 要...了)",
      en_name: "Imminent actions: About to happen! (快要...了)",
      ja_name: "近未来を表す「快要…了」（もうすぐ〜する）",
      icon: "⚡",
      difficulty: 2
    },
    {
      id: "hsk2_yue_lai_yue",
      level: "HSK2",
      stage: 3,
      order: 15,
      zh_name: "越来越 + Adj",
      formula: "[Sự vật] + 越来越 + [Tính từ]",
      vi_name: "Càng ngày càng... (越来越 + Tính từ)",
      en_name: "More and more with 越来越 (yuèláiyuè)",
      ja_name: "漸進を表す「越来越…」（ますます〜）",
      icon: "📈",
      difficulty: 2
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
          title: "Ở đâu làm gì? (在 + Nơi chốn + Động từ)",
          quick_rule: "Quy tắc vàng: Phải ĐẾN ĐỊA ĐIỂM trước rồi mới LÀM HÀNH ĐỘNG (ngược với tiếng Việt 'học ở trường').",
          trap_wrong: "我看书在学校。",
          trap_correct: "我在学校看书。",
          trap_why: "Trong tiếng Trung, trạng ngữ chỉ nơi chốn (在 + địa điểm) luôn đứng TRƯỚC động từ, không đứng sau."
        },
        en: {
          title: "Actions at a location (在 + Place + Verb)",
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
    },

    // --- STAGE 2 SAMPLES ---
    // 6. hsk1_time_order
    {
      id: "hsk1_time_order",
      level: "HSK1",
      zh_name: "时间 + 动作",
      formula: "[Chủ ngữ] + [Thời gian] + [Hành động]",
      localizations: {
        vi: {
          title: "Khi nào làm gì? (Thời gian trước hành động)",
          quick_rule: "Quy tắc vàng: Thời gian luôn đặt TRƯỚC hành động (ngược với tiếng Việt 'tôi đi ngủ lúc 10h' -> tiếng Trung 'tôi 10h đi ngủ').",
          trap_wrong: "我去学校早上八点。",
          trap_correct: "我早上八点去学校。",
          trap_why: "Từ chỉ thời gian tuyệt đối không đứng ở cuối câu sau động từ trong tiếng Trung."
        },
        en: {
          title: "Time before Verb word order",
          quick_rule: "Golden Rule: Time phrases must come BEFORE the action verb (opposite to English 'I go to bed at 10 PM').",
          trap_wrong: "我去学校早上八点。",
          trap_correct: "我早上八点去学校。",
          trap_why: "In Chinese, time expressions can never be tacked on at the end after the verb."
        },
        ja: {
          title: "時間詞の位置（時間の後に動作）",
          quick_rule: "時間詞は必ず動詞の「前」に置きます（日本語と同じで『私は8時に学校へ行く』の語順です）。",
          trap_wrong: "我去学校早上八点。",
          trap_correct: "我早上八点去学校。",
          trap_why: "時間表現を動詞の後に置くことはできません。必ず動詞の前に置きます。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🧑 Ai?", en: "🧑 Who?", ja: "🧑 誰が？" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "Tôi", en: "I", ja: "私" } },
            { zh: "他", py: "tā", tr: { vi: "Anh ấy", en: "He", ja: "彼" } },
            { zh: "老师", py: "lǎoshī", tr: { vi: "Thầy giáo", en: "Teacher", ja: "先生" } }
          ]
        },
        {
          slot_label: { vi: "⏰ Khi nào?", en: "⏰ When?", ja: "⏰ いつ？" },
          options: [
            { zh: "早上八点", py: "zǎoshang bā diǎn", tr: { vi: "8h sáng", en: "8 AM", ja: "朝8時" } },
            { zh: "明天", py: "míngtiān", tr: { vi: "ngày mai", en: "tomorrow", ja: "明日" } },
            { zh: "星期天", py: "xīngqītiān", tr: { vi: "chủ nhật", en: "Sunday", ja: "日曜日" } }
          ]
        },
        {
          slot_label: { vi: "🎬 Làm gì?", en: "🎬 Action?", ja: "🎬 何をする？" },
          options: [
            { zh: "去学校", py: "qù xuéxiào", tr: { vi: "đến trường", en: "go to school", ja: "学校へ行く" } },
            { zh: "去北京", py: "qù Běijīng", tr: { vi: "đi Bắc Kinh", en: "go to Beijing", ja: "北京へ行く" } },
            { zh: "买东西", py: "mǎi dōngxi", tr: { vi: "mua sắm", en: "go shopping", ja: "買い物する" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你明天去哪儿？",
          py: "Nǐ míngtiān qù nǎr?",
          tr: { vi: "Ngày mai bạn đi đâu?", en: "Where are you going tomorrow?", ja: "明日はどこへ行きますか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我明天去北京。",
          py: "Wǒ míngtiān qù Běijīng.",
          tr: { vi: "Ngày mai tôi đi Bắc Kinh.", en: "I am going to Beijing tomorrow.", ja: "明日、北京へ行きます。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Tôi ngày mai đi Bắc Kinh'",
          en: "Arrange the words to say: 'I go to Beijing tomorrow'",
          ja: "並べ替えて「私は明日北京へ行きます」を作ってください"
        },
        tokens: ["去北京", "明天", "我"],
        correct_order: ["我", "明天", "去北京"]
      }
    },

    // 7. hsk1_gen_with
    {
      id: "hsk1_gen_with",
      level: "HSK1",
      zh_name: "跟……一起 + V",
      formula: "[Chủ ngữ] + 跟 [Người] + 一起 + [Hành động]",
      localizations: {
        vi: {
          title: "Cùng ai làm gì? (跟 / 和 + Người + Động từ)",
          quick_rule: "Phải nói 'Cùng ai' trước rồi mới nói 'Làm gì' (ngược với tiếng Việt 'tôi xem phim với bạn').",
          trap_wrong: "我看电影跟朋友。",
          trap_correct: "我跟朋友看电影。",
          trap_why: "Cụm giới từ chỉ đối tượng (跟/和 + người) luôn đứng TRƯỚC động từ."
        },
        en: {
          title: "Doing actions with someone (跟 / 和 + Someone + Verb)",
          quick_rule: "Express 'with whom' BEFORE the action verb (opposite to English 'I watch movies with my friend').",
          trap_wrong: "我看电影跟朋友。",
          trap_correct: "我跟朋友看电影。",
          trap_why: "Prepositional phrases with 跟/和 must precede the verb."
        },
        ja: {
          title: "「跟／和＋人＋一起＋動詞」（〜と一緒に〜する）",
          quick_rule: "「誰と一緒に」を表す言葉を動詞の「前」に置きます（日本語と同じ語順です）。",
          trap_wrong: "我看电影跟朋友。",
          trap_correct: "我跟朋友看电影。",
          trap_why: "「跟朋友」を動詞の後ろに置くことはできません。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🧑 Ai?", en: "🧑 Who?", ja: "🧑 誰が？" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "Tôi", en: "I", ja: "私" } },
            { zh: "妹妹", py: "mèimei", tr: { vi: "Em gái", en: "Younger sister", ja: "妹" } },
            { zh: "大卫", py: "Dàwèi", tr: { vi: "David", en: "David", ja: "デイビッド" } }
          ]
        },
        {
          slot_label: { vi: "🤝 Cùng ai?", en: "🤝 With whom?", ja: "🤝 誰と？" },
          options: [
            { zh: "跟朋友", py: "gēn péngyou", tr: { vi: "cùng bạn", en: "with friends", ja: "友達と" } },
            { zh: "跟妈妈", py: "gēn māma", tr: { vi: "cùng mẹ", en: "with mom", ja: "母と" } },
            { zh: "跟老师", py: "gēn lǎoshī", tr: { vi: "cùng thầy", en: "with teacher", ja: "先生と" } }
          ]
        },
        {
          slot_label: { vi: "🎬 Làm gì?", en: "🎬 Action?", ja: "🎬 何をする？" },
          options: [
            { zh: "看电影", py: "kàn diànyǐng", tr: { vi: "xem phim", en: "watch movies", ja: "映画を見る" } },
            { zh: "去超市", py: "qù chāoshì", tr: { vi: "đi siêu thị", en: "go to supermarket", ja: "スーパーに行く" } },
            { zh: "学汉语", py: "xué hànyǔ", tr: { vi: "học tiếng Trung", en: "study Chinese", ja: "中国語を学ぶ" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你今天跟谁看电影？",
          py: "Nǐ jīntiān gēn shéi kàn diànyǐng?",
          tr: { vi: "Hôm nay bạn xem phim cùng ai?", en: "Who are you watching movies with today?", ja: "今日、誰と映画を見るの？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我跟朋友看电影。",
          py: "Wǒ gēn péngyou kàn diànyǐng.",
          tr: { vi: "Tôi xem phim cùng bạn.", en: "I am watching movies with my friend.", ja: "友達と映画を見るよ。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Tôi xem phim cùng bạn'",
          en: "Arrange the words to say: 'I watch movies with my friend'",
          ja: "並べ替えて「私は友達と映画を見ます」を作ってください"
        },
        tokens: ["看电影", "我", "跟朋友"],
        correct_order: ["我", "跟朋友", "看电影"]
      }
    },

    // 8. hsk1_ne_question
    {
      id: "hsk1_ne_question",
      level: "HSK1",
      zh_name: "……呢？",
      formula: "[Người / Đồ vật] + 呢？",
      localizations: {
        vi: {
          title: "Câu hỏi tỉnh lược (Còn... thì sao? / ...đâu rồi?)",
          quick_rule: "Dùng để hỏi tiếp ý vừa nhắc: 'Còn... thì sao?' hoặc hỏi vị trí '...đâu rồi?'.",
          trap_wrong: "你呢好吗？",
          trap_correct: "你呢？",
          trap_why: "Chữ 呢 đã tự mang nghĩa câu hỏi tỉnh lược hoàn chỉnh, không ghép thêm tính từ hay trợ từ 吗."
        },
        en: {
          title: "Elliptical follow-up questions with 呢 (ne)",
          quick_rule: "Ask 'How about...?' or 'Where is...?' simply by placing 呢 after a noun or pronoun.",
          trap_wrong: "你呢好吗？",
          trap_correct: "你呢？",
          trap_why: "呢 already forms a complete bounce-back question; do not attach other question words."
        },
        ja: {
          title: "省略疑問文を作る「呢」（〜は？）",
          quick_rule: "名詞や代名詞の後に「呢」を添えるだけで、「〜は？」「〜はどこ？」と簡潔に問い返せます。",
          trap_wrong: "你呢好吗？",
          trap_correct: "你呢？",
          trap_why: "「你呢？」だけで完全な質問文なので、余計な言葉を後ろに付け足してはいけません。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "💬 Vế hỏi", en: "💬 Target", ja: "💬 対象" },
          options: [
            { zh: "我很好，你", py: "Wǒ hěn hǎo, nǐ", tr: { vi: "Tôi rất khỏe, còn bạn", en: "I'm fine, how about you", ja: "元気です、あなたは" } },
            { zh: "我的手机", py: "wǒ de shǒujī", tr: { vi: "Điện thoại của tôi", en: "my phone", ja: "私の携帯" } },
            { zh: "你的书", py: "nǐ de shū", tr: { vi: "Sách của bạn", en: "your book", ja: "あなたの本" } }
          ]
        },
        {
          slot_label: { vi: "❓ Trợ từ 呢", en: "❓ Particle", ja: "❓ 助詞" },
          options: [
            { zh: "呢？", py: "ne?", tr: { vi: "thì sao? / đâu rồi?", en: "?", ja: "は？" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "我是越南人，你呢？",
          py: "Wǒ shì Yuènánrén, nǐ ne?",
          tr: { vi: "Tôi là người Việt Nam, còn bạn?", en: "I am Vietnamese, and you?", ja: "私はベトナム人です、あなたは？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我是中国人。",
          py: "Wǒ shì Zhōngguórén.",
          tr: { vi: "Tôi là người Trung Quốc.", en: "I am Chinese.", ja: "私は中国人です。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Ghép câu hỏi: 'Điện thoại của tôi đâu rồi?'",
          en: "Arrange the words to ask: 'Where is my phone?'",
          ja: "並べ替えて「私の携帯はどこ？」を作ってください"
        },
        tokens: ["呢？", "我的", "手机"],
        correct_order: ["我的", "手机", "呢？"]
      }
    },

    // 9. hsk1_hui_ability
    {
      id: "hsk1_hui_ability",
      level: "HSK1",
      zh_name: "会 + V",
      formula: "[Chủ ngữ] + 会 / 不会 + [Kỹ năng]",
      localizations: {
        vi: {
          title: "Diễn tả kỹ năng học mới biết (会 + Động từ)",
          quick_rule: "Dùng '会' khi diễn tả kỹ năng phải qua học hỏi, tập luyện mới biết làm (nói tiếng Trung, lái xe, nấu ăn).",
          trap_wrong: "我能说汉语。(chỉ khả năng hoàn cảnh)",
          trap_correct: "我会说汉语。(học mới biết)",
          trap_why: "Để nói về kỹ năng tiếp thu qua học tập, tiếng Trung luôn dùng '会'."
        },
        en: {
          title: "Learned skills and abilities with 会 (huì)",
          quick_rule: "Use '会' to express skills acquired through practice or study (speaking a language, driving, cooking).",
          trap_wrong: "我能说汉语。",
          trap_correct: "我会说汉语。",
          trap_why: "Skills learned through study require '会', not '能'."
        },
        ja: {
          title: "習得能力を表す「会」（〜できる）",
          quick_rule: "学習や訓練を通して習得したスキル（外国語、料理、運転など）には「会」を用います。",
          trap_wrong: "我能说汉语。",
          trap_correct: "我会说汉语。",
          trap_why: "勉強して身につけた能力には「能」ではなく必ず「会」を使います。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🧑 Ai?", en: "🧑 Who?", ja: "🧑 誰が？" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "Tôi", en: "I", ja: "私" } },
            { zh: "他", py: "tā", tr: { vi: "Anh ấy", en: "He", ja: "彼" } },
            { zh: "朋友", py: "péngyou", tr: { vi: "Bạn tôi", en: "Friend", ja: "友達" } }
          ]
        },
        {
          slot_label: { vi: "🧠 Biết / Không biết", en: "🧠 Can / Cannot", ja: "🧠 できる／できない" },
          options: [
            { zh: "会", py: "huì", tr: { vi: "biết", en: "can", ja: "できる" } },
            { zh: "不会", py: "bú huì", tr: { vi: "không biết", en: "cannot", ja: "できない" } }
          ]
        },
        {
          slot_label: { vi: "🎯 Kỹ năng gì?", en: "🎯 Skill?", ja: "🎯 どんな特技？" },
          options: [
            { zh: "说汉语", py: "shuō hànyǔ", tr: { vi: "nói tiếng Trung", en: "speak Chinese", ja: "中国語を話す" } },
            { zh: "开汽车", py: "kāi qìchē", tr: { vi: "lái ô tô", en: "drive a car", ja: "車を運転する" } },
            { zh: "做中国菜", py: "zuò zhōngguócài", tr: { vi: "nấu món Trung", en: "cook Chinese food", ja: "中華料理を作る" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你会说汉语吗？",
          py: "Nǐ huì shuō hànyǔ ma?",
          tr: { vi: "Bạn biết nói tiếng Trung không?", en: "Can you speak Chinese?", ja: "中国語を話せますか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我会说一点儿。",
          py: "Wǒ huì shuō yìdiǎnr.",
          tr: { vi: "Tôi biết nói một chút.", en: "I can speak a little.", ja: "少し話せます。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Tôi biết nói tiếng Trung'",
          en: "Arrange the words to say: 'I can speak Chinese'",
          ja: "並べ替えて「私は中国語を話せます」を作ってください"
        },
        tokens: ["说汉语", "我", "会"],
        correct_order: ["我", "会", "说汉语"]
      }
    },

    // 10. hsk1_de_possessive
    {
      id: "hsk1_de_possessive",
      level: "HSK1",
      zh_name: "……的 + N",
      formula: "[Chủ sở hữu / Tính chất] + 的 + [Danh từ]",
      localizations: {
        vi: {
          title: "Sở hữu & Bổ nghĩa danh từ (...的 + Danh từ)",
          quick_rule: "Cái gì của ai hoặc tính chất bổ nghĩa cho đồ vật thì đặt '的' ở giữa (Ngược trật tự tiếng Việt: A của B -> B 的 A).",
          trap_wrong: "书我的。",
          trap_correct: "我的书。",
          trap_why: "Người sở hữu hoặc phần bổ nghĩa luôn đứng TRƯỚC danh từ chính."
        },
        en: {
          title: "Possession and modification with 的 (de)",
          quick_rule: "Attach '的' between the owner/modifier and the noun (Owner + 的 + Noun).",
          trap_wrong: "书我的。",
          trap_correct: "我的书。",
          trap_why: "The modifier/owner must come BEFORE the noun it modifies."
        },
        ja: {
          title: "修飾・所有の構造助詞「的」（〜の…）",
          quick_rule: "所有者や修飾語の後ろに「的」を置き、名詞を修飾します（日本語の「私の本」と同じ語順です）。",
          trap_wrong: "书我的。",
          trap_correct: "我的书。",
          trap_why: "所有者は必ず名詞の前に置きます。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "👤 Người sở hữu", en: "👤 Owner", ja: "👤 所有者" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "tôi", en: "my", ja: "私" } },
            { zh: "爸爸", py: "bàba", tr: { vi: "bố", en: "dad's", ja: "父" } },
            { zh: "红", py: "hóng", tr: { vi: "màu đỏ", en: "red", ja: "赤い" } }
          ]
        },
        {
          slot_label: { vi: "🔗 Trợ từ 的", en: "🔗 Particle 的", ja: "🔗 助詞「的」" },
          options: [
            { zh: "的", py: "de", tr: { vi: "của", en: "of / 's", ja: "の" } }
          ]
        },
        {
          slot_label: { vi: "📦 Đồ vật", en: "📦 Noun", ja: "📦 名詞" },
          options: [
            { zh: "书", py: "shū", tr: { vi: "sách", en: "book", ja: "本" } },
            { zh: "电脑", py: "diànnǎo", tr: { vi: "máy tính", en: "computer", ja: "パソコン" } },
            { zh: "衣服", py: "yīfu", tr: { vi: "quần áo", en: "clothes", ja: "服" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "这是谁的电脑？",
          py: "Zhè shì shéi de diànnǎo?",
          tr: { vi: "Đây là máy tính của ai?", en: "Whose computer is this?", ja: "これは誰のパソコンですか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "这是爸爸的电脑。",
          py: "Zhè shì bàba de diànnǎo.",
          tr: { vi: "Đây là máy tính của bố.", en: "This is dad's computer.", ja: "これは父のパソコンです。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp cụm từ: 'Máy tính của bố'",
          en: "Arrange the words to say: 'Dad's computer'",
          ja: "並べ替えて「父のパソコン」を作ってください"
        },
        tokens: ["的", "电脑", "爸爸"],
        correct_order: ["爸爸", "的", "电脑"]
      }
    },

    // --- STAGE 3 SAMPLES ---
    // 11. hsk2_guo_experience
    {
      id: "hsk2_guo_experience",
      level: "HSK2",
      zh_name: "V + 过",
      formula: "[Chủ ngữ] + 没/没有 + [V] + 过 + [Tân ngữ]",
      localizations: {
        vi: {
          title: "Đã từng làm việc gì (Động từ + 过)",
          quick_rule: "Đặt '过' sau động từ để nói đã từng làm gì. Phủ định là '没/没有...过' (chưa từng).",
          trap_wrong: "我不去过北京。",
          trap_correct: "我没去过北京。",
          trap_why: "Phủ định của trải nghiệm '过' luôn dùng '没' hoặc '没有', không dùng '不'."
        },
        en: {
          title: "Past experience with particle 过 (guò)",
          quick_rule: "Place '过' right after the verb to express having experienced something. Negate with 没/没有.",
          trap_wrong: "我不去过北京。",
          trap_correct: "我没去过北京。",
          trap_why: "Past experience with 过 must be negated with 没/没有, never 不."
        },
        ja: {
          title: "経験を表すアスペクト助詞「过」（〜したことがある）",
          quick_rule: "動詞の後ろに「过」を付けて「〜したことがある」と経験を述べます。否定は必ず「没／没有」を用います。",
          trap_wrong: "我不去过北京。",
          trap_correct: "我没去过北京。",
          trap_why: "経験の「过」を否定するときは「不」ではなく必ず「没／没有」を用います。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🧑 Ai?", en: "🧑 Who?", ja: "🧑 誰が？" },
          options: [
            { zh: "我", py: "wǒ", tr: { vi: "Tôi", en: "I", ja: "私" } },
            { zh: "他", py: "tā", tr: { vi: "Anh ấy", en: "He", ja: "彼" } }
          ]
        },
        {
          slot_label: { vi: "🚀 Đã từng / Chưa từng", en: "🚀 Experienced?", ja: "🚀 経験の有無" },
          options: [
            { zh: "去过", py: "qù guo", tr: { vi: "từng đi", en: "have been to", ja: "行ったことがある" } },
            { zh: "没去过", py: "méi qù guo", tr: { vi: "chưa từng đi", en: "have never been to", ja: "行ったことがない" } },
            { zh: "吃过", py: "chī guo", tr: { vi: "từng ăn", en: "have eaten", ja: "食べたことがある" } }
          ]
        },
        {
          slot_label: { vi: "✨ Nơi / Món gì?", en: "✨ Place / Food?", ja: "✨ どこ／何を？" },
          options: [
            { zh: "北京", py: "Běijīng", tr: { vi: "Bắc Kinh", en: "Beijing", ja: "北京" } },
            { zh: "中国菜", py: "zhōngguócài", tr: { vi: "món Trung", en: "Chinese food", ja: "中華料理" } },
            { zh: "烤鸭", py: "kǎoyā", tr: { vi: "vịt quay", en: "roast duck", ja: "北京ダック" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你去过中国吗？",
          py: "Nǐ qù guo Zhōngguó ma?",
          tr: { vi: "Bạn từng đi Trung Quốc chưa?", en: "Have you been to China?", ja: "中国へ行ったことがありますか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我去过两次。",
          py: "Wǒ qù guo liǎng cì.",
          tr: { vi: "Tôi từng đi hai lần rồi.", en: "I have been there twice.", ja: "2回行ったことがあります。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Tôi từng ăn vịt quay'",
          en: "Arrange the words to say: 'I have eaten roast duck'",
          ja: "並べ替えて「私は北京ダックを食べたことがあります」を作ってください"
        },
        tokens: ["烤鸭", "吃过", "我"],
        correct_order: ["我", "吃过", "烤鸭"]
      }
    },

    // 12. hsk2_bi_comparison
    {
      id: "hsk2_bi_comparison",
      level: "HSK2",
      zh_name: "A + 比 + B + Adj",
      formula: "[A] + 比 + [B] + [Tính từ]",
      localizations: {
        vi: {
          title: "Câu so sánh hơn với chữ 比 (A hơn B)",
          quick_rule: "Dùng '比' để nói A hơn B. Quy tắc sống còn: Cấm dùng 很/非常 trước tính từ!",
          trap_wrong: "他比我很忙。",
          trap_correct: "他比我忙。",
          trap_why: "Trong câu so sánh '比', trước tính từ không dùng phó từ mức độ như 很, 非常."
        },
        en: {
          title: "Comparisons using 比 (bǐ - A is more than B)",
          quick_rule: "Use '比' to compare two entities. Critical rule: Degree adverbs like 很/非常 cannot precede the adjective!",
          trap_wrong: "他比我很忙。",
          trap_correct: "他比我忙。",
          trap_why: "In 比 comparisons, degree adverbs like 很 or 非常 are strictly forbidden before the adjective."
        },
        ja: {
          title: "「比」を用いた比較文（AはBより〜）",
          quick_rule: "「比」を用いて「AはBより〜だ」と比べます。形容詞の前に「很」「非常」などの程度副詞を置いてはいけません！",
          trap_wrong: "他比我很忙。",
          trap_correct: "他比我忙。",
          trap_why: "「比」構文では形容詞の前に「很」や「非常」を置くことはできません。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🅰️ Đối tượng A", en: "🅰️ Item A", ja: "🅰️ 主体A" },
          options: [
            { zh: "今天", py: "jīntiān", tr: { vi: "hôm nay", en: "today", ja: "今日" } },
            { zh: "哥哥", py: "gēge", tr: { vi: "anh trai", en: "older brother", ja: "兄" } },
            { zh: "西瓜", py: "xīguā", tr: { vi: "dưa hấu", en: "watermelon", ja: "スイカ" } }
          ]
        },
        {
          slot_label: { vi: "⚖️ So với (比)", en: "⚖️ Compared to", ja: "⚖️ 〜より（比）" },
          options: [
            { zh: "比", py: "bǐ", tr: { vi: "hơn / so với", en: "than", ja: "より" } }
          ]
        },
        {
          slot_label: { vi: "🅱️ Đối tượng B", en: "🅱️ Item B", ja: "🅱️ 比較対象B" },
          options: [
            { zh: "昨天", py: "zuótiān", tr: { vi: "hôm qua", en: "yesterday", ja: "昨日" } },
            { zh: "我", py: "wǒ", tr: { vi: "tôi", en: "me", ja: "私" } },
            { zh: "苹果", py: "píngguǒ", tr: { vi: "táo", en: "apple", ja: "リンゴ" } }
          ]
        },
        {
          slot_label: { vi: "🎨 Tính từ", en: "🎨 Adjective", ja: "🎨 性質" },
          options: [
            { zh: "冷", py: "lěng", tr: { vi: "lạnh", en: "cold", ja: "寒い" } },
            { zh: "高", py: "gāo", tr: { vi: "cao", en: "tall", ja: "背が高い" } },
            { zh: "贵", py: "guì", tr: { vi: "đắt", en: "expensive", ja: "高い" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "今天冷不冷？",
          py: "Jīntiān lěng bu lěng?",
          tr: { vi: "Hôm nay có lạnh không?", en: "Is it cold today?", ja: "今日寒くない？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "今天比昨天冷多了。",
          py: "Jīntiān bǐ zuótiān lěng duō le.",
          tr: { vi: "Hôm nay lạnh hơn hôm qua nhiều.", en: "Today is much colder than yesterday.", ja: "今日の方が昨日よりずっと寒いよ。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Anh trai cao hơn tôi'",
          en: "Arrange the words to say: 'Older brother is taller than me'",
          ja: "並べ替えて「兄は私より背が高い」を作ってください"
        },
        tokens: ["我", "哥哥", "比", "高"],
        correct_order: ["哥哥", "比", "我", "高"]
      }
    },

    // 13. hsk2_zhe_state
    {
      id: "hsk2_zhe_state",
      level: "HSK2",
      zh_name: "V + 着",
      formula: "[Chủ ngữ / Nơi chốn] + [V] + 着",
      localizations: {
        vi: {
          title: "Trạng thái đang duy trì (Động từ + 着)",
          quick_rule: "Diễn tả một trạng thái tĩnh đang duy trì liên tục (cửa đang mở, áo đang mặc, sách đang cầm).",
          trap_wrong: "他写着汉字在。",
          trap_correct: "门开着呢。",
          trap_why: "Trợ từ 着 đứng ngay sát sau động từ để biểu thị trạng thái duy trì."
        },
        en: {
          title: "Continuous state particle 着 (zhe)",
          quick_rule: "Attach '着' directly after a verb to express an ongoing static state (door is open, wearing clothes).",
          trap_wrong: "他写着汉字在。",
          trap_correct: "门开着呢。",
          trap_why: "The aspect particle 着 must directly follow the verb, indicating an ongoing state."
        },
        ja: {
          title: "状態の持続を表す「着」（〜している／〜てある）",
          quick_rule: "動詞の直後に「着」を添え、「ドアが開いている」「服を着ている」など状態の持続を表します。",
          trap_wrong: "他写着汉字在。",
          trap_correct: "门开着呢。",
          trap_why: "「着」は必ず動詞の直後に置きます。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "🚪 Sự vật", en: "🚪 Subject", ja: "🚪 主体" },
          options: [
            { zh: "门", py: "mén", tr: { vi: "Cửa", en: "Door", ja: "ドア" } },
            { zh: "窗户", py: "chuānghu", tr: { vi: "Cửa sổ", en: "Window", ja: "窓" } },
            { zh: "老师", py: "lǎoshī", tr: { vi: "Thầy giáo", en: "Teacher", ja: "先生" } }
          ]
        },
        {
          slot_label: { vi: "🔄 Trạng thái (V + 着)", en: "🔄 State", ja: "🔄 状態（V＋着）" },
          options: [
            { zh: "开着", py: "kāi zhe", tr: { vi: "đang mở", en: "is open", ja: "開いている" } },
            { zh: "关着", py: "guān zhe", tr: { vi: "đang đóng", en: "is closed", ja: "閉まっている" } },
            { zh: "笑着", py: "xiào zhe", tr: { vi: "đang mỉm cười", en: "is smiling", ja: "笑っている" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "教室的门开着吗？",
          py: "Jiàoshì de mén kāi zhe ma?",
          tr: { vi: "Cửa phòng học có đang mở không?", en: "Is the classroom door open?", ja: "教室のドアは開いていますか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "门开着呢，请进吧。",
          py: "Mén kāi zhe ne, qǐng jìn ba.",
          tr: { vi: "Cửa đang mở đấy, xin mời vào.", en: "The door is open, please come in.", ja: "開いていますよ、どうぞお入りください。" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Cửa đang mở'",
          en: "Arrange the words to say: 'The door is open'",
          ja: "並べ替えて「ドアが開いています」を作ってください"
        },
        tokens: ["着", "门", "开"],
        correct_order: ["门", "开", "着"]
      }
    },

    // 14. hsk2_kuai_le
    {
      id: "hsk2_kuai_le",
      level: "HSK2",
      zh_name: "快要……了！",
      formula: "[Chủ ngữ] + 快要 + [Hành động] + 了！",
      localizations: {
        vi: {
          title: "Sắp sửa diễn ra (快要...了 / 要...了)",
          quick_rule: "Diễn tả hành động sắp xảy ra trong chốc lát ('sắp... rồi!').",
          trap_wrong: "快要下雨昨天。",
          trap_correct: "快要下雨了！",
          trap_why: "Cấu trúc 快要... bắt buộc phải có 了 ở cuối câu."
        },
        en: {
          title: "Imminent actions: About to happen! (快要...了)",
          quick_rule: "Express that an event is about to happen in moments (about to / soon).",
          trap_wrong: "快要下雨昨天。",
          trap_correct: "快要下雨了！",
          trap_why: "The construction 快要... must pair with 了 at sentence end."
        },
        ja: {
          title: "近未来を表す「快要…了」（もうすぐ〜する）",
          quick_rule: "事態が間もなく発生することを「快要…了」（もうすぐ〜する）と表します。",
          trap_wrong: "快要下雨昨天。",
          trap_correct: "快要下雨了！",
          trap_why: "「快要…」構文では文末に「了」が不可欠です。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "✈️ Sự việc / Xe", en: "✈️ Subject", ja: "✈️ 主体" },
          options: [
            { zh: "飞机", py: "fēijī", tr: { vi: "Máy bay", en: "Airplane", ja: "飛行機" } },
            { zh: "火车", py: "huǒchē", tr: { vi: "Tàu hỏa", en: "Train", ja: "電車" } },
            { zh: "天", py: "tiān", tr: { vi: "Trời", en: "Sky/Weather", ja: "空" } }
          ]
        },
        {
          slot_label: { vi: "⚡ Sắp sửa", en: "⚡ Soon", ja: "⚡ まもなく" },
          options: [
            { zh: "快要", py: "kuàiyào", tr: { vi: "sắp sửa", en: "about to", ja: "もうすぐ" } }
          ]
        },
        {
          slot_label: { vi: "🎬 Hành động + 了", en: "🎬 Action + 了", ja: "🎬 動作＋了" },
          options: [
            { zh: "起飞了", py: "qǐfēi le", tr: { vi: "cất cánh rồi", en: "take off", ja: "離陸する" } },
            { zh: "开走了", py: "kāi zǒu le", tr: { vi: "chạy rồi", en: "depart", ja: "出発する" } },
            { zh: "下雨了", py: "xiàyǔ le", tr: { vi: "mưa rồi", en: "rain", ja: "雨が降る" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "快点儿，火车快要开了！",
          py: "Kuài diǎnr, huǒchē kuàiyào kāi le!",
          tr: { vi: "Nhanh lên, tàu hỏa sắp chạy rồi!", en: "Hurry up, the train is about to depart!", ja: "急いで、電車がもうすぐ出ちゃうよ！" }
        },
        speaker_b: {
          speaker: "B",
          zh: "好，我马上来！",
          py: "Hǎo, wǒ mǎshàng lái!",
          tr: { vi: "Được, tôi đến ngay đây!", en: "Okay, I'm coming right away!", ja: "分かった、すぐ行く！" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Trời sắp mưa rồi!'",
          en: "Arrange the words to say: 'It is about to rain!'",
          ja: "並べ替えて「もうすぐ雨が降るよ！」を作ってください"
        },
        tokens: ["快要", "了", "天", "下雨"],
        correct_order: ["天", "快要", "下雨", "了"]
      }
    },

    // 15. hsk2_yue_lai_yue
    {
      id: "hsk2_yue_lai_yue",
      level: "HSK2",
      zh_name: "越来越 + Adj",
      formula: "[Sự vật] + 越来越 + [Tính từ]",
      localizations: {
        vi: {
          title: "Càng ngày càng... (越来越 + Tính từ)",
          quick_rule: "Biểu thị mức độ biến chuyển tăng dần theo thời gian ('càng ngày càng...'). Cấm dùng 很 sau 越来越.",
          trap_wrong: "中文越来越很难。",
          trap_correct: "中文越来越难。",
          trap_why: "Bản thân '越来越' đã mang nghĩa so sánh tăng tiến cao độ, cấm chèn thêm '很'."
        },
        en: {
          title: "More and more with 越来越 (yuèláiyuè)",
          quick_rule: "Express an increasing degree over time (more and more). Never add 很 after 越来越.",
          trap_wrong: "中文越来越很难。",
          trap_correct: "中文越来越难。",
          trap_why: "越来越 already conveys increasing intensity; degree adverbs like 很 are prohibited."
        },
        ja: {
          title: "漸進を表す「越来越…」（ますます〜）",
          quick_rule: "時間の経過とともに度合いが増すことを「越来越…」（ますます〜）と表します。「很」を後ろに付けてはいけません。",
          trap_wrong: "中文越来越很难。",
          trap_correct: "中文越来越难。",
          trap_why: "「越来越」自体が強調を含んでいるため、「很」を重ねることは禁物です。"
        }
      },
      lego_slots: [
        {
          slot_label: { vi: "📈 Sự vật", en: "📈 Subject", ja: "📈 主体" },
          options: [
            { zh: "天气", py: "tiānqì", tr: { vi: "Thời tiết", en: "Weather", ja: "天気" } },
            { zh: "汉语", py: "hànyǔ", tr: { vi: "Tiếng Trung", en: "Chinese", ja: "中国語" } },
            { zh: "他", py: "tā", tr: { vi: "Anh ấy", en: "He", ja: "彼" } }
          ]
        },
        {
          slot_label: { vi: "🔄 Càng ngày càng", en: "🔄 More and more", ja: "🔄 ますます" },
          options: [
            { zh: "越来越", py: "yuèláiyuè", tr: { vi: "càng ngày càng", en: "more and more", ja: "ますます" } }
          ]
        },
        {
          slot_label: { vi: "🎨 Tính chất", en: "🎨 Adjective", ja: "🎨 性質" },
          options: [
            { zh: "冷", py: "lěng", tr: { vi: "lạnh", en: "cold", ja: "寒く" } },
            { zh: "有意思", py: "yǒu yìsi", tr: { vi: "thú vị", en: "interesting", ja: "面白く" } },
            { zh: "帅", py: "shuài", tr: { vi: "đẹp trai", en: "handsome", ja: "かっこよく" } }
          ]
        }
      ],
      dialogue: {
        speaker_a: {
          speaker: "A",
          zh: "你觉得学汉语难吗？",
          py: "Nǐ juéde xué hànyǔ nán ma?",
          tr: { vi: "Bạn thấy học tiếng Trung có khó không?", en: "Do you find learning Chinese difficult?", ja: "中国語を学ぶのは難しいと思いますか？" }
        },
        speaker_b: {
          speaker: "B",
          zh: "我觉得越来越有意思了！",
          py: "Wǒ juéde yuèláiyuè yǒu yìsi le!",
          tr: { vi: "Tôi thấy càng ngày càng thú vị rồi!", en: "I think it gets more and more interesting!", ja: "ますます面白くなってきたと思います！" }
        }
      },
      challenge: {
        prompt: {
          vi: "Sắp xếp câu: 'Thời tiết càng ngày càng lạnh'",
          en: "Arrange the words to say: 'The weather is getting colder and colder'",
          ja: "並べ替えて「天気はますます寒くなってきた」を作ってください"
        },
        tokens: ["天气", "冷", "越来越"],
        correct_order: ["天气", "越来越", "冷"]
      }
    }
  ];

  return {
    HSK_GRAMMAR_CATALOG: HSK_GRAMMAR_CATALOG,
    HSK_GRAMMAR_SAMPLES: HSK_GRAMMAR_SAMPLES
  };
});
