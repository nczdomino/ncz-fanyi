// js/features/grammar.js - Modern, Pedagogical & Interactive Chinese Grammar Mastery Module
// Supports full tri-lingual localization (Vietnamese, English, Japanese) across all levels HSK 1 - 9
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

  function extractGrammarSearchValue(eventOrVal) {
    if (eventOrVal && eventOrVal.target) {
      return String(eventOrVal.target.value == null ? '' : eventOrVal.target.value);
    }
    if (typeof eventOrVal === 'string') return eventOrVal;
    const input = document.getElementById('grammar-search-input');
    return input ? input.value : '';
  }

  // --- Component 1: StructureFormula (Exported for Test Compatibility) ---
  function renderStructureFormula(detail, locale, roleColorMap) {
    if (!detail) return '';
    const loc = locale || getLang();
    const roleColors = roleColorMap || {};

    const blocks = Array.isArray(detail.structure_blocks) ? detail.structure_blocks : [];
    blocks.forEach(b => {
      if (b.role && b.color) {
        roleColors[b.role] = b.color;
      }
    });

    const plainText = getLocText(detail.formula_plain, loc);

    const blocksPillsHtml = blocks.map(b => {
      const label = getLocText(b.label, loc);
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
          <span class="formula-badge-label">📐 ${loc === 'ja' ? '構文公式' : (loc === 'en' ? 'Sentence Formula' : 'Công thức cấu trúc')}</span>
        </div>
        <div class="formula-code-row">${escapeHtml(detail.formula || '')}</div>
        ${plainText ? `<div class="formula-plain-text"><b>${escapeHtml(plainText)}</b></div>` : ''}
        ${blocks.length ? `<div class="structure-blocks-bar">${blocksPillsHtml}</div>` : ''}
      </div>
    `;
  }

  // --- Component 2: TokenizedSentence (Exported for Test Compatibility) ---
  function renderTokenizedSentence(example, structureBlocks, locale) {
    if (!example || !Array.isArray(example.tokens)) return '';
    const loc = locale || getLang();

    const roleColorMap = {};
    (structureBlocks || []).forEach(b => {
      if (b.role && b.color) roleColorMap[b.role] = b.color;
    });

    const tokensHtml = example.tokens.map(token => {
      const blockColor = roleColorMap[token.block_role] || 'var(--border-color)';
      const gloss = getLocText(token.gloss, loc);

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

    const scenarioText = getLocText(example.scenario, loc);
    const translationText = getLocText(example.translations, loc);

    return `
      <div class="example-sentence-card">
        <div class="example-sentence-header">
          <span class="example-scenario-tag">${escapeHtml(scenarioText || (loc === 'ja' ? '用例' : (loc === 'en' ? 'Example' : 'Ví dụ')))}</span>
          <button type="button" class="example-audio-button" onclick="speakGrammarText('${escapeQuotes(example.zh)}')">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            <span>${loc === 'ja' ? '再生' : (loc === 'en' ? 'Listen' : 'Phát âm')}</span>
          </button>
        </div>

        <div class="tokens-container">${tokensHtml}</div>

        ${loc === 'en' && example.literal_en ? `
          <div class="sentence-literal-en"><b>Literal translation:</b> ${escapeHtml(example.literal_en)}</div>
        ` : ''}

        <div class="sentence-translation-text">“${escapeHtml(translationText)}”</div>
      </div>
    `;
  }

  // --- Component 3: PracticeModule State & Interactive Engine ---
  const practiceRuntimeState = {
    grammarId: null,
    puzzles: {},
    fillBlank: {},
    errorCorrection: {},
    quiz: {}
  };

  function initPracticeState(detail) {
    if (!detail) return;
    practiceRuntimeState.grammarId = detail.id;
    practiceRuntimeState.puzzles = {};
    (detail.puzzles || []).forEach((p, idx) => {
      practiceRuntimeState.puzzles[idx] = {
        placed: [],
        available: [...(p.scrambled_tokens || [])],
        completed: false,
        isCorrect: false
      };
    });
    practiceRuntimeState.fillBlank = {};
    practiceRuntimeState.errorCorrection = {};
    practiceRuntimeState.quiz = {};
  }

  function renderPracticeModule(detail, locale, activeTab) {
    if (!detail) return '';
    const loc = locale || getLang();
    const tab = activeTab || grammarStore.getState().activePracticeTab || 'quiz';

    if (practiceRuntimeState.grammarId !== detail.id) {
      initPracticeState(detail);
    }

    let totalQuestions = 0;
    let correctAnswers = 0;

    (detail.quiz || []).forEach((q, i) => {
      totalQuestions++;
      if (practiceRuntimeState.quiz[i]?.isCorrect) correctAnswers++;
    });
    (detail.fill_blank || []).forEach((f, i) => {
      totalQuestions++;
      if (practiceRuntimeState.fillBlank[i]?.isCorrect) correctAnswers++;
    });
    (detail.puzzles || []).forEach((p, i) => {
      totalQuestions++;
      if (practiceRuntimeState.puzzles[i]?.isCorrect) correctAnswers++;
    });
    (detail.error_correction || []).forEach((e, i) => {
      totalQuestions++;
      if (practiceRuntimeState.errorCorrection[i]?.revealed) correctAnswers++;
    });

    const percent = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    let subViewHtml = '';
    switch (tab) {
      case 'quiz':
        subViewHtml = renderQuizSubView(detail, loc);
        break;
      case 'fill_blank':
        subViewHtml = renderFillBlankSubView(detail, loc);
        break;
      case 'puzzles':
        subViewHtml = renderPuzzlesSubView(detail, loc);
        break;
      case 'error_correction':
        subViewHtml = renderErrorCorrectionSubView(detail, loc);
        break;
    }

    return `
      <div class="practice-module-card" id="practice-module-root">
        <div class="practice-header">
          <div class="practice-title-box">
            <span style="font-size:24px;">🎯</span>
            <div>
              <div style="font-size:17px; font-weight:800; color:var(--text-primary);">
                ${loc === 'ja' ? '実践練習・ドリル演習' : (loc === 'en' ? 'Interactive Practice & Mastery' : 'Luyện tập thực hành & Chấm điểm')}
              </div>
              <div style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">
                ${loc === 'ja' ? '問題を解いて知識を定着させましょう' : (loc === 'en' ? 'Reinforce your grammar understanding with instant feedback' : 'Chọn đáp án và kiểm tra mức độ nắm vững cấu trúc')}
              </div>
            </div>
          </div>
          <div class="practice-score-badge">
            🏆 ${t('grammarScore')}: <b>${correctAnswers}/${totalQuestions}</b> (${percent}%)
          </div>
        </div>

        <div class="practice-tabs-bar">
          <button class="practice-tab-btn ${tab === 'quiz' ? 'active' : ''}" onclick="switchPracticeTab('quiz')">
            🎯 ${loc === 'ja' ? 'クイズ' : (loc === 'en' ? 'Mastery Quiz' : 'Trắc nghiệm')} (${(detail.quiz || []).length})
          </button>
          <button class="practice-tab-btn ${tab === 'fill_blank' ? 'active' : ''}" onclick="switchPracticeTab('fill_blank')">
            ✍️ ${loc === 'ja' ? '空欄補充' : (loc === 'en' ? 'Fill Blank' : 'Điền chỗ trống')} (${(detail.fill_blank || []).length})
          </button>
          <button class="practice-tab-btn ${tab === 'puzzles' ? 'active' : ''}" onclick="switchPracticeTab('puzzles')">
            🧩 ${loc === 'ja' ? '並べ替え' : (loc === 'en' ? 'Sentence Puzzle' : 'Xếp câu')} (${(detail.puzzles || []).length})
          </button>
          <button class="practice-tab-btn ${tab === 'error_correction' ? 'active' : ''}" onclick="switchPracticeTab('error_correction')">
            🔍 ${loc === 'ja' ? '誤文訂正' : (loc === 'en' ? 'Error Spot' : 'Sửa lỗi sai')} (${(detail.error_correction || []).length})
          </button>
        </div>

        <div class="practice-subview-content">
          ${subViewHtml}
        </div>
      </div>
    `;
  }

  // --- Sub-View 1: Quiz ---
  function renderQuizSubView(detail, loc) {
    const list = detail.quiz || [];
    if (!list.length) {
      return `<div style="text-align:center; padding:30px; color:var(--text-muted);">${t('grammarEmptyPractice')}</div>`;
    }

    return list.map((item, qIdx) => {
      const qState = practiceRuntimeState.quiz[qIdx];
      const hasAnswered = qState != null;
      const questionText = getLocText(item.question, loc);
      const expText = getLocText(item.explanation, loc);

      const optionsHtml = (item.options || []).map((opt, oIdx) => {
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
            <span class="quiz-opt-letter">${String.fromCharCode(65 + oIdx)}.</span>
            <span>${escapeHtml(opt)}</span>
          </button>
        `;
      }).join('');

      return `
        <div class="quiz-item-card">
          <div class="quiz-question-title">
            <span class="quiz-num-badge">${qIdx + 1}</span>
            <span>${escapeHtml(questionText)}</span>
          </div>
          <div class="quiz-options-list">${optionsHtml}</div>

          ${hasAnswered ? `
            <div class="explanation-box ${qState.isCorrect ? 'explanation-correct' : 'explanation-wrong'}">
              <div style="font-weight:700; margin-bottom:4px; font-size:14px;">
                ${qState.isCorrect ? '✅ ' + t('grammarCorrect') : '❌ ' + t('grammarIncorrect')}
              </div>
              <div style="font-size:13.5px; line-height:1.5;">${escapeHtml(expText)}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // --- Sub-View 2: Fill in the blank ---
  function renderFillBlankSubView(detail, loc) {
    const list = detail.fill_blank || [];
    if (!list.length) {
      return `<div style="text-align:center; padding:30px; color:var(--text-muted);">${t('grammarEmptyPractice')}</div>`;
    }

    return list.map((item, fIdx) => {
      const stateItem = practiceRuntimeState.fillBlank[fIdx];
      const hasAnswered = stateItem != null;

      const optionsHtml = (item.options || []).map((opt, oIdx) => {
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

      const expText = getLocText(item.explanation, loc);

      return `
        <div class="fill-blank-card">
          <div style="font-size:13px; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ${loc === 'ja' ? '空欄補充' : (loc === 'en' ? 'Question' : 'Câu hỏi')} #${fIdx + 1}
          </div>
          <div class="fill-blank-sentence">${escapeHtml(item.sentence)}</div>
          <div class="fill-blank-options-grid">${optionsHtml}</div>

          ${hasAnswered ? `
            <div class="explanation-box ${stateItem.isCorrect ? 'explanation-correct' : 'explanation-wrong'}">
              <div style="font-weight:700; margin-bottom:4px; font-size:14px;">
                ${stateItem.isCorrect ? '✅ ' + t('grammarCorrect') : '❌ ' + t('grammarIncorrect')}
              </div>
              <div style="font-size:13.5px; line-height:1.5;">${escapeHtml(expText)}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // --- Sub-View 3: Sentence Puzzles ---
  function renderPuzzlesSubView(detail, loc) {
    const puzzles = detail.puzzles || [];
    if (!puzzles.length) {
      return `<div style="text-align:center; padding:30px; color:var(--text-muted);">${t('grammarEmptyPractice')}</div>`;
    }

    return puzzles.map((p, pIdx) => {
      const pState = practiceRuntimeState.puzzles[pIdx] || { placed: [], available: [...(p.scrambled_tokens || [])] };
      const isDone = pState.completed;
      const isRight = pState.isCorrect;

      const placedHtml = pState.placed.map((token, tIdx) => `
        <span class="puzzle-chip placed" onclick="handleRemovePuzzleToken(${pIdx}, ${tIdx})">${escapeHtml(token)}</span>
      `).join('');

      const availableHtml = pState.available.map((token, aIdx) => `
        <span class="puzzle-chip" onclick="handlePlacePuzzleToken(${pIdx}, ${aIdx})">${escapeHtml(token)}</span>
      `).join('');

      return `
        <div class="puzzle-item-card">
          <div style="font-size:13px; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ${loc === 'ja' ? '問題' : (loc === 'en' ? 'Puzzle' : 'Câu hỏi')} #${pIdx + 1}: ${loc === 'ja' ? '単語をタップして正しい文を完成させてください' : (loc === 'en' ? 'Tap words below to arrange into the correct sentence' : 'Chạm vào từ bên dưới để ghép thành câu hoàn chỉnh')}
          </div>

          <div class="puzzle-dropzone ${isDone ? (isRight ? 'correct' : 'wrong') : ''}">
            ${placedHtml.length ? placedHtml : `<span style="font-size:13px; color:var(--text-muted);">${loc === 'ja' ? 'ここをタップして単語を配置' : (loc === 'en' ? 'Selected words will appear here' : 'Các từ đã chọn sẽ hiện ở đây...')}</span>`}
          </div>

          <div class="puzzle-pool">${availableHtml}</div>

          <div class="puzzle-actions">
            <button class="btn btn-primary btn-sm" onclick="checkPuzzleAnswer(${pIdx})" ${pState.placed.length === 0 ? 'disabled' : ''}>
              ✓ ${t('grammarCheckAnswer')}
            </button>
            <button class="btn btn-secondary btn-sm" onclick="resetPuzzle(${pIdx})">
              ↺ ${loc === 'ja' ? 'リセット' : (loc === 'en' ? 'Reset' : 'Làm lại')}
            </button>
            ${isDone ? (isRight ? `
              <span style="color:#059669; font-weight:700; display:flex; align-items:center; gap:4px; font-size:14px;">
                ✅ ${t('grammarCorrect')}
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

  // --- Sub-View 4: Error Correction ---
  function renderErrorCorrectionSubView(detail, loc) {
    const list = detail.error_correction || [];
    if (!list.length) {
      return `<div style="text-align:center; padding:30px; color:var(--text-muted);">${t('grammarEmptyPractice')}</div>`;
    }

    return list.map((item, eIdx) => {
      const eState = practiceRuntimeState.errorCorrection[eIdx] || { revealed: false, showHint: false };
      const hintText = getLocText(item.hint, loc);
      const expText = getLocText(item.explanation, loc);

      return `
        <div class="error-corr-card">
          <div style="font-size:13px; font-weight:700; color:var(--text-muted); margin-bottom:8px;">
            ${loc === 'ja' ? '誤文訂正' : (loc === 'en' ? 'Error Item' : 'Câu chứa lỗi')} #${eIdx + 1}: ${loc === 'ja' ? 'どこが間違っているか考えてみましょう' : (loc === 'en' ? 'Identify and correct the grammar mistake' : 'Hãy tìm lỗi ngữ pháp và sửa lại cho đúng')}
          </div>
          <div class="error-wrong-line">❌ ${escapeHtml(item.wrong)}</div>

          ${eState.revealed ? `
            <div class="error-correct-line">✅ ${escapeHtml(item.correct)}</div>
            ${expText ? `<div class="explanation-box" style="margin-top:8px;"><b>${t('grammarExplanation')}:</b> ${escapeHtml(expText)}</div>` : ''}
          ` : ''}

          ${eState.showHint ? `
            <div class="explanation-box" style="margin-bottom:10px;">
              💡 <b>${loc === 'ja' ? 'ヒント' : (loc === 'en' ? 'Hint' : 'Gợi ý')}:</b> ${escapeHtml(hintText)}
            </div>
          ` : ''}

          <div style="display:flex; gap:8px; margin-top:12px;">
            <button class="btn btn-secondary btn-sm" onclick="toggleErrorCorrectionHint(${eIdx})">
              🔍 ${eState.showHint ? (loc === 'ja' ? 'ヒントを隠す' : (loc === 'en' ? 'Hide Hint' : 'Ẩn gợi ý')) : (loc === 'ja' ? 'ヒントを見る' : (loc === 'en' ? 'View Hint' : 'Xem gợi ý'))}
            </button>
            <button class="btn btn-primary btn-sm" onclick="revealErrorCorrection(${eIdx})">
              👁️ ${eState.revealed ? (loc === 'ja' ? '正解を表示中' : (loc === 'en' ? 'Answer Revealed' : 'Đã hiển thị đáp án')) : (loc === 'ja' ? '正解を見る' : (loc === 'en' ? 'Show Answer' : 'Xem đáp án'))}
            </button>
          </div>
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
    const loc = getLang();
    let overlay = document.getElementById('grammar-false-friend-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'grammar-false-friend-overlay';
      overlay.className = 'grammar-modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="grammar-modal-box">
        <div style="font-size:28px; margin-bottom:8px; text-align:center;">⚠️</div>
        <div style="font-size:18px; font-weight:800; text-align:center; color:#DC2626; margin-bottom:12px;">
          ${loc === 'ja' ? '日中同形異義語アラート' : (loc === 'en' ? 'False Friend Warning' : 'Cảnh báo từ đồng hình khác nghĩa!')}
        </div>
        <div style="font-size:24px; font-weight:700; text-align:center; font-family:var(--font-hanzi); margin-bottom:16px;">
          「${escapeHtml(hanzi)}」
        </div>
        <div style="background:var(--bg-muted); border-radius:12px; padding:12px 16px; margin-bottom:12px;">
          <div style="font-weight:700; color:#B45309; font-size:13px; margin-bottom:4px;">🇯🇵 ${loc === 'ja' ? '日本語の意味' : (loc === 'en' ? 'Japanese Meaning' : 'Nghĩa trong tiếng Nhật')}:</div>
          <div style="font-size:14px; color:var(--text-primary);">${escapeHtml(jaMeaning)}</div>
        </div>
        <div style="background:rgba(16, 185, 129, 0.08); border-radius:12px; padding:12px 16px; margin-bottom:16px;">
          <div style="font-weight:700; color:#059669; font-size:13px; margin-bottom:4px;">🇨🇳 ${loc === 'ja' ? '中国語の意味' : (loc === 'en' ? 'Chinese Meaning' : 'Nghĩa trong tiếng Trung')}:</div>
          <div style="font-size:14px; color:var(--text-primary); font-weight:600;">${escapeHtml(zhMeaning)}</div>
        </div>
        <button type="button" class="btn btn-primary" style="width:100%;" onclick="closeFalseFriendModal()">
          ${loc === 'ja' ? '閉じる' : (loc === 'en' ? 'Understood' : 'Đã hiểu')}
        </button>
      </div>
    `;
    overlay.classList.add('active');
  };

  window.closeFalseFriendModal = function () {
    const overlay = document.getElementById('grammar-false-friend-overlay');
    if (overlay) overlay.classList.remove('active');
  };

  window.speakGrammarText = function (text) {
    if (typeof speakText === 'function') {
      speakText(text);
    }
  };

  // --- Grammar Catalog Cards Builder (No Category, No HSK 2.0/3.0, Tra cứu nhanh → Hiểu nghĩa) ---
  function buildGrammarCatalogCardsHtml(currentLoc) {
    const activeState = grammarStore.getState();
    const list = grammarService.getJoinedGrammarList({
      level: activeState.level,
      standard: 'all',
      category: 'all',
      query: activeState.query,
      hasDetailOnly: false
    });

    if (!list.length) {
      if (activeState.query) {
        return `
          <div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--text-muted);">
            <div style="font-size:32px; margin-bottom:8px;">🔍</div>
            <div style="font-size:15px; font-weight:600;">${t('grammarNoResults')}</div>
          </div>
        `;
      }
      return `
        <div style="grid-column:1/-1; text-align:center; padding:60px 24px; background:var(--bg-surface); border:1.5px dashed var(--border-color); border-radius:18px;">
          <div style="font-size:48px; margin-bottom:14px;">📚</div>
          <div style="font-size:18px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">
            ${currentLoc === 'ja' ? '文法データは現在空です' : (currentLoc === 'en' ? 'No Grammar Data Available' : 'Chưa có dữ liệu ngữ pháp')}
          </div>
          <div style="font-size:14px; color:var(--text-secondary); max-width:480px; margin:0 auto; line-height:1.6;">
            ${currentLoc === 'ja' ? 'すべての旧データが正常に削除されました。新しい文法システムをいつでも構築・登録できます。' : (currentLoc === 'en' ? 'All previous grammar records have been cleared cleanly. The system is ready for your new dataset.' : 'Toàn bộ dữ liệu ngữ pháp cũ đã được xoá sạch sẽ. Hệ thống đã sẵn sàng để bạn nạp bộ dữ liệu mới.')}
          </div>
        </div>
      `;
    }

    return list.map(item => {
      const detail = item.detail || {};
      const locData = (detail.localizations && detail.localizations[currentLoc]) || detail.localizations?.vi || {};
      const titleLocal = locData.title || (currentLoc === 'ja' ? item.ja_name : (currentLoc === 'en' ? item.en_name : item.vi_name));
      const levelClass = 'grammar-level-' + item.level.toLowerCase().replace(/[^a-z0-9]/g, '');
      const formulaText = detail.formula || item.formula || '';

      return `
        <div class="grammar-card" onclick="openGrammarDetail('${escapeQuotes(item.id)}')">
          <div class="grammar-card-header">
            <span class="grammar-level-pill ${levelClass}">${escapeHtml(item.level)}</span>
          </div>

          <div class="grammar-card-zh">${escapeHtml(item.zh_name)}</div>
          <div class="grammar-card-name">${escapeHtml(titleLocal || '')}</div>

          ${formulaText ? `
            <div class="grammar-card-formula">
              <code>${escapeHtml(formulaText)}</code>
            </div>
          ` : ''}

          <div class="grammar-card-actions">
            <button type="button" class="grammar-card-btn grammar-btn-detail" onclick="event.stopPropagation(); openGrammarDetail('${escapeQuotes(item.id)}')">
              <span>📖 ${t('grammarBtnDetail')}</span>
            </button>
            <button type="button" class="grammar-card-btn grammar-btn-practice" onclick="event.stopPropagation(); openGrammarPractice('${escapeQuotes(item.id)}')">
              <span>🎯 ${t('grammarBtnPractice')}</span>
            </button>
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
    const loc = getLang();

    if (gState.viewMode === 'detail' && gState.selectedId) {
      renderActiveGrammarDetail();
      return;
    }

    // Catalog Mode: Minimalist, Fast, No Category, No HSK 2.0/3.0
    const levels = grammarService.getGrammarLevels();
    const activeLevels = levels.filter(l => l.count > 0);

    const levelPillsHtml = `
      <div class="grammar-filter-chip ${gState.level === 'all' ? 'active' : ''}" onclick="setGrammarFilterLevel('all')">
        ${t('grammarAllLevels')}
      </div>
      ${activeLevels.map(l => `
        <div class="grammar-filter-chip ${gState.level === l.level ? 'active' : ''}" onclick="setGrammarFilterLevel('${l.level}')">
          ${l.level} (${l.count})
        </div>
      `).join('')}
    `;

    const cardsHtml = buildGrammarCatalogCardsHtml(loc);

    container.innerHTML = `
      <div class="grammar-container">
        <!-- Hero Header -->
        <div class="grammar-header">
          <div class="grammar-header-badge">
            <img src="assets/icons/extras/graduation-cap.png" width="16" height="16" alt="Grammar" style="object-fit:contain; vertical-align:middle; margin-right:4px;">
            <span>${t('grammarHeroBadge')}</span>
          </div>
          <h1 class="grammar-title">${t('grammarHeroTitle')}</h1>
          <p class="grammar-subtitle">${t('grammarHeroSubtitle')}</p>
        </div>

        <!-- Controls: Search and Levels (No Category Row, No Standards Row) -->
        <div class="grammar-controls">
          <form class="grammar-search-row" action="javascript:void(0)" onsubmit="handleGrammarSearchSubmit(event)" role="search">
            <div class="grammar-search-input-box">
              <button type="submit" class="grammar-search-icon-btn" title="Search" aria-label="Search">
                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2m1.7-4.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"/></svg>
              </button>
              <input type="search" id="grammar-search-input" class="grammar-search-input" 
                placeholder="${t('grammarSearchPh')}" 
                value="${escapeHtml(gState.query)}" 
                oninput="handleGrammarSearchInput(event)" 
                oncompositionend="handleGrammarSearchCompositionEnd(event)"
                onkeydown="handleGrammarSearchKeydown(event)"
                autocomplete="off" 
                autocorrect="off" 
                autocapitalize="off" 
                spellcheck="false" 
                enterkeyhint="search">
              <button type="button" id="grammar-search-clear-btn" class="grammar-search-clear-btn" style="display:${gState.query ? 'flex' : 'none'};" onclick="clearGrammarSearch()" title="Clear">✕</button>
            </div>
          </form>

          <!-- Level Filter Chips -->
          <div class="grammar-filters-row">
            <div class="grammar-chip-group">${levelPillsHtml}</div>
          </div>
        </div>

        <!-- Catalog Cards Grid -->
        <div class="grammar-catalog-grid">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  // --- Detail View: Tra cứu nhanh → Hiểu nghĩa → Biết cách dùng → Xem ví dụ → Luyện tập ---
  function renderActiveGrammarDetail() {
    const container = document.getElementById('view-grammar');
    if (!container) return;

    const gState = grammarStore.getState();
    const detail = grammarService.getSampleById(gState.selectedId);
    const loc = getLang();

    if (!detail) {
      grammarStore.clearSelection();
      renderGrammarView();
      return;
    }

    const locData = (detail.localizations && detail.localizations[loc]) || detail.localizations?.vi || {};
    const titleZh = detail.localizations?.zh?.title || detail.keywords?.[0] || detail.formula;
    const titleLocal = locData.title || '';
    const formulaText = detail.formula || detail.formula_plain || '';

    // If active tab is Practice, render Practice View
    if (gState.detailTab === 'practice') {
      const practiceHtml = renderPracticeModule(detail, loc, gState.activePracticeTab);

      container.innerHTML = `
        <div class="grammar-container">
          <!-- Back and Segmented Nav -->
          <div class="grammar-detail-top-nav">
            <button type="button" class="grammar-back-btn" onclick="returnToGrammarCatalog()">
              ← ${t('grammarBackToList')}
            </button>
            <div class="grammar-detail-tabs">
              <button type="button" class="grammar-detail-tab-btn" onclick="switchGrammarDetailTab('learn')">
                📖 ${t('grammarTabTheory')}
              </button>
              <button type="button" class="grammar-detail-tab-btn active" onclick="switchGrammarDetailTab('practice')">
                🎯 ${t('grammarTabPractice')}
              </button>
            </div>
          </div>

          <!-- Hero Pattern Summary -->
          <div class="grammar-practice-hero">
            <span class="grammar-level-pill grammar-level-${detail.level.toLowerCase().replace(/[^a-z0-9]/g, '')}">${escapeHtml(detail.level)}</span>
            <span class="grammar-hero-zh">${escapeHtml(titleZh)}</span>
            <span class="grammar-hero-sub">${escapeHtml(titleLocal)}</span>
          </div>

          <!-- Practice Module -->
          ${practiceHtml}
        </div>
      `;
      return;
    }

    // Theory & Learn Mode
    const roleColorMap = {};
    const formulaBlocksHtml = renderStructureFormula(detail, loc, roleColorMap);

    // 1-3 Clean Natural Sentence Examples
    const examples = Array.isArray(detail.examples) ? detail.examples.slice(0, 3) : [];
    const examplesHtml = examples.map((ex, idx) => {
      const transText = getLocText(ex.translations, loc);
      return `
        <div class="grammar-example-item">
          <div class="grammar-example-zh">
            <span onclick="speakGrammarText('${escapeQuotes(ex.zh)}')" style="cursor:pointer;" title="${loc === 'ja' ? '発音を聞く' : (loc === 'en' ? 'Click to pronounce' : 'Bấm để nghe phát âm')}">
              ${escapeHtml(ex.zh)}
            </span>
            <button type="button" class="example-audio-button" onclick="speakGrammarText('${escapeQuotes(ex.zh)}')">
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              <span>${loc === 'ja' ? '再生' : (loc === 'en' ? 'Listen' : 'Phát âm')}</span>
            </button>
          </div>
          <div class="grammar-example-py">${escapeHtml(ex.pinyin || '')}</div>
          <div class="grammar-example-tr">“${escapeHtml(transText)}”</div>
        </div>
      `;
    }).join('');

    // Common Mistake Box
    let mistakeBoxHtml = '';
    if (locData.fatal_mistake) {
      mistakeBoxHtml = `
        <div class="grammar-section">
          <div class="grammar-sec-label">⚠️ ${t('grammarNotes')}</div>
          <div class="grammar-mistake-card">
            <div style="font-size:15px; font-weight:700; color:#DC2626; text-decoration:line-through; margin-bottom:4px;">❌ ${escapeHtml(locData.fatal_mistake.wrong)}</div>
            <div style="font-size:15px; font-weight:700; color:#059669; margin-bottom:6px;">✅ ${escapeHtml(locData.fatal_mistake.correct)}</div>
            <div style="font-size:13.5px; color:var(--text-secondary); line-height:1.5;"><b>${t('grammarExplanation')}:</b> ${escapeHtml(locData.fatal_mistake.explanation)}</div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="grammar-container">
        <!-- Back and Segmented Nav -->
        <div class="grammar-detail-top-nav">
          <button type="button" class="grammar-back-btn" onclick="returnToGrammarCatalog()">
            ← ${t('grammarBackToList')}
          </button>
          <div class="grammar-detail-tabs">
            <button type="button" class="grammar-detail-tab-btn active" onclick="switchGrammarDetailTab('learn')">
              📖 ${t('grammarTabTheory')}
            </button>
            <button type="button" class="grammar-detail-tab-btn" onclick="switchGrammarDetailTab('practice')">
              🎯 ${t('grammarTabPractice')}
            </button>
          </div>
        </div>

        <div class="grammar-learn-card">
          <!-- 1. Ngữ pháp (Grammar Pattern) & 2. Nghĩa (Meaning) -->
          <div class="grammar-learn-hero">
            <span class="grammar-level-pill grammar-level-${detail.level.toLowerCase().replace(/[^a-z0-9]/g, '')}">${escapeHtml(detail.level)}</span>
            <h1 class="grammar-learn-title-zh">${escapeHtml(titleZh)}</h1>
            <div class="grammar-learn-meaning">${escapeHtml(titleLocal)}</div>
          </div>

          <!-- 3. Cách dùng (Usage) -->
          <div class="grammar-section">
            <div class="grammar-sec-label">💡 ${t('grammarUsage')}</div>
            <div class="grammar-usage-desc">${escapeHtml(locData.quick_rule_3s || locData.usage || '')}</div>
            ${Array.isArray(locData.when_to_use) && locData.when_to_use.length ? `
              <ul class="grammar-usage-bullets">
                ${locData.when_to_use.map(u => `<li>${escapeHtml(u)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>

          <!-- 4. Công thức (Formula) -->
          <div class="grammar-section">
            <div class="grammar-sec-label">📐 ${t('grammarFormula')}</div>
            <div class="grammar-formula-highlight">
              <code>${escapeHtml(formulaText)}</code>
            </div>
            ${formulaBlocksHtml}
          </div>

          <!-- 5. Ví dụ (Key Examples) -->
          <div class="grammar-section">
            <div class="grammar-sec-label">💬 ${t('grammarExamples')}</div>
            <div class="grammar-examples-list">${examplesHtml}</div>
          </div>

          <!-- 6. Lưu ý & Lỗi sai thường gặp (Notes) -->
          ${mistakeBoxHtml}

          <!-- Bottom CTA to Practice -->
          <div style="margin-top:24px;">
            <button type="button" class="btn btn-primary grammar-cta-practice" onclick="switchGrammarDetailTab('practice')">
              🎯 ${t('grammarStartPractice')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- Exposed Global Navigation Functions ---
  window.openGrammarDetail = function (id) {
    grammarStore.selectGrammar(id, 'learn');
    renderGrammarView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.openGrammarPractice = function (id) {
    grammarStore.selectGrammar(id, 'practice');
    renderGrammarView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.returnToGrammarCatalog = function () {
    grammarStore.clearSelection();
    renderGrammarView();
  };

  window.switchGrammarDetailTab = function (tab) {
    grammarStore.setDetailTab(tab);
    renderActiveGrammarDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  window.handleGrammarSearchInput = function (eventOrVal) {
    const val = extractGrammarSearchValue(eventOrVal);
    grammarStore.setState({ query: val });
    const clearBtn = document.getElementById('grammar-search-clear-btn');
    if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';
    const grid = document.querySelector('.grammar-catalog-grid');
    if (grid) grid.innerHTML = buildGrammarCatalogCardsHtml(getLang());
  };

  window.handleGrammarSearchCompositionEnd = function (eventOrVal) {
    const val = extractGrammarSearchValue(eventOrVal);
    grammarStore.setState({ query: val });
    const clearBtn = document.getElementById('grammar-search-clear-btn');
    if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';
    const grid = document.querySelector('.grammar-catalog-grid');
    if (grid) grid.innerHTML = buildGrammarCatalogCardsHtml(getLang());
  };

  window.handleGrammarSearchKeydown = function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  };

  window.handleGrammarSearchSubmit = function (event) {
    if (event) event.preventDefault();
    const input = document.getElementById('grammar-search-input');
    if (input) {
      input.blur();
      grammarStore.setState({ query: input.value.trim() });
    }
    const grid = document.querySelector('.grammar-catalog-grid');
    if (grid) grid.innerHTML = buildGrammarCatalogCardsHtml(getLang());
  };

  window.clearGrammarSearch = function () {
    grammarStore.setState({ query: '' });
    const input = document.getElementById('grammar-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('grammar-search-clear-btn');
    if (clearBtn) clearBtn.style.display = 'none';
    const grid = document.querySelector('.grammar-catalog-grid');
    if (grid) grid.innerHTML = buildGrammarCatalogCardsHtml(getLang());
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
