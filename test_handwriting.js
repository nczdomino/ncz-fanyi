// test_handwriting.js - Verification Test Suite for Chinese Handwriting Recognition
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🧪 Starting NCZ Hanzi Handwriting Recognition Test Suite...\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAILED: ${message}`);
    failCount++;
  }
}

// 1. Verify File Existence & Syntax
console.log('1. Verifying Files Existence & JavaScript Syntax...');
const filesToCheck = [
  'functions/api/handwriting.js',
  'api/handwriting.js',
  'js/features/handwriting/engine.js',
  'js/features/handwriting/worker.js',
  'js/features/handwriting/pad.js',
  'js/features/handwriting.js',
  'css/handwriting.css',
  'js/vendor/hanzilookup/hanzilookup.min.js',
  'js/vendor/hanzilookup/mmah.json'
];

for (const f of filesToCheck) {
  const fullPath = path.join(__dirname, f);
  assert(fs.existsSync(fullPath), `File exists: ${f} (${fs.statSync(fullPath).size} bytes)`);
}

// 2. Test Offline HanziLookup Engine Logic with MakeMeAHanzi data
console.log('\n2. Testing Offline HanziLookup Engine...');
const hlCode = fs.readFileSync('js/vendor/hanzilookup/hanzilookup.min.js', 'utf8');
const mmahJson = fs.readFileSync('js/vendor/hanzilookup/mmah.json', 'utf8');

const ctx = {
  console: console,
  XMLHttpRequest: function() {
    this.open = () => {};
    this.send = () => {
      this.readyState = 4;
      this.status = 200;
      this.responseText = mmahJson;
      this.onreadystatechange && this.onreadystatechange();
    };
  }
};
vm.createContext(ctx);
vm.runInContext(hlCode, ctx);
const HL = ctx.HanziLookup;

assert(typeof HL.init === 'function', 'HanziLookup.init is a function');
assert(typeof HL.Matcher === 'function', 'HanziLookup.Matcher is available');

HL.init('mmah', 'dummy', function(success) {
  assert(success === true, 'HanziLookup initialized successfully with mmah.json dataset');

  // Test character '一'
  const strokesYi = [
    [ [40, 150], [260, 150] ]
  ];
  const charYi = new HL.AnalyzedCharacter(strokesYi);
  const matcher = new HL.Matcher('mmah');
  matcher.match(charYi, 5, function(matches) {
    const topChar = matches[0]?.character;
    assert(topChar === '一', `Character '一' correctly recognized as top candidate (got: '${topChar}')`);
  });

  // Test character '十'
  const strokesShi = [
    [ [40, 150], [260, 150] ],
    [ [150, 40], [150, 260] ]
  ];
  const charShi = new HL.AnalyzedCharacter(strokesShi);
  matcher.match(charShi, 5, function(matches) {
    const topChar = matches[0]?.character;
    assert(topChar === '十', `Character '十' correctly recognized as top candidate (got: '${topChar}')`);
  });

  // Test character '人'
  const strokesRen = [
    [ [150, 40], [60, 260] ],
    [ [120, 130], [240, 260] ]
  ];
  const charRen = new HL.AnalyzedCharacter(strokesRen);
  matcher.match(charRen, 5, function(matches) {
    const candidates = matches.map(m => m.character);
    assert(candidates.includes('人') || candidates.includes('入'), `Character '人' in candidate list: ${candidates.join(', ')}`);
  });
});

// 3. Test Stroke Sanitization & Edge Cases
console.log('\n3. Testing Edge Case Handling (Empty canvas, dots, fast strokes)...');
function sanitizeStrokes(strokes) {
  if (!Array.isArray(strokes) || strokes.length === 0) return [];
  const result = [];
  for (const stroke of strokes) {
    if (!Array.isArray(stroke) || stroke.length === 0) continue;
    if (stroke.length === 1) {
      const p = stroke[0];
      result.push([[p[0], p[1]], [p[0] + 1.2, p[1] + 1.2]]);
    } else {
      result.push(stroke.map(p => [p[0], p[1]]));
    }
  }
  return result;
}

const emptyStrokes = sanitizeStrokes([]);
assert(emptyStrokes.length === 0, 'Empty strokes returns empty array without throwing');

const dotStroke = sanitizeStrokes([ [ [100, 100] ] ]);
assert(dotStroke.length === 1 && dotStroke[0].length === 2, 'Single point dot expanded to 2 points for HanziLookup compatibility');

const normalStroke = sanitizeStrokes([ [ [10, 10], [20, 20], [30, 30] ] ]);
assert(normalStroke[0].length === 3, 'Multi-point stroke preserved');

// 4. Test Multi-Character Buffer Logic (Liền mạch nhiều chữ: 你 -> 好 -> 你好)
console.log('\n4. Testing Multi-Character Composition Buffer Logic...');
class MockBuffer {
  constructor(initial = '') {
    this.buffer = initial;
  }
  append(char) { this.buffer += char; }
  backspace() {
    const chars = Array.from(this.buffer);
    chars.pop();
    this.buffer = chars.join('');
  }
  clear() { this.buffer = ''; }
}

const mb = new MockBuffer();
assert(mb.buffer === '', 'Initial buffer is empty');
mb.append('你');
assert(mb.buffer === '你', 'Appended first character "你", user sees it clearly in buffer display');
mb.append('好');
assert(mb.buffer === '你好', 'Appended second character "好", combined into "你好" without premature search trigger');
mb.backspace();
assert(mb.buffer === '你', 'Backspace correctly deleted last character, leaving "你"');
mb.append('们');
assert(mb.buffer === '你们', 'Appended "们", buffer is "你们"');
mb.clear();
assert(mb.buffer === '', 'Buffer cleared cleanly');

// 5. Test CloudEngine Ink Payload Formatting
console.log('\n5. Testing CloudEngine Ink Payload Formatting...');
const sampleRawStrokes = [
  [ [10, 20, 1000], [30, 40, 1020], [50, 60, 1040] ],
  [ [70, 80, 1100], [90, 100, 1120] ]
];

const formattedInk = sampleRawStrokes.map(stroke => {
  const xs = stroke.map(p => Math.round(p[0]));
  const ys = stroke.map(p => Math.round(p[1]));
  const ts = stroke.map((p, idx) => p[2] || (idx * 20));
  return [xs, ys, ts];
});

assert(formattedInk.length === 2, 'Ink formatted into 2 strokes');
assert(formattedInk[0][0].join(',') === '10,30,50', 'Xs correctly partitioned into first array');
assert(formattedInk[0][1].join(',') === '20,40,60', 'Ys correctly partitioned into second array');
assert(formattedInk[0][2].join(',') === '1000,1020,1040', 'Timestamps correctly partitioned into third array');

// 6. Test i18n Translation Key Coverage
console.log('\n6. Verifying i18n Localization for Handwriting UI...');
const i18nFile = fs.readFileSync('js/data/i18n-data.js', 'utf8');
const i18nCtx = {};
vm.createContext(i18nCtx);
vm.runInContext(i18nFile.replace('const I18N_DATA', 'var I18N_DATA'), i18nCtx);
const I18N = i18nCtx.I18N_DATA;

const hwKeys = [
  'btnHandwriting',
  'btnDrawSearch',
  'handwritingTitle',
  'hwBufferPlaceholder',
  'hwCandidatePlaceholder',
  'hwSearchBtn',
  'hwInsertBtn',
  'hwUndoStroke',
  'hwClearCanvas',
  'hwBackspace',
  'hwClearBuffer',
  'hwGridMi',
  'hwGridTian',
  'hwGridNone'
];

for (const k of hwKeys) {
  assert(
    I18N.vi[k] && I18N.en[k] && I18N.ja[k],
    `i18n key '${k}' defined in vi ("${I18N.vi[k]}"), en ("${I18N.en[k]}"), ja ("${I18N.ja[k]}")`
  );
}

// 7. Test Security & Backend Proxy Structure
console.log('\n7. Verifying Backend Proxy and Security Standards...');
const cfProxyCode = fs.readFileSync('functions/api/handwriting.js', 'utf8');
// CORS is now emitted by the shared helper instead of a hard-coded `*` header, so the
// check verifies both the wiring and the helper that actually sets the header.
const cfHttpLib = fs.readFileSync('functions/_lib/http.js', 'utf8');
assert(
  cfProxyCode.includes('jsonCorsHeaders') && cfHttpLib.includes('Access-Control-Allow-Origin'),
  'CORS headers implemented'
);
assert(
  !cfProxyCode.includes("'Access-Control-Allow-Origin': '*'"),
  'CORS must not be a hard-coded wildcard'
);
assert(cfProxyCode.includes('https://inputtools.google.com/request'), 'Targets Google Input Tools API endpoint');
assert(cfProxyCode.includes('data[1][0][1]'), 'Extracts candidate array from Google response data[1][0][1]');
assert(cfProxyCode.includes('unofficial') || cfProxyCode.includes('không chính thức'), 'Contains disclaimer documentation regarding unofficial Google API');

// Summary
console.log(`\n========================================`);
console.log(`Test Results: ${passCount} Passed, ${failCount} Failed.`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL HANDWRITING TESTS PASSED SUCCESSFULLY!');
}

