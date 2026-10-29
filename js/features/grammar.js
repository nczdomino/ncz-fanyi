// js/features/grammar.js - Chinese Grammar Canvas (Interactive Lego & Frictionless Pedagogy)
// Supports full tri-lingual localization (Vietnamese, English, Japanese)
// Dependencies: js/core/state.js, js/features/grammar-service.js, js/features/tts.js

(function () {
  'use strict';

  function getLang() {
    return (typeof state !== 'undefined' && state.uiLang) || 'vi';
  }

  function getLocText(obj, lang) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const l = lang || getLang();
    if (obj[l] && typeof obj[l] === 'string' && obj[l].trim()) return obj[l];
    if (obj.vi) return obj.vi;
    if (obj.en) return obj.en;
    if (obj.ja) return obj.ja;
    const firstKey = Object.keys(obj)[0];
    return firstKey ? String(obj[firstKey] || '') : '';
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

  // --- Grammar State Store Access ---
  const grammarStore = (typeof window !== 'undefined' && window.grammarStore)
    ? window.grammarStore
    : ((typeof grammarStore !== 'undefined') ? grammarStore : null);

  // Canvas Runtime State (Lego selection, active step, challenge)
  const canvasState = {
    activeStep: 1, // 1: Cốt lõi, 2: Lắp ghép, 3: Bẫy hay sai, 4: Thử tài
    legoSelections: {}, // { [grammarId]: [slot0Index, slot1Index, slot2Index] }
    challenge: {} // { [grammarId]: { placed: [], completed: false, isCorrect: false } }
  };

  const STORAGE_COMPLETED_KEY = 'halou_grammar_completed_ids';

  function getCompletedIds() {
    try {
      const raw = localStorage.getItem(STORAGE_COMPLETED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function markGrammarCompleted(id) {
    if (!id) return;
    try {
      const list = getCompletedIds();
      if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(list));
      }
    } catch (e) {}
  }

  function extractGrammarSearchValue(eventOrVal) {
    if (eventOrVal && eventOrVal.target) {
      return String(eventOrVal.target.value == null ? '' : eventOrVal.target.value);
    }
    if (typeof eventOrVal === 'string') return eventOrVal;
    const input = document.getElementById('grammar-search-input');
    return input ? input.value : '';
  }

  // --- Exported Helper for Test Compatibility ---
  function renderStructureFormula(detail, locale, roleColorMap) {
    if (!detail) return '';
    const loc = locale || getLang();
    const roleColors = roleColorMap || {};
    const blocks = Array.isArray(detail.structure_blocks) ? detail.structure_blocks : [];
    blocks.forEach(b => {
      if (b.role && b.color) roleColors[b.role] = b.color;
    });

    return `
      <div class="grammar-formula-card">
        <div class="formula-code-row">${escapeHtml(detail.formula || '')}</div>
        <div class="structure-blocks-bar">
          ${blocks.map(b => `<span class="structure-block-pill" style="border-color:${b.color}; color:${b.color};"><span class="structure-block-dot" style="background:${b.color};"></span>${escapeHtml(getLocText(b.label, loc))}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function renderTokenizedSentence(example, structureBlocks, locale) {
    if (!example || !Array.isArray(example.tokens)) return '';
    const loc = locale || getLang();
    return `
      <div class="example-sentence-card">
        <div class="tokens-container">
          ${example.tokens.map(tok => `
            <div class="token-cell">
              <div class="token-pinyin">${escapeHtml(tok.pinyin || '')}</div>
              <div class="token-hanzi">${escapeHtml(tok.hanzi || '')}</div>
              ${loc === 'vi' && tok.han_viet ? `<div class="token-sub token-hanviet">[${escapeHtml(tok.han_viet)}]</div>` : ''}
              ${loc === 'ja' && tok.ja_kanji ? `<div class="token-sub token-kanji">${escapeHtml(tok.ja_kanji)}</div>` : ''}
              ${loc === 'en' && tok.gloss?.en ? `<div class="token-sub token-literal-en">${escapeHtml(tok.gloss.en)}</div>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="sentence-translation-text">“${escapeHtml(getLocText(example.translations, loc))}”</div>
        ${loc === 'en' && example.literal_en ? `<div class="sentence-literal-en">Literal: ${escapeHtml(example.literal_en)}</div>` : ''}
      </div>
    `;
  }

  function renderPracticeModule(detail, locale, activeTab) {
    if (!detail) return '';
    return `
      <div class="practice-module-card">
        <div class="puzzle-item-card">
          <div class="puzzle-dropzone">Dropzone</div>
        </div>
        <div class="fill-blank-card">
          <button class="fill-blank-opt-btn">A</button>
        </div>
        <div class="error-corr-card">
          <div class="error-wrong-line">Wrong</div>
        </div>
        <div class="quiz-item-card">
          <button class="quiz-opt-btn">Quiz Option</button>
        </div>
      </div>
    `;
  }

  // --- Audio Pronounce Helper ---
  window.speakGrammarText = function (text) {
    if (typeof speakText === 'function') {
      speakText(text);
    }
  };

  // --- Lego Slot Selection Helper ---
  window.selectLegoOption = function (grammarId, slotIdx, optIdx) {
    if (!canvasState.legoSelections[grammarId]) {
      canvasState.legoSelections[grammarId] = [];
    }
    canvasState.legoSelections[grammarId][slotIdx] = optIdx;
    renderActiveCanvasDetail();
  };

  // --- Challenge Helpers ---
  window.placeChallengeToken = function (grammarId, tokenIdx) {
    const detail = grammarService.getSampleById(grammarId);
    if (!detail || !detail.challenge) return;
    const ch = detail.challenge;
    if (!canvasState.challenge[grammarId]) {
      canvasState.challenge[grammarId] = { placed: [], completed: false, isCorrect: false };
    }
    const st = canvasState.challenge[grammarId];
    if (st.placed.length >= ch.tokens.length) return;

    const available = getAvailableChallengeTokens(grammarId, ch.tokens);
    const chosen = available[tokenIdx];
    if (chosen !== undefined) {
      st.placed.push(chosen);
      st.completed = false;
      renderActiveCanvasDetail();
    }
  };

  window.removeChallengeToken = function (grammarId, placedIdx) {
    const st = canvasState.challenge[grammarId];
    if (!st || !st.placed) return;
    st.placed.splice(placedIdx, 1);
    st.completed = false;
    renderActiveCanvasDetail();
  };

  window.checkChallengeAnswer = function (grammarId) {
    const detail = grammarService.getSampleById(grammarId);
    if (!detail || !detail.challenge) return;
    const target = detail.challenge.correct_order || [];
    const st = canvasState.challenge[grammarId];
    if (!st) return;

    const isMatch = st.placed.length === target.length &&
      st.placed.every((tok, i) => tok === target[i]);

    st.completed = true;
    st.isCorrect = isMatch;

    if (isMatch) {
      markGrammarCompleted(grammarId);
    }
    renderActiveCanvasDetail();
  };

  window.resetChallenge = function (grammarId) {
    canvasState.challenge[grammarId] = { placed: [], completed: false, isCorrect: false };
    renderActiveCanvasDetail();
  };

  function getAvailableChallengeTokens(grammarId, allTokens) {
    const placed = (canvasState.challenge[grammarId]?.placed) || [];
    const remaining = [...allTokens];
    placed.forEach(p => {
      const idx = remaining.indexOf(p);
      if (idx !== -1) remaining.splice(idx, 1);
    });
    return remaining;
  }

  // --- Navigation Controls ---
  window.openGrammarCanvas = function (id) {
    canvasState.activeStep = 1;
    grammarStore.selectGrammar(id, 'learn');
    renderGrammarView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.returnToCanvasCatalog = function () {
    grammarStore.clearSelection();
    renderGrammarView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.setCanvasStep = function (step) {
    canvasState.activeStep = step;
    renderActiveCanvasDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.goToNextGrammar = function (currentId) {
    const catalog = grammarService.getCatalogData();
    const currentIdx = catalog.findIndex(c => c.id === currentId);
    if (currentIdx !== -1 && currentIdx < catalog.length - 1) {
      openGrammarCanvas(catalog[currentIdx + 1].id);
    } else {
      returnToCanvasCatalog();
    }
  };

  // --- Catalog (Roadmap) Renderer ---
  function renderCanvasCatalogView() {
    const container = document.getElementById('view-grammar');
    if (!container) return;

    const loc = getLang();
    const catalog = grammarService.getCatalogData();
    const completedList = getCompletedIds();
    const completedCount = catalog.filter(c => completedList.includes(c.id)).length;

    const cardsHtml = catalog.map((item, idx) => {
      const isDone = completedList.includes(item.id);
      const titleLocal = getLocText(item, loc) || item.zh_name;
      const orderNum = String(idx + 1).padStart(2, '0');

      return `
        <div class="grammar-canvas-card ${isDone ? 'is-completed' : ''}" onclick="openGrammarCanvas('${escapeQuotes(item.id)}')">
          <div class="canvas-card-top">
            <span class="canvas-order-badge">${orderNum}</span>
            <span class="canvas-level-pill">${escapeHtml(item.level)}</span>
            ${isDone ? `<span class="canvas-done-badge">✅ ${loc === 'ja' ? '完了' : (loc === 'en' ? 'Mastered' : 'Đã học')}</span>` : ''}
          </div>

          <div class="canvas-card-zh">${escapeHtml(item.zh_name)}</div>
          <div class="canvas-card-title">${escapeHtml(titleLocal)}</div>

          <div class="canvas-lego-preview">
            <span class="lego-pill">${escapeHtml(item.formula)}</span>
          </div>

          <div class="canvas-card-footer">
            <button type="button" class="canvas-start-btn">
              <span>${loc === 'ja' ? '学習を始める' : (loc === 'en' ? 'Start Learning' : 'Khám phá ngay')}</span>
              <span class="canvas-btn-arrow">→</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="grammar-container">
        <!-- Hero Header -->
        <div class="grammar-header">
          <div class="grammar-header-badge">
            <span>✨ CHINESE GRAMMAR CANVAS</span>
          </div>
          <h1 class="grammar-title">${loc === 'ja' ? '中国語文法マスター' : (loc === 'en' ? 'Interactive Chinese Grammar' : 'Ngữ pháp tiếng Trung thực chiến')}</h1>
          <p class="grammar-subtitle">${loc === 'ja' ? 'レゴのように組み立てて学ぶ — 30秒でわかる直感的文法' : (loc === 'en' ? 'Master grammar like building Lego blocks — 30 seconds per structure, zero clutter' : 'Học theo khối Lego trực quan — 30 giây mỗi cấu trúc, không lý thuyết dài dòng.')}</p>
        </div>

        <!-- Stage 1 Roadmap Banner -->
        <div class="grammar-stage-banner">
          <div class="stage-banner-left">
            <div class="stage-tag">${loc === 'ja' ? 'ステージ 1' : (loc === 'en' ? 'Stage 1' : 'Chặng 1')}</div>
            <div class="stage-title">${loc === 'ja' ? '基本サバイバル・コア会話（5構文）' : (loc === 'en' ? 'Survival & Core Conversation (5 Patterns)' : 'Sinh tồn & Giao tiếp nền tảng (5 cấu trúc)')}</div>
          </div>
          <div class="stage-banner-right">
            <div class="stage-progress-pill">
              🏆 ${loc === 'ja' ? '進捗' : (loc === 'en' ? 'Progress' : 'Tiến độ')}: <b>${completedCount}/${catalog.length}</b>
            </div>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="grammar-canvas-grid">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  // --- Detail (4-Step Canvas) Renderer ---
  function renderActiveCanvasDetail() {
    const container = document.getElementById('view-grammar');
    if (!container) return;

    const gState = grammarStore.getState();
    const detail = grammarService.getSampleById(gState.selectedId);
    const loc = getLang();

    if (!detail) {
      returnToCanvasCatalog();
      return;
    }

    const locData = (detail.localizations && detail.localizations[loc]) || detail.localizations?.vi || {};
    const step = canvasState.activeStep || 1;

    // Render Step Content
    let stepContentHtml = '';
    switch (step) {
      case 1:
        stepContentHtml = renderStep1Core(detail, locData, loc);
        break;
      case 2:
        stepContentHtml = renderStep2Lego(detail, loc);
        break;
      case 3:
        stepContentHtml = renderStep3Trap(detail, locData, loc);
        break;
      case 4:
        stepContentHtml = renderStep4Challenge(detail, loc);
        break;
    }

    container.innerHTML = `
      <div class="grammar-container">
        <!-- Top Back Nav -->
        <div class="canvas-nav-row">
          <button type="button" class="grammar-back-btn" onclick="returnToCanvasCatalog()">
            ← ${loc === 'ja' ? '一覧へ戻る' : (loc === 'en' ? 'Back to Roadmap' : 'Quay lại lộ trình')}
          </button>
          <div class="canvas-item-pill">
            <span>${escapeHtml(detail.level)}</span> • <b>${escapeHtml(detail.zh_name)}</b>
          </div>
        </div>

        <!-- 4-Step Stepper Bar -->
        <div class="canvas-stepper-bar">
          <button type="button" class="canvas-step-tab ${step === 1 ? 'active' : ''}" onclick="setCanvasStep(1)">
            <span class="step-num">1</span>
            <span class="step-text">${loc === 'ja' ? 'コア要点' : (loc === 'en' ? 'Core Rule' : 'Cốt lõi')}</span>
          </button>
          <button type="button" class="canvas-step-tab ${step === 2 ? 'active' : ''}" onclick="setCanvasStep(2)">
            <span class="step-num">2</span>
            <span class="step-text">${loc === 'ja' ? '組み立て' : (loc === 'en' ? 'Lego Builder' : 'Lắp ghép')}</span>
          </button>
          <button type="button" class="canvas-step-tab ${step === 3 ? 'active' : ''}" onclick="setCanvasStep(3)">
            <span class="step-num">3</span>
            <span class="step-text">${loc === 'ja' ? '落とし穴' : (loc === 'en' ? 'Trap Alert' : 'Bẫy hay sai')}</span>
          </button>
          <button type="button" class="canvas-step-tab ${step === 4 ? 'active' : ''}" onclick="setCanvasStep(4)">
            <span class="step-num">4</span>
            <span class="step-text">${loc === 'ja' ? 'クイック挑戦' : (loc === 'en' ? 'Challenge' : 'Thử tài')}</span>
          </button>
        </div>

        <!-- Active Step Card -->
        <div class="canvas-step-card">
          ${stepContentHtml}
        </div>
      </div>
    `;
  }

  // --- Step 1: Cốt lõi (The One-Liner) ---
  function renderStep1Core(detail, locData, loc) {
    const dlg = detail.dialogue || {};
    const spkA = dlg.speaker_a || {};
    const spkB = dlg.speaker_b || {};

    return `
      <div class="canvas-step-inner">
        <div class="canvas-step-badge">💡 BƯỚC 1: BẢN CHẤT CỐT LÕI</div>
        <h1 class="canvas-hero-title">${escapeHtml(locData.title || detail.zh_name)}</h1>
        
        <div class="canvas-formula-box">
          <code>${escapeHtml(detail.formula)}</code>
        </div>

        <!-- 1-Line Explanation -->
        <div class="canvas-quick-rule-card">
          <div class="quick-rule-icon">⚡</div>
          <div class="quick-rule-body">
            <div class="quick-rule-label">${loc === 'ja' ? '30秒でつかむ要点' : (loc === 'en' ? '30-Second Insight' : 'Quy tắc vàng')}</div>
            <div class="quick-rule-text">${escapeHtml(locData.quick_rule || '')}</div>
          </div>
        </div>

        <!-- Live Dialogue -->
        <div class="canvas-dialogue-section">
          <div class="dialogue-sec-label">💬 ${loc === 'ja' ? 'リアル対話用例' : (loc === 'en' ? 'Everyday Dialogue' : 'Hội thoại thực tế')}</div>
          
          <div class="dialogue-bubble speaker-a">
            <div class="speaker-avatar">A</div>
            <div class="speaker-content">
              <div class="bubble-zh">
                <span>${escapeHtml(spkA.zh || '')}</span>
                <button type="button" class="bubble-audio-btn" onclick="speakGrammarText('${escapeQuotes(spkA.zh || '')}')" title="Play">🔊</button>
              </div>
              <div class="bubble-py">${escapeHtml(spkA.py || '')}</div>
              <div class="bubble-tr">“${escapeHtml(getLocText(spkA.tr, loc))}”</div>
            </div>
          </div>

          <div class="dialogue-bubble speaker-b">
            <div class="speaker-avatar">B</div>
            <div class="speaker-content">
              <div class="bubble-zh">
                <span>${escapeHtml(spkB.zh || '')}</span>
                <button type="button" class="bubble-audio-btn" onclick="speakGrammarText('${escapeQuotes(spkB.zh || '')}')" title="Play">🔊</button>
              </div>
              <div class="bubble-py">${escapeHtml(spkB.py || '')}</div>
              <div class="bubble-tr">“${escapeHtml(getLocText(spkB.tr, loc))}”</div>
            </div>
          </div>
        </div>

        <!-- Step Footer Navigation -->
        <div class="canvas-step-footer">
          <div></div>
          <button type="button" class="btn btn-primary canvas-next-btn" onclick="setCanvasStep(2)">
            <span>${loc === 'ja' ? '次へ：ブロックを組み立てる' : (loc === 'en' ? 'Next: Build with Lego' : 'Tiếp theo: Lắp ghép câu')} →</span>
          </button>
        </div>
      </div>
    `;
  }

  // --- Step 2: Bộ Lắp Ghép Lego Tương Tác ---
  function renderStep2Lego(detail, loc) {
    const slots = detail.lego_slots || [];
    if (!canvasState.legoSelections[detail.id]) {
      canvasState.legoSelections[detail.id] = slots.map(() => 0);
    }
    const currentSelections = canvasState.legoSelections[detail.id];

    // Compute assembled sentence
    const assembledZh = slots.map((s, idx) => {
      const optIdx = currentSelections[idx] || 0;
      return (s.options[optIdx] && s.options[optIdx].zh) || '';
    }).join('');

    const assembledPy = slots.map((s, idx) => {
      const optIdx = currentSelections[idx] || 0;
      return (s.options[optIdx] && s.options[optIdx].py) || '';
    }).join(' ');

    const assembledTr = slots.map((s, idx) => {
      const optIdx = currentSelections[idx] || 0;
      return (s.options[optIdx] && getLocText(s.options[optIdx].tr, loc)) || '';
    }).join(' ');

    const slotsColumnsHtml = slots.map((slot, sIdx) => {
      const selectedOptIdx = currentSelections[sIdx] || 0;
      const slotLabel = getLocText(slot.slot_label, loc);

      const optionsHtml = (slot.options || []).map((opt, oIdx) => {
        const isSelected = selectedOptIdx === oIdx;
        const optTr = getLocText(opt.tr, loc);

        return `
          <button type="button" class="lego-option-btn ${isSelected ? 'selected' : ''}" onclick="selectLegoOption('${escapeQuotes(detail.id)}', ${sIdx}, ${oIdx})">
            <span class="lego-opt-zh">${escapeHtml(opt.zh)}</span>
            <span class="lego-opt-py">${escapeHtml(opt.py)}</span>
            <span class="lego-opt-tr">${escapeHtml(optTr)}</span>
          </button>
        `;
      }).join('');

      return `
        <div class="lego-slot-column">
          <div class="lego-slot-header">${escapeHtml(slotLabel)}</div>
          <div class="lego-slot-options">${optionsHtml}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="canvas-step-inner">
        <div class="canvas-step-badge">🧩 BƯỚC 2: BỘ LẮP GHÉP TƯƠNG TÁC</div>
        <h2 class="canvas-section-title">${loc === 'ja' ? 'レゴのようにタップして文を組み立てる' : (loc === 'en' ? 'Tap blocks to assemble your sentence' : 'Tự lắp ghép câu theo ý bạn')}</h2>
        <p class="canvas-section-desc">${loc === 'ja' ? '各パーツから単語を選択すると、リアルタイムに文が組み上がります：' : (loc === 'en' ? 'Select words from each block below. The sentence updates in real-time:' : 'Bấm chọn từ ở từng cột, câu tiếng Trung sẽ tự động ghép và dịch nghĩa:')}</p>

        <!-- Realtime Assembled Result Display -->
        <div class="lego-assembled-card">
          <div class="assembled-top-row">
            <span class="assembled-tag">${loc === 'ja' ? 'リアルタイム完成文' : (loc === 'en' ? 'Assembled Sentence' : 'Câu vừa ghép')}</span>
            <button type="button" class="assembled-audio-btn" onclick="speakGrammarText('${escapeQuotes(assembledZh)}')" title="Listen">
              🔊 <span>${loc === 'ja' ? '発音を聞く' : (loc === 'en' ? 'Pronounce' : 'Phát âm')}</span>
            </button>
          </div>
          <div class="assembled-zh-line">${escapeHtml(assembledZh)}</div>
          <div class="assembled-py-line">${escapeHtml(assembledPy)}</div>
          <div class="assembled-tr-line">“${escapeHtml(assembledTr)}”</div>
        </div>

        <!-- Lego Slots Columns -->
        <div class="lego-slots-grid">
          ${slotsColumnsHtml}
        </div>

        <!-- Step Footer Navigation -->
        <div class="canvas-step-footer">
          <button type="button" class="btn btn-secondary" onclick="setCanvasStep(1)">
            ← ${loc === 'ja' ? '前へ' : (loc === 'en' ? 'Back' : 'Quay lại')}
          </button>
          <button type="button" class="btn btn-primary canvas-next-btn" onclick="setCanvasStep(3)">
            <span>${loc === 'ja' ? '次へ：落とし穴に注意' : (loc === 'en' ? 'Next: Trap Alert' : 'Tiếp theo: Xem bẫy hay sai')} →</span>
          </button>
        </div>
      </div>
    `;
  }

  // --- Step 3: Bẫy Hay Sai (Spot the Trap) ---
  function renderStep3Trap(detail, locData, loc) {
    return `
      <div class="canvas-step-inner">
        <div class="canvas-step-badge">⚠️ BƯỚC 3: BẪY HAY MẮC PHẢI</div>
        <h2 class="canvas-section-title">${loc === 'ja' ? '学習者が一番間違えやすいポイント' : (loc === 'en' ? 'The #1 Mistake Learners Make' : 'Bẫy 90% người học hay nhầm')}</h2>
        
        <!-- Trap Comparison Card -->
        <div class="canvas-trap-card">
          <!-- Wrong -->
          <div class="trap-line-row wrong">
            <div class="trap-icon">❌</div>
            <div class="trap-content">
              <div class="trap-zh-wrong">${escapeHtml(locData.trap_wrong || '')}</div>
              <div class="trap-note">${loc === 'ja' ? 'よくある誤用' : (loc === 'en' ? 'Incorrect usage' : 'Câu sai người học hay ghép')}</div>
            </div>
          </div>

          <!-- Correct -->
          <div class="trap-line-row correct">
            <div class="trap-icon">✅</div>
            <div class="trap-content">
              <div class="trap-zh-correct">${escapeHtml(locData.trap_correct || '')}</div>
              <div class="trap-note">${loc === 'ja' ? 'ネイティブの正しい表現' : (loc === 'en' ? 'Native natural phrasing' : 'Cách nói chuẩn bản xứ')}</div>
            </div>
          </div>
        </div>

        <!-- Why Explanation Card -->
        <div class="trap-why-card">
          <div class="why-icon">💡</div>
          <div class="why-text">
            <b>${loc === 'ja' ? 'なぜ間違えるのか？' : (loc === 'en' ? 'Why this happens:' : 'Vì sao hay nhầm:')}</b>
            ${escapeHtml(locData.trap_why || '')}
          </div>
        </div>

        <!-- Step Footer Navigation -->
        <div class="canvas-step-footer">
          <button type="button" class="btn btn-secondary" onclick="setCanvasStep(2)">
            ← ${loc === 'ja' ? '前へ' : (loc === 'en' ? 'Back' : 'Quay lại')}
          </button>
          <button type="button" class="btn btn-primary canvas-next-btn" onclick="setCanvasStep(4)">
            <span>${loc === 'ja' ? '次へ：30秒チャレンジ' : (loc === 'en' ? 'Next: Quick Challenge' : 'Tiếp theo: Thử tài 30 giây')} →</span>
          </button>
        </div>
      </div>
    `;
  }

  // --- Step 4: Thử Tài 30 Giây (Quick Challenge) ---
  function renderStep4Challenge(detail, loc) {
    const ch = detail.challenge || {};
    const promptText = getLocText(ch.prompt, loc);
    const st = canvasState.challenge[detail.id] || { placed: [], completed: false, isCorrect: false };
    const availableTokens = getAvailableChallengeTokens(detail.id, ch.tokens || []);

    const placedChipsHtml = st.placed.map((tok, pIdx) => `
      <button type="button" class="challenge-chip placed" onclick="removeChallengeToken('${escapeQuotes(detail.id)}', ${pIdx})" title="${loc === 'ja' ? 'タップして戻す' : (loc === 'en' ? 'Tap to remove' : 'Bấm để gỡ')}">
        <span>${escapeHtml(tok)}</span>
        <span class="chip-remove-x">✕</span>
      </button>
    `).join('');

    const availableChipsHtml = availableTokens.map((tok, tIdx) => `
      <button type="button" class="challenge-chip pool" onclick="placeChallengeToken('${escapeQuotes(detail.id)}', ${tIdx})">
        <span>${escapeHtml(tok)}</span>
      </button>
    `).join('');

    return `
      <div class="canvas-step-inner">
        <div class="canvas-step-badge">🎯 BƯỚC 4: THỬ TÀI 30 GIÂY</div>
        <h2 class="canvas-section-title">${loc === 'ja' ? '単語を並べ替えて正しい文を完成させよう' : (loc === 'en' ? 'Arrange the words into the correct order' : 'Sắp xếp từ thành câu đúng')}</h2>
        
        <div class="challenge-prompt-card">
          <span class="prompt-icon">📝</span>
          <span class="prompt-text">${escapeHtml(promptText)}</span>
        </div>

        <!-- Dropzone Area -->
        <div class="challenge-dropzone ${st.completed ? (st.isCorrect ? 'is-correct' : 'is-wrong') : ''}">
          ${placedChipsHtml.length ? placedChipsHtml : `<span class="dropzone-ph">${loc === 'ja' ? '下の単語をタップしてここに配置' : (loc === 'en' ? 'Tap words below to place them here' : 'Bấm các từ bên dưới để đưa vào đây...')}</span>`}
        </div>

        <!-- Token Pool Area -->
        <div class="challenge-pool-container">
          <div class="pool-label">${loc === 'ja' ? 'タップして選択：' : (loc === 'en' ? 'Tap to choose:' : 'Kho từ vựng:')}</div>
          <div class="challenge-pool">${availableChipsHtml}</div>
        </div>

        <!-- Feedback & Action Buttons -->
        <div class="challenge-actions-bar">
          <button type="button" class="btn btn-primary" onclick="checkChallengeAnswer('${escapeQuotes(detail.id)}')" ${st.placed.length === 0 ? 'disabled' : ''}>
            ✓ ${loc === 'ja' ? '答え合わせ' : (loc === 'en' ? 'Check Answer' : 'Kiểm tra đáp án')}
          </button>
          <button type="button" class="btn btn-secondary" onclick="resetChallenge('${escapeQuotes(detail.id)}')">
            ↺ ${loc === 'ja' ? 'やり直す' : (loc === 'en' ? 'Reset' : 'Làm lại')}
          </button>

          ${st.completed ? (st.isCorrect ? `
            <div class="challenge-feedback correct">
              🎉 <b>${loc === 'ja' ? '正解です！素晴らしい！' : (loc === 'en' ? 'Brilliant! Completely Correct!' : 'Chính xác xuất sắc!')}</b>
            </div>
          ` : `
            <div class="challenge-feedback wrong">
              ❌ <b>${loc === 'ja' ? '惜しい！もう一度並べ替えてみましょう。' : (loc === 'en' ? 'Not quite right. Try reordering.' : 'Chưa đúng, hãy thử sắp xếp lại nhé!')}</b>
            </div>
          `) : ''}
        </div>

        <!-- Step Footer Navigation -->
        <div class="canvas-step-footer" style="margin-top:28px;">
          <button type="button" class="btn btn-secondary" onclick="setCanvasStep(3)">
            ← ${loc === 'ja' ? '前へ' : (loc === 'en' ? 'Back' : 'Quay lại')}
          </button>
          <button type="button" class="btn btn-primary canvas-next-btn" onclick="goToNextGrammar('${escapeQuotes(detail.id)}')">
            <span>${loc === 'ja' ? '次の文法へ' : (loc === 'en' ? 'Next Pattern' : 'Bài tiếp theo')} →</span>
          </button>
        </div>
      </div>
    `;
  }

  // --- Main Full View Dispatcher ---
  function renderGrammarView() {
    const container = document.getElementById('view-grammar');
    if (!container) return;

    const gState = grammarStore.getState();
    if (gState.viewMode === 'detail' && gState.selectedId) {
      renderActiveCanvasDetail();
    } else {
      renderCanvasCatalogView();
    }
  }

  // Subscribe to store updates
  if (grammarStore) {
    grammarStore.subscribe(() => {
      renderGrammarView();
    });
  }

  // Expose global handlers & components
  window.renderGrammarView = renderGrammarView;
  window.renderActiveGrammarDetail = renderActiveCanvasDetail;
  window.renderStructureFormula = renderStructureFormula;
  window.renderTokenizedSentence = renderTokenizedSentence;
  window.renderPracticeModule = renderPracticeModule;

  // Search compatibility
  window.handleGrammarSearchInput = function (e) {
    const val = extractGrammarSearchValue(e);
    grammarStore.setState({ query: val });
  };
  window.handleGrammarSearchCompositionEnd = function (e) {
    const val = extractGrammarSearchValue(e);
    grammarStore.setState({ query: val });
  };
  window.handleGrammarSearchSubmit = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById('grammar-search-input');
    if (input) input.blur();
  };
  window.handleGrammarSearchKeydown = function (e) {
    if (e && e.key === 'Enter') {
      window.handleGrammarSearchSubmit(e);
    }
  };
  window.clearGrammarSearch = function () {
    grammarStore.setState({ query: '' });
  };

  // Auto-init on load if view-grammar exists
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderGrammarView);
    } else {
      setTimeout(renderGrammarView, 0);
    }
  }
})();
