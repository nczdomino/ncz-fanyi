/**
 * js/features/business.js
 * 
 * Interactive UI View for 商务中文 (Business Chinese & Foreign Trade):
 * - Sub-tab 1: Từ vựng & Thuật ngữ (Searchable glossary, category/level filter, audio, tips)
 * - Sub-tab 2: Mẫu Email (Email Studio with Formal/Concise toggle, dynamic placeholders, 1-click copy)
 * - Sub-tab 3: Chứng từ ngoại thương (Field-by-field breakdown, confusion distinction alerts)
 * - Sub-tab 4: Flashcard SRS (Spaced repetition 3D flip card with SM-2 rating buttons)
 * - Sub-tab 5: Luyện tập & Tình huống (Interactive multi-step roleplay dialogues & quizzes)
 * 
 * Dependencies:
 * - js/core/state.js
 * - js/features/business-service.js
 * - js/features/tts.js
 */

(function () {
  'use strict';

  // Internal module state
  const businessState = {
    activeSubTab: 'vocab', // 'vocab' | 'pinyin-quiz' | 'emails' | 'documents' | 'srs' | 'practice'
    searchQuery: '',
    selectedCategory: 'all',
    selectedLevel: 'all',
    activeEmailId: 'email_001_intro',
    emailIsConcise: false,
    emailPlaceholders: {},
    activeDocId: 'doc_001_commercial_invoice',
    srsCurrentIndex: 0,
    srsIsFlipped: false,
    srsCategoryFilter: 'all',
    activeScenarioId: 'scen_001_inquiry_initial',
    scenarioStepIndex: 0,
    scenarioUserChoices: {},
    activeQuizId: 'quiz_001_incoterms_cif_vs_fob',
    quizUserAnswer: null,
    pinyinQuiz: {
      items: [],
      currentIndex: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      categoryFilter: 'all',
      currentQuestion: null
    }
  };

  function getLang() {
    return (typeof state !== 'undefined' && state.uiLang) || 'vi';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getLocText(obj, lang) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['vi'] || obj['en'] || obj['ja'] || obj['zh'] || '';
  }

  // Play audio safely via global speakText or fallback
  window.bcPlayAudio = function (text, event) {
    if (event) event.stopPropagation();
    if (typeof speakText === 'function') {
      speakText(text, 'zh');
    } else if (typeof window.speechSynthesis !== 'undefined') {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      window.speechSynthesis.speak(u);
    }
  };

  // Toggle favorite
  window.bcToggleFavorite = function (termId, event) {
    if (event) event.stopPropagation();
    if (typeof BusinessService === 'undefined') return;
    const isFav = BusinessService.toggleFavorite(termId);
    const btn = document.querySelector(`.bc-fav-btn[data-id="${termId}"]`);
    if (btn) {
      btn.classList.toggle('active', isFav);
      btn.innerHTML = isFav ? '★' : '☆';
      btn.title = isFav ? (getLang() === 'vi' ? 'Đã lưu' : 'Favorited') : (getLang() === 'vi' ? 'Lưu từ này' : 'Add to favorites');
    }
  };

  // Main View Renderer
  window.renderBusinessView = function () {
    const container = document.getElementById('view-business');
    if (!container) return;

    if (typeof BusinessService === 'undefined') {
      container.innerHTML = `
        <div class="bc-empty-state">
          <div class="bc-empty-icon">⏳</div>
          <div class="bc-empty-title">Đang tải dữ liệu 商务中文...</div>
        </div>
      `;
      return;
    }

    const lang = getLang();
    const stats = BusinessService.getSRSStats();

    container.innerHTML = `
      <div class="bc-wrapper">
        <!-- Hero Header -->
        <header class="bc-hero">
          <div class="bc-hero-badge">
            <img src="assets/icons/app-icons/global-learning.png" width="18" height="18" alt="Business Chinese" style="object-fit:contain; vertical-align:middle; margin-right:4px;">
            <span>${t('bcHeroBadge') || '商务中文 · Business Chinese'}</span>
          </div>
          <h1 class="bc-hero-title">${t('bcHeroTitle') || 'Tiếng Trung Thương Mại & Ngoại Thương'}</h1>
          <p class="bc-hero-subtitle">${t('bcHeroSubtitle') || 'Từ điển chuyên ngành, email thực chiến, chứng từ, đàm phán và flashcard SRS ghi nhớ lâu'}</p>

          <!-- Metrics summary pill row -->
          <div class="bc-hero-metrics">
            <span class="bc-metric-pill"> <b>12</b> ${lang === 'vi' ? 'Danh mục' : (lang === 'ja' ? 'カテゴリー' : 'Categories')}</span>
            <span class="bc-metric-pill"> <b>144</b> ${lang === 'vi' ? 'Thuật ngữ' : (lang === 'ja' ? '専門用語' : 'Vocab')}</span>
            <span class="bc-metric-pill"> <b>11</b> ${lang === 'vi' ? 'Mẫu Email' : (lang === 'ja' ? '実務メール' : 'Emails')}</span>
            <span class="bc-metric-pill"> <b>10</b> ${lang === 'vi' ? 'Chứng từ' : (lang === 'ja' ? '船積書類' : 'Documents')}</span>
            <span class="bc-metric-pill">
              <img src="assets/icons/extras/lightning.png" width="14" height="14" alt="SRS" style="object-fit:contain; vertical-align:middle; margin-right:2px;">
              <b>${stats.dueToday}</b> ${lang === 'vi' ? 'Thẻ cần ôn' : (lang === 'ja' ? '復習必要' : 'Due SRS')}
            </span>
          </div>
        </header>

        <!-- Sub-Navigation Navigation Tabs -->
        <nav class="bc-subnav" role="tablist">
          <button class="bc-subnav-btn ${businessState.activeSubTab === 'vocab' ? 'active' : ''}" onclick="bcSwitchSubTab('vocab')">
            <span class="bc-tab-icon"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></span>
            <span>${t('bcTabVocab') || 'Từ vựng'}</span>
          </button>
          <button class="bc-subnav-btn ${businessState.activeSubTab === 'pinyin-quiz' ? 'active' : ''}" onclick="bcSwitchSubTab('pinyin-quiz')">
            <span class="bc-tab-icon"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.8"/><circle cx="12" cy="12" r="5" stroke-width="1.8"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg></span>
            <span>${lang === 'vi' ? 'Kiểm tra Pinyin' : (lang === 'ja' ? 'ピンインテスト' : 'Pinyin Test')}</span>
          </button>
          <button class="bc-subnav-btn ${businessState.activeSubTab === 'srs' ? 'active' : ''}" onclick="bcSwitchSubTab('srs')">
            <span class="bc-tab-icon"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg></span>
            <span>${t('bcTabSRS') || 'Flashcards'}</span>
            ${stats.dueToday > 0 ? `<span class="bc-srs-badge">${stats.dueToday}</span>` : ''}
          </button>
          <button class="bc-subnav-btn ${businessState.activeSubTab === 'emails' ? 'active' : ''}" onclick="bcSwitchSubTab('emails')">
            <span class="bc-tab-icon"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></span>
            <span>${t('bcTabEmails') || 'Mẫu Email'}</span>
          </button>
          <button class="bc-subnav-btn ${businessState.activeSubTab === 'documents' ? 'active' : ''}" onclick="bcSwitchSubTab('documents')">
            <span class="bc-tab-icon"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></span>
            <span>${t('bcTabDocs') || 'Chứng từ'}</span>
          </button>
          <button class="bc-subnav-btn ${businessState.activeSubTab === 'practice' ? 'active' : ''}" onclick="bcSwitchSubTab('practice')">
            <span class="bc-tab-icon"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></span>
            <span>${t('bcTabPractice') || 'Tình huống'}</span>
          </button>
        </nav>

        <!-- Sub-View Mount Point -->
        <main id="bc-subview-content" class="bc-content-area"></main>
      </div>
    `;

    renderActiveSubView();
  };

  window.bcSwitchSubTab = function (subTabName) {
    businessState.activeSubTab = subTabName;
    document.querySelectorAll('.bc-subnav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.bc-subnav-btn[onclick="bcSwitchSubTab('${subTabName}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
    renderActiveSubView();
  };

  function renderActiveSubView() {
    const mount = document.getElementById('bc-subview-content');
    if (!mount) return;

    switch (businessState.activeSubTab) {
      case 'vocab':
        renderVocabSubView(mount);
        break;
      case 'pinyin-quiz':
        renderPinyinQuizSubView(mount);
        break;
      case 'emails':
        renderEmailsSubView(mount);
        break;
      case 'documents':
        renderDocumentsSubView(mount);
        break;
      case 'srs':
        renderSRSSubView(mount);
        break;
      case 'practice':
        renderPracticeSubView(mount);
        break;
    }
  }

  // ========================================================
  // SUB-TAB 1: VOCABULARY & GLOSSARY
  // ========================================================
  function renderVocabSubView(mount) {
    const lang = getLang();
    const categories = BusinessService.getCategories();

    mount.innerHTML = `
      <div class="bc-vocab-layout">
        <!-- Search and Filter Bar -->
        <div class="bc-search-panel">
          <form class="bc-search-form" action="javascript:void(0)" role="search" onsubmit="event.preventDefault()">
            <div class="bc-search-input-wrap">
              <span class="bc-search-lens"><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2m1.7-4.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"/></svg></span>
              <input 
                type="search" 
                id="bc-vocab-search-input" 
                class="bc-search-input"
                placeholder="${escapeHtml(t('bcSearchPlaceholder') || 'Tìm thuật ngữ, pinyin, tiếng Việt, tiếng Anh...')}" 
                value="${escapeHtml(businessState.searchQuery)}"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                enterkeyhint="search"
                oninput="bcOnVocabSearch(this.value)"
              />
              ${businessState.searchQuery ? `<button type="button" class="bc-clear-btn" onclick="bcClearVocabSearch()">✕</button>` : ''}
            </div>
          </form>

          <!-- Filters row -->
          <div class="bc-filter-row">
            <div class="bc-filter-group">
              <label class="bc-filter-label"> ${lang === 'vi' ? 'Danh mục:' : (lang === 'ja' ? 'カテゴリー:' : 'Category:')}</label>
              <select class="bc-select" id="bc-cat-filter" onchange="bcOnCategoryFilter(this.value)">
                <option value="all">${t('bcAllCategories') || 'Tất cả danh mục'}</option>
                ${categories.map(c => `
                  <option value="${c.id}" ${businessState.selectedCategory === c.id ? 'selected' : ''}>
                    ${c.icon} ${escapeHtml(c.zhName)} (${escapeHtml(getLocText(c.name, lang))})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="bc-filter-group">
              <label class="bc-filter-label"> ${lang === 'vi' ? 'Cấp độ:' : (lang === 'ja' ? '難易度:' : 'Level:')}</label>
              <select class="bc-select" id="bc-level-filter" onchange="bcOnLevelFilter(this.value)">
                <option value="all">${t('bcAllLevels') || 'Tất cả cấp độ'}</option>
                <option value="beginner" ${businessState.selectedLevel === 'beginner' ? 'selected' : ''}> ${t('bcLevelBeginner') || 'Cơ bản'}</option>
                <option value="intermediate" ${businessState.selectedLevel === 'intermediate' ? 'selected' : ''}> ${t('bcLevelIntermediate') || 'Trung cấp'}</option>
                <option value="advanced" ${businessState.selectedLevel === 'advanced' ? 'selected' : ''}> ${t('bcLevelAdvanced') || 'Nâng cao'}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Pinyin Quiz Interactive Banner -->
        <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-xl, 18px); padding:16px 20px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:42px; height:42px; border-radius:50%; background:var(--accent-subtle); display:flex; align-items:center; justify-content:center; color:var(--accent); flex-shrink:0;">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.8"/><circle cx="12" cy="12" r="5" stroke-width="1.8"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
            </div>
            <div>
              <div style="font-weight:700; font-size:14.5px; color:var(--text-primary);">${lang === 'vi' ? 'Kiểm tra phản xạ Pinyin & Thanh điệu' : (lang === 'ja' ? 'ピンイン・声調判定テスト' : 'Pinyin Tone Mastery Quiz')}</div>
              <div style="font-size:13px; color:var(--text-secondary); margin-top:2px;">${lang === 'vi' ? 'Thử thách chọn Pinyin chính xác của 144 thuật ngữ ngoại thương' : (lang === 'ja' ? '144の貿易専門用語のピンインと声調をテスト' : 'Challenge your pronunciation and tone recognition across 144 trade terms')}</div>
            </div>
          </div>
          <button class="bc-pinyin-action-btn" onclick="bcSwitchSubTab('pinyin-quiz')" style="padding:10px 20px; font-size:13.5px;">
            <span>${lang === 'vi' ? 'Bắt đầu Test ngay →' : (lang === 'ja' ? '今すぐテスト →' : 'Start Pinyin Quiz →')}</span> 
          </button>
        </div>

        <!-- Vocab Cards List Mount -->
        <div id="bc-vocab-list" class="bc-vocab-grid"></div>
      </div>
    `;

    renderVocabCards();
  }

  window.bcOnVocabSearch = function (val) {
    businessState.searchQuery = val;
    renderVocabCards();
  };

  window.bcClearVocabSearch = function () {
    businessState.searchQuery = '';
    const inp = document.getElementById('bc-vocab-search-input');
    if (inp) inp.value = '';
    renderVocabCards();
  };

  window.bcOnCategoryFilter = function (val) {
    businessState.selectedCategory = val;
    renderVocabCards();
  };

  window.bcOnLevelFilter = function (val) {
    businessState.selectedLevel = val;
    renderVocabCards();
  };

  function renderVocabCards() {
    const listContainer = document.getElementById('bc-vocab-list');
    if (!listContainer) return;

    const lang = getLang();
    const results = BusinessService.searchVocabulary(businessState.searchQuery, {
      category: businessState.selectedCategory,
      level: businessState.selectedLevel
    });

    if (results.length === 0) {
      listContainer.innerHTML = `
        <div class="bc-empty-state">
          <div class="bc-empty-icon"></div>
          <div class="bc-empty-title">${lang === 'vi' ? 'Không tìm thấy thuật ngữ phù hợp' : (lang === 'ja' ? '該当する用語が見つかりません' : 'No matching terms found')}</div>
          <p class="bc-empty-desc">${lang === 'vi' ? 'Hãy thử tìm bằng từ khóa khác hoặc bỏ bớt bộ lọc' : 'Try broadening your search criteria or resetting filters'}</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = results.map(item => {
      const isFav = BusinessService.isFavorite(item.id);
      const catObj = BusinessService.getCategoryById(item.category);
      const transObj = (item.translations && item.translations[lang]) || (item.translations && item.translations['vi']) || {};
      const meaning = transObj.meaning || '';
      const note = transObj.note || '';

      const examplesHtml = (item.examples || []).map(ex => {
        const exTrans = (ex.translations && ex.translations[lang]) || (ex.translations && ex.translations['vi']) || '';
        return `
          <div class="bc-example-row">
            <div class="bc-ex-zh">
              <span class="bc-ex-speaker" onclick="bcPlayAudio('${escapeQuotes(ex.zh)}', event)" title="Nghe câu này" aria-label="Phát âm">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </span>
              <span>${escapeHtml(ex.zh)}</span>
            </div>
            <div class="bc-ex-py">${escapeHtml(ex.pinyin)}</div>
            ${exTrans ? `<div class="bc-ex-tr">${escapeHtml(exTrans)}</div>` : ''}
          </div>
        `;
      }).join('');

      const tipText = item.businessTip ? getLocText(item.businessTip, lang) : '';

      return `
        <article class="bc-card" id="bc-card-${item.id}">
          <div class="bc-card-header">
            <div class="bc-card-title-group">
              <span class="bc-card-hanzi">${escapeHtml(item.term)}</span>
              <span class="bc-card-pinyin">${escapeHtml(item.pinyin)}</span>
            </div>
            <div class="bc-card-actions">
              <button class="bc-test-pinyin-btn" onclick="bcStartPinyinQuizWithTerm('${item.id}', event)" title="${lang === 'vi' ? 'Kiểm tra Pinyin từ này' : 'Test Pinyin'}">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke-width="1.8"/></svg>
                <span>${lang === 'vi' ? 'Test Pinyin' : 'Quiz'}</span>
              </button>
              <button class="bc-audio-btn" onclick="bcPlayAudio('${escapeHtml(item.term)}', event)" title="Phát âm" aria-label="Phát âm">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </button>
              <button class="bc-fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" onclick="bcToggleFavorite('${item.id}', event)" title="Lưu từ này">
                ${isFav ? '★' : '☆'}
              </button>
            </div>
          </div>

          <div class="bc-card-badges">
            ${catObj ? `<span class="bc-badge bc-badge-cat">${catObj.icon} ${escapeHtml(catObj.zhName)}</span>` : ''}
            <span class="bc-badge bc-badge-level bc-level-${item.level}">${escapeHtml(item.level)}</span>
            ${(item.tags || []).slice(0, 3).map(t => `<span class="bc-badge bc-badge-tag">#${escapeHtml(t)}</span>`).join('')}
          </div>

          <div class="bc-card-meaning">
            <div class="bc-def-main"><strong>${escapeHtml(meaning)}</strong></div>
            ${note ? `<div class="bc-def-note"> ${escapeHtml(note)}</div>` : ''}
          </div>

          ${examplesHtml ? `<div class="bc-card-examples">${examplesHtml}</div>` : ''}

          ${tipText ? `
            <div class="bc-card-protip">
              <div class="bc-protip-label"> ${lang === 'vi' ? 'Kinh nghiệm thực chiến:' : (lang === 'ja' ? '実務ノウハウ:' : 'Business Pro Tip:')}</div>
              <div class="bc-protip-body">${escapeHtml(tipText)}</div>
            </div>
          ` : ''}
        </article>
      `;
    }).join('');
  }

  // ========================================================
  // SUB-TAB 2: COMMERCIAL EMAIL STUDIO
  // ========================================================
  function renderEmailsSubView(mount) {
    const lang = getLang();
    const emails = BusinessService.getEmailTemplates();
    const currentEmail = BusinessService.getEmailTemplateById(businessState.activeEmailId) || emails[0];
    if (!currentEmail) return;

    businessState.activeEmailId = currentEmail.id;

    // Compiled preview
    const rendered = BusinessService.renderEmailTemplate(
      currentEmail.id,
      businessState.emailPlaceholders,
      businessState.emailIsConcise,
      'zh'
    );

    mount.innerHTML = `
      <div class="bc-email-layout">
        <!-- Sidebar Template Selector -->
        <aside class="bc-email-sidebar">
          <div class="bc-sidebar-header">
            <h3> ${lang === 'vi' ? 'Danh sách mẫu Email' : (lang === 'ja' ? 'メールテンプレート一覧' : 'Email Templates')}</h3>
            <span class="bc-badge bc-badge-cat">${emails.length} ${lang === 'vi' ? 'mẫu' : 'templates'}</span>
          </div>
          <div class="bc-email-nav-list">
            ${emails.map((em, idx) => `
              <button 
                class="bc-email-nav-item ${em.id === currentEmail.id ? 'active' : ''}" 
                onclick="bcSelectEmail('${em.id}')"
              >
                <div class="bc-email-nav-num">0${idx + 1}</div>
                <div class="bc-email-nav-info">
                  <div class="bc-email-nav-title">${escapeHtml(getLocText(em.subject, lang))}</div>
                  <div class="bc-email-nav-role">${escapeHtml(getLocText(em.recipientType, lang))}</div>
                </div>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Main Studio Area -->
        <section class="bc-email-main">
          <!-- Template Header -->
          <div class="bc-email-header-card">
            <div class="bc-email-meta-top">
              <span class="bc-badge bc-badge-cat"> ${escapeHtml(currentEmail.category)}</span>
              <div class="bc-mode-toggle">
                <button 
                  class="bc-toggle-pill ${!businessState.emailIsConcise ? 'active' : ''}" 
                  onclick="bcSetEmailMode(false)"
                >
                   ${t('bcFormal') || 'Trang trọng'}
                </button>
                <button 
                  class="bc-toggle-pill ${businessState.emailIsConcise ? 'active' : ''}" 
                  onclick="bcSetEmailMode(true)"
                >
                   ${t('bcConcise') || 'Ngắn gọn / Nhắn tin'}
                </button>
              </div>
            </div>

            <h2 class="bc-email-subject">${escapeHtml(getLocText(currentEmail.subject, lang))}</h2>
            <div class="bc-email-purpose"> <b>${lang === 'vi' ? 'Mục đích:' : (lang === 'ja' ? '用途:' : 'Objective:')}</b> ${escapeHtml(getLocText(currentEmail.purpose, lang))}</div>
          </div>

          <!-- Dynamic Placeholders Form -->
          <div class="bc-placeholders-panel">
            <div class="bc-panel-title"> ${lang === 'vi' ? 'Tùy chỉnh thông tin trong ngoặc [ ]' : (lang === 'ja' ? '変数 [ ] のカスタマイズ入力' : 'Customize Placeholders [ ]')}</div>
            <div class="bc-placeholders-grid">
              ${(currentEmail.placeholders || []).map(ph => `
                <div class="bc-field-box">
                  <label class="bc-field-label">${escapeHtml(getLocText(ph.label, lang))} <small>[${ph.key}]</small></label>
                  <input 
                    type="text" 
                    class="bc-field-input" 
                    placeholder="${escapeHtml(ph.example)}" 
                    value="${escapeHtml(businessState.emailPlaceholders[ph.key] !== undefined ? businessState.emailPlaceholders[ph.key] : ph.example)}"
                    oninput="bcUpdatePlaceholder('${ph.key}', this.value)"
                  />
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Output Preview and 1-Click Copy -->
          <div class="bc-email-preview-box">
            <div class="bc-preview-toolbar">
              <span class="bc-preview-tag"> ${lang === 'vi' ? 'Bản thảo hoàn chỉnh (Tiếng Trung):' : (lang === 'ja' ? '完成文プレビュー（中国語）' : 'Compiled Chinese Output')}</span>
              <button class="bc-copy-btn" id="bc-email-copy-btn" onclick="bcCopyEmailText()">
                 <span id="bc-copy-text">${t('bcCopyEmail') || 'Sao chép toàn bộ thư'}</span>
              </button>
            </div>
            <div class="bc-email-output-content" id="bc-compiled-email-text">${escapeHtml(rendered.fullText)}</div>
          </div>

          <!-- Parallel Translation Reference -->
          <div class="bc-email-translation-box">
            <div class="bc-panel-title"> ${lang === 'vi' ? 'Bản dịch tham khảo (' + lang.toUpperCase() + '):' : 'Reference Translation (' + lang.toUpperCase() + ')'}</div>
            <div class="bc-email-trans-content">
              ${escapeHtml(BusinessService.renderEmailTemplate(currentEmail.id, businessState.emailPlaceholders, businessState.emailIsConcise, lang).fullText)}
            </div>
          </div>
        </section>
      </div>
    `;
  }

  window.bcSelectEmail = function (id) {
    businessState.activeEmailId = id;
    businessState.emailPlaceholders = {};
    renderActiveSubView();
  };

  window.bcSetEmailMode = function (isConcise) {
    businessState.emailIsConcise = isConcise;
    renderActiveSubView();
  };

  window.bcUpdatePlaceholder = function (key, value) {
    businessState.emailPlaceholders[key] = value;
    const currentEmail = BusinessService.getEmailTemplateById(businessState.activeEmailId);
    if (!currentEmail) return;

    const rendered = BusinessService.renderEmailTemplate(
      currentEmail.id,
      businessState.emailPlaceholders,
      businessState.emailIsConcise,
      'zh'
    );

    const outElem = document.getElementById('bc-compiled-email-text');
    if (outElem) outElem.textContent = rendered.fullText;
  };

  window.bcCopyEmailText = function () {
    const outElem = document.getElementById('bc-compiled-email-text');
    if (!outElem) return;

    const text = outElem.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('bc-email-copy-btn');
      const txt = document.getElementById('bc-copy-text');
      if (btn && txt) {
        btn.classList.add('copied');
        txt.textContent = t('bcCopied') || 'Đã sao chép!';
        setTimeout(() => {
          btn.classList.remove('copied');
          txt.textContent = t('bcCopyEmail') || 'Sao chép toàn bộ thư';
        }, 2200);
      }
    }).catch(err => {
      console.error('Copy failed', err);
    });
  };

  // ========================================================
  // SUB-TAB 3: TRADE DOCUMENTS
  // ========================================================
  function renderDocumentsSubView(mount) {
    const lang = getLang();
    const docs = BusinessService.getTradeDocuments();
    const currentDoc = BusinessService.getTradeDocumentById(businessState.activeDocId) || docs[0];
    if (!currentDoc) return;

    businessState.activeDocId = currentDoc.id;

    mount.innerHTML = `
      <div class="bc-docs-layout">
        <!-- Sidebar Document List -->
        <aside class="bc-docs-sidebar">
          <div class="bc-sidebar-header">
            <h3> ${lang === 'vi' ? 'Chứng từ xuất nhập khẩu' : (lang === 'ja' ? '貿易船積書類一覧' : 'Trade Documents')}</h3>
            <span class="bc-badge bc-badge-cat">10 ${lang === 'vi' ? 'chứng từ' : 'docs'}</span>
          </div>
          <div class="bc-docs-nav-list">
            ${docs.map((doc, idx) => `
              <button 
                class="bc-doc-nav-item ${doc.id === currentDoc.id ? 'active' : ''}" 
                onclick="bcSelectDoc('${doc.id}')"
              >
                <span class="bc-doc-nav-badge">0${idx + 1}</span>
                <div class="bc-doc-nav-names">
                  <div class="bc-doc-nav-zh">${escapeHtml(doc.nameZh)}</div>
                  <div class="bc-doc-nav-sub">${escapeHtml(doc['name' + lang.charAt(0).toUpperCase() + lang.slice(1)] || doc.nameVi)}</div>
                </div>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Document Viewer and Fields -->
        <section class="bc-doc-main">
          <!-- Document Hero Header -->
          <div class="bc-doc-header-card">
            <div class="bc-doc-badge-row">
              <span class="bc-badge bc-badge-cat">Core Trade Document</span>
              <button class="bc-audio-btn" onclick="bcPlayAudio('${escapeQuotes(currentDoc.nameZh)}', event)" title="Nghe phát âm" style="gap:5px; padding:6px 12px; width:auto;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                <span>Nghe tên chứng từ</span>
              </button>
            </div>
            <h2 class="bc-doc-name-zh">${escapeHtml(currentDoc.nameZh)} <small>(${escapeHtml(currentDoc.pinyin)})</small></h2>
            <div class="bc-doc-name-local">${escapeHtml(currentDoc['name' + lang.charAt(0).toUpperCase() + lang.slice(1)] || currentDoc.nameVi)}</div>

            <!-- Purpose Box -->
            <div class="bc-doc-purpose-box">
              <div class="bc-box-label"> ${lang === 'vi' ? 'Mục đích & Ý nghĩa pháp lý:' : (lang === 'ja' ? '法的意義・使用目的:' : 'Commercial & Legal Purpose:')}</div>
              <div class="bc-box-body">${escapeHtml(getLocText(currentDoc.purpose, lang))}</div>
            </div>

            <!-- Distinction Alert -->
            ${currentDoc.distinctionTip ? `
              <div class="bc-doc-alert-box">
                <div class="bc-alert-body">${escapeHtml(getLocText(currentDoc.distinctionTip, lang))}</div>
              </div>
            ` : ''}
          </div>

          <!-- Standard Fields Breakdown Table -->
          <div class="bc-doc-fields-section">
            <h3 class="bc-fields-header"> ${lang === 'vi' ? 'Chi tiết các ô / mục trên chứng từ:' : (lang === 'ja' ? '主要記載項目・フィールド別解説:' : 'Field-by-Field Breakdown:')}</h3>
            
            <div class="bc-fields-grid">
              ${(currentDoc.standardFields || []).map((fld, fIdx) => `
                <div class="bc-field-card">
                  <div class="bc-field-card-header">
                    <span class="bc-field-tag">Box 0${fIdx + 1}</span>
                    <span class="bc-field-zh">${escapeHtml(fld.fieldZh)}</span>
                    <button class="bc-mini-speaker" onclick="bcPlayAudio('${escapeQuotes(fld.fieldZh.split('(')[0])}', event)" title="Nghe phát âm" aria-label="Phát âm">
                      <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                    </button>
                  </div>
                  <div class="bc-field-en">${escapeHtml(fld.fieldEn)}</div>
                  <div class="bc-field-desc">${escapeHtml(getLocText(fld.explanation, lang))}</div>
                  <div class="bc-field-sample">
                    <span class="bc-sample-tag">${lang === 'vi' ? 'Ví dụ thực tế:' : 'Sample:'}</span>
                    <code>${escapeHtml(fld.sampleValue)}</code>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  }

  window.bcSelectDoc = function (id) {
    businessState.activeDocId = id;
    renderActiveSubView();
  };

  // ========================================================
  // SUB-TAB 4: FLASHCARD SRS (SPACED REPETITION)
  // ========================================================
  function renderSRSSubView(mount) {
    const lang = getLang();
    const categories = BusinessService.getCategories();
    const dueCards = BusinessService.getDueSRSCards(businessState.srsCategoryFilter, 30);
    const stats = BusinessService.getSRSStats();

    if (dueCards.length === 0) {
      mount.innerHTML = `
        <div class="bc-srs-empty">
          <div class="bc-empty-icon"></div>
          <h2>${lang === 'vi' ? 'Tuyệt vời! Bạn đã hoàn thành hết thẻ ôn tập hôm nay!' : (lang === 'ja' ? 'おめでとうございます！本日の復習は完了しました！' : 'All caught up! No due cards today!')}</h2>
          <p>${lang === 'vi' ? 'Hệ thống SRS đã ghi nhớ tiến độ. Hãy quay lại vào ngày mai để củng cố trí nhớ dài hạn nhé.' : 'The spaced repetition engine has scheduled your reviews for optimal long-term retention.'}</p>
          <div class="bc-hero-metrics" style="justify-content:center; margin-top:20px;">
            <span class="bc-metric-pill"> <b>${stats.mastered}</b> ${lang === 'vi' ? 'Đã thuộc làu' : 'Mastered'}</span>
            <span class="bc-metric-pill"> <b>${stats.learning}</b> ${lang === 'vi' ? 'Đang học' : 'Learning'}</span>
            <span class="bc-metric-pill"> <b>${stats.totalVocab}</b> ${lang === 'vi' ? 'Tổng từ vựng' : 'Total Terms'}</span>
          </div>
        </div>
      `;
      return;
    }

    if (businessState.srsCurrentIndex >= dueCards.length) {
      businessState.srsCurrentIndex = 0;
    }

    const currentCard = dueCards[businessState.srsCurrentIndex];
    const transObj = (currentCard.translations && currentCard.translations[lang]) || (currentCard.translations && currentCard.translations['vi']) || {};
    const catObj = BusinessService.getCategoryById(currentCard.category);
    const cardState = BusinessService.getSRSCardState(currentCard.id);

    mount.innerHTML = `
      <div class="bc-srs-layout">
        <!-- SRS Header & Stats Bar -->
        <div class="bc-srs-top-bar">
          <div class="bc-srs-progress-counter">
            ${lang === 'vi' ? 'Thẻ' : 'Card'} <b>${businessState.srsCurrentIndex + 1}</b> / ${dueCards.length}
          </div>

          <div class="bc-srs-cat-picker">
            <select class="bc-select bc-select-sm" onchange="bcSetSRSCategory(this.value)">
              <option value="all">${t('bcAllCategories') || 'Tất cả danh mục'}</option>
              ${categories.map(c => `
                <option value="${c.id}" ${businessState.srsCategoryFilter === c.id ? 'selected' : ''}>
                  ${c.icon} ${escapeHtml(c.zhName)}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="bc-srs-mini-stats">
            <span class="bc-stat-badge"> Review: ${cardState.repetitions} lần</span>
            <span class="bc-stat-badge">⏱ Interval: ${cardState.interval}d</span>
          </div>
        </div>

        <!-- 3D Flip Card Container -->
        <div class="bc-flashcard-container" onclick="bcFlipSRSCard()">
          <div class="bc-flashcard ${businessState.srsIsFlipped ? 'is-flipped' : ''}">
            <!-- Card Front -->
            <div class="bc-card-face bc-card-front">
              <div class="bc-face-tag">
                ${catObj ? `${catObj.icon} ${catObj.zhName}` : ''}
              </div>
              <div class="bc-front-hanzi">${escapeHtml(currentCard.term)}</div>
              <div class="bc-front-pinyin">${escapeHtml(currentCard.pinyin)}</div>
              <button class="bc-front-audio" onclick="bcPlayAudio('${escapeHtml(currentCard.term)}', event)" title="Nghe phát âm" aria-label="Nghe phát âm">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </button>
              <div class="bc-flip-hint">${t('bcFlipCard') || 'Chạm để lật xem nghĩa & bí kíp'}</div>
            </div>

            <!-- Card Back -->
            <div class="bc-card-face bc-card-back">
              <div class="bc-back-term-summary">
                <span class="bc-back-hanzi">${escapeHtml(currentCard.term)}</span>
                <span class="bc-back-pinyin">${escapeHtml(currentCard.pinyin)}</span>
                <button class="bc-mini-speaker" onclick="bcPlayAudio('${escapeHtml(currentCard.term)}', event)" title="Nghe phát âm" aria-label="Phát âm">
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
              </div>

              <div class="bc-back-meaning">
                <div class="bc-back-def"><strong>${escapeHtml(transObj.meaning || '')}</strong></div>
                ${transObj.note ? `<div class="bc-back-note"> ${escapeHtml(transObj.note)}</div>` : ''}
              </div>

              <!-- First Example -->
              ${(currentCard.examples && currentCard.examples[0]) ? `
                <div class="bc-back-example">
                  <div class="bc-ex-zh">${escapeHtml(currentCard.examples[0].zh)}</div>
                  <div class="bc-ex-tr">${escapeHtml(getLocText(currentCard.examples[0].translations, lang))}</div>
                </div>
              ` : ''}

              <!-- Business Tip -->
              ${currentCard.businessTip ? `
                <div class="bc-back-tip">
                   <b>Mẹo nghề:</b> ${escapeHtml(getLocText(currentCard.businessTip, lang))}
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Rating Buttons Bar (Only visible when card is flipped) -->
        <div class="bc-srs-actions-bar ${businessState.srsIsFlipped ? 'visible' : ''}">
          <button class="bc-srs-rate-btn rate-again" onclick="bcRateSRSCard('${currentCard.id}', 'again')">
            <span class="rate-icon">↺</span>
            <span class="rate-label">${t('bcAgain') || 'Chưa nhớ'}</span>
            <span class="rate-time">1d</span>
          </button>
          <button class="bc-srs-rate-btn rate-hard" onclick="bcRateSRSCard('${currentCard.id}', 'hard')">
            <span class="rate-icon">⚡</span>
            <span class="rate-label">${t('bcHard') || 'Khó'}</span>
            <span class="rate-time">~2d</span>
          </button>
          <button class="bc-srs-rate-btn rate-good" onclick="bcRateSRSCard('${currentCard.id}', 'good')">
            <span class="rate-icon">✓</span>
            <span class="rate-label">${t('bcGood') || 'Tốt'}</span>
            <span class="rate-time">~6d</span>
          </button>
          <button class="bc-srs-rate-btn rate-easy" onclick="bcRateSRSCard('${currentCard.id}', 'easy')">
            <span class="rate-icon">★</span>
            <span class="rate-label">${t('bcEasy') || 'Rất dễ'}</span>
            <span class="rate-time">~10d</span>
          </button>
        </div>
      </div>
    `;
  }

  window.bcFlipSRSCard = function () {
    businessState.srsIsFlipped = !businessState.srsIsFlipped;
    const cardElem = document.querySelector('.bc-flashcard');
    const actionsElem = document.querySelector('.bc-srs-actions-bar');
    if (cardElem) cardElem.classList.toggle('is-flipped', businessState.srsIsFlipped);
    if (actionsElem) actionsElem.classList.toggle('visible', businessState.srsIsFlipped);
  };

  window.bcRateSRSCard = function (cardId, rating) {
    BusinessService.recordSRSReview(cardId, rating);
    businessState.srsIsFlipped = false;
    businessState.srsCurrentIndex += 1;
    renderActiveSubView();
  };

  window.bcSetSRSCategory = function (cat) {
    businessState.srsCategoryFilter = cat;
    businessState.srsCurrentIndex = 0;
    businessState.srsIsFlipped = false;
    renderActiveSubView();
  };

  // ========================================================
  // SUB-TAB 5: PRACTICE, SCENARIOS & QUIZZES
  // ========================================================
  function renderPracticeSubView(mount) {
    const lang = getLang();
    const scenarios = BusinessService.getScenarios();
    const quizzes = BusinessService.getQuizzes();

    const currentScen = BusinessService.getScenarioById(businessState.activeScenarioId) || scenarios[0];
    const currentQuiz = BusinessService.getQuizById(businessState.activeQuizId) || quizzes[0];

    mount.innerHTML = `
      <div class="bc-practice-layout">
        <!-- Section A: 10 Interactive Roleplay Scenarios -->
        <section class="bc-practice-section">
          <div class="bc-sec-header">
            <h2> ${lang === 'vi' ? 'Tình huống nhập vai thực chiến' : (lang === 'ja' ? '実践ビジネスロールプレイ' : 'Interactive Business Roleplay')}</h2>
            <p>${lang === 'vi' ? 'Đóng vai nhân viên kinh doanh / thu mua đối thoại từng bước xử lý tình huống thực tế' : 'Step-by-step business roleplay simulations'}</p>
          </div>

          <!-- Scenario Tabs Picker -->
          <div class="bc-pill-carousel">
            ${scenarios.map((sc, idx) => `
              <button 
                class="bc-pill-item ${sc.id === currentScen.id ? 'active' : ''}" 
                onclick="bcSelectScenario('${sc.id}')"
              >
                ${idx + 1}. ${escapeHtml(getLocText(sc.title, lang))}
              </button>
            `).join('')}
          </div>

          <!-- Active Scenario Card -->
          ${renderScenarioCard(currentScen, lang)}
        </section>

        <!-- Section B: 24 Contextual Situational Quizzes -->
        <section class="bc-practice-section" style="margin-top:36px;">
          <div class="bc-sec-header">
            <h2> ${lang === 'vi' ? 'Trắc nghiệm tình huống nghiệp vụ' : (lang === 'ja' ? '貿易実務クイズ演習' : 'Situational Trade Quizzes')}</h2>
            <p>${lang === 'vi' ? '24 câu đố tình huống chuyên sâu về Incoterms, thanh toán L/C, thủ tục Hải quan và Logistics' : '24 trade scenarios testing Incoterms, LC, customs and logistics'}</p>
          </div>

          <!-- Quiz Picker -->
          <div class="bc-quiz-grid-picker">
            ${quizzes.map((q, qIdx) => {
              const prog = BusinessService.getProgress();
              const isAnswered = prog.completedQuizzes && prog.completedQuizzes[q.id];
              return `
                <button 
                  class="bc-quiz-num-btn ${q.id === currentQuiz.id ? 'active' : ''} ${isAnswered ? (isAnswered.isCorrect ? 'correct' : 'wrong') : ''}"
                  onclick="bcSelectQuiz('${q.id}')"
                >
                  ${qIdx + 1}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Active Quiz Card -->
          ${renderQuizCard(currentQuiz, lang)}
        </section>
      </div>
    `;
  }

  function renderScenarioCard(scenario, lang) {
    if (!scenario || !scenario.steps) return '';
    const stepIdx = businessState.scenarioStepIndex;
    const currentStep = scenario.steps[stepIdx] || scenario.steps[0];
    const userChoiceIdx = businessState.scenarioUserChoices[scenario.id + '_' + stepIdx];
    const selectedOpt = userChoiceIdx !== undefined && userChoiceIdx !== null ? currentStep.options[userChoiceIdx] : null;

    let nextStepActionHtml = '';
    if (selectedOpt) {
      if (selectedOpt.nextStepIndex !== null && selectedOpt.nextStepIndex !== undefined && scenario.steps[selectedOpt.nextStepIndex]) {
        nextStepActionHtml = `
          <div class="bc-scenario-action-bar" style="margin-top:18px; text-align:right;">
            <button class="btn btn-primary" onclick="bcAdvanceScenarioStep(${selectedOpt.nextStepIndex})" style="border-radius:var(--radius-pill); padding:10px 22px; font-weight:700; font-size:13px; display:inline-flex; align-items:center; gap:6px;">
              <span>${lang === 'vi' ? 'Tiếp tục bước đối thoại tiếp theo' : (lang === 'ja' ? '次の対話へ進む' : 'Continue to Next Step')}</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        `;
      } else {
        nextStepActionHtml = `
          <div class="bc-scenario-action-bar" style="margin-top:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 16px; background:rgba(217,45,67,0.06); border:1px solid rgba(217,45,67,0.18); border-radius:12px;">
            <span style="font-size:13px; font-weight:700; color:var(--accent);">🎉 ${lang === 'vi' ? 'Bạn đã hoàn thành tình huống đàm phán này!' : (lang === 'ja' ? 'ロールプレイ完了！' : 'Negotiation Scenario Completed!')}</span>
            <button class="btn btn-secondary btn-sm" onclick="bcRestartScenario('${scenario.id}')" style="border-radius:var(--radius-pill); font-weight:600;">
              ↺ ${lang === 'vi' ? 'Làm lại tình huống' : (lang === 'ja' ? '最初からやり直す' : 'Practice Again')}
            </button>
          </div>
        `;
      }
    }

    return `
      <div class="bc-scenario-box">
        <div class="bc-scen-meta">
          <span class="bc-badge bc-badge-cat">Scenario #${scenario.id.split('_')[1]}</span>
          <span class="bc-badge bc-badge-tag">${escapeHtml(scenario.category)}</span>
          <span class="bc-badge bc-badge-step" style="background:var(--bg-muted); color:var(--text-secondary); font-weight:700;">${lang === 'vi' ? 'Bước' : (lang === 'ja' ? 'ステップ' : 'Step')} ${stepIdx + 1}/${scenario.steps.length}</span>
        </div>

        <h3 class="bc-scen-title">${escapeHtml(getLocText(scenario.title, lang))}</h3>
        <div class="bc-scen-context"> <b>${lang === 'vi' ? 'Bối cảnh:' : 'Context:'}</b> ${escapeHtml(getLocText(scenario.context, lang))}</div>

        <!-- Speaker Prompt Bubble -->
        <div class="bc-dialogue-card">
          <div class="bc-dialogue-speaker">
            <span class="bc-avatar"><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></span>
            <span class="bc-speaker-role">${escapeHtml(getLocText(currentStep.speakerRole, lang))}</span>
            <button class="bc-mini-speaker" onclick="bcPlayAudio('${escapeQuotes(currentStep.promptZh)}', event)">
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              <span>Nghe</span>
            </button>
          </div>
          <div class="bc-dialogue-prompt-zh">${escapeHtml(currentStep.promptZh)}</div>
          <div class="bc-dialogue-prompt-py">${escapeHtml(currentStep.promptPinyin)}</div>
          <div class="bc-dialogue-prompt-tr">${escapeHtml(getLocText(currentStep.promptTranslation, lang))}</div>
        </div>

        <!-- User Decision Options -->
        <div class="bc-options-group">
          <div class="bc-opt-heading"> ${lang === 'vi' ? 'Chọn câu trả lời đàm phán tối ưu nhất của bạn:' : 'Choose your negotiation response:'}</div>
          ${currentStep.options.map((opt, oIdx) => {
            const isSelected = userChoiceIdx === oIdx;
            return `
              <div class="bc-option-wrapper ${isSelected ? (opt.isRecommended ? 'selected-correct' : 'selected-wrong') : ''}">
                <button class="bc-option-btn" onclick="bcChooseScenarioOption('${scenario.id}', ${stepIdx}, ${oIdx})">
                  <span class="bc-opt-letter">${String.fromCharCode(65 + oIdx)}.</span>
                  <div class="bc-opt-text-block">
                    <div class="bc-opt-zh">${escapeHtml(opt.text.zh)}</div>
                    <div class="bc-opt-py">${escapeHtml(opt.text.pinyin)}</div>
                    <div class="bc-opt-tr">${escapeHtml(getLocText(opt.text.translations, lang))}</div>
                  </div>
                </button>
                ${isSelected ? `
                  <div class="bc-option-feedback ${opt.isRecommended ? 'feedback-good' : 'feedback-caution'}">
                    ${escapeHtml(getLocText(opt.feedback, lang))}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        ${nextStepActionHtml}
      </div>
    `;
  }

  window.bcSelectScenario = function (id) {
    businessState.activeScenarioId = id;
    businessState.scenarioStepIndex = 0;
    renderActiveSubView();
  };

  window.bcAdvanceScenarioStep = function (nextIdx) {
    businessState.scenarioStepIndex = nextIdx;
    renderActiveSubView();
  };

  window.bcRestartScenario = function (scenId) {
    businessState.scenarioStepIndex = 0;
    delete businessState.scenarioUserChoices[scenId + '_0'];
    delete businessState.scenarioUserChoices[scenId + '_1'];
    delete businessState.scenarioUserChoices[scenId + '_2'];
    renderActiveSubView();
  };

  window.bcChooseScenarioOption = function (scenId, stepIdx, optIdx) {
    businessState.scenarioUserChoices[scenId + '_' + stepIdx] = optIdx;
    BusinessService.recordScenarioCompleted(scenId);
    renderActiveSubView();
  };

  function renderQuizCard(quiz, lang) {
    if (!quiz) return '';
    const userAnswer = businessState.quizUserAnswer;

    return `
      <div class="bc-quiz-box">
        <div class="bc-quiz-meta">
          <span class="bc-badge bc-badge-cat">Quiz #${quiz.id.split('_')[1]}</span>
          <span class="bc-badge bc-badge-tag">${escapeHtml(quiz.category)}</span>
        </div>

        <h3 class="bc-quiz-question">${escapeHtml(getLocText(quiz.question, lang))}</h3>

        ${quiz.contextSentence ? `
          <div class="bc-quiz-context-card">
            <div class="bc-quiz-ctx-zh">
              <span class="bc-mini-speaker" onclick="bcPlayAudio('${escapeQuotes(quiz.contextSentence.zh)}', event)" title="Nghe câu này" aria-label="Phát âm">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              </span>
              <span>${escapeHtml(quiz.contextSentence.zh)}</span>
            </div>
            <div class="bc-quiz-ctx-py">${escapeHtml(quiz.contextSentence.pinyin)}</div>
          </div>
        ` : ''}

        <!-- Options -->
        <div class="bc-quiz-options">
          ${quiz.options.map((opt, optIdx) => {
            const isChosen = userAnswer === optIdx;
            let statusCls = '';
            if (userAnswer !== null) {
              if (opt.isCorrect) statusCls = 'is-correct';
              else if (isChosen && !opt.isCorrect) statusCls = 'is-wrong';
            }
            return `
              <button 
                class="bc-quiz-opt-btn ${statusCls} ${isChosen ? 'chosen' : ''}" 
                onclick="bcAnswerQuiz('${quiz.id}', ${optIdx}, ${opt.isCorrect})"
                ${userAnswer !== null ? 'disabled' : ''}
              >
                <span class="bc-opt-marker">${String.fromCharCode(65 + optIdx)}</span>
                <span class="bc-opt-val">${escapeHtml(getLocText(opt.text.translations, lang) || (opt.text.zh || ''))}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Explanation after answer -->
        ${userAnswer !== null ? `
          <div class="bc-quiz-explanation">
            <div class="bc-exp-header">
              ${quiz.options[userAnswer].isCorrect ? '✅ ' + (lang === 'vi' ? 'Chính xác tuyệt vời!' : (lang === 'ja' ? '正解です！' : 'Correct!')) : '❌ ' + (lang === 'vi' ? 'Chưa chính xác!' : (lang === 'ja' ? '不正解です' : 'Incorrect'))}
            </div>
            <div class="bc-exp-body">
              ${escapeHtml(getLocText(quiz.explanation, lang))}
            </div>
            <div style="margin-top:14px; text-align:right;">
              <button class="btn btn-primary" onclick="bcNextQuiz()" style="border-radius:var(--radius-pill); padding:8px 20px; font-weight:700; font-size:13px; display:inline-flex; align-items:center; gap:6px;">
                <span>${lang === 'vi' ? 'Câu tiếp theo' : (lang === 'ja' ? '次の問題へ' : 'Next Quiz')}</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  window.bcSelectQuiz = function (id) {
    businessState.activeQuizId = id;
    businessState.quizUserAnswer = null;
    renderActiveSubView();
  };

  window.bcNextQuiz = function () {
    const quizzes = BusinessService.getQuizzes();
    const curIdx = quizzes.findIndex(q => q.id === businessState.activeQuizId);
    if (curIdx > -1 && curIdx + 1 < quizzes.length) {
      businessState.activeQuizId = quizzes[curIdx + 1].id;
      businessState.quizUserAnswer = null;
    } else {
      businessState.activeQuizId = quizzes[0].id;
      businessState.quizUserAnswer = null;
    }
    renderActiveSubView();
  };

  window.bcAnswerQuiz = function (quizId, optIdx, isCorrect) {
    businessState.quizUserAnswer = optIdx;
    BusinessService.recordQuizCompleted(quizId, isCorrect);
    renderActiveSubView();
  };

  // ========================================================
  // SUB-TAB 6: PINYIN TEST & MASTERY QUIZ ENGINE
  // ========================================================
  const PINYIN_TONE_FAMILIES = {
    'a': ['ā', 'á', 'ǎ', 'à'],
    'e': ['ē', 'é', 'ě', 'è'],
    'i': ['ī', 'í', 'ǐ', 'ì'],
    'o': ['ō', 'ó', 'ǒ', 'ò'],
    'u': ['ū', 'ú', 'ǔ', 'ù'],
    'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ']
  };

  function alterPinyinTone(pinyinStr, variationIndex) {
    const tones = ['ā','á','ǎ','à','ē','é','ě','è','ī','í','ǐ','ì','ō','ó','ǒ','ò','ū','ú','ǔ','ù','ǖ','ǘ','ǚ','ǜ'];
    let found = [];
    for (let i = 0; i < pinyinStr.length; i++) {
      if (tones.includes(pinyinStr[i])) {
        found.push({ index: i, char: pinyinStr[i] });
      }
    }
    if (!found.length) return pinyinStr;
    const target = found[variationIndex % found.length];
    let baseVowel = null;
    for (const [v, arr] of Object.entries(PINYIN_TONE_FAMILIES)) {
      if (arr.includes(target.char)) { baseVowel = v; break; }
    }
    if (!baseVowel) return pinyinStr;
    const family = PINYIN_TONE_FAMILIES[baseVowel];
    const curTone = family.indexOf(target.char);
    const newTone = (curTone + 1 + (variationIndex % 3)) % 4;
    return pinyinStr.slice(0, target.index) + family[newTone] + pinyinStr.slice(target.index + 1);
  }

  function generatePinyinQuestion(vocabItem, allVocab) {
    const correct = vocabItem.pinyin;
    const optionsSet = new Set([correct]);

    for (let i = 0; i < 8 && optionsSet.size < 4; i++) {
      const alt = alterPinyinTone(correct, i);
      if (alt && alt !== correct) optionsSet.add(alt);
    }

    if (optionsSet.size < 4) {
      const otherVocab = allVocab.filter(v => v.id !== vocabItem.id);
      for (let i = 0; i < otherVocab.length && optionsSet.size < 4; i++) {
        if (otherVocab[i].pinyin && !optionsSet.has(otherVocab[i].pinyin)) {
          optionsSet.add(otherVocab[i].pinyin);
        }
      }
    }

    const shuffled = Array.from(optionsSet);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return {
      vocab: vocabItem,
      options: shuffled,
      correctIndex: shuffled.indexOf(correct),
      chosenIndex: null,
      isAnswered: false
    };
  }

  window.bcStartPinyinQuizWithTerm = function (termId, evt) {
    if (evt) evt.stopPropagation();
    const allVocab = BusinessService.getVocabulary();
    const target = allVocab.find(v => v.id === termId);
    if (!target) return;

    businessState.pinyinQuiz.categoryFilter = target.category || 'all';
    initPinyinQuizList(termId);
    bcSwitchSubTab('pinyin-quiz');
  };

  window.bcStartPinyinQuiz = function (catId) {
    businessState.pinyinQuiz.categoryFilter = catId || 'all';
    initPinyinQuizList();
    renderActiveSubView();
  };

  function initPinyinQuizList(startWithId) {
    const allVocab = BusinessService.getVocabulary();
    let pool = businessState.pinyinQuiz.categoryFilter === 'all'
      ? [...allVocab]
      : allVocab.filter(v => v.category === businessState.pinyinQuiz.categoryFilter);

    if (!pool.length) pool = [...allVocab];

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    if (startWithId) {
      const startIdx = pool.findIndex(v => v.id === startWithId);
      if (startIdx > -1) {
        const item = pool.splice(startIdx, 1)[0];
        pool.unshift(item);
      }
    }

    businessState.pinyinQuiz.items = pool.slice(0, 10);
    businessState.pinyinQuiz.currentIndex = 0;
    businessState.pinyinQuiz.score = 0;
    businessState.pinyinQuiz.streak = 0;
    businessState.pinyinQuiz.currentQuestion = generatePinyinQuestion(businessState.pinyinQuiz.items[0], allVocab);
  }

  function renderPinyinQuizSubView(mount) {
    const lang = getLang();
    const qState = businessState.pinyinQuiz;

    if (!qState.items || !qState.items.length) {
      initPinyinQuizList();
    }

    const categories = BusinessService.getCategories();

    if (qState.currentIndex >= qState.items.length) {
      const total = qState.items.length;
      const score = qState.score;
      const percent = Math.round((score / total) * 100);
      let title = lang === 'vi' ? 'Hoàn thành bài kiểm tra Pinyin!' : (lang === 'ja' ? 'テスト完了！' : 'Pinyin Quiz Completed!');
      let badge = '🎉';
      if (percent === 100) badge = '🏆';
      else if (percent >= 80) badge = '🌟';
      else if (percent >= 50) badge = '👍';
      else badge = '💪';

      mount.innerHTML = `
        <div class="bc-pinyin-quiz-layout">
          <div class="bc-pinyin-quiz-card bc-pinyin-summary-box">
            <div class="bc-pinyin-summary-badge">${badge}</div>
            <h2 class="bc-pinyin-summary-title">${title}</h2>
            <p class="bc-pinyin-summary-desc">
              ${lang === 'vi' ? `Bạn trả lời đúng <b>${score}/${total}</b> câu (${percent}%). Chuỗi đúng tốt nhất: 🔥 <b>${qState.bestStreak || qState.streak}</b> câu.` : (lang === 'ja' ? `スコア: <b>${score}/${total}</b> (${percent}%)。最高連続正解: 🔥 <b>${qState.bestStreak || qState.streak}</b> 問。` : `You scored <b>${score}/${total}</b> (${percent}%). Best streak: 🔥 <b>${qState.bestStreak || qState.streak}</b>.`)}
            </p>
            <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
              <button class="bc-pinyin-action-btn" onclick="bcRestartPinyinQuiz()">
                🔄 ${lang === 'vi' ? 'Làm bài kiểm tra mới' : (lang === 'ja' ? 'もう一度挑戦' : 'Try Another Quiz')}
              </button>
              <button class="btn btn-secondary" onclick="bcSwitchSubTab('vocab')" style="border-radius:var(--radius-pill); padding:14px 24px; font-weight:700;">
                📖 ${lang === 'vi' ? 'Xem lại bảng từ vựng' : (lang === 'ja' ? '用語集に戻る' : 'Back to Vocab')}
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const curQ = qState.currentQuestion;
    const v = curQ.vocab;
    const catObj = BusinessService.getCategoryById(v.category);
    const transObj = (v.translations && v.translations[lang]) || (v.translations && v.translations['vi']) || {};
    const meaning = transObj.meaning || '';
    const progressPercent = Math.round(((qState.currentIndex) / qState.items.length) * 100);

    const optionsHtml = curQ.options.map((opt, idx) => {
      let statusCls = '';
      if (curQ.isAnswered) {
        if (idx === curQ.correctIndex) statusCls = 'correct';
        else if (idx === curQ.chosenIndex) statusCls = 'wrong';
      }
      return `
        <button 
          type="button" 
          class="bc-pinyin-option-btn ${statusCls}" 
          ${curQ.isAnswered ? 'disabled' : ''} 
          onclick="bcAnswerPinyinQuiz(${idx})">
          <span>${escapeHtml(opt)}</span>
          ${curQ.isAnswered && idx === curQ.correctIndex ? '<span>✅</span>' : ''}
          ${curQ.isAnswered && idx === curQ.chosenIndex && idx !== curQ.correctIndex ? '<span>❌</span>' : ''}
        </button>
      `;
    }).join('');

    mount.innerHTML = `
      <div class="bc-pinyin-quiz-layout">
        <div class="bc-pinyin-quiz-card">
          <!-- Top Bar -->
          <div class="bc-pinyin-quiz-top-bar">
            <div class="bc-pinyin-quiz-meta">
              <span class="bc-pinyin-score-badge">📝 ${lang === 'vi' ? 'Câu' : 'Question'} <b>${qState.currentIndex + 1}</b> / ${qState.items.length}</span>
              <span class="bc-pinyin-score-badge">✅ ${lang === 'vi' ? 'Điểm:' : 'Score:'} <b>${qState.score}</b></span>
              ${qState.streak > 1 ? `<span class="bc-pinyin-streak-badge">🔥 ${qState.streak} ${lang === 'vi' ? 'chuỗi' : 'streak'}</span>` : ''}
            </div>

            <!-- Category selector -->
            <div style="display:flex; align-items:center; gap:6px;">
              <select class="bc-select bc-select-sm" onchange="bcChangePinyinQuizCategory(this.value)" style="max-width:180px;">
                <option value="all" ${qState.categoryFilter === 'all' ? 'selected' : ''}>${lang === 'vi' ? 'Tất cả danh mục' : 'All Categories'}</option>
                ${categories.map(c => `<option value="${c.id}" ${qState.categoryFilter === c.id ? 'selected' : ''}>${c.icon} ${escapeHtml(c.zhName)}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="bc-pinyin-quiz-progress">
            <div class="bc-pinyin-quiz-progress-fill" style="width:${progressPercent}%;"></div>
          </div>

          <!-- Hanzi and speaker -->
          <div class="bc-pinyin-quiz-hanzi-wrap">
            <div class="bc-pinyin-quiz-hanzi">${escapeHtml(v.term)}</div>
            <button class="bc-pinyin-quiz-speaker-btn" onclick="bcPlayAudio('${escapeHtml(v.term)}', event)" title="Nghe phát âm" aria-label="Phát âm">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            </button>
          </div>

          <div style="margin-bottom:14px;">
            ${catObj ? `<span class="bc-badge bc-badge-cat">${catObj.icon} ${escapeHtml(catObj.zhName)} (${escapeHtml(getLocText(catObj.name, lang))})</span>` : ''}
            <span class="bc-badge bc-badge-level bc-level-${v.level}">${escapeHtml(v.level)}</span>
          </div>

          <p class="bc-pinyin-quiz-prompt">
            ${lang === 'vi' ? 'Chọn phiên âm Pinyin chuẩn xác kèm thanh điệu của từ trên:' : (lang === 'ja' ? '正しいピンイン（声調付き）を選択してください：' : 'Select the correct Pinyin with proper tones for this word:')}
          </p>

          <!-- 4 Options -->
          <div class="bc-pinyin-options-grid">
            ${optionsHtml}
          </div>

          <!-- Feedback Box if answered -->
          ${curQ.isAnswered ? `
            <div class="bc-pinyin-feedback-box">
              <div class="bc-pinyin-fb-header ${curQ.chosenIndex === curQ.correctIndex ? 'success' : 'failure'}">
                <span>${curQ.chosenIndex === curQ.correctIndex ? '✅' : '❌'}</span>
                <span>${curQ.chosenIndex === curQ.correctIndex 
                  ? (lang === 'vi' ? 'Chính xác tuyệt vời!' : (lang === 'ja' ? '正解です！' : 'Excellent, correct!')) 
                  : (lang === 'vi' ? `Chưa đúng! Đáp án chuẩn là: ${escapeHtml(v.pinyin)}` : (lang === 'ja' ? `不正解。正しいピンイン: ${escapeHtml(v.pinyin)}` : `Incorrect! Correct answer: ${escapeHtml(v.pinyin)}`))}</span>
              </div>
              <div class="bc-pinyin-fb-meaning">
                <b>${escapeHtml(v.term)}</b> [${escapeHtml(v.pinyin)}]: ${escapeHtml(meaning)}
              </div>
              ${(v.examples && v.examples[0]) ? `
                <div class="bc-pinyin-fb-example">
                  <div><b>Ví dụ:</b> ${escapeHtml(v.examples[0].zh)} (${escapeHtml(v.examples[0].pinyin)})</div>
                  <div style="margin-top:2px; font-style:italic;">“${escapeHtml((v.examples[0].translations && v.examples[0].translations[lang]) || v.examples[0].translations?.vi || '')}”</div>
                </div>
              ` : ''}
            </div>

            <div>
              <button class="bc-pinyin-action-btn" onclick="bcNextPinyinQuestion()">
                ${qState.currentIndex + 1 < qState.items.length 
                  ? (lang === 'vi' ? 'Câu tiếp theo →' : (lang === 'ja' ? '次の問題へ →' : 'Next Question →'))
                  : (lang === 'vi' ? 'Xem kết quả tổng kết →' : (lang === 'ja' ? '結果を見る →' : 'View Results →'))}
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  window.bcAnswerPinyinQuiz = function (optionIdx) {
    const qState = businessState.pinyinQuiz;
    const curQ = qState.currentQuestion;
    if (!curQ || curQ.isAnswered) return;

    curQ.isAnswered = true;
    curQ.chosenIndex = optionIdx;

    if (optionIdx === curQ.correctIndex) {
      qState.score++;
      qState.streak++;
      if (qState.streak > (qState.bestStreak || 0)) {
        qState.bestStreak = qState.streak;
      }
      bcPlayAudio(curQ.vocab.term);
    } else {
      qState.streak = 0;
    }

    renderActiveSubView();
  };

  window.bcNextPinyinQuestion = function () {
    const qState = businessState.pinyinQuiz;
    qState.currentIndex++;
    if (qState.currentIndex < qState.items.length) {
      const allVocab = BusinessService.getVocabulary();
      qState.currentQuestion = generatePinyinQuestion(qState.items[qState.currentIndex], allVocab);
    }
    renderActiveSubView();
  };

  window.bcRestartPinyinQuiz = function () {
    initPinyinQuizList();
    renderActiveSubView();
  };

  window.bcChangePinyinQuizCategory = function (catId) {
    businessState.pinyinQuiz.categoryFilter = catId;
    initPinyinQuizList();
    renderActiveSubView();
  };

})();

