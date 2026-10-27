// js/features/word-sheet.js - Word detail bottom sheet, HanziWriter animation & meaning editor - Dependencies: js/core/state.js, js/core/storage.js, js/core/utils.js, js/features/nlp.js, js/features/tts.js, js/features/enrich.js, js/features/dict.js, js/features/examples.js

async function openWordSheet(word) {
  if (!word) return;
  state.activeWord = word;
  addRecentSearch(word);
  
  const backdrop = document.getElementById('sheet-backdrop');
  const sheet = document.getElementById('word-sheet');
  if (!backdrop || !sheet) return;

  const pinyin = getWordPinyin(word);
  const hanviet = getWordHanViet(word);
  const dictEntry = MINI_DICT[word];
  const kanjiInfo = getWordKanji(word);
  
  // Header info
  document.getElementById('sheet-hanzi-title').textContent = word;
  document.getElementById('sheet-pinyin').textContent = pinyin;
  const hanvietEl = document.getElementById('sheet-hanviet');
  if (hanvietEl) {
    if (state.meaningLang === 'ja') {
      const kanaRead = kanjiInfo ? (kanjiInfo.on + (kanjiInfo.kun && kanjiInfo.kun !== '-' ? ' / ' + kanjiInfo.kun : '')) : '';
      hanvietEl.textContent = kanaRead ? (t('kana') + ': ' + kanaRead) : '';
      hanvietEl.style.display = kanaRead ? 'block' : 'none';
    } else if (state.meaningLang === 'vi') {
      hanvietEl.textContent = hanviet ? (t('hanViet') + ': ' + hanviet) : '';
      hanvietEl.style.display = hanviet ? 'block' : 'none';
    } else {
      hanvietEl.textContent = '';
      hanvietEl.style.display = 'none';
    }
  }


  // Badges: HSK, Slang, Type, Radical & Measure Word
  const badgesContainer = document.getElementById('sheet-badges');
  badgesContainer.innerHTML = '';
  if (dictEntry && dictEntry.hsk) {
    const isHsk789 = String(dictEntry.hsk).includes('7') || String(dictEntry.hsk).includes('8') || String(dictEntry.hsk).includes('9');
    badgesContainer.innerHTML += isHsk789
      ? `<span class="badge badge-hsk-pro">👑 HSK ${dictEntry.hsk} (${tx('Cao cấp', 'Advanced', '上級')})</span>`
      : `<span class="badge badge-hsk">HSK ${dictEntry.hsk}</span>`;
  }
  const sheetSlang = getSlangEntry(word);
  if (sheetSlang) {
    badgesContainer.innerHTML += `<span class="badge" style="background:rgba(232,52,78,0.15); color:var(--accent); border:1px solid rgba(232,52,78,0.3); font-weight:700;">🔥 ${tx('Từ lóng', 'Slang', '流行語')}</span>`;
  } else if (dictEntry && dictEntry.type) {
    badgesContainer.innerHTML += `<span class="badge">${escapeHtml(dictEntry.type)}</span>`;
  }
  const radInfo = word.length === 1 ? getWordRadical(word) : null;
  if (radInfo) {
    badgesContainer.innerHTML += `<span class="badge" style="background:var(--bg-muted); border:1px solid var(--border-color); color:var(--text-secondary);">🏮 ${escapeHtml(radInfo.name)}</span>`;
  }
  const mwInfo = getWordMeasureWord(word);
  if (mwInfo) {
    badgesContainer.innerHTML += `<span class="badge" style="background:rgba(46,160,67,0.12); color:#2EA043; border:1px solid rgba(46,160,67,0.3); font-weight:600;">📏 ${escapeHtml(mwInfo.label)}</span>`;
  }

  // Grammar Match Badge (Links directly to HSK Grammar View)
  if (typeof grammarService !== 'undefined' && typeof grammarService.findGrammarPointsByWord === 'function') {
    const matchedGrammar = grammarService.findGrammarPointsByWord(word);
    if (matchedGrammar && matchedGrammar.length > 0) {
      const gPoint = matchedGrammar[0];
      const cat = gPoint.catalog;
      const curUi = (typeof state !== 'undefined' && state.uiLang) || 'vi';
      const gTitle = (cat && (curUi === 'ja' ? cat.ja_name : (curUi === 'en' ? cat.en_name : cat.vi_name))) || (cat && cat.zh_name) || '';
      badgesContainer.innerHTML += `<button class="badge" onclick="closeWordSheet(); switchView('grammar'); if(typeof openGrammarDetail==='function') openGrammarDetail('${escapeQuotes(cat.id)}');" title="${escapeQuotes(gTitle)}" style="background:rgba(59,130,246,0.12); color:#2563EB; border:1px solid rgba(59,130,246,0.3); font-weight:700; cursor:pointer;">📚 ${escapeHtml(gTitle || cat.zh_name)}</button>`;
    }
  }

  // Meanings — chỉ hiển thị theo meaningLang đang chọn
  const lang = state.meaningLang; // 'vi' | 'en' | 'ja'
  const lang2 = state.meaningLang2; // ngôn ngữ song song (nếu bật)

  const primaryEl = document.getElementById('sheet-def-primary');
  const primaryLabel = document.getElementById('sheet-def-primary-label');
  const secondarySection = document.getElementById('sheet-def-secondary-section');
  const secondaryEl = document.getElementById('sheet-def-secondary');
  const secondaryLabel = document.getElementById('sheet-def-secondary-label');
  const addLangBtn = document.getElementById('sheet-btn-add-lang');

  // Helper: lấy nghĩa theo lang từ dictEntry, JA_COMMON_DICT, KANJI_DATA, ưu tiên nghĩa tùy chỉnh
  function getMeaningFromEntry(entry, targetLang) {
    const userDict = getUserDict();
    const customKey = targetLang + ':' + word;
    if (userDict[customKey]) {
      return { text: userDict[customKey], isCustom: true };
    }
    const slEntry = getSlangEntry(word);
    if (!entry && (typeof JA_COMMON_DICT === 'undefined' || !JA_COMMON_DICT[word]) && (!kanjiInfo) && (!slEntry)) return null;

    let m = null;
    if (targetLang === 'en') {
      m = (entry && entry.en ? (Array.isArray(entry.en) ? entry.en.join('; ') : entry.en) : null) || (slEntry && slEntry.en ? (Array.isArray(slEntry.en) ? slEntry.en.join('; ') : slEntry.en) : null);
    } else if (targetLang === 'vi') {
      m = (entry && entry.vi ? entry.vi : null) || (slEntry && slEntry.vi ? slEntry.vi : null);
    } else if (targetLang === 'ja') {
      if (entry && entry.ja) m = entry.ja;
      else if (slEntry && slEntry.ja) m = slEntry.ja;
      else if (typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT[word]) m = JA_COMMON_DICT[word];
      else if (kanjiInfo && kanjiInfo.ja_meaning) m = kanjiInfo.ja_meaning;
      else m = null;
    } else {
      m = (entry && entry.vi) || (slEntry && slEntry.vi) || (entry && entry.en ? (Array.isArray(entry.en) ? entry.en.join('; ') : entry.en) : (slEntry && slEntry.en ? (Array.isArray(slEntry.en) ? slEntry.en.join('; ') : slEntry.en) : null));
    }
    return m ? { text: m, isCustom: false } : null;
  }

  // Label tên ngôn ngữ
  if (primaryLabel) primaryLabel.textContent = getLangName(lang);

  // Hiển thị nghĩa chính
  if (primaryEl) {
    const userDict = getUserDict();
    const customKey = lang + ':' + word;

    if (userDict[customKey]) {
      primaryEl.innerHTML = `${escapeHtml(userDict[customKey])} <span class="badge" style="background:var(--accent); color:#fff; font-size:10px; margin-left:6px; vertical-align:middle;">${t('customMeaningLabel')}</span>`;
    } else {
      const res = getMeaningFromEntry(dictEntry, lang);
      if (res && res.text) {
        primaryEl.innerHTML = escapeHtml(res.text);
      } else {
        const cacheKey = lang + ':' + word;
        if (state.cachedTranslations[cacheKey]) {
          primaryEl.innerHTML = `${escapeHtml(state.cachedTranslations[cacheKey])} <span style="font-size:11px;color:var(--text-muted)">(${t('autoTranslated')})</span>`;
        } else {
          primaryEl.innerHTML = `<em>${t('loadingDict')}</em>`;
          translateTextOnline(word, lang).then(trans => {
            if (state.activeWord === word && primaryEl) {
              const curUserDict = getUserDict();
              if (curUserDict[customKey]) {
                primaryEl.innerHTML = `${escapeHtml(curUserDict[customKey])} <span class="badge" style="background:var(--accent); color:#fff; font-size:10px; margin-left:6px; vertical-align:middle;">${t('customMeaningLabel')}</span>`;
              } else if (trans) {
                primaryEl.innerHTML = `${escapeHtml(trans)} <span style="font-size:11px;color:var(--text-muted)">(${t('autoTranslated')})</span>`;
              } else {
                // Never show Vietnamese to a Japanese/English reader. English is the
                // neutral second choice; Vietnamese is only for Vietnamese readers.
                const fallback = (lang === 'vi')
                  ? ((dictEntry && dictEntry.vi) || (dictEntry && dictEntry.en ? dictEntry.en.join('; ') : ''))
                  : (dictEntry && dictEntry.en ? dictEntry.en.join('; ') : '');
                primaryEl.innerHTML = fallback ? escapeHtml(fallback) : `<span style="color:var(--text-muted)">${t('noMeaning')}</span>`;
              }
            }
          });
        }
      }
    }
  }

  // Hiển thị nghĩa phụ (song song) nếu bật
  // Với tiếng Nhật đơn chữ có kanji data → luôn hiện kanji info
  const hasKanjiExtra = lang !== 'ja' && kanjiInfo && word.length === 1;
  const hasParallelLang = lang2 && lang2 !== lang;

  if (secondarySection && secondaryEl && secondaryLabel) {
    if (hasParallelLang || hasKanjiExtra) {
      secondarySection.style.display = 'block';
      if (hasParallelLang) {
        secondaryLabel.textContent = getLangName(lang2);
        const userDict2 = getUserDict();
        const customKey2 = lang2 + ':' + word;

        if (userDict2[customKey2]) {
          secondaryEl.innerHTML = `${escapeHtml(userDict2[customKey2])} <span class="badge" style="background:var(--accent); color:#fff; font-size:10px; margin-left:6px;">${t('customMeaningLabel')}</span>`;
        } else {
          const res2 = getMeaningFromEntry(dictEntry, lang2);
          if (res2 && res2.text) {
            secondaryEl.innerHTML = escapeHtml(res2.text);
          } else {
            const cacheKey2 = lang2 + ':' + word;
            if (state.cachedTranslations[cacheKey2]) {
              secondaryEl.innerHTML = `${escapeHtml(state.cachedTranslations[cacheKey2])} <span style="font-size:11px;color:var(--text-muted)">(${t('autoTranslated')})</span>`;
            } else {
              secondaryEl.innerHTML = `<em>${t('loadingDict')}</em>`;
              translateTextOnline(word, lang2).then(trans => {
                if (state.activeWord === word && secondaryEl) {
                  const curUserDict2 = getUserDict();
                  if (curUserDict2[customKey2]) {
                    secondaryEl.innerHTML = `${escapeHtml(curUserDict2[customKey2])} <span class="badge" style="background:var(--accent); color:#fff; font-size:10px; margin-left:6px;">${t('customMeaningLabel')}</span>`;
                  } else if (trans) {
                    secondaryEl.innerHTML = `${escapeHtml(trans)} <span style="font-size:11px;color:var(--text-muted)">(${t('autoTranslated')})</span>`;
                  } else {
                    secondaryEl.innerHTML = `<span style="color:var(--text-muted)">${t('noMeaning')}</span>`;
                  }
                }
              });
            }
          }
        }
      } else if (hasKanjiExtra) {
        // Hiện kanji info thêm cho chữ đơn
        secondaryLabel.textContent = '日本語 (Kanji)';
        secondaryEl.innerHTML = `
          <div><strong>${t('kanjiOn') || 'On'}:</strong> ${escapeHtml(kanjiInfo.on)}</div>
          <div><strong>${t('kanjiKun') || 'Kun'}:</strong> ${escapeHtml(kanjiInfo.kun || '-')}</div>
          <div><strong>${t('meaning')}:</strong> ${escapeHtml(kanjiInfo.ja_meaning)}</div>
        `;
      }
    } else {
      secondarySection.style.display = 'none';
    }
  }

  // Nút thêm ngôn ngữ song song
  if (addLangBtn) {
    // Các ngôn ngữ khác với lang hiện tại
    const otherLangs = ['vi', 'en', 'ja'].filter(l => l !== lang);
    if (lang2 && lang2 !== lang) {
      // Đang bật song song → nút tắt
      addLangBtn.textContent = `✕ ${t('turnOff')} ${getLangName(lang2)}`;
      addLangBtn.style.display = 'inline-block';
    } else {
      // Chưa bật → nút thêm ngôn ngữ đầu tiên trong otherLangs
      addLangBtn.textContent = `+ ${t('add')} ${getLangName(otherLangs[0])}`;
      addLangBtn.style.display = 'inline-block';
      addLangBtn._nextLang = otherLangs[0];
    }
    // Lưu otherLangs để toggleParallelLang biết dùng gì
    addLangBtn._otherLangs = otherLangs;
  }

  // External Dictionary Links (Line Dict, Pleco, Baidu Baike, MoEDict, Hanzii, MDBG)
  const extContainer = document.getElementById('sheet-external-links');
  if (extContainer) {
    const lineDictUrl = state.meaningLang === 'ja'
      ? `https://dict.naver.com/linedict/zhendict/#/cnja/search?query=${encodeURIComponent(word)}`
      : (state.meaningLang === 'en'
        ? `https://dict.naver.com/linedict/zhendict/#/cnen/search?query=${encodeURIComponent(word)}`
        : `https://dict.naver.com/linedict/zhendict/#/cnen/search?query=${encodeURIComponent(word)}`);
    
    extContainer.innerHTML = `
      <a class="btn btn-secondary btn-sm" href="${lineDictUrl}" target="_blank" rel="noopener noreferrer" title="Line Dict">📖 Line Dict</a>
      <a class="btn btn-secondary btn-sm" href="plecoapi://x-callback-url/s?q=${encodeURIComponent(word)}" title="Pleco (Mobile App)">📱 Pleco</a>
      <a class="btn btn-secondary btn-sm" href="https://baike.baidu.com/item/${encodeURIComponent(word)}" target="_blank" rel="noopener noreferrer" title="Baidu Baike">📚 百度百科</a>
      <a class="btn btn-secondary btn-sm" href="https://www.moedict.tw/${encodeURIComponent(word)}" target="_blank" rel="noopener noreferrer" title="MoEDict 萌典">🏮 萌典</a>
      <a class="btn btn-secondary btn-sm" href="https://hanzii.net/search/word/${encodeURIComponent(word)}" target="_blank" rel="noopener noreferrer">Hanzii</a>
      <a class="btn btn-secondary btn-sm" href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(word)}" target="_blank" rel="noopener noreferrer">MDBG</a>
    `;
  }

  // Render Hanzi Writer
  renderHanziWriterForWord(word);

  // Extra: synonyms, slang, Wiktionary, media
  try { enrichWordSheet(word); } catch (e) { console.warn(e); }

  // Render AI Deep Word Analysis (AI 解析)
  try { renderWordSheetAiSection(word); } catch (e) { console.warn(e); }

  // Render Compounds (Word Family)
  try { renderWordCompounds(word); } catch (e) { console.warn(e); }

  // Render Example Sentences
  renderWordExamples(word);

  backdrop.classList.add('active');
  sheet.classList.add('active');
}

// ===== Module: Smart word enrichment (synonyms, slang, online examples, media) =====

function closeWordSheet() {
  const backdrop = document.getElementById('sheet-backdrop');
  const sheet = document.getElementById('word-sheet');
  if (backdrop) backdrop.classList.remove('active');
  if (sheet) sheet.classList.remove('active');
  state.activeWriters = [];
}

// Bật/tắt hiển thị song song một ngôn ngữ phụ trong bottom sheet
function toggleParallelLang() {
  const btn = document.getElementById('sheet-btn-add-lang');
  if (!btn) return;
  const lang = state.meaningLang;
  const otherLangs = ['vi', 'en', 'ja'].filter(l => l !== lang);

  if (state.meaningLang2 && state.meaningLang2 !== lang) {
    // Đang bật → tắt
    state.meaningLang2 = null;
  } else {
    // Chưa bật → bật ngôn ngữ đầu tiên khác
    state.meaningLang2 = otherLangs[0];
  }
  localStorage.setItem('cr_meaningLang2', state.meaningLang2 || '');
  // Refresh bottom sheet để cập nhật
  if (state.activeWord) openWordSheet(state.activeWord);
}

// Chỉnh sửa & tùy chỉnh nghĩa từ vựng / thành ngữ / tiếng lóng
function openEditMeaning() {
  const word = state.activeWord;
  if (!word) return;
  const lang = state.meaningLang;
  
  const modal = document.getElementById('edit-meaning-modal');
  const wordEl = document.getElementById('edit-meaning-word');
  const hintEl = document.getElementById('edit-meaning-lang-hint');
  const inputEl = document.getElementById('edit-meaning-input');
  const restoreBtn = document.getElementById('btn-restore-meaning');

  if (!modal || !inputEl) return;
  if (wordEl) wordEl.textContent = word;
  if (hintEl) hintEl.textContent = `${t('customMeaningPrompt')} (${getLangName(lang)})`;

  const userDict = getUserDict();
  const customKey = lang + ':' + word;

  if (userDict[customKey]) {
    inputEl.value = userDict[customKey];
    if (restoreBtn) restoreBtn.style.display = 'inline-flex';
  } else {
    // Lấy nghĩa đang hiển thị hiện tại để người dùng chỉnh sửa nhanh
    const primaryEl = document.getElementById('sheet-def-primary');
    let currentText = primaryEl ? primaryEl.textContent.trim() : '';
    currentText = currentText.replace(/\((.*?)\)$/, '').replace(/\[(.*?)\]$/, '').trim();
    if (currentText === t('loadingDict') || currentText === t('noMeaning')) currentText = '';
    inputEl.value = currentText;
    if (restoreBtn) restoreBtn.style.display = 'none';
  }

  modal.classList.add('active');
  inputEl.focus();
}

function closeEditMeaningModal() {
  const modal = document.getElementById('edit-meaning-modal');
  if (modal) modal.classList.remove('active');
}

function saveCustomMeaning() {
  const word = state.activeWord;
  if (!word) return;
  const lang = state.meaningLang;
  const inputEl = document.getElementById('edit-meaning-input');
  const val = inputEl ? inputEl.value.trim() : '';
  if (!val) {
    showToast(t('noMeaning'));
    return;
  }
  const userDict = getUserDict();
  const customKey = lang + ':' + word;
  userDict[customKey] = val;
  setUserDict(userDict);

  // Cập nhật cả cache dịch để reader & từ điển lập tức cập nhật
  const cacheKey = lang + ':' + word;
  state.cachedTranslations[cacheKey] = val;
  putToDB('translations', { q: cacheKey, result: val });

  closeEditMeaningModal();
  showToast(t('meaningSaved'));
  openWordSheet(word);
}

function restoreDefaultMeaning() {
  const word = state.activeWord;
  if (!word) return;
  const lang = state.meaningLang;
  const customKey = lang + ':' + word;
  const userDict = getUserDict();
  if (userDict[customKey]) {
    delete userDict[customKey];
    setUserDict(userDict);
  }
  // Xóa cache để fetch lại
  const cacheKey = lang + ':' + word;
  delete state.cachedTranslations[cacheKey];

  closeEditMeaningModal();
  showToast(t('meaningRestored'));
  openWordSheet(word);
}

function renderHanziWriterForWord(word) {
  const container = document.getElementById('hanzi-writer-box');
  if (!container) return;
  container.innerHTML = '';
  state.activeWriters = [];

  const chars = [...word].filter(ch => /[\u4e00-\u9fff]/.test(ch)).slice(0, 8);
  if (chars.length === 0) return;

  chars.forEach((ch, idx) => {
    const targetDiv = document.createElement('div');
    targetDiv.className = 'writer-char-box';
    targetDiv.id = 'writer-target-' + idx;
    container.appendChild(targetDiv);

    if (window.HanziWriter && typeof window.HanziWriter.create === 'function') {
      try {
        const writer = window.HanziWriter.create(targetDiv.id, ch, {
          width: 120,
          height: 120,
          padding: 5,
          showOutline: true,
          strokeAnimationSpeed: 1.2,
          delayBetweenStrokes: 120,
          strokeColor: '#E8344E',
          outlineColor: '#DDD',
          drawingColor: '#2EA043'
        });
        state.activeWriters.push(writer);
        writer.animateCharacter();
      } catch (e) {
        targetDiv.innerHTML = `<span style="font-family:var(--font-hanzi); font-size:64px;">${escapeHtml(ch)}</span>`;
      }
    } else {
      // Fallback offline SVG box
      targetDiv.innerHTML = `
        <svg width="120" height="120" viewBox="0 0 120 120">
          <line x1="0" y1="0" x2="120" y2="120" stroke="#eee" stroke-dasharray="3,3"/>
          <line x1="120" y1="0" x2="0" y2="120" stroke="#eee" stroke-dasharray="3,3"/>
          <line x1="60" y1="0" x2="60" y2="120" stroke="#eee" stroke-dasharray="3,3"/>
          <line x1="0" y1="60" x2="120" y2="60" stroke="#eee" stroke-dasharray="3,3"/>
          <text x="60" y="80" font-size="64" font-family="Noto Sans SC, sans-serif" text-anchor="middle" fill="#E8344E">${escapeHtml(ch)}</text>
        </svg>
      `;
    }
  });
}

function animateActiveWriters() {
  if (state.activeWriters && state.activeWriters.length > 0) {
    state.activeWriters.forEach(w => w.animateCharacter());
  }
}

function splitActiveWord() {
  const word = state.activeWord;
  if (!word || word.length <= 1) return;
  const chars = [...word].filter(ch => /[\u4e00-\u9fff]/.test(ch));
  if (chars.length === 0) return;

  const badgesContainer = document.getElementById('sheet-badges');
  if (badgesContainer) {
    const existing = document.getElementById('split-chars-row');
    if (existing) {
      existing.remove();
      return;
    }
    const row = document.createElement('div');
    row.id = 'split-chars-row';
    row.style.cssText = 'display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-top:6px; width:100%;';
    let charButtonsHtml = `<span style="font-size:12px; color:var(--text-secondary);">${t('splitWord')}:</span>`;
    chars.forEach(ch => {
      charButtonsHtml += `<button class="btn btn-secondary btn-sm" style="padding:2px 10px; font-size:16px; font-family:var(--font-hanzi);" onclick="openWordSheet('${escapeHtml(ch)}')">${escapeHtml(ch)}</button>`;
    });
    row.innerHTML = charButtonsHtml;
    badgesContainer.appendChild(row);
  }
}

// ===== Module: AI Deep Word Analysis (AI 解析) =====
async function renderWordSheetAiSection(word) {
  const container = document.getElementById('sheet-ai-analysis-container');
  if (!container) return;

  const currentLang = state.meaningLang || 'vi';
  const cacheKey = `${currentLang}:${word}`;

  // 1. Kiểm tra cache RAM
  if (state.cachedAiAnalysis && (state.cachedAiAnalysis[cacheKey] || state.cachedAiAnalysis[word])) {
    renderAiAnalysisCard(container, word, state.cachedAiAnalysis[cacheKey] || state.cachedAiAnalysis[word]);
    return;
  }

  // 2. Kiểm tra cache IndexedDB
  try {
    let fromDb = await getFromDB('translations', 'ai_analysis:' + cacheKey);
    if (!fromDb) {
      fromDb = await getFromDB('translations', 'ai_analysis:' + word);
    }
    if (fromDb && fromDb.result) {
      if (!state.cachedAiAnalysis) state.cachedAiAnalysis = {};
      state.cachedAiAnalysis[cacheKey] = fromDb.result;
      if (state.activeWord === word) {
        renderAiAnalysisCard(container, word, fromDb.result);
      }
      return;
    }
  } catch (e) {}

  // 3. Chưa có cache -> Hiện khung mời gọi phân tích
  const teaserTexts = {
    vi: {
      title: 'AI Phân Tích Chuyên Sâu (AI 解析)',
      btn: '✨ Phân tích từ này',
      desc: 'Phân tích chuyên sâu sắc thái ngữ cảnh, khẩu ngữ/tiếng lóng mạng, câu ví dụ thực tế và phân biệt từ gần nghĩa cùng AI.'
    },
    ja: {
      title: 'AI 詳細分析 (AI 解析)',
      btn: '✨ AIで詳しく分析',
      desc: 'ニュアンス、ネットスラング/口語表現、実用例文、類義語の使い分けをAIが徹底解説します。'
    },
    en: {
      title: 'AI Deep Analysis (AI 解析)',
      btn: '✨ Analyze with AI',
      desc: 'Deep dive into nuances, colloquial/internet slang, real-life examples, and synonym distinctions with AI.'
    }
  };
  const tInfo = teaserTexts[currentLang] || teaserTexts.vi;

  container.innerHTML = `
    <div class="ai-word-card">
      <div class="ai-word-header">
        <div class="ai-word-title">
          <span>✨</span>
          <span>${escapeHtml(tInfo.title)}</span>
        </div>
        <button id="btn-trigger-ai-word" class="btn btn-primary btn-sm" onclick="analyzeActiveWordWithAi('${escapeQuotes(word)}')">
          ${escapeHtml(tInfo.btn)}
        </button>
      </div>
      <div style="padding:10px 14px; font-size:12.5px; color:var(--text-muted); line-height:1.45; background:var(--bg-surface);">
        ${escapeHtml(tInfo.desc)}
      </div>
    </div>
  `;

  // Automatic AI analysis only for words that are genuinely absent from every local
  // source. Known words keep the manual button, so we never spend tokens unnecessarily.
  const isUnknownWord = !MINI_DICT[word] &&
    !getSlangEntry(word) &&
    !(typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT && JA_COMMON_DICT[word]) &&
    !(typeof KANJI_DATA !== 'undefined' && KANJI_DATA && KANJI_DATA[word]);
  if (isUnknownWord && typeof autoAnalyzeWordWithAi === 'function') {
    autoAnalyzeWordWithAi(word, currentLang);
  }
}

function sanitizeAiError(msg) {
  if (!msg || typeof msg !== 'string') return '';
  return msg
    .replace(/(key=)[a-zA-Z0-9_\-\.]{8,}/gi, '$1[PROTECTED_KEY]')
    .replace(/AIza[0-9A-Za-z\-_]{35}/g, 'AIza[PROTECTED_KEY]')
    .replace(/AQ\.[a-zA-Z0-9_\-\.]{15,}/g, 'AQ.[PROTECTED_KEY]');
}

async function analyzeActiveWordWithAi(targetWord) {
  const word = targetWord || state.activeWord;
  if (!word) return;

  const container = document.getElementById('sheet-ai-analysis-container');
  if (!container) return;

  const currentLang = state.meaningLang || 'vi';
  const cacheKey = `${currentLang}:${word}`;

  const loadingTexts = {
    vi: {
      title: `Đang phân tích chuyên sâu "${escapeHtml(word)}"...`,
      desc: 'Đang bóc tách sắc thái, ngữ cảnh, từ loại, câu ví dụ và mẹo nhớ từ...'
    },
    ja: {
      title: `「${escapeHtml(word)}」をAI詳細分析中...`,
      desc: 'ニュアンス、品詞、実用例文、類義語の使い分けを分析しています...'
    },
    en: {
      title: `Deeply analyzing "${escapeHtml(word)}"...`,
      desc: 'Examining nuances, context, part of speech, examples, and memory tips...'
    }
  };
  const loadInfo = loadingTexts[currentLang] || loadingTexts.vi;

  container.innerHTML = `
    <div class="ai-word-card">
      <div class="ai-word-header">
        <div class="ai-word-title">
          <span class="spinner-small" style="display:inline-block; width:15px; height:15px; border:2px solid var(--accent); border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite;"></span>
          <span>${loadInfo.title}</span>
        </div>
      </div>
      <div style="padding:16px 14px; text-align:center; font-size:13px; color:var(--text-muted); font-style:italic;">
        ${loadInfo.desc}
      </div>
    </div>
  `;

  let errorDetail = '';

  // 1. Ưu tiên: Nếu người dùng đã lưu key trên máy (hoặc dán key), gọi Google trực tiếp luôn (siêu tốc ~300ms)
  const directKey = localStorage.getItem('cr_gemini_api_key');
  if (directKey) {
    try {
      const langPromptMap = {
        vi: `Bạn là trợ lý từ điển tiếng Trung cao cấp dành cho người Việt học tiếng Trung. Hãy phân tích chuyên sâu từ: "${word}".

Yêu cầu nội dung phân tích (bằng tiếng Việt):
1. Nghĩa tiếng Việt chính và các nghĩa phụ (nếu có).
2. Pinyin chuẩn và từ loại (danh từ, động từ, tính từ, từ lóng...).
3. Ngữ cảnh sử dụng, sắc thái (hài hước, tự trào, tiêu cực, tích cực...) và mức độ trang trọng (khẩu ngữ, mạng xã hội, văn viết, công sở...).
4. Hai đến ba câu ví dụ tiếng Trung kèm pinyin và bản dịch tiếng Việt thực tế.
5. Từ đồng nghĩa, trái nghĩa và sự khác biệt rõ nét trong cách dùng (so sánh sắc thái tinh tế).
6. Lỗi thường gặp của người học khi dùng từ này (nếu có).
7. Mẹo ghi nhớ từ vựng (chiết tự, hình ảnh, liên tưởng vui hoặc nguồn gốc từ).

YÊU CẦU BẮT BUỘC: Trả về ĐÚNG VÀ DUY NHẤT một chuỗi JSON hợp lệ theo schema sau (không kèm markdown bên ngoài):
{
  "word": "${word}",
  "pinyin": "phiên âm pinyin",
  "partOfSpeech": "từ loại",
  "primaryMeaning": "nghĩa tiếng Việt chính",
  "secondaryMeanings": ["nghĩa phụ 1"],
  "nuanceAndUsage": "ngữ cảnh sử dụng và sắc thái",
  "formality": "mức độ trang trọng (khẩu ngữ / mạng xã hội / trang trọng...)",
  "examples": [
    {
      "zh": "câu tiếng Trung ví dụ 1",
      "pinyin": "pinyin của câu",
      "vi": "bản dịch tiếng Việt thực tế"
    }
  ],
  "synonymsAndDifferences": [
    {
      "word": "từ gần nghĩa kèm pinyin",
      "diff": "sự khác biệt về sắc thái và cách dùng"
    }
  ],
  "commonMistakes": "lỗi người học hay mắc phải nếu có",
  "memoryTip": "mẹo ghi nhớ từ vựng"
}`,
        ja: `あなたは中国語学習者向けの高度な辞書AIアシスタントです。単語「${word}」を詳細に分析してください。

分析内容（日本語で回答）：
1. 主な日本語の意味と副次的意味（あれば）。
2. 標準ピンインと品詞（名詞、動詞、形容詞、ネットスラングなど）。
3. 使用コンテキスト、ニュアンス（ユーモア、自嘲、否定的、肯定的など）、フォーマリティ（口語、ネットスラング、書き言葉、ビジネスなど）。
4. 2〜3つの中国語実用例文（ピンインと日本語訳付き）。
5. 類義語・反義語と使用上の明確な違い（微妙なニュアンスの比較）。
6. 学習者がよく犯す間違いや注意点。
7. 記憶のヒント（漢字の成り立ち、連想、語源など）。

必ず以下のJSONスキーマのみを出力してください（Markdown記法や余計な文字は不要）:
{
  "word": "${word}",
  "pinyin": "ピンイン",
  "partOfSpeech": "品詞",
  "primaryMeaning": "主な日本語の意味",
  "secondaryMeanings": ["副次的意味"],
  "nuanceAndUsage": "ニュアンスと使い方",
  "formality": "フォーマリティ（口語/ネットスラング/フォーマル等）",
  "examples": [
    {
      "zh": "中国語例文",
      "pinyin": "ピンイン",
      "vi": "日本語訳"
    }
  ],
  "synonymsAndDifferences": [
    {
      "word": "類義語（ピンイン付き）",
      "diff": "ニュアンスの違い"
    }
  ],
  "commonMistakes": "よくある誤用や注意点",
  "memoryTip": "記憶のヒント"
}`,
        en: `You are an advanced Chinese dictionary AI assistant for learners. Thoroughly analyze the word: "${word}".

Requirements (respond in English):
1. Primary English meaning and secondary meanings (if any).
2. Standard Pinyin and Part of Speech (noun, verb, adjective, slang, etc.).
3. Usage context, nuances (humorous, self-deprecating, negative, positive...) and formality level (colloquial, internet slang, formal, business...).
4. 2 to 3 practical Chinese example sentences with Pinyin and natural English translations.
5. Synonyms, antonyms, and subtle differences in usage/nuance.
6. Common mistakes made by learners.
7. Memory tip or mnemonics (etymology, character breakdown, vivid association).

Return ONLY valid JSON matching this schema (no markdown wrappers):
{
  "word": "${word}",
  "pinyin": "pinyin pronunciation",
  "partOfSpeech": "part of speech",
  "primaryMeaning": "primary English meaning",
  "secondaryMeanings": ["secondary meaning"],
  "nuanceAndUsage": "context and nuance explanation",
  "formality": "formality level (colloquial / slang / formal...)",
  "examples": [
    {
      "zh": "Chinese sentence",
      "pinyin": "sentence pinyin",
      "vi": "English translation"
    }
  ],
  "synonymsAndDifferences": [
    {
      "word": "synonym with pinyin",
      "diff": "nuance and usage difference"
    }
  ],
  "commonMistakes": "common mistakes",
  "memoryTip": "memory tip or mnemonic"
}`
      };

      const prompt = langPromptMap[currentLang] || langPromptMap.vi;
      const CANDIDATE_MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
      let res = null;

      for (const mName of CANDIDATE_MODELS) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${mName}:generateContent?key=${encodeURIComponent(directKey.trim())}`;
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2048,
              responseMimeType: 'application/json'
            }
          })
        });
        if (resp.ok) {
          res = resp;
          break;
        } else {
          const errData = await resp.json().catch(() => null);
          errorDetail = errData?.error?.message || `Google API Error: HTTP ${resp.status}`;
        }
      }

      if (res && res.ok) {
        const data = await res.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        const analysis = JSON.parse(cleanJson);
        if (!state.cachedAiAnalysis) state.cachedAiAnalysis = {};
        state.cachedAiAnalysis[cacheKey] = analysis;
        await putToDB('translations', { q: 'ai_analysis:' + cacheKey, result: analysis });
        if (state.activeWord === word) {
          renderAiAnalysisCard(container, word, analysis);
        }
        return;
      }
    } catch (e) {
      errorDetail = e.message || tx('Lỗi khi gọi trực tiếp Google API', 'Direct Google API call failed', 'Google APIの直接呼び出しに失敗しました');
    }
  }

  // 2. Thử gọi backend /api/translate (nếu chưa có directKey hoặc directKey lỗi)
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: word,
        targetLang: currentLang,
        type: 'analyze_word'
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.analysis) {
        const analysis = data.analysis;
        if (!state.cachedAiAnalysis) state.cachedAiAnalysis = {};
        state.cachedAiAnalysis[cacheKey] = analysis;
        await putToDB('translations', { q: 'ai_analysis:' + cacheKey, result: analysis });
        if (state.activeWord === word) {
          renderAiAnalysisCard(container, word, analysis);
        }
        return;
      }
      errorDetail = tx('Phản hồi từ AI không đúng cấu trúc.', 'Unexpected AI response structure.', 'AI応答の構造が不正です。');
    } else {
      const errJson = await res.json().catch(() => null);
      errorDetail = errJson?.error || errJson?.details || tx(`Lỗi máy chủ HTTP ${res.status} (${res.statusText})`, `Server error HTTP ${res.status} (${res.statusText})`, `サーバーエラー HTTP ${res.status} (${res.statusText})`);
    }
  } catch (netErr) {
    if (!errorDetail) errorDetail = netErr.message || 'Không thể kết nối đến máy chủ';
  }

  // 3. Nếu vẫn không được, hiển thị chi tiết lỗi kèm ô dán key trực tiếp
  if (state.activeWord === word) {
    const safeError = sanitizeAiError(errorDetail);
    container.innerHTML = `
      <div class="ai-word-card" style="border-color:rgba(239, 68, 68, 0.4);">
        <div class="ai-word-header" style="background:rgba(239, 68, 68, 0.08);">
          <div class="ai-word-title" style="color:#DC2626;">
            <span>⚠️</span>
            <span>${tx('Chưa thể kết nối AI', 'Cannot connect to AI', 'AIに接続できません')}</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="analyzeActiveWordWithAi('${escapeQuotes(word)}')">
            ↺ ${tx('Thử lại', 'Retry', '再試行')}
          </button>
        </div>
        <div style="padding:12px 14px; font-size:13px; color:var(--text-primary); line-height:1.5;">
          <div style="background:rgba(239, 68, 68, 0.06); padding:8px 10px; border-radius:6px; font-family:monospace; font-size:12px; color:#DC2626; margin-bottom:10px; word-break:break-all;">
            ${tx('Chi tiết lỗi:', 'Error details:', 'エラー詳細:')} ${escapeHtml(safeError)}
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
            ${tx('💡 <b>Gợi ý xử lý:</b> Bạn có thể dán trực tiếp mã API Key vào ô dưới để kích hoạt tính năng AI trực tiếp trên trình duyệt:', '💡 <b>Tip:</b> You can paste your API Key below to enable AI analysis directly in your browser:', '💡 <b>ヒント:</b> 下の入力欄にAPI Keyを直接貼り付けると、ブラウザ上でAI分析機能を有効化できます:')}
          </div>
          <div style="display:flex; gap:6px;">
            <input type="password" id="inline-gemini-key" placeholder="${tx('Dán mã API Key vào đây', 'Paste API Key here', 'ここにAPI Keyを貼り付け')}" class="textarea-box" style="padding:6px 10px; font-size:12.5px; height:34px; flex:1; border:1px solid var(--border-color); border-radius:6px;" value="${escapeHtml(directKey || '')}">
            <button class="btn btn-primary btn-sm" onclick="saveInlineGeminiKey('${escapeQuotes(word)}')" style="white-space:nowrap;">
              ${tx('Lưu & Dịch ngay', 'Save & Translate', '保存して翻訳')}
            </button>
          </div>
          <div style="margin-top:10px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="runAiDiagnostic('${escapeQuotes(word)}')" style="font-size:12px; padding:4px 10px;">
              🔍 ${tx('Bấm vào đây để Chẩn đoán lỗi tự động', 'Run Auto Diagnostics', '自動診断を実行')}
            </button>
            <div id="ai-debug-output" style="display:none; margin-top:8px; padding:10px; background:#1e1e1e; color:#eee; font-family:monospace; font-size:11.5px; border-radius:6px; max-height:220px; overflow:auto; white-space:pre-wrap; line-height:1.4;"></div>
          </div>
        </div>
      </div>
    `;
  }
}

function saveInlineGeminiKey(word) {
  const inp = document.getElementById('inline-gemini-key');
  if (!inp || !inp.value.trim()) {
    showToast('Vui lòng dán mã API Key');
    return;
  }
  const key = inp.value.trim();
  localStorage.setItem('cr_gemini_api_key', key);
  showToast('Đã lưu API Key vào trình duyệt!');
  analyzeActiveWordWithAi(word);
}

async function runAiDiagnostic(word) {
  const out = document.getElementById('ai-debug-output');
  if (!out) return;
  out.style.display = 'block';
  out.textContent = '⏳ Đang kiểm tra hệ thống...\n';

  const log = (msg) => {
    out.textContent += msg + '\n';
  };

  // 1. Kiểm tra Cloudflare /api/translate
  log('1. Kiểm tra máy chủ Cloudflare (/api/translate)...');
  try {
    const t0 = Date.now();
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: '你好', targetLang: state.meaningLang || 'vi', type: 'lenses' })
    });
    log(`   -> Trạng thái HTTP: ${res.status} ${res.statusText} (${Date.now() - t0}ms)`);
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      if (res.ok) {
        log('   -> Cloudflare backend: HOẠT ĐỘNG TỐT (OK)');
      } else {
        log(`   -> Lỗi từ Cloudflare: ${sanitizeAiError(json.error || text)}`);
        if (json.details) log(`   -> Chi tiết: ${sanitizeAiError(json.details)}`);
      }
    } catch (e) {
      log(`   -> Phản hồi: ${sanitizeAiError(text.slice(0, 150))}`);
    }
  } catch (err) {
    log(`   -> Lỗi kết nối mạng: ${sanitizeAiError(err.message)}`);
  }

  // 2. Kiểm tra key trực tiếp nếu có
  const directKey = localStorage.getItem('cr_gemini_api_key');
  log('\n2. Kiểm tra API Key trực tiếp...');
  if (!directKey) {
    log('   -> Chưa dán key vào ô phía trên (cr_gemini_api_key rỗng).');
    log('   -> Hãy dán mã API Key vào ô rồi bấm "Lưu & Dịch ngay".');
  } else {
    log(`   -> Đã tìm thấy key: ${directKey.slice(0, 6)}...${directKey.slice(-4)}`);
    try {
      const t0 = Date.now();
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(directKey.trim())}`;
      const resp = await fetch(listUrl);
      log(`   -> Google ListModels HTTP: ${resp.status} ${resp.statusText} (${Date.now() - t0}ms)`);
      const body = await resp.json();
      if (resp.ok) {
        const models = (body.models || []).map(m => m.name.replace('models/', ''));
        log(`   -> Key hợp lệ! Danh sách model khả dụng: ${models.slice(0, 5).join(', ')}...`);
      } else {
        log(`   -> Lỗi từ Google: ${sanitizeAiError(body?.error?.message || JSON.stringify(body))}`);
      }
    } catch (e) {
      log(`   -> Không thể gọi Google: ${sanitizeAiError(e.message)}`);
    }
  }
}

function renderAiAnalysisCard(container, word, data) {
  const currentLang = state.meaningLang || 'vi';

  const i18nTitles = {
    vi: {
      header: 'AI Phân Tích Chuyên Sâu (AI 解析)',
      refresh: 'Làm mới phân tích',
      listen: 'Phát âm',
      examples: '💡 Ví dụ thực tế',
      synonyms: '⚖️ Phân biệt từ gần nghĩa & Sắc thái',
      meaning: '📖 Nghĩa tiếng Việt',
      secondary: 'Nghĩa phụ:',
      nuance: '🎭 Sắc thái & Cách dùng',
      mistakes: '⚠️ Lưu ý & Lỗi thường gặp',
      tip: '🧠 Mẹo ghi nhớ từ vựng'
    },
    ja: {
      header: 'AI 詳細分析 (AI 解析)',
      refresh: '分析を更新',
      listen: '発音',
      examples: '💡 実用例文',
      synonyms: '⚖️ 類義語の使い分けとニュアンス',
      meaning: '📖 日本語の意味',
      secondary: '副次的意味:',
      nuance: '🎭 ニュアンス・使用場面',
      mistakes: '⚠️ 注意点・よくある間違い',
      tip: '🧠 記憶のコツ・語源'
    },
    en: {
      header: 'AI Deep Analysis (AI 解析)',
      refresh: 'Refresh analysis',
      listen: 'Listen',
      examples: '💡 Practical Examples',
      synonyms: '⚖️ Synonyms & Usage Nuances',
      meaning: '📖 English Meaning',
      secondary: 'Secondary meanings:',
      nuance: '🎭 Nuance & Context',
      mistakes: '⚠️ Common Mistakes & Pitfalls',
      tip: '🧠 Memory Tip & Mnemonics'
    }
  };
  const labels = i18nTitles[currentLang] || i18nTitles.vi;

  let examplesHtml = '';
  if (Array.isArray(data.examples) && data.examples.length > 0) {
    examplesHtml = `
      <div>
        <div class="ai-word-section-title">${escapeHtml(labels.examples)}</div>
        <div class="ai-word-examples-list">
          ${data.examples.map(ex => {
            const exTrans = ex.vi || ex.ja || ex.en || ex.translation || ex.meaning || '';
            return `
            <div class="ai-word-example-item">
              <div class="ai-word-ex-zh">
                <span>${escapeHtml(ex.zh)}</span>
                <button type="button" class="icon-btn" style="width:26px; height:26px; font-size:13px;" onclick="speakText('${escapeQuotes(ex.zh)}')" title="${escapeHtml(labels.listen)}">
                  🔊
                </button>
              </div>
              ${ex.pinyin ? `<div class="ai-word-ex-py">${escapeHtml(ex.pinyin)}</div>` : ''}
              ${exTrans ? `<div class="ai-word-ex-vi">${escapeHtml(exTrans)}</div>` : ''}
            </div>
          `;}).join('')}
        </div>
      </div>
    `;
  }

  let synonymsHtml = '';
  if (Array.isArray(data.synonymsAndDifferences) && data.synonymsAndDifferences.length > 0) {
    synonymsHtml = `
      <div>
        <div class="ai-word-section-title">${escapeHtml(labels.synonyms)}</div>
        <div>
          ${data.synonymsAndDifferences.map(syn => `
            <div class="ai-word-diff-item">
              <b style="color:var(--accent);">${escapeHtml(syn.word)}:</b>
              <span style="color:var(--text-secondary); margin-left:4px;">${escapeHtml(syn.diff)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="ai-word-card">
      <div class="ai-word-header">
        <div class="ai-word-title">
          <span>✨</span>
          <span>${escapeHtml(labels.header)}</span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          ${data.formality ? `<span class="badge" style="background:rgba(59,130,246,0.12); color:#2563EB; font-weight:600;">${escapeHtml(data.formality)}</span>` : ''}
          <button type="button" class="icon-btn" style="width:26px; height:26px; font-size:11px;" onclick="analyzeActiveWordWithAi('${escapeQuotes(word)}')" title="${escapeHtml(labels.refresh)}">
            ↺
          </button>
        </div>
      </div>
      <div class="ai-word-body">
        <!-- Meaning & Part of speech -->
        <div>
          <div class="ai-word-section-title">
            <span>${escapeHtml(labels.meaning)}</span>
            ${data.partOfSpeech ? `<span style="font-weight:400; text-transform:none; color:var(--text-secondary);">(${escapeHtml(data.partOfSpeech)})</span>` : ''}
          </div>
          <div class="ai-word-meaning-box">
            <b>${escapeHtml(data.primaryMeaning || '')}</b>
            ${Array.isArray(data.secondaryMeanings) && data.secondaryMeanings.length > 0 ? `
              <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">
                ${escapeHtml(labels.secondary)} ${data.secondaryMeanings.map(m => escapeHtml(m)).join(' • ')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Nuance & Usage -->
        ${data.nuanceAndUsage ? `
          <div>
            <div class="ai-word-section-title">${escapeHtml(labels.nuance)}</div>
            <div class="ai-word-nuance-box">
              ${escapeHtml(data.nuanceAndUsage)}
            </div>
          </div>
        ` : ''}

        <!-- Examples -->
        ${examplesHtml}

        <!-- Synonyms / Differences -->
        ${synonymsHtml}

        <!-- Common mistakes -->
        ${data.commonMistakes ? `
          <div>
            <div class="ai-word-section-title">${escapeHtml(labels.mistakes)}</div>
            <div class="ai-word-mistake-box">
              ${escapeHtml(data.commonMistakes)}
            </div>
          </div>
        ` : ''}

        <!-- Memory tips -->
        ${data.memoryTip ? `
          <div>
            <div class="ai-word-section-title">${escapeHtml(labels.tip)}</div>
            <div class="ai-word-tip-box">
              ${escapeHtml(data.memoryTip)}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Speak the meaning in the language the user is currently reading it in.
// Until now the sheet could only pronounce the Chinese headword.
function speakActiveMeaning() {
  const word = (typeof state !== 'undefined' && state.activeWord) ? state.activeWord : '';
  if (!word) return;
  const lang = (state.meaningLang || 'vi');

  let text = '';
  try {
    const userDict = (typeof getUserDict === 'function') ? getUserDict() : {};
    text = userDict[lang + ':' + word] || '';
  } catch (e) {}

  const entry = (typeof MINI_DICT !== 'undefined' && MINI_DICT) ? MINI_DICT[word] : null;
  if (!text && entry) {
    if (lang === 'en') {
      text = entry.en ? (Array.isArray(entry.en) ? entry.en.join(', ') : entry.en) : '';
    } else if (lang === 'ja') {
      text = entry.ja || (typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT ? (JA_COMMON_DICT[word] || '') : '');
    } else {
      text = entry.vi || '';
    }
  }

  if (!text && state.cachedTranslations) {
    text = state.cachedTranslations[lang + ':' + word] || '';
  }

  if (!text) {
    if (typeof showToast === 'function') {
      showToast(tx('Chưa có nghĩa để đọc', 'No meaning to read yet', '読む意味がまだありません'));
    }
    return;
  }

  if (typeof speakInLanguage === 'function') {
    speakInLanguage(text, lang);
  }
}
