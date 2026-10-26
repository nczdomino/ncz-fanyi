// js/features/dict-ai-fallback.js - Automatic, cost-controlled AI fallback for the dictionary.
//
// When a lookup finds nothing in the local dictionaries we ask the AI once, then cache the
// answer in IndexedDB for a month. Cost controls on purpose:
//   * only runs after the user stops typing (debounce);
//   * one request per query per session (in-flight de-duplication);
//   * small per-minute / per-day budget kept in localStorage;
//   * cheap model + short JSON prompt on the server (see api/translate.js "dict_lookup");
//   * failures are cached for 10 minutes so a broken backend is not hammered;
//   * no request when the browser is offline.
//
// Dependencies: js/core/state.js, js/core/db.js, js/core/utils.js

var AI_LOOKUP = {
  ram: new Map(),
  inflight: new Map(),
  autoRequested: new Set(),
  autoWordRequested: new Set(),
  timer: null,
  pending: null,
  debounceMs: 900,
  cacheTtlMs: 30 * 86400000,
  errorTtlMs: 10 * 60 * 1000,
  minQueryLen: 2,
  maxQueryLen: 60,
  maxHanziLen: 12,
  perMinute: 6,
  perDay: 60,
  budgetKey: 'cr_ai_lookup_budget',
};

function aiLookupNormalize(query) {
  return String(query == null ? '' : query).trim().replace(/\s+/g, ' ');
}

function aiLookupTargetLang() {
  return (typeof state !== 'undefined' && (state.meaningLang || state.uiLang)) || 'vi';
}

// A Japanese description is usually kanji + kana, so kana is the reliable signal that
// the input is a sentence to describe rather than a Chinese headword to look up.
function aiLookupHasKana(query) {
  return /[\u3040-\u30ff]/.test(String(query == null ? '' : query));
}

function aiLookupMode(query, detectedLang) {
  var q = aiLookupNormalize(query);
  if (aiLookupHasKana(q) || detectedLang === 'ja') return 'semantic';
  if (/[\u4e00-\u9fff]/.test(q)) return 'word';
  return 'semantic';
}

function aiLookupKey(mode, lang, query) {
  return 'ai_fallback:v1:' + mode + ':' + (lang || 'vi') + ':' + aiLookupNormalize(query).toLowerCase();
}

function aiLookupEligible(query, mode) {
  var q = aiLookupNormalize(query);
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;
  var hasKana = aiLookupHasKana(q);
  if (mode === 'word') {
    // A single Hanzi character is a perfectly valid dictionary lookup, so the minimum
    // length only applies to free-text descriptions.
    return /[\u4e00-\u9fff]/.test(q) && !hasKana && q.length <= AI_LOOKUP.maxHanziLen;
  }
  if (q.length < AI_LOOKUP.minQueryLen || q.length > AI_LOOKUP.maxQueryLen) return false;
  // Reverse lookup: a description in Vietnamese / Japanese / English. A pure-Hanzi query
  // uses the word path instead, otherwise we would pay for a semantic search that cannot
  // help. Kana is allowed here because Japanese descriptions often contain kanji too.
  if (!hasKana && /[\u4e00-\u9fff]/.test(q)) return false;
  if (/^\d+$/.test(q)) return false;
  return true;
}

function aiLookupReadBudget() {
  try {
    var raw = localStorage.getItem(AI_LOOKUP.budgetKey);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function aiLookupAllowBudget() {
  var now = Date.now();
  var day = new Date(now).toISOString().slice(0, 10);
  var b = aiLookupReadBudget();
  if (!b.minStart || now - b.minStart >= 60000) {
    b.minStart = now;
    b.minCount = 0;
  }
  if (b.day !== day) {
    b.day = day;
    b.dayCount = 0;
  }
  if (b.minCount >= AI_LOOKUP.perMinute || b.dayCount >= AI_LOOKUP.perDay) {
    try { localStorage.setItem(AI_LOOKUP.budgetKey, JSON.stringify(b)); } catch (e) {}
    return false;
  }
  b.minCount += 1;
  b.dayCount += 1;
  try { localStorage.setItem(AI_LOOKUP.budgetKey, JSON.stringify(b)); } catch (e) {}
  return true;
}

function aiLookupBudgetResetIn() {
  var b = aiLookupReadBudget();
  if (!b.minStart) return 0;
  return Math.max(0, Math.ceil((60000 - (Date.now() - b.minStart)) / 1000));
}

function aiLookupIsFresh(rec) {
  if (!rec || typeof rec.ts !== 'number') return false;
  var ttl = rec.ok ? AI_LOOKUP.cacheTtlMs : AI_LOOKUP.errorTtlMs;
  return (Date.now() - rec.ts) < ttl;
}

async function aiLookupGetCached(key) {
  var rec = AI_LOOKUP.ram.get(key);
  if (rec) {
    if (aiLookupIsFresh(rec)) return rec;
    AI_LOOKUP.ram.delete(key);
  }
  try {
    if (typeof getFromDB !== 'function') return null;
    var row = await getFromDB('translations', key);
    if (row && row.result && aiLookupIsFresh(row.result)) {
      AI_LOOKUP.ram.set(key, row.result);
      return row.result;
    }
  } catch (e) {}
  return null;
}

function aiLookupSetCached(key, rec) {
  AI_LOOKUP.ram.set(key, rec);
  try {
    if (typeof putToDB === 'function') putToDB('translations', { q: key, result: rec });
  } catch (e) {}
}

function aiLookupFindContainer() {
  return document.getElementById('dict-ai-fallback-container');
}

function aiLookupStillWanted(query) {
  if (typeof state === 'undefined') return true;
  return aiLookupNormalize(state.searchQuery) === aiLookupNormalize(query);
}

function aiLookupHeaderBadge() {
  return '<span class="badge" style="font-size:10.5px; background:rgba(139,92,246,0.12); color:#7C3AED; border:1px solid rgba(139,92,246,0.25);">AI</span>';
}

function renderAiFallbackLoading(query) {
  var el = aiLookupFindContainer();
  if (!el) return;
  el.innerHTML = `
    <div class="dict-live-section" style="margin-top:14px;">
      <div class="dict-live-header">
        <span>✨ ${tx('AI đang tra từ', 'AI is looking it up', 'AIが調べています')}: <b>${escapeHtml(query)}</b></span>
        ${aiLookupHeaderBadge()}
      </div>
      <div style="display:flex; align-items:center; gap:8px; padding:12px 4px; color:var(--text-muted); font-size:13px;">
        <span class="spinner-small" style="display:inline-block; width:15px; height:15px; border:2px solid var(--accent); border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite;"></span>
        <span>${tx('Từ điển chưa có từ này, AI đang bổ sung kết quả…', 'Not in the dictionary yet — AI is filling the gap…', '辞書にないため、AIが結果を補完しています…')}</span>
      </div>
    </div>
  `;
}

function renderAiFallbackError(query, mode, lang, message) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var retryLabel = tx('Thử lại', 'Retry', '再試行');
  el.innerHTML = `
    <div class="dict-live-section" style="margin-top:14px; border-color:rgba(239,68,68,0.35);">
      <div class="dict-live-header">
        <span>⚠️ ${tx('AI chưa trả được kết quả', 'AI could not return a result', 'AIの結果を取得できませんでした')}</span>
        ${aiLookupHeaderBadge()}
      </div>
      <div style="padding:8px 4px; font-size:12.5px; color:var(--text-muted); line-height:1.5;">
        ${escapeHtml(message || tx('Vui lòng thử lại sau.', 'Please try again later.', '後でもう一度お試しください。'))}
        <button type="button" class="btn btn-outline btn-sm" style="margin-left:8px; font-size:11.5px; padding:2px 9px;"
          onclick="retryAutoAiLookup('${escapeQuotes(query)}', '${escapeQuotes(mode)}', '${escapeQuotes(lang)}')">↺ ${retryLabel}</button>
      </div>
    </div>
  `;
}

function renderAiFallbackBudgetNotice(query) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var wait = aiLookupBudgetResetIn();
  el.innerHTML = `
    <div class="dict-live-section" style="margin-top:14px; border-color:rgba(245,158,11,0.35);">
      <div class="dict-live-header">
        <span>💡 ${tx('AI tạm nghỉ để tiết kiệm chi phí', 'AI is paused to save cost', 'コスト節約のためAIを一時停止中')}</span>
        ${aiLookupHeaderBadge()}
      </div>
      <div style="padding:8px 4px; font-size:12.5px; color:var(--text-muted); line-height:1.5;">
        ${tx(
          `Bạn đã dùng khá nhiều lượt tra AI. Thử lại sau ${wait || 60} giây, hoặc bấm vào một từ điển bên dưới.`,
          `You have used many AI lookups. Try again in ${wait || 60}s, or use one of the dictionaries below.`,
          `AI検索の利用回数が多くなっています。${wait || 60}秒後にもう一度お試しください。`
        )}
      </div>
    </div>
  `;
}

function renderAiFallbackSemantic(concept, matches, query, cached) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var items = '';
  var list = Array.isArray(matches) ? matches.slice(0, 5) : [];
  for (var i = 0; i < list.length; i++) {
    var m = list[i] || {};
    items += `
      <div class="dict-semantic-item" onclick="openWordSheet('${escapeQuotes(m.word || '')}')">
        <div class="dict-semantic-item-top">
          <div>
            <span class="dict-semantic-zh">${escapeHtml(m.word || '')}</span>
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
  if (!items) {
    renderAiFallbackError(query, 'semantic', aiLookupTargetLang(), tx('AI không tìm thấy từ phù hợp.', 'AI found no suitable word.', 'AIは適切な単語を見つけられませんでした。'));
    return;
  }
  el.innerHTML = `
    <div class="dict-live-section" style="margin-top:14px;">
      <div class="dict-live-header">
        <span>✨ ${tx('AI gợi ý từ phù hợp', 'AI suggests matching words', 'AIによる候補')}: <b>${escapeHtml(concept || query)}</b></span>
        ${aiLookupHeaderBadge()}
      </div>
      <div class="dict-semantic-results-box" style="margin-top:8px;">
        <div>${items}</div>
        <div style="font-size:11px; color:var(--text-muted); padding:6px 2px 0;">
          ${cached
            ? tx('Kết quả đã lưu trong máy, không tốn thêm chi phí.', 'Cached on this device — no extra cost.', 'この端末に保存済みの結果です。')
            : tx('Kết quả được lưu 30 ngày để lần sau tra miễn phí.', 'Saved for 30 days so the next lookup is free.', '30日間保存され、次回は無料で表示されます。')}
        </div>
      </div>
    </div>
  `;
}

function renderAiFallbackWord(entry, query, cached) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var e = entry || {};
  var word = e.word || query;
  var meanings = Array.isArray(e.secondaryMeanings) ? e.secondaryMeanings.filter(Boolean).slice(0, 3) : [];
  var examples = Array.isArray(e.examples) ? e.examples.slice(0, 2) : [];
  var synonyms = Array.isArray(e.synonymsAndDifferences) ? e.synonymsAndDifferences.slice(0, 2) : [];

  var examplesHtml = '';
  for (var i = 0; i < examples.length; i++) {
    var ex = examples[i] || {};
    var tr = ex.vi || ex.ja || ex.en || ex.translation || '';
    examplesHtml += `
      <div class="ai-word-example-item" style="margin-top:6px;">
        <div class="ai-word-ex-zh"><span>${escapeHtml(ex.zh || '')}</span></div>
        ${ex.pinyin ? `<div class="ai-word-ex-py">${escapeHtml(ex.pinyin)}</div>` : ''}
        ${tr ? `<div class="ai-word-ex-vi">${escapeHtml(tr)}</div>` : ''}
      </div>
    `;
  }

  var synonymsHtml = '';
  for (var j = 0; j < synonyms.length; j++) {
    var s = synonyms[j] || {};
    synonymsHtml += `<div class="ai-word-diff-item"><b style="color:var(--accent);">${escapeHtml(s.word || '')}:</b> <span style="color:var(--text-secondary);">${escapeHtml(s.diff || '')}</span></div>`;
  }

  el.innerHTML = `
    <div class="dict-live-section" style="margin-top:14px;">
      <div class="dict-live-header">
        <span>✨ ${tx('AI bổ sung từ chưa có trong từ điển', 'AI filled in a word missing from the dictionary', '辞書にない単語をAIが補完')}</span>
        ${aiLookupHeaderBadge()}
      </div>
      <div class="dict-item-card" style="cursor:default; margin-top:8px;">
        <div style="flex:1; min-width:0;">
          <div class="dict-item-left">
            <span class="dict-hanzi" lang="zh-CN">${escapeHtml(word)}</span>
            <span class="dict-pinyin">${escapeHtml(e.pinyin || '')}</span>
            ${e.partOfSpeech ? `<span class="dict-hanviet">${escapeHtml(e.partOfSpeech)}</span>` : ''}
          </div>
          <div class="dict-meaning">
            <b>${escapeHtml(e.primaryMeaning || '')}</b>
            ${meanings.length ? `<div style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">${meanings.map(escapeHtml).join(' • ')}</div>` : ''}
          </div>
        </div>
      </div>
      ${e.nuanceAndUsage ? `<div class="ai-word-nuance-box" style="margin-top:8px;">${escapeHtml(e.nuanceAndUsage)}</div>` : ''}
      ${examplesHtml ? `<div style="margin-top:8px;"><div class="ai-word-section-title">${tx('Ví dụ', 'Examples', '例文')}</div>${examplesHtml}</div>` : ''}
      ${synonymsHtml ? `<div style="margin-top:8px;"><div class="ai-word-section-title">${tx('Từ gần nghĩa', 'Near synonyms', '類義語')}</div>${synonymsHtml}</div>` : ''}
      ${e.memoryTip ? `<div class="ai-word-tip-box" style="margin-top:8px;">🧠 ${escapeHtml(e.memoryTip)}</div>` : ''}
      <div style="font-size:11px; color:var(--text-muted); padding:6px 2px 0;">
        ${cached
          ? tx('Kết quả đã lưu trong máy, không tốn thêm chi phí.', 'Cached on this device — no extra cost.', 'この端末に保存済みの結果です。')
          : tx('Kết quả được lưu 30 ngày để lần sau tra miễn phí.', 'Saved for 30 days so the next lookup is free.', '30日間保存され、次回は無料で表示されます。')}
      </div>
    </div>
  `;
}

function aiLookupRenderRecord(rec, query, mode, lang) {
  if (!rec || !rec.ok || !rec.data) return false;
  if (rec.data.kind === 'semantic') {
    renderAiFallbackSemantic(rec.data.concept, rec.data.matches, query, true);
    return true;
  }
  if (rec.data.kind === 'word') {
    renderAiFallbackWord(rec.data.entry, query, true);
    return true;
  }
  return false;
}

async function aiLookupStart(query, mode, lang, force) {
  var q = aiLookupNormalize(query);
  if (!aiLookupEligible(q, mode)) return;
  var key = aiLookupKey(mode, lang, q);

  if (!force) {
    var cached = await aiLookupGetCached(key);
    if (cached && cached.ok) {
      if (aiLookupStillWanted(q)) aiLookupRenderRecord(cached, q, mode, lang);
      return;
    }
    if (cached && !cached.ok) {
      if (aiLookupStillWanted(q)) renderAiFallbackError(q, mode, lang, cached.message);
      return;
    }
  }

  if (AI_LOOKUP.inflight.has(key)) return;
  if (!aiLookupStillWanted(q)) return;

  if (!aiLookupAllowBudget()) {
    renderAiFallbackBudgetNotice(q);
    return;
  }

  renderAiFallbackLoading(q);

  var request;
  if (mode === 'word') {
    request = fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: q,
        targetLang: lang,
        type: 'dict_lookup'
      })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error((data && (data.message || data.error)) || ('HTTP ' + res.status));
        return data;
      });
    }).then(function (data) {
      if (!data || !data.entry) throw new Error('EMPTY_AI_RESPONSE');
      var rec = { ts: Date.now(), ok: true, data: { kind: 'word', entry: data.entry } };
      aiLookupSetCached(key, rec);
      return rec;
    });
  } else {
    request = fetch('/api/dict/semantic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: q,
        targetLang: lang,
        fast: true
      })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error((data && (data.message || data.error)) || ('HTTP ' + res.status));
        return data;
      });
    }).then(function (data) {
      if (!data || !data.success || !Array.isArray(data.matches) || !data.matches.length) {
        throw new Error('EMPTY_AI_RESPONSE');
      }
      var rec = { ts: Date.now(), ok: true, data: { kind: 'semantic', concept: data.concept || q, matches: data.matches } };
      aiLookupSetCached(key, rec);
      return rec;
    });
  }

  AI_LOOKUP.inflight.set(key, request);
  try {
    var rec = await request;
    if (aiLookupStillWanted(q)) aiLookupRenderRecord(rec, q, mode, lang);
  } catch (err) {
    var msg = (err && err.message) ? err.message : '';
    var publicMsg = /EMPTY_AI_RESPONSE/.test(msg)
      ? tx('AI không tìm thấy kết quả phù hợp.', 'AI found no suitable result.', 'AIは適切な結果を見つけられませんでした。')
      : tx('Không kết nối được AI. Kết quả sẽ được thử lại sau ít phút.', 'Could not reach AI. It will retry later.', 'AIに接続できませんでした。しばらくしてから再試行します。');
    aiLookupSetCached(key, { ts: Date.now(), ok: false, message: publicMsg });
    if (aiLookupStillWanted(q)) renderAiFallbackError(q, mode, lang, publicMsg);
  } finally {
    AI_LOOKUP.inflight.delete(key);
  }
}

function retryAutoAiLookup(query, mode, lang) {
  var q = aiLookupNormalize(query);
  if (!q) return;
  var key = aiLookupKey(mode, lang, q);
  AI_LOOKUP.ram.delete(key);
  aiLookupStart(q, mode, lang, true);
}

// Called from renderDictView() when the local search produced no confident result.
function autoAiLookup(query, detectedLang) {
  var q = aiLookupNormalize(query);
  if (!q) return;
  var mode = aiLookupMode(q, detectedLang);
  var lang = aiLookupTargetLang();
  var key = aiLookupKey(mode, lang, q);
  if (!aiLookupEligible(q, mode)) return;
  if (AI_LOOKUP.autoRequested.has(key)) {
    // A re-render (language switch, etc.) should still show a cached answer without a call.
    aiLookupGetCached(key).then(function (rec) {
      if (rec && rec.ok && aiLookupStillWanted(q)) aiLookupRenderRecord(rec, q, mode, lang);
    });
    return;
  }
  AI_LOOKUP.autoRequested.add(key);

  // Already in RAM? Render immediately, no debounce and no network.
  var ram = AI_LOOKUP.ram.get(key);
  if (ram && aiLookupIsFresh(ram) && ram.ok) {
    aiLookupRenderRecord(ram, q, mode, lang);
    return;
  }

  if (AI_LOOKUP.timer) {
    clearTimeout(AI_LOOKUP.timer);
    AI_LOOKUP.timer = null;
  }
  AI_LOOKUP.pending = { query: q, mode: mode, lang: lang, key: key };
  AI_LOOKUP.timer = setTimeout(function () {
    AI_LOOKUP.timer = null;
    var p = AI_LOOKUP.pending;
    if (!p || p.key !== key) return;
    if (!aiLookupStillWanted(q)) return;
    aiLookupStart(q, mode, lang, false);
  }, AI_LOOKUP.debounceMs);
}

// Called from renderWordSheetAiSection() for a Hanzi word that is absent from every local
// dictionary. It reuses the existing manual analysis flow, so the result is cached in
// state.cachedAiAnalysis / IndexedDB and is free the next time the sheet opens.
function autoAnalyzeWordWithAi(word, lang) {
  var w = aiLookupNormalize(word);
  if (!w || !/[\u4e00-\u9fff]/.test(w)) return;
  if (w.length > AI_LOOKUP.maxHanziLen) return;
  var key = 'word_analysis:' + (lang || 'vi') + ':' + w.toLowerCase();
  if (AI_LOOKUP.autoWordRequested.has(key)) return;
  AI_LOOKUP.autoWordRequested.add(key);
  if (!aiLookupAllowBudget()) return;
  if (typeof analyzeActiveWordWithAi !== 'function') return;
  try {
    analyzeActiveWordWithAi(w);
  } catch (e) {
    console.warn('Auto AI word analysis failed:', e && e.message);
  }
}

if (typeof window !== 'undefined') {
  window.AI_LOOKUP = AI_LOOKUP;
  window.autoAiLookup = autoAiLookup;
  window.retryAutoAiLookup = retryAutoAiLookup;
  window.autoAnalyzeWordWithAi = autoAnalyzeWordWithAi;
  window.aiLookupKey = aiLookupKey;
  window.aiLookupGetCached = aiLookupGetCached;
}
