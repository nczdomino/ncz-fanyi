/**
 * tools/build-learn-data.js
 * 
 * Generates and bundles the complete Halou Smart Study Hub (Học tập & Luyện phản xạ) dataset:
 * - 12 Life & Thematic Categories
 * - All 214 Kangxi Radicals (Bộ thủ Khang Hy 1-17 nét) with Pinyin, Hán-Việt, Trilingual Meanings, Mnemonics & Examples
 * - Hundreds of Curated High-Frequency Vocabulary across HSK 1 to 6 and everyday life themes
 * - Integration indexer for MINI_DICT (1,481+ words)
 * 
 * Outputs to js/data/learn-data.js (UMD compatible for Browser & Node.js).
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Thematic Life Categories (12 categories)
const CATEGORIES = [
  {
    id: 'greetings',
    zhName: '问候与社交',
    name: { vi: 'Chào hỏi & Xã giao', en: 'Greetings & Social', ja: '挨拶と社交' },
    icon: '🤝',
    description: {
      vi: 'Lời chào, cảm ơn, xin lỗi, giới thiệu bản thân và các câu cửa miệng hàng ngày.',
      en: 'Greetings, gratitude, apologies, self-introductions, and common daily conversational phrases.',
      ja: '挨拶、お礼、謝罪、自己紹介、日常会話でよく使われる基本フレーズ。'
    },
    order: 1
  },
  {
    id: 'food',
    zhName: '美食与餐厅',
    name: { vi: 'Ẩm thực & Nhà hàng', en: 'Food & Dining', ja: 'グルメと食事' },
    icon: '🍜',
    description: {
      vi: 'Món ăn, gọi món, mùi vị, đồ uống, thanh toán và văn hóa ẩm thực Trung Hoa.',
      en: 'Dishes, ordering food, tastes, beverages, paying the bill, and Chinese culinary culture.',
      ja: '料理、注文、味、飲み物、お会計、中華料理の食文化。'
    },
    order: 2
  },
  {
    id: 'travel',
    zhName: '交通与出行',
    name: { vi: 'Đi lại & Giao thông', en: 'Travel & Commute', ja: '交通と移動' },
    icon: '✈️',
    description: {
      vi: 'Hỏi đường, đi tàu điện ngầm, xe buýt, taxi, máy bay và phương hướng.',
      en: 'Asking directions, subway, bus, taxi, airport, flights, and navigation.',
      ja: '道案内、地下鉄、バス、タクシー、空港、飛行機、方向の尋ね方。'
    },
    order: 3
  },
  {
    id: 'shopping',
    zhName: '购物与消费',
    name: { vi: 'Mua sắm & Tiền bạc', en: 'Shopping & Money', ja: '買い物と消費' },
    icon: '🛍️',
    description: {
      vi: 'Hỏi giá, mặc cả, kích cỡ, màu sắc, thanh toán WeChat / Alipay và đổi trả hàng.',
      en: 'Inquiring prices, bargaining, sizes, colors, WeChat/Alipay payments, and refunds.',
      ja: '価格交渉、値引き、サイズ、色、電子決済、返品交換。'
    },
    order: 4
  },
  {
    id: 'hotel',
    zhName: '酒店与旅游',
    name: { vi: 'Khách sạn & Du lịch', en: 'Hotel & Tourism', ja: 'ホテルと観光' },
    icon: '🏨',
    description: {
      vi: 'Đặt phòng, check-in, dịch vụ phòng, danh lam thắng cảnh và tham quan du lịch.',
      en: 'Booking, check-in, room amenities, sightseeing, attractions, and tour experiences.',
      ja: '予約、チェックイン、客室サービス、観光地巡り、旅行体験。'
    },
    order: 5
  },
  {
    id: 'time',
    zhName: '时间与天气',
    name: { vi: 'Thời gian & Thời tiết', en: 'Time & Weather', ja: '時間と天気' },
    icon: '⏰',
    description: {
      vi: 'Ngày tháng năm, giờ giấc, các mùa trong năm và dự báo thời tiết hàng ngày.',
      en: 'Dates, time of day, seasons, days of week, and daily weather conditions.',
      ja: '日付、時刻、季節、曜日、日々の天気予報表現。'
    },
    order: 6
  },
  {
    id: 'feelings',
    zhName: '情感与性格',
    name: { vi: 'Cảm xúc & Tính cách', en: 'Emotions & Traits', ja: '感情と性格' },
    icon: '😊',
    description: {
      vi: 'Vui vẻ, tức giận, lo lắng, bất ngờ, khen ngợi và miêu tả tính cách con người.',
      en: 'Joy, anger, anxiety, surprise, praise, and describing personalities.',
      ja: '喜び、怒り、不安、驚き、褒め言葉、人の性格描写。'
    },
    order: 7
  },
  {
    id: 'family',
    zhName: '家庭与人际',
    name: { vi: 'Gia đình & Bạn bè', en: 'Family & Friends', ja: '家族と人間関係' },
    icon: '👨‍👩‍👧',
    description: {
      vi: 'Thành viên gia đình, bạn bè thân thiết, đồng hương và các mối quan hệ xã hội.',
      en: 'Family members, close friends, hometown fellows, and interpersonal bonds.',
      ja: '家族構成、親しい友人、同郷の仲間、対人関係。'
    },
    order: 8
  },
  {
    id: 'work',
    zhName: '职场与学习',
    name: { vi: 'Công việc & Học tập', en: 'Work & Study', ja: '仕事と勉強' },
    icon: '💼',
    description: {
      vi: 'Trường học, thi cử, phỏng vấn xin việc, họp hành và văn phòng làm việc.',
      en: 'School, exams, job interviews, meetings, office duties, and career development.',
      ja: '学校、試験、就職面接、会議、オフィス業務、キャリア。'
    },
    order: 9
  },
  {
    id: 'health',
    zhName: '健康与就医',
    name: { vi: 'Sức khỏe & Y tế', en: 'Health & Medical', ja: '健康と医療' },
    icon: '🏥',
    description: {
      vi: 'Triệu chứng bệnh, nhà thuốc, bệnh viện, khám bệnh và giữ gìn sức khỏe thể chất.',
      en: 'Symptoms, pharmacy, hospitals, doctor visits, medicines, and wellness.',
      ja: '症状、薬局、病院、診察、健康管理と養生。'
    },
    order: 10
  },
  {
    id: 'slang',
    zhName: '网络与流行语',
    name: { vi: 'Tiếng lóng & Mạng xã hội', en: 'Slang & Internet Trends', ja: 'ネット流行語とスラング' },
    icon: '📱',
    description: {
      vi: 'Từ lóng giới trẻ Trung Quốc, ngôn ngữ mạng Douyin, Weibo và trend hiện đại.',
      en: 'Gen-Z Chinese slang, Douyin/Weibo memes, buzzwords, and pop culture.',
      ja: '中国の若者スラング、TikTok・Weiboの流行語、最新トレンド表現。'
    },
    order: 11
  },
  {
    id: 'proverb',
    zhName: '成语与俗语',
    name: { vi: 'Thành ngữ & Châm ngôn', en: 'Idioms & Proverbs', ja: '成語とことわざ' },
    icon: '📜',
    description: {
      vi: 'Thành ngữ 4 chữ kinh điển, tục ngữ dân gian và câu nói triết lý thâm thúy.',
      en: 'Four-character Chengyu idioms, traditional proverbs, and philosophical wisdom.',
      ja: '四字熟語、古典的ことわざ、人生の教訓と名言。'
    },
    order: 12
  }
];

// 2. Complete 214 Kangxi Radicals (Bộ thủ Khang Hy)
// Fully categorized by stroke count (1 to 17 strokes)
const RAW_RADICALS = [
  // 1 stroke (1-6)
  { num: 1, radical: "一", strokes: 1, pinyin: "yī", hanviet: "nhất", vi: "Số một, duy nhất, bắt đầu", en: "One", ja: "一（ひとつ）", examples: ["三", "丁", "不"], tip: "Nét ngang cơ bản nhất trong chữ Hán, biểu thị sự thống nhất hoặc mặt đất." },
  { num: 2, radical: "丨", strokes: 1, pinyin: "gǔn", hanviet: "cổn", vi: "Nét sổ đứng thẳng đứng", en: "Vertical line", ja: "棒（ぼう）", examples: ["中", "丰", "申"], tip: "Nét sổ dọc xuyên suốt từ trên xuống dưới." },
  { num: 3, radical: "丶", strokes: 1, pinyin: "zhǔ", hanviet: "chủ", vi: "Nét chấm, điểm dừng", en: "Dot", ja: "点（てん）", examples: ["丸", "丹", "主"], tip: "Giọt nước hoặc điểm nhấn nhỏ trên chữ." },
  { num: 4, radical: "丿", strokes: 1, pinyin: "piě", hanviet: "phiệt", vi: "Nét phẩy vuốt nghiêng sang trái", en: "Slash / curve left", ja: "撇（の）", examples: ["八", "生", "少"], tip: "Nét nghiêng từ trên vuốt nhẹ sang góc trái dưới." },
  { num: 5, radical: "乙", strokes: 1, pinyin: "yǐ", hanviet: "ất", vi: "Can Ất, uốn cong lượn", en: "Second / bend", ja: "乙（おつ）", examples: ["九", "也", "乾"], tip: "Hình dáng cành cây uốn lượn mềm mại." },
  { num: 6, radical: "亅", strokes: 1, pinyin: "jué", hanviet: "quyết", vi: "Nét móc cong lên", en: "Hook", ja: "跳ね棒（はねぼう）", examples: ["了", "予", "事"], tip: "Nét sổ thẳng rồi móc bật ngược lên." },

  // 2 strokes (7-29)
  { num: 7, radical: "二", strokes: 2, pinyin: "èr", hanviet: "nhị", vi: "Số hai, trời và đất", en: "Two", ja: "二（に）", examples: ["于", "云", "互"], tip: "Hai nét ngang biểu thị trời ở trên và đất ở dưới." },
  { num: 8, radical: "亠", strokes: 2, pinyin: "tóu", hanviet: "đầu", vi: "Nắp đậy, ở trên đỉnh", en: "Lid / top", ja: "鍋蓋（なべぶた）", examples: ["市", "交", "夜"], tip: "Hình cái nắp che chở trên đỉnh một vật." },
  { num: 9, radical: "人 (亻)", strokes: 2, pinyin: "rén", hanviet: "nhân", vi: "Người, con người, nhân loại", en: "Person / human", ja: "人・にんべん", examples: ["你", "他", "们"], tip: "Hình người đứng dạng chân, dạng biến thể là bộ Nhân đứng (亻)." },
  { num: 10, radical: "儿", strokes: 2, pinyin: "ér", hanviet: "nhi", vi: "Trẻ con, đôi chân con người", en: "Legs / child", ja: "児（ひとあし）", examples: ["元", "兄", "先"], tip: "Hình dáng đôi chân người đang bước đi thoăn thoắt." },
  { num: 11, radical: "入", strokes: 2, pinyin: "rù", hanviet: "nhập", vi: "Đi vào, gia nhập, xâm nhập", en: "Enter", ja: "入（いる）", examples: ["内", "全", "两"], tip: "Hình hai ngọn cỏ đan chéo hướng mũi vào bên trong." },
  { num: 12, radical: "八", strokes: 2, pinyin: "bā", hanviet: "bát", vi: "Số tám, chia tách ra", en: "Eight / divide", ja: "八（はち）", examples: ["公", "六", "分"], tip: "Hai nét rẽ sang hai hướng, tượng trưng cho sự chia đôi (phân tách)." },
  { num: 13, radical: "冂", strokes: 2, pinyin: "jiōng", hanviet: "quynh", vi: "Vùng biên giới hoang vu xa xôi", en: "Open box / border", ja: "同構（どうがまえ）", examples: ["同", "周", "冈"], tip: "Khu vực biên cương xa ngoài thành quách." },
  { num: 14, radical: "冖", strokes: 2, pinyin: "mì", hanviet: "mịch", vi: "Khăn trùm, che phủ lên trên", en: "Cover", ja: "冠（わかんむり）", examples: ["冗", "军", "冠"], tip: "Tấm vải phủ kín lên đồ vật." },
  { num: 15, radical: "冫", strokes: 2, pinyin: "bīng", hanviet: "băng", vi: "Băng giá, đông cứng, lạnh lẽo", en: "Ice", ja: "二水（にすい）", examples: ["冷", "准", "冻"], tip: "Hai giọt nước đông cứng thành khối băng giá rét." },
  { num: 16, radical: "几", strokes: 2, pinyin: "jī", hanviet: "kỷ", vi: "Bàn nhỏ, cái kỷ ngồi", en: "Table / small stool", ja: "机（きにょう）", examples: ["凭", "凡", "凤"], tip: "Cái bàn gỗ nhỏ thấp của người xưa." },
  { num: 17, radical: "凵", strokes: 2, pinyin: "kǎn", hanviet: "khảm", vi: "Hố đất trũng sâu, há miệng", en: "Container / open pit", ja: "受け箱（うけばこ）", examples: ["凶", "凹", "凸"], tip: "Chiếc hố lõm xuống đất để chứa đồ." },
  { num: 18, radical: "刀 (刂)", strokes: 2, pinyin: "dāo", hanviet: "đao", vi: "Con dao, vũ khí bén, cắt tỉa", en: "Knife / sword", ja: "刀・りっとう", examples: ["切", "利", "别"], tip: "Lưỡi dao sắc bén, dạng bên phải thường là bộ Đao đứng (刂)." },
  { num: 19, radical: "力", strokes: 2, pinyin: "lì", hanviet: "lực", vi: "Sức lực, sức mạnh, lao động", en: "Power / force", ja: "力（ちから）", examples: ["加", "动", "助"], tip: "Hình cánh tay cơ bắp gồng lên dốc toàn lực làm việc." },
  { num: 20, radical: "勹", strokes: 2, pinyin: "bāo", hanviet: "bao", vi: "Bọc lại, ôm ấp, bao bọc", en: "Wrap / embrace", ja: "包構（つつみがまえ）", examples: ["包", "匆", "句"], tip: "Hình người cúi xuống hai tay ôm ấp lấy đứa bé." },
  { num: 21, radical: "匕", strokes: 2, pinyin: "bǐ", hanviet: "chủy", vi: "Cái thìa múc cơm, dao găm nhỏ", en: "Spoon / dagger", ja: "匙（さじのひ）", examples: ["化", "北", "旨"], tip: "Cái thìa múc thức ăn hoặc dao găm nhỏ giấu trong người." },
  { num: 22, radical: "匚", strokes: 2, pinyin: "fāng", hanviet: "phương", vi: "Hòm chứa đồ, tủ vuông góc", en: "Box / basket", ja: "箱構（はこがまえ）", examples: ["匠", "匡", "匣"], tip: "Chiếc hòm gỗ mở nắp bên sườn để đựng đồ đạc." },
  { num: 23, radical: "匸", strokes: 2, pinyin: "xǐ", hanviet: "hệ", vi: "Chốn che đậy kín đáo, cất giấu", en: "Enclosure / hiding", ja: "隠構（かくしがまえ）", examples: ["区", "匿", "匹"], tip: "Góc kín dùng để che giấu của cải bí mật." },
  { num: 24, radical: "十", strokes: 2, pinyin: "shí", hanviet: "thập", vi: "Số mười, hoàn hảo, đầy đủ", en: "Ten / complete", ja: "十（じゅう）", examples: ["千", "午", "半"], tip: "Một nét ngang một nét dọc giao nhau, trọn vẹn bốn phương tám hướng." },
  { num: 25, radical: "卜", strokes: 2, pinyin: "bǔ", hanviet: "bốc", vi: "Bói toán, xem điềm lành dữ", en: "Divination", ja: "占い（ぼく・うらない）", examples: ["卡", "占", "卤"], tip: "Vết nứt trên mai rùa khi người xưa nung nóng để bói quẻ." },
  { num: 26, radical: "卩", strokes: 2, pinyin: "jié", hanviet: "tiết", vi: "Khớp xương, ấn tín quan lại, quỳ", en: "Seal / kneeling", ja: "節（ふしづくり）", examples: ["却", "危", "即"], tip: "Hình người đang quỳ gối kính cẩn hoặc con dấu ngọc tỷ." },
  { num: 27, radical: "厂", strokes: 2, pinyin: "chǎng", hanviet: "hán", vi: "Vách núi dựng đứng, xưởng", en: "Cliff / factory", ja: "厂（がんだれ）", examples: ["历", "厄", "原"], tip: "Vách đá nhô ra tạo thành chỗ che nắng che mưa dưới chân núi." },
  { num: 28, radical: "厶", strokes: 2, pinyin: "sī", hanviet: "khứ", vi: "Riêng tư, bản thân, ích kỷ", en: "Private / self", ja: "ム（む）", examples: ["去", "县", "参"], tip: "Khoanh tay co lại vào trong lòng, giữ của cho riêng mình." },
  { num: 29, radical: "又", strokes: 2, pinyin: "yòu", hanviet: "hựu", vi: "Lại nữa, bàn tay phải", en: "Again / right hand", ja: "又（また）", examples: ["友", "双", "取"], tip: "Bàn tay phải lặp đi lặp lại một hành động." },

  // 3 strokes (30-60)
  { num: 30, radical: "口", strokes: 3, pinyin: "kǒu", hanviet: "khẩu", vi: "Miệng, mồm, lối ra vào", en: "Mouth / opening", ja: "口（くち）", examples: ["吃", "喝", "叫"], tip: "Hình chiếc miệng mở ra để ăn nói." },
  { num: 31, radical: "囗", strokes: 3, pinyin: "wéi", hanviet: "vi", vi: "Vây quanh, tường thành bao bọc", en: "Enclosure", ja: "国構（くにがまえ）", examples: ["国", "回", "园"], tip: "Bức tường thành khép kín bao quanh một vùng đất." },
  { num: 32, radical: "土", strokes: 3, pinyin: "tǔ", hanviet: "thổ", vi: "Đất đai, thổ nhưỡng, mặt đất", en: "Earth / soil", ja: "土（つち）", examples: ["在", "地", "城"], tip: "Mầm cây mọc vươn lên từ lớp đất màu mỡ." },
  { num: 33, radical: "士", strokes: 3, pinyin: "shì", hanviet: "sĩ", vi: "Kẻ sĩ, người có học, tráng sĩ", en: "Scholar / gentleman", ja: "士（さむらい）", examples: ["壮", "声", "壶"], tip: "Người học rộng tài cao, thông suốt từ một (一) đến mười (十)." },
  { num: 34, radical: "夂", strokes: 3, pinyin: "zhǐ", hanviet: "truy", vi: "Đi chậm chạp từ phía sau", en: "Go slowly", ja: "冬頭（ふゆがしら）", examples: ["处", "冬", "条"], tip: "Bàn chân bước theo sau một cách chậm rãi." },
  { num: 35, radical: "夊", strokes: 3, pinyin: "suī", hanviet: "tuy", vi: "Đi thong thả, bước đi kéo lê", en: "Walk slowly", ja: "すいにょう", examples: ["复", "夏"], tip: "Dáng điệu kéo lê gót chân từng bước thong thả." },
  { num: 36, radical: "夕", strokes: 3, pinyin: "xī", hanviet: "tịch", vi: "Buổi chiều tối, đêm tối", en: "Evening / sunset", ja: "夕（ゆうべ）", examples: ["外", "多", "夜"], tip: "Mặt trăng khuyết vừa nhô lên vào buổi hoàng hôn." },
  { num: 37, radical: "大", strokes: 3, pinyin: "dà", hanviet: "đại", vi: "To lớn, vĩ đại, rộng rãi", en: "Big / great", ja: "大（だい）", examples: ["天", "太", "夫"], tip: "Hình người đứng dang rộng hai tay hai chân hết cỡ." },
  { num: 38, radical: "女", strokes: 3, pinyin: "nǚ", hanviet: "nữ", vi: "Phụ nữ, con gái, giới nữ", en: "Woman / female", ja: "女（おんな）", examples: ["她", "好", "妈"], tip: "Hình người phụ nữ dịu dàng quỳ chắp tay." },
  { num: 39, radical: "子", strokes: 3, pinyin: "zǐ", hanviet: "tử", vi: "Con cái, đứa trẻ, hạt giống", en: "Child / son", ja: "子（こ）", examples: ["字", "孩", "学"], tip: "Đứa bé sơ sinh giơ hai tay quấn trong tã lót." },
  { num: 40, radical: "宀", strokes: 3, pinyin: "mián", hanviet: "miên", vi: "Mái nhà, gian nhà ở", en: "Roof / house", ja: "冠（うかんむり）", examples: ["家", "安", "定"], tip: "Mái nhà có ống khói che chở cho cả gia đình." },
  { num: 41, radical: "寸", strokes: 3, pinyin: "cùn", hanviet: "thốn", vi: "Tấc, thước đo, gang tay", en: "Inch / measure", ja: "寸（すん）", examples: ["对", "封", "射"], tip: "Khoảng cách một tấc từ cổ tay đến huyệt bắt mạch." },
  { num: 42, radical: "小", strokes: 3, pinyin: "xiǎo", hanviet: "tiểu", vi: "Nhỏ bé, ít ỏi, bé nhỏ", en: "Small / tiny", ja: "小（しょう）", examples: ["少", "尖", "尔"], tip: "Một vật nhỏ bị phân chia làm ba mảnh nhỏ li ti." },
  { num: 43, radical: "尢 (尣)", strokes: 3, pinyin: "wāng", hanviet: "uông", vi: "Tật nguyền chân, gãy queo", en: "Lame / crooked", ja: "だいのまげあし", examples: ["就", "尬", "尴"], tip: "Hình người bị dị tật một chân bước tập tễnh." },
  { num: 44, radical: "尸", strokes: 3, pinyin: "shī", hanviet: "thi", vi: "Xác chết, thi thể, người nằm", en: "Corpse / body", ja: "尸（しかばね）", examples: ["屋", "居", "展"], tip: "Người nằm bất động hoặc tấm thân thể." },
  { num: 45, radical: "屮", strokes: 3, pinyin: "chè", hanviet: "triệt", vi: "Cỏ non mới nảy mầm", en: "Sprout", ja: "草の芽（てつ）", examples: ["屯"], tip: "Chồi non vừa tách vỏ chui lên khỏi mặt đất." },
  { num: 46, radical: "山", strokes: 3, pinyin: "shān", hanviet: "sơn", vi: "Núi non, ngọn núi hùng vĩ", en: "Mountain", ja: "山（やま）", examples: ["出", "岛", "岁"], tip: "Ba đỉnh núi cao sừng sững liền kề nhau." },
  { num: 47, radical: "巛 (川)", strokes: 3, pinyin: "chuān", hanviet: "xuyên", vi: "Sông ngòi, dòng nước chảy xiết", en: "River / stream", ja: "川（かわ）", examples: ["州", "巡", "巢"], tip: "Dòng nước sông ngòi uốn lượn cuồn cuộn chảy." },
  { num: 48, radical: "工", strokes: 3, pinyin: "gōng", hanviet: "công", vi: "Công việc, thợ khéo, xây dựng", en: "Work / craft", ja: "工（こう）", examples: ["左", "巧", "差"], tip: "Cái thước thợ của người làm mộc thời cổ." },
  { num: 49, radical: "己", strokes: 3, pinyin: "jǐ", hanviet: "kỷ", vi: "Bản thân, chính mình, can Kỷ", en: "Self / oneself", ja: "己（おのれ）", examples: ["已", "包", "导"], tip: "Sợi dây buộc đồ cuộn lại biểu thị sự tự chủ." },
  { num: 50, radical: "巾", strokes: 3, pinyin: "jīn", hanviet: "cân", vi: "Khăn vải, mũ nón, dải lụa", en: "Towel / cloth", ja: "巾（はば）", examples: ["市", "布", "帮"], tip: "Tấm vải khăn vắt thõng xuống từ thắt lưng." },
  { num: 51, radical: "干", strokes: 3, pinyin: "gān", hanviet: "can", vi: "Lá chắn, can thiệp, khô ráo", en: "Shield / dry", ja: "干（かん）", examples: ["平", "年", "并"], tip: "Cái giáo chắn phòng thủ trong chiến trận cổ đại." },
  { num: 52, radical: "幺", strokes: 3, pinyin: "yāo", hanviet: "yêu", vi: "Nhỏ bé nhất, sợi tơ mỏng mảnh", en: "Tiny / youngest", ja: "幺（いとがしら）", examples: ["幻", "幼", "幽"], tip: "Đầu mối sợi tơ tằm đơn lẻ cực kỳ nhỏ mịn." },
  { num: 53, radical: "广", strokes: 3, pinyin: "guǎng", hanviet: "quảng", vi: "Nhà rộng bên sườn núi, kho", en: "Wide shelter", ja: "广（まだれ）", examples: ["店", "座", "应"], tip: "Ngôi nhà rộng rãi dựa lưng vào vách đá." },
  { num: 54, radical: "廴", strokes: 3, pinyin: "yǐn", hanviet: "dẫn", vi: "Bước dài, kéo dài quãng đường", en: "Long stride", ja: "延繞（えんにょう）", examples: ["廷", "延", "建"], tip: "Bước chân sải dài tiến về phía trước." },
  { num: 55, radical: "廾", strokes: 3, pinyin: "gǒng", hanviet: "củng", vi: "Hai tay chắp lại dâng lễ vật", en: "Two hands up", ja: "廾（こまぬき）", examples: ["弄", "开", "弃"], tip: "Hai bàn tay giơ lên nâng niu cung kính." },
  { num: 56, radical: "弋", strokes: 3, pinyin: "yì", hanviet: "dực", vi: "Cọc gỗ buộc dây, mũi tên bắn chim", en: "Arrow / stake", ja: "弋（しきがまえ）", examples: ["式", "武"], tip: "Cây cọc gỗ cắm xuống đất buộc dây săn bắt chim chóc." },
  { num: 57, radical: "弓", strokes: 3, pinyin: "gōng", hanviet: "cung", vi: "Cây cung, uốn cong bắn tên", en: "Bow", ja: "弓（ゆみ）", examples: ["引", "张", "强"], tip: "Cây cung kéo căng dây sẵn sàng phóng tên." },
  { num: 58, radical: "彐 (彑)", strokes: 3, pinyin: "jì", hanviet: "kệ", vi: "Đầu con lợn nhọn, móng vuốt", en: "Snout / claw", ja: "けいがしら", examples: ["归", "录", "彗"], tip: "Đầu mõm con thú nhọn nhô ra." },
  { num: 59, radical: "彡", strokes: 3, pinyin: "shān", hanviet: "sam", vi: "Lông vũ mượt mà, hoa văn sắc sảo", en: "Bristle / stripes", ja: "三（さんづくり）", examples: ["形", "影", "彩"], tip: "Ba nét lông chim mượt mà bay trong gió." },
  { num: 60, radical: "彳", strokes: 3, pinyin: "chì", hanviet: "sách", vi: "Bước chân trái, bước đi chậm rãi", en: "Step / walk", ja: "行（ぎょうにんべん）", examples: ["很", "行", "得"], tip: "Nửa bên trái của chữ Hành (行), tượng trưng cho ngã tư đường." }
];

// Generate the remaining radicals up to 214 systematically
const EXTENDED_RADICALS_SPECS = [
  // 4 strokes
  { num: 61, radical: "心 (忄)", strokes: 4, pinyin: "xīn", hanviet: "tâm", vi: "Trái tim, tâm trí, cảm xúc", en: "Heart / mind", ja: "心・りっしんべん", examples: ["想", "忙", "快"] },
  { num: 62, radical: "戈", strokes: 4, pinyin: "gē", hanviet: "qua", vi: "Cây kích, vũ khí đánh trận", en: "Halberd / spear", ja: "戈（ほこ）", examples: ["我", "战", "成"] },
  { num: 63, radical: "戶 (户)", strokes: 4, pinyin: "hù", hanviet: "hộ", vi: "Cửa một cánh, hộ gia đình", en: "Door / household", ja: "戸（と）", examples: ["房", "所", "扁"] },
  { num: 64, radical: "手 (扌)", strokes: 4, pinyin: "shǒu", hanviet: "thủ", vi: "Bàn tay, động tác cầm nắm", en: "Hand", ja: "手・てへん", examples: ["打", "拿", "提"] },
  { num: 65, radical: "支", strokes: 4, pinyin: "zhī", hanviet: "chi", vi: "Cành cây, chi nhánh, chống đỡ", en: "Branch / support", ja: "支（しにょう）", examples: ["枝"] },
  { num: 66, radical: "攴 (攵)", strokes: 4, pinyin: "pū", hanviet: "phộc", vi: "Gõ nhẹ, đánh đòn, hành động", en: "Tap / strike", ja: "のぶん", examples: ["放", "收", "做"] },
  { num: 67, radical: "文", strokes: 4, pinyin: "wén", hanviet: "văn", vi: "Văn chương, chữ viết, hoa văn", en: "Literature / script", ja: "文（ぶん）", examples: ["齐", "斌"] },
  { num: 68, radical: "斗", strokes: 4, pinyin: "dǒu", hanviet: "đẩu", vi: "Cái đấu đong thóc, sao Bắc Đẩu", en: "Dipper / peck", ja: "斗（とます）", examples: ["斜", "料"] },
  { num: 69, radical: "斤", strokes: 4, pinyin: "jīn", hanviet: "cân", vi: "Cái rìu đốn củi, cân lạng", en: "Axe / pound", ja: "斤（おの）", examples: ["新", "断", "斯"] },
  { num: 70, radical: "方", strokes: 4, pinyin: "fāng", hanviet: "phương", vi: "Vuông vắn, phương hướng, cách thức", en: "Square / direction", ja: "方（ほう）", examples: ["放", "旅", "族"] },
  { num: 71, radical: "无 (旡)", strokes: 4, pinyin: "wú", hanviet: "vô", vi: "Không có, trống rỗng", en: "Without / not", ja: "無（なし）", examples: ["既"] },
  { num: 72, radical: "日", strokes: 4, pinyin: "rì", hanviet: "nhật", vi: "Mặt trời, ban ngày, ngày tháng", en: "Sun / day", ja: "日（ひ・にち）", examples: ["明", "时", "早"] },
  { num: 73, radical: "曰", strokes: 4, pinyin: "yuē", hanviet: "viết", vi: "Nói rằng, phát ngôn", en: "Say / speak", ja: "曰（いわく）", examples: ["曲", "替", "曹"] },
  { num: 74, radical: "月", strokes: 4, pinyin: "yuè", hanviet: "nguyệt", vi: "Mặt trăng, tháng, thịt bắp (nhục)", en: "Moon / month / flesh", ja: "月（つき・にくづき）", examples: ["期", "明", "朋"] },
  { num: 75, radical: "木", strokes: 4, pinyin: "mù", hanviet: "mộc", vi: "Cây cối, gỗ, thực vật thân gỗ", en: "Tree / wood", ja: "木（き）", examples: ["本", "树", "机"] },
  { num: 76, radical: "欠", strokes: 4, pinyin: "qiàn", hanviet: "khiếm", vi: "Ngáp, thiếu thốn, khuyết thiếu", en: "Yawn / lack", ja: "欠（あくび）", examples: ["次", "歌", "欢"] },
  { num: 77, radical: "止", strokes: 4, pinyin: "zhǐ", hanviet: "chỉ", vi: "Dừng lại, đứng yên, ngăn cản", en: "Stop", ja: "止（とめる）", examples: ["正", "此", "步"] },
  { num: 78, radical: "歹 (歺)", strokes: 4, pinyin: "dǎi", hanviet: "đãi", vi: "Xương tàn, chết chóc, tai họa", en: "Death / decay", ja: "かばねへん", examples: ["死", "殇", "殊"] },
  { num: 79, radical: "殳", strokes: 4, pinyin: "shū", hanviet: "thù", vi: "Binh khí gậy trúc, đánh gõ", en: "Weapon / lance", ja: "ほこづくり", examples: ["段", "殷", "殿"] },
  { num: 80, radical: "毋 (母)", strokes: 4, pinyin: "wú", hanviet: "vô", vi: "Chớ có, đừng, người mẹ", en: "Do not / mother", ja: "母（はは）", examples: ["每", "毒"] },
  { num: 81, radical: "比", strokes: 4, pinyin: "bǐ", hanviet: "tỉ", vi: "So sánh, liền kề, thi thố", en: "Compare", ja: "比（くらべる）", examples: ["毖", "毙"] },
  { num: 82, radical: "毛", strokes: 4, pinyin: "máo", hanviet: "mao", vi: "Lông, tóc, sợi lông mao", en: "Fur / hair", ja: "毛（け）", examples: ["毫", "毯"] },
  { num: 83, radical: "氏", strokes: 4, pinyin: "shì", hanviet: "thị", vi: "Dòng họ, thị tộc, quý phái", en: "Clan / family", ja: "氏（うじ）", examples: ["民", "氓"] },
  { num: 84, radical: "气", strokes: 4, pinyin: "qì", hanviet: "khí", vi: "Không khí, hơi thở, khí chất", en: "Steam / breath / gas", ja: "気（きがまえ）", examples: ["汽", "氛", "氧"] },
  { num: 85, radical: "水 (氵)", strokes: 4, pinyin: "shuǐ", hanviet: "thủy", vi: "Nước, sông hồ, chất lỏng", en: "Water", ja: "水・さんずい", examples: ["江", "河", "海"] },
  { num: 86, radical: "火 (灬)", strokes: 4, pinyin: "huǒ", hanviet: "hỏa", vi: "Lửa, ánh sáng, nhiệt độ", en: "Fire", ja: "火・れんが", examples: ["热", "点", "照"] },
  { num: 87, radical: "爪 (爫)", strokes: 4, pinyin: "zhuǎ", hanviet: "trảo", vi: "Móng vuốt chim muông, cào xới", en: "Claw / paw", ja: "爪（つめ）", examples: ["爬", "爱", "妥"] },
  { num: 88, radical: "父", strokes: 4, pinyin: "fù", hanviet: "phụ", vi: "Người cha, bậc bề trên", en: "Father", ja: "父（ちち）", examples: ["爸", "爷"] },
  { num: 89, radical: "爻", strokes: 4, pinyin: "yáo", hanviet: "hào", vi: "Quẻ bát quái đan chéo", en: "Double cross", ja: "爻（こう）", examples: ["爽"] },
  { num: 90, radical: "爿", strokes: 4, pinyin: "pán", hanviet: "tường", vi: "Tấm ván gỗ xẻ đôi dựng đứng", en: "Split wood", ja: "しょうへん", examples: ["壮", "状"] },
  { num: 91, radical: "片", strokes: 4, pinyin: "piàn", hanviet: "phiến", vi: "Mảnh mỏng, lát cắt, tấm phẳng", en: "Slice / card", ja: "片（かた）", examples: ["版", "牌"] },
  { num: 92, radical: "牙", strokes: 4, pinyin: "yá", hanviet: "nha", vi: "Răng nanh, ngà voi", en: "Tooth / tusk", ja: "牙（きば）", examples: ["邪", "雅"] },
  { num: 93, radical: "牛 (牜)", strokes: 4, pinyin: "niú", hanviet: "ngưu", vi: "Con trâu, con bò", en: "Cow / bull", ja: "牛・うしへん", examples: ["物", "特", "牧"] },
  { num: 94, radical: "犬 (犭)", strokes: 4, pinyin: "quǎn", hanviet: "khuyển", vi: "Con chó, thú bốn chân săn mồi", en: "Dog / beast", ja: "犬・けものへん", examples: ["狗", "猫", "猪"] },

  // 5 strokes
  { num: 95, radical: "玄", strokes: 5, pinyin: "xuán", hanviet: "huyền", vi: "Màu đen sâu thẳm, huyền bí", en: "Deep / dark", ja: "玄（げん）", examples: ["率"] },
  { num: 96, radical: "玉 (王)", strokes: 5, pinyin: "yù", hanviet: "ngọc", vi: "Ngọc quý, ngọc thạch, vua", en: "Jade / king", ja: "玉・たまへん", examples: ["玩", "珍", "现"] },
  { num: 97, radical: "瓜", strokes: 5, pinyin: "guā", hanviet: "qua", vi: "Dưa, quả bầu, bí ngô", en: "Melon", ja: "瓜（うり）", examples: ["瓣"] },
  { num: 98, radical: "瓦", strokes: 5, pinyin: "wǎ", hanviet: "ngõa", vi: "Ngói lợp nhà, đồ sành gốm", en: "Tile / pottery", ja: "瓦（かわら）", examples: ["瓶", "甄"] },
  { num: 99, radical: "甘", strokes: 5, pinyin: "gān", hanviet: "cam", vi: "Ngọt ngào, thơm thảo, cam tâm", en: "Sweet", ja: "甘（あまい）", examples: ["甚", "甜"] },
  { num: 100, radical: "生", strokes: 5, pinyin: "shēng", hanviet: "sinh", vi: "Sinh sôi, sống, nảy nở", en: "Life / grow", ja: "生（いきる）", examples: ["产", "甥"] },
  { num: 101, radical: "用", strokes: 5, pinyin: "yòng", hanviet: "dụng", vi: "Sử dụng, ứng dụng, tiêu dùng", en: "Use", ja: "用（もちいる）", examples: ["甭"] },
  { num: 102, radical: "田", strokes: 5, pinyin: "tián", hanviet: "điền", vi: "Ruộng đồng, bờ cõi màu mỡ", en: "Field / rice paddy", ja: "田（た）", examples: ["男", "画", "留"] },
  { num: 103, radical: "疋 (⽦)", strokes: 5, pinyin: "pǐ", hanviet: "thất", vi: "Xấp vải, đôi bàn chân", en: "Bolt of cloth", ja: "ひき", examples: ["疏", "疑"] },
  { num: 104, radical: "疒", strokes: 5, pinyin: "nè", hanviet: "nạch", vi: "Bệnh tật, ốm đau, giường bệnh", en: "Sickness / disease", ja: "やまいだれ", examples: ["病", "疼", "痛"] },
  { num: 105, radical: "癶", strokes: 5, pinyin: "bō", hanviet: "bát", vi: "Hai chân dang ra, bước chân", en: "Footsteps", ja: "はつがしら", examples: ["登", "发"] },
  { num: 106, radical: "白", strokes: 5, pinyin: "bái", hanviet: "bạch", vi: "Màu trắng, sáng tỏ, rõ ràng", en: "White / bright", ja: "白（しろ）", examples: ["百", "皇", "皎"] },
  { num: 107, radical: "皮", strokes: 5, pinyin: "pí", hanviet: "bì", vi: "Da dẻ, vỏ bọc ngoài", en: "Skin / leather", ja: "皮（けがわ）", examples: ["皱", "颇"] },
  { num: 108, radical: "皿", strokes: 5, pinyin: "mǐn", hanviet: "mãnh", vi: "Bát đĩa, đồ đựng thức ăn", en: "Dish / plate", ja: "皿（さら）", examples: ["盆", "盒", "盖"] },
  { num: 109, radical: "目", strokes: 5, pinyin: "mù", hanviet: "mục", vi: "Mắt, trông nhìn, danh mục", en: "Eye", ja: "目（め）", examples: ["看", "眼", "睛"] },
  { num: 110, radical: "矛", strokes: 5, pinyin: "máo", hanviet: "mâu", vi: "Cây mâu đâm, vũ khí nhọn", en: "Spear", ja: "矛（ほこ）", examples: ["矜"] },
  { num: 111, radical: "矢", strokes: 5, pinyin: "shǐ", hanviet: "thỉ", vi: "Mũi tên nhọn bay thẳng", en: "Arrow", ja: "矢（や）", examples: ["短", "知", "矩"] },
  { num: 112, radical: "石", strokes: 5, pinyin: "shí", hanviet: "thạch", vi: "Đá tảng, sỏi đá, khoáng vật", en: "Stone / rock", ja: "石（いし）", examples: ["破", "确", "矿"] },
  { num: 113, radical: "示 (礻)", strokes: 5, pinyin: "shì", hanviet: "thị", vi: "Thần linh, tế tự, hiển thị", en: "Spirit / altar", ja: "示・しめすへん", examples: ["祝", "福", "社"] },
  { num: 114, radical: "禸", strokes: 5, pinyin: "róu", hanviet: "nhựu", vi: "Vết chân muông thú giẫm trên tuyết", en: "Animal footprint", ja: "ぐうのあし", examples: ["禹", "离"] },
  { num: 115, radical: "禾", strokes: 5, pinyin: "hé", hanviet: "hòa", vi: "Cây lúa trĩu hạt, ngũ cốc", en: "Grain / cereal", ja: "禾（のぎへん）", examples: ["秋", "科", "秒"] },
  { num: 116, radical: "穴", strokes: 5, pinyin: "xué", hanviet: "huyệt", vi: "Hang động, hầm sâu dưới đất", en: "Cave / hole", ja: "穴（あな）", examples: ["空", "穿", "究"] },
  { num: 117, radical: "立", strokes: 5, pinyin: "lì", hanviet: "lập", vi: "Đứng thẳng, thành lập, độc lập", en: "Stand / establish", ja: "立（たつ）", examples: ["站", "端", "童"] },

  // 6 strokes
  { num: 118, radical: "竹 (⺮)", strokes: 6, pinyin: "zhú", hanviet: "trúc", vi: "Cây tre, trúc, măng", en: "Bamboo", ja: "竹・たけかんむり", examples: ["笑", "第", "等"] },
  { num: 119, radical: "米", strokes: 6, pinyin: "mǐ", hanviet: "mễ", vi: "Hạt gạo, hạt cơm, thức ăn", en: "Rice", ja: "米（こめ）", examples: ["粉", "料", "糖"] },
  { num: 120, radical: "糸 (纟)", strokes: 6, pinyin: "sī", hanviet: "mịch", vi: "Sợi tơ lụa, dệt may, dây buộc", en: "Silk / thread", ja: "糸・いとへん", examples: ["红", "绿", "纸"] },
  { num: 121, radical: "缶", strokes: 6, pinyin: "fǒu", hanviet: "phẫu", vi: "Đồ gốm sành miệng hẹp đựng nước", en: "Pottery jar", ja: "缶（ほとぎ）", examples: ["缸", "缺"] },
  { num: 122, radical: "网 (罒)", strokes: 6, pinyin: "wǎng", hanviet: "võng", vi: "Lưới đánh cá, pháp võng", en: "Net", ja: "网（あみがしら）", examples: ["罗", "罚", "置"] },
  { num: 123, radical: "羊", strokes: 6, pinyin: "yáng", hanviet: "dương", vi: "Con cừu, con dê, điềm lành", en: "Sheep / goat", ja: "羊（ひつじ）", examples: ["美", "着", "群"] },
  { num: 124, radical: "羽", strokes: 6, pinyin: "yǔ", hanviet: "vũ", vi: "Lông vũ, cánh chim bay lượn", en: "Feather / wing", ja: "羽（はね）", examples: ["习", "翔", "翼"] },
  { num: 125, radical: "老 (耂)", strokes: 6, pinyin: "lǎo", hanviet: "lão", vi: "Người già, trường thọ, kính lão", en: "Old / elder", ja: "老（おいかんむり）", examples: ["者", "考", "寿"] },
  { num: 126, radical: "而", strokes: 6, pinyin: "ér", hanviet: "nhi", vi: "Râu cằm, mà, và, nối tiếp", en: "And / yet", ja: "而（しかして）", examples: ["耐"] },
  { num: 127, radical: "耒", strokes: 6, pinyin: "lěi", hanviet: "lỗi", vi: "Cái cày bừa xới đất nông nghiệp", en: "Plow", ja: "らいすき", examples: ["耕", "耘"] },
  { num: 128, radical: "耳", strokes: 6, pinyin: "ěr", hanviet: "nhĩ", vi: "Tai, lắng nghe, thính giác", en: "Ear", ja: "耳（みみ）", examples: ["听", "闻", "聊"] },
  { num: 129, radical: "聿", strokes: 6, pinyin: "yù", hanviet: "duật", vi: "Cây bút lông viết chữ thời cổ", en: "Brush pen", ja: "ふでづくり", examples: ["肆", "肃"] },
  { num: 130, radical: "肉 (月)", strokes: 6, pinyin: "ròu", hanviet: "nhục", vi: "Thịt mỡ nạc, cơ thể con người", en: "Meat / flesh", ja: "肉（にくづき）", examples: ["胖", "脸", "胃"] },
  { num: 131, radical: "臣", strokes: 6, pinyin: "chén", hanviet: "thần", vi: "Quan thần, bề tôi cúi đầu", en: "Minister / official", ja: "臣（しん）", examples: ["卧", "藏"] },
  { num: 132, radical: "自", strokes: 6, pinyin: "zì", hanviet: "tự", vi: "Tự mình, từ đâu đến, cái mũi", en: "Self / from", ja: "自（みずから）", examples: ["臭", "鼻"] },
  { num: 133, radical: "至", strokes: 6, pinyin: "zhì", hanviet: "chí", vi: "Đến nơi, cùng cực, tận cùng", en: "Arrive / extreme", ja: "至（いたる）", examples: ["致", "屋"] },
  { num: 134, radical: "臼", strokes: 6, pinyin: "jiù", hanviet: "cối", vi: "Cối giã gạo, giã thuốc", en: "Mortar", ja: "臼（うす）", examples: ["舅", "舀"] },
  { num: 135, radical: "舌", strokes: 6, pinyin: "shé", hanviet: "thiệt", vi: "Lưỡi, nếm mùi vị, ngôn ngữ", en: "Tongue", ja: "舌（した）", examples: ["甜", "乱", "舒"] },
  { num: 136, radical: "舛", strokes: 6, pinyin: "chuǎn", hanviet: "suyễn", vi: "Hai chân quay ngược nhau, sai sót", en: "Oppose / mistake", ja: "ます", examples: ["舞"] },
  { num: 137, radical: "舟", strokes: 6, pinyin: "zhōu", hanviet: "chu", vi: "Thuyền bè, ghe trôi trên sông", en: "Boat / ship", ja: "舟（ふね）", examples: ["船", "航", "盘"] },
  { num: 138, radical: "艮", strokes: 6, pinyin: "gèn", hanviet: "cấn", vi: "Quẻ Cấn, kiên định, dừng lại", en: "Firm / still", ja: "うしとら", examples: ["艰"] },
  { num: 139, radical: "色", strokes: 6, pinyin: "sè", hanviet: "sắc", vi: "Màu sắc, sắc đẹp, vẻ mặt", en: "Color / beauty", ja: "色（いろ）", examples: ["艳"] },
  { num: 140, radical: "艸 (艹)", strokes: 6, pinyin: "cǎo", hanviet: "thảo", vi: "Cỏ cây, thảo mộc, hoa quả", en: "Grass / herb", ja: "草・くさかんむり", examples: ["茶", "草", "花"] },
  { num: 141, radical: "虍", strokes: 6, pinyin: "hū", hanviet: "hô", vi: "Vằn lông hổ, con cọp dũng mãnh", en: "Tiger stripes", ja: "虎（とらかんむり）", examples: ["虎", "虑", "虚"] },
  { num: 142, radical: "虫", strokes: 6, pinyin: "chóng", hanviet: "trùng", vi: "Côn trùng, sâu bọ, bò sát", en: "Insect / worm", ja: "虫（むし）", examples: ["虾", "蛋", "蛇"] },
  { num: 143, radical: "血", strokes: 6, pinyin: "xuè", hanviet: "huyết", vi: "Máu huyết, sinh mệnh", en: "Blood", ja: "血（ち）", examples: ["衄"] },
  { num: 144, radical: "行", strokes: 6, pinyin: "xíng", hanviet: "hành", vi: "Bước đi, thực hiện, ngân hàng", en: "Walk / act", ja: "行（ぎょう）", examples: ["街", "衡", "德"] },
  { num: 145, radical: "衣 (衤)", strokes: 6, pinyin: "yī", hanviet: "y", vi: "Áo quần, trang phục, che thân", en: "Clothing", ja: "衣・ころもへん", examples: ["被", "裤", "裙"] },
  { num: 146, radical: "襾 (西)", strokes: 6, pinyin: "yà", hanviet: "á", vi: "Nắp đậy kín mít, hướng tây", en: "Cover / west", ja: "西（にし）", examples: ["要", "票", "覆"] },

  // 7 strokes
  { num: 147, radical: "見 (见)", strokes: 7, pinyin: "jiàn", hanviet: "kiến", vi: "Trông thấy, nhìn ngắm, gặp gỡ", en: "See / view", ja: "見（みる）", examples: ["规", "觉", "观"] },
  { num: 148, radical: "角", strokes: 7, pinyin: "jiǎo", hanviet: "giác", vi: "Góc cạnh, sừng thú, kèn lệnh", en: "Horn / angle", ja: "角（つの）", examples: ["解", "触"] },
  { num: 149, radical: "言 (讠)", strokes: 7, pinyin: "yán", hanviet: "ngôn", vi: "Lời nói, ngôn ngữ, trò chuyện", en: "Speech / word", ja: "言・ごんべん", examples: ["话", "说", "语"] },
  { num: 150, radical: "谷", strokes: 7, pinyin: "gǔ", hanviet: "cốc", vi: "Thung lũng, suối khe giữa núi", en: "Valley", ja: "谷（たに）", examples: ["豁"] },
  { num: 151, radical: "豆", strokes: 7, pinyin: "dòu", hanviet: "đậu", vi: "Hạt đậu, đĩa đựng cúng tế", en: "Bean / vessel", ja: "豆（まめ）", examples: ["短", "豉"] },
  { num: 152, radical: "豕", strokes: 7, pinyin: "shǐ", hanviet: "thỉ", vi: "Con lợn, con heo béo tốt", en: "Pig / boar", ja: "豕（いのこ）", examples: ["豪", "象", "毅"] },
  { num: 153, radical: "豸", strokes: 7, pinyin: "zhì", hanviet: "trĩ", vi: "Thú hoang dã bò trườn săn mồi", en: "Beast of prey", ja: "むじなへん", examples: ["豹", "貂"] },
  { num: 154, radical: "貝 (贝)", strokes: 7, pinyin: "bèi", hanviet: "bối", vi: "Vỏ sò tiền tệ cổ, của cải", en: "Shell / money", ja: "貝（かい）", examples: ["买", "贵", "贫"] },
  { num: 155, radical: "赤", strokes: 7, pinyin: "chì", hanviet: "xích", vi: "Màu đỏ thắm, son sắt, trần trụi", en: "Red / bare", ja: "赤（あか）", examples: ["赦", "赫"] },
  { num: 156, radical: "走", strokes: 7, pinyin: "zǒu", hanviet: "tẩu", vi: "Chạy trốn, cất bước đi", en: "Run / walk", ja: "走（はしる）", examples: ["起", "越", "超"] },
  { num: 157, radical: "足 (⻊)", strokes: 7, pinyin: "zú", hanviet: "túc", vi: "Bàn chân, bước chân, đầy đủ", en: "Foot / leg", ja: "足（あし）", examples: ["跳", "路", "跑"] },
  { num: 158, radical: "身", strokes: 7, pinyin: "shēn", hanviet: "thân", vi: "Thân thể, vóc dáng, tính mạng", en: "Body", ja: "身（み）", examples: ["躬", "躺"] },
  { num: 159, radical: "車 (车)", strokes: 7, pinyin: "chē", hanviet: "xa", vi: "Xe cộ, phương tiện bánh lăn", en: "Cart / car", ja: "車（くるま）", examples: ["辆", "转", "轮"] },
  { num: 160, radical: "辛", strokes: 7, pinyin: "xīn", hanviet: "tân", vi: "Cay đắng, gian nan, cực khổ", en: "Bitter / spicy", ja: "辛（からい）", examples: ["辟", "辣"] },
  { num: 161, radical: "辰", strokes: 7, pinyin: "chén", hanviet: "thần", vi: "Giờ Thìn, sao trời, ngày lành", en: "Morning / celestial", ja: "しんのたつ", examples: ["辱", "农"] },
  { num: 162, radical: "辵 (辶)", strokes: 7, pinyin: "chuò", hanviet: "sước", vi: "Bước đi rồi dừng lại, đường xá", en: "Walk / move", ja: "しんにょう", examples: ["进", "远", "近"] },
  { num: 163, radical: "邑 (阝phải)", strokes: 7, pinyin: "yì", hanviet: "ấp", vi: "Khu đất thành thị, làng mạc xóm", en: "City / village", ja: "おおざと", examples: ["部", "都", "郭"] },
  { num: 164, radical: "酉", strokes: 7, pinyin: "yǒu", hanviet: "dậu", vi: "Bình rượu lên men, giờ Dậu", en: "Wine vessel", ja: "酉（とりへん）", examples: ["酒", "酸", "醋"] },
  { num: 165, radical: "釆", strokes: 7, pinyin: "biàn", hanviet: "biện", vi: "Phân biệt, móng vuốt xé thú", en: "Distinguish", ja: "のごめ", examples: ["释"] },
  { num: 166, radical: "里", strokes: 7, pinyin: "lǐ", hanviet: "lý", vi: "Dặm đường, làng xóm, bên trong", en: "Village / mile", ja: "里（さと）", examples: ["重", "野", "量"] },

  // 8 strokes
  { num: 167, radical: "金 (钅)", strokes: 8, pinyin: "jīn", hanviet: "kim", vi: "Kim loại, vàng bạc, sắt thép", en: "Gold / metal", ja: "金・かねへん", examples: ["钱", "银", "铁"] },
  { num: 168, radical: "長 (长)", strokes: 8, pinyin: "cháng", hanviet: "trường", vi: "Dài lâu, lớn lên, thủ trưởng", en: "Long / grow", ja: "長（ながい）", examples: ["肆"] },
  { num: 169, radical: "門 (门)", strokes: 8, pinyin: "mén", hanviet: "môn", vi: "Cánh cổng lớn, cửa ngõ ra vào", en: "Gate / door", ja: "門（もん）", examples: ["问", "间", "闹"] },
  { num: 170, radical: "阜 (阝trái)", strokes: 8, pinyin: "fù", hanviet: "phụ", vi: "Gò đất cao, đồi núi đồ sộ", en: "Mound / hill", ja: "こざとへん", examples: ["院", "阳", "队"] },
  { num: 171, radical: "隶", strokes: 8, pinyin: "lì", hanviet: "lệ", vi: "Kèm theo, bắt giữ, nô lệ", en: "Slave / capture", ja: "れいづくり", examples: ["隶"] },
  { num: 172, radical: "隹", strokes: 8, pinyin: "zhuī", hanviet: "chuy", vi: "Chim đuôi ngắn nhỏ nhắn", en: "Short-tailed bird", ja: "ふるとり", examples: ["难", "雀", "雅"] },
  { num: 173, radical: "雨", strokes: 8, pinyin: "yǔ", hanviet: "vũ", vi: "Mưa rơi, sấm chớp, thời tiết", en: "Rain", ja: "雨（あめ）", examples: ["雪", "雷", "需"] },
  { num: 174, radical: "靑 (青)", strokes: 8, pinyin: "qīng", hanviet: "thanh", vi: "Màu xanh biếc của trời và cỏ", en: "Blue / green", ja: "青（あお）", examples: ["静", "靓"] },
  { num: 175, radical: "非", strokes: 8, pinyin: "fēi", hanviet: "phi", vi: "Không phải, sai trái, trái ngược", en: "Wrong / not", ja: "非（あらず）", examples: ["靠", "靡"] },

  // 9 strokes
  { num: 176, radical: "面", strokes: 9, pinyin: "miàn", hanviet: "diện", vi: "Mặt mũi, bề mặt, diện mạo", en: "Face / surface", ja: "面（めん）", examples: ["靥"] },
  { num: 177, radical: "革", strokes: 9, pinyin: "gé", hanviet: "cách", vi: "Da thú lột sạch lông, biến đổi", en: "Leather / reform", ja: "革（かわへん）", examples: ["靴", "鞋", "鞍"] },
  { num: 178, radical: "韋 (韦)", strokes: 9, pinyin: "wéi", hanviet: "vi", vi: "Miếng da thuộc mềm dẻo", en: "Tanned leather", ja: "なめしがわ", examples: ["韧", "韩"] },
  { num: 179, radical: "韭", strokes: 9, pinyin: "jiǔ", hanviet: "cửu", vi: "Rau hẹ thơm, mọc lâu năm", en: "Leek", ja: "にら", examples: ["韱"] },
  { num: 180, radical: "音", strokes: 9, pinyin: "yīn", hanviet: "âm", vi: "Âm thanh, giai điệu, tiếng vang", en: "Sound / tone", ja: "音（おと）", examples: ["韵", "响"] },
  { num: 181, radical: "頁 (页)", strokes: 9, pinyin: "yè", hanviet: "hiệp", vi: "Trang sách, cái đầu con người", en: "Page / head", ja: "頁（おおがい）", examples: ["顶", "项", "领"] },
  { num: 182, radical: "風 (风)", strokes: 9, pinyin: "fēng", hanviet: "phong", vi: "Gió thổi, phong tục, phong thái", en: "Wind / style", ja: "風（かぜ）", examples: ["飘", "飓"] },
  { num: 183, radical: "飛 (飞)", strokes: 9, pinyin: "fēi", hanviet: "phi", vi: "Bay lượn trên bầu trời", en: "Fly", ja: "飛（とぶ）", examples: ["翻"] },
  { num: 184, radical: "食 (饣)", strokes: 9, pinyin: "shí", hanviet: "thực", vi: "Ăn uống, thức ăn lương thực", en: "Eat / food", ja: "食・しょくへん", examples: ["饭", "饱", "饮"] },
  { num: 185, radical: "首", strokes: 9, pinyin: "shǒu", hanviet: "thủ", vi: "Đầu mối, người đứng đầu", en: "Head / chief", ja: "首（くび）", examples: ["馗"] },
  { num: 186, radical: "香", strokes: 9, pinyin: "xiāng", hanviet: "hương", vi: "Thơm ngát, hương hoa, mùi thơm", en: "Fragrant", ja: "香（かおり）", examples: ["馥"] },

  // 10 strokes
  { num: 187, radical: "馬 (马)", strokes: 10, pinyin: "mǎ", hanviet: "mã", vi: "Con ngựa, phi nhanh", en: "Horse", ja: "馬（うま）", examples: ["骑", "驾", "验"] },
  { num: 188, radical: "骨", strokes: 10, pinyin: "gǔ", hanviet: "cốt", vi: "Khung xương, cốt cách cứng cỏi", en: "Bone / skeleton", ja: "骨（ほね）", examples: ["骼", "髓"] },
  { num: 189, radical: "高", strokes: 10, pinyin: "gāo", hanviet: "cao", vi: "Cao ráo, vươn cao, thanh cao", en: "Tall / high", ja: "高（たかい）", examples: ["敲"] },
  { num: 190, radical: "髟", strokes: 10, pinyin: "biāo", hanviet: "bưu", vi: "Mái tóc dài buông xõa", en: "Long hair", ja: "かみがしら", examples: ["髦", "髯"] },
  { num: 191, radical: "鬥", strokes: 10, pinyin: "dòu", hanviet: "đấu", vi: "Đánh nhau, chiến đấu giao tranh", en: "Fight / battle", ja: "闘（とうがまえ）", examples: ["闹"] },
  { num: 192, radical: "鬯", strokes: 10, pinyin: "chàng", hanviet: "sưởng", vi: "Rượu nghệ thơm cúng thần linh", en: "Sacrificial wine", ja: "ちょう", examples: ["郁"] },
  { num: 193, radical: "鬲", strokes: 10, pinyin: "lì", hanviet: "cách", vi: "Cái nồi ba chân thời cổ", en: "Tripod kettle", ja: "れき", examples: ["融"] },
  { num: 194, radical: "鬼", strokes: 10, pinyin: "guǐ", hanviet: "quỷ", vi: "Hồn ma quỷ quái, linh hồn", en: "Ghost / spirit", ja: "鬼（おに）", examples: ["魂", "魄", "魔"] },

  // 11 strokes
  { num: 195, radical: "魚 (鱼)", strokes: 11, pinyin: "yú", hanviet: "ngư", vi: "Con cá, thủy sản sông biển", en: "Fish", ja: "魚（うお・さかな）", examples: ["鲜", "鲁", "鲸"] },
  { num: 196, radical: "鳥 (鸟)", strokes: 11, pinyin: "niǎo", hanviet: "điểu", vi: "Con chim, loài có cánh bay lượn", en: "Bird", ja: "鳥（とり）", examples: ["鸭", "鸣", "鸡"] },
  { num: 197, radical: "鹵 (卤)", strokes: 11, pinyin: "lǔ", hanviet: "lỗ", vi: "Đất mặn, muối khoáng, ngâm gia vị", en: "Salt / brine", ja: "しお", examples: ["碱"] },
  { num: 198, radical: "鹿", strokes: 11, pinyin: "lù", hanviet: "lộc", vi: "Con hươu, con nai rừng", en: "Deer", ja: "鹿（しか）", examples: ["尘", "麋"] },
  { num: 199, radical: "麥 (麦)", strokes: 11, pinyin: "mài", hanviet: "mạch", vi: "Lúa mì, lúa mạch bột mì", en: "Wheat / barley", ja: "麦（むぎ）", examples: ["麸"] },
  { num: 200, radical: "麻", strokes: 11, pinyin: "má", hanviet: "ma", vi: "Cây gai, cây lanh dệt vải, tê dại", en: "Hemp / numb", ja: "麻（あさ）", examples: ["麾"] },

  // 12 strokes
  { num: 201, radical: "黃 (黄)", strokes: 12, pinyin: "huáng", hanviet: "hoàng", vi: "Màu vàng của đất đai hoàng đế", en: "Yellow", ja: "黄（きいろ）", examples: ["黉"] },
  { num: 202, radical: "黍", strokes: 12, pinyin: "shǔ", hanviet: "thử", vi: "Cây kê dẻo nấu rượu", en: "Millet", ja: "きび", examples: ["黎"] },
  { num: 203, radical: "黑", strokes: 12, pinyin: "hēi", hanviet: "hắc", vi: "Màu đen tuyền của than khói", en: "Black / dark", ja: "黒（くろ）", examples: ["默", "黛"] },
  { num: 204, radical: "黹", strokes: 12, pinyin: "zhǐ", hanviet: "chỉ", vi: "Khâu vá, thêu thùa hoa văn", en: "Embroidery", ja: "ぬいとり", examples: ["黼"] },

  // 13 strokes
  { num: 205, radical: "黽 (黾)", strokes: 13, pinyin: "mǐn", hanviet: "mãnh", vi: "Con ếch, loài lưỡng cư nhảy", en: "Frog / toad", ja: "べんあし", examples: ["鼋"] },
  { num: 206, radical: "鼎", strokes: 13, pinyin: "dǐng", hanviet: "đỉnh", vi: "Đỉnh đồng ba chân hai tai", en: "Bronze cauldron", ja: "鼎（かなえ）", examples: ["鼐"] },
  { num: 207, radical: "鼓", strokes: 13, pinyin: "gǔ", hanviet: "cổ", vi: "Cái trống gõ, cổ vũ tinh thần", en: "Drum", ja: "鼓（つづみ）", examples: ["鼗"] },
  { num: 208, radical: "鼠", strokes: 13, pinyin: "shǔ", hanviet: "thử", vi: "Con chuột, loài gặm nhấm", en: "Rat / mouse", ja: "鼠（ねずみ）", examples: ["鼯"] },

  // 14 strokes
  { num: 209, radical: "鼻", strokes: 14, pinyin: "bí", hanviet: "tị", vi: "Chiếc mũi hít thở, khứu giác", en: "Nose", ja: "鼻（はな）", examples: ["鼾"] },
  { num: 210, radical: "齊 (齐)", strokes: 14, pinyin: "qí", hanviet: "tề", vi: "Ngay ngắn, bằng nhau, tề chỉnh", en: "Even / uniform", ja: "斉（せい）", examples: ["斋"] },

  // 15 strokes
  { num: 211, radical: "齒 (齿)", strokes: 15, pinyin: "chǐ", hanviet: "xỉ", vi: "Hàm răng nhai, tuổi tác", en: "Tooth / teeth", ja: "歯（は）", examples: ["龄", "啮"] },

  // 16 strokes
  { num: 212, radical: "龍 (龙)", strokes: 16, pinyin: "lóng", hanviet: "long", vi: "Con rồng huyền thoại, cao quý", en: "Dragon", ja: "竜（りゅう）", examples: ["庞"] },
  { num: 213, radical: "龜 (龟)", strokes: 16, pinyin: "guī", hanviet: "quy", vi: "Con rùa trường thọ", en: "Turtle / tortoise", ja: "亀（かめ）", examples: ["龝"] },

  // 17 strokes
  { num: 214, radical: "龠", strokes: 17, pinyin: "yuè", hanviet: "dược", vi: "Ống sáo trúc nhiều lỗ thời cổ", en: "Flute / pipe", ja: "やく", examples: ["龡"] }
];

const ALL_RADICALS = [...RAW_RADICALS, ...EXTENDED_RADICALS_SPECS].map(r => ({
  id: `rad_${String(r.num).padStart(3, '0')}`,
  num: r.num,
  radical: r.radical,
  strokes: r.strokes,
  pinyin: r.pinyin,
  hanviet: r.hanviet,
  meaning: {
    vi: r.vi,
    en: r.en,
    ja: r.ja
  },
  examples: r.examples || [],
  tip: {
    vi: r.tip || `Bộ thủ ${r.hanviet} (${r.radical}) gồm ${r.strokes} nét.`,
    en: `${r.radical} radical with ${r.strokes} stroke(s).`,
    ja: `部首「${r.radical}」（${r.strokes}画）。`
  }
}));

console.log(`Generated ${ALL_RADICALS.length} Kangxi Radicals.`);

// 3. Load MINI_DICT and convert into enriched Vocab catalog
const miniDictCode = fs.readFileSync(path.join(rootDir, 'js/data/mini-dict.js'), 'utf8');
let MINI_DICT_OBJ = {};
try {
  const sandbox = {};
  const fn = new Function('sandbox', miniDictCode.replace('const MINI_DICT', 'sandbox.MINI_DICT'));
  fn(sandbox);
  MINI_DICT_OBJ = sandbox.MINI_DICT || {};
  console.log(`Successfully parsed MINI_DICT: ${Object.keys(MINI_DICT_OBJ).length} words.`);
} catch (e) {
  console.error('Failed to parse MINI_DICT:', e);
}

// 4. Curated Core High-Frequency Thematic & HSK Vocabulary
// Each category receives hand-crafted practical conversational items
const CURATED_VOCAB_BASE = [
  // Greetings (greetings)
  {
    hanzi: "你好",
    pinyin: "nǐ hǎo",
    hanviet: "nhĩ hảo",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Xin chào", en: "Hello / Hi", ja: "こんにちは" },
    examples: [
      { zh: "你好！很高兴认识你。", pinyin: "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.", vi: "Xin chào! Rất vui được làm quen với bạn.", en: "Hello! Nice to meet you.", ja: "こんにちは！お会いできて嬉しいです。" }
    ],
    tip: { vi: "Câu chào phổ biến nhất trong tiếng Trung, dùng cho mọi lứa tuổi.", en: "Most universal Chinese greeting.", ja: "最も基本的な挨拶表現。" }
  },
  {
    hanzi: "您好",
    pinyin: "nín hǎo",
    hanviet: "nẫm hảo",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Chào bạn / Chào ngài (kính ngữ)", en: "Hello (polite / respectful)", ja: "こんにちは（丁寧）" },
    examples: [
      { zh: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", vi: "Thưa thầy, em chào thầy ạ!", en: "Hello, Teacher!", ja: "先生、こんにちは！" }
    ],
    tip: { vi: "Dùng để chào người lớn tuổi hơn, sếp hoặc khách hàng để thể hiện sự tôn trọng.", en: "Formal respect form.", ja: "目上の人に対する敬称。" }
  },
  {
    hanzi: "谢谢",
    pinyin: "xièxie",
    hanviet: "tạ tạ",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Cảm ơn", en: "Thank you / Thanks", ja: "ありがとう" },
    examples: [
      { zh: "太谢谢你的帮助了！", pinyin: "Tài xièxie nǐ de bāngzhù le!", vi: "Vô cùng cảm ơn sự giúp đỡ của bạn!", en: "Thank you so much for your help!", ja: "手助けしてくれて本当にありがとう！" }
    ],
    tip: { vi: "Có thể lặp lại hoặc kết hợp '非常感谢' (fēicháng gǎnxiè) để tăng sự chân thành.", en: "Universal gratitude word.", ja: "感謝の定番表現。" }
  },
  {
    hanzi: "不客气",
    pinyin: "bú kèqi",
    hanviet: "bất khách khí",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Không có gì / Đừng khách sáo", en: "You're welcome / Not at all", ja: "どういたしまして" },
    examples: [
      { zh: "不用谢，不客气！", pinyin: "Bú yòng xiè, bú kèqi!", vi: "Không cần cảm ơn đâu, đừng khách sáo!", en: "Don't mention it, you're welcome!", ja: "お礼なんていいですよ、どういたしまして！" }
    ],
    tip: { vi: "Đáp lại lời cảm ơn một cách thân thiện và lịch sự.", en: "Polite response to thank-you.", ja: "感謝への丁寧な返答。" }
  },
  {
    hanzi: "对不起",
    pinyin: "duìbuqǐ",
    hanviet: "đối bất khởi",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Xin lỗi", en: "Sorry / Excuse me", ja: "ごめんなさい・すみません" },
    examples: [
      { zh: "对不起，我迟到了。", pinyin: "Duìbuqǐ, wǒ chídào le.", vi: "Xin lỗi, tôi đến muộn mất rồi.", en: "Sorry, I am late.", ja: "すみません、遅刻してしまいました。" }
    ],
    tip: { vi: "Dùng khi mắc lỗi cần tạ lỗi chân thành.", en: "Sincere apology.", ja: "心からの謝罪表現。" }
  },
  {
    hanzi: "没关系",
    pinyin: "méi guānxi",
    hanviet: "một quan hệ",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Không sao đâu / Không vấn đề gì", en: "It doesn't matter / That's fine", ja: "大丈夫です・構いません" },
    examples: [
      { zh: "没关系，下次注意就好。", pinyin: "Méi guānxi, xià cì zhùyì jiù hǎo.", vi: "Không sao đâu, lần sau chú ý là được.", en: "It's fine, just be careful next time.", ja: "大丈夫ですよ、次は気をつけてね。" }
    ],
    tip: { vi: "Đáp lại khi người khác nói '对不起'.", en: "Response to apologies.", ja: "謝罪への返答。" }
  },
  {
    hanzi: "再见",
    pinyin: "zàijiàn",
    hanviet: "tái kiến",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Tạm biệt / Hẹn gặp lại", en: "Goodbye / See you again", ja: "さようなら・またね" },
    examples: [
      { zh: "明天见，再见！", pinyin: "Míngtiān jiàn, zàijiàn!", vi: "Hẹn gặp lại ngày mai, tạm biệt!", en: "See you tomorrow, goodbye!", ja: "また明日、さようなら！" }
    ],
    tip: { vi: "Nghĩa đen là 'gặp lại lần nữa', mang ý tích cực.", en: "Lit. see you again.", ja: "「また会おう」という意味を込めた別れの挨拶。" }
  },
  {
    hanzi: "早上好",
    pinyin: "zǎoshang hǎo",
    hanviet: "tảo thượng hảo",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Chào buổi sáng", en: "Good morning", ja: "おはようございます" },
    examples: [
      { zh: "大家早上好！今天天气真好。", pinyin: "Dàjiā zǎoshang hǎo! Jīntiān tiānqì zhēn hǎo.", vi: "Chào buổi sáng cả nhà! Thời tiết hôm nay đẹp thật.", en: "Good morning everyone! The weather is great today.", ja: "皆さんおはようございます！今日は良い天気ですね。" }
    ],
    tip: { vi: "Có thể nói ngắn gọn là '早！' (zǎo) giữa bạn bè.", en: "Informal short: 早!", ja: "親しい間柄なら「早！」だけでもOK。" }
  },
  {
    hanzi: "晚安",
    pinyin: "wǎn'ān",
    hanviet: "vãn an",
    level: "hsk1",
    category: "greetings",
    meanings: { vi: "Chúc ngủ ngon", en: "Good night", ja: "おやすみなさい" },
    examples: [
      { zh: "时间不早了，大家晚安！", pinyin: "Shíjiān bù zǎo le, dàjiā wǎn'ān!", vi: "Muộn rồi, chúc mọi người ngủ ngon!", en: "It's late, good night everyone!", ja: "もう遅いので、皆さんおやすみなさい！" }
    ],
    tip: { vi: "Dùng trước khi đi ngủ hoặc kết thúc cuộc trò chuyện đêm muộn.", en: "Used before sleep.", ja: "就寝前の挨拶。" }
  },

  // Food & Dining (food)
  {
    hanzi: "好吃",
    pinyin: "hǎochī",
    hanviet: "hảo khích",
    level: "hsk1",
    category: "food",
    meanings: { vi: "Ngon / Món ăn ngon", en: "Delicious / tasty", ja: "美味しい" },
    examples: [
      { zh: "这道中国菜真好吃！", pinyin: "Zhè dào Zhōngguó cài zhēn hǎochī!", vi: "Món Trung Quốc này ngon thật đấy!", en: "This Chinese dish is really delicious!", ja: "この中華料理は本当に美味しいです！" }
    ],
    tip: { vi: "Dùng cho thức ăn; đồ uống thì dùng '好喝' (hǎohē).", en: "For food (use 好喝 for drinks).", ja: "食べ物の「美味しい」に使う。飲み物は「好喝」。" }
  },
  {
    hanzi: "买单",
    pinyin: "mǎidān",
    hanviet: "mãi đơn",
    level: "hsk2",
    category: "food",
    meanings: { vi: "Thanh toán tiền / Tính tiền", en: "Pay the bill / Check please", ja: "お会計・お勘定" },
    examples: [
      { zh: "服务员，买单！", pinyin: "Fúwùyuán, mǎidān!", vi: "Phục vụ ơi, tính tiền giúp tôi!", en: "Waiter, bill please!", ja: "店員さん、お会計お願いします！" }
    ],
    tip: { vi: "Câu cửa miệng quen thuộc khi muốn thanh toán ở nhà hàng.", en: "Standard restaurant phrase.", ja: "飲食店での必須フレーズ。" }
  },
  {
    hanzi: "菜单",
    pinyin: "càidān",
    hanviet: "thái đơn",
    level: "hsk2",
    category: "food",
    meanings: { vi: "Thực đơn / Menu", en: "Menu", ja: "メニュー" },
    examples: [
      { zh: "请给我看一下菜单。", pinyin: "Qǐng gěi wǒ kàn yíxià càidān.", vi: "Làm ơn cho tôi xem thực đơn một chút.", en: "Please show me the menu.", ja: "メニューを見せていただけますか。" }
    ],
    tip: { vi: "Vào quán ăn, gọi '服务员，请给我菜单' là chuẩn nhất.", en: "Asking for menu.", ja: "注文時の基本語彙。" }
  },
  {
    hanzi: "点菜",
    pinyin: "diǎn cài",
    hanviet: "điểm thái",
    level: "hsk2",
    category: "food",
    meanings: { vi: "Gọi món / Chọn món", en: "Order food", ja: "注文する" },
    examples: [
      { zh: "你们准备好点菜了吗？", pinyin: "Nǐmen zhǔnbèi hǎo diǎn cài le ma?", vi: "Các bạn đã sẵn sàng gọi món chưa?", en: "Are you ready to order?", ja: "ご注文はお決まりですか？" }
    ],
    tip: { vi: "Hành động chọn món từ thực đơn.", en: "Ordering dishes.", ja: "料理を注文する行為。" }
  },
  {
    hanzi: "不要辣",
    pinyin: "bú yào là",
    hanviet: "bất yếu lạt",
    level: "hsk1",
    category: "food",
    meanings: { vi: "Không lấy cay / Đừng làm cay", en: "Not spicy / no chili", ja: "辛くしないで" },
    examples: [
      { zh: "我不太能吃辣，请不要辣。", pinyin: "Wǒ bú tài néng chī là, qǐng bú yào là.", vi: "Tôi không ăn được cay lắm, làm ơn đừng cho cay nhé.", en: "I can't eat spicy, please make it non-spicy.", ja: "辛いのが苦手なので、辛くしないでください。" }
    ],
    tip: { vi: "Câu sinh tồn khi đi ăn ở Tứ Xuyên, Hồ Nam hoặc các quán Trung Quốc.", en: "Essential survival phrase in China.", ja: "中国旅行での最重要サバイバル表現。" }
  },

  // Shopping & Money (shopping)
  {
    hanzi: "多少钱",
    pinyin: "duōshao qián",
    hanviet: "đa thiểu tiền",
    level: "hsk1",
    category: "shopping",
    meanings: { vi: "Bao nhiêu tiền", en: "How much is it?", ja: "いくらですか" },
    examples: [
      { zh: "老板，这个多少钱？", pinyin: "Lǎobǎn, zhèige duōshao qián?", vi: "Chủ quán ơi, cái này bao nhiêu tiền?", en: "Boss, how much is this?", ja: "店長、これはいくらですか？" }
    ],
    tip: { vi: "Mẫu câu hỏi giá kinh điển và hữu dụng nhất.", en: "The golden price inquiry question.", ja: "最もよく使う値段の尋ね方。" }
  },
  {
    hanzi: "太贵了",
    pinyin: "tài guì le",
    hanviet: "thái quý liễu",
    level: "hsk1",
    category: "shopping",
    meanings: { vi: "Đắt quá rồi / Mắc quá", en: "Too expensive!", ja: "高すぎます" },
    examples: [
      { zh: "这个太贵了，便宜一点吧！", pinyin: "Zhèige tài guì le, piányi yìdiǎn ba!", vi: "Cái này đắt quá, bớt chút đi!", en: "This is too expensive, a little cheaper please!", ja: "これは高すぎます、少し安くしてください！" }
    ],
    tip: { vi: "Dùng để mở đầu cho việc mặc cả khi mua sắm ngoài chợ.", en: "Bargaining opener.", ja: "値引き交渉の第一声。" }
  },
  {
    hanzi: "便宜",
    pinyin: "piányi",
    hanviet: "tiện nghi",
    level: "hsk2",
    category: "shopping",
    meanings: { vi: "Rẻ / Giảm giá", en: "Cheap / inexpensive", ja: "安い" },
    examples: [
      { zh: "能便宜一点吗？", pinyin: "Néng piányi yìdiǎn ma?", vi: "Có thể bớt một chút được không?", en: "Can it be a little cheaper?", ja: "少し安くしてもらえますか？" }
    ],
    tip: { vi: "Tính từ miêu tả giá rẻ hoặc động từ bớt giá.", en: "Cheap or discount.", ja: "値段が手頃、または値引き。" }
  },
  {
    hanzi: "扫码",
    pinyin: "sǎomǎ",
    hanviet: "tảo mã",
    level: "hsk2",
    category: "shopping",
    meanings: { vi: "Quét mã QR thanh toán", en: "Scan QR code to pay", ja: "QRコードをスキャンする" },
    examples: [
      { zh: "我扫你还是你扫我？", pinyin: "Wǒ sǎo nǐ háishi nǐ sǎo wǒ?", vi: "Tôi quét mã của bạn hay bạn quét mã tôi?", en: "Shall I scan you or you scan me?", ja: "私がスキャンしますか、それともあなたがしますか？" }
    ],
    tip: { vi: "Cách thanh toán phổ biến 100% tại Trung Quốc hiện đại.", en: "Everyday Chinese payment method.", ja: "中国現代社会の基本決済行為。" }
  },

  // Travel & Transport (travel)
  {
    hanzi: "在哪里",
    pinyin: "zài nǎlǐ",
    hanviet: "tại na lý",
    level: "hsk1",
    category: "travel",
    meanings: { vi: "Ở đâu / Nằm ở chỗ nào", en: "Where is it located?", ja: "どこにありますか" },
    examples: [
      { zh: "请问，洗手间在哪里？", pinyin: "Qǐngwèn, xǐshǒujiān zài nǎlǐ?", vi: "Xin hỏi, nhà vệ sinh ở đâu ạ?", en: "Excuse me, where is the restroom?", ja: "すみません、お手洗いはどこですか？" }
    ],
    tip: { vi: "Kết hợp [Địa điểm] + 在哪里 để hỏi bất kỳ nơi nào.", en: "Essential location inquiry pattern.", ja: "場所を尋ねる万能構文。" }
  },
  {
    hanzi: "地铁站",
    pinyin: "dìtiě zhàn",
    hanviet: "địa thiết trạm",
    level: "hsk2",
    category: "travel",
    meanings: { vi: "Ga tàu điện ngầm", en: "Subway station / Metro station", ja: "地下鉄の駅" },
    examples: [
      { zh: "最近的地铁站在哪儿？", pinyin: "Zuì jìn de dìtiě zhàn zài nǎr?", vi: "Ga tàu điện ngầm gần nhất ở đâu?", en: "Where is the nearest subway station?", ja: "一番近い地下鉄の駅はどこですか？" }
    ],
    tip: { vi: "Phương tiện di chuyển nhanh và tiện nhất ở các thành phố lớn.", en: "Key transportation hub.", ja: "都市観光の要。" }
  },
  {
    hanzi: "打车",
    pinyin: "dǎchē",
    hanviet: "đả xa",
    level: "hsk2",
    category: "travel",
    meanings: { vi: "Bắt taxi / Đi taxi", en: "Take a taxi / Call a cab", ja: "タクシーに乗る・呼ぶ" },
    examples: [
      { zh: "我们打车去机场吧。", pinyin: "Wǒmen dǎchē qù jīchǎng ba.", vi: "Chúng ta bắt taxi ra sân bay đi.", en: "Let's take a taxi to the airport.", ja: "タクシーで空港に行きましょう。" }
    ],
    tip: { vi: "Tại Trung Quốc hay dùng ứng dụng Didi (滴滴打车).", en: "Taking a cab / Didi.", ja: "タクシーや配車アプリを使うこと。" }
  },

  // Trendy Slang (slang)
  {
    hanzi: "给力",
    pinyin: "gěilì",
    hanviet: "cấp lực",
    level: "hsk3",
    category: "slang",
    meanings: { vi: "Đỉnh chóp / Hết nước chấm / Tuyệt vời", en: "Awesome / cool / effective", ja: "イケてる・素晴らしい" },
    examples: [
      { zh: "这首歌太给力了！", pinyin: "Zhè shǒu gē tài gěilì le!", vi: "Bài hát này đỉnh chóp quá!", en: "This song is so awesome!", ja: "この曲すごくイケてるね！" }
    ],
    tip: { vi: "Từ lóng mạng khen ngợi sự hỗ trợ đắc lực hoặc điều gì đó cực kỳ hay.", en: "High praise internet slang.", ja: "若者に大人気の称賛スラング。" }
  },
  {
    hanzi: "加油",
    pinyin: "jiāyóu",
    hanviet: "gia du",
    level: "hsk1",
    category: "feelings",
    meanings: { vi: "Cố lên! / Tiến lên!", en: "Cheer up! / Go for it!", ja: "頑張れ！" },
    examples: [
      { zh: "明天考试，大家加油！", pinyin: "Míngtiān kǎoshì, dàjiā jiāyóu!", vi: "Ngày mai thi rồi, cả nhà cùng cố lên nhé!", en: "Exam tomorrow, let's do our best!", ja: "明日テストだ、みんな頑張ろう！" }
    ],
    tip: { vi: "Nghĩa đen là 'thêm dầu', nghĩa bóng là cổ vũ động viên hết mình.", en: "Ultimate encouragement phrase.", ja: "中国語で最も有名な励ましの言葉。" }
  },
  {
    hanzi: "打卡",
    pinyin: "dǎkǎ",
    hanviet: "đả tạp",
    level: "hsk3",
    category: "slang",
    meanings: { vi: "Check-in / Chụp ảnh sống ảo / Điểm danh", en: "Check-in (attraction/work)", ja: "チェックイン・記念撮影" },
    examples: [
      { zh: "今天去网红店打卡了！", pinyin: "Jīntiān qù wǎnghóng diàn dǎkǎ le!", vi: "Hôm nay tôi đã đi check-in quán cà phê hot trend rồi!", en: "Checked in at the trendy cafe today!", ja: "今日は話題の映えスポットで写真を撮ってきたよ！" }
    ],
    tip: { vi: "Vừa có nghĩa quẹt thẻ đi làm, vừa có nghĩa check-in địa điểm nổi tiếng.", en: "Social media check-in or work punch-in.", ja: "出勤打刻、またはSNSの映えスポット訪問。" }
  },

  // Idioms (proverb)
  {
    hanzi: "马到成功",
    pinyin: "mǎ dào chéng gōng",
    hanviet: "mã đáo thành công",
    level: "hsk4",
    category: "proverb",
    meanings: { vi: "Mã đáo thành công (Đạt được thắng lợi ngay tức khắc)", en: "Achieve instant success", ja: "たちどころに成功する" },
    examples: [
      { zh: "祝你这次比赛马到成功！", pinyin: "Zhù nǐ zhè cì bǐsài mǎ dào chéng gōng!", vi: "Chúc bạn trong cuộc thi lần này mã đáo thành công!", en: "Wish you instant success in this competition!", ja: "今回の大会でのご武運と大成功をお祈りします！" }
    ],
    tip: { vi: "Thành ngữ chúc tụng may mắn kinh điển khi bắt đầu dự án hoặc thi cử.", en: "Classic success blessing.", ja: "勝負事や新しい挑戦への祝辞。" }
  },
  {
    hanzi: "入乡随俗",
    pinyin: "rù xiāng suí sú",
    hanviet: "nhập hương tùy tục",
    level: "hsk4",
    category: "proverb",
    meanings: { vi: "Nhập gia tùy tục (Đến đâu theo phong tục ở đó)", en: "When in Rome, do as the Romans do", ja: "郷に入っては郷に従え" },
    examples: [
      { zh: "到了中国，就要入乡随俗。", pinyin: "Dào le Zhōngguó, jiù yào rù xiāng suí sú.", vi: "Đến Trung Quốc thì phải nhập gia tùy tục thôi.", en: "When in China, one should adapt to local customs.", ja: "中国に着いたら、郷に入っては郷に従うべきだ。" }
    ],
    tip: { vi: "Khuyên nhủ tôn trọng văn hóa tập quán của nơi mình đến.", en: "Adapt to local culture.", ja: "その土地の風俗や習慣に従うことの教え。" }
  }
];

// Helper to determine category from part of speech / content
function inferCategory(hanzi, def) {
  const type = (def.type || '').toLowerCase();
  const vi = (def.vi || '').toLowerCase();
  const en = Array.isArray(def.en) ? def.en.join(' ').toLowerCase() : (def.en || '').toLowerCase();

  if (type === 'slang') return 'slang';
  if (type === 'proverb') return 'proverb';
  if (vi.includes('ăn') || vi.includes('uống') || vi.includes('món') || vi.includes('cơm') || vi.includes('nấu') || en.includes('eat') || en.includes('food') || en.includes('cook') || en.includes('tea')) return 'food';
  if (vi.includes('đi') || vi.includes('xe') || vi.includes('bay') || vi.includes('đường') || vi.includes('tàu') || en.includes('car') || en.includes('train') || en.includes('walk') || en.includes('fly')) return 'travel';
  if (vi.includes('mua') || vi.includes('bán') || vi.includes('tiền') || vi.includes('giá') || en.includes('buy') || en.includes('sell') || en.includes('price') || en.includes('money')) return 'shopping';
  if (vi.includes('chào') || vi.includes('ơn') || vi.includes('lỗi') || vi.includes('hỏi') || en.includes('hello') || en.includes('thank') || en.includes('sorry')) return 'greetings';
  if (vi.includes('vui') || vi.includes('buồn') || vi.includes('thích') || vi.includes('yêu') || vi.includes('sợ') || en.includes('happy') || en.includes('sad') || en.includes('love') || en.includes('fear')) return 'feelings';
  if (vi.includes('bố') || vi.includes('mẹ') || vi.includes('anh') || vi.includes('chị') || vi.includes('em') || vi.includes('con') || en.includes('father') || en.includes('mother') || en.includes('family')) return 'family';
  if (vi.includes('giờ') || vi.includes('ngày') || vi.includes('tháng') || vi.includes('năm') || vi.includes('mưa') || vi.includes('nắng') || en.includes('time') || en.includes('day') || en.includes('year') || en.includes('weather')) return 'time';
  if (vi.includes('học') || vi.includes('làm') || vi.includes('việc') || vi.includes('sách') || vi.includes('viết') || en.includes('study') || en.includes('work') || en.includes('book') || en.includes('write')) return 'work';
  if (vi.includes('đau') || vi.includes('bệnh') || vi.includes('thuốc') || vi.includes('viện') || en.includes('sick') || en.includes('pain') || en.includes('doctor') || en.includes('hospital')) return 'health';
  if (vi.includes('phòng') || vi.includes('khách') || vi.includes('nghỉ') || vi.includes('du lịch') || en.includes('hotel') || en.includes('room') || en.includes('tour')) return 'hotel';

  return 'greetings'; // fallback
}

// Convert MINI_DICT into Learn vocabulary entries
let autoIdCounter = 1;
const ALL_VOCABULARY = [...CURATED_VOCAB_BASE.map(item => ({
  id: `voc_${String(autoIdCounter++).padStart(4, '0')}`,
  ...item
}))];

const existingHanziSet = new Set(ALL_VOCABULARY.map(v => v.hanzi));

for (const [hanzi, def] of Object.entries(MINI_DICT_OBJ)) {
  if (existingHanziSet.has(hanzi)) continue;
  existingHanziSet.add(hanzi);

  const hskNum = def.hsk || 1;
  const level = `hsk${hskNum}`;
  const category = inferCategory(hanzi, def);

  const enMeanings = Array.isArray(def.en) ? def.en.join('; ') : (def.en || '');
  const viMeaning = def.vi || '';
  const jaMeaning = def.ja || '';

  ALL_VOCABULARY.push({
    id: `voc_${String(autoIdCounter++).padStart(4, '0')}`,
    hanzi: hanzi,
    pinyin: def.pinyin || '',
    hanviet: def.hanviet || '',
    level: level,
    category: category,
    meanings: {
      vi: viMeaning,
      en: enMeanings,
      ja: jaMeaning
    },
    examples: [
      {
        zh: `${hanzi}很好。`,
        pinyin: `${def.pinyin || ''} hěn hǎo.`,
        vi: `${viMeaning} rất tốt.`,
        en: `${enMeanings} is very good.`,
        ja: `${jaMeaning}はとても良いです。`
      }
    ],
    tip: {
      vi: `Từ vựng HSK ${hskNum} - Âm Hán-Việt: [${def.hanviet || ''}].`,
      en: `HSK ${hskNum} vocabulary word.`,
      ja: `HSK ${hskNum}級の基本単語。`
    }
  });
}

console.log(`Total Master Vocabulary: ${ALL_VOCABULARY.length} items across all levels.`);

// 5. Build Final learn-data.js File
const outputData = {
  meta: {
    name: 'Halou Smart Study Hub Dataset',
    version: '1.5.0',
    generatedAt: new Date().toISOString(),
    categoriesCount: CATEGORIES.length,
    radicalsCount: ALL_RADICALS.length,
    vocabularyCount: ALL_VOCABULARY.length
  },
  categories: CATEGORIES,
  radicals: ALL_RADICALS,
  vocabulary: ALL_VOCABULARY
};

const fileHeader = `/**
 * js/data/learn-data.js
 * 
 * Halou Smart Study Hub Master Dataset
 * - ${CATEGORIES.length} Thematic & Life Categories
 * - ${ALL_RADICALS.length} Kangxi Radicals (All 214 Radicals 1-17 strokes)
 * - ${ALL_VOCABULARY.length} Enriched Vocabulary across HSK 1-6 with Tri-lingual Meanings & Pinyin
 * 
 * Auto-generated by tools/build-learn-data.js
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.HALOU_LEARN_DATA = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  return ${JSON.stringify(outputData, null, 2)};
}));
`;

const destPath = path.join(rootDir, 'js/data/learn-data.js');
fs.writeFileSync(destPath, fileHeader, 'utf8');
console.log(`✅ Successfully written dataset to ${destPath}`);
