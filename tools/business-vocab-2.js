/**
 * tools/business-vocab-2.js
 * Vocabulary for Categories:
 * 5. emails (商务邮件)
 * 6. trade (国际贸易)
 * 7. documents (贸易单证)
 * 8. customs (报关与清关)
 */

module.exports = [
  // --- 5. EMAILS (商务邮件) ---
  {
    id: 'bc_email_001',
    term: '附件',
    pinyin: 'fùjiàn',
    partOfSpeech: 'noun',
    category: 'emails',
    level: 'beginner',
    tags: ['email', 'attachment', 'file'],
    translations: {
      vi: { meaning: 'Tệp đính kèm / file đính kèm', note: 'Từ xuất hiện trong hầu hết các email thương mại.' },
      ja: { meaning: '添付ファイル', note: 'メールに添える資料やファイル。' },
      en: { meaning: 'attachment / attached file', note: 'Files attached to an email.' }
    },
    examples: [
      {
        zh: '详细的产品目录和报价已放在附件中，请查收。',
        pinyin: 'Xiángxì de chǎnpǐn mùlù hé bàojià yǐ fàng zài fùjiàn zhōng, qǐng cháshōu.',
        translations: {
          vi: 'Danh mục sản phẩm chi tiết và bảng báo giá đã được để trong tệp đính kèm, xin vui lòng kiểm tra nhận.',
          ja: '詳細な製品カタログと見積書を添付ファイルにてお送りいたしましたので、ご査収ください。',
          en: 'The detailed product catalog and price quote are attached for your review.'
        }
      }
    ]
  },
  {
    id: 'bc_email_002',
    term: '查收',
    pinyin: 'cháshōu',
    partOfSpeech: 'verb',
    category: 'emails',
    level: 'beginner',
    tags: ['email', 'check', 'receive'],
    translations: {
      vi: { meaning: 'Kiểm tra và nhận (file, email, tiền, bưu phẩm)', note: 'Cụm từ tiêu chuẩn cuối câu: "请查收" (Xin vui lòng kiểm tra nhận).' },
      ja: { meaning: 'ご査収ください / ご確認ください', note: '添付や送付物を受け取って確認することを丁寧に促す語。' },
      en: { meaning: 'to check and accept / please find attached', note: 'Standard formula: 请查收 (Please find attached / please check).' }
    },
    examples: [
      {
        zh: '发票扫描件已发送，请查收并安排付款。',
        pinyin: 'Fāpiào sǎomiáojiàn yǐ fāsòng, qǐng cháshōu bìng ānpái fùkuǎn.',
        translations: {
          vi: 'Bản scan hóa đơn đã được gửi đi, xin vui lòng kiểm tra nhận và thu xếp thanh toán.',
          ja: 'インボイスのスキャンデータを送付いたしましたので、ご査収の上お支払いのお手配をお願い申し上げます。',
          en: 'The invoice scan has been sent; please check and arrange payment.'
        }
      }
    ]
  },
  {
    id: 'bc_email_003',
    term: '敬请回复',
    pinyin: 'jìng qǐng huífù',
    partOfSpeech: 'phrase',
    category: 'emails',
    level: 'intermediate',
    tags: ['email', 'formal', 'reply'],
    translations: {
      vi: { meaning: 'Kính mong nhận được hồi âm / phản hồi', note: 'Dùng ở cuối email trang trọng khi mong đợi đối tác trả lời.' },
      ja: { meaning: 'ご返信のほどよろしくお願い申し上げます', note: 'メールの結びで返信を丁重にお願いする定型表現。' },
      en: { meaning: 'We look forward to your prompt reply', note: 'Formal request for a reply in correspondence.' }
    },
    examples: [
      {
        zh: '若有任何改动意见，敬请尽早回复告知。',
        pinyin: 'Ruò yǒu rènhé gǎidòng yìjiàn, jìng qǐng jǐnzǎo huífù gàozhī.',
        translations: {
          vi: 'Nếu có bất kỳ ý kiến chỉnh sửa nào, kính mong quý khách sớm hồi âm thông báo.',
          ja: '修正等のご要望がございましたら、お早めにご返信くださいますようお願い申し上げます。',
          en: 'If you have any revisions, please kindly reply and let us know at your earliest convenience.'
        }
      }
    ]
  },

  // --- 6. TRADE (国际贸易) ---
  {
    id: 'bc_trade_001',
    term: '进出口',
    pinyin: 'jìn chū kǒu',
    partOfSpeech: 'noun',
    category: 'trade',
    level: 'beginner',
    tags: ['import-export', 'trade', 'core'],
    translations: {
      vi: { meaning: 'Xuất nhập khẩu (nhập khẩu và xuất khẩu)', note: '进口 = nhập khẩu; 出口 = xuất khẩu.' },
      ja: { meaning: '輸出入 / 輸出と輸入', note: '「进口」（輸入）と「出口」（輸出）の総称。' },
      en: { meaning: 'import and export / foreign trade', note: '进口 (import) and 出口 (export).' }
    },
    examples: [
      {
        zh: '越南与中国之间的进出口贸易额逐年增长。',
        pinyin: 'Yuènán yǔ Zhōngguó zhījiān de jìnchūkǒu màoyì é zhúnián zēngzhǎng.',
        translations: {
          vi: 'Kim ngạch xuất nhập khẩu giữa Việt Nam và Trung Quốc tăng trưởng qua từng năm.',
          ja: 'ベトナムと中国の間の輸出入貿易額は年々増加しています。',
          en: 'The import and export trade volume between Vietnam and China has been growing year by year.'
        }
      }
    ]
  },
  {
    id: 'bc_trade_002',
    term: '离岸价',
    pinyin: 'lí\'àn jià',
    partOfSpeech: 'noun',
    category: 'trade',
    level: 'intermediate',
    tags: ['incoterms', 'fob', 'trade-terms'],
    translations: {
      vi: { meaning: 'Giá FOB (Free on Board / Giao hàng lên tàu tại cảng bốc)', note: 'Người bán chịu mọi chi phí và rủi ro cho đến khi hàng qua lan can tàu tại cảng xuất khẩu.' },
      ja: { meaning: '本船甲板渡し条件（FOB価格）', note: '積出港で本船に貨物を積み込むまでの費用とリスクを売り手が負担する条件。' },
      en: { meaning: 'FOB price (Free on Board)', note: 'Seller pays for transport of goods to the port of shipment plus loading costs.' }
    },
    examples: [
      {
        zh: '这份报价是深圳离岸价，不包含海运费和目的港保险费。',
        pinyin: 'Zhè fèn bàojià shì Shēnzhèn lí\'àn jià, bù bāohán hǎiyùn fèi hé mùdìgǎng bǎoxiǎn fèi.',
        translations: {
          vi: 'Báo giá này là giá FOB Thâm Quyến, không bao gồm cước vận tải biển và bảo hiểm tại cảng đến.',
          ja: 'このお見積もりは深圳FOB価格であり、海上運賃および仕向港での保険料は含まれておりません。',
          en: 'This quote is FOB Shenzhen and does not include ocean freight or destination insurance.'
        }
      }
    ],
    businessTip: {
      vi: 'Khẩu ngữ ngoại thương Trung Quốc thường nói thẳng chữ viết tắt tiếng Anh "FOB", nhưng trên hợp đồng và chứng từ chính thức thường ghi "离岸价".',
      ja: '会話では英語の「FOB」が多用されますが、正式な契約書や税関文書では「离岸价」と記載されます。',
      en: 'In spoken communication "FOB" is widely used, while "离岸价" is standard in legal contracts.'
    }
  },
  {
    id: 'bc_trade_003',
    term: '到岸价',
    pinyin: 'dào\'àn jià',
    partOfSpeech: 'noun',
    category: 'trade',
    level: 'intermediate',
    tags: ['incoterms', 'cif', 'shipping'],
    translations: {
      vi: { meaning: 'Giá CIF (Cost, Insurance and Freight / Giá gồm tiền hàng, bảo hiểm và cước phí)', note: 'Người bán lo cước tàu và mua bảo hiểm chuyển hàng đến tận cảng đích của người mua.' },
      ja: { meaning: '運賃・保険料込み条件（CIF価格）', note: '仕向港までの海上運賃および保険料を売り手が負担する条件。' },
      en: { meaning: 'CIF price (Cost, Insurance, and Freight)', note: 'Seller arranges and pays for costs, ocean freight, and insurance to the destination port.' }
    },
    examples: [
      {
        zh: '请帮我们核算一下海防港的CIF到岸价。',
        pinyin: 'Qǐng bāng wǒmen hésuàn yíxià Hǎifáng gǎng de CIF dào\'àn jià.',
        translations: {
          vi: 'Xin hãy tính toán giúp chúng tôi giá CIF đến cảng Hải Phòng.',
          ja: 'ハイフォン港までのCIF価格を計算していただけますでしょうか。',
          en: 'Please calculate the CIF Haiphong price for us.'
        }
      }
    ]
  },
  {
    id: 'bc_trade_004',
    term: '交货期',
    pinyin: 'jiāohuò qī',
    partOfSpeech: 'noun',
    category: 'trade',
    level: 'beginner',
    tags: ['lead-time', 'delivery', 'deadline'],
    translations: {
      vi: { meaning: 'Thời hạn giao hàng / tiến độ giao hàng (Lead time)', note: 'Số ngày hoặc ngày cố định từ khi nhận cọc đến lúc xuất xưởng/giao hàng.' },
      ja: { meaning: '納期 / リードタイム', note: '発注から納品までの所要期間・期日。' },
      en: { meaning: 'delivery period / lead time', note: 'Agreed time frame for delivering goods.' }
    },
    examples: [
      {
        zh: '收到定金后的30天内为标准交货期。',
        pinyin: 'Shōudào dìngjīn hòu de sānshí tiān nèi wéi biāozhǔn jiāohuò qī.',
        translations: {
          vi: 'Thời hạn giao hàng tiêu chuẩn là trong vòng 30 ngày kể từ khi nhận tiền đặt cọc.',
          ja: '手付金受領後30日以内が標準納期となります。',
          en: 'The standard delivery period is within 30 days after receipt of the deposit.'
        }
      }
    ]
  },
  {
    id: 'bc_trade_005',
    term: '违约金',
    pinyin: 'wéiyuè jīn',
    partOfSpeech: 'noun',
    category: 'trade',
    level: 'intermediate',
    tags: ['penalty', 'contract', 'legal'],
    translations: {
      vi: { meaning: 'Tiền phạt vi phạm hợp đồng (Penalty / Liquidated damages)', note: 'Khoản tiền bồi thường quy định sẵn nếu một bên vi phạm điều khoản.' },
      ja: { meaning: '違約金 / ペナルティ', note: '契約違反時に支払う定められた損害賠償金。' },
      en: { meaning: 'penalty / liquidated damages for breach of contract', note: 'Agreed compensation if contract terms are violated.' }
    },
    examples: [
      {
        zh: '若供方无故延迟交货超过两周，每日需支付合同金额0.5%的违约金。',
        pinyin: 'Ruò gōngfāng wúgù yánchí jiāohuò chāoguò liǎng zhōu, měirì xū zhīfù hétong jīné bǎifēnzhī líng diǎn wǔ de wéiyuèjīn.',
        translations: {
          vi: 'Nếu bên cung cấp chậm giao hàng vô cớ quá hai tuần, mỗi ngày phải nộp phạt 0,5% giá trị hợp đồng.',
          ja: 'サプライヤーが正当な理由なく2週間以上納期を遅延させた場合、1日につき契約金額の0.5％の違約金を支払うものとします。',
          en: 'If the supplier delays delivery without cause for over two weeks, a penalty of 0.5% per day will apply.'
        }
      }
    ]
  },

  // --- 7. DOCUMENTS (贸易单证) ---
  {
    id: 'bc_doc_001',
    term: '商业发票',
    pinyin: 'shāngyè fāpiào',
    partOfSpeech: 'noun',
    category: 'documents',
    level: 'beginner',
    tags: ['invoice', 'customs', 'commercial'],
    translations: {
      vi: { meaning: 'Hóa đơn thương mại (Commercial Invoice)', note: 'Chứng từ kế toán và hải quan căn bản nhất chứng minh giá trị và số lượng hàng hóa.' },
      ja: { meaning: '商業送り状（コマーシャル・インボイス）', note: '通関・決済に不可欠な貿易の最重要請求明細書。' },
      en: { meaning: 'Commercial Invoice (CI)', note: 'Legal document between supplier and customer detailing goods sold and amount due.' }
    },
    examples: [
      {
        zh: '报关单上的申报价值必须与商业发票上的金额完全一致。',
        pinyin: 'Bàoguān dān shàng de shēnbào jiàzhí bìxū yǔ shāngyè fāpiào shàng de jīné wánquán yízhì.',
        translations: {
          vi: 'Trị giá khai báo trên tờ khai hải quan bắt buộc phải hoàn toàn trùng khớp với số tiền trên hóa đơn thương mại.',
          ja: '通関申告書の申告価格は、商業インボイスの金額と完全に一致していなければなりません。',
          en: 'The declared value on the customs declaration must match the commercial invoice exactly.'
        }
      }
    ]
  },
  {
    id: 'bc_doc_002',
    term: '装箱单',
    pinyin: 'zhuāngxiāng dān',
    partOfSpeech: 'noun',
    category: 'documents',
    level: 'beginner',
    tags: ['packing-list', 'shipping', 'customs'],
    translations: {
      vi: { meaning: 'Bảng kê đóng gói (Packing List / P/L)', note: 'Liệt kê chi tiết quy cách đóng gói, trọng lượng tịnh (Net Weight), trọng lượng cả bì (Gross Weight), thể tích (CBM).' },
      ja: { meaning: '梱包明細書（パッキングリスト / P/L）', note: '荷姿、個数、総重量、純重量、容積を明記した書類。' },
      en: { meaning: 'Packing List (P/L)', note: 'Document detailing dimensions, net weight, gross weight, and package count.' }
    },
    examples: [
      {
        zh: '海关查验时会重点核对装箱单上的箱数和实际货物是否相符。',
        pinyin: 'Hǎiguān cháyàn shí huì zhòngdiǎn héduì zhuāngxiāng dān shàng de xiāngshù hé shíjì huòwù shìfǒu xiāngfú.',
        translations: {
          vi: 'Khi hải quan kiểm tra thực tế, họ sẽ đối chiếu kỹ số kiện trên packing list có trùng khớp với hàng thực tế không.',
          ja: '税関検査の際、パッキングリストの箱数と実際の貨物が一致しているかが重点的に照合されます。',
          en: 'During inspection, customs will verify whether the box count on the packing list matches the physical cargo.'
        }
      }
    ]
  },
  {
    id: 'bc_doc_003',
    term: '海运提单',
    pinyin: 'hǎiyùn tídān',
    partOfSpeech: 'noun',
    category: 'documents',
    level: 'intermediate',
    tags: ['b-l', 'bill-of-lading', 'ownership'],
    translations: {
      vi: { meaning: 'Vận đơn đường biển (Bill of Lading - B/L)', note: 'Chứng từ sở hữu hàng hóa do hãng tàu cấp. Có bản gốc (Original B/L) và điện giao hàng (Telex Release).' },
      ja: { meaning: '船荷証券（B/L / Bill of Lading）', note: '船会社が発行する有価証券であり、貨物の受領書・引換証。' },
      en: { meaning: 'Ocean Bill of Lading (B/L)', note: 'Document of title issued by carrier acknowledging receipt of cargo for shipment.' }
    },
    examples: [
      {
        zh: '客户付清尾款后，我们立即向船公司申请做电放提单。',
        pinyin: 'Kèhù fù qīng wěikuǎn hòu, wǒmen lìjí xiàng chuán gōngsī shēnqǐng zuò diànfàng tídān.',
        translations: {
          vi: 'Sau khi khách hàng thanh toán xong số tiền còn lại, chúng tôi lập tức yêu cầu hãng tàu làm điện giao hàng (Telex Release B/L).',
          ja: '顧客からの残金入金を確認後、直ちに船会社へテレックス・リリース（サレンダーB/L）の手続きを申請します。',
          en: 'Once the client pays the remaining balance, we will apply for Telex Release of the B/L.'
        }
      }
    ]
  },
  {
    id: 'bc_doc_004',
    term: '原产地证书',
    pinyin: 'yuánchǎndì zhèngshū',
    partOfSpeech: 'noun',
    category: 'documents',
    level: 'intermediate',
    tags: ['co', 'origin', 'tariff'],
    translations: {
      vi: { meaning: 'Chứng nhận xuất xứ hàng hóa (Certificate of Origin - C/O)', note: 'Chứng từ quan trọng để người nhập khẩu được hưởng thuế suất ưu đãi (Form E trong hiệp định ACFTA).' },
      ja: { meaning: '原産地証明書（C/O）', note: '特恵関税の適用を受けるために貨物の原産国を証明する公的書類。' },
      en: { meaning: 'Certificate of Origin (C/O)', note: 'Official document declaring where goods originated to obtain tariff benefits.' }
    },
    examples: [
      {
        zh: '办理一份中越Form E原产地证书，可以帮助买家享受零关税优惠。',
        pinyin: 'Bànlǐ yí fèn Zhōng-Yuè Form E yuánchǎndì zhèngshū, kěyǐ bāngzhù mǎijiā xiǎngshòu líng guānshuì yōuhuì.',
        translations: {
          vi: 'Xin cấp một chứng nhận xuất xứ Form E Trung - Việt có thể giúp người mua hưởng mức thuế quan ưu đãi 0%.',
          ja: '中越Form E原産地証明書を発行することで、買い手はゼロ関税の特恵優遇を受けることができます。',
          en: 'Issuing a China-Vietnam Form E C/O allows the buyer to benefit from zero-tariff preferences.'
        }
      }
    ]
  },
  {
    id: 'bc_doc_005',
    term: '形式发票',
    pinyin: 'xíngshì fāpiào',
    partOfSpeech: 'noun',
    category: 'documents',
    level: 'intermediate',
    tags: ['pi', 'proforma', 'draft'],
    translations: {
      vi: { meaning: 'Hóa đơn chiếu lệ (Proforma Invoice - P/I)', note: 'Bản dự thảo đơn hàng gửi trước để khách hàng mở L/C hoặc xin giấy phép nhập khẩu, chuyển tiền đặt cọc.' },
      ja: { meaning: 'プロフォーマ・インボイス（見積インボイス / P/I）', note: '正式なインボイス発行前に、事前決済や輸入許可申請のために作成する仮書類。' },
      en: { meaning: 'Proforma Invoice (P/I)', note: 'Preliminary bill of sale sent to buyers in advance of a shipment.' }
    },
    examples: [
      {
        zh: '形式发票不是正式的财务结算凭证，但具有合同预确认的约束力。',
        pinyin: 'Xíngshì fāpiào bú shì zhèngshì de cáiwù jiésuàn píngzhèng, dàn jùyǒu hétong yù quèrèn de yuēshùlì.',
        translations: {
          vi: 'Hóa đơn chiếu lệ (P/I) không phải là chứng từ thanh toán kế toán chính thức, nhưng có giá trị ràng buộc cam kết trước.',
          ja: 'プロフォーマインボイスは正式な税務領収書ではありませんが、契約事前合意としての拘束力を持ちます。',
          en: 'A Proforma Invoice is not a tax settlement document, but it serves as a preliminary sales commitment.'
        }
      }
    ]
  },

  // --- 8. CUSTOMS (报关与清关) ---
  {
    id: 'bc_cus_001',
    term: '报关',
    pinyin: 'bào guān',
    partOfSpeech: 'verb',
    category: 'customs',
    level: 'beginner',
    tags: ['customs-declaration', 'export', 'border'],
    translations: {
      vi: { meaning: 'Khai báo hải quan (thường chỉ đầu xuất khẩu)', note: 'Khai báo với hải quan nước xuất khẩu để thông quan hàng ra nước ngoài.' },
      ja: { meaning: '税関申告 / 通関手続き（主に輸出申告）', note: '税関に対して輸出入貨物の詳細を申告すること。' },
      en: { meaning: 'customs declaration (usually export declaration)', note: 'Declaring cargo to customs authorities for export.' }
    },
    examples: [
      {
        zh: '报关资料必须在截关日之前提交给海关审核。',
        pinyin: 'Bàoguān zīliào bìxū zài jiéguān rì zhīqián tíjiāo gěi hǎiguān shěnhé.',
        translations: {
          vi: 'Hồ sơ khai báo hải quan phải nộp cho hải quan thẩm định trước thời điểm đóng cảng (Closing time).',
          ja: '通関書類はカット日（CY Cut）までに税関へ提出し審査を受ける必要があります。',
          en: 'Customs declaration documents must be submitted to customs before the closing deadline.'
        }
      }
    ]
  },
  {
    id: 'bc_cus_002',
    term: '清关',
    pinyin: 'qīng guān',
    partOfSpeech: 'verb',
    category: 'customs',
    level: 'beginner',
    tags: ['customs-clearance', 'import', 'inspection'],
    translations: {
      vi: { meaning: 'Thông quan (thủ tục nhận hàng tại cảng đến)', note: 'Đóng thuế, kiểm tra và hoàn thành thủ tục để lấy hàng ra khỏi kho hải quan.' },
      ja: { meaning: '通関（貨物の引き取り手続き）', note: '輸入国で関税を納付し、貨物の搬出許可を得る手続き。' },
      en: { meaning: 'customs clearance (import port)', note: 'Clearing goods through customs at the destination port.' }
    },
    examples: [
      {
        zh: '货物已经到达海防港，我们的报关行正在协助办理清关手续。',
        pinyin: 'Huòwù yǐjīng dàodá Hǎifáng gǎng, wǒmen de bàoguān háng zhèngzài xiézhù bànlǐ qīngguān shǒuxù.',
        translations: {
          vi: 'Hàng hóa đã đến cảng Hải Phòng, đại lý hải quan của chúng tôi đang hỗ trợ làm thủ tục thông quan.',
          ja: '貨物はすでにハイフォン港に到着しており、当社の通関業者が輸入通関手続きを進めております。',
          en: 'The goods have arrived at Haiphong port; our customs broker is assisting with import clearance.'
        }
      }
    ]
  },
  {
    id: 'bc_cus_003',
    term: '海关编码',
    pinyin: 'hǎiguān biāomǎ',
    partOfSpeech: 'noun',
    category: 'customs',
    level: 'intermediate',
    tags: ['hs-code', 'classification', 'tax'],
    translations: {
      vi: { meaning: 'Mã HS (HS Code / Mã phân loại hàng hóa xuất nhập khẩu)', note: 'Hệ thống mã số hài hòa quốc tế quy định mức thuế và chính sách kiểm tra chuyên ngành.' },
      ja: { meaning: 'HSコード / 税関品目分類番号', note: '商品の品目を世界共通で分類するための国際統一コード。' },
      en: { meaning: 'HS Code (Harmonized System Code)', note: 'Universal classification number for determining tariffs.' }
    },
    examples: [
      {
        zh: '不同国家对同款产品的海关编码归类可能存在细微差异。',
        pinyin: 'Bùtóng guójiā duì tóng kuǎn chǎnpǐn de hǎiguān biāomǎ guīlèi kěnéng cúnzài xìwēi chāyì.',
        translations: {
          vi: 'Các quốc gia khác nhau có thể có sự khác biệt nhỏ trong việc áp mã HS cho cùng một loại sản phẩm.',
          ja: '同一製品であっても、国によってHSコードの細部分類が若干異なる場合があります。',
          en: 'Different countries may have slight variations in HS code classification for the same product.'
        }
      }
    ]
  },
  {
    id: 'bc_cus_004',
    term: '关税',
    pinyin: 'guānshuì',
    partOfSpeech: 'noun',
    category: 'customs',
    level: 'beginner',
    tags: ['tariff', 'duty', 'tax'],
    translations: {
      vi: { meaning: 'Thuế quan / thuế xuất nhập khẩu', note: 'Thuế đánh vào hàng hóa khi lưu chuyển qua biên giới.' },
      ja: { meaning: '関税', note: '国境を通過する貨物に課される税金。' },
      en: { meaning: 'customs duty / tariff', note: 'Tax imposed on goods when transported across borders.' }
    },
    examples: [
      {
        zh: '提供正确的原产地证后，这批货物的进口关税降为了零。',
        pinyin: 'Tígōng zhèngquè de yuánchǎndì zhèng hòu, zhè pī huòwù de jìnkǒu guānshuì jiàng wéi le líng.',
        translations: {
          vi: 'Sau khi cung cấp chứng nhận xuất xứ chính xác, thuế nhập khẩu của lô hàng này đã giảm xuống mức 0%.',
          ja: '適正な原産地証明書を提出したことで、この貨物の輸入関税はゼロに減免されました。',
          en: 'After providing the proper Certificate of Origin, the import duty on this shipment was reduced to zero.'
        }
      }
    ]
  },
  {
    id: 'bc_cus_005',
    term: '查验',
    pinyin: 'cháyàn',
    partOfSpeech: 'verb',
    category: 'customs',
    level: 'intermediate',
    tags: ['inspection', 'customs', 'check'],
    translations: {
      vi: { meaning: 'Kiểm hóa / kiểm tra hàng hóa hải quan', note: 'Hải quan mở container kiểm tra thực tế hàng hóa có đúng tờ khai không.' },
      ja: { meaning: '税関検査（現物検査）', note: '税関が申告内容と実際の貨物が一致しているか現物を確認すること。' },
      en: { meaning: 'customs physical inspection / examination', note: 'Customs inspecting cargo to confirm declaration accuracy.' }
    },
    examples: [
      {
        zh: '柜子被海关抽中查验，可能会产生两天的码头滞箱费。',
        pinyin: 'Guìzi bèi hǎiguān chōuzhòng cháyàn, kěnéng huì chǎnshēng liǎng tiān de mǎtóu zhìxiāng fèi.',
        translations: {
          vi: 'Container bị hải quan chọn kiểm hóa ngẫu nhiên, có thể sẽ phát sinh 2 ngày phí lưu kho bãi/lưu bãi container (Demurrage).',
          ja: 'コンテナが税関検査に指定されたため、2日間のデマレージ（超過保管料）が発生する可能性があります。',
          en: 'The container was selected for customs inspection, which may incur two days of demurrage charges.'
        }
      }
    ]
  }
,
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
  }
];
