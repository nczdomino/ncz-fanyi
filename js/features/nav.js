// js/features/nav.js - View navigation and routing - Dependencies: js/core/state.js, js/features/input.js, js/features/reader.js, js/features/dict.js, js/features/settings.js

// --- Module: Navigation & Views ---
function switchView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const targetView = document.getElementById('view-' + viewName);
  if (targetView) targetView.classList.add('active');

  document.querySelectorAll('.nav-tab').forEach(tab => {
    if (tab.getAttribute('data-view') === viewName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  renderCurrentView();
}

function renderCurrentView() {
  switch (state.currentView) {
    case 'input':
      renderInputView();
      break;
    case 'reader':
      renderReaderView();
      break;
    case 'dict':
      renderDictView();
      break;
    case 'grammar':
      if (typeof renderGrammarView === 'function') {
        renderGrammarView();
      }
      break;
    case 'business':
      if (typeof renderBusinessView === 'function') {
        renderBusinessView();
      }
      break;
    case 'settings':
      renderSettingsView();
      break;
  }
}
