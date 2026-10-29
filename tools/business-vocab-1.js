/**
 * tools/business-vocab-1.js
 * Vocabulary for Categories:
 * 1. basic (商务基础)
 * 2. workplace (公司与职场)
 * 3. communication (商务沟通)
 * 4. sales_purchasing (销售与采购)
 */

module.exports = [
  // --- 1. BASIC (商务基础) ---
  {
    id: 'bc_basic_001',
    term: '贵公司',
    pinyin: 'guì gōngsī',
    partOfSpeech: 'noun',
    category: 'basic',
    level: 'beginner',
    tags: ['honorific', 'etiquette', 'company'],
    translations: {
      vi: { meaning: 'Quý công ty', note: 'Cách gọi lịch sự, trang trọng khi xưng hô với công ty đối tác.' },
      ja: { meaning: '貴社 / 貴社様', note: '相手の会社を敬って呼ぶ表現。' },
      en: { meaning: 'your esteemed company', note: 'Polite honorific used to address a partner company.' }
    },
    examples: [
      {
        zh: '我们非常希望与贵公司建立长期的合作关系。',
        pinyin: 'Wǒmen fēicháng xīwàng yǔ guì gōngsī jiànlì chángqī de hézuò guānxì.',
        translations: {
          vi: 'Chúng tôi rất hy vọng được thiết lập quan hệ hợp tác lâu dài với quý công ty.',
          ja: '貴社と長期的な協力関係を築くことを心より希望しております。',
          en: 'We sincerely hope to establish a long-term cooperative relationship with your company.'
        }
      }
    ],
    businessTip: {
      vi: 'Khi xưng hô công ty của mình dùng "我司" (wǒ sī - công ty chúng tôi) hoặc "我们公司", không bao giờ dùng "贵公司" cho chính mình.',
      ja: '自社を指すときは「我司」または「我们公司」（弊社）を使い、「贵公司」は相手にのみ使います。',
      en: 'Always use 贵公司 to refer to the counterparty. Refer to your own company as 我司 (our company).'
    }
  },
  {
    id: 'bc_basic_002',
    term: '我司',
    pinyin: 'wǒ sī',
    partOfSpeech: 'noun',
    category: 'basic',
    level: 'beginner',
    tags: ['company', 'written', 'formal'],
    translations: {
      vi: { meaning: 'Công ty chúng tôi (bổn công ty / công ty tôi)', note: 'Văn phong thương mại trang trọng thường dùng trong email, hợp đồng.' },
      ja: { meaning: '弊社 / 当社', note: 'ビジネス文書・メールで自社を指す定番の謙称。' },
      en: { meaning: 'our company', note: 'Formal written term for referring to one\'s own company.' }
    },
    examples: [
      {
        zh: '我司主营各类电子配件的进出口业务。',
        pinyin: 'Wǒ sī zhǔyíng gèlèi diànzǐ pèijiàn de jìnchūkǒu yèwù.',
        translations: {
          vi: 'Công ty chúng tôi kinh doanh chủ yếu các dịch vụ xuất nhập khẩu linh kiện điện tử.',
          ja: '当社は各種電子部品の輸出入業務を主幹事業としております。',
          en: 'Our company specializes in the import and export of various electronic accessories.'
        }
      }
    ]
  },
  {
    id: 'bc_basic_003',
    term: '拜访',
    pinyin: 'bàifǎng',
    partOfSpeech: 'verb',
    category: 'basic',
    level: 'beginner',
    tags: ['meeting', 'etiquette', 'courtesy'],
    translations: {
      vi: { meaning: 'Đến thăm / ghé thăm / bái phỏng', note: 'Dùng khi đến thăm đối tác hoặc khách hàng một cách lịch sự.' },
      ja: { meaning: '訪問する / お伺いする', note: '取引先を敬意をもって訪ねる行為。' },
      en: { meaning: 'to visit / to pay a visit', note: 'Formal term for business visits to partners or clients.' }
    },
    examples: [
      {
        zh: '下周二下午我们想去拜访您，请问您方便吗？',
        pinyin: 'Xià zhōu\'èr xiàwǔ wǒmen xiǎng qù bàifǎng nín, qǐngwèn nín fāngbiàn ma?',
        translations: {
          vi: 'Chiều thứ Ba tuần tới chúng tôi muốn đến thăm anh/chị, xin hỏi anh/chị có tiện không?',
          ja: '来週の火曜日の午後に貴社をご訪問したいのですが、ご都合はいかがでしょうか？',
          en: 'We would like to visit you next Tuesday afternoon. Would that be convenient for you?'
        }
      }
    ]
  },
  {
    id: 'bc_basic_004',
    term: '名片',
    pinyin: 'míngpiàn',
    partOfSpeech: 'noun',
    category: 'basic',
    level: 'beginner',
    tags: ['networking', 'etiquette', 'card'],
    translations: {
      vi: { meaning: 'Danh thiếp / namecard', note: 'Trao đổi danh thiếp là nghi thức mở đầu buổi gặp gỡ kinh doanh.' },
      ja: { meaning: '名刺', note: 'ビジネスの初対面で必ず交わすもの。' },
      en: { meaning: 'business card', note: 'Exchanged at the beginning of meetings.' }
    },
    examples: [
      {
        zh: '这是我的名片，上面有我的手机和微信号。',
        pinyin: 'Zhè shì wǒ de míngpiàn, shàngmiàn yǒu wǒ de shǒujī hé Wēixìn hào.',
        translations: {
          vi: 'Đây là danh thiếp của tôi, trên đó có số điện thoại và tài khoản WeChat của tôi.',
          ja: 'こちらは私の名刺です。携帯番号とWeChatのIDが記載されております。',
          en: 'Here is my business card, with my mobile number and WeChat ID on it.'
        }
      }
    ],
    businessTip: {
      vi: 'Trong văn hóa kinh doanh Trung Quốc, luôn dùng hai tay khi đưa và nhận danh thiếp, đồng thời nhìn vào danh thiếp vài giây để thể hiện sự tôn trọng.',
      ja: '中国の商習慣でも名刺は必ず両手で差し出し、両手で受け取り、数秒間しっかり見るのがマナーです。',
      en: 'Always give and receive business cards with both hands in Chinese business culture.'
    }
  },
  {
    id: 'bc_basic_005',
    term: '祝商祺',
    pinyin: 'zhù shāng qí',
    partOfSpeech: 'phrase',
    category: 'basic',
    level: 'intermediate',
    tags: ['email', 'salutation', 'sign-off'],
    translations: {
      vi: { meaning: 'Chúc công việc kinh doanh phát đạt', note: 'Lời chúc kết thúc email hoặc thư từ thương mại kinh điển.' },
      ja: { meaning: '貴社のますますのご発展をお祈り申し上げます', note: 'ビジネスメール末尾の結びの定番挨拶。' },
      en: { meaning: 'Best regards / Wishing you prosperity in business', note: 'Traditional Chinese business email sign-off phrase.' }
    },
    examples: [
      {
        zh: '如有任何问题，请随时与我们联系。顺祝商祺！',
        pinyin: 'Rú yǒu rènhé wèntí, qǐng suíshí yǔ wǒmen liánxì. Shùn zhù shāng qí!',
        translations: {
          vi: 'Nếu có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi bất cứ lúc nào. Chúc việc kinh doanh thuận lợi!',
          ja: 'ご不明な点がございましたら、いつでもご連絡ください。草々 / 順祝商祺！',
          en: 'If you have any questions, please feel free to contact us. Best regards!'
        }
      }
    ]
  },
  {
    id: 'bc_basic_006',
    term: '联系方式',
    pinyin: 'liánxì fāngshì',
    partOfSpeech: 'noun',
    category: 'basic',
    level: 'beginner',
    tags: ['contact', 'communication'],
    translations: {
      vi: { meaning: 'Thông tin liên hệ / phương thức liên lạc', note: 'Bao gồm email, số điện thoại, WeChat, WhatsApp.' },
      ja: { meaning: '連絡先 / 連絡方法', note: '電話、メール、WeChat等のコンタクト先。' },
      en: { meaning: 'contact information', note: 'Ways to reach someone (phone, email, messaging).' }
    },
    examples: [
      {
        zh: '请留下您的联系方式，方便我们后续发送详细资料。',
        pinyin: 'Qǐng liú xià nín de liánxì fāngshì, fāngbiàn wǒmen hòuxù fāsòng xiángxì zīliào.',
        translations: {
          vi: 'Xin vui lòng để lại thông tin liên hệ của bạn để chúng tôi tiện gửi tài liệu chi tiết sau này.',
          ja: '後ほど詳細資料をお送りいたしますので、ご連絡先をお教えいただけますでしょうか。',
          en: 'Please leave your contact information so we can follow up with detailed materials.'
        }
      }
    ]
  },

  // --- 2. WORKPLACE (公司与职场) ---
  {
    id: 'bc_work_001',
    term: '总经理',
    pinyin: 'zǒng jīnglǐ',
    partOfSpeech: 'noun',
    category: 'workplace',
    level: 'beginner',
    tags: ['role', 'title', 'management'],
    translations: {
      vi: { meaning: 'Tổng giám đốc (thường viết tắt là 总 - Zǒng)', note: 'Người chịu trách nhiệm điều hành toàn bộ công ty.' },
      ja: { meaning: '社長 / 総支配人 / ゼネラルマネージャー', note: '企業の最高執行責任者・トップ。' },
      en: { meaning: 'General Manager (GM) / CEO', note: 'Top executive of a company.' }
    },
    examples: [
      {
        zh: '王总，这是关于下半年预算的最终报告。',
        pinyin: 'Wáng zǒng, zhè shì guānyú xiàbànnián yùsuàn de zuìzhōng bàogào.',
        translations: {
          vi: 'Tổng giám đốc Vương, đây là báo cáo cuối cùng về ngân sách nửa cuối năm.',
          ja: '王社長、こちらが下半期の予算に関する最終報告書でございます。',
          en: 'General Manager Wang, this is the final report regarding the budget for the second half of the year.'
        }
      }
    ],
    businessTip: {
      vi: 'Người Trung Quốc thường gọi họ + 总 (ví dụ: Vương tổng -> 王总, Lý tổng -> 李总) để thể hiện sự kính trọng.',
      ja: '中国では「苗字＋总」（王总、李总など）と呼ぶのが親しみと敬意を表す一般的なビジネスマナーです。',
      en: 'In Chinese business, address directors and executives as [Surname] + 总 (e.g. Wang Zong).'
    }
  },
  {
    id: 'bc_work_002',
    term: '采购部',
    pinyin: 'cǎigòu bù',
    partOfSpeech: 'noun',
    category: 'workplace',
    level: 'beginner',
    tags: ['department', 'purchasing', 'procurement'],
    translations: {
      vi: { meaning: 'Phòng mua hàng / Phòng thu mua', note: 'Bộ phận phụ trách tìm nhà cung ứng và mua nguyên vật liệu.' },
      ja: { meaning: '調達部 / 購買部', note: '資材や製品の仕入れ・購買を担当する部署。' },
      en: { meaning: 'Purchasing Department / Procurement', note: 'Department in charge of sourcing and acquiring supplies.' }
    },
    examples: [
      {
        zh: '采购部正在对三家供应商进行全面的资质审核。',
        pinyin: 'Cǎigòu bù zhèngzài duì sān jiā gōngyìngshāng jìnxíng quánmiàn de zīzhì shěnhé.',
        translations: {
          vi: 'Phòng mua hàng đang tiến hành thẩm định toàn diện năng lực của ba nhà cung cấp.',
          ja: '調達部は現在、サプライヤー3社の資格審査を全面的に行っております。',
          en: 'The purchasing department is currently conducting a thorough qualification audit on three vendors.'
        }
      }
    ]
  },
  {
    id: 'bc_work_003',
    term: '会议纪要',
    pinyin: 'huìyì jìyào',
    partOfSpeech: 'noun',
    category: 'workplace',
    level: 'intermediate',
    tags: ['meeting', 'minutes', 'documentation'],
    translations: {
      vi: { meaning: 'Biên bản cuộc họp', note: 'Tài liệu ghi lại các quyết định và đầu việc sau cuộc họp.' },
      ja: { meaning: '議事録', note: '会議の決定事項やタスクを記録した文書。' },
      en: { meaning: 'meeting minutes / summary', note: 'Record of discussion points and actions after a meeting.' }
    },
    examples: [
      {
        zh: '今天的会议纪要我已经整理好，稍后发到大家的邮箱。',
        pinyin: 'Jīntiān de huìyì jìyào wǒ yǐjīng zhěnglǐ hǎo, shāohòu fā dào dàjiā de yóuxiāng.',
        translations: {
          vi: 'Biên bản cuộc họp hôm nay tôi đã soạn xong, lát nữa sẽ gửi vào email của mọi người.',
          ja: '本日の議事録をまとめましたので、後ほど皆様のメールにお送りいたします。',
          en: 'I have compiled today\'s meeting minutes and will email them to everyone shortly.'
        }
      }
    ]
  },
  {
    id: 'bc_work_004',
    term: '进度',
    pinyin: 'jìndù',
    partOfSpeech: 'noun',
    category: 'workplace',
    level: 'beginner',
    tags: ['project', 'progress', 'timeline'],
    translations: {
      vi: { meaning: 'Tiến độ (công việc, sản xuất, dự án)', note: 'Từ thường xuyên dùng khi cập nhật trạng thái công việc.' },
      ja: { meaning: '進捗（しんちょく） / スケジュール', note: 'プロジェクトや生産の進行状況。' },
      en: { meaning: 'progress / schedule', note: 'Status of an ongoing project or task.' }
    },
    examples: [
      {
        zh: '请问目前生产进度如何？能按时交货吗？',
        pinyin: 'Qǐngwèn mùqián shēngchǎn jìndù rúhé? Néng ànshí jiāohuò ma?',
        translations: {
          vi: 'Xin hỏi tiến độ sản xuất hiện tại thế nào? Có thể giao hàng đúng hạn không?',
          ja: '現在の生産進捗はいかがでしょうか？予定通り納品可能でしょうか？',
          en: 'How is the current production progress? Can the goods be delivered on schedule?'
        }
      }
    ]
  },
  {
    id: 'bc_work_005',
    term: '加班',
    pinyin: 'jiā bān',
    partOfSpeech: 'verb',
    category: 'workplace',
    level: 'beginner',
    tags: ['work', 'overtime', 'attendance'],
    translations: {
      vi: { meaning: 'Làm thêm giờ / tăng ca', note: 'Rất phổ biến trong môi trường nhà xưởng, văn phòng.' },
      ja: { meaning: '残業する', note: '所定労働時間を超えて働くこと。' },
      en: { meaning: 'to work overtime', note: 'Working beyond normal business hours.' }
    },
    examples: [
      {
        zh: '为了赶在节前出货，车间工人这周末需要加班。',
        pinyin: 'Wèile gǎn zài jié qián chūhuò, chējiān gōngrén zhè zhōumò xūyào jiābān.',
        translations: {
          vi: 'Để kịp xuất hàng trước kỳ nghỉ lễ, công nhân phân xưởng cuối tuần này cần tăng ca.',
          ja: '連休前の出荷に間に合わせるため、工場の作業員は今週末残業する必要があります。',
          en: 'In order to ship before the holiday, workshop workers need to work overtime this weekend.'
        }
      }
    ]
  },

  // --- 3. COMMUNICATION (商务沟通) ---
  {
    id: 'bc_comm_001',
    term: '询价',
    pinyin: 'xún jià',
    partOfSpeech: 'verb',
    category: 'communication',
    level: 'beginner',
    tags: ['inquiry', 'pricing', 'trade'],
    translations: {
      vi: { meaning: 'Hỏi giá / yêu cầu báo giá (Inquiry)', note: 'Hành động mở đầu khi người mua tìm kiếm sản phẩm.' },
      ja: { meaning: '引き合い / 価格照会（インクワイアリー）', note: '買い手が売り手に価格や取引条件を問い合わせること。' },
      en: { meaning: 'price inquiry / to inquire about prices', note: 'Requesting a price quote from a supplier.' }
    },
    examples: [
      {
        zh: '我们收到了德国客户对不锈钢水壶的询价。',
        pinyin: 'Wǒmen shōudào le Déguó kèhù duì bùxiùgāng shuǐhú de xúnjià.',
        translations: {
          vi: 'Chúng tôi đã nhận được yêu cầu báo giá bình giữ nhiệt inox từ khách hàng Đức.',
          ja: 'ドイツの顧客からステンレス製ボトルの価格照会を受け取りました。',
          en: 'We received a price inquiry from a German client for stainless steel kettles.'
        }
      }
    ]
  },
  {
    id: 'bc_comm_002',
    term: '报价',
    pinyin: 'bào jià',
    partOfSpeech: 'verb',
    category: 'communication',
    level: 'beginner',
    tags: ['quotation', 'pricing', 'supplier'],
    translations: {
      vi: { meaning: 'Báo giá / đưa ra mức giá (Quotation)', note: 'Nhà cung cấp đưa ra bảng giá sản phẩm cho khách.' },
      ja: { meaning: '見積もり（を出す） / オファー', note: '売り手が買い手に単価や条件を提示すること。' },
      en: { meaning: 'to quote a price / quotation', note: 'Providing formal pricing to a buyer.' }
    },
    examples: [
      {
        zh: '附件是我们最新的FOB上海报价单，请查收。',
        pinyin: 'Fùjiàn shì wǒmen zuìxīn de FOB Shànghǎi bàojià dān, qǐng cháshōu.',
        translations: {
          vi: 'File đính kèm là bảng báo giá FOB Thượng Hải mới nhất của chúng tôi, xin vui lòng kiểm tra.',
          ja: '添付ファイルは当社の最新のFOB上海見積書です。ご確認ください。',
          en: 'Attached is our latest FOB Shanghai quotation sheet for your review.'
        }
      }
    ]
  },
  {
    id: 'bc_comm_003',
    term: '议价',
    pinyin: 'yì jià',
    partOfSpeech: 'verb',
    category: 'communication',
    level: 'intermediate',
    tags: ['negotiation', 'bargaining', 'discount'],
    translations: {
      vi: { meaning: 'Thương lượng giá / đàm phán giá cả', note: 'Thương lượng giữa người mua và người bán để đạt mức giá tối ưu.' },
      ja: { meaning: '価格交渉 / 値引き交渉', note: '単価や支払条件について双方がすり合わせを行うこと。' },
      en: { meaning: 'to negotiate prices / bargaining', note: 'Discussing prices to find mutual agreement.' }
    },
    examples: [
      {
        zh: '如果贵方的订购量能达到两万件，价格上我们还可以进一步议价。',
        pinyin: 'Rúguǒ guì fāng de dìnggòu liàng néng dádào liǎng wàn jiàn, jiàgé shàng wǒmen hái kěyǐ jìnyíbù yìjià.',
        translations: {
          vi: 'Nếu số lượng đặt hàng của quý bên đạt được 20.000 sản phẩm, chúng tôi có thể thương lượng thêm về giá.',
          ja: 'もし貴社のご発注数量が2万個に達するようでしたら、さらなる価格交渉の余地がございます。',
          en: 'If your order quantity reaches 20,000 units, we can negotiate the price further.'
        }
      }
    ]
  },
  {
    id: 'bc_comm_004',
    term: '确认订单',
    pinyin: 'quèrèn dìngdān',
    partOfSpeech: 'phrase',
    category: 'communication',
    level: 'beginner',
    tags: ['order', 'confirmation', 'contract'],
    translations: {
      vi: { meaning: 'Xác nhận đơn đặt hàng', note: 'Bước chính thức chốt đơn trước khi đi vào sản xuất.' },
      ja: { meaning: '注文確定 / 受注確認', note: '発注書の内容を確認し合意すること。' },
      en: { meaning: 'to confirm an order', note: 'Finalizing an order between buyer and seller.' }
    },
    examples: [
      {
        zh: '请在周五之前签字回传形式发票，以便我们确认订单并排单生产。',
        pinyin: 'Qǐng zài zhōuwǔ zhīqián qiānzì huíchuán xíngshì fāpiào, yǐbiàn wǒmen quèrèn dìngdān bìng pái dān shēngchǎn.',
        translations: {
          vi: 'Vui lòng ký tên và gửi lại hóa đơn chiếu lệ (Proforma Invoice) trước thứ Sáu để chúng tôi xác nhận đơn và lên lịch sản xuất.',
          ja: '受注確定および生産スケジュールの確保のため、金曜日までにプロフォーマインボイスにご署名の上ご返送ください。',
          en: 'Please sign and return the proforma invoice by Friday so we can confirm the order and schedule production.'
        }
      }
    ]
  },
  {
    id: 'bc_comm_005',
    term: '催促',
    pinyin: 'cuīcù',
    partOfSpeech: 'verb',
    category: 'communication',
    level: 'intermediate',
    tags: ['follow-up', 'reminder', 'urgent'],
    translations: {
      vi: { meaning: 'Thúc giục / nhắc nhở / hối thúc (phản hồi, thanh toán, giao hàng)', note: 'Dùng khi cần đốc thúc tiến độ hoặc chờ phản hồi đối tác.' },
      ja: { meaning: '督促する / 催促する', note: '返信や納期、入金を促すこと。' },
      en: { meaning: 'to urge / to expedite / to press for', note: 'Following up persistently for replies or deliveries.' }
    },
    examples: [
      {
        zh: '我已经发邮件催促货代尽快提供集装箱提单号。',
        pinyin: 'Wǒ yǐjīng fā yóujiàn cuīcù huòdài jǐnkuài tígōng jízhuāngxiāng tídān hào.',
        translations: {
          vi: 'Tôi đã gửi email thúc giục công ty logistics nhanh chóng cung cấp số vận đơn container.',
          ja: 'フォワーダーにコンテナのB/L番号を至急提供するよう、すでにメールで催促いたしました。',
          en: 'I have already emailed the freight forwarder urging them to provide the container B/L number as soon as possible.'
        }
      }
    ]
  },

  // --- 4. SALES & PURCHASING (销售与采购) ---
  {
    id: 'bc_sales_001',
    term: '最低订购量',
    pinyin: 'zuìdī dìnggòu liàng',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['moq', 'purchasing', 'terms'],
    translations: {
      vi: { meaning: 'Số lượng đặt hàng tối thiểu (MOQ)', note: 'Viết tắt tiếng Anh là MOQ (Minimum Order Quantity).' },
      ja: { meaning: '最小発注数量（MOQ）', note: '注文を受ける最低限の数量ロット。' },
      en: { meaning: 'Minimum Order Quantity (MOQ)', note: 'Smallest order volume a factory will accept.' }
    },
    examples: [
      {
        zh: '由于定制外包装需要开模，这款产品的最低订购量是3000件。',
        pinyin: 'Yóuyú dìngzhì wàibāozhuāng xūyào kāimó, zhè kuǎn chǎnpǐn de zuìdī dìnggòu liàng shì sānqiān jiàn.',
        translations: {
          vi: 'Do bao bì tùy chỉnh cần tạo khuôn riêng, số lượng đặt hàng tối thiểu của sản phẩm này là 3.000 chiếc.',
          ja: '特注パッケージの金型製作が必要なため、本製品の最小発注数量（MOQ）は3,000個となります。',
          en: 'Because custom packaging requires molding, the MOQ for this product is 3,000 units.'
        }
      }
    ]
  },
  {
    id: 'bc_sales_002',
    term: '规格',
    pinyin: 'guīgé',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['specification', 'product', 'detail'],
    translations: {
      vi: { meaning: 'Quy cách / thông số kỹ thuật (kích thước, công suất, chất liệu)', note: 'Tài liệu chi tiết mô tả thông số sản phẩm.' },
      ja: { meaning: '規格 / 仕様（スペック）', note: '寸法、材質、性能などの製品基準。' },
      en: { meaning: 'specification / specs', note: 'Technical standards and dimensions of a product.' }
    },
    examples: [
      {
        zh: '请确认图纸上的技术规格是否符合当地的安全认证标准。',
        pinyin: 'Qǐng quèrèn túzhǐ shàng de jìshù guīgé shìfǒu fúhé dāngdì de ānquán rènzhèng biāozhǔn.',
        translations: {
          vi: 'Xin hãy xác nhận xem thông số kỹ thuật trên bản vẽ có phù hợp tiêu chuẩn chứng nhận an toàn tại địa phương không.',
          ja: '図面上の技術仕様が現地の安全認証基準に適合しているかご確認ください。',
          en: 'Please verify whether the technical specifications on the blueprint meet local safety certification standards.'
        }
      }
    ]
  },
  {
    id: 'bc_sales_003',
    term: '供应商',
    pinyin: 'gōngyìngshāng',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['supplier', 'vendor', 'partner'],
    translations: {
      vi: { meaning: 'Nhà cung cấp / đối tác cung ứng', note: 'Bên bán nguyên vật liệu, thành phẩm hoặc dịch vụ.' },
      ja: { meaning: 'サプライヤー / 仕入先 / 納入業者', note: '商品や原材料を納入する会社。' },
      en: { meaning: 'supplier / vendor', note: 'Entity providing goods or services.' }
    },
    examples: [
      {
        zh: '作为核心供应商，他们一直能够保证稳定的供货质量。',
        pinyin: 'Zuòwéi héxīn gōngyìngshāng, tāmen yìzhí nénggòu bǎozhèng wěndìng de gōnghuò zhìliàng.',
        translations: {
          vi: 'Với tư cách là nhà cung cấp cốt lõi, họ luôn đảm bảo được chất lượng cung ứng hàng ổn định.',
          ja: 'コアサプライヤーとして、彼らは常に安定した品質での供給を維持しています。',
          en: 'As a key supplier, they have consistently maintained stable supply quality.'
        }
      }
    ]
  },
  {
    id: 'bc_sales_004',
    term: '样品',
    pinyin: 'yàngpǐn',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['sample', 'testing', 'prototype'],
    translations: {
      vi: { meaning: 'Hàng mẫu / sản phẩm mẫu (Sample)', note: 'Gửi trước khi ký hợp đồng để khách test chất lượng.' },
      ja: { meaning: 'サンプル / 見本', note: '本発注の前に品質を確認するための試作品。' },
      en: { meaning: 'sample / prototype', note: 'Test product sent before mass production.' }
    },
    examples: [
      {
        zh: '样品通常免费提供，但国际快递运费需要由买方承担。',
        pinyin: 'Yàngpǐn tōngcháng miǎnfèi tígōng, dàn guójì kuàidì yùnfèi xūyào yóu mǎifāng chéngdān.',
        translations: {
          vi: 'Hàng mẫu thường được cung cấp miễn phí, nhưng cước chuyển phát nhanh quốc tế do bên mua chi trả.',
          ja: 'サンプルは原則無料ですが、国際配送料はバイヤー側のご負担となります。',
          en: 'Samples are usually provided free of charge, but international courier freight is to be paid by the buyer.'
        }
      }
    ]
  },
  {
    id: 'bc_sales_005',
    term: '折扣',
    pinyin: 'zhékòu',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['discount', 'pricing', 'bargain'],
    translations: {
      vi: { meaning: 'Chiết khấu / giảm giá', note: 'Chú ý: tiếng Trung "9折" nghĩa là giảm 10% (trả 90%), "85折" là trả 85%.' },
      ja: { meaning: '割引 / ディスカウント', note: '中国語の「打九折」は10%引き、「打八折」は20%引きを意味します。' },
      en: { meaning: 'discount / rebate', note: 'Note: Chinese "9折" means 10% off (pay 90%).' }
    },
    examples: [
      {
        zh: '如果本次订单金额超过五万美元，我们可以给予5%的批量折扣。',
        pinyin: 'Rúguǒ běn cì dìngdān jīné chāoguò wǔ wàn měiyuán, wǒmen kěyǐ jǐyǔ bǎifēnzhīwǔ de pīliàng zhékòu.',
        translations: {
          vi: 'Nếu giá trị đơn hàng lần này vượt quá 50.000 USD, chúng tôi có thể áp dụng mức chiết khấu số lượng 5%.',
          ja: '今回の発注総額が5万米ドルを超える場合、5％の大口割引を適用いたします。',
          en: 'If this order amount exceeds USD 50,000, we can offer a 5% volume discount.'
        }
      }
    ]
  }
,
  {
    "id": "bc_basic_007",
    "term": "洽谈",
    "pinyin": "qiàtán",
    "partOfSpeech": "verb",
    "category": "basic",
    "level": "intermediate",
    "tags": [
      "meeting",
      "negotiation",
      "business"
    ],
    "translations": {
      "vi": {
        "meaning": "Đàm phán / Bàn bạc công việc",
        "note": "Dùng trong ngữ cảnh trang trọng, ví dụ bàn chuyện hợp tác làm ăn."
      },
      "ja": {
        "meaning": "商談する / 協議する",
        "note": "ビジネスの合意形成に向けた正式な話し合い。"
      },
      "en": {
        "meaning": "to negotiate / discuss business",
        "note": "Formal term for business talks or negotiations."
      }
    },
    "examples": [
      {
        "zh": "我们欢迎贵司代表随时前来洽谈合作事宜。",
        "pinyin": "Wǒmen huānyíng guìsī dàibiǎo suíshí qiánlái qiàtán hézuò shìyí.",
        "translations": {
          "vi": "Chúng tôi hoan nghênh đại diện quý công ty bất cứ lúc nào đến trao đổi, bàn bạc việc hợp tác.",
          "ja": "貴社のご担当者様がいつでも提携の商談にお越しになることを歓迎いたします。",
          "en": "We welcome your representatives to visit us anytime to discuss cooperation."
        }
      }
    ],
    "businessTip": {
      "vi": "\"商务洽谈\" (shāngwù qiàtán) là cụm từ rất phổ biến trên thiệp mời hoặc biển phòng họp.",
      "ja": "「商务洽谈」は招待状や会議室の看板で頻出する格式高い表現です。",
      "en": "\"商务洽谈\" is frequently used on meeting invitations and boardroom signs."
    }
  },
  {
    "id": "bc_basic_008",
    "term": "关照",
    "pinyin": "guānzhào",
    "partOfSpeech": "verb",
    "category": "basic",
    "level": "beginner",
    "tags": [
      "etiquette",
      "greeting",
      "guanxi"
    ],
    "translations": {
      "vi": {
        "meaning": "Quan tâm / Chiếu cố / Giúp đỡ",
        "note": "Thường dùng trong câu cảm ơn hoặc kết thư xã giao."
      },
      "ja": {
        "meaning": "お引き立て / ご配慮 / お世話",
        "note": "挨拶やメール結びでの定番敬語。"
      },
      "en": {
        "meaning": "care / favor / patronage",
        "note": "Polite expression requesting support or thanking for patronage."
      }
    },
    "examples": [
      {
        "zh": "感谢您一直以来对我司业务的大力关照。",
        "pinyin": "Gǎnxiè nín yīzhí yǐlái duì wǒsī yèwù de dàlì guānzhào.",
        "translations": {
          "vi": "Cảm ơn quý vị thời gian qua đã luôn hết lòng quan tâm, ủng hộ việc kinh doanh của công ty chúng tôi.",
          "ja": "平素は弊社の事業に格別のご高配を賜り、心より御礼申し上げます。",
          "en": "Thank you for your continuous support and patronage of our business."
        }
      }
    ],
    "businessTip": {
      "vi": "Cụm từ \"请多关照\" (Qǐng duō guānzhào) tương đương với \"Xin nhờ giúp đỡ / よろしくお願いします\".",
      "ja": "「请多关照」は日本語の「どうぞよろしくお願いいたします」に相当します。",
      "en": "\"请多关照\" corresponds to the traditional polite request for ongoing goodwill and assistance."
    }
  },
  {
    "id": "bc_basic_009",
    "term": "董事长",
    "pinyin": "dǒngshìzhǎng",
    "partOfSpeech": "noun",
    "category": "basic",
    "level": "intermediate",
    "tags": [
      "title",
      "executive",
      "hierarchy"
    ],
    "translations": {
      "vi": {
        "meaning": "Chủ tịch Hội đồng Quản trị",
        "note": "Người đứng đầu cấp cao nhất của một công ty cổ phần."
      },
      "ja": {
        "meaning": "会長 / 取締役会長",
        "note": "企業の最高意思決定機関のトップ。"
      },
      "en": {
        "meaning": "Chairman of the Board",
        "note": "Highest-ranking executive officer heading the board."
      }
    },
    "examples": [
      {
        "zh": "李董事长亲自出席了本次中越经贸交流会。",
        "pinyin": "Lǐ dǒngshìzhǎng qīnzì chūxí le běncì Zhōng-Yuè jīngmào jiāoliúhuì.",
        "translations": {
          "vi": "Chủ tịch Lý đã đích thân tham dự hội nghị giao lưu kinh tế thương mại Trung - Việt lần này.",
          "ja": "李会長は今回の中越経済貿易交流会に親しく出席されました。",
          "en": "Chairman Li personally attended this China-Vietnam trade exchange symposium."
        }
      }
    ],
    "businessTip": {
      "vi": "Khi xưng hô trực tiếp với Chủ tịch, luôn dùng [Họ + 董事长], ví dụ: \"李董\" hoặc \"李董事长\".",
      "ja": "呼びかける際は「李董」や「李董事长」のように名字を冠して敬称とします。",
      "en": "Address board chairs formally as [Surname + 董事长] or colloquial abbreviation [Surname + 董]."
    }
  },
  {
    "id": "bc_basic_010",
    "term": "客户",
    "pinyin": "kèhù",
    "partOfSpeech": "noun",
    "category": "basic",
    "level": "beginner",
    "tags": [
      "sales",
      "client",
      "relationship"
    ],
    "translations": {
      "vi": {
        "meaning": "Khách hàng",
        "note": "Từ chỉ đối tác, người mua hoặc người sử dụng dịch vụ."
      },
      "ja": {
        "meaning": "顧客 / クライアント / お客様",
        "note": "取引先や利用者を指す最も一般的な語。"
      },
      "en": {
        "meaning": "client / customer",
        "note": "Standard term for commercial client or account."
      }
    },
    "examples": [
      {
        "zh": "满足客户的个性化定制需求是我们的核心优势。",
        "pinyin": "Mǎnzú kèhù de gèxìnghuà dìngzhì xūqiú shì wǒmen de héxīn yōushì.",
        "translations": {
          "vi": "Đáp ứng nhu cầu đặt làm riêng theo yêu cầu của khách hàng là ưu thế cốt lõi của chúng tôi.",
          "ja": "お客様の個別カスタマイズ要求を満たすことが弊社の強みです。",
          "en": "Fulfilling customized client requirements is our core competitive advantage."
        }
      }
    ],
    "businessTip": {
      "vi": "Khách hàng lớn quan trọng gọi là \"大客户\" (Key Account / VIP Client).",
      "ja": "大口取引先や最重要顧客は「大客户（キーアカウント）」と呼びます。",
      "en": "Major enterprise accounts are commonly referred to as \"大客户\"."
    }
  },
  {
    "id": "bc_basic_011",
    "term": "汇款账户",
    "pinyin": "huìkuǎn zhànghù",
    "partOfSpeech": "noun",
    "category": "basic",
    "level": "intermediate",
    "tags": [
      "bank",
      "payment",
      "finance"
    ],
    "translations": {
      "vi": {
        "meaning": "Tài khoản chuyển tiền / thụ hưởng",
        "note": "Thông tin tài khoản ngân hàng để đối tác gửi tiền thanh toán."
      },
      "ja": {
        "meaning": "送金先口座 / 振込口座",
        "note": "国際送金や銀行決済の振込先情報。"
      },
      "en": {
        "meaning": "remittance bank account",
        "note": "Designated bank account coordinates for wire transfers."
      }
    },
    "examples": [
      {
        "zh": "形式发票底部附有我司的美元汇款账户信息及SWIFT代码。",
        "pinyin": "Xíngshì fāpiào dǐbù fùyǒu wǒsī de Měiyuán huìkuǎn zhànghù xìnxī jí SWIFT dàimǎ.",
        "translations": {
          "vi": "Phía dưới cùng của hóa đơn chiếu lệ có kèm thông tin tài khoản chuyển tiền USD và mã SWIFT của chúng tôi.",
          "ja": "プロフォーマインボイスの下部に弊社の米ドル送金口座情報とSWIFTコードが記載されています。",
          "en": "Our USD remittance bank coordinates and SWIFT code are appended at the bottom of the PI."
        }
      }
    ],
    "businessTip": {
      "vi": "Luôn kiểm tra kỹ tên thụ hưởng (Beneficiary Name) khớp từng chữ với đăng ký mở tài khoản ngân hàng.",
      "ja": "受取人名義（Beneficiary Name）は銀行登録名と1文字の相違もなく完全一致させる必要があります。",
      "en": "Ensure the beneficiary name matches the bank registration verbatim to avoid wire rejections."
    }
  },
  {
    "id": "bc_basic_012",
    "term": "顺祝商祺",
    "pinyin": "shùnzhù shāngqí",
    "partOfSpeech": "phrase",
    "category": "basic",
    "level": "intermediate",
    "tags": [
      "salutation",
      "email",
      "etiquette"
    ],
    "translations": {
      "vi": {
        "meaning": "Kính chúc quý công ty kinh doanh thuận lợi / làm ăn phát đạt",
        "note": "Lời chúc truyền thống trang trọng đặt ở dòng cuối cùng của email thương mại."
      },
      "ja": {
        "meaning": "貴社のますますのご発展をお祈り申し上げます",
        "note": "中国語ビジネスレター・メールの格式高い結びの挨拶。"
      },
      "en": {
        "meaning": "Best regards and wishing you prosperous business",
        "note": "Classic formal complimentary close in Chinese business letters."
      }
    },
    "examples": [
      {
        "zh": "再次感谢您的支持！顺祝商祺！",
        "pinyin": "Zàicì gǎnxiè nín de zhīchí! Shùnzhù shāngqí!",
        "translations": {
          "vi": "Một lần nữa cảm ơn sự ủng hộ của quý vị! Kính chúc quý công ty phát tài!",
          "ja": "重ねてご支援に御礼申し上げます。貴社のますますのご清栄をお祈りいたします。",
          "en": "Thank you again for your kind support! Wishing you prosperous business!"
        }
      }
    ],
    "businessTip": {
      "vi": "Trong văn bản trang trọng cổ điển, \"顺祝\" thường đứng cuối dòng văn bản, còn \"商祺\" xuống dòng thụt vào 2 ô.",
      "ja": "伝統的な書簡形式では「顺祝」を本文末尾に置き、「商祺」を改行して2文字下げで配置します。",
      "en": "In classical formatting, 顺祝 sits at the paragraph end, while 商祺 begins on the next indented line."
    }
  },
  {
    "id": "bc_work_006",
    "term": "考勤",
    "pinyin": "kǎoqín",
    "partOfSpeech": "noun",
    "category": "workplace",
    "level": "intermediate",
    "tags": [
      "hr",
      "attendance",
      "work"
    ],
    "translations": {
      "vi": {
        "meaning": "Chấm công / Điểm danh đi làm",
        "note": "Hệ thống theo dõi thời gian làm việc của nhân viên."
      },
      "ja": {
        "meaning": "勤怠管理 / 出欠確認",
        "note": "出社時間や勤務状況の記録・管理。"
      },
      "en": {
        "meaning": "time and attendance",
        "note": "Tracking employee working hours and presence."
      }
    },
    "examples": [
      {
        "zh": "公司实行打卡考勤制度，每月准时发放全勤奖。",
        "pinyin": "Gōngsī shíxíng dǎkǎ kǎoqín zhìdù, měiyuè zhǔnshí fāfàng quánqín jiǎng.",
        "translations": {
          "vi": "Công ty áp dụng chế độ chấm công quẹt thẻ, hàng tháng phát thưởng chuyên cần đúng hạn.",
          "ja": "弊社ではタイムカード勤怠制度を実施しており、毎月皆勤手当を支給しています。",
          "en": "The company enforces timecard attendance and awards monthly perfect attendance bonuses."
        }
      }
    ],
    "businessTip": {
      "vi": "\"全勤奖\" (quánqín jiǎng) là tiền thưởng chuyên cần khi không đi muộn về sớm ngày nào trong tháng.",
      "ja": "「全勤奖」は無遅刻無欠勤に対する皆勤手当を指します。",
      "en": "\"全勤奖\" is the monthly perfect attendance bonus for zero tardiness."
    }
  },
  {
    "id": "bc_work_007",
    "term": "请假",
    "pinyin": "qǐngjià",
    "partOfSpeech": "verb",
    "category": "workplace",
    "level": "beginner",
    "tags": [
      "leave",
      "hr",
      "daily"
    ],
    "translations": {
      "vi": {
        "meaning": "Xin nghỉ phép",
        "note": "Xin phép vắng mặt tại nơi làm việc có lý do."
      },
      "ja": {
        "meaning": "休暇を申請する / 休みを取る",
        "note": "有給休暇や病欠の手続きを行うこと。"
      },
      "en": {
        "meaning": "to request leave of absence",
        "note": "Formally asking for time off work."
      }
    },
    "examples": [
      {
        "zh": "我下周需要请两天年假处理个人私事。",
        "pinyin": "Wǒ xiàzhōu xūyào qǐng liǎng tiān niánjià chǔlǐ gèrén sīshì.",
        "translations": {
          "vi": "Tuần sau tôi cần xin nghỉ phép năm 2 ngày để giải quyết việc riêng gia đình.",
          "ja": "来週私用のため年次有給休暇を2日取得したいです。",
          "en": "I need to take two days of annual leave next week to handle personal affairs."
        }
      }
    ],
    "businessTip": {
      "vi": "Nghỉ ốm là \"病假\" (bìngjià), nghỉ việc riêng là \"事假\" (shìjià), nghỉ phép năm là \"年假\" (niánjià).",
      "ja": "病欠は「病假」、私用欠勤は「事假」、有給休暇は「年假」と使い分けます。",
      "en": "Sick leave is 病假, personal leave is 事假, and annual paid vacation is 年假."
    }
  },
  {
    "id": "bc_work_008",
    "term": "汇报",
    "pinyin": "huìbào",
    "partOfSpeech": "verb",
    "category": "workplace",
    "level": "intermediate",
    "tags": [
      "reporting",
      "management",
      "hierarchy"
    ],
    "translations": {
      "vi": {
        "meaning": "Báo cáo công việc với cấp trên",
        "note": "Trình bày kết quả, tình hình thực hiện dự án cho quản lý."
      },
      "ja": {
        "meaning": "報告する / 報告（ほうれんそう）",
        "note": "上司や関係者に業務進捗や成果を報告すること。"
      },
      "en": {
        "meaning": "to report / brief superiors",
        "note": "Presenting progress or project findings up the management chain."
      }
    },
    "examples": [
      {
        "zh": "每周五下午，各部门主管需要向总经理汇报本周工作成果。",
        "pinyin": "Měizhōu wǔ xiàwǔ, gè bùmén zhǔguǎn xūyào xiàng zǒngjīnglǐ huìbào běnzhōu gōngzuò chéngguǒ.",
        "translations": {
          "vi": "Chiều thứ Sáu hàng tuần, trưởng các bộ phận cần báo cáo kết quả công việc tuần này với Tổng giám đốc.",
          "ja": "毎週金曜日の午後に各部門長が総経理へ週報を報告します。",
          "en": "Every Friday afternoon, department heads report weekly achievements to the General Manager."
        }
      }
    ],
    "businessTip": {
      "vi": "Cấp dưới báo cáo lên cấp trên dùng \"汇报\" (huìbào); cấp trên thông báo xuống dưới dùng \"通知\" (tōngzhī).",
      "ja": "部下から上司へは「汇报」を使い、上司から部下への伝達は「通知」を用います。",
      "en": "Use 汇报 for reporting upward to bosses; use 通知 for downward notifications."
    }
  },
  {
    "id": "bc_work_009",
    "term": "绩效考核",
    "pinyin": "jìxiào kǎohé",
    "partOfSpeech": "noun",
    "category": "workplace",
    "level": "advanced",
    "tags": [
      "hr",
      "kpi",
      "evaluation"
    ],
    "translations": {
      "vi": {
        "meaning": "Đánh giá hiệu suất công việc (KPI / Performance Appraisal)",
        "note": "Xét duyệt năng lực và kết quả làm việc định kỳ."
      },
      "ja": {
        "meaning": "人事評価 / 業績考課（KPI評価）",
        "note": "社員の業績や能力を定期的に査定する制度。"
      },
      "en": {
        "meaning": "performance evaluation / appraisal",
        "note": "Periodic review of employee KPI achievements."
      }
    },
    "examples": [
      {
        "zh": "季度绩效考核结果将直接影响年终奖金的发放比例。",
        "pinyin": "Jìdù jìxiào kǎohé jiéguǒ jiāng zhíjiē yǐngxiǎng niánzhōng jiāngjīn de fāfàng bǐlì.",
        "translations": {
          "vi": "Kết quả đánh giá hiệu suất quý sẽ ảnh hưởng trực tiếp đến tỷ lệ nhận tiền thưởng cuối năm.",
          "ja": "四半期の人事評価結果は期末賞与の支給率に直接反映されます。",
          "en": "Quarterly performance appraisals directly determine year-end bonus allocations."
        }
      }
    ],
    "businessTip": {
      "vi": "Thường viết tắt là \"绩效\" (jìxiào - performance).",
      "ja": "実務では「绩效」と略称されることが一般的です。",
      "en": "Frequently abbreviated simply as 绩效 in workplace discussions."
    }
  },
  {
    "id": "bc_work_010",
    "term": "报销",
    "pinyin": "bàoxiāo",
    "partOfSpeech": "verb",
    "category": "workplace",
    "level": "intermediate",
    "tags": [
      "finance",
      "expense",
      "admin"
    ],
    "translations": {
      "vi": {
        "meaning": "Thanh toán lại công tác phí / Hoàn ứng chi phí",
        "note": "Nộp hóa đơn để công ty hoàn trả tiền đã chi cho công việc."
      },
      "ja": {
        "meaning": "経費精算する",
        "note": "出張旅費や立替経費を経理に申請して精算すること。"
      },
      "en": {
        "meaning": "to submit expense reimbursement",
        "note": "Claiming reimbursement for business-related expenditures."
      }
    },
    "examples": [
      {
        "zh": "请出差同事在月底前把所有正规发票贴好办理报销。",
        "pinyin": "Qǐng chūchāi tóngshì zài yuèdǐ qián bǎ suǒyǒu zhèngguī fāpiào tiē hǎo bànlǐ bàoxiāo.",
        "translations": {
          "vi": "Xin mời các bạn đi công tác dán hóa đơn đỏ hợp lệ trước cuối tháng để làm thủ tục thanh toán hoàn ứng.",
          "ja": "出張された方は月末までに正規の領収書を添付して経費精算を完了してください。",
          "en": "Colleagues on business trips must attach valid invoices for expense reimbursement before month-end."
        }
      }
    ],
    "businessTip": {
      "vi": "Tại Trung Quốc bắt buộc phải có hóa đơn đỏ điện tử chính thức (\"发票\" fāpiào) mới được làm thủ tục hoàn phí.",
      "ja": "中国では税務署公認の「发票（増値税専用発票等）」がないと原則経費計上できません。",
      "en": "Official government fapiao invoices are strictly required to substantiate tax deductible reimbursements."
    }
  },
  {
    "id": "bc_work_011",
    "term": "业务",
    "pinyin": "yèwù",
    "partOfSpeech": "noun",
    "category": "workplace",
    "level": "beginner",
    "tags": [
      "business",
      "operation",
      "sales"
    ],
    "translations": {
      "vi": {
        "meaning": "Nghiệp vụ / Hoạt động kinh doanh",
        "note": "Phạm vi ngành nghề hoặc thao tác công việc của công ty."
      },
      "ja": {
        "meaning": "業務 / 営業 / 事業",
        "note": "会社の事業領域や日常的な実務のこと。"
      },
      "en": {
        "meaning": "business / professional operations",
        "note": "Commercial activities, operations, or sales lines."
      }
    },
    "examples": [
      {
        "zh": "近年来我司在东南亚地区的跨境电商业务增长非常迅速。",
        "pinyin": "Jìnniánlái wǒsī zài Dōngnányà dìqū de kuàjìng diànshāng yèwù zēngzhǎng fēicháng xùnsù.",
        "translations": {
          "vi": "Những năm gần đây mảng kinh doanh thương mại điện tử xuyên biên giới của chúng tôi tại Đông Nam Á tăng trưởng rất nhanh.",
          "ja": "近年、東南アジアにおける越境EC事業が急速に成長しております。",
          "en": "In recent years our cross-border e-commerce operations in Southeast Asia have expanded rapidly."
        }
      }
    ],
    "businessTip": {
      "vi": "Nhân viên kinh doanh/sales thường được gọi tắt là \"业务员\" (yèwù yuán).",
      "ja": "営業担当者・セールスマンは一般に「业务员」と呼ばれます。",
      "en": "Sales reps and account executives are customarily called 业务员."
    }
  },
  {
    "id": "bc_work_012",
    "term": "交接",
    "pinyin": "jiāojiē",
    "partOfSpeech": "verb",
    "category": "workplace",
    "level": "intermediate",
    "tags": [
      "transition",
      "handover",
      "hr"
    ],
    "translations": {
      "vi": {
        "meaning": "Bàn giao công việc",
        "note": "Chuyển giao tài liệu, đầu việc khi nghỉ phép hoặc chuyển vị trí."
      },
      "ja": {
        "meaning": "業務の引き継ぎを行う",
        "note": "異動や退職に伴い後任者へ業務を引き渡すこと。"
      },
      "en": {
        "meaning": "to handover / transfer duties",
        "note": "Transitioning job responsibilities and documentation."
      }
    },
    "examples": [
      {
        "zh": "在休产假之前，她已经把所有重点客户的跟进工作详细交接给了小张。",
        "pinyin": "Zài xiū chǎnjià zhīqián, tā yǐjīng bǎ suǒyǒu zhòngdiǎn kèhù de gēnjìn gōngzuò xiángxì jiāojiē gěi le xiǎo Zhāng.",
        "translations": {
          "vi": "Trước khi nghỉ sinh, cô ấy đã bàn giao chi tiết toàn bộ việc chăm sóc các khách hàng trọng điểm cho bạn Trương.",
          "ja": "産休に入る前に、主要顧客のフォロー業務をすべて張さんへ詳細に引き継ぎました。",
          "en": "Before maternity leave, she thoroughly handed over all key account follow-up tasks to Zhang."
        }
      }
    ],
    "businessTip": {
      "vi": "Văn bản bàn giao gọi là \"工作交接单\" (gōngzuò jiāojiē dān).",
      "ja": "引き継ぎ書は「工作交接单」と呼びます。",
      "en": "Formal handover checklists are known as 工作交接单."
    }
  },
  {
    "id": "bc_comm_006",
    "term": "探讨",
    "pinyin": "tàntǎo",
    "partOfSpeech": "verb",
    "category": "communication",
    "level": "intermediate",
    "tags": [
      "discussion",
      "brainstorm",
      "polite"
    ],
    "translations": {
      "vi": {
        "meaning": "Thảo luận / Nghiên cứu bàn bạc sâu",
        "note": "Từ ngữ học thuật, nhã nhặn khi cùng đối tác tìm phương án."
      },
      "ja": {
        "meaning": "検討する / 協議する / 掘り下げて話し合う",
        "note": "双方で建設的に意見交換すること。"
      },
      "en": {
        "meaning": "to explore / probe / discuss in depth",
        "note": "Constructive intellectual exploration of business ideas."
      }
    },
    "examples": [
      {
        "zh": "我们希望能与贵司共同探讨降低物流成本的创新方案。",
        "pinyin": "Wǒmen xīwàng néng yǔ guìsī gòngtóng tàntǎo jiàngdī wùliú chéngběn de chuàngxīn fāng'àn.",
        "translations": {
          "vi": "Chúng tôi hy vọng có thể cùng quý công ty thảo luận sâu về phương án đổi mới nhằm giảm chi phí logistics.",
          "ja": "貴社とともに物流コスト削減に向けた革新的な解決策を検討したいと考えております。",
          "en": "We hope to explore innovative logistics cost-saving solutions together with your team."
        }
      }
    ],
    "businessTip": {
      "vi": "Dùng \"探讨\" tạo cảm giác tôn trọng, bình đẳng và tìm kiếm giải pháp có lợi cho cả 2 bên (win-win).",
      "ja": "「探讨」は対等なパートナーシップで知恵を出し合う前向きなニュアンスを持ちます。",
      "en": "Using 探讨 conveys collaborative partnership rather than confrontational demands."
    }
  },
  {
    "id": "bc_comm_007",
    "term": "妥协",
    "pinyin": "tuǒxié",
    "partOfSpeech": "verb",
    "category": "communication",
    "level": "intermediate",
    "tags": [
      "negotiation",
      "compromise"
    ],
    "translations": {
      "vi": {
        "meaning": "Thỏa hiệp / Nhượng bộ",
        "note": "Mỗi bên lùi một bước để đi đến thỏa thuận chung."
      },
      "ja": {
        "meaning": "妥協する / 歩み寄る",
        "note": "交渉において双方が譲歩して合意に至ること。"
      },
      "en": {
        "meaning": "to compromise / make mutual concessions",
        "note": "Yielding ground to achieve consensus."
      }
    },
    "examples": [
      {
        "zh": "在付款方式上双方各妥协一步，最终达成了满意的协议。",
        "pinyin": "Zài fùkuǎn fāngshì shàng shuāngfāng gè tuǒxié yī bù, zuìzhōng dáchéng le mǎnyì de xiéyì.",
        "translations": {
          "vi": "Về phương thức thanh toán, mỗi bên nhượng bộ một bước, cuối cùng đã đạt được thỏa thuận mỹ mãn.",
          "ja": "決済条件について双方が一歩ずつ歩み寄り、最終的に納得のいく合意に達しました。",
          "en": "Both parties compromised on payment terms, ultimately reaching a mutually satisfactory accord."
        }
      }
    ],
    "businessTip": {
      "vi": "Thành ngữ ngoại thương rất hay dùng: \"双方各让一步\" (shuāngfāng gè ràng yī bù - đôi bên mỗi người lùi một bước).",
      "ja": "「双方各让一步（互いに一歩ずつ譲り合う）」は交渉妥結の常套句です。",
      "en": "The negotiation idiom \"双方各让一步\" (both sides take one step back) reflects ideal compromise."
    }
  },
  {
    "id": "bc_comm_008",
    "term": "答复",
    "pinyin": "dáfù",
    "partOfSpeech": "noun",
    "category": "communication",
    "level": "intermediate",
    "tags": [
      "reply",
      "response",
      "written"
    ],
    "translations": {
      "vi": {
        "meaning": "Câu trả lời chính thức / Hồi đáp",
        "note": "Văn bản phản hồi chính thức về một yêu cầu hay báo giá."
      },
      "ja": {
        "meaning": "正式回答 / 返答",
        "note": "照会や提案に対する公式な回答。"
      },
      "en": {
        "meaning": "formal response / official reply",
        "note": "Written official answer to business inquiries."
      }
    },
    "examples": [
      {
        "zh": "请在下周二下班前给我们一个明确的答复。",
        "pinyin": "Qǐng zài xiàzhōu èr xiàbān qián gěi wǒmen yī gè míngquè de dáfù.",
        "translations": {
          "vi": "Xin vui lòng cho chúng tôi một câu trả lời dứt khoát trước giờ tan sở thứ Ba tuần tới.",
          "ja": "来週火曜日の終業時間までに明確なご回答をいただけますようお願いいたします。",
          "en": "Please provide us with a definitive response before the close of business next Tuesday."
        }
      }
    ],
    "businessTip": {
      "vi": "\"敬请答复\" (jìngqǐng dáfù) là câu đề nghị lịch sự: \"Kính mong hồi âm\".",
      "ja": "「敬请答复」は回答を促す礼儀正しい依頼表現です。",
      "en": "\"敬请答复\" is a courteous closing phrase urging a prompt official response."
    }
  },
  {
    "id": "bc_comm_009",
    "term": "致歉",
    "pinyin": "zhìqiàn",
    "partOfSpeech": "verb",
    "category": "communication",
    "level": "intermediate",
    "tags": [
      "apology",
      "etiquette",
      "formal"
    ],
    "translations": {
      "vi": {
        "meaning": "Gửi lời xin lỗi chân thành",
        "note": "Văn phong trang trọng dùng khi doanh nghiệp gây ra bất tiện cho khách."
      },
      "ja": {
        "meaning": "お詫び申し上げる / 謝意を表す",
        "note": "不手際や迷惑に対する正式な謝罪。"
      },
      "en": {
        "meaning": "to express apologies / extend regrets",
        "note": "Formal expression of sincere regret or apology."
      }
    },
    "examples": [
      {
        "zh": "对于此次发货延迟给贵司带来的不便，我们深表致歉。",
        "pinyin": "Duìyú cǐcì fāhuò yánchí gěi guìsī dàilái de bùbiàn, wǒmen shēnbiǎo zhìqiàn.",
        "translations": {
          "vi": "Đối với những bất tiện do chậm trễ giao hàng đợt này gây ra cho quý công ty, chúng tôi xin bày tỏ lời xin lỗi sâu sắc.",
          "ja": "今回の出荷遅延により貴社にご迷惑をおかけしましたことを深くお詫び申し上げます。",
          "en": "We sincerely apologize for any inconvenience caused to your company by this shipment delay."
        }
      }
    ],
    "businessTip": {
      "vi": "Trong thư trang trọng, không dùng \"对不起\", mà luôn dùng \"深表歉意\" (shēn biǎo qiànyì) hoặc \"向您致歉\".",
      "ja": "ビジネスメールでは口語の「对不起」を避け、「深表歉意」や「致歉」を用います。",
      "en": "Avoid conversational 对不起 in formal letters; use 深表歉意 or 谨致歉意 instead."
    }
  },
  {
    "id": "bc_comm_010",
    "term": "误解",
    "pinyin": "wùjiě",
    "partOfSpeech": "noun",
    "category": "communication",
    "level": "intermediate",
    "tags": [
      "misunderstanding",
      "clarification"
    ],
    "translations": {
      "vi": {
        "meaning": "Hiểu lầm / Ngộ nhận",
        "note": "Sai sót về mặt thông tin truyền tải trong giao dịch."
      },
      "ja": {
        "meaning": "誤解 / 食い違い",
        "note": "意思疎通の齟齬や不一致。"
      },
      "en": {
        "meaning": "misunderstanding",
        "note": "Misinterpretation or divergence in communication."
      }
    },
    "examples": [
      {
        "zh": "为避免由于语言差异产生误解，我们建议以中英文对照版本为准。",
        "pinyin": "Wèi bìmiǎn yóuyú yǔyán chāyì chǎnshēng wùjiě, wǒmen jiànyì yǐ Zhōng-Yīngwén duìzhào bǎnběn wéi zhǔ.",
        "translations": {
          "vi": "Để tránh những hiểu lầm do bất đồng ngôn ngữ, chúng tôi đề xuất lấy bản đối chiếu song ngữ Trung - Anh làm chuẩn.",
          "ja": "言語の違いによる誤解を防ぐため、中英対訳版を正本とすることを提案します。",
          "en": "To avoid misunderstandings arising from language differences, we recommend bilingual Chinese-English versions."
        }
      }
    ],
    "businessTip": {
      "vi": "Khi muốn làm rõ thông tin, hãy nói: \"为避免误解，我们特此澄清...\" (Để tránh hiểu lầm, chúng tôi xin làm rõ...).",
      "ja": "「为避免误解（誤解を避けるため）」は前提確認時の便利な定型表現です。",
      "en": "Prepend clarifications with \"为避免误解\" to maintain diplomatic politeness."
    }
  },
  {
    "id": "bc_comm_011",
    "term": "坦诚",
    "pinyin": "tǎnchéng",
    "partOfSpeech": "adjective",
    "category": "communication",
    "level": "advanced",
    "tags": [
      "attitude",
      "sincerity",
      "trust"
    ],
    "translations": {
      "vi": {
        "meaning": "Thẳng thắn, chân thành",
        "note": "Thái độ cởi mở, không giấu giếm khó khăn khi làm việc cùng đối tác."
      },
      "ja": {
        "meaning": "率直かつ誠実な / 腹を割った",
        "note": "虚飾のないオープンで誠意ある姿勢。"
      },
      "en": {
        "meaning": "candid / frank and sincere",
        "note": "Approaching discussions with transparency and honest goodwill."
      }
    },
    "examples": [
      {
        "zh": "感谢您坦诚相告，这让我们能够更快地制定针对性的解决方案。",
        "pinyin": "Gǎnxiè nín tǎnchéng xiānggào, zhè ràng wǒmen nénggòu gèng kuài de zhìdìng zhēnduìxìng de jiějuéfāng'àn.",
        "translations": {
          "vi": "Cảm ơn anh đã chia sẻ thẳng thắn, điều này giúp chúng tôi nhanh chóng xây dựng được giải pháp phù hợp.",
          "ja": "率直にお話しいただき感謝いたします。これにより迅速に対策を策定することができます。",
          "en": "Thank you for your candid communication, enabling us to formulate targeted countermeasures promptly."
        }
      }
    ],
    "businessTip": {
      "vi": "\"坦诚相待\" (đối đãi chân thành thẳng thắn) là phẩm chất được các doanh nhân Trung Quốc rất coi trọng.",
      "ja": "「坦诚相待（誠意をもって腹を割って接する）」は中国商習慣で重視される徳目です。",
      "en": "Demonstrating candor (\"坦诚相待\") builds long-term relational goodwill."
    }
  },
  {
    "id": "bc_comm_012",
    "term": "反馈",
    "pinyin": "fǎnkuì",
    "partOfSpeech": "noun",
    "category": "communication",
    "level": "beginner",
    "tags": [
      "feedback",
      "market",
      "evaluation"
    ],
    "translations": {
      "vi": {
        "meaning": "Phản hồi / Nhận xét đánh giá",
        "note": "Ý kiến đóng góp từ khách hàng sau khi dùng thử hàng mẫu hoặc dịch vụ."
      },
      "ja": {
        "meaning": "フィードバック / 感想・意見",
        "note": "サンプル使用感や市場反応などの意見提供。"
      },
      "en": {
        "meaning": "feedback / user comments",
        "note": "Input or reactions provided after evaluating samples or proposals."
      }
    },
    "examples": [
      {
        "zh": "收到样品测试后，请及时把实际使用反馈发给我们技术人员。",
        "pinyin": "Shōudào yàngpǐn cèshì hòu, qǐng jíshí bǎ shíjì shǐyòng fǎnkuì fā gěi wǒmen jìshù rényuán.",
        "translations": {
          "vi": "Sau khi nhận và kiểm tra hàng mẫu, xin vui lòng gửi ngay phản hồi sử dụng thực tế cho nhân viên kỹ thuật của chúng tôi.",
          "ja": "サンプル評価後、実際の使用感を速やかに弊社の技術担当者までフィードバックしてください。",
          "en": "After testing the samples, please share practical usage feedback with our engineering team promptly."
        }
      }
    ],
    "businessTip": {
      "vi": "\"及时反馈\" (Jíshí fǎnkuì) nghĩa là \"phản hồi kịp thời\", cụm từ cực kỳ thông dụng.",
      "ja": "「及时反馈」は迅速な報告・返答を求める頻出フレーズです。",
      "en": "\"及时反馈\" is the ubiquitous business phrase for providing timely evaluations."
    }
  },
  {
    "id": "bc_sales_006",
    "term": "批发",
    "pinyin": "pīfā",
    "partOfSpeech": "verb",
    "category": "sales_purchasing",
    "level": "beginner",
    "tags": [
      "wholesale",
      "trading",
      "price"
    ],
    "translations": {
      "vi": {
        "meaning": "Bán buôn / Bán sỉ",
        "note": "Bán số lượng lớn cho đại lý với giá chiết khấu."
      },
      "ja": {
        "meaning": "卸売りする / 卸売",
        "note": "小売業者や大量購入者への大口販売。"
      },
      "en": {
        "meaning": "wholesale",
        "note": "Selling goods in large quantities at discounted prices."
      }
    },
    "examples": [
      {
        "zh": "我们是厂家直销，主要承接大额批发和跨境电商订单。",
        "pinyin": "Wǒmen shì chǎngjiā zhíxiāo, zhǔyào chéngjiē dà'é pīfā hé kuàjìng diànshāng dìngdān.",
        "translations": {
          "vi": "Chúng tôi là xưởng bán trực tiếp, chủ yếu nhận các đơn bán buôn số lượng lớn và thương mại điện tử xuyên biên giới.",
          "ja": "弊社はメーカー直販であり、大口卸売および越境ECの注文を主に承っております。",
          "en": "We are direct manufacturers primarily fulfilling large-scale wholesale and e-commerce orders."
        }
      }
    ],
    "businessTip": {
      "vi": "Giá bán buôn là \"批发价\" (pīfā jià), đối lập với giá bán lẻ là \"零售价\" (língshòu jià).",
      "ja": "卸価格は「批发价」、小売価格は「零售价」です。",
      "en": "Wholesale price is 批发价; retail price is 零售价."
    }
  },
  {
    "id": "bc_sales_007",
    "term": "零售",
    "pinyin": "língshòu",
    "partOfSpeech": "noun",
    "category": "sales_purchasing",
    "level": "beginner",
    "tags": [
      "retail",
      "consumer",
      "price"
    ],
    "translations": {
      "vi": {
        "meaning": "Bán lẻ",
        "note": "Bán trực tiếp từng đơn vị sản phẩm tới tay người tiêu dùng cuối cùng."
      },
      "ja": {
        "meaning": "小売 / リテール",
        "note": "一般消費者に向けた単品販売。"
      },
      "en": {
        "meaning": "retail",
        "note": "Direct sale of goods in small quantities to end consumers."
      }
    },
    "examples": [
      {
        "zh": "建议零售价（MSRP）定在每台99美元，以确保经销商有充足的利润空间。",
        "pinyin": "Jiànyì língshòujià (MSRP) dìng zài měi tái jiǔshíjiǔ Měiyuán, yǐ quèbǎo jīngxiāoshāng yǒu chōngzú de lìrùn kōngjiān.",
        "translations": {
          "vi": "Giá bán lẻ đề xuất (MSRP) được ấn định ở mức 99 USD/chiếc để đảm bảo các nhà phân phối có biên độ lợi nhuận dồi dào.",
          "ja": "代理店の十分な利益率を確保するため、希望小売価格（MSRP）は1台99ドルに設定されています。",
          "en": "The manufacturer suggested retail price (MSRP) is set at $99 to protect distributor profit margins."
        }
      }
    ],
    "businessTip": {
      "vi": "\"新零售\" (New Retail) là xu thế kết hợp thương mại điện tử trực tuyến và cửa hàng trải nghiệm truyền thống.",
      "ja": "「新零售（ニューリテール）」はオンラインとオフラインを融合した次世代流通モデルです。",
      "en": "\"新零售\" represents the omni-channel integration of online and brick-and-mortar commerce."
    }
  },
  {
    "id": "bc_sales_008",
    "term": "现货",
    "pinyin": "xiànhuò",
    "partOfSpeech": "noun",
    "category": "sales_purchasing",
    "level": "intermediate",
    "tags": [
      "inventory",
      "stock",
      "spot"
    ],
    "translations": {
      "vi": {
        "meaning": "Hàng có sẵn trong kho / Hàng giao ngay (In-stock / Ready to ship)",
        "note": "Hàng hóa đã sản xuất xong, sẵn sàng đóng gói xuất kho ngay."
      },
      "ja": {
        "meaning": "在庫あり / 現物商品 / 即納可能品",
        "note": "倉庫に現品在庫があり即出荷できる商品。"
      },
      "en": {
        "meaning": "spot goods / ready stock",
        "note": "Goods physically available for immediate dispatch."
      }
    },
    "examples": [
      {
        "zh": "这款黑色充电器目前仓库有5,000个现货，付款后48小时内即可出库。",
        "pinyin": "Zhè kuǎn hēisè chōngdiànqì mùqián cāngkù yǒu wǔqiān gè xiànhuò, fùkuǎn hòu sìshíbā xiǎoshí nèi jíkě chūkù.",
        "translations": {
          "vi": "Mẫu củ sạc màu đen này hiện trong kho có sẵn 5.000 chiếc, sau khi thanh toán trong vòng 48 giờ có thể xuất kho ngay.",
          "ja": "この黒の充電器は倉庫に5,000個の在庫があり、ご入金確認後48時間以内に出荷可能です。",
          "en": "This black charger has 5,000 units in stock, ready for dispatch within 48 hours of payment."
        }
      }
    ],
    "businessTip": {
      "vi": "\"现货\" (hàng sẵn) đối lập với \"期货\" (qīhuò - hàng đặt trước tương lai mới sản xuất xong).",
      "ja": "「现货（現物在庫）」の対義語は「期货（先物・受注生産品）」です。",
      "en": "现货 (spot inventory) is contrasted with 期货 (forward contract or custom manufactured)."
    }
  },
  {
    "id": "bc_sales_009",
    "term": "期货",
    "pinyin": "qīhuò",
    "partOfSpeech": "noun",
    "category": "sales_purchasing",
    "level": "intermediate",
    "tags": [
      "forward",
      "manufacturing",
      "leadtime"
    ],
    "translations": {
      "vi": {
        "meaning": "Hàng đặt sản xuất trước (giao theo kỳ hạn)",
        "note": "Hàng chưa có sẵn trong kho, nhận cọc xong nhà xưởng mới lên dây chuyền sản xuất."
      },
      "ja": {
        "meaning": "受注生産品 / 先物商品",
        "note": "発注・前金入金後に工場で製造手配される製品。"
      },
      "en": {
        "meaning": "futures / forward made-to-order goods",
        "note": "Manufactured against custom orders and delivered after lead time."
      }
    },
    "examples": [
      {
        "zh": "定制外观颜色属于期货，生产周期大约需要25个工作日。",
        "pinyin": "Dìngzhì wàiguān yánsè shǔyú qīhuò, shēngchǎn zhōuqī dàyuē xūyào èrshíwǔ gè gōngzuòrì.",
        "translations": {
          "vi": "Màu sắc vỏ làm theo yêu cầu riêng thuộc diện hàng đặt trước, chu kỳ sản xuất ước tính cần khoảng 25 ngày làm việc.",
          "ja": "特注カラー仕様は受注生産となり、製造リードタイムは約25営業日かかります。",
          "en": "Customized casing colors are manufactured to order with an estimated lead time of 25 working days."
        }
      }
    ],
    "businessTip": {
      "vi": "Với hàng \"期货\", người mua bắt buộc phải xác nhận kỹ thời gian giao hàng (交期 - jiāoqī).",
      "ja": "「期货」の場合は契約時に出荷納期（交期）の確約を厳密に行います。",
      "en": "For forward production (期货), meticulously lock down the delivery schedule (交期)."
    }
  },
  {
    "id": "bc_sales_010",
    "term": "包装",
    "pinyin": "bāozhuāng",
    "partOfSpeech": "noun",
    "category": "sales_purchasing",
    "level": "beginner",
    "tags": [
      "packing",
      "carton",
      "shipping"
    ],
    "translations": {
      "vi": {
        "meaning": "Đóng gói / Bao bì",
        "note": "Hộp sản phẩm, thùng carton bảo vệ hàng hóa trong vận chuyển."
      },
      "ja": {
        "meaning": "梱包 / パッケージ / 包装",
        "note": "製品の個装箱や輸送用段ボール。"
      },
      "en": {
        "meaning": "packaging / packing",
        "note": "Protective materials or retail presentation boxes."
      }
    },
    "examples": [
      {
        "zh": "所有外箱包装必须符合五层瓦楞纸抗压标准，并贴好易碎品标识。",
        "pinyin": "Suǒyǒu wàixiāng bāozhuāng bìxū fúhé wǔcéng wǎléngzhǐ kàngyā biāozhǔn, bìng tiē hǎo yìsuìpǐn biāozhì.",
        "translations": {
          "vi": "Toàn bộ bao bì thùng bên ngoài bắt buộc phải đạt tiêu chuẩn giấy sóng 5 lớp chịu nén và dán nhãn hàng dễ vỡ.",
          "ja": "すべての外装箱は5層強化段ボールの耐圧基準を満たし、ワレモノ注意ラベルを貼付してください。",
          "en": "All outer carton packaging must meet 5-ply corrugated crush standards and bear fragile stickers."
        }
      }
    ],
    "businessTip": {
      "vi": "Hộp màu bán lẻ gọi là \"彩盒\" (cǎihé), thùng carton vận chuyển lớn bên ngoài gọi là \"外箱\" (wàixiāng).",
      "ja": "製品化粧箱は「彩盒」、輸送用外箱段ボールは「外箱」と区別します。",
      "en": "Retail colored boxes are 彩盒; master export cartons are 外箱."
    }
  },
  {
    "id": "bc_sales_011",
    "term": "底价",
    "pinyin": "dǐjià",
    "partOfSpeech": "noun",
    "category": "sales_purchasing",
    "level": "intermediate",
    "tags": [
      "price",
      "bargain",
      "margin"
    ],
    "translations": {
      "vi": {
        "meaning": "Giá sàn / Giá kịch kim / Giá gốc thấp nhất",
        "note": "Mức giá tối thiểu mà bên bán có thể chấp nhận để không bị lỗ vốn."
      },
      "ja": {
        "meaning": "底値 / 仕切り価格 / 最低許容価格",
        "note": "売り手がこれ以上値下げできない限界原価ライン。"
      },
      "en": {
        "meaning": "bottom price / floor price",
        "note": "Lowest acceptable price without incurring losses."
      }
    },
    "examples": [
      {
        "zh": "每台18美元确实是我们的底价了，再降我们就没有任何利润空间了。",
        "pinyin": "Měi tái shíbā Měiyuán quèshí shì wǒmen de dǐjià le, zài jiàng wǒmen jiù méiyǒu rènhé lìrùn kōngjiān le.",
        "translations": {
          "vi": "18 USD mỗi chiếc quả thực đã là giá sàn của chúng tôi rồi, nếu giảm nữa thì chúng tôi chẳng còn chút biên lợi nhuận nào cả.",
          "ja": "1台18ドルは本当に弊社の限界底値であり、これ以上下げると利益が完全に吹き飛びます。",
          "en": "$18 per unit is genuinely our bottom line; any further reduction wipes out our entire margin."
        }
      }
    ],
    "businessTip": {
      "vi": "Khi đàm phán mua hàng, đừng vội tin ngay câu \"这是底价\" của nhà cung cấp, hãy mang sản lượng lớn ra để đổi chiết khấu.",
      "ja": "「底値だ」と言われても鵜呑みにせず、発注ロットの引き上げと引き換えに譲歩を模索します。",
      "en": "Do not accept \"this is bottom price\" at face value; counteroffer with higher order commitments."
    }
  },
  {
    "id": "bc_sales_012",
    "term": "佣金",
    "pinyin": "yòngjīn",
    "partOfSpeech": "noun",
    "category": "sales_purchasing",
    "level": "intermediate",
    "tags": [
      "commission",
      "fee",
      "broker"
    ],
    "translations": {
      "vi": {
        "meaning": "Tiền hoa hồng / Tiền môi giới",
        "note": "Khoản thù lao chi trả cho trung gian hoặc đại lý thúc đẩy đơn hàng."
      },
      "ja": {
        "meaning": "手数料 / コミッション / 仲介料",
        "note": "仲介者や代理店に支払われるインセンティブ。"
      },
      "en": {
        "meaning": "commission / brokerage fee",
        "note": "Compensation paid to sales agents or brokers per closed transaction."
      }
    },
    "examples": [
      {
        "zh": "合同约定卖方在收到全款后5个工作日内向中间商支付3%的佣金。",
        "pinyin": "Hétong yuēdìng màifāng zài shōudào quánkuǎn hòu wǔ gè gōngzuòrì nèi xiàng zhōngjiānshāng zhīfù bǎifēnzhī sān de yòngjīn.",
        "translations": {
          "vi": "Hợp đồng quy định bên bán trong vòng 5 ngày làm việc sau khi nhận đủ tiền sẽ thanh toán 3% tiền hoa hồng cho bên trung gian.",
          "ja": "契約に基づき、売主は代金完納後5営業日以内に仲介業者へ3%の手数料を送金します。",
          "en": "The contract provides that seller disburses 3% commission to the intermediary within 5 days of full payment."
        }
      }
    ],
    "businessTip": {
      "vi": "Báo giá đã bao gồm hoa hồng gọi là \"含佣价\" (CFO - Commission-inclusive price).",
      "ja": "手数料込み価格は「含佣价」と呼ばれます。",
      "en": "A price quote inclusive of agent commission is known as 含佣价."
    }
  }
];
