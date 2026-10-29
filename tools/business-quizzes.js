/**
 * tools/business-quizzes.js
 * 24 Contextual Situational Quizzes covering all core facets of Business Chinese & Foreign Trade.
 */

module.exports = [
  {
    id: 'quiz_001_incoterms_cif_vs_fob',
    category: 'trade',
    question: {
      vi: 'Trong hợp đồng theo điều kiện CIF (Cost, Insurance and Freight), bên nào có nghĩa vụ trả cước tàu biển và mua bảo hiểm hàng hóa quốc tế?',
      ja: 'CIF（運賃・保険料込み条件）において、海上運賃の支払いおよび海上保険の付保義務を負うのはどちらでしょうか？',
      en: 'Under Incoterms CIF (Cost, Insurance and Freight), who is responsible for paying ocean freight and procuring transit cargo insurance?'
    },
    contextSentence: {
      zh: '本合同采用CIF海防港条款，由卖方负责租船订舱并购买货物运输保险。',
      pinyin: 'Běn hétong cǎiyòng CIF Hǎifáng gǎng tiáokuǎn, yóu màifāng fùzé zūchuán dìngcāng bìng gòumǎi huòwù yùnshū bǎoxiǎn.'
    },
    options: [
      {
        text: {
          zh: '卖方 (Bên bán / Seller)',
          translations: {
            vi: 'Bên bán (Seller / 卖方)',
            ja: '売り手（輸出者 / 卖方）',
            en: 'The Seller (卖方)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '买方 (Bên mua / Buyer)',
          translations: {
            vi: 'Bên mua (Buyer / 买方)',
            ja: '買い手（輸入者 / 买方）',
            en: 'The Buyer (买方)'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '船运公司 (Hãng tàu / Shipping Line)',
          translations: {
            vi: 'Hãng tàu biển (Shipping Line / 船运公司)',
            ja: '船会社（Shipping Line）',
            en: 'The Shipping Line'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '保险公司 (Công ty bảo hiểm / Insurer)',
          translations: {
            vi: 'Công ty bảo hiểm (Insurer / 保险公司)',
            ja: '保険会社',
            en: 'The Insurance Company'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! CIF là viết tắt của Cost, Insurance and Freight (Tiền hàng, Bảo hiểm và Cước phí). Người bán chịu trách nhiệm thuê tàu, trả cước biển và mua bảo hiểm hàng hóa đến cảng đích quy định.',
      ja: '正解です！CIF条件では、売り手（輸出者）が目的港までの運賃（Freight）および貨物海上保険（Insurance）を手配・負担します。ただしリスクの移転時期は船積港で本船に積み込まれた時点です。',
      en: 'Correct! Under CIF, the seller arranges and pays for ocean carriage to destination port and procures maritime cargo insurance.'
    },
    relatedVocabId: 'v_trade_003'
  },
  {
    id: 'quiz_002_awb_negotiability',
    category: 'documents',
    question: {
      vi: 'Khác biệt căn bản lớn nhất về mặt pháp lý giữa Vận đơn đường biển (B/L) và Vận đơn hàng không (AWB) là gì?',
      ja: '海上運送状（B/L）と航空運送状（AWB）の法的な最大の違いは何でしょうか？',
      en: 'What is the most fundamental legal distinction between an Ocean Bill of Lading (B/L) and an Air Waybill (AWB)?'
    },
    contextSentence: {
      zh: '空运单不是物权凭证，收货人凭身份证明即可提货。',
      pinyin: 'Kōngyùndān bù shì wùquán píngzhèng, shōuhuòrén píng shēnfèn zhèngmíng jíkě tíhuò.'
    },
    options: [
      {
        text: {
          zh: '空运单不是物权凭证 (AWB không phải chứng từ sở hữu hàng hóa)',
          translations: {
            vi: 'AWB không phải là chứng từ sở hữu hàng hóa (物权凭证), không thể chuyển nhượng ký hậu',
            ja: '航空運送状（AWB）は有価証券（物権証券）ではなく、裏書譲渡ができない',
            en: 'AWB is not a document of title and is non-negotiable'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '海运提单不能在银行押汇 (B/L không dùng được trong thanh toán ngân hàng)',
          translations: {
            vi: 'B/L không thể dùng để thanh toán tín dụng thư L/C tại ngân hàng',
            ja: 'B/Lは銀行の信用状決済で使用できない',
            en: 'Ocean B/L cannot be used for documentary credit at banks'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '空运单必须由船长签字 (AWB phải do thuyền trưởng ký)',
          translations: {
            vi: 'AWB bắt buộc phải có chữ ký xác nhận của thuyền trưởng',
            ja: 'AWBは必ず船長の直筆サインが必要である',
            en: 'AWB must be signed by the ship master'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '海运提单没有编号 (B/L không có mã số)',
          translations: {
            vi: 'B/L không bao giờ có mã số theo dõi',
            ja: 'B/Lには一意の追跡番号が存在しない',
            en: 'B/L never has a unique serial tracking number'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Vận đơn đường biển (B/L) là "物权凭证" (chứng từ sở hữu hàng hóa - document of title), có thể ký hậu chuyển nhượng; trong khi AWB chỉ là biên lai nhận hàng và hợp đồng chở hàng, người nhận chỉ cần chứng minh danh tính để lấy hàng.',
      ja: '正解です！B/Lは貨物の所有権を表す「有価証券（物権証券）」であり裏書による譲渡が可能ですが、AWBは単なる運送受取証であり有価証券ではありません。',
      en: 'Correct! An Ocean B/L is a document of title allowing ownership transfer via endorsement, while an AWB is strictly a non-negotiable receipt.'
    },
    relatedVocabId: 'v_doc_003'
  },
  {
    id: 'quiz_003_payment_lc_safest',
    category: 'finance',
    question: {
      vi: 'Phương thức thanh toán quốc tế nào sau đây có sự tham gia bảo lãnh cam kết trả tiền của ngân hàng độc lập với người mua?',
      ja: '買い手の信用とは独立して、開設銀行自身が支払いを確約・保証する国際決済手段はどれでしょうか？',
      en: 'Which international payment method provides an independent irrevocable bank payment undertaking to the seller?'
    },
    contextSentence: {
      zh: '为了规避大额贸易的违约风险，我们要求开立不可撤销即期信用证（L/C at sight）。',
      pinyin: 'Wèile guībì dà\'é màoyì de wéiyuē fēngxiǎn, wǒmen yāoqiú kāilì bùkě chèxiāo jíqī xìnyòngzhèng (L/C at sight).'
    },
    options: [
      {
        text: {
          zh: '信用证 (L/C - Letter of Credit)',
          translations: {
            vi: 'Tín dụng thư (L/C - 信用证)',
            ja: '信用状（L/C - Letter of Credit）',
            en: 'Letter of Credit (L/C)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '电汇 (T/T - Telegraphic Transfer)',
          translations: {
            vi: 'Điện chuyển tiền (T/T - 电汇)',
            ja: '電信送金（T/T - Telegraphic Transfer）',
            en: 'Telegraphic Transfer (T/T)'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '付款交单 (D/P - Documents Against Payment)',
          translations: {
            vi: 'Nhờ thu trả tiền giao chứng từ (D/P - 付款交单)',
            ja: '支払渡し（D/P）',
            en: 'Documents Against Payment (D/P)'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '承兑交单 (D/A - Documents Against Acceptance)',
          translations: {
            vi: 'Nhờ thu chấp nhận thanh toán giao chứng từ (D/A - 承兑交单)',
            ja: '引受渡し（D/A）',
            en: 'Documents Against Acceptance (D/A)'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! L/C (信用证) là cam kết trả tiền có điều kiện của Ngân hàng phát hành, chỉ cần người bán xuất trình bộ chứng từ hoàn toàn phù hợp quy định (Strict Compliance) thì ngân hàng bắt buộc phải thanh toán vô điều kiện.',
      ja: '正解です！信用状（L/C）は銀行の信用に基づく支払い確約であり、書類が条件を満たす限り銀行が直接代金を支払うため、商業信用リスクを回避できます。',
      en: 'Correct! A Letter of Credit (L/C) substitutes commercial credit with bank credit, guaranteeing payment against complying presentation.'
    },
    relatedVocabId: 'v_fin_002'
  },
  {
    id: 'quiz_004_co_form_e_purpose',
    category: 'customs',
    question: {
      vi: 'Giấy chứng nhận xuất xứ Form E (原产地证书 Form E) được dùng chủ yếu để hưởng ưu đãi gì khi xuất nhập khẩu giữa ASEAN và Trung Quốc?',
      ja: '中国・ASEAN自由貿易協定（ACFTA）に基づく「Form E」の主な利用目的は何でしょうか？',
      en: 'What is the primary commercial benefit of presenting a Form E Certificate of Origin under ACFTA?'
    },
    contextSentence: {
      zh: '提供原产地证Form E可以帮助买方在越南海关享受零关税特惠。',
      pinyin: 'Tígōng yuánchǎndì zhèng Form E kěyǐ bāngzhù mǎifāng zài Yuènán hǎiguān xiǎngshòu líng guānshuì tèhuì.'
    },
    options: [
      {
        text: {
          zh: '关税减免与零关税 (Miễn giảm thuế nhập khẩu ưu đãi đặc biệt)',
          translations: {
            vi: 'Được giảm thuế hoặc miễn thuế nhập khẩu (0%) theo hiệp định ACFTA',
            ja: '特恵関税の適用（関税の減免または無税化）',
            en: 'Preferential tariff reduction or 0% duty exemption under ACFTA'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '免除海关查验 (Miễn hoàn toàn kiểm tra thực tế hàng hóa)',
          translations: {
            vi: 'Được miễn hoàn toàn kiểm hóa và không cần nộp tờ khai hải quan',
            ja: '税関による一切の現物検査が免除される',
            en: 'Total exemption from physical customs inspections'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '代替提单提货 (Dùng thay thế vận đơn để nhận hàng)',
          translations: {
            vi: 'Dùng thay thế cho vận đơn đường biển để ra cảng nhận hàng',
            ja: 'B/Lの代わりに貨物を引き取るための引換証となる',
            en: 'Serves as a substitute for B/L to collect cargo'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '免费海运费 (Miễn phí cước tàu biển)',
          translations: {
            vi: 'Được hãng tàu miễn phí hoàn toàn tiền cước vận chuyển',
            ja: '船会社から海上運賃が無料免除される',
            en: 'Grants free ocean freight from shipping lines'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! C/O Form E là chứng từ tối quan trọng trong thương mại Việt - Trung giúp nhà nhập khẩu được áp mức thuế suất ưu đãi đặc biệt (rất nhiều mặt hàng về mức 0%).',
      ja: '正解です！Form EはACFTA特恵関税（多くの品目で0%関税）を享受するための必須書類です。',
      en: 'Correct! Form E certifies goods origin within the ACFTA trading bloc, unlocking special preferential tariff rates or complete duty exemption.'
    },
    relatedVocabId: 'v_doc_004'
  },
  {
    id: 'quiz_005_demurrage_meaning',
    category: 'logistics',
    question: {
      vi: 'Thuật ngữ "滞港费" (Demurrage) trong vận tải container đường biển có ý nghĩa là gì?',
      ja: '海上コンテナ輸送における「滞港費（デマレージ - Demurrage）」とは何の費用でしょうか？',
      en: 'In containerized maritime shipping, what does the fee "Demurrage" (滞港费) represent?'
    },
    contextSentence: {
      zh: '必须尽快清关提柜，以免产生高额的滞港费（Demurrage）。',
      pinyin: 'Bìxū jǐnkuài qīngguān tíguì, yǐmiǎn chǎnshēng gāo\'é de zhìgǎngfèi (Demurrage).'
    },
    options: [
      {
        text: {
          zh: '超期占用码头堆场的费用 (Phí lưu bãi/vỏ container quá hạn miễn phí tại cảng)',
          translations: {
            vi: 'Phí phạt do giữ container tại bãi cảng vượt quá thời gian miễn phí cho phép (Free Time)',
            ja: 'フリータイム（無料保管期間）を超過して港湾ヤードに滞留した際の超過保管料',
            en: 'Penalty fee for holding containers inside the port terminal beyond agreed free time'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '轮船加油的附加费 (Phụ phí xăng dầu của tàu)',
          translations: {
            vi: 'Phụ phí nhiên liệu xăng dầu cho tàu biển',
            ja: '船舶の燃料割増料金（バンカーサーチャージ）',
            en: 'Bunker fuel surcharge paid to the vessel'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '船员工资补贴 (Trợ cấp lương cho thuyền viên)',
          translations: {
            vi: 'Tiền thưởng lương cho thuyền viên lái tàu',
            ja: '乗組員への手当費用',
            en: 'Crew overtime allowances'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '换单服务费 (Phí dịch vụ đổi lệnh D/O)',
          translations: {
            vi: 'Phí dịch vụ lấy lệnh giao hàng Delivery Order',
            ja: 'D/O（荷渡指図書）発行手数料',
            en: 'Delivery Order documentation fee'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Demurrage (滞港费) là phí phạt của hãng tàu tính cho chủ hàng khi container còn nằm trong bãi cảng vượt quá số ngày miễn phí (Free Time) quy định.',
      ja: '正解です！Demurrage（デマレージ）はコンテナヤード（CY）内のフリータイムを超過した場合に船会社から請求される延滞料です。',
      en: 'Correct! Demurrage is charged when loaded containers dwell inside the marine terminal past the stipulated free days.'
    },
    relatedVocabId: 'v_log_006'
  },
  {
    id: 'quiz_006_proforma_vs_commercial',
    category: 'documents',
    question: {
      vi: 'Khác biệt căn bản giữa 形式发票 (Proforma Invoice) và 商业发票 (Commercial Invoice) là gì?',
      ja: '形式発票（プロフォーマインボイス）と商業発票（コマーシャルインボイス）の根本的な違いは何ですか？',
      en: 'What is the fundamental difference between a Proforma Invoice (PI) and a Commercial Invoice (CI)?'
    },
    contextSentence: {
      zh: '形式发票仅供买方申请开立信用证及汇付定金，出货后将以商业发票正式入账。',
      pinyin: 'Xíngshì fāpiào jǐn gōng mǎifāng shēnqǐng kāilì xìnyòngzhèng jí huìfù dìngjīn, chūhuò hòu jiāng yǐ shāngyè fāpiào zhèngshì rùzhàng.'
    },
    options: [
      {
        text: {
          zh: '形式发票是预估报价，商业发票是具有法律效力的正式记账和清关凭证',
          translations: {
            vi: 'PI là bản hóa đơn ước tính dùng đặt cọc/mở L/C, còn CI là hóa đơn chính thức để thanh toán và khai báo hải quan',
            ja: 'PIは見積・前受金用の仮書類であり、CIは法的に確定した本請求書兼通関申告原本である',
            en: 'PI is an estimated draft for deposits/LC, whereas CI is the definitive accounting & customs invoice'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '形式发票金额一定比商业发票大十倍',
          translations: {
            vi: 'Số tiền trên PI luôn luôn gấp 10 lần CI',
            ja: 'PIの金額は常にCIの10倍でなければならない',
            en: 'PI amounts must always be tenfold higher than CI'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '商业发票不需要写商品名称',
          translations: {
            vi: 'Commercial Invoice không được phép ghi tên hàng',
            ja: '商業インボイスには品名を記載してはならない',
            en: 'Commercial Invoice prohibits naming the goods'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '只有海运才用商业发票',
          translations: {
            vi: 'Chỉ có vận chuyển đường biển mới được dùng Commercial Invoice',
            ja: '商業インボイスは海上輸送のみで使用される',
            en: 'Commercial Invoice is strictly used for ocean freight only'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! P/I (形式发票) chỉ là hóa đơn chiếu lệ dự thảo, không có giá trị quyết toán thuế; trong khi Commercial Invoice (商业发票) là chứng từ gốc chính thức dùng để khai báo hải quan và hạch toán kế toán.',
      ja: '正解です！P/Iは取引合意確認や前受金送金用の仮請求書であり、正式な税務・通関申告には船積後の確定Commercial Invoiceが必須となります。',
      en: 'Correct! A Proforma Invoice is an advance estimate for financing and deposits, while a Commercial Invoice is the final legally enforceable bill.'
    },
    relatedVocabId: 'v_doc_001'
  },
  {
    id: 'quiz_007_email_attachment_phrase',
    category: 'emails',
    question: {
      vi: 'Trong thư thương mại tiếng Trung, mẫu câu nào sau đây dùng để thông báo cho đối tác xem "tài liệu đính kèm" một cách trang trọng và chuyên nghiệp nhất?',
      ja: '中国語のビジネスメールで、添付ファイルを確認してもらう最も丁寧で標準的な表現はどれでしょうか？',
      en: 'In Chinese business correspondence, which phrase is the most formal and courteous way to ask the recipient to review an attachment?'
    },
    contextSentence: {
      zh: '相关报价单及产品规格书详见附件，请查阅。',
      pinyin: 'Xiāngguān bàojiàdān jí chǎnpǐn guīgéshū xiángjiàn fùjiàn, qǐng cháyùe.'
    },
    options: [
      {
        text: {
          zh: '详见附件，请查阅 (Chi tiết xem trong tệp đính kèm, xin vui lòng kiểm tra)',
          translations: {
            vi: '详见附件，请查阅 / 随信附上... 请查收 (Chi tiết xem đính kèm, xin mời kiểm tra)',
            ja: '詳見添付（詳細は添付ファイルをご参照ください）/ 随信附上...',
            en: 'Please refer to the attachment / Attached please find...'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '你看邮件下面 (Bạn nhìn xuống dưới email)',
          translations: {
            vi: '你看邮件下面 (Bạn nhìn phía dưới email kìa)',
            ja: 'メールの下を見てください',
            en: 'Look at the bottom of the email'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '别忘了看我的文件 (Đừng quên xem tài liệu của tôi nhé)',
          translations: {
            vi: '别忘了看我的文件 (Đừng quên xem tài liệu của tao đấy)',
            ja: '私のファイルを見るのを忘れないで',
            en: 'Don’t forget to check my file'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '给你看这个 (Cho bạn xem cái này)',
          translations: {
            vi: '给你看这个 (Cho mày xem cái này)',
            ja: 'これを見てあげる',
            en: 'Here you look at this'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! "详见附件，请查收 / 请查阅" là mẫu câu trang trọng kinh điển trong thư tín thương mại tiếng Trung.',
      ja: '正解です！「详见附件，请查阅 / 随信附上...」は中国語ビジネスメールにおける定型句であり、添付ファイルの案内として最も礼儀正しい表現です。',
      en: 'Correct! "详见附件，请查阅 / 请查收" is the definitive professional formula for drawing attention to attached documents.'
    },
    relatedVocabId: 'v_email_003'
  },
  {
    id: 'quiz_008_moq_abbreviation',
    category: 'sales_purchasing',
    question: {
      vi: 'Thuật ngữ "起订量" (MOQ) trong giao dịch mua bán nhà xưởng có nghĩa là gì?',
      ja: '製造業・輸出入取引における「起訂量（MOQ）」とは何を指すでしょうか？',
      en: 'What does "起订量" (MOQ - Minimum Order Quantity) signify in manufacturing and trade negotiations?'
    },
    contextSentence: {
      zh: '这款智能手表的起订量是500台，低于该数量无法安排定制丝印。',
      pinyin: 'Zhè kuǎn zhìnéng shǒubiǎo de qǐdìngliàng shì wǔbǎi tái, dīyú gāi shùliàng wúfǎ ānpái dìngzhì sīyìn.'
    },
    options: [
      {
        text: {
          zh: '最低起订数量 (Minimum Order Quantity)',
          translations: {
            vi: 'Số lượng đặt hàng tối thiểu xưởng mới nhận sản xuất',
            ja: '工場が受注・生産を開始する最小発注ロット数量（MOQ）',
            en: 'Minimum Order Quantity required for the manufacturer to accept an order'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '每个集装箱最大的装载量 (Khối lượng tối đa 1 container)',
          translations: {
            vi: 'Số lượng tối đa chứa được trong 1 container',
            ja: 'コンテナ1本あたりの最大積載可能数',
            en: 'Maximum container payload capacity'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '工厂一天的总产量 (Sản lượng 1 ngày của xưởng)',
          translations: {
            vi: 'Tổng sản lượng xuất xưởng trong một ngày của nhà máy',
            ja: '工場の1日あたりの総生産能力',
            en: 'Daily production output of the factory'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '样品免费寄送的数量 (Số lượng mẫu được gửi miễn phí)',
          translations: {
            vi: 'Số lượng hàng mẫu miễn phí tối đa gửi cho khách',
            ja: '無料サンプルの最大送付可能数',
            en: 'Maximum quota for free evaluation samples'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! 起订量 (qǐdìngliàng) chính là MOQ (Minimum Order Quantity), số lượng tối thiểu để dây chuyền nhà máy khởi động sản xuất hoặc có được đơn giá tốt.',
      ja: '正解です！起订量（MOQ）は、金型段取りや資材調達の観点から工場が設定する最低受注数量です。',
      en: 'Correct! 起订量 represents the Minimum Order Quantity required to cover tooling and setup overhead.'
    },
    relatedVocabId: 'v_sales_002'
  },
  {
    id: 'quiz_009_hs_code_digits',
    category: 'customs',
    question: {
      vi: 'Mã số HS Code (商品编码) gồm bao nhiêu chữ số đầu tiên được tiêu chuẩn hóa thống nhất trên toàn thế giới theo Công ước WCO?',
      ja: '世界税関機構（WCO）のHS条約において、世界共通で統一されているHSコードの桁数は何桁でしょうか？',
      en: 'Under the World Customs Organization (WCO) convention, how many leading digits of an HS Code are harmonized internationally?'
    },
    contextSentence: {
      zh: '前6位HS Code是国际通用的，后几位各国有细微分类差异。',
      pinyin: 'Qián liù wèi HS Code shì guójì tōngyòng de, hòu jǐ wèi gèguó yǒu xìwēi fēnlèi chāyì.'
    },
    options: [
      {
        text: {
          zh: '前6位 (6 chữ số đầu tiên)',
          translations: {
            vi: '6 chữ số đầu tiên (Chương, Nhóm, Phân nhóm)',
            ja: '上6桁（類・項・号）が世界共通',
            en: 'First 6 digits (Chapter, Heading, Subheading)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '前2位 (2 chữ số đầu)',
          translations: {
            vi: 'Chỉ 2 chữ số đầu',
            ja: '上2桁のみ',
            en: 'First 2 digits only'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '12位全统 (Cả 12 chữ số giống hệt nhau)',
          translations: {
            vi: 'Cả 12 chữ số đều hoàn toàn giống nhau',
            ja: '12桁すべて完全一致',
            en: 'All 12 digits are universally identical'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '前4位 (4 chữ số)',
          translations: {
            vi: '4 chữ số đầu',
            ja: '上4桁',
            en: 'First 4 digits'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! 6 chữ số đầu của mã HS (Harmonized System) là thống nhất toàn cầu. Từ chữ số thứ 7 hoặc thứ 8 trở đi, mỗi quốc gia (như Việt Nam có biểu 8 chữ số, Trung Quốc 10 chữ số) sẽ quy định chi tiết thêm.',
      ja: '正解です！HSコードの上6桁はWCO加盟国共通で規定されており、それ以降の細分化（7〜10桁等）は各国が独自に定めます。',
      en: 'Correct! The first 6 digits of HS codes are universally standard worldwide under WCO; downstream digits vary by national tariff schedules.'
    },
    relatedVocabId: 'v_customs_002'
  },
  {
    id: 'quiz_010_packing_list_gw_nw',
    category: 'documents',
    question: {
      vi: 'Trên Phiếu đóng gói (Packing List), ký hiệu "GW" (毛重) và "NW" (净重) đại diện cho điều gì?',
      ja: 'パッキングリスト（Packing List）に記載される「GW（毛重）」と「NW（净重）」の違いは何ですか？',
      en: 'On a shipping Packing List, what do "GW" (毛重) and "NW" (净重) represent?'
    },
    contextSentence: {
      zh: '本批货物毛重（GW）为1,250公斤，净重（NW）为1,100公斤。',
      pinyin: 'Běn pī huòwù máozhòng (GW) wéi yītóng èrbǎi wǔshí gōngjīn, jìngzhòng (NW) wéi yītóng yībǎi gōngjīn.'
    },
    options: [
      {
        text: {
          zh: '毛重含包装重量，净重为去除包装后的纯货物重量',
          translations: {
            vi: 'GW là tổng trọng lượng bao gồm cả bao bì kiện, NW là trọng lượng tịnh chỉ riêng hàng hóa',
            ja: 'GW（総重量）は梱包材込みの重さ、NW（正味重量）は中身の製品だけの重さ',
            en: 'GW is gross weight including packaging; NW is pure net product weight'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: 'GW是集装箱重量，NW是卡车重量',
          translations: {
            vi: 'GW là khối lượng container, NW là trọng lượng xe tải chở hàng',
            ja: 'GWはコンテナ自体の自重、NWはトラックの自重',
            en: 'GW is container tare weight; NW is truck weight'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: 'GW是第一批货，NW是第二批货',
          translations: {
            vi: 'GW là lô hàng 1, NW là lô hàng thứ 2',
            ja: 'GWは第1ロット、NWは第2ロットを意味する',
            en: 'GW is batch 1; NW is batch 2'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: 'GW和NW完全没有区别',
          translations: {
            vi: 'GW và NW hoàn toàn giống nhau không phân biệt',
            ja: '両者に違いは全くない',
            en: 'GW and NW are completely interchangeable synonyms'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! 毛重 (máozhòng - Gross Weight) là tổng trọng lượng cả bao bì thùng hộp; 净重 (jìngzhòng - Net Weight) là trọng lượng tịnh không tính bao bì.',
      ja: '正解です！Gross Weight（毛重）は外装カートンやパレットを含めた全重量で、Net Weight（净重）は製品本体のみの正味重量です。',
      en: 'Correct! Gross Weight (毛重) includes cartons/pallets, whereas Net Weight (净重) excludes all outer packing materials.'
    },
    relatedVocabId: 'v_doc_002'
  },
  {
    id: 'quiz_011_force_majeure_clause',
    category: 'trade',
    question: {
      vi: 'Điều khoản "不可抗力" (Force Majeure) trong hợp đồng thương mại quốc tế áp dụng trong trường hợp nào sau đây?',
      ja: '国際売買契約における「不可抗力条項（Force Majeure）」はどのような事態に適用されますか？',
      en: 'When does the "Force Majeure" (不可抗力) clause in international contracts become applicable?'
    },
    contextSentence: {
      zh: '如发生地震、台风等不可抗力事件，受影响方可免除违约责任。',
      pinyin: 'Rú fāshēng dìzhèn, táifēng děng bùkěkànglì shìjiàn, shòu yǐngxiǎng fāng kě miǎnchú wéiyuē zérèn.'
    },
    options: [
      {
        text: {
          zh: '地震、海啸、战争等无法预见且无法控制的客观事件',
          translations: {
            vi: 'Sự kiện bất khả kháng khách quan không thể lường trước và không thể kiểm soát (động đất, sóng thần, chiến tranh...)',
            ja: '地震、台風、戦争、暴動など、当事者の合理的支配を超える予見不可能な事由',
            en: 'Unforeseeable and uncontrollable external events (earthquakes, tsunamis, armed conflicts)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '工厂工人睡过头迟到',
          translations: {
            vi: 'Công nhân nhà máy ngủ quên đi muộn',
            ja: '工場の従業員が寝坊して遅刻した時',
            en: 'Factory workers sleeping in and coming late'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '不想履行合同想去度假',
          translations: {
            vi: 'Giám đốc muốn đi nghỉ mát nên lười làm hàng',
            ja: '社長が休暇旅行に行きたくなった時',
            en: 'Deciding to take a vacation instead of working'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '觉得利润太低反悔不想卖',
          translations: {
            vi: 'Thấy lãi ít nên nuốt lời không muốn bán nữa',
            ja: '利益が少ないため売り惜しみしたくなった時',
            en: 'Changing mind because profit margins look too slim'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! 不可抗力 (Bất khả kháng) là các sự kiện thiên tai, chiến tranh hoặc biến cố bất khả kháng khiến các bên được miễn trừ trách nhiệm bồi thường vi phạm hợp đồng.',
      ja: '正解です！不可抗力とは天災地変や戦争等、当事者が善良な管理者としての注意を払っても回避できない客観的障害を指し、免責事由となります。',
      en: 'Correct! Force Majeure excuses non-performance caused by unforeseeable events outside reasonable human control.'
    },
    relatedVocabId: 'v_trade_008'
  },
  {
    id: 'quiz_012_customs_channels',
    category: 'customs',
    question: {
      vi: 'Tại hải quan Việt Nam và Trung Quốc, tờ khai hải quan được phân vào "绿通" (Luồng Xanh / Green Channel) có nghĩa là gì?',
      ja: '税関の審査区分において「グリーンチャネル（緑通・Luồng Xanh）」に判定された場合、どのような扱いになりますか？',
      en: 'What does clearance through the "Green Channel" (绿通) indicate in customs import processing?'
    },
    contextSentence: {
      zh: '幸运的是，这批货系统直接走了绿通，省去了开箱查验的时间。',
      pinyin: 'Xìngyùn de shì, zhè pī huò xìtǒng zhíjiē zǒu le lǜ tōng, shěngqù le kāixiāng cháyàn de shíjiān.'
    },
    options: [
      {
        text: {
          zh: '免除审单和查验，自动放行 (Miễn kiểm tra hồ sơ và miễn kiểm hóa, thông quan tự động)',
          translations: {
            vi: 'Miễn kiểm tra chứng từ giấy và miễn kiểm hóa thực tế, được hệ thống cho phép thông quan tự động',
            ja: '書類審査および現物開梱検査が免除され、電子的に即時通関許可される',
            en: 'Exempt from paper review and physical inspection; automatic release granted'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '必须100%开箱掏柜 (Phải dỡ toàn bộ hàng ra đếm từng cái)',
          translations: {
            vi: 'Bắt buộc phải hạ container xuống dỡ 100% thùng ra đếm',
            ja: '全量コンテナから荷卸しして全品目視検査を行う',
            en: 'Mandatory 100% full container de-vanning and piece-by-piece inspection'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '货物将被直接没收 (Hàng hóa bị tịch thu tiêu hủy)',
          translations: {
            vi: 'Hàng hóa bị tịch thu ngay lập tức',
            ja: '貨物が直ちに没収処分となる',
            en: 'Cargo is seized immediately'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '只能进口绿色环保产品 (Chỉ được phép chở rau quả xanh)',
          translations: {
            vi: 'Chỉ áp dụng riêng cho hàng nông sản và rau củ xanh',
            ja: '緑色の製品しか輸入できない',
            en: 'Restricted solely to green organic vegetables'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Luồng Xanh (绿通) là luồng ưu tiên cao nhất, người khai hải quan được miễn kiểm tra hồ sơ giấy và miễn kiểm hóa thực tế hàng hóa, tiết kiệm rất nhiều chi phí và thời gian.',
      ja: '正解です！グリーンチャネルは低リスク貨物に対する優遇措置で、書類審査も現物検査も免除されて即座に許可が出ます。',
      en: 'Correct! The Green Channel is the fastest customs routing, waiving both document review and physical container unpacking.'
    },
    relatedVocabId: 'v_customs_004'
  },
  {
    id: 'quiz_013_telex_release_bl',
    category: 'documents',
    question: {
      vi: 'Thuật ngữ "电放提单" (Telex Release B/L / Surrender B/L) trong vận tải biển có nghĩa là gì?',
      ja: '海上輸送における「電放提単（テレックス・リリース / サレンダーB/L）」とはどのような手続きでしょうか？',
      en: 'What does "Telex Release B/L" (电放提单) signify in maritime container shipping?'
    },
    contextSentence: {
      zh: '收到尾款后，我们将安排船公司进行电放（Telex Release），收货人无需正本提单即可提货。',
      pinyin: 'Shōudào wěikuǎn hòu, wǒmen jiāng ānpái chuángōngsī jìnxíng diànfàng (Telex Release), shōuhuòrén wúxū zhèngběn tídān jíkě tíhuò.'
    },
    options: [
      {
        text: {
          zh: '卖方交还正本提单，发货人授权目的港无需正本直接放货 (Giao hàng bằng điện tín không cần vận đơn gốc)',
          translations: {
            vi: 'Nhà xuất khẩu nộp lại vận đơn gốc cho hãng tàu tại cảng đi và ủy quyền điện giải phóng hàng tại cảng đến mà người mua không cần xuất trình vận đơn gốc giấy',
            ja: '荷送人が船籍地で原本を回収（サレンダー）させ、仕向地で原本なしで貨物引渡しを許可する電信手続き',
            en: 'Shipper surrenders original B/L at origin, allowing destination release electronically without paper original'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '用闪电发电把提单烧掉',
          translations: {
            vi: 'Dùng dòng điện đốt cháy tờ vận đơn',
            ja: '電気で書類を破棄すること',
            en: 'Burning the physical bill with electricity'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '只能装载电子产品',
          translations: {
            vi: 'Chỉ áp dụng khi chở các mặt hàng điện tử linh kiện',
            ja: '電化製品にのみ適用される運送状',
            en: 'Restricted solely to consumer electronics'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '船长直接送货到买方家里',
          translations: {
            vi: 'Thuyền trưởng trực tiếp mang hàng về tận nhà người mua',
            ja: '船長が買い手の自宅まで直接届けること',
            en: 'Captain personally hand-delivers goods to buyer door'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! 电放 (diànfàng - Telex Release) giúp tiết kiệm thời gian gửi thư chuyển phát nhanh chứng từ giấy gốc (rất phù hợp với các tuyến vận chuyển ngắn như Trung Quốc - Việt Nam chỉ mất 2-3 ngày tàu chạy).',
      ja: '正解です！航海日数が2〜3日と短い日中航路や中越航路では、原本郵送による揚げ地での停滞を防ぐため電放（サレンダー）が極めて多用されます。',
      en: 'Correct! Telex Release accelerates release for short-transit routes (e.g., China to Vietnam 2-3 days) where cargo arrives before courier papers.'
    },
    relatedVocabId: 'v_doc_003'
  },
  {
    id: 'quiz_014_fcl_vs_lcl',
    category: 'logistics',
    question: {
      vi: 'Khác biệt căn bản giữa "整柜" (FCL - Full Container Load) và "拼箱" (LCL - Less than Container Load) là gì?',
      ja: '国際コンテナ輸送における「整櫃（FCL）」と「拼箱（LCL）」の違いは何ですか？',
      en: 'What is the distinction between "整柜" (FCL - Full Container Load) and "拼箱" (LCL - Less than Container Load)?'
    },
    contextSentence: {
      zh: '本次货物体积只有3个立方（CBM），走拼箱（LCL）比整柜更划算。',
      pinyin: 'Běn cì huòwù tǐjī zhǐyǒu sān gè lìfāng (CBM), zǒu pīnxiāng (LCL) bǐ zhěngguì gèng huásuàn.'
    },
    options: [
      {
        text: {
          zh: '整柜为独享整只集装箱，拼箱为多家货主共享同一只集装箱',
          translations: {
            vi: 'FCL là 1 chủ hàng sử dụng trọn vẹn cả container, LCL là ghép chung hàng của nhiều chủ hàng trong cùng 1 container',
            ja: 'FCLは一荷主がコンテナ1本を満載専有し、LCLは複数荷主の小口貨物を1本のコンテナに混載する',
            en: 'FCL is dedicated full container use by one shipper; LCL consolidates multiple shippers cargo into one container'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '整柜只能装箱子，拼箱只能装液体',
          translations: {
            vi: 'FCL chỉ chở đồ hộp, LCL chỉ chở chất lỏng',
            ja: 'FCLは箱物専用、LCLは液体専用である',
            en: 'FCL is for boxes only; LCL is for liquids only'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '拼箱不需要报关',
          translations: {
            vi: 'LCL không cần phải mở tờ khai hải quan',
            ja: 'LCL貨物は税関申告が免除される',
            en: 'LCL cargo requires zero customs clearance'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '整柜是免费运输的',
          translations: {
            vi: 'FCL là vận chuyển hoàn toàn miễn phí',
            ja: 'FCLは運賃が全額無料である',
            en: 'FCL shipping is 100% free of charge'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! 整柜 (FCL) là đóng hàng nguyên công cho một chủ hàng duy nhất, còn 拼箱 (LCL) là gom ghép các lô hàng nhỏ lẻ của nhiều khách hàng vào chung một công tại kho CFS.',
      ja: '正解です！小口貨物の場合はCFS（コンテナ・フレート・ステーション）で混載（LCL）を行い、物量がまとまればFCLで手配するのが定石です。',
      en: 'Correct! FCL occupies an entire container exclusively, while LCL consolidates smaller shipments into a shared container at a CFS.'
    },
    relatedVocabId: 'v_log_002'
  },
  {
    id: 'quiz_015_payment_tt_deposit_balance',
    category: 'finance',
    question: {
      vi: 'Trong điều khoản thanh toán "30% T/T Advance, 70% against B/L copy", người mua sẽ chuyển khoản nốt 70% số tiền còn lại khi nào?',
      ja: '「30% T/T前受金、残金70%はB/Lコピー確認後」の決済条件において、買い手はいつ残金の70%を送金すべきでしょうか？',
      en: 'Under payment terms "30% T/T Advance, 70% against B/L copy", when is the 70% balance due from the buyer?'
    },
    contextSentence: {
      zh: '卖方提供提单扫描件后，买方应在3个工作日内电汇结清70%尾款。',
      pinyin: 'Màifāng tígōng tídān sǎomiáojiàn hòu, mǎifāng yīng zài sān gè gōngzuòrì nèi diànhuì jiéqīng bǎifēnzhī qīshí wěikuǎn.'
    },
    options: [
      {
        text: {
          zh: '卖方完成装船发货并提供海运提单扫描件后',
          translations: {
            vi: 'Sau khi bên bán đã bốc hàng lên tàu và gửi bản scan vận đơn đường biển B/L',
            ja: '売り手が船積みを完了し、発行された海上運送状（B/L）のコピーを提示した時点',
            en: 'After the seller finishes loading onto vessel and presents a scanned copy of ocean B/L'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '签约后立刻付清',
          translations: {
            vi: 'Thanh toán ngay lập tức khi vừa ký hợp đồng',
            ja: '契約締結直後に全額即時送金',
            en: 'Immediately upon signing the contract'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '货物在商场全部卖完后一年',
          translations: {
            vi: 'Một năm sau khi đã bán sạch hàng ngoài siêu thị',
            ja: '商品がすべて店頭で売り切れた1年後',
            en: 'One year after goods sell out completely in retail stores'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '不需付款，完全赠送',
          translations: {
            vi: 'Không cần trả vì là hàng biếu tặng',
            ja: '贈答品のため支払いは永久に不要',
            en: 'No payment needed as it is a complimentary gift'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Đây là điều kiện T/T phổ biến nhất: 30% cọc để bên bán mua vật tư sản xuất; 70% thanh toán sau khi hàng đã lên tàu và người mua kiểm tra bản scan B/L hợp lệ.',
      ja: '正解です！最も一般的な国際送金条件です。売り手は前受金（30%）で部材調達し、船積証明となるB/Lコピーを提示して残金（70%）を回収します。',
      en: 'Correct! Standard balanced T/T structure: 30% funds raw materials, 70% settles once evidence of vessel departure (B/L copy) is proven.'
    },
    relatedVocabId: 'v_fin_001'
  },
  {
    id: 'quiz_016_aql_inspection',
    category: 'aftersales',
    question: {
      vi: 'Tiêu chuẩn kiểm phẩm "AQL" (Acceptable Quality Limit / 接收质量限) được dùng phổ biến trong nhà xưởng có ý nghĩa gì?',
      ja: '製造業の品質検査で頻出する「AQL（合格品質水準 / 接收质量限）」とは何を意味しますか？',
      en: 'What does "AQL" (Acceptable Quality Limit / 接收质量限) establish during third-party factory quality inspections?'
    },
    contextSentence: {
      zh: '本批大货质检依照AQL 2.5/4.0抽检标准执行。',
      pinyin: 'Běn pī dàhuò zhìjiǎn yīzhào AQL èr diǎn wǔ fēnzhī sì diǎn líng chōujiǎn biāozhǔn zhíxíng.'
    },
    options: [
      {
        text: {
          zh: '抽样检验中允许的最大不良品比率界限',
          translations: {
            vi: 'Giới hạn tỷ lệ hàng khuyết tật tối đa cho phép để lô hàng được chấp nhận nghiệm thu',
            ja: '抜取検査において許容される不良品数・欠陥率の許容限界水準',
            en: 'The maximum permissible percentage of defective items in a statistical sample for batch acceptance'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '机器电量的百分比',
          translations: {
            vi: 'Tỷ lệ % dung lượng pin máy móc',
            ja: '工場の機械バッテリー残量',
            en: 'Percentage of factory machine battery remaining'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '集装箱装满的百分比',
          translations: {
            vi: 'Tỷ lệ phần trăm xếp đầy container',
            ja: 'コンテナ積載率のパーセンテージ',
            en: 'Percentage of container filling level'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '外箱印刷颜色的数量',
          translations: {
            vi: 'Số lượng màu sắc in trên thùng carton',
            ja: '段ボール外装の印刷色数',
            en: 'Number of colors printed on outer cartons'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! AQL là chuẩn mực quốc tế (ISO 2859-1) quy định số lượng lỗi tối đa (lỗi nghiêm trọng Critical, lỗi nặng Major, lỗi nhẹ Minor) được phép xuất hiện trong số mẫu rút ngẫu nhiên.',
      ja: '正解です！AQL（Acceptance Quality Limit）は国際規格に基づく統計的抜取検査基準で、バイヤーとサプライヤー間の合否判断基準となります。',
      en: 'Correct! AQL (ISO 2859-1) defines statistical thresholds for Critical, Major, and Minor defects tolerated in batch sampling.'
    },
    relatedVocabId: 'v_after_001'
  },
  {
    id: 'quiz_017_customs_red_channel',
    category: 'customs',
    question: {
      vi: 'Khi tờ khai hải quan rơi vào "红通" (Luồng Đỏ / Red Channel), thủ tục bắt buộc phải làm tiếp theo là gì?',
      ja: '通関判定で「レッドチャネル（红通）」が割り振られた場合、必須となる手続きは何でしょうか？',
      en: 'When a customs declaration falls into the "Red Channel" (红通), what mandatory procedure must be performed?'
    },
    contextSentence: {
      zh: '海关系统将该票货物列入红通，需开箱进行现场实物查验。',
      pinyin: 'Hǎiguān xìtǒng jiāng gāi piào huòwù lièrù hóngtōng, xū kāixiāng jìnxíng xiànchǎng shíwù cháyàn.'
    },
    options: [
      {
        text: {
          zh: '开箱进行实物现场查验和核对品名 (Hạ cont mở thùng kiểm tra thực tế hàng hóa)',
          translations: {
            vi: 'Kiểm tra hồ sơ giấy đồng thời hạ container, mở thùng kiểm hóa thực tế tại bãi kiểm tra của hải quan',
            ja: '書類審査に加え、コンテナを開梱して現物貨物と申告内容の対比目視検査を行う',
            en: 'Undergo paper review plus mandatory physical unboxing and inspection at the port examination platform'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '立刻把货全部退回中国 (Ngay lập tức trả toàn bộ hàng về Trung Quốc)',
          translations: {
            vi: 'Ngay lập tức tái xuất trả hết hàng về Trung Quốc không cần làm gì',
            ja: '直ちに貨物を中国へ積戻し返送する',
            en: 'Immediately return all cargo back to China without inspection'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '什么都不用做，直接拉回家 (Không cần làm gì, kéo thẳng về nhà)',
          translations: {
            vi: 'Không cần làm gì cả, cứ thế kéo container về công ty',
            ja: '何もしなくても自動で会社に持ち帰ることができる',
            en: 'Take no action and drive the container directly home'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '只检查司机的驾驶证 (Chỉ kiểm tra bằng lái của tài xế)',
          translations: {
            vi: 'Chỉ kiểm tra giấy phép lái xe của bác tài xe container',
            ja: 'トラック運転手の運転免許証のみを確認する',
            en: 'Only inspect the truck driver driver license'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Luồng Đỏ (红通) yêu cầu cơ quan hải quan kiểm tra chi tiết cả hồ sơ lẫn thực tế hàng hóa (mở thùng kiểm tra nhãn mác, số lượng, chủng loại, xuất xứ).',
      ja: '正解です！レッドチャネル（Luồng Đỏ）は最も厳格な審査区分で、コンテナを開梱して現品と申告内容が合致しているか立ち会い検査を受けます。',
      en: 'Correct! The Red Channel triggers rigorous scrutiny: both comprehensive documentation review and physical cargo unboxing.'
    },
    relatedVocabId: 'v_customs_004'
  },
  {
    id: 'quiz_018_cbm_calculation',
    category: 'logistics',
    question: {
      vi: 'Một kiện hàng có kích thước 100cm x 80cm x 50cm. Thể tích tính theo CBM (Cubic Meter - 立方米) của kiện hàng này là bao nhiêu?',
      ja: '外寸が100cm × 80cm × 50cmの貨物1個の容積（CBM・立方米）はいくつでしょうか？',
      en: 'A cargo carton measures 100cm x 80cm x 50cm. What is its volume in CBM (Cubic Meters)?'
    },
    contextSentence: {
      zh: '计算总体积（CBM）以便预订合适的集装箱或计算拼箱运费。',
      pinyin: 'Jìsuàn zǒngtǐjī (CBM) yǐbiàn yùdìng héshì de jízhuāngxiāng huò jìsuàn pīnxiāng yùnfèi.'
    },
    options: [
      {
        text: {
          zh: '0.40 CBM (1.0m x 0.8m x 0.5m = 0.4 m³)',
          translations: {
            vi: '0.40 CBM (1.0m x 0.8m x 0.5m = 0.40 mét khối)',
            ja: '0.40 CBM（1.0m × 0.8m × 0.5m = 0.40 m³）',
            en: '0.40 CBM (1.0m x 0.8m x 0.5m = 0.40 m³)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '4.0 CBM',
          translations: {
            vi: '4.0 CBM',
            ja: '4.0 CBM',
            en: '4.0 CBM'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '400 CBM',
          translations: {
            vi: '400 CBM',
            ja: '400 CBM',
            en: '400 CBM'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '0.04 CBM',
          translations: {
            vi: '0.04 CBM',
            ja: '0.04 CBM',
            en: '0.04 CBM'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Công thức tính CBM: Dài (m) x Rộng (m) x Cao (m). Ở đây: 1.0m x 0.8m x 0.5m = 0.40 CBM.',
      ja: '正解です！CBMの計算式は「長さ(m) × 幅(m) × 高さ(m)」です。1.0 × 0.8 × 0.5 = 0.40 m³（CBM）となります。',
      en: 'Correct! CBM = Length(m) x Width(m) x Height(m) = 1.0m x 0.8m x 0.5m = 0.40 CBM.'
    },
    relatedVocabId: 'v_log_003'
  },
  {
    id: 'quiz_019_ddp_term',
    category: 'trade',
    question: {
      vi: 'Theo điều kiện DDP (Delivered Duty Paid - 完税后交货), trách nhiệm nộp thuế nhập khẩu và giao hàng đến tận kho người mua thuộc về ai?',
      ja: 'インコタームズのDDP条件（関税込み持込渡し / 完税后交货）において、輸入関税を納付し買い手の指定倉庫まで届ける責任を負うのは誰でしょうか？',
      en: 'Under Incoterms DDP (Delivered Duty Paid - 完税后交货), who bears full responsibility for import duties and door delivery?'
    },
    contextSentence: {
      zh: 'DDP条款下，卖方承担所有运输风险并负责缴纳进口国关税。',
      pinyin: 'DDP tiáokuǎn xià, màifāng chéngdān suǒyǒu yùnshū fēngxiǎn bìng fùzé jiǎonà jìnkǒuguó guānshuì.'
    },
    options: [
      {
        text: {
          zh: '卖方承担最大责任 (Bên bán chịu toàn bộ trách nhiệm và nộp thuế)',
          translations: {
            vi: 'Bên bán (Seller) chịu trách nhiệm tối đa: làm thủ tục xuất nhập khẩu, trả thuế và giao tận kho người mua',
            ja: '売り手（輸出者）が最大の義務を負い、輸入通関手続および関税納付を含め買い手の倉庫まで届ける',
            en: 'The Seller bears maximum obligation, paying all transport costs and destination customs duties'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '买方承担一切费用 (Bên mua chịu hết)',
          translations: {
            vi: 'Bên mua phải chịu mọi chi phí và thuế',
            ja: '買い手がすべての費用と税金を負担する',
            en: 'The Buyer bears all expenses and duties'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '由海关总署免费配送 (Hải quan miễn phí giao tận nhà)',
          translations: {
            vi: 'Cơ quan hải quan sẽ điều xe giao hàng miễn phí tận nhà',
            ja: '税関当局が無料で自宅まで配達する',
            en: 'Customs headquarters provides free door-to-door delivery'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '货运司机自己掏腰包交税 (Tài xế tự bỏ tiền túi trả thuế)',
          translations: {
            vi: 'Bác tài xế tự bỏ tiền túi của mình ra đóng thuế',
            ja: '配送ドライバーが自腹で関税を立て替える',
            en: 'The truck driver pays customs duties out of personal pocket'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! DDP là điều kiện Incoterms mang lại nghĩa vụ tối đa cho bên bán (Seller), ngược lại hoàn toàn với EXW (Ex Works mang lại nghĩa vụ tối thiểu cho bên bán).',
      ja: '正解です！DDPは売主最大義務条件であり、仕向地での輸入通関・関税・国内配送まで売主が全責任を負います（買主最小義務条件EXWと対比されます）。',
      en: 'Correct! DDP represents the maximum obligation for the seller, requiring seller to clear destination customs, pay duties, and deliver directly to the buyer door.'
    },
    relatedVocabId: 'v_trade_004'
  },
  {
    id: 'quiz_020_email_salutation_honorific',
    category: 'emails',
    question: {
      vi: 'Trong thư thương mại tiếng Trung, khi gửi cho đối tác hoặc cấp trên lần đầu tiên, từ xưng hô tôn kính lịch sự nhất là gì?',
      ja: '中国語のビジネスメールにおいて、取引先や目上の相手に対する最も敬意のある二人称はどれでしょうか？',
      en: 'In professional Chinese business correspondence, what is the most respectful honorific second-person pronoun to address a customer or senior executive?'
    },
    contextSentence: {
      zh: '尊敬的张总：您好！非常荣幸能与贵司取得联系。',
      pinyin: 'Zūnjìng de Zhāng zǒng: Nín hǎo! Fēicháng róngxìng néng yǔ guìsī qǔdé liánxì.'
    },
    options: [
      {
        text: {
          zh: '您 (Nín) & 贵司 (Guìsī)',
          translations: {
            vi: '您 (Ngài / Quý anh chị) & 贵司 (Quý công ty)',
            ja: '您（敬称の「貴方」）および 贵司（「貴社・御社」）',
            en: '您 (Respectful You) & 贵司 (Your Esteemed Company)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '你 (Nǐ) & 你们公司',
          translations: {
            vi: '你 (Mày / Bạn thân mật) & 你们公司 (Bọn mày)',
            ja: '你（親しい友人向け）および 你们公司',
            en: '你 (Informal you) & 你们公司'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '喂 (Wèi)',
          translations: {
            vi: '喂 (Alo)',
            ja: '喂（もしもし）',
            en: '喂 (Hey)'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '那个谁 (Cái ai đó)',
          translations: {
            vi: '那个谁 (Cái người đó ơi)',
            ja: '那个谁（そこの誰か）',
            en: '那个谁 (Hey someone)'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Trong thư thương mại, luôn luôn dùng "您" thay vì "你", dùng "贵司" (quý công ty) và "我司" (công ty chúng tôi) để giữ gìn phong thái khiêm nhường, chuyên nghiệp.',
      ja: '正解です！ビジネス文書では「你」ではなく敬称の「您」を用い、相手企業を「贵司」、自社を「我司」と呼ぶのが鉄則のマナーです。',
      en: 'Correct! Professional Chinese uses "您" (formal you), "贵司" (Your esteemed company), and "我司" (Our humble company).'
    },
    relatedVocabId: 'v_email_001'
  },
  {
    id: 'quiz_021_commercial_invoice_box',
    category: 'documents',
    question: {
      vi: 'Trên Vận đơn B/L và Hóa đơn thương mại, mục "Consignee" (收货人) chỉ đối tượng nào?',
      ja: '船荷証券（B/L）やインボイスにおける「Consignee（收货人）」とは誰を指しますか？',
      en: 'On a commercial invoice and shipping B/L, what entity is identified under the "Consignee" (收货人) box?'
    },
    contextSentence: {
      zh: '收货人（Consignee）必须与海关进口申报的主体保持一致。',
      pinyin: 'Shōuhuòrén (Consignee) bìxū yǔ hǎiguān jìnkǒu shēnbào de zhǔtǐ bǎochí yīzhì.'
    },
    options: [
      {
        text: {
          zh: '货物接收人 / 进口商 (Người nhận hàng / Nhà nhập khẩu)',
          translations: {
            vi: 'Người nhận hàng / Nhà nhập khẩu (hoặc ngân hàng theo L/C "To Order of Bank")',
            ja: '荷受人（輸入者・貨物を受け取る当事者、またはL/C指示受取人）',
            en: 'The receiver of the cargo / Importer (or party named in LC To Order)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '发货人 / 出口商 (Người gửi hàng)',
          translations: {
            vi: 'Người gửi hàng / Nhà xuất khẩu (Shipper)',
            ja: '荷送人・輸出者（Shipper）',
            en: 'The Shipper / Exporter'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '轮船厨师 (Đầu bếp trên tàu)',
          translations: {
            vi: 'Đầu bếp nấu ăn trên tàu chở hàng',
            ja: '貨物船の料理長',
            en: 'The vessel kitchen chef'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '港口门卫 (Bác bảo vệ cổng cảng)',
          translations: {
            vi: 'Bác bảo vệ gác cổng ra vào cảng',
            ja: '港のゲート警備員',
            en: 'The port security guard'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Consignee (收货人) là người nhận hàng. Ngược lại, Shipper / Consignor (发货人) là người gửi hàng.',
      ja: '正解です！Consigneeは荷受人（輸入者）、Shipperは荷送人（輸出者）です。',
      en: 'Correct! Consignee is the party receiving delivery of goods, whereas Shipper is the exporting dispatcher.'
    },
    relatedVocabId: 'v_doc_001'
  },
  {
    id: 'quiz_022_marine_insurance_icc_a',
    category: 'trade',
    question: {
      vi: 'Trong 3 điều kiện bảo hiểm hàng hải quốc tế ICC (A), ICC (B), ICC (C), điều kiện nào có phạm vi bồi thường rộng nhất (Mọi rủi ro / All Risks)?',
      ja: '国際貨物海上保険約款（ICC A, B, C）の中で、最も補償範囲が広く「全危険担保（All Risks）」に該当するのはどれでしょうか？',
      en: 'Among the three standard Institute Cargo Clauses (ICC A, B, and C), which provides the widest "All Risks" coverage?'
    },
    contextSentence: {
      zh: '本批精密仪器货值较高，我们强烈建议投保协会货物条款ICC(A)一切险。',
      pinyin: 'Běn pī jīngmì yíqì huòzhí jiàogāo, wǒmen qiángliè jiànyì tóubǎo xiéhuì huòwù tiáokuǎn ICC(A) yīqièxiǎn.'
    },
    options: [
      {
        text: {
          zh: 'ICC (A) (一切险 / All Risks)',
          translations: {
            vi: 'ICC (A) - Điều kiện bảo hiểm Mọi rủi ro (All Risks)',
            ja: 'ICC (A)（全危険担保 / All Risks - 最広範囲）',
            en: 'ICC (A) - All Risks Coverage (Widest scope)'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: 'ICC (C) (平安险 / 范围最窄)',
          translations: {
            vi: 'ICC (C) - Phạm vi bồi thường hẹp nhất',
            ja: 'ICC (C)（最小担保条件）',
            en: 'ICC (C) - Minimum coverage'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: 'ICC (B) (水渍险 / 中等范围)',
          translations: {
            vi: 'ICC (B) - Phạm vi trung bình',
            ja: 'ICC (B)（中位担保）',
            en: 'ICC (B) - Intermediate coverage'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '三者没有任何差别',
          translations: {
            vi: 'Cả 3 loại hoàn toàn giống nhau',
            ja: '3つの約款に何の差もない',
            en: 'All three clauses provide identical indemnity'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! ICC (A) bảo hiểm cho mọi rủi ro mất mát hư hỏng (trừ các trường hợp loại trừ cố ý hoặc hao mòn tự nhiên). ICC (C) là phạm vi hẹp nhất.',
      ja: '正解です！ICC(A)は免責事項以外のすべての偶発的損害を補償するAll Risks（全危険担保）であり、高付加価値品輸送に不可欠です。',
      en: 'Correct! ICC (A) covers all risks of loss or damage to cargo subject only to explicit standard exclusions.'
    },
    relatedVocabId: 'v_trade_003'
  },
  {
    id: 'quiz_023_credit_note_deduction',
    category: 'aftersales',
    question: {
      vi: 'Khi phát hiện hàng bị lỗi hoặc thiếu số lượng, bên mua và bên bán thường thỏa thuận phát hành "Credit Note" (贷记凭单 / 货款折抵) nhằm mục đích gì?',
      ja: '貨物の不良や数量不足が確認された際、買い手と売り手が合意する「Credit Note（貸記証書 / 次回代金相殺）」の目的は何でしょうか？',
      en: 'When defects or short-shipments occur, why do buyers and sellers agree to issue a "Credit Note" (贷记凭单 / 货款折抵)?'
    },
    contextSentence: {
      zh: '经协商，卖方开具一张3,000美元的Credit Note，直接在下一笔订单的尾款中抵扣。',
      pinyin: 'Jīng xiéshāng, màifāng kāijù yī zhāng sānqiān Měiyuán de Credit Note, zhíjiē zài xià yī bǐ dìngdān de wěikuǎn zhōng dǐkòu.'
    },
    options: [
      {
        text: {
          zh: '将赔偿金额在下一次订单货款中直接抵扣，避免繁琐的跨境退款手续',
          translations: {
            vi: 'Cấn trừ thẳng số tiền bồi thường vào đợt thanh toán của đơn hàng sau, tránh thủ tục chuyển khoản hoàn tiền quốc tế phức tạp và tốn phí',
            ja: '賠償額を次回発注代金から直接相殺控除し、国際送金の手数料や税務上の返金手間を回避する',
            en: 'Deduct the compensated claim amount directly from the next order payment, avoiding cross-border wire refund hassles'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '去银行借高利贷',
          translations: {
            vi: 'Dùng để đi vay tiền nặng lãi ở tiệm cầm đồ',
            ja: '高利貸しから借金するための証書',
            en: 'Applying for a predatory high-interest loan'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '取消双方未来的所有生意',
          translations: {
            vi: 'Dùng để cắt đứt mọi quan hệ hợp tác làm ăn trong tương lai',
            ja: '将来の全取引を永久破棄するための絶縁状',
            en: 'Severing all future trade relations forever'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '向对方索要公司所有股权',
          translations: {
            vi: 'Dùng để đòi thâu tóm toàn bộ cổ phần công ty của đối tác',
            ja: '相手企業の全株式を没収する命令書',
            en: 'Demanding complete equity takeover of the company'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Trong thực tế ngoại thương, việc phát hành Credit Note để trừ tiền vào đơn sau (货款折抵) là cách giải quyết hòa nhã, vừa giữ được mối quan hệ hợp tác lâu dài, vừa tiết kiệm phí chuyển tiền quốc tế.',
      ja: '正解です！実務では国際送金手数料や為替差損、銀行手続の煩雑さを避けるため、次回リピート代金からのCredit Note相殺が最も好まれる解決策です。',
      en: 'Correct! A Credit Note credited against upcoming reorders is the smoothest win-win remedy in international trade operations.'
    },
    relatedVocabId: 'v_after_002'
  },
  {
    id: 'quiz_024_banquet_toast_etiquette',
    category: 'communication',
    question: {
      vi: 'Trong văn hóa tiệc tối thương mại Trung Quốc, khi cụng ly (碰杯) với khách hàng cấp cao hoặc sếp đối tác, hành động nào thể hiện sự tôn trọng và biết điều nhất?',
      ja: '中国のビジネス宴席マナーにおいて、取引先の重役や目上の相手と乾杯（碰杯）する際、最も敬意を示す作法はどれでしょうか？',
      en: 'In Chinese business banquet culture, what is the customary respectful gesture when clinking glasses (碰杯) with a client executive or senior partner?'
    },
    contextSentence: {
      zh: '敬酒碰杯时，自己的杯沿应略低于对方，以示谦逊与尊重。',
      pinyin: 'Jìngjiǔ pèngbēi shí, zìjǐ de bēiyán yīng lüè dīyú duìfāng, yǐ shì qiānxùn yǔ zūnzhòng.'
    },
    options: [
      {
        text: {
          zh: '自己的酒杯杯沿略低于对方杯沿，双手托杯 (Miệng ly mình đặt thấp hơn miệng ly đối phương, hai tay nâng ly)',
          translations: {
            vi: 'Miệng ly của mình chủ động hạ thấp hơn miệng ly của đối phương một chút, hai tay đỡ ly thể hiện sự khiêm nhường và tôn trọng',
            ja: '相手より自分のグラスの縁をわずかに低く当て、両手を添えて敬意を示す',
            en: 'Position your glass rim slightly lower than theirs and hold the glass with both hands'
          }
        },
        isCorrect: true
      },
      {
        text: {
          zh: '把酒杯举得比对方头顶还高 (Nâng ly cao hơn đỉnh đầu đối phương)',
          translations: {
            vi: 'Nâng ly cao vống lên tận trên đỉnh đầu người ta',
            ja: '相手の頭上より高くグラスを突き上げる',
            en: 'Holding glass way above the other persons head'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '把酒泼到对方衣服上 (Hất rượu vào áo đối phương)',
          translations: {
            vi: 'Hất rượu vào áo của đối phương lấy may',
            ja: '相手のスーツに酒を浴びせかける',
            en: 'Splashing wine on their jacket for good luck'
          }
        },
        isCorrect: false
      },
      {
        text: {
          zh: '自己一个人默默喝完不说话 (Tự mình uống 1 mình không chào ai)',
          translations: {
            vi: 'Tự ngồi uống một mình lủi thủi không thèm cụng ly với ai',
            ja: '誰とも目を合わせず無言で一人酒をあおる',
            en: 'Sitting silently drinking alone without looking at anyone'
          }
        },
        isCorrect: false
      }
    ],
    explanation: {
      vi: 'Chính xác! Nét văn hóa bàn tiệc Trung Hoa rất coi trọng thứ bậc: khi chúc rượu (敬酒), tay phải cầm thân ly, tay trái đỡ đáy ly, miệng ly mình thấp hơn đối phương một chút để tỏ lòng tôn kính.',
      ja: '正解です！中国の酒席文化では、目上の相手に対してグラスを低く構え、両手を添える所作が「謙虚と敬意」の証となります。',
      en: 'Correct! Lowering your glass rim and supporting the cup base with your second hand is the golden rule of Chinese banquet courtesy.'
    },
    relatedVocabId: 'v_comm_003'
  }
];

