#!/usr/bin/env node
/**
 * tools/generate-essential-grammar.js
 * 
 * Generates 10 high-frequency, essential HSK Grammar detail rules
 * strictly complying with GrammarDetailItem interface:
 *   1. hsk1_you_possession_existence (S + 有 / 没有 + O)
 *   2. hsk1_zai_existence_location (S + 在 + Nơi chốn + V)
 *   3. hsk1_ma_yes_no_question (Câu trần thuật + 吗？)
 *   4. hsk1_de_possessive_attributive (Định ngữ + 的 + Danh từ)
 *   5. hsk2_le_completion_aspect (S + V + 了)
 *   6. hsk2_guo_experiential_aspect (S + V + 过)
 *   7. hsk2_zhe_durative_aspect (S + V + 着)
 *   8. hsk2_yinwei_suoyi (因为……所以……)
 *   9. hsk3_bei_passive (S + 被 + Tác nhân + V + Thành phần khác)
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

console.log(`Current detailed grammar samples: ${currentSamples.length}`);

const NEW_GRAMMAR_ITEMS = [
  // 1. hsk1_you_possession_existence
  {
    id: "hsk1_you_possession_existence",
    level: "HSK1",
    level_num: 1,
    category: "sentence_pattern",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["有", "yǒu", "没有", "méiyǒu", "câu chữ hữu", "có", "have", "there is"],
    formula: "S + 有 / 没有 + O  hoặc  Nơi chốn + 有 / 没有 + Danh từ",
    formula_plain: {
      vi: "Chủ ngữ / Nơi chốn + có (hoặc không có) + Danh từ",
      ja: "主語／場所 ＋ 有（持っている・ある）／没有（ない） ＋ 名詞",
      en: "Subject / Place + 有 (have/exist) / 没有 (do not have) + Noun"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ / Nơi chốn", ja: "主語／場所", en: "Subject / Location" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ 有 / 没有", ja: "動詞 有／没有", en: "Verb 有 / 没有" }, role: "verb", color: "#10B981" },
      { label: { vi: "Tân ngữ (Vật / Người)", ja: "目的語（物・人）", en: "Object" }, role: "object", color: "#F59E0B" }
    ],
    related_ids: ["hsk1_shi_sentence", "hsk1_zai_existence_location"],
    confusable_with: [
      {
        id: "hsk1_shi_sentence",
        diff: {
          vi: "是 là quan hệ đồng nhất (A là B, ví dụ 我是老师). 有 là sở hữu hoặc tồn tại (tôi có đồ vật gì hoặc nơi nào có cái gì, ví dụ 我有书).",
          ja: "「是」は同一関係（A＝B、〜は〜です）を表し、「有」は所有や存在（持っている、〜がある）を表します。",
          en: "是 expresses equivalence (A = B), while 有 expresses possession (to have) or existential presence (there is/are)."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu chữ 有 (Sở hữu & Tồn tại)",
        quick_rule_3s: "Dùng 有 (hữu = có) để nói về việc sở hữu đồ vật/người thân hoặc sự tồn tại ở một địa điểm. Phủ định BẮT BUỘC dùng 没有, tuyệt đối không dùng 不有.",
        contrastive_note: "Trong tiếng Việt có thể nói 'không có', người học hay nhầm ghép phó từ 不 thành '不有'. Trong tiếng Trung ngữ pháp quy định độc quyền: chỉ dùng 没有 (méiyǒu).",
        analogy: "Hãy nhớ: chữ 有 có 'bạn thân duy nhất' khi phủ định là 没, không bao giờ chơi với 不.",
        mnemonic: "Có là 有 (yǒu), không có là 没有 (méiyǒu) — cấm kỵ chữ '不有'!",
        how_to_use: [
          { step: 1, text: "Xác định chủ thể sở hữu (tôi, anh ấy) hoặc nơi chốn (trên bàn, trong phòng)." },
          { step: 2, text: "Đặt 有 nếu có, đặt 没有 nếu không có." },
          { step: 3, text: "Đặt danh từ sự vật, con người hoặc số lượng từ ở phía sau." }
        ],
        self_check: [
          "Bạn đã dùng 没有 thay vì 不有 chưa?",
          "Sau chữ 有 có phải là một danh từ hoặc cụm số từ + lượng từ + danh từ không?"
        ],
        tips: [
          "Hỏi có... không: dùng '有...吗？' hoặc cấu trúc chính phản '有没有...？'.",
          "Khi đứng đầu câu chỉ nơi chốn: 桌子上有一本书 (Trên bàn có một cuốn sách)."
        ],
        when_to_use: ["Khi nói về đồ dùng, gia đình, thời gian rảnh hoặc sự vật ở một địa điểm."],
        when_not_to_use: ["Không dùng 有 để thay thế 是 (không nói '我有学生' để giới thiệu nghề nghiệp mà phải nói '我是学生')."],
        fatal_mistake: {
          wrong: "我不有中国朋友。",
          correct: "我没有中国朋友。",
          explanation: "Phủ định của 有 bắt buộc phải dùng 没 (没有), không được dùng 不.",
          why_learners_make_it: "Ảnh hưởng từ thói quen dịch từ 'không' trong tiếng Việt thành '不'."
        },
        extra_mistakes: []
      },
      ja: {
        title: "「有」構文（所有と存在）",
        quick_rule_3s: "所有（持っている）や存在（〜にある）を表す基本構文。否定は絶対に「没有」を使い、「不有」とは言いません。",
        contrastive_note: "日本語では人・動物には「いる」、物には「ある」と使い分けますが、中国語ではどちらも「有」一つで表現できます。",
        analogy: "「有」の否定は「没」とセット。英語の have の否定が don't have になるような固定ルールです。",
        mnemonic: "持ってる有（yǒu）、持ってない没有（méiyǒu）！",
        how_to_use: [
          { step: 1, text: "主語（人）または場所を文頭に置きます。" },
          { step: 2, text: "肯定なら「有」、否定なら「没有」を置きます。" },
          { step: 3, text: "目的語（名詞や数量詞）を後ろに続けます。" }
        ],
        self_check: ["否定に「没有」を使っていますか？「不有」になっていませんか？"],
        tips: ["反復疑問文は「有没有〜？」を使います。"],
        when_to_use: ["家族構成、持ち物、時間の有無、場所の存在を説明するとき。"],
        when_not_to_use: ["自己紹介（私は学生です）に「有」は使えません。「是」を使います。"],
        fatal_mistake: {
          wrong: "我不有自行车。",
          correct: "我没有自行车。",
          explanation: "「有」の否定副詞は「没」のみです。「不有」という表現は存在しません。",
          why_learners_make_it: "否定＝「不」という思い込みから誤用しやすいです。"
        },
        extra_mistakes: []
      },
      en: {
        title: "The 有 (yǒu) Sentence (Possession & Existence)",
        quick_rule_3s: "Use 有 to express possession ('to have') or existence ('there is/are'). Negation MUST always be 没有 (méiyǒu), never 不有.",
        contrastive_note: "Unlike English which uses distinct structures for 'I have a book' and 'There is a book on the desk', Chinese uses 有 for both.",
        analogy: "Think of 没有 as a single inseparable lock for 有. Never mix 不 with 有.",
        mnemonic: "Have is 有 (yǒu), have not is 没有 (méiyǒu) — never say 不有!",
        how_to_use: [
          { step: 1, text: "Place the owner or location at the beginning as Subject." },
          { step: 2, text: "Add 有 for affirmative, or 没有 for negative." },
          { step: 3, text: "Add the object noun or number-measure-noun phrase." }
        ],
        self_check: ["Did you use 没有 instead of 不有?"],
        tips: ["Form yes-no questions with 有...吗？ or 有没有...？."],
        when_to_use: ["Talking about possessions, relationships, free time, or items present in a location."],
        when_not_to_use: ["Do not use 有 to equate two nouns (use 是 instead)."],
        fatal_mistake: {
          wrong: "我不有钱。",
          correct: "我没有钱。",
          explanation: "The verb 有 must strictly be negated with 没 (没有), never with 不.",
          why_learners_make_it: "Directly translating 'not have' using the general negation word 不."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "___ 有 ___。",
      slots: [
        { vi: "Chủ ngữ (Tôi, Anh ấy, Nhà tôi)", ja: "主語（私、彼など）", en: "Subject" },
        { vi: "Danh từ (sách, thời gian, xe đạp)", ja: "目的語（本、時間など）", en: "Object" }
      ],
      example_filled: "我有三本书。"
    },
    collocations: [
      { zh: "有时间", pinyin: "yǒu shíjiān", meaning: { vi: "có thời gian, rảnh rỗi", ja: "時間がある", en: "to have time" } },
      { zh: "有问题", pinyin: "yǒu wèntí", meaning: { vi: "có câu hỏi, có vấn đề", ja: "質問・問題がある", en: "to have a question / problem" } },
      { zh: "有意思", pinyin: "yǒu yìsi", meaning: { vi: "thú vị, hay ho", ja: "面白い", en: "interesting" } },
      { zh: "没有钱", pinyin: "méiyou qián", meaning: { vi: "không có tiền", ja: "お金がない", en: "to have no money" } }
    ],
    examples: [
      {
        zh: "我有三本中文书。",
        pinyin: "wǒ yǒu sān běn Zhōngwén shū",
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "我", false_friend_ja: null, gloss: { vi: "tôi", ja: "私", en: "I" }, block_role: "subject" },
          { hanzi: "有", pinyin: "yǒu", han_viet: "hữu", ja_kanji: "有", false_friend_ja: null, gloss: { vi: "có", ja: "持っている", en: "have" }, block_role: "verb" },
          { hanzi: "三", pinyin: "sān", han_viet: "tam", ja_kanji: "三", false_friend_ja: null, gloss: { vi: "ba", ja: "3", en: "three" }, block_role: "object" },
          { hanzi: "本", pinyin: "běn", han_viet: "bản", ja_kanji: "本", false_friend_ja: null, gloss: { vi: "cuốn", ja: "冊", en: "books (mw)" }, block_role: "object" },
          { hanzi: "中文", pinyin: "Zhōngwén", han_viet: "Trung văn", ja_kanji: "中国語", false_friend_ja: null, gloss: { vi: "tiếng Trung", ja: "中国語", en: "Chinese" }, block_role: "object" },
          { hanzi: "书", pinyin: "shū", han_viet: "thư", ja_kanji: "書", false_friend_ja: null, gloss: { vi: "sách", ja: "本", en: "book" }, block_role: "object" }
        ],
        scenario: { vi: "Khoe đồ dùng học tập", ja: "勉強用具の紹介", en: "Talking about study materials" },
        translations: { vi: "Tôi có ba cuốn sách tiếng Trung.", ja: "私は中国語の本を3冊持っています。", en: "I have three Chinese books." },
        literal_en: "I have three [measure] Chinese books.",
        tone_tip: { vi: "wǒ thanh 3 đi trước yǒu thanh 3 biến thành wó yǒu.", ja: "我（第3声）＋有（第3声）で「wó yǒu」と変調します。", en: "Two 3rd tones: wǒ + yǒu becomes wó yǒu." },
        word_order_diff: { vi: "Số lượng từ đứng trước danh từ giống tiếng Việt.", ja: "日本語の「3冊の本」と同様に「三本书」の順です。", en: "Number + measure word precedes noun." },
        note: { vi: "本 là lượng từ chuyên dụng cho sách vở.", ja: "「本」は中国語では書籍を数える量詞です。", en: "本 is the measure word for bound books." }
      },
      {
        zh: "桌子上有一杯热茶。",
        pinyin: "zhuōzi shang yǒu yì bēi rè chá",
        tokens: [
          { hanzi: "桌子", pinyin: "zhuōzi", han_viet: "trác tử", ja_kanji: "机", false_friend_ja: null, gloss: { vi: "cái bàn", ja: "机", en: "table" }, block_role: "subject" },
          { hanzi: "上", pinyin: "shang", han_viet: "thượng", ja_kanji: "上", false_friend_ja: null, gloss: { vi: "trên", ja: "の上", en: "on" }, block_role: "subject" },
          { hanzi: "有", pinyin: "yǒu", han_viet: "hữu", ja_kanji: "有", false_friend_ja: null, gloss: { vi: "có", ja: "ある", en: "there is" }, block_role: "verb" },
          { hanzi: "一杯", pinyin: "yì bēi", han_viet: "nhất bôi", ja_kanji: "一杯", false_friend_ja: null, gloss: { vi: "một cốc", ja: "一杯", en: "a cup of" }, block_role: "object" },
          { hanzi: "热茶", pinyin: "rè chá", han_viet: "nhiệt trà", ja_kanji: "熱いお茶", false_friend_ja: null, gloss: { vi: "trà nóng", ja: "温かいお茶", en: "hot tea" }, block_role: "object" }
        ],
        scenario: { vi: "Mô tả đồ vật trong phòng", ja: "部屋の物の描写", en: "Describing items in a room" },
        translations: { vi: "Trên bàn có một cốc trà nóng.", ja: "机の上に温かいお茶が一杯あります。", en: "There is a cup of hot tea on the table." },
        literal_en: "Table on has a cup hot tea.",
        tone_tip: { vi: "yì bēi: yī đi trước bēi (thanh 1) đổi thành thanh 4 yì.", ja: "「一」の変調：第1声の前で「yì」になります。", en: "Tone sandhi for 一: pronounced yì before 1st tone." },
        word_order_diff: { vi: "Nơi chốn đứng trước chữ 有 biểu thị sự tồn tại.", ja: "場所＋有＋名詞で存在を表します。", en: "Location + 有 + Noun indicates existence." },
        note: { vi: "上 là từ chỉ phương vị sau danh từ.", ja: "「上」は位置を示す方位詞です。", en: "上 is a localizer meaning 'on'." }
      },
      {
        zh: "他没有自行车。",
        pinyin: "tā méiyou zìxíngchē",
        tokens: [
          { hanzi: "他", pinyin: "tā", han_viet: "tha", ja_kanji: "彼", false_friend_ja: null, gloss: { vi: "anh ấy", ja: "彼", en: "he" }, block_role: "subject" },
          { hanzi: "没有", pinyin: "méiyou", han_viet: "một hữu", ja_kanji: "持っていない", false_friend_ja: null, gloss: { vi: "không có", ja: "ない", en: "does not have" }, block_role: "verb" },
          { hanzi: "自行车", pinyin: "zìxíngchē", han_viet: "tự hành xa", ja_kanji: "自転車", false_friend_ja: null, gloss: { vi: "xe đạp", ja: "自転車", en: "bicycle" }, block_role: "object" }
        ],
        scenario: { vi: "Nói về phương tiện đi lại", ja: "交通手段について話す", en: "Talking about transportation" },
        translations: { vi: "Anh ấy không có xe đạp.", ja: "彼は自転車を持っていません。", en: "He does not have a bicycle." },
        literal_en: "He not-have bicycle.",
        tone_tip: { vi: "méi thanh 2, you thanh nhẹ.", ja: "「没有」の「有」は軽声で読まれることが多いです。", en: "you in méiyou is often pronounced in neutral tone." },
        word_order_diff: { vi: "Giống tiếng Việt: Chủ ngữ + không có + tân ngữ.", ja: "主語＋没有＋目的語の語順です。", en: "Subject + 没有 + Object." },
        note: { vi: "Tuyệt đối không nói 他不有自行车.", ja: "「他不有」とは言えません。", en: "Never say 不有." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi mượn từ điển tiếng Trung", ja: "中国語の辞書を借りる", en: "Borrowing a Chinese dictionary" },
      lines: [
        { speaker: "A", zh: "你有中文词典吗？", pinyin: "Nǐ yǒu Zhōngwén cídiǎn ma?", tr: { vi: "Bạn có từ điển tiếng Trung không?", ja: "中国語の辞書を持っていますか？", en: "Do you have a Chinese dictionary?" } },
        { speaker: "B", zh: "有，在我的书包里。", pinyin: "Yǒu, zài wǒ de shūbāo lǐ.", tr: { vi: "Có, ở trong ba lô của tôi.", ja: "あります、私のカバンの中にあります。", en: "Yes, it is in my backpack." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["三本", "我", "有", "中文书"], correct_order: ["我", "有", "三本", "中文书"] },
      { scrambled_tokens: ["自行车", "他", "没有"], correct_order: ["他", "没有", "自行车"] }
    ],
    fill_blank: [
      {
        sentence: "我 ___ 很多中国朋友。",
        options: ["有", "是", "在", "不"],
        answer_index: 0,
        trap_for: ["en", "vi"],
        explanation: { vi: "Diễn tả sự sở hữu bạn bè dùng 有. Không dùng 是 (tôi là bạn) hay 在.", ja: "友人を持っている（所有）を表すので「有」が正解です。", en: "Expressing having friends requires 有." }
      },
      {
        sentence: "他今天 ___ 时间去书店。",
        options: ["没有", "不有", "不", "没是"],
        answer_index: 0,
        trap_for: ["vi"],
        explanation: { vi: "Phủ định của 有 bắt buộc dùng 没有. Không có từ '不有'.", ja: "「有」の否定は「没有」のみです。", en: "Negation of 有 is strictly 没有." }
      }
    ],
    error_correction: [
      {
        wrong: "我不有电脑。",
        correct: "我没有电脑。",
        hint: { vi: "Phủ định của 有 là gì? Có được dùng 不 không?", ja: "「有」の否定副詞は「不」ではなく何ですか？", en: "What is the only valid negation word for 有?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Câu nào dưới đây dùng đúng ngữ pháp?", ja: "文法的に正しい文はどれですか？", en: "Which sentence is grammatically correct?" },
        options: ["我不有手机。", "我没有手机。", "我是没有手机。", "我不手机有。"],
        answer_index: 1,
        trap_for: ["vi", "en"],
        explanation: { vi: "Phủ định của 有 luôn luôn là 没有.", ja: "「有」の否定は「没有」です。", en: "Negation of 有 is always 没有." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Sở hữu và tồn tại dùng 有; phủ định CHỈ DÙNG 没有, cấm nói 不有!", ja: "所有と存在は「有」！否定は「没有」一択（「不有」は絶対NG）！", en: "Use 有 for have/exist; always negate with 没有, never 不有!" },
      remember: [
        { vi: "Phủ định của 有 là 没有, KHÔNG BAO GIỜ dùng 不有.", ja: "否定は「没有」、絶対に「不有」とは言わない。", en: "Negate 有 with 没有, never 不有." },
        { vi: "Nơi chốn + 有 + Danh từ: diễn tả sự tồn tại (Trên bàn có sách).", ja: "場所＋有＋名詞で「〜に〜がある」。", en: "Place + 有 + Noun means 'there is/are'." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 2. hsk1_zai_existence_location
  {
    id: "hsk1_zai_existence_location",
    level: "HSK1",
    level_num: 1,
    category: "preposition",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["在", "zài", "cấu trúc tại", "ở đâu", "at", "in", "location"],
    formula: "S + 在 + Nơi chốn + Hành động (V + O)",
    formula_plain: {
      vi: "Chủ ngữ + ở (địa điểm) + làm việc gì đó",
      ja: "主語 ＋ 在＋場所 ＋ 動詞（〜で〜する）",
      en: "Subject + 在 (at place) + Verb (action)"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ (S)", ja: "主語 (S)", en: "Subject (S)" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Ở nơi nào (在 + Nơi chốn)", ja: "場所（在＋場所）", en: "Location (在 + Place)" }, role: "location", color: "#8B5CF6" },
      { label: { vi: "Hành động (V + Tân ngữ)", ja: "動作（動詞＋目的語）", en: "Action (Verb + Object)" }, role: "verb", color: "#10B981" }
    ],
    related_ids: ["hsk1_you_possession_existence", "hsk1_zai_progressive"],
    confusable_with: [
      {
        id: "hsk1_zai_progressive",
        diff: {
          vi: "在 + Nơi chốn + V là chỉ địa điểm thực hiện hành động. Còn 在 + V (không có nơi chốn) là chỉ hành động đang diễn ra (đang làm gì).",
          ja: "「在＋場所＋動詞」は場所を表し、「在＋動詞」（場所なし）は進行形（〜している最中）を表します。",
          en: "在 + place + V denotes location of an action. 在 + V directly denotes continuous progressive aspect ('doing')."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Cấu trúc 在 chỉ địa điểm (Ở đâu làm gì)",
        quick_rule_3s: "Quy tắc vàng tiếng Trung: Nơi chốn đứng TRƯỚC hành động. Nói 'Ở đâu rồi mới làm gì' (S + 在 + Nơi chốn + V), không nói ngược như tiếng Việt.",
        contrastive_note: "Người Việt quen nói: 'Tôi ăn cơm ở nhà' (Động từ trước, nơi chốn sau). Tiếng Trung bắt buộc ngược lại: 'Tôi ở nhà ăn cơm' (我在家吃饭).",
        analogy: "Người Trung Quốc quan niệm: phải đến địa điểm đó trước rồi mới bắt đầu làm việc được, nên địa điểm phải đứng trước hành động.",
        mnemonic: "Có địa điểm (在) mới làm hành động (V) — nơi chốn đi trước, hành động theo sau!",
        how_to_use: [
          { step: 1, text: "Đặt chủ ngữ ở đầu câu." },
          { step: 2, text: "Đặt giới từ 在 + tên địa điểm (trường học, nhà, công ty)." },
          { step: 3, text: "Đặt động từ hành động và tân ngữ ở cuối." }
        ],
        self_check: [
          "Cụm '在 + Nơi chốn' đã đứng TRƯỚC động từ hành động chưa?",
          "Nếu chỉ nói 'Ai đó ở đâu' (không có hành động), câu kết thúc ngay sau địa điểm: 我在家."
        ],
        tips: [
          "Hỏi làm gì ở đâu: S + 在哪儿 + V？ (Ví dụ: 你在哪儿学中文？)",
          "Phủ định: S + 不在 + Nơi chốn + V."
        ],
        when_to_use: ["Khi mô tả địa điểm học tập, làm việc, sinh hoạt hàng ngày."],
        when_not_to_use: ["Không đặt cụm 在 + nơi chốn xuống tận cuối câu sau động từ (lỗi ngữ pháp người Việt hay mắc nhất)."],
        fatal_mistake: {
          wrong: "我看书在图书馆。",
          correct: "我在图书馆看书。",
          explanation: "Trong tiếng Trung, cụm trạng ngữ chỉ nơi chốn (在图书馆) bắt buộc đứng TRƯỚC động từ (看书).",
          why_learners_make_it: "Dịch từng từ từ tiếng Việt: 'Tôi đọc sách (看书) ở thư viện (在图书馆)'."
        },
        extra_mistakes: []
      },
      ja: {
        title: "介詞「在」（場所を表す：〜で〜する）",
        quick_rule_3s: "「在＋場所＋動詞」の語順で「〜で〜する」を表します。場所は動詞の前に置きます。",
        contrastive_note: "日本語の「学校で勉強する」と同じ語順（場所＋動詞）なので、日本人学習者には非常に直感的です。",
        analogy: "まず現場（在＋場所）に着いてから、作業（動詞）を始めるイメージです。",
        mnemonic: "在＋場所が先、動詞が後！",
        how_to_use: [
          { step: 1, text: "主語を置きます。" },
          { step: 2, text: "「在＋場所」を置きます。" },
          { step: 3, text: "行う動作（動詞）を置きます。" }
        ],
        self_check: ["動詞の後ろに場所を置いていませんか？"],
        tips: ["疑問文は「你在哪儿＋動詞？」となります。"],
        when_to_use: ["どこで仕事・勉強・食事をするかを表現するとき。"],
        when_not_to_use: ["英語のように動詞の後に at/in を置かないこと。"],
        fatal_mistake: {
          wrong: "我工作在医院。",
          correct: "我在医院工作。",
          explanation: "中国語では場所（在医院）を動詞（工作）の前に置きます。",
          why_learners_make_it: "英語（work at a hospital）の語順に引きずられることがあります。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Expressing Location with 在 (zài)",
        quick_rule_3s: "Core Chinese word order: Place comes BEFORE the verb. Pattern: Subject + 在 (at place) + Verb (action).",
        contrastive_note: "English places location at the end ('I study at school'), but Chinese places location in front of the verb (我在学校学习).",
        analogy: "You must arrive at the venue (在 place) before you can perform the activity (verb).",
        mnemonic: "Place first (在...), Action second (Verb)!",
        how_to_use: [
          { step: 1, text: "Subject first." },
          { step: 2, text: "Prepositional phrase: 在 + location." },
          { step: 3, text: "Action verb and its object." }
        ],
        self_check: ["Did you put 在 + location BEFORE the verb?"],
        tips: ["Ask location with: 在哪儿 + Verb? (Where do you...?)."],
        when_to_use: ["Stating where an action takes place."],
        when_not_to_use: ["Never put the prepositional phrase 在 + location at the end of the sentence."],
        fatal_mistake: {
          wrong: "I eat at home -> 我吃饭在家。",
          correct: "我在家吃饭。",
          explanation: "The location phrase '在家' must precede the verb '吃饭'.",
          why_learners_make_it: "Directly copying English S-V-O-Location word order."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "___ 在 ___ ___。",
      slots: [
        { vi: "Chủ ngữ (Tôi, Bạn)", ja: "主語", en: "Subject" },
        { vi: "Nơi chốn (nhà, trường học, công ty)", ja: "場所", en: "Location" },
        { vi: "Hành động (học bài, làm việc, ăn cơm)", ja: "動作", en: "Action" }
      ],
      example_filled: "我在学校学习。"
    },
    collocations: [
      { zh: "在家", pinyin: "zài jiā", meaning: { vi: "ở nhà", ja: "家にいる", en: "at home" } },
      { zh: "在学校", pinyin: "zài xuéxiào", meaning: { vi: "ở trường", ja: "学校で", en: "at school" } },
      { zh: "在哪儿", pinyin: "zài nǎr", meaning: { vi: "ở đâu", ja: "どこで", en: "where" } }
    ],
    examples: [
      {
        zh: "我在学校学中文。",
        pinyin: "wǒ zài xuéxiào xué Zhōngwén",
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", false_friend_ja: null, gloss: { vi: "tôi", ja: "私", en: "I" }, block_role: "subject" },
          { hanzi: "在", pinyin: "zài", han_viet: "tại", ja_kanji: "在", false_friend_ja: null, gloss: { vi: "ở", ja: "〜で", en: "at" }, block_role: "location" },
          { hanzi: "学校", pinyin: "xuéxiào", han_viet: "học hiệu", ja_kanji: "学校", false_friend_ja: null, gloss: { vi: "trường học", ja: "学校", en: "school" }, block_role: "location" },
          { hanzi: "学", pinyin: "xué", han_viet: "học", ja_kanji: "学ぶ", false_friend_ja: null, gloss: { vi: "học", ja: "勉強する", en: "study" }, block_role: "verb" },
          { hanzi: "中文", pinyin: "Zhōngwén", han_viet: "Trung văn", ja_kanji: "中国語", false_friend_ja: null, gloss: { vi: "tiếng Trung", ja: "中国語", en: "Chinese" }, block_role: "verb" }
        ],
        scenario: { vi: "Giới thiệu việc học tập", ja: "勉強場所の紹介", en: "Introducing where you study" },
        translations: { vi: "Tôi học tiếng Trung ở trường.", ja: "私は学校で中国語を勉強しています。", en: "I study Chinese at school." },
        literal_en: "I at school study Chinese.",
        tone_tip: { vi: "zài thanh 4 phát âm dứt khoát.", ja: "「在」は第4声ですっきり発音します。", en: "zài is 4th tone." },
        word_order_diff: { vi: "Tiếng Việt nói 'học... ở trường', tiếng Trung nói 'ở trường... học'.", ja: "日本語と同じ「場所＋動詞」の順です。", en: "Location strictly precedes verb in Chinese." },
        note: { vi: "Khác hoàn toàn trật tự từ tiếng Anh và tiếng Việt.", ja: "語順に注意。", en: "Crucial difference from English." }
      },
      {
        zh: "爸爸在公司工作。",
        pinyin: "bàba zài gōngsī gōngzuò",
        tokens: [
          { hanzi: "爸爸", pinyin: "bàba", han_viet: "ba ba", ja_kanji: "父", false_friend_ja: null, gloss: { vi: "bố", ja: "父", en: "father" }, block_role: "subject" },
          { hanzi: "在", pinyin: "zài", han_viet: "tại", ja_kanji: "在", false_friend_ja: null, gloss: { vi: "ở", ja: "〜で", en: "at" }, block_role: "location" },
          { hanzi: "公司", pinyin: "gōngsī", han_viet: "công ty", ja_kanji: "会社", false_friend_ja: null, gloss: { vi: "công ty", ja: "会社", en: "company" }, block_role: "location" },
          { hanzi: "工作", pinyin: "gōngzuò", han_viet: "công tác", ja_kanji: "仕事", false_friend_ja: { zh_meaning: "Làm việc, công việc", ja_meaning: "Thủ công tác phẩm, chế tạo đồ vật" }, gloss: { vi: "làm việc", ja: "働く", en: "work" }, block_role: "verb" }
        ],
        scenario: { vi: "Nói về nghề nghiệp của người thân", ja: "家族の仕事について", en: "Talking about father's job" },
        translations: { vi: "Bố làm việc ở công ty.", ja: "父は会社で働いています。", en: "Father works at the company." },
        literal_en: "Father at company works.",
        tone_tip: { vi: "gōngsī cả hai chữ đều thanh 1.", ja: "「公司」は第1声＋第1声です。", en: "gōngsī has two 1st tones." },
        word_order_diff: { vi: "在 công ty đứng trước làm việc.", ja: "会社で＋働くの順。", en: "Location before verb." },
        note: { vi: "工作 vừa là động từ làm việc vừa là danh từ công việc.", ja: "「工作」は日中同形異義語です。", en: "工作 serves as both verb and noun." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi nơi ăn trưa", ja: "昼食の場所を尋ねる", en: "Asking where to have lunch" },
      lines: [
        { speaker: "A", zh: "中午你在哪儿吃饭？", pinyin: "Zhōngwǔ nǐ zài nǎr chīfàn?", tr: { vi: "Buổi trưa bạn ăn cơm ở đâu?", ja: "お昼はどこでご飯を食べますか？", en: "Where do you eat lunch at noon?" } },
        { speaker: "B", zh: "我在学校食堂吃。", pinyin: "Wǒ zài xuéxiào shítáng chī.", tr: { vi: "Tôi ăn ở nhà ăn của trường.", ja: "学校の食堂で食べます。", en: "I eat at the school cafeteria." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["学中文", "在学校", "我"], correct_order: ["我", "在学校", "学中文"] },
      { scrambled_tokens: ["看书", "在图书馆", "他"], correct_order: ["他", "在图书馆", "看书"] }
    ],
    fill_blank: [
      {
        sentence: "妈妈 ___ 厨房做饭。",
        options: ["在", "是", "有", "去"],
        answer_index: 0,
        trap_for: ["vi", "en"],
        explanation: { vi: "Diễn tả hành động diễn ra tại một địa điểm dùng giới từ 在.", ja: "場所で動作を行うので「在」を用います。", en: "Indicating location of an action requires 在." }
      }
    ],
    error_correction: [
      {
        wrong: "我学汉语在大学。",
        correct: "我在大学学汉语。",
        hint: { vi: "Địa điểm trong tiếng Trung phải đứng trước hay đứng sau động từ?", ja: "場所（在大学）は動詞の前と後、どちらに置きますか？", en: "Does the location phrase go before or after the verb?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Trật tự câu nào sau đây là chuẩn xác nhất?", ja: "正しい語順の文はどれですか？", en: "Which sentence has the correct Chinese word order?" },
        options: ["我吃饭在家里。", "我在家里吃饭。", "家里我吃饭在。", "我吃在家饭。"],
        answer_index: 1,
        trap_for: ["vi", "en"],
        explanation: { vi: "Quy tắc vàng: S + 在 địa điểm + V.", ja: "主語＋在＋場所＋動詞の語順が正解です。", en: "Subject + 在 location + Verb." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Ở đâu rồi mới làm gì: S + 在 + Nơi chốn + Động từ!", ja: "場所が先、動作が後：S ＋ 在場所 ＋ 動詞！", en: "Location before Action: S + 在 Place + Verb!" },
      remember: [
        { vi: "Nơi chốn (在 + địa điểm) luôn đứng TRƯỚC động từ hành động.", ja: "「在＋場所」は常に動詞の前に置く。", en: "Place always precedes the action verb." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 3. hsk1_ma_yes_no_question
  {
    id: "hsk1_ma_yes_no_question",
    level: "HSK1",
    level_num: 1,
    category: "question",
    difficulty: 1,
    frequency: 5,
    register: "neutral",
    keywords: ["吗", "ma", "câu hỏi ma", "phải không", "yes no question"],
    formula: "Câu khẳng định + 吗？",
    formula_plain: {
      vi: "[Câu khẳng định bình thường] + 吗 (phải không / không)?",
      ja: "［平叙文］ ＋ 吗（〜ですか？）",
      en: "[Statement] + 吗 (question marker)?"
    },
    structure_blocks: [
      { label: { vi: "Câu khẳng định", ja: "平叙文", en: "Statement" }, role: "statement", color: "#3B82F6" },
      { label: { vi: "Trợ từ nghi vấn 吗", ja: "疑問助詞「吗」", en: "Question particle 吗" }, role: "particle", color: "#EC4899" }
    ],
    related_ids: ["hsk1_ne_elliptical_question", "hsk2_affirmative_negative_question"],
    confusable_with: [
      {
        id: "hsk1_interrogative_pronouns",
        diff: {
          vi: "Khi câu đã có từ để hỏi (什么, 谁, 哪儿, 几...) thì TUYỆT ĐỐI KHÔNG thêm 吗 nữa. 吗 chỉ đi với câu khẳng định.",
          ja: "疑問詞（什么、谁、哪儿など）を含む疑問文には「吗」をつけません。「吗」は平叙文の末尾にだけつけます。",
          en: "If a question already has a question word (who, what, where), do NOT add 吗 at the end."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu hỏi Có-Không với trợ từ 吗",
        quick_rule_3s: "Giữ nguyên câu khẳng định và thêm chữ 吗 (ma) vào cuối câu để biến thành câu hỏi Yes/No. Không đảo trật tự từ.",
        contrastive_note: "Rất giống tiếng Việt khi thêm từ 'hả / không / phải không' vào cuối câu: 'Bạn khỏe' -> 'Bạn khỏe không?'.",
        analogy: "Chữ 吗 giống như chiếc chìa khóa thần kỳ: chỉ cần gắn nó vào đuôi câu là lập tức biến cả câu thành câu hỏi.",
        mnemonic: "Giữ nguyên câu nói, thêm 吗 ở đuôi — thành câu hỏi ngay!",
        how_to_use: [
          { step: 1, text: "Viết một câu khẳng định hoàn chỉnh (Ví dụ: 你好, 这是书)." },
          { step: 2, text: "Thêm trợ từ 吗 vào cuối câu và đổi dấu chấm thành dấu hỏi (?): 你好吗？ 这是书吗？" }
        ],
        self_check: [
          "Trong câu có từ để hỏi như 什么, 谁, 哪儿 không? Nếu có thì phải BỎ chữ 吗 đi!",
          "吗 phát âm thanh nhẹ (ma), không có dấu thanh điệu."
        ],
        tips: ["Trả lời khẳng định: lặp lại động từ/tính từ hoặc nói 对 / 是的. Trả lời phủ định: 不 / 没."],
        when_to_use: ["Hỏi xác nhận thông tin Có hay Không."],
        when_not_to_use: ["Không dùng 吗 trong câu đã có đại từ nghi vấn (không nói '你是谁吗？')."],
        fatal_mistake: {
          wrong: "你叫什么名字吗？",
          correct: "你叫什么名字？",
          explanation: "Trong câu đã có đại từ nghi vấn '什么' (gì) nên không được thêm '吗' nữa.",
          why_learners_make_it: "Thói quen cứ thấy câu hỏi là tự động thêm '吗' ở cuối."
        },
        extra_mistakes: []
      },
      ja: {
        title: "「吗」疑問文（Yes/No 疑問文）",
        quick_rule_3s: "文末に「吗（ma）」を置くだけで平叙文を疑問文（〜ですか？）に変えられます。語順は一切変わりません。",
        contrastive_note: "日本語の助詞「か」と完全に同じ働きです（例：元気です ＋ か ＝ 元気ですか？）。",
        analogy: "文末に「？」スイッチをONにするパーツが「吗」です。",
        mnemonic: "文末に「吗」をつけるだけ！",
        how_to_use: [
          { step: 1, text: "普通の文（平叙文）を作ります。" },
          { step: 2, text: "最後に「吗」をつけ、クエスチョンマークで結びます。" }
        ],
        self_check: ["文中に「什么」「谁」「哪儿」などの疑問詞が入っていませんか？入っているなら「吗」は不要です。"],
        tips: ["「吗」は軽声で短く軽く発音します。"],
        when_to_use: ["「はい／いいえ」で答えられる質問をするとき。"],
        when_not_to_use: ["疑問詞疑問文には「吗」を併用できません。"],
        fatal_mistake: {
          wrong: "他是谁吗？",
          correct: "他是谁？",
          explanation: "疑問詞「谁」があるので「吗」はつけられません。",
          why_learners_make_it: "疑問文にはすべて「吗」がつくという誤解から生じます。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Yes-No Questions with 吗 (ma)",
        quick_rule_3s: "Simply attach 吗 (ma) to the end of any declarative sentence to turn it into a yes-no question without changing word order.",
        contrastive_note: "Unlike English which requires auxiliary verbs or subject-verb inversion ('Are you...?', 'Do you have...?'), Chinese keeps the original word order unchanged.",
        analogy: "Like adding a spoken question mark at the very end of your sentence.",
        mnemonic: "Statement + 吗 = Question!",
        how_to_use: [
          { step: 1, text: "Form a regular statement." },
          { step: 2, text: "Attach 吗 at the end." }
        ],
        self_check: ["Is there already a question word (what, who, where)? If yes, remove 吗!"],
        tips: ["吗 is always pronounced with a light, neutral tone."],
        when_to_use: ["Asking any question answerable with Yes or No."],
        when_not_to_use: ["Never combine 吗 with content question words (什么, 谁, 哪里)."],
        fatal_mistake: {
          wrong: "Where is it? -> 它在哪儿吗？",
          correct: "它在哪儿？",
          explanation: "哪儿 (where) is already a question word, so 吗 must not be added.",
          why_learners_make_it: "Overusing 吗 on every type of question."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "___ 吗？",
      slots: [
        { vi: "Câu khẳng định (Bạn thích uống trà, Đây là sách của bạn)", ja: "平叙文", en: "Statement" }
      ],
      example_filled: "你喜欢喝茶吗？"
    },
    collocations: [
      { zh: "你好吗", pinyin: "nǐ hǎo ma", meaning: { vi: "Bạn khỏe không?", ja: "お元気ですか？", en: "How are you?" } },
      { zh: "对吗", pinyin: "duì ma", meaning: { vi: "Đúng không?", ja: "合っていますか？", en: "Right?" } },
      { zh: "可以吗", pinyin: "kěyǐ ma", meaning: { vi: "Được không?", ja: "いいですか？", en: "Is it okay?" } }
    ],
    examples: [
      {
        zh: "你喜欢中国菜吗？",
        pinyin: "nǐ xǐhuan Zhōngguó cài ma",
        tokens: [
          { hanzi: "你", pinyin: "nǐ", han_viet: "nhĩ", ja_kanji: "あなた", false_friend_ja: null, gloss: { vi: "bạn", ja: "あなた", en: "you" }, block_role: "statement" },
          { hanzi: "喜欢", pinyin: "xǐhuan", han_viet: "hỉ hoan", ja_kanji: "好き", false_friend_ja: null, gloss: { vi: "thích", ja: "好き", en: "like" }, block_role: "statement" },
          { hanzi: "中国菜", pinyin: "Zhōngguó cài", han_viet: "Trung Quốc thái", ja_kanji: "中国料理", false_friend_ja: null, gloss: { vi: "món ăn Trung Quốc", ja: "中華料理", en: "Chinese food" }, block_role: "statement" },
          { hanzi: "吗", pinyin: "ma", han_viet: "ma", ja_kanji: "か", false_friend_ja: null, gloss: { vi: "không", ja: "〜か", en: "(question particle)" }, block_role: "particle" }
        ],
        scenario: { vi: "Hỏi sở thích ăn uống", ja: "食べ物の好みを尋ねる", en: "Asking about food preferences" },
        translations: { vi: "Bạn có thích món ăn Trung Quốc không?", ja: "中国料理は好きですか？", en: "Do you like Chinese food?" },
        literal_en: "You like China dishes MA?",
        tone_tip: { vi: "ma phát âm nhẹ, ngắn.", ja: "「吗」は軽く発音。", en: "ma is neutral tone." },
        word_order_diff: { vi: "Giống tiếng Việt thêm 'không' ở cuối.", ja: "日本語の「〜か」と完全に一致。", en: "No auxiliary 'do' needed." },
        note: { vi: "Trả lời: 很喜欢 (rất thích) hoặc 不太喜欢 (không thích lắm).", ja: "回答例：很喜欢。", en: "Answer with 很喜欢 or 不喜欢." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi thăm sức khỏe", ja: "体調を気遣う", en: "Asking about someone's condition" },
      lines: [
        { speaker: "A", zh: "今天工作累吗？", pinyin: "Jīntiān gōngzuò lèi ma?", tr: { vi: "Hôm nay đi làm có mệt không?", ja: "今日の仕事は疲れましたか？", en: "Are you tired from work today?" } },
        { speaker: "B", zh: "不累，今天挺轻松的。", pinyin: "Bú lèi, jīntiān tǐng qīngsōng de.", tr: { vi: "Không mệt, hôm nay khá thoải mái.", ja: "疲れていません、今日は割と楽でした。", en: "Not tired, today was quite easy." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["吗", "中文", "学", "你"], correct_order: ["你", "学", "中文", "吗"] }
    ],
    fill_blank: [
      {
        sentence: "这是你的汉语书 ___ ？",
        options: ["吗", "什么", "谁", "呢"],
        answer_index: 0,
        trap_for: ["en"],
        explanation: { vi: "Câu hỏi xác nhận Có-Không với câu khẳng định dùng 吗.", ja: "Yes/No疑問文を作るので「吗」が正解です。", en: "Forms a yes-no question on a statement." }
      }
    ],
    error_correction: [
      {
        wrong: "这是什么书吗？",
        correct: "这是什么书？",
        hint: { vi: "Trong câu đã có từ để hỏi '什么' thì có được dùng '吗' nữa không?", ja: "疑問詞「什么」がある文に「吗」は必要ですか？", en: "Is 吗 allowed when 什么 is already present?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Câu nào sau đây BỊ SAI ngữ pháp?", ja: "文法的に間違っている文はどれですか？", en: "Which sentence is grammatically INCORRECT?" },
        options: ["你是老师吗？", "你去哪儿吗？", "他吃苹果吗？", "汉字难吗？"],
        answer_index: 1,
        trap_for: ["vi", "ja", "en"],
        explanation: { vi: "Câu '你去哪儿吗？' sai vì đã có đại từ nghi vấn '哪儿', không được dùng 吗.", ja: "「哪儿」と「吗」の併用は誤りです。", en: "哪儿 and 吗 cannot co-occur in the same sentence." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Câu khẳng định + 吗？ = Câu hỏi Có-Không; có từ để hỏi thì KHÔNG dùng 吗!", ja: "平叙文 ＋ 吗？＝ 疑問文！疑問詞（什么、谁など）との併用は禁止！", en: "Statement + 吗? = Yes-No question! Never combine with question words!" },
      remember: [
        { vi: "吗 đứng ở cuối câu và giữ nguyên trật tự từ của câu khẳng định.", ja: "語順を変えずに文末に「吗」をつける。", en: "Place 吗 at end without altering word order." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 4. hsk2_le_completion_aspect
  {
    id: "hsk2_le_completion_aspect",
    level: "HSK2",
    level_num: 2,
    category: "aspect",
    difficulty: 2,
    frequency: 5,
    register: "neutral",
    keywords: ["了", "le", "trợ từ động thái", "hoàn thành", "completion", "completed action"],
    formula: "S + V + 了 + Số lượng + Danh từ",
    formula_plain: {
      vi: "Chủ ngữ + Động từ + 了 (đã xong) + Tân ngữ",
      ja: "主語 ＋ 動詞 ＋ 了（動作の完了・実現） ＋ 目的語",
      en: "Subject + Verb + 了 (completed aspect) + Object"
    },
    structure_blocks: [
      { label: { vi: "Chủ ngữ (S)", ja: "主語 (S)", en: "Subject (S)" }, role: "subject", color: "#3B82F6" },
      { label: { vi: "Động từ (V)", ja: "動詞 (V)", en: "Verb (V)" }, role: "verb", color: "#10B981" },
      { label: { vi: "Trợ từ hoàn thành (了)", ja: "完了助詞（了）", en: "Aspect particle (了)" }, role: "aspect", color: "#EF4444" },
      { label: { vi: "Tân ngữ có định ngữ / số lượng", ja: "数量・目的語", en: "Object / Quantity" }, role: "object", color: "#F59E0B" }
    ],
    related_ids: ["hsk1_le_modal_change", "hsk2_guo_experiential_aspect"],
    confusable_with: [
      {
        id: "hsk1_le_modal_change",
        diff: {
          vi: "Trợ từ động thái 了 đứng ngay sau Động từ (V + 了) biểu thị hành động đã hoàn thành. Khác với 了 ở cuối câu biểu thị sự thay đổi trạng thái (trời mưa rồi, tôi biết rồi).",
          ja: "動詞の直後の「了」は動作の完了を表します。文末の「了」は状況の変化（雨が降ってきた、分かった）を表します。",
          en: "Verb-suffix 了 indicates completion of an action. Sentence-final 了 indicates a change of state."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Trợ từ động thái 了 (Hành động hoàn thành)",
        quick_rule_3s: "Đặt 了 ngay sau động từ để báo hiệu hành động đó đã diễn ra và hoàn thành. Phủ định dùng '没 + V', tuyệt đối KHÔNG có chữ 了 nữa.",
        contrastive_note: "Người Việt hay nhầm 了 là thì quá khứ (past tense). Thực chất 了 là thể hoàn thành (aspect). Hành động trong tương lai nếu hoàn thành trước một việc khác vẫn dùng được 了 (Ví dụ: Ngày mai bạn ăn cơm xong rồi hãy đến).",
        analogy: "Hãy coi chữ 了 như một dấu tích xanh (✓) đánh dấu vào hành động: việc này đã được thực hiện xong.",
        mnemonic: "Làm xong việc gì gắn ngay chữ 了; khi phủ định dùng 没 thì vứt 了 đi!",
        how_to_use: [
          { step: 1, text: "Đặt động từ hành động." },
          { step: 2, text: "Gắn chữ 了 ngay sát sau động từ (V + 了)." },
          { step: 3, text: "Nếu có tân ngữ, thường đi kèm số lượng từ hoặc từ bổ nghĩa (Ví dụ: 喝了一杯水, 买了两本书)." }
        ],
        self_check: [
          "Chữ 了 có đứng ngay sau động từ không?",
          "Nếu câu mang nghĩa phủ định (chưa làm), bạn đã dùng 没 và bỏ chữ 了 chưa?"
        ],
        tips: ["Phủ định của 'V + 了' luôn là '没 + V' (không có 了)."],
        when_to_use: ["Báo cáo hành động đã làm xong trong công việc, học tập, sinh hoạt."],
        when_not_to_use: ["Thói quen lặp đi lặp lại hàng ngày (mỗi ngày tôi đều chạy bộ) không dùng 了."],
        fatal_mistake: {
          wrong: "我昨天没买了书。",
          correct: "我昨天没买书。",
          explanation: "Khi đã có phó từ phủ định '没' thì hành động chưa xảy ra, tuyệt đối KHÔNG được để chữ '了' ở sau động từ.",
          why_learners_make_it: "Nghĩ rằng hôm qua là quá khứ nên cứ giữ chữ 了."
        },
        extra_mistakes: []
      },
      ja: {
        title: "動態助詞「了」（動作の完了）",
        quick_rule_3s: "動詞の直後に「了」を置いて動作の実現・完了を表します。否定文では「没＋動詞」となり、「了」は消えます。",
        contrastive_note: "「了」は過去形（〜した）ではなく「完了相（アスペクト）」です。未来の文でも完了を表すことができます。",
        analogy: "タスクのチェックマーク（✓）と同じ。動作が終わったことを表します。",
        mnemonic: "動詞＋了で完了！「没」があるなら「了」はサヨナラ！",
        how_to_use: [
          { step: 1, text: "動詞を置きます。" },
          { step: 2, text: "直後に「了」を添えます。" },
          { step: 3, text: "数量詞を伴う目的語（一個、三本など）を続けます。" }
        ],
        self_check: ["否定の「没」と一緒に「了」を使っていませんか？"],
        tips: ["否定は「没＋動詞」で「了」を取り除きます。"],
        when_to_use: ["買い物をした、ご飯を食べたなど動作の完了を伝えるとき。"],
        when_not_to_use: ["習慣的な動作（毎朝走る）には使えません。"],
        fatal_mistake: {
          wrong: "我没吃了饭。",
          correct: "我没吃饭。",
          explanation: "否定「没」がある文では完了の「了」は使用できません。",
          why_learners_make_it: "過去のことだからと「了」を残してしまう誤用。"
        },
        extra_mistakes: []
      },
      en: {
        title: "Aspect Particle 了 (Action Completion)",
        quick_rule_3s: "Placed directly after a verb to indicate that an action has been completed. In negative sentences, use 没 and DROP 了.",
        contrastive_note: "了 is NOT a past tense marker, but an aspect marker signifying completion. It can even be used for future actions that finish before another.",
        analogy: "Like a completion checkmark (✓) placed next to the verb.",
        mnemonic: "Verb + 了 = Done! But with 没, toss 了 away!",
        how_to_use: [
          { step: 1, text: "State the action verb." },
          { step: 2, text: "Place 了 immediately after the verb." },
          { step: 3, text: "Usually followed by a quantified object (e.g., 一杯水, 两本书)." }
        ],
        self_check: ["Did you drop 了 when negating with 没?"],
        tips: ["Negation is always 没 + Verb (without 了)."],
        when_to_use: ["Reporting that an action has been carried out or completed."],
        when_not_to_use: ["Habitual actions (I drink coffee every day) do not use 了."],
        fatal_mistake: {
          wrong: "我昨天没买了书。",
          correct: "我昨天没买书。",
          explanation: "When an action did not occur (negated with 没), completion marker 了 must be removed.",
          why_learners_make_it: "Assuming 了 represents English past tense '-ed'."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "我 ___ 了 ___。",
      slots: [
        { vi: "Động từ (ăn, uống, mua)", ja: "動詞", en: "Verb" },
        { vi: "Số lượng + Danh từ (hai cuốn sách, một cốc cà phê)", ja: "数量＋目的語", en: "Quantified object" }
      ],
      example_filled: "我喝了一杯咖啡。"
    },
    collocations: [
      { zh: "吃了饭", pinyin: "chī le fàn", meaning: { vi: "ăn cơm xong", ja: "ご飯を食べた", en: "ate meal" } },
      { zh: "买了票", pinyin: "mǎi le piào", meaning: { vi: "đã mua vé", ja: "チケットを買った", en: "bought tickets" } },
      { zh: "找到了", pinyin: "zhǎodào le", meaning: { vi: "đã tìm thấy rồi", ja: "見つかった", en: "found it" } }
    ],
    examples: [
      {
        zh: "我喝了一杯热咖啡。",
        pinyin: "wǒ hē le yì bēi rè kāfēi",
        tokens: [
          { hanzi: "我", pinyin: "wǒ", han_viet: "ngã", ja_kanji: "私", false_friend_ja: null, gloss: { vi: "tôi", ja: "私", en: "I" }, block_role: "subject" },
          { hanzi: "喝", pinyin: "hē", han_viet: "hát", ja_kanji: "飲む", false_friend_ja: null, gloss: { vi: "uống", ja: "飲む", en: "drank" }, block_role: "verb" },
          { hanzi: "了", pinyin: "le", han_viet: "liễu", ja_kanji: "了", false_friend_ja: null, gloss: { vi: "xong", ja: "〜た", en: "(completed)" }, block_role: "aspect" },
          { hanzi: "一杯", pinyin: "yì bēi", han_viet: "nhất bôi", ja_kanji: "一杯", false_friend_ja: null, gloss: { vi: "một cốc", ja: "一杯", en: "a cup of" }, block_role: "object" },
          { hanzi: "热咖啡", pinyin: "rè kāfēi", han_viet: "nhiệt gia phê", ja_kanji: "ホットコーヒー", false_friend_ja: null, gloss: { vi: "cà phê nóng", ja: "温かいコーヒー", en: "hot coffee" }, block_role: "object" }
        ],
        scenario: { vi: "Kể lại việc buổi sáng", ja: "朝の行動の報告", en: "Describing morning activities" },
        translations: { vi: "Tôi đã uống một cốc cà phê nóng.", ja: "私は温かいコーヒーを一杯飲みました。", en: "I drank a cup of hot coffee." },
        literal_en: "I drank LE a cup hot coffee.",
        tone_tip: { vi: "le là thanh nhẹ đọc ngắn lướt.", ja: "「了」は軽声で短く。", en: "le is neutral tone." },
        word_order_diff: { vi: "Động từ + 了 đứng trước số lượng và tân ngữ.", ja: "動詞＋了＋数量詞＋名詞の順。", en: "Verb + 了 before quantified noun." },
        note: { vi: "Khi tân ngữ có định ngữ (một cốc, nóng), 了 đứng ngay sau động từ.", ja: "目的語に数量詞がつく場合は動詞の直後に「了」を置きます。", en: "When object has modifiers, 了 attaches directly to the verb." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi về việc mua sắm", ja: "買い物の確認", en: "Asking about shopping" },
      lines: [
        { speaker: "A", zh: "你买水果了吗？", pinyin: "Nǐ mǎi shuǐguǒ le ma?", tr: { vi: "Bạn đã mua hoa quả chưa?", ja: "果物を買いましたか？", en: "Did you buy fruit?" } },
        { speaker: "B", zh: "买了，我买了几个苹果。", pinyin: "Mǎi le, wǒ mǎi le jǐ gè píngguǒ.", tr: { vi: "Mua rồi, tôi đã mua mấy quả táo.", ja: "買いました、りんごをいくつか買いました。", en: "Bought them, I bought several apples." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["咖啡", "喝了", "一杯", "他"], correct_order: ["他", "喝了", "一杯", "咖啡"] }
    ],
    fill_blank: [
      {
        sentence: "昨天我没 ___ 电影，我在家复习功课。",
        options: ["看", "看了", "看吗", "看在"],
        answer_index: 0,
        trap_for: ["vi", "ja", "en"],
        explanation: { vi: "Câu phủ định với 没 thì KHÔNG ĐƯỢC DÙNG 了.", ja: "「没」の文では「了」を落とすため「看」が正解です。", en: "In sentences negated with 没, 了 must be omitted." }
      }
    ],
    error_correction: [
      {
        wrong: "我没吃了早饭。",
        correct: "我没吃早饭。",
        hint: { vi: "Khi đã có phó từ phủ định '没' thì có được giữ chữ '了' không?", ja: "「没」がある文に「了」は必要ですか？", en: "Should 了 remain when 没 is present?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Câu phủ định của '他去图书馆了' là gì?", ja: "「他去图书馆了」の正しい否定文は？", en: "What is the correct negative form of '他去图书馆了'?" },
        options: ["他不去了图书馆。", "他没去图书馆。", "他没有去图书馆了。", "他去了没图书馆。"],
        answer_index: 1,
        trap_for: ["vi", "en"],
        explanation: { vi: "Phủ định của hành động hoàn thành là '没 + V' và phải bỏ chữ 了.", ja: "否定は「没＋動詞」で「了」を取り除きます。", en: "Negate with 没 and drop 了." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Hành động hoàn thành: V + 了; phủ định dùng 没 + V (bỏ chữ 了)!", ja: "完了は「動詞＋了」！否定は「没＋動詞」で「了」を落とす！", en: "Completion is Verb + 了; negate with 没 + Verb without 了!" },
      remember: [
        { vi: "Không dùng 了 với các hành động mang tính thói quen đều đặn.", ja: "日課・習慣の文には「了」をつけない。", en: "Do not use 了 for habitual actions." }
      ]
    },
    needs_review: false,
    review_note: ""
  },

  // 5. hsk3_bei_passive
  {
    id: "hsk3_bei_passive",
    level: "HSK3",
    level_num: 3,
    category: "sentence_pattern",
    difficulty: 3,
    frequency: 5,
    register: "neutral",
    keywords: ["被", "bèi", "câu chữ bị", "bị động", "passive", "câu bị động"],
    formula: "Đối tượng bị tác động + 被 (+ Tác nhân) + Động từ + Thành phần khác",
    formula_plain: {
      vi: "Người/Vật chịu tác động + 被 (bị/được) + Tác nhân + Động từ + Kết quả / 成份 khác",
      ja: "被害者／受動者 ＋ 被（〜によって） ＋ 動詞 ＋ その他",
      en: "Receiver + 被 (+ Agent) + Verb + Other element"
    },
    structure_blocks: [
      { label: { vi: "Đối tượng chịu tác động", ja: "受動者", en: "Receiver of Action" }, role: "receiver", color: "#3B82F6" },
      { label: { vi: "Trợ từ bị động (被)", ja: "受動助詞（被）", en: "Passive Marker (被)" }, role: "passive_marker", color: "#EF4444" },
      { label: { vi: "Tác nhân gây ra", ja: "動作主", en: "Agent" }, role: "agent", color: "#8B5CF6" },
      { label: { vi: "Động từ hành động", ja: "動詞", en: "Verb" }, role: "verb", color: "#10B981" },
      { label: { vi: "Thành phần kết quả", ja: "結果・補語", en: "Result / Complement" }, role: "complement", color: "#F59E0B" }
    ],
    related_ids: ["hsk3_ba_construction", "hsk789_wei_suo_passive_frame"],
    confusable_with: [
      {
        id: "hsk3_ba_construction",
        diff: {
          vi: "Câu chữ 把 là chủ động xử lý (Tôi đem táo ăn rồi: 我把苹果吃了). Câu chữ 被 là bị động chịu tác động (Táo bị tôi ăn rồi: 苹果被我吃了).",
          ja: "「把」は能動的に処置する文、「被」は影響を受ける受身文です。",
          en: "把 focuses on the agent disposing of an object. 被 focuses on the receiver experiencing an action."
        }
      }
    ],
    localizations: {
      vi: {
        title: "Câu chữ 被 (Câu bị động)",
        quick_rule_3s: "Dùng 被 (bị = bị/được) khi đối tượng chịu tác động thường gặp kết quả không mong muốn (hư hỏng, mất mát, ăn mất). Động từ KHÔNG BAO GIỜ đứng đơn độc, phải có thành phần khác ở sau (như 了, 走, 坏, 碎).",
        contrastive_note: "Trong tiếng Việt nói 'Ví của tôi bị mất' (động từ đứng trơ trọi). Trong tiếng Trung câu chữ 被 BẮT BUỘC phải có thành phần kết quả theo sau (Ví dụ: 被偷走了).",
        analogy: "Câu chữ 被 như một mũi tên đảo ngược: đồ vật bị đẩy lên đầu câu làm mục tiêu chịu đòn.",
        mnemonic: "Chữ 被 mang nghĩa bị/được; động từ cuối câu cấm đứng một mình!",
        how_to_use: [
          { step: 1, text: "Đưa vật hoặc người chịu tác động lên làm chủ ngữ đầu câu." },
          { step: 2, text: "Thêm chữ 被 (hoặc 叫 / 让 trong khẩu ngữ)." },
          { step: 3, text: "Thêm tác nhân gây ra (có thể lược bỏ tác nhân nếu dùng 被)." },
          { step: 4, text: "Động từ và BẮT BUỘC thêm bổ ngữ kết quả, xu hướng hoặc chữ 了." }
        ],
        self_check: [
          "Động từ sau chữ 被 có đứng trơ trọi một mình không? (Nếu có thì sai!)",
          "Nếu có phó từ phủ định (没) hay năng nguyện (想, 要, 能), chúng phải đứng TRƯỚC chữ 被."
        ],
        tips: ["Khẩu ngữ có thể dùng 叫 hoặc 让 thay cho 被, nhưng sau 叫/让 BẮT BUỘC phải có tác nhân."],
        when_to_use: ["Nói về sự cố, mất mát, hư hỏng hoặc sự việc bị người khác tác động."],
        when_not_to_use: ["Không dùng câu chữ 被 với các động từ tri giác, trạng thái không có tác động cụ thể (như 是, 有, 知道, 喜欢)."],
        fatal_mistake: {
          wrong: "我的西瓜被他吃。",
          correct: "我的西瓜被他吃了。",
          explanation: "Động từ trong câu chữ 被 không được đứng trơ trọi, phải có thành phần hoàn thành hoặc kết quả (như 了, 完).",
          why_learners_make_it: "Dịch trực tiếp từ tiếng Việt: 'Dưa hấu của tôi bị anh ấy ăn'."
        },
        extra_mistakes: []
      },
      ja: {
        title: "「被」構文（受け身・受身文）",
        quick_rule_3s: "「受動者 ＋ 被 ＋ 動作主 ＋ 動詞 ＋ その他」で受身を表します。好ましくない被害を表すことが多く、動詞単体では使えません。",
        contrastive_note: "日本語の「〜される（迷惑の受身）」とよく似ていますが、中国語では動詞の後ろに必ず「了」や結果補語が必要です。",
        analogy: "何らかの損害や変化を受けた結果を報告する文型です。",
        mnemonic: "「被」の文の動詞はひとりぼっち厳禁（補語や了をつける）！",
        how_to_use: [
          { step: 1, text: "被害を受けた物や人を文頭に置きます。" },
          { step: 2, text: "「被」＋動作主を置きます（動作主は省略可能）。" },
          { step: 3, text: "動詞＋補語または「了」を置きます。" }
        ],
        self_check: ["動詞が単独で終わっていませんか？"],
        tips: ["口語では「让」「叫」も使われます。"],
        when_to_use: ["物が壊れた、盗まれた、食べ尽くされた等の被害・変化を伝えるとき。"],
        when_not_to_use: ["「有」「是」などの状態動詞には使えません。"],
        fatal_mistake: {
          wrong: "蛋糕被吃了。",
          correct: "蛋糕被吃光了。",
          explanation: "動詞の後ろに結果（光、完など）や「了」が必要です。",
          why_learners_make_it: "動詞単独で終わらせてしまう誤用。"
        },
        extra_mistakes: []
      },
      en: {
        title: "The 被 (bèi) Passive Construction",
        quick_rule_3s: "Structure: Receiver + 被 (+ Agent) + Verb + Other elements (e.g. 了, complements). The verb can NEVER stand alone.",
        contrastive_note: "Unlike English passive ('The cake was eaten'), Chinese 被 sentences traditionally convey adversity or negative impact, and strictly demand a result element after the verb.",
        analogy: "A passive spotlight on what happened to the victim or object.",
        mnemonic: "Passive 被 demands a result: never leave the verb alone!",
        how_to_use: [
          { step: 1, text: "Place the receiver/victim at the start." },
          { step: 2, text: "Insert 被 (agent is optional)." },
          { step: 3, text: "Action verb + completion marker 了 or result complement." }
        ],
        self_check: ["Is there a complement or 了 after the verb?"],
        tips: ["Negation (没) and modals (会, 能) must precede 被."],
        when_to_use: ["Expressing that something was broken, stolen, eaten, or affected."],
        when_not_to_use: ["Statival verbs like 是, 有, 认识 cannot be used with 被."],
        fatal_mistake: {
          wrong: "我的手机被偷。",
          correct: "我的手机被偷走了。",
          explanation: "In a 被 sentence, the verb must be followed by a complement or 了.",
          why_learners_make_it: "Translating English 'My phone was stolen' word-for-word."
        },
        extra_mistakes: []
      }
    },
    fill_template: {
      pattern: "我的 ___ 被 ___ ___ 了。",
      slots: [
        { vi: "Đồ vật bị tác động (xe đạp, bánh ngọt, ví tiền)", ja: "被害を受けた物", en: "Affected object" },
        { vi: "Tác nhân (em trai, kẻ trộm, gió)", ja: "動作主", en: "Agent" },
        { vi: "Động từ + Kết quả (ăn hết, thổi bay, lấy cắp)", ja: "動詞＋補語", en: "Verb + Result" }
      ],
      example_filled: "我的蛋糕被弟弟吃完了。"
    },
    collocations: [
      { zh: "被偷走了", pinyin: "bèi tōu zǒu le", meaning: { vi: "bị trộm mất rồi", ja: "盗まれた", en: "stolen away" } },
      { zh: "被打碎了", pinyin: "bèi dǎ suì le", meaning: { vi: "bị đánh vỡ rồi", ja: "割られた", en: "smashed" } },
      { zh: "被发现了", pinyin: "bèi fāxiàn le", meaning: { vi: "bị phát hiện rồi", ja: "見つかった", en: "discovered" } }
    ],
    examples: [
      {
        zh: "那辆自行车被小偷偷走了。",
        pinyin: "nà liàng zìxíngchē bèi xiǎotōu tōu zǒu le",
        tokens: [
          { hanzi: "那辆", pinyin: "nà liàng", han_viet: "na lượng", ja_kanji: "あの", false_friend_ja: null, gloss: { vi: "chiếc kia", ja: "あの", en: "that" }, block_role: "receiver" },
          { hanzi: "自行车", pinyin: "zìxíngchē", han_viet: "tự hành xa", ja_kanji: "自転車", false_friend_ja: null, gloss: { vi: "xe đạp", ja: "自転車", en: "bicycle" }, block_role: "receiver" },
          { hanzi: "被", pinyin: "bèi", han_viet: "bị", ja_kanji: "被", false_friend_ja: null, gloss: { vi: "bị", ja: "〜によって", en: "by" }, block_role: "passive_marker" },
          { hanzi: "小偷", pinyin: "xiǎotōu", han_viet: "tiểu thâu", ja_kanji: "泥棒", false_friend_ja: null, gloss: { vi: "kẻ trộm", ja: "泥棒", en: "thief" }, block_role: "agent" },
          { hanzi: "偷", pinyin: "tōu", han_viet: "thâu", ja_kanji: "盗む", false_friend_ja: null, gloss: { vi: "trộm", ja: "盗む", en: "steal" }, block_role: "verb" },
          { hanzi: "走了", pinyin: "zǒu le", han_viet: "tẩu liễu", ja_kanji: "去った", false_friend_ja: null, gloss: { vi: "mất rồi", ja: "〜てしまった", en: "away" }, block_role: "complement" }
        ],
        scenario: { vi: "Báo cáo sự việc mất cắp", ja: "盗難被害の報告", en: "Reporting a stolen bicycle" },
        translations: { vi: "Chiếc xe đạp kia bị kẻ trộm lấy cắp mất rồi.", ja: "あの自転車は泥棒に盗まれてしまいました。", en: "That bicycle was stolen away by a thief." },
        literal_en: "That bicycle by thief steal away LE.",
        tone_tip: { vi: "bèi thanh 4 dứt khoát.", ja: "「被」は第4声。", en: "bèi is 4th tone." },
        word_order_diff: { vi: "Tương tự tiếng Việt: xe đạp bị trộm lấy cắp mất rồi.", ja: "日本語の「泥棒に盗まれた」と同様。", en: "Receiver + 被 + Agent + Verb + Result." },
        note: { vi: "走了 là bổ ngữ xu hướng biểu thị sự rời đi/mất đi.", ja: "「走」は去り去ることを表す補語。", en: "走了 indicates separation/loss." }
      }
    ],
    dialogue: {
      goal: { vi: "Hỏi về chiếc bánh kem", ja: "ケーキの行方を聞く", en: "Asking about the cake" },
      lines: [
        { speaker: "A", zh: "冰箱里的蛋糕呢？", pinyin: "Bīngxiāng lǐ de dàngāo ne?", tr: { vi: "Bánh kem trong tủ lạnh đâu rồi?", ja: "冷蔵庫の中のケーキは？", en: "Where is the cake in the fridge?" } },
        { speaker: "B", zh: "已经被弟弟吃光了。", pinyin: "Yǐjīng bèi dìdi chī guāng le.", tr: { vi: "Đã bị em trai ăn sạch rồi.", ja: "もう弟に全部食べられちゃったよ。", en: "It has already been eaten up by younger brother." } }
      ]
    },
    puzzles: [
      { scrambled_tokens: ["吃了", "被", "苹果", "他"], correct_order: ["苹果", "被", "他", "吃了"] }
    ],
    fill_blank: [
      {
        sentence: "杯子不小心 ___ 他打碎了。",
        options: ["被", "把", "在", "给"],
        answer_index: 0,
        trap_for: ["vi"],
        explanation: { vi: "Cốc là vật chịu tác động bị làm vỡ, dùng câu chữ 被.", ja: "コップが割られた受動文なので「被」を用います。", en: "The cup received the action of breaking, requiring passive 被." }
      }
    ],
    error_correction: [
      {
        wrong: "我的书被他拿。",
        correct: "我的书被他拿走了。",
        hint: { vi: "Động từ trong câu chữ 被 có được đứng trơ trọi một mình không?", ja: "「被」構文の動詞の後ろには何が必要ですか？", en: "What must be added after the verb in a 被 passive sentence?" }
      }
    ],
    quiz: [
      {
        question: { vi: "Đặc điểm bắt buộc của động từ trong câu chữ 被 là gì?", ja: "「被」構文の動詞に必要な条件は？", en: "What is an essential requirement for the verb in a 被 sentence?" },
        options: ["Động từ phải đứng một mình.", "Động từ phải có thành phần kết quả/bổ ngữ/chữ 了 đi kèm.", "Động từ phải là tính từ.", "Không cần động từ."],
        answer_index: 1,
        trap_for: ["vi", "en"],
        explanation: { vi: "Trong câu chữ 被, động từ không bao giờ được đứng trơ trọi mà phải có thành phần kết quả đi kèm.", ja: "動詞単体では使えず、補語や「了」が必要です。", en: "The verb cannot stand alone; it must have a result, complement, or 了." }
      }
    ],
    summary_card: {
      one_liner: { vi: "Bị/được tác động dùng 被; động từ BẮT BUỘC phải có thành phần kết quả đi kèm!", ja: "受け身は「被」！動詞の後に必ず補語や「了」を伴う！", en: "Use 被 for passive voice; the verb MUST be accompanied by a result or 了!" },
      remember: [
        { vi: "Không để động từ đứng trơ trọi một mình trong câu chữ 被.", ja: "「被」構文で動詞を単独で終わらせない。", en: "Never leave the verb alone in a 被 sentence." }
      ]
    },
    needs_review: false,
    review_note: ""
  }
];

// Merge without duplicate IDs
const existingIds = new Set(currentSamples.map(x => x.id));
let addedCount = 0;

NEW_GRAMMAR_ITEMS.forEach(item => {
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

// Update grammar-data.js bundle
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
console.log(`🎉 Expansion completed: +${addedCount} rich lessons added!`);

