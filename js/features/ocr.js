// js/features/ocr.js - OCR image processing and cleanup - Dependencies: js/core/utils.js, js/features/input.js

// ===== Module: OCR cleanup =====
function ocrTextFromData(data) {
  // Rebuild text from Tesseract lines: drop low-confidence junk, restore reading order
  if (!data || !Array.isArray(data.lines) || !data.lines.length) return '';
  let lines = data.lines
    .filter(l => l && l.text && l.bbox)
    .map(l => ({ text: l.text.replace(/\n/g, ''), conf: l.confidence || 0, x: l.bbox.x0, y: l.bbox.y0, h: Math.max(1, l.bbox.y1 - l.bbox.y0) }));
  const cjk = /[㐀-鿿豈-﫿]/g;
  lines = lines.filter(l => {
    const c = (l.text.match(cjk) || []).length;
    if (l.conf < 30 && c < 3) return false;
    if (l.conf < 45 && c === 0) return false;
    return true;
  });
  if (!lines.length) return '';
  const medH = lines.map(l => l.h).sort((a, b) => a - b)[Math.floor(lines.length / 2)] || 20;
  lines.sort((a, b) => (Math.abs(a.y - b.y) < medH * 0.5) ? a.x - b.x : a.y - b.y);
  return lines.map(l => l.text).join('\n');
}

function cleanOcrText(raw) {
  if (!raw) return '';
  const CJK = '\\u3400-\\u9fff\\uf900-\\ufaff';
  const reCJK = new RegExp('[' + CJK + ']', 'g');
  const allowed = new RegExp('[^' + CJK + 'A-Za-z0-9\\s，。！？；：、“”‘’「」『』（）《》〈〉【】…—·,.!?;:\'"()\\-%/+=]', 'g');
  const END = /[。！？…”’」』）.!?]$/;
  const ANYP = /[，。！？；：、,.!?;:]/;

  let lines = String(raw).replace(/\r/g, '').replace(/\t/g, ' ').split('\n');
  lines = lines.map(l => {
    l = l.replace(allowed, '');                                              // stray symbols
    l = l.replace(new RegExp('(?<=[' + CJK + '，。！？；：、”’」』）]) +(?=[' + CJK + '，。！？；：、“‘「『（])', 'g'), ''); // spaces inside CJK
    l = l.replace(new RegExp('(?<=[' + CJK + '])[A-Za-z|](?=[' + CJK + '])', 'g'), '');  // lone latin glitch inside CJK
    l = l.replace(new RegExp('(?<=[' + CJK + '])\\s*,', 'g'), '，').replace(new RegExp('(?<=[' + CJK + '])\\s*\\.(?!\\d)', 'g'), '。')
         .replace(new RegExp('(?<=[' + CJK + '])\\s*\\?', 'g'), '？').replace(new RegExp('(?<=[' + CJK + '])\\s*!', 'g'), '！')
         .replace(new RegExp('(?<=[' + CJK + '])\\s*;', 'g'), '；').replace(new RegExp('(?<=[' + CJK + '])\\s*:', 'g'), '：');
    l = l.replace(/([，。！？；：、])\1+/g, '$1').replace(/ {2,}/g, ' ').trim();
    return l;
  });

  // drop junk lines
  lines = lines.filter(l => {
    if (!l) return true;
    const c = (l.match(reCJK) || []).length;
    const n = l.replace(/\s/g, '').length;
    if (c === 0) return n > 3 && /[A-Za-z]{3,}|\d{2,}/.test(l);   // keep real latin/numbers, drop 1-3 char noise
    if (n === 1 && /[一丨]/.test(l)) return false;
    if (c / n < 0.3 && n < 6) return false;
    return true;
  });

  // merge soft-wrapped lines into paragraphs; keep headings separate
  const paras = [];
  let buf = '';
  const flush = () => { if (buf) paras.push(buf); buf = ''; };
  for (const l of lines) {
    if (!l) { flush(); continue; }
    if (buf && paras.length + 0 >= 0 && buf === l) continue;                  // duplicate consecutive line
    if (!buf) { buf = l; continue; }
    const bufHeading = buf.length <= 16 && !ANYP.test(buf) && /^(第.{1,5}[章节课篇回部]|[一二三四五六七八九十]+[、.．]|\d+[、.．]|[（(]?[一二三四五六七八九十\d]+[）)])/.test(buf);
    if (END.test(buf) || bufHeading) { flush(); buf = l; }
    else {
      const needSpace = /[A-Za-z0-9]$/.test(buf) && /^[A-Za-z0-9]/.test(l);
      buf += (needSpace ? ' ' : '') + l;
    }
  }
  flush();
  return paras.join('\n').trim();
}

function ocrUpdateButtons(hasRaw) {
  const c = document.getElementById('btn-ocr-clean');
  if (c) c.textContent = '🧹 ' + tx('Làm sạch', 'Clean up', '整形');
  const r = document.getElementById('btn-ocr-raw');
  if (r) { r.textContent = tx('Bản gốc', 'Original', '元のテキスト'); r.style.display = (hasRaw && window._ocrRaw) ? '' : 'none'; }
}
function ocrCleanNow() {
  const ta = document.getElementById('ocr-edit-textarea');
  if (!ta) return;
  if (!window._ocrRaw) window._ocrRaw = ta.value;
  ta.value = cleanOcrText(ta.value);
  ocrUpdateButtons(true);
  showToast(tx('Đã làm sạch văn bản', 'Text cleaned', 'テキストを整形しました'));
}
function ocrRestoreRaw() {
  const ta = document.getElementById('ocr-edit-textarea');
  if (ta && window._ocrRaw) ta.value = window._ocrRaw;
}

// --- Module: OCR (Tesseract.js) ---
async function handleImageUpload(file) {
  if (!file) return;
  
  const modal = document.getElementById('ocr-modal');
  const progressContainer = document.getElementById('ocr-progress-container');
  const progressBar = document.getElementById('ocr-progress-bar');
  const progressText = document.getElementById('ocr-progress-text');
  const editArea = document.getElementById('ocr-edit-textarea');
  
  if (!modal) return;
  modal.classList.add('active');
  progressContainer.style.display = 'block';
  progressBar.style.width = '0%';
  progressText.textContent = t('loadingOCR');
  editArea.value = '';

  // Requirement C2: Lazy-load Tesseract.js once on demand
  if (!window.Tesseract || typeof window.Tesseract.recognize !== 'function') {
    showToast(t('loadingOCR'));
    try {
      await loadScriptOnce('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
    } catch (e) {
      console.error('Failed to load Tesseract.js', e);
      progressContainer.style.display = 'none';
      editArea.value = tx('Không thể tải thư viện nhận diện ảnh OCR. Vui lòng kiểm tra kết nối mạng.', 'Failed to load OCR library. Please check your internet connection.', 'OCRライブラリの読み込みに失敗しました。接続を確認してください。');
      return;
    }
  }

  try {
    // Resize image using offscreen canvas to avoid memory overflow & speed up recognition
    const img = await loadImageFromFile(file);
    const canvas = document.createElement('canvas');
    const maxDim = 1200;
    let w = img.width;
    let h = img.height;
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
    }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);

    if (window.Tesseract && typeof window.Tesseract.recognize === 'function') {
      const res = await window.Tesseract.recognize(canvas, 'chi_sim+chi_tra', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pct = Math.round((m.progress || 0) * 100);
            progressBar.style.width = pct + '%';
            progressText.textContent = t('loadingOCR') + ' (' + pct + '%)';
          }
        }
      });
      progressContainer.style.display = 'none';
      const rawOcr = (res.data && res.data.text) ? res.data.text.trim() : '';
      window._ocrRaw = rawOcr;
      let smart = rawOcr;
      try { smart = ocrTextFromData(res.data) || rawOcr; } catch (e) { smart = rawOcr; }
      editArea.value = cleanOcrText(smart);
      ocrUpdateButtons(true);
    } else {
      progressContainer.style.display = 'none';
      editArea.value = t('ocrLoadError');
    }
  } catch (err) {
    console.error("OCR error", err);
    progressContainer.style.display = 'none';
    alert(t('ocrError') + err.message);
  }
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function confirmOcrResult() {
  const text = document.getElementById('ocr-edit-textarea').value.trim();
  const modal = document.getElementById('ocr-modal');
  if (modal) modal.classList.remove('active');
  if (text) {
    document.getElementById('input-textarea').value = text;
    updateInputClearBtn();
    analyzeText();
  }
}

function closeOcrModal() {
  const modal = document.getElementById('ocr-modal');
  if (modal) modal.classList.remove('active');
}
