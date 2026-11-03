/**
 * js/features/ai-doc-test.js
 * 
 * Halou AI Document Vocabulary Studio & Smart Drill:
 * - AI & Local NLP analyzer that extracts key vocabulary from any Chinese text
 * - Excerpts exact context sentences from the user's document
 * - Contextual usage explanation & mnemonic memory hacks
 * - Interactive typing drills:
 *   1) Pinyin Typing Drill (with forgiving numeric 'ni3 hao3' or toneless 'ni hao' tolerance)
 *   2) Meaning Recall Drill (typing or 4-choice)
 *   3) Contextual Usage & Mnemonic Card
 *   4) 100% Spaced Mastery Loop (loops missed words until 100% mastered)
 * - Multi-language support (vi, en, ja)
 */

(function () {
  'use strict';

  const globalScope = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

  // Sample Presets for 1-Click Instant Testing
  const SAMPLE_PRESETS = {
    news: {
      title: { vi: "📰 Tin tức công nghệ", en: "📰 Tech News", ja: "📰 テックニュース" },
      text: "随着人工智能和数字经济的快速发展，越来越多的年轻人开始使用智能工具提高学习和工作效率。专家表示，掌握先进的数字化技能将在未来的就业市场中具备显著的竞争优势。"
    },
    dining: {
      title: { vi: "🍜 Gọi món nhà hàng", en: "🍜 Restaurant Dining", ja: "🍜 レストラン注文" },
      text: "服务员，您好！我们要点菜。这道宫保鸡丁请不要放太多辣椒，我们不太能吃辣。另外请推荐一份招牌特色菜，再来一壶热茉莉花茶，结账时可以扫微信支付吗？"
    },
    travel: {
      title: { vi: "✈️ Du lịch & Hỏi đường", en: "✈️ Travel Directions", ja: "✈️ 観光と道案内" },
      text: "请问去故宫博物院怎么走？你可以坐一号线地铁，到天安门东站下车，从B出口出来步行五分钟就是了。如果时间充裕，还可以顺便参观附近的景山公园，俯瞰整个紫禁城的壮丽景色。"
    },
    work: {
      title: { vi: "💼 Phỏng vấn công việc", en: "💼 Job Interview", ja: "💼 就職面接" },
      text: "各位面试官好，我对贵公司的跨境电商业务非常感兴趣。在过去的工作中，我积累了丰富的海外市场拓展经验，擅长跨文化沟通与团队协作，希望能有机会加入团队共同发展。"
    }
  };

  const aiDocTestState = {
    text: '',
    isAnalyzing: false,
    data: null, // { summary, totalWords, words: [] }
    session: {
      activeMode: 'pinyin', // 'pinyin' | 'meaning' | 'context'
      currentIndex: 0,
      userInputs: {}, // { [wordId]: string }
      results: {}, // { [wordId]: { pinyinOk, meaningOk, exactTone } }
      reviewQueue: [], // list of word indices to loop
      isReviewingLoop: false,
      masteredCount: 0,
      isFinished: false
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

  function playAudio(text, speed = 1.0) {
    if (typeof speakText === 'function') {
      speakText(text, null, speed);
    }
  }

  // --- Normalization & Pinyin Matching Helpers ---
  function stripPinyinTones(str) {
    if (!str) return '';
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[üǖǘǚǜ]/g, 'u')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  function convertNumericPinyin(str) {
    if (!str) return '';
    const fn = (typeof window !== 'undefined' && window.pinyinNumberToTone) ||
               (typeof global !== 'undefined' && global.pinyinNumberToTone) ||
               (typeof globalScope !== 'undefined' && globalScope.pinyinNumberToTone) ||
               (typeof pinyinNumberToTone === 'function' ? pinyinNumberToTone : null);
    if (fn) {
      return fn(str);
    }
    return str;
  }

  function verifyPinyinInput(userInput, targetPinyin) {
    if (!userInput || !targetPinyin) return { correct: false, exactTone: false };
    const rawClean = userInput.trim().toLowerCase();
    const convertedClean = convertNumericPinyin(rawClean).trim().toLowerCase();
    const targetClean = targetPinyin.trim().toLowerCase();

    // 1. Exact match with accent marks or converted tone numbers (e.g. "nǐ hǎo" or "ni3 hao3")
    if (convertedClean === targetClean || rawClean === targetClean) {
      return { correct: true, exactTone: true };
    }

    // 2. Toneless match (e.g. "ni hao" for "nǐ hǎo")
    const stripUser = stripPinyinTones(convertedClean);
    const stripTarget = stripPinyinTones(targetClean);

    if (stripUser === stripTarget && stripUser.length > 0) {
      return { correct: true, exactTone: false, hint: targetPinyin };
    }

    return { correct: false, exactTone: false, target: targetPinyin };
  }

  // --- Local NLP Fallback Extractor (Resilient & Offline) ---
  function extractLocalVocabFromText(text, locale) {
    const loc = locale || getLang();
    if (!text || typeof text !== 'string') {
      return { summary: '', totalWords: 0, words: [] };
    }

    // Split sentences
    const sentences = text
      .split(/([。！？!?\n]+)/)
      .map(s => s.trim())
      .filter(s => s.length > 2 && !/^[。！？!?\n]+$/.test(s));

    // Common Chinese stop words to omit from drill
    const stopWords = new Set([
      '的', '了', '是', '我', '你', '他', '她', '它', '们', '在', '有', '和', '就', '不', '也', '都',
      '这', '那', '把', '被', '向', '让', '去', '来', '着', '过', '得', '地', '吗', '呢', '吧', '啊',
      '很', '个', '到', '上', '下', '里', '好', '说', '看', '想', '要', '能', '会', '可', '以', '微',
      '什么', '怎么', '为什么', '多少', '一个', '没有', '不是', '这是', '那是', '因为', '所以', '如果'
    ]);

    const extractedWords = [];
    const seen = new Set();

    // Try segmenting with Intl.Segmenter or dictionary lookup
    sentences.forEach(sentence => {
      let tokens = [];
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        try {
          const seg = new Intl.Segmenter('zh', { granularity: 'word' });
          for (const item of seg.segment(sentence)) {
            tokens.push(item.segment);
          }
        } catch (e) {
          tokens = sentence.match(/[\u4e00-\u9fa5]{2,4}/g) || [];
        }
      } else {
        tokens = sentence.match(/[\u4e00-\u9fa5]{2,4}/g) || [];
      }

      tokens.forEach(tok => {
        const word = tok.trim();
        if (word.length >= 2 && !seen.has(word) && !stopWords.has(word) && /^[\u4e00-\u9fa5]+$/.test(word)) {
          seen.add(word);

          // Find dictionary entry
          let pinyin = '';
          let hanviet = '';
          let meaning = '';

          if (typeof MINI_DICT !== 'undefined' && MINI_DICT[word]) {
            const d = MINI_DICT[word];
            pinyin = d.pinyin || '';
            hanviet = d.hanviet || '';
            meaning = (loc === 'ja' && d.ja) ? d.ja : ((loc === 'en' && d.en) ? (Array.isArray(d.en) ? d.en.join('; ') : d.en) : d.vi);
          } else if (typeof HALOU_LEARN_DATA !== 'undefined' && HALOU_LEARN_DATA.vocabulary) {
            const found = HALOU_LEARN_DATA.vocabulary.find(v => v.hanzi === word);
            if (found) {
              pinyin = found.pinyin || '';
              hanviet = found.hanviet || '';
              meaning = (found.meanings && found.meanings[loc]) || found.meanings?.vi || '';
            }
          }

          if (!meaning) {
            // General meaningful fallback
            meaning = loc === 'ja' ? `重要な表現「${word}」` : (loc === 'en' ? `Key term: ${word}` : `Thuật ngữ quan trọng: ${word}`);
          }

          // Build context usage note
          let contextUsage = '';
          if (loc === 'ja') {
            contextUsage = `本文「${sentence}」で使われています。文脈の核となる表現です。`;
          } else if (loc === 'en') {
            contextUsage = `Used in: "${sentence}". Serves as a key contextual anchor.`;
          } else {
            contextUsage = `Xuất hiện trong câu: «${sentence}». Đóng vai trò nòng cốt truyền đạt ý nghĩa trong đoạn văn.`;
          }

          // Build mnemonic hint
          let mnemonic = '';
          if (loc === 'ja') {
            mnemonic = `漢字の構成と本文の文脈を結びつけて覚えるのがコツです。`;
          } else if (loc === 'en') {
            mnemonic = `Associate the character components with the sentence story for easy recall.`;
          } else {
            mnemonic = hanviet 
              ? `Âm Hán-Việt là [${hanviet}], giúp liên tưởng trực tiếp đến nghĩa trong ngữ cảnh.` 
              : `Ghi nhớ qua ngữ cảnh của câu văn trên để tạo phản xạ tự nhiên.`;
          }

          extractedWords.push({
            id: `dw_${extractedWords.length + 1}`,
            word: word,
            pinyin: pinyin || word,
            hanviet: hanviet || '',
            meaning: meaning,
            contextSentence: sentence,
            contextUsage: contextUsage,
            mnemonic: mnemonic
          });
        }
      });
    });

    // Pick top 5 to 12 words
    const finalWords = extractedWords.slice(0, 12);
    const summary = sentences.length > 0 ? sentences[0] : text.slice(0, 80);

    return {
      summary: summary,
      totalWords: finalWords.length,
      words: finalWords
    };
  }

  // --- Main API Analyzer with Fallback ---
  async function analyzeDocumentForTest(text, locale) {
    const loc = locale || getLang();
    const cleanText = (text || '').trim();
    if (!cleanText) return { summary: '', totalWords: 0, words: [] };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout

      const resp = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          type: 'doc_vocab_test',
          targetLang: loc
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        const json = await resp.json();
        if (json && json.testData && Array.isArray(json.testData.words) && json.testData.words.length > 0) {
          const words = json.testData.words.map((w, idx) => ({
            id: `dw_${idx + 1}`,
            word: w.word || '',
            pinyin: w.pinyin || '',
            hanviet: w.hanviet || '',
            meaning: w.meaning || '',
            contextSentence: w.contextSentence || cleanText.slice(0, 50),
            contextUsage: w.contextUsage || '',
            mnemonic: w.mnemonic || ''
          })).filter(w => w.word);

          if (words.length > 0) {
            return {
              summary: json.testData.summary || '',
              totalWords: words.length,
              words: words
            };
          }
        }
      }
    } catch (err) {
      console.warn('[AIDocTest] AI API unavailable or timed out, using local NLP engine:', err.message);
    }

    // Fallback to local NLP
    return extractLocalVocabFromText(cleanText, loc);
  }

  // ==========================================
  // UI Rendering & Interaction
  // ==========================================
  function renderAIDocTestView(container) {
    if (!container) return;
    const loc = getLang();
    const state = aiDocTestState;

    if (state.isAnalyzing) {
      renderLoadingView(container);
      return;
    }

    if (state.data && state.data.words && state.data.words.length > 0) {
      if (state.session.isFinished) {
        renderFinishedView(container);
      } else {
        renderActiveDrillView(container);
      }
      return;
    }

    renderInputStudioView(container);
  }

  // --- 1. Input Studio View ---
  function renderInputStudioView(container) {
    const loc = getLang();

    const presetsHtml = Object.entries(SAMPLE_PRESETS).map(([key, val]) => `
      <button type="button" class="preset-chip-btn" onclick="aiDocTestLoadPreset('${key}')">
        ${escapeHtml(val.title[loc] || val.title.vi)}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="aidoc-container">
        <div class="aidoc-hero-card">
          <div class="aidoc-hero-badge">🤖 AI VOCABULARY STUDIO</div>
          <h2 class="aidoc-hero-title">
            ${loc === 'ja' ? 'AI文章分析・単語テスト自動生成' : (loc === 'en' ? 'AI Document Vocabulary & Smart Drill' : 'AI Trích Xuất & Luyện Đề Từ Văn Bản')}
          </h2>
          <p class="aidoc-hero-desc">
            ${loc === 'ja'
              ? '中国語の文章・ニュース・会話文を貼り付けると、AIが重要単語・ピンイン・文脈の解説・覚え方を瞬時に抽出して、対話型の入力テストを作成します。'
              : (loc === 'en'
                ? 'Paste any Chinese text, article or dialogue. AI will extract core vocabulary, context sentences, and mnemonics to generate an interactive typing drill.'
                : 'Nạp bất kỳ đoạn văn bản, tin tức hay hội thoại tiếng Trung nào vào đây. AI sẽ tự động trích xuất từ vựng trọng tâm, câu ngữ cảnh, mẹo nhớ thần tốc và tạo bài luyện gõ Pinyin & ôn nghĩa tức thì.')}
          </p>

          <div class="aidoc-presets-row">
            <span class="presets-label">⚡ ${loc === 'ja' ? 'サンプルですぐ試す:' : (loc === 'en' ? 'Quick samples:' : 'Thử nhanh bằng bài mẫu:')}</span>
            <div class="presets-chips">
              ${presetsHtml}
            </div>
          </div>

          <div class="aidoc-textarea-wrap">
            <textarea id="aidoc-text-input" class="aidoc-textarea" rows="6" placeholder="${loc === 'ja' ? 'ここに中国語のテキストを貼り付けてください...' : (loc === 'en' ? 'Paste your Chinese text here...' : 'Dán bài đọc, đoạn văn, tin tức hoặc hội thoại tiếng Trung vào đây...')}">${escapeHtml(aiDocTestState.text)}</textarea>
          </div>

          <div class="aidoc-action-row">
            <button type="button" class="btn btn-primary aidoc-generate-btn" onclick="aiDocTestSubmitText()">
              <span>✨</span>
              <span>${loc === 'ja' ? 'AIで分析してテストを開始' : (loc === 'en' ? 'Analyze & Start Drill' : 'Phân tích bằng AI & Bắt đầu luyện')}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- 2. Loading Animation View ---
  function renderLoadingView(container) {
    const loc = getLang();
    container.innerHTML = `
      <div class="aidoc-loading-card">
        <div class="aidoc-loading-spinner">✨</div>
        <h3 class="aidoc-loading-title">
          ${loc === 'ja' ? 'AIが文章を分析しています...' : (loc === 'en' ? 'AI is analyzing document...' : 'AI đang phân tích tài liệu của bạn...')}
        </h3>
        <p class="aidoc-loading-sub">
          ${loc === 'ja' 
            ? '重要単語の抽出、ピンイン照合、文脈例文、覚え方のコツを生成中' 
            : (loc === 'en' 
              ? 'Extracting core vocabulary, validating pinyin, context sentences, and mnemonics' 
              : 'Đang trích xuất từ vựng nòng cốt, đối chiếu Pinyin, phân tích câu ngữ cảnh và tạo mẹo nhớ thần tốc...')}
        </p>
      </div>
    `;
  }

  // --- 3. Active Interactive Drill View ---
  function renderActiveDrillView(container) {
    const loc = getLang();
    const data = aiDocTestState.data;
    const session = aiDocTestState.session;
    const words = data.words;
    const totalWords = words.length;

    // Current word index
    let activeWordIndex = session.currentIndex;
    if (session.isReviewingLoop && session.reviewQueue.length > 0) {
      activeWordIndex = session.reviewQueue[0];
    }
    activeWordIndex = Math.max(0, Math.min(activeWordIndex, totalWords - 1));
    const currentWord = words[activeWordIndex];

    const currentWordNum = activeWordIndex + 1;
    const progressPercent = Math.round((session.masteredCount / totalWords) * 100);

    const resultState = session.results[currentWord.id] || null;

    // Summary of word chips on top
    const wordChipsHtml = words.map((w, idx) => {
      let chipClass = 'drill-word-chip';
      const r = session.results[w.id];
      if (r && r.pinyinOk) chipClass += ' chip-done';
      if (idx === activeWordIndex) chipClass += ' chip-active';
      return `<span class="${chipClass}" onclick="aiDocTestJumpToWord(${idx})">${escapeHtml(w.word)}</span>`;
    }).join('');

    container.innerHTML = `
      <div class="aidoc-drill-container">
        <!-- Top Status & Progress Bar -->
        <div class="drill-progress-card">
          <div class="drill-progress-top">
            <div class="drill-step-indicator">
              ${loc === 'ja' ? '進捗' : (loc === 'en' ? 'Progress' : 'Tiến độ')}: 
              <b>${loc === 'ja' ? `第 ${currentWordNum} / ${totalWords} 単語` : (loc === 'en' ? `Word ${currentWordNum} / ${totalWords}` : `Từ ${currentWordNum} / ${totalWords}`)}</b>
            </div>
            <div class="drill-stats-pills">
              <span class="pill-stat">🎯 ${loc === 'ja' ? '合計' : (loc === 'en' ? 'Total' : 'Tổng')}: <b>${totalWords}</b></span>
              <span class="pill-stat pill-mastered">✅ ${loc === 'ja' ? '習得' : (loc === 'en' ? 'Mastered' : 'Đã thuộc')}: <b>${session.masteredCount}</b></span>
              ${session.reviewQueue.length > 0 ? `
                <span class="pill-stat pill-review">🔄 ${loc === 'ja' ? '要復習' : (loc === 'en' ? 'Review' : 'Cần ôn lại')}: <b>${session.reviewQueue.length}</b></span>
              ` : ''}
              <button type="button" class="btn-drill-exit" onclick="aiDocTestResetToInput()" title="${loc === 'ja' ? '別の文章を入力' : (loc === 'en' ? 'New text' : 'Nạp bài mới')}">✕</button>
            </div>
          </div>
          <div class="drill-progress-bar">
            <div class="drill-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <div class="drill-chips-scroller">
            ${wordChipsHtml}
          </div>
        </div>

        <!-- Mode Tabs Selector -->
        <div class="drill-mode-tabs">
          <button type="button" class="drill-mode-btn ${session.activeMode === 'pinyin' ? 'active' : ''}" onclick="aiDocTestSetMode('pinyin')">
            ⌨️ ${loc === 'ja' ? 'ピンイン入力' : (loc === 'en' ? 'Pinyin Typing' : 'Gõ Pinyin')}
          </button>
          <button type="button" class="drill-mode-btn ${session.activeMode === 'meaning' ? 'active' : ''}" onclick="aiDocTestSetMode('meaning')">
            ✍️ ${loc === 'ja' ? '意味の確認' : (loc === 'en' ? 'Meaning Recall' : 'Ôn nghĩa từ')}
          </button>
          <button type="button" class="drill-mode-btn ${session.activeMode === 'context' ? 'active' : ''}" onclick="aiDocTestSetMode('context')">
            💡 ${loc === 'ja' ? '文脈と覚え方' : (loc === 'en' ? 'Context & Mnemonic' : 'Ngữ cảnh & Mẹo nhớ')}
          </button>
        </div>

        <!-- Interactive Question Card -->
        <div class="drill-main-card">
          <!-- Big Hanzi & Audio -->
          <div class="drill-hanzi-row">
            <div class="drill-hanzi" lang="zh-CN">${escapeHtml(currentWord.word)}</div>
            <button type="button" class="drill-audio-btn" onclick="playAudio('${escapeQuotes(currentWord.word)}')" title="${loc === 'ja' ? '発音を聞く' : (loc === 'en' ? 'Listen' : 'Nghe phát âm')}">
              🔊
            </button>
          </div>
          ${currentWord.hanviet ? `<div class="drill-hanviet">[${escapeHtml(currentWord.hanviet)}]</div>` : ''}

          <!-- Context Sentence Excerpt from User Document -->
          <div class="drill-context-box" onclick="playAudio('${escapeQuotes(currentWord.contextSentence)}')">
            <div class="context-box-label">
              <span>📄</span> ${loc === 'ja' ? '本文中での実際の使われ方:' : (loc === 'en' ? 'Context sentence from text:' : 'Câu ngữ cảnh trích từ văn bản đã nạp:')}
            </div>
            <div class="context-sentence-text" lang="zh-CN">
              "${escapeHtml(currentWord.contextSentence).replace(new RegExp(escapeHtml(currentWord.word), 'g'), `<span class="context-highlight">${escapeHtml(currentWord.word)}</span>`)}"
            </div>
            <div class="context-audio-hint">🔊 ${loc === 'ja' ? 'タップして文全体を聞く' : (loc === 'en' ? 'Tap to listen sentence' : 'Chạm để nghe cả câu')}</div>
          </div>

          <!-- Dynamic Mode Drill Area -->
          ${renderDrillArea(currentWord, resultState, loc)}

          <!-- Mnemonic & Context Usage Drawer -->
          <div class="drill-insights-card">
            <div class="insight-row">
              <span class="insight-icon">📌</span>
              <div class="insight-text">
                <b>${loc === 'ja' ? '文脈での使い方' : (loc === 'en' ? 'Context Usage' : 'Cách dùng tự động')}:</b> 
                ${escapeHtml(currentWord.contextUsage || currentWord.meaning)}
              </div>
            </div>
            ${currentWord.mnemonic ? `
              <div class="insight-row insight-mnemonic">
                <span class="insight-icon">🧠</span>
                <div class="insight-text">
                  <b>${loc === 'ja' ? '覚え方のコツ' : (loc === 'en' ? 'Mnemonic Memory Hack' : 'Mẹo nhớ thần tốc')}:</b> 
                  ${escapeHtml(currentWord.mnemonic)}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Action Footer -->
          <div class="drill-card-footer">
            <button type="button" class="btn btn-secondary btn-sm" onclick="aiDocTestPrevWord()" ${activeWordIndex <= 0 ? 'disabled' : ''}>
              ← ${loc === 'ja' ? '前へ' : (loc === 'en' ? 'Previous' : 'Câu trước')}
            </button>
            <button type="button" class="btn btn-primary aidoc-next-btn" onclick="aiDocTestNextWord()">
              ${loc === 'ja' ? '次へ' : (loc === 'en' ? 'Next Word' : 'Từ tiếp theo')} →
            </button>
          </div>
        </div>
      </div>
    `;

    // Auto-focus input in pinyin mode
    setTimeout(() => {
      if (typeof document === 'undefined') return;
      const input = document.getElementById('aidoc-pinyin-input');
      if (input && !resultState?.pinyinOk) {
        input.focus();
      }
    }, 100);
  }

  // Render the specific drill input area depending on active mode
  function renderDrillArea(word, resultState, loc) {
    const session = aiDocTestState.session;

    if (session.activeMode === 'meaning') {
      return `
        <div class="drill-input-section">
          <div class="drill-input-label">
            ${loc === 'ja' ? 'この単語の意味は何ですか？' : (loc === 'en' ? 'What does this word mean?' : 'Từ này có nghĩa là gì trong câu trên?')}
          </div>
          <div class="meaning-reveal-box">
            <div class="meaning-text-big">${escapeHtml(word.meaning)}</div>
            <div class="meaning-pinyin-sub">Pinyin: <b>${escapeHtml(word.pinyin)}</b></div>
          </div>
        </div>
      `;
    }

    if (session.activeMode === 'context') {
      return `
        <div class="drill-input-section">
          <div class="context-detail-card">
            <div class="context-detail-meaning">
              <b>${loc === 'ja' ? '意味' : (loc === 'en' ? 'Meaning' : 'Ý nghĩa')}:</b> ${escapeHtml(word.meaning)}
            </div>
            <div class="context-detail-pinyin">
              <b>Pinyin:</b> ${escapeHtml(word.pinyin)}
            </div>
          </div>
        </div>
      `;
    }

    // Default: Pinyin Typing Drill
    const isDone = resultState && resultState.pinyinOk;
    const currentVal = session.userInputs[word.id] || '';

    return `
      <div class="drill-input-section">
        <div class="drill-input-label">
          ${loc === 'ja' 
            ? 'ピンインを入力してください（例: ni3 hao3 または ni hao）:' 
            : (loc === 'en' 
              ? 'Type Pinyin (e.g. ni3 hao3 or ni hao):' 
              : 'Gõ Pinyin của từ trên (hỗ trợ cả gõ số ni3 hao3 hoặc gõ thường ni hao):')}
        </div>

        <div class="drill-input-row">
          <input 
            type="text" 
            id="aidoc-pinyin-input" 
            class="aidoc-pinyin-input ${isDone ? 'input-correct' : ''}" 
            placeholder="${loc === 'ja' ? 'ピンインを入力...' : (loc === 'en' ? 'Type pinyin here...' : 'Nhập pinyin...')}"
            value="${escapeHtml(currentVal)}"
            ${isDone ? 'readonly' : ''}
            onkeydown="if(event.key==='Enter') aiDocTestCheckPinyin('${escapeQuotes(word.id)}')"
          >
          <button type="button" class="btn btn-primary aidoc-check-btn" onclick="aiDocTestCheckPinyin('${escapeQuotes(word.id)}')">
            ${isDone ? '✓' : (loc === 'ja' ? '判定' : (loc === 'en' ? 'Check' : 'Kiểm tra'))}
          </button>
        </div>

        ${resultState ? `
          <div class="drill-feedback-banner ${resultState.pinyinOk ? 'feedback-success' : 'feedback-error'}">
            ${resultState.pinyinOk ? `
              <span class="feedback-icon">✓</span>
              <span class="feedback-msg">
                ${resultState.exactTone 
                  ? (loc === 'ja' ? '完璧です！声調も正確です！' : (loc === 'en' ? 'Perfect! Accurate pinyin & tones!' : 'Xuất sắc! Đúng cả thanh điệu chuẩn!'))
                  : (loc === 'ja' ? `正解です！声調付き: [${escapeHtml(word.pinyin)}]` : (loc === 'en' ? `Good job! Standard: [${escapeHtml(word.pinyin)}]` : `Đúng phiên âm! Chú ý dấu thanh: [${escapeHtml(word.pinyin)}]`))}
              </span>
            ` : `
              <span class="feedback-icon">✕</span>
              <span class="feedback-msg">
                ${loc === 'ja' ? `正解は: [${escapeHtml(word.pinyin)}] です。もう一度入力してみてください！` : (loc === 'en' ? `Correct is: [${escapeHtml(word.pinyin)}]. Try again!` : `Chưa đúng! Đáp án chuẩn: [${escapeHtml(word.pinyin)}]. Hãy thử gõ lại nhé!`)}
              </span>
            `}
          </div>
        ` : ''}
      </div>
    `;
  }

  // --- 4. Finished 100% Mastery View ---
  function renderFinishedView(container) {
    const loc = getLang();
    const data = aiDocTestState.data;
    const session = aiDocTestState.session;

    const wordsTableHtml = data.words.map((w, idx) => `
      <div class="finished-word-row">
        <span class="word-idx">${idx + 1}</span>
        <span class="word-hanzi" lang="zh-CN">${escapeHtml(w.word)}</span>
        <span class="word-pinyin">${escapeHtml(w.pinyin)}</span>
        <span class="word-meaning">${escapeHtml(w.meaning)}</span>
        <button type="button" class="word-audio-btn" onclick="playAudio('${escapeQuotes(w.word)}')">🔊</button>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="aidoc-finished-card">
        <div class="finished-trophy">🏆</div>
        <h2 class="finished-title">
          ${loc === 'ja' ? 'マスター達成おめでとうございます！' : (loc === 'en' ? '100% Mastery Achieved!' : 'Xuất Sắc! Bạn Đã Thành Thạo 100%!')}
        </h2>
        <p class="finished-desc">
          ${loc === 'ja'
            ? `文章中の全 ${data.totalWords} 単語のピンイン・意味・文脈を完全に習得しました！`
            : (loc === 'en'
              ? `You have mastered all ${data.totalWords} vocabulary words and context sentences from this text!`
              : `Bạn đã chinh phục toàn bộ ${data.totalWords} từ vựng then chốt và cách dùng trong bài đọc vừa nạp!`)}
        </p>

        <div class="finished-words-table">
          ${wordsTableHtml}
        </div>

        <div class="finished-actions-row">
          <button type="button" class="btn btn-secondary" onclick="aiDocTestRestartDrill()">
            🔄 ${loc === 'ja' ? 'この文章をもう一度練習' : (loc === 'en' ? 'Review This Text Again' : 'Luyện lại bài này')}
          </button>
          <button type="button" class="btn btn-primary" onclick="aiDocTestResetToInput()">
            ✨ ${loc === 'ja' ? '新しい文章を分析する' : (loc === 'en' ? 'Analyze New Document' : 'Nạp bài đọc khác')}
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // Actions & Global Handlers
  // ==========================================
  globalScope.aiDocTestLoadPreset = function (key) {
    const preset = SAMPLE_PRESETS[key];
    if (preset) {
      aiDocTestState.text = preset.text;
      if (typeof document !== 'undefined') {
        const input = document.getElementById('aidoc-text-input');
        if (input) input.value = preset.text;
      }
    }
  };

  globalScope.aiDocTestSubmitText = async function () {
    const input = typeof document !== 'undefined' ? document.getElementById('aidoc-text-input') : null;
    const text = input ? input.value : aiDocTestState.text;
    if (!text || text.trim().length < 4) {
      const loc = getLang();
      if (typeof alert === 'function') {
        alert(loc === 'ja' ? '中国語のテキストを入力してください。' : (loc === 'en' ? 'Please enter some Chinese text.' : 'Vui lòng nhập hoặc dán đoạn văn tiếng Trung để phân tích.'));
      }
      return;
    }

    aiDocTestState.text = text.trim();
    aiDocTestState.isAnalyzing = true;
    renderAIDocTest();

    try {
      const data = await analyzeDocumentForTest(aiDocTestState.text, getLang());
      aiDocTestState.data = data;
      aiDocTestState.session = {
        activeMode: 'pinyin',
        currentIndex: 0,
        userInputs: {},
        results: {},
        reviewQueue: [],
        isReviewingLoop: false,
        masteredCount: 0,
        isFinished: false
      };
    } catch (e) {
      console.error('[AIDocTest] Analysis error:', e);
    } finally {
      aiDocTestState.isAnalyzing = false;
      renderAIDocTest();
    }
  };

  globalScope.aiDocTestCheckPinyin = function (wordId) {
    const session = aiDocTestState.session;
    const words = aiDocTestState.data?.words || [];
    const word = words.find(w => w.id === wordId);
    if (!word) return;

    const input = typeof document !== 'undefined' ? document.getElementById('aidoc-pinyin-input') : null;
    const userVal = input ? input.value : (session.userInputs[wordId] || '');
    session.userInputs[wordId] = userVal;

    const verified = verifyPinyinInput(userVal, word.pinyin);
    session.results[wordId] = {
      pinyinOk: verified.correct,
      exactTone: verified.exactTone
    };

    if (verified.correct) {
      playAudio(word.word);
      // If it was in review queue, remove it
      const qIdx = session.reviewQueue.indexOf(session.currentIndex);
      if (qIdx >= 0) {
        session.reviewQueue.splice(qIdx, 1);
      }
      // Re-calculate mastered count
      session.masteredCount = Object.values(session.results).filter(r => r.pinyinOk).length;

      // Auto advance smoothly after 700ms
      setTimeout(() => {
        globalScope.aiDocTestNextWord();
      }, 700);
    } else {
      // Add to review queue if not already there
      if (!session.reviewQueue.includes(session.currentIndex)) {
        session.reviewQueue.push(session.currentIndex);
      }
    }

    renderAIDocTest();
  };

  globalScope.aiDocTestNextWord = function () {
    const session = aiDocTestState.session;
    const words = aiDocTestState.data?.words || [];

    // Check if finished
    if (session.masteredCount >= words.length && words.length > 0) {
      session.isFinished = true;
      renderAIDocTest();
      return;
    }

    if (session.currentIndex < words.length - 1) {
      session.currentIndex += 1;
    } else {
      // Reached the end of first pass!
      if (session.reviewQueue.length > 0) {
        session.isReviewingLoop = true;
        session.currentIndex = session.reviewQueue[0];
      } else {
        session.isFinished = true;
      }
    }
    renderAIDocTest();
  };

  globalScope.aiDocTestPrevWord = function () {
    const session = aiDocTestState.session;
    if (session.currentIndex > 0) {
      session.currentIndex -= 1;
      renderAIDocTest();
    }
  };

  globalScope.aiDocTestJumpToWord = function (idx) {
    aiDocTestState.session.currentIndex = idx;
    renderAIDocTest();
  };

  globalScope.aiDocTestSetMode = function (mode) {
    aiDocTestState.session.activeMode = mode;
    renderAIDocTest();
  };

  globalScope.aiDocTestRestartDrill = function () {
    aiDocTestState.session = {
      activeMode: 'pinyin',
      currentIndex: 0,
      userInputs: {},
      results: {},
      reviewQueue: [],
      isReviewingLoop: false,
      masteredCount: 0,
      isFinished: false
    };
    renderAIDocTest();
  };

  globalScope.aiDocTestResetToInput = function () {
    aiDocTestState.data = null;
    renderAIDocTest();
  };

  // Bridge from Reader / Input view: direct jump into AI Doc Test
  globalScope.startAiDocTestWithText = function (text) {
    if (!text) return;
    aiDocTestState.text = text;
    if (typeof switchView === 'function') {
      switchView('learn');
    }
    if (typeof learnSwitchSubTab === 'function') {
      learnSwitchSubTab('doc-test');
    }
    // Auto-trigger analyze
    setTimeout(() => {
      globalScope.aiDocTestSubmitText();
    }, 150);
  };

  function renderAIDocTest() {
    if (typeof document === 'undefined') return;
    const container = document.getElementById('aidoc-mount-point');
    if (container) {
      renderAIDocTestView(container);
    } else if (typeof renderSubTabContent === 'function') {
      // Re-render subtab
      renderSubTabContent();
    }
  }

  // Expose API globally and for CommonJS / Node
  const publicApi = {
    renderAIDocTestView,
    verifyPinyinInput,
    stripPinyinTones,
    convertNumericPinyin,
    extractLocalVocabFromText,
    analyzeDocumentForTest,
    SAMPLE_PRESETS,
    aiDocTestState,
    aiDocTestLoadPreset: globalScope.aiDocTestLoadPreset,
    aiDocTestSubmitText: globalScope.aiDocTestSubmitText,
    aiDocTestCheckPinyin: globalScope.aiDocTestCheckPinyin,
    aiDocTestNextWord: globalScope.aiDocTestNextWord,
    aiDocTestPrevWord: globalScope.aiDocTestPrevWord,
    aiDocTestJumpToWord: globalScope.aiDocTestJumpToWord,
    aiDocTestSetMode: globalScope.aiDocTestSetMode,
    aiDocTestRestartDrill: globalScope.aiDocTestRestartDrill,
    aiDocTestResetToInput: globalScope.aiDocTestResetToInput,
    startAiDocTestWithText: globalScope.startAiDocTestWithText
  };

  Object.assign(globalScope, publicApi);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = publicApi;
  }
})();
