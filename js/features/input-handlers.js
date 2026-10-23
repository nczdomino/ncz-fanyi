// js/features/input-handlers.js - Global keyboard shortcuts, touch gestures, and paste listeners - Dependencies: js/core/state.js, js/features/nav.js, js/features/reader.js, js/features/ocr.js, js/features/documents.js, js/features/word-sheet.js

// --- Module: Keyboard Shortcuts ---
function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // If active element is input or textarea, don't trigger global navigation keys
    const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isTyping = tag === 'input' || tag === 'textarea';

    if (e.key === 'Escape') {
      closeWordSheet();
      closeOcrModal();
      closeEditMeaningModal();
      return;
    }

    if (isTyping) return;

    if (e.key === '/') {
      e.preventDefault();
      switchView('dict');
      const searchInp = document.getElementById('dict-search-input');
      if (searchInp) searchInp.focus();
    } else if (e.key === 'ArrowLeft') {
      if (state.currentView === 'reader') prevSentence();
    } else if (e.key === 'ArrowRight') {
      if (state.currentView === 'reader') nextSentence();
    } else if (e.key.toLowerCase() === 'p') {
      togglePinyin();
    } else if (e.key.toLowerCase() === 'l') {
      cycleUiLang();
    }
  });
}

// --- Module: Gestures & Paste Listeners ---
function initTouchAndPasteHandlers() {
  // 1. Desktop image paste (Ctrl+V / Cmd+V)
  window.addEventListener('paste', (e) => {
    const items = (e.clipboardData || window.clipboardData)?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          handleImageUpload(file);
          break;
        }
      }
    }
  });

  // 2. Reader view swipe left/right
  const readerArea = document.getElementById('reader-content-area');
  if (readerArea) {
    let touchStartX = 0;
    let touchStartY = 0;
    readerArea.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    readerArea.addEventListener('touchend', (e) => {
      if (state.currentView !== 'reader' || state.viewMode !== 'sentence') return;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
        if (diffX < 0) nextSentence();
        else prevSentence();
      }
    }, { passive: true });
  }

  // 4. Drag & Drop PDF and Images on Input area
  const inputCard = document.querySelector('#view-input .card');
  if (inputCard) {
    ['dragenter', 'dragover'].forEach(eventName => {
      inputCard.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        inputCard.style.borderColor = 'var(--accent)';
      }, false);
    });
    ['dragleave', 'drop'].forEach(eventName => {
      inputCard.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        inputCard.style.borderColor = '';
      }, false);
    });
    inputCard.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt ? dt.files : null;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
          handlePdfUpload(file);
        } else if (file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc') || file.type.includes('word') || file.type.includes('officedocument')) {
          handleWordUpload(file);
        } else if (file.type.startsWith('image/')) {
          handleImageUpload(file);
        }
      }
    });
  }

  // 3. Bottom sheet drag down to close
  const sheet = document.getElementById('word-sheet');
  if (sheet) {
    let sheetStartY = 0;
    let sheetCurrentY = 0;
    let isDragging = false;
    sheet.addEventListener('touchstart', (e) => {
      if (sheet.scrollTop <= 0) {
        sheetStartY = e.touches[0].clientY;
        sheetCurrentY = sheetStartY;
        isDragging = true;
      }
    }, { passive: true });
    sheet.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      sheetCurrentY = e.touches[0].clientY;
      const diff = sheetCurrentY - sheetStartY;
      if (diff > 0) {
        sheet.style.transform = `translateY(${diff}px)`;
      }
    }, { passive: true });
    sheet.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = sheetCurrentY - sheetStartY;
      sheet.style.transform = '';
      if (diff > 75) {
        closeWordSheet();
      }
    }, { passive: true });
  }
}
