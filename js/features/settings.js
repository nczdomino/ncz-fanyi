// js/features/settings.js - Settings view, backup export/import and app reset - Dependencies: js/core/state.js, js/core/storage.js, js/core/utils.js, js/features/theme-i18n.js, js/features/nav.js

// Full Backup & Restore
function backupAllData() {
  const fullBackup = {
    version: 2,
    cr_uiLang: state.uiLang,
    cr_meaningLang: state.meaningLang,
    cr_meaningLang_custom: localStorage.getItem('cr_meaningLang_custom'),
    cr_meaningLang2: state.meaningLang2,
    cr_darkMode: state.darkMode,
    cr_fontSize: state.fontSize,
    cr_ttsEngine: state.ttsEngine,
    cr_ttsSpeed: state.ttsSpeed,
    cr_showPinyin: state.showPinyin,
    cr_showMeaning: state.showMeaning,
    cr_userDict: getUserDict(),
    cr_recentTexts: state.recentTexts,
    // Backward compatibility aliases
    userDict: getUserDict(),
    recentTexts: state.recentTexts,
    settings: {
      uiLang: state.uiLang,
      meaningLang: state.meaningLang,
      meaningLang2: state.meaningLang2,
      ttsEngine: state.ttsEngine,
      darkMode: state.darkMode,
      fontSize: state.fontSize,
      showPinyin: state.showPinyin,
      showMeaning: state.showMeaning,
    }
  };
  downloadFile(JSON.stringify(fullBackup, null, 2), "chinese_reader_backup.json", "application/json");
}

function restoreDataFromFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid format');
      }

      const rawUiLang = data.cr_uiLang || (data.settings && data.settings.uiLang);
      const rawMeaningLang = data.cr_meaningLang || (data.settings && data.settings.meaningLang);
      const rawMeaningLangCustom = data.cr_meaningLang_custom !== undefined ? data.cr_meaningLang_custom : (data.settings && data.settings.meaningLang_custom);
      const rawMeaningLang2 = data.cr_meaningLang2 !== undefined ? data.cr_meaningLang2 : (data.settings && data.settings.meaningLang2);
      const rawDarkMode = data.cr_darkMode || (data.settings && data.settings.darkMode);
      const rawFontSize = data.cr_fontSize !== undefined ? data.cr_fontSize : (data.settings && data.settings.fontSize);
      const rawTtsEngine = data.cr_ttsEngine || (data.settings && data.settings.ttsEngine);
      const rawTtsSpeed = data.cr_ttsSpeed || (data.settings && data.settings.ttsSpeed);
      const rawShowPinyin = data.cr_showPinyin !== undefined ? data.cr_showPinyin : (data.settings && data.settings.showPinyin);
      const rawShowMeaning = data.cr_showMeaning !== undefined ? data.cr_showMeaning : (data.settings && data.settings.showMeaning);
      const rawUserDict = data.cr_userDict || data.userDict;
      const rawRecentTexts = data.cr_recentTexts || data.recentTexts;

      const VALID_LANGS = ['vi', 'en', 'ja'];
      const VALID_TTS = ['auto', 'system', 'google', 'youdao', 'baidu'];
      const VALID_THEMES = ['system', 'light', 'dark'];

      if (rawUiLang !== undefined && !VALID_LANGS.includes(rawUiLang)) throw new Error('Invalid uiLang');
      if (rawMeaningLang !== undefined && !VALID_LANGS.includes(rawMeaningLang)) throw new Error('Invalid meaningLang');
      if (rawMeaningLang2 !== undefined && rawMeaningLang2 !== null && rawMeaningLang2 !== '' && !VALID_LANGS.includes(rawMeaningLang2)) throw new Error('Invalid meaningLang2');
      if (rawDarkMode !== undefined && !VALID_THEMES.includes(rawDarkMode)) throw new Error('Invalid darkMode');
      if (rawTtsEngine !== undefined && !VALID_TTS.includes(rawTtsEngine)) throw new Error('Invalid ttsEngine');
      if (rawFontSize !== undefined) {
        const fs = Number(rawFontSize);
        if (isNaN(fs) || fs < 18 || fs > 48) throw new Error('Invalid fontSize');
      }
      if (rawUserDict !== undefined && (typeof rawUserDict !== 'object' || Array.isArray(rawUserDict) || rawUserDict === null)) {
        throw new Error('Invalid userDict');
      }
      if (rawRecentTexts !== undefined && !Array.isArray(rawRecentTexts)) {
        throw new Error('Invalid recentTexts');
      }

      // Validated successfully -> write to localStorage and update state safely
      if (rawUiLang !== undefined) {
        localStorage.setItem('cr_uiLang', rawUiLang);
        state.uiLang = rawUiLang;
      }
      if (rawMeaningLang !== undefined) {
        localStorage.setItem('cr_meaningLang', rawMeaningLang);
        state.meaningLang = rawMeaningLang;
      }
      if (rawMeaningLangCustom !== undefined) {
        if (rawMeaningLangCustom === '1' || rawMeaningLangCustom === true) {
          localStorage.setItem('cr_meaningLang_custom', '1');
        } else {
          localStorage.removeItem('cr_meaningLang_custom');
        }
      }
      if (rawMeaningLang2 !== undefined) {
        if (rawMeaningLang2 && VALID_LANGS.includes(rawMeaningLang2)) {
          localStorage.setItem('cr_meaningLang2', rawMeaningLang2);
          state.meaningLang2 = rawMeaningLang2;
        } else {
          localStorage.removeItem('cr_meaningLang2');
          state.meaningLang2 = null;
        }
      }
      if (rawDarkMode !== undefined) {
        localStorage.setItem('cr_darkMode', rawDarkMode);
        state.darkMode = rawDarkMode;
        applyTheme(rawDarkMode);
      }
      if (rawFontSize !== undefined) {
        const fs = Number(rawFontSize);
        localStorage.setItem('cr_fontSize', String(fs));
        state.fontSize = fs;
      }
      if (rawTtsEngine !== undefined) {
        localStorage.setItem('cr_ttsEngine', rawTtsEngine);
        state.ttsEngine = rawTtsEngine;
      }
      if (rawShowPinyin !== undefined) {
        const sp = rawShowPinyin === true || rawShowPinyin === 'true';
        localStorage.setItem('cr_showPinyin', String(sp));
        state.showPinyin = sp;
      }
      if (rawShowMeaning !== undefined) {
        const sm = rawShowMeaning === true || rawShowMeaning === 'true';
        localStorage.setItem('cr_showMeaning', String(sm));
        state.showMeaning = sm;
      }
      if (rawUserDict !== undefined) {
        setUserDict(rawUserDict);
      }
      if (rawRecentTexts !== undefined) {
        state.recentTexts = rawRecentTexts;
        localStorage.setItem('cr_recentTexts', JSON.stringify(rawRecentTexts));
      }

      showToast(t('restoreSuccess'));
      updateThemeAndUI();
      renderCurrentView();
    } catch (err) {
      console.error('Restore error:', err);
      alert(t('invalidBackup'));
    }
  };
  reader.readAsText(file);
}

function clearAllAppData() {
  if (confirm(t('confirmClear'))) {
    state.recentTexts = [];
    state.meaningLang2 = null;
    setUserDict({});
    localStorage.removeItem('cr_userDict');
    localStorage.removeItem('cr_recentTexts');
    localStorage.removeItem('cr_recent_searches');
    localStorage.removeItem('cr_meaningLang2');
    showToast(t('allDataCleared'));
    renderCurrentView();
  }
}


// --- Module: Settings View ---
function renderSettingsView() {
  const uiSelect = document.getElementById('setting-ui-lang');
  if (uiSelect) uiSelect.value = state.uiLang;

  const meaningSelect = document.getElementById('setting-meaning-lang');
  if (meaningSelect) {
    const isCustom = localStorage.getItem('cr_meaningLang_custom') === 'true';
    meaningSelect.value = isCustom ? state.meaningLang : 'auto';
  }

  const darkSelect = document.getElementById('setting-dark-mode');
  if (darkSelect) darkSelect.value = state.darkMode;

  const fontSlider = document.getElementById('setting-font-size');
  const fontValText = document.getElementById('setting-font-val');
  if (fontSlider) fontSlider.value = state.fontSize;
  if (fontValText) fontValText.textContent = state.fontSize + 'px';

  const ttsSelect = document.getElementById('tts-engine-select');
  if (ttsSelect) ttsSelect.value = state.ttsEngine || 'auto';

  const ttsSpeedSelect = document.getElementById('tts-speed-select');
  if (ttsSpeedSelect) ttsSpeedSelect.value = String(state.ttsSpeed || 1.0);
}

function saveSettings() {
  if (state.ttsEngine) {
    localStorage.setItem('cr_ttsEngine', state.ttsEngine);
  }
  if (state.ttsSpeed) {
    localStorage.setItem('cr_ttsSpeed', state.ttsSpeed);
  }
}

function handleSettingChange(key, val) {
  if (key === 'uiLang') {
    setUiLang(val);
  } else if (key === 'meaningLang') {
    if (val === 'auto') {
      localStorage.removeItem('cr_meaningLang_custom');
      state.meaningLang = state.uiLang;
      localStorage.setItem('cr_meaningLang', state.uiLang);
      showToast(t('meaningLang') + ': ' + t('meaningLangAuto'));
    } else {
      localStorage.setItem('cr_meaningLang_custom', 'true');
      state.meaningLang = val;
      localStorage.setItem('cr_meaningLang', val);
      showToast(t('meaningLang') + ': ' + getLangName(val));
    }
    updateThemeAndUI();
    renderCurrentView();
    const transBox = document.getElementById('sentence-trans-box');
    if (transBox && transBox.classList.contains('show') && typeof translateCurrentSentence === 'function') {
      translateCurrentSentence();
    }
    if (state.activeWord && typeof openWordSheet === 'function') {
      const sheet = document.getElementById('word-sheet');
      if (sheet && sheet.classList.contains('active')) {
        openWordSheet(state.activeWord);
      }
    }
  } else if (key === 'darkMode') {
    state.darkMode = val;
    localStorage.setItem('cr_darkMode', val);
    applyTheme();
  } else if (key === 'fontSize') {
    state.fontSize = parseInt(val, 10);
    localStorage.setItem('cr_fontSize', state.fontSize);
    document.getElementById('setting-font-val').textContent = state.fontSize + 'px';
    document.documentElement.style.setProperty('--reader-font-size', state.fontSize + 'px');
  } else if (key === 'ttsEngine') {
    state.ttsEngine = val;
    saveSettings();
  } else if (key === 'ttsSpeed') {
    state.ttsSpeed = parseFloat(val) || 1.0;
    saveSettings();
    showToast(t('ttsSpeed') + ': ' + val + 'x');
  }
}
