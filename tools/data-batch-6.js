/**
 * tools/data-batch-6.js
 * 
 * 6 Essential HSK Grammar points (HSK4 45-47, HSK5 48-50)
 * Completing the 50 new grammar lessons expansion!
 * Full pedagogical schema adhering to types/grammar.ts
 */

const batch6 = [
  // 45. hsk4_preposition_dui_yu_guan_yu
  {
    id: "hsk4_preposition_dui_yu_guan_yu",
    level: "HSK4",
    level_num: 4,
    category: "preposition",
    difficulty: 4,
    frequency: 5,
    register: "formal",
    keywords: ["对于", "关于", "duìyú", "guānyú", "phân biệt đối vu và quan vu", "đối với", "về việc", "concerning", "regarding"],
    formula: "关于 + Đối tượng (Phạm vi/Chủ đề) -> thường đứng ĐẦU CÂU  VS  对于 + Đối tượng (Mục tiêu/Thái độ) -> trước hoặc sau Chủ ngữ",
    formula_plain: {
      vi: "关于 (Về / Liên quan đến vấn đề gì)  VS  对于 (Đối với / Hướng đến đối tượng nào)",
      ja: "关于（〜に関して・テーマの提示） VS 对于（〜に対して・対象や態度）",
      en: "关于 (About / Regarding a topic) VS 对于 (Toward / Concerning an object or target)"
    },
    structure_blocks: [
      { label: { vi: "Giới từ 关于 / 对于", ja: "介詞 关于／对于", en: "Preposition 关于/对于" }, role: "preposition", color: "#EC4899" },
      { label: { vi: "Chủ đề / Đối tượng", ja: "対象名詞・テーマ", en: "Topic / Target" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Mệnh đề bình luận / Vị ngữ", ja: "主節・評価述語", en: "Comment / Predicate" }, role: "predicate", color: "#10B981" }
    ],
    related_ids: ["hsk2_preposition_cong_dao_li_dui"],
    confusable_with: [
      {
        id: "hsk2_preposition_cong_dao_li_dui",
        diff: {
          vi: "关于 chỉ phạm vi, chủ đề nội dung (sách VỀ lịch sử = 关于历史的书). 对于 chỉ đối tượng hướng đến hoặc thái độ đánh giá (ĐỐI VỚI vấn đề này = 对于这个问题). Vị trí: 关于 thường đứng ĐẦU CÂU; 对于 có thể đứng sau chủ ngữ.",
          ja: "「关于」はテーマや関連範囲を表し、文頭に置くのが基本。「对于」は働きかけの対象や態度を表し、主語の後ろにも置けます。",
          en: "关于 introduces a broader topic ('about / on the matter of') and prefers sentence-initial placement; 对于 targets an entity ('toward / regarding') and can follow the subject."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phân biệt giới từ: 对于 (Đối với) và 关于 (Về / Liên quan đến)",
        concept: "Dùng để giới thiệu đối tượng hoặc chủ đề cần bàn luận, nhưng có phạm vi và vị trí cú pháp khác nhau.",
        grammar_notes: [
          "关于 (Về vấn đề gì): Thường đứng đầu câu hoặc làm định ngữ cho danh từ (关于中国经济的报告 - Báo cáo VỀ kinh tế Trung Quốc).",
          "对于 (Đối với ai/cái gì): Nhấn mạnh thái độ, phản ứng hoặc tác động (对于这件事，大家都很关心 - Đối với việc này, mọi người đều rất quan tâm).",
          "Vị trí cú pháp: Cụm 关于... BẮT BUỘC đứng trước chủ ngữ; cụm 对于... có thể đứng trước hoặc sau chủ ngữ (Ví dụ: 我们对于... hoặc 对于...我们).",
          "Không nói: *我们关于这个问题..."
        ],
        pedagogical_tips: "Cực kỳ chú ý vị trí: 'Cụm 关于 không bao giờ đứng sau chủ ngữ'."
      },
      ja: {
        title: "介詞「关于（〜について）」と「对于（〜に対して）」の使い分け",
        concept: "話題や対象を取り上げる重要介詞。テーマの範囲を示す「关于」と、関心・態度の対象を示す「对于」を区別します。",
        grammar_notes: [
          "关于（テーマ・関連性）：文頭に置くか、名詞を修飾する連体修飾語として多用（例：关于环保的书）。※主語の後ろには置けない！",
          "对于（対象・働きかけ）：対象に対する意見・態度（例：对于这个提议，我完全赞成）。主語の前でも後ろでも可。",
          "重要構文ルール：❌ 我们关于…… ➔ ⭕ 关于……，我们……。"
        ],
        pedagogical_tips: "「关于は主語の後ろに置けない」という語順ルールを厳格に指導します。"
      },
      en: {
        title: "Prepositions: 关于 (guānyú) vs 对于 (duìyú)",
        concept: "Both introduce a focal matter, but 关于 specifies the broad topical domain ('about/on'), while 对于 pinpoints the direct target of an attitude or assessment ('toward/regarding').",
        grammar_notes: [
          "关于: Must be placed at the very start of the clause (before the subject) or act as a noun modifier (关于环境的书). Never place 关于 after the subject (*我们关于 is wrong).",
          "对于: Marks attitude, reaction, or stance; can appear either before or after the subject (对于这件事，我们... or 我们对于这件事...).",
          "Topic vs Target distinction."
        ],
        pedagogical_tips: "Key syntax rule: 关于 cannot follow the subject."
      }
    },
    fill_template: {
      template_zh: "{prep}这部电影，网友们展开了热烈的讨论。",
      template_vi: "{prep} bộ phim này, cư dân mạng đã mở ra cuộc thảo luận sôi nổi.",
      slots: [
        { name: "prep", type: "preposition", options: ["关于", "对于", "为了", "因为"] }
      ]
    },
    collocations: [
      { pattern: "关于这个问题", pinyin: "guānyú zhè ge wèntí", meaning_vi: "Về vấn đề này", meaning_en: "Regarding this issue" },
      { pattern: "对于我来说", pinyin: "duìyú wǒ lái shuō", meaning_vi: "Đối với tôi mà nói", meaning_en: "As far as I'm concerned / For me" }
    ],
    examples: [
      {
        zh: "对于这个问题，我们还需要进一步研究。",
        pinyin: "Duìyú zhè ge wèntí, wǒmen hái xūyào jìnyíbù yánjiū.",
        translations: { vi: "Đối với vấn đề này, chúng tôi còn cần phải nghiên cứu thêm một bước nữa.", ja: "この問題に対して、私たちはさらなる研究が必要です。", en: "Regarding this issue, we still need further research." },
        literal_en: "Towards this question, we still need step-further research.",
        scenario: { vi: "Phát biểu trong cuộc họp chuyên môn", ja: "学術会議・業務報告での発言", en: "Professional meeting response" },
        tone_tip: { vi: "对于 đọc là duìyú (thanh 4 + thanh 2).", ja: "「对于」は第4声＋第2声です。", en: "duì (4th) + yú (2nd)." },
        word_order_diff: { vi: "Cụm 对于这个问题 đứng đầu câu làm trạng ngữ chỉ đối tượng.", ja: "「对于＋対象」が文頭の状語として置かれます。", en: "Prepositional phrase heads the sentence." },
        note: { vi: "Ngôn ngữ văn bản, học thuật chuẩn mực.", ja: "公的文書やフォーマルな場で頻出します。", en: "Standard formal and academic register." },
        tokens: [
          { hanzi: "对于", pinyin: "duìyú", han_viet: "đối vu", ja_kanji: "〜に対して", literal_en: "regarding", block_role: "preposition" },
          { hanzi: "这个问题", pinyin: "zhè ge wèntí", han_viet: "giá cá vấn đề", ja_kanji: "この問題", literal_en: "this question", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "还", pinyin: "hái", han_viet: "hoàn", ja_kanji: "まだ", literal_en: "still", block_role: "adverb" },
          { hanzi: "需要", pinyin: "xūyào", han_viet: "nhu yếu", ja_kanji: "必要とする", literal_en: "need", block_role: "verb" },
          { hanzi: "进一步", pinyin: "jìnyíbù", han_viet: "tiến nhất bộ", ja_kanji: "さらに一歩", literal_en: "further", block_role: "adverb" },
          { hanzi: "研究", pinyin: "yánjiū", han_viet: "nghiên cứu", ja_kanji: "研究する", literal_en: "research", block_role: "verb" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_duiyu_1",
        prompt: { vi: "Sắp xếp: 'Đây là một quyển sách viết về lịch sử Trung Quốc.'", ja: "並べ替え：「これは中国の歴史について書かれた本です。」", en: "Unscramble: 'This is a book written about Chinese history.'" },
        correct_order: ["这", "是", "一本", "关于", "中国", "历史", "的", "书", "。"],
        tokens: ["关于", "历史", "是", "中国", "这", "书", "一本", "的", "。"],
        explanation: { vi: "关于中国历史 + 的 + 书: Làm định ngữ cho danh từ 书.", ja: "关于＋名詞＋的＋中心名詞の連体修飾語です。", en: "关于 + Topic + 的 + Noun." }
      }
    ],
    fill_blank: [
      {
        id: "fb_duiyu_1",
        sentence_zh: "{prep}工作，他一向认真负责，从不马虎。",
        answer: "对于",
        options: ["对于", "关于", "从", "由"],
        explanation: { vi: "Chỉ thái độ đối với công việc (thái độ hướng tới đối tượng) dùng 对于.", ja: "仕事に対する姿勢・態度を述べるので「对于」が最適です。", en: "Attitude toward work takes 对于." }
      }
    ],
    error_correction: [
      {
        id: "ec_duiyu_1",
        wrong_sentence: "我们关于这个新政策很赞同。",
        correct_sentence: "关于这个新政策，我们很赞同。",
        error_point: { vi: "Đặt cụm 关于 sau chủ ngữ 我们.", ja: "「关于」句を主語の後ろに挟んでしまった誤り。", en: "Placing 关于 phrase after the subject." },
        explanation: { vi: "Cụm 关于 bắt buộc phải đưa lên trước chủ ngữ: 关于这个新政策，我们...", ja: "「关于……」は主語の前に移動します。", en: "Move 关于 phrase before the subject." }
      }
    ],
    quiz: [
      {
        id: "qz_duiyu_1",
        question: { vi: "Khi muốn giới thiệu một đề tài làm định ngữ cho danh từ (ví dụ: 'Quyển sách về môi trường'), dùng từ nào?", ja: "名詞を修飾して「〜についての本・レポート」と言う場合、どちらの介詞が適切？", en: "To modify a noun as in 'a book about the environment', which preposition is used?" },
        options: [
          { text: { vi: "关于 (Ví dụ: 关于环保的书)", ja: "关于（例：关于环保的书）", en: "关于 (e.g. 关于环保的书)" }, correct: true },
          { text: { vi: "对于", ja: "对于", en: "对于" }, correct: false }
        ],
        explanation: { vi: "Chỉ đề tài nội dung sách vở, phim ảnh, báo cáo bắt buộc dùng 关于.", ja: "テーマ・内容を表す連体修飾語には「关于」を用います。", en: "Topical noun modification requires 关于." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "关于 (về chủ đề gì - chỉ đứng đầu câu hoặc định ngữ)  VS  对于 (đối với đối tượng/thái độ gì).",
        ja: "关于（テーマ・名詞修飾・文頭限定） VS 对于（対象・態度・主語後も可）。",
        en: "关于 (topical 'about'; sentence-head only or noun modifier) VS 对于 ('toward/regarding')."
      },
      remember: [
        { vi: "Quy tắc ngữ pháp vàng: Tuyệt đối không đặt 关于 sau chủ ngữ (*S 关于...).", ja: "「主語＋关于……」の語順は絶対に不可！", en: "Never place 关于 after the subject (*S + 关于... is forbidden)." }
      ]
    }
  },

  // 46. hsk4_jian_zhi_adverb
  {
    id: "hsk4_jian_zhi_adverb",
    level: "HSK4",
    level_num: 4,
    category: "sentence_pattern",
    difficulty: 4,
    frequency: 5,
    register: "spoken",
    keywords: ["简直", "jiǎnzhí", "phó từ ngữ khí", "quả thực là", "hoàn toàn", "simply", "virtually"],
    formula: "S + 简直 + (像 / 是 / 太 / 不敢相信) + Vị ngữ",
    formula_plain: {
      vi: "Chủ ngữ + 简直 + Vị ngữ (Quả thực là / Gần như là / Đúng là - cường điệu hóa)",
      ja: "主語 ＋ 简直 ＋（像／太／述語）（まるで〜だ、まったくもって〜だ）",
      en: "Subject + 简直 + Predicate (Simply / Literally / Practically / Virtually)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ ngữ khí 简直", ja: "語気副詞 简直", en: "Mood Adverb 简直" }, role: "adverb", color: "#EC4899" },
      { label: { vi: "Vị ngữ mang tính cường điệu", ja: "誇張述語句", en: "Exaggerated Predicate" }, role: "predicate", color: "#10B981" }
    ],
    related_ids: ["hsk1_tai_le_exclamation"],
    confusable_with: [
      {
        id: "hsk1_tai_le_exclamation",
        diff: {
          vi: "简直 mang tính chất 'cường điệu hóa, phóng đại' sự thật để bộc lộ cảm xúc kinh ngạc, khó tin (Anh ấy nói tiếng Trung trôi chảy cứ như người bản xứ = 简直像中国人一样).",
          ja: "「简直」は事態を強調・誇張して「まるで〜と言っても過言ではない」という驚嘆のニュアンスを含みます。",
          en: "简直 conveys dramatic exaggeration, meaning 'practically / virtually / simply unbelievable'."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phó từ ngữ khí cường điệu: 简直 (jiǎnzhí - quả thực là, đúng là)",
        concept: "Dùng để nhấn mạnh mức độ cao đến mức khó tin, mang tính phóng đại tu từ để biểu lộ sự ngạc nhiên, thán phục hoặc bức xúc tột cùng.",
        grammar_notes: [
          "Thường kết hợp với 像...一样 (như là): 简直像做梦一样 (Quả thực cứ như một giấc mơ).",
          "Thường đi với 太...了: 简直太棒了！ (Đúng là quá tuyệt vời!).",
          "Thường đi với biểu thức không thể tin nổi: 我简直不敢相信自己的耳朵 (Tôi quả thực không dám tin vào tai mình nữa).",
          "Vị trí: Đứng trước động từ, tính từ hoặc trợ động từ."
        ],
        pedagogical_tips: "Nhấn mạnh vai trò nâng cao độ biểu cảm trong văn phong khẩu ngữ sinh động."
      },
      ja: {
        title: "誇張語気副詞「简直（まるで・まったくもって）」",
        concept: "事態の度合いが極端であることを誇張し、「まるで〜そのものだ」「信じられないほど〜だ」と感嘆・強調する副詞です。",
        grammar_notes: [
          "「像……一样」との呼応：「简直像真的一样」（まるで本物のようだ）。",
          "強い感嘆：「简直太不可思议了！」（まったくもって信じられない！）。",
          "信じ難い心情：「我简直不敢相信」（私にはとても信じられない）。"
        ],
        pedagogical_tips: "日常会話や物語表現で表現力を一気に高めるエモーショナルな副詞として指導します。"
      },
      en: {
        title: "Emphatic Mood Adverb: 简直 (jiǎnzhí)",
        concept: "Used to hyperbolize or exaggerate a situation, expressing astonishment, sheer disbelief, or intense admiration ('simply / literally / practically').",
        grammar_notes: [
          "Commonly pairs with 像...一样: 简直像电影一样 (Practically like a movie).",
          "Commonly pairs with 太...了: 简直太神奇了! (Simply too magical!).",
          "Expressing shock: 我简直无法理解 (I literally cannot understand).",
          "Placed directly before verbs, adjectives, or modal phrases."
        ],
        pedagogical_tips: "Highlights hyperbolic emotional intensity in conversational Chinese."
      }
    },
    fill_template: {
      template_zh: "听到这个振奋人心的消息，我{adverb}高兴得要跳起来。",
      template_vi: "Nghe được tin tức phấn khởi này, tôi {adverb} vui đến mức muốn nhảy cẫng lên.",
      slots: [
        { name: "adverb", type: "adverb", options: ["简直", "关于", "终于", "既然"] }
      ]
    },
    collocations: [
      { pattern: "简直不敢相信", pinyin: "jiǎnzhí bùgǎn xiāngxìn", meaning_vi: "Quả thực không dám tin", meaning_en: "Simply cannot believe" },
      { pattern: "简直像做梦一样", pinyin: "jiǎnzhí xiàng zuòmèng yíyàng", meaning_vi: "Quả thực như một giấc mơ", meaning_en: "Practically like a dream" }
    ],
    examples: [
      {
        zh: "这里的风景太美了，简直像一幅画。",
        pinyin: "Zhèlǐ de fēngjǐng tài měi le, jiǎnzhí xiàng yì fú huà.",
        translations: { vi: "Phong cảnh nơi đây đẹp quá, quả thực cứ như một bức tranh vậy.", ja: "ここの景色は美しすぎて、まるで一枚の絵画のようです。", en: "The scenery here is so beautiful, it's practically like a painting." },
        literal_en: "Here 's scenery too beautiful particle, simply like one volume painting.",
        scenario: { vi: "Cảm thán trước cảnh sắc thiên nhiên tuyệt mỹ", ja: "絶景に対する心からの賛嘆", en: "Admiring breathtaking scenery" },
        tone_tip: { vi: "简直 mang thanh 3 + thanh 2 (jiǎnzhí).", ja: "「简直」は第3声＋第2声です。", en: "jiǎn (3rd) + zhí (2nd)." },
        word_order_diff: { vi: "Phó từ 简直 đứng ngay trước động từ so sánh 像.", ja: "副詞「简直」が「像……」の直前に位置します。", en: "Placed right before 像." },
        note: { vi: "Cường điệu hóa vẻ đẹp thoát tục của phong cảnh.", ja: "美しさを絵画に例えて誇張する定型表現です。", en: "Hyperbolic praise comparing landscape to art." },
        tokens: [
          { hanzi: "这里的风景", pinyin: "zhèlǐ de fēngjǐng", han_viet: "giá lý đích phong cảnh", ja_kanji: "ここの景色", literal_en: "scenery here", block_role: "subject" },
          { hanzi: "太美了", pinyin: "tài měi le", han_viet: "thái mỹ liễu", ja_kanji: "美しすぎる", literal_en: "so beautiful", block_role: "predicate" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "简直", pinyin: "jiǎnzhí", han_viet: "giản trực", ja_kanji: "まるで", literal_en: "simply/virtually", block_role: "adverb" },
          { hanzi: "像", pinyin: "xiàng", han_viet: "tượng", ja_kanji: "似ている", literal_en: "like", block_role: "verb" },
          { hanzi: "一幅画", pinyin: "yì fú huà", han_viet: "nhất bức họa", ja_kanji: "一枚の絵", literal_en: "a painting", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_jianzhi_1",
        prompt: { vi: "Sắp xếp: 'Anh ấy quả thực thông minh như một thiên tài.'", ja: "並べ替え：「彼はまるで天才のように賢い。」", en: "Unscramble: 'He is virtually as smart as a genius.'" },
        correct_order: ["他", "简直", "像", "个", "天才", "一样", "聪明", "。"],
        tokens: ["聪明", "像", "他", "个", "简直", "一样", "天才", "。"],
        explanation: { vi: "S (他) + 简直 + 像 + 个天才一样 + Adj (聪明).", ja: "主語＋简直＋像……一样＋形容詞の配列です。", en: "Subject + 简直 + 像...一样 + Adjective." }
      }
    ],
    fill_blank: [
      {
        id: "fb_jianzhi_1",
        sentence_zh: "听到自己中了大奖，他{adverb}不敢相信这是真的。",
        answer: "简直",
        options: ["简直", "关于", "本来", "重新"],
        explanation: { vi: "Nhấn mạnh cảm giác sững sờ khó tin dùng 简直不敢相信.", ja: "驚きで信じられない心情を強調するので「简直」です。", en: "Intense disbelief takes 简直不敢相信." }
      }
    ],
    error_correction: [
      {
        id: "ec_jianzhi_1",
        wrong_sentence: "这里的西瓜简直很甜。",
        correct_sentence: "这里的西瓜简直太甜了。",
        error_point: { vi: "Kết hợp 简直 với phó từ khách quan 很 làm mất đi tính cảm thán cường điệu.", ja: "「简直」の後に平坦な「很」を置いて語気矛盾を起こしている誤文。", en: "Pairing 简直 with plain 很 instead of an exclamatory predicate." },
        explanation: { vi: "简直 thường đi với 太...了 hoặc 像...一样: 这里的西瓜简直太甜了.", ja: "「简直太……了」と感嘆構文に修正します。", en: "Combine 简直 with 太...了: 简直太甜了." }
      }
    ],
    quiz: [
      {
        id: "qz_jianzhi_1",
        question: { vi: "Phó từ '简直' (jiǎnzhí) chủ yếu mang sắc thái biểu đạt nào?", ja: "副詞「简直」が持つ主な語気機能は？", en: "What is the primary expressive nuance of the adverb '简直'?" },
        options: [
          { text: { vi: "Cường điệu hóa, phóng đại mức độ để bộc lộ sự kinh ngạc, thán phục hoặc khó tin", ja: "事態を誇張して、驚愕・感嘆・信じがたい感情を強調する", en: "Hyperbolizing a situation to convey astonishment, admiration, or disbelief" }, correct: true },
          { text: { vi: "Miêu tả khách quan số liệu thực tế", ja: "客観的なデータを淡々と説明する", en: "Objectively stating factual statistics" }, correct: false }
        ],
        explanation: { vi: "简直 mang tính chủ quan phóng đại tu từ rất rõ nét.", ja: "主観的でドラマチックな誇張が本質です。", en: "Carries dramatic hyperbolic emotion." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 简直 + 像...一样 / 太...了: Quả thực là, đúng là (cường điệu hóa cảm xúc kinh ngạc, thán phục).",
        ja: "主語＋简直＋像……一样／太……了：まるで〜だ、まったくもって〜だ（誇張・感嘆）。",
        en: "Subject + 简直 + 像...一样 / 太...了: 'Practically / Simply' (hyperbolic astonishment)."
      },
      remember: [
        { vi: "Hay đi thành cặp: 简直像...一样 (cứ như là...) hoặc 简直不敢相信 (quả thực không dám tin).", ja: "「简直像……一样」「简直不敢相信」は鉄板コロケーション。", en: "Common collocations: 简直像...一样 and 简直不敢相信." }
      ]
    }
  },

  // 47. hsk4_er_conjunction
  {
    id: "hsk4_er_conjunction",
    level: "HSK4",
    level_num: 4,
    category: "conjunction",
    difficulty: 4,
    frequency: 5,
    register: "formal",
    keywords: ["而", "ér", "liên từ văn viết", "mà", "nối song song", "nối đối lập", "and", "yet"],
    formula: "Vế 1 + 而 + Vế 2 (Biểu thị quan hệ song song / tăng tiến / hoặc chuyển ngoặt đối lập)",
    formula_plain: {
      vi: "Vế A + 而 + Vế B (Mà / Lại / Mà lại - liên từ văn viết trang trọng nối 2 vế câu)",
      ja: "節A ＋ 而 ＋ 節B（並列「〜にして〜」、または逆接「〜である一方〜だ」）",
      en: "Clause A + 而 + Clause B (And / Yet / Whereas - formal written conjunction)"
    },
    structure_blocks: [
      { label: { vi: "Mệnh đề A", ja: "前節A", en: "Clause A" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Liên từ văn viết 而", ja: "書面語連詞 而", en: "Written Conjunction 而" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Mệnh đề B (Đối ứng)", ja: "後節B", en: "Clause B" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk4_bu_shi_er_shi"],
    confusable_with: [
      {
        id: "hsk4_bu_shi_er_shi",
        diff: {
          vi: "Trong khẩu ngữ hay dùng 而且, 但是, 却. Trong văn viết học thuật hay dùng chữ 而 đơn lẻ để vừa làm tăng tiến (và), vừa làm đối lập (nhưng/trong khi đó).",
          ja: "口語の「而且」や「但是」に対し、「而」は格調高い書面語で、文脈に応じて並列（順接）と対比（逆接）の両方を担います。",
          en: "While spoken Chinese uses 而且 or 但是, formal written Chinese uses 而 to signify either coordination ('and') or contrast ('whereas / yet')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Liên từ văn viết 而 (ér - mà, mà lại, nhưng)",
        concept: "Là một liên từ đặc trưng của văn viết trang trọng (bắt nguồn từ cổ văn), dùng để kết nối hai tính từ, động từ hoặc hai phân câu.",
        grammar_notes: [
          "Biểu thị quan hệ đối lập (ngược nghĩa - nhưng / trong khi đó): 有的人活着，而有的人已经死了 (Có người đang sống, nhưng có người thì đã chết).",
          "Biểu thị quan hệ song song / tăng tiến (mà lại): 这项技术简单而有效 (Kỹ thuật này đơn giản mà hiệu quả).",
          "Cấu trúc đảo ngữ: 不但... 而且... có thể viết gọn thành 不但... 而...",
          "Vị trí: Đứng ở đầu vế câu thứ hai để làm nhịp cầu nối."
        ],
        pedagogical_tips: "Cung cấp cho học sinh cảm nhận về văn phong học thuật: dùng 而 giúp câu văn ngắn gọn, tao nhã."
      },
      ja: {
        title: "書面語接続詞「而（ér）」（順接・逆接）",
        concept: "漢文・古文の流れを汲む格調高い書面語の接続詞で、文脈によって「順接（並列・累加）」と「逆接（対比・転換）」の両方をこなします。",
        grammar_notes: [
          "逆接・対比（〜だが、〜である一方）：「哥哥喜欢文科，而弟弟喜欢理科」（兄は文系が好きだが、弟は理系が好きだ）。",
          "順接・並列（〜であり、かつ〜）：「价廉而物美」（値段が安く、その上質が良い）。",
          "「不但……而且……」の短縮形：「不但……而……」。"
        ],
        pedagogical_tips: "文脈によって「しかし（逆接）」と「そして（順接）」のどちらに解釈すべきかを見抜く力を養います。"
      },
      en: {
        title: "Formal Conjunction: 而 (ér)",
        concept: "A hallmark of formal and written Chinese derived from Classical Chinese, connecting two adjectives, verbs, or clauses with either coordinating or contrasting force.",
        grammar_notes: [
          "Adversative / Contrast ('whereas / yet / but'): 中国很大，而新加坡很小 (China is huge, whereas Singapore is tiny).",
          "Coordinating / Additive ('and / yet at the same time'): 伟大而艰巨的任务 (A great and yet arduous mission).",
          "Abbreviation of 而且 in formal registers.",
          "Always positioned at the seam between the two linked elements."
        ],
        pedagogical_tips: "Teach students to deduce from context whether 而 signals contrast ('whereas') or coordination ('and')."
      }
    },
    fill_template: {
      template_zh: "有的植物喜欢阳光，{conj}有的植物则喜欢阴凉。",
      template_vi: "Có loài thực vật thích ánh nắng, {conj} có loài lại thích bóng râm.",
      slots: [
        { name: "conj", type: "conjunction", options: ["而", "但是", "因为", "所以"] }
      ]
    },
    collocations: [
      { pattern: "简单而有效", pinyin: "jiǎndān ér yǒuxiào", meaning_vi: "Đơn giản mà hiệu quả", meaning_en: "Simple yet effective" },
      { pattern: "学而不思", pinyin: "xué ér bù sī", meaning_vi: "Học mà không suy ngẫm", meaning_en: "Learn without reflection" }
    ],
    examples: [
      {
        zh: "北方干燥，而南方则比较潮湿。",
        pinyin: "Běifāng gānzào, ér nánfāng zé bǐjiào cháoshī.",
        translations: { vi: "Miền Bắc khô ráo, trong khi miền Nam thì tương đối ẩm ướt.", ja: "北方は乾燥しているが、一方で南方は比較的湿潤である。", en: "The North is dry, whereas the South is comparatively humid." },
        literal_en: "North dry, whereas South however comparatively humid.",
        scenario: { vi: "Phân tích địa lý khí hậu hai miền", ja: "南北の気候比較の論説", en: "Geographical climate contrast" },
        tone_tip: { vi: "而 mang thanh 2 (ér).", ja: "「而」は第2声です。", en: "Pronounced ér (2nd tone)." },
        word_order_diff: { vi: "Vế 1 (北方干燥) + 而 + Vế 2 (南方则比较潮湿).", ja: "節1＋而＋節2（対比）の書面語形式です。", en: "Clause 1 + 而 + Clause 2." },
        note: { vi: "Thường đi kèm với chữ 则 (zé) ở vế sau để tăng tính đối lập.", ja: "後節に「则」を伴って対比感を強めるのが書面語の定番技巧です。", en: "Often pairs with 则 in Clause 2 to heighten contrast." },
        tokens: [
          { hanzi: "北方", pinyin: "běifāng", han_viet: "bắc phương", ja_kanji: "北方", literal_en: "the North", block_role: "subject" },
          { hanzi: "干燥", pinyin: "gānzào", han_viet: "can táo", ja_kanji: "乾燥している", literal_en: "dry", block_role: "predicate" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "而", pinyin: "ér", han_viet: "nhi", ja_kanji: "〜である一方", literal_en: "whereas", block_role: "conjunction" },
          { hanzi: "南方", pinyin: "nánfāng", han_viet: "nam phương", ja_kanji: "南方", literal_en: "the South", block_role: "subject" },
          { hanzi: "则", pinyin: "zé", han_viet: "tắc", ja_kanji: "〜はというと", literal_en: "in contrast", block_role: "adverb" },
          { hanzi: "比较", pinyin: "bǐjiào", han_viet: "tỷ giác", ja_kanji: "比較的", literal_en: "comparatively", block_role: "adverb" },
          { hanzi: "潮湿", pinyin: "cháoshī", han_viet: "triều thấp", ja_kanji: "湿っている", literal_en: "humid", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_er_1",
        prompt: { vi: "Sắp xếp: 'Phương pháp này vừa tiết kiệm thời gian mà lại an toàn.'", ja: "並べ替え：「この方法は時間を節約でき、その上安全だ。」", en: "Unscramble: 'This method saves time and yet is safe.'" },
        correct_order: ["这种", "方法", "节约", "时间", "而", "安全", "。"],
        tokens: ["时间", "方法", "节约", "这种", "而", "安全", "。"],
        explanation: { vi: "节约时间 (tiết kiệm thời gian) + 而 + 安全 (mà lại an toàn).", ja: "節約時間＋而＋安全の並列接続です。", en: "节约时间 + 而 + 安全." }
      }
    ],
    fill_blank: [
      {
        id: "fb_er_1",
        sentence_zh: "光说不练是不会成功的，{conj}实践才能出真知。",
        answer: "而",
        options: ["而", "但是", "因为", "所以"],
        explanation: { vi: "Nối 2 vế văn phong nghị luận trang trọng dùng liên từ 而.", ja: "格調高い論説文で対比・転換を表す連詞は「而」です。", en: "Formal argumentative transition takes 而." }
      }
    ],
    error_correction: [
      {
        id: "ec_er_1",
        wrong_sentence: "而他很喜欢音乐，我喜欢画画。",
        correct_sentence: "他很喜欢音乐，而我喜欢画画。",
        error_point: { vi: "Đặt 而 ở đầu câu thứ nhất thay vì đặt ở chỗ nối giữa hai vế câu.", ja: "「而」を前節の冒頭に置いてしまった誤文。", en: "Placing 而 at the very start of the first sentence." },
        explanation: { vi: "Liên từ 而 phải đứng ở vế thứ hai để làm cầu nối: 他喜欢音乐，而我喜欢画画.", ja: "「而」は2つの節をつなぐ後節の冒頭に配置します。", en: "Place 而 at the start of the second clause." }
      }
    ],
    quiz: [
      {
        id: "qz_er_1",
        question: { vi: "Liên từ '而' (ér) thuộc phong cách ngôn ngữ nào?", ja: "連詞「而」が活躍する主要な文体は？", en: "In which register is the conjunction '而' most characteristically used?" },
        options: [
          { text: { vi: "Văn viết trang trọng, học thuật, báo chí nghị luận", ja: "フォーマルな書面語、学術論文、報道論説文", en: "Formal written Chinese, academic papers, and journalism" }, correct: true },
          { text: { vi: "Khẩu ngữ đường phố bình dân xuề xòa", ja: "街角のくだけた俗語・スラング", en: "Casual street slang" }, correct: false }
        ],
        explanation: { vi: "而 là liên từ cổ văn lưu lại trong văn viết tiếng Trung hiện đại.", ja: "文言文由来の洗練された書面語連詞です。", en: "Originates from Classical Chinese; standard in formal prose." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Vế 1 + 而 + Vế 2: Liên từ văn viết trang trọng; nối đối lập ('trong khi đó') hoặc song song ('mà lại').",
        ja: "節1 ＋ 而 ＋ 節2：格調高い書面語接続詞。対比（〜である一方）や並列（〜にして〜）を担う。",
        en: "Clause 1 + 而 + Clause 2: Formal written conjunction; expresses contrast ('whereas') or coordination ('and')."
      },
      remember: [
        { vi: "Mà trong văn viết dùng 而; không đặt 而 ở đầu câu đứng một mình mà phải đứng giữa hai vế.", ja: "「而」は2つの節の結び目に置く。", en: "Place 而 at the junction between the two clauses." }
      ]
    }
  },

  // 48. hsk5_ning_ke_ye_bu
  {
    id: "hsk5_ning_ke_ye_bu",
    level: "HSK5",
    level_num: 5,
    category: "conjunction",
    difficulty: 5,
    frequency: 4,
    register: "neutral",
    keywords: ["宁可...也...", "宁愿...也不...", "nìngkě...yě...", "thà... chứ không...", "preference choice", "would rather"],
    formula: "宁可 / 宁愿 + Lựa chọn chấp nhận thiệt thòi，也 + 不 + Điều kiên quyết cự tuyệt",
    formula_plain: {
      vi: "宁可 (Thà rằng / Thà chấp nhận A)，也 (cũng) + 不 (nhất quyết không chịu B)",
      ja: "宁可／宁愿（たとえ〜を犠牲にしても）……，也不（決して〜はしない）",
      en: "宁可 / 宁愿 (Would rather accept A), 也不 (than endure / do B)"
    },
    structure_blocks: [
      { label: { vi: "Liên từ thà rằng 宁可", ja: "選択決意連詞 宁可", en: "Preferential 宁可" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Phương án chấp nhận gian khổ (A)", ja: "甘受する代償A", en: "Hard Choice A" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Cự tuyệt 也不", ja: "断固拒絶 也不", en: "Rejection 也不" }, role: "conjunction", color: "#EF4444" },
      { label: { vi: "Phương án kiên quyết chối từ (B)", ja: "断固拒絶する選択肢B", en: "Rejected Choice B" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk5_yu_qi_bu_ru_preference"],
    confusable_with: [
      {
        id: "hsk5_yu_qi_bu_ru_preference",
        diff: {
          vi: "与其...不如... là so sánh 2 phương án bình thường (Thà A còn hơn B). 宁可...也不... mang tính chất QUYẾT TÂM TỬ THỦ: Thà chịu khổ, chịu hy sinh mất mát lớn ở vế A, chứ tuyệt đối không làm điều nhục nhã, sai trái ở vế B.",
          ja: "「与其……不如……」は損得の合理的な選択。「宁可……也不……」は強い気骨・信念を伴い、重大な犠牲を払ってでも屈服・妥協を拒絶する決意です。",
          en: "与其...不如... is rational preference between two choices; 宁可...也不... involves deep conviction, willing sacrifice, and unyielding refusal to compromise."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc lựa chọn kiên quyết: 宁可……也（不）…… (Thà…… chứ nhất quyết không……)",
        concept: "Dùng để biểu thị sau khi cân nhắc kỹ lưỡng giữa hai phương án bất lợi, người nói tình nguyện chọn gánh chịu phần gian khổ, thiệt thòi về mình (vế A), chứ quyết không làm điều vi phạm nguyên tắc hoặc chịu nhục nhã (vế B).",
        grammar_notes: [
          "Mẫu từ chối: 宁可 A，也不 B (Thà A chứ không B) -> 我宁可饿肚子，也不吃垃圾食品.",
          "Mẫu chấp nhận hy sinh để đạt mục tiêu: 宁可 A，也要 B (Thà A nhưng nhất định phải B) -> 宁可少睡两个小时，也要按时完成任务.",
          "Từ đồng nghĩa: 宁愿 (nìngyuàn) mang tính chủ quan nguyện vọng."
        ],
        pedagogical_tips: "Khắc sâu sắc thái: Cấu trúc thể hiện khí phách, lập trường kiên định của người nói."
      },
      ja: {
        title: "決意選択複文「宁可……也（不）……」（たとえ〜してでも、絶対に〜しない）",
        concept: "2つの好ましくない選択肢の間で比較考量し、信念や尊厳を守るために自ら苦痛や犠牲（A）を選び取り、耐え難い事態や不正（B）を断固として拒絶する構文です。",
        grammar_notes: [
          "拒絶型：「宁可……，也不……」（例：我宁可走路，也不坐他的车）。",
          "執念達成型：「宁可……，也要……」（例：宁可倾家荡産，也要治好孩子的病＝全財産を失ってでも子供の病気を治す）。",
          "「宁愿」も完全に同義で使用可能。"
        ],
        pedagogical_tips: "強い信念や覚悟を伴うハイレベルな表現としてHSK5の必須項目です。"
      },
      en: {
        title: "Resolute Preference: 宁可……也(不)……",
        concept: "Expresses a resolute value judgment where the speaker willingly accepts hardship, loss, or sacrifice (A) rather than succumb to an unacceptable outcome or compromise principles (B).",
        grammar_notes: [
          "Refusal pattern: 宁可 A, 也不 B (Would rather A than do B): 我宁可自己吃苦，也不愿给别人添麻烦.",
          "Determination pattern: 宁可 A, 也要 B (Willing to endure A just to achieve B): 宁可不睡觉，也要把工作做完.",
          "Synonym: 宁愿 is fully interchangeable with 宁可."
        ],
        pedagogical_tips: "Emphasize moral conviction and willing sacrifice."
      }
    },
    fill_template: {
      template_zh: "他是一个非常有骨气的人，宁可自己挨饿，{concession}向别人乞求。",
      template_vi: "Anh ấy là một người rất có khí phách, thà rằng bản thân chịu đói, {concession} hướng người khác van xin.",
      slots: [
        { name: "concession", type: "conjunction", options: ["也不", "也要", "而且", "所以"] }
      ]
    },
    collocations: [
      { pattern: "宁可...也不...", pinyin: "nìngkě... yě bù...", meaning_vi: "Thà... chứ không...", meaning_en: "Would rather... than..." },
      { pattern: "宁缺毋滥", pinyin: "nìng quē wú làn", meaning_vi: "Thà thiếu chứ không ẩu (thà ít mà chất lượng)", meaning_en: "Better to go without than have poor quality" }
    ],
    examples: [
      {
        zh: "我宁可多花点儿钱，也要买质量最好的产品。",
        pinyin: "Wǒ nìngkě duō huā diǎnr qián, yě yào mǎi zhìliàng zuì hǎo de chǎnpǐn.",
        translations: { vi: "Tôi thà tốn thêm chút tiền, cũng phải mua sản phẩm có chất lượng tốt nhất.", ja: "お金を少し余分に払ってでも、一番品質の良い製品を買いたい。", en: "I would rather spend a bit more money to buy the highest quality product." },
        literal_en: "I would-rather more spend a-bit money, also must buy quality best 's product.",
        scenario: { vi: "Lựa chọn tiêu dùng thông minh, chú trọng chất lượng", ja: "品質を重視する消費哲学の表明", en: "Quality-first consumer mindset" },
        tone_tip: { vi: "宁可 đọc là nìngkě (nìng thanh 4).", ja: "「宁可」の「宁」は第4声（nìng）です。", en: "nìng is 4th tone." },
        word_order_diff: { vi: "S (我) + 宁可 + Thiệt thòi chấp nhận (多花点儿钱) + 也要 + Mục tiêu kiên quyết (买质量最好的).", ja: "主語＋宁可＋代償，也要＋必達目標。", en: "Subject + 宁可 + Cost + 也要 + Goal." },
        note: { vi: "Mẫu 宁可... 也要... biểu thị quyết tâm đạt được chất lượng tốt.", ja: "「宁可……也要……」の達成への強い執念の好例です。", en: "Model of willing sacrifice for ultimate excellence." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", literal_en: "I", block_role: "subject" },
          { hanzi: "宁可", pinyin: "nìngkě", han_viet: "ninh khả", ja_kanji: "たとえ〜してでも", literal_en: "would rather", block_role: "conjunction" },
          { hanzi: "多花点儿钱", pinyin: "duō huā diǎnr qián", han_viet: "đa hoa điểm nhi tiền", ja_kanji: "少し余分にお金を払う", literal_en: "spend more money", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "也要", pinyin: "yě yào", han_viet: "dã yếu", ja_kanji: "〜したい", literal_en: "also must", block_role: "conjunction" },
          { hanzi: "买", pinyin: "mǎi", han_viet: "mãi", ja_kanji: "買う", literal_en: "buy", block_role: "verb" },
          { hanzi: "质量最好", pinyin: "zhìliàng zuì hǎo", han_viet: "chất lượng tối hảo", ja_kanji: "最高の品質", literal_en: "best quality", block_role: "modifier" },
          { hanzi: "的产品", pinyin: "de chǎnpǐn", han_viet: "đích sản phẩm", ja_kanji: "の製品", literal_en: "product", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_ningke_1",
        prompt: { vi: "Sắp xếp: 'Tôi thà đi bộ về chứ không ngồi xe của anh ta.'", ja: "並べ替え：「私は歩いて帰ってでも、彼の車には乗らない。」", en: "Unscramble: 'I would rather walk back than take his car.'" },
        correct_order: ["我", "宁可", "走路", "回家", "，", "也", "不", "坐", "他的", "车", "。"],
        tokens: ["他的", "我", "坐", "车", "走路", "不", "回家", "也", "宁可", "，", "。"],
        explanation: { vi: "S + 宁可 + V1 (走路回家)，也 + 不 + V2 (坐他的车).", ja: "宁可A，也不Bの拒絶構文です。", en: "宁可 A, 也不 B." }
      }
    ],
    fill_blank: [
      {
        id: "fb_ningke_1",
        sentence_zh: "这位老科学家{conjunction}放弃国外的优厚待遇，也要回国报效祖国。",
        answer: "宁可",
        options: ["宁可", "既然", "虽然", "由于"]
      }
    ],
    error_correction: [
      {
        id: "ec_ningke_1",
        wrong_sentence: "我宁可不去，所以不去。",
        correct_sentence: "我宁可留在家里，也不去那个无聊的晚会。",
        error_point: { vi: "Dùng sai hoàn toàn logic và thiếu vế đối ứng của 宁可.", ja: "「宁可」の呼応相手を誤り、文意が破綻している誤文。", en: "Incorrectly using 宁可 without its paired comparative option." },
        explanation: { vi: "宁可 phải có 2 phương án đối ứng rõ ràng: 宁可 A，也不 B.", ja: "「宁可A，也不B」の形に対比を補います。", en: "Provide contrasting choice: 宁可 A, 也不 B." }
      }
    ],
    quiz: [
      {
        id: "qz_ningke_1",
        question: { vi: "Cấu trúc '宁可...也不...' thể hiện thái độ gì của người nói?", ja: "「宁可……也不……」構文が表す話者の心理的態度は？", en: "What attitude does '宁可...也不...' primarily convey?" },
        options: [
          { text: { vi: "Sẵn sàng chịu thiệt thòi về mình chứ kiên quyết cự tuyệt điều không mong muốn (khí phách, kiên định)", ja: "自ら犠牲や苦難を受け入れてでも、不本意な妥協を断固拒否する決意", en: "Willingness to endure hardship rather than compromise core principles" }, correct: true },
          { text: { vi: "Do dự không biết chọn phương án nào", ja: "どちらにすべきか迷っている優柔不断さ", en: "Hesitation between two options" }, correct: false }
        ],
        explanation: { vi: "宁可 biểu thị sự quả quyết và kiên định lập trường.", ja: "妥協を許さない固い決意の表現です。", en: "Expresses resolute unyielding conviction." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "宁可 A，也(不) B: Thà chấp nhận gian khổ A, chứ kiên quyết không làm điều B (hoặc thà A nhưng nhất quyết phải B).",
        ja: "宁可A，也(不)B：たとえAの犠牲を払ってでもBは断固拒否する（または必達する）。",
        en: "宁可 A, 也(不) B: Resolute choice; willing to endure A rather than succumb to B."
      },
      remember: [
        { vi: "Phát âm chữ 宁 mang thanh 4 (nìngkě, nìngyuàn).", ja: "「宁」のピンインは第4声（nìng）。", en: "Pronounced nìng with 4th tone." }
      ]
    }
  },

  // 49. hsk5_zhi_suo_yi_shi_yin_wei
  {
    id: "hsk5_zhi_suo_yi_shi_yin_wei",
    level: "HSK5",
    level_num: 5,
    category: "sentence_pattern",
    difficulty: 5,
    frequency: 5,
    register: "formal",
    keywords: ["之所以...是因为...", "zhī suǒyǐ...shì yīnwèi...", "sở dĩ... là vì...", "đảo nhân quả", "the reason why is because"],
    formula: "S + 之所以 + Kết quả đã xảy ra，是因为 + Nguyên nhân cốt lõi",
    formula_plain: {
      vi: "Chủ ngữ + 之所以 (Sở dĩ) + Kết quả，是因为 (Là bởi vì) + Nguyên nhân sâu xa",
      ja: "主語 ＋ 之所以（〜する理由は）……，是因为（……だからである）",
      en: "Subject + 之所以 (The reason why...) + Outcome, 是因为 (is because...) + Core Cause"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Liên từ đảo 之所以", ja: "倒置連詞 之所以", en: "Causal Pivot 之所以" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Kết quả đã định", ja: "結果節（既定の事実）", en: "Result Clause" }, role: "clause", color: "#F59E0B" },
      { label: { vi: "是因为", ja: "理由提示 是因为", en: "Explanation 是因为" }, role: "conjunction", color: "#8B5CF6" },
      { label: { vi: "Nguyên nhân cốt lõi", ja: "根源的原因節", en: "Root Cause Clause" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk2_yinwei_suoyi"],
    confusable_with: [
      {
        id: "hsk2_yinwei_suoyi",
        diff: {
          vi: "因为...所以... là trật tự tự nhiên: Nêu NGUYÊN NHÂN trước -> KẾT QUẢ sau. 之所以...是因为... là cấu trúc ĐẢO NGƯỢC: Nêu KẾT QUẢ trước -> mổ xẻ NGUYÊN NHÂN CỐT LÕI sau, mang tính giải thích chuyên sâu.",
          ja: "因为……所以……は通常順序（原因➔結果）。之所以……是因为……は倒置構文（結果➔原因解明）で、原因を強く際立たせる学術的表現です。",
          en: "因为...所以... follows natural order (Cause -> Result); 之所以...是因为... inverts the order (Result -> Explanation) to spotlight the underlying cause."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc đảo nhân quả: 之所以……是因为…… (Sở dĩ…… là vì……)",
        concept: "Dùng để đảo trật tự nhân quả thông thường: đặt kết quả đã biết lên trước để tạo sự tò mò chú ý, sau đó mới giải thích cặn kẽ nguyên nhân bản chất ở vế sau.",
        grammar_notes: [
          "Vế 1 nêu kết quả: 他之所以成功 (Sở dĩ anh ấy thành công...).",
          "Vế 2 giải thích nguyên nhân: 是因为他付出了比别人更多的汗水 (...là vì anh ấy đã đổ mồ hôi nhiều hơn người khác).",
          "Vị trí chủ ngữ: Chủ ngữ có thể đứng trước hoặc sau 之所以 (他之所以... hoặc 之所以他...). Thường gặp nhất là S đứng trước 之所以.",
          "Mang tính văn phong học thuật, nghị luận, thuyết trình vô cùng trang trọng."
        ],
        pedagogical_tips: "Cấu trúc điểm 10 cho bài thi viết HSK 5 và HSK 6."
      },
      ja: {
        title: "倒置因果構文「之所以……是因为……」（〜の理由は……だからである）",
        concept: "結果を先に出して聞き手の関心を引きつけ、その後に「是因为……」と真の核心的理由を明かす論理的倒置表現です。",
        grammar_notes: [
          "前節（結果）：他之所以取得好成绩（彼が好成績を収めた理由は）。",
          "後節（原因）：是因为他平时很刻苦（普段から努力していたからに他ならない）。",
          "主語の配置：通常は主語が「之所以」の前に来ます（S＋之所以……是因为……）。",
          "論文やスピーチ、プレゼンテーションで説得力を最大化する構文。"
        ],
        pedagogical_tips: "HSK5の作文や長文読解で高得点を狙うキラーフレーズとして定着させます。"
      },
      en: {
        title: "Inverted Causality: 之所以……是因为……",
        concept: "Reverses traditional cause-and-effect by presenting the known result first to engage the listener, then unveiling the profound underlying cause with 是因为 ('the reason why... is because...').",
        grammar_notes: [
          "Clause 1 (Known Result): 我们之所以选择这个方案 (The reason why we chose this plan...).",
          "Clause 2 (Core Reason): 是因为它最具可行性 (...is because it is the most feasible).",
          "Subject placement: Usually placed directly before 之所以 (S + 之所以...).",
          "Highly prestigious in academic, argumentative, and business presentations."
        ],
        pedagogical_tips: "Essential top-scoring pattern for HSK 5 and HSK 6 essays."
      }
    },
    fill_template: {
      template_zh: "他{causal_marker}能成为优秀的翻译，是因为他精通两国文化。",
      template_vi: "Anh ấy {causal_marker} có thể trở thành phiên dịch viên ưu tú, là vì anh ấy tinh thông văn hóa hai nước.",
      slots: [
        { name: "causal_marker", type: "conjunction", options: ["之所以", "因为", "所以", "既然"] }
      ]
    },
    collocations: [
      { pattern: "之所以...是因为...", pinyin: "zhī suǒyǐ... shì yīnwèi...", meaning_vi: "Sở dĩ... là vì...", meaning_en: "The reason why... is because..." },
      { pattern: "之所以如此", pinyin: "zhī suǒyǐ rúcǐ", meaning_vi: "Sở dĩ như vậy", meaning_en: "The reason why it is so" }
    ],
    examples: [
      {
        zh: "人类之所以伟大，是因为我们拥有梦想。",
        pinyin: "Rénlèi zhī suǒyǐ wěidà, shì yīnwèi wǒmen yōngyǒu mèngxiǎng.",
        translations: { vi: "Nhân loại sở dĩ vĩ đại, là vì chúng ta có ước mơ.", ja: "人類が偉大である理由は、私たちに夢があるからである。", en: "The reason why humanity is great is because we possess dreams." },
        literal_en: "Humanity reason great, is because we possess dreams.",
        scenario: { vi: "Phát biểu truyền cảm hứng triết lý sâu sắc", ja: "哲学的・感動的なスピーチの一節", en: "Philosophical inspirational quote" },
        tone_tip: { vi: "之所以 đọc liền mạch là zhī suǒyǐ.", ja: "「之所以」は流れるように発音します。", en: "Pronounced smoothly as zhī suǒyǐ." },
        word_order_diff: { vi: "Chủ ngữ (人类) + 之所以 + Kết quả (伟大) + 是因为 + Nguyên nhân (我们拥有梦想).", ja: "主語＋之所以＋結果，是因为＋原因の完全倒置形。", en: "S + 之所以 + Result, 是因为 + Reason." },
        note: { vi: "Văn phong triết lý, hùng hồn chuẩn mực.", ja: "格調高さの極致を示す名文です。", en: "Exemplifies noble rhetorical eloquence." },
        tokens: [
          { hanzi: "人类", pinyin: "rénlèi", han_viet: "nhân loại", ja_kanji: "人類", literal_en: "humanity", block_role: "subject" },
          { hanzi: "之所以", pinyin: "zhī suǒyǐ", han_viet: "chi sở dĩ", ja_kanji: "〜の理由は", literal_en: "the reason why", block_role: "conjunction" },
          { hanzi: "伟大", pinyin: "wěidà", han_viet: "vĩ đại", ja_kanji: "偉大だ", literal_en: "great", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "是因为", pinyin: "shì yīnwèi", han_viet: "thị nhân vị", ja_kanji: "〜だからである", literal_en: "is because", block_role: "conjunction" },
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "拥有梦想", pinyin: "yōngyǒu mèngxiǎng", han_viet: "ủng hữu mộng tưởng", ja_kanji: "夢を持つ", literal_en: "possess dreams", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_zhisuoyi_1",
        prompt: { vi: "Sắp xếp: 'Sở dĩ anh ấy từ chối là vì anh ấy quá bận.'", ja: "並べ替え：「彼が断った理由は、忙しすぎたからだ。」", en: "Unscramble: 'The reason why he refused is because he was too busy.'" },
        correct_order: ["他", "之所以", "拒绝", "，", "是因为", "太忙", "了", "。"],
        tokens: ["拒绝", "是因为", "他", "之所以", "了", "太忙", "，", "。"],
        explanation: { vi: "S (他) + 之所以 + V (拒绝)，是因为 + Nguyên nhân (太忙了).", ja: "主語＋之所以＋動詞，是因为＋原因の順序です。", en: "Subject + 之所以 + Result, 是因为 + Cause." }
      }
    ],
    fill_blank: [
      {
        id: "fb_zhisuoyi_1",
        sentence_zh: "我们之所以提前出发，{clause_link}避开早高峰的堵车。",
        answer: "是为了",
        options: ["是为了", "因为", "所以", "而且"],
        explanation: { vi: "Khi vế sau giải thích mục đích, 之所以 có thể kết hợp linh hoạt với 是为了 (sở dĩ... là nhằm mục đích...).", ja: "目的を説明する派生形「之所以……是为了……」なので「是为了」が正解です。", en: "Purpose variant takes 是为了." }
      }
    ],
    error_correction: [
      {
        id: "ec_zhisuoyi_1",
        wrong_sentence: "因为他之所以迟到，是因为起晚了。",
        correct_sentence: "他之所以迟到，是因为起晚了。",
        error_point: { vi: "Thừa chữ 因为 ở đầu câu khi đã có 之所以.", ja: "「之所以」があるのに文頭に「因为」を重複配置した重言ミス。", en: "Redundantly adding 因为 at the start before 之所以." },
        explanation: { vi: "Xóa bỏ 因为 ở đầu câu: 他之所以迟到，是因为起晚了.", ja: "文頭の余計な「因为」を削ります。", en: "Remove 因为 from the beginning." }
      }
    ],
    quiz: [
      {
        id: "qz_zhisuoyi_1",
        question: { vi: "Cấu trúc 之所以……是因为…… khác gì so với 因为……所以……?", ja: "「之所以……是因为……」と「因为……所以……」の語順の違いは？", en: "How does 之所以……是因为…… differ structurally from 因为……所以……?" },
        options: [
          { text: { vi: "之所以 đưa KẾT QUẢ lên trước, 是因为 giải thích NGUYÊN NHÂN ra sau (đảo ngược trật tự)", ja: "結果を先に出し、後ろで原因を明かす倒置関係になっている", en: "It presents the RESULT first and explains the CAUSE second (inverted)" }, correct: true },
          { text: { vi: "Không có gì khác, trật tự hoàn toàn giống nhau", ja: "全く同じ順序で差異はない", en: "No difference, they follow the exact same order" }, correct: false }
        ],
        explanation: { vi: "之所以 là cấu trúc nhân quả đảo ngược mang tính hùng biện.", ja: "聞き手の注意を惹きつけるための論理的倒置です。", en: "Inverts order for rhetorical focus." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "S + 之所以 + Kết quả，是因为 + Nguyên nhân: Sở dĩ... là vì... (đảo kết quả lên trước để giải thích nguyên nhân cốt lõi).",
        ja: "主語＋之所以＋結果，是因为＋原因：〜の理由は……だからである（論理的倒置因果構文）。",
        en: "S + 之所以 + Result, 是因为 + Cause: 'The reason why... is because...' (inverted causality for emphasis)."
      },
      remember: [
        { vi: "Không để 因为 đứng ở đầu câu trước 之所以 (*因为 S 之所以 là sai).", ja: "「因为＋之所以」の重ね使いは不可。", en: "Never put 因为 before 之所以." }
      ]
    }
  },

  // 50. hsk5_bu_jian_de_wei_bi
  {
    id: "hsk5_bu_jian_de_wei_bi",
    level: "HSK5",
    level_num: 5,
    category: "negation",
    difficulty: 5,
    frequency: 4,
    register: "formal",
    keywords: ["不见得", "未必", "bújiànde", "wèibì", "chưa chắc đã", "phủ định uyển chuyển", "not necessarily"],
    formula: "S + 不见得 / 未必 + V / Adj / Mệnh đề",
    formula_plain: {
      vi: "Chủ ngữ + 不见得 / 未必 + V/Adj (Chưa chắc đã / Không hẳn là / Chưa hẳn đã đúng)",
      ja: "主語 ＋ 不见得／未必 ＋ 述語（必ずしも〜とは限らない、〜とは言いきれない）",
      en: "Subject + 不见得 / 未必 + Predicate (Not necessarily / Not necessarily so)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ uyển chuyển (不见得/未必)", ja: "婉曲否定副詞 不见得／未必", en: "Tentative Negator" }, role: "negation", color: "#EC4899" },
      { label: { vi: "Nhận định được làm dịu", ja: "被修飾述語句", en: "Softened Assertion" }, role: "predicate", color: "#10B981" }
    ],
    related_ids: ["hsk1_bu_negation"],
    confusable_with: [
      {
        id: "hsk1_bu_negation",
        diff: {
          vi: "不... là phủ định tuyệt đối (不对 - Không đúng). 不见得 / 未必 là phủ định uyển chuyển, chừng mực (chưa chắc đã đúng: 不见得对), thể hiện tư duy đa chiều và thái độ khách quan, lịch thiệp.",
          ja: "「不＋述語」は断定的な否定。「不见得／未必」は「必ずしも〜とは限らない」という柔らかい部分的・婉曲否定です。",
          en: "Direct negation (不) is absolute; 不见得 / 未必 is tentative and diplomatic ('not necessarily so')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phủ định uyển chuyển: 不见得 (bújiànde) và 未必 (wèibì - Chưa chắc đã / Không hẳn)",
        concept: "Dùng để bày tỏ sự nghi ngờ, phản biện một cách khéo léo, khách quan mà không làm mất lòng người nghe: biểu thị sự việc không mang tính tuyệt đối 100% ('chưa chắc đã...').",
        grammar_notes: [
          "不见得: Thường dùng trong khẩu ngữ và thảo luận hàng ngày (贵的东西不见得好 - Đồ đắt tiền chưa chắc đã tốt).",
          "未必: Mang tính văn viết, học thuật và trang trọng hơn (未必正确 - chưa hẳn đã chính xác).",
          "Có thể đứng độc lập làm câu trả lời: 那可不见得！ (Cái đó thì chưa chắc đâu nhé!)."
        ],
        pedagogical_tips: "Cung cấp mẫu phản biện lịch thiệp trong giao tiếp thương mại và xã giao."
      },
      ja: {
        title: "婉曲否定表現「不见得」「未必」（必ずしも〜とは言えない）",
        concept: "相手の主張や常識的な先入観に対して、「一概にそうとは限らない」「まだ疑問の余地がある」と知的にやんわり反論する表現です。",
        grammar_notes: [
          "不见得（口語的・日常談話）：「有钱人不见得都快乐」（金持ちが必ずしも全員幸福とは限らない）。",
          "未必（書面語・フォーマル）：「未必如此」（必ずしもそうとは言えない）。",
          "単独でのあいづち返答：「那可不见得！」（いや、そうとは限らないよ！）。"
        ],
        pedagogical_tips: "角を立てずに知的に異論を唱える大人の対話術として指導します。"
      },
      en: {
        title: "Diplomatic Negation: 不见得 (bújiànde) and 未必 (wèibì)",
        concept: "Used to politely challenge assumptions or soften disagreements by stating that something is 'not necessarily' or 'not guaranteed to be' true.",
        grammar_notes: [
          "不见得: More colloquial and common in daily discussion (便宜的东西不见得质量差 - Cheap things aren't necessarily bad quality).",
          "未必: More formal, literary, and concise (未必完全正确 - Not necessarily entirely accurate).",
          "Standalone interjection: 那可不见得! (That's not necessarily so!)."
        ],
        pedagogical_tips: "Essential for polite and diplomatic counter-arguments in professional communication."
      }
    },
    fill_template: {
      template_zh: "大城市的生活条件好，但也{hedge}人人都喜欢。",
      template_vi: "Điều kiện sống ở thành phố lớn tốt, nhưng cũng {hedge} người người đều thích.",
      slots: [
        { name: "hedge", type: "adverb", options: ["不见得", "必须", "一定", "虽然"] }
      ]
    },
    collocations: [
      { pattern: "那可不见得", pinyin: "nà kě bújiànde", meaning_vi: "Thế thì chưa chắc đâu nhé", meaning_en: "That's not necessarily so" },
      { pattern: "未必如此", pinyin: "wèibì rúcǐ", meaning_vi: "Chưa hẳn đã như vậy", meaning_en: "Not necessarily the case" }
    ],
    examples: [
      {
        zh: "价格贵的东西不见得质量就好。",
        pinyin: "Jiàgé guì de dōngxi bújiànde zhìliàng jiù hǎo.",
        translations: { vi: "Đồ đạc giá cả đắt tiền chưa chắc chất lượng đã tốt.", ja: "値段が高いものが、必ずしも品質が良いとは限らない。", en: "Expensive items are not necessarily of good quality." },
        literal_en: "Price expensive 's things not-necessarily quality then good.",
        scenario: { vi: "Khuyên nhủ tiêu dùng tỉnh táo", ja: "買い物における冷静な助言", en: "Sensible shopping advice" },
        tone_tip: { vi: "不见得 đọc là bújiànde (bù đổi thành bú).", ja: "「不」は第4声「见」の前で「bú」に変調します。", en: "Tone sandhi: bújiànde." },
        word_order_diff: { vi: "S (价格贵的东西) + 不见得 + Vị ngữ (质量就好).", ja: "主語＋不见得＋述語の配置です。", en: "Subject + 不见得 + Predicate." },
        note: { vi: "Phủ định chừng mực, thấu đáo và khách quan.", ja: "知性的でバランスの取れた客観的判断です。", en: "Intellectual and balanced judgment." },
        tokens: [
          { hanzi: "价格贵的东西", pinyin: "jiàgé guì de dōngxi", han_viet: "giá cách quý đích đông tây", ja_kanji: "値段が高いもの", literal_en: "expensive things", block_role: "subject" },
          { hanzi: "不见得", pinyin: "bújiànde", han_viet: "bất kiến đắc", ja_kanji: "必ずしも〜でない", literal_en: "not necessarily", block_role: "negation" },
          { hanzi: "质量", pinyin: "zhìliàng", han_viet: "chất lượng", ja_kanji: "品質", literal_en: "quality", block_role: "subject" },
          { hanzi: "就", pinyin: "jiù", han_viet: "tựu", ja_kanji: "〜である", literal_en: "then", block_role: "adverb" },
          { hanzi: "好", pinyin: "hǎo", han_viet: "hảo", ja_kanji: "良い", literal_en: "good", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_weibi_1",
        prompt: { vi: "Sắp xếp: 'Lời anh ta nói chưa chắc đã là sự thật.'", ja: "並べ替え：「彼の言っていることは、必ずしも事実とは限らない。」", en: "Unscramble: 'What he said is not necessarily the truth.'" },
        correct_order: ["他", "说的", "话", "未必", "是", "真的", "。"],
        tokens: ["是", "他", "真的", "未必", "话", "说的", "。"],
        explanation: { vi: "Chủ ngữ (他说话) + 未必 + Vị ngữ (是真的).", ja: "主語＋未必＋述語の順序です。", en: "Subject + 未必 + Predicate." }
      }
    ],
    fill_blank: [
      {
        id: "fb_weibi_1",
        sentence_zh: "考第一名的学生，将来{adverb}就能成为最成功的人。",
        answer: "未必",
        options: ["未必", "必须", "应该", "经常"],
        explanation: { vi: "Biểu thị nhận định khách quan 'chưa chắc đã' dùng 未必.", ja: "「必ずしも〜とは言えない」という婉曲否定なので「未必」です。", en: "Expresses 'not necessarily': 未必." }
      }
    ],
    error_correction: [
      {
        id: "ec_weibi_1",
        wrong_sentence: "这道题他没见得会做。",
        correct_sentence: "这道题他不见得会做。",
        error_point: { vi: "Dùng nhầm 没见得 thay vì phó từ chuẩn 不见得.", ja: "固定副詞「不见得」を「没见得」と誤記したミス。", en: "Mistakenly writing 没见得 instead of 不见得." },
        explanation: { vi: "Phó từ chuẩn cố định luôn là 不见得 (không dùng 没).", ja: "正しい固定連語は「不见得」です。", en: "The correct set adverb is 不见得." }
      }
    ],
    quiz: [
      {
        id: "qz_weibi_1",
        question: { vi: "Khi ai đó nói '那可不见得！', họ muốn diễn đạt thái độ gì?", ja: "相手が「那可不见得！」と返答した時の意図は？", en: "When someone replies '那可不见得！', what attitude are they conveying?" },
        options: [
          { text: { vi: "Lịch sự bày tỏ sự hoài nghi: 'Chưa chắc đâu nhé, sự việc không hẳn là như thế'", ja: "「いや、そうとは言い切れないよ」とやんわり異論・保留を唱えている", en: "Politely expressing doubt: 'That is not necessarily so; it might be otherwise'" }, correct: true },
          { text: { vi: "Hoàn toàn đồng tình 100% với ý kiến của bạn", ja: "相手の意見に100％全面的に同意している", en: "Completely agreeing 100% with you" }, correct: false }
        ],
        explanation: { vi: "那可不见得 là câu cửa miệng phản biện uyển chuyển cực kỳ phổ biến.", ja: "日常の知的な反論・相槌の定番です。", en: "Classic diplomatic counter-interjection." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "不见得 / 未必: Phủ định uyển chuyển (Chưa chắc đã / Không hẳn); thể hiện tư duy đa chiều và phản biện lịch thiệp.",
        ja: "不见得／未必：婉曲否定（必ずしも〜とは限らない）。知性的で角を立てない反論表現。",
        en: "不见得 / 未必: Diplomatic negation ('not necessarily so'); provides intellectual and polite counterpoints."
      },
      remember: [
        { vi: "不见得 dùng nhiều trong khẩu ngữ; 未必 dùng nhiều trong văn viết chính luận.", ja: "口語＝不见得、書面語＝未必。", en: "Spoken: 不见得; Written: 未必." }
      ]
    }
  }
];

module.exports = batch6;

