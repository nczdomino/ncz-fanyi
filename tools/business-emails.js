/**
 * tools/business-emails.js
 * 11 Real-World Commercial Email Templates covering all standard foreign trade workflows:
 * 1. Company & Product Introduction (公司与产品介绍)
 * 2. Cold Outreach / Partnership Inquiry (潜在客户开发)
 * 3. Price & MOQ Inquiry (产品询价与起订量)
 * 4. Quotation Offer (发送正式报价单)
 * 5. Purchase Order (PO) Confirmation (确认采购订单)
 * 6. Document Request (请求补充单证资料)
 * 7. Shipping / Dispatch Advice (发货通知与提单预告)
 * 8. Payment Reminder (催促付款)
 * 9. Delivery Delay Notice & Apology (交期延误通知与致歉)
 * 10. Quality Complaint & Claim (货物质量问题与索赔)
 * 11. Post-Meeting Thank You (拜访/会谈后感谢信)
 */

module.exports = [
  {
    id: 'email_001_intro',
    category: 'emails',
    subject: {
      zh: '【业务合作】[MyCompanyName] 向贵司致意并附上最新产品目录',
      vi: '【Hợp tác kinh doanh】[MyCompanyName] kính gửi quý công ty và gửi kèm danh mục sản phẩm mới nhất',
      ja: '【業務提携のご提案】[MyCompanyName]より最新製品カタログ送付のご案内',
      en: 'Business Cooperation: Introduction & Product Catalog from [MyCompanyName]'
    },
    recipientType: {
      zh: '潜在合作伙伴 / 采购总监',
      vi: 'Đối tác tiềm năng / Giám đốc mua hàng',
      ja: '見込みパートナー / 調達部門ご担当者様',
      en: 'Prospective Partner / Purchasing Director'
    },
    purpose: {
      zh: '首次向潜在海外客户自我介绍，展示核心制造能力并提供产品目录。',
      vi: 'Giới thiệu năng lực công ty lần đầu tới đối tác nước ngoài và gửi đính kèm catalogue.',
      ja: '海外見込み客への初回アプローチ。強みをアピールしカタログを提供。',
      en: 'First-time corporate introduction showcasing manufacturing strengths and catalog.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên người nhận', en: 'Recipient Name', ja: 'ご担当者名' }, example: '张经理 (Mr. Zhang)' },
      { key: 'ClientCompany', label: { vi: 'Tên công ty đối tác', en: 'Partner Company', ja: '相手先企業名' }, example: 'ABC Trading Co., Ltd.' },
      { key: 'MyCompanyName', label: { vi: 'Tên công ty của bạn', en: 'Your Company', ja: '貴社名' }, example: 'Hai Phong Electronics JSC' },
      { key: 'ProductCategory', label: { vi: 'Loại sản phẩm chính', en: 'Product Line', ja: '主力製品分野' }, example: '智能穿戴与蓝牙配件 (Smart Wearables & Audio)' }
    ],
    keyPhrases: [
      { zh: '不胜感激', pinyin: 'búshèng gǎnjī', translations: { vi: 'vô cùng cảm kích / biết ơn', ja: '大変感謝申し上げます', en: 'deeply grateful' } },
      { zh: '主营业务', pinyin: 'zhǔyíng yèwù', translations: { vi: 'ngành nghề kinh doanh cốt lõi', ja: '主力事業・主要業務', en: 'core business' } },
      { zh: '顺祝商祺', pinyin: 'shùn zhù shāng qí', translations: { vi: 'kính chúc việc kinh doanh phát đạt', ja: '貴社の発展をお祈り申し上げます', en: 'Best business regards' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！见信吉祥！

我司 [MyCompanyName] 是越南领先的 [ProductCategory] 生产制造企业，专注于为全球买家提供高性价比的OEM及ODM代工服务。得知贵司 [ClientCompany] 在该领域享有盛誉，我们非常期待能有机会为您提供优质的供应链支持。

附件中附有我司的最新产品画册及主要技术参数，敬请查收。如果您对其中任何型号感兴趣，或者有定制化需求，请随时告知，我们将在24小时内为您核算最优惠的报价与样品安排。

顺祝商祺！

[MyCompanyName] 国际业务部
联系电话：[MyPhone]
官方网址：[MyWebsite]`,
      translations: {
        vi: `Kính gửi [ClientName],

Xin chào ông/bà! Chúc ông/bà mọi sự tốt lành!

Công ty chúng tôi [MyCompanyName] là doanh nghiệp sản xuất [ProductCategory] hàng đầu tại Việt Nam, chuyên cung cấp dịch vụ gia công OEM và ODM hiệu quả cao cho khách hàng quốc tế. Được biết quý công ty [ClientCompany] có uy tín lớn trong ngành, chúng tôi rất hy vọng có cơ hội được hỗ trợ chuỗi cung ứng cho quý vị.

Trong tệp đính kèm là catalogue mới nhất và thông số kỹ thuật của chúng tôi, xin vui lòng xem qua. Nếu quý khách quan tâm đến bất kỳ model nào hoặc có nhu cầu tùy biến, xin hãy cho chúng tôi biết; chúng tôi sẽ gửi báo giá tốt nhất và sắp xếp mẫu thử trong vòng 24 giờ.

Kính chúc kinh doanh phát đạt!

Phòng Kinh doanh Quốc tế - [MyCompanyName]`,
        ja: `拝啓　[ClientName] 様

平素は格別のご高配を賜り、厚く御礼申し上げます。

当社 [MyCompanyName] はベトナムにおいて [ProductCategory] の製造に特化し、世界各国へOEM/ODM供給を行っているメーカーでございます。貴社 [ClientCompany] の業界における高い評判を拝見し、サプライチェーンの一助としてお役に立てればと存じ、ご連絡申し上げました。

添付にて最新の製品カタログおよび主要スペック表をお送りいたしますので、ご査収いただけますと幸いです。ご関心のある製品や特注仕様のご相談がございましたら、24時間以内にお見積りとサンプル手配をご案内申し上げます。

貴社のますますのご発展を心よりお祈り申し上げます。

[MyCompanyName] 国際事業部`,
        en: `Dear [ClientName],

Greetings!

Our company, [MyCompanyName], is a premier manufacturer in Vietnam specializing in [ProductCategory], offering OEM and ODM manufacturing services to international clients. Knowing [ClientCompany]'s outstanding reputation in the market, we would welcome the opportunity to support your supply chain.

Please find attached our latest product catalog and technical specifications. Should you be interested in any models or have custom requirements, please let us know. We will be glad to provide competitive pricing and samples within 24 hours.

Best regards,

International Sales Department
[MyCompanyName]`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：

我是 [MyCompanyName] 的业务代表。我们主营 [ProductCategory] 的OEM制造，附上最新产品目录供贵司参考。如有任何样品需求或询价，欢迎随时联系！

祝好！
[MyCompanyName]`,
      translations: {
        vi: `Chào [ClientName], tôi là đại diện kinh doanh của [MyCompanyName]. Chúng tôi chuyên sản xuất OEM [ProductCategory], xin gửi kèm catalogue sản phẩm để quý công ty tham khảo. Nếu có nhu cầu gửi mẫu hay hỏi giá, rất mong nhận được liên hệ của bạn! Chúc một ngày tốt lành!`,
        ja: `[ClientName] 様、[MyCompanyName] 営業担当でございます。当社は [ProductCategory] のOEM製造を手掛けており、最新カタログを添付いたしました。お見積りやサンプルのご要望がございましたらお気軽にご連絡ください。`,
        en: `Hello [ClientName], I represent [MyCompanyName]. We specialize in OEM production of [ProductCategory]. Attached is our latest catalog for your reference. Feel free to contact us for pricing or samples!`
      }
    }
  },
  {
    id: 'email_002_inquiry',
    category: 'emails',
    subject: {
      zh: '【询价】关于产品 [ProductCode] 的报价与最小起订量咨询 - [MyCompanyName]',
      vi: '【Hỏi giá】Yêu cầu báo giá và MOQ cho sản phẩm [ProductCode] - [MyCompanyName]',
      ja: '【価格照会】製品 [ProductCode] のお見積りおよび最小ロット（MOQ）について',
      en: 'Inquiry: Price Quote and MOQ for Product [ProductCode] - [MyCompanyName]'
    },
    recipientType: {
      zh: '供应商外贸销售团队',
      vi: 'Đội ngũ bán hàng xuất khẩu của nhà cung cấp',
      ja: 'サプライヤー輸出営業部',
      en: 'Supplier Export Sales Department'
    },
    purpose: {
      zh: '向中国工厂询问特定产品的FOB/CIF价格、包装规格、交期及MOQ。',
      vi: 'Hỏi nhà máy Trung Quốc về giá FOB/CIF, quy cách đóng gói, tiến độ và MOQ.',
      ja: '中国メーカーへ特定品番の見積、包装仕様、納期、MOQを照会。',
      en: 'Inquiring supplier for FOB/CIF quotes, packaging, lead times, and MOQ.'
    },
    placeholders: [
      { key: 'SupplierContact', label: { vi: 'Người liên hệ bên bán', en: 'Supplier Sales Rep', ja: '仕入れ先担当者' }, example: '李经理 (Mr. Li)' },
      { key: 'ProductCode', label: { vi: 'Mã hoặc tên sản phẩm', en: 'Product Code / Name', ja: '製品型番' }, example: 'HL-8820 LED Light' },
      { key: 'TargetQuantity', label: { vi: 'Số lượng dự kiến', en: 'Expected Quantity', ja: '予定発注数量' }, example: '5,000 pcs' },
      { key: 'DestPort', label: { vi: 'Cảng đích', en: 'Destination Port', ja: '仕向港' }, example: 'Hai Phong / Cat Lai Port' }
    ],
    keyPhrases: [
      { zh: '最低起订量', pinyin: 'zuìdī qǐdìng liàng', translations: { vi: 'số lượng đặt tối thiểu (MOQ)', ja: '最小ロット（MOQ）', en: 'Minimum Order Quantity' } },
      { zh: '交货期', pinyin: 'jiāohuò qī', translations: { vi: 'thời hạn giao hàng (lead time)', ja: '納期 / リードタイム', en: 'delivery lead time' } },
      { zh: '有效期限', pinyin: 'yǒuxiào qīxiàn', translations: { vi: 'thời hạn hiệu lực của báo giá', ja: '見積有効期限', en: 'validity period' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [SupplierContact]：

您好！

我们在贵司官网上关注到 [ProductCode] 这款产品，其设计与市场定位非常符合我们近期的采购计划。我们计划的首批采购量约为 [TargetQuantity]。

为推进下一步评估，请协助提供以下信息：
1. 基于 [TargetQuantity] 的 FOB 深圳/宁波美金含税单价；
2. 若安排 CIF [DestPort] 海运，预计每件到岸价格；
3. 该款产品的最低起订量（MOQ）以及包装规格（每箱装箱数、毛重、外箱尺寸）；
4. 收到定金后的常规交货周期及打样时间；
5. 该报价的有效期限。

如能附上产品的高清图片与产品检测报告（CE/RoHS等），将不胜感激。期待您的尽快回复！

顺祝商祺！

[MyCompanyName] 采购部
[MyName] 敬上`,
      translations: {
        vi: `Kính gửi [SupplierContact],

Xin chào!

Chúng tôi nhận thấy sản phẩm [ProductCode] trên website của quý công ty rất phù hợp với kế hoạch thu mua sắp tới của chúng tôi. Dự kiến số lượng đặt đợt đầu vào khoảng [TargetQuantity].

Để tiến hành đánh giá bước tiếp theo, xin vui lòng cung cấp giúp:
1. Đơn giá FOB Thâm Quyến/Ninh Ba (USD) dựa trên số lượng [TargetQuantity];
2. Đơn giá CIF [DestPort] (đường biển);
3. Số lượng đặt tối thiểu (MOQ) và quy cách đóng gói (số lượng/thùng, trọng lượng cả bì, kích thước thùng carton);
4. Thời gian sản xuất tiêu chuẩn sau khi nhận cọc và thời gian làm mẫu;
5. Thời hạn hiệu lực của bảng báo giá.

Nếu có thể gửi kèm ảnh chụp thực tế và chứng chỉ kiểm định (CE/RoHS), chúng tôi vô cùng cảm kích. Rất mong nhận được hồi âm sớm của quý bên!`,
        ja: `[SupplierContact] 様

拝啓　貴社製品 [ProductCode] につきまして、当社の調達計画に非常に合致しており、初回来週発注として [TargetQuantity] を検討しております。

つきましては、下記項目についてお見積りをご教示いただけますでしょうか。
1. [TargetQuantity] 発注時のFOB深圳/寧波（米ドル）単価
2. CIF [DestPort] での概算海上単価
3. 本製品の最小ロット（MOQ）および梱包仕様（入数・総重量・外箱寸法）
4. 手付金受領後の標準納期およびサンプル製作期間
5. 本お見積書の有効期限

実物画像および各種認証証明書（CE/RoHS等）も併せてご送付いただけますと幸甚に存じます。何卒よろしくお願い申し上げます。`,
        en: `Dear [SupplierContact],

Greetings!

We reviewed product [ProductCode] on your website and find it highly suitable for our current purchasing plan. Our projected initial order volume is approximately [TargetQuantity].

Please provide the following details:
1. FOB Shenzhen/Ningbo USD unit price for [TargetQuantity];
2. Estimated CIF [DestPort] sea freight rate;
3. Minimum Order Quantity (MOQ) and packaging specifications (units/carton, GW, carton CBM);
4. Standard production lead time and sample preparation time upon deposit;
5. Validity period of the quote.

We would also appreciate high-resolution photos and test certificates (CE/RoHS). Looking forward to your prompt response!`
      }
    },
    bodyConcise: {
      zh: `[SupplierContact] 您好：
请问 [ProductCode] 订购 [TargetQuantity] 的 FOB 价格是多少？交期多久？MOQ 有何要求？期待您的报价单，谢谢！`,
      translations: {
        vi: `Chào [SupplierContact], xin hỏi giá FOB của mã [ProductCode] cho số lượng [TargetQuantity] là bao nhiêu? Thời gian giao hàng bao lâu và MOQ yêu cầu thế nào? Mong sớm nhận được bảng báo giá của bạn!`,
        ja: `[SupplierContact] 様、[ProductCode] を [TargetQuantity] 発注する場合のFOB単価、納期、MOQをお知らせいただけますでしょうか。お見積りをお待ちしております。`,
        en: `Hi [SupplierContact], could you please share your FOB quote, lead time, and MOQ for [TargetQuantity] units of [ProductCode]? Thanks!`
      }
    }
  },
  {
    id: 'email_003_quotation',
    category: 'emails',
    subject: {
      zh: '【正式报价】关于 [ProductCategory] 的正式报价单及贸易条款 - [MyCompanyName]',
      vi: '【Báo giá chính thức】Bảng báo giá và điều khoản thương mại cho [ProductCategory] - [MyCompanyName]',
      ja: '【御見積送付】[ProductCategory] 正式御見積書のご案内 - [MyCompanyName]',
      en: 'Official Quotation: [ProductCategory] with Commercial Terms - [MyCompanyName]'
    },
    recipientType: {
      zh: '海外采购方',
      vi: 'Bên mua nước ngoài',
      ja: '海外バイヤー',
      en: 'Overseas Buyer'
    },
    purpose: {
      zh: '回复客户询价，提供含价格、装箱量、交期及付款方式的正式报价单。',
      vi: 'Phản hồi yêu cầu hỏi giá của khách, gửi bảng báo giá kèm đầy đủ điều khoản.',
      ja: '価格照会への回答として正式見積書を送付し、取引条件を明示。',
      en: 'Responding to inquiry with comprehensive pricing, packaging, and payment terms.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên khách hàng', en: 'Client Name', ja: '顧客名' }, example: 'Mr. David Smith' },
      { key: 'ProductCategory', label: { vi: 'Tên danh mục hàng', en: 'Item Line', ja: '品名' }, example: 'Industrial Valves' },
      { key: 'ValidityDate', label: { vi: 'Hạn chót của báo giá', en: 'Quote Expiry Date', ja: '有効期限日' }, example: '2026年11月30日' }
    ],
    keyPhrases: [
      { zh: '形式发票', pinyin: 'xíngshì fāpiào', translations: { vi: 'hóa đơn chiếu lệ (P/I)', ja: 'プロフォーマインボイス', en: 'Proforma Invoice' } },
      { zh: '装箱明细', pinyin: 'zhuāngxiāng míngxì', translations: { vi: 'chi tiết đóng thùng', ja: '梱包明細', en: 'packing details' } },
      { zh: '付款方式', pinyin: 'fùkuǎn fāngshì', translations: { vi: 'phương thức thanh toán', ja: '支払条件', en: 'payment terms' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

感谢您对我们 [ProductCategory] 系列产品的关注与询价！

根据您提出的技术要求与采购数量，我们已为您核算出最具竞争力的报价。正式报价单请参见附件 PDF，主要商务条款汇总如下：

1. 价格术语：FOB 上海（美元计价）；
2. 付款方式：30% T/T 预付定金，70% 尾款见提单副本付清；
3. 生产周期：定金到账并确认样品后 25 个工作日内交货；
4. 包装方式：出口标准双瓦楞纸箱加托盘缠膜；
5. 报价有效期：至 [ValidityDate] 止。

如需调整参数或需安排寄送样品，我们非常乐意为您配合。期待能与贵司早日达成合作！

顺祝商祺！

[MyCompanyName] 销售总监`,
      translations: {
        vi: `Kính gửi [ClientName],

Cảm ơn quý khách đã quan tâm và hỏi giá dòng sản phẩm [ProductCategory] của chúng tôi!

Dựa trên yêu cầu kỹ thuật và số lượng đặt hàng, chúng tôi đã tính toán mức giá cạnh tranh nhất. Bảng báo giá chính thức xin xem trong tệp PDF đính kèm, các điều khoản thương mại chính gồm:
1. Điều kiện giá: FOB Thượng Hải (bằng USD);
2. Phương thức thanh toán: 30% cọc T/T, 70% thanh toán nốt khi nhận bản scan B/L;
3. Thời gian sản xuất: trong vòng 25 ngày làm việc sau khi nhận cọc và chốt mẫu;
4. Đóng gói: Thùng carton 5 lớp tiêu chuẩn xuất khẩu có quấn màng pallet;
5. Hiệu lực báo giá: đến hết ngày [ValidityDate].

Rất mong được hợp tác cùng quý công ty!`,
        ja: `[ClientName] 様

この度は当社 [ProductCategory] に関するお問い合わせをいただき、誠にありがとうございます。

ご要望の数量と仕様に基づき、競争力のあるお見積書を作成いたしました（添付PDF）。主要条件は下記の通りです：
1. 貿易条件：FOB上海（米ドル建て）
2. 決済条件：30％前金T/T、残金70％は船荷証券コピー確認後T/T送金
3. 納期：手付金着金およびサンプル承認後25営業日以内
4. 梱包：輸出標準強化ダンボールおよびパレット梱包
5. 見積有効期限：[ValidityDate] まで

ご検討のほど、何卒よろしくお願い申し上げます。`,
        en: `Dear [ClientName],

Thank you for your inquiry regarding our [ProductCategory] products!

Based on your specifications, we have prepared our best quotation (attached as PDF). Key terms:
1. Term: FOB Shanghai (in USD);
2. Payment: 30% T/T deposit, 70% balance against B/L copy;
3. Lead time: 25 working days after deposit and sample confirmation;
4. Packaging: Export standard cartons with pallet shrink-wrap;
5. Validity: Valid through [ValidityDate].

We look forward to doing business with your esteemed company!`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
附件为您所询 [ProductCategory] 的正式报价单（FOB上海，30%预付+70%见提单），报价有效期至 [ValidityDate]。请查收，随时为您解答疑问！`,
      translations: {
        vi: `Chào [ClientName], xin gửi bạn bảng báo giá chính thức cho [ProductCategory] (FOB Thượng Hải, 30% cọc + 70% theo B/L), hiệu lực đến [ValidityDate]. Xin vui lòng xem file đính kèm!`,
        ja: `[ClientName] 様、お問い合わせいただきました製品の御見積書を添付いたしました（FOB上海、有効期限：[ValidityDate]）。ご検討のほどよろしくお願いいたします。`,
        en: `Hello [ClientName], attached is our official quote for [ProductCategory] (FOB Shanghai, 30% deposit + 70% against B/L), valid until [ValidityDate]. Please review!`
      }
    }
  },
  {
    id: 'email_004_po_confirm',
    category: 'emails',
    subject: {
      zh: '【订单确认】已确认采购订单 PO#[PONumber]，附形式发票 PI#[PINumber]',
      vi: '【Xác nhận đơn hàng】Đã tiếp nhận đơn đặt hàng PO#[PONumber], gửi kèm hóa đơn chiếu lệ PI#[PINumber]',
      ja: '【注文受領】発注書 PO#[PONumber] 受領確認および形式送り状 PI#[PINumber] 送付',
      en: 'Order Confirmation: PO#[PONumber] Received & PI#[PINumber] Attached'
    },
    recipientType: {
      zh: '买方采购部',
      vi: 'Phòng mua hàng của bên mua',
      ja: '発注元調達担当者',
      en: 'Buyer Procurement Team'
    },
    purpose: {
      zh: '确认收到客户正式PO，签署并返回形式发票（PI），通知定金汇款事项。',
      vi: 'Xác nhận đã nhận đơn PO chính thức, gửi lại hóa đơn chiếu lệ (PI) và hướng dẫn chuyển tiền cọc.',
      ja: '正式PO受領を連絡し、PIを送付して手付金送金を依頼。',
      en: 'Acknowledging receipt of buyer PO, attaching PI, and requesting deposit transfer.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên khách hàng', en: 'Client Name', ja: '顧客名' }, example: 'Mr. Tanaka' },
      { key: 'PONumber', label: { vi: 'Mã đơn mua hàng', en: 'PO Number', ja: '発注番号' }, example: 'PO-20261028-VN' },
      { key: 'PINumber', label: { vi: 'Số hóa đơn chiếu lệ', en: 'PI Number', ja: '形式送り状番号' }, example: 'PI-2026-904' },
      { key: 'DepositAmount', label: { vi: 'Số tiền đặt cọc (30%)', en: 'Deposit Amount (30%)', ja: '前金金額（30％）' }, example: 'USD 15,000.00' }
    ],
    keyPhrases: [
      { zh: '排单生产', pinyin: 'pái dān shēngchǎn', translations: { vi: 'lên lịch xếp đơn vào dây chuyền sản xuất', ja: '生産ラインへの投入手配', en: 'scheduling production' } },
      { zh: '银行水单', pinyin: 'yínháng shuǐdān', translations: { vi: 'giấy báo có / chứng từ chuyển khoản ngân hàng (Bank slip)', ja: '銀行送金控え / スリップ', en: 'bank remittance slip' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！

非常感谢贵司发来的采购订单 PO#[PONumber]！我们已仔细复核其中的料号、数量及单价，完全确认无误。

附件中附有我司签字盖章的形式发票 PI#[PINumber]，请您查阅并安排签署回传。同时，请根据 PI 上的银行信息安排 30% 定金（金额为 [DepositAmount]）。

收到银行转账水单（Bank Slip）后，我们将第一时间锁定原材料并正式排单生产，预计于定金到账后 30 天内完成验货与发运。

感谢您的信任与支持！

顺祝商祺！

[MyCompanyName] 订单管理部`,
      translations: {
        vi: `Kính gửi [ClientName],

Cảm ơn quý công ty đã gửi đơn đặt hàng chính thức PO#[PONumber]! Chúng tôi đã kiểm tra kỹ mã hàng, số lượng và đơn giá, xác nhận hoàn toàn chính xác.

Trong tệp đính kèm là Hóa đơn chiếu lệ PI#[PINumber] đã có chữ ký và con dấu của công ty chúng tôi. Xin vui lòng ký và gửi lại, đồng thời thu xếp chuyển 30% tiền cọc ([DepositAmount]) theo tài khoản ngân hàng trên PI.

Sau khi nhận được ủy nhiệm chi / biên lai ngân hàng, chúng tôi sẽ ngay lập tức chốt vật tư và đưa vào kế hoạch sản xuất.`,
        ja: `[ClientName] 様

平素は大変お世話になっております。
発注書 PO#[PONumber] を受領いたしました。品目、数量、単価を確認し、正式に受理いたしました。

添付にて当社の署名捺印済みプロフォーマインボイス PI#[PINumber] をお送りいたします。内容をご確認の上、ご署名いただきご返送をお願い申し上げます。また、記載の口座へ前受金30％（[DepositAmount]）のお振込をお願いいたします。

送金控えを受領次第、生産手配を速やかに開始いたします。今後ともよろしくお願い申し上げます。`,
        en: `Dear [ClientName],

Thank you for your purchase order PO#[PONumber]! We have verified all part numbers, quantities, and prices, and confirm full acceptance.

Attached is our signed and stamped Proforma Invoice PI#[PINumber]. Please countersign and return a copy, and arrange the 30% deposit of [DepositAmount] as per bank details.

Upon receipt of the bank remittance slip, we will immediately schedule production. Thank you for your business!`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
PO#[PONumber] 已确认！附上盖章 PI#[PINumber]，请查收并安排定金 [DepositAmount]。水单收到后立即排产，谢谢！`,
      translations: {
        vi: `Chào [ClientName], đơn hàng PO#[PONumber] đã được chốt! Xin gửi PI#[PINumber] có dấu, bạn thu xếp chuyển cọc [DepositAmount] nhé. Nhận ủy nhiệm chi là xưởng vào sản xuất ngay!`,
        ja: `[ClientName] 様、PO#[PONumber] を受領いたしました。捺印済みのPI#[PINumber]を添付いたしますので、前金 [DepositAmount] のお手配をお願いいたします。`,
        en: `Hello [ClientName], PO#[PONumber] is confirmed! Attached is stamped PI#[PINumber]. Please arrange deposit [DepositAmount]; production begins upon receipt of slip!`
      }
    }
  },
  {
    id: 'email_005_shipping_advice',
    category: 'emails',
    subject: {
      zh: '【发货通知】订单 PO#[PONumber] 已按期出运，附提单与装箱单据',
      vi: '【Thông báo xuất hàng】Đơn hàng PO#[PONumber] đã xuất bến đúng hạn, gửi kèm B/L và chứng từ',
      ja: '【船積案内】発注分 PO#[PONumber] 出荷完了および船積書類（B/L・梱包明細）送付',
      en: 'Shipping Advice: PO#[PONumber] Dispatched on Schedule - B/L Attached'
    },
    recipientType: {
      zh: '买方物流与跟单团队',
      vi: 'Bộ phận logistics và theo dõi đơn của bên mua',
      ja: '輸入者側貿易・物流担当者',
      en: 'Buyer Logistics and Operations Team'
    },
    purpose: {
      zh: '告知货物已装船离港，提供船名航次、提单号、预计到达时间（ETA）及清关单据预告。',
      vi: 'Thông báo hàng đã bốc lên tàu, cung cấp tên tàu, số vận đơn B/L, ngày đến dự kiến (ETA) và bộ chứng từ.',
      ja: '本船出港、B/L番号、ETA（到着予定日）を連絡し、通関用書類を提供。',
      en: 'Informing buyer of cargo departure, vessel/voyage, B/L number, ETA, and docs.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên người nhận', en: 'Recipient Name', ja: '受取人名' }, example: 'Ms. Emily Watson' },
      { key: 'PONumber', label: { vi: 'Số đơn hàng', en: 'PO Number', ja: '発注番号' }, example: 'PO-9821' },
      { key: 'VesselName', label: { vi: 'Tên tàu và số chuyến', en: 'Vessel & Voyage', ja: '本船名・航次' }, example: 'WAN HAI 315 V.S022' },
      { key: 'BLNumber', label: { vi: 'Số vận đơn B/L', en: 'B/L Number', ja: 'B/L番号' }, example: 'WHL09283719' },
      { key: 'ETA', label: { vi: 'Ngày đến dự kiến', en: 'Estimated Arrival (ETA)', ja: '到着予定日（ETA）' }, example: '2026-11-12' }
    ],
    keyPhrases: [
      { zh: '预计到达时间', pinyin: 'yùjì dàodá shíjiān', translations: { vi: 'thời gian đến dự kiến (ETA)', ja: '到着予定日（ETA）', en: 'Estimated Time of Arrival (ETA)' } },
      { zh: '清关单据', pinyin: 'qīngguān dānjù', translations: { vi: 'bộ chứng từ thông quan', ja: '通関用船積書類', en: 'clearance shipping documents' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！

很高兴通知您，贵司采购的订单 PO#[PONumber] 已顺利完成生产与出入境检验，并于昨日在胡志明市卡莱港装船起运。

航运具体信息如下：
- 承运船舶：[VesselName]
- 海运提单号：[BLNumber]
- 预计抵港时间（ETA）：[ETA]
- 柜号及封条号请见装箱单

附件中包含商业发票（Invoice）、装箱单（Packing List）以及提单复印件（Non-negotiable B/L Copy）。原产地证书（Form E）正在海关核发中，办结后我们将一并通过顺丰/DHL快递正本或电放给您。

请核对单据并提前做好目的港清关准备。

顺祝商祺！

[MyCompanyName] 国际物流部`,
      translations: {
        vi: `Kính gửi [ClientName],

Rất vui mừng được thông báo đơn hàng PO#[PONumber] của quý khách đã hoàn tất sản xuất, kiểm nghiệm và bốc lên tàu tại cảng Cát Lái hôm qua.

Thông tin tàu như sau:
- Tên tàu / chuyến: [VesselName]
- Số vận đơn đường biển B/L: [BLNumber]
- Ngày dự kiến đến cảng (ETA): [ETA]

Tệp đính kèm gồm Hóa đơn (CI), Phiếu đóng gói (PL) và Bản copy B/L. Giấy chứng nhận xuất xứ Form E đang được cấp, xong chúng tôi sẽ gửi phát chuyển nhanh bản gốc hoặc làm điện giao hàng cho quý vị.`,
        ja: `[ClientName] 様

拝啓　ご注文の PO#[PONumber] につきまして、無事に製造および輸出検品を終え、昨日カトライ港にて本船へ積み込み出港いたしました。

輸送詳細は下記の通りです：
- 本船名 / 航次：[VesselName]
- 船荷証券（B/L）番号：[BLNumber]
- 仕向港到着予定日（ETA）：[ETA]

添付にて商業インボイス、パッキングリスト、B/Lコピーをお送りいたします。原産地証明書（Form E）は発行手続き中であり、完了次第追って送付いたします。仕向港での通関準備にお役立てください。`,
        en: `Dear [ClientName],

We are pleased to inform you that your order PO#[PONumber] was loaded and departed from Cat Lai Port yesterday.

Shipping Details:
- Vessel / Voyage: [VesselName]
- Ocean B/L No.: [BLNumber]
- Estimated Arrival (ETA): [ETA]

Attached are Commercial Invoice, Packing List, and non-negotiable B/L copy. Form E C/O is currently in processing. Please prepare for destination customs clearance!`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
订单 PO#[PONumber] 已发运！船名航次 [VesselName]，提单号 [BLNumber]，预计 [ETA] 抵港。附件为发票、装箱单及提单副本，请查收！`,
      translations: {
        vi: `Chào [ClientName], đơn hàng PO#[PONumber] đã xuất bến! Tàu [VesselName], số B/L [BLNumber], dự kiến đến ngày [ETA]. File đính kèm là hóa đơn, packing list và B/L, xin mời kiểm tra!`,
        ja: `[ClientName] 様、PO#[PONumber] が出港いたしました。船名 [VesselName]、B/L番号 [BLNumber]、ETAは [ETA] です。添付の書類をご確認ください。`,
        en: `Hi [ClientName], PO#[PONumber] has been shipped! Vessel: [VesselName], B/L: [BLNumber], ETA: [ETA]. Invoice, packing list and B/L copy attached!`
      }
    }
  },
  {
    id: 'email_006_payment_reminder',
    category: 'emails',
    subject: {
      zh: '【付款提醒】关于发票 #[InvoiceNumber] 尾款支付提醒 - [MyCompanyName]',
      vi: '【Nhắc thanh toán】Nhắc thanh toán khoản tiền còn lại cho hóa đơn #[InvoiceNumber] - [MyCompanyName]',
      ja: '【お支払いのお願い】請求書 #[InvoiceNumber] 残金決済に関するご案内',
      en: 'Payment Reminder: Balance Payment Due for Invoice #[InvoiceNumber]'
    },
    recipientType: {
      zh: '买方财务或采购负责人',
      vi: 'Bộ phận kế toán hoặc thu mua của khách',
      ja: '顧客側経理・財務責任者',
      en: 'Buyer Accounting / Purchasing Lead'
    },
    purpose: {
      zh: '在提单签发后或付款到期日前，礼貌提醒客户支付余款以配合电放提单。',
      vi: 'Lịch sự nhắc đối tác chuyển nốt số tiền còn lại sau khi có B/L để tiến hành điện giao hàng.',
      ja: '期日接近またはB/L発行に伴い、残金の支払いを丁寧に督促。',
      en: 'Polite reminder to settle remaining balance to release original bills of lading.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên người liên hệ', en: 'Client Name', ja: 'ご担当者様名' }, example: 'Mr. Johnathan Lee' },
      { key: 'InvoiceNumber', label: { vi: 'Mã số hóa đơn', en: 'Invoice Number', ja: '請求書番号' }, example: 'INV-2026-8802' },
      { key: 'BalanceAmount', label: { vi: 'Số tiền còn lại', en: 'Outstanding Balance', ja: '未払い残金' }, example: 'USD 32,450.00' },
      { key: 'DueDate', label: { vi: 'Hạn chót thanh toán', en: 'Payment Due Date', ja: '支払期日' }, example: '2026-11-05' }
    ],
    keyPhrases: [
      { zh: '电放提单', pinyin: 'diànfàng tídān', translations: { vi: 'điện giao hàng (Telex Release B/L)', ja: 'テレックス・リリース（サレンダーB/L）', en: 'Telex Release B/L' } },
      { zh: '汇款底单', pinyin: 'huìkuǎn dǐdān', translations: { vi: 'phiếu chuyển tiền / ủy nhiệm chi ngân hàng', ja: '送金控え', en: 'remittance confirmation slip' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！

货物已顺利起运，随信附上船公司出具的海运提单副本（Copy B/L）。

根据双方签署的合同约定，70% 尾款金额计 [BalanceAmount] 应于见提单副本后支付，截止日期为 [DueDate]。请贵司财务部门协助安排汇款，以便我们在抵港前及时为您办理电放提单（Telex Release），避免产生港口滞箱费用。

汇款后烦请将银行汇款水单（Swift Copy）回传本邮箱，非常感谢您的配合！

顺祝商祺！

[MyCompanyName] 财务部`,
      translations: {
        vi: `Kính gửi [ClientName],

Hàng hóa đã được xếp lên tàu vận chuyển, xin gửi kèm bản scan vận đơn đường biển (Copy B/L) do hãng tàu phát hành.

Theo hợp đồng đã ký, 70% số tiền còn lại là [BalanceAmount] sẽ thanh toán sau khi thấy bản B/L copy, hạn chót là [DueDate]. Kính mong quý phòng kế toán thu xếp chuyển khoản để chúng tôi kịp thời làm điện giao hàng (Telex Release) trước khi tàu cập cảng, tránh phát sinh phí lưu bãi.

Chuyển khoản xong xin gửi lại ủy nhiệm chi vào email này. Xin cảm ơn sự phối hợp của quý vị!`,
        ja: `[ClientName] 様

拝啓　貨物は予定通り出港しており、船会社発行のB/Lコピーを添付にてお送りいたします。

契約に基づき、残金70％にあたる [BalanceAmount] のお支払い期日が [DueDate] となっております。本船到着前のテレックス・リリース手続きを円滑に行い、港湾での保管料発生を防ぐため、送金のお手配をお願い申し上げます。

送金完了後、送金控え（Swiftスリップ）をご返信いただけますと幸いです。何卒よろしくお願い申し上げます。`,
        en: `Dear [ClientName],

The goods have departed on schedule; please find attached the shipping line B/L copy.

Per our sales contract, the 70% balance of [BalanceAmount] is due on [DueDate] against copy B/L. Kindly arrange payment so we can issue the Telex Release before vessel arrival and avoid demurrage costs.

Please reply with the bank Swift confirmation slip once sent. Thank you for your cooperation!`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
附上本批货物的提单副本。请协助安排尾款 [BalanceAmount]，以便我司及时办理电放提单。款项汇出后烦请提供水单，谢谢！`,
      translations: {
        vi: `Chào [ClientName], xin gửi bản copy B/L của lô hàng. Bạn giúp thu xếp thanh toán nốt [BalanceAmount] để công ty mình kịp làm điện giao hàng nhé. Chuyển xong gửi mình phiếu chuyển tiền nha, cảm ơn bạn!`,
        ja: `[ClientName] 様、B/Lコピーを添付いたしました。テレックスリリースのため残金 [BalanceAmount] のお手配をお願い申し上げます。送金控えをお待ちしております。`,
        en: `Hi [ClientName], attached is the B/L copy. Please arrange the balance payment of [BalanceAmount] so we can authorize Telex Release promptly. Thank you!`
      }
    }
  },
  {
    id: 'email_007_delay_apology',
    category: 'emails',
    subject: {
      zh: '【重要通知】关于订单 PO#[PONumber] 交期调整及诚挚致歉 - [MyCompanyName]',
      vi: '【Thông báo quan trọng】Điều chỉnh thời gian giao hàng đơn PO#[PONumber] và xin lỗi chân thành - [MyCompanyName]',
      ja: '【重要】PO#[PONumber] 納期変更のご連絡およびお詫び - [MyCompanyName]',
      en: 'Important Notice: Delivery Schedule Adjustment & Sincere Apology for PO#[PONumber]'
    },
    recipientType: {
      zh: '买方采购总监及业务跟单',
      vi: 'Giám đốc mua hàng và theo dõi đơn bên mua',
      ja: '顧客側調達責任者',
      en: 'Buyer Procurement Director'
    },
    purpose: {
      zh: '因原材料短缺或工厂机器故障等客观原因导致交期延迟时，坦诚向客户说明并提供补救方案。',
      vi: 'Thông báo lý do khách quan dẫn đến chậm giao hàng, xin lỗi chân thành và đưa ra giải pháp khắc phục.',
      ja: '不可抗力や製造トラブルによる納期遅延を速やかに報告し、代替策とお詫びを表明。',
      en: 'Transparently informing client of unavoidable delay, apologizing, and offering solutions.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên người nhận', en: 'Recipient Name', ja: 'お名前' }, example: 'Mr. Kevin Miller' },
      { key: 'PONumber', label: { vi: 'Số đơn hàng', en: 'PO Number', ja: '発注番号' }, example: 'PO-7741' },
      { key: 'DelayReason', label: { vi: 'Lý do chậm trễ', en: 'Reason for Delay', ja: '遅延理由' }, example: '核心芯片供应商品控检测未通过 (upstream IC chip QC failure)' },
      { key: 'NewDeliveryDate', label: { vi: 'Ngày giao mới', en: 'New Delivery Date', ja: '改定後納期' }, example: '2026年11月20日' }
    ],
    keyPhrases: [
      { zh: '深表歉意', pinyin: 'shēn biǎo qiànyì', translations: { vi: 'vô cùng xin lỗi / bày tỏ sự áy náy sâu sắc', ja: '深くお詫び申し上げます', en: 'deepest apologies' } },
      { zh: '补救措施', pinyin: 'bǔjiù cuòshī', translations: { vi: 'biện pháp khắc phục / giải pháp cứu vãn', ja: '救済措置 / リカバリー策', en: 'remedial measures' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！非常抱歉因突发情况给您写信。

关于贵司所下的订单 PO#[PONumber]，原计划于本周完成出货。然而因 [DelayReason]，为保证成品出厂质量绝不妥协，工厂被迫重新进行了批次校准与复检。

经过生产车间全员周末加班赶工，最新的交货日期需调整至 [NewDeliveryDate]。对于此次延误给贵司销售计划带来的不便与影响，我们全体团队深表歉意！

为弥补延误影响，我司决定：
1. 本批次产生的全部港口加急费由我方全额承担；
2. 免费为首批急需货物安排空运先行出运（若贵司需要）。

再次为本次交期调整致以诚挚的歉意，我们将每日向您同步最新生产进度！

[MyCompanyName] 生产与运营总监 敬上`,
      translations: {
        vi: `Kính gửi [ClientName],

Rất lấy làm tiếc phải gửi thư này tới quý khách vì tình huống phát sinh ngoài ý muốn.

Về đơn hàng PO#[PONumber] dự kiến xuất kho tuần này, do [DelayReason], nhằm kiên quyết bảo đảm chất lượng thành phẩm không bị thỏa hiệp, nhà máy đã buộc phải hiệu chuẩn và kiểm định lại toàn bộ lô hàng.

Sau khi tăng ca toàn bộ xưởng sản xuất, ngày giao hàng mới cần dời sang ngày [NewDeliveryDate]. Chúng tôi vô cùng xin lỗi về sự bất tiện ảnh hưởng tới kế hoạch bán hàng của quý công ty!

Để bù đắp, công ty chúng tôi quyết định:
1. Chịu toàn bộ chi phí thông quan hỏa tốc tại cảng;
2. Sẵn sàng hỗ trợ gửi trước một phần hàng gấp qua đường hàng không (nếu quý vị cần gấp).

Một lần nữa xin gửi lời xin lỗi chân thành nhất!`,
        ja: `[ClientName] 様

拝啓　不測の事態によりご迷惑をおかけいたしますことを、深くお詫び申し上げます。

PO#[PONumber] の出荷につきまして、[DelayReason] が発生いたしました。品質第一を担保するため再検査ラインを稼働させております。

全社体制で挽回に努めておりますが、改定納期を [NewDeliveryDate] とさせていただきたく存じます。貴社の販売計画に多大な影響を与えますことを重ねてお詫び申し上げます。

お詫びとリカバリー措置として、港湾特急費用を当社にて全額負担いたします。また、緊急分のみ航空便への無償振替も対応可能です。進捗は毎日ご報告申し上げます。`,
        en: `Dear [ClientName],

We sincerely apologize for writing with unfortunate news regarding order PO#[PONumber].

Due to [DelayReason], in order to maintain our strict quality standards, production was paused for recalibration. Despite overtime efforts, the shipment date must be revised to [NewDeliveryDate].

We deeply apologize for the inconvenience to your sales schedule. To remedy this:
1. We will absorb all express port clearance surcharges;
2. If required, we can airship an urgent batch at our own expense.

We will provide daily progress updates. Thank you for your patience and understanding!`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
非常抱歉！由于 [DelayReason]，订单 PO#[PONumber] 交期需顺延至 [NewDeliveryDate]。我们正在全力抢工，加急费用由我司承担，给您添麻烦了！`,
      translations: {
        vi: `Chào [ClientName], rất xin lỗi bạn! Do [DelayReason], đơn hàng PO#[PONumber] phải lùi ngày giao sang [NewDeliveryDate]. Chúng tôi đang tăng ca hết tốc lực và chịu mọi phí phát sinh, rất mong bạn thông cảm!`,
        ja: `[ClientName] 様、大変申し訳ございません。[DelayReason] によりPO#[PONumber]の納期が [NewDeliveryDate] にずれ込む見通しです。全力で進行中ですので何卒ご容赦ください。`,
        en: `Dear [ClientName], sincere apologies! Due to [DelayReason], delivery for PO#[PONumber] is rescheduled to [NewDeliveryDate]. We are expediting at our cost. Thank you for understanding!`
      }
    }
  },
  {
    id: 'email_008_quality_claim',
    category: 'emails',
    subject: {
      zh: '【质量投诉与索赔】关于集装箱 [ContainerNumber] 到货瑕疵之正式通知与索赔要求',
      vi: '【Khiếu nại chất lượng & Đòi bồi thường】Thông báo chính thức về lỗi hàng container [ContainerNumber]',
      ja: '【品質クレームおよび求償】コンテナ [ContainerNumber] の不具合に関する正式通知',
      en: 'Quality Claim: Formal Notification & Claim for Defective Goods in Container [ContainerNumber]'
    },
    recipientType: {
      zh: '供货商工厂总经理及品质部',
      vi: 'Tổng giám đốc và phòng KCS của nhà máy cung ứng',
      ja: 'サプライヤー品質管理部門・経営陣',
      en: 'Supplier General Manager & QA Team'
    },
    purpose: {
      zh: '在收到货物发现破损、规格不符或批次缺陷时，有据有节提出索赔要求并附上证据链。',
      vi: 'Khiếu nại có cơ sở, kèm ảnh chụp/video và báo cáo giám định đòi nhà máy bồi thường hoặc đổi bù.',
      ja: '貨物不良発生時に証拠を提示し、返金・補償・再送などの是正措置を論理的に要求。',
      en: 'Formal claim presenting photographic/inspection evidence demanding compensation or replacements.'
    },
    placeholders: [
      { key: 'SupplierContact', label: { vi: 'Tên người liên hệ nhà máy', en: 'Supplier Contact', ja: '工場担当者' }, example: '陈总 / 郭经理' },
      { key: 'ContainerNumber', label: { vi: 'Số container bị lỗi', en: 'Container Number', ja: '該当コンテナ番号' }, example: 'TEMU9281720' },
      { key: 'DefectPercentage', label: { vi: 'Tỷ lệ hàng lỗi', en: 'Defect Rate (%)', ja: '不良発生率' }, example: '12.5%' },
      { key: 'ClaimAmount', label: { vi: 'Số tiền đòi bồi thường', en: 'Claim Amount', ja: '求償請求金額' }, example: 'USD 8,400.00' }
    ],
    keyPhrases: [
      { zh: '质检报告', pinyin: 'zhìjiǎn bàogào', translations: { vi: 'báo cáo kiểm định chất lượng', ja: '品質検査報告書', en: 'quality inspection report' } },
      { zh: '冲抵货款', pinyin: 'chòngdǐ huòkuǎn', translations: { vi: 'khấu trừ vào tiền hàng đợt sau', ja: '次回代金相殺', en: 'offset against future invoices' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [SupplierContact]：

您好！

我司于昨日在仓库完成了对集装箱 [ContainerNumber] 的拆箱卸货与进厂抽检。非常遗憾地通知您，这批货物出现了严重的质量问题。

经第三方公证检验机构与我司质检员联合复检，缺陷率高达 [DefectPercentage]。主要问题表现为外壳裂纹及密封条脱落，严重违反了合同约定的技术验收标准。详见附件中的检测报告、高清瑕疵对比照片及拆箱录像。

根据双方采购合同第七条索赔条款，我们正式提出如下解决方案：
1. 贵司直接向我司电汇赔付缺陷损失金额 [ClaimAmount]；或者
2. 该笔款项 [ClaimAmount] 自动冲抵我司下一批新订单的定金，并在下批出货中无偿补齐合格良品。

请贵司质量团队在三个工作日内给予书面确认并答复改进措施。

此致，

[MyCompanyName] 供应链品质总监 谨呈`,
      translations: {
        vi: `Kính gửi [SupplierContact],

Hôm qua chúng tôi đã hoàn thành dỡ hàng container [ContainerNumber] và kiểm định ngẫu nhiên tại kho. Rất tiếc phải thông báo lô hàng này xuất hiện vấn đề chất lượng nghiêm trọng.

Qua kiểm tra của đơn vị giám định độc lập và KCS chúng tôi, tỷ lệ lỗi lên tới [DefectPercentage] (chủ yếu là nứt vỏ và bong gioăng cao su), vi phạm hợp đồng đã thỏa thuận. Hình ảnh, video và báo cáo giám định chi tiết xin xem tệp đính kèm.

Theo điều 7 hợp đồng, chúng tôi đề xuất 2 phương án:
1. Chuyển khoản bồi thường thiệt hại [ClaimAmount]; hoặc
2. Khấu trừ [ClaimAmount] vào tiền cọc đơn hàng tiếp theo và gửi bù số lượng hàng đạt chuẩn vào chuyến sau.

Kính đề nghị quý bên phản hồi bằng văn bản trong vòng 3 ngày làm việc.`,
        ja: `[SupplierContact] 様

昨日コンテナ [ContainerNumber] の開梱および受入検査を実施いたしましたが、誠に遺憾ながら深刻な品質不具合が確認されました。

第三者検品機関による検査の結果、不良率は [DefectPercentage] に達しております（外装クラックおよび密閉シールの剥離）。契約基準を大きく下回っており、検査レポートおよび動画・写真を添付いたします。

契約書第7条に基づき、下記の是正を正式に請求いたします：
1. 不良損害額 [ClaimAmount] の現金返金（T/T送金）、または
2. 次回発注代金からの [ClaimAmount] 相殺および良品の無償補填出荷。

3営業日以内に書面にてご回答くださいますようお願い申し上げます。`,
        en: `Dear [SupplierContact],

Upon unboxing container [ContainerNumber] yesterday, our quality team and an independent surveyor found a defect rate of [DefectPercentage] (housing cracks and seal debonding).

Per Clause 7 of our sales contract, we formally request:
1. Remittance of damages totaling [ClaimAmount]; OR
2. Credit of [ClaimAmount] against our next purchase order and replacement units.

Please review the attached inspection report, photos, and video, and reply within three business days.`
      }
    },
    bodyConcise: {
      zh: `[SupplierContact] 您好：
集装箱 [ContainerNumber] 抽检不良率达 [DefectPercentage]，附上质检报告及瑕疵照片。依合同要求赔付 [ClaimAmount] 或下批扣除，请于3日内回复处理方案！`,
      translations: {
        vi: `Chào [SupplierContact], container [ContainerNumber] kiểm tra lỗi tới [DefectPercentage], có đính kèm ảnh và biên bản kiểm định. Đề nghị bồi thường [ClaimAmount] hoặc trừ đơn sau, mong bạn phản hồi trong 3 ngày!`,
        ja: `[SupplierContact] 様、コンテナ [ContainerNumber] にて不良率 [DefectPercentage] が発生しました。写真と報告書を添付します。[ClaimAmount] の補償について3日以内にご返答ください。`,
        en: `Hi [SupplierContact], inspection of container [ContainerNumber] revealed a [DefectPercentage] defect rate. Report and photos attached. Please confirm claim of [ClaimAmount] within 3 days!`
      }
    }
  },
  {
    id: 'email_009_thank_you_meeting',
    category: 'emails',
    subject: {
      zh: '【感谢信】真诚感谢贵司今日的热情接待与富有成效的会谈 - [MyCompanyName]',
      vi: '【Thư cảm ơn】Chân thành cảm ơn sự đón tiếp nhiệt tình và buổi làm việc hiệu quả của quý công ty hôm nay',
      ja: '【面談の御礼】本日のご面談および工場見学の御礼 - [MyCompanyName]',
      en: 'Thank You for Today\'s Productive Meeting and Warm Hospitality'
    },
    recipientType: {
      zh: '会谈客户或来访嘉宾',
      vi: 'Khách hàng đối tác vừa gặp mặt',
      ja: '商談相手先企業様',
      en: 'Meeting Counterpart / Host'
    },
    purpose: {
      zh: '在商务拜访、广交会展会交谈或工厂考察后24小时内发送，巩固商务互信。',
      vi: 'Gửi trong vòng 24h sau cuộc gặp gỡ, hội chợ Canton Fair hoặc chuyến thăm nhà xưởng để gia tăng gắn kết.',
      ja: '商談や展示会、工場見学後24時間以内に送り、ビジネス関係を深化。',
      en: 'Follow-up within 24 hours of a meeting/factory visit to strengthen relationship.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên đối tác', en: 'Client Name', ja: 'お相手のお名前' }, example: '周总 / 各位领导' },
      { key: 'MeetingTopic', label: { vi: 'Nội dung cuộc họp', en: 'Meeting Subject', ja: '商談テーマ' }, example: '2027年新能源车载充电器联合开发 (2027 EV Charger Joint Development)' }
    ],
    keyPhrases: [
      { zh: '富有成效', pinyin: 'fùyǒu chéngxiào', translations: { vi: 'đạt kết quả tốt đẹp / hiệu quả', ja: '実りある / 有意義な', en: 'fruitful / productive' } },
      { zh: '互利共赢', pinyin: 'hùlì gòngyíng', translations: { vi: 'đôi bên cùng có lợi (win-win)', ja: '互恵共生 / Win-Win', en: 'mutually beneficial / win-win' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！

非常感谢您及团队今天对我们的热情接待！今天的交流非常富有成效，让我们对双方在 [MeetingTopic] 领域的合作前景充满信心。

会议纪要及双方商定的推进时间表正在由我司整理中，明天上午将呈送给您审阅。我们坚信凭借贵司强大的市场网络与我司稳健的制造实力，必能实现互利共赢！

再次感谢您的宝贵时间与盛情款待！

顺祝商祺！

[MyCompanyName] 董事长 携全体团队 谨上`,
      translations: {
        vi: `Kính gửi [ClientName],

Cảm ơn quý vị và đội ngũ đã đón tiếp chúng tôi vô cùng nồng hậu trong ngày hôm nay! Buổi trao đổi diễn ra rất hiệu quả, khiến chúng tôi tràn đầy niềm tin vào triển vọng hợp tác trong dự án [MeetingTopic].

Biên bản cuộc họp và lộ trình tiến độ dự kiến đang được tổng hợp, sáng mai chúng tôi sẽ gửi sang để quý vị rà soát. Tin tưởng rằng sự hợp tác giữa hai bên sẽ mang lại thành công vang dội đôi bên cùng thắng!`,
        ja: `[ClientName] 様

本日はご多忙の折、温かいおもてなしと実りあるご面談の機会をいただき、心より御礼申し上げます。[MeetingTopic] における協業の可能性に大きな手応えを感じております。

議事録および今後のスケジュール案を整理の上、明日午前中にお送りいたします。双方の強みを活かしたWin-Winの提携が実現できることを確信しております。今後ともよろしくお願い申し上げます。`,
        en: `Dear [ClientName],

Thank you and your team for the warm hospitality today. Our discussion regarding [MeetingTopic] was exceptionally productive and gave us immense confidence in our future cooperation.

Meeting minutes and next steps will be forwarded by tomorrow morning. We look forward to a successful win-win partnership!`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
今天拜访收获很大，非常感谢您的接待！会议纪要明天发您，期待与贵司携手推进 [MeetingTopic]！`,
      translations: {
        vi: `Chào [ClientName], buổi gặp mặt hôm nay thật tuyệt vời, cảm ơn sự đón tiếp của bạn! Ngày mai mình gửi biên bản họp nhé, rất mong sớm hợp tác trong [MeetingTopic]!`,
        ja: `[ClientName] 様、本日は誠にありがとうございました。実り多いお話ができ感謝しております。明日議事録をお送りいたします。`,
        en: `Hi [ClientName], thank you for the wonderful meeting today! Meeting minutes will follow tomorrow. Excited to move forward on [MeetingTopic]!`
      }
    }
  },
  {
    id: 'email_010_holiday_schedule',
    category: 'emails',
    subject: {
      zh: '【通知】[MyCompanyName] [HolidayName] 放假安排及出货备货温馨提醒',
      vi: '【Thông báo】Lịch nghỉ lễ [HolidayName] của [MyCompanyName] và nhắc nhở chuẩn bị đơn hàng',
      ja: '【ご案内】[HolidayName] 休暇期間中の営業体制および出荷スケジュールについて',
      en: 'Holiday Notice: [MyCompanyName] [HolidayName] Schedule & Order Planning Reminder'
    },
    recipientType: {
      zh: '所有合作客户及采购商',
      vi: 'Toàn bộ đối tác và nhà thu mua hợp tác',
      ja: '全取引先・バイヤー担当者',
      en: 'All Active Clients and Procurement Partners'
    },
    purpose: {
      zh: '告知节假日停工放假安排，建议客户提前下单锁仓，避免节前工厂爆舱和物流延误。',
      vi: 'Thông báo lịch nghỉ lễ của nhà máy, khuyến nghị khách lên đơn sớm để tránh quá tải đơn hàng và trễ tàu.',
      ja: '連休中の工場稼働停止と物流遅延を考慮し、事前の前倒し発注を促す。',
      en: 'Notifying partners of holiday closures and recommending advance order placement.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên người nhận', en: 'Recipient Name', ja: '受取人名' }, example: 'Dear Partners' },
      { key: 'HolidayName', label: { vi: 'Tên kỳ nghỉ lễ', en: 'Holiday Name', ja: '祝日名' }, example: 'Spring Festival / Tết Nguyên Đán' },
      { key: 'StartDate', label: { vi: 'Ngày bắt đầu nghỉ', en: 'Holiday Start Date', ja: '休暇開始日' }, example: '2026-02-10' },
      { key: 'EndDate', label: { vi: 'Ngày đi làm lại', en: 'Resume Work Date', ja: '営業再開日' }, example: '2026-02-23' },
      { key: 'CutoffDate', label: { vi: 'Hạn chót đặt hàng trước lễ', en: 'Pre-holiday Order Cut-off', ja: '連休前受注締切日' }, example: '2026-01-15' }
    ],
    keyPhrases: [
      { zh: '放假安排', pinyin: 'fàngjià ānpái', translations: { vi: 'lịch nghỉ lễ', ja: '休暇日程・営業予定', en: 'holiday schedule' } },
      { zh: '提前备货', pinyin: 'tíqián bèihuò', translations: { vi: 'chuẩn bị hàng trước', ja: '前倒し手配・事前在庫確保', en: 'prepare stock in advance' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！新春将至，感谢贵司过去一年对我司的信任与大力支持。

为配合物流停运与工厂年休，我司 [HolidayName] 放假时间定于 [StartDate] 至 [EndDate]，[EndDate] 正式恢复正常生产与发货。

为确保贵司供应链稳定，避免节前因船期紧张及运费上涨影响交付，烦请贵司在 [CutoffDate] 前确认近期订单，以便我们为您提前锁定量产舱位。

假期期间如有紧急事项，可随时联系我司值班客服专员。顺祝商祺，生意兴隆！`,
      translations: {
        vi: `Kính gửi [ClientName],

Xin chào quý vị! Ngày lễ đang đến gần, chân thành cảm ơn sự tin tưởng và ủng hộ quý báu của quý công ty dành cho chúng tôi trong suốt năm qua.

Để phối hợp nhịp nhàng với lịch đóng cảng của hãng tàu và kỳ nghỉ của công nhân, lịch nghỉ lễ [HolidayName] của công ty chúng tôi bắt đầu từ ngày [StartDate] đến ngày [EndDate], ngày [EndDate] sẽ chính thức mở cửa sản xuất và xuất hàng trở lại.

Để bảo đảm chuỗi cung ứng của quý công ty hoạt động ổn định, tránh tình trạng kẹt tàu và tăng giá cước trước kỳ nghỉ, kính phiền quý công ty chốt các đơn hàng trước ngày [CutoffDate] để chúng tôi ưu tiên sắp xếp lịch sản xuất và đặt chỗ tàu.

Trong kỳ nghỉ lễ nếu có việc khẩn cấp, xin cứ liên hệ nhân viên trực ban của chúng tôi. Kính chúc quý công ty làm ăn phát tài!`,
        ja: `[ClientName] 様

平素は格別のご高配を賜り厚く御礼申し上げます。

さて、弊社の [HolidayName] 休業期間につきまして、下記の通りご案内申し上げます。
休業期間：[StartDate] 〜 [EndDate]（[EndDate] より通常営業を再開いたします）

連休前後は船腹不足や運賃高騰が予想されますので、貴社のサプライチェーン維持のため、[CutoffDate] までに前倒しでの確定発注をご検討いただけますようお願い申し上げます。期間中の緊急連絡は当直窓口までご連絡ください。`,
        en: `Dear [ClientName],

Season greetings! We sincerely appreciate your valued partnership and support over the past year.

Please be advised that our operations will be closed for [HolidayName] from [StartDate] through [EndDate], resuming full production and dispatch on [EndDate].

To ensure supply chain continuity and avoid severe pre-holiday freight congestion, we kindly request that you finalize upcoming orders prior to [CutoffDate] so we can prioritize production schedules and vessel bookings. Thank you!`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
我司 [HolidayName] 将于 [StartDate] 至 [EndDate] 放假。为免节前物流爆舱，请尽量在 [CutoffDate] 前下达订单，谢谢您的理解与配合！`,
      translations: {
        vi: `Chào [ClientName], xưởng mình sẽ nghỉ lễ [HolidayName] từ [StartDate] đến [EndDate]. Để tránh cháy kho và lỡ chuyến trước lễ, bạn thu xếp lên đơn trước ngày [CutoffDate] nhé, cảm ơn bạn nhiều!`,
        ja: `[ClientName] 様、[StartDate] 〜 [EndDate] は連休休業となります。連休前の混雑を回避するため、[CutoffDate] までの早期発注にご協力いただけますと幸いです。`,
        en: `Hello [ClientName], our office will close for [HolidayName] from [StartDate] to [EndDate]. Please finalize urgent orders before [CutoffDate] to avoid peak congestion. Thank you!`
      }
    }
  },
  {
    id: 'email_011_price_adjustment_notice',
    category: 'emails',
    subject: {
      zh: '【重要通知】关于近期原材料成本上涨导致部分产品价格调整的说明',
      vi: '【Thông báo quan trọng】Về việc điều chỉnh đơn giá một số sản phẩm do chi phí nguyên vật liệu tăng',
      ja: '【重要】原材料価格高騰に伴う一部製品価格改定のご案内',
      en: 'Notice of Price Adjustment Due to Surging Raw Material Costs'
    },
    recipientType: {
      zh: '所有合作采购商及分销商',
      vi: 'Toàn bộ đối tác thu mua và nhà phân phối',
      ja: 'お取引先様各位',
      en: 'All Purchasing Counterparties and Distributors'
    },
    purpose: {
      zh: '解释由于铜/芯片/运费等上游成本上涨，被迫微调产品价格，并给出缓冲期允许按原价下单。',
      vi: 'Giải thích nguyên nhân giá nguyên vật liệu đầu vào tăng dẫn đến phải điều chỉnh giá bán, đưa ra thời gian ân hạn để khách đặt trước theo giá cũ.',
      ja: '原材料高騰の背景を丁寧に説明し、猶予期間（駆け込み発注可能期日）を設けて顧客の理解を得る。',
      en: 'Diplomatically explaining necessary price adjustments while offering a grace window at existing rates.'
    },
    placeholders: [
      { key: 'ClientName', label: { vi: 'Tên người nhận', en: 'Recipient Name', ja: '受取人名' }, example: 'Mr. David Lee' },
      { key: 'MaterialType', label: { vi: 'Loại nguyên vật liệu tăng giá', en: 'Raw Material Type', ja: '高騰原材料名' }, example: 'Copper and semiconductor ICs' },
      { key: 'IncreasePercentage', label: { vi: 'Tỷ lệ tăng giá (%)', en: 'Price Adjustment %', ja: '値上げ改定率' }, example: '5% - 8%' },
      { key: 'EffectiveDate', label: { vi: 'Ngày bắt đầu áp dụng giá mới', en: 'New Price Effective Date', ja: '新価格適用開始日' }, example: '2026-12-01' },
      { key: 'GraceDeadline', label: { vi: 'Hạn cuối đặt hàng theo giá cũ', en: 'Old Price Grace Deadline', ja: '旧価格適用最終締切日' }, example: '2026-11-20' }
    ],
    keyPhrases: [
      { zh: '价格调整', pinyin: 'jiàgé tiáozhěng', translations: { vi: 'điều chỉnh giá cả', ja: '価格改定', en: 'price adjustment' } },
      { zh: '深表歉意', pinyin: 'shēn biǎo qiànyì', translations: { vi: 'vô cùng xin lỗi', ja: '深くお詫び申し上げる', en: 'sincerely apologize' } }
    ],
    bodyFormal: {
      zh: `尊敬的 [ClientName]：

您好！非常感谢贵司长期以来对我司产品品质的信赖。

近期，受国际大宗供应链波动影响，上游核心原材料（[MaterialType]）采购成本持续大幅攀升。我司虽通过内部精细化管理竭力消化成本，但目前的市场价格已超出我们的承受极限。

为确保产品品质与供货稳定性不打折扣，经审慎评估，我司决定自 [EffectiveDate] 起，对相关系列产品价格进行适度上调（涨幅约为 [IncreasePercentage]）。

为感谢贵司的长久支持并尽量减轻贵司的采购压力，凡在 [GraceDeadline] 之前确认并支付定金的正式订单，我司承诺将一律继续执行原有优惠价格。

由此给贵司预算安排带来的不便，我们深表歉意，敬请谅解！随信附上最新价格清单。`,
      translations: {
        vi: `Kính gửi [ClientName],

Xin chào quý vị! Chân thành cảm ơn sự tin tưởng và ủng hộ bền bỉ của quý công ty dành cho sản phẩm của chúng tôi.

Thời gian gần đây, do biến động mạnh trên thị trường quốc tế, chi phí nguyên vật liệu đầu vào cốt lõi ([MaterialType]) đã tăng phi mã. Dù công ty chúng tôi đã nỗ lực tối ưu hóa chi phí nội bộ nhưng mức giá hiện tại đã chạm ngưỡng chịu đựng của dây chuyền sản xuất.

Để bảo đảm chất lượng thành phẩm đạt chuẩn cao và duy trì nguồn cung ổn định, sau khi cân nhắc kỹ lưỡng, chúng tôi xin thông báo sẽ điều chỉnh tăng nhẹ đơn giá khoảng [IncreasePercentage] đối với các dòng sản phẩm liên quan kể từ ngày [EffectiveDate].

Nhằm tri ân sự ủng hộ của quý công ty và giảm thiểu áp lực chi phí, tất cả các đơn hàng chính thức được xác nhận và chuyển tiền cọc trước ngày [GraceDeadline] sẽ được chúng tôi cam kết giữ nguyên theo mức giá cũ hiện tại.

Rất mong nhận được sự thông cảm sâu sắc từ quý công ty đối với những bất tiện phát sinh này. Đính kèm thư là bảng giá điều chỉnh chi tiết.`,
        ja: `[ClientName] 様

平素は格別のご愛顧を賜り心より御礼申し上げます。

さて、昨今の世界的な原材料相場の高騰に伴い、主要部材（[MaterialType]）の調達コストが急激に上昇しております。弊社といたしましても諸経費の削減に努めてまいりましたが、自社努力のみでは吸収困難な状況に至りました。

つきましては、製品品質の維持と安定供給を継続するため、誠に心苦しい限りではございますが、[EffectiveDate] 受注分より約 [IncreasePercentage] の価格改定を実施させていただく運びとなりました。

なお、長年のお取引への感謝といたしまして、[GraceDeadline] までに確定いただいたご注文につきましては、従来価格にて対応させていただきます。何卒諸事情をご賢察の上、ご理解を賜りますようお願い申し上げます。`,
        en: `Dear [ClientName],

Thank you sincerely for your ongoing trust in our products and manufacturing standards.

Recently, global market surges have dramatically escalated upstream costs for core raw materials ([MaterialType]). Although we have absorbed cost pressures through internal optimizations, current price levels have surpassed sustainable thresholds.

To uphold our strict quality benchmarks and uninterrupted supply stability, we must implement a modest price adjustment of approximately [IncreasePercentage] effective [EffectiveDate].

As a token of our valued partnership, all formal purchase orders confirmed with deposits prior to [GraceDeadline] will be honored at current pricing. We apologize for any budgetary inconvenience and appreciate your kind understanding.`
      }
    },
    bodyConcise: {
      zh: `[ClientName] 您好：
因近期 [MaterialType] 原材料价格大幅上涨，我司产品将于 [EffectiveDate] 起上调 [IncreasePercentage]。[GraceDeadline] 前下单仍按老价格执行，附最新报价单，请查阅！`,
      translations: {
        vi: `Chào [ClientName], do giá [MaterialType] đợt này tăng cao, công ty mình sẽ điều chỉnh tăng [IncreasePercentage] từ ngày [EffectiveDate]. Trước ngày [GraceDeadline] chốt đơn vẫn giữ giá cũ nhé. Gửi bạn bảng giá mới đính kèm!`,
        ja: `[ClientName] 様、[MaterialType] の高騰に伴い、[EffectiveDate] より [IncreasePercentage] の価格改定を実施いたします。[GraceDeadline] までの発注は旧価格を適用いたします。`,
        en: `Hi [ClientName], due to surging [MaterialType] costs, prices will adjust by [IncreasePercentage] on [EffectiveDate]. Orders placed before [GraceDeadline] will enjoy current rates. Price list attached!`
      }
    }
  }
];
