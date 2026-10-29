/**
 * js/features/business-service.js
 * 
 * Business Chinese Service Layer:
 * - Data access for 12 categories, 144+ vocab terms, 11 emails, 10 trade docs, 10 scenarios, 24 quizzes
 * - Fast normalized in-memory search index (Hanzi, Pinyin without tones, VI, JA, EN)
 * - SM-2 Spaced Repetition System (SRS) for Flashcards
 * - Favorites & Learning Progress persistence via localStorage
 * - Dynamic email template placeholder replacer
 * 
 * UMD: Compatible with Browser (window.BusinessService) and Node.js (module.exports).
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../data/business-data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    const data = require('../data/business-data');
    module.exports = factory(data);
  } else {
    root.BusinessService = factory(root.BUSINESS_CHINESE_DATA);
  }
}(typeof self !== 'undefined' ? self : this, function(dataBundle) {
  'use strict';

  // Ensure dataset exists
  let data = dataBundle || (typeof window !== 'undefined' ? window.BUSINESS_CHINESE_DATA : null);

  // Storage keys
  const STORAGE_KEYS = {
    SRS: 'hl_bc_srs_cards_v1',
    FAVORITES: 'hl_bc_favorites_v1',
    PROGRESS: 'hl_bc_progress_v1'
  };

  // Safe localStorage helper
  const storage = {
    get: function(key, fallback) {
      if (typeof localStorage === 'undefined') return fallback;
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set: function(key, value) {
      if (typeof localStorage === 'undefined') return;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {}
    }
  };

  // Pinyin tone remover for fuzzy search
  function stripPinyinTones(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[āáǎà]/g, 'a')
      .replace(/[ēéěè]/g, 'e')
      .replace(/[īíǐì]/g, 'i')
      .replace(/[ōóǒò]/g, 'o')
      .replace(/[ūúǔùǖǘǚǜ]/g, 'u')
      .toLowerCase();
  }

  // Pre-indexed search tokens
  let searchIndex = null;
  function buildSearchIndex() {
    if (!data || !data.vocabulary) return;
    searchIndex = data.vocabulary.map(function(item) {
      const pinyinNoTones = stripPinyinTones(item.pinyin).replace(/[^a-z0-9]/g, '');
      const viDef = (item.translations && item.translations.vi ? item.translations.vi.meaning + ' ' + (item.translations.vi.note || '') : '').toLowerCase();
      const jaDef = (item.translations && item.translations.ja ? item.translations.ja.meaning + ' ' + (item.translations.ja.note || '') : '').toLowerCase();
      const enDef = (item.translations && item.translations.en ? item.translations.en.meaning + ' ' + (item.translations.en.note || '') : '').toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();

      return {
        item: item,
        term: item.term.toLowerCase(),
        pinyin: item.pinyin.toLowerCase(),
        pinyinNoTones: pinyinNoTones,
        viDef: viDef,
        jaDef: jaDef,
        enDef: enDef,
        tags: tags,
        category: item.category,
        level: item.level
      };
    });
  }

  // Service definition
  const BusinessService = {
    /**
     * Set or override dataset
     */
    setData: function(customData) {
      data = customData;
      searchIndex = null;
      buildSearchIndex();
    },

    getData: function() {
      return data;
    },

    getCategories: function() {
      return data && data.categories ? data.categories : [];
    },

    getCategoryById: function(catId) {
      if (!data || !data.categories) return null;
      for (let i = 0; i < data.categories.length; i++) {
        if (data.categories[i].id === catId) return data.categories[i];
      }
      return null;
    },

    /**
     * Search vocabulary with scoring & multi-field matching
     */
    searchVocabulary: function(query, options) {
      if (!searchIndex) buildSearchIndex();
      if (!searchIndex) return [];

      options = options || {};
      const cat = options.category;
      const level = options.level;
      const q = (query || '').trim().toLowerCase();
      const qNoTones = stripPinyinTones(q).replace(/[^a-z0-9]/g, '');

      return searchIndex
        .filter(function(entry) {
          if (cat && cat !== 'all' && entry.category !== cat) return false;
          if (level && level !== 'all' && entry.level !== level) return false;
          if (!q) return true;

          // Search criteria
          return (
            entry.term.indexOf(q) !== -1 ||
            entry.pinyin.indexOf(q) !== -1 ||
            (qNoTones && entry.pinyinNoTones.indexOf(qNoTones) !== -1) ||
            entry.viDef.indexOf(q) !== -1 ||
            entry.jaDef.indexOf(q) !== -1 ||
            entry.enDef.indexOf(q) !== -1 ||
            entry.tags.indexOf(q) !== -1
          );
        })
        .map(function(entry) {
          let score = 0;
          if (q) {
            if (entry.term === q) score += 100;
            else if (entry.term.indexOf(q) === 0) score += 60;
            else if (entry.term.indexOf(q) !== -1) score += 40;

            if (entry.pinyinNoTones === qNoTones) score += 50;
            else if (entry.pinyinNoTones.indexOf(qNoTones) === 0) score += 30;

            if (entry.viDef.indexOf(q) !== -1) score += 20;
            if (entry.enDef.indexOf(q) !== -1) score += 20;
            if (entry.jaDef.indexOf(q) !== -1) score += 20;
          }
          return { item: entry.item, score: score };
        })
        .sort(function(a, b) {
          if (b.score !== a.score) return b.score - a.score;
          return (a.item.id || '').localeCompare(b.item.id || '');
        })
        .map(function(res) {
          return res.item;
        });
    },

    getTermById: function(termId) {
      if (!data || !data.vocabulary) return null;
      for (let i = 0; i < data.vocabulary.length; i++) {
        if (data.vocabulary[i].id === termId) return data.vocabulary[i];
      }
      return null;
    },

    getEmailTemplates: function(category) {
      if (!data || !data.emailTemplates) return [];
      if (!category || category === 'all') return data.emailTemplates;
      return data.emailTemplates.filter(function(t) { return t.category === category; });
    },

    getEmailTemplateById: function(id) {
      if (!data || !data.emailTemplates) return null;
      for (let i = 0; i < data.emailTemplates.length; i++) {
        if (data.emailTemplates[i].id === id) return data.emailTemplates[i];
      }
      return null;
    },

    getTradeDocuments: function() {
      return data && data.tradeDocuments ? data.tradeDocuments : [];
    },

    getTradeDocumentById: function(id) {
      if (!data || !data.tradeDocuments) return null;
      for (let i = 0; i < data.tradeDocuments.length; i++) {
        if (data.tradeDocuments[i].id === id) return data.tradeDocuments[i];
      }
      return null;
    },

    getScenarios: function(category) {
      if (!data || !data.scenarios) return [];
      if (!category || category === 'all') return data.scenarios;
      return data.scenarios.filter(function(s) { return s.category === category; });
    },

    getScenarioById: function(id) {
      if (!data || !data.scenarios) return null;
      for (let i = 0; i < data.scenarios.length; i++) {
        if (data.scenarios[i].id === id) return data.scenarios[i];
      }
      return null;
    },

    getQuizzes: function(category) {
      if (!data || !data.quizzes) return [];
      if (!category || category === 'all') return data.quizzes;
      return data.quizzes.filter(function(q) { return q.category === category; });
    },

    getQuizById: function(id) {
      if (!data || !data.quizzes) return null;
      for (let i = 0; i < data.quizzes.length; i++) {
        if (data.quizzes[i].id === id) return data.quizzes[i];
      }
      return null;
    },

    // ----------------------------------------------------
    // Spaced Repetition System (SRS) - SM-2 Hybrid Engine
    // ----------------------------------------------------
    getSRSAllCards: function() {
      return storage.get(STORAGE_KEYS.SRS, {});
    },

    getSRSCardState: function(cardId) {
      const allCards = this.getSRSAllCards();
      return allCards[cardId] || {
        cardId: cardId,
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        lastReviewedAt: null,
        nextReviewAt: 0,
        status: 'new' // 'new' | 'learning' | 'review' | 'mastered'
      };
    },

    /**
     * Record review rating using SM-2
     * @param {string} cardId 
     * @param {'again'|'hard'|'good'|'easy'} rating 
     */
    recordSRSReview: function(cardId, rating) {
      const allCards = this.getSRSAllCards();
      const current = this.getSRSCardState(cardId);
      const now = Date.now();
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;

      let interval = current.interval;
      let repetitions = current.repetitions;
      let easeFactor = current.easeFactor;
      let status = 'review';

      if (rating === 'again') {
        repetitions = 0;
        interval = 1;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
        status = 'learning';
      } else if (rating === 'hard') {
        repetitions += 1;
        interval = Math.max(1, Math.round(interval * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15);
      } else if (rating === 'good') {
        if (repetitions === 0) {
          interval = 1;
        } else if (repetitions === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
      } else if (rating === 'easy') {
        if (repetitions === 0) {
          interval = 4;
        } else if (repetitions === 1) {
          interval = 10;
        } else {
          interval = Math.round(interval * easeFactor * 1.3);
        }
        repetitions += 1;
        easeFactor = Math.min(3.0, easeFactor + 0.15);
        if (repetitions >= 4) status = 'mastered';
      }

      const nextReviewAt = now + interval * ONE_DAY_MS;

      allCards[cardId] = {
        cardId: cardId,
        interval: interval,
        repetitions: repetitions,
        easeFactor: Number(easeFactor.toFixed(2)),
        lastReviewedAt: now,
        nextReviewAt: nextReviewAt,
        status: status
      };

      storage.set(STORAGE_KEYS.SRS, allCards);
      return allCards[cardId];
    },

    /**
     * Get cards due for review today or unreviewed cards
     */
    getDueSRSCards: function(category, limit) {
      limit = limit || 20;
      const allCards = this.getSRSAllCards();
      const vocabList = this.searchVocabulary('', { category: category });
      const now = Date.now();

      const due = [];
      const newCards = [];

      for (let i = 0; i < vocabList.length; i++) {
        const item = vocabList[i];
        const state = allCards[item.id];
        if (!state) {
          newCards.push(item);
        } else if (state.nextReviewAt <= now) {
          due.push({ item: item, nextReviewAt: state.nextReviewAt });
        }
      }

      // Sort due cards by urgency (oldest due first)
      due.sort(function(a, b) { return a.nextReviewAt - b.nextReviewAt; });
      const result = due.map(function(d) { return d.item; });

      // If due list is small, backfill with new unlearned cards
      if (result.length < limit) {
        const needed = limit - result.length;
        for (let j = 0; j < Math.min(needed, newCards.length); j++) {
          result.push(newCards[j]);
        }
      }

      return result.slice(0, limit);
    },

    getSRSStats: function() {
      const allCards = this.getSRSAllCards();
      const totalVocab = data && data.vocabulary ? data.vocabulary.length : 0;
      const now = Date.now();

      let dueCount = 0;
      let masteredCount = 0;
      let learningCount = 0;

      const keys = Object.keys(allCards);
      for (let i = 0; i < keys.length; i++) {
        const c = allCards[keys[i]];
        if (c.status === 'mastered') masteredCount++;
        else learningCount++;

        if (c.nextReviewAt <= now) dueCount++;
      }

      const totalStarted = keys.length;
      return {
        totalVocab: totalVocab,
        started: totalStarted,
        dueToday: dueCount,
        mastered: masteredCount,
        learning: learningCount,
        unseen: Math.max(0, totalVocab - totalStarted)
      };
    },

    // ----------------------------------------------------
    // User Favorites & Learning Progress
    // ----------------------------------------------------
    getFavorites: function() {
      return storage.get(STORAGE_KEYS.FAVORITES, []);
    },

    isFavorite: function(termId) {
      const favs = this.getFavorites();
      return favs.indexOf(termId) !== -1;
    },

    toggleFavorite: function(termId) {
      const favs = this.getFavorites();
      const idx = favs.indexOf(termId);
      if (idx !== -1) {
        favs.splice(idx, 1);
      } else {
        favs.push(termId);
      }
      storage.set(STORAGE_KEYS.FAVORITES, favs);
      return idx === -1;
    },

    getProgress: function() {
      return storage.get(STORAGE_KEYS.PROGRESS, {
        completedScenarios: [],
        completedQuizzes: {},
        lastActiveAt: Date.now()
      });
    },

    recordQuizCompleted: function(quizId, isCorrect) {
      const prog = this.getProgress();
      prog.completedQuizzes = prog.completedQuizzes || {};
      prog.completedQuizzes[quizId] = {
        isCorrect: !!isCorrect,
        answeredAt: Date.now()
      };
      prog.lastActiveAt = Date.now();
      storage.set(STORAGE_KEYS.PROGRESS, prog);
      return prog;
    },

    recordScenarioCompleted: function(scenarioId) {
      const prog = this.getProgress();
      prog.completedScenarios = prog.completedScenarios || [];
      if (prog.completedScenarios.indexOf(scenarioId) === -1) {
        prog.completedScenarios.push(scenarioId);
      }
      prog.lastActiveAt = Date.now();
      storage.set(STORAGE_KEYS.PROGRESS, prog);
      return prog;
    },

    // ----------------------------------------------------
    // Email Template Compiler with Custom Placeholders
    // ----------------------------------------------------
    renderEmailTemplate: function(templateId, placeholderValues, isConcise, lang) {
      const tpl = this.getEmailTemplateById(templateId);
      if (!tpl) return null;

      lang = lang || 'zh';
      let subject = tpl.subject[lang] || tpl.subject.zh;
      let body = '';

      if (isConcise && tpl.bodyConcise) {
        body = (tpl.bodyConcise.translations && tpl.bodyConcise.translations[lang]) ?
          tpl.bodyConcise.translations[lang] : tpl.bodyConcise.zh;
      } else {
        body = (tpl.bodyFormal.translations && tpl.bodyFormal.translations[lang]) ?
          tpl.bodyFormal.translations[lang] : tpl.bodyFormal.zh;
      }

      // Replace placeholders
      const values = placeholderValues || {};
      (tpl.placeholders || []).forEach(function(ph) {
        const val = values[ph.key] !== undefined && values[ph.key] !== '' ? values[ph.key] : ph.example;
        const re = new RegExp('\\[' + ph.key + '\\]', 'g');
        subject = subject.replace(re, val);
        body = body.replace(re, val);
      });

      return {
        subject: subject,
        body: body,
        fullText: 'Subject: ' + subject + '\n\n' + body
      };
    }
  };

  // Build search index on initialization
  buildSearchIndex();

  return BusinessService;
}));
