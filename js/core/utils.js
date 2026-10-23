// js/core/utils.js - Shared utilities, i18n helper, string formatting, script loader - Dependencies: js/core/state.js, js/data/i18n-data.js

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeQuotes(str) {
  if (!str) return '';
  return escapeHtml(String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' '));
}

// ===== Module: UI strings helper (vi/en/ja) =====
function tx(vi, en, ja) {
  const l = state.uiLang;
  return l === 'vi' ? vi : (l === 'ja' ? ja : en);
}

// --- Module: i18n ---
function t(key) {
  const lang = state.uiLang;
  return (I18N_DATA[lang] && I18N_DATA[lang][key]) ||
         (I18N_DATA.en && I18N_DATA.en[key]) ||
         key;
}

function getLangName(code) {
  return t('lang_' + code) || code.toUpperCase();
}

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat(state.uiLang, { dateStyle: 'medium' }).format(new Date(date));
  } catch(e) {
    return new Date(date).toLocaleDateString();
  }
}

function formatNumber(num) {
  try {
    return new Intl.NumberFormat(state.uiLang).format(num);
  } catch(e) {
    return String(num);
  }
}

// --- Module: Toast Notifications ---
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.25s ease forwards';
    setTimeout(() => toast.remove(), 250);
  }, 2400);
}

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Helper: Lazy-load external heavy script once on demand
const _loadedScripts = new Map();
function loadScriptOnce(url) {
  if (_loadedScripts.has(url)) return _loadedScripts.get(url);
  const p = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => {
        _loadedScripts.delete(url);
        reject(new Error('Failed to load script: ' + url));
      });
      return;
    }
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onload = () => {
      s.dataset.loaded = 'true';
      resolve();
    };
    s.onerror = () => {
      _loadedScripts.delete(url);
      reject(new Error('Failed to load script: ' + url));
    };
    document.head.appendChild(s);
  });
  _loadedScripts.set(url, p);
  return p;
}

function isChinese(text) {
  return /[\u4e00-\u9fa5]/.test(text);
}

// Split text into coherent sentences while preserving delimiters
function splitSentences(rawText) {
  if (!rawText) return [];
  // Regex matches chunks ending in Chinese or Latin sentence punctuation or newlines
  const regex = /[^。！？!?；;\n\r]+([。！？!?；;]+|[\n\r]+|$)/g;
  const matches = rawText.match(regex);
  if (!matches) return [rawText.trim()].filter(Boolean);
  return matches.map(s => s.trim()).filter(s => s.length > 0);
}
