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

  const ttsSpeedRange = document.getElementById('tts-speed-range');
  if (ttsSpeedRange) ttsSpeedRange.value = String(state.ttsSpeed || 1.0);
  const ttsSpeedLabel = document.getElementById('tts-speed-label');
  if (ttsSpeedLabel) ttsSpeedLabel.textContent = Number(state.ttsSpeed || 1.0).toFixed(2) + 'x';

  const volRange = document.getElementById('tts-volume-range');
  if (volRange) volRange.value = String(typeof state.ttsVolume === 'number' ? state.ttsVolume : 1);
  const volLabel = document.getElementById('tts-volume-label');
  if (volLabel) volLabel.textContent = Math.round((typeof state.ttsVolume === 'number' ? state.ttsVolume : 1) * 100) + '%';
  const muteBtn = document.getElementById('tts-mute-btn');
  if (muteBtn) {
    muteBtn.textContent = state.ttsMuted ? '🔇' : '🔊';
    muteBtn.title = state.ttsMuted ? (t('ttsUnmute') || 'Bật tiếng') : (t('ttsMute') || 'Tắt tiếng');
  }
}

// Fine-grained speech rate (0.5x - 1.5x in 0.05 steps). The old UI only offered four
// fixed values, which is too coarse for tone practice.
function setTtsSpeed(value) {
  const n = Math.min(1.5, Math.max(0.5, parseFloat(value) || 1));
  state.ttsSpeed = Math.round(n * 100) / 100;
  const label = document.getElementById('tts-speed-label');
  if (label) label.textContent = state.ttsSpeed.toFixed(2) + 'x';
  saveSettings();
}

function setTtsVolume(value) {
  const n = Math.min(1, Math.max(0, parseFloat(value) || 0));
  state.ttsVolume = Math.round(n * 100) / 100;
  // Moving the slider up implies the user wants sound again.
  if (state.ttsVolume > 0 && state.ttsMuted) state.ttsMuted = false;
  const label = document.getElementById('tts-volume-label');
  if (label) label.textContent = Math.round(state.ttsVolume * 100) + '%';
  const muteBtn = document.getElementById('tts-mute-btn');
  if (muteBtn) muteBtn.textContent = state.ttsMuted ? '🔇' : '🔊';
  saveSettings();
}

function toggleTtsMute() {
  state.ttsMuted = !state.ttsMuted;
  const muteBtn = document.getElementById('tts-mute-btn');
  if (muteBtn) {
    muteBtn.textContent = state.ttsMuted ? '🔇' : '🔊';
    muteBtn.title = state.ttsMuted ? (t('ttsUnmute') || 'Bật tiếng') : (t('ttsMute') || 'Tắt tiếng');
  }
  if (state.ttsMuted && typeof stopSpeech === 'function') {
    try { stopSpeech(); } catch (e) {}
  }
  saveSettings();
  if (typeof showToast === 'function') {
    showToast(state.ttsMuted
      ? (t('ttsMute') || 'Tắt tiếng')
      : (t('ttsUnmute') || 'Bật tiếng'));
  }
}

function saveSettings() {
  if (state.ttsEngine) {
    localStorage.setItem('cr_ttsEngine', state.ttsEngine);
  }
  if (state.ttsSpeed) {
    localStorage.setItem('cr_ttsSpeed', state.ttsSpeed);
  }
  if (typeof state.ttsVolume === 'number') {
    localStorage.setItem('cr_ttsVolume', String(state.ttsVolume));
  }
  localStorage.setItem('cr_ttsMuted', state.ttsMuted ? '1' : '0');
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

// --- Legal, Privacy & Open Source Licenses Modal ---
let activeLegalTab = 'privacy';

function openLegalModal(tabId = 'privacy') {
  const modal = document.getElementById('legal-modal');
  if (!modal) return;
  activeLegalTab = tabId || 'privacy';
  renderLegalContent();
  modal.classList.add('active');
  switchLegalTab(activeLegalTab);
}

function closeLegalModal() {
  const modal = document.getElementById('legal-modal');
  if (modal) modal.classList.remove('active');
}

function switchLegalTab(tabId) {
  activeLegalTab = tabId;
  const tabBtns = document.querySelectorAll('.legal-tab-btn');
  tabBtns.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const panes = document.querySelectorAll('.legal-content-pane');
  panes.forEach(pane => {
    if (pane.id === `legal-pane-${tabId}`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });
}

function renderLegalContent() {
  const container = document.getElementById('legal-modal-body');
  if (!container) return;

  const lang = (typeof state !== 'undefined' && state.uiLang) ? state.uiLang : 'vi';
  const isEn = lang === 'en';
  const isJa = lang === 'ja';

  let privacyHtml = '';
  let termsHtml = '';
  let sourcesHtml = '';

  if (isJa) {
    privacyHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🛡️</span> 100% オフライン優先 & ゼロナレッジ・プライバシー
          <span class="legal-badge badge-green">完全保護</span>
        </div>
        <div class="legal-card-desc">
          検索履歴、単語帳、文字サイズやダークモードなどの設定情報は、<strong>すべてご利用のブラウザ内（localStorage）に100%安全に保持</strong>されます。外部サーバーへの個人データ送信やアカウント強制収集は一切行いません。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🚫</span> トラッキングなし・広告なし・データ売買なし
        </div>
        <div class="legal-card-desc">
          第三者による追跡Cookie、広告SDK、ユーザー行動追跡ビーコンは一切使用していません。学習者皆様の個人情報やプライバシーデータを第三者に提供・販売することは決してありません。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>⚡</span> リアルタイムOCR & AI処理（サーバー完全非保持）
        </div>
        <div class="legal-card-desc">
          画像OCR認識やAI文脈検索を利用する場合、データはHTTPS暗号化通信で送信され、<strong>メモリ上（in-memory stream）で即時に処理・返答</strong>されます。撮影した画像や入力テキストがサーバー上に恒久保存されることはありません。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>💾</span> データの完全な主権とワンクリック消去
        </div>
        <div class="legal-card-desc">
          バックアップファイル（JSON）の書き出しや、端末に保存された全データの完全消去は、設定画面からいつでもワンクリックで実行可能です。
        </div>
      </div>
    `;

    termsHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>👤</span> 著作者および著作権表示
        </div>
        <div class="legal-card-desc">
          開発者・著作者: <strong>NIE THANH TRUNG（聂诚忠）</strong><br>
          著作権表示: <strong>© 2026 NIE THANH TRUNG (哈喽 中文 / HALOU ZHONGWEN). All rights reserved.</strong>
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🎓</span> 利用目的と許諾範囲
        </div>
        <div class="legal-card-desc">
          <strong>哈喽 中文 (HALOU ZHONGWEN)</strong> は、世界中の中国語学習者、語学研究者、教育コミュニティを支援するために無償提供されています。非営利の学習・学術・教育目的で自由にご活用いただけます。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>⚖️</span> 免責事項（Disclaimer of Warranties）
        </div>
        <div class="legal-card-desc">
          本ソフトウェアは<strong>「現状有姿（As-Is）」</strong>にて提供されます。辞書データ、ピンイン表記、AI翻訳、OCR認識結果は、学習補助・学術参照を目的とする自動化システムによる生成物です。<br>
          著作者は、医療診断、法的手続き、商業契約書などの極めて高い正確性が求められる場面での100%の正確性を保証しません。利用に伴う判断と結果については利用者自身の自己責任となります。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🏢</span> 第三者商標および外部リンク
        </div>
        <div class="legal-card-desc">
          アプリ内に掲載されている外部連携先（Pleco、LINE Dict、Baidu百科、Hanzii、MDBG等）の名称およびロゴの商標権・著作権は、それぞれの権利者に帰属します。
        </div>
      </div>
    `;

    sourcesHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>📖</span> CC-CEDICT 中英総合大辞典
          <span class="legal-badge">CC BY-SA 4.0</span>
        </div>
        <div class="legal-card-desc">
          世界で最も広く信頼されているオープンソース中英辞書データ（119,120語以上収録）。<br>
          権利者: <strong>MDBG & CC-CEDICT Contributors</strong><br>
          ライセンス: クリエイティブ・コモンズ 表示 - 継承 4.0 国際（CC BY-SA 4.0）。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>💬</span> Tatoeba 実用例文コーパス
          <span class="legal-badge">CC BY 2.0 FR</span>
        </div>
        <div class="legal-card-desc">
          世界中のネイティブスピーカーコミュニティにより作られた自然な日常会話例文データ。<br>
          権利者: <strong>Tatoeba Project (tatoeba.org)</strong><br>
          ライセンス: クリエイティブ・コモンズ 表示 2.0 フランス（CC BY 2.0 FR）。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>✍️</span> Make Me a Hanzi (MMAH) & HanziLookup
          <span class="legal-badge">ODbL / Arphic</span>
        </div>
        <div class="legal-card-desc">
          オフライン手書き漢字認識エンジンおよび筆順ストロークベクターデータ。<br>
          ライセンス: Arphic Public License および Open Database License。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🏆</span> HSK 3.0 公式語彙基準
        </div>
        <div class="legal-card-desc">
          中華人民共和国教育部および中外言語交流協力センター（CTI）公表の最新等級基準（HSK 1〜9級）に準拠。
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>📷</span> Tesseract OCR & RapidOCR
          <span class="legal-badge">Apache 2.0</span>
        </div>
        <div class="legal-card-desc">
          オープンソース画像文字認識ライブラリ。Apache License 2.0 に準拠。
        </div>
      </div>
    `;
  } else if (isEn) {
    privacyHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🛡️</span> 100% Offline-First & Zero-Knowledge Architecture
          <span class="legal-badge badge-green">Protected</span>
        </div>
        <div class="legal-card-desc">
          Your dictionary search history, vocabulary notebook, font size preferences, and UI theme are <strong>stored 100% locally on your device (localStorage)</strong>. No personal data is sent to central servers, and no user accounts are required.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🚫</span> No Tracking, No Ads, No Data Selling
        </div>
        <div class="legal-card-desc">
          Zero third-party tracking cookies, zero advertising beacons, and zero telemetry tracking. We do not sell, rent, or monetize your study data under any circumstances.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>⚡</span> Ephemeral AI & OCR Processing (Zero Permanent Storage)
        </div>
        <div class="legal-card-desc">
          When using document image OCR or AI context search, data is transmitted over secure encrypted HTTPS and <strong>processed ephemerally in-memory</strong>. Neither your scanned images nor your personal text inputs are permanently stored on any server.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>💾</span> Complete Data Sovereignty
        </div>
        <div class="legal-card-desc">
          You have full control to export your personal data backup (JSON) or permanently wipe all application data with a single click in Settings at any time.
        </div>
      </div>
    `;

    termsHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>👤</span> Author & Copyright Notice
        </div>
        <div class="legal-card-desc">
          Author & Lead Developer: <strong>NIE THANH TRUNG (聂诚忠)</strong><br>
          Copyright Notice: <strong>© 2026 NIE THANH TRUNG (HALOU ZHONGWEN / 哈喽 中文). All rights reserved.</strong>
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🎓</span> Permitted Educational Use
        </div>
        <div class="legal-card-desc">
          <strong>HALOU ZHONGWEN (哈喽 中文)</strong> is provided free of charge for educational, linguistic research, and personal Chinese language study purposes worldwide.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>⚖️</span> Disclaimer of Warranties & Limitation of Liability
        </div>
        <div class="legal-card-desc">
          This software is provided on an <strong>"AS IS" and "AS AVAILABLE"</strong> basis without warranties of any kind. Dictionary headwords, Pinyin transcriptions, AI translations, and OCR recognitions are generated by automated algorithms for educational assistance.<br>
          The author makes no representation or guarantee of 100% accuracy for certified legal, medical, commercial contract, or life-critical applications. Users assume all responsibility when utilizing outputs in professional settings. The author shall not be held liable for any direct or indirect damages resulting from the use of this software.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🏢</span> Third-Party Trademarks & Links
        </div>
        <div class="legal-card-desc">
          All external service names and links (Pleco, LINE Dict, Baidu Baike, Hanzii, MDBG) are intellectual property and trademarks of their respective owners.
        </div>
      </div>
    `;

    sourcesHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>📖</span> CC-CEDICT Chinese-English Dictionary
          <span class="legal-badge">CC BY-SA 4.0</span>
        </div>
        <div class="legal-card-desc">
          The international standard community-maintained Chinese-English dictionary with over <strong>119,120 headwords</strong>.<br>
          Publisher: <strong>MDBG & CC-CEDICT Contributors</strong><br>
          License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>💬</span> Tatoeba Example Sentence Corpus
          <span class="legal-badge">CC BY 2.0 FR</span>
        </div>
        <div class="legal-card-desc">
          Real-world authentic multilingual conversational sentences crafted by native speakers.<br>
          Publisher: <strong>Tatoeba Project (tatoeba.org)</strong><br>
          License: Creative Commons Attribution 2.0 France (CC BY 2.0 FR).
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>✍️</span> Make Me a Hanzi (MMAH) & HanziLookup
          <span class="legal-badge">ODbL / Arphic</span>
        </div>
        <div class="legal-card-desc">
          Vector stroke-order data and offline handwriting character recognition engine.<br>
          License: Arphic Public License and Open Database License (ODbL).
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🏆</span> Official HSK 3.0 Standards
        </div>
        <div class="legal-card-desc">
          Graded vocabulary covering Bands 1 through 9 based on official Chinese Proficiency Standards issued by the Ministry of Education of the PRC and CTI.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>📷</span> Tesseract OCR & RapidOCR
          <span class="legal-badge">Apache 2.0</span>
        </div>
        <div class="legal-card-desc">
          Open-source optical character recognition pipelines licensed under the Apache License 2.0.
        </div>
      </div>
    `;
  } else {
    // Vietnamese (Default)
    privacyHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🛡️</span> 100% Offline-First & Kiến trúc Không lưu trữ (Zero-Knowledge)
          <span class="legal-badge badge-green">Bảo mật tuyệt đối</span>
        </div>
        <div class="legal-card-desc">
          Toàn bộ lịch sử tra từ, sổ tay từ vựng yêu thích, ghi chú, cài đặt cỡ chữ và giao diện được <strong>lưu trữ 100% cục bộ trong bộ nhớ trình duyệt (localStorage) trên thiết bị của bạn</strong>. Ứng dụng không gửi dữ liệu cá nhân về máy chủ trung tâm và không yêu cầu đăng ký tài khoản.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🚫</span> Tuyệt đối không theo dõi, không quảng cáo, không bán dữ liệu
        </div>
        <div class="legal-card-desc">
          Ứng dụng không sử dụng cookie theo dõi của bên thứ ba (Third-party tracking cookies), không cài đặt SDK quảng cáo và không thu thập thông tin danh tính. Chúng tôi cam kết không bao giờ chia sẻ hay bán dữ liệu học tập của bạn cho bất kỳ bên thứ ba nào.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>⚡</span> Xử lý OCR & AI thời gian thực (Zero Permanent Storage)
        </div>
        <div class="legal-card-desc">
          Khi sử dụng tính năng chụp ảnh quét tài liệu (OCR) hoặc tra cứu ngữ cảnh AI nâng cao, dữ liệu được truyền qua kênh mã hóa bảo mật HTTPS và <strong>xử lý tức thời trong bộ nhớ đệm (in-memory stream)</strong> rồi trả kết quả ngay. Hình ảnh và nội dung văn bản cá nhân của bạn tuyệt đối không bị lưu trữ vĩnh viễn trên bất kỳ máy chủ nào.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>💾</span> Toàn quyền kiểm soát và sao lưu dữ liệu cá nhân
        </div>
        <div class="legal-card-desc">
          Bạn có toàn quyền xuất tệp sao lưu dữ liệu cá nhân (tệp .json) hoặc xóa vĩnh viễn toàn bộ dữ liệu chỉ bằng 1 nút bấm trong phần Cài đặt bất kỳ lúc nào.
        </div>
      </div>
    `;

    termsHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>👤</span> Tác giả & Bản quyền ứng dụng
        </div>
        <div class="legal-card-desc">
          Tác giả & Nhà phát triển: <strong>NIE THANH TRUNG (聂诚忠)</strong><br>
          Bản quyền ứng dụng: <strong>© 2026 NIE THANH TRUNG (哈喽 中文 / HALOU ZHONGWEN). All rights reserved.</strong>
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🎓</span> Mục đích sử dụng hợp pháp
        </div>
        <div class="legal-card-desc">
          Ứng dụng <strong>哈喽 中文 (HALOU ZHONGWEN)</strong> được phát triển và cung cấp hoàn toàn miễn phí phục vụ mục đích <strong>học tập, nghiên cứu ngôn ngữ, giáo dục phi thương mại và hỗ trợ cộng đồng</strong> người học tiếng Trung, tiếng Việt, tiếng Anh và tiếng Nhật trên toàn cầu.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>⚖️</span> Tuyên bố miễn trừ trách nhiệm pháp lý (Disclaimer of Warranties)
        </div>
        <div class="legal-card-desc">
          Ứng dụng được cung cấp theo nguyên tắc <strong>"Nguyên trạng" (As-Is)</strong>. Các kết quả tra từ điển, phiên âm Pinyin, âm Hán Việt, câu ví dụ, phát âm giọng đọc TTS, nhận diện ảnh OCR và dịch nghĩa AI được tổng hợp bằng các giải thuật máy tính và mô hình trí tuệ nhân tạo nhằm hỗ trợ học tập tham khảo.<br>
          Tác giả <strong>không đảm bảo tính chính xác tuyệt đối 100%</strong> trong các ngữ cảnh pháp lý chuyên nghiệp, hồ sơ y tế, giao dịch thương mại hay hợp đồng kinh tế. Người dùng tự chịu trách nhiệm khi áp dụng kết quả vào các trường hợp thực tế nêu trên. Tác giả không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp hay gián tiếp nào phát sinh từ việc sử dụng ứng dụng.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🏢</span> Quyền sở hữu nhãn hiệu bên thứ ba
        </div>
        <div class="legal-card-desc">
          Các liên kết ngoài và phím tắt tiện ích đến Pleco, LINE Dict, Baidu Baike, Hanzii, MDBG thuộc quyền sở hữu trí tuệ của các tổ chức tương ứng.
        </div>
      </div>
    `;

    sourcesHtml = `
      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>📖</span> Đại từ điển CC-CEDICT
          <span class="legal-badge">CC BY-SA 4.0</span>
        </div>
        <div class="legal-card-desc">
          Bộ từ điển Hán - Anh nguồn mở chuẩn mực quốc tế lớn nhất thế giới với hơn <strong>119.120 mục từ</strong>.<br>
          Đơn vị phát hành: <strong>MDBG & CC-CEDICT Community</strong><br>
          Giấy phép bản quyền: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>💬</span> Kho ngữ liệu câu ví dụ thực tế Tatoeba
          <span class="legal-badge">CC BY 2.0 FR</span>
        </div>
        <div class="legal-card-desc">
          Hàng nghìn câu ví dụ giao tiếp thực tế chuẩn bản ngữ hỗ trợ tra cứu ngữ cảnh sống động.<br>
          Đơn vị phát hành: <strong>Tatoeba Project (tatoeba.org)</strong><br>
          Giấy phép bản quyền: Creative Commons Attribution 2.0 France (CC BY 2.0 FR).
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>✍️</span> Make Me a Hanzi (MMAH) & HanziLookup
          <span class="legal-badge">ODbL / Arphic</span>
        </div>
        <div class="legal-card-desc">
          Bộ dữ liệu đồ họa thứ tự nét bút và thư viện nhận dạng chữ Hán viết tay offline.<br>
          Giấy phép bản quyền: Arphic Public License và Open Database License (ODbL).
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>🏆</span> Tiêu chuẩn năng lực Hán ngữ HSK 3.0
        </div>
        <div class="legal-card-desc">
          Dữ liệu từ vựng HSK 1 - 9 biên soạn dựa theo Khung tiêu chuẩn khảo thí năng lực tiếng Trung quốc tế ban hành bởi Bộ Giáo dục CHND Trung Hoa và CTI.
        </div>
      </div>

      <div class="legal-card-item">
        <div class="legal-card-title">
          <span>📷</span> Tesseract OCR & RapidOCR
          <span class="legal-badge">Apache 2.0</span>
        </div>
        <div class="legal-card-desc">
          Công nghệ quang học nhận dạng chữ Hán mã nguồn mở theo giấy phép Apache License 2.0.
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div id="legal-pane-privacy" class="legal-content-pane ${activeLegalTab === 'privacy' ? 'active' : ''}">
      ${privacyHtml}
    </div>
    <div id="legal-pane-terms" class="legal-content-pane ${activeLegalTab === 'terms' ? 'active' : ''}">
      ${termsHtml}
    </div>
    <div id="legal-pane-sources" class="legal-content-pane ${activeLegalTab === 'sources' ? 'active' : ''}">
      ${sourcesHtml}
    </div>
  `;
}
