// js/features/handwriting.js - Handwriting Modal Manager & App Integration
// Ties together HandwritingPad, Dictionary Search, Text Input, and Word Sheet Quiz

let globalHandwritingPad = null;
let activeHandwritingCallback = null;

function getGlobalHandwritingPad() {
  if (!globalHandwritingPad) {
    const container = document.getElementById('handwriting-pad-mount');
    if (!container) return null;

    const engine = new window.FallbackEngine({
      cloudEnabled: !!(state && state.cloudHandwritingEnabled),
      confidenceThreshold: 0.65,
    });

    globalHandwritingPad = new window.HandwritingPad({
      container,
      engine,
      mode: 'recognize',
      isTraditional: !!(state && state.isTraditional),
      onSelect: (char) => {
        if (typeof activeHandwritingCallback === 'function') {
          activeHandwritingCallback(char);
        }
      },
      onQuizComplete: (summary) => {
        if (typeof updateQuizEvaluationScore === 'function') {
          updateQuizEvaluationScore(summary);
        }
      },
    });
  }
  return globalHandwritingPad;
}

/**
 * Opens Handwriting Recognition / Quiz Modal
 * @param {Object} [options]
 * @param {'recognize'|'quiz'} [options.mode='recognize']
 * @param {string} [options.targetChar]
 * @param {(char: string) => void} [options.onSelect]
 */
function openHandwritingModal(options = {}) {
  const modal = document.getElementById('handwriting-modal');
  if (!modal) return;

  activeHandwritingCallback = options.onSelect || null;
  const mode = options.mode || 'recognize';
  const targetChar = options.targetChar || '';

  modal.classList.add('active');

  const pad = getGlobalHandwritingPad();
  if (pad) {
    pad.setMode(mode, targetChar);
    setTimeout(() => {
      pad.setupCanvas();
    }, 60);
  }
}

function closeHandwritingModal() {
  const modal = document.getElementById('handwriting-modal');
  if (modal) modal.classList.remove('active');
  if (globalHandwritingPad) {
    globalHandwritingPad.clear();
  }
  activeHandwritingCallback = null;
}

/**
 * Triggered from Dictionary Search Bar: Opens Handwriting Pad and writes into search input
 */
function openHandwritingForDictSearch() {
  openHandwritingModal({
    mode: 'recognize',
    onSelect: (char) => {
      const searchInput = document.getElementById('dict-search-input');
      if (searchInput) {
        searchInput.value = (searchInput.value || '') + char;
        if (typeof handleDictSearch === 'function') {
          handleDictSearch(searchInput.value);
        }
        const clearBtn = document.getElementById('dict-search-clear');
        if (clearBtn) clearBtn.style.display = searchInput.value ? 'block' : 'none';
      }
      showToast(tx(`Đã chọn: ${char}`, `Selected: ${char}`, `選択: ${char}`));
    },
  });
}

/**
 * Triggered from Main Text Input: Opens Handwriting Pad and appends to input-textarea
 */
function openHandwritingForTextInput() {
  openHandwritingModal({
    mode: 'recognize',
    onSelect: (char) => {
      const ta = document.getElementById('input-textarea');
      if (ta) {
        ta.value = (ta.value || '') + char;
        if (typeof updateInputClearBtn === 'function') {
          updateInputClearBtn();
        }
      }
      showToast(tx(`Đã thêm: ${char}`, `Added: ${char}`, `追加: ${char}`));
    },
  });
}

/**
 * Triggered from Word Detail Sheet: Opens Quiz mode for a specific character
 */
function openHandwritingQuizForWord(char) {
  if (!char) return;
  openHandwritingModal({
    mode: 'quiz',
    targetChar: char,
  });
}

/**
 * Triggered from Word Detail Sheet writer controls for current active word
 */
function openHandwritingQuizForCurrentWord() {
  const word = (typeof state !== 'undefined' && state.activeWord) || '';
  const chars = [...word].filter(ch => /[\u4e00-\u9fff]/.test(ch));
  if (chars.length > 0) {
    openHandwritingQuizForWord(chars[0]);
  } else {
    showToast(tx('Chưa chọn chữ Hán để luyện nét', 'No Chinese character selected', '練習する漢字が選択されていません'));
  }
}

/**
 * Toggles Cloud handwriting recognition engine on/off
 */
function toggleCloudHandwriting(enabled) {
  if (state) {
    state.cloudHandwritingEnabled = !!enabled;
    localStorage.setItem('cr_cloudHandwriting', state.cloudHandwritingEnabled ? '1' : '0');
  }
  if (globalHandwritingPad && globalHandwritingPad.engine) {
    if (typeof globalHandwritingPad.engine.setCloudEnabled === 'function') {
      globalHandwritingPad.engine.setCloudEnabled(!!enabled);
    }
  }
}

// Global exports
if (typeof window !== 'undefined') {
  window.openHandwritingModal = openHandwritingModal;
  window.closeHandwritingModal = closeHandwritingModal;
  window.openHandwritingForDictSearch = openHandwritingForDictSearch;
  window.openHandwritingForTextInput = openHandwritingForTextInput;
  window.openHandwritingQuizForWord = openHandwritingQuizForWord;
  window.toggleCloudHandwriting = toggleCloudHandwriting;
}
