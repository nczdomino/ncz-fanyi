// js/features/translate.js - Online translation service with DB caching - Dependencies: js/core/state.js, js/core/storage.js, js/core/db.js

// --- Module: Translation API ---
// Thử Google Translate unofficial trước (chất lượng cao hơn cho idiom/slang)
// Fallback sang MyMemory nếu bị block
async function translateTextOnline(text, targetLang) {
  if (!text) return '';
  const langMap = { vi: 'vi', en: 'en', ja: 'ja' };
  const tl = langMap[targetLang] || 'en';
  const cacheKey = tl + ':' + text;

  // 1. Kiểm tra từ điển người dùng tự sửa (ưu tiên cao nhất)
  const userDict = getUserDict();
  const userKey = targetLang + ':' + text;
  if (userDict[userKey]) return userDict[userKey];

  // 2. Kiểm tra cache RAM
  if (state.cachedTranslations[cacheKey]) return state.cachedTranslations[cacheKey];

  // 3. Kiểm tra cache IndexedDB
  const fromDB = await getFromDB('translations', cacheKey);
  if (fromDB && fromDB.result) {
    state.cachedTranslations[cacheKey] = fromDB.result;
    return fromDB.result;
  }

  // 4. Gọi Google Translate unofficial (chất lượng tốt hơn cho idiom/slang)
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text);
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      // Kết quả nằm ở data[0][*][0], ghép lại
      let result = '';
      if (Array.isArray(data[0])) {
        result = data[0].map(seg => (seg && seg[0]) ? seg[0] : '').join('');
      }
      if (result) {
        state.cachedTranslations[cacheKey] = result;
        await putToDB('translations', { q: cacheKey, result });
        return result;
      }
    }
  } catch (e1) {
    console.warn('Google Translate unofficial failed, trying MyMemory', e1);
  }

  // 5. Fallback: MyMemory
  try {
    const langPair = tl === 'vi' ? 'zh|vi' : (tl === 'ja' ? 'zh|ja' : 'zh|en');
    const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + langPair;
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let result = data.responseData.translatedText;
        if (result.includes('MYMEMORY WARNING')) result = result.split('\n')[0];
        if (result) {
          state.cachedTranslations[cacheKey] = result;
          await putToDB('translations', { q: cacheKey, result });
          return result;
        }
      }
    }
  } catch (e2) {
    console.warn('MyMemory also failed', e2);
  }
  return '';
}
