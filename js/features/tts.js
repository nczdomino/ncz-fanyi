// js/features/tts.js - Multi-engine text-to-speech module
// Dependencies: js/core/state.js, js/core/utils.js, js/features/karaoke.js,
//               js/features/audio-core.js (chunking + engine selection)

// --- Module: Audio TTS (chunked, multi-engine, offline-aware) ---
//
// This replaced the previous single-shot implementation, which:
//   * silently truncated anything longer than 300 characters (`clean.slice(0, 300)`),
//     so a whole paragraph played only its first 300 characters;
//   * sent long sentences to speechSynthesis in one utterance, where Chrome drops them
//     after ~15 s;
//   * fell back between engines silently, with no way to tell which voice you heard;
//   * never used the `ttsAudioCache` it declared.
//
// The pipeline now splits text into sentence-aware chunks, picks an engine per chunk,
// remembers which engine worked, drops to the offline system voice when the network is
// gone, and reports the engine actually used via state.ttsLastEngine.

let currentAudio = null;
let activeUtterance = null;
let cachedVoices = [];
let isAudioUnlocked = false;
let lastSpeakText = '';
let lastSpeakTime = 0;
let lastSpeakSpeed = 1.0;

// Bumped by every new request and by stopSpeech(): any in-flight loop that notices a
// changed id stops immediately. This makes "click another word while the first one is
// still loading" behave correctly.
let speechRunId = 0;

// Remembers which engine produced audio for a given (length, prefix) bucket, so repeat
// playback skips engines that already failed for that kind of text.
const engineMemo = new Map();

// 1. Mobile & iOS Safari Audio Unlock on first touch/click
function unlockAudioMobile() {
  if (isAudioUnlocked) return;
  isAudioUnlocked = true;
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    const silent = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
    silent.volume = 0.01;
    silent.play().then(() => {
      try { silent.pause(); } catch (e) {}
    }).catch(() => {});
  } catch (e) {}
}
if (typeof window !== 'undefined') {
  window.addEventListener('touchstart', unlockAudioMobile, { once: true, passive: true });
  window.addEventListener('click', unlockAudioMobile, { once: true, passive: true });
}

// 2. Pre-cache and refresh Web Speech voices with Neural Voice Ranking
function initVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
  window.speechSynthesis.onvoiceschanged = initVoices;
}

// Score voice quality to favor Neural / Natural broadcaster voices
function scoreZhVoice(v) {
  if (!v || !v.lang) return -1;
  const lang = v.lang.toLowerCase();
  if (!lang.startsWith('zh') && !lang.includes('cmn')) return -1;

  let score = 10;
  const name = (v.name || '').toLowerCase();

  // Microsoft Edge Neural Voices (Gold standard for natural Mandarin)
  if (name.includes('xiaoxiao')) score += 100;
  else if (name.includes('yunxi') || name.includes('yunyang')) score += 95;
  else if (name.includes('natural') || name.includes('neural')) score += 80;

  // Apple iOS / macOS Enhanced Voices
  if (name.includes('ting-ting') || name.includes('tingting')) {
    score += name.includes('enhanced') || name.includes('premium') ? 90 : 50;
  }
  if (name.includes('sin-ji') && (name.includes('enhanced') || name.includes('premium'))) score += 85;

  // Google WaveNet Voices
  if (name.includes('google')) score += 60;

  // Prefer Mainland China Putonghua standard (zh-CN)
  if (lang === 'zh-cn' || lang === 'zh_cn' || lang.includes('hans-cn') || lang.includes('cmn-hans')) {
    score += 30;
  }

  return score;
}

function getBestZhVoice() {
  if (!cachedVoices || cachedVoices.length === 0) initVoices();
  if (!cachedVoices || cachedVoices.length === 0) return null;
  const zhVoices = cachedVoices.filter(v => v.lang && (v.lang.startsWith('zh') || v.lang.includes('cmn')));
  if (zhVoices.length === 0) return null;
  zhVoices.sort((a, b) => scoreZhVoice(b) - scoreZhVoice(a));
  return zhVoices[0];
}

function hasZhSpeechVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return !!getBestZhVoice();
}

function hasNeuralZhVoice() {
  const best = getBestZhVoice();
  return !!best && scoreZhVoice(best) >= 50;
}

// ---------------------------------------------------------------- helpers
function audioCore() {
  return (typeof AUDIO_CORE !== 'undefined' && AUDIO_CORE) ? AUDIO_CORE : null;
}

function clampSpeed(speed) {
  const s = typeof speed === 'number' && isFinite(speed) ? speed : 1.0;
  return Math.min(2.0, Math.max(0.5, s));
}

function ttsIsOnline() {
  if (typeof navigator === 'undefined') return true;
  if (typeof navigator.onLine === 'boolean') return navigator.onLine;
  return true;
}

function ttsSaveDataOn() {
  if (typeof navigator === 'undefined' || !navigator.connection) return false;
  return !!navigator.connection.saveData;
}

function ttsVolume() {
  if (state && state.ttsMuted) return 0;
  const v = state && typeof state.ttsVolume === 'number' ? state.ttsVolume : 1;
  return Math.min(1, Math.max(0, v));
}

function isMuted() {
  return !!(state && state.ttsMuted);
}

/** Cancel every in-flight chunk, audio element and utterance. */
function stopSpeech() {
  speechRunId++;
  if (currentAudio) {
    try { currentAudio.pause(); currentAudio.currentTime = 0; currentAudio.src = ''; } catch (e) {}
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  activeUtterance = null;
  if (typeof karaokeStop === 'function') {
    try { karaokeStop(); } catch (e) {}
  }
}

// --- 2.5 Unified Audio Manager, Quota Guard & Circuit Breaker ---
const AUDIO_MANAGER = (function () {
  const MAX_CACHE_ENTRIES = 100;
  const SOFT_CAP_CHARS = 450000;
  const HARD_CAP_CHARS = 480000;

  const circuit = {
    state: 'CLOSED', // 'CLOSED' | 'OPEN' | 'HALF_OPEN'
    cooldownUntil: 0,
    consecutiveFailures: 0,
    lastError: '',
    lastStatus: 0,
  };

  const cache = new Map();
  let customFetch = null;

  function getCurrentMonthKey() {
    try {
      return new Date().toISOString().slice(0, 7);
    } catch (e) {
      return 'default';
    }
  }

  function getStoredUsage() {
    if (typeof localStorage === 'undefined') return null;
    try {
      const raw = localStorage.getItem('cr_tts_usage');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveUsage(data) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('cr_tts_usage', JSON.stringify(data));
    } catch (e) {}
  }

  function getUsage() {
    const currentMonth = getCurrentMonthKey();
    let data = getStoredUsage();
    if (!data || typeof data !== 'object' || data.month !== currentMonth) {
      data = {
        month: currentMonth,
        azureChars: 0,
        azureRequests: 0,
        azureSuccess: 0,
        azureFailures: 0,
        fallbackRequests: 0,
        cacheHits: 0,
      };
    }
    return data;
  }

  function recordSuccess(chars) {
    circuit.state = 'CLOSED';
    circuit.consecutiveFailures = 0;
    circuit.cooldownUntil = 0;
    circuit.lastError = '';
    circuit.lastStatus = 200;

    const usage = getUsage();
    usage.azureRequests = (usage.azureRequests || 0) + 1;
    usage.azureSuccess = (usage.azureSuccess || 0) + 1;
    usage.azureChars = (usage.azureChars || 0) + (typeof chars === 'number' ? chars : 0);
    saveUsage(usage);
  }

  function recordFailure(status, errMsg) {
    circuit.consecutiveFailures = (circuit.consecutiveFailures || 0) + 1;
    circuit.lastError = errMsg || 'Unknown error';
    circuit.lastStatus = status || 500;
    circuit.state = 'OPEN';

    let cooldownMs = 2 * 60 * 1000;
    if (status === 401) {
      cooldownMs = 10 * 60 * 1000; // 10 minutes
    } else if (status === 403 || status === 429) {
      cooldownMs = 30 * 60 * 1000; // 30 minutes
    } else if (status === 503) {
      cooldownMs = 5 * 60 * 1000;  // 5 minutes
    } else if (circuit.consecutiveFailures >= 3) {
      cooldownMs = 2 * 60 * 1000;  // 2 minutes
    } else {
      cooldownMs = 15 * 1000;       // 15 seconds transient
    }

    circuit.cooldownUntil = Date.now() + cooldownMs;

    const usage = getUsage();
    usage.azureRequests = (usage.azureRequests || 0) + 1;
    usage.azureFailures = (usage.azureFailures || 0) + 1;
    saveUsage(usage);
  }

  function recordCacheHit() {
    const usage = getUsage();
    usage.cacheHits = (usage.cacheHits || 0) + 1;
    saveUsage(usage);
  }

  function recordFallback() {
    const usage = getUsage();
    usage.fallbackRequests = (usage.fallbackRequests || 0) + 1;
    saveUsage(usage);
  }

  function isAzureAvailable() {
    if (!ttsIsOnline()) return false;
    const usage = getUsage();
    if (usage.azureChars >= HARD_CAP_CHARS) return false;
    if (circuit.state === 'OPEN') {
      if (Date.now() < circuit.cooldownUntil) return false;
      circuit.state = 'HALF_OPEN';
    }
    return true;
  }

  function getCacheKey(engine, text, speed) {
    return engine + ':' + (Math.round((speed || 1.0) * 100) / 100) + ':' + text;
  }

  function createAudioUrl(blob) {
    if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
      try {
        return URL.createObjectURL(blob);
      } catch (e) {}
    }
    return 'blob:mock-url-' + Math.random().toString(36).slice(2);
  }

  function revokeAudioUrl(url) {
    if (url && typeof url === 'string' && url.indexOf('blob:') === 0) {
      if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      }
    }
  }

  function getCachedAudio(key) {
    if (!cache.has(key)) return null;
    const entry = cache.get(key);
    cache.delete(key);
    cache.set(key, entry);
    return entry.url;
  }

  function putCachedAudio(key, url, blob) {
    if (cache.has(key)) {
      const existing = cache.get(key);
      if (existing && existing.url && existing.url !== url) {
        revokeAudioUrl(existing.url);
      }
      cache.delete(key);
    } else if (cache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey !== undefined) {
        const oldest = cache.get(oldestKey);
        if (oldest && oldest.url) {
          revokeAudioUrl(oldest.url);
        }
        cache.delete(oldestKey);
      }
    }
    cache.set(key, { url: url, blob: blob, timestamp: Date.now() });
  }

  function clearCache() {
    cache.forEach((entry) => {
      if (entry && entry.url) revokeAudioUrl(entry.url);
    });
    cache.clear();
  }

  async function fetchAzureAudio(text, speed, voice) {
    const key = getCacheKey('azure', text, speed);
    const cachedUrl = getCachedAudio(key);
    if (cachedUrl) {
      recordCacheHit();
      return cachedUrl;
    }

    if (!isAzureAvailable()) {
      throw new Error('Azure TTS unavailable (circuit breaker or quota limit)');
    }

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 6500) : null;
    const fetcher = customFetch || (typeof fetch !== 'undefined' ? fetch : null);

    if (!fetcher) {
      throw new Error('Fetch API unavailable');
    }

    try {
      const payload = {
        text: text,
        speed: speed || 1.0,
        voice: voice || 'zh-CN-Xiaoxiao2:DragonHDFlashLatestNeural'
      };

      const res = await fetcher('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
      });

      if (!res.ok) {
        recordFailure(res.status, 'HTTP ' + res.status);
        throw new Error('Azure TTS returned HTTP ' + res.status);
      }

      const blob = await res.blob();
      const objectUrl = createAudioUrl(blob);
      putCachedAudio(key, objectUrl, blob);
      recordSuccess(text.length);
      return objectUrl;
    } catch (err) {
      const isTimeout = err && (err.name === 'AbortError' || (err.message && err.message.includes('abort')));
      if (isTimeout) {
        recordFailure(504, 'Azure TTS timeout');
      } else if (circuit.state !== 'OPEN') {
        recordFailure(500, (err && err.message) || 'Network error');
      }
      throw err;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }

  return {
    MAX_CACHE_ENTRIES,
    SOFT_CAP_CHARS,
    HARD_CAP_CHARS,
    circuit,
    cache,
    getUsage,
    saveUsage,
    recordSuccess,
    recordFailure,
    recordCacheHit,
    recordFallback,
    isAzureAvailable,
    getCacheKey,
    getCachedAudio,
    putCachedAudio,
    clearCache,
    fetchAzureAudio,
    setFetchHandler: function (fn) { customFetch = fn; },
    getStatus: function () {
      const u = getUsage();
      return {
        circuit: circuit.state,
        cooldownRemaining: Math.max(0, Math.round((circuit.cooldownUntil - Date.now()) / 1000)),
        lastStatus: circuit.lastStatus,
        lastError: circuit.lastError,
        azureChars: u.azureChars,
        azureRequests: u.azureRequests,
        azureSuccess: u.azureSuccess,
        azureFailures: u.azureFailures,
        fallbackRequests: u.fallbackRequests,
        cacheHits: u.cacheHits,
        softCapReached: u.azureChars >= SOFT_CAP_CHARS,
        hardCapReached: u.azureChars >= HARD_CAP_CHARS,
        cacheSize: cache.size
      };
    },
    resetCircuitBreaker: function () {
      circuit.state = 'CLOSED';
      circuit.cooldownUntil = 0;
      circuit.consecutiveFailures = 0;
      circuit.lastError = '';
      circuit.lastStatus = 0;
    }
  };
})();

// 3. System speech, as a promise that settles when the utterance really ends
function speechSpeak(text, speed) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return reject(new Error('speechSynthesis unavailable'));
    }
    try {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    } catch (e) {}

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = Math.min(1.8, Math.max(0.5, 0.90 * clampSpeed(speed)));
    utterance.volume = ttsVolume();

    const bestVoice = getBestZhVoice();
    if (bestVoice) utterance.voice = bestVoice;

    let settled = false;
    // Some engines never fire onend (or fire it minutes later). Bound the wait so a dead
    // utterance cannot block the rest of the text.
    const guard = setTimeout(() => finish(), Math.max(4000, text.length * 500 / clampSpeed(speed)));

    function finish(err) {
      if (settled) return;
      settled = true;
      clearTimeout(guard);
      if (activeUtterance === utterance) activeUtterance = null;
      if (err) reject(err); else resolve();
    }

    activeUtterance = utterance; // keep a reference: GC cancels the audio otherwise
    if (typeof karaokeAttachSpeech === 'function') {
      try { karaokeAttachSpeech(utterance); } catch (e) {}
    }
    utterance.onend = () => finish();
    utterance.onerror = (e) => finish(e || new Error('speech error'));

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setTimeout(() => {
        try { window.speechSynthesis.speak(utterance); } catch (e) { finish(e); }
      }, 20);
    }
  });
}

// 4. Network audio, resolved when the clip finishes playing
function audioPlayToEnd(url, speed) {
  return new Promise((resolve, reject) => {
    let started = false;
    let settled = false;
    const audio = new Audio();
    audio.referrerPolicy = 'no-referrer';
    audio.preload = 'auto';
    try { audio.playbackRate = clampSpeed(speed); } catch (e) {}
    audio.volume = ttsVolume();

    // Timeout only covers *starting* playback; once playing we wait for 'ended'.
    const startTimer = setTimeout(() => finish(new Error('audio start timeout')), 4500);

    function finish(err) {
      if (settled) return;
      settled = true;
      clearTimeout(startTimer);
      if (!started) {
        try { audio.pause(); audio.src = ''; } catch (e) {}
      }
      if (currentAudio === audio) currentAudio = null;
      if (err) reject(err); else resolve();
    }

    function markStarted() {
      if (started) return;
      started = true;
      clearTimeout(startTimer);
      if (typeof karaokeAttachAudio === 'function') {
        try { karaokeAttachAudio(audio); } catch (e) {}
      }
    }

    audio.onplaying = markStarted;
    audio.onended = () => finish();
    audio.onerror = () => finish(new Error('audio error'));

    currentAudio = audio; // karaoke.js compares against this global
    audio.src = url;
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(markStarted).catch((err) => finish(err || new Error('play rejected')));
    }
  });
}

// 5. Play one chunk, walking its engine plan
async function playChunk(chunk, plan, speed, runId) {
  const core = audioCore();
  if (!core) return false;

  const memoKey = core.engineMemoKey(chunk);
  const remembered = engineMemo.get(memoKey);
  const ordered = remembered && plan.indexOf(remembered) !== -1
    ? [remembered].concat(plan.filter(e => e !== remembered))
    : plan;

  for (let i = 0; i < ordered.length; i++) {
    if (runId !== speechRunId) return false;
    const engine = ordered[i];
    try {
      if (engine === 'system') {
        await speechSpeak(chunk, speed);
      } else if (engine === 'azure') {
        const url = await AUDIO_MANAGER.fetchAzureAudio(chunk, speed);
        if (!url || runId !== speechRunId) return false;
        await audioPlayToEnd(url, speed);
      } else {
        const url = core.buildAudioUrl(engine, chunk, speed);
        if (!url) continue;
        await audioPlayToEnd(url, speed);
      }
      if (runId !== speechRunId) return false;
      engineMemo.set(memoKey, engine);
      if (state) {
        state.ttsLastEngine = engine;
        state.ttsChunkCount = (state.ttsChunkCount || 0) + 1;
      }
      return true;
    } catch (e) {
      if (engine === 'azure') {
        AUDIO_MANAGER.recordFallback();
      }
      if (state) state.ttsLastError = (e && e.message) || 'error';
    }
  }
  return false;
}

// 6. Main entry function: speak any length of text, chunk by chunk
async function speakText(text, btnEl, customSpeed) {
  const core = audioCore();
  if (!core) {
    console.warn('audio-core.js is not loaded; speech disabled');
    return;
  }
  const clean = core.normalizeSpeechText(text);
  if (!clean) return;

  const speed = clampSpeed(typeof customSpeed === 'number' ? customSpeed : (state.ttsSpeed || 1.0));

  // Visual feedback: animate the speaker or turtle button
  const triggerBtn = btnEl || (typeof window !== 'undefined' && window.event && window.event.currentTarget);
  if (triggerBtn && triggerBtn.classList) {
    triggerBtn.classList.add('is-speaking');
    const animDuration = Math.min(Math.max((clean.length * 320) / speed, 1500), 9000);
    setTimeout(() => {
      try { triggerBtn.classList.remove('is-speaking'); } catch (e) {}
    }, animDuration);
  }

  // Spam-click guard: same text + same speed within 300 ms is a toggle, not a restart.
  const now = Date.now();
  if (clean === lastSpeakText && speed === lastSpeakSpeed && (now - lastSpeakTime) < 300) {
    return;
  }
  lastSpeakTime = now;
  lastSpeakText = clean;
  lastSpeakSpeed = speed;

  if (isMuted()) {
    if (typeof showToast === 'function') {
      showToast(tx('Đang tắt tiếng — bật lại trong Cài đặt',
        'Sound is muted — turn it back on in Settings',
        'ミュート中 — 設定で解除してください'));
    }
    return;
  }

  // Stop whatever was playing, then take ownership of this run.
  stopSpeech();
  const runId = speechRunId;

  const chunks = core.chunkText(clean, core.CHUNK_MAX);
  if (!chunks.length) return;

  const plan = core.buildEnginePlan({
    engine: (state && state.ttsEngine) || 'auto',
    online: ttsIsOnline(),
    hasNeuralVoice: hasNeuralZhVoice(),
    saveData: ttsSaveDataOn(),
    azureAvailable: AUDIO_MANAGER.isAzureAvailable(),
    textLength: clean.length,
  });

  if (state) {
    state.ttsLastEngine = '';
    state.ttsChunkCount = 0;
    state.ttsLastError = '';
  }

  if (typeof karaokeBegin === 'function') {
    try { karaokeBegin(clean); } catch (e) {}
  }

  let offset = 0;
  let played = 0;

  for (let i = 0; i < chunks.length; i++) {
    if (runId !== speechRunId) return;
    const chunk = chunks[i];
    if (typeof karaokeChunk === 'function') {
      try { karaokeChunk(offset, chunk.length); } catch (e) {}
    }
    const ok = await playChunk(chunk, plan, speed, runId);
    if (runId !== speechRunId) return;
    if (!ok) break;
    played++;
    offset += chunk.length;
  }

  if (runId !== speechRunId) return;

  if (typeof karaokeFinish === 'function') {
    try { karaokeFinish(); } catch (e) {}
  }

  if (!played) {
    // Everything failed: say so instead of making the button look dead.
    const msg = !ttsIsOnline()
      ? tx('Không có mạng và máy chưa cài giọng tiếng Trung',
        'Offline and no Chinese voice installed',
        'オフラインで中国語音声が未インストール')
      : tx('Không phát được âm thanh — thử đổi giọng trong Cài đặt',
        "Couldn't play audio — try another voice in Settings",
        '音声を再生できません — 設定で声を変更してください');
    if (typeof showToast === 'function') showToast(msg);
  }
}

// 7. Speak text in the user's meaning language (ja / vi / en) with an OS voice.
// The app only ever spoke Chinese before; this lets a learner hear the gloss too.
function speakInLanguage(text, lang, customSpeed) {
  return new Promise((resolve) => {
    const clean = String(text == null ? '' : text).trim();
    if (!clean) return resolve(false);
    if (isMuted()) {
      if (typeof showToast === 'function') {
        showToast(tx('Đang tắt tiếng — bật lại trong Cài đặt', 'Sound is muted — turn it back on in Settings', 'ミュート中 — 設定で解除してください'));
      }
      return resolve(false);
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return resolve(false);

    const tag = lang === 'ja' ? 'ja-JP' : (lang === 'en' ? 'en-US' : 'vi-VN');
    const prefix = tag.slice(0, 2);
    let voices = [];
    try { voices = window.speechSynthesis.getVoices() || []; } catch (e) { voices = []; }
    const matches = voices.filter(v => v.lang && v.lang.toLowerCase().indexOf(prefix) === 0);

    if (!matches.length) {
      const label = lang === 'ja' ? '日本語' : (lang === 'en' ? 'English' : 'Tiếng Việt');
      if (typeof showToast === 'function') {
        showToast(tx('Máy chưa cài giọng ' + label, 'No ' + label + ' voice installed', label + 'の音声が未インストール'));
      }
      return resolve(false);
    }

    try { window.speechSynthesis.cancel(); } catch (e) {}

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = matches[0].lang || tag;
    utterance.voice = matches[0];
    utterance.rate = Math.min(1.8, Math.max(0.5, 0.95 * clampSpeed(customSpeed || (state.ttsSpeed || 1.0))));
    utterance.volume = ttsVolume();

    let settled = false;
    const done = (ok) => {
      if (settled) return;
      settled = true;
      clearTimeout(guard);
      resolve(ok);
    };
    const guard = setTimeout(() => done(false), Math.max(4000, clean.length * 320));

    utterance.onend = () => done(true);
    utterance.onerror = () => done(false);
    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      return done(false);
    }
  });
}

function testSpeechVoices() {
  if (!('speechSynthesis' in window)) {
    alert(t('speechNotSupported'));
    return;
  }
  const voices = window.speechSynthesis.getVoices() || [];
  const zhVoices = voices.filter(v => v.lang && (v.lang.startsWith('zh') || v.lang.includes('cmn')));
  if (zhVoices.length > 0) {
    const best = getBestZhVoice();
    const names = zhVoices.map(v => {
      const isBest = best && v.name === best.name
        ? ' ' + tx('⭐ [Được đề xuất]', '⭐ [Recommended]', '⭐ [おすすめ]')
        : '';
      return `${v.name} (${v.lang})${isBest}`;
    }).join('\n');
    const msg = `${t('foundVoices')}: ${zhVoices.length}\n${names}\n\nĐang phát âm thử nghiệm bằng giọng tốt nhất...`;
    alert(msg);
    speakText('你好，欢迎使用Halou哈喽中文！这是一段高保真语音测试。');
  } else {
    alert(t('noVoice'));
  }
}

if (typeof window !== 'undefined') {
  window.AUDIO_MANAGER = AUDIO_MANAGER;
  window.speakText = speakText;
  window.stopSpeech = stopSpeech;
  window.speakInLanguage = speakInLanguage;
  window.testSpeechVoices = testSpeechVoices;
}
if (typeof globalThis !== 'undefined') {
  globalThis.AUDIO_MANAGER = AUDIO_MANAGER;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AUDIO_MANAGER,
    speakText,
    stopSpeech,
    speakInLanguage,
    testSpeechVoices,
    playChunk,
  };
}
