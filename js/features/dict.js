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
  const badgeBar = document.getElementById('dict-search-badge-bar');
  if (query) {
    if (quickTags) quickTags.style.display = 'none';
    if (hskAccordion) hskAccordion.style.display = 'none';
    const radAcc = document.getElementById('dict-radical-accordion');
    if (radAcc) radAcc.style.display = 'none';
    const recBox = document.getElementById('dict-recent-box');
    if (recBox) recBox.style.display = 'none';

    // Update dynamic language badge
    if (badgeBar && typeof detectSearchLanguage === 'function' && typeof getLanguageBadgeInfo === 'function') {
      const detectedLang = detectSearchLanguage(query);
      const bInfo = getLanguageBadgeInfo(detectedLang, query, state.uiLang || 'vi');
      badgeBar.style.display = 'flex';
      badgeBar.innerHTML = `
        <span class="dict-search-badge ${bInfo.class}">${escapeHtml(bInfo.badge)}</span>
        <span class="dict-search-badge-desc">${escapeHtml(bInfo.desc)}</span>
      `;
    }
  } else {
    if (badgeBar) badgeBar.style.display = 'none';
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

  // Pre-normalize query for multi-lingual and reverse matching
  const queryNoTone = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(query).toLowerCase() : query;
  const queryNormVi = typeof normalizeVietnameseQuery === 'function' ? normalizeVietnameseQuery(query) : query;
  const queryNormViNoTone = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(queryNormVi) : queryNormVi;
  const jaNorm = typeof normalizeJapaneseQuery === 'function' ? normalizeJapaneseQuery(query) : { raw: query, hiragana: query, kanjiEquivalent: '' };
  const stemmedEn = typeof stemEnglishWord === 'function' ? stemEnglishWord(query) : query;

  // Query or Browse mode: Find matches
  let matches = [];
  const seenWords = new Set();

  // 1. High-Priority: Check Reverse Dictionary Dataset first (0 token, ultra fast reverse lookup)
  if (query && typeof findReverseMatches === 'function' && filterHSK === 'all') {
    const revList = findReverseMatches(query, 20);
    for (const r of revList) {
      if (seenWords.has(r.zh)) continue;
      seenWords.add(r.zh);
      const inMini = MINI_DICT[r.zh];
      if (inMini) {
        matches.push({ word: r.zh, ...inMini, isReverseMatch: true, matchPriority: 1 });
      } else {
        matches.push({
          word: r.zh,
          pinyin: r.py || '',
          vi: r.vi || '',
          en: [],
          ja: '',
          hanviet: getWordHanViet(r.zh),
          type: 'reverse',
          isReverseMatch: true,
          matchPriority: 1
        });
      }
    }
  }

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
      
      let matchesVi = false;
      if (it.vi) {
        const viLow = it.vi.toLowerCase();
        const viNoT = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(viLow) : viLow;
        matchesVi = viLow.includes(query) || viNoT.includes(queryNoTone) || viNoT.includes(queryNormViNoTone);
      }
      
      let matchesEn = false;
      if (it.en) {
        const enArr = Array.isArray(it.en) ? it.en : [it.en];
        matchesEn = enArr.some(e => {
          const el = e.toLowerCase();
          return el.includes(query) || (typeof stemEnglishWord === 'function' && stemEnglishWord(el).includes(stemmedEn));
        });
      }

      if (matchesHanzi || matchesPinyin || matchesVi || matchesEn) {
        matches.push(sItem);
      }
    }
  } else {
    const allWords = Object.keys(MINI_DICT);
    for (const w of allWords) {
      const entry = MINI_DICT[w];
      if (filterHSK !== 'all') {
        if (filterHSK === '7-9') {
          const h = String(entry.hsk);
          if (h !== '7-9' && h !== '7' && h !== '8' && h !== '9' && !(entry.hsk >= 7 && entry.hsk <= 9)) {
            continue;
          }
        } else if (String(entry.hsk) !== filterHSK) {
          continue;
        }
      }
      if (!query) {
        matches.push({ word: w, ...entry });
        seenWords.add(w);
        if (matches.length >= 80) break;
        continue;
      }
      if (seenWords.has(w)) continue;

      const matchesHanzi = w.includes(query);
      const cleanPinyin = removeToneMarks(entry.pinyin.toLowerCase()).replace(/\s+/g, '');
      const matchesPinyin = entry.pinyin.toLowerCase().includes(query) || cleanPinyin.includes(cleanQuery);
      
      // 1. Vietnamese Accent-Agnostic & Fuzzy matching
      let matchesVi = false;
      if (entry.vi) {
        const viLower = entry.vi.toLowerCase();
        const viNoTone = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(viLower) : viLower;
        matchesVi = viLower.includes(query) ||
                    viNoTone.includes(queryNoTone) ||
                    viNoTone.includes(queryNormViNoTone);

        // Fuzzy typo tolerance for queries with length >= 4
        if (!matchesVi && queryNoTone.length >= 4 && queryNoTone.length <= 12 && typeof levenshteinDistance === 'function') {
          const viWords = viNoTone.split(/[\s,;]+/);
          matchesVi = viWords.some(vw => levenshteinDistance(queryNoTone, vw) <= (queryNoTone.length >= 7 ? 2 : 1));
        }
      }

      // 2. English Stemmed & Lemmatized matching
      let matchesEn = false;
      if (entry.en && Array.isArray(entry.en)) {
        matchesEn = entry.en.some(e => {
          const eLower = e.toLowerCase();
          if (eLower.includes(query)) return true;
          const eStem = typeof stemEnglishWord === 'function' ? stemEnglishWord(eLower) : eLower;
          return eStem === stemmedEn || eStem.includes(stemmedEn) || (stemmedEn.length > 3 && stemmedEn.includes(eStem));
        });
      }

      // 3. Han-Viet matching
      const matchesHanViet = entry.hanviet && (
        entry.hanviet.toLowerCase().includes(query) ||
        (typeof stripVietnameseTones === 'function' && stripVietnameseTones(entry.hanviet.toLowerCase()).includes(queryNoTone))
      );

      // 4. Japanese Kana, Kanji & Romaji matching
      const kanjiEntry = KANJI_DATA[w];
      const matchesJa = (entry.ja && (
        entry.ja.includes(query) ||
        (jaNorm.hiragana && entry.ja.includes(jaNorm.hiragana)) ||
        (jaNorm.kanjiEquivalent && entry.ja.includes(jaNorm.kanjiEquivalent))
      )) || (kanjiEntry && (
        (kanjiEntry.on && kanjiEntry.on.toLowerCase().includes(query)) ||
        (kanjiEntry.kun && kanjiEntry.kun.toLowerCase().includes(query)) ||
        (kanjiEntry.ja_meaning && kanjiEntry.ja_meaning.toLowerCase().includes(query)) ||
        (jaNorm.hiragana && kanjiEntry.kun && kanjiEntry.kun.includes(jaNorm.hiragana)) ||
        (jaNorm.kanjiEquivalent && kanjiEntry.ja_meaning && kanjiEntry.ja_meaning.includes(jaNorm.kanjiEquivalent))
      )) || (jaNorm.kanjiEquivalent && w === jaNorm.kanjiEquivalent);

      if (matchesHanzi || matchesPinyin || matchesVi || matchesEn || matchesHanViet || matchesJa) {
        matches.push({ word: w, ...entry });
        seenWords.add(w);
        if (matches.length >= 80) break;
      }
    }

    if (query && filterHSK === 'all' && matches.length < 100) {
      const allSlang = (ENRICH.remote || []).concat(SLANG_BUILTIN || []);
      for (const it of allSlang) {
        if (!it || !it.w || seenWords.has(it.w)) continue;
        const matchesHanzi = it.w.toLowerCase().includes(query) || (it.alias && it.alias.some(a => a.toLowerCase().includes(query)));
        const cleanPinyin = removeToneMarks((it.py || '').toLowerCase()).replace(/\s+/g, '');
        const matchesPinyin = (it.py || '').toLowerCase().includes(query) || cleanPinyin.includes(cleanQuery);
        
        let matchesVi = false;
        if (it.vi) {
          const viLow = it.vi.toLowerCase();
          const viNoT = typeof stripVietnameseTones === 'function' ? stripVietnameseTones(viLow) : viLow;
          matchesVi = viLow.includes(query) || viNoT.includes(queryNoTone) || viNoT.includes(queryNormViNoTone);
        }

        let matchesEn = false;
        if (it.en) {
          const enArr = Array.isArray(it.en) ? it.en : [it.en];
          matchesEn = enArr.some(e => {
            const el = e.toLowerCase();
            return el.includes(query) || (typeof stemEnglishWord === 'function' && stemEnglishWord(el).includes(stemmedEn));
          });
        }

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

  // Smart Ranking: Exact Hanzi match > Reverse Dict matches > Exact Meaning match > StartsWith > HSK Level
  matches.sort((a, b) => {
    if (a.word === query) return -1;
    if (b.word === query) return 1;
    if (a.isReverseMatch && !b.isReverseMatch) return -1;
    if (!a.isReverseMatch && b.isReverseMatch) return 1;
    
    // Exact meaning matches
    const aViNoTone = a.vi ? (typeof stripVietnameseTones === 'function' ? stripVietnameseTones(a.vi.toLowerCase()) : a.vi.toLowerCase()) : '';
    const bViNoTone = b.vi ? (typeof stripVietnameseTones === 'function' ? stripVietnameseTones(b.vi.toLowerCase()) : b.vi.toLowerCase()) : '';
    const aExact = aViNoTone === queryNoTone;
    const bExact = bViNoTone === queryNoTone;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    return (a.hsk || 99) - (b.hsk || 99);
  });

  // Update HSK count label if browsing
  const countEl = document.getElementById('dict-hsk-count');
  if (countEl && isBrowsingHsk && !query) {
    let levelLabel = 'HSK ' + filterHSK;
    if (filterHSK === 'slang') levelLabel = t('hskSlang') || '🔥 Từ lóng Slang';
    else if (filterHSK === '7-9') levelLabel = t('hsk789') || '👑 HSK 7-9 (Cao cấp)';
    else if (filterHSK === 'all') levelLabel = t('hskAll');
    countEl.textContent = `${t('hskLevel')}: ${levelLabel} (${matches.length} ${t('words') || 'từ'})`;
  }

  // Check Semantic Word Mindmap
  let mindmapHtml = '';
  if (query && typeof findMatchingSynset === 'function') {
    const synset = findMatchingSynset(query);
    if (synset) {
      mindmapHtml = renderMindmapCard(synset);
    }
  }

  if (matches.length === 0) {
    const noMatchSub = state.uiLang === 'ja'
      ? `「${escapeHtml(query)}」に一致する単語が見つかりませんでした`
      : (state.uiLang === 'en'
        ? `No words found matching "${escapeHtml(query)}"`
        : `Không tìm thấy từ nào khớp với "${escapeHtml(query)}"`);

    const lineDictUrl = state.uiLang === 'ja'
      ? `https://dict.naver.com/linedict/zhendict/#/cnja/search?query=${encodeURIComponent(query)}`
      : `https://dict.naver.com/linedict/zhendict/#/cnen/search?query=${encodeURIComponent(query)}`;

    let noMatchHtml = `
      <div class="dict-no-match-wrapper">
        <div class="dict-no-match-header">
          <div style="font-size:36px; margin-bottom:8px;">🔍</div>
          <div style="font-size:16px; font-weight:700; color:var(--text-primary);">${t('noResults')}</div>
          <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">${noMatchSub}</div>
        </div>

        <!-- 1. Live Multi-Dictionary API Auto Gợi ý -->
        <div id="dict-live-results-container"></div>

        <!-- 2. Bản đồ sắc thái (nếu có) -->
        ${mindmapHtml}

        <!-- 3. Tra cứu ngữ cảnh AI -->
        <div class="dict-semantic-action-bar" style="margin-top:14px;">
          <div>
            <div class="dict-semantic-action-text">✨ ${t('dictSemanticTitle') || 'Tra cứu theo ngữ cảnh thông minh (AI)'}</div>
            <div class="dict-semantic-action-sub">${t('dictSemanticDesc') || 'AI tìm từ tiếng Trung phù hợp nhất dựa trên mô tả'}</div>
          </div>
          <button id="dict-semantic-trigger-btn" class="dict-semantic-btn" onclick="executeSemanticSearch('${escapeQuotes(query)}')">
            ${t('dictSemanticBtn') || '✨ Tra ngữ cảnh AI'}: "${escapeHtml(query)}"
          </button>
        </div>
        <div id="dict-semantic-results-area"></div>

        <!-- 4. Tra cứu nhanh trên các đại từ điển chuyên sâu -->
        <div class="dict-ext-section" style="margin-top:14px;">
          <div class="dict-ext-label">${t('externalDicts') || 'Tra trên từ điển chuyên sâu'}</div>
          <div class="dict-ext-chips">
            <a class="dict-ext-chip" href="${lineDictUrl}" target="_blank" rel="noopener noreferrer">📖 Line Dict</a>
            <a class="dict-ext-chip" href="plecoapi://x-callback-url/s?q=${encodeURIComponent(query)}">📱 Pleco</a>
            <a class="dict-ext-chip" href="https://baike.baidu.com/item/${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">📚 百度百科</a>
            <a class="dict-ext-chip" href="https://hanzii.net/search/word/${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">Hanzii</a>
            <a class="dict-ext-chip" href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">MDBG</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = noMatchHtml;
    if (query && !/[\u4e00-\u9fff]/.test(query)) {
      triggerLiveDictSearch(query, typeof detectSearchLanguage === 'function' ? detectSearchLanguage(query) : 'latin', seenWords);
    }
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
          ${item.hsk ? `<span class="badge ${String(item.hsk).includes('7') || String(item.hsk).includes('8') || String(item.hsk).includes('9') ? 'badge-hsk-pro' : 'badge-hsk'}">HSK ${item.hsk}</span>` : ''}
          ${(item.type === 'slang' || !!getSlangEntry(item.word)) ? `<span class="badge" style="background:rgba(232,52,78,0.12); color:var(--accent); border:1px solid rgba(232,52,78,0.3); font-weight:700;">🔥 Slang</span>` : ''}
          <button class="icon-btn" style="width:34px; height:34px;" onclick="event.stopPropagation(); speakText('${escapeQuotes(item.word)}')" title="${t('play')}" aria-label="${t('play')}">
            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          </button>
        </div>
      </div>
    `;
  });
  html += '</div>';

  // 1. Live Multi-Dictionary Online Extension Container (Khám phá thêm từ vựng liên quan)
  html += '<div id="dict-live-results-container"></div>';

  // 2. Bản đồ sắc thái HSK & Slang (gọn gàng, không che khuất từ chính)
  if (mindmapHtml) {
    html += mindmapHtml;
  }

  // 3. Tra cứu theo ngữ cảnh thông minh AI & Đại từ điển chuyên sâu
  if (query) {
    const lineDictUrl = state.uiLang === 'ja'
      ? `https://dict.naver.com/linedict/zhendict/#/cnja/search?query=${encodeURIComponent(query)}`
      : `https://dict.naver.com/linedict/zhendict/#/cnen/search?query=${encodeURIComponent(query)}`;

    html += `
      <div class="dict-semantic-action-bar" style="margin-top:14px;">
        <div>
          <div class="dict-semantic-action-text">✨ ${t('dictSemanticTitle') || 'Tra cứu theo ngữ cảnh thông minh (AI)'}</div>
          <div class="dict-semantic-action-sub">${t('dictSemanticDesc') || 'Phân tích ngữ cảnh và tình huống hội thoại'}</div>
        </div>
        <button id="dict-semantic-trigger-btn" class="dict-semantic-btn" onclick="executeSemanticSearch('${escapeQuotes(query)}')">
          ${t('dictSemanticBtn') || '✨ Tra ngữ cảnh AI'}
        </button>
      </div>
      <div id="dict-semantic-results-area"></div>

      <!-- Đại từ điển chuyên sâu -->
      <div class="dict-ext-section" style="margin-top:14px;">
        <div class="dict-ext-label">${t('externalDicts') || 'Tra trên từ điển chuyên sâu'}</div>
        <div class="dict-ext-chips">
          <a class="dict-ext-chip" href="${lineDictUrl}" target="_blank" rel="noopener noreferrer">📖 Line Dict</a>
          <a class="dict-ext-chip" href="plecoapi://x-callback-url/s?q=${encodeURIComponent(query)}">📱 Pleco</a>
          <a class="dict-ext-chip" href="https://baike.baidu.com/item/${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">📚 百度百科</a>
          <a class="dict-ext-chip" href="https://hanzii.net/search/word/${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">Hanzii</a>
          <a class="dict-ext-chip" href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">MDBG</a>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  if (query && !/[\u4e00-\u9fff]/.test(query)) {
    triggerLiveDictSearch(query, typeof detectSearchLanguage === 'function' ? detectSearchLanguage(query) : 'latin', seenWords);
  }
}

// --- Semantic Mindmap Renderer ---
function renderMindmapCard(synset) {
  if (!synset) return '';
  const lang = state.uiLang || 'vi';
  const title = (synset.title && synset.title[lang]) || synset.title.vi || '';
  const exploreLabel = t('dictMindmapExplore') || tx('Khám phá cấp độ', 'Explore Nuance Levels', 'ニュアンスレベルを探索');

  let tiersHtml = '';
  for (const tier of synset.tiers) {
    const tierLabel = (tier.label && tier.label[lang]) || tier.label.vi || '';
    let chipsHtml = '';
    for (const w of tier.words) {
      const def = (lang === 'en' ? w.en : (lang === 'ja' ? (w.ja || w.vi) : w.vi)) || '';
      chipsHtml += `
        <div class="dict-mindmap-chip" onclick="openWordSheet('${escapeQuotes(w.zh)}')">
          <span class="dict-mindmap-zh">${escapeHtml(w.zh)}</span>
          <span class="dict-mindmap-py">${escapeHtml(w.py)}</span>
          ${def ? `<span class="dict-mindmap-vi">${escapeHtml(def)}</span>` : ''}
        </div>
      `;
    }
    tiersHtml += `
      <div class="dict-mindmap-tier">
        <div class="dict-mindmap-tier-head">
          <span class="dict-mindmap-tier-name">${escapeHtml(tier.level)}</span>
          <span class="dict-mindmap-tier-label">${escapeHtml(tierLabel)}</span>
        </div>
        <div class="dict-mindmap-words">${chipsHtml}</div>
      </div>
    `;
  }

  return `
    <div class="dict-mindmap-accordion">
      <button class="dict-mindmap-toggle-btn" onclick="toggleMindmapDetails(this)">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:16px;">${escapeHtml(synset.icon || '🌳')}</span>
          <span style="font-weight:700; font-size:13px;">${t('dictMindmapTitle') || 'Bản đồ sắc thái HSK & Slang'}: <b style="color:var(--accent);">${escapeHtml(title)}</b></span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="dict-mindmap-tag">${escapeHtml(exploreLabel)}</span>
          <span class="chevron" style="transition:transform 0.2s; font-size:11px;">▼</span>
        </div>
      </button>
      <div class="dict-mindmap-content" style="display:none; padding-top:10px;">
        <div class="dict-mindmap-grid">${tiersHtml}</div>
      </div>
    </div>
  `;
}

function toggleMindmapDetails(btn) {
  if (!btn) return;
  const content = btn.nextElementSibling;
  const chevron = btn.querySelector('.chevron');
  if (!content) return;
  const isHidden = content.style.display === 'none' || !content.style.display;
  if (isHidden) {
    content.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    btn.classList.add('expanded');
  } else {
    content.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
    btn.classList.remove('expanded');
  }
}

// --- AI Semantic Context Search Handler ---
async function executeSemanticSearch(query) {
  if (!query) return;
  const area = document.getElementById('dict-semantic-results-area');
  const btn = document.getElementById('dict-semantic-trigger-btn');
  if (btn) btn.disabled = true;
  if (area) {
    area.innerHTML = `
      <div class="example-loading-box" style="margin:12px 0;">
        <div class="spinner-small" style="display:inline-block; margin-right:8px;"></div>
        <span>${t('dictSemanticSearching') || 'AI đang phân tích ngữ cảnh và tìm từ phù hợp...'}</span>
      </div>
    `;
  }

  try {
    const resp = await fetch('/api/dict/semantic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        targetLang: state.uiLang || 'vi'
      })
    });
    if (!resp.ok) {
      throw new Error(`API error ${resp.status}`);
    }
    const data = await resp.json();
    if (data.success && Array.isArray(data.matches) && data.matches.length) {
      renderSemanticResults(data.concept, data.matches);
    } else {
      if (area) {
        area.innerHTML = `
          <div style="font-size:13px; color:var(--text-muted); padding:10px 0; text-align:center;">
            Không tìm thấy gợi ý ngữ cảnh phù hợp cho "${escapeHtml(query)}"
          </div>
        `;
      }
    }
  } catch (err) {
    console.error('Semantic search error:', err);
    if (area) {
      area.innerHTML = `
        <div style="font-size:12.5px; color:var(--accent); padding:10px 0; text-align:center;">
          ⚠️ ${escapeHtml(err.message || 'Không thể kết nối AI')}
        </div>
      `;
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}

function renderSemanticResults(concept, matches) {
  const area = document.getElementById('dict-semantic-results-area');
  if (!area) return;
  let itemsHtml = '';
  for (const m of matches) {
    itemsHtml += `
      <div class="dict-semantic-item" onclick="openWordSheet('${escapeQuotes(m.word)}')">
        <div class="dict-semantic-item-top">
          <div>
            <span class="dict-semantic-zh">${escapeHtml(m.word)}</span>
            <span class="dict-semantic-py">${escapeHtml(m.pinyin || '')}</span>
          </div>
          ${m.hsk ? `<span class="dict-semantic-hsk-badge">${escapeHtml(m.hsk)}</span>` : ''}
        </div>
        <div class="dict-semantic-meaning">${escapeHtml(m.meaning || '')}</div>
        ${m.nuance ? `<div class="dict-semantic-nuance">💡 ${escapeHtml(m.nuance)}</div>` : ''}
        ${m.example ? `<div class="dict-semantic-example">💬 ${escapeHtml(m.example)}</div>` : ''}
      </div>
    `;
  }

  area.innerHTML = `
    <div class="dict-semantic-results-box">
      <div class="dict-semantic-results-head">
        <div class="dict-semantic-concept-title">
          <span>✨</span>
          <span>${t('dictSemanticMatches') || 'Gợi ý từ ngữ cảnh'}: <b>${escapeHtml(concept)}</b></span>
        </div>
        <span style="font-size:11px; color:var(--text-muted);">${matches.length} ${tx('từ đề xuất', 'suggestions', '件の提案')}</span>
      </div>
      <div>${itemsHtml}</div>
    </div>
  `;
}

// --- Live Extended Multi-Dictionary Search Engine (0 Token, Instant) ---
let liveDictTimer = null;
const LIVE_DICT_CACHE = new Map();

function triggerLiveDictSearch(query, lang, seenWords = new Set()) {
  clearTimeout(liveDictTimer);
  if (!query || query.length < 2) return;
  if (/[\u4e00-\u9fff]/.test(query)) return; // Only for reverse search in VI, JA, EN, Romaji

  const cacheKey = lang + ':' + query.trim().toLowerCase();
  if (LIVE_DICT_CACHE.has(cacheKey)) {
    renderLiveDictResults(LIVE_DICT_CACHE.get(cacheKey), seenWords);
    return;
  }

  liveDictTimer = setTimeout(async () => {
    try {
      let sl = 'auto';
      if (lang === 'vi' || /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(query)) {
        sl = 'vi';
      } else if (lang === 'ja' || /[\u3040-\u30ff]/.test(query)) {
        sl = 'ja';
      } else if (lang === 'en') {
        sl = 'en';
      }

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=zh-CN&dt=t&dt=bd&dt=rm&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      if (!data) return;

      const results = [];
      const localSeen = new Set();

      // 1. Direct translated candidate
      if (Array.isArray(data[0]) && data[0][0] && data[0][0][0]) {
        const directZh = data[0][0][0].trim();
        if (/[\u4e00-\u9fff]/.test(directZh) && directZh.length <= 8) {
          localSeen.add(directZh);
          const py = typeof getWordPinyin === 'function' ? getWordPinyin(directZh) : '';
          results.push({
            word: directZh,
            pinyin: py,
            mean: query,
            isDirect: true
          });
        }
      }

      // 2. Dictionary grouped alternatives (dt=bd)
      if (Array.isArray(data[1])) {
        for (const group of data[1]) {
          const words = group[1] || [];
          const defs = group[2] || [];
          for (let i = 0; i < words.length && i < 8; i++) {
            const w = words[i];
            if (!w || localSeen.has(w) || !/[\u4e00-\u9fff]/.test(w) || w.length > 8) continue;
            localSeen.add(w);
            const py = typeof getWordPinyin === 'function' ? getWordPinyin(w) : '';
            const meaningList = defs[i] && Array.isArray(defs[i]) ? defs[i].slice(0, 3).join(', ') : query;
            results.push({
              word: w,
              pinyin: py,
              mean: meaningList,
              pos: group[0] || ''
            });
            if (results.length >= 12) break;
          }
          if (results.length >= 12) break;
        }
      }

      if (results.length > 0) {
        LIVE_DICT_CACHE.set(cacheKey, results);
        renderLiveDictResults(results, seenWords);
      }
    } catch (err) {
      console.warn('Live dict search error:', err);
    }
  }, 220);
}

function renderLiveDictResults(results, seenWords = new Set()) {
  const container = document.getElementById('dict-live-results-container');
  if (!container) return;

  // Filter out words already shown in primary results
  const filtered = results.filter(r => !seenWords.has(r.word));
  if (!filtered.length) {
    container.innerHTML = '';
    return;
  }

  let cardsHtml = '';
  for (const item of filtered) {
    cardsHtml += `
      <div class="dict-live-card" onclick="openWordSheet('${escapeQuotes(item.word)}')">
        <div class="dict-live-top">
          <span class="dict-live-zh">${escapeHtml(item.word)}</span>
          <span class="dict-live-py">${escapeHtml(item.pinyin || '')}</span>
        </div>
        <div class="dict-live-mean" title="${escapeHtml(item.mean)}">${escapeHtml(item.mean)}</div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="dict-live-section">
      <div class="dict-live-header">
        <span>${t('liveDictTitle') || '🌐 Gợi ý từ điển mở rộng trực tuyến'}</span>
        <span class="badge" style="font-size:10.5px; background:rgba(37,99,235,0.12); color:#2563EB; border:1px solid rgba(37,99,235,0.25);">Live Multi-Dict API</span>
      </div>
      <div class="dict-live-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
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
  if (!query) return;
  const hasHanzi = /[\u4e00-\u9fff]/.test(query);
  if (hasHanzi) {
    openWordSheet(query);
  } else {
    // Non-Hanzi queries (Vietnamese/Japanese/English) trigger AI Semantic search
    executeSemanticSearch(query);
  }
}
