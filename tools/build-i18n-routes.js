#!/usr/bin/env node
/**
 * tools/build-i18n-routes.js
 * 
 * Generates static multilingual directory routes (/vi/, /en/, /ja/) from index.html
 * for optimal International Technical SEO on Cloudflare Pages.
 * 
 * Each route contains:
 *   - Native <html lang="..."> tag
 *   - Localized <title>, <meta description>, <meta keywords>
 *   - Dedicated canonical URL (e.g. https://halouzhongwen.com/vi/)
 *   - Strict bi-directional hreflang alternates (x-default, vi, en, ja)
 *   - Localized OpenGraph and Twitter Cards
 *   - Pre-hydration script to set cr_uiLang immediately
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceHtmlPath = path.join(rootDir, 'index.html');
const baseHtml = fs.readFileSync(sourceHtmlPath, 'utf8');

const LOCALES = {
  vi: {
    lang: 'vi',
    title: 'Halou: Từ Điển & Dịch Tiếng Trung – Tra từ, gắn Pinyin & dịch ngữ cảnh',
    description: 'Ứng dụng tra cứu từ điển tiếng Trung thông minh, dịch thuật chuẩn ngữ cảnh và tự động gắn Pinyin chính xác cho mọi văn bản.',
    keywords: 'Halou, từ điển tiếng Trung, tra từ tiếng Trung, dịch tiếng Trung chuẩn ngữ cảnh, gắn pinyin, hán tự, học tiếng Trung, HSK',
    ogTitle: 'Halou: Từ Điển & Dịch Tiếng Trung',
    canonical: 'https://halouzhongwen.com/vi/'
  },
  en: {
    lang: 'en',
    title: 'Halou – Chinese Dictionary & Smart Translator with Pinyin',
    description: 'The ultimate Chinese smart dictionary and context-aware translator with instant Pinyin annotation for learners and readers.',
    keywords: 'Halou, Chinese dictionary, Pinyin translator, Chinese reader, HSK dictionary, learn Chinese, context translation',
    ogTitle: 'Halou – Chinese Dictionary & Smart Translator with Pinyin',
    canonical: 'https://halouzhongwen.com/en/'
  },
  ja: {
    lang: 'ja',
    title: 'Halou – ピンイン付きスマート中国語辞書＆AI翻訳',
    description: '漢字の読み方（ピンイン）自動付与と、ニュアンスまで汲み取る文脈AI翻訳を搭載した新しい中国語辞書アプリ。',
    keywords: 'Halou, 中国語辞書, ピンイン翻訳, 中国語ルビ振り, 中日辞書, HSK辞書, 中国語学習, 文脈翻訳',
    ogTitle: 'Halou – ピンイン付きスマート中国語辞書＆AI翻訳',
    canonical: 'https://halouzhongwen.com/ja/'
  }
};

const HREFLANG_BLOCK = `  <!-- SEO Canonical & Multilingual Alternate Hreflang -->
  <link rel="alternate" hreflang="x-default" href="https://halouzhongwen.com/">
  <link rel="alternate" hreflang="vi" href="https://halouzhongwen.com/vi/">
  <link rel="alternate" hreflang="en" href="https://halouzhongwen.com/en/">
  <link rel="alternate" hreflang="ja" href="https://halouzhongwen.com/ja/">`;

for (const [code, meta] of Object.entries(LOCALES)) {
  const destDir = path.join(rootDir, code);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let html = baseHtml;

  // 1. Update <html lang="...">
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${meta.lang}"`);

  // 2. Pre-hydration script: set initial language before DOM render
  const preHydrateScript = `<script>
    (function() {
      try {
        localStorage.setItem("cr_uiLang", "${code}");
        document.documentElement.lang = "${code}";
        const dark = localStorage.getItem("cr_darkMode") || "system";
        const isDark = dark === "dark" || (dark === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      } catch(e) {}
    })();
  </script>`;
  html = html.replace(/<script>\s*\(function\(\)\s*\{\s*try\s*\{\s*const saved = localStorage\.getItem\("cr_uiLang"\);[\s\S]*?<\/script>/, preHydrateScript);

  // 3. Update Title, Meta Description, Meta Keywords
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/<meta name="title" content="[^"]*">/, `<meta name="title" content="${meta.title}">`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${meta.description}">`);
  html = html.replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${meta.keywords}">`);

  // 4. Update Canonical URL
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${meta.canonical}">`);

  // 5. Update OpenGraph & Twitter tags
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${meta.canonical}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${meta.ogTitle}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${meta.description}">`);
  html = html.replace(/<meta name="twitter:url" content="[^"]*">/, `<meta name="twitter:url" content="${meta.canonical}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${meta.ogTitle}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${meta.description}">`);

  // 6. Update JSON-LD structured data description
  html = html.replace(/"description": "[^"]*",\s*"author"/, `"description": "${meta.description.replace(/"/g, '\\"')}",\n    "author"`);
  html = html.replace(/"url": "[^"]*",\s*"applicationCategory"/, `"url": "${meta.canonical}",\n    "applicationCategory"`);

  const destFile = path.join(destDir, 'index.html');
  fs.writeFileSync(destFile, html, 'utf8');
  console.log(`  ✅ Generated route /${code}/ -> ${destFile}`);
}

console.log('🎉 International i18n static routes generated successfully.');

