// js/features/grammar.js - Interactive UI Components for HSK 2.0 & 3.0 Grammar System
// Dependencies: js/core/state.js, js/features/grammar-service.js, js/features/tts.js

(function () {
  'use strict';

  // --- Component 1: StructureFormula ---
  /**
   * Renders color-coded structure blocks and plain formula
   * @param {Object} detail - GrammarDetailItem
   * @param {'vi'|'ja'|'en'} [locale] - Active locale
   * @param {Object} [roleColorMap] - Role to color map output
   * @returns {string} HTML string
   */
  function renderStructureFormula(detail, locale, roleColorMap) {
    if (!detail) return '';
    const loc = locale || (typeof state !== 'undefined' && state.uiLang) || 'vi';
    const roleColors = roleColorMap || {};

    // Populate role to color mapping
    const blocks = Array.isArray(detail.structure_blocks) ? detail.structure_blocks : [];
    blocks.forEach(b => {
      if (b.role && b.color) {
        roleColors[b.role] = b.color;
      }
    });

    const plainText = getLocalizedText(detail.formula_plain, loc);

    const blocksPillsHtml = blocks.map(b => {
      const label = getLocalizedText(b.label, loc);
      const color = b.color || '#3B82F6';
      return `
        <span class="structure-block-pill" style="border-color:${color}; color:${color}; background:${color}12;">
          <span class="structure-block-dot" style="background:${color};"></span>
          <span>${escapeHtml(label)}</span>
        </span>
      `;
    }).join('');

    return `
      <div class="grammar-formula-card">
        <div class="formula-card-header">
          <span class="formula-badge-label"> ${loc === 'ja' ? '構文公式' : (loc === 'en' ? 'Sentence Formula' : 'Công thức cấu trúc')}</span>
        </div>
        <div class="formula-code-row">${escapeHtml(detail.formula || '')}</div>
        ${plainText ? `<div class="formula-plain-text"> <b>${escapeHtml(plainText)}</b></div>` : ''}
        ${blocks.length ? `<div class="structure-blocks-bar">${blocksPillsHtml}</div>` : ''}
      </div>
    `;
  }

  // --- Component 2: TokenizedSentence ---
  /**
   * Renders a tokenized sentence with color mapping, pinyin, and locale-specific annotations
   * @param {Object} example - GrammarExample
   * @param {Array} structureBlocks - StructureBlock[]
   * @param {'vi'|'ja'|'en'} [locale] - Active locale
   * @returns {string} HTML string
   */
  function renderTokenizedSentence(example, structureBlocks, locale) {
    if (!example || !Array.isArray(example.tokens)) return '';
    const loc = locale || (typeof state !== 'undefined' && state.uiLang) || 'vi';

    // Build role color map
    const roleColorMap = {};
    (structureBlocks || []).forEach(b => {
      if (b.role && b.color) roleColorMap[b.role] = b.color;
    });

    const tokensHtml = example.tokens.map(token => {
      const blockColor = roleColorMap[token.block_role] || 'var(--border-color)';
      const gloss = getLocalizedText(token.gloss, loc);

      let subHtml = '';
      if (loc === 'vi') {
        const hv = token.han_viet && token.han_viet !== '—' ? `[${token.han_viet}] ` : '';
        subHtml = `<div class="token-sub token-hanviet" title="Âm Hán-Việt">${escapeHtml(hv)}</div>`;
      } else if (loc === 'ja') {
        const kanji = token.ja_kanji ? `${token.ja_kanji}` : '';
        subHtml = `<div class="token-sub token-kanji" title="漢字">${escapeHtml(kanji)}</div>`;
      } else if (loc === 'en') {
        const lit = token.literal_en || (token.gloss && token.gloss.en) || '';
        subHtml = `<div class="token-sub token-literal-en" title="English literal / gloss">${escapeHtml(lit)}</div>`;
      }

      let falseFriendHtml = '';
      if (loc === 'ja' && token.false_friend_ja) {
        const ff = token.false_friend_ja;
        falseFriendHtml = `
          <div class="token-false-friend" onclick="showFalseFriendModal('${escapeQuotes(token.hanzi)}', '${escapeQuotes(ff.zh_meaning)}', '${escapeQuotes(ff.ja_meaning)}')" title="Nhấn để xem khác biệt nghĩa">
            <span>⚠️</span> <span>同形異義</span>
          </div>
        `;
      }

      return `
        <div class="token-cell" style="--token-color: ${blockColor}">
          <div class="token-pinyin">${escapeHtml(token.pinyin || '')}</div>
          <div class="token-hanzi" onclick="speakGrammarText('${escapeQuotes(token.hanzi)}')" title="${loc === 'ja' ? '発音を聞く' : (loc === 'en' ? 'Click to pronounce' : 'Bấm để nghe phát âm')}">${escapeHtml(token.hanzi || '')}</div>
          ${subHtml}
          ${gloss ? `<div class="token-gloss">${escapeHtml(gloss)}</div>` : ''}
          ${falseFriendHtml}
        </div>
      `;
    }).join('');

    const scenarioText = getLocalizedText(example.scenario, loc);
    const translationText = getLocalizedText(example.translations, loc);
    const toneTip = getLocalizedText(example.tone_tip, loc);
    const wordOrderDiff = getLocalizedText(example.word_order_diff, loc);
    const note = getLocalizedText(example.note, loc);

    return `
      <div class="example-sentence-card">
        <div class="example-sentence-header">
          <span class="example-scenario-tag">${escapeHtml(scenarioText || (loc === 'ja' ? '用例' : (loc === 'en' ? 'Example' : 'Ví dụ')))}</span>
          <button class="example-audio-button" onclick="speakGrammarText('${escapeQuotes(example.zh)}')">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            <span>${loc === 'ja' ? '再生' : (loc === 'en' ? 'Listen' : 'Phát âm')}</span>
          </button>
        </div>

        <div class="tokens-container">${tokensHtml}</div>

        ${loc === 'en' && example.literal_en ? `
          <div class="sentence-literal-en"><b>Literal translation:</b> ${escapeHtml(example.literal_en)}</div>
        ` : ''}

        <div class="sentence-translation-text">“${escapeHtml(translationText)}”</div>

        ${(toneTip || wordOrderDiff || note) ? `
          <div class="sentence-tips-row">
            ${toneTip ? `<div> <b>${loc === 'ja' ? '声調のヒント' : (loc === 'en' ? 'Tone tip' : 'Mẹo thanh điệu')}:</b> ${escapeHtml(toneTip)}</div>` : ''}
            ${wordOrderDiff ? `<div> <b>${loc === 'ja' ? '語順の比較' : (loc === 'en' ? 'Word order diff' : 'Khác biệt trật tự từ')}:</b> ${escapeHtml(wordOrderDiff)}</div>` : ''}
            ${note ? `<div> <b>${loc === 'ja' ? '注記' : (loc === 'en' ? 'Note' : 'Lưu ý')}:</b> ${escapeHtml(note)}</div>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  // --- Component 3: PracticeModule State & Scoring ---
  // In-memory interactive state for active exercises
  const practiceRuntimeState = {
    grammarId: null,
    puzzles: {}, // index -> { placed: [], completed: boolean, isCorrect: boolean }
    fillBlank: {}, // index -> { selectedIndex: number, isCorrect: boolean }
    errorCorrection: {}, // index -> { revealed: boolean, showHint: boolean }
    quiz: {}, // index -> { selectedIndex: number, isCorrect: boolean }
  };

  function initPracticeState(detail) {
    if (!detail) return;
    practiceRuntimeState.grammarId = detail.id;
    practiceRuntimeState.puzzles = {};
    (detail.puzzles || []).forEach((p, idx) => {
      practiceRuntimeState.puzzles[idx] = {
        placed: [],
        available: [...p.scrambled_tokens],
        completed: false,
        isCorrect: false
      };
    });
    practiceRuntimeState.fillBlank = {};
    practiceRuntimeState.errorCorrection = {};
    practiceRuntimeState.quiz = {};
  }

  /**
   * Renders the interactive practice module with 4 tabs
   * @param {Object} detail - GrammarDetailItem
   * @param {'vi'|'ja'|'en'} [locale] - Active locale
   * @param {string} [activeTab='puzzles'] - 'puzzles' | 'fill_blank' | 'error_correction' | 'quiz'
   * @returns {string} HTML string
   */
  function renderPracticeModule(detail, locale, activeTab) {
    if (!detail) return '';
    const loc = locale || (typeof state !== 'undefined' && state.uiLang) || 'vi';
    const tab = activeTab || grammarStore.getState().activePracticeTab || 'puzzles';

    if (practiceRuntimeState.grammarId !== detail.id) {
      initPracticeState(detail);
    }

    const savedProgress = grammarService.getPracticeResult(detail.id);

    // Calculate score
    let totalQuestions = 0;
    let correctAnswers = 0;

    (detail.puzzles || []).forEach((p, i) => {
      totalQuestions++;
      if (practiceRuntimeState.puzzles[i]?.isCorrect) correctAnswers++;
    });
    (detail.fill_blank || []).forEach((f, i) => {
      totalQuestions++;
      if (practiceRuntimeState.fillBlank[i]?.isCorrect) correctAnswers++;
    });
    (detail.quiz || []).forEach((q, i) => {
      totalQuestions++;
      if (practiceRuntimeState.quiz[i]?.isCorrect) correctAnswers++;
    });

    const percent = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    let subViewHtml = '';
    switch (tab) {
      case 'puzzles':
        subViewHtml = renderPuzzlesSubView(detail, loc);
        break;
      case 'fill_blank':
        subViewHtml = renderFillBlankSubView(detail, loc);
        break;
      case 'error_correction':
        subViewHtml = renderErrorCorrectionSubView(detail, loc);
        break;
      case 'quiz':
        subViewHtml = renderQuizSubView(detail, loc);
        break;
    }

    return `
      <div class="practice-module-card" id="practice-module-root">
        <div class="practice-header">
          <div class="practice-title-box">
            <span style="font-size:22px;">🎯</span>
            <div style="font-size:17px; font-weight:800; color:var(--text-primary);">
              ${loc === 'ja' ? '実践練習 & スコア判定' : (loc === 'en' ? 'Interactive Practice & Quiz' : 'Luyện tập thực hành & Chấm điểm')}
            </div>
          </div>
          <div class="practice-score-badge">
            🏆 ${loc === 'ja' ? '正解率' : (loc === 'en' ? 'Score' : 'Điểm')}: ${correctAnswers}/${totalQuestions} (${percent}%)
          </div>
        </div>

        <div class="practice-tabs-bar">
          <button class="practice-tab-btn ${tab === 'puzzles' ? 'active' : ''}" onclick="switchPracticeTab('puzzles')">
            🧩 ${loc === 'ja' ? '並べ替え' : (loc === 'en' ? 'Sentence Puzzle' : 'Xếp câu')} (${(detail.puzzles || []).length})
          </button>
          <button class="practice-tab-btn ${tab === 'fill_blank' ? 'active' : ''}" onclick="switchPracticeTab('fill_blank')">
            ✍️ ${loc === 'ja' ? '空欄補充' : (loc === 'en' ? 'Fill Blank' : 'Điền chỗ trống')} (${(detail.fill_blank || []).length})
          </button>
          <button class="practice-tab-btn ${tab === 'error_correction' ? 'active' : ''}" onclick="switchPracticeTab('error_correction')">
            🔍 ${loc === 'ja' ? '誤文訂正' : (loc === 'en' ? 'Error Spot' : 'Sửa lỗi sai')} (${(detail.error_correction || []).length})
          </button>
          <button class="practice-tab-btn ${tab === 'quiz' ? 'active' : ''}" onclick="switchPracticeTab('quiz')">
            🎯 ${loc === 'ja' ? 'クイズ' : (loc === 'en' ? 'Mastery Quiz' : 'Trắc nghiệm')} (${(detail.quiz || []).length})
          </button>
        </div>

        <div class="practice-subview-content">
          ${subViewHtml}
        </div>
      </div>
    `;
  }

  // --- Sub-View 1: Sentence Puzzles ---
  function renderPuzzlesSubView(detail, loc) {
    const puzzles = detail.puzzles || [];
    if (!puzzles.length) {
      return `<div style="text-align:center; padding:20px; color:var(--text-muted);">${loc === 'ja' ? '練習問題はありません' : 'Chưa có bài tập sắp xếp cho mục này.'}</div>`;
    }

    return puzzles.map((p, pIdx) => {
      const pState = practiceRuntimeState.puzzles[pIdx] || { placed: [], available: [...p.scrambled_tokens] };
      const isDone = pState.completed;
      const isRight = pState.isCorrect;

      const placedHtml = pState.placed.map((token, tIdx) => `
        <span class="puzzle-chip" onclick="handleRemovePuzzleToken(${pIdx}, ${tIdx})">${escapeHtml(token)}</span>
      `).join('');

      const availableHtml = pState.available.map((token, aIdx) => `
        <span class="puzzle-chip" onclick="handlePlacePuzzleToken(${pIdx}, ${aIdx})">${escapeHtml(token)}</span>
      `).join('');

      return `
        <div class="puzzle-item-card">
          <div style="font-size:13px; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ${loc === 'ja' ? '問題' : (loc === 'en' ? 'Puzzle' : 'Câu hỏi')} #${pIdx + 1}: ${loc === 'ja' ? '単語をタップして正しい文を完成させてください' : (loc === 'en' ? 'Tap tokens to arrange into the correct sentence' : 'Chạm vào từ bên dưới để ghép thành câu hoàn chỉnh')}
          </div>

          <div class="puzzle-dropzone ${isDone ? (isRight ? 'correct' : 'wrong') : ''}">
            ${placedHtml.length ? placedHtml : `<span style="font-size:13px; color:var(--text-muted);">${loc === 'ja' ? 'ここをタップして単語を配置' : (loc === 'en' ? 'Selected words will appear here' : 'Các từ đã chọn sẽ hiện ở đây...')}</span>`}
          </div>

          <div class="puzzle-pool">${availableHtml}</div>

          <div class="puzzle-actions">
            <button class="btn btn-primary btn-sm" onclick="checkPuzzleAnswer(${pIdx})" ${pState.placed.length === 0 ? 'disabled' : ''}>
              ✓ ${loc === 'ja' ? '確認' : (loc === 'en' ? 'Check' : 'Kiểm tra')}
            </button>
            <button class="btn btn-secondary btn-sm" onclick="resetPuzzle(${pIdx})">
              ↺ ${loc === 'ja' ? 'リセット' : (loc === 'en' ? 'Reset' : 'Làm lại')}
            </button>
            ${isDone ? (isRight ? `
              <span style="color:#059669; font-weight:700; display:flex; align-items:center; gap:4px; font-size:14px;">
                 ${loc === 'ja' ? '正解！' : (loc === 'en' ? 'Correct!' : 'Chính xác!')}
              </span>
            ` : `
              <span style="color:#DC2626; font-weight:600; display:flex; align-items:center; gap:4px; font-size:13px;">
                ❌ ${loc === 'ja' ? '不正解です。並び直してください。' : (loc === 'en' ? 'Not quite right. Try reordering.' : 'Chưa đúng, hãy thử sắp xếp lại nhé!')}
              </span>
            `) : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Sub-View 2: Fill in the blank ---
  function renderFillBlankSubView(detail, loc) {
    const list = detail.fill_blank || [];
    if (!list.length) {
      return `<div style="text-align:center; padding:20px; color:var(--text-muted);">${loc === 'ja' ? '練習問題はありません' : 'Chưa có bài tập điền từ.'}</div>`;
    }

    return list.map((item, fIdx) => {
      const stateItem = practiceRuntimeState.fillBlank[fIdx];
      const hasAnswered = stateItem != null;

      const optionsHtml = item.options.map((opt, oIdx) => {
        let btnClass = 'fill-blank-opt-btn';
        if (hasAnswered) {
          if (oIdx === item.answer_index) {
            btnClass += ' correct';
          } else if (oIdx === stateItem.selectedIndex) {
            btnClass += ' incorrect';
          }
        }
        return `
          <button class="${btnClass}" onclick="handleSelectFillBlank(${fIdx}, ${oIdx})" ${hasAnswered ? 'disabled' : ''}>
            ${String.fromCharCode(65 + oIdx)}. ${escapeHtml(opt)}
          </button>
        `;
      }).join('');

      const expText = getLocalizedText(item.explanation, loc);

      return `
        <div class="fill-blank-card">
          <div style="font-size:13px; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ${loc === 'ja' ? '空欄補充' : (loc === 'en' ? 'Question' : 'Câu hỏi')} #${fIdx + 1}
          </div>
          <div class="fill-blank-sentence">${escapeHtml(item.sentence)}</div>
          <div class="fill-blank-options-grid">${optionsHtml}</div>

          ${hasAnswered ? `
            <div class="explanation-box">
              <div style="font-weight:700; color:${stateItem.isCorrect ? '#059669' : '#DC2626'}; margin-bottom:4px;">
                ${stateItem.isCorrect ? '✅ ' + (loc === 'ja' ? '正解！' : (loc === 'en' ? 'Correct!' : 'Chính xác!')) : '❌ ' + (loc === 'ja' ? '不正解' : (loc === 'en' ? 'Incorrect' : 'Chưa chính xác'))}
              </div>
              <div>${escapeHtml(expText)}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // --- Sub-View 3: Error Correction ---
  function renderErrorCorrectionSubView(detail, loc) {
    const list = detail.error_correction || [];
    if (!list.length) {
      return `<div style="text-align:center; padding:20px; color:var(--text-muted);">${loc === 'ja' ? '練習問題はありません' : 'Chưa có bài tập sửa lỗi sai.'}</div>`;
    }

    return list.map((item, eIdx) => {
      const eState = practiceRuntimeState.errorCorrection[eIdx] || { revealed: false, showHint: false };
      const hintText = getLocalizedText(item.hint, loc);

      return `
        <div class="error-corr-card">
          <div style="font-size:13px; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ${loc === 'ja' ? '誤文訂正' : (loc === 'en' ? 'Error Item' : 'Câu chứa lỗi')} #${eIdx + 1}: ${loc === 'ja' ? 'どこが間違っているか考えてみましょう' : (loc === 'en' ? 'Identify and correct the grammar mistake' : 'Hãy tìm lỗi ngữ pháp và sửa lại cho đúng')}
          </div>
          <div class="error-wrong-line">❌ ${escapeHtml(item.wrong)}</div>

          ${eState.revealed ? `
            <div class="error-correct-line">✅ ${escapeHtml(item.correct)}</div>
          ` : ''}

          ${eState.showHint ? `
            <div class="explanation-box" style="margin-bottom:10px;">
               <b>${loc === 'ja' ? 'ヒント' : (loc === 'en' ? 'Hint' : 'Gợi ý')}:</b> ${escapeHtml(hintText)}
            </div>
          ` : ''}

          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" onclick="toggleErrorCorrectionHint(${eIdx})">
               ${eState.showHint ? (loc === 'ja' ? 'ヒントを隠す' : 'Ẩn gợi ý') : (loc === 'ja' ? 'ヒントを見る' : 'Xem gợi ý')}
            </button>
            <button class="btn btn-primary btn-sm" onclick="revealErrorCorrection(${eIdx})">
               ${eState.revealed ? (loc === 'ja' ? '正解を表示中' : 'Đã hiển thị đáp án') : (loc === 'ja' ? '正解を見る' : 'Xem đáp án')}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Sub-View 4: Quiz ---
  function renderQuizSubView(detail, loc) {
    const list = detail.quiz || [];
    if (!list.length) {
      return `<div style="text-align:center; padding:20px; color:var(--text-muted);">${loc === 'ja' ? 'クイズはありません' : 'Chưa có câu hỏi trắc nghiệm.'}</div>`;
    }

    return list.map((item, qIdx) => {
      const qState = practiceRuntimeState.quiz[qIdx];
      const hasAnswered = qState != null;
      const questionText = getLocalizedText(item.question, loc);
      const expText = getLocalizedText(item.explanation, loc);

      const optionsHtml = item.options.map((opt, oIdx) => {
        let optClass = 'quiz-opt-btn';
        if (hasAnswered) {
          if (oIdx === item.answer_index) {
            optClass += ' selected-correct';
          } else if (oIdx === qState.selectedIndex) {
            optClass += ' selected-wrong';
          }
        }
        return `
          <button class="${optClass}" onclick="handleSelectQuiz(${qIdx}, ${oIdx})" ${hasAnswered ? 'disabled' : ''}>
            ${String.fromCharCode(65 + oIdx)}. ${escapeHtml(opt)}
          </button>
        `;
      }).join('');

      return `
        <div class="quiz-item-card">
          <div class="quiz-question-title">${qIdx + 1}. ${escapeHtml(questionText)}</div>
          <div class="quiz-options-list">${optionsHtml}</div>

          ${hasAnswered ? `
            <div class="explanation-box">
              <div style="font-weight:700; color:${qState.isCorrect ? '#059669' : '#DC2626'}; margin-bottom:4px;">
                ${qState.isCorrect ? ' ' + (loc === 'ja' ? '正解！素晴らしい！' : (loc === 'en' ? 'Correct!' : 'Chính xác!')) : '❌ ' + (loc === 'ja' ? '不正解' : (loc === 'en' ? 'Incorrect' : 'Chưa chính xác'))}
              </div>
              <div>${escapeHtml(expText)}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // --- Interactive Event Handlers ---
  window.handlePlacePuzzleToken = function (pIdx, aIdx) {
    const pState = practiceRuntimeState.puzzles[pIdx];
    if (!pState) return;
    const token = pState.available.splice(aIdx, 1)[0];
    if (token) {
      pState.placed.push(token);
      pState.completed = false;
      renderActiveGrammarDetail();
    }
  };

  window.handleRemovePuzzleToken = function (pIdx, tIdx) {
    const pState = practiceRuntimeState.puzzles[pIdx];
    if (!pState) return;
    const token = pState.placed.splice(tIdx, 1)[0];
    if (token) {
      pState.available.push(token);
      pState.completed = false;
      renderActiveGrammarDetail();
    }
  };

  window.checkPuzzleAnswer = function (pIdx) {
    const detail = grammarService.getSampleById(practiceRuntimeState.grammarId);
    if (!detail || !detail.puzzles || !detail.puzzles[pIdx]) return;
    const targetOrder = detail.puzzles[pIdx].correct_order || [];
    const pState = practiceRuntimeState.puzzles[pIdx];

    const isMatch = pState.placed.length === targetOrder.length &&
      pState.placed.every((tok, i) => tok === targetOrder[i]);

    pState.completed = true;
    pState.isCorrect = isMatch;

    checkAndSaveProgress(detail);
    renderActiveGrammarDetail();
  };

  window.resetPuzzle = function (pIdx) {
    const detail = grammarService.getSampleById(practiceRuntimeState.grammarId);
    if (!detail || !detail.puzzles || !detail.puzzles[pIdx]) return;
    const orig = detail.puzzles[pIdx].scrambled_tokens || [];
    practiceRuntimeState.puzzles[pIdx] = {
      placed: [],
      available: [...orig],
      completed: false,
      isCorrect: false
    };
    renderActiveGrammarDetail();
  };

  window.handleSelectFillBlank = function (fIdx, oIdx) {
    const detail = grammarService.getSampleById(practiceRuntimeState.grammarId);
    if (!detail || !detail.fill_blank || !detail.fill_blank[fIdx]) return;
    const item = detail.fill_blank[fIdx];

    practiceRuntimeState.fillBlank[fIdx] = {
      selectedIndex: oIdx,
      isCorrect: oIdx === item.answer_index
    };

    checkAndSaveProgress(detail);
    renderActiveGrammarDetail();
  };

  window.toggleErrorCorrectionHint = function (eIdx) {
    if (!practiceRuntimeState.errorCorrection[eIdx]) {
      practiceRuntimeState.errorCorrection[eIdx] = { revealed: false, showHint: false };
    }
    practiceRuntimeState.errorCorrection[eIdx].showHint = !practiceRuntimeState.errorCorrection[eIdx].showHint;
    renderActiveGrammarDetail();
  };

  window.revealErrorCorrection = function (eIdx) {
    if (!practiceRuntimeState.errorCorrection[eIdx]) {
      practiceRuntimeState.errorCorrection[eIdx] = { revealed: false, showHint: false };
    }
    practiceRuntimeState.errorCorrection[eIdx].revealed = true;
    renderActiveGrammarDetail();
  };

  window.handleSelectQuiz = function (qIdx, oIdx) {
    const detail = grammarService.getSampleById(practiceRuntimeState.grammarId);
    if (!detail || !detail.quiz || !detail.quiz[qIdx]) return;
    const item = detail.quiz[qIdx];

    practiceRuntimeState.quiz[qIdx] = {
      selectedIndex: oIdx,
      isCorrect: oIdx === item.answer_index
    };

    checkAndSaveProgress(detail);
    renderActiveGrammarDetail();
  };

  window.switchPracticeTab = function (tab) {
    grammarStore.setState({ activePracticeTab: tab });
    renderActiveGrammarDetail();
  };

  function checkAndSaveProgress(detail) {
    let total = (detail.puzzles || []).length + (detail.fill_blank || []).length + (detail.quiz || []).length;
    let correct = 0;
    (detail.puzzles || []).forEach((_, i) => { if (practiceRuntimeState.puzzles[i]?.isCorrect) correct++; });
    (detail.fill_blank || []).forEach((_, i) => { if (practiceRuntimeState.fillBlank[i]?.isCorrect) correct++; });
    (detail.quiz || []).forEach((_, i) => { if (practiceRuntimeState.quiz[i]?.isCorrect) correct++; });

    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    grammarService.savePracticeResult(detail.id, {
      puzzlesScore: Object.values(practiceRuntimeState.puzzles).filter(p => p.isCorrect).length,
      puzzlesTotal: (detail.puzzles || []).length,
      fillBlankScore: Object.values(practiceRuntimeState.fillBlank).filter(f => f.isCorrect).length,
      fillBlankTotal: (detail.fill_blank || []).length,
      quizScore: Object.values(practiceRuntimeState.quiz).filter(q => q.isCorrect).length,
      quizTotal: (detail.quiz || []).length,
      percent: percent
    });
  }

  // --- Modal for False Friends Alert (Nhật - Trung) ---
  window.showFalseFriendModal = function (hanzi, zhMeaning, jaMeaning) {
    const loc = (typeof state !== 'undefined' && state.uiLang) || 'vi';
    let overlay = document.getElementById('grammar-false-friend-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'grammar-false-friend-overlay';
      overlay.className = 'grammar-modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="grammar-modal-box">
        <div style="font-size:28px; margin-bottom:8px; text-align:center;"></div>
        <div style="font-size:18px; font-weight:800; text-align:center; color:#DC2626; margin-bottom:12px;">
          ${loc === 'ja' ? '日中同形異義語アラート' : (loc === 'en' ? 'False Friend Warning' : 'Cảnh báo từ đồng hình khác nghĩa!')}
        </div>
        <div style="font-size:24px; font-weight:700; text-align:center; font-family:var(--font-hanzi); margin-bottom:16px;">
          「${escapeHtml(hanzi)}」
        </div>
        <div style="background:var(--bg-muted); border-radius:12px; padding:12px 16px; margin-bottom:12px;">
          <div style="font-weight:700; color:#B45309; font-size:13px; margin-bottom:4px;"> ${loc === 'ja' ? '日本語の意味' : 'Nghĩa trong tiếng Nhật'}:</div>
          <div style="font-size:14px; color:var(--text-primary);">${escapeHtml(jaMeaning)}</div>
        </div>
        <div style="background:rgba(16, 185, 129, 0.08); border-radius:12px; padding:12px 16px; margin-bottom:16px;">
          <div style="font-weight:700; color:#059669; font-size:13px; margin-bottom:4px;"> ${loc === 'ja' ? '中国語の意味' : 'Nghĩa trong tiếng Trung'}:</div>
          <div style="font-size:14px; color:var(--text-primary); font-weight:600;">${escapeHtml(zhMeaning)}</div>
        </div>
        <button class="btn btn-primary" style="width:100%;" onclick="closeFalseFriendModal()">
          ${loc === 'ja' ? '閉じる' : (loc === 'en' ? 'Understood' : 'Đã hiểu')}
        </button>
      </div>
    `;
    overlay.style.display = 'flex';
  };

  window.closeFalseFriendModal = function () {
    const overlay = document.getElementById('grammar-false-friend-overlay');
    if (overlay) overlay.style.display = 'none';
  };

  window.speakGrammarText = function (text) {
    if (typeof speakText === 'function') {
      speakText(text);
    }
  };

  // --- Grammar Catalog Cards HTML Builder ---
  function buildGrammarCatalogCardsHtml(currentLoc) {
    const activeState = grammarStore.getState();
    const list = grammarService.getJoinedGrammarList({
      level: activeState.level,
      standard: activeState.standard,
      category: activeState.category,
      query: activeState.query,
      hasDetailOnly: activeState.hasDetailOnly
    });

    if (!list.length) {
      return `
        <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">
           ${currentLoc === 'ja' ? '条件に一致する文法が見つかりませんでした' : (currentLoc === 'en' ? 'No matching grammar points found.' : 'Không tìm thấy điểm ngữ pháp nào phù hợp.')}
        </div>
      `;
    }

    return list.map(item => {
      const titleLocal = currentLoc === 'ja' ? item.ja_name : (currentLoc === 'en' ? item.en_name : item.vi_name);
      const levelClass = 'grammar-level-' + item.level.toLowerCase().replace(/[^a-z0-9]/g, '');
      const catLabel = (typeof grammarService !== 'undefined' && grammarService.getCategoryName)
        ? grammarService.getCategoryName(item.category, currentLoc)
        : (item.category || '');

      return `
        <div class="grammar-card" onclick="openGrammarDetail('${escapeQuotes(item.id)}')">
          <div>
            <div class="grammar-card-top">
              <span class="grammar-level-pill ${levelClass}">${escapeHtml(item.level)}</span>
              <div class="grammar-standards-tags">
                ${(item.standard || []).map(s => `<span class="grammar-standard-tag">${escapeHtml(s)}</span>`).join('')}
              </div>
            </div>
            <div class="grammar-card-zh">${escapeHtml(item.zh_name)}</div>
            <div class="grammar-card-name">${escapeHtml(titleLocal || item.vi_name)}</div>
          </div>
          <div class="grammar-card-bottom">
            <span class="grammar-category-badge">${escapeHtml(catLabel)}</span>
            ${item.hasDetail ? `
              <span class="grammar-detail-badge"> ${currentLoc === 'ja' ? '詳細・練習' : (currentLoc === 'en' ? 'Practice' : 'Chi tiết & Luyện tập')}</span>
            ` : `
              <span style="font-size:11px; color:var(--text-muted);">${currentLoc === 'ja' ? '概要' : 'Mục lục'}</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Full Grammar View Renderer ---
  function renderGrammarView() {
    const container = document.getElementById('view-grammar');
    if (!container) return;

    const gState = grammarStore.getState();
    const loc = (typeof state !== 'undefined' && state.uiLang) || 'vi';

    if (gState.viewMode === 'detail' && gState.selectedId) {
      renderActiveGrammarDetail();
      return;
    }

    // Render Catalog Explorer
    const categories = grammarService.getGrammarCategories(loc);
    const levels = grammarService.getGrammarLevels();

    const levelPillsHtml = `
      <div class="grammar-filter-chip ${gState.level === 'all' ? 'active' : ''}" onclick="setGrammarFilterLevel('all')">
        ${loc === 'ja' ? 'すべて' : (loc === 'en' ? 'All' : 'Tất cả')}
      </div>
      ${levels.map(l => `
        <div class="grammar-filter-chip ${gState.level === l.level ? 'active' : ''}" onclick="setGrammarFilterLevel('${l.level}')">
          ${l.level} (${l.count})
        </div>
      `).join('')}
    `;

    const standardHtml = `
      <div class="grammar-filter-chip ${gState.standard === 'all' ? 'active' : ''}" onclick="setGrammarFilterStandard('all')">
        ${loc === 'ja' ? '新旧両方' : (loc === 'en' ? 'All standards' : 'Chuẩn 2.0 & 3.0')}
      </div>
      <div class="grammar-filter-chip ${gState.standard === 'HSK 3.0' ? 'active' : ''}" onclick="setGrammarFilterStandard('HSK 3.0')">
        HSK 3.0
      </div>
      <div class="grammar-filter-chip ${gState.standard === 'HSK 2.0' ? 'active' : ''}" onclick="setGrammarFilterStandard('HSK 2.0')">
        HSK 2.0
      </div>
    `;

    const categoryOptionsHtml = `
      <option value="all">${loc === 'ja' ? 'すべてのカテゴリー' : (loc === 'en' ? 'All Categories' : 'Tất cả phân loại')}</option>
      ${categories.map(c => `
        <option value="${c.id}" ${gState.category === c.id ? 'selected' : ''}>${escapeHtml(c.name)} (${c.count})</option>
      `).join('')}
    `;

    const cardsHtml = buildGrammarCatalogCardsHtml(loc);

    container.innerHTML = `
      <div class="grammar-container">
        <div class="grammar-header">
          <div class="grammar-header-badge">
            <img src="assets/icons/extras/graduation-cap.png" width="18" height="18" alt="Grammar" style="object-fit:contain; vertical-align:middle; margin-right:4px;">
            <span>HSK 2.0 & 3.0 Grammar Mastery</span>
          </div>
          <h1 class="grammar-title">${loc === 'ja' ? 'HSK文法マスター' : (loc === 'en' ? 'HSK Grammar Guide' : 'Ngữ pháp tiếng Trung HSK')}</h1>
          <p class="grammar-subtitle">
            ${loc === 'ja' ? 'HSK 1〜9級の必須文法を体系的に学習。直感的な構造ブロック、日中同形異義語のアラート、実践的な練習問題を提供。' : (loc === 'en' ? 'Master essential Chinese grammar from HSK 1 to 9 with visual formulas, comparative notes, and interactive quizzes.' : 'Hệ thống ngữ pháp HSK chuẩn 2.0 & 3.0 với công thức màu sắc trực quan, cảnh báo bẫy ngữ pháp và bài tập chấm điểm.')}
          </p>
        </div>

        <div class="grammar-controls">
          <!-- Row 1: Large & Prominent Search Bar -->
          <form class="grammar-search-row" action="javascript:void(0)" onsubmit="handleGrammarSearchSubmit(event)" role="search">
            <div class="grammar-search-input-box">
              <button type="submit" class="grammar-search-icon-btn" title="${loc === 'ja' ? '検索' : (loc === 'en' ? 'Search' : 'Tìm kiếm')}" aria-label="${loc === 'ja' ? '検索' : (loc === 'en' ? 'Search' : 'Tìm kiếm')}">
                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2m1.7-4.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"/></svg>
              </button>
              <input type="search" id="grammar-search-input" class="grammar-search-input" 
                placeholder="${loc === 'ja' ? '文法名、ピンイン、キーワードで検索...' : (loc === 'en' ? 'Search grammar by name, pinyin, formula...' : 'Tìm kiếm ngữ pháp, pinyin, cấu trúc...')}" 
                value="${escapeHtml(gState.query)}" 
                oninput="handleGrammarSearchInput(event)" 
                oncompositionend="handleGrammarSearchCompositionEnd(event)"
                onkeydown="handleGrammarSearchKeydown(event)"
                autocomplete="off" 
                autocorrect="off" 
                autocapitalize="off" 
                spellcheck="false" 
                enterkeyhint="search">
              <button type="button" id="grammar-search-clear-btn" class="grammar-search-clear-btn" style="display:${gState.query ? 'flex' : 'none'};" onclick="clearGrammarSearch()" title="${loc === 'ja' ? 'クリア' : (loc === 'en' ? 'Clear' : 'Xóa')}">✕</button>
            </div>
          </form>

          <!-- Row 2: Category Filter Row (Placed Below Search Bar) -->
          <div class="grammar-filters-row grammar-category-row">
            <span class="grammar-filter-label"> ${loc === 'ja' ? 'カテゴリー' : (loc === 'en' ? 'Category' : 'Phân loại')}:</span>
            <select class="grammar-select" id="grammar-category-select" onchange="setGrammarFilterCategory(this.value)">
              ${categoryOptionsHtml}
            </select>
          </div>

          <!-- Row 3: Level Filter -->
          <div class="grammar-filters-row">
            <span class="grammar-filter-label"> ${loc === 'ja' ? 'レベル' : (loc === 'en' ? 'Level' : 'Cấp độ')}:</span>
            <div class="grammar-chip-group">${levelPillsHtml}</div>
          </div>

          <!-- Row 4: Standard Filter -->
          <div class="grammar-filters-row">
            <span class="grammar-filter-label"> ${loc === 'ja' ? '基準' : (loc === 'en' ? 'Standard' : 'Chuẩn')}:</span>
            <div class="grammar-chip-group">${standardHtml}</div>
          </div>
        </div>

        <div class="grammar-catalog-grid">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  function renderActiveGrammarDetail() {
    const container = document.getElementById('view-grammar');
    if (!container) return;

    const gState = grammarStore.getState();
    const detail = grammarService.getSampleById(gState.selectedId);
    const loc = (typeof state !== 'undefined' && state.uiLang) || 'vi';

    if (!detail) {
      // If no detail, return to catalog
      grammarStore.clearSelection();
      renderGrammarView();
      return;
    }

    const roleColorMap = {};
    const formulaHtml = renderStructureFormula(detail, loc, roleColorMap);
    const localData = (detail.localizations && detail.localizations[loc]) || detail.localizations?.vi || {};

    const examplesHtml = (detail.examples || []).map(ex => {
      return renderTokenizedSentence(ex, detail.structure_blocks, loc);
    }).join('');

    const practiceHtml = renderPracticeModule(detail, loc, gState.activePracticeTab);

    // Dialogue section
    let dialogueHtml = '';
    if (detail.dialogue && Array.isArray(detail.dialogue.lines)) {
      const dGoal = getLocalizedText(detail.dialogue.goal, loc);
      const linesHtml = detail.dialogue.lines.map(line => `
        <div style="display:flex; gap:10px; margin-bottom:8px; align-items:flex-start;">
          <span style="font-weight:700; color:var(--accent); min-width:24px;">${escapeHtml(line.speaker)}:</span>
          <div>
            <div style="font-size:16px; font-weight:700; font-family:var(--font-hanzi); color:var(--text-primary); cursor:pointer;" onclick="speakGrammarText('${escapeQuotes(line.zh)}')">
              ${escapeHtml(line.zh)} 
            </div>
            <div style="font-size:12px; color:var(--text-muted); font-family:var(--font-pinyin);">${escapeHtml(line.pinyin)}</div>
            <div style="font-size:13px; color:var(--text-secondary); margin-top:2px;">${escapeHtml(getLocalizedText(line.tr, loc))}</div>
          </div>
        </div>
      `).join('');

      dialogueHtml = `
        <div class="grammar-section">
          <div class="grammar-section-title"> ${loc === 'ja' ? '実践会話シーン' : (loc === 'en' ? 'Practical Dialogue' : 'Hội thoại giao tiếp thực tế')}</div>
          <div style="font-size:12.5px; color:var(--text-muted); margin-bottom:10px;"> <b>Mục tiêu:</b> ${escapeHtml(dGoal)}</div>
          <div style="background:var(--bg-muted); border-radius:12px; padding:14px;">${linesHtml}</div>
        </div>
      `;
    }

    // Collocations
    let collocationsHtml = '';
    if (Array.isArray(detail.collocations) && detail.collocations.length) {
      collocationsHtml = `
        <div class="grammar-section">
          <div class="grammar-section-title"> ${loc === 'ja' ? 'よく使われるコロケーション' : (loc === 'en' ? 'Common Collocations' : 'Cụm từ cố định thường gặp')}</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${detail.collocations.map(col => `
              <div style="background:var(--bg-muted); border:1px solid var(--border-color); border-radius:8px; padding:6px 10px; font-size:13px;">
                <b style="font-family:var(--font-hanzi); color:var(--text-primary); cursor:pointer;" onclick="speakGrammarText('${escapeQuotes(col.zh)}')">${escapeHtml(col.zh)}</b>
                <span style="font-size:11px; color:var(--text-muted); margin-left:4px;">(${escapeHtml(col.pinyin)})</span>:
                <span style="color:var(--text-secondary); margin-left:4px;">${escapeHtml(getLocalizedText(col.meaning, loc))}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Mistakes box
    let mistakesHtml = '';
    if (localData.fatal_mistake) {
      mistakesHtml = `
        <div class="grammar-section">
          <div class="grammar-section-title"> ${loc === 'ja' ? '学習者が犯しやすい致命的なミス' : (loc === 'en' ? 'Common Mistakes to Avoid' : 'Lỗi sai chí mạng cần tránh')}</div>
          <div style="background:rgba(239, 68, 68, 0.06); border:1px solid rgba(239, 68, 68, 0.25); border-radius:12px; padding:14px; margin-bottom:10px;">
            <div style="font-size:15px; font-weight:700; color:#DC2626; text-decoration:line-through; margin-bottom:4px;">❌ ${escapeHtml(localData.fatal_mistake.wrong)}</div>
            <div style="font-size:15px; font-weight:700; color:#059669; margin-bottom:6px;">✅ ${escapeHtml(localData.fatal_mistake.correct)}</div>
            <div style="font-size:13px; color:var(--text-secondary); line-height:1.45;"> <b>${loc === 'ja' ? '解説' : 'Giải thích'}:</b> ${escapeHtml(localData.fatal_mistake.explanation)}</div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="grammar-container">
        <button class="grammar-back-btn" onclick="returnToGrammarCatalog()">
          ← ${loc === 'ja' ? '文法一覧に戻る' : (loc === 'en' ? 'Back to Grammar List' : 'Quay lại danh sách ngữ pháp')}
        </button>

        <div class="grammar-detail-view">
          <div class="grammar-detail-hero">
            <div class="grammar-detail-meta" style="margin-bottom:8px;">
              <span class="grammar-level-pill grammar-level-${detail.level.toLowerCase().replace(/[^a-z0-9]/g, '')}">${escapeHtml(detail.level)}</span>
              <span class="grammar-standard-tag">${escapeHtml((typeof grammarService !== 'undefined' && grammarService.getCategoryName) ? grammarService.getCategoryName(detail.category, loc) : (detail.category || ''))}</span>
              <span class="grammar-standard-tag">★${detail.difficulty}/5</span>
            </div>
            <div class="grammar-detail-title-zh">${escapeHtml(detail.localizations?.zh?.title || detail.keywords?.[0] || detail.formula)}</div>
            <div class="grammar-detail-title-local">${escapeHtml(localData.title || '')}</div>
          </div>

          <!-- Component 1: StructureFormula -->
          ${formulaHtml}

          <!-- Quick Rule 3s -->
          ${localData.quick_rule_3s ? `
            <div class="grammar-section">
              <div class="grammar-section-title"> ${loc === 'ja' ? '3秒でわかる速習ルール' : (loc === 'en' ? '3-Second Core Rule' : 'Quy tắc vàng 3 giây')}</div>
              <div class="grammar-quick-rule-box">${escapeHtml(localData.quick_rule_3s)}</div>
            </div>
          ` : ''}

          <!-- Contrastive note -->
          ${localData.contrastive_note ? `
            <div class="grammar-section">
              <div class="grammar-section-title"> ${loc === 'ja' ? '母語との比較・注意点' : (loc === 'en' ? 'Contrastive Note' : 'Lưu ý so sánh với tiếng mẹ đẻ')}</div>
              <div class="grammar-contrastive-box">${escapeHtml(localData.contrastive_note)}</div>
            </div>
          ` : ''}

          <!-- Collocations -->
          ${collocationsHtml}

          <!-- Component 2: TokenizedSentence Examples -->
          <div class="grammar-section">
            <div class="grammar-section-title"> ${loc === 'ja' ? '詳細例文 & 構文色分け' : (loc === 'en' ? 'Detailed Examples & Color Analysis' : 'Câu ví dụ chi tiết & Ánh xạ cấu trúc')}</div>
            <div>${examplesHtml}</div>
          </div>

          <!-- Dialogue -->
          ${dialogueHtml}

          <!-- Fatal mistakes -->
          ${mistakesHtml}

          <!-- Component 3: PracticeModule -->
          ${practiceHtml}
        </div>
      </div>
    `;
  }

  // --- Global Window Helpers ---
  window.setGrammarFilterLevel = function (lvl) {
    grammarStore.setState({ level: lvl });
    renderGrammarView();
  };

  window.setGrammarFilterStandard = function (std) {
    grammarStore.setState({ standard: std });
    renderGrammarView();
  };

  window.setGrammarFilterCategory = function (cat) {
    grammarStore.setState({ category: cat });
    renderGrammarView();
  };

  let _grammarSearchTimer = null;
  let _grammarSearchRaf = null;

  function extractGrammarSearchValue(eventOrVal) {
    if (eventOrVal && eventOrVal.target) {
      return String(eventOrVal.target.value == null ? '' : eventOrVal.target.value);
    }
    if (typeof eventOrVal === 'string') return eventOrVal;
    const input = document.getElementById('grammar-search-input');
    return input ? input.value : '';
  }

  window.handleGrammarSearchInput = function (eventOrVal) {
    const val = extractGrammarSearchValue(eventOrVal);
    const clearBtn = document.getElementById('grammar-search-clear-btn');
    if (clearBtn) {
      clearBtn.style.display = val ? 'flex' : 'none';
    }

    if (_grammarSearchTimer) clearTimeout(_grammarSearchTimer);
    if (_grammarSearchRaf) {
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(_grammarSearchRaf);
      _grammarSearchRaf = null;
    }

    // Debounce 60ms to prevent layout thrashing on mobile keyboards
    _grammarSearchTimer = setTimeout(() => {
      _grammarSearchTimer = null;
      const executeUpdate = () => {
        _grammarSearchRaf = null;
        grammarStore.setState({ query: val });
        const grid = document.querySelector('.grammar-catalog-grid');
        if (grid) {
          const loc = (typeof state !== 'undefined' && state.uiLang) || 'vi';
          grid.innerHTML = buildGrammarCatalogCardsHtml(loc);
        } else {
          renderGrammarView();
        }
      };

      if (typeof requestAnimationFrame === 'function') {
        _grammarSearchRaf = requestAnimationFrame(executeUpdate);
      } else {
        executeUpdate();
      }
    }, 60);
  };

  window.handleGrammarSearchCompositionEnd = function (event) {
    const val = extractGrammarSearchValue(event);
    if (_grammarSearchTimer) { clearTimeout(_grammarSearchTimer); _grammarSearchTimer = null; }
    if (_grammarSearchRaf) {
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(_grammarSearchRaf);
      _grammarSearchRaf = null;
    }
    grammarStore.setState({ query: val });
    const clearBtn = document.getElementById('grammar-search-clear-btn');
    if (clearBtn) {
      clearBtn.style.display = val ? 'flex' : 'none';
    }
    const grid = document.querySelector('.grammar-catalog-grid');
    if (grid) {
      const loc = (typeof state !== 'undefined' && state.uiLang) || 'vi';
      grid.innerHTML = buildGrammarCatalogCardsHtml(loc);
    }
  };

  window.handleGrammarSearchSubmit = function (event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    if (_grammarSearchTimer) { clearTimeout(_grammarSearchTimer); _grammarSearchTimer = null; }
    if (_grammarSearchRaf) {
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(_grammarSearchRaf);
      _grammarSearchRaf = null;
    }
    const input = document.getElementById('grammar-search-input');
    const val = input ? input.value : '';
    grammarStore.setState({ query: val });
    const clearBtn = document.getElementById('grammar-search-clear-btn');
    if (clearBtn) {
      clearBtn.style.display = val ? 'flex' : 'none';
    }
    const grid = document.querySelector('.grammar-catalog-grid');
    if (grid) {
      const loc = (typeof state !== 'undefined' && state.uiLang) || 'vi';
      grid.innerHTML = buildGrammarCatalogCardsHtml(loc);
    } else {
      renderGrammarView();
    }
    // Dismiss mobile virtual keyboard on submit/Go
    if (input && typeof input.blur === 'function') {
      input.blur();
    }
  };

  window.handleGrammarSearchKeydown = function (event) {
    if (event && (event.key === 'Enter' || event.keyCode === 13)) {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      handleGrammarSearchSubmit(event);
    }
  };

  window.clearGrammarSearch = function () {
    if (_grammarSearchTimer) { clearTimeout(_grammarSearchTimer); _grammarSearchTimer = null; }
    if (_grammarSearchRaf) {
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(_grammarSearchRaf);
      _grammarSearchRaf = null;
    }
    grammarStore.setState({ query: '' });
    const input = document.getElementById('grammar-search-input');
    if (input) {
      input.value = '';
      input.focus();
    }
    const clearBtn = document.getElementById('grammar-search-clear-btn');
    if (clearBtn) clearBtn.style.display = 'none';
    const grid = document.querySelector('.grammar-catalog-grid');
    if (grid) {
      const loc = (typeof state !== 'undefined' && state.uiLang) || 'vi';
      grid.innerHTML = buildGrammarCatalogCardsHtml(loc);
    } else {
      renderGrammarView();
    }
  };

  window.openGrammarDetail = function (id) {
    grammarStore.selectGrammar(id);
    renderGrammarView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.returnToGrammarCatalog = function () {
    grammarStore.clearSelection();
    renderGrammarView();
  };

  window.renderGrammarView = renderGrammarView;
  window.renderStructureFormula = renderStructureFormula;
  window.renderTokenizedSentence = renderTokenizedSentence;
  window.renderPracticeModule = renderPracticeModule;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      renderStructureFormula: renderStructureFormula,
      renderTokenizedSentence: renderTokenizedSentence,
      renderPracticeModule: renderPracticeModule,
      renderGrammarView: renderGrammarView
    };
  }
})();
