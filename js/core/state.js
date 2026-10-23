// js/core/state.js - Application state and language detection - Dependencies: js/core/storage.js

function detectInitialLang() {
  const saved = localStorage.getItem('cr_uiLang');
  if (saved && ['vi', 'en', 'ja'].includes(saved)) return saved;
  const nav = ((typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage)) || '').toLowerCase();
  if (nav.startsWith('vi')) return 'vi';
  if (nav.startsWith('ja')) return 'ja';
  return 'en';
}

function detectInitialMeaningLang(uiLang) {
  const isCustom = localStorage.getItem('cr_meaningLang_custom') === '1';
  const saved = localStorage.getItem('cr_meaningLang');
  if (isCustom && saved && ['vi', 'en', 'ja'].includes(saved)) {
    return saved;
  }
  return uiLang;
}

const _initialUiLang = detectInitialLang();
const state = {
  currentView: 'input',
  uiLang: _initialUiLang,
  meaningLang: detectInitialMeaningLang(_initialUiLang),
  meaningLang2: (function(){
    const s = localStorage.getItem('cr_meaningLang2');
    return (s && ['vi','en','ja'].includes(s)) ? s : null;
  })(),
  darkMode: localStorage.getItem('cr_darkMode') || 'system',
  fontSize: parseInt(localStorage.getItem('cr_fontSize')) || 24,
  showPinyin: localStorage.getItem('cr_showPinyin') !== 'false',
  showMeaning: localStorage.getItem('cr_showMeaning') !== 'false',
  ttsEngine: (() => {
    const saved = localStorage.getItem('cr_ttsEngine');
    if (saved === 'auto' || saved === 'system' || saved === 'google' || saved === 'youdao') return saved;
    return 'auto';
  })(),
  currentText: '',
  sentences: [],
  currentSentenceIndex: 0,
  viewMode: 'sentence', // 'sentence' | 'all'
  recentTexts: (function(){ const v = safeJSON('cr_recentTexts', []); return Array.isArray(v) ? v : []; })(),
  cachedTranslations: {},
  activeWord: null,
  activeWriters: [],
  hskFilter: 'all',
  searchQuery: '',
  dictFilterHSK: 'all',
  showHskBrowser: false,
  showRadicalBrowser: false,
  selectedRadical: null,
};
