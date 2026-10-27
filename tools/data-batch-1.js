/**
 * tools/data-batch-1.js
 * 
 * 13 Essential HSK Grammar points (HSK1 1-11, HSK2 12-13)
 * Full pedagogical schema adhering to types/grammar.ts
 */

const batch1 = [
  // 1. hsk1_ne_elliptical_question
  {
    id: "hsk1_ne_elliptical_question",
    level: "HSK1",
    level_num: 1,
    category: "question",
    difficulty: 1,
    frequency: 5,
    register: "spoken",
    keywords: ["呢", "ne", "câu hỏi tỉnh lược", "còn... thì sao", "where is", "how about"],
    formula: "Danh từ / Đại từ + 呢？",
    formula_plain: {
      vi: "Danh từ / Đại từ + 呢？ (Còn ... thì sao? / ... ở đâu?)",
      ja: "名詞／代名詞 ＋ 呢？（〜は？／〜はどこ？）",
      en: "Noun / Pronoun + 呢? (How about...? / Where is...?)"
    },
    structure_blocks: [
      { label: { vi: "Đối tượng hỏi", ja: "質問対象", en: "Target Topic" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Trợ từ 呢", ja: "助詞 呢", en: "Particle 呢" }, role: "particle", color: "#EC4899" }
    ],
    related_ids: ["hsk1_ma_yes_no_question", "hsk1_interrogative_pronouns"],
    confusable_with: [
      {
        id: "hsk1_ma_yes_no_question",
        diff: {
          vi: "吗 dùng cho câu hỏi Có/Không đầy đủ (你喝茶吗？). 呢 là câu hỏi tỉnh lược dựa theo ngữ cảnh đã nói trước đó (我喝茶，你呢？).",
          ja: "「吗」は平叙文末につけてYes/Noを尋ねます。「呢」は前文を受けて「〜は？」と省略疑問を作ります。",
          en: "吗 forms full yes-no questions. 呢 forms bounce-back follow-up questions ('how about...?')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu hỏi tỉnh lược với trợ từ 呢 (ne)",
        concept: "Dùng trợ từ ngữ khí 呢 đặt ngay sau danh từ hoặc đại từ để hỏi lặp lại câu hỏi vừa đặt cho người khác ('Còn bạn thì sao?'), hoặc hỏi vị trí của đồ vật/người ('...ở đâu rồi?').",
        grammar_notes: [
          "Hỏi tiếp ngữ cảnh trước: 我很好，你呢？ (Tôi rất khỏe, còn bạn?)",
          "Hỏi tung tích đồ vật khi đang tìm kiếm: 我的手机呢？ (Điện thoại của tôi đâu rồi?)",
          "Không cần lặp lại toàn bộ vị ngữ của câu hỏi trước."
        ],
        pedagogical_tips: "Hãy nhắc học viên không được nhầm lẫn giữa 吗 (hỏi Có/Không) và 呢 (hỏi tỉnh lược nối tiếp)."
      },
      ja: {
        title: "「呢（ne）」による省略疑問文",
        concept: "名詞や代名詞の直後に「呢」をつけるだけで、「〜は？」「〜はどこ？」という簡潔な疑問文が作れます。",
        grammar_notes: [
          "文脈の引き継ぎ：「我是日本人，你呢？」（私は日本人です、あなたは？）",
          "所在の捜索：「我的钥匙呢？」（私の鍵はどこ？）"
        ],
        pedagogical_tips: "「吗」と違って、文全体を繰り返さずに単語1つで質問できる便利な表現です。"
      },
      en: {
        title: "Elliptical Questions with 呢 (ne)",
        concept: "Attach 呢 directly to a noun or pronoun to ask 'How about...?' or 'Where is...?'.",
        grammar_notes: [
          "Bounce-back questions: 我是老师，你呢？ (I am a teacher, how about you?)",
          "Locating missing items: 我的钱呢？ (Where is my money?)"
        ],
        pedagogical_tips: "Great for natural conversation flows without repeating complete sentence predicates."
      }
    },
    fill_template: {
      template_zh: "我喝咖啡，{target}呢？",
      template_vi: "Tôi uống cà phê, còn {target} thì sao?",
      slots: [
        { name: "target", type: "subject", options: ["你", "他", "妈妈", "老师"] }
      ]
    },
    collocations: [
      { pattern: "你呢？", pinyin: "nǐ ne?", meaning_vi: "Còn bạn thì sao?", meaning_en: "How about you?" },
      { pattern: "我的书呢？", pinyin: "wǒ de shū ne?", meaning_vi: "Sách của tôi đâu rồi?", meaning_en: "Where is my book?" }
    ],
    examples: [
      {
        zh: "我很好，你呢？",
        pinyin: "Wǒ hěn hǎo, nǐ ne?",
        translations: { vi: "Tôi rất khỏe, còn bạn thì sao?", ja: "私は元気です、あなたは？", en: "I am fine, how about you?" },
        literal_en: "I very good, you particle?",
        scenario: { vi: "Chào hỏi xã giao", ja: "挨拶のやり取り", en: "Social greeting" },
        tone_tip: { vi: "Chữ 呢 đọc thanh nhẹ (ne), ngắn và dứt khoát.", ja: "「呢」は軽声で短く添えます。", en: "Pronounce 呢 in neutral tone." },
        word_order_diff: { vi: "Tương đương tiếng Việt 'Còn... thì sao?'.", ja: "日本語の「〜は？」と完全に語順が一致します。", en: "Follows same flow as 'and you?'." },
        note: { vi: "Ví dụ kinh điển trong đối thoại HSK 1.", ja: "HSK1の最も基本的な会話定型句です。", en: "Core pattern for HSK 1 dialogue." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", literal_en: "I", block_role: "subject" },
          { hanzi: "很", pinyin: "hěn", han_viet: "hẩn", ja_kanji: "很", literal_en: "very", block_role: "adverb" },
          { hanzi: "好", pinyin: "hǎo", han_viet: "hảo", ja_kanji: "好", literal_en: "good", block_role: "predicate" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "呢", pinyin: "ne", han_viet: "ni", ja_kanji: "呢", literal_en: "how about", block_role: "particle" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_ne_1",
        prompt: { vi: "Sắp xếp: 'Điện thoại của tôi đâu rồi?'", ja: "並べ替え：「私のスマホはどこ？」", en: "Unscramble: 'Where is my phone?'" },
        correct_order: ["我", "的", "手机", "呢", "？"],
        tokens: ["手机", "我", "呢", "的", "？"],
        explanation: { vi: "Danh từ (我的手机) + 呢？ biểu thị hỏi đồ vật ở đâu.", ja: "名詞句＋呢？で場所を尋ねます。", en: "Noun phrase + 呢 asks for location." }
      }
    ],
    fill_blank: [
      {
        id: "fb_ne_1",
        sentence_zh: "我是中国人，你{blank}？",
        answer: "呢",
        options: ["呢", "吗", "了", "的"],
        explanation: { vi: "Dùng 呢 để hỏi lặp lại vế trước ('Còn bạn thì sao?').", ja: "直前の話題を受けて聞き返すので「呢」が正解です。", en: "Use 呢 to ask 'how about you?' in context." }
      }
    ],
    error_correction: [
      {
        id: "ec_ne_1",
        wrong_sentence: "你是老师呢？",
        correct_sentence: "你是老师吗？",
        error_point: { vi: "Không dùng 呢 cho câu hỏi nghi vấn toàn phần khi chưa có ngữ cảnh đối ứng.", ja: "文脈のない完全な疑問文に「呢」は使えません。「吗」を使います。", en: "Cannot use 呢 for freestanding yes/no questions without context." },
        explanation: { vi: "Nếu muốn hỏi 'Bạn có phải là giáo viên không?', phải dùng 吗.", ja: "「あなたは先生ですか？」と尋ねる場合は「吗」を用います。", en: "Use 吗 for standard yes/no inquiries." }
      }
    ],
    quiz: [
      {
        id: "qz_ne_1",
        question: { vi: "Câu '我的钱呢？' biểu đạt ý gì?", ja: "「我的钱呢？」はどういう意味ですか？", en: "What does '我的钱呢？' express?" },
        options: [
          { text: { vi: "Tiền của tôi ở đâu rồi?", ja: "私のお金はどこ？", en: "Where is my money?" }, correct: true },
          { text: { vi: "Tôi có tiền không?", ja: "私にお金はある？", en: "Do I have money?" }, correct: false },
          { text: { vi: "Bạn có tiền không?", ja: "あなたはお金を持っている？", en: "Do you have money?" }, correct: false }
        ],
        explanation: { vi: "Danh từ + 呢 khi tìm kiếm mang nghĩa '...ở đâu rồi?'.", ja: "「名詞＋呢？」は探し物をしているときの定番表現です。", en: "Noun + 呢 asks for the whereabouts of an item." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Danh từ + 呢？: Hỏi tiếp ngữ cảnh ('còn... thì sao?') hoặc hỏi vị trí ('...ở đâu?').",
        ja: "名詞＋呢？：「〜は？」「〜はどこ？」と簡潔に問いかける。",
        en: "Noun + 呢? asks 'How about...?' or 'Where is...?'."
      },
      remember: [
        { vi: "Không dùng 呢 thay cho 吗 khi hỏi câu Yes/No chưa có ngữ cảnh.", ja: "単独のYes/No疑問文には「吗」を使い、「呢」と混同しない。", en: "Do not replace 吗 with 呢 in freestanding yes/no questions." }
      ]
    }
  },

  // 2. hsk1_interrogative_pronouns
  {
    id: "hsk1_interrogative_pronouns",
    level: "HSK1",
    level_num: 1,
    category: "question",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["什么", "谁", "哪儿", "怎么", "几", "多少", "shénme", "shéi", "nǎr", "zěnme", "jǐ", "duōshao", "đại từ nghi vấn", "câu hỏi Wh-"],
    formula: "S + V + Đại từ nghi vấn (什么 / 谁 / 哪儿 / 多少 / 怎么)？",
    formula_plain: {
      vi: "Thay đại từ nghi vấn vào đúng vị trí của thông tin cần hỏi trong câu khẳng định",
      ja: "肯定文で答えが来る位置にそのまま疑問詞（什么・谁・哪儿など）を置く",
      en: "Place question word (what/who/where/how) directly into the slot being asked about"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Đại từ nghi vấn", ja: "疑問詞", en: "Question Word" }, role: "question_word", color: "#8B5CF6" }
    ],
    related_ids: ["hsk1_ma_yes_no_question", "hsk1_ne_elliptical_question"],
    confusable_with: [
      {
        id: "hsk1_ma_yes_no_question",
        diff: {
          vi: "Khi câu ĐÃ có đại từ nghi vấn (什么, 谁, 哪儿...), tuyệt đối KHÔNG thêm 吗 ở cuối câu.",
          ja: "疑問詞（什么・谁など）がある疑問文には、文末に「吗」をつけてはいけません。",
          en: "Never append 吗 to a sentence that already contains a question word."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu hỏi với đại từ nghi vấn (什么, 谁, 哪儿, 怎么, 几, 多少)",
        concept: "Tiếng Trung có trật tự từ 'tại chỗ' (in-situ): muốn hỏi thành phần nào, chỉ việc thay đại từ nghi vấn vào đúng vị trí của thành phần đó mà không đảo trật tự câu.",
        grammar_notes: [
          "什么 (cái gì): 你吃什么？ (Bạn ăn cái gì?)",
          "谁 (ai): 他是谁？ (Anh ấy là ai?)",
          "哪儿 / 哪里 (ở đâu): 你去哪儿？ (Bạn đi đâu?)",
          "怎么 (như thế nào): 这个字怎么读？ (Chữ này đọc thế nào?)",
          "几 (mấy - dưới 10) vs 多少 (bao nhiêu - trên 10): 你几岁？ vs 多少钱？"
        ],
        pedagogical_tips: "Quy tắc vàng: Đã dùng đại từ nghi vấn thì KHÔNG dùng 吗 ở cuối câu."
      },
      ja: {
        title: "疑問代名詞疑問文（什么・谁・哪儿・怎么など）",
        concept: "中国語の疑問詞は語順を変えず、尋ねたい要素（主語、目的語、連体修飾語など）の位置にそのまま置きます。",
        grammar_notes: [
          "什么（何）：这是什么？（これは何ですか？）",
          "谁（誰）：他是谁？（彼は誰ですか？）",
          "哪儿（どこ）：你在哪儿？（あなたはどこにいますか？）",
          "疑问文末に「吗」をつけてはいけない鉄則に注意。"
        ],
        pedagogical_tips: "日本語と違って文頭に疑問詞を倒置する必要がありません。"
      },
      en: {
        title: "Questions with Interrogative Pronouns",
        concept: "Chinese uses in-situ wh-questions: replace the target piece of information with the interrogative pronoun without moving it to the front.",
        grammar_notes: [
          "什么 (what): 这是什么？ (What is this?)",
          "谁 (who): 他是谁？ (Who is he?)",
          "哪儿 (where): 你住哪儿？ (Where do you live?)",
          "Golden rule: Never add 吗 to sentences with question words."
        ],
        pedagogical_tips: "Emphasize word order stays identical to normal affirmative sentences."
      }
    },
    fill_template: {
      template_zh: "你叫{question_word}名字？",
      template_vi: "Bạn tên là tên {question_word}?",
      slots: [
        { name: "question_word", type: "pronoun", options: ["什么", "谁", "哪儿", "多少"] }
      ]
    },
    collocations: [
      { pattern: "这是什么？", pinyin: "zhè shì shénme?", meaning_vi: "Đây là cái gì?", meaning_en: "What is this?" },
      { pattern: "多少钱？", pinyin: "duōshao qián?", meaning_vi: "Bao nhiêu tiền?", meaning_en: "How much money?" }
    ],
    examples: [
      {
        zh: "你叫什么名字？",
        pinyin: "Nǐ jiào shénme míngzi?",
        translations: { vi: "Bạn tên là gì?", ja: "お名前は何ですか？", en: "What is your name?" },
        literal_en: "You called what name?",
        scenario: { vi: "Làm quen, hỏi tên", ja: "初対面で名前を尋ねる", en: "Asking name" },
        tone_tip: { vi: "什么 đọc là shénme (chữ me thanh nhẹ).", ja: "「什么」の「么」は軽声です。", en: "me in shénme is neutral tone." },
        word_order_diff: { vi: "Trật tự từ tương tự tiếng Việt (tên gì = 什么名字).", ja: "「何の名前（什么名字）」という修飾順序になります。", en: "'what name' in object position." },
        note: { vi: "Không bao giờ thêm 吗 vào cuối câu này.", ja: "文末に「吗」をつけないこと。", en: "No 吗 allowed." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "叫", pinyin: "jiào", han_viet: "khiếu", ja_kanji: "叫", literal_en: "call/named", block_role: "verb" },
          { hanzi: "什么", pinyin: "shénme", han_viet: "thập ma", ja_kanji: "何", literal_en: "what", block_role: "question_word" },
          { hanzi: "名字", pinyin: "míngzi", han_viet: "danh tự", ja_kanji: "名字", literal_en: "name", block_role: "object" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_interr_1",
        prompt: { vi: "Sắp xếp: 'Kia là ai?'", ja: "並べ替え：「あの方は誰ですか？」", en: "Unscramble: 'Who is that?'" },
        correct_order: ["那", "是", "谁", "？"],
        tokens: ["谁", "是", "那", "？"],
        explanation: { vi: "Chủ ngữ (那) + 是 + Đại từ nghi vấn (谁)？", ja: "主語＋是＋谁？の語順です。", en: "Subject + 是 + 谁?" }
      }
    ],
    fill_blank: [
      {
        id: "fb_interr_1",
        sentence_zh: "请问，这个苹果{blank}钱一斤？",
        answer: "多少",
        options: ["多少", "什么", "谁", "几"],
        explanation: { vi: "Hỏi giá tiền dùng 多少钱.", ja: "値段を尋ねるときは「多少钱」を用います。", en: "Use 多少钱 to ask for prices." }
      }
    ],
    error_correction: [
      {
        id: "ec_interr_1",
        wrong_sentence: "你是谁吗？",
        correct_sentence: "你是谁？",
        error_point: { vi: "Thừa trợ từ 吗 khi câu đã có đại từ nghi vấn 谁.", ja: "疑問詞「谁」があるのに「吗」をつけてしまう典型的な誤り。", en: "Adding 吗 when 谁 is already present." },
        explanation: { vi: "Đã có đại từ nghi vấn (谁, 什么, 哪儿...) thì không được dùng 吗.", ja: "疑問代名詞がある文には「吗」をつけません。", en: "Remove 吗 when a question word exists." }
      }
    ],
    quiz: [
      {
        id: "qz_interr_1",
        question: { vi: "Khi nào dùng 几 thay vì 多少?", ja: "「几」と「多少」の使い分けは？", en: "When do you use 几 instead of 多少?" },
        options: [
          { text: { vi: "Khi số lượng ước tính nhỏ hơn 10 và thường phải có lượng từ", ja: "数が概ね10以下で量詞を伴う場合", en: "When expected quantity is under 10 with a measure word" }, correct: true },
          { text: { vi: "Khi hỏi về số tiền lớn", ja: "大きな金額を尋ねるとき", en: "When asking large amounts" }, correct: false }
        ],
        explanation: { vi: "几 dùng cho số dưới 10 và bắt buộc có lượng từ (几本书, 几个人).", ja: "「几」は10未満の数量に量詞を伴って使います。", en: "几 is for numbers under 10 and requires a measure word." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Giữ nguyên trật tự câu khẳng định, đặt đại từ nghi vấn vào đúng vị trí cần hỏi và KHÔNG thêm 吗.",
        ja: "平叙文の語順のまま聞きたい部分に疑問詞を置き、「吗」はつけない。",
        en: "Replace the target information with the wh-word in-situ; never add 吗."
      },
      remember: [
        { vi: "Tuyệt đối không kết hợp đại từ nghi vấn với 吗 (sai: 你叫什么名字吗？).", ja: "疑問詞文末に「吗」はつけない（禁忌：你叫什么名字吗？）。", en: "Never combine wh-words with 吗." }
      ]
    }
  },

  // 3. hsk1_bu_negation
  {
    id: "hsk1_bu_negation",
    level: "HSK1",
    level_num: 1,
    category: "negation",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["不", "bù", "bú", "phủ định", "không", "not"],
    formula: "S + 不 + Động từ / Tính từ",
    formula_plain: {
      vi: "Chủ ngữ + 不 + Động từ / Tính từ (Không làm / Không thế nào)",
      ja: "主語 ＋ 不 ＋ 動詞／形容詞（〜しない、〜ではない）",
      en: "Subject + 不 + Verb / Adjective (Do not / Is not)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ phủ định 不", ja: "否定副詞 不", en: "Negative Adverb 不" }, role: "negation", color: "#EF4444" },
      { label: { vi: "Động từ / Tính từ", ja: "動詞／形容詞", en: "Verb / Adjective" }, role: "predicate", color: "#10B981" }
    ],
    related_ids: ["hsk1_mei_meiyou_negation", "hsk1_shi_sentence"],
    confusable_with: [
      {
        id: "hsk1_mei_meiyou_negation",
        diff: {
          vi: "不 phủ định thói quen, ý chí chủ quan, sự thật hiển nhiên hoặc hiện tại/tương lai. 没 phủ định sự việc đã xảy ra hoặc phủ định động từ 有.",
          ja: "「不」は意志・習慣・現在／未来の否定。「没」は過去の動作の未発生や「有」の否定。",
          en: "不 negates habits, intentions, and present/future. 没 negates past occurrence or 有."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phó từ phủ định 不 (bù)",
        concept: "Dùng 不 đặt trước động từ hoặc tính từ để biểu thị ý phủ định: không muốn làm, không có thói quen làm, hoặc tính chất không như vậy.",
        grammar_notes: [
          "Quy tắc biến điệu: 不 đọc là bù (thanh 4), nhưng khi đứng trước từ mang thanh 4 thì đổi thành bú (thanh 2), ví dụ: 不是 (bú shì), 不要 (bú yào).",
          "Phủ định tính từ: 不冷 (không lạnh), 不好 (không tốt).",
          "Phủ định động từ năng nguyện: 不想 (không muốn), 不会 (không biết/sẽ không)."
        ],
        pedagogical_tips: "Nhắc nhở học viên quy tắc biến điệu thanh điệu của chữ 不."
      },
      ja: {
        title: "否定副詞「不（bù）」",
        concept: "動詞や形容詞の前に「不」を置いて、意志・習慣・性質の否定（〜しない、〜くない）を表します。",
        grammar_notes: [
          "変調ルール：第4声の前では第2声（bú）に変化する（例：不是 bú shì、不对 bú duì）。",
          "形容詞の否定：「不冷（寒くない）」、「不贵（高くない）」。",
          "動詞の否定：「不去（行かない・行く意志がない）」、「不吃（食べない）」。"
        ],
        pedagogical_tips: "変調のルール（第4声の前で第2声）を徹底的に定着させましょう。"
      },
      en: {
        title: "Negation with 不 (bù)",
        concept: "Placed before verbs or adjectives to express negation of habits, intentions, or conditions.",
        grammar_notes: [
          "Tone change rule: bù changes to bú before another 4th-tone syllable (e.g. 不是 bú shì).",
          "Used for general facts, habitual actions, and present/future intentions.",
          "Used to negate adjectives: 不大 (not big), 不冷 (not cold)."
        ],
        pedagogical_tips: "Essential tone sandhi: bù + 4th tone -> bú."
      }
    },
    fill_template: {
      template_zh: "我今天{negation}去学校。",
      template_vi: "Hôm nay tôi {negation} đi học.",
      slots: [
        { name: "negation", type: "adverb", options: ["不", "没", "别"] }
      ]
    },
    collocations: [
      { pattern: "不去", pinyin: "bù qù", meaning_vi: "Không đi", meaning_en: "Not going" },
      { pattern: "不是", pinyin: "bú shì", meaning_vi: "Không phải là", meaning_en: "Is not" }
    ],
    examples: [
      {
        zh: "我不喝茶，我喝水。",
        pinyin: "Wǒ bù hē chá, wǒ hē shuǐ.",
        translations: { vi: "Tôi không uống trà, tôi uống nước.", ja: "私はお茶を飲みません、水を飲みます。", en: "I do not drink tea, I drink water." },
        literal_en: "I not drink tea, I drink water.",
        scenario: { vi: "Từ chối đồ uống", ja: "飲み物の好みを伝える", en: "Declining a drink" },
        tone_tip: { vi: "不 đứng trước hē (thanh 1) giữ nguyên thanh 4 (bù).", ja: "「喝（hē）」は第1声なので「不」は第4声（bù）のままです。", en: "Pronounced bù before 1st tone." },
        word_order_diff: { vi: "Trật tự giống hệt tiếng Việt (không uống = 不喝).", ja: "語順はS＋否定＋Vで日本語と異なります。", en: "Same S + not + V pattern." },
        note: { vi: "Biểu thị thói quen hoặc sở thích.", ja: "個人の習慣や意志の否定を表します。", en: "Expresses habit or preference." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", literal_en: "I", block_role: "subject" },
          { hanzi: "不", pinyin: "bù", han_viet: "bất", ja_kanji: "不", literal_en: "not", block_role: "negation" },
          { hanzi: "喝", pinyin: "hē", han_viet: "hát", ja_kanji: "喝", literal_en: "drink", block_role: "verb" },
          { hanzi: "茶", pinyin: "chá", han_viet: "trà", ja_kanji: "茶", literal_en: "tea", block_role: "object" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_bu_1",
        prompt: { vi: "Sắp xếp: 'Anh ấy không phải là bác sĩ.'", ja: "並べ替え：「彼は医者ではありません。」", en: "Unscramble: 'He is not a doctor.'" },
        correct_order: ["他", "不", "是", "医生", "。"],
        tokens: ["医生", "他", "是", "不", "。"],
        explanation: { vi: "S + 不 + 是 + Danh từ.", ja: "主語＋不是＋名詞の基本構文です。", en: "Subject + 不是 + Noun." }
      }
    ],
    fill_blank: [
      {
        id: "fb_bu_1",
        sentence_zh: "今天天气{blank}冷，很舒服。",
        answer: "不",
        options: ["不", "没", "别", "很"],
        explanation: { vi: "Phủ định tính từ 冷 dùng 不冷.", ja: "形容詞の否定には「不」を使います。", en: "Use 不 to negate adjectives like 冷." }
      }
    ],
    error_correction: [
      {
        id: "ec_bu_1",
        wrong_sentence: "我昨天不去商店。",
        correct_sentence: "我昨天没去商店。",
        error_point: { vi: "Dùng 不 để phủ định hành động đã xảy ra trong quá khứ (昨天).", ja: "過去の動作（昨天）の未発生に「不」を使ってしまっている誤り。", en: "Using 不 instead of 没 for past events." },
        explanation: { vi: "Hành động trong quá khứ chưa xảy ra phải dùng 没去, không dùng 不去.", ja: "過去に行わなかった動作には「没＋動詞」を用います。", en: "Past non-occurrence requires 没 + verb." }
      }
    ],
    quiz: [
      {
        id: "qz_bu_1",
        question: { vi: "Trong trường hợp nào 不 đọc thành bú (thanh 2)?", ja: "「不」が第2声（bú）に変化するのはどんな時？", en: "When does 不 change to 2nd tone (bú)?" },
        options: [
          { text: { vi: "Khi đứng trước một từ mang thanh 4 (như 是, 对, 要)", ja: "第4声の語（是・对・要など）の直前", en: "Before another 4th-tone syllable (like 是, 对, 要)" }, correct: true },
          { text: { vi: "Khi đứng ở cuối câu", ja: "文末にあるとき", en: "At the end of a sentence" }, correct: false }
        ],
        explanation: { vi: "Quy tắc biến điệu: bù + thanh 4 -> bú + thanh 4.", ja: "第4声同士の連続を避けるため第2声になります。", en: "Tone sandhi prevents consecutive 4th tones." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 不 + V/Adj: Phủ định thói quen, ý chí, tính chất hoặc tương lai; đổi giọng thành bú trước thanh 4.",
        ja: "主語＋不＋動詞/形容詞：習慣・意志・性質の否定。第4声の前で「bú」に変調。",
        en: "S + 不 + V/Adj negates habits, intentions, and traits; changes to bú before 4th tone."
      },
      remember: [
        { vi: "Không dùng 不 cho quá khứ (hôm qua không đi = 没去, không nói 不去).", ja: "過去の不発生には「没」を使う。", en: "Use 没 for past non-action." }
      ]
    }
  },

  // 4. hsk1_mei_meiyou_negation
  {
    id: "hsk1_mei_meiyou_negation",
    level: "HSK1",
    level_num: 1,
    category: "negation",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["没", "没有", "méi", "méiyǒu", "phủ định quá khứ", "chưa", "did not", "have not"],
    formula: "S + 没 / 没有 + Động từ (+ Tân ngữ)",
    formula_plain: {
      vi: "Chủ ngữ + 没 (没有) + Động từ (Chưa làm / Đã không làm)",
      ja: "主語 ＋ 没（没有） ＋ 動詞（〜しなかった、まだ〜していない）",
      en: "Subject + 没 / 没有 + Verb (Did not / Has not yet)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ 没 / 没有", ja: "否定副詞 没／没有", en: "Negative Adverb 没 / 没有" }, role: "negation", color: "#EF4444" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_bu_negation", "hsk2_le_completion_aspect"],
    confusable_with: [
      {
        id: "hsk2_le_completion_aspect",
        diff: {
          vi: "Khi câu có 没/没有 phủ định hành động, tuyệt đối KHÔNG dùng 了 ở sau động từ hay cuối câu.",
          ja: "「没」で動作の未完了を否定するとき、文末や動詞の後に「了」をつけてはいけません。",
          en: "Never use 了 in a sentence negated by 没/没有."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phó từ phủ định 没 / 没有 (méi / méiyǒu)",
        concept: "Dùng để phủ định một hành động chưa hoàn thành, chưa xảy ra trong quá khứ hoặc hiện tại.",
        grammar_notes: [
          "没 là dạng rút gọn của 没有 trước động từ: 我没去 = 我没有去.",
          "Quy tắc vàng: Khi đã dùng 没/没有 thì KHÔNG dùng trợ từ 了 nữa (sai: 我没吃了).",
          "Phủ định sự sở hữu: 我没有自行车 (Tôi không có xe đạp)."
        ],
        pedagogical_tips: "Cảnh báo học sinh lỗi sai phổ biến nhất: ghép '没...了'."
      },
      ja: {
        title: "否定副詞「没／没有（méi / méiyǒu）」",
        concept: "過去の動作の不発生（〜しなかった）や、現時点での未完了（まだ〜していない）を表します。",
        grammar_notes: [
          "動詞の前では「没」単独でも「没有」でも使えます（我没买＝我没有买）。",
          "最重要ルール：「没」を使う否定文には完了の「了」を絶対につけない（誤：我没去看了）。"
        ],
        pedagogical_tips: "「没＋動詞＋了」のNGパターンを反復練習で防ぎましょう。"
      },
      en: {
        title: "Negation with 没 / 没有 (méi / méiyǒu)",
        concept: "Used to negate past actions (did not do) or incomplete actions (have not yet done).",
        grammar_notes: [
          "没 and 没有 are interchangeable before verbs: 我没买 = 我没有买.",
          "Golden rule: Never use 了 in a sentence negated by 没.",
          "Also negates possession: 我没有钱 (I don't have money)."
        ],
        pedagogical_tips: "Strictly drill avoiding '没 + V + 了'."
      }
    },
    fill_template: {
      template_zh: "我今天早上{negation}吃早饭。",
      template_vi: "Sáng nay tôi {negation} ăn sáng.",
      slots: [
        { name: "negation", type: "adverb", options: ["没", "没有", "不"] }
      ]
    },
    collocations: [
      { pattern: "没去", pinyin: "méi qù", meaning_vi: "Chưa đi / Đã không đi", meaning_en: "Did not go" },
      { pattern: "没看见", pinyin: "méi kànjiàn", meaning_vi: "Không nhìn thấy", meaning_en: "Did not see" }
    ],
    examples: [
      {
        zh: "他昨天没来上课。",
        pinyin: "Tā zuótiān méi lái shàngkè.",
        translations: { vi: "Hôm qua anh ấy không đến lớp học.", ja: "彼は昨日授業に来ませんでした。", en: "He did not come to class yesterday." },
        literal_en: "He yesterday not come attend class.",
        scenario: { vi: "Điểm danh lớp học", ja: "出欠の報告", en: "Class attendance report" },
        tone_tip: { vi: "没 đọc là méi (thanh 2).", ja: "「没」は第2声です。", en: "Pronounced méi (2nd tone)." },
        word_order_diff: { vi: "Thời gian (昨天) đứng trước 没.", ja: "時間詞の後に否定辞「没」を置きます。", en: "Time word precedes 没." },
        note: { vi: "Tuyệt đối không thêm 了 vào cuối câu.", ja: "文末に「了」をつけないこと。", en: "Do not add 了." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "昨天", pinyin: "zuótiān", han_viet: "tác thiên", ja_kanji: "昨日", literal_en: "yesterday", block_role: "time" },
          { hanzi: "没", pinyin: "méi", han_viet: "một", ja_kanji: "没", literal_en: "did not", block_role: "negation" },
          { hanzi: "来", pinyin: "lái", han_viet: "lai", ja_kanji: "来", literal_en: "come", block_role: "verb" },
          { hanzi: "上课", pinyin: "shàngkè", han_viet: "thượng khóa", ja_kanji: "授業を受ける", literal_en: "attend class", block_role: "object" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_mei_1",
        prompt: { vi: "Sắp xếp: 'Tôi chưa xem bộ phim này.'", ja: "並べ替え：「私はこの映画を観ていません。」", en: "Unscramble: 'I did not watch this movie.'" },
        correct_order: ["我", "没", "看", "这个", "电影", "。"],
        tokens: ["电影", "看", "我", "这个", "没", "。"],
        explanation: { vi: "S + 没 + V + Tân ngữ.", ja: "主語＋没＋動詞＋目的語の語順です。", en: "Subject + 没 + Verb + Object." }
      }
    ],
    fill_blank: [
      {
        id: "fb_mei_1",
        sentence_zh: "妈妈做的菜，我还没{blank}呢。",
        answer: "吃",
        options: ["吃", "吃了", "吃过", "在吃"],
        explanation: { vi: "Sau 没/还没 động từ để nguyên mẫu, không thêm 了.", ja: "「还没」の後には動詞原形を置き、「了」はつけません。", en: "Base verb follows 没; no 了 allowed." }
      }
    ],
    error_correction: [
      {
        id: "ec_mei_1",
        wrong_sentence: "我昨天没去学校了。",
        correct_sentence: "我昨天没去学校。",
        error_point: { vi: "Dùng thừa 了 khi câu đã có 没 phủ định hành động.", ja: "「没」の否定文に「了」をつけてしまった典型的な誤文。", en: "Retaining 了 in a 没-negated sentence." },
        explanation: { vi: "Khi phủ định bằng 没/没有, bỏ hoàn toàn trợ từ 了.", ja: "「没」で否定する際は「了」を削除します。", en: "Drop 了 when negating with 没." }
      }
    ],
    quiz: [
      {
        id: "qz_mei_1",
        question: { vi: "Câu nào sau đây đúng ngữ pháp?", ja: "正しい文はどれですか？", en: "Which sentence is grammatically correct?" },
        options: [
          { text: { vi: "我没买那本书。", ja: "我没买那本书。", en: "我没买那本书。" }, correct: true },
          { text: { vi: "我没买了那本书。", ja: "我没买了那本书。", en: "我没买了那本书。" }, correct: false }
        ],
        explanation: { vi: "Đã có 没 thì không được có 了.", ja: "「没」と「了」は共存できません。", en: "没 and 了 cannot co-occur." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 没(有) + V: Phủ định hành động chưa xảy ra hoặc quá khứ; TUYỆT ĐỐI không dùng kèm 了.",
        ja: "主語＋没(有)＋動詞：過去・未完了の否定。完了の「了」は絶対に使わない。",
        en: "S + 没 + Verb negates past/incomplete actions; NEVER combine with 了."
      },
      remember: [
        { vi: "Quy tắc cấm kỵ: 没 và 了 không bao giờ đi cùng nhau.", ja: "「没」と「了」の共存は絶対にNG。", en: "Never combine 没 and 了 in the same predicate." }
      ]
    }
  },

  // 5. hsk1_hen_adjective_predicate
  {
    id: "hsk1_hen_adjective_predicate",
    level: "HSK1",
    level_num: 1,
    category: "sentence_pattern",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["很", "hěn", "câu vị ngữ tính từ", "adjective predicate", "very"],
    formula: "S + 很 + Tính từ (Adj)",
    formula_plain: {
      vi: "Chủ ngữ + 很 + Tính từ (không dùng 是)",
      ja: "主語 ＋ 很 ＋ 形容詞（「是」は使わない）",
      en: "Subject + 很 + Adjective (do NOT use 是)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ liên kết 很", ja: "副詞 很", en: "Link Adverb 很" }, role: "adverb", color: "#EC4899" },
      { label: { vi: "Tính từ", ja: "形容詞", en: "Adjective" }, role: "adjective", color: "#10B981" }
    ],
    related_ids: ["hsk1_shi_sentence", "hsk1_tai_le_exclamation"],
    confusable_with: [
      {
        id: "hsk1_shi_sentence",
        diff: {
          vi: "Người học thường nói sai: 我是忙 (Tôi là bận). Đúng phải là: 我很忙. Tuyệt đối không dùng 是 trước tính từ đơn lẻ.",
          ja: "学習者が犯しやすい誤り「我是忙」。形容詞述語文では「是」を使わず「很」を添えます。",
          en: "Beginners often say '我是忙' (incorrect). Must say '我很忙'. Omit 是 before bare adjectives."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu vị ngữ tính từ và phó từ liên kết 很 (hěn)",
        concept: "Trong tiếng Trung, tính từ có thể trực tiếp làm vị ngữ mà không cần động từ 是. Trong câu khẳng định, người ta thường đệm phó từ 很 vào trước tính từ để câu nghe tự nhiên và cân đối (lúc này 很 mang nghĩa rất nhẹ hoặc chỉ đóng vai trò liên kết).",
        grammar_notes: [
          "Nếu bỏ 很 (ví dụ: 我忙): câu sẽ ngầm mang sắc thái so sánh (Tôi bận, còn người khác không bận).",
          "Khi phủ định: dùng 不 đứng ngay trước tính từ, bỏ 很 (我不忙).",
          "Nếu muốn nhấn mạnh mức độ 'rất', cần phát âm nhấn mạnh chữ 很."
        ],
        pedagogical_tips: "Khắc sâu nguyên tắc: 'Tính từ tiếng Trung tự nó đã là vị ngữ, không cần 是'."
      },
      ja: {
        title: "形容詞述語文と副詞「很（hěn）」",
        concept: "中国語では形容詞が直接述語になれます（「是」は不要）。肯定文では座りの良さのため「很」を添えるのが一般的です。",
        grammar_notes: [
          "「很」は常に強い「とても」を意味するわけではなく、文を落ち着かせるクッションの役割を果たします。",
          "否定するときは「很」を外して「不＋形容詞」とします（例：我不冷）。",
          "「我是忙」は文法的に間違いです。"
        ],
        pedagogical_tips: "「名詞＋是＋形容詞」のNGパターンを徹底指導してください。"
      },
      en: {
        title: "Adjective Predicate Sentences with 很 (hěn)",
        concept: "Adjectives act directly as verbs/predicates in Chinese without copula 是. In simple affirmative statements, 很 is typically inserted as a structural link.",
        grammar_notes: [
          "Bare adjectives without 很 often imply an unspoken contrast.",
          "To negate: replace 很 with 不 (我不忙, not 我不很忙).",
          "Never insert 是 before plain adjectives (e.g., 我是高兴 is wrong)."
        ],
        pedagogical_tips: "Emphasize: No 是 before adjectives."
      }
    },
    fill_template: {
      template_zh: "今天天气{adverb}好。",
      template_vi: "Hôm nay thời tiết {adverb} tốt.",
      slots: [
        { name: "adverb", type: "adverb", options: ["很", "非常", "不", "太"] }
      ]
    },
    collocations: [
      { pattern: "很好", pinyin: "hěn hǎo", meaning_vi: "Rất tốt", meaning_en: "Very good" },
      { pattern: "很忙", pinyin: "hěn máng", meaning_vi: "Rất bận", meaning_en: "Very busy" }
    ],
    examples: [
      {
        zh: "汉语很有趣。",
        pinyin: "Hànyǔ hěn yǒuqù.",
        translations: { vi: "Tiếng Trung rất thú vị.", ja: "中国語はとても面白いです。", en: "Chinese is very interesting." },
        literal_en: "Chinese very interesting.",
        scenario: { vi: "Đánh giá môn học", ja: "語学学習の感想", en: "Subject comment" },
        tone_tip: { vi: "很 (thanh 3) đi với 有 (thanh 3) đổi thành hén yǒu.", ja: "「很（第3声）」＋「有（第3声）」で「hén」に変調します。", en: "3rd tone sandhi: hěn + yǒu -> hén yǒu." },
        word_order_diff: { vi: "Không dùng 是 trước 有趣.", ja: "「是」を挟まずに「很＋形容詞」とします。", en: "No copula is used." },
        note: { vi: "Rất hay gặp trong giao tiếp thường ngày.", ja: "日常会話で最も頻出する文型の一つです。", en: "One of the most frequent patterns." },
        tokens: [
          { hanzi: "汉语", pinyin: "Hànyǔ", han_viet: "Hán ngữ", ja_kanji: "中国語", literal_en: "Chinese language", block_role: "subject" },
          { hanzi: "很", pinyin: "hěn", han_viet: "hẩn", ja_kanji: "とても", literal_en: "very", block_role: "adverb" },
          { hanzi: "有趣", pinyin: "yǒuqù", han_viet: "hữu thú", ja_kanji: "面白い", literal_en: "interesting", block_role: "adjective" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_hen_1",
        prompt: { vi: "Sắp xếp: 'Hôm nay tôi rất bận.'", ja: "並べ替え：「今日私はとても忙しいです。」", en: "Unscramble: 'I am very busy today.'" },
        correct_order: ["我", "今天", "很", "忙", "。"],
        tokens: ["很", "忙", "今天", "我", "。"],
        explanation: { vi: "Chủ ngữ (我) + Thời gian (今天) + 很 + Tính từ (忙).", ja: "主語＋時間＋很＋形容詞の順です。", en: "Subject + Time + 很 + Adjective." }
      }
    ],
    fill_blank: [
      {
        id: "fb_hen_1",
        sentence_zh: "这个衣服{blank}漂亮。",
        answer: "很",
        options: ["很", "是", "在", "有"],
        explanation: { vi: "Trước tính từ 漂亮 dùng phó từ 很, không dùng 是.", ja: "形容詞の前には「是」ではなく副詞「很」を置きます。", en: "Place 很 before adjective 漂亮; never 是." }
      }
    ],
    error_correction: [
      {
        id: "ec_hen_1",
        wrong_sentence: "我是很高兴。",
        correct_sentence: "我很高兴。",
        error_point: { vi: "Dùng thừa động từ 是 trước vị ngữ tính từ 高兴.", ja: "形容詞述語文に「是」を入れてしまっている誤り。", en: "Inserting 是 before an adjective predicate." },
        explanation: { vi: "Bỏ 是, chỉ cần nói 我很高兴.", ja: "「是」を取り除き、「我很高兴」とします。", en: "Remove 是; say 我很高兴." }
      }
    ],
    quiz: [
      {
        id: "qz_hen_1",
        question: { vi: "Trong câu '他很高', phó từ '很' có nhất thiết phải dịch là 'rất' không?", ja: "「他很高」の「很」は必ず「とても」と強く訳すべきですか？", en: "Does '很' in '他很高' always strictly mean 'very'?" },
        options: [
          { text: { vi: "Không, 很 thường chỉ làm cầu nối ngữ pháp giúp câu tự nhiên, hài hòa", ja: "いいえ、文のバランスを保つ文法的なクッションであることが多い", en: "No, it often functions merely as a structural link" }, correct: true },
          { text: { vi: "Có, luôn biểu thị mức độ cực kỳ cao", ja: "はい、常に最上級の強調を表す", en: "Yes, it always signifies intense degree" }, correct: false }
        ],
        explanation: { vi: "Trong câu vị ngữ tính từ cơ bản, 很 đóng vai trò làm đầy nhịp điệu cho câu.", ja: "述語の座りを安定させる機能が強いためです。", en: "It primarily balances rhythm in simple affirmative sentences." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 很 + Tính từ: Tính từ tự làm vị ngữ, dùng 很 làm đệm ngữ pháp; KHÔNG dùng 是.",
        ja: "主語＋很＋形容詞：形容詞が直接述語になり「是」は不要。「很」がクッション役。",
        en: "Subject + 很 + Adjective: Adjectives act as predicates; use 很 and omit 是."
      },
      remember: [
        { vi: "Lỗi kinh điển: Không bao giờ nói 我是忙 hay 我是好.", ja: "「我是＋形容詞」は絶対NG。", en: "Never say '我是 + Adjective'." }
      ]
    }
  },

  // 6. hsk1_numeral_measure_word
  {
    id: "hsk1_numeral_measure_word",
    level: "HSK1",
    level_num: 1,
    category: "measure_word",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["量词", "个", "本", "杯", "块", "支", "số lượng từ", "measure words", "classifier"],
    formula: "Số từ (hoặc 这/那) + Lượng từ + Danh từ",
    formula_plain: {
      vi: "Số từ + Lượng từ + Danh từ (Bắt buộc phải có lượng từ ở giữa)",
      ja: "数詞（または 这／那） ＋ 量詞 ＋ 名詞（名詞の前には量詞が必須）",
      en: "Number (or 这/那) + Measure Word + Noun"
    },
    structure_blocks: [
      { label: { vi: "Số từ / Chỉ từ", ja: "数詞／指示詞", en: "Numeral / Demonstrative" }, role: "numeral", color: "#3B82F6" },
      { label: { vi: "Lượng từ", ja: "量詞", en: "Measure Word" }, role: "classifier", color: "#F59E0B" },
      { label: { vi: "Danh từ", ja: "名詞", en: "Noun" }, role: "object", color: "#10B981" }
    ],
    related_ids: ["hsk1_interrogative_pronouns"],
    confusable_with: [
      {
        id: "hsk1_interrogative_pronouns",
        diff: {
          vi: "Khi dùng 几 để hỏi số lượng, bắt buộc phải có lượng từ (几本书). Còn 多少 có thể có hoặc không có lượng từ.",
          ja: "「几」で尋ねる時は量詞が必須（几个人）。「多少」は量詞を省略できます。",
          en: "几 always requires a measure word; 多少 can take nouns directly."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc Số từ + Lượng từ + Danh từ (个, 本, 杯, 块...)",
        concept: "Trong tiếng Trung, số từ không thể đi trực tiếp với danh từ mà bắt buộc phải có một lượng từ trung gian phù hợp với đặc điểm của danh từ đó.",
        grammar_notes: [
          "Lượng từ đa năng: 个 (gè) - người, quả, cái... (一个人, 一个苹果).",
          "Lượng từ cho sách vở: 本 (běn) - 一本书.",
          "Lượng từ cho đồ uống/chất lỏng trong cốc: 杯 (bēi) - 一杯茶.",
          "Chỉ từ 这 (này) và 那 (kia) khi đi với danh từ cũng phải kèm lượng từ: 这个人, 那本书."
        ],
        pedagogical_tips: "Nhấn mạnh thói quen: Khi học từ mới danh từ, phải học kèm lượng từ tương ứng của nó."
      },
      ja: {
        title: "数詞＋量詞＋名詞構造（个・本・杯など）",
        concept: "中国語では数詞が直接名詞を修飾できず、必ず間に「量詞（助数詞）」を挟む必要があります。",
        grammar_notes: [
          "万能量詞「个（gè）」：人や一般的な物（一个人、一个杯子）。",
          "本・書籍の量詞「本（běn）」：一本书。",
          "コップ・杯の量詞「杯（bēi）」：一杯水。",
          "「这（これ）」「那（あれ）」も量詞を伴います（这本书、那个人）。"
        ],
        pedagogical_tips: "名詞を覚える際は対応する量詞とセットで覚えるよう指導します。"
      },
      en: {
        title: "Number + Measure Word + Noun Structure",
        concept: "Numbers and demonstratives cannot directly modify nouns in Chinese; an appropriate classifier/measure word is required between them.",
        grammar_notes: [
          "Universal classifier 个 (gè): 一个人 (one person), 一个问题 (one question).",
          "For books/volumes: 本 (běn) - 一本书.",
          "For cups/glasses: 杯 (bēi) - 一杯咖啡.",
          "Demonstratives also require measure words: 这个, 那个."
        ],
        pedagogical_tips: "Always memorize nouns alongside their default measure words."
      }
    },
    fill_template: {
      template_zh: "桌子上有两{classifier}书。",
      template_vi: "Trên bàn có hai {classifier} sách.",
      slots: [
        { name: "classifier", type: "measure_word", options: ["本", "个", "张", "杯"] }
      ]
    },
    collocations: [
      { pattern: "一个人", pinyin: "yí gè rén", meaning_vi: "Một người", meaning_en: "One person" },
      { pattern: "三本书", pinyin: "sān běn shū", meaning_vi: "Ba quyển sách", meaning_en: "Three books" }
    ],
    examples: [
      {
        zh: "我想买一本书。",
        pinyin: "Wǒ xiǎng mǎi yì běn shū.",
        translations: { vi: "Tôi muốn mua một quyển sách.", ja: "本を1冊買いたいです。", en: "I want to buy a book." },
        literal_en: "I want buy one volume book.",
        scenario: { vi: "Mua sách ở hiệu sách", ja: "書店での買い物", en: "Buying a book" },
        tone_tip: { vi: "一 (yī) đứng trước běn (thanh 3) đổi thành yì (thanh 4).", ja: "「一」は第3声の前で第4声（yì）に変調します。", en: "Tone sandhi: 一 becomes yì before 3rd tone." },
        word_order_diff: { vi: "Giống tiếng Việt: một (số từ) + quyển (lượng từ) + sách (danh từ).", ja: "日本語の「本1冊」に対し中国語は「1冊本」の順になります。", en: "Word order: number + classifier + noun." },
        note: { vi: "Không bao giờ được nói 一书.", ja: "「一书」と量詞を抜かすのは間違いです。", en: "Omission of classifier is ungrammatical." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", literal_en: "I", block_role: "subject" },
          { hanzi: "想", pinyin: "xiǎng", han_viet: "tưởng", ja_kanji: "想", literal_en: "want", block_role: "modal" },
          { hanzi: "买", pinyin: "mǎi", han_viet: "mãi", ja_kanji: "買", literal_en: "buy", block_role: "verb" },
          { hanzi: "一", pinyin: "yī", han_viet: "nhất", ja_kanji: "一", literal_en: "one", block_role: "numeral" },
          { hanzi: "本", pinyin: "běn", han_viet: "bản", ja_kanji: "冊", literal_en: "volume", block_role: "classifier" },
          { hanzi: "书", pinyin: "shū", han_viet: "thư", ja_kanji: "書", literal_en: "book", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_mw_1",
        prompt: { vi: "Sắp xếp: 'Cho tôi một ly cà phê.'", ja: "並べ替え：「コーヒーを1杯ください。」", en: "Unscramble: 'Give me a cup of coffee.'" },
        correct_order: ["给", "我", "一", "杯", "咖啡", "。"],
        tokens: ["咖啡", "一", "我", "给", "杯", "。"],
        explanation: { vi: "Số từ (一) + Lượng từ (杯) + Danh từ (咖啡).", ja: "一＋杯＋咖啡の順序です。", en: "Number + Measure word + Noun." }
      }
    ],
    fill_blank: [
      {
        id: "fb_mw_1",
        sentence_zh: "他买了三{blank}苹果。",
        answer: "个",
        options: ["个", "本", "支", "口"],
        explanation: { vi: "Lượng từ cho táo (苹果) là 个.", ja: "リンゴを数える量詞は「个」です。", en: "Apples take the measure word 个." }
      }
    ],
    error_correction: [
      {
        id: "ec_mw_1",
        wrong_sentence: "我想喝一水。",
        correct_sentence: "我想喝一杯水。",
        error_point: { vi: "Thiếu lượng từ 杯 giữa số từ 一 và danh từ 水.", ja: "数詞と名詞の間に量詞「杯」が抜けている誤り。", en: "Missing measure word between number and noun." },
        explanation: { vi: "Bắt buộc phải có lượng từ chỉ đồ uống: 一杯水 (một ly nước).", ja: "水のような液体には「杯」や「瓶」などの量詞が必要です。", en: "Liquids require a container measure word like 杯." }
      }
    ],
    quiz: [
      {
        id: "qz_mw_1",
        question: { vi: "Khi nói 'hai quyển sách', tiếng Trung dùng từ nào cho số 2?", ja: "「2冊の本」と言うとき、「2」にはどの語を使いますか？", en: "When saying 'two books', which word is used for 'two'?" },
        options: [
          { text: { vi: "两 (liǎng) - 两本书", ja: "两（liǎng）- 两本书", en: "两 (liǎng) - 两本书" }, correct: true },
          { text: { vi: "二 (èr) - 二本书", ja: "二（èr）- 二本书", en: "二 (èr) - 二本书" }, correct: false }
        ],
        explanation: { vi: "Trước lượng từ, số 2 bắt buộc dùng 两 (liǎng), không dùng 二.", ja: "量詞の前では「二」ではなく「两」を用います。", en: "Use 两 before measure words, not 二." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Số từ / 这 / 那 + Lượng từ + Danh từ: Bắt buộc có lượng từ ở giữa; số 2 dùng 两.",
        ja: "数詞／指示詞＋量詞＋名詞：量詞が必須。数詞の「2」には「两」を使う。",
        en: "Number / 这 / 那 + Classifier + Noun: Classifiers are compulsory; use 两 for 'two'."
      },
      remember: [
        { vi: "Không bao giờ bỏ quên lượng từ khi đếm đồ vật.", ja: "名詞の前の量詞を絶対に抜かさない。", en: "Never omit the classifier when counting." }
      ]
    }
  },

  // 7. hsk1_time_word_position
  {
    id: "hsk1_time_word_position",
    level: "HSK1",
    level_num: 1,
    category: "sentence_pattern",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["时间词", "状语", "hôm nay", "ngày mai", "time adverbial", "word order"],
    formula: "Thời gian + S + V + O  HOẶC  S + Thời gian + V + O",
    formula_plain: {
      vi: "Từ chỉ thời gian đứng ĐẦU CÂU hoặc NGAY SAU CHỦ NGỮ (trước động từ)",
      ja: "時間詞は文頭か、または主語の直後（動詞の前）に置く",
      en: "Time words appear either at the START of sentence or RIGHT AFTER subject (before verb)"
    },
    structure_blocks: [
      { label: { vi: "Thời gian", ja: "時間詞", en: "Time Word" }, role: "time", color: "#8B5CF6" },
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_zai_existence_location"],
    confusable_with: [
      {
        id: "hsk1_zai_existence_location",
        diff: {
          vi: "Người học tiếng Anh/tiếng Việt thường để thời gian ở CUỐI CÂU (I go to school tomorrow -> 我去学校明天 - SAI). Trong tiếng Trung, thời gian TUYỆT ĐỐI không để ở cuối câu.",
          ja: "英語の語順に引きずられて文末に時間を置く誤り（❌ 我去学校明天）。時間は必ず動詞の前に置きます。",
          en: "English puts time at the end ('I go tomorrow'); Chinese NEVER puts time at the end."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Vị trí của từ chỉ thời gian làm trạng ngữ",
        concept: "Trong tiếng Trung, thời gian diễn ra sự việc luôn đóng vai trò là trạng ngữ chỉ thời gian. Trạng ngữ này PHẢI đứng trước động từ chính (đầu câu hoặc sau chủ ngữ).",
        grammar_notes: [
          "Vị trí 1 (Đầu câu): 明天我去北京。 (Ngày mai tôi đi Bắc Kinh - nhấn mạnh thời gian).",
          "Vị trí 2 (Sau chủ ngữ): 我明天去北京。 (Tôi ngày mai đi Bắc Kinh).",
          "Thứ tự sắp xếp thời gian: Từ lớn đến nhỏ (Năm -> Tháng -> Ngày -> Buổi -> Giờ)."
        ],
        pedagogical_tips: "Quy tắc vàng: Thời gian luôn xảy ra trước hành động nên phải ĐỨNG TRƯỚC HÀNH ĐỘNG."
      },
      ja: {
        title: "時間詞（状語）の位置ルール",
        concept: "中国語では動作の行われる時間を表す言葉は、必ず動詞の前に置かれます（文頭、または主語の直後）。",
        grammar_notes: [
          "位置パターンA（文頭）：明天我去北京。（時間を強調）",
          "位置パターンB（主語直後）：我明天去北京。",
          "配列順序：大から小へ（年 ➔ 月 ➔ 日 ➔ 時間帯 ➔ 時刻）。"
        ],
        pedagogical_tips: "英語のように文末に時間詞を置いてしまう誤りを厳重に是正します。"
      },
      en: {
        title: "Position of Time Adverbials",
        concept: "Time words indicating when an action takes place must always be placed BEFORE the verb (either before the subject or right after it).",
        grammar_notes: [
          "Pattern 1: Time + Subject + Verb (e.g. 明天我去学校).",
          "Pattern 2: Subject + Time + Verb (e.g. 我明天去学校).",
          "Order of multiple time units: Biggest to smallest (Year -> Month -> Day -> Time)."
        ],
        pedagogical_tips: "Strictly prohibit placing time words at the end of the sentence."
      }
    },
    fill_template: {
      template_zh: "{subject}{time}去超市买东西。",
      template_vi: "{subject} {time} đi siêu thị mua đồ.",
      slots: [
        { name: "subject", type: "subject", options: ["我", "他", "我们"] },
        { name: "time", type: "time", options: ["今天下午", "明天", "星期天"] }
      ]
    },
    collocations: [
      { pattern: "明天见", pinyin: "míngtiān jiàn", meaning_vi: "Ngày mai gặp", meaning_en: "See you tomorrow" },
      { pattern: "晚上八点", pinyin: "wǎnshang bā diǎn", meaning_vi: "8 giờ tối", meaning_en: "8:00 PM" }
    ],
    examples: [
      {
        zh: "我们下午两点开会。",
        pinyin: "Wǒmen xiàwǔ liǎng diǎn kāihuì.",
        translations: { vi: "Chúng tôi họp lúc hai giờ chiều.", ja: "私たちは午後2時に会議をします。", en: "We have a meeting at 2 PM." },
        literal_en: "We afternoon two o'clock hold meeting.",
        scenario: { vi: "Thông báo lịch làm việc", ja: "会議のスケジュール連絡", en: "Scheduling meeting" },
        tone_tip: { vi: "两点 đọc là liáng diǎn (biến điệu thanh 3).", ja: "「两（第3声）」＋「点（第3声）」で「liáng diǎn」に変調。", en: "Tone sandhi: liǎng + diǎn -> liáng diǎn." },
        word_order_diff: { vi: "Thời gian (下午两点) đứng ngay trước động từ (开会).", ja: "日本語の「午後2時に会議をする」と動詞前の語順が一致。", en: "Time placed directly before verb kāihuì." },
        note: { vi: "Xếp thời gian từ lớn đến bé: 下午 (buổi chiều) trước, 两点 (2 giờ) sau.", ja: "大から小（下午 ➔ 两点）の順序で並べます。", en: "Big unit (下午) before small unit (两点)." },
        tokens: [
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "下午", pinyin: "xiàwǔ", han_viet: "hạ ngọ", ja_kanji: "午後", literal_en: "afternoon", block_role: "time" },
          { hanzi: "两点", pinyin: "liǎng diǎn", han_viet: "lưỡng điểm", ja_kanji: "2時", literal_en: "two o'clock", block_role: "time" },
          { hanzi: "开会", pinyin: "kāihuì", han_viet: "khai hội", ja_kanji: "会議をする", literal_en: "hold meeting", block_role: "verb" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_time_1",
        prompt: { vi: "Sắp xếp: 'Sáng mai tôi đi sân bay.'", ja: "並べ替え：「私は明日の朝空港に行きます。」", en: "Unscramble: 'I am going to the airport tomorrow morning.'" },
        correct_order: ["我", "明天", "早上", "去", "机场", "。"],
        tokens: ["机场", "明天", "去", "我", "早上", "。"],
        explanation: { vi: "S + Thời gian (明天早上) + V (去) + Tân ngữ (机场).", ja: "主語＋時間詞＋動詞＋目的語の順序です。", en: "Subject + Time + Verb + Object." }
      }
    ],
    fill_blank: [
      {
        id: "fb_time_1",
        sentence_zh: "他{blank}回家吃饭。",
        answer: "晚上",
        options: ["晚上", "在晚上", "了晚上", "个晚上"],
        explanation: { vi: "Thời gian đứng trực tiếp trước động từ làm trạng ngữ, không cần giới từ thừa.", ja: "時間詞は助詞なしでそのまま動詞の前に置きます。", en: "Time words directly precede the verb." }
      }
    ],
    error_correction: [
      {
        id: "ec_time_1",
        wrong_sentence: "我看电影昨天晚上。",
        correct_sentence: "我昨天晚上看电影。",
        error_point: { vi: "Đặt từ chỉ thời gian 昨天晚上 ở cuối câu theo thói quen tiếng Anh/Việt.", ja: "時間詞を英文法のように文末に置いてしまった致命的な誤文。", en: "Placing the time phrase at the end of the sentence." },
        explanation: { vi: "Thời gian phải chuyển lên trước động từ: 我昨天晚上看电影.", ja: "時間を動詞「看」の前に移動させます。", en: "Move the time phrase before the verb 看." }
      }
    ],
    quiz: [
      {
        id: "qz_time_1",
        question: { vi: "Thứ tự nào đúng khi nói '8 giờ tối ngày 15 tháng 3 năm 2026'?", ja: "中国語の日時順序として正しいものは？", en: "What is the correct order for dates and times in Chinese?" },
        options: [
          { text: { vi: "2026年3月15日晚上8点 (Từ đơn vị lớn nhất đến nhỏ nhất)", ja: "年 ➔ 月 ➔ 日 ➔ 時間帯 ➔ 時刻（大きい単位から小さい単位へ）", en: "Year -> Month -> Day -> Evening -> Hour (Largest to smallest)" }, correct: true },
          { text: { vi: "晚上8点15日3月2026年 (Từ nhỏ đến lớn)", ja: "時刻から年へ（小さい単位から大きい単位へ）", en: "Hour -> Day -> Month -> Year" }, correct: false }
        ],
        explanation: { vi: "Tiếng Trung luôn tư duy từ bao quát đến chi tiết: Năm -> Tháng -> Ngày -> Giờ.", ja: "中国語では全体から個別（大から小）へ配列します。", en: "Always big to small." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Thời gian luôn đứng TRƯỚC ĐỘNG TỪ (đầu câu hoặc sau chủ ngữ), tuyệt đối KHÔNG để cuối câu.",
        ja: "時間詞は必ず動詞の前（文頭か主語直後）。絶対に文末には置かない。",
        en: "Time words MUST appear before the verb; never at the end of the sentence."
      },
      remember: [
        { vi: "Nguyên tắc lớn trước nhỏ sau: Năm -> Tháng -> Ngày -> Giờ.", ja: "順序は大から小（年➔月➔日➔時）。", en: "Order from biggest to smallest unit." }
      ]
    }
  },

  // 8. hsk1_zai_progressive
  {
    id: "hsk1_zai_progressive",
    level: "HSK1",
    level_num: 1,
    category: "aspect",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["正在", "在", "呢", "zhèngzài", "zài", "ne", "thì hiện tại tiếp diễn", "đang làm gì", "progressive aspect"],
    formula: "S + 正在 / 在 + Động từ (+ Tân ngữ) (+ 呢)",
    formula_plain: {
      vi: "Chủ ngữ + 在 / 正在 + Động từ (+ Tân ngữ) (+ 呢) (Đang làm gì)",
      ja: "主語 ＋ 正在／在 ＋ 動詞（＋目的語）（＋呢）（〜しているところだ）",
      en: "Subject + 正在 / 在 + Verb (+ Object) (+ 呢) (In the middle of doing...)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ tiếp diễn 在/正在", ja: "進行副詞 在／正在", en: "Progressive Adverb" }, role: "aspect", color: "#EC4899" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ ngữ khí 呢 (tùy chọn)", ja: "語気助詞 呢（任意）", en: "Sentence Final 呢" }, role: "particle", color: "#6366F1" }
    ],
    related_ids: ["hsk1_zai_existence_location", "hsk2_zhe_durative_aspect"],
    confusable_with: [
      {
        id: "hsk1_zai_existence_location",
        diff: {
          vi: "在 chỉ nơi chốn đi với Danh từ địa điểm (我在家 - Tôi ở nhà). 在 tiếp diễn đi trực tiếp với Động từ (我在吃饭 - Tôi đang ăn cơm).",
          ja: "場所の「在」は後ろに場所名詞（我在家）。進行の「在」は動詞の直前（我在看书）。",
          en: "Location 在 takes a place noun; progressive 在 precedes an action verb."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 在 / 正在 (+ 呢) biểu thị hành động đang diễn ra",
        concept: "Dùng phó từ 在 hoặc 正在 đặt trước động từ (cuối câu có thể kèm trợ từ 呢) để diễn tả một hành động đang trong quá trình diễn ra tại thời điểm nói.",
        grammar_notes: [
          "Các biến thể tương đương: S + 在 + V, S + 正在 + V, S + 正 + V + 呢, S + V + 呢.",
          "Phủ định: dùng 没在 + V, KHÔNG dùng 不在 (Ví dụ: 他没在看书, không nói 他不在看书).",
          "Nếu có địa điểm: S + 在 + Nơi chốn + V (Ví dụ: 我在图书馆看书呢)."
        ],
        pedagogical_tips: "Nhấn mạnh phủ định của hành động đang diễn ra là 没在."
      },
      ja: {
        title: "動作の進行「在／正在＋動詞（＋呢）」",
        concept: "動詞の前に「在」または「正在」を置くことで、動作が現在進行中であることを表します（文末に「呢」を添えることも多い）。",
        grammar_notes: [
          "進行の否定は「没在＋動詞」（「不在」は不在を意味してしまうため不可）。",
          "「正」「在」「正在」「……呢」は相互に組み合わせて使えます。"
        ],
        pedagogical_tips: "進行形の否定は「没在」である点をしっかり指導してください。"
      },
      en: {
        title: "Progressive Aspect with 在 / 正在 (+ 呢)",
        concept: "Indicates an action currently in progress (equivalent to '-ing' in English).",
        grammar_notes: [
          "Variants: 在 + V, 正在 + V, or V + 呢.",
          "Negative form is 没在 + V (never 不在).",
          "When including location: S + 在 + Location + Verb."
        ],
        pedagogical_tips: "Highlight that negation uses 没在, not 不在."
      }
    },
    fill_template: {
      template_zh: "他现在{aspect}睡觉呢，请小声点。",
      template_vi: "Bây giờ anh ấy {aspect} ngủ, xin hãy nói nhỏ một chút.",
      slots: [
        { name: "aspect", type: "adverb", options: ["在", "正在", "没在"] }
      ]
    },
    collocations: [
      { pattern: "在看书", pinyin: "zài kànshū", meaning_vi: "Đang đọc sách", meaning_en: "Reading a book" },
      { pattern: "正在打电话", pinyin: "zhèngzài dǎ diànhuà", meaning_vi: "Đang gọi điện thoại", meaning_en: "Making a phone call" }
    ],
    examples: [
      {
        zh: "你正在做什么呢？",
        pinyin: "Nǐ zhèngzài zuò shénme ne?",
        translations: { vi: "Bạn đang làm gì đấy?", ja: "あなたは何をしているところですか？", en: "What are you doing right now?" },
        literal_en: "You in-progress do what particle?",
        scenario: { vi: "Hỏi thăm qua điện thoại", ja: "電話での近況確認", en: "Phone inquiry" },
        tone_tip: { vi: "正在 đọc là zhèngzài (hai thanh 4 liền nhau).", ja: "「正在」は第4声が連続します。", en: "Both zhèng and zài are 4th tone." },
        word_order_diff: { vi: "Đang (正在) + Làm (做) + Gì (什么) + nhé/đấy (呢).", ja: "「正在＋動詞＋目的語＋呢」の標準パターンです。", en: "Classic progressive question format." },
        note: { vi: "Mẫu câu đàm thoại cực kỳ phổ biến trong HSK 1.", ja: "日常のメッセージや通話で頻出します。", en: "Super common daily expression." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "正在", pinyin: "zhèngzài", han_viet: "chính tại", ja_kanji: "まさに〜している", literal_en: "in the middle of", block_role: "aspect" },
          { hanzi: "做", pinyin: "zuò", han_viet: "tác", ja_kanji: "する", literal_en: "do", block_role: "verb" },
          { hanzi: "什么", pinyin: "shénme", han_viet: "thập ma", ja_kanji: "何", literal_en: "what", block_role: "object" },
          { hanzi: "呢", pinyin: "ne", han_viet: "ni", ja_kanji: "呢", literal_en: "particle", block_role: "particle" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_prog_1",
        prompt: { vi: "Sắp xếp: 'Bố đang nghe nhạc.'", ja: "並べ替え：「父は音楽を聴いているところです。」", en: "Unscramble: 'Dad is listening to music.'" },
        correct_order: ["爸爸", "在", "听", "音乐", "呢", "。"],
        tokens: ["音乐", "爸爸", "听", "在", "呢", "。"],
        explanation: { vi: "Chủ ngữ (爸爸) + 在 + V (听) + Tân ngữ (音乐) + 呢.", ja: "主語＋在＋動詞＋目的語＋呢の配置です。", en: "Subject + 在 + Verb + Object + 呢." }
      }
    ],
    fill_blank: [
      {
        id: "fb_prog_1",
        sentence_zh: "外面{blank}下雨呢，带把伞吧。",
        answer: "在",
        options: ["在", "了", "过", "是"],
        explanation: { vi: "Trời đang mưa (下雨呢) dùng 在 hoặc 正在.", ja: "雨が降っている進行状況を表すので「在」が適切です。", en: "Expresses raining in progress." }
      }
    ],
    error_correction: [
      {
        id: "ec_prog_1",
        wrong_sentence: "他不在看电视，他在睡觉。",
        correct_sentence: "他没在看电视，他在睡觉。",
        error_point: { vi: "Dùng 不在 để phủ định hành động đang diễn ra (不在看电视).", ja: "進行中の動作の否定に「不在」を使ってしまっている誤り。", en: "Using 不在 instead of 没在 to negate ongoing actions." },
        explanation: { vi: "Phủ định của 'đang làm gì' phải dùng 没在, không dùng 不在.", ja: "動作の進行の否定は「没在」と表現します。", en: "Negate progressive actions with 没在." }
      }
    ],
    quiz: [
      {
        id: "qz_prog_1",
        question: { vi: "Phủ định của câu '他在听音乐' là gì?", ja: "「他在听音乐」の否定形は？", en: "What is the negative form of '他在听音乐'?" },
        options: [
          { text: { vi: "他没在听音乐。", ja: "他没在听音乐。", en: "他没在听音乐。" }, correct: true },
          { text: { vi: "他不在听音乐。", ja: "他不在听音乐。", en: "他不在听音乐。" }, correct: false }
        ],
        explanation: { vi: "Phủ định tiếp diễn bắt buộc dùng 没在.", ja: "進行否定には「没在」を用います。", en: "Progressive negation uses 没在." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + (正)在 + V (+ Tân ngữ) (+ 呢): Biểu thị hành động đang tiếp diễn; phủ định bằng 没在.",
        ja: "主語＋(正)在＋動詞(＋呢)：動作の進行を表す。否定は「没在」。",
        en: "S + (正)在 + V (+ 呢): Expresses actions in progress; negated with 没在."
      },
      remember: [
        { vi: "Phủ định của hành động đang diễn ra là 没在, không phải 不在.", ja: "進行の否定は「没在」。「不在」は「居ない」の意味になる。", en: "Always use 没在 for 'not in the middle of doing'." }
      ]
    }
  },

  // 9. hsk1_modal_hui_neng_xiang
  {
    id: "hsk1_modal_hui_neng_xiang",
    level: "HSK1",
    level_num: 1,
    category: "modal",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["会", "能", "想", "huì", "néng", "xiǎng", "động từ năng nguyện", "modal verbs", "can", "want"],
    formula: "S + Động từ năng nguyện (会 / 能 / 想) + Động từ",
    formula_plain: {
      vi: "Chủ ngữ + 会 (biết qua học tập) / 能 (có điều kiện/khả năng) / 想 (muốn) + Động từ",
      ja: "主語 ＋ 助動詞（会・能・想） ＋ 動詞",
      en: "Subject + Modal Verb (会 / 能 / 想) + Verb"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ năng nguyện", ja: "助動詞（能願動詞）", en: "Modal Verb" }, role: "modal", color: "#EC4899" },
      { label: { vi: "Động từ chính", ja: "主動詞", en: "Main Verb" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_bu_negation"],
    confusable_with: [
      {
        id: "hsk1_bu_negation",
        diff: {
          vi: "Phân biệt 会 và 能: 会 là biết làm nhờ trải qua học tập/rèn luyện (会说汉语, 会开车). 能 là có đủ điều kiện khách quan hoặc năng lực thể chất để làm (hôm nay tôi khỏe, tôi có thể đi: 今天我能去).",
          ja: "「会」は学習によって身につけた技能。「能」は条件・能力が許してできること。",
          en: "会 = learned skill through study; 能 = circumstantial possibility or physical ability."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Động từ năng nguyện: 会 (biết), 能 (có thể), 想 (muốn)",
        concept: "Động từ năng nguyện đứng trước động từ chính để biểu thị kỹ năng, khả năng hoặc nguyện vọng của chủ ngữ.",
        grammar_notes: [
          "会 (huì): Biết làm gì thông qua học hỏi (我会游泳 - Tôi biết bơi), hoặc sẽ xảy ra (明天会下雨).",
          "能 (néng): Có thể làm được gì (do điều kiện cho phép: 我现在能走 - Tôi bây giờ có thể đi được rồi).",
          "想 (xiǎng): Muốn, mong muốn (我想学中文 - Tôi muốn học tiếng Trung).",
          "Phủ định đặt 不 trước động từ năng nguyện: 不会, 不能, 不想."
        ],
        pedagogical_tips: "Dạy học sinh mẹo: Có thầy dạy hoặc tự luyện tập mới biết -> dùng 会."
      },
      ja: {
        title: "能願動詞（助動詞）：「会」「能」「想」",
        concept: "動詞の前に置いて、技能、可能性、願望を表す助動詞群です。",
        grammar_notes: [
          "会（できる）：練習や学習によって習得した能力（例：我会说汉语）。また「〜はずだ」の予測。",
          "能（できる）：客観的な条件や状況が許すこと（例：今天我有空，能去）。",
          "想（〜したい）：希望・意向（例：我想喝茶）。",
          "否定形は「不」を前に置く（不会・不能・不想）。"
        ],
        pedagogical_tips: "「会」と「能」の違い（学習得た技能か、状況的可能か）を明確に比較させます。"
      },
      en: {
        title: "Modal Verbs: 会, 能, 想",
        concept: "Placed before main verbs to convey learned skill, physical/circumstantial ability, or intention.",
        grammar_notes: [
          "会 (can/know how to): Learned skill (我会开车 - I know how to drive); also future prediction (会下雨).",
          "能 (can/able to): Circumstantial or physical capacity (我现在能来 - I can come now).",
          "想 (would like to/want): Intention (我想休息 - I want to rest).",
          "Negate by placing 不 before the modal: 不会, 不能, 不想."
        ],
        pedagogical_tips: "Rule of thumb: Learned skills take 会; external permission/possibility takes 能."
      }
    },
    fill_template: {
      template_zh: "我{modal}说一点儿汉语。",
      template_vi: "Tôi {modal} nói một chút tiếng Trung.",
      slots: [
        { name: "modal", type: "modal", options: ["会", "想", "能"] }
      ]
    },
    collocations: [
      { pattern: "会说中文", pinyin: "huì shuō zhōngwén", meaning_vi: "Biết nói tiếng Trung", meaning_en: "Can speak Chinese" },
      { pattern: "不能去", pinyin: "bù néng qù", meaning_vi: "Không thể đi được", meaning_en: "Cannot go" }
    ],
    examples: [
      {
        zh: "你会做中国菜吗？",
        pinyin: "Nǐ huì zuò zhōngguó cài ma?",
        translations: { vi: "Bạn có biết nấu món Trung Quốc không?", ja: "中国料理を作ることができますか？", en: "Can you cook Chinese food?" },
        literal_en: "You can make Chinese dish question?",
        scenario: { vi: "Hỏi về tài nấu nướng", ja: "料理のスキルを尋ねる", en: "Cooking skills" },
        tone_tip: { vi: "会 đọc là huì (thanh 4).", ja: "「会」は第4声です。", en: "Pronounced huì." },
        word_order_diff: { vi: "Trật tự: S (你) + Động từ năng nguyện (会) + Động từ (做) + Tân ngữ (中国菜) + Trợ từ (吗).", ja: "助動詞「会」が本動詞「做」の前に位置します。", en: "Modal precedes the main action." },
        note: { vi: "Nấu ăn là kỹ năng cần học hỏi nên dùng 会.", ja: "料理は学習習得技能なので「会」を使います。", en: "Cooking is a learned skill, thus uses 会." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "会", pinyin: "huì", han_viet: "hội", ja_kanji: "〜できる", literal_en: "can/know how to", block_role: "modal" },
          { hanzi: "做", pinyin: "zuò", han_viet: "tác", ja_kanji: "作る", literal_en: "cook/make", block_role: "verb" },
          { hanzi: "中国菜", pinyin: "zhōngguó cài", han_viet: "Trung Quốc thái", ja_kanji: "中華料理", literal_en: "Chinese food", block_role: "object" },
          { hanzi: "吗", pinyin: "ma", han_viet: "ma", ja_kanji: "か", literal_en: "question particle", block_role: "particle" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_modal_1",
        prompt: { vi: "Sắp xếp: 'Hôm nay tôi rất mệt, không thể đi được.'", ja: "並べ替え：「今日私はとても疲れていて、行けません。」", en: "Unscramble: 'I am tired today, I cannot go.'" },
        correct_order: ["我", "今天", "很累", "，", "不能", "去", "。"],
        tokens: ["很累", "不能", "我", "今天", "去", "，", "。"],
        explanation: { vi: "Phủ định năng lực do mệt dùng 不能去.", ja: "体調・状況による不可能性は「不能＋動詞」です。", en: "Cannot go due to physical state = 不能去." }
      }
    ],
    fill_blank: [
      {
        id: "fb_modal_1",
        sentence_zh: "他从小就学游泳，所以他{blank}游泳。",
        answer: "会",
        options: ["会", "想", "能", "要"],
        explanation: { vi: "Học bơi từ nhỏ (kỹ năng được đào tạo) dùng 会.", ja: "幼少期から習った技能なので「会」が正解です。", en: "Swimming learned through practice takes 会." }
      }
    ],
    error_correction: [
      {
        id: "ec_modal_1",
        wrong_sentence: "我想不去那个晚会。",
        correct_sentence: "我不想去那个晚会。",
        error_point: { vi: "Đặt phó từ phủ định 不 sau động từ năng nguyện 想.", ja: "否定詞「不」を助動詞「想」の後ろに置いてしまった誤り。", en: "Placing 不 after the modal verb 想." },
        explanation: { vi: "Phó từ 不 phải đứng TRƯỚC động từ năng nguyện: 不想去.", ja: "否定は「不想＋動詞」の順にします。", en: "Negation 不 must precede the modal verb: 不想去." }
      }
    ],
    quiz: [
      {
        id: "qz_modal_1",
        question: { vi: "Muốn nói 'Tôi bị ốm, hôm nay không thể đến lớp được', nên dùng từ nào?", ja: "「風邪をひいたので今日は授業に行けません」という時の「できない」は？", en: "To say 'I am sick, so I cannot attend class today', which modal is best?" },
        options: [
          { text: { vi: "不能 (néng) - Do hoàn cảnh/sức khỏe không cho phép", ja: "不能（体調や状況が許さない）", en: "不能 (néng) - Health/situation does not permit" }, correct: true },
          { text: { vi: "不会 (huì) - Không có kỹ năng đi học", ja: "不会（スキルがない）", en: "不会 (huì) - Lacking the skill" }, correct: false }
        ],
        explanation: { vi: "Không thể làm vì lý do sức khỏe khách quan dùng 不能.", ja: "客観的な事情でできない場合は「不能」を使います。", en: "Objective impediment takes 不能." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + (会/能/想) + V: 会 (kỹ năng do học hỏi), 能 (điều kiện/khả năng cho phép), 想 (mong muốn); phủ định bằng 不.",
        ja: "主語＋(会/能/想)＋動詞：会（習得技能）、能（状況的可能）、想（希望）。否定は「不」を前に置く。",
        en: "S + Modal + V: 会 (learned skill), 能 (circumstantial ability), 想 (desire); negate with 不."
      },
      remember: [
        { vi: "Phủ định luôn đặt trước động từ năng nguyện: 不会, 不能, 不想.", ja: "否定辞「不」は助動詞の直前に置く。", en: "Place 不 before the modal verb." }
      ]
    }
  },

  // 10. hsk1_le_modal_change
  {
    id: "hsk1_le_modal_change",
    level: "HSK1",
    level_num: 1,
    category: "particle",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["了", "le", "trợ từ ngữ khí", "thay đổi trạng thái", "change of state", "now"],
    formula: "Mệnh đề / Câu + 了",
    formula_plain: {
      vi: "Câu / Vị ngữ + 了 ở cuối câu (Biểu thị tình huống mới, trạng thái thay đổi: ...rồi)",
      ja: "文末 ＋ 了（状況の変化・新事態の発生：「〜になった」「もう〜だ」）",
      en: "Sentence + 了 at the end (Change of state / New situation: 'now' / 'anymore')"
    },
    structure_blocks: [
      { label: { vi: "Mệnh đề câu", ja: "文・節", en: "Clause" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Trợ từ ngữ khí 了", ja: "語気助詞 了", en: "Sentence Final Particle 了" }, role: "particle", color: "#EC4899" }
    ],
    related_ids: ["hsk2_le_completion_aspect", "hsk1_tai_le_exclamation"],
    confusable_with: [
      {
        id: "hsk2_le_completion_aspect",
        diff: {
          vi: "Trợ từ động thái 了 đứng ngay sau Động từ (V + 了) biểu thị hành động đã hoàn thành. Trợ từ ngữ khí 了 đứng ở CUỐI CÂU biểu thị tình huống mới phát sinh hoặc sự thay đổi trạng thái (trời mưa rồi, tôi biết rồi).",
          ja: "動詞直後の「了」は動作完了（食べた＝吃了）。文末の「了」は事態変化（雨が降ってきた＝下雨了）。",
          en: "Verb-suffix 了 marks completion; sentence-final 了 marks change of state ('now' / 'already')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Trợ từ ngữ khí 了 ở cuối câu (Biểu thị sự thay đổi hoặc tình huống mới)",
        concept: "Trợ từ ngữ khí 了 đặt ở cuối câu để thông báo một sự việc mới xảy ra, hoặc một trạng thái đã có sự thay đổi so với trước kia (tương đương chữ 'rồi' trong tiếng Việt).",
        grammar_notes: [
          "Thay đổi trạng thái tự nhiên: 下雨了 (Trời mưa rồi - trước đó không mưa).",
          "Thay đổi tuổi tác, thời gian: 我二十岁了 (Tôi 20 tuổi rồi).",
          "Nhận thức mới: 我知道了 (Tôi biết rồi).",
          "Phủ định thay đổi (không còn... nữa): 不...了 (我不饿了 - Tôi không đói nữa rồi)."
        ],
        pedagogical_tips: "Nhấn mạnh với học viên: 了 ở cuối câu không chỉ là 'quá khứ', mà mấu chốt là 'sự thay đổi trạng thái'."
      },
      ja: {
        title: "語気助詞「了」（事態の変化・新事態の出現）",
        concept: "文末に置く「了」は、以前と異なる新しい状況が生じたこと（変化）や、新事態の発生を表します。",
        grammar_notes: [
          "天候の変化：「下雨了」（雨が降ってきた）。",
          "年齢・時間の経過：「春天了」（春になった）、「我十八岁了」（18歳になった）。",
          "意志・状態の変化：「我不去了」（気が変わってもう行かない）。"
        ],
        pedagogical_tips: "「過去形」と勘違いさせず、「変化のマーク」であることを強調します。"
      },
      en: {
        title: "Sentence-Final 了 (Change of State)",
        concept: "Placed at the very end of a sentence to signal a new situation or a change from a previous state.",
        grammar_notes: [
          "State change: 下雨了 (It has started raining).",
          "Age or time milestone: 我十八岁了 (I am 18 now).",
          "Ceasing an action: 不...了 (我不买了 - I am not buying it anymore).",
          "Crucial: Sentence-final 了 indicates change, NOT purely past tense."
        ],
        pedagogical_tips: "Teach students that sentence-final 了 marks 'change of state', not just past tense."
      }
    },
    fill_template: {
      template_zh: "天冷了，大家多穿点衣服{particle}。",
      template_vi: "Trời lạnh rồi, mọi người mặc thêm áo {particle}.",
      slots: [
        { name: "particle", type: "particle", options: ["吧", "呢", "了", "吗"] }
      ]
    },
    collocations: [
      { pattern: "下雨了", pinyin: "xiàyǔ le", meaning_vi: "Trời mưa rồi", meaning_en: "It's raining now" },
      { pattern: "我知道了", pinyin: "wǒ zhīdào le", meaning_vi: "Tôi biết rồi", meaning_en: "I know now / Got it" }
    ],
    examples: [
      {
        zh: "秋天到了，天气凉快了。",
        pinyin: "Qiūtiān dào le, tiānqì liángkuai le.",
        translations: { vi: "Mùa thu đến rồi, thời tiết mát mẻ rồi.", ja: "秋が来て、涼しくなりました。", en: "Autumn has arrived; the weather has turned cool." },
        literal_en: "Autumn arrive particle, weather cool particle.",
        scenario: { vi: "Cảm nhận thời tiết giao mùa", ja: "季節の変わり目の雑談", en: "Seasonal change" },
        tone_tip: { vi: "Chữ 了 đọc thanh nhẹ (le).", ja: "「了」は軽声で軽く添えます。", en: "Pronounce 了 in neutral tone." },
        word_order_diff: { vi: "Cả hai vế đều có 了 cuối câu để biểu thị trạng thái mới.", ja: "前文・後文ともに文末に「了」を置いて変化を表しています。", en: "Both clauses use final 了 to indicate transition." },
        note: { vi: "Minh họa hoàn hảo cho ý nghĩa 'biến đổi trạng thái'.", ja: "状態変化の典型的な例文です。", en: "Textbook example of change of state." },
        tokens: [
          { hanzi: "秋天", pinyin: "qiūtiān", han_viet: "thu thiên", ja_kanji: "秋", literal_en: "autumn", block_role: "subject" },
          { hanzi: "到", pinyin: "dào", han_viet: "đáo", ja_kanji: "到着する", literal_en: "arrive", block_role: "verb" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "now", block_role: "particle" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "天气", pinyin: "tiānqì", han_viet: "thiên khí", ja_kanji: "天気", literal_en: "weather", block_role: "subject" },
          { hanzi: "凉快", pinyin: "liángkuai", han_viet: "lương khoái", ja_kanji: "涼しい", literal_en: "cool", block_role: "adjective" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "now", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_le_modal_1",
        prompt: { vi: "Sắp xếp: 'Bây giờ tám giờ rồi.'", ja: "並べ替え：「もう8時になりました。」", en: "Unscramble: 'It is 8 o'clock now.'" },
        correct_order: ["现在", "八点", "了", "。"],
        tokens: ["了", "八点", "现在", "。"],
        explanation: { vi: "Thời gian (八点) + 了 biểu thị mốc thời gian đã đến.", ja: "時間名詞＋了で時刻の到来を表します。", en: "Time + 了 indicates milestone reached." }
      }
    ],
    fill_blank: [
      {
        id: "fb_le_modal_1",
        sentence_zh: "我已经吃饱{blank}，谢谢。",
        answer: "了",
        options: ["了", "呢", "吗", "吧"],
        explanation: { vi: "Tôi no rồi (吃饱了) dùng trợ từ ngữ khí 了.", ja: "「お腹がいっぱいになった」変化を表す文末の「了」です。", en: "Change of state: full now." }
      }
    ],
    error_correction: [
      {
        id: "ec_le_modal_1",
        wrong_sentence: "下雨，我们别出去了。",
        correct_sentence: "下雨了，我们别出去了。",
        error_point: { vi: "Thiếu trợ từ 了 cuối vế để thông báo sự việc trời bắt đầu mưa.", ja: "雨が降り始めた事態変化を表す「了」が欠落している誤文。", en: "Missing 了 to indicate that rain has started." },
        explanation: { vi: "Cần thêm 了: 下雨了 (Mưa rồi).", ja: "「下雨了」と補います。", en: "Add 了: 下雨了 (It has started raining)." }
      }
    ],
    quiz: [
      {
        id: "qz_le_modal_1",
        question: { vi: "Câu '我不喝咖啡了' mang hàm ý gì?", ja: "「我不喝咖啡了」はどういうニュアンスですか？", en: "What does '我不喝咖啡了' imply?" },
        options: [
          { text: { vi: "Trước đây tôi có uống, nhưng bây giờ tôi không uống nữa (thay đổi thói quen/hành vi)", ja: "以前は飲んでいたが、今はもう飲まない（習慣・状況の変化）", en: "Used to drink coffee, but stopped drinking it now" }, correct: true },
          { text: { vi: "Tôi chưa từng uống cà phê bao giờ", ja: "今まで一度も飲んだことがない", en: "Never drank coffee before" }, correct: false }
        ],
        explanation: { vi: "Cấu trúc 不...了 mang ý nghĩa 'không... nữa rồi' (chấm dứt hành động).", ja: "「不……了」は事態の変化（もう〜しない）を表します。", en: "'不...了' signifies 'not anymore'." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Câu + 了: Báo hiệu tình huống mới hoặc biến đổi trạng thái ('rồi', 'không... nữa').",
        ja: "文末＋了：状況の変化・新事態の発生（「〜になった」「もう〜だ」）。",
        en: "Sentence + 了: Signals a new situation or change of state ('now' / 'anymore')."
      },
      remember: [
        { vi: "Không đồng nhất 了 cuối câu với quá khứ; bản chất của nó là 'sự thay đổi'.", ja: "過去形ではなく「状況の変化」を示す目印。", en: "It marks transition and change, not just past tense." }
      ]
    }
  },

  // 11. hsk1_tai_le_exclamation
  {
    id: "hsk1_tai_le_exclamation",
    level: "HSK1",
    level_num: 1,
    category: "sentence_pattern",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["太...了", "tài...le", "cảm thán", "quá... rồi", "too", "so"],
    formula: "太 + Tính từ / Động từ tâm lý + 了！",
    formula_plain: {
      vi: "太 + Tính từ + 了！ (Quá... rồi! - biểu thị cảm thán khen ngợi hoặc phàn nàn)",
      ja: "太 ＋ 形容詞／心理動詞 ＋ 了！（あまりに〜だ！／〜すぎる！）",
      en: "太 + Adjective / Emotion Verb + 了! (Too... / So...!)"
    },
    structure_blocks: [
      { label: { vi: "Phó từ 太", ja: "副詞 太", en: "Adverb 太" }, role: "adverb", color: "#EC4899" },
      { label: { vi: "Tính từ", ja: "形容詞", en: "Adjective" }, role: "adjective", color: "#10B981" },
      { label: { vi: "Trợ từ ngữ khí 了", ja: "語気助詞 了", en: "Particle 了" }, role: "particle", color: "#8B5CF6" }
    ],
    related_ids: ["hsk1_hen_adjective_predicate", "hsk1_le_modal_change"],
    confusable_with: [
      {
        id: "hsk1_hen_adjective_predicate",
        diff: {
          vi: "很 + Adj là câu miêu tả khách quan (我很忙 - Tôi khá bận). 太 + Adj + 了 mang sắc thái cảm thán chủ quan mạnh mẽ (太好了 - Tuyệt vời quá!).",
          ja: "「很＋形容詞」は客観的描写。「太＋形容詞＋了」は話者の強い感情（賞賛・不満）を表す感嘆表現。",
          en: "很 is objective; 太...了 carries strong subjective emotion (praise or complaint)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc cảm thán 太 + Tính từ + 了！",
        concept: "Dùng để biểu thị mức độ cao mang tính cảm thán: hoặc là khen ngợi hết lời (太好了 - Tuyệt vời quá!), hoặc là phàn nàn mức độ vượt quá giới hạn (太贵了 - Đắt quá!).",
        grammar_notes: [
          "Khen ngợi tích cực: 太好了 (Tốt quá), 太漂亮了 (Đẹp quá).",
          "Phàn nàn tiêu cực: 太贵了 (Đắt quá), 太累了 (Mệt quá).",
          "Phủ định: 不太 + Adj (không dùng 了 ở cuối) mang nghĩa 'không... lắm' (不太好 - không tốt lắm)."
        ],
        pedagogical_tips: "Lưu ý học sinh: Khi dùng dạng phủ định 不太 thì KHÔNG có chữ 了 ở cuối câu."
      },
      ja: {
        title: "感嘆構文「太＋形容詞＋了！」",
        concept: "話者の強い主観的感情（賞賛または不満・困惑）を込めて、「〜すぎる！」「とても〜だ！」と感嘆する定型構文です。",
        grammar_notes: [
          "肯定的・賞賛：「太好了！」（素晴らしい！）、「太漂亮了！」（綺麗すぎる！）。",
          "否定的・過度：「太贵了！」（高すぎる！）、「太远了！」（遠すぎる！）。",
          "部分否定（あまり〜でない）：「不太＋形容詞」（※文末の「了」は外す。例：不太好）。"
        ],
        pedagogical_tips: "「不太……」の部分否定では文末の「了」が消えるルールをしっかり指導します。"
      },
      en: {
        title: "Exclamatory Pattern: 太 + Adj + 了!",
        concept: "Expresses high degree with strong subjective emotion—either enthusiastic praise or excessive dissatisfaction.",
        grammar_notes: [
          "Praise: 太好了! (Great!), 太棒了! (Awesome!).",
          "Excessive / Complaint: 太贵了! (Too expensive!), 太难了! (Too difficult!).",
          "Moderate negation: 不太 + Adj (drop 了), meaning 'not very...' (e.g. 不太冷)."
        ],
        pedagogical_tips: "Emphasize that the negative form 不太 drops the final 了."
      }
    },
    fill_template: {
      template_zh: "这件衣服太漂亮{particle}！",
      template_vi: "Chiếc áo này đẹp quá {particle}!",
      slots: [
        { name: "particle", type: "particle", options: ["了", "呢", "吧", "啊"] }
      ]
    },
    collocations: [
      { pattern: "太好了！", pinyin: "tài hǎo le!", meaning_vi: "Tốt quá rồi! / Tuyệt vời!", meaning_en: "Great! / Wonderful!" },
      { pattern: "太贵了", pinyin: "tài guì le", meaning_vi: "Đắt quá rồi", meaning_en: "Too expensive" }
    ],
    examples: [
      {
        zh: "这个西瓜太甜了！",
        pinyin: "Zhè ge xīguā tài tián le!",
        translations: { vi: "Quả dưa hấu này ngọt quá!", ja: "このスイカ、甘くてすごく美味しい！", en: "This watermelon is so sweet!" },
        literal_en: "This watermelon too sweet particle!",
        scenario: { vi: "Khen ngợi hoa quả ngon", ja: "果物の味を褒める", en: "Praising fruit flavor" },
        tone_tip: { vi: "太 mang thanh 4 (tài).", ja: "「太」は第4声です。", en: "Pronounced tài." },
        word_order_diff: { vi: "Cấu trúc tương đương tiếng Việt: Quá (太) + Tính từ (甜) + rồi (了).", ja: "「太……了」で形容詞を挟み込みます。", en: "Frames the adjective between 太 and 了." },
        note: { vi: "Mang sắc thái cảm thán hài lòng.", ja: "非常に満足した感情がこもっています。", en: "Expresses delight." },
        tokens: [
          { hanzi: "这个", pinyin: "zhè ge", han_viet: "giá cá", ja_kanji: "この", literal_en: "this", block_role: "subject" },
          { hanzi: "西瓜", pinyin: "xīguā", han_viet: "tây qua", ja_kanji: "スイカ", literal_en: "watermelon", block_role: "subject" },
          { hanzi: "太", pinyin: "tài", han_viet: "thái", ja_kanji: "あまりに", literal_en: "too/so", block_role: "adverb" },
          { hanzi: "甜", pinyin: "tián", han_viet: "điềm", ja_kanji: "甘い", literal_en: "sweet", block_role: "adjective" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "particle", block_role: "particle" },
          { hanzi: "！", pinyin: "!", han_viet: "", ja_kanji: "！", literal_en: "!", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_tai_1",
        prompt: { vi: "Sắp xếp: 'Quyển sách này khó quá!'", ja: "並べ替え：「この本は難しすぎます！」", en: "Unscramble: 'This book is too difficult!'" },
        correct_order: ["这", "本", "书", "太", "难", "了", "！"],
        tokens: ["太", "书", "本", "难", "这", "了", "！"],
        explanation: { vi: "这 + 本 + 书 + 太 + 难 + 了！", ja: "指示詞＋量詞＋名詞＋太＋形容詞＋了！の順です。", en: "Demonstrative + Measure word + Noun + 太 + Adj + 了!" }
      }
    ],
    fill_blank: [
      {
        id: "fb_tai_1",
        sentence_zh: "你能来参加我的生日会，{blank}好了！",
        answer: "太",
        options: ["太", "很", "非常", "真"],
        explanation: { vi: "Cấu trúc cảm thán đi kèm 了 là 太好了.", ja: "文末の「了」と呼応して感嘆を作るのは「太」です。", en: "Pairs with final 了 in 太好了." }
      }
    ],
    error_correction: [
      {
        id: "ec_tai_1",
        wrong_sentence: "今天天气不太冷了。",
        correct_sentence: "今天天气不太冷。",
        error_point: { vi: "Dùng 了 trong cấu trúc phủ định 不太.", ja: "部分否定「不太」の文末に「了」をつけてしまった誤文。", en: "Adding 了 to the negative form 不太." },
        explanation: { vi: "Khi phủ định 不太 (không... lắm), bỏ hoàn toàn 了 ở cuối câu.", ja: "「不太＋形容詞」では文末の「了」は不要です。", en: "Drop 了 when using 不太." }
      }
    ],
    quiz: [
      {
        id: "qz_tai_1",
        question: { vi: "Trong tiếng Trung, câu '不太贵' có nghĩa là gì?", ja: "「不太贵」の意味として正しいものは？", en: "What does '不太贵' mean?" },
        options: [
          { text: { vi: "Không đắt lắm (mức độ vừa phải)", ja: "あまり高くない", en: "Not very expensive" }, correct: true },
          { text: { vi: "Đắt cực kỳ", ja: "非常に高い", en: "Extremely expensive" }, correct: false }
        ],
        explanation: { vi: "不太 + Adj diễn tả mức độ nhẹ nhàng 'không... lắm'.", ja: "「あまり〜でない」という穏やかな部分否定を表します。", en: "Means 'not particularly / not very'." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "太 + Tính từ + 了: Cảm thán khen ngợi hoặc chê bai quá mức; phủ định dùng 不太 + Adj (bỏ 了).",
        ja: "太＋形容詞＋了：強い感情を表す感嘆（〜すぎる！とても〜だ！）。否定は「不太＋形容詞」（了なし）。",
        en: "太 + Adj + 了: Exclamation of praise or excess; negate with 不太 + Adj (without 了)."
      },
      remember: [
        { vi: "Khi nói 'không... lắm' (不太...), nhớ bỏ chữ 了 ở cuối.", ja: "「不太……」の形では文末の「了」を落とす。", en: "Drop 了 in the negative structure 不太 + Adjective." }
      ]
    }
  },

  // 12. hsk2_de_degree_complement
  {
    id: "hsk2_de_degree_complement",
    level: "HSK2",
    level_num: 2,
    category: "complement",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["得", "de", "bổ ngữ trạng thái", "bổ ngữ mức độ", "degree complement", "state complement"],
    formula: "S + V + 得 + (很 / 非常) + Tính từ",
    formula_plain: {
      vi: "Động từ + 得 + Tính từ (Đánh giá hành động làm như thế nào)",
      ja: "動詞 ＋ 得 ＋ 形容詞句（動作の結果や状態を評価・描写する）",
      en: "Verb + 得 + Adjective phrase (Describes how an action is performed)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ kết cấu 得", ja: "構造助詞 得", en: "Structural Particle 得" }, role: "particle", color: "#EC4899" },
      { label: { vi: "Bổ ngữ tính từ", ja: "様態・程度補語", en: "Degree Complement" }, role: "complement", color: "#8B5CF6" }
    ],
    related_ids: ["hsk1_de_possessive_attributive"],
    confusable_with: [
      {
        id: "hsk1_de_possessive_attributive",
        diff: {
          vi: "Phân biệt 3 chữ de: 的 (đứng trước Danh từ: 我的书), 得 (đứng sau Động từ nối bổ ngữ: 跑得快), 地 (đứng trước Động từ làm trạng ngữ: 慢慢地走).",
          ja: "的（名詞の前：我的书）、得（動詞の後ろ：跑得快）、地（動詞の前：慢慢地走）の3つの「de」の使い分け。",
          en: "的 modifies nouns (我的书); 得 introduces verb complements (跑得快); 地 marks adverbs before verbs (认真地学)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Bổ ngữ trạng thái / Bổ ngữ mức độ với 得 (de)",
        concept: "Dùng để đánh giá, nhận xét hoặc miêu tả phương thức, trình độ, kết quả của một hành động đã hoặc thường xuyên xảy ra.",
        grammar_notes: [
          "Nếu động từ mang tân ngữ, phải lặp lại động từ: S + V + Tân ngữ + V + 得 + Adj (Ví dụ: 他说汉语说得很好 - Anh ấy nói tiếng Trung nói rất tốt).",
          "Phủ định đặt 不 trước tính từ bổ ngữ: 跑得不快 (chạy không nhanh).",
          "Dạng câu hỏi: V + 得 + Adj + 吗？ hoặc V + 得 + Adj + 不 + Adj？"
        ],
        pedagogical_tips: "Quy tắc lặp lại động từ khi có tân ngữ là trọng tâm ngữ pháp đề thi HSK 2 và HSK 3."
      },
      ja: {
        title: "様態補語／程度補語「動詞＋得＋形容詞」",
        concept: "動作がどのようになされるか、その状態や到達レベルを評価・描写する補語です。",
        grammar_notes: [
          "目的語を伴う場合は動詞を繰り返す：S＋動詞＋目的語＋動詞＋得……（例：他写汉字写得很好）。",
          "否定は補語の前に「不」を置く（例：起得不早）。",
          "3つの「de（的・地・得）」の機能区別に注意。"
        ],
        pedagogical_tips: "「動詞＋目的語＋動詞＋得」の反復構文を徹底的に定着させます。"
      },
      en: {
        title: "Degree / State Complement with 得 (de)",
        concept: "Used after a verb to evaluate or describe how well or in what manner an action is carried out.",
        grammar_notes: [
          "When the verb takes an object, the verb must be repeated: S + V + O + V + 得 + Adj (e.g. 他说英语说得很好).",
          "Negate by placing 不 before the adjective complement: 跑得不快.",
          "Distinct from 的 (noun attributive) and 地 (adverbial marker)."
        ],
        pedagogical_tips: "Drill the verb-repetition pattern when objects are involved."
      }
    },
    fill_template: {
      template_zh: "她跳舞跳{de}非常好看。",
      template_vi: "Cô ấy khiêu vũ khiêu vũ {de} rất đẹp.",
      slots: [
        { name: "de", type: "particle", options: ["得", "的", "地"] }
      ]
    },
    collocations: [
      { pattern: "跑得快", pinyin: "pǎo de kuài", meaning_vi: "Chạy nhanh", meaning_en: "Run fast" },
      { pattern: "写得好", pinyin: "xiě de hǎo", meaning_vi: "Viết đẹp / Viết hay", meaning_en: "Write well" }
    ],
    examples: [
      {
        zh: "他汉字写得非常漂亮。",
        pinyin: "Tā hànzì xiě de fēicháng piàoliang.",
        translations: { vi: "Chữ Hán anh ấy viết rất đẹp.", ja: "彼は漢字を書くのがとても上手です。", en: "He writes Chinese characters very beautifully." },
        literal_en: "He Chinese character write de extremely beautiful.",
        scenario: { vi: "Khen ngợi chữ viết", ja: "文字の美しさを褒める", en: "Complimenting handwriting" },
        tone_tip: { vi: "Trợ từ 得 đọc thanh nhẹ (de).", ja: "「得」は軽声で「de」と発音します。", en: "Pronounced de in neutral tone." },
        word_order_diff: { vi: "Có thể đưa tân ngữ (汉字) lên trước động từ để tránh lặp: 他汉字写得...", ja: "目的語を主語の直後に置く前置パターンです。", en: "Topic-fronted object avoids repeating the verb." },
        note: { vi: "Một trong những bổ ngữ quan trọng nhất của tiếng Trung.", ja: "中国語文法で最重要の補語の一つです。", en: "One of the most important Chinese complements." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "汉字", pinyin: "hànzì", han_viet: "Hán tự", ja_kanji: "漢字", literal_en: "Chinese characters", block_role: "object" },
          { hanzi: "写", pinyin: "xiě", han_viet: "tả", ja_kanji: "書く", literal_en: "write", block_role: "verb" },
          { hanzi: "得", pinyin: "de", han_viet: "đắc", ja_kanji: "得", literal_en: "particle", block_role: "particle" },
          { hanzi: "非常", pinyin: "fēicháng", han_viet: "phi thường", ja_kanji: "非常に", literal_en: "extremely", block_role: "adverb" },
          { hanzi: "漂亮", pinyin: "piàoliang", han_viet: "phiêu lượng", ja_kanji: "綺麗", literal_en: "beautiful", block_role: "adjective" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_deg_1",
        prompt: { vi: "Sắp xếp: 'Anh ấy bơi rất nhanh.'", ja: "並べ替え：「彼は泳ぐのがとても速いです。」", en: "Unscramble: 'He swims very fast.'" },
        correct_order: ["他", "游泳", "游", "得", "很", "快", "。"],
        tokens: ["很", "游", "他", "快", "得", "游泳", "。"],
        explanation: { vi: "S (他) + V+O (游泳) + Lặp lại V (游) + 得 + Bổ ngữ (很快).", ja: "主語＋游泳＋游＋得＋很快の動詞反復ルールです。", en: "Subject + 游泳 + repeat 游 + 得 + 很快." }
      }
    ],
    fill_blank: [
      {
        id: "fb_deg_1",
        sentence_zh: "你今天起{blank}真早！",
        answer: "得",
        options: ["得", "的", "地", "了"],
        explanation: { vi: "Đứng sau động từ 起 nối với bổ ngữ 早 dùng trợ từ 得.", ja: "動詞「起」の後ろで様態を表すので「得」が正解です。", en: "Follows verb 起 to link the complement 早." }
      }
    ],
    error_correction: [
      {
        id: "ec_deg_1",
        wrong_sentence: "他说汉语得很流利。",
        correct_sentence: "他说汉语说得很流利。",
        error_point: { vi: "Quên lặp lại động từ 说 khi câu có tân ngữ 汉语.", ja: "目的語「汉语」があるのに動詞「说」の反復が抜けている誤文。", en: "Forgetting to repeat the verb 说 when object 汉语 is present." },
        explanation: { vi: "Phải lặp lại động từ: 他说汉语说得很流利 (hoặc 他汉语说得很流利).", ja: "「他说汉语说得……」と動詞を繰り返す必要があります。", en: "Must repeat the verb: 他说汉语说得..." }
      }
    ],
    quiz: [
      {
        id: "qz_deg_1",
        question: { vi: "Để phủ định câu '他跑得快', cách nói nào đúng?", ja: "「他跑得快」を否定する正しい表現は？", en: "How do you negate '他跑得快'?" },
        options: [
          { text: { vi: "他跑得不快。(Phủ định đặt trước tính từ bổ ngữ)", ja: "他跑得不快。（補語の前に不を置く）", en: "他跑得不快 (Negate the complement directly)" }, correct: true },
          { text: { vi: "他不跑得快。", ja: "他不跑得快。", en: "他不跑得快。" }, correct: false }
        ],
        explanation: { vi: "Phủ định bổ ngữ trạng thái phải đặt 不 ngay trước tính từ bổ ngữ.", ja: "様態補語の否定は補語の形容詞の直前に「不」を置きます。", en: "Place 不 right before the complement adjective." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V + 得 + Adj: Đánh giá hành động; có tân ngữ phải lặp lại động từ (V + O + V + 得 + Adj).",
        ja: "動詞＋得＋形容詞：動作のレベルや状態を描写。目的語があれば動詞を繰り返す。",
        en: "Verb + 得 + Adj: Evaluates an action; repeat the verb if an object is present."
      },
      remember: [
        { vi: "Phủ định đặt trước tính từ: V + 得 + 不 + Adj (không đặt 不 trước động từ).", ja: "否定は「動詞＋得＋不＋形容詞」。動詞の前に不は置かない。", en: "Negate the complement: Verb + 得 + 不 + Adj." }
      ]
    }
  },

  // 13. hsk2_resultative_complement_basic
  {
    id: "hsk2_resultative_complement_basic",
    level: "HSK2",
    level_num: 2,
    category: "complement",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["结果补语", "完", "好", "见", "懂", "错", "resultative complement", "bổ ngữ kết quả"],
    formula: "S + V + Bổ ngữ kết quả (完 / 好 / 见 / 到 / 懂 / 对 / 错) (+ 了)",
    formula_plain: {
      vi: "Động từ + Bổ ngữ kết quả (完/好/见/懂/错) (Làm xong / Làm được / Nhìn thấy / Hiểu / Sai)",
      ja: "動詞 ＋ 結果補語（完・好・见・到・懂・错）（〜し終わる、〜が見える、〜が分かる）",
      en: "Verb + Resultative Complement (完 / 好 / 见 / 到 / 懂 / 错) (finish / see / understand / error)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ chính", ja: "本動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Bổ ngữ kết quả", ja: "結果補語", en: "Result Complement" }, role: "complement", color: "#F59E0B" },
      { label: { vi: "Tân ngữ", ja: "目的語", en: "Object" }, role: "object", color: "#6366F1" }
    ],
    related_ids: ["hsk1_mei_meiyou_negation", "hsk2_le_completion_aspect"],
    confusable_with: [
      {
        id: "hsk1_mei_meiyou_negation",
        diff: {
          vi: "Phủ định của bổ ngữ kết quả BẮT BUỘC dùng 没/没有 (我没看完 - Tôi chưa đọc xong), TUYỆT ĐỐI không dùng 不 (sai: 我不看完).",
          ja: "結果補語の否定は必ず「没（没有）」を動詞の前に置きます（❌ 我不看完 ➔ ⭕ 我没看完）。",
          en: "Resultative complements must be negated with 没/没有; never with 不."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Bổ ngữ kết quả cơ bản (V + 完/好/见/到/懂/错)",
        concept: "Động từ hoặc tính từ gắn liền ngay phía sau động từ chính để biểu thị kết quả trực tiếp phát sinh từ hành động đó.",
        grammar_notes: [
          "完 (xong, hết): 做完 (làm xong), 吃完 (ăn hết).",
          "好 (xong và hoàn hảo/sẵn sàng): 准备好 (chuẩn bị xong xuôi), 做好 (làm chu đáo).",
          "见 (tiếp nhận được qua giác quan): 看见 (nhìn thấy), 听见 (nghe thấy).",
          "懂 (hiểu): 听懂 (nghe hiểu), 看懂 (đọc hiểu).",
          "错 (sai): 买错 (mua nhầm), 说错 (nói sai).",
          "Phủ định: S + 没(有) + V + Bổ ngữ kết quả (bỏ 了)."
        ],
        pedagogical_tips: "Nhấn mạnh giữa động từ và bổ ngữ kết quả dính liền nhau, không được chèn bất kỳ từ nào vào giữa."
      },
      ja: {
        title: "基本結果補語（完・好・见・到・懂・错など）",
        concept: "動詞の直後に別の動詞や形容詞を直接連結させ、動作によって生じた結果を表します。",
        grammar_notes: [
          "完（完了・消費）：看完（読み終える）、用完（使い切る）。",
          "好（完成・満足）：做好（しっかり仕上がる）、准备好（準備万端）。",
          "见（知覚・感知）：看见（目に入る）、听见（聞こえる）。",
          "懂（理解）：听懂（聞いて理解する）、看懂（読んで分かる）。",
          "错（誤り）：写错（書き間違える）。",
          "否定は「没＋動詞＋結果補語」（了はつけない）。"
        ],
        pedagogical_tips: "本動詞と結果補語の間には何も挟めない密着関係であることを指導します。"
      },
      en: {
        title: "Basic Resultative Complements (完, 好, 见, 到, 懂, 错)",
        concept: "Attaching an adjective or secondary verb directly to the main verb to specify the outcome of an action.",
        grammar_notes: [
          "完 (finish/exhaust): 做完 (finish doing), 卖完 (sold out).",
          "好 (complete satisfactorily): 准备好 (ready), 做好 (done properly).",
          "见 (perceive): 看见 (see), 听见 (hear).",
          "懂 (comprehend): 听懂 (understand what is heard).",
          "错 (mistakenly): 说错 (misspoke).",
          "Negation uses 没/没有 before the verb (and drop 了)."
        ],
        pedagogical_tips: "No words can be inserted between the verb and its resultative complement."
      }
    },
    fill_template: {
      template_zh: "今天的作业我已经做{complement}了。",
      template_vi: "Bài tập hôm nay tôi đã làm {complement} rồi.",
      slots: [
        { name: "complement", type: "complement", options: ["完", "好", "对", "错"] }
      ]
    },
    collocations: [
      { pattern: "做完了", pinyin: "zuò wán le", meaning_vi: "Làm xong rồi", meaning_en: "Finished doing" },
      { pattern: "听懂了", pinyin: "tīng dǒng le", meaning_vi: "Nghe hiểu rồi", meaning_en: "Understood by hearing" }
    ],
    examples: [
      {
        zh: "我听懂了老师的话。",
        pinyin: "Wǒ tīng dǒng le lǎoshī de huà.",
        translations: { vi: "Tôi đã nghe hiểu lời thầy giáo nói.", ja: "私は先生の話を聞いて理解できました。", en: "I understood what the teacher said." },
        literal_en: "I listen understand particle teacher's words.",
        scenario: { vi: "Báo cáo tiếp thu bài giảng", ja: "授業の理解度報告", en: "Class comprehension" },
        tone_tip: { vi: "懂 mang thanh 3 (dǒng).", ja: "「懂」は第3声です。", en: "Pronounced dǒng." },
        word_order_diff: { vi: "Nghe (听) + Hiểu (懂) dính liền nhau thành một cụm vị ngữ chặt chẽ.", ja: "動詞＋補語が密着して1つの述語を形成します。", en: "Verb and result complement form a tight compound." },
        note: { vi: "Bổ ngữ kết quả cực kỳ thông dụng trong giao tiếp hàng ngày.", ja: "日常会話で不可欠の表現です。", en: "Crucial pattern in spoken Chinese." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", literal_en: "I", block_role: "subject" },
          { hanzi: "听", pinyin: "tīng", han_viet: "thính", ja_kanji: "聞く", literal_en: "listen", block_role: "verb" },
          { hanzi: "懂", pinyin: "dǒng", han_viet: "đổng", ja_kanji: "理解する", literal_en: "understand", block_role: "complement" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "particle", block_role: "particle" },
          { hanzi: "老师", pinyin: "lǎoshī", han_viet: "lão sư", ja_kanji: "先生", literal_en: "teacher", block_role: "attributive" },
          { hanzi: "的", pinyin: "de", han_viet: "đích", ja_kanji: "の", literal_en: "'s", block_role: "particle" },
          { hanzi: "话", pinyin: "huà", han_viet: "thoại", ja_kanji: "言葉", literal_en: "words", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_res_1",
        prompt: { vi: "Sắp xếp: 'Tôi đã nhìn thấy anh ấy.'", ja: "並べ替え：「私は彼を見かけました。」", en: "Unscramble: 'I saw him.'" },
        correct_order: ["我", "看", "见", "他", "了", "。"],
        tokens: ["他", "见", "了", "我", "看", "。"],
        explanation: { vi: "S (我) + V (看) + Bổ ngữ (见) + Tân ngữ (他) + 了.", ja: "主語＋动词＋结果补语＋宾语＋了の順です。", en: "Subject + Verb + Result complement + Object + 了." }
      }
    ],
    fill_blank: [
      {
        id: "fb_res_1",
        sentence_zh: "对不起，这个字我写{blank}了。",
        answer: "错",
        options: ["错", "完", "好", "懂"],
        explanation: { vi: "Xin lỗi vì viết sai chữ (写错了).", ja: "字を書き間違えた（写错）ので謝っています。", en: "Writing the wrong character takes 错." }
      }
    ],
    error_correction: [
      {
        id: "ec_res_1",
        wrong_sentence: "这本小说我没看完它了。",
        correct_sentence: "这本小说我没看完。",
        error_point: { vi: "Thừa trợ từ 了 trong câu phủ định của bổ ngữ kết quả (没看完).", ja: "「没」で否定された結果補語文に「了」をつけてしまった誤り。", en: "Keeping 了 in a 没-negated resultative complement sentence." },
        explanation: { vi: "Khi đã có 没 phủ định bổ ngữ kết quả, bỏ hoàn toàn 了.", ja: "「没＋動詞＋結果補語」の形では「了」を削除します。", en: "Drop 了 when 没 is used." }
      }
    ],
    quiz: [
      {
        id: "qz_res_1",
        question: { vi: "Sự khác biệt chính giữa 做完 và 做好 là gì?", ja: "「做完」と「做好」の違いは？", en: "What is the key difference between 做完 and 做好?" },
        options: [
          { text: { vi: "做完 nhấn mạnh hoàn thành về mặt tiến độ; 做好 nhấn mạnh hoàn thành tốt đẹp, sẵn sàng", ja: "做完はプロセスの終了。做好は満足のいく仕上がりや準備完了を表す", en: "做完 stresses termination; 做好 stresses satisfactory readiness" }, correct: true },
          { text: { vi: "Hai từ này hoàn toàn giống nhau 100%", ja: "完全に同義で区別はない", en: "They are completely identical" }, correct: false }
        ],
        explanation: { vi: "好 mang hàm ý kết quả đạt yêu cầu, chu đáo hoặc sẵn sàng sử dụng.", ja: "「好」は仕上がりの良さや準備完了のニュアンスを含みます。", en: "好 implies quality or readiness." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V + (完/好/见/懂/错): Bổ ngữ kết quả dính liền sau động từ; phủ định bằng 没 + V + Bổ ngữ (bỏ 了).",
        ja: "動詞＋(完/好/见/懂/错)：動作の直接的結果。否定は「没＋動詞＋補語」（了なし）。",
        en: "Verb + Result Complement: Specifies immediate outcome; negated with 没 (drop 了)."
      },
      remember: [
        { vi: "Không chèn từ vào giữa động từ và bổ ngữ kết quả (chỉ trừ bổ ngữ khả năng sau này).", ja: "動詞と結果補語の間に余計な語を挟まない。", en: "Do not insert words between the verb and result complement." }
      ]
    }
  }
];

module.exports = batch1;

