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
  abortController: null,
  abortKey: null,
  debounceMs: 550,
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

// Pick a label in the language of the answer, not the UI language. In Chinese
// dictionary mode the whole AI card should read as Chinese.
function aiLookupText(lang, vi, en, ja, zh) {
  if (lang === 'zh') return zh || vi;
  if (lang === 'ja') return ja || vi;
  if (lang === 'en') return en || vi;
  return vi;
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

function aiLookupStillWanted(query, lang) {
  if (typeof state === 'undefined') return true;
  if (aiLookupNormalize(state.searchQuery) !== aiLookupNormalize(query)) return false;
  // The user switched dictionary mode while the request was in flight. A Vietnamese
  // answer must never paint over a Chinese-mode result (and vice versa).
  if (lang && typeof dictMeaningLang === 'function' && dictMeaningLang() !== lang) return false;
  return true;
}

function aiLookupHeaderBadge() {
  return '<span class="ai-lookup-badge">AI</span>';
}

function aiLookupShell(titleHtml, bodyHtml) {
  return `
    <div class="ai-lookup-section">
      <div class="ai-lookup-head">
        <span class="ai-lookup-head-title">${titleHtml}</span>
        ${aiLookupHeaderBadge()}
      </div>
      ${bodyHtml}
    </div>
  `;
}

function aiLookupFootHtml(cached, lang) {
  return `
    <div class="ai-lookup-foot">
      <span class="ai-lookup-foot-dot"></span>
      <span>${cached
        ? aiLookupText(lang,
          'Kết quả đã lưu trong máy, không tốn thêm chi phí.',
          'Cached on this device — no extra cost.',
          'この端末に保存済みの結果です。',
          '结果已保存在本机，不会产生额外费用。')
        : aiLookupText(lang,
          'Kết quả được lưu 30 ngày để lần sau tra miễn phí.',
          'Saved for 30 days so the next lookup is free.',
          '30日間保存され、次回は無料で表示されます。',
          '结果会保存 30 天，下次查询免费。')}</span>
    </div>`;
}

// Rendered by dict.js during the debounce window, so the results area is never blank.
function aiLookupPlaceholderHtml(lang) {
  return `
    <div class="ai-lookup-placeholder">
      <span>✨</span>
      <span>${aiLookupText(lang,
        'Không có trong từ điển máy. AI đang bổ sung kết quả…',
        'Not in the local dictionary. AI is filling the gap…',
        'ローカル辞書にありません。AIが結果を補完します…',
        '本地词典暂无结果，AI 正在补充中文释义…')}</span>
    </div>`;
}

function renderAiFallbackLoading(query, lang) {
  var el = aiLookupFindContainer();
  if (!el) return;
  el.innerHTML = aiLookupShell(
    `<span>✨</span><span>${aiLookupText(lang, 'AI đang tra từ', 'AI is looking it up', 'AIが調べています', 'AI 正在查询')}: <b>${escapeHtml(query)}</b></span>`,
    `
      <div class="ai-lookup-card">
        <div class="ai-lookup-top">
          <div class="ai-lookup-headword">
            <span class="ai-lookup-sk ai-lookup-sk-hanzi"></span>
            <div class="ai-lookup-reading">
              <span class="ai-lookup-sk ai-lookup-sk-pill"></span>
              <span class="ai-lookup-sk ai-lookup-sk-pill" style="width:52px;"></span>
            </div>
          </div>
        </div>
        <span class="ai-lookup-sk ai-lookup-sk-line" style="width:82%; margin-top:18px;"></span>
        <span class="ai-lookup-sk ai-lookup-sk-line" style="width:64%;"></span>
        <span class="ai-lookup-sk ai-lookup-sk-line short" style="margin-top:16px;"></span>
        <span class="ai-lookup-sk ai-lookup-sk-line" style="width:70%;"></span>
        <div class="ai-lookup-foot" style="border-top:none;">
          <span>${aiLookupText(lang, 'Từ điển chưa có từ này, AI đang bổ sung kết quả…', 'Not in the dictionary yet — AI is filling the gap…', '辞書にないため、AIが結果を補完しています…', '词典暂无该词，AI 正在补充中文释义…')}</span>
        </div>
      </div>
    `
  );
}

function renderAiFallbackError(query, mode, lang, message) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var retryLabel = aiLookupText(lang, 'Thử lại', 'Retry', '再試行', '重试');
  el.innerHTML = `
    <div class="ai-lookup-section" style="--ai-accent:#DC2626; --ai-accent-soft:rgba(220,38,38,0.07); --ai-accent-line:rgba(220,38,38,0.28);">
      <div class="ai-lookup-head">
        <span class="ai-lookup-head-title">⚠️ ${aiLookupText(lang, 'AI chưa trả được kết quả', 'AI could not return a result', 'AIの結果を取得できませんでした', 'AI 暂时无法返回结果')}</span>
        ${aiLookupHeaderBadge()}
      </div>
      <div class="ai-lookup-card" style="display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap;">
        <div style="flex:1 1 220px; font-size:13px; line-height:1.55; color:var(--text-secondary);">
          ${escapeHtml(message || aiLookupText(lang, 'Vui lòng thử lại sau.', 'Please try again later.', '後でもう一度お試しください。', '请稍后重试。'))}
        </div>
        <button type="button" class="btn btn-outline btn-sm" style="font-size:12px; padding:5px 12px; border-radius:10px;"
          onclick="retryAutoAiLookup('${escapeQuotes(query)}', '${escapeQuotes(mode)}', '${escapeQuotes(lang)}')">↺ ${retryLabel}</button>
      </div>
    </div>
  `;
}

function renderAiFallbackBudgetNotice(query, lang) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var wait = aiLookupBudgetResetIn();
  el.innerHTML = `
    <div class="ai-lookup-section" style="--ai-accent:#B45309; --ai-accent-soft:rgba(245,158,11,0.09); --ai-accent-line:rgba(245,158,11,0.32);">
      <div class="ai-lookup-head">
        <span class="ai-lookup-head-title">💡 ${aiLookupText(lang, 'AI tạm nghỉ để tiết kiệm chi phí', 'AI is paused to save cost', 'コスト節約のためAIを一時停止中', 'AI 暂停以节省费用')}</span>
        ${aiLookupHeaderBadge()}
      </div>
      <div class="ai-lookup-card" style="font-size:13px; line-height:1.6; color:var(--text-secondary);">
        ${aiLookupText(lang,
          `Bạn đã dùng khá nhiều lượt tra AI. Thử lại sau ${wait || 60} giây, hoặc bấm vào một từ điển bên dưới.`,
          `You have used many AI lookups. Try again in ${wait || 60}s, or use one of the dictionaries below.`,
          `AI検索の利用回数が多くなっています。${wait || 60}秒後にもう一度お試しください。`,
          `你已使用较多 AI 查询。请在 ${wait || 60} 秒后重试，或点击下方词典。`
        )}
      </div>
    </div>
  `;
}

function renderAiFallbackSemantic(concept, matches, query, cached, lang) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var items = '';
  var list = Array.isArray(matches) ? matches.slice(0, 6) : [];
  for (var i = 0; i < list.length; i++) {
    var m = list[i] || {};
    if (!m.word) continue;
    items += `
      <div class="ai-lookup-match" role="button" tabindex="0"
           onclick="openWordSheet('${escapeQuotes(m.word)}')"
           onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
        <div class="ai-lookup-match-top">
          <span class="ai-lookup-match-zh" lang="zh-CN">${escapeHtml(m.word)}</span>
          ${m.pinyin ? `<span class="ai-lookup-match-py">${escapeHtml(m.pinyin)}</span>` : ''}
          ${m.hsk ? `<span class="ai-lookup-match-hsk">${escapeHtml(m.hsk)}</span>` : ''}
        </div>
        ${m.meaning ? `<div class="ai-lookup-match-meaning">${escapeHtml(m.meaning)}</div>` : ''}
        ${m.nuance ? `<div class="ai-lookup-match-nuance">${escapeHtml(m.nuance)}</div>` : ''}
        ${m.example ? `<div class="ai-lookup-match-example">💬 ${escapeHtml(m.example)}</div>` : ''}
      </div>
    `;
  }
  if (!items) {
    renderAiFallbackError(query, 'semantic', lang, aiLookupText(lang,
      'AI không tìm thấy từ phù hợp.',
      'AI found no suitable word.',
      'AIは適切な単語を見つけられませんでした。',
      'AI 没有找到合适的词语。'));
    return;
  }
  el.innerHTML = aiLookupShell(
    `<span>✨</span><span>${aiLookupText(lang, 'AI gợi ý từ phù hợp', 'AI suggests matching words', 'AIによる候補', 'AI 推荐的词语')}</span>`,
    `
      <div class="ai-lookup-card">
        <div class="ai-lookup-concept" style="margin-top:0;">
          ${aiLookupText(lang, 'Bạn đang tìm', 'You are looking for', '探している内容', '你正在查找')}: <b>${escapeHtml(concept || query)}</b>
        </div>
        <div class="ai-lookup-matches">${items}</div>
        ${aiLookupFootHtml(cached, lang)}
      </div>
    `
  );
}

function renderAiFallbackWord(entry, query, cached, lang) {
  var el = aiLookupFindContainer();
  if (!el) return;
  var e = entry || {};
  var word = e.word || query;
  var meanings = Array.isArray(e.secondaryMeanings) ? e.secondaryMeanings.filter(Boolean).slice(0, 4) : [];
  var examples = Array.isArray(e.examples) ? e.examples.slice(0, 4) : [];
  var synonyms = Array.isArray(e.synonymsAndDifferences) ? e.synonymsAndDifferences.slice(0, 4) : [];

  var examplesHtml = '';
  for (var i = 0; i < examples.length; i++) {
    var ex = examples[i] || {};
    var tr = ex.explanation || ex.vi || ex.ja || ex.en || ex.translation || '';
    if (!ex.zh && !tr) continue;
    examplesHtml += `
      <div class="ai-lookup-example">
        ${ex.zh ? `<div class="ai-lookup-ex-zh" lang="zh-CN">${escapeHtml(ex.zh)}</div>` : ''}
        ${ex.pinyin ? `<div class="ai-lookup-ex-py">${escapeHtml(ex.pinyin)}</div>` : ''}
        ${tr ? `<div class="ai-lookup-ex-vi">${escapeHtml(tr)}</div>` : ''}
      </div>
    `;
  }

  var synonymsHtml = '';
  for (var j = 0; j < synonyms.length; j++) {
    var s = synonyms[j] || {};
    if (!s.word && !s.diff) continue;
    synonymsHtml += `
      <div class="ai-lookup-syn">
        ${s.word ? `<span class="ai-lookup-syn-word" lang="zh-CN">${escapeHtml(s.word)}</span>` : ''}
        ${s.diff ? `<span class="ai-lookup-syn-diff">${escapeHtml(s.diff)}</span>` : ''}
      </div>
    `;
  }

  var tags = '';
  if (e.partOfSpeech) tags += `<span class="ai-lookup-tag">${escapeHtml(e.partOfSpeech)}</span>`;
  if (e.formality) tags += `<span class="ai-lookup-tag ai-lookup-tag-ai">${escapeHtml(e.formality)}</span>`;
  var listenLabel = aiLookupText(lang, 'Nghe phát âm', 'Listen', '発音を聞く', '朗读');

  el.innerHTML = aiLookupShell(
    `<span>✨</span><span>${aiLookupText(lang,
      'AI bổ sung từ chưa có trong từ điển',
      'AI filled in a word missing from the dictionary',
      '辞書にない単語をAIが補完',
      'AI 中文词典释义')}</span>`,
    `
      <div class="ai-lookup-card">
        <div class="ai-lookup-top">
          <div class="ai-lookup-headword">
            <span class="ai-lookup-hanzi" lang="zh-CN">${escapeHtml(word)}</span>
            <div class="ai-lookup-reading">
              ${e.pinyin ? `<span class="ai-lookup-pinyin">${escapeHtml(e.pinyin)}</span>` : ''}
              ${tags ? `<div class="ai-lookup-tags">${tags}</div>` : ''}
            </div>
          </div>
          <button type="button" class="icon-btn ai-lookup-speak" onclick="speakText('${escapeQuotes(word)}')"
            title="${listenLabel}" aria-label="${listenLabel}">
            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          </button>
        </div>

        ${e.primaryMeaning ? `<div class="ai-lookup-primary">${escapeHtml(e.primaryMeaning)}</div>` : ''}
        ${meanings.length ? `<div class="ai-lookup-secondary">${meanings.map(function (m) { return `<span>${escapeHtml(m)}</span>`; }).join('')}</div>` : ''}

        ${e.nuanceAndUsage ? `
          <div class="ai-lookup-nuance">
            <span class="ai-lookup-nuance-label">${aiLookupText(lang, 'Sắc thái & cách dùng', 'Nuance & usage', 'ニュアンスと用法', '语体与用法')}</span>
            ${escapeHtml(e.nuanceAndUsage)}
          </div>` : ''}

        ${examplesHtml ? `
          <div class="ai-lookup-block">
            <div class="ai-lookup-block-title">💬 ${aiLookupText(lang, 'Ví dụ', 'Examples', '例文', '例句')}</div>
            ${examplesHtml}
          </div>` : ''}

        ${synonymsHtml ? `
          <div class="ai-lookup-block">
            <div class="ai-lookup-block-title">🔄 ${aiLookupText(lang, 'Từ gần nghĩa', 'Near synonyms', '類義語', '近义词')}</div>
            ${synonymsHtml}
          </div>` : ''}

        ${e.memoryTip ? `<div class="ai-lookup-tip">🧠 ${escapeHtml(e.memoryTip)}</div>` : ''}

        ${aiLookupFootHtml(cached, lang)}
      </div>
    `
  );

  // In Chinese mode the AI entry is also the definition for the local result card.
  // Cache it and paint it into the card that is already on screen, so switching modes
  // back and forth never leaves a blank or an English placeholder behind.
  if (lang === 'zh' && e.primaryMeaning) {
    if (typeof state !== 'undefined' && state.cachedTranslations) {
      state.cachedTranslations['zh:' + word] = e.primaryMeaning;
    }
    var localMeaningEl = document.getElementById('dict-meaning-' + word);
    if (localMeaningEl) localMeaningEl.textContent = e.primaryMeaning;
  }
}

function aiLookupRenderRecord(rec, query, mode, lang) {
  if (!rec || !rec.ok || !rec.data) return false;
  if (rec.data.kind === 'semantic') {
    renderAiFallbackSemantic(rec.data.concept, rec.data.matches, query, true, lang);
    return true;
  }
  if (rec.data.kind === 'word') {
    renderAiFallbackWord(rec.data.entry, query, true, lang);
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
      if (aiLookupStillWanted(q, lang)) aiLookupRenderRecord(cached, q, mode, lang);
      return;
    }
    if (cached && !cached.ok) {
      if (aiLookupStillWanted(q, lang)) renderAiFallbackError(q, mode, lang, cached.message);
      return;
    }
  }

  if (AI_LOOKUP.inflight.has(key)) return;
  if (!aiLookupStillWanted(q, lang)) return;

  if (!aiLookupAllowBudget()) {
    renderAiFallbackBudgetNotice(q, lang);
    return;
  }

  renderAiFallbackLoading(q, lang);

  // Cancel the previous auto-lookup when the user has moved on. The server may still
  // finish its Gemini call, but the browser stops waiting and the stale result cannot
  // overwrite the new query's card.
  if (AI_LOOKUP.abortController && AI_LOOKUP.abortKey !== key) {
    try { AI_LOOKUP.abortController.abort(); } catch (e) {}
  }
  var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  AI_LOOKUP.abortController = controller;
  AI_LOOKUP.abortKey = key;
  var signal = controller ? controller.signal : undefined;

  var request;
  if (mode === 'word') {
    request = fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: signal,
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
      signal: signal,
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
    if (aiLookupStillWanted(q, lang)) aiLookupRenderRecord(rec, q, mode, lang);
  } catch (err) {
    // The user typed something else; do not cache or render an aborted request.
    if (err && err.name === 'AbortError') return;
    var msg = (err && err.message) ? err.message : '';
    var publicMsg = /EMPTY_AI_RESPONSE/.test(msg)
      ? aiLookupText(lang,
        'AI không tìm thấy kết quả phù hợp.',
        'AI found no suitable result.',
        'AIは適切な結果を見つけられませんでした。',
        'AI 没有找到合适的结果。')
      : aiLookupText(lang,
        'Không kết nối được AI. Kết quả sẽ được thử lại sau ít phút.',
        'Could not reach AI. It will retry later.',
        'AIに接続できませんでした。しばらくしてから再試行します。',
        '暂时无法连接 AI，几分钟后会自动重试。');
    aiLookupSetCached(key, { ts: Date.now(), ok: false, message: publicMsg });
    if (aiLookupStillWanted(q, lang)) renderAiFallbackError(q, mode, lang, publicMsg);
  } finally {
    AI_LOOKUP.inflight.delete(key);
    if (AI_LOOKUP.abortKey === key) {
      AI_LOOKUP.abortController = null;
      AI_LOOKUP.abortKey = null;
    }
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
function autoAiLookup(query, detectedLang, langOverride) {
  var q = aiLookupNormalize(query);
  if (!q) return;
  var mode = aiLookupMode(q, detectedLang);
  var lang = langOverride || aiLookupTargetLang();
  var key = aiLookupKey(mode, lang, q);
  if (!aiLookupEligible(q, mode)) return;
  if (AI_LOOKUP.autoRequested.has(key)) {
    // A re-render (language switch, etc.) should still show a cached answer without a call.
    aiLookupGetCached(key).then(function (rec) {
      if (!aiLookupStillWanted(q, lang)) return;
      if (rec && rec.ok) {
        aiLookupRenderRecord(rec, q, mode, lang);
      } else if (rec && !rec.ok) {
        // Failures are cached for 10 minutes; show the retry card again instead of
        // leaving the placeholder on screen forever.
        renderAiFallbackError(q, mode, lang, rec.message);
      } else {
        // The cache entry expired or the write failed. Forgetting the "already asked"
        // marker lets the debounced path try once more; budget/inflight still guard it.
        AI_LOOKUP.autoRequested.delete(key);
        autoAiLookup(q, detectedLang, lang);
      }
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
    if (!aiLookupStillWanted(q, lang)) return;
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

// The user changed the query: stop the debounce and abandon the in-flight request, so a
// slow answer for the old query can never paint over the new one.
function cancelPendingAiLookup() {
  if (AI_LOOKUP.timer) {
    clearTimeout(AI_LOOKUP.timer);
    AI_LOOKUP.timer = null;
  }
  AI_LOOKUP.pending = null;
  if (AI_LOOKUP.abortController) {
    try { AI_LOOKUP.abortController.abort(); } catch (e) {}
    AI_LOOKUP.abortController = null;
    AI_LOOKUP.abortKey = null;
  }
}

// Enter-to-search: skip the 550 ms debounce and ask immediately. Only meaningful when
// the local dictionaries missed (the caller checks that the fallback slot is on screen).
function flushAiLookup(query, detectedLang, langOverride) {
  var q = aiLookupNormalize(query);
  if (!q) return;
  if (AI_LOOKUP.timer) {
    clearTimeout(AI_LOOKUP.timer);
    AI_LOOKUP.timer = null;
  }
  AI_LOOKUP.pending = null;
  var mode = aiLookupMode(q, detectedLang);
  if (!aiLookupEligible(q, mode)) return;
  var lang = langOverride || aiLookupTargetLang();
  AI_LOOKUP.autoRequested.add(aiLookupKey(mode, lang, q));
  aiLookupStart(q, mode, lang, false);
}

if (typeof window !== 'undefined') {
  window.AI_LOOKUP = AI_LOOKUP;
  window.autoAiLookup = autoAiLookup;
  window.retryAutoAiLookup = retryAutoAiLookup;
  window.autoAnalyzeWordWithAi = autoAnalyzeWordWithAi;
  window.cancelPendingAiLookup = cancelPendingAiLookup;
  window.flushAiLookup = flushAiLookup;
  window.aiLookupKey = aiLookupKey;
  window.aiLookupGetCached = aiLookupGetCached;
  window.aiLookupEligible = aiLookupEligible;
  window.aiLookupMode = aiLookupMode;
  window.aiLookupPlaceholderHtml = aiLookupPlaceholderHtml;
}
