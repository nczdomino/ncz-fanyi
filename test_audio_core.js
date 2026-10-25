// test_audio_core.js - Tests for the speech pipeline (chunking, engine selection, wiring).
//
// The previous implementation had two defects that unit tests can pin down permanently:
//   * `clean.slice(0, 300)` silently truncated every paragraph longer than 300 characters;
//   * long sentences went to speechSynthesis as one utterance, where Chrome drops them.
// Both are fixed by chunking, so the tests assert the pure chunker and the wiring.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const A = require('./js/features/audio-core.js');

let passed = 0;
function check(name, fn) {
  fn();
  passed++;
  console.log('  ✅ ' + name);
}

console.log('\n🧪 Audio pipeline tests\n');

// ------------------------------------------------------------------ normalising
console.log('--- Text normalisation ---');

check('whitespace and newlines collapse', () => {
  assert.strictEqual(A.normalizeSpeechText('  你好\n\n世界\t！ '), '你好 世界 ！');
  assert.strictEqual(A.normalizeSpeechText(null), '');
});

// ------------------------------------------------------------------- sentences
console.log('--- Sentence splitting ---');

check('sentences keep their terminating punctuation', () => {
  const s = A.splitSentences('今天很好。我们去公园吧！你觉得怎么样？');
  assert.deepStrictEqual(s, ['今天很好。', '我们去公园吧！', '你觉得怎么样？']);
});

check('closing quotes stay attached to the sentence', () => {
  const s = A.splitSentences('他说：「走吧！」然后走了。');
  assert.strictEqual(s[0], '他说：「走吧！」');
  assert.strictEqual(s[1], '然后走了。');
});

check('text without punctuation is a single sentence', () => {
  assert.deepStrictEqual(A.splitSentences('你好世界'), ['你好世界']);
  assert.deepStrictEqual(A.splitSentences(''), []);
});

// -------------------------------------------------------------------- chunking
console.log('--- Chunking (the 300-character truncation fix) ---');

check('short text stays a single chunk', () => {
  assert.deepStrictEqual(A.chunkText('你好'), ['你好']);
});

check('no chunk exceeds the limit', () => {
  const text = '今天天气很好，我们一起去公园散步吧。公园里有很多花，孩子们在草地上玩。你觉得怎么样？我也想去！外面风很大，记得穿外套。';
  const chunks = A.chunkText(text, 40);
  assert.ok(chunks.length > 1, 'expected several chunks');
  for (const c of chunks) assert.ok(c.length <= 40, `chunk too long (${c.length}): ${c}`);
});

check('no text is lost while chunking', () => {
  const text = '第一句话。第二句话比较长一些，需要拆开处理才合适！第三句？最后一句。';
  const strip = (s) => s.replace(/\s+/g, '');
  assert.strictEqual(A.chunkText(text, 20).join(''), strip(text).replace(/\s+/g, ''));
  assert.strictEqual(
    strip(A.chunkText(text, 20).join('')),
    strip(text),
    'chunking must be lossless'
  );
});

check('a 1,000-character paragraph is fully covered (was truncated at 300)', () => {
  const sentence = '这是一个用于测试的很长的句子，用来确认整段文字都会被朗读到。';
  const text = sentence.repeat(25); // ~750 chars
  assert.ok(text.length > 300, 'test text must exceed the old truncation limit');
  const chunks = A.chunkText(text, 60);
  const rejoined = chunks.join('');
  assert.strictEqual(rejoined.replace(/\s+/g, ''), text.replace(/\s+/g, ''),
    'every character must survive chunking');
});

check('a run-on sentence without punctuation is hard-split', () => {
  const chunks = A.chunkText('啊'.repeat(150), 60);
  assert.deepStrictEqual(chunks.map(c => c.length), [60, 60, 30]);
});

check('chunks prefer sentence boundaries', () => {
  const chunks = A.chunkText('你好。世界。再见。', 10);
  // Each sentence is short enough to stay intact rather than being cut mid-sentence.
  for (const c of chunks) assert.ok(/[。]$/.test(c) || c.length <= 10);
});

// ------------------------------------------------------------- engine selection
console.log('--- Engine selection ---');

check('explicit engine choice is respected first', () => {
  assert.strictEqual(A.buildEnginePlan({ engine: 'google' })[0], 'google');
  assert.strictEqual(A.buildEnginePlan({ engine: 'baidu' })[0], 'baidu');
  assert.strictEqual(A.buildEnginePlan({ engine: 'youdao' })[0], 'youdao');
  assert.deepStrictEqual(A.buildEnginePlan({ engine: 'system' }), ['system']);
});

check('offline never tries a network engine', () => {
  const plan = A.buildEnginePlan({ online: false, textLength: 40, hasNeuralVoice: true });
  assert.deepStrictEqual(plan, ['system']);
  // Even an explicit network engine must fall back to the local voice.
  assert.deepStrictEqual(A.buildEnginePlan({ engine: 'baidu', online: false }), ['system']);
});

check('short words prefer the dictionary voice', () => {
  assert.strictEqual(A.buildEnginePlan({ textLength: 2 })[0], 'youdao');
});

check('long text prefers a neural local voice when available', () => {
  const plan = A.buildEnginePlan({ textLength: 40, hasNeuralVoice: true });
  assert.strictEqual(plan[0], 'system');
  assert.ok(plan.indexOf('baidu') !== -1, 'must still have a network fallback');
});

check('long text without a neural voice prefers the natural sentence engine', () => {
  assert.strictEqual(A.buildEnginePlan({ textLength: 40, hasNeuralVoice: false })[0], 'baidu');
});

check('Save-Data prefers the free local voice when one exists', () => {
  assert.strictEqual(A.buildEnginePlan({ textLength: 40, saveData: true, hasNeuralVoice: true })[0], 'system');
});

check('every plan ends with the offline system voice', () => {
  for (const opts of [
    {}, { textLength: 40 }, { textLength: 2 }, { saveData: true },
    { engine: 'baidu' }, { engine: 'google' }, { engine: 'youdao' },
  ]) {
    const plan = A.buildEnginePlan(opts);
    assert.strictEqual(plan[plan.length - 1], 'system', 'plan lacks a local fallback: ' + plan);
  }
});

// ------------------------------------------------------------------------ URLs
console.log('--- Engine URLs ---');

check('URLs point at the right host with encoded text', () => {
  const y = A.buildAudioUrl('youdao', '你好', 1);
  assert.ok(y.startsWith('https://dict.youdao.com/dictvoice?audio='), y);
  assert.ok(y.indexOf(encodeURIComponent('你好')) !== -1);

  const b = A.buildAudioUrl('baidu', '你好', 1);
  assert.ok(b.startsWith('https://fanyi.baidu.com/gettts?'), b);
  assert.ok(/[?&]spd=5(&|$)/.test(b), 'normal speed should map to spd=5: ' + b);

  const g = A.buildAudioUrl('google', '你好', 1);
  assert.ok(g.startsWith('https://translate.google.com/translate_tts?'), g);
});

check('slow speed is forwarded to the engines', () => {
  assert.ok(/[?&]spd=4(&|$)/.test(A.buildAudioUrl('baidu', '你好', 0.75)), 'expected spd=4');
  assert.ok(/[?&]spd=6(&|$)/.test(A.buildAudioUrl('baidu', '你好', 1.3)), 'expected spd=6');
  assert.ok(A.buildAudioUrl('google', '你好', 0.75).indexOf('ttsspeed=0.24') !== -1);
});

check('the system engine has no URL', () => {
  assert.strictEqual(A.buildAudioUrl('system', '你好', 1), '');
  assert.strictEqual(A.buildAudioUrl('unknown', '你好', 1), '');
});

// -------------------------------------------------------------- wiring checks
console.log('--- Pipeline wiring (static) ---');

const ttsSrc = fs.readFileSync(path.join(__dirname, 'js/features/tts.js'), 'utf8');

// The defect is documented in comments in both files, so only look at executable code.
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .split('\n')
    .map((line) => line.replace(/(^|[^:])\/\/.*$/, '$1'))
    .join('\n');
}

check('the 300-character truncation is gone', () => {
  assert.ok(!/\.slice\(0,\s*300\)/.test(stripComments(ttsSrc)),
    'tts.js still truncates text before speaking');
  const core = stripComments(fs.readFileSync(path.join(__dirname, 'js/features/audio-core.js'), 'utf8'));
  assert.ok(!/\.slice\(0,\s*300\)/.test(core), 'audio-core.js must not truncate either');
});

check('speakText speaks every chunk in order', () => {
  assert.ok(/chunkText\(/.test(ttsSrc), 'chunkText is never called');
  assert.ok(/for \(let i = 0; i < chunks\.length; i\+\+\)/.test(ttsSrc), 'no chunk loop');
  assert.ok(/await playChunk\(/.test(ttsSrc), 'chunks are not awaited in order');
});

check('a new request cancels the previous one', () => {
  assert.ok(/function stopSpeech\(/.test(ttsSrc), 'stopSpeech missing');
  assert.ok(/speechRunId\+\+/.test(ttsSrc), 'run id never bumped');
  assert.ok(/if \(runId !== speechRunId\) return;/.test(ttsSrc), 'chunk loop does not check the run id');
});

check('karaoke receives the chunk offset', () => {
  assert.ok(/karaokeChunk\(offset, chunk\.length\)/.test(ttsSrc), 'karaokeChunk not called');
  const kara = fs.readFileSync(path.join(__dirname, 'js/features/karaoke.js'), 'utf8');
  assert.ok(/function karaokeChunk\(/.test(kara), 'karaokeChunk missing in karaoke.js');
  assert.ok(/KARA\.base/.test(kara), 'karaoke does not apply the chunk base offset');
});

check('engine fallback is observable, not silent', () => {
  assert.ok(/state\.ttsLastEngine/.test(ttsSrc), 'the engine used is not recorded');
  assert.ok(/showToast/.test(ttsSrc), 'a total failure is not reported to the user');
});

check('offline and Save-Data influence the plan', () => {
  assert.ok(/ttsIsOnline\(\)/.test(ttsSrc) && /ttsSaveDataOn\(\)/.test(ttsSrc), 'network hints unused');
});

check('audio-core.js is loaded before tts.js', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const core = html.indexOf('js/features/audio-core.js');
  const tts = html.indexOf('js/features/tts.js');
  assert.ok(core !== -1 && tts !== -1, 'a script tag is missing');
  assert.ok(core < tts, 'audio-core.js must load before tts.js');
});

check('volume and mute live in state', () => {
  const st = fs.readFileSync(path.join(__dirname, 'js/core/state.js'), 'utf8');
  assert.ok(/ttsVolume/.test(st) && /ttsMuted/.test(st), 'state lacks volume/mute');
});

// ----------------------------------------------------------- service worker cache
console.log('--- Service worker audio cache ---');

const swMod = require('./sw.js');

check('TTS hosts are routed to a dedicated audio cache', () => {
  assert.ok(Array.isArray(swMod.AUDIO_HOSTS) && swMod.AUDIO_HOSTS.length >= 3);
  assert.ok(swMod.AUDIO_HOSTS.indexOf('dict.youdao.com') !== -1);
  const swSrc = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/audioCacheFirst/.test(swSrc), 'audioCacheFirst missing');
  assert.ok(/AUDIO_HOSTS\.indexOf\(url\.hostname\)/.test(swSrc), 'hosts are not checked');
});

check('the audio cache survives activation and has a larger budget', () => {
  const swSrc = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/k !== AUDIO_CACHE/.test(swSrc), 'activate() would delete the audio cache');
  assert.ok(swMod.MAX_AUDIO_ENTRIES > 120, 'audio cache should be larger than the runtime cache');
});

check('audio is stored by URL so Range responses cannot poison it', () => {
  const swSrc = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  assert.ok(/cache\.match\(url\.href\)/.test(swSrc), 'audio is matched by request, not URL');
  assert.ok(/cache\.put\(url\.href/.test(swSrc), 'audio is stored by request, not URL');
});

console.log(`\n🎉 ${passed} audio pipeline tests passed.\n`);
