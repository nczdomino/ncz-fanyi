// types/grammar.ts - 100% strict TypeScript types and interfaces for HSK 2.0 & 3.0 Grammar System

export type Locale = 'vi' | 'ja' | 'en';

export type LocalizedText = {
  vi: string;
  ja: string;
  en: string;
};

export type HskLevel =
  | 'HSK1'
  | 'HSK2'
  | 'HSK3'
  | 'HSK4'
  | 'HSK5'
  | 'HSK6'
  | 'HSK7-9';

export type HskStandard = 'HSK 2.0' | 'HSK 3.0';

export type GrammarCategory =
  | 'sentence_pattern'
  | 'preposition'
  | 'question'
  | 'negation'
  | 'particle'
  | 'measure_word'
  | 'aspect'
  | 'modal'
  | 'comparison'
  | 'complement'
  | 'conjunction'
  | 'reduplication'
  | 'written_style'
  | 'other'
  | string;

export type GrammarRegister =
  | 'neutral'
  | 'formal'
  | 'colloquial'
  | 'written'
  | string;

/**
 * Item in hsk_catalog_2.0_3.0_all_levels.json
 */
export interface GrammarCatalogItem {
  id: string;
  level: HskLevel;
  standard: HskStandard[];
  zh_name: string;
  vi_name: string;
  ja_name: string;
  en_name: string;
  category: GrammarCategory;
  difficulty: number;
}

/**
 * Structure block representing a syntactical role and color mapping
 */
export interface StructureBlock {
  label: LocalizedText;
  role: string;
  color: string;
}

/**
 * Confusable grammar point contrast definition
 */
export interface ConfusableWith {
  id: string;
  diff: LocalizedText;
}

export interface GrammarHowToUseStep {
  step: number;
  text: string;
}

export interface GrammarFatalMistake {
  wrong: string;
  correct: string;
  explanation: string;
  why_learners_make_it: string;
}

export interface GrammarMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

export interface GrammarLangLocalization {
  title: string;
  quick_rule_3s: string;
  contrastive_note: string;
  analogy: string;
  mnemonic: string;
  how_to_use: GrammarHowToUseStep[];
  self_check: string[];
  tips: string[];
  when_to_use: string[];
  when_not_to_use: string[];
  fatal_mistake: GrammarFatalMistake;
  extra_mistakes: GrammarMistake[];
}

export interface GrammarFillTemplate {
  pattern: string;
  slots: LocalizedText[];
  example_filled: string;
}

export interface GrammarCollocation {
  zh: string;
  pinyin: string;
  meaning: LocalizedText;
}

export interface GrammarFalseFriendJa {
  ja_meaning: string;
  zh_meaning: string;
}

export interface GrammarToken {
  hanzi: string;
  pinyin: string;
  han_viet: string;
  ja_kanji: string;
  false_friend_ja: GrammarFalseFriendJa | null;
  gloss: LocalizedText;
  block_role: string;
  literal_en?: string;
}

export interface GrammarExample {
  zh: string;
  pinyin: string;
  tokens: GrammarToken[];
  scenario: LocalizedText;
  translations: LocalizedText;
  literal_en: string;
  tone_tip: LocalizedText;
  word_order_diff: LocalizedText;
  note: LocalizedText;
}

export interface GrammarDialogueLine {
  speaker: string;
  zh: string;
  pinyin: string;
  tr: LocalizedText;
}

export interface GrammarDialogue {
  goal: LocalizedText;
  lines: GrammarDialogueLine[];
}

export interface GrammarPuzzle {
  scrambled_tokens: string[];
  correct_order: string[];
}

export interface GrammarFillBlank {
  sentence: string;
  options: string[];
  answer_index: number;
  trap_for: Locale[];
  explanation: LocalizedText;
}

export interface GrammarErrorCorrection {
  wrong: string;
  correct: string;
  hint: LocalizedText;
}

export interface GrammarQuizItem {
  question: LocalizedText;
  options: string[];
  answer_index: number;
  trap_for: Locale[];
  explanation: LocalizedText;
}

export interface GrammarSummaryCard {
  one_liner: LocalizedText;
  remember: LocalizedText[];
}

/**
 * Item in hsk_grammar_generated_samples.json
 */
export interface GrammarDetailItem {
  id: string;
  level: HskLevel;
  level_num: number;
  category: GrammarCategory;
  difficulty: number;
  frequency: number;
  register: GrammarRegister;
  keywords: string[];
  formula: string;
  formula_plain: LocalizedText;
  structure_blocks: StructureBlock[];
  related_ids: string[];
  confusable_with: ConfusableWith[];
  localizations: Record<Locale, GrammarLangLocalization>;
  fill_template: GrammarFillTemplate;
  collocations: GrammarCollocation[];
  examples: GrammarExample[];
  dialogue: GrammarDialogue;
  puzzles: GrammarPuzzle[];
  fill_blank: GrammarFillBlank[];
  error_correction: GrammarErrorCorrection[];
  quiz: GrammarQuizItem[];
  summary_card: GrammarSummaryCard;
  needs_review: boolean;
  review_note: string;
}

/**
 * Joined record combining Catalog metadata with available Detail Rule
 */
export interface JoinedGrammarPoint extends GrammarCatalogItem {
  detail?: GrammarDetailItem;
  hasDetail: boolean;
}

/**
 * Filter options for querying the grammar catalog
 */
export interface GrammarFilterOptions {
  level?: HskLevel | 'all';
  standard?: HskStandard | 'all';
  category?: GrammarCategory | 'all';
  query?: string;
  hasDetailOnly?: boolean;
}

/**
 * Practice score tracking structure
 */
export interface PracticeResult {
  grammarId: string;
  puzzlesScore: number;
  puzzlesTotal: number;
  fillBlankScore: number;
  fillBlankTotal: number;
  errorCorrectionScore: number;
  errorCorrectionTotal: number;
  quizScore: number;
  quizTotal: number;
  completedAt: string;
  percent: number;
}
