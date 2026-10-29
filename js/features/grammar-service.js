// js/features/grammar-service.js - Core HSK Grammar Service & State Store
// Supports HSK 2.0 & 3.0 across all levels (HSK1 - HSK7-9) in Vietnamese, Japanese, and English

(function () {
  'use strict';

  /**
   * Helper: Retrieve localized text from multilingual object with fallback
   * @param {Object|string} obj - Localized object { vi: '...', ja: '...', en: '...' } or raw string
   * @param {'vi'|'ja'|'en'} [locale='vi'] - Active user locale
   * @returns {string}
   */
  function getLocalizedText(obj, locale) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj !== 'object') return String(obj);

    const lang = (locale && (locale === 'vi' || locale === 'ja' || locale === 'en'))
      ? locale
      : (typeof state !== 'undefined' && state.uiLang ? state.uiLang : 'vi');

    // 1. Catalog item localized names (vi_name, en_name, ja_name)
    const nameKey = `${lang}_name`;
    if (obj[nameKey] && typeof obj[nameKey] === 'string' && obj[nameKey].trim() !== '') {
      return obj[nameKey];
    }

    // 2. Direct locale key { vi: '...', en: '...', ja: '...' }
    if (obj[lang] && typeof obj[lang] === 'string' && obj[lang].trim() !== '') {
      return obj[lang];
    }

    // 3. Nested localizations { localizations: { vi: { title: '...' } } }
    if (obj.localizations && obj.localizations[lang]) {
      const locObj = obj.localizations[lang];
      if (typeof locObj === 'string' && locObj.trim()) return locObj;
      if (locObj.title && typeof locObj.title === 'string' && locObj.title.trim()) return locObj.title;
    }

    // 4. Fallback cascade
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

  /**
   * Remove diacritics / tones for fuzzy keyword searching
   * @param {string} str
   * @returns {string}
   */
  function normalizeSearchStr(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .trim();
  }

  // --- Data Access Layer ---
  let _catalogCache = null;
  let _samplesCache = null;
  let _samplesMap = null;
  let _searchIndexMap = null;
  let _allJoinedCache = null;
  const _wordMatchCache = new Map();
  let _levelsCache = null;
  const _categoriesCache = new Map();

  function ensureSearchIndex() {
    if (_searchIndexMap) return;
    const catalog = getCatalogData();
    if (!_samplesMap) getSamplesData();

    _searchIndexMap = new Map();
    for (let i = 0; i < catalog.length; i++) {
      const item = catalog[i];
      const detail = _samplesMap ? _samplesMap.get(item.id) : null;
      const parts = [
        item.zh_name || '',
        normalizeSearchStr(item.vi_name),
        normalizeSearchStr(item.en_name),
        normalizeSearchStr(item.ja_name),
        normalizeSearchStr(item.id)
      ];
      if (detail) {
        if (detail.formula) parts.push(normalizeSearchStr(detail.formula));
        if (Array.isArray(detail.keywords)) {
          for (let k = 0; k < detail.keywords.length; k++) {
            parts.push(normalizeSearchStr(detail.keywords[k]));
          }
        }
      }
      _searchIndexMap.set(item.id, parts.join(' '));
    }
  }

  function getCatalogData() {
    if (_catalogCache) return _catalogCache;
    if (typeof window !== 'undefined' && window.HSK_GRAMMAR_CATALOG) {
      _catalogCache = window.HSK_GRAMMAR_CATALOG;
    } else if (typeof require !== 'undefined') {
      try {
        _catalogCache = require('../data/hsk_catalog_2.0_3.0_all_levels.json');
      } catch (e) {
        _catalogCache = [];
      }
    } else {
      _catalogCache = [];
    }
    return _catalogCache;
  }

  function getSamplesData() {
    if (_samplesCache) return _samplesCache;
    if (typeof window !== 'undefined' && window.HSK_GRAMMAR_SAMPLES) {
      _samplesCache = window.HSK_GRAMMAR_SAMPLES;
    } else if (typeof require !== 'undefined') {
      try {
        _samplesCache = require('../data/hsk_grammar_generated_samples.json');
      } catch (e) {
        _samplesCache = [];
      }
    } else {
      _samplesCache = [];
    }
    // Index samples by id for O(1) lookup
    _samplesMap = new Map();
    for (const item of _samplesCache) {
      if (item && item.id) {
        _samplesMap.set(item.id, item);
      }
    }
    return _samplesCache;
  }

  function getSampleById(id) {
    if (!_samplesMap) getSamplesData();
    return _samplesMap.get(id) || null;
  }

  /**
   * Filter and query the Grammar Catalog
   * @param {Object} [options]
   * @param {string} [options.level='all'] - 'all' | 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6' | 'HSK7-9'
   * @param {string} [options.standard='all'] - 'all' | 'HSK 2.0' | 'HSK 3.0'
   * @param {string} [options.category='all'] - 'all' | category string
   * @param {string} [options.query=''] - Search term
   * @param {boolean} [options.hasDetailOnly=false] - Filter only items that have full detailed practice data
   * @returns {Array<Object>} Filtered Catalog Items
   */
  function filterGrammarCatalog(options) {
    const opts = options || {};
    const level = opts.level || 'all';
    const standard = opts.standard || 'all';
    const category = opts.category || 'all';
    const query = (opts.query || '').trim();
    const normQuery = normalizeSearchStr(query);
    const hasDetailOnly = !!opts.hasDetailOnly;

    const catalog = getCatalogData();
    if (!_samplesMap) getSamplesData();

    // Fast-path: return shallow copy when no filter or search active
    if (level === 'all' && standard === 'all' && category === 'all' && !normQuery && !hasDetailOnly) {
      return catalog.slice();
    }

    if (normQuery) {
      ensureSearchIndex();
    }

    return catalog.filter(item => {
      // 1. Level Filter
      if (level !== 'all' && item.level !== level) {
        return false;
      }

      // 2. Standard Filter ('HSK 2.0' / 'HSK 3.0')
      if (standard !== 'all') {
        if (!Array.isArray(item.standard) || !item.standard.includes(standard)) {
          return false;
        }
      }

      // 3. Category Filter
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      // 4. Detailed data only filter
      const detail = _samplesMap.get(item.id);
      if (hasDetailOnly && !detail) {
        return false;
      }

      // 5. Query Search (Pre-indexed O(1) text search)
      if (normQuery) {
        const indexStr = _searchIndexMap ? _searchIndexMap.get(item.id) : null;
        if (indexStr) {
          const matchZh = item.zh_name && item.zh_name.toLowerCase().includes(query.toLowerCase());
          if (!indexStr.includes(normQuery) && !matchZh) {
            return false;
          }
        } else {
          const matchZh = item.zh_name && item.zh_name.toLowerCase().includes(query.toLowerCase());
          const matchVi = normalizeSearchStr(item.vi_name).includes(normQuery);
          const matchEn = normalizeSearchStr(item.en_name).includes(normQuery);
          const matchJa = normalizeSearchStr(item.ja_name).includes(normQuery);
          const matchId = normalizeSearchStr(item.id).includes(normQuery);

          let matchKeywords = false;
          let matchFormula = false;
          if (detail) {
            if (Array.isArray(detail.keywords)) {
              matchKeywords = detail.keywords.some(k => normalizeSearchStr(k).includes(normQuery));
            }
            if (detail.formula) {
              matchFormula = normalizeSearchStr(detail.formula).includes(normQuery);
            }
          }

          if (!matchZh && !matchVi && !matchEn && !matchJa && !matchId && !matchKeywords && !matchFormula) {
            return false;
          }
        }
      }

      return true;
    });
  }

  /**
   * Get Catalog joined with full Detail rule data
   * @param {Object} [options] Filter options
   * @returns {Array<Object>} Joined grammar objects { ...catalogItem, detail, hasDetail: boolean }
   */
  function getJoinedGrammarList(options) {
    const isDefault = !options || (
      (!options.level || options.level === 'all') &&
      (!options.standard || options.standard === 'all') &&
      (!options.category || options.category === 'all') &&
      (!options.query || !options.query.trim()) &&
      !options.hasDetailOnly
    );

    if (isDefault && _allJoinedCache) {
      return _allJoinedCache;
    }

    const filtered = filterGrammarCatalog(options);
    if (!_samplesMap) getSamplesData();

    const result = filtered.map(item => {
      const detail = _samplesMap.get(item.id) || null;
      return Object.assign({}, item, {
        detail: detail,
        hasDetail: !!detail,
        catalog: item
      });
    });

    if (isDefault) {
      _allJoinedCache = result;
    }
    return result;
  }

  const CATEGORY_META = {
    sentence_pattern: { icon: '📐', vi: 'Mẫu câu & Cấu trúc', ja: '基本文型・構文', en: 'Sentence Patterns' },
    preposition: { icon: '📍', vi: 'Giới từ', ja: '前置詞（介詞）', en: 'Prepositions' },
    question: { icon: '❓', vi: 'Câu hỏi', ja: '疑問文', en: 'Questions' },
    negation: { icon: '🚫', vi: 'Phủ định', ja: '否定表現', en: 'Negation' },
    particle: { icon: '🪢', vi: 'Trợ từ', ja: '助詞', en: 'Particles' },
    measure_word: { icon: '📏', vi: 'Lượng từ', ja: '量詞', en: 'Measure Words' },
    aspect: { icon: '⏳', vi: 'Động thái & Thời thể', ja: 'アスペクト', en: 'Aspect' },
    modal: { icon: '💡', vi: 'Động từ năng nguyện', ja: '助動詞（能願動詞）', en: 'Modal Verbs' },
    comparison: { icon: '⚖️', vi: 'Câu so sánh', ja: '比較文', en: 'Comparison' },
    complement: { icon: '🧩', vi: 'Bổ ngữ', ja: '補語', en: 'Complements' },
    conjunction: { icon: '🔗', vi: 'Liên từ & Câu ghép', ja: '接続詞・複文', en: 'Conjunctions' },
    reduplication: { icon: '🔁', vi: 'Từ trùng điệp (Lặp từ)', ja: '重ね型', en: 'Reduplication' },
    written_style: { icon: '📜', vi: 'Văn phong học thuật / Cổ văn', ja: '書面語・文語表現', en: 'Written Style' },
    other: { icon: '🏷️', vi: 'Khác', ja: 'その他', en: 'Other' }
  };

  /**
   * Get localized category display label with icon
   * @param {string} category 
   * @param {string} [locale] 
   * @returns {string} e.g. "📐 Mẫu câu & Cấu trúc"
   */
  function getCategoryName(category, locale) {
    if (!category) return '';
    const loc = locale || (typeof state !== 'undefined' && state.uiLang) || 'vi';
    const meta = CATEGORY_META[category];
    if (meta) {
      const title = meta[loc] || meta.vi || category;
      return `${meta.icon} ${title}`;
    }
    return category;
  }

  /**
   * Get unique Categories with count and localized titles
   */
  function getGrammarCategories(locale) {
    const loc = locale || (typeof state !== 'undefined' && state.uiLang) || 'vi';
    if (_categoriesCache.has(loc)) {
      return _categoriesCache.get(loc);
    }
    const catalog = getCatalogData();
    const map = new Map();

    catalog.forEach(item => {
      const cat = item.category || 'other';
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    const result = [];
    map.forEach((count, cat) => {
      const meta = CATEGORY_META[cat];
      const title = meta ? (meta[loc] || meta.vi || cat) : cat;
      const icon = meta ? meta.icon : '🏷️';
      result.push({
        id: cat,
        count: count,
        icon: icon,
        name: `${icon} ${title}`
      });
    });

    // Sort by count DESC
    result.sort((a, b) => b.count - a.count);
    _categoriesCache.set(loc, result);
    return result;
  }

  /**
   * Get unique Levels with count
   */
  function getGrammarLevels() {
    if (_levelsCache) return _levelsCache;
    const catalog = getCatalogData();
    const levels = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6', 'HSK7-9'];
    const map = new Map();
    levels.forEach(l => map.set(l, 0));

    catalog.forEach(item => {
      if (item.level && map.has(item.level)) {
        map.set(item.level, map.get(item.level) + 1);
      }
    });

    _levelsCache = levels.map(l => ({
      level: l,
      count: map.get(l) || 0
    }));
    return _levelsCache;
  }

  /**
   * Find grammar points that match a given Chinese word
   * @param {string} word
   * @returns {Array} JoinedGrammarPoint[]
   */
  function findGrammarPointsByWord(word) {
    if (!word || typeof word !== 'string') return [];
    const cleanWord = word.trim();
    if (!cleanWord) return [];

    if (_wordMatchCache.has(cleanWord)) {
      return _wordMatchCache.get(cleanWord);
    }

    const joined = getJoinedGrammarList();
    const hits = joined.filter(item => {
      const zh = item.zh_name || (item.catalog && item.catalog.zh_name);
      if (zh && zh.includes(cleanWord)) return true;
      if (item.detail) {
        if (item.detail.formula && item.detail.formula.includes(cleanWord)) return true;
        if (Array.isArray(item.detail.keywords) && item.detail.keywords.includes(cleanWord)) return true;
      }
      return false;
    });

    const sortedHits = hits.sort((a, b) => {
      if (a.hasDetail && !b.hasDetail) return -1;
      if (!a.hasDetail && b.hasDetail) return 1;
      return 0;
    });

    // Cap cache at 256 entries
    if (_wordMatchCache.size >= 256) {
      const firstKey = _wordMatchCache.keys().next().value;
      _wordMatchCache.delete(firstKey);
    }
    _wordMatchCache.set(cleanWord, sortedHits);
    return sortedHits;
  }

  // --- LocalStorage Practice Progress Tracking ---
  const STORAGE_PREFIX = 'halou_grammar_practice_';

  function savePracticeResult(grammarId, result) {
    if (!grammarId || typeof window === 'undefined' || !window.localStorage) return;
    try {
      const key = STORAGE_PREFIX + grammarId;
      const payload = Object.assign({}, result, {
        grammarId: grammarId,
        completedAt: new Date().toISOString()
      });
      window.localStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to save practice result:', e);
    }
  }

  function getPracticeResult(grammarId) {
    if (!grammarId || typeof window === 'undefined' || !window.localStorage) return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + grammarId);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  // --- Reactive Grammar Store ---
  class GrammarStore {
    constructor() {
      this.state = {
        level: 'all',
        standard: 'all',
        category: 'all',
        query: '',
        hasDetailOnly: false,
        selectedId: null,
        activePracticeTab: 'puzzles',
        viewMode: 'catalog', // 'catalog' | 'detail'
      };
      this.listeners = new Set();
    }

    getState() {
      return this.state;
    }

    setState(partial) {
      this.state = Object.assign({}, this.state, partial);
      this.notify();
    }

    subscribe(listener) {
      if (typeof listener === 'function') {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
      }
      return () => {};
    }

    notify() {
      this.listeners.forEach(fn => {
        try {
          fn(this.state);
        } catch (err) {
          console.error('GrammarStore listener error:', err);
        }
      });
    }

    selectGrammar(id) {
      this.setState({
        selectedId: id,
        viewMode: id ? 'detail' : 'catalog',
        activePracticeTab: 'puzzles'
      });
    }

    clearSelection() {
      this.setState({
        selectedId: null,
        viewMode: 'catalog'
      });
    }
  }

  const grammarStore = new GrammarStore();

  const grammarService = {
    getLocalizedText: getLocalizedText,
    getCatalogData: getCatalogData,
    getSamplesData: getSamplesData,
    getSampleById: getSampleById,
    filterGrammarCatalog: filterGrammarCatalog,
    getJoinedGrammarList: getJoinedGrammarList,
    findGrammarPointsByWord: findGrammarPointsByWord,
    getGrammarCategories: getGrammarCategories,
    getCategoryName: getCategoryName,
    getGrammarLevels: getGrammarLevels,
    savePracticeResult: savePracticeResult,
    getPracticeResult: getPracticeResult,
    store: grammarStore
  };

  if (typeof window !== 'undefined') {
    window.getLocalizedText = getLocalizedText;
    window.grammarService = grammarService;
    window.grammarStore = grammarStore;
    window.getGrammarCategoryName = getCategoryName;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      getLocalizedText: getLocalizedText,
      grammarService: grammarService,
      grammarStore: grammarStore,
      filterGrammarCatalog: filterGrammarCatalog,
      getJoinedGrammarList: getJoinedGrammarList,
      findGrammarPointsByWord: findGrammarPointsByWord,
      getSampleById: getSampleById,
      getCatalogData: getCatalogData,
      getSamplesData: getSamplesData,
      getGrammarCategories: getGrammarCategories,
      getCategoryName: getCategoryName,
      getGrammarLevels: getGrammarLevels,
      savePracticeResult: savePracticeResult,
      getPracticeResult: getPracticeResult
    };
  }
})();
