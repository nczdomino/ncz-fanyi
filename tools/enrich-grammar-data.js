const fs = require('fs');
const path = require('path');

const PINYIN_MAP = {
  hsk1_shi: 'shì',
  hsk1_you: 'yǒu / méiyǒu',
  hsk1_zai_location: 'zài',
  hsk1_ma_question: 'ma',
  hsk1_tai_le: 'tài...le',
  hsk1_time_order: 'shíjiān',
  hsk1_gen_with: 'gēn...yìqǐ',
  hsk1_ne_question: 'ne',
  hsk1_hui_ability: 'huì',
  hsk1_de_possessive: 'de',
  hsk2_guo_experience: 'guò',
  hsk2_bi_comparison: 'bǐ',
  hsk2_zhe_state: 'zhe',
  hsk2_kuai_le: 'kuàiyào...le',
  hsk2_yue_lai_yue: 'yuèláiyuè',
  hsk2_dong_jie_guo: 'wán / dǒng / dào',
  hsk2_lai_qu_direction: 'lái / qù',
  hsk2_shi_de_emphasis: 'shì...de',
  hsk2_shi_jian_duan: 'shíjiānduàn',
  hsk2_yao_le_immediate: 'jiùyào...le',
  hsk3_ba_sentence: 'bǎ',
  hsk3_bei_passive: 'bèi',
  hsk3_you_you: 'yòu...yòu...',
  hsk3_sui_ran_dan_shi: 'suīrán...dànshì...',
  hsk3_bu_dan_er_qie: 'búdàn...érqiě...',
  hsk3_de_degree: 'de',
  hsk3_yi_bian_yi_bian: 'yìbiān...yìbiān...',
  hsk3_yue_yue: 'yuè...yuè...',
  hsk3_chu_le_yi_wai: 'chúle...yǐwài',
  hsk3_yi_jiu: 'yī...jiù...'
};

const TITLES_MAP = {
  hsk1_shi: {
    vi: 'Câu chữ 是 (A là B)',
    en: 'The 是 (shì) Sentence: A is B',
    ja: '「是」構文：AはBです'
  },
  hsk1_you: {
    vi: 'Có & Không có (有 / 没有)',
    en: 'Possession with 有 & 没有',
    ja: '所有を表す「有／没有」'
  },
  hsk1_zai_location: {
    vi: 'Ở đâu làm gì (在 + Địa điểm + Động từ)',
    en: 'Action at a Place (在 + Location + Verb)',
    ja: '場所で行う動作（在＋場所＋動詞）'
  },
  hsk1_ma_question: {
    vi: 'Câu hỏi Có/Không với trợ từ 吗',
    en: 'Yes-No Questions with 吗 (ma)',
    ja: '疑問助詞「吗」（〜ですか？）'
  },
  hsk1_tai_le: {
    vi: 'Câu cảm thán: Quá... rồi! (太...了)',
    en: 'Exclamations: Too / Extremely (太...了)',
    ja: '感嘆表現（太＋形容詞＋了）'
  },
  hsk1_time_order: {
    vi: 'Trật tự từ: Thời gian đứng trước hành động',
    en: 'Word Order: Time before action',
    ja: '語順ルール：時間詞を動詞の前に置く'
  },
  hsk1_gen_with: {
    vi: 'Làm gì cùng ai (跟 / 和 + Ai + 一起 + Động từ)',
    en: 'Doing things with someone (跟...一起)',
    ja: '誰かと一緒に行う動作（跟…一起）'
  },
  hsk1_ne_question: {
    vi: 'Câu hỏi tỉnh lược (Còn... thì sao? / ...ở đâu?)',
    en: 'Follow-up Questions (How about...? / Where is...?)',
    ja: '簡潔な聞き返し（〜は？／〜はどこ？）'
  },
  hsk1_hui_ability: {
    vi: 'Biết làm gì qua rèn luyện (会 + Động từ)',
    en: 'Learned Skills & Abilities (会 + Verb)',
    ja: '習得したスキルを表す（会＋動詞）'
  },
  hsk1_de_possessive: {
    vi: 'Sở hữu & Bổ nghĩa danh từ (...的 + Danh từ)',
    en: 'Possession & Modification with 的 (de)',
    ja: '所有・修飾の構造助詞「的」（〜の…）'
  },
  hsk2_guo_experience: {
    vi: 'Từng làm gì trong quá khứ (V + 过)',
    en: 'Past Experience: Have done before (V + 过)',
    ja: '過去の経験（動詞＋过：〜したことがある）'
  },
  hsk2_bi_comparison: {
    vi: 'So sánh hơn kém với chữ 比 (A hơn B)',
    en: 'Comparisons with 比 (A is more... than B)',
    ja: '比較文「A 比 B ＋形容詞」（AはBより〜）'
  },
  hsk2_zhe_state: {
    vi: 'Trạng thái đang duy trì (Động từ + 着)',
    en: 'Ongoing States with 着 (zhe)',
    ja: '状態の持続（動詞＋着：〜している）'
  },
  hsk2_kuai_le: {
    vi: 'Sắp sửa xảy ra (快要...了 / 要...了)',
    en: 'Imminent Actions: About to happen (快要...了)',
    ja: '近未来の出来事（もうすぐ〜する：快要…了）'
  },
  hsk2_yue_lai_yue: {
    vi: 'Càng ngày càng... (越来越 + Tính từ)',
    en: 'More and More: Progressive Change (越来越)',
    ja: '漸進的な変化（ますます〜：越来越）'
  },
  hsk2_dong_jie_guo: {
    vi: 'Bổ ngữ kết quả: Làm xong, hiểu, đạt được (完/懂/见/到)',
    en: 'Result Complements: Finished, understood (完/懂/见/到)',
    ja: '結果補語（〜し終わる・分かる・届く：完/懂/见/到）'
  },
  hsk2_lai_qu_direction: {
    vi: 'Bổ ngữ xu hướng đơn: Lại gần / Đi xa (V + 来/去)',
    en: 'Directional Complements: Coming / Going (来 / 去)',
    ja: '単純方向補語（話者に近づく「来」・遠ざかる「去」）'
  },
  hsk2_shi_de_emphasis: {
    vi: 'Nhấn mạnh thời gian, địa điểm, cách thức (是...的)',
    en: 'Emphasis on Time, Place, or Manner (是...的)',
    ja: '時間・場所・手段の強調「是…的」構文'
  },
  hsk2_shi_jian_duan: {
    vi: 'Thời lượng hành động: Đã làm trong bao lâu (时量补语)',
    en: 'Action Duration: How long an action lasted',
    ja: '動作の継続時間を表す時量補語（〜時間〜した）'
  },
  hsk2_yao_le_immediate: {
    vi: 'Sắp sửa diễn ra ngay (Có mốc thời gian cụ thể: 就要...了)',
    en: 'Action about to happen at a specific time (就要...了)',
    ja: '特定の日時を伴う近未来表現（もうすぐ〜する：就要…了）'
  },
  hsk3_ba_sentence: {
    vi: 'Câu chữ 把: Tác động xử lý vật (把字句)',
    en: 'The 把 (bǎ) Disposal Sentence Structure',
    ja: '処置を表す「把」構文（目的語を〜する）'
  },
  hsk3_bei_passive: {
    vi: 'Câu bị động chữ 被: Bị / Được tác động (被字句)',
    en: 'Passive Voice with 被 (bèi)',
    ja: '受身を表す「被」構文（〜に…される）'
  },
  hsk3_you_you: {
    vi: 'Vừa... lại vừa... (Đồng thời có 2 đặc tính: 又...又...)',
    en: 'Both... and... (Dual characteristics: 又...又...)',
    ja: '並列を表す「又…又…」（〜でもあり…でもある）'
  },
  hsk3_sui_ran_dan_shi: {
    vi: 'Tuy rằng... nhưng mà... (Quan hệ chuyển ngoặt: 虽然...但是...)',
    en: 'Although... but... (Contrast: 虽然...但是...)',
    ja: '逆接の接続「虽然…但是…」（〜だけれども…）'
  },
  hsk3_bu_dan_er_qie: {
    vi: 'Không những... mà còn... (Tăng tiến: 不但...而且...)',
    en: 'Not only... but also... (Progression: 不但...而且...)',
    ja: '累加の接続「不但…而且…」（〜だけでなく…も）'
  },
  hsk3_de_degree: {
    vi: 'Bổ ngữ trạng thái: Đánh giá cách làm (V + 得 + Tính từ)',
    en: 'State/Degree Complements: Evaluating action (V + 得 + Adj)',
    ja: '様態補語（動詞＋得＋形容詞：〜の仕方が…だ）'
  },
  hsk3_yi_bian_yi_bian: {
    vi: 'Vừa làm việc này vừa làm việc kia (Đồng thời: 一边...一边...)',
    en: 'Simultaneous Actions: While doing... (一边...一边...)',
    ja: '動作の同時進行「一边…一边…」（〜しながら…する）'
  },
  hsk3_yue_yue: {
    vi: 'Càng... càng... (Tương quan tỉ lệ thuận: 越...越...)',
    en: 'The more... the more... (Proportional change: 越...越...)',
    ja: '相関変化「越…越…」（〜すればするほど…）'
  },
  hsk3_chu_le_yi_wai: {
    vi: 'Ngoài... ra (Bổ sung hoặc loại trừ: 除了...以外)',
    en: 'Besides / Except for (Inclusion or Exclusion: 除了...以外)',
    ja: '付加と除外「除了…以外」（〜のほかに／〜を除いて）'
  },
  hsk3_yi_jiu: {
    vi: 'Hễ... là liền... (Hành động kế tiếp ngay: 一...就...)',
    en: 'As soon as... then... (Immediate action: 一...就...)',
    ja: '即時完了「一…就…」（〜するとすぐ…）'
  }
};

const catalogPath = path.join(__dirname, '../js/data/hsk_catalog_2.0_3.0_all_levels.json');
const samplesPath = path.join(__dirname, '../js/data/hsk_grammar_generated_samples.json');
const bundlePath = path.join(__dirname, '../js/data/grammar-data.js');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const samples = JSON.parse(fs.readFileSync(samplesPath, 'utf8'));

// 1. Update Catalog
catalog.forEach(item => {
  if (PINYIN_MAP[item.id]) {
    item.pinyin = PINYIN_MAP[item.id];
  }
  if (TITLES_MAP[item.id]) {
    item.vi_name = TITLES_MAP[item.id].vi;
    item.en_name = TITLES_MAP[item.id].en;
    item.ja_name = TITLES_MAP[item.id].ja;
  }
});

// 2. Update Samples
samples.forEach(sample => {
  if (PINYIN_MAP[sample.id]) {
    sample.pinyin = PINYIN_MAP[sample.id];
  }
  if (TITLES_MAP[sample.id]) {
    if (!sample.localizations) sample.localizations = {};
    if (!sample.localizations.vi) sample.localizations.vi = {};
    if (!sample.localizations.en) sample.localizations.en = {};
    if (!sample.localizations.ja) sample.localizations.ja = {};

    sample.localizations.vi.title = TITLES_MAP[sample.id].vi;
    sample.localizations.en.title = TITLES_MAP[sample.id].en;
    sample.localizations.ja.title = TITLES_MAP[sample.id].ja;
  }
});

// Save updated JSONs
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
fs.writeFileSync(samplesPath, JSON.stringify(samples, null, 2), 'utf8');

// 3. Save bundled JS
const bundledContent = `/**
 * grammar-data.js
 * 
 * Auto-generated bundled HSK Grammar dataset for Halou.
 * Contains 30 curated grammar structures across Stages 1 to 6 (HSK 1, 2, 3).
 * Fully synchronized with Pinyin and tri-lingual definitions (vi, en, ja).
 */

const HSK_GRAMMAR_CATALOG = ${JSON.stringify(catalog, null, 2)};

const HSK_GRAMMAR_SAMPLES = ${JSON.stringify(samples, null, 2)};

if (typeof window !== 'undefined') {
  window.HSK_GRAMMAR_CATALOG = HSK_GRAMMAR_CATALOG;
  window.HSK_GRAMMAR_SAMPLES = HSK_GRAMMAR_SAMPLES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HSK_GRAMMAR_CATALOG,
    HSK_GRAMMAR_SAMPLES
  };
}
`;

fs.writeFileSync(bundlePath, bundledContent, 'utf8');
console.log('✅ Successfully enriched Catalog, Samples, and grammar-data.js with Pinyin and refined Tri-lingual Titles!');
