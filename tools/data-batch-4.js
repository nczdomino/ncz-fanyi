/**
 * tools/data-batch-4.js
 * 
 * 6 Essential HSK Grammar points (HSK3 33-36, HSK4 37-38)
 * Full pedagogical schema adhering to types/grammar.ts
 */

const batch4 = [
  // 33. hsk3_zhi_yao_jiu_zhi_you_cai
  {
    id: "hsk3_zhi_yao_jiu_zhi_you_cai",
    level: "HSK3",
    level_num: 3,
    category: "conjunction",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["只要...就...", "只有...才...", "zhǐyào...jiù...", "zhǐyǒu...cái...", "câu điều kiện", "conditional", "as long as", "only if"],
    formula: "只要 + Điều kiện đủ，就 + Kết quả  VS  只有 + Điều kiện duy nhất/cần，才 + Kết quả",
    formula_plain: {
      vi: "只要...就... (Chỉ cần... là sẽ...)  VS  只有...才... (Chỉ có... mới có thể...)",
      ja: "只要……就……（〜しさえすれば〜） VS 只有……才……（〜してこそはじめて〜）",
      en: "只要...就... (As long as... then...) VS 只有...才... (Only if... then...)"
    },
    structure_blocks: [
      { label: { vi: "Liên từ điều kiện (只要/只有)", ja: "条件連詞 只要／只有", en: "Condition Marker" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Mệnh đề điều kiện", ja: "条件節", en: "Condition Clause" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Phó từ kết quả (就/才)", ja: "結果副詞 就／才", en: "Result Marker" }, role: "conjunction", color: "#F59E0B" },
      { label: { vi: "Mệnh đề kết quả", ja: "帰結節", en: "Result Clause" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk3_adverb_cai_vs_jiu"],
    confusable_with: [
      {
        id: "hsk3_adverb_cai_vs_jiu",
        diff: {
          vi: "只要...就... là điều kiện đủ (dễ dàng: chỉ cần A là có ngay B). 只有...才... là điều kiện cần/duy nhất (khắt khe: duy nhất A mới dẫn tới B). Tuyệt đối không ghép nhầm: 只要...才... hay 只有...就...",
          ja: "只要……就……は十分条件（〜しさえすればOK）。只有……才……は必要不可欠の唯一条件（〜でなければダメ）。交差混同は厳禁。",
          en: "只要...就... is sufficient condition (easy); 只有...才... is necessary/sole condition (strict). Never cross-mix them."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phân biệt câu điều kiện: 只要……就…… và 只有……才……",
        concept: "Dùng để biểu thị quan hệ điều kiện và kết quả trong tiếng Trung: một bên là điều kiện đầy đủ (只要...就...), một bên là điều kiện duy nhất không thể thiếu (只有...才...).",
        grammar_notes: [
          "只要...就... (Điều kiện đủ): 只要努力，就能成功。 (Chỉ cần nỗ lực là sẽ thành công).",
          "只有...才... (Điều kiện cần/bắt buộc): 只有好好复习，才能考好。 (Chỉ có ôn tập chăm chỉ thì mới thi tốt được).",
          "Quy tắc cặp từ bất di bất dịch: 只要 LUÔN ĐI VỚI 就, 只有 LUÔN ĐI VỚI 才."
        ],
        pedagogical_tips: "Khắc ghi công thức bất di dịch: 只要 đi với 就, 只有 đi với 才."
      },
      ja: {
        title: "条件複文の対比：「只要……就……」VS「只有……才……」",
        concept: "条件と帰結を結ぶ超重要構文。「只要」は十分条件（ハードルが低い）、「只有」は唯一無二の必要条件（ハードルが高い）を表します。",
        grammar_notes: [
          "只要……就……：「只要天气好，我们就去爬山」（天気が良ければ山登りに行く）。",
          "只有……才……：「只有多听多说，才能学好外语」（たくさん聞き話してこそ外国語をマスターできる）。",
          "ペアの固定関係：只要＋就、只有＋才。交差させて使うのは文法違反です。"
        ],
        pedagogical_tips: "「只要＋就」「只有＋才」のペアリングをリズムで暗記させます。"
      },
      en: {
        title: "Conditionals: 只要……就…… vs 只有……才……",
        concept: "Contrasts sufficient condition (只要...就...: 'as long as') with necessary condition (只有...才...: 'only if').",
        grammar_notes: [
          "Sufficient: 只要你来，我就高兴。 (As long as you come, I will be happy).",
          "Necessary / Exclusive: 只有坚持，才能胜利。 (Only if you persevere can you achieve victory).",
          "Fixed pairs: 只要 ALWAYS pairs with 就; 只有 ALWAYS pairs with 才."
        ],
        pedagogical_tips: "Strictly drill: 只要 + 就; 只有 + 才. Never cross-pair."
      }
    },
    fill_template: {
      template_zh: "{cond_word}大家一起努力，这个困难就一定能克服。",
      template_vi: "{cond_word} mọi người cùng nhau nỗ lực, khó khăn này nhất định sẽ khắc phục được.",
      slots: [
        { name: "cond_word", type: "conjunction", options: ["只要", "只有", "因为", "虽然"] }
      ]
    },
    collocations: [
      { pattern: "只要努力就能成功", pinyin: "zhǐyào nǔlì jiù néng chénggōng", meaning_vi: "Chỉ cần nỗ lực là có thể thành công", meaning_en: "As long as you work hard you can succeed" },
      { pattern: "只有...才...", pinyin: "zhǐyǒu... cái...", meaning_vi: "Chỉ có... mới...", meaning_en: "Only if... then..." }
    ],
    examples: [
      {
        zh: "只要明天不下雨，我们就去公园野餐。",
        pinyin: "Zhǐyào míngtiān bú xiàyǔ, wǒmen jiù qù gōngyuán yěcān.",
        translations: { vi: "Chỉ cần ngày mai không mưa, chúng tôi sẽ đi dã ngoại ở công viên.", ja: "明日雨さえ降らなければ、私たちは公園にピクニックに行きます。", en: "As long as it doesn't rain tomorrow, we will go on a picnic in the park." },
        literal_en: "As-long-as tomorrow not rain, we then go park picnic.",
        scenario: { vi: "Lên kế hoạch dã ngoại cuối tuần", ja: "週末のピクニック計画", en: "Picnic planning" },
        tone_tip: { vi: "只要 đọc là zhǐyào (thanh 3 + thanh 4).", ja: "「只要」は第3声＋第4声です。", en: "zhǐ (3rd) + yào (4th)." },
        word_order_diff: { vi: "只要 + Điều kiện (明天不下雨) + Chủ ngữ vế 2 (我们) + 就 + Hành động (去公园野餐).", ja: "只要＋条件，主語＋就＋帰結の語順です。", en: "只要 Condition, Subject + 就 + Result." },
        note: { vi: "Điều kiện đủ, chỉ cần thỏa mãn là thực hiện.", ja: "十分条件の分かりやすい典型例です。", en: "Prototypical sufficient condition." },
        tokens: [
          { hanzi: "只要", pinyin: "zhǐyào", han_viet: "chỉ yếu", ja_kanji: "〜しさえすれば", literal_en: "as long as", block_role: "conjunction" },
          { hanzi: "明天", pinyin: "míngtiān", han_viet: "minh thiên", ja_kanji: "明日", literal_en: "tomorrow", block_role: "time" },
          { hanzi: "不下雨", pinyin: "bú xiàyǔ", han_viet: "bất hạ vũ", ja_kanji: "雨が降らない", literal_en: "not rain", block_role: "verb" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "就", pinyin: "jiù", han_viet: "tựu", ja_kanji: "〜する", literal_en: "then", block_role: "conjunction" },
          { hanzi: "去", pinyin: "qù", han_viet: "khứ", ja_kanji: "行く", literal_en: "go", block_role: "verb" },
          { hanzi: "公园", pinyin: "gōngyuán", han_viet: "công viên", ja_kanji: "公園", literal_en: "park", block_role: "location" },
          { hanzi: "野餐", pinyin: "yěcān", han_viet: "dã xoa", ja_kanji: "ピクニック", literal_en: "picnic", block_role: "verb" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_zy_1",
        prompt: { vi: "Sắp xếp: 'Chỉ có chăm chỉ học tập mới có thể thi đỗ đại học.'", ja: "並べ替え：「真面目に勉強してこそ大学に合格できる。」", en: "Unscramble: 'Only by studying hard can one pass the college entrance exam.'" },
        correct_order: ["只有", "努力", "学习", "，", "才", "能", "考上", "大学", "。"],
        tokens: ["能", "考上", "只有", "才", "学习", "努力", "大学", "，", "。"],
        explanation: { vi: "只有 + Điều kiện duy nhất (努力学习)，才 + Kết quả (能考上大学).", ja: "只有＋条件，才＋可能の必須構文です。", en: "只有 Condition, 才 + Result." }
      }
    ],
    fill_blank: [
      {
        id: "fb_zy_1",
        sentence_zh: "只有经常锻炼身体，身体{blank}会越来越健康。",
        answer: "才",
        options: ["才", "就", "也", "又"],
        explanation: { vi: "Vế trước dùng 只有 thì vế sau bắt buộc đi với 才.", ja: "前節が「只有」なので後節は「才」一択です。", en: "只有 in clause 1 pairs strictly with 才 in clause 2." }
      }
    ],
    error_correction: [
      {
        id: "ec_zy_1",
        wrong_sentence: "只要你认真听讲，才能听懂老师的话。",
        correct_sentence: "只要你认真听讲，就能听懂老师的话。",
        error_point: { vi: "Ghép nhầm 只要 với 才 (chắp vá giữa 2 cấu trúc).", ja: "「只要」と「才」を混同して組み合わせてしまった誤文。", en: "Mismatched pairing of 只要 with 才." },
        explanation: { vi: "只要 phải đi kèm với 就: 只要... 就能...", ja: "「只要」のパートナーは「就」です。", en: "Pair 只要 with 就." }
      }
    ],
    quiz: [
      {
        id: "qz_zy_1",
        question: { vi: "Cặp liên từ nào sau đây là chuẩn mực và chính xác?", ja: "正しい連詞ペアの組み合わせはどれですか？", en: "Which conjunction pairing is correct?" },
        options: [
          { text: { vi: "只要...就... VÀ 只有...才...", ja: "只要……就…… および 只有……才……", en: "只要...就... AND 只有...才..." }, correct: true },
          { text: { vi: "只要...才... VÀ 只有...就...", ja: "只要……才…… および 只有……就……", en: "只要...才... AND 只有...就..." }, correct: false }
        ],
        explanation: { vi: "Quy tắc cặp đôi bất di bất dịch: 只要 đi với 就, 只有 đi với 才.", ja: "この2組の対応関係は中国語文法の黄金律です。", en: "Fixed immutable pairing." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "只要...就... (điều kiện đủ: chỉ cần... là...)  VS  只有...才... (điều kiện cần duy nhất: chỉ có... mới...).",
        ja: "只要……就……（十分条件：〜さえすればOK） VS 只有……才……（必須条件：〜してこそ）。",
        en: "只要...就... (sufficient: as long as) VS 只有...才... (necessary: only if)."
      },
      remember: [
        { vi: "Tuyệt đối không chắp vá chéo: Cấm kỵ dùng '只要...才...' hay '只有...就...'.", ja: "「只要＋才」「只有＋就」のクロス組み合わせは絶対禁止！", en: "Never cross-mix 只要 with 才 or 只有 with 就." }
      ]
    }
  },

  // 34. hsk3_interrogative_dou_ye_universal
  {
    id: "hsk3_interrogative_dou_ye_universal",
    level: "HSK3",
    level_num: 3,
    category: "sentence_pattern",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["谁都", "什么都", "哪儿都", "任指", "universal quantification", "ai cũng", "cái gì cũng", "anyone", "anything"],
    formula: "Đại từ nghi vấn (谁 / 什么 / 哪儿 / 什么时候) + 都 / 也 + V / Adj",
    formula_plain: {
      vi: "Đại từ nghi vấn (Ai / Cái gì / Đâu / Khi nào) + 都 / 也 + Vị ngữ (Biểu thị bao hàm toàn bộ: Ai cũng / Cái gì cũng)",
      ja: "疑問代名詞（谁・什么・哪儿・什么时候）＋ 都／也 ＋ 述語（全称任指：誰もが〜、何でも〜）",
      en: "Question Word (谁 / 什么 / 哪儿 / 什么时候) + 都 / 也 + Predicate (Everyone / Everything / Everywhere)"
    },
    structure_blocks: [
      { label: { vi: "Đại từ nghi vấn", ja: "疑問代名詞（任指）", en: "Question Word" }, role: "question_word", color: "#8B5CF6" },
      { label: { vi: "Phó từ 都 / 也", ja: "全称副詞 都／也", en: "Universal Marker (都/也)" }, role: "adverb", color: "#EC4899" },
      { label: { vi: "Vị ngữ khẳng định hoặc phủ định", ja: "述語（肯定／否定）", en: "Predicate" }, role: "predicate", color: "#10B981" }
    ],
    related_ids: ["hsk1_interrogative_pronouns"],
    confusable_with: [
      {
        id: "hsk1_interrogative_pronouns",
        diff: {
          vi: "Đại từ nghi vấn ở đây KHÔNG DÙNG ĐỂ HỎI mà mang nghĩa phiếm chỉ toàn bộ (nhậm chỉ): 谁都知道 (Ai cũng biết), 我什么都不想吃 (Tôi chẳng muốn ăn cái gì cả).",
          ja: "疑問詞が疑問を表さず、「誰でも・何でも」という全称（100％または完全否定0％）を表す用法です。",
          en: "The question word functions not as an interrogative, but as an arbitrary universal pronoun ('anyone / anything')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Đại từ nghi vấn kết hợp 都 / 也 biểu thị toàn bộ (Ai cũng, cái gì cũng, ở đâu cũng)",
        concept: "Dùng các đại từ nghi vấn (谁, 什么, 哪儿, 怎么, 什么时候) kết hợp với phó từ 都 hoặc 也 để biểu thị ý nghĩa phổ quát 100% (trong câu khẳng định) hoặc phủ định sạch trơn 0% (trong câu phủ định).",
        grammar_notes: [
          "谁都 / 谁也: Ai cũng... (谁都知道这件事 - Ai cũng biết việc này).",
          "什么都 / 什么也 + Phủ định: Không... bất kỳ cái gì (我什么都没买 - Tôi chẳng mua cái gì cả).",
          "哪儿都 / 哪儿也: Đâu cũng... (周末我哪儿都不想去 - Cuối tuần tôi chẳng muốn đi đâu cả).",
          "Trật tự từ: Đại từ nghi vấn phải đứng TRƯỚC 都 / 也."
        ],
        pedagogical_tips: "Chỉ cho học sinh thấy sự phong phú: Đại từ nghi vấn trong tiếng Trung vừa hỏi vừa khẳng định bao quát được."
      },
      ja: {
        title: "疑問代名詞の活用（全称任指「〜も皆」「何一つ〜ない」）",
        concept: "疑問詞の直後に「都」または「也」を添えて、「誰でも・何でも・どこでも」（肯定）、または「誰も〜ない・何も〜ない」（否定）を表します。",
        grammar_notes: [
          "谁都＋肯定：「谁都喜欢他」（誰もが彼を好いている）。",
          "什么也＋否定：「我今天什么也没吃」（私は今日何も口にしていない）。",
          "哪儿都：「中国菜哪儿都很好吃」（中華料理はどこでも美味しい）。",
          "疑問文ではないので文末に疑問符はつきません。"
        ],
        pedagogical_tips: "否定文（什么＋也＋没/不＋V）の完全否定パターンを集中的に練習させます。"
      },
      en: {
        title: "Universal Quantification with Question Words + 都 / 也",
        concept: "Pairs a question word with 都 or 也 to mean 'everyone, everything, everywhere' (in affirmative contexts) or 'no one, nothing, nowhere' (in negative contexts).",
        grammar_notes: [
          "谁都 / 谁也: Anyone / Everyone (谁都知道 - Everyone knows).",
          "什么都 / 什么也 + Negative: Nothing at all (我什么都不想喝 - I don't want to drink anything).",
          "哪儿都: Everywhere (哪儿都挺热闹 - Everywhere is bustling).",
          "Sentence ends with a period, not a question mark."
        ],
        pedagogical_tips: "Highlight that this turns interrogatives into statements of totality."
      }
    },
    fill_template: {
      template_zh: "这个问题太简单了，谁{quantifier}会回答。",
      template_vi: "Câu hỏi này dễ quá, ai {quantifier} biết trả lời.",
      slots: [
        { name: "quantifier", type: "adverb", options: ["都", "也", "在", "了"] }
      ]
    },
    collocations: [
      { pattern: "谁都知道", pinyin: "shéi dōu zhīdào", meaning_vi: "Ai cũng biết", meaning_en: "Everyone knows" },
      { pattern: "什么都没有", pinyin: "shénme dōu méiyǒu", meaning_vi: "Cái gì cũng không có / Không có gì cả", meaning_en: "Has nothing at all" }
    ],
    examples: [
      {
        zh: "我最近太忙了，哪儿都没去。",
        pinyin: "Wǒ zuìjìn tài máng le, nǎr dōu méi qù.",
        translations: { vi: "Gần đây tôi bận quá, chẳng đi đâu cả.", ja: "最近忙しすぎて、どこにも行きませんでした。", en: "I've been so busy lately that I haven't gone anywhere." },
        literal_en: "I recently too busy particle, where all not go.",
        scenario: { vi: "Giải thích lý do ở nhà cả tuần", ja: "近況報告で出かけられなかった理由を述べる", en: "Explaining staying home" },
        tone_tip: { vi: "哪儿 mang âm uốn lưỡi (nǎr).", ja: "「哪儿」はアル化音です。", en: "nǎr is retroflex." },
        word_order_diff: { vi: "Đại từ 哪儿 đứng trước 都 méi qù biểu thị phủ định hoàn toàn vị trí.", ja: "「哪儿＋都＋没＋動詞」で完全否定を表します。", en: "哪儿 + 都 + 没 + Verb." },
        note: { vi: "Biểu đạt ý nghĩa phủ định tuyệt đối 'đâu cũng không đi'.", ja: "完全否定（どこにも〜ない）の定番フレーズです。", en: "Expresses complete negation." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", literal_en: "I", block_role: "subject" },
          { hanzi: "最近", pinyin: "zuìjìn", han_viet: "tối cận", ja_kanji: "最近", literal_en: "recently", block_role: "time" },
          { hanzi: "太忙了", pinyin: "tài máng le", han_viet: "thái mang liễu", ja_kanji: "忙しすぎる", literal_en: "too busy", block_role: "modifier" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "哪儿", pinyin: "nǎr", han_viet: "ná nhi", ja_kanji: "どこ", literal_en: "anywhere", block_role: "question_word" },
          { hanzi: "都", pinyin: "dōu", han_viet: "đô", ja_kanji: "すべて", literal_en: "all", block_role: "adverb" },
          { hanzi: "没去", pinyin: "méi qù", han_viet: "một khứ", ja_kanji: "行かなかった", literal_en: "didn't go", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_univ_1",
        prompt: { vi: "Sắp xếp: 'Bây giờ tôi chẳng muốn nói gì cả.'", ja: "並べ替え：「今私は何も言いたくありません。」", en: "Unscramble: 'Now I don't want to say anything at all.'" },
        correct_order: ["我", "现在", "什么", "话", "也", "不", "想说", "。"],
        tokens: ["想说", "什么", "我", "也", "话", "不", "现在", "。"],
        explanation: { vi: "什么话 (bất kỳ lời nào) + 也 + 不 + 想说.", ja: "什么话＋也＋不＋想说の完全否定の語順です。", en: "什么话 + 也 + 不 + 想说." }
      }
    ],
    fill_blank: [
      {
        id: "fb_univ_1",
        sentence_zh: "这件事是秘密，你对{blank}都不要说。",
        answer: "谁",
        options: ["谁", "什么", "哪儿", "怎么"],
        explanation: { vi: "Đối với bất kỳ ai cũng không được nói dùng 谁: 对谁都不要说.", ja: "人に対する秘密の口止めなので「谁」が入ります。", en: "Telling no one requires 谁: 对谁都不要说." }
      }
    ],
    error_correction: [
      {
        id: "ec_univ_1",
        wrong_sentence: "我都不想吃什么。",
        correct_sentence: "我什么都不想吃。",
        error_point: { vi: "Đưa đại từ nghi vấn 什么 ra sau động từ thay vì đặt trước 都.", ja: "疑問代名詞「什么」を「都」の後ろに置いてしまった誤文。", en: "Placing 什么 after 都 instead of before it." },
        explanation: { vi: "Đại từ nghi vấn bắt buộc phải đứng TRƯỚC 都: 我什么都不想吃.", ja: "「疑问词＋都＋述語」の順に修正します：我什么都不想吃。", en: "Wh-word must precede 都: 我什么都不想吃." }
      }
    ],
    quiz: [
      {
        id: "qz_univ_1",
        question: { vi: "Câu '他什么都会' có nghĩa là gì?", ja: "「他什么都会」の正しい意味は？", en: "What does '他什么都会' mean?" },
        options: [
          { text: { vi: "Cái gì anh ấy cũng biết làm (toàn năng)", ja: "彼は何でもできる（万能）", en: "He knows how to do everything (all-capable)" }, correct: true },
          { text: { vi: "Anh ấy biết cái gì?", ja: "彼は何ができるのですか？（疑問文）", en: "What does he know how to do?" }, correct: false }
        ],
        explanation: { vi: "什么都 biểu thị ý nghĩa phiếm chỉ toàn bộ 'cái gì cũng...'.", ja: "全称肯定（何でも〜）を表す宣言文です。", en: "Universal affirmation: 'everything'." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Đại từ nghi vấn (谁/什么/哪儿) + 都/也 + Vị ngữ: Biểu thị toàn bộ (Ai cũng / Cái gì cũng / Không một ai / Chẳng có gì).",
        ja: "疑問代名詞＋都／也＋述語：全称（誰でも・何でも）または完全否定（誰一人〜ない・何一つ〜ない）。",
        en: "Wh-word + 都/也 + Predicate: Universal statement (everyone / everything / no one / nothing)."
      },
      remember: [
        { vi: "Đại từ nghi vấn luôn đứng TRƯỚC 都/也 (Ví dụ: 什么都, 哪儿都).", ja: "疑問詞は必ず「都／也」の前に置く。", en: "The wh-word must precede 都/也." }
      ]
    }
  },

  // 35. hsk3_adjective_reduplication
  {
    id: "hsk3_adjective_reduplication",
    level: "HSK3",
    level_num: 3,
    category: "reduplication",
    difficulty: 3,
    frequency: 5,
    register: "spoken",
    keywords: ["形容词重叠", "AA的", "AABB", "adjective reduplication", "lặp lại tính từ"],
    formula: "Tính từ đơn âm: AA(的)  |  Tính từ 2 âm: AABB(的)",
    formula_plain: {
      vi: "Tính từ 1 âm lặp AA (红红的, 高高的) | Tính từ 2 âm lặp AABB (高高兴兴, 干干净净)",
      ja: "単音節形容詞：AA(的)（红红的・大大） ｜ 2音節形容詞：AABB(的)（高高兴兴・干干净净）",
      en: "Monosyllabic: AA(的) (红红的) | Disyllabic: AABB(的) (高高兴兴, 漂漂亮亮)"
    },
    structure_blocks: [
      { label: { vi: "Tính từ lặp lại", ja: "形容詞重ね型（AA／AABB）", en: "Reduplicated Adjective" }, role: "adjective", color: "#EC4899" },
      { label: { vi: "Trợ từ 的 / 地", ja: "助詞 的／地", en: "Particle 的/地" }, role: "particle", color: "#8B5CF6" },
      { label: { vi: "Danh từ trung tâm / Động từ", ja: "中心名詞／修飾動詞", en: "Head Noun / Verb" }, role: "object", color: "#10B981" }
    ],
    related_ids: ["hsk1_hen_adjective_predicate", "hsk2_verb_reduplication"],
    confusable_with: [
      {
        id: "hsk1_hen_adjective_predicate",
        diff: {
          vi: "Tính từ khi ĐÃ LẶP LẠI (AABB hoặc AA的) bản thân nó đã mang sắc thái mức độ cao và tình cảm sinh động, TUYỆT ĐỐI KHÔNG đi kèm phó từ mức độ như 很, 非常, 太 (sai: 很干干净净).",
          ja: "形容詞重ね型はそれ自体で高い程度や描写感情を含むため、「很」「非常」「太」などの程度副詞を前につけてはいけません（❌ 很高高兴兴）。",
          en: "Reduplicated adjectives already embody deep degree and vivid feeling; they can NEVER be modified by degree adverbs like 很, 非常, or 太."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Lặp lại tính từ (AA的 / AABB): Tăng cường tính miêu tả sinh động",
        concept: "Dùng để miêu tả sâu sắc, sinh động dáng vẻ, tính chất của người hoặc sự vật, thường mang sắc thái yêu thích, dễ thương hoặc khen ngợi.",
        grammar_notes: [
          "Đơn âm tiết: 红红的脸 (khuôn mặt đỏ hồng hào), 大大的眼睛 (đôi mắt to tròn).",
          "Hai âm tiết: Luôn lặp theo dạng AABB (高高兴兴 - vui vẻ hớn hở, 干干净净 - sạch bong sáng bóng).",
          "Quy tắc vàng cấm kỵ: KHÔNG dùng 很, 非常 trước tính từ lặp lại (sai: 很漂漂亮亮).",
          "Làm trạng ngữ đứng trước động từ: Thường kèm 地 (Ví dụ: 高高兴兴地去上学 - Hớn hở đi đến trường)."
        ],
        pedagogical_tips: "Cực kỳ khắc sâu: 'Đã lặp tính từ thì cấm tuyệt đối dùng 很'."
      },
      ja: {
        title: "形容詞の重ね型（AA的・AABB的）",
        concept: "事物の状態を生き生きと情感豊かに描写する表現で、親愛感や強調のニュアンスが加わります。",
        grammar_notes: [
          "単音節：AA的（例：红红的苹果、圆圆的脸）。",
          "2音節：必ず「AABB」型（例：高兴 ➔ 高高兴兴、干净 ➔ 干干净净）。※動詞のABABと混同注意！",
          "絶対禁忌ルール：すでに程度が強調されているため、「很」「非常」「太」などの程度副詞を前につけてはならない！",
          "連用修飾語（状語）として使う場合：「地」を伴う（例：高高兴兴地上学）。"
        ],
        pedagogical_tips: "「動詞はABAB、形容詞はAABB」の区別と、「很」との共起不可を徹底します。"
      },
      en: {
        title: "Adjective Reduplication (AA的 / AABB)",
        concept: "Provides vivid, affectionate, or descriptive depiction of qualities, rendering descriptions lively and expressive.",
        grammar_notes: [
          "Monosyllabic: AA的 (e.g. 大大的眼睛 - big round eyes).",
          "Disyllabic: Always follows the AABB pattern (e.g. 干净 -> 干干净净, 高兴 -> 高高兴兴). *Contrast with verbs which follow ABAB.*",
          "Absolute taboo: NEVER add degree adverbs like 很, 非常, or 太 before reduplicated adjectives (e.g. 很干干净净 is ungrammatical).",
          "As adverbials modifying verbs: Takes 地 (e.g. 高高兴兴地走 - walked happily)."
        ],
        pedagogical_tips: "Enforce: No 很 before reduplicated adjectives; AABB for adjectives vs ABAB for verbs."
      }
    },
    fill_template: {
      template_zh: "屋子里被打扫得{adj}的。",
      template_vi: "Căn phòng được dọn dẹp sạch {adj}.",
      slots: [
        { name: "adj", type: "adjective", options: ["干干净净", "干干净净很", "干净干净", "干净了"] }
      ]
    },
    collocations: [
      { pattern: "高高兴兴", pinyin: "gāogāo-xìngxìng", meaning_vi: "Vui vẻ hớn hở", meaning_en: "Happily / Joyfully" },
      { pattern: "红红的", pinyin: "hónghóng de", meaning_vi: "Đỏ hồng hào", meaning_en: "Rosy red" }
    ],
    examples: [
      {
        zh: "小妹妹有一双大大的眼睛。",
        pinyin: "Xiǎo mèimei yǒu yì shuāng dàdà de yǎnjing.",
        translations: { vi: "Em gái nhỏ có một đôi mắt to tròn xoe.", ja: "妹には大きくてパッチリした目があります。", en: "The little sister has a pair of big round eyes." },
        literal_en: "Little sister have one pair big-big 's eyes.",
        scenario: { vi: "Miêu tả ngoại hình dễ thương của em bé", ja: "子供の愛らしい容姿の描写", en: "Describing cute appearance" },
        tone_tip: { vi: "大大的 đọc liền mạch, mang âm hưởng dịu dàng.", ja: "「大大的」は柔らかく情感を込めて発音します。", en: "Pronounced with affectionate inflection." },
        word_order_diff: { vi: "Định ngữ lặp lại (大大的) + 的 + Danh từ trung tâm (眼睛).", ja: "「AA＋的＋名詞」の連体修飾構造です。", en: "Reduplicated modifier + 的 + Noun." },
        note: { vi: "Gợi tả vẻ xinh xắn, đáng yêu của đôi mắt.", ja: "ただの「大眼睛」より愛らしさが格段に増します。", en: "Much more vivid and endearing than plain 大." },
        tokens: [
          { hanzi: "小妹妹", pinyin: "xiǎo mèimei", han_viet: "tiểu muội muội", ja_kanji: "幼い妹", literal_en: "little sister", block_role: "subject" },
          { hanzi: "有", pinyin: "yǒu", han_viet: "hữu", ja_kanji: "持つ", literal_en: "have", block_role: "verb" },
          { hanzi: "一双", pinyin: "yì shuāng", han_viet: "nhất song", ja_kanji: "一対の", literal_en: "a pair of", block_role: "numeral" },
          { hanzi: "大大的", pinyin: "dàdà de", han_viet: "đại đại đích", ja_kanji: "大きなパッチリした", literal_en: "big and round", block_role: "adjective" },
          { hanzi: "眼睛", pinyin: "yǎnjing", han_viet: "nhãn tinh", ja_kanji: "目", literal_en: "eyes", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_adjred_1",
        prompt: { vi: "Sắp xếp: 'Bọn trẻ vui vẻ hớn hở đi sở thú.'", ja: "並べ替え：「子供たちは楽しそうに動物園へ行った。」", en: "Unscramble: 'The kids happily went to the zoo.'" },
        correct_order: ["孩子们", "高高兴兴", "地", "去", "动物园", "了", "。"],
        tokens: ["动物园", "地", "去", "孩子们", "高高兴兴", "了", "。"],
        explanation: { vi: "Tính từ lặp lại làm trạng ngữ đi với 地: 高高兴兴地去.", ja: "AABB型形容詞＋地＋動詞で連用修飾語になります。", en: "AABB Adjective + 地 + Verb." }
      }
    ],
    fill_blank: [
      {
        id: "fb_adjred_1",
        sentence_zh: "屋里收拾得{blank}的，让人感觉特别舒服。",
        answer: "干干净净",
        options: ["干干净净", "很干干净净", "干净干净", "干净了干净"],
        explanation: { vi: "Tính từ 干净 lặp lại theo dạng AABB là 干干净净, tuyệt đối không dùng 很 trước nó.", ja: "「干净」のAABB型は「干干净净」。「很」をつけてはいけません。", en: "干净 becomes 干干净净; no 很 allowed." }
      }
    ],
    error_correction: [
      {
        id: "ec_adjred_1",
        wrong_sentence: "他的房间很干干净净。",
        correct_sentence: "他的房间干干净净的。",
        error_point: { vi: "Dùng phó từ mức độ 很 trước tính từ lặp lại 干干净净.", ja: "形容詞重ね型「干干净净」の前に程度副詞「很」をつけてしまった誤文。", en: "Adding 很 before the reduplicated adjective 干干净净." },
        explanation: { vi: "Bỏ phó từ 很, thêm trợ từ 的 ở cuối câu: 他的房间干干净净的.", ja: "「很」を取り除き、「他的房间干干净净的」とします。", en: "Remove 很; say 他的房间干干净净的." }
      }
    ],
    quiz: [
      {
        id: "qz_adjred_1",
        question: { vi: "Dạng lặp lại của tính từ hai âm tiết 漂亮 (xinh đẹp) là gì?", ja: "2音節形容詞「漂亮」の重ね型として正しいものは？", en: "What is the correct reduplication form of the adjective 漂亮?" },
        options: [
          { text: { vi: "漂漂亮亮 (Dạng AABB của tính từ)", ja: "漂漂亮亮（AABB型）", en: "漂漂亮亮 (AABB form)" }, correct: true },
          { text: { vi: "漂亮漂亮 (Dạng ABAB của động từ)", ja: "漂亮漂亮（ABAB型）", en: "漂亮漂亮 (ABAB form)" }, correct: false }
        ],
        explanation: { vi: "Tính từ 2 âm tiết luôn lặp theo quy tắc AABB.", ja: "形容詞はAABB型です。ABAB型は動詞の重ね型です。", en: "Adjectives follow AABB, whereas verbs follow ABAB." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Tính từ lặp lại (AA的 / AABB): Tả sinh động, giàu tình cảm; TUYỆT ĐỐI không đi kèm 很, 非常, 太.",
        ja: "形容詞の重ね型（AA的/AABB）：生き生きとした情緒的描写。程度副詞「很・非常・太」は絶対に前置不可。",
        en: "Adjective Reduplication (AA的 / AABB): Vivid depiction; NEVER modified by 很, 非常, or 太."
      },
      remember: [
        { vi: "Phân biệt then chốt: Động từ lặp ABAB (休息休息), Tính từ lặp AABB (高高兴兴).", ja: "動詞はABAB型、形容詞はAABB型。", en: "Verbs: ABAB; Adjectives: AABB." }
      ]
    }
  },

  // 36. hsk3_existential_sentence
  {
    id: "hsk3_existential_sentence",
    level: "HSK3",
    level_num: 3,
    category: "sentence_pattern",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["存现句", "existential sentence", "câu tồn hiện", "trên bàn có đặt", "ở nơi nào có gì"],
    formula: "Từ chỉ nơi chốn + Động từ + 着 / 了 + Danh ngữ (Không xác định)",
    formula_plain: {
      vi: "Nơi chốn + Động từ (放/写/挂/坐/站) + 着/了 + Danh từ không xác định (Nơi nào đang tồn tại/xuất hiện cái gì)",
      ja: "場所詞 ＋ 動詞（放・写・挂・坐など）＋ 着／了 ＋ 不特定名詞句（〜に〜が置いてある・かけてある）",
      en: "Place Word + Verb + 着 / 了 + Indefinite Noun Phrase (There is/exists something at a place)"
    },
    structure_blocks: [
      { label: { vi: "Địa điểm / Nơi chốn", ja: "場所詞（文頭）", en: "Location Phrase" }, role: "location", color: "#8B5CF6" },
      { label: { vi: "Động từ tư thế/tồn tại", ja: "姿勢・存在動詞", en: "Posture/Exist Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ động thái 着 / 了", ja: "アスペクト助詞 着／了", en: "Aspect Marker (着/了)" }, role: "aspect", color: "#EC4899" },
      { label: { vi: "Danh ngữ tồn tại (Bất định)", ja: "存現事物（不特定名詞）", en: "Existing Noun Phrase" }, role: "object", color: "#3B82F6" }
    ],
    related_ids: ["hsk1_you_possession_existence", "hsk2_zhe_durative_aspect"],
    confusable_with: [
      {
        id: "hsk1_you_possession_existence",
        diff: {
          vi: "Câu chữ 有 chỉ nói chung nơi nào có gì (桌子上有书 - Trên bàn có sách). Câu tồn hiện V+着 miêu tả tư thế cụ thể của sự vật (桌子上放着一本书 - Trên bàn đang đặt một quyển sách).",
          ja: "「桌子上有书」は単なる存在。「桌子上放着一本书」は「置いてある」という具体的な姿勢・状態描写。",
          en: "有 merely states existence; V+着 depicts the specific posture/state of existence (hanging, lying, standing)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu tồn hiện: Nơi chốn + Động từ + 着/了 + Danh ngữ",
        concept: "Dùng để miêu tả sự tồn tại, xuất hiện hoặc biến mất của người hoặc đồ vật tại một địa điểm cụ thể.",
        grammar_notes: [
          "Động từ thường là động từ chỉ tư thế/trạng thái: 放 (đặt), 挂 (treo), 坐 (ngồi), 站 (đứng), 躺 (nằm), 写 (viết).",
          "Dùng 着: Biểu thị trạng thái đang duy trì (墙上挂着一张中国地图 - Trên tường đang treo một tấm bản đồ Trung Quốc).",
          "Dùng 了: Biểu thị sự xuất hiện hoặc biến mất mới phát sinh (前边来了一辆出租车 - Phía trước có một chiếc taxi vừa tới).",
          "Quy tắc vàng: Danh từ đứng sau động từ BẮT BUỘC là danh từ không xác định (phải có số từ + lượng từ: 一本书, 几个人; KHÔNG ĐƯỢC dùng 这/那 hay tên riêng: sai: 桌子上放着这本书)."
        ],
        pedagogical_tips: "Cảnh báo lỗi học sinh hay mắc: Danh từ sau động từ câu tồn hiện không được có 这/那."
      },
      ja: {
        title: "存現文（処所＋動詞＋着／了＋不特定名詞句）",
        concept: "ある場所に人や物が存在している状態（静的存現）、または出現・消失したこと（動的存現）を描写する文型です。",
        grammar_notes: [
          "「着」を用いる静態存現：姿勢・設置状態の維持（例：门上贴着一张红纸、床上躺着一个人）。",
          "「了」を用いる動態存現：出現・消失（例：前边来了一个人、家里丢了一把钥匙）。",
          "最重要ルール：動詞の後ろに置く名詞は「不特定（特定されていない未知の事物）」でなければならない（⭕ 放着一本书 / ❌ 放着这本书）。"
        ],
        pedagogical_tips: "存現名詞が不特定（数量詞を伴い、这/那をつけない）である原則を指導します。"
      },
      en: {
        title: "Existential Sentences (Place + Verb + 着/了 + Noun Phrase)",
        concept: "Describes the presence, posture, emergence, or disappearance of a person or object at a specific location.",
        grammar_notes: [
          "With 着 (Static state/posture): 墙上挂着一幅画 (A painting is hanging on the wall).",
          "With 了 (Dynamic emergence/departure): 楼下开来了一辆车 (A car drove up downstairs).",
          "Cardinal rule: The noun phrase following the verb MUST be INDEFINITE (e.g. 一本书, 两个人; NEVER definite demonstratives like 这/那 or proper names)."
        ],
        pedagogical_tips: "Stress the indefiniteness constraint: No 这 / 那 allowed for the existential noun."
      }
    },
    fill_template: {
      template_zh: "黑板上写{aspect}今天的作业题目。",
      template_vi: "Trên bảng đen đang viết {aspect} đề bài tập của ngày hôm nay.",
      slots: [
        { name: "aspect", type: "aspect", options: ["着", "了", "过", "在"] }
      ]
    },
    collocations: [
      { pattern: "放着一本书", pinyin: "fàng zhe yì běn shū", meaning_vi: "Đang đặt một quyển sách", meaning_en: "A book is placed there" },
      { pattern: "墙上挂着画", pinyin: "qiáng shang guà zhe huà", meaning_vi: "Trên tường đang treo bức tranh", meaning_en: "A picture hangs on the wall" }
    ],
    examples: [
      {
        zh: "桌子上放着一杯热咖啡。",
        pinyin: "Zhuōzi shang fàng zhe yì bēi rè kāfēi.",
        translations: { vi: "Trên bàn đang đặt một ly cà phê nóng.", ja: "机の上にはホットコーヒーが1杯置いてあります。", en: "A cup of hot coffee is placed on the table." },
        literal_en: "Table on place-durative one cup hot coffee.",
        scenario: { vi: "Miêu tả đồ vật trên bàn làm việc", ja: "デスクの上の光景描写", en: "Describing items on desk" },
        tone_tip: { vi: "Trợ từ 着 đọc thanh nhẹ (zhe).", ja: "「着」は軽声で発音します。", en: "zhe is neutral tone." },
        word_order_diff: { vi: "Địa điểm (桌子上) làm chủ ngữ ở đầu câu + V (放) + 着 + Danh ngữ (一杯热咖啡).", ja: "場所詞が文頭に立ち、述語＋着＋不特定名詞が続きます。", en: "Location at head + Verb + 着 + Indefinite noun." },
        note: { vi: "Miêu tả trạng thái tĩnh của đồ vật tại nơi chốn.", ja: "事物の静止した配置状態を客観描写します。", en: "Depicts static placement." },
        tokens: [
          { hanzi: "桌子上", pinyin: "zhuōzi shang", han_viet: "trác tử thượng", ja_kanji: "机の上", literal_en: "on the table", block_role: "location" },
          { hanzi: "放", pinyin: "fàng", han_viet: "phóng", ja_kanji: "置く", literal_en: "place", block_role: "verb" },
          { hanzi: "着", pinyin: "zhe", han_viet: "trước", ja_kanji: "〜してある", literal_en: "-ing", block_role: "aspect" },
          { hanzi: "一杯", pinyin: "yì bēi", han_viet: "nhất bôi", ja_kanji: "1杯の", literal_en: "a cup of", block_role: "classifier" },
          { hanzi: "热咖啡", pinyin: "rè kāfēi", han_viet: "nhiệt cà phê", ja_kanji: "ホットコーヒー", literal_en: "hot coffee", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_exist_1",
        prompt: { vi: "Sắp xếp: 'Trước cửa đang đỗ một chiếc xe đạp.'", ja: "並べ替え：「ドアの前に自転車が1台停めてあります。」", en: "Unscramble: 'A bicycle is parked in front of the door.'" },
        correct_order: ["门口", "停", "着", "一辆", "自行车", "。"],
        tokens: ["自行车", "停", "一辆", "门口", "着", "。"],
        explanation: { vi: "Nơi chốn (门口) + V (停) + 着 + Danh ngữ không xác định (一辆自行车).", ja: "場所（门口）＋動詞（停）＋着＋不特定名詞（一辆自行车）の順です。", en: "Location + Verb + 着 + Indefinite Noun." }
      }
    ],
    fill_blank: [
      {
        id: "fb_exist_1",
        sentence_zh: "墙上挂{blank}两张全家福照片。",
        answer: "着",
        options: ["着", "了", "过", "在"],
        explanation: { vi: "Treo trên tường biểu thị trạng thái duy trì tĩnh dùng 挂着.", ja: "壁にかかっている静態維持を表すので「挂着」です。", en: "Static ongoing state takes 着: 挂着." }
      }
    ],
    error_correction: [
      {
        id: "ec_exist_1",
        wrong_sentence: "桌子上放着这本书。",
        correct_sentence: "桌子上放着一本书。",
        error_point: { vi: "Dùng danh từ xác định 这本书 trong câu tồn hiện.", ja: "存現文の末尾名詞に特定指示詞「这」をつけてしまった誤文。", en: "Using a definite noun (这本书) in an existential sentence." },
        explanation: { vi: "Danh từ sau động từ trong câu tồn hiện bắt buộc phải là danh từ không xác định: 一本书 (không dùng 这本书).", ja: "存現文の事物は不特定名詞（一本书）でなければなりません。", en: "The existential noun must be indefinite: 一本书." }
      }
    ],
    quiz: [
      {
        id: "qz_exist_1",
        question: { vi: "Danh từ đứng sau động từ trong câu tồn hiện có đặc điểm ngữ pháp gì bắt buộc?", ja: "存現文で動詞の後ろに置かれる名詞の必須条件は？", en: "What is the mandatory condition for the noun following the verb in existential sentences?" },
        options: [
          { text: { vi: "Phải là danh từ không xác định (thường có số từ + lượng từ: 一辆车, 两个人)", ja: "不特定名詞でなければならない（数量詞を伴い、特定名詞は不可）", en: "Must be an indefinite noun (typically preceded by a number + classifier)" }, correct: true },
          { text: { vi: "Phải là danh từ xác định (phải có 这, 那 hoặc tên riêng)", ja: "特定名詞（这・那・固有名詞）でなければならない", en: "Must be a definite noun (with 这, 那, or proper name)" }, correct: false }
        ],
        explanation: { vi: "Quy tắc ngữ pháp tiếng Trung: Tân ngữ của câu tồn hiện bắt buộc mang tính bất định.", ja: "存現文の目的語は不特定名詞に限られます。", en: "Existential objects must be indefinite." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Nơi chốn + V + 着/了 + Danh ngữ bất định: Miêu tả sự tồn tại/xuất hiện; danh từ TUYỆT ĐỐI không có 这/那.",
        ja: "場所詞＋動詞＋着/了＋不特定名詞：存現文（〜に〜がある/現れた）。名詞に「这/那」は不可。",
        en: "Location + Verb + 着/了 + Indefinite Noun: Depicts existence/emergence; no 这/那 permitted."
      },
      remember: [
        { vi: "Quy tắc vàng: Nói '放着一本书', cấm kỵ nói '放着这本书'.", ja: "「放着一本书」⭕、「放着这本书」❌。", en: "Say 放着一本书, never 放着这本书." }
      ]
    }
  },

  // 37. hsk4_bu_shi_er_shi
  {
    id: "hsk4_bu_shi_er_shi",
    level: "HSK4",
    level_num: 4,
    category: "sentence_pattern",
    difficulty: 4,
    frequency: 5,
    register: "formal",
    keywords: ["不是...而是...", "búshì...érshì...", "không phải... mà là...", "parallel contrast", "not but"],
    formula: "不是 + Vế A (Bác bỏ)，而是 + Vế B (Khẳng định bản chất)",
    formula_plain: {
      vi: "不是 + A，而是 + B (Không phải là A, mà thực chất là B)",
      ja: "不是……，而是……（〜ではなくて、〜なのだ）",
      en: "不是 + A, 而是 + B (Not A, but rather B)"
    },
    structure_blocks: [
      { label: { vi: "Phủ định bác bỏ 不是", ja: "否定否定辞 不是", en: "Negation 不是" }, role: "negation", color: "#EF4444" },
      { label: { vi: "Phương án A (Bác bỏ)", ja: "否定対象A", en: "Rejected Option A" }, role: "clause", color: "#F59E0B" },
      { label: { vi: "Khẳng định bản chất 而是", ja: "転換肯定 而是", en: "Affirmation 而是" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Phương án B (Chân lý)", ja: "肯定真相B", en: "True Option B" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk1_bu_negation", "hsk1_shi_sentence"],
    confusable_with: [
      {
        id: "hsk1_bu_negation",
        diff: {
          vi: "不是...而是... dùng để đính chính nhận thức sai lầm (bác bỏ A và chỉ ra chân lý là B). Khác với 不但...而且... (tăng tiến: không những mà còn).",
          ja: "「不是……而是……」は誤解の訂正（AではなくB）。「不但……而且……」は累加進展（AだけでなくBも）。",
          en: "不是...而是... corrects misconceptions (not A, but B). Distinct from 不但...而且... (not only, but also)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc song hành 不是……而是…… (Không phải là…… mà là……)",
        concept: "Dùng để phủ định, bác bỏ phương án hoặc nhận định A ở vế trước, đồng thời khẳng định bản chất, chân tướng sự việc thực sự là phương án B ở vế sau.",
        grammar_notes: [
          "Bác bỏ lý do: 我不是不想去，而是实在抽不出时间。 (Tôi không phải không muốn đi, mà là thực sự không dứt ra được thời gian).",
          "Bác bỏ bản chất: 成功不是靠运气，而是靠坚持。 (Thành công không phải dựa vào may mắn, mà là dựa vào sự kiên trì).",
          "Hai vế A và B thường cân đối về mặt từ loại hoặc cấu trúc ngữ pháp."
        ],
        pedagogical_tips: "Cấu trúc mẫu mực cho nghị luận và diễn đạt ý kiến sâu sắc trong HSK 4 và HSK 5."
      },
      ja: {
        title: "並列対比構文「不是……而是……」（〜ではなく、〜なのだ）",
        concept: "前節で事実とは異なる仮定や誤解（A）を明確に打ち消し、後節で本当の理由や本質（B）を力強く提示します。",
        grammar_notes: [
          "本質の提示：「他不是不聪明，而是不用功」（彼は頭が悪いのではなく、努力しないだけだ）。",
          "原因の訂正：「我迟到不是因为起晚了，而是路上堵车」（遅刻したのは寝坊したからではなく渋滞のせいだ）。",
          "AとBは品詞や構造が美しく釣り合うように対比させます。"
        ],
        pedagogical_tips: "HSK4の読解・作文で議論や主張を述べる最頻出構文として指導します。"
      },
      en: {
        title: "Parallel Contrast: 不是……而是……",
        concept: "Used to refute a mistaken assumption or excuse (A), while affirming the true fact, reason, or essence (B) ('not A, but rather B').",
        grammar_notes: [
          "Refuting excuses: 他不是不懂，而是不想做。 (It's not that he doesn't understand, but that he doesn't want to do it).",
          "Affirming truth: 学习不是为了考试，而是为了充实自己。 (Studying is not for exams, but to enrich oneself).",
          "Clauses A and B are typically grammatically balanced."
        ],
        pedagogical_tips: "Essential argumentative structure for HSK 4 and HSK 5 writing."
      }
    },
    fill_template: {
      template_zh: "这并不是结束，{conjunction}一个新的开始。",
      template_vi: "Đây hoàn toàn không phải là sự kết thúc, {conjunction} là một khởi đầu mới.",
      slots: [
        { name: "conjunction", type: "conjunction", options: ["而是", "而且", "但是", "所以"] }
      ]
    },
    collocations: [
      { pattern: "不是...而是...", pinyin: "búshì... érshì...", meaning_vi: "Không phải... mà là...", meaning_en: "Not... but rather..." },
      { pattern: "不是偶然，而是必然", pinyin: "búshì ǒurán, érshì bìrán", meaning_vi: "Không phải ngẫu nhiên, mà là tất nhiên", meaning_en: "Not accidental, but inevitable" }
    ],
    examples: [
      {
        zh: "解决问题不是靠发脾气，而是要靠沟通。",
        pinyin: "Jiějué wèntí bú shì kào fā píqi, ér shì yào kào gōutōng.",
        translations: { vi: "Giải quyết vấn đề không phải dựa vào việc nổi nóng, mà phải dựa vào sự giao tiếp thấu hiểu.", ja: "問題解決は癇癪を起こすことによるのではなく、対話によるべきです。", en: "Solving problems relies not on losing one's temper, but rather on communication." },
        literal_en: "Solve problem not is rely lose temper, but is must rely communication.",
        scenario: { vi: "Chia sẻ triết lý xử lý mâu thuẫn", ja: "トラブル対処の心得", en: "Conflict resolution insight" },
        tone_tip: { vi: "而是 đọc là érshì.", ja: "「而是」は第2声＋第4声です。", en: "ér (2nd) + shì (4th)." },
        word_order_diff: { vi: "Không phải (不是) + Phương án A + Mà là (而是) + Phương án B.", ja: "「不是A，而是B」の完全対比パターンです。", en: "Not A, but rather B." },
        note: { vi: "Khẳng định phương pháp giải quyết đúng đắn.", ja: "論理的で説得力のある大人の表現です。", en: "Persuasive and mature argumentation." },
        tokens: [
          { hanzi: "解决问题", pinyin: "jiějué wèntí", han_viet: "giải quyết vấn đề", ja_kanji: "問題解決", literal_en: "solving problems", block_role: "subject" },
          { hanzi: "不是", pinyin: "bú shì", han_viet: "bất thị", ja_kanji: "〜ではない", literal_en: "is not", block_role: "negation" },
          { hanzi: "靠发脾气", pinyin: "kào fā píqi", han_viet: "kháo phát tỳ khí", ja_kanji: "怒ることによる", literal_en: "rely on losing temper", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "而是", pinyin: "ér shì", han_viet: "nhi thị", ja_kanji: "〜なのだ", literal_en: "but rather", block_role: "conjunction" },
          { hanzi: "要靠沟通", pinyin: "yào kào gōutōng", han_viet: "yếu kháo câu thông", ja_kanji: "対話によるべきだ", literal_en: "must rely on communication", block_role: "clause" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_ershi_1",
        prompt: { vi: "Sắp xếp: 'Tôi không phải sợ khó khăn, mà là sợ mất đi lòng tin.'", ja: "並べ替え：「私は困難を恐れているのではなく、自信を失うのを恐れているのだ。」", en: "Unscramble: 'I am not afraid of difficulties, but rather of losing confidence.'" },
        correct_order: ["我", "不是", "怕", "困难", "，", "而是", "怕", "失去", "信心", "。"],
        tokens: ["困难", "失去", "我", "不是", "怕", "而是", "信心", "怕", "，", "。"],
        explanation: { vi: "S + 不是 + A (怕困难)，而是 + B (怕失去信心).", ja: "不是A，而是Bの対比配置です。", en: "不是 A, 而是 B." }
      }
    ],
    fill_blank: [
      {
        id: "fb_ershi_1",
        sentence_zh: "他之所以成功，不是因为运气好，{blank}因为他付出了超常的努力。",
        answer: "而是",
        options: ["而是", "而且", "所以", "但是"],
        explanation: { vi: "Bác bỏ lý do may mắn (不是因为) và chỉ ra chân lý do nỗ lực (而是因为).", ja: "「不是因为……而是因为……」の呼応です。", en: "Balances 不是 with 而是." }
      }
    ],
    error_correction: [
      {
        id: "ec_ershi_1",
        wrong_sentence: "他不是日本人，而且韩国人。",
        correct_sentence: "他不是日本人，而是韩国人。",
        error_point: { vi: "Dùng nhầm 而且 (tăng tiến: mà còn) thay vì  بلکه 而是 (mà là).", ja: "訂正の「而是」の代わりに累加の「而且」を使ってしまった誤文。", en: "Using 而且 instead of 而是." },
        explanation: { vi: "Bác bỏ A và khẳng định B phải dùng cặp 不是... 而是...", ja: "「AではなくB」は「不是……而是……」とします。", en: "Correction pattern requires 不是...而是..." }
      }
    ],
    quiz: [
      {
        id: "qz_ershi_1",
        question: { vi: "Sự khác biệt cốt lõi giữa '不是...而且...' và '不是...而是...' là gì?", ja: "「不是……而且……」と「不是……而是……」の決定的な違いは？", en: "What is the core difference between '不是...而且...' and '不是...而是...'?" },
        options: [
          { text: { vi: "不是...而是... dùng để đính chính (không phải A mà là B); còn 而且 là liên từ tăng tiến không đi với 不是 theo cách này", ja: "不是……而是……は訂正（AではなくB）。而且は上乗せの累加で、この否定対比には不適合", en: "不是...而是... corrects misconceptions (not A, but B); 而且 is additive and unsuitable here" }, correct: true },
          { text: { vi: "Hai cấu trúc này hoàn toàn tương đương nhau", ja: "2つは完全に互換可能", en: "They are completely interchangeable" }, correct: false }
        ],
        explanation: { vi: "而是 mang nghĩa 'mà là' dùng để chỉ chân tướng thực sự.", ja: "「而是」は真相を提示する対比接続詞です。", en: "而是 introduces the true reality." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "不是 A，而是 B: Bác bỏ phương án A, khẳng định bản chất sự việc thực sự là phương án B (Không phải... mà là...).",
        ja: "不是 A，而是 B：前節の誤解Aを打ち消し、後節の真相・本質Bを提示する（〜ではなく〜なのだ）。",
        en: "不是 A, 而是 B: Refutes misconception A and asserts the true reality B ('not A, but rather B')."
      },
      remember: [
        { vi: "Không nhầm lẫn 而是 (mà là) với 而且 (mà còn).", ja: "「而是（〜ではなくて）」と「而且（その上）」の混同を避ける。", en: "Distinguish 而是 (rather) from 而且 (furthermore)." }
      ]
    }
  },

  // 38. hsk4_ji_shi_ye_concession
  {
    id: "hsk4_ji_shi_ye_concession",
    level: "HSK4",
    level_num: 4,
    category: "conjunction",
    difficulty: 4,
    frequency: 5,
    register: "neutral",
    keywords: ["即使...也...", "jíshǐ...yě...", "cho dù... cũng...", "giả định nhượng bộ", "even if", "even though"],
    formula: "即使 + Giả định cực đoan nhất，(S) 也 + Kết quả không đổi",
    formula_plain: {
      vi: "即使 (Cho dù / Dù cho) + Vế giả định，(S) 也 (vẫn / cũng) + Kết quả không đổi",
      ja: "即使（たとえ〜であっても）……，也（やはり〜だ）……",
      en: "即使 (Even if / Even though) + Hypothetical Condition, (S) 也 (still) + Invariant Result"
    },
    structure_blocks: [
      { label: { vi: "Liên từ giả định 即使", ja: "仮定譲歩連詞 即使", en: "Hypothetical 即使" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Tình huống cực đoan", ja: "極端な仮定節", en: "Extreme Scenario" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Phó từ kiên định 也", ja: "副詞 也", en: "Invariant Marker 也" }, role: "adverb", color: "#F59E0B" },
      { label: { vi: "Kết quả kiên định không đổi", ja: "不変の帰結節", en: "Unchanged Result" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk2_suiran_danshi"],
    confusable_with: [
      {
        id: "hsk2_suiran_danshi",
        diff: {
          vi: "虽然...但是... là nhượng bộ sự thật ĐÃ CÓ THỰC (Tuy anh ấy nghèo, nhưng anh ấy rất vui). 即使...也... là nhượng bộ GIẢ ĐỊNH chưa xảy ra hoặc giả thuyết cực đoan (Cho dù ngày mai có mưa bão, tôi cũng sẽ đến).",
          ja: "虽然……但是……は既成事実の譲歩（現実に〜だが）。即使……也……は仮定の極端な譲歩（たとえ〜だとしても）。",
          en: "虽然...但是... concedes an EXISTING fact; 即使...也... concedes a HYPOTHETICAL extreme scenario."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu ghép giả định nhượng bộ: 即使……也…… (Cho dù…… cũng……)",
        concept: "Dùng để nêu ra một giả thuyết hoặc tình huống cực đoan nhất ở vế trước (thường chưa xảy ra), và khẳng định ở vế sau rằng kết quả hay thái độ vẫn kiên định không hề thay đổi.",
        grammar_notes: [
          "Các từ đồng nghĩa với 即使: 就是... 也..., 就算... 也..., 哪怕... 也... (khẩu ngữ thường dùng 就算, 哪怕).",
          "Vế sau bắt buộc có phó từ 也 đứng trước động từ.",
          "Phân biệt với 虽然: 虽然 đi với sự thật hiển nhiên; 即使 đi với tình huống giả tưởng."
        ],
        pedagogical_tips: "Nhấn mạnh sự đối lập tư duy: 'Mặc dù' (thực tế) vs 'Cho dù' (giả định)."
      },
      ja: {
        title: "仮定譲歩の複文「即使……也……」（たとえ〜であっても、やはり〜）",
        concept: "前節で極端な仮定・最悪のシナリオ（即使）を提示し、後節で「それでもなお結論や決意は揺るがない（也）」と断言する複文です。",
        grammar_notes: [
          "口語類似表現：「哪怕……也……」「就算……也……」。",
          "後節には必ず副詞「也」を動詞の前に置く。",
          "「虽然（既成事実）」と「即使（仮定条件）」の意味的峻別が超重要。"
        ],
        pedagogical_tips: "事実（虽然）と仮定（即使）の違いを作例を通じて理解させます。"
      },
      en: {
        title: "Hypothetical Concession: 即使……也……",
        concept: "Introduces an extreme hypothetical scenario or worst-case condition with 即使 ('even if'), while asserting with 也 that the outcome or resolution remains unchanged.",
        grammar_notes: [
          "Colloquial equivalents: 就算...也..., 哪怕...也...",
          "Clause 2 MUST include the adverb 也 before the verb.",
          "Critical contrast: 虽然 concedes reality (fact); 即使 concedes hypothetical possibility (hypothesis)."
        ],
        pedagogical_tips: "Focus on the distinction between fact (虽然) and hypothetical (即使)."
      }
    },
    fill_template: {
      template_zh: "{concession}遇到再大的困难，我们也有信心克服。",
      template_vi: "{concession} gặp khó khăn lớn đến đâu, chúng tôi cũng có lòng tin khắc phục.",
      slots: [
        { name: "concession", type: "conjunction", options: ["即使", "虽然", "因为", "只要"] }
      ]
    },
    collocations: [
      { pattern: "即使下雨也要去", pinyin: "jíshǐ xiàyǔ yě yào qù", meaning_vi: "Cho dù mưa cũng phải đi", meaning_en: "Going even if it rains" },
      { pattern: "即使失败了也不后悔", pinyin: "jíshǐ shībài le yě bù hòuhuǐ", meaning_vi: "Cho dù thất bại cũng không hối hận", meaning_en: "No regrets even if failing" }
    ],
    examples: [
      {
        zh: "即使工作再忙，他每天也坚持锻炼一小时。",
        pinyin: "Jíshǐ gōngzuò zài máng, tā měitiān yě jiānchí duànliàn yì xiǎoshí.",
        translations: { vi: "Cho dù công việc có bận rộn đến đâu, mỗi ngày anh ấy cũng kiên trì tập thể dục một tiếng.", ja: "たとえ仕事がどんなに忙しくても、彼は毎日欠かさず1時間運動しています。", en: "Even if work is extremely busy, he still insists on exercising for an hour every day." },
        literal_en: "Even-if work again busy, he everyday also insist exercise one hour.",
        scenario: { vi: "Ca ngợi tinh thần kiên trì giữ gìn sức khỏe", ja: "強い意志と習慣の称賛", en: "Praising strong discipline" },
        tone_tip: { vi: "即使 đọc là jíshǐ (thanh 2 + thanh 3).", ja: "「即使」は第2声＋第3声です。", en: "jí (2nd) + shǐ (3rd)." },
        word_order_diff: { vi: "即使 + Giả định cực đoan (工作再忙) + Chủ ngữ vế 2 (他) + 也 + Hành động kiên định (坚持锻炼).", ja: "即使＋極端仮定，主語＋也＋不変述語。", en: "即使 Extreme Condition, S + 也 + Invariant Predicate." },
        note: { vi: "Biểu đạt ý chí kiên định vượt qua thử thách.", ja: "固い決意や不変の習慣を描写する名文です。", en: "Expresses unwavering discipline." },
        tokens: [
          { hanzi: "即使", pinyin: "jíshǐ", han_viet: "tức sử", ja_kanji: "たとえ〜でも", literal_en: "even if", block_role: "conjunction" },
          { hanzi: "工作再忙", pinyin: "gōngzuò zài máng", han_viet: "công tác tái mang", ja_kanji: "仕事がどんなに忙しくても", literal_en: "work is ever so busy", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "彼", literal_en: "he", block_role: "subject" },
          { hanzi: "每天", pinyin: "měitiān", han_viet: "mỗi thiên", ja_kanji: "毎日", literal_en: "every day", block_role: "time" },
          { hanzi: "也", pinyin: "yě", han_viet: "dã", ja_kanji: "〜も・やはり", literal_en: "still/also", block_role: "adverb" },
          { hanzi: "坚持", pinyin: "jiānchí", han_viet: "kiên trì", ja_kanji: "貫く", literal_en: "persist", block_role: "verb" },
          { hanzi: "锻炼一小时", pinyin: "duànliàn yì xiǎoshí", han_viet: "đoán luyện nhất tiểu thời", ja_kanji: "1時間運動する", literal_en: "exercise for an hour", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_jishi_1",
        prompt: { vi: "Sắp xếp: 'Cho dù trời mưa, cuộc thi đấu cũng diễn ra bình thường.'", ja: "並べ替え：「たとえ雨が降っても、試合は予定通り行われます。」", en: "Unscramble: 'Even if it rains, the match will proceed as scheduled.'" },
        correct_order: ["即使", "下雨", "，", "比赛", "也", "照常", "进行", "。"],
        tokens: ["比赛", "下雨", "即使", "照常", "也", "进行", "，", "。"],
        explanation: { vi: "即使 + Giả định (下雨)，比赛 + 也 + Hành động không đổi (照常进行).", ja: "即使〜，主語＋也＋照常进行的構成です。", en: "即使 Condition, S + 也 + Proceed." }
      }
    ],
    fill_blank: [
      {
        id: "fb_jishi_1",
        sentence_zh: "{blank}只有一个人支持我，我也要把这件事情做完。",
        answer: "即使",
        options: ["即使", "虽然", "因为", "只要"],
        explanation: { vi: "Nêu ra tình huống giả định chỉ có 1 người ủng hộ dùng 即使.", ja: "極端な仮定（たとえ1人しか味方がいなくても）なので「即使」です。", en: "Extreme hypothetical assumption requires 即使." }
      }
    ],
    error_correction: [
      {
        id: "ec_jishi_1",
        wrong_sentence: "即使明天天气很好，我们但是要去爬山。",
        correct_sentence: "即使明天天气很好，我们也要去爬山。",
        error_point: { vi: "Dùng nhầm liên từ 但是 thay vì phó từ 也 đi kèm với 即使.", ja: "「即使」の相手に「但是」を使ってしまった誤文。", en: "Using 但是 instead of 也 with 即使." },
        explanation: { vi: "Cặp liên từ chuẩn là 即使... 也... (không dùng 但是).", ja: "「即使……也……」の正しいペアに修正します。", en: "Pair 即使 with 也, never with 但是." }
      }
    ],
    quiz: [
      {
        id: "qz_jishi_1",
        question: { vi: "Điểm khác biệt căn bản giữa 虽然...但是... và 即使...也... là gì?", ja: "「虽然……但是……」と「即使……也……」の根本的な違いは？", en: "What is the fundamental difference between 虽然...但是... and 即使...也...?" },
        options: [
          { text: { vi: "虽然 đi với sự thật đã xảy ra; 即使 đi với tình huống giả định chưa xảy ra", ja: "虽然は既成事実、即使は未発生の仮定条件", en: "虽然 concedes an existing fact; 即使 concedes a hypothetical condition" }, correct: true },
          { text: { vi: "Hai cấu trúc hoàn toàn đồng nghĩa và thay thế tùy tiện được cho nhau", ja: "全く同義で自由に置き換え可能", en: "They are completely synonymous and interchangeable" }, correct: false }
        ],
        explanation: { vi: "虽然 = Thực tế đã là như thế; 即使 = Cho dù có là như thế (giả thuyết).", ja: "「事実の譲歩（虽然）」対「仮定の譲歩（即使）」の決定的な違いです。", en: "Fact concession vs Hypothetical concession." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "即使...也...: Giả định nhượng bộ (Cho dù... cũng...); đi với giả thuyết cực đoan nhất, kết quả vẫn kiên định.",
        ja: "即使……也……：仮定譲歩（たとえ〜であってもやはり〜）。極端な仮定に対し不変の決意・帰結を述べる。",
        en: "即使...也...: Hypothetical concession ('even if... still...'); pairs extreme scenario with unwavering outcome."
      },
      remember: [
        { vi: "Phân biệt: 虽然 (thực tế đã có thật) vs 即使 (giả tưởng nếu xảy ra).", ja: "「虽然」は事実、「即使」は仮定。", en: "虽然 = reality; 即使 = hypothetical." }
      ]
    }
  }
];

module.exports = batch4;
