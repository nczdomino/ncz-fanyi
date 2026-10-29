// types/business.ts - TypeScript interfaces and types for 商务中文 (Business Chinese) System

export type Locale = 'vi' | 'ja' | 'en';

export type LocalizedText = {
  vi: string;
  ja: string;
  en: string;
};

export type BusinessLevel = 'beginner' | 'intermediate' | 'advanced';

export type BusinessCategory =
  | 'basic'              // 商务基础 (Business Basics)
  | 'workplace'          // 公司与职场 (Company & Workplace)
  | 'communication'      // 商务沟通 (Business Communication)
  | 'sales_purchasing'   // 销售与采购 (Sales & Purchasing)
  | 'emails'             // 商务邮件 (Business Emails)
  | 'trade'              // 国际贸易 (International Trade)
  | 'documents'          // 贸易单证 (Trade Documents)
  | 'customs'            // 报关与清关 (Customs Clearance)
  | 'logistics'          // 物流与供应链 (Logistics & Supply Chain)
  | 'finance'            // 财务与结算 (Finance & Settlement)
  | 'aftersales'         // 售后与索赔 (After-sales & Claims)
  | 'scenarios';         // 情景练习 (Interactive Scenarios)

export interface BusinessCategoryMeta {
  id: BusinessCategory;
  name: LocalizedText;
  zhName: string;
  icon: string;
  description: LocalizedText;
  order: number;
}

export interface BusinessExampleSentence {
  zh: string;
  pinyin: string;
  translations: LocalizedText;
  context?: LocalizedText;
}

export interface BusinessVocabularyItem {
  id: string;
  term: string;
  pinyin: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'abbreviation' | 'measure_word';
  category: BusinessCategory;
  level: BusinessLevel;
  tags: string[];
  translations: {
    vi: { meaning: string; note?: string };
    ja: { meaning: string; note?: string };
    en: { meaning: string; note?: string };
  };
  examples: BusinessExampleSentence[];
  businessTip?: LocalizedText;
  relatedIds?: string[];
  searchTerms?: string[];
}

export interface EmailPlaceholder {
  key: string;
  label: LocalizedText;
  example: string;
}

export interface BusinessEmailTemplate {
  id: string;
  category: BusinessCategory;
  subject: LocalizedText;
  recipientType: LocalizedText;
  purpose: LocalizedText;
  bodyFormal: {
    zh: string;
    pinyin?: string;
    translations: LocalizedText;
  };
  bodyConcise: {
    zh: string;
    pinyin?: string;
    translations: LocalizedText;
  };
  keyPhrases: Array<{
    zh: string;
    pinyin: string;
    translations: LocalizedText;
  }>;
  placeholders: EmailPlaceholder[];
}

export interface TradeDocumentField {
  fieldZh: string;
  fieldEn: string;
  pinyin: string;
  explanation: LocalizedText;
  sampleValue: string;
}

export interface BusinessTradeDocument {
  id: string;
  nameZh: string;
  pinyin: string;
  nameVi: string;
  nameEn: string;
  nameJa: string;
  purpose: LocalizedText;
  distinctionTip?: LocalizedText;
  standardFields: TradeDocumentField[];
}

export interface ScenarioStepOption {
  text: {
    zh: string;
    pinyin: string;
    translations: LocalizedText;
  };
  isRecommended: boolean;
  feedback: LocalizedText;
  nextStepIndex?: number | null;
}

export interface ScenarioStep {
  stepIndex: number;
  speakerRole: LocalizedText; // e.g. "Khách hàng (Client)", "Nhà cung cấp (Supplier)"
  promptZh: string;
  promptPinyin: string;
  promptTranslation: LocalizedText;
  options: ScenarioStepOption[];
  vocabHighlights?: string[];
}

export interface BusinessScenario {
  id: string;
  category: BusinessCategory;
  title: LocalizedText;
  description: LocalizedText;
  context: LocalizedText;
  steps: ScenarioStep[];
}

export interface BusinessQuizOption {
  text: {
    zh?: string;
    pinyin?: string;
    translations: LocalizedText;
  };
  isCorrect: boolean;
}

export interface BusinessQuizItem {
  id: string;
  category: BusinessCategory;
  level: BusinessLevel;
  type: 'meaning_selection' | 'term_selection' | 'business_context';
  question: LocalizedText & { zh?: string };
  options: BusinessQuizOption[];
  explanation: LocalizedText;
}

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface SrsCardState {
  termId: string;
  state: 'new' | 'learning' | 'review';
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  lastReviewedAt: string | null;
  nextReviewAt: string;
}

export interface BusinessFilterOptions {
  category?: BusinessCategory | 'all';
  level?: BusinessLevel | 'all';
  query?: string;
  favoritesOnly?: boolean;
  dueSrsOnly?: boolean;
}
