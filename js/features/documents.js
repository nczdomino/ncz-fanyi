// js/features/documents.js - Document parsing for Word (.docx) and PDF files - Dependencies: js/core/utils.js, js/features/input.js, js/features/ocr.js

// --- Module: Word Document Parser (mammoth.js) ---
async function handleWordUpload(file) {
  if (!file) return;
  showToast(t('loadingWord'));

  try {
    if (!window.mammoth) {
      try {
        await loadScriptOnce('https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js');
      } catch (e) {
        alert(tx('Không thể tải thư viện đọc tài liệu Word. Vui lòng kiểm tra kết nối mạng.', 'Failed to load Word document reader library. Please check your internet connection.', 'Wordリーダーライブラリの読み込みに失敗しました。接続を確認してください。'));
        return;
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    const text = (result && result.value) ? result.value.trim() : '';

    if (text) {
      const textarea = document.getElementById('input-textarea');
      if (textarea) textarea.value = text;
      updateInputClearBtn();
      showToast(t('wordExtracted'));
      analyzeText();
    } else {
      alert(t('wordEmpty'));
    }
  } catch (err) {
    console.error('Word parsing error', err);
    alert(t('wordError') + (err.message || err));
  }
}

// --- Module: PDF Document Parser (PDF.js) ---
async function handlePdfUpload(file) {
  if (!file) return;
  showToast(t('loadingPdf'));

  try {
    if (!window.pdfjsLib) {
      try {
        await loadScriptOnce('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js');
      } catch (e) {
        alert(tx('Không thể tải thư viện đọc PDF. Vui lòng kiểm tra kết nối mạng.', 'Failed to load PDF reader library. Please check your internet connection.', 'PDFリーダーライブラリの読み込みに失敗しました。接続を確認してください。'));
        return;
      }
    }

    try {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    } catch(e) {}

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items.map(item => item.str).join(' ').trim();
      if (pageStrings) {
        fullText += (fullText ? '\n\n' : '') + pageStrings;
      }
    }

    if (fullText.trim().length > 15) {
      const textarea = document.getElementById('input-textarea');
      if (textarea) textarea.value = fullText.trim();
      updateInputClearBtn();
      showToast(`${t('pdfExtracted')} (${numPages} ${t('pages')})`);
      analyzeText();
    } else {
      // Fallback: scanned PDF (image only) -> Render page 1 to canvas and pass to OCR
      showToast(t('pdfScannedNotice'));
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;

      canvas.toBlob(blob => {
        if (blob) {
          const imageFile = new File([blob], file.name.replace(/\.pdf$/i, '.png'), { type: 'image/png' });
          handleImageUpload(imageFile);
        }
      });
    }
  } catch (err) {
    console.error('PDF error', err);
    alert(t('pdfError') + (err.message || err));
  }
}
