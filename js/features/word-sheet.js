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
    badgesContainer.innerHTML += `<span class="badge badge-hsk">HSK ${dictEntry.hsk}</span>`;
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
                const fallback = (dictEntry && dictEntry.en && dictEntry.en.join('; ')) || (dictEntry && dictEntry.vi) || '';
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

  // External Dictionary Links
  const extContainer = document.getElementById('sheet-external-links');
  if (extContainer) {
    extContainer.innerHTML = `
      <a class="btn btn-secondary btn-sm" href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(word)}" target="_blank" rel="noopener">MDBG</a>
      <a class="btn btn-secondary btn-sm" href="https://translate.google.com/?sl=zh-CN&tl=${state.meaningLang}&text=${encodeURIComponent(word)}" target="_blank" rel="noopener">Google</a>
      <a class="btn btn-secondary btn-sm" href="https://hanzii.net/search/word/${encodeURIComponent(word)}" target="_blank" rel="noopener">Hanzii</a>
      <a class="btn btn-secondary btn-sm" href="https://jisho.org/search/${encodeURIComponent(word)}" target="_blank" rel="noopener">Jisho</a>
      <a class="btn btn-secondary btn-sm" href="https://baike.baidu.com/item/${encodeURIComponent(word)}" target="_blank" rel="noopener">Baidu</a>
    `;
  }

  // Render Hanzi Writer
  renderHanziWriterForWord(word);

  // Extra: synonyms, slang, Wiktionary, media
  try { enrichWordSheet(word); } catch (e) { console.warn(e); }

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
