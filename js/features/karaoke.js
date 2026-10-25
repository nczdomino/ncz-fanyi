// js/features/karaoke.js - Karaoke word highlighting synced with audio playback - Dependencies: js/core/utils.js

// ===== Module: Karaoke highlight synced with TTS =====
var KARA = window.KARA || { active: false, run: 0, toks: [], text: '', idx: -1, raf: 0, box: null, base: 0, chunkLen: 0 };
window.KARA = KARA;

function karaokeClear() {
  cancelAnimationFrame(KARA.raf);
  KARA.toks.forEach(el => el.classList.remove('karaoke-active', 'karaoke-done'));
  KARA.idx = -1;
}

function karaokeStop() {
  KARA.run++;
  karaokeClear();
  KARA.active = false; KARA.toks = []; KARA.box = null; KARA.base = 0; KARA.chunkLen = 0;
}

// The speech pipeline speaks one chunk at a time, so the highlight needs to know which
// part of the full sentence that chunk covers.
function karaokeChunk(start, length) {
  KARA.base = Math.max(0, Number(start) || 0);
  KARA.chunkLen = Math.max(0, Number(length) || 0);
}

function karaokeBegin(clean) {
  karaokeStop();
  const norm = (x) => String(x || '').replace(/\s+/g, ' ').trim();
  const box = Array.from(document.querySelectorAll('[data-ktext]')).find(el => norm(el.dataset.ktext) === clean);
  if (!box) return;
  const toks = Array.from(box.querySelectorAll('.word-token[data-s]'));
  if (!toks.length) return;
  KARA.active = true; KARA.box = box; KARA.toks = toks; KARA.text = clean;
  KARA.len = Math.max(1, Number(box.dataset.ktext.length));
  KARA.base = 0; KARA.chunkLen = KARA.len;
}

function karaokeSetIdx(i) {
  if (!KARA.active || i === KARA.idx) return;
  KARA.idx = i;
  KARA.toks.forEach((el, k) => {
    el.classList.toggle('karaoke-active', k === i);
    el.classList.toggle('karaoke-done', k < i);
  });
  const cur = KARA.toks[i];
  if (cur && cur.scrollIntoView) { try { cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {} }
}

function karaokeSetChar(pos) {
  if (!KARA.active) return;
  let found = 0;
  for (let k = 0; k < KARA.toks.length; k++) {
    if (Number(KARA.toks[k].dataset.s) <= pos) found = k; else break;
  }
  karaokeSetIdx(found);
}

function karaokeSetFrac(f) {
  const span = KARA.chunkLen > 0 ? KARA.chunkLen : KARA.len;
  const pos = KARA.base + Math.min(0.999, Math.max(0, f)) * span;
  karaokeSetChar(Math.floor(pos));
}

function karaokeFinish() {
  if (!KARA.active) return;
  const id = ++KARA.run;
  cancelAnimationFrame(KARA.raf);
  karaokeSetIdx(KARA.toks.length - 1);
  setTimeout(() => { if (KARA.run === id) karaokeStop(); }, 500);
}

function karaokeAttachAudio(a) {
  if (!KARA.active) return;
  const id = ++KARA.run;
  const step = () => {
    if (KARA.run !== id || currentAudio !== a) return;
    const d = a.duration;
    const span = KARA.chunkLen > 0 ? KARA.chunkLen : KARA.len;
    const frac = (isFinite(d) && d > 0) ? a.currentTime / d : Math.min(1, a.currentTime / (span * 0.28));
    karaokeSetFrac(frac);
    KARA.raf = requestAnimationFrame(step);
  };
  a.addEventListener('ended', () => { if (KARA.run === id) karaokeFinish(); });
  step();
}

function karaokeAttachSpeech(u) {
  if (!KARA.active) return;
  const id = ++KARA.run;
  let gotBoundary = false;
  u.onboundary = (e) => {
    if (KARA.run !== id || typeof e.charIndex !== 'number') return;
    gotBoundary = true;
    karaokeSetChar(e.charIndex);
  };
  u.onstart = () => {
    const t0 = performance.now();
    const span = KARA.chunkLen > 0 ? KARA.chunkLen : KARA.len;
    const est = span * 270 / (u.rate || 1) * 0.88 * 1.0;
    setTimeout(() => {
      const step = () => {
        if (KARA.run !== id || gotBoundary || activeUtterance !== u) return;
        karaokeSetFrac((performance.now() - t0) / est);
        KARA.raf = requestAnimationFrame(step);
      };
      if (!gotBoundary) step();
    }, 700);
  };
}
