// js/features/ocr.js - Advanced Multi-Platform Chinese OCR Pipeline (RapidOCR + Smart Non-AI Heuristic Layout + AI Repair)
// Dependencies: js/core/utils.js, js/features/input.js, js/data/i18n-data.js

// State variables for OCR pipeline
window._ocrRawText = '';
window._ocrProcessedText = '';
window._ocrAiText = '';
window._ocrLines = [];
window._ocrActiveTab = 'processed';
window._ocrLastFile = null;
window._ocrLastBase64 = null;
window._ocrTokensUsed = null;
window._ocrLastSummary = null;

/**
 * Normalizes an arbitrary OCR line item into standard bounding box and text structure.
 * Supports RapidOCR [[x1,y1],[x2,y2],[x3,y3],[x4,y4]] and Tesseract bbox {x0, y0, x1, y1}.
 */
function normalizeOcrLine(item) {
  if (!item) return null;
  let text = '';
  let score = 1.0;
  let minX = 0, minY = 0, maxX = 0, maxY = 0;

  if (typeof item === 'string') {
    text = item.trim();
  } else if (item.text) {
    text = String(item.text).replace(/\r?\n/g, ' ').trim();
    score = typeof item.score === 'number' ? item.score : (typeof item.conf === 'number' ? item.conf / 100 : 1.0);

    if (Array.isArray(item.box) && item.box.length >= 4) {
      // RapidOCR 4-point polygon: [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]
      const pts = item.box;
      const xs = pts.map(p => Array.isArray(p) ? p[0] : (p.x || 0));
      const ys = pts.map(p => Array.isArray(p) ? p[1] : (p.y || 0));
      minX = Math.min(...xs);
      maxX = Math.max(...xs);
      minY = Math.min(...ys);
      maxY = Math.max(...ys);
    } else if (item.bbox) {
      // Tesseract format: {x0, y0, x1, y1}
      minX = item.bbox.x0 || item.bbox.left || 0;
      maxX = item.bbox.x1 || item.bbox.right || 0;
      minY = item.bbox.y0 || item.bbox.top || 0;
      maxY = item.bbox.y1 || item.bbox.bottom || 0;
    } else if (typeof item.x === 'number' && typeof item.y === 'number') {
      minX = item.x;
      minY = item.y;
      maxX = item.x + (item.w || 50);
      maxY = item.y + (item.h || 20);
    }
  }

  if (!text) return null;

  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const centerX = minX + width / 2;
  const centerY = minY + height / 2;

  return {
    text,
    score: Math.max(0, Math.min(1, score)),
    minX,
    minY,
    maxX,
    maxY,
    width,
    height,
    centerX,
    centerY,
  };
}

/**
 * LEVEL 1 (NON-AI): Document Layout Analysis & Reading Order Sorter
 * Detects:
 * - Vertical text orientation (Right-to-Left or Left-to-Right)
 * - Multi-column horizontal document layouts (prevents merging lines across columns)
 * - Visual row clustering for single-column text
 */
function sortOcrLinesByLayout(rawLines) {
  if (!Array.isArray(rawLines) || !rawLines.length) return [];
  const lines = rawLines.map(normalizeOcrLine).filter(Boolean);
  if (!lines.length) return [];

  const CJK_REGEX = /[\u3400-\u9fff\uf900-\ufaff]/;

  // 1. Check if document is predominantly vertical Chinese text
  let verticalCount = 0;
  for (const l of lines) {
    if (l.height > 1.45 * l.width && CJK_REGEX.test(l.text)) {
      verticalCount++;
    }
  }
  const isVertical = lines.length >= 3 && (verticalCount / lines.length > 0.45);

  if (isVertical) {
    // Vertical text: Group by X into vertical columns
    const medWidth = lines.map(l => l.width).sort((a, b) => a - b)[Math.floor(lines.length / 2)] || 24;
    // Sort columns Right-to-Left (traditional Chinese book layout) or Left-to-Right
    // Traditional Chinese vertical books flow right-to-left
    lines.sort((a, b) => {
      const colDiff = Math.abs(a.centerX - b.centerX);
      if (colDiff < medWidth * 0.75) {
        return a.minY - b.minY; // Top to bottom within same column
      }
      return b.centerX - a.centerX; // Right to left
    });
    return lines;
  }

  // 2. Horizontal text: Check for Multi-column document layout
  const docMinX = Math.min(...lines.map(l => l.minX));
  const docMaxX = Math.max(...lines.map(l => l.maxX));
  const docWidth = docMaxX - docMinX;

  // Find median line width and height
  const sortedHeights = lines.map(l => l.height).sort((a, b) => a - b);
  const medH = sortedHeights[Math.floor(lines.length / 2)] || 20;

  // Multi-column test: If document is wide, check if lines cluster into left and right columns
  let hasColumns = false;
  let midGutter = docMinX + docWidth * 0.5;

  if (docWidth > 350 && lines.length >= 4) {
    const leftColLines = lines.filter(l => l.maxX <= midGutter + docWidth * 0.08);
    const rightColLines = lines.filter(l => l.minX >= midGutter - docWidth * 0.08);
    // If over 65% of lines are cleanly separated into left and right columns
    if ((leftColLines.length + rightColLines.length) / lines.length >= 0.65 && leftColLines.length >= 2 && rightColLines.length >= 2) {
      hasColumns = true;
    }
  }

  if (hasColumns) {
    // Sort Column 1 first, then Column 2 (while preserving full-width titles at their position)
    const col1 = [];
    const col2 = [];
    const fullSpans = [];

    lines.forEach(l => {
      if (l.width > docWidth * 0.65) {
        fullSpans.push(l);
      } else if (l.centerX < midGutter) {
        col1.push(l);
      } else {
        col2.push(l);
      }
    });

    const sortColumn = (arr) => {
      return arr.sort((a, b) => {
        if (Math.abs(a.minY - b.minY) < medH * 0.5) return a.minX - b.minX;
        return a.minY - b.minY;
      });
    };

    // Return header spans, then col1, then col2
    const sortedCol1 = sortColumn(col1);
    const sortedCol2 = sortColumn(col2);
    const topFull = sortColumn(fullSpans.filter(l => l.minY < Math.min(sortedCol1[0]?.minY || 9999, sortedCol2[0]?.minY || 9999)));
    const restFull = sortColumn(fullSpans.filter(l => !topFull.includes(l)));

    return [...topFull, ...sortedCol1, ...sortedCol2, ...restFull];
  }

  // 3. Single-column standard document layout
  lines.sort((a, b) => {
    // Lines on the same horizontal visual band
    if (Math.abs(a.centerY - b.centerY) < medH * 0.45) {
      return a.minX - b.minX;
    }
    return a.minY - b.minY;
  });

  return lines;
}

/**
 * LEVEL 1 (NON-AI): Smart Paragraph Reconstruction Algorithm
 * Stitches physical lines into coherent paragraphs without AI tokens:
 * - Detects Chinese headings and lists (keeps them separate).
 * - Identifies soft-wrap lines and joins without space between CJK characters.
 * - Preserves all Chinese punctuation ，。！？；：「」『』（）《》.
 * - Preserves Traditional & Simplified characters, numbers, Latin terms.
 * - Flags low-confidence blocks for optional AI repair.
 */
function reconstructParagraphs(sortedLines) {
  if (!Array.isArray(sortedLines) || !sortedLines.length) return { text: '', lowConfCount: 0, lines: [] };

  const CJK = '\\u3400-\\u9fff\\uf900-\\ufaff';
  const reCJK = new RegExp('[' + CJK + ']');
  const END_PUNCT = /[。！？!?]$/;
  const END_PUNCT_WITH_QUOTE = /[。！？!?][”’」』）》]*$/;
  const ANY_PUNCT = /[，。！？；：、,.!?;:]/;

  // Heading regex patterns:
  // e.g. "第一章", "第二节", "1.", "一、", "(1)", "【标题】"
  const HEADING_REGEX = /^(第[0-9一二三四五六七八九十百千]+[章节课篇回部卷]|[\d一二三四五六七八九十]+[、.．]|[（(][\d一二三四五六七八九十]+[）)]|【[^】]+】)/;

  const paragraphs = [];
  let currentBuffer = '';
  let lowConfCount = 0;

  for (let i = 0; i < sortedLines.length; i++) {
    const item = sortedLines[i];
    let lineText = item.text.trim();
    if (!lineText) continue;

    // Remove noise spaces between Chinese characters, but preserve space after chapter/section markers
    const chapterMatch = lineText.match(/^(第[0-9一二三四五六七八九十百千]+[章节课篇回部卷]|[\d一二三四五六七八九十]+[、.．])\s+/);
    if (chapterMatch) {
      const prefix = chapterMatch[0];
      const rest = lineText.slice(prefix.length);
      lineText = prefix + rest.replace(new RegExp('(?<=[' + CJK + '，。！？；：、”’」』）]) +(?=[' + CJK + '，。！？；：、“‘「『（])', 'g'), '');
    } else {
      lineText = lineText.replace(new RegExp('(?<=[' + CJK + '，。！？；：、”’」』）]) +(?=[' + CJK + '，。！？；：、“‘「『（])', 'g'), '');
    }
    // Standardize stray Western commas/periods following CJK into full-width Chinese punctuation
    lineText = lineText.replace(new RegExp('(?<=[' + CJK + '])\\s*,', 'g'), '，')
                       .replace(new RegExp('(?<=[' + CJK + '])\\s*\\.(?!\\d)', 'g'), '。')
                       .replace(new RegExp('(?<=[' + CJK + '])\\s*\\?', 'g'), '？')
                       .replace(new RegExp('(?<=[' + CJK + '])\\s*!', 'g'), '！')
                       .replace(new RegExp('(?<=[' + CJK + '])\\s*;', 'g'), '；')
                       .replace(new RegExp('(?<=[' + CJK + '])\\s*:', 'g'), '：');

    // Count low-confidence items (< 0.60)
    if (item.score < 0.60) {
      lowConfCount++;
    }

    if (!currentBuffer) {
      currentBuffer = lineText;
      continue;
    }

    const isCurrentHeading = (lineText.length <= 20 && HEADING_REGEX.test(lineText)) ||
                             (lineText.length <= 16 && !ANY_PUNCT.test(lineText) && reCJK.test(lineText));
    const isBufferHeading = (currentBuffer.length <= 20 && HEADING_REGEX.test(currentBuffer)) ||
                            (currentBuffer.length <= 16 && !ANY_PUNCT.test(currentBuffer) && reCJK.test(currentBuffer));

    // Decision: Should we flush currentBuffer into a paragraph or merge?
    if (END_PUNCT_WITH_QUOTE.test(currentBuffer) || isBufferHeading || isCurrentHeading) {
      // Buffer ended a full sentence or is a title -> Flush into paragraph
      paragraphs.push(currentBuffer);
      currentBuffer = lineText;
    } else {
      // Soft wrap: Merge lineText into currentBuffer
      const prevEndsWithAlphaNum = /[A-Za-z0-9]$/.test(currentBuffer);
      const currStartsWithAlphaNum = /^[A-Za-z0-9]/.test(lineText);
      const needSpace = prevEndsWithAlphaNum && currStartsWithAlphaNum;

      currentBuffer += (needSpace ? ' ' : '') + lineText;
    }
  }

  if (currentBuffer) {
    paragraphs.push(currentBuffer);
  }

  const processedText = paragraphs.join('\n\n').trim();
  const rawText = sortedLines.map(l => l.text).join('\n');

  return {
    processedText,
    rawText,
    lowConfCount,
    lineCount: sortedLines.length,
    paragraphCount: paragraphs.length
  };
}

/**
 * Pre-processes image on offscreen HTML5 canvas to optimize OCR accuracy and reduce payload.
 */
async function preprocessImage(fileOrBlob) {
  const img = await loadImageFromFile(fileOrBlob);
  const canvas = document.createElement('canvas');
  const maxDim = 1600; // Optimal resolution for RapidOCR/PaddleOCR models
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

  // Return base64 JPEG data URL with quality 0.88 for fast transfer
  const base64Url = canvas.toDataURL('image/jpeg', 0.88);
  return { canvas, base64Url, width: w, height: h };
}

/**
 * Helper: Loads HTML Image object from File or Blob
 */
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

/**
 * Core Entrypoint: Handles user image selection, triggers Level 1 Pipeline,
 * and sets up modal with image preview and raw/processed tabs.
 */
async function handleImageUpload(file) {
  if (!file) return;

  window._ocrLastFile = file;
  window._ocrAiText = '';
  window._ocrTokensUsed = null;
  window._ocrLastSummary = null;

  const modal = document.getElementById('ocr-modal');
  const progressContainer = document.getElementById('ocr-progress-container');
  const progressBar = document.getElementById('ocr-progress-bar');
  const progressText = document.getElementById('ocr-progress-text');
  const editArea = document.getElementById('ocr-edit-textarea');
  const badgeEl = document.getElementById('ocr-status-badge');
  const previewImg = document.getElementById('ocr-preview-img');
  const previewBox = document.getElementById('ocr-preview-box');

  if (!modal) return;
  modal.classList.add('active');
  if (progressContainer) progressContainer.style.display = 'block';
  if (progressBar) progressBar.style.width = '15%';
  if (progressText) progressText.textContent = tx('Đang tiền xử lý ảnh...', 'Preprocessing image...', '画像を前処理中...');
  if (badgeEl) {
    badgeEl.className = 'ocr-status-badge';
    badgeEl.textContent = tx('⏳ Đang nhận diện...', '⏳ Recognizing...', '⏳ 認識中...');
  }
  if (editArea) editArea.value = '';

  // 1. Image preprocessing and thumbnail preview
  let preprocessed;
  try {
    preprocessed = await preprocessImage(file);
    window._ocrLastBase64 = preprocessed.base64Url;
    if (previewImg) previewImg.src = preprocessed.base64Url;
    if (previewBox) previewBox.style.display = 'flex';
  } catch (prepErr) {
    console.warn('Image preprocess fallback', prepErr);
  }

  if (progressBar) progressBar.style.width = '35%';
  if (progressText) progressText.textContent = tx('Đang nhận diện chữ Hán (RapidOCR)...', 'Recognizing Chinese characters (RapidOCR)...', '漢字を認識中 (RapidOCR)...');

  let rawOcrResult = null;
  let ocrEngineUsed = 'RapidOCR';

  // 2. Call Cloudflare Pages Functions Backend (POST /api/ocr)
  try {
    const backendResp = await fetch('/api/ocr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: window._ocrLastBase64 || '',
      }),
    });

    if (backendResp.ok) {
      const respData = await backendResp.json();
      if (respData.success && Array.isArray(respData.lines) && respData.lines.length > 0) {
        rawOcrResult = respData.lines;
        ocrEngineUsed = respData.engine || 'RapidOCR';
      } else if (respData.fallback === 'client' || respData.error === 'RAPIDOCR_NOT_CONFIGURED') {
        // Backend indicated RapidOCR is unconfigured -> fallback gracefully to client Tesseract
        console.info('RapidOCR not configured on backend. Falling back to local client OCR.');
        ocrEngineUsed = tx('Tesseract (Cục bộ)', 'Tesseract (Local)', 'Tesseract (ローカル)');
      }
    }
  } catch (netErr) {
    console.warn('Backend /api/ocr not reachable, falling back to client OCR', netErr);
    ocrEngineUsed = tx('Tesseract (Cục bộ)', 'Tesseract (Local)', 'Tesseract (ローカル)');
  }

  // 3. Fallback to client-side Tesseract.js if backend RapidOCR was unavailable
  if (!rawOcrResult || !rawOcrResult.length) {
    if (progressText) progressText.textContent = tx('Đang tải bộ nhận diện cục bộ (Tesseract)...', 'Loading local recognizer (Tesseract)...', 'ローカルOCRエンジンを読み込み中 (Tesseract)...');
    if (!window.Tesseract || typeof window.Tesseract.recognize !== 'function') {
      try {
        await loadScriptOnce('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
      } catch (loadErr) {
        console.error('Tesseract load failed', loadErr);
        if (progressContainer) progressContainer.style.display = 'none';
        if (editArea) editArea.value = t('ocrLoadError');
        return;
      }
    }

    try {
      const tessRes = await window.Tesseract.recognize(preprocessed?.canvas || file, 'chi_sim+chi_tra', {
        logger: (m) => {
          if (m.status === 'recognizing text' && progressBar) {
            const pct = Math.round(35 + (m.progress || 0) * 55);
            progressBar.style.width = pct + '%';
            if (progressText) progressText.textContent = `${t('loadingOCR')} (${pct}%)`;
          }
        }
      });
      if (tessRes?.data?.lines) {
        rawOcrResult = tessRes.data.lines;
      }
    } catch (tessErr) {
      console.error('Client OCR failed', tessErr);
    }
  }

  if (progressBar) progressBar.style.width = '95%';
  if (progressText) progressText.textContent = tx('Đang sắp xếp bố cục & ghép đoạn văn bản...', 'Re-arranging layout & reconstructing paragraphs...', 'レイアウト整理と段落を復元中...');

  // 4. Run Smart Non-AI Document Layout & Paragraph Reconstruction
  if (rawOcrResult && rawOcrResult.length > 0) {
    const sortedLines = sortOcrLinesByLayout(rawOcrResult);
    window._ocrLines = sortedLines;
    const reconstructed = reconstructParagraphs(sortedLines);

    window._ocrRawText = reconstructed.rawText;
    window._ocrProcessedText = reconstructed.processedText;

    if (editArea) editArea.value = reconstructed.processedText;
    ocrSwitchTab('processed');

    // Update status badge: Level 1 (Free, 0 Token AI)
    window._ocrLastSummary = {
      type: 'level1',
      engine: ocrEngineUsed,
      paragraphs: reconstructed.paragraphCount,
      lines: reconstructed.lineCount
    };
    ocrRefreshStatusBadge();

    // Auto-AI repair: If user enabled auto-repair AND there are questionable low-confidence segments
    const autoAiToggle = document.getElementById('ocr-auto-ai-toggle');
    if (autoAiToggle && autoAiToggle.checked && reconstructed.lowConfCount > 0) {
      showToast(tx('Phát hiện đoạn khó đọc, đang tự động sửa lỗi AI...', 'Detected unclear segments, auto-repairing with AI...', '不鮮明な箇所をAIで自動修正中...'));
      await ocrRepairWithAi();
    }
  } else {
    if (editArea) editArea.value = tx('Không tìm thấy chữ trong ảnh hoặc nhận diện thất bại. Vui lòng thử lại với ảnh rõ nét hơn.', 'No text found in image. Please try again with a clearer photo.', '画像から文字を検出できませんでした。より鮮明な画像でお試しください。');
    if (badgeEl) {
      badgeEl.className = 'ocr-status-badge';
      badgeEl.textContent = tx('⚠️ Không có kết quả', '⚠️ No text detected', '⚠️ 検出結果なし');
    }
  }

  if (progressContainer) progressContainer.style.display = 'none';
  ocrUpdateButtons();
}

/**
 * LEVEL 2: Sửa lỗi OCR bằng AI qua Cloudflare Pages Functions
 * Chỉ gửi đoạn văn bản OCR (tối đa 4,000 ký tự) lên /api/ocr/repair, không gửi ảnh,
 * hiển thị chính xác lượng token tiêu thụ.
 */
async function ocrRepairWithAi() {
  const editArea = document.getElementById('ocr-edit-textarea');
  const badgeEl = document.getElementById('ocr-status-badge');
  const repairBtn = document.getElementById('btn-ocr-repair');
  if (!editArea) return;

  const currentText = editArea.value.trim();
  if (!currentText) {
    showToast(tx('Không có văn bản để sửa lỗi!', 'No text to repair!', '修正するテキストがありません！'));
    return;
  }

  if (repairBtn) {
    repairBtn.disabled = true;
    repairBtn.innerHTML = `<span>⏳</span> <span>${t('ocrRepairing') || tx('Đang sửa bằng AI...', 'Repairing with AI...', 'AIでテキストを修正中...')}</span>`;
  }
  if (badgeEl) {
    badgeEl.className = 'ocr-status-badge ai';
    badgeEl.textContent = tx('✨ Đang kết nối AI...', '✨ Connecting to AI...', '✨ AIに接続中...');
  }

  try {
    const resp = await fetch('/api/ocr/repair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: currentText,
      }),
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      // The server replies in Vietnamese; showing its `message` verbatim would leak
      // Vietnamese into the Japanese/English UI. Map known codes to localised text.
      const code = errData && errData.error;
      const known = {
        GEMINI_KEY_MISSING: tx('Chưa cấu hình API Key trên máy chủ.', 'AI API key is not configured on the server.', 'サーバーにAI APIキーが設定されていません。'),
        GEMINI_CALL_FAILED: tx('Dịch vụ AI tạm thời không phản hồi. Vui lòng thử lại.', 'The AI service is temporarily unavailable. Please retry.', 'AIサービスが一時的に応答しません。再試行してください。'),
        AI_API_ERROR: tx('Dịch vụ AI tạm thời không phản hồi. Vui lòng thử lại.', 'The AI service is temporarily unavailable. Please retry.', 'AIサービスが一時的に応答しません。再試行してください。'),
        RATE_LIMITED: tx('Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.', 'Too many requests. Please retry in a minute.', 'リクエストが多すぎます。しばらくしてから再試行してください。'),
        TEXT_TOO_LONG: tx('Văn bản quá dài để sửa bằng AI một lần.', 'The text is too long to repair in one pass.', 'テキストが長すぎて一度に修正できません。'),
        PAYLOAD_TOO_LARGE: tx('Dữ liệu gửi lên quá lớn.', 'The request payload is too large.', '送信データが大きすぎます。'),
        ORIGIN_NOT_ALLOWED: tx('Tên miền này không được phép gọi API.', 'This origin is not allowed to call the API.', 'このオリジンはAPIを利用できません。'),
      };
      const msg = known[code] || tx(`Lỗi HTTP ${resp.status}`, `HTTP error ${resp.status}`, `HTTPエラー ${resp.status}`);
      throw new Error(msg);
    }

    const data = await resp.json();
    if (!data.success || !data.repairedText) {
      throw new Error(tx('Không nhận được kết quả sửa từ AI', 'No repair result received from the AI', 'AIから修正結果を取得できませんでした'));
    }

    window._ocrAiText = data.repairedText;
    editArea.value = data.repairedText;

    const tokens = data.tokens;
    window._ocrTokensUsed = tokens?.total;
    window._ocrLastSummary = {
      type: 'ai',
      tokens
    };
    ocrRefreshStatusBadge();

    if (tokens && typeof tokens.total === 'number') {
      showToast(tx(`Đã sửa lỗi OCR bằng AI (Tiêu thụ ${tokens.total} tokens)`, `AI repair completed (${tokens.total} tokens)`, `AI修正完了 (${tokens.total} トークン使用)`));
    } else {
      showToast(tx('Đã sửa lỗi OCR bằng AI thành công', 'AI repair completed successfully', 'AIによる修正が完了しました'));
    }
  } catch (err) {
    console.error('OCR AI repair error', err);
    const errMsg = err.message || '';
    showToast(tx(`Lỗi sửa AI: ${errMsg}`, `AI repair error: ${errMsg}`, `AI修正エラー: ${errMsg}`));
    if (badgeEl) {
      badgeEl.className = 'ocr-status-badge';
      badgeEl.textContent = tx(`⚠️ Lỗi sửa AI: ${errMsg}`, `⚠️ AI repair error: ${errMsg}`, `⚠️ AI修正エラー: ${errMsg}`);
    }
  } finally {
    if (repairBtn) {
      repairBtn.disabled = false;
      repairBtn.innerHTML = `<span>✨</span> <span>${t('ocrRepairAi') || tx('Sửa lỗi bằng AI', 'Repair with AI', 'AI誤字修正')}</span>`;
    }
  }
}

/**
 * Re-runs the Non-AI Layout & Paragraph stitching on current OCR lines (0 Token).
 */
function ocrCleanNow() {
  const ta = document.getElementById('ocr-edit-textarea');
  if (!ta) return;

  if (window._ocrLines && window._ocrLines.length > 0) {
    const sorted = sortOcrLinesByLayout(window._ocrLines);
    const rec = reconstructParagraphs(sorted);
    window._ocrProcessedText = rec.processedText;
    ta.value = rec.processedText;
    ocrSwitchTab('processed');
    window._ocrLastSummary = {
      type: 'clean',
      paragraphs: rec.paragraphCount
    };
    ocrRefreshStatusBadge();
    showToast(tx('Đã sắp xếp lại bố cục và ghép đoạn (0 Token AI)', 'Paragraphs re-arranged (0 AI Tokens)', '段落を再構成しました (AIトークン0)'));
  } else {
    // If no lines cached, clean current textarea text using regex
    ta.value = cleanRawOcrString(ta.value);
    showToast(tx('Đã làm sạch văn bản', 'Text cleaned', 'テキストを整形しました'));
  }
}

/**
 * Refreshes OCR status badge according to active language and current OCR state
 */
function ocrRefreshStatusBadge() {
  const badgeEl = document.getElementById('ocr-status-badge');
  if (!badgeEl) return;

  if (window._ocrLastSummary?.type === 'ai') {
    badgeEl.className = 'ocr-status-badge ai';
    const tokens = window._ocrLastSummary.tokens;
    if (tokens && typeof tokens.total === 'number') {
      const text = tx(
        `Đã sửa bằng AI (${tokens.total} tokens: ${tokens.prompt} in / ${tokens.candidates} out)`,
        `AI Repaired (${tokens.total} tokens: ${tokens.prompt} in / ${tokens.candidates} out)`,
        `AI修正完了 (${tokens.total} トークン: ${tokens.prompt} in / ${tokens.candidates} out)`
      );
      badgeEl.innerHTML = `<span>✨</span> <span>${escapeHtml(text)}</span>`;
    } else {
      const text = tx(
        'Đã sửa bằng AI (Tiết kiệm tối đa token)',
        'AI Repaired (Optimized tokens)',
        'AI修正完了 (トークン最適化)'
      );
      badgeEl.innerHTML = `<span>✨</span> <span>${escapeHtml(text)}</span>`;
    }
  } else if (window._ocrLastSummary?.type === 'level1') {
    badgeEl.className = 'ocr-status-badge free';
    const s = window._ocrLastSummary;
    const engineName = s.engine || 'RapidOCR';
    const text = tx(
      `${engineName}: ${s.paragraphs} đoạn (${s.lines} dòng) · <b>0 Token AI</b>`,
      `${engineName}: ${s.paragraphs} paragraphs (${s.lines} lines) · <b>0 AI Tokens</b>`,
      `${engineName}: ${s.paragraphs} 段落 (${s.lines} 行) · <b>AIトークン0</b>`
    );
    badgeEl.innerHTML = `<span>⚡</span> <span>${text}</span>`;
  } else if (window._ocrLastSummary?.type === 'clean') {
    badgeEl.className = 'ocr-status-badge free';
    const s = window._ocrLastSummary;
    const text = tx(
      `Đã sắp xếp lại: ${s.paragraphs} đoạn · <b>0 Token AI</b>`,
      `Re-arranged: ${s.paragraphs} paragraphs · <b>0 AI Tokens</b>`,
      `再構成済み: ${s.paragraphs} 段落 · <b>AIトークン0</b>`
    );
    badgeEl.innerHTML = `<span>⚡</span> <span>${text}</span>`;
  } else {
    badgeEl.className = 'ocr-status-badge free';
    badgeEl.innerHTML = `<span data-i18n="ocrLevel1Free">${t('ocrLevel1Free') || '⚡ Cấp 1: Thuật toán nội bộ (0 Token AI)'}</span>`;
  }
}

/**
 * Pure regex-based text cleanup fallback
 */
function cleanRawOcrString(raw) {
  if (!raw) return '';
  const CJK = '\\u3400-\\u9fff\\uf900-\\ufaff';
  let lines = String(raw).replace(/\r/g, '').split('\n');
  lines = lines.map(l => {
    l = l.replace(new RegExp('(?<=[' + CJK + '，。！？；：、”’」』）]) +(?=[' + CJK + '，。！？；：、“‘「『（])', 'g'), '');
    l = l.replace(new RegExp('(?<=[' + CJK + '])\\s*,', 'g'), '，').replace(new RegExp('(?<=[' + CJK + '])\\s*\\.(?!\\d)', 'g'), '。');
    return l.trim();
  }).filter(Boolean);
  return lines.join('\n\n').trim();
}

/**
 * Switches between 'processed' (reconstructed paragraphs) and 'raw' (original OCR lines).
 */
function ocrSwitchTab(tab) {
  window._ocrActiveTab = tab;
  const ta = document.getElementById('ocr-edit-textarea');
  const tabProc = document.getElementById('ocr-tab-processed');
  const tabRaw = document.getElementById('ocr-tab-raw');

  if (tabProc) tabProc.classList.toggle('active', tab === 'processed');
  if (tabRaw) tabRaw.classList.toggle('active', tab === 'raw');

  if (!ta) return;
  if (tab === 'raw') {
    ta.value = window._ocrRawText || ta.value;
  } else {
    ta.value = window._ocrAiText || window._ocrProcessedText || ta.value;
  }
}

/**
 * Restores original raw text
 */
function ocrRestoreRaw() {
  ocrSwitchTab('raw');
}

/**
 * Updates button labels and active status badge based on current language
 */
function ocrUpdateButtons() {
  const btnClean = document.getElementById('btn-ocr-clean');
  if (btnClean) {
    btnClean.innerHTML = `<span>🧹</span> <span>${t('ocrReorganize') || tx('Sắp xếp đoạn (0 Token)', 'Re-arrange (0 Token)', '段落整形 (0トークン)')}</span>`;
  }
  const btnRepair = document.getElementById('btn-ocr-repair');
  if (btnRepair) {
    btnRepair.innerHTML = `<span>✨</span> <span>${t('ocrRepairAi') || tx('Sửa lỗi bằng AI', 'Repair with AI', 'AI誤字修正')}</span>`;
  }
  ocrRefreshStatusBadge();
}

/**
 * Rescans the last uploaded image
 */
function rescanLastImage() {
  if (window._ocrLastFile) {
    handleImageUpload(window._ocrLastFile);
  } else {
    const input = document.getElementById('ocr-file-input');
    if (input) input.click();
  }
}

/**
 * User confirms OCR result: Closes modal and begins reading / dictionary lookup
 */
function confirmOcrResult() {
  const text = document.getElementById('ocr-edit-textarea').value.trim();
  const modal = document.getElementById('ocr-modal');
  if (modal) modal.classList.remove('active');
  if (text) {
    const inputArea = document.getElementById('input-textarea');
    if (inputArea) {
      inputArea.value = text;
      if (typeof updateInputClearBtn === 'function') updateInputClearBtn();
    }
    if (typeof analyzeText === 'function') {
      analyzeText();
    }
  }
}

function closeOcrModal() {
  const modal = document.getElementById('ocr-modal');
  if (modal) modal.classList.remove('active');
}

// Global button label refresh
if (typeof ocrUpdateButtons === 'function') {
  try { ocrUpdateButtons(); } catch (e) {}
}
