// js/features/input.js - Text input, recent texts history, clipboard paste & analysis - Dependencies: js/core/state.js, js/core/utils.js, js/features/nav.js, js/features/reader.js

// --- Module: Input View ---
function renderInputView() {
  const recentListEl = document.getElementById('recent-texts-list');
  if (!recentListEl) return;

  // Ẩn/hiện nút xóa tùy theo có lịch sử không
  const clearBtn = document.getElementById('btn-clear-history');
  if (clearBtn) clearBtn.style.display = (state.recentTexts && state.recentTexts.length > 0) ? 'inline-flex' : 'none';

  // Cập nhật trạng thái nút clear văn bản
  updateInputClearBtn();

  if (!state.recentTexts || state.recentTexts.length === 0) {
    recentListEl.innerHTML = '<div class="recent-empty"><span class="recent-empty-mark" lang="zh-CN">文</span><span>' + t('noHistory') + '</span></div>';
    return;
  }
  let html = '';
  state.recentTexts.slice(0, 5).forEach((item, idx) => {
    html += `
      <div class="recent-item" onclick="loadRecentText(${idx})">
        <div class="recent-text">${escapeHtml(item.preview)}</div>
        <div class="recent-meta">${formatDate(item.date)}</div>
      </div>
    `;
  });
  recentListEl.innerHTML = html;
}

function clearRecentTexts() {
  state.recentTexts = [];
  localStorage.setItem('cr_recentTexts', '[]');
  renderInputView();
  showToast(t('historyCleared'));
}

function clearInputText() {
  const ta = document.getElementById('input-textarea');
  if (ta) {
    ta.value = '';
    ta.focus();
    updateInputClearBtn();
    showToast(t('inputCleared') || 'Đã xóa nội dung văn bản!');
  }
}

function updateInputClearBtn() {
  const ta = document.getElementById('input-textarea');
  const floatBtn = document.getElementById('textarea-clear-btn');
  const actionBtn = document.getElementById('btn-clear-input');
  const hasText = !!(ta && ta.value && ta.value.trim().length > 0);
  if (floatBtn) floatBtn.style.display = hasText ? 'inline-flex' : 'none';
  if (actionBtn) {
    actionBtn.style.opacity = hasText ? '1' : '0.6';
  }
}

function loadRecentText(idx) {
  const item = state.recentTexts[idx];
  if (!item) return;
  document.getElementById('input-textarea').value = item.text;
  updateInputClearBtn();
  analyzeText();
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      document.getElementById('input-textarea').value = text;
      updateInputClearBtn();
      showToast(t('copied'));
    }
  } catch (err) {
    alert(t("clipboardPermissionDenied"));
  }
}

function analyzeText() {
  const textarea = document.getElementById('input-textarea');
  const text = textarea ? textarea.value.trim() : '';
  if (!text) {
    showToast(t("pleaseEnterText"));
    return;
  }

  state.currentText = text;
  state.sentences = splitSentences(text);
  state.currentSentenceIndex = 0;

  // Add to recent texts
  const existingIdx = state.recentTexts.findIndex(r => r.text === text);
  if (existingIdx >= 0) state.recentTexts.splice(existingIdx, 1);
  state.recentTexts.unshift({
    text: text,
    preview: text.length > 35 ? text.slice(0, 35) + '...' : text,
    date: Date.now()
  });
  if (state.recentTexts.length > 20) state.recentTexts.pop();
  localStorage.setItem('cr_recentTexts', JSON.stringify(state.recentTexts));

  switchView('reader');
}

// --- Module: Reader View ---
