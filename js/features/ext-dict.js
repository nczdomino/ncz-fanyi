// js/features/ext-dict.js - Lazy loader for the optional CC-CEDICT extended dictionary
// Dependencies: js/features/dict-scoring.js (DICT_SCORING.setExtendedDictionary)
//
// Why this is lazy and opt-in:
//   js/data/cedict.json is ~7 MB raw (~2.9 MB over the wire once the host gzips it).
//   Downloading that on first paint would be hostile to mobile users, so it is fetched
//   only when the dictionary actually needs it, and then cached by the service worker.
//
// Two loading modes:
//   * Hanzi lookups load one small shard (js/data/cedict-shard-NN.json) using the
//     first-character index. A typical shard is 100-500 KB raw instead of 7 MB.
//   * Latin/Vietnamese reverse lookups still load the monolithic file, because they need
//     every gloss. The full file is also prefetched in the background on fast connections.
//
// Data: CC-CEDICT (https://cc-cedict.org/) - CC BY-SA 4.0. See js/data/cedict-LICENSE.txt.

const EXT_DICT = {
  url: 'js/data/cedict.json',
  indexUrl: 'js/data/cedict-index.json',
  loaded: false,
  loading: null,
  count: 0,
  totalCount: 0,
  error: null,
  lastErrorAt: 0,
  retryMs: 45000,
  index: null,
  indexLoading: null,
  indexError: null,
  shards: new Set(),
  shardLoading: new Map(),
  prefetching: null,
  lastPrefetchQuery: '',
};

/** A failed fetch should not be retried on every keystroke. */
EXT_DICT.canRetry = function () {
  return !this.lastErrorAt || (Date.now() - this.lastErrorAt) >= this.retryMs;
};

function extDictConnection() {
  try {
    return (typeof navigator !== 'undefined' && navigator.connection) || null;
  } catch (e) {
    return null;
  }
}

/** Honour Save-Data and skip networks where even a small shard is painful. */
function extDictPrefetchAllowed() {
  const conn = extDictConnection();
  if (!conn) return true;
  if (conn.saveData) return false;
  const effective = String(conn.effectiveType || '').toLowerCase();
  return effective !== 'slow-2g' && effective !== '2g';
}

/**
 * The full 7 MB file is only prefetched when the connection can absorb it. 3G is
 * deliberately excluded: it is fast enough for a single shard, but preloading the
 * monolith there would burn tens of seconds of metered data in the background.
 */
function extDictFullPrefetchAllowed() {
  if (!extDictPrefetchAllowed()) return false;
  const conn = extDictConnection();
  if (!conn) return true;
  const effective = String(conn.effectiveType || '').toLowerCase();
  return !effective || effective === '4g' || effective === 'wifi' || effective === '5g';
}

function extDictFetchJson(url) {
  return fetch(url, { cache: 'force-cache' }).then(function (res) {
    if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
    return res.json();
  });
}

function extDictFail(err) {
  EXT_DICT.error = err;
  EXT_DICT.lastErrorAt = Date.now();
  console.warn('Extended dictionary unavailable:', err && err.message);
}

function extDictRegister(map, merge) {
  if (typeof DICT_SCORING === 'undefined' || !DICT_SCORING) {
    throw new Error('dict-scoring.js is not loaded');
  }
  let count;
  if (merge && typeof DICT_SCORING.addExtendedDictionary === 'function') {
    count = DICT_SCORING.addExtendedDictionary(map);
  } else if (typeof DICT_SCORING.setExtendedDictionary === 'function') {
    count = DICT_SCORING.setExtendedDictionary(map);
  } else {
    throw new Error('dict-scoring.js has no extended dictionary API');
  }
  if (!count) throw new Error('empty payload');
  EXT_DICT.count = count;
  EXT_DICT.error = null;
  EXT_DICT.lastErrorAt = 0;
  return count;
}

/**
 * Fetch the first-character -> shard manifest once. It is small (~100 KB raw) and is
 * needed before any Hanzi shard can be selected.
 * @returns {Promise<Object|null>}
 */
function loadExtDictIndex() {
  if (EXT_DICT.index) return Promise.resolve(EXT_DICT.index);
  if (EXT_DICT.indexLoading) return EXT_DICT.indexLoading;
  if (!EXT_DICT.canRetry()) return Promise.resolve(null);

  EXT_DICT.indexLoading = extDictFetchJson(EXT_DICT.indexUrl)
    .then(function (index) {
      if (!index || typeof index !== 'object' || !index.chars || !index.shardCount) {
        throw new Error('invalid extended dictionary index');
      }
      EXT_DICT.index = index;
      EXT_DICT.indexError = null;
      EXT_DICT.totalCount = index.count || 0;
      return index;
    })
    .catch(function (err) {
      EXT_DICT.indexError = err;
      extDictFail(err);
      return null;
    })
    .finally(function () {
      EXT_DICT.indexLoading = null;
    });
  return EXT_DICT.indexLoading;
}

function extDictShardUrl(id) {
  const index = EXT_DICT.index;
  const pattern = (index && index.shardPattern) || 'js/data/cedict-shard-{id}.json';
  const count = (index && index.shardCount) || 16;
  const width = String(Math.max(0, count - 1)).length;
  let padded = String(id);
  while (padded.length < width) padded = '0' + padded;
  return pattern.replace('{id}', padded);
}

/**
 * Load the shard that owns a first character. Repeated calls share one promise.
 * @param {string} firstChar
 * @returns {Promise<boolean>}
 */
function ensureExtDictShard(firstChar) {
  if (EXT_DICT.loaded) return Promise.resolve(true);
  if (!firstChar) return Promise.resolve(false);
  if (EXT_DICT.shards.has(firstChar)) return Promise.resolve(true);
  if (EXT_DICT.shardLoading.has(firstChar)) return EXT_DICT.shardLoading.get(firstChar);
  if (!EXT_DICT.canRetry()) return Promise.resolve(false);

  const promise = loadExtDictIndex()
    .then(function (index) {
      if (!index) return false;
      const id = index.chars && index.chars[firstChar];
      if (id === undefined || id === null) return false;
      return extDictFetchJson(extDictShardUrl(id)).then(function (data) {
        if (!data || typeof data !== 'object') throw new Error('invalid extended dictionary shard');
        extDictRegister(data, true);
        EXT_DICT.shards.add(firstChar);
        return true;
      });
    })
    .catch(function (err) {
      extDictFail(err);
      return false;
    })
    .finally(function () {
      EXT_DICT.shardLoading.delete(firstChar);
    });

  EXT_DICT.shardLoading.set(firstChar, promise);
  return promise;
}

/**
 * Best-effort partial load for a query. Hanzi gets the matching shard; everything else
 * needs the full dictionary because reverse lookups scan every gloss.
 * @param {string} query
 * @returns {Promise<boolean>}
 */
function ensureExtDictFor(query) {
  const q = String(query == null ? '' : query).trim();
  if (EXT_DICT.loaded) return Promise.resolve(true);
  if (!/[\u4e00-\u9fff]/.test(q)) return ensureExtDict();
  return ensureExtDictShard(q.charAt(0)).then(function (ok) {
    if (ok) return true;
    // The index or shard may be missing on an older deployment. Fall back to the
    // monolithic file once, bypassing the cooldown set by the failed shard attempt.
    return ensureExtDict(true);
  });
}

/**
 * Fetch and register the complete dictionary. Safe to call repeatedly.
 * @param {boolean} [force] bypass the failure cooldown (used for a deliberate fallback)
 * @returns {Promise<boolean>} true when the dictionary is available
 */
function ensureExtDict(force) {
  if (EXT_DICT.loaded) return Promise.resolve(true);
  if (EXT_DICT.loading) return EXT_DICT.loading;
  if (!force && !EXT_DICT.canRetry()) return Promise.resolve(false);

  EXT_DICT.loading = extDictFetchJson(EXT_DICT.url)
    .then(function (data) {
      if (!data || typeof data !== 'object') throw new Error('invalid payload');
      extDictRegister(data, false);
      EXT_DICT.loaded = true;
      EXT_DICT.shards.clear();
      return true;
    })
    .catch(function (err) {
      extDictFail(err);
      return false;
    })
    .finally(function () {
      EXT_DICT.loading = null;
    });
  return EXT_DICT.loading;
}

/**
 * Background warm-up. The index is always safe; the 7 MB monolith is only fetched when
 * the browser reports a fast connection and the user has not asked to save data.
 */
function prefetchExtDict() {
  if (EXT_DICT.loaded || EXT_DICT.loading || EXT_DICT.prefetching) return;
  if (!extDictPrefetchAllowed()) return;

  const run = function () {
    EXT_DICT.prefetching = loadExtDictIndex()
      .then(function (index) {
        if (!index) {
          if (extDictFullPrefetchAllowed()) return ensureExtDict(true);
          return false;
        }
        if (!extDictFullPrefetchAllowed()) return true;
        return ensureExtDict();
      })
      .catch(function (err) {
        extDictFail(err);
        return false;
      })
      .finally(function () {
        EXT_DICT.prefetching = null;
      });
  };

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 1200);
  }
}

/** Warm just the shard for the first Hanzi character the user is typing. */
function prefetchExtDictForQuery(query) {
  const q = String(query == null ? '' : query).trim();
  if (!q || !/[\u4e00-\u9fff]/.test(q)) return;
  if (EXT_DICT.loaded || !extDictPrefetchAllowed()) return;
  const first = q.charAt(0);
  if (EXT_DICT.lastPrefetchQuery === first) return;
  EXT_DICT.lastPrefetchQuery = first;
  ensureExtDictShard(first);
}

if (typeof window !== 'undefined') {
  window.EXT_DICT = EXT_DICT;
  window.ensureExtDict = ensureExtDict;
  window.ensureExtDictFor = ensureExtDictFor;
  window.ensureExtDictShard = ensureExtDictShard;
  window.prefetchExtDict = prefetchExtDict;
  window.prefetchExtDictForQuery = prefetchExtDictForQuery;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EXT_DICT,
    ensureExtDict,
    ensureExtDictFor,
    ensureExtDictShard,
    prefetchExtDict,
    prefetchExtDictForQuery,
  };
}
