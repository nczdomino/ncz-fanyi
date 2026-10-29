/**
 * tools/business-vocab-3.js
 * Vocabulary for Categories:
 * 9. logistics (物流与供应链)
 * 10. finance (财务与结算)
 * 11. aftersales (售后与索赔)
 * 12. scenarios (情景练习核心词)
 */

module.exports = [
  // --- 9. LOGISTICS (物流与供应链) ---
  {
    id: 'bc_log_001',
    term: '货代',
    pinyin: 'huòdài',
    partOfSpeech: 'noun',
    category: 'logistics',
    level: 'beginner',
    tags: ['forwarder', 'shipping', 'agent'],
    translations: {
      vi: { meaning: 'Đại lý giao nhận vận tải (viết tắt của 货运代理 - Freight Forwarder)', note: 'Đơn vị trung gian sắp xếp đặt chỗ tàu, bay, hải quan cho hàng hóa.' },
      ja: { meaning: 'フォワーダー / 貨物利用運送事業者', note: '荷主と輸送機関の間で国際輸送の手配を請け負う業者。' },
      en: { meaning: 'Freight Forwarder (abbreviation of 货运代理)', note: 'Intermediary organizing shipments for individuals or corporations.' }
    },
    examples: [
      {
        zh: '买家指定了他们自己在上海的合作货代负责订舱。',
        pinyin: 'Mǎijiā zhǐdìng le tāmen zìjǐ zài Shànghǎi de hézuò huòdài fùzé dìngcāng.',
        translations: {
          vi: 'Người mua đã chỉ định đại lý logistics riêng của họ tại Thượng Hải phụ trách việc đặt chỗ tàu (Booking).',
          ja: 'バイヤー側が指定した上海のフォワーダーが船積みのブッキングを担当します。',
          en: 'The buyer nominated their own freight forwarder in Shanghai to handle booking.'
        }
      }
    ]
  },
  {
    id: 'bc_log_002',
    term: '集装箱',
    pinyin: 'jízhuāngxiāng',
    partOfSpeech: 'noun',
    category: 'logistics',
    level: 'beginner',
    tags: ['container', 'shipping', 'box'],
    translations: {
      vi: { meaning: 'Container / công-ten-nơ (khẩu ngữ thường gọi là 柜子 - guìzi)', note: 'Quy cách phổ biến: 20GP (20 feet), 40GP (40 feet), 40HQ (40 feet cao).' },
      ja: { meaning: 'コンテナ', note: '海上輸送の標準輸送容器（20フィート、40フィート等）。' },
      en: { meaning: 'Shipping Container (colloquially called 柜子)', note: 'Standard intermodal freight container (20ft, 40ft, 40HQ).' }
    },
    examples: [
      {
        zh: '这批货物体积大约为65立方米，刚好可以装满一个40尺高柜。',
        pinyin: 'Zhè pī huòwù tǐjī dàyuē wéi liùshíwǔ lìfāngmǐ, gānghǎo kěyǐ zhuāng mǎn yí gè sìshí chǐ gāoguì.',
        translations: {
          vi: 'Thể tích lô hàng này khoảng 65 mét khối (CBM), vừa vặn đóng đầy một container 40 feet cao (40HQ).',
          ja: 'この貨物の総体積は約65CBMで、40フィートハイキューブコンテナ（40HQ）1本にちょうど収まります。',
          en: 'The cargo volume is about 65 CBM, which exactly fills one 40HQ container.'
        }
      }
    ]
  },
  {
    id: 'bc_log_003',
    term: '整箱',
    pinyin: 'zhěng xiāng',
    partOfSpeech: 'noun',
    category: 'logistics',
    level: 'intermediate',
    tags: ['fcl', 'container', 'shipping'],
    translations: {
      vi: { meaning: 'Hàng nguyên container (FCL - Full Container Load)', note: 'Một chủ hàng thuê trọn một hoặc nhiều container.' },
      ja: { meaning: 'コンテナ満載貨物（FCL / Full Container Load）', note: '1社の荷主でコンテナを1本まるごと仕立てる輸送形態。' },
      en: { meaning: 'Full Container Load (FCL)', note: 'Shipment occupying an entire container.' }
    },
    examples: [
      {
        zh: '相比拼箱，整箱运输的速度更快，并且货损风险更低。',
        pinyin: 'Xiāngbǐ pīnxiāng, zhěngxiāng yùnshū de sùdù gèng kuài, bìngqiě huòsǔn fēngxiǎn gèng dī.',
        translations: {
          vi: 'So với hàng ghép (LCL), vận chuyển nguyên container (FCL) có tốc độ nhanh hơn và rủi ro hư hỏng hàng thấp hơn.',
          ja: '混載便（LCL）に比べて、FCL便は輸送日数が短く貨物の破損リスクも軽減されます。',
          en: 'Compared to LCL, FCL shipping is faster with lower risk of damage.'
        }
      }
    ]
  },
  {
    id: 'bc_log_004',
    term: '拼箱',
    pinyin: 'pīn xiāng',
    partOfSpeech: 'noun',
    category: 'logistics',
    level: 'intermediate',
    tags: ['lcl', 'consolidation', 'shipping'],
    translations: {
      vi: { meaning: 'Hàng lẻ ghép container (LCL - Less than Container Load)', note: 'Nhiều chủ hàng gửi chung trong một container khi số lượng ít không đủ một công.' },
      ja: { meaning: '混載貨物（LCL / Less than Container Load）', note: '少量の貨物を他の荷主の荷物とひとつのコンテナに混載して輸送すること。' },
      en: { meaning: 'Less than Container Load (LCL / consolidation)', note: 'Multiple shippers sharing one container.' }
    },
    examples: [
      {
        zh: '由于订购数量只有五个立方，建议走海运拼箱比较划算。',
        pinyin: 'Yóuyú dìnggòu shùliàng zhǐyǒu wǔ gè lìfāng, jiànyì zǒu hǎiyùn pīnxiāng bǐjiào huásuàn.',
        translations: {
          vi: 'Do số lượng đặt hàng chỉ có 5 khối (CBM), nên đi hàng lẻ ghép container (LCL) sẽ tiết kiệm chi phí hơn.',
          ja: '発注量がわずか5CBMですので、海上混載便（LCL）をご利用いただく方がコストパフォーマンスに優れています。',
          en: 'Since the order is only 5 CBM, shipping via ocean LCL is more cost-effective.'
        }
      }
    ]
  },
  {
    id: 'bc_log_005',
    term: '延误',
    pinyin: 'yánwù',
    partOfSpeech: 'verb',
    category: 'logistics',
    level: 'beginner',
    tags: ['delay', 'schedule', 'shipping'],
    translations: {
      vi: { meaning: 'Chậm trễ / trễ hạn / hoãn lịch (tàu, bay, giao hàng)', note: 'Rất hay gặp do bão gió, tắc nghẽn cảng hoặc hải quan giữ hàng.' },
      ja: { meaning: '遅延する / 遅れる', note: '悪天候や港湾混雑等により輸送日程が遅れること。' },
      en: { meaning: 'to delay / shipment delay', note: 'Shipping or delivery lagging behind schedule.' }
    },
    examples: [
      {
        zh: '受台风天气影响，原定周三出港的班轮预计延误三天。',
        pinyin: 'Shòu táifēng tiānqì yǐngxiǎng, yuándìng zhōusān chūgǎng de bānlún yùjì yánwù sān tiān.',
        translations: {
          vi: 'Do ảnh hưởng của thời tiết bão, chuyến tàu định kỳ dự kiến rời cảng vào thứ Tư sẽ bị chậm trễ khoảng 3 ngày.',
          ja: '台風の影響により、水曜日出港予定の定期船は3日間の遅延が見込まれます。',
          en: 'Due to typhoon conditions, the vessel scheduled for Wednesday is expected to be delayed by three days.'
        }
      }
    ]
  },

  // --- 10. FINANCE (财务与结算) ---
  {
    id: 'bc_fin_001',
    term: '电汇',
    pinyin: 'diànhuì',
    partOfSpeech: 'noun',
    category: 'finance',
    level: 'beginner',
    tags: ['t-t', 'telegraphic-transfer', 'payment'],
    translations: {
      vi: { meaning: 'Chuyển tiền bằng điện tín (T/T - Telegraphic Transfer / Wire Transfer)', note: 'Phương thức thanh toán quốc tế phổ biến nhất hiện nay qua hệ thống ngân hàng SWIFT.' },
      ja: { meaning: '電信送金（T/T送金 / Telegraphic Transfer）', note: '国際銀行間送金（SWIFT）を利用する最も一般的な決済方法。' },
      en: { meaning: 'Telegraphic Transfer (T/T / Wire Transfer)', note: 'Bank transfer via SWIFT system, dominant in trade.' }
    },
    examples: [
      {
        zh: '我们的付款条款通常是：30%定金电汇，70%尾款凭提单副本电汇付清。',
        pinyin: 'Wǒmen de fùkuǎn tiáokuǎn tōngcháng shì: sānshí bǎifēnzhī dìngjīn diànhuì, qīshí bǎifēnzhī wěikuǎn píng tídān fùběn diànhuì fù qīng.',
        translations: {
          vi: 'Điều khoản thanh toán của chúng tôi thường là: 30% tiền cọc chuyển khoản T/T, 70% còn lại thanh toán T/T sau khi gửi bản copy vận đơn (B/L).',
          ja: '当社の通常支払条件は「30％手付金T/T、残金70％はB/Lコピー提示時にT/T送金」となっております。',
          en: 'Our standard terms are 30% deposit by T/T, and 70% balance by T/T against B/L copy.'
        }
      }
    ],
    businessTip: {
      vi: 'Điều khoản "30% T/T deposit + 70% balance against copy B/L" là quy chuẩn an toàn phổ biến nhất trong thương mại song phương Việt - Trung.',
      ja: '「30%前金＋70%船積書類コピー確認後送金」は日中・越中貿易で最も広く採用される安全な決済方式です。',
      en: '"30% deposit + 70% against B/L copy" is the golden standard payment term in cross-border trade.'
    }
  },
  {
    id: 'bc_fin_002',
    term: '信用证',
    pinyin: 'xìnyòng zhèng',
    partOfSpeech: 'noun',
    category: 'finance',
    level: 'intermediate',
    tags: ['l-c', 'letter-of-credit', 'bank-guarantee'],
    translations: {
      vi: { meaning: 'Thư tín dụng (L/C - Letter of Credit)', note: 'Cam kết thanh toán có điều kiện của ngân hàng mở cho người thụ hưởng khi nộp đủ bộ chứng từ hợp lệ.' },
      ja: { meaning: '信用状（L/C / Letter of Credit）', note: '輸入者の取引銀行が発行する条件付きの支払確約書。' },
      en: { meaning: 'Letter of Credit (L/C)', note: 'Bank payment guarantee against conforming documents.' }
    },
    examples: [
      {
        zh: '由于本次订单总额较大，双方同意采用不可撤销即期信用证结算。',
        pinyin: 'Yóuyú běn cì dìngdān zǒng\'é jiào dà, shuāngfāng tóngyì cǎiyòng bùkě chèxiāo jíqī xìnyòngzhèng jiésuàn.',
        translations: {
          vi: 'Do tổng giá trị đơn hàng lần này khá lớn, hai bên nhất trí thanh toán bằng Thư tín dụng không hủy ngang trả ngay (Irrevocable L/C at sight).',
          ja: '今回の発注額が多額であるため、双方は取消不能一覧払信用状（Irrevocable L/C at sight）での決済に合意しました。',
          en: 'Due to the large order volume, both parties agreed to settle via Irrevocable Letter of Credit at sight.'
        }
      }
    ]
  },
  {
    id: 'bc_fin_003',
    term: '定金',
    pinyin: 'dìngjīn',
    partOfSpeech: 'noun',
    category: 'finance',
    level: 'beginner',
    tags: ['deposit', 'advance', 'down-payment'],
    translations: {
      vi: { meaning: 'Tiền đặt cọc / tiền bảo đảm thực hiện hợp đồng', note: 'Thường từ 20% - 50% tổng giá trị để nhà máy mua vật tư và lên khuôn sản xuất.' },
      ja: { meaning: '手付金 / 頭金 / 内金（デポジット）', note: '生産着手前に買い手が支払う証拠金。' },
      en: { meaning: 'deposit / down payment', note: 'Advance funds paid prior to production.' }
    },
    examples: [
      {
        zh: '工厂必须在收到买方定金后，才能开始订购原材料。',
        pinyin: 'Gōngchǎng bìxū zài shōudào mǎifāng dìngjīn hòu, cáinéng kāishǐ dìnggòu yuáncáiliào.',
        translations: {
          vi: 'Nhà máy bắt buộc phải nhận được tiền đặt cọc của người mua thì mới có thể bắt đầu đặt mua nguyên vật liệu.',
          ja: '工場はバイヤーからの手付金の着金を確認してから、原材料の手配を開始します。',
          en: 'The factory will only begin procuring raw materials once the buyer\'s deposit is received.'
        }
      }
    ]
  },
  {
    id: 'bc_fin_004',
    term: '尾款',
    pinyin: 'wěikuǎn',
    partOfSpeech: 'noun',
    category: 'finance',
    level: 'beginner',
    tags: ['balance', 'payment', 'final'],
    translations: {
      vi: { meaning: 'Khoản thanh toán còn lại / tiền đuôi (Balance payment)', note: 'Số tiền thanh toán nốt sau khi trừ đi khoản đặt cọc.' },
      ja: { meaning: '残金 / 残高', note: '手付金を差し引いた残りの決済代金。' },
      en: { meaning: 'balance payment / remaining balance', note: 'Remaining amount due after deducting initial deposit.' }
    },
    examples: [
      {
        zh: '请在见提单复印件后的三个工作日内安排支付尾款。',
        pinyin: 'Qǐng zài jiàn tídān fùyìnjiàn hòu de sān gè gōngzuòrì nèi ānpái zhīfù wěikuǎn.',
        translations: {
          vi: 'Xin vui lòng thu xếp thanh toán khoản tiền còn lại trong vòng 3 ngày làm việc sau khi nhìn thấy bản sao vận đơn.',
          ja: 'B/Lコピーの受領後、3営業日以内に残金のお支払いをお手配ください。',
          en: 'Please arrange to pay the remaining balance within three working days after receiving the B/L copy.'
        }
      }
    ]
  },
  {
    id: 'bc_fin_005',
    term: '账期',
    pinyin: 'zhàngqī',
    partOfSpeech: 'noun',
    category: 'finance',
    level: 'intermediate',
    tags: ['credit-term', 'credit-period', 'finance'],
    translations: {
      vi: { meaning: 'Thời hạn công nợ / kỳ hạn thanh toán (Credit period)', note: 'Ví dụ: OA 30天 (Open Account 30 days - công nợ 30 ngày sau khi nhận hàng).' },
      ja: { meaning: '支払サイト / 売掛期間 / クレジット期間', note: '商品納品から代金決済期日までの猶予期間（例：月末締め翌月末払い）。' },
      en: { meaning: 'credit term / credit period (e.g. Net 30, Net 60)', note: 'Time allowed between invoice/delivery and payment.' }
    },
    examples: [
      {
        zh: '新客户首年合作通常不做账期，老客户可以申请30天账期。',
        pinyin: 'Xīn kèhù shǒunián hézuò tōngcháng bú zuò zhàngqī, lǎo kèhù kěyǐ shēnqǐng sānshí tiān zhàngqī.',
        translations: {
          vi: 'Khách hàng mới năm đầu hợp tác thông thường không áp dụng công nợ, khách hàng thân thiết có thể xin công nợ 30 ngày.',
          ja: '新規のお客様とは初年度は原則掛け売り（支払サイト）を行いませんが、既存の優良顧客には30日のサイトを適用可能です。',
          en: 'New clients are generally not granted credit terms in the first year; established clients may apply for 30-day terms.'
        }
      }
    ]
  },

  // --- 11. AFTERSALES (售后与索赔) ---
  {
    id: 'bc_after_001',
    term: '质量问题',
    pinyin: 'zhìliàng wèntí',
    partOfSpeech: 'noun',
    category: 'aftersales',
    level: 'beginner',
    tags: ['quality', 'defect', 'issue'],
    translations: {
      vi: { meaning: 'Vấn đề chất lượng / sự cố chất lượng sản phẩm', note: 'Nguyên nhân phổ biến dẫn đến khiếu nại và đổi trả.' },
      ja: { meaning: '品質問題 / クオリティの不具合', note: '納品された製品の規格外、不良、破損などの問題。' },
      en: { meaning: 'quality issue / defect', note: 'Defects or deviations from agreed standards.' }
    },
    examples: [
      {
        zh: '经我方质检部门抽检，发现首批到货存在严重的开胶质量问题。',
        pinyin: 'Jīng wǒfāng zhìjiǎn bùmén chōujiǎn, fāxiàn shǒupī dàohuò cúnzài yánzhòng de kāijiāo zhìliàng wèntí.',
        translations: {
          vi: 'Qua kiểm tra ngẫu nhiên của bộ phận KCS chúng tôi, phát hiện lô hàng đầu tiên tồn tại vấn đề chất lượng bị bong keo nghiêm trọng.',
          ja: '当社の品質管理部門による抜き取り検査の結果、初回納入分に深刻な接着不良（剥がれ）の品質問題が発見されました。',
          en: 'Inspection by our QC department revealed serious glue-debonding defects in the first batch.'
        }
      }
    ]
  },
  {
    id: 'bc_after_002',
    term: '索赔',
    pinyin: 'suǒ péi',
    partOfSpeech: 'verb',
    category: 'aftersales',
    level: 'intermediate',
    tags: ['claim', 'compensation', 'dispute'],
    translations: {
      vi: { meaning: 'Khiếu nại đòi bồi thường (Claim)', note: 'Đòi bồi thường tài chính do hàng lỗi, giao thiếu hoặc vi phạm hợp đồng.' },
      ja: { meaning: 'クレーム提起 / 損害賠償請求', note: '品質不良や数量不足に対して金銭的補償を正式に請求すること。' },
      en: { meaning: 'to claim / to demand compensation', note: 'Formal request for damages due to non-conformance.' }
    },
    examples: [
      {
        zh: '由于零件破损率超过5%，买方正式向供应商提出索赔申请。',
        pinyin: 'Yóuyú língjiàn pòsǔnlǜ chāoguò bǎifēnzhī wǔ, mǎifāng zhèngshì xiàng gōngyìngshāng tíchū suǒpéi shēnqǐng.',
        translations: {
          vi: 'Do tỷ lệ linh kiện hư hỏng vượt quá 5%, bên mua đã chính thức gửi đơn yêu cầu bồi thường lên nhà cung cấp.',
          ja: '部品の破損率が5％を超過したため、買い手はサプライヤーに対し正式に損害賠償を請求しました。',
          en: 'Because the defect rate exceeded 5%, the buyer formally submitted a claim for compensation.'
        }
      }
    ]
  },
  {
    id: 'bc_after_003',
    term: '退换货',
    pinyin: 'tuì huàn huò',
    partOfSpeech: 'phrase',
    category: 'aftersales',
    level: 'beginner',
    tags: ['return', 'exchange', 'warranty'],
    translations: {
      vi: { meaning: 'Trả và đổi hàng (退货: trả hàng hoàn tiền; 换货: đổi hàng mới)', note: 'Chính sách bảo hành hoặc khắc phục sự cố giao dịch.' },
      ja: { meaning: '返品・交換', note: '不良品を返送し、良品と交換するか返金を受けること。' },
      en: { meaning: 'return and exchange of goods', note: 'Returning defective items for refund or replacement.' }
    },
    examples: [
      {
        zh: '凡是在质保期内出现的非人为损坏，厂家一律无条件包退换货。',
        pinyin: 'Fánshì zài zhìbǎo qī nèi chūxiàn de fēirénwéi sǔnhuài, chǎngjiā yílǜ wútiáojiàn bāo tuìhuànhuò.',
        translations: {
          vi: 'Mọi hư hỏng không do yếu tố con người xuất hiện trong thời gian bảo hành, nhà sản xuất đều bao đổi trả vô điều kiện.',
          ja: '保証期間内に発生した自然故障につきましては、メーカーが全品無条件で返品・交換を保証いたします。',
          en: 'Any non-accidental damage during the warranty period is unconditionally covered for return and exchange.'
        }
      }
    ]
  },

  // --- 12. SCENARIOS (情景练习核心词) ---
  {
    id: 'bc_scen_001',
    term: '达成共识',
    pinyin: 'dáchéng gòngshí',
    partOfSpeech: 'phrase',
    category: 'scenarios',
    level: 'intermediate',
    tags: ['consensus', 'agreement', 'closing'],
    translations: {
      vi: { meaning: 'Đạt được đồng thuận / đạt được tiếng nói chung', note: 'Cụm từ then chốt khép lại buổi đàm phán thành công.' },
      ja: { meaning: '合意に達する / コンセンサスを得る', note: '交渉の末、双方が条件に合意すること。' },
      en: { meaning: 'to reach a consensus / to come to an agreement', note: 'Finalizing agreement after discussions.' }
    },
    examples: [
      {
        zh: '经过长达三轮的艰苦谈判，双方终于在交期和付款方式上达成了共识。',
        pinyin: 'Jīngguò chángdá sān lún de jiānkǔ tánpàn, shuāngfāng zhōngyú zài jiāoqī hé fùkuǎn fāngshì shàng dáchéng le gòngshí.',
        translations: {
          vi: 'Trải qua ba vòng đàm phán cam go, hai bên rốt cuộc đã đạt được sự đồng thuận về thời hạn giao hàng và phương thức thanh toán.',
          ja: '3回にわたる粘り強い交渉の末、双方は納期と決済条件についてようやく合意に達しました。',
          en: 'After three rounds of tough negotiations, both sides reached a consensus on delivery dates and payment terms.'
        }
      }
    ]
  },
  {
    id: 'bc_scen_002',
    term: '合作愉快',
    pinyin: 'hézuò yúkuài',
    partOfSpeech: 'phrase',
    category: 'scenarios',
    level: 'beginner',
    tags: ['closing', 'toast', 'etiquette'],
    translations: {
      vi: { meaning: 'Chúc hợp tác vui vẻ / chúc việc cộng tác thuận lợi tốt đẹp', note: 'Câu nói bắt tay kinh điển khi ký kết hợp đồng hoặc kết thúc cuộc họp.' },
      ja: { meaning: '良い協業を / 今後ともよろしくお願いいたします', note: '契約締結や合意時に握手を交わしながら述べる定番の挨拶。' },
      en: { meaning: 'Pleasure doing business with you / Looking forward to fruitful cooperation', note: 'Standard handshake closing phrase.' }
    },
    examples: [
      {
        zh: '合同已经签署完毕，祝我们合作愉快，互利共赢！',
        pinyin: 'Hétong yǐjīng qiānshǔ wánbì, zhù wǒmen hézuò yúkuài, hùlì gòngyíng!',
        translations: {
          vi: 'Hợp đồng đã ký kết xong xuôi, chúc chúng ta hợp tác vui vẻ, cùng có lợi cùng thắng!',
          ja: '契約書の調印が完了いたしました。素晴らしい協業と、双方の発展をお祈り申し上げます！',
          en: 'The contract is signed; here is to fruitful cooperation and win-win success!'
        }
      }
    ]
  }
,
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
];
