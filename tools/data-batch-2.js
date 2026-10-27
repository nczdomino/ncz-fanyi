/**
 * tools/data-batch-2.js
 * 
 * 13 Essential HSK Grammar points (HSK2 14-22, HSK3 23-26)
 * Full pedagogical schema adhering to types/grammar.ts
 */

const batch2 = [
  // 14. hsk2_directional_complement_simple
  {
    id: "hsk2_directional_complement_simple",
    level: "HSK2",
    level_num: 2,
    category: "complement",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["来", "去", "趋向补语", "directional complement", "come", "go"],
    formula: "S + V + 来 / 去  hoặc  S + V + Nơi chốn + 来 / 去",
    formula_plain: {
      vi: "Động từ + 来 (hướng về phía người nói) / 去 (rời xa người nói)",
      ja: "動詞 ＋ 来（話し手に向かう）／去（話し手から離れる）",
      en: "Verb + 来 (toward speaker) / 去 (away from speaker)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ hành động", ja: "動作動詞", en: "Action Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Bổ ngữ xu hướng (来/去)", ja: "単純方向補語", en: "Directional Complement" }, role: "complement", color: "#EC4899" }
    ],
    related_ids: ["hsk3_compound_directional_complement"],
    confusable_with: [
      {
        id: "hsk3_compound_directional_complement",
        diff: {
          vi: "Bổ ngữ xu hướng đơn chỉ dùng 1 chữ 来 hoặc 去 (进来, 进去). Xu hướng kép kết hợp hai động từ hướng (走上来, 跑过去).",
          ja: "単純方向補語は「来・去」単体。複合方向補語は「上来・過去」など2語を組み合わせます。",
          en: "Simple directional complement uses just 来/去; compound combines two directional verbs."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Bổ ngữ xu hướng đơn (V + 来 / 去)",
        concept: "Gắn 来 hoặc 去 ngay sau động từ di chuyển để chỉ phương hướng của hành động: 来 là tiến về phía người nói; 去 là rời xa người nói.",
        grammar_notes: [
          "Quy tắc vị trí tân ngữ nơi chốn: BẮT BUỘC đặt trước 来/去 (Ví dụ: 进教室来 - vào phòng học, KHÔNG nói 进来教室).",
          "Tân ngữ chỉ đồ vật: Có thể đặt trước hoặc sau 来/去 (买一本书来 hoặc 买来一本书).",
          "Người nói ở trên lầu: 上来 (lên đây); người nói ở dưới lầu: 上去 (lên trên kia)."
        ],
        pedagogical_tips: "Điểm mấu chốt: Luôn xác định vị trí của 'người nói' để chọn 来 hay 去."
      },
      ja: {
        title: "単純方向補語「動詞＋来／去」",
        concept: "移動動作の直後に「来（話者に近づく方向）」または「去（話者から遠ざかる方向）」をつけて動作の方向性を示します。",
        grammar_notes: [
          "場所目的語の配置ルール：必ず「来／去」の前に置く（例：回家去、进教室来。❌ 进来到教室は不可）。",
          "物目的語：来／去の前でも後でも可（带来一把伞 / 带一把伞来）。"
        ],
        pedagogical_tips: "話し手の立ち位置を基準にして「来」か「去」かを判断する練習を徹底させます。"
      },
      en: {
        title: "Simple Directional Complements (V + 来 / 去)",
        concept: "Follows an action verb to indicate direction relative to the speaker: 来 (towards speaker) or 去 (away from speaker).",
        grammar_notes: [
          "Place-noun object rule: MUST be placed BEFORE 来/去 (e.g. 进教室来; never 进来教室).",
          "Thing-noun object: Can be placed before or after 来/去.",
          "Speaker's perspective determines choice of 来 vs 去."
        ],
        pedagogical_tips: "Focus on place objects being wedged before 来/去."
      }
    },
    fill_template: {
      template_zh: "外面冷，快进{direction}吧！",
      template_vi: "Bên ngoài lạnh, mau vào {direction} đi!",
      slots: [
        { name: "direction", type: "direction", options: ["来", "去"] }
      ]
    },
    collocations: [
      { pattern: "进来", pinyin: "jìn lai", meaning_vi: "Vào đây", meaning_en: "Come in" },
      { pattern: "回去", pinyin: "huí qu", meaning_vi: "Về kia", meaning_en: "Go back" }
    ],
    examples: [
      {
        zh: "他在楼上，你快上去吧。",
        pinyin: "Tā zài lóushàng, nǐ kuài shàngqu ba.",
        translations: { vi: "Anh ấy ở trên lầu, bạn mau lên trên đó đi.", ja: "彼は上の階にいます、早く上がっていきなさい。", en: "He is upstairs; hurry and go up." },
        literal_en: "He at upstairs, you quickly go up particle.",
        scenario: { vi: "Chỉ đường lên lầu", ja: "上の階へ行くよう促す", en: "Directing upstairs" },
        tone_tip: { vi: "去 đọc thanh nhẹ khi làm bổ ngữ (shàngqu).", ja: "「去」は補語のとき軽声になります。", en: "去 takes neutral tone in complements." },
        word_order_diff: { vi: "Người nói đang ở tầng dưới nên dùng 上去 (hướng ra xa người nói).", ja: "話し手が下にいるため「去」を用います。", en: "Speaker is downstairs, thus uses 去." },
        note: { vi: "Quy tắc định vị hướng theo góc nhìn người nói.", ja: "視点位置による方向選択の好例です。", en: "Clear demonstration of speaker-perspective." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "在", pinyin: "zài", han_viet: "tại", ja_kanji: "在る", literal_en: "at", block_role: "preposition" },
          { hanzi: "楼上", pinyin: "lóushàng", han_viet: "lâu thượng", ja_kanji: "上の階", literal_en: "upstairs", block_role: "location" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "快", pinyin: "kuài", han_viet: "khoái", ja_kanji: "早く", literal_en: "hurry", block_role: "adverb" },
          { hanzi: "上去", pinyin: "shàngqu", han_viet: "thượng khứ", ja_kanji: "上がっていく", literal_en: "go up", block_role: "verb" },
          { hanzi: "吧", pinyin: "ba", han_viet: "ba", ja_kanji: "〜しよう", literal_en: "suggestion", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_dir_1",
        prompt: { vi: "Sắp xếp: 'Mau vào nhà đi!' (người nói đang ở trong nhà)", ja: "並べ替え：「早く部屋に入っておいで！」（話者は部屋の中）", en: "Unscramble: 'Hurry and come into the house!'" },
        correct_order: ["快", "进", "家", "来", "吧", "！"],
        tokens: ["家", "进", "来", "快", "吧", "！"],
        explanation: { vi: "Tân ngữ nơi chốn (家) phải đứng trước 来: 进 + 家 + 来.", ja: "場所目的語「家」は「来」の前に挟みます。", en: "Place noun 家 must precede 来." }
      }
    ],
    fill_blank: [
      {
        id: "fb_dir_1",
        sentence_zh: "下课了，同学们都回宿舍{direction}了。",
        answer: "去",
        options: ["去", "来", "在", "着"],
        explanation: { vi: "Tan học ở giảng đường, sinh viên rời xa về ký túc xá dùng 去.", ja: "教室から離れて寮へ戻っていくので「去」です。", en: "Moving away from current location to dorm takes 去." }
      }
    ],
    error_correction: [
      {
        id: "ec_dir_1",
        wrong_sentence: "请大家进来教室。",
        correct_sentence: "请大家进教室来。",
        error_point: { vi: "Đặt tân ngữ nơi chốn 教室 ở sau 进来.", ja: "場所目的語「教室」を「进来」の後に置いてしまった誤文。", en: "Placing place object after 进来." },
        explanation: { vi: "Tân ngữ nơi chốn bắt buộc xen vào giữa: 进 + 教室 + 来.", ja: "場所は必ず「动词＋场所＋来/去」の語順にします。", en: "Place must be sandwiched: 进 + 教室 + 来." }
      }
    ],
    quiz: [
      {
        id: "qz_dir_1",
        question: { vi: "Người nói đang ở trong phòng học và gọi học sinh bên ngoài vào, câu nào đúng?", ja: "先生が教室の中にいて、外の生徒に「入っておいで」と言う時の文は？", en: "Speaker is inside the classroom calling someone outside to enter. Which is correct?" },
        options: [
          { text: { vi: "请进教室来。(Hướng về phía người nói)", ja: "请进教室来。（話者に向かう方向なので来）", en: "请进教室来 (Towards speaker)" }, correct: true },
          { text: { vi: "请进教室去。", ja: "请进教室去。", en: "请进教室去。" }, correct: false }
        ],
        explanation: { vi: "Tiến lại gần người nói dùng 来.", ja: "話し手に近づく方向なので「来」を使います。", en: "Towards the speaker requires 来." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V + 来 (lại gần người nói) / 去 (ra xa người nói); tân ngữ nơi chốn BẮT BUỘC đứng trước 来/去.",
        ja: "動詞＋来（近づく）／去（離れる）。場所目的語は必ず「来／去」の前に置く。",
        en: "V + 来 (approaching) / 去 (receding); place objects MUST precede 来/去."
      },
      remember: [
        { vi: "Quy tắc vàng vị trí nơi chốn: 进教室来 (không nói 进来教室).", ja: "場所目的語は間に挟む：进＋教室＋来。", en: "Place nouns must be placed inside: V + Place + 来/去." }
      ]
    }
  },

  // 15. hsk2_affirmative_negative_question
  {
    id: "hsk2_affirmative_negative_question",
    level: "HSK2",
    level_num: 2,
    category: "question",
    difficulty: 2,
    frequency: 5,
    register: "spoken",
    keywords: ["正反疑问句", "V不V", "V没V", "affirmative negative question", "câu hỏi chính phản"],
    formula: "S + V + 不 + V (+ O)？  hoặc  S + V + 没 + V (+ O)？",
    formula_plain: {
      vi: "Chủ ngữ + Động từ + 不/没 + Động từ？ (Có... không?)",
      ja: "主語 ＋ 動詞 ＋ 不／没 ＋ 動詞（＋目的語）？（〜するかしないか？）",
      en: "Subject + Verb + 不/没 + Verb (+ Object)? (Verb or not?)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "V khẳng định", ja: "肯定形", en: "Affirmative V" }, role: "verb", color: "#10B981" },
      { label: { vi: "不 / 没", ja: "否定詞", en: "Negator" }, role: "negation", color: "#EF4444" },
      { label: { vi: "V phủ định", ja: "反復動詞", en: "Repeated V" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_ma_yes_no_question"],
    confusable_with: [
      {
        id: "hsk1_ma_yes_no_question",
        diff: {
          vi: "Câu hỏi chính phản (V不V) ĐÃ mang tính chất nghi vấn, TUYỆT ĐỐI không thêm trợ từ 吗 ở cuối câu (sai: 你去不去吗？).",
          ja: "正反疑問文（V不V）の文末に「吗」をつけてはいけません（❌ 你去不去吗？）。",
          en: "Never append 吗 to an affirmative-negative question (e.g. 你去不去吗 is wrong)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu hỏi chính phản (V 不 V / V 没 V / Adj 不 Adj)",
        concept: "Ghép dạng khẳng định và phủ định của vị ngữ lại với nhau để tạo thành câu hỏi lựa chọn giữa Có hoặc Không.",
        grammar_notes: [
          "Hiện tại/Thói quen: 你去不去？ (Bạn có đi không?)",
          "Quá khứ/Hoàn thành: 你吃了没有？ hoặc 你吃没吃？ (Bạn đã ăn chưa?)",
          "Với tính từ: 这个贵不贵？ (Cái này có đắt không?)",
          "Quy tắc tuyệt đối: Không dùng 吗 ở cuối câu hỏi chính phản."
        ],
        pedagogical_tips: "Cực kỳ chú ý lỗi học sinh hay thêm chữ 吗 vào cuối câu chính phản."
      },
      ja: {
        title: "正反疑問文（V不V／V没V）",
        concept: "述語の肯定形と否定形を並べて「〜ですか、どうですか」と問いかける中国語特有の疑問文です。",
        grammar_notes: [
          "日常・意志：「你去不去？」（行く？行かない？）",
          "過去・完了：「你吃没吃？」または「你吃了没有？」（食べた？まだ？）",
          "形容詞：「冷不冷？」（寒くない？寒いの？）",
          "絶対禁忌：文末に「吗」をつけてはならない（❌ 你去不去吗？）。"
        ],
        pedagogical_tips: "「吗」の不要ルールを徹底反復させます。"
      },
      en: {
        title: "Affirmative-Negative Questions (V-not-V)",
        concept: "Juxtaposes the positive and negative forms of a verb or adjective to form a direct yes-no question.",
        grammar_notes: [
          "Present / Habitual: 你去不去？ (Are you going or not?)",
          "Past / Completion: 你吃没吃？ or 你吃了没有？ (Did you eat or not?)",
          "With Adjectives: 累不累？ (Are you tired?)",
          "Absolute prohibition: Never add 吗 at the end."
        ],
        pedagogical_tips: "Emphasize omitting 吗 completely."
      }
    },
    fill_template: {
      template_zh: "明天晚上的聚会，你{verb_pattern}参加？",
      template_vi: "Bữa tiệc tối mai, bạn có tham gia không?",
      slots: [
        { name: "verb_pattern", type: "verb", options: ["想不想", "去不去", "能不能"] }
      ]
    },
    collocations: [
      { pattern: "好不好？", pinyin: "hǎo bu hǎo?", meaning_vi: "Được không?", meaning_en: "Good or not? / OK?" },
      { pattern: "是不是？", pinyin: "shì bu shì?", meaning_vi: "Có phải không?", meaning_en: "Is that so?" }
    ],
    examples: [
      {
        zh: "你喝不喝咖啡？",
        pinyin: "Nǐ hē bu hē kāfēi?",
        translations: { vi: "Bạn có uống cà phê không?", ja: "コーヒーを飲みますか？", en: "Do you drink coffee (or not)?" },
        literal_en: "You drink not drink coffee?",
        scenario: { vi: "Mời đồ uống", ja: "飲み物を勧める", en: "Offering a beverage" },
        tone_tip: { vi: "Chữ 不 ở giữa đọc nhẹ (bu).", ja: "真ん中の「不」は軽声で軽く読みます。", en: "Middle 不 is pronounced lightly." },
        word_order_diff: { vi: "Kết cấu V + 不 + V thay cho câu hỏi đuôi bằng 吗.", ja: "肯定＋否定＋目的語の並びです。", en: "V-not-V replaces 吗 question." },
        note: { vi: "Rất tự nhiên và phổ biến trong văn nói.", ja: "口語で最も自然な尋ね方です。", en: "Very natural in casual spoken Chinese." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "喝", pinyin: "hē", han_viet: "hát", ja_kanji: "飲む", literal_en: "drink", block_role: "verb" },
          { hanzi: "不", pinyin: "bu", han_viet: "bất", ja_kanji: "不", literal_en: "not", block_role: "negation" },
          { hanzi: "喝", pinyin: "hē", han_viet: "hát", ja_kanji: "飲む", literal_en: "drink", block_role: "verb" },
          { hanzi: "咖啡", pinyin: "kāfēi", han_viet: "cà phê", ja_kanji: "珈琲", literal_en: "coffee", block_role: "object" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_affneg_1",
        prompt: { vi: "Sắp xếp: 'Bộ phim này có hay không?'", ja: "並べ替え：「この映画は面白いですか？」", en: "Unscramble: 'Is this movie interesting or not?'" },
        correct_order: ["这个", "电影", "好", "不", "好看", "？"],
        tokens: ["好看", "不", "电影", "这个", "好", "？"],
        explanation: { vi: "Tính từ 2 âm tiết lặp lại chữ đầu: 好不好看？", ja: "2音節形容詞は「A不AB」と短縮できます。", en: "Two-syllable adjectives can follow the A-not-AB pattern." }
      }
    ],
    fill_blank: [
      {
        id: "fb_affneg_1",
        sentence_zh: "你今天有{blank}有空？",
        answer: "没",
        options: ["没", "不", "别", "了"],
        explanation: { vi: "Phủ định của 有 bắt buộc dùng 没: 有没有空.", ja: "動詞「有」の正反疑問は「有没有」です。", en: "有 pairs with 没 in 有没有." }
      }
    ],
    error_correction: [
      {
        id: "ec_affneg_1",
        wrong_sentence: "你想不想去北京吗？",
        correct_sentence: "你想不想去北京？",
        error_point: { vi: "Thừa trợ từ 吗 ở cuối câu hỏi chính phản 想不想.", ja: "正反疑問文「想不想」の文末に「吗」をつけてしまった典型的な誤文。", en: "Adding 吗 to a sentence already using 想不想." },
        explanation: { vi: "Câu hỏi chính phản đã mang tính nghi vấn, bỏ chữ 吗.", ja: "文末の「吗」を取り除きます。", en: "Remove 吗 from V-not-V questions." }
      }
    ],
    quiz: [
      {
        id: "qz_affneg_1",
        question: { vi: "Để hỏi một hành động trong quá khứ đã làm hay chưa, mẫu câu chính phản nào chuẩn?", ja: "過去の動作の完了を尋ねる正反疑問文として正しい形は？", en: "Which affirmative-negative form is used for completed past actions?" },
        options: [
          { text: { vi: "你看了没有？ / 你看没看？", ja: "你看了没有？ / 你看没看？", en: "你看了没有？ / 你看没看？" }, correct: true },
          { text: { vi: "你看看不看？", ja: "你看看不看？", en: "你看看不看？" }, correct: false }
        ],
        explanation: { vi: "Hành động quá khứ dùng 没: V + 没 + V hoặc V + 了 + 没有.", ja: "過去・完了の確認には「没」を使います。", en: "Past completion inquiries take 没." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + V + 不/没 + V + O？: Ghép khẳng định và phủ định để hỏi; TUYỆT ĐỐI không có 吗 ở cuối.",
        ja: "主語＋V＋不/没＋V？：肯定と否定を並べる正反疑問文。文末の「吗」は絶対に不可。",
        en: "S + V + 不/没 + V + O?: Juxtaposes affirmative and negative; NEVER end with 吗."
      },
      remember: [
        { vi: "Đã có V不V thì cấm kỵ dùng 吗 (sai: 你吃不吃吗？).", ja: "「V不V」と「吗」は絶対に併用しない。", en: "Never combine V-not-V with 吗." }
      ]
    }
  },

  // 16. hsk2_haishi_alternative_question
  {
    id: "hsk2_haishi_alternative_question",
    level: "HSK2",
    level_num: 2,
    category: "question",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["还是", "háishì", "câu hỏi lựa chọn", "hay là", "alternative question", "or"],
    formula: "S + Lựa chọn A + 还是 + Lựa chọn B？",
    formula_plain: {
      vi: "Lựa chọn A + 还是 + Lựa chọn B？ (A hay là B?)",
      ja: "選択肢A ＋ 还是 ＋ 選択肢B？（Aですか、それともBですか？）",
      en: "Option A + 还是 + Option B? (A or B?)"
    },
    structure_blocks: [
      { label: { vi: "Lựa chọn A", ja: "選択肢A", en: "Option A" }, role: "option_a", color: "#3B82F6" },
      { label: { vi: "Liên từ 还是", ja: "選択連詞 还是", en: "Alternative Conjunction" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Lựa chọn B", ja: "選択肢B", en: "Option B" }, role: "option_b", color: "#10B981" }
    ],
    related_ids: ["hsk2_affirmative_negative_question"],
    confusable_with: [
      {
        id: "hsk2_affirmative_negative_question",
        diff: {
          vi: "Phân biệt 还是 và 或者: 还是 chỉ dùng trong CÂU HỎI lựa chọn (A hay là B?). 或者 chỉ dùng trong CÂU KHẲNG ĐỊNH (A hoặc là B).",
          ja: "「还是」は疑問文の「それとも」。「或者」は平叙文の「または」。混同は厳禁。",
          en: "还是 is exclusively for questions (or?); 或者 is strictly for declarative statements (or)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu hỏi lựa chọn với liên từ 还是 (háishì)",
        concept: "Dùng liên từ 还是 nối hai phương án A và B trong câu hỏi để người nghe lựa chọn một trong hai phương án đó.",
        grammar_notes: [
          "Cấu trúc: 你喝茶还是喝咖啡？ (Bạn uống trà hay uống cà phê?)",
          "Khác biệt mấu chốt: Trong câu khẳng định phải dùng 或者 (Ví dụ: 喝茶或者咖啡都可以 - Uống trà hoặc cà phê đều được).",
          "Câu hỏi lựa chọn không dùng 吗 ở cuối câu."
        ],
        pedagogical_tips: "Cực kỳ nhấn mạnh: '还是 trong câu hỏi, 或者 trong câu trần thuật'."
      },
      ja: {
        title: "選択疑問文「还是（háishì）」",
        concept: "2つ以上の選択肢を並べ、「Aですか、それともBですか？」と相手に選ばせる疑問文を作ります。",
        grammar_notes: [
          "最重要の使い分け：疑問文には「还是」、肯定文（平叙文）には「或者」を用いる（例：周末我想看书或者看电影）。",
          "選択疑問文末に「吗」をつけてはならない。"
        ],
        pedagogical_tips: "「还是＝疑問文」「或者＝平叙文」の区別はHSK2〜3の最重要頻出項目です。"
      },
      en: {
        title: "Alternative Questions with 还是 (háishì)",
        concept: "Connects two or more options in a question, asking the listener to choose between Option A and Option B ('or').",
        grammar_notes: [
          "Essential distinction: 还是 is used ONLY in questions; 或者 is used in statements.",
          "Example: 你去中国还是日本？ (Are you going to China or Japan?)",
          "Do not add 吗 at the end."
        ],
        pedagogical_tips: "Drill 还是 (questions) vs 或者 (statements)."
      }
    },
    fill_template: {
      template_zh: "你喜欢夏天{conjunction}冬天？",
      template_vi: "Bạn thích mùa hè {conjunction} mùa đông?",
      slots: [
        { name: "conjunction", type: "conjunction", options: ["还是", "或者", "和", "跟"] }
      ]
    },
    collocations: [
      { pattern: "喝茶还是喝咖啡？", pinyin: "hē chá háishì hē kāfēi?", meaning_vi: "Uống trà hay là uống cà phê?", meaning_en: "Drink tea or coffee?" },
      { pattern: "今天还是明天？", pinyin: "jīntiān háishì míngtiān?", meaning_vi: "Hôm nay hay là ngày mai?", meaning_en: "Today or tomorrow?" }
    ],
    examples: [
      {
        zh: "你坐飞机去还是坐高铁去？",
        pinyin: "Nǐ zuò fēijī qù háishì zuò gāotiě qù?",
        translations: { vi: "Bạn đi bằng máy bay hay là đi bằng tàu cao tốc?", ja: "飛行機で行きますか、それとも新幹線で行きますか？", en: "Are you going by plane or by high-speed rail?" },
        literal_en: "You take airplane go or take high-speed-rail go?",
        scenario: { vi: "Hỏi phương tiện di chuyển", ja: "移動手段の確認", en: "Travel options" },
        tone_tip: { vi: "还是 đọc là háishì.", ja: "「还是」は第2声＋第4声です。", en: "Pronounced háishì." },
        word_order_diff: { vi: "Vế A (坐飞机去) + 还是 + Vế B (坐高铁去).", ja: "選択肢A＋还是＋選択肢Bの並列構造。", en: "Option A + 还是 + Option B." },
        note: { vi: "Mẫu câu hỏi lựa chọn kinh điển.", ja: "代表的な選択疑問文の形です。", en: "Textbook alternative question." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "坐飞机", pinyin: "zuò fēijī", han_viet: "tọa phi cơ", ja_kanji: "飛行機に乗る", literal_en: "take plane", block_role: "option_a" },
          { hanzi: "去", pinyin: "qù", han_viet: "khứ", ja_kanji: "行く", literal_en: "go", block_role: "verb" },
          { hanzi: "还是", pinyin: "háishì", han_viet: "hoàn thị", ja_kanji: "それとも", literal_en: "or", block_role: "conjunction" },
          { hanzi: "坐高铁", pinyin: "zuò gāotiě", han_viet: "tọa cao thiết", ja_kanji: "新幹線に乗る", literal_en: "take high-speed rail", block_role: "option_b" },
          { hanzi: "去", pinyin: "qù", han_viet: "khứ", ja_kanji: "行く", literal_en: "go", block_role: "verb" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_hai_1",
        prompt: { vi: "Sắp xếp: 'Bạn muốn ăn cơm hay ăn mì sợi?'", ja: "並べ替え：「ご飯を食べますか、それとも麺類にしますか？」", en: "Unscramble: 'Do you want to eat rice or noodles?'" },
        correct_order: ["你", "想", "吃米饭", "还是", "吃面条", "？"],
        tokens: ["吃面条", "还是", "想", "吃米饭", "你", "？"],
        explanation: { vi: "A (吃米饭) + 还是 + B (吃面条)？", ja: "A＋还是＋B？の語順です。", en: "A + 还是 + B?" }
      }
    ],
    fill_blank: [
      {
        id: "fb_hai_1",
        sentence_zh: "明天是星期六{blank}星期天？",
        answer: "还是",
        options: ["还是", "或者", "和", "跟"],
        explanation: { vi: "Câu hỏi lựa chọn bắt buộc dùng 还是, không dùng 或者.", ja: "疑問文で選択を尋ねているので「还是」を用います。", en: "Questions require 还是, not 或者." }
      }
    ],
    error_correction: [
      {
        id: "ec_hai_1",
        wrong_sentence: "你想喝咖啡或者喝茶？",
        correct_sentence: "你想喝咖啡还是喝茶？",
        error_point: { vi: "Dùng nhầm 或者 trong câu hỏi lựa chọn.", ja: "疑問文に「或者」を使ってしまっている典型的な誤文。", en: "Using 或者 instead of 还是 in a question." },
        explanation: { vi: "Trong câu hỏi lựa chọn bắt buộc phải dùng 还是.", ja: "疑問文では「还是」に修正します。", en: "Replace 或者 with 还是 in questions." }
      }
    ],
    quiz: [
      {
        id: "qz_hai_1",
        question: { vi: "Trong câu trần thuật 'Cuối tuần tôi muốn đọc sách hoặc nghe nhạc', dùng từ nào cho 'hoặc'?", ja: "平叙文「週末私は本を読むか、または音楽を聴きたい」の「または」は？", en: "In declarative 'On weekends I want to read or listen to music', which word for 'or' is correct?" },
        options: [
          { text: { vi: "或者 (huòzhě) - Dùng trong câu trần thuật", ja: "或者（平叙文で使用）", en: "或者 (huòzhě) - Used in statements" }, correct: true },
          { text: { vi: "还是 (háishì) - Dùng trong câu hỏi", ja: "还是（疑問文で使用）", en: "还是 (háishì) - Used in questions" }, correct: false }
        ],
        explanation: { vi: "Câu trần thuật bắt buộc dùng 或者.", ja: "肯定平叙文では「或者」を用います。", en: "Declarative sentences require 或者." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "A + 还是 + B？: Dùng trong CÂU HỎI lựa chọn (A hay là B); câu trần thuật dùng 或者.",
        ja: "A＋还是＋B？：疑問文専用の「それとも」。平叙文には「或者」を使う。",
        en: "A + 还是 + B?: Exclusively for alternative questions; statements use 或者."
      },
      remember: [
        { vi: "Quy tắc nằm lòng: 还是 = Câu hỏi (?), 或者 = Câu khẳng định (.).", ja: "疑問符（？）なら还是、ピリオド（。）なら或者。", en: "Question (?) -> 还是; Statement (.) -> 或者." }
      ]
    }
  },

  // 17. hsk2_yao_le_imminent_action
  {
    id: "hsk2_yao_le_imminent_action",
    level: "HSK2",
    level_num: 2,
    category: "aspect",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["快要...了", "就要...了", "要...了", "kuàiyào...le", "jiùyào...le", "sắp... rồi", "imminent action", "about to"],
    formula: "S + (快要 / 就要 / 要) + V + 了",
    formula_plain: {
      vi: "Chủ ngữ + (快要 / 就要 / 要) + Động từ + 了 (Sắp sửa làm gì rồi)",
      ja: "主語 ＋（快要／就要／要）＋ 動詞 ＋ 了（まもなく〜しようとしている）",
      en: "Subject + (快要 / 就要 / 要) + Verb + 了 (About to... / Soon...)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ sắp sửa (快要/就要)", ja: "切迫副詞", en: "Imminent Adverb" }, role: "aspect", color: "#EC4899" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ ngữ khí 了", ja: "語気助詞 了", en: "Sentence Final 了" }, role: "particle", color: "#8B5CF6" }
    ],
    related_ids: ["hsk1_le_modal_change"],
    confusable_with: [
      {
        id: "hsk1_le_modal_change",
        diff: {
          vi: "Khi câu CÓ từ chỉ thời gian cụ thể (như 明天, 下周, 8点), BẮT BUỘC dùng 就要...了, TUYỆT ĐỐI KHÔNG dùng 快要...了.",
          ja: "具体的な時間詞（明天・8点など）を伴う場合は「就要……了」しか使えず、「快要……了」は使えません。",
          en: "When a specific time adverbial (e.g. tomorrow, 8:00) is specified, only 就要...了 can be used, NOT 快要...了."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 要 / 快要 / 就要...了 (Sắp... rồi)",
        concept: "Biểu thị một hành động hoặc biến đổi trạng thái sắp sửa xảy ra trong tương lai rất gần.",
        grammar_notes: [
          "Các dạng tương đương: 要...了, 快...了, 快要...了, 就要...了.",
          "Quy tắc vàng thi HSK: Nếu câu có mốc thời gian cụ thể (明天, 下个月), chỉ được dùng 就要...了 (Ví dụ: 我明天就要走了 - Đúng; 我明天快要走了 - SAI).",
          "Thường kết hợp với các động từ biến đổi: 下雨 (mưa), 开车 (chạy xe), 起飞 (cất cánh)."
        ],
        pedagogical_tips: "Quy tắc phân biệt 快要 và 就要 khi có thời gian cụ thể là câu hỏi bẫy kinh điển trong HSK 2 và HSK 3."
      },
      ja: {
        title: "近接未来構文「（快）要／就要……了」",
        concept: "動作や事態がごく近い将来に発生することを表す「まもなく〜する」「今にも〜しそうだ」構文です。",
        grammar_notes: [
          "バリエーション：要……了、快……了、快要……了、就要……了。",
          "重要試験ポイント：具体的な時間詞（明天、下星期など）がある文では「就要……了」を用い、「快要」は不可（⭕ 明天我就要走了 / ❌ 明天我快要走了）。"
        ],
        pedagogical_tips: "具体的時間詞との共起可否（就要⭕ / 快要❌）を徹底指導します。"
      },
      en: {
        title: "Imminent Action: (快)要 / 就要...了",
        concept: "Indicates that an event or action is about to take place very soon ('about to...').",
        grammar_notes: [
          "Forms: 要...了, 快...了, 快要...了, 就要...了.",
          "Crucial exam rule: If a specific time phrase is present, you MUST use 就要...了, NEVER 快要...了 (e.g. 我明天就要走了, not 明天快要).",
          "Frequently used in travel and weather contexts."
        ],
        pedagogical_tips: "Highlight that specific time words allow only 就要, not 快要."
      }
    },
    fill_template: {
      template_zh: "飞机{aspect}起飞了，请大家系好安全带。",
      template_vi: "Máy bay {aspect} cất cánh rồi, xin mọi người hãy thắt dây an toàn.",
      slots: [
        { name: "aspect", type: "aspect", options: ["快要", "就要", "已经", "正在"] }
      ]
    },
    collocations: [
      { pattern: "快要下雨了", pinyin: "kuàiyào xiàyǔ le", meaning_vi: "Sắp mưa rồi", meaning_en: "It's about to rain" },
      { pattern: "火车就要开了", pinyin: "huǒchē jiùyào kāi le", meaning_vi: "Tàu hỏa sắp chạy rồi", meaning_en: "The train is about to leave" }
    ],
    examples: [
      {
        zh: "新的一年快要到了。",
        pinyin: "Xīn de yì nián kuàiyào dào le.",
        translations: { vi: "Năm mới sắp sửa đến rồi.", ja: "新しい年がまもなくやって来ます。", en: "The new year is about to arrive." },
        literal_en: "New 's one year soon arrive particle.",
        scenario: { vi: "Chúc mừng năm mới sắp tới", ja: "年末の挨拶", en: "Approaching new year" },
        tone_tip: { vi: "快要 đọc là kuàiyào.", ja: "「快要」は第4声＋第4声です。", en: "Both kuài and yào are 4th tone." },
        word_order_diff: { vi: "Khung 快要...了 bao trọn động từ 到 (đến).", ja: "「快要……了」で動詞を挟み込みます。", en: "Frames the verb 到." },
        note: { vi: "Biểu đạt thời khắc chuyển giao sắp đến.", ja: "祝祭や節目で非常によく使われる表現です。", en: "Very common festive remark." },
        tokens: [
          { hanzi: "新的", pinyin: "xīn de", han_viet: "tân đích", ja_kanji: "新しい", literal_en: "new", block_role: "attributive" },
          { hanzi: "一年", pinyin: "yì nián", han_viet: "nhất niên", ja_kanji: "1年", literal_en: "one year", block_role: "subject" },
          { hanzi: "快要", pinyin: "kuàiyào", han_viet: "khoái yếu", ja_kanji: "まもなく", literal_en: "about to", block_role: "aspect" },
          { hanzi: "到", pinyin: "dào", han_viet: "đáo", ja_kanji: "来る", literal_en: "arrive", block_role: "verb" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "particle", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_yao_1",
        prompt: { vi: "Sắp xếp: 'Trời sắp sửa mưa rồi.'", ja: "並べ替え：「今にも雨が降りそうだ。」", en: "Unscramble: 'It is about to rain.'" },
        correct_order: ["天", "快要", "下雨", "了", "。"],
        tokens: ["下雨", "快要", "天", "了", "。"],
        explanation: { vi: "Chủ ngữ (天) + 快要 + Động từ (下雨) + 了.", ja: "主語＋快要＋下雨＋了の順序です。", en: "Subject + 快要 + Verb + 了." }
      }
    ],
    fill_blank: [
      {
        id: "fb_yao_1",
        sentence_zh: "下个星期我们{blank}放假了。",
        answer: "就要",
        options: ["就要", "快要", "快", "刚"],
        explanation: { vi: "Câu có từ chỉ thời gian cụ thể (下个星期) nên bắt buộc dùng 就要...了, không dùng 快要.", ja: "「下个星期」という具体的時間詞があるので「就要……了」を選びます。", en: "Specific time phrase requires 就要, not 快要." }
      }
    ],
    error_correction: [
      {
        id: "ec_yao_1",
        wrong_sentence: "明天早上八点我们快要出发了。",
        correct_sentence: "明天早上八点我们就要出发了。",
        error_point: { vi: "Dùng 快要 với thời gian cụ thể 明天早上八点.", ja: "具体的時間詞があるのに「快要」を使ってしまっている誤り。", en: "Using 快要 with a specific time word." },
        explanation: { vi: "Có mốc thời gian cụ thể phải đổi 快要 thành 就要.", ja: "「就要」に置き換えます。", en: "Change 快要 to 就要 when specific time is given." }
      }
    ],
    quiz: [
      {
        id: "qz_yao_1",
        question: { vi: "Câu nào sau đây ĐÚNG ngữ pháp?", ja: "文法的に正しい文はどれですか？", en: "Which sentence is grammatically correct?" },
        options: [
          { text: { vi: "下个月他就要结婚了。(Có thời gian cụ thể dùng 就要)", ja: "下个月他就要结婚了。（具体的時間詞と「就要」の共起）", en: "下个月他就要结婚了 (Specific time with 就要)" }, correct: true },
          { text: { vi: "下个月他快要结婚了。", ja: "下个月他快要结婚了。", en: "下个月他快要结婚了。" }, correct: false }
        ],
        explanation: { vi: "Có mốc thời gian 下个月 chỉ được đi với 就要, cấm dùng 快要.", ja: "「快要」は具体的時間詞と共起できません。", en: "快要 cannot co-occur with specific time phrases." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + (快要/就要) + V + 了: Sắp sửa xảy ra; có thời gian cụ thể BẮT BUỘC dùng 就要...了.",
        ja: "主語＋(快要/就要)＋動詞＋了：まもなく発生する事態。具体的時間詞がある時は「就要」限定。",
        en: "S + (快要/就要) + V + 了: Imminent action; with specific time words, MUST use 就要."
      },
      remember: [
        { vi: "Quy tắc thi cử: Có mốc giờ/ngày cụ thể -> CHỈ DÙNG 就要...了.", ja: "時間詞あり ➔ 「就要」を使う（快要は不可）。", en: "Specific time specified -> ONLY 就要...了." }
      ]
    }
  },

  // 18. hsk2_suiran_danshi
  {
    id: "hsk2_suiran_danshi",
    level: "HSK2",
    level_num: 2,
    category: "conjunction",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["虽然", "但是", "suīrán", "dànshì", "tuy... nhưng...", "concession conjunction", "although", "but"],
    formula: "虽然 + Vế câu 1，但是 / 可是 + Vế câu 2",
    formula_plain: {
      vi: "虽然 (Tuy rằng) + Vế 1，但是 (nhưng mà) + Vế 2",
      ja: "虽然（〜だけれども）……，但是（しかし）……",
      en: "虽然 (Although) + Clause 1, 但是 (but) + Clause 2"
    },
    structure_blocks: [
      { label: { vi: "Liên từ 虽然", ja: "譲歩連詞 虽然", en: "Concessive 虽然" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Vế nhượng bộ", ja: "譲歩節", en: "Concessive Clause" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Liên từ 但是/可是", ja: "逆接連詞 但是", en: "Adversative 但是" }, role: "conjunction", color: "#EF4444" },
      { label: { vi: "Vế chuyển ngoặt", ja: "主節（逆接）", en: "Contrast Clause" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk2_yinwei_suoyi"],
    confusable_with: [
      {
        id: "hsk2_yinwei_suoyi",
        diff: {
          vi: "因为...所以... là quan hệ nhân quả (Vì... nên...). 虽然...但是... là quan hệ chuyển ngoặt đối lập (Tuy... nhưng...).",
          ja: "因为……所以……は因果関係。虽然……但是……は逆接関係。",
          en: "因为...所以... expresses cause and effect; 虽然...但是... expresses contrast."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu ghép chuyển ngoặt 虽然……但是…… (Tuy…… nhưng……)",
        concept: "Dùng cặp liên từ 虽然 (tuy rằng) ở vế trước và 但是 / 可是 (nhưng mà) ở vế sau để nối hai vế câu có ý nghĩa tương phản hoặc nhượng bộ.",
        grammar_notes: [
          "Trong khẩu ngữ có thể rút gọn một trong hai từ (chỉ dùng 但是 hoặc chỉ dùng 虽然).",
          "Các từ thay thế cho 但是: 可是 (khẩu ngữ nhẹ nhàng hơn), 不过 (nhưng mà, có điều).",
          "Vị trí: 虽然 có thể đứng trước hoặc ngay sau chủ ngữ vế 1."
        ],
        pedagogical_tips: "Cấu trúc câu ghép phổ biến nhất giúp học sinh kéo dài câu và diễn đạt mạch lạc."
      },
      ja: {
        title: "逆接の複文「虽然……但是……」（〜だが、しかし〜）",
        concept: "前節で譲歩の事実（虽然）を提示し、後節で逆接の重点（但是・可是）を述べる頻出複文です。",
        grammar_notes: [
          "口語では「但是」の代わりに「可是」や「不过」もよく用いられます。",
          "「虽然」は主語の前でも後ろでも置くことができます。"
        ],
        pedagogical_tips: "複文をつなぐ最も基本の接続詞ペアとして作文練習させます。"
      },
      en: {
        title: "Concessive Complex Sentence: 虽然……但是……",
        concept: "Frames two contrasting clauses: 虽然 introduces the concession ('although...'), and 但是 delivers the main contrasting point ('but...').",
        grammar_notes: [
          "In casual speech, 但是 can be replaced by 可是 or 不过.",
          "虽然 can be placed either before or after the subject of clause 1.",
          "Unlike English ('Although... but... is forbidden'), Chinese happily uses BOTH 虽然 and 但是 in the same sentence."
        ],
        pedagogical_tips: "Remind English speakers: Chinese DOES pair 'Although' with 'But'!"
      }
    },
    fill_template: {
      template_zh: "这双鞋虽然很贵，{conj}质量非常好。",
      template_vi: "Đôi giày này tuy rất đắt, {conj} chất lượng rất tốt.",
      slots: [
        { name: "conj", type: "conjunction", options: ["但是", "所以", "而且", "或者"] }
      ]
    },
    collocations: [
      { pattern: "虽然...但是...", pinyin: "suīrán... dànshì...", meaning_vi: "Tuy... nhưng...", meaning_en: "Although... but..." },
      { pattern: "虽然很累，但是很高兴", pinyin: "suīrán hěn lèi, dànshì hěn gāoxìng", meaning_vi: "Tuy rất mệt, nhưng rất vui", meaning_en: "Tired but happy" }
    ],
    examples: [
      {
        zh: "汉语虽然有点儿难，但是很有意思。",
        pinyin: "Hànyǔ suīrán yǒudiǎnr nán, dànshì hěn yǒu yìsi.",
        translations: { vi: "Tiếng Trung tuy hơi khó một chút, nhưng rất thú vị.", ja: "中国語は少し難しいですが、とても面白いです。", en: "Although Chinese is a bit difficult, it is very interesting." },
        literal_en: "Chinese although a-bit difficult, but very interesting.",
        scenario: { vi: "Chia sẻ trải nghiệm học ngoại ngữ", ja: "語学学習の感想", en: "Language learning impression" },
        tone_tip: { vi: "虽然 đọc là suīrán (thanh 1 + thanh 2).", ja: "「虽然」は第1声＋第2声です。", en: "suī (1st) + rán (2nd)." },
        word_order_diff: { vi: "Tiếng Trung cho phép dùng cả hai liên từ cùng lúc (Tuy... nhưng...).", ja: "日本語の「〜だけれども、しかし」と呼応関係が一致します。", en: "Pairs both words together, unlike standard English." },
        note: { vi: "Mẫu câu mẫu mực cho các bài viết HSK 2.", ja: "HSK2作文の定番テンプレートです。", en: "Classic writing template for HSK 2." },
        tokens: [
          { hanzi: "汉语", pinyin: "Hànyǔ", han_viet: "Hán ngữ", ja_kanji: "中国語", literal_en: "Chinese", block_role: "subject" },
          { hanzi: "虽然", pinyin: "suīrán", han_viet: "tuy nhiên", ja_kanji: "〜だけれども", literal_en: "although", block_role: "conjunction" },
          { hanzi: "有点儿", pinyin: "yǒudiǎnr", han_viet: "hữu điểm nhi", ja_kanji: "少し", literal_en: "a bit", block_role: "adverb" },
          { hanzi: "难", pinyin: "nán", han_viet: "nan", ja_kanji: "難しい", literal_en: "difficult", block_role: "adjective" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "但是", pinyin: "dànshì", han_viet: "đãn thị", ja_kanji: "しかし", literal_en: "but", block_role: "conjunction" },
          { hanzi: "很", pinyin: "hěn", han_viet: "hẩn", ja_kanji: "とても", literal_en: "very", block_role: "adverb" },
          { hanzi: "有意思", pinyin: "yǒu yìsi", han_viet: "hữu ý tư", ja_kanji: "面白い", literal_en: "interesting", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_sui_1",
        prompt: { vi: "Sắp xếp: 'Tuy trời mưa, nhưng anh ấy vẫn đi học.'", ja: "並べ替え：「雨が降っているが、彼は学校に行った。」", en: "Unscramble: 'Although it rained, he still went to school.'" },
        correct_order: ["虽然", "下雨", "了", "，", "但是", "他", "去", "学校", "了", "。"],
        tokens: ["他", "虽然", "但是", "下雨", "去", "学校", "了", "了", "，", "。"],
        explanation: { vi: "虽然 + Vế 1 (下雨了)，但是 + Vế 2 (他去学校了).", ja: "虽然〜，但是〜の標準的な複文配列です。", en: "虽然 Clause 1, 但是 Clause 2." }
      }
    ],
    fill_blank: [
      {
        id: "fb_sui_1",
        sentence_zh: "{blank}工作很累，但是他很热爱这份工作。",
        answer: "虽然",
        options: ["虽然", "因为", "不仅", "如果"],
        explanation: { vi: "Đi đôi với 但是 ở vế sau là liên từ 虽然.", ja: "後節の「但是」と呼応するのは「虽然」です。", en: "Pairs with 但是 in the second clause." }
      }
    ],
    error_correction: [
      {
        id: "ec_sui_1",
        wrong_sentence: "虽然他很聪明，所以不努力。",
        correct_sentence: "虽然他很聪明，但是不努力。",
        error_point: { vi: "Dùng nhầm liên từ kết quả 所以 thay vì liên từ chuyển ngoặt 但是.", ja: "「虽然」の相手に因果の「所以」を使ってしまった誤文。", en: "Using 所以 instead of 但是 with 虽然." },
        explanation: { vi: "Cặp liên từ chuẩn là 虽然...但是...", ja: "「虽然……但是……」のペアに修正します。", en: "Must be 虽然...但是..." }
      }
    ],
    quiz: [
      {
        id: "qz_sui_1",
        question: { vi: "Trong tiếng Trung, có được dùng cả 虽然 và 但是 trong cùng một câu không?", ja: "中国語では同一文中に「虽然」と「但是」を両方使ってもいいですか？", en: "Can 虽然 and 但是 appear together in the same sentence in Chinese?" },
        options: [
          { text: { vi: "Được, đây là cấu trúc câu ghép hoàn toàn chuẩn mực và phổ biến", ja: "はい、中国語では両方呼応させて使うのが極めて一般的で正しい", en: "Yes, pairing them together is standard and natural in Chinese" }, correct: true },
          { text: { vi: "Không được, giống như tiếng Anh chỉ được giữ một từ", ja: "いいえ、英語と同じく片方しか使えない", en: "No, only one of them is allowed like in English" }, correct: false }
        ],
        explanation: { vi: "Tiếng Trung rất chuộng các cặp liên từ sóng đôi (mặc dù... nhưng...).", ja: "中国語では呼応連詞として対で用いるのが自然です。", en: "Chinese welcomes paired conjunctions." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "虽然...但是...: Cặp liên từ nhượng bộ - chuyển ngoặt (Tuy... nhưng...); dùng cả hai từ cùng lúc.",
        ja: "虽然……但是……：譲歩と逆接の定型呼応複文（〜だが、しかし〜）。",
        en: "虽然...但是...: Concessive sentence pattern ('Although... but...'); both words are used together."
      },
      remember: [
        { vi: "Không nhầm lẫn 虽然...但是... (nghịch lý) với 因为...所以... (nhân quả).", ja: "「因为……所以……」との混同に注意。", en: "Don't confuse with 因为...所以... (cause-effect)." }
      ]
    }
  },

  // 19. hsk2_verb_reduplication
  {
    id: "hsk2_verb_reduplication",
    level: "HSK2",
    level_num: 2,
    category: "reduplication",
    difficulty: 2,
    frequency: 5,
    register: "spoken",
    keywords: ["动词重叠", "AA", "A一A", "一下", "verb reduplication", "lặp lại động từ", "thử làm gì"],
    formula: "Động từ đơn âm: AA / A一A  |  Động từ 2 âm: ABAB  |  V + 一下",
    formula_plain: {
      vi: "Động từ lặp lại (看看, 看一看, 听听) hoặc V + 一下 (Biểu thị thử làm, làm một lát, giảm nhẹ ngữ khí)",
      ja: "動詞の重ね型（看看・看一看・商量商量）／動詞＋一下（ちょっと〜してみる）",
      en: "Verb Reduplication (AA / A一A / ABAB) or V + 一下 (Do a bit, try doing, soften tone)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ lặp lại / V+一下", ja: "動詞重ね型", en: "Reduplicated Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Tân ngữ", ja: "目的語", en: "Object" }, role: "object", color: "#F59E0B" }
    ],
    related_ids: ["hsk1_bu_negation"],
    confusable_with: [
      {
        id: "hsk1_bu_negation",
        diff: {
          vi: "Động từ lặp lại CHỈ dùng cho hành động diễn ra trong thời gian ngắn hoặc thử nghiệm. KHÔNG lặp lại động từ khi hành động đang tiếp diễn hoặc kéo dài.",
          ja: "動詞重ね型は「短時間」「試み」にのみ使い、進行中の動作や継続的動作には使えません。",
          en: "Verb reduplication signifies brief action or trying; cannot be used for progressive actions."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Lặp lại động từ (AA / A一A / ABAB) và cấu trúc V + 一下",
        concept: "Dùng để biểu thị hành động diễn ra trong thời gian ngắn, thử làm một việc gì đó, hoặc làm cho ngữ khí câu nói trở nên nhẹ nhàng, lịch sự hơn.",
        grammar_notes: [
          "Động từ đơn âm tiết: 看看 (kankan), 看一看 (kàn yí kàn), 看了一下 (đã xem qua một chút).",
          "Động từ hai âm tiết: Lặp lại theo dạng ABAB (Ví dụ: 休息休息, 学习学习).",
          "Đi kèm 一下: 等一下 (đợi một chút), 看一下 (xem qua một chút).",
          "Âm tiết thứ 2 khi lặp lại luôn đọc thanh nhẹ (kànkan, xiǎngxiang)."
        ],
        pedagogical_tips: "Nhấn mạnh tác dụng làm mềm ngữ khí câu cầu khiến trong giao tiếp."
      },
      ja: {
        title: "動詞の重ね型（AA・A一A・ABAB）と「動詞＋一下」",
        concept: "動作の時間が短いこと（ちょっと〜する）、試み（〜してみる）、語気緩和（表現を柔らかくする）を表します。",
        grammar_notes: [
          "単音節動詞：看看（kànkan）、看一看（kàn yí kàn）。重ねた2文字目は軽声になる。",
          "2音節動詞：ABAB型（例：介绍介绍、商量商量）。",
          "「一下」を添える形：等一下（ちょっと待って）、看一下（ちょっと見て）。"
        ],
        pedagogical_tips: "依頼文や指示を柔らかくする丁寧なニュアンスを体感させます。"
      },
      en: {
        title: "Verb Reduplication and V + 一下",
        concept: "Indicates that an action is brief, casual, or tentative ('a little bit' / 'give it a try'), softening the tone.",
        grammar_notes: [
          "Monosyllabic verbs: AA (看看 kànkan) or A一A (看一看). The second syllable is neutral tone.",
          "Disyllabic verbs: ABAB pattern (e.g. 休息休息, 讨论讨论).",
          "V + 一下 is functionally similar: 等一下 (wait a second), 听一下 (listen for a moment).",
          "Softens imperatives and requests significantly."
        ],
        pedagogical_tips: "Highlight the polite and softening effect in everyday conversation."
      }
    },
    fill_template: {
      template_zh: "请大家等{reduplication}，老师马上就来。",
      template_vi: "Xin mọi người hãy đợi {reduplication}, thầy giáo đến ngay đây.",
      slots: [
        { name: "reduplication", type: "modifier", options: ["一下", "一等", "了", "在"] }
      ]
    },
    collocations: [
      { pattern: "看一下", pinyin: "kàn yíxià", meaning_vi: "Xem một chút", meaning_en: "Take a look" },
      { pattern: "尝一尝", pinyin: "cháng yi cháng", meaning_vi: "Nếm thử một chút", meaning_en: "Taste a bit" }
    ],
    examples: [
      {
        zh: "你尝尝这个蛋糕，味道好极了。",
        pinyin: "Nǐ chángchang zhè ge dàngāo, wèidào hǎo jí le.",
        translations: { vi: "Bạn nếm thử chiếc bánh kem này đi, vị ngon tuyệt cú mèo.", ja: "このケーキちょっと食べてみて、最高に美味しいよ。", en: "Try a taste of this cake; it tastes amazing." },
        literal_en: "You taste-taste this cake, taste good extremely particle.",
        scenario: { vi: "Mời bạn bè ăn thử đồ ngon", ja: "美味しいスイーツを味見させる", en: "Offering food sample" },
        tone_tip: { vi: "Chữ 尝 thứ hai đọc thanh nhẹ (chángchang).", ja: "2つ目の「尝」は軽声で短く読みます。", en: "Second syllable is neutral tone." },
        word_order_diff: { vi: "Lặp lại động từ mang nghĩa 'nếm thử'.", ja: "「ちょっと味見する」の親密なニュアンス。", en: "Expresses 'taste casually / give it a try'." },
        note: { vi: "Giúp câu mời mọc trở nên thân mật, không mang tính ép buộc.", ja: "相手に強制感を与えない親しみやすい誘い表現です。", en: "Friendly, non-imposing invitation." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "尝尝", pinyin: "chángchang", han_viet: "thường thường", ja_kanji: "味見する", literal_en: "taste a bit", block_role: "verb" },
          { hanzi: "这个", pinyin: "zhè ge", han_viet: "giá cá", ja_kanji: "この", literal_en: "this", block_role: "attributive" },
          { hanzi: "蛋糕", pinyin: "dàngāo", han_viet: "đản cao", ja_kanji: "ケーキ", literal_en: "cake", block_role: "object" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "味道", pinyin: "wèidào", han_viet: "vị đạo", ja_kanji: "味", literal_en: "flavor", block_role: "subject" },
          { hanzi: "好极了", pinyin: "hǎo jí le", han_viet: "hảo cực liễu", ja_kanji: "最高に良い", literal_en: "extremely good", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_red_1",
        prompt: { vi: "Sắp xếp: 'Cho tôi xem chiếc áo này một chút.'", ja: "並べ替え：「この服をちょっと見せてください。」", en: "Unscramble: 'Let me take a look at this clothing.'" },
        correct_order: ["让", "我", "看", "一下", "这件", "衣服", "。"],
        tokens: ["衣服", "一下", "看", "这件", "我", "让", "。"],
        explanation: { vi: "让 + 我 + V (看) + 一下 + Tân ngữ (这件衣服).", ja: "让我＋看＋一下＋这件衣服の構成です。", en: "让 + 我 + Verb + 一下 + Object." }
      }
    ],
    fill_blank: [
      {
        id: "fb_red_1",
        sentence_zh: "这件事我们明天再{blank}吧。",
        answer: "商量商量",
        options: ["商量商量", "商商量量", "商量一下商量", "商量了商量"],
        explanation: { vi: "Động từ 2 âm tiết 商量 lặp lại theo dạng ABAB: 商量商量.", ja: "2音節動詞の重ね型は「ABAB」なので「商量商量」が正解です。", en: "Two-syllable verbs follow ABAB: 商量商量." }
      }
    ],
    error_correction: [
      {
        id: "ec_red_1",
        wrong_sentence: "请大家介绍介绍一下自己。",
        correct_sentence: "请大家介绍一下自己。",
        error_point: { vi: "Dùng trùng lặp cả dạng lặp lại 介绍介绍 lẫn 一下.", ja: "「ABAB」の重ね型と「一下」を重複して使ってしまった誤文。", en: "Redundant combination of verb reduplication AND 一下." },
        explanation: { vi: "Chỉ chọn một trong hai: 介绍介绍 hoặc 介绍一下.", ja: "どちらか一方を選びます（介绍一下 自己）。", en: "Choose either 介绍介绍 or 介绍一下; never both." }
      }
    ],
    quiz: [
      {
        id: "qz_red_1",
        question: { vi: "Động từ hai âm tiết 学习 (học tập) khi lặp lại sẽ có dạng nào?", ja: "2音節動詞「学习」の重ね型として正しいのは？", en: "What is the reduplication pattern for the disyllabic verb 学习?" },
        options: [
          { text: { vi: "学习学习 (Dạng ABAB)", ja: "学习学习（ABAB型）", en: "学习学习 (ABAB pattern)" }, correct: true },
          { text: { vi: "学学习习 (Dạng AABB)", ja: "学学习习（AABB型）", en: "学学习习 (AABB pattern)" }, correct: false }
        ],
        explanation: { vi: "Động từ 2 âm tiết luôn lặp ABAB; AABB là dạng của tính từ.", ja: "動詞はABAB型。AABB型は形容詞の重ね型です。", en: "Verbs follow ABAB; AABB is reserved for adjectives." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Động từ lặp lại (AA / A一A / ABAB) & V + 一下: Làm thử một chút, thời gian ngắn, làm mềm ngữ khí câu.",
        ja: "動詞の重ね型（AA/A一A/ABAB）＆ 動詞＋一下：ちょっと試す・短時間・語気を柔らかくする。",
        en: "Verb reduplication & V + 一下: Expresses brief/tentative action and softens the tone."
      },
      remember: [
        { vi: "Không dùng cả lặp lại lẫn 一下 cùng lúc (sai: 看看一下).", ja: "「看看一下」のように重ね型と「一下」を併用しない。", en: "Do not combine reduplication with 一下 simultaneously." }
      ]
    }
  },

  // 20. hsk2_shi_de_emphasis
  {
    id: "hsk2_shi_de_emphasis",
    level: "HSK2",
    level_num: 2,
    category: "sentence_pattern",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["是...的", "shì...de", "cấu trúc nhấn mạnh", "nhấn mạnh thời gian địa điểm", "cleft sentence"],
    formula: "S + 是 + [Thời gian / Nơi chốn / Phương thức / Người thực hiện] + V + 的",
    formula_plain: {
      vi: "Chủ ngữ + 是 + [Thành phần cần nhấn mạnh] + Động từ + 的",
      ja: "主語 ＋ 是 ＋［時間／場所／方法／動作主］＋ 動詞 ＋ 的（過去の既発生事態の詳細強調）",
      en: "Subject + 是 + [Time / Place / Manner / Agent] + Verb + 的 (Past detail emphasis)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ 是", ja: "強調辞 是", en: "Emphasis Marker 是" }, role: "copula", color: "#EC4899" },
      { label: { vi: "Thành phần nhấn mạnh", ja: "強調対象（時間・場所・方式）", en: "Emphasized Element" }, role: "modifier", color: "#8B5CF6" },
      { label: { vi: "Động từ chính", ja: "主動詞", en: "Main Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ 的", ja: "語気助詞 的", en: "Sentence Final 的" }, role: "particle", color: "#F59E0B" }
    ],
    related_ids: ["hsk1_shi_sentence"],
    confusable_with: [
      {
        id: "hsk1_shi_sentence",
        diff: {
          vi: "是...的 CHỈ dùng cho hành động ĐÃ XẢY RA nhằm nhấn mạnh thời gian, địa điểm, cách thức. Phủ định bắt buộc là 不是...的 (đặt 不是 trước thông tin nhấn mạnh).",
          ja: "「是……的」はすでに発生済みの過去の出来事に対して、いつ・どこで・どのように行われたかを強調する構文です。",
          en: "Used strictly for PAST events to highlight when, where, how, or by whom an action occurred."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc nhấn mạnh 是……的 (shì...de)",
        concept: "Dùng để nhấn mạnh chi tiết (thời gian, địa điểm, phương thức, mục đích hoặc tác nhân) của một hành động đã diễn ra trong quá khứ.",
        grammar_notes: [
          "Nhấn mạnh thời gian: 我是昨天来的。 (Tôi đến vào ngày hôm qua đấy).",
          "Nhấn mạnh địa điểm: 我们是在北京认识的。 (Chúng tôi quen nhau ở Bắc Kinh).",
          "Nhấn mạnh phương thức: 他是坐飞机来的。 (Anh ấy đến bằng máy bay).",
          "Phủ định: Đặt 不 trước 是 -> S + 不是 + [Chi tiết] + V + 的 (Ví dụ: 我不是一个人来的).",
          "Trong câu khẳng định, chữ 是 có thể lược bỏ (我昨天来的), nhưng trong câu phủ định bắt buộc phải giữ 不是."
        ],
        pedagogical_tips: "Cực kỳ lưu ý: Cấu trúc này không dùng cho hành động chưa xảy ra trong tương lai."
      },
      ja: {
        title: "強調構文「是……的」（過去の状況の特定）",
        concept: "すでに完了した動作について、「いつ・どこで・どのように・誰と」行われたかという状況細部を強調する構文です。",
        grammar_notes: [
          "時間の強調：我是上个月买的。（先月買ったのです）",
          "場所の強調：我们是在学校认识的。（私たちは学校で知り合いました）",
          "手段の強調：他是坐火车去的。（彼は列車で行きました）",
          "否定形：必ず「不是……的」（例：我不是坐飞机来的）。",
          "肯定文では「是」を省略できますが、否定文の「不是」は省略不可。"
        ],
        pedagogical_tips: "「過去の出来事」が前提条件であることを忘れずに指導してください。"
      },
      en: {
        title: "The 是...的 Construction (Detail Emphasis)",
        concept: "Used when the past occurrence of an action is already known, to emphasize specific circumstances such as time, location, manner, or agent.",
        grammar_notes: [
          "Time: 我是去年结婚的。 (It was last year that I got married).",
          "Location: 这本书是在图书馆借的。 (This book was borrowed from the library).",
          "Manner: 我是走路来的。 (I came on foot).",
          "Negation: Always S + 不是 + [Detail] + V + 的.",
          "In affirmative sentences, 是 is often optionally omitted, but 不是 is mandatory in negative statements."
        ],
        pedagogical_tips: "The action MUST have already happened in the past."
      }
    },
    fill_template: {
      template_zh: "我们是在大学里{pattern}。",
      template_vi: "Chúng tôi quen nhau ở trường đại học {pattern}.",
      slots: [
        { name: "pattern", type: "verb", options: ["认识的", "认识了", "认识过"] }
      ]
    },
    collocations: [
      { pattern: "什么时候来的？", pinyin: "shénme shíhou lái de?", meaning_vi: "Đến từ lúc nào vậy?", meaning_en: "When did you arrive?" },
      { pattern: "在哪儿买的？", pinyin: "zài nǎr mǎi de?", meaning_vi: "Mua ở đâu vậy?", meaning_en: "Where was it bought?" }
    ],
    examples: [
      {
        zh: "我是坐地铁来的。",
        pinyin: "Wǒ shì zuò dìtiě lái de.",
        translations: { vi: "Tôi đến bằng tàu điện ngầm đấy.", ja: "私は地下鉄で来たのです。", en: "I came by subway." },
        literal_en: "I am take subway come particle.",
        scenario: { vi: "Giải thích cách thức đi lại", ja: "移動手段の説明", en: "Explaining transit method" },
        tone_tip: { vi: "Chữ 的 đọc thanh nhẹ (de).", ja: "「的」は軽声で発音します。", en: "的 is pronounced de." },
        word_order_diff: { vi: "Cấu trúc 是 + [Phương thức: 坐地铁] + 动词 (来) + 的.", ja: "「是＋手段＋動詞＋的」の並びです。", en: "Highlights manner 坐地铁." },
        note: { vi: "Hành động đến (来) đã xảy ra rồi.", ja: "すでに到着していることが前提です。", en: "Past arrival is already established." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", literal_en: "I", block_role: "subject" },
          { hanzi: "是", pinyin: "shì", han_viet: "thị", ja_kanji: "是", literal_en: "marker", block_role: "copula" },
          { hanzi: "坐地铁", pinyin: "zuò dìtiě", han_viet: "tọa địa thiết", ja_kanji: "地下鉄に乗る", literal_en: "take subway", block_role: "modifier" },
          { hanzi: "来", pinyin: "lái", han_viet: "lai", ja_kanji: "来る", literal_en: "come", block_role: "verb" },
          { hanzi: "的", pinyin: "de", han_viet: "đích", ja_kanji: "の", literal_en: "particle", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_shide_1",
        prompt: { vi: "Sắp xếp: 'Quyển sách này tôi mua ở Bắc Kinh.'", ja: "並べ替え：「この本は私が北京で買ったものです。」", en: "Unscramble: 'This book was bought in Beijing by me.'" },
        correct_order: ["这", "本", "书", "是", "在", "北京", "买", "的", "。"],
        tokens: ["北京", "在", "买", "书", "这", "本", "的", "是", "。"],
        explanation: { vi: "Chủ ngữ (这本书) + 是 + Địa điểm (在北京) + V (买) + 的.", ja: "主語＋是＋場所＋動詞＋的の語順です。", en: "Subject + 是 + Place + Verb + 的." }
      }
    ],
    fill_blank: [
      {
        id: "fb_shide_1",
        sentence_zh: "这件毛衣不是妈妈买的，{blank}妈妈自己织的。",
        answer: "是",
        options: ["是", "在", "有", "就"],
        explanation: { vi: "Đối lập khẳng định trong cấu trúc 是...的: 不是... 是...", ja: "「不是……是……的」の対比構文です。", en: "Balances 不是 with 是." }
      }
    ],
    error_correction: [
      {
        id: "ec_shide_1",
        wrong_sentence: "我没是坐飞机来的。",
        correct_sentence: "我不是坐飞机来的。",
        error_point: { vi: "Dùng 没 để phủ định cấu trúc 是...的 (没是).", ja: "「是……的」の否定に「没」を使ってしまった誤り。", en: "Negating 是...的 with 没 instead of 不." },
        explanation: { vi: "Phủ định của 是...的 luôn là 不是...的.", ja: "否定は必ず「不是……的」とします。", en: "Always negate with 不是." }
      }
    ],
    quiz: [
      {
        id: "qz_shide_1",
        question: { vi: "Cấu trúc 是……的 có thể dùng để nhấn mạnh một sự việc sắp xảy ra vào tuần sau không?", ja: "「是……的」構文を、来週予定されている未来の出来事の強調に使えますか？", en: "Can the 是...的 pattern be used to emphasize an action taking place next week?" },
        options: [
          { text: { vi: "Không thể, cấu trúc này chỉ dùng cho sự việc ĐÃ HOÀN THÀNH trong quá khứ", ja: "いいえ、過去にすでに発生・完了した事態にしか使えません", en: "No, it is strictly reserved for actions that already occurred in the past" }, correct: true },
          { text: { vi: "Có thể, dùng cho cả quá khứ và tương lai", ja: "はい、未来の計画にも使えます", en: "Yes, it works for future events too" }, correct: false }
        ],
        explanation: { vi: "Điều kiện tiên quyết của 是...的 là hành động đã diễn ra trong quá khứ.", ja: "過去の確定した事態の詳細説明が本質です。", en: "Past occurrence is a prerequisite." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 是 + [Thời gian/Địa điểm/Phương thức] + V + 的: Nhấn mạnh chi tiết của hành động QUÁ KHỨ; phủ định là 不是...的.",
        ja: "主語＋是＋[時間/場所/方法]＋動詞＋的：過去の既発生事態の詳細強調。否定は「不是……的」。",
        en: "S + 是 + [Detail] + V + 的: Emphasizes circumstances of PAST events; negated with 不是...的."
      },
      remember: [
        { vi: "Chỉ dùng cho sự việc đã xảy ra; phủ định luôn là 不是...的 (không dùng 没).", ja: "過去の出来事限定。否定は必ず「不是」。", en: "Past events only; always negate with 不是." }
      ]
    }
  },

  // 21. hsk2_preposition_cong_dao_li_dui
  {
    id: "hsk2_preposition_cong_dao_li_dui",
    level: "HSK2",
    level_num: 2,
    category: "preposition",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["从", "到", "离", "对", "向", "往", "cóng", "dào", "lí", "duì", "xiàng", "wǎng", "giới từ thông dụng", "prepositions"],
    formula: "S + Giới từ (从...到... / 离 / 对 / 向 / 往) + Tân ngữ giới từ + V",
    formula_plain: {
      vi: "Chủ ngữ + Cụm giới từ (Từ... đến... / Cách / Đối với / Hướng về) + Động từ",
      ja: "主語 ＋ 介詞句（从…到…・离・对・向・往＋名詞）＋ 動詞",
      en: "Subject + Prepositional Phrase (从...到... / 离 / 对 / 向 / 往 + Object) + Verb"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Cụm giới từ", ja: "介詞句（前置詞句）", en: "Prepositional Phrase" }, role: "preposition", color: "#EC4899" },
      { label: { vi: "Vị ngữ động từ", ja: "動詞述語", en: "Verb Predicate" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_zai_existence_location"],
    confusable_with: [
      {
        id: "hsk1_zai_existence_location",
        diff: {
          vi: "Phân biệt 离 (khoảng cách) và 从 (điểm xuất phát): 离 dùng để đo cự ly giữa 2 điểm (A 离 B 很远 - A cách B rất xa). 从 chỉ điểm bắt đầu di chuyển (从北京出发).",
          ja: "「离」は2地点間の距離（A离B很近）。「从」は移動の起点（从家出发）。",
          en: "离 measures distance between two points (A 离 B); 从 indicates starting origin (从 A 到 B)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Các giới từ thông dụng: 从...到... (từ... đến...), 离 (cách), 对 (đối với), 往/向 (hướng về)",
        concept: "Giới từ trong tiếng Trung kết hợp với danh từ để tạo thành cụm giới từ, và cụm giới từ này luôn ĐỨNG TRƯỚC ĐỘNG TỪ chính để làm trạng ngữ.",
        grammar_notes: [
          "从...到...: Từ nơi nào đến nơi nào, hoặc từ thời gian nào đến thời gian nào (从早上到晚上).",
          "A 离 B + (很远 / 很近 / Có khoảng cách cụ thể): Trường học cách nhà tôi rất gần (学校离我家很近).",
          "对...: Đối với ai/cái gì (跑步对身体很好 - Chạy bộ rất tốt cho sức khỏe).",
          "往 / 向 + Phương hướng + V: 往前走 (Đi về phía trước), 向右拐 (Rẽ sang phải)."
        ],
        pedagogical_tips: "Nhấn mạnh trật tự: Cụm giới từ luôn đứng TRƯỚC động từ chính."
      },
      ja: {
        title: "常用介詞（前置詞）：从…到…、离、对、向、往",
        concept: "介詞は名詞と結合して「介詞句」を作り、常に動詞述語の前に置かれて連用修飾語（状語）として機能します。",
        grammar_notes: [
          "从……到……：起点と終点（時間・空間）。「从周一到周五」。",
          "A 离 B（距離の隔たり）：「学校离我家不远」（学校は私の家から遠くない）。",
          "对（対象・影響）：「牛奶对身体好」（牛乳は体に良い）。",
          "往／向（方向）：「往前走」（前へ進む）。"
        ],
        pedagogical_tips: "介詞句は常に動詞の前という基本語順（S＋介詞句＋V）を徹底定着させます。"
      },
      en: {
        title: "Common Prepositions: 从...到..., 离, 对, 向, 往",
        concept: "Prepositions form phrases with nouns and MUST precede the main verb as adverbials.",
        grammar_notes: [
          "从...到...: From... to... (in time or space): 从星期一到星期五.",
          "A 离 B: Distance between A and B: 我家离公司很近 (My home is close to the office).",
          "对: Toward / To / For: 他对我很好 (He is very kind to me).",
          "往 / 向 + Direction + Verb: 往左拐 (Turn left)."
        ],
        pedagogical_tips: "Remind students: Prepositional phrases precede the verb in Chinese."
      }
    },
    fill_template: {
      template_zh: "学校{prep}我家走路只要五分钟。",
      template_vi: "Trường học {prep} nhà tôi đi bộ chỉ mất 5 phút.",
      slots: [
        { name: "prep", type: "preposition", options: ["离", "从", "对", "往"] }
      ]
    },
    collocations: [
      { pattern: "从早到晚", pinyin: "cóng zǎo dào wǎn", meaning_vi: "Từ sáng đến tối", meaning_en: "From morning to night" },
      { pattern: "往前走", pinyin: "wǎng qián zǒu", meaning_vi: "Đi thẳng về phía trước", meaning_en: "Walk straight ahead" }
    ],
    examples: [
      {
        zh: "多吃水果对身体很好。",
        pinyin: "Duō chī shuǐguǒ duì shēntǐ hěn hǎo.",
        translations: { vi: "Ăn nhiều hoa quả rất tốt cho sức khỏe.", ja: "果物を多く食べることは体にとても良いです。", en: "Eating more fruit is very good for health." },
        literal_en: "More eat fruit towards body very good.",
        scenario: { vi: "Khuyên bảo chế độ dinh dưỡng", ja: "健康管理のアドバイス", en: "Health advice" },
        tone_tip: { vi: "对 mang thanh 4 (duì).", ja: "「对」は第4声です。", en: "Pronounced duì." },
        word_order_diff: { vi: "Cụm 对身体 (đối với sức khỏe) đứng trước vị ngữ 很好.", ja: "「对身体」が述語「很好」の前に置かれます。", en: "Prepositional phrase precedes 很好." },
        note: { vi: "Mẫu câu 对...好 cực kỳ thông dụng trong đời sống.", ja: "健康・人間関係の定番フレーズです。", en: "Extremely common life expression." },
        tokens: [
          { hanzi: "多吃", pinyin: "duō chī", han_viet: "đa hát", ja_kanji: "多く食べる", literal_en: "eat more", block_role: "subject" },
          { hanzi: "水果", pinyin: "shuǐguǒ", han_viet: "thủy quả", ja_kanji: "果物", literal_en: "fruit", block_role: "object" },
          { hanzi: "对", pinyin: "duì", han_viet: "đối", ja_kanji: "対して", literal_en: "for/towards", block_role: "preposition" },
          { hanzi: "身体", pinyin: "shēntǐ", han_viet: "thân thể", ja_kanji: "体", literal_en: "body/health", block_role: "object" },
          { hanzi: "很", pinyin: "hěn", han_viet: "hẩn", ja_kanji: "とても", literal_en: "very", block_role: "adverb" },
          { hanzi: "好", pinyin: "hǎo", han_viet: "hảo", ja_kanji: "良い", literal_en: "good", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_prep_1",
        prompt: { vi: "Sắp xếp: 'Nhà tôi cách công ty rất xa.'", ja: "並べ替え：「私の家は会社からとても遠いです。」", en: "Unscramble: 'My home is very far from the company.'" },
        correct_order: ["我", "家", "离", "公司", "很", "远", "。"],
        tokens: ["很", "公司", "我", "家", "远", "离", "。"],
        explanation: { vi: "A (我家) + 离 + B (公司) + 很 + Tính từ (远).", ja: "A＋离＋B＋很＋形容詞の距離構文です。", en: "A + 离 + B + 很 + Far." }
      }
    ],
    fill_blank: [
      {
        id: "fb_prep_1",
        sentence_zh: "前面那个路口请{blank}右拐。",
        answer: "往",
        options: ["往", "离", "从", "对"],
        explanation: { vi: "Chỉ phương hướng rẽ sang phải (右拐) dùng 往 hoặc 向.", ja: "方向を示す「〜へ曲がる」には「往」を用います。", en: "Indicating directional turn takes 往." }
      }
    ],
    error_correction: [
      {
        id: "ec_prep_1",
        wrong_sentence: "我家从学校很近。",
        correct_sentence: "我家离学校很近。",
        error_point: { vi: "Dùng nhầm giới từ 从 thay vì 离 để diễn tả cự ly giữa hai địa điểm.", ja: "2地点間の距離の表現に「从」を使ってしまっている誤り。", en: "Using 从 instead of 离 to state distance." },
        explanation: { vi: "Diễn tả khoảng cách A cách B phải dùng 离 (我家离学校很近).", ja: "距離の隔たりは「A离B」と表現します。", en: "Distance requires 离: A 离 B 很近." }
      }
    ],
    quiz: [
      {
        id: "qz_prep_1",
        question: { vi: "Khi muốn hỏi 'Từ đây đến sân bay mất bao lâu?', dùng mẫu câu nào chuẩn?", ja: "「ここから空港までどのくらいかかりますか？」の正しい中国語は？", en: "How do you ask 'How long does it take from here to the airport?'" },
        options: [
          { text: { vi: "从这里到机场要多长时间？", ja: "从这里到机场要多长时间？", en: "从这里到机场要多长时间？" }, correct: true },
          { text: { vi: "离这里到机场要多长时间？", ja: "离这里到机场要多长时间？", en: "离这里到机场要多长时间？" }, correct: false }
        ],
        explanation: { vi: "Điểm đầu đến điểm cuối dùng cặp 从...到...", ja: "「〜から〜まで」は「从……到……」を用います。", en: "Starting point to destination uses 从...到..." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Cụm giới từ (从...到... / 离 / 对 / 往 + Danh từ) luôn đứng TRƯỚC ĐỘNG TỪ chính trong câu.",
        ja: "介詞句（从…到…・离・对・往）は常に主動詞の前に置いて連用修飾語とする。",
        en: "Prepositional phrases always precede the main verb in Chinese sentences."
      },
      remember: [
        { vi: "Khoảng cách dùng A 离 B (không dùng 从); hướng di chuyển dùng 往/向.", ja: "距離は「A离B」、移動方向は「往/向」。", en: "Use 离 for distance between A and B; use 往/向 for direction." }
      ]
    }
  },

  // 22. hsk2_bie_bu_yao_imperative
  {
    id: "hsk2_bie_bu_yao_imperative",
    level: "HSK2",
    level_num: 2,
    category: "negation",
    difficulty: 2,
    frequency: 5,
    register: "spoken",
    keywords: ["别", "不要", "bié", "búyào", "cầu khiến phủ định", "đừng", "don't"],
    formula: "别 / 不要 + Động từ (+ Tân ngữ) (+ 了)",
    formula_plain: {
      vi: "别 / 不要 + Động từ (+ 了) (Đừng làm gì / Đừng làm gì nữa)",
      ja: "别／不要 ＋ 動詞（＋了）（〜しないでください、もう〜するのはやめて）",
      en: "别 / 不要 + Verb (+ 了) (Don't do... / Stop doing...)"
    },
    structure_blocks: [
      { label: { vi: "Phó từ cấm đoán 别/不要", ja: "禁止副詞 别／不要", en: "Prohibitive Adverb" }, role: "negation", color: "#EF4444" },
      { label: { vi: "Động từ hành động", ja: "動作動詞", en: "Action Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ ngữ khí 了 (ngừng lại)", ja: "語気助詞 了（制止）", en: "Sentence Final 了" }, role: "particle", color: "#8B5CF6" }
    ],
    related_ids: ["hsk1_bu_negation", "hsk1_le_modal_change"],
    confusable_with: [
      {
        id: "hsk1_bu_negation",
        diff: {
          vi: "不 là phủ định sự thật hoặc ý chí (我不去 - Tôi không đi). 别/不要 là câu cầu khiến ngăn cản người khác làm gì (你别去 - Bạn đừng đi).",
          ja: "「不」は自己の否定。「别／不要」は相手に対する禁止・制止の命令・依頼表現。",
          en: "不 is indicative negation; 别 / 不要 is prohibitive imperative commanding others not to do something."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu cầu khiến phủ định: 别 / 不要……(了) (Đừng…… nữa)",
        concept: "Dùng để khuyên can, ngăn chặn hoặc cấm đoán người khác thực hiện một hành động.",
        grammar_notes: [
          "别 và 不要 hoàn toàn đồng nghĩa, trong khẩu ngữ 别 được dùng phổ biến và ngắn gọn hơn.",
          "Khi có trợ từ 了 ở cuối câu: 别 + V + 了 mang nghĩa 'Đừng làm việc đó nữa!' (ngăn chặn hành động đang diễn ra, ví dụ: 别说了 - Đừng nói nữa!).",
          "Thêm trợ từ ngữ khí 吧 ở cuối để câu nhẹ nhàng, lịch sự hơn: 别客气吧."
        ],
        pedagogical_tips: "Chỉ rõ sự khác biệt tinh tế: 别 + V (chưa làm, khuyên đừng làm) vs 别 + V + 了 (đang làm, yêu cầu dừng lại)."
      },
      ja: {
        title: "禁止の命令表現「别／不要……（了）」",
        concept: "相手に対して「〜しないで」「〜するな」と禁止・制止を促す命令・依頼表現です。",
        grammar_notes: [
          "「别」と「不要」は同義ですが、口語では「别」がより簡潔で多用されます。",
          "文末に「了」がつく場合：「别……了」で「もう〜するのはやめて！」（現在行われている動作の制止を表す。例：别哭了＝もう泣かないで）。"
        ],
        pedagogical_tips: "「别＋動詞＋了」が『現在の動作をやめさせる』ニュアンスを持つ点に注目させます。"
      },
      en: {
        title: "Prohibitive Imperatives: 别 / 不要……(了)",
        concept: "Used to urge, advise, or command someone not to do something ('Don't...').",
        grammar_notes: [
          "别 and 不要 are synonymous; 别 is more casual and common in spoken Chinese.",
          "When combined with sentence-final 了: 别 + V + 了 means 'Stop doing that!' (halting an ongoing action, e.g. 别抽烟了 - Stop smoking!).",
          "Add 吧 at the end to make the request friendlier: 别着急吧."
        ],
        pedagogical_tips: "Highlight that 别...了 demands cessation of an action already taking place."
      }
    },
    fill_template: {
      template_zh: "太晚了，你{prohibition}看手机了，快睡觉吧。",
      template_vi: "Muộn quá rồi, bạn {prohibition} xem điện thoại nữa, mau ngủ đi.",
      slots: [
        { name: "prohibition", type: "negation", options: ["别", "不要", "没", "不"] }
      ]
    },
    collocations: [
      { pattern: "别客气", pinyin: "bié kèqi", meaning_vi: "Đừng khách sáo / Không có chi", meaning_en: "Don't mention it / You're welcome" },
      { pattern: "别担心", pinyin: "bié dānxīn", meaning_vi: "Đừng lo lắng", meaning_en: "Don't worry" }
    ],
    examples: [
      {
        zh: "时间还早，你别着急。",
        pinyin: "Shíjiān hái zǎo, nǐ bié zháojí.",
        translations: { vi: "Thời gian vẫn còn sớm, bạn đừng sốt ruột.", ja: "時間はまだ早いです、焦らないでください。", en: "It's still early; don't worry." },
        literal_en: "Time still early, you don't worry.",
        scenario: { vi: "An ủi, khuyên bạn bình tĩnh", ja: "焦る相手をなだめる", en: "Reassuring a friend" },
        tone_tip: { vi: "别 mang thanh 2 (bié).", ja: "「别」は第2声です。", en: "Pronounced bié." },
        word_order_diff: { vi: "Đừng (别) + Sốt ruột (着急).", ja: "「别＋動詞」で直接禁止・助言を表します。", en: "别 directly precedes verb/adjective zháojí." },
        note: { vi: "Khuyên bảo lịch sự trong đời thường.", ja: "日常の気遣いで極めてよく使われます。", en: "Gentle and caring everyday advice." },
        tokens: [
          { hanzi: "时间", pinyin: "shíjiān", han_viet: "thời gian", ja_kanji: "時間", literal_en: "time", block_role: "subject" },
          { hanzi: "还", pinyin: "hái", han_viet: "hoàn", ja_kanji: "まだ", literal_en: "still", block_role: "adverb" },
          { hanzi: "早", pinyin: "zǎo", han_viet: "tảo", ja_kanji: "早い", literal_en: "early", block_role: "predicate" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "别", pinyin: "bié", han_viet: "biệt", ja_kanji: "〜するな", literal_en: "don't", block_role: "negation" },
          { hanzi: "着急", pinyin: "zháojí", han_viet: "trước cấp", ja_kanji: "焦る", literal_en: "worry/anxious", block_role: "verb" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_bie_1",
        prompt: { vi: "Sắp xếp: 'Đừng nói nữa, nghe cô giáo giảng bài đi.'", ja: "並べ替え：「もう話さないで、先生の講義を聞きなさい。」", en: "Unscramble: 'Stop talking and listen to the teacher.'" },
        correct_order: ["别", "说话", "了", "，", "听", "老师", "讲课", "。"],
        tokens: ["讲课", "别", "听", "了", "说话", "老师", "，", "。"],
        explanation: { vi: "别 + V (说话) + 了: Ngăn hành động nói chuyện đang diễn ra.", ja: "「别说话了」で現在のおしゃべりを制止します。", en: "别说话了 orders cessation of talking." }
      }
    ],
    fill_blank: [
      {
        id: "fb_bie_1",
        sentence_zh: "图书馆里请{blank}大声喧哗。",
        answer: "不要",
        options: ["不要", "没", "不", "别了"],
        explanation: { vi: "Lời nhắc nhở lịch sự nơi công cộng dùng 不要 hoặc 别.", ja: "公共の場の禁止標語では「不要」や「请勿」が好まれます。", en: "Polite public prohibition takes 不要." }
      }
    ],
    error_correction: [
      {
        id: "ec_bie_1",
        wrong_sentence: "你不吃了，已经很晚了。",
        correct_sentence: "你别吃了，已经很晚了。",
        error_point: { vi: "Dùng 不 thay vì 别 khi muốn khuyên can người khác dừng hành động.", ja: "相手に対する制止に「不」を使ってしまっている誤り。", en: "Using 不 instead of 别 for an imperative command." },
        explanation: { vi: "Ngăn người khác dừng ăn phải dùng 你别吃了.", ja: "制止の命令は「别……了」を用います。", en: "Use 别...了 to tell someone to stop doing something." }
      }
    ],
    quiz: [
      {
        id: "qz_bie_1",
        question: { vi: "Câu '别哭了' có hàm ý gì cụ thể?", ja: "「别哭了」という言葉の正確なニュアンスは？", en: "What is the exact nuance of '别哭了'?" },
        options: [
          { text: { vi: "Người đó đang khóc, và bạn muốn họ ngừng khóc lại ngay", ja: "相手が今現実に泣いていて、それを「泣き止んで」と制止している", en: "The person is currently crying, and you urge them to stop" }, correct: true },
          { text: { vi: "Người đó chưa khóc, bạn dặn họ sau này không được khóc", ja: "まだ泣いていない相手に、今後泣くなと忠告している", en: "Advising someone not to cry in the future" }, correct: false }
        ],
        explanation: { vi: "Cấu trúc 别...了 biểu thị việc yêu cầu đình chỉ một hành vi đang tiếp diễn.", ja: "「别……了」は進行中の動作の制止を表します。", en: "别...了 targets an ongoing activity." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "别 / 不要 + V (+ 了): Khuyên can hoặc cấm đoán; có 了 mang nghĩa 'Đừng làm việc đó nữa!'.",
        ja: "别／不要＋動詞（＋了）：禁止・制止の命令。「〜了」がつくと「もう〜するな」。",
        en: "别 / 不要 + V (+ 了): Prohibitive command; adding 了 commands 'Stop doing that!'."
      },
      remember: [
        { vi: "Phân biệt: 别去 (chưa đi, khuyên đừng đi) vs 别说了 (đang nói, bảo dừng lại).", ja: "「别＋動詞」＝未着手。「别＋動詞＋了」＝現在行っている動作の制止。", en: "别 + V = don't start; 别 + V + 了 = stop doing what you're doing." }
      ]
    }
  },

  // 23. hsk3_compound_directional_complement
  {
    id: "hsk3_compound_directional_complement",
    level: "HSK3",
    level_num: 3,
    category: "complement",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["复合趋向补语", "上来", "下去", "进来", "出来", "回来", "过去", "起来", "compound directional complement"],
    formula: "S + V + [上/下/进/出/回/过/起] + [来/去]",
    formula_plain: {
      vi: "Động từ + (上来/下去/进来/出去/回来/过去/起来) (Chỉ phương hướng cụ thể của hành động)",
      ja: "動詞 ＋ 複合方向補語（上来・下去・进来・出去・回来・过去・起来）",
      en: "Verb + Compound Directional Complement (上来/下去/进来/出去/回来/过去/起来)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ chính", ja: "本動詞", en: "Main Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Hướng chuyển động 1", ja: "第1方向要素", en: "Direction 1" }, role: "complement", color: "#EC4899" },
      { label: { vi: "Hướng người nói (来/去)", ja: "話者視点（来／去）", en: "Perspective (来/去)" }, role: "particle", color: "#8B5CF6" }
    ],
    related_ids: ["hsk2_directional_complement_simple", "hsk4_directional_complement_figurative"],
    confusable_with: [
      {
        id: "hsk2_directional_complement_simple",
        diff: {
          vi: "Bổ ngữ xu hướng đơn chỉ có 1 chữ 来 hoặc 去 (进来). Xu hướng kép kết hợp 2 yếu tố: hướng di chuyển không gian (上, 下, 进, 出, 回, 过, 起) + hướng so với người nói (来, 去).",
          ja: "単純方向補語（来・去）に対し、複合方向補語は空間的移動（上・下・進など）＋視点（来・去）を合体させたものです。",
          en: "Compound directional complements combine a directional motion (up, down, in, out) with speaker perspective (come, go)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Bổ ngữ xu hướng kép (V + 上来/下去/进来/出去/回来/过去/起来)",
        concept: "Gắn kết một động từ chỉ phương hướng (上, 下, 进, 出, 回, 过, 起) cùng với 来 hoặc 去 vào sau động từ chính để miêu tả hướng chuyển động ba chiều trong không gian.",
        grammar_notes: [
          "Bảng ghép 13 bổ ngữ kép: 上来/上去, 下来/下去, 进来/出去, 出来/出去, 回来/回去, 过来/过去, 起来 (chỉ có 起来, không có 起去).",
          "Quy tắc vị trí tân ngữ nơi chốn: BẮT BUỘC đặt giữa hai thành phần của bổ ngữ kép (Ví dụ: 跑进教室来 - Chạy vào trong lớp, KHÔNG nói 跑进来教室).",
          "Tân ngữ chỉ đồ vật: Có thể đặt sau cùng hoặc ở giữa (拿出一本书来 hoặc 拿出来一本书)."
        ],
        pedagogical_tips: "Quy tắc nơi chốn chèn vào giữa: V + [进/出/上/下...] + Nơi chốn + [来/去]."
      },
      ja: {
        title: "複合方向補語（上来・下去・进来・出去・回来・过去・起来など）",
        concept: "動詞の直後に「上・下・进・出・回・过・起」と「来／去」のペアをつけ、空間における多面的な移動軌跡を表します。",
        grammar_notes: [
          "13種の組み合わせ（※「起」は「起来」のみで「起去」は存在しない）。",
          "場所目的語のルール：必ず2文字の補語の真ん中に挟み込む（例：走下楼去、跑进教室来。❌ 跑进去教室は不可）。",
          "事物目的語：真ん中でも文末でも可。"
        ],
        pedagogical_tips: "場所目的語が「进……来」の間に挟まる鉄則を徹底演習させます。"
      },
      en: {
        title: "Compound Directional Complements",
        concept: "Combines a spatial directional verb (上, 下, 进, 出, 回, 过, 起) with 来 or 去 after the main verb to describe specific 3D trajectories.",
        grammar_notes: [
          "Forms: 上来/上去, 下来/下去, 进来/进去, 出来/出去, 回来/回去, 过来/过去, 起来 (起来 has no *起去 counterpart).",
          "Place object rule: MUST be wedged BETWEEN the two complement elements (e.g. 跑进教室来; never 跑进来教室).",
          "Item object: Can be placed in the middle or at the end."
        ],
        pedagogical_tips: "Strictly enforce: Verb + [进/出/上...] + Place + [来/去]."
      }
    },
    fill_template: {
      template_zh: "老师从包里拿{direction}一本字典。",
      template_vi: "Thầy giáo từ trong túi lấy {direction} một cuốn từ điển.",
      slots: [
        { name: "direction", type: "direction", options: ["出来", "进去", "过来", "起来"] }
      ]
    },
    collocations: [
      { pattern: "走过来", pinyin: "zǒu guò lai", meaning_vi: "Đi qua đây", meaning_en: "Walk over here" },
      { pattern: "站起来", pinyin: "zhàn qǐ lai", meaning_vi: "Đứng dậy", meaning_en: "Stand up" }
    ],
    examples: [
      {
        zh: "他从书包里拿出来一本书。",
        pinyin: "Tā cóng shūbāo lǐ ná chū lai yì běn shū.",
        translations: { vi: "Anh ấy lấy ra một quyển sách từ trong cặp.", ja: "彼はカバンの中から本を1冊取り出しました。", en: "He took out a book from his backpack." },
        literal_en: "He from backpack inside take out-come one volume book.",
        scenario: { vi: "Lấy đồ dùng học tập", ja: "持ち物を取り出す", en: "Taking out school supplies" },
        tone_tip: { vi: "Cụm 出来 đọc thanh nhẹ khi làm bổ ngữ (chū lai).", ja: "「出来」は補語のとき軽く添えるように読みます。", en: "chū lai is pronounced in a relaxed neutral manner." },
        word_order_diff: { vi: "Động từ (拿) + Bổ ngữ kép (出来) + Tân ngữ đồ vật (一本书).", ja: "動詞「拿」＋複合方向補語「出来」＋目的語。", en: "Verb + 出来 + Object." },
        note: { vi: "Chuyển động từ bên trong ra bên ngoài về phía người nói.", ja: "内部から外部、話者方向への移動を表します。", en: "Movement from inside to outside towards speaker." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "从书包里", pinyin: "cóng shūbāo lǐ", han_viet: "tòng thư bao lý", ja_kanji: "鞄の中から", literal_en: "from bag inside", block_role: "preposition" },
          { hanzi: "拿", pinyin: "ná", han_viet: "nã", ja_kanji: "持つ・取る", literal_en: "take", block_role: "verb" },
          { hanzi: "出来", pinyin: "chū lai", han_viet: "xuất lai", ja_kanji: "取り出す", literal_en: "out", block_role: "complement" },
          { hanzi: "一本书", pinyin: "yì běn shū", han_viet: "nhất bản thư", ja_kanji: "1冊の本", literal_en: "a book", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_compdir_1",
        prompt: { vi: "Sắp xếp: 'Bọn họ đều chạy vào trong phòng học rồi.'", ja: "並べ替え：「彼らはみんな教室に走り込みました。」", en: "Unscramble: 'They all ran into the classroom.'" },
        correct_order: ["他们", "都", "跑", "进", "教室", "去", "了", "。"],
        tokens: ["进", "教室", "都", "跑", "他们", "去", "了", "。"],
        explanation: { vi: "Nơi chốn (教室) phải chen vào giữa 进 và 去: 跑 + 进 + 教室 + 去.", ja: "場所「教室」は「进」と「去」の間に挟みます。", en: "Place 教室 must be placed between 进 and 去." }
      }
    ],
    fill_blank: [
      {
        id: "fb_compdir_1",
        sentence_zh: "听到铃声，同学们立刻站了{blank}。",
        answer: "起来",
        options: ["起来", "出来", "下来", "进去"],
        explanation: { vi: "Đứng dậy từ tư thế ngồi dùng 站起来.", ja: "着席状態から立ち上がる動作には「起来」を用います。", en: "Standing up from a seated position takes 起来." }
      }
    ],
    error_correction: [
      {
        id: "ec_compdir_1",
        wrong_sentence: "快走进去屋子里吧。",
        correct_sentence: "快走进屋子里去吧。",
        error_point: { vi: "Đặt nơi chốn 屋子里 ở sau 进去.", ja: "場所名詞「屋子里」を「进去」の後に置いてしまった誤り。", en: "Placing place noun after 进去." },
        explanation: { vi: "Nơi chốn bắt buộc đặt giữa 进 và 去: 走进屋子里去.", ja: "「走进屋子里去」と間に挟みます。", en: "Sandwich the place noun: 走进屋子里去." }
      }
    ],
    quiz: [
      {
        id: "qz_compdir_1",
        question: { vi: "Trong 13 bổ ngữ xu hướng kép, cụm nào KHÔNG tồn tại trong tiếng Trung?", ja: "中国語に存在しない複合方向補語はどれですか？", en: "Which combination does NOT exist in Chinese?" },
        options: [
          { text: { vi: "起去 (Chỉ có 起来, không có 起去)", ja: "起去（起来のみ存在し、起去はない）", en: "起去 (Only 起来 exists, never 起去)" }, correct: true },
          { text: { vi: "过来", ja: "过来", en: "过来" }, correct: false },
          { text: { vi: "下去", ja: "下去", en: "下去" }, correct: false }
        ],
        explanation: { vi: "Động tác hướng lên chỉ có 起来, không bao giờ có 起去.", ja: "「起」と結びつくのは「来」のみです。", en: "起 only pairs with 来, never 去." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V + [上/下/进/出/回/过/起] + [来/去]: Bổ ngữ xu hướng kép; tân ngữ nơi chốn BẮT BUỘC chèn vào giữa.",
        ja: "動詞＋[上/下/进/出/回/过/起]＋[来/去]：複合方向補語。場所目的語は必ず間に挟む。",
        en: "V + Compound Directional Complement: 3D trajectories; place objects MUST be inserted in between."
      },
      remember: [
        { vi: "Quy tắc thép: 走进教室去 (không được nói 走进去教室).", ja: "場所は真ん中：进＋場所＋来/去。", en: "Place always in the middle: V + 进/出 + Place + 来/去." }
      ]
    }
  },

  // 24. hsk3_potential_complement
  {
    id: "hsk3_potential_complement",
    level: "HSK3",
    level_num: 3,
    category: "complement",
    difficulty: 3,
    frequency: 5,
    register: "spoken",
    keywords: ["可能补语", "V得", "V不", "看得懂", "听不懂", "potential complement", "bổ ngữ khả năng"],
    formula: "Khẳng định: V + 得 + Bổ ngữ kết quả/xu hướng  |  Phủ định: V + 不 + Bổ ngữ kết quả/xu hướng",
    formula_plain: {
      vi: "V + 得 + Bổ ngữ (Có thể làm được)  |  V + 不 + Bổ ngữ (Không thể làm được)",
      ja: "肯定：動詞 ＋ 得 ＋ 補語（〜できる） ｜ 否定：動詞 ＋ 不 ＋ 補語（〜できない）",
      en: "Affirmative: V + 得 + Complement (Can...) | Negative: V + 不 + Complement (Cannot...)"
    },
    structure_blocks: [
      { label: { vi: "Động từ chính", ja: "主動詞", en: "Main Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ 得 / Phó từ 不", ja: "可能介在辞（得／不）", en: "Potential Infix (得/不)" }, role: "particle", color: "#EC4899" },
      { label: { vi: "Bổ ngữ kết quả/xu hướng", ja: "結果・方向補語", en: "Result/Direction Complement" }, role: "complement", color: "#8B5CF6" }
    ],
    related_ids: ["hsk2_resultative_complement_basic", "hsk1_modal_hui_neng_xiang"],
    confusable_with: [
      {
        id: "hsk1_modal_hui_neng_xiang",
        diff: {
          vi: "Không dùng 能/不能 khi muốn biểu thị việc đạt được kết quả cụ thể do điều kiện chủ/khách quan hạn chế. Người Trung Quốc ưu tiên dùng bổ ngữ khả năng trong khẩu ngữ: 听得懂 (nghe hiểu được) hay hơn 能听懂, 听不懂 (nghe không hiểu) hay hơn 不能听懂.",
          ja: "口語では「能听懂/不能听懂」よりも可能補語「听得懂/听不懂」の方が圧倒的に自然で多用されます。",
          en: "In spoken Chinese, potential complements (听得懂/听不懂) are strongly preferred over modal verb constructions (能听懂/不能听懂)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Bổ ngữ khả năng (V + 得/不 + Kết quả/Xu hướng)",
        concept: "Chèn chữ 得 (khẳng định: có thể) hoặc chữ 不 (phủ định: không thể) vào giữa động từ và bổ ngữ kết quả/xu hướng để biểu thị điều kiện có cho phép đạt được kết quả đó hay không.",
        grammar_notes: [
          "Khẳng định: 看得懂 (đọc hiểu được), 找得到 (tìm thấy được), 吃得完 (ăn hết được).",
          "Phủ định (rất phổ biến): 看不懂 (đọc không hiểu), 找不到 (tìm không thấy), 吃不完 (ăn không hết).",
          "Dạng câu hỏi: V + 得 + Bổ ngữ + V + 不 + Bổ ngữ？ (Ví dụ: 你听得懂听不懂？) hoặc V + 得 + Bổ ngữ + 吗？",
          "Một số bổ ngữ khả năng cố định: 买得起 / 买不起 (đủ tiền mua / không đủ tiền mua), 受得了 / 受不了 (chịu đựng nổi / không chịu nổi)."
        ],
        pedagogical_tips: "Nhấn mạnh dạng phủ định (V + 不 + Bổ ngữ) được sử dụng với tần suất cực cao trong đời sống."
      },
      ja: {
        title: "可能補語（動詞＋得／不＋結果補語・方向補語）",
        concept: "動詞と結果補語・方向補語の間に「得（肯定：〜できる）」または「不（否定：〜できない）」を挟み込み、その結果が達成可能かどうかを表します。",
        grammar_notes: [
          "肯定：看得见（見える）、听得懂（聞いて分かる）、做得到（やり遂げられる）。",
          "否定（頻出）：看不懂（読んでも分からない）、找不到（見つからない）、吃不完（食べきれない）。",
          "慣用句：买得起／买不起（経済的に買える／買えない）、受得了／受不了（我慢できる／耐えられない）。",
          "疑問形：「听得懂听不懂？」または「听得懂吗？」。"
        ],
        pedagogical_tips: "日常会話では否定形（V不C）が特に頻出することを強調します。"
      },
      en: {
        title: "Potential Complements (V + 得/不 + Complement)",
        concept: "Inserts infix 得 (affirmative: able to) or 不 (negative: unable to) between a verb and its resultative/directional complement to express capability of reaching that outcome.",
        grammar_notes: [
          "Affirmative: 看得懂 (can understand by reading), 找得到 (can find).",
          "Negative (extremely common): 看不懂 (cannot understand by reading), 找不到 (cannot find), 吃不完 (cannot finish eating).",
          "Fixed idiomatic pairs: 买得起 / 买不起 (can/cannot afford), 受得了 / 受不了 (can/cannot endure).",
          "Questions: V得C + V不C? or V得C + 吗?"
        ],
        pedagogical_tips: "Negative potential complements are vastly preferred over 不能 + V in daily Chinese."
      }
    },
    fill_template: {
      template_zh: "字太小了，我看不{infix}楚。",
      template_vi: "Chữ nhỏ quá, tôi nhìn không {infix} rõ.",
      slots: [
        { name: "infix", type: "infix", options: ["清", "了", "懂", "完"] }
      ]
    },
    collocations: [
      { pattern: "听得懂", pinyin: "tīng de dǒng", meaning_vi: "Nghe hiểu được", meaning_en: "Can understand by hearing" },
      { pattern: "做不完", pinyin: "zuò bu wán", meaning_vi: "Không làm xong xuôi được", meaning_en: "Cannot finish doing" }
    ],
    examples: [
      {
        zh: "中国人说话太快，我听不懂。",
        pinyin: "Zhōngguórén shuōhuà tài kuài, wǒ tīng bu dǒng.",
        translations: { vi: "Người Trung Quốc nói chuyện nhanh quá, tôi nghe không hiểu được.", ja: "中国人の話すスピードが速すぎて、聞き取れません。", en: "Chinese people speak too fast; I can't understand." },
        literal_en: "Chinese people speak too fast, I listen not understand.",
        scenario: { vi: "Nói về trở ngại nghe hiểu", ja: "リスニングの難しさを伝える", en: "Listening difficulty" },
        tone_tip: { vi: "Chữ 不 ở giữa đọc nhẹ (tīng bu dǒng).", ja: "挟まれた「不」は軽声で発音します。", en: "Infix 不 is neutral tone." },
        word_order_diff: { vi: "Chèn 不 vào giữa 听 và 懂 thành cụm bổ ngữ khả năng phủ định.", ja: "動詞＋不＋結果補語の否定可能表現です。", en: "Verb + 不 + Complement." },
        note: { vi: "Câu cửa miệng thiết yếu của mọi người học tiếng Trung.", ja: "中国語学習者の最重要サバイバルフレーズです。", en: "Essential survival phrase for learners." },
        tokens: [
          { hanzi: "中国人", pinyin: "zhōngguórén", han_viet: "Trung Quốc nhân", ja_kanji: "中国人", literal_en: "Chinese people", block_role: "subject" },
          { hanzi: "说话", pinyin: "shuōhuà", han_viet: "thuyết thoại", ja_kanji: "話す", literal_en: "speak", block_role: "verb" },
          { hanzi: "太快", pinyin: "tài kuài", han_viet: "thái khoái", ja_kanji: "速すぎる", literal_en: "too fast", block_role: "adverb" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", literal_en: "I", block_role: "subject" },
          { hanzi: "听不懂", pinyin: "tīng bu dǒng", han_viet: "thính bất đổng", ja_kanji: "聞いて分からない", literal_en: "cannot understand", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_pot_1",
        prompt: { vi: "Sắp xếp: 'Nhiều đồ ăn thế này, bạn ăn có hết không?'", ja: "並べ替え：「こんなにたくさんの料理、食べきれますか？」", en: "Unscramble: 'With so much food, can you finish eating it?'" },
        correct_order: ["这么", "多", "菜", "，", "你", "吃", "得", "完", "吗", "？"],
        tokens: ["完", "菜", "这么", "得", "吃", "你", "多", "吗", "，", "？"],
        explanation: { vi: "V (吃) + 得 + Bổ ngữ (完) + 吗？", ja: "吃＋得＋完＋吗？の可能補語疑問文です。", en: "Verb + 得 + 完 + 吗?" }
      }
    ],
    fill_blank: [
      {
        id: "fb_pot_1",
        sentence_zh: "房间钥匙我找{blank}到了，急死我了。",
        answer: "不",
        options: ["不", "得", "没", "别"],
        explanation: { vi: "Tìm không thấy (không có khả năng tìm ra) dùng 找不到.", ja: "見つからない不可能性を表すので「不」を挟みます（找不到）。", en: "Inability to find takes 不: 找不到." }
      }
    ],
    error_correction: [
      {
        id: "ec_pot_1",
        wrong_sentence: "这个汉字我没看懂。",
        correct_sentence: "这个汉字我看不懂。",
        error_point: { vi: "Dùng 没看懂 (chưa hiểu lúc đó) khi muốn diễn đạt năng lực hiện tại không thể hiểu được (看不懂).", ja: "能力・可能性として読めないニュアンスに「没」を使ってしまった不自然な文。", en: "Using 没看懂 when general inability to decipher is meant." },
        explanation: { vi: "Muốn nói năng lực bản thân không hiểu được chữ này, phải dùng bổ ngữ khả năng 看不懂.", ja: "理解能力が及ばない場合は可能補語「看不懂」を用います。", en: "Use potential complement 看不懂 to express inability." }
      }
    ],
    quiz: [
      {
        id: "qz_pot_1",
        question: { vi: "Cụm từ '买不起' trong tiếng Trung biểu đạt ý gì?", ja: "「买不起」の意味として正しいものは？", en: "What does '买不起' mean in Chinese?" },
        options: [
          { text: { vi: "Không có đủ khả năng tài chính để mua (quá đắt đỏ)", ja: "経済的に高すぎて買う余裕がない", en: "Cannot afford to buy (financially unable)" }, correct: true },
          { text: { vi: "Không muốn mua", ja: "買いたくない", en: "Do not want to buy" }, correct: false }
        ],
        explanation: { vi: "买不起 là bổ ngữ khả năng cố định chỉ sự bất lực về tiền bạc.", ja: "「高額で手が出ない」ことを表す定番の慣用可能補語です。", en: "Standard idiomatic phrase meaning 'cannot afford'." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V + 得/不 + Bổ ngữ: Khẳng định chèn 得 (làm được), phủ định chèn 不 (không làm nổi).",
        ja: "動詞＋得/不＋補語：得（できる）、不（できない）。口語では否定形（看不懂・找不到）が圧倒的に頻出。",
        en: "Verb + 得/不 + Complement: Infixes 得 (can) or 不 (cannot); negative form is exceptionally common."
      },
      remember: [
        { vi: "Khẩu ngữ luôn ưu tiên dùng 看不懂 thay vì nói 不能看懂.", ja: "「不能……」より可能補語「……不……」を使うのが自然。", en: "Prefer 听不懂 over 不能听懂 in spoken Chinese." }
      ]
    }
  },

  // 25. hsk3_duration_complement
  {
    id: "hsk3_duration_complement",
    level: "HSK3",
    level_num: 3,
    category: "complement",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["时量补语", "duration complement", "bổ ngữ thời lượng", "khoảng thời gian", "tiếng đồng hồ"],
    formula: "S + V + 了 + Khoảng thời gian (+ 了)  hoặc  S + V + O + V + 了 + Khoảng thời gian",
    formula_plain: {
      vi: "Động từ + (Tân ngữ) + Động từ + 了 + Khoảng thời gian (Làm việc gì trong bao lâu)",
      ja: "動詞 ＋（目的語 ＋ 動詞）＋ 了 ＋ 時間の長さ（〜のあいだ動作を継続した）",
      en: "Verb + (Object + Verb) + 了 + Duration of Time (Did something for how long)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Bổ ngữ thời lượng", ja: "時量補語（持続時間）", en: "Duration Complement" }, role: "complement", color: "#F59E0B" }
    ],
    related_ids: ["hsk1_time_word_position", "hsk2_le_completion_aspect"],
    confusable_with: [
      {
        id: "hsk1_time_word_position",
        diff: {
          vi: "Thời điểm (khi nào làm) đứng TRƯỚC động từ (我八点去). Thời lượng (làm trong bao lâu: 1 tiếng, 2 ngày) đứng SAU động từ (我学了一个小时).",
          ja: "時「点」（いつ＝八点）は動詞の前。時「量」（どれくらい＝一个小时）は動詞の後ろ。配置が真逆です。",
          en: "Time point (when) goes BEFORE verb; duration (how long) goes AFTER verb."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Bổ ngữ thời lượng (V + 了 + Khoảng thời gian)",
        concept: "Đứng sau động từ để biểu thị hành động diễn ra và kéo dài trong một khoảng thời gian bao lâu.",
        grammar_notes: [
          "Nếu động từ không có tân ngữ: S + V + 了 + Thời lượng (Ví dụ: 我睡了八个小时 - Tôi đã ngủ 8 tiếng).",
          "Nếu có tân ngữ: Phải lặp lại động từ (S + V + O + V + 了 + Thời lượng: 我学汉语学了两年), hoặc đưa tân ngữ ra sau thời lượng (我学了两年的汉语).",
          "Nếu có chữ 了 ở cuối câu: Biểu thị hành động VẪN ĐANG TIẾP TỤC ở hiện tại (Ví dụ: 我学了一年汉语了 - Tôi đã học được 1 năm rồi và hiện tại vẫn đang học)."
        ],
        pedagogical_tips: "Cực kỳ chú ý phân biệt: Thời điểm đứng trước V, Thời lượng đứng sau V."
      },
      ja: {
        title: "時量補語（動作の持続時間を表す補語）",
        concept: "動作がどのくらいの時間続いたか（継続時間）を表す補語で、動詞の後に置かれます。",
        grammar_notes: [
          "目的語がない場合：主語＋動詞＋了＋時量（例：他游了一个小时）。",
          "目的語がある場合：動詞を繰り返す（他学中文学了三年）か、目的語を時量の後ろに置く（他学了三年的中文）。",
          "文末にも「了」がある場合：現在もなお継続中であることを表す（他学了三年中文了＝3年学んで今も継続中）。"
        ],
        pedagogical_tips: "「時「点」は動詞の前、時「量」は動詞の後」の対比ルールを徹底させます。"
      },
      en: {
        title: "Duration Complements (V + 了 + Duration)",
        concept: "Placed after the verb to indicate how long an action has been or was conducted.",
        grammar_notes: [
          "No object: S + V + 了 + Duration (e.g. 我等了半个小时 - I waited for half an hour).",
          "With an object: Repeat the verb (我学汉语学了两年) or place the object after the duration (我学了两年的汉语).",
          "Double-了 construction: A final 了 signifies that the action is STILL ONGOING (我学了两年汉语了 - I have been studying Chinese for 2 years and still am)."
        ],
        pedagogical_tips: "Contrast: Time points (when) precede verbs; durations (how long) follow verbs."
      }
    },
    fill_template: {
      template_zh: "他看电视看{particle}两个小时。",
      template_vi: "Anh ấy xem tivi xem {particle} hai tiếng đồng hồ.",
      slots: [
        { name: "particle", type: "aspect", options: ["了", "过", "着", "的"] }
      ]
    },
    collocations: [
      { pattern: "学了三年", pinyin: "xué le sān nián", meaning_vi: "Học được ba năm", meaning_en: "Studied for three years" },
      { pattern: "等了半天", pinyin: "děng le bàntiān", meaning_vi: "Đợi nửa ngày / Đợi rất lâu", meaning_en: "Waited for a long time" }
    ],
    examples: [
      {
        zh: "我在这家公司工作了五年。",
        pinyin: "Wǒ zài zhè jiā gōngsī gōngzuò le wǔ nián.",
        translations: { vi: "Tôi đã làm việc ở công ty này năm năm.", ja: "私はこの会社で5年間働きました。", en: "I worked at this company for five years." },
        literal_en: "I at this company work particle five years.",
        scenario: { vi: "Giới thiệu kinh nghiệm làm việc", ja: "職歴の説明", en: "Work experience" },
        tone_tip: { vi: "五年 đọc là wǔ nián.", ja: "「五年」は第3声＋第2声です。", en: "wǔ (3rd) + nián (2nd)." },
        word_order_diff: { vi: "Thời lượng (五年) đứng sau động từ (工作了).", ja: "動詞の後ろに持続時間「五年」を置きます。", en: "Duration wǔ nián placed after verb gōngzuò." },
        note: { vi: "Nếu thêm 了 cuối câu (五年了) thì nghĩa là hiện tại vẫn đang làm.", ja: "文末に「了」をつけると今も勤務中という意味になります。", en: "Adding final 了 would mean still working there." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", literal_en: "I", block_role: "subject" },
          { hanzi: "在这家公司", pinyin: "zài zhè jiā gōngsī", han_viet: "tại giá gia công ty", ja_kanji: "この会社で", literal_en: "at this company", block_role: "preposition" },
          { hanzi: "工作", pinyin: "gōngzuò", han_viet: "công tác", ja_kanji: "働く", literal_en: "work", block_role: "verb" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "particle", block_role: "particle" },
          { hanzi: "五年", pinyin: "wǔ nián", han_viet: "ngũ niên", ja_kanji: "5年間", literal_en: "five years", block_role: "complement" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_dur_1",
        prompt: { vi: "Sắp xếp: 'Tôi đã đợi bạn nửa tiếng đồng hồ rồi.'", ja: "並べ替え：「私はあなたを30分間待ちました。」", en: "Unscramble: 'I waited for you for half an hour.'" },
        correct_order: ["我", "等", "了", "你", "半个", "小时", "。"],
        tokens: ["你", "等", "半个", "小时", "我", "了", "。"],
        explanation: { vi: "Với đại từ nhân xưng (你), tân ngữ đứng trước thời lượng: 等了你半个小时.", ja: "人称代名詞が目的語の時は時量補語の前に置きます。", en: "Pronoun objects precede the duration: 等了你半个小时." }
      }
    ],
    fill_blank: [
      {
        id: "fb_dur_1",
        sentence_zh: "他跑步跑了一{blank}小时。",
        answer: "个",
        options: ["个", "本", "张", "条"],
        explanation: { vi: "Lượng từ cho tiếng đồng hồ (小时) là 个: 一个小时.", ja: "「小时」の量詞は「个」です（一个小时）。", en: "小时 takes classifier 个." }
      }
    ],
    error_correction: [
      {
        id: "ec_dur_1",
        wrong_sentence: "我三个小时睡了。",
        correct_sentence: "我睡了三个小时。",
        error_point: { vi: "Đặt bổ ngữ thời lượng 三个小时 lên trước động từ 睡.", ja: "時間の長さ（時量）を動詞の前に置いてしまった誤文。", en: "Placing duration 三个小时 before the verb 睡." },
        explanation: { vi: "Khoảng thời gian (thời lượng) bắt buộc đứng sau động từ: 睡了三个小时.", ja: "時量は動詞の後に配置します：睡了三个小时。", en: "Durations must follow verbs: 睡了三个小时." }
      }
    ],
    quiz: [
      {
        id: "qz_dur_1",
        question: { vi: "Câu '他学了两年中文' và '他学了两年中文了' khác nhau thế nào?", ja: "「他学了两年中文」と「他学了两年中文了」の決定的な違いは？", en: "What is the key difference between '他学了两年中文' and '他学了两年中文了'?" },
        options: [
          { text: { vi: "Câu có 了 ở cuối biểu thị hiện tại người đó VẪN ĐANG TIẾP TỤC HỌC", ja: "文末に「了」がある文は、現在も学習が継続中であることを表す", en: "The sentence with final 了 means the action is STILL continuing now" }, correct: true },
          { text: { vi: "Hai câu hoàn toàn giống nhau", ja: "意味上の違いは全くない", en: "They mean the exact same thing" }, correct: false }
        ],
        explanation: { vi: "Cấu trúc 2 chữ 了 (V+了...了) biểu thị hành động vẫn đang tiếp tục ở hiện tại.", ja: "ダブル「了」構文は動作の現在継続を示します。", en: "Double-了 signals ongoing action up to the present." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V + 了 + Khoảng thời gian: Diễn tả làm việc trong bao lâu (đứng sau V); có 了 cuối câu là còn đang tiếp diễn.",
        ja: "動詞＋了＋時量：動作の継続時間（動詞の後に置く）。文末にも「了」があれば現在も継続中。",
        en: "Verb + 了 + Duration: Expresses how long an action lasted; double-了 indicates still continuing."
      },
      remember: [
        { vi: "Nhớ nằm lòng: Thời điểm (八点) đứng TRƯỚC V, Thời lượng (一个小时) đứng SAU V.", ja: "いつ（時間）は動詞の前、どれくらい（時量）は動詞の後。", en: "Time points go before the verb; durations go after the verb." }
      ]
    }
  },

  // 26. hsk3_frequency_complement
  {
    id: "hsk3_frequency_complement",
    level: "HSK3",
    level_num: 3,
    category: "complement",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["动量补语", "次", "遍", "趟", "frequency complement", "bổ ngữ động lượng", "số lần"],
    formula: "S + V + 了/过 + Số từ + Động lượng từ (次 / 遍 / 趟)",
    formula_plain: {
      vi: "Động từ + 了/过 + (Số từ + 次/遍/趟) (Làm bao nhiêu lần, lượt, chuyến)",
      ja: "動詞 ＋ 了／过 ＋ 数量 ＋ 動量詞（次・遍・趟）（動作の回数を表す）",
      en: "Verb + 了/过 + Number + Action Measure Word (次 / 遍 / 趟) (Action frequency)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Bổ ngữ động lượng (số lần)", ja: "動量補語（回数）", en: "Frequency Complement" }, role: "complement", color: "#F59E0B" }
    ],
    related_ids: ["hsk2_guo_experiential_aspect", "hsk3_duration_complement"],
    confusable_with: [
      {
        id: "hsk2_guo_experiential_aspect",
        diff: {
          vi: "次 (lần) là số lần diễn ra nói chung. 遍 (lượt) nhấn mạnh làm trọn vẹn từ đầu đến cuối (đọc lại 1 lượt: 看一遍). 趟 (chuyến) dùng cho việc đi lại.",
          ja: "「次」は一般的な回数。「遍」は初めから終わりまで通す回数（例：看一遍）。「趟」は往復の移動回数。",
          en: "次 = general occurrence; 遍 = from beginning to end (e.g. read through once); 趟 = round trips."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Bổ ngữ động lượng (次, 遍, 趟 biểu thị số lần của hành động)",
        concept: "Đứng sau động từ để biểu thị số lần mà hành động đã diễn ra.",
        grammar_notes: [
          "次 (cì - lần): Đơn vị đo tần suất chung nhất (我去过一次北京 - Tôi từng đi Bắc Kinh một lần).",
          "遍 (biàn - lượt): Nhấn mạnh hoàn thành toàn bộ quá trình từ đầu chí cuối (请再说一遍 - Xin hãy nói lại một lượt).",
          "趟 (tàng - chuyến): Dùng riêng cho hành trình đi và về (我去了一趟超市 - Tôi đã đi siêu thị một chuyến).",
          "Quy tắc vị trí tân ngữ: Nếu tân ngữ là ĐẠI TỪ CHỈ NGƯỜI (我, 你, 他), tân ngữ phải đứng TRƯỚC động lượng từ (Ví dụ: 我找了他两次 - Tôi đã tìm anh ấy hai lần)."
        ],
        pedagogical_tips: "Nhấn mạnh quy tắc: Đại từ chỉ người đứng trước động lượng từ (找了他两次, không nói 找了两次他)."
      },
      ja: {
        title: "動量補語（動作の回数を表す補語：次・遍・趟）",
        concept: "動作の行われた回数を表す補語で、動詞の直後に置かれます。",
        grammar_notes: [
          "次（回・度）：最も一般的な回数（我去过三次）。",
          "遍（回・通り）：最初から最後まで完了するプロセスを強調（请读一遍）。",
          "趟（往復・便）：行って帰ってくる移動回数（去了一趟医院）。",
          "人称代名詞目的語のルール：必ず動量補語の前に置く（例：找了他两次。❌ 找了两次他は不可）。"
        ],
        pedagogical_tips: "「次」と「遍」の違い、および人称代名詞目的語の前置ルールを指導します。"
      },
      en: {
        title: "Frequency / Action Measure Complements (次, 遍, 趟)",
        concept: "Placed after the verb to indicate the number of times an action was performed.",
        grammar_notes: [
          "次 (times): General frequency counter (我去过两次 - I have been twice).",
          "遍 (times from start to finish): Stresses doing an action entirely from start to end (再听一遍 - listen once more through).",
          "趟 (trips): Specific to round trips / journeys (去了一趟超市 - made a trip to the supermarket).",
          "Pronoun object rule: If the object is a personal pronoun, it MUST precede the frequency complement (找了他两次, NOT 找了两次他)."
        ],
        pedagogical_tips: "Enforce pronoun objects preceding the frequency complement."
      }
    },
    fill_template: {
      template_zh: "这篇文章很有名，我读过两{frequency}。",
      template_vi: "Bài viết này rất nổi tiếng, tôi đã đọc qua hai {frequency}.",
      slots: [
        { name: "frequency", type: "classifier", options: ["遍", "次", "趟", "本"] }
      ]
    },
    collocations: [
      { pattern: "再说一遍", pinyin: "zài shuō yí biàn", meaning_vi: "Nói lại một lần nữa", meaning_en: "Say it once more" },
      { pattern: "去过一次", pinyin: "qù guo yí cì", meaning_vi: "Từng đi một lần", meaning_en: "Been there once" }
    ],
    examples: [
      {
        zh: "请你慢点儿，再说一遍好吗？",
        pinyin: "Qǐng nǐ màn diǎnr, zài shuō yí biàn hǎo ma?",
        translations: { vi: "Xin bạn nói chậm một chút, nói lại một lần nữa được không?", ja: "少しゆっくり、もう一度言っていただけますか？", en: "Could you please slow down and say it once more?" },
        literal_en: "Please you slow a-bit, again speak one through good question?",
        scenario: { vi: "Yêu cầu nhắc lại câu nói khi chưa rõ", ja: "聞き返しの丁寧な依頼", en: "Asking for repetition" },
        tone_tip: { vi: "一遍 đọc là yí biàn (biến điệu thanh 2 của yī).", ja: "「一」は第4声の前で「yí」に変調します。", en: "Tone sandhi: yí biàn." },
        word_order_diff: { vi: "Động từ (说) + Bổ ngữ động lượng (一遍).", ja: "動詞＋動量補語の語順です。", en: "Verb + frequency complement." },
        note: { vi: "Dùng 遍 vì muốn đối phương nói lại toàn bộ từ đầu đến cuối.", ja: "頭から最後まで全部言い直してほしいので「遍」を使います。", en: "遍 implies repeating the whole sentence from start to finish." },
        tokens: [
          { hanzi: "请", pinyin: "qǐng", han_viet: "thỉnh", ja_kanji: "どうぞ", literal_en: "please", block_role: "polite" },
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "慢点儿", pinyin: "màn diǎnr", han_viet: "mạn điểm nhi", ja_kanji: "ゆっくり", literal_en: "slower", block_role: "adverb" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "再", pinyin: "zài", han_viet: "tái", ja_kanji: "再び", literal_en: "again", block_role: "adverb" },
          { hanzi: "说", pinyin: "shuō", han_viet: "thuyết", ja_kanji: "言う", literal_en: "say", block_role: "verb" },
          { hanzi: "一遍", pinyin: "yí biàn", han_viet: "nhất biến", ja_kanji: "一度通して", literal_en: "once through", block_role: "complement" },
          { hanzi: "好吗", pinyin: "hǎo ma", han_viet: "hảo ma", ja_kanji: "いいですか", literal_en: "okay?", block_role: "particle" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_freq_1",
        prompt: { vi: "Sắp xếp: 'Tôi đã gọi điện thoại cho anh ấy ba lần.'", ja: "並べ替え：「私は彼に3回電話をかけました。」", en: "Unscramble: 'I called him three times.'" },
        correct_order: ["我", "给", "他", "打", "了", "三", "次", "电话", "。"],
        tokens: ["次", "打", "电话", "我", "给", "三", "他", "了", "。"],
        explanation: { vi: "Cụm 给+Người đứng trước V, động lượng từ đứng sau V: 打了三次电话.", ja: "給＋人に＋動詞＋動量補語＋目的語の順序です。", en: "给 + Person + Verb + 三次 + Object." }
      }
    ],
    fill_blank: [
      {
        id: "fb_freq_1",
        sentence_zh: "昨天我去了两{blank}银行。",
        answer: "趟",
        options: ["趟", "遍", "本", "个"],
        explanation: { vi: "Đi lại ngân hàng (chuyến đi và về) dùng lượng từ 趟.", ja: "銀行への往復移動を表すので「趟」が最も自然です。", en: "Making trips to a destination uses 趟." }
      }
    ],
    error_correction: [
      {
        id: "ec_freq_1",
        wrong_sentence: "老师昨天找了三次他。",
        correct_sentence: "老师昨天找了他三次。",
        error_point: { vi: "Đặt đại từ chỉ người 他 ở sau bổ ngữ động lượng 三次.", ja: "人称代名詞「他」を動量補語の後ろに置いてしまった語順の誤り。", en: "Placing pronoun 他 after the frequency complement." },
        explanation: { vi: "Tân ngữ là đại từ nhân xưng bắt buộc đứng trước động lượng từ: 找了他三次.", ja: "代名詞目的語は動量補語の前に挟みます：找了他三次。", en: "Pronoun objects must precede the frequency complement: 找了他三次." }
      }
    ],
    quiz: [
      {
        id: "qz_freq_1",
        question: { vi: "Khi muốn nhờ người khác nghe lại một bài hát từ đầu đến cuối, dùng từ nào?", ja: "曲を最初から最後までもう一度聴く時の量詞は？", en: "To ask someone to listen to a song again from start to finish, which word is used?" },
        options: [
          { text: { vi: "遍 (biàn) - Nhấn mạnh trọn vẹn tiến trình", ja: "遍（最初から最後までプロセスを通す）", en: "遍 (biàn) - Stresses complete process" }, correct: true },
          { text: { vi: "趟 (tàng) - Dùng cho chuyến đi", ja: "趟（往復移動）", en: "趟 (tàng) - Trips" }, correct: false }
        ],
        explanation: { vi: "遍 dùng khi thực hiện toàn bộ quá trình từ đầu đến đuôi.", ja: "「遍」は全編を通す回数に使います。", en: "遍 indicates doing something all the way through." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V + (次/遍/趟): Bổ ngữ động lượng chỉ số lần; đại từ chỉ người BẮT BUỘC đứng trước bổ ngữ (找了他两次).",
        ja: "動詞＋(次/遍/趟)：動作の回数。人称代名詞目的語は必ず補語の前に置く（找了他三次）。",
        en: "Verb + (次/遍/趟): Indicates frequency; pronoun objects MUST precede the complement."
      },
      remember: [
        { vi: "Phân biệt: 次 (số lần chung), 遍 (từ đầu đến cuối), 趟 (chuyến đi lại).", ja: "「次＝一般回数」「遍＝通し回数」「趟＝往復回数」。", en: "次 = general; 遍 = from start to end; 趟 = trips." }
      ]
    }
  }
];

module.exports = batch2;

