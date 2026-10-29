/**
 * tools/missing-grammar-part2.js
 * Items 8-14 of 14 missing advanced HSK grammar detail items.
 */

module.exports = [
  // 8. hsk6_four_character_idiom_syntax
  {
    id: "hsk6_four_character_idiom_syntax",
    level: "HSK6",
    level_num: 6,
    category: "written_style",
    difficulty: 5,
    frequency: 5,
    register: "formal",
    keywords: ["四字格", "成语结构", "不攻自破", "无忧无虑", "忽冷忽热", "tứ tự cách", "idiom syntax"],
    formula: "不 + V1 + 自 + V2  hoặc  无 + A + 无 + B  hoặc  忽 + A + 忽 + B",
    formula_plain: {
      vi: "Cấu trúc tứ tự cách cố định: 不...自... (không đánh mà tự tan), 无...无... (không... không...), 忽...忽... (thoắt... thoắt...)",
      ja: "四字句の文法フォーマット「不V自V」「无A无B」「忽A忽B」",
      en: "Four-character semi-fixed idiom structures: 不V自V, 无A无B, 忽A忽B"
    },
    structure_blocks: [
      { label: { vi: "Tiền tố khuôn mẫu", ja: "固定接頭部", en: "Prefix Frame" }, role: "adverb", color: "#8B5CF6" },
      { label: { vi: "Thành phần biến đổi A", ja: "可変要素A", en: "Variable A" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trung tố khuôn mẫu", ja: "固定中間部", en: "Infix Frame" }, role: "particle", color: "#EC4899" },
      { label: { vi: "Thành phần biến đổi B", ja: "可変要素B", en: "Variable B" }, role: "verb", color: "#3B82F6" }
    ],
    related_ids: ["hsk6_classical_zhi_qi_yi_wei", "hsk5_suo_verb_de_nominalization"],
    confusable_with: [
      {
        id: "hsk6_classical_zhi_qi_yi_wei",
        diff: {
          vi: "Tứ tự cách là các khuôn mẫu 4 chữ có tính đối xứng cao, tiết tấu nhịp nhàng (2-2), giúp biểu đạt súc tích và có sức gợi cảm lớn hơn câu nói dài.",
          ja: "成語や四字熟語は2-2のリズムを持ち、長い修飾句を四文字に凝縮して劇的な描写力を発揮します。",
          en: "Four-character frames compress complex descriptions into rhythmic 2-2 structures."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc tứ tự cách cố định (不...自..., 无...无..., 忽...忽...)",
        quick_rule_3s: "Nắm vững 3 khuôn mẫu 4 chữ phổ biến: 不...自... (không làm mà tự thành: 不攻自破, 不打自招); 无...无... (hoàn toàn không có: 无忧无虑, 无法无天); 忽...忽... (biến đổi liên tục: 忽冷忽热).",
        contrastive_note: "Tiếng Việt cũng chuộng thành ngữ 4 chữ: 'không đánh tự tan', 'vô lo vô nghĩ', 'thoắt ẩn thoắt hiện'.",
        analogy: "Chiếc khuôn đúc 4 chữ: chỉ cần thay 2 từ thích hợp vào khuôn là tạo ra một viên gạch văn chương sắc sảo.",
        mnemonic: "Bất V tự V (không đánh tự tan), Vô A vô B (vô âu vô lo).",
        how_to_use: [
          { step: 1, text: "Chọn khuôn phù hợp với ý muốn diễn đạt (phủ định tự nhiên, tuyệt đối không, hay thay đổi thất thường)." },
          { step: 2, text: "Điền 2 động từ hoặc tính từ tương ứng vào vị trí trống." },
          { step: 3, text: "Sử dụng cụm 4 chữ làm vị ngữ, định ngữ hoặc trạng ngữ trong câu." }
        ],
        self_check: ["Cụm từ có đúng 4 chữ và có tính đối xứng không?"],
        tips: ["Các cụm 4 chữ rất được chuộng trong bài thi viết HSK6 để lấy điểm phong cách cao."],
        when_to_use: ["Bài viết nghị luận, bình luận thời sự, thuyết trình."],
        when_not_to_use: ["Giao tiếp thô sơ hàng ngày."],
        fatal_mistake: {
          wrong: "他不攻自己的破。(Không chia tách cụm cố định 4 chữ).",
          correct: "谣言不攻自破。",
          explanation: "Cụm 4 chữ là một khối ngữ cố định, không được chèn từ bên ngoài vào giữa."
        }
      },
      ja: {
        title: "四字句・固定フォーマット（不…自…、无…无…、忽…忽…）",
        quick_rule_3s: "「不攻自破（攻めずして自壊する）」「无忧无虑（何の憂いもない）」「忽冷忽热（冷たくなったり熱くなったり）」などの定型枠。",
        contrastive_note: "日本語の四字熟語と同様に、2-2のリズムで格調高い文章を形成します。",
        analogy: "熟練の職人が使う四文字の金型成形パーツです。",
        mnemonic: "不〜自〜、无〜无〜、忽〜忽〜。",
        how_to_use: [
          { step: 1, text: "表現意図（自滅、全否定、急変）に合わせた型を選ぶ。" },
          { step: 2, text: "対照・類義の漢字を埋め込む。" }
        ],
        self_check: ["4文字のリズムが崩れていませんか？"],
        tips: ["HSK6記述試験の加点要素。"],
        when_to_use: ["論説文、時事論評、スピーチ。"],
        when_not_to_use: ["くだけた口語。"],
        fatal_mistake: {
          wrong: "谣言不自攻破。",
          correct: "谣言不攻自破。",
          explanation: "固定スロットの語順を厳密に守る必要があります。"
        }
      },
      en: {
        title: "Four-character semi-fixed idioms and formal frames",
        quick_rule_3s: "Master three frames: 不...自... (collapses without external force: 不攻自破); 无...无... (completely without: 无忧无虑); 忽...忽... (fluctuates rapidly: 忽高忽低).",
        contrastive_note: "Four-character idioms provide rhythmic 2-2 balance, highly prized in high-scoring HSK6 essays.",
        analogy: "Modular verbal templates that condense whole narrative scenes into 4 keystrokes.",
        mnemonic: "不...自... (does without doing), 无...无... (totally without).",
        how_to_use: [
          { step: 1, text: "Choose the grammatical frame fitting the semantic mood." },
          { step: 2, text: "Slot in appropriate parallel verbs or adjectives." }
        ],
        self_check: ["Does it retain strict 4-character symmetry?"],
        tips: ["Invaluable for HSK6 writing summary points."],
        when_to_use: ["Essays, editorial commentary, executive speeches."],
        when_not_to_use: ["Informal slang chats."],
        fatal_mistake: {
          wrong: "Rumors 不攻自己破。",
          correct: "谣言不攻自破。",
          explanation: "Never inject internal modifiers into fixed 4-character frames."
        }
      }
    },
    collocations: [
      { zh: "谣言不攻自破", pinyin: "yáoyán bù gōng zì pò", tr: { vi: "tin đồn không đánh mà tự tan", ja: "流言は攻めずして自滅する", en: "rumors collapse on their own" } },
      { zh: "无拘无束", pinyin: "wú jū wú shù", tr: { vi: "tự do tự tại, không ràng buộc", ja: "何の束縛もない・自由自在", en: "unconstrained and completely free" } }
    ],
    examples: [
      {
        zh: "只要事实真相公布于众，那些别有用心的虚假造谣必将不攻自破。",
        pinyin: "Zhǐyào shìshí zhēnxiàng gōngbù yú zhòng, nàxiē biéyǒuyòngxīn de xūjiǎ zàoyáo bì jiāng bù gōng zì pò.",
        tokens: [
          { hanzi: "事实真相", pinyin: "shìshí zhēnxiàng", role: "subject", hanviet: "sự thực chân tướng" },
          { hanzi: "公布于众", pinyin: "gōngbù yú zhòng", role: "verb", hanviet: "công bố vu chúng" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "虚假造谣", pinyin: "xūjiǎ zàoyáo", role: "subject", hanviet: "hư giả tạo dao" },
          { hanzi: "必将", pinyin: "bì jiāng", role: "adverb", hanviet: "tất tương" },
          { hanzi: "不攻自破", pinyin: "bù gōng zì pò", role: "verb", hanviet: "bất công tự phá" }
        ],
        translations: {
          vi: "Chỉ cần chân tướng sự thật được công bố rộng rãi trước công chúng, những lời thêu dệt bịa đặt có dụng ý xấu nhất định sẽ tự khắc sụp đổ.",
          ja: "真相が公表されさえすれば、悪意ある虚偽のデマなど自ずと瓦解するに違いない。",
          en: "As long as the factual truth is made public, malicious false rumors will collapse on their own."
        },
        scenario: "Phát biểu đính chính thông tin báo chí",
        tone_tip: "Đọc 不攻自破 (bù gōng zì pò) dứt khoát, nhịp 2-2 rõ ràng."
      }
    ],
    dialogue: {
      goal: { vi: "Bình luận trước khủng hoảng truyền thông", ja: "PR危機管理ミーティング", en: "PR crisis management" },
      lines: [
        { speaker: "公关总监", zh: "网络上出现了针对我们新产品的负面诋毁，需要立即起诉吗？", pinyin: "Wǎnglù shàng chūxiàn le zhēnduì wǒmen xīn chǎnpǐn de fùmiàn dǐhuǐ, xūyào lìjí qǐsù ma?", tr: { vi: "Trên mạng xuất hiện bài viết bôi nhọ sản phẩm mới của ta, có cần khởi kiện ngay không?", ja: "ネット上に新製品への中傷が出回っていますが、即座に提訴すべきでしょうか？", en: "Negative slanders targeting our new product appeared online; should we sue immediately?" } },
        { speaker: "法务总监", zh: "我们只需亮出权威质检报告，一切恶意谣言自然不攻自破。", pinyin: "Wǒmen zhǐ xū liàng chū quánwēi zhìjiǎn bàogào, yíqiè è'yì yáoyán zìrán bù gōng zì pò.", tr: { vi: "Chúng ta chỉ cần đưa ra báo cáo kiểm định chất lượng có thẩm quyền, mọi tin đồn ác ý sẽ tự khắc sụp đổ.", ja: "公的機関の品質検査書を公開すれば、悪質なデマなど攻めずして自壊しますよ。", en: "We only need to release the official quality inspection report, and all malicious rumors will collapse on their own." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["在铁的证据面前", "一切谎言", "都必将", "不攻自破"],
        correct_order: ["在铁的证据面前", "一切谎言", "都必将", "不攻自破"]
      }
    ],
    fill_blank: [
      {
        sentence: "经过多年的艰苦奋斗，那家濒临破产的工厂终于在市场竞争中____。",
        options: ["绝处逢生", "不攻自破", "无由无故", "忽冷忽热"],
        answer_index: 0,
        explanation: {
          vi: "Thành ngữ 4 chữ: 绝处逢生 (trong bước đường cùng lại tìm thấy đường sống).",
          ja: "起死回生を意味する「绝处逢生」が文脈に適合します。",
          en: "绝处逢生 means 'finding a way out of an impasse / back from the brink'."
        }
      }
    ],
    error_correction: [
      {
        wrong: "他对这件事情一点也不攻自破。",
        correct: "在这个铁证面前，谎言不攻自破。",
        hint: {
          vi: "不攻自破 chỉ dùng cho luận điểm sai lầm, lời đồn đại hoặc lời nói dối (tự sụp đổ), không dùng cho người.",
          ja: "不攻自破は嘘やデマ、誤った論理が自壊することに対して用います。",
          en: "不攻自破 applies to false claims or rumors, not people."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Khuôn mẫu nào sau đây biểu đạt ý 'không có bất kỳ sự ràng buộc nào, hoàn toàn tự do'?",
          ja: "「束縛が全くなく、完全に自由である」を表す四字格はどれですか？",
          en: "Which 4-character frame expresses 'completely unconstrained and free'?"
        },
        options: ["无拘无束", "不亢不卑", "无法无天", "无缘无故"],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "无拘无束: không gò bó, không trói buộc (hoàn toàn tự do).",
          ja: "「无拘无束」は自由気ままで束縛がない様を表します。",
          en: "无拘无束 means unconstrained and free."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "Cấu trúc tứ tự cách (不V自V, 无A无B, 忽A忽B): 4 chữ đăng đối nhịp nhàng.",
        ja: "2-2のリズムを持つ四字成語の構造的活用法。",
        en: "Semi-fixed 4-character frames providing syntactic elegance."
      },
      remember: [
        { vi: "Giữ nguyên trật tự 4 chữ cố định, không chèn từ ngoài vào giữa.", ja: "語順固定で間に語を挿入しない。", en: "Keep the 4 characters unified." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 9. hsk6_yi_zhi_yu_consequence
  {
    id: "hsk6_yi_zhi_yu_consequence",
    level: "HSK6",
    level_num: 6,
    category: "conjunction",
    difficulty: 5,
    frequency: 4,
    register: "formal",
    keywords: ["以致", "以至于", "yǐzhì", "yǐzhìyú", "dẫn đến", "đến mức", "その結果", "so that", "consequence"],
    formula: "Nguyên nhân / Tình huống，以致 + Hậu quả xấu   hoặc   以至于 + Mức độ cực đoan",
    formula_plain: {
      vi: "以致: dẫn đến kết quả xấu / 以至于: đến mức mà... (mức độ nghiêm trọng)",
      ja: "「以致（その結果〜という悪い事態を招いた）」「以至于（〜するほどにまで達した）」",
      en: "以致 (leads to negative result) / 以至于 (to such an extent that)"
    },
    structure_blocks: [
      { label: { vi: "Nguyên nhân / Sai lầm", ja: "原因・過誤", en: "Cause / Action" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Liên từ hệ quả (以致/以至于)", ja: "結果接続詞 (以致/以至于)", en: "Consequence Marker" }, role: "conjunction", color: "#EF4444" },
      { label: { vi: "Hậu quả / Mức độ", ja: "結果・極端な程度", en: "Outcome / Degree" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk2_yinwei_suoyi", "hsk4_yin'er_consequence"],
    confusable_with: [
      {
        id: "hsk4_yin'er_consequence",
        diff: {
          vi: "因而 là liên từ nhân quả trung tính (tốt hay xấu đều được). 以致 100% dẫn đến kết quả xấu, thiệt hại, nuối tiếc. 以至于 dùng để nhấn mạnh mức độ cao đến khó tin.",
          ja: "「因而」は中立的な因果関係ですが、「以致」は必ず悪い結果・損失を導きます。「以至于」は極端な到達度合いを強調します。",
          en: "因而 is neutral, whereas 以致 exclusively introduces undesirable or harmful consequences; 以至于 highlights an extreme degree."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phân biệt liên từ hệ quả 以致 (kết quả xấu) và 以至于 (đến mức mà)",
        quick_rule_3s: "Nắm chắc: 以致 = dẫn đến hậu quả tiêu cực, sai lầm, hỏng việc; 以至于 = đến mức mà... (nói về mức độ sâu rộng, nghiêm trọng).",
        contrastive_note: "Tiếng Việt hay dùng chung từ 'dẫn đến' cho cả tốt lẫn xấu. Nhưng trong tiếng Trung, nếu kết quả tốt thì dùng 从而, kết quả xấu mới dùng 以致.",
        analogy: "以致 như biển báo 'vực sâu phía trước': báo hiệu việc làm ở vế trước đã gây ra một tai họa hoặc thất thoát lớn.",
        mnemonic: "Dĩ trí (以致) mang lại điều xui xẻo; Dĩ chí vu (以至于) kéo dài đến tận cùng.",
        how_to_use: [
          { step: 1, text: "Vế 1 nêu nguyên nhân bất cẩn, sơ suất hoặc một tình huống nghiêm trọng." },
          { step: 2, text: "Nếu muốn nêu hậu quả xấu: dùng 以致." },
          { step: 3, text: "Nếu muốn phóng đại mức độ cực đoan: dùng 以至于." }
        ],
        self_check: ["Kết quả đi sau 以致 có phải là điều không mong muốn không?", "Nếu kết quả tích cực, hãy đổi sang 从而."],
        tips: ["Mẹo thi HSK6: Thấy vế sau là 'thiệt hại lớn / thất bại / bị thương / lỡ hẹn' -> chọn ngay 以致."],
        when_to_use: ["Báo cáo sự cố, phân tích nguyên nhân thất bại, phê bình cảnh cáo."],
        when_not_to_use: ["Khi kết quả là thành công, khen thưởng, đạt giải."],
        fatal_mistake: {
          wrong: "他学习很努力，以致考上了哈佛大学。(Sai nghiêm trọng: đỗ Harvard là tin vui!).",
          correct: "他学习很努力，因而 / 从而考上了哈佛大学。",
          explanation: "以致 chỉ dùng cho hậu quả xấu. Thành tựu tích cực phải dùng 从而 hoặc 因而."
        }
      },
      ja: {
        title: "結果接続詞「以致」（悪い結果）と「以至于」（〜するほどに）",
        quick_rule_3s: "以致は不本意な悪結果・損失・失敗のみに接続。以至于は極端な度合いを表します。",
        contrastive_note: "日本語の「その結果〜という悪影響をもたらした」に一致。良い結果に「以致」を使うと大減点になります。",
        analogy: "ブレーキを踏み損ねて「事故」という悪い終着駅に着くイメージ。",
        mnemonic: "以致＝悪結果、以至于＝〜するほどまでに。",
        how_to_use: [
          { step: 1, text: "前節で過失・不備・極端な状況を記述。" },
          { step: 2, text: "悪い結果には「以致」、程度の深さには「以至于」を配置。" }
        ],
        self_check: ["以致の後ろに好ましい出来事が来ていませんか？"],
        tips: ["良い結果には「从而」「因而」を使います。"],
        when_to_use: ["事故調査報告、反省文、損失分析。"],
        when_not_to_use: ["表彰、成功事例、昇進報告。"],
        fatal_mistake: {
          wrong: "全团队齐心协力，以致顺利完成任务。",
          correct: "全团队齐心协力，从而顺利完成任务。",
          explanation: "任務完遂は肯定的な結果であるため「从而」を使用します。"
        }
      },
      en: {
        title: "Consequence conjunctions 以致 (yǐzhì) and 以至于 (yǐzhìyú)",
        quick_rule_3s: "以致 exclusively triggers undesirable consequences (failures, losses). 以至于 emphasizes extreme degree ('to the extent that').",
        contrastive_note: "Unlike English 'so that / as a result' which are neutral, 以致 must never introduce a positive outcome.",
        analogy: "以致 is a caution tape: whatever follows it is damage, error, or regret.",
        mnemonic: "以致 leads to disaster; 从而 leads to success.",
        how_to_use: [
          { step: 1, text: "Describe a lapse, flaw, or extreme situation in clause 1." },
          { step: 2, text: "Follow with 以致 + the negative repercussion." }
        ],
        self_check: ["Is the resulting outcome negative? If positive, switch to 从而."],
        tips: ["Favorite HSK6 error correction trap: using 以致 for positive triumphs."],
        when_to_use: ["Accident post-mortems, failure post-mortems, liability audits."],
        when_not_to_use: ["Victories, promotions, good news."],
        fatal_mistake: {
          wrong: "He trained hard, 以致 he won the gold medal.",
          correct: "He trained hard, 从而 he won the gold medal.",
          explanation: "Winning a medal is positive; use 从而 instead of 以致."
        }
      }
    },
    collocations: [
      { zh: "以致造成严重后果", pinyin: "yǐzhì zàochéng yánzhòng hòuguǒ", tr: { vi: "dẫn đến tạo thành hậu quả nghiêm trọng", ja: "その結果深刻な事態を招いた", en: "resulting in severe consequences" } },
      { zh: "沉迷其中以至于荒废学业", pinyin: "chénmí qízhōng yǐzhìyú huāngfèi xuéyè", tr: { vi: "mải mê đến mức bỏ bê việc học", ja: "夢中になりすぎて学業を放棄するほどに至った", en: "so engrossed as to neglect studies" } }
    ],
    examples: [
      {
        zh: "由于前期市场调研不充分，以致公司对产品的定价出现了重大偏差。",
        pinyin: "Yóuyú qiánqī shìchǎng diàoyán bù chōngfèn, yǐzhì gōngsī duì chǎnpǐn de dìngjià chūxiàn le zhòngdà piānchā.",
        tokens: [
          { hanzi: "由于调研不充分", pinyin: "yóuyú diàoyán bù chōngfèn", role: "subject", hanviet: "do vu điệu nghiên bất sung phân" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "以致", pinyin: "yǐzhì", role: "conjunction", hanviet: "dĩ trí" },
          { hanzi: "定价出现偏差", pinyin: "dìngjià chūxiàn piānchā", role: "verb", hanviet: "định giá xuất hiện thiên sai" }
        ],
        translations: {
          vi: "Do khảo sát thị trường giai đoạn đầu không kỹ lưỡng, dẫn đến việc định giá sản phẩm của công ty xuất hiện sai lệch nghiêm trọng.",
          ja: "事前の市場調査が不十分であったため、その結果として製品の価格設定に重大な狂いが生じる事態となった。",
          en: "Because preliminary market research was insufficient, it led to major discrepancies in product pricing."
        },
        scenario: "Phân tích nguyên nhân sai lầm tiếp thị",
        tone_tip: "Đọc 以致 (yǐzhì) với giọng trầm, biểu thị sự việc không mong muốn."
      }
    ],
    dialogue: {
      goal: { vi: "Điều tra sự cố thất lạc container xuất khẩu", ja: "コンテナ遅延トラブルの調査", en: "Container misplacement review" },
      lines: [
        { speaker: "总经理", zh: "这批急件为什么没能在预定船期装船？", pinyin: "Zhè pī jíjiàn wèishénme méi néng zài yùdìng chuánqī zhuāngchuán?", tr: { vi: "Tại sao lô hàng khẩn này không kịp bốc lên tàu theo lịch trình định sẵn?", ja: "なぜこの緊急貨物は予定船便に積み込めなかったのですか？", en: "Why wasn't this urgent shipment loaded onto the scheduled vessel?" } },
        { speaker: "物流主管", zh: "单证员填错了海关代码，以致报关单被退回重审，延误了截关时间。", pinyin: "Dānzhèngyuán tián cuò le hǎiguān dàimǎ, yǐzhì bàoguāndān bèi tuìhuí chóngshěn, yánwù le jiéguān shíjiān.", tr: { vi: "Nhân viên chứng từ điền sai mã hải quan, dẫn đến tờ khai bị trả về xét lại, trễ mất giờ đóng sổ hải quan.", ja: "書類担当が税関コードを誤記したため、その結果申告書が差し戻されて通関期限に間に合いませんでした。", en: "The clerk entered the wrong customs code, which caused the declaration to be returned, missing cutoff time." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["因为粗心大意", "以致造成了", "无法挽回的", "巨大经济损失"],
        correct_order: ["因为粗心大意", "以致造成了", "无法挽回的", "巨大经济损失"]
      }
    ],
    fill_blank: [
      {
        sentence: "司机疲劳驾驶，注意力严重不集中，____酿成了一场惨烈的连环车祸。",
        options: ["以致", "从而", "以便", "甚至"],
        answer_index: 0,
        explanation: {
          vi: "Dẫn đến hậu quả tai nạn thảm khốc -> bắt buộc dùng liên từ tiêu cực '以致'.",
          ja: "悲惨な事故という悪結果を招いたため「以致」が唯一の正解です。",
          en: "Leading to a catastrophic accident demands the negative marker 以致."
        }
      }
    ],
    error_correction: [
      {
        wrong: "他刻苦练习了三年，以致获得了奥运冠军。",
        correct: "他刻苦练习了三年，从而获得了奥运冠军。",
        hint: {
          vi: "Đoạt quán quân Olympic là tin mừng, không được dùng liên từ tiêu cực 以致, hãy đổi sang 从而.",
          ja: "オリンピック優勝は慶事であるため、以致ではなく从而を用います。",
          en: "Winning an Olympic title is positive; replace 以致 with 从而."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Câu nào sau đây sử dụng chữ '以致' đúng ngữ nghĩa ngữ pháp?",
          ja: "「以致」の用法として文法的に正しいものはどれですか？",
          en: "Which sentence uses 以致 correctly?"
        },
        options: [
          "他贪图小便宜，盲目轻信网络投资，以致上当受骗损失了全部积蓄。",
          "经过专家全力抢救，以致患者完全脱离了生命危险。",
          "新技术提高了工效，以致工厂提前超额完成了生产指标。",
          "他每天坚持锻炼，以致身体越来越强壮。"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja", "en"],
        explanation: {
          vi: "Chỉ có câu 0 là hậu quả xấu (bị lừa mất hết tiền tiết kiệm). Các câu 1, 2, 3 đều là kết quả tốt lành nên không thể đi với 以致.",
          ja: "全財産を騙し取られたという被害（悪結果）を導いている文0のみが正解です。",
          en: "Only option 0 introduces a genuinely harmful consequence (losing savings to fraud)."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "以致: Dẫn đến hậu quả xấu, sai lầm, mất mát.",
        ja: "「以致」は悪い結果・損失のみを導く結果接続詞。",
        en: "以致 strictly introduces undesirable negative outcomes."
      },
      remember: [
        { vi: "Hậu quả xấu -> dùng 以致.", ja: "悪い結果＝以致。", en: "Bad outcome -> 以致." },
        { vi: "Kết quả tốt -> dùng 从而.", ja: "良い結果＝从而。", en: "Good outcome -> 从而." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 10. hsk789_yi_bian_vs_yi_mian_purpose
  {
    id: "hsk789_yi_bian_vs_yi_mian_purpose",
    level: "HSK7-9",
    level_num: 7,
    category: "written_style",
    difficulty: 5,
    frequency: 4,
    register: "formal",
    keywords: ["以便", "藉以", "以免", "免得", "谨防", "yǐbiàn", "yǐmiǎn", "để tiện", "nhằm", "để tránh", "〜のために", "so as to", "lest"],
    formula: "Clause 1 (Hành động chuẩn bị)，以便 / 藉以 + Mục đích tích cực   hoặc   以免 / 谨防 + Hậu quả phòng ngừa",
    formula_plain: {
      vi: "以便: để tiện cho việc... / 以免: để tránh khỏi việc... (phòng ngừa)",
      ja: "「以便（〜しやすいように、〜の目的で）」「以免（〜しないように、〜を避けるために）」",
      en: "以便 (in order to facilitate / so that) vs 以免 (so as to avoid / lest)"
    },
    structure_blocks: [
      { label: { vi: "Hành động chuẩn bị", ja: "準備的行動", en: "Preparatory Action" }, role: "verb", color: "#3B82F6" },
      { label: { vi: "Liên từ mục đích (以便/以免)", ja: "目的接続詞 (以便/以免)", en: "Purpose Connective" }, role: "conjunction", color: "#EC4899" },
      { label: { vi: "Mục đích hoặc Rủi ro cần phòng", ja: "目的または予防事態", en: "Facilitated Goal / Risk" }, role: "object", color: "#10B981" }
    ],
    related_ids: ["hsk5_suo_verb_de_nominalization", "hsk6_yi_zhi_yu_consequence"],
    confusable_with: [
      {
        id: "hsk6_yi_zhi_yu_consequence",
        diff: {
          vi: "以致 là sự việc tiêu cực đã xảy ra rồi. Còn 以免 là phòng ngừa trước (để khỏi / để tránh việc đó xảy ra). 以便 là tạo điều kiện thuận lợi cho bước tiếp theo.",
          ja: "「以致」がすでに生じてしまった悪結果であるのに対し、「以免」は未然に防ぐ予防措置です。「以便」は目的達成の便宜を図ります。",
          en: "以致 reports an already realized misfortune, while 以免 prevents it beforehand; 以便 facilitates future convenience."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Liên từ mục đích và phòng ngừa trong văn bản học thuật/hành chính (以便, 藉以, 以免, 谨防)",
        quick_rule_3s: "以便 = 'để tiện việc...'; 以免 = 'để tránh, phòng ngừa'. Xuất hiện 90% trong thông báo công vụ, hợp đồng và cẩm nang quy trình.",
        contrastive_note: "Tiếng Việt nói 'nhằm tạo điều kiện để...' (以便) và 'nhằm tránh xảy ra...' (以免).",
        analogy: "以便 là chiếc chìa khóa mở sẵn cánh cửa phía trước; 以免 là chiếc khiên giơ lên chặn đứng mũi tên nguy hiểm.",
        mnemonic: "Dĩ tiện (以便) mở đường thuận lợi; Dĩ miễn (以免) chặn trước rủi ro.",
        how_to_use: [
          { step: 1, text: "Vế 1 nêu một biện pháp, yêu cầu hành chính hoặc quy chuẩn kỹ thuật." },
          { step: 2, text: "Nếu mục tiêu là giúp việc sau dễ dàng: dùng 以便." },
          { step: 3, text: "Nếu mục tiêu là ngăn ngừa sai sót tai nạn: dùng 以免 hoặc 谨防." }
        ],
        self_check: ["以便 có mở ra sự tiện lợi không?", "以免 có nhắm vào một rủi ro tiêu cực cần loại bỏ không?"],
        tips: ["Thông báo sân bay/hải quan: 请提前准备好护照，以便安检 (Xin chuẩn bị sẵn hộ chiếu để tiện kiểm tra an ninh)."],
        when_to_use: ["Quy chế công ty, hợp đồng ngoại thương, cẩm nang người dùng, văn bản luật."],
        when_not_to_use: ["Tán gẫu chợ búa."],
        fatal_mistake: {
          wrong: "请关好门窗，以便小偷进来。(Sai lầm tai hại: để tiện cho trộm vào!).",
          correct: "请关好门窗，以免小偷进入 / 谨防盗窃。",
          explanation: "Ngăn chặn trộm cắp là việc phòng ngừa, bắt buộc dùng 以免, không dùng 以便."
        }
      },
      ja: {
        title: "目的・予防を表す硬い表現（以便・藉以・以免・谨防）",
        quick_rule_3s: "以便（〜の便宜を図るため）、以免（〜を未然に避けるため）の二大公用文接続詞。",
        contrastive_note: "日本語の「〜の利便を図るべく（以便）」「〜の無きよう（以免）」に対応します。",
        analogy: "以便は前進のための潤滑油、以免は事故防止の安全ベルトです。",
        mnemonic: "便は便宜、免は免れる・防ぐ。",
        how_to_use: [
          { step: 1, text: "第1節で要請・指示・ルールを述べる。" },
          { step: 2, text: "推進目的に「以便」、事故防止に「以免」を接続。" }
        ],
        self_check: ["危険防止に以便を使っていませんか？"],
        tips: ["空港や駅の案内アナウンスで定番。"],
        when_to_use: ["公的ガイドライン、契約条項、システム運用手順書。"],
        when_not_to_use: ["極めて親しい会話。"],
        fatal_mistake: {
          wrong: "锁好门窗，以便被盗。",
          correct: "锁好门窗，以免被盗。",
          explanation: "盗難防止には以免を用います。"
        }
      },
      en: {
        title: "Academic and legal purpose/prevention connectives (以便, 藉以, 以免, 谨防)",
        quick_rule_3s: "以便 = 'so that / in order to facilitate'. 以免 = 'so as to avoid / lest'. Standard in legal directives.",
        contrastive_note: "Directly equivalent to formal 'in order that' (以便) vs 'lest / to avoid' (以免).",
        analogy: "以便 opens a door for progress; 以免 raises a firewall against risk.",
        mnemonic: "以便 paves the way; 以免 wards off the risk.",
        how_to_use: [
          { step: 1, text: "State the precautionary mandate in clause 1." },
          { step: 2, text: "Link with 以便 for positive facilitations, or 以免 for risk aversion." }
        ],
        self_check: ["Is a positive facilitation paired with 以便 and a hazard with 以免?"],
        tips: ["Common transit notice: 请出示证件，以便查验 (Please present ID to facilitate inspection)."],
        when_to_use: ["Standard operating procedures, international contracts, terms of service."],
        when_not_to_use: ["Casual colloquial speech."],
        fatal_mistake: {
          wrong: "Back up your files 以便 data gets lost.",
          correct: "Back up your files 以免 data gets lost.",
          explanation: "Preventing data loss requires 以免 (lest / to avoid)."
        }
      }
    },
    collocations: [
      { zh: "请提前准备以便核对", pinyin: "qǐng tíqián zhǔnbèi yǐbiàn héduì", tr: { vi: "xin chuẩn bị trước để tiện đối chiếu", ja: "照合の便を図るため事前準備をお願いします", en: "please prepare in advance to facilitate verification" } },
      { zh: "严格把关以免发生纰漏", pinyin: "yángé bǎguān yǐmiǎn fāshēng pīlòu", tr: { vi: "kiểm soát nghiêm ngặt để tránh xảy ra sơ sót", ja: "不手際を避けるため厳格にチェックする", en: "strictly oversee to avoid oversights" } }
    ],
    examples: [
      {
        zh: "各部门务必于周五前提交终版决算报表，以便财务中心按时汇总申报，以免延误税务审计。",
        pinyin: "Gè bùmén wùbì yú zhōuwǔ qián tíjiāo zhōngbǎn juésuàn bàobiǎo, yǐbiàn cáiwù zhōngxīn ànshí huìzǒng shēnbào, yǐmiǎn yánwù shuìwù shěnjì.",
        tokens: [
          { hanzi: "各部门", pinyin: "gè bùmén", role: "subject", hanviet: "các bộ môn" },
          { hanzi: "提交报表", pinyin: "tíjiāo bàobiǎo", role: "verb", hanviet: "đề giao báo biểu" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "以便", pinyin: "yǐbiàn", role: "conjunction", hanviet: "dĩ tiện" },
          { hanzi: "汇总申报", pinyin: "huìzǒng shēnbào", role: "verb", hanviet: "hội tổng thân báo" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "以免", pinyin: "yǐmiǎn", role: "conjunction", hanviet: "dĩ miễn" },
          { hanzi: "延误审计", pinyin: "yánwù shěnjì", role: "verb", hanviet: "diên ngộ thẩm kế" }
        ],
        translations: {
          vi: "Các bộ phận nhất thiết phải nộp báo cáo quyết toán bản cuối trước thứ Sáu, để tiện cho trung tâm tài chính tổng hợp kê khai đúng hạn, nhằm tránh làm chậm trễ kỳ kiểm toán thuế.",
          ja: "各部署は財務センターが期限内に集計申告する便宜を図り、税務監査の遅延を避けるため、金曜日までに最終決算書を提出すること。",
          en: "All departments must submit final settlement statements by Friday to facilitate timely consolidation by finance and avoid delaying tax audits."
        },
        scenario: "Công văn tài chính tập đoàn",
        tone_tip: "Một câu phối hợp hoàn hảo cả 以便 (tạo thuận lợi) lẫn 以免 (ngăn ngừa rủi ro)."
      }
    ],
    dialogue: {
      goal: { vi: "Hướng dẫn đối tác hoàn tất thủ tục mở L/C", ja: "L/C開設書類の提出案内", en: "L/C opening procedure guidance" },
      lines: [
        { speaker: "单证主管", zh: "请贵方在装运前一周将提单草本传真给我们，以便我司审核。", pinyin: "Qǐng guìfāng zài zhuāngyùn qián yì zhōu jiāng tídān cǎoběn chuánzhēn gěi wǒmen, yǐbiàn wǒ sī shěnhé.", tr: { vi: "Xin quý công ty gửi bản nháp vận đơn cho chúng tôi 1 tuần trước khi bốc hàng, để tiện cho bên tôi đối chiếu thẩm định.", ja: "私どもの審査の便宜のため、船積み1週間前にB/Lドラフトをお送りください。", en: "Please fax the draft B/L one week before shipment to facilitate our audit." } },
        { speaker: "进口商", zh: "好的，我们会抓紧核对，以免出现品名不符导致海关扣留。", pinyin: "Hǎo de, wǒmen huì zhuājǐn héduì, yǐmiǎn chūxiàn pǐnmíng bùfú dǎozhì hǎiguān kòuliú.", tr: { vi: "Được, chúng tôi sẽ khẩn trương rà soát nhằm tránh sai lệch tên hàng dẫn đến hải quan tạm giữ.", ja: "承知しました、税関留置の原因となる品名不一致を避けるため至急照合します。", en: "Understood, we will verify expeditiously to avoid customs holds due to description discrepancies." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["请保留购物凭证", "以便日后", "出现质量问题时", "申请售后保修"],
        correct_order: ["请保留购物凭证", "以便日后", "出现质量问题时", "申请售后保修"]
      }
    ],
    fill_blank: [
      {
        sentence: "出门前务必仔细检查燃气阀门是否关闭，____发生意外事故。",
        options: ["以免", "以便", "从而", "固然"],
        answer_index: 0,
        explanation: {
          vi: "Đề phòng tai nạn xảy ra -> dùng liên từ phòng ngừa '以免'.",
          ja: "不慮の事故を防ぐ予防であるため「以免」が正解です。",
          en: "Preventing accidental fires requires the preventative conjunction 以免."
        }
      }
    ],
    error_correction: [
      {
        wrong: "请把贵重物品随身携带，以便遗失。",
        correct: "请把贵重物品随身携带，以免遗失。",
        hint: {
          vi: "Làm mất đồ là rủi ro tiêu cực, phải dùng 以免 (để tránh làm mất), không thể dùng 以便 (để tiện cho việc mất).",
          ja: "紛失防止には以便ではなく「以免」を用います。",
          en: "Preventing property loss demands 以免, not 以便."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Cặp liên từ nào sau đây điền vào chỗ trống hợp lý: '请留下您的电话，____联系；同时请核对地址，____发错。'?",
          ja: "「連絡の便宜のため（空欄1）、誤送を防ぐため（空欄2）」に入る正しいペアはどれですか？",
          en: "Which pair correctly fills the blanks for facilitation then prevention?"
        },
        options: ["以便 / 以免", "以免 / 以便", "从而 / 以致", "固然 / 并且"],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "Để tiện liên lạc (以便联系), để tránh gửi nhầm (以免发错).",
          ja: "連絡を容易にする「以便」と、誤配送を防ぐ「以免」の組み合わせです。",
          en: "以便 facilitates contact; 以免 prevents delivery errors."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "以便 (để tiện lợi tiến hành) vs 以免 (để tránh rủi ro phát sinh).",
        ja: "以便（目的便宜）と以免（リスク予防）の対比。",
        en: "以便 facilitates upcoming steps; 以免 averts undesirable hazards."
      },
      remember: [
        { vi: "Mục đích tích cực -> 以便.", ja: "便宜を図る＝以便。", en: "Facilitate -> 以便." },
        { vi: "Ngăn chặn hậu quả xấu -> 以免.", ja: "リスク予防＝以免。", en: "Prevent harm -> 以免." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 11. hsk789_yu_fou_embedded_polar
  {
    id: "hsk789_yu_fou_embedded_polar",
    level: "HSK7-9",
    level_num: 7,
    category: "written_style",
    difficulty: 5,
    frequency: 4,
    register: "formal",
    keywords: ["与否", "yǔfǒu", "成败与否", "是否", "có hay không", "〜か否か", "whether or not", "polar question"],
    formula: "Topic + [ V / Adj + 与否 ] + 主要取决于 / 关系到 + Outcome",
    formula_plain: {
      vi: "Chủ đề + Động từ/Tính từ + 与否 (có... hay không / được hay không) + quyết định đến...",
      ja: "「動詞／形容詞 ＋ 与否」（〜か否か、〜かどうか）の書面語構造",
      en: "Topic + [ Verb / Adjective + 与否 ] + determines / hinges on..."
    },
    structure_blocks: [
      { label: { vi: "Phân câu danh ngữ hóa", ja: "名詞化節", en: "Nominalized Clause" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Trợ từ chính phản (与否)", ja: "正反助詞 (与否)", en: "Polar Marker (与否)" }, role: "particle", color: "#8B5CF6" },
      { label: { vi: "Động từ vị ngữ chi phối", ja: "主動詞 (取决于/关系到)", en: "Governing Verb" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_ma_yes_no_question", "hsk5_suo_verb_de_nominalization"],
    confusable_with: [
      {
        id: "hsk1_ma_yes_no_question",
        diff: {
          vi: "Khẩu ngữ dùng 是否 đứng trước vị ngữ (是否同意, 是否属实). Văn phong học thuật đặt 与否 ở cuối cụm từ (同意与否, 属实与否) để danh từ hóa thành một chủ ngữ trừu tượng.",
          ja: "口語「是否＋動詞」に対し、高級書面語では「動詞＋与否」と後置して論題全体を主語化します。",
          en: "While 是否 precedes verbs, 与否 attaches post-verbally to nominalize a question into an abstract topic ('whether or not')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc Động/Tính từ + 与否 (có... hay không) trong văn phong trang trọng",
        quick_rule_3s: "Ghép 与否 (dữ phủ) ngay sau động từ/tính từ: 成败与否 (thành công hay thất bại), 合格与否 (đạt chuẩn hay không), 真实与否 (có thật hay không).",
        contrastive_note: "Tiếng Việt nói 'việc... có hay không', 'được hay không'. Trong tiếng Trung cao cấp, cụm 'X + 与否' thường làm chủ ngữ cho các vị ngữ: 取决于 (phụ thuộc vào), 关系到 (ảnh hưởng tới).",
        analogy: "Chiếc công tắc hai chiều: gom cả hai khả năng Được và Không thành một khối chủ đề để đem ra mổ xẻ phân tích.",
        mnemonic: "Dữ phủ (与否) đứng sau V/Tính, gom cả 'Có' lẫn 'Không' thành một khối.",
        how_to_use: [
          { step: 1, text: "Lấy một động từ hoặc tính từ 2 âm tiết (như 成功, 合理, 落实)." },
          { step: 2, text: "Gắn 与否 vào phía sau (như 落实与否)." },
          { step: 3, text: "Dùng cụm này làm chủ ngữ cho câu mang tính quyết định: 方案落实与否，关系到项目的成败." }
        ],
        self_check: ["与否 đã đứng ngay sau động từ/tính từ chưa?", "Vế sau có các cụm từ như 取决于 hay 关系到 không?"],
        tips: ["Các cặp kinh điển: 成败与否 (thành bại hay không), 存亡与否 (sống còn hay không)."],
        when_to_use: ["Luận văn học thuật, báo cáo chiến lược cấp cao, xã luận chính trị."],
        when_not_to_use: ["Câu hỏi nghi vấn đối thoại trực tiếp (không nói 你去与否？, hãy nói 你去不去？)."],
        fatal_mistake: {
          wrong: "明天你来与否？(Dùng sai ngữ cảnh đối thoại).",
          correct: "明天你来不来？/ 他明天来与否，主要取决于天气。",
          explanation: "与否 chỉ dùng trong câu trần thuật phân tích tính hai mặt, không dùng làm câu hỏi đối đáp trực tiếp."
        }
      },
      ja: {
        title: "「V／Adj＋与否」（〜か否か、〜かどうか）の書面語構造",
        quick_rule_3s: "動詞・形容詞の後に「与否」を後置し、「〜か否か」という論点を主語として提示します。",
        contrastive_note: "日本語の「可否」「合否」「〜であるか否か」と完全に一致します。",
        analogy: "二者択一のスイッチを一つの名詞ブロックに固めるテクニックです。",
        mnemonic: "V＋与否で主語化、後ろに「取决于」。",
        how_to_use: [
          { step: 1, text: "動詞・形容詞を選択（成功、真实など）。" },
          { step: 2, text: "「与否」を直接後置。" },
          { step: 3, text: "「取决于」「关系到」と連結。" }
        ],
        self_check: ["直接の疑問文で乱用していませんか？"],
        tips: ["成否、存亡、真偽を議論する最上級表現。"],
        when_to_use: ["学術論文、戦略報告書、社説。"],
        when_not_to_use: ["「あなたは行きますか」といった日常の口頭質問。"],
        fatal_mistake: {
          wrong: "你去与否？",
          correct: "你去不去？/ 你去与否并不影响大局。",
          explanation: "与否は平叙文の中で名詞的論点を構成するために使います。"
        }
      },
      en: {
        title: "Formal embedded polar question marker 与否 (yǔfǒu - whether or not)",
        quick_rule_3s: "Attach 与否 after a verb or adjective: 成败与否 (success or failure), 真实与否 (authenticity or falsehood).",
        contrastive_note: "Translates to 'whether or not'. Unlike conversational 是否, 与否 nominalizes the question into a clause subject.",
        analogy: "Encapsulating binary possibilities into a single conceptual topic block.",
        mnemonic: "Attach 与否 to turn any action into a formal 'whether or not' dilemma.",
        how_to_use: [
          { step: 1, text: "Select a verb or adjective (落实, 合格, 真实)." },
          { step: 2, text: "Append 与否." },
          { step: 3, text: "Pair with governing verbs like 取决于 (depends on) or 关系到 (affects)." }
        ],
        self_check: ["Is 与否 embedded inside an analytical statement rather than a direct dialogue question?"],
        tips: ["High-frequency frame: [X 与否]，主要取决于 [Y]."],
        when_to_use: ["Executive summaries, academic abstracts, geopolitical commentary."],
        when_not_to_use: ["Direct spoken interrogatives."],
        fatal_mistake: {
          wrong: "Do you come 与否？",
          correct: "Are you coming or not? / Whether he comes or not (他来与否) does not change our plan.",
          explanation: "与否 functions as an embedded topic marker, not a colloquial question tag."
        }
      }
    },
    collocations: [
      { zh: "方案落实与否，关系到全局", pinyin: "fāng'àn luòshí yǔfǒu, guānxì dào quánjú", tr: { vi: "phương án có được thực thi hay không ảnh hưởng tới toàn cục", ja: "プランが実行されるか否かは大局に関わる", en: "whether the plan is implemented or not affects the whole picture" } }
    ],
    examples: [
      {
        zh: "这项高精尖技术能否实现自主可控，其研发成功与否，直接关系到国家核心产业的安全。",
        pinyin: "Zhè xiàng gāojīngjiān jìshù néng fǒu shíxiàn zìzhǔ kěkòng, qí yánfā chénggōng yǔfǒu, zhíjiē guānxì dào guójiā héxīn chǎnyè de ānquán.",
        tokens: [
          { hanzi: "研发成功与否", pinyin: "yánfā chénggōng yǔfǒu", role: "subject", hanviet: "nghiên phát thành công dữ phủ" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "直接", pinyin: "zhíjiē", role: "adverb", hanviet: "trực tiếp" },
          { hanzi: "关系到", pinyin: "guānxì dào", role: "verb", hanviet: "quan hệ đáo" },
          { hanzi: "产业安全", pinyin: "chǎnyè ānquán", role: "object", hanviet: "sản nghiệp an toàn" }
        ],
        translations: {
          vi: "Việc nghiên cứu phát triển công nghệ tiên tiến này thành công hay không ảnh hưởng trực tiếp đến an ninh ngành công nghiệp cốt lõi của quốc gia.",
          ja: "この最先端技術の研究開発が成功するか否かは、国家中核産業の安全に直結している。",
          en: "Whether the R&D of this cutting-edge technology succeeds or not directly impacts the security of national core industries."
        },
        scenario: "Phân tích an ninh chiến lược công nghệ",
        tone_tip: "Nhấn mạnh vào âm tiết 成功与否 (chénggōng yǔfǒu)."
      }
    ],
    dialogue: {
      goal: { vi: "Đánh giá khả năng nghiệm thu dự án", ja: "プロジェクト検収の事前判定", en: "Project sign-off risk assessment" },
      lines: [
        { speaker: "总工程师", zh: "系统下一阶段能否上线，主要取决于本次压力测试合格与否。", pinyin: "Xìtǒng xià yí jiēduàn néng fǒu shàngxiàn, zhǔyào qǔjué yú běn cì yālì cèshì hégé yǔfǒu.", tr: { vi: "Hệ thống giai đoạn tới có được lên mạng hay không chủ yếu phụ thuộc vào việc đợt kiểm tra chịu tải lần này đạt chuẩn hay không.", ja: "システムが次フェーズで稼働できるかは、今回のストレステストの合否にかかっています。", en: "Whether the system goes live in the next phase depends primarily on whether this stress test passes." } },
        { speaker: "测试主管", zh: "团队正严阵以待，确保万无一失。", pinyin: "Tuánduì zhèng yánzhènyǐdài, quèbǎo wànwúyìshī.", tr: { vi: "Đội ngũ đang túc trực nghiêm ngặt, đảm bảo không có bất kỳ sơ suất nào.", ja: "万全を期すため、チームは厳戒態勢で臨んでおります。", en: "The team is fully prepared to ensure zero error." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["这项政策", "落实与否", "直接关系到", "广大百姓的切身利益"],
        correct_order: ["这项政策", "落实与否", "直接关系到", "广大百姓的切身利益"]
      }
    ],
    fill_blank: [
      {
        sentence: "这批出口货物的检验合格____，将决定是否能够顺利如期通关。",
        options: ["与否", "了吗", "没有", "罢了"],
        answer_index: 0,
        explanation: {
          vi: "Thành phần danh ngữ hóa chính phản trang trọng: 合格与否 (đạt chuẩn hay không).",
          ja: "「合格与否」で合否を客観的論題として提示します。",
          en: "合格与否 forms the formal subject: whether qualified or not."
        }
      }
    ],
    error_correction: [
      {
        wrong: "请问经理，你同意与否我们下周出差？",
        correct: "请问经理，您是否同意我们下周出差？",
        hint: {
          vi: "Câu hỏi trực tiếp trong giao tiếp dùng 是否同意 hoặc 同意不同意, không dùng 与否 ở giữa câu.",
          ja: "直接の質問では「是否同意」を用います。",
          en: "In direct questions, use 是否 before the verb rather than postverbal 与否."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Cụm từ nào có thể kết hợp chuẩn mực nhất với '关系到企业的生死存亡'?",
          ja: "「企業の存亡に関わる」と主語として自然に結びつくのはどれですか？",
          en: "Which subject pairs best with 关系到企业的生死存亡?"
        },
        options: [
          "这次重大并购案谈判成功与否",
          "他昨天去不去公司",
          "大家都非常高兴",
          "因为下大雨了"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "谈判成功与否: việc đàm phán thành công hay không (làm chủ ngữ trang trọng cho 关系到).",
          ja: "「M&A交渉が成功するか否か」が公的かつ重大な主語として適合します。",
          en: "谈判成功与否 functions as a formal abstract subject."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "V/Adj + 与否: Có... hay không (được hay không), làm chủ đề lập luận cao cấp.",
        ja: "「動詞／形容詞＋与否」：正反の可能性を主語化する学術表現。",
        en: "Verb/Adj + 与否: Nominalizes binary polar issues into formal debate subjects."
      },
      remember: [
        { vi: "Không dùng trong câu hỏi đối thoại trực tiếp hàng ngày.", ja: "直接の口頭質問では使わない。", en: "Avoid in direct spoken queries." },
        { vi: "Thường đi kèm với 取决于 (phụ thuộc vào) hoặc 关系到 (ảnh hưởng đến).", ja: "取决于、关系到と好相性。", en: "Frequently governs 取决于 or 关系到." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 12. hsk789_classical_double_negation_wu_bu
  {
    id: "hsk789_classical_double_negation_wu_bu",
    level: "HSK7-9",
    level_num: 7,
    category: "negation",
    difficulty: 5,
    frequency: 4,
    register: "formal",
    keywords: ["无不", "莫不", "未尝不", "不无", "wúbù", "mòbù", "không ai không", "không khỏi", "〜ないものはない", "double negation", "litotes"],
    formula: "S + 无不 / 莫不 + VP  hoặc  S + 不无 + N (không khỏi có chút...)",
    formula_plain: {
      vi: "Phủ định kép cổ văn: 无不 / 莫不 (không ai là không / tất cả đều...), 不无 (không khỏi có chút...)",
      ja: "「无不・莫不（〜しないものはない・皆〜である）」「不无（〜なしとしない・幾分〜がある）」",
      en: "Classical double negation and litotes: 无不 (all without exception), 不无 (not without / somewhat)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ tập thể", ja: "全体主語", en: "Collective Subject" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phủ định kép (无不/莫不/不无)", ja: "二重否定 (无不/莫不/不无)", en: "Double Negation" }, role: "negation", color: "#EF4444" },
      { label: { vi: "Vị ngữ khẳng định ngầm", ja: "肯定的述語", en: "Implied Affirmation" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_bu_negation", "hsk4_bude_bu_double_negation"],
    confusable_with: [
      {
        id: "hsk4_bude_bu_double_negation",
        diff: {
          vi: "不得不 chỉ sự bắt buộc miễn cưỡng ('buộc phải làm'). Còn 无不 / 莫不 là phủ định kép mang tính toàn thể ('100% không ai ngoại lệ đều khen ngợi').",
          ja: "「不得不」はやむを得ない義務を表しますが、「无不」は全体肯定（例外なく皆〜だ）を表します。",
          en: "不得不 expresses compelled necessity ('have to'), whereas 无不 expresses universal affirmation ('all without exception')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Phủ định kép cổ văn tinh tế (无不, 莫不, 未尝不, 不无)",
        quick_rule_3s: "Nắm vững 2 loại: 无不 / 莫不 = 都 (tất cả đều, không một ai ngoại lệ); 不无 = có chút (không phải không có, như 不无道理 = không phải không có lý).",
        contrastive_note: "Tiếng Việt văn chương nói 'không ai không thán phục', 'không khỏi có phần lo ngại'. Phủ định kép tạo nên giọng văn uyển chuyển, uyên bác và giàu sức thuyết phục.",
        analogy: "Hai dấu trừ (-) nhân lại thành dấu cộng (+), nhưng mang lại năng lượng cảm xúc mạnh mẽ hơn một dấu cộng đơn thuần.",
        mnemonic: "Vô bất (无不) là ai cũng; Bất vô (不无) là có phần.",
        how_to_use: [
          { step: 1, text: "Muốn nhấn mạnh 100% mọi người đều xúc động/khen ngợi: dùng 无不 (như 令人无不为之动容)." },
          { step: 2, text: "Muốn thể hiện sự uyển chuyển dè dặt: dùng 不无 (như 不无遗憾, 不无裨益)." }
        ],
        self_check: ["无不 có mang hàm ý khẳng định tuyệt đối không?", "不无 phía sau có phải là danh từ/tính từ cảm xúc/phán đoán không?"],
        tips: ["不无道理 (không phải không có lý), 令人无不赞叹 (khiến người ta không ai không trầm trồ)."],
        when_to_use: ["Phê bình nghệ thuật, diễn văn tưởng niệm, bình luận xã hội sâu sắc."],
        when_not_to_use: ["Báo cáo số liệu kỹ thuật khô khan."],
        fatal_mistake: {
          wrong: "大家都无不都来了。(Lặp thừa từ 都).",
          correct: "见者无不称赞。/ 大家无不为之赞叹。",
          explanation: "Bản thân chữ 无不 đã bao hàm nghĩa 'đều' (都), không ghép thêm chữ 都 ngay sau 无不."
        }
      },
      ja: {
        title: "文語二重否定と緩叙法（无不・莫不・未尝不・不无）",
        quick_rule_3s: "无不／莫不＝例外なく皆〜である。不无＝〜なしとしない（幾分その気がある）。",
        contrastive_note: "漢文訓読の「〜ざるはなし（无不）」「〜なしとせず（不无）」と完全一致。",
        analogy: "マイナス×マイナス＝強力なプラス。直接断定を避けつつ深い説得力を生む修辞法。",
        mnemonic: "无不は例外なき全体肯定、不无は控えめな肯定。",
        how_to_use: [
          { step: 1, text: "全員の賞賛や感動を強調する場合「无不」を動詞の前に置く。" },
          { step: 2, text: "控えめな認否を表す場合「不无」に名詞を続ける（例：不无道理）。" }
        ],
        self_check: ["无不の直後に「都」を重複させていませんか？"],
        tips: ["「不无道理（一理ある）」はビジネス折衝でも重宝。"],
        when_to_use: ["評論、記念スピーチ、格調高いエッセイ。"],
        when_not_to_use: ["単純な事実報告。"],
        fatal_mistake: {
          wrong: "全场观众无不都起立鼓掌。",
          correct: "全场观众无不起立鼓掌。",
          explanation: "无不自体に全体（都）の意が含まれるため、都の重出を避けます。"
        }
      },
      en: {
        title: "Classical double negations and litotes (无不, 莫不, 未尝不, 不无)",
        quick_rule_3s: "无不 / 莫不 = 'all without exception'; 不无 = 'not without / somewhat' (classic litotes).",
        contrastive_note: "Double negation softens assertion while enriching stylistic depth, directly akin to English litotes ('not unmindful').",
        analogy: "Negative times negative yields a resounding positive, clothed in classical tact.",
        mnemonic: "无不 means all do; 不无 means not without some truth.",
        how_to_use: [
          { step: 1, text: "For universal sentiment: place 无不 before the predicate verb." },
          { step: 2, text: "For understated concession: use 不无 + noun (e.g. 不无遗憾, 不无道理)." }
        ],
        self_check: ["Ensure 都 is not redundantly appended after 无不."],
        tips: ["不无道理 = 'there is definitely some truth in that'."],
        when_to_use: ["Literary reviews, commemorative addresses, refined diplomacy."],
        when_not_to_use: ["Raw factual tabular logs."],
        fatal_mistake: {
          wrong: "Everyone 无不都 came.",
          correct: "Everyone 无不 was moved (无不为之动容).",
          explanation: "Do not double up 都 with 无不."
        }
      }
    },
    collocations: [
      { zh: "见者无不赞叹", pinyin: "jiàn zhě wú bù zàntàn", tr: { vi: "người nhìn thấy không ai là không trầm trồ", ja: "見る者皆感嘆しない者はない", en: "all who beheld it marvelled without exception" } },
      { zh: "不无道理", pinyin: "bù wú dàolǐ", tr: { vi: "không phải không có lý", ja: "一理ある", en: "not without reason" } }
    ],
    examples: [
      {
        zh: "听完这位老科学家一生为国奉献的感人事迹，在场青年学者无不为之动容。",
        pinyin: "Tīng wán zhè wèi lǎo kēxuéjiā yìshēng wèi guó fèngxiàn de gǎnrén shìjì, zàichǎng qīngnián xuézhě wú bù wéi zhī dòngróng.",
        tokens: [
          { hanzi: "青年学者", pinyin: "qīngnián xuézhě", role: "subject", hanviet: "thanh niên học giả" },
          { hanzi: "无不", pinyin: "wú bù", role: "negation", hanviet: "vô bất" },
          { hanzi: "为之动容", pinyin: "wéi zhī dòngróng", role: "verb", hanviet: "vi chi động dung" }
        ],
        translations: {
          vi: "Sau khi nghe xong câu chuyện cả đời cống hiến vì tổ quốc đầy cảm động của nhà khoa học lão thành, các học giả trẻ có mặt không một ai là không xúc động sâu sắc.",
          ja: "老科学者の国家に捧げた感動的な生涯を聞き終え、その場にいた若手研究者たちは皆一様に心を打たれた。",
          en: "Listening to the moving story of this veteran scientist's lifelong dedication, every young scholar present was touched without exception."
        },
        scenario: "Hội thảo vinh danh cống hiến khoa học",
        tone_tip: "Đọc 无不 (wúbù) liền mạch, thể hiện sự đồng lòng cảm phục tuyệt đối."
      }
    ],
    dialogue: {
      goal: { vi: "Đánh giá đề xuất táo bạo của đối tác", ja: "斬新な提案の評価", en: "Evaluating an audacious proposal" },
      lines: [
        { speaker: "项目经理", zh: "对方提出的反向收购方案，您觉得可行性有多大？", pinyin: "Duìfāng tíchū de fǎnxiàng shōugòu fāng'àn, nín juéde kěxíngxìng yǒu duō dà?", tr: { vi: "Phương án thâu tóm ngược mà đối phương đưa ra, sếp thấy tính khả thi lớn không?", ja: "先方の提示した逆買収スキーム、実現可能性をどう見られますか？", en: "How feasible do you find the reverse takeover proposal presented by the counterparty?" } },
        { speaker: "投资总监", zh: "虽然看似激进，但其风险对冲机制设计精妙，言下之意不无道理。", pinyin: "Suīrán kànsì jījìn, dàn qí fēngxiǎn duìchōng jīzhì shèjì jīngmiào, yán xià zhī yì bù wú dàolǐ.", tr: { vi: "Tuy trông có vẻ cấp tiến, nhưng cơ chế phòng ngừa rủi ro của họ thiết kế rất tinh tế, ngụ ý bên trong không phải không có lý.", ja: "過激に見えますが、ヘッジ機能が精緻に組まれており、言わんとするところは一理あります。", en: "Though seemingly aggressive, their hedging design is ingenious; their rationale is not without merit." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["凡是读过此书的人", "无不被其", "博大精深的智慧", "深深折服"],
        correct_order: ["凡是读过此书的人", "无不被其", "博大精深的智慧", "深深折服"]
      }
    ],
    fill_blank: [
      {
        sentence: "他的分析切中要害，指出的潜在隐患确实____。",
        options: ["不无道理", "不得不", "大可不必", "无能为力"],
        answer_index: 0,
        explanation: {
          vi: "Thành ngữ uyển chuyển: 不无道理 (không phải không có lý / hoàn toàn có cơ sở).",
          ja: "「不无道理（一理ある）」の定型成語です。",
          en: "不无道理 expresses 'definitely has a point / not without reason'."
        }
      }
    ],
    error_correction: [
      {
        wrong: "全体员工无不都参加了年会。",
        correct: "全体员工无不参加了年会。",
        hint: {
          vi: "无不 đã mang nghĩa 'tất cả đều', không dùng thêm 都 phía sau.",
          ja: "无不にすでに都の意味が含まれるため、都を削除します。",
          en: "Delete redundant 都 after 无不."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Từ nào đồng nghĩa chuẩn xác nhất với '无不'?",
          ja: "「无不」とほぼ同義の語はどれですか？",
          en: "Which word is most synonymous with 无不?"
        },
        options: ["都 (tất cả đều không ngoại lệ)", "不 (không)", "没 (chưa)", "别 (đừng)"],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "无不 = 没有不 (không ai không = tất cả đều / 都).",
          ja: "二重否定により強い全体肯定（都）を表します。",
          en: "无不 equals a strong universal affirmative (都)."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "无不 / 莫不 (tất cả đều), 不无 (không phải không có): Phủ định kép tao nhã.",
        ja: "「无不＝皆〜である」「不无＝一理ある」格調高い二重否定。",
        en: "Classical double negation conveying universal praise or tactful modesty."
      },
      remember: [
        { vi: "Không ghép 都 ngay sau 无不.", ja: "无不の後に都を重ねない。", en: "Avoid redundant 都 after 无不." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 13. hsk789_academic_framing_jiu_er_yan
  {
    id: "hsk789_academic_framing_jiu_er_yan",
    level: "HSK7-9",
    level_num: 7,
    category: "written_style",
    difficulty: 5,
    frequency: 5,
    register: "formal",
    keywords: ["就而言", "从来看", "鉴于", "jiù...éryán", "cóng...láikàn", "xét về mặt", "căn cứ vào", "〜に関して言えば", "in terms of", "in light of"],
    formula: "就 + Topic + 而言 / 来说  hoặc  从…角度来看  hoặc  鉴于 + Fact，S + VP",
    formula_plain: {
      vi: "Khung giới hạn góc độ học thuật: 就...而言 (xét về mặt... mà nói), 鉴于... (xét thấy / căn cứ vào...)",
      ja: "「就…而言（〜に関して言えば／〜の観点からすれば）」「鉴于…（〜に鑑みて）」",
      en: "Academic framing: 就...而言 (as far as ... is concerned) / 鉴于... (in light of ...)"
    },
    structure_blocks: [
      { label: { vi: "Khung góc độ (就…而言)", ja: "視点限定枠 (就…而言)", en: "Framing Marker" }, role: "preposition", color: "#8B5CF6" },
      { label: { vi: "Phạm vi học thuật / Tiền đề", ja: "限定領域", en: "Topic / Domain" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Luận điểm nhận định", ja: "見解・評価", en: "Evaluation / Proposition" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk3_dui_preposition", "hsk6_yu_postverbal_preposition"],
    confusable_with: [
      {
        id: "hsk3_dui_preposition",
        diff: {
          vi: "对...来说 là khẩu ngữ phổ thông. 就...而言 là cấu trúc học thuật cao cấp trong luận văn, báo cáo vĩ mô, giới hạn góc độ chuyên môn chặt chẽ.",
          ja: "「对…来说」が日常会話向けであるのに対し、「就…而言」は論文・専門レポートで特定の考察領域を限定する学術フレームです。",
          en: "对...来说 is conversational, whereas 就...而言 defines precise parameters in academic or legal discourse."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Khung giới hạn góc độ học thuật (就...而言, 从...来看, 依...之见, 鉴于...)",
        quick_rule_3s: "Đóng khung chủ đề phân tích bằng '就 + Lĩnh vực + 而言' (Xét riêng về mặt kinh tế / kỹ thuật / pháp lý mà nói...).",
        contrastive_note: "Tiếng Việt nói 'xét về phương diện...', 'xét về bản chất...'. 鉴于 = 'xét thấy / xét vì...'.",
        analogy: "Chiếc ống kính tele nhiếp ảnh: zoom cận cảnh vào đúng một góc độ nhất định để các kết luận sau đó có cơ sở khoa học chính xác.",
        mnemonic: "Tựu... nhi ngôn (就...而言) định khung phạm vi học thuật.",
        how_to_use: [
          { step: 1, text: "Xác định góc độ chuyên môn (kinh tế, kỹ thuật, pháp lý, môi trường)." },
          { step: 2, text: "Đóng khung bằng '就 + Góc độ + 而言'." },
          { step: 3, text: "Đưa ra nhận định khách quan ở mệnh đề chính." }
        ],
        self_check: ["Lĩnh vực bên trong có mang tính học thuật / chuyên môn không?"],
        tips: ["就目前的情况而言 (xét theo tình hình trước mắt), 鉴于上述事实 (căn cứ vào những sự thật nêu trên)."],
        when_to_use: ["Luận án thạc sĩ/tiến sĩ, hợp đồng thương mại quốc tế, bản cáo bạch đầu tư."],
        when_not_to_use: ["Hỏi han đời thường."],
        fatal_mistake: {
          wrong: "就我而言喜欢吃苹果。(Dùng cho sở thích cá nhân tầm thường).",
          correct: "对我来说，我喜欢吃苹果。/ 就个人职业发展而言，此举大有裨益。",
          explanation: "就...而言 dành cho các phân tích nghiêm túc, không dùng cho sở thích vụn vặt cá nhân."
        }
      },
      ja: {
        title: "論説・学術の視点限定フレーム（就…而言／从…来看／依…之见／鉴于…）",
        quick_rule_3s: "「就＋領域＋而言」で議論の前提領域を厳格に限定します（〜の観点から言えば）。",
        contrastive_note: "日本語の論文用語「〜に関して言えば」「〜の立場から論ずれば」「〜に鑑みて（鉴于）」に完全合致します。",
        analogy: "多面的な対象に対し、分析する光の照射角度を明示するフレームです。",
        mnemonic: "就と而言で挟み、学術視点をロックオン。",
        how_to_use: [
          { step: 1, text: "評価軸（経済性、安全性、法規範など）を策定。" },
          { step: 2, text: "「就…而言」で挟む。" },
          { step: 3, text: "学術的結論を後続させる。" }
        ],
        self_check: ["日常の個人的な好みに使っていませんか？"],
        tips: ["「鉴于上述原因（以上の理由に鑑み）」は契約書の定番起草文。"],
        when_to_use: ["学術論文、投資目論見書、法的意見書。"],
        when_not_to_use: ["日常会話。"],
        fatal_mistake: {
          wrong: "就我而言想喝水。",
          correct: "我想喝水。/ 就当前形势而言，该战略极为明智。",
          explanation: "学術的・公的なコンテキストでのみ使用します。"
        }
      },
      en: {
        title: "Academic framing constructions (就...而言, 鉴于...)",
        quick_rule_3s: "Frame parameter: 就 + Topic + 而言 = 'in terms of / as far as ... is concerned'. 鉴于 = 'in light of / given that'.",
        contrastive_note: "Rigorous academic delimiter comparable to English 'strictly from the standpoint of'.",
        analogy: "Setting the boundary of a mathematical proof or economic model.",
        mnemonic: "Enclose the specialized domain with 就 and 而言.",
        how_to_use: [
          { step: 1, text: "Specify the evaluation dimension (e.g. 经济效益, 技术可行性)." },
          { step: 2, text: "Frame with 就...而言." },
          { step: 3, text: "Deliver the analytical deduction." }
        ],
        self_check: ["Is this a formal analytical scope?"],
        tips: ["Formulaic: 鉴于上述事实 (In light of the aforementioned facts)."],
        when_to_use: ["Theses, board memorandums, policy whitepapers."],
        when_not_to_use: ["Trivial domestic matters."],
        fatal_mistake: {
          wrong: "就我而言 I want an ice cream.",
          correct: "For me, I want ice cream. / 就长远规划而言, this investment is sound.",
          explanation: "Reserve 就...而言 for substantive macro or strategic analysis."
        }
      }
    },
    collocations: [
      { zh: "就目前的情况而言", pinyin: "jiù mùqián de qíngkuàng ér yán", tr: { vi: "xét theo tình hình hiện nay mà nói", ja: "現在の情勢に鑑みれば", en: "as far as the current situation is concerned" } },
      { zh: "鉴于上述原因", pinyin: "jiànyú shàngshù yuányīn", tr: { vi: "căn cứ vào các nguyên nhân nêu trên", ja: "前述の理由に鑑み", en: "in light of the aforementioned reasons" } }
    ],
    examples: [
      {
        zh: "就产业升级的宏观趋势而言，单纯依赖低要素成本的发展模式已难以维系。",
        pinyin: "Jiù chǎnyè shēngjí de hóngguān qūshì ér yán, dānchún yīlài dī yàosù chéngběn de fāzhǎn móshì yǐ nányǐ wéixì.",
        tokens: [
          { hanzi: "就", pinyin: "jiù", role: "preposition", hanviet: "tựu" },
          { hanzi: "宏观趋势", pinyin: "hóngguān qūshì", role: "object", hanviet: "hoành quan xu thế" },
          { hanzi: "而言", pinyin: "ér yán", role: "particle", hanviet: "nhi ngôn" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "发展模式", pinyin: "fāzhǎn móshì", role: "subject", hanviet: "phát triển mô thức" },
          { hanzi: "难以维系", pinyin: "nányǐ wéixì", role: "verb", hanviet: "nan dĩ duy hệ" }
        ],
        translations: {
          vi: "Xét về xu thế vĩ mô của quá trình nâng cấp công nghiệp, mô hình phát triển đơn thuần dựa vào chi phí nhân công và nguyên liệu rẻ đã khó có thể duy trì.",
          ja: "産業高度化というマクロの潮流から言えば、単に低コスト要素に依存する発展モデルの維持はもはや困難である。",
          en: "As far as the macro trend of industrial upgrading is concerned, a development model purely reliant on low factor costs is no longer sustainable."
        },
        scenario: "Báo cáo kinh tế vĩ mô của viện nghiên cứu",
        tone_tip: "Nhịp ngắt sau 而言 rõ ràng, giọng văn khách quan học thuật."
      }
    ],
    dialogue: {
      goal: { vi: "Đánh giá tính khả thi đầu tư dây chuyền mới", ja: "生産ライン投資の採算性検討", en: "Production line investment feasibility" },
      lines: [
        { speaker: "财务总监", zh: "该技术前期的资本开支非常庞大，投资回报周期可能长达七年。", pinyin: "Gāi jìshù qiánqī de zīběn kāizhī fēicháng pángdà, tóuzī huíbào zhōuqī kěnéng cháng dá qī nián.", tr: { vi: "Khoản chi tiêu vốn ban đầu cho công nghệ này rất khổng lồ, chu kỳ thu hồi vốn có thể kéo dài tới 7 năm.", ja: "本技術は初期投資が膨大で、回収期間が7年に及ぶ可能性があります。", en: "Initial Capex for this technology is massive, with payback potentially taking up to 7 years." } },
        { speaker: "技术总监", zh: "就长期的核心技术竞争力而言，若不提前布局，我们将被行业彻底淘汰。", pinyin: "Jiù chángqī de héxīn jìshù jìngzhēnglì ér yán, ruò bù tíqián bùjú, wǒmen jiāng bèi hángyè chèdǐ táotài.", tr: { vi: "Xét về năng lực cạnh tranh công nghệ cốt lõi lâu dài, nếu không bố trí đi tắt đón đầu, chúng ta sẽ bị cả ngành đào thải hoàn toàn.", ja: "長期的な中核技術の競争力という観点から言えば、先行投資しなければ業界から淘汰されます。", en: "In terms of long-term core technology competitiveness, failing to deploy ahead of time means total obsolescence." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["就目前的市场格局而言", "任何盲目扩张", "都存在极大风险"],
        correct_order: ["就目前的市场格局而言", "任何盲目扩张", "都存在极大风险"]
      }
    ],
    fill_blank: [
      {
        sentence: "____目前严峻的国际贸易摩擦形势，公司决定调整海外供应链布局。",
        options: ["鉴于", "就", "何况", "无不"],
        answer_index: 0,
        explanation: {
          vi: "Diễn đạt 'căn cứ vào / xét thấy tình hình...': dùng liên từ trang trọng '鉴于'.",
          ja: "「〜の情勢に鑑み」には「鉴于」を用います。",
          en: "鉴于 means 'in light of / given the circumstances'."
        }
      }
    ],
    error_correction: [
      {
        wrong: "就这件小事而言，他很开心。",
        correct: "对于这件小事，他很开心。/ 就长远影响而言，此事非同小可。",
        hint: {
          vi: "就...而言 chỉ dùng cho phân tích vĩ mô/chiến lược, không dùng cho việc vặt vãnh.",
          ja: "就…而言は学術的・大所高所からの視点限定に用います。",
          en: "Do not apply 就...而言 to trivial mundane events."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Vị trí trống nào sau đây điền '就...而言' là phù hợp nhất?",
          ja: "「就…而言」を挿入する文として最もふさわしいのはどれですか？",
          en: "Where is 就...而言 most appropriately applied?"
        },
        options: [
          "____企业可持续发展的战略高度____，绿色低碳转型势在必行。",
          "____我今天的午餐____，吃面条最方便。",
          "____昨天的那场电影____，主角长得很帅。",
          "____这件衣服的价格____，我不买了。"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "Chỉ có phương án 0 mang tính chiến lược học thuật tầm cao (Doanh nghiệp phát triển bền vững).",
          ja: "企業の持続的発展戦略という高度な学術テーマに合致する選択肢0が正解です。",
          en: "Option 0 represents a macro strategic topic appropriate for academic framing."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "就...而言 (xét về mặt... mà nói), 鉴于 (căn cứ vào): Đóng khung học thuật.",
        ja: "「就…而言」「鉴于」学術的・法的視点を厳格に設定する構文。",
        en: "Academic framing delimiters setting precise analytical boundaries."
      },
      remember: [
        { vi: "Chỉ dùng cho góc độ chuyên môn hoặc vĩ mô.", ja: "専門的・マクロ視点で用いる。", en: "Use for macro or specialized analytical lenses." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 14. hsk789_subjunctive_counterfactual_yao_bu_shi
  {
    id: "hsk789_subjunctive_counterfactual_yao_bu_shi",
    level: "HSK7-9",
    level_num: 7,
    category: "conjunction",
    difficulty: 5,
    frequency: 4,
    register: "neutral",
    keywords: ["要不是", "若非", "焉能", "yàobúshì", "ruòfēi", "nếu không nhờ", "nếu không có", "〜でなければ", "counterfactual", "subjunctive"],
    formula: "要不是 / 若非 / 若不是 + Condition，(S) + 早就 / 怎能 / 焉能 + Result",
    formula_plain: {
      vi: "Giả định trái thực tế: 要不是 (khẩu ngữ) / 若非 (văn ngôn) + Nếu không có... thì đã...",
      ja: "「要不是（口語）／若非（文語）…，（早／焉能）…」（もし〜でなかったら、今頃とうに〜であったろうに）",
      en: "Counterfactual subjunctive: 要不是 (colloquial) / 若非 (literary) ... but for / had it not been for"
    },
    structure_blocks: [
      { label: { vi: "Liên từ phản thực tế (要不是/若非)", ja: "反事実接続詞 (要不是/若非)", en: "Counterfactual Marker" }, role: "conjunction", color: "#EF4444" },
      { label: { vi: "Điều kiện cứu vãn thực tế", ja: "回避された過去の事実", en: "Averted Reality" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Phó từ hệ quả đối ứng (早就/焉能)", ja: "帰結副詞 (早就/焉能)", en: "Consequent Adverb" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk2_yinwei_suoyi", "hsk5_he_kuang_let_alone"],
    confusable_with: [
      {
        id: "hsk2_yinwei_suoyi",
        diff: {
          vi: "如果...就 là giả định tương lai thông thường. Còn 要不是 / 若非 là giả định trái ngược với sự thật trong quá khứ ('nếu không có sự can thiệp ấy thì cơ sự đã hỏng bét từ lâu').",
          ja: "「如果」が未来の仮定であるのに対し、「要不是／若非」はすでに起きた過去の事実に対する反事実仮想（〜でなかったら今頃…）です。",
          en: "如果 hypothesizes future scenarios, whereas 要不是 / 若非 constructs a counterfactual past conditional ('had it not been for...')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Giả định trái thực tế từ khẩu ngữ đến cổ văn (要不是...早就... / 若非...焉能...)",
        quick_rule_3s: "Nắm chắc 2 cấp độ: Khẩu ngữ dùng '要不是...早就...' (nếu không nhờ... thì đã... từ lâu); Văn ngôn dùng '若非...焉能...' (nếu chẳng phải... sao có thể...).",
        contrastive_note: "Tương đương cấu trúc 'If it had not been for / But for' trong tiếng Anh và 'Nếu không nhờ có...' trong tiếng Việt.",
        analogy: "Chiếc kính nhìn vào vũ trụ song song: tưởng tượng lại nếu không có sự giúp đỡ trong quá khứ thì thực tại đã tồi tệ thế nào.",
        mnemonic: "Nếu chẳng nhờ (要不是/若非), thời sớm đã (早就) nguy cơ.",
        how_to_use: [
          { step: 1, text: "Vế 1 đặt 要不是 hoặc 若非 + sự giúp đỡ / yếu tố may mắn đã diễn ra." },
          { step: 2, text: "Vế 2 dùng 早就 (đã... từ lâu) hoặc câu phản vấn 怎能 / 焉能 (sao có thể)." }
        ],
        self_check: ["Sự việc ở vế 1 có phải là điều ĐÃ thực sự xảy ra trong quá khứ không?", "Vế 2 có chứa 早就 hoặc 怎能/焉能 không?"],
        tips: ["Biểu đạt lòng biết ơn sâu sắc: 要不是您的鼎力相助，我们绝不可能渡过难关."],
        when_to_use: ["Bày tỏ lòng tri ân sâu sắc, hồi tưởng khủng hoảng đã qua, đàm phán quan hệ đối tác."],
        when_not_to_use: ["Giả định điều kiện bình thường cho ngày mai."],
        fatal_mistake: {
          wrong: "要不是明天下雨，我们就去野餐。(Sai thì: ngày mai là tương lai!).",
          correct: "如果明天不下雨，我们就去野餐。/ 要不是昨天下雨，我们早就成行了。",
          explanation: "要不是 dùng cho sự việc trong quá khứ trái thực tế, không dùng cho dự báo tương lai."
        }
      },
      ja: {
        title: "反事実仮想構文（要不是…早就…／若非…焉能…）",
        quick_rule_3s: "口語「要不是…早就…」、文語「若非…焉能…」（〜の助けがなかったら、今頃とうに〜だったろうに）。",
        contrastive_note: "英語の仮定法過去完了「Had it not been for」に相当。過去の危機回避に対する強い感謝・感慨を表現。",
        analogy: "もしあの時ブレーキを踏んでいなかったら…と安堵する心理の言語化。",
        mnemonic: "要不是（でなければ）早就（とうに）。",
        how_to_use: [
          { step: 1, text: "第1節に要不是／若非＋救済要因を置く。" },
          { step: 2, text: "第2節に早就／焉能＋仮定的破綻事態を置く。" }
        ],
        self_check: ["未来の仮定と混同していませんか？過去の事実反証ですか？"],
        tips: ["感謝の辞、危機克服の回顧録で極めて重厚な響き。"],
        when_to_use: ["感謝状、記念スピーチ、危機管理総括。"],
        when_not_to_use: ["明日の予定の条件分岐。"],
        fatal_mistake: {
          wrong: "要不是明天下雨，我就出门。",
          correct: "要不是昨天下雨，我早就出门了。",
          explanation: "要不是は過去の反事実に用いるため、明日の予定には「如果」を用います。"
        }
      },
      en: {
        title: "Counterfactual conditionals from colloquial (要不是) to literary (若非)",
        quick_rule_3s: "Spoken: 要不是...早就... (but for... would have long ago...). Literary: 若非...焉能... (had it not been for... how could...).",
        contrastive_note: "Directly mirrors the English past counterfactual: 'Had it not been for X, Y would have happened.'",
        analogy: "Looking into an alternate timeline where a narrow escape didn't occur.",
        mnemonic: "要不是 undoes the past miracle; 早就 states the disaster that would have unfolded.",
        how_to_use: [
          { step: 1, text: "State the real-world lifesaver with 要不是 or 若非." },
          { step: 2, text: "Follow with 早就 (would have long ago) or 怎能/焉能 (how could...)." }
        ],
        self_check: ["Is this a retrospective counterfactual about past events?"],
        tips: ["Supreme expression of gratitude: 若非阁下鼎力相助，焉有今日之成？"],
        when_to_use: ["Deep gratitude, retrospective post-mortems, anniversary speeches."],
        when_not_to_use: ["Future hypothetical conditionals."],
        fatal_mistake: {
          wrong: "要不是 tomorrow rains, we go.",
          correct: "If tomorrow does not rain, we will go. / 要不是 yesterday's rain, we would have arrived.",
          explanation: "要不是 applies exclusively to counterfactual past realities."
        }
      }
    },
    collocations: [
      { zh: "要不是你提醒，我早就忘了", pinyin: "yàobúshì nǐ tíxǐng, wǒ zǎojiù wàng le", tr: { vi: "nếu không nhờ bạn nhắc, tôi đã quên mất từ lâu rồi", ja: "君のリマインドがなかったら、とうに忘れていたよ", en: "had you not reminded me, I would have long forgotten" } },
      { zh: "若非群策群力，焉能渡此危机", pinyin: "ruòfēi qúncèqúnlì, yān néng dù cǐ wēijī", tr: { vi: "nếu chẳng nhờ chung lưng đấu cật, sao có thể vượt qua cơn khủng hoảng này", ja: "全軍の団結がなかったら、どうしてこの危機を乗り越えられたであろうか", en: "had it not been for collective grit, how could we have survived this crisis" } }
    ],
    examples: [
      {
        zh: "要不是医疗专家团队在黄金时间内实施抢救，伤者的生命恐怕早就无法挽回了。",
        pinyin: "Yàobúshì yīliáo zhuānjiā tuánduì zài huángjīn shíjiān nèi shíshī qiǎngjiù, shāngzhě de shēngmìng kǒngpà zǎojiù wúfǎ wǎnhuí le.",
        tokens: [
          { hanzi: "要不是", pinyin: "yàobúshì", role: "conjunction", hanviet: "yếu bất thị" },
          { hanzi: "医疗团队实施抢救", pinyin: "yīliáo tuánduì shíshī qiǎngjiù", role: "subject", hanviet: "y liệu đoàn đội thực thi thưởng cứu" },
          { hanzi: "，", pinyin: "", role: "punctuation", hanviet: "" },
          { hanzi: "生命", pinyin: "shēngmìng", role: "subject", hanviet: "sinh mệnh" },
          { hanzi: "早就无法挽回了", pinyin: "zǎojiù wúfǎ wǎnhuí le", role: "verb", hanviet: "tảo tựu vô pháp vãn hồi liễu" }
        ],
        translations: {
          vi: "Nếu không nhờ đội ngũ chuyên gia y tế tiến hành cấp cứu trong khoảng thời gian vàng, tính mạng của nạn nhân e rằng đã không thể cứu vãn từ lâu rồi.",
          ja: "医療専門家チームがゴールデンタイム内に迅速な救命措置を取っていなかったら、負傷者の命はとうに取り返しのつかないことになっていただろう。",
          en: "Had it not been for the medical expert team administering emergency rescue within the golden window, the victim's life would likely have been lost long ago."
        },
        scenario: "Tường thuật ca cấp cứu kỳ tích",
        tone_tip: "Nhấn mạnh vào 要不是 (yàobúshì) và 早就 (zǎojiù)."
      }
    ],
    dialogue: {
      goal: { vi: "Tri ân đối tác sau khủng hoảng gián đoạn chuỗi cung ứng", ja: "サプライチェーン危機克服後の感謝", en: "Gratitude for crisis supply support" },
      lines: [
        { speaker: "董事长", zh: "若非贵司在上个月关键时刻调拨备用库存支援，我方生产线恐怕早就停摆了。", pinyin: "Ruòfēi guì sī zài shàng ge yuè guānjiàn shíkè diàobō bèiyòng kùcún zhīyuán, wǒfāng shēngchǎnxiàn kǒngpà zǎojiù tíngbǎi le.", tr: { vi: "Nếu chẳng nhờ quý công ty điều động kho dự phòng hỗ trợ vào thời khắc mấu chốt tháng trước, dây chuyền bên tôi e rằng đã đình trệ từ lâu rồi.", ja: "先月、貴社が予備在庫を融通してくださらなかったら、弊社のラインはとうに止まっていたはずです。", en: "Had it not been for your company allocating reserve stock at that crucial juncture last month, our assembly line would have halted long ago." } },
        { speaker: "战略伙伴", zh: "同舟共济是我们长期合作的基石，能够共克时艰是我们的荣幸。", pinyin: "Tóngzhōugòngjì shì wǒmen chángqī hézuò de jīshí, nénggòu gòng kè shí jiān shì wǒmen de róngxìng.", tr: { vi: "Cùng hội cùng thuyền là nền tảng hợp tác lâu dài của chúng ta, có thể cùng nhau vượt qua khó khăn là vinh hạnh của chúng tôi.", ja: "同じ船に乗る者として助け合うのは当然の責務、共に難局を乗り越えられて光栄です。", en: "Weathering storms together is the bedrock of our partnership; overcoming hardship jointly is our privilege." } }
      ]
    },
    puzzles: [
      {
        scrambled_tokens: ["要不是有你的及时提醒", "我今天肯定会", "误了飞机"],
        correct_order: ["要不是有你的及时提醒", "我今天肯定会", "误了飞机"]
      }
    ],
    fill_blank: [
      {
        sentence: "公司能有今天的辉煌基业，____老一辈创业者的披荆斩棘，焉有后辈之安享成果？",
        options: ["若非", "以便", "固然", "以致"],
        answer_index: 0,
        explanation: {
          vi: "Văn ngôn phản thực tế đối ứng với 焉: 若非...，焉有... (nếu chẳng phải... sao có...).",
          ja: "「若非…，焉有…」（〜がなかったらどうして〜があろうか）の反問反事実構文です。",
          en: "若非...焉有... is the classic literary counterfactual pairing."
        }
      }
    ],
    error_correction: [
      {
        wrong: "要不是明天下雨，我就去爬山。",
        correct: "如果明天不下雨，我就去爬山。/ 要不是昨天下雨，我早就去爬山了。",
        hint: {
          vi: "要不是 chỉ dùng cho sự việc trong quá khứ trái thực tế, không dùng cho tương lai.",
          ja: "要不是は過去の反事実にのみ用い、明日の予定には「如果」を用います。",
          en: "Use 如果 for future hypotheticals; reserve 要不是 for past counterfactuals."
        }
      }
    ],
    quiz: [
      {
        question: {
          vi: "Câu nào sau đây biểu đạt ngữ khí tri ân sâu sắc dựa trên giả định trái thực tế trong quá khứ?",
          ja: "過去の反事実に基づいて深い感謝を述べる文として最も適切なものはどれですか？",
          en: "Which sentence conveys deep gratitude via a past counterfactual?"
        },
        options: [
          "要不是您当年的无私提携，绝没有我今天的成绩。",
          "如果明天你来，我就请你吃饭。",
          "因为下大雨，所以比赛取消了。",
          "虽然很困难，但他依然坚持。"
        ],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: {
          vi: "要不是...绝没有...: Nếu không nhờ sự nâng đỡ vô tư của bác năm đó thì tuyệt đối không có thành tích hôm nay của cháu.",
          ja: "「あの時のご指導がなかったら現在の私の成果はありませんでした」という反事実感謝表現です。",
          en: "Option 0 accurately reflects a past counterfactual expressing deep gratitude."
        }
      }
    ],
    summary_card: {
      one_liner: {
        vi: "要不是 / 若非... 早就 / 焉能...: Nếu không nhờ có... thì đã...",
        ja: "「〜がなかったら今頃とうに…」という過去反事実の感慨構文。",
        en: "Had it not been for ... would have long ago."
      },
      remember: [
        { vi: "Chỉ dùng cho việc quá khứ đã được cứu vãn.", ja: "過去の事実にのみ適用（未来の仮定には使わない）。", en: "Applies exclusively to past averted realities." },
        { vi: "Văn ngôn dùng 若非...焉能...", ja: "文語形式は「若非…焉能…」。", en: "Literary form pairs 若非 with 焉能." }
      ]
    },
    needs_review: false,
    review_note: ""
  }
];
