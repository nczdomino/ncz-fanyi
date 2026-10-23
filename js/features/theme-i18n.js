// js/features/theme-i18n.js - Theme and language switcher handlers - Dependencies: js/core/state.js, js/core/utils.js

function setUiLang(lang) {
  if (!I18N_DATA[lang]) return;
  state.uiLang = lang;
  localStorage.setItem('cr_uiLang', lang);

  // App language change automatically sets default translation target:
  // (Japanese UI -> Translate ZH to JA; English UI -> Translate ZH to EN; Vietnamese UI -> Translate ZH to VI)
  state.meaningLang = lang;
  localStorage.setItem('cr_meaningLang', lang);
  localStorage.removeItem('cr_meaningLang_custom');

  document.documentElement.lang = lang;

  // Sync settings dropdowns
  const uiSelect = document.getElementById('setting-ui-lang');
  if (uiSelect) uiSelect.value = lang;
  const meaningSelect = document.getElementById('setting-meaning-lang');
  if (meaningSelect) meaningSelect.value = 'auto';

  // Update top-bar segmented language buttons
  document.querySelectorAll('.top-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  updateThemeAndUI();
  renderCurrentView();

  // If a sentence translation box is currently visible, update it to the new language
  const transBox = document.getElementById('sentence-trans-box');
  if (transBox && transBox.classList.contains('show')) {
    translateCurrentSentence();
  }

  // If word sheet is currently open, refresh it with the new language
  if (state.activeWord) {
    const sheet = document.getElementById('word-sheet');
    if (sheet && sheet.classList.contains('active')) {
      openWordSheet(state.activeWord);
    }
  }

  showToast(t('language') + ': ' + getLangName(lang));
}

function cycleUiLang() {
  const langs = ['vi', 'ja', 'en'];
  const next = langs[(langs.indexOf(state.uiLang) + 1) % langs.length];
  setUiLang(next);
}

// --- Module: Theme Management ---
function applyTheme() {
  let theme = state.darkMode;
  if (theme === 'system') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'dark' ? '#161B22' : '#E8344E');
  }
}

function toggleTheme() {
  if (state.darkMode === 'light') state.darkMode = 'dark';
  else if (state.darkMode === 'dark') state.darkMode = 'system';
  else state.darkMode = 'light';
  localStorage.setItem('cr_darkMode', state.darkMode);
  applyTheme();
  updateThemeAndUI();
  showToast(t('darkMode') + ': ' + state.darkMode);
}

// --- Module: UI Updates & DOM Binding ---
function updateThemeAndUI() {
  applyTheme();
  document.documentElement.lang = state.uiLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    el.placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  // Sync top-bar segmented language buttons
  document.querySelectorAll('.top-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === state.uiLang);
  });

  const viewModeBtn = document.getElementById('btn-toggle-viewmode');
  if (viewModeBtn) {
    viewModeBtn.textContent = state.viewMode === 'sentence' ? t('viewSingle') : t('viewAll');
    viewModeBtn.classList.toggle('active', state.viewMode === 'all');
  }

  // Update Phrase select button
  if (typeof phraseUpdateLabels === 'function') {
    phraseUpdateLabels();
  }

  // Update OCR buttons if dialog is rendered
  if (typeof ocrUpdateButtons === 'function') {
    ocrUpdateButtons(!!window._ocrRaw);
  }
}
