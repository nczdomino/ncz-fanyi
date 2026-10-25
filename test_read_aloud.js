// test_read_aloud.js - Tests for continuous reading, shadowing repeats and preloading.
//
// js/features/read-aloud.js is DOM-light: it drives state + speakText, so it can be tested
// in a VM context with stubs instead of a browser.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const AUDIO_CORE = require('./js/features/audio-core.js');

let passed = 0;
let failed = 0;
async function check(name, fn) {
  try {
    await fn();
    passed++;
    console.log('  ✅ ' + name);
  } catch (err) {
    failed++;
    console.log('  ❌ ' + name);
    console.log('     ' + err.message);
  }
}

function makeContext() {
  const ctx = { console, module: { exports: {} }, globalThis: null, setTimeout, clearTimeout };
  ctx.globalThis = ctx;
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'js/features/read-aloud.js'), 'utf8'), ctx, {
    filename: 'read-aloud.js',
  });

  // Stubs the module talks to.
  ctx.spoken = [];
  ctx.renders = 0;
  ctx.stops = 0;
  ctx.state = { sentences: ['第一句。', '第二句。', '第三句。'], currentSentenceIndex: 0, readerPlaying: false, ttsSpeed: 1 };
  ctx.speakText = async (text) => { ctx.spoken.push(text); };
  ctx.renderReaderView = () => { ctx.renders++; };
  ctx.stopSpeech = () => { ctx.stops++; };
  ctx.AUDIO_CORE = AUDIO_CORE;
  ctx.hasNeuralZhVoice = () => false;

  const created = [];
  ctx.created = created;
  ctx.Audio = class FakeAudio {
    constructor() { this.preload = ''; this.src = ''; created.push(this); }
    load() { this.loaded = true; }
  };
  return ctx;
}

async function main() {
  console.log('\n🧪 Read-aloud tests\n');

  console.log('--- Continuous reading ---');

  await check('plays every sentence from the current index and stops at the end', async () => {
    const ctx = makeContext();
    ctx.state.currentSentenceIndex = 1;
    await ctx.toggleReadAll();
    assert.deepStrictEqual(ctx.spoken, ['第二句。', '第三句。']);
    assert.strictEqual(ctx.state.currentSentenceIndex, 2);
    assert.strictEqual(ctx.state.readerPlaying, false, 'readerPlaying must be cleared');
  });

  await check('advances the view for each sentence', async () => {
    const ctx = makeContext();
    await ctx.toggleReadAll();
    // One render to show the play state + one per sentence + one on completion.
    assert.ok(ctx.renders >= 4, 'expected a re-render per sentence, got ' + ctx.renders);
  });

  await check('tapping again stops playback', async () => {
    const ctx = makeContext();
    // Start without awaiting: the loop is still running when we toggle.
    const run = ctx.toggleReadAll();
    await Promise.resolve();
    assert.strictEqual(ctx.state.readerPlaying, true);
    ctx.toggleReadAll(); // stop
    await run;
    assert.strictEqual(ctx.state.readerPlaying, false);
    assert.ok(ctx.stops >= 1, 'stopSpeech was not called');
  });

  await check('stopping mid-run does not play the remaining sentences', async () => {
    const ctx = makeContext();
    ctx.speakText = async (text) => {
      ctx.spoken.push(text);
      if (ctx.spoken.length === 1) ctx.toggleReadAll(); // stop after the first
    };
    await ctx.toggleReadAll();
    assert.strictEqual(ctx.spoken.length, 1, 'played ' + ctx.spoken.length + ' sentences after stop');
  });

  await check('no sentences means no playback', async () => {
    const ctx = makeContext();
    ctx.state.sentences = [];
    await ctx.toggleReadAll();
    assert.deepStrictEqual(ctx.spoken, []);
  });

  console.log('\n--- Shadowing repeats ---');

  await check('repeats the same text N times', async () => {
    const ctx = makeContext();
    await ctx.repeatSpeak('你好', 3, 0);
    assert.deepStrictEqual(ctx.spoken, ['你好', '你好', '你好']);
  });

  await check('repeat count is clamped to a sane range', async () => {
    const ctx = makeContext();
    await ctx.repeatSpeak('你好', 99, 0);
    assert.strictEqual(ctx.spoken.length, 10, 'expected the 10x clamp, got ' + ctx.spoken.length);
  });

  await check('empty text is ignored', async () => {
    const ctx = makeContext();
    await ctx.repeatSpeak('   ', 3, 0);
    assert.deepStrictEqual(ctx.spoken, []);
  });

  console.log('\n--- Preloading ---');

  await check('warming uses a network engine URL for the first chunk', async () => {
    const ctx = makeContext();
    ctx.preloadSpeech('今天天气很好，我们一起去公园散步吧。');
    await new Promise((r) => setTimeout(r, 220));
    assert.strictEqual(ctx.created.length, 1, 'no Audio element was created');
    const a = ctx.created[0];
    assert.ok(/^https:\/\/(dict\.youdao\.com|fanyi\.baidu\.com|translate\.google\.com)\//.test(a.src), a.src);
    assert.strictEqual(a.preload, 'auto');
    assert.ok(a.loaded, 'load() was not called');
  });

  await check('the same text is only warmed once', async () => {
    const ctx = makeContext();
    ctx.preloadSpeech('你好');
    await new Promise((r) => setTimeout(r, 200));
    ctx.preloadSpeech('你好');
    await new Promise((r) => setTimeout(r, 200));
    assert.strictEqual(ctx.created.length, 1, 'preloaded the same text twice');
  });

  await check('Save-Data suppresses preloading', async () => {
    const ctx = makeContext();
    ctx.navigator = { onLine: true, connection: { saveData: true } };
    ctx.preloadSpeech('你好');
    await new Promise((r) => setTimeout(r, 200));
    assert.strictEqual(ctx.created.length, 0, 'preloaded despite Save-Data');
  });

  await check('offline suppresses preloading', async () => {
    const ctx = makeContext();
    ctx.navigator = { onLine: false };
    ctx.preloadSpeech('你好');
    await new Promise((r) => setTimeout(r, 200));
    assert.strictEqual(ctx.created.length, 0, 'preloaded while offline');
  });

  console.log('\n--- Wiring ---');

  await check('reader offers a play-all and a repeat button', async () => {
    const src = fs.readFileSync(path.join(__dirname, 'js/features/reader.js'), 'utf8');
    assert.ok(/onclick="toggleReadAll\(\)"/.test(src), 'play-all button missing');
    assert.ok(/onclick="repeatSpeak\(/.test(src), 'repeat button missing');
    assert.ok(/preloadSpeech\(/.test(src), 'play button does not preload');
  });

  await check('dictionary cards preload on hover', async () => {
    const src = fs.readFileSync(path.join(__dirname, 'js/features/dict.js'), 'utf8');
    assert.ok(/onmouseenter="typeof preloadSpeech==='function'&&preloadSpeech\(/.test(src),
      'result cards do not preload on hover');
  });

  await check('read-aloud.js loads after tts.js', async () => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    const tts = html.indexOf('js/features/tts.js');
    const ra = html.indexOf('js/features/read-aloud.js');
    assert.ok(tts !== -1 && ra !== -1, 'a script tag is missing');
    assert.ok(tts < ra, 'read-aloud.js must load after tts.js');
  });

  await check('readerPlaying lives in state and is rendered', async () => {
    const st = fs.readFileSync(path.join(__dirname, 'js/core/state.js'), 'utf8');
    assert.ok(/readerPlaying/.test(st), 'state.readerPlaying missing');
  });

  console.log(`\n${failed === 0 ? '🎉' : '❌'} ${passed} passed, ${failed} failed.\n`);
  process.exit(failed === 0 ? 0 : 1);
}

main();
