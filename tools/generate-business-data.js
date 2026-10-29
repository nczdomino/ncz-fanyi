/**
 * tools/generate-business-data.js
 * 
 * Generates and bundles the complete 商务中文 (Business Chinese) dataset:
 * - 12 Categories (A to L)
 * - 150+ Curated high-frequency business vocabulary items
 * - 11 Real-world commercial email templates (with placeholders & formal/concise modes)
 * - 10 Core international trade documents (with field-by-field breakdowns)
 * - 10 Multi-step interactive business scenarios
 * - 24 Contextual business quizzes with full explanations
 * 
 * Outputs to js/data/business-data.js (UMD compatible for Browser & Node.js).
 */

const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    id: 'basic',
    zhName: '商务基础',
    name: { vi: 'Thương mại cơ bản', en: 'Business Basics', ja: 'ビジネス基礎' },
    icon: '🏢',
    description: {
      vi: 'Chào hỏi, giới thiệu bản thân, chức vụ phòng ban, tiền tệ số lượng và thông tin liên hệ công ty.',
      en: 'Greetings, company introductions, titles, departments, currencies, and contact info.',
      ja: '挨拶、自己紹介、役職・部署、通貨・数量、会社連絡先などの基礎。'
    },
    order: 1
  },
  {
    id: 'workplace',
    zhName: '公司与职场',
    name: { vi: 'Công ty & Môi trường làm việc', en: 'Company & Workplace', ja: '企業と職場' },
    icon: '👥',
    description: {
      vi: 'Cơ cấu tổ chức doanh nghiệp, sắp xếp công việc, họp báo cáo, quản lý tiến độ và chấm công.',
      en: 'Organizational structures, job roles, meetings, reporting, and team collaboration.',
      ja: '組織構造、業務分担、会議と報告、進捗管理、勤怠管理。'
    },
    order: 2
  },
  {
    id: 'communication',
    zhName: '商务沟通',
    name: { vi: 'Giao tiếp thương mại', en: 'Business Communication', ja: 'ビジネスコミュニケーション' },
    icon: '🤝',
    description: {
      vi: 'Liên hệ đối tác, hỏi giá (询价), báo giá (报价), đàm phán thương lượng, xác nhận và xử lý vấn đề.',
      en: 'Client outreach, inquiries, quotation, bargaining, confirmations, and problem resolution.',
      ja: '顧客対応、引き合い（引合い）、見積、価格交渉、受注確認、問題解決。'
    },
    order: 3
  },
  {
    id: 'sales_purchasing',
    zhName: '销售与采购',
    name: { vi: 'Bán hàng & Mua hàng', en: 'Sales & Purchasing', ja: '営業と購買' },
    icon: '🛍️',
    description: {
      vi: 'Nhu cầu khách hàng, quy cách sản phẩm, số lượng đặt tối thiểu (MOQ), sỉ lẻ và chiết khấu.',
      en: 'Client specs, MOQ, wholesale/retail, vendor sourcing, discounts, and order management.',
      ja: '顧客ニーズ、製品仕様、最小ロット（MOQ）、卸売・小売、値引き・割引。'
    },
    order: 4
  },
  {
    id: 'emails',
    zhName: '商务邮件',
    name: { vi: 'Email thương mại thực chiến', en: 'Commercial Emails', ja: 'ビジネスメール' },
    icon: '✉️',
    description: {
      vi: 'Bộ sưu tập mẫu thư điện tử giao dịch: hỏi giá, báo giá, giục thanh toán, xin lỗi giao trễ và cảm ơn.',
      en: 'Complete business email templates: inquiries, quotations, payment reminders, and follow-ups.',
      ja: '実務メールテンプレート：問い合わせ、見積送付、支払督促、納期遅延のお詫び等。'
    },
    order: 5
  },
  {
    id: 'trade',
    zhName: '国际贸易',
    name: { vi: 'Thương mại quốc tế', en: 'International Trade', ja: '国際貿易' },
    icon: '🌐',
    description: {
      vi: 'Nghiệp vụ xuất nhập khẩu, Incoterms (FOB, CIF, EXW, DDP), hợp đồng ngoại thương và tranh chấp.',
      en: 'Import/export operations, Incoterms, international trade contracts, and dispute resolutions.',
      ja: '輸出入実務、インコタームズ（貿易条件）、売買契約、貿易紛争。'
    },
    order: 6
  },
  {
    id: 'documents',
    zhName: '贸易单证',
    name: { vi: 'Chứng từ ngoại thương', en: 'Trade Documents', ja: '貿易書類（船積書類）' },
    icon: '📄',
    description: {
      vi: 'Hóa đơn thương mại, Packing List, Vận đơn B/L, AWB, C/O xuất xứ, Tờ khai hải quan và P/O.',
      en: 'Commercial Invoice, Packing List, Bill of Lading, Air Waybill, Certificate of Origin, and P/O.',
      ja: '商業送り状（インボイス）、パッキングリスト、船荷証券（B/L）、原産地証明書。'
    },
    order: 7
  },
  {
    id: 'customs',
    zhName: '报关与清关',
    name: { vi: 'Khai báo & Thông quan', en: 'Customs Clearance', ja: '通関と税関手続' },
    icon: '🛂',
    description: {
      vi: 'Thủ tục hải quan, tờ khai, thuế nhập khẩu, kiểm hóa thực tế, mã số HS và giấy phép XNK.',
      en: 'Customs declaration, clearance, tariffs, inspections, HS codes, and import/export permits.',
      ja: '税関申告、通関手続、関税、検査、HSコード、輸入許可証。'
    },
    order: 8
  },
  {
    id: 'logistics',
    zhName: '物流与供应链',
    name: { vi: 'Logistics & Chuỗi cung ứng', en: 'Logistics & Supply Chain', ja: '物流とサプライチェーン' },
    icon: '🚢',
    description: {
      vi: 'Vận tải biển, hàng không, kho bãi, theo dõi vận đơn, cước tàu, đóng gói và xử lý hàng hư hỏng.',
      en: 'Sea/air/land freight, warehousing, container shipping (FCL/LCL), tracking, and cargo claims.',
      ja: '海上輸送・航空輸送、倉庫保管、コンテナ便、貨物追跡、運賃、破損補償。'
    },
    order: 9
  },
  {
    id: 'finance',
    zhName: '财务与结算',
    name: { vi: 'Tài chính & Thanh toán', en: 'Finance & Settlement', ja: '財務と決済' },
    icon: '💳',
    description: {
      vi: 'Phương thức thanh toán T/T, thư tín dụng L/C, tiền đặt cọc, thanh toán đợt cuối, tỷ giá và công nợ.',
      en: 'Payment terms (T/T, L/C), deposits, balance payments, exchange rates, and credit periods.',
      ja: '電信送金（T/T）、信用状（L/C）、手付金、残金決済、為替レート、売掛金管理。'
    },
    order: 10
  },
  {
    id: 'aftersales',
    zhName: '售后与索赔',
    name: { vi: 'Hậu mãi & Khiếu nại', en: 'After-sales & Claims', ja: 'アフターサービス・求償' },
    icon: '🛡️',
    description: {
      vi: 'Giải quyết lỗi chất lượng hàng, đổi trả, hoàn tiền, yêu cầu bồi thường và vi phạm hợp đồng.',
      en: 'Quality disputes, returns, refunds, compensations, breach of contract, and warranties.',
      ja: '品質不良対応、返品・交換、返金、損害賠償請求、契約不履行への対策。'
    },
    order: 11
  },
  {
    id: 'scenarios',
    zhName: '情景练习',
    name: { vi: 'Tình huống thực chiến', en: 'Interactive Scenarios', ja: '実践シナリオロールプレイ' },
    icon: '🎭',
    description: {
      vi: 'Nhập vai đối thoại từng bước xử lý tình huống thực tế: hỏi giá, đàm phán, thanh toán và xử lý sự cố.',
      en: 'Step-by-step role-playing conversations: price inquiries, bargaining, and defect handling.',
      ja: '段階的ロールプレイ形式の会話練習：引合い、価格交渉、クレーム処理。'
    },
    order: 12
  }
];

module.exports = {
  CATEGORIES
};

// If run directly via node, build the bundled file
if (require.main === module) {
  const vocab1 = require('./business-vocab-1.js');
  const vocab2 = require('./business-vocab-2.js');
  const vocab3 = require('./business-vocab-3.js');
  const emailTemplates = require('./business-emails.js');
  const tradeDocuments = require('./business-documents.js');
  const scenarios = require('./business-scenarios.js');
  const quizzes = require('./business-quizzes.js');

  const vocabulary = [...vocab1, ...vocab2, ...vocab3];

  const dataset = {
    meta: {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      counts: {
        categories: CATEGORIES.length,
        vocabulary: vocabulary.length,
        emailTemplates: emailTemplates.length,
        tradeDocuments: tradeDocuments.length,
        scenarios: scenarios.length,
        quizzes: quizzes.length
      }
    },
    categories: CATEGORIES,
    vocabulary,
    emailTemplates,
    tradeDocuments,
    scenarios,
    quizzes
  };

  const outputPath = path.resolve(__dirname, '../js/data/business-data.js');
  const fileContent = `/**
 * js/data/business-data.js
 * Auto-generated 商务中文 (Business Chinese) Complete Learning & Reference Dataset
 * Generated: ${dataset.meta.generatedAt}
 * Total Categories: ${dataset.meta.counts.categories}
 * Total Vocabulary: ${dataset.meta.counts.vocabulary}
 * Total Email Templates: ${dataset.meta.counts.emailTemplates}
 * Total Trade Documents: ${dataset.meta.counts.tradeDocuments}
 * Total Scenarios: ${dataset.meta.counts.scenarios}
 * Total Quizzes: ${dataset.meta.counts.quizzes}
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
  return ${JSON.stringify(dataset, null, 2)};
}));
`;

  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log('✅ Generated js/data/business-data.js successfully!');
  console.log(`- Categories: ${dataset.meta.counts.categories}`);
  console.log(`- Vocabulary: ${dataset.meta.counts.vocabulary}`);
  console.log(`- Email Templates: ${dataset.meta.counts.emailTemplates}`);
  console.log(`- Trade Documents: ${dataset.meta.counts.tradeDocuments}`);
  console.log(`- Scenarios: ${dataset.meta.counts.scenarios}`);
  console.log(`- Quizzes: ${dataset.meta.counts.quizzes}`);
}

