/**
 * js/data/business-data.js
 * Auto-generated 商务中文 (Business Chinese) Complete Learning & Reference Dataset
 * Generated: 2026-10-29T12:26:06.312Z
 * Total Categories: 12
 * Total Vocabulary: 144
 * Total Email Templates: 12
 * Total Trade Documents: 10
 * Total Scenarios: 10
 * Total Quizzes: 24
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BUSINESS_CHINESE_DATA = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  return {
  "meta": {
    "version": "1.0.0",
    "generatedAt": "2026-10-29T12:26:06.312Z",
    "counts": {
      "categories": 12,
      "vocabulary": 144,
      "emailTemplates": 12,
      "tradeDocuments": 10,
      "scenarios": 10,
      "quizzes": 24
    }
  },
  "categories": [
    {
      "id": "basic",
      "zhName": "商务基础",
      "name": {
        "vi": "Thương mại cơ bản",
        "en": "Business Basics",
        "ja": "ビジネス基礎"
      },
      "icon": "🏢",
      "description": {
        "vi": "Chào hỏi, giới thiệu bản thân, chức vụ phòng ban, tiền tệ số lượng và thông tin liên hệ công ty.",
        "en": "Greetings, company introductions, titles, departments, currencies, and contact info.",
        "ja": "挨拶、自己紹介、役職・部署、通貨・数量、会社連絡先などの基礎。"
      },
      "order": 1
    },
    {
      "id": "workplace",
      "zhName": "公司与职场",
      "name": {
        "vi": "Công ty & Môi trường làm việc",
        "en": "Company & Workplace",
        "ja": "企業と職場"
      },
      "icon": "👥",
      "description": {
        "vi": "Cơ cấu tổ chức doanh nghiệp, sắp xếp công việc, họp báo cáo, quản lý tiến độ và chấm công.",
        "en": "Organizational structures, job roles, meetings, reporting, and team collaboration.",
        "ja": "組織構造、業務分担、会議と報告、進捗管理、勤怠管理。"
      },
      "order": 2
    },
    {
      "id": "communication",
      "zhName": "商务沟通",
      "name": {
        "vi": "Giao tiếp thương mại",
        "en": "Business Communication",
        "ja": "ビジネスコミュニケーション"
      },
      "icon": "🤝",
      "description": {
        "vi": "Liên hệ đối tác, hỏi giá (询价), báo giá (报价), đàm phán thương lượng, xác nhận và xử lý vấn đề.",
        "en": "Client outreach, inquiries, quotation, bargaining, confirmations, and problem resolution.",
        "ja": "顧客対応、引き合い（引合い）、見積、価格交渉、受注確認、問題解決。"
      },
      "order": 3
    },
    {
      "id": "sales_purchasing",
      "zhName": "销售与采购",
      "name": {
        "vi": "Bán hàng & Mua hàng",
        "en": "Sales & Purchasing",
        "ja": "営業と購買"
      },
      "icon": "🛍️",
      "description": {
        "vi": "Nhu cầu khách hàng, quy cách sản phẩm, số lượng đặt tối thiểu (MOQ), sỉ lẻ và chiết khấu.",
        "en": "Client specs, MOQ, wholesale/retail, vendor sourcing, discounts, and order management.",
        "ja": "顧客ニーズ、製品仕様、最小ロット（MOQ）、卸売・小売、値引き・割引。"
      },
      "order": 4
    },
    {
      "id": "emails",
      "zhName": "商务邮件",
      "name": {
        "vi": "Email thương mại thực chiến",
        "en": "Commercial Emails",
        "ja": "ビジネスメール"
      },
      "icon": "✉️",
      "description": {
        "vi": "Bộ sưu tập mẫu thư điện tử giao dịch: hỏi giá, báo giá, giục thanh toán, xin lỗi giao trễ và cảm ơn.",
        "en": "Complete business email templates: inquiries, quotations, payment reminders, and follow-ups.",
        "ja": "実務メールテンプレート：問い合わせ、見積送付、支払督促、納期遅延のお詫び等。"
      },
      "order": 5
    },
    {
      "id": "trade",
      "zhName": "国际贸易",
      "name": {
        "vi": "Thương mại quốc tế",
        "en": "International Trade",
        "ja": "国際貿易"
      },
      "icon": "🌐",
      "description": {
        "vi": "Nghiệp vụ xuất nhập khẩu, Incoterms (FOB, CIF, EXW, DDP), hợp đồng ngoại thương và tranh chấp.",
        "en": "Import/export operations, Incoterms, international trade contracts, and dispute resolutions.",
        "ja": "輸出入実務、インコタームズ（貿易条件）、売買契約、貿易紛争。"
      },
      "order": 6
    },
    {
      "id": "documents",
      "zhName": "贸易单证",
      "name": {
        "vi": "Chứng từ ngoại thương",
        "en": "Trade Documents",
        "ja": "貿易書類（船積書類）"
      },
      "icon": "📄",
      "description": {
        "vi": "Hóa đơn thương mại, Packing List, Vận đơn B/L, AWB, C/O xuất xứ, Tờ khai hải quan và P/O.",
        "en": "Commercial Invoice, Packing List, Bill of Lading, Air Waybill, Certificate of Origin, and P/O.",
        "ja": "商業送り状（インボイス）、パッキングリスト、船荷証券（B/L）、原産地証明書。"
      },
      "order": 7
    },
    {
      "id": "customs",
      "zhName": "报关与清关",
      "name": {
        "vi": "Khai báo & Thông quan",
        "en": "Customs Clearance",
        "ja": "通関と税関手続"
      },
      "icon": "🛂",
      "description": {
        "vi": "Thủ tục hải quan, tờ khai, thuế nhập khẩu, kiểm hóa thực tế, mã số HS và giấy phép XNK.",
        "en": "Customs declaration, clearance, tariffs, inspections, HS codes, and import/export permits.",
        "ja": "税関申告、通関手続、関税、検査、HSコード、輸入許可証。"
      },
      "order": 8
    },
    {
      "id": "logistics",
      "zhName": "物流与供应链",
      "name": {
        "vi": "Logistics & Chuỗi cung ứng",
        "en": "Logistics & Supply Chain",
        "ja": "物流とサプライチェーン"
      },
      "icon": "🚢",
      "description": {
        "vi": "Vận tải biển, hàng không, kho bãi, theo dõi vận đơn, cước tàu, đóng gói và xử lý hàng hư hỏng.",
        "en": "Sea/air/land freight, warehousing, container shipping (FCL/LCL), tracking, and cargo claims.",
        "ja": "海上輸送・航空輸送、倉庫保管、コンテナ便、貨物追跡、運賃、破損補償。"
      },
      "order": 9
    },
    {
      "id": "finance",
      "zhName": "财务与结算",
      "name": {
        "vi": "Tài chính & Thanh toán",
        "en": "Finance & Settlement",
        "ja": "財務と決済"
      },
      "icon": "💳",
      "description": {
        "vi": "Phương thức thanh toán T/T, thư tín dụng L/C, tiền đặt cọc, thanh toán đợt cuối, tỷ giá và công nợ.",
        "en": "Payment terms (T/T, L/C), deposits, balance payments, exchange rates, and credit periods.",
        "ja": "電信送金（T/T）、信用状（L/C）、手付金、残金決済、為替レート、売掛金管理。"
      },
      "order": 10
    },
    {
      "id": "aftersales",
      "zhName": "售后与索赔",
      "name": {
        "vi": "Hậu mãi & Khiếu nại",
        "en": "After-sales & Claims",
        "ja": "アフターサービス・求償"
      },
      "icon": "🛡️",
      "description": {
        "vi": "Giải quyết lỗi chất lượng hàng, đổi trả, hoàn tiền, yêu cầu bồi thường và vi phạm hợp đồng.",
        "en": "Quality disputes, returns, refunds, compensations, breach of contract, and warranties.",
        "ja": "品質不良対応、返品・交換、返金、損害賠償請求、契約不履行への対策。"
      },
      "order": 11
    },
    {
      "id": "scenarios",
      "zhName": "情景练习",
      "name": {
        "vi": "Tình huống thực chiến",
        "en": "Interactive Scenarios",
        "ja": "実践シナリオロールプレイ"
      },
      "icon": "🎭",
      "description": {
        "vi": "Nhập vai đối thoại từng bước xử lý tình huống thực tế: hỏi giá, đàm phán, thanh toán và xử lý sự cố.",
        "en": "Step-by-step role-playing conversations: price inquiries, bargaining, and defect handling.",
        "ja": "段階的ロールプレイ形式の会話練習：引合い、価格交渉、クレーム処理。"
      },
      "order": 12
    }
  ],
  "vocabulary": [
    {
      "id": "bc_basic_001",
      "term": "贵公司",
      "pinyin": "guì gōngsī",
      "partOfSpeech": "noun",
      "category": "basic",
      "level": "beginner",
      "tags": [
        "honorific",
        "etiquette",
        "company"
      ],
      "translations": {
        "vi": {
          "meaning": "Quý công ty",
          "note": "Cách gọi lịch sự, trang trọng khi xưng hô với công ty đối tác."
        },
        "ja": {
          "meaning": "貴社 / 貴社様",
          "note": "相手の会社を敬って呼ぶ表現。"
        },
        "en": {
          "meaning": "your esteemed company",
          "note": "Polite honorific used to address a partner company."
        }
      },
      "examples": [
        {
          "zh": "我们非常希望与贵公司建立长期的合作关系。",
          "pinyin": "Wǒmen fēicháng xīwàng yǔ guì gōngsī jiànlì chángqī de hézuò guānxì.",
          "translations": {
            "vi": "Chúng tôi rất hy vọng được thiết lập quan hệ hợp tác lâu dài với quý công ty.",
            "ja": "貴社と長期的な協力関係を築くことを心より希望しております。",
            "en": "We sincerely hope to establish a long-term cooperative relationship with your company."
          }
        }
      ],
      "businessTip": {
        "vi": "Khi xưng hô công ty của mình dùng \"我司\" (wǒ sī - công ty chúng tôi) hoặc \"我们公司\", không bao giờ dùng \"贵公司\" cho chính mình.",
        "ja": "自社を指すときは「我司」または「我们公司」（弊社）を使い、「贵公司」は相手にのみ使います。",
        "en": "Always use 贵公司 to refer to the counterparty. Refer to your own company as 我司 (our company)."
      }
    },
    {
      "id": "bc_basic_002",
      "term": "我司",
      "pinyin": "wǒ sī",
      "partOfSpeech": "noun",
      "category": "basic",
      "level": "beginner",
      "tags": [
        "company",
        "written",
        "formal"
      ],
      "translations": {
        "vi": {
          "meaning": "Công ty chúng tôi (bổn công ty / công ty tôi)",
          "note": "Văn phong thương mại trang trọng thường dùng trong email, hợp đồng."
        },
        "ja": {
          "meaning": "弊社 / 当社",
          "note": "ビジネス文書・メールで自社を指す定番の謙称。"
        },
        "en": {
          "meaning": "our company",
          "note": "Formal written term for referring to one's own company."
        }
      },
      "examples": [
        {
          "zh": "我司主营各类电子配件的进出口业务。",
          "pinyin": "Wǒ sī zhǔyíng gèlèi diànzǐ pèijiàn de jìnchūkǒu yèwù.",
          "translations": {
            "vi": "Công ty chúng tôi kinh doanh chủ yếu các dịch vụ xuất nhập khẩu linh kiện điện tử.",
            "ja": "当社は各種電子部品の輸出入業務を主幹事業としております。",
            "en": "Our company specializes in the import and export of various electronic accessories."
          }
        }
      ]
    },
    {
      "id": "bc_basic_003",
      "term": "拜访",
      "pinyin": "bàifǎng",
      "partOfSpeech": "verb",
      "category": "basic",
      "level": "beginner",
      "tags": [
        "meeting",
        "etiquette",
        "courtesy"
      ],
      "translations": {
        "vi": {
          "meaning": "Đến thăm / ghé thăm / bái phỏng",
          "note": "Dùng khi đến thăm đối tác hoặc khách hàng một cách lịch sự."
        },
        "ja": {
          "meaning": "訪問する / お伺いする",
          "note": "取引先を敬意をもって訪ねる行為。"
        },
        "en": {
          "meaning": "to visit / to pay a visit",
          "note": "Formal term for business visits to partners or clients."
        }
      },
      "examples": [
        {
          "zh": "下周二下午我们想去拜访您，请问您方便吗？",
          "pinyin": "Xià zhōu'èr xiàwǔ wǒmen xiǎng qù bàifǎng nín, qǐngwèn nín fāngbiàn ma?",
          "translations": {
            "vi": "Chiều thứ Ba tuần tới chúng tôi muốn đến thăm anh/chị, xin hỏi anh/chị có tiện không?",
            "ja": "来週の火曜日の午後に貴社をご訪問したいのですが、ご都合はいかがでしょうか？",
            "en": "We would like to visit you next Tuesday afternoon. Would that be convenient for you?"
          }
        }
      ]
    },
    {
      "id": "bc_basic_004",
      "term": "名片",
      "pinyin": "míngpiàn",
      "partOfSpeech": "noun",
      "category": "basic",
      "level": "beginner",
      "tags": [
        "networking",
        "etiquette",
        "card"
      ],
      "translations": {
        "vi": {
          "meaning": "Danh thiếp / namecard",
          "note": "Trao đổi danh thiếp là nghi thức mở đầu buổi gặp gỡ kinh doanh."
        },
        "ja": {
          "meaning": "名刺",
          "note": "ビジネスの初対面で必ず交わすもの。"
        },
        "en": {
          "meaning": "business card",
          "note": "Exchanged at the beginning of meetings."
        }
      },
      "examples": [
        {
          "zh": "这是我的名片，上面有我的手机和微信号。",
          "pinyin": "Zhè shì wǒ de míngpiàn, shàngmiàn yǒu wǒ de shǒujī hé Wēixìn hào.",
          "translations": {
            "vi": "Đây là danh thiếp của tôi, trên đó có số điện thoại và tài khoản WeChat của tôi.",
            "ja": "こちらは私の名刺です。携帯番号とWeChatのIDが記載されております。",
            "en": "Here is my business card, with my mobile number and WeChat ID on it."
          }
        }
      ],
      "businessTip": {
        "vi": "Trong văn hóa kinh doanh Trung Quốc, luôn dùng hai tay khi đưa và nhận danh thiếp, đồng thời nhìn vào danh thiếp vài giây để thể hiện sự tôn trọng.",
        "ja": "中国の商習慣でも名刺は必ず両手で差し出し、両手で受け取り、数秒間しっかり見るのがマナーです。",
        "en": "Always give and receive business cards with both hands in Chinese business culture."
      }
    },
    {
      "id": "bc_basic_005",
      "term": "祝商祺",
      "pinyin": "zhù shāng qí",
      "partOfSpeech": "phrase",
      "category": "basic",
      "level": "intermediate",
      "tags": [
        "email",
        "salutation",
        "sign-off"
      ],
      "translations": {
        "vi": {
          "meaning": "Chúc công việc kinh doanh phát đạt",
          "note": "Lời chúc kết thúc email hoặc thư từ thương mại kinh điển."
        },
        "ja": {
          "meaning": "貴社のますますのご発展をお祈り申し上げます",
          "note": "ビジネスメール末尾の結びの定番挨拶。"
        },
        "en": {
          "meaning": "Best regards / Wishing you prosperity in business",
          "note": "Traditional Chinese business email sign-off phrase."
        }
      },
      "examples": [
        {
          "zh": "如有任何问题，请随时与我们联系。顺祝商祺！",
          "pinyin": "Rú yǒu rènhé wèntí, qǐng suíshí yǔ wǒmen liánxì. Shùn zhù shāng qí!",
          "translations": {
            "vi": "Nếu có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi bất cứ lúc nào. Chúc việc kinh doanh thuận lợi!",
            "ja": "ご不明な点がございましたら、いつでもご連絡ください。草々 / 順祝商祺！",
            "en": "If you have any questions, please feel free to contact us. Best regards!"
          }
        }
      ]
    },
    {
      "id": "bc_basic_006",
      "term": "联系方式",
      "pinyin": "liánxì fāngshì",
      "partOfSpeech": "noun",
      "category": "basic",
      "level": "beginner",
      "tags": [
        "contact",
        "communication"
      ],
      "translations": {
        "vi": {
          "meaning": "Thông tin liên hệ / phương thức liên lạc",
          "note": "Bao gồm email, số điện thoại, WeChat, WhatsApp."
        },
        "ja": {
          "meaning": "連絡先 / 連絡方法",
          "note": "電話、メール、WeChat等のコンタクト先。"
        },
        "en": {
          "meaning": "contact information",
          "note": "Ways to reach someone (phone, email, messaging)."
        }
      },
      "examples": [
        {
          "zh": "请留下您的联系方式，方便我们后续发送详细资料。",
          "pinyin": "Qǐng liú xià nín de liánxì fāngshì, fāngbiàn wǒmen hòuxù fāsòng xiángxì zīliào.",
          "translations": {
            "vi": "Xin vui lòng để lại thông tin liên hệ của bạn để chúng tôi tiện gửi tài liệu chi tiết sau này.",
            "ja": "後ほど詳細資料をお送りいたしますので、ご連絡先をお教えいただけますでしょうか。",
            "en": "Please leave your contact information so we can follow up with detailed materials."
          }
        }
      ]
    },
    {
      "id": "bc_work_001",
      "term": "总经理",
      "pinyin": "zǒng jīnglǐ",
      "partOfSpeech": "noun",
      "category": "workplace",
      "level": "beginner",
      "tags": [
        "role",
        "title",
        "management"
      ],
      "translations": {
        "vi": {
          "meaning": "Tổng giám đốc (thường viết tắt là 总 - Zǒng)",
          "note": "Người chịu trách nhiệm điều hành toàn bộ công ty."
        },
        "ja": {
          "meaning": "社長 / 総支配人 / ゼネラルマネージャー",
          "note": "企業の最高執行責任者・トップ。"
        },
        "en": {
          "meaning": "General Manager (GM) / CEO",
          "note": "Top executive of a company."
        }
      },
      "examples": [
        {
          "zh": "王总，这是关于下半年预算的最终报告。",
          "pinyin": "Wáng zǒng, zhè shì guānyú xiàbànnián yùsuàn de zuìzhōng bàogào.",
          "translations": {
            "vi": "Tổng giám đốc Vương, đây là báo cáo cuối cùng về ngân sách nửa cuối năm.",
            "ja": "王社長、こちらが下半期の予算に関する最終報告書でございます。",
            "en": "General Manager Wang, this is the final report regarding the budget for the second half of the year."
          }
        }
      ],
      "businessTip": {
        "vi": "Người Trung Quốc thường gọi họ + 总 (ví dụ: Vương tổng -> 王总, Lý tổng -> 李总) để thể hiện sự kính trọng.",
        "ja": "中国では「苗字＋总」（王总、李总など）と呼ぶのが親しみと敬意を表す一般的なビジネスマナーです。",
        "en": "In Chinese business, address directors and executives as [Surname] + 总 (e.g. Wang Zong)."
      }
    },
    {
      "id": "bc_work_002",
      "term": "采购部",
      "pinyin": "cǎigòu bù",
      "partOfSpeech": "noun",
      "category": "workplace",
      "level": "beginner",
      "tags": [
        "department",
        "purchasing",
        "procurement"
      ],
      "translations": {
        "vi": {
          "meaning": "Phòng mua hàng / Phòng thu mua",
          "note": "Bộ phận phụ trách tìm nhà cung ứng và mua nguyên vật liệu."
        },
        "ja": {
          "meaning": "調達部 / 購買部",
          "note": "資材や製品の仕入れ・購買を担当する部署。"
        },
        "en": {
          "meaning": "Purchasing Department / Procurement",
          "note": "Department in charge of sourcing and acquiring supplies."
        }
      },
      "examples": [
        {
          "zh": "采购部正在对三家供应商进行全面的资质审核。",
          "pinyin": "Cǎigòu bù zhèngzài duì sān jiā gōngyìngshāng jìnxíng quánmiàn de zīzhì shěnhé.",
          "translations": {
            "vi": "Phòng mua hàng đang tiến hành thẩm định toàn diện năng lực của ba nhà cung cấp.",
            "ja": "調達部は現在、サプライヤー3社の資格審査を全面的に行っております。",
            "en": "The purchasing department is currently conducting a thorough qualification audit on three vendors."
          }
        }
      ]
    },
    {
      "id": "bc_work_003",
      "term": "会议纪要",
      "pinyin": "huìyì jìyào",
      "partOfSpeech": "noun",
      "category": "workplace",
      "level": "intermediate",
      "tags": [
        "meeting",
        "minutes",
        "documentation"
      ],
      "translations": {
        "vi": {
          "meaning": "Biên bản cuộc họp",
          "note": "Tài liệu ghi lại các quyết định và đầu việc sau cuộc họp."
        },
        "ja": {
          "meaning": "議事録",
          "note": "会議の決定事項やタスクを記録した文書。"
        },
        "en": {
          "meaning": "meeting minutes / summary",
          "note": "Record of discussion points and actions after a meeting."
        }
      },
      "examples": [
        {
          "zh": "今天的会议纪要我已经整理好，稍后发到大家的邮箱。",
          "pinyin": "Jīntiān de huìyì jìyào wǒ yǐjīng zhěnglǐ hǎo, shāohòu fā dào dàjiā de yóuxiāng.",
          "translations": {
            "vi": "Biên bản cuộc họp hôm nay tôi đã soạn xong, lát nữa sẽ gửi vào email của mọi người.",
            "ja": "本日の議事録をまとめましたので、後ほど皆様のメールにお送りいたします。",
            "en": "I have compiled today's meeting minutes and will email them to everyone shortly."
          }
        }
      ]
    },
    {
      "id": "bc_work_004",
      "term": "进度",
      "pinyin": "jìndù",
      "partOfSpeech": "noun",
      "category": "workplace",
      "level": "beginner",
      "tags": [
        "project",
        "progress",
        "timeline"
      ],
      "translations": {
        "vi": {
          "meaning": "Tiến độ (công việc, sản xuất, dự án)",
          "note": "Từ thường xuyên dùng khi cập nhật trạng thái công việc."
        },
        "ja": {
          "meaning": "進捗（しんちょく） / スケジュール",
          "note": "プロジェクトや生産の進行状況。"
        },
        "en": {
          "meaning": "progress / schedule",
          "note": "Status of an ongoing project or task."
        }
      },
      "examples": [
        {
          "zh": "请问目前生产进度如何？能按时交货吗？",
          "pinyin": "Qǐngwèn mùqián shēngchǎn jìndù rúhé? Néng ànshí jiāohuò ma?",
          "translations": {
            "vi": "Xin hỏi tiến độ sản xuất hiện tại thế nào? Có thể giao hàng đúng hạn không?",
            "ja": "現在の生産進捗はいかがでしょうか？予定通り納品可能でしょうか？",
            "en": "How is the current production progress? Can the goods be delivered on schedule?"
          }
        }
      ]
    },
    {
      "id": "bc_work_005",
      "term": "加班",
      "pinyin": "jiā bān",
      "partOfSpeech": "verb",
      "category": "workplace",
      "level": "beginner",
      "tags": [
        "work",
        "overtime",
        "attendance"
      ],
      "translations": {
        "vi": {
          "meaning": "Làm thêm giờ / tăng ca",
          "note": "Rất phổ biến trong môi trường nhà xưởng, văn phòng."
        },
        "ja": {
          "meaning": "残業する",
          "note": "所定労働時間を超えて働くこと。"
        },
        "en": {
          "meaning": "to work overtime",
          "note": "Working beyond normal business hours."
        }
      },
      "examples": [
        {
          "zh": "为了赶在节前出货，车间工人这周末需要加班。",
          "pinyin": "Wèile gǎn zài jié qián chūhuò, chējiān gōngrén zhè zhōumò xūyào jiābān.",
          "translations": {
            "vi": "Để kịp xuất hàng trước kỳ nghỉ lễ, công nhân phân xưởng cuối tuần này cần tăng ca.",
            "ja": "連休前の出荷に間に合わせるため、工場の作業員は今週末残業する必要があります。",
            "en": "In order to ship before the holiday, workshop workers need to work overtime this weekend."
          }
        }
      ]
    },
    {
      "id": "bc_comm_001",
      "term": "询价",
      "pinyin": "xún jià",
      "partOfSpeech": "verb",
      "category": "communication",
      "level": "beginner",
      "tags": [
        "inquiry",
        "pricing",
        "trade"
      ],
      "translations": {
        "vi": {
          "meaning": "Hỏi giá / yêu cầu báo giá (Inquiry)",
          "note": "Hành động mở đầu khi người mua tìm kiếm sản phẩm."
        },
        "ja": {
          "meaning": "引き合い / 価格照会（インクワイアリー）",
          "note": "買い手が売り手に価格や取引条件を問い合わせること。"
        },
        "en": {
          "meaning": "price inquiry / to inquire about prices",
          "note": "Requesting a price quote from a supplier."
        }
      },
      "examples": [
        {
          "zh": "我们收到了德国客户对不锈钢水壶的询价。",
          "pinyin": "Wǒmen shōudào le Déguó kèhù duì bùxiùgāng shuǐhú de xúnjià.",
          "translations": {
            "vi": "Chúng tôi đã nhận được yêu cầu báo giá bình giữ nhiệt inox từ khách hàng Đức.",
            "ja": "ドイツの顧客からステンレス製ボトルの価格照会を受け取りました。",
            "en": "We received a price inquiry from a German client for stainless steel kettles."
          }
        }
      ]
    },
    {
      "id": "bc_comm_002",
      "term": "报价",
      "pinyin": "bào jià",
      "partOfSpeech": "verb",
      "category": "communication",
      "level": "beginner",
      "tags": [
        "quotation",
        "pricing",
        "supplier"
      ],
      "translations": {
        "vi": {
          "meaning": "Báo giá / đưa ra mức giá (Quotation)",
          "note": "Nhà cung cấp đưa ra bảng giá sản phẩm cho khách."
        },
        "ja": {
          "meaning": "見積もり（を出す） / オファー",
          "note": "売り手が買い手に単価や条件を提示すること。"
        },
        "en": {
          "meaning": "to quote a price / quotation",
          "note": "Providing formal pricing to a buyer."
        }
      },
      "examples": [
        {
          "zh": "附件是我们最新的FOB上海报价单，请查收。",
          "pinyin": "Fùjiàn shì wǒmen zuìxīn de FOB Shànghǎi bàojià dān, qǐng cháshōu.",
          "translations": {
            "vi": "File đính kèm là bảng báo giá FOB Thượng Hải mới nhất của chúng tôi, xin vui lòng kiểm tra.",
            "ja": "添付ファイルは当社の最新のFOB上海見積書です。ご確認ください。",
            "en": "Attached is our latest FOB Shanghai quotation sheet for your review."
          }
        }
      ]
    },
    {
      "id": "bc_comm_003",
      "term": "议价",
      "pinyin": "yì jià",
      "partOfSpeech": "verb",
      "category": "communication",
      "level": "intermediate",
      "tags": [
        "negotiation",
        "bargaining",
        "discount"
      ],
      "translations": {
        "vi": {
          "meaning": "Thương lượng giá / đàm phán giá cả",
          "note": "Thương lượng giữa người mua và người bán để đạt mức giá tối ưu."
        },
        "ja": {
          "meaning": "価格交渉 / 値引き交渉",
          "note": "単価や支払条件について双方がすり合わせを行うこと。"
        },
        "en": {
          "meaning": "to negotiate prices / bargaining",
          "note": "Discussing prices to find mutual agreement."
        }
      },
      "examples": [
        {
          "zh": "如果贵方的订购量能达到两万件，价格上我们还可以进一步议价。",
          "pinyin": "Rúguǒ guì fāng de dìnggòu liàng néng dádào liǎng wàn jiàn, jiàgé shàng wǒmen hái kěyǐ jìnyíbù yìjià.",
          "translations": {
            "vi": "Nếu số lượng đặt hàng của quý bên đạt được 20.000 sản phẩm, chúng tôi có thể thương lượng thêm về giá.",
            "ja": "もし貴社のご発注数量が2万個に達するようでしたら、さらなる価格交渉の余地がございます。",
            "en": "If your order quantity reaches 20,000 units, we can negotiate the price further."
          }
        }
      ]
    },
    {
      "id": "bc_comm_004",
      "term": "确认订单",
      "pinyin": "quèrèn dìngdān",
      "partOfSpeech": "phrase",
      "category": "communication",
      "level": "beginner",
      "tags": [
        "order",
        "confirmation",
        "contract"
      ],
      "translations": {
        "vi": {
          "meaning": "Xác nhận đơn đặt hàng",
          "note": "Bước chính thức chốt đơn trước khi đi vào sản xuất."
        },
        "ja": {
          "meaning": "注文確定 / 受注確認",
          "note": "発注書の内容を確認し合意すること。"
        },
        "en": {
          "meaning": "to confirm an order",
          "note": "Finalizing an order between buyer and seller."
        }
      },
      "examples": [
        {
          "zh": "请在周五之前签字回传形式发票，以便我们确认订单并排单生产。",
          "pinyin": "Qǐng zài zhōuwǔ zhīqián qiānzì huíchuán xíngshì fāpiào, yǐbiàn wǒmen quèrèn dìngdān bìng pái dān shēngchǎn.",
          "translations": {
            "vi": "Vui lòng ký tên và gửi lại hóa đơn chiếu lệ (Proforma Invoice) trước thứ Sáu để chúng tôi xác nhận đơn và lên lịch sản xuất.",
            "ja": "受注確定および生産スケジュールの確保のため、金曜日までにプロフォーマインボイスにご署名の上ご返送ください。",
            "en": "Please sign and return the proforma invoice by Friday so we can confirm the order and schedule production."
          }
        }
      ]
    },
    {
      "id": "bc_comm_005",
      "term": "催促",
      "pinyin": "cuīcù",
      "partOfSpeech": "verb",
      "category": "communication",
      "level": "intermediate",
      "tags": [
        "follow-up",
        "reminder",
        "urgent"
      ],
      "translations": {
        "vi": {
          "meaning": "Thúc giục / nhắc nhở / hối thúc (phản hồi, thanh toán, giao hàng)",
          "note": "Dùng khi cần đốc thúc tiến độ hoặc chờ phản hồi đối tác."
        },
        "ja": {
          "meaning": "督促する / 催促する",
          "note": "返信や納期、入金を促すこと。"
        },
        "en": {
          "meaning": "to urge / to expedite / to press for",
          "note": "Following up persistently for replies or deliveries."
        }
      },
      "examples": [
        {
          "zh": "我已经发邮件催促货代尽快提供集装箱提单号。",
          "pinyin": "Wǒ yǐjīng fā yóujiàn cuīcù huòdài jǐnkuài tígōng jízhuāngxiāng tídān hào.",
          "translations": {
            "vi": "Tôi đã gửi email thúc giục công ty logistics nhanh chóng cung cấp số vận đơn container.",
            "ja": "フォワーダーにコンテナのB/L番号を至急提供するよう、すでにメールで催促いたしました。",
            "en": "I have already emailed the freight forwarder urging them to provide the container B/L number as soon as possible."
          }
        }
      ]
    },
    {
      "id": "bc_sales_001",
      "term": "最低订购量",
      "pinyin": "zuìdī dìnggòu liàng",
      "partOfSpeech": "noun",
      "category": "sales_purchasing",
      "level": "beginner",
      "tags": [
        "moq",
        "purchasing",
        "terms"
      ],
      "translations": {
        "vi": {
          "meaning": "Số lượng đặt hàng tối thiểu (MOQ)",
          "note": "Viết tắt tiếng Anh là MOQ (Minimum Order Quantity)."
        },
        "ja": {
          "meaning": "最小発注数量（MOQ）",
          "note": "注文を受ける最低限の数量ロット。"
        },
        "en": {
          "meaning": "Minimum Order Quantity (MOQ)",
          "note": "Smallest order volume a factory will accept."
        }
      },
      "examples": [
        {
          "zh": "由于定制外包装需要开模，这款产品的最低订购量是3000件。",
          "pinyin": "Yóuyú dìngzhì wàibāozhuāng xūyào kāimó, zhè kuǎn chǎnpǐn de zuìdī dìnggòu liàng shì sānqiān jiàn.",
          "translations": {
            "vi": "Do bao bì tùy chỉnh cần tạo khuôn riêng, số lượng đặt hàng tối thiểu của sản phẩm này là 3.000 chiếc.",
            "ja": "特注パッケージの金型製作が必要なため、本製品の最小発注数量（MOQ）は3,000個となります。",
            "en": "Because custom packaging requires molding, the MOQ for this product is 3,000 units."
          }
        }
      ]
    },
    {
      "id": "bc_sales_002",
      "term": "规格",
      "pinyin": "guīgé",
      "partOfSpeech": "noun",
      "category": "sales_purchasing",
      "level": "beginner",
      "tags": [
        "specification",
        "product",
        "detail"
      ],
      "translations": {
        "vi": {
          "meaning": "Quy cách / thông số kỹ thuật (kích thước, công suất, chất liệu)",
          "note": "Tài liệu chi tiết mô tả thông số sản phẩm."
        },
        "ja": {
          "meaning": "規格 / 仕様（スペック）",
          "note": "寸法、材質、性能などの製品基準。"
        },
        "en": {
          "meaning": "specification / specs",
          "note": "Technical standards and dimensions of a product."
        }
      },
      "examples": [
        {
          "zh": "请确认图纸上的技术规格是否符合当地的安全认证标准。",
          "pinyin": "Qǐng quèrèn túzhǐ shàng de jìshù guīgé shìfǒu fúhé dāngdì de ānquán rènzhèng biāozhǔn.",
          "translations": {
            "vi": "Xin hãy xác nhận xem thông số kỹ thuật trên bản vẽ có phù hợp tiêu chuẩn chứng nhận an toàn tại địa phương không.",
            "ja": "図面上の技術仕様が現地の安全認証基準に適合しているかご確認ください。",
            "en": "Please verify whether the technical specifications on the blueprint meet local safety certification standards."
          }
        }
      ]
    },
    {
      "id": "bc_sales_003",
      "term": "供应商",
      "pinyin": "gōngyìngshāng",
      "partOfSpeech": "noun",
      "category": "sales_purchasing",
      "level": "beginner",
      "tags": [
        "supplier",
        "vendor",
        "partner"
      ],
      "translations": {
        "vi": {
          "meaning": "Nhà cung cấp / đối tác cung ứng",
          "note": "Bên bán nguyên vật liệu, thành phẩm hoặc dịch vụ."
        },
        "ja": {
          "meaning": "サプライヤー / 仕入先 / 納入業者",
          "note": "商品や原材料を納入する会社。"
        },
        "en": {
          "meaning": "supplier / vendor",
          "note": "Entity providing goods or services."
        }
      },
      "examples": [
        {
          "zh": "作为核心供应商，他们一直能够保证稳定的供货质量。",
          "pinyin": "Zuòwéi héxīn gōngyìngshāng, tāmen yìzhí nénggòu bǎozhèng wěndìng de gōnghuò zhìliàng.",
          "translations": {
            "vi": "Với tư cách là nhà cung cấp cốt lõi, họ luôn đảm bảo được chất lượng cung ứng hàng ổn định.",
            "ja": "コアサプライヤーとして、彼らは常に安定した品質での供給を維持しています。",
            "en": "As a key supplier, they have consistently maintained stable supply quality."
          }
        }
      ]
    },
    {
      "id": "bc_sales_004",
      "term": "样品",
      "pinyin": "yàngpǐn",
      "partOfSpeech": "noun",
      "category": "sales_purchasing",
      "level": "beginner",
      "tags": [
        "sample",
        "testing",
        "prototype"
      ],
      "translations": {
        "vi": {
          "meaning": "Hàng mẫu / sản phẩm mẫu (Sample)",
          "note": "Gửi trước khi ký hợp đồng để khách test chất lượng."
        },
        "ja": {
          "meaning": "サンプル / 見本",
          "note": "本発注の前に品質を確認するための試作品。"
        },
        "en": {
          "meaning": "sample / prototype",
          "note": "Test product sent before mass production."
        }
      },
      "examples": [
        {
          "zh": "样品通常免费提供，但国际快递运费需要由买方承担。",
          "pinyin": "Yàngpǐn tōngcháng miǎnfèi tígōng, dàn guójì kuàidì yùnfèi xūyào yóu mǎifāng chéngdān.",
          "translations": {
            "vi": "Hàng mẫu thường được cung cấp miễn phí, nhưng cước chuyển phát nhanh quốc tế do bên mua chi trả.",
            "ja": "サンプルは原則無料ですが、国際配送料はバイヤー側のご負担となります。",
            "en": "Samples are usually provided free of charge, but international courier freight is to be paid by the buyer."
          }
        }
      ]
    },
    {
      "id": "bc_sales_005",
      "term": "折扣",
      "pinyin": "zhékòu",
      "partOfSpeech": "noun",
      "category": "sales_purchasing",
      "level": "beginner",
      "tags": [
        "discount",
        "pricing",
        "bargain"
      ],
      "translations": {
        "vi": {
          "meaning": "Chiết khấu / giảm giá",
          "note": "Chú ý: tiếng Trung \"9折\" nghĩa là giảm 10% (trả 90%), \"85折\" là trả 85%."
        },
        "ja": {
          "meaning": "割引 / ディスカウント",
          "note": "中国語の「打九折」は10%引き、「打八折」は20%引きを意味します。"
        },
        "en": {
          "meaning": "discount / rebate",
          "note": "Note: Chinese \"9折\" means 10% off (pay 90%)."
        }
      },
      "examples": [
        {
          "zh": "如果本次订单金额超过五万美元，我们可以给予5%的批量折扣。",
          "pinyin": "Rúguǒ běn cì dìngdān jīné chāoguò wǔ wàn měiyuán, wǒmen kěyǐ jǐyǔ bǎifēnzhīwǔ de pīliàng zhékòu.",
          "translations": {
            "vi": "Nếu giá trị đơn hàng lần này vượt quá 50.000 USD, chúng tôi có thể áp dụng mức chiết khấu số lượng 5%.",
            "ja": "今回の発注総額が5万米ドルを超える場合、5％の大口割引を適用いたします。",
            "en": "If this order amount exceeds USD 50,000, we can offer a 5% volume discount."
          }
        }
      ]
    },
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
    },
    {
      "id": "bc_email_001",
      "term": "附件",
      "pinyin": "fùjiàn",
      "partOfSpeech": "noun",
      "category": "emails",
      "level": "beginner",
      "tags": [
        "email",
        "attachment",
        "file"
      ],
      "translations": {
        "vi": {
          "meaning": "Tệp đính kèm / file đính kèm",
          "note": "Từ xuất hiện trong hầu hết các email thương mại."
        },
        "ja": {
          "meaning": "添付ファイル",
          "note": "メールに添える資料やファイル。"
        },
        "en": {
          "meaning": "attachment / attached file",
          "note": "Files attached to an email."
        }
      },
      "examples": [
        {
          "zh": "详细的产品目录和报价已放在附件中，请查收。",
          "pinyin": "Xiángxì de chǎnpǐn mùlù hé bàojià yǐ fàng zài fùjiàn zhōng, qǐng cháshōu.",
          "translations": {
            "vi": "Danh mục sản phẩm chi tiết và bảng báo giá đã được để trong tệp đính kèm, xin vui lòng kiểm tra nhận.",
            "ja": "詳細な製品カタログと見積書を添付ファイルにてお送りいたしましたので、ご査収ください。",
            "en": "The detailed product catalog and price quote are attached for your review."
          }
        }
      ]
    },
    {
      "id": "bc_email_002",
      "term": "查收",
      "pinyin": "cháshōu",
      "partOfSpeech": "verb",
      "category": "emails",
      "level": "beginner",
      "tags": [
        "email",
        "check",
        "receive"
      ],
      "translations": {
        "vi": {
          "meaning": "Kiểm tra và nhận (file, email, tiền, bưu phẩm)",
          "note": "Cụm từ tiêu chuẩn cuối câu: \"请查收\" (Xin vui lòng kiểm tra nhận)."
        },
        "ja": {
          "meaning": "ご査収ください / ご確認ください",
          "note": "添付や送付物を受け取って確認することを丁寧に促す語。"
        },
        "en": {
          "meaning": "to check and accept / please find attached",
          "note": "Standard formula: 请查收 (Please find attached / please check)."
        }
      },
      "examples": [
        {
          "zh": "发票扫描件已发送，请查收并安排付款。",
          "pinyin": "Fāpiào sǎomiáojiàn yǐ fāsòng, qǐng cháshōu bìng ānpái fùkuǎn.",
          "translations": {
            "vi": "Bản scan hóa đơn đã được gửi đi, xin vui lòng kiểm tra nhận và thu xếp thanh toán.",
            "ja": "インボイスのスキャンデータを送付いたしましたので、ご査収の上お支払いのお手配をお願い申し上げます。",
            "en": "The invoice scan has been sent; please check and arrange payment."
          }
        }
      ]
    },
    {
      "id": "bc_email_003",
      "term": "敬请回复",
      "pinyin": "jìng qǐng huífù",
      "partOfSpeech": "phrase",
      "category": "emails",
      "level": "intermediate",
      "tags": [
        "email",
        "formal",
        "reply"
      ],
      "translations": {
        "vi": {
          "meaning": "Kính mong nhận được hồi âm / phản hồi",
          "note": "Dùng ở cuối email trang trọng khi mong đợi đối tác trả lời."
        },
        "ja": {
          "meaning": "ご返信のほどよろしくお願い申し上げます",
          "note": "メールの結びで返信を丁重にお願いする定型表現。"
        },
        "en": {
          "meaning": "We look forward to your prompt reply",
          "note": "Formal request for a reply in correspondence."
        }
      },
      "examples": [
        {
          "zh": "若有任何改动意见，敬请尽早回复告知。",
          "pinyin": "Ruò yǒu rènhé gǎidòng yìjiàn, jìng qǐng jǐnzǎo huífù gàozhī.",
          "translations": {
            "vi": "Nếu có bất kỳ ý kiến chỉnh sửa nào, kính mong quý khách sớm hồi âm thông báo.",
            "ja": "修正等のご要望がございましたら、お早めにご返信くださいますようお願い申し上げます。",
            "en": "If you have any revisions, please kindly reply and let us know at your earliest convenience."
          }
        }
      ]
    },
    {
      "id": "bc_trade_001",
      "term": "进出口",
      "pinyin": "jìn chū kǒu",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "beginner",
      "tags": [
        "import-export",
        "trade",
        "core"
      ],
      "translations": {
        "vi": {
          "meaning": "Xuất nhập khẩu (nhập khẩu và xuất khẩu)",
          "note": "进口 = nhập khẩu; 出口 = xuất khẩu."
        },
        "ja": {
          "meaning": "輸出入 / 輸出と輸入",
          "note": "「进口」（輸入）と「出口」（輸出）の総称。"
        },
        "en": {
          "meaning": "import and export / foreign trade",
          "note": "进口 (import) and 出口 (export)."
        }
      },
      "examples": [
        {
          "zh": "越南与中国之间的进出口贸易额逐年增长。",
          "pinyin": "Yuènán yǔ Zhōngguó zhījiān de jìnchūkǒu màoyì é zhúnián zēngzhǎng.",
          "translations": {
            "vi": "Kim ngạch xuất nhập khẩu giữa Việt Nam và Trung Quốc tăng trưởng qua từng năm.",
            "ja": "ベトナムと中国の間の輸出入貿易額は年々増加しています。",
            "en": "The import and export trade volume between Vietnam and China has been growing year by year."
          }
        }
      ]
    },
    {
      "id": "bc_trade_002",
      "term": "离岸价",
      "pinyin": "lí'àn jià",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "intermediate",
      "tags": [
        "incoterms",
        "fob",
        "trade-terms"
      ],
      "translations": {
        "vi": {
          "meaning": "Giá FOB (Free on Board / Giao hàng lên tàu tại cảng bốc)",
          "note": "Người bán chịu mọi chi phí và rủi ro cho đến khi hàng qua lan can tàu tại cảng xuất khẩu."
        },
        "ja": {
          "meaning": "本船甲板渡し条件（FOB価格）",
          "note": "積出港で本船に貨物を積み込むまでの費用とリスクを売り手が負担する条件。"
        },
        "en": {
          "meaning": "FOB price (Free on Board)",
          "note": "Seller pays for transport of goods to the port of shipment plus loading costs."
        }
      },
      "examples": [
        {
          "zh": "这份报价是深圳离岸价，不包含海运费和目的港保险费。",
          "pinyin": "Zhè fèn bàojià shì Shēnzhèn lí'àn jià, bù bāohán hǎiyùn fèi hé mùdìgǎng bǎoxiǎn fèi.",
          "translations": {
            "vi": "Báo giá này là giá FOB Thâm Quyến, không bao gồm cước vận tải biển và bảo hiểm tại cảng đến.",
            "ja": "このお見積もりは深圳FOB価格であり、海上運賃および仕向港での保険料は含まれておりません。",
            "en": "This quote is FOB Shenzhen and does not include ocean freight or destination insurance."
          }
        }
      ],
      "businessTip": {
        "vi": "Khẩu ngữ ngoại thương Trung Quốc thường nói thẳng chữ viết tắt tiếng Anh \"FOB\", nhưng trên hợp đồng và chứng từ chính thức thường ghi \"离岸价\".",
        "ja": "会話では英語の「FOB」が多用されますが、正式な契約書や税関文書では「离岸价」と記載されます。",
        "en": "In spoken communication \"FOB\" is widely used, while \"离岸价\" is standard in legal contracts."
      }
    },
    {
      "id": "bc_trade_003",
      "term": "到岸价",
      "pinyin": "dào'àn jià",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "intermediate",
      "tags": [
        "incoterms",
        "cif",
        "shipping"
      ],
      "translations": {
        "vi": {
          "meaning": "Giá CIF (Cost, Insurance and Freight / Giá gồm tiền hàng, bảo hiểm và cước phí)",
          "note": "Người bán lo cước tàu và mua bảo hiểm chuyển hàng đến tận cảng đích của người mua."
        },
        "ja": {
          "meaning": "運賃・保険料込み条件（CIF価格）",
          "note": "仕向港までの海上運賃および保険料を売り手が負担する条件。"
        },
        "en": {
          "meaning": "CIF price (Cost, Insurance, and Freight)",
          "note": "Seller arranges and pays for costs, ocean freight, and insurance to the destination port."
        }
      },
      "examples": [
        {
          "zh": "请帮我们核算一下海防港的CIF到岸价。",
          "pinyin": "Qǐng bāng wǒmen hésuàn yíxià Hǎifáng gǎng de CIF dào'àn jià.",
          "translations": {
            "vi": "Xin hãy tính toán giúp chúng tôi giá CIF đến cảng Hải Phòng.",
            "ja": "ハイフォン港までのCIF価格を計算していただけますでしょうか。",
            "en": "Please calculate the CIF Haiphong price for us."
          }
        }
      ]
    },
    {
      "id": "bc_trade_004",
      "term": "交货期",
      "pinyin": "jiāohuò qī",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "beginner",
      "tags": [
        "lead-time",
        "delivery",
        "deadline"
      ],
      "translations": {
        "vi": {
          "meaning": "Thời hạn giao hàng / tiến độ giao hàng (Lead time)",
          "note": "Số ngày hoặc ngày cố định từ khi nhận cọc đến lúc xuất xưởng/giao hàng."
        },
        "ja": {
          "meaning": "納期 / リードタイム",
          "note": "発注から納品までの所要期間・期日。"
        },
        "en": {
          "meaning": "delivery period / lead time",
          "note": "Agreed time frame for delivering goods."
        }
      },
      "examples": [
        {
          "zh": "收到定金后的30天内为标准交货期。",
          "pinyin": "Shōudào dìngjīn hòu de sānshí tiān nèi wéi biāozhǔn jiāohuò qī.",
          "translations": {
            "vi": "Thời hạn giao hàng tiêu chuẩn là trong vòng 30 ngày kể từ khi nhận tiền đặt cọc.",
            "ja": "手付金受領後30日以内が標準納期となります。",
            "en": "The standard delivery period is within 30 days after receipt of the deposit."
          }
        }
      ]
    },
    {
      "id": "bc_trade_005",
      "term": "违约金",
      "pinyin": "wéiyuè jīn",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "intermediate",
      "tags": [
        "penalty",
        "contract",
        "legal"
      ],
      "translations": {
        "vi": {
          "meaning": "Tiền phạt vi phạm hợp đồng (Penalty / Liquidated damages)",
          "note": "Khoản tiền bồi thường quy định sẵn nếu một bên vi phạm điều khoản."
        },
        "ja": {
          "meaning": "違約金 / ペナルティ",
          "note": "契約違反時に支払う定められた損害賠償金。"
        },
        "en": {
          "meaning": "penalty / liquidated damages for breach of contract",
          "note": "Agreed compensation if contract terms are violated."
        }
      },
      "examples": [
        {
          "zh": "若供方无故延迟交货超过两周，每日需支付合同金额0.5%的违约金。",
          "pinyin": "Ruò gōngfāng wúgù yánchí jiāohuò chāoguò liǎng zhōu, měirì xū zhīfù hétong jīné bǎifēnzhī líng diǎn wǔ de wéiyuèjīn.",
          "translations": {
            "vi": "Nếu bên cung cấp chậm giao hàng vô cớ quá hai tuần, mỗi ngày phải nộp phạt 0,5% giá trị hợp đồng.",
            "ja": "サプライヤーが正当な理由なく2週間以上納期を遅延させた場合、1日につき契約金額の0.5％の違約金を支払うものとします。",
            "en": "If the supplier delays delivery without cause for over two weeks, a penalty of 0.5% per day will apply."
          }
        }
      ]
    },
    {
      "id": "bc_doc_001",
      "term": "商业发票",
      "pinyin": "shāngyè fāpiào",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "beginner",
      "tags": [
        "invoice",
        "customs",
        "commercial"
      ],
      "translations": {
        "vi": {
          "meaning": "Hóa đơn thương mại (Commercial Invoice)",
          "note": "Chứng từ kế toán và hải quan căn bản nhất chứng minh giá trị và số lượng hàng hóa."
        },
        "ja": {
          "meaning": "商業送り状（コマーシャル・インボイス）",
          "note": "通関・決済に不可欠な貿易の最重要請求明細書。"
        },
        "en": {
          "meaning": "Commercial Invoice (CI)",
          "note": "Legal document between supplier and customer detailing goods sold and amount due."
        }
      },
      "examples": [
        {
          "zh": "报关单上的申报价值必须与商业发票上的金额完全一致。",
          "pinyin": "Bàoguān dān shàng de shēnbào jiàzhí bìxū yǔ shāngyè fāpiào shàng de jīné wánquán yízhì.",
          "translations": {
            "vi": "Trị giá khai báo trên tờ khai hải quan bắt buộc phải hoàn toàn trùng khớp với số tiền trên hóa đơn thương mại.",
            "ja": "通関申告書の申告価格は、商業インボイスの金額と完全に一致していなければなりません。",
            "en": "The declared value on the customs declaration must match the commercial invoice exactly."
          }
        }
      ]
    },
    {
      "id": "bc_doc_002",
      "term": "装箱单",
      "pinyin": "zhuāngxiāng dān",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "beginner",
      "tags": [
        "packing-list",
        "shipping",
        "customs"
      ],
      "translations": {
        "vi": {
          "meaning": "Bảng kê đóng gói (Packing List / P/L)",
          "note": "Liệt kê chi tiết quy cách đóng gói, trọng lượng tịnh (Net Weight), trọng lượng cả bì (Gross Weight), thể tích (CBM)."
        },
        "ja": {
          "meaning": "梱包明細書（パッキングリスト / P/L）",
          "note": "荷姿、個数、総重量、純重量、容積を明記した書類。"
        },
        "en": {
          "meaning": "Packing List (P/L)",
          "note": "Document detailing dimensions, net weight, gross weight, and package count."
        }
      },
      "examples": [
        {
          "zh": "海关查验时会重点核对装箱单上的箱数和实际货物是否相符。",
          "pinyin": "Hǎiguān cháyàn shí huì zhòngdiǎn héduì zhuāngxiāng dān shàng de xiāngshù hé shíjì huòwù shìfǒu xiāngfú.",
          "translations": {
            "vi": "Khi hải quan kiểm tra thực tế, họ sẽ đối chiếu kỹ số kiện trên packing list có trùng khớp với hàng thực tế không.",
            "ja": "税関検査の際、パッキングリストの箱数と実際の貨物が一致しているかが重点的に照合されます。",
            "en": "During inspection, customs will verify whether the box count on the packing list matches the physical cargo."
          }
        }
      ]
    },
    {
      "id": "bc_doc_003",
      "term": "海运提单",
      "pinyin": "hǎiyùn tídān",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "b-l",
        "bill-of-lading",
        "ownership"
      ],
      "translations": {
        "vi": {
          "meaning": "Vận đơn đường biển (Bill of Lading - B/L)",
          "note": "Chứng từ sở hữu hàng hóa do hãng tàu cấp. Có bản gốc (Original B/L) và điện giao hàng (Telex Release)."
        },
        "ja": {
          "meaning": "船荷証券（B/L / Bill of Lading）",
          "note": "船会社が発行する有価証券であり、貨物の受領書・引換証。"
        },
        "en": {
          "meaning": "Ocean Bill of Lading (B/L)",
          "note": "Document of title issued by carrier acknowledging receipt of cargo for shipment."
        }
      },
      "examples": [
        {
          "zh": "客户付清尾款后，我们立即向船公司申请做电放提单。",
          "pinyin": "Kèhù fù qīng wěikuǎn hòu, wǒmen lìjí xiàng chuán gōngsī shēnqǐng zuò diànfàng tídān.",
          "translations": {
            "vi": "Sau khi khách hàng thanh toán xong số tiền còn lại, chúng tôi lập tức yêu cầu hãng tàu làm điện giao hàng (Telex Release B/L).",
            "ja": "顧客からの残金入金を確認後、直ちに船会社へテレックス・リリース（サレンダーB/L）の手続きを申請します。",
            "en": "Once the client pays the remaining balance, we will apply for Telex Release of the B/L."
          }
        }
      ]
    },
    {
      "id": "bc_doc_004",
      "term": "原产地证书",
      "pinyin": "yuánchǎndì zhèngshū",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "co",
        "origin",
        "tariff"
      ],
      "translations": {
        "vi": {
          "meaning": "Chứng nhận xuất xứ hàng hóa (Certificate of Origin - C/O)",
          "note": "Chứng từ quan trọng để người nhập khẩu được hưởng thuế suất ưu đãi (Form E trong hiệp định ACFTA)."
        },
        "ja": {
          "meaning": "原産地証明書（C/O）",
          "note": "特恵関税の適用を受けるために貨物の原産国を証明する公的書類。"
        },
        "en": {
          "meaning": "Certificate of Origin (C/O)",
          "note": "Official document declaring where goods originated to obtain tariff benefits."
        }
      },
      "examples": [
        {
          "zh": "办理一份中越Form E原产地证书，可以帮助买家享受零关税优惠。",
          "pinyin": "Bànlǐ yí fèn Zhōng-Yuè Form E yuánchǎndì zhèngshū, kěyǐ bāngzhù mǎijiā xiǎngshòu líng guānshuì yōuhuì.",
          "translations": {
            "vi": "Xin cấp một chứng nhận xuất xứ Form E Trung - Việt có thể giúp người mua hưởng mức thuế quan ưu đãi 0%.",
            "ja": "中越Form E原産地証明書を発行することで、買い手はゼロ関税の特恵優遇を受けることができます。",
            "en": "Issuing a China-Vietnam Form E C/O allows the buyer to benefit from zero-tariff preferences."
          }
        }
      ]
    },
    {
      "id": "bc_doc_005",
      "term": "形式发票",
      "pinyin": "xíngshì fāpiào",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "pi",
        "proforma",
        "draft"
      ],
      "translations": {
        "vi": {
          "meaning": "Hóa đơn chiếu lệ (Proforma Invoice - P/I)",
          "note": "Bản dự thảo đơn hàng gửi trước để khách hàng mở L/C hoặc xin giấy phép nhập khẩu, chuyển tiền đặt cọc."
        },
        "ja": {
          "meaning": "プロフォーマ・インボイス（見積インボイス / P/I）",
          "note": "正式なインボイス発行前に、事前決済や輸入許可申請のために作成する仮書類。"
        },
        "en": {
          "meaning": "Proforma Invoice (P/I)",
          "note": "Preliminary bill of sale sent to buyers in advance of a shipment."
        }
      },
      "examples": [
        {
          "zh": "形式发票不是正式的财务结算凭证，但具有合同预确认的约束力。",
          "pinyin": "Xíngshì fāpiào bú shì zhèngshì de cáiwù jiésuàn píngzhèng, dàn jùyǒu hétong yù quèrèn de yuēshùlì.",
          "translations": {
            "vi": "Hóa đơn chiếu lệ (P/I) không phải là chứng từ thanh toán kế toán chính thức, nhưng có giá trị ràng buộc cam kết trước.",
            "ja": "プロフォーマインボイスは正式な税務領収書ではありませんが、契約事前合意としての拘束力を持ちます。",
            "en": "A Proforma Invoice is not a tax settlement document, but it serves as a preliminary sales commitment."
          }
        }
      ]
    },
    {
      "id": "bc_cus_001",
      "term": "报关",
      "pinyin": "bào guān",
      "partOfSpeech": "verb",
      "category": "customs",
      "level": "beginner",
      "tags": [
        "customs-declaration",
        "export",
        "border"
      ],
      "translations": {
        "vi": {
          "meaning": "Khai báo hải quan (thường chỉ đầu xuất khẩu)",
          "note": "Khai báo với hải quan nước xuất khẩu để thông quan hàng ra nước ngoài."
        },
        "ja": {
          "meaning": "税関申告 / 通関手続き（主に輸出申告）",
          "note": "税関に対して輸出入貨物の詳細を申告すること。"
        },
        "en": {
          "meaning": "customs declaration (usually export declaration)",
          "note": "Declaring cargo to customs authorities for export."
        }
      },
      "examples": [
        {
          "zh": "报关资料必须在截关日之前提交给海关审核。",
          "pinyin": "Bàoguān zīliào bìxū zài jiéguān rì zhīqián tíjiāo gěi hǎiguān shěnhé.",
          "translations": {
            "vi": "Hồ sơ khai báo hải quan phải nộp cho hải quan thẩm định trước thời điểm đóng cảng (Closing time).",
            "ja": "通関書類はカット日（CY Cut）までに税関へ提出し審査を受ける必要があります。",
            "en": "Customs declaration documents must be submitted to customs before the closing deadline."
          }
        }
      ]
    },
    {
      "id": "bc_cus_002",
      "term": "清关",
      "pinyin": "qīng guān",
      "partOfSpeech": "verb",
      "category": "customs",
      "level": "beginner",
      "tags": [
        "customs-clearance",
        "import",
        "inspection"
      ],
      "translations": {
        "vi": {
          "meaning": "Thông quan (thủ tục nhận hàng tại cảng đến)",
          "note": "Đóng thuế, kiểm tra và hoàn thành thủ tục để lấy hàng ra khỏi kho hải quan."
        },
        "ja": {
          "meaning": "通関（貨物の引き取り手続き）",
          "note": "輸入国で関税を納付し、貨物の搬出許可を得る手続き。"
        },
        "en": {
          "meaning": "customs clearance (import port)",
          "note": "Clearing goods through customs at the destination port."
        }
      },
      "examples": [
        {
          "zh": "货物已经到达海防港，我们的报关行正在协助办理清关手续。",
          "pinyin": "Huòwù yǐjīng dàodá Hǎifáng gǎng, wǒmen de bàoguān háng zhèngzài xiézhù bànlǐ qīngguān shǒuxù.",
          "translations": {
            "vi": "Hàng hóa đã đến cảng Hải Phòng, đại lý hải quan của chúng tôi đang hỗ trợ làm thủ tục thông quan.",
            "ja": "貨物はすでにハイフォン港に到着しており、当社の通関業者が輸入通関手続きを進めております。",
            "en": "The goods have arrived at Haiphong port; our customs broker is assisting with import clearance."
          }
        }
      ]
    },
    {
      "id": "bc_cus_003",
      "term": "海关编码",
      "pinyin": "hǎiguān biāomǎ",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "intermediate",
      "tags": [
        "hs-code",
        "classification",
        "tax"
      ],
      "translations": {
        "vi": {
          "meaning": "Mã HS (HS Code / Mã phân loại hàng hóa xuất nhập khẩu)",
          "note": "Hệ thống mã số hài hòa quốc tế quy định mức thuế và chính sách kiểm tra chuyên ngành."
        },
        "ja": {
          "meaning": "HSコード / 税関品目分類番号",
          "note": "商品の品目を世界共通で分類するための国際統一コード。"
        },
        "en": {
          "meaning": "HS Code (Harmonized System Code)",
          "note": "Universal classification number for determining tariffs."
        }
      },
      "examples": [
        {
          "zh": "不同国家对同款产品的海关编码归类可能存在细微差异。",
          "pinyin": "Bùtóng guójiā duì tóng kuǎn chǎnpǐn de hǎiguān biāomǎ guīlèi kěnéng cúnzài xìwēi chāyì.",
          "translations": {
            "vi": "Các quốc gia khác nhau có thể có sự khác biệt nhỏ trong việc áp mã HS cho cùng một loại sản phẩm.",
            "ja": "同一製品であっても、国によってHSコードの細部分類が若干異なる場合があります。",
            "en": "Different countries may have slight variations in HS code classification for the same product."
          }
        }
      ]
    },
    {
      "id": "bc_cus_004",
      "term": "关税",
      "pinyin": "guānshuì",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "beginner",
      "tags": [
        "tariff",
        "duty",
        "tax"
      ],
      "translations": {
        "vi": {
          "meaning": "Thuế quan / thuế xuất nhập khẩu",
          "note": "Thuế đánh vào hàng hóa khi lưu chuyển qua biên giới."
        },
        "ja": {
          "meaning": "関税",
          "note": "国境を通過する貨物に課される税金。"
        },
        "en": {
          "meaning": "customs duty / tariff",
          "note": "Tax imposed on goods when transported across borders."
        }
      },
      "examples": [
        {
          "zh": "提供正确的原产地证后，这批货物的进口关税降为了零。",
          "pinyin": "Tígōng zhèngquè de yuánchǎndì zhèng hòu, zhè pī huòwù de jìnkǒu guānshuì jiàng wéi le líng.",
          "translations": {
            "vi": "Sau khi cung cấp chứng nhận xuất xứ chính xác, thuế nhập khẩu của lô hàng này đã giảm xuống mức 0%.",
            "ja": "適正な原産地証明書を提出したことで、この貨物の輸入関税はゼロに減免されました。",
            "en": "After providing the proper Certificate of Origin, the import duty on this shipment was reduced to zero."
          }
        }
      ]
    },
    {
      "id": "bc_cus_005",
      "term": "查验",
      "pinyin": "cháyàn",
      "partOfSpeech": "verb",
      "category": "customs",
      "level": "intermediate",
      "tags": [
        "inspection",
        "customs",
        "check"
      ],
      "translations": {
        "vi": {
          "meaning": "Kiểm hóa / kiểm tra hàng hóa hải quan",
          "note": "Hải quan mở container kiểm tra thực tế hàng hóa có đúng tờ khai không."
        },
        "ja": {
          "meaning": "税関検査（現物検査）",
          "note": "税関が申告内容と実際の貨物が一致しているか現物を確認すること。"
        },
        "en": {
          "meaning": "customs physical inspection / examination",
          "note": "Customs inspecting cargo to confirm declaration accuracy."
        }
      },
      "examples": [
        {
          "zh": "柜子被海关抽中查验，可能会产生两天的码头滞箱费。",
          "pinyin": "Guìzi bèi hǎiguān chōuzhòng cháyàn, kěnéng huì chǎnshēng liǎng tiān de mǎtóu zhìxiāng fèi.",
          "translations": {
            "vi": "Container bị hải quan chọn kiểm hóa ngẫu nhiên, có thể sẽ phát sinh 2 ngày phí lưu kho bãi/lưu bãi container (Demurrage).",
            "ja": "コンテナが税関検査に指定されたため、2日間のデマレージ（超過保管料）が発生する可能性があります。",
            "en": "The container was selected for customs inspection, which may incur two days of demurrage charges."
          }
        }
      ]
    },
    {
      "id": "bc_email_004",
      "term": "抄送",
      "pinyin": "chāosòng",
      "partOfSpeech": "verb",
      "category": "emails",
      "level": "beginner",
      "tags": [
        "cc",
        "email",
        "communication"
      ],
      "translations": {
        "vi": {
          "meaning": "Đồng kính gửi (CC)",
          "note": "Gửi bản sao email cho người liên quan để nắm thông tin."
        },
        "ja": {
          "meaning": "CC送信する / 参照送信",
          "note": "情報共有目的で関係者をCCに含めること。"
        },
        "en": {
          "meaning": "to CC (Carbon Copy)",
          "note": "Copying relevant recipients for visibility."
        }
      },
      "examples": [
        {
          "zh": "本邮件已抄送双方财务负责人，以便核对到账信息。",
          "pinyin": "Běn yóujiàn yǐ chāosòng shuāngfāng cáiwù fùzérén, yǐbiàn héduì dàozhàng xìnxī.",
          "translations": {
            "vi": "Email này đã được đồng kính gửi (CC) cho phụ trách tài chính hai bên để tiện đối chiếu tiền vào tài khoản.",
            "ja": "本メールは入金確認のため双方の財務責任者をCCに含めております。",
            "en": "This email has been CC’d to both finance managers to reconcile incoming remittance."
          }
        }
      ],
      "businessTip": {
        "vi": "Gửi ngầm không cho người khác thấy gọi là \"密送\" (mìsòng - BCC).",
        "ja": "受取人にアドレスを伏せるBCC送信は「密送」と呼びます。",
        "en": "Blind carbon copying where addresses remain hidden is 密送 (BCC)."
      }
    },
    {
      "id": "bc_email_005",
      "term": "密送",
      "pinyin": "mìsòng",
      "partOfSpeech": "verb",
      "category": "emails",
      "level": "intermediate",
      "tags": [
        "bcc",
        "email",
        "privacy"
      ],
      "translations": {
        "vi": {
          "meaning": "Gửi bản sao ẩn danh (BCC)",
          "note": "Người nhận khác không nhìn thấy danh sách địa chỉ này."
        },
        "ja": {
          "meaning": "BCC送信する",
          "note": "他の受信者にアドレスを開示せず送信する方式。"
        },
        "en": {
          "meaning": "to BCC (Blind Carbon Copy)",
          "note": "Hiding recipient addresses from other recipients."
        }
      },
      "examples": [
        {
          "zh": "为保护客户隐私，批量发送新品推荐邮件时请务必使用密送功能。",
          "pinyin": "Wèi bǎohù kèhù yǐnsī, pīliàng fāsòng xīnpǐn tuījiàn yóujiàn shí qǐng wùbì shǐyòng mìsòng gōngnéng.",
          "translations": {
            "vi": "Để bảo vệ sự riêng tư của khách hàng, khi gửi email giới thiệu sản phẩm mới hàng loạt xin hãy dùng chức năng BCC.",
            "ja": "顧客プライバシー保護のため、新製品案内メールの一斉送信時は必ずBCCを使用してください。",
            "en": "To protect client privacy, always use BCC when sending mass promotional campaigns."
          }
        }
      ],
      "businessTip": {
        "vi": "Dùng BCC khi gửi thư cho nhiều đối tác cạnh tranh để không lộ danh sách khách hàng của công ty.",
        "ja": "競合関係にある複数社へ同時に連絡する際はBCC送信がセキュリティ上の鉄則です。",
        "en": "Use BCC when emailing multiple competing buyers to prevent customer list leakage."
      }
    },
    {
      "id": "bc_email_006",
      "term": "见信好",
      "pinyin": "jiàn xìn hǎo",
      "partOfSpeech": "phrase",
      "category": "emails",
      "level": "beginner",
      "tags": [
        "greeting",
        "email",
        "polite"
      ],
      "translations": {
        "vi": {
          "meaning": "Chúc anh/chị một ngày tốt lành khi mở thư này",
          "note": "Lời chào mở đầu thư trang nhã, hiện đại rất phổ biến trong email công việc."
        },
        "ja": {
          "meaning": "メールを拝読いただきありがとうございます / お世話になっております",
          "note": "中国語ビジネスメール冒頭の定番の挨拶句。"
        },
        "en": {
          "meaning": "Hope this email finds you well",
          "note": "Standard contemporary professional email opening salutation."
        }
      },
      "examples": [
        {
          "zh": "尊敬的陈经理：见信好！关于下半年采购计划，我司有几点建议与您沟通。",
          "pinyin": "Zūnjìng de Chén jīnglǐ: Jiàn xìn hǎo! Guānyú xiàbànnián cǎigòu jìhuà, wǒsī yǒu jǐ diǎn jiànyì yǔ nín gōutōng.",
          "translations": {
            "vi": "Kính gửi Quản lý Trần: Chúc anh một ngày tốt lành! Về kế hoạch thu mua nửa cuối năm, công ty chúng tôi có vài ý kiến muốn trao đổi cùng anh.",
            "ja": "陳マネージャー様：いつもお世話になっております。下半期の購買計画につき数点ご提案がございます。",
            "en": "Dear Manager Chen: Hope this email finds you well! Regarding H2 procurement plans, we have a few suggestions to discuss."
          }
        }
      ],
      "businessTip": {
        "vi": "Thường đặt ngay sau câu xưng hô tên đối tác, ví dụ: \"李总：见信好！\".",
        "ja": "宛名直後に「李总：见信好！」と一行空けて記載するのが現代の定石です。",
        "en": "Placed immediately below recipient salutation: \"李总：见信好！\"."
      }
    },
    {
      "id": "bc_email_007",
      "term": "烦请",
      "pinyin": "fánqǐng",
      "partOfSpeech": "phrase",
      "category": "emails",
      "level": "intermediate",
      "tags": [
        "polite",
        "request",
        "email"
      ],
      "translations": {
        "vi": {
          "meaning": "Phiền xin vui lòng / Kính mong",
          "note": "Từ nhờ vả cực kỳ nhã nhặn, tôn trọng đối tác."
        },
        "ja": {
          "meaning": "お手数をおかけしますが / 何卒よろしくお願いいたします",
          "note": "依頼事項を丁寧に切り出すクッション言葉。"
        },
        "en": {
          "meaning": "kindly please / would appreciate if you could",
          "note": "Polite formal prefix used when asking for action."
        }
      },
      "examples": [
        {
          "zh": "合同扫描件已发，烦请贵司领导签字盖章后回传一份。",
          "pinyin": "Hétong sǎomiáojiàn yǐ fā, fánqǐng guìsī lǐngdǎo qiānzì gàizhāng hòu huíchuán yī fèn.",
          "translations": {
            "vi": "Bản scan hợp đồng đã gửi, kính phiền lãnh đạo quý công ty ký tên đóng dấu rồi gửi lại một bản cho chúng tôi.",
            "ja": "契約書PDFをお送りしましたので、お手数ですが貴社ご捺印・ご署名の上ご返送いただけますと幸いです。",
            "en": "Contract scan attached; kindly have your executive sign, stamp, and return a copy."
          }
        }
      ],
      "businessTip": {
        "vi": "Dùng \"烦请\" lịch sự hơn rất nhiều so với từ \"请\" đơn thuần trong email.",
        "ja": "「请」単体よりも「烦请」を使うことで、相手の手間を思いやる敬意が格段に伝わります。",
        "en": "\"烦请\" carries far greater politeness and considerate tone than a bare \"请\"."
      }
    },
    {
      "id": "bc_email_008",
      "term": "随信附上",
      "pinyin": "suíxìn fùshàng",
      "partOfSpeech": "phrase",
      "category": "emails",
      "level": "intermediate",
      "tags": [
        "attachment",
        "formal",
        "email"
      ],
      "translations": {
        "vi": {
          "meaning": "Kèm theo thư này xin gửi tới / Xin đính kèm",
          "note": "Mẫu câu dẫn dắt danh sách tài liệu đính kèm."
        },
        "ja": {
          "meaning": "本状に添付して送付いたします / 以下の書類を同封いたします",
          "note": "添付資料の案内時に用いる格調高い表現。"
        },
        "en": {
          "meaning": "attached please find / enclosed herewith",
          "note": "Classic formal formula introducing attached files."
        }
      },
      "examples": [
        {
          "zh": "随信附上最新的产品规格书与质检证书，请查阅。",
          "pinyin": "Suíxìn fùshàng zuìxīn de chǎnpǐn guīgéshū yǔ zhìjiǎn zhèngshū, qǐng cháyùe.",
          "translations": {
            "vi": "Kèm theo thư này xin gửi bản thông số kỹ thuật sản phẩm mới nhất và chứng nhận kiểm định chất lượng, xin mời xem.",
            "ja": "最新の製品仕様書および品質検査証明書を添付いたしましたのでご査収ください。",
            "en": "Enclosed please find our updated product specification sheet and inspection certificates."
          }
        }
      ],
      "businessTip": {
        "vi": "Có thể dùng xen kẽ với \"详见附件\" (Xiáng jiàn fùjiàn - Chi tiết xem tệp đính kèm).",
        "ja": "「详见附件」と並んで添付ファイル案内で最も頻用されるフレーズです。",
        "en": "Interchangeable with \"详见附件\" (please refer to attachments)."
      }
    },
    {
      "id": "bc_email_009",
      "term": "此致敬礼",
      "pinyin": "cǐzhì jìnglǐ",
      "partOfSpeech": "phrase",
      "category": "emails",
      "level": "intermediate",
      "tags": [
        "close",
        "formal",
        "letter"
      ],
      "translations": {
        "vi": {
          "meaning": "Trân trọng kính thư",
          "note": "Lời chào kết thúc thư từ công văn chính thống."
        },
        "ja": {
          "meaning": "敬具 / 以上、よろしくお願い申し上げます",
          "note": "公式文書・手紙の伝統的な結語。"
        },
        "en": {
          "meaning": "Sincerely yours / With highest regards",
          "note": "Traditional formal letter closing formula."
        }
      },
      "examples": [
        {
          "zh": "期待早日收到您的回复。此致，敬礼！",
          "pinyin": "Qīdài zǎorì shōudào nín de huífù. Cǐzhì, jìnglǐ!",
          "translations": {
            "vi": "Mong sớm nhận được hồi âm của quý vị. Trân trọng kính thư!",
            "ja": "ご返信を心待ちにしております。敬具。",
            "en": "Looking forward to hearing from you soon. Sincerely yours!"
          }
        }
      ],
      "businessTip": {
        "vi": "\"此致\" viết cuối thư, còn \"敬礼\" xuống dòng đứng đầu mép trái.",
        "ja": "格式ある書簡では「此致」を行末に、「敬礼」を行頭に配置します。",
        "en": "Traditionally, 此致 closes the line and 敬礼 heads the following left margin."
      }
    },
    {
      "id": "bc_email_010",
      "term": "催办",
      "pinyin": "cuībàn",
      "partOfSpeech": "verb",
      "category": "emails",
      "level": "intermediate",
      "tags": [
        "urgent",
        "reminder",
        "action"
      ],
      "translations": {
        "vi": {
          "meaning": "Đôn đốc giải quyết khẩn / Giục làm gấp",
          "note": "Nhắc nhở người phụ trách đẩy nhanh tiến độ xử lý hồ sơ việc gấp."
        },
        "ja": {
          "meaning": "督促する / 迅速な処理を促す",
          "note": "停滞している案件の処理を急がせること。"
        },
        "en": {
          "meaning": "to urge prompt processing / expedite",
          "note": "Pressing for immediate execution of delayed tasks."
        }
      },
      "examples": [
        {
          "zh": "由于截关时间临近，这票单据需要专人向报关行紧急催办。",
          "pinyin": "Yóuyú jiéguān shíjiān línjìn, zhè piào dānjù xūyào zhuānrén xiàng bàoguānháng jǐnjí cuībàn.",
          "translations": {
            "vi": "Do thời gian đóng cửa kiểm hải quan (closing time) đã cận kề, bộ chứng từ này cần cử người đôn đốc đại lý hải quan làm khẩn cấp.",
            "ja": "通関締切時刻（Cut-off）が迫っているため、本件書類は通関業者へ緊急督促が必要です。",
            "en": "With port customs cut-off looming, an expediter must urgently press the broker."
          }
        }
      ],
      "businessTip": {
        "vi": "Email nhắc việc lịch sự gọi là \"温馨提醒\" (nhắc nhở ấm áp / Gentle reminder).",
        "ja": "柔らかな督促メールの件名には「温馨提醒（リマインダー）」が好まれます。",
        "en": "A gentle reminder email is courteously titled 温馨提醒."
      }
    },
    {
      "id": "bc_email_011",
      "term": "请知悉",
      "pinyin": "qǐng zhīxī",
      "partOfSpeech": "phrase",
      "category": "emails",
      "level": "intermediate",
      "tags": [
        "fyi",
        "notice",
        "email"
      ],
      "translations": {
        "vi": {
          "meaning": "Kính báo quý vị nắm thông tin (FYI)",
          "note": "Báo cho đối tác biết thông tin cập nhật, không nhất thiết phải trả lời."
        },
        "ja": {
          "meaning": "ご査収ください / ご承知おきください（FYI）",
          "note": "情報共有・周知のためのビジネス定型句。"
        },
        "en": {
          "meaning": "please be advised / for your information (FYI)",
          "note": "Notice informing recipient without mandatory response required."
        }
      },
      "examples": [
        {
          "zh": "我司下周因端午节假期放假三天，期间出货将顺延，特此通知，请知悉。",
          "pinyin": "Wǒsī xiàzhōu yīn Duānwǔjié jiàqī fàngjià sān tiān, qījiān chūhuò jiāng shùnyán, tècǐ tōngzhī, qǐng zhīxī.",
          "translations": {
            "vi": "Công ty chúng tôi tuần tới nghỉ lễ Đoan Ngọ 3 ngày, việc xuất hàng trong đợt này sẽ lùi lại tương ứng, xin trân trọng thông báo quý vị nắm được.",
            "ja": "端午節連休のため来週3日間休業となり出荷が順延されます。何卒ご承知おきください。",
            "en": "Our office will be closed 3 days for Dragon Boat Festival; shipments will roll over accordingly. Please be advised."
          }
        }
      ],
      "businessTip": {
        "vi": "Tương đương với ký hiệu FYI (For Your Information) trong thư tín quốc tế.",
        "ja": "英文メールにおける「FYI（ご参考までに）」に相当します。",
        "en": "Equivalent to international business \"FYI\" (For Your Information)."
      }
    },
    {
      "id": "bc_email_012",
      "term": "保持沟通",
      "pinyin": "bǎochí gōutōng",
      "partOfSpeech": "phrase",
      "category": "emails",
      "level": "beginner",
      "tags": [
        "stay-in-touch",
        "relationship"
      ],
      "translations": {
        "vi": {
          "meaning": "Giữ liên lạc thường xuyên",
          "note": "Lời nhắn gửi duy trì tương tác tốt đẹp giữa hai bên."
        },
        "ja": {
          "meaning": "引き続き連絡を取り合う",
          "note": "継続的な関係維持を促す言葉。"
        },
        "en": {
          "meaning": "keep in touch / maintain communication",
          "note": "Expressing intent to preserve ongoing dialog."
        }
      },
      "examples": [
        {
          "zh": "若有任何最新进展，我们随时保持沟通。",
          "pinyin": "Ruò yǒu rènhé zuìxīn jìnzhǎn, wǒmen suíshí bǎochí gōutōng.",
          "translations": {
            "vi": "Nếu có bất kỳ diễn biến tiến triển mới nào, chúng ta hãy luôn giữ liên lạc nhé.",
            "ja": "新たな進展がございましたら、随時ご連絡を取り合いましょう。",
            "en": "Should any new developments arise, let us maintain close communication."
          }
        }
      ],
      "businessTip": {
        "vi": "Cuối email thường viết: \"我们随时保持沟通！\" tạo thiện chí gắn kết bền chặt.",
        "ja": "メール末尾に添えると親密かつ信頼感のある印象を与えます。",
        "en": "A warm sign-off reinforcing mutual accessibility."
      }
    },
    {
      "id": "bc_trade_006",
      "term": "工厂交货",
      "pinyin": "gōngchǎng jiāohuò",
      "partOfSpeech": "phrase",
      "category": "trade",
      "level": "intermediate",
      "tags": [
        "incoterms",
        "exw",
        "logistics"
      ],
      "translations": {
        "vi": {
          "meaning": "Giao tại xưởng (EXW - Ex Works)",
          "note": "Người bán chỉ cần chuẩn bị hàng tại xưởng, người mua lo tất cả vận chuyển và hải quan."
        },
        "ja": {
          "meaning": "工場渡し（EXW）",
          "note": "売主は自社工場で貨物を引き渡すのみで、輸送・通関は買主の全責任。"
        },
        "en": {
          "meaning": "Ex Works (EXW)",
          "note": "Seller makes goods available at premises; buyer assumes all carriage and customs risks."
        }
      },
      "examples": [
        {
          "zh": "如果按工厂交货（EXW）条款报价，单价可以再优惠0.5美元。",
          "pinyin": "Rúguǒ àn gōngchǎng jiāohuò (EXW) tiáokuǎn bàojià, dānjià kěyǐ zài yōuhuì líng diǎn wǔ Měiyuán.",
          "translations": {
            "vi": "Nếu báo giá theo điều kiện giao tại xưởng (EXW), đơn giá có thể giảm thêm 0.5 USD.",
            "ja": "EXW（工場渡し）条件での見積もりであれば、単価をさらに0.5ドル値引き可能です。",
            "en": "Under EXW terms, we can discount the unit price by an additional $0.50."
          }
        }
      ],
      "businessTip": {
        "vi": "EXW là điều kiện mà người bán có ít trách nhiệm và rủi ro nhất trong 11 điều kiện Incoterms.",
        "ja": "インコタームズ11条件中、売主の義務とリスクが最も小さい条件です。",
        "en": "EXW imposes minimum obligation and risk on the seller."
      }
    },
    {
      "id": "bc_trade_007",
      "term": "完税后交货",
      "pinyin": "wánshuì hòu jiāohuò",
      "partOfSpeech": "phrase",
      "category": "trade",
      "level": "advanced",
      "tags": [
        "incoterms",
        "ddp",
        "customs"
      ],
      "translations": {
        "vi": {
          "meaning": "Giao hàng đã nộp thuế (DDP - Delivered Duty Paid)",
          "note": "Người bán chịu toàn bộ phí vận chuyển, rủi ro và nộp thuế nhập khẩu đến tận kho người mua."
        },
        "ja": {
          "meaning": "関税込み持込渡し（DDP）",
          "note": "売主が輸入通関・関税納付・国内配送まですべて負担する最高責任条件。"
        },
        "en": {
          "meaning": "Delivered Duty Paid (DDP)",
          "note": "Seller bears maximum obligation including import clearance, duties, and door delivery."
        }
      },
      "examples": [
        {
          "zh": "欧洲客户要求采用DDP完税后交货条款，直接配送到他们的海外仓。",
          "pinyin": "Ōuzhōu kèhù yāoqiú cǎiyòng DDP wánshuì hòu jiāohuò tiáokuǎn, zhíjiē pèisòng dào tāmen de hǎiwàicāng.",
          "translations": {
            "vi": "Khách hàng châu Âu yêu cầu áp dụng điều kiện DDP giao hàng đã nộp thuế, giao thẳng tới kho ngoại quan của họ.",
            "ja": "欧州バイヤーはDDP条件を要求しており、現地の海外倉庫まで直送する必要があります。",
            "en": "European clients demand DDP terms with direct door deliveries to their overseas fulfillment centers."
          }
        }
      ],
      "businessTip": {
        "vi": "DDP là điều kiện có trách nhiệm cao nhất đối với bên bán; hãy cẩn trọng với các loại thuế phí phát sinh bất ngờ.",
        "ja": "売主最大義務条件であり、仕向国の関税リスクや予期せぬローカル費用に十分留意が必要です。",
        "en": "DDP imposes maximum obligations on the seller; account carefully for unexpected destination taxes."
      }
    },
    {
      "id": "bc_trade_008",
      "term": "不可抗力",
      "pinyin": "bùkěkànglì",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "intermediate",
      "tags": [
        "contract",
        "legal",
        "force-majeure"
      ],
      "translations": {
        "vi": {
          "meaning": "Bất khả kháng (Force Majeure)",
          "note": "Biến cố thiên tai, chiến tranh ngoài tầm kiểm soát giúp miễn trừ trách nhiệm hợp đồng."
        },
        "ja": {
          "meaning": "不可抗力（Force Majeure）",
          "note": "天災や戦争など、当事者の支配を超える免責事由。"
        },
        "en": {
          "meaning": "Force Majeure",
          "note": "Unforeseeable circumstances exempting parties from contractual liability."
        }
      },
      "examples": [
        {
          "zh": "因台风等不可抗力导致的船期延误，卖方不承担违约罚款。",
          "pinyin": "Yīn táifēng děng bùkěkànglì dǎozhì de chuánqī yánwù, màifāng bù chéngdān wéiyuē fákuǎn.",
          "translations": {
            "vi": "Sự chậm trễ lịch tàu do bão hoặc sự kiện bất khả kháng, bên bán không phải chịu tiền phạt vi phạm hợp đồng.",
            "ja": "台風等の不可抗力に起因する船期遅延について、売主は遅延ペナルティを免除されます。",
            "en": "Vessel delays caused by typhoons or Force Majeure events exempt the seller from liquidated damages."
          }
        }
      ],
      "businessTip": {
        "vi": "Khi phát sinh sự kiện bất khả kháng, bên bị ảnh hưởng phải gửi chứng nhận của Phòng Thương mại (CCPIT) trong thời hạn quy định.",
        "ja": "不可抗力発生時は、中国国際貿易促進委員会（CCPIT）発行の公式証明書を期日内に提出します。",
        "en": "Parties must furnish official CCPIT Force Majeure certificates within stipulated timeframes."
      }
    },
    {
      "id": "bc_trade_009",
      "term": "仲裁",
      "pinyin": "zhòngcái",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "advanced",
      "tags": [
        "dispute",
        "legal",
        "arbitration"
      ],
      "translations": {
        "vi": {
          "meaning": "Trọng tài thương mại",
          "note": "Cơ quan tài phán độc lập giải quyết tranh chấp ngoài tòa án."
        },
        "ja": {
          "meaning": "仲裁 / 商事仲裁",
          "note": "裁判によらず第三者仲裁機関によって紛争を最終解決する手段。"
        },
        "en": {
          "meaning": "arbitration",
          "note": "Resolution of commercial disputes by an independent arbitral tribunal."
        }
      },
      "examples": [
        {
          "zh": "双方约定凡因本合同引起的争议，均提交中国国际经济贸易仲裁委员会（CIETAC）仲裁。",
          "pinyin": "Shuāngfāng yuēdìng fán yīn běn hétong yǐnqǐ de zhēngyì, jūn tíjiāo Zhōngguó Guójì Jīngjì Màoyì Zhòngcái Wěiyuánhuì (CIETAC) zhòngcái.",
          "translations": {
            "vi": "Hai bên thỏa thuận mọi tranh chấp phát sinh từ hợp đồng này đều được nộp lên Ủy ban Trọng tài Thương mại Kinh tế Quốc tế Trung Quốc (CIETAC).",
            "ja": "本契約に関する一切の紛争は、中国国際経済貿易仲裁委員会（CIETAC）に付託し仲裁解決します。",
            "en": "Disputes arising under this contract shall be submitted to CIETAC for binding arbitration."
          }
        }
      ],
      "businessTip": {
        "vi": "Phán quyết của hội đồng trọng tài có tính chất chung thẩm và ràng buộc thi hành trên toàn cầu theo Công ước New York 1958.",
        "ja": "仲裁判断はニューヨーク条約加盟国において終局的かつ強制執行力を持ちます。",
        "en": "Arbitral awards are final and globally enforceable under the 1958 New York Convention."
      }
    },
    {
      "id": "bc_trade_010",
      "term": "装运港",
      "pinyin": "zhuāngyùngǎng",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "intermediate",
      "tags": [
        "pol",
        "shipping",
        "port"
      ],
      "translations": {
        "vi": {
          "meaning": "Cảng bốc hàng / Cảng đi (Port of Loading - POL)",
          "note": "Cảng nơi hàng hóa được nâng lên tàu biển để bắt đầu hành trình."
        },
        "ja": {
          "meaning": "船積港（POL）",
          "note": "貨物を本船に積み込む出発港。"
        },
        "en": {
          "meaning": "Port of Loading (POL)",
          "note": "Port where cargo is loaded onto vessel."
        }
      },
      "examples": [
        {
          "zh": "本单指定的装运港为深圳盐田港，目的港为越南海防港。",
          "pinyin": "Běn dān zhǐdìng de zhuāngyùngǎng wéi Shēnzhèn Yántián gǎng, mùdìgǎng wéi Yuènán Hǎifáng gǎng.",
          "translations": {
            "vi": "Cảng bốc hàng quy định của đơn này là cảng Diêm Điền Thâm Quyến, cảng đích là cảng Hải Phòng, Việt Nam.",
            "ja": "本件の指定船積港は深圳・塩田港、仕向港はベトナム・ハイフォン港です。",
            "en": "Designated POL is Yantian Port, Shenzhen; designated POD is Haiphong Port, Vietnam."
          }
        }
      ],
      "businessTip": {
        "vi": "Viết tắt quốc tế là POL (Port of Loading).",
        "ja": "国際海運の実務では「POL」と略称されます。",
        "en": "Universally abbreviated as POL in shipping instructions."
      }
    },
    {
      "id": "bc_trade_011",
      "term": "目的港",
      "pinyin": "mùdìgǎng",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "intermediate",
      "tags": [
        "pod",
        "shipping",
        "destination"
      ],
      "translations": {
        "vi": {
          "meaning": "Cảng đích / Cảng dỡ hàng (Port of Discharge - POD)",
          "note": "Cảng biển cuối cùng nơi tàu dỡ container xuống cho người mua."
        },
        "ja": {
          "meaning": "仕向港 / 揚地港（POD）",
          "note": "貨物が荷揚げされる最終到着港。"
        },
        "en": {
          "meaning": "Port of Destination / Discharge (POD)",
          "note": "Final port where ocean carrier discharges container."
        }
      },
      "examples": [
        {
          "zh": "货物预计将于下周四抵达目的港并开始办理进口清关。",
          "pinyin": "Huòwù yùjì jiāng yú xiàzhōu sì dǐdá mùdìgǎng bìng kāishǐ bànlǐ jìnkǒu qīngguān.",
          "translations": {
            "vi": "Hàng hóa dự kiến sẽ cập cảng đích vào thứ Năm tuần sau và bắt đầu làm thủ tục thông quan nhập khẩu.",
            "ja": "貨物は来週木曜日に仕向港へ到着し、輸入通関手続きに入る予定です。",
            "en": "Cargo is scheduled to arrive at POD next Thursday to commence customs clearance."
          }
        }
      ],
      "businessTip": {
        "vi": "Viết tắt quốc tế là POD (Port of Discharge).",
        "ja": "海運業界では「POD」と略記されます。",
        "en": "Abbreviated as POD on bills of lading."
      }
    },
    {
      "id": "bc_trade_012",
      "term": "贸易壁垒",
      "pinyin": "màoyì bìlěi",
      "partOfSpeech": "noun",
      "category": "trade",
      "level": "advanced",
      "tags": [
        "tariff",
        "barrier",
        "policy"
      ],
      "translations": {
        "vi": {
          "meaning": "Rào cản thương mại",
          "note": "Các quy định thuế quan hoặc phi thuế quan của chính phủ nhằm bảo hộ thị trường nội địa."
        },
        "ja": {
          "meaning": "貿易障壁 / 関税・非関税障壁",
          "note": "自由な貿易を阻害する関税や輸入制限措置。"
        },
        "en": {
          "meaning": "trade barriers",
          "note": "Tariff or non-tariff government restrictions on international trade."
        }
      },
      "examples": [
        {
          "zh": "通过在越南建立组装工厂，企业有效规避了部分针对直接出口的贸易壁垒。",
          "pinyin": "Tōngguò zài Yuènán jiànlì zǔzhuāng gōngchǎng, qǐyè yǒuxiào guībì le bùfen zhēnduì zhíjiē chūkǒu de màoyì bìlěi.",
          "translations": {
            "vi": "Thông qua việc xây dựng nhà máy lắp ráp tại Việt Nam, doanh nghiệp đã phòng tránh hiệu quả một phần các rào cản thương mại.",
            "ja": "ベトナム現地に組立工場を構えることで、直接輸出に対する貿易障壁を回避しました。",
            "en": "By establishing assembly plants in Vietnam, enterprises effectively circumvented direct export trade barriers."
          }
        }
      ],
      "businessTip": {
        "vi": "Gồm có Rào cản thuế quan (关税壁垒) và Rào cản phi thuế quan (非关税壁垒 như tiêu chuẩn kỹ thuật kiểm định ngặt nghèo).",
        "ja": "関税障壁と非関税障壁（技術基準認証や輸入割当等）に大別されます。",
        "en": "Subdivided into tariff barriers and technical non-tariff barriers."
      }
    },
    {
      "id": "bc_doc_006",
      "term": "空运单",
      "pinyin": "kōngyùn dān",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "awb",
        "airfreight",
        "document"
      ],
      "translations": {
        "vi": {
          "meaning": "Vận đơn hàng không (Air Waybill - AWB)",
          "note": "Chứng từ vận chuyển đường hàng không do hãng bay phát hành."
        },
        "ja": {
          "meaning": "航空貨物運送状（AWB）",
          "note": "航空輸送における受取証兼運送契約書。"
        },
        "en": {
          "meaning": "Air Waybill (AWB)",
          "note": "Transport document for air cargo carriage."
        }
      },
      "examples": [
        {
          "zh": "空运单扫描件显示货物已于昨晚搭乘波音货机飞往河内内排机场。",
          "pinyin": "Kōngyùndān sǎomiáojiàn xiǎnshì huòwù yǐ yú zuówǎn dāchéng Bōyīn huòjī fēiwǎng Hénèi Nèipái jīchǎng.",
          "translations": {
            "vi": "Bản scan vận đơn hàng không cho thấy hàng đã lên máy bay vận tải Boeing bay đến sân bay Nội Bài Hà Nội tối qua.",
            "ja": "AWBのスキャンコピーによると、貨物は昨晩ボーイング貨物機でハノイ・ノイバイ空港へ向け出発しました。",
            "en": "The AWB copy indicates cargo departed last night aboard a Boeing freighter bound for Hanoi Noi Bai."
          }
        }
      ],
      "businessTip": {
        "vi": "AWB không phải là chứng từ sở hữu hàng hóa (Non-negotiable).",
        "ja": "海上B/Lと異なり、AWBは流通性のある有価証券ではありません。",
        "en": "Unlike an ocean B/L, an AWB is non-negotiable."
      }
    },
    {
      "id": "bc_doc_007",
      "term": "采购订单",
      "pinyin": "cǎigòu dìngdān",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "beginner",
      "tags": [
        "po",
        "order",
        "document"
      ],
      "translations": {
        "vi": {
          "meaning": "Đơn đặt hàng (Purchase Order - P/O)",
          "note": "Văn bản đề nghị mua hàng chính thức do người mua phát hành gửi người bán."
        },
        "ja": {
          "meaning": "発注書 / 購買注文書（PO）",
          "note": "買い手が売り手に対し発行する確定注文書類。"
        },
        "en": {
          "meaning": "Purchase Order (PO)",
          "note": "Official order document issued by buyer to vendor."
        }
      },
      "examples": [
        {
          "zh": "请根据正式采购订单（PO）上的型号与包装要求组织车间生产。",
          "pinyin": "Qǐng gēnjù zhèngshì cǎigòu dìngdān (PO) shàng de xínghào yǔ bāozhuāng yāoqiú zǔzhī chējiān shēngchǎn.",
          "translations": {
            "vi": "Xin hãy tổ chức sản xuất tại phân xưởng theo đúng model và yêu cầu đóng gói ghi trên đơn mua hàng (P/O) chính thức.",
            "ja": "正式な発注書（PO）記載の型番および梱包要件に厳格に従って製造ラインを稼働させてください。",
            "en": "Please organize plant production strictly in compliance with models and packing specs on the official PO."
          }
        }
      ],
      "businessTip": {
        "vi": "Viết tắt là PO; khi người bán ký xác nhận (Countersign) thì PO có giá trị như hợp đồng kinh tế.",
        "ja": "売り手がサイン返送（PO確認）した時点で有効な売買契約が成立します。",
        "en": "Once countersigned by the supplier, a PO holds binding contractual force."
      }
    },
    {
      "id": "bc_doc_008",
      "term": "提货单",
      "pinyin": "tíhuò dān",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "do",
        "customs",
        "warehouse"
      ],
      "translations": {
        "vi": {
          "meaning": "Lệnh giao hàng / Giấy lấy hàng (Delivery Order - D/O)",
          "note": "Chứng từ do hãng tàu cấp để chủ hàng ra cảng lấy container."
        },
        "ja": {
          "meaning": "荷渡指図書（D/O - Delivery Order）",
          "note": "B/Lと引き換えに船会社から交付される貨物引渡書類。"
        },
        "en": {
          "meaning": "Delivery Order (D/O)",
          "note": "Document issued by shipping line authorizing cargo release."
        }
      },
      "examples": [
        {
          "zh": "换取提货单（D/O）需要先向船代结清目的港本地杂费。",
          "pinyin": "Huànqǔ tíhuò dān (D/O) xūyào xiān xiàng chuándài jiéqīng mùdìgǎng běndì záfèi.",
          "translations": {
            "vi": "Để đổi lấy lệnh giao hàng (D/O) cần thanh toán đủ các phụ phí nội địa tại cảng đích cho đại lý hãng tàu trước.",
            "ja": "D/O（荷渡指図書）の交付を受けるには、船社代理店へ現地チャージを完納する必要があります。",
            "en": "Surrendering B/L for the Delivery Order (D/O) requires settling destination local charges with the shipping agent."
          }
        }
      ],
      "businessTip": {
        "vi": "Quy trình: nộp B/L gốc cho hãng tàu -> nộp phí local charges -> hãng tàu xuất D/O -> cầm D/O đi thông quan lấy hàng.",
        "ja": "B/L提出・現地費用決済 → D/O取得 → 税関申告・貨物引き取りという手順が一般的です。",
        "en": "The standard flow: surrender B/L + settle fees -> collect D/O -> clear customs -> retrieve container."
      }
    },
    {
      "id": "bc_doc_009",
      "term": "装运通知",
      "pinyin": "zhuāngyùn tōngzhī",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "shipping-advice",
        "logistics",
        "notice"
      ],
      "translations": {
        "vi": {
          "meaning": "Thông báo giao hàng / Thông báo bốc hàng (Shipping Advice)",
          "note": "Thư báo tàu đã rời cảng kèm số bill, tên tàu, ngày cập cảng dự kiến."
        },
        "ja": {
          "meaning": "船積通知（Shipping Advice）",
          "note": "出荷完了・本船出港を買い手に知らせる通知書。"
        },
        "en": {
          "meaning": "Shipping Advice / Dispatch Notice",
          "note": "Notification sent to buyer immediately after vessel sails."
        }
      },
      "examples": [
        {
          "zh": "大货装船离开起运港后24小时内，卖方应向买方发送装运通知。",
          "pinyin": "Dàhuò zhuāngchuán líkāi qǐyùngǎng hòu èrshísì xiǎoshí nèi, màifāng yīng xiàng mǎifāng fāsòng zhuāngyùn tōngzhī.",
          "translations": {
            "vi": "Trong vòng 24 giờ sau khi hàng lớn được bốc lên tàu rời cảng đi, bên bán phải gửi thông báo giao hàng cho bên mua.",
            "ja": "本船出港後24時間以内に、売主は買主へ船積通知（Shipping Advice）を送付しなければなりません。",
            "en": "Within 24 hours of vessel departure, the seller must transmit shipping advice to the buyer."
          }
        }
      ],
      "businessTip": {
        "vi": "Thông báo này giúp người mua kịp thời mua bảo hiểm hàng hải (trong điều kiện FOB/CFR) và chuẩn bị tiền thanh toán.",
        "ja": "FOB/CFR取引では、買主が海上保険を期日通り付保するために至急の通知が不可欠です。",
        "en": "Enables buyers under FOB/CFR terms to promptly effect marine insurance coverage."
      }
    },
    {
      "id": "bc_doc_010",
      "term": "保险单",
      "pinyin": "bǎoxiǎndān",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "insurance",
        "policy",
        "risk"
      ],
      "translations": {
        "vi": {
          "meaning": "Đơn bảo hiểm hàng hóa (Insurance Policy)",
          "note": "Chứng thư của công ty bảo hiểm cam kết bồi thường rủi ro mất mát trên đường vận chuyển."
        },
        "ja": {
          "meaning": "保険証券（Insurance Policy）",
          "note": "運送中の損害を補償するため保険会社が発行する証書。"
        },
        "en": {
          "meaning": "Marine Insurance Policy",
          "note": "Document issued by insurer indemnifying cargo transit perils."
        }
      },
      "examples": [
        {
          "zh": "根据CIF条款，卖方已为该批货物投保了110%发票金额的一切险（All Risks）。",
          "pinyin": "Gēnjù CIF tiáokuǎn, màifāng yǐ wèi gāi pī huòwù tóubǎo le bǎifēnzhī yībǎiyīshí fāpiào jīné de yīqièxiǎn (All Risks).",
          "translations": {
            "vi": "Theo điều kiện CIF, bên bán đã mua bảo hiểm Mọi rủi ro (All Risks) với giá trị 110% trị giá hóa đơn cho lô hàng này.",
            "ja": "CIF条件に基づき、売主はインボイス金額の110%相当の全危険担保（All Risks）保険を付保しました。",
            "en": "Under CIF terms, the seller insured the consignment for 110% of invoice value under All Risks."
          }
        }
      ],
      "businessTip": {
        "vi": "Theo tập quán thương mại quốc tế, giá trị bảo hiểm thường bằng 110% giá trị CIF hóa đơn (CIF + 10% lãi dự tính).",
        "ja": "国際慣行上、保険金額はCIF価格の110%（推定利益10%加算）で付保するのが通例です。",
        "en": "Customarily, insured amount is 110% of CIF invoice value to cover anticipated profits."
      }
    },
    {
      "id": "bc_doc_011",
      "term": "质检报告",
      "pinyin": "zhìjiǎn bàogào",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "qa",
        "inspection",
        "certificate"
      ],
      "translations": {
        "vi": {
          "meaning": "Biên bản kiểm tra chất lượng (Inspection Report / COA)",
          "note": "Kết quả kiểm nghiệm thông số kỹ thuật của nhà máy hoặc bên thứ 3 (SGS, TUV)."
        },
        "ja": {
          "meaning": "検査成績書 / 検査報告書（Inspection Report）",
          "note": "製品の性能や仕様が規格を満たしていることを証明する書類。"
        },
        "en": {
          "meaning": "Quality Inspection Report (COA)",
          "note": "Formal document certifying products pass technical benchmarks."
        }
      },
      "examples": [
        {
          "zh": "尾款支付的前提条件是出具经双方认可的第三方合格质检报告。",
          "pinyin": "Wěikuǎn zhīfù de qiántí tiáojiàn shì chūjù jīng shuāngfāng rènkě de dì-sān fāng hégé zhìjiǎn bàogào.",
          "translations": {
            "vi": "Điều kiện tiên quyết để giải ngân đợt thanh toán cuối cùng là phải có biên bản kiểm tra chất lượng đạt chuẩn do bên thứ 3 được hai bên công nhận cấp.",
            "ja": "残金支払いの前提条件として、双方が合意した第三者検品機関による合格レポートの提出が必要です。",
            "en": "Final balance disbursement is contingent upon presentation of a compliant third-party inspection report."
          }
        }
      ],
      "businessTip": {
        "vi": "Viết tắt của Certificate of Analysis là COA; báo cáo xuất xưởng là Factory QC Report.",
        "ja": "成分分析表は「COA」、工場出荷前検査表は「出厂检验报告」と称します。",
        "en": "Certificate of Analysis is abbreviated as COA; pre-shipment tests are 出厂检验报告."
      }
    },
    {
      "id": "bc_doc_012",
      "term": "电放提单",
      "pinyin": "diànfàng tídān",
      "partOfSpeech": "noun",
      "category": "documents",
      "level": "intermediate",
      "tags": [
        "telex-release",
        "bl",
        "logistics"
      ],
      "translations": {
        "vi": {
          "meaning": "Vận đơn điện giao hàng (Telex Release B/L)",
          "note": "Giải phóng hàng bằng điện tín không cần xuất trình vận đơn gốc giấy."
        },
        "ja": {
          "meaning": "サレンダーB/L / 元地回収電放提単",
          "note": "原本を船籍地で回収し、仕向地で原本なしで引き渡しを行う電信手続き。"
        },
        "en": {
          "meaning": "Telex Release B/L / Surrendered B/L",
          "note": "Endorsement allowing destination cargo release without presenting physical paper."
        }
      },
      "examples": [
        {
          "zh": "收到买方汇款水单后，我们立即通知船公司操作电放并把电放件发给买方。",
          "pinyin": "Shōudào mǎifāng huìkuǎn shuǐdān hòu, wǒmen lìjí tōngzhī chuángōngsī cāozuò diànfàng bìng bǎ diànfàngjiàn fā gěi mǎifāng.",
          "translations": {
            "vi": "Sau khi nhận được ủy nhiệm chi chuyển tiền của bên mua, chúng tôi lập tức thông báo hãng tàu làm thủ tục điện giao hàng (telex release) và gửi bản xác nhận cho bên mua.",
            "ja": "送金控え受領後、直ちに船会社へ電放（サレンダー）手続きを依頼し受領書を転送しました。",
            "en": "Upon receipt of the wire slip, we instructed the line to telex release the cargo and mailed the release copy."
          }
        }
      ],
      "businessTip": {
        "vi": "Rất thông dụng ở các tuyến vận chuyển ngắn Trung Quốc - Việt Nam vì tàu đi chỉ mất 2-3 ngày, nhanh hơn thời gian gửi chuyển phát nhanh bill gốc.",
        "ja": "航海日数が数日の日中・中越航路では原本郵送の遅れを回避するため必須の手法です。",
        "en": "Indispensable on short China-Vietnam feeder routes where vessels transit in 2-3 days."
      }
    },
    {
      "id": "bc_customs_006",
      "term": "绿通",
      "pinyin": "lǜ tōng",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "intermediate",
      "tags": [
        "customs",
        "green-channel",
        "clearance"
      ],
      "translations": {
        "vi": {
          "meaning": "Luồng Xanh (Green Channel)",
          "note": "Miễn kiểm tra hồ sơ giấy và miễn kiểm tra thực tế hàng hóa, thông quan tự động."
        },
        "ja": {
          "meaning": "グリーンチャネル（即時通関許可）",
          "note": "書類審査・現物検査が免除され即時許可となる審査区分。"
        },
        "en": {
          "meaning": "Green Channel clearance",
          "note": "Paperless and physical inspection-free expedited customs routing."
        }
      },
      "examples": [
        {
          "zh": "该批零配件直接命中绿通，仅用半小时便完成了海关系统自动放行。",
          "pinyin": "Gāi pī língpèijiàn zhíjiē mìngzhòng lǜtōng, jǐn yòng bàn xiǎoshí biàn wánchéng le hǎiguān xìtǒng zìdòng fàngxíng.",
          "translations": {
            "vi": "Lô linh kiện này được phân thẳng vào Luồng Xanh, chỉ mất nửa tiếng là hệ thống hải quan đã thông quan tự động.",
            "ja": "本件スペアパーツはグリーン区分となり、わずか30分で電子自動許可が出ました。",
            "en": "The spare parts batch was routed Green Channel, clearing automatically within thirty minutes."
          }
        }
      ],
      "businessTip": {
        "vi": "Doanh nghiệp tuân thủ pháp luật thuế tốt (AEO) sẽ có tỷ lệ vào Luồng Xanh rất cao.",
        "ja": "認定通関業者（AEO）制度の適格企業はグリーン判定率が極めて高くなります。",
        "en": "AEO certified enterprises enjoy exceptionally high Green Channel assignment rates."
      }
    },
    {
      "id": "bc_customs_007",
      "term": "红通",
      "pinyin": "hóng tōng",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "intermediate",
      "tags": [
        "customs",
        "red-channel",
        "inspection"
      ],
      "translations": {
        "vi": {
          "meaning": "Luồng Đỏ (Red Channel)",
          "note": "Kiểm tra chi tiết hồ sơ giấy và bắt buộc hạ container mở thùng kiểm tra thực tế hàng hóa."
        },
        "ja": {
          "meaning": "レッドチャネル（現物開梱検査）",
          "note": "書類審査に加え、コンテナを開梱して現物を立ち会い検査する区分。"
        },
        "en": {
          "meaning": "Red Channel inspection",
          "note": "High-risk customs assignment requiring document audit and full cargo unboxing."
        }
      },
      "examples": [
        {
          "zh": "由于申报品名较为敏感，海关把本票货物定为红通，需要安排工人掏箱查验。",
          "pinyin": "Yóuyú shēnbào pǐnmíng jiàowéi mǐngǎn, hǎiguān bǎ běn piào huòwù dìng wéi hóngtōng, xūyào ānpái gōngrén tāoxiāng cháyàn.",
          "translations": {
            "vi": "Do tên hàng khai báo tương đối nhạy cảm, hải quan đã xếp lô này vào Luồng Đỏ, cần điều động công nhân dỡ hàng ra kiểm tra.",
            "ja": "申告品目が審査重点品目であったためレッド判定となり、デバンニング現物検査が必要です。",
            "en": "Because the declared commodity was sensitive, customs designated Red Channel, requiring container stripping."
          }
        }
      ],
      "businessTip": {
        "vi": "Luồng Đỏ sẽ phát sinh chi phí bốc dỡ nâng hạ (nâng hạ bãi kiểm hóa) và mất thêm 1-2 ngày.",
        "ja": "レッド判定時はヤード横持料や荷役作業料等の実費と1〜2日の遅延が発生します。",
        "en": "Red Channel entails terminal crane handling surcharges and 1-2 days inspection delay."
      }
    },
    {
      "id": "bc_customs_008",
      "term": "海关放行",
      "pinyin": "hǎiguān fàngxíng",
      "partOfSpeech": "verb",
      "category": "customs",
      "level": "intermediate",
      "tags": [
        "release",
        "customs",
        "clearance"
      ],
      "translations": {
        "vi": {
          "meaning": "Hải quan thông quan / Cho phép thông quan (Customs Release)",
          "note": "Cơ quan hải quan chấp thuận hoàn tất thủ tục, cho phép kéo hàng rời cảng."
        },
        "ja": {
          "meaning": "通関許可 / 税関放行",
          "note": "税関による審査がすべて完了し、貨物の搬出が正式に許可されること。"
        },
        "en": {
          "meaning": "customs release / clearance granted",
          "note": "Customs authorities officially releasing goods for pickup."
        }
      },
      "examples": [
        {
          "zh": "海关放行后，车队可以凭电子提货单随时进港提离集装箱。",
          "pinyin": "Hǎiguān fàngxíng hòu, chēduì kěyǐ píng diànzǐ tíhuò dān suíshí jìngǎng tílí jízhuāngxiāng.",
          "translations": {
            "vi": "Sau khi hải quan thông quan, đội xe có thể dùng lệnh giao hàng điện tử vào cảng kéo container ra bất cứ lúc nào.",
            "ja": "通関許可が下りた後、運送業者は電子引取証でいつでもコンテナを搬出できます。",
            "en": "Once customs release is issued, trucking fleets can enter the yard to pull the container."
          }
        }
      ],
      "businessTip": {
        "vi": "Lệnh thông quan in ra từ hệ thống gọi là \"放行单\" (Release Note).",
        "ja": "通関許可通知票は「放行单」と呼ばれます。",
        "en": "The system printout confirming release is the 放行单 (Release Order)."
      }
    },
    {
      "id": "bc_customs_009",
      "term": "申报要素",
      "pinyin": "shēnbào yàosù",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "advanced",
      "tags": [
        "elements",
        "declaration",
        "customs"
      ],
      "translations": {
        "vi": {
          "meaning": "Các yếu tố khai báo hải quan",
          "note": "Các chỉ tiêu kỹ thuật bắt buộc phải điền ứng với từng mã HS (chất liệu, công dụng, nhãn hiệu)."
        },
        "ja": {
          "meaning": "申告要素 / 申告必須要件",
          "note": "HSコードごとに定められた材質・用途・ブランド等の必須開示項目。"
        },
        "en": {
          "meaning": "customs declaration elements",
          "note": "Mandatory technical parameters required for specific HS code classification."
        }
      },
      "examples": [
        {
          "zh": "向海关报关前，请务必向工厂索取完整的申报要素，包括品牌、型号、材质及工作原理。",
          "pinyin": "Xiàng hǎiguān bàoguān qián, qǐng wùbì xiàng gōngchǎng suǒqǔ wánzhěng de shēnbào yàosù, bāokuò pǐnpái, xínghào, cáizhì jí gōngzuò yuánlǐ.",
          "translations": {
            "vi": "Trước khi khai báo hải quan, xin hãy yêu cầu xưởng cung cấp đầy đủ các yếu tố khai báo, bao gồm thương hiệu, model, chất liệu và nguyên lý hoạt động.",
            "ja": "通関申告前に、ブランド、型番、材質、動作原理を含む申告要素を工場から必ず収集してください。",
            "en": "Prior to filing declaration, obtain full declaration elements including brand, model, material, and operating principles."
          }
        }
      ],
      "businessTip": {
        "vi": "Khai thiếu hoặc sai申报要素 sẽ bị hệ thống hải quan trả hồ sơ yêu cầu sửa đổi, kéo dài thời gian thông quan.",
        "ja": "申告要素に不備があると税関システムで差し戻され、大幅な遅れにつながります。",
        "en": "Omissions in declaration elements cause system rejections and prolonged customs hold-ups."
      }
    },
    {
      "id": "bc_customs_010",
      "term": "增值税",
      "pinyin": "zēngzhíshuì",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "intermediate",
      "tags": [
        "vat",
        "tax",
        "finance"
      ],
      "translations": {
        "vi": {
          "meaning": "Thuế giá trị gia tăng (VAT)",
          "note": "Thuế tính trên giá trị gia tăng của hàng hóa nhập khẩu."
        },
        "ja": {
          "meaning": "増値税 / 付加価値税（VAT）",
          "note": "輸入時に輸入関税とともに課される売上税・付加価値税。"
        },
        "en": {
          "meaning": "Value-Added Tax (VAT)",
          "note": "Consumption tax assessed on the dutiable import value."
        }
      },
      "examples": [
        {
          "zh": "本批进口货物需在海关缴纳8%的进口环节增值税。",
          "pinyin": "Běn pī jìnkǒu huòwù xū zài hǎiguān jiǎonà bā fēnbǐ de jìnkǒu huánjié zēngzhíshuì.",
          "translations": {
            "vi": "Lô hàng nhập khẩu này cần nộp 8% thuế giá trị gia tăng (VAT) khâu nhập khẩu tại cơ quan hải quan.",
            "ja": "本件輸入品は通関時に8%の輸入付加価値税（VAT）を納付する必要があります。",
            "en": "This import consignment is subject to 8% import Value-Added Tax payable to customs."
          }
        }
      ],
      "businessTip": {
        "vi": "Giá tính thuế VAT nhập khẩu = (Trị giá tính thuế hải quan + Thuế nhập khẩu + Thuế tiêu thụ đặc biệt nếu có).",
        "ja": "輸入VATの課税標準額は「関税評価額＋輸入関税額」となります。",
        "en": "Import VAT basis equals (Customs Dutiable Value + Applicable Import Duty)."
      }
    },
    {
      "id": "bc_customs_011",
      "term": "滞纳金",
      "pinyin": "zhìnàjīn",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "advanced",
      "tags": [
        "fine",
        "tax",
        "penalty"
      ],
      "translations": {
        "vi": {
          "meaning": "Tiền phạt chậm nộp thuế",
          "note": "Khoản phạt tính theo ngày khi doanh nghiệp nộp thuế hải quan quá thời hạn quy định."
        },
        "ja": {
          "meaning": "延滞金 / 延滞税",
          "note": "納税期限を超過した場合に課される追徴金。"
        },
        "en": {
          "meaning": "late payment interest surcharge",
          "note": "Penalty assessed for delayed payment of customs duties."
        }
      },
      "examples": [
        {
          "zh": "请财务部门务必在税单开出15天内完成缴款，以免产生每天万分之五的海关滞纳金。",
          "pinyin": "Qǐng cáiwù bùmén wùbì zài shuìdān kāichū shíwǔ tiān nèi wánchéng jiǎokuǎn, yǐmiǎn chǎnshēng měitiān wànfēnzhī wǔ de hǎiguān zhìnàjīn.",
          "translations": {
            "vi": "Xin bộ phận tài chính hãy thanh toán thuế trong vòng 15 ngày kể từ ngày ra thông báo thuế, tránh phát sinh tiền phạt chậm nộp 0.05% mỗi ngày.",
            "ja": "納税告知書発行から15日以内に納税を完了し、日歩0.05%の延滞税発生を防いでください。",
            "en": "Finance must settle duties within 15 days of assessment to avoid daily 0.05% late payment surcharges."
          }
        }
      ],
      "businessTip": {
        "vi": "Hải quan tính tiền chậm nộp thuế lũy tiến theo từng ngày quá hạn.",
        "ja": "納期限を1日でも過ぎると日割り計算で延滞金が発生します。",
        "en": "Customs accrues late payment interest on a strict per-diem compounding schedule."
      }
    },
    {
      "id": "bc_customs_012",
      "term": "商检",
      "pinyin": "shāngjiǎn",
      "partOfSpeech": "noun",
      "category": "customs",
      "level": "intermediate",
      "tags": [
        "ciq",
        "quarantine",
        "inspection"
      ],
      "translations": {
        "vi": {
          "meaning": "Kiểm định chất lượng hàng hóa xuất nhập khẩu / Kiểm dịch",
          "note": "Kiểm tra nhà nước về an toàn, vệ sinh dịch tễ và chất lượng (CIQ)."
        },
        "ja": {
          "meaning": "商品検査・検疫（商検・CIQ）",
          "note": "輸出入貨物の品質・衛生・安全性を公的に検査・認証する手続き。"
        },
        "en": {
          "meaning": "commodity inspection and quarantine (CIQ)",
          "note": "Statutory state inspection of safety, hygiene, and conformity."
        }
      },
      "examples": [
        {
          "zh": "食品及动植物产品入境必须先通过严格的官方商检与卫生检疫。",
          "pinyin": "Shípǐn jí dòngzhíwù chǎnpǐn rùjìng bìxū xiān tōngguò yángé de guānfāng shāngjiǎn yǔ wèishēng jiǎnyì.",
          "translations": {
            "vi": "Thực phẩm cùng các sản phẩm động thực vật nhập cảnh bắt buộc phải vượt qua khâu kiểm tra chất lượng và kiểm dịch vệ sinh nghiêm ngặt.",
            "ja": "食品や動植物製品の輸入には、公的機関による厳格な商品検査および動植物検疫の合格が義務付けられています。",
            "en": "Foodstuffs and agricultural products must pass rigorous statutory CIQ safety and phytosanitary inspections."
          }
        }
      ],
      "businessTip": {
        "vi": "Ở Trung Quốc, cơ quan kiểm nghiệm kiểm dịch trước đây là CIQ, nay đã sáp nhập trực tiếp vào Hải quan Tổng cục (海关).",
        "ja": "中国では従来の出入国検査検疫局（CIQ）が税関（海関）へ統合され一元化されています。",
        "en": "In China, CIQ quarantine functions have been fully consolidated into China Customs."
      }
    },
    {
      "id": "bc_log_001",
      "term": "货代",
      "pinyin": "huòdài",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "beginner",
      "tags": [
        "forwarder",
        "shipping",
        "agent"
      ],
      "translations": {
        "vi": {
          "meaning": "Đại lý giao nhận vận tải (viết tắt của 货运代理 - Freight Forwarder)",
          "note": "Đơn vị trung gian sắp xếp đặt chỗ tàu, bay, hải quan cho hàng hóa."
        },
        "ja": {
          "meaning": "フォワーダー / 貨物利用運送事業者",
          "note": "荷主と輸送機関の間で国際輸送の手配を請け負う業者。"
        },
        "en": {
          "meaning": "Freight Forwarder (abbreviation of 货运代理)",
          "note": "Intermediary organizing shipments for individuals or corporations."
        }
      },
      "examples": [
        {
          "zh": "买家指定了他们自己在上海的合作货代负责订舱。",
          "pinyin": "Mǎijiā zhǐdìng le tāmen zìjǐ zài Shànghǎi de hézuò huòdài fùzé dìngcāng.",
          "translations": {
            "vi": "Người mua đã chỉ định đại lý logistics riêng của họ tại Thượng Hải phụ trách việc đặt chỗ tàu (Booking).",
            "ja": "バイヤー側が指定した上海のフォワーダーが船積みのブッキングを担当します。",
            "en": "The buyer nominated their own freight forwarder in Shanghai to handle booking."
          }
        }
      ]
    },
    {
      "id": "bc_log_002",
      "term": "集装箱",
      "pinyin": "jízhuāngxiāng",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "beginner",
      "tags": [
        "container",
        "shipping",
        "box"
      ],
      "translations": {
        "vi": {
          "meaning": "Container / công-ten-nơ (khẩu ngữ thường gọi là 柜子 - guìzi)",
          "note": "Quy cách phổ biến: 20GP (20 feet), 40GP (40 feet), 40HQ (40 feet cao)."
        },
        "ja": {
          "meaning": "コンテナ",
          "note": "海上輸送の標準輸送容器（20フィート、40フィート等）。"
        },
        "en": {
          "meaning": "Shipping Container (colloquially called 柜子)",
          "note": "Standard intermodal freight container (20ft, 40ft, 40HQ)."
        }
      },
      "examples": [
        {
          "zh": "这批货物体积大约为65立方米，刚好可以装满一个40尺高柜。",
          "pinyin": "Zhè pī huòwù tǐjī dàyuē wéi liùshíwǔ lìfāngmǐ, gānghǎo kěyǐ zhuāng mǎn yí gè sìshí chǐ gāoguì.",
          "translations": {
            "vi": "Thể tích lô hàng này khoảng 65 mét khối (CBM), vừa vặn đóng đầy một container 40 feet cao (40HQ).",
            "ja": "この貨物の総体積は約65CBMで、40フィートハイキューブコンテナ（40HQ）1本にちょうど収まります。",
            "en": "The cargo volume is about 65 CBM, which exactly fills one 40HQ container."
          }
        }
      ]
    },
    {
      "id": "bc_log_003",
      "term": "整箱",
      "pinyin": "zhěng xiāng",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "intermediate",
      "tags": [
        "fcl",
        "container",
        "shipping"
      ],
      "translations": {
        "vi": {
          "meaning": "Hàng nguyên container (FCL - Full Container Load)",
          "note": "Một chủ hàng thuê trọn một hoặc nhiều container."
        },
        "ja": {
          "meaning": "コンテナ満載貨物（FCL / Full Container Load）",
          "note": "1社の荷主でコンテナを1本まるごと仕立てる輸送形態。"
        },
        "en": {
          "meaning": "Full Container Load (FCL)",
          "note": "Shipment occupying an entire container."
        }
      },
      "examples": [
        {
          "zh": "相比拼箱，整箱运输的速度更快，并且货损风险更低。",
          "pinyin": "Xiāngbǐ pīnxiāng, zhěngxiāng yùnshū de sùdù gèng kuài, bìngqiě huòsǔn fēngxiǎn gèng dī.",
          "translations": {
            "vi": "So với hàng ghép (LCL), vận chuyển nguyên container (FCL) có tốc độ nhanh hơn và rủi ro hư hỏng hàng thấp hơn.",
            "ja": "混載便（LCL）に比べて、FCL便は輸送日数が短く貨物の破損リスクも軽減されます。",
            "en": "Compared to LCL, FCL shipping is faster with lower risk of damage."
          }
        }
      ]
    },
    {
      "id": "bc_log_004",
      "term": "拼箱",
      "pinyin": "pīn xiāng",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "intermediate",
      "tags": [
        "lcl",
        "consolidation",
        "shipping"
      ],
      "translations": {
        "vi": {
          "meaning": "Hàng lẻ ghép container (LCL - Less than Container Load)",
          "note": "Nhiều chủ hàng gửi chung trong một container khi số lượng ít không đủ một công."
        },
        "ja": {
          "meaning": "混載貨物（LCL / Less than Container Load）",
          "note": "少量の貨物を他の荷主の荷物とひとつのコンテナに混載して輸送すること。"
        },
        "en": {
          "meaning": "Less than Container Load (LCL / consolidation)",
          "note": "Multiple shippers sharing one container."
        }
      },
      "examples": [
        {
          "zh": "由于订购数量只有五个立方，建议走海运拼箱比较划算。",
          "pinyin": "Yóuyú dìnggòu shùliàng zhǐyǒu wǔ gè lìfāng, jiànyì zǒu hǎiyùn pīnxiāng bǐjiào huásuàn.",
          "translations": {
            "vi": "Do số lượng đặt hàng chỉ có 5 khối (CBM), nên đi hàng lẻ ghép container (LCL) sẽ tiết kiệm chi phí hơn.",
            "ja": "発注量がわずか5CBMですので、海上混載便（LCL）をご利用いただく方がコストパフォーマンスに優れています。",
            "en": "Since the order is only 5 CBM, shipping via ocean LCL is more cost-effective."
          }
        }
      ]
    },
    {
      "id": "bc_log_005",
      "term": "延误",
      "pinyin": "yánwù",
      "partOfSpeech": "verb",
      "category": "logistics",
      "level": "beginner",
      "tags": [
        "delay",
        "schedule",
        "shipping"
      ],
      "translations": {
        "vi": {
          "meaning": "Chậm trễ / trễ hạn / hoãn lịch (tàu, bay, giao hàng)",
          "note": "Rất hay gặp do bão gió, tắc nghẽn cảng hoặc hải quan giữ hàng."
        },
        "ja": {
          "meaning": "遅延する / 遅れる",
          "note": "悪天候や港湾混雑等により輸送日程が遅れること。"
        },
        "en": {
          "meaning": "to delay / shipment delay",
          "note": "Shipping or delivery lagging behind schedule."
        }
      },
      "examples": [
        {
          "zh": "受台风天气影响，原定周三出港的班轮预计延误三天。",
          "pinyin": "Shòu táifēng tiānqì yǐngxiǎng, yuándìng zhōusān chūgǎng de bānlún yùjì yánwù sān tiān.",
          "translations": {
            "vi": "Do ảnh hưởng của thời tiết bão, chuyến tàu định kỳ dự kiến rời cảng vào thứ Tư sẽ bị chậm trễ khoảng 3 ngày.",
            "ja": "台風の影響により、水曜日出港予定の定期船は3日間の遅延が見込まれます。",
            "en": "Due to typhoon conditions, the vessel scheduled for Wednesday is expected to be delayed by three days."
          }
        }
      ]
    },
    {
      "id": "bc_fin_001",
      "term": "电汇",
      "pinyin": "diànhuì",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "beginner",
      "tags": [
        "t-t",
        "telegraphic-transfer",
        "payment"
      ],
      "translations": {
        "vi": {
          "meaning": "Chuyển tiền bằng điện tín (T/T - Telegraphic Transfer / Wire Transfer)",
          "note": "Phương thức thanh toán quốc tế phổ biến nhất hiện nay qua hệ thống ngân hàng SWIFT."
        },
        "ja": {
          "meaning": "電信送金（T/T送金 / Telegraphic Transfer）",
          "note": "国際銀行間送金（SWIFT）を利用する最も一般的な決済方法。"
        },
        "en": {
          "meaning": "Telegraphic Transfer (T/T / Wire Transfer)",
          "note": "Bank transfer via SWIFT system, dominant in trade."
        }
      },
      "examples": [
        {
          "zh": "我们的付款条款通常是：30%定金电汇，70%尾款凭提单副本电汇付清。",
          "pinyin": "Wǒmen de fùkuǎn tiáokuǎn tōngcháng shì: sānshí bǎifēnzhī dìngjīn diànhuì, qīshí bǎifēnzhī wěikuǎn píng tídān fùběn diànhuì fù qīng.",
          "translations": {
            "vi": "Điều khoản thanh toán của chúng tôi thường là: 30% tiền cọc chuyển khoản T/T, 70% còn lại thanh toán T/T sau khi gửi bản copy vận đơn (B/L).",
            "ja": "当社の通常支払条件は「30％手付金T/T、残金70％はB/Lコピー提示時にT/T送金」となっております。",
            "en": "Our standard terms are 30% deposit by T/T, and 70% balance by T/T against B/L copy."
          }
        }
      ],
      "businessTip": {
        "vi": "Điều khoản \"30% T/T deposit + 70% balance against copy B/L\" là quy chuẩn an toàn phổ biến nhất trong thương mại song phương Việt - Trung.",
        "ja": "「30%前金＋70%船積書類コピー確認後送金」は日中・越中貿易で最も広く採用される安全な決済方式です。",
        "en": "\"30% deposit + 70% against B/L copy\" is the golden standard payment term in cross-border trade."
      }
    },
    {
      "id": "bc_fin_002",
      "term": "信用证",
      "pinyin": "xìnyòng zhèng",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "intermediate",
      "tags": [
        "l-c",
        "letter-of-credit",
        "bank-guarantee"
      ],
      "translations": {
        "vi": {
          "meaning": "Thư tín dụng (L/C - Letter of Credit)",
          "note": "Cam kết thanh toán có điều kiện của ngân hàng mở cho người thụ hưởng khi nộp đủ bộ chứng từ hợp lệ."
        },
        "ja": {
          "meaning": "信用状（L/C / Letter of Credit）",
          "note": "輸入者の取引銀行が発行する条件付きの支払確約書。"
        },
        "en": {
          "meaning": "Letter of Credit (L/C)",
          "note": "Bank payment guarantee against conforming documents."
        }
      },
      "examples": [
        {
          "zh": "由于本次订单总额较大，双方同意采用不可撤销即期信用证结算。",
          "pinyin": "Yóuyú běn cì dìngdān zǒng'é jiào dà, shuāngfāng tóngyì cǎiyòng bùkě chèxiāo jíqī xìnyòngzhèng jiésuàn.",
          "translations": {
            "vi": "Do tổng giá trị đơn hàng lần này khá lớn, hai bên nhất trí thanh toán bằng Thư tín dụng không hủy ngang trả ngay (Irrevocable L/C at sight).",
            "ja": "今回の発注額が多額であるため、双方は取消不能一覧払信用状（Irrevocable L/C at sight）での決済に合意しました。",
            "en": "Due to the large order volume, both parties agreed to settle via Irrevocable Letter of Credit at sight."
          }
        }
      ]
    },
    {
      "id": "bc_fin_003",
      "term": "定金",
      "pinyin": "dìngjīn",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "beginner",
      "tags": [
        "deposit",
        "advance",
        "down-payment"
      ],
      "translations": {
        "vi": {
          "meaning": "Tiền đặt cọc / tiền bảo đảm thực hiện hợp đồng",
          "note": "Thường từ 20% - 50% tổng giá trị để nhà máy mua vật tư và lên khuôn sản xuất."
        },
        "ja": {
          "meaning": "手付金 / 頭金 / 内金（デポジット）",
          "note": "生産着手前に買い手が支払う証拠金。"
        },
        "en": {
          "meaning": "deposit / down payment",
          "note": "Advance funds paid prior to production."
        }
      },
      "examples": [
        {
          "zh": "工厂必须在收到买方定金后，才能开始订购原材料。",
          "pinyin": "Gōngchǎng bìxū zài shōudào mǎifāng dìngjīn hòu, cáinéng kāishǐ dìnggòu yuáncáiliào.",
          "translations": {
            "vi": "Nhà máy bắt buộc phải nhận được tiền đặt cọc của người mua thì mới có thể bắt đầu đặt mua nguyên vật liệu.",
            "ja": "工場はバイヤーからの手付金の着金を確認してから、原材料の手配を開始します。",
            "en": "The factory will only begin procuring raw materials once the buyer's deposit is received."
          }
        }
      ]
    },
    {
      "id": "bc_fin_004",
      "term": "尾款",
      "pinyin": "wěikuǎn",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "beginner",
      "tags": [
        "balance",
        "payment",
        "final"
      ],
      "translations": {
        "vi": {
          "meaning": "Khoản thanh toán còn lại / tiền đuôi (Balance payment)",
          "note": "Số tiền thanh toán nốt sau khi trừ đi khoản đặt cọc."
        },
        "ja": {
          "meaning": "残金 / 残高",
          "note": "手付金を差し引いた残りの決済代金。"
        },
        "en": {
          "meaning": "balance payment / remaining balance",
          "note": "Remaining amount due after deducting initial deposit."
        }
      },
      "examples": [
        {
          "zh": "请在见提单复印件后的三个工作日内安排支付尾款。",
          "pinyin": "Qǐng zài jiàn tídān fùyìnjiàn hòu de sān gè gōngzuòrì nèi ānpái zhīfù wěikuǎn.",
          "translations": {
            "vi": "Xin vui lòng thu xếp thanh toán khoản tiền còn lại trong vòng 3 ngày làm việc sau khi nhìn thấy bản sao vận đơn.",
            "ja": "B/Lコピーの受領後、3営業日以内に残金のお支払いをお手配ください。",
            "en": "Please arrange to pay the remaining balance within three working days after receiving the B/L copy."
          }
        }
      ]
    },
    {
      "id": "bc_fin_005",
      "term": "账期",
      "pinyin": "zhàngqī",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "intermediate",
      "tags": [
        "credit-term",
        "credit-period",
        "finance"
      ],
      "translations": {
        "vi": {
          "meaning": "Thời hạn công nợ / kỳ hạn thanh toán (Credit period)",
          "note": "Ví dụ: OA 30天 (Open Account 30 days - công nợ 30 ngày sau khi nhận hàng)."
        },
        "ja": {
          "meaning": "支払サイト / 売掛期間 / クレジット期間",
          "note": "商品納品から代金決済期日までの猶予期間（例：月末締め翌月末払い）。"
        },
        "en": {
          "meaning": "credit term / credit period (e.g. Net 30, Net 60)",
          "note": "Time allowed between invoice/delivery and payment."
        }
      },
      "examples": [
        {
          "zh": "新客户首年合作通常不做账期，老客户可以申请30天账期。",
          "pinyin": "Xīn kèhù shǒunián hézuò tōngcháng bú zuò zhàngqī, lǎo kèhù kěyǐ shēnqǐng sānshí tiān zhàngqī.",
          "translations": {
            "vi": "Khách hàng mới năm đầu hợp tác thông thường không áp dụng công nợ, khách hàng thân thiết có thể xin công nợ 30 ngày.",
            "ja": "新規のお客様とは初年度は原則掛け売り（支払サイト）を行いませんが、既存の優良顧客には30日のサイトを適用可能です。",
            "en": "New clients are generally not granted credit terms in the first year; established clients may apply for 30-day terms."
          }
        }
      ]
    },
    {
      "id": "bc_after_001",
      "term": "质量问题",
      "pinyin": "zhìliàng wèntí",
      "partOfSpeech": "noun",
      "category": "aftersales",
      "level": "beginner",
      "tags": [
        "quality",
        "defect",
        "issue"
      ],
      "translations": {
        "vi": {
          "meaning": "Vấn đề chất lượng / sự cố chất lượng sản phẩm",
          "note": "Nguyên nhân phổ biến dẫn đến khiếu nại và đổi trả."
        },
        "ja": {
          "meaning": "品質問題 / クオリティの不具合",
          "note": "納品された製品の規格外、不良、破損などの問題。"
        },
        "en": {
          "meaning": "quality issue / defect",
          "note": "Defects or deviations from agreed standards."
        }
      },
      "examples": [
        {
          "zh": "经我方质检部门抽检，发现首批到货存在严重的开胶质量问题。",
          "pinyin": "Jīng wǒfāng zhìjiǎn bùmén chōujiǎn, fāxiàn shǒupī dàohuò cúnzài yánzhòng de kāijiāo zhìliàng wèntí.",
          "translations": {
            "vi": "Qua kiểm tra ngẫu nhiên của bộ phận KCS chúng tôi, phát hiện lô hàng đầu tiên tồn tại vấn đề chất lượng bị bong keo nghiêm trọng.",
            "ja": "当社の品質管理部門による抜き取り検査の結果、初回納入分に深刻な接着不良（剥がれ）の品質問題が発見されました。",
            "en": "Inspection by our QC department revealed serious glue-debonding defects in the first batch."
          }
        }
      ]
    },
    {
      "id": "bc_after_002",
      "term": "索赔",
      "pinyin": "suǒ péi",
      "partOfSpeech": "verb",
      "category": "aftersales",
      "level": "intermediate",
      "tags": [
        "claim",
        "compensation",
        "dispute"
      ],
      "translations": {
        "vi": {
          "meaning": "Khiếu nại đòi bồi thường (Claim)",
          "note": "Đòi bồi thường tài chính do hàng lỗi, giao thiếu hoặc vi phạm hợp đồng."
        },
        "ja": {
          "meaning": "クレーム提起 / 損害賠償請求",
          "note": "品質不良や数量不足に対して金銭的補償を正式に請求すること。"
        },
        "en": {
          "meaning": "to claim / to demand compensation",
          "note": "Formal request for damages due to non-conformance."
        }
      },
      "examples": [
        {
          "zh": "由于零件破损率超过5%，买方正式向供应商提出索赔申请。",
          "pinyin": "Yóuyú língjiàn pòsǔnlǜ chāoguò bǎifēnzhī wǔ, mǎifāng zhèngshì xiàng gōngyìngshāng tíchū suǒpéi shēnqǐng.",
          "translations": {
            "vi": "Do tỷ lệ linh kiện hư hỏng vượt quá 5%, bên mua đã chính thức gửi đơn yêu cầu bồi thường lên nhà cung cấp.",
            "ja": "部品の破損率が5％を超過したため、買い手はサプライヤーに対し正式に損害賠償を請求しました。",
            "en": "Because the defect rate exceeded 5%, the buyer formally submitted a claim for compensation."
          }
        }
      ]
    },
    {
      "id": "bc_after_003",
      "term": "退换货",
      "pinyin": "tuì huàn huò",
      "partOfSpeech": "phrase",
      "category": "aftersales",
      "level": "beginner",
      "tags": [
        "return",
        "exchange",
        "warranty"
      ],
      "translations": {
        "vi": {
          "meaning": "Trả và đổi hàng (退货: trả hàng hoàn tiền; 换货: đổi hàng mới)",
          "note": "Chính sách bảo hành hoặc khắc phục sự cố giao dịch."
        },
        "ja": {
          "meaning": "返品・交換",
          "note": "不良品を返送し、良品と交換するか返金を受けること。"
        },
        "en": {
          "meaning": "return and exchange of goods",
          "note": "Returning defective items for refund or replacement."
        }
      },
      "examples": [
        {
          "zh": "凡是在质保期内出现的非人为损坏，厂家一律无条件包退换货。",
          "pinyin": "Fánshì zài zhìbǎo qī nèi chūxiàn de fēirénwéi sǔnhuài, chǎngjiā yílǜ wútiáojiàn bāo tuìhuànhuò.",
          "translations": {
            "vi": "Mọi hư hỏng không do yếu tố con người xuất hiện trong thời gian bảo hành, nhà sản xuất đều bao đổi trả vô điều kiện.",
            "ja": "保証期間内に発生した自然故障につきましては、メーカーが全品無条件で返品・交換を保証いたします。",
            "en": "Any non-accidental damage during the warranty period is unconditionally covered for return and exchange."
          }
        }
      ]
    },
    {
      "id": "bc_scen_001",
      "term": "达成共识",
      "pinyin": "dáchéng gòngshí",
      "partOfSpeech": "phrase",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "consensus",
        "agreement",
        "closing"
      ],
      "translations": {
        "vi": {
          "meaning": "Đạt được đồng thuận / đạt được tiếng nói chung",
          "note": "Cụm từ then chốt khép lại buổi đàm phán thành công."
        },
        "ja": {
          "meaning": "合意に達する / コンセンサスを得る",
          "note": "交渉の末、双方が条件に合意すること。"
        },
        "en": {
          "meaning": "to reach a consensus / to come to an agreement",
          "note": "Finalizing agreement after discussions."
        }
      },
      "examples": [
        {
          "zh": "经过长达三轮的艰苦谈判，双方终于在交期和付款方式上达成了共识。",
          "pinyin": "Jīngguò chángdá sān lún de jiānkǔ tánpàn, shuāngfāng zhōngyú zài jiāoqī hé fùkuǎn fāngshì shàng dáchéng le gòngshí.",
          "translations": {
            "vi": "Trải qua ba vòng đàm phán cam go, hai bên rốt cuộc đã đạt được sự đồng thuận về thời hạn giao hàng và phương thức thanh toán.",
            "ja": "3回にわたる粘り強い交渉の末、双方は納期と決済条件についてようやく合意に達しました。",
            "en": "After three rounds of tough negotiations, both sides reached a consensus on delivery dates and payment terms."
          }
        }
      ]
    },
    {
      "id": "bc_scen_002",
      "term": "合作愉快",
      "pinyin": "hézuò yúkuài",
      "partOfSpeech": "phrase",
      "category": "scenarios",
      "level": "beginner",
      "tags": [
        "closing",
        "toast",
        "etiquette"
      ],
      "translations": {
        "vi": {
          "meaning": "Chúc hợp tác vui vẻ / chúc việc cộng tác thuận lợi tốt đẹp",
          "note": "Câu nói bắt tay kinh điển khi ký kết hợp đồng hoặc kết thúc cuộc họp."
        },
        "ja": {
          "meaning": "良い協業を / 今後ともよろしくお願いいたします",
          "note": "契約締結や合意時に握手を交わしながら述べる定番の挨拶。"
        },
        "en": {
          "meaning": "Pleasure doing business with you / Looking forward to fruitful cooperation",
          "note": "Standard handshake closing phrase."
        }
      },
      "examples": [
        {
          "zh": "合同已经签署完毕，祝我们合作愉快，互利共赢！",
          "pinyin": "Hétong yǐjīng qiānshǔ wánbì, zhù wǒmen hézuò yúkuài, hùlì gòngyíng!",
          "translations": {
            "vi": "Hợp đồng đã ký kết xong xuôi, chúc chúng ta hợp tác vui vẻ, cùng có lợi cùng thắng!",
            "ja": "契約書の調印が完了いたしました。素晴らしい協業と、双方の発展をお祈り申し上げます！",
            "en": "The contract is signed; here is to fruitful cooperation and win-win success!"
          }
        }
      ]
    },
    {
      "id": "bc_log_006",
      "term": "滞港费",
      "pinyin": "zhìgǎngfèi",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "intermediate",
      "tags": [
        "demurrage",
        "port",
        "penalty"
      ],
      "translations": {
        "vi": {
          "meaning": "Phí lưu bãi cảng (Demurrage)', note: 'Phí phạt của hãng tàu khi container lưu tại cảng quá thời gian miễn phí."
        },
        "ja": {
          "meaning": "滞港料 / デマレージ（Demurrage）', note: 'フリータイムを超過してコンテナヤードに保管された際の超過料金。"
        },
        "en": {
          "meaning": "demurrage fee', note: 'Penalty charge for keeping containers inside the port terminal past free time."
        }
      },
      "examples": [
        {
          "zh": "必须赶在免箱期结束前办结清关，避免产生高额滞港费。",
          "pinyin": "Bìxū gǎnzài miànxiāngqī jiéshù qián bànjié qīngguān, bìmiǎn chǎnshēng gāo'é zhìgǎngfèi.",
          "translations": {
            "vi": "Bắt buộc phải làm xong thủ tục thông quan trước khi hết hạn miễn phí vỏ, tránh phát sinh phí lưu bãi cảng đắt đỏ.",
            "ja": "高額なデマレージ発生を防ぐため、フリータイム終了前までに必ず通関を完了させてください。",
            "en": "Customs clearance must conclude before free time expires to prevent hefty demurrage fees."
          }
        }
      ],
      "businessTip": {
        "vi": "Phí lưu cont trong cảng là Demurrage (滞港费); phí lưu cont ngoài kho riêng là Detention (滞箱费).",
        "ja": "港湾ヤード内超過料はデマレージ、港外持ち出し超過料はディテンションと区別します。",
        "en": "Demurrage applies inside terminal yards; Detention applies outside terminal gates."
      }
    },
    {
      "id": "bc_log_007",
      "term": "免箱期",
      "pinyin": "miànxiāngqī",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "intermediate",
      "tags": [
        "free-time",
        "container",
        "logistics"
      ],
      "translations": {
        "vi": {
          "meaning": "Thời gian miễn phí lưu vỏ container (Free Time)', note: 'Số ngày hãng tàu cho phép mượn và lưu vỏ container mà không tính phí."
        },
        "ja": {
          "meaning": "フリータイム（Free Time - 無料保管日数）', note: '船会社がコンテナ延滞料を請求しない無料貸出猶予期間。"
        },
        "en": {
          "meaning": "container free time', note: 'Grace period allowed by carriers before charging detention/demurrage."
        }
      },
      "examples": [
        {
          "zh": "订舱时我们成功向船东申请到了目的港14天的免箱期（14 days Free Demurrage）。",
          "pinyin": "Dìngcāng shí wǒmen chénggōng xiàng chuándōng shēnqǐng dào le mùdìgǎng shísì tiān de miànxiāngqī.",
          "translations": {
            "vi": "Khi đặt chỗ tàu chúng tôi đã xin thành công từ chủ tàu 14 ngày miễn phí lưu vỏ tại cảng đích.",
            "ja": "ブッキング時に船会社と交渉し、仕向地での14日間フリータイムを獲得しました。",
            "en": "During booking we successfully secured 14 days of destination container free time from the carrier."
          }
        }
      ],
      "businessTip": {
        "vi": "Thông thường hãng tàu chỉ cho 7 ngày; các đơn hàng đi xa hoặc thủ tục phức tạp nên xin 14 hoặc 21 ngày.",
        "ja": "通常は7日間ですが、通関難易度が高い案件は14〜21日間の長期フリータイムを申請します。",
        "en": "Standard free time is 7 days; request 14-21 days for complex customs procedures."
      }
    },
    {
      "id": "bc_log_008",
      "term": "订舱",
      "pinyin": "dìngcāng",
      "partOfSpeech": "verb",
      "category": "logistics",
      "level": "intermediate",
      "tags": [
        "booking",
        "freight",
        "shipping"
      ],
      "translations": {
        "vi": {
          "meaning": "Đặt chỗ tàu / Book cước tàu (Booking)', note: 'Đăng ký giữ chỗ chứa container trên tàu biển hoặc khoang máy bay."
        },
        "ja": {
          "meaning": "船腹予約する / ブッキングする（Booking）', note: '船会社やフォワーダーに対して輸送スペースを確保すること。"
        },
        "en": {
          "meaning": "to book cargo space / shipping booking', note: 'Reserving vessel container slots or aircraft cargo space."
        }
      },
      "examples": [
        {
          "zh": "货好前一周，物流部需要向货代发出订舱委托书（Booking Note）。",
          "pinyin": "Huò hǎo qián yī zhōu, wùliúbù xūyào xiàng huòdài fāchū dìngcāng wěituōshū (Booking Note).",
          "translations": {
            "vi": "Một tuần trước khi hàng sản xuất xong, bộ phận logistics cần gửi giấy ủy thác đặt chỗ (Booking Note) cho bên giao nhận.",
            "ja": "貨物完成の1週間前に、物流部門はフォワーダーへ船積指図書（Booking Note）を送付します。",
            "en": "One week before cargo readiness, logistics transmits the Booking Note to the freight forwarder."
          }
        }
      ],
      "businessTip": {
        "vi": "Giấy xác nhận chỗ của hãng tàu gọi là \"订舱确认书\" hay S/O (Shipping Order).",
        "ja": "船会社からの予約確定通知は「S/O（Shipping Order）」と呼ばれます。",
        "en": "Carrier booking confirmation is universally known as the S/O (Shipping Order)."
      }
    },
    {
      "id": "bc_log_009",
      "term": "航线",
      "pinyin": "hángxiàn",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "intermediate",
      "tags": [
        "route",
        "shipping",
        "service"
      ],
      "translations": {
        "vi": {
          "meaning": "Tuyến đường hàng hải / Đường bay', note: 'Hành trình di chuyển cố định của tàu hoặc máy bay nối các cảng."
        },
        "ja": {
          "meaning": "航路 / サービスルート', note: '定期船が寄港する海上輸送ルート。"
        },
        "en": {
          "meaning": "shipping route / lane', note: 'Designated transit route connecting origin and destination ports."
        }
      },
      "examples": [
        {
          "zh": "我们选择的是深圳到海防的直达直航快线，海上航程只需两天。",
          "pinyin": "Wǒmen xuǎnzé de shì Shēnzhèn dào Hǎifáng de zhídá zhíháng kuàixiàn, hǎishàng hángchéng zhǐ xū liǎng tiān.",
          "translations": {
            "vi": "Chúng tôi chọn tuyến tàu chạy thẳng cao tốc từ Thâm Quyến đi Hải Phòng, thời gian trên biển chỉ mất 2 ngày.",
            "ja": "深圳からハイフォンへの直行直航ダイレクトサービスを選択したため、海上輸送はわずか2日です。",
            "en": "We opted for the Shenzhen-to-Haiphong direct express lane, requiring only 2 days transit time."
          }
        }
      ],
      "businessTip": {
        "vi": "Tàu chạy thẳng gọi là \"直航\" (zhíháng); tàu có ghé cảng trung chuyển bốc dỡ lại gọi là \"转运\" (zhuǎnyùn - transshipment).",
        "ja": "直行便は「直航」、中継港を経由する便は「转运（トランシップ）」と区別します。",
        "en": "Direct services are 直航; intermediate transshipment services are 转运."
      }
    },
    {
      "id": "bc_log_010",
      "term": "毛重",
      "pinyin": "máozhòng",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "beginner",
      "tags": [
        "weight",
        "gross",
        "packing"
      ],
      "translations": {
        "vi": {
          "meaning": "Trọng lượng cả bì (Gross Weight - GW)', note: 'Tổng khối lượng bao gồm cả sản phẩm và thùng hộp, pallet bảo vệ."
        },
        "ja": {
          "meaning": "総重量 / グロス重量（GW）', note: '外装カートンやパレット梱包資材を含めた全重量。"
        },
        "en": {
          "meaning": "Gross Weight (GW)', note: 'Total weight of goods inclusive of packaging and pallets."
        }
      },
      "examples": [
        {
          "zh": "每个托盘的毛重不得超过1,000公斤，以符合叉车装卸安全规定。",
          "pinyin": "Měi gè tuōpán de máozhòng bùdé chāoguò yīqiān gōngjīn, yǐ fúhé chāchē zhuāngxiè ānquán guīdìng.",
          "translations": {
            "vi": "Tổng trọng lượng cả bì mỗi pallet không được vượt quá 1.000 kg để phù hợp với quy định an toàn xe nâng.",
            "ja": "フォークリフト荷役の安全基準に合わせ、パレット1基の総重量は1,000kg以下に収めてください。",
            "en": "Gross weight per pallet must not exceed 1,000 kg to comply with forklift safety regulations."
          }
        }
      ],
      "businessTip": {
        "vi": "Viết tắt trên chứng từ là \"G.W.\"; đối lập với \"N.W.\" (Net Weight - 净重).",
        "ja": "書類上は「G.W.」と略記されます。正味重量「N.W.」と対比されます。",
        "en": "Abbreviated as G.W. on packing documents; contrasted with N.W."
      }
    },
    {
      "id": "bc_log_011",
      "term": "净重",
      "pinyin": "jìngzhòng",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "beginner",
      "tags": [
        "weight",
        "net",
        "product"
      ],
      "translations": {
        "vi": {
          "meaning": "Trọng lượng tịnh (Net Weight - NW)', note: 'Khối lượng thực của riêng sản phẩm hàng hóa, không tính bao bì."
        },
        "ja": {
          "meaning": "正味重量 / ネット重量（NW）', note: '梱包材を除外した製品本体のみの重量。"
        },
        "en": {
          "meaning": "Net Weight (NW)', note: 'Pure weight of products excluding all packaging."
        }
      },
      "examples": [
        {
          "zh": "本箱货物净重为20公斤，外加纸箱及泡棉包装后毛重为22.5公斤。",
          "pinyin": "Běn xiāng huòwù jìngzhòng wéi èrshí gōngjīn, wàijiā zhǐxiāng jí pàomián bāozhuāng hòu máozhòng wéi èrshí'èr diǎn wǔ gōngjīn.",
          "translations": {
            "vi": "Trọng lượng tịnh của thùng hàng này là 20 kg, cộng thêm bao bì carton và mút xốp thì trọng lượng cả bì là 22.5 kg.",
            "ja": "本箱の正味重量は20kgで、段ボールおよび緩衝材を含めた総重量は22.5kgとなります。",
            "en": "Net weight per carton is 20 kg; gross weight with outer carton and foam padding is 22.5 kg."
          }
        }
      ],
      "businessTip": {
        "vi": "Thuế nhập khẩu ở một số mặt hàng (như nông sản, hóa chất) tính theo trọng lượng tịnh Net Weight.",
        "ja": "従量税が適用される品目では、ネット重量（NW）が課税計算の基準となります。",
        "en": "Specific customs tariffs are often assessed strictly upon net weight."
      }
    },
    {
      "id": "bc_log_012",
      "term": "立方米",
      "pinyin": "lìfāngmǐ",
      "partOfSpeech": "noun",
      "category": "logistics",
      "level": "beginner",
      "tags": [
        "cbm",
        "volume",
        "dimension"
      ],
      "translations": {
        "vi": {
          "meaning": "Mét khối (CBM - Cubic Meter)', note: 'Đơn vị đo thể tích tiêu chuẩn dùng để tính cước vận chuyển hàng hóa."
        },
        "ja": {
          "meaning": "立方メートル（CBM / M3）', note: '貨物の容積計算単位。フレート計算の基礎。"
        },
        "en": {
          "meaning": "Cubic Meter (CBM)', note: 'Standard unit of volume used for cargo freight calculation."
        }
      },
      "examples": [
        {
          "zh": "整批货物的总体积为28.5立方米，正好可以装满一个20尺普柜（20GP）。",
          "pinyin": "Zhěng pī huòwù de zǒngtǐjī wéi èrshíbā diǎn wǔ lìfāngmǐ, zhènghǎo kěyǐ zhuāngmǎn yī gè èrshí chǐ pǔguì (20GP).",
          "translations": {
            "vi": "Tổng thể tích toàn bộ lô hàng là 28.5 mét khối, vừa vặn đóng đầy một container 20 feet thường (20GP).",
            "ja": "貨物の総容積は28.5立方メートル（CBM）で、ちょうど20フィートコンテナ（20GP）1本分に収まります。",
            "en": "Total volume is 28.5 CBM, fitting perfectly inside a 20ft standard dry container (20GP)."
          }
        }
      ],
      "businessTip": {
        "vi": "1 cont 20GP chứa khoảng 28-30 CBM; cont 40GP chứa 56-58 CBM; cont 40HQ chứa 68-70 CBM.",
        "ja": "20GPは約28〜30CBM、40GPは約58CBM、40HQは約68CBMが積載目安です。",
        "en": "Loading benchmarks: 20GP fits ~28-30 CBM; 40HQ fits ~68 CBM."
      }
    },
    {
      "id": "bc_fin_006",
      "term": "汇率",
      "pinyin": "huìlǜ",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "beginner",
      "tags": [
        "exchange-rate",
        "currency",
        "forex"
      ],
      "translations": {
        "vi": {
          "meaning": "Tỷ giá hối đoái', note: 'Tỷ lệ quy đổi giữa hai đồng tiền (USD/VND, USD/CNY)."
        },
        "ja": {
          "meaning": "為替レート / 為替相場', note: '異なる通貨間の交換比率。"
        },
        "en": {
          "meaning": "exchange rate / forex rate', note: 'Ratio at which one currency is exchanged for another."
        }
      },
      "examples": [
        {
          "zh": "近来人民币对美元汇率波动较大，合同中需约定汇率浮动补偿条款。",
          "pinyin": "Jìnlái Rénmínbì duì Měiyuán huìlǜ bōdòng jiàodà, hétong zhōng xū yuēdìng huìlǜ fúdòng bǔcháng tiáokuǎn.",
          "translations": {
            "vi": "Gần đây tỷ giá đồng Nhân dân tệ so với USD biến động khá lớn, trong hợp đồng cần quy định điều khoản bù trừ biến động tỷ giá.",
            "ja": "人民元対米ドルの為替変動が大きいため、契約書に為替変動リスク条項を明記する必要があります。",
            "en": "With recent RMB/USD exchange rate volatility, contracts should include forex fluctuation adjustment clauses."
          }
        }
      ],
      "businessTip": {
        "vi": "Tỷ giá mua vào là \"买入价\", tỷ giá bán ra của ngân hàng là \"卖出价\".",
        "ja": "銀行買付相場は「买入价」、売付相場は「卖出价」です。",
        "en": "Bank buying rate is 买入价; bank selling rate is 卖出价."
      }
    },
    {
      "id": "bc_fin_007",
      "term": "汇损",
      "pinyin": "huìsǔn",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "intermediate",
      "tags": [
        "forex-loss",
        "finance",
        "risk"
      ],
      "translations": {
        "vi": {
          "meaning": "Lỗ do biến động tỷ giá (Exchange Loss)', note: 'Thiệt hại tài chính phát sinh khi tỷ giá đồng ngoại tệ sụt giảm trong chu kỳ thanh toán."
        },
        "ja": {
          "meaning": "為替差損（Exchange Loss）', note: '決済時の為替レート変動によって生じる損失。"
        },
        "en": {
          "meaning": "exchange loss / forex loss', note: 'Financial losses resulting from unfavorable currency fluctuations."
        }
      },
      "examples": [
        {
          "zh": "通过在银行办理远期结售汇业务，企业有效锁定了利润并避免了潜在汇损。",
          "pinyin": "Tōngguò zài yínháng bànlǐ yuǎnqī jiéshòuhuì yèwù, qǐyè yǒuxiào suǒdìng le lìrùn bìng bìmiǎn le qiánzài huìsǔn.",
          "translations": {
            "vi": "Thông qua nghiệp vụ mua bán ngoại tệ kỳ hạn tại ngân hàng, doanh nghiệp đã khóa chặt lợi nhuận và phòng tránh thua lỗ tỷ giá tiềm ẩn.",
            "ja": "銀行で為替先物予約を締結することにより、利益を固定化し為替差損リスクを回避しました。",
            "en": "By securing forward foreign exchange contracts with the bank, the enterprise locked in margins and averted forex losses."
          }
        }
      ],
      "businessTip": {
        "vi": "Ngược lại với lỗ tỷ giá (汇损) là lãi tỷ giá hối đoái: \"汇兑收益\" (huìduì shōuyì).",
        "ja": "対義語は為替差益「汇兑收益」です。",
        "en": "The converse of exchange loss is forex exchange gain (汇兑收益)."
      }
    },
    {
      "id": "bc_fin_008",
      "term": "增值税专用发票",
      "pinyin": "zēngzhíshuì zhuānyòng fāpiào",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "advanced",
      "tags": [
        "fapiao",
        "vat",
        "tax"
      ],
      "translations": {
        "vi": {
          "meaning": "Hóa đơn đỏ giá trị gia tăng chuyên dụng (Hóa đơn VAT chuyên dụng)', note: 'Hóa đơn tài chính do cơ quan thuế Trung Quốc quản lý, dùng để khấu trừ thuế đầu vào."
        },
        "ja": {
          "meaning": "増値税専用発票（専用インボイス）', note: '中国税務局指定の仕入税額控除が可能な公式専用領収書。"
        },
        "en": {
          "meaning": "Special VAT Fapiao Invoice', note: 'Official tax invoice issued in China enabling input VAT credits."
        }
      },
      "examples": [
        {
          "zh": "含税报价包含13%的增值税专用发票，可直接用于国内进项税额抵扣。",
          "pinyin": "Hánshuì bàojià bāohán bǎifēnzhī shísān de zēngzhíshuì zhuānyòng fāpiào, kě zhíjiē yòngyú guónèi jìnxiàng shuì'é dǐkòu.",
          "translations": {
            "vi": "Báo giá đã bao gồm thuế có kèm hóa đơn VAT chuyên dụng 13%, có thể dùng trực tiếp để khấu trừ thuế đầu vào trong nước.",
            "ja": "税込見積には13%の増値税専用発票が含まれており、仕入税額控除にそのまま充当できます。",
            "en": "Tax-inclusive pricing includes a 13% Special VAT Fapiao valid for domestic input tax deductions."
          }
        }
      ],
      "businessTip": {
        "vi": "Thường gọi tắt là \"专票\" (zhuānpiào); phân biệt với hóa đơn thông thường không được khấu trừ \"普票\" (pǔpiào).",
        "ja": "控除可能な専用発票は「专票」、控除不可の一般発票は「普票」と略称されます。",
        "en": "Deductible special invoices are 专票; non-deductible general invoices are 普票."
      }
    },
    {
      "id": "bc_fin_009",
      "term": "对账单",
      "pinyin": "duìzhàng dān",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "intermediate",
      "tags": [
        "reconciliation",
        "statement",
        "accounting"
      ],
      "translations": {
        "vi": {
          "meaning": "Bảng đối chiếu công nợ / Sao kê tài khoản (Statement of Account)', note: 'Văn bản liệt kê chi tiết các giao dịch mua bán, thanh toán để hai bên kiểm tra chéo số dư."
        },
        "ja": {
          "meaning": "売掛買掛対照表 / 残高確認書（Statement of Account）', note: '月次の取引明細と未決済残高を相互確認するための書類。"
        },
        "en": {
          "meaning": "Statement of Account (SOA)', note: 'Periodic balance sheet detailing open invoices and payments."
        }
      },
      "examples": [
        {
          "zh": "请核对本月对账单，如无异议请签字确认以便财务安排月底结算。",
          "pinyin": "Qǐng héduì běnyuè duìzhàng dān, rú wú yìyì qǐng qiānzì quèrèn yǐbiàn cáiwù ānpái yuèdǐ jiésuàn.",
          "translations": {
            "vi": "Xin vui lòng đối chiếu bảng công nợ tháng này, nếu không có sai lệch xin ký xác nhận để tài chính sắp xếp thanh toán cuối tháng.",
            "ja": "今月の取引明細対照表をご確認いただき、相違がなければご署名の上ご返送ください。",
            "en": "Please verify this month statement of account and countersign for month-end reconciliation."
          }
        }
      ],
      "businessTip": {
        "vi": "Quy trình kiểm tra số dư công nợ hai bên gọi là \"对账\" (duìzhàng).",
        "ja": "残高の照合作業全般を「对账（対照・照合）」と表現します。",
        "en": "The action of reconciling ledger balances is 对账."
      }
    },
    {
      "id": "bc_fin_010",
      "term": "催款",
      "pinyin": "cuīkuǎn",
      "partOfSpeech": "verb",
      "category": "finance",
      "level": "intermediate",
      "tags": [
        "collection",
        "payment",
        "ar"
      ],
      "translations": {
        "vi": {
          "meaning": "Giục thanh toán tiền nợ / Thu hồi công nợ', note: 'Gửi thông báo nhắc nhở khách hàng trả tiền khi hóa đơn đã quá hạn."
        },
        "ja": {
          "meaning": "代金回収の督促を行う', note: '支払期日を超過した売掛金の決済を促すこと。"
        },
        "en": {
          "meaning": "to demand payment / collect overdue accounts', note: 'Pursuing settlement for delinquent receivables."
        }
      },
      "examples": [
        {
          "zh": "该笔货款已逾期超过30天，财务部今天将正式发送催款函。",
          "pinyin": "Gāi bǐ huòkuǎn yǐ yúqī chāoguò sānshí tiān, cáiwùbù jīntiān jiāng zhèngshì fāsòng cuīkuǎn hán.",
          "translations": {
            "vi": "Khoản tiền hàng này đã quá hạn hơn 30 ngày, hôm nay phòng tài chính sẽ chính thức gửi công văn đòi nợ.",
            "ja": "本件代金は期日を30日超過しているため、経理部より本日正式な支払督促状を送付します。",
            "en": "This receivable is overdue by over 30 days; finance is dispatching a formal payment demand letter today."
          }
        }
      ],
      "businessTip": {
        "vi": "Thư giục thanh toán gọi là \"催款函\" (cuīkuǎn hán). Lần 1 nên dùng lời lẽ hòa nhã, sau đó mới tăng dần mức độ pháp lý.",
        "ja": "督促状は「催款函」。最初は友好的なリマインダーから段階的にトーンを強めます。",
        "en": "Formal collection letters are 催款函, beginning courteously before escalating to legal warnings."
      }
    },
    {
      "id": "bc_fin_011",
      "term": "垫付",
      "pinyin": "diànfù",
      "partOfSpeech": "verb",
      "category": "finance",
      "level": "intermediate",
      "tags": [
        "advance",
        "disbursement",
        "reimbursement"
      ],
      "translations": {
        "vi": {
          "meaning": "Tạm ứng chi hộ / Trả tiền trước hộ', note: 'Chi trả thay một khoản tiền cho đối tác rồi thu lại sau."
        },
        "ja": {
          "meaning": "立替払いする / 立替納付する', note: '相手方に代わって一時的に費用を立て替えて支払うこと。"
        },
        "en": {
          "meaning": "to advance funds / pay on behalf of', note: 'Disbursing funds temporarily on behalf of a counterparty."
        }
      },
      "examples": [
        {
          "zh": "货代在目的港垫付的海关查验杂费将据实列入账单由买方支付。",
          "pinyin": "Huòdài zài mùdìgǎng diànfù de hǎiguān cháyàn záfèi jiāng jùshí lièrù zhàngdān yóu mǎifāng zhīfù.",
          "translations": {
            "vi": "Các khoản phụ phí kiểm hóa hải quan mà forwarder ứng trả hộ tại cảng đích sẽ được kê khai theo hóa đơn thực tế để bên mua chi trả.",
            "ja": "仕向港でフォワーダーが立替払いした税関検査実費は、実費精算としてバイヤーへ請求されます。",
            "en": "Port inspection fees advanced by the freight forwarder will be reinvoiced at cost to the buyer."
          }
        }
      ],
      "businessTip": {
        "vi": "Thu theo hóa đơn thực tế gọi là \"据实结算\" (jù shí jiésuàn - reimbursement at actual cost).",
        "ja": "「据实结算」は実費精算・実額請求を意味します。",
        "en": "Rebilling at exact cost without markup is termed 据实结算."
      }
    },
    {
      "id": "bc_fin_012",
      "term": "承兑汇票",
      "pinyin": "chéngduì huìpiào",
      "partOfSpeech": "noun",
      "category": "finance",
      "level": "advanced",
      "tags": [
        "bank-acceptance",
        "draft",
        "finance"
      ],
      "translations": {
        "vi": {
          "meaning": "Hối phiếu chấp nhận thanh toán (Bank Acceptance Bill)', note: 'Thương phiếu do ngân hàng bảo lãnh cam kết trả tiền vô điều kiện khi đến hạn (3-6 tháng)."
        },
        "ja": {
          "meaning": "引受手形 / 銀行引受手形（Bank Acceptance）', note: '満期日に銀行が無条件支払いを保証する信用手形。"
        },
        "en": {
          "meaning": "Bank Acceptance Bill / Draft', note: 'Short-term credit investment backed by bank guarantee upon maturity."
        }
      },
      "examples": [
        {
          "zh": "国内大宗采购中，供应商同意接受6个月期的大型商业银行承兑汇票。",
          "pinyin": "Guónèi dàzōng cǎigòu zhōng, gōngyìngshāng tóngyì jiēshòu liù gè yuè qī de dàxíng shāngyè yínháng chéngduì huìpiào.",
          "translations": {
            "vi": "Trong các đơn hàng thu mua số lượng lớn nội địa, nhà cung cấp đồng ý chấp nhận hối phiếu ngân hàng thương mại lớn kỳ hạn 6 tháng.",
            "ja": "国内大型調達において、サプライヤーは大手商業銀行発行の6ヶ月満期引受手形を受理しました。",
            "en": "For domestic bulk procurement, the supplier agreed to accept 6-month tier-one bank acceptance drafts."
          }
        }
      ],
      "businessTip": {
        "vi": "Hối phiếu ngân hàng bảo lãnh (银票 - yínpiào) an toàn và thanh khoản cao hơn hối phiếu do doanh nghiệp tự ký phát (商票 - shāngpiào).",
        "ja": "銀行手形（银票）は企業振出商業手形（商票）より信用度・流動性が圧倒的に高く評価されます。",
        "en": "Bank acceptance notes (银票) carry vastly higher liquidity than commercial enterprise notes (商票)."
      }
    },
    {
      "id": "bc_after_004",
      "term": "瑕疵",
      "pinyin": "xiácī",
      "partOfSpeech": "noun",
      "category": "aftersales",
      "level": "intermediate",
      "tags": [
        "defect",
        "flaw",
        "quality"
      ],
      "translations": {
        "vi": {
          "meaning": "Khuyết tật / Tì vết / Lỗi nhỏ', note: 'Các khuyết điểm nhỏ về ngoại quan bề mặt hoặc kỹ thuật của thành phẩm."
        },
        "ja": {
          "meaning": "瑕疵（かし） / 欠陥 / 小さなキズ', note: '製品の表面キズや軽微な機能不備。"
        },
        "en": {
          "meaning": "defect / blemish / flaw', note: 'Minor cosmetic imperfections or technical defects."
        }
      },
      "examples": [
        {
          "zh": "经抽样检查，外壳存在轻微划痕等外观瑕疵的产品占比约为2%。",
          "pinyin": "Jīng chōuyàng jiǎnchá, wàiké cúnzài qīngwēi huàhén děng wàiguān xiácī de chǎnpǐn zhànbǐ dàyuē wéi bǎifēnzhī èr.",
          "translations": {
            "vi": "Qua kiểm tra ngẫu nhiên, sản phẩm có khuyết tật ngoại quan như xước nhẹ trên vỏ chiếm tỷ lệ khoảng 2%.",
            "ja": "抜取検査の結果、筐体に擦り傷等の外観瑕疵が認められる製品の比率は約2%でした。",
            "en": "Random sampling revealed cosmetic blemishes like minor casing scratches on approximately 2% of items."
          }
        }
      ],
      "businessTip": {
        "vi": "Lỗi ẩn giấu bên trong không thể phát hiện bằng mắt thường gọi là \"隐蔽瑕疵\" (Latent defect).",
        "ja": "目視では判別できない内部の不備は「隐蔽瑕疵（隠れたる瑕疵）」と呼ばれます。",
        "en": "Hidden defects undiscoverable via visual inspection are 隐蔽瑕疵 (latent defects)."
      }
    },
    {
      "id": "bc_after_005",
      "term": "抽检",
      "pinyin": "chōujiǎn",
      "partOfSpeech": "verb",
      "category": "aftersales",
      "level": "intermediate",
      "tags": [
        "sampling",
        "qc",
        "inspection"
      ],
      "translations": {
        "vi": {
          "meaning": "Kiểm tra xác suất / Kiểm tra rút mẫu ngẫu nhiên', note: 'Rút ngẫu nhiên một tỷ lệ sản phẩm nhất định trong lô hàng để thẩm định chất lượng."
        },
        "ja": {
          "meaning": "抜取検査する（サンプリング検査）', note: 'ロットから規定のサンプル数を抽出して合否判定すること。"
        },
        "en": {
          "meaning": "to perform sampling inspection', note: 'Testing statistical product samples drawn randomly from a batch."
        }
      },
      "examples": [
        {
          "zh": "质检员按照MIL-STD-105E标准对出厂产品进行了严格抽检。",
          "pinyin": "Zhìjiǎnyuán ànzhào MIL-STD-105E biāozhǔn duì chūchǎng chǎnpǐn jìnxíng le yángé chōujiǎn.",
          "translations": {
            "vi": "Nhân viên kiểm phẩm đã tiến hành kiểm tra xác suất nghiêm ngặt đối với sản phẩm xuất xưởng theo tiêu chuẩn MIL-STD-105E.",
            "ja": "検査員はMIL-STD-105E基準に準拠し、出荷製品の厳格な抜取検査を実施しました。",
            "en": "QC inspectors conducted rigorous sampling inspections on outgoing shipments per MIL-STD-105E."
          }
        }
      ],
      "businessTip": {
        "vi": "Kiểm tra xác suất đối lập với \"全检\" (quánjiǎn - kiểm tra 100% từng cái).",
        "ja": "抜取検査（抽检）の対義語は全数検査（全检）です。",
        "en": "Sampling inspection (抽检) is contrasted with 100% full inspection (全检)."
      }
    },
    {
      "id": "bc_after_006",
      "term": "AQL标准",
      "pinyin": "AQL biāozhǔn",
      "partOfSpeech": "noun",
      "category": "aftersales",
      "level": "advanced",
      "tags": [
        "aql",
        "quality",
        "benchmark"
      ],
      "translations": {
        "vi": {
          "meaning": "Tiêu chuẩn giới hạn chất lượng chấp nhận được (AQL)', note: 'Chỉ số quốc tế xác định số lượng hàng lỗi tối đa cho phép trong lô kiểm tra."
        },
        "ja": {
          "meaning": "AQL合格品質水準（Acceptance Quality Limit）', note: '抜取検査で許容される欠陥数の判定基準規格。"
        },
        "en": {
          "meaning": "AQL inspection standard', note: 'Statistically defined Acceptance Quality Limit benchmark."
        }
      },
      "examples": [
        {
          "zh": "双方合同约定验货标准为AQL Level II：致命缺陷0，严重缺陷1.5，轻微缺陷4.0。",
          "pinyin": "Shuāngfāng hétong yuēdìng yànhuò biāozhǔn wéi AQL Level II: zhìmìng quēxiàn líng, yánzhòng quēxiàn yī diǎn wǔ, qīngwēi quēxiàn sì diǎn líng.",
          "translations": {
            "vi": "Hợp đồng hai bên quy định tiêu chuẩn kiểm hàng AQL Cấp 2: Lỗi chết người bằng 0, Lỗi nặng 1.5, Lỗi nhẹ 4.0.",
            "ja": "契約検査基準はAQL水準II（致命欠陥0、重欠陥1.5、軽欠陥4.0）と規定されています。",
            "en": "The agreed contract inspection benchmark is AQL Level II: Critical 0, Major 1.5, Minor 4.0."
          }
        }
      ],
      "businessTip": {
        "vi": "Đây là thuật ngữ cốt lõi mà mọi nhân viên mua bán ngoại thương bắt buộc phải nắm rõ.",
        "ja": "製造業・貿易実務において必須中の必須となる品質判定指標です。",
        "en": "An indispensable quality benchmark universally leveraged in manufacturing trade."
      }
    },
    {
      "id": "bc_after_007",
      "term": "质保期",
      "pinyin": "zhìbǎo qī",
      "partOfSpeech": "noun",
      "category": "aftersales",
      "level": "intermediate",
      "tags": [
        "warranty",
        "guarantee",
        "support"
      ],
      "translations": {
        "vi": {
          "meaning": "Thời hạn bảo hành chất lượng (Warranty Period)', note: 'Khoảng thời gian nhà sản xuất cam kết sửa chữa miễn phí nếu phát sinh lỗi hỏng."
        },
        "ja": {
          "meaning": "品質保証期間 / ワランティ期間', note: 'メーカーが無償修理や交換を保証する有効期間。"
        },
        "en": {
          "meaning": "quality warranty period', note: 'Stipulated timeframe during which vendor guarantees defect rectification."
        }
      },
      "examples": [
        {
          "zh": "本款工业级平板电脑自提单签发之日起享有两年的免费质保期。",
          "pinyin": "Běn kuǎn gōngyèjí píngbǎn diànnǎo zì tídān qiānfā zhī rì qǐ xiǎngyǒu liǎng nián de miǎnfèi zhìbǎo qī.",
          "translations": {
            "vi": "Mẫu máy tính bảng công nghiệp này được hưởng thời hạn bảo hành miễn phí 2 năm kể từ ngày phát hành vận đơn.",
            "ja": "本産業用タブレットはB/L発行日より2年間の無償品質保証期間が適用されます。",
            "en": "This industrial tablet carries a 2-year free warranty starting from the B/L issuance date."
          }
        }
      ],
      "businessTip": {
        "vi": "Thường bắt đầu tính từ ngày ký nhận hàng hoặc ngày phát hành Vận đơn B/L.",
        "ja": "起算日は受領日またはB/L発行日とするのが一般的です。",
        "en": "Warranty terms usually commence upon cargo receipt or B/L issue date."
      }
    },
    {
      "id": "bc_after_008",
      "term": "折让",
      "pinyin": "zhéràng",
      "partOfSpeech": "noun",
      "category": "aftersales",
      "level": "intermediate",
      "tags": [
        "allowance",
        "discount",
        "claim"
      ],
      "translations": {
        "vi": {
          "meaning": "Khoản giảm giá trừ tiền đền bù / Chiết khấu do lỗi hàng', note: 'Giảm bớt một phần tiền hàng để khách giữ lại dùng thay vì trả hàng về."
        },
        "ja": {
          "meaning": "値引き補償 / 瑕疵折譲（Allowance）', note: '返品を避け、代金の一部を減額して落着させる金銭補償。"
        },
        "en": {
          "meaning": "price allowance / rebate for defects', note: 'Discount deduction granted to compensate for flawed goods."
        }
      },
      "examples": [
        {
          "zh": "鉴于包装受损但不影响正常使用，经协商卖方同意给予5%的货款折让。",
          "pinyin": "Jiànyú bāozhuāng shòusǔn dàn bù yǐngxiǎng zhèngcháng shǐyòng, jīng xiéshāng màifāng tóngyì jǐyǔ bǎifēnzhī wǔ de huòkuǎn zhéràng.",
          "translations": {
            "vi": "Xét thấy bao bì bị hư hại nhưng không ảnh hưởng tới việc sử dụng bình thường, qua thương lượng bên bán đồng ý giảm giá bồi thường 5% tiền hàng.",
            "ja": "外装破損はあるものの使用に支障がないため、協議の上売主が5%の値引き補償を行うことで合意しました。",
            "en": "Since packaging damage did not impair functionality, the seller agreed to a 5% price allowance."
          }
        }
      ],
      "businessTip": {
        "vi": "Giải pháp này tiết kiệm hơn nhiều so với việc vận chuyển hàng ngược về nước để sửa.",
        "ja": "国際輸送での返送コストを回避するための現実的な実務的解決策です。",
        "en": "A cost-effective remedy far preferable to cross-border return freight expenses."
      }
    },
    {
      "id": "bc_after_009",
      "term": "返修",
      "pinyin": "fǎnxiū",
      "partOfSpeech": "verb",
      "category": "aftersales",
      "level": "intermediate",
      "tags": [
        "rework",
        "repair",
        "maintenance"
      ],
      "translations": {
        "vi": {
          "meaning": "Trả về xưởng để sửa chữa / Gia công lại (Rework)', note: 'Đưa sản phẩm khuyết tật quay lại dây chuyền sửa chữa phục hồi."
        },
        "ja": {
          "meaning": "手直し修理する / 再加工する（Rework）', note: '不良箇所を修正するため工場へ戻して再加工すること。"
        },
        "en": {
          "meaning": "to rework / return for repair', note: 'Returning defective items to the production line for reconditioning."
        }
      },
      "examples": [
        {
          "zh": "未通过通电测试的主板已全部退回生产车间安排紧急返修。",
          "pinyin": "Wèi tōngguò tōngdiàn cèshì de zhǔbǎn yǐ quánbù tuìhuí shēngchǎn chējiān ānpái jǐnjí fǎnxiū.",
          "translations": {
            "vi": "Những bo mạch chủ không vượt qua bài kiểm tra bật nguồn đã được trả toàn bộ về phân xưởng để sửa chữa khẩn cấp.",
            "ja": "通電検査不合格のマザーボードは、すべて製造ラインへ緊急手直し修理として戻されました。",
            "en": "Motherboards failing power-on testing were returned to the shop floor for expedited rework."
          }
        }
      ],
      "businessTip": {
        "vi": "Tỷ lệ hàng phải đưa đi sửa chữa lại gọi là \"返修率\" (fǎnxiū lǜ - rework rate).",
        "ja": "手直し修理率は「返修率」と称されます。",
        "en": "The proportion of units requiring factory reconditioning is the 返修率."
      }
    },
    {
      "id": "bc_after_010",
      "term": "补发",
      "pinyin": "bǔfā",
      "partOfSpeech": "verb",
      "category": "aftersales",
      "level": "beginner",
      "tags": [
        "replacement",
        "dispatch",
        "reship"
      ],
      "translations": {
        "vi": {
          "meaning": "Gửi bù hàng thiếu hoặc hỏng', note: 'Gửi bổ sung các sản phẩm bị thiếu hoặc đã hỏng bằng chuyến hàng tiếp theo."
        },
        "ja": {
          "meaning": "追加送付する / 欠品補充出荷する', note: '数量不足や不良交換分を無償で再送すること。"
        },
        "en": {
          "meaning": "to send replacement / dispatch replenishment', note: 'Shipping substitute items to make up for shortfalls or damage."
        }
      },
      "examples": [
        {
          "zh": "对于开箱短缺的20件配件，我司将于明日安排顺丰空运免费补发。",
          "pinyin": "Duìyú kāixiāng duǎnquē de èrshí jiàn pèijiàn, wǒsī jiāng yú míngrì ānpái Shùnfēng kōngyùn miǎnfèi bǔfā.",
          "translations": {
            "vi": "Đối với 20 phụ kiện bị thiếu khi mở thùng, công ty chúng tôi ngày mai sẽ bố trí gửi bù miễn phí qua đường bay SF Express.",
            "ja": "開梱時に不足していた付属品20個につきましては、明日SFエクスプレス航空便にて無償追加発送いたします。",
            "en": "For the 20 missing accessories, our team will dispatch free replacements via SF Air tomorrow."
          }
        }
      ],
      "businessTip": {
        "vi": "Khách hàng rất đánh giá cao phản xạ \"免费补发\" (miễn phí gửi bù khẩn) khi phát sinh thiếu sót.",
        "ja": "速やかな無償再送（免费补发）は顧客ロイヤルティを強固にする最善の対応です。",
        "en": "Prompt complimentary replenishment dispatch (\"免费补发\") preserves customer goodwill."
      }
    },
    {
      "id": "bc_after_011",
      "term": "争议",
      "pinyin": "zhēngyì",
      "partOfSpeech": "noun",
      "category": "aftersales",
      "level": "intermediate",
      "tags": [
        "dispute",
        "conflict",
        "legal"
      ],
      "translations": {
        "vi": {
          "meaning": "Tranh chấp thương mại / Bất đồng', note: 'Xung đột lợi ích hoặc bất đồng quan điểm trong quá trình thực hiện hợp đồng."
        },
        "ja": {
          "meaning": "紛争 / 意見の対立（Dispute）', note: '契約解釈や品質責任を巡る当事者間の争い。"
        },
        "en": {
          "meaning": "commercial dispute / controversy', note: 'Conflict or disagreement between contracting parties."
        }
      },
      "examples": [
        {
          "zh": "在诉诸法律之前，双方应秉持友好协商的原则尽力化解争议。",
          "pinyin": "Zài sùzhū fǎlǜ zhīqián, shuāngfāng yīng bǐngchí yǒuhǎo xiéshāng de yuánzé jìnlì huàjiě zhēngyì.",
          "translations": {
            "vi": "Trước khi đưa nhau ra pháp luật, đôi bên nên giữ vững nguyên tắc đàm phán hữu nghị để nỗ lực hóa giải tranh chấp.",
            "ja": "法的手続きに訴える前に、双方は友好的協議の精神に基づき紛争解決に尽力すべきです。",
            "en": "Prior to invoking legal proceedings, parties should endeavor to resolve disputes via amicable negotiations."
          }
        }
      ],
      "businessTip": {
        "vi": "Nguyên tắc hàng đầu trong ngoại thương: \"友好协商解决\" (Giải quyết thông qua đàm phán hữu nghị).",
        "ja": "「友好协商（友好的協議）」は契約書の紛争解決条項における基本前提です。",
        "en": "\"友好协商\" (amicable consultation) is the primary contractual avenue before litigation."
      }
    },
    {
      "id": "bc_after_012",
      "term": "和解协议",
      "pinyin": "héjiě xiéyì",
      "partOfSpeech": "noun",
      "category": "aftersales",
      "level": "advanced",
      "tags": [
        "settlement",
        "agreement",
        "legal"
      ],
      "translations": {
        "vi": {
          "meaning": "Thỏa thuận hòa giải / Thỏa thuận giải quyết tranh chấp (Settlement Agreement)', note: 'Văn bản thỏa thuận chấm dứt tranh chấp, xác nhận số tiền bồi thường cuối cùng."
        },
        "ja": {
          "meaning": "和解合意書（Settlement Agreement）', note: '紛争終結と賠償条件を正式に確認する合意文書。"
        },
        "en": {
          "meaning": "Settlement Agreement', note: 'Formal accord terminating claims and confirming final compromises."
        }
      },
      "examples": [
        {
          "zh": "双方正式签署了和解协议，约定卖方赔偿一万美元后双方免除一切后续责任。",
          "pinyin": "Shuāngfāng zhèngshì qiānshǔ le héjiě xiéyì, yuēdìng màifāng péicháng yī wàn Měiyuán hòu shuāngfāng miǎnchú yīqiè hòuxù zérèn.",
          "translations": {
            "vi": "Hai bên đã chính thức ký kết thỏa thuận hòa giải, quy định sau khi bên bán bồi thường 10.000 USD thì đôi bên miễn trừ toàn bộ trách nhiệm về sau.",
            "ja": "双方は和解合意書に調印し、売主が1万ドルを支払うことで今後の全請求権を放棄することに合意しました。",
            "en": "Both parties executed a settlement agreement stipulating that a $10,000 compensation releases all liabilities."
          }
        }
      ],
      "businessTip": {
        "vi": "Ký thỏa thuận hòa giải giúp doanh nghiệp chấm dứt hoàn toàn nguy cơ kiện tụng kéo dài.",
        "ja": "和解合意書の締結により、将来にわたる訴訟リスクを完全に遮断できます。",
        "en": "A signed settlement agreement completely extinguishes future litigation exposure."
      }
    },
    {
      "id": "bc_scen_003",
      "term": "接风洗尘",
      "pinyin": "jiēfēng xǐchén",
      "partOfSpeech": "phrase",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "hospitality",
        "idiom",
        "banquet"
      ],
      "translations": {
        "vi": {
          "meaning": "Tẩy trần đón khách / Tiệc cơm đón mừng khách phương xa đến', note: 'Thành ngữ chỉ việc chủ nhà mở tiệc đãi khách đường xa mới tới để giải tỏa mệt nhọc."
        },
        "ja": {
          "meaning": "長旅の労をねぎらう歓迎の宴を催す', note: '遠方からの来客をもてなす伝統的な歓迎の宴席。"
        },
        "en": {
          "meaning": "to host a welcome dinner for arriving guests', note: 'Traditional idiom for feasting guests to wash away the dust of travel."
        }
      },
      "examples": [
        {
          "zh": "今晚董事长特意在迎宾馆设宴，为远道而来的越南代表团接风洗尘。",
          "pinyin": "Jīnwǎn dǒngshìzhǎng tèyì zài yíngbīnguǎn shèyàn, wèi yuǎndào'érlái de Yuènán dàibiǎotuán jiēfēng xǐchén.",
          "translations": {
            "vi": "Tối nay Chủ tịch đặc biệt mở tiệc tại nhà khách để tẩy trần đón chào đoàn đại biểu Việt Nam lặn lội đường xa tới thăm.",
            "ja": "今夜、会長自ら迎賓館にて宴席を設け、はるばる訪中されたベトナム代表団を歓迎いたします。",
            "en": "Tonight our Chairman is hosting a banquet at the guest house to welcome the visiting Vietnamese delegation."
          }
        }
      ],
      "businessTip": {
        "vi": "Một thành ngữ kinh điển thể hiện lòng hiếu khách phương Đông rất được người Trung Quốc ưa chuộng.",
        "ja": "中国ビジネスにおける最高級のもてなしの意を表す伝統的四字熟語です。",
        "en": "A quintessential traditional Chinese hospitality idiom demonstrating cordial warmth."
      }
    },
    {
      "id": "bc_scen_004",
      "term": "宾至如归",
      "pinyin": "bīn zhì rú guī",
      "partOfSpeech": "phrase",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "hospitality",
        "idiom",
        "welcome"
      ],
      "translations": {
        "vi": {
          "meaning": "Khách đến như về nhà / Đón tiếp chu đáo ấm áp', note: 'Khen ngợi sự tiếp đón ân cần, niềm nở khiến khách cảm thấy thoải mái như ở nhà mình."
        },
        "ja": {
          "meaning": "客が自宅にいるかのようにくつろげる手厚いもてなし', note: '心のこもった素晴らしい接遇を称える賛辞。"
        },
        "en": {
          "meaning": "guests feel at home / consummate hospitality', note: 'Idiom praising hospitality so warm that guests feel at home."
        }
      },
      "examples": [
        {
          "zh": "贵司周到的接待安排让我们一行人真正感受到了宾至如归。",
          "pinyin": "Guìsī zhōudào de jiēdài ānpái ràng wǒmen yīxíngrén zhēnzhèng gǎnshòudào le bīn zhì rú guī.",
          "translations": {
            "vi": "Sự sắp xếp tiếp đón chu đáo của quý công ty khiến cả đoàn chúng tôi thực sự cảm thấy ấm áp như được trở về nhà mình.",
            "ja": "貴社の行き届いたご案内により、私ども一行はまさに我が家にいるかのような寛ぎを感じました。",
            "en": "Your considerate hospitality truly made our visiting delegation feel at home."
          }
        }
      ],
      "businessTip": {
        "vi": "Dùng câu này để cảm ơn chủ nhà khi kết thúc chuyến công tác sẽ ghi điểm lịch thiệp tối đa.",
        "ja": "視察や訪問の御礼スピーチで用いると極めて洗練された印象を与えます。",
        "en": "Using this idiom in your closing thank-you speech creates an exceptionally polished impression."
      }
    },
    {
      "id": "bc_scen_005",
      "term": "互利共赢",
      "pinyin": "hùlì gòngyíng",
      "partOfSpeech": "phrase",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "win-win",
        "partnership",
        "idiom"
      ],
      "translations": {
        "vi": {
          "meaning": "Đôi bên cùng có lợi / Cùng thắng lợi (Win-Win)', note: 'Phương châm hợp tác bình đẳng, cùng phát triển giữa các doanh nghiệp."
        },
        "ja": {
          "meaning": "相互利益と共栄 / ウィンウィン（Win-Win）', note: '双方が利益を享受し持続的に発展する関係性。"
        },
        "en": {
          "meaning": "mutual benefit and win-win outcome', note: 'Standard commercial philosophy of reciprocal prosperity."
        }
      },
      "examples": [
        {
          "zh": "我们坚信只有秉承互利共赢的原则，双方的经贸合作才能行稳致远。",
          "pinyin": "Wǒmen jiānxìn zhǐyǒu bǐngchéng hùlì gòngyíng de yuánzé, shuāngfāng de jīngmào hézuò cáinéng xíngwěnzhìyuǎn.",
          "translations": {
            "vi": "Chúng tôi tin tưởng sâu sắc rằng chỉ khi dựa trên nguyên tắc đôi bên cùng có lợi thì sự hợp tác kinh tế thương mại hai bên mới có thể bền vững lâu dài.",
            "ja": "相互利益・共栄の精神を貫くことによってのみ、両国の経済協力は持続的な発展を遂げられると信じております。",
            "en": "We firmly believe that adhering to mutual benefit and win-win outcomes is essential for enduring economic partnership."
          }
        }
      ],
      "businessTip": {
        "vi": "Cụm từ cửa miệng trong các bài phát biểu ký kết và chúc rượu tại Trung Quốc.",
        "ja": "調印式スピーチや乾杯挨拶で必ずと言ってよいほど登場する合言葉です。",
        "en": "The signature buzzword at contract signing ceremonies and partnership summits."
      }
    },
    {
      "id": "bc_scen_006",
      "term": "深入交流",
      "pinyin": "shēnrù jiāoliú",
      "partOfSpeech": "phrase",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "discussion",
        "meeting",
        "collaboration"
      ],
      "translations": {
        "vi": {
          "meaning": "Trao đổi sâu rộng / Giao lưu kỹ lưỡng', note: 'Bàn bạc thấu đáo mọi chi tiết chuyên môn với đối tác."
        },
        "ja": {
          "meaning": "突っ込んだ意見交換 / 深層対話', note: '表面的な挨拶を超えて具体的に踏み込んだ討議を行うこと。"
        },
        "en": {
          "meaning": "in-depth exchanges / comprehensive discussions', note: 'Substantive deep-dive technical or commercial dialogues."
        }
      },
      "examples": [
        {
          "zh": "双方技术团队就下一代产品的规格标准进行了长达三小时的深入交流。",
          "pinyin": "Shuāngfāng jìshù tuánduì jiù xià yī dài chǎnpǐn de guīgé biāozhǔn jìnxíng le cháng dá sān xiǎoshí de shēnrù jiāoliú.",
          "translations": {
            "vi": "Đội ngũ kỹ thuật hai bên đã có cuộc trao đổi sâu rộng kéo dài tới 3 tiếng đồng hồ về tiêu chuẩn quy cách sản phẩm thế hệ tiếp theo.",
            "ja": "双方の技術チームは次世代製品の仕様基準について3時間にわたり深く意見を交換しました。",
            "en": "The engineering teams engaged in 3 hours of in-depth technical discussions on next-gen product standards."
          }
        }
      ],
      "businessTip": {
        "vi": "Dùng khi miêu tả các buổi làm việc chuyên sâu đạt nhiều thành quả thực chất.",
        "ja": "実質的で有意義な会議が行われたことを公式発表する際の常套表現です。",
        "en": "Signifies substantive, productive technical workshops."
      }
    },
    {
      "id": "bc_scen_007",
      "term": "实地考察",
      "pinyin": "shídì kǎochá",
      "partOfSpeech": "verb",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "factory-audit",
        "inspection",
        "visit"
      ],
      "translations": {
        "vi": {
          "meaning": "Khảo sát thực địa / Đi thị sát nhà máy tận nơi (Factory Audit)', note: 'Đến tận công xưởng trực tiếp kiểm tra dây chuyền sản xuất và cơ sở vật chất."
        },
        "ja": {
          "meaning": "現地視察する / 工場監査を行う（Factory Audit）', note: '生産現場へ直接赴き設備や製造体制を実地で検分すること。"
        },
        "en": {
          "meaning": "to conduct an on-site inspection / factory audit', note: 'Directly inspecting manufacturing plants and operational capabilities."
        }
      },
      "examples": [
        {
          "zh": "在正式下单前，我们特派质控专家前往东莞工厂进行实地考察。",
          "pinyin": "Zài zhèngshì xiàdān qián, wǒmen tèpài zhìkòng zhuānjiā qiánwǎng Dōngguǎn gōngchǎng jìnxíng shídì kǎochá.",
          "translations": {
            "vi": "Trước khi chính thức lên đơn, chúng tôi đã cử chuyên gia kiểm soát chất lượng đến nhà máy ở Đông Quản để khảo sát thực địa.",
            "ja": "正式発注に先立ち、品質管理スペシャリストを東莞の提携工場へ派遣し現地視察を実施しました。",
            "en": "Before placing orders, we dispatched QA specialists to Dongguan to conduct an on-site factory audit."
          }
        }
      ],
      "businessTip": {
        "vi": "Khảo sát xưởng thực tế (验厂 - yànchǎng) là khâu sống còn để loại bỏ các công ty thương mại đóng giả làm nhà máy.",
        "ja": "実地視察（验厂）はブローカーや仲介業者の虚偽申告を見抜くための必須ステップです。",
        "en": "On-site factory audits are essential to filter out paper trading intermediaries pretending to be factories."
      }
    },
    {
      "id": "bc_scen_008",
      "term": "签署",
      "pinyin": "qiānshǔ",
      "partOfSpeech": "verb",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "sign",
        "contract",
        "formal"
      ],
      "translations": {
        "vi": {
          "meaning": "Ký kết chính thức', note: 'Đặt bút ký văn bản hợp đồng hoặc hiệp định pháp lý."
        },
        "ja": {
          "meaning": "署名・調印する（締結する）', note: '契約書や公式合意文書に正式にサインすること。"
        },
        "en": {
          "meaning": "to execute / formally sign', note: 'Affixing signatures to binding legal instruments."
        }
      },
      "examples": [
        {
          "zh": "在两国行业领袖的见证下，双方代表正式签署了战略合作协议。",
          "pinyin": "Zài liǎng guó hángyè lǐngxiù de jiànzhèng xià, shuāngfāng dàibiǎo zhèngshì qiānshǔ le zhànlüè hézuò xiéyì.",
          "translations": {
            "vi": "Dưới sự chứng kiến của các lãnh đạo ngành hai nước, đại diện hai bên đã chính thức ký kết thỏa thuận hợp tác chiến lược.",
            "ja": "両国の業界リーダーが見守る中、双方の代表者が戦略的提携合意書に正式に調印しました。",
            "en": "Witnessed by industry leaders, representatives formally executed the strategic partnership agreement."
          }
        }
      ],
      "businessTip": {
        "vi": "Ký hợp đồng trang trọng gọi là \"签署合同\", cao hơn từ thông thường \"签合同\".",
        "ja": "公式な文脈では口語の「签合同」ではなく「签署合同（調印）」を用います。",
        "en": "Formal ceremonies use 签署合同 rather than informal 签合同."
      }
    },
    {
      "id": "bc_scen_009",
      "term": "见证",
      "pinyin": "jiànzhèng",
      "partOfSpeech": "verb",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "witness",
        "ceremony",
        "attest"
      ],
      "translations": {
        "vi": {
          "meaning": "Chứng kiến / Làm chứng', note: 'Có mặt để xác nhận khoảnh khắc lịch sử hoặc lễ ký kết hợp tác quan trọng."
        },
        "ja": {
          "meaning": "立ち会う / 見届ける / 証人となる', note: '調印や重要な節目に同席して証明すること。"
        },
        "en": {
          "meaning": "to witness / attest', note: 'Serving as an official witness to signing ceremonies."
        }
      },
      "examples": [
        {
          "zh": "非常荣幸能与各位领导共同见证这一具有里程碑意义的重要时刻。",
          "pinyin": "Fēicháng róngxìng néng yǔ gèwèi lǐngdǎo gòngtóng jiànzhèng zhè yī jùyǒu lǐchéngbēi yìyì de zhòngyào shíkè.",
          "translations": {
            "vi": "Vô cùng vinh hạnh khi được cùng các vị lãnh đạo chứng kiến khoảnh khắc trọng đại mang ý nghĩa cột mốc lịch sử này.",
            "ja": "幹部の皆様とともに、このマイルストーンとなる記念すべき瞬間を見届けることができ大変光栄です。",
            "en": "We are deeply honored to witness this milestone historic occasion alongside distinguished leaders."
          }
        }
      ],
      "businessTip": {
        "vi": "Người chứng kiến trên hợp đồng ký tên ở mục \"见证人\" (Witness).",
        "ja": "契約書の立会人署名欄は「见证人」と表記されます。",
        "en": "Official agreement witness sign-off blocks are labeled 见证人."
      }
    },
    {
      "id": "bc_scen_010",
      "term": "敬酒",
      "pinyin": "jìngjiǔ",
      "partOfSpeech": "verb",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "toast",
        "etiquette",
        "banquet"
      ],
      "translations": {
        "vi": {
          "meaning": "Chúc rượu / Mời rượu kính cẩn', note: 'Nâng ly chúc mừng lãnh đạo, khách quý trên bàn tiệc theo đúng nghi lễ."
        },
        "ja": {
          "meaning": "お酒を勧める / 乾杯を捧げる（敬杯）', note: '目上の人や主賓に敬意を込めて杯を捧げる作法。"
        },
        "en": {
          "meaning": "to propose a toast / offer a drink respectfully', note: 'Respectfully offering toasts to honored guests at banquets."
        }
      },
      "examples": [
        {
          "zh": "在宴席上向长辈或领导敬酒时，双手持杯且杯沿略低表示谦逊。",
          "pinyin": "Zài yànxí shàng xiàng zhǎngbèi huò lǐngdǎo jìngjiǔ shí, shuāngshǒu chí bēi qiě bēiyán lüè dī biǎoshì qiānxùn.",
          "translations": {
            "vi": "Trên bàn tiệc khi chúc rượu bậc trưởng bối hoặc sếp, hai tay nâng ly và miệng ly hơi thấp hơn một chút thể hiện sự khiêm nhường.",
            "ja": "宴席で目上の方に乾杯を捧げる際は、両手でグラスを持ち、相手よりグラスの縁をわずかに下げるのが礼儀です。",
            "en": "When toasting superiors at banquets, holding your glass with both hands with its rim slightly lower shows modesty."
          }
        }
      ],
      "businessTip": {
        "vi": "Quy tắc vàng của bàn tiệc Trung Quốc: luôn chúc rượu theo thứ bậc từ người chức vụ cao nhất.",
        "ja": "最も役職の高い主賓から順番に敬酒するのが酒席の鉄則です。",
        "en": "Always initiate toasts sequentially starting with the highest-ranking principal."
      }
    },
    {
      "id": "bc_scen_011",
      "term": "干杯",
      "pinyin": "gānbēi",
      "partOfSpeech": "phrase",
      "category": "scenarios",
      "level": "beginner",
      "tags": [
        "cheers",
        "bottoms-up",
        "banquet"
      ],
      "translations": {
        "vi": {
          "meaning": "Cạn ly / Uống cạn 100% (Cheers)', note: 'Uống hết sạch ly rượu để biểu thị sự nhiệt tình hào sảng."
        },
        "ja": {
          "meaning": "乾杯（飲み干す） / カンパイ', note: '中国では本来「杯を干す（一気に飲み干す）」ことを意味します。"
        },
        "en": {
          "meaning": "Cheers / Bottoms up', note: 'Literally to dry the cup; drinking the entire glass in celebration."
        }
      },
      "examples": [
        {
          "zh": "为了我们两家公司的深厚友谊与广阔未来，大家干杯！",
          "pinyin": "Wèile wǒmen liǎng jiā gōngsī de shēnhòu yǒuyì yǔ guǎngkuò wèilái, dàjiā gānbēi!",
          "translations": {
            "vi": "Vì tình hữu nghị sâu đậm và tương lai rộng mở của hai công ty chúng ta, xin mời tất cả cạn ly!",
            "ja": "両社の深き友情と輝かしい未来のために、皆様、乾杯！",
            "en": "To the enduring friendship and prosperous future of both our companies, cheers!"
          }
        }
      ],
      "businessTip": {
        "vi": "Nếu không uống được nhiều, sau khi nói \"干杯\", hãy lịch sự nói thêm: \"我酒量有限，我随意，您也随意\" (Tửu lượng em có hạn, em xin phép nhấp môi, sếp cũng tùy ý nhé).",
        "ja": "飲めない場合は「我随意（少し口をつけるだけにします）」と事前に断れば失礼になりません。",
        "en": "If unable to finish alcohol, politely state \"我随意\" to sip moderately without offense."
      }
    },
    {
      "id": "bc_scen_012",
      "term": "诚意",
      "pinyin": "chéngyì",
      "partOfSpeech": "noun",
      "category": "scenarios",
      "level": "intermediate",
      "tags": [
        "sincerity",
        "good-faith",
        "attitude"
      ],
      "translations": {
        "vi": {
          "meaning": "Thành ý / Thiện chí chân thành', note: 'Sự chân thật, nghiêm túc và giữ chữ tín trong hợp tác kinh doanh."
        },
        "ja": {
          "meaning": "誠意 / 誠実な気持ち', note: '取引における誠意や真摯な姿勢。"
        },
        "en": {
          "meaning": "sincerity / good faith', note: 'Genuine good faith and seriousness in commercial dealings."
        }
      },
      "examples": [
        {
          "zh": "我们主动降低首单起订量，正是为了向贵司表达最大的合作诚意。",
          "pinyin": "Wǒmen zhǔdòng jiàngdī shǒudān qǐdìngliàng, zhèng shì wèile xiàng guìsī biǎodá zuìdà de hézuò chéngyì.",
          "translations": {
            "vi": "Chúng tôi chủ động hạ số lượng đặt tối thiểu đơn đầu chính là để bày tỏ thành ý hợp tác cao nhất đối với quý công ty.",
            "ja": "初回MOQを自発的に引き下げましたのは、貴社に対する最大限の提携の誠意を示すためでございます。",
            "en": "Proactively lowering our trial MOQ demonstrates our sincere good faith in collaborating with you."
          }
        }
      ],
      "businessTip": {
        "vi": "\"拿出诚意\" (đưa ra thành ý) là cách nói thúc đẩy nhượng bộ khi đàm phán hợp đồng.",
        "ja": "「拿出诚意（誠意を示す）」は膠着した交渉を打開するキーワードです。",
        "en": "\"拿出诚意\" (show tangible sincerity) is frequently invoked to break negotiation impasses."
      }
    }
  ],
  "emailTemplates": [
    {
      "id": "email_001_intro",
      "category": "emails",
      "subject": {
        "zh": "【业务合作】[MyCompanyName] 向贵司致意并附上最新产品目录",
        "vi": "【Hợp tác kinh doanh】[MyCompanyName] kính gửi quý công ty và gửi kèm danh mục sản phẩm mới nhất",
        "ja": "【業務提携のご提案】[MyCompanyName]より最新製品カタログ送付のご案内",
        "en": "Business Cooperation: Introduction & Product Catalog from [MyCompanyName]"
      },
      "recipientType": {
        "zh": "潜在合作伙伴 / 采购总监",
        "vi": "Đối tác tiềm năng / Giám đốc mua hàng",
        "ja": "見込みパートナー / 調達部門ご担当者様",
        "en": "Prospective Partner / Purchasing Director"
      },
      "purpose": {
        "zh": "首次向潜在海外客户自我介绍，展示核心制造能力并提供产品目录。",
        "vi": "Giới thiệu năng lực công ty lần đầu tới đối tác nước ngoài và gửi đính kèm catalogue.",
        "ja": "海外見込み客への初回アプローチ。強みをアピールしカタログを提供。",
        "en": "First-time corporate introduction showcasing manufacturing strengths and catalog."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên người nhận",
            "en": "Recipient Name",
            "ja": "ご担当者名"
          },
          "example": "张经理 (Mr. Zhang)"
        },
        {
          "key": "ClientCompany",
          "label": {
            "vi": "Tên công ty đối tác",
            "en": "Partner Company",
            "ja": "相手先企業名"
          },
          "example": "ABC Trading Co., Ltd."
        },
        {
          "key": "MyCompanyName",
          "label": {
            "vi": "Tên công ty của bạn",
            "en": "Your Company",
            "ja": "貴社名"
          },
          "example": "Hai Phong Electronics JSC"
        },
        {
          "key": "ProductCategory",
          "label": {
            "vi": "Loại sản phẩm chính",
            "en": "Product Line",
            "ja": "主力製品分野"
          },
          "example": "智能穿戴与蓝牙配件 (Smart Wearables & Audio)"
        }
      ],
      "keyPhrases": [
        {
          "zh": "不胜感激",
          "pinyin": "búshèng gǎnjī",
          "translations": {
            "vi": "vô cùng cảm kích / biết ơn",
            "ja": "大変感謝申し上げます",
            "en": "deeply grateful"
          }
        },
        {
          "zh": "主营业务",
          "pinyin": "zhǔyíng yèwù",
          "translations": {
            "vi": "ngành nghề kinh doanh cốt lõi",
            "ja": "主力事業・主要業務",
            "en": "core business"
          }
        },
        {
          "zh": "顺祝商祺",
          "pinyin": "shùn zhù shāng qí",
          "translations": {
            "vi": "kính chúc việc kinh doanh phát đạt",
            "ja": "貴社の発展をお祈り申し上げます",
            "en": "Best business regards"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！见信吉祥！\n\n我司 [MyCompanyName] 是越南领先的 [ProductCategory] 生产制造企业，专注于为全球买家提供高性价比的OEM及ODM代工服务。得知贵司 [ClientCompany] 在该领域享有盛誉，我们非常期待能有机会为您提供优质的供应链支持。\n\n附件中附有我司的最新产品画册及主要技术参数，敬请查收。如果您对其中任何型号感兴趣，或者有定制化需求，请随时告知，我们将在24小时内为您核算最优惠的报价与样品安排。\n\n顺祝商祺！\n\n[MyCompanyName] 国际业务部\n联系电话：[MyPhone]\n官方网址：[MyWebsite]",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nXin chào ông/bà! Chúc ông/bà mọi sự tốt lành!\n\nCông ty chúng tôi [MyCompanyName] là doanh nghiệp sản xuất [ProductCategory] hàng đầu tại Việt Nam, chuyên cung cấp dịch vụ gia công OEM và ODM hiệu quả cao cho khách hàng quốc tế. Được biết quý công ty [ClientCompany] có uy tín lớn trong ngành, chúng tôi rất hy vọng có cơ hội được hỗ trợ chuỗi cung ứng cho quý vị.\n\nTrong tệp đính kèm là catalogue mới nhất và thông số kỹ thuật của chúng tôi, xin vui lòng xem qua. Nếu quý khách quan tâm đến bất kỳ model nào hoặc có nhu cầu tùy biến, xin hãy cho chúng tôi biết; chúng tôi sẽ gửi báo giá tốt nhất và sắp xếp mẫu thử trong vòng 24 giờ.\n\nKính chúc kinh doanh phát đạt!\n\nPhòng Kinh doanh Quốc tế - [MyCompanyName]",
          "ja": "拝啓　[ClientName] 様\n\n平素は格別のご高配を賜り、厚く御礼申し上げます。\n\n当社 [MyCompanyName] はベトナムにおいて [ProductCategory] の製造に特化し、世界各国へOEM/ODM供給を行っているメーカーでございます。貴社 [ClientCompany] の業界における高い評判を拝見し、サプライチェーンの一助としてお役に立てればと存じ、ご連絡申し上げました。\n\n添付にて最新の製品カタログおよび主要スペック表をお送りいたしますので、ご査収いただけますと幸いです。ご関心のある製品や特注仕様のご相談がございましたら、24時間以内にお見積りとサンプル手配をご案内申し上げます。\n\n貴社のますますのご発展を心よりお祈り申し上げます。\n\n[MyCompanyName] 国際事業部",
          "en": "Dear [ClientName],\n\nGreetings!\n\nOur company, [MyCompanyName], is a premier manufacturer in Vietnam specializing in [ProductCategory], offering OEM and ODM manufacturing services to international clients. Knowing [ClientCompany]'s outstanding reputation in the market, we would welcome the opportunity to support your supply chain.\n\nPlease find attached our latest product catalog and technical specifications. Should you be interested in any models or have custom requirements, please let us know. We will be glad to provide competitive pricing and samples within 24 hours.\n\nBest regards,\n\nInternational Sales Department\n[MyCompanyName]"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n\n我是 [MyCompanyName] 的业务代表。我们主营 [ProductCategory] 的OEM制造，附上最新产品目录供贵司参考。如有任何样品需求或询价，欢迎随时联系！\n\n祝好！\n[MyCompanyName]",
        "translations": {
          "vi": "Chào [ClientName], tôi là đại diện kinh doanh của [MyCompanyName]. Chúng tôi chuyên sản xuất OEM [ProductCategory], xin gửi kèm catalogue sản phẩm để quý công ty tham khảo. Nếu có nhu cầu gửi mẫu hay hỏi giá, rất mong nhận được liên hệ của bạn! Chúc một ngày tốt lành!",
          "ja": "[ClientName] 様、[MyCompanyName] 営業担当でございます。当社は [ProductCategory] のOEM製造を手掛けており、最新カタログを添付いたしました。お見積りやサンプルのご要望がございましたらお気軽にご連絡ください。",
          "en": "Hello [ClientName], I represent [MyCompanyName]. We specialize in OEM production of [ProductCategory]. Attached is our latest catalog for your reference. Feel free to contact us for pricing or samples!"
        }
      }
    },
    {
      "id": "email_002_inquiry",
      "category": "emails",
      "subject": {
        "zh": "【询价】关于产品 [ProductCode] 的报价与最小起订量咨询 - [MyCompanyName]",
        "vi": "【Hỏi giá】Yêu cầu báo giá và MOQ cho sản phẩm [ProductCode] - [MyCompanyName]",
        "ja": "【価格照会】製品 [ProductCode] のお見積りおよび最小ロット（MOQ）について",
        "en": "Inquiry: Price Quote and MOQ for Product [ProductCode] - [MyCompanyName]"
      },
      "recipientType": {
        "zh": "供应商外贸销售团队",
        "vi": "Đội ngũ bán hàng xuất khẩu của nhà cung cấp",
        "ja": "サプライヤー輸出営業部",
        "en": "Supplier Export Sales Department"
      },
      "purpose": {
        "zh": "向中国工厂询问特定产品的FOB/CIF价格、包装规格、交期及MOQ。",
        "vi": "Hỏi nhà máy Trung Quốc về giá FOB/CIF, quy cách đóng gói, tiến độ và MOQ.",
        "ja": "中国メーカーへ特定品番の見積、包装仕様、納期、MOQを照会。",
        "en": "Inquiring supplier for FOB/CIF quotes, packaging, lead times, and MOQ."
      },
      "placeholders": [
        {
          "key": "SupplierContact",
          "label": {
            "vi": "Người liên hệ bên bán",
            "en": "Supplier Sales Rep",
            "ja": "仕入れ先担当者"
          },
          "example": "李经理 (Mr. Li)"
        },
        {
          "key": "ProductCode",
          "label": {
            "vi": "Mã hoặc tên sản phẩm",
            "en": "Product Code / Name",
            "ja": "製品型番"
          },
          "example": "HL-8820 LED Light"
        },
        {
          "key": "TargetQuantity",
          "label": {
            "vi": "Số lượng dự kiến",
            "en": "Expected Quantity",
            "ja": "予定発注数量"
          },
          "example": "5,000 pcs"
        },
        {
          "key": "DestPort",
          "label": {
            "vi": "Cảng đích",
            "en": "Destination Port",
            "ja": "仕向港"
          },
          "example": "Hai Phong / Cat Lai Port"
        }
      ],
      "keyPhrases": [
        {
          "zh": "最低起订量",
          "pinyin": "zuìdī qǐdìng liàng",
          "translations": {
            "vi": "số lượng đặt tối thiểu (MOQ)",
            "ja": "最小ロット（MOQ）",
            "en": "Minimum Order Quantity"
          }
        },
        {
          "zh": "交货期",
          "pinyin": "jiāohuò qī",
          "translations": {
            "vi": "thời hạn giao hàng (lead time)",
            "ja": "納期 / リードタイム",
            "en": "delivery lead time"
          }
        },
        {
          "zh": "有效期限",
          "pinyin": "yǒuxiào qīxiàn",
          "translations": {
            "vi": "thời hạn hiệu lực của báo giá",
            "ja": "見積有効期限",
            "en": "validity period"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [SupplierContact]：\n\n您好！\n\n我们在贵司官网上关注到 [ProductCode] 这款产品，其设计与市场定位非常符合我们近期的采购计划。我们计划的首批采购量约为 [TargetQuantity]。\n\n为推进下一步评估，请协助提供以下信息：\n1. 基于 [TargetQuantity] 的 FOB 深圳/宁波美金含税单价；\n2. 若安排 CIF [DestPort] 海运，预计每件到岸价格；\n3. 该款产品的最低起订量（MOQ）以及包装规格（每箱装箱数、毛重、外箱尺寸）；\n4. 收到定金后的常规交货周期及打样时间；\n5. 该报价的有效期限。\n\n如能附上产品的高清图片与产品检测报告（CE/RoHS等），将不胜感激。期待您的尽快回复！\n\n顺祝商祺！\n\n[MyCompanyName] 采购部\n[MyName] 敬上",
        "translations": {
          "vi": "Kính gửi [SupplierContact],\n\nXin chào!\n\nChúng tôi nhận thấy sản phẩm [ProductCode] trên website của quý công ty rất phù hợp với kế hoạch thu mua sắp tới của chúng tôi. Dự kiến số lượng đặt đợt đầu vào khoảng [TargetQuantity].\n\nĐể tiến hành đánh giá bước tiếp theo, xin vui lòng cung cấp giúp:\n1. Đơn giá FOB Thâm Quyến/Ninh Ba (USD) dựa trên số lượng [TargetQuantity];\n2. Đơn giá CIF [DestPort] (đường biển);\n3. Số lượng đặt tối thiểu (MOQ) và quy cách đóng gói (số lượng/thùng, trọng lượng cả bì, kích thước thùng carton);\n4. Thời gian sản xuất tiêu chuẩn sau khi nhận cọc và thời gian làm mẫu;\n5. Thời hạn hiệu lực của bảng báo giá.\n\nNếu có thể gửi kèm ảnh chụp thực tế và chứng chỉ kiểm định (CE/RoHS), chúng tôi vô cùng cảm kích. Rất mong nhận được hồi âm sớm của quý bên!",
          "ja": "[SupplierContact] 様\n\n拝啓　貴社製品 [ProductCode] につきまして、当社の調達計画に非常に合致しており、初回来週発注として [TargetQuantity] を検討しております。\n\nつきましては、下記項目についてお見積りをご教示いただけますでしょうか。\n1. [TargetQuantity] 発注時のFOB深圳/寧波（米ドル）単価\n2. CIF [DestPort] での概算海上単価\n3. 本製品の最小ロット（MOQ）および梱包仕様（入数・総重量・外箱寸法）\n4. 手付金受領後の標準納期およびサンプル製作期間\n5. 本お見積書の有効期限\n\n実物画像および各種認証証明書（CE/RoHS等）も併せてご送付いただけますと幸甚に存じます。何卒よろしくお願い申し上げます。",
          "en": "Dear [SupplierContact],\n\nGreetings!\n\nWe reviewed product [ProductCode] on your website and find it highly suitable for our current purchasing plan. Our projected initial order volume is approximately [TargetQuantity].\n\nPlease provide the following details:\n1. FOB Shenzhen/Ningbo USD unit price for [TargetQuantity];\n2. Estimated CIF [DestPort] sea freight rate;\n3. Minimum Order Quantity (MOQ) and packaging specifications (units/carton, GW, carton CBM);\n4. Standard production lead time and sample preparation time upon deposit;\n5. Validity period of the quote.\n\nWe would also appreciate high-resolution photos and test certificates (CE/RoHS). Looking forward to your prompt response!"
        }
      },
      "bodyConcise": {
        "zh": "[SupplierContact] 您好：\n请问 [ProductCode] 订购 [TargetQuantity] 的 FOB 价格是多少？交期多久？MOQ 有何要求？期待您的报价单，谢谢！",
        "translations": {
          "vi": "Chào [SupplierContact], xin hỏi giá FOB của mã [ProductCode] cho số lượng [TargetQuantity] là bao nhiêu? Thời gian giao hàng bao lâu và MOQ yêu cầu thế nào? Mong sớm nhận được bảng báo giá của bạn!",
          "ja": "[SupplierContact] 様、[ProductCode] を [TargetQuantity] 発注する場合のFOB単価、納期、MOQをお知らせいただけますでしょうか。お見積りをお待ちしております。",
          "en": "Hi [SupplierContact], could you please share your FOB quote, lead time, and MOQ for [TargetQuantity] units of [ProductCode]? Thanks!"
        }
      }
    },
    {
      "id": "email_003_quotation",
      "category": "emails",
      "subject": {
        "zh": "【正式报价】关于 [ProductCategory] 的正式报价单及贸易条款 - [MyCompanyName]",
        "vi": "【Báo giá chính thức】Bảng báo giá và điều khoản thương mại cho [ProductCategory] - [MyCompanyName]",
        "ja": "【御見積送付】[ProductCategory] 正式御見積書のご案内 - [MyCompanyName]",
        "en": "Official Quotation: [ProductCategory] with Commercial Terms - [MyCompanyName]"
      },
      "recipientType": {
        "zh": "海外采购方",
        "vi": "Bên mua nước ngoài",
        "ja": "海外バイヤー",
        "en": "Overseas Buyer"
      },
      "purpose": {
        "zh": "回复客户询价，提供含价格、装箱量、交期及付款方式的正式报价单。",
        "vi": "Phản hồi yêu cầu hỏi giá của khách, gửi bảng báo giá kèm đầy đủ điều khoản.",
        "ja": "価格照会への回答として正式見積書を送付し、取引条件を明示。",
        "en": "Responding to inquiry with comprehensive pricing, packaging, and payment terms."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên khách hàng",
            "en": "Client Name",
            "ja": "顧客名"
          },
          "example": "Mr. David Smith"
        },
        {
          "key": "ProductCategory",
          "label": {
            "vi": "Tên danh mục hàng",
            "en": "Item Line",
            "ja": "品名"
          },
          "example": "Industrial Valves"
        },
        {
          "key": "ValidityDate",
          "label": {
            "vi": "Hạn chót của báo giá",
            "en": "Quote Expiry Date",
            "ja": "有効期限日"
          },
          "example": "2026年11月30日"
        }
      ],
      "keyPhrases": [
        {
          "zh": "形式发票",
          "pinyin": "xíngshì fāpiào",
          "translations": {
            "vi": "hóa đơn chiếu lệ (P/I)",
            "ja": "プロフォーマインボイス",
            "en": "Proforma Invoice"
          }
        },
        {
          "zh": "装箱明细",
          "pinyin": "zhuāngxiāng míngxì",
          "translations": {
            "vi": "chi tiết đóng thùng",
            "ja": "梱包明細",
            "en": "packing details"
          }
        },
        {
          "zh": "付款方式",
          "pinyin": "fùkuǎn fāngshì",
          "translations": {
            "vi": "phương thức thanh toán",
            "ja": "支払条件",
            "en": "payment terms"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n感谢您对我们 [ProductCategory] 系列产品的关注与询价！\n\n根据您提出的技术要求与采购数量，我们已为您核算出最具竞争力的报价。正式报价单请参见附件 PDF，主要商务条款汇总如下：\n\n1. 价格术语：FOB 上海（美元计价）；\n2. 付款方式：30% T/T 预付定金，70% 尾款见提单副本付清；\n3. 生产周期：定金到账并确认样品后 25 个工作日内交货；\n4. 包装方式：出口标准双瓦楞纸箱加托盘缠膜；\n5. 报价有效期：至 [ValidityDate] 止。\n\n如需调整参数或需安排寄送样品，我们非常乐意为您配合。期待能与贵司早日达成合作！\n\n顺祝商祺！\n\n[MyCompanyName] 销售总监",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nCảm ơn quý khách đã quan tâm và hỏi giá dòng sản phẩm [ProductCategory] của chúng tôi!\n\nDựa trên yêu cầu kỹ thuật và số lượng đặt hàng, chúng tôi đã tính toán mức giá cạnh tranh nhất. Bảng báo giá chính thức xin xem trong tệp PDF đính kèm, các điều khoản thương mại chính gồm:\n1. Điều kiện giá: FOB Thượng Hải (bằng USD);\n2. Phương thức thanh toán: 30% cọc T/T, 70% thanh toán nốt khi nhận bản scan B/L;\n3. Thời gian sản xuất: trong vòng 25 ngày làm việc sau khi nhận cọc và chốt mẫu;\n4. Đóng gói: Thùng carton 5 lớp tiêu chuẩn xuất khẩu có quấn màng pallet;\n5. Hiệu lực báo giá: đến hết ngày [ValidityDate].\n\nRất mong được hợp tác cùng quý công ty!",
          "ja": "[ClientName] 様\n\nこの度は当社 [ProductCategory] に関するお問い合わせをいただき、誠にありがとうございます。\n\nご要望の数量と仕様に基づき、競争力のあるお見積書を作成いたしました（添付PDF）。主要条件は下記の通りです：\n1. 貿易条件：FOB上海（米ドル建て）\n2. 決済条件：30％前金T/T、残金70％は船荷証券コピー確認後T/T送金\n3. 納期：手付金着金およびサンプル承認後25営業日以内\n4. 梱包：輸出標準強化ダンボールおよびパレット梱包\n5. 見積有効期限：[ValidityDate] まで\n\nご検討のほど、何卒よろしくお願い申し上げます。",
          "en": "Dear [ClientName],\n\nThank you for your inquiry regarding our [ProductCategory] products!\n\nBased on your specifications, we have prepared our best quotation (attached as PDF). Key terms:\n1. Term: FOB Shanghai (in USD);\n2. Payment: 30% T/T deposit, 70% balance against B/L copy;\n3. Lead time: 25 working days after deposit and sample confirmation;\n4. Packaging: Export standard cartons with pallet shrink-wrap;\n5. Validity: Valid through [ValidityDate].\n\nWe look forward to doing business with your esteemed company!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n附件为您所询 [ProductCategory] 的正式报价单（FOB上海，30%预付+70%见提单），报价有效期至 [ValidityDate]。请查收，随时为您解答疑问！",
        "translations": {
          "vi": "Chào [ClientName], xin gửi bạn bảng báo giá chính thức cho [ProductCategory] (FOB Thượng Hải, 30% cọc + 70% theo B/L), hiệu lực đến [ValidityDate]. Xin vui lòng xem file đính kèm!",
          "ja": "[ClientName] 様、お問い合わせいただきました製品の御見積書を添付いたしました（FOB上海、有効期限：[ValidityDate]）。ご検討のほどよろしくお願いいたします。",
          "en": "Hello [ClientName], attached is our official quote for [ProductCategory] (FOB Shanghai, 30% deposit + 70% against B/L), valid until [ValidityDate]. Please review!"
        }
      }
    },
    {
      "id": "email_004_po_confirm",
      "category": "emails",
      "subject": {
        "zh": "【订单确认】已确认采购订单 PO#[PONumber]，附形式发票 PI#[PINumber]",
        "vi": "【Xác nhận đơn hàng】Đã tiếp nhận đơn đặt hàng PO#[PONumber], gửi kèm hóa đơn chiếu lệ PI#[PINumber]",
        "ja": "【注文受領】発注書 PO#[PONumber] 受領確認および形式送り状 PI#[PINumber] 送付",
        "en": "Order Confirmation: PO#[PONumber] Received & PI#[PINumber] Attached"
      },
      "recipientType": {
        "zh": "买方采购部",
        "vi": "Phòng mua hàng của bên mua",
        "ja": "発注元調達担当者",
        "en": "Buyer Procurement Team"
      },
      "purpose": {
        "zh": "确认收到客户正式PO，签署并返回形式发票（PI），通知定金汇款事项。",
        "vi": "Xác nhận đã nhận đơn PO chính thức, gửi lại hóa đơn chiếu lệ (PI) và hướng dẫn chuyển tiền cọc.",
        "ja": "正式PO受領を連絡し、PIを送付して手付金送金を依頼。",
        "en": "Acknowledging receipt of buyer PO, attaching PI, and requesting deposit transfer."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên khách hàng",
            "en": "Client Name",
            "ja": "顧客名"
          },
          "example": "Mr. Tanaka"
        },
        {
          "key": "PONumber",
          "label": {
            "vi": "Mã đơn mua hàng",
            "en": "PO Number",
            "ja": "発注番号"
          },
          "example": "PO-20261028-VN"
        },
        {
          "key": "PINumber",
          "label": {
            "vi": "Số hóa đơn chiếu lệ",
            "en": "PI Number",
            "ja": "形式送り状番号"
          },
          "example": "PI-2026-904"
        },
        {
          "key": "DepositAmount",
          "label": {
            "vi": "Số tiền đặt cọc (30%)",
            "en": "Deposit Amount (30%)",
            "ja": "前金金額（30％）"
          },
          "example": "USD 15,000.00"
        }
      ],
      "keyPhrases": [
        {
          "zh": "排单生产",
          "pinyin": "pái dān shēngchǎn",
          "translations": {
            "vi": "lên lịch xếp đơn vào dây chuyền sản xuất",
            "ja": "生産ラインへの投入手配",
            "en": "scheduling production"
          }
        },
        {
          "zh": "银行水单",
          "pinyin": "yínháng shuǐdān",
          "translations": {
            "vi": "giấy báo có / chứng từ chuyển khoản ngân hàng (Bank slip)",
            "ja": "銀行送金控え / スリップ",
            "en": "bank remittance slip"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！\n\n非常感谢贵司发来的采购订单 PO#[PONumber]！我们已仔细复核其中的料号、数量及单价，完全确认无误。\n\n附件中附有我司签字盖章的形式发票 PI#[PINumber]，请您查阅并安排签署回传。同时，请根据 PI 上的银行信息安排 30% 定金（金额为 [DepositAmount]）。\n\n收到银行转账水单（Bank Slip）后，我们将第一时间锁定原材料并正式排单生产，预计于定金到账后 30 天内完成验货与发运。\n\n感谢您的信任与支持！\n\n顺祝商祺！\n\n[MyCompanyName] 订单管理部",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nCảm ơn quý công ty đã gửi đơn đặt hàng chính thức PO#[PONumber]! Chúng tôi đã kiểm tra kỹ mã hàng, số lượng và đơn giá, xác nhận hoàn toàn chính xác.\n\nTrong tệp đính kèm là Hóa đơn chiếu lệ PI#[PINumber] đã có chữ ký và con dấu của công ty chúng tôi. Xin vui lòng ký và gửi lại, đồng thời thu xếp chuyển 30% tiền cọc ([DepositAmount]) theo tài khoản ngân hàng trên PI.\n\nSau khi nhận được ủy nhiệm chi / biên lai ngân hàng, chúng tôi sẽ ngay lập tức chốt vật tư và đưa vào kế hoạch sản xuất.",
          "ja": "[ClientName] 様\n\n平素は大変お世話になっております。\n発注書 PO#[PONumber] を受領いたしました。品目、数量、単価を確認し、正式に受理いたしました。\n\n添付にて当社の署名捺印済みプロフォーマインボイス PI#[PINumber] をお送りいたします。内容をご確認の上、ご署名いただきご返送をお願い申し上げます。また、記載の口座へ前受金30％（[DepositAmount]）のお振込をお願いいたします。\n\n送金控えを受領次第、生産手配を速やかに開始いたします。今後ともよろしくお願い申し上げます。",
          "en": "Dear [ClientName],\n\nThank you for your purchase order PO#[PONumber]! We have verified all part numbers, quantities, and prices, and confirm full acceptance.\n\nAttached is our signed and stamped Proforma Invoice PI#[PINumber]. Please countersign and return a copy, and arrange the 30% deposit of [DepositAmount] as per bank details.\n\nUpon receipt of the bank remittance slip, we will immediately schedule production. Thank you for your business!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\nPO#[PONumber] 已确认！附上盖章 PI#[PINumber]，请查收并安排定金 [DepositAmount]。水单收到后立即排产，谢谢！",
        "translations": {
          "vi": "Chào [ClientName], đơn hàng PO#[PONumber] đã được chốt! Xin gửi PI#[PINumber] có dấu, bạn thu xếp chuyển cọc [DepositAmount] nhé. Nhận ủy nhiệm chi là xưởng vào sản xuất ngay!",
          "ja": "[ClientName] 様、PO#[PONumber] を受領いたしました。捺印済みのPI#[PINumber]を添付いたしますので、前金 [DepositAmount] のお手配をお願いいたします。",
          "en": "Hello [ClientName], PO#[PONumber] is confirmed! Attached is stamped PI#[PINumber]. Please arrange deposit [DepositAmount]; production begins upon receipt of slip!"
        }
      }
    },
    {
      "id": "email_005_shipping_advice",
      "category": "emails",
      "subject": {
        "zh": "【发货通知】订单 PO#[PONumber] 已按期出运，附提单与装箱单据",
        "vi": "【Thông báo xuất hàng】Đơn hàng PO#[PONumber] đã xuất bến đúng hạn, gửi kèm B/L và chứng từ",
        "ja": "【船積案内】発注分 PO#[PONumber] 出荷完了および船積書類（B/L・梱包明細）送付",
        "en": "Shipping Advice: PO#[PONumber] Dispatched on Schedule - B/L Attached"
      },
      "recipientType": {
        "zh": "买方物流与跟单团队",
        "vi": "Bộ phận logistics và theo dõi đơn của bên mua",
        "ja": "輸入者側貿易・物流担当者",
        "en": "Buyer Logistics and Operations Team"
      },
      "purpose": {
        "zh": "告知货物已装船离港，提供船名航次、提单号、预计到达时间（ETA）及清关单据预告。",
        "vi": "Thông báo hàng đã bốc lên tàu, cung cấp tên tàu, số vận đơn B/L, ngày đến dự kiến (ETA) và bộ chứng từ.",
        "ja": "本船出港、B/L番号、ETA（到着予定日）を連絡し、通関用書類を提供。",
        "en": "Informing buyer of cargo departure, vessel/voyage, B/L number, ETA, and docs."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên người nhận",
            "en": "Recipient Name",
            "ja": "受取人名"
          },
          "example": "Ms. Emily Watson"
        },
        {
          "key": "PONumber",
          "label": {
            "vi": "Số đơn hàng",
            "en": "PO Number",
            "ja": "発注番号"
          },
          "example": "PO-9821"
        },
        {
          "key": "VesselName",
          "label": {
            "vi": "Tên tàu và số chuyến",
            "en": "Vessel & Voyage",
            "ja": "本船名・航次"
          },
          "example": "WAN HAI 315 V.S022"
        },
        {
          "key": "BLNumber",
          "label": {
            "vi": "Số vận đơn B/L",
            "en": "B/L Number",
            "ja": "B/L番号"
          },
          "example": "WHL09283719"
        },
        {
          "key": "ETA",
          "label": {
            "vi": "Ngày đến dự kiến",
            "en": "Estimated Arrival (ETA)",
            "ja": "到着予定日（ETA）"
          },
          "example": "2026-11-12"
        }
      ],
      "keyPhrases": [
        {
          "zh": "预计到达时间",
          "pinyin": "yùjì dàodá shíjiān",
          "translations": {
            "vi": "thời gian đến dự kiến (ETA)",
            "ja": "到着予定日（ETA）",
            "en": "Estimated Time of Arrival (ETA)"
          }
        },
        {
          "zh": "清关单据",
          "pinyin": "qīngguān dānjù",
          "translations": {
            "vi": "bộ chứng từ thông quan",
            "ja": "通関用船積書類",
            "en": "clearance shipping documents"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！\n\n很高兴通知您，贵司采购的订单 PO#[PONumber] 已顺利完成生产与出入境检验，并于昨日在胡志明市卡莱港装船起运。\n\n航运具体信息如下：\n- 承运船舶：[VesselName]\n- 海运提单号：[BLNumber]\n- 预计抵港时间（ETA）：[ETA]\n- 柜号及封条号请见装箱单\n\n附件中包含商业发票（Invoice）、装箱单（Packing List）以及提单复印件（Non-negotiable B/L Copy）。原产地证书（Form E）正在海关核发中，办结后我们将一并通过顺丰/DHL快递正本或电放给您。\n\n请核对单据并提前做好目的港清关准备。\n\n顺祝商祺！\n\n[MyCompanyName] 国际物流部",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nRất vui mừng được thông báo đơn hàng PO#[PONumber] của quý khách đã hoàn tất sản xuất, kiểm nghiệm và bốc lên tàu tại cảng Cát Lái hôm qua.\n\nThông tin tàu như sau:\n- Tên tàu / chuyến: [VesselName]\n- Số vận đơn đường biển B/L: [BLNumber]\n- Ngày dự kiến đến cảng (ETA): [ETA]\n\nTệp đính kèm gồm Hóa đơn (CI), Phiếu đóng gói (PL) và Bản copy B/L. Giấy chứng nhận xuất xứ Form E đang được cấp, xong chúng tôi sẽ gửi phát chuyển nhanh bản gốc hoặc làm điện giao hàng cho quý vị.",
          "ja": "[ClientName] 様\n\n拝啓　ご注文の PO#[PONumber] につきまして、無事に製造および輸出検品を終え、昨日カトライ港にて本船へ積み込み出港いたしました。\n\n輸送詳細は下記の通りです：\n- 本船名 / 航次：[VesselName]\n- 船荷証券（B/L）番号：[BLNumber]\n- 仕向港到着予定日（ETA）：[ETA]\n\n添付にて商業インボイス、パッキングリスト、B/Lコピーをお送りいたします。原産地証明書（Form E）は発行手続き中であり、完了次第追って送付いたします。仕向港での通関準備にお役立てください。",
          "en": "Dear [ClientName],\n\nWe are pleased to inform you that your order PO#[PONumber] was loaded and departed from Cat Lai Port yesterday.\n\nShipping Details:\n- Vessel / Voyage: [VesselName]\n- Ocean B/L No.: [BLNumber]\n- Estimated Arrival (ETA): [ETA]\n\nAttached are Commercial Invoice, Packing List, and non-negotiable B/L copy. Form E C/O is currently in processing. Please prepare for destination customs clearance!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n订单 PO#[PONumber] 已发运！船名航次 [VesselName]，提单号 [BLNumber]，预计 [ETA] 抵港。附件为发票、装箱单及提单副本，请查收！",
        "translations": {
          "vi": "Chào [ClientName], đơn hàng PO#[PONumber] đã xuất bến! Tàu [VesselName], số B/L [BLNumber], dự kiến đến ngày [ETA]. File đính kèm là hóa đơn, packing list và B/L, xin mời kiểm tra!",
          "ja": "[ClientName] 様、PO#[PONumber] が出港いたしました。船名 [VesselName]、B/L番号 [BLNumber]、ETAは [ETA] です。添付の書類をご確認ください。",
          "en": "Hi [ClientName], PO#[PONumber] has been shipped! Vessel: [VesselName], B/L: [BLNumber], ETA: [ETA]. Invoice, packing list and B/L copy attached!"
        }
      }
    },
    {
      "id": "email_006_payment_reminder",
      "category": "emails",
      "subject": {
        "zh": "【付款提醒】关于发票 #[InvoiceNumber] 尾款支付提醒 - [MyCompanyName]",
        "vi": "【Nhắc thanh toán】Nhắc thanh toán khoản tiền còn lại cho hóa đơn #[InvoiceNumber] - [MyCompanyName]",
        "ja": "【お支払いのお願い】請求書 #[InvoiceNumber] 残金決済に関するご案内",
        "en": "Payment Reminder: Balance Payment Due for Invoice #[InvoiceNumber]"
      },
      "recipientType": {
        "zh": "买方财务或采购负责人",
        "vi": "Bộ phận kế toán hoặc thu mua của khách",
        "ja": "顧客側経理・財務責任者",
        "en": "Buyer Accounting / Purchasing Lead"
      },
      "purpose": {
        "zh": "在提单签发后或付款到期日前，礼貌提醒客户支付余款以配合电放提单。",
        "vi": "Lịch sự nhắc đối tác chuyển nốt số tiền còn lại sau khi có B/L để tiến hành điện giao hàng.",
        "ja": "期日接近またはB/L発行に伴い、残金の支払いを丁寧に督促。",
        "en": "Polite reminder to settle remaining balance to release original bills of lading."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên người liên hệ",
            "en": "Client Name",
            "ja": "ご担当者様名"
          },
          "example": "Mr. Johnathan Lee"
        },
        {
          "key": "InvoiceNumber",
          "label": {
            "vi": "Mã số hóa đơn",
            "en": "Invoice Number",
            "ja": "請求書番号"
          },
          "example": "INV-2026-8802"
        },
        {
          "key": "BalanceAmount",
          "label": {
            "vi": "Số tiền còn lại",
            "en": "Outstanding Balance",
            "ja": "未払い残金"
          },
          "example": "USD 32,450.00"
        },
        {
          "key": "DueDate",
          "label": {
            "vi": "Hạn chót thanh toán",
            "en": "Payment Due Date",
            "ja": "支払期日"
          },
          "example": "2026-11-05"
        }
      ],
      "keyPhrases": [
        {
          "zh": "电放提单",
          "pinyin": "diànfàng tídān",
          "translations": {
            "vi": "điện giao hàng (Telex Release B/L)",
            "ja": "テレックス・リリース（サレンダーB/L）",
            "en": "Telex Release B/L"
          }
        },
        {
          "zh": "汇款底单",
          "pinyin": "huìkuǎn dǐdān",
          "translations": {
            "vi": "phiếu chuyển tiền / ủy nhiệm chi ngân hàng",
            "ja": "送金控え",
            "en": "remittance confirmation slip"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！\n\n货物已顺利起运，随信附上船公司出具的海运提单副本（Copy B/L）。\n\n根据双方签署的合同约定，70% 尾款金额计 [BalanceAmount] 应于见提单副本后支付，截止日期为 [DueDate]。请贵司财务部门协助安排汇款，以便我们在抵港前及时为您办理电放提单（Telex Release），避免产生港口滞箱费用。\n\n汇款后烦请将银行汇款水单（Swift Copy）回传本邮箱，非常感谢您的配合！\n\n顺祝商祺！\n\n[MyCompanyName] 财务部",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nHàng hóa đã được xếp lên tàu vận chuyển, xin gửi kèm bản scan vận đơn đường biển (Copy B/L) do hãng tàu phát hành.\n\nTheo hợp đồng đã ký, 70% số tiền còn lại là [BalanceAmount] sẽ thanh toán sau khi thấy bản B/L copy, hạn chót là [DueDate]. Kính mong quý phòng kế toán thu xếp chuyển khoản để chúng tôi kịp thời làm điện giao hàng (Telex Release) trước khi tàu cập cảng, tránh phát sinh phí lưu bãi.\n\nChuyển khoản xong xin gửi lại ủy nhiệm chi vào email này. Xin cảm ơn sự phối hợp của quý vị!",
          "ja": "[ClientName] 様\n\n拝啓　貨物は予定通り出港しており、船会社発行のB/Lコピーを添付にてお送りいたします。\n\n契約に基づき、残金70％にあたる [BalanceAmount] のお支払い期日が [DueDate] となっております。本船到着前のテレックス・リリース手続きを円滑に行い、港湾での保管料発生を防ぐため、送金のお手配をお願い申し上げます。\n\n送金完了後、送金控え（Swiftスリップ）をご返信いただけますと幸いです。何卒よろしくお願い申し上げます。",
          "en": "Dear [ClientName],\n\nThe goods have departed on schedule; please find attached the shipping line B/L copy.\n\nPer our sales contract, the 70% balance of [BalanceAmount] is due on [DueDate] against copy B/L. Kindly arrange payment so we can issue the Telex Release before vessel arrival and avoid demurrage costs.\n\nPlease reply with the bank Swift confirmation slip once sent. Thank you for your cooperation!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n附上本批货物的提单副本。请协助安排尾款 [BalanceAmount]，以便我司及时办理电放提单。款项汇出后烦请提供水单，谢谢！",
        "translations": {
          "vi": "Chào [ClientName], xin gửi bản copy B/L của lô hàng. Bạn giúp thu xếp thanh toán nốt [BalanceAmount] để công ty mình kịp làm điện giao hàng nhé. Chuyển xong gửi mình phiếu chuyển tiền nha, cảm ơn bạn!",
          "ja": "[ClientName] 様、B/Lコピーを添付いたしました。テレックスリリースのため残金 [BalanceAmount] のお手配をお願い申し上げます。送金控えをお待ちしております。",
          "en": "Hi [ClientName], attached is the B/L copy. Please arrange the balance payment of [BalanceAmount] so we can authorize Telex Release promptly. Thank you!"
        }
      }
    },
    {
      "id": "email_007_delay_apology",
      "category": "emails",
      "subject": {
        "zh": "【重要通知】关于订单 PO#[PONumber] 交期调整及诚挚致歉 - [MyCompanyName]",
        "vi": "【Thông báo quan trọng】Điều chỉnh thời gian giao hàng đơn PO#[PONumber] và xin lỗi chân thành - [MyCompanyName]",
        "ja": "【重要】PO#[PONumber] 納期変更のご連絡およびお詫び - [MyCompanyName]",
        "en": "Important Notice: Delivery Schedule Adjustment & Sincere Apology for PO#[PONumber]"
      },
      "recipientType": {
        "zh": "买方采购总监及业务跟单",
        "vi": "Giám đốc mua hàng và theo dõi đơn bên mua",
        "ja": "顧客側調達責任者",
        "en": "Buyer Procurement Director"
      },
      "purpose": {
        "zh": "因原材料短缺或工厂机器故障等客观原因导致交期延迟时，坦诚向客户说明并提供补救方案。",
        "vi": "Thông báo lý do khách quan dẫn đến chậm giao hàng, xin lỗi chân thành và đưa ra giải pháp khắc phục.",
        "ja": "不可抗力や製造トラブルによる納期遅延を速やかに報告し、代替策とお詫びを表明。",
        "en": "Transparently informing client of unavoidable delay, apologizing, and offering solutions."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên người nhận",
            "en": "Recipient Name",
            "ja": "お名前"
          },
          "example": "Mr. Kevin Miller"
        },
        {
          "key": "PONumber",
          "label": {
            "vi": "Số đơn hàng",
            "en": "PO Number",
            "ja": "発注番号"
          },
          "example": "PO-7741"
        },
        {
          "key": "DelayReason",
          "label": {
            "vi": "Lý do chậm trễ",
            "en": "Reason for Delay",
            "ja": "遅延理由"
          },
          "example": "核心芯片供应商品控检测未通过 (upstream IC chip QC failure)"
        },
        {
          "key": "NewDeliveryDate",
          "label": {
            "vi": "Ngày giao mới",
            "en": "New Delivery Date",
            "ja": "改定後納期"
          },
          "example": "2026年11月20日"
        }
      ],
      "keyPhrases": [
        {
          "zh": "深表歉意",
          "pinyin": "shēn biǎo qiànyì",
          "translations": {
            "vi": "vô cùng xin lỗi / bày tỏ sự áy náy sâu sắc",
            "ja": "深くお詫び申し上げます",
            "en": "deepest apologies"
          }
        },
        {
          "zh": "补救措施",
          "pinyin": "bǔjiù cuòshī",
          "translations": {
            "vi": "biện pháp khắc phục / giải pháp cứu vãn",
            "ja": "救済措置 / リカバリー策",
            "en": "remedial measures"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！非常抱歉因突发情况给您写信。\n\n关于贵司所下的订单 PO#[PONumber]，原计划于本周完成出货。然而因 [DelayReason]，为保证成品出厂质量绝不妥协，工厂被迫重新进行了批次校准与复检。\n\n经过生产车间全员周末加班赶工，最新的交货日期需调整至 [NewDeliveryDate]。对于此次延误给贵司销售计划带来的不便与影响，我们全体团队深表歉意！\n\n为弥补延误影响，我司决定：\n1. 本批次产生的全部港口加急费由我方全额承担；\n2. 免费为首批急需货物安排空运先行出运（若贵司需要）。\n\n再次为本次交期调整致以诚挚的歉意，我们将每日向您同步最新生产进度！\n\n[MyCompanyName] 生产与运营总监 敬上",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nRất lấy làm tiếc phải gửi thư này tới quý khách vì tình huống phát sinh ngoài ý muốn.\n\nVề đơn hàng PO#[PONumber] dự kiến xuất kho tuần này, do [DelayReason], nhằm kiên quyết bảo đảm chất lượng thành phẩm không bị thỏa hiệp, nhà máy đã buộc phải hiệu chuẩn và kiểm định lại toàn bộ lô hàng.\n\nSau khi tăng ca toàn bộ xưởng sản xuất, ngày giao hàng mới cần dời sang ngày [NewDeliveryDate]. Chúng tôi vô cùng xin lỗi về sự bất tiện ảnh hưởng tới kế hoạch bán hàng của quý công ty!\n\nĐể bù đắp, công ty chúng tôi quyết định:\n1. Chịu toàn bộ chi phí thông quan hỏa tốc tại cảng;\n2. Sẵn sàng hỗ trợ gửi trước một phần hàng gấp qua đường hàng không (nếu quý vị cần gấp).\n\nMột lần nữa xin gửi lời xin lỗi chân thành nhất!",
          "ja": "[ClientName] 様\n\n拝啓　不測の事態によりご迷惑をおかけいたしますことを、深くお詫び申し上げます。\n\nPO#[PONumber] の出荷につきまして、[DelayReason] が発生いたしました。品質第一を担保するため再検査ラインを稼働させております。\n\n全社体制で挽回に努めておりますが、改定納期を [NewDeliveryDate] とさせていただきたく存じます。貴社の販売計画に多大な影響を与えますことを重ねてお詫び申し上げます。\n\nお詫びとリカバリー措置として、港湾特急費用を当社にて全額負担いたします。また、緊急分のみ航空便への無償振替も対応可能です。進捗は毎日ご報告申し上げます。",
          "en": "Dear [ClientName],\n\nWe sincerely apologize for writing with unfortunate news regarding order PO#[PONumber].\n\nDue to [DelayReason], in order to maintain our strict quality standards, production was paused for recalibration. Despite overtime efforts, the shipment date must be revised to [NewDeliveryDate].\n\nWe deeply apologize for the inconvenience to your sales schedule. To remedy this:\n1. We will absorb all express port clearance surcharges;\n2. If required, we can airship an urgent batch at our own expense.\n\nWe will provide daily progress updates. Thank you for your patience and understanding!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n非常抱歉！由于 [DelayReason]，订单 PO#[PONumber] 交期需顺延至 [NewDeliveryDate]。我们正在全力抢工，加急费用由我司承担，给您添麻烦了！",
        "translations": {
          "vi": "Chào [ClientName], rất xin lỗi bạn! Do [DelayReason], đơn hàng PO#[PONumber] phải lùi ngày giao sang [NewDeliveryDate]. Chúng tôi đang tăng ca hết tốc lực và chịu mọi phí phát sinh, rất mong bạn thông cảm!",
          "ja": "[ClientName] 様、大変申し訳ございません。[DelayReason] によりPO#[PONumber]の納期が [NewDeliveryDate] にずれ込む見通しです。全力で進行中ですので何卒ご容赦ください。",
          "en": "Dear [ClientName], sincere apologies! Due to [DelayReason], delivery for PO#[PONumber] is rescheduled to [NewDeliveryDate]. We are expediting at our cost. Thank you for understanding!"
        }
      }
    },
    {
      "id": "email_008_quality_claim",
      "category": "emails",
      "subject": {
        "zh": "【质量投诉与索赔】关于集装箱 [ContainerNumber] 到货瑕疵之正式通知与索赔要求",
        "vi": "【Khiếu nại chất lượng & Đòi bồi thường】Thông báo chính thức về lỗi hàng container [ContainerNumber]",
        "ja": "【品質クレームおよび求償】コンテナ [ContainerNumber] の不具合に関する正式通知",
        "en": "Quality Claim: Formal Notification & Claim for Defective Goods in Container [ContainerNumber]"
      },
      "recipientType": {
        "zh": "供货商工厂总经理及品质部",
        "vi": "Tổng giám đốc và phòng KCS của nhà máy cung ứng",
        "ja": "サプライヤー品質管理部門・経営陣",
        "en": "Supplier General Manager & QA Team"
      },
      "purpose": {
        "zh": "在收到货物发现破损、规格不符或批次缺陷时，有据有节提出索赔要求并附上证据链。",
        "vi": "Khiếu nại có cơ sở, kèm ảnh chụp/video và báo cáo giám định đòi nhà máy bồi thường hoặc đổi bù.",
        "ja": "貨物不良発生時に証拠を提示し、返金・補償・再送などの是正措置を論理的に要求。",
        "en": "Formal claim presenting photographic/inspection evidence demanding compensation or replacements."
      },
      "placeholders": [
        {
          "key": "SupplierContact",
          "label": {
            "vi": "Tên người liên hệ nhà máy",
            "en": "Supplier Contact",
            "ja": "工場担当者"
          },
          "example": "陈总 / 郭经理"
        },
        {
          "key": "ContainerNumber",
          "label": {
            "vi": "Số container bị lỗi",
            "en": "Container Number",
            "ja": "該当コンテナ番号"
          },
          "example": "TEMU9281720"
        },
        {
          "key": "DefectPercentage",
          "label": {
            "vi": "Tỷ lệ hàng lỗi",
            "en": "Defect Rate (%)",
            "ja": "不良発生率"
          },
          "example": "12.5%"
        },
        {
          "key": "ClaimAmount",
          "label": {
            "vi": "Số tiền đòi bồi thường",
            "en": "Claim Amount",
            "ja": "求償請求金額"
          },
          "example": "USD 8,400.00"
        }
      ],
      "keyPhrases": [
        {
          "zh": "质检报告",
          "pinyin": "zhìjiǎn bàogào",
          "translations": {
            "vi": "báo cáo kiểm định chất lượng",
            "ja": "品質検査報告書",
            "en": "quality inspection report"
          }
        },
        {
          "zh": "冲抵货款",
          "pinyin": "chòngdǐ huòkuǎn",
          "translations": {
            "vi": "khấu trừ vào tiền hàng đợt sau",
            "ja": "次回代金相殺",
            "en": "offset against future invoices"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [SupplierContact]：\n\n您好！\n\n我司于昨日在仓库完成了对集装箱 [ContainerNumber] 的拆箱卸货与进厂抽检。非常遗憾地通知您，这批货物出现了严重的质量问题。\n\n经第三方公证检验机构与我司质检员联合复检，缺陷率高达 [DefectPercentage]。主要问题表现为外壳裂纹及密封条脱落，严重违反了合同约定的技术验收标准。详见附件中的检测报告、高清瑕疵对比照片及拆箱录像。\n\n根据双方采购合同第七条索赔条款，我们正式提出如下解决方案：\n1. 贵司直接向我司电汇赔付缺陷损失金额 [ClaimAmount]；或者\n2. 该笔款项 [ClaimAmount] 自动冲抵我司下一批新订单的定金，并在下批出货中无偿补齐合格良品。\n\n请贵司质量团队在三个工作日内给予书面确认并答复改进措施。\n\n此致，\n\n[MyCompanyName] 供应链品质总监 谨呈",
        "translations": {
          "vi": "Kính gửi [SupplierContact],\n\nHôm qua chúng tôi đã hoàn thành dỡ hàng container [ContainerNumber] và kiểm định ngẫu nhiên tại kho. Rất tiếc phải thông báo lô hàng này xuất hiện vấn đề chất lượng nghiêm trọng.\n\nQua kiểm tra của đơn vị giám định độc lập và KCS chúng tôi, tỷ lệ lỗi lên tới [DefectPercentage] (chủ yếu là nứt vỏ và bong gioăng cao su), vi phạm hợp đồng đã thỏa thuận. Hình ảnh, video và báo cáo giám định chi tiết xin xem tệp đính kèm.\n\nTheo điều 7 hợp đồng, chúng tôi đề xuất 2 phương án:\n1. Chuyển khoản bồi thường thiệt hại [ClaimAmount]; hoặc\n2. Khấu trừ [ClaimAmount] vào tiền cọc đơn hàng tiếp theo và gửi bù số lượng hàng đạt chuẩn vào chuyến sau.\n\nKính đề nghị quý bên phản hồi bằng văn bản trong vòng 3 ngày làm việc.",
          "ja": "[SupplierContact] 様\n\n昨日コンテナ [ContainerNumber] の開梱および受入検査を実施いたしましたが、誠に遺憾ながら深刻な品質不具合が確認されました。\n\n第三者検品機関による検査の結果、不良率は [DefectPercentage] に達しております（外装クラックおよび密閉シールの剥離）。契約基準を大きく下回っており、検査レポートおよび動画・写真を添付いたします。\n\n契約書第7条に基づき、下記の是正を正式に請求いたします：\n1. 不良損害額 [ClaimAmount] の現金返金（T/T送金）、または\n2. 次回発注代金からの [ClaimAmount] 相殺および良品の無償補填出荷。\n\n3営業日以内に書面にてご回答くださいますようお願い申し上げます。",
          "en": "Dear [SupplierContact],\n\nUpon unboxing container [ContainerNumber] yesterday, our quality team and an independent surveyor found a defect rate of [DefectPercentage] (housing cracks and seal debonding).\n\nPer Clause 7 of our sales contract, we formally request:\n1. Remittance of damages totaling [ClaimAmount]; OR\n2. Credit of [ClaimAmount] against our next purchase order and replacement units.\n\nPlease review the attached inspection report, photos, and video, and reply within three business days."
        }
      },
      "bodyConcise": {
        "zh": "[SupplierContact] 您好：\n集装箱 [ContainerNumber] 抽检不良率达 [DefectPercentage]，附上质检报告及瑕疵照片。依合同要求赔付 [ClaimAmount] 或下批扣除，请于3日内回复处理方案！",
        "translations": {
          "vi": "Chào [SupplierContact], container [ContainerNumber] kiểm tra lỗi tới [DefectPercentage], có đính kèm ảnh và biên bản kiểm định. Đề nghị bồi thường [ClaimAmount] hoặc trừ đơn sau, mong bạn phản hồi trong 3 ngày!",
          "ja": "[SupplierContact] 様、コンテナ [ContainerNumber] にて不良率 [DefectPercentage] が発生しました。写真と報告書を添付します。[ClaimAmount] の補償について3日以内にご返答ください。",
          "en": "Hi [SupplierContact], inspection of container [ContainerNumber] revealed a [DefectPercentage] defect rate. Report and photos attached. Please confirm claim of [ClaimAmount] within 3 days!"
        }
      }
    },
    {
      "id": "email_009_thank_you_meeting",
      "category": "emails",
      "subject": {
        "zh": "【感谢信】真诚感谢贵司今日的热情接待与富有成效的会谈 - [MyCompanyName]",
        "vi": "【Thư cảm ơn】Chân thành cảm ơn sự đón tiếp nhiệt tình và buổi làm việc hiệu quả của quý công ty hôm nay",
        "ja": "【面談の御礼】本日のご面談および工場見学の御礼 - [MyCompanyName]",
        "en": "Thank You for Today's Productive Meeting and Warm Hospitality"
      },
      "recipientType": {
        "zh": "会谈客户或来访嘉宾",
        "vi": "Khách hàng đối tác vừa gặp mặt",
        "ja": "商談相手先企業様",
        "en": "Meeting Counterpart / Host"
      },
      "purpose": {
        "zh": "在商务拜访、广交会展会交谈或工厂考察后24小时内发送，巩固商务互信。",
        "vi": "Gửi trong vòng 24h sau cuộc gặp gỡ, hội chợ Canton Fair hoặc chuyến thăm nhà xưởng để gia tăng gắn kết.",
        "ja": "商談や展示会、工場見学後24時間以内に送り、ビジネス関係を深化。",
        "en": "Follow-up within 24 hours of a meeting/factory visit to strengthen relationship."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên đối tác",
            "en": "Client Name",
            "ja": "お相手のお名前"
          },
          "example": "周总 / 各位领导"
        },
        {
          "key": "MeetingTopic",
          "label": {
            "vi": "Nội dung cuộc họp",
            "en": "Meeting Subject",
            "ja": "商談テーマ"
          },
          "example": "2027年新能源车载充电器联合开发 (2027 EV Charger Joint Development)"
        }
      ],
      "keyPhrases": [
        {
          "zh": "富有成效",
          "pinyin": "fùyǒu chéngxiào",
          "translations": {
            "vi": "đạt kết quả tốt đẹp / hiệu quả",
            "ja": "実りある / 有意義な",
            "en": "fruitful / productive"
          }
        },
        {
          "zh": "互利共赢",
          "pinyin": "hùlì gòngyíng",
          "translations": {
            "vi": "đôi bên cùng có lợi (win-win)",
            "ja": "互恵共生 / Win-Win",
            "en": "mutually beneficial / win-win"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！\n\n非常感谢您及团队今天对我们的热情接待！今天的交流非常富有成效，让我们对双方在 [MeetingTopic] 领域的合作前景充满信心。\n\n会议纪要及双方商定的推进时间表正在由我司整理中，明天上午将呈送给您审阅。我们坚信凭借贵司强大的市场网络与我司稳健的制造实力，必能实现互利共赢！\n\n再次感谢您的宝贵时间与盛情款待！\n\n顺祝商祺！\n\n[MyCompanyName] 董事长 携全体团队 谨上",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nCảm ơn quý vị và đội ngũ đã đón tiếp chúng tôi vô cùng nồng hậu trong ngày hôm nay! Buổi trao đổi diễn ra rất hiệu quả, khiến chúng tôi tràn đầy niềm tin vào triển vọng hợp tác trong dự án [MeetingTopic].\n\nBiên bản cuộc họp và lộ trình tiến độ dự kiến đang được tổng hợp, sáng mai chúng tôi sẽ gửi sang để quý vị rà soát. Tin tưởng rằng sự hợp tác giữa hai bên sẽ mang lại thành công vang dội đôi bên cùng thắng!",
          "ja": "[ClientName] 様\n\n本日はご多忙の折、温かいおもてなしと実りあるご面談の機会をいただき、心より御礼申し上げます。[MeetingTopic] における協業の可能性に大きな手応えを感じております。\n\n議事録および今後のスケジュール案を整理の上、明日午前中にお送りいたします。双方の強みを活かしたWin-Winの提携が実現できることを確信しております。今後ともよろしくお願い申し上げます。",
          "en": "Dear [ClientName],\n\nThank you and your team for the warm hospitality today. Our discussion regarding [MeetingTopic] was exceptionally productive and gave us immense confidence in our future cooperation.\n\nMeeting minutes and next steps will be forwarded by tomorrow morning. We look forward to a successful win-win partnership!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n今天拜访收获很大，非常感谢您的接待！会议纪要明天发您，期待与贵司携手推进 [MeetingTopic]！",
        "translations": {
          "vi": "Chào [ClientName], buổi gặp mặt hôm nay thật tuyệt vời, cảm ơn sự đón tiếp của bạn! Ngày mai mình gửi biên bản họp nhé, rất mong sớm hợp tác trong [MeetingTopic]!",
          "ja": "[ClientName] 様、本日は誠にありがとうございました。実り多いお話ができ感謝しております。明日議事録をお送りいたします。",
          "en": "Hi [ClientName], thank you for the wonderful meeting today! Meeting minutes will follow tomorrow. Excited to move forward on [MeetingTopic]!"
        }
      }
    },
    {
      "id": "email_010_holiday_schedule",
      "category": "emails",
      "subject": {
        "zh": "【通知】[MyCompanyName] [HolidayName] 放假安排及出货备货温馨提醒",
        "vi": "【Thông báo】Lịch nghỉ lễ [HolidayName] của [MyCompanyName] và nhắc nhở chuẩn bị đơn hàng",
        "ja": "【ご案内】[HolidayName] 休暇期間中の営業体制および出荷スケジュールについて",
        "en": "Holiday Notice: [MyCompanyName] [HolidayName] Schedule & Order Planning Reminder"
      },
      "recipientType": {
        "zh": "所有合作客户及采购商",
        "vi": "Toàn bộ đối tác và nhà thu mua hợp tác",
        "ja": "全取引先・バイヤー担当者",
        "en": "All Active Clients and Procurement Partners"
      },
      "purpose": {
        "zh": "告知节假日停工放假安排，建议客户提前下单锁仓，避免节前工厂爆舱和物流延误。",
        "vi": "Thông báo lịch nghỉ lễ của nhà máy, khuyến nghị khách lên đơn sớm để tránh quá tải đơn hàng và trễ tàu.",
        "ja": "連休中の工場稼働停止と物流遅延を考慮し、事前の前倒し発注を促す。",
        "en": "Notifying partners of holiday closures and recommending advance order placement."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên người nhận",
            "en": "Recipient Name",
            "ja": "受取人名"
          },
          "example": "Dear Partners"
        },
        {
          "key": "HolidayName",
          "label": {
            "vi": "Tên kỳ nghỉ lễ",
            "en": "Holiday Name",
            "ja": "祝日名"
          },
          "example": "Spring Festival / Tết Nguyên Đán"
        },
        {
          "key": "StartDate",
          "label": {
            "vi": "Ngày bắt đầu nghỉ",
            "en": "Holiday Start Date",
            "ja": "休暇開始日"
          },
          "example": "2026-02-10"
        },
        {
          "key": "EndDate",
          "label": {
            "vi": "Ngày đi làm lại",
            "en": "Resume Work Date",
            "ja": "営業再開日"
          },
          "example": "2026-02-23"
        },
        {
          "key": "CutoffDate",
          "label": {
            "vi": "Hạn chót đặt hàng trước lễ",
            "en": "Pre-holiday Order Cut-off",
            "ja": "連休前受注締切日"
          },
          "example": "2026-01-15"
        }
      ],
      "keyPhrases": [
        {
          "zh": "放假安排",
          "pinyin": "fàngjià ānpái",
          "translations": {
            "vi": "lịch nghỉ lễ",
            "ja": "休暇日程・営業予定",
            "en": "holiday schedule"
          }
        },
        {
          "zh": "提前备货",
          "pinyin": "tíqián bèihuò",
          "translations": {
            "vi": "chuẩn bị hàng trước",
            "ja": "前倒し手配・事前在庫確保",
            "en": "prepare stock in advance"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！新春将至，感谢贵司过去一年对我司的信任与大力支持。\n\n为配合物流停运与工厂年休，我司 [HolidayName] 放假时间定于 [StartDate] 至 [EndDate]，[EndDate] 正式恢复正常生产与发货。\n\n为确保贵司供应链稳定，避免节前因船期紧张及运费上涨影响交付，烦请贵司在 [CutoffDate] 前确认近期订单，以便我们为您提前锁定量产舱位。\n\n假期期间如有紧急事项，可随时联系我司值班客服专员。顺祝商祺，生意兴隆！",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nXin chào quý vị! Ngày lễ đang đến gần, chân thành cảm ơn sự tin tưởng và ủng hộ quý báu của quý công ty dành cho chúng tôi trong suốt năm qua.\n\nĐể phối hợp nhịp nhàng với lịch đóng cảng của hãng tàu và kỳ nghỉ của công nhân, lịch nghỉ lễ [HolidayName] của công ty chúng tôi bắt đầu từ ngày [StartDate] đến ngày [EndDate], ngày [EndDate] sẽ chính thức mở cửa sản xuất và xuất hàng trở lại.\n\nĐể bảo đảm chuỗi cung ứng của quý công ty hoạt động ổn định, tránh tình trạng kẹt tàu và tăng giá cước trước kỳ nghỉ, kính phiền quý công ty chốt các đơn hàng trước ngày [CutoffDate] để chúng tôi ưu tiên sắp xếp lịch sản xuất và đặt chỗ tàu.\n\nTrong kỳ nghỉ lễ nếu có việc khẩn cấp, xin cứ liên hệ nhân viên trực ban của chúng tôi. Kính chúc quý công ty làm ăn phát tài!",
          "ja": "[ClientName] 様\n\n平素は格別のご高配を賜り厚く御礼申し上げます。\n\nさて、弊社の [HolidayName] 休業期間につきまして、下記の通りご案内申し上げます。\n休業期間：[StartDate] 〜 [EndDate]（[EndDate] より通常営業を再開いたします）\n\n連休前後は船腹不足や運賃高騰が予想されますので、貴社のサプライチェーン維持のため、[CutoffDate] までに前倒しでの確定発注をご検討いただけますようお願い申し上げます。期間中の緊急連絡は当直窓口までご連絡ください。",
          "en": "Dear [ClientName],\n\nSeason greetings! We sincerely appreciate your valued partnership and support over the past year.\n\nPlease be advised that our operations will be closed for [HolidayName] from [StartDate] through [EndDate], resuming full production and dispatch on [EndDate].\n\nTo ensure supply chain continuity and avoid severe pre-holiday freight congestion, we kindly request that you finalize upcoming orders prior to [CutoffDate] so we can prioritize production schedules and vessel bookings. Thank you!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n我司 [HolidayName] 将于 [StartDate] 至 [EndDate] 放假。为免节前物流爆舱，请尽量在 [CutoffDate] 前下达订单，谢谢您的理解与配合！",
        "translations": {
          "vi": "Chào [ClientName], xưởng mình sẽ nghỉ lễ [HolidayName] từ [StartDate] đến [EndDate]. Để tránh cháy kho và lỡ chuyến trước lễ, bạn thu xếp lên đơn trước ngày [CutoffDate] nhé, cảm ơn bạn nhiều!",
          "ja": "[ClientName] 様、[StartDate] 〜 [EndDate] は連休休業となります。連休前の混雑を回避するため、[CutoffDate] までの早期発注にご協力いただけますと幸いです。",
          "en": "Hello [ClientName], our office will close for [HolidayName] from [StartDate] to [EndDate]. Please finalize urgent orders before [CutoffDate] to avoid peak congestion. Thank you!"
        }
      }
    },
    {
      "id": "email_011_price_adjustment_notice",
      "category": "emails",
      "subject": {
        "zh": "【重要通知】关于近期原材料成本上涨导致部分产品价格调整的说明",
        "vi": "【Thông báo quan trọng】Về việc điều chỉnh đơn giá một số sản phẩm do chi phí nguyên vật liệu tăng",
        "ja": "【重要】原材料価格高騰に伴う一部製品価格改定のご案内",
        "en": "Notice of Price Adjustment Due to Surging Raw Material Costs"
      },
      "recipientType": {
        "zh": "所有合作采购商及分销商",
        "vi": "Toàn bộ đối tác thu mua và nhà phân phối",
        "ja": "お取引先様各位",
        "en": "All Purchasing Counterparties and Distributors"
      },
      "purpose": {
        "zh": "解释由于铜/芯片/运费等上游成本上涨，被迫微调产品价格，并给出缓冲期允许按原价下单。",
        "vi": "Giải thích nguyên nhân giá nguyên vật liệu đầu vào tăng dẫn đến phải điều chỉnh giá bán, đưa ra thời gian ân hạn để khách đặt trước theo giá cũ.",
        "ja": "原材料高騰の背景を丁寧に説明し、猶予期間（駆け込み発注可能期日）を設けて顧客の理解を得る。",
        "en": "Diplomatically explaining necessary price adjustments while offering a grace window at existing rates."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên người nhận",
            "en": "Recipient Name",
            "ja": "受取人名"
          },
          "example": "Mr. David Lee"
        },
        {
          "key": "MaterialType",
          "label": {
            "vi": "Loại nguyên vật liệu tăng giá",
            "en": "Raw Material Type",
            "ja": "高騰原材料名"
          },
          "example": "Copper and semiconductor ICs"
        },
        {
          "key": "IncreasePercentage",
          "label": {
            "vi": "Tỷ lệ tăng giá (%)",
            "en": "Price Adjustment %",
            "ja": "値上げ改定率"
          },
          "example": "5% - 8%"
        },
        {
          "key": "EffectiveDate",
          "label": {
            "vi": "Ngày bắt đầu áp dụng giá mới",
            "en": "New Price Effective Date",
            "ja": "新価格適用開始日"
          },
          "example": "2026-12-01"
        },
        {
          "key": "GraceDeadline",
          "label": {
            "vi": "Hạn cuối đặt hàng theo giá cũ",
            "en": "Old Price Grace Deadline",
            "ja": "旧価格適用最終締切日"
          },
          "example": "2026-11-20"
        }
      ],
      "keyPhrases": [
        {
          "zh": "价格调整",
          "pinyin": "jiàgé tiáozhěng",
          "translations": {
            "vi": "điều chỉnh giá cả",
            "ja": "価格改定",
            "en": "price adjustment"
          }
        },
        {
          "zh": "深表歉意",
          "pinyin": "shēn biǎo qiànyì",
          "translations": {
            "vi": "vô cùng xin lỗi",
            "ja": "深くお詫び申し上げる",
            "en": "sincerely apologize"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！非常感谢贵司长期以来对我司产品品质的信赖。\n\n近期，受国际大宗供应链波动影响，上游核心原材料（[MaterialType]）采购成本持续大幅攀升。我司虽通过内部精细化管理竭力消化成本，但目前的市场价格已超出我们的承受极限。\n\n为确保产品品质与供货稳定性不打折扣，经审慎评估，我司决定自 [EffectiveDate] 起，对相关系列产品价格进行适度上调（涨幅约为 [IncreasePercentage]）。\n\n为感谢贵司的长久支持并尽量减轻贵司的采购压力，凡在 [GraceDeadline] 之前确认并支付定金的正式订单，我司承诺将一律继续执行原有优惠价格。\n\n由此给贵司预算安排带来的不便，我们深表歉意，敬请谅解！随信附上最新价格清单。",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nXin chào quý vị! Chân thành cảm ơn sự tin tưởng và ủng hộ bền bỉ của quý công ty dành cho sản phẩm của chúng tôi.\n\nThời gian gần đây, do biến động mạnh trên thị trường quốc tế, chi phí nguyên vật liệu đầu vào cốt lõi ([MaterialType]) đã tăng phi mã. Dù công ty chúng tôi đã nỗ lực tối ưu hóa chi phí nội bộ nhưng mức giá hiện tại đã chạm ngưỡng chịu đựng của dây chuyền sản xuất.\n\nĐể bảo đảm chất lượng thành phẩm đạt chuẩn cao và duy trì nguồn cung ổn định, sau khi cân nhắc kỹ lưỡng, chúng tôi xin thông báo sẽ điều chỉnh tăng nhẹ đơn giá khoảng [IncreasePercentage] đối với các dòng sản phẩm liên quan kể từ ngày [EffectiveDate].\n\nNhằm tri ân sự ủng hộ của quý công ty và giảm thiểu áp lực chi phí, tất cả các đơn hàng chính thức được xác nhận và chuyển tiền cọc trước ngày [GraceDeadline] sẽ được chúng tôi cam kết giữ nguyên theo mức giá cũ hiện tại.\n\nRất mong nhận được sự thông cảm sâu sắc từ quý công ty đối với những bất tiện phát sinh này. Đính kèm thư là bảng giá điều chỉnh chi tiết.",
          "ja": "[ClientName] 様\n\n平素は格別のご愛顧を賜り心より御礼申し上げます。\n\nさて、昨今の世界的な原材料相場の高騰に伴い、主要部材（[MaterialType]）の調達コストが急激に上昇しております。弊社といたしましても諸経費の削減に努めてまいりましたが、自社努力のみでは吸収困難な状況に至りました。\n\nつきましては、製品品質の維持と安定供給を継続するため、誠に心苦しい限りではございますが、[EffectiveDate] 受注分より約 [IncreasePercentage] の価格改定を実施させていただく運びとなりました。\n\nなお、長年のお取引への感謝といたしまして、[GraceDeadline] までに確定いただいたご注文につきましては、従来価格にて対応させていただきます。何卒諸事情をご賢察の上、ご理解を賜りますようお願い申し上げます。",
          "en": "Dear [ClientName],\n\nThank you sincerely for your ongoing trust in our products and manufacturing standards.\n\nRecently, global market surges have dramatically escalated upstream costs for core raw materials ([MaterialType]). Although we have absorbed cost pressures through internal optimizations, current price levels have surpassed sustainable thresholds.\n\nTo uphold our strict quality benchmarks and uninterrupted supply stability, we must implement a modest price adjustment of approximately [IncreasePercentage] effective [EffectiveDate].\n\nAs a token of our valued partnership, all formal purchase orders confirmed with deposits prior to [GraceDeadline] will be honored at current pricing. We apologize for any budgetary inconvenience and appreciate your kind understanding."
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n因近期 [MaterialType] 原材料价格大幅上涨，我司产品将于 [EffectiveDate] 起上调 [IncreasePercentage]。[GraceDeadline] 前下单仍按老价格执行，附最新报价单，请查阅！",
        "translations": {
          "vi": "Chào [ClientName], do giá [MaterialType] đợt này tăng cao, công ty mình sẽ điều chỉnh tăng [IncreasePercentage] từ ngày [EffectiveDate]. Trước ngày [GraceDeadline] chốt đơn vẫn giữ giá cũ nhé. Gửi bạn bảng giá mới đính kèm!",
          "ja": "[ClientName] 様、[MaterialType] の高騰に伴い、[EffectiveDate] より [IncreasePercentage] の価格改定を実施いたします。[GraceDeadline] までの発注は旧価格を適用いたします。",
          "en": "Hi [ClientName], due to surging [MaterialType] costs, prices will adjust by [IncreasePercentage] on [EffectiveDate]. Orders placed before [GraceDeadline] will enjoy current rates. Price list attached!"
        }
      }
    },
    {
      "id": "email_012_contract_signing",
      "category": "emails",
      "subject": {
        "zh": "【合同确认】关于 [ProjectName] 的正式外贸销售合同（第 [ContractNo] 号）签署与定金安排",
        "vi": "【Xác nhận hợp đồng】Về việc ký kết hợp đồng ngoại thương chính thức (Số [ContractNo]) cho dự án [ProjectName] & thu xếp tiền cọc",
        "ja": "【契約締結のご確認】[ProjectName] に関する正式売買契約書（契約番号：[ContractNo]）の締結および前払金について",
        "en": "Contract Finalization: Sales & Purchase Agreement No. [ContractNo] for [ProjectName]"
      },
      "recipientType": {
        "zh": "客户方法定代表 / 采购总监",
        "vi": "Đại diện pháp luật / Giám đốc mua hàng đối tác",
        "ja": "代表権者 / 調達・法務責任者",
        "en": "Authorized Signatory / Purchasing Director"
      },
      "purpose": {
        "zh": "完成价格与条款谈判后，向客户发送正式双方盖章签字的外贸销售合同（Sales Contract），并指导签署回传与定金汇款流程。",
        "vi": "Sau khi thống nhất đàm phán, gửi hợp đồng ngoại thương (Sales Contract) chính thức có đóng dấu chữ ký, hướng dẫn đối tác ký gửi lại và tiến hành thanh toán tiền cọc.",
        "ja": "商談妥結後、社印捺印済みの正式売買契約書（Sales Contract）を送付し、署名返送および手付金（前受金）送金手続きを案内する。",
        "en": "Transmit officially signed/sealed Sales Contract following negotiations, advising countersigning and deposit wire instructions."
      },
      "placeholders": [
        {
          "key": "ClientName",
          "label": {
            "vi": "Tên đối tác",
            "en": "Partner Name",
            "ja": "相手先担当者名"
          },
          "example": "张总 (Director Zhang)"
        },
        {
          "key": "ProjectName",
          "label": {
            "vi": "Tên dự án / sản phẩm",
            "en": "Project / Product Name",
            "ja": "プロジェクト・品名"
          },
          "example": "5000台高精度工业传感器 (Industrial Sensors)"
        },
        {
          "key": "ContractNo",
          "label": {
            "vi": "Số hợp đồng",
            "en": "Contract Number",
            "ja": "契約番号"
          },
          "example": "SC-2026-VN889"
        },
        {
          "key": "DepositPercentage",
          "label": {
            "vi": "Tỷ lệ tiền cọc",
            "en": "Deposit Percentage",
            "ja": "手付金比率"
          },
          "example": "30%"
        },
        {
          "key": "BankDeadline",
          "label": {
            "vi": "Hạn chuyển tiền cọc",
            "en": "Deposit Deadline",
            "ja": "送金期限"
          },
          "example": "2026年11月15日"
        }
      ],
      "keyPhrases": [
        {
          "zh": "签字盖章",
          "pinyin": "qiānzì gàizhāng",
          "translations": {
            "vi": "ký tên và đóng dấu",
            "ja": "署名捺印",
            "en": "sign and seal"
          }
        },
        {
          "zh": "电汇定金",
          "pinyin": "diànhuì dìngjīn",
          "translations": {
            "vi": "chuyển khoản cọc bằng điện T/T",
            "ja": "電信送金による手付金支払",
            "en": "wire transfer deposit"
          }
        },
        {
          "zh": "各执一份",
          "pinyin": "gè zhí yī fèn",
          "translations": {
            "vi": "mỗi bên giữ một bản",
            "ja": "各自一通を保有する",
            "en": "each party holds one copy"
          }
        },
        {
          "zh": "如期交货",
          "pinyin": "rúqī jiāohuò",
          "translations": {
            "vi": "giao hàng đúng thời hạn đã định",
            "ja": "期日通りの納品",
            "en": "deliver on schedule"
          }
        }
      ],
      "bodyFormal": {
        "zh": "尊敬的 [ClientName]：\n\n您好！\n\n非常荣幸能与贵司达成关于 [ProjectName] 的合作共识。根据双方在前期会谈中所最终确认的产品规格、单价、交货期以及相关商务条款，我司已正式拟定外贸销售合同（Sales Contract, 编号：[ContractNo]）。\n\n随信附上我司已签字并加盖公章的合同高清扫描件（PDF格式）以及正本银行公户汇款信息（PI & Banking Details）。\n\n为确保后续备料和生产进度能如期推进，烦请贵司协助办理以下后续事宜：\n1. 请贵司授权代表在合同上签字盖章，并在签署后将扫描件回传我司留档；\n2. 请贵司财务部门根据合同约定条款，于 [BankDeadline] 前安排支付 [DepositPercentage] 的预付定金，并在电汇完成后将水单（Bank Slip）发予我们以便我司财务查账锁定汇率。\n\n收到定金水单后，我司将立即启动车间备料与批量生产流程，并按周向贵司汇报排产进展，全力保障如期交付优质产品。\n\n如有任何条款疑问或需要调整之处，请随时与我们保持沟通。再次感谢贵司的信任，期待我们长久共赢的合作！\n\n顺祝商祺！",
        "translations": {
          "vi": "Kính gửi [ClientName],\n\nXin chào quý vị!\n\nChúng tôi rất vinh hạnh được đồng hành và đạt được thỏa thuận hợp tác cùng quý công ty đối với dự án [ProjectName]. Dựa trên các thông số kỹ thuật, đơn giá, thời hạn giao hàng và các điều khoản thương mại đã được hai bên thống nhất, công ty chúng tôi đã chính thức lập Hợp đồng Mua bán Ngoại thương (Sales Contract, Số hiệu: [ContractNo]).\n\nĐính kèm thư này là bản scan độ phân giải cao của Hợp đồng đã có chữ ký đại diện và đóng dấu mộc của công ty chúng tôi (định dạng PDF), cùng thông tin tài khoản ngân hàng chính thức (PI & Banking Details).\n\nNhằm bảo đảm tiến độ chuẩn bị nguyên vật liệu và kế hoạch sản xuất diễn ra đúng thời hạn, kính đề nghị quý công ty hỗ trợ thực hiện các bước sau:\n1. Đại diện có thẩm quyền của quý công ty vui lòng ký tên, đóng dấu lên hợp đồng và gửi lại bản scan qua email để chúng tôi lưu hồ sơ;\n2. Bộ phận tài chính quý công ty thu xếp thanh toán khoản tiền cọc [DepositPercentage] trước ngày [BankDeadline], đồng thời gửi lại điện chuyển tiền (Bank Slip) để chúng tôi theo dõi ghi nhận tài khoản.\n\nNgay khi nhận được xác nhận thanh toán cọc, chúng tôi sẽ lập tức kích hoạt quy trình chuẩn bị vật tư và sản xuất hàng loạt, định kỳ cập nhật tiến độ mỗi tuần để bảo đảm giao hàng đúng hẹn và đạt chất lượng cao nhất.\n\nTrân trọng và kính chúc việc kinh doanh phát đạt!",
          "ja": "[ClientName] 様\n\n平素は大変お世話になっております。\n\nこのたびは [ProjectName] に関する商談が合意に達しましたこと、心より光栄に存じます。事前協議にて双方が合意いたしました製品仕様、単価、納期および諸条件に基づき、正式な売買契約書（Sales Contract、契約番号：[ContractNo]）を作成いたしました。\n\n添付ファイルにて、弊社代表者署名・社印捺印済みの契約書スキャン（PDF）および正式銀行送金口座情報（PI & Banking Details）をお送りいたします。\n\n今後の部材手配および生産スケジュールの遅延を防ぐため、誠に恐縮ではございますが、以下の手続きをお願い申し上げます：\n1. 貴社の権限者様にて署名捺印の上、スキャンPDFをご返送くださいますようお願い申し上げます。\n2. 契約条項に基づき、[BankDeadline] までに [DepositPercentage] の手付金（前受金）のお振込み手続きをいただき、送金受領証（Bank Slip）をご送付ください。\n\n手付金の確認が取れ次第、直ちに生産ラインを稼働させ、週次で進捗をご報告いたします。今後とも何卒よろしくお願い申し上げます。",
          "en": "Dear [ClientName],\n\nGreetings!\n\nIt is our great pleasure to partner with your esteemed company on [ProjectName]. Based on our mutually finalized technical specifications, unit prices, delivery schedule, and trade terms, we have executed the formal Sales Contract (Contract No.: [ContractNo]).\n\nAttached please find the high-resolution scanned copy of the contract, signed and sealed by our authorized representative, along with our official Proforma Invoice and Banking Instructions.\n\nTo ensure our production scheduling and material procurement proceed without delay, please kindly assist with the following next steps:\n1. Have your authorized signatory countersign and seal the contract, returning a scanned copy for our official records;\n2. Instruct your finance team to remit the [DepositPercentage] advance deposit prior to [BankDeadline] and share the bank swift slip for accounting confirmation.\n\nUpon deposit receipt, mass production will commence immediately, and weekly status updates will follow to ensure punctual delivery. Thank you again for your trust and collaboration!"
        }
      },
      "bodyConcise": {
        "zh": "[ClientName] 您好：\n双方确认的 [ProjectName] 正式销售合同（第 [ContractNo] 号）已拟好附在信中，请查阅签字盖章并回传。烦请于 [BankDeadline] 前安排 [DepositPercentage] 定金以便排单生产，祝合作愉快！",
        "translations": {
          "vi": "Chào [ClientName], hợp đồng chính thức cho [ProjectName] (Số [ContractNo]) đã được chuẩn bị xong đính kèm email. Bạn kiểm tra, ký đóng dấu gửi lại giúp mình nhé. Nhờ bên bạn thu xếp [DepositPercentage] tiền cọc trước [BankDeadline] để xưởng bắt đầu chạy sản xuất nhé!",
          "ja": "[ClientName] 様、[ProjectName] の正式売買契約書（番号：[ContractNo]）を添付いたします。ご確認の上、署名捺印をご返送ください。また [BankDeadline] までに [DepositPercentage] の前受金お手続きをお願いいたします。",
          "en": "Hi [ClientName], the finalized Sales Contract No. [ContractNo] for [ProjectName] is attached. Please sign, seal and return a copy. Kindly arrange the [DepositPercentage] deposit before [BankDeadline] so we can kick off production!"
        }
      }
    }
  ],
  "tradeDocuments": [
    {
      "id": "doc_001_commercial_invoice",
      "nameZh": "商业发票",
      "pinyin": "shāngyè fāpiào",
      "nameVi": "Hóa đơn thương mại (Commercial Invoice)",
      "nameEn": "Commercial Invoice (CI)",
      "nameJa": "商業送り状（コマーシャル・インボイス）",
      "purpose": {
        "vi": "Chứng từ kế toán và hải quan căn bản nhất do bên bán phát hành, kê khai chi tiết giá trị hàng hóa, số lượng, đơn giá, điều kiện giao hàng và phương thức thanh toán để tính thuế nhập khẩu.",
        "ja": "輸出者が作成する最重要書類。貨物の品名、数量、単価、総額、貿易条件、支払条件が記載され、輸入通関時の関税計算の基礎となります。",
        "en": "The core legal accounting and customs document issued by the seller declaring goods, unit prices, total value, and terms of delivery for duty calculation."
      },
      "distinctionTip": {
        "vi": "⚠️ Khác biệt với 形式发票 (Proforma Invoice - P/I): P/I chỉ là hóa đơn chiếu lệ dự thảo để đặt cọc hoặc xin giấy phép nhập khẩu, KHÔNG có giá trị khai thuế kế toán; trong khi 商业发票 (Commercial Invoice) là chứng từ nợ tiền chính thức phát hành khi hàng đã sẵn sàng xuất bến.",
        "ja": "⚠️ プロフォーマインボイス（P/I）との違い：P/Iは事前確認・前金決済用の仮書類（税務上無効）ですが、商業インボイス（C/I）は確定した債権請求書であり税関申告の法的原本です。",
        "en": "⚠️ Distinction from Proforma Invoice (P/I): A P/I is merely an advance estimate for opening L/C or paying deposits. The Commercial Invoice is the final legally binding invoice issued upon shipment."
      },
      "standardFields": [
        {
          "fieldZh": "发货人 / 出口商 (Shipper / Exporter)",
          "fieldEn": "Shipper / Exporter",
          "pinyin": "fāhuò rén / chūkǒu shāng",
          "explanation": {
            "vi": "Tên, địa chỉ, số điện thoại của bên bán / nhà xuất khẩu.",
            "ja": "輸出者（売り手）の会社名、住所、連絡先。",
            "en": "Name, address, and contact details of the selling entity."
          },
          "sampleValue": "Guangdong Tech Import & Export Co., Ltd."
        },
        {
          "fieldZh": "收货人 / 进口商 (Consignee)",
          "fieldEn": "Consignee",
          "pinyin": "shōuhuò rén / jìnkǒu shāng",
          "explanation": {
            "vi": "Tên, địa chỉ bên mua / người nhận hàng đứng tên trên tờ khai.",
            "ja": "輸入者（買い手・荷受人）の正式名称と所在地。",
            "en": "Party to whom goods are shipped and delivered."
          },
          "sampleValue": "Vietnam Global Supply Chain JSC, Hanoi"
        },
        {
          "fieldZh": "贸易术语 (Incoterms & Price Term)",
          "fieldEn": "Price Term / Incoterms",
          "pinyin": "màoyì shùyǔ",
          "explanation": {
            "vi": "Điều kiện giao hàng theo Incoterms 2020 kèm địa điểm xác định (ví dụ: FOB Shenzhen, CIF Haiphong).",
            "ja": "インコタームズ2020に基づく受渡条件（例：FOB Shenzhen、CIF Haiphong）。",
            "en": "Incoterms trade condition with named place (e.g. FOB Shenzhen)."
          },
          "sampleValue": "FOB Shenzhen (Incoterms 2020)"
        },
        {
          "fieldZh": "商品编码 (HS Code)",
          "fieldEn": "HS Code",
          "pinyin": "shāngpǐn biāomǎ",
          "explanation": {
            "vi": "Mã số phân loại quốc tế 6 đến 10 chữ số dùng để áp mức thuế suất hải quan.",
            "ja": "世界共通の品目分類コード（6〜10桁）。関税率決定の根拠。",
            "en": "Harmonized System 6-10 digit tariff classification number."
          },
          "sampleValue": "8504.40.90"
        },
        {
          "fieldZh": "发票总金额 (Total Invoice Amount)",
          "fieldEn": "Total Amount",
          "pinyin": "fāpiào zǒng jīné",
          "explanation": {
            "vi": "Tổng số tiền viết bằng cả số và chữ kèm loại tiền tệ (USD, EUR, RMB).",
            "ja": "通貨単位（USD等）を明記した請求総額（算用数字およびスペルアウト英語表記）。",
            "en": "Grand total payable written in figures and words."
          },
          "sampleValue": "USD 54,200.00 (Say US Dollars Fifty-Four Thousand Two Hundred Only)"
        }
      ]
    },
    {
      "id": "doc_002_packing_list",
      "nameZh": "装箱单",
      "pinyin": "zhuāngxiāng dān",
      "nameVi": "Phiếu đóng gói hàng hóa (Packing List)",
      "nameEn": "Packing List (P/L)",
      "nameJa": "梱包明細書（パッキングリスト）",
      "purpose": {
        "vi": "Kê khai chi tiết số kiện, quy cách đóng gói, trọng lượng tịnh (Net Weight), trọng lượng cả bì (Gross Weight), thể tích (CBM) để hải quan kiểm hóa và kho vận sắp xếp bốc dỡ.",
        "ja": "個々の荷物の梱包番号、内容品、正味重量（Net Weight）、総重量（Gross Weight）、容積（CBM）を詳細に記したリスト。",
        "en": "Itemizes the contents, package numbers, net weight, gross weight, and volume for freight handling and customs verification."
      },
      "distinctionTip": {
        "vi": "💡 装箱单 (Packing List) KHÔNG ghi đơn giá hay số tiền thanh toán (khác với hóa đơn thương mại), mục đích chỉ phục vụ vận chuyển, kiểm đếm vật lý và đóng container.",
        "ja": "💡 パッキングリストには金額や単価を記載しないのが通例です（商業インボイスとの違い）。物理的な重量・容積・荷姿の把握に特化した書類です。",
        "en": "💡 A Packing List typically omits monetary prices; its exclusive purpose is verifying physical package count, weight, and cubic volume."
      },
      "standardFields": [
        {
          "fieldZh": "唛头 / 运输标记 (Shipping Marks)",
          "fieldEn": "Shipping Marks & Numbers",
          "pinyin": "màitóu / yùnshū biāojì",
          "explanation": {
            "vi": "Ký mã hiệu in trên vỏ thùng carton để nhận diện hàng hóa khi bốc dỡ.",
            "ja": "荷物の外装に印刷される識別マーク（企業名略称、仕向地、箱番号等）。",
            "en": "Identification markings printed on cartons for cargo handling."
          },
          "sampleValue": "VGSC / HAIPHONG / C/NO. 1-250"
        },
        {
          "fieldZh": "包装类型与总箱数 (Packages & Quantity)",
          "fieldEn": "Total Packages",
          "pinyin": "bāozhuāng lèixíng yǔ zǒng xiāngshù",
          "explanation": {
            "vi": "Số lượng kiện đóng gói (thùng carton, pallet, kiện gỗ, cuộn).",
            "ja": "ダンボール箱（Cartons）、パレット（Pallets）などの荷姿と総個数。",
            "en": "Total number of outer packages (cartons, pallets, drums)."
          },
          "sampleValue": "250 Cartons on 10 Wooden Pallets"
        },
        {
          "fieldZh": "净重 (Net Weight / N.W.)",
          "fieldEn": "Net Weight (N.W.)",
          "pinyin": "jìngzhòng",
          "explanation": {
            "vi": "Trọng lượng thực của sản phẩm (không tính bao bì thùng vỏ).",
            "ja": "梱包資材を含まない、製品そのものの正味重量（kg）。",
            "en": "Actual weight of the goods excluding outer packaging."
          },
          "sampleValue": "4,500.00 KGS"
        },
        {
          "fieldZh": "毛重 (Gross Weight / G.W.)",
          "fieldEn": "Gross Weight (G.W.)",
          "pinyin": "máozhòng",
          "explanation": {
            "vi": "Trọng lượng cả bì (bao gồm sản phẩm + hộp + thùng carton + pallet).",
            "ja": "梱包資材・パレットを含んだ総重量（kg）。クレーン荷重計算の基準。",
            "en": "Total weight including merchandise and all packing materials."
          },
          "sampleValue": "5,120.00 KGS"
        },
        {
          "fieldZh": "总体积 (Measurement / Volume in CBM)",
          "fieldEn": "Measurement / CBM",
          "pinyin": "zǒng tǐjī",
          "explanation": {
            "vi": "Tổng thể tích khối mét khối (CBM = m³) tính cước vận tải biển/hàng không.",
            "ja": "外箱の縦×横×高さを合算した総容積（CBM＝立法メートル）。",
            "en": "Total cubic meters (CBM) of the shipment."
          },
          "sampleValue": "28.50 CBM"
        }
      ]
    },
    {
      "id": "doc_003_bill_of_lading",
      "nameZh": "海运提单",
      "pinyin": "hǎiyùn tídān",
      "nameVi": "Vận đơn đường biển (Bill of Lading - B/L)",
      "nameEn": "Ocean Bill of Lading (B/L)",
      "nameJa": "船荷証券（B/L / Bill of Lading）",
      "purpose": {
        "vi": "Chứng từ nhận hàng của hãng tàu, bằng chứng của hợp đồng vận tải và là CHỨNG TỪ SỞ HỮU HÀNG HÓA có thể chuyển nhượng hoặc ký hậu.",
        "ja": "運送品を受領したことを証明し、運送契約を証する有価証券。荷受人が貨物の引き渡しを請求できる権利証券。",
        "en": "A legal document issued by an ocean carrier acknowledging cargo receipt; acts as a title document and receipt of goods."
      },
      "distinctionTip": {
        "vi": "⚠️ Bản gốc (Original B/L) có giá trị sở hữu tài sản: ai cầm bản gốc ký hậu hợp lệ mới được lấy hàng. Ngược lại, Điện giao hàng (Telex Release) là hình thức hãng tàu phát lệnh giải phóng hàng bằng điện tử mà không cần xuất trình bản gốc tại cảng đến.",
        "ja": "⚠️ オリジナルB/L（原本）は裏書によって権利譲渡可能な有価証券です。対してサレンダーB/L（テレックス・リリース）は原本を回収し電子的に荷渡しを許可する迅速な運用です。",
        "en": "⚠️ An Original B/L is a negotiable document of title required at destination. A Telex Release surrenders the physical original, authorizing immediate digital release."
      },
      "standardFields": [
        {
          "fieldZh": "装运港 (Port of Loading - POL)",
          "fieldEn": "Port of Loading",
          "pinyin": "zhuāngyùn gǎng",
          "explanation": {
            "vi": "Cảng bốc hàng lên tàu tại nước xuất khẩu.",
            "ja": "輸出国の貨物積込港（例：上海港、深圳塩田港）。",
            "en": "Port where the goods are loaded onto the ocean vessel."
          },
          "sampleValue": "Shenzhen, China (Yantian Port)"
        },
        {
          "fieldZh": "卸货港 (Port of Discharge - POD)",
          "fieldEn": "Port of Discharge",
          "pinyin": "xièhuò gǎng",
          "explanation": {
            "vi": "Cảng dỡ hàng tại nước nhập khẩu.",
            "ja": "輸入国の貨物陸揚港（例：ハイフォン港、東京港）。",
            "en": "Port where goods are unloaded from the vessel."
          },
          "sampleValue": "Haiphong, Vietnam"
        },
        {
          "fieldZh": "船名航次 (Vessel & Voyage No.)",
          "fieldEn": "Vessel / Voyage",
          "pinyin": "chuánmíng hángcì",
          "explanation": {
            "vi": "Tên con tàu chuyên chở và mã hiệu chuyến hải trình.",
            "ja": "貨物を運ぶ本船の名称および航海番号。",
            "en": "Name of the ocean carrier ship and trip sequence code."
          },
          "sampleValue": "EVER GIVEN V.0321W"
        },
        {
          "fieldZh": "集装箱号与封条号 (Container & Seal No.)",
          "fieldEn": "Container No. / Seal No.",
          "pinyin": "jízhuāngxiāng hào yǔ fēngtiáo hào",
          "explanation": {
            "vi": "Mã hiệu 11 ký tự của container (ví dụ: TCKU1234567) và số chì niêm phong.",
            "ja": "4桁英字+7桁数字のコンテナ識別番号および不正開封防止のシール番号。",
            "en": "Unique intermodal container letters/digits and secure bolt seal number."
          },
          "sampleValue": "EMCU9823412 / SEAL: ML-VN99281"
        },
        {
          "fieldZh": "运费支付方式 (Freight Payable)",
          "fieldEn": "Freight Term",
          "pinyin": "yùnfèi zhīfù fāngshì",
          "explanation": {
            "vi": "Freight Prepaid (Cước trả trước tại cảng đi - thường dùng trong CIF/CFR) hoặc Freight Collect (Cước thu sau tại cảng đến - thường dùng trong FOB).",
            "ja": "「Freight Prepaid」（元払い/売り手負担）か「Freight Collect」（着払い/買い手負担）かの明記。",
            "en": "Freight Prepaid (origin paid - CIF/CFR) or Freight Collect (destination paid - FOB)."
          },
          "sampleValue": "Freight Prepaid"
        }
      ]
    },
    {
      "id": "doc_004_certificate_of_origin",
      "nameZh": "原产地证书",
      "pinyin": "yuánchǎndì zhèngshū",
      "nameVi": "Chứng nhận xuất xứ hàng hóa (Certificate of Origin - C/O)",
      "nameEn": "Certificate of Origin (C/O)",
      "nameJa": "原産地証明書（C/O）",
      "purpose": {
        "vi": "Chứng minh nguồn gốc quốc gia nơi sản xuất ra hàng hóa, phục vụ việc hưởng ưu đãi thuế quan đặc biệt theo các hiệp định thương mại tự do (như ACFTA Form E giữa Trung Quốc và ASEAN).",
        "ja": "貨物の原産国を公的に証明する書類。自由貿易協定（FTA/EPA）に基づく特恵関税の減免適用を受けるための必須書類。",
        "en": "Certifies the country where goods were manufactured to claim preferential tariff treatments under FTAs."
      },
      "distinctionTip": {
        "vi": "💡 Tại Việt Nam khi nhập khẩu từ Trung Quốc, bắt buộc dùng Form E (Hiệp định ASEAN - Trung Quốc ACFTA) để được giảm thuế về 0% hoặc mức rất thấp. Dùng C/O phổ thông thông thường (CO Non-preferential) sẽ KHÔNG được giảm thuế.",
        "ja": "💡 中国からベトナムへの輸入では「Form E」（中国・ASEAN FTA特恵）の取得が極めて重要です。一般原産地証では特恵関税の恩恵を受けられません。",
        "en": "💡 Importers in Vietnam utilize Form E under ACFTA to secure zero or reduced tariff rates. Standard non-preferential COs provide no duty relief."
      },
      "standardFields": [
        {
          "fieldZh": "发货人与生产商 (Exporter & Manufacturer)",
          "fieldEn": "Exporter / Producer",
          "pinyin": "fāhuò rén yǔ shēngchǎn shāng",
          "explanation": {
            "vi": "Doanh nghiệp xuất khẩu và cơ sở nhà máy sản xuất tại nước xuất xứ.",
            "ja": "輸出者および原産地国内の製造工場名。",
            "en": "Registered exporter and manufacturing facility."
          },
          "sampleValue": "Zhejiang Electrical Appliances Co., Ltd."
        },
        {
          "fieldZh": "原产地标准 (Origin Criteria)",
          "fieldEn": "Origin Criteria",
          "pinyin": "yuánchǎndì biāozhǔn",
          "explanation": {
            "vi": "Tiêu chí xuất xứ: \"WO\" (Wholly Obtained - thuần túy) hoặc tỷ lệ hàm lượng giá trị khu vực RVC (ví dụ: RVC ≥ 40%).",
            "ja": "完全生産品（WO）または付加価値基準（RVC 40%以上）などの満たすべき原産地規則。",
            "en": "Rules met, such as Wholly Obtained (WO) or Regional Value Content (RVC ≥ 40%)."
          },
          "sampleValue": "RVC 45%"
        },
        {
          "fieldZh": "发票编号与日期 (Invoice No. & Date)",
          "fieldEn": "Invoice No. & Date",
          "pinyin": "fāpiào biānhào yǔ rìqī",
          "explanation": {
            "vi": "Số hóa đơn và ngày lập hóa đơn phải trùng khớp 100% với Commercial Invoice.",
            "ja": "商業インボイスの番号と日付と完全に合致している必要があります。",
            "en": "Must mirror the Commercial Invoice number and date without discrepancy."
          },
          "sampleValue": "INV-2026-9901 / 2026-10-25"
        },
        {
          "fieldZh": "签证机构印章与签字 (Issuing Authority)",
          "fieldEn": "Official Certification Stamp",
          "pinyin": "qiānzhèng jīgòu yìnzhāng yǔ qiānzì",
          "explanation": {
            "vi": "Dấu mộc và chữ ký của cơ quan thẩm quyền (Hải quan Trung Quốc hoặc CCPIT).",
            "ja": "公認発行機関（中国海関または中国国際貿易促進委員会 CCPIT）の印章と署名。",
            "en": "Stamp and signature of designated authority (China Customs or CCPIT)."
          },
          "sampleValue": "Customs of the People's Republic of China"
        }
      ]
    },
    {
      "id": "doc_005_customs_declaration",
      "nameZh": "报关单",
      "pinyin": "bàoguān dān",
      "nameVi": "Tờ khai hải quan (Customs Declaration)",
      "nameEn": "Customs Declaration",
      "nameJa": "輸出入申告書（税関申告書）",
      "purpose": {
        "vi": "Văn bản pháp lý người khai hải quan nộp cho cơ quan Hải quan để kê khai chi tiết các thông tin về lô hàng phục vụ việc kiểm tra, tính thuế và thông quan hàng hóa.",
        "ja": "輸出入者が税関に対し、貨物の品目、数量、価格、原産地、関税額等を公式に申告するための法的書式。",
        "en": "Statutory form submitted to customs authorities specifying goods, values, classification, and applicable taxes."
      },
      "distinctionTip": {
        "vi": "💡 Tờ khai phân luồng gồm: Luồng Xanh (miễn kiểm, thông quan tự động), Luồng Vàng (kiểm tra hồ sơ giấy tờ), Luồng Đỏ (kiểm tra thực tế hàng hóa container).",
        "ja": "💡 ベトナム等の通関では審査区分（グリーン：即時許可、イエロー：書類審査、レッド：現物検査）により通関日数が大きく変わります。",
        "en": "💡 Customs channels: Green Channel (paperless clearance), Yellow Channel (document check), Red Channel (physical container inspection)."
      },
      "standardFields": [
        {
          "fieldZh": "海关编号 / 申报单号 (Declaration No.)",
          "fieldEn": "Declaration Number",
          "pinyin": "hǎiguān biāohào",
          "explanation": {
            "vi": "Dãy số định danh duy nhất của tờ khai hải quan điện tử.",
            "ja": "電子通関システム（VNACCS等）で採番される固有申告番号。",
            "en": "Unique alphanumeric identifier issued by the national customs database."
          },
          "sampleValue": "106294821920"
        },
        {
          "fieldZh": "申报价值与币种 (Declared Value & Currency)",
          "fieldEn": "Customs Value & Currency",
          "pinyin": "shēnbào jiàzhí yǔ bìzhǒng",
          "explanation": {
            "vi": "Trị giá tính thuế hải quan quy đổi ra tiền nội tệ hoặc USD theo tỷ giá quy định.",
            "ja": "公示レートに基づき換算される関税評価額。",
            "en": "Dutiable transaction value converted at current customs exchange rates."
          },
          "sampleValue": "VND 1,280,500,000 (USD 52,000)"
        },
        {
          "fieldZh": "关税与增值税 (Duty & VAT Payable)",
          "fieldEn": "Tariff & VAT Amount",
          "pinyin": "guānshuì yǔ zēngzhíshuì",
          "explanation": {
            "vi": "Số tiền thuế nhập khẩu và thuế giá trị gia tăng (VAT) phải nộp vào ngân sách nhà nước.",
            "ja": "納付すべき輸入関税および輸入付加価値税（VAT）。",
            "en": "Calculated import duties and value-added tax to be deposited."
          },
          "sampleValue": "Duty: 0% (Form E) / VAT: 8% (VND 102,440,000)"
        }
      ]
    },
    {
      "id": "doc_006_air_waybill",
      "nameZh": "空运单 (AWB)",
      "pinyin": "kōngyùn dān",
      "nameVi": "Vận đơn hàng không (Air Waybill - AWB)",
      "nameEn": "Air Waybill (AWB)",
      "nameJa": "航空貨物運送状（Air Waybill）",
      "purpose": {
        "vi": "Chứng từ vận chuyển đường hàng không do hãng bay hoặc đại lý phát hành, vừa là biên lai nhận hàng vừa là hợp đồng vận chuyển.",
        "ja": "航空貨物輸送において航空会社またはフォワーダーが発行する受取証兼運送契約書。",
        "en": "A non-negotiable transport document issued by an airline or forwarder covering the carriage of goods by air."
      },
      "distinctionTip": {
        "vi": "⚠️ Điểm cốt yếu: Vận đơn hàng không (AWB) KHÔNG PHẢI là chứng từ sở hữu hàng hóa (Non-negotiable). Người nhận hàng (Consignee) có thể nhận hàng chỉ bằng việc chứng minh danh tính mà không cần xuất trình AWB gốc như vận đơn đường biển (B/L).",
        "ja": "⚠️ 最重要注意点：航空運送状（AWB）は海上B/Lと異なり「有価証券（流通証券）」ではありません。名宛人（Consignee）は身元確認のみで貨物を引き取れるため、信用状（L/C）取引時は代金回収リスクに注意が必要です。",
        "en": "⚠️ Crucial distinction: Unlike an ocean Bill of Lading, an Air Waybill is strictly non-negotiable and does NOT represent title to the goods. Consignees can take delivery without surrendering original paper."
      },
      "standardFields": [
        {
          "fieldZh": "主单号与分单号 (MAWB / HAWB No.)",
          "fieldEn": "Master AWB / House AWB Number",
          "pinyin": "zhǔ dānhào yǔ fēn dānhào",
          "explanation": {
            "vi": "MAWB do hãng hàng không phát hành (3 số tiền tố hãng + 8 số), HAWB do đại lý logistics phát hành.",
            "ja": "航空会社発行のMAWB（航空会社コード3桁＋8桁）とフォワーダー発行のHAWB。",
            "en": "Master AWB issued by operating airline; House AWB issued by freight forwarder."
          },
          "sampleValue": "MAWB: 784-12345675 / HAWB: SGN-CAN-202610-09"
        },
        {
          "fieldZh": "始发机场与目的机场 (Airport of Departure & Destination)",
          "fieldEn": "Airport of Departure & Destination (IATA 3-letter codes)",
          "pinyin": "shǐfā jīchǎng yǔ mùdì jīchǎng",
          "explanation": {
            "vi": "Mã IATA 3 ký tự của sân bay đi và sân bay đến (ví dụ: SGN - TSN, CAN - HAN).",
            "ja": "出発地・到着地空港の3文字IATAコード。",
            "en": "Standard 3-letter IATA airport codes."
          },
          "sampleValue": "CAN (Guangzhou Baiyun) -> HAN (Hanoi Noi Bai)"
        },
        {
          "fieldZh": "计费重量 (Chargeable Weight)",
          "fieldEn": "Chargeable Weight (Gross vs. Volumetric)",
          "pinyin": "jìfèi zhòngliàng",
          "explanation": {
            "vi": "Trọng lượng tính cước: chọn giá trị lớn hơn giữa Trọng lượng thực (Gross Weight) và Trọng lượng quy đổi thể tích (Volume / 6000 hoặc / 5000).",
            "ja": "容積重量（長x幅x高/6000）と実重量のうち大きい方の課金重量。",
            "en": "Higher of actual gross weight or volumetric weight (CBM x 167 kg)."
          },
          "sampleValue": "Gross: 320 kg / Vol: 410 kg -> Chargeable: 410 kg"
        }
      ]
    },
    {
      "id": "doc_007_purchase_order",
      "nameZh": "采购订单 (PO)",
      "pinyin": "cǎigòu dìngdān",
      "nameVi": "Đơn đặt hàng (Purchase Order - P/O)",
      "nameEn": "Purchase Order (PO)",
      "nameJa": "発注書・購買注文書（Purchase Order）",
      "purpose": {
        "vi": "Văn bản cam kết mua hàng chính thức do người mua gửi cho người bán, nêu rõ chủng loại, số lượng, quy cách, đơn giá và thời hạn giao hàng cam kết.",
        "ja": "買い手（発注者）が売り手（受注者）に対して発行する正式な購入申込み・確定発注文書。",
        "en": "A commercial document and first official offer issued by a buyer to a seller indicating types, quantities, and agreed prices."
      },
      "distinctionTip": {
        "vi": "💡 Phân biệt P/O và Hợp đồng: Khi người bán ký xác nhận (P/O Confirmation / Countersign) thì P/O có hiệu lực tương đương một hợp đồng mua bán ràng buộc pháp lý giữa hai bên.",
        "ja": "💡 契約との関係：売り手がPOを受理し署名・返送（受注確認）した時点で、法的に有効な売買契約が成立します。",
        "en": "💡 Legal binding: Once countersigned or formally acknowledged by the supplier, a PO constitutes a legally binding contract."
      },
      "standardFields": [
        {
          "fieldZh": "采购单号 (PO Number)",
          "fieldEn": "PO Number",
          "pinyin": "cǎigòu dānhào",
          "explanation": {
            "vi": "Số hiệu đơn mua hàng dùng làm căn cứ thanh toán và tham chiếu xuyên suốt quá trình sản xuất.",
            "ja": "社内管理およびサプライヤー連携用の一意な発注番号。",
            "en": "Unique order identifier referenced on all subsequent shipping docs."
          },
          "sampleValue": "PO-2026-OCT-8821"
        },
        {
          "fieldZh": "交付期日 (Delivery Date / Lead Time)",
          "fieldEn": "Agreed Delivery Date / ETD",
          "pinyin": "jiāofù qīrì",
          "explanation": {
            "vi": "Ngày nhà máy phải hoàn thành đơn hàng hoặc ngày tàu rời cảng theo thỏa thuận.",
            "ja": "工場出荷日または本船積載予定期日。",
            "en": "Mandatory completion or vessel loading deadline."
          },
          "sampleValue": "2026-11-25 (Ex-factory or FOB Loading)"
        },
        {
          "fieldZh": "质量与验收标准 (Quality Standard & Inspection Terms)",
          "fieldEn": "Inspection & Acceptance Criteria",
          "pinyin": "zhìliàng yǔ yànshōu biāozhǔn",
          "explanation": {
            "vi": "Tiêu chuẩn kiểm nghiệm hàng hóa (ví dụ: AQL 1.5/4.0, kiểm định bởi bên thứ ba SGS/TUV).",
            "ja": "検査基準および受入合否基準（例：AQL Level II、SGS検品）。",
            "en": "Acceptance quality limit and designated third-party inspection agent."
          },
          "sampleValue": "AQL 2.5 Major / 4.0 Minor inspection before balance payment"
        }
      ]
    },
    {
      "id": "doc_008_proforma_invoice",
      "nameZh": "形式发票 (PI)",
      "pinyin": "xíngshì fāpiào",
      "nameVi": "Hóa đơn chiếu lệ (Proforma Invoice - P/I)",
      "nameEn": "Proforma Invoice (PI)",
      "nameJa": "見積送り状・仮インボイス（Proforma Invoice）",
      "purpose": {
        "vi": "Bản hóa đơn dự thảo do bên bán cung cấp trước khi sản xuất hoặc xuất hàng, dùng để người mua tiến hành mở L/C, xin giấy phép nhập khẩu hoặc chuyển tiền đặt cọc (T/T Deposit).",
        "ja": "正式な出荷前に売り手が発行する見積兼仮請求書。信用状（L/C）開設申請や前受金支払いの基礎となります。",
        "en": "A preliminary invoice sent to buyers before shipment or manufacturing, used to arrange letters of credit, import licenses, or deposit transfers."
      },
      "distinctionTip": {
        "vi": "⚠️ Nhớ kỹ: P/I KHÔNG dùng để hạch toán thuế hay thông quan chính thức khi tàu cập bến. Số liệu trên Commercial Invoice thực tế có thể thay đổi nhẹ so với P/I tùy theo sản lượng xuất xưởng.",
        "ja": "⚠️ 会計・税関上の注意点：P/Iは商業インボイスの事前見込書であり、実際の税関申告には船積後の確定Commercial Invoiceが必要です。",
        "en": "⚠️ Key reminder: A PI is not an official demand for final settlement nor valid for final tax declaration at destination customs."
      },
      "standardFields": [
        {
          "fieldZh": "定金与付款条款 (Deposit & Payment Terms)",
          "fieldEn": "Payment Terms (e.g. 30% T/T Advance, 70% against B/L)",
          "pinyin": "dìngjīn yǔ fùkuǎn tiáokuǎn",
          "explanation": {
            "vi": "Quy định chi tiết tỷ lệ tiền cọc để bắt đầu sản xuất và thời hạn thanh toán số tiền còn lại.",
            "ja": "前金手付金比率および残金決済スケジュール。",
            "en": "Advance deposit percentage required to commence production and balance schedule."
          },
          "sampleValue": "30% T/T advance deposit, 70% balance against copy of B/L"
        },
        {
          "fieldZh": "有效期 (Validity Period of Quotation)",
          "fieldEn": "Price Validity Period",
          "pinyin": "yǒuxiàoqī",
          "explanation": {
            "vi": "Thời hạn hiệu lực của đơn giá trên P/I (thường 15-30 ngày do biến động nguyên vật liệu và tỷ giá).",
            "ja": "原材料価格や為替変動を考慮した見積有効期限。",
            "en": "Expiration timeframe for quoted unit prices."
          },
          "sampleValue": "Valid until 15 days from issue date"
        },
        {
          "fieldZh": "银行汇款账户 (Beneficiary Bank Details)",
          "fieldEn": "Beneficiary Bank Account Information",
          "pinyin": "yínháng huìkuǎn zhànghù",
          "explanation": {
            "vi": "Tên người thụ hưởng, tên ngân hàng, số tài khoản USD/CNY và mã SWIFT Code.",
            "ja": "送金先銀行名、口座名義、口座番号、SWIFTコード。",
            "en": "Full banking coordinates including Beneficiary Name, IBAN/Account, and SWIFT Code."
          },
          "sampleValue": "Bank of China Shenzhen Branch / SWIFT: BKCHCNBJ400 / A/C: 7529 1088 2901"
        }
      ]
    },
    {
      "id": "doc_009_sales_contract",
      "nameZh": "国际销售合同",
      "pinyin": "guójì xiàoshòu hétong",
      "nameVi": "Hợp đồng thương mại quốc tế (Sales Contract)",
      "nameEn": "International Sales Contract",
      "nameJa": "国際売買契約書（Sales Contract）",
      "purpose": {
        "vi": "Văn bản pháp lý cao nhất xác lập quyền và nghĩa vụ ràng buộc giữa người mua và người bán trong giao dịch xuất nhập khẩu quốc tế.",
        "ja": "国際売買において買い手と売り手の権利・義務・救済手段を包括的に規定する最高位の法的文書。",
        "en": "The definitive legal agreement establishing all contractual rights, obligations, governing laws, and remedies between cross-border counter-parties."
      },
      "distinctionTip": {
        "vi": "💡 Các điều khoản trọng yếu bắt buộc phải kiểm tra kỹ: Bất khả kháng (Force Majeure), Giải quyết tranh chấp / Trọng tài (Arbitration clause: CIETAC, VIAC, SIAC), và Luật áp dụng (Governing Law).",
        "ja": "💡 重点確認条項：不可抗力条項（Force Majeure）、仲裁地および管轄仲裁機関（CIETAC、SIAC等）、準拠法（Governing Law）は万一の紛争時に最重要となります。",
        "en": "💡 Critical boilerplate clauses: Force Majeure, Dispute Resolution / Arbitration Venue (e.g. CIETAC, SIAC), and Governing Law provisions."
      },
      "standardFields": [
        {
          "fieldZh": "不可抗力条款 (Force Majeure Clause)",
          "fieldEn": "Force Majeure Clause",
          "pinyin": "bùkěkànglì tiáokuǎn",
          "explanation": {
            "vi": "Quy định miễn trách nhiệm khi phát sinh thiên tai, chiến tranh, dịch bệnh ngoài tầm kiểm soát.",
            "ja": "天災、戦争、政府規制等、当事者の合理的支配を超える事由による免責。",
            "en": "Exemption of liabilities resulting from extraordinary acts beyond parties control."
          },
          "sampleValue": "Neither party shall be held liable for delays caused by Force Majeure events"
        },
        {
          "fieldZh": "仲裁条款 (Arbitration & Jurisdiction)",
          "fieldEn": "Dispute Settlement & Arbitration Clause",
          "pinyin": "zhòngcái tiáokuǎn",
          "explanation": {
            "vi": "Địa điểm và hội đồng trọng tài xử lý tranh chấp (ví dụ: SIAC Singapore, CIETAC Beijing).",
            "ja": "紛争解決手段および管轄仲裁機関（例：中国国際経済貿易仲裁委員会 CIETAC）。",
            "en": "Agreed arbitral seat and rules governing dispute resolution."
          },
          "sampleValue": "All disputes shall be submitted to SIAC in Singapore under Singapore Law"
        },
        {
          "fieldZh": "违约金与索赔期 (Liquidated Damages & Claim Period)",
          "fieldEn": "Liquidated Damages & Claim Deadline",
          "pinyin": "wéiyuējīn yǔ suǒpéi qī",
          "explanation": {
            "vi": "Mức phạt chậm giao hàng (% mỗi tuần trễ hạn) và thời hạn tối đa để khiếu nại chất lượng hàng (thường 30-60 ngày sau cập cảng).",
            "ja": "遅延損害金（週あたりペナルティ率）および品質クレーム申立期限。",
            "en": "Late delivery liquidated penalty and maximum quality claim window post arrival."
          },
          "sampleValue": "0.5% per week of delay up to 5%; claims within 30 days of arrival"
        }
      ]
    },
    {
      "id": "doc_010_marine_insurance",
      "nameZh": "货物运输保险单",
      "pinyin": "huòwù yùnshū bǎoxiǎndān",
      "nameVi": "Đơn bảo hiểm hàng hóa vận chuyển (Cargo Marine Insurance Policy)",
      "nameEn": "Cargo Marine Insurance Policy",
      "nameJa": "貨物海上保険証券（Marine Insurance Policy）",
      "purpose": {
        "vi": "Chứng từ bảo hiểm do công ty bảo hiểm cấp nhằm bồi thường các tổn thất, hư hỏng hoặc mất mát của lô hàng trong quá trình vận tải quốc tế.",
        "ja": "国際輸送途上における貨物の滅失・毀損などの損害を補償するため、保険会社が発行する証券。",
        "en": "A legal document issued by an insurer indemnifying the cargo owner against maritime, air, and transit perils."
      },
      "distinctionTip": {
        "vi": "⚠️ Phân biệt điều kiện bảo hiểm: ICC (A) [Mọi rủi ro - All Risks, phạm vi rộng nhất], ICC (B) [Tổn thất do thiên tai va chạm chìm đắm], và ICC (C) [Tổn thất lớn, phạm vi hẹp nhất]. Theo CIF thông thường bên bán phải mua tối thiểu ICC (C) với trị giá 110% giá CIF.",
        "ja": "⚠️ 保険条件の識別：協会貨物約款 ICC(A) [全危険担保/All Risks]、ICC(B) [限定担保]、ICC(C) [最小担保]。CIF取引では売主は通常CIF価格の110%で最低ICC(C)以上の保険を付保します。",
        "en": "⚠️ Coverage types: Institute Cargo Clauses ICC (A) [All Risks], ICC (B), and ICC (C). Under Incoterms CIF, standard baseline coverage is 110% of CIF invoice value under ICC (C) or ICC (A)."
      },
      "standardFields": [
        {
          "fieldZh": "保险险别 (Clauses / Coverage Terms)",
          "fieldEn": "Insurance Conditions (ICC A, B, or C)",
          "pinyin": "bǎoxiǎn xiǎnbié",
          "explanation": {
            "vi": "Phạm vi rủi ro được bảo hiểm (ví dụ: ICC (A) - All Risks kèm Bảo hiểm Rủi ro Chiến tranh War Risks).",
            "ja": "適用される保険約款（例：Institute Cargo Clauses (A) 2009 & War Clauses）。",
            "en": "Governing insurance clauses and perils covered."
          },
          "sampleValue": "Institute Cargo Clauses (A) + Institute War Clauses (Cargo)"
        },
        {
          "fieldZh": "保险金额 (Insured Amount)",
          "fieldEn": "Sum Insured (CIF + 10%)",
          "pinyin": "bǎoxiǎn jīné",
          "explanation": {
            "vi": "Số tiền bảo hiểm, thông lệ quốc tế là 110% trị giá hóa đơn CIF.",
            "ja": "保険金額。国際慣行上CIF価格の110%で設定されるのが標準的です。",
            "en": "Total indemnification limit, customarily 110% of CIF commercial invoice value."
          },
          "sampleValue": "USD 57,200 (110% of CIF USD 52,000)"
        },
        {
          "fieldZh": "理赔地点与检验代理 (Claims Payable At & Survey Agent)",
          "fieldEn": "Claims Settling Agent & Payable Location",
          "pinyin": "lǐpéi dìdiǎn yǔ jiǎnyàn dàilǐ",
          "explanation": {
            "vi": "Nơi giải quyết bồi thường tại cảng đến và đại lý giám định tổn thất được chỉ định.",
            "ja": "仕向地における事故鑑定人（Surveyor）および保険金支払窓口。",
            "en": "Designated surveying agency and local claim disbursement office at destination."
          },
          "sampleValue": "Claims payable in Haiphong, Vietnam by Lloyd's Agent"
        }
      ]
    }
  ],
  "scenarios": [
    {
      "id": "scen_001_inquiry_initial",
      "category": "communication",
      "title": {
        "vi": "Hỏi giá và xin Catalogue lần đầu tại Hội chợ Canton Fair",
        "ja": "広州交易会での初回引き合い・カタログ請求",
        "en": "Initial Product Inquiry & Catalog Request at Trade Fair"
      },
      "description": {
        "vi": "Đóng vai nhân viên thu mua tiếp cận gian hàng nhà máy Trung Quốc để hỏi catalogue và bảng giá.",
        "ja": "バイヤーとして展示会ブースを訪問し、製品カタログと価格表を礼儀正しく請求します。",
        "en": "Roleplay as an overseas buyer approaching a supplier booth to request product catalogs and price lists."
      },
      "context": {
        "vi": "Bạn đang tham quan Hội chợ Canton Fair và muốn tìm nhà cung cấp thiết bị gia dụng thông minh uy tín.",
        "ja": "広州交易会を視察中。スマート家電の有望サプライヤーを探しています。",
        "en": "Visiting Canton Fair to source reliable smart home appliance OEM manufacturers."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Nhân viên kinh doanh gian hàng (Mr. Wang)",
            "ja": "ブース営業担当（王さん）",
            "en": "Booth Sales Manager (Mr. Wang)"
          },
          "promptZh": "您好！欢迎光临我们展位。请问您对我们哪款产品感兴趣？这是我们最新的智能空气炸锅系列。",
          "promptPinyin": "Nínhǎo! Huānyíng guānglín wǒmen zhǎnwèi. Qǐngwèn nín duì wǒmen nǎ kuǎn chǎnpǐn gǎn xìngqù? Zhè shì wǒmen zuìxīn de zhìnéng kōngqì zhàguō xìliè.",
          "promptTranslation": {
            "vi": "Chào anh/chị! Chào mừng đã ghé gian hàng chúng tôi. Anh/chị quan tâm dòng sản phẩm nào ạ? Đây là dòng nồi chiên không dầu thông minh mới nhất của chúng tôi.",
            "ja": "いらっしゃいませ！どの製品にご興味がおありでしょうか？こちらは最新のスマートエアフライヤーシリーズです。",
            "en": "Hello! Welcome to our booth. Which line of products are you interested in? This is our newest smart air fryer series."
          },
          "vocabHighlights": [
            "展位",
            "产品",
            "智能",
            "系列"
          ],
          "options": [
            {
              "text": {
                "zh": "王经理您好！我是越南ABC公司的采购代表。这款炸锅外观很吸引人，请问能提供一份产品目录和FOB深圳报价单吗？",
                "pinyin": "Wáng jīnglǐ nínhǎo! Wǒ shì Yuènán ABC gōngsī de cǎigòu dàibiǎo. Zhè kuǎn zhàguō wàiguān hěn xīyǐn rén, qǐngwèn néng tígōng yī fèn chǎnpǐn mùlù hé FOB Shēnzhèn bàojiàdān ma?",
                "translations": {
                  "vi": "Chào quản lý Vương! Tôi là đại diện thu mua công ty ABC Việt Nam. Kiểu dáng nồi này rất bắt mắt, anh có thể cung cấp catalogue và báo giá FOB Thâm Quyến được không?",
                  "ja": "王マネージャー、こんにちは。ベトナムABC社の購買担当です。デザインが素晴らしいですね。製品カタログとFOB深圳の価格表をいただけますか？",
                  "en": "Hello Manager Wang! I am the purchasing rep for ABC Vietnam. The design is sleek. Could you provide a catalog and FOB Shenzhen price list?"
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Rất chuẩn mực! Tự giới thiệu danh tính công ty, khen sản phẩm khéo léo và hỏi rõ điều kiện Incoterms (FOB Shenzhen).",
                "ja": "✅ 最適です。身分と所属を名乗り、製品を褒めつつFOB条件を指定したプロフェッショナルな対応です。",
                "en": "✅ Excellent! Professional self-introduction, genuine compliment, and specific Incoterms designation."
              },
              "nextStepIndex": 1
            },
            {
              "text": {
                "zh": "这个多少钱一台？太贵的话我就不看了。",
                "pinyin": "Zhèige duōshao qián yī tái? Tài guì dehuà wǒ jiù bù kàn le.",
                "translations": {
                  "vi": "Cái này bao nhiêu tiền một cái? Nếu đắt quá thì tôi không thèm xem nữa đâu.",
                  "ja": "これ一台いくら？高すぎるなら見ないよ。",
                  "en": "How much for one piece? If too expensive I won’t bother."
                }
              },
              "isRecommended": false,
              "feedback": {
                "vi": "❌ Quá thô lỗ trong giao tiếp thương mại! Nhà máy chưa biết sản lượng MOQ của bạn thì chưa thể báo giá chính xác, nói vậy sẽ khiến đối tác thiếu thiện cảm.",
                "ja": "❌ 失礼かつ不適切です。数量も提示せずいきなり単価だけを聞いて突き放す態度はビジネス上敬遠されます。",
                "en": "❌ Too blunt and unprofessional! Unit price depends heavily on quantity and specs."
              },
              "nextStepIndex": 1
            }
          ]
        },
        {
          "stepIndex": 1,
          "speakerRole": {
            "vi": "Nhân viên kinh doanh gian hàng (Mr. Wang)",
            "ja": "ブース営業担当（王さん）",
            "en": "Booth Sales Manager (Mr. Wang)"
          },
          "promptZh": "没问题！这是我们的名片和目录。标准款起订量（MOQ）是1000台，FOB深圳价格是28美元。请问贵司预计的首单采购量大概是多少？",
          "promptPinyin": "Méi wèntí! Zhè shì wǒmen de míngpiàn hé mùlù. Biāozhǔn kuǎn qǐdìngliàng (MOQ) shì yīqiān tái, FOB Shēnzhèn jiàgé shì èrshíbā Měiyuán. Qǐngwèn guìsī yùjì de shǒudān cǎigòuliàng dàgài shì duōshao?",
          "promptTranslation": {
            "vi": "Không vấn đề gì! Đây là danh thiếp và catalogue của chúng tôi. Bản chuẩn số lượng đặt tối thiểu (MOQ) là 1000 chiếc, giá FOB Thâm Quyến là 28 USD. Xin hỏi dự kiến số lượng đơn đầu tiên của quý công ty là khoảng bao nhiêu?",
            "ja": "もちろんです！こちらが名刺とカタログです。標準モデルの最小発注数量（MOQ）は1000台、FOB深圳価格は28ドルです。貴社の初回ロット予定数はどのくらいでしょうか？",
            "en": "Certainly! Here are our business card and catalog. Standard MOQ is 1,000 units at FOB Shenzhen $28. What is your estimated first trial order volume?"
          },
          "vocabHighlights": [
            "起订量",
            "名片",
            "首单",
            "采购量"
          ],
          "options": [
            {
              "text": {
                "zh": "谢谢王经理。我们计划首单先试单500台测试越南市场反应，后续返单会翻倍。请问500台能按这个价格做吗？",
                "pinyin": "Xièxie Wáng jīnglǐ. Wǒmen jìhuà shǒudān xiān shìdān wǔbǎi tái cèshì Yuènán shìchǎng fǎnyìng, hòuxù fǎndān huì fānbèi. Qǐngwèn wǔbǎi tái néng àn zhèige jiàgé zuò ma?",
                "translations": {
                  "vi": "Cảm ơn quản lý Vương. Đơn đầu chúng tôi dự định đặt thử 500 chiếc để thăm dò thị trường Việt Nam, các đơn tiếp theo sẽ tăng gấp đôi. Xin hỏi 500 chiếc có áp dụng mức giá này được không?",
                  "ja": "ありがとうございます。初回は市場テストとしてまず500台で試発注し、好評なら追加発注を倍増させる予定です。500台でも同価格でご検討いただけますか？",
                  "en": "Thank you Manager Wang. We plan a trial order of 500 units to test market response, with repeat orders doubling. Can you honor this price for 500 units?"
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Tuyệt vời! Dùng khái niệm \"试单\" (đơn thử) kèm lời hứa \"返单\" (đơn hàng lặp lại) là chiến thuật khéo léo để đàm phán MOQ thấp hơn.",
                "ja": "✅ 的確な交渉術です。「試発注（トライアル）」と「リピート増量」を提示することでMOQの柔軟な譲歩を引き出せます。",
                "en": "✅ Excellent negotiation tactic! Using \"trial order\" combined with future repeat order commitment encourages supplier flexibility."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_002_price_negotiation",
      "category": "sales_purchasing",
      "title": {
        "vi": "Đàm phán chiết khấu giá khi tăng số lượng đơn hàng",
        "ja": "発注数量増量に伴うボリュームディスカウント交渉",
        "en": "Negotiating Bulk Volume Discounts for Larger Orders"
      },
      "description": {
        "vi": "Thương lượng để giảm giá đơn vị khi nâng khối lượng mua hàng từ 2,000 chiếc lên 5,000 chiếc.",
        "ja": "購入数を2,000個から5,000個に増やす前提で単価引き下げを交渉します。",
        "en": "Leverage an order quantity increase from 2,000 to 5,000 units to secure a lower unit price."
      },
      "context": {
        "vi": "Xưởng đưa giá 15 USD/cái cho 2,000 cái. Bạn muốn xin giá 13.50 USD nếu nâng lên 5,000 cái.",
        "ja": "サプライヤーの提示は2,000個で15ドル。5,000個発注を条件に13.50ドルへの値引きを目指します。",
        "en": "Supplier quoted $15 for 2,000 pcs. You aim for $13.50 if ordering 5,000 pcs."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Giám đốc bán hàng (Chen)",
            "ja": "営業責任者（陳さん）",
            "en": "Sales Director (Mr. Chen)"
          },
          "promptZh": "李总，我们2,000件的含税单价是15美元，这已经是我们的底价了，原材料最近涨得很厉害。",
          "promptPinyin": "Lǐ zǒng, wǒmen liǎngqiān jiàn de hánshuì dānjià shì shíwǔ Měiyuán, zhè yǐjīng shì wǒmen de dǐjià le, yuáncáiliào zuìjìn zhǎng de hěn lìhai.",
          "promptTranslation": {
            "vi": "Giám đốc Lý, đơn giá đã gồm thuế cho 2.000 cái là 15 USD, đây đã là giá sàn của chúng tôi rồi, giá nguyên vật liệu đợt này tăng dữ quá.",
            "ja": "李総経理、2,000個の税込単価15ドルはすでに弊社の限界底値です。最近原材料が高騰しておりまして。",
            "en": "Director Li, $15 tax-inclusive for 2,000 pcs is already our bottom line; raw material costs have spiked significantly."
          },
          "vocabHighlights": [
            "底价",
            "原材料",
            "含税单价"
          ],
          "options": [
            {
              "text": {
                "zh": "陈总，我们非常理解原材料成本的压力。如果我们这次把采购量直接提升到5,000件，并且保证下半年持续返单，您看能否给我们优惠到13.5美元？",
                "pinyin": "Chén zǒng, wǒmen fēicháng lǐjiě yuáncáiliào chéngběn de yālì. Rúguǒ wǒmen zhè cì bǎ cǎigòuliàng zhíjiē tíshēng dào wǔqiān jiàn, bìngqiě bǎozhèng xiàbànnián chíxù fǎndān, nín kàn néngfǒu gěi wǒmen yōuhuì dào shísān diǎn wǔ Měiyuán?",
                "translations": {
                  "vi": "Giám đốc Trần, chúng tôi rất thấu hiểu áp lực giá nguyên liệu. Nếu lần này chúng tôi nâng thẳng lượng đặt mua lên 5.000 cái và cam kết tiếp tục tái đặt hàng trong nửa cuối năm, anh xem có thể ưu đãi mức 13.5 USD không?",
                  "ja": "陳総、原材料高騰のご苦労は重々理解しております。もし今回発注数を5,000個に引き上げ、下半期の継続発注もお約束する場合、13.5ドルまでご優遇いただけないでしょうか？",
                  "en": "Mr. Chen, we completely understand raw material pressures. If we increase our order to 5,000 units now and guarantee regular reorders, could you offer $13.50?"
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Thấu tình đạt lý: Thể hiện sự thấu hiểu trước khó khăn của đối tác, đồng thời đổi lấy chiết khấu bằng lợi ích cụ thể (lượng tăng 2.5 lần).",
                "ja": "✅ 完璧なアプローチ。相手の立場を尊重しつつ、具体的な追加ロットと継続取引のメリットを提示して妥協点を引き出しています。",
                "en": "✅ Win-win approach: Shows empathy while offering compelling commercial value (2.5x volume increase)."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_003_payment_terms",
      "category": "finance",
      "title": {
        "vi": "Thương lượng phương thức thanh toán an toàn cho hai bên",
        "ja": "リスクを低減する国際決済条件の交渉",
        "en": "Negotiating Balanced & Secure Payment Terms"
      },
      "description": {
        "vi": "Thuyết phục nhà máy chuyển từ 100% thanh toán trước sang 30% cọc và 70% sau khi nhận bản scan Vận đơn B/L.",
        "ja": "全額前払い要求に対し、30%前金＋B/Lコピー確認後70%残金支払いの国際標準条件へ誘導します。",
        "en": "Persuade the supplier from demanding 100% advance payment to the standard 30% deposit + 70% against B/L copy."
      },
      "context": {
        "vi": "Nhà cung cấp mới yêu cầu chuyển khoản 100% trước khi giao hàng (100% T/T Advance). Bạn cần thương lượng phương thức an toàn hơn.",
        "ja": "新規サプライヤーが「出荷前100%前払い」を要求。買い手側の資金リスクを抑えるため交渉します。",
        "en": "New supplier insists on 100% advance T/T. You must protect cash flow and minimize default risk."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Kế toán trưởng xưởng (Ms. Zhao)",
            "ja": "サプライヤー財務（趙さん）",
            "en": "Supplier Finance Manager (Ms. Zhao)"
          },
          "promptZh": "因为我们是第一次合作，公司规定必须在发货前付清100%全款（100% T/T Advance），否则仓库无法安排装柜。",
          "promptPinyin": "Yīnwèi wǒmen shì dì-yī cì hézuò, gōngsī guīdìng bìxū zài fāhuò qián fùqīng bǎifēnzhī bǎigián quánguǎn, fǒuzé cāngkù wúfǎ ānpái zhuāngguì.",
          "promptTranslation": {
            "vi": "Do đây là lần đầu hợp tác, quy định công ty chúng tôi là phải thanh toán đủ 100% trước khi xuất hàng, nếu không kho không thể xếp hàng vào container.",
            "ja": "今回が初回のお取引となるため、全額前払い（100% T/T）が弊社の規定となっております。ご入金確認前はコンテナ積み込みの手配ができません。",
            "en": "Since this is our first collaboration, company policy requires 100% advance payment before shipment; otherwise our warehouse cannot load the container."
          },
          "vocabHighlights": [
            "付清",
            "全款",
            "装柜",
            "T/T"
          ],
          "options": [
            {
              "text": {
                "zh": "赵经理，为了平衡双方的资金与风控安全，我们建议采取国际通行的付款方式：合同签订后付30%定金安排生产，发货后见海运提单（B/L）复印件及质检报告结清70%尾款。您看这样双方都有保障，如何？",
                "pinyin": "Zhào jīnglǐ, wèile pínghéng shuāngfāng de zījīn yǔ fēngkòng ānquán, wǒmen jiànyì cǎiqǔ guójì tōngxíng de fùkuǎn fāngshì: hétong qiāndìng hòu fù bǎifēnzhī sānshí dìngjīn ānpái shēngchǎn, fāhuò hòu jiàn hǎiyùn tídān fùyìnjiàn jí zhìjiǎn bàogào jiéqīng bǎifēnzhī qīshí wěikuǎn. Nín kàn zhèyàng shuāngfāng dōu yǒu bǎozhàng, rúhé?",
                "translations": {
                  "vi": "Quản lý Triệu, để cân bằng rủi ro vốn cho cả hai bên, chúng tôi đề xuất phương thức thông lệ quốc tế: Sau khi ký hợp đồng trả cọc 30% để sản xuất, sau khi giao hàng xem bản scan vận đơn B/L và biên bản kiểm hàng sẽ thanh toán nốt 70% còn lại. Như vậy đôi bên đều được bảo đảm, chị thấy sao?",
                  "ja": "趙マネージャー、双方の資金効率とリスクヘッジのため、国際標準である「契約時30%手付金、船積後B/Lコピーおよび検品合格報告書確認時に残金70%支払い」をご提案いたします。これなら双方安心かと思いますがいかがでしょうか？",
                  "en": "Manager Zhao, to balance financial risk for both sides, we propose international practice: 30% deposit upon contract, and 70% balance upon presentation of B/L copy and inspection report."
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Rất chuyên nghiệp! Nêu rõ lập luận bảo vệ đôi bên (30% cọc đủ để xưởng mua nguyên liệu, 70% trả sau B/L bảo đảm người mua không bị mất trắng tiền).",
                "ja": "✅ 最善の提案。売り手の製造運転資金（30%）を確保しつつ、買い手の未船積リスク（70%）を排除する納得感ある条件提示です。",
                "en": "✅ Highly professional! Balances working capital for the manufacturer with delivery security for the importer."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_004_lead_time_delay",
      "category": "workplace",
      "title": {
        "vi": "Nhắc nhở và xử lý khi nhà máy thông báo chậm tiến độ giao hàng",
        "ja": "納期遅延連絡に対する督促と代替挽回策の協議",
        "en": "Handling Factory Delivery Delays & Formulating Catch-up Plans"
      },
      "description": {
        "vi": "Nhà máy báo trễ hàng 15 ngày do mất điện, thương lượng để ưu tiên xuất trước 1 phần bằng đường hàng không hoặc đẩy ca đêm.",
        "ja": "電力制限で15日遅延の連絡。納期遅延による損失を防ぐため、部分分納や夜勤残業による短縮を求めます。",
        "en": "Factory reports a 15-day delay due to power cuts; negotiate split shipment or expedited overtime shifts."
      },
      "context": {
        "vi": "Hàng vụ Tết nếu trễ 15 ngày sẽ bị lỡ mùa bán cao điểm. Cần giải pháp quyết liệt nhưng vẫn giữ hòa khí.",
        "ja": "年末商戦向け商材のため、半月の遅れは致命傷になります。",
        "en": "Holiday season goods cannot afford a 15-day delay. Urgent remediation required."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Quản đốc xưởng (Mr. Liu)",
            "ja": "工場長（劉さん）",
            "en": "Factory Manager (Mr. Liu)"
          },
          "promptZh": "实在不好意思，由于当地环保限电，我们这批订单估计要延期两周交货，大约下个月10号才能出货。",
          "promptPinyin": "Shízài bù hǎoyìsi, yóuyú dāngdì huánbǎo xiàndiàn, wǒmen zhè pī dìngdān gūjì yào yánqī liǎng zhōu jiāohuò, dàyuē xià gè yuè shí hào cáinéng chūhuò.",
          "promptTranslation": {
            "vi": "Thành thật xin lỗi, do địa phương cắt điện bảo vệ môi trường, lô hàng này ước tính phải lùi 2 tuần mới giao được, khoảng ngày 10 tháng sau mới xuất hàng.",
            "ja": "大変申し訳ありません。地域の電力供給制限のため、今回のロットは納期が2週間遅延し、来月10日頃の出荷見込みとなります。",
            "en": "We sincerely apologize, but due to local power rationing, this batch will be delayed by about 2 weeks, shipping around the 10th of next month."
          },
          "vocabHighlights": [
            "延期",
            "交货",
            "限电",
            "出货"
          ],
          "options": [
            {
              "text": {
                "zh": "刘厂长，这批货是赶年底促销季的，两周延期会导致我们违约。我们能否商量两个补救措施：第一，现有已完工的500件先分批出货；第二，贵司安排加班赶工，由此产生的加急空运差价由双方各承担一部分？",
                "pinyin": "Liú chǎngzhǎng, zhè pī huò shì gǎn niándǐ cùxiāo jì de, liǎng zhōu yánqī huì dǎozhì wǒmen wéiyuē. Wǒmen néngfǒu shāngliang liǎng gè bǔjiù cuòshī: dì-yī, xiànyǒu yǐ wángōng de wǔbǎi jiàn xiān fēnpī chūhuò; dì-èr, guìsī ānpái jiābān gǎngōng, yóucǐ chǎnshēng de jiājí kōngyùn chājià yóu shuāngfāng gè chéngdān yībùfen?",
                "translations": {
                  "vi": "Xưởng trưởng Lưu ơi, lô hàng này kịp đợt khuyến mãi cuối năm của chúng tôi, chậm 2 tuần sẽ khiến chúng tôi bị vi phạm hợp đồng với khách. Chúng ta có thể bàn 2 biện pháp cứu vãn: Thứ nhất, 500 cái đã làm xong cho giao trước từng phần (分批出货); Thứ hai, xưởng tăng ca làm gấp, chênh lệch cước bay gấp nếu có hai bên cùng chia sẻ một phần?",
                  "ja": "劉工場長、これは年末セール用の最重要商品で、2週間の遅れは弊社にとって顧客違約になります。2つの挽回案をご検討いただけませんか：① 完成済みの500個を先行して分納出荷する、② 残業体制で生産を加速し、一部を航空便（エア）で振り替える。",
                  "en": "Director Liu, these goods are for our year-end promotional campaign; a 2-week delay will cause contractual default with our retail buyers. Can we split shipment for finished goods and arrange overtime?"
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Giải pháp hướng tới hành động! Vừa chỉ rõ hậu quả nghiêm trọng, vừa lập tức đưa ra phương án khả thi (phân lô xuất trước + hỗ trợ chi phí cước).",
                "ja": "✅ 極めて建設的です。遅延の重大性を伝えつつ、分納（部分出荷）と残業・航空便折衷という実効性のある解決策を提示しています。",
                "en": "✅ Constructive & solution-oriented! Communicates gravity while proposing viable practical remedies."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_005_shipping_booking",
      "category": "logistics",
      "title": {
        "vi": "Làm việc với công ty Logistics (Forwarder) để đặt chỗ container và lấy S/O",
        "ja": "フォワーダーへのコンテナブッキングと船積指図書（S/O）取得",
        "en": "Coordinating Container Booking & Shipping Order with Freight Forwarder"
      },
      "description": {
        "vi": "Liên hệ Forwarder để kiểm tra giá cước biển (Ocean Freight), xin lịch tàu gần nhất và đặt 1 container 40HQ đi Hải Phòng.",
        "ja": "フォワーダーに海上運賃と最新船腹スケジュールを照会し、ハイフォン向け40HQコンテナを予約します。",
        "en": "Coordinate with shipping line/forwarder to check freight rates and book a 40HQ container to Haiphong."
      },
      "context": {
        "vi": "Hàng dự kiến xong ngày 20/11. Cần tàu khởi hành (ETD) ngày 23/11 tại cảng Thâm Quyến.",
        "ja": "工場完成予定は11月20日。11月23日深圳出港（ETD）の本船スペースを確保する必要があります。",
        "en": "Goods ready by Nov 20. Need vessel sailing (ETD) Nov 23 out of Shenzhen."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Nhân viên kinh doanh Forwarder (Ms. Alice)",
            "ja": "フォワーダー担当（アリスさん）",
            "en": "Freight Forwarder Rep (Ms. Alice)"
          },
          "promptZh": "您好！请问您需要订去哪个目的港的舱位？柜型是什么？预计货好时间（Cargo Ready Date）是哪天？",
          "promptPinyin": "Nínhǎo! Qǐngwèn nín xūyào dìng qù nǎge mùdìgǎng de cāngwèi? Guìxíng shì shénme? Yùjì huò hǎo shíjiān (Cargo Ready Date) shì nǎ tiān?",
          "promptTranslation": {
            "vi": "Chào anh! Anh cần đặt chỗ đi cảng đích nào ạ? Loại container gì? Thời gian hàng sẵn sàng (CRD) là ngày nào ạ?",
            "ja": "お世話になっております。仕向港、コンテナタイプ、貨物準備完了日（CRD）を教えていただけますでしょうか？",
            "en": "Hello! Which port of destination do you need space for? What container type and Cargo Ready Date?"
          },
          "vocabHighlights": [
            "目的港",
            "舱位",
            "柜型",
            "货好时间"
          ],
          "options": [
            {
              "text": {
                "zh": "你好Alice，我们需要订一个40尺高柜（40HQ）从深圳蛇口到越南海防港。货好时间是11月20日，请帮我们配23日左右开船直达航线，并请报一下海运费及起运港本地杂费（Local Charges）。",
                "pinyin": "Nǐhǎo Alice, wǒmen xūyào dìng yī gè sìshí chǐ gāoguì (40HQ) cóng Shēnzhèn Shékǒu dào Yuènán Hǎifáng gǎng. Huò hǎo shíjiān shì shíyī yuè èrshí rì, qǐng bāng wǒmen pèi èrshísān rì zuǒyòu kāichuán zhídá hángxiàn, bìng qǐng bào yīxià hǎiyùnfèi jí qǐyùngǎng běndì záfèi (Local Charges).",
                "translations": {
                  "vi": "Chào Alice, bên anh cần book 1 container 40HQ từ Thâm Quyến (Xà Khẩu) đi cảng Hải Phòng, Việt Nam. Ngày hàng xong là 20/11, em xếp giúp tuyến chạy thẳng rời cảng khoảng ngày 23, và báo giá cước biển kèm phụ phí nội địa cảng đi (Local charges) nhé.",
                  "ja": "アリスさん、深圳・蛇口からベトナム・ハイフォン港行きの40HQコンテナ1本を予約したいです。CRDは11月20日、23日前後出港の直行便を確保してください。海上運賃と現地チャージ（Local Charges）の見積もりをお願いします。",
                  "en": "Hi Alice, we need to book one 40HQ from Shekou Shenzhen to Haiphong, Vietnam. CRD is Nov 20, please arrange direct sailing around Nov 23 and quote ocean freight plus origin local charges."
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Rất chuẩn xác! Cung cấp đủ 5 yếu tố cốt lõi: Cảng đi/đích, loại vỏ cont (40HQ), ngày xong hàng, yêu cầu tàu thẳng (直达) và hỏi rõ cả cước biển lẫn phụ phí Local charges.",
                "ja": "✅ 完璧な手配指示。出港地・仕向地・コンテナ種類・貨物完工日・直行便指定・ローカル費用確認が網羅されています。",
                "en": "✅ Flawless logistics request! Covers POL/POD, equipment type, CRD, direct sailing preference, and local charge transparency."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_006_co_form_e_discrepancy",
      "category": "customs",
      "title": {
        "vi": "Xử lý bất đồng sai lệch tên hàng trên C/O Form E tại Hải quan",
        "ja": "原産地証明書（Form E）の品名不一致と緊急差替え要請",
        "en": "Resolving Description Discrepancies on Form E at Customs"
      },
      "description": {
        "vi": "Hải quan cảnh báo tên hàng trên C/O Form E không khớp 100% với Invoice, yêu cầu nhà xuất khẩu hỗ trợ cấp đổi khẩn cấp.",
        "ja": "税関審査でForm Eの品名がインボイスと微小不一致。関税免除を受けるため発行元へ緊急再発行を要請します。",
        "en": "Customs flags a discrepancy between Form E and Invoice description; urgently request supplier re-issuance."
      },
      "context": {
        "vi": "Lô hàng đang chờ ở cảng để hưởng thuế nhập khẩu 0% theo ACFTA. Nếu không sửa C/O sẽ bị phạt và áp thuế suất thông thường.",
        "ja": "FTA特恵関税（0%）適用のため、Form Eの記載訂正が至急必要です。",
        "en": "Cargo is awaiting tariff exemption under ACFTA. Form E must strictly match the invoice wording."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Nhân viên chứng từ nhà máy (Ms. Amy)",
            "ja": "シッピング担当（エイミーさん）",
            "en": "Factory Documentation Officer (Ms. Amy)"
          },
          "promptZh": "王先生，海关那边有什么问题吗？我们上周已经把Form E正本寄给你们了呀。",
          "promptPinyin": "Wáng xiānsheng, hǎiguān nàbiān yǒu shénme wèntí ma? Wǒmen shàngzhōu yǐjīng bǎ Form E zhèngběn jì gěi nǐmen le ya.",
          "promptTranslation": {
            "vi": "Anh Vương, phía Hải quan có vấn đề gì vậy? Tuần trước chúng tôi đã chuyển phát nhanh bản gốc Form E cho bên anh rồi mà.",
            "ja": "王さん、税関で何か問題でしょうか？先週Form Eの原本を速達で送付済みですが。",
            "en": "Mr. Wang, is there any problem at customs? We already couriered the original Form E to you last week."
          },
          "vocabHighlights": [
            "正本",
            "Form E",
            "海关"
          ],
          "options": [
            {
              "text": {
                "zh": "Amy你好，十分紧急！越南海关核对时指出，Form E第七栏的品名漏掉了型号后缀“Pro”，导致与商业发票不完全一致，面临无法享受零关税的风险。能否请贵司今天紧急向海关申请出具一份更正版Form E，并先将扫描件发给我们报关？",
                "pinyin": "Amy nǐhǎo, shífēn jǐnjí! Yuènán hǎiguān héduì shí zhǐchū, Form E dì-qī lán de pǐnmíng lòudiào le xínghào hòuzhuì \"Pro\", dǎozhì yǔ shāngyè fāpiào bù wánquán yīzhì, miànlín wúfǎ xiǎngshòu líng guānshuì de fēngxiǎn. Néngfǒu qǐng guìsī jīntiān jǐnjí xiàng hǎiguān shēnqǐng chūjù yī fèn gēngzhèng bǎn Form E, bìng xiān jiāng sǎomiáojiàn fā gěi wǒmen bàoguān?",
                "translations": {
                  "vi": "Amy ơi, cực kỳ khẩn cấp! Hải quan Việt Nam đối chiếu chỉ ra ô số 7 của Form E bị thiếu hậu tố model \"Pro\", khiến tên hàng không khớp 100% với hóa đơn thương mại, có nguy cơ không được hưởng thuế ưu đãi 0%. Công ty bạn có thể xin cấp đổi khẩn một bản Form E sửa đổi ngay hôm nay và gửi file scan trước cho bên mình khai quan được không?",
                  "ja": "エイミーさん、緊急事態です！ベトナム税関の確認で、Form E第7欄の品名にモデル名末尾「Pro」が脱落しておりインボイスと完全一致しないため、特恵税率が否認される恐れがあります。本日中に差替え再発行を申請いただき、まずスキャンPDFをお送りいただけませんか？",
                  "en": "Hi Amy, urgent issue! Vietnam customs pointed out Box 7 lacks model suffix \"Pro\", inconsistent with Commercial Invoice. Could your team urgently apply for an amended Form E and scan the copy today?"
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Rất chính xác! Chỉ rõ vị trí sai sót (ô số 7 - 第七栏), giải thích hậu quả cụ thể (nguy cơ mất ưu đãi thuế) và giải pháp thiết thực (scan trước để làm việc với hải quan).",
                "ja": "✅ 最善の説明。記載欄（第7欄）、不一致の箇所、発生するリスク、必要なアクション（当日再申請＋スキャン先送り）を明瞭に伝えています。",
                "en": "✅ Perfect resolution communication! Points out exact Box 7 discrepancy, clear consequence, and an immediate actionable path."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_007_quality_claim",
      "category": "aftersales",
      "title": {
        "vi": "Gửi biên bản giám định và khiếu nại bồi thường hàng vỡ hỏng",
        "ja": "検品レポートに基づく破損・不良クレームおよび求償交渉",
        "en": "Filing Quality Discrepancy Claims & Damage Compensation"
      },
      "description": {
        "vi": "Sau khi dỡ hàng phát hiện 12% sản phẩm bị biến dạng do đóng thùng carton mỏng, yêu cầu đổi hàng hoặc trừ tiền đợt sau.",
        "ja": "貨物開梱時に外装カートン強度不足による12%の変形破損を発見。写真と報告書を添えて補償を請求します。",
        "en": "Found 12% damaged goods due to thin outer cartons; present photo evidence and negotiate credit memo or replacement."
      },
      "context": {
        "vi": "Kiểm tra container tại kho, phát hiện bao bì không đạt chuẩn khiến hàng chịu lực kém bị móp méo.",
        "ja": "倉庫でのデバンニング時に外装強度の問題による破損を確認。",
        "en": "Unpacking warehouse container reveals poor carton packaging resulting in squashed products."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Giám đốc dịch vụ hậu mãi (Mr. Sun)",
            "ja": "アフターサービス責任者（孫さん）",
            "en": "Customer Service Lead (Mr. Sun)"
          },
          "promptZh": "李经理，我们出厂前都是通过全检的，是不是海运过程中海况恶劣导致的碰撞？",
          "promptPinyin": "Lǐ jīnglǐ, wǒmen chūchǎng qián dōu shì tōngguò quánjiǎn de, shìbushì hǎiyùn guòchéng zhōng hǎikuàng èliè dǎozhì de pèngzhuàng?",
          "promptTranslation": {
            "vi": "Quản lý Lý, hàng chúng tôi trước khi xuất xưởng đều qua kiểm định 100% mà, có phải trong quá trình vận chuyển đường biển gặp sóng to dẫn đến va đập không?",
            "ja": "李マネージャー、工場出荷時は全品検査済みです。航海中の荒天による荷崩れや衝撃ではありませんか？",
            "en": "Manager Li, all goods passed 100% factory inspection before dispatch; could it be rough sea transit damage?"
          },
          "vocabHighlights": [
            "出厂",
            "全检",
            "碰撞"
          ],
          "options": [
            {
              "text": {
                "zh": "孙经理，我们随信附上了第三方检验机构（SGS）的开箱检验报告和高清照片。报告清楚证明是外箱瓦楞纸厚度仅为单坑（3层），未达到合同约定的五层高强瓦楞标准，导致受压变形。按损坏率12%计算，损失金额为4,800美元。我们提议在下周返单的货款中全额扣除，同时请务必改进下批货的包装规格。",
                "pinyin": "Sūn jīnglǐ, wǒmen suíxìn fùshàng le dì-sān fāng jiǎnyàn jīgòu (SGS) de kāixiāng jiǎnyàn bàogào hé gāoqīng zhàopiàn. Bàogào qīngchu zhèngmíng shì wàixiāng wǎléngzhǐ hòudù jǐn wéi dānkēng (sāncéng), wèi dádào hétong yuēdìng de wǔcéng gāoqiáng wǎléng biāozhǔn, dǎozhì shòuyā biànxíng. Àn sǔnhuài lǜ bǎifēnzhī shí'èr jìsuàn, sǔnshī jīné wéi sìqiān bābǎi Měiyuán. Wǒmen tíyì zài xiàzhōu fǎndān de huòkuǎn zhōng quán'é kòuchú, tóngshí qǐng wùbì gǎijìn xià pī huò de bāozhuāng guīgé.",
                "translations": {
                  "vi": "Quản lý Tôn, bên mình đính kèm biên bản mở thùng giám định của bên thứ 3 (SGS) cùng hình ảnh chụp rõ nét. Biên bản chỉ rõ nguyên nhân là do carton bên ngoài chỉ là loại 3 lớp sóng đơn, không đạt tiêu chuẩn 5 lớp sóng chịu lực cao như cam kết trong hợp đồng, dẫn tới bị nén bẹp. Tính theo tỷ lệ hỏng 12%, số tiền thiệt hại là 4.800 USD. Chúng tôi đề nghị trừ thẳng toàn bộ số tiền này vào đơn hàng tái đặt vào tuần tới, đồng thời yêu cầu xưởng lập tức cải thiện quy cách bao bì cho lô sau.",
                  "ja": "孫マネージャー、第三者検品機関（SGS）の開梱レポートと証拠写真を添付しました。外装段ボールが契約仕様の5層強化芯ではなく単層（3層）であったため耐圧不足で変形したと結論付けられています。不良率12%（損失額4,800ドル）分を次週のリピート発注代金から相殺相殺（Credit Note）とし、次回ロットの梱包改善を強く求めます。",
                  "en": "Manager Sun, attached is the SGS third-party unboxing report with clear photos showing single-wall 3-ply cartons used instead of agreed 5-ply reinforced ones. Based on 12% defect rate ($4,800), we propose a credit deduction on next week reorder and immediate packaging upgrade."
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Khiếu nại đanh thép, chuẩn mực và văn minh: Có chứng cứ bên thứ ba (SGS), dẫn chiếu điều khoản hợp đồng bị vi phạm, đưa ra con số cụ thể và phương án cấn trừ êm đẹp.",
                "ja": "✅ 模範的なクレーム交渉。第三者検査データと契約条項を根拠に、明確な金額と次期取引相殺という双方受け入れやすい着地点を提示しています。",
                "en": "✅ Iron-clad commercial claim! Solid third-party evidence, contract specification reference, exact dollar amount, and practical settlement method."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_008_receiving_clients",
      "category": "basic",
      "title": {
        "vi": "Đón đoàn đối tác Trung Quốc tại Sân bay Nội Bài / Tân Sơn Nhất",
        "ja": "空港での中国人出張団の出迎えと挨拶マナー",
        "en": "Welcoming a Chinese Business Delegation at the Airport"
      },
      "description": {
        "vi": "Cầm biển đón, chào hỏi xã giao nồng nhiệt, hỏi thăm chuyến bay và sắp xếp xe đưa về khách sạn nghỉ ngơi.",
        "ja": "ネームプレートを掲げて空港で迎え、フライトの労をねぎらいホテルへ送迎案内します。",
        "en": "Meet clients at airport arrivals, exchange cordial greetings, and escort them smoothly to the hotel."
      },
      "context": {
        "vi": "Đoàn Tổng giám đốc Zhang từ Thâm Quyến sang thăm nhà máy tại Việt Nam.",
        "ja": "深圳から自社工場視察に来訪した張総経理一行を出迎えます。",
        "en": "President Zhang and his team arrive from Shenzhen to inspect the local manufacturing site."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Tổng giám đốc Trương (Mr. Zhang)",
            "ja": "来訪顧客（張総経理）",
            "en": "Visiting Executive (Mr. Zhang)"
          },
          "promptZh": "你好！请问是越南越中实业的小阮吧？很高兴见到你！",
          "promptPinyin": "Nǐhǎo! Qǐngwèn shì Yuènán Yuè-Zhōng Shíyè de xiǎo Ruǎn ba? Hěn gāoxìng jiàndào nǐ!",
          "promptTranslation": {
            "vi": "Chào em! Cho hỏi có phải bạn Nguyễn bên Công ty Việt - Trung không? Rất vui được gặp em!",
            "ja": "こんにちは！越中実業のグエンさんですね？お会いできて嬉しいです！",
            "en": "Hello! Are you Nguyen from Yue-Zhong Enterprises? Great to meet you!"
          },
          "vocabHighlights": [
            "实业",
            "高兴",
            "见到"
          ],
          "options": [
            {
              "text": {
                "zh": "张总您好！欢迎来到越南！我是小阮。一路飞行辛苦了！行李都拿齐了吗？我们专车已经在外面等候了，先送您和各位领导去酒店办理入住休息，晚上董事长特地安排了特色越南菜接风洗尘。",
                "pinyin": "Zhāng zǒng nínhǎo! Huānyíng láidào Yuènán! Wǒ shì xiǎo Ruǎn. Yīlù fēixíng xīnkǔ le! Xíngli dōu ná qí le ma? Wǒmen zhuānchē yǐjīng zài wàimiàn děnghòu le, xiān sòng nín hé gèwèi lǐngdǎo qù jiǔdiàn bànlǐ rùzhù xiūxi, wǎnshang dǒngshìzhǎng tèdì ānpái le tèsè Yuènán cài jiēfēngxǐchén.",
                "translations": {
                  "vi": "Em chào Trương tổng! Chào mừng anh đến Việt Nam! Em là Nguyễn đây ạ. Bay đường dài anh vất vả rồi! Hành lý mình lấy đủ hết chưa ạ? Xe riêng của công ty em đã đợi sẵn ở cửa rồi, em xin phép đưa Trương tổng cùng các sếp về khách sạn nhận phòng nghỉ ngơi trước, tối nay Chủ tịch bên em đã đặc biệt sắp xếp tiệc món Việt để tẩy trần đón mừng đoàn ạ.",
                  "ja": "張総、ようこそベトナムへ！グエンでございます。フライト大変お疲れ様でした！お荷物はすべて揃いましたでしょうか？専用車を外に待機させております。まずホテルへご案内してチェックインいただき、夜は会長主催の歓迎夕食会をご用意しております。",
                  "en": "President Zhang, welcome to Vietnam! I am Nguyen. Hope you had a smooth flight! Got all your luggage? Our car is waiting outside to take you to the hotel to rest, and our Chairman has arranged a welcome dinner tonight."
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Tinh tế và hiếu khách bậc nhất! Có câu chào tôn kính \"张总\", hỏi han \"辛苦了\", hỗ trợ chu đáo (xe chờ, nghỉ ngơi) và dùng thành ngữ đãi khách \"接风洗尘\" (tiệc tẩy trần đón khách phương xa).",
                "ja": "✅ 最高レベルの接遇マナー。「張総」と敬称で呼び、労いの言葉（辛苦了）、スムーズな動線案内、そして伝統的なもてなし表現（接風洗塵）が完璧です。",
                "en": "✅ Superb hospitality! Polite honorifics, thoughtful inquiry, seamless logistics, and classic welcome idiom (接风洗尘)."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_009_urgent_customs_clearance",
      "category": "customs",
      "title": {
        "vi": "Xử lý lô hàng bị phân vào Luồng Đỏ (Red Channel) tại Cảng",
        "ja": "税関レッドチャネル（現物開梱検査）判定時の迅速対応",
        "en": "Managing Urgent Red Channel Physical Inspection at Port"
      },
      "description": {
        "vi": "Hệ thống Hải quan phân container vào Luồng Đỏ kiểm hóa thực tế, liên hệ điều phối bốc dỡ và nộp hồ sơ nhanh.",
        "ja": "通関システムでレッド判定（開梱現物検査）が出たため、港湾作業員と税関検査官へ迅速に連絡調整します。",
        "en": "Customs routes container to Red Channel (physical unboxing); coordinate dock labor and customs officers promptly."
      },
      "context": {
        "vi": "Container cần thông quan trước 17h chiều để tránh phát sinh tiền lưu bãi (Demurrage) và kịp dây chuyền sản xuất.",
        "ja": "夕方17時までに通関許可を取得しないとフリータイム切れでデマレージが発生します。",
        "en": "Must clear before 5:00 PM to avoid port demurrage penalties and plant line stoppages."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Nhân viên hiện trường tại Cảng (A Hùng)",
            "ja": "通関現業スタッフ（フンさん）",
            "en": "On-site Customs Broker (Hung)"
          },
          "promptZh": "主管，系统刚出结果，我们那水装有电机的柜子被抽中“红通”（Red Channel）查验了！",
          "promptPinyin": "Zhǔguǎn, xìtǒng gāng chū jiéguǒ, wǒmen nà shuǐ zhuāng yǒu diànjī de guìzi bèi chōuzhòng \"hóng tōng\" (Red Channel) cháyàn le!",
          "promptTranslation": {
            "vi": "Sếp ơi, hệ thống vừa trả kết quả, container chở mô-tơ điện của mình bị dính Luồng Đỏ (Red Channel) phải kiểm hóa thực tế rồi!",
            "ja": "主任、システムから判定が出ました。モーター入りのコンテナがレッドチャネル（現物検査）に指定されてしまいました！",
            "en": "Supervisor, customs system just flagged our motor container for Red Channel physical inspection!"
          },
          "vocabHighlights": [
            "红通",
            "查验",
            "柜子"
          ],
          "options": [
            {
              "text": {
                "zh": "阿雄别慌！你按以下步骤处理：第一，立刻在海关系统预约今天下午最早的开箱查验时段；第二，带上全套报关单证原件、装箱单和产品实物彩色图册去查验场；第三，联系码头工人尽快吊柜到查验平台，全力配合海关开箱核对铭牌参数，务必在下班前拿到放行指令（Release Order）。",
                "pinyin": "Ā Xióng bié huāng! Nǐ àn yǐxià bùzhòu chǔlǐ: dì-yī, lìkè zài hǎiguān xìtǒng yùyuē jīntiān xiàwǔ zuìzǎo de kāixiāng cháyàn shíduàn; dì-èr, dài shàng quántào bàoguān dānzhèng yuánjiàn, zhuāngxiāngdān hé chǎnpǐn shíwù sǎisè túcè qù cháyàn chǎng; dì-sān, liánxì mǎtóu gōngrén jǐnkuài diàoguì dào cháyàn píngtái, quánlì pèihé hǎiguān kāixiāng héduì míngpái cānshù, wùbì zài xiàbān qián nádào fàngxíng zhǐlìng (Release Order).",
                "translations": {
                  "vi": "Hùng bình tĩnh đừng hoảng! Em làm theo các bước này: Thứ nhất, lên hệ thống hải quan đặt ngay slot kiểm hóa đầu giờ chiều nay; Thứ hai, mang đủ bộ chứng từ gốc, packing list và catalogue ảnh chụp sản phẩm thực tế ra bãi kiểm; Thứ ba, liên hệ xe nâng cảng bốc hạ cont lên bệ kiểm tra ngay, phối hợp mở thùng đối chiếu thông số trên mác máy, quyết tâm lấy lệnh thông quan (Release Order) trước giờ tan sở.",
                  "ja": "フンさん、落ち着いて！次の手順で至急動いてください：① システムで本日の最速検査スロットを即時予約、② 原本書類・パッキングリスト・製品カラー写真を検査場へ持参、③ ヤード作業員にコンテナを検査台へ即時移動させ、銘板確認に全面協力して定時前に通関許可（Release Order）を取得すること。",
                  "en": "Stay calm! 1) Reserve the earliest afternoon inspection slot online; 2) Bring original declaration docs, packing list, and product photo sheets; 3) Move container to inspection bay to check nameplates and obtain Release Order before closing."
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Kỹ năng chỉ đạo hiện trường xuất sắc: Giữ bình tĩnh, phân chia 3 bước cụ thể (đặt lịch, chuẩn bị tài liệu trực quan, điều phối hạ cont) giúp thông quan trơn tru.",
                "ja": "✅ 見事な現場指揮官の指示。優先順位を明確にし、検査官の疑義を晴らす写真資料の準備や港湾ヤードの物理移動まで的確に網羅しています。",
                "en": "✅ Superb crisis logistics leadership! Calm, step-by-step decisive instructions covering bookings, technical photo evidence, and dock crane coordination."
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    },
    {
      "id": "scen_010_contract_signing_banquet",
      "category": "communication",
      "title": {
        "vi": "Nâng ly chúc mừng và phép tắc trên bàn tiệc ký kết hợp đồng",
        "ja": "契約調印祝賀ディナーでの乾杯挨拶とビジネスマナー",
        "en": "Toasting Etiquette & Speeches at Contract Signing Banquet"
      },
      "description": {
        "vi": "Phép tắc chúc rượu kính bề trên (ly thấp hơn), nói lời cảm ơn sự hợp tác và chúc cho đơn hàng thành công tốt đẹp.",
        "ja": "祝賀会での敬意を表す乾杯マナー（相手より杯を下げる）と今後の発展を祈念するスピーチ。",
        "en": "Observe Chinese banquet etiquette (holding glass lower for respect) and deliver an inspiring partnership toast."
      },
      "context": {
        "vi": "Hai bên vừa ký xong hợp đồng ngoại thương trị giá 500,000 USD. Bữa tiệc tối là thời điểm thắt chặt quan hệ (Guanxi).",
        "ja": "50万ドルの大型契約を締結後の会食。パートナーシップ（関係・グアンシー）を深める重要シーンです。",
        "en": "After signing a $500k contract, both leadership teams gather for an official celebratory dinner."
      },
      "steps": [
        {
          "stepIndex": 0,
          "speakerRole": {
            "vi": "Chủ tịch tập đoàn đối tác (Mr. Zhou)",
            "ja": "取引先会長（周会長）",
            "en": "Partner Chairman (Mr. Zhou)"
          },
          "promptZh": "今天合同顺利签署，非常感谢各位同仁的辛勤努力。来，大家把酒倒满！",
          "promptPinyin": "Jīntiān hétong shùnlì qiānshǔ, fēicháng gǎnxiè gèwèi tóngrén de xīnqín nǔlì. Lái, dàjiā bǎ jiǔ dàomǎn!",
          "promptTranslation": {
            "vi": "Hôm nay hợp đồng đã được ký kết suôn sẻ, vô cùng cảm ơn sự nỗ lực làm việc của tất cả các bạn đồng nghiệp. Nào, mọi người hãy rót đầy ly!",
            "ja": "本日無事に調印に至り、皆さんのご尽力に心から感謝します。さあ、杯を満たしてください！",
            "en": "Today the contract has been successfully signed; many thanks to everyone for their hard work. Come, let us fill our glasses!"
          },
          "vocabHighlights": [
            "签署",
            "同仁",
            "辛勤"
          ],
          "options": [
            {
              "text": {
                "zh": "周董事长、各位领导，我谨代表我们团队借这杯美酒向您表示崇高的敬意和感谢！今天的签约只是我们精诚合作的第一步，祝愿我们双方互利共赢、生意兴隆、友谊长存！我干了，您请随意！",
                "pinyin": "Zhōu dǒngshìzhǎng, gèwèi lǐngdǎo, wǒ jǐn dàibiǎo wǒmen tuánduì jiè zhè bēi měijiǔ xiàng nín biǎoshì chónggāo de jìngyì hé gǎnxiè! Jīntiān de qiānyuè zhǐshì wǒmen jīngchéng hézuò de dì-yī bù, zhùyuàn wǒmen shuāngfāng hùlì gòngyíng, shēngyì xīnglóng, yǒuyì chángcún! Wǒ gān le, nín qǐng suíyì!",
                "translations": {
                  "vi": "Kính thưa Chu Chủ tịch cùng các vị lãnh đạo, tôi xin phép thay mặt toàn thể đoàn nâng ly rượu ngon này bày tỏ lòng kính trọng và cảm ơn chân thành tới quý vị! Lễ ký kết hôm nay mới chỉ là bước khởi đầu cho sự hợp tác chân thành giữa đôi bên, kính chúc hai công ty cùng nhau thắng lợi (互利共赢), làm ăn phát đạt (生意兴隆), tình hữu nghị bền lâu! Tôi xin phép cạn ly, các sếp cứ tùy ý ạ!",
                  "ja": "周董事長、幹部の皆様、チームを代表し敬意と感謝を込めて杯を捧げます。本日の調印は信頼関係の第一歩です。双方の相互利益と共栄（互利共赢）、商売繁盛（生意兴隆）、そして末永い友好を祈念いたします。私は飲み干しますので、皆様はどうぞご無理なさらず！",
                  "en": "Chairman Zhou, distinguished leaders, on behalf of our team I raise this glass with highest respect and gratitude! Today is just the first step of sincere collaboration. To our mutual win-win success, thriving business, and enduring friendship! Bottoms up!"
                }
              },
              "isRecommended": true,
              "feedback": {
                "vi": "✅ Đỉnh cao của văn hóa tiệc thương mại Trung Hoa! Dùng các cặp từ 4 chữ cát tường (互利共赢, 生意兴隆, 友谊长存) và đặc biệt câu kết \"我干了，您请随意\" (Tôi cạn ly thể hiện sự nhiệt tình, còn sếp cứ nhấp môi tùy ý) là nét văn hóa thể hiện sự tôn trọng tuyệt đối.",
                "ja": "✅ 中国ビジネス宴席の完璧な作法。吉祥四字熟語を織り交ぜ、「我干了，您请随意（私は飲み干しますが、目上の貴方はご随意に）」という気遣いは最高の敬意を示します。",
                "en": "✅ Quintessential Chinese business banquet etiquette! Eloquent auspicious four-character idioms, plus the respectful custom of \"I will drain my cup, please drink at your leisure.\""
              },
              "nextStepIndex": null
            }
          ]
        }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "quiz_001_incoterms_cif_vs_fob",
      "category": "trade",
      "question": {
        "vi": "Trong hợp đồng theo điều kiện CIF (Cost, Insurance and Freight), bên nào có nghĩa vụ trả cước tàu biển và mua bảo hiểm hàng hóa quốc tế?",
        "ja": "CIF（運賃・保険料込み条件）において、海上運賃の支払いおよび海上保険の付保義務を負うのはどちらでしょうか？",
        "en": "Under Incoterms CIF (Cost, Insurance and Freight), who is responsible for paying ocean freight and procuring transit cargo insurance?"
      },
      "contextSentence": {
        "zh": "本合同采用CIF海防港条款，由卖方负责租船订舱并购买货物运输保险。",
        "pinyin": "Běn hétong cǎiyòng CIF Hǎifáng gǎng tiáokuǎn, yóu màifāng fùzé zūchuán dìngcāng bìng gòumǎi huòwù yùnshū bǎoxiǎn."
      },
      "options": [
        {
          "text": {
            "zh": "卖方 (Bên bán / Seller)",
            "translations": {
              "vi": "Bên bán (Seller / 卖方)",
              "ja": "売り手（輸出者 / 卖方）",
              "en": "The Seller (卖方)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "买方 (Bên mua / Buyer)",
            "translations": {
              "vi": "Bên mua (Buyer / 买方)",
              "ja": "買い手（輸入者 / 买方）",
              "en": "The Buyer (买方)"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "船运公司 (Hãng tàu / Shipping Line)",
            "translations": {
              "vi": "Hãng tàu biển (Shipping Line / 船运公司)",
              "ja": "船会社（Shipping Line）",
              "en": "The Shipping Line"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "保险公司 (Công ty bảo hiểm / Insurer)",
            "translations": {
              "vi": "Công ty bảo hiểm (Insurer / 保险公司)",
              "ja": "保険会社",
              "en": "The Insurance Company"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! CIF là viết tắt của Cost, Insurance and Freight (Tiền hàng, Bảo hiểm và Cước phí). Người bán chịu trách nhiệm thuê tàu, trả cước biển và mua bảo hiểm hàng hóa đến cảng đích quy định.",
        "ja": "正解です！CIF条件では、売り手（輸出者）が目的港までの運賃（Freight）および貨物海上保険（Insurance）を手配・負担します。ただしリスクの移転時期は船積港で本船に積み込まれた時点です。",
        "en": "Correct! Under CIF, the seller arranges and pays for ocean carriage to destination port and procures maritime cargo insurance."
      },
      "relatedVocabId": "v_trade_003"
    },
    {
      "id": "quiz_002_awb_negotiability",
      "category": "documents",
      "question": {
        "vi": "Khác biệt căn bản lớn nhất về mặt pháp lý giữa Vận đơn đường biển (B/L) và Vận đơn hàng không (AWB) là gì?",
        "ja": "海上運送状（B/L）と航空運送状（AWB）の法的な最大の違いは何でしょうか？",
        "en": "What is the most fundamental legal distinction between an Ocean Bill of Lading (B/L) and an Air Waybill (AWB)?"
      },
      "contextSentence": {
        "zh": "空运单不是物权凭证，收货人凭身份证明即可提货。",
        "pinyin": "Kōngyùndān bù shì wùquán píngzhèng, shōuhuòrén píng shēnfèn zhèngmíng jíkě tíhuò."
      },
      "options": [
        {
          "text": {
            "zh": "空运单不是物权凭证 (AWB không phải chứng từ sở hữu hàng hóa)",
            "translations": {
              "vi": "AWB không phải là chứng từ sở hữu hàng hóa (物权凭证), không thể chuyển nhượng ký hậu",
              "ja": "航空運送状（AWB）は有価証券（物権証券）ではなく、裏書譲渡ができない",
              "en": "AWB is not a document of title and is non-negotiable"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "海运提单不能在银行押汇 (B/L không dùng được trong thanh toán ngân hàng)",
            "translations": {
              "vi": "B/L không thể dùng để thanh toán tín dụng thư L/C tại ngân hàng",
              "ja": "B/Lは銀行の信用状決済で使用できない",
              "en": "Ocean B/L cannot be used for documentary credit at banks"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "空运单必须由船长签字 (AWB phải do thuyền trưởng ký)",
            "translations": {
              "vi": "AWB bắt buộc phải có chữ ký xác nhận của thuyền trưởng",
              "ja": "AWBは必ず船長の直筆サインが必要である",
              "en": "AWB must be signed by the ship master"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "海运提单没有编号 (B/L không có mã số)",
            "translations": {
              "vi": "B/L không bao giờ có mã số theo dõi",
              "ja": "B/Lには一意の追跡番号が存在しない",
              "en": "B/L never has a unique serial tracking number"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Vận đơn đường biển (B/L) là \"物权凭证\" (chứng từ sở hữu hàng hóa - document of title), có thể ký hậu chuyển nhượng; trong khi AWB chỉ là biên lai nhận hàng và hợp đồng chở hàng, người nhận chỉ cần chứng minh danh tính để lấy hàng.",
        "ja": "正解です！B/Lは貨物の所有権を表す「有価証券（物権証券）」であり裏書による譲渡が可能ですが、AWBは単なる運送受取証であり有価証券ではありません。",
        "en": "Correct! An Ocean B/L is a document of title allowing ownership transfer via endorsement, while an AWB is strictly a non-negotiable receipt."
      },
      "relatedVocabId": "v_doc_003"
    },
    {
      "id": "quiz_003_payment_lc_safest",
      "category": "finance",
      "question": {
        "vi": "Phương thức thanh toán quốc tế nào sau đây có sự tham gia bảo lãnh cam kết trả tiền của ngân hàng độc lập với người mua?",
        "ja": "買い手の信用とは独立して、開設銀行自身が支払いを確約・保証する国際決済手段はどれでしょうか？",
        "en": "Which international payment method provides an independent irrevocable bank payment undertaking to the seller?"
      },
      "contextSentence": {
        "zh": "为了规避大额贸易的违约风险，我们要求开立不可撤销即期信用证（L/C at sight）。",
        "pinyin": "Wèile guībì dà'é màoyì de wéiyuē fēngxiǎn, wǒmen yāoqiú kāilì bùkě chèxiāo jíqī xìnyòngzhèng (L/C at sight)."
      },
      "options": [
        {
          "text": {
            "zh": "信用证 (L/C - Letter of Credit)",
            "translations": {
              "vi": "Tín dụng thư (L/C - 信用证)",
              "ja": "信用状（L/C - Letter of Credit）",
              "en": "Letter of Credit (L/C)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "电汇 (T/T - Telegraphic Transfer)",
            "translations": {
              "vi": "Điện chuyển tiền (T/T - 电汇)",
              "ja": "電信送金（T/T - Telegraphic Transfer）",
              "en": "Telegraphic Transfer (T/T)"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "付款交单 (D/P - Documents Against Payment)",
            "translations": {
              "vi": "Nhờ thu trả tiền giao chứng từ (D/P - 付款交单)",
              "ja": "支払渡し（D/P）",
              "en": "Documents Against Payment (D/P)"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "承兑交单 (D/A - Documents Against Acceptance)",
            "translations": {
              "vi": "Nhờ thu chấp nhận thanh toán giao chứng từ (D/A - 承兑交单)",
              "ja": "引受渡し（D/A）",
              "en": "Documents Against Acceptance (D/A)"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! L/C (信用证) là cam kết trả tiền có điều kiện của Ngân hàng phát hành, chỉ cần người bán xuất trình bộ chứng từ hoàn toàn phù hợp quy định (Strict Compliance) thì ngân hàng bắt buộc phải thanh toán vô điều kiện.",
        "ja": "正解です！信用状（L/C）は銀行の信用に基づく支払い確約であり、書類が条件を満たす限り銀行が直接代金を支払うため、商業信用リスクを回避できます。",
        "en": "Correct! A Letter of Credit (L/C) substitutes commercial credit with bank credit, guaranteeing payment against complying presentation."
      },
      "relatedVocabId": "v_fin_002"
    },
    {
      "id": "quiz_004_co_form_e_purpose",
      "category": "customs",
      "question": {
        "vi": "Giấy chứng nhận xuất xứ Form E (原产地证书 Form E) được dùng chủ yếu để hưởng ưu đãi gì khi xuất nhập khẩu giữa ASEAN và Trung Quốc?",
        "ja": "中国・ASEAN自由貿易協定（ACFTA）に基づく「Form E」の主な利用目的は何でしょうか？",
        "en": "What is the primary commercial benefit of presenting a Form E Certificate of Origin under ACFTA?"
      },
      "contextSentence": {
        "zh": "提供原产地证Form E可以帮助买方在越南海关享受零关税特惠。",
        "pinyin": "Tígōng yuánchǎndì zhèng Form E kěyǐ bāngzhù mǎifāng zài Yuènán hǎiguān xiǎngshòu líng guānshuì tèhuì."
      },
      "options": [
        {
          "text": {
            "zh": "关税减免与零关税 (Miễn giảm thuế nhập khẩu ưu đãi đặc biệt)",
            "translations": {
              "vi": "Được giảm thuế hoặc miễn thuế nhập khẩu (0%) theo hiệp định ACFTA",
              "ja": "特恵関税の適用（関税の減免または無税化）",
              "en": "Preferential tariff reduction or 0% duty exemption under ACFTA"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "免除海关查验 (Miễn hoàn toàn kiểm tra thực tế hàng hóa)",
            "translations": {
              "vi": "Được miễn hoàn toàn kiểm hóa và không cần nộp tờ khai hải quan",
              "ja": "税関による一切の現物検査が免除される",
              "en": "Total exemption from physical customs inspections"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "代替提单提货 (Dùng thay thế vận đơn để nhận hàng)",
            "translations": {
              "vi": "Dùng thay thế cho vận đơn đường biển để ra cảng nhận hàng",
              "ja": "B/Lの代わりに貨物を引き取るための引換証となる",
              "en": "Serves as a substitute for B/L to collect cargo"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "免费海运费 (Miễn phí cước tàu biển)",
            "translations": {
              "vi": "Được hãng tàu miễn phí hoàn toàn tiền cước vận chuyển",
              "ja": "船会社から海上運賃が無料免除される",
              "en": "Grants free ocean freight from shipping lines"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! C/O Form E là chứng từ tối quan trọng trong thương mại Việt - Trung giúp nhà nhập khẩu được áp mức thuế suất ưu đãi đặc biệt (rất nhiều mặt hàng về mức 0%).",
        "ja": "正解です！Form EはACFTA特恵関税（多くの品目で0%関税）を享受するための必須書類です。",
        "en": "Correct! Form E certifies goods origin within the ACFTA trading bloc, unlocking special preferential tariff rates or complete duty exemption."
      },
      "relatedVocabId": "v_doc_004"
    },
    {
      "id": "quiz_005_demurrage_meaning",
      "category": "logistics",
      "question": {
        "vi": "Thuật ngữ \"滞港费\" (Demurrage) trong vận tải container đường biển có ý nghĩa là gì?",
        "ja": "海上コンテナ輸送における「滞港費（デマレージ - Demurrage）」とは何の費用でしょうか？",
        "en": "In containerized maritime shipping, what does the fee \"Demurrage\" (滞港费) represent?"
      },
      "contextSentence": {
        "zh": "必须尽快清关提柜，以免产生高额的滞港费（Demurrage）。",
        "pinyin": "Bìxū jǐnkuài qīngguān tíguì, yǐmiǎn chǎnshēng gāo'é de zhìgǎngfèi (Demurrage)."
      },
      "options": [
        {
          "text": {
            "zh": "超期占用码头堆场的费用 (Phí lưu bãi/vỏ container quá hạn miễn phí tại cảng)",
            "translations": {
              "vi": "Phí phạt do giữ container tại bãi cảng vượt quá thời gian miễn phí cho phép (Free Time)",
              "ja": "フリータイム（無料保管期間）を超過して港湾ヤードに滞留した際の超過保管料",
              "en": "Penalty fee for holding containers inside the port terminal beyond agreed free time"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "轮船加油的附加费 (Phụ phí xăng dầu của tàu)",
            "translations": {
              "vi": "Phụ phí nhiên liệu xăng dầu cho tàu biển",
              "ja": "船舶の燃料割増料金（バンカーサーチャージ）",
              "en": "Bunker fuel surcharge paid to the vessel"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "船员工资补贴 (Trợ cấp lương cho thuyền viên)",
            "translations": {
              "vi": "Tiền thưởng lương cho thuyền viên lái tàu",
              "ja": "乗組員への手当費用",
              "en": "Crew overtime allowances"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "换单服务费 (Phí dịch vụ đổi lệnh D/O)",
            "translations": {
              "vi": "Phí dịch vụ lấy lệnh giao hàng Delivery Order",
              "ja": "D/O（荷渡指図書）発行手数料",
              "en": "Delivery Order documentation fee"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Demurrage (滞港费) là phí phạt của hãng tàu tính cho chủ hàng khi container còn nằm trong bãi cảng vượt quá số ngày miễn phí (Free Time) quy định.",
        "ja": "正解です！Demurrage（デマレージ）はコンテナヤード（CY）内のフリータイムを超過した場合に船会社から請求される延滞料です。",
        "en": "Correct! Demurrage is charged when loaded containers dwell inside the marine terminal past the stipulated free days."
      },
      "relatedVocabId": "v_log_006"
    },
    {
      "id": "quiz_006_proforma_vs_commercial",
      "category": "documents",
      "question": {
        "vi": "Khác biệt căn bản giữa 形式发票 (Proforma Invoice) và 商业发票 (Commercial Invoice) là gì?",
        "ja": "形式発票（プロフォーマインボイス）と商業発票（コマーシャルインボイス）の根本的な違いは何ですか？",
        "en": "What is the fundamental difference between a Proforma Invoice (PI) and a Commercial Invoice (CI)?"
      },
      "contextSentence": {
        "zh": "形式发票仅供买方申请开立信用证及汇付定金，出货后将以商业发票正式入账。",
        "pinyin": "Xíngshì fāpiào jǐn gōng mǎifāng shēnqǐng kāilì xìnyòngzhèng jí huìfù dìngjīn, chūhuò hòu jiāng yǐ shāngyè fāpiào zhèngshì rùzhàng."
      },
      "options": [
        {
          "text": {
            "zh": "形式发票是预估报价，商业发票是具有法律效力的正式记账和清关凭证",
            "translations": {
              "vi": "PI là bản hóa đơn ước tính dùng đặt cọc/mở L/C, còn CI là hóa đơn chính thức để thanh toán và khai báo hải quan",
              "ja": "PIは見積・前受金用の仮書類であり、CIは法的に確定した本請求書兼通関申告原本である",
              "en": "PI is an estimated draft for deposits/LC, whereas CI is the definitive accounting & customs invoice"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "形式发票金额一定比商业发票大十倍",
            "translations": {
              "vi": "Số tiền trên PI luôn luôn gấp 10 lần CI",
              "ja": "PIの金額は常にCIの10倍でなければならない",
              "en": "PI amounts must always be tenfold higher than CI"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "商业发票不需要写商品名称",
            "translations": {
              "vi": "Commercial Invoice không được phép ghi tên hàng",
              "ja": "商業インボイスには品名を記載してはならない",
              "en": "Commercial Invoice prohibits naming the goods"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "只有海运才用商业发票",
            "translations": {
              "vi": "Chỉ có vận chuyển đường biển mới được dùng Commercial Invoice",
              "ja": "商業インボイスは海上輸送のみで使用される",
              "en": "Commercial Invoice is strictly used for ocean freight only"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! P/I (形式发票) chỉ là hóa đơn chiếu lệ dự thảo, không có giá trị quyết toán thuế; trong khi Commercial Invoice (商业发票) là chứng từ gốc chính thức dùng để khai báo hải quan và hạch toán kế toán.",
        "ja": "正解です！P/Iは取引合意確認や前受金送金用の仮請求書であり、正式な税務・通関申告には船積後の確定Commercial Invoiceが必須となります。",
        "en": "Correct! A Proforma Invoice is an advance estimate for financing and deposits, while a Commercial Invoice is the final legally enforceable bill."
      },
      "relatedVocabId": "v_doc_001"
    },
    {
      "id": "quiz_007_email_attachment_phrase",
      "category": "emails",
      "question": {
        "vi": "Trong thư thương mại tiếng Trung, mẫu câu nào sau đây dùng để thông báo cho đối tác xem \"tài liệu đính kèm\" một cách trang trọng và chuyên nghiệp nhất?",
        "ja": "中国語のビジネスメールで、添付ファイルを確認してもらう最も丁寧で標準的な表現はどれでしょうか？",
        "en": "In Chinese business correspondence, which phrase is the most formal and courteous way to ask the recipient to review an attachment?"
      },
      "contextSentence": {
        "zh": "相关报价单及产品规格书详见附件，请查阅。",
        "pinyin": "Xiāngguān bàojiàdān jí chǎnpǐn guīgéshū xiángjiàn fùjiàn, qǐng cháyùe."
      },
      "options": [
        {
          "text": {
            "zh": "详见附件，请查阅 (Chi tiết xem trong tệp đính kèm, xin vui lòng kiểm tra)",
            "translations": {
              "vi": "详见附件，请查阅 / 随信附上... 请查收 (Chi tiết xem đính kèm, xin mời kiểm tra)",
              "ja": "詳見添付（詳細は添付ファイルをご参照ください）/ 随信附上...",
              "en": "Please refer to the attachment / Attached please find..."
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "你看邮件下面 (Bạn nhìn xuống dưới email)",
            "translations": {
              "vi": "你看邮件下面 (Bạn nhìn phía dưới email kìa)",
              "ja": "メールの下を見てください",
              "en": "Look at the bottom of the email"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "别忘了看我的文件 (Đừng quên xem tài liệu của tôi nhé)",
            "translations": {
              "vi": "别忘了看我的文件 (Đừng quên xem tài liệu của tao đấy)",
              "ja": "私のファイルを見るのを忘れないで",
              "en": "Don’t forget to check my file"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "给你看这个 (Cho bạn xem cái này)",
            "translations": {
              "vi": "给你看这个 (Cho mày xem cái này)",
              "ja": "これを見てあげる",
              "en": "Here you look at this"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! \"详见附件，请查收 / 请查阅\" là mẫu câu trang trọng kinh điển trong thư tín thương mại tiếng Trung.",
        "ja": "正解です！「详见附件，请查阅 / 随信附上...」は中国語ビジネスメールにおける定型句であり、添付ファイルの案内として最も礼儀正しい表現です。",
        "en": "Correct! \"详见附件，请查阅 / 请查收\" is the definitive professional formula for drawing attention to attached documents."
      },
      "relatedVocabId": "v_email_003"
    },
    {
      "id": "quiz_008_moq_abbreviation",
      "category": "sales_purchasing",
      "question": {
        "vi": "Thuật ngữ \"起订量\" (MOQ) trong giao dịch mua bán nhà xưởng có nghĩa là gì?",
        "ja": "製造業・輸出入取引における「起訂量（MOQ）」とは何を指すでしょうか？",
        "en": "What does \"起订量\" (MOQ - Minimum Order Quantity) signify in manufacturing and trade negotiations?"
      },
      "contextSentence": {
        "zh": "这款智能手表的起订量是500台，低于该数量无法安排定制丝印。",
        "pinyin": "Zhè kuǎn zhìnéng shǒubiǎo de qǐdìngliàng shì wǔbǎi tái, dīyú gāi shùliàng wúfǎ ānpái dìngzhì sīyìn."
      },
      "options": [
        {
          "text": {
            "zh": "最低起订数量 (Minimum Order Quantity)",
            "translations": {
              "vi": "Số lượng đặt hàng tối thiểu xưởng mới nhận sản xuất",
              "ja": "工場が受注・生産を開始する最小発注ロット数量（MOQ）",
              "en": "Minimum Order Quantity required for the manufacturer to accept an order"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "每个集装箱最大的装载量 (Khối lượng tối đa 1 container)",
            "translations": {
              "vi": "Số lượng tối đa chứa được trong 1 container",
              "ja": "コンテナ1本あたりの最大積載可能数",
              "en": "Maximum container payload capacity"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "工厂一天的总产量 (Sản lượng 1 ngày của xưởng)",
            "translations": {
              "vi": "Tổng sản lượng xuất xưởng trong một ngày của nhà máy",
              "ja": "工場の1日あたりの総生産能力",
              "en": "Daily production output of the factory"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "样品免费寄送的数量 (Số lượng mẫu được gửi miễn phí)",
            "translations": {
              "vi": "Số lượng hàng mẫu miễn phí tối đa gửi cho khách",
              "ja": "無料サンプルの最大送付可能数",
              "en": "Maximum quota for free evaluation samples"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! 起订量 (qǐdìngliàng) chính là MOQ (Minimum Order Quantity), số lượng tối thiểu để dây chuyền nhà máy khởi động sản xuất hoặc có được đơn giá tốt.",
        "ja": "正解です！起订量（MOQ）は、金型段取りや資材調達の観点から工場が設定する最低受注数量です。",
        "en": "Correct! 起订量 represents the Minimum Order Quantity required to cover tooling and setup overhead."
      },
      "relatedVocabId": "v_sales_002"
    },
    {
      "id": "quiz_009_hs_code_digits",
      "category": "customs",
      "question": {
        "vi": "Mã số HS Code (商品编码) gồm bao nhiêu chữ số đầu tiên được tiêu chuẩn hóa thống nhất trên toàn thế giới theo Công ước WCO?",
        "ja": "世界税関機構（WCO）のHS条約において、世界共通で統一されているHSコードの桁数は何桁でしょうか？",
        "en": "Under the World Customs Organization (WCO) convention, how many leading digits of an HS Code are harmonized internationally?"
      },
      "contextSentence": {
        "zh": "前6位HS Code是国际通用的，后几位各国有细微分类差异。",
        "pinyin": "Qián liù wèi HS Code shì guójì tōngyòng de, hòu jǐ wèi gèguó yǒu xìwēi fēnlèi chāyì."
      },
      "options": [
        {
          "text": {
            "zh": "前6位 (6 chữ số đầu tiên)",
            "translations": {
              "vi": "6 chữ số đầu tiên (Chương, Nhóm, Phân nhóm)",
              "ja": "上6桁（類・項・号）が世界共通",
              "en": "First 6 digits (Chapter, Heading, Subheading)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "前2位 (2 chữ số đầu)",
            "translations": {
              "vi": "Chỉ 2 chữ số đầu",
              "ja": "上2桁のみ",
              "en": "First 2 digits only"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "12位全统 (Cả 12 chữ số giống hệt nhau)",
            "translations": {
              "vi": "Cả 12 chữ số đều hoàn toàn giống nhau",
              "ja": "12桁すべて完全一致",
              "en": "All 12 digits are universally identical"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "前4位 (4 chữ số)",
            "translations": {
              "vi": "4 chữ số đầu",
              "ja": "上4桁",
              "en": "First 4 digits"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! 6 chữ số đầu của mã HS (Harmonized System) là thống nhất toàn cầu. Từ chữ số thứ 7 hoặc thứ 8 trở đi, mỗi quốc gia (như Việt Nam có biểu 8 chữ số, Trung Quốc 10 chữ số) sẽ quy định chi tiết thêm.",
        "ja": "正解です！HSコードの上6桁はWCO加盟国共通で規定されており、それ以降の細分化（7〜10桁等）は各国が独自に定めます。",
        "en": "Correct! The first 6 digits of HS codes are universally standard worldwide under WCO; downstream digits vary by national tariff schedules."
      },
      "relatedVocabId": "v_customs_002"
    },
    {
      "id": "quiz_010_packing_list_gw_nw",
      "category": "documents",
      "question": {
        "vi": "Trên Phiếu đóng gói (Packing List), ký hiệu \"GW\" (毛重) và \"NW\" (净重) đại diện cho điều gì?",
        "ja": "パッキングリスト（Packing List）に記載される「GW（毛重）」と「NW（净重）」の違いは何ですか？",
        "en": "On a shipping Packing List, what do \"GW\" (毛重) and \"NW\" (净重) represent?"
      },
      "contextSentence": {
        "zh": "本批货物毛重（GW）为1,250公斤，净重（NW）为1,100公斤。",
        "pinyin": "Běn pī huòwù máozhòng (GW) wéi yītóng èrbǎi wǔshí gōngjīn, jìngzhòng (NW) wéi yītóng yībǎi gōngjīn."
      },
      "options": [
        {
          "text": {
            "zh": "毛重含包装重量，净重为去除包装后的纯货物重量",
            "translations": {
              "vi": "GW là tổng trọng lượng bao gồm cả bao bì kiện, NW là trọng lượng tịnh chỉ riêng hàng hóa",
              "ja": "GW（総重量）は梱包材込みの重さ、NW（正味重量）は中身の製品だけの重さ",
              "en": "GW is gross weight including packaging; NW is pure net product weight"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "GW是集装箱重量，NW是卡车重量",
            "translations": {
              "vi": "GW là khối lượng container, NW là trọng lượng xe tải chở hàng",
              "ja": "GWはコンテナ自体の自重、NWはトラックの自重",
              "en": "GW is container tare weight; NW is truck weight"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "GW是第一批货，NW是第二批货",
            "translations": {
              "vi": "GW là lô hàng 1, NW là lô hàng thứ 2",
              "ja": "GWは第1ロット、NWは第2ロットを意味する",
              "en": "GW is batch 1; NW is batch 2"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "GW和NW完全没有区别",
            "translations": {
              "vi": "GW và NW hoàn toàn giống nhau không phân biệt",
              "ja": "両者に違いは全くない",
              "en": "GW and NW are completely interchangeable synonyms"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! 毛重 (máozhòng - Gross Weight) là tổng trọng lượng cả bao bì thùng hộp; 净重 (jìngzhòng - Net Weight) là trọng lượng tịnh không tính bao bì.",
        "ja": "正解です！Gross Weight（毛重）は外装カートンやパレットを含めた全重量で、Net Weight（净重）は製品本体のみの正味重量です。",
        "en": "Correct! Gross Weight (毛重) includes cartons/pallets, whereas Net Weight (净重) excludes all outer packing materials."
      },
      "relatedVocabId": "v_doc_002"
    },
    {
      "id": "quiz_011_force_majeure_clause",
      "category": "trade",
      "question": {
        "vi": "Điều khoản \"不可抗力\" (Force Majeure) trong hợp đồng thương mại quốc tế áp dụng trong trường hợp nào sau đây?",
        "ja": "国際売買契約における「不可抗力条項（Force Majeure）」はどのような事態に適用されますか？",
        "en": "When does the \"Force Majeure\" (不可抗力) clause in international contracts become applicable?"
      },
      "contextSentence": {
        "zh": "如发生地震、台风等不可抗力事件，受影响方可免除违约责任。",
        "pinyin": "Rú fāshēng dìzhèn, táifēng děng bùkěkànglì shìjiàn, shòu yǐngxiǎng fāng kě miǎnchú wéiyuē zérèn."
      },
      "options": [
        {
          "text": {
            "zh": "地震、海啸、战争等无法预见且无法控制的客观事件",
            "translations": {
              "vi": "Sự kiện bất khả kháng khách quan không thể lường trước và không thể kiểm soát (động đất, sóng thần, chiến tranh...)",
              "ja": "地震、台風、戦争、暴動など、当事者の合理的支配を超える予見不可能な事由",
              "en": "Unforeseeable and uncontrollable external events (earthquakes, tsunamis, armed conflicts)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "工厂工人睡过头迟到",
            "translations": {
              "vi": "Công nhân nhà máy ngủ quên đi muộn",
              "ja": "工場の従業員が寝坊して遅刻した時",
              "en": "Factory workers sleeping in and coming late"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "不想履行合同想去度假",
            "translations": {
              "vi": "Giám đốc muốn đi nghỉ mát nên lười làm hàng",
              "ja": "社長が休暇旅行に行きたくなった時",
              "en": "Deciding to take a vacation instead of working"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "觉得利润太低反悔不想卖",
            "translations": {
              "vi": "Thấy lãi ít nên nuốt lời không muốn bán nữa",
              "ja": "利益が少ないため売り惜しみしたくなった時",
              "en": "Changing mind because profit margins look too slim"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! 不可抗力 (Bất khả kháng) là các sự kiện thiên tai, chiến tranh hoặc biến cố bất khả kháng khiến các bên được miễn trừ trách nhiệm bồi thường vi phạm hợp đồng.",
        "ja": "正解です！不可抗力とは天災地変や戦争等、当事者が善良な管理者としての注意を払っても回避できない客観的障害を指し、免責事由となります。",
        "en": "Correct! Force Majeure excuses non-performance caused by unforeseeable events outside reasonable human control."
      },
      "relatedVocabId": "v_trade_008"
    },
    {
      "id": "quiz_012_customs_channels",
      "category": "customs",
      "question": {
        "vi": "Tại hải quan Việt Nam và Trung Quốc, tờ khai hải quan được phân vào \"绿通\" (Luồng Xanh / Green Channel) có nghĩa là gì?",
        "ja": "税関の審査区分において「グリーンチャネル（緑通・Luồng Xanh）」に判定された場合、どのような扱いになりますか？",
        "en": "What does clearance through the \"Green Channel\" (绿通) indicate in customs import processing?"
      },
      "contextSentence": {
        "zh": "幸运的是，这批货系统直接走了绿通，省去了开箱查验的时间。",
        "pinyin": "Xìngyùn de shì, zhè pī huò xìtǒng zhíjiē zǒu le lǜ tōng, shěngqù le kāixiāng cháyàn de shíjiān."
      },
      "options": [
        {
          "text": {
            "zh": "免除审单和查验，自动放行 (Miễn kiểm tra hồ sơ và miễn kiểm hóa, thông quan tự động)",
            "translations": {
              "vi": "Miễn kiểm tra chứng từ giấy và miễn kiểm hóa thực tế, được hệ thống cho phép thông quan tự động",
              "ja": "書類審査および現物開梱検査が免除され、電子的に即時通関許可される",
              "en": "Exempt from paper review and physical inspection; automatic release granted"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "必须100%开箱掏柜 (Phải dỡ toàn bộ hàng ra đếm từng cái)",
            "translations": {
              "vi": "Bắt buộc phải hạ container xuống dỡ 100% thùng ra đếm",
              "ja": "全量コンテナから荷卸しして全品目視検査を行う",
              "en": "Mandatory 100% full container de-vanning and piece-by-piece inspection"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "货物将被直接没收 (Hàng hóa bị tịch thu tiêu hủy)",
            "translations": {
              "vi": "Hàng hóa bị tịch thu ngay lập tức",
              "ja": "貨物が直ちに没収処分となる",
              "en": "Cargo is seized immediately"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "只能进口绿色环保产品 (Chỉ được phép chở rau quả xanh)",
            "translations": {
              "vi": "Chỉ áp dụng riêng cho hàng nông sản và rau củ xanh",
              "ja": "緑色の製品しか輸入できない",
              "en": "Restricted solely to green organic vegetables"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Luồng Xanh (绿通) là luồng ưu tiên cao nhất, người khai hải quan được miễn kiểm tra hồ sơ giấy và miễn kiểm hóa thực tế hàng hóa, tiết kiệm rất nhiều chi phí và thời gian.",
        "ja": "正解です！グリーンチャネルは低リスク貨物に対する優遇措置で、書類審査も現物検査も免除されて即座に許可が出ます。",
        "en": "Correct! The Green Channel is the fastest customs routing, waiving both document review and physical container unpacking."
      },
      "relatedVocabId": "v_customs_004"
    },
    {
      "id": "quiz_013_telex_release_bl",
      "category": "documents",
      "question": {
        "vi": "Thuật ngữ \"电放提单\" (Telex Release B/L / Surrender B/L) trong vận tải biển có nghĩa là gì?",
        "ja": "海上輸送における「電放提単（テレックス・リリース / サレンダーB/L）」とはどのような手続きでしょうか？",
        "en": "What does \"Telex Release B/L\" (电放提单) signify in maritime container shipping?"
      },
      "contextSentence": {
        "zh": "收到尾款后，我们将安排船公司进行电放（Telex Release），收货人无需正本提单即可提货。",
        "pinyin": "Shōudào wěikuǎn hòu, wǒmen jiāng ānpái chuángōngsī jìnxíng diànfàng (Telex Release), shōuhuòrén wúxū zhèngběn tídān jíkě tíhuò."
      },
      "options": [
        {
          "text": {
            "zh": "卖方交还正本提单，发货人授权目的港无需正本直接放货 (Giao hàng bằng điện tín không cần vận đơn gốc)",
            "translations": {
              "vi": "Nhà xuất khẩu nộp lại vận đơn gốc cho hãng tàu tại cảng đi và ủy quyền điện giải phóng hàng tại cảng đến mà người mua không cần xuất trình vận đơn gốc giấy",
              "ja": "荷送人が船籍地で原本を回収（サレンダー）させ、仕向地で原本なしで貨物引渡しを許可する電信手続き",
              "en": "Shipper surrenders original B/L at origin, allowing destination release electronically without paper original"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "用闪电发电把提单烧掉",
            "translations": {
              "vi": "Dùng dòng điện đốt cháy tờ vận đơn",
              "ja": "電気で書類を破棄すること",
              "en": "Burning the physical bill with electricity"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "只能装载电子产品",
            "translations": {
              "vi": "Chỉ áp dụng khi chở các mặt hàng điện tử linh kiện",
              "ja": "電化製品にのみ適用される運送状",
              "en": "Restricted solely to consumer electronics"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "船长直接送货到买方家里",
            "translations": {
              "vi": "Thuyền trưởng trực tiếp mang hàng về tận nhà người mua",
              "ja": "船長が買い手の自宅まで直接届けること",
              "en": "Captain personally hand-delivers goods to buyer door"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! 电放 (diànfàng - Telex Release) giúp tiết kiệm thời gian gửi thư chuyển phát nhanh chứng từ giấy gốc (rất phù hợp với các tuyến vận chuyển ngắn như Trung Quốc - Việt Nam chỉ mất 2-3 ngày tàu chạy).",
        "ja": "正解です！航海日数が2〜3日と短い日中航路や中越航路では、原本郵送による揚げ地での停滞を防ぐため電放（サレンダー）が極めて多用されます。",
        "en": "Correct! Telex Release accelerates release for short-transit routes (e.g., China to Vietnam 2-3 days) where cargo arrives before courier papers."
      },
      "relatedVocabId": "v_doc_003"
    },
    {
      "id": "quiz_014_fcl_vs_lcl",
      "category": "logistics",
      "question": {
        "vi": "Khác biệt căn bản giữa \"整柜\" (FCL - Full Container Load) và \"拼箱\" (LCL - Less than Container Load) là gì?",
        "ja": "国際コンテナ輸送における「整櫃（FCL）」と「拼箱（LCL）」の違いは何ですか？",
        "en": "What is the distinction between \"整柜\" (FCL - Full Container Load) and \"拼箱\" (LCL - Less than Container Load)?"
      },
      "contextSentence": {
        "zh": "本次货物体积只有3个立方（CBM），走拼箱（LCL）比整柜更划算。",
        "pinyin": "Běn cì huòwù tǐjī zhǐyǒu sān gè lìfāng (CBM), zǒu pīnxiāng (LCL) bǐ zhěngguì gèng huásuàn."
      },
      "options": [
        {
          "text": {
            "zh": "整柜为独享整只集装箱，拼箱为多家货主共享同一只集装箱",
            "translations": {
              "vi": "FCL là 1 chủ hàng sử dụng trọn vẹn cả container, LCL là ghép chung hàng của nhiều chủ hàng trong cùng 1 container",
              "ja": "FCLは一荷主がコンテナ1本を満載専有し、LCLは複数荷主の小口貨物を1本のコンテナに混載する",
              "en": "FCL is dedicated full container use by one shipper; LCL consolidates multiple shippers cargo into one container"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "整柜只能装箱子，拼箱只能装液体",
            "translations": {
              "vi": "FCL chỉ chở đồ hộp, LCL chỉ chở chất lỏng",
              "ja": "FCLは箱物専用、LCLは液体専用である",
              "en": "FCL is for boxes only; LCL is for liquids only"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "拼箱不需要报关",
            "translations": {
              "vi": "LCL không cần phải mở tờ khai hải quan",
              "ja": "LCL貨物は税関申告が免除される",
              "en": "LCL cargo requires zero customs clearance"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "整柜是免费运输的",
            "translations": {
              "vi": "FCL là vận chuyển hoàn toàn miễn phí",
              "ja": "FCLは運賃が全額無料である",
              "en": "FCL shipping is 100% free of charge"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! 整柜 (FCL) là đóng hàng nguyên công cho một chủ hàng duy nhất, còn 拼箱 (LCL) là gom ghép các lô hàng nhỏ lẻ của nhiều khách hàng vào chung một công tại kho CFS.",
        "ja": "正解です！小口貨物の場合はCFS（コンテナ・フレート・ステーション）で混載（LCL）を行い、物量がまとまればFCLで手配するのが定石です。",
        "en": "Correct! FCL occupies an entire container exclusively, while LCL consolidates smaller shipments into a shared container at a CFS."
      },
      "relatedVocabId": "v_log_002"
    },
    {
      "id": "quiz_015_payment_tt_deposit_balance",
      "category": "finance",
      "question": {
        "vi": "Trong điều khoản thanh toán \"30% T/T Advance, 70% against B/L copy\", người mua sẽ chuyển khoản nốt 70% số tiền còn lại khi nào?",
        "ja": "「30% T/T前受金、残金70%はB/Lコピー確認後」の決済条件において、買い手はいつ残金の70%を送金すべきでしょうか？",
        "en": "Under payment terms \"30% T/T Advance, 70% against B/L copy\", when is the 70% balance due from the buyer?"
      },
      "contextSentence": {
        "zh": "卖方提供提单扫描件后，买方应在3个工作日内电汇结清70%尾款。",
        "pinyin": "Màifāng tígōng tídān sǎomiáojiàn hòu, mǎifāng yīng zài sān gè gōngzuòrì nèi diànhuì jiéqīng bǎifēnzhī qīshí wěikuǎn."
      },
      "options": [
        {
          "text": {
            "zh": "卖方完成装船发货并提供海运提单扫描件后",
            "translations": {
              "vi": "Sau khi bên bán đã bốc hàng lên tàu và gửi bản scan vận đơn đường biển B/L",
              "ja": "売り手が船積みを完了し、発行された海上運送状（B/L）のコピーを提示した時点",
              "en": "After the seller finishes loading onto vessel and presents a scanned copy of ocean B/L"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "签约后立刻付清",
            "translations": {
              "vi": "Thanh toán ngay lập tức khi vừa ký hợp đồng",
              "ja": "契約締結直後に全額即時送金",
              "en": "Immediately upon signing the contract"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "货物在商场全部卖完后一年",
            "translations": {
              "vi": "Một năm sau khi đã bán sạch hàng ngoài siêu thị",
              "ja": "商品がすべて店頭で売り切れた1年後",
              "en": "One year after goods sell out completely in retail stores"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "不需付款，完全赠送",
            "translations": {
              "vi": "Không cần trả vì là hàng biếu tặng",
              "ja": "贈答品のため支払いは永久に不要",
              "en": "No payment needed as it is a complimentary gift"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Đây là điều kiện T/T phổ biến nhất: 30% cọc để bên bán mua vật tư sản xuất; 70% thanh toán sau khi hàng đã lên tàu và người mua kiểm tra bản scan B/L hợp lệ.",
        "ja": "正解です！最も一般的な国際送金条件です。売り手は前受金（30%）で部材調達し、船積証明となるB/Lコピーを提示して残金（70%）を回収します。",
        "en": "Correct! Standard balanced T/T structure: 30% funds raw materials, 70% settles once evidence of vessel departure (B/L copy) is proven."
      },
      "relatedVocabId": "v_fin_001"
    },
    {
      "id": "quiz_016_aql_inspection",
      "category": "aftersales",
      "question": {
        "vi": "Tiêu chuẩn kiểm phẩm \"AQL\" (Acceptable Quality Limit / 接收质量限) được dùng phổ biến trong nhà xưởng có ý nghĩa gì?",
        "ja": "製造業の品質検査で頻出する「AQL（合格品質水準 / 接收质量限）」とは何を意味しますか？",
        "en": "What does \"AQL\" (Acceptable Quality Limit / 接收质量限) establish during third-party factory quality inspections?"
      },
      "contextSentence": {
        "zh": "本批大货质检依照AQL 2.5/4.0抽检标准执行。",
        "pinyin": "Běn pī dàhuò zhìjiǎn yīzhào AQL èr diǎn wǔ fēnzhī sì diǎn líng chōujiǎn biāozhǔn zhíxíng."
      },
      "options": [
        {
          "text": {
            "zh": "抽样检验中允许的最大不良品比率界限",
            "translations": {
              "vi": "Giới hạn tỷ lệ hàng khuyết tật tối đa cho phép để lô hàng được chấp nhận nghiệm thu",
              "ja": "抜取検査において許容される不良品数・欠陥率の許容限界水準",
              "en": "The maximum permissible percentage of defective items in a statistical sample for batch acceptance"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "机器电量的百分比",
            "translations": {
              "vi": "Tỷ lệ % dung lượng pin máy móc",
              "ja": "工場の機械バッテリー残量",
              "en": "Percentage of factory machine battery remaining"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "集装箱装满的百分比",
            "translations": {
              "vi": "Tỷ lệ phần trăm xếp đầy container",
              "ja": "コンテナ積載率のパーセンテージ",
              "en": "Percentage of container filling level"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "外箱印刷颜色的数量",
            "translations": {
              "vi": "Số lượng màu sắc in trên thùng carton",
              "ja": "段ボール外装の印刷色数",
              "en": "Number of colors printed on outer cartons"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! AQL là chuẩn mực quốc tế (ISO 2859-1) quy định số lượng lỗi tối đa (lỗi nghiêm trọng Critical, lỗi nặng Major, lỗi nhẹ Minor) được phép xuất hiện trong số mẫu rút ngẫu nhiên.",
        "ja": "正解です！AQL（Acceptance Quality Limit）は国際規格に基づく統計的抜取検査基準で、バイヤーとサプライヤー間の合否判断基準となります。",
        "en": "Correct! AQL (ISO 2859-1) defines statistical thresholds for Critical, Major, and Minor defects tolerated in batch sampling."
      },
      "relatedVocabId": "v_after_001"
    },
    {
      "id": "quiz_017_customs_red_channel",
      "category": "customs",
      "question": {
        "vi": "Khi tờ khai hải quan rơi vào \"红通\" (Luồng Đỏ / Red Channel), thủ tục bắt buộc phải làm tiếp theo là gì?",
        "ja": "通関判定で「レッドチャネル（红通）」が割り振られた場合、必須となる手続きは何でしょうか？",
        "en": "When a customs declaration falls into the \"Red Channel\" (红通), what mandatory procedure must be performed?"
      },
      "contextSentence": {
        "zh": "海关系统将该票货物列入红通，需开箱进行现场实物查验。",
        "pinyin": "Hǎiguān xìtǒng jiāng gāi piào huòwù lièrù hóngtōng, xū kāixiāng jìnxíng xiànchǎng shíwù cháyàn."
      },
      "options": [
        {
          "text": {
            "zh": "开箱进行实物现场查验和核对品名 (Hạ cont mở thùng kiểm tra thực tế hàng hóa)",
            "translations": {
              "vi": "Kiểm tra hồ sơ giấy đồng thời hạ container, mở thùng kiểm hóa thực tế tại bãi kiểm tra của hải quan",
              "ja": "書類審査に加え、コンテナを開梱して現物貨物と申告内容の対比目視検査を行う",
              "en": "Undergo paper review plus mandatory physical unboxing and inspection at the port examination platform"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "立刻把货全部退回中国 (Ngay lập tức trả toàn bộ hàng về Trung Quốc)",
            "translations": {
              "vi": "Ngay lập tức tái xuất trả hết hàng về Trung Quốc không cần làm gì",
              "ja": "直ちに貨物を中国へ積戻し返送する",
              "en": "Immediately return all cargo back to China without inspection"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "什么都不用做，直接拉回家 (Không cần làm gì, kéo thẳng về nhà)",
            "translations": {
              "vi": "Không cần làm gì cả, cứ thế kéo container về công ty",
              "ja": "何もしなくても自動で会社に持ち帰ることができる",
              "en": "Take no action and drive the container directly home"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "只检查司机的驾驶证 (Chỉ kiểm tra bằng lái của tài xế)",
            "translations": {
              "vi": "Chỉ kiểm tra giấy phép lái xe của bác tài xe container",
              "ja": "トラック運転手の運転免許証のみを確認する",
              "en": "Only inspect the truck driver driver license"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Luồng Đỏ (红通) yêu cầu cơ quan hải quan kiểm tra chi tiết cả hồ sơ lẫn thực tế hàng hóa (mở thùng kiểm tra nhãn mác, số lượng, chủng loại, xuất xứ).",
        "ja": "正解です！レッドチャネル（Luồng Đỏ）は最も厳格な審査区分で、コンテナを開梱して現品と申告内容が合致しているか立ち会い検査を受けます。",
        "en": "Correct! The Red Channel triggers rigorous scrutiny: both comprehensive documentation review and physical cargo unboxing."
      },
      "relatedVocabId": "v_customs_004"
    },
    {
      "id": "quiz_018_cbm_calculation",
      "category": "logistics",
      "question": {
        "vi": "Một kiện hàng có kích thước 100cm x 80cm x 50cm. Thể tích tính theo CBM (Cubic Meter - 立方米) của kiện hàng này là bao nhiêu?",
        "ja": "外寸が100cm × 80cm × 50cmの貨物1個の容積（CBM・立方米）はいくつでしょうか？",
        "en": "A cargo carton measures 100cm x 80cm x 50cm. What is its volume in CBM (Cubic Meters)?"
      },
      "contextSentence": {
        "zh": "计算总体积（CBM）以便预订合适的集装箱或计算拼箱运费。",
        "pinyin": "Jìsuàn zǒngtǐjī (CBM) yǐbiàn yùdìng héshì de jízhuāngxiāng huò jìsuàn pīnxiāng yùnfèi."
      },
      "options": [
        {
          "text": {
            "zh": "0.40 CBM (1.0m x 0.8m x 0.5m = 0.4 m³)",
            "translations": {
              "vi": "0.40 CBM (1.0m x 0.8m x 0.5m = 0.40 mét khối)",
              "ja": "0.40 CBM（1.0m × 0.8m × 0.5m = 0.40 m³）",
              "en": "0.40 CBM (1.0m x 0.8m x 0.5m = 0.40 m³)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "4.0 CBM",
            "translations": {
              "vi": "4.0 CBM",
              "ja": "4.0 CBM",
              "en": "4.0 CBM"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "400 CBM",
            "translations": {
              "vi": "400 CBM",
              "ja": "400 CBM",
              "en": "400 CBM"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "0.04 CBM",
            "translations": {
              "vi": "0.04 CBM",
              "ja": "0.04 CBM",
              "en": "0.04 CBM"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Công thức tính CBM: Dài (m) x Rộng (m) x Cao (m). Ở đây: 1.0m x 0.8m x 0.5m = 0.40 CBM.",
        "ja": "正解です！CBMの計算式は「長さ(m) × 幅(m) × 高さ(m)」です。1.0 × 0.8 × 0.5 = 0.40 m³（CBM）となります。",
        "en": "Correct! CBM = Length(m) x Width(m) x Height(m) = 1.0m x 0.8m x 0.5m = 0.40 CBM."
      },
      "relatedVocabId": "v_log_003"
    },
    {
      "id": "quiz_019_ddp_term",
      "category": "trade",
      "question": {
        "vi": "Theo điều kiện DDP (Delivered Duty Paid - 完税后交货), trách nhiệm nộp thuế nhập khẩu và giao hàng đến tận kho người mua thuộc về ai?",
        "ja": "インコタームズのDDP条件（関税込み持込渡し / 完税后交货）において、輸入関税を納付し買い手の指定倉庫まで届ける責任を負うのは誰でしょうか？",
        "en": "Under Incoterms DDP (Delivered Duty Paid - 完税后交货), who bears full responsibility for import duties and door delivery?"
      },
      "contextSentence": {
        "zh": "DDP条款下，卖方承担所有运输风险并负责缴纳进口国关税。",
        "pinyin": "DDP tiáokuǎn xià, màifāng chéngdān suǒyǒu yùnshū fēngxiǎn bìng fùzé jiǎonà jìnkǒuguó guānshuì."
      },
      "options": [
        {
          "text": {
            "zh": "卖方承担最大责任 (Bên bán chịu toàn bộ trách nhiệm và nộp thuế)",
            "translations": {
              "vi": "Bên bán (Seller) chịu trách nhiệm tối đa: làm thủ tục xuất nhập khẩu, trả thuế và giao tận kho người mua",
              "ja": "売り手（輸出者）が最大の義務を負い、輸入通関手続および関税納付を含め買い手の倉庫まで届ける",
              "en": "The Seller bears maximum obligation, paying all transport costs and destination customs duties"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "买方承担一切费用 (Bên mua chịu hết)",
            "translations": {
              "vi": "Bên mua phải chịu mọi chi phí và thuế",
              "ja": "買い手がすべての費用と税金を負担する",
              "en": "The Buyer bears all expenses and duties"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "由海关总署免费配送 (Hải quan miễn phí giao tận nhà)",
            "translations": {
              "vi": "Cơ quan hải quan sẽ điều xe giao hàng miễn phí tận nhà",
              "ja": "税関当局が無料で自宅まで配達する",
              "en": "Customs headquarters provides free door-to-door delivery"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "货运司机自己掏腰包交税 (Tài xế tự bỏ tiền túi trả thuế)",
            "translations": {
              "vi": "Bác tài xế tự bỏ tiền túi của mình ra đóng thuế",
              "ja": "配送ドライバーが自腹で関税を立て替える",
              "en": "The truck driver pays customs duties out of personal pocket"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! DDP là điều kiện Incoterms mang lại nghĩa vụ tối đa cho bên bán (Seller), ngược lại hoàn toàn với EXW (Ex Works mang lại nghĩa vụ tối thiểu cho bên bán).",
        "ja": "正解です！DDPは売主最大義務条件であり、仕向地での輸入通関・関税・国内配送まで売主が全責任を負います（買主最小義務条件EXWと対比されます）。",
        "en": "Correct! DDP represents the maximum obligation for the seller, requiring seller to clear destination customs, pay duties, and deliver directly to the buyer door."
      },
      "relatedVocabId": "v_trade_004"
    },
    {
      "id": "quiz_020_email_salutation_honorific",
      "category": "emails",
      "question": {
        "vi": "Trong thư thương mại tiếng Trung, khi gửi cho đối tác hoặc cấp trên lần đầu tiên, từ xưng hô tôn kính lịch sự nhất là gì?",
        "ja": "中国語のビジネスメールにおいて、取引先や目上の相手に対する最も敬意のある二人称はどれでしょうか？",
        "en": "In professional Chinese business correspondence, what is the most respectful honorific second-person pronoun to address a customer or senior executive?"
      },
      "contextSentence": {
        "zh": "尊敬的张总：您好！非常荣幸能与贵司取得联系。",
        "pinyin": "Zūnjìng de Zhāng zǒng: Nín hǎo! Fēicháng róngxìng néng yǔ guìsī qǔdé liánxì."
      },
      "options": [
        {
          "text": {
            "zh": "您 (Nín) & 贵司 (Guìsī)",
            "translations": {
              "vi": "您 (Ngài / Quý anh chị) & 贵司 (Quý công ty)",
              "ja": "您（敬称の「貴方」）および 贵司（「貴社・御社」）",
              "en": "您 (Respectful You) & 贵司 (Your Esteemed Company)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "你 (Nǐ) & 你们公司",
            "translations": {
              "vi": "你 (Mày / Bạn thân mật) & 你们公司 (Bọn mày)",
              "ja": "你（親しい友人向け）および 你们公司",
              "en": "你 (Informal you) & 你们公司"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "喂 (Wèi)",
            "translations": {
              "vi": "喂 (Alo)",
              "ja": "喂（もしもし）",
              "en": "喂 (Hey)"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "那个谁 (Cái ai đó)",
            "translations": {
              "vi": "那个谁 (Cái người đó ơi)",
              "ja": "那个谁（そこの誰か）",
              "en": "那个谁 (Hey someone)"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Trong thư thương mại, luôn luôn dùng \"您\" thay vì \"你\", dùng \"贵司\" (quý công ty) và \"我司\" (công ty chúng tôi) để giữ gìn phong thái khiêm nhường, chuyên nghiệp.",
        "ja": "正解です！ビジネス文書では「你」ではなく敬称の「您」を用い、相手企業を「贵司」、自社を「我司」と呼ぶのが鉄則のマナーです。",
        "en": "Correct! Professional Chinese uses \"您\" (formal you), \"贵司\" (Your esteemed company), and \"我司\" (Our humble company)."
      },
      "relatedVocabId": "v_email_001"
    },
    {
      "id": "quiz_021_commercial_invoice_box",
      "category": "documents",
      "question": {
        "vi": "Trên Vận đơn B/L và Hóa đơn thương mại, mục \"Consignee\" (收货人) chỉ đối tượng nào?",
        "ja": "船荷証券（B/L）やインボイスにおける「Consignee（收货人）」とは誰を指しますか？",
        "en": "On a commercial invoice and shipping B/L, what entity is identified under the \"Consignee\" (收货人) box?"
      },
      "contextSentence": {
        "zh": "收货人（Consignee）必须与海关进口申报的主体保持一致。",
        "pinyin": "Shōuhuòrén (Consignee) bìxū yǔ hǎiguān jìnkǒu shēnbào de zhǔtǐ bǎochí yīzhì."
      },
      "options": [
        {
          "text": {
            "zh": "货物接收人 / 进口商 (Người nhận hàng / Nhà nhập khẩu)",
            "translations": {
              "vi": "Người nhận hàng / Nhà nhập khẩu (hoặc ngân hàng theo L/C \"To Order of Bank\")",
              "ja": "荷受人（輸入者・貨物を受け取る当事者、またはL/C指示受取人）",
              "en": "The receiver of the cargo / Importer (or party named in LC To Order)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "发货人 / 出口商 (Người gửi hàng)",
            "translations": {
              "vi": "Người gửi hàng / Nhà xuất khẩu (Shipper)",
              "ja": "荷送人・輸出者（Shipper）",
              "en": "The Shipper / Exporter"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "轮船厨师 (Đầu bếp trên tàu)",
            "translations": {
              "vi": "Đầu bếp nấu ăn trên tàu chở hàng",
              "ja": "貨物船の料理長",
              "en": "The vessel kitchen chef"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "港口门卫 (Bác bảo vệ cổng cảng)",
            "translations": {
              "vi": "Bác bảo vệ gác cổng ra vào cảng",
              "ja": "港のゲート警備員",
              "en": "The port security guard"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Consignee (收货人) là người nhận hàng. Ngược lại, Shipper / Consignor (发货人) là người gửi hàng.",
        "ja": "正解です！Consigneeは荷受人（輸入者）、Shipperは荷送人（輸出者）です。",
        "en": "Correct! Consignee is the party receiving delivery of goods, whereas Shipper is the exporting dispatcher."
      },
      "relatedVocabId": "v_doc_001"
    },
    {
      "id": "quiz_022_marine_insurance_icc_a",
      "category": "trade",
      "question": {
        "vi": "Trong 3 điều kiện bảo hiểm hàng hải quốc tế ICC (A), ICC (B), ICC (C), điều kiện nào có phạm vi bồi thường rộng nhất (Mọi rủi ro / All Risks)?",
        "ja": "国際貨物海上保険約款（ICC A, B, C）の中で、最も補償範囲が広く「全危険担保（All Risks）」に該当するのはどれでしょうか？",
        "en": "Among the three standard Institute Cargo Clauses (ICC A, B, and C), which provides the widest \"All Risks\" coverage?"
      },
      "contextSentence": {
        "zh": "本批精密仪器货值较高，我们强烈建议投保协会货物条款ICC(A)一切险。",
        "pinyin": "Běn pī jīngmì yíqì huòzhí jiàogāo, wǒmen qiángliè jiànyì tóubǎo xiéhuì huòwù tiáokuǎn ICC(A) yīqièxiǎn."
      },
      "options": [
        {
          "text": {
            "zh": "ICC (A) (一切险 / All Risks)",
            "translations": {
              "vi": "ICC (A) - Điều kiện bảo hiểm Mọi rủi ro (All Risks)",
              "ja": "ICC (A)（全危険担保 / All Risks - 最広範囲）",
              "en": "ICC (A) - All Risks Coverage (Widest scope)"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "ICC (C) (平安险 / 范围最窄)",
            "translations": {
              "vi": "ICC (C) - Phạm vi bồi thường hẹp nhất",
              "ja": "ICC (C)（最小担保条件）",
              "en": "ICC (C) - Minimum coverage"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "ICC (B) (水渍险 / 中等范围)",
            "translations": {
              "vi": "ICC (B) - Phạm vi trung bình",
              "ja": "ICC (B)（中位担保）",
              "en": "ICC (B) - Intermediate coverage"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "三者没有任何差别",
            "translations": {
              "vi": "Cả 3 loại hoàn toàn giống nhau",
              "ja": "3つの約款に何の差もない",
              "en": "All three clauses provide identical indemnity"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! ICC (A) bảo hiểm cho mọi rủi ro mất mát hư hỏng (trừ các trường hợp loại trừ cố ý hoặc hao mòn tự nhiên). ICC (C) là phạm vi hẹp nhất.",
        "ja": "正解です！ICC(A)は免責事項以外のすべての偶発的損害を補償するAll Risks（全危険担保）であり、高付加価値品輸送に不可欠です。",
        "en": "Correct! ICC (A) covers all risks of loss or damage to cargo subject only to explicit standard exclusions."
      },
      "relatedVocabId": "v_trade_003"
    },
    {
      "id": "quiz_023_credit_note_deduction",
      "category": "aftersales",
      "question": {
        "vi": "Khi phát hiện hàng bị lỗi hoặc thiếu số lượng, bên mua và bên bán thường thỏa thuận phát hành \"Credit Note\" (贷记凭单 / 货款折抵) nhằm mục đích gì?",
        "ja": "貨物の不良や数量不足が確認された際、買い手と売り手が合意する「Credit Note（貸記証書 / 次回代金相殺）」の目的は何でしょうか？",
        "en": "When defects or short-shipments occur, why do buyers and sellers agree to issue a \"Credit Note\" (贷记凭单 / 货款折抵)?"
      },
      "contextSentence": {
        "zh": "经协商，卖方开具一张3,000美元的Credit Note，直接在下一笔订单的尾款中抵扣。",
        "pinyin": "Jīng xiéshāng, màifāng kāijù yī zhāng sānqiān Měiyuán de Credit Note, zhíjiē zài xià yī bǐ dìngdān de wěikuǎn zhōng dǐkòu."
      },
      "options": [
        {
          "text": {
            "zh": "将赔偿金额在下一次订单货款中直接抵扣，避免繁琐的跨境退款手续",
            "translations": {
              "vi": "Cấn trừ thẳng số tiền bồi thường vào đợt thanh toán của đơn hàng sau, tránh thủ tục chuyển khoản hoàn tiền quốc tế phức tạp và tốn phí",
              "ja": "賠償額を次回発注代金から直接相殺控除し、国際送金の手数料や税務上の返金手間を回避する",
              "en": "Deduct the compensated claim amount directly from the next order payment, avoiding cross-border wire refund hassles"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "去银行借高利贷",
            "translations": {
              "vi": "Dùng để đi vay tiền nặng lãi ở tiệm cầm đồ",
              "ja": "高利貸しから借金するための証書",
              "en": "Applying for a predatory high-interest loan"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "取消双方未来的所有生意",
            "translations": {
              "vi": "Dùng để cắt đứt mọi quan hệ hợp tác làm ăn trong tương lai",
              "ja": "将来の全取引を永久破棄するための絶縁状",
              "en": "Severing all future trade relations forever"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "向对方索要公司所有股权",
            "translations": {
              "vi": "Dùng để đòi thâu tóm toàn bộ cổ phần công ty của đối tác",
              "ja": "相手企業の全株式を没収する命令書",
              "en": "Demanding complete equity takeover of the company"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Trong thực tế ngoại thương, việc phát hành Credit Note để trừ tiền vào đơn sau (货款折抵) là cách giải quyết hòa nhã, vừa giữ được mối quan hệ hợp tác lâu dài, vừa tiết kiệm phí chuyển tiền quốc tế.",
        "ja": "正解です！実務では国際送金手数料や為替差損、銀行手続の煩雑さを避けるため、次回リピート代金からのCredit Note相殺が最も好まれる解決策です。",
        "en": "Correct! A Credit Note credited against upcoming reorders is the smoothest win-win remedy in international trade operations."
      },
      "relatedVocabId": "v_after_002"
    },
    {
      "id": "quiz_024_banquet_toast_etiquette",
      "category": "communication",
      "question": {
        "vi": "Trong văn hóa tiệc tối thương mại Trung Quốc, khi cụng ly (碰杯) với khách hàng cấp cao hoặc sếp đối tác, hành động nào thể hiện sự tôn trọng và biết điều nhất?",
        "ja": "中国のビジネス宴席マナーにおいて、取引先の重役や目上の相手と乾杯（碰杯）する際、最も敬意を示す作法はどれでしょうか？",
        "en": "In Chinese business banquet culture, what is the customary respectful gesture when clinking glasses (碰杯) with a client executive or senior partner?"
      },
      "contextSentence": {
        "zh": "敬酒碰杯时，自己的杯沿应略低于对方，以示谦逊与尊重。",
        "pinyin": "Jìngjiǔ pèngbēi shí, zìjǐ de bēiyán yīng lüè dīyú duìfāng, yǐ shì qiānxùn yǔ zūnzhòng."
      },
      "options": [
        {
          "text": {
            "zh": "自己的酒杯杯沿略低于对方杯沿，双手托杯 (Miệng ly mình đặt thấp hơn miệng ly đối phương, hai tay nâng ly)",
            "translations": {
              "vi": "Miệng ly của mình chủ động hạ thấp hơn miệng ly của đối phương một chút, hai tay đỡ ly thể hiện sự khiêm nhường và tôn trọng",
              "ja": "相手より自分のグラスの縁をわずかに低く当て、両手を添えて敬意を示す",
              "en": "Position your glass rim slightly lower than theirs and hold the glass with both hands"
            }
          },
          "isCorrect": true
        },
        {
          "text": {
            "zh": "把酒杯举得比对方头顶还高 (Nâng ly cao hơn đỉnh đầu đối phương)",
            "translations": {
              "vi": "Nâng ly cao vống lên tận trên đỉnh đầu người ta",
              "ja": "相手の頭上より高くグラスを突き上げる",
              "en": "Holding glass way above the other persons head"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "把酒泼到对方衣服上 (Hất rượu vào áo đối phương)",
            "translations": {
              "vi": "Hất rượu vào áo của đối phương lấy may",
              "ja": "相手のスーツに酒を浴びせかける",
              "en": "Splashing wine on their jacket for good luck"
            }
          },
          "isCorrect": false
        },
        {
          "text": {
            "zh": "自己一个人默默喝完不说话 (Tự mình uống 1 mình không chào ai)",
            "translations": {
              "vi": "Tự ngồi uống một mình lủi thủi không thèm cụng ly với ai",
              "ja": "誰とも目を合わせず無言で一人酒をあおる",
              "en": "Sitting silently drinking alone without looking at anyone"
            }
          },
          "isCorrect": false
        }
      ],
      "explanation": {
        "vi": "Chính xác! Nét văn hóa bàn tiệc Trung Hoa rất coi trọng thứ bậc: khi chúc rượu (敬酒), tay phải cầm thân ly, tay trái đỡ đáy ly, miệng ly mình thấp hơn đối phương một chút để tỏ lòng tôn kính.",
        "ja": "正解です！中国の酒席文化では、目上の相手に対してグラスを低く構え、両手を添える所作が「謙虚と敬意」の証となります。",
        "en": "Correct! Lowering your glass rim and supporting the cup base with your second hand is the golden rule of Chinese banquet courtesy."
      },
      "relatedVocabId": "v_comm_003"
    }
  ]
};
}));
