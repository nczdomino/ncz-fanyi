/**
 * tools/missing-grammar-part1.js
 * Items 1-7 of 14 missing advanced HSK grammar detail items.
 */

module.exports = [
  // 1. hsk5_suo_verb_de_nominalization
  {
    id: "hsk5_suo_verb_de_nominalization",
    level: "HSK5",
    level_num: 5,
    category: "written_style",
    difficulty: 4,
    frequency: 4,
    register: "formal",
    keywords: ["所", "suǒ", "所+V+的", "những điều mà", "ところの", "nominalization", "văn viết"],
    formula: "所 + V + (的) + N   hoặc   为…所 + V (bị... chi phối/tác động)",
    formula_plain: {
      vi: "所 + Động từ + (的) + Danh từ (những điều / người mà...)",
      ja: "「所 ＋ 動詞 ＋ 的 ＋ 名詞」（〜するところの…、〜した事柄）",
      en: "所 (suǒ) + Verb + (的) + Noun (that which is V-ed)"
    },
    structure_blocks: [
      { label: { vi: "Trợ từ văn viết (所)", ja: "構造助詞 (所)", en: "Particle (所)" }, role: "particle", color: "#8B5CF6" },
      { label: { vi: "Động từ chính (V)", ja: "動詞 (V)", en: "Verb (V)" }, role: "verb", color: "#10B981" },
      { label: { vi: "Định ngữ (的)", ja: "助詞 (的)", en: "Particle (的)" }, role: "particle", color: "#6B7280" },
      { label: { vi: "Trung tâm ngữ (N)", ja: "中心名詞 (N)", en: "Head Noun" }, role: "object", color: "#3B82F6" }
    ],
    related_ids: ["hsk3_de_possessive_attributive", "hsk3_bei_passive"],
    confusable_with: [
      {
        id: "hsk3_de_possessive_attributive",
        diff: {
          vi: "Khẩu ngữ dùng 'V + 的 + N' (我知道的事). Văn viết trang trọng thêm 所 trước V: '我所知道的事' để tăng tính học thuật.",
          ja: "口語「動詞＋的」に対し、書面語では動詞の前に「所」を挿入して格調高い文体を作ります。",
          en: "Colloquial Chinese uses 'V + 的 + N', whereas formal prose adds 所 before transitive verbs."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Trợ từ văn viết 所 (所 + Động từ + 的 + Danh từ)",
        quick_rule_3s: "Đặt 所 ngay trước ngoại động từ trong văn viết trang trọng: 所见所闻, 所需的资金.",
        contrastive_note: "Tiếng Việt dịch là 'những điều mà...'. Chỉ đi với ngoại động từ (nhận thức, tác động) và mang sắc thái văn thư chuyên nghiệp.",
        analogy: "Coi 所 như chiếc huy hiệu 'văn thư trang trọng' cài trước động từ để nâng tầm ngôn ngữ báo cáo.",
        mnemonic: "Văn viết trang trọng thêm 所 trước V: 'những điều mà ta làm'.",
        how_to_use: [
          { step: 1, text: "Chọn động từ ngoại động (知, 需, 见, 提, 调查)." },
          { step: 2, text: "Đặt 所 ngay trước động từ." },
          { step: 3, text: "Thêm 的 và danh từ trung tâm (như 所需的材料)." }
        ],
        self_check: ["Động từ có phải ngoại động từ không?", "Bối cảnh có phải văn bản báo cáo hoặc học thuật không?"],
        tips: ["Các thành ngữ 4 chữ: 前所未有 (chưa từng có), 各尽所能 (cống hiến hết sức)."],
        when_to_use: ["Báo cáo, hợp đồng, luận văn, thuyết trình trang trọng."],
        when_not_to_use: ["Giao tiếp thân mật hàng ngày."],
        fatal_mistake: {
          wrong: "我所去那个地方风景很美。(去 là nội động từ di chuyển).",
          correct: "我去过的那个地方风景很美。/ 我所到之处风景皆美。",
          explanation: "所 chỉ kết hợp với ngoại động từ, không ghép trực tiếp trước nội động từ như 去, 走."
        }
      },
      ja: {
        title: "構造助詞「所」（所＋動詞＋的＋名詞）",
        quick_rule_3s: "他動詞の直前に「所」を置き、「所＋動詞＋的＋名詞」で硬い客観的な名詞修飾を作ります。",
        contrastive_note: "日本語の古典文法「〜するところの…」に対応。口語の「動詞＋的」を学術論文向きの文体に変えます。",
        analogy: "Tシャツにフォーマルなネクタイ「所」を締めて公的文書に格上げするイメージ。",
        mnemonic: "動詞の前に「所」を添えれば、格式高い客観記述。",
        how_to_use: [
          { step: 1, text: "他動詞を選ぶ。" },
          { step: 2, text: "動詞の前に「所」を挿入する。" },
          { step: 3, text: "後ろに「的」と名詞を続ける。" }
        ],
        self_check: ["結びつく動詞は他動詞ですか？"],
        tips: ["固定成語「前所未有」「尽我所能」は超頻出。"],
        when_to_use: ["論文、公的報告書、ニュース報道。"],
        when_not_to_use: ["日常会話。"],
        fatal_mistake: {
          wrong: "我们所来那个城市很冷。",
          correct: "我们去的那个城市很冷。または 我所到的城市皆十分寒冷。",
          explanation: "所は他動詞とのみ結合します。"
        }
      },
      en: {
        title: "Formal nominalization marker 所 (suǒ)",
        quick_rule_3s: "Place 所 immediately before transitive verbs in formal Chinese: 所 + V + 的 + N.",
        contrastive_note: "Equivalent to 'that which / what is V-ed' in English formal prose.",
        analogy: "Like adding 'the aforementioned' or 'that which' to make everyday phrases sound like a legal brief.",
        mnemonic: "Put 所 before the action to formalize 'the thing which was done'.",
        how_to_use: [
          { step: 1, text: "Identify a transitive verb of perception, action, or need." },
          { step: 2, text: "Place 所 directly in front of the verb." },
          { step: 3, text: "Append 的 and the head noun." }
        ],
        self_check: ["Is the verb transitive?"],
        tips: ["Idioms: 前所未有 (unprecedented), 各尽所能 (everyone does their best)."],
        when_to_use: ["Academic papers, press releases, formal speeches."],
        when_not_to_use: ["Casual texting or spoken chit-chat."],
        fatal_mistake: {
          wrong: "我所去的地方。(去 is intransitive).",
          correct: "我去过的地方。or 我所到之处。",
          explanation: "所 can only nominalize transitive verbs."
        }
      }
    },
    collocations: [
      { zh: "所需的资金", pinyin: "suǒ xū de zījīn", tr: { vi: "nguồn vốn cần thiết", ja: "必要とされる資金", en: "required funds" } },
      { zh: "所面临的挑战", pinyin: "suǒ miànlín de tiǎozhàn", tr: { vi: "thách thức đang phải đối mặt", ja: "直面している課題", en: "challenges faced" } }
    ],
    examples: [
      {
        zh: "我们必须充分利用现有资源，以解决当前所面临的严峻问题。",
        pinyin: "Wǒmen bìxū chōngfèn lìyòng xiànyǒu zīyuán, yǐ jiějué dāngqián suǒ miànlín de yánjùn wèntí.",
        tokens: [
          { hanzi: "我们", pinyin: "wǒmen", role: "subject", hanviet: "ngã môn" },
          { hanzi: "必须", pinyin: "bìxū", role: "adverb", hanviet: "tất tu" },
          { hanzi: "解决", pinyin: "jiějué", role: "verb", hanviet: "giải quyết" },
          { hanzi: "所", pinyin: "suǒ", role: "particle", hanviet: "sở" },
          { hanzi: "面临", pinyin: "miànlín", role: "verb", hanviet: "diện lâm" },
          { hanzi: "的", pinyin: "de", role: "particle", hanviet: "đích" },
          { hanzi: "严峻问题", pinyin: "yánjùn wèntí", role: "object", hanviet: "nghiêm tuấn vấn đề" }
        ],
        translations: {
          vi: "Chúng ta phải tận dụng các nguồn lực hiện có để giải quyết những vấn đề nghiêm trọng đang phải đối mặt.",
          ja: "我々は現在直面している深刻な問題を解決するため、既存資源を活用しなければならない。",
          en: "We must utilize existing resources to resolve the severe problems currently faced."
        },
        scenario: "Báo cáo thường niên",
        tone_tip: "Nhấn trọng âm vào động từ的面 (miànlín) ngay sau 所."
      }
    ],
    dialogue: {
      goal: { vi: "Thảo luận ngân sách dự án", ja: "予算会議", en: "Budget meeting" },
      lines: [
        { speaker: "李总", zh: "该项目所需的总预算核算完毕了吗？", pinyin: "Gāi xiàngmù suǒ xū de zǒng yùsuàn hésuàn wánbì le ma?", tr: { vi: "Ngân sách mà dự án này cần đã tính toán xong chưa?", ja: "プロジェクトに必要とされる総予算は算出されましたか？", en: "Has the total budget required for the project been audited?" } },
        { speaker: "王经理", zh: "我们所调查的各项支出均已汇总。", pinyin: "Wǒmen suǒ diàochá de gè xiàng zhīchū jūn yǐ huìzǒng.", tr: { vi: "Các khoản chi mà chúng tôi khảo sát đều đã được tổng hợp.", ja: "私どもが調査した支出項目はすべて集計いたしました。", en: "All expenses investigated by our team have been consolidated." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["我们", "必须", "认真对待", "客户", "所提出的", "所有意见"],
        correct_order: ["我们", "必须", "认真对待", "客户", "所提出的", "所有意见"]
      }
    ],
    fill_blank: [
      {
        sentence: "这篇报告总结了专家在调研过程中____发现的重要规律。",
        options: ["所", "把", "被", "以"],
        answer_index: 0,
        explanation: {
          vi: "Cấu trúc '所 + V + 的 + N' (所发现的重要规律 = những quy luật quan trọng được phát hiện).",
          ja: "「所＋動詞（发现）＋的＋名詞」の構文です。",
          en: "Matches the pattern 所 + Verb + 的 + Noun."
        }
      }
    ],
    error_correction: [
      {
        wrong: "他所跑那个操场很大。",
        correct: "他跑步的那个操场很大。/ 他所到之处皆十分开阔。",
        hint: {
          vi: "跑 là nội động từ, không dùng 所跑.",
          ja: "跑は自動詞のため所と結合できません。",
          en: "跑 is intransitive and cannot take 所."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Câu nào sau đây dùng '所' chính xác nhất?",
          ja: "「所」の使い方が正しい文はどれですか？",
          en: "Which sentence uses 所 correctly?"
        },
        options: [
          "这是会议上所讨论的核心议题。",
          "他所睡觉的房间很安静。",
          "我们所走的那条路很堵。",
          "他所笑的样子很有趣。"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "讨论 là ngoại động từ (thảo luận vấn đề), kết hợp chuẩn: 所讨论的议题. Các từ 睡觉, 走, 笑 là nội động từ.",
          ja: "讨论は他動詞であり正しい接続です。他は自動詞のため誤りです。",
          en: "讨论 is transitive and correctly modified by 所."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "所 + V + 的 + N: Danh từ hóa trang trọng, nghĩa là 'những điều mà...'",
        ja: "「所＋他動詞＋的＋名詞」：客観的で硬い文体を作る表現。",
        en: "所 + Transitive Verb + 的 + Noun: Formal written nominalization."
      },
      remember: [
        { vi: "Chỉ ghép với ngoại động từ (như 知, 见, 需, 提).", ja: "他動詞のみと結合する。", en: "Only combine with transitive verbs." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 2. hsk5_he_kuang_let_alone
  {
    id: "hsk5_he_kuang_let_alone",
    level: "HSK5",
    level_num: 5,
    category: "conjunction",
    difficulty: 4,
    frequency: 4,
    register: "neutral",
    keywords: ["何况", "hékuàng", "尚且", "huống hồ", "huống chi", "ましてや", "let alone", "much less"],
    formula: "A 连 / 尚且… 都/也…，何况 B 呢？",
    formula_plain: {
      vi: "Đến A còn... huống hồ là B (nữa là)",
      ja: "「〜でさえ…なのだから、ましてや〜はなおさらだ」",
      en: "Even A does... let alone B / much less B"
    },
    structure_blocks: [
      { label: { vi: "Tiền đề cực đoan (连/尚且)", ja: "前提 (连/尚且)", en: "Extreme Premise" }, role: "adverb", color: "#3B82F6" },
      { label: { vi: "Liên từ tăng tiến (何况)", ja: "接続詞 (何况)", en: "Conjunction (何况)" }, role: "conjunction", color: "#EF4444" },
      { label: { vi: "Đối tượng tăng tiến (B)", ja: "対象 (B)", en: "Focus Object" }, role: "object", color: "#10B981" }
    ],
    related_ids: ["hsk3_lian_ye_dou", "hsk5_gu_ran_dan_concession"],
    confusable_with: [
      {
        id: "hsk3_lian_ye_dou",
        diff: {
          vi: "连...都 nhấn mạnh 1 đối tượng đơn lẻ. 何况 so sánh 2 vế bậc thang: vế 1 đã khó thì vế 2 còn gấp bội.",
          ja: "「连」単体は1つの極端な例、「何况」は2項比較を通して「ましてや〜はなおさら」と論じます。",
          en: "连 emphasizes an isolated extreme, whereas 何况 establishes an a fortiori argument."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 尚且/连..., 何况... (huống hồ là...)",
        quick_rule_3s: "Dùng 何况 để biểu thị vế sau càng hiển nhiên hơn vế trước: Người lớn còn mệt, huống hồ trẻ con (何况小孩子呢).",
        contrastive_note: "Tiếng Việt nói 'huống chi / huống hồ'. Cuối câu thường thêm 呢 để tăng sức thuyết phục.",
        analogy: "Đòn bẩy tu từ: đẩy mạnh trường hợp khó để chứng minh trường hợp sau là tất nhiên.",
        mnemonic: "Trước đã thế rồi, sau 'hà huống' (何况) lại càng hơn.",
        how_to_use: [
          { step: 1, text: "Nêu tình huống khó ở vế 1 (dùng 连...都 hoặc 尚且...)." },
          { step: 2, text: "Đặt 何况 ở đầu vế 2." },
          { step: 3, text: "Nêu đối tượng hiển nhiên hơn, kết thúc bằng 呢." }
        ],
        self_check: ["Vế sau có hợp logic 'lớn còn không được, nhỏ sao được' không?"],
        tips: ["Còn dùng để bổ sung thêm một lý do: 天气冷，何况下着雨，别出去了."],
        when_to_use: ["Tranh luận, thuyết phục, phân tích rủi ro kinh doanh."],
        when_not_to_use: ["Hai sự việc song song bình đẳng."],
        fatal_mistake: {
          wrong: "小孩子都能做，何况大人不会。(Ngược logic).",
          correct: "大人都未必能做，何况小孩子呢？",
          explanation: "Phải đi từ cái khó/mạnh đến cái dễ/yếu hơn."
        }
      },
      ja: {
        title: "「尚且／连…，何况…」（〜でさえ…なのだから、ましてや〜はなおさらだ）",
        quick_rule_3s: "極端な例から「ましてや〜はなおさら」と結論づける構文。",
        contrastive_note: "日本語の「ましてや」「言うに及ばず」と一致。文末に「呢」を伴う。",
        analogy: "大人が持ち上がらない荷物は、子供にはなおさら上がらない道理。",
        mnemonic: "「連〜都」で前置きし、「何況」で結論。",
        how_to_use: [
          { step: 1, text: "第1節で基準となる極端な事実を提示。" },
          { step: 2, text: "第2節の先頭に「何况」を置く。" },
          { step: 3, text: "文末に反問の「呢」を添える。" }
        ],
        self_check: ["論理の難易順序が整合していますか？"],
        tips: ["理由の追加「その上〜」の意味でも使用可。"],
        when_to_use: ["議論、交渉、説得。"],
        when_not_to_use: ["並列関係の事象。"],
        fatal_mistake: {
          wrong: "小孩子都会，何况老师不会呢？",
          correct: "老师都觉得难，何况初学者呢？",
          explanation: "難易度・能力の論理順序を守る必要があります。"
        }
      },
      en: {
        title: "Much less / let alone with 何况 (hékuàng)",
        quick_rule_3s: "Argue from the stronger case to the weaker: Even experts find it hard, let alone beginners (何况初学者呢).",
        contrastive_note: "Translates directly to 'let alone' or 'much less'. Often ends with 呢.",
        analogy: "If a master cannot solve it, an apprentice much less.",
        mnemonic: "State the hard case first, then add 何况 for the obvious follow-up.",
        how_to_use: [
          { step: 1, text: "Present the extreme premise in clause 1." },
          { step: 2, text: "Start clause 2 with 何况." },
          { step: 3, text: "Conclude rhetorically with 呢." }
        ],
        self_check: ["Does the argument proceed from the harder condition to the easier?"],
        tips: ["Can also introduce a secondary supplementary reason."],
        when_to_use: ["Debates, logical reasoning, negotiations."],
        when_not_to_use: ["When events are parallel."],
        fatal_mistake: {
          wrong: "Children can do it, let alone adults cannot.",
          correct: "Even adults struggle, let alone children.",
          explanation: "Maintain logical directionality."
        }
      }
    },
    collocations: [
      { zh: "连专家都尚且如此，何况普通人呢", pinyin: "lián zhuānjiā dōu shàngqiě rúcǐ, hékuàng pǔtōngrén ne", tr: { vi: "đến chuyên gia còn như vậy, huống hồ người thường", ja: "専門家でさえそうなのだから、一般人はなおさらだ", en: "even experts are like this, let alone ordinary people" } }
    ],
    examples: [
      {
        zh: "连经验丰富的老工程师都感到棘手，何况你这个刚毕业的新人呢？",
        pinyin: "Lián jīngyàn fēngfù de lǎo gōngchéngshī dōu gǎndào jíshǒu, hékuàng nǐ zhè ge gāng bìyè de xīnrén ne?",
        tokens: [
          { hanzi: "连", pinyin: "lián", role: "adverb", hanviet: "liên" },
          { hanzi: "老工程师", pinyin: "lǎo gōngchéngshī", role: "subject", hanviet: "lão công trình sư" },
          { hanzi: "都", pinyin: "dōu", role: "adverb", hanviet: "đô" },
          { hanzi: "感到", pinyin: "gǎndào", role: "verb", hanviet: "cảm đáo" },
          { hanzi: "棘手", pinyin: "jíshǒu", role: "adjective", hanviet: "cức thủ" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "何况", pinyin: "hékuàng", role: "conjunction", hanviet: "hà huống" },
          { hanzi: "新人", pinyin: "xīnrén", role: "object", hanviet: "tân nhân" },
          { hanzi: "呢", pinyin: "ne", role: "particle", hanviet: "ni" }
        ],
        translations: {
          vi: "Đến kỹ sư già dặn kinh nghiệm còn thấy hóc búa, huống hồ là người mới như cậu?",
          ja: "ベテラン技師でさえ手を焼いているのだから、新人の君ならなおさらではないか？",
          en: "Even veteran engineers find it tricky, let alone a newcomer like you?"
        },
        scenario: "Đánh giá dự án kỹ thuật",
        tone_tip: "Nhấn mạnh vào 连 (lián) và 何况 (hékuàng)."
      }
    ],
    dialogue: {
      goal: { vi: "Thương lượng thời hạn giao hàng", ja: "納期交渉", en: "Lead time negotiation" },
      lines: [
        { speaker: "客户", zh: "这批特制品能在三天内交货吗？", pinyin: "Zhè pī tèzhìpǐn néng zài sān tiān nèi jiāohuò ma?", tr: { vi: "Lô hàng đặt biệt này có thể giao trong 3 ngày không?", ja: "特注品を3日以内に納品できますか？", en: "Can custom parts be delivered in 3 days?" } },
        { speaker: "厂家", zh: "标准件尚且需要五天，何况工艺复杂的非标件呢？", pinyin: "Biāozhǔnjiàn shàngqiě xūyào wǔ tiān, hékuàng gōngyì fùzá de fēibiāojiàn ne?", tr: { vi: "Hàng chuẩn còn cần 5 ngày, huống hồ hàng phi tiêu chuẩn phức tạp?", ja: "標準品でさえ5日かかるのに、複雑な特注品ならなおさら無理です。", en: "Standard parts take 5 days, let alone complex custom items?" } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["连大人都", "很难坚持", "每天跑步", "何况小孩子呢"],
        correct_order: ["连大人都", "很难坚持", "每天跑步", "何况小孩子呢"]
      }
    ],
    fill_blank: [
      {
        sentence: "本土企业开拓该市场尚且困难，____初来乍到的海外初创公司呢？",
        options: ["何况", "虽说", "以致", "从而"],
        answer_index: 0,
        explanation: {
          vi: "Cặp liên từ: 尚且...，何况...呢？(Doanh nghiệp bản địa còn khó, huống hồ công ty mới).",
          ja: "「尚且…，何况…呢？」の定型構文です。",
          en: "Matches 尚且..., 何况...呢？"
        }
      }
    ],
    error_correction: [
      {
        wrong: "大学教授都算不出的题，何况小学生肯定能做。",
        correct: "大学教授都算不出的题，何况小学生呢？",
        hint: {
          vi: "Vế 何况 phải là điều khó hơn, không thể nói học sinh tiểu học chắc chắn làm được.",
          ja: "後節はさらに困難な結論になる必要があります。",
          en: "The second clause must state a less likely outcome."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Câu nào dùng đúng logic '何况'?",
          ja: "「何况」の論理が正しい文はどれですか？",
          en: "Which sentence applies 何况 correctly?"
        },
        options: [
          "母语者都要反复推敲，何况外语学习者呢？",
          "小孩子都会做，何况老师不会呢？",
          "虽然下雨，何况我要去。",
          "他吃饱了，何况要吃。"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "Người bản xứ còn phải đắn đo, huống hồ người học ngoại ngữ.",
          ja: "母語話者でさえ推敲が必要なら学習者はなおさら、が論理的です。",
          en: "Native speakers need editing, let alone foreign learners."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "连/尚且 A 都...，何况 B 呢: Đến A còn thế, huống hồ B.",
        ja: "「Aでさえ…、ましてやBはなおさらだ」という論理構文。",
        en: "Even A does..., let alone B."
      },
      remember: [
        { vi: "Logic từ khó/mạnh đến dễ/yếu hơn.", ja: "難から易への論理展開。", en: "From harder to more obvious." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 3. hsk5_you_built_in_prepositions
  {
    id: "hsk5_you_built_in_prepositions",
    level: "HSK5",
    level_num: 5,
    category: "preposition",
    difficulty: 4,
    frequency: 5,
    register: "formal",
    keywords: ["由", "凭", "趁", "随着", "自从", "朝", "yóu", "píng", "chèn", "suízhe", "zìcóng", "giới từ nâng cao", "prepositions"],
    formula: "由 / 凭 / 趁 / 随着 / 朝 + N/NP + VP",
    formula_plain: {
      vi: "Giới từ nâng cao: 由 (do ai đảm nhận / từ đâu), 凭 (dựa vào), 趁 (nhân dịp), 随着 (cùng với / theo đà), 朝 (hướng về phía)",
      ja: "「由（〜によって／から）」「凭（〜に基づいて）」「趁（〜に乗じて）」「随着（〜に伴って）」「朝（〜へ向けて）」",
      en: "Advanced prepositions: 由 (by/from), 凭 (relying on), 趁 (taking advantage of), 随着 (along with), 朝 (towards)"
    },
    structure_blocks: [
      { label: { vi: "Giới từ (由/凭/趁/随着)", ja: "前置詞 (由/凭/趁/随着)", en: "Preposition" }, role: "preposition", color: "#EC4899" },
      { label: { vi: "Tân ngữ giới từ (NP)", ja: "介詞目的語 (NP)", en: "Prepositional Object" }, role: "object", color: "#3B82F6" },
      { label: { vi: "Vị ngữ hành động (VP)", ja: "述語 (VP)", en: "Predicate" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk2_cong_dao", "hsk3_dui_preposition"],
    confusable_with: [
      {
        id: "hsk2_cong_dao",
        diff: {
          vi: "从 chỉ điểm xuất phát không gian/thời gian. 由 ngoài xuất phát điểm (由北京出发) còn chỉ người chịu trách nhiệm chính (由他负责 = do anh ấy phụ trách).",
          ja: "「从」は単なる起点を示すのに対し、「由」は起点に加え「責任の所在（〜が担当する）」を表します。",
          en: "从 marks origin, whereas 由 indicates both origin and who is in charge of an action (由...负责)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Giới từ nâng cao (由, 凭, 趁, 随着, 自从, 朝)",
        quick_rule_3s: "Phân biệt 5 giới từ then chốt: 由 (do ai chịu trách nhiệm), 凭 (dựa vào căn cứ), 趁 (nhân lúc/thừa cơ), 随着 (theo sự phát triển của), 朝 (hướng về).",
        contrastive_note: "Trong tiếng Việt: 由 = 'do/từ', 凭 = 'dựa vào / nhờ vào', 趁 = 'nhân lúc', 随着 = 'cùng với sự...'. Đều đứng trước cụm danh từ và đặt trước động từ vị ngữ.",
        analogy: "Mỗi giới từ như một chiếc la bàn định vị: 由 định vị trách nhiệm, 凭 định vị căn cứ, 趁 định vị thời cơ, 随着 định vị dòng chảy thời gian.",
        mnemonic: "Do ai thì 'Do' (由), dựa vào thì 'Bằng' (凭), nhân lúc thì 'Sấn' (趁), theo đà thì 'Tùy' (随着).",
        how_to_use: [
          { step: 1, text: "Xác định quan hệ ngữ nghĩa (trách nhiệm, căn cứ, thời cơ, hay xu hướng)." },
          { step: 2, text: "Chọn giới từ tương ứng (由, 凭, 趁, 随着, 朝)." },
          { step: 3, text: "Đặt giới từ + danh từ trước động từ chính trong câu." }
        ],
        self_check: ["由...负责 đã đặt người phụ trách sau 由 chưa?", "随着... phát triển đã có danh từ biến đổi đi kèm chưa?"],
        tips: ["凭良心 (bằng lương tâm), 趁热吃 (ăn nhân lúc còn nóng), 随着科技的发展 (cùng với sự phát triển của công nghệ)."],
        when_to_use: ["Văn bản hành chính, tin tức kinh tế, phân tích xu hướng thị trường."],
        when_not_to_use: ["Dùng sai cặp giới từ (ví dụ nhầm 趁 với 随着)."],
        fatal_mistake: {
          wrong: "这项任务负责由张经理。(Đặt sai vị trí cụm giới từ).",
          correct: "这项任务由张经理负责。",
          explanation: "Cụm giới từ '由 + Danh từ' phải đứng trước động từ '负责'."
        }
      },
      ja: {
        title: "中上級前置詞（由・凭・趁・随着・自从・朝）",
        quick_rule_3s: "由（責任・経由）、凭（根拠・頼り）、趁（機会に乗じて）、随着（〜に伴い）を使い分けます。",
        contrastive_note: "日本語の「〜によって（由）」「〜に基づいて（凭）」「〜のうちに（趁）」「〜につれて（随着）」に相当します。",
        analogy: "各前置詞はアクションの前提条件（担当者、根拠、タイミング）を指定するラベルです。",
        mnemonic: "担当は由、頼りは凭、好機は趁、変化は随着。",
        how_to_use: [
          { step: 1, text: "意味関係（担当、根拠、時期、推移）を見極める。" },
          { step: 2, text: "前置詞＋名詞のフレーズを動詞の前に配置。" }
        ],
        self_check: ["前置詞句が動詞の前に置かれていますか？"],
        tips: ["「随着＋名詞的发展/提高」は作文の超定番表現です。"],
        when_to_use: ["ビジネスレポート、ニュース分析、論文。"],
        when_not_to_use: ["口語で簡単な言葉で済む場面での乱用。"],
        fatal_mistake: {
          wrong: "趁科技的发展，生活越来越好。",
          correct: "随着科技的发展，生活越来越好。",
          explanation: "発展に伴う推移には「随着」を用い、一過性の機会を捕まえる「趁」は不適切です。"
        }
      },
      en: {
        title: "Advanced prepositions: 由, 凭, 趁, 随着, 自从, 朝",
        quick_rule_3s: "Master 4 vital prepositions: 由 (handled by), 凭 (based on), 趁 (taking advantage of the moment), 随着 (along with changes).",
        contrastive_note: "Prepositional phrases in Chinese precede the main verb: 由 + Agent + Verb.",
        analogy: "Prepositions act as contextual anchors: 由 assigns ownership, 凭 gives credentials, 趁 seizes timing, 随着 rides trends.",
        mnemonic: "由 for who is in charge, 凭 for what you rely on, 趁 for striking while the iron is hot, 随着 for riding trends.",
        how_to_use: [
          { step: 1, text: "Identify the contextual relationship (agency, basis, timing, trend)." },
          { step: 2, text: "Select 由, 凭, 趁, or 随着." },
          { step: 3, text: "Place [Prep + Noun] directly before the verb phrase." }
        ],
        self_check: ["Is the prepositional phrase placed before the main verb?"],
        tips: ["Formula: 随着 + [change noun] + 的 + [发展/进步/普及], S + VP."],
        when_to_use: ["Business reports, analytical essays, news broadcasts."],
        when_not_to_use: ["Swapping 趁 (transient opportunity) with 随着 (gradual trend)."],
        fatal_mistake: {
          wrong: "这项工作由负责他。",
          correct: "这项工作由他负责。",
          explanation: "The agent (他) must immediately follow 由, placed before the verb (负责)."
        }
      }
    },
    collocations: [
      { zh: "由他全权负责", pinyin: "yóu tā quánquán fùzé", tr: { vi: "do anh ấy toàn quyền chịu trách nhiệm", ja: "彼が全権を持って担当する", en: "he is solely responsible for it" } },
      { zh: "随着经济的复苏", pinyin: "suízhe jīngjì de fùsū", tr: { vi: "cùng với sự phục hồi của kinh tế", ja: "景気回復に伴い", en: "along with economic recovery" } },
      { zh: "凭真本事说话", pinyin: "píng zhēn běnshi shuōhuà", tr: { vi: "nói chuyện bằng thực tài", ja: "実力で語る", en: "speak with real capabilities" } }
    ],
    examples: [
      {
        zh: "随着人工智能技术的快速普及，传统制造业正在发生深刻的变革。",
        pinyin: "Suízhe réngōng zhìnéng jìshù de kuàisù pǔjí, chuántǒng zhìzàoyè zhèngzài fāshēng shēnkè de biàngé.",
        tokens: [
          { hanzi: "随着", pinyin: "suízhe", role: "preposition", hanviet: "tùy trước" },
          { hanzi: "技术的快速普及", pinyin: "jìshù de kuàisù pǔjí", role: "object", hanviet: "kỹ thuật đích khoái tốc phổ cập" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "制造业", pinyin: "zhìzàoyè", role: "subject", hanviet: "chế tạo nghiệp" },
          { hanzi: "正在发生", pinyin: "zhèngzài fāshēng", role: "verb", hanviet: "chính tại phát sinh" },
          { hanzi: "变革", pinyin: "biàngé", role: "object", hanviet: "biến cách" }
        ],
        translations: {
          vi: "Cùng với sự phổ biến nhanh chóng của công nghệ AI, ngành sản xuất truyền thống đang trải qua những biến chuyển sâu sắc.",
          ja: "AI技術の急速な普及に伴い、伝統的な製造業に深刻な変革が起こりつつある。",
          en: "Along with the rapid adoption of AI technology, traditional manufacturing is undergoing profound transformation."
        },
        scenario: "Hội thảo công nghệ kinh tế",
        tone_tip: "Đọc 随着 (suízhe) dứt khoát, ngắt nhẹ sau dấu phẩy trước khi vào vế chính."
      }
    ],
    dialogue: {
      goal: { vi: "Phân chia trách nhiệm trong hợp đồng", ja: "契約上の責任分担", en: "Contractual responsibility allocation" },
      lines: [
        { speaker: "甲方", zh: "在运输过程中产生的保险费用由谁来承担？", pinyin: "Zài yùnshū guòchéng zhōng chǎnshēng de bǎoxiǎn fèiyòng yóu shuí lái chéngdān?", tr: { vi: "Chi phí bảo hiểm phát sinh trong quá trình vận chuyển do bên nào gánh vác?", ja: "輸送中に生じる保険費用はどちらが負担しますか？", en: "Who will bear the insurance costs incurred during transit?" } },
        { speaker: "乙方", zh: "按照CIF条款约定，该项费用由卖方统一负责支付。", pinyin: "Ànzhào CIF tiáokuǎn yuēdìng, gāi xiàng fèiyòng yóu màifāng tǒngyī fùzé zhīfù.", tr: { vi: "Theo điều khoản CIF đã thỏa thuận, khoản phí này do bên bán phụ trách thanh toán.", ja: "CIF条件の取り決めに基づき、本費用は売主が責任を持って支払います。", en: "Per CIF terms, this expense is to be borne and paid by the seller." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["这项国际仲裁案", "由专业律师团队", "全程负责处理"],
        correct_order: ["这项国际仲裁案", "由专业律师团队", "全程负责处理"]
      }
    ],
    fill_blank: [
      {
        sentence: "____市场需求的持续增长，公司决定扩大下半年的生产规模。",
        options: ["随着", "由", "朝", "趁"],
        answer_index: 0,
        explanation: {
          vi: "Diễn đạt xu hướng kéo theo: 随着 + 增长 (Cùng với sự tăng trưởng của nhu cầu thị trường).",
          ja: "「随着＋需要の増加」で推移・変化を表すのが適切です。",
          en: "随着 introduces the changing condition (continuous growth of market demand)."
        }
      }
    ],
    error_correction: [
      {
        wrong: "所有的费用负责由我们公司承担。",
        correct: "所有的费用由我们公司负责承担。",
        hint: {
          vi: "由 chúng tôi + phụ trách (由我们公司负责), không đặt 负责 trước 由.",
          ja: "「由＋担当者＋负责」の語順を守ります。",
          en: "Keep the order: 由 + Agent + 负责."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Muốn nói 'Anh ấy dựa vào thực lực để giành được chức vô địch', chọn giới từ nào?",
          ja: "「彼は実力に基づいて優勝を勝ち取った」と言う場合、空欄に入る前置詞はどれですか？",
          en: "To say 'He won the championship relying on his true capability', which preposition should be used?"
        },
        options: ["凭", "趁", "由", "随着"],
        answer_index: 0,
        trap_for: ["vi", "en"],
        explanation: {
          vi: "凭 + 实质/能力 (凭实力 = dựa vào thực lực).",
          ja: "「凭＋実力」で根拠・能力を頼りにすることを表します。",
          en: "凭 means 'relying on / by virtue of' (凭实力)."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "由 (trách nhiệm/xuất phát), 凭 (căn cứ), 趁 (thời cơ), 随着 (xu hướng kéo theo).",
        ja: "由（担当）、凭（根拠）、趁（好機）、随着（変化に伴う推移）の明確な使い分け。",
        en: "由 (agency), 凭 (basis), 趁 (opportunity), 随着 (concomitant trend)."
      },
      remember: [
        { vi: "Cụm [Giới từ + Danh từ] luôn đứng trước Động từ chính.", ja: "「前置詞＋名詞」は必ず述語動詞の前に置く。", en: "Prepositional phrases precede the verb." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 4. hsk5_ba_le_particle
  {
    id: "hsk5_ba_le_particle",
    level: "HSK5",
    level_num: 5,
    category: "particle",
    difficulty: 4,
    frequency: 4,
    register: "neutral",
    keywords: ["罢了", "而已", "bàle", "éryǐ", "chỉ là mà thôi", "chẳng qua", "にすぎない", "merely", "nothing more than"],
    formula: "(不过 / 只是 / 无非 / 仅仅) + S + VP + 罢了 / 而已",
    formula_plain: {
      vi: "(Chẳng qua / Chỉ là) ... mà thôi / vậy thôi",
      ja: "「（ただ〜にすぎない／〜というだけのことだ）…罢了／而已」",
      en: "(It is merely / nothing more than) ... that is all /罢了 / 而已"
    },
    structure_blocks: [
      { label: { vi: "Phó từ giới hạn (不过/只是)", ja: "限定副詞 (不过/只是)", en: "Limiting Adverb" }, role: "adverb", color: "#F59E0B" },
      { label: { vi: "Mệnh đề sự việc", ja: "事象節", en: "Core Clause" }, role: "verb", color: "#3B82F6" },
      { label: { vi: "Trợ từ ngữ khí (罢了/而已)", ja: "語気助詞 (罢了/而已)", en: "Final Particle" }, role: "particle", color: "#EC4899" }
    ],
    related_ids: ["hsk1_le_change_state", "hsk2_jiu_adverb"],
    confusable_with: [
      {
        id: "hsk1_le_change_state",
        diff: {
          vi: "Trợ từ 了 đơn thuần chỉ sự thay đổi hoặc hoàn thành. Còn 罢了 (đọc là bàle) là ngữ khí làm nhẹ mức độ nghiêm trọng ('chỉ thế mà thôi, không có gì to tát').",
          ja: "「了」は完了・変化ですが、「罢了（bàle）」は「大したことではない、〜にすぎない」と事態を軽く見せる語気助詞です。",
          en: "Unlike normal 了, 罢了 (bàle) downplays significance ('merely, nothing more')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Trợ từ ngữ khí 而已 / 罢了 (chỉ... mà thôi)",
        quick_rule_3s: "Đặt 罢了 hoặc 而已 ở cuối câu để hạ thấp tầm quan trọng của sự việc: Tôi chỉ đùa một chút thôi mà (我不过开个玩笑罢了).",
        contrastive_note: "Tiếng Việt nói 'chỉ là... mà thôi / vậy thôi'. Phía trước thường hô ứng với các phó từ: 不过, 只是, 无非, 仅仅.",
        analogy: "Chiếc nút 'hạ nhiệt' cảm xúc: khi đối phương lo lắng hay tức giận, thêm 罢了 để nói 'việc nhỏ ấy mà, đừng bận tâm'.",
        mnemonic: "Thôi bãi đi (罢了), chỉ là chuyện nhỏ mà thôi (而已).",
        how_to_use: [
          { step: 1, text: "Thêm phó từ hạn định ở vế trước (只是, 不过, 仅仅)." },
          { step: 2, text: "Trình bày sự việc bình thường." },
          { step: 3, text: "Thêm 罢了 (khẩu ngữ nhẹ nhàng) hoặc 而已 (văn viết trang trọng) ở cuối câu." }
        ],
        self_check: ["Có ý nghĩa hạ nhẹ mức độ sự việc không?", "Có thể kết hợp với 不过 hoặc 只是 không?"],
        tips: ["Khẩu ngữ thích dùng 罢了 (bàle), văn phong sách báo thích dùng 而已 (éryǐ) hoặc 仅此而已 (chỉ có thế mà thôi)."],
        when_to_use: ["Khiêm tốn khi nhận lời khen, an ủi người khác, xoa dịu mâu thuẫn."],
        when_not_to_use: ["Khi thông báo sự việc khẩn cấp hoặc hậu quả nghiêm trọng."],
        fatal_mistake: {
          wrong: "罢了，这件事我不知道。(Đặt 罢了 ở đầu câu làm trợ từ cuối câu).",
          correct: "我不知道罢了。/ 算了，这件事我不提了。",
          explanation: "Trợ từ ngữ khí 罢了 / 而已 phải đứng ở cuối câu hoặc cuối phân câu."
        }
      },
      ja: {
        title: "文末助詞「而已／罢了」（〜にすぎない）",
        quick_rule_3s: "文末に「罢了」または「而已」を置き、「ただ〜にすぎない」と事態を軽視・謙遜します。",
        contrastive_note: "日本語の「〜にすぎない」「〜だけのことだ」に対応。文頭の「不过／只是」と呼応します。",
        analogy: "事態の重要度ボリュームを下げるスライダーのような助詞です。",
        mnemonic: "文頭「ただ」、文末「にすぎない（罢了）」。",
        how_to_use: [
          { step: 1, text: "文頭に「不过」「只是」を置く。" },
          { step: 2, text: "内容を述べる。" },
          { step: 3, text: "文末に「罢了」または「而已」を配置。" }
        ],
        self_check: ["事態を軽く位置づけるニュアンスになっていますか？"],
        tips: ["口語では「罢了」、書面語では「而已」が好まれます。"],
        when_to_use: ["謙遜、相手をなだめる場面、弁明。"],
        when_not_to_use: ["重大な事件の警告。"],
        fatal_mistake: {
          wrong: "罢了我不去了。",
          correct: "我不想去罢了。",
          explanation: "文末助詞であるため文末に配置します。"
        }
      },
      en: {
        title: "Sentence-final particles 而已 (éryǐ) and 罢了 (bàle)",
        quick_rule_3s: "Place 罢了 or 而已 at the end to mean 'merely / nothing more than / that is all'.",
        contrastive_note: "Frequently pairs with preceding adverbs 不过, 只是, or 仅仅.",
        analogy: "A rhetorical volume-down button that minimizes seriousness or shows modesty.",
        mnemonic: "Put 罢了 at the end to brush off a fuss: 'It was just that, nothing more.'",
        how_to_use: [
          { step: 1, text: "Begin with 不过, 只是, or 无非." },
          { step: 2, text: "State the action or fact." },
          { step: 3, text: "Finish sentence with 罢了 (spoken) or 而已 (formal)." }
        ],
        self_check: ["Does it minimize the situation?"],
        tips: ["Spoken: 罢了 (bàle). Written: 而已 (éryǐ) or 仅此而已."],
        when_to_use: ["Downplaying an issue, consoling someone, displaying modesty."],
        when_not_to_use: ["Stating emergencies or grave consequences."],
        fatal_mistake: {
          wrong: "罢了, I did not go.",
          correct: "I simply did not go, that's all (我没去罢了).",
          explanation: "罢了 must appear at the end of the clause."
        }
      }
    },
    collocations: [
      { zh: "开个玩笑罢了", pinyin: "kāi ge wánxiào bàle", tr: { vi: "chỉ đùa một chút thôi mà", ja: "冗談を言っただけにすぎない", en: "just making a joke, that is all" } },
      { zh: "仅此而已", pinyin: "jǐn cǐ ér yǐ", tr: { vi: "chỉ có vậy mà thôi", ja: "これだけにすぎない", en: "nothing more than this" } }
    ],
    examples: [
      {
        zh: "你不必太往心里去，大家只是提出一些建设性的参考意见罢了。",
        pinyin: "Nǐ búbì tài wǎng xīnlǐ qù, dàjiā zhǐshì tíchū yìxiē jiànshèxìng de cānkǎo yìjiàn bàle.",
        tokens: [
          { hanzi: "你", pinyin: "nǐ", role: "subject", hanviet: "nhĩ" },
          { hanzi: "不必", pinyin: "búbì", role: "adverb", hanviet: "bất tất" },
          { hanzi: "太往心里去", pinyin: "tài wǎng xīnlǐ qù", role: "verb", hanviet: "thái vãng tâm lý khứ" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "大家", pinyin: "dàjiā", role: "subject", hanviet: "đại gia" },
          { hanzi: "只是", pinyin: "zhǐshì", role: "adverb", hanviet: "chỉ thị" },
          { hanzi: "提出", pinyin: "tíchū", role: "verb", hanviet: "đề xuất" },
          { hanzi: "参考意见", pinyin: "cānkǎo yìjiàn", role: "object", hanviet: "tham khảo ý kiến" },
          { hanzi: "罢了", pinyin: "bàle", role: "particle", hanviet: "bãi liễu" }
        ],
        translations: {
          vi: "Bạn không cần phải để bụng đâu, mọi người chẳng qua chỉ đưa ra vài ý kiến tham khảo mang tính xây dựng mà thôi.",
          ja: "あまり気に病む必要はありませんよ。皆は建設的な参考意見を出したにすぎないのですから。",
          en: "You do not need to take it to heart; everyone was merely offering some constructive suggestions, that is all."
        },
        scenario: "Động viên đồng nghiệp sau buổi họp",
        tone_tip: "Đọc 罢了 (bàle) với thanh nhẹ, hạ thấp giọng ở cuối câu."
      }
    ],
    dialogue: {
      goal: { vi: "Khiêm tốn khi nhận lời khen ngợi", ja: "賞賛に対する謙遜", en: "Modest response to praise" },
      lines: [
        { speaker: "同事", zh: "听说这次的大订单全凭你一人的谈判技巧拿下的？太厉害了！", pinyin: "Tīngshuō zhè cì de dà dìngdān quán píng nǐ yī rén de tánpàn jìqiǎo ná xià de? Tài lìhai le!", tr: { vi: "Nghe nói đơn hàng lớn lần này dựa vào tài đàm phán của một mình bạn mà chốt được đấy? Đỉnh thật!", ja: "今度の大口受注は君の交渉力一つで勝ち取ったんだって？すごいね！", en: "Heard you secured this massive order entirely on your negotiation skills? Impressive!" } },
        { speaker: "小张", zh: "哪里哪里，我不过是做好了分内的准备工作罢了，是全团队的功劳。", pinyin: "Nǎli nǎli, wǒ búguò shì zuò hǎo le fènnèi de zhǔnbèi gōngzuò bàle, shì quán tuánduì de gōngláo.", tr: { vi: "Đâu có đâu có, tôi chẳng qua chỉ làm tốt phần việc chuẩn bị trong trách nhiệm của mình thôi mà, công lao là của cả đội.", ja: "とんでもない、私は自分の持ち分の準備をこなしただけにすぎません。チーム全員の功績ですよ。", en: "Not at all, I was merely doing my share of prep work, that is all. It is a team credit." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["我不过是", "说了几句", "实话罢了", "你何必生气"],
        correct_order: ["我不过是", "说了几句", "实话罢了", "你何必生气"]
      }
    ],
    fill_blank: [
      {
        sentence: "这件事情本来并不复杂，无非是他多虑了____。",
        options: ["罢了", "的话", "以来", "所致"],
        answer_index: 0,
        explanation: {
          vi: "Hô ứng với '无非' (chẳng qua là) ở đầu vế là '罢了' ở cuối câu (chẳng qua là anh ấy nghĩ nhiều mà thôi).",
          ja: "「无非…罢了」（〜にすぎない）の呼応です。",
          en: "无非 pairs with 罢了 at the end of the clause."
        }
      }
    ],
    error_correction: [
      {
        wrong: "罢了，他不过是一个实习生。",
        correct: "他不过是一个实习生罢了。",
        hint: {
          vi: "罢了 phải đặt ở cuối câu để biểu thị ngữ khí 'chỉ là... mà thôi'.",
          ja: "「罢了」は文頭ではなく文末に配置します。",
          en: "罢了 must appear sentence-finally."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Câu nào sau đây diễn đạt sắc thái khiêm tốn hoặc coi nhẹ vấn đề đúng ngữ pháp?",
          ja: "事態を控えめに表現する文として最も自然なものはどれですか？",
          en: "Which sentence correctly conveys modesty or minimization?"
        },
        options: [
          "我只是尽了一点微薄之力罢了。",
          "他去了北京罢了，所以很高兴。",
          "因为下雨罢了，所以没去。",
          "既然你来了罢了，就坐下吧。"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "我只是...罢了: Tôi chỉ cống hiến chút sức lực mọn mà thôi.",
          ja: "「ただ〜したにすぎない」という謙遜表現として完全に合致します。",
          en: "Correct modest usage: I merely contributed a modest effort, that is all."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "不过/只是... 罢了/而已: Chẳng qua chỉ là... mà thôi.",
        ja: "「ただ〜にすぎない」と事態を軽視・謙遜する文末助詞。",
        en: "Merely / nothing more than ... that is all."
      },
      remember: [
        { vi: "Luôn đặt 罢了 / 而已 ở cuối câu hoặc phân câu.", ja: "必ず文末に配置する。", en: "Always placed clause-finally." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 5. hsk6_classical_zhi_qi_yi_wei
  {
    id: "hsk6_classical_zhi_qi_yi_wei",
    level: "HSK6",
    level_num: 6,
    category: "written_style",
    difficulty: 5,
    frequency: 5,
    register: "formal",
    keywords: ["之", "其", "以", "为", "乃", "即", "则", "zhī", "qí", "yǐ", "wéi", "văn ngôn", "hư từ cổ văn", "classical particles"],
    formula: "NP1 + 之 + NP2  hoặc  其 + N (nó/của nó)  hoặc  以…为… (lấy... làm...)",
    formula_plain: {
      vi: "Hư từ cổ văn trong tiếng Trung hiện đại: 之 (của / đại từ), 其 (của nó/họ), 以...为... (lấy... làm...)",
      ja: "「之（〜の／これ）」「其（その）」「以…为…（〜をもって…となす）」など現代語に残る漢文語彙",
      en: "Classical Chinese particles in formal prose: 之 (possessive/pronoun), 其 (its/their), 以...为... (regard... as...)"
    },
    structure_blocks: [
      { label: { vi: "Hư từ cổ văn (之/其/以/为)", ja: "文語虚詞 (之/其/以/为)", en: "Classical Particle" }, role: "particle", color: "#8B5CF6" },
      { label: { vi: "Thực từ trung tâm", ja: "実詞", en: "Content Word" }, role: "object", color: "#3B82F6" }
    ],
    related_ids: ["hsk5_suo_verb_de_nominalization", "hsk6_yu_postverbal_preposition"],
    confusable_with: [
      {
        id: "hsk5_suo_verb_de_nominalization",
        diff: {
          vi: "之 tương đương với 的 (của) hoặc 这/它 (cái này/nó). 其 tương đương với 他的/它的 (của nó). Chúng làm câu văn cực kỳ cô đọng, súc tích kiểu thư tịch cổ.",
          ja: "「之」は現代語の「的」「它」、「其」は「它的」「他们的」に相当し、極めて簡潔で重厚な文体を生み出します。",
          en: "之 corresponds to 的 or 它, and 其 to 它的/他们的, conferring concise classical dignity."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Hư từ cổ văn trong tiếng Trung hiện đại (之, 其, 以, 为, 乃, 即, 则)",
        quick_rule_3s: "Nắm vững 3 hư từ cốt lõi: 之 = 的 (sở hữu) hoặc 它 (đại từ tân ngữ); 其 = 它的 (định ngữ sở hữu); 以...为... = coi... là...",
        contrastive_note: "Ảnh hưởng từ chữ Hán cổ, tiếng Việt có các từ Hán-Việt như 'chi' (quang chi lân = vinh dự của tôi), 'kỳ' (kỳ thực = thực chất của nó).",
        analogy: "Như những viên ngọc cổ được chạm khắc vào ngôn ngữ hiện đại để tạo nên sự trang trọng, uy nghiêm cho văn bản.",
        mnemonic: "Chi (之) là của, Kỳ (其) là nó, Dĩ (以) là lấy, Vi (为) là làm.",
        how_to_use: [
          { step: 1, text: "Dùng 之 thay cho 的 trong tiêu đề, danh ngữ trang trọng (như 解决之道, 成功之门)." },
          { step: 2, text: "Dùng 其 thay cho 它的 hoặc 他们的 (như 极其重要, 其主要原因)." },
          { step: 3, text: "Dùng 以...为... để định nghĩa tôn chỉ (như 以人为本 = lấy con người làm gốc)." }
        ],
        self_check: ["Tiêu đề hoặc văn bản có cần độ cô đọng cao cấp không?"],
        tips: ["Tứ tự thành ngữ và khẩu hiệu doanh nghiệp dùng cấu trúc này tới 80%: 以质量求生存, 取之不尽."],
        when_to_use: ["Tuyên ngôn doanh nghiệp, hiến pháp, xã luận, bài phát biểu cấp nhà nước."],
        when_not_to_use: ["Hội thoại khẩu ngữ thường nhật."],
        fatal_mistake: {
          wrong: "我的妈妈之包。(Lạm dụng 之 cho ngôn ngữ khẩu ngữ gia đình).",
          correct: "我妈妈的包。/ 母亲之手提包 (trong thi ca).",
          explanation: "Không dùng 之 thay thế bừa bãi cho 的 trong các câu khẩu ngữ đời thường."
        }
      },
      ja: {
        title: "現代語に残る文語虚詞（之・其・以・为・乃・即・则）",
        quick_rule_3s: "之（的／それ）、其（その）、以…为…（〜を…とする）の古典語順を現代公用語に活用します。",
        contrastive_note: "日本語の漢文訓読（之＝の・これ、其＝その、以て〜と為す）と完全に共通の概念です。",
        analogy: "現代文に格式高い漢文の格調を吹き込むエッセンスです。",
        mnemonic: "之はの、其はその、以はもって、為はなす。",
        how_to_use: [
          { step: 1, text: "的の代わりに「之」を配置（成功之母）。" },
          { step: 2, text: "它的の代わりに「其」を用いる（其原因）。" },
          { step: 3, text: "「以〜为〜」で理念を表現（以人为本）。" }
        ],
        self_check: ["硬い書面語として自然ですか？"],
        tips: ["企業スローガンや公的標語の定番語彙。"],
        when_to_use: ["社是、公式宣言、論文タイトル、論説文。"],
        when_not_to_use: ["日常会話。"],
        fatal_mistake: {
          wrong: "今天之天气很好。",
          correct: "今天的天气很好。",
          explanation: "日常会話に之を無差別に適用するのは不自然です。"
        }
      },
      en: {
        title: "Classical Chinese particles in modern formal prose (之, 其, 以, 为, 乃, 即, 则)",
        quick_rule_3s: "之 = 的 or pronoun 'it'; 其 = 'its/their'; 以...为... = 'regard ... as ...'.",
        contrastive_note: "Classical particles yield concise, high-register prose analogous to Latinate idioms in formal English.",
        analogy: "Like using 'thereof' or 'ipso facto' to craft dignified constitutional language.",
        mnemonic: "之 for 'of/it', 其 for 'its', 以...为 for 'take A as B'.",
        how_to_use: [
          { step: 1, text: "Substitute 的 with 之 in formal titles (e.g. 解决之道)." },
          { step: 2, text: "Substitute 它的 with 其 (e.g. 其主要特征)." },
          { step: 3, text: "Use 以...为... for core mottos (e.g. 以诚信为本)." }
        ],
        self_check: ["Is this a formal motto, legal title, or high-register essay?"],
        tips: ["High-frequency core motto: 以人为本 (people-oriented)."],
        when_to_use: ["Company credos, legal texts, academic treatises."],
        when_not_to_use: ["Everyday spoken banter."],
        fatal_mistake: {
          wrong: "我之电脑很贵。",
          correct: "我的电脑很贵。",
          explanation: "Do not inject 之 into casual conversational speech."
        }
      }
    },
    collocations: [
      { zh: "以人为本", pinyin: "yǐ rén wéi běn", tr: { vi: "lấy con người làm gốc", ja: "人間本位・人を基本とする", en: "people-oriented" } },
      { zh: "解决之道", pinyin: "jiějué zhī dào", tr: { vi: "con đường giải quyết", ja: "解決の道", en: "way of resolution" } },
      { zh: "各得其所", pinyin: "gè dé qí suǒ", tr: { vi: "mỗi người đều được sắp xếp thỏa đáng", ja: "各自が適切な場所を得る", en: "everyone in their proper place" } }
    ],
    examples: [
      {
        zh: "企业当以诚信为立身之本，方能行稳致远，赢得市场之信赖。",
        pinyin: "Qǐyè dāng yǐ chéngxìn wéi lìshēn zhī běn, fāng néng xíng wěn zhì yuǎn, yíngdé shìchǎng zhī xìnlài.",
        tokens: [
          { hanzi: "企业", pinyin: "qǐyè", role: "subject", hanviet: "xí nghiệp" },
          { hanzi: "以", pinyin: "yǐ", role: "preposition", hanviet: "dĩ" },
          { hanzi: "诚信", pinyin: "chéngxìn", role: "object", hanviet: "thành tín" },
          { hanzi: "为", pinyin: "wéi", role: "verb", hanviet: "vi" },
          { hanzi: "立身之本", pinyin: "lìshēn zhī běn", role: "object", hanviet: "lập thân chi bản" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "赢得", pinyin: "yíngdé", role: "verb", hanviet: "doanh đắc" },
          { hanzi: "市场之信赖", pinyin: "shìchǎng zhī xìnlài", role: "object", hanviet: "thị trường chi tín lại" }
        ],
        translations: {
          vi: "Doanh nghiệp phải lấy chữ tín làm gốc lập thân, mới có thể vững bước đi xa và giành được sự tín nhiệm của thị trường.",
          ja: "企業は誠信を身を立てる根本と為してこそ、着実に遠くまで歩み、市場の信頼を勝ち得ることができる。",
          en: "Enterprises must take integrity as the foundation of existence in order to progress steadily and win the trust of the market."
        },
        scenario: "Tuyên ngôn sứ mệnh doanh nghiệp",
        tone_tip: "Đọc với khẩu khí trang trọng, nhịp điệu 4 chữ đăng đối."
      }
    ],
    dialogue: {
      goal: { vi: "Bàn về triết lý quản trị công ty", ja: "経営理念の策定", en: "Management philosophy discussion" },
      lines: [
        { speaker: "董事长", zh: "我们新一轮战略的核心理念应该如何提炼？", pinyin: "Wǒmen xīn yī lún zhànlüè de héxīn lǐniàn yīnggāi rúhé tíliàn?", tr: { vi: "Triết lý cốt lõi của chiến lược vòng mới này nên đúc kết thế nào?", ja: "我々の新戦略における中核理念はどう凝縮すべきでしょうか？", en: "How should the core philosophy of our new strategy be distilled?" } },
        { speaker: "顾问", zh: "当坚持‘以创新为引领，以客户为中心’之方针。", pinyin: "Dāng jiānchí ‘yǐ chuàngxīn wéi yǐnlǐng, yǐ kèhù wéi zhōngxīn’ zhī fāngzhēn.", tr: { vi: "Nên kiên trì phương châm 'lấy đổi mới làm dẫn đường, lấy khách hàng làm trung tâm'.", ja: "「イノベーションを先導とし、顧客を中心と為す」方針を堅持すべきです。", en: "We should uphold the guideline of taking innovation as the driver and customers as the center." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["现代企业", "当坚持", "以人为本", "之管理理念"],
        correct_order: ["现代企业", "当坚持", "以人为本", "之管理理念"]
      }
    ],
    fill_blank: [
      {
        sentence: "失败乃成功____母，这是千古不变之哲理。",
        options: ["之", "其", "以", "所"],
        answer_index: 0,
        explanation: {
          vi: "Thành ngữ: 失败乃成功之母 (Thất bại là mẹ của thành công - 之 = 的).",
          ja: "「失敗は成功の母（之母）」の有名格言です。",
          en: "Classic proverb: 失败乃成功之母 (Failure is the mother of success)."
        }
      }
    ],
    error_correction: [
      {
        wrong: "我们以客户作为是第一位。",
        correct: "我们以客户为第一位。",
        hint: {
          vi: "Cấu trúc cổ văn là 以...为..., không chèn thêm 作为 hay 是.",
          ja: "構文は「以…为…」であり、「作为是」は二重表現です。",
          en: "Use the clean classical structure 以...为..."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Trong câu '知其然，知其所以然', chữ '其' có ý nghĩa gì?",
          ja: "「知其然，知其所以然」において「其」が指し示すものは何ですか？",
          en: "In the idiom '知其然，知其所以然', what does 其 mean?"
        },
        options: [
          "Đại từ sở hữu: của nó / sự việc đó",
          "Phó từ: rất / cực kỳ",
          "Liên từ: nếu như",
          "Trợ từ ngữ khí cuối câu"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "其 ở đây là đại từ chỉ định/sở hữu: Biết nó là như vậy, và biết lý do vì sao nó lại như vậy.",
          ja: "「その実態を知り、その理由をも知る」という指示代名詞（その・それ）です。",
          en: "其 functions as a 3rd-person possessive/demonstrative pronoun ('its/it')."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "之 (của/nó), 其 (của nó), 以...为... (lấy... làm...): Hư từ cổ văn trang trọng.",
        ja: "漢文由来の簡潔で重厚な表現（之・其・以…为…）。",
        en: "Classical particles providing formal, elevated dignity."
      },
      remember: [
        { vi: "Dùng trong tuyên ngôn, khẩu hiệu, tiêu đề trang trọng.", ja: "公的宣言やスローガンで頻出。", en: "Frequent in mottoes, formal prose, and titles." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 6. hsk6_yu_postverbal_preposition
  {
    id: "hsk6_yu_postverbal_preposition",
    level: "HSK6",
    level_num: 6,
    category: "written_style",
    difficulty: 4,
    frequency: 5,
    register: "formal",
    keywords: ["于", "yú", "善于", "来自于", "多于", "đối với", "tại", "において", "than", "in", "at"],
    formula: "V / Adj + 于 + N/NP",
    formula_plain: {
      vi: "Động từ / Tính từ + 于 (ở / tại / vào lúc / đối với / hơn)",
      ja: "「動詞／形容詞 ＋ 于 ＋ 名詞」（〜において／〜より／〜から）",
      en: "Verb / Adjective + 于 (yú) + Noun (in, at, from, than, to)"
    },
    structure_blocks: [
      { label: { vi: "Vị ngữ (Động/Tính từ)", ja: "動詞・形容詞", en: "Predicate" }, role: "verb", color: "#10B981" },
      { label: { vi: "Giới từ bổ ngữ (于)", ja: "介詞 (于)", en: "Preposition (于)" }, role: "preposition", color: "#EC4899" },
      { label: { vi: "Tân ngữ bổ ngữ (Nơi/Thời/Đối tượng)", ja: "目的語", en: "Object" }, role: "object", color: "#3B82F6" }
    ],
    related_ids: ["hsk1_zai_existence_location", "hsk2_bi_comparison"],
    confusable_with: [
      {
        id: "hsk1_zai_existence_location",
        diff: {
          vi: "Khẩu ngữ đặt giới từ 在 trước động từ (在2020年出生, 在北京工作). Văn viết trang trọng đặt 于 sau động từ (生于2020年, 工作于北京).",
          ja: "口語「在＋名詞＋動詞」に対し、書面語では動詞の後に「于」を後置補語として置きます（生于2020年）。",
          en: "Spoken Chinese uses '在 + Place + Verb', whereas formal written Chinese places 于 after the verb."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc Động/Tính từ + 于 trong văn viết (生于, 善于, 勇于, 属于, 至于)",
        quick_rule_3s: "Ghép 于 ngay sau Động từ (sinh tại = 生于, thuộc về = 属于, giỏi về = 善于) hoặc Tính từ so sánh (nhiều hơn = 多于, cao hơn = 高于).",
        contrastive_note: "Chữ 于 là giới từ vạn năng trong văn ngôn: 于 = 在 (tại), 于 = 从 (từ), 于 = 比 (hơn), 于 = 对 (đối với).",
        analogy: "Chiếc đuôi kết nối đa năng gắn sau động/tính từ để neo thời gian, địa điểm, đối tượng hoặc mức độ so sánh.",
        mnemonic: "Sau V/Tính thêm 于, vừa sang văn viết vừa bằng 在/比/从.",
        how_to_use: [
          { step: 1, text: "Chỉ nơi chốn/thời gian: 生于1990年, 毕业于清华大学." },
          { step: 2, text: "Chỉ thái độ/năng lực: 善于倾听 (giỏi lắng nghe), 勇于承担 (dũng cảm nhận việc)." },
          { step: 3, text: "Chỉ so sánh mức độ: 远高于平均水平 (cao hơn nhiều so với mức trung bình)." }
        ],
        self_check: ["于 đã đứng ngay sau động từ hoặc tính từ chưa?"],
        tips: ["Các cặp so sánh: 高于 (cao hơn), 低于 (thấp hơn), 多于 (nhiều hơn), 优于 (tốt hơn)."],
        when_to_use: ["Sơ yếu lý lịch, báo cáo phân tích số liệu, văn học trang trọng."],
        when_not_to_use: ["Hỏi thăm bạn bè thông thường."],
        fatal_mistake: {
          wrong: "他于清华大学毕业。(Khẩu ngữ hóa lẫn lộn).",
          correct: "他在清华大学毕业。/ 他毕业于清华大学。",
          explanation: "Nếu dùng 于 thì đặt sau động từ: 毕业于...; nếu đặt trước thì dùng 在."
        }
      },
      ja: {
        title: "「動詞／形容詞＋于」の書面語構文",
        quick_rule_3s: "動詞・形容詞の直後に「于」を置き、時・場所・比較（〜において、〜より）を表します。",
        contrastive_note: "日本語の「〜に於いて」「〜より大なり」に対応。口語の在/比/从を1文字で代行します。",
        analogy: "述語の後ろに取り付ける高機能アタッチメントプラグです。",
        mnemonic: "生于（生まれ）、毕业于（卒業し）、高于（より高い）。",
        how_to_use: [
          { step: 1, text: "動詞の後に于を置く（例：毕业于某大学）。" },
          { step: 2, text: "形容詞の後に于を置いて比較を表す（例：高于去年）。" }
        ],
        self_check: ["于の位置が動詞・形容詞の後ろにありますか？"],
        tips: ["履歴書・公的プロフィールで必須の書式。"],
        when_to_use: ["履歴書、統計データレポート、ニュース。"],
        when_not_to_use: ["くだけた口語。"],
        fatal_mistake: {
          wrong: "他于北京出生了。",
          correct: "他在北京出生。/ 他出生于北京。",
          explanation: "于を用いる場合は動詞の後置補語にするのが自然です。"
        }
      },
      en: {
        title: "Verb/Adjective + 于 (yú) formal complement structure",
        quick_rule_3s: "Attach 于 directly after verbs (born in = 生于, graduated from = 毕业于) or adjectives (higher than = 高于).",
        contrastive_note: "Replaces spoken 在 (in/at), 从 (from), 比 (than), or 对 (towards) in formal registers.",
        analogy: "A multi-purpose postverbal prepositional dock for time, location, or comparison.",
        mnemonic: "Put 于 after the verb or adjective for instant formal elegance.",
        how_to_use: [
          { step: 1, text: "For origin/time: 毕业于 (graduated from), 生于 (born in)." },
          { step: 2, text: "For comparison: 高于 (higher than), 低于 (lower than)." }
        ],
        self_check: ["Is 于 placed postverbally?"],
        tips: ["Standard in resumes: 毕业于 + University."],
        when_to_use: ["Resumes, statistical earnings reports, academic biographies."],
        when_not_to_use: ["Everyday spoken interactions."],
        fatal_mistake: {
          wrong: "他于北京工作。",
          correct: "他在北京工作。or 他工作于北京。",
          explanation: "If using 于, position it as a postverbal complement."
        }
      }
    },
    collocations: [
      { zh: "毕业于清华大学", pinyin: "bìyè yú Qīnghuá Dàxué", tr: { vi: "tốt nghiệp đại học Thanh Hoa", ja: "清華大学を卒業した", en: "graduated from Tsinghua University" } },
      { zh: "远高于预期", pinyin: "yuǎn gāo yú yùqī", tr: { vi: "vượt xa so với dự tính", ja: "予想をはるかに上回る", en: "far higher than expectations" } }
    ],
    examples: [
      {
        zh: "本季度公司的净利润远高于去年同期水平，主要得益于海外市场的强劲增长。",
        pinyin: "Běn jìdù gōngsī de jìnglìrùn yuǎn gāo yú qùnián tóngqī shuǐpíng, zhǔyào déyì yú hǎiwài shìchǎng de qiángjìn zēngzhǎng.",
        tokens: [
          { hanzi: "净利润", pinyin: "jìnglìrùn", role: "subject", hanviet: "tịnh lợi nhuận" },
          { hanzi: "远高于", pinyin: "yuǎn gāo yú", role: "verb", hanviet: "viễn cao vu" },
          { hanzi: "同期水平", pinyin: "tóngqī shuǐpíng", role: "object", hanviet: "đồng kỳ thủy bình" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "得益于", pinyin: "déyì yú", role: "verb", hanviet: "đắc ích vu" },
          { hanzi: "强劲增长", pinyin: "qiángjìn zēngzhǎng", role: "object", hanviet: "cường kính tăng trưởng" }
        ],
        translations: {
          vi: "Lợi nhuận ròng quý này của công ty vượt xa so với cùng kỳ năm ngoái, chủ yếu nhờ vào sự tăng trưởng mạnh mẽ của thị trường hải ngoại.",
          ja: "今四半期の純利益は前年同期をはるかに上回っており、主に海外市場の力強い成長に起因している。",
          en: "The company's net profit this quarter is far higher than the same period last year, mainly benefiting from strong overseas growth."
        },
        scenario: "Báo cáo tài chính quý",
        tone_tip: "Nhấn giọng vào 高于 (gāoyú) và 得益于 (déyìyú)."
      }
    ],
    dialogue: {
      goal: { vi: "Giới thiệu lý lịch chuyên gia trong hội nghị", ja: "登壇者の経歴紹介", en: "Keynote speaker introduction" },
      lines: [
        { speaker: "主持人", zh: "现在有请张教授，他毕业于北京大学，长期致力于人工智能研究。", pinyin: "Xiànzài yǒu qǐng Zhāng jiàoshòu, tā bìyè yú Běijīng Dàxué, chángqī zhìlì yú réngōng zhìnéng yánjiū.", tr: { vi: "Sau đây xin trân trọng kính mời giáo sư Trương, ông tốt nghiệp Đại học Bắc Kinh và lâu nay cống hiến hết mình cho nghiên cứu AI.", ja: "北京大学をご卒業され、長年AI研究に尽力されてきた張教授をお迎えします。", en: "Please welcome Professor Zhang, who graduated from Peking University and has long been dedicated to AI research." } },
        { speaker: "张教授", zh: "十分荣幸受邀出席本届峰会。", pinyin: "Shífēn róngxìng shòuyāo chūxí běn jiè fēnghuì.", tr: { vi: "Tôi rất vinh hạnh được mời tham dự hội nghị thượng đỉnh lần này.", ja: "本サミットにお招きいただき大変光栄に存じます。", en: "It is a great honor to be invited to this summit." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["该款手机的销量", "远多于", "同类竞争对手的", "所有产品"],
        correct_order: ["该款手机的销量", "远多于", "同类竞争对手的", "所有产品"]
      }
    ],
    fill_blank: [
      {
        sentence: "这位年轻科学家出生____江南水乡，自幼酷爱自然科学。",
        options: ["于", "在", "向", "为"],
        answer_index: 0,
        explanation: {
          vi: "Thành ngữ tiểu sử: 出生于 + Nơi chốn (sinh ra tại).",
          ja: "「出生于＋地名」で出身地を示す書面語です。",
          en: "Postverbal complement: 出生于 (born in)."
        }
      }
    ],
    error_correction: [
      {
        wrong: "今年的出口总额高在去年。",
        correct: "今年的出口总额高于去年。",
        hint: {
          vi: "So sánh hơn trong văn viết dùng Tính từ + 于 (高于), không dùng 高在.",
          ja: "比較を表す場合は「高于」を用います。",
          en: "Use 高于 for comparison (higher than), not 高在."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Cụm từ nào biểu đạt ý 'rất giỏi trong việc lắng nghe người khác'?",
          ja: "「他人の意見を聞くのに長けている」を表す適切な成語表現はどれですか？",
          en: "Which phrase means 'good at listening to others'?"
        },
        options: ["善于倾听", "勇于倾听", "归于倾听", "敢于倾听"],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "善于 + Động từ: khéo léo, giỏi về việc gì (善于倾听).",
          ja: "「善于＋動詞」で〜に長けていることを表します。",
          en: "善于 means 'to be good at / adept in'."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V/Adj + 于: Nối thời gian, địa điểm, đối tượng hoặc mức độ so sánh hơn.",
        ja: "動詞・形容詞の後ろに置き、場所・時・比較を表す文語補語。",
        en: "Verb/Adj + 于: Formal prepositional complement for location, time, or comparison."
      },
      remember: [
        { vi: "So sánh: 高于 (cao hơn), 低于 (thấp hơn), 多于 (nhiều hơn).", ja: "比較は「形容詞＋于」。", en: "Comparative: Adj + 于." },
        { vi: "Lý lịch: 毕业于 (tốt nghiệp tại), 生于 (sinh năm/tại).", ja: "経歴は「動詞＋于」。", en: "Biographical: Verb + 于." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 7. hsk6_gu_ran_dan_concession
  {
    id: "hsk6_gu_ran_dan_concession",
    level: "HSK6",
    level_num: 6,
    category: "conjunction",
    difficulty: 5,
    frequency: 4,
    register: "formal",
    keywords: ["固然", "gùrán", "固然但是", "đành rằng", "dẫu rằng", "確かにだが", "admittedly", "it is true that"],
    formula: "A 固然…，但 / 可是 / 也 B…",
    formula_plain: {
      vi: "Đành rằng / Dẫu rằng A là đúng, nhưng B mới là trọng điểm",
      ja: "「確かに〜ではあるが（固然）、しかし〜（但／也）」事実を認めた上での反論・転折",
      en: "Admittedly / Granted that A is true (固然), but B..."
    },
    structure_blocks: [
      { label: { vi: "Liên từ xác nhận nhượng bộ (固然)", ja: "譲歩接続詞 (固然)", en: "Concessive (固然)" }, role: "conjunction", color: "#F59E0B" },
      { label: { vi: "Sự thật hiển nhiên (A)", ja: "既定事実 (A)", en: "Acknowledged Fact" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Liên từ chuyển ý (但/然而/也)", ja: "逆接接続詞 (但/然而/也)", en: "Adversative (但)" }, role: "conjunction", color: "#EF4444" },
      { label: { vi: "Luận điểm cốt lõi (B)", ja: "主張核心 (B)", en: "Core Point" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk2_suiran_danshi", "hsk5_he_kuang_let_alone"],
    confusable_with: [
      {
        id: "hsk2_suiran_danshi",
        diff: {
          vi: "虽然...但是 chỉ là quan hệ nhượng bộ thông thường. 固然...但是 mang hàm ý 'công nhận thực tế vế 1 là đúng đắn, không thể phủ nhận', rồi mới lái trọng tâm sang vế 2.",
          ja: "「虽然」が客観的譲歩であるのに対し、「固然」は相手の主張や事実を一度完全に承認（確かにその通りだが）した上で議論を発展させます。",
          en: "虽然 is standard concession ('although'), while 固然 signals strong rhetorical admission ('granted, admittedly') before pivoting."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc nhượng bộ xác nhận 固然..., 但/也... (đành rằng..., nhưng...)",
        quick_rule_3s: "Dùng 固然 khi thừa nhận vế A đúng, nhưng trọng tâm lập luận thực sự nằm ở vế B: Tốc độ đành rằng quan trọng, nhưng chất lượng mới là sinh mệnh.",
        contrastive_note: "Tiếng Việt nói 'đành rằng..., song...', 'dẫu rằng..., nhưng...'. Tạo thế đàm phán rất lịch thiệp vì không phủ nhận ý kiến đối phương.",
        analogy: "Chiếc đệm ngoại giao: gật đầu đồng ý trước để đối phương thoải mái, rồi mới tung ra quan điểm mấu chốt của mình.",
        mnemonic: "Cố nhiên (固然) thừa nhận thực tế, Đãn thị (但是) mới là đích đến.",
        how_to_use: [
          { step: 1, text: "Đặt 固然 sau chủ ngữ hoặc đầu vế 1 để thừa nhận sự thật." },
          { step: 2, text: "Dùng 但是, 但, 然而 hoặc 也 ở đầu vế 2 để chuyển hướng." },
          { step: 3, text: "Đưa ra luận điểm trọng tâm mang tính quyết định." }
        ],
        self_check: ["Vế 1 có phải là sự thật ai cũng công nhận không?", "Vế 2 có chứa giải pháp hoặc lập luận chính không?"],
        tips: ["Mẫu câu đàm phán vàng: 价格固然重要，但售后服务才是合作的长久保障."],
        when_to_use: ["Đàm phán kinh doanh, phản biện học thuật, xã luận đánh giá hai mặt."],
        when_not_to_use: ["Khi vế 1 hoàn toàn sai sự thật."],
        fatal_mistake: {
          wrong: "固然他不来，所以我们取消了。(Nhầm với nguyên nhân kết quả).",
          correct: "他固然有事不能来，但会议仍照常进行。",
          explanation: "固然 biểu thị nhượng bộ, vế sau phải đi với liên từ đối lập (但, 然而), không đi với 所以."
        }
      },
      ja: {
        title: "事実承認の譲歩「固然…，但／也…」（確かに〜だが、しかし〜）",
        quick_rule_3s: "前節の事実を「確かに〜だ」と認めた上で、真の論点を後節「但」で提示します。",
        contrastive_note: "日本語の「確かに〜ではあるが、しかし〜」「言うまでもなく〜だが」と合致します。",
        analogy: "相手のパンチを一度受け流して懐に入り、自分の主張を展開する合気道のような構文。",
        mnemonic: "固然で一歩譲り、但是で前進。",
        how_to_use: [
          { step: 1, text: "第1節に固然を置き、否定できない長所や事実を認める。" },
          { step: 2, text: "第2節に但/然而を置いて本題に入る。" }
        ],
        self_check: ["前節の事実が肯定的・承認可能な内容になっていますか？"],
        tips: ["ビジネス交渉のクッション言葉として最重要。"],
        when_to_use: ["交渉、ディベート、学術論文の対比。"],
        when_not_to_use: ["因果関係の文。"],
        fatal_mistake: {
          wrong: "固然下雨，所以取消。",
          correct: "下雨固然带来了不便，但活动仍将如期举行。",
          explanation: "固然は因果関係ではなく譲歩逆接を表します。"
        }
      },
      en: {
        title: "Admittedly... but... with 固然 (gùrán)",
        quick_rule_3s: "Acknowledge an undisputed point with 固然 ('admittedly/it is true that'), then pivot with 但.",
        contrastive_note: "Stronger and more rhetorical than 虽然; signals diplomatic concession.",
        analogy: "The rhetorical velvet glove: acknowledge first, then introduce your decisive counterpoint.",
        mnemonic: "固然 = granted; 但 = but this is what matters.",
        how_to_use: [
          { step: 1, text: "State the acknowledged premise with 固然." },
          { step: 2, text: "Pivot with 但, 然而, or 可是 in clause 2." }
        ],
        self_check: ["Is clause 1 an acknowledged merit/fact, followed by an adversative pivot?"],
        tips: ["Golden negotiation phrase: 价格固然关键，但品质才是核心."],
        when_to_use: ["Contract negotiations, scholarly debate, balanced editorial critiques."],
        when_not_to_use: ["Simple causal cause-and-effect statements."],
        fatal_mistake: {
          wrong: "固然 it rained, therefore we cancelled.",
          correct: "Rain is admittedly an inconvenience, but the event goes on as scheduled.",
          explanation: "固然 expresses concession, not causation."
        }
      }
    },
    collocations: [
      { zh: "价格固然重要，但质量更关键", pinyin: "jiàgé gùrán zhòngyào, dàn zhìliàng gèng guānjiàn", tr: { vi: "giá cả đành rằng quan trọng, nhưng chất lượng còn then chốt hơn", ja: "価格は確かに重要だが、品質はより決定打となる", en: "price is admittedly important, but quality is more vital" } }
    ],
    examples: [
      {
        zh: "快速占领市场固然是当务之急，然而若忽视了合规风险，后果将不堪设想。",
        pinyin: "Kuàisù zhànlǐng shìchǎng gùrán shì dāngwùzhījí, rán'ér ruò hūshì le héguī fēngxiǎn, hòuguǒ jiāng bùkānshèxiǎng.",
        tokens: [
          { hanzi: "快速占领市场", pinyin: "kuàisù zhànlǐng shìchǎng", role: "subject", hanviet: "khoái tốc chiêm lĩnh thị trường" },
          { hanzi: "固然", pinyin: "gùrán", role: "conjunction", hanviet: "cố nhiên" },
          { hanzi: "是", pinyin: "shì", role: "copula", hanviet: "thị" },
          { hanzi: "当务之急", pinyin: "dāngwùzhījí", role: "object", hanviet: "đương vụ chi cấp" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "然而", pinyin: "rán'ér", role: "conjunction", hanviet: "nhiên nhi" },
          { hanzi: "若忽视合规风险", pinyin: "ruò hūshì héguī fēngxiǎn", role: "subject", hanviet: "nhược hốt thị hợp quy phong hiểm" },
          { hanzi: "后果不堪设想", pinyin: "hòuguǒ bùkānshèxiǎng", role: "verb", hanviet: "hậu quả bất kham thiết tưởng" }
        ],
        translations: {
          vi: "Nhanh chóng chiếm lĩnh thị trường đành rằng là nhiệm vụ cấp bách trước mắt, song nếu phớt lờ rủi ro tuân thủ pháp lý thì hậu quả sẽ khôn lường.",
          ja: "市場の迅速な獲得は確かに喫緊の課題であるが、コンプライアンスリスクを軽視すれば、取り返しのつかない結果を招く。",
          en: "Rapidly capturing the market is admittedly an urgent priority; however, ignoring compliance risks will lead to unthinkable consequences."
        },
        scenario: "Phân tích rủi ro chiến lược doanh nghiệp",
        tone_tip: "Nhấn mạnh vào 固然 (gùrán) rồi chuyển trọng âm mạnh sang 然而 (rán'ér)."
      }
    ],
    dialogue: {
      goal: { vi: "Thương lượng điều khoản thanh toán", ja: "決済条件の折衝", en: "Payment terms negotiation" },
      lines: [
        { speaker: "买方", zh: "我们希望全额采用信用证结算，以规避贸易风险。", pinyin: "Wǒmen xīwàng quán'é cǎiyòng xìnyòngzhèng jiésuàn, yǐ guībì màoyì fēngxiǎn.", tr: { vi: "Chúng tôi muốn thanh toán toàn bộ bằng L/C để phòng ngừa rủi ro thương mại.", ja: "貿易リスクを回避するため全額L/C決済を希望します。", en: "We prefer 100% L/C settlement to hedge trade risk." } },
        { speaker: "卖方", zh: "信用证固然安全，但开证手续冗长，恐怕会严重延误本批交货期。", pinyin: "Xìnyòngzhèng gùrán ānquán, dàn kāizhèng shǒuxù rǒngcháng, kǒngpà huì yánzhòng yánwù běn pī jiāohuò qī.", tr: { vi: "L/C đành rằng an toàn, nhưng thủ tục mở chứng từ rườm rà, e rằng sẽ làm chậm nghiêm trọng kỳ hạn giao hàng lần này.", ja: "信用状は確かに安全ですが、開設手続きに時間がかかり、納期が遅延する恐れがあります。", en: "L/C is admittedly safe, but procedural delays will severely jeopardize delivery schedules." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["降低成本", "固然重要", "但绝不能", "牺牲产品品质"],
        correct_order: ["降低成本", "固然重要", "但绝不能", "牺牲产品品质"]
      }
    ],
    fill_blank: [
      {
        sentence: "工作效率____需要提升，但团队的身心健康同样不可忽视。",
        options: ["固然", "因为", "哪怕", "从而"],
        answer_index: 0,
        explanation: {
          vi: "Thừa nhận vế trước đúng: 固然...但... (Hiệu suất công việc đành rằng cần nâng cao, nhưng sức khỏe cũng quan trọng).",
          ja: "「固然…但…」（確かに〜だが…）の承認譲歩構文です。",
          en: "固然 fits the concession pattern paired with 但."
        }
      }
    ],
    error_correction: [
      {
        wrong: "他固然很聪明，所以考上了大学。",
        correct: "他因为很聪明，所以考上了大学。/ 他固然很聪明，但如果不努力也不会成功。",
        hint: {
          vi: "固然 là liên từ nhượng bộ, không đi với 所以 chỉ quan hệ nhân quả.",
          ja: "固然は因果の所以と結びつきません。但是と呼応させます。",
          en: "固然 requires an adversative connective (但), not causal 所以."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Điểm khác biệt mấu chốt giữa '固然' và '虽然' là gì?",
          ja: "「固然」と「虽然」のニュアンス上の決定的な違いは何ですか？",
          en: "What is the key difference between 固然 and 虽然?"
        },
        options: [
          "固然 mang sắc thái xác nhận sự thật hiển nhiên không thể chối cãi trước khi chuyển ý",
          "固然 chỉ dùng cho câu phủ định",
          "固然 không thể đi cùng với 但是",
          "虽然 chỉ dùng trong văn bản cổ văn"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja", "en"],
        explanation: {
          vi: "固然 mang tính 'thừa nhận một tiền đề chắc chắn đúng' (cố nhiên/dĩ nhiên), mang sắc thái ngoại giao và lập luận sắc bén hơn 虽然.",
          ja: "「確かにその通りである」と客観的事実を全面的に肯定・承認する語気を含みます。",
          en: "固然 emphasizes rhetorical admission of an undisputed truth before pivoting."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "A 固然...，但 B...: Đành rằng A là đúng, nhưng B mới là trọng tâm.",
        ja: "「確かに〜ではあるが、しかし〜」という外交的・論理的譲歩。",
        en: "Admittedly A is true, but B is the decisive consideration."
      },
      remember: [
        { vi: "Vế sau luôn đi với 但 / 可是 / 然而 / 也.", ja: "後節は但・然而と呼応する。", en: "Clause 2 pairs with 但, 然而, or 也." }
      ]
    },
    needs_review: false,
    review_note: ""
  }
];
