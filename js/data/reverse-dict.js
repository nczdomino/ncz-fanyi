// js/data/reverse-dict.js - High-Frequency Reverse Dictionary Dataset
// Maps Vietnamese (with & without accents), English, and Japanese phrases to Chinese keywords
// 100% Offline, Instant Response, Zero Token Cost

const REVERSE_DICT_ENTRIES = [
  // --- Giao tiếp & Xã giao (Greetings & Polite Expressions) ---
  { zh: "你好", py: "nǐ hǎo", vi: "xin chào", keys: ["xin chao", "chao ban", "hello", "hi", "こんにちは", "konnichiwa"] },
  { zh: "您好", py: "nín hǎo", vi: "chào ngài, chào bác (lịch sự)", keys: ["chao ngai", "chao bac", "hello polite", "丁寧な挨拶"] },
  { zh: "谢谢", py: "xiè xie", vi: "cảm ơn", keys: ["cam on", "thank you", "thanks", "ありがとう", "arigatou", "arigato"] },
  { zh: "不客气", py: "bú kè qi", vi: "không có gì, đừng khách sáo", keys: ["khong co gi", "dung khach sao", "you are welcome", "you're welcome", "どういたしまして"] },
  { zh: "再见", py: "zài jiàn", vi: "tạm biệt", keys: ["tam biet", "hen gap lai", "goodbye", "bye", "see you", "さようなら", "sayounara"] },
  { zh: "对不起", py: "duì bu qǐ", vi: "xin lỗi", keys: ["xin loi", "sorry", "excuse me", "ごめんなさい", "すみません", "sumimasen"] },
  { zh: "没关系", py: "méi guān xi", vi: "không sao đâu, không có gì", keys: ["khong sao", "khong sao dau", "it is okay", "it's okay", "no problem", "大丈夫", "daijoubu"] },
  { zh: "请问", py: "qǐng wèn", vi: "xin hỏi, làm phiền cho hỏi", keys: ["xin hoi", "cho hoi", "may i ask", "excuse me ask", "お尋ねします"] },
  { zh: "麻烦你", py: "má fan nǐ", vi: "làm phiền bạn", keys: ["lam phien", "phien ban", "trouble you", "お手数をおかけします"] },
  { zh: "祝贺", py: "zhù hè", vi: "chúc mừng", keys: ["chuc mung", "congratulate", "congratulations", "おめでとう", "祝う"] },

  // --- Ẩm thực, Ăn uống (Food & Drinks) ---
  { zh: "吃饭", py: "chī fàn", vi: "ăn cơm, dùng bữa", keys: ["an com", "dung bua", "an", "eat", "eating", "have a meal", "ご飯を食べる", "食事"] },
  { zh: "吃", py: "chī", vi: "ăn", keys: ["an", "eat", "eating", "ate", "たべる", "食べる"] },
  { zh: "喝水", py: "hē shuǐ", vi: "uống nước", keys: ["uong nuoc", "drink water", "水を飲む"] },
  { zh: "喝", py: "hē", vi: "uống", keys: ["uong", "drink", "drinking", "drank", "のむ", "飲む"] },
  { zh: "咖啡", py: "kā fēi", vi: "cà phê", keys: ["ca phe", "caphe", "coffee", "コーヒー"] },
  { zh: "奶茶", py: "nǎi chá", vi: "trà sữa", keys: ["tra sua", "milk tea", "bubble tea", "boba", "ミルクティー"] },
  { zh: "茶", py: "chá", vi: "trà, chè", keys: ["tra", "che", "tea", "お茶"] },
  { zh: "水", py: "shuǐ", vi: "nước", keys: ["nuoc", "water", "水"] },
  { zh: "面包", py: "miàn bāo", vi: "bánh mì", keys: ["banh mi", "bread", "パン"] },
  { zh: "面条", py: "miàn tiáo", vi: "mì sợi, mì tôm, phở", keys: ["mi", "mi soi", "mi tom", "noodles", "ラーメン", "麺"] },
  { zh: "米饭", py: "mǐ fàn", vi: "cơm trắng", keys: ["com", "com trang", "rice", "cooked rice", "ご飯", "白米"] },
  { zh: "牛肉", py: "niú ròu", vi: "thịt bò", keys: ["thit bo", "bo", "beef", "牛肉"] },
  { zh: "猪肉", py: "zhū ròu", vi: "thịt lợn, thịt heo", keys: ["thit lon", "thit heo", "pork", "豚肉"] },
  { zh: "鸡肉", py: "jī ròu", vi: "thịt gà", keys: ["thit ga", "ga", "chicken", "鶏肉"] },
  { zh: "海鲜", py: "hǎi xiān", vi: "hải sản", keys: ["hai san", "seafood", "海鮮"] },
  { zh: "蔬菜", py: "shū cài", vi: "rau củ", keys: ["rau", "rau cu", "vegetables", "veggies", "野菜"] },
  { zh: "水果", py: "shuǐ guǒ", vi: "trái cây, hoa quả", keys: ["trai cay", "hoa qua", "fruit", "fruits", "果物"] },
  { zh: "苹果", py: "píng guǒ", vi: "quả táo", keys: ["tao", "qua tao", "apple", "りんご"] },
  { zh: "香蕉", py: "xiāng jiāo", vi: "chuối", keys: ["chuoi", "banana", "バナナ"] },
  { zh: "西瓜", py: "xī guā", vi: "dưa hấu", keys: ["dua hau", "watermelon", "スイカ"] },
  { zh: "啤酒", py: "pí jiǔ", vi: "bia", keys: ["bia", "beer", "ビール"] },
  { zh: "酒", py: "jiǔ", vi: "rượu", keys: ["ruou", "alcohol", "liquor", "wine", "お酒"] },
  { zh: "早餐", py: "zǎo cān", vi: "bữa sáng, điểm tâm", keys: ["an sang", "bua sang", "diem tam", "breakfast", "朝食"] },
  { zh: "午餐", py: "wǔ cān", vi: "bữa trưa", keys: ["an trua", "bua trua", "lunch", "昼食"] },
  { zh: "晚餐", py: "wǎn cān", vi: "bữa tối", keys: ["an toi", "bua toi", "dinner", "supper", "夕食"] },
  { zh: "好吃", py: "hǎo chī", vi: "ngon miệng (đồ ăn)", keys: ["ngon", "ngon mieng", "delicious", "tasty", "yummy", "おいしい", "美味しい", "うまい"] },
  { zh: "好喝", py: "hǎo hē", vi: "ngon (đồ uống)", keys: ["uong ngon", "ngon uong", "tasty drink"] },
  { zh: "饿", py: "è", vi: "đói bụng", keys: ["doi", "doi bung", "hungry", "お腹が空いた"] },
  { zh: "饱", py: "bǎo", vi: "no bụng", keys: ["no", "no bung", "full", "お腹がいっぱい"] },
  { zh: "买单", py: "mǎi dān", vi: "thanh toán, tính tiền", keys: ["tinh tien", "thanh toan", "bill", "check please", "pay", "お会計"] },
  { zh: "菜单", py: "cài dān", vi: "thực đơn, menu", keys: ["thuc don", "menu", "メニュー"] },

  // --- Du lịch, Đi lại, Địa điểm (Travel, Transport & Places) ---
  { zh: "机场", py: "jī chǎng", vi: "sân bay, phi trường", keys: ["san bay", "phi truong", "airport", "空港"] },
  { zh: "酒店", py: "jiǔ diàn", vi: "khách sạn", keys: ["khach san", "hotel", "ホテル"] },
  { zh: "餐厅", py: "cān tīng", vi: "nhà hàng, quán ăn", keys: ["nha hang", "quan an", "restaurant", "レストラン"] },
  { zh: "医院", py: "yī yuàn", vi: "bệnh viện", keys: ["benh vien", "hospital", "病院"] },
  { zh: "药店", py: "yào diàn", vi: "nhà thuốc, tiệm thuốc", keys: ["nha thuoc", "tiem thuoc", "pharmacy", "drugstore", "薬局"] },
  { zh: "洗手间", py: "xǐ shǒu jiān", vi: "nhà vệ sinh, toilet", keys: ["nha ve sinh", "toilet", "wc", "ve sinh", "restroom", "bathroom", "トイレ", "お手洗い"] },
  { zh: "火车站", py: "huǒ chē zhàn", vi: "nhà ga tàu hỏa", keys: ["nha ga", "ga tau", "train station", "駅"] },
  { zh: "地铁站", py: "dì tiě zhàn", vi: "ga tàu điện ngầm", keys: ["tau dien ngam", "ga tau dien", "subway station", "metro station", "地下鉄駅"] },
  { zh: "公交车", py: "gōng jiāo chē", vi: "xe buýt", keys: ["xe buyt", "bus", "バス"] },
  { zh: "出租车", py: "chū zū chē", vi: "xe taxi", keys: ["xe taxi", "taxi", "cab", "タクシー"] },
  { zh: "飞机", py: "fēi jī", vi: "máy bay", keys: ["may bay", "airplane", "plane", "flight", "飛行機"] },
  { zh: "机票", py: "jī piào", vi: "vé máy bay", keys: ["ve may bay", "flight ticket", "air ticket", "航空券"] },
  { zh: "护照", py: "hù zhào", vi: "hộ chiếu", keys: ["ho chieu", "passport", "パスポート"] },
  { zh: "签证", py: "qiān zhèng", vi: "thị thực, visa", keys: ["thi thuc", "visa", "ビザ"] },
  { zh: "地图", py: "dì tú", vi: "bản đồ", keys: ["ban do", "map", "地図"] },
  { zh: "路", py: "lù", vi: "con đường", keys: ["duong", "road", "street", "way", "道"] },
  { zh: "左拐", py: "zuǒ guǎi", vi: "rẽ trái", keys: ["re trai", "turn left", "左折"] },
  { zh: "右拐", py: "yòu guǎi", vi: "rẽ phải", keys: ["re phai", "turn right", "右折"] },
  { zh: "直走", py: "zhí zǒu", vi: "đi thẳng", keys: ["di thang", "go straight", "直進"] },
  { zh: "哪里", py: "nǎ lǐ", vi: "ở đâu, chỗ nào", keys: ["o dau", "cho nao", "where", "どこ"] },

  // --- Kinh tế, Tài chính, Thương mại & Đầu tư (Business, Economics & Finance) ---
  { zh: "谈判", py: "tán pàn", vi: "đàm phán, thương lượng, thương đàm", keys: ["dam phan", "thuong luong", "negotiate", "negotiation", "交渉", "話し合い"] },
  { zh: "投资", py: "tóu zī", vi: "đầu tư", keys: ["dau tu", "invest", "investment", "投資"] },
  { zh: "经济", py: "jīng jì", vi: "kinh tế", keys: ["kinh te", "economy", "economics", "経済", "けいざい"] },
  { zh: "市场", py: "shì chǎng", vi: "thị trường", keys: ["thi truong", "market", "marketplace", "市場"] },
  { zh: "利润", py: "lì rùn", vi: "lợi nhuận, tiền lãi", keys: ["loi nhuan", "tien lai", "profit", "gain", "利益", "利潤"] },
  { zh: "风险", py: "fēng xiǎn", vi: "rủi ro, nguy cơ", keys: ["rui ro", "nguy co", "risk", "hazard", "リスク", "危険"] },
  { zh: "合作", py: "hé zuò", vi: "hợp tác, phối hợp", keys: ["hop tac", "cooperation", "collaborate", "partnership", "協力", "提携"] },
  { zh: "竞争", py: "jìng zhēng", vi: "cạnh tranh, thi đua", keys: ["canh tranh", "competition", "compete", "競争"] },
  { zh: "破产", py: "pò chǎn", vi: "phá sản", keys: ["pha san", "bankrupt", "bankruptcy", "倒産", "破産"] },
  { zh: "股票", py: "gǔ piào", vi: "cổ phiếu, chứng khoán", keys: ["co phieu", "chung khoan", "stock", "shares", "株", "株式"] },
  { zh: "汇率", py: "huì lǜ", vi: "tỷ giá hối đoái", keys: ["ty gia", "exchange rate", "為替レート"] },
  { zh: "关税", py: "guān shuì", vi: "thuế quan", keys: ["thue quan", "tariff", "customs duty", "関税"] },

  // --- Công nghệ, AI & Kỹ thuật số (Technology & AI) ---
  { zh: "人工智能", py: "rén gōng zhì néng", vi: "trí tuệ nhân tạo, AI", keys: ["tri tue nhan tao", "ai", "artificial intelligence", "人工知能"] },
  { zh: "电脑", py: "diàn nǎo", vi: "máy tính, vi tính", keys: ["may tinh", "computer", "pc", "パソコン", "コンピューター"] },
  { zh: "手机", py: "shǒu jī", vi: "điện thoại di động", keys: ["dien thoai", "smartphone", "mobile phone", "携帯", "スマホ"] },
  { zh: "软件", py: "ruǎn jiàn", vi: "phần mềm", keys: ["phan mem", "software", "app", "application", "ソフトウェア", "アプリ"] },
  { zh: "硬件", py: "yìng jiàn", vi: "phần cứng", keys: ["phan cung", "hardware", "ハードウェア"] },
  { zh: "数据", py: "shù jù", vi: "dữ liệu", keys: ["du lieu", "data", "database", "データ"] },
  { zh: "算法", py: "suàn fǎ", vi: "thuật toán", keys: ["thuat toan", "algorithm", "アルゴリズム"] },
  { zh: "互联网", py: "hù lián wǎng", vi: "mạng internet", keys: ["internet", "mang internet", "インターネット"] },
  { zh: "社交网络", py: "shè jiāo wǎng luò", vi: "mạng xã hội, MXH", keys: ["mang xa hoi", "mxh", "social network", "sns", "ソーシャルネット"] },
  { zh: "云计算", py: "yún jì suàn", vi: "điện toán đám mây", keys: ["dam may", "cloud computing", "クラウド"] },
  { zh: "自动", py: "zì dòng", vi: "tự động", keys: ["tu dong", "automatic", "auto", "自動"] },
  { zh: "密码", py: "mì mǎ", vi: "mật khẩu, password", keys: ["mat khau", "password", "pin", "パスワード"] },

  // --- Công sở, Học tập (Work & Study) ---
  { zh: "工作", py: "gōng zuò", vi: "công việc, làm việc", keys: ["cong viec", "lam viec", "work", "job", "working", "仕事", "働く"] },
  { zh: "上班", py: "shàng bān", vi: "đi làm, vào ca", keys: ["di lam", "vao ca", "go to work", "出勤"] },
  { zh: "下班", py: "xià bān", vi: "tan làm, hết ca", keys: ["tan lam", "het ca", "off work", "finish work", "退勤"] },
  { zh: "加班", py: "jiā bān", vi: "tăng ca, làm thêm giờ", keys: ["tang ca", "lam them", "overtime", "ot", "残業"] },
  { zh: "工资", py: "gōng zī", vi: "tiền lương", keys: ["luong", "tien luong", "salary", "wage", "pay", "給料"] },
  { zh: "老板", py: "lǎo bǎn", vi: "ông chủ, sếp", keys: ["sep", "ong chu", "boss", "employer", "上司", "社長"] },
  { zh: "经理", py: "jīng lǐ", vi: "giám đốc, quản lý", keys: ["giam doc", "quan ly", "manager", "director", "マネージャー", "支配人"] },
  { zh: "同事", py: "tóng shì", vi: "đồng nghiệp", keys: ["dong nghiep", "colleague", "coworker", "同僚"] },
  { zh: "开会", py: "kāi huì", vi: "họp, mở cuộc họp", keys: ["hop", "cuoc hop", "meeting", "have a meeting", "会議"] },
  { zh: "合同", py: "hé tong", vi: "hợp đồng", keys: ["hop dong", "contract", "agreement", "契約"] },
  { zh: "请假", py: "qǐng jià", vi: "xin nghỉ phép", keys: ["xin nghi", "nghi phep", "ask for leave", "休暇届"] },
  { zh: "失业", py: "shī yè", vi: "thất nghiệp", keys: ["that nghiep", "unemployed", "lose job", "失業"] },
  { zh: "学习", py: "xué xí", vi: "học tập, nghiên cứu", keys: ["hoc", "hoc tap", "study", "studying", "learn", "learning", "勉強", "学ぶ"] },
  { zh: "老师", py: "lǎo shī", vi: "thầy giáo, cô giáo", keys: ["thay giao", "co giao", "giao vien", "teacher", "先生", "教師"] },
  { zh: "学生", py: "xué sheng", vi: "học sinh, sinh viên", keys: ["hoc sinh", "sinh vien", "student", "pupil", "学生", "生徒"] },
  { zh: "学校", py: "xué xiào", vi: "trường học", keys: ["truong hoc", "truong", "school", "学校"] },
  { zh: "考试", py: "kǎo shì", vi: "thi cử, kỳ thi", keys: ["thi", "thi cu", "ky thi", "exam", "test", "examination", "試験", "テスト"] },
  { zh: "作业", py: "zuò yè", vi: "bài tập về nhà", keys: ["bai tap", "homework", "assignment", "宿題"] },
  { zh: "毕业", py: "bì yè", vi: "tốt nghiệp", keys: ["tot nghiep", "graduate", "graduation", "卒業"] },

  // --- Xã hội, Môi trường & Triết lý sống (Society, Nature & Life) ---
  { zh: "环境", py: "huán jìng", vi: "môi trường, hoàn cảnh", keys: ["moi truong", "environment", "circumstance", "環境", "かんきょう"] },
  { zh: "坚持", py: "jiān chí", vi: "kiên trì, bền bỉ đến cùng", keys: ["kien tri", "persevere", "persist", "あきらめない", "堅持する"] },
  { zh: "意外", py: "yì wài", vi: "bất ngờ, ngoài ý muốn, sự cố", keys: ["bat ngo", "ngac nhien", "unexpected", "accident", "意外", "おもいがけない"] },
  { zh: "发展", py: "fā zhǎn", vi: "phát triển", keys: ["phat trien", "develop", "development", "発展"] },
  { zh: "成功", py: "chéng gōng", vi: "thành công", keys: ["thanh cong", "success", "succeed", "成功"] },
  { zh: "失败", py: "shī bài", vi: "thất bại", keys: ["that bai", "fail", "failure", "失敗"] },
  { zh: "希望", py: "xī wàng", vi: "hy vọng, mong ước", keys: ["hy vong", "hope", "wish", "希望"] },
  { zh: "未来", py: "wèi lái", vi: "tương lai", keys: ["tuong lai", "future", "未来"] },
  { zh: "过去", py: "guò qù", vi: "quá khứ, ngày xưa", keys: ["qua khu", "past", "過去"] },
  { zh: "现在", py: "xiàn zài", vi: "hiện tại, bây giờ", keys: ["bay gio", "hien tai", "now", "present", "現在", "今"] },
  { zh: "责任", py: "zé rèn", vi: "trách nhiệm", keys: ["trach nhiem", "responsibility", "duty", "責任"] },
  { zh: "自由", py: "zì yóu", vi: "tự do", keys: ["tu do", "freedom", "liberty", "自由"] },

  // --- Gia đình, Mối quan hệ (Family & Relationships) ---
  { zh: "爸爸", py: "bà ba", vi: "bố, ba, cha", keys: ["bo", "ba", "cha", "father", "dad", "お父さん", "父"] },
  { zh: "妈妈", py: "mā ma", vi: "mẹ, má", keys: ["me", "ma", "mother", "mom", "お母さん", "母"] },
  { zh: "哥哥", py: "gē ge", vi: "anh trai", keys: ["anh trai", "older brother", "お兄さん", "兄"] },
  { zh: "弟弟", py: "dì di", vi: "em trai", keys: ["em trai", "younger brother", "弟"] },
  { zh: "姐姐", py: "jiě jie", vi: "chị gái", keys: ["chi gai", "older sister", "お姉さん", "姉"] },
  { zh: "妹妹", py: "mèi mei", vi: "em gái", keys: ["em gai", "younger sister", "妹"] },
  { zh: "朋友", py: "péng you", vi: "bạn bè", keys: ["ban be", "ban", "friend", "friends", "友達"] },
  { zh: "男朋友", py: "nán péng you", vi: "bạn trai, người yêu nam", keys: ["ban trai", "nguoi yeu", "boyfriend", "彼氏"] },
  { zh: "女朋友", py: "nǚ péng you", vi: "bạn gái, người yêu nữ", keys: ["ban gai", "girlfriend", "彼女"] },
  { zh: "老公", py: "lǎo gōng", vi: "chồng (thân mật)", keys: ["chong", "husband", "夫", "旦那"] },
  { zh: "老婆", py: "lǎo po", vi: "vợ (thân mật)", keys: ["vo", "wife", "妻", "嫁"] },
  { zh: "孩子", py: "hái zi", vi: "con cái, đứa trẻ", keys: ["con", "con cai", "dua tre", "child", "children", "kid", "子ども"] },

  // --- Cảm xúc & Tâm trạng (Emotions & States) ---
  { zh: "喜欢", py: "xǐ huan", vi: "thích", keys: ["thich", "like", "liking", "fond of", "好き", "すき"] },
  { zh: "爱", py: "ài", vi: "yêu, thương", keys: ["yeu", "thuong", "love", "loving", "loved", "愛", "あい"] },
  { zh: "想念", py: "xiǎng niàn", vi: "nhớ nhung", keys: ["nho", "nho nhung", "miss", "missing", "恋しい"] },
  { zh: "高兴", py: "gāo xìng", vi: "vui vẻ, phấn khởi", keys: ["vui", "vui ve", "happy", "glad", "pleased", "嬉しい", "楽しい"] },
  { zh: "难过", py: "nán guò", vi: "buồn rầu, đau lòng", keys: ["buon", "dau long", "sad", "sorrow", "grief", "悲しい", "辛い"] },
  { zh: "哭", py: "kū", vi: "khóc", keys: ["khoc", "cry", "crying", "泣く"] },
  { zh: "笑", py: "xiào", vi: "cười", keys: ["cuoi", "laugh", "laughing", "smile", "smiling", "笑う"] },
  { zh: "生气", py: "shēng qì", vi: "tức giận, bực mình", keys: ["tuc gian", "buc minh", "gian", "angry", "mad", "upset", "怒る", "腹が立つ"] },
  { zh: "累", py: "lèi", vi: "mệt mỏi", keys: ["met", "met moi", "tired", "exhausted", "疲れた", "つかれた"] },
  { zh: "怕", py: "pà", vi: "sợ hãi", keys: ["so", "so hai", "scared", "afraid", "fear", "怖い"] },
  { zh: "着急", py: "zháo jí", vi: "lo lắng, sốt ruột", keys: ["lo lang", "sot ruot", "anxious", "worried", "焦る", "心配"] },
  { zh: "忙", py: "máng", vi: "bận rộn", keys: ["ban", "ban ron", "busy", "忙しい"] },
  { zh: "漂亮", py: "piào liang", vi: "xinh đẹp, đẹp đẽ", keys: ["dep", "xinh", "xinh dep", "beautiful", "pretty", "gorgeous", "綺麗", "きれい", "かわいい", "可愛い"] },
  { zh: "帅", py: "shuài", vi: "đẹp trai", keys: ["dep trai", "handsome", "cool", "かっこいい", "イケメン"] },

  // --- Mua sắm & Tiền bạc (Shopping & Money) ---
  { zh: "多少钱", py: "duō shao qián", vi: "bao nhiêu tiền", keys: ["bao nhieu tien", "how much", "how much money", "いくら"] },
  { zh: "钱", py: "qián", vi: "tiền bạc", keys: ["tien", "tien bac", "money", "cash", "お金"] },
  { zh: "太贵了", py: "tài guì le", vi: "đắt quá", keys: ["dat qua", "dat", "too expensive", "expensive", "高すぎる"] },
  { zh: "便宜", py: "pián yi", vi: "rẻ, giá cả hợp lý", keys: ["re", "cheap", "inexpensive", "安い"] },
  { zh: "打折", py: "dǎ zhé", vi: "giảm giá, chiết khấu", keys: ["giam gia", "chiet khau", "discount", "sale", "割引", "セール"] },
  { zh: "买", py: "mǎi", vi: "mua", keys: ["mua", "buy", "buying", "bought", "purchase", "買う"] },
  { zh: "卖", py: "mài", vi: "bán", keys: ["ban", "sell", "selling", "sold", "売る"] },
  { zh: "现金", py: "xiàn jīn", vi: "tiền mặt", keys: ["tien mat", "cash", "現金"] },
  { zh: "微信支付", py: "wēi xìn zhī fù", vi: "thanh toán WeChat Pay", keys: ["wechat pay", "thanh toan wechat", "微信"] },
  { zh: "支付宝", py: "zhī fù bǎo", vi: "Alipay", keys: ["alipay", "thanh toan alipay"] },

  // --- Khẩn cấp & Cứu trợ (Emergency & Assistance) ---
  { zh: "救命", py: "jiù mìng", vi: "cứu tôi với, cứu mạng", keys: ["cuu toi voi", "cuu mang", "help me", "save me", "助けて"] },
  { zh: "帮帮我", py: "bāng bang wǒ", vi: "xin hãy giúp tôi", keys: ["giup toi", "giup voi", "help please", "手伝って"] },
  { zh: "警察", py: "jǐng chá", vi: "cảnh sát, công an", keys: ["canh sat", "cong an", "police", "cop", "警察"] },
  { zh: "救护车", py: "jiù hù chē", vi: "xe cấp cứu", keys: ["xe cap cuu", "cap cuu", "ambulance", "救急車"] },
  { zh: "迷路", py: "mí lù", vi: "lạc đường", keys: ["lac duong", "lac", "lost", "get lost", "道に迷う"] },
  { zh: "危险", py: "wēi xiǎn", vi: "nguy hiểm", keys: ["nguy hiem", "dangerous", "danger", "危険"] },

  // --- Thời gian & Ngày tháng (Time & Dates) ---
  { zh: "今天", py: "jīn tiān", vi: "hôm nay", keys: ["hom nay", "today", "今日", "きょう"] },
  { zh: "明天", py: "míng tiān", vi: "ngày mai", keys: ["ngay mai", "tomorrow", "明日", "あした"] },
  { zh: "昨天", py: "zuó tiān", vi: "hôm qua", keys: ["hom qua", "yesterday", "昨日", "きのう"] },
  { zh: "几点", py: "jǐ diǎn", vi: "mấy giờ", keys: ["may gio", "what time", "何時"] },
  { zh: "早上", py: "zǎo shang", vi: "buổi sáng", keys: ["sang", "buoi sang", "morning", "朝"] },
  { zh: "中午", py: "zhōng wǔ", vi: "buổi trưa", keys: ["trua", "buoi trua", "noon", "midday", "昼"] },
  { zh: "下午", py: "xià wǔ", vi: "buổi chiều", keys: ["chieu", "buoi chieu", "afternoon", "午後"] },
  { zh: "晚上", py: "wǎn shang", vi: "buổi tối, ban đêm", keys: ["toi", "buoi toi", "dem", "evening", "night", "夜", "晩"] },

  // --- Bổ sung: tiếng Nhật (kana) ---
  // Người Nhật gõ kana, không gõ Hán tự. Không có các khoá này thì でんしゃ / でんわ /
  // ねむい / おはよう đều không tra được gì.
  { zh: "电车", py: "diàn chē", vi: "tàu điện", keys: ["でんしゃ", "densha", "電車"] },
  { zh: "电话", py: "diàn huà", vi: "điện thoại", keys: ["でんわ", "denwa", "電話"] },
  { zh: "公司", py: "gōng sī", vi: "công ty", keys: ["かいしゃ", "kaisha", "会社"] },
  { zh: "车站", py: "chē zhàn", vi: "ga, bến xe", keys: ["えき", "eki", "駅"] },
  { zh: "老师", py: "lǎo shī", vi: "giáo viên, thầy cô", keys: ["せんせい", "sensei", "先生"] },
  { zh: "朋友", py: "péng you", vi: "bạn bè", keys: ["ともだち", "tomodachi", "友達", "友だち"] },
  { zh: "困", py: "kùn", vi: "buồn ngủ", keys: ["ねむい", "nemui", "眠い"] },
  { zh: "高兴", py: "gāo xìng", vi: "vui", keys: ["うれしい", "ureshii", "嬉しい"] },
  { zh: "开心", py: "kāi xīn", vi: "vui vẻ", keys: ["たのしい", "tanoshii", "楽しい"] },
  { zh: "难过", py: "nán guò", vi: "buồn", keys: ["かなしい", "kanashii", "悲しい"] },
  { zh: "早上好", py: "zǎo shang hǎo", vi: "chào buổi sáng", keys: ["おはよう", "ohayou", "ohayo", "おはようございます"] },
  { zh: "晚上好", py: "wǎn shang hǎo", vi: "chào buổi tối", keys: ["こんばんは", "konbanwa"] },
  { zh: "晚安", py: "wǎn ān", vi: "chúc ngủ ngon", keys: ["おやすみ", "oyasumi", "おやすみなさい"] },
  { zh: "再见", py: "zài jiàn", vi: "tạm biệt", keys: ["またね", "matane", "じゃあね"] },
  { zh: "对不起", py: "duì bu qǐ", vi: "xin lỗi", keys: ["ごめん", "gomen", "ごめんなさい"] },
  { zh: "吃", py: "chī", vi: "ăn", keys: ["たべる", "taberu", "食べる"] },
  { zh: "喝", py: "hē", vi: "uống", keys: ["のむ", "nomu", "飲む"] },
  { zh: "看", py: "kàn", vi: "xem, nhìn", keys: ["みる", "miru", "見る"] },
  { zh: "去", py: "qù", vi: "đi", keys: ["いく", "iku", "行く"] },
  { zh: "来", py: "lái", vi: "đến", keys: ["くる", "kuru", "来る"] },
  { zh: "水", py: "shuǐ", vi: "nước", keys: ["みず", "mizu"] },
  { zh: "山", py: "shān", vi: "núi", keys: ["やま", "yama"] },
  { zh: "川", py: "chuān", vi: "sông", keys: ["かわ", "kawa"] },
  { zh: "海", py: "hǎi", vi: "biển", keys: ["うみ", "umi"] },
  { zh: "空", py: "kōng", vi: "trời, không", keys: ["そら", "sora"] },
  { zh: "雨", py: "yǔ", vi: "mưa", keys: ["あめ", "ame"] },
  { zh: "雪", py: "xuě", vi: "tuyết", keys: ["ゆき", "yuki"] },
  { zh: "风", py: "fēng", vi: "gió", keys: ["かぜ", "kaze"] },
  { zh: "花", py: "huā", vi: "hoa", keys: ["はな", "hana"] },
  { zh: "星", py: "xīng", vi: "sao", keys: ["ほし", "hoshi"] },
  { zh: "米饭", py: "mǐ fàn", vi: "cơm", keys: ["ごはん", "gohan"] },
  { zh: "日本", py: "rì běn", vi: "Nhật Bản", keys: ["にほん", "nihon", "にっぽん"] },
  { zh: "中国", py: "zhōng guó", vi: "Trung Quốc", keys: ["ちゅうごく", "chuugoku"] },
  { zh: "学校", py: "xué xiào", vi: "trường học", keys: ["がっこう", "gakkou"] },
  { zh: "家", py: "jiā", vi: "nhà", keys: ["いえ", "ie", "うち", "uchi"] },
  { zh: "工作", py: "gōng zuò", vi: "công việc, làm việc", keys: ["しごと", "shigoto"] },
  { zh: "学", py: "xué", vi: "học", keys: ["まなぶ", "manabu", "学ぶ"] },
  { zh: "书", py: "shū", vi: "sách", keys: ["ほん", "hon"] },

  // --- Bổ sung: cụm tiếng Việt thông dụng còn thiếu ---
  { zh: "睡觉", py: "shuì jiào", vi: "ngủ", keys: ["di ngu", "đi ngủ"] },
  { zh: "想家", py: "xiǎng jiā", vi: "nhớ nhà", keys: ["nho nha", "nhớ nhà"] },
  { zh: "相爱", py: "xiāng ài", vi: "yêu nhau", keys: ["yeu nhau", "yêu nhau"] },
  { zh: "放学", py: "fàng xué", vi: "tan học", keys: ["tan hoc", "tan học"] },
  { zh: "喝咖啡", py: "hē kā fēi", vi: "uống cà phê", keys: ["uong ca phe", "uống cà phê"] },
  { zh: "起床", py: "qǐ chuáng", vi: "thức dậy", keys: ["thuc day", "thức dậy"] },
  { zh: "回家", py: "huí jiā", vi: "về nhà", keys: ["ve nha", "về nhà"] },
  { zh: "米粉", py: "mǐ fěn", vi: "bún", keys: ["bun cha", "bún chả", "bun", "bún"] },
  { zh: "河粉", py: "hé fěn", vi: "phở", keys: ["pho", "phở"] },
  { zh: "摩托车", py: "mó tuō chē", vi: "xe máy", keys: ["xe may", "xe máy"] },
  { zh: "奥黛", py: "ào dài", vi: "áo dài", keys: ["ao dai", "áo dài"] },
  { zh: "生日快乐", py: "shēng rì kuài lè", vi: "chúc mừng sinh nhật", keys: ["sinh nhat", "sinh nhật", "happy birthday"] },
  { zh: "帮帮我", py: "bāng bang wǒ", vi: "giúp tôi với", keys: ["giup toi voi", "giúp tôi với"] },
  { zh: "让我看看", py: "ràng wǒ kàn kan", vi: "cho tôi xem", keys: ["cho toi xem", "cho tôi xem"] },
  { zh: "非常感谢", py: "fēi cháng gǎn xiè", vi: "cảm ơn rất nhiều", keys: ["cam on rat nhieu", "cảm ơn rất nhiều"] },
  { zh: "我爱你", py: "wǒ ài nǐ", vi: "tôi yêu bạn", keys: ["toi yeu ban", "tôi yêu bạn", "anh yeu em", "em yeu anh"] },
  { zh: "你好吗", py: "nǐ hǎo ma", vi: "bạn khỏe không", keys: ["ban khoe khong", "bạn khỏe không", "how are you"] },

  // --- Bổ sung: cụm tiếng Anh thông dụng ---
  { zh: "大", py: "dà", vi: "to, lớn", keys: ["very big", "big", "large"] },
  { zh: "吃", py: "chī", vi: "ăn", keys: ["to eat", "eat"] },
  { zh: "去", py: "qù", vi: "đi", keys: ["to go", "go"] },
  { zh: "我爱你", py: "wǒ ài nǐ", vi: "tôi yêu bạn", keys: ["i love you", "love you"] },
  { zh: "多少钱", py: "duō shao qián", vi: "bao nhiêu tiền", keys: ["how much", "how much money"] }
];

// Inverted lookup map for O(1) direct phrase lookup
const REVERSE_DICT_INDEX = new Map();

// The index is built at load time, but stripVietnameseTones() lives in
// js/features/dict-search-engine.js and may not exist yet at that moment. Previously the
// first (tone-unaware) build was cached forever, so accented Vietnamese keys never got
// their unaccented variants. Track how the index was built and rebuild once when the
// helper shows up.
let _reverseIndexToneAware = false;

function buildReverseDictIndex() {
  const canStrip = typeof stripVietnameseTones === 'function';
  if (REVERSE_DICT_INDEX.size > 0 && (_reverseIndexToneAware || !canStrip)) return;
  REVERSE_DICT_INDEX.clear();
  _reverseIndexToneAware = canStrip;
  for (const item of REVERSE_DICT_ENTRIES) {
    for (const k of item.keys) {
      const cleanKey = k.trim().toLowerCase();
      const noTone = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(cleanKey) : cleanKey;
      for (const keyVariant of [cleanKey, noTone]) {
        if (!REVERSE_DICT_INDEX.has(keyVariant)) {
          REVERSE_DICT_INDEX.set(keyVariant, []);
        }
        const arr = REVERSE_DICT_INDEX.get(keyVariant);
        if (!arr.some(x => x.zh === item.zh)) {
          arr.push(item);
        }
      }
    }
  }
}
buildReverseDictIndex();

// Look up reverse entries matching a query
function findReverseMatches(query, limit = 25) {
  if (!query) return [];
  const qClean = query.trim().toLowerCase();
  // Chinese Hanzi queries look up directly in Chinese dictionary, skip reverse dict
  if (/[\u4e00-\u9fff]/.test(qClean)) return [];

  buildReverseDictIndex();
  const qNoTone = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(qClean) : qClean;

  const results = [];
  const seenZh = new Set();

  // 1. Direct index match (exact phrase / word match)
  const direct = REVERSE_DICT_INDEX.get(qClean) || REVERSE_DICT_INDEX.get(qNoTone) || [];
  for (const it of direct) {
    if (!seenZh.has(it.zh)) {
      seenZh.add(it.zh);
      results.push({ ...it, matchType: 'exact', score: 1000 });
    }
  }

  // 2. Strict Prefix or Multi-word phrase matching (strictly no loose substring matching)
  if (qNoTone.length >= 3) {
    for (const item of REVERSE_DICT_ENTRIES) {
      if (seenZh.has(item.zh)) continue;
      let matched = false;
      let score = 0;

      for (const k of item.keys) {
        const kClean = k.toLowerCase();
        const kNoTone = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(kClean) : kClean;

        // Prefix match: user is typing e.g. "san b" -> "san bay"
        if (kClean.startsWith(qClean) || kNoTone.startsWith(qNoTone)) {
          matched = true;
          score = Math.max(score, 650);
          break;
        }

        // Multi-word phrase contains when query has spaces
        if (qNoTone.includes(' ') && (kClean.includes(qClean) || kNoTone.includes(qNoTone))) {
          matched = true;
          score = Math.max(score, 600);
          break;
        }
      }

      if (matched) {
        seenZh.add(item.zh);
        results.push({ ...item, matchType: 'partial', score });
        if (results.length >= limit) break;
      }
    }
  }

  return results;
}

if (typeof window !== 'undefined') {
  window.REVERSE_DICT_ENTRIES = REVERSE_DICT_ENTRIES;
  window.findReverseMatches = findReverseMatches;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    REVERSE_DICT_ENTRIES,
    findReverseMatches,
  };
}
