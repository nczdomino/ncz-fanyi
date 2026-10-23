// js/main.js - Application bootstrap and DOMContentLoaded lifecycle - Dependencies: all modules

try {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.darkMode === 'system') applyTheme();
  });
} catch (e) {}

// --- App Initialization ---
window.addEventListener('DOMContentLoaded', async () => {
  await initDB();
  applyTheme();
  updateThemeAndUI();
  setupKeyboardShortcuts();
  initTouchAndPasteHandlers();
  checkOnboarding();
  switchView('input');
});
