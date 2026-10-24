// js/features/handwriting.js - Handwriting Modal Manager & Seamless Multi-Character Integration
// Ties together HandwritingPad with Dictionary Search and Text Input

let globalHandwritingPad = null;
let activeHandwritingCallback = null;

function getGlobalHandwritingPad(options = {}) {
  const container = document.getElementById('handwriting-pad-mount');
  if (!container) return null;

  if (!globalHandwritingPad) {
    const engine = new window.FallbackEngine({
      cloudEnabled: !!(typeof state !== 'undefined' && state.cloudHandwritingEnabled),
      confidenceThreshold: 0.65,
    });

    globalHandwritingPad = new window.HandwritingPad({
      container,
      engine,
      confirmType: options.confirmType || 'search',
      initialText: options.initialText || '',
      isTraditional: !!(typeof state !== 'undefined' && state.isTraditional),
      onConfirm: (text) => {
        if (typeof activeHandwritingCallback === 'function') {
          activeHandwritingCallback(text);
        }
        closeHandwritingModal();
      },
    });
  } else {
    if (options.confirmType) {
      globalHandwritingPad.confirmType = options.confirmType;
    }
    if (typeof options.initialText === 'string') {
      globalHandwritingPad.setBuffer(options.initialText);
    }
    globalHandwritingPad.onConfirm = (text) => {
      if (typeof activeHandwritingCallback === 'function') {
        activeHandwritingCallback(text);
      }
      closeHandwritingModal();
    };
    globalHandwritingPad.updateI18nLabels();
  }

  return globalHandwritingPad;
}

/**
 * Opens Handwriting Modal with seamless buffer support
 * @param {Object} [options]
 * @param {'search'|'insert'} [options.confirmType='search']
 * @param {string} [options.initialText='']
 * @param {(text: string) => void} [options.onConfirm]
 */
function openHandwritingModal(options = {}) {
  const modal = document.getElementById('handwriting-modal');
  if (!modal) return;

  activeHandwritingCallback = options.onConfirm || null;
  const confirmType = options.confirmType || 'search';
  const initialText = options.initialText || '';

  modal.classList.add('active');

  const pad = getGlobalHandwritingPad({
    confirmType,
    initialText,
  });

  if (pad) {
    pad.updateI18nLabels();
    setTimeout(() => {
      pad.setupCanvas();
    }, 60);
  }
}

function closeHandwritingModal() {
  const modal = document.getElementById('handwriting-modal');
  if (modal) modal.classList.remove('active');
  if (globalHandwritingPad) {
    globalHandwritingPad.clearCanvas();
  }
  activeHandwritingCallback = null;
}

/**
 * Triggered from Dictionary Search Bar:
 * Allows user to write multiple characters (e.g. "你" then "好"), preview them, and search!
 */
function openHandwritingForDictSearch() {
  const searchInput = document.getElementById('dict-search-input');
  const existingText = (searchInput && searchInput.value) ? searchInput.value.trim() : '';

  openHandwritingModal({
    confirmType: 'search',
    initialText: existingText,
    onConfirm: (fullText) => {
      if (searchInput) {
        searchInput.value = fullText;
        if (typeof handleDictSearch === 'function') {
          handleDictSearch(fullText);
        }
        const clearBtn = document.getElementById('dict-search-clear');
        if (clearBtn) clearBtn.style.display = fullText ? 'block' : 'none';
      }
      showToast(tx(`Tra từ: "${fullText}"`, `Search: "${fullText}"`, `検索: "${fullText}"`));
    },
  });
}

/**
 * Triggered from Main Text Input:
 * Allows user to compose multiple characters and insert into text area!
 */
function openHandwritingForTextInput() {
  openHandwritingModal({
    confirmType: 'insert',
    initialText: '',
    onConfirm: (fullText) => {
      const ta = document.getElementById('input-textarea');
      if (ta) {
        const prev = ta.value || '';
        ta.value = prev ? (prev + ' ' + fullText) : fullText;
        if (typeof updateInputClearBtn === 'function') {
          updateInputClearBtn();
        }
      }
      showToast(tx(`Đã chèn: "${fullText}"`, `Inserted: "${fullText}"`, `挿入: "${fullText}"`));
    },
  });
}

/**
 * Toggles Cloud handwriting recognition engine on/off
 */
function toggleCloudHandwriting(enabled) {
  if (typeof state !== 'undefined') {
    state.cloudHandwritingEnabled = !!enabled;
    localStorage.setItem('cr_cloudHandwriting', state.cloudHandwritingEnabled ? '1' : '0');
  }
  if (globalHandwritingPad && globalHandwritingPad.engine) {
    if (typeof globalHandwritingPad.engine.setCloudEnabled === 'function') {
      globalHandwritingPad.engine.setCloudEnabled(!!enabled);
    }
  }
}

// Global hook to update handwriting labels when app language changes
if (typeof window !== 'undefined') {
  window.openHandwritingModal = openHandwritingModal;
  window.closeHandwritingModal = closeHandwritingModal;
  window.openHandwritingForDictSearch = openHandwritingForDictSearch;
  window.openHandwritingForTextInput = openHandwritingForTextInput;
  window.toggleCloudHandwriting = toggleCloudHandwriting;
  window.refreshHandwritingPadI18n = function() {
    if (globalHandwritingPad) {
      globalHandwritingPad.updateI18nLabels();
    }
  };
}
