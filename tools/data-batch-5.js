/**
 * tools/data-batch-5.js
 * 
 * 6 Essential HSK Grammar points (HSK4 39-44)
 * Full pedagogical schema adhering to types/grammar.ts
 */

const batch5 = [
  // 39. hsk4_bu_guan_wu_lun_dou
  {
    id: "hsk4_bu_guan_wu_lun_dou",
    level: "HSK4",
    level_num: 4,
    category: "conjunction",
    difficulty: 4,
    frequency: 5,
    register: "neutral",
    keywords: ["不管", "无论", "都", "bùguǎn", "wúlùn", "dōu", "câu vô điều kiện", "no matter", "regardless of"],
    formula: "不管 / 无论 + [Đại từ nghi vấn / Cụm lựa chọn A hay B]，(S) 都 / 也 + Kết quả không đổi",
    formula_plain: {
      vi: "不管 / 无论 (Bất kể / Dù cho) + [Ai/Cái gì/Đâu/A hay B]，(Chủ ngữ) 都 / 也 + Kết quả không đổi",
      ja: "不管／无论 ＋［疑問詞／選択肢AかBか］，都／也 ＋ 結論不変（いかなる条件であれ〜だ）",
      en: "不管 / 无论 (No matter / Regardless of) + [Wh-word / A or B], (S) 都 / 也 + Invariant Result"
    },
    structure_blocks: [
      { label: { vi: "Liên từ vô điều kiện (不管/无论)", ja: "無条件連詞 不管／无论", en: "Unconditional Marker" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Điều kiện biến thiên", ja: "全包括・選択条件", en: "Variable Condition" }, role: "clause", color: "#8B5CF6" },
      { label: { vi: "Phó từ bao quát (都/也)", ja: "総括副詞 都／也", en: "Universal Marker" }, role: "conjunction", color: "#F59E0B" },
      { label: { vi: "Kết quả kiên định", ja: "不変の主節", en: "Invariant Outcome" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk3_interrogative_dou_ye_universal"],
    confusable_with: [
      {
        id: "hsk3_interrogative_dou_ye_universal",
        diff: {
          vi: "Sau 不管 / 无论 BẮT BUỘC phải là thành phần mang tính lựa chọn hoặc nghi vấn (ai, cái gì, A hay B, có hay không). KHÔNG ĐƯỢC đi với một điều kiện đơn nhất khẳng định (sai: 不管下雨，我都去 -> Đúng phải là: 即使下雨 / 不管下不下雨).",
          ja: "「不管／无论」の後ろには必ず選択・疑問要素（什么・A还是B・V不V）が必要です。単一の確定条件は置けません（❌ 不管下雨 ➔ ⭕ 不管下不下雨）。",
          en: "The clause after 不管/无论 MUST contain question words or choices (whether A or B, V or not V). A bare fixed condition is ungrammatical (say 不管下不下雨, not *不管下雨)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu ghép vô điều kiện: 不管 / 无论……都 / 也…… (Bất kể…… đều……)",
        concept: "Dùng để biểu thị trong bất kỳ tình huống, hoàn cảnh nào thì kết quả hay hành vi vẫn luôn giữ nguyên không bao giờ thay đổi.",
        grammar_notes: [
          "Sau 不管/无论 phải có yếu tố nghi vấn hoặc lựa chọn: 不管是谁 (bất kể là ai), 无论去不去 (cho dù đi hay không đi), 不管晴天还是下雨 (bất kể trời nắng hay trời mưa).",
          "Vế sau bắt buộc phải có phó từ 都 hoặc 也 đứng trước vị ngữ.",
          "Phân biệt phong cách: 无论 trang trọng và mang tính văn viết hơn; 不管 mang tính khẩu ngữ đời thường hơn."
        ],
        pedagogical_tips: "Quy tắc thi cử tối thượng: Sau 不管/无论 phải có từ nghi vấn hoặc phương án lựa chọn A hay B."
      },
      ja: {
        title: "無条件複文「不管／无论……都／也……」（〜を問わず、どんなに〜であれ）",
        concept: "どんな条件や事態であっても、結果や態度が常に例外なく一定であることを表します。",
        grammar_notes: [
          "後続節の必須要素：後ろには疑問代名詞（什么・怎么など）、正反（去不去）、または選択肢（A还是B）が必要。",
          "主節の呼応：必ず「都」または「也」を動詞の前に置く。",
          "文体差：「无论」は書面的・フォーマル。「不管」は口語的でくだけた表現。"
        ],
        pedagogical_tips: "「単一の条件は置けない（⭕不管冷不冷 / ❌不管冷）」という頻出トラップを指導します。"
      },
      en: {
        title: "Unconditional Conjunction: 不管 / 无论……都 / 也……",
        concept: "Signifies that regardless of circumstances or conditions, the conclusion or resolution remains constant without exception ('no matter... still...').",
        grammar_notes: [
          "Mandatory inclusion of options: The clause following 不管/无论 MUST feature an interrogative word, affirmative-negative pair (V-not-V), or alternative (A or B).",
          "Clause 2 MUST include the adverb 都 or 也 before the predicate.",
          "Register difference: 无论 is formal/written; 不管 is colloquial/spoken."
        ],
        pedagogical_tips: "Core test point: The condition clause must be variable or inquisitive, never a single static fact."
      }
    },
    fill_template: {
      template_zh: "不管别人怎么看，我{conjunction}要坚持自己的梦想。",
      template_vi: "Bất kể người khác nhìn nhận thế nào, tôi {conjunction} phải kiên trì giấc mơ của mình.",
      slots: [
        { name: "conjunction", type: "adverb", options: ["都", "就", "才", "却"] }
      ]
    },
    collocations: [
      { pattern: "无论什么时候", pinyin: "wúlùn shénme shíhou", meaning_vi: "Bất kể lúc nào", meaning_en: "No matter when" },
      { pattern: "不管多难", pinyin: "bùguǎn duō nán", meaning_vi: "Bất kể khó khăn đến đâu", meaning_en: "No matter how difficult" }
    ],
    examples: [
      {
        zh: "无论遇到什么困难，我们都要坚持下去。",
        pinyin: "Wúlùn yùdào shénme kùnnan, wǒmen dōu yào jiānchí xiàqu.",
        translations: { vi: "Bất kể gặp phải khó khăn gì, chúng tôi cũng đều phải kiên trì tới cùng.", ja: "いかなる困難に遭遇しようとも、私たちは堅持し続けなければならない。", en: "No matter what difficulties we encounter, we must persevere." },
        literal_en: "Regardless encounter what difficulty, we all must persist down-go.",
        scenario: { vi: "Động viên tinh thần quyết tâm vượt khó", ja: "困難に立ち向かう決意表明", en: "Determination in adversity" },
        tone_tip: { vi: "无论 đọc là wúlùn (thanh 2 + thanh 4).", ja: "「无论」は第2声＋第4声です。", en: "wú (2nd) + lùn (4th)." },
        word_order_diff: { vi: "无论 + Yếu tố nghi vấn (什么困难) + Chủ ngữ vế 2 (我们) + 都 + Hành động (坚持下去).", ja: "无论＋疑問名詞，主語＋都＋動詞述語の配置。", en: "无论 + wh-element, S + 都 + Predicate." },
        note: { vi: "Khẳng định ý chí sắt đá không lay chuyển.", ja: "極めて説得力のある公的スピーチの表現です。", en: "Powerful and resolute formal statement." },
        tokens: [
          { hanzi: "无论", pinyin: "wúlùn", han_viet: "vô luận", ja_kanji: "〜にかかわらず", literal_en: "regardless of", block_role: "conjunction" },
          { hanzi: "遇到", pinyin: "yùdào", han_viet: "ngộ đáo", ja_kanji: "遭遇する", literal_en: "encounter", block_role: "verb" },
          { hanzi: "什么", pinyin: "shénme", han_viet: "thập ma", ja_kanji: "どんな", literal_en: "what", block_role: "question_word" },
          { hanzi: "困难", pinyin: "kùnnan", han_viet: "khốn nan", ja_kanji: "困難", literal_en: "difficulty", block_role: "object" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "都", pinyin: "dōu", han_viet: "đô", ja_kanji: "すべて", literal_en: "all", block_role: "adverb" },
          { hanzi: "要", pinyin: "yào", han_viet: "yếu", ja_kanji: "〜すべきだ", literal_en: "must", block_role: "modal" },
          { hanzi: "坚持下去", pinyin: "jiānchí xiàqu", han_viet: "kiên trì hạ khứ", ja_kanji: "貫き通す", literal_en: "persist on", block_role: "verb" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_wulun_1",
        prompt: { vi: "Sắp xếp: 'Bất kể trời mưa hay trời nắng, anh ấy đều chạy bộ.'", ja: "並べ替え：「雨が降ろうと晴れようと、彼は必ずジョギングをする。」", en: "Unscramble: 'Regardless of whether it is sunny or raining, he runs.'" },
        correct_order: ["不管", "晴天", "还是", "下雨", "，", "他", "都", "去", "跑步", "。"],
        tokens: ["他", "还是", "不管", "都", "下雨", "跑步", "去", "晴天", "，", "。"],
        explanation: { vi: "不管 + Lựa chọn A 还是 B (晴天还是下雨)，他 + 都 + 去跑步.", ja: "不管＋A还是B，主語＋都＋述語の配置です。", en: "不管 + A 还是 B, S + 都 + Verb." }
      }
    ],
    fill_blank: [
      {
        id: "fb_wulun_1",
        sentence_zh: "无论是中国人{blank}外国人，都应该遵守法律。",
        answer: "还是",
        options: ["还是", "或者", "但是", "因为"],
        explanation: { vi: "Trong cấu trúc 无论... thì phương án lựa chọn A hay B bắt buộc dùng 还是.", ja: "「无论」構文の中での選択肢並列には「还是」を用います。", en: "Options in 无论 clauses use 还是." }
      }
    ],
    error_correction: [
      {
        id: "ec_wulun_1",
        wrong_sentence: "不管明天下雨，我都要去爬山。",
        correct_sentence: "不管明天是否下雨，我都要去爬山。",
        error_point: { vi: "Sau 不管 lại dùng một sự việc đơn nhất xác định (明天下雨) thay vì cụm lựa chọn.", ja: "「不管」の後ろに単一確定事実を置いてしまった誤文。", en: "Placing a definite single fact after 不管." },
        explanation: { vi: "Sau 不管 phải có tính lựa chọn: 不管明天是否下雨 (hoặc 不管明天下不下雨).", ja: "「不管明天是否下雨」または「不管明天下不下雨」と選択肢にします。", en: "Make it a choice: 不管明天是否下雨 or 不管下不下雨." }
      }
    ],
    quiz: [
      {
        id: "qz_wulun_1",
        question: { vi: "Mệnh đề đi ngay sau 不管 / 无论 có đặc điểm gì bắt buộc?", ja: "「不管／无论」の直後に置く節の必須条件は？", en: "What is the mandatory requirement for the clause immediately following 不管/无论?" },
        options: [
          { text: { vi: "Bắt buộc phải chứa đại từ nghi vấn (什么, 谁) hoặc phương án lựa chọn (A 还是 B, V 不 V)", ja: "疑問詞、A还是B、またはV不Vなどの選択・不確定要素を含まなければならない", en: "Must contain an interrogative word or choices (A or B, V-not-V)" }, correct: true },
          { text: { vi: "Bắt buộc phải là một sự việc cố định đã xảy ra", ja: "確定した単一の事実でなければならない", en: "Must be a single fixed confirmed event" }, correct: false }
        ],
        explanation: { vi: "Bản chất của vô điều kiện là bao quát hết mọi khả năng có thể xảy ra.", ja: "あらゆる分岐シナリオを包括するため、選択・疑問要素が不可欠です。", en: "Needs branching options to cover all possibilities." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "不管/无论 + [Từ nghi vấn / A hay B / V không V]，都/也 + V: Bất kể thế nào thì kết quả vẫn không đổi.",
        ja: "不管／无论＋［疑問詞・選択肢］，都／也＋述語：どんな条件であれ結論は不変。",
        en: "不管/无论 + [Options/Wh-words], 都/也 + V: Regardless of conditions, outcome is unchanged."
      },
      remember: [
        { vi: "Lỗi kinh điển: Cấm nói '不管下雨', phải nói '不管下不下雨' hoặc '无论晴天还是下雨'.", ja: "「不管下雨」❌ ➔ 「不管下不下雨」⭕。", en: "Never say 不管下雨; must be 不管下不下雨." }
      ]
    }
  },

  // 40. hsk4_ji_ran_jiu_causal
  {
    id: "hsk4_ji_ran_jiu_causal",
    level: "HSK4",
    level_num: 4,
    category: "conjunction",
    difficulty: 4,
    frequency: 5,
    register: "neutral",
    keywords: ["既然...就...", "jìrán...jiù...", "đã... thì...", "suy luận nhân quả", "since", "now that"],
    formula: "既然 + Tiền đề / Sự thật đã định，(S) 就 + Suy luận / Lời khuyên / Quyết định",
    formula_plain: {
      vi: "既然 (Đã / Một khi đã) + Sự thật hiển nhiên，(Chủ ngữ) 就 (thì / hãy) + Lời khuyên / Giải pháp",
      ja: "既然（〜である以上は、〜したからには）……，就（……しよう、……すべきだ）",
      en: "既然 (Since / Now that) + Established Fact, (S) 就 (then) + Suggestion / Logical Action"
    },
    structure_blocks: [
      { label: { vi: "Liên từ tiền đề 既然", ja: "既定前提連詞 既然", en: "Premise Marker 既然" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Sự thật tiền đề đã thành", ja: "既成事実・前提節", en: "Established Fact" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Phó từ suy luận 就", ja: "推論副詞 就", en: "Inference 就" }, role: "conjunction", color: "#F59E0B" },
      { label: { vi: "Đề xuất / Giải pháp", ja: "結論・勧告・決定", en: "Logical Conclusion" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk2_yinwei_suoyi"],
    confusable_with: [
      {
        id: "hsk2_yinwei_suoyi",
        diff: {
          vi: "因为...所以... giải thích nguyên nhân khách quan dẫn đến kết quả (Vì trời mưa nên đường ngập). 既然...就... xuất phát từ sự thật đã rồi để đưa ra LỜI KHUYÊN, ĐỀ XUẤT mang tính chủ quan (Đã đến đây rồi thì hãy vào chơi).",
          ja: "因为……所以……は客観的因果関係。既然……就……は「すでに〜なのだから」と前提に立ち、勧告・提案・主観的決定を導きます。",
          en: "因为...所以... states objective causality; 既然...就... takes an established fact as a premise to offer a suggestion, command, or subjective conclusion."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu suy luận nhân quả: 既然……就…… (Đã…… thì……)",
        concept: "Dùng để đặt một sự việc hiển nhiên hoặc sự thật đã rồi làm tiền đề ở vế trước, từ đó đưa ra lời khuyên, kết luận hoặc hành động hợp lý ở vế sau.",
        grammar_notes: [
          "Tiền đề đã xảy ra: 既然来了，就多玩几天吧。 (Đã đến đây rồi thì ở lại chơi thêm mấy ngày nhé).",
          "Vế sau thường là câu cầu khiến, đề nghị hoặc suy luận có chứa 就, 那, 那么.",
          "Phân biệt với 因为: Vế sau của 既然 thường chứa lời khuyên (吧, 应该, 别), không chỉ thuần túy nêu kết quả sự việc."
        ],
        pedagogical_tips: "Chỉ ra bí quyết nhận biết: Vế sau thường có các từ khuyên bảo như 就, 吧, 还是, 应该."
      },
      ja: {
        title: "前提推論複文「既然……就……」（〜したからには、〜以上は）",
        concept: "すでに確定した事実や合意事項を前提として提示し、「それならば当然こうしよう」と相手に提案・助言したり決断を下したりする構文です。",
        grammar_notes: [
          "前提の確定：「既然决定了，就坚持到底」（決めたからには最後までやり抜こう）。",
          "後節の特長：提案や依頼、勧告（「就」「吧」「应该」など）と共起することが極めて多い。",
          "「因为……所以……」との相違：因为は客観的理由、既然は既定事実からの主観的方針提示。"
        ],
        pedagogical_tips: "「既然……，就……吧」の定番提案パターンを練習させます。"
      },
      en: {
        title: "Logical Premise: 既然……就……",
        concept: "Establishes a recognized fact or accomplished reality as a premise with 既然 ('now that / since'), followed by a suggestion, advice, or decision introduced by 就 ('then').",
        grammar_notes: [
          "Established premise: 既然生病了，就好好休息吧。 (Since you are sick, just get some good rest).",
          "Clause 2 typically features proposals or imperatives (often with 就, 吧, 应该).",
          "Contrasts with 因为: 既然 derives practical advice from an acknowledged premise rather than stating objective causality."
        ],
        pedagogical_tips: "Highlight the advisory/imperative nature of Clause 2."
      }
    },
    fill_template: {
      template_zh: "既然你已经答应了，{then_word}一定要做到。",
      template_vi: "Đã hứa rồi {then_word} nhất định phải làm được.",
      slots: [
        { name: "then_word", type: "conjunction", options: ["就", "才", "因为", "虽然"] }
      ]
    },
    collocations: [
      { pattern: "既然来了，就...", pinyin: "jìrán lái le, jiù...", meaning_vi: "Đã đến rồi thì...", meaning_en: "Now that you're here..." },
      { pattern: "既然如此", pinyin: "jìrán rúcǐ", meaning_vi: "Đã như vậy thì...", meaning_en: "Since it is so..." }
    ],
    examples: [
      {
        zh: "既然大家都有空，我们今天就聚一聚吧。",
        pinyin: "Jìrán dàjiā dōu yǒu kòng, wǒmen jīntiān jiù jù yí jù ba.",
        translations: { vi: "Đã là mọi người đều rảnh rỗi, thì hôm nay chúng ta tụ tập một chút nhé.", ja: "みんな時間がある以上は、今日集まって一杯やろうじゃないか。", en: "Since everyone is free, let's get together today." },
        literal_en: "Since everyone all have free-time, we today then gather one gather suggestion.",
        scenario: { vi: "Đề xuất họp mặt bạn bè", ja: "仲間内での集まりの提案", en: "Suggesting a get-together" },
        tone_tip: { vi: "既然 đọc là jìrán (thanh 4 + thanh 2).", ja: "「既然」は第4声＋第2声です。", en: "jì (4th) + rán (2nd)." },
        word_order_diff: { vi: "既然 + Tiền đề (大家都有空) + Chúng ta (我们) + 就 + Hành động đề xuất (聚一聚吧).", ja: "既然＋前提，主語＋就＋提案の順序です。", en: "既然 Premise, S + 就 + Suggestion." },
        note: { vi: "Lời đề nghị xuất phát từ tiền đề thực tế.", ja: "相手を快く促す大人の提案スタイルです。", en: "Natural, polite proposal based on consensus." },
        tokens: [
          { hanzi: "既然", pinyin: "jìrán", han_viet: "ký nhiên", ja_kanji: "〜である以上", literal_en: "since", block_role: "conjunction" },
          { hanzi: "大家", pinyin: "dàjiā", han_viet: "đại gia", ja_kanji: "全員", literal_en: "everyone", block_role: "subject" },
          { hanzi: "都有空", pinyin: "dōu yǒu kòng", han_viet: "đô hữu không", ja_kanji: "暇がある", literal_en: "all are free", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "今天", pinyin: "jīntiān", han_viet: "kim thiên", ja_kanji: "今日", literal_en: "today", block_role: "time" },
          { hanzi: "就", pinyin: "jiù", han_viet: "tựu", ja_kanji: "それなら", literal_en: "then", block_role: "conjunction" },
          { hanzi: "聚一聚", pinyin: "jù yí jù", han_viet: "tụ nhất tụ", ja_kanji: "集まる", literal_en: "get together", block_role: "verb" },
          { hanzi: "吧", pinyin: "ba", han_viet: "ba", ja_kanji: "〜しよう", literal_en: "suggestion", block_role: "particle" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_jiran_1",
        prompt: { vi: "Sắp xếp: 'Đã không thích thì đừng mua.'", ja: "並べ替え：「気に入らないなら、買わないでおきなさい。」", en: "Unscramble: 'Since you don't like it, then don't buy it.'" },
        correct_order: ["既然", "不", "喜欢", "，", "就", "别", "买", "了", "。"],
        tokens: ["喜欢", "既然", "就", "别", "买", "不", "了", "，", "。"],
        explanation: { vi: "既然 + Tiền đề (不喜欢)，就 + Lời khuyên cấm đoán (别买了).", ja: "既然＋前提，就＋別動詞構文です。", en: "既然 Premise, 就 + 别买了." }
      }
    ],
    fill_blank: [
      {
        id: "fb_jiran_1",
        sentence_zh: "{blank}你不想说，那我就不勉强你了。",
        answer: "既然",
        options: ["既然", "虽然", "只要", "为了"],
        explanation: { vi: "Vế trước đưa ra tiền đề 'bạn không muốn nói' nên dùng 既然.", ja: "「話したくないという前提がある以上」なので「既然」です。", en: "Establishes premise: 既然." }
      }
    ],
    error_correction: [
      {
        id: "ec_jiran_1",
        wrong_sentence: "既然今天下雨，所以我们不去了。",
        correct_sentence: "既然今天下雨，我们就不去了。",
        error_point: { vi: "Ghép nhầm 既然 với 所以 (trộn lẫn với 因为...所以...).", ja: "「既然」の相棒に「所以」を当てはめてしまった混同の誤り。", en: "Pairing 既然 with 所以 instead of 就." },
        explanation: { vi: "Đi đôi với 既然 là 就 (hoặc 那/那么), không dùng 所以.", ja: "「既然」には「就」を呼応させます。", en: "Pair 既然 with 就, never with 所以." }
      }
    ],
    quiz: [
      {
        id: "qz_jiran_1",
        question: { vi: "Vế sau của cấu trúc 既然…… thường mang đặc điểm gì?", ja: "「既然……」の後節が持つ最大の特徴は？", en: "What is the key characteristic of the second clause in a 既然... sentence?" },
        options: [
          { text: { vi: "Thường đưa ra đề xuất, lời khuyên hoặc kết luận hợp lý (thường đi với 就, 吧, 别, 应该)", ja: "助言、提案、または主観的決断を表す（就・吧・别・应该などを伴う）", en: "Proposes advice, suggestions, or decisions (often with 就, 吧, 别, 应该)" }, correct: true },
          { text: { vi: "Chỉ thuần túy trần thuật một kết quả khách quan đã xảy ra", ja: "単に客観的な過去の結果のみを淡々と述べる", en: "Merely states a cold objective past result" }, correct: false }
        ],
        explanation: { vi: "既然 mở đầu cho suy luận và hướng giải quyết tiếp theo.", ja: "既定前提からの主観的解決策提示が本質です。", en: "Derives subjective resolution from a premise." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "既然 + Tiền đề sự thật，就 + Lời khuyên/Quyết định: Đã... thì... (đưa ra giải pháp dựa trên sự thật đã rồi).",
        ja: "既然……就……：〜である以上は、〜したからには（既定前提から当然の提案・決断を導く）。",
        en: "既然...就...: 'Since / Now that... then...'; leads from an established premise to logical advice."
      },
      remember: [
        { vi: "Không ghép 既然 với 所以; đối tác chuẩn của 既然 là 就 hoặc 那.", ja: "「既然」のペアは「就」「那」。決して「所以」ではない。", en: "Pair 既然 with 就 or 那, never with 所以." }
      ]
    }
  },

  // 41. hsk4_double_negation_fei_bu_ke
  {
    id: "hsk4_double_negation_fei_bu_ke",
    level: "HSK4",
    level_num: 4,
    category: "negation",
    difficulty: 4,
    frequency: 5,
    register: "neutral",
    keywords: ["非...不可", "不得不", "没有...不", "双重否定", "double negation", "phủ định kép", "must"],
    formula: "非 + Động từ + 不可  hoặc  S + 不得不 + Động từ",
    formula_plain: {
      vi: "非...不可 (Không... không được / Nhất định phải)  hoặc  不得不 (Buộc lòng phải / Không thể không)",
      ja: "非……不可（絶対に〜しなければならない） ｜ 不得不（〜せざるを得ない・余儀なくされる）",
      en: "非...不可 (Must / Bound to) | 不得不 (Have no choice but to / Cannot help but)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phủ định 1 (非/不得不)", ja: "第1否定辞", en: "Negation 1" }, role: "negation", color: "#EF4444" },
      { label: { vi: "Động từ hành động", ja: "主動詞", en: "Action Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Phủ định 2 (不可)", ja: "第2否定辞", en: "Negation 2" }, role: "particle", color: "#EC4899" }
    ],
    related_ids: ["hsk1_bu_negation"],
    confusable_with: [
      {
        id: "hsk1_bu_negation",
        diff: {
          vi: "Phủ định kép (2 lần phủ định) tạo thành một lời khẳng định CỰC KỲ MẠNH MẼ, mang tính quyết tâm sắt đá (非去不可 - nhất định phải đi) hoặc bắt buộc tình thế (不得不去 - buộc phải đi).",
          ja: "二重否定は単なる肯定よりもはるかに強い「必然性・強い意志・やむを得ない義務」を表します。",
          en: "Double negation yields an emphatic affirmative, expressing intense determination or unavoidable necessity."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc phủ định kép nhấn mạnh: 非……不可 và 不得不……",
        concept: "Dùng hai từ mang nghĩa phủ định kết hợp với nhau nhằm tạo thành một ý khẳng định mạnh mẽ gấp nhiều lần: biểu thị sự bắt buộc không thể né tránh, hoặc quyết tâm sắt đá phải làm bằng được.",
        grammar_notes: [
          "非...不可: Biểu thị ý chí sắt đá 'nhất định phải' (这件事我非弄明白不可 - Việc này tôi nhất định phải làm rõ mới được).",
          "不得不: Biểu thị sự bất đắc dĩ 'buộc lòng phải' do hoàn cảnh ép buộc (因为生病，他不得不请假 - Vì bị ốm nên anh ấy buộc phải xin nghỉ).",
          "没有...不...: Khẳng định 100% không ngoại lệ (这里的人没有不认识他的 - Người ở đây không ai là không biết anh ấy)."
        ],
        pedagogical_tips: "Chỉ ra sắc thái cảm xúc: 非...不可 mang tính chủ động quyết tâm; 不得不 mang tính bị động bất đắc dĩ."
      },
      ja: {
        title: "二重否定強調構文「非……不可」「不得不……」",
        concept: "2つの否定辞を重ねて強い肯定のニュアンス（「絶対に〜する」「〜せざるを得ない」）を打ち出す高度な構文です。",
        grammar_notes: [
          "非……不可（強い意志・必然性）：「这道题我非做出来不可」（この難問は自力で絶対に解いてみせる）。",
          "不得不（消極的義務・やむを得ない選択）：「时间太晚了，我不得不告辞」（もう遅いので失礼せざるを得ません）。",
          "没有……不……（例外のない全称肯定）：「大家没有不赞成的」（反対する者は一人もいない＝全員大賛成だ）。"
        ],
        pedagogical_tips: "「非……不可＝主体的決意」「不得不＝客観的余儀なさ」のニュアンスの違いを対比させます。"
      },
      en: {
        title: "Double Negation Emphasis: 非……不可 and 不得不……",
        concept: "Using two negatives to express an intense affirmative with high emotional impact: resolute determination or unavoidable constraint.",
        grammar_notes: [
          "非...不可 (Unyielding resolution / absolute necessity): 我非学好汉语不可 (I am determined to master Chinese).",
          "不得不 (Compelled necessity / no other choice): 面对现实，我们不得不放弃 (Faced with reality, we had no choice but to give up).",
          "没有...不... (No exceptions whatsoever): 没有人不喜欢他 (No one doesn't like him = Everyone loves him)."
        ],
        pedagogical_tips: "Contrast: 非...不可 represents strong active will; 不得不 represents reluctant compliance."
      }
    },
    fill_template: {
      template_zh: "为了明天的考试，今天晚上我{double_neg}复习不可。",
      template_vi: "Vì kỳ thi ngày mai, tối nay tôi {double_neg} ôn tập không được.",
      slots: [
        { name: "double_neg", type: "negation", options: ["非", "不得不", "没有", "不"] }
      ]
    },
    collocations: [
      { pattern: "不得不承认", pinyin: "bùdébù chéngrèn", meaning_vi: "Buộc phải thừa nhận", meaning_en: "Have to admit" },
      { pattern: "非去不可", pinyin: "fēi qù bùkě", meaning_vi: "Nhất định phải đi", meaning_en: "Must go / bound to go" }
    ],
    examples: [
      {
        zh: "天下着大雨，我们不得不取消爬山计划。",
        pinyin: "Tiān xià zhe dàyǔ, wǒmen bùdébù qǔxiāo páshān jìhuà.",
        translations: { vi: "Trời đang đổ mưa to, chúng tôi buộc lòng phải hủy bỏ kế hoạch leo núi.", ja: "大雨が降っているため、私たちは登山計画を中止せざるを得ませんでした。", en: "It was raining heavily, so we had no choice but to cancel the hiking plan." },
        literal_en: "Sky rain-falling heavy-rain, we not-have-to cancel climb-mountain plan.",
        scenario: { vi: "Hủy bỏ hoạt động vì thời tiết bất khả kháng", ja: "天候不良によるやむなき予定中止", en: "Cancelling plans due to weather" },
        tone_tip: { vi: "不得不 đọc là bùdébù.", ja: "「不得不」は第4声＋第2声＋第4声です。", en: "Pronounced bùdébù." },
        word_order_diff: { vi: "S (我们) + 不得不 + Động từ (取消).", ja: "主語＋不得不＋動詞の標準配置。", en: "Subject + 不得不 + Verb." },
        note: { vi: "Thể hiện sự bất đắc dĩ do ngoại cảnh chi phối.", ja: "外部事情により強いられた選択を表します。", en: "Reluctant unavoidable action." },
        tokens: [
          { hanzi: "天下着大雨", pinyin: "tiān xià zhe dàyǔ", han_viet: "thiên hạ trước đại vũ", ja_kanji: "大雨が降っている", literal_en: "it's raining heavily", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "我们", pinyin: "wǒmen", han_viet: "ngã môn", ja_kanji: "私たち", literal_en: "we", block_role: "subject" },
          { hanzi: "不得不", pinyin: "bùdébù", han_viet: "bất đắc bất", ja_kanji: "〜せざるを得ない", literal_en: "have no choice but to", block_role: "negation" },
          { hanzi: "取消", pinyin: "qǔxiāo", han_viet: "thủ tiêu", ja_kanji: "取り消す", literal_en: "cancel", block_role: "verb" },
          { hanzi: "爬山计划", pinyin: "páshān jìhuà", han_viet: "ba sơn kế hoạch", ja_kanji: "登山計画", literal_en: "hiking plan", block_role: "object" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_feibu_1",
        prompt: { vi: "Sắp xếp: 'Việc này tôi nhất định phải tự mình đi làm mới xong.'", ja: "並べ替え：「この件は私が自ら行かなければならない。」", en: "Unscramble: 'For this matter, I must go in person.'" },
        correct_order: ["这", "件", "事", "我", "非", "亲自", "去", "不可", "。"],
        tokens: ["非", "我", "亲自", "这", "不可", "事", "去", "件", "。"],
        explanation: { vi: "S (我) + 非 + Hành động (亲自去) + 不可.", ja: "主語＋非＋動作＋不可の固い決意構文です。", en: "Subject + 非 + Action + 不可." }
      }
    ],
    fill_blank: [
      {
        id: "fb_feibu_1",
        sentence_zh: "听到这个好消息，他兴奋得{blank}跳起来不可。",
        answer: "非",
        options: ["非", "不得不", "也", "就"],
        explanation: { vi: "Đi kèm với 不可 ở sau là cấu trúc 非...不可.", ja: "文末の「不可」と呼応して強い衝動を表すのは「非」です。", en: "Pairs with final 不可 in 非...不可." }
      }
    ],
    error_correction: [
      {
        id: "ec_feibu_1",
        wrong_sentence: "这件事他非去不行不可。",
        correct_sentence: "这件事他非去不可。",
        error_point: { vi: "Dùng lặp lại cả 不行 lẫn 不可 gây thừa thãi lộn xộn.", ja: "「非……不可」の中に「不行」を二重に詰め込んでしまった誤文。", en: "Redundantly mixing 不行 and 不可." },
        explanation: { vi: "Chỉ chọn một mẫu chuẩn: 非去不可 (hoặc 不去不行).", ja: "「非去不可」または「不去不行」のどちらか一方にします。", en: "Say 非去不可 or 不去不行, not both." }
      }
    ],
    quiz: [
      {
        id: "qz_feibu_1",
        question: { vi: "Từ '不得不' mang sắc thái ý nghĩa nào nổi bật nhất?", ja: "「不得不」が持つ固有のニュアンスは？", en: "What is the primary nuance of '不得不'?" },
        options: [
          { text: { vi: "Buộc lòng phải làm do hoàn cảnh khách quan chi phối (bất đắc dĩ)", ja: "客観的状況により、やむを得ずそうせざるを得ない（消極的・余儀なさ）", en: "Reluctantly forced to act due to objective circumstances" }, correct: true },
          { text: { vi: "Hoàn toàn tự nguyện, vui vẻ chủ động thực hiện", ja: "自発的で喜んで進んで行う", en: "Completely voluntary and enthusiastic" }, correct: false }
        ],
        explanation: { vi: "不得不 biểu thị tình thế bắt buộc, không còn sự lựa chọn nào khác.", ja: "「不承不承ながらそうせざるを得ない」境遇を描写します。", en: "Conveys having no other viable option." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Phủ định kép: 非...不可 (nhất định phải - quyết tâm chủ động); 不得不 (buộc phải - bất đắc dĩ bị động).",
        ja: "二重否定構文：非……不可（絶対に〜する・主体的決意）；不得不（〜せざるを得ない・余儀ない制約）。",
        en: "Double negation: 非...不可 (must do - active resolve); 不得不 (have to - reluctant necessity)."
      },
      remember: [
        { vi: "Phủ định kép = Khẳng định mạnh mẽ gấp đôi.", ja: "二重の否定は強い肯定を生み出す。", en: "Two negatives yield an intensified positive." }
      ]
    }
  },

  // 42. hsk4_rhetorical_questions
  {
    id: "hsk4_rhetorical_questions",
    level: "HSK4",
    level_num: 4,
    category: "question",
    difficulty: 4,
    frequency: 5,
    register: "spoken",
    keywords: ["反问句", "难道...吗", "不是...吗", "rhetorical questions", "câu hỏi tu từ", "lẽ nào", "chẳng phải... sao"],
    formula: "难道 + Câu khẳng định/phủ định + 吗？  hoặc  不是 + Khẳng định + 吗？",
    formula_plain: {
      vi: "难道...吗？ (Lẽ nào... hay sao?)  |  不是...吗？ (Chẳng phải là... sao?)",
      ja: "难道……吗？（まさか〜ではあるまい／一体〜なのか？） ｜ 不是……吗？（〜ではないか？）",
      en: "难道...吗? (Could it be that...? / Don't tell me...) | 不是...吗? (Isn't it... / Aren't you...?)"
    },
    structure_blocks: [
      { label: { vi: "Phó từ tu từ 难道 / 不是", ja: "反語副詞 难道／不是", en: "Rhetorical Marker" }, role: "question_word", color: "#EC4899" },
      { label: { vi: "Mệnh đề nghi vấn tu từ", ja: "反語平叙節", en: "Rhetorical Clause" }, role: "clause", color: "#3B82F6" },
      { label: { vi: "Trợ từ ngữ khí 吗", ja: "語気助詞 吗", en: "Particle 吗" }, role: "particle", color: "#8B5CF6" }
    ],
    related_ids: ["hsk1_ma_yes_no_question"],
    confusable_with: [
      {
        id: "hsk1_ma_yes_no_question",
        diff: {
          vi: "Câu hỏi tu từ hình thức là câu hỏi nhưng KHÔNG CẦN TRẢ LỜI, mà dùng ngữ điệu nghi vấn để khẳng định hoặc phủ định một chân lý hiển nhiên với cảm xúc mạnh mẽ.",
          ja: "反語文は答えを求める疑問文ではなく、「反語の形をとって強い断定・皮肉・強調」を行う表現です。",
          en: "Rhetorical questions seek no answer; they use the question form to deliver a potent assertion, reminder, or reproach."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu hỏi tu từ: 难道……吗？ (Lẽ nào…… sao?) và 不是……吗？ (Chẳng phải…… sao?)",
        concept: "Dùng hình thức hỏi nhưng bản chất là để khẳng định chắc nịch một chân lý, nhắc nhở hoặc phê bình, chất vấn người đối diện với sắc thái ngữ khí vô cùng mạnh mẽ.",
        grammar_notes: [
          "难道...吗?: Dùng hình thức khẳng định để ngầm phủ định (难道你不知道吗？ = Lẽ nào bạn không biết? -> Ý là bạn thừa biết rồi).",
          "不是...吗?: Dùng hình thức phủ định để khẳng định chắc nịch (你不是答应我了吗？ = Chẳng phải bạn đã hứa với tôi rồi sao? -> Ý là bạn đã hứa rồi, sao lại quên).",
          "Đặc điểm: Giọng điệu thường đi kèm cảm xúc ngạc nhiên, trách móc hoặc nhấn mạnh sự thật hiển nhiên."
        ],
        pedagogical_tips: "Dạy học sinh quy tắc đối ứng: Hỏi khẳng định = Ý phủ định; Hỏi phủ định = Ý khẳng định."
      },
      ja: {
        title: "反語表現「难道……吗？」「不是……吗？」",
        concept: "疑問文の形式を取りながら、実際には聞き手に答えを求めず、自明の事実を強い感情（強調・非難・驚き）を込めて主張する構文です。",
        grammar_notes: [
          "难道……吗？（まさか〜ではあるまい）：「难道你忘了吗？」（まさか忘れたわけじゃないよね？＝覚えているはずだ）。",
          "不是……吗？（〜ではないか）：反語的肯定。「我们不是约好两点吗？」（2時に約束したじゃないか！）。",
          "反語の鉄則：肯定形で問いかけると否定の意味、否定形で問いかけると強い肯定の意味になる。"
        ],
        pedagogical_tips: "「肯定の問い＝否定の断定」「否定の問い＝強い肯定」の極性逆転ルールを徹底します。"
      },
      en: {
        title: "Rhetorical Questions: 难道……吗? and 不是……吗?",
        concept: "Uses interrogative phrasing not to solicit information, but to assert a point forcefully, express disbelief, or reproach the listener.",
        grammar_notes: [
          "难道...吗? ('Don't tell me...'): 难道你不知道吗? (Don't tell me you didn't know? -> You definitely knew).",
          "不是...吗? ('Isn't it true that...?'): 我们不是说好了吗? (Didn't we agree on this? -> We agreed, why renege?).",
          "Core logic: Positive rhetorical question implies a strong negative; negative rhetorical question implies a strong positive."
        ],
        pedagogical_tips: "Drill the polarity reversal: Question positive = Meaning negative, and vice versa."
      }
    },
    fill_template: {
      template_zh: "这件事这么重要，{rhetorical}你真的不知道吗？",
      template_vi: "Việc này quan trọng như vậy, {rhetorical} bạn thực sự không biết hay sao?",
      slots: [
        { name: "rhetorical", type: "adverb", options: ["难道", "不仅", "既然", "虽然"] }
      ]
    },
    collocations: [
      { pattern: "难道不是吗？", pinyin: "nándào bú shì ma?", meaning_vi: "Lẽ nào lại không phải như vậy sao?", meaning_en: "Isn't that so?" },
      { pattern: "你不是说...", pinyin: "nǐ bú shì shuō...", meaning_vi: "Chẳng phải bạn nói là...", meaning_en: "Didn't you say that..." }
    ],
    examples: [
      {
        zh: "你不是说今天有空吗？怎么又加班了？",
        pinyin: "Nǐ bú shì shuō jīntiān yǒu kòng ma? Zěnme yòu jiābān le?",
        translations: { vi: "Chẳng phải bạn nói hôm nay rảnh rỗi sao? Sao lại tăng ca nữa rồi?", ja: "今日暇だって言ってたじゃない？どうしてまた残業なの？", en: "Didn't you say you were free today? Why are you working overtime again?" },
        literal_en: "You not are say today have free question? Why again work-overtime particle?",
        scenario: { vi: "Trách móc bạn vì hủy hẹn đột xuất", ja: "ドタキャンされたことへの咎め", en: "Questioning a cancelled date" },
        tone_tip: { vi: "不是说 đọc với ngữ điệu ngạc nhiên, chất vấn.", ja: "「不是说」は強い疑念と不満を込めて高めに発声します。", en: "Delivered with questioning incredulity." },
        word_order_diff: { vi: "S (你) + 不是... 吗？ tạo thành câu hỏi tu từ nhắc lại lời đã hứa.", ja: "「你＋不是＋動詞句＋吗？」で相手の以前の発言を突く反語文。", en: "You + 不是 + Verb + 吗? calls out broken agreement." },
        note: { vi: "Dùng thể phủ định (不是) để khẳng định mạnh mẽ: 'Bạn rõ ràng đã nói thế'.", ja: "「言っていたはずだ」という強い断定を表します。", en: "Forcefully asserts: 'You clearly said so'." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "不是", pinyin: "bú shì", han_viet: "bất thị", ja_kanji: "〜ではないか", literal_en: "isn't it that", block_role: "question_word" },
          { hanzi: "说", pinyin: "shuō", han_viet: "thuyết", ja_kanji: "言う", literal_en: "said", block_role: "verb" },
          { hanzi: "今天有空", pinyin: "jīntiān yǒu kòng", han_viet: "kim thiên hữu không", ja_kanji: "今日時間がある", literal_en: "free today", block_role: "clause" },
          { hanzi: "吗", pinyin: "ma", han_viet: "ma", ja_kanji: "か", literal_en: "question", block_role: "particle" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_rhet_1",
        prompt: { vi: "Sắp xếp: 'Lẽ nào bạn không muốn cùng đi với chúng tôi sao?'", ja: "並べ替え：「まさか私たちと一緒に行きたくないのですか？」", en: "Unscramble: 'Could it be that you don't want to go with us?'" },
        correct_order: ["难道", "你", "不", "想", "跟", "我们", "一起", "去", "吗", "？"],
        tokens: ["跟", "我们", "想", "难道", "不", "你", "一起", "去", "吗", "？"],
        explanation: { vi: "难道 + S (你) + Vị ngữ (不想跟我们一起去) + 吗？", ja: "难道＋主語＋述語＋吗？の反語語順です。", en: "难道 + S + Predicate + 吗?" }
      }
    ],
    fill_blank: [
      {
        id: "fb_rhet_1",
        sentence_zh: "天天吃快餐，身体{blank}能好吗？",
        answer: "难道",
        options: ["难道", "不仅", "虽然", "只有"],
        explanation: { vi: "Dùng 难道... 能好吗 biểu thị ý tu từ mỉa mai: Ăn đồ ăn nhanh hàng ngày thì sức khỏe làm sao mà tốt được!", ja: "反語の強調「难道……能好吗」（健康に良いわけがない）なので「难道」です。", en: "Rhetorical question emphasizing impossibility: 难道." }
      }
    ],
    error_correction: [
      {
        id: "ec_rhet_1",
        wrong_sentence: "难道他不知道这件事。",
        correct_sentence: "难道他不知道这件事吗？",
        error_point: { vi: "Thiếu trợ từ nghi vấn 吗 và dấu chấm hỏi cuối câu tu từ 难道.", ja: "「难道」構文の末尾の「吗」と疑問符が脱落している誤文。", en: "Missing final 吗 and question mark with 难道." },
        explanation: { vi: "Câu dùng 难道 cần đi kèm 吗 ở cuối câu: 难道他不知道这件事吗？", ja: "文末に「吗？」を補います。", en: "Add 吗? to the end of 难道 questions." }
      }
    ],
    quiz: [
      {
        id: "qz_rhet_1",
        question: { vi: "Câu '难道你没听见吗？' thực chất muốn nói điều gì?", ja: "「难道你没听见吗？」が実際に意味している本音は？", en: "What does '难道你没听见吗？' actually mean?" },
        options: [
          { text: { vi: "Bạn chắc chắn là đã nghe thấy rồi (sao còn giả vờ như không biết)", ja: "あなたは絶対に聞こえていたはずだ（なぜ無視するのか）", en: "You definitely heard it (why act like you didn't?)" }, correct: true },
          { text: { vi: "Tôi hỏi bạn xem bạn có nghe thấy thật không", ja: "純粋に聴力をテストしている", en: "Genuinely asking about your hearing ability" }, correct: false }
        ],
        explanation: { vi: "Câu hỏi tu từ phủ định (没听见) mang nghĩa khẳng định mạnh mẽ: Thừa sức nghe thấy.", ja: "反語否定は強烈な肯定事実を突きつけます。", en: "Negative rhetorical question forcefully implies affirmative truth." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "难道...吗？ / 不是...吗？: Câu hỏi tu từ không cần đáp; dùng chất vấn, phê bình hoặc khẳng định chân lý.",
        ja: "难道……吗？／不是……吗？：反語構文。答えを求めず、強い非難・自明の断定を投げかける。",
        en: "难道...吗? / 不是...吗?: Rhetorical questions; deliver intense assertions or reproaches without seeking replies."
      },
      remember: [
        { vi: "Quy tắc đảo cực: Hỏi phủ định (没/不) = Khẳng định chắc chắn.", ja: "否定の反語問い ➔ 確信に満ちた肯定の意味。", en: "Negative question = Strong affirmative assertion." }
      ]
    }
  },

  // 43. hsk4_directional_complement_figurative
  {
    id: "hsk4_directional_complement_figurative",
    level: "HSK4",
    level_num: 4,
    category: "complement",
    difficulty: 4,
    frequency: 5,
    register: "neutral",
    keywords: ["趋向补语引申义", "起来", "下去", "出来", "过来", "figurative directional complement", "nghĩa bóng bổ ngữ xu hướng"],
    formula: "V + 起来 (Bắt đầu/Đánh giá)  |  V + 下去 (Tiếp tục)  |  V + 出来 (Nhận ra)  |  V + 过来 (Hồi phục)",
    formula_plain: {
      vi: "Động từ + Bổ ngữ xu hướng dùng theo NGHĨA BÓNG: 起来 (bắt đầu), 下去 (tiếp tục), 出来 (nhận ra), 过来 (tỉnh lại/quay lại trạng thái tốt)",
      ja: "動詞 ＋ 方向補語の派生義（引申義）：起来（開始・評価）、下去（継続）、出来（識別・出現）、过来（正常状態への復帰）",
      en: "Verb + Figurative Directional Complement: 起来 (commence/evaluate), 下去 (continue), 出来 (discern/reveal), 过来 (restore/recover)"
    },
    structure_blocks: [
      { label: { vi: "Động từ chính", ja: "動詞", en: "Main Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Bổ ngữ xu hướng nghĩa bóng", ja: "派生義方向補語", en: "Figurative Direction Complement" }, role: "complement", color: "#EC4899" }
    ],
    related_ids: ["hsk2_directional_complement_simple", "hsk3_compound_directional_complement"],
    confusable_with: [
      {
        id: "hsk3_compound_directional_complement",
        diff: {
          vi: "Bổ ngữ xu hướng gốc chỉ chuyển động vật lý không gian (站起来 - đứng dậy). Nghĩa bóng mở rộng sang trạng thái trừu tượng: 笑起来 (bắt đầu cười), 坚持下去 (tiếp tục kiên trì), 看出来 (nhìn nhận ra).",
          ja: "本来の空間的移動（立ち上がるなど）から抽象的なアスペクト（動作の開始、継続、識別、回復）へと派生した用法です。",
          en: "Extends literal physical 3D movements into abstract aspectual meanings (inception, continuation, discernment, recovery)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Nghĩa bóng của bổ ngữ xu hướng (起来, 下去, 出来, 过来)",
        concept: "Các bổ ngữ xu hướng khi đi sau động từ trừu tượng sẽ chuyển sang biểu đạt các sắc thái ngữ pháp tinh tế: khởi phát, duy trì, phát hiện hoặc hồi phục.",
        grammar_notes: [
          "V + 起来: Biểu thị hành động bắt đầu và có xu hướng tiếp diễn (唱起来 - cất tiếng hát), hoặc góc độ đánh giá (看起来 - nhìn qua thấy, 听起来 - nghe chừng).",
          "V + 下去: Biểu thị hành động đang diễn ra tiếp tục kéo dài không ngừng (坚持下去 - kiên trì tiếp, 读下去 - đọc tiếp).",
          "V + 出来: Nhận biết, phân biệt từ không rõ thành rõ ràng (看出来 - nhìn nhận ra, 想出来 - nghĩ ra giải pháp).",
          "V + 过来: Hồi phục về trạng thái bình thường từ trạng thái xấu (醒过来 - tỉnh lại, 改过来 - sửa lại cho đúng)."
        ],
        pedagogical_tips: "Cực kỳ trọng tâm trong các bài đọc hiểu và chọn từ điền chỗ trống của HSK 4 và HSK 5."
      },
      ja: {
        title: "方向補語の派生義（引申義：起来・下去・出来・过来）",
        concept: "空間的な移動を表す補語が、時間的経過や心理的認識といった抽象的領域へ意味を拡張させた用法です。",
        grammar_notes: [
          "起来（開始と継続／評価）：笑起来（笑い始める）、看起来（見たところ）。",
          "下去（動作の継続）：坚持下去（やり抜く）、说下去（話を続ける）。",
          "出来（識別・新案の創出）：看出来（見てわかる）、想出来一个办法（アイデアを思いつく）。",
          "过来（正常状態への復帰）：醒过来（意識を取り戻す）、改过来（誤りを正す）。"
        ],
        pedagogical_tips: "各補語の持つ「抽象的コアイメージ（開始・継続・出現・復帰）」を図解で解説します。"
      },
      en: {
        title: "Figurative Meanings of Directional Complements",
        concept: "Directional complements attached to abstract verbs to express aspectual nuances: inception, continuation, revelation, or recovery.",
        grammar_notes: [
          "V + 起来: Inception (唱起来 - start singing) or subjective angle (看起来 - looks like, 尝起来 - tastes like).",
          "V + 下去: Continuation of an ongoing action into the future (学下去 - continue studying).",
          "V + 出来: Discernment or creating something out of nothing (认出来 - recognize, 想出来 - figure out).",
          "V + 过来: Recovery from an abnormal to a normal state (醒过来 - wake up/revive, 改过来 - correct an error)."
        ],
        pedagogical_tips: "Connect each complement to its conceptual metaphor (start, continue, emerge, recover)."
      }
    },
    fill_template: {
      template_zh: "不管多艰难，我们也要坚持{direction}。",
      template_vi: "Bất kể gian nan thế nào, chúng ta cũng phải kiên trì {direction}.",
      slots: [
        { name: "direction", type: "complement", options: ["下去", "起来", "出来", "过来"] }
      ]
    },
    collocations: [
      { pattern: "看起来", pinyin: "kàn qǐlai", meaning_vi: "Xem ra / Trông có vẻ", meaning_en: "Looks like / Seems" },
      { pattern: "坚持下去", pinyin: "jiānchí xiàqu", meaning_vi: "Tiếp tục kiên trì", meaning_en: "Persist on" }
    ],
    examples: [
      {
        zh: "你能看出来他们俩是双胞胎吗？",
        pinyin: "Nǐ néng kàn chū lai tāmen liǎ shì shuāngbāotāi ma?",
        translations: { vi: "Bạn có nhìn nhận ra hai người bọn họ là anh em sinh đôi không?", ja: "2人が双子だって見分けがつきますか？", en: "Can you tell that the two of them are twins?" },
        literal_en: "You can see out-come they two are twins question?",
        scenario: { vi: "Đố phân biệt cặp song sinh", ja: "双子の識別について尋ねる", en: "Recognizing twins" },
        tone_tip: { vi: "出来 đọc thanh nhẹ (chū lai).", ja: "「出来」は軽声で軽く添えます。", en: "chū lai is pronounced lightly." },
        word_order_diff: { vi: "Nhìn nhận ra dùng bổ ngữ 看出来 (phát hiện ra sự thật).", ja: "識別の「看出来」を用います。", en: "Uses 看出来 to express discernment." },
        note: { vi: "出來 ở đây mang nghĩa nhận biết phân biệt qua thị giác.", ja: "感覚による識別を表す代表例です。", en: "Expresses visual discernment." },
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "貴方", literal_en: "you", block_role: "subject" },
          { hanzi: "能", pinyin: "néng", han_viet: "năng", ja_kanji: "〜できる", literal_en: "can", block_role: "modal" },
          { hanzi: "看出来", pinyin: "kàn chū lai", han_viet: "khán xuất lai", ja_kanji: "見分ける", literal_en: "tell/discern", block_role: "verb" },
          { hanzi: "他们俩", pinyin: "tāmen liǎ", han_viet: "tha môn lưỡng", ja_kanji: "彼ら2人", literal_en: "the two of them", block_role: "subject" },
          { hanzi: "是", pinyin: "shì", han_viet: "thị", ja_kanji: "〜である", literal_en: "are", block_role: "copula" },
          { hanzi: "双胞胎", pinyin: "shuāngbāotāi", han_viet: "song bào thai", ja_kanji: "双子", literal_en: "twins", block_role: "object" },
          { hanzi: "吗", pinyin: "ma", han_viet: "ma", ja_kanji: "か", literal_en: "question", block_role: "particle" },
          { hanzi: "？", pinyin: "?", han_viet: "", ja_kanji: "？", literal_en: "?", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_figdir_1",
        prompt: { vi: "Sắp xếp: 'Nghe xong câu chuyện, mọi người đều cười òa lên.'", ja: "並べ替え：「話を聞き終えると、みんな笑い出した。」", en: "Unscramble: 'After hearing the story, everyone burst out laughing.'" },
        correct_order: ["听完", "故事", "，", "大家", "都", "笑", "了", "起来", "。"],
        tokens: ["故事", "都", "起来", "大家", "听完", "笑", "了", "，", "。"],
        explanation: { vi: "Bắt đầu cười dùng 笑了起来.", ja: "笑い始める動作の開始は「笑了起来」です。", en: "Bursting out laughing takes 笑了起来." }
      }
    ],
    fill_blank: [
      {
        id: "fb_figdir_1",
        sentence_zh: "病人终于醒{blank}了，医生松了一口气。",
        answer: "过来",
        options: ["过来", "过去", "起来", "下去"],
        explanation: { vi: "Hồi phục ý thức từ cơn hôn mê dùng 醒过来.", ja: "昏睡や意識喪失から正常に目覚める復帰なので「醒过来」です。", en: "Regaining consciousness from coma takes 醒过来." }
      }
    ],
    error_correction: [
      {
        id: "ec_figdir_1",
        wrong_sentence: "请大家坚持起来，不要放弃。",
        correct_sentence: "请大家坚持下去，不要放弃。",
        error_point: { vi: "Dùng nhầm 起来 thay vì 下去 để biểu thị tiếp tục duy trì hành động.", ja: "動作の継続に「起来」を使ってしまった誤り。", en: "Using 起来 instead of 下去 for ongoing persistence." },
        explanation: { vi: "Biểu thị tiếp tục kiên trì về sau phải dùng 坚持下去.", ja: "将来への継続は「下去」を用います（坚持下去）。", en: "Continuing an ongoing effort requires 下去: 坚持下去." }
      }
    ],
    quiz: [
      {
        id: "qz_figdir_1",
        question: { vi: "Cụm từ '看出来' mang hàm nghĩa trừu tượng nào?", ja: "「看出来」が持つ抽象的な意味合いは？", en: "What abstract meaning does '看出来' convey?" },
        options: [
          { text: { vi: "Thông qua quan sát mà nhận biết, phát hiện ra bí mật/sự thật", ja: "目で見て識別する、隠された事実を見抜く", en: "Discerning or discovering truth through visual observation" }, correct: true },
          { text: { vi: "Đi ra ngoài để nhìn", ja: "外に出て見る（物理移動）", en: "Going outside to look" }, correct: false }
        ],
        explanation: { vi: "出来 ở đây là bổ ngữ nghĩa bóng chỉ sự phát hiện ra.", ja: "「出来」は潜在していたものが顕在化する認識を表します。", en: "出来 represents revelation from hidden to revealed." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Bổ ngữ xu hướng nghĩa bóng: 起来 (bắt đầu/đánh giá), 下去 (tiếp tục), 出来 (nhận ra), 过来 (hồi phục tốt).",
        ja: "方向補語の派生義：起来（開始・評価）、下去（継続）、出来（識別・出現）、过来（正常状態への復帰）。",
        en: "Figurative Complements: 起来 (start/evaluate), 下去 (continue), 出来 (discern), 过来 (recover)."
      },
      remember: [
        { vi: "Phân biệt then chốt: 坚持下去 (kiên trì tiếp) vs 笑了起来 (bắt đầu cười òa).", ja: "「坚持下去（継続）」対「笑了起来（開始）」。", en: "坚持下去 (continuation) vs 笑了起来 (inception)." }
      ]
    }
  },

  // 44. hsk4_yi_wei_vs_ren_wei
  {
    id: "hsk4_yi_wei_vs_ren_wei",
    level: "HSK4",
    level_num: 4,
    category: "sentence_pattern",
    difficulty: 4,
    frequency: 5,
    register: "neutral",
    keywords: ["以为", "认为", "yǐwéi", "rènwéi", "phân biệt dĩ vi và nhận vi", "tưởng rằng", "cho rằng"],
    formula: "S + 以为 + Phán đoán (thường sai thực tế)  VS  S + 认为 + Ý kiến (khách quan/chính thức)",
    formula_plain: {
      vi: "以为 (Tưởng rằng - thực tế không phải như vậy)  VS  认为 (Cho rằng - quan điểm, nhận định)",
      ja: "以为（〜だと思い込んでいた・実は違った） VS 认为（〜だと考える・見解を持つ）",
      en: "以为 (Mistakenly thought / Assumed incorrectly) VS 认为 (Think / Deem / Believe objectively)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ", ja: "主語", en: "Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ tâm lý (以为/认为)", ja: "思考動詞 以为／认为", en: "Mental Verb" }, role: "verb", color: "#EC4899" },
      { label: { vi: "Mệnh đề nhận định", ja: "思考内容節", en: "Opinion Clause" }, role: "clause", color: "#10B981" }
    ],
    related_ids: ["hsk1_modal_hui_neng_xiang"],
    confusable_with: [
      {
        id: "hsk1_modal_hui_neng_xiang",
        diff: {
          vi: "以为 luôn ngầm mang hàm ý 'người nói tưởng thế nhưng THỰC TẾ LẠI HOÀN TOÀN KHÁC' (我以为你没来呢 - Tôi cứ tưởng bạn không đến, hóa ra bạn đã đến). 认为 là đưa ra quan điểm, phân tích khách quan (我认为这个问题很重要).",
          ja: "「以为」は事実と異なる思い込み（誤解）を表します。「认为」は主観的な正式な意見や主張を述べます。",
          en: "以为 carries the implicit connotation that the assumption turned out to be WRONG; 认为 expresses a reasoned opinion."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phân biệt động từ tâm lý: 以为 (tưởng rằng - sai sự thật) và 认为 (cho rằng)",
        concept: "Dùng để biểu đạt suy nghĩ và quan điểm, nhưng mang sắc thái đối lập: 以为 chỉ sự ngộ nhận, phán đoán sai lệch so với thực tế; còn 认为 chỉ quan điểm, lập trường chính thức.",
        grammar_notes: [
          "以为 (Ngộ nhận / Tưởng bở): 我以为今天是星期天呢。 (Tôi cứ tưởng hôm nay là Chủ nhật - thực tế hôm nay là thứ Hai).",
          "认为 (Quan điểm / Đánh giá): 我认为这个方案很合理。 (Tôi cho rằng phương án này rất hợp lý).",
          "Mẹo nhận biết: Trong câu có 以为 thường đi kèm từ phản biện ở vế sau như 其实 (kỳ thực), 原来 (hóa ra), 没想到 (không ngờ)."
        ],
        pedagogical_tips: "Dạy học sinh công thức: '以为 = Cứ tưởng là (nhưng sai) - 认为 = Quan điểm nghiêm túc'."
      },
      ja: {
        title: "思考動詞の対比：「以为（思い込み・誤解）」VS「认为（見解・主張）」",
        concept: "ともに思考内容を述べますが、事実との一致性において決定的な違いがあります。",
        grammar_notes: [
          "以为（誤認・思い込み）：「我以为他是韩国人，其实他是中国人」（彼を韓国人だと思い込んでいたが、実は中国人だった）。",
          "认为（主観的見解・考察）：「我认为这个办法行得通」（私はこの方法でうまくいくと考える）。",
          "シグナルワード：「以为」の文脈では「其实（実は）」「原来（なんと）」「没想到（思いがけず）」などが後続することが多い。"
        ],
        pedagogical_tips: "「以为＝実は違った」「认为＝正式な自分の考え」という対比を叩き込みます。"
      },
      en: {
        title: "Mental Verbs: 以为 (yǐwéi) vs 认为 (rènwéi)",
        concept: "Both mean 'to think/believe', but differ in factual alignment: 以为 expresses a mistaken assumption that contradicts reality; 认为 expresses a reasoned opinion.",
        grammar_notes: [
          "以为 (Mistaken belief): 我以为他是老师呢，原来他是学生。 (I assumed he was a teacher, but it turns out he's a student).",
          "认为 (Reasoned perspective): 我认为我们需要更多时间。 (I believe that we need more time).",
          "Context clue: 以为 is frequently followed by markers of revelation like 其实 (in reality), 原来 (as it turns out), or 没想到 (unexpectedly)."
        ],
        pedagogical_tips: "Mnemonic: 以为 means 'I falsely assumed'; 认为 means 'In my view'."
      }
    },
    fill_template: {
      template_zh: "我{verb}你已经走了呢，原来你还在啊！",
      template_vi: "Tôi {verb} bạn đã đi rồi cơ đấy, hóa ra bạn vẫn còn ở đây à!",
      slots: [
        { name: "verb", type: "verb", options: ["以为", "认为", "觉得", "想"] }
      ]
    },
    collocations: [
      { pattern: "我以为...", pinyin: "wǒ yǐwéi...", meaning_vi: "Tôi cứ tưởng là...", meaning_en: "I mistakenly thought..." },
      { pattern: "我认为...", pinyin: "wǒ rènwéi...", meaning_vi: "Tôi cho rằng...", meaning_en: "In my opinion / I believe..." }
    ],
    examples: [
      {
        zh: "我以为很难，其实做起来挺容易的。",
        pinyin: "Wǒ yǐwéi hěn nán, qíshí zuò qǐlai tǐng róngyì de.",
        translations: { vi: "Tôi cứ tưởng rất khó, thực ra làm thì thấy khá dễ dàng.", ja: "とても難しいと思い込んでいたけれど、実際やってみたら案外簡単でした。", en: "I thought it would be difficult, but actually it's quite easy to do." },
        literal_en: "I assumed very difficult, actually do up quite easy particle.",
        scenario: { vi: "Chia sẻ sau khi hoàn thành một thử thách", ja: "挑戦を終えた後の率直な感想", en: "Reflecting on a completed task" },
        tone_tip: { vi: "以为 đọc là yǐwéi (thanh 3 + thanh 2).", ja: "「以为」は第3声＋第2声です。", en: "yǐ (3rd) + wéi (2nd)." },
        word_order_diff: { vi: "S (我) + 以为 + Mệnh đề ngộ nhận (很难).", ja: "主語＋以为＋思い込み内容＋実は……の構造。", en: "Subject + 以为 + Misconception + 其实..." },
        note: { vi: "Đối lập giữa nhận thức ban đầu và sự thật.", ja: "予想外の事実が判明したときの定番表現です。", en: "Expresses contrast between expectation and reality." },
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", literal_en: "I", block_role: "subject" },
          { hanzi: "以为", pinyin: "yǐwéi", han_viet: "dĩ vi", ja_kanji: "思い込む", literal_en: "mistakenly thought", block_role: "verb" },
          { hanzi: "很难", pinyin: "hěn nán", han_viet: "hẩn nan", ja_kanji: "とても難しい", literal_en: "very difficult", block_role: "clause" },
          { hanzi: "，", pinyin: ",", han_viet: "", ja_kanji: "，", literal_en: ",", block_role: "punctuation" },
          { hanzi: "其实", pinyin: "qíshí", han_viet: "kỳ thực", ja_kanji: "実際は", literal_en: "actually", block_role: "adverb" },
          { hanzi: "做起来", pinyin: "zuò qǐlai", han_viet: "tác khởi lai", ja_kanji: "やってみると", literal_en: "doing it", block_role: "verb" },
          { hanzi: "挺容易的", pinyin: "tǐng róngyì de", han_viet: "đĩnh dung dị đích", ja_kanji: "かなり簡単だ", literal_en: "quite easy", block_role: "predicate" },
          { hanzi: "。", pinyin: ".", han_viet: "", ja_kanji: "。", literal_en: ".", block_role: "punctuation" }
        ]
      }
    ],
    puzzles: [
      {
        id: "pz_yiwei_1",
        prompt: { vi: "Sắp xếp: 'Tôi cho rằng kế hoạch này cần được sửa đổi.'", ja: "並べ替え：「私はこの計画には修正が必要だと考えます。」", en: "Unscramble: 'I think that this plan needs to be modified.'" },
        correct_order: ["我", "认为", "这个", "计划", "需要", "修改", "。"],
        tokens: ["需要", "这个", "我", "计划", "修改", "认为", "。"],
        explanation: { vi: "Nêu quan điểm nghiêm túc dùng 认为: 我认为...", ja: "意見表明なので「认为」を用います。", en: "Formal opinion takes 认为." }
      }
    ],
    fill_blank: [
      {
        id: "fb_yiwei_1",
        sentence_zh: "大家都{blank}今天会下雨，谁知道天气这么晴朗。",
        answer: "以为",
        options: ["以为", "认为", "发现", "决定"],
        explanation: { vi: "Mọi người cứ tưởng mưa, thực tế lại nắng ráo (ngộ nhận sai thực tế) dùng 以为.", ja: "雨が降ると思い込んでいたが実際は晴れたという誤認なので「以为」です。", en: "Mistaken weather expectation requires 以为." }
      }
    ],
    error_correction: [
      {
        id: "ec_yiwei_1",
        wrong_sentence: "我认为你生病了呢，原来你在开会。",
        correct_sentence: "我以为你生病了呢，原来你在开会。",
        error_point: { vi: "Dùng 认为 khi vế sau có 原来 biểu thị sự thật hoàn toàn trái ngược với suy nghĩ lúc đầu.", ja: "「原来（実は）」と対比される誤認に「认为」を使ってしまった誤り。", en: "Using 认为 when the assumption was clearly contradicted by reality." },
        explanation: { vi: "Cứ tưởng là (nhưng hóa ra sai) phải dùng 以为: 我以为你生病了呢.", ja: "思い違いを表す「以为」に修正します。", en: "Correct to 以为: 我以为你生病了呢." }
      }
    ],
    quiz: [
      {
        id: "qz_yiwei_1",
        question: { vi: "Từ nào thường đi kèm với hàm ý rằng nhận định ban đầu của người nói đã SAI SO VỚI THỰC TẾ?", ja: "話者の当初の認識が「事実と食い違っていた」ニュアンスを含むのはどちら？", en: "Which word carries the connotation that the initial thought was CONTRARY TO FACT?" },
        options: [
          { text: { vi: "以为 (yǐwéi) - Tưởng thế nhưng thực tế không phải thế", ja: "以为（〜だと思い込んでいたが事実は違った）", en: "以为 (yǐwéi) - Mistakenly assumed" }, correct: true },
          { text: { vi: "认为 (rènwéi) - Quan điểm phân tích khách quan", ja: "认为（客観的・主観的見解）", en: "认为 (rènwéi) - Considered view" }, correct: false }
        ],
        explanation: { vi: "以为 luôn ngầm mang sắc thái ngộ nhận.", ja: "「以为」には常に事実との乖離（思い違い）が含まれます。", en: "以为 inherently denotes misconceptions." }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "以为 (tưởng rằng - thực tế sai)  VS  认为 (cho rằng - quan điểm, nhận định nghiêm túc).",
        ja: "以为（〜と思い込んでいたが実は違った） VS 认为（〜だと考える・見解表明）。",
        en: "以为 (mistaken assumption contrary to reality) VS 认为 (reasoned stance/opinion)."
      },
      remember: [
        { vi: "Khi trong câu có 其实, 原来, 没想到 -> 99% chọn 以为.", ja: "「其实」「原来」が後ろにあれば「以为」のサイン！", en: "Coupled with 其实 or 原来 -> Choose 以为." }
      ]
    }
  }
];

module.exports = batch5;
