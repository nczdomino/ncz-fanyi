/**
 * js/features/learn-service.js
 * 
 * Core Logic & Data Engine for Halou Smart Study Hub (Học tập & Luyện phản xạ):
 * - Fast multi-field search (Hanzi, Pinyin with/without tones, Hán-Việt, Trilingual meanings)
 * - Category & HSK Level filter pipeline
 * - Spaced Repetition System (SRS SM-2 hybrid engine)
 * - Dynamic 4-option Quiz Generator (Meaning Match, Pinyin Match, Audio Listening)
 * - 214 Kangxi Radicals query engine
 * - Starred Favorites & Progress Persistence
 * 
 * UMD module compatible with Node.js and Browser environments.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../data/learn-data.js'], factory);
  } else if (typeof module === 'object' && module.exports) {
    const data = require('../data/learn-data.js');
    module.exports = factory(data);
  } else {
    root.LearnService = factory(root.HALOU_LEARN_DATA);
  }
}(typeof self !== 'undefined' ? self : this, function (learnDataset) {
  'use strict';

  // Fallback safe reference
  const dataset = learnDataset || (typeof window !== 'undefined' && window.HALOU_LEARN_DATA) || {
    categories: [],
    radicals: [],
    vocabulary: []
  };

  const STORAGE_SRS_KEY = 'halou_learn_srs_records';
  const STORAGE_FAV_KEY = 'halou_learn_favorites';
  const STORAGE_STATS_KEY = 'halou_learn_user_stats';

  // Safe localStorage accessor
  function getStorage(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      }
    } catch (e) {}
    return null;
  }

  function setStorage(key, value) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {}
  }

  // --- String Normalization for Tone-less & Accent-less Fuzzy Matching ---
  function normalizeText(str) {
    if (!str) return '';
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[üǖǘǚǜ]/g, 'u')
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '')
      .trim();
  }

  // --- Vocabulary API ---
  function getCategories() {
    return dataset.categories || [];
  }

  function getCategoryById(id) {
    return (dataset.categories || []).find(c => c.id === id) || null;
  }

  function getVocabById(id) {
    return (dataset.vocabulary || []).find(v => v.id === id) || null;
  }

  function getVocabList(filters = {}) {
    const { level = 'all', category = 'all', query = '', favoritesOnly = false } = filters;
    const favSet = new Set(getFavoriteIds());
    const normQuery = normalizeText(query);
    const rawQuery = (query || '').trim().toLowerCase();

    return (dataset.vocabulary || []).filter(item => {
      // 1. Favorites Filter
      if (favoritesOnly && !favSet.has(item.id)) {
        return false;
      }

      // 2. Level Filter
      if (level !== 'all' && item.level !== level) {
        return false;
      }

      // 3. Category Filter
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      // 4. Search Query Filter
      if (normQuery || rawQuery) {
        const matchHanzi = item.hanzi && item.hanzi.includes(rawQuery);
        const matchPinyin = item.pinyin && (item.pinyin.toLowerCase().includes(rawQuery) || normalizeText(item.pinyin).includes(normQuery));
        const matchHanviet = item.hanviet && (item.hanviet.toLowerCase().includes(rawQuery) || normalizeText(item.hanviet).includes(normQuery));
        
        const viMeaning = (item.meanings && item.meanings.vi) || '';
        const enMeaning = (item.meanings && item.meanings.en) || '';
        const jaMeaning = (item.meanings && item.meanings.ja) || '';

        const matchVi = normalizeText(viMeaning).includes(normQuery);
        const matchEn = enMeaning.toLowerCase().includes(rawQuery);
        const matchJa = jaMeaning.includes(rawQuery);

        if (!matchHanzi && !matchPinyin && !matchHanviet && !matchVi && !matchEn && !matchJa) {
          return false;
        }
      }

      return true;
    });
  }

  // --- 214 Radicals API ---
  function getRadicals(strokeFilter = 'all') {
    const list = dataset.radicals || [];
    if (!strokeFilter || strokeFilter === 'all') {
      return list;
    }
    const num = Number(strokeFilter);
    if (!isNaN(num) && num > 0) {
      return list.filter(r => r.strokes === num);
    }
    return list;
  }

  function getRadicalById(id) {
    return (dataset.radicals || []).find(r => r.id === id) || null;
  }

  function searchRadicals(query) {
    if (!query) return dataset.radicals || [];
    const q = query.trim().toLowerCase();
    const norm = normalizeText(q);

    return (dataset.radicals || []).filter(r => {
      if (r.radical.includes(q)) return true;
      if (r.pinyin && (r.pinyin.toLowerCase().includes(q) || normalizeText(r.pinyin).includes(norm))) return true;
      if (r.hanviet && normalizeText(r.hanviet).includes(norm)) return true;
      if (r.meaning) {
        if (normalizeText(r.meaning.vi).includes(norm)) return true;
        if (r.meaning.en && r.meaning.en.toLowerCase().includes(q)) return true;
        if (r.meaning.ja && r.meaning.ja.includes(q)) return true;
      }
      return false;
    });
  }

  // --- Starred Favorites API ---
  function getFavoriteIds() {
    return getStorage(STORAGE_FAV_KEY) || [];
  }

  function isFavorite(id) {
    if (!id) return false;
    const list = getFavoriteIds();
    return list.includes(id);
  }

  function toggleFavorite(id) {
    if (!id) return false;
    let list = getFavoriteIds();
    const index = list.indexOf(id);
    let newState = false;
    if (index >= 0) {
      list.splice(index, 1);
      newState = false;
    } else {
      list.push(id);
      newState = true;
    }
    setStorage(STORAGE_FAV_KEY, list);
    return newState;
  }

  function getFavoritesCount() {
    return getFavoriteIds().length;
  }

  // --- Spaced Repetition System (SRS SM-2 Hybrid Engine) ---
  function getAllSrsRecords() {
    return getStorage(STORAGE_SRS_KEY) || {};
  }

  function getSrsRecord(id) {
    const all = getAllSrsRecords();
    return all[id] || {
      reps: 0,
      interval: 0,
      nextDue: 0,
      lastReviewed: 0,
      mastery: 0 // 0: new, 1: learning, 2: review, 3: mastered
    };
  }

  function recordSrsReview(id, rating) {
    // rating: 'again' (fail), 'good' (pass), 'easy' (fluent)
    if (!id) return;
    const all = getAllSrsRecords();
    const cur = all[id] || { reps: 0, interval: 0, nextDue: 0, lastReviewed: 0, mastery: 0 };
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    let reps = cur.reps || 0;
    let interval = cur.interval || 0;
    let mastery = cur.mastery || 0;

    if (rating === 'again') {
      reps = 0;
      interval = 1; // 1 day
      mastery = 1; // learning
    } else if (rating === 'good') {
      reps += 1;
      if (reps === 1) {
        interval = 1;
      } else if (reps === 2) {
        interval = 3;
      } else {
        interval = Math.round(interval * 2);
      }
      mastery = reps >= 4 ? 3 : 2;
    } else if (rating === 'easy') {
      reps += 2;
      interval = interval === 0 ? 4 : Math.round(interval * 2.5) + 3;
      mastery = reps >= 3 ? 3 : 2;
    }

    all[id] = {
      reps,
      interval,
      nextDue: now + interval * ONE_DAY,
      lastReviewed: now,
      mastery
    };

    setStorage(STORAGE_SRS_KEY, all);

    // Update streak tracking
    updateStudyStreak(now);

    return all[id];
  }

  function updateStudyStreak(nowTimestamp) {
    const stats = getStorage(STORAGE_STATS_KEY) || { streak: 0, lastStudyDay: '' };
    const todayStr = new Date(nowTimestamp).toISOString().slice(0, 10);
    const yesterdayStr = new Date(nowTimestamp - 86400000).toISOString().slice(0, 10);

    if (stats.lastStudyDay === todayStr) {
      // already counted today
      return stats.streak;
    } else if (stats.lastStudyDay === yesterdayStr) {
      stats.streak = (stats.streak || 0) + 1;
    } else {
      stats.streak = 1;
    }

    stats.lastStudyDay = todayStr;
    setStorage(STORAGE_STATS_KEY, stats);
    return stats.streak;
  }

  function getStudyStreak() {
    const stats = getStorage(STORAGE_STATS_KEY) || { streak: 0, lastStudyDay: '' };
    const now = Date.now();
    const todayStr = new Date(now).toISOString().slice(0, 10);
    const yesterdayStr = new Date(now - 86400000).toISOString().slice(0, 10);

    if (stats.lastStudyDay === todayStr || stats.lastStudyDay === yesterdayStr) {
      return stats.streak || 1;
    }
    return 0;
  }

  function getSrsStats() {
    const all = getAllSrsRecords();
    const totalVocab = (dataset.vocabulary || []).length;
    let reviewedCount = 0;
    let masteredCount = 0;
    let dueCount = 0;
    const now = Date.now();

    for (const id in all) {
      const rec = all[id];
      if (rec && rec.reps > 0) {
        reviewedCount++;
        if (rec.mastery === 3 || rec.reps >= 4) {
          masteredCount++;
        }
        if (rec.nextDue <= now) {
          dueCount++;
        }
      }
    }

    return {
      totalVocab,
      reviewedCount,
      masteredCount,
      dueCount,
      streak: getStudyStreak(),
      favoritesCount: getFavoritesCount()
    };
  }

  function resetAllProgress() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_SRS_KEY);
        localStorage.removeItem(STORAGE_STATS_KEY);
      }
    } catch (e) {}
  }

  // --- Dynamic 4-Option Quiz Generator ---
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generateQuizQuestion(options = {}) {
    const { type = 'meaning', level = 'all', category = 'all', locale = 'vi' } = options;
    const pool = getVocabList({ level, category });
    if (!pool || pool.length < 4) {
      // Fallback to all vocabulary if filtered pool is too small
      return generateQuizQuestion({ type, level: 'all', category: 'all', locale });
    }

    // Pick 1 target
    const targetIdx = Math.floor(Math.random() * pool.length);
    const target = pool[targetIdx];

    // Pick 3 distinct distractors
    const candidates = pool.filter(v => v.id !== target.id);
    const shuffledCandidates = shuffleArray(candidates);
    const distractors = shuffledCandidates.slice(0, 3);

    const getOptionLabel = (item) => {
      if (type === 'pinyin') {
        return item.pinyin || '';
      }
      // meaning mode:
      if (locale === 'ja' && item.meanings?.ja) return item.meanings.ja;
      if (locale === 'en' && item.meanings?.en) return item.meanings.en;
      return (item.meanings && item.meanings.vi) || item.hanviet || '';
    };

    const targetLabel = getOptionLabel(target);

    // Build 4 choices
    const choices = [
      { id: target.id, text: targetLabel, isCorrect: true, hanzi: target.hanzi },
      ...distractors.map(d => ({
        id: d.id,
        text: getOptionLabel(d),
        isCorrect: false,
        hanzi: d.hanzi
      }))
    ];

    const shuffledChoices = shuffleArray(choices);
    const correctIndex = shuffledChoices.findIndex(c => c.isCorrect);

    return {
      targetWord: target,
      questionType: type, // 'meaning' | 'pinyin'
      promptHanzi: target.hanzi,
      promptPinyin: target.pinyin,
      promptHanviet: target.hanviet,
      choices: shuffledChoices,
      correctIndex: correctIndex
    };
  }

  function generateListeningQuestion(options = {}) {
    const { level = 'all', category = 'all', locale = 'vi' } = options;
    const pool = getVocabList({ level, category });
    const effectivePool = (pool && pool.length >= 4) ? pool : (dataset.vocabulary || []);
    
    const targetIdx = Math.floor(Math.random() * effectivePool.length);
    const target = effectivePool[targetIdx];

    const candidates = effectivePool.filter(v => v.id !== target.id);
    const distractors = shuffleArray(candidates).slice(0, 3);

    const getMeaning = (item) => {
      if (locale === 'ja' && item.meanings?.ja) return item.meanings.ja;
      if (locale === 'en' && item.meanings?.en) return item.meanings.en;
      return (item.meanings && item.meanings.vi) || item.hanviet || '';
    };

    const choices = [
      { id: target.id, hanzi: target.hanzi, pinyin: target.pinyin, meaning: getMeaning(target), isCorrect: true },
      ...distractors.map(d => ({
        id: d.id,
        hanzi: d.hanzi,
        pinyin: d.pinyin,
        meaning: getMeaning(d),
        isCorrect: false
      }))
    ];

    const shuffledChoices = shuffleArray(choices);
    const correctIndex = shuffledChoices.findIndex(c => c.isCorrect);

    return {
      targetWord: target,
      audioText: target.hanzi,
      choices: shuffledChoices,
      correctIndex: correctIndex
    };
  }

  return {
    getCategories,
    getCategoryById,
    getVocabById,
    getVocabList,
    getRadicals,
    getRadicalById,
    searchRadicals,
    isFavorite,
    toggleFavorite,
    getFavoriteIds,
    getFavoritesCount,
    getSrsRecord,
    recordSrsReview,
    getSrsStats,
    getStudyStreak,
    resetAllProgress,
    generateQuizQuestion,
    generateListeningQuestion,
    normalizeText
  };
}));
