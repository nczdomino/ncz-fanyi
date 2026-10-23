// js/features/reader.js - Reading views, sentence breakdown, contextual pinyin & font control - Dependencies: js/core/state.js, js/core/storage.js, js/core/utils.js, js/features/nlp.js, js/features/tts.js, js/features/translate.js, js/features/word-sheet.js

// --- Module: Mini Dictionary & Inline Meaning ---
function getWordMiniMeaning(tok, lang) {
  const userDict = getUserDict();
  const userKey = lang + ':' + tok;
  if (userDict[userKey]) return userDict[userKey];

  if (lang === 'ja') {
    const kj = getWordKanji(tok);
    if (kj && kj.ja_meaning) return kj.ja_meaning;
    if (state.cachedTranslations['ja:' + tok]) return state.cachedTranslations['ja:' + tok];
    return '';
  }

  const dictInfo = MINI_DICT[tok];
  if (dictInfo) {
    if (lang === 'vi') {
      if (dictInfo.vi) return dictInfo.vi;
    } else {
      if (dictInfo.en && dictInfo.en.length > 0) return dictInfo.en[0];
    }
  }

  const sl = getSlangEntry(tok);
  if (sl) {
    if (lang === 'vi' && sl.vi) return sl.vi;
    if (lang === 'en' && sl.en) return sl.en;
    if (lang === 'ja' && sl.ja) return sl.ja;
    return sl.vi || sl.en || '';
  }

  const cacheKey = lang + ':' + tok;
  if (state.cachedTranslations[cacheKey]) {
    return state.cachedTranslations[cacheKey];
  }
  return '';
}

// --- Module: Reader View ---
function renderReaderView() {
  const container = document.getElementById('reader-content-area') || document.getElementById('reader-area');
  if (!container) return;
  if (typeof phraseClear === 'function') phraseClear();
  if (typeof karaokeStop === 'function') karaokeStop();

  document.documentElement.style.setProperty('--reader-font-size', state.fontSize + 'px');

  // Update toggle button states
  const pinyinBtn = document.getElementById('btn-toggle-pinyin');
  if (pinyinBtn) pinyinBtn.classList.toggle('active', state.showPinyin);
  const meaningBtn = document.getElementById('btn-toggle-meaning');
  if (meaningBtn) meaningBtn.classList.toggle('active', state.showMeaning);
  const viewModeBtn = document.getElementById('btn-toggle-viewmode');
  if (viewModeBtn) {
    viewModeBtn.textContent = state.viewMode === 'sentence' ? t('viewSingle') : t('viewAll');
  }

  if (state.sentences.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding: 40px 20px; color:var(--text-muted);">
        <p>${t('noContent') || t('noTextToRead')}</p>
        <button class="btn btn-primary" onclick="switchView('input')" style="margin-top:14px;">
          ${t('enterText')}
        </button>
      </div>
    `;
    return;
  }

  if (state.viewMode === 'sentence') {
    renderSentenceMode(container);
  } else {
    renderFullTextMode(container);
  }
}

function renderSentenceMode(container) {
  const total = state.sentences.length;
  const currIdx = Math.min(Math.max(0, state.currentSentenceIndex), total - 1);
  state.currentSentenceIndex = currIdx;
  const sentence = state.sentences[currIdx];
  const tokens = segmentSentence(sentence);

  // Requirement B1: Calculate sentence pinyin once for accurate polyphonic readings
  const sentenceChars = Array.from(sentence);
  let sentencePinyin = null;
  if (window.pinyinPro && typeof window.pinyinPro.pinyin === 'function') {
    try {
      const py = window.pinyinPro.pinyin(sentence, { toneType: 'symbol', type: 'array' });
      if (Array.isArray(py) && py.length === sentenceChars.length) {
        sentencePinyin = py;
      }
    } catch (e) {
      console.warn('Sentence pinyin calculation failed', e);
    }
  }

  let tokensHtml = '';
  let _off = 0;
  let _charOff = 0;
  tokens.forEach(tok => {
    const off = _off; _off += tok.length;
    const tokChars = Array.from(tok);
    const tokCharLen = tokChars.length;
    const charOff = _charOff;
    _charOff += tokCharLen;

    if (!isChinese(tok)) {
      tokensHtml += `<span class="punctuation-token">${escapeHtml(tok)}</span>`;
    } else {
      // Priority: Slang entry (SLANG_MAP) > MINI_DICT[tok].pinyin > Context pinyin > Fallback
      let pinyin = '';
      const sl = getSlangEntry(tok);
      if (sl && sl.pinyin) {
        pinyin = sl.pinyin;
      } else if (MINI_DICT[tok] && MINI_DICT[tok].pinyin) {
        pinyin = MINI_DICT[tok].pinyin;
      } else if (sentencePinyin) {
        pinyin = sentencePinyin.slice(charOff, charOff + tokCharLen).join(' ');
      }
      if (!pinyin) {
        pinyin = getWordPinyin(tok);
      }

      let miniMeaning = '';
      if (state.showMeaning) {
        miniMeaning = getWordMiniMeaning(tok, state.meaningLang);
      }
      tokensHtml += `
        <div class="word-token" data-tok="${escapeHtml(tok)}" data-s="${off}" data-e="${off + tok.length}" onclick="openWordSheet(this.dataset.tok)">
          <span class="token-pinyin">${escapeHtml(pinyin)}</span>
          <span class="token-chars" lang="zh-CN">${escapeHtml(tok)}</span>
          ${miniMeaning ? `<span class="token-mini-meaning">${escapeHtml(miniMeaning)}</span>` : ''}
        </div>
      `;
    }
  });

  const pinyinClass = state.showPinyin ? '' : 'hide-pinyin';
  const meaningClass = state.showMeaning ? '' : 'hide-meaning';

  container.innerHTML = `
    <div class="sentence-card">
      <div class="sentence-header">
        <span class="sentence-index">${t('sentence')} ${currIdx + 1} / ${total}</span>
        <div style="display:flex; gap:6px; align-items:center;">
          <button class="icon-btn" onclick="speakText('${escapeQuotes(sentence)}')" title="${t('play') || 'Phát âm'}">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </button>
          <button class="icon-btn" onclick="speakText('${escapeQuotes(sentence)}', this, 0.75)" title="${t('playSlow') || 'Nghe chậm (0.75x)'}" style="font-size:14px; width:32px; height:32px;" aria-label="Nghe chậm">
            🐢
          </button>
          <button class="btn btn-secondary btn-sm" onclick="translateCurrentSentence()">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
            ${t('translateSentence')}
          </button>
        </div>
      </div>
      <div class="sentence-content ${pinyinClass} ${meaningClass}" data-ktext="${escapeHtml(sentence)}">
        ${tokensHtml}
      </div>
      <div id="sentence-trans-box" class="translation-box"></div>
      <div class="sentence-nav-bar">
        <button class="btn btn-secondary" onclick="prevSentence()" ${currIdx === 0 ? 'disabled style="opacity:0.5;"' : ''}>
          ← ${t('prevSentence')}
        </button>
        <button class="btn btn-primary" onclick="nextSentence()" ${currIdx === total - 1 ? 'disabled style="opacity:0.5;"' : ''}>
          ${t('nextSentence')} →
        </button>
      </div>
    </div>
  `;
}

function renderFullTextMode(container) {
  const pinyinClass = state.showPinyin ? '' : 'hide-pinyin';
  const meaningClass = state.showMeaning ? '' : 'hide-meaning';

  let html = `
    <div class="full-text-toolbar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px; padding:10px 14px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px;">
      <div style="font-size:13px; font-weight:600; color:var(--text-muted);">
        📄 <span>${state.sentences.length}</span> ${t('sentence') || 'câu'} · <span>${state.currentText ? state.currentText.length : 0}</span> ký tự
      </div>
      <button id="btn-full-trans-toggle" class="btn btn-secondary btn-sm" onclick="translateFullText()" style="display:inline-flex; align-items:center; gap:6px;">
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
        <span>${t('translateFullText') || 'Dịch toàn bộ bài viết'}</span>
      </button>
    </div>
    <div id="full-text-trans-box" class="translation-box" style="margin-bottom:16px;"></div>
    <div class="full-text-container">
  `;
  state.sentences.forEach((sentence, sIdx) => {
    const tokens = segmentSentence(sentence);

    // Requirement B1: Calculate sentence pinyin once for accurate polyphonic readings
    const sentenceChars = Array.from(sentence);
    let sentencePinyin = null;
    if (window.pinyinPro && typeof window.pinyinPro.pinyin === 'function') {
      try {
        const py = window.pinyinPro.pinyin(sentence, { toneType: 'symbol', type: 'array' });
        if (Array.isArray(py) && py.length === sentenceChars.length) {
          sentencePinyin = py;
        }
      } catch (e) {
        console.warn('Sentence pinyin calculation failed', e);
      }
    }

    let tokensHtml = '';
    let _off = 0;
    let _charOff = 0;
    tokens.forEach(tok => {
      const off = _off; _off += tok.length;
      const tokChars = Array.from(tok);
      const tokCharLen = tokChars.length;
      const charOff = _charOff;
      _charOff += tokCharLen;

      if (!isChinese(tok)) {
        tokensHtml += `<span class="punctuation-token">${escapeHtml(tok)}</span>`;
      } else {
        // Priority: Slang entry (SLANG_MAP) > MINI_DICT[tok].pinyin > Context pinyin > Fallback
        let pinyin = '';
        const sl = getSlangEntry(tok);
        if (sl && sl.pinyin) {
          pinyin = sl.pinyin;
        } else if (MINI_DICT[tok] && MINI_DICT[tok].pinyin) {
          pinyin = MINI_DICT[tok].pinyin;
        } else if (sentencePinyin) {
          pinyin = sentencePinyin.slice(charOff, charOff + tokCharLen).join(' ');
        }
        if (!pinyin) {
          pinyin = getWordPinyin(tok);
        }

        let miniMeaning = '';
        if (state.showMeaning) {
          miniMeaning = getWordMiniMeaning(tok, state.meaningLang);
        }
        tokensHtml += `
          <div class="word-token" data-tok="${escapeHtml(tok)}" data-s="${off}" data-e="${off + tok.length}" onclick="openWordSheet(this.dataset.tok)">
            <span class="token-pinyin">${escapeHtml(pinyin)}</span>
            <span class="token-chars" lang="zh-CN">${escapeHtml(tok)}</span>
            ${miniMeaning ? `<span class="token-mini-meaning">${escapeHtml(miniMeaning)}</span>` : ''}
          </div>
        `;
      }
    });

    html += `
      <div class="sentence-paragraph ${sIdx === state.currentSentenceIndex ? 'active-sentence' : ''}" onclick="state.currentSentenceIndex = ${sIdx}">
        <span style="font-size:12px; font-weight:700; color:var(--text-muted); margin-right:8px; cursor:pointer;" onclick="speakText('${escapeQuotes(sentence)}')">🔊 [${sIdx + 1}]</span>
        <div style="display:inline;" class="${pinyinClass} ${meaningClass}" data-ktext="${escapeHtml(sentence)}">
          ${tokensHtml}
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

function prevSentence() {
  if (state.currentSentenceIndex > 0) {
    const wasOpen = !!document.getElementById('sentence-trans-box')?.classList.contains('show');
    state.currentSentenceIndex--;
    renderReaderView();
    if (wasOpen) translateCurrentSentence();
  }
}

function nextSentence() {
  if (state.currentSentenceIndex < state.sentences.length - 1) {
    const wasOpen = !!document.getElementById('sentence-trans-box')?.classList.contains('show');
    state.currentSentenceIndex++;
    renderReaderView();
    if (wasOpen) translateCurrentSentence();
  }
}

function togglePinyin() {
  state.showPinyin = !state.showPinyin;
  localStorage.setItem('cr_showPinyin', state.showPinyin);
  renderReaderView();
}

function toggleMeaning() {
  state.showMeaning = !state.showMeaning;
  localStorage.setItem('cr_showMeaning', state.showMeaning);
  renderReaderView();
}

function toggleViewMode() {
  state.viewMode = state.viewMode === 'sentence' ? 'all' : 'sentence';
  renderReaderView();
}

function changeFontSize(delta) {
  state.fontSize = Math.min(48, Math.max(18, state.fontSize + delta));
  localStorage.setItem('cr_fontSize', state.fontSize);
  renderReaderView();
}

async function translateCurrentSentence() {
  const box = document.getElementById('sentence-trans-box');
  if (!box) return;
  const sentence = state.sentences[state.currentSentenceIndex];
  if (!sentence) return;

  box.classList.add('show');
  box.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; color:var(--text-muted); padding:6px 0;">
      <span class="spinner-small" style="display:inline-block; width:14px; height:14px; border:2px solid var(--accent); border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite;"></span>
      <em>${t('translating')} (Đang phân tích 3 lăng kính...)</em>
    </div>
  `;

  const trans1 = await translateTextOnline(sentence, state.meaningLang);
  let trans2 = '';
  if (state.meaningLang2 && state.meaningLang2 !== state.meaningLang) {
    trans2 = await translateTextOnline(sentence, state.meaningLang2);
  }

  const lenses = generateThreeLenses(sentence, trans1, state.meaningLang);
  state.currentSentenceLenses = {
    sentence,
    trans1,
    trans2,
    lenses
  };

  renderSentenceLenses(box);
}
