#!/usr/bin/env node
/**
 * tools/generate-essential-grammar-part2.js
 * 
 * Generates 5 more high-frequency HSK Grammar detail rules:
 *   6. hsk1_de_possessive_attributive (Định ngữ + 的 + Danh từ)
 *   7. hsk2_guo_experiential_aspect (S + V + 过)
 *   8. hsk2_zhe_durative_aspect (S + V + 着)
 *   9. hsk2_yinwei_suoyi (因为……所以……)
 *  10. hsk3_yue_lai_yue_yue_yue (越来越…… & 越A越B)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const samplesJsonPath = path.join(rootDir, 'js/data/hsk_grammar_generated_samples.json');
const grammarDataJsPath = path.join(rootDir, 'js/data/grammar-data.js');
const catalogJsonPath = path.join(rootDir, 'js/data/hsk_catalog_2.0_3.0_all_levels.json');

const catalog = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));
const currentSamples = JSON.parse(fs.readFileSync(samplesJsonPath, 'utf8'));

const PART2_ITEMS = [
  // 6. hsk1_de_possessive_attributive
  {
    id: "hsk1_de_possessive_attributive",
    level: "HSK1",
    level_num: 1,
    category: "particle",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["的", "de", "trợ từ kết cấu đích", "của", "possessive particle", "attributive de"],
    formula: "Định ngữ (Sở hữu / Tính chất) + 的 + Danh từ trung tâm",
    formula_plain: {
      vi: "Người sở hữu / Tính chất mô tả + 的 + Danh từ chính",
      ja: "所有者／修飾語 ＋ 的 ＋ 中心名詞（〜の〜）",
      en: "Possessor / Modifier + 的 + Head Noun"
    },
    structure_blocks: [
      { label: { vi: "Định ngữ (Người sở hữu / Tính từ)", ja: "修飾語・所有者", en: "Modifier / Possessor" }, role: "modifier", color: "#3B82F6" },
      { label: { vi: "Trợ từ kết cấu 的", ja: "構造助詞「的」", en: "Structural particle 的" }, role: "particle", color: "#EC4899" },
      { label: { vi: "Danh từ trung tâm", ja: "中心名詞", en: "Head Noun" }, role: "noun", color: "#10B981" }
    ],
    related_ids: ["hsk1_shi_sentence", "hsk2_shi_de_emphasis"],
    confusable_with: [
      {
        id: "hsk2_shi_de_emphasis",
        diff: {
          vi: "的 trong bài này là định ngữ (nối sở hữu hoặc tính chất: 我的书 = sách của tôi). Khác với cấu trúc nhấn mạnh 是...的 trong HSK2 (我是昨天来的 = Tôi đến hôm qua).",
          ja: "名詞を修飾する「的（私の本）」と、強調構文「是…的（昨日来たのだ）」を混同しないようにしましょう。",
          en: "Attributive 的 modifies a noun ('my book'), while 是...的 emphasizes time, place, or manner of a past action."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Trợ từ kết cấu 的 (Định ngữ & Sở hữu)",
        quick_rule_3s: "Đứng trước danh từ để bổ nghĩa. Công thức vàng: 'Cái gì của ai' thì nói 'Ai + 的 + Cái gì' (ngược với tiếng Việt). Khi là người thân ruột thịt (bố, mẹ) hoặc cơ quan trực thuộc có thể lược bỏ 的.",
        contrastive_note: "Tiếng Việt nói 'Sách của tôi' (danh từ chính đứng trước, sở hữu đứng sau). Tiếng Trung ngược 100%: '我的书' (tôi + 的 + sách).",
        analogy: "Coi chữ 的 như một chiếc móc khóa: móc người sở hữu hoặc tính từ vào trước danh từ chính.",
        mnemonic: "Người đứng trước, đồ vật đứng sau; nối nhau bằng chữ 的 thật mau!",
        how_to_use: [
          { step: 1, text: "Đặt người sở hữu hoặc tính từ mô tả (tôi, anh ấy, màu đỏ) ở phía trước." },
          { step: 2, text: "Thêm trợ từ kết cấu 的 (phát âm thanh nhẹ de)." },
          { step: 3, text: "Đặt danh từ chính (sách, điện thoại, bạn bè) ở phía sau." }
        ],
        self_check: [
          "Bạn có bị dịch ngược theo tiếng Việt 'sách tôi' thành '书我' không? Phải là '我的书'!",
          "Quan hệ thân thuộc như 我爸爸, 我妈妈 có thể không cần 的."
        ],
        tips: ["Khi tính từ 2 âm tiết miêu tả danh từ (như 漂亮, 干净), bắt buộc có 的: 漂亮的衣服."],
        when_to_use: ["Khi nói về quyền sở hữu (sách của tôi) hoặc tính chất của đồ vật (táo đỏ, xe mới)."],
        when_not_to_use: ["Không đặt danh từ chính lên trước định ngữ."],
        fatal_mistake: {
          wrong: "书我的很贵。",
          correct: "我的书很贵。",
          explanation: "Trong tiếng Trung, định ngữ sở hữu (我的) bắt buộc phải đứng TRƯỚC danh từ trung tâm (书).",
          why_learners_make_it: "Dịch từng chữ theo trật tự tiếng Việt: 'Sách (书) của tôi (我的)'."
        },
        extra_mistakes: []
      },
      ja: {
        title: "構造助詞「的」（修飾語と所有）",
        quick_rule_3s: "「修飾語＋的＋名詞」で日本語の「〜の〜」を表します。親しい親族（我爸爸）や所属（我们学校）では省略されることがあります。",
        contrastive_note: "日本語の助詞「の」と使い方が酷似しているため、日本人学習者にとって最も習得しやすい助詞の一つです。",
        analogy: "名詞の前に説明ラベルをペタッと貼るための接着剤が「的」です。",
        mnemonic: "修飾語 ＋ 的 ＋ 名詞で「〜の〜」！",
        how_to_use: [
          { step: 1, text: "修飾語（所有者や形容詞）を置きます。" },
          { step: 2, text: "「的（de）」を挟みます。" },
          { step: 3, text: "中心となる名詞を後ろに置きます。" }
        ],
        self_check: ["名詞が前に来ていませんか？必ず「的＋名詞」の順です。"],
        tips: ["2音節の形容詞（漂亮、干净など）が名詞を修飾するときは「的」がほぼ必須です。"],
        when_to_use: ["持ち物、属性、所属を説明するとき。"],
        when_not_to_use: ["単音節形容詞＋名詞（好人、大苹果）では「的」をつけないのが自然です。"],
        fatal_mistake: {
          wrong: "书我的。",
          correct: "我的书。",
          explanation: "中国語では所有者が必ず名詞の前に来ます。",
          why_learners_make_it: "他言語の語順に引きずられる誤用。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Structural Particle 的 (Possessive & Attributive)",
        quick_rule_3s: "Placed between a modifier and a noun. Equivalent to English \"'s\" or \"of\" (e.g., 我的 = my, 老师的 = teacher's).",
        contrastive_note: "Unlike English preposition 'of' where the head noun comes first ('book of mine'), Chinese always places the modifier BEFORE the noun (我的书).",
        analogy: "Like English apostrophe-s ('s): \"John's book\" = 约翰的书.",
        mnemonic: "Owner first, item second, joined by 的!",
        how_to_use: [
          { step: 1, text: "Place the possessor or adjective modifier first." },
          { step: 2, text: "Add 的." },
          { step: 3, text: "Place the head noun." }
        ],
        self_check: ["Did you place the modifier BEFORE the noun?"],
        tips: ["Close family members can omit 的: 我妈妈 (my mom)."],
        when_to_use: ["Expressing possession or describing noun attributes."],
        when_not_to_use: ["Single-syllable adjectives often omit 的 (好人, not 好的`人)."],
        fatal_mistake: {
          wrong: "Car my -> 车我的。",
          correct: "我的车。",
          explanation: "Modifier must precede the noun.",
          why_learners_make_it: "Inverting noun and possessor."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "这是 ___ 的 ___。",
      slots: [
        { vi: "Người sở hữu (Tôi, Thầy giáo, Bạn tôi)", ja: "所有者", en: "Possessor" },
        { vi: "Đồ vật (sách, bút, điện thoại)", ja: "物", en: "Item" }
      ],
      example_filled: "这是我的手机。"
    },
    collocations: [
      { zh: "我的", pinyin: "wǒ de", meaning: { vi: "của tôi", ja: "私の", en: "mine / my" } },
      { zh: "老师的", pinyin: "lǎoshī de", meaning: { vi: "của giáo viên", ja: "先生の", en: "teacher's" } },
      { zh: "漂亮的花", pinyin: "piàoliang de huā", meaning: { vi: "bông hoa đẹp", ja: "綺麗な花", en: "beautiful flower" } }
    ],
    examples: [
      {
        zh: "这是我的中文书。",
        pinyin: "zhè shì wǒ de Zhōngwén shū",
        tokens: [
          { hanzi: "这是", pinyin: "zhè shì", han_viet: "giá thị", ja_kanji: "これは", false_friend_ja: null, gloss: { vi: "đây là", ja: "これは〜です", en: "this is" }, block_role: "modifier" },
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", false_friend_ja: null, gloss: { vi: "tôi", ja: "私", en: "my" }, block_role: "modifier" },
          { hanzi: "的", pinyin: "de", han_viet: "đích", ja_kanji: "の", false_friend_ja: null, gloss: { vi: "của", ja: "の", en: "'s" }, block_role: "particle" },
          { hanzi: "中文书", pinyin: "Zhōngwén shū", han_viet: "Trung văn thư", ja_kanji: "中国語の本", false_friend_ja: null, gloss: { vi: "sách tiếng Trung", ja: "中国語の本", en: "Chinese book" }, block_role: "noun" }
        ],
        scenario: { vi: "Chỉ sách của mình", ja: "持ち物の提示", en: "Pointing to one's own book" },
        translations: { vi: "Đây là sách tiếng Trung của tôi.", ja: "これは私の中国語の本です。", en: "This is my Chinese book." },
        literal_en: "This is I DE Chinese book.",
        tone_tip: { vi: "de là thanh nhẹ đọc nhanh nhẹ.", ja: "「的」は軽声。", en: "de is neutral tone." },
        word_order_diff: { vi: "我的 đứng trước 中文书 (ngược với tiếng Việt: sách của tôi).", ja: "日本語「私の本」と同じ順序。", en: "Possessor precedes noun." },
        note: { vi: "Đây là cấu trúc định ngữ phổ biến nhất trong tiếng Trung.", ja: "最重要文法の一つ。", en: "Core attributive construction." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi chủ nhân của chiếc điện thoại", ja: "スマホの持ち主を尋ねる", en: "Asking whose phone this is" },
      lines: [
        { speaker: "A", zh: "这是谁的手机？", pinyin: "Zhè shì shéi de shǒujī?", tr: { vi: "Đây là điện thoại của ai?", ja: "これは誰のスマホですか？", en: "Whose phone is this?" } },
        { speaker: "B", zh: "是小王的手機。", pinyin: "Shì Xiǎo Wáng de shǒujī.", tr: { vi: "Là điện thoại của Tiểu Vương.", ja: "王さんのスマホです。", en: "It is Xiao Wang's phone." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["的", "手机", "这是", "我"], correct_order: ["这是", "我", "的", "手机"] }
    ],
    fill_blank: [
      {
        sentence: "那辆蓝色的汽车是老师 ___ 。",
        options: ["的", "得", "地", "吗"],
        answer_index: 0,
        trap_for: ["vi", "ja"],
        explanation: { vi: "Biểu thị quyền sở hữu (của thầy giáo) dùng trợ từ 的.", ja: "所有を表すので「的」が正解です。", en: "Attributive possession requires 的." }
      }
    ],
    error_correction: [
      {
        wrong: "这是电脑他。",
        correct: "这是他的电脑。",
        hint: { vi: "Người sở hữu đứng trước hay danh từ đứng trước?", ja: "所有者は名詞の前と後ろ、どちらですか？", en: "Where does the possessor go relative to the noun?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Cụm từ nào dịch đúng cho 'sách của bạn tôi'?", ja: "「私の友達の本」の正しい中国語は？", en: "How do you translate 'my friend's book'?" },
        options: ["书的我朋友", "我朋友的书", "朋友我的书", "书我的朋友"],
        answer_index: 1,
        trap_for: ["vi", "en"],
        explanation: { vi: "Sở hữu đứng trước danh từ chính: 我朋友 (bạn tôi) + 的 + 书 (sách).", ja: "我朋友（私の友達）＋的＋书（本）となります。", en: "Modifier precedes head noun: 我朋友的书." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Định ngữ + 的 + Danh từ chính: Người sở hữu luôn đứng TRƯỚC đồ vật!", ja: "修飾語 ＋ 的 ＋ 名詞：所有者は常に名詞の前に置く！", en: "Modifier + 的 + Noun: Possessor strictly precedes the noun!" },
      remember: [
        { vi: "Của ai thì đặt người đó lên trước chữ 的 (Ví dụ: 我的 = của tôi).", ja: "所有者は「的」の前に置く。", en: "Place owner before 的." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 7. hsk2_guo_experiential_aspect
  {
    id: "hsk2_guo_experiential_aspect",
    level: "HSK2",
    level_num: 2,
    category: "aspect",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["过", "guo", "trợ từ động thái quá", "đã từng", "experiential aspect", "ever", "have done"],
    formula: "S + V + 过 (+ O)  |  Phủ định: S + 没 / 没有 + V + 过",
    formula_plain: {
      vi: "Chủ ngữ + từng làm (hoặc chưa từng làm) + việc gì đó",
      ja: "主語 ＋ 動詞 ＋ 过（〜したことがある） ｜ 否定：没＋動詞＋过",
      en: "Subject + Verb + 过 (have ever experienced) | Negation: 没有 + Verb + 过"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ (S)", ja: "主語 (S)", en: "Subject (S)" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ (V)", ja: "動詞 (V)", en: "Verb (V)" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ trải nghiệm (过)", ja: "経験助詞（过）", en: "Experiential particle (过)" }, role: "aspect", color: "#8B5CF6" },
      { label: { vi: "Tân ngữ (O)", ja: "目的語 (O)", en: "Object (O)" }, role: "object", color: "#F59E0B" }
    ],
    related_ids: ["hsk2_le_completion_aspect", "hsk2_zhe_durative_aspect"],
    confusable_with: [
      {
        id: "hsk2_le_completion_aspect",
        diff: {
          vi: "了 nhấn mạnh hành động vừa hoàn thành xong (Tôi vừa ăn cơm xong: 我吃了饭). 过 nhấn mạnh trải nghiệm từng làm trong quá khứ (Tôi từng ăn vịt quay Bắc Kinh: 我吃过北京烤鸭).",
          ja: "「了」は直近の動作完了を表し、「过」は過去にそのような経験をしたことがあるかを表します。",
          en: "了 emphasizes that an action is finished. 过 emphasizes having past life experience ('have ever')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Trợ từ động thái 过 (Trải nghiệm đã từng)",
        quick_rule_3s: "Đặt 过 (quá = qua, từng qua) ngay sau động từ để nói về việc bạn 'đã từng' làm. Phủ định dùng '没 + V + 过' (chưa từng làm).",
        contrastive_note: "Tương đương từ 'từng / đã từng' trong tiếng Việt: 去过 (từng đi), 吃过 (từng ăn), 看过 (từng xem). Khi phủ định 'chưa từng' thì dùng 没 (hoặc 没有), chữ 过 vẫn GIỮ NGUYÊN (khác với chữ 了 bị bỏ đi).",
        analogy: "Coi chữ 过 như con dấu visa đóng vào hộ chiếu trải nghiệm cuộc đời bạn.",
        mnemonic: "Từng làm gắn chữ 过 (guo); chưa từng thêm chữ 没 (méi) ở đầu!",
        how_to_use: [
          { step: 1, text: "Đặt chủ ngữ." },
          { step: 2, text: "Đặt động từ hành động + 过 (V + 过)." },
          { step: 3, text: "Đặt tân ngữ và số lần (nếu có): 我去过中国两次." }
        ],
        self_check: [
          "Phủ định của V+过 là '没+V+过', chữ 过 KHÔNG bị xóa như chữ 了.",
          "Câu hỏi trải nghiệm thường dùng: 'V+过...吗？' hoặc 'V+过...没有？'."
        ],
        tips: ["Hỏi: 你吃过北京烤鸭吗？ Trả lời: 吃过 (Từng ăn rồi) hoặc 没吃过 (Chưa từng ăn)."],
        when_to_use: ["Nói về du lịch, thử món ăn, đọc sách, xem phim, kinh nghiệm cuộc sống."],
        when_not_to_use: ["Không dùng 过 cho hành động chỉ xảy ra một lần duy nhất theo quy luật tự nhiên (như sinh ra, chết đi)."],
        fatal_mistake: {
          wrong: "我不去过中国。",
          correct: "我没去过中国。",
          explanation: "Phủ định của trải nghiệm 过 bắt buộc dùng 没 (hoặc 没有), không dùng 不.",
          why_learners_make_it: "Nhầm lẫn giữa phó từ phủ định 不 và 没."
        },
        extra_mistakes: []
      },
      ja: {
        title: "動態助詞「过」（経験：〜したことがある）",
        quick_rule_3s: "「動詞＋过」で「〜したことがある」という過去の経験を表します。否定は「没＋動詞＋过」で、「过」は残ります。",
        contrastive_note: "日本語の「〜したことがある」と完全に対応します。否定形「〜したことがない」も「没＋動詞＋过」で自然に表現できます。",
        analogy: "人生のパスポートに押される「経験スタンプ」が「过」です。",
        mnemonic: "経験は動詞＋过！否定は没＋動詞＋过！",
        how_to_use: [
          { step: 1, text: "動詞を置きます。" },
          { step: 2, text: "直後に「过（guo）」を添えます。" },
          { step: 3, text: "目的語を続けます。" }
        ],
        self_check: ["否定に「没」を使っていますか？（「不」は不可）"],
        tips: ["「过」は軽声で軽く発音します。"],
        when_to_use: ["行ったことがある、食べたことがあるなど経験を語るとき。"],
        when_not_to_use: ["単に動作が終わったこと（完了）を言いたいときは「了」を使います。"],
        fatal_mistake: {
          wrong: "我不吃过烤鸭。",
          correct: "我没吃过烤鸭。",
          explanation: "経験の否定は「没」を用います。",
          why_learners_make_it: "否定副詞の使い分けミス。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Aspect Particle 过 (Past Experience)",
        quick_rule_3s: "Placed right after a verb to express having experienced an action in the past ('have ever done'). Negation is 没 + Verb + 过.",
        contrastive_note: "Equivalent to the English present perfect experience: 'Have you ever been to China?' = 你去过中国吗？ Note that 过 remains in the negative sentence (unlike 了).",
        analogy: "A passport entry stamp certifying you have experienced something at least once.",
        mnemonic: "Verb + 过 = Ever done! 没 + Verb + 过 = Never done!",
        how_to_use: [
          { step: 1, text: "Subject first." },
          { step: 2, text: "Verb + 过." },
          { step: 3, text: "Object / frequency phrase." }
        ],
        self_check: ["Remember that unlike 了, 过 is KEPT in negative sentences: 没去过."],
        tips: ["Answer 'Have you ever...?' with simply 去过 or 没去过."],
        when_to_use: ["Discussing travel, trying foods, watching movies, or life experiences."],
        when_not_to_use: ["Do not use 过 for actions that just finished minutes ago (use 了 instead)."],
        fatal_mistake: {
          wrong: "我没去中国过。(wrong order)",
          correct: "我没去过中国。",
          explanation: "过 must immediately attach to the verb, not at the end of the clause.",
          why_learners_make_it: "Misplacing the particle after the object."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "我 ___ 过 ___。",
      slots: [
        { vi: "Động từ (đi, ăn, xem, học)", ja: "動詞", en: "Verb" },
        { vi: "Đối tượng (Trung Quốc, vịt quay, phim này)", ja: "目的語", en: "Object" }
      ],
      example_filled: "我去过北京。"
    },
    collocations: [
      { zh: "去过", pinyin: "qù guo", meaning: { vi: "từng đi", ja: "行ったことがある", en: "have been to" } },
      { zh: "吃过", pinyin: "chī guo", meaning: { vi: "từng ăn", ja: "食べたことがある", en: "have eaten" } },
      { zh: "听过", pinyin: "tīng guo", meaning: { vi: "từng nghe", ja: "聞いたことがある", en: "have heard" } }
    ],
    examples: [
      {
        zh: "我去过中国两次。",
        pinyin: "wǒ qù guo Zhōngguó liǎng cì",
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", false_friend_ja: null, gloss: { vi: "tôi", ja: "私", en: "I" }, block_role: "subject" },
          { hanzi: "去", pinyin: "qù", han_viet: "khứ", ja_kanji: "行く", false_friend_ja: null, gloss: { vi: "đi", ja: "行く", en: "go" }, block_role: "verb" },
          { hanzi: "过", pinyin: "guo", han_viet: "quá", ja_kanji: "過", false_friend_ja: null, gloss: { vi: "từng", ja: "〜たことがある", en: "ever" }, block_role: "aspect" },
          { hanzi: "中国", pinyin: "Zhōngguó", han_viet: "Trung Quốc", ja_kanji: "中国", false_friend_ja: null, gloss: { vi: "Trung Quốc", ja: "中国", en: "China" }, block_role: "object" },
          { hanzi: "两次", pinyin: "liǎng cì", han_viet: "lưỡng thứ", ja_kanji: "2回", false_friend_ja: null, gloss: { vi: "hai lần", ja: "2回", en: "twice" }, block_role: "object" }
        ],
        scenario: { vi: "Kể về kinh nghiệm du lịch", ja: "旅行経験について", en: "Talking about travel experience" },
        translations: { vi: "Tôi từng đi Trung Quốc hai lần.", ja: "私は中国に2回行ったことがあります。", en: "I have been to China twice." },
        literal_en: "I go GUO China two times.",
        tone_tip: { vi: "guo đọc thanh nhẹ.", ja: "「过」は軽声。", en: "guo is neutral tone." },
        word_order_diff: { vi: "Số lần (động lượng) đứng sau tân ngữ nơi chốn.", ja: "「2回行った」＝「去过…两次」。", en: "Frequency phrase comes after location object." },
        note: { vi: "Biểu thị kinh nghiệm trong quá khứ.", ja: "過去の経験を表す基本表現。", en: "Standard experiential expression." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi về món ăn", ja: "料理の経験を聞く", en: "Asking if someone has eaten a dish" },
      lines: [
        { speaker: "A", zh: "你吃过四川菜吗？", pinyin: "Nǐ chī guo Sìchuān cài ma?", tr: { vi: "Bạn từng ăn món Tứ Xuyên chưa?", ja: "四川料理を食べたことがありますか？", en: "Have you ever eaten Sichuan food?" } },
        { speaker: "B", zh: "没吃过，听说很辣。", pinyin: "Méi chī guo, tīngshuō hěn là.", tr: { vi: "Chưa từng ăn, nghe nói rất cay.", ja: "食べたことがありません、とても辛いそうですね。", en: "Never eaten it, I heard it is very spicy." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["中国", "去过", "我", "两次"], correct_order: ["我", "去过", "中国", "两次"] }
    ],
    fill_blank: [
      {
        sentence: "这部电影我 ___ 看过，非常有意思。",
        options: ["以前", "明天", "正在", "不"],
        answer_index: 0,
        trap_for: ["en"],
        explanation: { vi: "看过 là đã từng xem (quá khứ), nên đi với phó từ thời gian 以前 (trước đây).", ja: "過去の経験なので「以前」と呼応します。", en: "Past experience coordinates naturally with 以前 (before)." }
      }
    ],
    error_correction: [
      {
        wrong: "我不去过北京。",
        correct: "我没去过北京。",
        hint: { vi: "Phủ định của 'từng làm' là 不 hay 没?", ja: "経験の否定は「不」と「没」のどちらですか？", en: "Is experiential negation 不 or 没?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Sự khác biệt giữa '我吃了饭' và '我吃过饭' là gì?", ja: "「吃了饭」と「吃过饭」の違いは？", en: "What is the difference between 吃了饭 and 吃过饭?" },
        options: [
          "Không có gì khác biệt.",
          "吃了饭 là vừa ăn xong (hoàn thành); 吃过饭 là đã từng ăn (trải nghiệm).",
          "吃过饭 là chưa ăn.",
          "吃了饭 là câu hỏi."
        ],
        answer_index: 1,
        trap_for: ["vi", "ja", "en"],
        explanation: { vi: "了 biểu thị hoàn thành hành động gần, còn 过 biểu thị trải nghiệm trong đời.", ja: "「了」は完了、「过」は過去の経験を表します。", en: "了 is completion; 过 is past life experience." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Đã từng: V + 过; chưa từng: 没 + V + 过!", ja: "経験は「動詞＋过」！未経験は「没＋動詞＋过」！", en: "Past experience is Verb + 过; never is 没 + Verb + 过!" },
      remember: [
        { vi: "Trong câu phủ định với 没, chữ 过 vẫn được giữ lại (không bị xóa như chữ 了).", ja: "否定「没」でも「过」は消えない。", en: "过 remains in negative sentences with 没." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 8. hsk2_zhe_durative_aspect
  {
    id: "hsk2_zhe_durative_aspect",
    level: "HSK2",
    level_num: 2,
    category: "aspect",
    difficulty: 2,
    frequency: 4,
    register: "neutral",
    keywords: ["着", "zhe", "trợ từ động thái trước", "đang duy trì", "durative aspect"],
    formula: "S + V + 着 (+ O)  |  Nơi chốn + V + 着 + Danh từ",
    formula_plain: {
      vi: "Chủ ngữ + Động từ + 着 (đang duy trì tư thế/trạng thái)",
      ja: "主語 ＋ 動詞 ＋ 着（状態の持続：〜している／〜してある）",
      en: "Subject + Verb + 着 (continuing state)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ / Nơi chốn", ja: "主語／場所", en: "Subject / Location" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ duy trì", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ trạng thái 着", ja: "持続助詞「着」", en: "Aspect particle 着" }, role: "aspect", color: "#EC4899" },
      { label: { vi: "Tân ngữ / Đồ vật", ja: "目的語・名詞", en: "Object / Noun" }, role: "object", color: "#F59E0B" }
    ],
    related_ids: ["hsk1_zai_progressive", "hsk2_le_completion_aspect"],
    confusable_with: [
      {
        id: "hsk1_zai_progressive",
        diff: {
          vi: "在 + V là hành động đang diễn ra sôi nổi (đang ăn, đang chạy). V + 着 là trạng thái tĩnh đang duy trì (cửa đang mở, đang mặc áo, đang đeo kính).",
          ja: "「在＋動詞」は動作の進行（走っている）を表し、「動詞＋着」は状態の持続（ドアが開いている、服を着ている）を表します。",
          en: "在 + Verb indicates an ongoing dynamic action. Verb + 着 indicates an ongoing resulting static state."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Trợ từ động thái 着 (Trạng thái duy trì)",
        quick_rule_3s: "Gắn chữ 着 (zhe) ngay sau động từ để miêu tả trạng thái đang được duy trì (cửa mở, đứng, ngồi, mặc áo, đeo kính) hoặc tư thế kèm theo một hành động khác.",
        contrastive_note: "Người Việt hay nhầm 着 với 'đang' (在). Ví dụ: 'Tôi đang mặc áo' có 2 nghĩa: hành động xỏ tay vào áo (在穿衣服) và chiếc áo đã mặc trên người rồi (穿着衣服). 着 chỉ trạng thái đã mặc trên người.",
        analogy: "Coi chữ 着 như chiếc nút giữ nguyên khung hình (Pause) trong một bộ phim.",
        mnemonic: "Duy trì trạng thái gắn ngay 着 (zhe); cửa mở, áo mặc, đứng kề bên nhau!",
        how_to_use: [
          { step: 1, text: "Chọn động từ chỉ tư thế hoặc trạng thái (开 mở, 穿 mặc, 戴 đeo, 拿 cầm, 坐 ngồi, 站 đứng)." },
          { step: 2, text: "Gắn chữ 着 ngay sau động từ (V + 着)." },
          { step: 3, text: "Cuối câu thường có trợ từ ngữ khí 呢: 门开着呢." }
        ],
        self_check: [
          "Đây là trạng thái duy trì tĩnh (V+着) hay hành động đang vận động mạnh (在+V)?",
          "Phủ định dùng 没 + V + 着 (Ví dụ: 门没开着)."
        ],
        tips: ["Cấu trúc V1 + 着 + V2: làm V2 trong tư thế V1 (Ví dụ: 笑着说 = cười nói, 站着吃 = đứng ăn)."],
        when_to_use: ["Mô tả trang phục ai đó đang mặc, đồ vật bài trí trên bàn/tường, hoặc tư thế."],
        when_not_to_use: ["Không dùng cho động từ tức thời không có trạng thái kéo dài (như 死, 断)."],
        fatal_mistake: {
          wrong: "门是在开着。",
          correct: "门开着呢。",
          explanation: "Không thêm 是 vào trước động từ khi dùng trợ từ 着 miêu tả trạng thái.",
          why_learners_make_it: "Thói quen dịch 'Cửa là đang mở'."
        },
        extra_mistakes: []
      },
      ja: {
        title: "動態助詞「着」（状態の持続）",
        quick_rule_3s: "「動詞＋着」で動作・状態の持続（〜している、〜してある）を表します。服装や姿勢、物の配置の描写によく使われます。",
        contrastive_note: "日本語の「〜ている」には進行（走っている＝在跑）と状態（メガネをかけている＝戴着眼镜）がありますが、後者に当たるのが「着」です。",
        analogy: "動画の一時停止ボタンを押して、その状態がキープされているイメージです。",
        mnemonic: "状態キープは動詞＋着！",
        how_to_use: [
          { step: 1, text: "状態を表す動詞（开、穿、戴、拿など）を置きます。" },
          { step: 2, text: "「着（zhe）」をつけます。" },
          { step: 3, text: "文末に「呢」を添えると生き生きとした口語になります。" }
        ],
        self_check: ["動作の進行（在＋動詞）と混同していませんか？"],
        tips: ["「動詞1＋着＋動詞2」で「〜しながら〜する」（例：笑着说 笑顔で話す）を表せます。"],
        when_to_use: ["服を着ている、メガネをかけている、ドアが開いている、机に置いてある等の描写。"],
        when_not_to_use: ["瞬間的な動作には使えません。"],
        fatal_mistake: {
          wrong: "他戴眼镜在。",
          correct: "他戴着眼镜。",
          explanation: "状態の持続は動詞の直後に「着」を置きます。",
          why_learners_make_it: "「在」の位置の誤り。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Aspect Particle 着 (Durative State)",
        quick_rule_3s: "Verb + 着 indicates that a state resulting from an action continues (e.g. door is open, wearing glasses, holding a book).",
        contrastive_note: "English uses '-ing' for both actions ('He is putting on a jacket') and states ('He is wearing a jacket'). Chinese strictly distinguishes 在 (action) and 着 (state).",
        analogy: "Like a pause button holding a frozen frame in place.",
        mnemonic: "Keep the state alive with Verb + 着!",
        how_to_use: [
          { step: 1, text: "Choose a posture/state verb (穿 wear, 拿 hold, 开 open, 坐 sit)." },
          { step: 2, text: "Add 着 directly to the verb." },
          { step: 3, text: "Optionally add 呢 at the end: 门开着呢。" }
        ],
        self_check: ["Are you describing a static continuous state? If yes, use 着."],
        tips: ["Pattern 'V1 + 着 + V2' means doing V2 in the manner/posture of V1 (e.g., 站着看 = read while standing)."],
        when_to_use: ["Describing clothing, room layout, or body postures."],
        when_not_to_use: ["Do not use for dynamic actions that don't produce a lasting posture."],
        fatal_mistake: {
          wrong: "门在开着。",
          correct: "门开着呢。",
          explanation: "Do not combine 在 and 着 in this manner for static door state.",
          why_learners_make_it: "Confusing ongoing action with ongoing state."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "桌子上 ___ 着 ___。",
      slots: [
        { vi: "Động từ (đặt, để 放, nằm 躺)", ja: "動詞（放、置くなど）", en: "Verb (place, put)" },
        { vi: "Đồ vật (máy tính, cốc trà, sách)", ja: "置かれている物", en: "Object item" }
      ],
      example_filled: "桌子上放着一台电脑。"
    },
    collocations: [
      { zh: "开着门", pinyin: "kāi zhe mén", meaning: { vi: "cửa đang mở", ja: "ドアが開いている", en: "door is open" } },
      { zh: "穿着衣服", pinyin: "chuān zhe yīfu", meaning: { vi: "đang mặc quần áo", ja: "服を着ている", en: "wearing clothes" } },
      { zh: "拿着手机", pinyin: "ná zhe shǒujī", meaning: { vi: "đang cầm điện thoại", ja: "スマホを持っている", en: "holding a phone" } }
    ],
    examples: [
      {
        zh: "门开着呢，请进来吧。",
        pinyin: "mén kāi zhe ne, qǐng jìn lai ba",
        tokens: [
          { hanzi: "门", pinyin: "mén", han_viet: "môn", ja_kanji: "門・ドア", false_friend_ja: null, gloss: { vi: "cửa", ja: "ドア", en: "door" }, block_role: "subject" },
          { hanzi: "开", pinyin: "kāi", han_viet: "khai", ja_kanji: "開く", false_friend_ja: null, gloss: { vi: "mở", ja: "開く", en: "open" }, block_role: "verb" },
          { hanzi: "着", pinyin: "zhe", han_viet: "trước", ja_kanji: "着", false_friend_ja: null, gloss: { vi: "đang", ja: "〜ている", en: "(durative)" }, block_role: "aspect" },
          { hanzi: "呢", pinyin: "ne", han_viet: "ni", ja_kanji: "ね", false_friend_ja: null, gloss: { vi: "đấy", ja: "〜よ", en: "modal ne" }, block_role: "aspect" },
          { hanzi: "请进来吧", pinyin: "qǐng jìn lai ba", han_viet: "thỉnh tiến lai ba", ja_kanji: "どうぞ入って", false_friend_ja: null, gloss: { vi: "mời vào đi", ja: "どうぞお入りください", en: "please come in" }, block_role: "object" }
        ],
        scenario: { vi: "Mời khách vào phòng", ja: "来客を部屋に招く", en: "Welcoming a guest into the room" },
        translations: { vi: "Cửa đang mở đấy, xin mời vào đi.", ja: "ドアが開いていますよ、どうぞお入りください。", en: "The door is open, please come on in." },
        literal_en: "Door open ZHE NE, please enter-come BA.",
        tone_tip: { vi: "zhe là thanh nhẹ đọc lướt.", ja: "「着」は軽声。", en: "zhe is neutral tone." },
        word_order_diff: { vi: "Động từ 开 + 着 biểu thị trạng thái mở sẵn.", ja: "開いた状態の持続。", en: "Static state of being open." },
        note: { vi: "开着 miêu tả trạng thái cửa mở.", ja: "「开着」＝開いている状態。", en: "开着 means in an open state." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi thăm người đang tìm kiếm", ja: "探している人の特徴を聞く", en: "Identifying a person in the crowd" },
      lines: [
        { speaker: "A", zh: "哪位是你的汉语老师？", pinyin: "Nǎ wèi shì nǐ de Hànyǔ lǎoshī?", tr: { vi: "Vị nào là giáo viên tiếng Trung của bạn?", ja: "どなたがあなたの中国語の先生ですか？", en: "Which one is your Chinese teacher?" } },
        { speaker: "B", zh: "戴着眼镜、穿着红衣服的那位。", pinyin: "Dài zhe yǎnjìng, chuān zhe hóng yīfu de nà wèi.", tr: { vi: "Vị đang đeo kính, mặc áo màu đỏ kia kìa.", ja: "メガネをかけて、赤い服を着ているあの方です。", en: "The one wearing glasses and a red jacket." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["电脑", "放着", "桌子上", "一台"], correct_order: ["桌子上", "放着", "一台", "电脑"] }
    ],
    fill_blank: [
      {
        sentence: "外面太冷了，他穿 ___ 一件厚大衣。",
        options: ["着", "了", "过", "在"],
        answer_index: 0,
        trap_for: ["vi", "en"],
        explanation: { vi: "Miêu tả trang phục đang mặc duy trì trên người dùng 着 (穿着).", ja: "服を着ている状態を表すので「着」が正解です。", en: "Wearing clothing as a continuous state requires 着." }
      }
    ],
    error_correction: [
      {
        wrong: "窗户在开着。",
        correct: "窗户开着呢。",
        hint: { vi: "Miêu tả trạng thái tĩnh của cửa sổ thì có cần chữ 在 không?", ja: "窓が開いている静止状態の描写に「在」は必要ですか？", en: "Is 在 needed when describing static durative state with 着?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Câu '他手里拿着一本书' miêu tả điều gì?", ja: "「他手里拿着一本书」は何を表していますか？", en: "What does '他手里拿着一本书' describe?" },
        options: [
          "Anh ấy vừa mua sách xong.",
          "Trong tay anh ấy đang cầm một cuốn sách (trạng thái duy trì).",
          "Anh ấy chưa đọc sách bao giờ.",
          "Anh ấy sẽ đi mua sách."
        ],
        answer_index: 1,
        trap_for: ["vi"],
        explanation: { vi: "拿 + 着 miêu tả trạng thái tay đang cầm giữ cuốn sách.", ja: "手に持っている状態の持続を表します。", en: "拿 + 着 expresses holding a book in the hand." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Duy trì trạng thái (mặc áo, đeo kính, cửa mở): V + 着!", ja: "状態キープ（服を着ている、ドアが開いている）：動詞＋着！", en: "Durative state (wearing, open, holding): Verb + 着!" },
      remember: [
        { vi: "Phân biệt 在 (đang vận động) và 着 (duy trì trạng thái tĩnh).", ja: "「在」（進行）と「着」（状態持続）の区別が肝心。", en: "Distinguish 在 (ongoing dynamic action) from 着 (static state)." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 9. hsk2_yinwei_suoyi
  {
    id: "hsk2_yinwei_suoyi",
    level: "HSK2",
    level_num: 2,
    category: "conjunction",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["因为", "所以", "yīnwèi", "suǒyǐ", "bởi vì cho nên", "câu ghép nhân quả", "because so"],
    formula: "因为 + Vế nguyên nhân，所以 + Vế kết quả",
    formula_plain: {
      vi: "Bởi vì (nguyên nhân), cho nên (kết quả)",
      ja: "因为〜、所以〜（〜だから、〜だ）",
      en: "因为 (because) [cause], 所以 (therefore) [result]"
    },
    structure_blocks: [
      { label: { vi: "Liên từ Bởi vì (因为)", ja: "原因の接続詞「因为」", en: "Conjunction 因为 (because)" }, role: "conj_cause", color: "#3B82F6" },
      { label: { vi: "Vế nguyên nhân", ja: "原因節", en: "Cause clause" }, role: "cause", color: "#60A5FA" },
      { label: { vi: "Liên từ Cho nên (所以)", ja: "結果の接続詞「所以」", en: "Conjunction 所以 (therefore)" }, role: "conj_result", color: "#EF4444" },
      { label: { vi: "Vế kết quả", ja: "結果節", en: "Result clause" }, role: "result", color: "#F87171" }
    ],
    related_ids: ["hsk2_suiran_danshi", "hsk5_zhi_suo_yi_shi_yin_wei"],
    confusable_with: [
      {
        id: "hsk5_zhi_suo_yi_shi_yin_wei",
        diff: {
          vi: "因为...所以... là trật tự xuôi: Nguyên nhân trước, Kết quả sau. Cấu trúc HSK5 之所以...是因为... là đảo ngược: Kết quả trước, Nguyên nhân sau (Sở dĩ... là vì...).",
          ja: "「因为…所以…」は原因→結果の順。「之所以…是因为…」は結果→原因の順（〜なのは〜だからだ）です。",
          en: "因为...所以... is standard cause-first order. 之所以...是因为... inverts to state result before cause."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 因为……所以…… (Bởi vì… cho nên…)",
        quick_rule_3s: "Cặp liên từ nhân quả kinh điển: vế 1 đưa ra lý do (因为...), vế 2 đưa ra kết quả phát sinh (所以...). Trong tiếng Trung thường đi thành cặp đầy đủ.",
        contrastive_note: "Trong ngữ pháp tiếng Anh, cấm kỵ dùng cả 'Because' và 'So' trong cùng một câu (chỉ được chọn 1). Nhưng trong tiếng Trung và tiếng Việt, dùng đồng thời cả cặp '因为... 所以...' là chuẩn mực và tự nhiên nhất.",
        analogy: "Coi 因为 là hạt mầm gieo xuống đất, còn 所以 là cái cây kết quả mọc lên.",
        mnemonic: "Vì có 因为 làm nguyên nhân; sinh ra 所以 dẫn đường kết quả!",
        how_to_use: [
          { step: 1, text: "Bắt đầu vế thứ nhất với 因为 + lý do (Ví dụ: 因为今天下雨)." },
          { step: 2, text: "Đặt dấu phẩy (,)." },
          { step: 3, text: "Bắt đầu vế thứ hai với 所以 + kết quả (Ví dụ: 所以我们不去公园)." }
        ],
        self_check: [
          "Có dùng đúng cặp 因为 và 所以 không? Không ghép nhầm với 但是 (nhưng).",
          "Trong khẩu ngữ thân mật có thể lược bỏ một trong hai từ, nhưng dùng đủ cả cặp vẫn chuẩn nhất."
        ],
        tips: ["Khi trả lời câu hỏi '为什么？' (Tại sao?), chỉ cần bắt đầu bằng '因为...'."],
        when_to_use: ["Giải thích lý do đi muộn, nghỉ học, từ chối lời mời hoặc phân tích nguyên nhân."],
        when_not_to_use: ["Không dùng 因为 ghép với liên từ chuyển ngoặt 但是."],
        fatal_mistake: {
          wrong: "因为他生病，但是不来。(ghép nhầm với 但是)",
          correct: "因为他生病，所以没来。",
          explanation: "Vì bị ốm dẫn đến kết quả không đến là quan hệ nhân quả, phải dùng 所以, không dùng 但是.",
          why_learners_make_it: "Lẫn lộn giữa câu ghép nhân quả và câu ghép chuyển ngoặt."
        },
        extra_mistakes: []
      },
      ja: {
        title: "「因为…所以…」（原因・結果の複文：〜だから、〜）",
        quick_rule_3s: "「因为＋原因、所以＋結果」で因果関係を表す最重要接続詞です。英語と異なり、両方をセットで使います。",
        contrastive_note: "英語では Because と So を併用できませんが、中国語では「因为…所以…」と両方揃えて使うのが一般的で自然です。",
        analogy: "「因为（原因）」というタネをまき、「所以（結果）」という実を収穫する構図です。",
        mnemonic: "原因は因为、結果は所以！セットで覚える！",
        how_to_use: [
          { step: 1, text: "「因为」＋原因節を置きます。" },
          { step: 2, text: "カンマを挟みます。" },
          { step: 3, text: "「所以」＋結果節を置きます。" }
        ],
        self_check: ["「但是（しかし）」と混ざっていませんか？"],
        tips: ["「为什么？」と理由を尋ねられたら、「因为…」から答えます。"],
        when_to_use: ["遅刻や欠席の理由、行動の動機を説明するとき。"],
        when_not_to_use: ["逆接の文には使えません。"],
        fatal_mistake: {
          wrong: "因为下雨，但是我带伞。",
          correct: "因为下雨，所以我带了伞。",
          explanation: "因果関係なので「但是」ではなく「所以」を使います。",
          why_learners_make_it: "接続詞の取り違え。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Causal Complex Sentence 因为…所以… (Because… So…)",
        quick_rule_3s: "Pattern: 因为 [cause], 所以 [result]. Unlike English which forbids 'because... so...' together, Chinese prefers using both paired together.",
        contrastive_note: "English grammar rule: Never use 'Because' and 'So' in the same sentence. Chinese rule: Using 因为 and 所以 together is the standard and most natural form!",
        analogy: "Two matching bookends: 因为 introduces the cause, 所以 produces the consequence.",
        mnemonic: "Because (因为) planted the seed, Therefore (所以) reaped the fruit!",
        how_to_use: [
          { step: 1, text: "Begin clause 1 with 因为 + reason." },
          { step: 2, text: "Add comma." },
          { step: 3, text: "Begin clause 2 with 所以 + consequence." }
        ],
        self_check: ["Did you pair 因为 with 所以?"],
        tips: ["Answer '为什么？' (Why?) directly with '因为...'."],
        when_to_use: ["Explaining reasons for absence, lateness, decisions, and logical outcomes."],
        when_not_to_use: ["Do not mix 因为 with contrastive connectives like 但是."],
        fatal_mistake: {
          wrong: "Because he is ill, but didn't come -> 因为他生病，但是不来。",
          correct: "因为他生病，所以没来。",
          explanation: "Illness causing absence is a causal relationship, requiring 所以, not 但是.",
          why_learners_make_it: "Confusing contrastive with causal conjunctions."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "因为 ___ ，所以 ___ 。",
      slots: [
        { vi: "Nguyên nhân (hôm nay trời mưa, anh ấy bị ốm)", ja: "原因", en: "Cause" },
        { vi: "Kết quả (tôi không đi chơi, không đến lớp)", ja: "結果", en: "Result" }
      ],
      example_filled: "因为今天下雨，所以我没出门。"
    },
    collocations: [
      { zh: "因为天气好", pinyin: "yīnwèi tiānqì hǎo", meaning: { vi: "vì thời tiết đẹp", ja: "天気が良いので", en: "because the weather is nice" } },
      { zh: "所以迟到了", pinyin: "suǒyǐ chídào le", meaning: { vi: "cho nên đã đến muộn", ja: "だから遅刻した", en: "therefore arrived late" } }
    ],
    examples: [
      {
        zh: "因为他生病了，所以今天没来上学。",
        pinyin: "yīnwèi tā shēngbìng le, suǒyǐ jīntiān méi lái shàngxué",
        tokens: [
          { hanzi: "因为", pinyin: "yīnwèi", han_viet: "nhân vi", ja_kanji: "だから", false_friend_ja: null, gloss: { vi: "bởi vì", ja: "〜ので", en: "because" }, block_role: "conj_cause" },
          { hanzi: "他生病了", pinyin: "tā shēngbìng le", han_viet: "tha sinh bệnh liễu", ja_kanji: "彼が病気になった", false_friend_ja: null, gloss: { vi: "anh ấy bị ốm", ja: "彼が病気になった", en: "he got sick" }, block_role: "cause" },
          { hanzi: "所以", pinyin: "suǒyǐ", han_viet: "sở dĩ", ja_kanji: "だから", false_friend_ja: null, gloss: { vi: "cho nên", ja: "だから", en: "therefore" }, block_role: "conj_result" },
          { hanzi: "今天没来上学", pinyin: "jīntiān méi lái shàngxué", han_viet: "kim thiên một lai thượng học", ja_kanji: "今日学校に来なかった", false_friend_ja: null, gloss: { vi: "hôm nay không đến trường", ja: "今日登校しなかった", en: "didn't come to school today" }, block_role: "result" }
        ],
        scenario: { vi: "Báo lý do nghỉ học", ja: "欠席理由の連絡", en: "Explaining absence from school" },
        translations: { vi: "Vì anh ấy bị ốm nên hôm nay không đến trường.", ja: "彼は病気になったので、今日学校に来ませんでした。", en: "Because he got sick, he didn't come to school today." },
        literal_en: "Because he sick LE, therefore today not come go-to-school.",
        tone_tip: { vi: "yīnwèi: yīn thanh 1, wèi thanh 4.", ja: "「因为」第1声＋第4声。", en: "yīnwèi is 1st + 4th tone." },
        word_order_diff: { vi: "Cả tiếng Việt và tiếng Trung đều dùng cặp đôi vì... nên...", ja: "日本語の「〜ので、〜」に対応。", en: "Both paired together." },
        note: { vi: "Phổ biến bậc nhất trong các kỳ thi HSK.", ja: "HSK頻出接続詞。", en: "Top frequency conjunction in HSK." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi lý do muộn giờ", ja: "遅刻の理由を尋ねる", en: "Asking why someone was late" },
      lines: [
        { speaker: "A", zh: "你怎么迟到了？", pinyin: "Nǐ zěnme chídào le?", tr: { vi: "Sao bạn lại đến muộn thế?", ja: "どうして遅刻したの？", en: "Why are you late?" } },
        { speaker: "B", zh: "因为路上堵车，所以来晚了。", pinyin: "Yīnwèi lùshang dǔchē, suǒyǐ lái wǎn le.", tr: { vi: "Vì trên đường tắc đường, nên tôi đến muộn.", ja: "道が渋滞していたので、遅くなりました。", en: "Because there was a traffic jam, so I arrived late." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["所以", "没去", "下雨", "因为", "我"], correct_order: ["因为", "下雨", "所以", "我", "没去"] }
    ],
    fill_blank: [
      {
        sentence: "___ 他汉语说得很好，___ 找到了好工作。",
        options: ["因为……所以……", "虽然……但是……", "越……越……", "除了……以外……"],
        answer_index: 0,
        trap_for: ["vi"],
        explanation: { vi: "Nói tiếng Trung tốt dẫn đến kết quả tìm được việc tốt là quan hệ nhân quả, dùng 因为...所以...", ja: "原因と結果の関係なので「因为…所以…」が適切です。", en: "Cause and effect relationship requires 因为…所以…." }
      }
    ],
    error_correction: [
      {
        wrong: "因为今天很冷，但是我多穿衣服。(nhầm lẫn với 但是)",
        correct: "因为今天很冷，所以多穿衣服。",
        hint: { vi: "Trời lạnh nên mặc thêm áo là kết quả hợp lý, nên dùng 所以 hay 但是?", ja: "寒いから服を多く着るのは順接（結果）ですか？逆接ですか？", en: "Is wearing extra clothes a consequence or a contrast?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Khi ai đó hỏi '你为什么学中文？', bạn nên bắt đầu câu trả lời bằng từ nào?", ja: "「你为什么学中文？」と聞かれたら、文頭に置くべき言葉は？", en: "When asked '你为什么学中文？', what word should start your answer?" },
        options: ["虽然", "但是", "因为", "所以"],
        answer_index: 2,
        trap_for: ["vi", "ja", "en"],
        explanation: { vi: "Trả lời cho câu hỏi lý do 为什么 luôn bắt đầu bằng 因为 (bởi vì).", ja: "「为什么」に対する回答は「因为」から始めます。", en: "Answers to 为什么 (why) begin with 因为 (because)." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Cặp đôi nhân quả: 因为 (Nguyên nhân)，所以 (Kết quả)!", ja: "因果関係の王道：因为（原因）、所以（結果）！", en: "Causal powerhouse: 因为 (cause), 所以 (result)!" },
      remember: [
        { vi: "Tiếng Trung dùng cả 2 từ cùng lúc (không bị kiêng như tiếng Anh).", ja: "英語と違い「因为」と「所以」は両方セットで使える。", en: "Unlike English, using both together in one sentence is preferred." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 10. hsk3_yue_lai_yue_yue_yue
  {
    id: "hsk3_yue_lai_yue_yue_yue",
    level: "HSK3",
    level_num: 3,
    category: "comparison",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["越来越", "越...越...", "yuè lái yuè", "yuè yuè", "càng ngày càng", "càng... càng...", "the more the more"],
    formula: "S + 越来越 + Adj/Động từ tâm lý  |  越 A 越 B",
    formula_plain: {
      vi: "Chủ ngữ + càng ngày càng (tính chất)  |  Càng (A) thì lại càng (B)",
      ja: "主語 ＋ 越来越＋形容詞（だんだん〜になる） ｜ 越A越B（AすればするほどB）",
      en: "Subject + 越来越 + Adj (more and more) | 越 A 越 B (the more A, the more B)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ (S)", ja: "主語 (S)", en: "Subject (S)" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Từ chỉ tăng tiến (越来越 / 越...越...)", ja: "漸進マーカー「越来越」", en: "Progressive marker" }, role: "progressive", color: "#EC4899" },
      { label: { vi: "Vị ngữ (Tính từ / Động từ)", ja: "述語（形容詞・動詞）", en: "Predicate (Adj / Verb)" }, role: "predicate", color: "#10B981" }
    ],
    related_ids: ["hsk2_bi_comparison", "hsk3_gen_yi_yang_comparison"],
    confusable_with: [
      {
        id: "hsk2_bi_comparison",
        diff: {
          vi: "Câu chữ 比 là so sánh 2 đối tượng khác nhau (A比B cao). Còn 越来越 là tự so sánh cùng 1 đối tượng theo dòng thời gian (càng ngày càng cao).",
          ja: "「比」は2つの対象の比較（AはBより〜）。「越来越」は同一対象の時間経過による変化（だんだん〜になる）です。",
          en: "比 compares two separate entities (A vs B). 越来越 shows internal progression of the same subject over time."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 越来越… và 越A越B (Càng ngày càng… / Càng… càng…)",
        quick_rule_3s: "1) S + 越来越 + Tính từ: Càng ngày càng (ví dụ: 越来越好). 2) 越 A 越 B: Càng A thì càng B (ví dụ: 越快越好 - càng nhanh càng tốt). Sau 越来越 TUYỆT ĐỐI KHÔNG thêm 很, 非常, 太.",
        contrastive_note: "Người học tiếng Trung hay mắc lỗi thêm '很' sau 越来越 (như '越来越很好' ❌). Bản thân chữ 越来越 đã mang hàm nghĩa mức độ tăng tiến cực đại, nên không được chèn phó từ mức độ khác vào.",
        analogy: "Như chiếc cầu thang cuốn không ngừng đi lên: mỗi bậc thời gian trôi qua thì mức độ lại cao thêm một nấc.",
        mnemonic: "Càng ngày càng tốt: 越来越好; cấm thêm chữ 很 kẻo câu bị thừa!",
        how_to_use: [
          { step: 1, text: "Xác định chủ ngữ (thời tiết, tiếng Trung, cô ấy)." },
          { step: 2, text: "Thêm 越来越 (yuè lái yuè)." },
          { step: 3, text: "Thêm tính từ trực tiếp (冷, 热, 漂亮, 难), KHÔNG thêm 很!" }
        ],
        self_check: [
          "Sau 越来越 có lỡ tay thêm chữ 很, 非常 hay 太 không? Nếu có hãy xóa ngay!",
          "Cấu trúc 越A越B: A thường là động từ hoặc điều kiện, B là kết quả mức độ (越看越喜欢)."
        ],
        tips: ["Cuối câu dùng 越来越 thường đi kèm trợ từ 了 để biểu thị sự biến đổi: 天气越来越冷了."],
        when_to_use: ["Mô tả sự phát triển, thời tiết chuyển mùa, trình độ ngoại ngữ tiến bộ."],
        when_not_to_use: ["Không dùng kèm các phó từ mức độ khác (很, 非常, 十分, 太)."],
        fatal_mistake: {
          wrong: "他的汉语越来越很好。(thừa 很)",
          correct: "他的汉语越来越好。",
          explanation: "Sau 越来越 không bao giờ đi kèm phó từ chỉ mức độ như 很, 非常.",
          why_learners_make_it: "Thói quen luôn miệng ghép '很' trước tính từ."
        },
        extra_mistakes: []
      },
      ja: {
        title: "「越来越…」と「越A越B」（だんだん…／AすればするほどB）",
        quick_rule_3s: "時間とともに程度が深まる「越来越＋形容詞（だんだん〜になる）」と、比例して程度が増す「越A越B（AすればするほどB）」。後ろに「很」をつけてはいけません。",
        contrastive_note: "日本語の「だんだん〜になる」「〜すればするほど〜」とピッタリ対応します。「越来越」の後に「很」をつけてしまう誤用が非常に多いので要注意です。",
        analogy: "エスカレーターのように自動的にレベルが上がっていくイメージ。",
        mnemonic: "越来越のうしろに很は絶対NG！",
        how_to_use: [
          { step: 1, text: "主語を置きます。" },
          { step: 2, text: "「越来越（yuè lái yuè）」を置きます。" },
          { step: 3, text: "形容詞を直接置きます（很は不要）。文末に「了」を添えます。" }
        ],
        self_check: ["「越来越很…」になっていませんか？「很」を消してください。"],
        tips: ["「越快越好（早ければ早いほど良い）」はビジネスでも超頻出フレーズです。"],
        when_to_use: ["気候の変化、上達具合、関心の高まりを表すとき。"],
        when_not_to_use: ["「很」「非常」などの程度副詞との併用。"],
        fatal_mistake: {
          wrong: "天气越来越很热。",
          correct: "天气越来越热了。",
          explanation: "「越来越」自体が程度を表すため、「很」との重複は文法違反です。",
          why_learners_make_it: "形容詞の前に無意識に「很」をつけてしまう癖。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Progressive Structures 越来越… & 越A越B",
        quick_rule_3s: "1) 越来越 + Adj: 'more and more' (e.g., 越来越冷). 2) 越 A 越 B: 'the more A, the more B' (e.g., 越快越好). NEVER use 很, 非常 after 越来越.",
        contrastive_note: "English 'more and more cold' does not allow 'more and more very cold'. Similarly, Chinese strictly forbids 很/非常 after 越来越.",
        analogy: "An upward sloping staircase: each step in time increases the degree automatically.",
        mnemonic: "越来越 + Pure Adjective: Never insert 很!",
        how_to_use: [
          { step: 1, text: "Subject first." },
          { step: 2, text: "Add 越来越." },
          { step: 3, text: "Add the bare adjective directly (often with sentence-final 了)." }
        ],
        self_check: ["Did you accidentally include 很 after 越来越? Delete it!"],
        tips: ["Common idiom: 越快越好 (the sooner the better)."],
        when_to_use: ["Describing continuous changes in weather, skills, feelings, or qualities."],
        when_not_to_use: ["Never use degree adverbs (很, 非常) after 越来越."],
        fatal_mistake: {
          wrong: "Chinese is getting very difficult -> 汉语越来越很难。",
          correct: "汉语越来越难了。",
          explanation: "Never use 很 after 越来越.",
          why_learners_make_it: "Habitually inserting 很 before adjectives."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "天气越来越 ___ 了。",
      slots: [
        { vi: "Tính từ miêu tả (lạnh 冷, nóng 热, đẹp 晴朗)", ja: "形容詞", en: "Adjective" }
      ],
      example_filled: "天气越来越冷了。"
    },
    collocations: [
      { zh: "越来越好", pinyin: "yuè lái yuè hǎo", meaning: { vi: "càng ngày càng tốt", ja: "ますます良くなる", en: "better and better" } },
      { zh: "越来越快", pinyin: "yuè lái yuè kuài", meaning: { vi: "càng ngày càng nhanh", ja: "だんだん速くなる", en: "faster and faster" } },
      { zh: "越快越好", pinyin: "yuè kuài yuè hǎo", meaning: { vi: "càng nhanh càng tốt", ja: "早ければ早いほど良い", en: "the sooner the better" } }
    ],
    examples: [
      {
        zh: "天气越来越冷了。",
        pinyin: "tiānqì yuè lái yuè lěng le",
        tokens: [
          { hanzi: "天气", pinyin: "tiānqì", han_viet: "thiên khí", ja_kanji: "天気", false_friend_ja: null, gloss: { vi: "thời tiết", ja: "天気", en: "weather" }, block_role: "subject" },
          { hanzi: "越来越", pinyin: "yuè lái yuè", han_viet: "việt lai việt", ja_kanji: "だんだん", false_friend_ja: null, gloss: { vi: "càng ngày càng", ja: "ますます", en: "more and more" }, block_role: "progressive" },
          { hanzi: "冷", pinyin: "lěng", han_viet: "lãnh", ja_kanji: "冷たい・寒い", false_friend_ja: null, gloss: { vi: "lạnh", ja: "寒い", en: "cold" }, block_role: "predicate" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", false_friend_ja: null, gloss: { vi: "rồi", ja: "〜になった", en: "(change)" }, block_role: "predicate" }
        ],
        scenario: { vi: "Nói về thời tiết mùa đông", ja: "冬の気候について話す", en: "Discussing winter weather" },
        translations: { vi: "Thời tiết càng ngày càng lạnh rồi.", ja: "天気はだんだん寒くなってきました。", en: "The weather is getting colder and colder." },
        literal_en: "Weather more-and-more cold LE.",
        tone_tip: { vi: "yuè lái yuè: yuè thanh 4, lái thanh 2, yuè thanh 4.", ja: "「越来越」のリズム：第4声＋第2声＋第4声。", en: "yuè (4th) lái (2nd) yuè (4th)." },
        word_order_diff: { vi: "Tương tự tiếng Việt: càng ngày càng + tính từ.", ja: "「だんだん＋形容詞」と一致。", en: "Follows subject + 越来越 + bare adjective." },
        note: { vi: "Chữ 了 ở cuối biểu thị sự biến đổi trạng thái.", ja: "文末の「了」は変化を表す。", en: "Final 了 indicates change of state." }
      },
      {
        zh: "他的汉语越说越好。",
        pinyin: "tā de Hànyǔ yuè shuō yuè hǎo",
        tokens: [
          { hanzi: "他的汉语", pinyin: "tā de Hànyǔ", han_viet: "tha đích Hán ngữ", ja_kanji: "彼の中国語", false_friend_ja: null, gloss: { vi: "tiếng Trung của anh ấy", ja: "彼の中国語", en: "his Chinese" }, block_role: "subject" },
          { hanzi: "越说", pinyin: "yuè shuō", han_viet: "việt thuyết", ja_kanji: "話せば", false_friend_ja: null, gloss: { vi: "càng nói", ja: "話せば話すほど", en: "the more he speaks" }, block_role: "progressive" },
          { hanzi: "越好", pinyin: "yuè hǎo", han_viet: "việt hảo", ja_kanji: "上達する", false_friend_ja: null, gloss: { vi: "càng hay", ja: "上手になる", en: "the better it gets" }, block_role: "predicate" }
        ],
        scenario: { vi: "Khen ngợi bạn học ngoại ngữ", ja: "語学の上達を褒める", en: "Praising language progress" },
        translations: { vi: "Tiếng Trung của anh ấy càng nói càng hay.", ja: "彼の中国語は話せば話すほど上手になります。", en: "His Chinese gets better and better the more he speaks." },
        literal_en: "His Chinese more speak more good.",
        tone_tip: { vi: "yuè shuō yuè hǎo.", ja: "リズムに乗って発音。", en: "Clear progressive rhythm." },
        word_order_diff: { vi: "Cấu trúc 越 A 越 B tương đương 'càng A càng B'.", ja: "「越A越B」＝「AすればするほどB」。", en: "Parallel construction 'the more A, the more B'." },
        note: { vi: "Mẫu câu khen ngợi cực kỳ phổ biến.", ja: "褒め言葉の定番表現。", en: "Very natural praising pattern." }
      }
    ],
    dialogue: {
      goal: { vi: "Nói về sở thích học tiếng Trung", ja: "中国語学習の楽しさを語る", en: "Discussing enjoyment of Chinese learning" },
      lines: [
        { speaker: "A", zh: "你学汉语觉得难吗？", pinyin: "Nǐ xué Hànyǔ juéde nán ma?", tr: { vi: "Bạn học tiếng Trung thấy có khó không?", ja: "中国語を勉強していて難しく感じますか？", en: "Do you find learning Chinese difficult?" } },
        { speaker: "B", zh: "刚开始觉得难，现在越学越有意思。", pinyin: "Gāng kāishǐ juéde nán, xiànzài yuè xué yuè yǒu yìsi.", tr: { vi: "Mới đầu thấy khó, giờ càng học càng thấy thú vị.", ja: "最初は難しかったですが、今は勉強すればするほど面白いです。", en: "It was hard at first, but now the more I study the more interesting it gets." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["冷了", "天气", "越来越"], correct_order: ["天气", "越来越", "冷了"] },
      { scrambled_tokens: ["越好", "他的汉语", "越说"], correct_order: ["他的汉语", "越说", "越好"] }
    ],
    fill_blank: [
      {
        sentence: "这道题我 ___ 算 ___ 糊涂。",
        options: ["越……越……", "因为……所以……", "虽然……但是……", "除了……以外……"],
        answer_index: 0,
        trap_for: ["vi"],
        explanation: { vi: "Càng tính càng hồ đồ lú lẫn là quan hệ tăng tiến tương hỗ: 越...越...", ja: "「計算すればするほど分からなくなる」ので「越…越…」です。", en: "Proportional progression: 越…越…." }
      }
    ],
    error_correction: [
      {
        wrong: "他越来越很帅了。(thừa 很)",
        correct: "他越来越帅了。",
        hint: { vi: "Sau 越来越 có được dùng các từ chỉ mức độ như 很, 非常 không?", ja: "「越来越」の後に「很」は使えますか？", en: "Can degree adverbs like 很 follow 越来越?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Câu nào dưới đây đúng ngữ pháp tiếng Trung?", ja: "文法的に正しい中国語はどれですか？", en: "Which Chinese sentence is grammatically correct?" },
        options: ["这里的风景越来越很漂亮。", "这里的风景越来越漂亮。", "这里的风景很越来越漂亮。", "这里的风景漂亮越来越。"],
        answer_index: 1,
        trap_for: ["vi", "ja", "en"],
        explanation: { vi: "Sau 越来越 không được dùng 很; câu '这里的风景越来越漂亮' đúng ngữ pháp nhất.", ja: "「很」のない2番が文法的に正解です。", en: "Option 2 is correct; 越来越 cannot be followed by 很." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Tăng tiến: 越来越 + Tính từ (CẤM THÊM 很); Tương hỗ: 越 A 越 B!", ja: "漸進は「越来越＋形容詞（很は厳禁）」！相関は「越A越B」！", en: "Progressive: 越来越 + bare Adj (NO 很); Proportional: 越 A 越 B!" },
      remember: [
        { vi: "Không bao giờ chèn 很, 非常, 太 vào sau 越来越.", ja: "「越来越」の後に「很」を挟まない。", en: "Never insert 很 after 越来越." }
      ]
    },
    needs_review: false,
    review_note: ""
  }
];

const existingIds = new Set(currentSamples.map(x => x.id));
let addedCount = 0;

PART2_ITEMS.forEach(item => {
  if (!existingIds.has(item.id)) {
    currentSamples.push(item);
    existingIds.add(item.id);
    addedCount++;
    console.log(`  ➕ Added detailed grammar rule: ${item.id} (${item.formula})`);
  } else {
    console.log(`  ⚠️ Already exists: ${item.id}`);
  }
});

fs.writeFileSync(samplesJsonPath, JSON.stringify(currentSamples, null, 2), 'utf8');
console.log(`\n✅ Saved ${currentSamples.length} total samples into ${samplesJsonPath}`);

const jsBundleContent = `// js/data/grammar-data.js - HSK 2.0 & 3.0 Grammar Catalog & Detailed Rules
(function () {
  const catalog = ${JSON.stringify(catalog, null, 2)};

  const samples = ${JSON.stringify(currentSamples, null, 2)};

  if (typeof window !== 'undefined') {
    window.HSK_GRAMMAR_CATALOG = catalog;
    window.HSK_GRAMMAR_SAMPLES = samples;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      HSK_GRAMMAR_CATALOG: catalog,
      HSK_GRAMMAR_SAMPLES: samples
    };
  }
})();
`;

fs.writeFileSync(grammarDataJsPath, jsBundleContent, 'utf8');
console.log(`✅ Updated offline bundle in ${grammarDataJsPath}`);
console.log(`🎉 Expansion Part 2 completed: +${addedCount} rich lessons added! Total: ${currentSamples.length} lessons!`);

