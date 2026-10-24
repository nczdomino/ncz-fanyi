// js/data/dict-synsets.js - Semantic Word Mindmaps & Nuance Hierarchies
// Maps emotional concepts, life themes, and communication intents to 4 tiers:
// 1. HSK 1-2 (Cơ bản / Nền tảng)
// 2. HSK 3-5 (Nâng cao / Trung cấp)
// 3. HSK 6 / 成语 (Thành ngữ / Biểu cảm sâu sắc)
// 4. Slang / Khẩu ngữ Gen Z (Thực chiến / Xu hướng mạng)

const DICT_SYNSETS = [
  {
    id: "love",
    title: { vi: "Tình cảm & Yêu thương", en: "Love & Affection", ja: "愛と感情" },
    icon: "💖",
    keywords: ["yeu", "thich", "tinh cam", "love", "like", "crush", "fond", "romance", "愛", "好き", "恋", "恋人"],
    tiers: [
      {
        level: "HSK 1-2",
        label: { vi: "Cơ bản", en: "Basic", ja: "基本" },
        words: [
          { zh: "喜欢", py: "xǐ huan", vi: "Thích, yêu thích", en: "like" },
          { zh: "爱", py: "ài", vi: "Yêu sâu đậm", en: "love" },
        ]
      },
      {
        level: "HSK 3-5",
        label: { vi: "Nâng cao", en: "Intermediate", ja: "中級" },
        words: [
          { zh: "热爱", py: "rè ài", vi: "Yêu nồng nhiệt, say mê", en: "ardently love" },
          { zh: "钟爱", py: "zhōng ài", vi: "Dành trọn tình yêu, thiên vị", en: "cherish" },
          { zh: "偏爱", py: "piān ài", vi: "Thiên vị, ưu ái đặc biệt", en: "favor" },
        ]
      },
      {
        level: "HSK 6 / 成语",
        label: { vi: "Thành ngữ", en: "Idioms", ja: "成語" },
        words: [
          { zh: "一见钟情", py: "yí jiàn zhōng qíng", vi: "Yêu từ cái nhìn đầu tiên (Nhất kiến chung tình)", en: "love at first sight" },
          { zh: "情有独钟", py: "qíng yǒu dú zhōng", vi: "Chỉ dành trọn tình cảm cho một người", en: "only have eyes for" },
          { zh: "相濡以沫", py: "xiāng rú yǐ mò", vi: "Đồng cam cộng khổ, hoạn nạn có nhau", en: "mutual support in difficulty" },
        ]
      },
      {
        level: "Slang Gen Z",
        label: { vi: "Từ lóng / Giới trẻ", en: "Trendy Slang", ja: "若者言葉" },
        words: [
          { zh: "嗑CP", py: "kē CP", vi: "Đẩy thuyền, chèo thuyền cặp đôi", en: "shipping a couple" },
          { zh: "恋爱脑", py: "liàn ài nǎo", vi: "Não yêu đương, lụy tình mù quáng", en: "love-struck brain" },
          { zh: "上头", py: "shàng tóu", vi: "Say đắm, mê mệt đến mất kiểm soát", en: "infatuated / high" },
        ]
      }
    ]
  },
  {
    id: "sadness",
    title: { vi: "Nỗi buồn & Đau lòng", en: "Sadness & Heartache", ja: "悲しみと辛さ" },
    icon: "💧",
    keywords: ["buon", "dau long", "khoc", "that vong", "sad", "sadness", "cry", "grief", "heartbroken", "悲しい", "辛い", "泣く", "失望"],
    tiers: [
      {
        level: "HSK 1-2",
        label: { vi: "Cơ bản", en: "Basic", ja: "基本" },
        words: [
          { zh: "难过", py: "nán guò", vi: "Buồn rầu, khó chịu trong lòng", en: "sad / feeling unwell" },
          { zh: "哭", py: "kū", vi: "Khóc", en: "cry" },
        ]
      },
      {
        level: "HSK 3-5",
        label: { vi: "Nâng cao", en: "Intermediate", ja: "中級" },
        words: [
          { zh: "伤心", py: "shāng xīn", vi: "Tổn thương tâm can, đau lòng", en: "heartbroken" },
          { zh: "悲伤", py: "bēi shāng", vi: "Đau buồn, bi thương", en: "sorrowful" },
          { zh: "沮丧", py: "jǔ sàng", vi: "Chán nản, nhụt chí", en: "depressed / dejected" },
        ]
      },
      {
        level: "HSK 6 / 成语",
        label: { vi: "Thành ngữ", en: "Idioms", ja: "成語" },
        words: [
          { zh: "痛不欲生", py: "tòng bú yù shēng", vi: "Đau đớn đến mức không thiết sống", en: "grieved beyond endurance" },
          { zh: "悲痛欲绝", py: "bēi tòng yù jué", vi: "Bi thương tột cùng, ngất lịm", en: "extreme sorrow" },
          { zh: "愁眉苦脸", py: "chóu méi kǔ liǎn", vi: "Mặt ủ mày chau, ủ rũ", en: "with a gloomy countenance" },
        ]
      },
      {
        level: "Slang Gen Z",
        label: { vi: "Từ lóng / Giới trẻ", en: "Trendy Slang", ja: "若者言葉" },
        words: [
          { zh: "破防", py: "pò fáng", vi: "Vỡ phòng thủ, cảm xúc sụp đổ vì quá đau", en: "emotional breakdown" },
          { zh: "扎心", py: "zhā xīn", vi: "Như dao cứa vào tim, quá đau nhói", en: "heart-piercing" },
          { zh: "emo", py: "emo", vi: "Rơi vào trầm cảm, buồn vu vơ trong đêm", en: "feeling emo" },
        ]
      }
    ]
  },
  {
    id: "food",
    title: { vi: "Ẩm thực & Thưởng thức", en: "Food & Dining Nuance", ja: "飲食と美食" },
    icon: "🍜",
    keywords: ["an", "uong", "am thuc", "ngon", "eat", "food", "dining", "delicious", "yummy", "tasty", "食べる", "食事", "おいしい", "料理"],
    tiers: [
      {
        level: "HSK 1-2",
        label: { vi: "Cơ bản", en: "Basic", ja: "基本" },
        words: [
          { zh: "吃", py: "chī", vi: "Ăn", en: "eat" },
          { zh: "好吃", py: "hǎo chī", vi: "Ngon miệng", en: "delicious" },
          { zh: "喝", py: "hē", vi: "Uống", en: "drink" },
        ]
      },
      {
        level: "HSK 3-5",
        label: { vi: "Nâng cao", en: "Intermediate", ja: "中級" },
        words: [
          { zh: "品尝", py: "pǐn cháng", vi: "Nếm thử, thưởng thức hương vị", en: "taste / savor" },
          { zh: "丰盛", py: "fēng shèng", vi: "Thịnh soạn, ê hề đồ ăn", en: "sumptuous" },
          { zh: "美味", py: "měi wèi", vi: "Mỹ vị, cao lương mỹ vị", en: "delicacy" },
        ]
      },
      {
        level: "HSK 6 / 成语",
        label: { vi: "Thành ngữ", en: "Idioms", ja: "成語" },
        words: [
          { zh: "垂涎三尺", py: "chuí xián sān chǐ", vi: "Thèm nhỏ dãi ba thước", en: "mouth-watering" },
          { zh: "大饱口福", py: "dà bǎo kǒu fú", vi: "Thỏa thuê thưởng thức món ngon", en: "feast one's stomach" },
          { zh: "狼吞虎咽", py: "láng tūn hǔ yàn", vi: "Ăn ngấu nghiến như sói như hổ", en: "gobble down" },
        ]
      },
      {
        level: "Slang Gen Z",
        label: { vi: "Từ lóng / Giới trẻ", en: "Trendy Slang", ja: "若者言葉" },
        words: [
          { zh: "干饭", py: "gàn fàn", vi: "Xới cơm nhiệt tình, chiến bữa hết mình", en: "enthusiastic eating" },
          { zh: "吃货", py: "chī huò", vi: "Tín đồ ăn uống, tâm hồn ăn uống", en: "foodie" },
          { zh: "炫饭", py: "xuàn fàn", vi: "Ăn lấy ăn để, nạp đồ ăn thần tốc", en: "binge eat" },
        ]
      }
    ]
  },
  {
    id: "work",
    title: { vi: "Công việc & Trạng thái làm việc", en: "Work & Career Nuance", ja: "仕事と働き方" },
    icon: "💼",
    keywords: ["cong viec", "lam viec", "tang ca", "sep", "luong", "work", "job", "career", "salary", "overtime", "仕事", "働く", "残業", "会社"],
    tiers: [
      {
        level: "HSK 1-2",
        label: { vi: "Cơ bản", en: "Basic", ja: "基本" },
        words: [
          { zh: "工作", py: "gōng zuò", vi: "Công việc, làm việc", en: "work / job" },
          { zh: "累", py: "lèi", vi: "Mệt", en: "tired" },
        ]
      },
      {
        level: "HSK 3-5",
        label: { vi: "Nâng cao", en: "Intermediate", ja: "中級" },
        words: [
          { zh: "加班", py: "jiā bān", vi: "Tăng ca, làm thêm giờ", en: "overtime" },
          { zh: "辞职", py: "cí zhí", vi: "Từ chức, nghỉ việc", en: "resign" },
          { zh: "效率", py: "xiào lǜ", vi: "Hiệu suất công việc", en: "efficiency" },
        ]
      },
      {
        level: "HSK 6 / 成语",
        label: { vi: "Thành ngữ", en: "Idioms", ja: "成語" },
        words: [
          { zh: "兢兢业业", py: "jīng jīng yè yè", vi: "Cần cù tận tụy, cẩn trọng hết mình", en: "cautious and conscientious" },
          { zh: "事半功倍", py: "shì bàn gōng bèi", vi: "Làm một nửa công sức, thu gấp đôi kết quả", en: "twice the result with half effort" },
          { zh: "筋疲力尽", py: "jīn pí lì jìn", vi: "Sức cùng lực kiệt vì quá mệt", en: "exhausted" },
        ]
      },
      {
        level: "Slang Gen Z",
        label: { vi: "Từ lóng / Giới trẻ", en: "Trendy Slang", ja: "若者言葉" },
        words: [
          { zh: "打工人", py: "dǎ gōng rén", vi: "Kiếp làm thuê, người làm công", en: "wage earner / working stiff" },
          { zh: "躺平", py: "tǎng píng", vi: "Nằm yên mặc kệ đời, ngừng bon chen", en: "lie flat" },
          { zh: "摸鱼", py: "mō yú", vi: "Trốn việc trong giờ làm, lướt web trộm", en: "slack off at work" },
          { zh: "内卷", py: "nèi juǎn", vi: "Cạnh tranh khốc liệt triệt tiêu nhau", en: "involution" },
        ]
      }
    ]
  },
  {
    id: "beauty",
    title: { vi: "Vẻ đẹp & Ngoại hình", en: "Beauty & Appearance", ja: "美しさと容姿" },
    icon: "✨",
    keywords: ["dep", "xinh", "xinh dep", "de thuong", "beautiful", "pretty", "handsome", "cute", "gorgeous", "綺麗", "美しい", "可愛い", "イケメン"],
    tiers: [
      {
        level: "HSK 1-2",
        label: { vi: "Cơ bản", en: "Basic", ja: "基本" },
        words: [
          { zh: "好看", py: "hǎo kàn", vi: "Đẹp, ưa nhìn", en: "good-looking" },
          { zh: "漂亮", py: "piào liang", vi: "Xinh đẹp", en: "pretty / beautiful" },
        ]
      },
      {
        level: "HSK 3-5",
        label: { vi: "Nâng cao", en: "Intermediate", ja: "中級" },
        words: [
          { zh: "美丽", py: "měi lì", vi: "Mỹ miều, đẹp đẽ", en: "beautiful" },
          { zh: "帅气", py: "shuài qì", vi: "Soái khí, đẹp trai phong độ", en: "handsome / dashing" },
          { zh: "迷人", py: "mí rén", vi: "Mê hồn, cuốn hút khó cưỡng", en: "charming / enchanting" },
        ]
      },
      {
        level: "HSK 6 / 成语",
        label: { vi: "Thành ngữ", en: "Idioms", ja: "成語" },
        words: [
          { zh: "沉鱼落雁", py: "chén yú luò yàn", vi: "Trầm ngư lạc nhạn (Cá lặn chim sa)", en: "drop-dead gorgeous" },
          { zh: "闭月羞花", py: "bì yuè xiū huā", vi: "Bế nguyệt tu hoa (Hoa thẹn trăng nhường)", en: "surpassing beauty" },
          { zh: "眉清目秀", py: "méi qīng mù xiù", vi: "Mày thanh mắt tú, gương mặt thanh tú", en: "delicate features" },
        ]
      },
      {
        level: "Slang Gen Z",
        label: { vi: "Từ lóng / Giới trẻ", en: "Trendy Slang", ja: "若者言葉" },
        words: [
          { zh: "颜值爆表", py: "yán zhí bào biǎo", vi: "Nhan sắc bùng nổ, đẹp đỉnh nóc", en: "sky-high face value" },
          { zh: "小鲜肉", py: "xiǎo xiān ròu", vi: "Tiểu thịt tươi, chàng trai trẻ đẹp mơn mởn", en: "handsome young guy" },
          { zh: "绝绝子", py: "jué jué zi", vi: "Đỉnh chóp, xịn sò không lối thoát", en: "super amazing" },
        ]
      }
    ]
  },
  {
    id: "study",
    title: { vi: "Học tập & Tri thức", en: "Study & Knowledge", ja: "学習と知識" },
    icon: "📚",
    keywords: ["hoc", "hoc tap", "thi", "diem cao", "study", "learn", "exam", "knowledge", "smart", "勉強", "学ぶ", "試験", "知識"],
    tiers: [
      {
        level: "HSK 1-2",
        label: { vi: "Cơ bản", en: "Basic", ja: "基本" },
        words: [
          { zh: "学习", py: "xué xí", vi: "Học tập", en: "study / learn" },
          { zh: "读", py: "dú", vi: "Đọc", en: "read" },
          { zh: "写", py: "xiě", vi: "Viết", en: "write" },
        ]
      },
      {
        level: "HSK 3-5",
        label: { vi: "Nâng cao", en: "Intermediate", ja: "中級" },
        words: [
          { zh: "掌握", py: "zhǎng wò", vi: "Nắm vững kiến thức / kỹ năng", en: "master / grasp" },
          { zh: "复习", py: "fù xí", vi: "Ôn tập kiến thức cũ", en: "review" },
          { zh: "勤奋", py: "qín fèn", vi: "Cần cù, chăm chỉ học", en: "diligent" },
        ]
      },
      {
        level: "HSK 6 / 成语",
        label: { vi: "Thành ngữ", en: "Idioms", ja: "成語" },
        words: [
          { zh: "废寝忘食", py: "fèi qǐn wàng shí", vi: "Quên ăn quên ngủ để học / làm", en: "forget food and sleep" },
          { zh: "悬梁刺股", py: "xuán liáng cì gǔ", vi: "Treo tóc lên xà, dùi đâm vào đùi học", en: "painstaking study" },
          { zh: "孜孜不倦", py: "zī zī bú juàn", vi: "Miệt mài không biết mệt mỏi", en: "tireless diligence" },
        ]
      },
      {
        level: "Slang Gen Z",
        label: { vi: "Từ lóng / Giới trẻ", en: "Trendy Slang", ja: "若者言葉" },
        words: [
          { zh: "学霸", py: "xué bà", vi: "Học bá, cao thủ học tập điểm số đỉnh cao", en: "straight-A student" },
          { zh: "学渣", py: "xué zhā", vi: "Học tra, kẻ lười học hoặc điểm kém", en: "bad student" },
          { zh: "卷王", py: "juǎn wáng", vi: "Vua cày bừa, người học/làm điên cuồng ép người khác", en: "king of overachieving" },
        ]
      }
    ]
  }
];

function findMatchingSynset(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  const qNoTone = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(q) : q;

  for (const item of DICT_SYNSETS) {
    const matched = item.keywords.some(k => {
      const kClean = k.toLowerCase();
      return kClean === q || kClean === qNoTone || q.includes(kClean) || qNoTone.includes(kClean) || kClean.includes(qNoTone);
    });
    if (matched) return item;
  }
  return null;
}

if (typeof window !== 'undefined') {
  window.DICT_SYNSETS = DICT_SYNSETS;
  window.findMatchingSynset = findMatchingSynset;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DICT_SYNSETS,
    findMatchingSynset,
  };
}

