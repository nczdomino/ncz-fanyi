// js/features/dict.js - Dictionary view, radical browser, compounds search and history - Dependencies: js/core/state.js, js/core/storage.js, js/core/utils.js, js/data/mini-dict.js, js/data/slang-data.js, js/features/nlp.js, js/features/word-sheet.js

function getWordMeasureWord(word) {
  if (!word || typeof MEASURE_WORDS === 'undefined') return null;
  const direct = MEASURE_WORDS[word];
  if (direct) {
    return {
      mw: direct.mw,
      label: tx(`Lượng từ: ${direct.mw} (${direct.vi})`, `Measure: ${direct.mw}`, `量詞: ${direct.mw}`)
    };
  }
  for (const k of Object.keys(MEASURE_WORDS)) {
    if (word.length > k.length && word.endsWith(k)) {
      const it = MEASURE_WORDS[k];
      return {
        mw: it.mw,
        label: tx(`Lượng từ: ${it.mw} (${it.vi})`, `Measure: ${it.mw}`, `量詞: ${it.mw}`)
      };
    }
  }
  return null;
}

function getWordRadical(char) {
  if (!char || char.length !== 1 || typeof RADICALS_DATA === 'undefined') return null;
  for (const r of RADICALS_DATA) {
    if (r.chars && r.chars.includes(char)) {
      return {
        radical: r.r,
        name: `Bộ ${r.name || r.r}`
      };
    }
  }
  return null;
}

function getCompoundWords(targetWord) {
  if (!targetWord) return [];
  const chars = [...targetWord].filter(c => /[\u4e00-\u9fff]/.test(c));
  if (!chars.length) return [];
  const results = [];
  const seen = new Set([targetWord]);

  for (const w of Object.keys(MINI_DICT)) {
    if (seen.has(w)) continue;
    const matches = targetWord.length === 1 ? w.includes(targetWord) : chars.some(c => w.includes(c));
    if (matches && w.length <= 4) {
      seen.add(w);
      const e = MINI_DICT[w];
      results.push({
        word: w,
        pinyin: e.pinyin || '',
        vi: e.vi || '',
        en: (e.en && e.en[0]) || '',
        ja: e.ja || '',
        hsk: e.hsk || null
      });
      if (results.length >= 14) break;
    }
  }

  if (results.length < 14 && typeof SLANG_MAP !== 'undefined') {
    for (const w of Object.keys(SLANG_MAP)) {
      if (seen.has(w)) continue;
      if (chars.some(c => w.includes(c)) && w.length <= 6) {
        seen.add(w);
        const s = SLANG_MAP[w];
        results.push({
          word: w,
          pinyin: s.pinyin || '',
          vi: s.vi || '',
          en: (s.en && (Array.isArray(s.en) ? s.en[0] : s.en)) || '',
          ja: s.ja || '',
          isSlang: true
        });
        if (results.length >= 14) break;
      }
    }
  }

  results.sort((a, b) => {
    if (a.word.startsWith(targetWord)) return -1;
    if (b.word.startsWith(targetWord)) return 1;
    return (a.hsk || 99) - (b.hsk || 99);
  });
  return results.slice(0, 12);
}

function renderWordCompounds(word) {
  const container = document.getElementById('sheet-compounds-section');
  if (!container) return;
  const compounds = getCompoundWords(word);
  if (!compounds || !compounds.length) {
    container.innerHTML = '';
    return;
  }
  const lang = state.meaningLang || 'vi';
  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <div class="def-label" style="margin-bottom:0;">🌳 ${t('relatedCompounds') || tx('Từ ghép liên quan (Họ từ vựng)', 'Related Compound Words', '関連する複合語')}</div>
      <span style="font-size:11px; color:var(--text-muted);">${compounds.length} ${tx('từ ghép', 'compounds', '語')}</span>
    </div>
    <div class="dict-compounds-grid">
  `;
  for (const c of compounds) {
    const m = (lang === 'vi' ? c.vi : (lang === 'ja' ? (c.ja || c.vi) : c.en)) || '';
    html += `
      <div class="dict-compound-chip" onclick="openWordSheet('${escapeQuotes(c.word)}')">
        <div style="display:flex; align-items:baseline; gap:6px;">
          <b class="compound-zh">${escapeHtml(c.word)}</b>
          <span class="compound-py">${escapeHtml(c.pinyin)}</span>
          ${c.hsk ? `<span class="badge-mini-hsk">HSK ${c.hsk}</span>` : ''}
        </div>
        ${m ? `<div class="compound-meaning">${escapeHtml(m)}</div>` : ''}
      </div>
    `;
  }
  html += `</div>`;
  container.innerHTML = html;
}

// Recent searches logic
function getRecentSearches() {
  try {
    const list = JSON.parse(localStorage.getItem('cr_recent_searches') || '[]');
    return Array.isArray(list) ? list : [];
  } catch (e) { return []; }
}

function addRecentSearch(word) {
  if (!word || typeof word !== 'string') return;
  const clean = word.trim();
  if (!clean || clean.length > 20) return;
  let list = getRecentSearches();
  list = list.filter(w => w !== clean);
  list.unshift(clean);
  if (list.length > 15) list = list.slice(0, 15);
  localStorage.setItem('cr_recent_searches', JSON.stringify(list));
}

function removeRecentSearch(word, e) {
  if (e) e.stopPropagation();
  let list = getRecentSearches();
  list = list.filter(w => w !== word);
  localStorage.setItem('cr_recent_searches', JSON.stringify(list));
  renderRecentSearches();
}

function clearRecentSearches() {
  localStorage.removeItem('cr_recent_searches');
  renderRecentSearches();
}

function renderRecentSearches() {
  const box = document.getElementById('dict-recent-box');
  const container = document.getElementById('dict-recent-chips');
  if (!box || !container) return;
  const list = getRecentSearches();
  if (!list.length || state.searchQuery) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'block';
  container.innerHTML = list.map(w => `
    <span class="dict-recent-chip" onclick="quickSearchDict('${escapeQuotes(w)}')">
      <span class="recent-chip-word">${escapeHtml(w)}</span>
      <span class="recent-chip-del" onclick="removeRecentSearch('${escapeQuotes(w)}', event)" title="Xóa">✕</span>
    </span>
  `).join('');
}

// Radical Browser in Dict View
function toggleRadicalBrowser() {
  state.showRadicalBrowser = !state.showRadicalBrowser;
  renderRadicalBrowser();
}

function selectRadicalFilter(radChar) {
  if (state.selectedRadical === radChar) {
    state.selectedRadical = null;
  } else {
    state.selectedRadical = radChar;
  }
  renderRadicalBrowser();
  renderDictView();
}

function renderRadicalBrowser() {
  const content = document.getElementById('dict-radical-content');
  const chevron = document.getElementById('dict-radical-chevron');
  const toggleBtn = document.getElementById('dict-radical-toggle-btn');
  const grid = document.getElementById('dict-radical-grid');
  if (!content || !grid) return;

  if (state.showRadicalBrowser) {
    content.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    if (toggleBtn) toggleBtn.classList.add('expanded');

    grid.innerHTML = RADICALS_DATA.map(r => {
      const isAct = state.selectedRadical === r.r;
      return `
        <div class="radical-item-chip ${isAct ? 'active' : ''}" onclick="selectRadicalFilter('${escapeQuotes(r.r)}')">
          <b class="rad-char">${escapeHtml(r.r)}</b>
          <span class="rad-name">${escapeHtml(r.name.split(' ')[0])}</span>
        </div>
      `;
    }).join('');
  } else {
    content.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
    if (toggleBtn) toggleBtn.classList.remove('expanded');
  }
}

// --- Module: Word Sheet Modal & Hanzi Writer ---

// --- Module: Dictionary View ---
function removeToneMarks(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ü/g, 'v');
}

function toggleHskBrowser() {
  state.showHskBrowser = !state.showHskBrowser;
  renderDictView();
}

function clearDictSearch() {
  state.searchQuery = '';
  const input = document.getElementById('dict-search-input');
  if (input) {
    input.value = '';
    if (typeof input.focus === 'function') input.focus();
  }
  renderDictView();
}

function quickSearchDict(word) {
  state.searchQuery = word;
  const input = document.getElementById('dict-search-input');
  if (input) input.value = word;
  renderDictView();
}

function renderDictView() {
  const container = document.getElementById('dict-results-container');
  const viewContainer = document.getElementById('dict-view-container');
  const heroHeader = document.getElementById('dict-hero-header');
  const quickTags = document.getElementById('dict-quick-tags');
  const hskAccordion = document.getElementById('dict-hsk-accordion');
  const hskContent = document.getElementById('dict-hsk-content');
  const hskToggleBtn = document.getElementById('dict-hsk-toggle-btn');
  const hskChevron = document.getElementById('dict-hsk-chevron');
  const searchInput = document.getElementById('dict-search-input');
  const clearBtn = document.getElementById('dict-search-clear');
  if (!container) return;

  const query = state.searchQuery.trim().toLowerCase();
  const cleanQuery = removeToneMarks(query).replace(/\s+/g, '');
  const filterHSK = state.dictFilterHSK;
  const isBrowsingHsk = state.showHskBrowser;

  // Toggle clear button
  if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';

  // Synchronize input value if needed
  if (searchInput && searchInput.value !== state.searchQuery) {
    searchInput.value = state.searchQuery;
  }

  // Update Accordion UI
  if (hskContent && hskChevron && hskToggleBtn) {
    if (isBrowsingHsk) {
      hskContent.style.display = 'block';
      hskChevron.style.transform = 'rotate(180deg)';
      hskToggleBtn.classList.add('expanded');
    } else {
      hskContent.style.display = 'none';
      hskChevron.style.transform = 'rotate(0deg)';
      hskToggleBtn.classList.remove('expanded');
    }
  }

  // Search query vs browsing
  if (query) {
    if (quickTags) quickTags.style.display = 'none';
    if (hskAccordion) hskAccordion.style.display = 'none';
    const radAcc = document.getElementById('dict-radical-accordion');
    if (radAcc) radAcc.style.display = 'none';
    const recBox = document.getElementById('dict-recent-box');
    if (recBox) recBox.style.display = 'none';
  } else {
    // No search query
    if (quickTags) quickTags.style.display = 'flex';
    if (hskAccordion) hskAccordion.style.display = 'block';
    const radAcc = document.getElementById('dict-radical-accordion');
    if (radAcc) radAcc.style.display = 'block';

    renderRecentSearches();
    renderRadicalBrowser();

    if (!isBrowsingHsk && !state.selectedRadical) {
      container.innerHTML = '';
      return; // Do NOT dump words by default! Keep clean!
    }
  }

  // Query or Browse mode: Find matches
  let matches = [];
  const seenWords = new Set();

  if (state.selectedRadical && !query) {
    const radItem = (typeof RADICALS_DATA !== 'undefined') ? RADICALS_DATA.find(r => r.r === state.selectedRadical) : null;
    if (radItem) {
      const charSet = new Set([...radItem.chars]);
      for (const w of Object.keys(MINI_DICT)) {
        if ([...w].some(c => charSet.has(c))) {
          matches.push({ word: w, ...MINI_DICT[w] });
          seenWords.add(w);
          if (matches.length >= 80) break;
        }
      }
    }
  } else if (filterHSK === 'slang') {
    const allSlang = (ENRICH.remote || []).concat(SLANG_BUILTIN || []);
    for (const it of allSlang) {
      if (!it || !it.w || seenWords.has(it.w)) continue;
      seenWords.add(it.w);
      const sItem = {
        word: it.w,
        pinyin: it.py || '',
        vi: it.vi || '',
        en: it.en ? (Array.isArray(it.en) ? it.en : [it.en]) : [],
        ja: it.ja || '',
        hanviet: getWordHanViet(it.w),
        type: 'slang',
        isSlang: true
      };
      if (!query) {
        matches.push(sItem);
        continue;
      }
      const matchesHanzi = it.w.toLowerCase().includes(query) || (it.alias && it.alias.some(a => a.toLowerCase().includes(query)));
      const cleanPinyin = removeToneMarks((it.py || '').toLowerCase()).replace(/\s+/g, '');
      const matchesPinyin = (it.py || '').toLowerCase().includes(query) || cleanPinyin.includes(cleanQuery);
      const matchesVi = it.vi && it.vi.toLowerCase().includes(query);
      const matchesEn = it.en && (Array.isArray(it.en) ? it.en.some(e => e.toLowerCase().includes(query)) : it.en.toLowerCase().includes(query));
      if (matchesHanzi || matchesPinyin || matchesVi || matchesEn) {
        matches.push(sItem);
      }
    }
  } else {
    const allWords = Object.keys(MINI_DICT);
    for (const w of allWords) {
      const entry = MINI_DICT[w];
      if (filterHSK !== 'all' && String(entry.hsk) !== filterHSK) {
        continue;
      }
      if (!query) {
        matches.push({ word: w, ...entry });
        seenWords.add(w);
        if (matches.length >= 80) break;
        continue;
      }

      const matchesHanzi = w.includes(query);
      const cleanPinyin = removeToneMarks(entry.pinyin.toLowerCase()).replace(/\s+/g, '');
      const matchesPinyin = entry.pinyin.toLowerCase().includes(query) || cleanPinyin.includes(cleanQuery);
      const matchesVi = entry.vi && entry.vi.toLowerCase().includes(query);
      const matchesEn = entry.en && entry.en.some(e => e.toLowerCase().includes(query));
      const matchesHanViet = entry.hanviet && entry.hanviet.toLowerCase().includes(query);

      const kanjiEntry = KANJI_DATA[w];
      const matchesJa = kanjiEntry && (
        (kanjiEntry.on && kanjiEntry.on.toLowerCase().includes(query)) ||
        (kanjiEntry.kun && kanjiEntry.kun.toLowerCase().includes(query)) ||
        (kanjiEntry.ja_meaning && kanjiEntry.ja_meaning.toLowerCase().includes(query))
      );

      if (matchesHanzi || matchesPinyin || matchesVi || matchesEn || matchesHanViet || matchesJa) {
        matches.push({ word: w, ...entry });
        seenWords.add(w);
        if (matches.length >= 80) break;
      }
    }

    if (query && filterHSK === 'all') {
      const allSlang = (ENRICH.remote || []).concat(SLANG_BUILTIN || []);
      for (const it of allSlang) {
        if (!it || !it.w || seenWords.has(it.w)) continue;
        const matchesHanzi = it.w.toLowerCase().includes(query) || (it.alias && it.alias.some(a => a.toLowerCase().includes(query)));
        const cleanPinyin = removeToneMarks((it.py || '').toLowerCase()).replace(/\s+/g, '');
        const matchesPinyin = (it.py || '').toLowerCase().includes(query) || cleanPinyin.includes(cleanQuery);
        const matchesVi = it.vi && it.vi.toLowerCase().includes(query);
        const matchesEn = it.en && (Array.isArray(it.en) ? it.en.some(e => e.toLowerCase().includes(query)) : it.en.toLowerCase().includes(query));
        if (matchesHanzi || matchesPinyin || matchesVi || matchesEn) {
          seenWords.add(it.w);
          matches.push({
            word: it.w,
            pinyin: it.py || '',
            vi: it.vi || '',
            en: it.en ? (Array.isArray(it.en) ? it.en : [it.en]) : [],
            ja: it.ja || '',
            hanviet: getWordHanViet(it.w),
            type: 'slang',
            isSlang: true
          });
          if (matches.length >= 100) break;
        }
      }
    }
  }

  // Sort: exact matches first
  matches.sort((a, b) => {
    if (a.word === query) return -1;
    if (b.word === query) return 1;
    return 0;
  });

  // Update HSK count label if browsing
  const countEl = document.getElementById('dict-hsk-count');
  if (countEl && isBrowsingHsk && !query) {
    const levelLabel = filterHSK === 'slang' ? (t('hskSlang') || '🔥 Từ lóng Slang') : (filterHSK === 'all' ? t('hskAll') : 'HSK ' + filterHSK);
    countEl.textContent = `${t('hskLevel')}: ${levelLabel} (${matches.length} ${t('words') || 'từ'})`;
  }

  if (matches.length === 0) {
    const noMatchSub = state.uiLang === 'ja'
      ? `「${escapeHtml(query)}」に一致する単語が見つかりませんでした`
      : (state.uiLang === 'en'
        ? `No words found matching "${escapeHtml(query)}"`
        : `Không tìm thấy từ nào khớp với "${escapeHtml(query)}"`);
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px 20px; border-radius:var(--radius-lg); margin-top:10px;">
        <div style="font-size:36px; margin-bottom:8px;">🔍</div>
        <div style="font-size:16px; font-weight:600; color:var(--text-secondary);">${t('noResults')}</div>
        <div style="font-size:13.5px; color:var(--text-muted); margin-top:4px;">${noMatchSub}</div>
        <button class="btn btn-primary" style="margin-top:16px; border-radius:20px; padding:8px 20px;" onclick="searchOnline('${escapeQuotes(query)}')">
          🌐 ${t('searchOnlineHere')}: "${escapeHtml(query)}"
        </button>
      </div>
    `;
    return;
  }

  let html = '';
  if (state.selectedRadical && !query) {
    const radItem = (typeof RADICALS_DATA !== 'undefined') ? RADICALS_DATA.find(r => r.r === state.selectedRadical) : null;
    const radName = radItem ? radItem.name : state.selectedRadical;
    html += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:8px 14px; background:var(--accent-subtle); border:1px solid var(--accent); border-radius:10px;">
        <span style="font-size:13px; font-weight:600; color:var(--accent);">
          🏮 ${tx('Đang lọc theo Bộ', 'Filtered by Radical', '部首で絞り込み')}: <b>${escapeHtml(radName)}</b> (${matches.length} ${tx('từ', 'words', '語')})
        </span>
        <button class="btn btn-secondary btn-sm" style="font-size:11px; padding:3px 10px; border-radius:12px;" onclick="selectRadicalFilter(null)">
          ✕ ${tx('Bỏ lọc', 'Clear filter', '解除')}
        </button>
      </div>
    `;
  }
  if (query) {
    const exactMatch = matches.some(m => m.word === query);
    let countText = `Tìm thấy <b>${matches.length}</b> kết quả cho "<b>${escapeHtml(query)}</b>"`;
    if (state.uiLang === 'ja') {
      countText = `「<b>${escapeHtml(query)}</b>」の検索結果: <b>${matches.length}</b>件`;
    } else if (state.uiLang === 'en') {
      countText = `Found <b>${matches.length}</b> results for "<b>${escapeHtml(query)}</b>"`;
    }
    const closeSearchText = state.uiLang === 'ja' ? '✕ 検索を閉じる' : (state.uiLang === 'en' ? '✕ Close search' : '✕ Đóng tìm kiếm');

    html += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:0 4px;">
        <span style="font-size:13px; color:var(--text-muted); font-weight:500;">
          ${countText}
        </span>
        <button class="btn btn-secondary btn-sm" style="font-size:11.5px; padding:3px 10px; border-radius:14px;" onclick="clearDictSearch()">
          ${closeSearchText}
        </button>
      </div>
    `;

    if (!exactMatch) {
      html += `
        <div class="dict-online-card" onclick="searchOnline('${escapeQuotes(query)}')">
          <div style="display:flex; align-items:center; gap:10px; min-width:0;">
            <div style="font-size:24px; line-height:1; flex-shrink:0;">🌐</div>
            <div style="min-width:0;">
              <div style="font-size:13.5px; font-weight:700; color:var(--accent);">
                ${t('notWhatYouLookedFor')} <span style="text-decoration:underline;">${t('searchOnlineHere')}</span>
              </div>
              <div style="font-size:12px; color:var(--text-muted); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${t('onlineLookupDesc')} ("${escapeHtml(query)}")
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" style="flex-shrink:0; font-size:12px; padding:6px 13px; border-radius:16px;">
            ${t('btnSearchOnline')}
          </button>
        </div>
      `;
    }
  }

  html += '<div class="dict-results-list">';
  matches.forEach(item => {
    const lang = state.meaningLang;
    const userDict = getUserDict();
    const customKey = lang + ':' + item.word;
    let meaning = userDict[customKey];
    if (!meaning) {
      if (lang === 'en') {
        meaning = item.en ? item.en.join('; ') : '';
      } else if (lang === 'ja') {
        if (item.ja) meaning = item.ja;
        else if (typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT[item.word]) meaning = JA_COMMON_DICT[item.word];
        else if (KANJI_DATA[item.word] && KANJI_DATA[item.word].ja_meaning) meaning = KANJI_DATA[item.word].ja_meaning;
        else if (state.cachedTranslations['ja:' + item.word]) meaning = state.cachedTranslations['ja:' + item.word];
        else {
          meaning = '';
          // Tải bản dịch tiếng Nhật bất đồng bộ và cập nhật vào card
          translateTextOnline(item.word, 'ja').then(trans => {
            if (trans && state.meaningLang === 'ja') {
              const el = document.getElementById('dict-meaning-' + item.word);
              if (el) el.textContent = trans;
            }
          });
        }
      } else {
        meaning = item.vi || (item.en ? item.en.join('; ') : '');
      }
    }

    let subReadingHtml = '';
    if (lang === 'vi' && item.hanviet) {
      subReadingHtml = `<span class="dict-hanviet">${escapeHtml(item.hanviet)}</span>`;
    } else if (lang === 'ja') {
      const kj = KANJI_DATA[item.word];
      if (kj) {
        const kana = kj.on + (kj.kun && kj.kun !== '-' ? ' / ' + kj.kun : '');
        subReadingHtml = `<span class="dict-hanviet">${escapeHtml(kana)}</span>`;
      }
    }

    html += `
      <div class="dict-item-card" onclick="openWordSheet('${escapeHtml(item.word)}')">
        <div style="flex:1; min-width:0; padding-right:12px;">
          <div class="dict-item-left">
            <span class="dict-hanzi" lang="zh-CN">${escapeHtml(item.word)}</span>
            <span class="dict-pinyin">${escapeHtml(item.pinyin)}</span>
            ${subReadingHtml}
          </div>
          <div id="dict-meaning-${escapeHtml(item.word)}" class="dict-meaning">${escapeHtml(meaning || (lang === 'ja' ? '...' : t('noMeaning')))}</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
          ${item.hsk ? `<span class="badge badge-hsk">HSK ${item.hsk}</span>` : ''}
          ${(item.type === 'slang' || !!getSlangEntry(item.word)) ? `<span class="badge" style="background:rgba(232,52,78,0.12); color:var(--accent); border:1px solid rgba(232,52,78,0.3); font-weight:700;">🔥 Slang</span>` : ''}
          <button class="icon-btn" style="width:34px; height:34px;" onclick="event.stopPropagation(); speakText('${escapeQuotes(item.word)}')" title="${t('play')}" aria-label="${t('play')}">
            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          </button>
        </div>
      </div>
    `;
  });
  html += '</div>';

  if (query) {
    html += `
      <div style="text-align:center; padding:18px 8px 12px;">
        <button class="btn btn-secondary btn-sm" style="border-radius:20px; font-size:12.5px; padding:7px 18px; border-color:rgba(232, 52, 78, 0.3); color:var(--accent);" onclick="searchOnline('${escapeQuotes(query)}')">
          🌐 ${t('searchOnlineHere')}: "<b>${escapeHtml(query)}</b>" →
        </button>
      </div>
    `;
  }

  container.innerHTML = html;
}

let dictSearchTimer = null;
function handleDictSearch(val) {
  clearTimeout(dictSearchTimer);
  dictSearchTimer = setTimeout(() => {
    state.searchQuery = val;
    renderDictView();
  }, 180);
}

function setDictFilter(hskVal) {
  state.dictFilterHSK = hskVal;
  document.querySelectorAll('.dict-filter-chip').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-hsk') === hskVal);
  });
  renderDictView();
}

function searchOnline(query) {
  openWordSheet(query);
}
