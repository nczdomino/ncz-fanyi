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

    if (obj[lang] && typeof obj[lang] === 'string' && obj[lang].trim() !== '') {
      return obj[lang];
    }
    // Fallback cascade
    if (obj.vi && typeof obj.vi === 'string' && obj.vi.trim() !== '') return obj.vi;
    if (obj.en && typeof obj.en === 'string' && obj.en.trim() !== '') return obj.en;
    if (obj.ja && typeof obj.ja === 'string' && obj.ja.trim() !== '') return obj.ja;

    const firstKey = Object.keys(obj)[0];
    return firstKey ? String(obj[firstKey] || '') : '';
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

      // 5. Query Search
      if (normQuery) {
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

      return true;
    });
  }

  /**
   * Get Catalog joined with full Detail rule data
   * @param {Object} [options] Filter options
   * @returns {Array<Object>} Joined grammar objects { ...catalogItem, detail, hasDetail: boolean }
   */
  function getJoinedGrammarList(options) {
    const filtered = filterGrammarCatalog(options);
    if (!_samplesMap) getSamplesData();

    return filtered.map(item => {
      const detail = _samplesMap.get(item.id) || null;
      return Object.assign({}, item, {
        detail: detail,
        hasDetail: !!detail,
        catalog: item
      });
    });
  }

  /**
   * Get unique Categories with count and localized titles
   */
  function getGrammarCategories(locale) {
    const catalog = getCatalogData();
    const map = new Map();

    const categoryNames = {
      sentence_pattern: { vi: 'Mẫu câu & Cấu trúc', ja: '基本文型・構文', en: 'Sentence Patterns' },
      preposition: { vi: 'Giới từ', ja: '前置詞（介詞）', en: 'Prepositions' },
      question: { vi: 'Câu hỏi', ja: '疑問文', en: 'Questions' },
      negation: { vi: 'Phủ định', ja: '否定表現', en: 'Negation' },
      particle: { vi: 'Trợ từ', ja: '助詞', en: 'Particles' },
      measure_word: { vi: 'Lượng từ', ja: '量詞', en: 'Measure Words' },
      aspect: { vi: 'Động thái & Thời thể', ja: 'アスペクト', en: 'Aspect' },
      modal: { vi: 'Động từ năng nguyện', ja: '助動詞（能願動詞）', en: 'Modal Verbs' },
      comparison: { vi: 'Câu so sánh', ja: '比較文', en: 'Comparison' },
      complement: { vi: 'Bổ ngữ', ja: '補語', en: 'Complements' },
      conjunction: { vi: 'Liên từ & Câu ghép', ja: '接続詞・複文', en: 'Conjunctions' },
      reduplication: { vi: 'Từ trùng điệp (Lặp từ)', ja: '重ね型', en: 'Reduplication' },
      written_style: { vi: 'Văn phong học thuật / Cổ văn', ja: '書面語・文語表現', en: 'Written Style' },
      other: { vi: 'Khác', ja: 'その他', en: 'Other' }
    };

    catalog.forEach(item => {
      const cat = item.category || 'other';
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    const result = [];
    map.forEach((count, cat) => {
      const labelObj = categoryNames[cat] || { vi: cat, ja: cat, en: cat };
      result.push({
        id: cat,
        count: count,
        name: getLocalizedText(labelObj, locale)
      });
    });

    // Sort by count DESC
    return result.sort((a, b) => b.count - a.count);
  }

  /**
   * Get unique Levels with count
   */
  function getGrammarLevels() {
    const catalog = getCatalogData();
    const levels = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6', 'HSK7-9'];
    const map = new Map();
    levels.forEach(l => map.set(l, 0));

    catalog.forEach(item => {
      if (item.level && map.has(item.level)) {
        map.set(item.level, map.get(item.level) + 1);
      }
    });

    return levels.map(l => ({
      level: l,
      count: map.get(l) || 0
    }));
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

    return hits.sort((a, b) => {
      if (a.hasDetail && !b.hasDetail) return -1;
      if (!a.hasDetail && b.hasDetail) return 1;
      return 0;
    });
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
    getGrammarLevels: getGrammarLevels,
    savePracticeResult: savePracticeResult,
    getPracticeResult: getPracticeResult,
    store: grammarStore
  };

  if (typeof window !== 'undefined') {
    window.getLocalizedText = getLocalizedText;
    window.grammarService = grammarService;
    window.grammarStore = grammarStore;
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
      getGrammarLevels: getGrammarLevels,
      savePracticeResult: savePracticeResult,
      getPracticeResult: getPracticeResult
    };
  }
})();
