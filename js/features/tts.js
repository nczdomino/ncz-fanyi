// js/features/tts.js - Multi-engine text-to-speech module - Dependencies: js/core/state.js, js/core/utils.js, js/features/karaoke.js

// --- Module: Audio TTS (Ultra-Reliable Multi-Engine & Native Neural) ---
let currentAudio = null;
let activeUtterance = null;
let cachedVoices = [];
let isAudioUnlocked = false;
let lastSpeakText = '';
let lastSpeakTime = 0;
let lastSpeakSpeed = 1.0;

// High-speed in-memory audio cache for 0ms re-play
const ttsAudioCache = new Map();

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
      try { silent.pause(); } catch(e) {}
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

// Find the absolute highest quality Chinese voice available
function getBestZhVoice() {
  if (!cachedVoices || cachedVoices.length === 0) initVoices();
  const zhVoices = cachedVoices.filter(v => v.lang && (v.lang.startsWith('zh') || v.lang.includes('cmn')));
  if (zhVoices.length === 0) return null;

  zhVoices.sort((a, b) => scoreZhVoice(b) - scoreZhVoice(a));
  return zhVoices[0];
}

// Check if Chinese Web Speech voice exists
function hasZhSpeechVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return !!getBestZhVoice();
}

// 4. Web Speech API (Offline, Neural-Prioritized, Rock-solid)
function speakViaWebSpeech(text, speed = 1.0) {
  if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    
    // Adjust rate according to requested speed
    const baseRate = 0.90;
    utterance.rate = Math.min(1.8, Math.max(0.5, baseRate * speed));

    const bestVoice = getBestZhVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    // Critical fix: prevent GC from cutting audio
    activeUtterance = utterance;
    if (typeof karaokeAttachSpeech === 'function') {
      try { karaokeAttachSpeech(utterance); } catch (e) {}
    }
    utterance.onend = () => {
      if (activeUtterance === utterance) {
        activeUtterance = null;
        if (typeof karaokeFinish === 'function') {
          try { karaokeFinish(); } catch (e) {}
        }
      }
    };
    utterance.onerror = (e) => {
      console.warn('Web Speech error:', e);
      if (activeUtterance === utterance) {
        activeUtterance = null;
        if (typeof karaokeStop === 'function') {
          try { karaokeStop(); } catch (e) {}
        }
      }
    };

    // Speak synchronously to preserve user gesture activation on mobile Safari/iOS
    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setTimeout(() => {
        try { window.speechSynthesis.speak(utterance); } catch (e) {}
      }, 20);
    }
    return true;
  } catch (err) {
    console.warn('Web Speech error:', err);
    return false;
  }
}

// 5. Play online audio stream with timeout & speed control
function playAudioUrl(url, timeoutMs = 2800, speed = 1.0) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    const audio = new Audio();
    audio.referrerPolicy = 'no-referrer';
    audio.preload = 'auto';

    // Apply native playbackRate (HTML5 maintains pitch while adjusting speed)
    if (speed && speed !== 1.0) {
      try {
        audio.playbackRate = Math.min(2.0, Math.max(0.5, speed));
      } catch (e) {}
    }

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        try { audio.pause(); audio.src = ''; } catch(e) {}
        reject(new Error('Audio timeout'));
      }
    }, timeoutMs);

    const onStart = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        try { if (typeof karaokeAttachAudio === 'function') karaokeAttachAudio(audio); } catch (e) {}
        resolve(audio);
      }
    };

    audio.onplaying = onStart;
    audio.onplay = onStart;

    audio.onerror = (err) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        reject(err || new Error('Audio error'));
      }
    };

    currentAudio = audio;
    audio.src = url;
    audio.play().then(onStart).catch(err => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        reject(err);
      }
    });
  });
}

// 6. Main entry function for speaking (Smart Auto Multi-Engine with Native Broadcaster Voices)
async function speakText(text, btnEl, customSpeed) {
  if (!text) return;
  const clean = String(text).replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return;

  const speed = typeof customSpeed === 'number' ? customSpeed : (state.ttsSpeed || 1.0);

  // Visual feedback: animate the speaker or turtle button
  const triggerBtn = btnEl || (typeof window !== 'undefined' && window.event && window.event.currentTarget);
  if (triggerBtn && triggerBtn.classList) {
    triggerBtn.classList.add('is-speaking');
    const animDuration = Math.min(Math.max((clean.length * 320) / speed, 1500), 9000);
    setTimeout(() => {
      try { triggerBtn.classList.remove('is-speaking'); } catch(e) {}
    }, animDuration);
  }

  // Prevent rapid spam-click self-cancel bug (clicks within 300ms on same text and same speed)
  const now = Date.now();
  if (clean === lastSpeakText && speed === lastSpeakSpeed && (now - lastSpeakTime) < 300) {
    return;
  }
  lastSpeakTime = now;
  lastSpeakText = clean;
  lastSpeakSpeed = speed;

  // Karaoke: reset and bind to the matching sentence container (if any)
  if (typeof karaokeBegin === 'function') {
    try { karaokeBegin(clean); } catch (e) {}
  }

  // Stop previous playback
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = '';
    } catch (e) {}
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  const engine = state.ttsEngine || 'auto';

  // 1. Explicit system (offline/neural) selected
  if (engine === 'system') {
    speakViaWebSpeech(clean, speed);
    return;
  }

  const encoded = encodeURIComponent(clean.slice(0, 300));
  const isSlow = speed < 0.9;
  const baiduSpd = isSlow ? 4 : (speed > 1.1 ? 6 : 5);

  // Engine URLs definition
  const youdaoUrl = 'https://dict.youdao.com/dictvoice?audio=' + encoded + '&le=zh';
  const baiduUrl = 'https://fanyi.baidu.com/gettts?lan=zh&text=' + encoded + '&spd=' + baiduSpd + '&source=web';
  const googleUrl = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=' + encoded + (isSlow ? '&ttsspeed=0.24' : '');

  // 2. Explicit Baidu mode (CCTV Broadcaster standard)
  if (engine === 'baidu') {
    try {
      await playAudioUrl(baiduUrl, 3200, speed);
      return;
    } catch (e) {}
    try {
      await playAudioUrl(youdaoUrl, 2500, speed);
      return;
    } catch (e) {}
    speakViaWebSpeech(clean, speed);
    return;
  }

  // 3. Explicit Youdao mode (Native Beijing voice)
  if (engine === 'youdao') {
    try {
      await playAudioUrl(youdaoUrl, 2800, speed);
      return;
    } catch (e) {}
    try {
      await playAudioUrl(baiduUrl, 3000, speed);
      return;
    } catch (e) {}
    speakViaWebSpeech(clean, speed);
    return;
  }

  // 4. Explicit Google mode
  if (engine === 'google') {
    try {
      await playAudioUrl(googleUrl, 3500, speed);
      return;
    } catch (e) {}
    try {
      await playAudioUrl(baiduUrl, 3000, speed);
      return;
    } catch (e) {}
    speakViaWebSpeech(clean, speed);
    return;
  }

  // 5. Smart Auto Mode (Recommended)
  // A. Short words / phrases (<= 6 characters): Youdao Native & Baidu CCTV are unbeatable
  if (clean.length <= 6) {
    // 1st priority: Youdao native dictionary pronunciation
    try {
      await playAudioUrl(youdaoUrl, 2500, speed);
      return;
    } catch (e) {}
    // 2nd priority: Baidu CCTV Broadcaster AI
    try {
      await playAudioUrl(baiduUrl, 2800, speed);
      return;
    } catch (e) {}
    // 3rd priority: Google Translate TTS
    try {
      await playAudioUrl(googleUrl, 2800, speed);
      return;
    } catch (e) {}
    // Fallback: Web Speech API
    speakViaWebSpeech(clean, speed);
    return;
  }

  // B. Full sentences or paragraphs (> 6 characters)
  const bestVoice = getBestZhVoice();
  const isNeuralVoice = bestVoice && scoreZhVoice(bestVoice) >= 50;

  // If client system has high-end Neural voice (e.g. Edge Xiaoxiao, Apple Enhanced Ting-Ting), use it for 0ms delay & sync
  if (isNeuralVoice) {
    const ok = speakViaWebSpeech(clean, speed);
    if (ok) return;
  }

  // Otherwise, use Baidu AI broadcaster (exceptionally natural flow & tone sandhi for sentences)
  try {
    await playAudioUrl(baiduUrl, 3500, speed);
    return;
  } catch (e) {}

  // Google Translate fallback
  try {
    await playAudioUrl(googleUrl, 3500, speed);
    return;
  } catch (e) {}

  // Ultimate fallback: Web Speech API
  speakViaWebSpeech(clean, speed);
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
      const isBest = best && v.name === best.name ? ' ⭐ [Được đề xuất]' : '';
      return `${v.name} (${v.lang})${isBest}`;
    }).join('\n');
    const msg = `${t('foundVoices')}: ${zhVoices.length}\n${names}\n\nĐang phát âm thử nghiệm bằng giọng tốt nhất...`;
    alert(msg);
    speakText("你好，欢迎使用NCZ翻译！这是一段高保真语音测试。");
  } else {
    alert(t('noVoice'));
  }
}
