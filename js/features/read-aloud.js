// js/features/read-aloud.js - Continuous reading, shadowing repeats and clip preloading
// Dependencies: js/core/state.js, js/features/tts.js, js/features/audio-core.js

// Why this module exists
//   The reader could only speak one sentence at a time, and you had to press "next
//   sentence" yourself for every line — fine for study, useless for listening practice.
//   There was also no way to hear a sentence several times, and every playback started
//   from a cold network request.

var READ_ALOUD = { token: 0, preloadTimer: null, preloadKey: '', sleeping: null };

function readAloudSleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isReadAllActive() {
  return !!(state && state.readerPlaying);
}

function stopReadAll(options) {
  const opts = options || {};
  READ_ALOUD.token++;
  if (state) state.readerPlaying = false;
  if (typeof stopSpeech === 'function') {
    try { stopSpeech(); } catch (e) {}
  }
  if (!opts.silent && typeof renderReaderView === 'function') {
    try { renderReaderView(); } catch (e) {}
  }
}

/**
 * Play every sentence from the current one to the end, advancing the view as it goes.
 * Tapping the button again stops.
 */
async function toggleReadAll() {
  if (isReadAllActive()) {
    stopReadAll();
    return;
  }
  if (!state || !Array.isArray(state.sentences) || !state.sentences.length) return;
  if (typeof speakText !== 'function') return;

  const token = ++READ_ALOUD.token;
  state.readerPlaying = true;
  if (typeof renderReaderView === 'function') {
    try { renderReaderView(); } catch (e) {}
  }

  try {
    for (let i = state.currentSentenceIndex; i < state.sentences.length; i++) {
      if (token !== READ_ALOUD.token || !state.readerPlaying) return;
      state.currentSentenceIndex = i;
      if (typeof renderReaderView === 'function') {
        try { renderReaderView(); } catch (e) {}
      }
      await speakText(state.sentences[i], null, state.ttsSpeed);
      if (token !== READ_ALOUD.token || !state.readerPlaying) return;
      // A short breather between sentences: without it the clips run together.
      await readAloudSleep(260);
    }
  } finally {
    if (token === READ_ALOUD.token) {
      state.readerPlaying = false;
      if (typeof renderReaderView === 'function') {
        try { renderReaderView(); } catch (e) {}
      }
    }
  }
}

/**
 * Shadowing: play the same text N times with a pause so the learner can repeat it.
 * @param {string} text
 * @param {number} [times=3]
 * @param {number} [gapMs=1200]
 */
async function repeatSpeak(text, times, gapMs) {
  const clean = String(text || '').trim();
  if (!clean || typeof speakText !== 'function') return;
  const n = Math.max(1, Math.min(10, Number(times) || 3));
  const gap = typeof gapMs === 'number' ? Math.max(0, gapMs) : 1200;

  const token = ++READ_ALOUD.token;
  if (state) state.readerPlaying = false;

  for (let i = 0; i < n; i++) {
    if (token !== READ_ALOUD.token) return;
    await speakText(clean, null, state.ttsSpeed);
    if (token !== READ_ALOUD.token) return;
    if (i < n - 1) await readAloudSleep(gap);
  }
}

/**
 * Warm the HTTP/service-worker cache for the first chunk of a text so the first tap
 * plays instantly. Throttled and single-flight: hovering across twenty cards does not
 * fire twenty requests.
 */
function preloadSpeech(text) {
  if (!text || typeof AUDIO_CORE === 'undefined' || !AUDIO_CORE) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
  if (typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData) return;

  const clean = AUDIO_CORE.normalizeSpeechText(text);
  if (!clean) return;
  const key = clean.length + ':' + clean.slice(0, 12);
  if (key === READ_ALOUD.preloadKey) return;

  clearTimeout(READ_ALOUD.preloadTimer);
  READ_ALOUD.preloadTimer = setTimeout(() => {
    if (key === READ_ALOUD.preloadKey) return;
    READ_ALOUD.preloadKey = key;

    const chunk = AUDIO_CORE.chunkText(clean, AUDIO_CORE.CHUNK_MAX)[0];
    if (!chunk) return;
    const plan = AUDIO_CORE.buildEnginePlan({
      engine: (state && state.ttsEngine) || 'auto',
      online: true,
      hasNeuralVoice: typeof hasNeuralZhVoice === 'function' ? hasNeuralZhVoice() : false,
      saveData: false,
      textLength: clean.length,
    });
    const engine = plan.filter(e => e !== 'system')[0];
    if (!engine) return;
    const url = AUDIO_CORE.buildAudioUrl(engine, chunk, (state && state.ttsSpeed) || 1.0);
    if (!url) return;
    try {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.referrerPolicy = 'no-referrer';
      audio.src = url;
      audio.load(); // fetch begins; the service worker stores it for the real play
    } catch (e) {}
  }, 140);
}

if (typeof window !== 'undefined') {
  window.toggleReadAll = toggleReadAll;
  window.stopReadAll = stopReadAll;
  window.repeatSpeak = repeatSpeak;
  window.preloadSpeech = preloadSpeech;
  window.isReadAllActive = isReadAllActive;
}
