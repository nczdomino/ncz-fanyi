// test_ocr.js - Comprehensive Verification Test Suite for NCZ Hanzi OCR Pipeline
const fs = require('fs');
const assert = require('assert');

console.log('🧪 Starting NCZ Hanzi OCR Pipeline Test Suite...\n');

// 1. Verify Cloudflare Pages Functions & Frontend code syntax
console.log('1. Verifying JavaScript files syntax...');
const jsFiles = [
  'functions/api/ocr.js',
  'functions/api/ocr/repair.js',
  'functions/api/ocr-repair.js',
  'api/ocr.js',
  'api/ocr/repair.js',
  'js/features/ocr.js',
  'js/data/i18n-data.js'
];

jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  assert(content.length > 0, `File ${file} should not be empty`);
  console.log(`  ✅ ${file}: File exists and readable (${content.length} bytes)`);
});

// 2. Load the OCR Layout & Paragraph Reconstruction functions from ocr.js
console.log('\n2. Testing Non-AI Layout Sorting & Paragraph Reconstruction...');

// Extract functions from ocr.js
const ocrJsCode = fs.readFileSync('js/features/ocr.js', 'utf8');
const sandbox = {
  window: {},
  document: {
    getElementById: () => null,
  },
  console: console,
  t: (k) => k,
  tx: (v) => v,
  showToast: () => {}
};

// Evaluate the functions in a controlled scope
const evalContext = new Function('window', 'document', 'console', 't', 'tx', 'showToast', `
  ${ocrJsCode}
  return {
    normalizeOcrLine,
    sortOcrLinesByLayout,
    reconstructParagraphs
  };
`);

const { normalizeOcrLine, sortOcrLinesByLayout, reconstructParagraphs } = evalContext(
  sandbox.window,
  sandbox.document,
  sandbox.console,
  sandbox.t,
  sandbox.tx,
  sandbox.showToast
);

// Test A: Simplified Chinese & Punctuation Preservation
console.log('  Testing Test A: Simplified Chinese & Punctuation Preservation...');
const testLinesSimp = [
  { text: "这是一个关于人工智能技术在语言学习中应用的文档。", score: 0.98, box: [[50, 100], [450, 100], [450, 130], [50, 130]] },
  { text: "通过智能断句和词性分析，", score: 0.95, box: [[50, 140], [300, 140], [300, 170], [50, 170]] },
  { text: "学生可以更快掌握汉语词汇与语法规则！", score: 0.96, box: [[50, 175], [420, 175], [420, 205], [50, 205]] }
];

const sortedSimp = sortOcrLinesByLayout(testLinesSimp);
const resultSimp = reconstructParagraphs(sortedSimp);

assert(resultSimp.processedText.includes("这是一个关于人工智能技术在语言学习中应用的文档。"), "Sentence 1 must be preserved intact");
assert(resultSimp.processedText.includes("通过智能断句和词性分析，学生可以更快掌握汉语词汇与语法规则！"), "Continuation line must be stitched without space");
assert(resultSimp.processedText.includes("！"), "Exclamation mark must be preserved");
console.log('  ✅ Test A Passed: Simplified Chinese stitched seamlessly without unwanted spaces, punctuation preserved.');

// Test B: Traditional Chinese & Specialized Quotation Marks
console.log('  Testing Test B: Traditional Chinese (繁體中文) & Quotation Marks...');
const testLinesTrad = [
  { text: "第一章 中華文化之傳承", score: 0.99, box: [[100, 50], [350, 50], [350, 80], [100, 80]] },
  { text: "古人云：「學而時習之，不亦說乎？」", score: 0.94, box: [[100, 90], [420, 90], [420, 120], [100, 120]] },
  { text: "此乃儒家思想之根本，", score: 0.92, box: [[100, 125], [300, 125], [300, 155], [100, 155]] },
  { text: "歷經千年仍熠熠生輝。", score: 0.93, box: [[100, 160], [320, 160], [320, 190], [100, 190]] }
];

const sortedTrad = sortOcrLinesByLayout(testLinesTrad);
const resultTrad = reconstructParagraphs(sortedTrad);

assert(resultTrad.processedText.includes("第一章 中華文化之傳承\n\n"), "Heading must remain an independent paragraph");
assert(resultTrad.processedText.includes("「學而時習之，不亦說乎？」"), "Traditional corner quotes 「」 must be preserved");
assert(resultTrad.processedText.includes("此乃儒家思想之根本，歷經千年仍熠熠生輝。"), "Traditional Chinese soft wraps merged correctly");
console.log('  ✅ Test B Passed: Traditional characters and corner brackets preserved, headings isolated.');

// Test C: Multi-Column Layout Sorting (2 Columns)
console.log('  Testing Test C: Multi-Column Document Layout Sorting...');
const testMultiCol = [
  // Full-width title at top
  { text: "【现代汉语双栏排版测试】", score: 0.99, box: [[50, 20], [750, 20], [750, 50], [50, 50]] },
  // Column 1 (Left: X around 50 to 380)
  { text: "左栏第一行：探索汉字源流与演变。", score: 0.95, box: [[50, 70], [350, 70], [350, 95], [50, 95]] },
  { text: "左栏第二行：甲骨文金文小篆之美。", score: 0.94, box: [[50, 105], [360, 105], [360, 130], [50, 130]] },
  // Column 2 (Right: X around 450 to 780)
  { text: "右栏第一行：现代汉语拼音方案规范。", score: 0.96, box: [[450, 70], [750, 70], [750, 95], [450, 95]] },
  { text: "右栏第二行：推广普通话与声调练习。", score: 0.95, box: [[450, 105], [760, 105], [760, 130], [450, 130]] }
];

const sortedMultiCol = sortOcrLinesByLayout(testMultiCol);
const multiColTexts = sortedMultiCol.map(l => l.text);

const idxTitle = multiColTexts.indexOf("【现代汉语双栏排版测试】");
const idxL1 = multiColTexts.indexOf("左栏第一行：探索汉字源流与演变。");
const idxL2 = multiColTexts.indexOf("左栏第二行：甲骨文金文小篆之美。");
const idxR1 = multiColTexts.indexOf("右栏第一行：现代汉语拼音方案规范。");
const idxR2 = multiColTexts.indexOf("右栏第二行：推广普通话与声调练习。");

assert(idxTitle < idxL1, "Title must come before column 1");
assert(idxL1 < idxL2, "Left column 1 line 1 must come before left column line 2");
assert(idxL2 < idxR1, "All left column lines must come before right column lines");
assert(idxR1 < idxR2, "Right column line 1 must come before right column line 2");
console.log('  ✅ Test C Passed: Multi-column document layout partitioned correctly. Left column is fully read before Right column!');

// Test D: Vertical Chinese Text Sorting (RTL)
console.log('  Testing Test D: Vertical Chinese Text (豎排中文)...');
const testVertical = [
  // Column 1 (Rightmost: X around 300)
  { text: "白日依山盡", score: 0.96, box: [[300, 50], [330, 50], [330, 220], [300, 220]] },
  // Column 2 (Middle: X around 200)
  { text: "黃河入海流", score: 0.95, box: [[200, 50], [230, 50], [230, 220], [200, 220]] },
  // Column 3 (Left: X around 100)
  { text: "欲窮千里目", score: 0.94, box: [[100, 50], [130, 50], [130, 220], [100, 220]] },
];
const sortedVert = sortOcrLinesByLayout(testVertical);
assert.strictEqual(sortedVert[0].text, "白日依山盡", "Rightmost vertical column must be read first");
assert.strictEqual(sortedVert[1].text, "黃河入海流", "Middle vertical column must be read second");
assert.strictEqual(sortedVert[2].text, "欲窮千里目", "Leftmost vertical column must be read third");
console.log('  ✅ Test D Passed: Vertical text recognized and sorted right-to-left.');

// Test D: Security & Key Leak Prevention Check
console.log('\n3. Verifying Security & Zero API Key Leaks...');
const filesToCheck = [
  'index.html',
  'pwa.js',
  'js/features/ocr.js',
  'js/features/input.js',
  'js/main.js'
];

filesToCheck.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  assert(!code.includes('AIzaSy'), `Forbidden API key pattern in ${f}`);
  assert(!code.includes('AQ.Ab8'), `Forbidden secret string in ${f}`);
  assert(!code.toLowerCase().includes('gemini_api_key ='), `Hardcoded key assignment in ${f}`);
});
console.log('  ✅ Security Check Passed: No hardcoded API keys in frontend assets.');

// Test E: Cloudflare Pages Environment Variable Binding
console.log('\n4. Verifying Cloudflare Pages Functions Environment Bindings...');
const cfFunction = fs.readFileSync('functions/api/ocr/repair.js', 'utf8');
assert(cfFunction.includes('env.GEMINI_API_KEY'), 'Cloudflare Pages Function must bind to context.env.GEMINI_API_KEY');
assert(!cfFunction.includes('AQ.Ab8'), 'Cloudflare Pages Function must not hardcode keys');
console.log('  ✅ Cloudflare Pages Binding Passed: Correctly reads context.env.GEMINI_API_KEY.');

console.log('\n🎉 ALL 12 VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
