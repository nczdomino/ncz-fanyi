/**
 * js/features/learn.js
 * 
 * Halou Smart Study Hub (Học tập & Luyện phản xạ):
 * - Sub-tab 1: 🎴 Thẻ Flashcard SRS 3D (Lật thẻ thông minh, nghe phát âm, đánh giá nhớ)
 * - Sub-tab 2: ⚡ Trắc nghiệm tốc độ (Đoán nghĩa, Đoán pinyin, tính điểm & chuỗi)
 * - Sub-tab 3: 🎧 Luyện nghe phản xạ (Nghe âm thanh TTS và chọn Hán tự tương ứng)
 * - Sub-tab 4: 🈴 214 Bộ thủ Khang Hy (Tra cứu theo số nét, xem mẹo nhớ & ví dụ)
 * - Sub-tab 5: 📚 Thư viện từ vựng (Tra cứu nhanh HSK 1-6, tìm kiếm, đánh dấu sao)
 * 
 * Dependencies:
 * - js/core/state.js
 * - js/data/learn-data.js
 * - js/features/learn-service.js
 * - js/features/tts.js
 */

(function () {
  'use strict';

  // Internal module UI state
  const learnState = {
    activeSubTab: 'flashcards', // 'flashcards' | 'quiz' | 'listen' | 'radicals' | 'library'
    // Flashcard state
    flashcards: {
      level: 'all',
      category: 'all',
      onlyFavorites: false,
      currentIndex: 0,
      isFlipped: false,
      items: []
    },
    // Speed Quiz state
    quiz: {
      type: 'meaning', // 'meaning' | 'pinyin'
      level: 'all',
      category: 'all',
      currentQuestion: null,
      questionNum: 1,
      totalQuestions: 10,
      score: 0,
      streak: 0,
      bestStreak: 0,
      userAnswerIndex: null,
      isAnswered: false,
      isRoundFinished: false
    },
    // Listening Quiz state
    listen: {
      level: 'all',
      category: 'all',
      currentQuestion: null,
      speed: 1.0, // 1.0 or 0.75
      playCount: 0,
      userAnswerIndex: null,
      isAnswered: false,
      score: 0,
      streak: 0
    },
    // Radicals state
    radicals: {
      strokeFilter: 'all',
      searchQuery: '',
      activeRadicalId: null
    },
    // Library state
    library: {
      searchQuery: '',
      level: 'all',
      category: 'all',
      onlyFavorites: false,
      page: 1,
      pageSize: 30
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

  function escapeQuotes(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  function t(key) {
    if (typeof window !== 'undefined' && typeof window.t === 'function') {
      const res = window.t(key);
      if (res && res !== key) return res;
    }
    const loc = getLang();
    if (typeof I18N_DATA !== 'undefined' && I18N_DATA[loc] && I18N_DATA[loc][key]) {
      return I18N_DATA[loc][key];
    }
    return key;
  }

  function playAudio(text, speed = 1.0) {
    if (!text) return;
    if (typeof speakText === 'function') {
      speakText(text, null, speed);
    }
  }

  // --- Main View Renderer ---
  function renderLearnView() {
    const container = document.getElementById('view-learn');
    if (!container) return;

    const loc = getLang();
    const stats = (typeof LearnService !== 'undefined') ? LearnService.getSrsStats() : { totalVocab: 1492, reviewedCount: 0, streak: 0, favoritesCount: 0 };

    container.innerHTML = `
      <div class="learn-container">
        <!-- 1. Header Hero -->
        <header class="learn-header-card">
          <div class="learn-header-top">
            <div class="learn-badge-pill">✨ ${loc === 'ja' ? '哈喽学堂 · スマート学習' : (loc === 'en' ? 'Halou Study Hub' : 'Học Tập & Luyện Phản Xạ')}</div>
            <div class="learn-header-stats">
              <span class="learn-stat-chip" title="${loc === 'ja' ? '復習済み単語数' : (loc === 'en' ? 'Learned Words' : 'Từ đã học')}">
                🎴 <b>${stats.reviewedCount}</b>/${stats.totalVocab}
              </span>
              <span class="learn-stat-chip" title="${loc === 'ja' ? '連続学習日数' : (loc === 'en' ? 'Study Streak' : 'Chuỗi ngày học')}">
                🔥 <b>${stats.streak}</b> ${loc === 'ja' ? '日' : (loc === 'en' ? 'days' : 'ngày')}
              </span>
              <span class="learn-stat-chip" title="${loc === 'ja' ? 'お気に入り単語' : (loc === 'en' ? 'Starred Favorites' : 'Từ yêu thích')}">
                ⭐ <b>${stats.favoritesCount}</b>
              </span>
              <button type="button" class="learn-reset-btn" onclick="learnResetProgress()" title="${loc === 'ja' ? '進捗を初期化' : (loc === 'en' ? 'Reset Progress' : 'Đặt lại tiến độ')}">
                🔄 <span>${loc === 'ja' ? 'リセット' : (loc === 'en' ? 'Reset' : 'Đặt lại')}</span>
              </button>
            </div>
          </div>
          <h1 class="learn-main-title">
            ${loc === 'ja' ? '単語・フラッシュカード・聴解トレーニング' : (loc === 'en' ? 'Master Chinese Vocabulary & Speed Quiz' : 'Chinh Phục Từ Vựng & Phản Xạ Tiếng Trung')}
          </h1>
          <p class="learn-main-desc">
            ${loc === 'ja' 
              ? 'HSK 1〜6級コア単語、214部首マスター、3Dフラッシュカード（SRS）、4択スピードクイズ、リスニング聴解。' 
              : (loc === 'en' 
                ? 'HSK 1-6 core vocabulary, 214 Kangxi radicals, 3D SRS flashcards, speed quiz, and listening mastery.' 
                : 'Trọn bộ từ vựng HSK 1-6 & đời sống, 214 bộ thủ Khang Hy, thẻ lật 3D ghi nhớ ngắt quãng, trắc nghiệm tốc độ và luyện nghe phản xạ.')}
          </p>

          <!-- 2. Navigation Capsule Tabs -->
          <nav class="learn-subnav-bar" role="tablist">
            <button type="button" class="learn-subnav-btn ${learnState.activeSubTab === 'flashcards' ? 'active' : ''}" onclick="learnSwitchSubTab('flashcards')">
              <span>🎴</span> ${loc === 'ja' ? 'フラッシュカード' : (loc === 'en' ? 'Flashcards' : 'Thẻ ghi nhớ')}
            </button>
            <button type="button" class="learn-subnav-btn ${learnState.activeSubTab === 'doc-test' ? 'active' : ''}" onclick="learnSwitchSubTab('doc-test')">
              <span>🤖</span> ${loc === 'ja' ? 'AI文章テスト' : (loc === 'en' ? 'AI Doc Drill' : 'AI Luyện Tài Liệu')}
            </button>
            <button type="button" class="learn-subnav-btn ${learnState.activeSubTab === 'quiz' ? 'active' : ''}" onclick="learnSwitchSubTab('quiz')">
              <span>⚡</span> ${loc === 'ja' ? 'スピードクイズ' : (loc === 'en' ? 'Speed Quiz' : 'Trắc nghiệm')}
            </button>
            <button type="button" class="learn-subnav-btn ${learnState.activeSubTab === 'listen' ? 'active' : ''}" onclick="learnSwitchSubTab('listen')">
              <span>🎧</span> ${loc === 'ja' ? 'リスニング' : (loc === 'en' ? 'Listening' : 'Luyện nghe')}
            </button>
            <button type="button" class="learn-subnav-btn ${learnState.activeSubTab === 'radicals' ? 'active' : ''}" onclick="learnSwitchSubTab('radicals')">
              <span>🈴</span> ${loc === 'ja' ? '214部首' : (loc === 'en' ? '214 Radicals' : '214 Bộ thủ')}
            </button>
            <button type="button" class="learn-subnav-btn ${learnState.activeSubTab === 'library' ? 'active' : ''}" onclick="learnSwitchSubTab('library')">
              <span>📚</span> ${loc === 'ja' ? '単語ライブラリ' : (loc === 'en' ? 'Word Library' : 'Thư viện từ')}
            </button>
          </nav>
        </header>

        <!-- 3. Dynamic Sub-Tab View Container -->
        <main id="learn-subtab-container" class="learn-subtab-container">
          <!-- Injected dynamically below -->
        </main>
      </div>
    `;

    renderSubTabContent();
  }

  // --- Sub-Tab Switcher ---
  window.learnSwitchSubTab = function (tabName) {
    learnState.activeSubTab = tabName;
    const container = document.getElementById('view-learn');
    if (!container) return;

    // Update active state on tab buttons
    container.querySelectorAll('.learn-subnav-btn').forEach(btn => {
      if (btn.getAttribute('onclick')?.includes(tabName)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderSubTabContent();
  };

  function renderSubTabContent() {
    const subContainer = document.getElementById('learn-subtab-container');
    if (!subContainer) return;

    switch (learnState.activeSubTab) {
      case 'flashcards':
        renderFlashcardsTab(subContainer);
        break;
      case 'doc-test':
        subContainer.innerHTML = '<div id="aidoc-mount-point"></div>';
        if (typeof renderAIDocTestView === 'function') {
          renderAIDocTestView(document.getElementById('aidoc-mount-point'));
        }
        break;
      case 'quiz':
        renderQuizTab(subContainer);
        break;
      case 'listen':
        renderListenTab(subContainer);
        break;
      case 'radicals':
        renderRadicalsTab(subContainer);
        break;
      case 'library':
        renderLibraryTab(subContainer);
        break;
      default:
        renderFlashcardsTab(subContainer);
    }
  }

  // ==========================================
  // TAB 1: 🎴 Thẻ Flashcard SRS 3D
  // ==========================================
  function renderFlashcardsTab(container) {
    const loc = getLang();
    const categories = LearnService.getCategories();

    // Fetch filtered items
    if (!learnState.flashcards.items || learnState.flashcards.items.length === 0) {
      learnState.flashcards.items = LearnService.getVocabList({
        level: learnState.flashcards.level,
        category: learnState.flashcards.category,
        favoritesOnly: learnState.flashcards.onlyFavorites
      });
      learnState.flashcards.currentIndex = 0;
      learnState.flashcards.isFlipped = false;
    }

    const items = learnState.flashcards.items;
    const total = items.length;
    const currentIdx = Math.min(learnState.flashcards.currentIndex, Math.max(0, total - 1));
    const currentItem = items[currentIdx] || null;
    const isFlipped = learnState.flashcards.isFlipped;
    const isStarred = currentItem ? LearnService.isFavorite(currentItem.id) : false;

    // Progress percentage
    const progressPercent = total > 0 ? Math.round(((currentIdx + 1) / total) * 100) : 0;

    const categoryOpts = categories.map(c => `
      <option value="${c.id}" ${learnState.flashcards.category === c.id ? 'selected' : ''}>
        ${c.icon} ${escapeHtml(c.name[loc] || c.name.vi)}
      </option>
    `).join('');

    let cardContentHtml = '';
    if (!currentItem) {
      cardContentHtml = `
        <div class="learn-empty-card">
          <div class="learn-empty-icon">📭</div>
          <div class="learn-empty-text">${loc === 'ja' ? '条件に一致する単語が見つかりませんでした' : (loc === 'en' ? 'No words found matching this filter' : 'Không có từ vựng nào phù hợp với bộ lọc này')}</div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="learnResetCardFilter()">
            ${loc === 'ja' ? 'フィルターをリセット' : (loc === 'en' ? 'Reset Filters' : 'Đặt lại bộ lọc')}
          </button>
        </div>
      `;
    } else {
      const meaning = currentItem.meanings[loc] || currentItem.meanings.vi || currentItem.hanviet;
      const example = (currentItem.examples && currentItem.examples[0]) || null;

      cardContentHtml = `
        <!-- Progress Bar & Indicator -->
        <div class="flashcard-top-track">
          <div class="flashcard-step-label">
            ${loc === 'ja' ? 'カード' : (loc === 'en' ? 'Card' : 'Thẻ')} <b>${currentIdx + 1}</b> / ${total}
          </div>
          <div class="flashcard-progress-bar">
            <div class="flashcard-progress-fill" style="width:${progressPercent}%"></div>
          </div>
          <div class="flashcard-percent">${progressPercent}%</div>
        </div>

        <!-- 3D Card Scene -->
        <div class="flashcard-scene" onclick="learnFlipFlashcard()">
          <div class="flashcard-flipper ${isFlipped ? 'is-flipped' : ''}">
            <!-- Front Face -->
            <div class="flashcard-card flashcard-front">
              <div class="card-front-top">
                <span class="card-level-badge">${currentItem.level.toUpperCase()}</span>
                <button type="button" class="card-star-btn ${isStarred ? 'active' : ''}" onclick="event.stopPropagation(); learnToggleCardFavorite('${escapeQuotes(currentItem.id)}')" title="${loc === 'ja' ? 'お気に入りに追加' : (loc === 'en' ? 'Bookmark' : 'Lưu từ vựng')}">
                  ${isStarred ? '★' : '☆'}
                </button>
              </div>

              <div class="card-front-center">
                <div class="card-hanzi" lang="zh-CN">${escapeHtml(currentItem.hanzi)}</div>
                <button type="button" class="card-audio-pill" onclick="event.stopPropagation(); playAudio('${escapeQuotes(currentItem.hanzi)}')" title="${loc === 'ja' ? '発音を聞く' : (loc === 'en' ? 'Listen pronunciation' : 'Nghe phát âm')}">
                  🔊 <span>${escapeHtml(currentItem.pinyin)}</span>
                </button>
              </div>

              <div class="card-front-footer">
                <span class="card-flip-hint">👆 ${loc === 'ja' ? 'タップして裏面を確認' : (loc === 'en' ? 'Tap card to flip' : 'Chạm vào thẻ để xem nghĩa')}</span>
              </div>
            </div>

            <!-- Back Face -->
            <div class="flashcard-card flashcard-back">
              <div class="card-back-header">
                <div class="card-back-hanzi-small" lang="zh-CN">${escapeHtml(currentItem.hanzi)}</div>
                <div class="card-back-pinyin-bold">${escapeHtml(currentItem.pinyin)}</div>
                ${currentItem.hanviet ? `<div class="card-back-hanviet">[${escapeHtml(currentItem.hanviet)}]</div>` : ''}
              </div>

              <div class="card-back-meaning">
                ${escapeHtml(meaning)}
              </div>

              ${example ? `
                <div class="card-back-example-box" onclick="event.stopPropagation(); playAudio('${escapeQuotes(example.zh)}')">
                  <div class="example-box-top">
                    <span class="example-speaker">🔊</span>
                    <span class="example-zh" lang="zh-CN">${escapeHtml(example.zh)}</span>
                  </div>
                  <div class="example-pinyin">${escapeHtml(example.pinyin)}</div>
                  <div class="example-trans">"${escapeHtml(example[loc] || example.vi || example.en)}"</div>
                </div>
              ` : ''}

              ${currentItem.tip ? `
                <div class="card-back-tip">
                  💡 ${escapeHtml(currentItem.tip[loc] || currentItem.tip.vi || currentItem.tip.en)}
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Rating Response Action Buttons -->
        <div class="flashcard-actions-bar">
          <button type="button" class="btn-srs-rate btn-rate-again" onclick="learnRateCard('again')" title="${loc === 'ja' ? 'もう一度（1日後）' : (loc === 'en' ? 'Again (1 day)' : 'Chưa nhớ (Ôn lại ngay)')}">
            <span class="rate-icon">🔴</span>
            <span class="rate-label">${loc === 'ja' ? '未習得' : (loc === 'en' ? 'Again' : 'Chưa nhớ')}</span>
            <span class="rate-sub">1 ${loc === 'ja' ? '日' : (loc === 'en' ? 'day' : 'ngày')}</span>
          </button>
          <button type="button" class="btn-srs-rate btn-rate-good" onclick="learnRateCard('good')" title="${loc === 'ja' ? '覚えている（3日後）' : (loc === 'en' ? 'Good (3 days)' : 'Đang nhớ (3 ngày)')}">
            <span class="rate-icon">🟡</span>
            <span class="rate-label">${loc === 'ja' ? '覚えた' : (loc === 'en' ? 'Good' : 'Đang nhớ')}</span>
            <span class="rate-sub">3 ${loc === 'ja' ? '日' : (loc === 'en' ? 'days' : 'ngày')}</span>
          </button>
          <button type="button" class="btn-srs-rate btn-rate-easy" onclick="learnRateCard('easy')" title="${loc === 'ja' ? '簡単・完璧（マスター）' : (loc === 'en' ? 'Easy (Mastered)' : 'Đã thuộc (Thành thạo)')}">
            <span class="rate-icon">🟢</span>
            <span class="rate-label">${loc === 'ja' ? '簡単' : (loc === 'en' ? 'Easy' : 'Đã thuộc')}</span>
            <span class="rate-sub">★ ${loc === 'ja' ? 'マスター' : (loc === 'en' ? 'Master' : 'Thuộc lòng')}</span>
          </button>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="learn-tab-pane flashcards-pane">
        <!-- Control Filter Bar -->
        <div class="learn-controls-row">
          <div class="learn-control-group">
            <label class="control-label">${loc === 'ja' ? 'レベル' : (loc === 'en' ? 'HSK Level' : 'Cấp độ HSK')}:</label>
            <select class="learn-select" onchange="learnSetCardLevel(this.value)">
              <option value="all" ${learnState.flashcards.level === 'all' ? 'selected' : ''}>🌟 ${loc === 'ja' ? 'すべてのレベル' : (loc === 'en' ? 'All Levels' : 'Tất cả cấp độ')}</option>
              <option value="hsk1" ${learnState.flashcards.level === 'hsk1' ? 'selected' : ''}>🟢 HSK 1 (Cơ bản)</option>
              <option value="hsk2" ${learnState.flashcards.level === 'hsk2' ? 'selected' : ''}>🔵 HSK 2 (Sơ cấp)</option>
              <option value="hsk3" ${learnState.flashcards.level === 'hsk3' ? 'selected' : ''}>🟡 HSK 3 (Trung cấp)</option>
              <option value="hsk4" ${learnState.flashcards.level === 'hsk4' ? 'selected' : ''}>🟠 HSK 4 (Trung cao cấp)</option>
              <option value="hsk5" ${learnState.flashcards.level === 'hsk5' ? 'selected' : ''}>🔴 HSK 5 (Nâng cao)</option>
              <option value="hsk6" ${learnState.flashcards.level === 'hsk6' ? 'selected' : ''}>🟣 HSK 6 (Cao cấp)</option>
            </select>
          </div>

          <div class="learn-control-group">
            <label class="control-label">${loc === 'ja' ? 'テーマ' : (loc === 'en' ? 'Category' : 'Chủ đề')}:</label>
            <select class="learn-select" onchange="learnSetCardCategory(this.value)">
              <option value="all" ${learnState.flashcards.category === 'all' ? 'selected' : ''}>🏷️ ${loc === 'ja' ? '全テーマ' : (loc === 'en' ? 'All Topics' : 'Tất cả chủ đề')}</option>
              ${categoryOpts}
            </select>
          </div>

          <button type="button" class="btn-fav-filter ${learnState.flashcards.onlyFavorites ? 'active' : ''}" onclick="learnToggleOnlyFavorites()">
            <span>⭐</span> ${loc === 'ja' ? 'お気に入りのみ' : (loc === 'en' ? 'Favorites only' : 'Chỉ từ đã lưu')}
          </button>
        </div>

        <div class="flashcards-wrapper">
          ${cardContentHtml}
        </div>
      </div>
    `;
  }

  // Flashcard Actions
  window.learnFlipFlashcard = function () {
    learnState.flashcards.isFlipped = !learnState.flashcards.isFlipped;
    const flipper = document.querySelector('.flashcard-flipper');
    if (flipper) {
      if (learnState.flashcards.isFlipped) {
        flipper.classList.add('is-flipped');
      } else {
        flipper.classList.remove('is-flipped');
      }
    }
  };

  window.learnRateCard = function (rating) {
    const items = learnState.flashcards.items;
    const curIdx = learnState.flashcards.currentIndex;
    const curItem = items[curIdx];
    if (curItem) {
      LearnService.recordSrsReview(curItem.id, rating);
    }

    // Move to next card
    if (curIdx < items.length - 1) {
      learnState.flashcards.currentIndex = curIdx + 1;
    } else {
      learnState.flashcards.currentIndex = 0; // loop or finish
    }
    learnState.flashcards.isFlipped = false;
    renderSubTabContent();
  };

  window.learnSetCardLevel = function (level) {
    learnState.flashcards.level = level;
    learnState.flashcards.items = [];
    renderSubTabContent();
  };

  window.learnSetCardCategory = function (cat) {
    learnState.flashcards.category = cat;
    learnState.flashcards.items = [];
    renderSubTabContent();
  };

  window.learnToggleOnlyFavorites = function () {
    learnState.flashcards.onlyFavorites = !learnState.flashcards.onlyFavorites;
    learnState.flashcards.items = [];
    renderSubTabContent();
  };

  window.learnResetCardFilter = function () {
    learnState.flashcards.level = 'all';
    learnState.flashcards.category = 'all';
    learnState.flashcards.onlyFavorites = false;
    learnState.flashcards.items = [];
    renderSubTabContent();
  };

  window.learnToggleCardFavorite = function (id) {
    LearnService.toggleFavorite(id);
    renderSubTabContent();
  };

  // ==========================================
  // TAB 2: ⚡ Trắc Nghiệm Tốc Độ (Speed Quiz)
  // ==========================================
  function renderQuizTab(container) {
    const loc = getLang();
    const qState = learnState.quiz;

    // Generate question if needed
    if (!qState.currentQuestion && !qState.isRoundFinished) {
      qState.currentQuestion = LearnService.generateQuizQuestion({
        type: qState.type,
        level: qState.level,
        category: qState.category,
        locale: loc
      });
      qState.userAnswerIndex = null;
      qState.isAnswered = false;
    }

    // Round Finished Summary View
    if (qState.isRoundFinished) {
      const accuracy = Math.round((qState.score / qState.totalQuestions) * 100);
      container.innerHTML = `
        <div class="learn-tab-pane quiz-pane">
          <div class="quiz-summary-card">
            <div class="quiz-summary-trophy">🏆</div>
            <h2 class="quiz-summary-title">${loc === 'ja' ? 'ラウンド完了！' : (loc === 'en' ? 'Round Completed!' : 'Hoàn Thành Lượt Thi!')}</h2>
            <div class="quiz-summary-score-row">
              <div class="summary-score-box">
                <div class="score-num">${qState.score}/${qState.totalQuestions}</div>
                <div class="score-label">${loc === 'ja' ? '正解数' : (loc === 'en' ? 'Correct' : 'Câu đúng')}</div>
              </div>
              <div class="summary-score-box">
                <div class="score-num">${accuracy}%</div>
                <div class="score-label">${loc === 'ja' ? '正答率' : (loc === 'en' ? 'Accuracy' : 'Độ chính xác')}</div>
              </div>
              <div class="summary-score-box">
                <div class="score-num">🔥 ${qState.bestStreak}</div>
                <div class="score-label">${loc === 'ja' ? '最大コンボ' : (loc === 'en' ? 'Best Streak' : 'Chuỗi kỷ lục')}</div>
              </div>
            </div>
            <button type="button" class="btn btn-primary quiz-restart-btn" onclick="learnRestartQuiz()">
              🚀 <span>${loc === 'ja' ? 'もう一度プレイ' : (loc === 'en' ? 'Play Next Round' : 'Tiếp tục lượt mới')}</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    const currentQ = qState.currentQuestion;
    if (!currentQ) return;

    const choicesHtml = currentQ.choices.map((choice, idx) => {
      let btnClass = 'quiz-choice-btn';
      let icon = '';

      if (qState.isAnswered) {
        if (choice.isCorrect) {
          btnClass += ' choice-correct';
          icon = '✓ ';
        } else if (qState.userAnswerIndex === idx) {
          btnClass += ' choice-wrong';
          icon = '✕ ';
        }
      }

      return `
        <button type="button" class="${btnClass}" ${qState.isAnswered ? 'disabled' : ''} onclick="learnAnswerQuiz(${idx})">
          <span class="choice-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="choice-text">${icon}${escapeHtml(choice.text)}</span>
        </button>
      `;
    }).join('');

    container.innerHTML = `
      <div class="learn-tab-pane quiz-pane">
        <!-- Mode Switcher -->
        <div class="quiz-mode-selector">
          <button type="button" class="quiz-mode-pill ${qState.type === 'meaning' ? 'active' : ''}" onclick="learnSetQuizType('meaning')">
            📖 ${loc === 'ja' ? '意味を当てる' : (loc === 'en' ? 'Guess Meaning' : 'Đoán nghĩa của từ')}
          </button>
          <button type="button" class="quiz-mode-pill ${qState.type === 'pinyin' ? 'active' : ''}" onclick="learnSetQuizType('pinyin')">
            🎵 ${loc === 'ja' ? 'ピンインを当てる' : (loc === 'en' ? 'Guess Pinyin' : 'Đoán phát âm Pinyin')}
          </button>
        </div>

        <!-- Quiz Status Bar -->
        <div class="quiz-status-bar">
          <div class="quiz-question-counter">
            ${loc === 'ja' ? '問題' : (loc === 'en' ? 'Question' : 'Câu')} <b>${qState.questionNum}</b>/${qState.totalQuestions}
          </div>
          <div class="quiz-streak-badge">
            🔥 ${loc === 'ja' ? 'コンボ' : (loc === 'en' ? 'Streak' : 'Chuỗi')}: <b>${qState.streak}</b>
          </div>
          <div class="quiz-score-badge">
            ✨ ${loc === 'ja' ? 'スコア' : (loc === 'en' ? 'Score' : 'Điểm')}: <b>${qState.score}</b>
          </div>
        </div>

        <!-- Question Prompt Box -->
        <div class="quiz-question-box">
          <div class="quiz-prompt-hanzi" lang="zh-CN">${escapeHtml(currentQ.promptHanzi)}</div>
          ${qState.type === 'meaning' ? `
            <div class="quiz-prompt-sub">
              <span class="prompt-pinyin">${escapeHtml(currentQ.promptPinyin)}</span>
              ${currentQ.promptHanviet ? `<span class="prompt-hanviet">[${escapeHtml(currentQ.promptHanviet)}]</span>` : ''}
            </div>
          ` : `
            <div class="quiz-prompt-sub">
              <span>${loc === 'ja' ? '正しいピンインを選択してください' : (loc === 'en' ? 'Choose the correct Pinyin' : 'Chọn phiên âm Pinyin đúng')}</span>
            </div>
          `}
          <button type="button" class="quiz-audio-speaker" onclick="playAudio('${escapeQuotes(currentQ.promptHanzi)}')" title="${loc === 'ja' ? '発音を聞く' : (loc === 'en' ? 'Listen' : 'Nghe')}">
            🔊
          </button>
        </div>

        <!-- 4 Choices Grid -->
        <div class="quiz-choices-grid">
          ${choicesHtml}
        </div>

        ${qState.isAnswered ? `
          <div class="quiz-next-row">
            <button type="button" class="btn btn-primary quiz-next-btn" onclick="learnNextQuizQuestion()">
              <span>${loc === 'ja' ? '次の問題へ' : (loc === 'en' ? 'Next Question' : 'Câu tiếp theo')}</span> →
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  window.learnSetQuizType = function (type) {
    learnState.quiz.type = type;
    learnRestartQuiz();
  };

  window.learnAnswerQuiz = function (choiceIndex) {
    const qState = learnState.quiz;
    if (qState.isAnswered) return;

    qState.isAnswered = true;
    qState.userAnswerIndex = choiceIndex;
    const choice = qState.currentQuestion.choices[choiceIndex];

    if (choice && choice.isCorrect) {
      qState.score += 1;
      qState.streak += 1;
      if (qState.streak > qState.bestStreak) {
        qState.bestStreak = qState.streak;
      }
      playAudio(qState.currentQuestion.promptHanzi);
    } else {
      qState.streak = 0;
    }

    renderSubTabContent();
  };

  window.learnNextQuizQuestion = function () {
    const qState = learnState.quiz;
    if (qState.questionNum >= qState.totalQuestions) {
      qState.isRoundFinished = true;
    } else {
      qState.questionNum += 1;
      qState.currentQuestion = null;
    }
    renderSubTabContent();
  };

  window.learnRestartQuiz = function () {
    const qState = learnState.quiz;
    qState.questionNum = 1;
    qState.score = 0;
    qState.streak = 0;
    qState.currentQuestion = null;
    qState.isAnswered = false;
    qState.isRoundFinished = false;
    renderSubTabContent();
  };

  // ==========================================
  // TAB 3: 🎧 Luyện Nghe Phản Xạ (Listening)
  // ==========================================
  function renderListenTab(container) {
    const loc = getLang();
    const lState = learnState.listen;

    if (!lState.currentQuestion) {
      lState.currentQuestion = LearnService.generateListeningQuestion({
        level: lState.level,
        category: lState.category,
        locale: loc
      });
      lState.userAnswerIndex = null;
      lState.isAnswered = false;
      lState.playCount = 0;
    }

    const currentQ = lState.currentQuestion;
    if (!currentQ) return;

    const choicesHtml = currentQ.choices.map((choice, idx) => {
      let btnClass = 'listen-choice-btn';
      let badge = '';

      if (lState.isAnswered) {
        if (choice.isCorrect) {
          btnClass += ' choice-correct';
          badge = '✓ ';
        } else if (lState.userAnswerIndex === idx) {
          btnClass += ' choice-wrong';
          badge = '✕ ';
        }
      }

      return `
        <button type="button" class="${btnClass}" ${lState.isAnswered ? 'disabled' : ''} onclick="learnAnswerListen(${idx})">
          <div class="listen-choice-top">
            <span class="listen-choice-hanzi" lang="zh-CN">${badge}${escapeHtml(choice.hanzi)}</span>
            <span class="listen-choice-pinyin">${escapeHtml(choice.pinyin)}</span>
          </div>
          <div class="listen-choice-meaning">${escapeHtml(choice.meaning)}</div>
        </button>
      `;
    }).join('');

    container.innerHTML = `
      <div class="learn-tab-pane listen-pane">
        <div class="listen-top-bar">
          <div class="listen-score-stat">
            ✨ ${loc === 'ja' ? 'スコア' : (loc === 'en' ? 'Score' : 'Điểm')}: <b>${lState.score}</b>
          </div>
          <div class="listen-speed-toggle">
            <button type="button" class="speed-btn ${lState.speed === 1.0 ? 'active' : ''}" onclick="learnSetListenSpeed(1.0)">1.0x</button>
            <button type="button" class="speed-btn ${lState.speed === 0.75 ? 'active' : ''}" onclick="learnSetListenSpeed(0.75)">🐢 0.75x</button>
          </div>
        </div>

        <!-- Big Audio Button -->
        <div class="listen-hero-box">
          <button type="button" class="listen-big-speaker-btn" onclick="learnPlayListenAudio()">
            <span class="speaker-icon">🔊</span>
            <span class="speaker-text">${loc === 'ja' ? 'タップして音声を再生' : (loc === 'en' ? 'Tap to listen' : 'Chạm để nghe âm thanh')}</span>
          </button>
          <div class="listen-play-count">
            ${loc === 'ja' ? `再生回数: ${lState.playCount}回` : (loc === 'en' ? `Played: ${lState.playCount} time(s)` : `Đã nghe: ${lState.playCount} lần`)}
          </div>
        </div>

        <div class="listen-instruction">
          ${loc === 'ja' ? '発音された正しい単語を選択してください：' : (loc === 'en' ? 'Select the correct word you just heard:' : 'Chọn từ vựng đúng với âm thanh bạn vừa nghe:')}
        </div>

        <!-- Choices Grid -->
        <div class="listen-choices-grid">
          ${choicesHtml}
        </div>

        ${lState.isAnswered ? `
          <div class="listen-next-row">
            <button type="button" class="btn btn-primary listen-next-btn" onclick="learnNextListenQuestion()">
              <span>${loc === 'ja' ? '次の音声へ' : (loc === 'en' ? 'Next Question' : 'Câu tiếp theo')}</span> →
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  window.learnPlayListenAudio = function () {
    const lState = learnState.listen;
    if (lState.currentQuestion) {
      lState.playCount += 1;
      playAudio(lState.currentQuestion.audioText, lState.speed);
      const countEl = document.querySelector('.listen-play-count');
      if (countEl) {
        const loc = getLang();
        countEl.textContent = loc === 'ja' ? `再生回数: ${lState.playCount}回` : (loc === 'en' ? `Played: ${lState.playCount} time(s)` : `Đã nghe: ${lState.playCount} lần`);
      }
    }
  };

  window.learnSetListenSpeed = function (speed) {
    learnState.listen.speed = speed;
    renderSubTabContent();
  };

  window.learnAnswerListen = function (choiceIndex) {
    const lState = learnState.listen;
    if (lState.isAnswered) return;

    lState.isAnswered = true;
    lState.userAnswerIndex = choiceIndex;
    const choice = lState.currentQuestion.choices[choiceIndex];

    if (choice && choice.isCorrect) {
      lState.score += 1;
    }
    renderSubTabContent();
  };

  window.learnNextListenQuestion = function () {
    learnState.listen.currentQuestion = null;
    renderSubTabContent();
  };

  // ==========================================
  // TAB 4: 🈴 214 Bộ Thủ Khang Hy (Radicals)
  // ==========================================
  function renderRadicalsTab(container) {
    const loc = getLang();
    const rState = learnState.radicals;

    let radicals = LearnService.getRadicals(rState.strokeFilter);
    if (rState.searchQuery) {
      radicals = LearnService.searchRadicals(rState.searchQuery);
    }

    const strokeFilters = [
      { id: 'all', label: loc === 'ja' ? '全214部首' : (loc === 'en' ? 'All (214)' : 'Tất cả (214)') },
      { id: '1', label: '1 ' + (loc === 'ja' ? '画' : (loc === 'en' ? 'stroke' : 'nét')) },
      { id: '2', label: '2 ' + (loc === 'ja' ? '画' : (loc === 'en' ? 'strokes' : 'nét')) },
      { id: '3', label: '3 ' + (loc === 'ja' ? '画' : (loc === 'en' ? 'strokes' : 'nét')) },
      { id: '4', label: '4 ' + (loc === 'ja' ? '画' : (loc === 'en' ? 'strokes' : 'nét')) },
      { id: '5', label: '5 ' + (loc === 'ja' ? '画' : (loc === 'en' ? 'strokes' : 'nét')) },
      { id: '6', label: '6 ' + (loc === 'ja' ? '画' : (loc === 'en' ? 'strokes' : 'nét')) },
      { id: '7', label: '7 ' + (loc === 'ja' ? '画' : (loc === 'en' ? 'strokes' : 'nét')) }
    ];

    const filterChipsHtml = strokeFilters.map(sf => `
      <button type="button" class="radical-filter-chip ${rState.strokeFilter === sf.id ? 'active' : ''}" onclick="learnSetRadicalStrokeFilter('${sf.id}')">
        ${sf.label}
      </button>
    `).join('');

    const radicalCardsHtml = radicals.map(r => `
      <div class="radical-grid-card" onclick="learnOpenRadicalDetail('${escapeQuotes(r.id)}')">
        <div class="radical-stroke-badge">${r.strokes} ${loc === 'ja' ? '画' : (loc === 'en' ? 'str' : 'nét')}</div>
        <div class="radical-char" lang="zh-CN">${escapeHtml(r.radical)}</div>
        <div class="radical-pinyin">${escapeHtml(r.pinyin)}</div>
        <div class="radical-hanviet">[${escapeHtml(r.hanviet)}]</div>
        <div class="radical-meaning">${escapeHtml(r.meaning[loc] || r.meaning.vi)}</div>
      </div>
    `).join('');

    // Modal view if active
    let modalHtml = '';
    if (rState.activeRadicalId) {
      const activeRadical = LearnService.getRadicalById(rState.activeRadicalId);
      if (activeRadical) {
        modalHtml = `
          <div class="radical-modal-backdrop" onclick="learnCloseRadicalDetail()">
            <div class="radical-modal-card" onclick="event.stopPropagation()">
              <button type="button" class="modal-close-btn" onclick="learnCloseRadicalDetail()">✕</button>
              <div class="modal-radical-head">
                <div class="modal-radical-char" lang="zh-CN">${escapeHtml(activeRadical.radical)}</div>
                <div class="modal-radical-info">
                  <div class="modal-radical-title">${loc === 'ja' ? '部首' : (loc === 'en' ? 'Radical' : 'Bộ thủ')} #${activeRadical.num} · ${activeRadical.strokes} ${loc === 'ja' ? '画' : (loc === 'en' ? 'strokes' : 'nét')}</div>
                  <div class="modal-radical-pinyin">
                    <b>${escapeHtml(activeRadical.pinyin)}</b>
                    <span>[${escapeHtml(activeRadical.hanviet)}]</span>
                    <button type="button" class="modal-audio-btn" onclick="playAudio('${escapeQuotes(activeRadical.radical.slice(0, 1))}')">🔊</button>
                  </div>
                </div>
              </div>
              <div class="modal-radical-meaning">
                <b>${loc === 'ja' ? '意味' : (loc === 'en' ? 'Meaning' : 'Ý nghĩa')}:</b> ${escapeHtml(activeRadical.meaning[loc] || activeRadical.meaning.vi)}
              </div>
              <div class="modal-radical-tip">
                💡 <b>${loc === 'ja' ? '成り立ち・覚え方' : (loc === 'en' ? 'Mnemonic Tip' : 'Mẹo ghi nhớ')}:</b> ${escapeHtml(activeRadical.tip[loc] || activeRadical.tip.vi)}
              </div>
              ${activeRadical.examples && activeRadical.examples.length ? `
                <div class="modal-radical-examples">
                  <div class="examples-heading">${loc === 'ja' ? '含まれる漢字例' : (loc === 'en' ? 'Example Characters' : 'Chữ Hán chứa bộ thủ này')}:</div>
                  <div class="examples-row">
                    ${activeRadical.examples.map(ex => `<span class="example-char-pill" onclick="playAudio('${escapeQuotes(ex)}')">${escapeHtml(ex)}</span>`).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <div class="learn-tab-pane radicals-pane">
        <!-- Search and Stroke Chips -->
        <div class="radicals-controls-bar">
          <div class="radicals-search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" class="radicals-search-input" placeholder="${loc === 'ja' ? '部首、ピンイン、意味で検索...' : (loc === 'en' ? 'Search radical, pinyin, meaning...' : 'Tìm bộ thủ, pinyin, âm Hán Việt...')}" value="${escapeHtml(rState.searchQuery)}" oninput="learnSearchRadicals(this.value)">
            ${rState.searchQuery ? `<button type="button" class="search-clear-btn" onclick="learnClearRadicalSearch()">✕</button>` : ''}
          </div>
          <div class="radicals-chips-scroller">
            ${filterChipsHtml}
          </div>
        </div>

        <!-- Radicals Grid -->
        <div class="radicals-grid">
          ${radicalCardsHtml || `<div class="learn-empty-text">${loc === 'ja' ? '部首が見つかりませんでした' : (loc === 'en' ? 'No radicals found' : 'Không tìm thấy bộ thủ phù hợp')}</div>`}
        </div>

        ${modalHtml}
      </div>
    `;
  }

  window.learnSetRadicalStrokeFilter = function (filter) {
    learnState.radicals.strokeFilter = filter;
    learnState.radicals.searchQuery = '';
    renderSubTabContent();
  };

  window.learnSearchRadicals = function (query) {
    learnState.radicals.searchQuery = query;
    renderSubTabContent();
  };

  window.learnClearRadicalSearch = function () {
    learnState.radicals.searchQuery = '';
    renderSubTabContent();
  };

  window.learnOpenRadicalDetail = function (id) {
    learnState.radicals.activeRadicalId = id;
    renderSubTabContent();
  };

  window.learnCloseRadicalDetail = function () {
    learnState.radicals.activeRadicalId = null;
    renderSubTabContent();
  };

  // ==========================================
  // TAB 5: 📚 Thư Viện Từ Vựng (Library)
  // ==========================================
  function renderLibraryTab(container) {
    const loc = getLang();
    const lib = learnState.library;
    const categories = LearnService.getCategories();

    const items = LearnService.getVocabList({
      level: lib.level,
      category: lib.category,
      query: lib.searchQuery,
      favoritesOnly: lib.onlyFavorites
    });

    const total = items.length;
    const startIdx = (lib.page - 1) * lib.pageSize;
    const pagedItems = items.slice(startIdx, startIdx + lib.pageSize);
    const totalPages = Math.ceil(total / lib.pageSize) || 1;

    const categoryOpts = categories.map(c => `
      <option value="${c.id}" ${lib.category === c.id ? 'selected' : ''}>
        ${c.icon} ${escapeHtml(c.name[loc] || c.name.vi)}
      </option>
    `).join('');

    const listHtml = pagedItems.map(item => {
      const isFav = LearnService.isFavorite(item.id);
      const meaning = item.meanings[loc] || item.meanings.vi;
      return `
        <div class="library-item-card">
          <div class="item-left">
            <div class="item-hanzi-row">
              <span class="item-hanzi" lang="zh-CN">${escapeHtml(item.hanzi)}</span>
              <button type="button" class="item-audio-btn" onclick="playAudio('${escapeQuotes(item.hanzi)}')" title="${loc === 'ja' ? '発音' : (loc === 'en' ? 'Audio' : 'Phát âm')}">🔊</button>
              <span class="item-level-tag">${item.level.toUpperCase()}</span>
            </div>
            <div class="item-phonetics">
              <span class="item-pinyin">${escapeHtml(item.pinyin)}</span>
              ${item.hanviet ? `<span class="item-hanviet">[${escapeHtml(item.hanviet)}]</span>` : ''}
            </div>
            <div class="item-meaning">${escapeHtml(meaning)}</div>
          </div>
          <div class="item-right">
            <button type="button" class="item-star-btn ${isFav ? 'active' : ''}" onclick="learnToggleLibraryFav('${escapeQuotes(item.id)}')" title="${loc === 'ja' ? 'お気に入り' : (loc === 'en' ? 'Favorite' : 'Lưu')}">
              ${isFav ? '★' : '☆'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="learn-tab-pane library-pane">
        <!-- Search and Filters -->
        <div class="library-filters-bar">
          <div class="library-search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" class="library-search-input" placeholder="${loc === 'ja' ? '漢字、ピンイン、意味で単語を検索...' : (loc === 'en' ? 'Search words by Hanzi, pinyin, meaning...' : 'Tra cứu từ vựng theo chữ Hán, Pinyin, nghĩa...')}" value="${escapeHtml(lib.searchQuery)}" oninput="learnSearchLibrary(this.value)">
            ${lib.searchQuery ? `<button type="button" class="search-clear-btn" onclick="learnClearLibrarySearch()">✕</button>` : ''}
          </div>

          <div class="library-selects-row">
            <select class="learn-select" onchange="learnSetLibraryLevel(this.value)">
              <option value="all" ${lib.level === 'all' ? 'selected' : ''}>🌟 ${loc === 'ja' ? '全レベル' : (loc === 'en' ? 'All Levels' : 'Tất cả cấp HSK')}</option>
              <option value="hsk1" ${lib.level === 'hsk1' ? 'selected' : ''}>HSK 1</option>
              <option value="hsk2" ${lib.level === 'hsk2' ? 'selected' : ''}>HSK 2</option>
              <option value="hsk3" ${lib.level === 'hsk3' ? 'selected' : ''}>HSK 3</option>
              <option value="hsk4" ${lib.level === 'hsk4' ? 'selected' : ''}>HSK 4</option>
              <option value="hsk5" ${lib.level === 'hsk5' ? 'selected' : ''}>HSK 5</option>
              <option value="hsk6" ${lib.level === 'hsk6' ? 'selected' : ''}>HSK 6</option>
            </select>

            <select class="learn-select" onchange="learnSetLibraryCategory(this.value)">
              <option value="all" ${lib.category === 'all' ? 'selected' : ''}>🏷️ ${loc === 'ja' ? '全テーマ' : (loc === 'en' ? 'All Topics' : 'Tất cả chủ đề')}</option>
              ${categoryOpts}
            </select>

            <button type="button" class="btn-fav-filter ${lib.onlyFavorites ? 'active' : ''}" onclick="learnToggleLibraryOnlyFav()">
              ⭐ ${loc === 'ja' ? '保存済み' : (loc === 'en' ? 'Saved' : 'Đã lưu')}
            </button>
          </div>
        </div>

        <div class="library-count-row">
          ${loc === 'ja' ? `該当件数: <b>${total}</b> 件` : (loc === 'en' ? `Found: <b>${total}</b> word(s)` : `Tìm thấy: <b>${total}</b> từ vựng`)}
        </div>

        <!-- Word List -->
        <div class="library-words-list">
          ${listHtml || `<div class="learn-empty-text">${loc === 'ja' ? '単語が見つかりませんでした' : (loc === 'en' ? 'No words found' : 'Không tìm thấy từ vựng nào')}</div>`}
        </div>

        <!-- Pagination -->
        ${totalPages > 1 ? `
          <div class="library-pagination">
            <button type="button" class="btn btn-secondary btn-sm" ${lib.page <= 1 ? 'disabled' : ''} onclick="learnSetLibraryPage(${lib.page - 1})">←</button>
            <span class="pagination-info">${lib.page} / ${totalPages}</span>
            <button type="button" class="btn btn-secondary btn-sm" ${lib.page >= totalPages ? 'disabled' : ''} onclick="learnSetLibraryPage(${lib.page + 1})">→</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  window.learnSearchLibrary = function (q) {
    learnState.library.searchQuery = q;
    learnState.library.page = 1;
    renderSubTabContent();
  };

  window.learnClearLibrarySearch = function () {
    learnState.library.searchQuery = '';
    learnState.library.page = 1;
    renderSubTabContent();
  };

  window.learnSetLibraryLevel = function (lvl) {
    learnState.library.level = lvl;
    learnState.library.page = 1;
    renderSubTabContent();
  };

  window.learnSetLibraryCategory = function (cat) {
    learnState.library.category = cat;
    learnState.library.page = 1;
    renderSubTabContent();
  };

  window.learnToggleLibraryOnlyFav = function () {
    learnState.library.onlyFavorites = !learnState.library.onlyFavorites;
    learnState.library.page = 1;
    renderSubTabContent();
  };

  window.learnSetLibraryPage = function (p) {
    learnState.library.page = p;
    renderSubTabContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.learnToggleLibraryFav = function (id) {
    LearnService.toggleFavorite(id);
    renderSubTabContent();
  };

  // ==========================================
  // Progress Reset (Multi-user safe)
  // ==========================================
  window.learnResetProgress = function () {
    const loc = getLang();
    const msg = loc === 'ja'
      ? 'すべての学習進捗（フラッシュカード復習記録と連続日数）をリセットして0に戻しますか？\n（新しい学習者が最初から始めることができます）'
      : (loc === 'en'
        ? 'Are you sure you want to reset all study progress back to 0?\n(This allows a new learner to start fresh from beginning)'
        : 'Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học từ vựng về 0 không?\n(Tiến độ sẽ được làm mới để người học mới bắt đầu lại từ đầu)');

    if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
      const ok = window.confirm(msg);
      if (!ok) return false;
    }

    LearnService.resetAllProgress();
    learnRestartQuiz();
    renderLearnView();

    if (typeof showToast === 'function') {
      showToast(loc === 'ja' ? '学習進捗をリセットしました' : (loc === 'en' ? 'Study progress reset successfully' : 'Đã đặt lại tiến độ học về 0'));
    }
    return true;
  };

  // Expose View Renderer Globally
  window.renderLearnView = renderLearnView;

  // Auto-init on DOMContentLoaded if active
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof state !== 'undefined' && state.currentView === 'learn') {
          renderLearnView();
        }
      });
    }
  }
})();

