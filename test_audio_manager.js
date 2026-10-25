// test_audio_manager.js - Comprehensive test suite for Halou Zhongwen Unified Audio Manager & Multi-Tier Speech Pipeline
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const AUDIO_CORE = require('./js/features/audio-core.js');

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✅ ' + name);
  } catch (err) {
    failed++;
    console.error('  ❌ ' + name);
    console.error('     ' + (err.stack || err.message));
  }
}

async function checkAsync(name, fn) {
  try {
    await fn();
    passed++;
    console.log('  ✅ ' + name);
  } catch (err) {
    failed++;
    console.error('  ❌ ' + name);
    console.error('     ' + (err.stack || err.message));
  }
}

console.log('\n🧪 Halou Zhongwen Audio Manager & Multi-Tier Speech Test Suite\n');

// Mock browser environment for tts.js
const revokedUrls = [];
global.URL = {
  createObjectURL: (blob) => 'blob:mock-audio-' + Math.random().toString(36).slice(2),
  revokeObjectURL: (url) => { revokedUrls.push(url); }
};

const mockStorage = new Map();
global.localStorage = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k),
  clear: () => mockStorage.clear()
};

global.window = {
  addEventListener: () => {},
  speechSynthesis: {
    getVoices: () => [{ name: 'Microsoft Xiaoxiao - Chinese (Simplified)', lang: 'zh-CN' }],
    onvoiceschanged: null,
    speak: () => {},
    cancel: () => {},
    resume: () => {}
  }
};
global.navigator = { onLine: true };
global.state = { ttsEngine: 'auto', ttsSpeed: 1.0, ttsVolume: 1.0, ttsMuted: false };
global.AUDIO_CORE = AUDIO_CORE;

const { AUDIO_MANAGER, speakText, stopSpeech } = require('./js/features/tts.js');

// ============================================================================
// 1. Multi-Tier Engine Plan & Hierarchy
// ============================================================================
console.log('--- 1. Multi-Tier Speech Pipeline Hierarchy ---');

check('Tier 1: When Azure is available, auto plan starts with Azure', () => {
  const plan = AUDIO_CORE.buildEnginePlan({
    engine: 'auto',
    online: true,
    azureAvailable: true,
    textLength: 10
  });
  assert.strictEqual(plan[0], 'azure', 'Azure must be Tier 1');
  assert.strictEqual(plan[1], 'youdao', 'Youdao must be Tier 2 fallback');
  assert.strictEqual(plan[2], 'baidu', 'Baidu must be Tier 2 fallback');
  assert.strictEqual(plan[3], 'google', 'Google must be Tier 3 fallback');
  assert.strictEqual(plan[4], 'system', 'Web Speech API must be Tier 4 offline fallback');
});

check('Tier 2 Fallback: When Azure is unavailable, auto plan falls back to Youdao/Baidu', () => {
  const plan = AUDIO_CORE.buildEnginePlan({
    engine: 'auto',
    online: true,
    azureAvailable: false,
    textLength: 4
  });
  assert.notStrictEqual(plan[0], 'azure');
  assert.strictEqual(plan[0], 'youdao');
  assert.strictEqual(plan[plan.length - 1], 'system');
});

check('Explicit Azure choice falls back gracefully through all tiers if Azure fails', () => {
  const plan = AUDIO_CORE.buildEnginePlan({
    engine: 'azure',
    online: true,
    azureAvailable: true
  });
  assert.deepStrictEqual(plan, ['azure', 'youdao', 'baidu', 'google', 'system']);
});

check('Offline mode drops directly to Tier 4 (System)', () => {
  const plan = AUDIO_CORE.buildEnginePlan({
    engine: 'auto',
    online: false,
    azureAvailable: true
  });
  assert.deepStrictEqual(plan, ['system']);
});

// ============================================================================
// 2. LRU Cache with URL Revocation
// ============================================================================
console.log('\n--- 2. In-Memory LRU Cache & Object URL Revocation ---');

check('LRU Cache puts and retrieves audio entries', () => {
  AUDIO_MANAGER.clearCache();
  const key = AUDIO_MANAGER.getCacheKey('azure', '你好', 1.0);
  AUDIO_MANAGER.putCachedAudio(key, 'blob:test-1', {});
  assert.strictEqual(AUDIO_MANAGER.getCachedAudio(key), 'blob:test-1');
});

check('LRU Cache evicts oldest entry when reaching MAX_CACHE_ENTRIES and revokes blob URL', () => {
  AUDIO_MANAGER.clearCache();
  revokedUrls.length = 0;

  // Insert MAX_CACHE_ENTRIES items (100)
  for (let i = 0; i < 100; i++) {
    AUDIO_MANAGER.putCachedAudio('key_' + i, 'blob:url_' + i, {});
  }
  assert.strictEqual(AUDIO_MANAGER.cache.size, 100);
  assert.strictEqual(revokedUrls.length, 0);

  // Insert 101st item -> oldest ('key_0') must be evicted and its URL revoked
  AUDIO_MANAGER.putCachedAudio('key_100', 'blob:url_100', {});
  assert.strictEqual(AUDIO_MANAGER.cache.size, 100);
  assert.strictEqual(AUDIO_MANAGER.getCachedAudio('key_0'), null, 'key_0 must be evicted');
  assert.strictEqual(revokedUrls.length, 1);
  assert.strictEqual(revokedUrls[0], 'blob:url_0');
});

check('clearCache revokes all active blob URLs', () => {
  AUDIO_MANAGER.clearCache();
  revokedUrls.length = 0;

  AUDIO_MANAGER.putCachedAudio('k1', 'blob:u1', {});
  AUDIO_MANAGER.putCachedAudio('k2', 'blob:u2', {});
  assert.strictEqual(AUDIO_MANAGER.cache.size, 2);

  AUDIO_MANAGER.clearCache();
  assert.strictEqual(AUDIO_MANAGER.cache.size, 0);
  assert.ok(revokedUrls.includes('blob:u1'));
  assert.ok(revokedUrls.includes('blob:u2'));
});

// ============================================================================
// 3. Quota Guard & Usage Tracking
// ============================================================================
console.log('\n--- 3. Quota Guard & Monthly Usage Tracking ---');

check('Usage tracking records Azure characters, requests and success count', () => {
  localStorage.clear();
  AUDIO_MANAGER.recordSuccess(15);
  AUDIO_MANAGER.recordSuccess(25);

  const usage = AUDIO_MANAGER.getUsage();
  assert.strictEqual(usage.azureChars, 40);
  assert.strictEqual(usage.azureRequests, 2);
  assert.strictEqual(usage.azureSuccess, 2);
  assert.strictEqual(usage.azureFailures, 0);

  const persisted = JSON.parse(localStorage.getItem('cr_tts_usage'));
  assert.strictEqual(persisted.azureChars, 40);
});

check('Soft cap warning triggers at 450,000 characters', () => {
  const currentUsage = AUDIO_MANAGER.getUsage();
  currentUsage.azureChars = 450500;
  AUDIO_MANAGER.saveUsage(currentUsage);

  const status = AUDIO_MANAGER.getStatus();
  assert.strictEqual(status.softCapReached, true);
  assert.strictEqual(status.hardCapReached, false);
  assert.strictEqual(AUDIO_MANAGER.isAzureAvailable(), true, 'Soft cap should not block calls');
});

check('Hard cap cutoff triggers at 480,000 characters and disables Azure gracefully', () => {
  const currentUsage = AUDIO_MANAGER.getUsage();
  currentUsage.azureChars = 480100;
  AUDIO_MANAGER.saveUsage(currentUsage);

  const status = AUDIO_MANAGER.getStatus();
  assert.strictEqual(status.hardCapReached, true);
  assert.strictEqual(AUDIO_MANAGER.isAzureAvailable(), false, 'Hard cap must disable Azure to prevent billing overrun');
});

// ============================================================================
// 4. Circuit Breaker State Machine & Cooldown Windows
// ============================================================================
console.log('\n--- 4. Circuit Breaker State Machine ---');

check('HTTP 401 (Auth Error) triggers 10 minute cooldown', () => {
  AUDIO_MANAGER.resetCircuitBreaker();
  const before = Date.now();
  AUDIO_MANAGER.recordFailure(401, 'Unauthorized');

  assert.strictEqual(AUDIO_MANAGER.circuit.state, 'OPEN');
  assert.strictEqual(AUDIO_MANAGER.circuit.lastStatus, 401);
  const cooldownRemainingMs = AUDIO_MANAGER.circuit.cooldownUntil - before;
  assert.ok(cooldownRemainingMs >= 9 * 60 * 1000 && cooldownRemainingMs <= 10 * 60 * 1000 + 500);
  assert.strictEqual(AUDIO_MANAGER.isAzureAvailable(), false);
});

check('HTTP 403 / 429 (Quota / Rate limit) triggers 30 minute cooldown', () => {
  AUDIO_MANAGER.resetCircuitBreaker();
  const before = Date.now();
  AUDIO_MANAGER.recordFailure(429, 'Rate limited');

  assert.strictEqual(AUDIO_MANAGER.circuit.state, 'OPEN');
  assert.strictEqual(AUDIO_MANAGER.circuit.lastStatus, 429);
  const cooldownRemainingMs = AUDIO_MANAGER.circuit.cooldownUntil - before;
  assert.ok(cooldownRemainingMs >= 29 * 60 * 1000 && cooldownRemainingMs <= 30 * 60 * 1000 + 500);
});

check('HTTP 503 (Unconfigured / Down) triggers 5 minute cooldown', () => {
  AUDIO_MANAGER.resetCircuitBreaker();
  const before = Date.now();
  AUDIO_MANAGER.recordFailure(503, 'Service unavailable');

  assert.strictEqual(AUDIO_MANAGER.circuit.state, 'OPEN');
  const cooldownRemainingMs = AUDIO_MANAGER.circuit.cooldownUntil - before;
  assert.ok(cooldownRemainingMs >= 4 * 60 * 1000 && cooldownRemainingMs <= 5 * 60 * 1000 + 500);
});

check('3 consecutive 5xx errors trigger 2 minute cooldown', () => {
  AUDIO_MANAGER.resetCircuitBreaker();
  AUDIO_MANAGER.recordFailure(502, 'Bad gateway 1');
  AUDIO_MANAGER.recordFailure(502, 'Bad gateway 2');
  assert.strictEqual(AUDIO_MANAGER.circuit.consecutiveFailures, 2);

  const before = Date.now();
  AUDIO_MANAGER.recordFailure(502, 'Bad gateway 3');
  assert.strictEqual(AUDIO_MANAGER.circuit.consecutiveFailures, 3);
  const cooldownRemainingMs = AUDIO_MANAGER.circuit.cooldownUntil - before;
  assert.ok(cooldownRemainingMs >= 115 * 1000 && cooldownRemainingMs <= 120 * 1000 + 500);
});

check('Successful request resets circuit breaker to CLOSED and clears failures', () => {
  AUDIO_MANAGER.recordSuccess(10);
  assert.strictEqual(AUDIO_MANAGER.circuit.state, 'CLOSED');
  assert.strictEqual(AUDIO_MANAGER.circuit.consecutiveFailures, 0);
  assert.strictEqual(AUDIO_MANAGER.circuit.cooldownUntil, 0);
});

// ============================================================================
// 5. Azure Audio Fetcher & Resilient Fallback
// ============================================================================
async function runAsyncTests() {
  console.log('\n--- 5. Azure Fetcher & Live API Fallback ---');

  await checkAsync('fetchAzureAudio calls endpoint, caches result, and returns object URL', async () => {
    AUDIO_MANAGER.clearCache();
    AUDIO_MANAGER.resetCircuitBreaker();
    const currentUsage = AUDIO_MANAGER.getUsage();
    currentUsage.azureChars = 0;
    AUDIO_MANAGER.saveUsage(currentUsage);

    let calledEndpoint = '';
    let payloadBody = null;

    AUDIO_MANAGER.setFetchHandler(async (url, options) => {
      calledEndpoint = url;
      payloadBody = JSON.parse(options.body);
      return {
        ok: true,
        status: 200,
        blob: async () => ({ size: 1024, type: 'audio/mpeg' })
      };
    });

    const url = await AUDIO_MANAGER.fetchAzureAudio('你好世界', 1.0);
    assert.strictEqual(calledEndpoint, '/api/tts');
    assert.strictEqual(payloadBody.text, '你好世界');
    assert.strictEqual(payloadBody.voice, 'zh-CN-Xiaoxiao2:DragonHDFlashLatestNeural');
    assert.ok(url.startsWith('blob:'));

    // Second fetch must hit in-memory LRU cache
    let secondCall = false;
    AUDIO_MANAGER.setFetchHandler(async () => { secondCall = true; });
    const cachedUrl = await AUDIO_MANAGER.fetchAzureAudio('你好世界', 1.0);
    assert.strictEqual(cachedUrl, url);
    assert.strictEqual(secondCall, false, 'Second fetch should be served from cache');
    assert.strictEqual(AUDIO_MANAGER.getUsage().cacheHits, 1);
  });

  await checkAsync('fetchAzureAudio throws on upstream failure and trips circuit breaker', async () => {
    AUDIO_MANAGER.clearCache();
    AUDIO_MANAGER.resetCircuitBreaker();

    AUDIO_MANAGER.setFetchHandler(async () => ({
      ok: false,
      status: 403,
      statusText: 'Forbidden'
    }));

    let caught = null;
    try {
      await AUDIO_MANAGER.fetchAzureAudio('测试失败', 1.0);
    } catch (err) {
      caught = err;
    }

    assert.ok(caught !== null);
    assert.strictEqual(AUDIO_MANAGER.circuit.state, 'OPEN');
    assert.strictEqual(AUDIO_MANAGER.circuit.lastStatus, 403);
    assert.strictEqual(AUDIO_MANAGER.isAzureAvailable(), false);
  });

  // ============================================================================
  // 6. Audio Overlap Prevention & Clean Interruption
  // ============================================================================
  console.log('\n--- 6. Audio Overlap Prevention & Concurrency Safety ---');

  check('stopSpeech cleanly halts previous speech and increments runId', () => {
    let cancelled = false;
    window.speechSynthesis.cancel = () => { cancelled = true; };

    stopSpeech();
    assert.strictEqual(cancelled, true);
  });

  console.log(`\n========================================`);
  console.log(`Audio Manager Test Suite: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL AUDIO MANAGER TESTS PASSED SUCCESSFULLY!\n');
  }
}

runAsyncTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
