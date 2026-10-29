// js/features/grammar.js - Chinese Grammar Canvas (Multi-Stage Interactive Lego & Accordion)
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
    const l = (lang === 'vi' || lang === 'en' || lang === 'ja') ? lang : getLang();

    // 1. Catalog item localized names (vi_name, en_name, ja_name)
    const nameKey = `${l}_name`;
    if (obj[nameKey] && typeof obj[nameKey] === 'string' && obj[nameKey].trim() !== '') {
      return obj[nameKey];
    }

    // 2. Direct locale key { vi: '...', en: '...', ja: '...' }
    if (obj[l] && typeof obj[l] === 'string' && obj[l].trim() !== '') {
      return obj[l];
    }

    // 3. Nested localizations { localizations: { vi: { title: '...' } } }
    if (obj.localizations && obj.localizations[l]) {
      const locObj = obj.localizations[l];
      if (typeof locObj === 'string' && locObj.trim()) return locObj;
      if (locObj.title && typeof locObj.title === 'string' && locObj.title.trim()) return locObj.title;
      if (locObj.quick_rule && typeof locObj.quick_rule === 'string') return locObj.quick_rule;
    }

    // 4. Cascade fallbacks
    if (obj.vi_name && typeof obj.vi_name === 'string' && obj.vi_name.trim() !== '') return obj.vi_name;
    if (obj.en_name && typeof obj.en_name === 'string' && obj.en_name.trim() !== '') return obj.en_name;
    if (obj.ja_name && typeof obj.ja_name === 'string' && obj.ja_name.trim() !== '') return obj.ja_name;
    if (obj.vi && typeof obj.vi === 'string' && obj.vi.trim() !== '') return obj.vi;
    if (obj.en && typeof obj.en === 'string' && obj.en.trim() !== '') return obj.en;
    if (obj.ja && typeof obj.ja === 'string' && obj.ja.trim() !== '') return obj.ja;

    // 5. Check other textual properties, strictly ignoring technical IDs
    for (const k of Object.keys(obj)) {
      if (!['id', 'stage', 'level', 'order', 'difficulty', 'icon', 'formula', 'pinyin'].includes(k)) {
        if (typeof obj[k] === 'string' && obj[k].trim() !== '') {
          return obj[k];
        }
      }
    }

    return '';
  }

  const FORMULA_ROLE_TRANSLATIONS = {
    '[Chủ ngữ]': { en: '[Subject]', ja: '[主語]', vi: '[Chủ ngữ]' },
    '[Danh từ]': { en: '[Noun]', ja: '[名詞]', vi: '[Danh từ]' },
    '[Động từ]': { en: '[Verb]', ja: '[動詞]', vi: '[Động từ]' },
    '[Hành động]': { en: '[Action / Verb]', ja: '[動作／動詞]', vi: '[Hành động]' },
    '[Tân ngữ]': { en: '[Object]', ja: '[目的語]', vi: '[Tân ngữ]' },
    '[Tính từ]': { en: '[Adjective]', ja: '[形容詞]', vi: '[Tính từ]' },
    '[Tính từ 1]': { en: '[Adj 1]', ja: '[形容詞1]', vi: '[Tính từ 1]' },
    '[Tính từ 2]': { en: '[Adj 2]', ja: '[形容詞2]', vi: '[Tính từ 2]' },
    '[Nơi chốn]': { en: '[Place]', ja: '[場所]', vi: '[Nơi chốn]' },
    '[Thời gian]': { en: '[Time]', ja: '[時間]', vi: '[Thời gian]' },
    '[Thời gian cụ thể]': { en: '[Specific Time]', ja: '[特定の日時]', vi: '[Thời gian cụ thể]' },
    '[Khoảng thời gian]': { en: '[Duration]', ja: '[期間]', vi: '[Khoảng thời gian]' },
    '[Người]': { en: '[Person]', ja: '[人]', vi: '[Người]' },
    '[Đồ vật]': { en: '[Item / Object]', ja: '[物]', vi: '[Đồ vật]' },
    '[Người / Đồ vật]': { en: '[Person / Item]', ja: '[人／物]', vi: '[Người / Đồ vật]' },
    '[Kỹ năng]': { en: '[Skill]', ja: '[スキル]', vi: '[Kỹ năng]' },
    '[Chủ sở hữu / Tính chất]': { en: '[Owner / Modifier]', ja: '[所有者／修飾語]', vi: '[Chủ sở hữu / Tính chất]' },
    '[Câu khẳng định]': { en: '[Statement]', ja: '[平叙文]', vi: '[Câu khẳng định]' },
    '[Sự vật]': { en: '[Subject / Thing]', ja: '[事物]', vi: '[Sự vật]' },
    '[Vế 1]': { en: '[Clause 1]', ja: '[節1]', vi: '[Vế 1]' },
    '[Vế 2]': { en: '[Clause 2]', ja: '[節2]', vi: '[Vế 2]' },
    '[Kết quả/Thành phần khác]': { en: '[Result / State]', ja: '[結果／その他]', vi: '[Kết quả/Thành phần khác]' },
    '[Kết quả]': { en: '[Result]', ja: '[結果]', vi: '[Kết quả]' },
    '[Tác nhân]': { en: '[Agent / Doer]', ja: '[動作主]', vi: '[Tác nhân]' },
    '[Thời gian/Địa điểm/Phương thức]': { en: '[Time / Place / Manner]', ja: '[時間／場所／方法]', vi: '[Thời gian/Địa điểm/Phương thức]' },
    '[Thời gian/Nơi chốn/Cách thức]': { en: '[Time / Place / Manner]', ja: '[時間／場所／方法]', vi: '[Thời gian/Nơi chốn/Cách thức]' }
  };

  function localizeFormula(formula, lang) {
    if (!formula || typeof formula !== 'string') return '';
    const l = (lang === 'vi' || lang === 'en' || lang === 'ja') ? lang : getLang();
    if (l === 'vi') return formula;

    let res = formula;
    for (const [bracket, trans] of Object.entries(FORMULA_ROLE_TRANSLATIONS)) {
      if (res.includes(bracket) && trans[l]) {
        res = res.split(bracket).join(trans[l]);
      }
    }
    return res;
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

  // Canvas Runtime State (Lego selection, active step, challenge, stage rail & timeline)
  const canvasState = {
    activeStep: 1, // 1: Cốt lõi, 2: Lắp ghép, 3: Bẫy hay sai, 4: Thử tài
    detailViewMode: 'stepper', // 'stepper' (Từng bước) | 'accordion' (Mở rộng toàn bộ)
    selectedLevelFilter: 'ALL', // 'ALL' | 'HSK1' | 'HSK2' | 'HSK3'
    selectedStageNum: 1, // Currently focused station on the Stage Rail (1..6)
    openStages: {}, // Collapsible stage accordions fallback
    legoSelections: {}, // { [grammarId]: [slot0Index, slot1Index, slot2Index] }
    challenge: {} // { [grammarId]: { placed: [], completed: false, isCorrect: false } }
  };

  const STAGE_META = {
    1: {
      stationName: {
        vi: "Ga 1: Sinh tồn & Giao tiếp",
        en: "Station 1: Survival Core",
        ja: "第1駅：基本サバイバル"
      },
      title: {
        vi: "Chặng 1: Sinh tồn & Giao tiếp nền tảng",
        en: "Stage 1: Survival & Core Conversation",
        ja: "ステージ1：基本サバイバル・コア会話"
      },
      tag: { vi: "HSK 1 Cơ bản", en: "HSK 1 Beginner", ja: "HSK 1 初級" },
      level: "HSK1",
      icon: "🟢",
      desc: {
        vi: "5 cấu trúc sống còn để tự giới thiệu, sở hữu, nơi chốn, hỏi đáp và cảm thán.",
        en: "5 essential patterns for self-introduction, possession, location, questions, and reactions.",
        ja: "自己紹介、所有、所在、質問、感嘆に必要な5つの最重要構文。"
      }
    },
    2: {
      stationName: {
        vi: "Ga 2: Thời gian & Trật tự từ",
        en: "Station 2: Time & Order",
        ja: "第2駅：時間詞と語順"
      },
      title: {
        vi: "Chặng 2: Trật tự thời gian & Phương thức hành động",
        en: "Stage 2: Time Order & Action Methods",
        ja: "ステージ2：時間詞の語順と動作様態"
      },
      tag: { vi: "HSK 1 Nền tảng", en: "HSK 1 Core", ja: "HSK 1 コア" },
      level: "HSK1",
      icon: "🟡",
      desc: {
        vi: "Quy tắc vàng về trật tự từ: Khi nào làm gì, cùng ai làm gì, kỹ năng học hỏi và sở hữu.",
        en: "Master golden word order rules: when, with whom, learned skills, and possession.",
        ja: "語順の黄金ルール：いつ、誰と、習得したスキル、所有の「的」の語順を完全攻略。"
      }
    },
    3: {
      stationName: {
        vi: "Ga 3: Trạng thái & So sánh",
        en: "Station 3: States & Comparison",
        ja: "第3駅：持続と実践比較"
      },
      title: {
        vi: "Chặng 3: Trạng thái & So sánh thực tế",
        en: "Stage 3: Ongoing States & Real-World Comparisons",
        ja: "ステージ3：状態の持続と実践比較"
      },
      tag: { vi: "HSK 2 Nâng cao", en: "HSK 2 Intermediate", ja: "HSK 2 中級" },
      level: "HSK2",
      icon: "🔵",
      desc: {
        vi: "Mô tả trải nghiệm từng làm (过), trạng thái duy trì (着), so sánh hơn (比), sắp xảy ra và biến chuyển.",
        en: "Express past experience (过), continuous states (着), comparisons (比), and changes over time.",
        ja: "経験（过）、状態の持続（着）、比較（比）、近未来（快要）や変化（越来越）の応用表現。"
      }
    },
    4: {
      stationName: {
        vi: "Ga 4: Bổ ngữ & Thời lượng",
        en: "Station 4: Complements & Timing",
        ja: "第4駅：補語と動作継続"
      },
      title: {
        vi: "Chặng 4: Bổ ngữ & Cấu trúc thời gian hành động",
        en: "Stage 4: Complements & Action Timing",
        ja: "ステージ4：結果・方向補語と時量構文"
      },
      tag: { vi: "HSK 2 Thực chiến", en: "HSK 2 Action", ja: "HSK 2 実践" },
      level: "HSK2",
      icon: "🟠",
      desc: {
        vi: "Bổ ngữ kết quả (完/懂/到), bổ ngữ xu hướng (来/去), nhấn mạnh (是...的) và thời lượng hành động.",
        en: "Result complements (完/懂/到), directional (来/去), emphasis (是...的), and action duration.",
        ja: "結果補語（完/懂/到）、方向補語（来/去）、強調構文（是…的）と動作の継続時間。"
      }
    },
    5: {
      stationName: {
        vi: "Ga 5: Cấu trúc 把 / 被 & Liên từ",
        en: "Station 5: 把 / 被 & Connectors",
        ja: "第5駅：把／被と接続詞"
      },
      title: {
        vi: "Chặng 5: Cấu trúc câu then chốt (把 / 被) & Liên từ logic",
        en: "Stage 5: Core Sentence Patterns (把 / 被) & Logic Connectors",
        ja: "ステージ5：最重要構文（把／被）と論理接続詞"
      },
      tag: { vi: "HSK 3 Then chốt", en: "HSK 3 Pivotal", ja: "HSK 3 最重要" },
      level: "HSK3",
      icon: "🟣",
      desc: {
        vi: "Câu chữ 把 xử lý vật, câu bị động chữ 被, vừa... vừa (又...又...), tuy... nhưng và không những... mà còn.",
        en: "Master 把 disposal, 被 passive, 又...又... dual traits, although/but, and not only/but also.",
        ja: "処置の把構文、受身の被構文、並列（又…又…）、逆接（虽然…但是…）、累加（不但…而且…）。"
      }
    },
    6: {
      stationName: {
        vi: "Ga 6: Bổ ngữ trạng thái & Phức hợp",
        en: "Station 6: Advanced & Complex",
        ja: "第6駅：様態補語と複合構文"
      },
      title: {
        vi: "Chặng 6: Biểu đạt phức hợp & Bổ ngữ trình độ/trạng thái",
        en: "Stage 6: Advanced Expressions & Degree Complements",
        ja: "ステージ6：様態補語と複合実践表現"
      },
      tag: { vi: "HSK 3 Nâng cao", en: "HSK 3 Advanced", ja: "HSK 3 応用" },
      level: "HSK3",
      icon: "🔴",
      desc: {
        vi: "Bổ ngữ trạng thái (V + 得), hành động đồng thời (一边...一边...), càng... càng (越...越...), ngoài ra (除了...以外) và hễ... là (一...就...).",
        en: "Degree complement (V + 得), simultaneous actions (一边...一边...), proportional change, besides/except, and immediate actions.",
        ja: "様態補語（V＋得）、動作の同時進行、相関表現（越…越…）、除外・付加、即時完了（一…就…）。"
      }
    }
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
        <div class="puzzle-item-card"><div class="puzzle-dropzone">Dropzone</div></div>
        <div class="fill-blank-card"><button class="fill-blank-opt-btn">A</button></div>
        <div class="error-corr-card"><div class="error-wrong-line">Wrong</div></div>
        <div class="quiz-item-card"><button class="quiz-opt-btn">Quiz Option</button></div>
      </div>
    `;
  }

  // --- Audio Pronounce Helper ---
  window.speakGrammarText = function (text) {
    if (typeof speakText === 'function') {
      speakText(text);
    }
  };

  // --- Stage Rail Navigation & Smart Level Filter ---
  window.selectStage = function (stageNum) {
    const num = Math.max(1, Math.min(6, Number(stageNum) || 1));
    canvasState.selectedStageNum = num;
    const meta = STAGE_META[num];
    if (meta && canvasState.selectedLevelFilter !== 'ALL' && meta.level !== canvasState.selectedLevelFilter) {
      canvasState.selectedLevelFilter = meta.level;
    }
    renderCanvasCatalogView();
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof document.querySelector === 'function') {
      const hero = document.querySelector('.stage-hero-panel');
      if (hero && typeof window.innerWidth === 'number' && window.innerWidth <= 768 && typeof hero.scrollIntoView === 'function') {
        hero.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  window.prevStage = function () {
    const cur = canvasState.selectedStageNum || 1;
    if (cur > 1) {
      window.selectStage(cur - 1);
    }
  };

  window.nextStage = function () {
    const cur = canvasState.selectedStageNum || 1;
    if (cur < 6) {
      window.selectStage(cur + 1);
    }
  };

  // Backwards compatibility for tests & accordion views
  window.toggleStageAccordion = function (stageNum) {
    canvasState.openStages[stageNum] = !canvasState.openStages[stageNum];
    canvasState.selectedStageNum = Number(stageNum);
    renderCanvasCatalogView();
  };

  window.expandAllStages = function (shouldExpand) {
    [1, 2, 3, 4, 5, 6].forEach(st => {
      canvasState.openStages[st] = shouldExpand;
    });
    renderCanvasCatalogView();
  };

  window.setGrammarLevelFilter = function (level) {
    canvasState.selectedLevelFilter = level;
    if (level === 'HSK1') {
      if (canvasState.selectedStageNum !== 1 && canvasState.selectedStageNum !== 2) {
        canvasState.selectedStageNum = 1;
      }
    } else if (level === 'HSK2') {
      if (canvasState.selectedStageNum !== 3 && canvasState.selectedStageNum !== 4) {
        canvasState.selectedStageNum = 3;
      }
    } else if (level === 'HSK3') {
      if (canvasState.selectedStageNum !== 5 && canvasState.selectedStageNum !== 6) {
        canvasState.selectedStageNum = 5;
      }
    }
    renderCanvasCatalogView();
  };

  // --- Detail View Mode Toggle ---
  window.setDetailViewMode = function (mode) {
    canvasState.detailViewMode = mode;
    renderActiveCanvasDetail();
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

  // --- Catalog (Roadmap) Renderer with Stage Rail & Timeline Flow ---
  function renderCanvasCatalogView() {
    const container = document.getElementById('view-grammar');
    if (!container) return;

    const loc = getLang();
    const gState = grammarStore.getState();
    const query = (gState.query || '').trim();
    const allCatalog = grammarService.getCatalogData();
    const catalog = query ? grammarService.filterGrammarCatalog(gState) : allCatalog;
    const completedList = getCompletedIds();
    const completedCount = allCatalog.filter(c => completedList.includes(c.id)).length;

    // Detect the current active stage that the learner is currently working on
    const allStageGroups = [1, 2, 3, 4, 5, 6];
    let activeStageNum = 1;
    for (const st of allStageGroups) {
      const items = allCatalog.filter(c => c.stage === st);
      const done = items.filter(it => completedList.includes(it.id)).length;
      if (done < items.length) {
        activeStageNum = st;
        break;
      }
    }

    const nextUnfinishedItem = allCatalog.find(c => !completedList.includes(c.id));

    // Maintain selected stage on the Stage Rail
    if (!canvasState.selectedStageNum) {
      canvasState.selectedStageNum = activeStageNum;
    }

    const selectedLevel = canvasState.selectedLevelFilter || 'ALL';
    const railStageGroups = allStageGroups.filter(st => {
      if (selectedLevel === 'ALL') return true;
      return STAGE_META[st]?.level === selectedLevel;
    });

    if (railStageGroups.length > 0 && !railStageGroups.includes(canvasState.selectedStageNum)) {
      canvasState.selectedStageNum = railStageGroups[0];
    }
    const selectedStageNum = canvasState.selectedStageNum;

    // --- Search Mode Handling ---
    let searchContentHtml = '';
    if (query) {
      if (catalog.length === 0) {
        searchContentHtml = `
          <div class="canvas-empty-search">
            <div class="empty-search-icon">🔍</div>
            <div class="empty-search-title">${loc === 'ja' ? '該当する文法が見つかりません' : (loc === 'en' ? 'No grammar patterns found' : 'Không tìm thấy cấu trúc phù hợp')}</div>
            <p class="empty-search-desc">${loc === 'ja' ? 'キーワードやピンインを変えて再度お試しください。' : (loc === 'en' ? 'Try searching with different keywords or pinyin.' : 'Hãy thử tìm bằng từ khóa hoặc pinyin khác nhé.')}</p>
            <button type="button" class="btn btn-primary btn-sm" onclick="clearGrammarSearch()">
              ${loc === 'ja' ? '検索をリセット' : (loc === 'en' ? 'Reset Search' : 'Xóa bộ lọc tìm kiếm')}
            </button>
          </div>
        `;
      } else {
        const searchCardsHtml = catalog.map(item => {
          const isDone = completedList.includes(item.id);
          const titleLocal = getLocText(item, loc) || item.zh_name;
          const orderNum = String(item.order || 1).padStart(2, '0');
          const pinyinText = item.pinyin || '';

          return `
            <div class="grammar-canvas-card ${isDone ? 'is-completed' : ''}" onclick="openGrammarCanvas('${escapeQuotes(item.id)}')">
              <div class="canvas-card-top">
                <span class="canvas-order-badge">${loc === 'ja' ? `第${item.stage}駅 • #${orderNum}` : (loc === 'en' ? `Stage ${item.stage} • #${orderNum}` : `Chặng ${item.stage} • #${orderNum}`)}</span>
                <span class="canvas-level-pill">${escapeHtml(item.level)}</span>
                ${isDone ? `<span class="canvas-done-badge">✅ ${loc === 'ja' ? '完了' : (loc === 'en' ? 'Done' : 'Đã học')}</span>` : ''}
              </div>

              <div class="canvas-card-zh-row">
                <span class="canvas-card-zh">${escapeHtml(item.zh_name)}</span>
                ${pinyinText ? `<span class="canvas-card-py">(${escapeHtml(pinyinText)})</span>` : ''}
              </div>
              <div class="canvas-card-title">${escapeHtml(titleLocal)}</div>

              <div class="canvas-lego-preview">
                <span class="lego-pill">${escapeHtml(localizeFormula(item.formula, loc))}</span>
              </div>

              <div class="canvas-card-footer">
                <button type="button" class="canvas-start-btn">
                  <span>${isDone ? (loc === 'ja' ? '復習する' : (loc === 'en' ? 'Review' : 'Ôn tập lại')) : (loc === 'ja' ? '学習する' : (loc === 'en' ? 'Start' : 'Khám phá ngay'))}</span>
                  <span class="canvas-btn-arrow">→</span>
                </button>
              </div>
            </div>
          `;
        }).join('');

        searchContentHtml = `
          <div class="grammar-search-results-banner">
            <div class="search-banner-text">
              <span class="search-banner-icon">🔍</span>
              <span>${loc === 'ja' ? `「${escapeHtml(query)}」の検索結果: <b>${catalog.length}</b> 件` : (loc === 'en' ? `Search results for "${escapeHtml(query)}": <b>${catalog.length}</b> patterns` : `Tìm thấy <b>${catalog.length}</b> cấu trúc phù hợp với "${escapeHtml(query)}"`)}</span>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" onclick="clearGrammarSearch()">
              ${loc === 'ja' ? '✕ 検索解除' : (loc === 'en' ? '✕ Clear' : '✕ Bỏ tìm kiếm')}
            </button>
          </div>
          <div class="grammar-canvas-grid">${searchCardsHtml}</div>
        `;
      }
    }

    // --- Normal Mode: Stage Rail & Timeline Data ---
    // 1. Stage Rail Buttons
    const railButtonsHtml = railStageGroups.map(stNum => {
      const meta = STAGE_META[stNum] || {};
      const stItems = allCatalog.filter(c => c.stage === stNum);
      const doneInSt = stItems.filter(it => completedList.includes(it.id)).length;
      const isStDone = doneInSt === stItems.length && stItems.length > 0;
      const isStActive = (stNum === activeStageNum);
      const isStSelected = (stNum === selectedStageNum);
      const stPercent = stItems.length ? Math.round((doneInSt / stItems.length) * 100) : 0;
      const stationTitle = getLocText(meta.stationName || meta.title, loc);

      let badgeContent = '';
      if (isStDone) {
        badgeContent = `<span class="rail-badge done">✓ 5/5</span>`;
      } else if (isStActive) {
        badgeContent = `<span class="rail-badge active"><span class="rail-pulse-dot"></span>${loc === 'ja' ? '学習中' : (loc === 'en' ? 'Active' : 'Đang học')}</span>`;
      } else {
        badgeContent = `<span class="rail-badge upcoming">${doneInSt}/${stItems.length}</span>`;
      }

      return `
        <button
          type="button"
          class="stage-rail-btn ${isStSelected ? 'is-selected' : ''} ${isStDone ? 'is-completed' : ''} ${isStActive ? 'is-current-learning' : ''}"
          onclick="selectStage(${stNum})"
          role="tab"
          aria-selected="${isStSelected}"
          aria-label="${escapeHtml(stationTitle)}"
        >
          <div class="rail-btn-top">
            <span class="rail-btn-icon">${meta.icon}</span>
            ${badgeContent}
          </div>
          <div class="rail-btn-name">${escapeHtml(stationTitle)}</div>
          <div class="rail-btn-sub">
            <span class="rail-btn-level">${meta.level}</span>
            <span class="rail-btn-pct">${stPercent}%</span>
          </div>
          ${isStSelected ? '<div class="rail-active-indicator"></div>' : ''}
        </button>
      `;
    }).join('');

    // 2. Active Stage Hero Data
    const curMeta = STAGE_META[selectedStageNum] || STAGE_META[1];
    const curStageItems = allCatalog.filter(c => c.stage === selectedStageNum);
    const curDone = curStageItems.filter(it => completedList.includes(it.id)).length;
    const curIsDone = curDone === curStageItems.length && curStageItems.length > 0;
    const curIsActive = (selectedStageNum === activeStageNum);
    const curPercent = curStageItems.length ? Math.round((curDone / curStageItems.length) * 100) : 0;

    let curStatusBadgeHtml = '';
    if (curIsDone) {
      curStatusBadgeHtml = `<span class="stage-status-badge is-completed">🏆 ${loc === 'ja' ? '修了' : (loc === 'en' ? 'Mastered' : 'Hoàn thành')}</span>`;
    } else if (curIsActive) {
      curStatusBadgeHtml = `<span class="stage-status-badge is-active">🎯 ${loc === 'ja' ? '学習中' : (loc === 'en' ? 'In Progress' : 'Đang học')}</span>`;
    } else {
      curStatusBadgeHtml = `<span class="stage-status-badge is-upcoming">⏳ ${loc === 'ja' ? '未着手' : (loc === 'en' ? 'Upcoming' : 'Sắp học')}</span>`;
    }

    // 3. Timeline Items for Selected Stage
    const timelineItemsHtml = curStageItems.map((item, idx) => {
      const isDone = completedList.includes(item.id);
      const isNextUp = (item.id === nextUnfinishedItem?.id);
      const titleLocal = getLocText(item, loc) || item.zh_name;
      const orderNum = String(item.order || (idx + 1)).padStart(2, '0');
      const pinyinText = item.pinyin || '';

      let nodeHtml = '';
      if (isDone) {
        nodeHtml = `<div class="timeline-node is-done" title="${loc === 'ja' ? '完了' : (loc === 'en' ? 'Completed' : 'Đã học')}">✓</div>`;
      } else if (isNextUp) {
        nodeHtml = `<div class="timeline-node is-active" title="${loc === 'ja' ? '次のレッスン' : (loc === 'en' ? 'Next Up' : 'Đang học')}"><span class="node-pulse-ring"></span>📍</div>`;
      } else {
        nodeHtml = `<div class="timeline-node is-upcoming">${orderNum}</div>`;
      }

      return `
        <div class="timeline-flow-item ${isDone ? 'is-completed' : ''} ${isNextUp ? 'is-next-up' : ''}">
          <div class="timeline-node-wrap">
            ${nodeHtml}
          </div>
          <div class="timeline-card" onclick="openGrammarCanvas('${escapeQuotes(item.id)}')">
            <div class="timeline-card-header">
              <span class="timeline-order-badge">#${orderNum}</span>
              <span class="timeline-level-badge">${escapeHtml(item.level)}</span>
              ${isDone ? `<span class="timeline-done-pill">✅ ${loc === 'ja' ? '完了' : (loc === 'en' ? 'Completed' : 'Đã học')}</span>` : (isNextUp ? `<span class="timeline-next-pill">🎯 ${loc === 'ja' ? 'おすすめ' : (loc === 'en' ? 'Next Up' : 'Học tiếp')}</span>` : '')}
            </div>

            <div class="timeline-card-body">
              <div class="timeline-card-zh-row">
                <span class="timeline-card-zh">${escapeHtml(item.zh_name)}</span>
                ${pinyinText ? `<span class="timeline-card-py">(${escapeHtml(pinyinText)})</span>` : ''}
              </div>
              <div class="timeline-card-title">${escapeHtml(titleLocal)}</div>
            </div>

            <div class="timeline-lego-strip">
              <div class="timeline-lego-pill">
                <span class="lego-icon">🧩</span>
                <span class="lego-formula">${escapeHtml(localizeFormula(item.formula, loc))}</span>
              </div>
            </div>

            <div class="timeline-card-footer">
              <button type="button" class="timeline-action-btn ${isDone ? 'is-review' : 'is-start'}">
                <span>${isDone ? (loc === 'ja' ? '復習する' : (loc === 'en' ? 'Review' : 'Ôn tập lại')) : (loc === 'ja' ? '学習スタート' : (loc === 'en' ? 'Start Lesson' : 'Khám phá ngay'))}</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
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
          <p class="grammar-subtitle">${loc === 'ja' ? 'レゴのように組み立てて学ぶ — 30秒でわかる直感的文法' : (loc === 'en' ? 'Master grammar like building Lego blocks — 30 seconds per structure, zero clutter' : 'Học theo khối Lego trực quan — 30 giây mỗi cấu trúc, phân chia chặng gọn gàng.')}</p>
        </div>

        <!-- Search Input Row -->
        <div class="grammar-search-row">
          <div class="grammar-search-input-box">
            <span class="grammar-search-icon">🔍</span>
            <input
              type="text"
              id="grammar-search-input"
              class="grammar-search-input"
              placeholder="${loc === 'ja' ? '文法・ピンイン・キーワードを検索…' : (loc === 'en' ? 'Search grammar, pinyin, meaning…' : 'Tìm cấu trúc, pinyin, tiếng Việt…')}"
              value="${escapeHtml(gState.query || '')}"
              oninput="handleGrammarSearchInput(event)"
              oncompositionend="handleGrammarSearchCompositionEnd(event)"
              onkeydown="handleGrammarSearchKeydown(event)"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            />
            ${gState.query ? `
              <button type="button" id="grammar-search-clear-btn" class="grammar-search-clear-btn" onclick="clearGrammarSearch()" title="Xóa">✕</button>
            ` : ''}
          </div>
        </div>

        <!-- Smart Continue Learning Hero Card (If uncompleted items exist) -->
        ${nextUnfinishedItem ? `
          <div class="grammar-continue-card">
            <div class="continue-card-left">
              <span class="continue-icon">🎯</span>
              <div class="continue-text-wrap">
                <div class="continue-tag">${loc === 'ja' ? '次のレッスン' : (loc === 'en' ? 'Next Up' : 'Chặng đang chinh phục')} • ${loc === 'ja' ? `第${nextUnfinishedItem.stage}駅` : (loc === 'en' ? `Stage ${nextUnfinishedItem.stage}` : `Chặng ${nextUnfinishedItem.stage}`)}</div>
                <div class="continue-title">
                  <b>${escapeHtml(nextUnfinishedItem.zh_name)}</b> ${nextUnfinishedItem.pinyin ? `<span class="continue-py">(${escapeHtml(nextUnfinishedItem.pinyin)})</span>` : ''} — ${escapeHtml(getLocText(nextUnfinishedItem, loc))}
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-primary btn-continue-jump" onclick="openGrammarCanvas('${escapeQuotes(nextUnfinishedItem.id)}')">
              <span>${loc === 'ja' ? '今すぐ学ぶ' : (loc === 'en' ? 'Continue' : 'Học tiếp ngay')}</span> →
            </button>
          </div>
        ` : `
          <div class="grammar-continue-card is-completed-all">
            <div class="continue-card-left">
              <span class="continue-icon">🏆</span>
              <div class="continue-text-wrap">
                <div class="continue-tag">${loc === 'ja' ? '達成おめでとうございます！' : (loc === 'en' ? 'All Mastered!' : 'Xuất sắc!')}</div>
                <div class="continue-title">${loc === 'ja' ? '全30文法パターンを完了しました！' : (loc === 'en' ? 'You completed all 30 grammar patterns!' : 'Bạn đã hoàn thành trọn bộ 30 cấu trúc ngữ pháp!')}</div>
              </div>
            </div>
          </div>
        `}

        <!-- Master Roadmap Progress -->
        <div class="grammar-master-bar">
          <div class="master-bar-left">
            <div class="master-progress-label">
              🏆 ${loc === 'ja' ? '全体の進捗' : (loc === 'en' ? 'Overall Mastery' : 'Tổng tiến độ toàn lộ trình')}: <b>${completedCount}/${allCatalog.length} ${loc === 'ja' ? '項目' : (loc === 'en' ? 'patterns' : 'cấu trúc')}</b> (${allCatalog.length ? Math.round((completedCount / allCatalog.length) * 100) : 0}%)
            </div>
          </div>
          <div class="master-bar-right">
            <div class="master-stage-indicator">
              ${loc === 'ja' ? `選択中: 第${selectedStageNum}駅` : (loc === 'en' ? `Viewing: Stage ${selectedStageNum}/6` : `Đang xem: Chặng ${selectedStageNum}/6`)}
            </div>
          </div>
        </div>

        <!-- Smart Level Segment Tabs -->
        <div class="grammar-level-tabs">
          <button type="button" class="level-tab-btn ${selectedLevel === 'ALL' ? 'active' : ''}" onclick="setGrammarLevelFilter('ALL')">
            🌟 ${loc === 'ja' ? 'すべて (6ステージ)' : (loc === 'en' ? 'All (6 Stages)' : 'Tất cả (6 Chặng)')}
          </button>
          <button type="button" class="level-tab-btn ${selectedLevel === 'HSK1' ? 'active' : ''}" onclick="setGrammarLevelFilter('HSK1')">
            🟢 HSK 1 (${loc === 'ja' ? '第1-2駅' : (loc === 'en' ? 'Stages 1-2' : 'Chặng 1-2')})
          </button>
          <button type="button" class="level-tab-btn ${selectedLevel === 'HSK2' ? 'active' : ''}" onclick="setGrammarLevelFilter('HSK2')">
            🔵 HSK 2 (${loc === 'ja' ? '第3-4駅' : (loc === 'en' ? 'Stages 3-4' : 'Chặng 3-4')})
          </button>
          <button type="button" class="level-tab-btn ${selectedLevel === 'HSK3' ? 'active' : ''}" onclick="setGrammarLevelFilter('HSK3')">
            🟣 HSK 3 (${loc === 'ja' ? '第5-6駅' : (loc === 'en' ? 'Stages 5-6' : 'Chặng 5-6')})
          </button>
        </div>

        <!-- Dynamic Main Content: Search Results OR Stage Rail + Timeline Flow -->
        ${query ? searchContentHtml : `
          <div class="stage-flow-view">
            <!-- 1. Stage Rail Section (Metro Track Capsules) -->
            <div class="stage-rail-section">
              <div class="stage-rail-top-bar">
                <div class="stage-rail-title-group">
                  <span class="stage-rail-icon">🚆</span>
                  <span class="stage-rail-heading">${loc === 'ja' ? '学習ルート駅 (全6ステージ)' : (loc === 'en' ? 'Stage Route Stations (6 Stages)' : 'Tuyến Trạm Chặng (Lộ trình 6 Chặng)')}</span>
                </div>
                <div class="stage-rail-quick-hint">
                  ${loc === 'ja' ? '駅をタップして切り替え' : (loc === 'en' ? 'Tap station to switch' : 'Chạm trạm ga để chuyển chặng')}
                </div>
              </div>
              <div class="stage-rail-scroller">
                <div class="stage-rail-bar" role="tablist">
                  ${railButtonsHtml}
                </div>
              </div>
            </div>

            <!-- 2. Active Stage Focus Hero Panel -->
            <div class="stage-hero-panel">
              <div class="stage-hero-top">
                <div class="stage-hero-title-group">
                  <div class="stage-hero-pill-row">
                    <span class="stage-hero-icon">${curMeta.icon}</span>
                    <span class="stage-hero-level-tag">${escapeHtml(getLocText(curMeta.tag, loc))}</span>
                    ${curStatusBadgeHtml}
                  </div>
                  <h2 class="stage-hero-title">${escapeHtml(getLocText(curMeta.title, loc))}</h2>
                  <p class="stage-hero-desc">${escapeHtml(getLocText(curMeta.desc, loc))}</p>
                </div>

                <div class="stage-hero-nav-controls">
                  <button type="button" class="stage-nav-btn prev" onclick="prevStage()" ${selectedStageNum <= 1 ? 'disabled' : ''} title="${loc === 'ja' ? '前のステージ' : (loc === 'en' ? 'Previous Stage' : 'Chặng trước')}">
                    <span class="nav-arrow">←</span>
                    <span class="nav-text">${loc === 'ja' ? '前駅' : (loc === 'en' ? 'Prev' : 'Chặng trước')}</span>
                  </button>
                  <div class="stage-nav-counter">
                    <span class="stage-nav-cur">${selectedStageNum}</span>
                    <span class="stage-nav-sep">/</span>
                    <span class="stage-nav-tot">6</span>
                  </div>
                  <button type="button" class="stage-nav-btn next" onclick="nextStage()" ${selectedStageNum >= 6 ? 'disabled' : ''} title="${loc === 'ja' ? '次のステージ' : (loc === 'en' ? 'Next Stage' : 'Chặng sau')}">
                    <span class="nav-text">${loc === 'ja' ? '次駅' : (loc === 'en' ? 'Next' : 'Chặng sau')}</span>
                    <span class="nav-arrow">→</span>
                  </button>
                </div>
              </div>

              <div class="stage-hero-progress-section">
                <div class="stage-progress-labels">
                  <span class="stage-progress-title">
                    ${loc === 'ja' ? 'この駅の達成度' : (loc === 'en' ? 'Station Mastery' : 'Tiến độ chặng này')}
                  </span>
                  <span class="stage-progress-stats">
                    <b>${curDone}/${curStageItems.length}</b> ${loc === 'ja' ? 'レッスン完了' : (loc === 'en' ? 'lessons mastered' : 'cấu trúc hoàn thành')} (${curPercent}%)
                  </span>
                </div>
                <div class="stage-progress-track">
                  <div class="stage-progress-fill" style="width: ${curPercent}%;"></div>
                </div>
              </div>
            </div>

            <!-- 3. Illuminated Vertical Timeline Pathway -->
            <div class="stage-timeline-track">
              <div class="timeline-spine-line"></div>
              <div class="timeline-items-list">
                ${timelineItemsHtml}
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }

  // --- Detail (Canvas 4-Step / Accordion) Renderer ---
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
    const isAccordionMode = canvasState.detailViewMode === 'accordion';

    let bodyHtml = '';

    if (isAccordionMode) {
      // Expanded Accordion Mode (All sections on one scrollable canvas with neat collapse tags)
      bodyHtml = `
        <div class="canvas-accordion-all">
          <div class="canvas-step-card">${renderStep1Core(detail, locData, loc, false)}</div>
          <div class="canvas-step-card">${renderStep2Lego(detail, loc, false)}</div>
          <div class="canvas-step-card">${renderStep3Trap(detail, locData, loc, false)}</div>
          <div class="canvas-step-card">${renderStep4Challenge(detail, loc, false)}</div>
        </div>
      `;
    } else {
      // Step-by-Step Mode (1 focused card at a time)
      let stepContentHtml = '';
      switch (step) {
        case 1:
          stepContentHtml = renderStep1Core(detail, locData, loc, true);
          break;
        case 2:
          stepContentHtml = renderStep2Lego(detail, loc, true);
          break;
        case 3:
          stepContentHtml = renderStep3Trap(detail, locData, loc, true);
          break;
        case 4:
          stepContentHtml = renderStep4Challenge(detail, loc, true);
          break;
      }
      bodyHtml = `
        <div class="canvas-step-card">
          ${stepContentHtml}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="grammar-container">
        <!-- Top Back Nav & Mode Toggle -->
        <div class="canvas-nav-row">
          <div class="canvas-nav-top-subrow">
            <button type="button" class="grammar-back-btn" onclick="returnToCanvasCatalog()">
              ← <span>${loc === 'ja' ? '一覧へ戻る' : (loc === 'en' ? 'Back' : 'Quay lại lộ trình')}</span>
            </button>
            <div class="canvas-item-pill">
              <span>${escapeHtml(detail.level)}</span> • <b>${escapeHtml(detail.zh_name)}</b> ${detail.pinyin ? `<span class="detail-py-badge">(${escapeHtml(detail.pinyin)})</span>` : ''}
            </div>
          </div>
          
          <div class="canvas-top-right-group">
            <div class="canvas-mode-toggle">
              <button type="button" class="mode-toggle-btn ${!isAccordionMode ? 'active' : ''}" onclick="setDetailViewMode('stepper')" title="Từng bước tập trung">
                📱 ${loc === 'ja' ? 'ステップ式' : (loc === 'en' ? 'Steps' : 'Từng bước')}
              </button>
              <button type="button" class="mode-toggle-btn ${isAccordionMode ? 'active' : ''}" onclick="setDetailViewMode('accordion')" title="Mở rộng toàn bộ">
                📑 ${loc === 'ja' ? '一覧展開' : (loc === 'en' ? 'All Sections' : 'Xem trọn gói')}
              </button>
            </div>
          </div>
        </div>

        <!-- Stepper Bar (Only in Stepper Mode) -->
        ${!isAccordionMode ? `
          <div class="canvas-stepper-bar">
            <button type="button" class="canvas-step-tab ${step === 1 ? 'active' : ''}" onclick="setCanvasStep(1)">
              <span class="step-num">1</span>
              <span class="step-text">${loc === 'ja' ? '要点' : (loc === 'en' ? 'Core' : 'Cốt lõi')}</span>
            </button>
            <button type="button" class="canvas-step-tab ${step === 2 ? 'active' : ''}" onclick="setCanvasStep(2)">
              <span class="step-num">2</span>
              <span class="step-text">${loc === 'ja' ? '組み立て' : (loc === 'en' ? 'Lego' : 'Lắp ghép')}</span>
            </button>
            <button type="button" class="canvas-step-tab ${step === 3 ? 'active' : ''}" onclick="setCanvasStep(3)">
              <span class="step-num">3</span>
              <span class="step-text">${loc === 'ja' ? '落とし穴' : (loc === 'en' ? 'Traps' : 'Bẫy sai')}</span>
            </button>
            <button type="button" class="canvas-step-tab ${step === 4 ? 'active' : ''}" onclick="setCanvasStep(4)">
              <span class="step-num">4</span>
              <span class="step-text">${loc === 'ja' ? '挑戦' : (loc === 'en' ? 'Quiz' : 'Thử tài')}</span>
            </button>
          </div>
        ` : ''}

        <!-- Active Content -->
        ${bodyHtml}
      </div>
    `;
  }

  // --- Step 1: Cốt lõi (The One-Liner) ---
  function renderStep1Core(detail, locData, loc, showFooter) {
    const dlg = detail.dialogue || {};
    const spkA = dlg.speaker_a || {};
    const spkB = dlg.speaker_b || {};

    return `
      <div class="canvas-step-inner">
        <div class="canvas-step-badge">💡 ${loc === 'ja' ? 'ステップ 1: コア要点' : (loc === 'en' ? 'STEP 1: CORE RULE' : 'BƯỚC 1: BẢN CHẤT CỐT LÕI')}</div>
        <h1 class="canvas-hero-title">${escapeHtml(locData.title || detail.zh_name)}</h1>
        
        <div class="canvas-formula-box">
          <code>${escapeHtml(localizeFormula(detail.formula, loc))}</code>
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
                <span class="bubble-zh-text">${escapeHtml(spkA.zh || '')}</span>
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
                <span class="bubble-zh-text">${escapeHtml(spkB.zh || '')}</span>
                <button type="button" class="bubble-audio-btn" onclick="speakGrammarText('${escapeQuotes(spkB.zh || '')}')" title="Play">🔊</button>
              </div>
              <div class="bubble-py">${escapeHtml(spkB.py || '')}</div>
              <div class="bubble-tr">“${escapeHtml(getLocText(spkB.tr, loc))}”</div>
            </div>
          </div>
        </div>

        ${showFooter ? `
          <div class="canvas-step-footer">
            <div></div>
            <button type="button" class="btn btn-primary canvas-next-btn" onclick="setCanvasStep(2)">
              <span>${loc === 'ja' ? '次へ：ブロックを組み立てる' : (loc === 'en' ? 'Next: Build with Lego' : 'Tiếp theo: Lắp ghép câu')} →</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // --- Step 2: Bộ Lắp Ghép Lego Tương Tác ---
  function renderStep2Lego(detail, loc, showFooter) {
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
        <div class="canvas-step-badge">🧩 ${loc === 'ja' ? 'ステップ 2: 組み立て' : (loc === 'en' ? 'STEP 2: LEGO BUILDER' : 'BƯỚC 2: BỘ LẮP GHÉP TƯƠNG TÁC')}</div>
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

        ${showFooter ? `
          <div class="canvas-step-footer">
            <button type="button" class="btn btn-secondary" onclick="setCanvasStep(1)">
              ← ${loc === 'ja' ? '前へ' : (loc === 'en' ? 'Back' : 'Quay lại')}
            </button>
            <button type="button" class="btn btn-primary canvas-next-btn" onclick="setCanvasStep(3)">
              <span>${loc === 'ja' ? '次へ：落とし穴に注意' : (loc === 'en' ? 'Next: Trap Alert' : 'Tiếp theo: Xem bẫy hay sai')} →</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // --- Step 3: Bẫy Hay Sai (Spot the Trap) ---
  function renderStep3Trap(detail, locData, loc, showFooter) {
    return `
      <div class="canvas-step-inner">
        <div class="canvas-step-badge">⚠️ ${loc === 'ja' ? 'ステップ 3: よくある落とし穴' : (loc === 'en' ? 'STEP 3: TRAP ALERT' : 'BƯỚC 3: BẪY HAY MẮC PHẢI')}</div>
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
            <span>${escapeHtml(locData.trap_why || '')}</span>
          </div>
        </div>

        ${showFooter ? `
          <div class="canvas-step-footer">
            <button type="button" class="btn btn-secondary" onclick="setCanvasStep(2)">
              ← ${loc === 'ja' ? '前へ' : (loc === 'en' ? 'Back' : 'Quay lại')}
            </button>
            <button type="button" class="btn btn-primary canvas-next-btn" onclick="setCanvasStep(4)">
              <span>${loc === 'ja' ? '次へ：30秒チャレンジ' : (loc === 'en' ? 'Next: Quick Challenge' : 'Tiếp theo: Thử tài 30 giây')} →</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // --- Step 4: Thử Tài 30 Giây (Quick Challenge) ---
  function renderStep4Challenge(detail, loc, showFooter) {
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
        <div class="canvas-step-badge">🎯 ${loc === 'ja' ? 'ステップ 4: クイック挑戦' : (loc === 'en' ? 'STEP 4: QUICK CHALLENGE' : 'BƯỚC 4: THỬ TÀI 30 GIÂY')}</div>
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

        ${showFooter ? `
          <div class="canvas-step-footer" style="margin-top:28px;">
            <button type="button" class="btn btn-secondary" onclick="setCanvasStep(3)">
              ← ${loc === 'ja' ? '前へ' : (loc === 'en' ? 'Back' : 'Quay lại')}
            </button>
            <button type="button" class="btn btn-primary canvas-next-btn" onclick="goToNextGrammar('${escapeQuotes(detail.id)}')">
              <span>${loc === 'ja' ? '次の文法へ' : (loc === 'en' ? 'Next Pattern' : 'Bài tiếp theo')} →</span>
            </button>
          </div>
        ` : ''}
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
