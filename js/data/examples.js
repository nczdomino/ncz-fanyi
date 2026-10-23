// js/data/examples.js - Curated bilingual and trilingual example sentences corpus - Dependencies: none
const WORD_EXAMPLES_LIST = [
  {
    "zh": "你好！很高兴认识你。",
    "pinyin": "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.",
    "vi": "Xin chào! Rất vui được làm quen với bạn.",
    "en": "Hello! Nice to meet you.",
    "ja": "こんにちは！お会いできて嬉しいです。"
  },
  {
    "zh": "非常感谢你的热情帮助！",
    "pinyin": "Fēicháng gǎnxiè nǐ de rèqíng bāngzhù!",
    "vi": "Vô cùng cảm ơn sự giúp đỡ nhiệt tình của bạn!",
    "en": "Thank you very much for your warm help!",
    "ja": "温かいご支援をいただき、誠にありがとうございます！"
  },
  {
    "zh": "非常谢谢你的帮助，太麻烦你了！",
    "pinyin": "Fēicháng xièxie nǐ de bāngzhù, tài máfan nǐ le!",
    "vi": "Vô cùng cảm ơn sự giúp đỡ của bạn, làm phiền bạn quá!",
    "en": "Thank you so much for your help, sorry for troubling you!",
    "ja": "助けてくれて本当にありがとう、お手数をおかけしました！"
  },
  {
    "zh": "对不起，我刚才没有听清楚，请再说一遍。",
    "pinyin": "Duìbuqǐ, wǒ gāngcái méiyǒu tīng qīngchu, qǐng zài shuō yí biàn.",
    "vi": "Xin lỗi, ban nãy tôi nghe chưa rõ, xin hãy nói lại một lần.",
    "en": "Sorry, I didn't hear clearly just now, please say it again.",
    "ja": "すみません、さっきよく聞き取れませんでした。もう一度言っていただけますか。"
  },
  {
    "zh": "没关系，请你不要放在心上。",
    "pinyin": "Méiguānxi, qǐng nǐ bú yào fàng zài xīnr shang.",
    "vi": "Không có gì, bạn đừng bận tâm nhé.",
    "en": "It's alright, please don't take it to heart.",
    "ja": "大丈夫です、気にしないでください。"
  },
  {
    "zh": "明天见，祝你周末愉快！",
    "pinyin": "Míngtiān jiàn, zhù nǐ zhōumò yúkuài!",
    "vi": "Hẹn gặp lại ngày mai, chúc bạn cuối tuần vui vẻ!",
    "en": "See you tomorrow, have a great weekend!",
    "ja": "また明日、良い週末をお過ごしください！"
  },
  {
    "zh": "请问去北京火车站怎么走？",
    "pinyin": "Qǐngwèn qù Běijīng huǒchēzhàn zěnme zǒu?",
    "vi": "Xin hỏi đi đến ga tàu hỏa Bắc Kinh đi đường nào?",
    "en": "Excuse me, how can I get to Beijing Railway Station?",
    "ja": "すみません、北京駅へはどう行けばいいですか？"
  },
  {
    "zh": "欢迎来到中国，祝你旅途愉快！",
    "pinyin": "Huānyíng lái dào Zhōngguó, zhù nǐ lǚtú yúkuài!",
    "vi": "Chào mừng bạn đến Trung Quốc, chúc bạn có một chuyến đi vui vẻ!",
    "en": "Welcome to China, wish you a pleasant journey!",
    "ja": "中国へようこそ、楽しい旅をお祈りします！"
  },
  {
    "zh": "祝你生日快乐，身体健康，万事如意！",
    "pinyin": "Zhù nǐ shēngrì kuàilè, shēntǐ jiànkāng, wànshì rúyì!",
    "vi": "Chúc bạn sinh nhật vui vẻ, dồi dào sức khỏe, vạn sự như ý!",
    "en": "Happy birthday to you, wish you good health and all the best!",
    "ja": "お誕生日おめでとうございます！ご健康とご多幸をお祈りします！"
  },
  {
    "zh": "好久不见了，最近生活过得怎么样？",
    "pinyin": "Hǎojiǔ bújiàn le, zuìjìn shēnghuó guò de zěnmeyàng?",
    "vi": "Đã lâu không gặp, dạo này cuộc sống thế nào rồi?",
    "en": "Long time no see, how has your life been lately?",
    "ja": "久しぶりですね、最近の生活はどうですか？"
  },
  {
    "zh": "请大家安静一下，现在开始开会。",
    "pinyin": "Qǐng dàjiā ānjìng yíxià, xiànzài kāishǐ kāihuì.",
    "vi": "Xin mọi người trật tự một chút, bây giờ bắt đầu cuộc họp.",
    "en": "Please be quiet everyone, the meeting is starting now.",
    "ja": "皆さん静かにしてください、これから会議を始めます。"
  },
  {
    "zh": "今天天气很好，阳光明媚，我们去公园散步吧。",
    "pinyin": "Jīntiān tiānqì hěn hǎo, yángguāng míngmèi, wǒmen qù gōngyuán sànbù ba.",
    "vi": "Hôm nay thời tiết rất đẹp, ánh nắng rạng rỡ, chúng mình ra công viên dạo bộ nhé.",
    "en": "The weather is very nice today with bright sunshine, let's take a walk in the park.",
    "ja": "今日は天気がとても良く日差しが明るいので、公園を散歩しましょう。"
  },
  {
    "zh": "他每天早晨六点起床，然后晨跑半个小时。",
    "pinyin": "Tā měitiān zǎochén liù diǎn qǐchuáng, ránhòu chénpǎo bàn gè xiǎoshí.",
    "vi": "Anh ấy thức dậy lúc sáu giờ mỗi sáng, sau đó chạy bộ nửa tiếng.",
    "en": "He wakes up at six every morning and then jogs for half an hour.",
    "ja": "彼は毎朝6時に起きて、30分ジョギングをします。"
  },
  {
    "zh": "我喜欢在安静的书房里一边喝茶一边看书。",
    "pinyin": "Wǒ xǐhuan zài ānjìng de shūfáng lǐ yìbiān hēchá yìbiān kànshū.",
    "vi": "Tôi thích ngồi trong phòng sách yên tĩnh vừa uống trà vừa đọc sách.",
    "en": "I like sitting in a quiet study room drinking tea while reading books.",
    "ja": "私は静かな書斎でお茶を飲みながら本を読むのが好きです。"
  },
  {
    "zh": "今天晚上我们一起去那家中餐厅吃北京烤鸭吧。",
    "pinyin": "Jīntiān wǎnshang wǒmen yìqǐ qù nà jiā zhōngcāntīng chī Běijīng kǎoyā ba.",
    "vi": "Tối nay chúng mình cùng đến nhà hàng Trung Hoa đó ăn vịt quay Bắc Kinh nhé.",
    "en": "Let's go to that Chinese restaurant together tonight to eat Peking roast duck.",
    "ja": "今晩、あの中華料理店に一緒に北京ダックを食べに行きましょう。"
  },
  {
    "zh": "中午我们打算去学校食堂吃米饭和牛肉。",
    "pinyin": "Zhōngwǔ wǒmen dǎsuàn qù xuéxiào shítáng chī mǐfàn hé niúròu.",
    "vi": "Buổi trưa chúng mình dự định đến nhà ăn trường ăn cơm và thịt bò.",
    "en": "At noon we plan to go to the school cafeteria to eat rice and beef.",
    "ja": "昼は学校の食堂へ行ってご飯と牛肉を食べる予定です。"
  },
  {
    "zh": "请喝一杯热咖啡，提提神吧。",
    "pinyin": "Qǐng hē yì bēi rè kāfēi, tí tí shén ba.",
    "vi": "Xin mời uống một tách cà phê nóng cho tỉnh táo nhé.",
    "en": "Please drink a cup of hot coffee to refresh yourself.",
    "ja": "温かいコーヒーを飲んで、リフレッシュしてください。"
  },
  {
    "zh": "你工作了这么久，一定渴了吧，先喝杯温水。",
    "pinyin": "Nǐ gōngzuò le zhème jiǔ, yídìng kě le ba, xiān hē bēi wēnshuǐ.",
    "vi": "Bạn làm việc lâu thế này chắc khát rồi, uống một cốc nước ấm trước đi.",
    "en": "You've worked for so long, you must be thirsty; have a glass of warm water first.",
    "ja": "こんなに長く働いて喉が渇いたでしょう。まず白湯を一杯飲んでください。"
  },
  {
    "zh": "昨晚因为熬夜准备材料，今天早上感觉很困。",
    "pinyin": "Zuówǎn yīnwèi áoyè zhǔnbèi cáiliào, jīntiān zǎoshang gǎnjué hěn kùn.",
    "vi": "Đêm qua vì thức khuya chuẩn bị tài liệu nên sáng nay cảm thấy rất buồn ngủ.",
    "en": "Because I stayed up late preparing materials last night, I feel very sleepy this morning.",
    "ja": "昨夜は資料の準備で夜更かししたため、今朝はとても眠いです。"
  },
  {
    "zh": "妈妈正在厨房里忙着为大家准备丰盛的午餐。",
    "pinyin": "Māma zhèngzài chúfáng lǐ máng zhe wèi dàjiā zhǔnbèi fēngshèng de wǔcān.",
    "vi": "Mẹ đang bận rộn trong bếp chuẩn bị bữa trưa thịnh soạn cho cả nhà.",
    "en": "Mom is busy in the kitchen preparing a sumptuous lunch for everyone.",
    "ja": "お母さんは台所でみんなのために豪華な昼食を準備するのに忙しいです。"
  },
  {
    "zh": "他习惯骑自行车上班，既能锻炼身体又很环保。",
    "pinyin": "Tā xíguàn qí zìxíngchē shàngbān, jì néng duànliàn shēntǐ yòu hěn huánbǎo.",
    "vi": "Anh ấy có thói quen đi xe đạp đi làm, vừa rèn luyện thân thể lại rất bảo vệ môi trường.",
    "en": "He is accustomed to riding a bicycle to work, which exercises his body and protects the environment.",
    "ja": "彼は自転車で通勤する習慣があり、体を鍛えられる上に環境にも優しいです。"
  },
  {
    "zh": "周末我常常打扫房间，洗衣服，把家里收拾得干干净净。",
    "pinyin": "Zhōumò wǒ chángcháng dǎsǎo fángjiān, xǐ yīfu, bǎ jiālǐ shōushi de gāngānjìngjìng.",
    "vi": "Cuối tuần tôi thường dọn dẹp phòng, giặt quần áo, thu xếp nhà cửa thật sạch sẽ.",
    "en": "On weekends I often clean the room, do laundry, and tidy up the house cleanly.",
    "ja": "週末にはよく部屋を掃除し、洗濯をして、家の中をきれいに片付けます。"
  },
  {
    "zh": "晚上十点以后请不要大声喧哗，以免打扰邻居休息。",
    "pinyin": "Wǎnshang shí diǎn yǐhòu qǐng bú yào dà shēng xuānhuá, yǐmiǎn dǎrǎo línjū xiūxi.",
    "vi": "Sau mười giờ đêm xin đừng làm ồn, tránh làm phiền hàng xóm nghỉ ngơi.",
    "en": "Please do not make loud noises after 10 PM to avoid disturbing neighbors.",
    "ja": "近所の人の休息を妨げないよう、夜10時以降は大声を出さないでください。"
  },
  {
    "zh": "我喜欢看中国电影，也喜欢听中文流行歌曲。",
    "pinyin": "Wǒ xǐhuan kàn Zhōngguó diànyǐng, yě xǐhuan tīng zhōngwén liúxíng gēqǔ.",
    "vi": "Tôi thích xem phim Trung Quốc, cũng thích nghe ca khúc nhạc trẻ tiếng Trung.",
    "en": "I like watching Chinese movies and also listening to Chinese pop songs.",
    "ja": "私は中国映画を見るのが好きで、中国のポップスを聴くのも好きです。"
  },
  {
    "zh": "我很喜欢这首优美动听的中国民歌。",
    "pinyin": "Wǒ hěn xǐhuan zhè shǒu yōuměi dòngtīng de Zhōngguó míngē.",
    "vi": "Tôi rất thích bài dân ca Trung Quốc du dương êm tai này.",
    "en": "I really like this beautiful and melodious Chinese folk song.",
    "ja": "私はこの美しい中国の民謡がとても好きです。"
  },
  {
    "zh": "学好一门外语需要持之以恒，多听、多说、多读、多写。",
    "pinyin": "Xué hǎo yì mén wàiyǔ xūyào chízhīyǐhéng, duō tīng, duō shuō, duō dú, duō xiě.",
    "vi": "Học giỏi một ngoại ngữ cần sự kiên trì bền bỉ, nghe nhiều, nói nhiều, đọc nhiều, viết nhiều.",
    "en": "Mastering a foreign language requires perseverance: listening, speaking, reading, and writing more.",
    "ja": "外国語を習得するには根気が必要で、たくさん聞き、話し、読み、書くことが大切です。"
  },
  {
    "zh": "他在大学里努力学习汉语和中国历史。",
    "pinyin": "Tā zài dàxué lǐ nǔlì xuéxí hànyǔ hé Zhōngguó lìshǐ.",
    "vi": "Anh ấy ở trường đại học nỗ lực học tập tiếng Trung và lịch sử Trung Quốc.",
    "en": "He studies Chinese and Chinese history hard at university.",
    "ja": "彼は大学で中国語と中国の歴史を一生懸命勉強しています。"
  },
  {
    "zh": "请大家大声读出黑板上的这段中文句子。",
    "pinyin": "Qǐng dàjiā dà shēng dú chū hēibǎn shang de zhè duàn zhōngwén jùzi.",
    "vi": "Xin mời mọi người đọc to đoạn câu tiếng Trung này trên bảng đen.",
    "en": "Please read aloud this Chinese sentence on the blackboard.",
    "ja": "黒板のこの中国語の文を大きな声で読んでください。"
  },
  {
    "zh": "他在纸上工整地写下了自己的名字和联系方式。",
    "pinyin": "Tā zài zhǐ shang gōngzhěng de xiě xià le zìjǐ de míngzi hé liánxì fāngshì.",
    "vi": "Anh ấy nắn nót viết tên và phương thức liên hệ của mình lên giấy.",
    "en": "He neatly wrote down his name and contact information on paper.",
    "ja": "彼は紙に自分の名前と連絡先をきれいに書きました。"
  },
  {
    "zh": "这篇课文生词比较多，课前大家一定要认真预习。",
    "pinyin": "Zhè piān kèwén shēngcí bǐjiào duō, kè qián dàjiā yídìng yào rènzhēn yùxí.",
    "vi": "Bài đọc này từ mới tương đối nhiều, trước buổi học mọi người nhất định phải chuẩn bị bài kỹ.",
    "en": "This text has quite a few new words; everyone must preview it carefully before class.",
    "ja": "この課の新しい単語は比較的多いため、授業前に必ずしっかり予習してください。"
  },
  {
    "zh": "老师非常耐心地回答了同学们提出的每一个疑问。",
    "pinyin": "Lǎoshī fēicháng nàixīn de huídá le tóngxuémen tíchū de měi yí gè yíwèn.",
    "vi": "Thầy giáo rất kiên nhẫn giải đáp từng thắc mắc của các bạn học sinh.",
    "en": "The teacher patiently answered every question raised by the students.",
    "ja": "先生は生徒たちから出されたすべての質問にとても辛抱強く答えました。"
  },
  {
    "zh": "他给自己定下了目标，每天坚持记忆三十个汉字。",
    "pinyin": "Tā gěi zìjǐ dìng xià le mùbiāo, měitiān jiānchí jìyì sānshí gè hànzì.",
    "vi": "Anh ấy đặt ra mục tiêu cho mình, mỗi ngày kiên trì ghi nhớ ba mươi chữ Hán.",
    "en": "He set a goal for himself to memorize thirty Chinese characters every day.",
    "ja": "彼は毎日30個の漢字を覚えるという目標を自分に課しました。"
  },
  {
    "zh": "通过阅读中文经典书籍，我们能够更深入地了解中国文化。",
    "pinyin": "Tōngguò yuèdú zhōngwén jīngdiǎn shūjí, wǒmen nénggòu gèng shēnrù de liǎojiě Zhōngguó wénhuà.",
    "vi": "Thông qua đọc sách kinh điển tiếng Trung, chúng ta có thể hiểu sâu sắc hơn về văn hóa Trung Quốc.",
    "en": "By reading Chinese classic books, we can understand Chinese culture more deeply.",
    "ja": "中国語の古典を読むことで、中国文化をより深く理解することができます。"
  },
  {
    "zh": "在期末考试来临之前，我们需要合理制定复习计划。",
    "pinyin": "Zài qīmò kǎoshì láilín zhīqián, wǒmen xūyào hélǐ zhìdìng fùxí jìhuà.",
    "vi": "Trước khi kỳ thi cuối kỳ đến, chúng ta cần lập kế hoạch ôn tập hợp lý.",
    "en": "Before final exams arrive, we need to reasonably formulate a study plan.",
    "ja": "期末試験が来る前に、合理的な復習計画を立てる必要があります。"
  },
  {
    "zh": "他的普通话发音十分纯正，听起来就像广播电台的播音员。",
    "pinyin": "Tā de pǔtōnghuà fāyīn shífēn chúnzhèng, tīng qǐlái jiù xiàng guǎngbō diàntái de bōyīnyuán.",
    "vi": "Phát âm tiếng Phổ thông của anh ấy rất chuẩn xác, nghe hệt như phát thanh viên đài truyền hình.",
    "en": "His Mandarin pronunciation is very standard, sounding just like a radio announcer.",
    "ja": "彼の標準語の発音は非常に正確で、ラジオのアナウンサーのようです。"
  },
  {
    "zh": "遇到不懂的语法点时，可以查阅词典或者请教专业老师。",
    "pinyin": "Yù dào bù dǒng de yǔfǎ diǎn shí, kěyǐ cháyuè cídiǎn huòzhě qǐngjiào zhuānyè lǎoshī.",
    "vi": "Khi gặp điểm ngữ pháp chưa hiểu, có thể tra cứu từ điển hoặc hỏi thầy cô chuyên môn.",
    "en": "When encountering grammar points you don't understand, look up dictionaries or consult teachers.",
    "ja": "理解できない文法点に遭遇した場合は、辞書を引くか専門の先生に尋ねることができます。"
  },
  {
    "zh": "书籍是人类进步的阶梯，多读书能够开阔我们的眼界与思维。",
    "pinyin": "Shūjí shì rénlèi jìnbù de jiētī, duō dúshū nénggòu kāikuò wǒmen de yǎnjiè yǔ sīwéi.",
    "vi": "Sách là bậc thang tiến bộ của nhân loại, đọc nhiều sách giúp mở rộng tầm mắt và tư duy của chúng ta.",
    "en": "Books are the stepping stones of human progress; reading expands our horizons and thinking.",
    "ja": "本は人類の進歩の階段であり、読書は私たちの視野と思考を広げてくれます。"
  },
  {
    "zh": "经过老师的详细讲解，我终于彻底明白了这道题。",
    "pinyin": "Jīngguò lǎoshī de xiángxì jiǎngjiě, wǒ zhōngyú chèdǐ míngbai le zhè dào tí.",
    "vi": "Trải qua lời giảng giải chi tiết của thầy giáo, cuối cùng tôi đã hoàn toàn hiểu rõ bài toán này.",
    "en": "After the teacher's detailed explanation, I finally completely understood this question.",
    "ja": "先生の詳しい解説のおかげで、私はついにこの問題を完全に理解できました。"
  },
  {
    "zh": "坚持每天阅读能够有效提高你的中文词汇量和写作水平。",
    "pinyin": "Jiānchí měitiān yuèdú nénggòu yǒuxiào tígāo nǐ de zhōngwén cíhuìliàng hé xiězùo shuǐpíng.",
    "vi": "Kiên trì đọc sách mỗi ngày có thể nâng cao hiệu quả vốn từ vựng và trình độ viết tiếng Trung của bạn.",
    "en": "Persisting in reading daily can effectively improve your Chinese vocabulary and writing skills.",
    "ja": "毎日読書を続けることで、中国語の語彙力と文章力を効果的に向上させることができます。"
  },
  {
    "zh": "经过长期的刻苦钻研，他终于攻克了这个复杂的科学难题。",
    "pinyin": "Jīngguò chángqī de kèkǔ zuānyán, tā zhōngyú gōngkè le zhège fùzá de kēxué nántí.",
    "vi": "Trải qua thời gian dài miệt mài nghiên cứu, cuối cùng anh ấy đã khắc phục được bài toán khoa học phức tạp này.",
    "en": "After long periods of painstaking research, he finally overcame this complex scientific puzzle.",
    "ja": "長期にわたる懸命な研究の末、彼はついにこの複雑な科学的難題を克服しました。"
  },
  {
    "zh": "如果遇到任何不明白的问题，请随时告诉我。",
    "pinyin": "Rúguǒ yù dào rènhé bù míngbai de wèntí, qǐng suíshí gàosu wǒ.",
    "vi": "Nếu gặp phải bất kỳ câu hỏi nào chưa rõ, xin hãy báo cho tôi bất cứ lúc nào.",
    "en": "If you encounter any questions you don't understand, please let me know anytime.",
    "ja": "何か分からない問題があれば、いつでも私に教えてください。"
  },
  {
    "zh": "我们必须在本周五下班之前按时完成这个项目计划。",
    "pinyin": "Wǒmen bìxū zài běn zhōuwǔ xiàbān zhīqián ànshí wánchéng zhège xiàngmù jìhuà.",
    "vi": "Chúng ta bắt buộc phải hoàn thành kế hoạch dự án này đúng giờ trước khi tan làm vào thứ Sáu tuần này.",
    "en": "We must complete this project plan on time before getting off work this Friday.",
    "ja": "今週の金曜日の退勤時間までに、このプロジェクト計画を時間通りに完了させる必要があります。"
  },
  {
    "zh": "总经理正在会议室里向各位主管汇报上一季度的销售业绩。",
    "pinyin": "Zǒngjīnglǐ zhèngzài huìyìshì lǐ xiàng gèwèi zhǔguǎn huìbào shàng yí jìdù de xiàoshòu yèjì.",
    "vi": "Tổng giám đốc đang ở trong phòng họp báo cáo thành tích bán hàng quý trước cho các trưởng bộ phận.",
    "en": "The general manager is reporting last quarter's sales performance to department heads in the meeting room.",
    "ja": "総支配人は会議室で各部門の管理職に前四半期の販売実績を報告しています。"
  },
  {
    "zh": "请把这份经过修改的商业合同打印两份，然后拿给我签字。",
    "pinyin": "Qǐng bǎ zhè fèn jīngguò xiūgǎi de shāngyè hétong dǎyìn liǎng fèn, ránhòu ná gěi wǒ qiānzì.",
    "vi": "Xin hãy in hai bản hợp đồng kinh doanh đã được chỉnh sửa này, sau đó đưa tôi ký tên.",
    "en": "Please print two copies of this revised commercial contract, then bring them to me to sign.",
    "ja": "修正されたこの商業契約書を2部印刷し、私のサインのために持ってきてください。"
  },
  {
    "zh": "经过多次坦诚友好的沟通与协商，双方顺利签署了战略合作协议。",
    "pinyin": "Jīngguò duō cì tǎnchéng yǒuhǎo de gōutōng yǔ xiéshāng, shuāngfāng shùnlì qiānshǔ le zhànlüè hézuò xiéyì.",
    "vi": "Trải qua nhiều lần trao đổi thảo luận chân thành hữu nghị, đôi bên đã thuận lợi ký kết thỏa thuận hợp tác chiến lược.",
    "en": "After multiple sincere communications and negotiations, both sides smoothly signed the cooperation agreement.",
    "ja": "度重なる率直で友好的な協議を経て、双方は戦略的協力協定を円滑に締結しました。"
  },
  {
    "zh": "他对待工作一向认真负责、一丝不苟，深得领导与同事的高度赞誉。",
    "pinyin": "Tā duìdài gōngzuò yíxiàng rènzhēn fùzé, yìsībùgǒu, shēndé lǐngdǎo yǔ tóngshì de gāodù zànyù.",
    "vi": "Anh ấy đối với công việc luôn nghiêm túc trách nhiệm, tỉ mỉ chu đáo, nhận được sự đánh giá cao từ lãnh đạo và đồng nghiệp.",
    "en": "He is always diligent, responsible, and meticulous in his work, earning high praise from leaders and colleagues.",
    "ja": "彼は常に真面目で責任感があり、細部にまで気を配るため、上司や同僚から高く評価されています。"
  },
  {
    "zh": "我觉得这个方案非常切实可行，值得大家采纳。",
    "pinyin": "Wǒ juéde zhège fāng'àn fēicháng qièshíkěxíng, zhídé dàjiā cǎinà.",
    "vi": "Tôi cảm thấy phương án này rất thiết thực khả thi, đáng để mọi người tiếp thu.",
    "en": "I think this proposal is very feasible and worth adopting.",
    "ja": "この提案は非常に実現可能性が高く、採用する価値があると思います。"
  },
  {
    "zh": "为了适应现代国际市场的激烈竞争，公司决定加大技术研发投入。",
    "pinyin": "Wèile shìyìng xiàndài guójì shìchǎng de jīliè jìngzhēng, gōngsī juédìng jiādà jìshù yánfā tóurù.",
    "vi": "Để thích nghi với sự cạnh tranh gay gắt trên thị trường quốc tế hiện đại, công ty quyết định tăng cường đầu tư nghiên cứu phát triển kỹ thuật.",
    "en": "To adapt to fierce competition in the international market, the company decided to increase R&D investment.",
    "ja": "現代の国際市場の激しい競争に適応するため、会社は技術研究開発への投資を増やすことを決定しました。"
  },
  {
    "zh": "随着公司海外业务的快速拓展，我们急需招聘更多懂外语的专业人才。",
    "pinyin": "Suízhe gōngsī hǎiwài yèwù de kuàisù tuòzhǎn, wǒmen jíxū zhāopìn gèng duō dǒng wàiyǔ de zhuānyè réncái.",
    "vi": "Cùng với sự mở rộng nhanh chóng nghiệp vụ ở nước ngoài, chúng tôi đang rất cần tuyển thêm nhiều nhân tài chuyên môn giỏi ngoại ngữ.",
    "en": "With the rapid expansion of overseas business, we urgently need to hire more professionals with foreign languages.",
    "ja": "海外事業の急速な拡大に伴い、外国語に堪能な専門人材を急募しています。"
  },
  {
    "zh": "合理的时间管理和明确的工作目标是显著提高工作效率的关键。",
    "pinyin": "Hélǐ de shíjiān guǎnlǐ hé míngquè de gōngzuò mùbiāo shì xiǎnzhù tígāo gōngzuò xiàolǜ de guānjiàn.",
    "vi": "Quản lý thời gian hợp lý và mục tiêu công việc rõ ràng là chìa khóa để nâng cao rõ rệt hiệu suất công việc.",
    "en": "Reasonable time management and clear work goals are the keys to significantly improving productivity.",
    "ja": "合理的な時間管理と明確な仕事の目標が、業務効率を大幅に高める鍵です。"
  },
  {
    "zh": "面对突如其来的危机，团队齐心协力，最终成功化解了所有困难。",
    "pinyin": "Miànduì tūrúqílái de wēijī, tuánduì qíxīnxílì, zuìzhōng chénggōng huàjiě le suǒyǒu kùnnan.",
    "vi": "Đối mặt với cuộc khủng hoảng bất ngờ ập đến, cả đội ngũ đã đồng lòng chung sức và cuối cùng hóa giải thành công mọi khó khăn.",
    "en": "Facing an unexpected crisis, the team worked together and successfully resolved all difficulties.",
    "ja": "突如として訪れた危機に直面し、チームが一丸となって最終的にすべての困難を乗り越えました。"
  },
  {
    "zh": "他在这次面试中展现了出色的表达能力与扎实的专业功底。",
    "pinyin": "Tā zài zhè cì miànshì zhōng zhǎnxiàn le chūsè de biǎodá nénglì yǔ zhāshi de zhuānyè gōngdǐ.",
    "vi": "Trong buổi phỏng vấn lần này anh ấy đã thể hiện khả năng diễn đạt xuất sắc cùng nền tảng chuyên môn vững chắc.",
    "en": "In this interview, he demonstrated outstanding expressive ability and solid professional competence.",
    "ja": "彼は今回の面接で優れた表現力と確かな専門的知識を発揮しました。"
  },
  {
    "zh": "科学家在实验中有了重大发现，解决了关键难题。",
    "pinyin": "Kēxuéjiā zài shíyàn zhōng yǒu le zhòngdà fāxiàn, jiějué le guānjiàn nántí.",
    "vi": "Nhà khoa học đã có phát hiện quan trọng trong thí nghiệm, giải quyết được nan đề then chốt.",
    "en": "Scientists made a major discovery in the experiment and solved a key problem.",
    "ja": "科学者は実験で重大な発見をし、重要な難題を解決しました。"
  },
  {
    "zh": "面对人生道路上的各种重大选择，我们必须慎重思考。",
    "pinyin": "Miànduì rénshēng dàolù shang de gè zhǒng zhòngdà xuǎnzé, wǒmen bìxū shènzhòng sīkǎo.",
    "vi": "Đối mặt với các lựa chọn trọng đại trên đường đời, chúng ta bắt buộc phải suy nghĩ cẩn trọng.",
    "en": "Facing various major choices in life, we must think prudently.",
    "ja": "人生の岐路に立つ様々な重大な選択に直面したとき、私たちは慎重に考えなければなりません。"
  },
  {
    "zh": "前往国际机场通常需要提前两到三个小时出发，以防路上发生交通拥堵。",
    "pinyin": "Qiánwǎng guójì jīchǎng tōngcháng xūyào tíqián liǎng dào sān gè xiǎoshí chūfā, yǐfáng lùshang fāshēng jiāotōng yōngdǔ.",
    "vi": "Đi đến sân bay quốc tế thường cần khởi hành sớm từ hai đến ba tiếng để phòng tắc đường.",
    "en": "Going to the international airport usually requires leaving two to three hours ahead to avoid traffic jams.",
    "ja": "国際空港へ向かう際は、道路の渋滞を防ぐため、通常2〜3時間前に出発する必要があります。"
  },
  {
    "zh": "我打算下个月请年假去云南旅行，亲身体验大自然的壮丽风光。",
    "pinyin": "Wǒ dǎsuàn xià gè yuè qǐng niánjià qù Yúnnán lǚxíng, qīnshēn tǐyàn dàzìrán de zhuànglì fēngguāng.",
    "vi": "Tôi dự định tháng tới sẽ xin nghỉ phép năm đi du lịch Vân Nam, tự mình trải nghiệm cảnh sắc thiên nhiên hùng vĩ.",
    "en": "I plan to take annual leave next month to travel to Yunnan and experience the magnificent scenery.",
    "ja": "来月年休を取って雲南へ旅行し、大自然の雄大な景色を直に体験するつもりです。"
  },
  {
    "zh": "登机前请准备好您的有效护照和登机牌，配合工作人员的安全检查。",
    "pinyin": "Dēngjī qián qǐng zhǔnbèi hǎo nín de yǒuxiào hùzhào hé dēngjīpái, pèihé gōngzuò rényuán de ānquán jiǎnchá.",
    "vi": "Trước khi lên máy bay xin chuẩn bị sẵn hộ chiếu hợp lệ và thẻ lên tàu bay để phối hợp kiểm tra an ninh.",
    "en": "Please prepare your valid passport and boarding pass before boarding, cooperating with security checks.",
    "ja": "ご搭乗前に有効なパスポートと搭乗券をご用意いただき、スタッフの保安検査にご協力ください。"
  },
  {
    "zh": "中国高铁运行速度极快且车厢平稳舒适，深受广大旅客的青睐。",
    "pinyin": "Zhōngguó gāotiě yùnxíng sùdù jí kuài qiě chēxiāng píngwěn shūshì, shēn shòu guǎngdà lǚkè de qīnglài.",
    "vi": "Tàu cao tốc Trung Quốc chạy cực nhanh lại có khoang tàu êm ái tiện nghi, được đông đảo hành khách rất yêu thích.",
    "en": "China's high-speed train runs very fast and smoothly with comfort, popular among travelers.",
    "ja": "中国の高速鉄道は運行速度が非常に速く、車両も揺れが少なく快適で、乗客から大好評です。"
  },
  {
    "zh": "沿着这条宽阔的人民大街一直向前走，在第二个十字路口向右转就到了。",
    "pinyin": "Yánzhe zhè tiáo kuānkuò de Rénmín Dàjiē yìzhí xiàng qián zǒu, zài dì èr gè shízìlùkǒu xiàng yòu zhuǎn jiù dào le.",
    "vi": "Đi thẳng theo đại lộ Nhân Dân rộng rãi này, đến ngã tư thứ hai rẽ phải là tới.",
    "en": "Walk straight along this wide Renmin Avenue, turn right at the second crossroads, and you will arrive.",
    "ja": "この広い人民大街をまっすぐ進み、2つ目の交差点を右に曲がれば到着します。"
  },
  {
    "zh": "城市地铁不仅发车频率高、速度快捷，而且不受路面堵车的影响。",
    "pinyin": "Chéngshì dìtiě bùjǐn fāchē pínlǜ gāo, sùdù kuàijié, érqiě bú shòu lùmiàn dǔchē de yǐngxiǎng.",
    "vi": "Tàu điện ngầm đô thị không những tần suất chạy xe cao, tốc độ nhanh chóng mà còn không bị ảnh hưởng bởi tắc đường.",
    "en": "Urban subway has high train frequency and speed, unaffected by street traffic congestion.",
    "ja": "都市の地下鉄は運行頻度が高く迅速なだけでなく、地上の渋滞の影響も受けません。"
  },
  {
    "zh": "这座历史悠久的古城拥有众多名胜古迹，每年吸引数以百万计的游客。",
    "pinyin": "Zhè zuò lìshǐ yōujiǔ de gǔchéng yōngyǒu zhòngduō míngshèng gǔjì, měinián xīyǐn shù yǐ bǎiwàn jì de yóukè.",
    "vi": "Cổ thành có bề dày lịch sử này sở hữu nhiều danh lam thắng cảnh, thu hút hàng triệu du khách mỗi năm.",
    "en": "This ancient city with a long history has numerous historical sites, attracting millions of tourists each year.",
    "ja": "歴史の古いこの古都には多くの名所旧跡があり、毎年数百万人の観光客を魅了しています。"
  },
  {
    "zh": "旅行不仅能让我们放松身心，还能让我们领略不同地域的民俗风情。",
    "pinyin": "Lǚxíng bùjǐn néng ràng wǒmen fàngsōng shēnxīn, hái néng ràng wǒmen lǐnglüè bù tóng dìyù de mínsú fēngqíng.",
    "vi": "Du lịch không chỉ giúp chúng ta thư giãn thể xác lẫn tâm hồn, mà còn cho ta thưởng thức phong tục tập quán các vùng miền khác nhau.",
    "en": "Travel not only relaxes body and mind, but also allows us to appreciate different local customs.",
    "ja": "旅行は心身をリラックスさせるだけでなく、地域ごとの民俗文化を味わうこともできます。"
  },
  {
    "zh": "请问在这座车站附近有没有提供外币兑换服务的银行？",
    "pinyin": "Qǐngwèn zài zhè zuò chēzhàn fùjìn yǒu méiyǒu tígōng wàibì duìhuàn fúwù de yínháng?",
    "vi": "Xin hỏi ở gần nhà ga này có ngân hàng nào cung cấp dịch vụ đổi ngoại tệ không?",
    "en": "Excuse me, is there any bank near this station that provides currency exchange services?",
    "ja": "すみません、この駅の近くに外貨両替サービスを提供している銀行はありますか？"
  },
  {
    "zh": "出门旅行时一定要保管好自己的贵重物品，注意人身与财产安全。",
    "pinyin": "Chūmén lǚxíng shí yídìng yào bǎoguǎn hǎo zìjǐ de guìzhòng wùpǐn, zhùyì rénshēn yǔ cáichǎn ānquán.",
    "vi": "Khi đi du lịch xa nhất định phải bảo quản tốt đồ đạc có giá trị của mình, chú ý an toàn tính mạng và tài sản.",
    "en": "When traveling, always safeguard your valuables and pay attention to personal and property safety.",
    "ja": "旅行に出かける際は、貴重品をしっかり管理し、身の安全と財産の安全に十分注意してください。"
  },
  {
    "zh": "健康是人生最宝贵的财富，平时一定要坚持适量运动。",
    "pinyin": "Jiànkāng shì rénshēng zuì bǎoguì de cáifù, píngshí yídìng yào jiānchí shìliàng yùndòng.",
    "vi": "Sức khỏe là tài sản quý giá nhất của đời người, thường ngày nhất định phải kiên trì vận động điều độ.",
    "en": "Health is the most precious wealth in life; one must adhere to moderate exercise regularly.",
    "ja": "健康は人生で最も尊い財産です。普段から適度な運動を続けることが大切です。"
  },
  {
    "zh": "最近因为工作任务比较繁重，周末我们需要彻底放松身心。",
    "pinyin": "Zuìjìn yīnwèi gōngzuò rènwu bǐjiào fánzhòng, zhōumò wǒmen xūyào chèdǐ fàngsōng shēnxīn.",
    "vi": "Dạo gần đây vì nhiệm vụ công việc khá nặng nề nên cuối tuần chúng ta cần thả lỏng thư giãn hoàn toàn.",
    "en": "Lately work tasks have been heavy, so on weekends we need to thoroughly relax our minds and bodies.",
    "ja": "最近は仕事が立て込んでいるので、週末には心身を徹底的にリフレッシュする必要があります。"
  },
  {
    "zh": "养成早睡早起的良好睡眠习惯对保持充沛精力至关重要。",
    "pinyin": "Yǎngchéng zǎoshuì zǎoqǐ de liánghǎo shuìmián xíguàn duì bǎochí chōngpèi jīnglì zhìguān zhòngyào.",
    "vi": "Tập thói quen ngủ sớm dậy sớm có vai trò cực kỳ quan trọng đối với việc duy trì năng lượng dồi dào.",
    "en": "Cultivating good habits of sleeping early and rising early is vital for maintaining high energy.",
    "ja": "早寝早起きの良好な睡眠習慣を身につけることは、充実した活力を維持する上で極めて重要です。"
  },
  {
    "zh": "听到这个振奋人心的特大喜讯，大家脸上都露出了灿烂的笑容。",
    "pinyin": "Tīng dào zhège zhènfèn rénxīn de tèdà xǐxùn, dàjiā liǎn shang dōu lù chū le cànlàn de xiàoróng.",
    "vi": "Nghe được tin mừng chấn động lòng người này, trên khuôn mặt ai nấy đều nở nụ cười rạng rỡ.",
    "en": "Hearing this thrilling great news, bright smiles appeared on everyone's faces.",
    "ja": "この胸躍る特大の朗報を聞いて、みんなの顔に晴れやかな笑顔が浮かびました。"
  },
  {
    "zh": "尽管在人生道路上遇到了诸多挫折，他依然始终保持着乐观向上的心态。",
    "pinyin": "Jǐnguǎn zài rénshēng dàolù shang yù dào le zhūduō cuòzhé, tā yīrán shǐzhōng bǎochí zhe lèguān xiàngshàng de xīntài.",
    "vi": "Dù trên đường đời gặp phải muôn vàn trắc trở, anh ấy vẫn luôn giữ vững tâm thái lạc quan yêu đời.",
    "en": "Despite encountering many setbacks in life, he still maintains an optimistic attitude throughout.",
    "ja": "人生の途上で多くの挫折に直面したにもかかわらず、彼は常に前向きで楽観的な心構えを保っています。"
  },
  {
    "zh": "医生建议他减少高油高糖食品的摄入，多吃新鲜蔬菜与水果。",
    "pinyin": "Yīshēng jiànyì tā jiǎnshǎo gāo yóu gāo táng shípǐn de shèrù, duō chī xīnxiān shūcài yǔ shuǐguǒ.",
    "vi": "Bác sĩ khuyên anh ấy giảm nạp thực phẩm nhiều dầu và nhiều đường, ăn nhiều rau quả tươi.",
    "en": "The doctor advised him to reduce foods high in oil and sugar, and eat more fresh vegetables and fruits.",
    "ja": "医師は彼に、油分や糖分の多い食品の摂取を控え、新鮮な野菜と果物を多く摂るよう助言しました。"
  },
  {
    "zh": "感到精神紧张或者身体疲惫时，闭上眼睛做几次深呼吸会很有帮助。",
    "pinyin": "Gǎndào jīngshén jǐnzhāng huòzhě shēntǐ píbèi shí, bì shang yǎnjing zuò jǐ cì shēn hūxī huì hěn yǒu bāngzhù.",
    "vi": "Khi cảm thấy tinh thần căng thẳng hoặc thể xác mỏi mệt, nhắm mắt lại hít thở sâu vài lần sẽ rất có ích.",
    "en": "When feeling mentally stressed or physically exhausted, closing your eyes and deep breathing helps.",
    "ja": "精神的な緊張や体の疲れを感じたときは、目を閉じて深呼吸を数回するととても効果的です。"
  },
  {
    "zh": "心情愉快是保持年轻健康的最好良药，要学会适时调节自己的情绪。",
    "pinyin": "Xīnqíng yúkuài shì bǎochí niánqīng jiànkāng de zuì hǎo liángyào, yào xuéhuì shìshí tiáojié zìjǐ de qíngxù.",
    "vi": "Tâm trạng vui vẻ là phương thuốc tốt nhất để giữ gìn tuổi trẻ và sức khỏe, hãy học cách điều tiết cảm xúc đúng lúc.",
    "en": "A cheerful mood is the best medicine for youth and health; learn to regulate emotions timely.",
    "ja": "愉快な気持ちは若さと健康を保つ最良の薬です。自分の感情を適切にコントロールすることを学びましょう。"
  },
  {
    "zh": "每天抽出一小段时间静坐冥想，可以让躁动的心灵回归宁静。",
    "pinyin": "Měitiān chōuchū yì xiǎo duàn shíjiān jìngzuò míngxiǎng, kěyǐ ràng zàodòng de xīnlíng huíguī níngjìng.",
    "vi": "Mỗi ngày dành ra một khoảng thời gian ngắn để ngồi tĩnh tâm thiền định sẽ giúp tâm hồn xao động tìm lại sự bình yên.",
    "en": "Spending a short time each day in quiet meditation can bring peace back to a restless mind.",
    "ja": "毎日少しの時間を作って静かに瞑想することで、ざわついた心を穏やかに戻すことができます。"
  },
  {
    "zh": "我们要学会感恩生活中的每一份馈赠，珍惜身边的每一个人。",
    "pinyin": "Wǒmen yào xuéhuì gǎn'ēn shēnghuó zhōng de měi yí fèn kuìzèng, zhēnxī shēnbiān de měi yí gè rén.",
    "vi": "Chúng ta cần học cách biết ơn từng món quà trong cuộc sống, trân trọng từng con người bên cạnh mình.",
    "en": "We must learn to be grateful for every gift in life and cherish everyone around us.",
    "ja": "私たちは人生のあらゆる恵みに感謝し、身近にいるすべての人を大切にすることを学ぶべきです。"
  },
  {
    "zh": "科学技术的飞速发展从根本上深刻改变了现代人类的生活方式与交流模式。",
    "pinyin": "Kēxué jìshù de fēisù fāzhǎn cóng gēnběn shang shēnkè gǎibiàn le xiàndài rénlèi de shēnghuó fāngshì yǔ jiāoliú móshì.",
    "vi": "Sự phát triển nhanh như vũ bão của khoa học kỹ thuật đã thay đổi tận gốc rễ lối sống và mô hình giao lưu của con người hiện đại.",
    "en": "The rapid development of science and technology has fundamentally transformed modern lifestyles and communication.",
    "ja": "科学技術の飛躍的な発展は、現代人類の生活様式とコミュニケーション形態を根本から深く変えました。"
  },
  {
    "zh": "保护自然生态环境、减少一次性塑料制品的使用是全人类共同的重大使命。",
    "pinyin": "Bǎohù zìrán shēngtài huánjìng, jiǎnshǎo yícìxìng sùliào zhìpǐn de shǐyòng shì quán rénlèi gòngtóng de zhòngdà shǐmìng.",
    "vi": "Bảo vệ môi trường sinh thái tự nhiên, giảm thiểu sử dụng đồ nhựa dùng một lần là sứ mệnh to lớn chung của toàn nhân loại.",
    "en": "Protecting the ecological environment and reducing disposable plastics is humanity's common mission.",
    "ja": "自然の生態系環境を保護し、使い捨てプラスチック製品の使用を減らすことは全人類共通の使命です。"
  },
  {
    "zh": "移动互联网的高速普及让跨国文化交流与信息共享变得前所未有的快捷。",
    "pinyin": "Yídòng hùliánwǎng de gāosù pǔjí ràng kuàguó wénhuà jiāoliú yǔ xìnxī gòngxiǎng biànde qiánsuǒwèiyǒu de kuàijié.",
    "vi": "Sự phổ cập thần tốc của Internet di động đã khiến cho việc giao lưu văn hóa xuyên quốc gia và chia sẻ thông tin trở nên nhanh chóng chưa từng thấy.",
    "en": "Mobile internet expansion makes cross-border cultural exchange and information sharing faster than ever.",
    "ja": "モバイルインターネットの急速な普及により、国境を越えた文化交流と情報共有がかつてないほど迅速になりました。"
  },
  {
    "zh": "现代人工智能技术的突破为医疗诊断、教育和工业自动化带来了无限可能。",
    "pinyin": "Xiàndài réngōng zhìnéng jìshù de tūpò wèi yīliáo zhěnduàn, jiàoyù hé gōngyè zìdònghuà dài lái le wúxiàn kěnéng.",
    "vi": "Đột phá của công nghệ trí tuệ nhân tạo hiện đại đã đem lại vô vàn khả năng cho chẩn đoán y tế, giáo dục và tự động hóa công nghiệp.",
    "en": "Breakthroughs in artificial intelligence bring infinite possibilities to medical diagnosis, education, and automation.",
    "ja": "現代のAI技術のブレークスルーは、医療診断、教育、産業自動化に無限の可能性をもたらしました。"
  },
  {
    "zh": "节约水资源、随手关灯是每个人在日常生活中都可以轻松做到的环保小事。",
    "pinyin": "Jiéyuē shuǐzīyuán, suíshǒu guāndēng shì měi gè rén zài rìcháng shēnghuó zhōng dōu kěyǐ qīngsōng zuò dào de huánbǎo xiǎoshì.",
    "vi": "Tiết kiệm nguồn nước, tiện tay tắt đèn là những việc nhỏ bảo vệ môi trường mà mỗi người đều dễ dàng làm được trong cuộc sống.",
    "en": "Saving water and turning off lights are simple eco-friendly actions everyone can easily do.",
    "ja": "水資源を節約し、こまめに電気を消すことは、日常生活で誰もが簡単に実践できる環境保護の小さな行動です。"
  },
  {
    "zh": "新能源汽车的广泛应用有助于显著降低城市碳排放，改善空气质量。",
    "pinyin": "Xīn néngyuán qìchē de guǎngfàn yìngyòng yǒu zhù yú xiǎnzhù jiàngdī chéngshì tàn páifàng, gǎishàn kōngqì zhìliàng.",
    "vi": "Việc ứng dụng rộng rãi ô tô năng lượng mới góp phần hạ giảm rõ rệt lượng khí thải carbon đô thị, cải thiện chất lượng không khí.",
    "en": "Widespread application of new energy vehicles helps significantly lower urban carbon emissions and improve air quality.",
    "ja": "新エネルギー自動車の普及は、都市の二酸化炭素排出量を大幅に削減し、空気の質を改善するのに役立ちます。"
  },
  {
    "zh": "随着大数据分析的深入，企业能够更加精准地把握消费者的真实需求。",
    "pinyin": "Suízhe dàshùjù fēnxī de shēnrù, qǐyè nénggòu gèngjiā jīngzhǔn de bǎwò xiāofèizhě de zhēnshí xūqiú.",
    "vi": "Cùng với sự đào sâu phân tích dữ liệu lớn, các doanh nghiệp có thể nắm bắt chính xác hơn nhu cầu thực tế của người tiêu dùng.",
    "en": "With deepening big data analytics, enterprises can grasp consumers' real needs more accurately.",
    "ja": "ビッグデータ分析の深化に伴い、企業は消費者の真のニーズをより的確に把握できるようになりました。"
  },
  {
    "zh": "文化多样性是人类社会的基本特征，不同文明应当相互包容与互学互鉴。",
    "pinyin": "Wénhuà duōyàngxìng shì rénlèi shèhuì de jīběn tèzhēng, bù tóng wénmíng yīngdāng xiānghù bāoróng yǔ hù xué hù jiàn.",
    "vi": "Đa dạng văn hóa là đặc trưng cơ bản của xã hội loài người, các nền văn minh khác nhau nên cùng bao dung và học hỏi lẫn nhau.",
    "en": "Cultural diversity is a fundamental trait of human society; civilizations should tolerate and learn from each other.",
    "ja": "文化の多様性は人類社会の基本的特徴であり、異なる文明は互いに包容し合い、学び合うべきです。"
  },
  {
    "zh": "为了给下一代留下青山绿水，我们必须坚定不移地推行可持续发展战略。",
    "pinyin": "Wèile gěi xià yí dài liú xià qīngshān lǜshuǐ, wǒmen bìxū jiāndìngbùyí de tuīxíng kěchíxù fāzhǎn zhànlüè.",
    "vi": "Để để lại non xanh nước biếc cho thế hệ mai sau, chúng ta phải kiên định không dời thực thi chiến lược phát triển bền vững.",
    "en": "To leave green mountains and clear water for future generations, we must pursue sustainable development.",
    "ja": "次世代に青い山と清らかな水を残すため、私たちは持続可能な開発戦略を断固として推進しなければなりません。"
  },
  {
    "zh": "科学探索永无止境，每一次重大发现都凝聚着科学家们长年累月的心血。",
    "pinyin": "Kēxué tànsuǒ yǒng wú zhǐjìng, měi yí cì zhòngdà fāxiàn dōu níngjù zhe kēxuéjiāmen chángniánlěiyuè de xīnxuè.",
    "vi": "Khám phá khoa học không bao giờ có điểm dừng, mỗi phát hiện trọng đại đều kết tinh tâm huyết tháng năm dài của các nhà khoa học.",
    "en": "Scientific exploration has no end; every major discovery crystallizes scientists' long-term dedication.",
    "ja": "科学の探求に終わりはなく、重大な発見の数々には科学者たちの長年にわたる心血が注がれています。"
  },
  {
    "zh": "家庭环境和父母的言传身教对孩子的性格成长有着深远影响。",
    "pinyin": "Jiātíng huánjìng hé fùmǔ de yánchuánshēnjiào duì háizi de xìnggé chéngzhǎng yǒu zhe shēnyuǎn yǐngxiǎng.",
    "vi": "Môi trường gia đình và lời nói việc làm làm gương của cha mẹ có ảnh hưởng sâu sắc đến sự hình thành tính cách của con trẻ.",
    "en": "Family environment and parents' deeds have a profound impact on a child's character growth.",
    "ja": "家庭環境と両親の言動による教育は、子どもの人格形成に深い影響を与えます。"
  },
  {
    "zh": "经济的繁荣发展离不开社会的安定与科学技术的创新。",
    "pinyin": "Jīngjì de fánróng fāzhǎn lì bù kāi shèhuì de āndìng yǔ kēxué jìshù de chuàngxīn.",
    "vi": "Sự phát triển phồn vinh của kinh tế không thể tách rời sự ổn định của xã hội và đổi mới của khoa học kỹ thuật.",
    "en": "Economic prosperity and development cannot be separated from social stability and technological innovation.",
    "ja": "経済の繁栄と発展は、社会の安定と科学技術の革新なしにはあり得ません。"
  },
  {
    "zh": "这本书详细介绍了中国悠久的历史与灿烂的文化。",
    "pinyin": "Zhè běn shū xiángxì jièshào le Zhōngguó yōujiǔ de lìshǐ yǔ cànlàn de wénhuà.",
    "vi": "Cuốn sách này giới thiệu chi tiết về lịch sử lâu đời và nền văn hóa rực rỡ của Trung Quốc.",
    "en": "This book introduces China's long history and splendid culture in detail.",
    "ja": "この本は中国の悠久の歴史と輝かしい文化を詳しく紹介しています。"
  },
  {
    "zh": "无论在什么时候，我们都应当珍惜宝贵的时间。",
    "pinyin": "Wúlùn zài shénme shíhou, wǒmen dōu yīngdāng zhēnxī bǎoguì de shíjiān.",
    "vi": "Bất kể vào lúc nào, chúng ta cũng đều nên trân trọng thời gian quý báu.",
    "en": "No matter when, we should always cherish precious time.",
    "ja": "いかなる時も、私たちは貴重な時間を大切にすべきです。"
  },
  {
    "zh": "他不仅汉语说得流利，而且对中国民间风俗非常了解。",
    "pinyin": "Tā bùjǐn hànyǔ shuō de liúlì, érqiě duì Zhōngguó mínjiān fēngsú fēicháng liǎojiě.",
    "vi": "Anh ấy không những nói tiếng Trung lưu loát mà còn rất am hiểu phong tục dân gian Trung Quốc.",
    "en": "He not only speaks Chinese fluently, but also understands Chinese folk customs very well.",
    "ja": "彼は中国語を流暢に話すだけでなく、中国の民間風俗にもとても精通しています。"
  },
  {
    "zh": "虽然这项任务的挑战性极大，但他凭借顽强的毅力依然圆满完成了。",
    "pinyin": "Suīrán zhè xiàng rènwu de tiǎozhànxìng jí dà, dàn tā píngjiè wánqiáng de yìlì yīrán yuánmǎn wánchéng le.",
    "vi": "Tuy tính thử thách của nhiệm vụ này cực lớn, nhưng anh ấy dựa vào nghị lực kiên cường vẫn hoàn thành trọn vẹn.",
    "en": "Although the challenge of this task was huge, he completed it successfully with tenacity.",
    "ja": "この任務は極めて挑戦的でしたが、彼は不屈の粘り強さで見事にやり遂げました。"
  },
  {
    "zh": "如果明天天气晴朗不刮大风，我们就按原计划一起去郊外登山。",
    "pinyin": "Rúguǒ míngtiān tiānqì qínglǎng bù guā dàfēng, wǒmen jiù àn yuán jìhuà yìqǐ qù jiāowài dēngshān.",
    "vi": "Nếu ngày mai trời quang đãng không gió lớn, chúng ta sẽ theo đúng kế hoạch ban đầu cùng đi leo núi ngoại ô.",
    "en": "If the weather is fine tomorrow without strong wind, we will hike in the suburbs as planned.",
    "ja": "明日天気が晴れて強い風が吹かなければ、予定通り郊外へ登山に行きましょう。"
  },
  {
    "zh": "因为他平时勤奋好学、勇于思考，所以他在专业领域取得了卓越的成绩。",
    "pinyin": "Yīnwèi tā píngshí qínfèn hàoxué, yǒngyú sīkǎo, suǒyǐ tā zài zhuānyè lǐngyù qǔdé le zhuóyuè de chéngjì.",
    "vi": "Bởi vì bình thường anh ấy cần cù ham học, dũng cảm suy nghĩ, cho nên trong lĩnh vực chuyên môn đã đạt thành tích xuất sắc.",
    "en": "Because he is diligent, studious, and courageous in thinking, he achieved excellence in his field.",
    "ja": "彼は普段から勤勉で探究心が強く思考力に長けているため、専門分野で卓越した成果を収めました。"
  },
  {
    "zh": "不管未来的路途有多么坎坷，我们都要团结一心、勇往直前。",
    "pinyin": "Bùguǎn wèilái de lùtú yǒu duōme kǎnkě, wǒmen dōu yào tuánjié yìxīn, yǒngwǎngzhíqián.",
    "vi": "Bất kể chặng đường tương lai có gập ghềnh đến đâu, chúng ta đều phải đoàn kết một lòng, dũng cảm tiến lên phía trước.",
    "en": "No matter how bumpy the future path may be, we must unite as one and press forward bravely.",
    "ja": "これからの道のりがどれほど険しくとも、私たちは心を一つにして勇気を持って前進しなければなりません。"
  },
  {
    "zh": "这件事情不仅直接关系到个人的切身利益，而且关系到整个集体的声誉。",
    "pinyin": "Zhè jiàn shìqing bùjǐn zhíjiē guānxì dào gèrén de qièshēn lìyì, érqiě guānxì dào zhěnggè jítǐ de shēngyù.",
    "vi": "Chuyện này không chỉ liên quan trực tiếp đến lợi ích thiết thân của mỗi cá nhân, mà còn liên quan đến danh dự của toàn bộ tập thể.",
    "en": "This matter relates not only to individual vital interests, but also to the reputation of the collective.",
    "ja": "この件は個人の切実な利益に直結するだけでなく、集団全体の評判にも関わっています。"
  },
  {
    "zh": "与其在这里无休止地抱怨困难，倒不如立刻采取行动寻找切实的解决办法。",
    "pinyin": "Yǔqí zài zhèlǐ wúxiūzhǐ de bàoyuàn kùnnan, dàobùrú lìkè cǎiqǔ xíngdòng xúnzhǎo qièshí de jiějué bànfǎ.",
    "vi": "Thay vì ở đây than vãn khó khăn không dứt, chi bằng hành động ngay tức khắc để tìm ra giải pháp thiết thực.",
    "en": "Rather than complaining endlessly about difficulties here, we had better take action to find practical solutions.",
    "ja": "ここで果てしなく不満をこぼすより、直ちに行動を起こして確実な解決策を探す方がましです。"
  },
  {
    "zh": "只有经过脚踏实地的长久积累，才能在关键时刻厚积薄发、一鸣惊人。",
    "pinyin": "Zhǐyǒu jīngguò jiǎotàshídì de chángjiǔ jīlěi, cáinéng zài guānjiàn shíkè hòujībófā, yìmíngjīngrén.",
    "vi": "Chỉ khi trải qua sự tích lũy lâu dài vững chắc từng bước, mới có thể tích tụ sâu dày rồi bùng nổ, một bước nổi danh vào thời khắc then chốt.",
    "en": "Only through steady and long accumulation can one break out with brilliance at the crucial moment.",
    "ja": "着実に長期間蓄積してこそ、重要な瞬間に力を発揮し、一躍脚光を浴びることができるのです。"
  },
  {
    "zh": "他不但具备高超的专业技能，而且为人极其诚恳低调，深受大家爱戴。",
    "pinyin": "Tā búdàn jùbèi gāochāo de zhuānyè jìnéng, érqiě wéirén jíqí chéngkěn dīdiào, shēn shòu dàjiā àidài.",
    "vi": "Anh ấy không những sở hữu kỹ năng chuyên môn siêu việt, mà đối nhân xử thế lại vô cùng chân thành khiêm nhường, được mọi người quý mến.",
    "en": "He not only possesses superb skills, but is also extremely sincere and modest, deeply loved by all.",
    "ja": "彼は卓越した専門技能を備えているだけでなく、誠実で謙虚な人柄で、皆から深く敬愛されています。"
  },
  {
    "zh": "除非遇到极其特殊的情况，否则我们必须严格遵守既定的工作流程。",
    "pinyin": "Chúfēi yù dào jíqí tèshū de qíngkuàng, fǒuzé wǒmen bìxū yángé zūnshǒu jìdìng de gōngzuò liúchéng.",
    "vi": "Trừ phi gặp phải tình huống vô cùng đặc biệt, nếu không chúng ta bắt buộc phải tuân thủ nghiêm ngặt quy trình làm việc đã định.",
    "en": "Unless encountering extremely special circumstances, we must strictly follow established workflows.",
    "ja": "極めて特殊な状況に遭遇しない限り、定められた作業手順を厳格に遵守しなければなりません。"
  },
  {
    "zh": "既然已经做出了郑重的承诺，就必须言出必行，绝不能自食其言。",
    "pinyin": "Jìrán yǐjīng zuò chū le zhèngzhòng de chéngnuò, jiù bìxū yán chū bì xíng, jué bù néng zìshíqíyán.",
    "vi": "Một khi đã đưa ra lời hứa trịnh trọng thì phải nói đi đôi với làm, tuyệt đối không được nuốt lời.",
    "en": "Since you have made a solemn promise, you must walk the talk and never break your word.",
    "ja": "厳粛な約束を交わした以上は、有言実行でなければならず、決して前言を撤回してはなりません。"
  },
  {
    "zh": "俗话说得好：“入乡随俗”，到了新的地方就要尊重当地的风俗习惯。",
    "pinyin": "Súhuà shuō de hǎo: “Rù xiāng suí sú”, dào le xīn de dìfang jiù yào zūnzhòng dāngdì de fēngsú xíguàn.",
    "vi": "Tục ngữ nói rất hay: 'Nhập gia tùy tục', khi đến một nơi mới thì phải tôn trọng phong tục tập quán ở địa phương đó.",
    "en": "As the proverb says: 'When in Rome, do as the Romans do'; respect local customs in new places.",
    "ja": "ことわざにもあるように「郷に入っては郷に従え」、新しい場所に来たら現地の風習を尊重すべきです。"
  },
  {
    "zh": "做事一定要有始有终、脚踏实地，切不可半途而废、前功尽弃。",
    "pinyin": "Zuòshì yídìng yào yǒushǐyǒuzhōng, jiǎotàshídì, qiè bùkě bàntú'érfèi, qiángōngjìnqì.",
    "vi": "Làm việc nhất định phải có đầu có cuối, vững chắc từng bước, tuyệt đối không được bỏ dở giữa chừng mà phí hoài công sức trước đó.",
    "en": "Always see things through to the end and be grounded; never give up halfway and ruin past efforts.",
    "ja": "何事も有始有終で着実に行い、決して中途半端に投げ出してこれまでの苦労を無駄にしてはいけません。"
  },
  {
    "zh": "在向客户阐述方案时，他胸有成竹、条理清晰，赢得了热烈的掌声。",
    "pinyin": "Zài xiàng kèhù chǎnshù fāng'àn shí, tā xiōngyǒuchéngzhú, tiáolǐ qīngxī, yíngdé le rèliè de zhǎngshēng.",
    "vi": "Khi trình bày phương án với khách hàng, anh ấy tự tin vững dạ, lập luận rành mạch, nhận được tràng pháo tay nồng nhiệt.",
    "en": "When presenting the proposal to clients, he was confident, well-organized, and won warm applause.",
    "ja": "顧客に提案を説明する際、彼は胸中成竹の自信を持ち、筋道立てて話し、盛大な拍手を浴びました。"
  },
  {
    "zh": "他的这番前后矛盾的辩解不仅站不住脚，反而引得大家哄堂大笑。",
    "pinyin": "Tā de zhè fān qiánhòumáodùn de biànjiě bùjǐn zhànbùzhùjiǎo, fǎn'ér yǐn de dàjiā hōngtángdàxiào.",
    "vi": "Lời biện hộ trước sau mâu thuẫn này của anh ta không chỉ chẳng đứng vững, mà trái lại còn khiến mọi người cười ồ lên.",
    "en": "His self-contradictory explanation was not only untenable, but also made everyone burst into laughter.",
    "ja": "彼のこの前後で矛盾した弁解は説得力がないばかりか、かえってみんなの大爆笑を誘いました。"
  },
  {
    "zh": "千里之行始于足下，任何宏伟的梦想都要靠一点一滴的努力来实现。",
    "pinyin": "Qiānlǐ zhī xíng shǐ yú zú xià, rènhé hóngwěi de mèngxiǎng dōu yào kào yìdiǎnyìdī de nǔlì lái shíxiàn.",
    "vi": "Hành trình ngàn dặm bắt đầu từ một bước chân, bất cứ ước mơ vĩ đại nào cũng phải dựa vào nỗ lực từng li từng tí mới thành hiện thực.",
    "en": "A journey of a thousand miles begins with a single step; grand dreams rely on bit-by-bit effort.",
    "ja": "千里の道も一歩からと言われるように、いかなる雄大な夢も日々の小さな努力によって実現されます。"
  },
  {
    "zh": "机会往往只垂青那些有准备的人，我们绝不能坐井观天、守株待兔。",
    "pinyin": "Jīhuì wǎngwǎng zhǐ chuíqīng nàxiē yǒu zhǔnbèi de rén, wǒmen jué bù néng zuòjǐngguāntiān, shǒuzhūdàitù.",
    "vi": "Cơ hội thường chỉ mỉm cười với những ai có sự chuẩn bị, chúng ta tuyệt đối không thể ngồi đáy giếng ngắm trời, ôm cây đợi thỏ.",
    "en": "Opportunities favor prepared minds; we must never be narrow-minded or wait passively for windfall.",
    "ja": "好機は常に準備のある人に味方します。井の中の蛙になったり、偶然の幸運を待つだけではいけません。"
  },
  {
    "zh": "在此谨祝大家在新的征程中马到成功、一帆风顺、前程似锦！",
    "pinyin": "Zài cǐ jǐn zhù dàjiā zài xīn de zhēngchéng zhōng mǎdàochénggōng, yìfānfēngshùn, qiánchéngsìjǐn!",
    "vi": "Tại đây xin kính chúc mọi người trong chặng đường mới bách chiến bách thắng, thuận buồm xuôi gió, tiền đồ rực rỡ gấm hoa!",
    "en": "Here I sincerely wish everyone instant success, smooth sailing, and a bright future in the new journey!",
    "ja": "ここに、新たな船出において皆様の即座の成功、順風満帆、そして前途洋洋たることを祈念いたします！"
  },
  {
    "zh": "整座古典宫殿依山傍水、气势磅礴，精美绝伦的雕梁画栋令人叹为观止。",
    "pinyin": "Zhěng zuò gǔdiǎn gōngdiàn yīshān bàngshuǐ, qìshì pángbó, jīngměijuélún de diāoliánghuàdòng lìng rén tànwéiguānzhǐ.",
    "vi": "Toàn bộ cung điện cổ tựa núi kề sông, khí thế hào hùng, những mái rui chạm trổ tinh xảo tuyệt luân khiến người xem phải trầm trồ thán phục.",
    "en": "The classical palace against mountains by waters is magnificent, with carvings leaving visitors in awe.",
    "ja": "山を背に水を臨むこの古典宮殿は気迫に満ち、精緻を極めた彫刻や装飾は見る人を感嘆させます。"
  },
  {
    "zh": "科学工作者数十年如一日，一心一意致力于深海勘探与生物样本采集。",
    "pinyin": "Kēxué gōngzuòzhě shù shí nián rú yí rì, yìxīnyíyì zhìlì yú shēnhǎi kāntàn yǔ shēngwù yàngběn cǎijí.",
    "vi": "Các nhà khoa học mấy chục năm như một, toàn tâm toàn ý dốc sức cho công tác thám hiểm biển sâu và thu thập mẫu sinh vật.",
    "en": "Scientists have dedicated decades wholeheartedly to deep-sea exploration and biological sampling.",
    "ja": "科学者たちは数十年間一日も怠ることなく、深海探査と生物サンプルの採取に専心してきました。"
  },
  {
    "zh": "时光荏苒，岁月如梭，转眼间我们已经共同奋斗了整整五个春秋。",
    "pinyin": "Shíguāng rěnrǎn, suìyuè rú suō, zhuǎnyǎn jiān wǒmen yǐjīng gòngtóng fèndòu le zhěngzhěng wǔ gè chūnqiū.",
    "vi": "Thời gian thấm thoắt, thoi đưa tháng ngày, chớp mắt một cái chúng ta đã cùng phấn đấu trọn vẹn suốt năm năm trời.",
    "en": "Time flies by like a shuttle; in the blink of an eye, we have struggled together for five full years.",
    "ja": "光陰矢の如し、歳月の流れるのは早く、瞬く間に私たちは丸5年間も共に奮闘してきました。"
  },
  {
    "zh": "这家现代化生鲜超市的蔬菜水果不仅十分新鲜，而且售价非常合理公道。",
    "pinyin": "Zhè jiā xiàndài huà shēngxiān chāoshì de shūcài shuǐguǒ bùjǐn shífēn xīnxiān, érqiě shòujià fēicháng hélǐ gōngdao.",
    "vi": "Rau quả của siêu thị thực phẩm tươi sống hiện đại này không chỉ rất tươi mà giá bán lại vô cùng hợp lý công bằng.",
    "en": "The vegetables and fruits in this supermarket are not only very fresh, but also priced fairly.",
    "ja": "この近代的な生鮮スーパーの野菜と果物は非常に新鮮なだけでなく、価格もとても良心的です。"
  },
  {
    "zh": "现在在中国出门购物只要随身携带一部智能手机，就能随时通过二维码扫码支付。",
    "pinyin": "Xiànzài zài Zhōngguó chūmén gòuwù zhǐyào suíshēn xiédài yí bù zhìnéng shǒujī, jiù néng suíshí tōngguò èrwéimǎ sǎomǎ zhīfù.",
    "vi": "Hiện nay ở Trung Quốc khi ra ngoài mua sắm chỉ cần mang theo một chiếc điện thoại thông minh là có thể quét mã QR thanh toán bất kỳ lúc nào.",
    "en": "Nowadays in China, carrying a smartphone is enough to pay anytime anywhere via QR code scanning.",
    "ja": "現在中国では、スマートフォン1台あれば、いつでもQRコード決済で買い物ができます。"
  },
  {
    "zh": "周末我想去商场买一件保暖的冬装外套。",
    "pinyin": "Zhōumò wǒ xiǎng qù shāngchǎng mǎi yí jiàn bǎonuǎn de dōngzhuāng wàitào.",
    "vi": "Cuối tuần tôi muốn đến trung tâm thương mại mua một chiếc áo khoác mùa đông ấm áp.",
    "en": "On the weekend I want to go to the mall to buy a warm winter coat.",
    "ja": "週末にショッピングモールへ行って暖かい冬のコートを買いたいです。"
  },
  {
    "zh": "这套服装的设计剪裁十分新颖大方，而且雅致的颜色与你的气质特别相配。",
    "pinyin": "Zhè tào fúzhuāng de shèjì jiǎncái shífēn xīnyǐng dàfang, érqiě yǎzhi de yánsè yǔ nǐ de qìzhì tèbié xiāngpèi.",
    "vi": "Thiết kế cắt may của bộ trang phục này rất mới mẻ trang nhã, hơn nữa màu sắc tao nhã lại đặc biệt hợp với khí chất của bạn.",
    "en": "The cut of this outfit is very stylish, and its elegant color matches your demeanor wonderfully.",
    "ja": "この服のデザインと裁断は斬新で上品であり、落ち着いた色合いがあなたの雰囲気にとてもよく似合っています。"
  },
  {
    "zh": "网络购物虽然给日常生活带来了极大的便利，但也要时刻警惕保护个人隐私与财产安全。",
    "pinyin": "Wǎngluò gòuwù suīrán gěi rìcháng shēnghuó dài lái le jí dà de biànlì, dàn yě yào shíkè jǐngtì bǎohù gèrén yǐnsī yǔ cáichǎn ānquán.",
    "vi": "Mua sắm qua mạng tuy đem lại sự thuận tiện cực lớn cho đời sống hàng ngày, nhưng cũng phải luôn cảnh giác bảo vệ sự riêng tư cá nhân và an toàn tài sản.",
    "en": "Although online shopping brings great convenience, one must always guard personal privacy and funds.",
    "ja": "ネットショッピングは日常生活に大きな利便性をもたらしますが、個人情報と財産の安全には常に警戒が必要です。"
  },
  {
    "zh": "我们在日常消费中应当保持理智与克制，坚决避免盲目跟风、攀比以及不必要的铺张浪费。",
    "pinyin": "Wǒmen zài rìcháng xiāofèi zhōng yīngdāng bǎochí lǐzhì yǔ kèzhì, jiānjué bìmiǎn mángmù gēnfēng, pānbǐ yǐjí bú bìyào de pūzhāng làngfèi.",
    "vi": "Chúng ta trong chi tiêu hàng ngày nên giữ sự lý trí và kiềm chế, kiên quyết tránh mù quáng chạy theo trào lưu, so bì cũng như lãng phí phô trương không cần thiết.",
    "en": "We should remain rational in spending, avoiding blind trends, comparisons, and needless waste.",
    "ja": "私たちは日常の消費において理性と自制を保ち、盲目的な流行追随や見栄、無駄遣いを断固として避けるべきです。"
  },
  {
    "zh": "家庭成员之间的相互关爱与深情陪伴，是这世界上抵御风雨最温暖的力量。",
    "pinyin": "Jiātíng chéngyuán zhījiān de xiānghù guān'ài yǔ shēnqíng péibàn, shì zhè shìjiè shang dǐyù fēngyǔ zuì wēnnuǎn de lìliang.",
    "vi": "Sự quan tâm chăm sóc lẫn nhau và sự đồng hành gắn bó giữa các thành viên trong gia đình là sức mạnh ấm áp nhất trên đời này để chống chọi giông bão.",
    "en": "Mutual love and companionship among family members are the warmest strength to weather storms.",
    "ja": "家族同士の互いの愛情と温かい寄り添いは、この世の風雨に立ち向かう最も温もりある力です。"
  },
  {
    "zh": "真正的知心朋友会在你身处困境、最需要支持的关键时刻毫不犹豫地伸出援助之手。",
    "pinyin": "Zhēnzhèng de zhīxīn péngyou huì zài nǐ shēn chǔ kùnjìng, zuì xūyào zhīchí de guānjiàn shíkè háobùyóuyù de shēn chū yuánzhù zhī shǒu.",
    "vi": "Người bạn tri kỷ đích thực sẽ không ngần ngại giang cánh tay trợ giúp vào thời khắc then chốt khi bạn lâm vào cảnh ngộ khó khăn và cần sự hỗ trợ nhất.",
    "en": "A true friend will unhesitatingly extend a helping hand when you are in trouble and need support most.",
    "ja": "真の親友とは、あなたが苦境に立たされ助けを最も必要としている重要な時に、迷わず救いの手を差し伸べてくれる人です。"
  },
  {
    "zh": "每逢中秋佳节，天南地北的游子都会渴望回到故乡，与亲人共度团圆时刻。",
    "pinyin": "Měi féng Zhōngqiū jiājié, tiānnándìběi de yóuzǐ dōu huì kěwàng huí dào gùxiāng, yǔ qīnrén gòngdù tuányuán shíkè.",
    "vi": "Mỗi dịp Tết Trung Thu, những người con xa xứ ở khắp bốn phương trời đều khao khát trở về quê hương, cùng người thân sum họp bên nhau.",
    "en": "Every Mid-Autumn Festival, wanderers everywhere yearn to return home for reunion with relatives.",
    "ja": "中秋節を迎えるたびに、各地に散らばる人々は故郷へ帰り、家族と共に団らんの時を過ごすことを切望します。"
  },
  {
    "zh": "人与人之间长久的良好关系必须建立在真诚、坦率、互相尊重与相互信任的基石之上。",
    "pinyin": "Rén yǔ rén zhījiān chángjiǔ de liánghǎo guānxì bìxū jiànlì zài zhēnchéng, tǎnshuài, xiānghù zūnzhòng yǔ xiānghù xìnrèn de jīshí zhī shàng.",
    "vi": "Mối quan hệ tốt đẹp lâu dài giữa con người với con người bắt buộc phải được xây dựng trên nền tảng của sự chân thành, thẳng thắn, tôn trọng lẫn nhau và tin cậy nhau.",
    "en": "Long-term relationships must be built on the bedrock of sincerity, frankness, respect, and trust.",
    "ja": "人と人との長きにわたる良好な関係は、誠実さ、率直さ、相互尊重、そして相互信頼の礎の上に築かれねばなりません。"
  },
  {
    "zh": "哪怕岁月流转、天各一方，深厚的同窗情谊也历久弥新，永远闪耀在我们的记忆深处。",
    "pinyin": "Nǎpà suìyuè liúzhuǎn, tiāngèyìfāng, shēnhòu de tóngchuāng qíngyì yě lìjiǔmíxīn, yǒngyuǎn shǎnyào zài wǒmen de jìyì shēnchù.",
    "vi": "Cho dù năm tháng xoay vần, kẻ ở góc biển người nơi chân trời, tình bạn bè thuở học trò sâu đậm vẫn càng lâu càng sáng, mãi lấp lánh nơi sâu thẳm ký ức.",
    "en": "Even if separated by time and distance, deep classmate friendship grows fresher and shines in memory.",
    "ja": "年月が移り変わり遠く離れていても、深い学友の情は時を経るほどに輝きを増し、記憶の奥深くに生き続けます。"
  },
  {
    "zh": "我每天早上七点去上学。",
    "pinyin": "wǒ měitiān zǎoshang qī diǎn qù shàngxué",
    "vi": "Tôi đi học lúc 7 giờ sáng mỗi ngày.",
    "en": "I go to school at 7am every day.",
    "ja": "毎朝7時に学校へ行きます。"
  },
  {
    "zh": "她的成绩在班里一直是最好的。",
    "pinyin": "tā de chéngjì zài bān lǐ yīzhí shì zuì hǎo de",
    "vi": "Thành tích của cô ấy luôn là tốt nhất trong lớp.",
    "en": "Her grades are always the best in class.",
    "ja": "彼女の成績はクラスで常にトップです。"
  },
  {
    "zh": "老师要求我们每天背三十个生词。",
    "pinyin": "lǎoshī yāoqiú wǒmen měitiān bèi sānshí gè shēngcí",
    "vi": "Giáo viên yêu cầu chúng tôi học thuộc 30 từ mới mỗi ngày.",
    "en": "The teacher requires us to memorize 30 new words every day.",
    "ja": "先生は私たちに毎日30個の新しい単語を覚えるよう求めています。"
  },
  {
    "zh": "放学后我们去图书馆自习。",
    "pinyin": "fàngxué hòu wǒmen qù túshūguǎn zìxí",
    "vi": "Sau giờ tan học, chúng tôi đến thư viện tự học.",
    "en": "After school we go to the library to study.",
    "ja": "放課後、私たちは図書館で自習します。"
  },
  {
    "zh": "他考试前紧张得一晚上没睡着。",
    "pinyin": "tā kǎoshì qián jǐnzhāng de yī wǎnshang méi shuìzháo",
    "vi": "Trước kỳ thi, anh ấy lo lắng đến nỗi thức cả đêm không ngủ được.",
    "en": "He was so nervous before the exam that he couldn't sleep all night.",
    "ja": "試験前、彼は緊張して一晩中眠れませんでした。"
  },
  {
    "zh": "这门课的作业太多了，同学们都叫苦连天。",
    "pinyin": "zhè mén kè de zuòyè tài duō le, tóngxuémen dōu jiàokǔliántiān",
    "vi": "Bài tập môn học này quá nhiều, các bạn cùng lớp đều kêu khổ.",
    "en": "This course has too much homework, classmates all complain.",
    "ja": "この授業の宿題が多すぎて、クラスメート全員が不満を言っています。"
  },
  {
    "zh": "他利用暑假参加了一个汉语培训班。",
    "pinyin": "tā lìyòng shǔjià cānjiāle yī gè hànyǔ péixùn bān",
    "vi": "Anh ấy tận dụng kỳ nghỉ hè tham gia một lớp đào tạo tiếng Trung.",
    "en": "He used the summer vacation to attend a Chinese training class.",
    "ja": "彼は夏休みを利用して中国語の研修クラスに参加しました。"
  },
  {
    "zh": "学好一门外语需要长期坚持努力。",
    "pinyin": "xué hǎo yī mén wàiyǔ xūyào chángqī jiānchí nǔlì",
    "vi": "Để học giỏi một ngoại ngữ cần kiên trì nỗ lực lâu dài.",
    "en": "Learning a foreign language well requires long-term persistent effort.",
    "ja": "外国語をマスターするには長期にわたる継続的な努力が必要です。"
  },
  {
    "zh": "老师鼓励我们大胆开口说话，不要怕犯错。",
    "pinyin": "lǎoshī gǔlì wǒmen dǎdǎn kāikǒu shuōhuà, bùyào pà fàncuò",
    "vi": "Giáo viên khuyến khích chúng tôi mạnh dạn mở miệng nói, đừng sợ phạm lỗi.",
    "en": "The teacher encourages us to speak boldly and not be afraid of making mistakes.",
    "ja": "先生は私たちに大胆に話し、間違いを恐れないよう励ましています。"
  },
  {
    "zh": "我的汉语水平还不够好，需要继续提高。",
    "pinyin": "wǒ de hànyǔ shuǐpíng hái bù gòu hǎo, xūyào jìxù tígāo",
    "vi": "Trình độ tiếng Trung của tôi vẫn chưa đủ tốt, cần tiếp tục nâng cao.",
    "en": "My Chinese level is still not good enough and needs to continue improving.",
    "ja": "私の中国語レベルはまだ十分ではなく、引き続き向上させる必要があります。"
  },
  {
    "zh": "阅读能够帮助我们开阔眼界、积累知识。",
    "pinyin": "yuèdú nénggòu bāngzhù wǒmen kāikuò yǎnjiè, jīlěi zhīshi",
    "vi": "Đọc sách có thể giúp chúng ta mở rộng tầm mắt, tích lũy kiến thức.",
    "en": "Reading can help us broaden our horizons and accumulate knowledge.",
    "ja": "読書は視野を広げ、知識を蓄積するのに役立ちます。"
  },
  {
    "zh": "写作不仅能锻炼思维，还能提高表达能力。",
    "pinyin": "xiězuò bùjǐn néng duànliàn sīwéi, hái néng tígāo biǎodá nénglì",
    "vi": "Viết không chỉ rèn luyện tư duy mà còn nâng cao khả năng diễn đạt.",
    "en": "Writing not only trains thinking, but also improves expressive ability.",
    "ja": "文章を書くことは思考力を鍛えるだけでなく、表現力も高めます。"
  },
  {
    "zh": "他通过独立思考找到了解决难题的方法。",
    "pinyin": "tā tōngguò dúlì sīkǎo zhǎodàole jiějué nántí de fāngfǎ",
    "vi": "Anh ấy nhờ suy nghĩ độc lập đã tìm ra phương pháp giải quyết bài toán khó.",
    "en": "Through independent thinking, he found a way to solve the difficult problem.",
    "ja": "彼は独自の思考を通じて難題を解決する方法を見つけました。"
  },
  {
    "zh": "想要学深学透，就必须理解其中的道理。",
    "pinyin": "xiǎng yào xué shēn xué tòu, jiù bìxū lǐjiě qízhōng de dàolǐ",
    "vi": "Muốn học sâu hiểu kỹ thì nhất định phải hiểu rõ đạo lý bên trong.",
    "en": "To learn deeply and thoroughly, one must understand the underlying principles.",
    "ja": "深く徹底的に学ぶためには、その道理を理解しなければなりません。"
  },
  {
    "zh": "良好的记忆力需要平时的科学训练。",
    "pinyin": "liánghǎo de jìyìlì xūyào píngshí de kēxué xùnliàn",
    "vi": "Trí nhớ tốt cần sự rèn luyện khoa học thường ngày.",
    "en": "Good memory requires regular scientific training.",
    "ja": "優れた記憶力には日頃の科学的なトレーニングが必要です。"
  },
  {
    "zh": "上课的时候一定要集中注意力听讲。",
    "pinyin": "shàngkè de shíhou yīdìng yào jízhōng zhùyìlì tīngjiǎng",
    "vi": "Khi lên lớp nhất định phải tập trung chú ý nghe giảng.",
    "en": "During class, you must focus your attention on listening to the lecture.",
    "ja": "授業中は必ず集中して先生の話を聞かなければなりません。"
  },
  {
    "zh": "遇到不懂的问题要及时向老师请教。",
    "pinyin": "yù dào bù dǒng de wèntí yào jíshí xiàng lǎoshī qǐngjiào",
    "vi": "Khi gặp vấn đề không hiểu cần kịp thời thỉnh giáo thầy cô.",
    "en": "When encountering problems you don't understand, ask the teacher in time.",
    "ja": "分からない問題があったら、すぐに先生に質問すべきです。"
  },
  {
    "zh": "经过不断努力，他的汉语有了很大进步。",
    "pinyin": "jīngguò bùduàn nǔlì, tā de hànyǔ yǒule hěn dà jìnbù",
    "vi": "Qua nỗ lực không ngừng, tiếng Trung của anh ấy đã tiến bộ rất nhiều.",
    "en": "Through continuous effort, his Chinese has made great progress.",
    "ja": "絶え間ない努力を経て、彼の中国語は大いに進歩しました。"
  },
  {
    "zh": "考试时一定要认真审题，避免粗心出错。",
    "pinyin": "kǎoshì shí yīdìng yào rènzhēn shěntí, bìmiǎn cūxīn chūcuò",
    "vi": "Khi thi nhất định phải đọc kỹ đề bài, tránh bất cẩn sai sót.",
    "en": "During exams, carefully read the questions to avoid careless mistakes.",
    "ja": "試験の時は必ず問題を慎重に読み、不注意なミスを避けてください。"
  },
  {
    "zh": "这本词典解释清晰，非常适合初学者使用。",
    "pinyin": "zhè běn cídiǎn jiěshì qīngxī, fēicháng shìhé chūxuézhě shǐyòng",
    "vi": "Cuốn từ điển này giải thích rõ ràng, rất phù hợp cho người mới bắt đầu.",
    "en": "This dictionary has clear explanations and is very suitable for beginners.",
    "ja": "この辞書は説明が明確で、初心者にとても適しています。"
  },
  {
    "zh": "养成每天复习的好习惯对学业很有帮助。",
    "pinyin": "yǎngchéng měitiān fùxí de hǎo xíguàn duì xuéyè hěn yǒu bāngzhù",
    "vi": "Rèn thói quen ôn tập mỗi ngày rất có ích cho việc học tập.",
    "en": "Forming a good habit of daily review is very helpful for your studies.",
    "ja": "毎日復習する良い習慣を身につけることは、学業にとても役立ちます。"
  },
  {
    "zh": "他打算毕业后申请去北京大学继续深造。",
    "pinyin": "tā dǎsuàn bìyè hòu shēnqǐng qù běijīng dàxué jìxù shēnzào",
    "vi": "Anh ấy dự định sau khi tốt nghiệp sẽ nộp đơn vào Đại học Bắc Kinh để học lên cao.",
    "en": "He plans to apply for further studies at Peking University after graduation.",
    "ja": "彼は卒業後、北京大学に進学してさらに研究を深める予定です。"
  },
  {
    "zh": "课外活动能够培养学生的团队协作精神。",
    "pinyin": "kèwài huódòng nénggòu péiyǎng xuéshēng de tuánduì xiézuò jīngshén",
    "vi": "Hoạt động ngoại khóa có thể bồi dưỡng tinh thần làm việc nhóm cho học sinh.",
    "en": "Extracurricular activities can cultivate students' teamwork spirit.",
    "ja": "課外活動は生徒のチームワークの精神を養うことができます。"
  },
  {
    "zh": "掌握正确的学习方法往往能事半功倍。",
    "pinyin": "zhǎngwò zhèngquè de xuéxí fāngfǎ wǎngwǎng néng shìbàngōngbèi",
    "vi": "Nắm vững phương pháp học tập đúng đắn thường đạt kết quả gấp đôi với một nửa công sức.",
    "en": "Mastering the correct study methods often gets twice the result with half the effort.",
    "ja": "正しい勉強方法を身につければ、得てして半分の労力で倍の成果が得られます。"
  },
  {
    "zh": "老师耐心地为我们讲解这篇古文的含义。",
    "pinyin": "lǎoshī nàixīn de wèi wǒmen jiǎngjiě zhè piān gǔwén de hányì",
    "vi": "Thầy giáo kiên nhẫn giảng giải cho chúng tôi ý nghĩa của bài văn cổ này.",
    "en": "The teacher patiently explained the meaning of this ancient text to us.",
    "ja": "先生はこの古典の文章の意味を私たちに根気強く説明してくれました。"
  },
  {
    "zh": "凭借勤奋刻苦的努力，他顺利通过了HSK五级考试。",
    "pinyin": "píngjiè qínfèn kèkǔ de nǔlì, tā shùnlì tōngguòle HSK wǔ jí kǎoshì",
    "vi": "Nhờ vào nỗ lực cần cù chăm chỉ, anh ấy đã thuận lợi vượt qua kỳ thi HSK cấp 5.",
    "en": "Relying on diligent efforts, he successfully passed the HSK Level 5 exam.",
    "ja": "勤勉で懸命な努力により、彼は順調にHSK5級試験に合格しました。"
  },
  {
    "zh": "知识改变命运，教育是个人发展的基石。",
    "pinyin": "zhīshi gǎibiàn mìngyùn, jiàoyù shì gèrén fāzhǎn de jīshí",
    "vi": "Kiến thức thay đổi số phận, giáo dục là nền tảng phát triển của mỗi cá nhân.",
    "en": "Knowledge changes destiny, and education is the cornerstone of personal development.",
    "ja": "知識は運命を変え、教育は個人の発展の礎です。"
  },
  {
    "zh": "课后讨论环节激发了大家浓厚的求知欲。",
    "pinyin": "kèhòu tǎolùn huánjié jīfāle dàjiā nónghòu de qiúzhīyù",
    "vi": "Buổi thảo luận sau giờ học đã khơi dậy niềm khao khát học hỏi sâu sắc của mọi người.",
    "en": "The post-class discussion sparked a strong thirst for knowledge among everyone.",
    "ja": "授業後のディスカッションは、皆の旺盛な知的好奇心を刺激しました。"
  },
  {
    "zh": "这位教授的讲座内容丰富，深受学生欢迎。",
    "pinyin": "zhè wèi jiàoshòu de jiǎngzuò nèiróng fēngfù, shēn shòu xuéshēng huānyíng",
    "vi": "Bài diễn giảng của vị giáo sư này nội dung phong phú, được sinh viên đón nhận nồng nhiệt.",
    "en": "This professor's lecture was rich in content and popular among students.",
    "ja": "この教授の講義は内容が豊富で、学生たちから大いに歓迎されています。"
  },
  {
    "zh": "学海无涯，我们要始终保持谦虚的学习态度。",
    "pinyin": "xuéhǎi wúyá, wǒmen yào shǐzhōng bǎochí qiānxū de xuéxí tàidù",
    "vi": "Biển học vô bờ, chúng ta phải luôn giữ thái độ học hỏi khiêm tốn.",
    "en": "Learning has no bounds; we must always maintain a humble learning attitude.",
    "ja": "学問の道には果てがありません。私たちは常に謙虚な学習姿勢を保つべきです。"
  },
  {
    "zh": "无论走多远，家永远是我们最温暖的港湾。",
    "pinyin": "wúlùn zǒu duō yuǎn, jiā yǒngyuǎn shì wǒmen zuì wēnnuǎn de gǎngwān",
    "vi": "Cho dù đi xa đến đâu, gia đình mãi là bến đỗ ấm áp nhất của chúng ta.",
    "en": "No matter how far you go, home is always our warmest harbor.",
    "ja": "どんなに遠くへ行っても、家は常に私たちの最も温かい港です。"
  },
  {
    "zh": "父母每天都在为了这个家庭默默付出。",
    "pinyin": "fùmǔ měitiān dōu zài wèile zhè gè jiātíng mòmò fùchū",
    "vi": "Cha mẹ mỗi ngày đều âm thầm cống hiến vì gia đình này.",
    "en": "Parents silently give their best every day for the family.",
    "ja": "両親は毎日この家族のために黙々と尽くしてくれています。"
  },
  {
    "zh": "周末全家人聚在一起做饭聊天，感觉很幸福。",
    "pinyin": "zhōumò quánjiā rén jù zài yīqǐ zuòfàn liáotiān, gǎnjué hěn xìngfú",
    "vi": "Cuối tuần cả nhà quây quần nấu ăn trò chuyện, cảm thấy rất hạnh phúc.",
    "en": "Having the whole family gather on weekends to cook and chat feels very happy.",
    "ja": "週末に家族全員が集まって料理をしおしゃべりするのは、とても幸せに感じます。"
  },
  {
    "zh": "真挚的爱情与深厚的情感是美满婚姻的基石。",
    "pinyin": "zhēnzhì de àiqíng yǔ shēnhòu de qínggǎn shì měimǎn hūnyīn de jīshí",
    "vi": "Tình yêu chân thành và tình cảm sâu đậm là nền tảng của hôn nhân mỹ mãn.",
    "en": "Sincere love and deep affection are the bedrock of a happy marriage.",
    "ja": "真摯な愛情と深い情愛は、円満な結婚生活の礎です。"
  },
  {
    "zh": "尊老爱幼是中华民族的传统美德。",
    "pinyin": "zūnlǎo'àiyòu shì zhōnghuá mínzú de chuántǒng měidé",
    "vi": "Kính già yêu trẻ là nét đẹp truyền thống của dân tộc Trung Hoa.",
    "en": "Respecting the elderly and caring for the young is a traditional virtue.",
    "ja": "老人を敬い幼きを慈しむことは伝統的な美徳です。"
  },
  {
    "zh": "晚饭后陪父母在公园散步是一种享受。",
    "pinyin": "wǎnfàn hòu péi fùmǔ zài gōngyuán sànbù shì yī zhǒng xiǎngshòu",
    "vi": "Sau bữa tối cùng cha mẹ đi dạo trong công viên là một niềm vui tao nhã.",
    "en": "Strolling in the park with parents after dinner is a real pleasure.",
    "ja": "夕食後に両親と公園を散歩するのは心地よい楽しみです。"
  },
  {
    "zh": "哥哥性格开朗，特别喜欢交朋友。",
    "pinyin": "gēge xìnggé kāilǎng, tèbié xǐhuan jiāo péngyou",
    "vi": "Anh trai tính cách cởi mở, đặc biệt thích kết bạn.",
    "en": "My older brother has an outgoing personality and loves making friends.",
    "ja": "兄は性格が明るく、友達を作るのが大好きです。"
  },
  {
    "zh": "姐姐工作虽然忙，但每天都会抽空陪孩子。",
    "pinyin": "jiějie gōngzuò suīrán máng, dàn měitiān dōu huì chōukòng péi háizi",
    "vi": "Chị gái tuy công việc bận rộn nhưng ngày nào cũng tranh thủ thời gian bồi bạn bên con.",
    "en": "Although my sister is busy at work, she makes time every day to accompany her child.",
    "ja": "姉は仕事が忙しいものの、毎日時間を見つけて子供と過ごしています。"
  },
  {
    "zh": "我们从小就应该养成独立自主的生活习惯。",
    "pinyin": "wǒmen cóngxiǎo jiù yīnggāi yǎngchéng dúlì zìzhǔ de shēnghuó xíguàn",
    "vi": "Từ nhỏ chúng ta nên hình thành thói quen sống tự lập.",
    "en": "We should develop independent living habits from childhood.",
    "ja": "私たちは幼い頃から自立した生活習慣を身につけるべきです。"
  },
  {
    "zh": "邻里之间要友好相处，互帮互助。",
    "pinyin": "línlǐ zhījiān yào yǒuhǎo xiāngchǔ, hùbāng hùzhù",
    "vi": "Hàng xóm láng giềng cần sống hòa thuận, tương trợ lẫn nhau.",
    "en": "Neighbors should live together harmoniously and help each other.",
    "ja": "近所同士は友好的に付き合い、助け合うべきです。"
  },
  {
    "zh": "生活中难免有不如意的事，心态好最重要。",
    "pinyin": "shēnghuó zhōng nánmiǎn yǒu bù rúyì de shì, xīntài hǎo zuì zhòngyào",
    "vi": "Trong cuộc sống khó tránh khỏi chuyện không vừa ý, tâm thái tốt là quan trọng nhất.",
    "en": "Life inevitably brings disappointments; having a good attitude is most important.",
    "ja": "生活の中で思い通りにならないことは避けられません。前向きな心が何より大切です。"
  },
  {
    "zh": "真正的友谊经得起时间和距离的考验。",
    "pinyin": "zhēnzhèng de yǒuyì jīng de qǐ shíjiān hé jùlí de kǎoyàn",
    "vi": "Tình bạn chân chính chịu được thử thách của thời gian và khoảng cách.",
    "en": "True friendship stands the test of time and distance.",
    "ja": "本当の友情は時間と距離の試練に耐えうるものです。"
  },
  {
    "zh": "诚实守信是立身处世的根本原则。",
    "pinyin": "chéngshí shǒuxìn shì lìshēn chǔshì de gēnběn yuánzé",
    "vi": "Thành thực giữ chữ tín là nguyên tắc cơ bản để đối nhân xử thế.",
    "en": "Honesty and trustworthiness are fundamental principles for conducting oneself.",
    "ja": "誠実さと信義を守ることは、社会で生きていくための根本的な原則です。"
  },
  {
    "zh": "他对自己的工作充满了热情与责任感。",
    "pinyin": "tā duì zìjǐ de gōngzuò chōngmǎnle rèqíng yǔ zérèngǎn",
    "vi": "Anh ấy tràn đầy nhiệt huyết và tinh thần trách nhiệm đối với công việc của mình.",
    "en": "He is full of passion and a sense of responsibility toward his work.",
    "ja": "彼は自分の仕事に対して情熱と責任感に満ちています。"
  },
  {
    "zh": "乐观的人总能在困难中看到希望的曙光。",
    "pinyin": "lèguān de rén zǒng néng zài kùnnan zhōng kàndào xīwàng de shǔguāng",
    "vi": "Người lạc quan luôn có thể nhìn thấy tia sáng hy vọng trong gian khó.",
    "en": "Optimistic people can always see the dawn of hope in difficulties.",
    "ja": "楽観的な人はいつも困難の中に希望の光を見出すことができます。"
  },
  {
    "zh": "经过多次深入沟通，他们终于解开了误会。",
    "pinyin": "jīngguò duō cì shēnrù gōutōng, tāmen zhōngyú jiěkāile wùhuì",
    "vi": "Sau nhiều lần giao tiếp sâu sắc, họ cuối cùng đã xóa bỏ được hiểu lầm.",
    "en": "After multiple in-depth communications, they finally cleared up the misunderstanding.",
    "ja": "何度も深い対話を重ねた末、彼らはついに誤解を解きました。"
  },
  {
    "zh": "给予他人帮助，自己内心也会感到快乐。",
    "pinyin": "jǐyǔ tārén bāngzhù, zìjǐ nèixīn yě huì gǎndào kuàilè",
    "vi": "Giúp đỡ người khác, nội tâm bản thân cũng cảm thấy vui vẻ.",
    "en": "Giving help to others brings happiness to one's own heart as well.",
    "ja": "他人を助けることで、自分自身の心も喜びを感じます。"
  },
  {
    "zh": "妈妈做的家常菜永远是最美味的记忆。",
    "pinyin": "māma zuò de jiāchángcài yǒngyuǎn shì zuì měiwèi de jìyì",
    "vi": "Món ăn gia đình mẹ nấu mãi mãi là ký ức thơm ngon nhất.",
    "en": "The home-cooked dishes mother makes are always the most delicious memories.",
    "ja": "母の手料理は永遠に最も美味しい記憶です。"
  },
  {
    "zh": "遇到分歧时要换位思考，多替别人着想。",
    "pinyin": "yù dào fēnqí shí yào huànwèi sīkǎo, duō tì biérén zhuóxiǎng",
    "vi": "Khi gặp bất đồng hãy đặt mình vào vị trí người khác mà nghĩ cho họ.",
    "en": "When facing disagreements, put yourself in others' shoes and be considerate.",
    "ja": "意見の食い違いがあるときは立場を変えて考え、他者を思いやるべきです。"
  },
  {
    "zh": "他为人谦逊低调，深受大家喜爱和尊重。",
    "pinyin": "tā wéirén qiānxùn dīdào, shēn shòu dàjiā xǐ'ài hé zūnzhòng",
    "vi": "Anh ấy đối nhân khiêm tốn nhã nhặn, rất được mọi người yêu mến và tôn trọng.",
    "en": "He is humble and modest, deeply liked and respected by everyone.",
    "ja": "彼は謙虚で控えめな人柄であり、皆から深く愛され尊重されています。"
  },
  {
    "zh": "节约粮食是一种美德，我们应该杜绝浪费。",
    "pinyin": "jiéyuē liángshí shì yī zhǒng měidé, wǒmen yīnggāi dùjué làngfèi",
    "vi": "Tiết kiệm lương thực là một đức tính tốt, chúng ta nên triệt để chống lãng phí.",
    "en": "Saving food is a virtue; we should put an end to waste.",
    "ja": "食べ物を大切にすることは美徳であり、無駄をなくすべきです。"
  },
  {
    "zh": "这座安静的小区非常适合老人颐养天年。",
    "pinyin": "zhè zuò ānjìng de xiǎoqū fēicháng shìhé lǎorén yíyǎngtiānnián",
    "vi": "Khu chung cư yên tĩnh này rất thích hợp cho người già an dưỡng tuổi già.",
    "en": "This quiet neighborhood is very suitable for the elderly to enjoy their later years.",
    "ja": "この静かな団地は高齢者が余生を穏やかに過ごすのにとても適しています。"
  },
  {
    "zh": "面对挫折，我们要有重新站起来的勇气。",
    "pinyin": "miànduì cuòzhé, wǒmen yào yǒu chóngxīn zhàn qǐlái de yǒngqì",
    "vi": "Đối mặt với trắc trở, chúng ta phải có lòng can đảm đứng dậy lần nữa.",
    "en": "In the face of setbacks, we must have the courage to stand up again.",
    "ja": "挫折に直面したとき、私たちは再び立ち上がる勇気を持たねばなりません。"
  },
  {
    "zh": "信任一旦被破坏，往往需要漫长的时间来弥补。",
    "pinyin": "xìnrèn yīdàn bèi pòhuài, wǎngwǎng xūyào màncháng de shíjiān lái míbǔ",
    "vi": "Niềm tin một khi đã sụp đổ thường cần thời gian dài đằng đẵng để bù đắp.",
    "en": "Once trust is broken, it often takes a long time to repair.",
    "ja": "一度壊れた信頼を取り戻すには、往々にして長い時間がかかります。"
  },
  {
    "zh": "爷爷每天早晨都会在院子里打太极拳。",
    "pinyin": "yéye měitiān zǎochén dōu huì zài yuànzi lǐ dǎ tàijíquán",
    "vi": "Ông nội mỗi sáng sớm đều luyện Thái Cực Quyền trong sân.",
    "en": "Grandpa practices Tai Chi in the yard every morning.",
    "ja": "祖父は毎朝庭で太極拳をしています。"
  },
  {
    "zh": "只有学会欣赏别人，才能更好地完善自己。",
    "pinyin": "zhǐyǒu xuéhuì xīnshǎng biérén, cáinéng gèng hǎo de wánshàn zìjǐ",
    "vi": "Chỉ khi học được cách trân trọng người khác, ta mới hoàn thiện bản thân tốt hơn.",
    "en": "Only by learning to appreciate others can one better improve oneself.",
    "ja": "他人を認めることを学んでこそ、自分自身をより高めることができます。"
  },
  {
    "zh": "简单平凡的生活中也蕴藏着无数微小的幸福。",
    "pinyin": "jiǎndān píngfán de shēnghuó zhōng yě yùncáng zhe wúshù wēixiǎo de xìngfú",
    "vi": "Trong cuộc sống giản dị bình thường cũng ẩn chứa vô vàn niềm hạnh phúc nhỏ nhoi.",
    "en": "Simple and ordinary life also holds countless little moments of happiness.",
    "ja": "飾り気のない平凡な生活の中にも、数えきれないほどの小さな幸せが潜んでいます。"
  },
  {
    "zh": "遇到矛盾要心平气和地坐下来商量解决。",
    "pinyin": "yù dào máodùn yào xīnpíngqìhé de zuò xiàlái shāngliang jiějué",
    "vi": "Khi gặp mâu thuẫn phải bình tâm tĩnh khí ngồi xuống thương lượng giải quyết.",
    "en": "When conflicts arise, sit down calmly and talk to resolve them.",
    "ja": "対立が生じたときは、心を落ち着けて座り、話し合って解決すべきです。"
  },
  {
    "zh": "无论生活多么忙碌，也不要忽视了身体健康。",
    "pinyin": "wúlùn shēnghuó duōme mánglù, yě bùyào hūshìle shēntǐ jiànkāng",
    "vi": "Cho dù cuộc sống bận rộn đến mấy cũng đừng phớt lờ sức khỏe cơ thể.",
    "en": "No matter how busy life is, do not neglect your physical health.",
    "ja": "どんなに生活が忙しくても、健康をおろそかにしてはなりません。"
  },
  {
    "zh": "家人的支持是他面对风雨时最坚强的后盾。",
    "pinyin": "jiārén de zhīchí shì tā miànduì fēngyǔ shí zuì jiānqiáng de hòudùn",
    "vi": "Sự ủng hộ của người nhà là điểm tựa vững chắc nhất khi anh đối diện bão táp.",
    "en": "Family support is his strongest backing when facing trials and tribulations.",
    "ja": "家族の支えは、彼が困難に立ち向かうときの最も心強い後ろ盾です。"
  },
  {
    "zh": "他在工作中兢兢业业，深受领导和同事的赞赏。",
    "pinyin": "tā zài gōngzuò zhōng jīngjīngyèyè, shēn shòu lǐngdǎo hé tóngshì de zànshǎng",
    "vi": "Anh ấy luôn tận tụy trong công việc, được lãnh đạo và đồng nghiệp khen ngợi.",
    "en": "He works conscientiously and is deeply appreciated by leaders and colleagues.",
    "ja": "彼は仕事に真面目に励み、上司や同僚から高く評価されています。"
  },
  {
    "zh": "面试时要保持自信，清晰表达自己的优势。",
    "pinyin": "miànshì shí yào bǎochí zìxìn, qīngxī biǎodá zìjǐ de yōushì",
    "vi": "Khi phỏng vấn cần giữ tự tin, thể hiện rõ ràng ưu thế của bản thân.",
    "en": "Stay confident during interviews and clearly articulate your strengths.",
    "ja": "面接の時は自信を持ち、自分の強みを明確に伝えるべきです。"
  },
  {
    "zh": "团队合作需要明确分工和密切配合。",
    "pinyin": "tuánduì hézuò xūyào míngquè fēngōng hé mìqiè pèihé",
    "vi": "Làm việc nhóm đòi hỏi sự phân công rõ ràng và phối hợp chặt chẽ.",
    "en": "Teamwork requires clear division of labor and close cooperation.",
    "ja": "チームワークには明確な役割分担と緊密な連携が必要です。"
  },
  {
    "zh": "这个项目遇到了瓶颈，大家正在抓紧寻找解决方案。",
    "pinyin": "zhè gè xiàngmù yù dàole píngjǐng, dàjiā zhèngzài zhuājǐn xúnzhǎo jiějué fāng'àn",
    "vi": "Dự án này gặp nút thắt cổ chai, mọi người đang khẩn trương tìm phương án giải quyết.",
    "en": "This project hit a bottleneck; everyone is urgently seeking solutions.",
    "ja": "このプロジェクトは難局に直面しており、皆で急いで解決策を探しています。"
  },
  {
    "zh": "只要付出足够的汗水，终将迎来成功的果实。",
    "pinyin": "zhǐyào fùchū zúgòu de hànshuǐ, zhōng jiāng yínglái chénggōng de guǒshí",
    "vi": "Chỉ cần bỏ ra đủ mồ hôi, cuối cùng sẽ đón nhận trái ngọt thành công.",
    "en": "As long as you sweat enough effort, you will eventually reap the fruits of success.",
    "ja": "十分な汗を流し努力しさえすれば、いつか必ず成功の果実を手にできます。"
  },
  {
    "zh": "制定切实可行的计划是实现目标的第一步。",
    "pinyin": "zhìdìng qièshí kěxíng de jìhuà shì shíxiàn mùbiāo de dì-yī bù",
    "vi": "Đặt ra kế hoạch thiết thực khả thi là bước đầu tiên để thực hiện mục tiêu.",
    "en": "Formulating a feasible plan is the first step toward achieving goals.",
    "ja": "実現可能な計画を立てることが、目標達成への第一歩です。"
  },
  {
    "zh": "公司为新入职的员工安排了系统的岗前培训。",
    "pinyin": "gōngsī wèi xīn rùzhí de yuángōng ānpáile xìtǒng de gǎng qián péixùn",
    "vi": "Công ty đã bố trí đợt đào tạo nghiệp vụ trước khi nhận việc bài bản cho nhân viên mới.",
    "en": "The company arranged systematic pre-job training for new employees.",
    "ja": "会社は新入社員のために体系的な研修プログラムを用意しました。"
  },
  {
    "zh": "他抓住了难得的发展机会，开创了属于自己的事业。",
    "pinyin": "tā zhuāzhùle nándé de fāzhǎn jīhuì, kāichuàngle shǔyú zìjǐ de shìyè",
    "vi": "Anh ấy nắm bắt cơ hội phát triển hiếm có, mở ra sự nghiệp thuộc về riêng mình.",
    "en": "He seized a rare development opportunity and created his own business.",
    "ja": "彼は貴重な発展のチャンスを掴み、自身のキャリアを切り拓きました。"
  },
  {
    "zh": "无论从事什么行业，专业素养都是核心竞争力。",
    "pinyin": "wúlùn cóngshì shénme hángyè, zhuānyè sùyǎng dōu shì héxīn jìngzhēnglì",
    "vi": "Cho dù làm ngành nghề nào, tố chất chuyên môn đều là năng lực cạnh tranh cốt lõi.",
    "en": "Regardless of the industry, professional competence is the core competitive advantage.",
    "ja": "どの業界に従事していても、専門的な素養こそが核となる競争力です。"
  },
  {
    "zh": "经过深入的市场调研，我们决定推出这款新产品。",
    "pinyin": "jīngguò shēnrù de shìchǎng diàoyán, wǒmen juédìng tuīchū zhè kuǎn xīn chǎnpǐn",
    "vi": "Sau khi nghiên cứu thị trường kỹ lưỡng, chúng tôi quyết định ra mắt sản phẩm mới này.",
    "en": "After in-depth market research, we decided to launch this new product.",
    "ja": "詳細な市場調査を経て、私たちはこの新製品を投入することを決定しました。"
  },
  {
    "zh": "领导在今天的全体会议上表扬了他的突出贡献。",
    "pinyin": "lǐngdǎo zài jīntiān de quántǐ huìyì shàng biǎoyángle tā de tūchū gòngxiàn",
    "vi": "Lãnh đạo trong cuộc họp toàn thể hôm nay đã khen ngợi cống hiến nổi bật của anh ấy.",
    "en": "The manager commended his outstanding contribution at today's general meeting.",
    "ja": "リーダーは本日の全体会議で彼の傑出した貢献を表彰しました。"
  },
  {
    "zh": "面对职场压力，要学会合理调节情绪和时间。",
    "pinyin": "miànduì zhíchǎng yālì, yào xuéhuì hélǐ tiáojié qíngxù hé shíjiān",
    "vi": "Đối mặt với áp lực nơi công sở, cần học cách điều tiết cảm xúc và thời gian hợp lý.",
    "en": "Facing workplace pressure, learn to reasonably manage emotions and time.",
    "ja": "職場のプレッシャーに対し、感情と時間を適切にコントロールすることを学ぶべきです。"
  },
  {
    "zh": "双方经过友好协商，顺利签署了合作协议。",
    "pinyin": "shuāngfāng jīngguò yǒuhǎo xiéshāng, shùnlì qiānshǔle hézuò xiéyì",
    "vi": "Hai bên qua thương thảo hữu nghị đã thuận lợi ký kết thỏa thuận hợp tác.",
    "en": "After friendly negotiations, both parties smoothly signed the cooperation agreement.",
    "ja": "双方は友好的な協議を経て、無事に協力協定を締結しました。"
  },
  {
    "zh": "他凭借丰富的行业经验给公司提出了很多宝贵建议。",
    "pinyin": "tā píngjiè fēngfù de hángyè jīngyàn gěi gōngsī tíchūle hěn duō bǎoguì jiànyì",
    "vi": "Dựa vào kinh nghiệm dày dặn trong ngành, anh ấy đã đưa ra nhiều đề xuất quý báu cho công ty.",
    "en": "Relying on rich industry experience, he gave the company many valuable suggestions.",
    "ja": "彼は豊富な業界経験を活かして、会社に数多くの貴重な提案をしました。"
  },
  {
    "zh": "提高工作效率的关键在于分清事情的轻重缓急。",
    "pinyin": "tígāo gōngzuò xiàolǜ de guānjiàn zàiyú fēnqīng shìqing de qīngzhònghuǎnjí",
    "vi": "Chìa khóa nâng cao hiệu suất công việc nằm ở việc phân biệt thứ tự ưu tiên quan trọng cấp bách.",
    "en": "The key to improving work efficiency lies in prioritizing tasks properly.",
    "ja": "仕事の効率を高める鍵は、物事の優先順位を明確に見極めることにあります。"
  },
  {
    "zh": "现代企业非常重视员工的持续创新与学习能力。",
    "pinyin": "xiàndài qǐyè fēicháng zhòngshì yuángōng de chíxù chuàngxīn yǔ xuéxí nénglì",
    "vi": "Doanh nghiệp hiện đại hết sức coi trọng khả năng đổi mới sáng tạo và học hỏi liên tục của nhân viên.",
    "en": "Modern enterprises attach great importance to employees' ongoing innovation and learning abilities.",
    "ja": "現代の企業は従業員の継続的な革新と学習能力を非常に重視しています。"
  },
  {
    "zh": "他正在准备下周向重要客户进行的方案演示。",
    "pinyin": "tā zhèngzài zhǔnbèi xià zhōu xiàng zhòngyào kèhù jìnxíng de fāng'àn yǎnshì",
    "vi": "Anh ấy đang chuẩn bị bài thuyết trình phương án cho khách hàng quan trọng vào tuần tới.",
    "en": "He is preparing the presentation of the proposal for important clients next week.",
    "ja": "彼は来週、重要クライアントに向けて行う提案プレゼンテーションの準備をしています。"
  },
  {
    "zh": "这家初创公司凭借独特的技术优势迅速发展壮大。",
    "pinyin": "zhè jiā chūchuàng gōngsī píngjiè dútè de jìshù yōushì xùnsù fāzhǎn zhuàngdà",
    "vi": "Công ty khởi nghiệp này dựa vào ưu thế công nghệ độc đáo đã phát triển lớn mạnh nhanh chóng.",
    "en": "This startup rapidly grew and expanded through its unique technological advantages.",
    "ja": "このスタートアップ企業は独自の技術的強みを強みに急速に成長しました。"
  },
  {
    "zh": "及时总结经验教训能够避免重蹈覆辙。",
    "pinyin": "jíshí zǒngjié jīngyàn jiàoxùn nénggòu bìmiǎn chóngdǎofùzhé",
    "vi": "Kịp thời đúc kết kinh nghiệm bài học có thể tránh lặp lại vết xe đổ.",
    "en": "Summarizing lessons learned in time helps avoid repeating past mistakes.",
    "ja": "経験と教訓をタイムリーに総括することで、同じ過ちの繰り返しを防げます。"
  },
  {
    "zh": "良好的职业道德是一名优秀员工必备的基本品质。",
    "pinyin": "liánghǎo de zhíyè dàodé shì yī míng yōuxiù yuángōng bìbèi de jīběn pǐnzhì",
    "vi": "Đạo đức nghề nghiệp tốt là phẩm chất cơ bản cần có của một nhân viên ưu tú.",
    "en": "Good professional ethics are an essential basic quality for an excellent employee.",
    "ja": "優れた職業倫理は、優秀な従業員が備えるべき基本的な資質です。"
  },
  {
    "zh": "我们需要按时完成这个季度的各项业绩指标。",
    "pinyin": "wǒmen xūyào ànshí wánchéng zhè gè jìdù de gè xiàng yèjì zhǐbiāo",
    "vi": "Chúng ta cần hoàn thành đúng hạn các chỉ tiêu hiệu quả kinh doanh của quý này.",
    "en": "We need to complete the performance targets for this quarter on time.",
    "ja": "私たちは今四半期の各種業績指標を予定通り達成する必要があります。"
  },
  {
    "zh": "经理在会议中指出了项目目前存在的主要风险。",
    "pinyin": "jīnglǐ zài huìyì zhōng zhǐchūle xiàngmù mùqián cúnzài de zhǔyào fēngxiǎn",
    "vi": "Giám đốc trong cuộc họp đã chỉ ra những rủi ro chính hiện tại của dự án.",
    "en": "The manager pointed out the major risks currently existing in the project during the meeting.",
    "ja": "マネージャーは会議でプロジェクトの現時点における主なリスクを指摘しました。"
  },
  {
    "zh": "职场中的良性竞争能够促进团队整体实力的提升。",
    "pinyin": "zhíchǎng zhōng de liángxìng jìngzhēng nénggòu cùjìn tuánduì zhěngtǐ shílì de tíshēng",
    "vi": "Cạnh tranh lành mạnh nơi công sở có thể thúc đẩy nâng cao thực lực chung của cả tập thể.",
    "en": "Healthy competition in the workplace can promote the overall strength of the team.",
    "ja": "職場における健全な競争は、チーム全体の総合力の向上を促進します。"
  },
  {
    "zh": "任何重大的商业决策都需要有充分的数据支持。",
    "pinyin": "rènhé zhòngdà de shāngyè juécè dōu xūyào yǒu chōngfèn de shùjù zhīchí",
    "vi": "Bất kỳ quyết sách kinh doanh trọng đại nào cũng cần có sự hỗ trợ của số liệu đầy đủ.",
    "en": "Any major business decision requires sufficient data support.",
    "ja": "いかなる重大なビジネスの意思決定にも、十分なデータの裏付けが必要です。"
  },
  {
    "zh": "他善于倾听客户意见，并能迅速作出相应调整。",
    "pinyin": "tā shànyú qīngtīng kèhù yìjiàn, bìng néng xùnsù zuòchū xiāngyìng tiáozhěng",
    "vi": "Anh ấy giỏi lắng nghe ý kiến khách hàng và có thể nhanh chóng điều chỉnh tương ứng.",
    "en": "He is good at listening to customer feedback and quickly making adjustments.",
    "ja": "彼は顧客の意見に耳を傾けるのが得意で、迅速に対応・調整できます。"
  },
  {
    "zh": "经过三轮严格选拔，他终于获得了心仪的职位。",
    "pinyin": "jīngguò sān lún yángé xuǎnbá, tā zhōngyú huòdéle xīnyí de zhíwèi",
    "vi": "Sau ba vòng tuyển chọn nghiêm ngặt, anh ấy cuối cùng đã giành được vị trí mong ước.",
    "en": "After three rounds of rigorous selection, he finally secured his dream position.",
    "ja": "3回にわたる厳格な選考を経て、彼はついに念願のポジションを獲得しました。"
  },
  {
    "zh": "他对待每一项工作任务都非常认真负责。",
    "pinyin": "tā duìdài měi yī xiàng gōngzuò rènwù dōu fēicháng rènzhēn fùzé",
    "vi": "Anh ấy đối với mỗi một nhiệm vụ công việc đều vô cùng nghiêm túc trách nhiệm.",
    "en": "He handles every work task with great seriousness and responsibility.",
    "ja": "彼は一つひとつの業務に対して非常に真摯で責任感を持って取り組みます。"
  },
  {
    "zh": "团队的凝聚力是战胜各种困难的坚实保障。",
    "pinyin": "tuánduì de níngjùlì shì zhànshèng gè zhǒng kùnnan de jiānshí bǎozhàng",
    "vi": "Sức mạnh gắn kết của tập thể là sự bảo đảm vững chắc để chiến thắng mọi gian khó.",
    "en": "Team cohesion is a solid guarantee for overcoming various difficulties.",
    "ja": "チームの結束力こそが、あらゆる困難に打ち勝つ堅実な保障です。"
  },
  {
    "zh": "在日新月异的科技时代，我们要不断更新专业技能。",
    "pinyin": "zài rìxīnyuèyì de kējì shídài, wǒmen yào bùduàn gēngxīn zhuānyè jìnéng",
    "vi": "Trong thời đại công nghệ thay đổi từng ngày, chúng ta cần không ngừng cập nhật kỹ năng chuyên môn.",
    "en": "In an era of rapid technological progress, we must constantly update our professional skills.",
    "ja": "日進月歩の科学技術の時代において、専門スキルを絶えず更新し続ける必要があります。"
  },
  {
    "zh": "这份详尽的市场报告为后续决策提供了可靠依据。",
    "pinyin": "zhè fèn xiángjìn de shìchǎng bàogào wèi hòuxù juécè tígōngle kěkào yījù",
    "vi": "Bản báo cáo thị trường chi tiết này đã cung cấp căn cứ đáng tin cậy cho các quyết sách tiếp theo.",
    "en": "This detailed market report provides reliable basis for subsequent decisions.",
    "ja": "この詳細な市場レポートは、今後の意思決定に信頼できる根拠を提供しました。"
  },
  {
    "zh": "这家饭馆的川菜非常正宗，辣得很过瘾。",
    "pinyin": "zhè jiā fànguǎn de chuāncài fēicháng zhèngzhōng, là de hěn guòyǐn",
    "vi": "Món Tứ Xuyên của quán ăn này rất chuẩn vị, cay vô cùng đã miệng.",
    "en": "The Sichuan cuisine at this restaurant is very authentic and satisfyingly spicy.",
    "ja": "このレストランの四川料理はとても本場の味で、辛くて大満足です。"
  },
  {
    "zh": "服务员，请给我们拿一份菜单和两杯温水。",
    "pinyin": "fúwùyuán, qǐng gěi wǒmen ná yī fèn càidān hé liǎng bēi wēnshuǐ",
    "vi": "Phục vụ ơi, làm ơn lấy cho chúng tôi một thực đơn và hai cốc nước ấm.",
    "en": "Waiter, please bring us a menu and two glasses of warm water.",
    "ja": "店員さん、メニューを1部と温かいお水を2杯持ってきてください。"
  },
  {
    "zh": "中国饮食文化博大精深，讲究色香味俱全。",
    "pinyin": "zhōngguó yǐnshí wénhuà bódà-jīngshēn, jiǎngjiu sè xiāng wèi jù quán",
    "vi": "Văn hóa ẩm thực Trung Hoa uyên thâm quảng đại, chú trọng sắc hương vị vẹn toàn.",
    "en": "Chinese food culture is profound, emphasizing color, aroma, and taste together.",
    "ja": "中国の食文化は奥深く、色・香り・味の三拍子が揃っていることを重視します。"
  },
  {
    "zh": "这道红烧牛肉色泽红亮，入口软烂鲜香。",
    "pinyin": "zhè dào hóngshāo niúròu sèzé hóngliàng, rùkǒu ruǎnlàn xiānxiāng",
    "vi": "Món bò kho này màu sắc đỏ tươi bóng bẩy, đưa vào miệng mềm nhừ thơm phức.",
    "en": "This braised beef is beautifully glazed and melts tenderly in the mouth.",
    "ja": "この牛肉の醤油煮込みは色鮮やかで、口に入れると柔らかく旨味が広がります。"
  },
  {
    "zh": "医生建议我们平时要少油少盐，清淡饮食。",
    "pinyin": "yīshēng jiànyì wǒmen píngshí yào shǎo yóu shǎo yán, qīngdàn yǐnshí",
    "vi": "Bác sĩ khuyên chúng ta ngày thường nên ít dầu ít muối, ăn uống thanh đạm.",
    "en": "The doctor advises us to eat light meals with less oil and salt.",
    "ja": "医師は日頃から油や塩分を控え、あっさりした食事を心がけるよう勧めています。"
  },
  {
    "zh": "新鲜的水果和蔬菜对身体健康十分有益。",
    "pinyin": "xīnxiān de shuǐguǒ hé shūcài duì shēntǐ jiànkāng shífēn yǒuyì",
    "vi": "Trái cây và rau củ tươi mới vô cùng có lợi cho sức khỏe cơ thể.",
    "en": "Fresh fruits and vegetables are very beneficial to physical health.",
    "ja": "新鮮な果物や野菜は体の健康にとても有益です。"
  },
  {
    "zh": "他吃不了太辣的食物，点餐时特意叮嘱免辣。",
    "pinyin": "tā chī bù liǎo tài là de shíwù, diǎncān shí tèyì dīngzhǔ miǎn là",
    "vi": "Anh ấy không ăn được cay nhiều, khi gọi món đặc biệt dặn dò không cho ớt.",
    "en": "He can't eat very spicy food, so he asked for no chili when ordering.",
    "ja": "彼は辛すぎる食べ物が苦手なので、注文時に唐辛子抜きを念押ししました。"
  },
  {
    "zh": "朋友聚会的时候，大家围坐在一起吃火锅最热闹。",
    "pinyin": "péngyou jùhuì de shíhou, dàjiā wéizuò zài yīqǐ chī huǒguō zuì rènao",
    "vi": "Khi bạn bè tụ họp, mọi người ngồi quây quần ăn lẩu là rộn ràng nhất.",
    "en": "When friends gather, sitting together around a hotpot is the most lively.",
    "ja": "友人と集まる時、皆で鍋を囲んで食べるのが一番賑やかです。"
  },
  {
    "zh": "这家甜品店的面包口感松软，甜而不腻。",
    "pinyin": "zhè jiā tiánpǐndiàn de miànbāo kǒugǎn sōngruǎn, tián ér bù nì",
    "vi": "Bánh mì của tiệm đồ ngọt này kết cấu xốp mềm, ngọt thanh không ngấy.",
    "en": "The bread in this dessert shop has a soft texture, sweet yet not cloying.",
    "ja": "このスイーツ店のパンは食感がふんわり柔らかく、甘すぎず上品な味です。"
  },
  {
    "zh": "茶艺是中国传统文化的重要组成部分。",
    "pinyin": "cháyì shì zhōngguó chuántǒng wénhuà de zhòngyào zǔchéng bùfen",
    "vi": "Trà đạo là một bộ phận cấu thành quan trọng của văn hóa truyền thống Trung Hoa.",
    "en": "Tea art is an important component of traditional Chinese culture.",
    "ja": "茶芸は中国の伝統文化の極めて重要な構成要素です。"
  },
  {
    "zh": "饭后喝一杯热茶不仅消食解腻，还令人心旷神怡。",
    "pinyin": "fànhòu hē yī bēi rè chá bùjǐn xiāoshí jiěnì, hái lìngrén xīnkuàngshényí",
    "vi": "Sau bữa ăn uống một tách trà nóng không chỉ tiêu hóa giải ngấy mà còn khiến tâm hồn khoan khoái.",
    "en": "Drinking a cup of hot tea after meals aids digestion and refreshes the mind.",
    "ja": "食後に温かいお茶を飲むと、消化を助けるだけでなく心も爽快になります。"
  },
  {
    "zh": "服务员，结账！可以用手机微信支付吗？",
    "pinyin": "fúwùyuán, jiézhàng! Kěyǐ yòng shǒujī wēixìn zhīfù ma?",
    "vi": "Phục vụ ơi, tính tiền! Có thể thanh toán bằng WeChat trên điện thoại được không?",
    "en": "Waiter, the bill please! Can I pay with WeChat Pay on my phone?",
    "ja": "店員さん、お会計をお願いします！WeChat決済は使えますか？"
  },
  {
    "zh": "早餐一定要吃好，这样整天才有充沛的精力。",
    "pinyin": "zǎocān yīdìng yào chī hǎo, zhèyàng zhěng tiān cái yǒu chōngpèi de jīnglì",
    "vi": "Bữa sáng nhất định phải ăn thật tốt, như vậy cả ngày mới có năng lượng tràn trề.",
    "en": "One must eat a good breakfast to have abundant energy throughout the day.",
    "ja": "朝食はしっかり食べるべきです。そうすれば一日中エネルギーが充実します。"
  },
  {
    "zh": "这家餐馆环境优雅，非常适合商务宴请。",
    "pinyin": "zhè jiā cānguǎn huánjìng yōuyǎ, fēicháng shìhé shāngwù yànqǐng",
    "vi": "Môi trường nhà hàng này thanh lịch, rất phù hợp cho tiệc chiêu đãi thương mại.",
    "en": "This restaurant has an elegant atmosphere and is suitable for business dinners.",
    "ja": "このレストランは上品な雰囲気で、ビジネスの接待にとても適しています。"
  },
  {
    "zh": "妈妈煲的排骨莲藕汤味道浓郁，十分滋补。",
    "pinyin": "māma bāo de páigǔ lián'ǒu tāng wèidao nóngyù, shífēn zībǔ",
    "vi": "Món canh sườn hầm củ sen mẹ nấu vị đậm đà, vô cùng bổ dưỡng.",
    "en": "The pork rib and lotus root soup mother cooked is flavorful and very nourishing.",
    "ja": "母が煮込んだスペアリブと蓮根のスープは濃厚で、とても滋養があります。"
  },
  {
    "zh": "我们特意品尝了当地特色的传统小吃。",
    "pinyin": "wǒmen tèyì pǐnchángle dāngdì tèsè de chuántǒng xiǎochī",
    "vi": "Chúng tôi đã đặc biệt thưởng thức những món ăn vặt truyền thống mang nét đặc sắc địa phương.",
    "en": "We specially tasted the local specialty traditional snacks.",
    "ja": "私たちは地元の名物である伝統的な軽食を味わいました。"
  },
  {
    "zh": "保持合理的膳食营养结构是健康的基础。",
    "pinyin": "bǎochí hélǐ de shànshí yíngyǎng jiégòu shì jiànkāng de jīchǔ",
    "vi": "Duy trì cơ cấu dinh dưỡng bữa ăn hợp lý là nền tảng của sức khỏe.",
    "en": "Maintaining a reasonable dietary nutrition structure is fundamental to health.",
    "ja": "バランスの取れた栄養構造を保つことが健康の基盤です。"
  },
  {
    "zh": "面条煮得刚刚好，很有嚼劲，汤头也很鲜美。",
    "pinyin": "miàntiáo zhǔ de gānggāng hǎo, hěn yǒu jiáojìn, tāngtóu yě hěn xiānměi",
    "vi": "Mì nấu vừa tới, rất dai ngon, nước dùng cũng rất đậm đà.",
    "en": "The noodles are cooked just right, pleasantly chewy, and the broth is delicious.",
    "ja": "麺の茹で加減がちょうどよくコシがあり、スープも旨味たっぷりです。"
  },
  {
    "zh": "不管走到哪里，故乡的味道总是令人魂牵梦绕。",
    "pinyin": "bùguǎn zǒu dào nǎlǐ, gùxiāng de wèidao zǒngshì lìngrén húnqiānmèngrào",
    "vi": "Dù đi đến nơi đâu, hương vị quê nhà luôn khiến người ta tha thiết nhớ nhung.",
    "en": "No matter where you go, the taste of hometown always lingers in one's dreams.",
    "ja": "どこへ行こうとも、故郷の味は常に胸を締めつけるほど懐かしいものです。"
  },
  {
    "zh": "慢咽细嚼有助于食物消化，对肠胃更有好处。",
    "pinyin": "mànyàn-xìjiáo yǒuzhù yú shíwù xiāohuà, duì chángwèi gèng yǒu hǎochu",
    "vi": "Nhai kỹ nuốt chậm giúp ích cho tiêu hóa thức ăn, càng tốt hơn cho đường ruột dạ dày.",
    "en": "Chewing slowly aids food digestion and is much better for your stomach.",
    "ja": "よく噛んでゆっくり飲み込むことは消化を助け、胃腸に良い影響を与えます。"
  },
  {
    "zh": "读万卷书，行万里路，旅行能开阔胸襟。",
    "pinyin": "dú wàn juàn shū, xíng wàn lǐ lù, lǚxíng néng kāikuò xiōngjīn",
    "vi": "Đọc vạn cuốn sách, đi vạn dặm đường, du lịch có thể mở rộng tâm hồn.",
    "en": "Read ten thousand books and travel ten thousand miles; travel broadens the mind.",
    "ja": "万巻の書を読み、万里の道を行く。旅は心を広く豊かにしてくれます。"
  },
  {
    "zh": "中国的高铁四通八达，既快速又舒适。",
    "pinyin": "zhōngguó de gāotiě sìtōngbādá, jì kuàisù yòu shūshì",
    "vi": "Tàu cao tốc Trung Quốc đi muôn phương bốn hướng, vừa nhanh chóng lại êm ái tiện nghi.",
    "en": "China's high-speed rail extends in all directions, both fast and comfortable.",
    "ja": "中国の高速鉄道は四通八達で、スピードも速く乗り心地も快適です。"
  },
  {
    "zh": "请问去故宫博物院坐哪一路地铁最方便？",
    "pinyin": "qǐngwèn qù gùgōng bówùyuàn zuò nǎ yí lù dìtiě zuì fāngbiàn",
    "vi": "Xin hỏi đi viện bảo tàng Cố Cung thì ngồi tuyến tàu điện ngầm nào thuận tiện nhất?",
    "en": "Excuse me, which subway line is the most convenient to get to the Palace Museum?",
    "ja": "すみません、故宮博物院へ行くにはどの地下鉄路線が一番便利ですか？"
  },
  {
    "zh": "早高峰期间路上非常堵车，建议乘坐公共交通。",
    "pinyin": "zǎogāofēng qījiān lùshang fēicháng dǔchē, jiànyì chéngzuò gōnggòng jiāotōng",
    "vi": "Vào giờ cao điểm buổi sáng trên đường tắc xe nghiêm trọng, khuyên bạn nên đi phương tiện công cộng.",
    "en": "Traffic is very congested during morning peak hours; taking public transit is advised.",
    "ja": "朝のラッシュアワーは道路が大変混雑するため、公共交通機関の利用をお勧めします。"
  },
  {
    "zh": "我们提前在网上预订了风景区附近的酒店。",
    "pinyin": "wǒmen tíqián zài wǎngshàng yùdìngle fēngjǐngqū fùjìn de jiǔdiàn",
    "vi": "Chúng tôi đã đặt phòng trước trên mạng tại khách sạn gần khu danh lam thắng cảnh.",
    "en": "We booked a hotel near the scenic spot online in advance.",
    "ja": "私たちは事前にネットで観光地の近くにあるホテルを予約しました。"
  },
  {
    "zh": "这座历史悠久的古城保留了许多明清时期的古建筑。",
    "pinyin": "zhè zuò lìshǐ yōujiǔ de gǔchéng bǎoliúle xǔduō míng-qīng shíqī de gǔ jiànzhù",
    "vi": "Thành cổ lịch sử lâu đời này lưu giữ rất nhiều công trình cổ thời Minh Thanh.",
    "en": "This historic ancient town preserves many buildings from the Ming and Qing dynasties.",
    "ja": "この歴史ある古城には、明・清時代の古い建造物が数多く残されています。"
  },
  {
    "zh": "飞往上海的航班因为雷雨天气不得不延误两个小时。",
    "pinyin": "fēi wǎng shànghǎi de hángbān yīnwèi léiyǔ tiānqì bùdébù yánwù liǎng gè xiǎoshí",
    "vi": "Chuyến bay đến Thượng Hải vì thời tiết mưa bão nên đành phải hoãn lại hai tiếng.",
    "en": "The flight to Shanghai was delayed two hours due to thunderstorm weather.",
    "ja": "上海行きの便は雷雨のため、やむを得ず2時間遅延することになりました。"
  },
  {
    "zh": "登上海拔三千米的山顶，眼前的云海令人心旷神怡。",
    "pinyin": "dēng shàng hǎibá sānqiān mǐ de shāndǐng, yǎnqián de yúnhǎi lìngrén xīnkuàngshényí",
    "vi": "Trèo lên đỉnh núi cao ba nghìn mét so với mặt biển, biển mây trước mắt làm lòng người thư thái.",
    "en": "Climbing to the 3000-meter peak, the sea of clouds before our eyes was magnificent.",
    "ja": "標高3000メートルの山頂に登ると、目の前に広がる雲海に心が洗われました。"
  },
  {
    "zh": "出门旅行一定要保管好自己的身份证和护照。",
    "pinyin": "chūmén lǚxíng yīdìng yào bǎoguǎn hǎo zìjǐ de shēnfènzhèng hé hùzhào",
    "vi": "Khi ra ngoài du lịch nhất định phải cất giữ cẩn thận thẻ căn cước và hộ chiếu của mình.",
    "en": "When traveling, be sure to keep your ID card and passport safe.",
    "ja": "旅行に出かける際は、必ず身分証明書やパスポートを大切に保管してください。"
  },
  {
    "zh": "这座现代化的国际大都市处处充满着生机与活力。",
    "pinyin": "zhè zuò xiàndàihuà de guójì dà dūshì chùchù chōngmǎn zhe shēngjī yǔ huólì",
    "vi": "Đô thị quốc tế hiện đại hóa này đâu đâu cũng tràn ngập sức sống và sinh khí.",
    "en": "This modern international metropolis is bursting with vitality everywhere.",
    "ja": "この近代的な国際大都市は、いたるところに活気と生命力に満ち溢れています。"
  },
  {
    "zh": "我们租了一辆车，打算沿着海岸线自驾游。",
    "pinyin": "wǒmen zūle yī liàng chē, dǎsuàn yánzhe hǎi'ànxiàn zìjiàyóu",
    "vi": "Chúng tôi đã thuê một chiếc xe, dự định lái xe tự túc men theo đường bờ biển.",
    "en": "We rented a car and plan to take a road trip along the coastline.",
    "ja": "私たちはレンタカーを借りて、海岸線沿いをドライブ旅行する予定です。"
  },
  {
    "zh": "导游生动有趣的讲解让游客们更加了解当地风俗。",
    "pinyin": "dǎoyóu shēngdòng yǒuqù de jiǎngjiě ràng yóukèmen gèngjiā liǎojiě dāngdì fēngsú",
    "vi": "Lời thuyết minh sinh động thú vị của hướng dẫn viên giúp du khách hiểu hơn phong tục địa phương.",
    "en": "The tour guide's lively explanation helped tourists understand local customs better.",
    "ja": "ガイドの生き生きとした面白い説明により、観光客は地元の風習をより理解できました。"
  },
  {
    "zh": "在陌生城市迷路时，不要害怕向当地人问路。",
    "pinyin": "zài mòshēng chéngshì mílù shí, bùyào hàipà xiàng dāngdìrén wènlù",
    "vi": "Khi lạc đường ở thành phố xa lạ, đừng ngần ngại hỏi đường người địa phương.",
    "en": "When lost in an unfamiliar city, do not hesitate to ask locals for directions.",
    "ja": "見知らぬ街で道に迷ったときは、臆せず地元の人に道を尋ねてみましょう。"
  },
  {
    "zh": "西湖的日落美景如诗如画，吸引了海内外众多游客。",
    "pinyin": "xīhú de rìluò měijǐng rú shī rú huà, xīyǐnle hǎinèiwài zhòngduō yóukè",
    "vi": "Cảnh hoàng hôn Tây Hồ đẹp như thơ như họa, thu hút đông đảo du khách trong ngoài nước.",
    "en": "The sunset scenery of West Lake is picturesque, attracting many visitors worldwide.",
    "ja": "西湖の夕暮れの美しさは詩や絵画のようで、国内外から多くの観光客を魅了しています。"
  },
  {
    "zh": "过马路时一定要走斑马线，注意来往车辆。",
    "pinyin": "guò mǎlù shí yīdìng yào zǒu bānmǎxiàn, zhùyì láiwǎng chēliàng",
    "vi": "Khi qua đường nhất định phải đi vạch kẻ đường, chú ý xe cộ qua lại.",
    "en": "When crossing the road, always use the zebra crossing and watch for traffic.",
    "ja": "道路を横断する際は必ず横断歩道を渡り、往来する車に注意してください。"
  },
  {
    "zh": "现代城市的交通网络越来越智能化、便捷化。",
    "pinyin": "xiàndài chéngshì de jiāotōng wǎngluò yuèláiyuè zhìnénghuà, biànjiéhuà",
    "vi": "Mạng lưới giao thông của đô thị hiện đại ngày càng thông minh hóa và thuận tiện hóa.",
    "en": "Modern urban transportation networks are becoming increasingly smart and convenient.",
    "ja": "現代都市の交通ネットワークはますますスマートかつ便利になっています。"
  },
  {
    "zh": "旅途中的所见所闻丰富了我的阅历与见识。",
    "pinyin": "lǚtú zhōng de suǒjiàn suǒwén fēngfùle wǒ de yuèlì yǔ jiànshì",
    "vi": "Những điều trông thấy nghe thấy trong chuyến đi đã làm phong phú kinh nghiệm và hiểu biết của tôi.",
    "en": "What I saw and heard on the journey enriched my experience and insights.",
    "ja": "旅の中で見聞きした体験は、私の見識と人生経験を豊かにしてくれました。"
  },
  {
    "zh": "出发前请务必确认行李中没有携带违禁物品。",
    "pinyin": "chūfā qián qǐng wùbì quèrèn xíngli zhōng méiyǒu xiédài wéijìn wùpǐn",
    "vi": "Trước khi khởi hành xin hãy kiểm tra chắc chắn trong hành lý không mang theo đồ cấm.",
    "en": "Before departure, please make sure your luggage contains no prohibited items.",
    "ja": "出発前に、荷物の中に禁止物品が入っていないことを必ずご確認ください。"
  },
  {
    "zh": "骑自行车穿梭在胡同里，能够感受地道的市井气息。",
    "pinyin": "qí zìxíngchē chuānsuō zài hútòng lǐ, nénggòu gǎnshòu dìdao de shìjǐng qìxī",
    "vi": "Đạp xe đạp luồn lách trong các ngõ hẻm có thể cảm nhận hơi thở phố phường đậm nét.",
    "en": "Cycling through the hutongs lets you experience authentic local street life.",
    "ja": "自転車で胡同を走り抜けると、下町の情緒豊かな日常の息吹を感じることができます。"
  },
  {
    "zh": "旅行不仅是看风景，更是体验多元文化的奇妙历程。",
    "pinyin": "lǚxíng bùjǐn shì kàn fēngjǐng, gèng shì tǐyàn duōyuán wénhuà de qímiào lìchéng",
    "vi": "Du lịch không chỉ là ngắm phong cảnh mà còn là hành trình kỳ diệu trải nghiệm đa văn hóa.",
    "en": "Travel is not just sightseeing, but a wonderful journey of experiencing diverse cultures.",
    "ja": "旅は景色を眺めるだけでなく、多様な文化を体験する素晴らしいプロセスでもあります。"
  },
  {
    "zh": "听到这个令人振奋的好消息，大家都兴奋地跳了起来。",
    "pinyin": "tīngdào zhè gè lìngrén zhènfèn de hǎo xiāoxi, dàjiā dōu xīngfèn de tiào le qǐlái",
    "vi": "Nghe tin mừng đầy phấn khởi này, mọi người đều hưng phấn nhảy cẫng lên.",
    "en": "Hearing this exciting good news, everyone jumped up with joy.",
    "ja": "この胸躍る良い知らせを聞いて、皆は興奮して飛び跳ねました。"
  },
  {
    "zh": "他性格沉稳内敛，遇到急事从不慌张失措。",
    "pinyin": "tā xìnggé chénwěn nèiliǎn, yù dào jíshì cóngbù huāngzhāng shīcuò",
    "vi": "Tính cách anh ấy điềm đạm kín đáo, gặp việc gấp không bao giờ hoang mang lúng túng.",
    "en": "He is calm and reserved, never panicking when facing urgent situations.",
    "ja": "彼は落ち着いた控えめな性格で、急な事態に直面しても決して取り乱しません。"
  },
  {
    "zh": "朋友的理解与支持让她感到心里格外温暖。",
    "pinyin": "péngyou de lǐjiě yǔ zhīchí ràng tā gǎndào xīn lǐ géwài wēnnuǎn",
    "vi": "Sự thấu hiểu và ủng hộ của bạn bè khiến lòng cô cảm thấy đặc biệt ấm áp.",
    "en": "Her friend's understanding and support made her heart feel remarkably warm.",
    "ja": "友人の理解と励ましに、彼女の心はことのほか温まりました。"
  },
  {
    "zh": "面对别人的批评，我们要虚心听取，有则改之。",
    "pinyin": "miànduì biérén de pīpíng, wǒmen yào xūxīn tīngqǔ, yǒu zé gǎi zhī",
    "vi": "Trước lời phê bình của người khác, chúng ta nên khiêm tốn lắng nghe, có sai thì sửa.",
    "en": "When facing criticism, listen humbly and correct mistakes if any exist.",
    "ja": "他人からの批判に対しては謙虚に耳を傾け、改めるべき点があれば改めましょう。"
  },
  {
    "zh": "善良和真诚是人际交往中最宝贵的品质。",
    "pinyin": "shànliáng hé zhēnchéng shì rénjì jiāowǎng zhōng zuì bǎoguì de pǐnzhì",
    "vi": "Lương thiện và chân thành là phẩm chất đáng quý nhất trong giao tiếp giữa người với người.",
    "en": "Kindness and sincerity are the most precious qualities in interpersonal communication.",
    "ja": "優しさと誠実さは、人と人との交流において最もかけがえのない美徳です。"
  },
  {
    "zh": "他平时言语不多，但做起事来雷厉风行、很有魄力。",
    "pinyin": "tā píngshí yányǔ bù duō, dàn zuò qǐ shì lái léilìfēngxíng, hěn yǒu pòlì",
    "vi": "Anh ấy ngày thường ít nói nhưng khi làm việc thì dứt khoát quyết liệt, rất có bản lĩnh.",
    "en": "He speaks little normally, but takes decisive, vigorous action in doing things.",
    "ja": "彼は普段口数は少ないですが、仕事となると迅速果断で大きな気概を持っています。"
  },
  {
    "zh": "失去心爱的东西让人感到由衷的难过与失落。",
    "pinyin": "shīqù xīn'ài de dōngxi ràng rén gǎndào yóuzhōng de nánguò yǔ shīluò",
    "vi": "Mất đi món đồ thân yêu khiến người ta cảm thấy buồn bã và hụt hẫng tận đáy lòng.",
    "en": "Losing something you cherish makes you feel genuine sadness and loss.",
    "ja": "心から大切にしていたものを失うと、深い悲しみと喪失感を覚えるものです。"
  },
  {
    "zh": "保持积极乐观的心态能够战胜生活中的重重困难。",
    "pinyin": "bǎochí jījí lèguān de xīntài nénggòu zhànshèng shēnghuó zhōng de chóngchóng kùnnan",
    "vi": "Giữ tâm thế tích cực lạc quan có thể chiến thắng muôn trùng gian khó trong đời.",
    "en": "Maintaining a positive and optimistic mindset can overcome life's many difficulties.",
    "ja": "前向きで楽観的なメンタリティを保つことで、人生の幾重もの困難を乗り越えられます。"
  },
  {
    "zh": "他待人宽容大度，从来不因为小事斤斤计较。",
    "pinyin": "tā dài rén kuānróng dàdù, cónglái bù yīnwèi xiǎoshì jīnjīnjìjiào",
    "vi": "Anh ấy đối xử với người khác khoan dung độ lượng, chưa từng so đo tính toán vì chuyện nhỏ.",
    "en": "He is generous and forgiving, never haggling over trivial matters with others.",
    "ja": "彼は人に寛大で包容力があり、些細なことで細かく言い争うことが決してありません。"
  },
  {
    "zh": "看到孩子取得了好成绩，母亲脸上露出了欣慰的笑容。",
    "pinyin": "kàndào háizi qǔdéle hǎo chéngjì, mǔqīn liǎn shàng lùchūle xīnwèi de xiàoróng",
    "vi": "Thấy con đạt được thành tích tốt, trên mặt người mẹ nở nụ cười nhẹ nhõm an lòng.",
    "en": "Seeing the child achieve good grades, the mother smiled with relief.",
    "ja": "子供が良い成績を収めたのを見て、母親の顔に安堵の笑みがこぼれました。"
  },
  {
    "zh": "冲动的行为往往带来悔恨，遇事一定要三思而后行。",
    "pinyin": "chōngdòng de xíngwéi wǎngwǎng dàilái huǐhèn, yù shì yīdìng yào sānsī ér hòu xíng",
    "vi": "Hành vi bốc đồng thường mang lại hối hận, gặp việc nhất định phải suy nghĩ chín chắn rồi hãy làm.",
    "en": "Impulsive behavior often brings regret; always think twice before acting.",
    "ja": "衝動的な行為は往々にして後悔を招くため、何事も熟考して行動すべきです。"
  },
  {
    "zh": "她富有同情心，经常主动参加社区的志愿公益服务。",
    "pinyin": "tā fùyǒu tóngqíngxīn, jīngcháng zhǔdòng cānjiā shèqū de zhìyuàn gōngyì fúwù",
    "vi": "Cô ấy giàu lòng trắc ẩn, thường xuyên chủ động tham gia dịch vụ công ích tình nguyện ở khu dân cư.",
    "en": "She is compassionate and often takes part in community volunteer services.",
    "ja": "彼女は思いやり深く、地域社会のボランティア活動に頻繁に参加しています。"
  },
  {
    "zh": "面对强劲的竞争对手，他依然保持着十足的自信。",
    "pinyin": "miànduì qiángjìng de jìngzhēng duìshǒu, tā yīrán bǎochí zhe shízú de zìxìn",
    "vi": "Đối diện với đối thủ cạnh tranh đáng gờm, anh ấy vẫn giữ trọn sự tự tin.",
    "en": "Facing a strong competitor, he still maintained complete self-confidence.",
    "ja": "強力な競争相手を前にしても、彼は依然として満ち足りた自信を保っています。"
  },
  {
    "zh": "追求理想需要立足现实，一步一个脚印才能走得更远。",
    "pinyin": "zhuīqiú lǐxiǎng xūyào lìzú xiànshí, yībù yī gè jiǎoyìn cáinéng zǒu de gèng yuǎn",
    "vi": "Theo đuổi lý tưởng cần bám sát thực tế, vững chắc từng bước chân mới đi được xa hơn.",
    "en": "Pursuing ideals requires grounding in reality; step by step leads further.",
    "ja": "理想を追求するには現実に立脚する必要があり、一歩一歩着実に歩んでこそ遠くへ行けます。"
  },
  {
    "zh": "他是个幽默风趣的人，总能给身边的人带来欢声笑语。",
    "pinyin": "tā shì gè yōumò fēngqù de rén, zǒng néng gěi shēnbiān de rén dàilái huānshēng xiàoyǔ",
    "vi": "Anh ấy là người hài hước dí dỏm, luôn mang lại tiếng cười cho người bên cạnh.",
    "en": "He is humorous and witty, always bringing laughter to people around him.",
    "ja": "彼はユーモアに富んだ人物で、周囲の人々にいつも笑いと喜びをもたらしてくれます。"
  },
  {
    "zh": "学会倾听他人的心声是建立深厚感情的关键所在。",
    "pinyin": "xuéhuì qīngtīng tārén de xīnshēng shì jiànlì shēnhòu gǎnqíng de guānjiàn suǒzài",
    "vi": "Học cách lắng nghe tiếng lòng của người khác là mấu chốt gây dựng tình cảm sâu đậm.",
    "en": "Learning to listen to others' voices is the key to building deep affection.",
    "ja": "他人の心の声に耳を傾けることを学ぶことが、深い信頼関係を築く鍵です。"
  },
  {
    "zh": "嫉妒只会让人迷失自我，欣赏别人才能共同进步。",
    "pinyin": "jídù zhǐ huì ràng rén míshī zìwǒ, xīnshǎng biérén cáinéng gòngtóng jìnbù",
    "vi": "Ghen ghét chỉ khiến con người đánh mất bản thân, biết trân trọng người khác mới cùng tiến bộ.",
    "en": "Jealousy only makes people lose themselves; appreciating others fosters shared growth.",
    "ja": "嫉妬は自分を見失わせるだけです。他人を称賛してこそ共に成長できます。"
  },
  {
    "zh": "他做事情一丝不苟，对细节的把控非常严格。",
    "pinyin": "tā zuò shìqing yīsībùgǒu, duì xìjié de bǎkòng fēicháng yángé",
    "vi": "Anh ấy làm việc tỉ mỉ từng li từng tí, kiểm soát chi tiết vô cùng nghiêm ngặt.",
    "en": "He is meticulous in everything he does and very strict about details.",
    "ja": "彼は何事にも細心の注意を払い、ディテールへの配慮が非常に厳格です。"
  },
  {
    "zh": "感恩之心能让我们在平淡的生活中发现美好。",
    "pinyin": "gǎn'ēn zhī xīn néng ràng wǒmen zài píngdàn de shēnghuó zhōng fāxiàn měihǎo",
    "vi": "Lòng biết ơn có thể giúp chúng ta phát hiện nét đẹp trong cuộc sống bình dị.",
    "en": "A grateful heart enables us to discover beauty in everyday ordinary life.",
    "ja": "感謝の心を持つことで、ありふれた日常の中にある美しさを見出すことができます。"
  },
  {
    "zh": "坚强的意志力能够帮助我们抵御外界的各种诱惑。",
    "pinyin": "jiānqiáng de yìzhìlì nénggòu bāngzhù wǒmen dǐyù wàijiè de gè zhǒng yòuhuò",
    "vi": "Ý chí kiên cường có thể giúp chúng ta chống lại muôn vàn cám dỗ bên ngoài.",
    "en": "Strong willpower can help us resist all kinds of external temptations.",
    "ja": "強固な意志の力は、外界の様々な誘惑に打ち勝つ手助けとなります。"
  },
  {
    "zh": "他性情急躁，常常话还没听完就急于下结论。",
    "pinyin": "tā xìngqíng jízào, chángcháng huà hái méi tīng wán jiù jíyú xià jiélùn",
    "vi": "Tính khí anh ấy nóng vội, thường chưa nghe hết câu đã vội vàng kết luận.",
    "en": "He is impatient and often jumps to conclusions before hearing people out.",
    "ja": "彼は短気な性格で、話を最後まで聞き終わらないうちに結論を出してしまいがちです。"
  },
  {
    "zh": "保持平和的心态是应对生活波折的最高境界。",
    "pinyin": "bǎochí pínghé de xīntài shì yìngduì shēnghuó bōzhé de zuì gāo jìngjiè",
    "vi": "Giữ tâm thái an hòa là cảnh giới cao nhất khi ứng phó với sóng gió cuộc đời.",
    "en": "Keeping a peaceful mindset is the highest state in facing life's twists and turns.",
    "ja": "穏やかな精神状態を保つことは、人生の紆余曲折に対処する上での最高の境地です。"
  },
  {
    "zh": "面对突如其来的变故，全家人表现出了极大的坚韧。",
    "pinyin": "miànduì tūrúqílái de biàngù, quánjiā rén biǎoxiàn chūle jí dà de jiānrèn",
    "vi": "Trước biến cố ập đến bất ngờ, cả gia đình đã thể hiện sự kiên cường to lớn.",
    "en": "In the face of unexpected turns, the whole family showed great resilience.",
    "ja": "突然の異変に直面しても、家族全員が極めて強い粘り強さを発揮しました。"
  },
  {
    "zh": "自律是获得自由的必经之路，克制欲望才能掌控人生。",
    "pinyin": "zìlǜ shì huòdé zìyóu de bì jīng zhī lù, kèzhì yùwàng cáinéng zhǎngkòng rénshēng",
    "vi": "Tự giác kỷ luật là con đường tất yếu để đạt tự do, kiềm chế dục vọng mới làm chủ cuộc đời.",
    "en": "Self-discipline is the only way to freedom; curbing desires controls life.",
    "ja": "自律こそが真の自由を得る必須の道であり、欲望を抑えてこそ人生を操れます。"
  },
  {
    "zh": "无论身处何种境遇，都要守住内心的纯洁与良知。",
    "pinyin": "wúlùn shēn chǔ hé zhǒng jìngyù, dōu yào shǒuzhù nèixīn de chúnjié yǔ liángzhī",
    "vi": "Cho dù rơi vào hoàn cảnh nào cũng phải giữ vẹn sự trong sạch và lương tri trong tim.",
    "en": "No matter what circumstance you are in, guard inner purity and conscience.",
    "ja": "どのような境遇にあろうとも、心の純粋さと良知を守り続けねばなりません。"
  },
  {
    "zh": "春暖花开，万物复苏，公园里到处都是踏青的人们。",
    "pinyin": "chūn nuǎn huā kāi, wànwù fùsū, gōngyuán lǐ dàochù dōu shì tàqīng de rénmen",
    "vi": "Xuân ấm hoa nở, muôn vật hồi sinh, trong công viên đâu đâu cũng là người đi du xuân.",
    "en": "Spring warmth blooms flowers and revives nature; people are everywhere in parks.",
    "ja": "春が暖かく花が咲き誇り、公園は春のピクニックを楽しむ人々で賑わっています。"
  },
  {
    "zh": "今天晴空万里，微风拂面，非常适合去户外野餐。",
    "pinyin": "jīntiān qíngkōng wànlǐ, wēifēng fú miàn, fēicháng shìhé qù hùwài yěcān",
    "vi": "Hôm nay trời trong xanh vạn dặm, gió nhẹ mơn man, rất thích hợp đi dã ngoại ngoài trời.",
    "en": "Today has clear skies and a gentle breeze, perfect for an outdoor picnic.",
    "ja": "今日は抜けるような青空で心地よい微風が吹き、ピクニックに最適です。"
  },
  {
    "zh": "夏天雷雨来势汹汹，出门前千万别忘了带伞。",
    "pinyin": "xiàtiān léiyǔ láishì xiōngxiōng, chūmén qián qiānwàn bié wàngle dài sǎn",
    "vi": "Cơn giông mùa hè ập đến hung hãn, trước khi ra ngoài tuyệt đối chớ quên mang ô.",
    "en": "Summer thunderstorms arrive fiercely; never forget an umbrella before leaving.",
    "ja": "夏の雷雨は急に激しくなるので、外出前には必ず傘を忘れずに持ってください。"
  },
  {
    "zh": "秋天金风送爽，漫山遍野的红叶层林尽染。",
    "pinyin": "qiūtiān jīnfēng sòng shuǎng, mànshānbiànyě de hóngyè cénglín jìnrǎn",
    "vi": "Mùa thu gió vàng mang hơi mát, lá đỏ khắp đồi núi nhuộm đỏ cả rừng cây.",
    "en": "Autumn breezes bring coolness, with red leaves carpeting hills in rich hues.",
    "ja": "秋の心地よい風が爽やかさを運び、山々一面の紅葉が美しく色づいています。"
  },
  {
    "zh": "冬天北风呼啸，一场纷纷扬扬的大雪覆盖了整座城市。",
    "pinyin": "dōngtiān běifēng hūxiào, yī cháng fēnfēnyángyáng de dà xuě fùgàile zhěng zuò chéngshì",
    "vi": "Mùa đông gió bấc gầm rít, một trận tuyết lớn rợp trời bao phủ cả thành phố.",
    "en": "Winter north wind howled as heavy snow blanketing the entire city fell softly.",
    "ja": "冬の北風が吹きすさび、舞い散る大雪が街全体を白く覆い尽くしました。"
  },
  {
    "zh": "保护生态环境就是守护我们共同生存的地球家园。",
    "pinyin": "bǎohù shēngtài huánjìng jiùshì shǒuhù wǒmen gòngtóng shēngcún de dìqiú jiāyuán",
    "vi": "Bảo vệ môi trường sinh thái chính là gìn giữ mái nhà Trái Đất cùng chung sống.",
    "en": "Protecting ecological environment is safeguarding the Earth home we all share.",
    "ja": "生態環境を守ることは、私たちが共に生きる地球という故郷を守ることです。"
  },
  {
    "zh": "气象台发布了高温橙色预警，市民应做好防暑措施。",
    "pinyin": "qìxiàngtái fābùle gāowēn chéngsè yùjǐng, shìmín yīng zuò hǎo fángshǔ cuòshī",
    "vi": "Đài khí tượng đã phát đi cảnh báo màu cam về nhiệt độ cao, người dân nên phòng chống say nắng.",
    "en": "The observatory issued an orange high-temperature alert; take heatstroke precautions.",
    "ja": "気象台が高温オレンジ警報を発令しました。熱中症対策を万全にしてください。"
  },
  {
    "zh": "清晨的露珠在绿叶上晶莹剔透，显得分外生动。",
    "pinyin": "qīngchén de lùzhū zài lǜyè shàng jīngyíngtītòu, xiǎnde fènwài shēngdòng",
    "vi": "Những giọt sương sớm long lanh trong suốt trên phiến lá xanh, trông vô cùng sống động.",
    "en": "Morning dew drops glisten crystal clear on green leaves, appearing vividly alive.",
    "ja": "早朝の露が緑の葉の上で透き通るように輝き、ひときわ生き生きと見えます。"
  },
  {
    "zh": "绿水青山就是金山银山，我们要坚定走绿色发展之路。",
    "pinyin": "lǜ shuǐ qīng shān jiùshì jīnshān yínshān, wǒmen yào jiāndìng zǒu lǜsè fāzhǎn zhī lù",
    "vi": "Nước biếc non xanh chính là núi vàng núi bạc, chúng ta phải kiên định đi theo con đường phát triển xanh.",
    "en": "Lucid waters and lush mountains are invaluable assets; stick to green development.",
    "ja": "緑豊かな山水こそが金山銀山であり、私たちは環境重視の発展を歩むべきです。"
  },
  {
    "zh": "随着全球气候变暖，极端恶劣天气事件愈发频繁。",
    "pinyin": "suízhe quánqiú qìhòu biàn nuǎn, jíduān èliè tiānqì shìjiàn yùfā pínfán",
    "vi": "Cùng với sự nóng lên của khí hậu toàn cầu, các sự kiện thời tiết cực đoan ngày càng xuất hiện thường xuyên.",
    "en": "With global warming, extreme weather events are becoming more frequent.",
    "ja": "地球温暖化に伴い、異常気象による災害がますます頻繁に発生しています。"
  },
  {
    "zh": "漫步在宁静的湖畔，水波微漾，倒映着蓝天白云。",
    "pinyin": "mànbù zài níngjìng de húpàn, shuǐbō wēiyàng, dàoyìng zhe lántiān báiyún",
    "vi": "Dạo bước bên bờ hồ tĩnh lặng, sóng nước lăn tăn, soi bóng trời xanh mây trắng.",
    "en": "Strolling by the tranquil lake, gentle ripples reflect blue sky and white clouds.",
    "ja": "静かな湖畔を散歩すると、穏やかなさざ波に青空と白い雲が映し出されます。"
  },
  {
    "zh": "植树造林不仅能防风固沙，还能有效改善空气质量。",
    "pinyin": "zhíshù zàolín bùjǐn néng fángfēng gùshā, hái néng yǒuxiào gǎishàn kōngqì zhìliàng",
    "vi": "Trồng cây gây rừng không chỉ chắn gió giữ cát mà còn cải thiện chất lượng không khí hiệu quả.",
    "en": "Afforestation not only prevents sandstorms, but also improves air quality.",
    "ja": "植林活動は防風・土壌保全だけでなく、大気質の改善にも大いに役立ちます。"
  },
  {
    "zh": "傍晚的夕阳将整片天际染成了一片绚丽的火红。",
    "pinyin": "bàngwǎn de xīyáng jiāng zhěng piàn tiānjì rǎnchéngle yī piàn xuànlì de huǒhóng",
    "vi": "Mặt trời lặn buổi xế chiều nhuộm cả chân trời thành một màu đỏ rực rỡ tuyệt mỹ.",
    "en": "The evening setting sun dyed the entire horizon into a magnificent blazing red.",
    "ja": "夕暮れの太陽が地平線全体を鮮やかな茜色に美しく染め上げました。"
  },
  {
    "zh": "大自然是人类最博大的老师，教会我们敬畏与谦卑。",
    "pinyin": "dàzìrán shì rénlèi zuì bódà de lǎoshī, jiàohuì wǒmen jìngwèi yǔ qiānbēi",
    "vi": "Mẹ thiên nhiên là người thầy vĩ đại nhất của nhân loại, dạy chúng ta sự kính cẩn và khiêm nhường.",
    "en": "Nature is mankind's greatest teacher, imparting awe and humility.",
    "ja": "大自然は人類にとって最大の師であり、私たちに畏敬と謙虚さを教えてくれます。"
  },
  {
    "zh": "夜幕降临，繁星点缀着静谧深邃的浩瀚夜空。",
    "pinyin": "yèmù jiànglín, fánxīng diǎnzhuì zhe jìngmì shēnsuì de hàohàn yèkōng",
    "vi": "Màn đêm buông xuống, ngàn vì sao điểm xuyết bầu trời đêm bao la tĩnh lặng sâu thẳm.",
    "en": "As night falls, numerous stars dot the tranquil, deep, and vast night sky.",
    "ja": "夜の帳が下りると、無数の星が静寂で奥深い広大な夜空を彩りました。"
  },
  {
    "zh": "身体是革命的本钱，拥有健康才有一切可能。",
    "pinyin": "shēntǐ shì gémìng de běnqián, yōngyǒu jiànkāng cái yǒu yīqiè kěnéng",
    "vi": "Sức khỏe là vốn quý nhất, có sức khỏe mới có mọi khả năng.",
    "en": "Health is the capital of revolution; only with health is anything possible.",
    "ja": "体は資本であり、健康であってこそ初めてあらゆる可能性が開かれます。"
  },
  {
    "zh": "坚持规律的体育锻炼能够增强体质，提高免疫力。",
    "pinyin": "jiānchí guīlǜ de tǐyù duànliàn nénggòu zēngqiáng tǐzhì, tígāo miǎnyìlì",
    "vi": "Kiên trì rèn luyện thể thao điều độ có thể tăng cường thể chất, nâng cao hệ miễn dịch.",
    "en": "Regular physical exercise can strengthen physique and improve immunity.",
    "ja": "規則正しい運動を続けることは体力をつけ、免疫力を高めることができます。"
  },
  {
    "zh": "最近气温变化剧烈，很多人不慎患上了重感冒。",
    "pinyin": "zuìjìn qìwēn biànhuà jùliè, hěn duō rén bùshèn huànshàngle zhòng gǎnmào",
    "vi": "Dạo này nhiệt độ thay đổi dữ dội, rất nhiều người không cẩn thận đã bị cảm lạnh nặng.",
    "en": "Recent sharp temperature swings caused many people to catch heavy colds.",
    "ja": "最近の気温の急激な変化により、多くの人が重い風邪を引いてしまいました。"
  },
  {
    "zh": "医生叮嘱他一定要按时吃药，并注意充分休息。",
    "pinyin": "yīshēng dīngzhǔ tā yīdìng yào ànshí chīyào, bìng zhùyì chōngfèn xiūxi",
    "vi": "Bác sĩ dặn dò anh ấy nhất định phải uống thuốc đúng giờ và chú ý nghỉ ngơi đầy đủ.",
    "en": "The doctor instructed him to take medication on time and rest adequately.",
    "ja": "医師は彼に薬を時間通りに服用し、十分な休養を取るよう指示しました。"
  },
  {
    "zh": "长期熬夜容易导致记忆力减退和内分泌失调。",
    "pinyin": "chángqī áoyè róngyì dǎozhì jìyìlì jiǎntuì hé nèifēnmì shītiáo",
    "vi": "Thức đêm lâu ngày dễ dẫn đến suy giảm trí nhớ và rối loạn nội tiết.",
    "en": "Staying up late long-term causes memory decline and endocrine disorders.",
    "ja": "長期にわたる夜更かしは記憶力の減退やホルモンバランスの乱れを引き起こします。"
  },
  {
    "zh": "每年进行一次全面的身体检查是对自己负责的表现。",
    "pinyin": "měinián jìnxíng yī cì quánmiàn de shēntǐ jiǎnchá shì duì zìjǐ fùzé de biǎoxiàn",
    "vi": "Mỗi năm tiến hành kiểm tra sức khỏe tổng quát một lần là biểu hiện có trách nhiệm với bản thân.",
    "en": "Having an annual comprehensive physical exam shows responsibility to oneself.",
    "ja": "年に一度の総合健康診断を受けることは、自分に対する責任の表れです。"
  },
  {
    "zh": "充足的睡眠是恢复体力和保持清醒头脑的前提。",
    "pinyin": "chōngzú de shuìmián shì huìfù tǐlì hé bǎochí qīngxǐng tóunǎo de qiántí",
    "vi": "Giấc ngủ đầy đủ là tiền đề để phục hồi thể lực và giữ cho đầu óc tỉnh táo.",
    "en": "Sufficient sleep is the prerequisite for restoring energy and keeping a clear head.",
    "ja": "十分な睡眠をとることは、体力を回復し明晰な頭脳を維持する前提条件です。"
  },
  {
    "zh": "心理健康和生理健康同样重要，不可顾此失彼。",
    "pinyin": "xīnlǐ jiànkāng hé shēnglǐ jiànkāng tóngyàng zhòngyào, bùkě gùcǐshībǐ",
    "vi": "Sức khỏe tâm lý và sức khỏe sinh lý đều quan trọng như nhau, không thể xem nhẹ bên nào.",
    "en": "Mental health is just as important as physical health; neither can be neglected.",
    "ja": "心の健康と身体の健康は同様に重要であり、どちらをおろそかにしてもいけません。"
  },
  {
    "zh": "长时间对着电脑工作要注意定时活动筋骨、放松眼睛。",
    "pinyin": "cháng shíjiān duì zhe diànnǎo gōngzuò yào zhùyì dìngshí huódòng jīngǔ, fàngsōng yǎnjing",
    "vi": "Làm việc với máy tính thời gian dài cần chú ý cử động gân cốt và thư giãn mắt định kỳ.",
    "en": "Working on computers for long periods requires regular stretching and resting eyes.",
    "ja": "長時間パソコン作業をする際は、適度に体を動かし目を休ませる必要があります。"
  },
  {
    "zh": "良好的卫生习惯能够有效切断细菌和病毒的传播。",
    "pinyin": "liánghǎo de wèishēng xíguàn nénggòu yǒuxiào qiēduàn xìjūn hé bìngdú de chuánbō",
    "vi": "Thói quen vệ sinh tốt có thể ngăn chặn hiệu quả sự lây lan của vi khuẩn và virus.",
    "en": "Good hygienic habits can effectively block the spread of bacteria and viruses.",
    "ja": "良好な衛生習慣は、細菌やウイルスの感染経路を効果的に遮断できます。"
  },
  {
    "zh": "适当的深呼吸和慢跑是缓解心理压力的有效方法。",
    "pinyin": "shìdàng de shēnhūxī hé mànpǎo shì huǎnjiě xīnlǐ yālì de yǒuxiào fāngfǎ",
    "vi": "Hít thở sâu và chạy bộ vừa phải là phương pháp hữu hiệu giúp giải tỏa căng thẳng tâm lý.",
    "en": "Deep breathing and jogging are effective ways to relieve psychological stress.",
    "ja": "深呼吸や適度なジョギングは、精神的なストレスを和らげる効果的な方法です。"
  },
  {
    "zh": "他因为急性胃炎住进了医院，需要住院静养几天。",
    "pinyin": "tā yīnwèi jíxìng wèiyán zhù jìnle yīyuàn, xūyào zhùyuàn jìngyǎng jǐ tiān",
    "vi": "Anh ấy nhập viện vì viêm dạ dày cấp tính, cần nằm viện tịnh dưỡng vài ngày.",
    "en": "He was hospitalized for acute gastritis and needs to recuperate for a few days.",
    "ja": "彼は急性胃炎で入院し、数日間安静にして治療を受ける必要があります。"
  },
  {
    "zh": "保持乐观开朗的心情是预防各种慢性疾病的良药。",
    "pinyin": "bǎochí lèguān kāilǎng de xīnqíng shì yùfáng gè zhǒng mànxìng jíbìng de liángyào",
    "vi": "Giữ tâm trạng lạc quan cởi mở là phương thuốc tốt để phòng ngừa các bệnh mãn tính.",
    "en": "Staying optimistic and cheerful is good medicine for preventing chronic diseases.",
    "ja": "楽観的で明るい気分を保つことは、各種の慢性疾患を予防する良薬です。"
  },
  {
    "zh": "戒烟限酒对保护心脑血管健康至关重要。",
    "pinyin": "jièyān xiànjiǔ duì bǎohù xīn-nǎoxiěguān jiànkāng zhìguān zhòngyào",
    "vi": "Bỏ thuốc lá hạn chế rượu bia có ý nghĩa sống còn để bảo vệ sức khỏe tim mạch não bộ.",
    "en": "Quitting smoking and limiting alcohol are crucial for cardiovascular health.",
    "ja": "禁煙と節酒は、心血管や脳血管の健康を守るために極めて重要です。"
  },
  {
    "zh": "劳逸结合才能保持充沛的工作干劲和生活热情。",
    "pinyin": "láoyì jiéhé cáinéng bǎochí chōngpèi de gōngzuò gànjìn hé shēnghuó rèqíng",
    "vi": "Làm việc kết hợp nghỉ ngơi mới duy trì được nhiệt huyết công việc và tình yêu cuộc sống.",
    "en": "Balancing work and rest maintains energetic drive and enthusiasm for life.",
    "ja": "労働と休息をバランスよく調和させてこそ、意欲と情熱を保ち続けることができます。"
  },
  {
    "zh": "他每天早晨坚持喝一杯温开水以促进新陈代谢。",
    "pinyin": "tā měitiān zǎochén jiānchí hē yī bēi wēn kāishuǐ yǐ cùjìn xīnchéndàixiè",
    "vi": "Mỗi sáng anh ấy đều kiên trì uống một cốc nước ấm đun sôi để thúc đẩy trao đổi chất.",
    "en": "He drinks a cup of warm water every morning to promote metabolism.",
    "ja": "彼は代謝を促すため、毎朝コップ一杯の白湯を飲むことを日課にしています。"
  },
  {
    "zh": "如果感到身体不适，应尽快前往医院就诊。",
    "pinyin": "rúguǒ gǎndào shēntǐ bùshì, yīng jǐnkuài qiánwǎng yīyuàn jiùzhěn",
    "vi": "Nếu cảm thấy cơ thể khó chịu bất an, nên đến bệnh viện khám chữa càng sớm càng tốt.",
    "en": "If you feel unwell, you should go to the hospital for consultation as soon as possible.",
    "ja": "体の不調を感じた場合は、できるだけ早く病院を受診すべきです。"
  },
  {
    "zh": "均衡摄入蛋白质、维生素与矿物质有益于身体机能。",
    "pinyin": "jūnhéng shèrù dànbáizhì, wéishēngsù yǔ kuàngwùzhì yǒuyì yú shēntǐ jīnéng",
    "vi": "Hấp thụ cân đối protein, vitamin và khoáng chất có lợi cho chức năng cơ thể.",
    "en": "Balanced intake of protein, vitamins, and minerals benefits bodily functions.",
    "ja": "タンパク質、ビタミン、ミネラルをバランスよく摂取することは体に有益です。"
  },
  {
    "zh": "经常参加户外活动有助于儿童骨骼和视力的健康发育。",
    "pinyin": "jīngcháng cānjiā hùwài huódòng yǒuzhù yú értóng gǔgé hé shìlì de jiànkāng fāyù",
    "vi": "Thường xuyên tham gia hoạt động ngoài trời giúp xương khớp và thị lực của trẻ phát triển khỏe mạnh.",
    "en": "Outdoor activities contribute to healthy bone and vision development in children.",
    "ja": "戸外での活動は、子供の骨格や視力の健全な発育を大いに助けます。"
  },
  {
    "zh": "良好的坐姿不仅保护脊椎，还能有效防止肌肉劳损。",
    "pinyin": "liánghǎo de zuòzī bùjǐn bǎohù jǐzhuī, hái néng yǒuxiào fángzhǐ jīròu láosǔn",
    "vi": "Tư thế ngồi đúng không chỉ bảo vệ cột sống mà còn ngăn ngừa đau mỏi cơ bắp hiệu quả.",
    "en": "Good sitting posture protects the spine and effectively prevents muscle strain.",
    "ja": "正しい座り姿勢は背骨を守るだけでなく、筋肉の疲労を防ぐのにも役立ちます。"
  },
  {
    "zh": "移动支付在中国的普及程度非常高，出门带手机就行。",
    "pinyin": "yídòng zhīfù zài zhōngguó de pǔjí chéngdù fēicháng gāo, chūmén dài shǒujī jiù xíng",
    "vi": "Thanh toán di động ở Trung Quốc vô cùng phổ biến, ra ngoài chỉ cần mang điện thoại là được.",
    "en": "Mobile payment is extremely widespread in China; just taking your phone suffices.",
    "ja": "中国ではモバイル決済が非常に普及しており、スマホさえあれば外出できます。"
  },
  {
    "zh": "这款笔记本电脑性价比很高，特别受大学生欢迎。",
    "pinyin": "zhè kuǎn bǐjìběn diànnǎo xìngjiàbǐ hěn gāo, tèbié shòu dàxuéshēng huānyíng",
    "vi": "Mẫu máy tính xách tay này tỷ số hiệu năng trên giá thành rất cao, đặc biệt được sinh viên ưa chuộng.",
    "en": "This laptop has a high cost-performance ratio and is popular among students.",
    "ja": "このノートパソコンはコスパが非常に高く、特に大学生の間で大人気です。"
  },
  {
    "zh": "商场正在举办周年庆典促销活动，部分商品打五折。",
    "pinyin": "shāngchǎng zhèngzài jǔbàn zhōunián qìngdiǎn cùxiāo huódòng, bùfen shāngpǐn dǎ wǔ zhé",
    "vi": "Trung tâm thương mại đang tổ chức sự kiện khuyến mãi kỷ niệm ngày thành lập, một số mặt hàng giảm 50%.",
    "en": "The mall is having an anniversary sale, with some items at 50% discount.",
    "ja": "デパートは現在アニバーサリーセールを開催中で、一部の商品が5割引きになります。"
  },
  {
    "zh": "网上购物不仅省时省力，还能方便地货比三家。",
    "pinyin": "wǎngshàng gòuwù bùjǐn shěng shí shěng lì, hái néng fāngbiàn de huò bǐ sān jiā",
    "vi": "Mua sắm trực tuyến không chỉ tiết kiệm thời gian công sức mà còn tiện so sánh nhiều nơi.",
    "en": "Online shopping saves time and effort while making price comparison easy.",
    "ja": "ネットショッピングは手間を省くだけでなく、他店の商品と簡単に比較できます。"
  },
  {
    "zh": "树立正确的消费观念，合理规划每月的开支很重要。",
    "pinyin": "shùlì zhèngquè de xiāofèi guānniàn, hélǐ guīhuà měi yuè de kāizhī hěn zhòngyào",
    "vi": "Xây dựng quan niệm tiêu dùng đúng đắn, lập kế hoạch chi tiêu mỗi tháng hợp lý là rất quan trọng.",
    "en": "Forming correct consumption concepts and planning monthly spending is crucial.",
    "ja": "正しい消費観を確立し、毎月の支出を合理的に計画することは極めて大切です。"
  },
  {
    "zh": "这家老字号店铺的产品质量优良，信誉享誉全国。",
    "pinyin": "zhè jiā lǎozìhào diànpù de chǎnpǐn zhìliàng yōuliáng, xìnyù xiǎngyù quánguó",
    "vi": "Sản phẩm của cửa hiệu lâu đời này chất lượng hảo hạng, uy tín nổi tiếng toàn quốc.",
    "en": "This time-honored shop has excellent product quality and nationwide reputation.",
    "ja": "この老舗の店舗は製品の品質が極めて優れており、全国的に高い信用を誇ります。"
  },
  {
    "zh": "请问这件外套可以试穿一下吗？有没有大一码的？",
    "pinyin": "qǐngwèn zhè jiàn wàitào kěyǐ shìchuān yīxià ma? Yǒu méiyǒu dà yī mǎ de?",
    "vi": "Xin hỏi chiếc áo khoác này có thể thử một chút không? Có cỡ lớn hơn một số không?",
    "en": "Excuse me, may I try on this coat? Do you have one size larger?",
    "ja": "すみません、この上着を試着してもいいですか？ワンサイズ大きいものはありますか？"
  },
  {
    "zh": "投资理财需要具备一定的专业知识，切莫盲目跟风。",
    "pinyin": "tóuzī lǐcái xūyào jùbèi yīdìng de zhuānyè zhīshi, qièmò mángmù gēnfēng",
    "vi": "Đầu tư quản lý tài chính cần có kiến thức chuyên môn nhất định, đừng bao giờ chạy theo phong trào một cách mù quáng.",
    "en": "Investing requires professional knowledge; never follow the trend blindly.",
    "ja": "資産運用には一定の専門知識が必要であり、決してやみくもに流されてはいけません。"
  },
  {
    "zh": "凭购物小票可以在七天之内办理退货或换货。",
    "pinyin": "píng gòuwù xiǎopiào kěyǐ zài qī tiān zhīnèi bànlǐ tuìhuò huò huànhuò",
    "vi": "Dựa vào hóa đơn mua hàng có thể làm thủ tục trả hoặc đổi hàng trong vòng bảy ngày.",
    "en": "With the receipt, you can process returns or exchanges within seven days.",
    "ja": "レシートを提示すれば、7日以内であれば返品や交換の手続きが可能です。"
  },
  {
    "zh": "一分钱一分货，购买大件家电千万不能只图便宜。",
    "pinyin": "yī fēn qián yī fēn huò, gòumǎi dàjiàn jiādiàn qiānwàn bùnéng zhǐ tú piányi",
    "vi": "Tiền nào của nấy, mua đồ điện gia dụng lớn tuyệt đối không thể chỉ tham rẻ.",
    "en": "You get what you pay for; don't just go for cheap prices on big appliances.",
    "ja": "安物買いの銭失いと言うように、大型家電を買う際は安さだけを求めてはいけません。"
  },
  {
    "zh": "养成记账的好习惯能让我们清楚掌握资金流向。",
    "pinyin": "yǎngchéng jìzhàng de hǎo xíguàn néng ràng wǒmen qīngchu zhǎngwò zījīn liúxiàng",
    "vi": "Tạo thói quen ghi chép sổ sách giúp chúng ta nắm bắt rõ ràng dòng tiền.",
    "en": "Forming a bookkeeping habit lets us clearly track the flow of money.",
    "ja": "家計簿をつける良い習慣を身につければ、お金の流れを明確に把握できます。"
  },
  {
    "zh": "这张信用卡提供免息分期付款服务，非常划算。",
    "pinyin": "zhè zhāng xìnyòngkǎ tígōng miǎnxī fēnqī fùkuǎn fúwù, fēicháng huásuàn",
    "vi": "Thẻ tín dụng này cung cấp dịch vụ trả góp không lãi suất, rất tiết kiệm.",
    "en": "This credit card offers interest-free installment payments, which is a great deal.",
    "ja": "このクレジットカードは無利子の分割払いサービスを提供しており、とてもお得です。"
  },
  {
    "zh": "快递送货上门的速度很快，通常次日就能送达。",
    "pinyin": "kuàidì sònghuò shàngmén de sùdù hěn kuài, tōngcháng cìrì jiù néng sòngdá",
    "vi": "Tốc độ giao hàng tận nhà của chuyển phát nhanh rất mau lẹ, thường ngày hôm sau là tới.",
    "en": "Express door-to-door delivery is fast and usually arrives the next day.",
    "ja": "宅配便の配達スピードは非常に迅速で、通常は翌日には手元に届きます。"
  },
  {
    "zh": "学会储蓄能够增强抵御突发意外风险的能力。",
    "pinyin": "xuéhuì chǔxù nénggòu zēngqiáng dǐyù tūfā yìwài fēngxiǎn de nénglì",
    "vi": "Học cách tiết kiệm có thể nâng cao khả năng chống đỡ trước rủi ro bất ngờ.",
    "en": "Learning to save enhances the ability to withstand sudden unforeseen risks.",
    "ja": "貯蓄を身につけることは、予期せぬリスクに備える能力を大きく高めます。"
  },
  {
    "zh": "这款手机功能强大，拍照效果尤其出众。",
    "pinyin": "zhè kuǎn shǒujī gōngnéng qiángdà, pāizhào xiàoguǒ yóuqí chūzhòng",
    "vi": "Chiếc điện thoại này tính năng mạnh mẽ, hiệu quả chụp ảnh đặc biệt xuất sắc.",
    "en": "This phone is powerful in features, especially outstanding in photography.",
    "ja": "このスマートフォンは機能が充実しており、特に写真の画質が際立っています。"
  },
  {
    "zh": "时间就像海绵里的水，只要愿挤，总还是有的。",
    "pinyin": "shíjiān jiù xiàng hǎimián lǐ de shuǐ, zhǐyào yuàn jǐ, zǒng hái shì yǒu de",
    "vi": "Thời gian tựa như nước trong bọt biển, chỉ cần chịu vắt thì luôn có.",
    "en": "Time is like water in a sponge; as long as you squeeze, it is there.",
    "ja": "時間はスポンジの中の水のようで、絞り出そうとすれば必ずあるものです。"
  },
  {
    "zh": "会议定在明天上午九点半在第二会议室准时召开。",
    "pinyin": "huìyì dìng zài míngtiān shàngwǔ jiǔ diǎn bàn zài dì-èr huìyìshì zhǔnshí zhàokāi",
    "vi": "Cuộc họp được định vào 9 giờ rưỡi sáng mai tại phòng họp số hai diễn ra đúng giờ.",
    "en": "The meeting is scheduled at 9:30 tomorrow morning in Conference Room 2.",
    "ja": "会議は明日の午前9時半に第二会議室で定刻通り開催される予定です。"
  },
  {
    "zh": "讲究礼貌和尊重他人是人际交往中不可或缺的素养。",
    "pinyin": "jiǎngjiu lǐmào hé zūnzhòng tārén shì rénjì jiāowǎng zhōng bùkě-huòquē de sùyǎng",
    "vi": "Chú trọng lễ phép và tôn trọng người khác là tố chất không thể thiếu trong giao tiếp giữa người với người.",
    "en": "Politeness and respecting others are indispensable qualities in interpersonal communication.",
    "ja": "礼儀を重んじ他者を尊重することは、対人関係において欠かせない素養です。"
  },
  {
    "zh": "他提前半个小时到达了火车站候车大厅。",
    "pinyin": "tā tíqián bàn gè xiǎoshí dàodále huǒchēzhàn hòuchē dàtīng",
    "vi": "Anh ấy đã đến đại sảnh chờ tàu của nhà ga sớm nửa tiếng đồng hồ.",
    "en": "He arrived at the train station waiting hall half an hour in advance.",
    "ja": "彼は30分早く鉄道駅の待合フロアに到着しました。"
  },
  {
    "zh": "岁月不饶人，我们要珍惜眼前拥有的每分每秒。",
    "pinyin": "suìyuè bù ráorén, wǒmen yào zhēnxī yǎnqián yōngyǒu de měi fēn měi miǎo",
    "vi": "Năm tháng chẳng đợi ai, chúng ta phải trân trọng từng phút từng giây trước mắt.",
    "en": "Time spares no one; we must cherish every single minute and second we have.",
    "ja": "歳月は人を待ってくれません。目の前の一分一秒を大切にしなければなりません。"
  },
  {
    "zh": "他把今天的日程安排得满满当当，非常充实。",
    "pinyin": "tā bǎ jīntiān de rìchéng ānpái de mǎnmǎndāngdāng, fēicháng chōngshí",
    "vi": "Anh ấy sắp xếp lịch trình hôm nay kín mít, vô cùng trọn vẹn.",
    "en": "He scheduled his itinerary today tightly full, very fulfilling.",
    "ja": "彼は今日のスケジュールをぎっしり埋めており、非常に充実しています。"
  },
  {
    "zh": "经过长达两周的紧密磋商，双方终于达成了共识。",
    "pinyin": "jīngguò cháng dá liǎng zhōu de jǐnmì cuōshāng, shuāngfāng zhōngyú dáchéngle gòngshí",
    "vi": "Trải qua cuộc thương lượng chặt chẽ kéo dài tới hai tuần, hai bên cuối cùng đạt được đồng thuận.",
    "en": "After two weeks of close consultations, both sides finally reached consensus.",
    "ja": "2週間に及ぶ緊密な協議を経て、双方はついに合意に達しました。"
  },
  {
    "zh": "拖延症会悄悄偷走宝贵的时间，必须果断克服。",
    "pinyin": "tuōyánzhèng huì qiāoqiāo tōuzǒu bǎoguì de shíjiān, bìxū guǒduàn kèfú",
    "vi": "Bệnh trì hoãn sẽ lén lút đánh cắp thời gian quý báu, cần phải dứt khoát vượt qua.",
    "en": "Procrastination silently steals precious time and must be overcome decisively.",
    "ja": "先延ばしの癖は貴重な時間を奪うため、断固として克服しなければなりません。"
  },
  {
    "zh": "这部纪录片生动记录了城市过去三十年的巨大变迁。",
    "pinyin": "zhè bù jìlùpiàn shēngdòng jìlùle chéngshì guòqù sānshí nián de jùdà biànqiān",
    "vi": "Bộ phim tài liệu này ghi lại một cách sinh động sự đổi thay to lớn suốt 30 năm qua của thành phố.",
    "en": "This documentary vividly recorded the city's huge transformation in 30 years.",
    "ja": "このドキュメンタリーは、過去30年間の都市の巨大な変遷を鮮明に記録しています。"
  },
  {
    "zh": "合理安排工作和休息时间有助于保持旺盛的精力。",
    "pinyin": "hélǐ ānpái gōngzuò hé xiūxi shíjiān yǒuzhù yú bǎochí wàngshèng de jīnglì",
    "vi": "Phân bổ hợp lý thời gian làm việc và nghỉ ngơi giúp duy trì năng lượng dồi dào.",
    "en": "Arranging work and rest time properly helps maintain vigorous energy.",
    "ja": "仕事と休息の時間を合理的に割り振ることで、旺盛な活力を保つことができます。"
  },
  {
    "zh": "他习惯在每天睡觉前花半个小时阅读经典名著。",
    "pinyin": "tā xíguàn zài měitiān shuìjiào qián huā bàn gè xiǎoshí yuèdú jīngdiǎn míngzhù",
    "vi": "Anh ấy quen dành nửa tiếng trước khi ngủ mỗi ngày để đọc danh tác kinh điển.",
    "en": "He is used to spending half an hour reading classics before sleep daily.",
    "ja": "彼は毎晩寝る前の30分間、古典的名著を読むことを習慣にしています。"
  },
  {
    "zh": "距离项目交付的最终截止日期只剩下三天了。",
    "pinyin": "jùlí xiàngmù jiāofù de zuìzhōng jiézhǐ rìqī zhǐ shèng xià sān tiān le",
    "vi": "Khoảng cách tới hạn chót bàn giao cuối cùng của dự án chỉ còn lại 3 ngày.",
    "en": "Only three days remain before the final deadline for project delivery.",
    "ja": "プロジェクトの最終納品期限まで、残り3日しかありません。"
  },
  {
    "zh": "光阴似箭，转眼间我们已经认识整整五年了。",
    "pinyin": "guāngyīnsìjiàn, zhuǎnyǎnjiān wǒmen yǐjīng rènshi zhěngzhěng wǔ nián le",
    "vi": "Thời gian như thoi đưa, chớp mắt chúng ta đã quen biết nhau tròn 5 năm trời.",
    "en": "Time flies like an arrow; in the blink of an eye we've known each other 5 years.",
    "ja": "光陰矢の如し、瞬く間に私たちは知り合って丸5年が経ちました。"
  },
  {
    "zh": "无论生活多么忙碌，也别忘了定期给远方的父母打电话。",
    "pinyin": "wúlùn shēnghuó duōme mánglù, yě bié wàngle dìngqī gěi yuǎnfāng de fùmǔ dǎ diànhuà",
    "vi": "Dù cuộc sống bận bịu ra sao cũng đừng quên định kỳ gọi điện cho cha mẹ phương xa.",
    "en": "No matter how busy life is, don't forget to call parents from afar regularly.",
    "ja": "どんなに忙しくても、遠くにいる両親に定期的に電話するのを忘れてはいけません。"
  },
  {
    "zh": "把握当下每一个瞬间，就是对未来最好的投资。",
    "pinyin": "bǎwò dāngxià měi yī gè shùnjiān, jiùshì duì wèilái zuì hǎo de tóuzī",
    "vi": "Nắm bắt từng khoảnh khắc hiện tại chính là sự đầu tư tốt nhất cho tương lai.",
    "en": "Seizing every moment right now is the best investment for the future.",
    "ja": "「今」という瞬間をしっかり掴むことこそが、未来への最高の投資です。"
  },
  {
    "zh": "千里之行，始于足下，任何伟大成就都离不开积累。",
    "pinyin": "qiān lǐ zhī xíng, shǐ yú zú xià, rènhé wěidà chéngjiù dōu lí bù kāi jīlěi",
    "vi": "Chuyến đi ngàn dặm bắt đầu từ một bước chân, mọi thành tựu vĩ đại đều không thể tách rời sự tích lũy.",
    "en": "A journey of a thousand miles begins with a single step; achievements need accumulation.",
    "ja": "千里の道も一歩から。いかなる偉大な成果も積み重ねなしにはあり得ません。"
  },
  {
    "zh": "只要功夫深，铁杵磨成针，恒心能战胜一切艰难。",
    "pinyin": "zhǐyào gōngfu shēn, tiěchǔ mó chéng zhēn, héngxīn néng zhànshèng yīqiè jiānnán",
    "vi": "Có công mài sắt có ngày nên kim, sự bền lòng có thể chiến thắng muôn vàn gian nan.",
    "en": "Constant dripping wears away a stone; perseverance overcomes all difficulties.",
    "ja": "継続は力なり、強固な根気さえあればあらゆる困難に打ち勝つことができます。"
  },
  {
    "zh": "失败乃成功之母，吸取教训才能迎头赶上。",
    "pinyin": "shībài nǎi chénggōng zhī mǔ, xīqǔ jiàoxùn cáinéng yíngtóugǎnshàng",
    "vi": "Thất bại là mẹ thành công, đúc rút bài học mới có thể vươn lên bắt kịp.",
    "en": "Failure is the mother of success; only by learning lessons can one catch up.",
    "ja": "失敗は成功の母であり、教訓を汲み取ってこそ追いつき追い越すことができます。"
  },
  {
    "zh": "塞翁失马，焉知非福，面对人生的得失要保持淡然。",
    "pinyin": "sàiwēngshīmǎ, yān zhī fēi fú, miànduì rénshēng de déshī yào bǎochí dànrán",
    "vi": "Tái ông mất ngựa, họa phúc khôn lường, đối mặt được mất cuộc đời cần giữ sự bình thản.",
    "en": "A blessing in disguise; remain calm and balanced about life's gains and losses.",
    "ja": "人間万事塞翁が馬。人生の得失に直面したときは淡々とした心を保つべきです。"
  },
  {
    "zh": "饮水思源，我们在取得成绩时千万不能忘本。",
    "pinyin": "yǐnshuǐsīyuán, wǒmen zài qǔdé chéngjì shí qiānwàn bùnéng wàngběn",
    "vi": "Uống nước nhớ nguồn, chúng ta khi gặt hái thành tích tuyệt đối không được quên nguồn cội.",
    "en": "When drinking water, remember the spring; never forget your roots when succeeding.",
    "ja": "水を飲むときは源を思え。成果を収めたとき、決して原点を忘れてはなりません。"
  },
  {
    "zh": "纸上谈兵毫无用处，唯有付诸实践才能见真章。",
    "pinyin": "zhǐshàngtánbīng háo wú yòngchù, wéiyǒu fùzhū shíjiàn cáinéng jiàn zhēnzhāng",
    "vi": "Bàn việc quân trên giấy chẳng có ích gì, chỉ có đưa vào thực tiễn mới thấy rõ thực tài.",
    "en": "Armchair strategy is useless; only putting things into practice reveals truth.",
    "ja": "机上の空論は何の役にも立ちません。実践に移してこそ真価が問われます。"
  },
  {
    "zh": "他在比赛中全力以赴，终于实现了自己的夺冠梦想。",
    "pinyin": "tā zài bǐsài zhōng quánlìyǐfù, zhōngyú shíxiànle zìjǐ de duóguàn mèngxiǎng",
    "vi": "Anh ấy dốc toàn lực trong trận đấu, cuối cùng đã thực hiện ước mơ đoạt giải quán quân.",
    "en": "He went all out in the competition and finally realized his dream of winning.",
    "ja": "彼は試合で全力を尽くし、ついに優勝するという夢を実現させました。"
  },
  {
    "zh": "虚心使人进步，骄傲使人落后，我们要时刻警惕自满。",
    "pinyin": "xūxīn shǐ rén jìnbù, jiāo'ào shǐ rén luòhòu, wǒmen yào shíkè jǐngtì zìmǎn",
    "vi": "Khiêm tốn giúp người ta tiến bộ, kiêu ngạo khiến người ta tụt hậu, ta phải luôn cảnh giác tự mãn.",
    "en": "Modesty helps one progress whereas conceit makes one lag; beware complacency.",
    "ja": "謙虚さは進歩をもたらし、傲慢は落伍を招きます。常に自惚れを戒めるべきです。"
  },
  {
    "zh": "冰冻三尺，非一日之寒，深厚的能力需要日积月累。",
    "pinyin": "bīng dòng sān chǐ, fēi yī rì zhī hán, shēnhòu de nénglì xūyào rìjīyuèlěi",
    "vi": "Băng dày ba thước chẳng phải cái lạnh một ngày, năng lực sâu sắc cần tích lũy ngày này qua tháng khác.",
    "en": "Rome was not built in a day; deep competence requires long accumulation.",
    "ja": "氷の厚さは一日の寒さによるものではありません。実力は日々の積み重ねを要します。"
  },
  {
    "zh": "众人拾柴火焰高，团结一心就能汇聚成强大力量。",
    "pinyin": "zhòngrén shí chái huǒyàn gāo, tuánjié yīxīn jiù néng huìjù chéng qiángdà lìliang",
    "vi": "Nhiều người nhặt củi ngọn lửa bốc cao, đoàn kết một lòng sẽ kết tụ thành sức mạnh vĩ đại.",
    "en": "When everybody adds fuel, the flames rise high; unity generates strength.",
    "ja": "皆が薪を拾えば炎は高く燃え上がります。一致団結すれば強大な力になります。"
  },
  {
    "zh": "井底之蛙只能看到巴掌大的天空，我们要开阔眼界。",
    "pinyin": "jǐngdǐzhīwā zhǐ néng kàndào bāzhang dà de tiānkōng, wǒmen yào kāikuò yǎnjiè",
    "vi": "Ếch ngồi đáy giếng chỉ thấy khoảng trời bằng bàn tay, chúng ta cần mở rộng tầm nhìn.",
    "en": "A frog in a well sees only a tiny patch of sky; we should broaden perspectives.",
    "ja": "井の中の蛙は掌ほどの空しか見えません。私たちは視野を広げるべきです。"
  },
  {
    "zh": "画蛇添足不仅不会增添美感，反而会弄巧成拙。",
    "pinyin": "huàshétiānzú bùjǐn bù huì zēngtiān měigǎn, fǎn'ér huì nòngqiǎochéngzhuō",
    "vi": "Vẽ rắn thêm chân không những không tăng mỹ cảm mà ngược lại vụng chèo khéo chống.",
    "en": "Adding feet to a snake ruins it; overdoing things often backfires.",
    "ja": "蛇足を描き足すことは美しさを添えるどころか、かえって余計な失敗を招きます。"
  },
  {
    "zh": "守株待兔往往是一无所获，唯有主动出击才有生机。",
    "pinyin": "shǒuzhūdàitù wǎngwǎng shì yīwúsuǒhuò, wéiyǒu zhǔdòng chūjī cái yǒu shēngjī",
    "vi": "Ôm cây đợi thỏ thường là trắng tay, chỉ có chủ động đón đầu mới tìm thấy đường sống.",
    "en": "Waiting by the tree stump for hares yields nothing; take active initiative.",
    "ja": "待ちぼうけを決め込んでいても何も得られません。能動的に動いてこそ道が開けます。"
  },
  {
    "zh": "亡羊补牢，未为迟也，及时纠正过失能够挽回损失。",
    "pinyin": "wángyángbǔláo, wèi wéi chí yě, jíshí jiūzhèng guòshī nénggòu wǎnhuí sǔnshī",
    "vi": "Mất bò mới lo làm chuồng cũng chưa muộn, kịp thời sửa chữa lỗi lầm có thể cứu vãn tổn thất.",
    "en": "Better late than never; correcting mistakes in time can redeem losses.",
    "ja": "過ちを認めてすぐに繕えばまだ遅くありません。タイムリーな修正が損失を防ぎます。"
  },
  {
    "zh": "掩耳盗铃不过是自欺欺人，逃避解决不了任何问题。",
    "pinyin": "yǎn'ěrdàolíng bùguò shì zìqīqīrén, táobì jiějué bù liǎo rènhé wèntí",
    "vi": "Bịt tai trộm chuông chẳng qua là tự lừa dối mình dối người, trốn tránh không giải quyết được vấn đề gì.",
    "en": "Burying head in sand is deceiving oneself; avoidance solves nothing.",
    "ja": "耳を覆って鈴を盗むのは自他を欺くに過ぎず、逃避は何も解決しません。"
  },
  {
    "zh": "对症下药才能药到病除，找准原因方能化解难题。",
    "pinyin": "duìzhèngxiàyào cáinéng yàodàobìngchú, zhǎo zhǔn yuányīn fāng néng huàjiě nántí",
    "vi": "Bốc thuốc đúng bệnh thì thuốc đến bệnh lui, xác định đúng nguyên nhân mới hóa giải được nút thắt.",
    "en": "Prescribing the right medicine cures ailments; pinpointing roots resolves knots.",
    "ja": "症候に応じた適切な処置をしてこそ完治します。原因の特定が難題解決の鍵です。"
  },
  {
    "zh": "见微知著是一种高超的洞察力，能从细小处预见未来。",
    "pinyin": "jiànwēizhīzhù shì yī zhǒng gāochāo de dòngchálì, néng cóng xìxiǎo chù yùjiàn wèilái",
    "vi": "Nhìn từ dấu hiệu nhỏ biết rõ xu hướng lớn là năng lực quan sát siêu phàm, từ chi tiết nhỏ thấy trước tương lai.",
    "en": "Discerning big trends from tiny clues reflects profound insight into future.",
    "ja": "一葉落ちて天下の秋を知るように、些細な兆候から先を見抜く力は卓越した洞察力です。"
  },
  {
    "zh": "滴水穿石需要持之以恒的毅力，半途而废注定一事无成。",
    "pinyin": "dīshuǐchuānshí xūyào chízhīyǐhéng de yìlì, bàntú'érfèi zhùdìng yīshìwúchéng",
    "vi": "Nước chảy đá mòn cần nghị lực bền bỉ kiên trì, bỏ dở giữa chừng cầm chắc chẳng làm nên việc gì.",
    "en": "Constant dripping wears stone; persistence succeeds while quitting achieves nothing.",
    "ja": "雨だれ石を穿つ。やり抜く忍耐力が必要であり、中途半端に諦めれば何も成し遂げられません。"
  },
  {
    "zh": "顺其自然并不是消极放弃，而是在努力后坦然面对结果。",
    "pinyin": "shùnqízìrán bìng bù shì xiāojí fàngqì, ér shì zài nǔlì hòu tǎnrán miànduì jiéguǒ",
    "vi": "Thuận theo tự nhiên không phải là buông xuôi tiêu cực, mà là sau khi nỗ lực thì thanh thản đón nhận kết quả.",
    "en": "Letting nature take its course means accepting results calmly after trying hard.",
    "ja": "自然に任せることは決して消極的な諦めではなく、尽力した上で結果を泰然と受け止めることです。"
  },
  {
    "zh": "居安思危，思则有备，有备方能无患。",
    "pinyin": "jū'ānsīwēi, sī zé yǒu bèi, yǒu bèi fāng néng wú huàn",
    "vi": "Ở nơi an ổn phải nghĩ lúc hiểm nguy, có nghĩ mới có phòng bị, phòng bị chu đáo mới không gặp họa.",
    "en": "Prepare for danger in times of peace; preparation averts disaster.",
    "ja": "安泰な時にこそ危急を警戒すべきです。備えあれば憂いなしです。"
  },
  {
    "zh": "这项重大科研成果的发布，标志着该领域取得了突破性进展。",
    "pinyin": "zhè xiàng zhòngdà kěyán chéngguǒ de fābù, biāozhì zhe gāi lǐngyù qǔdéle tūpòxìng jìnzhǎn",
    "vi": "Việc công bố thành quả nghiên cứu khoa học trọng đại này đánh dấu lĩnh vực này đã đạt được tiến triển mang tính đột phá.",
    "en": "The announcement of this major research achievement marks breakthrough progress.",
    "ja": "この重大な研究成果の発表は、当該分野が画期的な進展を遂げたことを示しています。"
  },
  {
    "zh": "人工智能技术正在以不可阻挡之势重塑传统产业格局。",
    "pinyin": "réngōng zhìnéng jìshù zhèngzài yǐ bùkězǔdǎng zhī shì chóngshù chuántǒng chǎnyè géjú",
    "vi": "Công nghệ trí tuệ nhân tạo đang định hình lại cục diện ngành công nghiệp truyền thống với thế không thể ngăn cản.",
    "en": "Artificial intelligence technology is irresistibly reshaping traditional industries.",
    "ja": "人工知能技術は、押しとどめようのない勢いで従来の産業構造を再構築しています。"
  },
  {
    "zh": "面对错综复杂的国际经济局势，我们必须保持高度战略定力。",
    "pinyin": "miànduì cuòzōngfùzá de guójì jīngjì júshì, wǒmen bìxū bǎochí gāodù zhànlüè dìnglì",
    "vi": "Đối diện với cục diện kinh tế quốc tế đan xen phức tạp, chúng ta phải giữ vững định lực chiến lược cao độ.",
    "en": "Facing intricate global economic situations, we must maintain strategic resolve.",
    "ja": "複雑に入り組んだ国際経済情勢を前に、高度な戦略的安定性を保つ必要があります。"
  },
  {
    "zh": "唯有坚持改革开放和包容互鉴，世界才能走向繁荣稳定。",
    "pinyin": "wéiyǒu jiānchí gǎigé kāifàng hé bāoróng hù jiàn, shìjiè cáinéng zǒuxiàng fánróng wěndìng",
    "vi": "Chỉ có kiên trì cải cách mở cửa và bao dung học hỏi lẫn nhau, thế giới mới có thể hướng tới phồn vinh và ổn định.",
    "en": "Only by openness and mutual learning can the world move toward prosperity.",
    "ja": "改革開放と相互学習を堅持してこそ、世界は繁栄と安定に向かうことができます。"
  },
  {
    "zh": "保护知识产权能维护公平竞争，激发社会的创新活力。",
    "pinyin": "bǎohù zhīshi chǎnquán néng wéihù gōngpíng jìngzhēng, jīfā shèhuì de chuàngxīn huólì",
    "vi": "Bảo hộ sở hữu trí tuệ bảo vệ cạnh tranh lành mạnh, khơi dậy đổi mới sáng tạo.",
    "en": "Intellectual property protection maintains fair competition and spurs innovation.",
    "ja": "知的財産の保護は公正な競争を守り、社会の革新的な活力を刺激します。"
  },
  {
    "zh": "城市的可持续发展离不开环境保护与绿色能源的高效利用。",
    "pinyin": "chéngshì de kěchíxù fāzhǎn lí bù kāi huánjìng bǎohù yǔ lǜsè néngyuán de gāoxiào lìyòng",
    "vi": "Phát triển đô thị bền vững không thể tách rời bảo vệ môi trường và năng lượng xanh.",
    "en": "Sustainable urban development relies on environmental protection and clean energy.",
    "ja": "都市の持続的発展には環境保護とクリーンエネルギーの活用が不可欠です。"
  },
  {
    "zh": "这位作家凭借敏锐的观察力描绘出普通人的喜怒哀乐。",
    "pinyin": "zhè wèi zuòjiā píngjiè mǐnruì de guānchálì miáohuì chū pǔtōngrén de xǐnù'āilè",
    "vi": "Tác giả này dựa vào quan sát nhạy bén để khắc họa hỉ nộ ái ố của người bình dị.",
    "en": "The writer depicted joys and sorrows of ordinary people with keen observation.",
    "ja": "この作家は鋭い観察力で一般の人々の喜怒哀楽を描き出しました。"
  },
  {
    "zh": "深入挖掘传统文化内涵，有助于增强民族自豪感。",
    "pinyin": "shēnrù wājué chuántǒng wénhuà nèihán, yǒuzhù yú zēngqiáng mínzú zìháogǎn",
    "vi": "Đào sâu khai thác nội hàm văn hóa truyền thống giúp nâng cao lòng tự hào dân tộc.",
    "en": "Exploring traditional culture's depth helps strengthen national pride.",
    "ja": "伝統文化の内包を掘り下げることは、民族の自負心を高めるのに役立ちます。"
  },
  {
    "zh": "双方就进一步扩大经贸往来与人文交流交换了深刻意见。",
    "pinyin": "shuāngfāng jiù jìnyībù kuòdà jīngmào wǎnglái yǔ rénwén jiāoliú jiàohuànle shēnkè yìjiàn",
    "vi": "Hai bên đã trao đổi ý kiến sâu sắc về việc mở rộng hơn nữa giao lưu kinh tế thương mại và giao lưu nhân văn.",
    "en": "Both sides exchanged deep views on expanding trade and cultural exchanges.",
    "ja": "双方は貿易往来および文化交流のさらなる拡大について深く意見を交わしました。"
  },
  {
    "zh": "科学研究需要严谨求实，更需要敢于质疑权威的精神。",
    "pinyin": "kēxué yánjiū xūyào yánjǐn qiúshí, gèng xūyào gǎnyú zhìyí quánwēi de jīngshén",
    "vi": "Nghiên cứu khoa học cần nghiêm cẩn cầu thị, và tinh thần dám phản biện uy quyền.",
    "en": "Scientific research requires rigor and the spirit to question authority.",
    "ja": "科学研究には厳密さと権威を疑う勇気の精神が求められます。"
  },
  {
    "zh": "这部学术专著系统梳理了近百年来现代哲学思想流变。",
    "pinyin": "zhè bù xuéshù zhuānzhù xìtǒng shūlǐle jìn bǎi nián lái xiàndài zhéxué sīxiǎng liúbiàn",
    "vi": "Chuyên khảo học thuật này hệ thống hóa sự biến chuyển triết học cận hiện đại.",
    "en": "This monograph systematically traces the currents of modern philosophical thought.",
    "ja": "この学術書は過去百年の現代哲学思想の変遷を体系的に整理しています。"
  },
  {
    "zh": "面对复杂的舆论，新闻媒体应坚持客观公正的报道原则。",
    "pinyin": "miànduì fùzá de yúlùn, xīnwén méitǐ yīng jiānchí kèguān gōngzhèng de bàodào yuánzé",
    "vi": "Trước dư luận phức tạp, báo chí cần kiên định nguyên tắc đưa tin khách quan.",
    "en": "Facing complex opinions, news media should uphold objective reporting principles.",
    "ja": "複雑な世論に対し、報道メディアは客観公正な報道原則を維持すべきです。"
  },
  {
    "zh": "优化营商环境能够有效激发市场主体的创新与活力。",
    "pinyin": "yōuhuà yíngshāng huánjìng nénggòu yǒuxiào jīfā shìchǎng zhǔtǐ de chuàngxīn yǔ huólì",
    "vi": "Tối ưu môi trường kinh doanh giúp khơi dậy sự đổi mới và sức sống thị trường.",
    "en": "Optimizing business environment effectively stimulates market entities' innovation and vitality.",
    "ja": "ビジネス環境の改善は、市場主体のイノベーションと活力を効果的に引き出します。"
  },
  {
    "zh": "青年一代肩负着推动社会进步与科技创新的神圣使命。",
    "pinyin": "qīngnián yīdài jiānfù zhe tuīdòng shèhuì jìnbù yǔ kējì chuàngxīn de shénshèng shǐmìng",
    "vi": "Thế hệ trẻ gánh vác sứ mệnh thúc đẩy tiến bộ xã hội và đổi mới công nghệ.",
    "en": "The youth generation bears the sacred mission of driving progress and innovation.",
    "ja": "若い世代は社会の進歩と技術革新を推進する使命を担っています。"
  },
  {
    "zh": "音乐超越了语言和国界，成为连接彼此心灵的桥梁。",
    "pinyin": "yīnyuè chāoyuèle yǔyán hé guójiè, chéngwéi liánjiē bǐcǐ xīnlíng de qiáoliáng",
    "vi": "Âm nhạc vượt qua biên giới ngôn ngữ, trở thành cầu nối giữa những tâm hồn.",
    "en": "Music transcends language and borders, bridging hearts together.",
    "ja": "音楽は言語や国境を越え、互いの心をつなぐ架け橋となります。"
  },
  {
    "zh": "完善的社会保障体系是维护社会公平与稳定的基石。",
    "pinyin": "wánshàn de shèhuì bǎozhàng tǐxì shì wéihù shèhuì gōngpíng yǔ wěndìng de jīshí",
    "vi": "Hệ thống an sinh xã hội hoàn thiện là nền tảng giữ vững công bằng ổn định.",
    "en": "A sound social security system is the cornerstone of fairness and stability.",
    "ja": "充実した社会保障体系は社会の公平と安定を守る礎です。"
  },
  {
    "zh": "现代医学的发展极大地提高了重大疾病的治愈率。",
    "pinyin": "xiàndài yīxué de fāzhǎn jí dà de tígāole zhòngdà jíbìng de zhìyùlǜ",
    "vi": "Sự phát triển của y học hiện đại nâng cao đáng kể tỷ lệ khỏi các bệnh nặng.",
    "en": "The development of modern medicine has greatly improved disease cure rates.",
    "ja": "現代医学の発展は重大な疾患の治癒率を大幅に向上させました。"
  },
  {
    "zh": "这场辩论赛双方观点交锋激烈，逻辑严密，令人叹为观止。",
    "pinyin": "zhè chǎng biànlùnsài shuāngfāng guāndiǎn jiāofēng jīliè, luóji yánmì, lìngrén tànwéiguānzhǐ",
    "vi": "Trận tranh biện này đôi bên va chạm quan điểm kịch liệt, logic chặt chẽ, khiến người ta phải trầm trồ thán phục.",
    "en": "The debate saw fierce exchanges and tight logic, leaving the audience marveling.",
    "ja": "このディベート対決は鋭い主張が激突し、論理も緻密で見事なものでした。"
  },
  {
    "zh": "历史的发展总是在曲折中前进，在探索中不断上升。",
    "pinyin": "lìshǐ de fāzhǎn zǒngshì zài qūzhé zhōng qiánjìn, zài tànsuǒ zhōng bùduàn shàngshēng",
    "vi": "Lịch sử luôn tiến lên qua khúc khuỷu, không ngừng nâng tầm trong khám phá.",
    "en": "History always progresses through twists and rises through exploration.",
    "ja": "歴史の発展は常に紆余曲折の中で前進し、探求の中で上昇します。"
  },
  {
    "zh": "弘扬工匠精神，要求我们在每个环节上精益求精。",
    "pinyin": "hóngyáng gōngjiàng jīngshén, yāoqiú wǒmen zài měi gè huánjié shàng jīngyìqiújīng",
    "vi": "Phát huy tinh thần nghệ nhân đòi hỏi tỉ mỉ hoàn thiện ở mọi khâu.",
    "en": "Promoting craftsmanship requires striving for excellence in every step.",
    "ja": "職人精神を発揚し、あらゆる段階で完成度を追求することが求められます。"
  },
  {
    "zh": "大数据与云计算正加速推动传统制造业的数字化转型。",
    "pinyin": "dàshùjù yǔ yúnjìsuàn zhèng jiāsù tuīdòng chuántǒng zhìzàoyè de shùzìhuà zhuǎnxíng",
    "vi": "Dữ liệu lớn và điện toán đám mây thúc đẩy chuyển đổi số cho ngành chế tạo.",
    "en": "Big data and cloud computing accelerate digital transformation in manufacturing.",
    "ja": "ビッグデータとクラウドは製造業のデジタル変革を加速させています。"
  },
  {
    "zh": "这座美术馆珍藏了大量艺术品，吸引了世界各地的游客。",
    "pinyin": "zhè zuò měishùguǎn zhēncángle dàliàng yìshùpǐn, xīyǐnle shìjiè gèdì de yóukè",
    "vi": "Bảo tàng mỹ thuật này lưu giữ nhiều tác phẩm nghệ thuật, hút khách quốc tế.",
    "en": "This art museum houses many artworks, attracting visitors from around the world.",
    "ja": "この美術館は多くの芸術品を収蔵し、世界中の観光客を魅了しています。"
  },
  {
    "zh": "消除绝对贫困是人类奇迹，具有深远的世界历史意义。",
    "pinyin": "xiāochú juéduì píngkùn shì rénlèi qíjì, jùyǒu shēnyuǎn de shìjiè lìshǐ yìyì",
    "vi": "Xóa bỏ nghèo khó cùng cực là kỳ tích mang ý nghĩa lịch sử sâu rộng.",
    "en": "Eradicating absolute poverty is a human miracle of profound global significance.",
    "ja": "絶対的貧困の解消は人類の奇跡であり、深遠な歴史的意義を持ちます。"
  },
  {
    "zh": "他在演讲中引经据典，生动阐述了宏观经济理论的精髓。",
    "pinyin": "tā zài yǎnjiǎng zhōng yǐnjīngjùdiǎn, shēngdòng chǎnshùle hóngguān jīngjì lǐlùn de jīngsuǐ",
    "vi": "Trong diễn thuyết anh trích dẫn kinh điển, giải thích sinh động lý thuyết kinh tế.",
    "en": "Quoting classics, he vividly articulated the essence of macroeconomic theory.",
    "ja": "彼は講演で古典を引用し、マクロ経済理論の真髄を生き生きと解説しました。"
  },
  {
    "zh": "应对全球性危机需要各国携手合作、共同面对挑战。",
    "pinyin": "yìngduì quánqiúxìng wēijī xūyào gèguó xiéshǒu hézuò, gòngtóng miànduì tiǎozhàn",
    "vi": "Ứng phó khủng hoảng toàn cầu cần các nước cùng hợp tác đối mặt thử thách.",
    "en": "Responding to global crises requires countries to work together against challenges.",
    "ja": "地球規模の危機に対応するため、各国が団結して挑戦に立ち向かう必要があります。"
  },
  {
    "zh": "优秀的文艺作品应当扎根生活，反映时代的呼声。",
    "pinyin": "yōuxiù de wényì zuòpǐn yīngdāng zhāgēn shēnghuó, fǎnyìng shídài de hūshēng",
    "vi": "Tác phẩm nghệ thuật hay cần bám rễ cuộc sống, phản ánh tiếng nói thời đại.",
    "en": "Fine literary works should take root in life and echo the voices of the times.",
    "ja": "優れた文芸作品は生活に根ざし、時代の声を反映するべきです。"
  },
  {
    "zh": "打破技术壁垒并促进学科交叉，才能实现重大科研突破。",
    "pinyin": "dǎpò jìshù bìlěi bìng cùjìn xuékē jiāochā, cáinéng shíxiàn zhòngdà kěyán tūpò",
    "vi": "Phá vỡ rào cản kỹ thuật và kết hợp liên ngành mới tạo đột phá nghiên cứu.",
    "en": "Breaking barriers and fostering cross-discipline research lead to scientific breakthroughs.",
    "ja": "技術の壁を破り学際研究を促進してこそ、重大な科学ブレークスルーを達成できます。"
  },
  {
    "zh": "该工程的设计理念融合了东方古典美学与现代环保科技。",
    "pinyin": "gāi gōngchéng de shèjì lǐniàn rónghéle dōngfāng gǔdiǎn měixué yǔ xiàndài huánbǎo kējì",
    "vi": "Thiết kế công trình hòa quyện mỹ học phương Đông và công nghệ bảo vệ môi trường.",
    "en": "The project design blends Eastern classical aesthetics with modern green technology.",
    "ja": "この設計理念は東洋の古典美と現代のエコ技術を融合させています。"
  },
  {
    "zh": "健全的法律制度是市场经济有序平稳运行的最强有力屏障。",
    "pinyin": "jiànquán de fǎlǜ zhìdù shì shìchǎng jīngjì yǒuxù píngwěn yùnxíng de zuì qiángyǒulì píngzhàng",
    "vi": "Hệ thống pháp luật hoàn thiện là lá chắn mạnh mẽ nhất cho sự vận hành trật tự, êm thuận của nền kinh tế thị trường.",
    "en": "A sound legal system is the strongest safeguard for orderly market economies.",
    "ja": "健全な法制度こそが、市場経済の秩序ある安定運行を支える最強の防壁です。"
  },
  {
    "zh": "良好的家风能够潜移默化地塑造健全端正的人格品质。",
    "pinyin": "liánghǎo de jiāfēng nénggòu qiányímòhuà de sùzào jiànquán duānzhèng de réngé pǐnzhì",
    "vi": "Gia phong tốt đẹp âm thầm bồi dưỡng nhân cách đoan chính健全.",
    "en": "Good family tradition subtly shapes wholesome and upright character.",
    "ja": "良き家風は健全で端正な人格を自然と育むことができます。"
  },
  {
    "zh": "太空探索不断拓展着人类对浩瀚宇宙规律的认知边界。",
    "pinyin": "tàikōng tànsuǒ bùduàn tuòzhǎn zhe rénlèi duì hàohàn yǔzhòu guīlǜ de rènzhī biānjiè",
    "vi": "Thám hiểm vũ trụ không ngừng mở rộng ranh giới nhận thức của nhân loại đối với quy luật vũ trụ bao la.",
    "en": "Space exploration continually expands the bounds of understanding the cosmos.",
    "ja": "宇宙探査は、広大な宇宙の法則に対する人類の認識のフロンティアを拡大し続けています。"
  },
  {
    "zh": "这部歌剧以宏大的叙事结构和激昂的乐章震撼了全场观众。",
    "pinyin": "zhè bù gējù yǐ hóngdà de xùshì jiégòu hé jī'áng de yuèzhāng zhènhànle quánchǎng guānzhòng",
    "vi": "Vở opera này với cấu trúc tự sự đồ sộ và những chương nhạc sôi nổi đã làm rung động toàn thể khán giả.",
    "en": "This opera stunned the audience with grand narrative structure and music.",
    "ja": "このオペラは壮大な物語構造と熱狂的な楽章によって、観客全員を震撼させました。"
  },
  {
    "zh": "坚守实体经济这一根基，能有效抵御金融市场的剧烈波动。",
    "pinyin": "jiānshǒu shítǐ jīngjì zhè yī gēnjī, néng yǒuxiào dǐyù jīnróng shìchǎng de jùliè bōdòng",
    "vi": "Giữ vững nền kinh tế thực giúp chống chọi hiệu quả biến động tài chính.",
    "en": "Holding fast to the real economy effectively withstands financial volatility.",
    "ja": "実体経済の基盤を守り抜くことで、市場の激しい変動を食い止められます。"
  },
  {
    "zh": "在多元文化交融的当下，我们要坚持文明交流与互鉴。",
    "pinyin": "zài duōyuán wénhuà jiāoróng de dāngxià, wǒmen yào jiānchí wénmíng jiāoliú yǔ hù jiàn",
    "vi": "Trong thời kỳ giao thoa đa văn hóa, ta cần duy trì học hỏi lẫn nhau.",
    "en": "In multicultural times, we should uphold cultural exchange and mutual learning.",
    "ja": "多様な文化が交わる今、文明の交流と相互学習を推進すべきです。"
  },
  {
    "zh": "无论前路多么险阻，坚定执着的信念总能照亮前行的路。",
    "pinyin": "wúlùn qián lù duōme xiǎnzǔ, jiāndìng zhízhuó de xìnniàn zǒng néng zhàoliàng qiánxíng de lù",
    "vi": "Dù phía trước hiểm trở, niềm tin kiên định luôn soi sáng đường đi.",
    "en": "No matter how rough the road ahead, unwavering faith illuminates the way.",
    "ja": "前途がいかに険しくとも、固い信念が道を照らしてくれます。"
  },
  {
    "zh": "培养具有国际视野与沟通能力的高素质人才是当务之急。",
    "pinyin": "péiyǎng jùyǒu guójì shìyě yǔ gōutōng nénglì de gāo sùzhì réncái shì dāngwùzhījí",
    "vi": "Đào tạo nhân tài có tầm nhìn quốc tế và năng lực giao tiếp là việc cấp bách.",
    "en": "Cultivating high-caliber talents with global vision is an urgent priority.",
    "ja": "国際的視野と高い対話力を持つ優秀な人材の育成は急務です。"
  },
  {
    "zh": "跨海大桥通车极大促进了沿线区域经济的一体化发展。",
    "pinyin": "kuàhǎi dàqiáo tōngchē jí dà cùjìnle yánxiàn qūyù jīngjì de yītǐhuà fāzhǎn",
    "vi": "Cầu vượt biển thông xe thúc đẩy phát triển liên kết kinh tế khu vực.",
    "en": "The bridge opening greatly boosted regional economic integration along the line.",
    "ja": "海上大橋の開通は沿線地域の経済一体化を大いに促進しました。"
  },
  {
    "zh": "无论外界环境如何变幻，始终保持从容笃定的内心最可贵。",
    "pinyin": "wúlùn wàijiè huánjìng rúhé biànhuàn, shǐzhōng bǎochí cóngróng dǔdìng de nèixīn zuì kěguì",
    "vi": "Dù hoàn cảnh đổi thay, giữ nội tâm điềm tĩnh kiên định là đáng quý nhất.",
    "en": "No matter how circumstances shift, maintaining a calm inner peace is precious.",
    "ja": "周囲の環境がどう変わろうと、心穏やかでいることが何より大切です。"
  },
  {
    "zh": "科技向善的伦理准则应当成为人工智能发展的根本底线。",
    "pinyin": "kējì xiàng shàn de lúnlǐ zhǔnzé yīngdāng chéngwéi réngōng zhìnéng fāzhǎn de gēnběn dǐxiàn",
    "vi": "Đạo đức công nghệ hướng thiện là chuẩn mực cơ bản khi phát triển AI.",
    "en": "Tech-for-good ethics must serve as the bottom line for AI development.",
    "ja": "「善のための科学技術」という規範は、AI発展の根本的基準です。"
  },
  {
    "zh": "只有胸怀理想、脚踏实地，才能在时代中书写无悔的人生。",
    "pinyin": "zhǐyǒu xiōnghuái lǐxiǎng, jiǎotàshídì, cáinéng zài shídài zhōng shūxiě wúhuǐ de rénshēng",
    "vi": "Có lý tưởng và kiên định từng bước mới viết nên cuộc đời không tiếc nuối.",
    "en": "Only with ideals and grounded effort can you write a regretless life.",
    "ja": "理想を抱き地に足をつけることで、後悔のない人生を築けます。"
  }
];

// === Chinese Reader Web Application Logic ===
