/**
 * tools/data-batch-3.js
 * 
 * 12 Essential HSK Grammar points (HSK3 27-36, HSK4 37-38)
 * Full pedagogical schema adhering to types/grammar.ts
 */

const batch3 = [
  // 27. hsk3_gen_yi_yang_comparison
  {
    id: "hsk3_gen_yi_yang_comparison",
    level: "HSK3",
    level_num: 3,
    category: "comparison",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["一样", "跟...一样", "yíyàng", "so sánh bằng", "equal comparison", "same as"],
    formula: "A + 跟 / 和 + B + 一样 (+ Tính từ / Động từ)",
    formula_plain: {
      vi: "A + 跟/和 + B + 一样 (+ Tính từ) (A giống như B / A... như B)",
      ja: "A ＋ 跟／和 ＋ B ＋ 一样（＋形容詞）（AはBと同じ〜だ）",
      en: "A + 跟 / 和 + B + 一样 (+ Adjective) (A is the same as B / A is as ... as B)"
    },
    structure_blocks: [
      { label: { vi: "Đối tượng A", ja: "対象A", en: "Item A" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Liên từ 跟 / 和", ja: "接続詞 跟／和", en: "Conjunction 跟/和" }, role: "preposition", color: "#EC4899" },
      { label: { vi: "Đối tượng B", ja: "対象B", en: "Item B" }, role: "object", color: "#10B981" },
      { label: { vi: "Từ so sánh 一样", ja: "同等詞 一样", en: "Comparison 一样" }, role: "modifier", color: "#F59E0B" },
      { label: { vi: "Tính từ thuộc tính", ja: "比較基準（形容詞）", en: "Attribute Adjective" }, role: "adjective", color: "#8B5CF6" }
    ],
    related_ids: ["hsk2_bi_comparison"],
    confusable_with: [
      {
        id: "hsk2_bi_comparison",
        diff: {
          vi: "A 比 B + Adj là so sánh hơn (A hơn B). A 跟 B 一样 + Adj là so sánh ngang bằng (A như B). Phủ định so sánh bằng là A 跟 B 不一样 (không dùng 没).",
          ja: "「A比B」は差の比較（Aの方が〜）。「A跟B一样」は同等比較（AとBは同じ）。否定は「不一样」。",
          en: "比 expresses superiority (more than); 跟...一样 expresses equivalence (the same as)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc so sánh ngang bằng: A 跟 / 和 B (不) 一样 (+ Adj)",
        concept: "Dùng để biểu thị hai đối tượng A và B có đặc điểm, tính chất hoặc trình độ giống nhau.",
        grammar_notes: [
          "So sánh đặc điểm chung chung: 这两件衣服一样。 (Hai chiếc áo này giống nhau).",
          "So sánh theo một tiêu chí tính từ cụ thể: 妹妹跟我一样高。 (Em gái cao bằng tôi).",
          "Phủ định: Đặt 不 trước 一样 -> A 跟 B 不一样 (+ Tính từ) (Ví dụ: 我的想法跟他不一样).",
          "Không đặt 不 trước 跟/和 (nói A 跟 B 不一样, KHÔNG nói A 不跟 B 一样)."
        ],
        pedagogical_tips: "Nhấn mạnh vị trí chữ 不: Luôn đặt trước 一样 (不一样)."
      },
      ja: {
        title: "同等比較構文「A＋跟／和＋B＋一样（＋形容詞）」",
        concept: "2つの対象AとBが同一であることや、特定の性質・程度が同等であることを表します。",
        grammar_notes: [
          "単純な同等：「这本书跟他那本一样」（この本は彼のと同一だ）。",
          "特定属性の同等（形容詞付き）：「他跟我一样高」（彼は私と同じ背の高さだ）。",
          "否定の形：必ず「不一样」とする（例：A跟B不一样。❌ A不跟B一样は不自然）。"
        ],
        pedagogical_tips: "否定詞「不」は必ず「一样」の直前に置くルールを徹底します。"
      },
      en: {
        title: "Equal Comparison: A 跟 / 和 B (不) 一样 (+ Adj)",
        concept: "Indicates that Item A and Item B share the same quality or level of an adjective attribute.",
        grammar_notes: [
          "Identity: 这两个手机一样。 (These two phones are the same).",
          "With an adjective: 弟弟跟哥哥一样聪明。 (The younger brother is as smart as the older brother).",
          "Negation: Always place 不 directly before 一样: A 跟 B 不一样.",
          "Never put 不 before 跟/和."
        ],
        pedagogical_tips: "Negation rule: Always 'A 跟 B 不一样', never '*A 不跟 B 一样'."
      }
    },
    fill_template: {
      template_zh: "这台电脑的配置跟那台{comp}。",
      template_vi: "Cấu hình chiếc máy tính này so với chiếc kia {comp}.",
      slots: [
        { name: "comp", type: "comparison", options: ["一样", "不一样", "比", "非常"] }
      ]
    },
    collocations: [
      { pattern: "跟我一样", pinyin: "gēn wǒ yíyàng", meaning_vi: "Giống như tôi", meaning_en: "Same as me" },
      { pattern: "不一样", pinyin: "bù yíyàng", meaning_vi: "Không giống nhau / Khác nhau", meaning_en: "Different / Not the same" }
    ],
    examples: [
      {
        zh: "他和我一样喜欢中国历史。",
        pinyin: "Tā hé wǒ yíyàng xǐhuan zhōngguó lìshǐ.",
        translations: { vi: "Anh ấy cũng thích lịch sử Trung Quốc giống như tôi.", ja: "彼は私と同じように中国の歴史が好きです。", en: "He likes Chinese history just like me." },
        literal_en: "He with me same like China history.",
        scenario: { vi: "Tìm thấy điểm chung về sở thích", ja: "共通の趣味を発見する", en: "Shared interest" },
        tone_tip: { vi: "一样 đọc là yíyàng (yī đổi thành yí trước yàng).", ja: "「一样」は「yíyàng」と変調します。", en: "Tone sandhi: yíyàng." },
        word_order_diff: { vi: "A (他) + 和 + B (我) + 一样 + Vị ngữ (喜欢中国历史).", ja: "A＋和＋B＋一样＋述語の配置です。", en: "A + 和 + B + 一样 + Predicate." },
        note: { vi: "So sánh sự tương đồng về sở thích, hành vi.", ja: "嗜好や行動の一致を表す頻出例文です。", en: "Expresses shared preference." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "和", pinyin: "hé", han_viet: "hòa", ja_kanji: "と", literal_en: "with", block_role: "preposition" },
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", literal_en: "me", block_role: "object" },
          { hanzi: "一样", pinyin: "yíyàng", han_viet: "nhất dạng", ja_kanji: "同じく", literal_en: "the same", block_role: "modifier" },
          { hanzi: "喜欢", pinyin: "xǐhuan", han_viet: "hỉ hoan", ja_kanji: "好む", literal_en: "like", block_role: "verb" },
          { hanzi: "中国历史", pinyin: "zhōngguó lìshǐ", han_viet: "Trung Quốc lịch sử", ja_kanji: "中国の歴史", literal_en: "Chinese history", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_gen_1",
        prompt: { vi: "Sắp xếp: 'Tiếng Trung của anh ấy tốt như người bản xứ.'", ja: "並べ替え：「彼の中国語はネイティブと同じくらい上手です。」", en: "Unscramble: 'His Chinese is as good as a native speaker.'" },
        correct_order: ["他的", "汉语", "跟", "中国人", "一样", "好", "。"],
        tokens: ["中国人", "他的", "一样", "好", "跟", "汉语", "。"],
        explanation: { vi: "A (他的汉语) + 跟 + B (中国人) + 一样 + Adj (好).", ja: "A＋跟＋B＋一样＋形容詞の順です。", en: "A + 跟 + B + 一样 + 好." }
      }
    ],
    fill_blank: [
      {
        id: "fb_gen_1",
        sentence_zh: "我的观点跟你{blank}一样，我觉得这个方法不可行。",
        answer: "不",
        options: ["不", "没", "别", "很"],
        explanation: { vi: "Phủ định so sánh bằng là 不一样.", ja: "同等比較の否定は「不一样」です。", en: "Negation of 一样 is 不一样." }
      }
    ],
    error_correction: [
      {
        id: "ec_gen_1",
        wrong_sentence: "我不跟你一样大。",
        correct_sentence: "我跟你不一样大。",
        error_point: { vi: "Đặt phó từ phủ định 不 trước giới từ 跟.", ja: "否定詞「不」を「跟」の前に置いてしまった語順の誤り。", en: "Placing 不 before 跟 instead of before 一样." },
        explanation: { vi: "Phải đặt 不 trước 一样: 我跟你不一样大.", ja: "「不」は「一样」の直前に移動します：我跟你不一样大。", en: "Move 不 right before 一样: 我跟你不一样大." }
      }
    ],
    quiz: [
      {
        id: "qz_gen_1",
        question: { vi: "Cách nói phủ định nào chuẩn ngữ pháp đối với câu so sánh bằng?", ja: "同等比較構文の正しい否定形はどれですか？", en: "Which negative form is grammatically correct for equal comparisons?" },
        options: [
          { text: { vi: "A 跟 B 不一样 (+ Adj)", ja: "A 跟 B 不一样 (+ Adj)", en: "A 跟 B 不一样 (+ Adj)" }, correct: true },
          { text: { vi: "A 不跟 B 一样 (+ Adj)", ja: "A 不跟 B 一样 (+ Adj)", en: "A 不跟 B 一样 (+ Adj)" }, correct: false }
        ],
        explanation: { vi: "Chữ 不 luôn gắn liền trước 一样 thành cụm 不一样.", ja: "「不一样」が一つのまとまりとして機能します。", en: "不 must adhere directly to 一样." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "A 跟 B 一样 (+ Adj): So sánh bằng (A như B); phủ định là A 跟 B 不一样 (không đặt 不 trước 跟).",
        ja: "A 跟 B 一样 (＋Adj)：同等比較（AはBと同じ）。否定は「A跟B不一样」（不の位置に注意）。",
        en: "A 跟 B 一样 (+ Adj): Equal comparison; negated as A 跟 B 不一样 (never *不跟)."
      },
      remember: [
        { vi: "Vị trí của 不: Luôn nói '跟 B 不一样', cấm nói '不跟 B 一样'.", ja: "否定の「不」は必ず「一样」の直前。", en: "Place 不 directly before 一样." }
      ]
    }
  },

  // 28. hsk3_adverb_cai_vs_jiu
  {
    id: "hsk3_adverb_cai_vs_jiu",
    level: "HSK3",
    level_num: 3,
    category: "conjunction",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["才", "就", "cái", "jiù", "phân biệt tài và tựu", "mới", "liền", "early vs late"],
    formula: "S + Thời gian / Điều kiện + 就 + V (sớm/nhanh/thuận lợi)  VS  S + Thời gian / Điều kiện + 才 + V (muộn/chậm/khó khăn)",
    formula_plain: {
      vi: "就 (đã / liền - cảm thấy sớm, nhanh, dễ)  VS  才 (mới - cảm thấy muộn, chậm, trễ)",
      ja: "就（早く・スムーズに・すでに） VS 才（遅く・時間がかかって・やっと）",
      en: "就 (earlier/faster/easier than expected) VS 才 (later/slower/harder than expected)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Thời gian / Điều kiện", ja: "時間詞／条件節", en: "Time / Condition" }, role: "time", color: "#8B5CF6" },
      { label: { vi: "Phó từ 就 / 才", ja: "副詞 就／才", en: "Adverb 就 / 才" }, role: "adverb", color: "#EC4899" },
      { label: { vi: "Động từ chính", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_time_word_position", "hsk3_zhi_yao_jiu_zhi_you_cai"],
    confusable_with: [
      {
        id: "hsk3_zhi_yao_jiu_zhi_you_cai",
        diff: {
          vi: "就 thường đi kèm với 了 ở cuối câu (八点就来了). 才 TUYỆT ĐỐI KHÔNG đi kèm với 了 ở cuối câu (九点才来, không nói 九点才来了).",
          ja: "「就」の文末にはよく「了」がつきますが、「才」の文には絶対に「了」をつけてはいけません（❌ 九点才来了）。",
          en: "就 frequently takes sentence-final 了; 才 can NEVER take sentence-final 了."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phân biệt phó từ 才 (mới) và 就 (đã/liền)",
        concept: "Dùng để biểu thị thái độ chủ quan của người nói về thời gian hoặc độ khó của hành động: 就 biểu thị sớm, nhanh, thuận lợi; 才 biểu thị muộn, chậm trễ, khó khăn.",
        grammar_notes: [
          "就 (sớm hơn dự kiến): 他早上六点就起床了。 (Anh ấy 6 giờ sáng đã dậy rồi).",
          "才 (muộn hơn dự kiến): 他早上九点才起床。 (9 giờ sáng anh ấy mới dậy).",
          "Quy tắc vàng: Câu có 就 thường có 了 cuối câu; câu có 才 TUYỆT ĐỐI KHÔNG CÓ 了.",
          "Trong câu điều kiện: 只要...就... (chỉ cần... là...) vs 只有...才... (chỉ có... mới...)."
        ],
        pedagogical_tips: "Cảnh báo bẫy thi cử lớn nhất: 'Câu chứa 才 không bao giờ có 了'."
      },
      ja: {
        title: "副詞「才（やっと・遅い）」と「就（早くも・すでに）」の比較",
        concept: "話者の主観的評価を表します。「就」は早い・スムーズ・容易。「才」は遅い・手こずった・やっとのニュアンスです。",
        grammar_notes: [
          "就（早い）：他七点就到了。（彼は7時にもう着いた）。※文末に「了」を伴いやすい。",
          "才（遅い）：他九点才到。（彼は9時になってやっと着いた）。※文末に「了」をつけてはならない！",
          "条件複文での呼応：「只要……就……」VS「只有……才……」。"
        ],
        pedagogical_tips: "「才」の文末に「了」をつけない禁忌ルールを厳守させます。"
      },
      en: {
        title: "Contrast of Adverbs: 才 (cái) vs 就 (jiù)",
        concept: "Conveys the speaker's subjective perception: 就 implies early, fast, or easy; 才 implies late, slow, or arduous.",
        grammar_notes: [
          "就 (early/fast): 我八点就到了。 (I arrived as early as 8:00).",
          "才 (late/slow): 我十点才到。 (I didn't arrive until 10:00).",
          "Golden rule: Sentences with 就 often end with 了; sentences with 才 NEVER end with 了.",
          "Conditionals: 只要...就... (as long as... then...) vs 只有...才... (only if... then...)."
        ],
        pedagogical_tips: "Drill the rule: Never end a 才 sentence with 了."
      }
    },
    fill_template: {
      template_zh: "电影八点开演，他八点半{adv}来。",
      template_vi: "Phim 8 giờ bắt đầu chiếu, 8 rưỡi anh ấy {adv} đến.",
      slots: [
        { name: "adv", type: "adverb", options: ["才", "就", "在", "刚"] }
      ]
    },
    collocations: [
      { pattern: "早就知道了", pinyin: "zǎo jiù zhīdào le", meaning_vi: "Đã biết từ sớm rồi", meaning_en: "Knew it long ago" },
      { pattern: "现在才来", pinyin: "xiànzài cái lái", meaning_vi: "Bây giờ mới đến", meaning_en: "Only arriving now" }
    ],
    examples: [
      {
        zh: "他坐飞机两个小时就到了。",
        pinyin: "Tā zuò fēijī liǎng gè xiǎoshí jiù dào le.",
        translations: { vi: "Anh ấy đi máy bay hai tiếng đồng hồ là đã đến nơi rồi.", ja: "彼は飛行機に乗って2時間でもう到着しました。", en: "He arrived in just two hours by plane." },
        literal_en: "He take airplane two hours soon arrive particle.",
        scenario: { vi: "Cảm thán tốc độ di chuyển nhanh", ja: "移動の素早さを強調", en: "Praising swift transit" },
        tone_tip: { vi: "就 mang thanh 4 (jiù).", ja: "「就」は第4声です。", en: "Pronounced jiù." },
        word_order_diff: { vi: "Phó từ 就 đứng trước động từ 到, cuối câu có 了.", ja: "動詞の前に「就」を置き、文末に完了の「了」を伴います。", en: "就 precedes verb 到 and pairs with final 了." },
        note: { vi: "Biểu đạt ý 'nhanh hơn dự kiến'.", ja: "予想より早く順調だったニュアンスを表します。", en: "Implies faster than expected." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "坐飞机", pinyin: "zuò fēijī", han_viet: "tọa phi cơ", ja_kanji: "飛行機に乗る", literal_en: "take plane", block_role: "manner" },
          { hanzi: "两个小时", pinyin: "liǎng gè xiǎoshí", han_viet: "lưỡng cá tiểu thời", ja_kanji: "2時間", literal_en: "two hours", block_role: "time" },
          { hanzi: "就", pinyin: "jiù", han_viet: "tựu", ja_kanji: "すでに・早くも", literal_en: "already/as early as", block_role: "adverb" },
          { hanzi: "到", pinyin: "dào", han_viet: "đáo", ja_kanji: "着く", literal_en: "arrive", block_role: "verb" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "particle", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_caijiu_1",
        prompt: { vi: "Sắp xếp: 'Hôm qua anh ấy 11 giờ đêm mới về nhà.'", ja: "並べ替え：「彼は昨日夜11時になってやっと帰宅した。」", en: "Unscramble: 'Yesterday he did not come home until 11 PM.'" },
        correct_order: ["他", "昨天", "晚上", "十一点", "才", "回家", "。"],
        tokens: ["回家", "十一点", "才", "晚上", "他", "昨天", "。"],
        explanation: { vi: "S + Thời gian (十一点) + 才 + V (回家) - tuyệt đối không có 了.", ja: "主語＋時間＋才＋動詞の順で、文末に「了」はつけません。", en: "Subject + Time + 才 + Verb (no 了 allowed)." }
      }
    ],
    fill_blank: [
      {
        id: "fb_caijiu_1",
        sentence_zh: "你怎么现在{blank}来？大家都等急了。",
        answer: "才",
        options: ["才", "就", "在", "了"],
        explanation: { vi: "Trách móc đến muộn (bây giờ mới đến) dùng 才.", ja: "到着が遅れたことへの不満・咎めなので「才」が適切です。", en: "Late arrival reproach takes 才." }
      }
    ],
    error_correction: [
      {
        id: "ec_caijiu_1",
        wrong_sentence: "他昨天晚上十二点才睡觉了。",
        correct_sentence: "他昨天晚上十二点才睡觉。",
        error_point: { vi: "Dùng thừa trợ từ 了 ở cuối câu có phó từ 才.", ja: "「才」を用いた文の末尾に「了」をつけてしまった致命的な文法ミス。", en: "Adding 了 to the end of a sentence with 才." },
        explanation: { vi: "Câu dùng 才 biểu thị hành động diễn ra muộn TUYỆT ĐỐI không có 了.", ja: "「才」の文では文末の「了」を必ず削除します。", en: "Remove 了 from any sentence containing 才." }
      }
    ],
    quiz: [
      {
        id: "qz_caijiu_1",
        question: { vi: "Quy tắc ngữ pháp nào đúng khi dùng phó từ 才?", ja: "副詞「才」に関する文法ルールとして正しいものは？", en: "Which grammar rule is true regarding the adverb 才?" },
        options: [
          { text: { vi: "Câu chứa 才 tuyệt đối KHÔNG có trợ từ 了 ở cuối câu", ja: "「才」を含む文末には絶対に完了の「了」を置かない", en: "A sentence with 才 can NEVER have 了 at the end" }, correct: true },
          { text: { vi: "Câu chứa 才 bắt buộc phải có 了 ở cuối câu", ja: "「才」の文末には必ず「了」が必要である", en: "A sentence with 才 always requires 了 at the end" }, correct: false }
        ],
        explanation: { vi: "才 biểu thị sự việc diễn ra muộn/khó khăn, không bao giờ kết hợp với 了 ở cuối câu.", ja: "「才」と文末「了」の共存は文法上厳禁です。", en: "才 and final 了 are mutually exclusive." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "就 (sớm, nhanh, dễ - hay có 了)  VS  才 (muộn, chậm, khó - TUYỆT ĐỐI không có 了).",
        ja: "就（早い・順調・文末了あり） VS 才（遅い・手間取る・文末了厳禁）。",
        en: "就 (early/fast/easy; takes 了) VS 才 (late/slow/hard; NEVER takes 了)."
      },
      remember: [
        { vi: "Quy tắc sắt: Đã có chữ 才 thì xóa ngay chữ 了 ở cuối câu.", ja: "「才」の文末に「了」は絶対につけない！", en: "Never attach 了 to a sentence with 才." }
      ]
    }
  },

  // 29. hsk3_adverb_you_vs_zai
  {
    id: "hsk3_adverb_you_vs_zai",
    level: "HSK3",
    level_num: 3,
    category: "conjunction",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["又", "再", "yòu", "zài", "lặp lại", "phân biệt hựu và tái", "again"],
    formula: "又 + V (+ 了) (ĐÃ lặp lại trong quá khứ)  VS  再 + V (SẼ lặp lại trong tương lai)",
    formula_plain: {
      vi: "又 + Động từ (ĐÃ lại làm gì - quá khứ)  VS  再 + Động từ (SẼ lại làm gì - tương lai)",
      ja: "又 ＋ 動詞（すでにまた起きた・過去） VS 再 ＋ 動詞（これからまた行う・未来）",
      en: "又 + Verb (happened again in past) VS 再 + Verb (will happen again in future)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ lặp lại 又 / 再", ja: "反復副詞 又／再", en: "Repetition Adverb" }, role: "adverb", color: "#EC4899" },
      { label: { vi: "Động từ chính", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_bu_negation"],
    confusable_with: [
      {
        id: "hsk1_bu_negation",
        diff: {
          vi: "又 dùng cho hành động ĐÃ lặp lại (昨天又下雨了 - Hôm qua lại mưa rồi). 再 dùng cho hành động SẼ lặp lại trong tương lai (明天再来 - Ngày mai lại đến nhé).",
          ja: "「又」は過去・完了の反復。「再」は未来・未発生の反復（例：欢迎再来）。",
          en: "又 marks recurrence in the past (already happened); 再 marks recurrence in the future (yet to happen)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phân biệt phó từ lặp lại 又 (yòu - đã lại) và 再 (zài - sẽ lại)",
        concept: "Cả hai đều biểu thị hành động lặp lại ('lại', 'nữa'), nhưng 又 chỉ hành động đã xảy ra trong quá khứ, còn 再 chỉ hành động chưa xảy ra (trong tương lai hoặc câu cầu khiến).",
        grammar_notes: [
          "又 (Quá khứ / Đã xảy ra): 他今天又迟到了。 (Hôm nay anh ấy lại đi muộn rồi - thường mang sắc thái phàn nàn).",
          "再 (Tương lai / Lời khuyên): 请你再说一遍。 (Xin bạn nói lại một lần nữa - hành động nói lại chưa xảy ra).",
          "Cấu trúc 又...又...: Vừa... lại vừa... (Ví dụ: 苹果又大又甜 - Táo vừa to lại vừa ngọt).",
          "Ngoại lệ: 又 cũng có thể dùng cho sự lặp lại có tính quy luật tất yếu trong tương lai (明天又是星期一 - Ngày mai lại là thứ Hai rồi)."
        ],
        pedagogical_tips: "Quy tắc phân biệt đơn giản nhất: Quá khứ dùng 又, Tương lai/Cầu khiến dùng 再."
      },
      ja: {
        title: "反復副詞「又（すでにまた）」と「再（これからまた）」の使い分け",
        concept: "ともに動作の「また」「再度」を表しますが、時制と意味合いが明確に分かれます。",
        grammar_notes: [
          "又（過去・既発生）：他今天又没来。（彼は今日もまた来なかった）。不満やうんざりした感情を含むことが多い。",
          "再（未来・未発生・依頼）：明天再见（明日また会いましょう）、再考虑考虑（もう一度考え直す）。",
          "並列構文：「又……又……」（〜であり、また〜でもある。例：又便宜又好吃）。"
        ],
        pedagogical_tips: "「過去のまた＝又」「未来のまた＝再」という基本の対比軸を定着させます。"
      },
      en: {
        title: "Adverbs of Repetition: 又 (yòu) vs 再 (zài)",
        concept: "Both mean 'again', but 又 indicates that an action has already recurred in the past, whereas 再 indicates that an action will recur in the future.",
        grammar_notes: [
          "又 (past recurrence): 他又生病了。 (He got sick again - often expresses annoyance or resignation).",
          "再 (future / imperative): 明天我们再讨论。 (We will discuss it again tomorrow); 再见 (see you again).",
          "Correlative structure: 又...又... (both... and..., e.g. 又快又好).",
          "Exception: 又 can indicate inevitable natural cycles in the future (明天又是星期一)."
        ],
        pedagogical_tips: "Mnemonic: 又 = past 'again'; 再 = future 'again'."
      }
    },
    fill_template: {
      template_zh: "欢迎您下次{rep}来我们店！",
      template_vi: "Hoan nghênh quý khách lần sau {rep} đến quán chúng tôi!",
      slots: [
        { name: "rep", type: "adverb", options: ["再", "又", "还", "也"] }
      ]
    },
    collocations: [
      { pattern: "再见", pinyin: "zàijiàn", meaning_vi: "Tạm biệt (hẹn gặp lại)", meaning_en: "Goodbye (see you again)" },
      { pattern: "又下雨了", pinyin: "yòu xiàyǔ le", meaning_vi: "Lại mưa rồi", meaning_en: "Raining again" }
    ],
    examples: [
      {
        zh: "他今天怎么又迟到了？",
        pinyin: "Tā jīntiān zěnme yòu chídào le?",
        translations: { vi: "Hôm nay làm sao mà anh ấy lại đi muộn thế?", ja: "彼は今日どうしてまた遅刻したのですか？", en: "Why is he late again today?" },
        literal_en: "He today why again late particle?",
        scenario: { vi: "Thắc mắc về việc bạn liên tục đi trễ", ja: "遅刻の繰り返しに対する苦言", en: "Reproaching habitual tardiness" },
        tone_tip: { vi: "又 mang thanh 4 (yòu).", ja: "「又」は第4声です。", en: "Pronounced yòu." },
        word_order_diff: { vi: "Đã lại (又) + Đi muộn (迟到了).", ja: "過去の再発なので「又」を用います。", en: "Past repetition uses 又." },
        note: { vi: "Hàm ý không hài lòng với việc đi trễ lặp lại.", ja: "不満・呆れの気持ちがこもっています。", en: "Conveys frustration." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "今天", pinyin: "jīntiān", han_viet: "kim thiên", ja_kanji: "今日", literal_en: "today", block_role: "time" },
          { hanzi: "怎么", pinyin: "zěnme", han_viet: "chẩm ma", ja_kanji: "どうして", literal_en: "why", block_role: "question" },
          { hanzi: "又", pinyin: "yòu", han_viet: "hựu", ja_kanji: "また（過去）", literal_en: "again", block_role: "adverb" },
          { hanzi: "迟到", pinyin: "chídào", han_viet: "trì đáo", ja_kanji: "遅刻する", literal_en: "be late", block_role: "verb" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "particle", block_role: "particle" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_youzai_1",
        prompt: { vi: "Sắp xếp: 'Tôi muốn ăn thêm một bát cơm nữa.'", ja: "並べ替え：「もう一杯ご飯を食べたいです。」", en: "Unscramble: 'I want to eat another bowl of rice.'" },
        correct_order: ["我", "想", "再", "吃", "一碗", "米饭", "。"],
        tokens: ["一碗", "吃", "再", "想", "我", "米饭", "。"],
        explanation: { vi: "Hành động sắp tới trong tương lai dùng 再 + V (再吃).", ja: "これから行う未来の追加動作には「再」を用います。", en: "Future repetition takes 再." }
      }
    ],
    fill_blank: [
      {
        id: "fb_youzai_1",
        sentence_zh: "昨天买的那本书，我今天{blank}看了一遍。",
        answer: "又",
        options: ["又", "再", "也", "还"],
        explanation: { vi: "Hành động đã hoàn thành trong hôm nay dùng 又看了一遍.", ja: "すでに本日実行した過去の反復なので「又」が正解です。", en: "Recurrence that already happened takes 又." }
      }
    ],
    error_correction: [
      {
        id: "ec_youzai_1",
        wrong_sentence: "明天我们又见面吧。",
        correct_sentence: "明天我们再见面吧。",
        error_point: { vi: "Dùng 又 cho hành động gặp gỡ diễn ra trong tương lai (明天).", ja: "明日の予定（未来）に対して「又」を使ってしまっている誤り。", en: "Using 又 instead of 再 for a future meeting." },
        explanation: { vi: "Hành động lặp lại trong tương lai bắt buộc phải dùng 再: 明天再见面.", ja: "未来の再会には「再」を用います（明天再见面）。", en: "Future repetition requires 再: 明天再见面." }
      }
    ],
    quiz: [
      {
        id: "qz_youzai_1",
        question: { vi: "Khi muốn bảo bạn 'Hãy thử lại một lần nữa xem', dùng phó từ nào?", ja: "「もう一度試してみて」と相手に促す時の「もう一度」は？", en: "To tell a friend 'Try it again', which adverb should be used?" },
        options: [
          { text: { vi: "再 (zài) - Hành động thử sắp diễn ra", ja: "再（これから行う行為への促し）", en: "再 (zài) - Urging an action yet to occur" }, correct: true },
          { text: { vi: "又 (yòu) - Dùng cho quá khứ", ja: "又（過去の既発生事態）", en: "又 (yòu) - Used for past actions" }, correct: false }
        ],
        explanation: { vi: "Khuyên ai làm lại việc gì đó trong tương lai dùng 再 (再试一次).", ja: "相手に再度のアクションを促すときは「再」です。", en: "Urging a future redo takes 再." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "又 (lại - đã lặp lại trong quá khứ)  VS  再 (lại - sẽ lặp lại trong tương lai / lời khuyên).",
        ja: "又（過去にすでにまた起きた） VS 再（これから未来にまた行う・依頼）。",
        en: "又 (happened again in the past) VS 再 (will happen again in the future)."
      },
      remember: [
        { vi: "Chào tạm biệt là 再见 (hẹn gặp lại trong tương lai, không bao giờ dùng 又见).", ja: "「再见」は未来の再会だから「再」を使う。", en: "再见 uses 再 because the reunion is in the future." }
      ]
    }
  },

  // 30. hsk3_yi_bian_yi_bian
  {
    id: "hsk3_yi_bian_yi_bian",
    level: "HSK3",
    level_num: 3,
    category: "conjunction",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["一边...一边...", "yìbiān...yìbiān...", "vừa... vừa...", "simultaneous actions", "while"],
    formula: "S + 一边 + Động từ 1 (+ Tân ngữ 1)，一边 + Động từ 2 (+ Tân ngữ 2)",
    formula_plain: {
      vi: "Chủ ngữ + 一边 + Hành động 1，一边 + Hành động 2 (Vừa làm việc 1 vừa làm việc 2)",
      ja: "主語 ＋ 一边 ＋ 動作1，一边 ＋ 動作2（〜しながら〜する）",
      en: "Subject + 一边 + Action 1, 一边 + Action 2 (Doing Action 1 while doing Action 2)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "一边", ja: "連詞 一边", en: "一边" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Hành động 1", ja: "動作1", en: "Action 1" }, role: "verb", color: "#10B981" },
      { label: { vi: "一边", ja: "連詞 一边", en: "一边" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Hành động 2", ja: "動作2", en: "Action 2" }, role: "verb", color: "#8B5CF6" }
    ],
    related_ids: ["hsk2_verb_reduplication"],
    confusable_with: [
      {
        id: "hsk2_verb_reduplication",
        diff: {
          vi: "一边...一边... chỉ dùng nối hai ĐỘNG TỪ diễn ra đồng thời. KHÔNG dùng cho hai tính từ (để nối tính từ vừa... vừa..., phải dùng 又...又...).",
          ja: "「一边……一边……」は動作の同時進行専用です。形容詞を並べる場合は「又……又……」を使います（❌ 一边大一边甜 ➔ ⭕ 又大又甜）。",
          en: "一边...一边... connects two concurrent VERBS. To connect two concurrent adjectives, use 又...又... instead."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 一边……一边…… (Vừa…… vừa…… diễn ra đồng thời)",
        concept: "Dùng để diễn tả một người thực hiện song song hai hành động cùng một lúc.",
        grammar_notes: [
          "Hai hành động phải có thể diễn ra đồng thời: 一边听音乐一边看书 (vừa nghe nhạc vừa đọc sách).",
          "Trong khẩu ngữ thường có thể rút gọn thành 边...边...: 边吃边聊 (vừa ăn vừa trò chuyện).",
          "Quy tắc tuyệt đối: Không dùng 一边...一边... cho hai tính từ (sai: 一边聪明一边漂亮 -> Đúng là: 又聪明又漂亮)."
        ],
        pedagogical_tips: "Cực kỳ chú ý: Động từ dùng 一边...一边..., Tính từ dùng 又...又..."
      },
      ja: {
        title: "動作の同時進行「一边……一边……」（〜しながら〜する）",
        concept: "同一の主語が2つの動作を並行して同時に行うことを表す定型構文です。",
        grammar_notes: [
          "口語での簡略化：「边……边……」（例：边走边说＝歩きながら話す）。",
          "重要禁止事項：形容詞を並べるのには使えません（誤：一边漂亮一边温柔 ➔ 正：又漂亮又温柔）。"
        ],
        pedagogical_tips: "「動作＝一边……一边……」「性質・形容詞＝又……又……」の役割分担を徹底させます。"
      },
      en: {
        title: "Simultaneous Actions: 一边……一边……",
        concept: "Indicates that two actions are carried out at the same time by the subject ('while / simultaneously').",
        grammar_notes: [
          "Both actions must be logically compatible for multitasking: 一边吃饭一边看电视 (eating while watching TV).",
          "Casually abbreviated to 边...边...: 边走边聊 (chatting while walking).",
          "Strict rule: Never use 一边...一边... with adjectives; use 又...又... for adjectives."
        ],
        pedagogical_tips: "Strict boundary: 一边... for verbs; 又... for adjectives."
      }
    },
    fill_template: {
      template_zh: "他喜欢一边洗澡，一边{action}。",
      template_vi: "Anh ấy thích vừa tắm, vừa {action}.",
      slots: [
        { name: "action", type: "verb", options: ["唱歌", "听音乐", "看手机", "想事情"] }
      ]
    },
    collocations: [
      { pattern: "边吃边聊", pinyin: "biān chī biān liáo", meaning_vi: "Vừa ăn vừa nói chuyện", meaning_en: "Chat while eating" },
      { pattern: "一边听一边写", pinyin: "yìbiān tīng yìbiān xiě", meaning_vi: "Vừa nghe vừa viết", meaning_en: "Write while listening" }
    ],
    examples: [
      {
        zh: "我们一边喝茶一边聊天吧。",
        pinyin: "Wǒmen yìbiān hē chá yìbiān liáotiān ba.",
        translations: { vi: "Chúng ta vừa uống trà vừa trò chuyện nhé.", ja: "お茶を飲みながらおしゃべりしましょう。", en: "Let's drink tea and chat at the same time." },
        literal_en: "We one-side drink tea one-side chat suggestion.",
        scenario: { vi: "Rủ rê thư giãn cuối tuần", ja: "くつろいだ誘い", en: "Relaxed invitation" },
        tone_tip: { vi: "一边 đọc là yìbiān (yī đổi thành yì trước biān thanh 1).", ja: "「一」は第1声の前で「yì」に変調します。", en: "Tone sandhi: yìbiān." },
        word_order_diff: { vi: "S (我们) + 一边 + V1 (喝茶) + 一边 + V2 (聊天).", ja: "日本語の「お茶を飲みながらおしゃべりする」の「〜ながら」構文。", en: "Matches English 'doing X while doing Y'." },
        note: { vi: "Hai hành động rất hài hòa khi thực hiện cùng lúc.", ja: "リラックスした日常会話の定番です。", en: "Classic pleasant conversation pattern." },
        tokens: [
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "一边", pinyin: "yìbiān", han_viet: "nhất biên", ja_kanji: "〜しながら", literal_en: "while", block_role: "conjunction" },
          { hanzi: "喝茶", pinyin: "hē chá", han_viet: "hát trà", ja_kanji: "お茶を飲む", literal_en: "drink tea", block_role: "verb" },
          { hanzi: "一边", pinyin: "yìbiān", han_viet: "nhất biên", ja_kanji: "〜しながら", literal_en: "while", block_role: "conjunction" },
          { hanzi: "聊天", pinyin: "liáotiān", han_viet: "liêu thiên", ja_kanji: "雑談する", literal_en: "chat", block_role: "verb" },
          { hanzi: "吧", pinyin: "ba", han_viet: "ba", ja_kanji: "〜しよう", literal_en: "particle", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_yibian_1",
        prompt: { vi: "Sắp xếp: 'Cô ấy vừa nghe nhạc vừa làm bài tập.'", ja: "並べ替え：「彼女は音楽を聴きながら宿題をします。」", en: "Unscramble: 'She does homework while listening to music.'" },
        correct_order: ["她", "一边", "听", "音乐", "，", "一边", "做", "作业", "。"],
        tokens: ["做", "一边", "听", "她", "作业", "一边", "音乐", "，", "。"],
        explanation: { vi: "S + 一边 + 听音乐，一边 + 做作业.", ja: "一边＋動作1，一边＋動作2の配列です。", en: "一边 Action 1, 一边 Action 2." }
      }
    ],
    fill_blank: [
      {
        id: "fb_yibian_1",
        sentence_zh: "开车的时候，千万不能{blank}开车一边看手机。",
        answer: "一边",
        options: ["一边", "又", "也", "在"],
        explanation: { vi: "Vừa lái xe vừa xem điện thoại là 2 hành động đồng thời: 一边开车一边看手机.", ja: "「運転しながらスマホを見る」という同時動作なので「一边」です。", en: "Concurrent actions require 一边." }
      }
    ],
    error_correction: [
      {
        id: "ec_yibian_1",
        wrong_sentence: "这个苹果一边大一边甜。",
        correct_sentence: "这个苹果又大又甜。",
        error_point: { vi: "Dùng 一边...一边... để nối hai tính từ 大 và 甜.", ja: "形容詞の並列に「一边……一边……」を使ってしまっている誤文。", en: "Using 一边...一边... to connect adjectives." },
        explanation: { vi: "Nối hai tính từ bắt buộc phải dùng cấu trúc 又...又...: 又大又甜.", ja: "形容詞を並列させる場合は「又……又……」を用います。", en: "Use 又...又... for adjectives: 又大又甜." }
      }
    ],
    quiz: [
      {
        id: "qz_yibian_1",
        question: { vi: "Cấu trúc 一边……一边…… dùng để nối thành phần loại từ nào?", ja: "「一边……一边……」で結ぶことができる品詞は？", en: "What part of speech is connected by 一边……一边……?" },
        options: [
          { text: { vi: "Động từ biểu thị 2 hành động diễn ra song song", ja: "並行して行われる2つの動詞（動作）", en: "Two concurrent action verbs" }, correct: true },
          { text: { vi: "Tính từ biểu thị 2 đặc điểm tính chất", ja: "2つの形容詞（性質・状態）", en: "Two concurrent adjectives" }, correct: false }
        ],
        explanation: { vi: "一边...一边... chỉ áp dụng cho động từ; tính từ dùng 又...又...", ja: "動作専用の構文です。形容詞は「又……又……」を使います。", en: "Reserved exclusively for actions; use 又...又... for adjectives." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 一边 + V1 + 一边 + V2: Vừa làm việc này vừa làm việc kia; TUYỆT ĐỐI không dùng cho tính từ.",
        ja: "主語＋一边＋動詞1，一边＋動詞2：〜しながら〜する（動作の同時進行）。形容詞には使えない。",
        en: "S + 一边 + V1 + 一边 + V2: Doing two actions simultaneously; NEVER use with adjectives."
      },
      remember: [
        { vi: "Nhớ quy tắc: Hành động dùng 一边...一边..., Tính từ dùng 又...又...", ja: "動作は「一边……一边……」、形容詞は「又……又……」。", en: "Actions -> 一边...一边...; Adjectives -> 又...又..." }
      ]
    }
  },

  // 31. hsk3_yi_jiu_sequence
  {
    id: "hsk3_yi_jiu_sequence",
    level: "HSK3",
    level_num: 3,
    category: "conjunction",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["一...就...", "yī...jiù...", "hễ... là...", "vừa... liền...", "as soon as", "whenever"],
    formula: "S + 一 + Động từ 1，就 + Động từ 2",
    formula_plain: {
      vi: "Chủ ngữ + 一 + Hành động 1，就 + Hành động 2 (Hễ/Vừa... là liền...)",
      ja: "主語 ＋ 一 ＋ 動作1，就 ＋ 動作2（〜するとすぐに〜する、〜するやいなや）",
      en: "Subject + 一 + Action 1, 就 + Action 2 (As soon as Action 1 happens, Action 2 follows)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Liên từ 一", ja: "緊接連詞 一", en: "Inceptive 一" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Hành động 1", ja: "動作1（先行）", en: "Action 1" }, role: "verb", color: "#10B981" },
      { label: { vi: "Phó từ 就", ja: "即時副詞 就", en: "Immediate 就" }, role: "adverb", color: "#F59E0B" },
      { label: { vi: "Hành động 2", ja: "動作2（後続）", en: "Action 2" }, role: "verb", color: "#8B5CF6" }
    ],
    related_ids: ["hsk3_adverb_cai_vs_jiu"],
    confusable_with: [
      {
        id: "hsk3_adverb_cai_vs_jiu",
        diff: {
          vi: "一...就... nhấn mạnh 2 hành động nối tiếp nhau ngay tức khắc không có khoảng dừng (vừa về nhà là đi ngủ ngay).",
          ja: "「一……就……」は2つの動作が間髪を入れず連続して起こる緊接関係を表します。",
          en: "一...就... emphasizes immediate sequential succession with zero delay ('as soon as')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 一……就…… (Hễ…… là…… / Vừa…… liền……)",
        concept: "Dùng để biểu thị hai sự việc xảy ra nối tiếp nhau ngay lập tức, hoặc một điều kiện hễ xảy ra thì tất yếu dẫn đến kết quả sau.",
        grammar_notes: [
          "Hành động liên tiếp nhau: 我一下课就回家。 (Tôi vừa tan học là về nhà ngay).",
          "Thói quen / Quy luật: 他一紧张就脸红。 (Anh ấy hễ căng thẳng là mặt đỏ bừng).",
          "Hai chủ ngữ khác nhau: Chủ ngữ 2 đứng trước 就 -> 妈妈一叫我，我就过去 (Mẹ vừa gọi tôi là tôi qua ngay)."
        ],
        pedagogical_tips: "Cấu trúc rất phổ biến trong đề đọc hiểu và viết HSK 3."
      },
      ja: {
        title: "緊接複文「一……就……」（〜するとすぐに、〜するやいなや）",
        concept: "先行の動作1が終わると即座に後続の動作2が起こること、または「〜するといつも決まって〜になる」という条件的一体関係を表します。",
        grammar_notes: [
          "即時連続：「他一到北京就给我打了电话」（彼は北京に着くやすぐ電話をかけてきた）。",
          "習慣・規則性：「我一喝咖啡就睡不着」（私はコーヒーを飲むと決まって眠れなくなる）。",
          "主語が異なる場合：主語2は「就」の直前に置く（例：雨一停，我们就出发）。"
        ],
        pedagogical_tips: "主語が2つある場合の配置（主語1＋一……，主語2＋就……）に注意させます。"
      },
      en: {
        title: "Immediate Succession: 一……就……",
        concept: "Indicates that Action 2 occurs immediately after Action 1, or that whenever Condition 1 happens, Result 2 inevitably follows ('as soon as' / 'whenever').",
        grammar_notes: [
          "Immediate sequence: 我一到家就洗手。 (As soon as I get home, I wash my hands).",
          "Habitual trigger: 他一听这首歌就想哭。 (Whenever he hears this song, he wants to cry).",
          "Different subjects: Place Subject 2 right before 就 (e.g. 老师一来，大家就安静了)."
        ],
        pedagogical_tips: "Point out the word order when two different subjects are involved."
      }
    },
    fill_template: {
      template_zh: "我一回到家，{connective}打开空调。",
      template_vi: "Tôi vừa về đến nhà {connective} bật điều hòa ngay.",
      slots: [
        { name: "connective", type: "adverb", options: ["就", "才", "也", "又"] }
      ]
    },
    collocations: [
      { pattern: "一见钟情", pinyin: "yí jiàn zhōng qíng", meaning_vi: "Yêu từ cái nhìn đầu tiên (nhất kiến chung tình)", meaning_en: "Love at first sight" },
      { pattern: "一听就懂", pinyin: "yì tīng jiù dǒng", meaning_vi: "Vừa nghe là hiểu ngay", meaning_en: "Understand immediately upon hearing" }
    ],
    examples: [
      {
        zh: "他一躺下就睡着了。",
        pinyin: "Tā yì tǎng xia jiù shuìzháo le.",
        translations: { vi: "Anh ấy vừa nằm xuống là ngủ thiếp đi ngay.", ja: "彼は横になるやいなや、すぐに眠ってしまいました。", en: "He fell asleep as soon as he laid down." },
        literal_en: "He once lie-down soon sleep-result particle.",
        scenario: { vi: "Kể về người ngủ rất nhanh vì mệt", ja: "疲れて即座に眠りに落ちる様子", en: "Falling asleep instantly" },
        tone_tip: { vi: "睡着 đọc là shuìzháo (chữ 着 mang âm zháo).", ja: "「睡着」の「着」は「zháo」と読みます。", en: "着 is pronounced zháo here." },
        word_order_diff: { vi: "S (他) + 一 + Hành động 1 (躺下) + 就 + Hành động 2 (睡着了).", ja: "一＋動作1＋就＋動作2の典型的な緊接文。", en: "一 Action 1 + 就 Action 2." },
        note: { vi: "Diễn tả khoảng cách thời gian giữa 2 hành động bằng 0.", ja: "2つの動作の時間的間隔の極小さを描写します。", en: "Highlights instantaneous transition." },
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "他", literal_en: "he", block_role: "subject" },
          { hanzi: "一", pinyin: "yì", han_viet: "nhất", ja_kanji: "〜するとすぐ", literal_en: "as soon as", block_role: "conjunction" },
          { hanzi: "躺下", pinyin: "tǎng xia", han_viet: "thảng hạ", ja_kanji: "横になる", literal_en: "lie down", block_role: "verb" },
          { hanzi: "就", pinyin: "jiù", han_viet: "tựu", ja_kanji: "すぐに", literal_en: "then", block_role: "adverb" },
          { hanzi: "睡着", pinyin: "shuìzháo", han_viet: "thụy trước", ja_kanji: "寝付く", literal_en: "fall asleep", block_role: "verb" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", literal_en: "particle", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_yijiu_1",
        prompt: { vi: "Sắp xếp: 'Mưa vừa tạnh là chúng tôi xuất phát.'", ja: "並べ替え：「雨が止むとすぐに、私たちは出発した。」", en: "Unscramble: 'As soon as the rain stopped, we set off.'" },
        correct_order: ["雨", "一", "停", "，", "我们", "就", "出发", "。"],
        tokens: ["出发", "停", "就", "雨", "我们", "一", "，", "。"],
        explanation: { vi: "Hai chủ ngữ: 雨一停 (S1)，我们 (S2) 就出发.", ja: "2主語構文：主語1＋一＋V1，主語2＋就＋V2。", en: "Subject 1 + 一 + V1, Subject 2 + 就 + V2." }
      }
    ],
    fill_blank: [
      {
        id: "fb_yijiu_1",
        sentence_zh: "他{blank}看见好吃的，就走不动路了。",
        answer: "一",
        options: ["一", "又", "也", "在"],
        explanation: { vi: "Cặp liên từ đi đôi với 就 là 一...就...", ja: "「就」と呼応して「〜するとすぐ」を作るのは「一」です。", en: "Pairs with 就 in 一...就..." }
      }
    ],
    error_correction: [
      {
        id: "ec_yijiu_1",
        wrong_sentence: "他一到家，就看电视才吃饭。",
        correct_sentence: "他一到家就看电视。",
        error_point: { vi: "Trộn lẫn lộn xộn các phó từ 一...就 và 才 trong cùng câu.", ja: "「一……就」の構文に「才」などを混入させてしまった混乱文。", en: "Muddling 一...就 with 才." },
        explanation: { vi: "Duy trì cặp liên kết gọn gàng: 他一到家就看电视.", ja: "すっきりと「他一到家就看电视」とします。", en: "Keep the clean pattern: 他一到家就看电视." }
      }
    ],
    quiz: [
      {
        id: "qz_yijiu_1",
        question: { vi: "Khi câu 一……就…… có 2 chủ ngữ khác nhau, vị trí của chủ ngữ thứ 2 ở đâu?", ja: "「一……就……」で2つの主語が異なる場合、第2主語はどこに置く？", en: "When the two clauses have different subjects, where does Subject 2 go?" },
        options: [
          { text: { vi: "Đứng ngay trước phó từ 就 (Ví dụ: 雨一停，我们 (S2) 就出发)", ja: "副詞「就」の直前に置く（例：雨一停，我们［S2］就出发）", en: "Right before the adverb 就 (e.g. 雨一停，我们 就出发)" }, correct: true },
          { text: { vi: "Đứng ở cuối câu", ja: "文末に置く", en: "At the end of the sentence" }, correct: false }
        ],
        explanation: { vi: "Chủ ngữ 2 bắt buộc đứng trước phó từ 就.", ja: "第2主語は「就」の前に配置するのが正しい語順です。", en: "Subject 2 must precede 就." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 一 + V1，就 + V2: Hễ/Vừa... là liền...; 2 chủ ngữ thì chủ ngữ 2 đứng trước 就.",
        ja: "主語＋一＋動詞1，就＋動詞2：〜するとすぐに〜する。主語が異なる時は主語2を「就」の前に置く。",
        en: "S + 一 + V1, 就 + V2: As soon as V1, then V2; Subject 2 precedes 就."
      },
      remember: [
        { vi: "Biểu đạt tính tức thời, không có khoảng cách trễ giữa hai sự việc.", ja: "動作の即時的連続を表す最重要構文。", en: "Stresses immediate zero-delay succession." }
      ]
    }
  },

  // 32. hsk3_bu_dan_er_qie
  {
    id: "hsk3_bu_dan_er_qie",
    level: "HSK3",
    level_num: 3,
    category: "conjunction",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["不但...而且...", "不仅...而且...", "búdàn...érqiě...", "bùjǐn", "không những... mà còn...", "progressive conjunction", "not only but also"],
    formula: "不但 / 不仅 + Vế 1，而且 / 还 / 也 + Vế 2",
    formula_plain: {
      vi: "不但 (Không những) + Vế 1，而且 (mà còn) + Vế 2",
      ja: "不但／不仅（〜ばかりでなく）……，而且／还／也（その上〜も）……",
      en: "不但 / 不仅 (Not only) + Clause 1, 而且 / 还 / 也 (but also) + Clause 2"
    },
    structure_blocks: [
      { label: { vi: "不但 / 不仅", ja: "累加連詞 不但", en: "Not Only (不但)" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Vế nền tảng", ja: "基本節", en: "Base Clause" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "而且 / 还", ja: "累加連詞 而且", en: "But Also (而且)" }, role: "conjunction", color: "#F59E0B" },
      { label: { vi: "Vế tăng tiến", ja: "進展節", en: "Progressive Clause" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk2_suiran_danshi"],
    confusable_with: [
      {
        id: "hsk2_suiran_danshi",
        diff: {
          vi: "虽然...但是... là quan hệ đối lập nghịch lý (tuy nhưng). 不但...而且... là quan hệ cùng chiều tăng tiến (không những... mà còn nâng lên một bậc).",
          ja: "虽然……但是……は逆接。不但……而且……は順接の累加・進展（さらに上乗せ）。",
          en: "虽然...但是... is contrastive; 不但...而且... is additive/progressive."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu ghép tăng tiến 不但……而且…… (Không những…… mà còn……)",
        concept: "Dùng để biểu thị vế sau bổ sung thêm một ý nghĩa nâng cao hoặc mở rộng hơn so với phạm vi của vế trước.",
        grammar_notes: [
          "Cùng một chủ ngữ: Chủ ngữ đứng TRƯỚC 不但 (S + 不但... 而且...) -> 他不但会说汉语，而且说得很好.",
          "Hai chủ ngữ khác nhau: 不但 đứng TRƯỚC chủ ngữ 1 (不但 S1... 而且 S2...) -> 不但我喜欢，而且他也喜欢.",
          "Các biến thể: 不仅... 而且..., 不但... 还..., 不但... 也..."
        ],
        pedagogical_tips: "Quy tắc vị trí chủ ngữ (cùng chủ ngữ thì S đứng đầu, khác chủ ngữ thì 不但 đứng đầu) là kiến thức thi HSK trọng tâm."
      },
      ja: {
        title: "累加複文「不但……而且……」（〜ばかりでなく、その上〜も）",
        concept: "前節の内容に留まらず、後節でさらに程度が進んだり範囲が広がったりする進展関係を表します。",
        grammar_notes: [
          "同一主語の場合：主語は「不但」の前に置く（S＋不但……而且……）。例：他不但会日语，而且还会韩语。",
          "異なる主語の場合：「不但」を文頭に置く（不但＋主語1……，而且＋主語2……）。例：不但老师去了，而且学生也去了。",
          "バリエーション：「不仅……而且……」「不但……还……」。"
        ],
        pedagogical_tips: "「同一主語ならSが前、異なる主語なら不但が文頭」という配置ルールを徹底させます。"
      },
      en: {
        title: "Progressive Complex Sentence: 不但……而且……",
        concept: "Expresses progressive addition: not only does the first clause hold true, but the second clause steps further beyond it ('not only... but also...').",
        grammar_notes: [
          "Same subject: Subject goes BEFORE 不但 (S + 不但... 而且...).",
          "Different subjects: 不但 goes BEFORE Subject 1 (不但 S1..., 而且 S2...).",
          "Variants: 不仅...而且..., 不但...还..., 不但...也..."
        ],
        pedagogical_tips: "Emphasize the position of subjects: before 不但 if shared, after 不但 if different."
      }
    },
    fill_template: {
      template_zh: "他不但聪明，{adv}非常勤奋。",
      template_vi: "Anh ấy không những thông minh, {adv} rất chăm chỉ.",
      slots: [
        { name: "adv", type: "conjunction", options: ["而且", "但是", "所以", "因为"] }
      ]
    },
    collocations: [
      { pattern: "不但...而且...", pinyin: "búdàn... érqiě...", meaning_vi: "Không những... mà còn...", meaning_en: "Not only... but also..." },
      { pattern: "不仅如此", pinyin: "bùjǐn rúcǐ", meaning_vi: "Không chỉ như vậy", meaning_en: "Not only that" }
    ],
    examples: [
      {
        zh: "这家饭馆的菜不但好吃，而且很便宜。",
        pinyin: "Zhè jiā fànguǎn de cài búdàn hǎochī, érqiě hěn piányi.",
        translations: { vi: "Món ăn của quán này không những ngon, mà còn rất rẻ.", ja: "このレストランの料理は美味しいばかりでなく、とても安いです。", en: "The food at this restaurant is not only delicious, but also very cheap." },
        literal_en: "This restaurant's dishes not only delicious, but also very cheap.",
        scenario: { vi: "Khen ngợi quán ăn ngon bổ rẻ", ja: "コスパ抜群の店を推薦する", en: "Recommending an eatery" },
        tone_tip: { vi: "不但 đọc là búdàn (bù đổi thành bú trước dàn).", ja: "「不」は第4声の前で「bú」に変調します。", en: "Tone sandhi: búdàn." },
        word_order_diff: { vi: "Chủ ngữ (这家饭馆的菜) + 不但 + Vế 1 (好吃) + 而且 + Vế 2 (很便宜).", ja: "同一主語（料理）なので主語が最前部に置かれます。", en: "Shared subject precedes 不但." },
        note: { vi: "Mẫu câu tăng tiến tích cực kinh điển.", ja: "長所の重ね合わせ表現の定番です。", en: "Classic positive progressive remark." },
        tokens: [
          { hanzi: "这家饭馆的菜", pinyin: "zhè jiā fànguǎn de cài", han_viet: "giá gia phạn quán đích thái", ja_kanji: "この店の料理", literal_en: "this restaurant's food", block_role: "subject" },
          { hanzi: "不但", pinyin: "búdàn", han_viet: "bất đản", ja_kanji: "〜だけでなく", literal_en: "not only", block_role: "conjunction" },
          { hanzi: "好吃", pinyin: "hǎochī", han_viet: "hảo cật", ja_kanji: "美味しい", literal_en: "delicious", block_role: "predicate" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "而且", pinyin: "érqiě", han_viet: "nhi thả", ja_kanji: "その上", literal_en: "but also", block_role: "conjunction" },
          { hanzi: "很", pinyin: "hěn", han_viet: "hẩn", ja_kanji: "とても", literal_en: "very", block_role: "adverb" },
          { hanzi: "便宜", pinyin: "piányi", han_viet: "tiện nghi", ja_kanji: "安い", literal_en: "cheap", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_budan_1",
        prompt: { vi: "Sắp xếp: 'Không những tôi đi, mà anh ấy cũng đi.'", ja: "並べ替え：「私が行くだけでなく、彼も行きます。」", en: "Unscramble: 'Not only am I going, but he is going too.'" },
        correct_order: ["不但", "我", "去", "，", "而且", "他", "也", "去", "。"],
        tokens: ["而且", "他", "去", "我", "不但", "也", "去", "，", "。"],
        explanation: { vi: "Hai chủ ngữ khác nhau (我 và 他), 不但 phải đứng đầu câu.", ja: "異なる主語（我・他）なので「不但」を文頭に置きます。", en: "Different subjects: 不但 must precede Subject 1." }
      }
    ],
    fill_blank: [
      {
        id: "fb_budan_1",
        sentence_zh: "桂林的天气很好，不仅风景优美，{blank}人也很热情。",
        answer: "而且",
        options: ["而且", "但是", "因为", "所以"],
        explanation: { vi: "Đi đôi với 不仅 ở vế sau là liên từ 而且.", ja: "「不仅」と呼応して累加を作るのは「而且」です。", en: "Pairs with 不仅 in the first clause." }
      }
    ],
    error_correction: [
      {
        id: "ec_budan_1",
        wrong_sentence: "我不但喜欢踢足球，而且他也喜欢踢足球。",
        correct_sentence: "不但我喜欢踢足球，而且他也喜欢踢足球。",
        error_point: { vi: "Hai vế có hai chủ ngữ khác nhau (我 và 他) nhưng lại đặt chủ ngữ 我 ra trước 不但.", ja: "主語が異なるのに「不但」の前に主語を置いてしまった誤文。", en: "Placing 我 before 不但 when the two clauses have different subjects." },
        explanation: { vi: "Khi 2 chủ ngữ khác nhau, 不但 bắt buộc phải đứng trước chủ ngữ 1.", ja: "主語が異なる場合は「不但」を文頭に配置します。", en: "Move 不但 to the beginning when subjects differ." }
      }
    ],
    quiz: [
      {
        id: "qz_budan_1",
        question: { vi: "Khi hai vế câu có CÙNG MỘT CHỦ NGỮ, chủ ngữ nằm ở đâu?", ja: "2つの節が同一主語のとき、主語はどこに置くのが適切ですか？", en: "When both clauses share the SAME subject, where should the subject be placed?" },
        options: [
          { text: { vi: "Đứng trước liên từ 不但 (Ví dụ: 他不但... 而且...)", ja: "「不但」の前に置く（例：他不但……而且……）", en: "Before 不但 (e.g. 他不但... 而且...)" }, correct: true },
          { text: { vi: "Đứng sau liên từ 不但 (Ví dụ: 不但他... 而且...)", ja: "「不但」の後ろに置く", en: "After 不但" }, correct: false }
        ],
        explanation: { vi: "Cùng một chủ ngữ thì chủ ngữ bao quát cả câu nên đứng trước 不但.", ja: "同一主語は文頭（不但の前）に立てるのが文法規範です。", en: "Shared subject precedes 不但." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "不但...而且...: Tăng tiến (Không những... mà còn...); cùng chủ ngữ: S + 不但; khác chủ ngữ: 不但 + S1.",
        ja: "不但……而且……：累加・進展（〜ばかりでなく〜も）。同一主語ならS＋不但、異主語なら不但＋S1。",
        en: "不但...而且...: Progressive addition; same subject -> S + 不但; different subjects -> 不但 + S1."
      },
      remember: [
        { vi: "Quy tắc đề thi: Kiểm tra xem 2 vế cùng chủ ngữ hay khác chủ ngữ để đặt vị trí 不但.", ja: "主語が同じか違うかで「不但」の位置が決まる。", en: "Subject identity determines the placement of 不但." }
      ]
    }
  }
];

module.exports = batch3;

