/**
 * tools/append-vocab-data.js
 * Appends additional curated vocabulary items to reach 144 items (12 items per category across all 12 categories).
 */

const fs = require('fs');
const path = require('path');

// Extra items for Part 1 (basic, workplace, communication, sales_purchasing)
const extraVocab1 = [
  // --- basic additions (6) ---
  {
    id: 'bc_basic_007',
    term: '洽谈',
    pinyin: 'qiàtán',
    partOfSpeech: 'verb',
    category: 'basic',
    level: 'intermediate',
    tags: ['meeting', 'negotiation', 'business'],
    translations: {
      vi: { meaning: 'Đàm phán / Bàn bạc công việc', note: 'Dùng trong ngữ cảnh trang trọng, ví dụ bàn chuyện hợp tác làm ăn.' },
      ja: { meaning: '商談する / 協議する', note: 'ビジネスの合意形成に向けた正式な話し合い。' },
      en: { meaning: 'to negotiate / discuss business', note: 'Formal term for business talks or negotiations.' }
    },
    examples: [{
      zh: '我们欢迎贵司代表随时前来洽谈合作事宜。',
      pinyin: 'Wǒmen huānyíng guìsī dàibiǎo suíshí qiánlái qiàtán hézuò shìyí.',
      translations: {
        vi: 'Chúng tôi hoan nghênh đại diện quý công ty bất cứ lúc nào đến trao đổi, bàn bạc việc hợp tác.',
        ja: '貴社のご担当者様がいつでも提携の商談にお越しになることを歓迎いたします。',
        en: 'We welcome your representatives to visit us anytime to discuss cooperation.'
      }
    }],
    businessTip: {
      vi: '"商务洽谈" (shāngwù qiàtán) là cụm từ rất phổ biến trên thiệp mời hoặc biển phòng họp.',
      ja: '「商务洽谈」は招待状や会議室の看板で頻出する格式高い表現です。',
      en: '"商务洽谈" is frequently used on meeting invitations and boardroom signs.'
    }
  },
  {
    id: 'bc_basic_008',
    term: '关照',
    pinyin: 'guānzhào',
    partOfSpeech: 'verb',
    category: 'basic',
    level: 'beginner',
    tags: ['etiquette', 'greeting', 'guanxi'],
    translations: {
      vi: { meaning: 'Quan tâm / Chiếu cố / Giúp đỡ', note: 'Thường dùng trong câu cảm ơn hoặc kết thư xã giao.' },
      ja: { meaning: 'お引き立て / ご配慮 / お世話', note: '挨拶やメール結びでの定番敬語。' },
      en: { meaning: 'care / favor / patronage', note: 'Polite expression requesting support or thanking for patronage.' }
    },
    examples: [{
      zh: '感谢您一直以来对我司业务的大力关照。',
      pinyin: 'Gǎnxiè nín yīzhí yǐlái duì wǒsī yèwù de dàlì guānzhào.',
      translations: {
        vi: 'Cảm ơn quý vị thời gian qua đã luôn hết lòng quan tâm, ủng hộ việc kinh doanh của công ty chúng tôi.',
        ja: '平素は弊社の事業に格別のご高配を賜り、心より御礼申し上げます。',
        en: 'Thank you for your continuous support and patronage of our business.'
      }
    }],
    businessTip: {
      vi: 'Cụm từ "请多关照" (Qǐng duō guānzhào) tương đương với "Xin nhờ giúp đỡ / よろしくお願いします".',
      ja: '「请多关照」は日本語の「どうぞよろしくお願いいたします」に相当します。',
      en: '"请多关照" corresponds to the traditional polite request for ongoing goodwill and assistance.'
    }
  },
  {
    id: 'bc_basic_009',
    term: '董事长',
    pinyin: 'dǒngshìzhǎng',
    partOfSpeech: 'noun',
    category: 'basic',
    level: 'intermediate',
    tags: ['title', 'executive', 'hierarchy'],
    translations: {
      vi: { meaning: 'Chủ tịch Hội đồng Quản trị', note: 'Người đứng đầu cấp cao nhất của một công ty cổ phần.' },
      ja: { meaning: '会長 / 取締役会長', note: '企業の最高意思決定機関のトップ。' },
      en: { meaning: 'Chairman of the Board', note: 'Highest-ranking executive officer heading the board.' }
    },
    examples: [{
      zh: '李董事长亲自出席了本次中越经贸交流会。',
      pinyin: 'Lǐ dǒngshìzhǎng qīnzì chūxí le běncì Zhōng-Yuè jīngmào jiāoliúhuì.',
      translations: {
        vi: 'Chủ tịch Lý đã đích thân tham dự hội nghị giao lưu kinh tế thương mại Trung - Việt lần này.',
        ja: '李会長は今回の中越経済貿易交流会に親しく出席されました。',
        en: 'Chairman Li personally attended this China-Vietnam trade exchange symposium.'
      }
    }],
    businessTip: {
      vi: 'Khi xưng hô trực tiếp với Chủ tịch, luôn dùng [Họ + 董事长], ví dụ: "李董" hoặc "李董事长".',
      ja: '呼びかける際は「李董」や「李董事长」のように名字を冠して敬称とします。',
      en: 'Address board chairs formally as [Surname + 董事长] or colloquial abbreviation [Surname + 董].'
    }
  },
  {
    id: 'bc_basic_010',
    term: '客户',
    pinyin: 'kèhù',
    partOfSpeech: 'noun',
    category: 'basic',
    level: 'beginner',
    tags: ['sales', 'client', 'relationship'],
    translations: {
      vi: { meaning: 'Khách hàng', note: 'Từ chỉ đối tác, người mua hoặc người sử dụng dịch vụ.' },
      ja: { meaning: '顧客 / クライアント / お客様', note: '取引先や利用者を指す最も一般的な語。' },
      en: { meaning: 'client / customer', note: 'Standard term for commercial client or account.' }
    },
    examples: [{
      zh: '满足客户的个性化定制需求是我们的核心优势。',
      pinyin: 'Mǎnzú kèhù de gèxìnghuà dìngzhì xūqiú shì wǒmen de héxīn yōushì.',
      translations: {
        vi: 'Đáp ứng nhu cầu đặt làm riêng theo yêu cầu của khách hàng là ưu thế cốt lõi của chúng tôi.',
        ja: 'お客様の個別カスタマイズ要求を満たすことが弊社の強みです。',
        en: 'Fulfilling customized client requirements is our core competitive advantage.'
      }
    }],
    businessTip: {
      vi: 'Khách hàng lớn quan trọng gọi là "大客户" (Key Account / VIP Client).',
      ja: '大口取引先や最重要顧客は「大客户（キーアカウント）」と呼びます。',
      en: 'Major enterprise accounts are commonly referred to as "大客户".'
    }
  },
  {
    id: 'bc_basic_011',
    term: '汇款账户',
    pinyin: 'huìkuǎn zhànghù',
    partOfSpeech: 'noun',
    category: 'basic',
    level: 'intermediate',
    tags: ['bank', 'payment', 'finance'],
    translations: {
      vi: { meaning: 'Tài khoản chuyển tiền / thụ hưởng', note: 'Thông tin tài khoản ngân hàng để đối tác gửi tiền thanh toán.' },
      ja: { meaning: '送金先口座 / 振込口座', note: '国際送金や銀行決済の振込先情報。' },
      en: { meaning: 'remittance bank account', note: 'Designated bank account coordinates for wire transfers.' }
    },
    examples: [{
      zh: '形式发票底部附有我司的美元汇款账户信息及SWIFT代码。',
      pinyin: 'Xíngshì fāpiào dǐbù fùyǒu wǒsī de Měiyuán huìkuǎn zhànghù xìnxī jí SWIFT dàimǎ.',
      translations: {
        vi: 'Phía dưới cùng của hóa đơn chiếu lệ có kèm thông tin tài khoản chuyển tiền USD và mã SWIFT của chúng tôi.',
        ja: 'プロフォーマインボイスの下部に弊社の米ドル送金口座情報とSWIFTコードが記載されています。',
        en: 'Our USD remittance bank coordinates and SWIFT code are appended at the bottom of the PI.'
      }
    }],
    businessTip: {
      vi: 'Luôn kiểm tra kỹ tên thụ hưởng (Beneficiary Name) khớp từng chữ với đăng ký mở tài khoản ngân hàng.',
      ja: '受取人名義（Beneficiary Name）は銀行登録名と1文字の相違もなく完全一致させる必要があります。',
      en: 'Ensure the beneficiary name matches the bank registration verbatim to avoid wire rejections.'
    }
  },
  {
    id: 'bc_basic_012',
    term: '顺祝商祺',
    pinyin: 'shùnzhù shāngqí',
    partOfSpeech: 'phrase',
    category: 'basic',
    level: 'intermediate',
    tags: ['salutation', 'email', 'etiquette'],
    translations: {
      vi: { meaning: 'Kính chúc quý công ty kinh doanh thuận lợi / làm ăn phát đạt', note: 'Lời chúc truyền thống trang trọng đặt ở dòng cuối cùng của email thương mại.' },
      ja: { meaning: '貴社のますますのご発展をお祈り申し上げます', note: '中国語ビジネスレター・メールの格式高い結びの挨拶。' },
      en: { meaning: 'Best regards and wishing you prosperous business', note: 'Classic formal complimentary close in Chinese business letters.' }
    },
    examples: [{
      zh: '再次感谢您的支持！顺祝商祺！',
      pinyin: 'Zàicì gǎnxiè nín de zhīchí! Shùnzhù shāngqí!',
      translations: {
        vi: 'Một lần nữa cảm ơn sự ủng hộ của quý vị! Kính chúc quý công ty phát tài!',
        ja: '重ねてご支援に御礼申し上げます。貴社のますますのご清栄をお祈りいたします。',
        en: 'Thank you again for your kind support! Wishing you prosperous business!'
      }
    }],
    businessTip: {
      vi: 'Trong văn bản trang trọng cổ điển, "顺祝" thường đứng cuối dòng văn bản, còn "商祺" xuống dòng thụt vào 2 ô.',
      ja: '伝統的な書簡形式では「顺祝」を本文末尾に置き、「商祺」を改行して2文字下げで配置します。',
      en: 'In classical formatting, 顺祝 sits at the paragraph end, while 商祺 begins on the next indented line.'
    }
  },

  // --- workplace additions (7) ---
  {
    id: 'bc_work_006',
    term: '考勤',
    pinyin: 'kǎoqín',
    partOfSpeech: 'noun',
    category: 'workplace',
    level: 'intermediate',
    tags: ['hr', 'attendance', 'work'],
    translations: {
      vi: { meaning: 'Chấm công / Điểm danh đi làm', note: 'Hệ thống theo dõi thời gian làm việc của nhân viên.' },
      ja: { meaning: '勤怠管理 / 出欠確認', note: '出社時間や勤務状況の記録・管理。' },
      en: { meaning: 'time and attendance', note: 'Tracking employee working hours and presence.' }
    },
    examples: [{
      zh: '公司实行打卡考勤制度，每月准时发放全勤奖。',
      pinyin: 'Gōngsī shíxíng dǎkǎ kǎoqín zhìdù, měiyuè zhǔnshí fāfàng quánqín jiǎng.',
      translations: {
        vi: 'Công ty áp dụng chế độ chấm công quẹt thẻ, hàng tháng phát thưởng chuyên cần đúng hạn.',
        ja: '弊社ではタイムカード勤怠制度を実施しており、毎月皆勤手当を支給しています。',
        en: 'The company enforces timecard attendance and awards monthly perfect attendance bonuses.'
      }
    }],
    businessTip: {
      vi: '"全勤奖" (quánqín jiǎng) là tiền thưởng chuyên cần khi không đi muộn về sớm ngày nào trong tháng.',
      ja: '「全勤奖」は無遅刻無欠勤に対する皆勤手当を指します。',
      en: '"全勤奖" is the monthly perfect attendance bonus for zero tardiness.'
    }
  },
  {
    id: 'bc_work_007',
    term: '请假',
    pinyin: 'qǐngjià',
    partOfSpeech: 'verb',
    category: 'workplace',
    level: 'beginner',
    tags: ['leave', 'hr', 'daily'],
    translations: {
      vi: { meaning: 'Xin nghỉ phép', note: 'Xin phép vắng mặt tại nơi làm việc có lý do.' },
      ja: { meaning: '休暇を申請する / 休みを取る', note: '有給休暇や病欠の手続きを行うこと。' },
      en: { meaning: 'to request leave of absence', note: 'Formally asking for time off work.' }
    },
    examples: [{
      zh: '我下周需要请两天年假处理个人私事。',
      pinyin: 'Wǒ xiàzhōu xūyào qǐng liǎng tiān niánjià chǔlǐ gèrén sīshì.',
      translations: {
        vi: 'Tuần sau tôi cần xin nghỉ phép năm 2 ngày để giải quyết việc riêng gia đình.',
        ja: '来週私用のため年次有給休暇を2日取得したいです。',
        en: 'I need to take two days of annual leave next week to handle personal affairs.'
      }
    }],
    businessTip: {
      vi: 'Nghỉ ốm là "病假" (bìngjià), nghỉ việc riêng là "事假" (shìjià), nghỉ phép năm là "年假" (niánjià).',
      ja: '病欠は「病假」、私用欠勤は「事假」、有給休暇は「年假」と使い分けます。',
      en: 'Sick leave is 病假, personal leave is 事假, and annual paid vacation is 年假.'
    }
  },
  {
    id: 'bc_work_008',
    term: '汇报',
    pinyin: 'huìbào',
    partOfSpeech: 'verb',
    category: 'workplace',
    level: 'intermediate',
    tags: ['reporting', 'management', 'hierarchy'],
    translations: {
      vi: { meaning: 'Báo cáo công việc với cấp trên', note: 'Trình bày kết quả, tình hình thực hiện dự án cho quản lý.' },
      ja: { meaning: '報告する / 報告（ほうれんそう）', note: '上司や関係者に業務進捗や成果を報告すること。' },
      en: { meaning: 'to report / brief superiors', note: 'Presenting progress or project findings up the management chain.' }
    },
    examples: [{
      zh: '每周五下午，各部门主管需要向总经理汇报本周工作成果。',
      pinyin: 'Měizhōu wǔ xiàwǔ, gè bùmén zhǔguǎn xūyào xiàng zǒngjīnglǐ huìbào běnzhōu gōngzuò chéngguǒ.',
      translations: {
        vi: 'Chiều thứ Sáu hàng tuần, trưởng các bộ phận cần báo cáo kết quả công việc tuần này với Tổng giám đốc.',
        ja: '毎週金曜日の午後に各部門長が総経理へ週報を報告します。',
        en: 'Every Friday afternoon, department heads report weekly achievements to the General Manager.'
      }
    }],
    businessTip: {
      vi: 'Cấp dưới báo cáo lên cấp trên dùng "汇报" (huìbào); cấp trên thông báo xuống dưới dùng "通知" (tōngzhī).',
      ja: '部下から上司へは「汇报」を使い、上司から部下への伝達は「通知」を用います。',
      en: 'Use 汇报 for reporting upward to bosses; use 通知 for downward notifications.'
    }
  },
  {
    id: 'bc_work_009',
    term: '绩效考核',
    pinyin: 'jìxiào kǎohé',
    partOfSpeech: 'noun',
    category: 'workplace',
    level: 'advanced',
    tags: ['hr', 'kpi', 'evaluation'],
    translations: {
      vi: { meaning: 'Đánh giá hiệu suất công việc (KPI / Performance Appraisal)', note: 'Xét duyệt năng lực và kết quả làm việc định kỳ.' },
      ja: { meaning: '人事評価 / 業績考課（KPI評価）', note: '社員の業績や能力を定期的に査定する制度。' },
      en: { meaning: 'performance evaluation / appraisal', note: 'Periodic review of employee KPI achievements.' }
    },
    examples: [{
      zh: '季度绩效考核结果将直接影响年终奖金的发放比例。',
      pinyin: 'Jìdù jìxiào kǎohé jiéguǒ jiāng zhíjiē yǐngxiǎng niánzhōng jiāngjīn de fāfàng bǐlì.',
      translations: {
        vi: 'Kết quả đánh giá hiệu suất quý sẽ ảnh hưởng trực tiếp đến tỷ lệ nhận tiền thưởng cuối năm.',
        ja: '四半期の人事評価結果は期末賞与の支給率に直接反映されます。',
        en: 'Quarterly performance appraisals directly determine year-end bonus allocations.'
      }
    }],
    businessTip: {
      vi: 'Thường viết tắt là "绩效" (jìxiào - performance).',
      ja: '実務では「绩效」と略称されることが一般的です。',
      en: 'Frequently abbreviated simply as 绩效 in workplace discussions.'
    }
  },
  {
    id: 'bc_work_010',
    term: '报销',
    pinyin: 'bàoxiāo',
    partOfSpeech: 'verb',
    category: 'workplace',
    level: 'intermediate',
    tags: ['finance', 'expense', 'admin'],
    translations: {
      vi: { meaning: 'Thanh toán lại công tác phí / Hoàn ứng chi phí', note: 'Nộp hóa đơn để công ty hoàn trả tiền đã chi cho công việc.' },
      ja: { meaning: '経費精算する', note: '出張旅費や立替経費を経理に申請して精算すること。' },
      en: { meaning: 'to submit expense reimbursement', note: 'Claiming reimbursement for business-related expenditures.' }
    },
    examples: [{
      zh: '请出差同事在月底前把所有正规发票贴好办理报销。',
      pinyin: 'Qǐng chūchāi tóngshì zài yuèdǐ qián bǎ suǒyǒu zhèngguī fāpiào tiē hǎo bànlǐ bàoxiāo.',
      translations: {
        vi: 'Xin mời các bạn đi công tác dán hóa đơn đỏ hợp lệ trước cuối tháng để làm thủ tục thanh toán hoàn ứng.',
        ja: '出張された方は月末までに正規の領収書を添付して経費精算を完了してください。',
        en: 'Colleagues on business trips must attach valid invoices for expense reimbursement before month-end.'
      }
    }],
    businessTip: {
      vi: 'Tại Trung Quốc bắt buộc phải có hóa đơn đỏ điện tử chính thức ("发票" fāpiào) mới được làm thủ tục hoàn phí.',
      ja: '中国では税務署公認の「发票（増値税専用発票等）」がないと原則経費計上できません。',
      en: 'Official government fapiao invoices are strictly required to substantiate tax deductible reimbursements.'
    }
  },
  {
    id: 'bc_work_011',
    term: '业务',
    pinyin: 'yèwù',
    partOfSpeech: 'noun',
    category: 'workplace',
    level: 'beginner',
    tags: ['business', 'operation', 'sales'],
    translations: {
      vi: { meaning: 'Nghiệp vụ / Hoạt động kinh doanh', note: 'Phạm vi ngành nghề hoặc thao tác công việc của công ty.' },
      ja: { meaning: '業務 / 営業 / 事業', note: '会社の事業領域や日常的な実務のこと。' },
      en: { meaning: 'business / professional operations', note: 'Commercial activities, operations, or sales lines.' }
    },
    examples: [{
      zh: '近年来我司在东南亚地区的跨境电商业务增长非常迅速。',
      pinyin: 'Jìnniánlái wǒsī zài Dōngnányà dìqū de kuàjìng diànshāng yèwù zēngzhǎng fēicháng xùnsù.',
      translations: {
        vi: 'Những năm gần đây mảng kinh doanh thương mại điện tử xuyên biên giới của chúng tôi tại Đông Nam Á tăng trưởng rất nhanh.',
        ja: '近年、東南アジアにおける越境EC事業が急速に成長しております。',
        en: 'In recent years our cross-border e-commerce operations in Southeast Asia have expanded rapidly.'
      }
    }],
    businessTip: {
      vi: 'Nhân viên kinh doanh/sales thường được gọi tắt là "业务员" (yèwù yuán).',
      ja: '営業担当者・セールスマンは一般に「业务员」と呼ばれます。',
      en: 'Sales reps and account executives are customarily called 业务员.'
    }
  },
  {
    id: 'bc_work_012',
    term: '交接',
    pinyin: 'jiāojiē',
    partOfSpeech: 'verb',
    category: 'workplace',
    level: 'intermediate',
    tags: ['transition', 'handover', 'hr'],
    translations: {
      vi: { meaning: 'Bàn giao công việc', note: 'Chuyển giao tài liệu, đầu việc khi nghỉ phép hoặc chuyển vị trí.' },
      ja: { meaning: '業務の引き継ぎを行う', note: '異動や退職に伴い後任者へ業務を引き渡すこと。' },
      en: { meaning: 'to handover / transfer duties', note: 'Transitioning job responsibilities and documentation.' }
    },
    examples: [{
      zh: '在休产假之前，她已经把所有重点客户的跟进工作详细交接给了小张。',
      pinyin: 'Zài xiū chǎnjià zhīqián, tā yǐjīng bǎ suǒyǒu zhòngdiǎn kèhù de gēnjìn gōngzuò xiángxì jiāojiē gěi le xiǎo Zhāng.',
      translations: {
        vi: 'Trước khi nghỉ sinh, cô ấy đã bàn giao chi tiết toàn bộ việc chăm sóc các khách hàng trọng điểm cho bạn Trương.',
        ja: '産休に入る前に、主要顧客のフォロー業務をすべて張さんへ詳細に引き継ぎました。',
        en: 'Before maternity leave, she thoroughly handed over all key account follow-up tasks to Zhang.'
      }
    }],
    businessTip: {
      vi: 'Văn bản bàn giao gọi là "工作交接单" (gōngzuò jiāojiē dān).',
      ja: '引き継ぎ書は「工作交接单」と呼びます。',
      en: 'Formal handover checklists are known as 工作交接单.'
    }
  },

  // --- communication additions (7) ---
  {
    id: 'bc_comm_006',
    term: '探讨',
    pinyin: 'tàntǎo',
    partOfSpeech: 'verb',
    category: 'communication',
    level: 'intermediate',
    tags: ['discussion', 'brainstorm', 'polite'],
    translations: {
      vi: { meaning: 'Thảo luận / Nghiên cứu bàn bạc sâu', note: 'Từ ngữ học thuật, nhã nhặn khi cùng đối tác tìm phương án.' },
      ja: { meaning: '検討する / 協議する / 掘り下げて話し合う', note: '双方で建設的に意見交換すること。' },
      en: { meaning: 'to explore / probe / discuss in depth', note: 'Constructive intellectual exploration of business ideas.' }
    },
    examples: [{
      zh: '我们希望能与贵司共同探讨降低物流成本的创新方案。',
      pinyin: 'Wǒmen xīwàng néng yǔ guìsī gòngtóng tàntǎo jiàngdī wùliú chéngběn de chuàngxīn fāng\'àn.',
      translations: {
        vi: 'Chúng tôi hy vọng có thể cùng quý công ty thảo luận sâu về phương án đổi mới nhằm giảm chi phí logistics.',
        ja: '貴社とともに物流コスト削減に向けた革新的な解決策を検討したいと考えております。',
        en: 'We hope to explore innovative logistics cost-saving solutions together with your team.'
      }
    }],
    businessTip: {
      vi: 'Dùng "探讨" tạo cảm giác tôn trọng, bình đẳng và tìm kiếm giải pháp có lợi cho cả 2 bên (win-win).',
      ja: '「探讨」は対等なパートナーシップで知恵を出し合う前向きなニュアンスを持ちます。',
      en: 'Using 探讨 conveys collaborative partnership rather than confrontational demands.'
    }
  },
  {
    id: 'bc_comm_007',
    term: '妥协',
    pinyin: 'tuǒxié',
    partOfSpeech: 'verb',
    category: 'communication',
    level: 'intermediate',
    tags: ['negotiation', 'compromise'],
    translations: {
      vi: { meaning: 'Thỏa hiệp / Nhượng bộ', note: 'Mỗi bên lùi một bước để đi đến thỏa thuận chung.' },
      ja: { meaning: '妥協する / 歩み寄る', note: '交渉において双方が譲歩して合意に至ること。' },
      en: { meaning: 'to compromise / make mutual concessions', note: 'Yielding ground to achieve consensus.' }
    },
    examples: [{
      zh: '在付款方式上双方各妥协一步，最终达成了满意的协议。',
      pinyin: 'Zài fùkuǎn fāngshì shàng shuāngfāng gè tuǒxié yī bù, zuìzhōng dáchéng le mǎnyì de xiéyì.',
      translations: {
        vi: 'Về phương thức thanh toán, mỗi bên nhượng bộ một bước, cuối cùng đã đạt được thỏa thuận mỹ mãn.',
        ja: '決済条件について双方が一歩ずつ歩み寄り、最終的に納得のいく合意に達しました。',
        en: 'Both parties compromised on payment terms, ultimately reaching a mutually satisfactory accord.'
      }
    }],
    businessTip: {
      vi: 'Thành ngữ ngoại thương rất hay dùng: "双方各让一步" (shuāngfāng gè ràng yī bù - đôi bên mỗi người lùi một bước).',
      ja: '「双方各让一步（互いに一歩ずつ譲り合う）」は交渉妥結の常套句です。',
      en: 'The negotiation idiom "双方各让一步" (both sides take one step back) reflects ideal compromise.'
    }
  },
  {
    id: 'bc_comm_008',
    term: '答复',
    pinyin: 'dáfù',
    partOfSpeech: 'noun',
    category: 'communication',
    level: 'intermediate',
    tags: ['reply', 'response', 'written'],
    translations: {
      vi: { meaning: 'Câu trả lời chính thức / Hồi đáp', note: 'Văn bản phản hồi chính thức về một yêu cầu hay báo giá.' },
      ja: { meaning: '正式回答 / 返答', note: '照会や提案に対する公式な回答。' },
      en: { meaning: 'formal response / official reply', note: 'Written official answer to business inquiries.' }
    },
    examples: [{
      zh: '请在下周二下班前给我们一个明确的答复。',
      pinyin: 'Qǐng zài xiàzhōu èr xiàbān qián gěi wǒmen yī gè míngquè de dáfù.',
      translations: {
        vi: 'Xin vui lòng cho chúng tôi một câu trả lời dứt khoát trước giờ tan sở thứ Ba tuần tới.',
        ja: '来週火曜日の終業時間までに明確なご回答をいただけますようお願いいたします。',
        en: 'Please provide us with a definitive response before the close of business next Tuesday.'
      }
    }],
    businessTip: {
      vi: '"敬请答复" (jìngqǐng dáfù) là câu đề nghị lịch sự: "Kính mong hồi âm".',
      ja: '「敬请答复」は回答を促す礼儀正しい依頼表現です。',
      en: '"敬请答复" is a courteous closing phrase urging a prompt official response.'
    }
  },
  {
    id: 'bc_comm_009',
    term: '致歉',
    pinyin: 'zhìqiàn',
    partOfSpeech: 'verb',
    category: 'communication',
    level: 'intermediate',
    tags: ['apology', 'etiquette', 'formal'],
    translations: {
      vi: { meaning: 'Gửi lời xin lỗi chân thành', note: 'Văn phong trang trọng dùng khi doanh nghiệp gây ra bất tiện cho khách.' },
      ja: { meaning: 'お詫び申し上げる / 謝意を表す', note: '不手際や迷惑に対する正式な謝罪。' },
      en: { meaning: 'to express apologies / extend regrets', note: 'Formal expression of sincere regret or apology.' }
    },
    examples: [{
      zh: '对于此次发货延迟给贵司带来的不便，我们深表致歉。',
      pinyin: 'Duìyú cǐcì fāhuò yánchí gěi guìsī dàilái de bùbiàn, wǒmen shēnbiǎo zhìqiàn.',
      translations: {
        vi: 'Đối với những bất tiện do chậm trễ giao hàng đợt này gây ra cho quý công ty, chúng tôi xin bày tỏ lời xin lỗi sâu sắc.',
        ja: '今回の出荷遅延により貴社にご迷惑をおかけしましたことを深くお詫び申し上げます。',
        en: 'We sincerely apologize for any inconvenience caused to your company by this shipment delay.'
      }
    }],
    businessTip: {
      vi: 'Trong thư trang trọng, không dùng "对不起", mà luôn dùng "深表歉意" (shēn biǎo qiànyì) hoặc "向您致歉".',
      ja: 'ビジネスメールでは口語の「对不起」を避け、「深表歉意」や「致歉」を用います。',
      en: 'Avoid conversational 对不起 in formal letters; use 深表歉意 or 谨致歉意 instead.'
    }
  },
  {
    id: 'bc_comm_010',
    term: '误解',
    pinyin: 'wùjiě',
    partOfSpeech: 'noun',
    category: 'communication',
    level: 'intermediate',
    tags: ['misunderstanding', 'clarification'],
    translations: {
      vi: { meaning: 'Hiểu lầm / Ngộ nhận', note: 'Sai sót về mặt thông tin truyền tải trong giao dịch.' },
      ja: { meaning: '誤解 / 食い違い', note: '意思疎通の齟齬や不一致。' },
      en: { meaning: 'misunderstanding', note: 'Misinterpretation or divergence in communication.' }
    },
    examples: [{
      zh: '为避免由于语言差异产生误解，我们建议以中英文对照版本为准。',
      pinyin: 'Wèi bìmiǎn yóuyú yǔyán chāyì chǎnshēng wùjiě, wǒmen jiànyì yǐ Zhōng-Yīngwén duìzhào bǎnběn wéi zhǔ.',
      translations: {
        vi: 'Để tránh những hiểu lầm do bất đồng ngôn ngữ, chúng tôi đề xuất lấy bản đối chiếu song ngữ Trung - Anh làm chuẩn.',
        ja: '言語の違いによる誤解を防ぐため、中英対訳版を正本とすることを提案します。',
        en: 'To avoid misunderstandings arising from language differences, we recommend bilingual Chinese-English versions.'
      }
    }],
    businessTip: {
      vi: 'Khi muốn làm rõ thông tin, hãy nói: "为避免误解，我们特此澄清..." (Để tránh hiểu lầm, chúng tôi xin làm rõ...).',
      ja: '「为避免误解（誤解を避けるため）」は前提確認時の便利な定型表現です。',
      en: 'Prepend clarifications with "为避免误解" to maintain diplomatic politeness.'
    }
  },
  {
    id: 'bc_comm_011',
    term: '坦诚',
    pinyin: 'tǎnchéng',
    partOfSpeech: 'adjective',
    category: 'communication',
    level: 'advanced',
    tags: ['attitude', 'sincerity', 'trust'],
    translations: {
      vi: { meaning: 'Thẳng thắn, chân thành', note: 'Thái độ cởi mở, không giấu giếm khó khăn khi làm việc cùng đối tác.' },
      ja: { meaning: '率直かつ誠実な / 腹を割った', note: '虚飾のないオープンで誠意ある姿勢。' },
      en: { meaning: 'candid / frank and sincere', note: 'Approaching discussions with transparency and honest goodwill.' }
    },
    examples: [{
      zh: '感谢您坦诚相告，这让我们能够更快地制定针对性的解决方案。',
      pinyin: 'Gǎnxiè nín tǎnchéng xiānggào, zhè ràng wǒmen nénggòu gèng kuài de zhìdìng zhēnduìxìng de jiějuéfāng\'àn.',
      translations: {
        vi: 'Cảm ơn anh đã chia sẻ thẳng thắn, điều này giúp chúng tôi nhanh chóng xây dựng được giải pháp phù hợp.',
        ja: '率直にお話しいただき感謝いたします。これにより迅速に対策を策定することができます。',
        en: 'Thank you for your candid communication, enabling us to formulate targeted countermeasures promptly.'
      }
    }],
    businessTip: {
      vi: '"坦诚相待" (đối đãi chân thành thẳng thắn) là phẩm chất được các doanh nhân Trung Quốc rất coi trọng.',
      ja: '「坦诚相待（誠意をもって腹を割って接する）」は中国商習慣で重視される徳目です。',
      en: 'Demonstrating candor ("坦诚相待") builds long-term relational goodwill.'
    }
  },
  {
    id: 'bc_comm_012',
    term: '反馈',
    pinyin: 'fǎnkuì',
    partOfSpeech: 'noun',
    category: 'communication',
    level: 'beginner',
    tags: ['feedback', 'market', 'evaluation'],
    translations: {
      vi: { meaning: 'Phản hồi / Nhận xét đánh giá', note: 'Ý kiến đóng góp từ khách hàng sau khi dùng thử hàng mẫu hoặc dịch vụ.' },
      ja: { meaning: 'フィードバック / 感想・意見', note: 'サンプル使用感や市場反応などの意見提供。' },
      en: { meaning: 'feedback / user comments', note: 'Input or reactions provided after evaluating samples or proposals.' }
    },
    examples: [{
      zh: '收到样品测试后，请及时把实际使用反馈发给我们技术人员。',
      pinyin: 'Shōudào yàngpǐn cèshì hòu, qǐng jíshí bǎ shíjì shǐyòng fǎnkuì fā gěi wǒmen jìshù rényuán.',
      translations: {
        vi: 'Sau khi nhận và kiểm tra hàng mẫu, xin vui lòng gửi ngay phản hồi sử dụng thực tế cho nhân viên kỹ thuật của chúng tôi.',
        ja: 'サンプル評価後、実際の使用感を速やかに弊社の技術担当者までフィードバックしてください。',
        en: 'After testing the samples, please share practical usage feedback with our engineering team promptly.'
      }
    }],
    businessTip: {
      vi: '"及时反馈" (Jíshí fǎnkuì) nghĩa là "phản hồi kịp thời", cụm từ cực kỳ thông dụng.',
      ja: '「及时反馈」は迅速な報告・返答を求める頻出フレーズです。',
      en: '"及时反馈" is the ubiquitous business phrase for providing timely evaluations.'
    }
  },

  // --- sales_purchasing additions (7) ---
  {
    id: 'bc_sales_006',
    term: '批发',
    pinyin: 'pīfā',
    partOfSpeech: 'verb',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['wholesale', 'trading', 'price'],
    translations: {
      vi: { meaning: 'Bán buôn / Bán sỉ', note: 'Bán số lượng lớn cho đại lý với giá chiết khấu.' },
      ja: { meaning: '卸売りする / 卸売', note: '小売業者や大量購入者への大口販売。' },
      en: { meaning: 'wholesale', note: 'Selling goods in large quantities at discounted prices.' }
    },
    examples: [{
      zh: '我们是厂家直销，主要承接大额批发和跨境电商订单。',
      pinyin: 'Wǒmen shì chǎngjiā zhíxiāo, zhǔyào chéngjiē dà\'é pīfā hé kuàjìng diànshāng dìngdān.',
      translations: {
        vi: 'Chúng tôi là xưởng bán trực tiếp, chủ yếu nhận các đơn bán buôn số lượng lớn và thương mại điện tử xuyên biên giới.',
        ja: '弊社はメーカー直販であり、大口卸売および越境ECの注文を主に承っております。',
        en: 'We are direct manufacturers primarily fulfilling large-scale wholesale and e-commerce orders.'
      }
    }],
    businessTip: {
      vi: 'Giá bán buôn là "批发价" (pīfā jià), đối lập với giá bán lẻ là "零售价" (língshòu jià).',
      ja: '卸価格は「批发价」、小売価格は「零售价」です。',
      en: 'Wholesale price is 批发价; retail price is 零售价.'
    }
  },
  {
    id: 'bc_sales_007',
    term: '零售',
    pinyin: 'língshòu',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['retail', 'consumer', 'price'],
    translations: {
      vi: { meaning: 'Bán lẻ', note: 'Bán trực tiếp từng đơn vị sản phẩm tới tay người tiêu dùng cuối cùng.' },
      ja: { meaning: '小売 / リテール', note: '一般消費者に向けた単品販売。' },
      en: { meaning: 'retail', note: 'Direct sale of goods in small quantities to end consumers.' }
    },
    examples: [{
      zh: '建议零售价（MSRP）定在每台99美元，以确保经销商有充足的利润空间。',
      pinyin: 'Jiànyì língshòujià (MSRP) dìng zài měi tái jiǔshíjiǔ Měiyuán, yǐ quèbǎo jīngxiāoshāng yǒu chōngzú de lìrùn kōngjiān.',
      translations: {
        vi: 'Giá bán lẻ đề xuất (MSRP) được ấn định ở mức 99 USD/chiếc để đảm bảo các nhà phân phối có biên độ lợi nhuận dồi dào.',
        ja: '代理店の十分な利益率を確保するため、希望小売価格（MSRP）は1台99ドルに設定されています。',
        en: 'The manufacturer suggested retail price (MSRP) is set at $99 to protect distributor profit margins.'
      }
    }],
    businessTip: {
      vi: '"新零售" (New Retail) là xu thế kết hợp thương mại điện tử trực tuyến và cửa hàng trải nghiệm truyền thống.',
      ja: '「新零售（ニューリテール）」はオンラインとオフラインを融合した次世代流通モデルです。',
      en: '"新零售" represents the omni-channel integration of online and brick-and-mortar commerce.'
    }
  },
  {
    id: 'bc_sales_008',
    term: '现货',
    pinyin: 'xiànhuò',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'intermediate',
    tags: ['inventory', 'stock', 'spot'],
    translations: {
      vi: { meaning: 'Hàng có sẵn trong kho / Hàng giao ngay (In-stock / Ready to ship)', note: 'Hàng hóa đã sản xuất xong, sẵn sàng đóng gói xuất kho ngay.' },
      ja: { meaning: '在庫あり / 現物商品 / 即納可能品', note: '倉庫に現品在庫があり即出荷できる商品。' },
      en: { meaning: 'spot goods / ready stock', note: 'Goods physically available for immediate dispatch.' }
    },
    examples: [{
      zh: '这款黑色充电器目前仓库有5,000个现货，付款后48小时内即可出库。',
      pinyin: 'Zhè kuǎn hēisè chōngdiànqì mùqián cāngkù yǒu wǔqiān gè xiànhuò, fùkuǎn hòu sìshíbā xiǎoshí nèi jíkě chūkù.',
      translations: {
        vi: 'Mẫu củ sạc màu đen này hiện trong kho có sẵn 5.000 chiếc, sau khi thanh toán trong vòng 48 giờ có thể xuất kho ngay.',
        ja: 'この黒の充電器は倉庫に5,000個の在庫があり、ご入金確認後48時間以内に出荷可能です。',
        en: 'This black charger has 5,000 units in stock, ready for dispatch within 48 hours of payment.'
      }
    }],
    businessTip: {
      vi: '"现货" (hàng sẵn) đối lập với "期货" (qīhuò - hàng đặt trước tương lai mới sản xuất xong).',
      ja: '「现货（現物在庫）」の対義語は「期货（先物・受注生産品）」です。',
      en: '现货 (spot inventory) is contrasted with 期货 (forward contract or custom manufactured).'
    }
  },
  {
    id: 'bc_sales_009',
    term: '期货',
    pinyin: 'qīhuò',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'intermediate',
    tags: ['forward', 'manufacturing', 'leadtime'],
    translations: {
      vi: { meaning: 'Hàng đặt sản xuất trước (giao theo kỳ hạn)', note: 'Hàng chưa có sẵn trong kho, nhận cọc xong nhà xưởng mới lên dây chuyền sản xuất.' },
      ja: { meaning: '受注生産品 / 先物商品', note: '発注・前金入金後に工場で製造手配される製品。' },
      en: { meaning: 'futures / forward made-to-order goods', note: 'Manufactured against custom orders and delivered after lead time.' }
    },
    examples: [{
      zh: '定制外观颜色属于期货，生产周期大约需要25个工作日。',
      pinyin: 'Dìngzhì wàiguān yánsè shǔyú qīhuò, shēngchǎn zhōuqī dàyuē xūyào èrshíwǔ gè gōngzuòrì.',
      translations: {
        vi: 'Màu sắc vỏ làm theo yêu cầu riêng thuộc diện hàng đặt trước, chu kỳ sản xuất ước tính cần khoảng 25 ngày làm việc.',
        ja: '特注カラー仕様は受注生産となり、製造リードタイムは約25営業日かかります。',
        en: 'Customized casing colors are manufactured to order with an estimated lead time of 25 working days.'
      }
    }],
    businessTip: {
      vi: 'Với hàng "期货", người mua bắt buộc phải xác nhận kỹ thời gian giao hàng (交期 - jiāoqī).',
      ja: '「期货」の場合は契約時に出荷納期（交期）の確約を厳密に行います。',
      en: 'For forward production (期货), meticulously lock down the delivery schedule (交期).'
    }
  },
  {
    id: 'bc_sales_010',
    term: '包装',
    pinyin: 'bāozhuāng',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'beginner',
    tags: ['packing', 'carton', 'shipping'],
    translations: {
      vi: { meaning: 'Đóng gói / Bao bì', note: 'Hộp sản phẩm, thùng carton bảo vệ hàng hóa trong vận chuyển.' },
      ja: { meaning: '梱包 / パッケージ / 包装', note: '製品の個装箱や輸送用段ボール。' },
      en: { meaning: 'packaging / packing', note: 'Protective materials or retail presentation boxes.' }
    },
    examples: [{
      zh: '所有外箱包装必须符合五层瓦楞纸抗压标准，并贴好易碎品标识。',
      pinyin: 'Suǒyǒu wàixiāng bāozhuāng bìxū fúhé wǔcéng wǎléngzhǐ kàngyā biāozhǔn, bìng tiē hǎo yìsuìpǐn biāozhì.',
      translations: {
        vi: 'Toàn bộ bao bì thùng bên ngoài bắt buộc phải đạt tiêu chuẩn giấy sóng 5 lớp chịu nén và dán nhãn hàng dễ vỡ.',
        ja: 'すべての外装箱は5層強化段ボールの耐圧基準を満たし、ワレモノ注意ラベルを貼付してください。',
        en: 'All outer carton packaging must meet 5-ply corrugated crush standards and bear fragile stickers.'
      }
    }],
    businessTip: {
      vi: 'Hộp màu bán lẻ gọi là "彩盒" (cǎihé), thùng carton vận chuyển lớn bên ngoài gọi là "外箱" (wàixiāng).',
      ja: '製品化粧箱は「彩盒」、輸送用外箱段ボールは「外箱」と区別します。',
      en: 'Retail colored boxes are 彩盒; master export cartons are 外箱.'
    }
  },
  {
    id: 'bc_sales_011',
    term: '底价',
    pinyin: 'dǐjià',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'intermediate',
    tags: ['price', 'bargain', 'margin'],
    translations: {
      vi: { meaning: 'Giá sàn / Giá kịch kim / Giá gốc thấp nhất', note: 'Mức giá tối thiểu mà bên bán có thể chấp nhận để không bị lỗ vốn.' },
      ja: { meaning: '底値 / 仕切り価格 / 最低許容価格', note: '売り手がこれ以上値下げできない限界原価ライン。' },
      en: { meaning: 'bottom price / floor price', note: 'Lowest acceptable price without incurring losses.' }
    },
    examples: [{
      zh: '每台18美元确实是我们的底价了，再降我们就没有任何利润空间了。',
      pinyin: 'Měi tái shíbā Měiyuán quèshí shì wǒmen de dǐjià le, zài jiàng wǒmen jiù méiyǒu rènhé lìrùn kōngjiān le.',
      translations: {
        vi: '18 USD mỗi chiếc quả thực đã là giá sàn của chúng tôi rồi, nếu giảm nữa thì chúng tôi chẳng còn chút biên lợi nhuận nào cả.',
        ja: '1台18ドルは本当に弊社の限界底値であり、これ以上下げると利益が完全に吹き飛びます。',
        en: '$18 per unit is genuinely our bottom line; any further reduction wipes out our entire margin.'
      }
    }],
    businessTip: {
      vi: 'Khi đàm phán mua hàng, đừng vội tin ngay câu "这是底价" của nhà cung cấp, hãy mang sản lượng lớn ra để đổi chiết khấu.',
      ja: '「底値だ」と言われても鵜呑みにせず、発注ロットの引き上げと引き換えに譲歩を模索します。',
      en: 'Do not accept "this is bottom price" at face value; counteroffer with higher order commitments.'
    }
  },
  {
    id: 'bc_sales_012',
    term: '佣金',
    pinyin: 'yòngjīn',
    partOfSpeech: 'noun',
    category: 'sales_purchasing',
    level: 'intermediate',
    tags: ['commission', 'fee', 'broker'],
    translations: {
      vi: { meaning: 'Tiền hoa hồng / Tiền môi giới', note: 'Khoản thù lao chi trả cho trung gian hoặc đại lý thúc đẩy đơn hàng.' },
      ja: { meaning: '手数料 / コミッション / 仲介料', note: '仲介者や代理店に支払われるインセンティブ。' },
      en: { meaning: 'commission / brokerage fee', note: 'Compensation paid to sales agents or brokers per closed transaction.' }
    },
    examples: [{
      zh: '合同约定卖方在收到全款后5个工作日内向中间商支付3%的佣金。',
      pinyin: 'Hétong yuēdìng màifāng zài shōudào quánkuǎn hòu wǔ gè gōngzuòrì nèi xiàng zhōngjiānshāng zhīfù bǎifēnzhī sān de yòngjīn.',
      translations: {
        vi: 'Hợp đồng quy định bên bán trong vòng 5 ngày làm việc sau khi nhận đủ tiền sẽ thanh toán 3% tiền hoa hồng cho bên trung gian.',
        ja: '契約に基づき、売主は代金完納後5営業日以内に仲介業者へ3%の手数料を送金します。',
        en: 'The contract provides that seller disburses 3% commission to the intermediary within 5 days of full payment.'
      }
    }],
    businessTip: {
      vi: 'Báo giá đã bao gồm hoa hồng gọi là "含佣价" (CFO - Commission-inclusive price).',
      ja: '手数料込み価格は「含佣价」と呼ばれます。',
      en: 'A price quote inclusive of agent commission is known as 含佣价.'
    }
  }
];

// Read tools/business-vocab-1.js and append
const p1Path = path.resolve(__dirname, 'business-vocab-1.js');
let content1 = fs.readFileSync(p1Path, 'utf8');
const lastBracket1 = content1.lastIndexOf('];');
if (lastBracket1 !== -1) {
  const toInsert = ',\n' + JSON.stringify(extraVocab1, null, 2).slice(2, -2) + '\n];\n';
  const newContent1 = content1.slice(0, lastBracket1) + toInsert;
  fs.writeFileSync(p1Path, newContent1, 'utf8');
  console.log('✅ Appended extra items to business-vocab-1.js. Total items now:', require('./business-vocab-1.js').length);
}
