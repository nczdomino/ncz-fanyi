// js/core/db.js - IndexedDB caching layer for online translations - Dependencies: none

// --- Module: IndexedDB Caching ---
const DB_NAME = 'ChineseReaderDB';
const DB_VERSION = 1;
let dbInstance = null;

function initDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) {
      console.warn('IndexedDB not supported');
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (e) => {
      console.warn('IndexedDB open failed', e);
      resolve(null);
    };
    request.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('translations')) {
        db.createObjectStore('translations', { keyPath: 'q' });
      }
    };
  });
}

function getFromDB(storeName, key) {
  return new Promise((resolve) => {
    if (!dbInstance) return resolve(null);
    try {
      const tx = dbInstance.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch(e) {
      resolve(null);
    }
  });
}

function putToDB(storeName, data) {
  return new Promise((resolve) => {
    if (!dbInstance) return resolve();
    try {
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.put(data);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch(e) {
      resolve();
    }
  });
}
