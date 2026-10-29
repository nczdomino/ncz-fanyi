/**
 * tools/business-scenarios.js
 * 10 Multi-step Interactive Business Roleplay Scenarios with Tri-lingual support and pedagogical feedback.
 */

module.exports = [
  {
    id: 'scen_001_inquiry_initial',
    category: 'communication',
    title: {
      vi: 'Hỏi giá và xin Catalogue lần đầu tại Hội chợ Canton Fair',
      ja: '広州交易会での初回引き合い・カタログ請求',
      en: 'Initial Product Inquiry & Catalog Request at Trade Fair'
    },
    description: {
      vi: 'Đóng vai nhân viên thu mua tiếp cận gian hàng nhà máy Trung Quốc để hỏi catalogue và bảng giá.',
      ja: 'バイヤーとして展示会ブースを訪問し、製品カタログと価格表を礼儀正しく請求します。',
      en: 'Roleplay as an overseas buyer approaching a supplier booth to request product catalogs and price lists.'
    },
    context: {
      vi: 'Bạn đang tham quan Hội chợ Canton Fair và muốn tìm nhà cung cấp thiết bị gia dụng thông minh uy tín.',
      ja: '広州交易会を視察中。スマート家電の有望サプライヤーを探しています。',
      en: 'Visiting Canton Fair to source reliable smart home appliance OEM manufacturers.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Nhân viên kinh doanh gian hàng (Mr. Wang)',
          ja: 'ブース営業担当（王さん）',
          en: 'Booth Sales Manager (Mr. Wang)'
        },
        promptZh: '您好！欢迎光临我们展位。请问您对我们哪款产品感兴趣？这是我们最新的智能空气炸锅系列。',
        promptPinyin: 'Nínhǎo! Huānyíng guānglín wǒmen zhǎnwèi. Qǐngwèn nín duì wǒmen nǎ kuǎn chǎnpǐn gǎn xìngqù? Zhè shì wǒmen zuìxīn de zhìnéng kōngqì zhàguō xìliè.',
        promptTranslation: {
          vi: 'Chào anh/chị! Chào mừng đã ghé gian hàng chúng tôi. Anh/chị quan tâm dòng sản phẩm nào ạ? Đây là dòng nồi chiên không dầu thông minh mới nhất của chúng tôi.',
          ja: 'いらっしゃいませ！どの製品にご興味がおありでしょうか？こちらは最新のスマートエアフライヤーシリーズです。',
          en: 'Hello! Welcome to our booth. Which line of products are you interested in? This is our newest smart air fryer series.'
        },
        vocabHighlights: ['展位', '产品', '智能', '系列'],
        options: [
          {
            text: {
              zh: '王经理您好！我是越南ABC公司的采购代表。这款炸锅外观很吸引人，请问能提供一份产品目录和FOB深圳报价单吗？',
              pinyin: 'Wáng jīnglǐ nínhǎo! Wǒ shì Yuènán ABC gōngsī de cǎigòu dàibiǎo. Zhè kuǎn zhàguō wàiguān hěn xīyǐn rén, qǐngwèn néng tígōng yī fèn chǎnpǐn mùlù hé FOB Shēnzhèn bàojiàdān ma?',
              translations: {
                vi: 'Chào quản lý Vương! Tôi là đại diện thu mua công ty ABC Việt Nam. Kiểu dáng nồi này rất bắt mắt, anh có thể cung cấp catalogue và báo giá FOB Thâm Quyến được không?',
                ja: '王マネージャー、こんにちは。ベトナムABC社の購買担当です。デザインが素晴らしいですね。製品カタログとFOB深圳の価格表をいただけますか？',
                en: 'Hello Manager Wang! I am the purchasing rep for ABC Vietnam. The design is sleek. Could you provide a catalog and FOB Shenzhen price list?'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Rất chuẩn mực! Tự giới thiệu danh tính công ty, khen sản phẩm khéo léo và hỏi rõ điều kiện Incoterms (FOB Shenzhen).',
              ja: '✅ 最適です。身分と所属を名乗り、製品を褒めつつFOB条件を指定したプロフェッショナルな対応です。',
              en: '✅ Excellent! Professional self-introduction, genuine compliment, and specific Incoterms designation.'
            },
            nextStepIndex: 1
          },
          {
            text: {
              zh: '这个多少钱一台？太贵的话我就不看了。',
              pinyin: 'Zhèige duōshao qián yī tái? Tài guì dehuà wǒ jiù bù kàn le.',
              translations: {
                vi: 'Cái này bao nhiêu tiền một cái? Nếu đắt quá thì tôi không thèm xem nữa đâu.',
                ja: 'これ一台いくら？高すぎるなら見ないよ。',
                en: 'How much for one piece? If too expensive I won’t bother.'
              }
            },
            isRecommended: false,
            feedback: {
              vi: '❌ Quá thô lỗ trong giao tiếp thương mại! Nhà máy chưa biết sản lượng MOQ của bạn thì chưa thể báo giá chính xác, nói vậy sẽ khiến đối tác thiếu thiện cảm.',
              ja: '❌ 失礼かつ不適切です。数量も提示せずいきなり単価だけを聞いて突き放す態度はビジネス上敬遠されます。',
              en: '❌ Too blunt and unprofessional! Unit price depends heavily on quantity and specs.'
            },
            nextStepIndex: 1
          }
        ]
      },
      {
        stepIndex: 1,
        speakerRole: {
          vi: 'Nhân viên kinh doanh gian hàng (Mr. Wang)',
          ja: 'ブース営業担当（王さん）',
          en: 'Booth Sales Manager (Mr. Wang)'
        },
        promptZh: '没问题！这是我们的名片和目录。标准款起订量（MOQ）是1000台，FOB深圳价格是28美元。请问贵司预计的首单采购量大概是多少？',
        promptPinyin: 'Méi wèntí! Zhè shì wǒmen de míngpiàn hé mùlù. Biāozhǔn kuǎn qǐdìngliàng (MOQ) shì yīqiān tái, FOB Shēnzhèn jiàgé shì èrshíbā Měiyuán. Qǐngwèn guìsī yùjì de shǒudān cǎigòuliàng dàgài shì duōshao?',
        promptTranslation: {
          vi: 'Không vấn đề gì! Đây là danh thiếp và catalogue của chúng tôi. Bản chuẩn số lượng đặt tối thiểu (MOQ) là 1000 chiếc, giá FOB Thâm Quyến là 28 USD. Xin hỏi dự kiến số lượng đơn đầu tiên của quý công ty là khoảng bao nhiêu?',
          ja: 'もちろんです！こちらが名刺とカタログです。標準モデルの最小発注数量（MOQ）は1000台、FOB深圳価格は28ドルです。貴社の初回ロット予定数はどのくらいでしょうか？',
          en: 'Certainly! Here are our business card and catalog. Standard MOQ is 1,000 units at FOB Shenzhen $28. What is your estimated first trial order volume?'
        },
        vocabHighlights: ['起订量', '名片', '首单', '采购量'],
        options: [
          {
            text: {
              zh: '谢谢王经理。我们计划首单先试单500台测试越南市场反应，后续返单会翻倍。请问500台能按这个价格做吗？',
              pinyin: 'Xièxie Wáng jīnglǐ. Wǒmen jìhuà shǒudān xiān shìdān wǔbǎi tái cèshì Yuènán shìchǎng fǎnyìng, hòuxù fǎndān huì fānbèi. Qǐngwèn wǔbǎi tái néng àn zhèige jiàgé zuò ma?',
              translations: {
                vi: 'Cảm ơn quản lý Vương. Đơn đầu chúng tôi dự định đặt thử 500 chiếc để thăm dò thị trường Việt Nam, các đơn tiếp theo sẽ tăng gấp đôi. Xin hỏi 500 chiếc có áp dụng mức giá này được không?',
                ja: 'ありがとうございます。初回は市場テストとしてまず500台で試発注し、好評なら追加発注を倍増させる予定です。500台でも同価格でご検討いただけますか？',
                en: 'Thank you Manager Wang. We plan a trial order of 500 units to test market response, with repeat orders doubling. Can you honor this price for 500 units?'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Tuyệt vời! Dùng khái niệm "试单" (đơn thử) kèm lời hứa "返单" (đơn hàng lặp lại) là chiến thuật khéo léo để đàm phán MOQ thấp hơn.',
              ja: '✅ 的確な交渉術です。「試発注（トライアル）」と「リピート増量」を提示することでMOQの柔軟な譲歩を引き出せます。',
              en: '✅ Excellent negotiation tactic! Using "trial order" combined with future repeat order commitment encourages supplier flexibility.'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_002_price_negotiation',
    category: 'sales_purchasing',
    title: {
      vi: 'Đàm phán chiết khấu giá khi tăng số lượng đơn hàng',
      ja: '発注数量増量に伴うボリュームディスカウント交渉',
      en: 'Negotiating Bulk Volume Discounts for Larger Orders'
    },
    description: {
      vi: 'Thương lượng để giảm giá đơn vị khi nâng khối lượng mua hàng từ 2,000 chiếc lên 5,000 chiếc.',
      ja: '購入数を2,000個から5,000個に増やす前提で単価引き下げを交渉します。',
      en: 'Leverage an order quantity increase from 2,000 to 5,000 units to secure a lower unit price.'
    },
    context: {
      vi: 'Xưởng đưa giá 15 USD/cái cho 2,000 cái. Bạn muốn xin giá 13.50 USD nếu nâng lên 5,000 cái.',
      ja: 'サプライヤーの提示は2,000個で15ドル。5,000個発注を条件に13.50ドルへの値引きを目指します。',
      en: 'Supplier quoted $15 for 2,000 pcs. You aim for $13.50 if ordering 5,000 pcs.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Giám đốc bán hàng (Chen)',
          ja: '営業責任者（陳さん）',
          en: 'Sales Director (Mr. Chen)'
        },
        promptZh: '李总，我们2,000件的含税单价是15美元，这已经是我们的底价了，原材料最近涨得很厉害。',
        promptPinyin: 'Lǐ zǒng, wǒmen liǎngqiān jiàn de hánshuì dānjià shì shíwǔ Měiyuán, zhè yǐjīng shì wǒmen de dǐjià le, yuáncáiliào zuìjìn zhǎng de hěn lìhai.',
        promptTranslation: {
          vi: 'Giám đốc Lý, đơn giá đã gồm thuế cho 2.000 cái là 15 USD, đây đã là giá sàn của chúng tôi rồi, giá nguyên vật liệu đợt này tăng dữ quá.',
          ja: '李総経理、2,000個の税込単価15ドルはすでに弊社の限界底値です。最近原材料が高騰しておりまして。',
          en: 'Director Li, $15 tax-inclusive for 2,000 pcs is already our bottom line; raw material costs have spiked significantly.'
        },
        vocabHighlights: ['底价', '原材料', '含税单价'],
        options: [
          {
            text: {
              zh: '陈总，我们非常理解原材料成本的压力。如果我们这次把采购量直接提升到5,000件，并且保证下半年持续返单，您看能否给我们优惠到13.5美元？',
              pinyin: 'Chén zǒng, wǒmen fēicháng lǐjiě yuáncáiliào chéngběn de yālì. Rúguǒ wǒmen zhè cì bǎ cǎigòuliàng zhíjiē tíshēng dào wǔqiān jiàn, bìngqiě bǎozhèng xiàbànnián chíxù fǎndān, nín kàn néngfǒu gěi wǒmen yōuhuì dào shísān diǎn wǔ Měiyuán?',
              translations: {
                vi: 'Giám đốc Trần, chúng tôi rất thấu hiểu áp lực giá nguyên liệu. Nếu lần này chúng tôi nâng thẳng lượng đặt mua lên 5.000 cái và cam kết tiếp tục tái đặt hàng trong nửa cuối năm, anh xem có thể ưu đãi mức 13.5 USD không?',
                ja: '陳総、原材料高騰のご苦労は重々理解しております。もし今回発注数を5,000個に引き上げ、下半期の継続発注もお約束する場合、13.5ドルまでご優遇いただけないでしょうか？',
                en: 'Mr. Chen, we completely understand raw material pressures. If we increase our order to 5,000 units now and guarantee regular reorders, could you offer $13.50?'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Thấu tình đạt lý: Thể hiện sự thấu hiểu trước khó khăn của đối tác, đồng thời đổi lấy chiết khấu bằng lợi ích cụ thể (lượng tăng 2.5 lần).',
              ja: '✅ 完璧なアプローチ。相手の立場を尊重しつつ、具体的な追加ロットと継続取引のメリットを提示して妥協点を引き出しています。',
              en: '✅ Win-win approach: Shows empathy while offering compelling commercial value (2.5x volume increase).'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_003_payment_terms',
    category: 'finance',
    title: {
      vi: 'Thương lượng phương thức thanh toán an toàn cho hai bên',
      ja: 'リスクを低減する国際決済条件の交渉',
      en: 'Negotiating Balanced & Secure Payment Terms'
    },
    description: {
      vi: 'Thuyết phục nhà máy chuyển từ 100% thanh toán trước sang 30% cọc và 70% sau khi nhận bản scan Vận đơn B/L.',
      ja: '全額前払い要求に対し、30%前金＋B/Lコピー確認後70%残金支払いの国際標準条件へ誘導します。',
      en: 'Persuade the supplier from demanding 100% advance payment to the standard 30% deposit + 70% against B/L copy.'
    },
    context: {
      vi: 'Nhà cung cấp mới yêu cầu chuyển khoản 100% trước khi giao hàng (100% T/T Advance). Bạn cần thương lượng phương thức an toàn hơn.',
      ja: '新規サプライヤーが「出荷前100%前払い」を要求。買い手側の資金リスクを抑えるため交渉します。',
      en: 'New supplier insists on 100% advance T/T. You must protect cash flow and minimize default risk.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Kế toán trưởng xưởng (Ms. Zhao)',
          ja: 'サプライヤー財務（趙さん）',
          en: 'Supplier Finance Manager (Ms. Zhao)'
        },
        promptZh: '因为我们是第一次合作，公司规定必须在发货前付清100%全款（100% T/T Advance），否则仓库无法安排装柜。',
        promptPinyin: 'Yīnwèi wǒmen shì dì-yī cì hézuò, gōngsī guīdìng bìxū zài fāhuò qián fùqīng bǎifēnzhī bǎigián quánguǎn, fǒuzé cāngkù wúfǎ ānpái zhuāngguì.',
        promptTranslation: {
          vi: 'Do đây là lần đầu hợp tác, quy định công ty chúng tôi là phải thanh toán đủ 100% trước khi xuất hàng, nếu không kho không thể xếp hàng vào container.',
          ja: '今回が初回のお取引となるため、全額前払い（100% T/T）が弊社の規定となっております。ご入金確認前はコンテナ積み込みの手配ができません。',
          en: 'Since this is our first collaboration, company policy requires 100% advance payment before shipment; otherwise our warehouse cannot load the container.'
        },
        vocabHighlights: ['付清', '全款', '装柜', 'T/T'],
        options: [
          {
            text: {
              zh: '赵经理，为了平衡双方的资金与风控安全，我们建议采取国际通行的付款方式：合同签订后付30%定金安排生产，发货后见海运提单（B/L）复印件及质检报告结清70%尾款。您看这样双方都有保障，如何？',
              pinyin: 'Zhào jīnglǐ, wèile pínghéng shuāngfāng de zījīn yǔ fēngkòng ānquán, wǒmen jiànyì cǎiqǔ guójì tōngxíng de fùkuǎn fāngshì: hétong qiāndìng hòu fù bǎifēnzhī sānshí dìngjīn ānpái shēngchǎn, fāhuò hòu jiàn hǎiyùn tídān fùyìnjiàn jí zhìjiǎn bàogào jiéqīng bǎifēnzhī qīshí wěikuǎn. Nín kàn zhèyàng shuāngfāng dōu yǒu bǎozhàng, rúhé?',
              translations: {
                vi: 'Quản lý Triệu, để cân bằng rủi ro vốn cho cả hai bên, chúng tôi đề xuất phương thức thông lệ quốc tế: Sau khi ký hợp đồng trả cọc 30% để sản xuất, sau khi giao hàng xem bản scan vận đơn B/L và biên bản kiểm hàng sẽ thanh toán nốt 70% còn lại. Như vậy đôi bên đều được bảo đảm, chị thấy sao?',
                ja: '趙マネージャー、双方の資金効率とリスクヘッジのため、国際標準である「契約時30%手付金、船積後B/Lコピーおよび検品合格報告書確認時に残金70%支払い」をご提案いたします。これなら双方安心かと思いますがいかがでしょうか？',
                en: 'Manager Zhao, to balance financial risk for both sides, we propose international practice: 30% deposit upon contract, and 70% balance upon presentation of B/L copy and inspection report.'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Rất chuyên nghiệp! Nêu rõ lập luận bảo vệ đôi bên (30% cọc đủ để xưởng mua nguyên liệu, 70% trả sau B/L bảo đảm người mua không bị mất trắng tiền).',
              ja: '✅ 最善の提案。売り手の製造運転資金（30%）を確保しつつ、買い手の未船積リスク（70%）を排除する納得感ある条件提示です。',
              en: '✅ Highly professional! Balances working capital for the manufacturer with delivery security for the importer.'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_004_lead_time_delay',
    category: 'workplace',
    title: {
      vi: 'Nhắc nhở và xử lý khi nhà máy thông báo chậm tiến độ giao hàng',
      ja: '納期遅延連絡に対する督促と代替挽回策の協議',
      en: 'Handling Factory Delivery Delays & Formulating Catch-up Plans'
    },
    description: {
      vi: 'Nhà máy báo trễ hàng 15 ngày do mất điện, thương lượng để ưu tiên xuất trước 1 phần bằng đường hàng không hoặc đẩy ca đêm.',
      ja: '電力制限で15日遅延の連絡。納期遅延による損失を防ぐため、部分分納や夜勤残業による短縮を求めます。',
      en: 'Factory reports a 15-day delay due to power cuts; negotiate split shipment or expedited overtime shifts.'
    },
    context: {
      vi: 'Hàng vụ Tết nếu trễ 15 ngày sẽ bị lỡ mùa bán cao điểm. Cần giải pháp quyết liệt nhưng vẫn giữ hòa khí.',
      ja: '年末商戦向け商材のため、半月の遅れは致命傷になります。',
      en: 'Holiday season goods cannot afford a 15-day delay. Urgent remediation required.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Quản đốc xưởng (Mr. Liu)',
          ja: '工場長（劉さん）',
          en: 'Factory Manager (Mr. Liu)'
        },
        promptZh: '实在不好意思，由于当地环保限电，我们这批订单估计要延期两周交货，大约下个月10号才能出货。',
        promptPinyin: 'Shízài bù hǎoyìsi, yóuyú dāngdì huánbǎo xiàndiàn, wǒmen zhè pī dìngdān gūjì yào yánqī liǎng zhōu jiāohuò, dàyuē xià gè yuè shí hào cáinéng chūhuò.',
        promptTranslation: {
          vi: 'Thành thật xin lỗi, do địa phương cắt điện bảo vệ môi trường, lô hàng này ước tính phải lùi 2 tuần mới giao được, khoảng ngày 10 tháng sau mới xuất hàng.',
          ja: '大変申し訳ありません。地域の電力供給制限のため、今回のロットは納期が2週間遅延し、来月10日頃の出荷見込みとなります。',
          en: 'We sincerely apologize, but due to local power rationing, this batch will be delayed by about 2 weeks, shipping around the 10th of next month.'
        },
        vocabHighlights: ['延期', '交货', '限电', '出货'],
        options: [
          {
            text: {
              zh: '刘厂长，这批货是赶年底促销季的，两周延期会导致我们违约。我们能否商量两个补救措施：第一，现有已完工的500件先分批出货；第二，贵司安排加班赶工，由此产生的加急空运差价由双方各承担一部分？',
              pinyin: 'Liú chǎngzhǎng, zhè pī huò shì gǎn niándǐ cùxiāo jì de, liǎng zhōu yánqī huì dǎozhì wǒmen wéiyuē. Wǒmen néngfǒu shāngliang liǎng gè bǔjiù cuòshī: dì-yī, xiànyǒu yǐ wángōng de wǔbǎi jiàn xiān fēnpī chūhuò; dì-èr, guìsī ānpái jiābān gǎngōng, yóucǐ chǎnshēng de jiājí kōngyùn chājià yóu shuāngfāng gè chéngdān yībùfen?',
              translations: {
                vi: 'Xưởng trưởng Lưu ơi, lô hàng này kịp đợt khuyến mãi cuối năm của chúng tôi, chậm 2 tuần sẽ khiến chúng tôi bị vi phạm hợp đồng với khách. Chúng ta có thể bàn 2 biện pháp cứu vãn: Thứ nhất, 500 cái đã làm xong cho giao trước từng phần (分批出货); Thứ hai, xưởng tăng ca làm gấp, chênh lệch cước bay gấp nếu có hai bên cùng chia sẻ một phần?',
                ja: '劉工場長、これは年末セール用の最重要商品で、2週間の遅れは弊社にとって顧客違約になります。2つの挽回案をご検討いただけませんか：① 完成済みの500個を先行して分納出荷する、② 残業体制で生産を加速し、一部を航空便（エア）で振り替える。',
                en: 'Director Liu, these goods are for our year-end promotional campaign; a 2-week delay will cause contractual default with our retail buyers. Can we split shipment for finished goods and arrange overtime?'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Giải pháp hướng tới hành động! Vừa chỉ rõ hậu quả nghiêm trọng, vừa lập tức đưa ra phương án khả thi (phân lô xuất trước + hỗ trợ chi phí cước).',
              ja: '✅ 極めて建設的です。遅延の重大性を伝えつつ、分納（部分出荷）と残業・航空便折衷という実効性のある解決策を提示しています。',
              en: '✅ Constructive & solution-oriented! Communicates gravity while proposing viable practical remedies.'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_005_shipping_booking',
    category: 'logistics',
    title: {
      vi: 'Làm việc với công ty Logistics (Forwarder) để đặt chỗ container và lấy S/O',
      ja: 'フォワーダーへのコンテナブッキングと船積指図書（S/O）取得',
      en: 'Coordinating Container Booking & Shipping Order with Freight Forwarder'
    },
    description: {
      vi: 'Liên hệ Forwarder để kiểm tra giá cước biển (Ocean Freight), xin lịch tàu gần nhất và đặt 1 container 40HQ đi Hải Phòng.',
      ja: 'フォワーダーに海上運賃と最新船腹スケジュールを照会し、ハイフォン向け40HQコンテナを予約します。',
      en: 'Coordinate with shipping line/forwarder to check freight rates and book a 40HQ container to Haiphong.'
    },
    context: {
      vi: 'Hàng dự kiến xong ngày 20/11. Cần tàu khởi hành (ETD) ngày 23/11 tại cảng Thâm Quyến.',
      ja: '工場完成予定は11月20日。11月23日深圳出港（ETD）の本船スペースを確保する必要があります。',
      en: 'Goods ready by Nov 20. Need vessel sailing (ETD) Nov 23 out of Shenzhen.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Nhân viên kinh doanh Forwarder (Ms. Alice)',
          ja: 'フォワーダー担当（アリスさん）',
          en: 'Freight Forwarder Rep (Ms. Alice)'
        },
        promptZh: '您好！请问您需要订去哪个目的港的舱位？柜型是什么？预计货好时间（Cargo Ready Date）是哪天？',
        promptPinyin: 'Nínhǎo! Qǐngwèn nín xūyào dìng qù nǎge mùdìgǎng de cāngwèi? Guìxíng shì shénme? Yùjì huò hǎo shíjiān (Cargo Ready Date) shì nǎ tiān?',
        promptTranslation: {
          vi: 'Chào anh! Anh cần đặt chỗ đi cảng đích nào ạ? Loại container gì? Thời gian hàng sẵn sàng (CRD) là ngày nào ạ?',
          ja: 'お世話になっております。仕向港、コンテナタイプ、貨物準備完了日（CRD）を教えていただけますでしょうか？',
          en: 'Hello! Which port of destination do you need space for? What container type and Cargo Ready Date?'
        },
        vocabHighlights: ['目的港', '舱位', '柜型', '货好时间'],
        options: [
          {
            text: {
              zh: '你好Alice，我们需要订一个40尺高柜（40HQ）从深圳蛇口到越南海防港。货好时间是11月20日，请帮我们配23日左右开船直达航线，并请报一下海运费及起运港本地杂费（Local Charges）。',
              pinyin: 'Nǐhǎo Alice, wǒmen xūyào dìng yī gè sìshí chǐ gāoguì (40HQ) cóng Shēnzhèn Shékǒu dào Yuènán Hǎifáng gǎng. Huò hǎo shíjiān shì shíyī yuè èrshí rì, qǐng bāng wǒmen pèi èrshísān rì zuǒyòu kāichuán zhídá hángxiàn, bìng qǐng bào yīxià hǎiyùnfèi jí qǐyùngǎng běndì záfèi (Local Charges).',
              translations: {
                vi: 'Chào Alice, bên anh cần book 1 container 40HQ từ Thâm Quyến (Xà Khẩu) đi cảng Hải Phòng, Việt Nam. Ngày hàng xong là 20/11, em xếp giúp tuyến chạy thẳng rời cảng khoảng ngày 23, và báo giá cước biển kèm phụ phí nội địa cảng đi (Local charges) nhé.',
                ja: 'アリスさん、深圳・蛇口からベトナム・ハイフォン港行きの40HQコンテナ1本を予約したいです。CRDは11月20日、23日前後出港の直行便を確保してください。海上運賃と現地チャージ（Local Charges）の見積もりをお願いします。',
                en: 'Hi Alice, we need to book one 40HQ from Shekou Shenzhen to Haiphong, Vietnam. CRD is Nov 20, please arrange direct sailing around Nov 23 and quote ocean freight plus origin local charges.'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Rất chuẩn xác! Cung cấp đủ 5 yếu tố cốt lõi: Cảng đi/đích, loại vỏ cont (40HQ), ngày xong hàng, yêu cầu tàu thẳng (直达) và hỏi rõ cả cước biển lẫn phụ phí Local charges.',
              ja: '✅ 完璧な手配指示。出港地・仕向地・コンテナ種類・貨物完工日・直行便指定・ローカル費用確認が網羅されています。',
              en: '✅ Flawless logistics request! Covers POL/POD, equipment type, CRD, direct sailing preference, and local charge transparency.'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_006_co_form_e_discrepancy',
    category: 'customs',
    title: {
      vi: 'Xử lý bất đồng sai lệch tên hàng trên C/O Form E tại Hải quan',
      ja: '原産地証明書（Form E）の品名不一致と緊急差替え要請',
      en: 'Resolving Description Discrepancies on Form E at Customs'
    },
    description: {
      vi: 'Hải quan cảnh báo tên hàng trên C/O Form E không khớp 100% với Invoice, yêu cầu nhà xuất khẩu hỗ trợ cấp đổi khẩn cấp.',
      ja: '税関審査でForm Eの品名がインボイスと微小不一致。関税免除を受けるため発行元へ緊急再発行を要請します。',
      en: 'Customs flags a discrepancy between Form E and Invoice description; urgently request supplier re-issuance.'
    },
    context: {
      vi: 'Lô hàng đang chờ ở cảng để hưởng thuế nhập khẩu 0% theo ACFTA. Nếu không sửa C/O sẽ bị phạt và áp thuế suất thông thường.',
      ja: 'FTA特恵関税（0%）適用のため、Form Eの記載訂正が至急必要です。',
      en: 'Cargo is awaiting tariff exemption under ACFTA. Form E must strictly match the invoice wording.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Nhân viên chứng từ nhà máy (Ms. Amy)',
          ja: 'シッピング担当（エイミーさん）',
          en: 'Factory Documentation Officer (Ms. Amy)'
        },
        promptZh: '王先生，海关那边有什么问题吗？我们上周已经把Form E正本寄给你们了呀。',
        promptPinyin: 'Wáng xiānsheng, hǎiguān nàbiān yǒu shénme wèntí ma? Wǒmen shàngzhōu yǐjīng bǎ Form E zhèngběn jì gěi nǐmen le ya.',
        promptTranslation: {
          vi: 'Anh Vương, phía Hải quan có vấn đề gì vậy? Tuần trước chúng tôi đã chuyển phát nhanh bản gốc Form E cho bên anh rồi mà.',
          ja: '王さん、税関で何か問題でしょうか？先週Form Eの原本を速達で送付済みですが。',
          en: 'Mr. Wang, is there any problem at customs? We already couriered the original Form E to you last week.'
        },
        vocabHighlights: ['正本', 'Form E', '海关'],
        options: [
          {
            text: {
              zh: 'Amy你好，十分紧急！越南海关核对时指出，Form E第七栏的品名漏掉了型号后缀“Pro”，导致与商业发票不完全一致，面临无法享受零关税的风险。能否请贵司今天紧急向海关申请出具一份更正版Form E，并先将扫描件发给我们报关？',
              pinyin: 'Amy nǐhǎo, shífēn jǐnjí! Yuènán hǎiguān héduì shí zhǐchū, Form E dì-qī lán de pǐnmíng lòudiào le xínghào hòuzhuì "Pro", dǎozhì yǔ shāngyè fāpiào bù wánquán yīzhì, miànlín wúfǎ xiǎngshòu líng guānshuì de fēngxiǎn. Néngfǒu qǐng guìsī jīntiān jǐnjí xiàng hǎiguān shēnqǐng chūjù yī fèn gēngzhèng bǎn Form E, bìng xiān jiāng sǎomiáojiàn fā gěi wǒmen bàoguān?',
              translations: {
                vi: 'Amy ơi, cực kỳ khẩn cấp! Hải quan Việt Nam đối chiếu chỉ ra ô số 7 của Form E bị thiếu hậu tố model "Pro", khiến tên hàng không khớp 100% với hóa đơn thương mại, có nguy cơ không được hưởng thuế ưu đãi 0%. Công ty bạn có thể xin cấp đổi khẩn một bản Form E sửa đổi ngay hôm nay và gửi file scan trước cho bên mình khai quan được không?',
                ja: 'エイミーさん、緊急事態です！ベトナム税関の確認で、Form E第7欄の品名にモデル名末尾「Pro」が脱落しておりインボイスと完全一致しないため、特恵税率が否認される恐れがあります。本日中に差替え再発行を申請いただき、まずスキャンPDFをお送りいただけませんか？',
                en: 'Hi Amy, urgent issue! Vietnam customs pointed out Box 7 lacks model suffix "Pro", inconsistent with Commercial Invoice. Could your team urgently apply for an amended Form E and scan the copy today?'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Rất chính xác! Chỉ rõ vị trí sai sót (ô số 7 - 第七栏), giải thích hậu quả cụ thể (nguy cơ mất ưu đãi thuế) và giải pháp thiết thực (scan trước để làm việc với hải quan).',
              ja: '✅ 最善の説明。記載欄（第7欄）、不一致の箇所、発生するリスク、必要なアクション（当日再申請＋スキャン先送り）を明瞭に伝えています。',
              en: '✅ Perfect resolution communication! Points out exact Box 7 discrepancy, clear consequence, and an immediate actionable path.'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_007_quality_claim',
    category: 'aftersales',
    title: {
      vi: 'Gửi biên bản giám định và khiếu nại bồi thường hàng vỡ hỏng',
      ja: '検品レポートに基づく破損・不良クレームおよび求償交渉',
      en: 'Filing Quality Discrepancy Claims & Damage Compensation'
    },
    description: {
      vi: 'Sau khi dỡ hàng phát hiện 12% sản phẩm bị biến dạng do đóng thùng carton mỏng, yêu cầu đổi hàng hoặc trừ tiền đợt sau.',
      ja: '貨物開梱時に外装カートン強度不足による12%の変形破損を発見。写真と報告書を添えて補償を請求します。',
      en: 'Found 12% damaged goods due to thin outer cartons; present photo evidence and negotiate credit memo or replacement.'
    },
    context: {
      vi: 'Kiểm tra container tại kho, phát hiện bao bì không đạt chuẩn khiến hàng chịu lực kém bị móp méo.',
      ja: '倉庫でのデバンニング時に外装強度の問題による破損を確認。',
      en: 'Unpacking warehouse container reveals poor carton packaging resulting in squashed products.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Giám đốc dịch vụ hậu mãi (Mr. Sun)',
          ja: 'アフターサービス責任者（孫さん）',
          en: 'Customer Service Lead (Mr. Sun)'
        },
        promptZh: '李经理，我们出厂前都是通过全检的，是不是海运过程中海况恶劣导致的碰撞？',
        promptPinyin: 'Lǐ jīnglǐ, wǒmen chūchǎng qián dōu shì tōngguò quánjiǎn de, shìbushì hǎiyùn guòchéng zhōng hǎikuàng èliè dǎozhì de pèngzhuàng?',
        promptTranslation: {
          vi: 'Quản lý Lý, hàng chúng tôi trước khi xuất xưởng đều qua kiểm định 100% mà, có phải trong quá trình vận chuyển đường biển gặp sóng to dẫn đến va đập không?',
          ja: '李マネージャー、工場出荷時は全品検査済みです。航海中の荒天による荷崩れや衝撃ではありませんか？',
          en: 'Manager Li, all goods passed 100% factory inspection before dispatch; could it be rough sea transit damage?'
        },
        vocabHighlights: ['出厂', '全检', '碰撞'],
        options: [
          {
            text: {
              zh: '孙经理，我们随信附上了第三方检验机构（SGS）的开箱检验报告和高清照片。报告清楚证明是外箱瓦楞纸厚度仅为单坑（3层），未达到合同约定的五层高强瓦楞标准，导致受压变形。按损坏率12%计算，损失金额为4,800美元。我们提议在下周返单的货款中全额扣除，同时请务必改进下批货的包装规格。',
              pinyin: 'Sūn jīnglǐ, wǒmen suíxìn fùshàng le dì-sān fāng jiǎnyàn jīgòu (SGS) de kāixiāng jiǎnyàn bàogào hé gāoqīng zhàopiàn. Bàogào qīngchu zhèngmíng shì wàixiāng wǎléngzhǐ hòudù jǐn wéi dānkēng (sāncéng), wèi dádào hétong yuēdìng de wǔcéng gāoqiáng wǎléng biāozhǔn, dǎozhì shòuyā biànxíng. Àn sǔnhuài lǜ bǎifēnzhī shí\'èr jìsuàn, sǔnshī jīné wéi sìqiān bābǎi Měiyuán. Wǒmen tíyì zài xiàzhōu fǎndān de huòkuǎn zhōng quán\'é kòuchú, tóngshí qǐng wùbì gǎijìn xià pī huò de bāozhuāng guīgé.',
              translations: {
                vi: 'Quản lý Tôn, bên mình đính kèm biên bản mở thùng giám định của bên thứ 3 (SGS) cùng hình ảnh chụp rõ nét. Biên bản chỉ rõ nguyên nhân là do carton bên ngoài chỉ là loại 3 lớp sóng đơn, không đạt tiêu chuẩn 5 lớp sóng chịu lực cao như cam kết trong hợp đồng, dẫn tới bị nén bẹp. Tính theo tỷ lệ hỏng 12%, số tiền thiệt hại là 4.800 USD. Chúng tôi đề nghị trừ thẳng toàn bộ số tiền này vào đơn hàng tái đặt vào tuần tới, đồng thời yêu cầu xưởng lập tức cải thiện quy cách bao bì cho lô sau.',
                ja: '孫マネージャー、第三者検品機関（SGS）の開梱レポートと証拠写真を添付しました。外装段ボールが契約仕様の5層強化芯ではなく単層（3層）であったため耐圧不足で変形したと結論付けられています。不良率12%（損失額4,800ドル）分を次週のリピート発注代金から相殺相殺（Credit Note）とし、次回ロットの梱包改善を強く求めます。',
                en: 'Manager Sun, attached is the SGS third-party unboxing report with clear photos showing single-wall 3-ply cartons used instead of agreed 5-ply reinforced ones. Based on 12% defect rate ($4,800), we propose a credit deduction on next week reorder and immediate packaging upgrade.'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Khiếu nại đanh thép, chuẩn mực và văn minh: Có chứng cứ bên thứ ba (SGS), dẫn chiếu điều khoản hợp đồng bị vi phạm, đưa ra con số cụ thể và phương án cấn trừ êm đẹp.',
              ja: '✅ 模範的なクレーム交渉。第三者検査データと契約条項を根拠に、明確な金額と次期取引相殺という双方受け入れやすい着地点を提示しています。',
              en: '✅ Iron-clad commercial claim! Solid third-party evidence, contract specification reference, exact dollar amount, and practical settlement method.'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_008_receiving_clients',
    category: 'basic',
    title: {
      vi: 'Đón đoàn đối tác Trung Quốc tại Sân bay Nội Bài / Tân Sơn Nhất',
      ja: '空港での中国人出張団の出迎えと挨拶マナー',
      en: 'Welcoming a Chinese Business Delegation at the Airport'
    },
    description: {
      vi: 'Cầm biển đón, chào hỏi xã giao nồng nhiệt, hỏi thăm chuyến bay và sắp xếp xe đưa về khách sạn nghỉ ngơi.',
      ja: 'ネームプレートを掲げて空港で迎え、フライトの労をねぎらいホテルへ送迎案内します。',
      en: 'Meet clients at airport arrivals, exchange cordial greetings, and escort them smoothly to the hotel.'
    },
    context: {
      vi: 'Đoàn Tổng giám đốc Zhang từ Thâm Quyến sang thăm nhà máy tại Việt Nam.',
      ja: '深圳から自社工場視察に来訪した張総経理一行を出迎えます。',
      en: 'President Zhang and his team arrive from Shenzhen to inspect the local manufacturing site.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Tổng giám đốc Trương (Mr. Zhang)',
          ja: '来訪顧客（張総経理）',
          en: 'Visiting Executive (Mr. Zhang)'
        },
        promptZh: '你好！请问是越南越中实业的小阮吧？很高兴见到你！',
        promptPinyin: 'Nǐhǎo! Qǐngwèn shì Yuènán Yuè-Zhōng Shíyè de xiǎo Ruǎn ba? Hěn gāoxìng jiàndào nǐ!',
        promptTranslation: {
          vi: 'Chào em! Cho hỏi có phải bạn Nguyễn bên Công ty Việt - Trung không? Rất vui được gặp em!',
          ja: 'こんにちは！越中実業のグエンさんですね？お会いできて嬉しいです！',
          en: 'Hello! Are you Nguyen from Yue-Zhong Enterprises? Great to meet you!'
        },
        vocabHighlights: ['实业', '高兴', '见到'],
        options: [
          {
            text: {
              zh: '张总您好！欢迎来到越南！我是小阮。一路飞行辛苦了！行李都拿齐了吗？我们专车已经在外面等候了，先送您和各位领导去酒店办理入住休息，晚上董事长特地安排了特色越南菜接风洗尘。',
              pinyin: 'Zhāng zǒng nínhǎo! Huānyíng láidào Yuènán! Wǒ shì xiǎo Ruǎn. Yīlù fēixíng xīnkǔ le! Xíngli dōu ná qí le ma? Wǒmen zhuānchē yǐjīng zài wàimiàn děnghòu le, xiān sòng nín hé gèwèi lǐngdǎo qù jiǔdiàn bànlǐ rùzhù xiūxi, wǎnshang dǒngshìzhǎng tèdì ānpái le tèsè Yuènán cài jiēfēngxǐchén.',
              translations: {
                vi: 'Em chào Trương tổng! Chào mừng anh đến Việt Nam! Em là Nguyễn đây ạ. Bay đường dài anh vất vả rồi! Hành lý mình lấy đủ hết chưa ạ? Xe riêng của công ty em đã đợi sẵn ở cửa rồi, em xin phép đưa Trương tổng cùng các sếp về khách sạn nhận phòng nghỉ ngơi trước, tối nay Chủ tịch bên em đã đặc biệt sắp xếp tiệc món Việt để tẩy trần đón mừng đoàn ạ.',
                ja: '張総、ようこそベトナムへ！グエンでございます。フライト大変お疲れ様でした！お荷物はすべて揃いましたでしょうか？専用車を外に待機させております。まずホテルへご案内してチェックインいただき、夜は会長主催の歓迎夕食会をご用意しております。',
                en: 'President Zhang, welcome to Vietnam! I am Nguyen. Hope you had a smooth flight! Got all your luggage? Our car is waiting outside to take you to the hotel to rest, and our Chairman has arranged a welcome dinner tonight.'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Tinh tế và hiếu khách bậc nhất! Có câu chào tôn kính "张总", hỏi han "辛苦了", hỗ trợ chu đáo (xe chờ, nghỉ ngơi) và dùng thành ngữ đãi khách "接风洗尘" (tiệc tẩy trần đón khách phương xa).',
              ja: '✅ 最高レベルの接遇マナー。「張総」と敬称で呼び、労いの言葉（辛苦了）、スムーズな動線案内、そして伝統的なもてなし表現（接風洗塵）が完璧です。',
              en: '✅ Superb hospitality! Polite honorifics, thoughtful inquiry, seamless logistics, and classic welcome idiom (接风洗尘).'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_009_urgent_customs_clearance',
    category: 'customs',
    title: {
      vi: 'Xử lý lô hàng bị phân vào Luồng Đỏ (Red Channel) tại Cảng',
      ja: '税関レッドチャネル（現物開梱検査）判定時の迅速対応',
      en: 'Managing Urgent Red Channel Physical Inspection at Port'
    },
    description: {
      vi: 'Hệ thống Hải quan phân container vào Luồng Đỏ kiểm hóa thực tế, liên hệ điều phối bốc dỡ và nộp hồ sơ nhanh.',
      ja: '通関システムでレッド判定（開梱現物検査）が出たため、港湾作業員と税関検査官へ迅速に連絡調整します。',
      en: 'Customs routes container to Red Channel (physical unboxing); coordinate dock labor and customs officers promptly.'
    },
    context: {
      vi: 'Container cần thông quan trước 17h chiều để tránh phát sinh tiền lưu bãi (Demurrage) và kịp dây chuyền sản xuất.',
      ja: '夕方17時までに通関許可を取得しないとフリータイム切れでデマレージが発生します。',
      en: 'Must clear before 5:00 PM to avoid port demurrage penalties and plant line stoppages.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Nhân viên hiện trường tại Cảng (A Hùng)',
          ja: '通関現業スタッフ（フンさん）',
          en: 'On-site Customs Broker (Hung)'
        },
        promptZh: '主管，系统刚出结果，我们那水装有电机的柜子被抽中“红通”（Red Channel）查验了！',
        promptPinyin: 'Zhǔguǎn, xìtǒng gāng chū jiéguǒ, wǒmen nà shuǐ zhuāng yǒu diànjī de guìzi bèi chōuzhòng "hóng tōng" (Red Channel) cháyàn le!',
        promptTranslation: {
          vi: 'Sếp ơi, hệ thống vừa trả kết quả, container chở mô-tơ điện của mình bị dính Luồng Đỏ (Red Channel) phải kiểm hóa thực tế rồi!',
          ja: '主任、システムから判定が出ました。モーター入りのコンテナがレッドチャネル（現物検査）に指定されてしまいました！',
          en: 'Supervisor, customs system just flagged our motor container for Red Channel physical inspection!'
        },
        vocabHighlights: ['红通', '查验', '柜子'],
        options: [
          {
            text: {
              zh: '阿雄别慌！你按以下步骤处理：第一，立刻在海关系统预约今天下午最早的开箱查验时段；第二，带上全套报关单证原件、装箱单和产品实物彩色图册去查验场；第三，联系码头工人尽快吊柜到查验平台，全力配合海关开箱核对铭牌参数，务必在下班前拿到放行指令（Release Order）。',
              pinyin: 'Ā Xióng bié huāng! Nǐ àn yǐxià bùzhòu chǔlǐ: dì-yī, lìkè zài hǎiguān xìtǒng yùyuē jīntiān xiàwǔ zuìzǎo de kāixiāng cháyàn shíduàn; dì-èr, dài shàng quántào bàoguān dānzhèng yuánjiàn, zhuāngxiāngdān hé chǎnpǐn shíwù sǎisè túcè qù cháyàn chǎng; dì-sān, liánxì mǎtóu gōngrén jǐnkuài diàoguì dào cháyàn píngtái, quánlì pèihé hǎiguān kāixiāng héduì míngpái cānshù, wùbì zài xiàbān qián nádào fàngxíng zhǐlìng (Release Order).',
              translations: {
                vi: 'Hùng bình tĩnh đừng hoảng! Em làm theo các bước này: Thứ nhất, lên hệ thống hải quan đặt ngay slot kiểm hóa đầu giờ chiều nay; Thứ hai, mang đủ bộ chứng từ gốc, packing list và catalogue ảnh chụp sản phẩm thực tế ra bãi kiểm; Thứ ba, liên hệ xe nâng cảng bốc hạ cont lên bệ kiểm tra ngay, phối hợp mở thùng đối chiếu thông số trên mác máy, quyết tâm lấy lệnh thông quan (Release Order) trước giờ tan sở.',
                ja: 'フンさん、落ち着いて！次の手順で至急動いてください：① システムで本日の最速検査スロットを即時予約、② 原本書類・パッキングリスト・製品カラー写真を検査場へ持参、③ ヤード作業員にコンテナを検査台へ即時移動させ、銘板確認に全面協力して定時前に通関許可（Release Order）を取得すること。',
                en: 'Stay calm! 1) Reserve the earliest afternoon inspection slot online; 2) Bring original declaration docs, packing list, and product photo sheets; 3) Move container to inspection bay to check nameplates and obtain Release Order before closing.'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Kỹ năng chỉ đạo hiện trường xuất sắc: Giữ bình tĩnh, phân chia 3 bước cụ thể (đặt lịch, chuẩn bị tài liệu trực quan, điều phối hạ cont) giúp thông quan trơn tru.',
              ja: '✅ 見事な現場指揮官の指示。優先順位を明確にし、検査官の疑義を晴らす写真資料の準備や港湾ヤードの物理移動まで的確に網羅しています。',
              en: '✅ Superb crisis logistics leadership! Calm, step-by-step decisive instructions covering bookings, technical photo evidence, and dock crane coordination.'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  },
  {
    id: 'scen_010_contract_signing_banquet',
    category: 'communication',
    title: {
      vi: 'Nâng ly chúc mừng và phép tắc trên bàn tiệc ký kết hợp đồng',
      ja: '契約調印祝賀ディナーでの乾杯挨拶とビジネスマナー',
      en: 'Toasting Etiquette & Speeches at Contract Signing Banquet'
    },
    description: {
      vi: 'Phép tắc chúc rượu kính bề trên (ly thấp hơn), nói lời cảm ơn sự hợp tác và chúc cho đơn hàng thành công tốt đẹp.',
      ja: '祝賀会での敬意を表す乾杯マナー（相手より杯を下げる）と今後の発展を祈念するスピーチ。',
      en: 'Observe Chinese banquet etiquette (holding glass lower for respect) and deliver an inspiring partnership toast.'
    },
    context: {
      vi: 'Hai bên vừa ký xong hợp đồng ngoại thương trị giá 500,000 USD. Bữa tiệc tối là thời điểm thắt chặt quan hệ (Guanxi).',
      ja: '50万ドルの大型契約を締結後の会食。パートナーシップ（関係・グアンシー）を深める重要シーンです。',
      en: 'After signing a $500k contract, both leadership teams gather for an official celebratory dinner.'
    },
    steps: [
      {
        stepIndex: 0,
        speakerRole: {
          vi: 'Chủ tịch tập đoàn đối tác (Mr. Zhou)',
          ja: '取引先会長（周会長）',
          en: 'Partner Chairman (Mr. Zhou)'
        },
        promptZh: '今天合同顺利签署，非常感谢各位同仁的辛勤努力。来，大家把酒倒满！',
        promptPinyin: 'Jīntiān hétong shùnlì qiānshǔ, fēicháng gǎnxiè gèwèi tóngrén de xīnqín nǔlì. Lái, dàjiā bǎ jiǔ dàomǎn!',
        promptTranslation: {
          vi: 'Hôm nay hợp đồng đã được ký kết suôn sẻ, vô cùng cảm ơn sự nỗ lực làm việc của tất cả các bạn đồng nghiệp. Nào, mọi người hãy rót đầy ly!',
          ja: '本日無事に調印に至り、皆さんのご尽力に心から感謝します。さあ、杯を満たしてください！',
          en: 'Today the contract has been successfully signed; many thanks to everyone for their hard work. Come, let us fill our glasses!'
        },
        vocabHighlights: ['签署', '同仁', '辛勤'],
        options: [
          {
            text: {
              zh: '周董事长、各位领导，我谨代表我们团队借这杯美酒向您表示崇高的敬意和感谢！今天的签约只是我们精诚合作的第一步，祝愿我们双方互利共赢、生意兴隆、友谊长存！我干了，您请随意！',
              pinyin: 'Zhōu dǒngshìzhǎng, gèwèi lǐngdǎo, wǒ jǐn dàibiǎo wǒmen tuánduì jiè zhè bēi měijiǔ xiàng nín biǎoshì chónggāo de jìngyì hé gǎnxiè! Jīntiān de qiānyuè zhǐshì wǒmen jīngchéng hézuò de dì-yī bù, zhùyuàn wǒmen shuāngfāng hùlì gòngyíng, shēngyì xīnglóng, yǒuyì chángcún! Wǒ gān le, nín qǐng suíyì!',
              translations: {
                vi: 'Kính thưa Chu Chủ tịch cùng các vị lãnh đạo, tôi xin phép thay mặt toàn thể đoàn nâng ly rượu ngon này bày tỏ lòng kính trọng và cảm ơn chân thành tới quý vị! Lễ ký kết hôm nay mới chỉ là bước khởi đầu cho sự hợp tác chân thành giữa đôi bên, kính chúc hai công ty cùng nhau thắng lợi (互利共赢), làm ăn phát đạt (生意兴隆), tình hữu nghị bền lâu! Tôi xin phép cạn ly, các sếp cứ tùy ý ạ!',
                ja: '周董事長、幹部の皆様、チームを代表し敬意と感謝を込めて杯を捧げます。本日の調印は信頼関係の第一歩です。双方の相互利益と共栄（互利共赢）、商売繁盛（生意兴隆）、そして末永い友好を祈念いたします。私は飲み干しますので、皆様はどうぞご無理なさらず！',
                en: 'Chairman Zhou, distinguished leaders, on behalf of our team I raise this glass with highest respect and gratitude! Today is just the first step of sincere collaboration. To our mutual win-win success, thriving business, and enduring friendship! Bottoms up!'
              }
            },
            isRecommended: true,
            feedback: {
              vi: '✅ Đỉnh cao của văn hóa tiệc thương mại Trung Hoa! Dùng các cặp từ 4 chữ cát tường (互利共赢, 生意兴隆, 友谊长存) và đặc biệt câu kết "我干了，您请随意" (Tôi cạn ly thể hiện sự nhiệt tình, còn sếp cứ nhấp môi tùy ý) là nét văn hóa thể hiện sự tôn trọng tuyệt đối.',
              ja: '✅ 中国ビジネス宴席の完璧な作法。吉祥四字熟語を織り交ぜ、「我干了，您请随意（私は飲み干しますが、目上の貴方はご随意に）」という気遣いは最高の敬意を示します。',
              en: '✅ Quintessential Chinese business banquet etiquette! Eloquent auspicious four-character idioms, plus the respectful custom of "I will drain my cup, please drink at your leisure."'
            },
            nextStepIndex: null
          }
        ]
      }
    ]
  }
];
