/**
 * tools/business-documents.js
 * 10 Core International Trade Documents with Field-by-Field Breakdown and Confusion Distinction Tips.
 */

module.exports = [
  {
    id: 'doc_001_commercial_invoice',
    nameZh: '商业发票',
    pinyin: 'shāngyè fāpiào',
    nameVi: 'Hóa đơn thương mại (Commercial Invoice)',
    nameEn: 'Commercial Invoice (CI)',
    nameJa: '商業送り状（コマーシャル・インボイス）',
    purpose: {
      vi: 'Chứng từ kế toán và hải quan căn bản nhất do bên bán phát hành, kê khai chi tiết giá trị hàng hóa, số lượng, đơn giá, điều kiện giao hàng và phương thức thanh toán để tính thuế nhập khẩu.',
      ja: '輸出者が作成する最重要書類。貨物の品名、数量、単価、総額、貿易条件、支払条件が記載され、輸入通関時の関税計算の基礎となります。',
      en: 'The core legal accounting and customs document issued by the seller declaring goods, unit prices, total value, and terms of delivery for duty calculation.'
    },
    distinctionTip: {
      vi: '⚠️ Khác biệt với 形式发票 (Proforma Invoice - P/I): P/I chỉ là hóa đơn chiếu lệ dự thảo để đặt cọc hoặc xin giấy phép nhập khẩu, KHÔNG có giá trị khai thuế kế toán; trong khi 商业发票 (Commercial Invoice) là chứng từ nợ tiền chính thức phát hành khi hàng đã sẵn sàng xuất bến.',
      ja: '⚠️ プロフォーマインボイス（P/I）との違い：P/Iは事前確認・前金決済用の仮書類（税務上無効）ですが、商業インボイス（C/I）は確定した債権請求書であり税関申告の法的原本です。',
      en: '⚠️ Distinction from Proforma Invoice (P/I): A P/I is merely an advance estimate for opening L/C or paying deposits. The Commercial Invoice is the final legally binding invoice issued upon shipment.'
    },
    standardFields: [
      {
        fieldZh: '发货人 / 出口商 (Shipper / Exporter)',
        fieldEn: 'Shipper / Exporter',
        pinyin: 'fāhuò rén / chūkǒu shāng',
        explanation: {
          vi: 'Tên, địa chỉ, số điện thoại của bên bán / nhà xuất khẩu.',
          ja: '輸出者（売り手）の会社名、住所、連絡先。',
          en: 'Name, address, and contact details of the selling entity.'
        },
        sampleValue: 'Guangdong Tech Import & Export Co., Ltd.'
      },
      {
        fieldZh: '收货人 / 进口商 (Consignee)',
        fieldEn: 'Consignee',
        pinyin: 'shōuhuò rén / jìnkǒu shāng',
        explanation: {
          vi: 'Tên, địa chỉ bên mua / người nhận hàng đứng tên trên tờ khai.',
          ja: '輸入者（買い手・荷受人）の正式名称と所在地。',
          en: 'Party to whom goods are shipped and delivered.'
        },
        sampleValue: 'Vietnam Global Supply Chain JSC, Hanoi'
      },
      {
        fieldZh: '贸易术语 (Incoterms & Price Term)',
        fieldEn: 'Price Term / Incoterms',
        pinyin: 'màoyì shùyǔ',
        explanation: {
          vi: 'Điều kiện giao hàng theo Incoterms 2020 kèm địa điểm xác định (ví dụ: FOB Shenzhen, CIF Haiphong).',
          ja: 'インコタームズ2020に基づく受渡条件（例：FOB Shenzhen、CIF Haiphong）。',
          en: 'Incoterms trade condition with named place (e.g. FOB Shenzhen).'
        },
        sampleValue: 'FOB Shenzhen (Incoterms 2020)'
      },
      {
        fieldZh: '商品编码 (HS Code)',
        fieldEn: 'HS Code',
        pinyin: 'shāngpǐn biāomǎ',
        explanation: {
          vi: 'Mã số phân loại quốc tế 6 đến 10 chữ số dùng để áp mức thuế suất hải quan.',
          ja: '世界共通の品目分類コード（6〜10桁）。関税率決定の根拠。',
          en: 'Harmonized System 6-10 digit tariff classification number.'
        },
        sampleValue: '8504.40.90'
      },
      {
        fieldZh: '发票总金额 (Total Invoice Amount)',
        fieldEn: 'Total Amount',
        pinyin: 'fāpiào zǒng jīné',
        explanation: {
          vi: 'Tổng số tiền viết bằng cả số và chữ kèm loại tiền tệ (USD, EUR, RMB).',
          ja: '通貨単位（USD等）を明記した請求総額（算用数字およびスペルアウト英語表記）。',
          en: 'Grand total payable written in figures and words.'
        },
        sampleValue: 'USD 54,200.00 (Say US Dollars Fifty-Four Thousand Two Hundred Only)'
      }
    ]
  },
  {
    id: 'doc_002_packing_list',
    nameZh: '装箱单',
    pinyin: 'zhuāngxiāng dān',
    nameVi: 'Phiếu đóng gói hàng hóa (Packing List)',
    nameEn: 'Packing List (P/L)',
    nameJa: '梱包明細書（パッキングリスト）',
    purpose: {
      vi: 'Kê khai chi tiết số kiện, quy cách đóng gói, trọng lượng tịnh (Net Weight), trọng lượng cả bì (Gross Weight), thể tích (CBM) để hải quan kiểm hóa và kho vận sắp xếp bốc dỡ.',
      ja: '個々の荷物の梱包番号、内容品、正味重量（Net Weight）、総重量（Gross Weight）、容積（CBM）を詳細に記したリスト。',
      en: 'Itemizes the contents, package numbers, net weight, gross weight, and volume for freight handling and customs verification.'
    },
    distinctionTip: {
      vi: '💡 装箱单 (Packing List) KHÔNG ghi đơn giá hay số tiền thanh toán (khác với hóa đơn thương mại), mục đích chỉ phục vụ vận chuyển, kiểm đếm vật lý và đóng container.',
      ja: '💡 パッキングリストには金額や単価を記載しないのが通例です（商業インボイスとの違い）。物理的な重量・容積・荷姿の把握に特化した書類です。',
      en: '💡 A Packing List typically omits monetary prices; its exclusive purpose is verifying physical package count, weight, and cubic volume.'
    },
    standardFields: [
      {
        fieldZh: '唛头 / 运输标记 (Shipping Marks)',
        fieldEn: 'Shipping Marks & Numbers',
        pinyin: 'màitóu / yùnshū biāojì',
        explanation: {
          vi: 'Ký mã hiệu in trên vỏ thùng carton để nhận diện hàng hóa khi bốc dỡ.',
          ja: '荷物の外装に印刷される識別マーク（企業名略称、仕向地、箱番号等）。',
          en: 'Identification markings printed on cartons for cargo handling.'
        },
        sampleValue: 'VGSC / HAIPHONG / C/NO. 1-250'
      },
      {
        fieldZh: '包装类型与总箱数 (Packages & Quantity)',
        fieldEn: 'Total Packages',
        pinyin: 'bāozhuāng lèixíng yǔ zǒng xiāngshù',
        explanation: {
          vi: 'Số lượng kiện đóng gói (thùng carton, pallet, kiện gỗ, cuộn).',
          ja: 'ダンボール箱（Cartons）、パレット（Pallets）などの荷姿と総個数。',
          en: 'Total number of outer packages (cartons, pallets, drums).'
        },
        sampleValue: '250 Cartons on 10 Wooden Pallets'
      },
      {
        fieldZh: '净重 (Net Weight / N.W.)',
        fieldEn: 'Net Weight (N.W.)',
        pinyin: 'jìngzhòng',
        explanation: {
          vi: 'Trọng lượng thực của sản phẩm (không tính bao bì thùng vỏ).',
          ja: '梱包資材を含まない、製品そのものの正味重量（kg）。',
          en: 'Actual weight of the goods excluding outer packaging.'
        },
        sampleValue: '4,500.00 KGS'
      },
      {
        fieldZh: '毛重 (Gross Weight / G.W.)',
        fieldEn: 'Gross Weight (G.W.)',
        pinyin: 'máozhòng',
        explanation: {
          vi: 'Trọng lượng cả bì (bao gồm sản phẩm + hộp + thùng carton + pallet).',
          ja: '梱包資材・パレットを含んだ総重量（kg）。クレーン荷重計算の基準。',
          en: 'Total weight including merchandise and all packing materials.'
        },
        sampleValue: '5,120.00 KGS'
      },
      {
        fieldZh: '总体积 (Measurement / Volume in CBM)',
        fieldEn: 'Measurement / CBM',
        pinyin: 'zǒng tǐjī',
        explanation: {
          vi: 'Tổng thể tích khối mét khối (CBM = m³) tính cước vận tải biển/hàng không.',
          ja: '外箱の縦×横×高さを合算した総容積（CBM＝立法メートル）。',
          en: 'Total cubic meters (CBM) of the shipment.'
        },
        sampleValue: '28.50 CBM'
      }
    ]
  },
  {
    id: 'doc_003_bill_of_lading',
    nameZh: '海运提单',
    pinyin: 'hǎiyùn tídān',
    nameVi: 'Vận đơn đường biển (Bill of Lading - B/L)',
    nameEn: 'Ocean Bill of Lading (B/L)',
    nameJa: '船荷証券（B/L / Bill of Lading）',
    purpose: {
      vi: 'Chứng từ nhận hàng của hãng tàu, bằng chứng của hợp đồng vận tải và là CHỨNG TỪ SỞ HỮU HÀNG HÓA có thể chuyển nhượng hoặc ký hậu.',
      ja: '運送品を受領したことを証明し、運送契約を証する有価証券。荷受人が貨物の引き渡しを請求できる権利証券。',
      en: 'A legal document issued by an ocean carrier acknowledging cargo receipt; acts as a title document and receipt of goods.'
    },
    distinctionTip: {
      vi: '⚠️ Bản gốc (Original B/L) có giá trị sở hữu tài sản: ai cầm bản gốc ký hậu hợp lệ mới được lấy hàng. Ngược lại, Điện giao hàng (Telex Release) là hình thức hãng tàu phát lệnh giải phóng hàng bằng điện tử mà không cần xuất trình bản gốc tại cảng đến.',
      ja: '⚠️ オリジナルB/L（原本）は裏書によって権利譲渡可能な有価証券です。対してサレンダーB/L（テレックス・リリース）は原本を回収し電子的に荷渡しを許可する迅速な運用です。',
      en: '⚠️ An Original B/L is a negotiable document of title required at destination. A Telex Release surrenders the physical original, authorizing immediate digital release.'
    },
    standardFields: [
      {
        fieldZh: '装运港 (Port of Loading - POL)',
        fieldEn: 'Port of Loading',
        pinyin: 'zhuāngyùn gǎng',
        explanation: {
          vi: 'Cảng bốc hàng lên tàu tại nước xuất khẩu.',
          ja: '輸出国の貨物積込港（例：上海港、深圳塩田港）。',
          en: 'Port where the goods are loaded onto the ocean vessel.'
        },
        sampleValue: 'Shenzhen, China (Yantian Port)'
      },
      {
        fieldZh: '卸货港 (Port of Discharge - POD)',
        fieldEn: 'Port of Discharge',
        pinyin: 'xièhuò gǎng',
        explanation: {
          vi: 'Cảng dỡ hàng tại nước nhập khẩu.',
          ja: '輸入国の貨物陸揚港（例：ハイフォン港、東京港）。',
          en: 'Port where goods are unloaded from the vessel.'
        },
        sampleValue: 'Haiphong, Vietnam'
      },
      {
        fieldZh: '船名航次 (Vessel & Voyage No.)',
        fieldEn: 'Vessel / Voyage',
        pinyin: 'chuánmíng hángcì',
        explanation: {
          vi: 'Tên con tàu chuyên chở và mã hiệu chuyến hải trình.',
          ja: '貨物を運ぶ本船の名称および航海番号。',
          en: 'Name of the ocean carrier ship and trip sequence code.'
        },
        sampleValue: 'EVER GIVEN V.0321W'
      },
      {
        fieldZh: '集装箱号与封条号 (Container & Seal No.)',
        fieldEn: 'Container No. / Seal No.',
        pinyin: 'jízhuāngxiāng hào yǔ fēngtiáo hào',
        explanation: {
          vi: 'Mã hiệu 11 ký tự của container (ví dụ: TCKU1234567) và số chì niêm phong.',
          ja: '4桁英字+7桁数字のコンテナ識別番号および不正開封防止のシール番号。',
          en: 'Unique intermodal container letters/digits and secure bolt seal number.'
        },
        sampleValue: 'EMCU9823412 / SEAL: ML-VN99281'
      },
      {
        fieldZh: '运费支付方式 (Freight Payable)',
        fieldEn: 'Freight Term',
        pinyin: 'yùnfèi zhīfù fāngshì',
        explanation: {
          vi: 'Freight Prepaid (Cước trả trước tại cảng đi - thường dùng trong CIF/CFR) hoặc Freight Collect (Cước thu sau tại cảng đến - thường dùng trong FOB).',
          ja: '「Freight Prepaid」（元払い/売り手負担）か「Freight Collect」（着払い/買い手負担）かの明記。',
          en: 'Freight Prepaid (origin paid - CIF/CFR) or Freight Collect (destination paid - FOB).'
        },
        sampleValue: 'Freight Prepaid'
      }
    ]
  },
  {
    id: 'doc_004_certificate_of_origin',
    nameZh: '原产地证书',
    pinyin: 'yuánchǎndì zhèngshū',
    nameVi: 'Chứng nhận xuất xứ hàng hóa (Certificate of Origin - C/O)',
    nameEn: 'Certificate of Origin (C/O)',
    nameJa: '原産地証明書（C/O）',
    purpose: {
      vi: 'Chứng minh nguồn gốc quốc gia nơi sản xuất ra hàng hóa, phục vụ việc hưởng ưu đãi thuế quan đặc biệt theo các hiệp định thương mại tự do (như ACFTA Form E giữa Trung Quốc và ASEAN).',
      ja: '貨物の原産国を公的に証明する書類。自由貿易協定（FTA/EPA）に基づく特恵関税の減免適用を受けるための必須書類。',
      en: 'Certifies the country where goods were manufactured to claim preferential tariff treatments under FTAs.'
    },
    distinctionTip: {
      vi: '💡 Tại Việt Nam khi nhập khẩu từ Trung Quốc, bắt buộc dùng Form E (Hiệp định ASEAN - Trung Quốc ACFTA) để được giảm thuế về 0% hoặc mức rất thấp. Dùng C/O phổ thông thông thường (CO Non-preferential) sẽ KHÔNG được giảm thuế.',
      ja: '💡 中国からベトナムへの輸入では「Form E」（中国・ASEAN FTA特恵）の取得が極めて重要です。一般原産地証では特恵関税の恩恵を受けられません。',
      en: '💡 Importers in Vietnam utilize Form E under ACFTA to secure zero or reduced tariff rates. Standard non-preferential COs provide no duty relief.'
    },
    standardFields: [
      {
        fieldZh: '发货人与生产商 (Exporter & Manufacturer)',
        fieldEn: 'Exporter / Producer',
        pinyin: 'fāhuò rén yǔ shēngchǎn shāng',
        explanation: {
          vi: 'Doanh nghiệp xuất khẩu và cơ sở nhà máy sản xuất tại nước xuất xứ.',
          ja: '輸出者および原産地国内の製造工場名。',
          en: 'Registered exporter and manufacturing facility.'
        },
        sampleValue: 'Zhejiang Electrical Appliances Co., Ltd.'
      },
      {
        fieldZh: '原产地标准 (Origin Criteria)',
        fieldEn: 'Origin Criteria',
        pinyin: 'yuánchǎndì biāozhǔn',
        explanation: {
          vi: 'Tiêu chí xuất xứ: "WO" (Wholly Obtained - thuần túy) hoặc tỷ lệ hàm lượng giá trị khu vực RVC (ví dụ: RVC ≥ 40%).',
          ja: '完全生産品（WO）または付加価値基準（RVC 40%以上）などの満たすべき原産地規則。',
          en: 'Rules met, such as Wholly Obtained (WO) or Regional Value Content (RVC ≥ 40%).'
        },
        sampleValue: 'RVC 45%'
      },
      {
        fieldZh: '发票编号与日期 (Invoice No. & Date)',
        fieldEn: 'Invoice No. & Date',
        pinyin: 'fāpiào biānhào yǔ rìqī',
        explanation: {
          vi: 'Số hóa đơn và ngày lập hóa đơn phải trùng khớp 100% với Commercial Invoice.',
          ja: '商業インボイスの番号と日付と完全に合致している必要があります。',
          en: 'Must mirror the Commercial Invoice number and date without discrepancy.'
        },
        sampleValue: 'INV-2026-9901 / 2026-10-25'
      },
      {
        fieldZh: '签证机构印章与签字 (Issuing Authority)',
        fieldEn: 'Official Certification Stamp',
        pinyin: 'qiānzhèng jīgòu yìnzhāng yǔ qiānzì',
        explanation: {
          vi: 'Dấu mộc và chữ ký của cơ quan thẩm quyền (Hải quan Trung Quốc hoặc CCPIT).',
          ja: '公認発行機関（中国海関または中国国際貿易促進委員会 CCPIT）の印章と署名。',
          en: 'Stamp and signature of designated authority (China Customs or CCPIT).'
        },
        sampleValue: 'Customs of the People\'s Republic of China'
      }
    ]
  },
  {
    id: 'doc_005_customs_declaration',
    nameZh: '报关单',
    pinyin: 'bàoguān dān',
    nameVi: 'Tờ khai hải quan (Customs Declaration)',
    nameEn: 'Customs Declaration',
    nameJa: '輸出入申告書（税関申告書）',
    purpose: {
      vi: 'Văn bản pháp lý người khai hải quan nộp cho cơ quan Hải quan để kê khai chi tiết các thông tin về lô hàng phục vụ việc kiểm tra, tính thuế và thông quan hàng hóa.',
      ja: '輸出入者が税関に対し、貨物の品目、数量、価格、原産地、関税額等を公式に申告するための法的書式。',
      en: 'Statutory form submitted to customs authorities specifying goods, values, classification, and applicable taxes.'
    },
    distinctionTip: {
      vi: '💡 Tờ khai phân luồng gồm: Luồng Xanh (miễn kiểm, thông quan tự động), Luồng Vàng (kiểm tra hồ sơ giấy tờ), Luồng Đỏ (kiểm tra thực tế hàng hóa container).',
      ja: '💡 ベトナム等の通関では審査区分（グリーン：即時許可、イエロー：書類審査、レッド：現物検査）により通関日数が大きく変わります。',
      en: '💡 Customs channels: Green Channel (paperless clearance), Yellow Channel (document check), Red Channel (physical container inspection).'
    },
    standardFields: [
      {
        fieldZh: '海关编号 / 申报单号 (Declaration No.)',
        fieldEn: 'Declaration Number',
        pinyin: 'hǎiguān biāohào',
        explanation: {
          vi: 'Dãy số định danh duy nhất của tờ khai hải quan điện tử.',
          ja: '電子通関システム（VNACCS等）で採番される固有申告番号。',
          en: 'Unique alphanumeric identifier issued by the national customs database.'
        },
        sampleValue: '106294821920'
      },
      {
        fieldZh: '申报价值与币种 (Declared Value & Currency)',
        fieldEn: 'Customs Value & Currency',
        pinyin: 'shēnbào jiàzhí yǔ bìzhǒng',
        explanation: {
          vi: 'Trị giá tính thuế hải quan quy đổi ra tiền nội tệ hoặc USD theo tỷ giá quy định.',
          ja: '公示レートに基づき換算される関税評価額。',
          en: 'Dutiable transaction value converted at current customs exchange rates.'
        },
        sampleValue: 'VND 1,280,500,000 (USD 52,000)'
      },
      {
        fieldZh: '关税与增值税 (Duty & VAT Payable)',
        fieldEn: 'Tariff & VAT Amount',
        pinyin: 'guānshuì yǔ zēngzhíshuì',
        explanation: {
          vi: 'Số tiền thuế nhập khẩu và thuế giá trị gia tăng (VAT) phải nộp vào ngân sách nhà nước.',
          ja: '納付すべき輸入関税および輸入付加価値税（VAT）。',
          en: 'Calculated import duties and value-added tax to be deposited.'
        },
        sampleValue: 'Duty: 0% (Form E) / VAT: 8% (VND 102,440,000)'
      }
    ]
  },
  {
    id: 'doc_006_air_waybill',
    nameZh: '空运单 (AWB)',
    pinyin: 'kōngyùn dān',
    nameVi: 'Vận đơn hàng không (Air Waybill - AWB)',
    nameEn: 'Air Waybill (AWB)',
    nameJa: '航空貨物運送状（Air Waybill）',
    purpose: {
      vi: 'Chứng từ vận chuyển đường hàng không do hãng bay hoặc đại lý phát hành, vừa là biên lai nhận hàng vừa là hợp đồng vận chuyển.',
      ja: '航空貨物輸送において航空会社またはフォワーダーが発行する受取証兼運送契約書。',
      en: 'A non-negotiable transport document issued by an airline or forwarder covering the carriage of goods by air.'
    },
    distinctionTip: {
      vi: '⚠️ Điểm cốt yếu: Vận đơn hàng không (AWB) KHÔNG PHẢI là chứng từ sở hữu hàng hóa (Non-negotiable). Người nhận hàng (Consignee) có thể nhận hàng chỉ bằng việc chứng minh danh tính mà không cần xuất trình AWB gốc như vận đơn đường biển (B/L).',
      ja: '⚠️ 最重要注意点：航空運送状（AWB）は海上B/Lと異なり「有価証券（流通証券）」ではありません。名宛人（Consignee）は身元確認のみで貨物を引き取れるため、信用状（L/C）取引時は代金回収リスクに注意が必要です。',
      en: '⚠️ Crucial distinction: Unlike an ocean Bill of Lading, an Air Waybill is strictly non-negotiable and does NOT represent title to the goods. Consignees can take delivery without surrendering original paper.'
    },
    standardFields: [
      {
        fieldZh: '主单号与分单号 (MAWB / HAWB No.)',
        fieldEn: 'Master AWB / House AWB Number',
        pinyin: 'zhǔ dānhào yǔ fēn dānhào',
        explanation: {
          vi: 'MAWB do hãng hàng không phát hành (3 số tiền tố hãng + 8 số), HAWB do đại lý logistics phát hành.',
          ja: '航空会社発行のMAWB（航空会社コード3桁＋8桁）とフォワーダー発行のHAWB。',
          en: 'Master AWB issued by operating airline; House AWB issued by freight forwarder.'
        },
        sampleValue: 'MAWB: 784-12345675 / HAWB: SGN-CAN-202610-09'
      },
      {
        fieldZh: '始发机场与目的机场 (Airport of Departure & Destination)',
        fieldEn: 'Airport of Departure & Destination (IATA 3-letter codes)',
        pinyin: 'shǐfā jīchǎng yǔ mùdì jīchǎng',
        explanation: {
          vi: 'Mã IATA 3 ký tự của sân bay đi và sân bay đến (ví dụ: SGN - TSN, CAN - HAN).',
          ja: '出発地・到着地空港の3文字IATAコード。',
          en: 'Standard 3-letter IATA airport codes.'
        },
        sampleValue: 'CAN (Guangzhou Baiyun) -> HAN (Hanoi Noi Bai)'
      },
      {
        fieldZh: '计费重量 (Chargeable Weight)',
        fieldEn: 'Chargeable Weight (Gross vs. Volumetric)',
        pinyin: 'jìfèi zhòngliàng',
        explanation: {
          vi: 'Trọng lượng tính cước: chọn giá trị lớn hơn giữa Trọng lượng thực (Gross Weight) và Trọng lượng quy đổi thể tích (Volume / 6000 hoặc / 5000).',
          ja: '容積重量（長x幅x高/6000）と実重量のうち大きい方の課金重量。',
          en: 'Higher of actual gross weight or volumetric weight (CBM x 167 kg).'
        },
        sampleValue: 'Gross: 320 kg / Vol: 410 kg -> Chargeable: 410 kg'
      }
    ]
  },
  {
    id: 'doc_007_purchase_order',
    nameZh: '采购订单 (PO)',
    pinyin: 'cǎigòu dìngdān',
    nameVi: 'Đơn đặt hàng (Purchase Order - P/O)',
    nameEn: 'Purchase Order (PO)',
    nameJa: '発注書・購買注文書（Purchase Order）',
    purpose: {
      vi: 'Văn bản cam kết mua hàng chính thức do người mua gửi cho người bán, nêu rõ chủng loại, số lượng, quy cách, đơn giá và thời hạn giao hàng cam kết.',
      ja: '買い手（発注者）が売り手（受注者）に対して発行する正式な購入申込み・確定発注文書。',
      en: 'A commercial document and first official offer issued by a buyer to a seller indicating types, quantities, and agreed prices.'
    },
    distinctionTip: {
      vi: '💡 Phân biệt P/O và Hợp đồng: Khi người bán ký xác nhận (P/O Confirmation / Countersign) thì P/O có hiệu lực tương đương một hợp đồng mua bán ràng buộc pháp lý giữa hai bên.',
      ja: '💡 契約との関係：売り手がPOを受理し署名・返送（受注確認）した時点で、法的に有効な売買契約が成立します。',
      en: '💡 Legal binding: Once countersigned or formally acknowledged by the supplier, a PO constitutes a legally binding contract.'
    },
    standardFields: [
      {
        fieldZh: '采购单号 (PO Number)',
        fieldEn: 'PO Number',
        pinyin: 'cǎigòu dānhào',
        explanation: {
          vi: 'Số hiệu đơn mua hàng dùng làm căn cứ thanh toán và tham chiếu xuyên suốt quá trình sản xuất.',
          ja: '社内管理およびサプライヤー連携用の一意な発注番号。',
          en: 'Unique order identifier referenced on all subsequent shipping docs.'
        },
        sampleValue: 'PO-2026-OCT-8821'
      },
      {
        fieldZh: '交付期日 (Delivery Date / Lead Time)',
        fieldEn: 'Agreed Delivery Date / ETD',
        pinyin: 'jiāofù qīrì',
        explanation: {
          vi: 'Ngày nhà máy phải hoàn thành đơn hàng hoặc ngày tàu rời cảng theo thỏa thuận.',
          ja: '工場出荷日または本船積載予定期日。',
          en: 'Mandatory completion or vessel loading deadline.'
        },
        sampleValue: '2026-11-25 (Ex-factory or FOB Loading)'
      },
      {
        fieldZh: '质量与验收标准 (Quality Standard & Inspection Terms)',
        fieldEn: 'Inspection & Acceptance Criteria',
        pinyin: 'zhìliàng yǔ yànshōu biāozhǔn',
        explanation: {
          vi: 'Tiêu chuẩn kiểm nghiệm hàng hóa (ví dụ: AQL 1.5/4.0, kiểm định bởi bên thứ ba SGS/TUV).',
          ja: '検査基準および受入合否基準（例：AQL Level II、SGS検品）。',
          en: 'Acceptance quality limit and designated third-party inspection agent.'
        },
        sampleValue: 'AQL 2.5 Major / 4.0 Minor inspection before balance payment'
      }
    ]
  },
  {
    id: 'doc_008_proforma_invoice',
    nameZh: '形式发票 (PI)',
    pinyin: 'xíngshì fāpiào',
    nameVi: 'Hóa đơn chiếu lệ (Proforma Invoice - P/I)',
    nameEn: 'Proforma Invoice (PI)',
    nameJa: '見積送り状・仮インボイス（Proforma Invoice）',
    purpose: {
      vi: 'Bản hóa đơn dự thảo do bên bán cung cấp trước khi sản xuất hoặc xuất hàng, dùng để người mua tiến hành mở L/C, xin giấy phép nhập khẩu hoặc chuyển tiền đặt cọc (T/T Deposit).',
      ja: '正式な出荷前に売り手が発行する見積兼仮請求書。信用状（L/C）開設申請や前受金支払いの基礎となります。',
      en: 'A preliminary invoice sent to buyers before shipment or manufacturing, used to arrange letters of credit, import licenses, or deposit transfers.'
    },
    distinctionTip: {
      vi: '⚠️ Nhớ kỹ: P/I KHÔNG dùng để hạch toán thuế hay thông quan chính thức khi tàu cập bến. Số liệu trên Commercial Invoice thực tế có thể thay đổi nhẹ so với P/I tùy theo sản lượng xuất xưởng.',
      ja: '⚠️ 会計・税関上の注意点：P/Iは商業インボイスの事前見込書であり、実際の税関申告には船積後の確定Commercial Invoiceが必要です。',
      en: '⚠️ Key reminder: A PI is not an official demand for final settlement nor valid for final tax declaration at destination customs.'
    },
    standardFields: [
      {
        fieldZh: '定金与付款条款 (Deposit & Payment Terms)',
        fieldEn: 'Payment Terms (e.g. 30% T/T Advance, 70% against B/L)',
        pinyin: 'dìngjīn yǔ fùkuǎn tiáokuǎn',
        explanation: {
          vi: 'Quy định chi tiết tỷ lệ tiền cọc để bắt đầu sản xuất và thời hạn thanh toán số tiền còn lại.',
          ja: '前金手付金比率および残金決済スケジュール。',
          en: 'Advance deposit percentage required to commence production and balance schedule.'
        },
        sampleValue: '30% T/T advance deposit, 70% balance against copy of B/L'
      },
      {
        fieldZh: '有效期 (Validity Period of Quotation)',
        fieldEn: 'Price Validity Period',
        pinyin: 'yǒuxiàoqī',
        explanation: {
          vi: 'Thời hạn hiệu lực của đơn giá trên P/I (thường 15-30 ngày do biến động nguyên vật liệu và tỷ giá).',
          ja: '原材料価格や為替変動を考慮した見積有効期限。',
          en: 'Expiration timeframe for quoted unit prices.'
        },
        sampleValue: 'Valid until 15 days from issue date'
      },
      {
        fieldZh: '银行汇款账户 (Beneficiary Bank Details)',
        fieldEn: 'Beneficiary Bank Account Information',
        pinyin: 'yínháng huìkuǎn zhànghù',
        explanation: {
          vi: 'Tên người thụ hưởng, tên ngân hàng, số tài khoản USD/CNY và mã SWIFT Code.',
          ja: '送金先銀行名、口座名義、口座番号、SWIFTコード。',
          en: 'Full banking coordinates including Beneficiary Name, IBAN/Account, and SWIFT Code.'
        },
        sampleValue: 'Bank of China Shenzhen Branch / SWIFT: BKCHCNBJ400 / A/C: 7529 1088 2901'
      }
    ]
  },
  {
    id: 'doc_009_sales_contract',
    nameZh: '国际销售合同',
    pinyin: 'guójì xiàoshòu hétong',
    nameVi: 'Hợp đồng thương mại quốc tế (Sales Contract)',
    nameEn: 'International Sales Contract',
    nameJa: '国際売買契約書（Sales Contract）',
    purpose: {
      vi: 'Văn bản pháp lý cao nhất xác lập quyền và nghĩa vụ ràng buộc giữa người mua và người bán trong giao dịch xuất nhập khẩu quốc tế.',
      ja: '国際売買において買い手と売り手の権利・義務・救済手段を包括的に規定する最高位の法的文書。',
      en: 'The definitive legal agreement establishing all contractual rights, obligations, governing laws, and remedies between cross-border counter-parties.'
    },
    distinctionTip: {
      vi: '💡 Các điều khoản trọng yếu bắt buộc phải kiểm tra kỹ: Bất khả kháng (Force Majeure), Giải quyết tranh chấp / Trọng tài (Arbitration clause: CIETAC, VIAC, SIAC), và Luật áp dụng (Governing Law).',
      ja: '💡 重点確認条項：不可抗力条項（Force Majeure）、仲裁地および管轄仲裁機関（CIETAC、SIAC等）、準拠法（Governing Law）は万一の紛争時に最重要となります。',
      en: '💡 Critical boilerplate clauses: Force Majeure, Dispute Resolution / Arbitration Venue (e.g. CIETAC, SIAC), and Governing Law provisions.'
    },
    standardFields: [
      {
        fieldZh: '不可抗力条款 (Force Majeure Clause)',
        fieldEn: 'Force Majeure Clause',
        pinyin: 'bùkěkànglì tiáokuǎn',
        explanation: {
          vi: 'Quy định miễn trách nhiệm khi phát sinh thiên tai, chiến tranh, dịch bệnh ngoài tầm kiểm soát.',
          ja: '天災、戦争、政府規制等、当事者の合理的支配を超える事由による免責。',
          en: 'Exemption of liabilities resulting from extraordinary acts beyond parties control.'
        },
        sampleValue: 'Neither party shall be held liable for delays caused by Force Majeure events'
      },
      {
        fieldZh: '仲裁条款 (Arbitration & Jurisdiction)',
        fieldEn: 'Dispute Settlement & Arbitration Clause',
        pinyin: 'zhòngcái tiáokuǎn',
        explanation: {
          vi: 'Địa điểm và hội đồng trọng tài xử lý tranh chấp (ví dụ: SIAC Singapore, CIETAC Beijing).',
          ja: '紛争解決手段および管轄仲裁機関（例：中国国際経済貿易仲裁委員会 CIETAC）。',
          en: 'Agreed arbitral seat and rules governing dispute resolution.'
        },
        sampleValue: 'All disputes shall be submitted to SIAC in Singapore under Singapore Law'
      },
      {
        fieldZh: '违约金与索赔期 (Liquidated Damages & Claim Period)',
        fieldEn: 'Liquidated Damages & Claim Deadline',
        pinyin: 'wéiyuējīn yǔ suǒpéi qī',
        explanation: {
          vi: 'Mức phạt chậm giao hàng (% mỗi tuần trễ hạn) và thời hạn tối đa để khiếu nại chất lượng hàng (thường 30-60 ngày sau cập cảng).',
          ja: '遅延損害金（週あたりペナルティ率）および品質クレーム申立期限。',
          en: 'Late delivery liquidated penalty and maximum quality claim window post arrival.'
        },
        sampleValue: '0.5% per week of delay up to 5%; claims within 30 days of arrival'
      }
    ]
  },
  {
    id: 'doc_010_marine_insurance',
    nameZh: '货物运输保险单',
    pinyin: 'huòwù yùnshū bǎoxiǎndān',
    nameVi: 'Đơn bảo hiểm hàng hóa vận chuyển (Cargo Marine Insurance Policy)',
    nameEn: 'Cargo Marine Insurance Policy',
    nameJa: '貨物海上保険証券（Marine Insurance Policy）',
    purpose: {
      vi: 'Chứng từ bảo hiểm do công ty bảo hiểm cấp nhằm bồi thường các tổn thất, hư hỏng hoặc mất mát của lô hàng trong quá trình vận tải quốc tế.',
      ja: '国際輸送途上における貨物の滅失・毀損などの損害を補償するため、保険会社が発行する証券。',
      en: 'A legal document issued by an insurer indemnifying the cargo owner against maritime, air, and transit perils.'
    },
    distinctionTip: {
      vi: '⚠️ Phân biệt điều kiện bảo hiểm: ICC (A) [Mọi rủi ro - All Risks, phạm vi rộng nhất], ICC (B) [Tổn thất do thiên tai va chạm chìm đắm], và ICC (C) [Tổn thất lớn, phạm vi hẹp nhất]. Theo CIF thông thường bên bán phải mua tối thiểu ICC (C) với trị giá 110% giá CIF.',
      ja: '⚠️ 保険条件の識別：協会貨物約款 ICC(A) [全危険担保/All Risks]、ICC(B) [限定担保]、ICC(C) [最小担保]。CIF取引では売主は通常CIF価格の110%で最低ICC(C)以上の保険を付保します。',
      en: '⚠️ Coverage types: Institute Cargo Clauses ICC (A) [All Risks], ICC (B), and ICC (C). Under Incoterms CIF, standard baseline coverage is 110% of CIF invoice value under ICC (C) or ICC (A).'
    },
    standardFields: [
      {
        fieldZh: '保险险别 (Clauses / Coverage Terms)',
        fieldEn: 'Insurance Conditions (ICC A, B, or C)',
        pinyin: 'bǎoxiǎn xiǎnbié',
        explanation: {
          vi: 'Phạm vi rủi ro được bảo hiểm (ví dụ: ICC (A) - All Risks kèm Bảo hiểm Rủi ro Chiến tranh War Risks).',
          ja: '適用される保険約款（例：Institute Cargo Clauses (A) 2009 & War Clauses）。',
          en: 'Governing insurance clauses and perils covered.'
        },
        sampleValue: 'Institute Cargo Clauses (A) + Institute War Clauses (Cargo)'
      },
      {
        fieldZh: '保险金额 (Insured Amount)',
        fieldEn: 'Sum Insured (CIF + 10%)',
        pinyin: 'bǎoxiǎn jīné',
        explanation: {
          vi: 'Số tiền bảo hiểm, thông lệ quốc tế là 110% trị giá hóa đơn CIF.',
          ja: '保険金額。国際慣行上CIF価格の110%で設定されるのが標準的です。',
          en: 'Total indemnification limit, customarily 110% of CIF commercial invoice value.'
        },
        sampleValue: 'USD 57,200 (110% of CIF USD 52,000)'
      },
      {
        fieldZh: '理赔地点与检验代理 (Claims Payable At & Survey Agent)',
        fieldEn: 'Claims Settling Agent & Payable Location',
        pinyin: 'lǐpéi dìdiǎn yǔ jiǎnyàn dàilǐ',
        explanation: {
          vi: 'Nơi giải quyết bồi thường tại cảng đến và đại lý giám định tổn thất được chỉ định.',
          ja: '仕向地における事故鑑定人（Surveyor）および保険金支払窓口。',
          en: 'Designated surveying agency and local claim disbursement office at destination.'
        },
        sampleValue: 'Claims payable in Haiphong, Vietnam by Lloyd\'s Agent'
      }
    ]
  }
];
