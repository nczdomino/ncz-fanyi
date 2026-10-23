// js/features/enrich.js - Word enrichment with Wiktionary, Tatoeba, slang lookup and media illustrations - Dependencies: js/core/state.js, js/core/storage.js, js/core/utils.js, js/data/slang-data.js, js/features/nlp.js

function slangLookup(word) {
  enrichLoadRemoteSlang();
  const hits = [];
  const seen = new Set();
  const lw = String(word).toLowerCase();
  const exact = getSlangEntry(lw);
  if (exact) {
    seen.add(exact.word);
    hits.push({ w: exact.word, py: exact.pinyin, vi: exact.vi, en: Array.isArray(exact.en) ? exact.en.join('; ') : exact.en, ja: exact.ja });
  }
  if (lw.length > 2) {
    const all = (ENRICH.remote || []).concat(SLANG_BUILTIN || []);
    for (const it of all) {
      if (!it || !it.w || seen.has(it.w)) continue;
      const keys = [it.w].concat(it.alias || []).map(k => String(k).toLowerCase());
      if (keys.some(k => k.length >= 2 && lw.includes(k))) {
        seen.add(it.w);
        hits.push(it);
        if (hits.length >= 4) break;
      }
    }
  }
  return hits;
}

async function enrichFetchJson(url, ms) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms || 7000);
  try {
    const r = await fetch(url, { signal: ctl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(timer); }
}

async function enrichCached(key, ttlMs, producer) {
  try {
    const hit = await getFromDB('translations', key);
    if (hit && hit.result && hit.result.ts && (Date.now() - hit.result.ts) < ttlMs) return hit.result.data;
  } catch (e) {}
  const data = await producer();
  if (data && !data.__empty && (!Array.isArray(data) || data.length)) {
    try { await putToDB('translations', { q: key, result: { ts: Date.now(), data } }); } catch (e) {}
  }
  return data;
}

const POS_NAMES = {
  noun: ['danh từ', 'noun', '名詞'], verb: ['động từ', 'verb', '動詞'], adjective: ['tính từ', 'adj.', '形容詞'],
  adverb: ['phó từ', 'adv.', '副詞'], pronoun: ['đại từ', 'pron.', '代名詞'], preposition: ['giới từ', 'prep.', '前置詞'],
  conjunction: ['liên từ', 'conj.', '接続詞'], interjection: ['thán từ', 'interj.', '感動詞'], particle: ['trợ từ', 'particle', '助詞']
};
function posName(p) {
  const e = POS_NAMES[String(p || '').toLowerCase()];
  return e ? tx(e[0], e[1], e[2]) : p;
}

// Google dictionary: alternative translations grouped by part of speech
async function enrichSynonyms(word, tl) {
  return enrichCached('enrich-bd:' + tl + ':' + word, 30 * 86400000, async () => {
    try {
      const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=' + tl + '&dt=t&dt=bd&q=' + encodeURIComponent(word);
      const data = await enrichFetchJson(url, 7000);
      const main = Array.isArray(data[0]) ? data[0].map(s => (s && s[0]) || '').join('') : '';
      const groups = Array.isArray(data[1]) ? data[1].map(g => ({ pos: g[0], words: (g[1] || []).slice(0, 7) })).filter(g => g.words.length) : [];
      return { main, groups };
    } catch (e) { return null; }
  });
}

function stripHtml(h) {
  try { return new DOMParser().parseFromString(String(h), 'text/html').body.textContent.trim(); } catch (e) { return String(h).replace(/<[^>]+>/g, ''); }
}

// Chiết tự & Phân tích cấu tạo từ (0ms offline, tức thì)
function getWordDecomposition(word, lang) {
  if (!word || word.length < 2 || word.length > 6) return null;
  if (!isChinese(word)) return null;
  const items = [];
  for (const ch of word) {
    const hv = getWordHanViet(ch);
    const kj = (typeof KANJI_DATA !== 'undefined' && KANJI_DATA[ch]) ? KANJI_DATA[ch] : null;
    const jaWord = (typeof JA_COMMON_DICT !== 'undefined' && JA_COMMON_DICT[ch]) ? JA_COMMON_DICT[ch] : null;
    const d = (typeof MINI_DICT !== 'undefined' && MINI_DICT[ch]) ? MINI_DICT[ch] : null;
    let meaning = '';
    if (lang === 'vi') {
      meaning = (d && d.vi) || '';
    } else if (lang === 'ja') {
      meaning = (kj && kj.ja_meaning) || jaWord || (d && d.ja) || '';
    } else {
      meaning = (d && d.en && d.en[0]) || '';
    }
    const py = getWordPinyin(ch);
    items.push({
      ch,
      hv,
      py,
      meaning,
      ja: (kj && (kj.on || kj.ja_meaning)) || jaWord || ''
    });
  }
  return items;
}

// Wiktionary definitions + example sentences, supporting idioms, set phrases, and new terms
async function enrichWiktionary(word) {
  return enrichCached('enrich-wik:' + word, 30 * 86400000, async () => {
    try {
      const data = await enrichFetchJson('https://en.wiktionary.org/api/rest_v1/page/definition/' + encodeURIComponent(word), 7000);
      const zh = data && (data.Chinese || data['Mandarin']);
      if (!zh) return { definitions: [], examples: [] };
      const out = [];
      const examples = [];
      for (const sec of zh) {
        for (const d of (sec.definitions || [])) {
          const txt = stripHtml(d.definition);
          if (txt && !/^\s*(alternative|variant|simplified|traditional)/i.test(txt)) {
            out.push({ pos: sec.partOfSpeech, text: txt.slice(0, 160) });
          }
          if (Array.isArray(d.examples)) {
            for (const ex of d.examples) {
              const exTxt = stripHtml(typeof ex === 'string' ? ex : (ex.text || ex.example || ''));
              if (exTxt && exTxt.length >= 4 && exTxt.includes(word)) {
                examples.push({ zh: exTxt, pos: sec.partOfSpeech });
              }
            }
          }
          if (out.length >= 5) break;
        }
        if (out.length >= 5) break;
      }
      return { definitions: out, examples };
    } catch (e) { return { definitions: [], examples: [] }; }
  });
}

// Real example sentences from:
// 1. MyMemory Translation Memory API (Phụ đề phim & Đối thoại đời thực có sẵn câu dịch)
// 2. Jukuu / Youdao Corpus qua Proxy (Kho câu đối thoại & văn học song ngữ)
// 3. Tatoeba Global Corpus (Kho câu người bản xứ toàn cầu)
// 4. Wiktionary Example Quotations (Trích dẫn ngữ cảnh từ điển)
async function fetchOnlineExamples(word) {
  if (!word || !word.trim()) return [];
  const lang = state.meaningLang || 'vi';
  const targetCode = { vi: 'vi', ja: 'ja', en: 'en' }[lang] || 'vi';

  const items = await enrichCached('enrich-online-ex3:' + lang + ':' + word, 14 * 86400000, async () => {
    const list = [];
    const seenZh = new Set();

    // 1. Ưu tiên số 1: MyMemory API (Kho phụ đề phim ảnh & đối thoại đời thực người dịch)
    try {
      const myMemUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=zh|${targetCode}`;
      const myMemData = await enrichFetchJson(myMemUrl, 6000);
      if (myMemData && Array.isArray(myMemData.matches)) {
        for (const m of myMemData.matches) {
          if (!m || !m.segment || !m.translation) continue;
          const seg = stripHtml(m.segment).trim();
          const trans = stripHtml(m.translation).trim();
          if (trans.includes('MYMEMORY WARNING')) continue;
          if (!/[\u4e00-\u9fff]/.test(seg)) continue;
          if (!seg.includes(word)) continue;
          if (seg.length < 4 || seg.length > 65) continue;
          if (seenZh.has(seg)) continue;

          seenZh.add(seg);
          const it = {
            zh: seg,
            source: '🎬 Phụ đề đời thực',
            isOnline: true
          };
          it[lang] = trans;
          list.push(it);
          if (list.length >= 3) break;
        }
      }
    } catch (eMem) {
      console.warn('MyMemory fetch note:', eMem);
    }

    // 2. Ưu tiên số 2: Jukuu / Youdao Corpus qua Proxy (Kho câu đối thoại & phim ảnh song ngữ)
    if (list.length < 3) {
      try {
        const jukuuUrl = `https://api.allorigins.win/raw?url=` + encodeURIComponent(`http://www.jukuu.com/search.php?q=${encodeURIComponent(word)}`);
        const ctl = new AbortController();
        const timer = setTimeout(() => ctl.abort(), 5500);
        let jukuuHtml = '';
        try {
          const r = await fetch(jukuuUrl, { signal: ctl.signal });
          if (r.ok) jukuuHtml = await r.text();
        } finally { clearTimeout(timer); }

        if (jukuuHtml) {
          const re = /<td class="e">([\s\S]*?)<\/td>[\s\S]*?<td class="c">([\s\S]*?)<\/td>/gi;
          let match;
          while ((match = re.exec(jukuuHtml)) !== null) {
            const enText = stripHtml(match[1]).trim();
            const zhText = stripHtml(match[2]).trim();
            if (zhText && zhText.includes(word) && zhText.length >= 4 && zhText.length <= 60 && !seenZh.has(zhText)) {
              seenZh.add(zhText);
              const it = {
                zh: zhText,
                en: enText,
                source: '📺 Jukuu / Phim ảnh',
                isOnline: true
              };
              list.push(it);
              if (list.length >= 4) break;
            }
          }
        }
      } catch (eJukuu) {
        console.warn('Jukuu fetch note:', eJukuu);
      }
    }

    // 3. Ưu tiên số 3: Tatoeba Global Corpus (Kho câu giao tiếp bản xứ)
    if (list.length < 3) {
      try {
        const url = 'https://tatoeba.org/en/api_v0/search?from=cmn&query=' + encodeURIComponent(word) + '&orphans=no&unapproved=no&sort=relevance';
        const data = await enrichFetchJson(url, 6500);
        if (data && Array.isArray(data.results)) {
          for (const r of data.results) {
            if (!r.text || r.text.length < 3 || r.text.length > 50) continue;
            if (seenZh.has(r.text)) continue;
            if (!r.text.includes(word)) continue;

            const flat = [].concat(...(r.translations || []));
            const it = { zh: r.text, source: '🌐 Tatoeba', isOnline: true };

            const trVie = flat.find(x => x && x.lang === 'vie');
            const trJpn = flat.find(x => x && x.lang === 'jpn');
            const trEng = flat.find(x => x && x.lang === 'eng');
            if (trVie) it.vi = trVie.text;
            if (trJpn) it.ja = trJpn.text;
            if (trEng) it.en = trEng.text;

            seenZh.add(r.text);
            list.push(it);
            if (list.length >= 4) break;
          }
        }
      } catch (eTat) {}
    }

    // 4. Ưu tiên số 4: Wiktionary Examples (Trích dẫn ngữ cảnh từ điển)
    if (list.length < 3) {
      try {
        const wikData = await enrichWiktionary(word);
        const wikEx = Array.isArray(wikData) ? [] : (wikData && wikData.examples ? wikData.examples : []);
        for (const ex of wikEx) {
          if (ex && ex.zh && !seenZh.has(ex.zh)) {
            seenZh.add(ex.zh);
            list.push({ zh: ex.zh, source: '📖 Wiktionary', isOnline: true });
            if (list.length >= 4) break;
          }
        }
      } catch (eWik) {}
    }

    // BỎ HOÀN TOÀN CÁC CÂU MẪU CÔNG THỨC CỨNG NHẮC!
    // Tuyệt đối không dùng câu mẫu "Bạn có biết từ này nghĩa là gì không?".

    // Tự động dịch sang ngôn ngữ người học nếu câu chưa có bản dịch
    for (const it of list) {
      if (!it[lang]) {
        try {
          const trans = await translateTextOnline(it.zh, lang);
          if (trans) it[lang] = trans;
        } catch (eTr) {}
      }
    }

    return list;
  });

  return Array.isArray(items) ? items.map(x => Object.assign({}, x)) : [];
}

async function fetchTatoebaExamples(word) {
  return fetchOnlineExamples(word);
}

// ===== Concept-based illustration =====
// Searches by the word's MEANING (an English concept), never by the written glyph,
// so "猫" shows cats (not a picture of the character), "游泳" shows swimming, etc.
const MEDIA_SKIP_TYPES = new Set(['pron', 'num', 'mw', 'adv', 'conj', 'prep', 'part', 'interj', 'phrase', 'expression', 'slang', 'proverb', 'idiom', 'adj']);
const MEDIA_COLOR_ADJ = new Set(['白', '黑', '红', '黄', '绿', '蓝', '紫', '灰', '橙', '粉']);
const MEDIA_GENERIC = new Set(['thing', 'things', 'time', 'matter', 'affair', 'place', 'moment', 'way', 'method', 'people', 'area', 'part', 'case',
  'situation', 'fact', 'idea', 'plan', 'example', 'problem', 'question', 'reason', 'result', 'kind', 'type', 'point', 'number', 'side',
  'be', 'have', 'can', 'will', 'may', 'must', 'should', 'do', 'make', 'let', 'get', 'give', 'take', 'go', 'come', 'put', 'say', 'tell',
  'ask', 'know', 'think', 'want', 'need', 'like', 'use', 'become', 'allow', 'dare', 'accord', 'regard', 'include', 'exist', 'show',
  'going', 'coming', 'having', 'making', 'doing', 'getting', 'giving', 'taking', 'saying', 'telling', 'asking', 'knowing', 'thinking',
  'wanting', 'needing', 'liking', 'using']);
// Files that are about the writing system itself (stroke order, calligraphy, glyph tables...) are never wanted.
const MEDIA_BAD_RE = /\b(stroke|strokes|calligraph\w*|seal script|oracle bone|bronze script|clerical|kaishu|xingshu|caoshu|glyph|glyphs|hanzi|kanji|characters?|radical|handwrit\w*|typeface|font|alphabet|unicode|pinyin|romani[sz]ation|logo|icon|locator|svg|animation|wiktionary|ideograms?|cjk|bw|jbw)\b/i;
const MEDIA_CJK_RE = /[\u3400-\u9fff\uf900-\ufaff]/;

function mediaCleanTerm(s) {
  s = String(s || '').toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/^\s*(to|the|a|an)\s+/, '')
    .replace(/[^a-z\s'-]/g, ' ')
    .replace(/\s+/g, ' ').trim();
  if (!s || s.length < 3 || s.split(' ').length > 3) return '';
  if (/particle|measure|classifier|aspect|modal|surname|abbr|suffix|prefix|used in|variant|auxiliary/.test(s)) return '';
  return s;
}

function mediaGerund(w) {
  if (/ing$/.test(w)) return w;
  if (/ie$/.test(w)) return w.slice(0, -2) + 'ying';
  if (/[^e]e$/.test(w)) return w.slice(0, -1) + 'ing';
  if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(w) && w.length <= 4) return w + w.slice(-1) + 'ing';
  return w + 'ing';
}

function mediaFromGloss(gloss, forceVerb) {
  const verb = !!forceVerb || /^\s*to\s/i.test(String(gloss || ''));
  let s = mediaCleanTerm(gloss);
  if (!s || MEDIA_GENERIC.has(s)) return '';
  if (verb) {
    if (s.split(' ').length > 1) return '';
    s = mediaGerund(s);              // "eat" -> "eating": Wikipedia/Commons describe actions by their -ing form
    if (MEDIA_GENERIC.has(s)) return '';
  }
  return s;
}

// Returns an English concept to illustrate, or '' when the word is not something a picture can explain
async function mediaConceptTerm(word) {
  try {
    const custom = (JSON.parse(localStorage.getItem('cr_media_terms') || '{}')[word] || '').trim();
    if (custom) return custom;
  } catch (e) {}
  const d = MINI_DICT[word];
  let verbEntry = false;
  if (d) {
    const ty = d.type || '';
    if (MEDIA_SKIP_TYPES.has(ty) && !(ty === 'adj' && MEDIA_COLOR_ADJ.has(word))) return '';
    verbEntry = (ty === 'verb' || ty === 'v');
    for (const g of (d.en || [])) {
      const c = mediaFromGloss(g, verbEntry);
      if (c) return c;
    }
  } else {
    if (word.length > 6 || slangLookup(word).length) return '';
  }
  let en = '';
  try { en = await translateTextOnline(word, 'en'); } catch (e) {}
  return mediaFromGloss(en, verbEntry);
}

// Wikipedia summary: a short description + lead picture, in the learner's meaning language when available
async function mediaWikiSummary(term, lang) {
  const sumUrl = (host, title) => 'https://' + host + '.wikipedia.org/api/rest_v1/page/summary/' +
    encodeURIComponent(String(title).replace(/ /g, '_')) + '?redirect=true';
  const pack = (d, l) => ({
    title: d.title,
    extract: String(d.extract || '').slice(0, 260),
    thumb: (d.thumbnail && d.thumbnail.source) || '',
    page: (d.content_urls && d.content_urls.desktop && d.content_urls.desktop.page) || '',
    lang: l
  });
  try {
    const en = await enrichFetchJson(sumUrl('en', term), 6000);
    if (!en || en.type !== 'standard' || !en.extract) return null;
    if (/may (also )?refer to/i.test(en.extract)) return null;
    let out = pack(en, 'en');
    if (lang && lang !== 'en') {
      try {
        const ll = await enrichFetchJson('https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=langlinks&lllang=' +
          lang + '&titles=' + encodeURIComponent(en.title), 6000);
        const pg = ll && ll.query && ll.query.pages ? Object.values(ll.query.pages)[0] : null;
        const link = pg && pg.langlinks && pg.langlinks[0];
        const t2 = link && (link['*'] || link.title);
        if (t2) {
          const loc = await enrichFetchJson(sumUrl(lang, t2), 6000);
          if (loc && loc.type === 'standard' && loc.extract) {
            const p2 = pack(loc, lang);
            if (!p2.thumb) p2.thumb = out.thumb;
            out = p2;
          }
        }
      } catch (e) {}
    }
    return (out.thumb || out.extract) ? out : null;
  } catch (e) { return null; }
}

// Wikimedia Commons photos / videos, filtered hard for relevance to the concept
async function mediaCommons(term, kind) {
  const isVideo = kind === 'video';
  const filter = isVideo ? 'filetype:video' : 'filetype:bitmap';
  const want = isVideo ? 1 : 4;
  const toks = term.split(' ').filter(w => w.length > 1);
  const has = (txt, w) => txt.includes(w) || (w.length > 3 && w.endsWith('s') && txt.includes(w.slice(0, -1)));
  const queries = ['intitle:"' + term + '" ' + filter, '"' + term + '" ' + filter];
  const seen = new Set();
  const out = [];
  for (const sq of queries) {
    let pages = [];
    try {
      const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=' +
        (isVideo ? 10 : 24) + '&gsrsearch=' + encodeURIComponent(sq) +
        '&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiextmetadatafilter=ImageDescription|Categories&iiurlwidth=480';
      const data = await enrichFetchJson(url, 8000);
      pages = data && data.query && data.query.pages ? Object.values(data.query.pages) : [];
    } catch (e) { continue; }
    pages.sort((a, b) => (a.index || 0) - (b.index || 0));
    for (const p of pages) {
      if (seen.has(p.pageid)) continue;
      seen.add(p.pageid);
      const ii = p.imageinfo && p.imageinfo[0];
      if (!ii) continue;
      const mime = ii.mime || '';
      if (isVideo ? !/^(video\/|application\/ogg)/.test(mime) : !/^image\/(jpeg|png|webp)$/.test(mime)) continue;
      if (!isVideo && ((ii.width || 0) < 320 || (ii.height || 0) < 200)) continue;
      const title = String(p.title || '').replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, '').replace(/_/g, ' ');
      const em = ii.extmetadata || {};
      const desc = stripHtml((em.ImageDescription && em.ImageDescription.value) || '').slice(0, 300);
      const cats = String((em.Categories && em.Categories.value) || '').replace(/\|/g, ' ');
      if (MEDIA_CJK_RE.test(title) || MEDIA_BAD_RE.test(title + ' ' + cats)) continue;
      const lt = title.toLowerCase(), ld = desc.toLowerCase(), lc = cats.toLowerCase();
      const all = lt + ' ' + ld + ' ' + lc;
      if (!toks.every(w => has(all, w))) continue;
      const inTitle = toks.every(w => has(lt, w));
      const inCats = toks.some(w => has(lc, w));
      if (!inTitle && !inCats) continue;
      const score = (inTitle ? 5 : 0) + (inCats ? 2 : 0) + (toks.every(w => has(ld, w)) ? 1 : 0) - out.length * 0.01;
      out.push({
        title,
        caption: (desc || title).slice(0, 110),
        thumb: ii.thumburl || ii.url,
        url: ii.url,
        page: ii.descriptionurl,
        score
      });
    }
    if (out.length >= want) break;
  }
  out.sort((a, b) => b.score - a.score);
  return out.slice(0, want);
}

async function enrichMedia(word) {
  const lang = state.meaningLang || 'vi';
  const term = await mediaConceptTerm(word);
  if (!term) return null;
  const data = await enrichCached('enrich-media3:' + lang + ':' + term, 14 * 86400000, async () => {
    const [wiki, imgs, vids] = await Promise.all([
      mediaWikiSummary(term, lang).catch(() => null),
      mediaCommons(term, 'image').catch(() => []),
      mediaCommons(term, 'video').catch(() => [])
    ]);
    const out = { wiki, imgs, vids };
    if (!wiki && !imgs.length && !vids.length) out.__empty = true;   // do not cache misses
    return out;
  });
  return data ? Object.assign({ wiki: null, imgs: [], vids: [] }, data, { term }) : null;
}

function mediaIsOff() {
  const v = localStorage.getItem('cr_media_off');
  if (v === '1') return true;
  if (v === '0') return false;
  return !!(navigator.connection && navigator.connection.saveData);   // respect "Data Saver" by default
}

function mediaToggle() {
  localStorage.setItem('cr_media_off', mediaIsOff() ? '0' : '1');
  if (state.activeWord) enrichWordSheet(state.activeWord);
}



function enrichSaveMeanings(word, lang, words) {
  const ud = getUserDict();
  ud[lang + ':' + word] = words;
  setUserDict(ud);
  openWordSheet(word);
  showToast(tx('Đã lưu làm nghĩa của từ', 'Saved as the word’s meaning', '意味として保存しました'));
}

async function enrichWordSheet(word) {
  const box = document.getElementById('sheet-enrich');
  if (!box) return;
  const lang = state.meaningLang || 'vi';
  const enc = encodeURIComponent(word);
  const mediaOff = mediaIsOff();
  const sectionTitle = (s) => `<div class="def-label" style="margin:14px 0 6px;">${s}</div>`;

  // --- sync parts: decomposition + slang + shell
  let html = '';

  // 1. Chiết tự & Phân tích cấu tạo từng chữ Hán (chạy ngay 0ms)
  const decomp = getWordDecomposition(word, lang);
  if (decomp && decomp.length >= 2) {
    html += sectionTitle('🧩 ' + (t('wordDecomp') || tx('Chiết tự & Cấu tạo từ', 'Word Breakdown & Morphemes', '構成漢字と語源')));
    html += `<div class="word-decomp-card"><div class="decomp-items">` +
      decomp.map((p, idx) => {
        let sub = '';
        if (lang === 'vi' && p.hv) sub = p.hv;
        else if (lang === 'ja' && p.ja) sub = p.ja;
        else if (p.meaning) sub = p.meaning;
        return `<span class="decomp-chip"><b>${escapeHtml(p.ch)}</b>` +
          (p.py && p.py !== p.ch ? ` <span class="decomp-py">${escapeHtml(p.py)}</span>` : '') +
          (sub ? ` <span class="decomp-hv">(${escapeHtml(sub)})</span>` : '') +
          `</span>` + (idx < decomp.length - 1 ? `<span class="decomp-sep">+</span>` : '');
      }).join('') +
      `</div></div>`;
  }

  // 2. Slang / Từ lóng với ngữ cảnh cụ thể
  const slang = slangLookup(word);
  if (slang.length) {
    html += sectionTitle('🔥 ' + tx('Từ lóng / ngôn ngữ mạng', 'Slang / internet language', 'ネットスラング'));
    html += slang.map(s => {
      const m = s[lang] || s.vi || s.en || s.ja || '';
      const m2 = (lang !== 'en' && s.en) ? `<div style="font-size:12px;color:var(--text-muted);">EN: ${escapeHtml(s.en)}</div>` : '';
      return `<div class="slang-card"><b lang="zh-CN">${escapeHtml(s.w)}</b> <span style="color:var(--text-muted);font-size:12px;">${escapeHtml(s.py || '')}</span><div>${escapeHtml(m)}</div>${m2}${s.n ? `<div class="slang-nuance-box">💡 <b>${tx('Ngữ cảnh & Lưu ý', 'Usage & Context', '使い方とニュアンス')}:</b> ${escapeHtml(s.n)}</div>` : ''}</div>`;
    }).join('');
  }
  html += `<div id="enrich-syn"></div><div id="enrich-wik"></div><div id="enrich-media"></div>`;
  html += `<div class="enrich-footer">
    <a href="https://search.bilibili.com/all?keyword=${enc}%20%E6%84%8F%E6%80%9D%20%E7%94%A8%E6%B3%95" target="_blank" rel="noopener noreferrer">▶ Bilibili</a>
    <a href="https://www.youtube.com/results?search_query=${enc}%20%E6%B1%89%E8%AF%AD%20%E6%84%8F%E6%80%9D%20%E7%94%A8%E6%B3%95" target="_blank" rel="noopener noreferrer">▶ YouTube</a>
    <a href="https://www.xiaohongshu.com/search_result?keyword=${enc}" target="_blank" rel="noopener noreferrer">📕 小红书</a>
    <a href="https://www.zhihu.com/search?q=${enc}" target="_blank" rel="noopener noreferrer">知乎</a>
  </div>
  <div class="enrich-footer" style="opacity:.8;">
    <a href="javascript:void(0)" onclick="mediaToggle()">${mediaOff ? tx('Bật ảnh/video', 'Show media', 'メディアを表示') : tx('Tắt ảnh/video', 'Hide media', 'メディアを隠す')}</a>
  </div>`;
  box.innerHTML = html;

  const still = () => state.activeWord === word;

  // --- synonyms / alternative meanings
  enrichSynonyms(word, lang === 'ja' ? 'ja' : lang).then(async res => {
    if (!still()) return;
    let usedLang = lang;
    if ((!res || !res.groups.length) && lang !== 'en') { res = await enrichSynonyms(word, 'en'); usedLang = 'en'; }
    if (!still() || !res || !res.groups.length) return;
    const el = document.getElementById('enrich-syn'); if (!el) return;
    const flat = [];
    res.groups.forEach(g => g.words.forEach(w => { if (!flat.includes(w)) flat.push(w); }));
    el.innerHTML = sectionTitle('🔎 ' + tx('Nghĩa mở rộng', 'More meanings', '関連する意味') + ` (${getLangName(usedLang)})`) +
      res.groups.map(g => `<div class="syn-row"><span class="syn-pos">${escapeHtml(posName(g.pos))}</span>${g.words.map(w => `<span class="syn-chip">${escapeHtml(w)}</span>`).join('')}</div>`).join('') +
      `<button class="btn btn-outline btn-sm" style="font-size:12px;padding:4px 10px;margin-top:6px;" id="btn-save-syn">💾 ${tx('Lưu các nghĩa này', 'Save these meanings', 'これらの意味を保存')}</button>`;
    const b = document.getElementById('btn-save-syn');
    if (b) b.onclick = () => enrichSaveMeanings(word, usedLang, flat.slice(0, 6).join(', '));
    state._enrichMainEn = state._enrichMainEn || {};
  }).catch(() => {});

  // --- Wiktionary & Detailed Explanations translated into user's language
  enrichWiktionary(word).then(async res => {
    if (!still() || !res) return;
    const defs = Array.isArray(res) ? res : (res.definitions || []);
    if (!defs.length) return;
    const el = document.getElementById('enrich-wik');
    if (!el) return;

    const targetLang = lang;
    const rendered = [];
    for (let i = 0; i < defs.length; i++) {
      const d = defs[i];
      let defText = d.text;
      if (targetLang !== 'en') {
        try {
          const cached = await enrichCached('enrich-def-trans:' + targetLang + ':' + d.text, 30 * 86400000, async () => {
            return await translateTextOnline(d.text, targetLang);
          });
          if (cached) defText = cached;
        } catch (e) {}
      }
      rendered.push({ pos: d.pos, text: defText });
    }

    if (!still()) return;
    const title = t('detailedDef') || tx('Giải thích chi tiết (Từ điển)', 'Detailed Definitions (Dictionary)', '詳細な解説（辞書）');
    el.innerHTML = sectionTitle('📖 ' + title) +
      `<div class="wik-card">` +
      rendered.map((d, idx) => `
        <div class="wik-item">
          ${d.pos ? `<span class="syn-pos">${escapeHtml(posName(d.pos))}</span>` : ''}
          <span class="wik-num">${idx + 1}.</span>
          <span class="wik-desc">${escapeHtml(d.text)}</span>
        </div>
      `).join('') +
      `</div>`;
  }).catch(() => {});

  // --- Media: illustrates the MEANING (concept), never the written glyph
  if (!mediaOff) {
    (async () => {
      const m = await enrichMedia(word);
      if (!still() || !m || m.__empty) return;
      const wiki = m.wiki;
      const imgs = (m.imgs || []).filter(i => !(wiki && wiki.thumb && i.thumb === wiki.thumb));
      const vids = m.vids || [];
      if (!wiki && !imgs.length && !vids.length) return;
      const el = document.getElementById('enrich-media');
      if (!el) return;

      let h = sectionTitle('🖼 ' + tx('Minh họa ý nghĩa', 'Illustration of the meaning', '意味の図解') +
        ` <span class="badge" style="text-transform:none;">${escapeHtml(m.term)}</span>`);

      if (wiki) {
        const tag = 'Wikipedia · ' + String(wiki.lang || 'en').toUpperCase();
        h += `<div class="concept-card">` +
          (wiki.thumb ? `<img class="concept-thumb" loading="lazy" decoding="async" src="${escapeHtml(wiki.thumb)}" alt="${escapeHtml(wiki.title)}" onerror="this.style.display='none'">` : '') +
          `<div class="concept-body"><div class="concept-title">${escapeHtml(wiki.title)} <span class="badge">${escapeHtml(tag)}</span></div>` +
          `<div class="concept-text">${escapeHtml(wiki.extract)}</div>` +
          (wiki.page ? `<a class="concept-link" href="${escapeHtml(wiki.page)}" target="_blank" rel="noopener noreferrer">${tx('Đọc thêm', 'Read more', '続きを読む')} →</a>` : '') +
          `</div></div>`;
      }

      if (imgs.length) {
        h += `<div class="media-grid" style="margin-top:8px;">` + imgs.map(i =>
          `<a class="media-fig" href="${escapeHtml(i.page)}" target="_blank" rel="noopener noreferrer">` +
          `<img loading="lazy" decoding="async" src="${escapeHtml(i.thumb)}" alt="${escapeHtml(i.title)}" onerror="this.closest('a').style.display='none'">` +
          `<span class="media-cap">${escapeHtml(i.caption)}</span></a>`).join('') + `</div>`;
      }

      vids.forEach(v => {
        h += `<video class="media-video" controls preload="none" playsinline poster="${escapeHtml(v.thumb || '')}" src="${escapeHtml(v.url)}"></video>` +
          `<div class="media-cap" style="margin-top:3px;">${escapeHtml(v.caption)} · <a href="${escapeHtml(v.page)}" target="_blank" rel="noopener noreferrer" style="color:var(--accent);">Wikimedia</a></div>`;
      });

      h += `<div style="font-size:11px;color:var(--text-muted);margin-top:6px;line-height:1.4;">` +
        tx(`Ảnh minh họa theo nghĩa “${escapeHtml(m.term)}”.`,
           `Pictures are found by the meaning “${escapeHtml(m.term)}”.`,
           `画像は意味「${escapeHtml(m.term)}」で検索しています。`) + `</div>`;
      el.innerHTML = h;
    })().catch(() => {});
  }
}
