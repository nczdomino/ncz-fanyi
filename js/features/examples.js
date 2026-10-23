// js/features/examples.js - Example sentences index and candidate matching - Dependencies: js/core/state.js, js/core/utils.js, js/data/examples.js, js/features/nlp.js, js/features/enrich.js, js/features/tts.js

// --- Module: Example Sentences ---
let WORD_EXAMPLES_INDEX = null;

function initWordExamplesIndex() {
  if (WORD_EXAMPLES_INDEX) return;
  WORD_EXAMPLES_INDEX = {};
  if (typeof WORD_EXAMPLES_LIST === 'undefined' || !Array.isArray(WORD_EXAMPLES_LIST)) return;

  const hasSegmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl;
  const segmenter = hasSegmenter ? new Intl.Segmenter('zh', { granularity: 'word' }) : null;

  for (let i = 0; i < WORD_EXAMPLES_LIST.length; i++) {
    const item = WORD_EXAMPLES_LIST[i];
    if (!item || !item.zh) continue;

    if (segmenter) {
      const segs = [...segmenter.segment(item.zh)].map(s => s.segment).filter(w => /[\u4e00-\u9fff]/.test(w));
      for (const w of segs) {
        if (!WORD_EXAMPLES_INDEX[w]) WORD_EXAMPLES_INDEX[w] = [];
        if (!WORD_EXAMPLES_INDEX[w].includes(item)) WORD_EXAMPLES_INDEX[w].push(item);
      }
    }
  }
}

function highlightWordInSentence(sentence, targetWord) {
  if (!sentence || !targetWord) return escapeHtml(sentence || '');
  const safeSentence = escapeHtml(sentence);
  const safeWord = escapeHtml(targetWord);
  if (!safeSentence.includes(safeWord)) return safeSentence;
  return safeSentence.split(safeWord).join(`<span class="example-highlight">${safeWord}</span>`);
}

function getSentencePinyin(sentence) {
  if (!sentence) return '';
  if (window.pinyinPro && typeof window.pinyinPro.pinyin === 'function') {
    try {
      return window.pinyinPro.pinyin(sentence, { toneType: 'symbol' });
    } catch (e) {}
  }
  return getWordPinyin(sentence);
}

function getWordCandidateExamples(word) {
  if (!word) return [];
  initWordExamplesIndex();

  const candidates = [];
  const seenZh = new Set();

  // 1. Live Contextual Sentence from current article in Reader (Layer 1)
  if (Array.isArray(state.sentences) && state.sentences.length > 0) {
    for (let i = 0; i < state.sentences.length; i++) {
      const s = (state.sentences[i] || '').trim();
      if (s.includes(word) && s !== word && s.length >= 4) {
        const trans = (state.translations && state.translations[s]) || null;
        candidates.push({
          zh: s,
          pinyin: getSentencePinyin(s),
          vi: (state.meaningLang === 'vi' && trans) ? trans : null,
          en: (state.meaningLang === 'en' && trans) ? trans : null,
          ja: (state.meaningLang === 'ja' && trans) ? trans : null,
          source: 'context',
          isContext: true
        });
        seenZh.add(s);
        break; // 1 live context sentence is optimal
      }
    }
  }

  // 2. Curated Word Examples Index (Layer 2)
  if (WORD_EXAMPLES_INDEX && WORD_EXAMPLES_INDEX[word]) {
    for (const ex of WORD_EXAMPLES_INDEX[word]) {
      if (!seenZh.has(ex.zh)) {
        candidates.push({ ...ex, isContext: false });
        seenZh.add(ex.zh);
        if (candidates.length >= 2) return candidates;
      }
    }
  }

  // 2B. If multi-char word not found, search for individual characters in examples
  // Only for words >= 2 chars where no match found yet
  if (candidates.length === 0 && word.length >= 2) {
    for (let i = 0; i < WORD_EXAMPLES_LIST.length; i++) {
      const ex = WORD_EXAMPLES_LIST[i];
      if (!ex || !ex.zh) continue;
      // Check if ALL characters of the word appear in the sentence
      const allCharsPresent = [...word].every(ch => ex.zh.includes(ch));
      if (allCharsPresent && ex.zh.includes(word.charAt(0)) && !seenZh.has(ex.zh)) {
        candidates.push({ ...ex, isContext: false });
        seenZh.add(ex.zh);
        if (candidates.length >= 2) break;
      }
    }
  }

  // 3. Search in all curated sentences for substring match (Layer 3A)
  if (typeof WORD_EXAMPLES_LIST !== 'undefined') {
    for (let i = 0; i < WORD_EXAMPLES_LIST.length; i++) {
      const ex = WORD_EXAMPLES_LIST[i];
      if (ex && ex.zh && ex.zh.includes(word) && !seenZh.has(ex.zh)) {
        candidates.push({ ...ex, isContext: false });
        seenZh.add(ex.zh);
        if (candidates.length >= 2) return candidates;
      }
    }
  }

  return candidates;
}

function renderExampleListItems(container, countBadge, word, list) {
  const lang = state.meaningLang || 'vi';
  const lang2 = state.meaningLang2;
  const isParallel = lang2 && lang2 !== lang;

  if (countBadge) {
    countBadge.textContent = `${list.length} ${t('examples').toLowerCase()}`;
  }

  let html = '';
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const highlightedZh = highlightWordInSentence(item.zh, word);
    const pinyin = item.pinyin || getSentencePinyin(item.zh);
    
    // Choose appropriate badge text based on sentence source
    let badgeText = item.source || t('examples') || 'Ví dụ';
    if (item.isContext) {
      badgeText = t('currentTextExample') || 'Trong bài đọc';
    }

    // Primary meaning
    let primaryTrans = item[lang] || null;
    const transId = `ex-trans-${i}-${Date.now()}`;
    const trans2Id = `ex-trans2-${i}-${Date.now()}`;

    let transHtml = '';
    if (primaryTrans) {
      transHtml = `<div class="example-trans">${escapeHtml(primaryTrans)}</div>`;
    } else {
      const interimHint = (item.en && lang !== 'en') ? escapeHtml(item.en) : (t('loadingExamples') || 'Đang dịch câu ví dụ...');
      transHtml = `<div class="example-trans" id="${transId}" style="color:var(--text-muted); font-style:italic;">${interimHint}</div>`;
      translateTextOnline(item.zh, lang).then(translated => {
        if (state.activeWord === word) {
          const el = document.getElementById(transId);
          if (el) {
            el.textContent = translated || (t('noMeaning') || '');
            el.style.color = '';
            el.style.fontStyle = '';
            item[lang] = translated;
          }
        }
      });
    }

    // Secondary parallel meaning
    let trans2Html = '';
    if (isParallel) {
      let secondaryTrans = item[lang2] || null;
      if (secondaryTrans) {
        trans2Html = `<div class="example-trans-parallel"><span class="badge" style="font-size:9.5px; padding:1px 4px; margin-right:4px;">${getLangName(lang2)}</span>${escapeHtml(secondaryTrans)}</div>`;
      } else {
        trans2Html = `<div class="example-trans-parallel" id="${trans2Id}" style="color:var(--text-muted); font-style:italic;"><span class="badge" style="font-size:9.5px; padding:1px 4px; margin-right:4px;">${getLangName(lang2)}</span>...</div>`;
        translateTextOnline(item.zh, lang2).then(translated2 => {
          if (state.activeWord === word) {
            const el2 = document.getElementById(trans2Id);
            if (el2) {
              el2.innerHTML = `<span class="badge" style="font-size:9.5px; padding:1px 4px; margin-right:4px;">${getLangName(lang2)}</span>${escapeHtml(translated2 || '')}`;
              el2.style.color = '';
              el2.style.fontStyle = '';
              item[lang2] = translated2;
            }
          }
        });
      }
    }

    html += `
      <div class="example-item">
        <div class="example-header">
          <div class="example-zh-row">
            <div class="example-zh">${highlightedZh}</div>
            <div class="example-pinyin">${escapeHtml(pinyin)}</div>
          </div>
          <div style="display:flex; align-items:center; gap:4px; flex-shrink:0;">
            <span class="example-badge">${escapeHtml(badgeText)}</span>
            <button class="example-audio-btn" onclick="speakText('${escapeQuotes(item.zh)}')" title="${t('play')}" aria-label="${t('play')}">
              <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            </button>
          </div>
        </div>
        ${transHtml}
        ${trans2Html}
      </div>
    `;
  }

  container.innerHTML = html;
}

function renderExamplesLoadingState(container, countBadge, word) {
  if (countBadge) countBadge.textContent = '';
  container.innerHTML = `
    <div class="example-loading-box">
      <div class="loading-spinner-sm"></div>
      <span>🌐 ${t('searchingOnlineExamples') || 'Đang tìm câu ví dụ thực tế trên mạng...'}</span>
    </div>
  `;
}

function renderExamplesEmptyState(container, countBadge, word) {
  if (countBadge) countBadge.textContent = '';
  const dictEntry = MINI_DICT[word] || {};
  const viMeaning = dictEntry.vi ? `<div style="color:var(--text-muted);font-size:13px;margin-top:4px;">${escapeHtml(dictEntry.vi)}</div>` : '';
  const enc = encodeURIComponent(word);
  container.innerHTML = `
    <div style="text-align:center; padding:20px 16px; color:var(--text-muted); background:var(--bg-surface-alt, rgba(0,0,0,0.02)); border:1px dashed var(--border-color); border-radius:12px; margin-top:8px;">
      <div style="font-size:28px; margin-bottom:6px;">🎬</div>
      <div style="font-size:14px; font-weight:600; color:var(--text-secondary);">${escapeHtml(word)}</div>
      ${viMeaning}
      <div style="font-size:13px; margin-top:6px; color:var(--text-muted);">${tx('Chưa tìm thấy câu phụ đề đối thoại trực tuyến cho từ này.', 'No subtitle dialogue sentences found for this word.', 'この単語の字幕・会話例文は見つかりませんでした。')}</div>
      <div style="margin-top:10px; font-size:12px; color:var(--text-secondary);">${tx('Xem ngữ cảnh thực tế của người bản xứ trên:', 'See real-life native usage on:', 'ネイティブの実際の使用例を見る:')}</div>
      <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-top:8px;">
        <a class="btn btn-secondary btn-sm" style="font-size:11.5px; padding:3px 10px; border-radius:14px;" href="https://search.bilibili.com/all?keyword=${enc}%20%E6%84%8F%E6%80%9D" target="_blank" rel="noopener">▶ Bilibili Video</a>
        <a class="btn btn-secondary btn-sm" style="font-size:11.5px; padding:3px 10px; border-radius:14px;" href="https://www.xiaohongshu.com/search_result?keyword=${enc}" target="_blank" rel="noopener">📕 小红书</a>
        <a class="btn btn-secondary btn-sm" style="font-size:11.5px; padding:3px 10px; border-radius:14px;" href="https://www.zhihu.com/search?q=${enc}" target="_blank" rel="noopener">知乎</a>
      </div>
    </div>
  `;
}

async function renderWordExamples(word) {
  const container = document.getElementById('sheet-examples-list');
  const countBadge = document.getElementById('sheet-examples-count');
  if (!container) return;

  if (!word) {
    container.innerHTML = '';
    if (countBadge) countBadge.textContent = '';
    return;
  }

  // 1. Check local examples first (instant 0ms)
  const localExamples = getWordCandidateExamples(word);

  if (localExamples.length > 0) {
    renderExampleListItems(container, countBadge, word, localExamples);
  } else {
    // Show sleek loading state while fetching online
    renderExamplesLoadingState(container, countBadge, word);
  }

  // 2. Fetch online examples if local examples are fewer than 4
  if (localExamples.length < 4 && word.length <= 15) {
    fetchOnlineExamples(word).then(extra => {
      if (state.activeWord !== word) return;
      const validExtra = (extra || []).filter(e => e && e.zh && !localExamples.some(x => x.zh === e.zh));
      const combined = localExamples.concat(validExtra).slice(0, 5);
      if (combined.length > 0) {
        renderExampleListItems(container, countBadge, word, combined);
      } else if (localExamples.length === 0) {
        renderExamplesEmptyState(container, countBadge, word);
      }
    }).catch(() => {
      if (state.activeWord === word && localExamples.length === 0) {
        renderExamplesEmptyState(container, countBadge, word);
      }
    });
  }
}
