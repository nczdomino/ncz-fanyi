// js/features/tts.js - Multi-engine text-to-speech module - Dependencies: js/core/state.js, js/core/utils.js, js/features/karaoke.js

// --- Module: Audio TTS (Ultra-Reliable Multi-Engine) ---
let currentAudio = null;
let activeUtterance = null;
let cachedVoices = [];
let isAudioUnlocked = false;
let lastSpeakText = '';
let lastSpeakTime = 0;

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

// 2. Pre-cache and refresh Web Speech voices
function initVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
  window.speechSynthesis.onvoiceschanged = initVoices;
}

// 3. Check if Chinese Web Speech voice exists
function hasZhSpeechVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  if (!cachedVoices || cachedVoices.length === 0) initVoices();
  return cachedVoices.some(v => v.lang.startsWith('zh') || v.lang.includes('cmn'));
}

// 4. Web Speech API (Offline, Rock-solid)
function speakViaWebSpeech(text) {
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
    utterance.rate = 0.88;

    if (!cachedVoices || cachedVoices.length === 0) {
      initVoices();
    }
    const zhVoice = cachedVoices.find(v =>
      v.lang === 'zh-CN' || v.lang === 'zh_CN' || v.lang === 'zh-Hans-CN' ||
      v.lang.startsWith('zh') || v.lang.includes('cmn')
    );
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    // Critical fix: prevent GC from cutting audio
    activeUtterance = utterance;
    karaokeAttachSpeech(utterance);
    utterance.onend = () => {
      if (activeUtterance === utterance) { activeUtterance = null; karaokeFinish(); }
    };
    utterance.onerror = (e) => {
      console.warn('Web Speech error:', e);
      if (activeUtterance === utterance) { activeUtterance = null; karaokeStop(); }
    };

    // 20ms delay allows any pending cancel() to clear in browser engine
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {}
    }, 20);
    return true;
  } catch (err) {
    console.warn('Web Speech error:', err);
    return false;
  }
}

// 5. Play online audio stream with timeout
function playAudioUrl(url, timeoutMs = 2000) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    const audio = new Audio();
    audio.referrerPolicy = 'no-referrer';
    audio.preload = 'auto';

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        try { audio.pause(); audio.src = ''; } catch(e) {}
        reject(new Error('Audio timeout'));
      }
    }, timeoutMs);

    audio.onplaying = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        try { karaokeAttachAudio(audio); } catch (e) {}
        resolve(audio);
      }
    };

    audio.onerror = (err) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        reject(err || new Error('Audio error'));
      }
    };

    currentAudio = audio;
    audio.src = url;
    audio.play().catch(err => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        reject(err);
      }
    });
  });
}

// 6. Main entry function for speaking (Smart Auto Multi-Engine)
async function speakText(text, btnEl) {
  if (!text) return;
  const clean = String(text).replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return;

  // Visual feedback: animate the speaker button if available
  const triggerBtn = btnEl || (typeof window !== 'undefined' && window.event && window.event.currentTarget);
  if (triggerBtn && triggerBtn.classList) {
    triggerBtn.classList.add('is-speaking');
    const animDuration = Math.min(Math.max(clean.length * 280, 1500), 8000);
    setTimeout(() => {
      try { triggerBtn.classList.remove('is-speaking'); } catch(e) {}
    }, animDuration);
  }

  // Prevent rapid spam-click self-cancel bug (clicks within 350ms on same text)
  const now = Date.now();
  if (clean === lastSpeakText && (now - lastSpeakTime) < 350) {
    return;
  }
  lastSpeakTime = now;
  lastSpeakText = clean;

  // Karaoke: reset and bind to the matching sentence container (if any)
  karaokeBegin(clean);

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

  // 1. Explicit system (offline) selected
  if (engine === 'system') {
    speakViaWebSpeech(clean);
    return;
  }

  const encoded = encodeURIComponent(clean.slice(0, 200));

  // 2. Short words / phrases (<= 6 characters): Youdao is instant & accent is native
  if (clean.length <= 6) {
    if (engine === 'auto' || engine === 'youdao') {
      try {
        await playAudioUrl('https://dict.youdao.com/dictvoice?audio=' + encoded + '&le=zh', 1200);
        return; // Success! Instant word playback
      } catch (e) {}
    }
    if (engine === 'auto' || engine === 'google') {
      try {
        await playAudioUrl('https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=' + encoded, 1800);
        return;
      } catch (e) {}
    }
    // Fallback: Web Speech API
    speakViaWebSpeech(clean);
    return;
  }

  // 3. Full sentences or paragraphs (> 6 characters)
  // In Auto mode: prioritize Web Speech API on mobile or when zh voice is available (0ms instant startup, no buffering lag!)
  if (engine === 'auto') {
    const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
    const hasVoice = hasZhSpeechVoice();
    
    // On mobile or when system voice exists, Web Speech API plays sentences smoothly with 0ms delay
    if (hasVoice || isMobile) {
      const ok = speakViaWebSpeech(clean);
      if (ok) return;
    }
    
    // Otherwise or fallback: try Google Translate TTS with 3000ms timeout
    try {
      await playAudioUrl('https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=' + encoded, 3000);
      return;
    } catch (e) {}
    
    // Ultimate fallback for sentence
    speakViaWebSpeech(clean);
    return;
  }

  // 4. Explicit Google mode
  if (engine === 'google') {
    try {
      await playAudioUrl('https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=' + encoded, 3200);
      return;
    } catch (e) {}
    speakViaWebSpeech(clean);
    return;
  }

  // 5. Explicit Youdao mode (fallback to Google then Web Speech for long text)
  if (engine === 'youdao') {
    try {
      await playAudioUrl('https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=' + encoded, 2500);
      return;
    } catch (e) {}
    speakViaWebSpeech(clean);
    return;
  }

  speakViaWebSpeech(clean);
}

function testSpeechVoices() {
  if (!('speechSynthesis' in window)) {
    alert(t('speechNotSupported'));
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  const zhVoices = voices.filter(v => v.lang.startsWith('zh') || v.lang.includes('cmn'));
  if (zhVoices.length > 0) {
    const names = zhVoices.map(v => v.name + " (" + v.lang + ")").join('\n');
    const msg = `${t('foundVoices')}: ${zhVoices.length}\n${names}`;
    alert(msg);
    speakText("你好，欢迎使用NCZ翻译！");
  } else {
    alert(t('noVoice'));
  }
}
