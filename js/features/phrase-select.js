// js/features/phrase-select.js - Multi-token phrase selection and quick lookup - Dependencies: js/core/utils.js, js/features/word-sheet.js, js/features/tts.js

// ===== Module: Phrase selection =====
const PSEL = { on: false, start: -1, end: -1, box: null, dragging: false };

function phraseTokens(box) {
  return box ? Array.from(box.querySelectorAll('.word-token')) : [];
}

function togglePhraseSelect() {
  PSEL.on = !PSEL.on;
  const area = document.getElementById('reader-content-area');
  if (area) area.classList.toggle('select-mode', PSEL.on);
  phraseClear();
  phraseUpdateLabels();
  if (PSEL.on) showToast(tx('Chạm từ đầu rồi chạm từ cuối (hoặc kéo ngang) để chọn cụm', 'Tap first word then last word (or drag) to select a phrase', '最初と最後の語をタップ（またはドラッグ）してフレーズを選択'));
}

function phraseUpdateLabels() {
  const lbl = document.getElementById('lbl-select');
  if (lbl) lbl.textContent = tx('Chọn cụm', 'Phrase', 'フレーズ');
  const b = document.getElementById('btn-toggle-select');
  if (b) b.classList.toggle('active', PSEL.on);
}

function phraseClear() {
  PSEL.start = PSEL.end = -1; PSEL.box = null; PSEL.dragging = false;
  document.querySelectorAll('.word-token.sel-token').forEach(el => el.classList.remove('sel-token'));
  const bar = document.getElementById('phrase-bar');
  if (bar) bar.classList.remove('show');
}

function phraseText() {
  if (!PSEL.box || PSEL.start < 0) return '';
  const toks = phraseTokens(PSEL.box);
  const a = Math.min(PSEL.start, PSEL.end), b = Math.max(PSEL.start, PSEL.end);
  const first = toks[a], last = toks[b];
  if (!first || !last) return '';
  let out = '';
  let started = false;
  for (const el of PSEL.box.querySelectorAll('.word-token, .punctuation-token')) {
    if (el === first) started = true;
    if (started) out += el.classList.contains('word-token') ? (el.dataset.tok || '') : el.textContent;
    if (el === last) break;
  }
  return out;
}

function phraseRender() {
  const toks = phraseTokens(PSEL.box);
  const a = Math.min(PSEL.start, PSEL.end), b = Math.max(PSEL.start, PSEL.end);
  toks.forEach((el, i) => el.classList.toggle('sel-token', PSEL.start >= 0 && i >= a && i <= b));
  let bar = document.getElementById('phrase-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'phrase-bar';
    document.body.appendChild(bar);
  }
  const phrase = phraseText();
  if (!phrase) { bar.classList.remove('show'); return; }
  bar.innerHTML = `
    <span class="phrase-text" lang="zh-CN">${escapeHtml(phrase)}</span>
    <button class="btn btn-primary btn-sm" onclick="phraseLookup()">${tx('Tra / Dịch cụm', 'Look up / Translate', '調べる / 翻訳')}</button>
    <button class="btn btn-secondary btn-sm" onclick="phraseSpeak()">🔊</button>
    <button class="btn btn-secondary btn-sm" onclick="phraseClear()">✕</button>`;
  bar.classList.add('show');
}

function phraseLookup() {
  const p = phraseText();
  if (p) openWordSheet(p);
}
function phraseSpeak() {
  const p = phraseText();
  if (p) speakText(p);
}

function phraseTokenFromEvent(e) {
  const el = e.target && e.target.closest ? e.target.closest('.word-token') : null;
  if (!el) return null;
  const box = el.closest('[data-ktext]') || el.parentElement;
  const idx = phraseTokens(box).indexOf(el);
  return idx < 0 ? null : { el, box, idx };
}

function phrasePick(info) {
  if (PSEL.box !== info.box || PSEL.start < 0) {
    PSEL.box = info.box; PSEL.start = PSEL.end = info.idx;
  } else {
    const a = Math.min(PSEL.start, PSEL.end), b = Math.max(PSEL.start, PSEL.end);
    if (a === b && a !== info.idx) { PSEL.start = a; PSEL.end = info.idx; }
    else if (info.idx >= a && info.idx <= b) { PSEL.start = PSEL.end = info.idx; }
    else { PSEL.start = Math.min(a, info.idx); PSEL.end = Math.max(b, info.idx); }
  }
  phraseRender();
}

(function initPhraseSelect() {
  // Capture-phase click: in select mode, taps select instead of opening the word sheet
  document.addEventListener('click', (e) => {
    if (!PSEL.on) return;
    const info = phraseTokenFromEvent(e);
    if (!info) return;
    e.preventDefault(); e.stopPropagation();
    if (PSEL._justDragged) { PSEL._justDragged = false; return; }
    phrasePick(info);
  }, true);

  // Drag across tokens to extend the selection
  document.addEventListener('pointerdown', (e) => {
    if (!PSEL.on) return;
    const info = phraseTokenFromEvent(e);
    if (!info) return;
    PSEL._down = info; PSEL._moved = false;
  }, true);
  document.addEventListener('pointermove', (e) => {
    if (!PSEL.on || !PSEL._down) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const tok = el && el.closest ? el.closest('.word-token') : null;
    if (!tok || tok.closest('[data-ktext]') !== PSEL._down.box) return;
    const idx = phraseTokens(PSEL._down.box).indexOf(tok);
    if (idx < 0 || (idx === PSEL._down.idx && !PSEL._moved)) return;
    PSEL._moved = true;
    PSEL.box = PSEL._down.box; PSEL.start = PSEL._down.idx; PSEL.end = idx;
    phraseRender();
  }, true);
  const endDrag = () => {
    if (PSEL._moved) PSEL._justDragged = true;
    PSEL._down = null; PSEL._moved = false;
  };
  document.addEventListener('pointerup', endDrag, true);
  document.addEventListener('pointercancel', endDrag, true);

  // Do not let sentence-swipe navigation fire while selecting
  const area = document.getElementById('reader-content-area');
  if (area) {
    area.addEventListener('touchend', (e) => { if (PSEL.on) e.stopImmediatePropagation(); }, true);
  }
  phraseUpdateLabels();
  ocrUpdateButtons(false);
})();

// ===== Module: Karaoke highlight synced with TTS =====
const KARA = { active: false, run: 0, toks: [], text: '', idx: -1, raf: 0, box: null };
