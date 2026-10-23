// js/core/storage.js - Storage hardening, safe JSON parsing, and user dictionary cache - Dependencies: none

// --- Storage hardening (private mode / quota / in-app browsers) ---
(function () {
  try {
    const P = Storage.prototype, g = P.getItem, s = P.setItem, r = P.removeItem;
    P.getItem = function (k) { try { return g.call(this, k); } catch (e) { return null; } };
    P.setItem = function (k, v) { try { s.call(this, k, v); } catch (e) { console.warn('storage unavailable', k); } };
    P.removeItem = function (k) { try { r.call(this, k); } catch (e) {} };
  } catch (e) {}
})();

function safeJSON(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return (v === null || v === undefined) ? fallback : v;
  } catch (e) {
    return fallback;
  }
}

// Module-level cache for custom user meanings to eliminate redundant JSON.parse calls
let _cachedUserDict = null;

function getUserDict() {
  if (_cachedUserDict === null) {
    _cachedUserDict = safeJSON('cr_userDict', {});
    if (typeof _cachedUserDict !== 'object' || _cachedUserDict === null || Array.isArray(_cachedUserDict)) {
      _cachedUserDict = {};
    }
  }
  return _cachedUserDict;
}

function setUserDict(obj) {
  _cachedUserDict = (obj && typeof obj === 'object' && !Array.isArray(obj)) ? obj : {};
  localStorage.setItem('cr_userDict', JSON.stringify(_cachedUserDict));
}
