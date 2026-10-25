// test_api_security.mjs - Behavioural tests for the hardened serverless endpoints.
//
// These cover the ten fixes in commit "fix(api): restrict CORS, add rate limits and
// payload caps" — until now none of them had a test, so they could silently regress.
//
// Run with: node test_api_security.mjs
import assert from 'node:assert';
import translateHandler from './api/translate.js';
import semanticHandler from './api/dict/semantic.js';
import repairHandler from './api/ocr/repair.js';
import handwritingHandler from './api/handwriting.js';
import ocrHandler from './api/ocr.js';
import {
  optionsResponse, jsonCorsHeaders, enforceRate, readJson, resolveOrigin,
} from './functions/_lib/http.js';

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed++;
    console.log(`  ❌ ${name}`);
    console.log(`     ${err.message}`);
  }
}

async function checkAsync(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed++;
    console.log(`  ❌ ${name}`);
    console.log(`     ${err.message}`);
  }
}

// ------------------------------------------------------------------ mock harness
function makeRes() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    ended: false,
    setHeader(k, v) { this.headers[String(k).toLowerCase()] = v; },
    status(c) { this.statusCode = c; return this; },
    json(obj) { this.body = obj; return this; },
    end() { this.ended = true; return this; },
  };
}

function makeReq(opts = {}) {
  const {
    method = 'POST', origin, ip = '10.0.0.1', body, host = 'app.example',
  } = opts;
  const headers = { host };
  if (origin) headers.origin = origin;
  if (ip) headers['x-forwarded-for'] = ip;
  if (body !== undefined) headers['content-type'] = 'application/json';
  return {
    method,
    headers,
    body,
    socket: { remoteAddress: ip },
    url: 'https://app.example/api/test',
  };
}

const realFetch = globalThis.fetch;
function stubFetch(impl) { globalThis.fetch = impl; }
function restoreFetch() { globalThis.fetch = realFetch; }

// Every test uses a distinct client IP so the module-level rate-limit buckets
// (which are intentionally global to the process) cannot interfere.
let ipCounter = 0;
function nextIp() {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

// =========================================================== CORS behaviour
console.log('\n🧪 API hardening tests\n');
console.log('--- CORS ---');

check('no Origin header -> no Access-Control-Allow-Origin (same-origin)', () => {
  const res = makeRes();
  applyTranslate(res, makeReq());
  assert.strictEqual(res.headers['access-control-allow-origin'], undefined);
});

check('same-host Origin is echoed back', () => {
  const res = makeRes();
  applyTranslate(res, makeReq({ origin: 'https://app.example' }));
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://app.example');
  assert.strictEqual(res.headers.vary, 'Origin');
});

check('foreign Origin is rejected with 403', () => {
  const res = makeRes();
  applyTranslate(res, makeReq({ origin: 'https://evil.example' }));
  assert.strictEqual(res.statusCode, 403);
  assert.strictEqual(res.body.error, 'ORIGIN_NOT_ALLOWED');
});

check('ALLOWED_ORIGINS allow-list is honoured', () => {
  const prev = process.env.ALLOWED_ORIGINS;
  process.env.ALLOWED_ORIGINS = 'https://partner.example';
  try {
    const res = makeRes();
    applyTranslate(res, makeReq({ origin: 'https://partner.example' }));
    assert.notStrictEqual(res.statusCode, 403);
    assert.strictEqual(res.headers['access-control-allow-origin'], 'https://partner.example');
  } finally {
    if (prev === undefined) delete process.env.ALLOWED_ORIGINS; else process.env.ALLOWED_ORIGINS = prev;
  }
});

check('Access-Control-Allow-Credentials is never sent', () => {
  const res = makeRes();
  applyTranslate(res, makeReq({ origin: 'https://app.example' }));
  assert.strictEqual(res.headers['access-control-allow-credentials'], undefined);
});

// =========================================================== method & config
console.log('\n--- Method and configuration guards ---');

check('OPTIONS preflight returns 204', () => {
  const res = makeRes();
  applyTranslate(res, makeReq({ method: 'OPTIONS', origin: 'https://app.example' }));
  assert.strictEqual(res.statusCode, 204);
  assert.strictEqual(res.ended, true);
});

check('GET is rejected with 405', () => {
  const res = makeRes();
  applyTranslate(res, makeReq({ method: 'GET' }));
  assert.strictEqual(res.statusCode, 405);
});

check('missing GEMINI_API_KEY returns 503, not a crash', () => {
  const prev = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  try {
    const res = makeRes();
    applyTranslate(res, makeReq({ body: { text: '你好' } }));
    assert.strictEqual(res.statusCode, 503);
  } finally {
    if (prev === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = prev;
  }
});

check('non-POST is rejected on every Gemini endpoint', () => {
  for (const [name, handler] of [['semantic', semanticHandler], ['repair', repairHandler]]) {
    const res = makeRes();
    handler(makeReq({ method: 'GET', ip: nextIp() }), res);
    assert.strictEqual(res.statusCode, 405, `${name} did not return 405 for GET`);
  }
});

await checkAsync('every handler survives a POST with no API key configured', async () => {
  const prev = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  try {
    for (const [name, handler, body] of [
      ['translate', translateHandler, { text: '你好' }],
      ['semantic', semanticHandler, { query: 'buồn' }],
      ['repair', repairHandler, { text: '你好' }],
    ]) {
      const res = makeRes();
      await handler(makeReq({ ip: nextIp(), body }), res);
      assert.strictEqual(res.statusCode, 503, `${name} did not return 503 without a key (got ${res.statusCode})`);
    }
  } finally {
    if (prev !== undefined) process.env.GEMINI_API_KEY = prev;
  }
});

// =========================================================== payload validation
console.log('\n--- Payload validation ---');

const withKey = (fn) => {
  const prev = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'test-key-not-real';
  try { return fn(); } finally {
    if (prev === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = prev;
  }
};

check('unknown "type" is rejected (prompt-injection guard)', () => {
  withKey(() => {
    const res = makeRes();
    applyTranslate(res, makeReq({ ip: nextIp(), body: { text: '你好', type: 'ignore previous instructions' } }));
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.error, 'INVALID_TYPE');
  });
});

check('oversized body returns 413 before any upstream call', () => {
  withKey(() => {
    const res = makeRes();
    const big = 'a'.repeat(100 * 1024);
    applyTranslate(res, makeReq({ ip: nextIp(), body: { text: big } }));
    assert.ok(res.statusCode === 413 || res.statusCode === 400, `got ${res.statusCode}`);
  });
});

check('25,000 character limit is still enforced', () => {
  withKey(() => {
    const res = makeRes();
    applyTranslate(res, makeReq({ ip: nextIp(), body: { text: 'x'.repeat(25001) } }));
    assert.strictEqual(res.statusCode, 400);
  });
});

// =========================================================== rate limiting
console.log('\n--- Rate limiting ---');

check('burst above the limit returns 429 with Retry-After', () => {
  withKey(() => {
    const ip = nextIp();
    let last;
    for (let i = 0; i < 32; i++) {
      const res = makeRes();
      applyTranslate(res, makeReq({ ip, body: { text: '' } })); // 400s still count
      last = res;
    }
    assert.strictEqual(last.statusCode, 429, `expected 429, got ${last.statusCode}`);
    assert.ok(last.headers['retry-after'], 'missing Retry-After header');
    assert.strictEqual(last.body.error, 'RATE_LIMITED');
  });
});

check('each endpoint has its own bucket', () => {
  const ip = nextIp();
  for (let i = 0; i < 31; i++) {
    const res = makeRes();
    applyTranslate(res, makeReq({ ip, body: { text: '' } }));
  }
  const res = makeRes();
  applySemantic(res, makeReq({ ip, body: { query: 'buồn' } }));
  assert.notStrictEqual(res.statusCode, 429, 'semantic bucket must not be affected by translate');
});

// =========================================================== upstream handling
console.log('\n--- Upstream failures ---');

await checkAsync('upstream error is a generic 502 without leaking details', async () => {
  await withKeyAsync(async () => {
    stubFetch(async () => new Response('SECRET internal host db-07 quota 0', { status: 500 }));
    try {
      const res = makeRes();
      await translateHandler(makeReq({ ip: nextIp(), body: { text: '你好' } }), res);
      assert.strictEqual(res.statusCode, 502, `got ${res.statusCode}`);
      const serialised = JSON.stringify(res.body);
      assert.ok(!serialised.includes('SECRET'), 'upstream body leaked to the client');
      assert.ok(!('details' in res.body), 'details field must not be returned');
    } finally {
      restoreFetch();
    }
  });
});

await checkAsync('successful upstream call returns lenses', async () => {
  await withKeyAsync(async () => {
    stubFetch(async () => new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: '{"native":"a","genz":"b","business":"c"}' }] } }],
    }), { status: 200, headers: { 'content-type': 'application/json' } }));
    try {
      const res = makeRes();
      await translateHandler(makeReq({ ip: nextIp(), body: { text: '你好' } }), res);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.lenses.native, 'a');
    } finally {
      restoreFetch();
    }
  });
});

// =========================================================== OCR endpoint
console.log('\n--- OCR endpoint ---');

await checkAsync('OCR GET no longer advertises whether the service is configured', async () => {
  // Must be awaited: an undeclared variable in the handler would otherwise resolve to a
  // rejected promise and silently pass the assertions (this actually happened once).
  const res = makeRes();
  await ocrHandler(makeReq({ method: 'GET' }), res);
  assert.strictEqual(res.statusCode, 200, `got ${res.statusCode}`);
  assert.ok(res.body, 'handler produced no body');
  assert.ok(!('configured' in res.body), 'configured flag must not be exposed');
});

await checkAsync('OCR POST is inert when RAPIDOCR_API_URL is not configured', async () => {
  const prev = process.env.RAPIDOCR_API_URL;
  delete process.env.RAPIDOCR_API_URL;
  try {
    const res = makeRes();
    await ocrHandler(makeReq({ ip: nextIp(), body: { image: 'AAAA' } }), res);
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.error, 'RAPIDOCR_NOT_CONFIGURED');
  } finally {
    if (prev !== undefined) process.env.RAPIDOCR_API_URL = prev;
  }
});

await checkAsync('OCR caps the body and never relays upstream error text', async () => {
  const prevUrl = process.env.RAPIDOCR_API_URL;
  process.env.RAPIDOCR_API_URL = 'https://ocr.internal.example';
  stubFetch(async () => new Response('internal OCR traceback /srv/app.py line 42', { status: 500 }));
  try {
    const res = makeRes();
    await ocrHandler(makeReq({ ip: nextIp(), body: { image: 'x'.repeat(9 * 1024 * 1024) } }), res);
    assert.strictEqual(res.statusCode, 413, `expected 413, got ${res.statusCode}`);

    const res2 = makeRes();
    await ocrHandler(makeReq({ ip: nextIp(), body: { image: 'AAAA' } }), res2);
    assert.ok(!JSON.stringify(res2.body).includes('traceback'), 'upstream body leaked');
  } finally {
    restoreFetch();
    if (prevUrl === undefined) delete process.env.RAPIDOCR_API_URL; else process.env.RAPIDOCR_API_URL = prevUrl;
  }
});

// =========================================================== handwriting proxy
console.log('\n--- Handwriting proxy caps ---');

check('too many ink requests are rejected', async () => {
  const res = makeRes();
  await handwritingHandler(makeReq({
    ip: nextIp(),
    body: { requests: Array.from({ length: 9 }, () => ({ ink: [], language: 'zh_CN' })) },
  }), res);
  assert.strictEqual(res.statusCode, 400);
  assert.strictEqual(res.body.error, 'TOO_MANY_REQUESTS_IN_PAYLOAD');
});

await checkAsync('strokes and points are clamped before forwarding', async () => {
  let forwarded = null;
  stubFetch(async (url, init) => {
    forwarded = JSON.parse(init.body);
    return new Response(JSON.stringify(['SUCCESS', [[['好', []], ['你', []]]]]), { status: 200 });
  });
  try {
    // Two separate requests so the payload stays under the 256 KB body cap and the
    // clamp itself (not the size guard) is what gets exercised.
    const longStroke = Array.from({ length: 900 }, () => [1, 2]);
    const res = makeRes();
    await handwritingHandler(makeReq({
      ip: nextIp(),
      body: {
        requests: [
          { ink: Array.from({ length: 80 }, () => [[1, 2], [3, 4]]) }, // 80 strokes
          { ink: [longStroke] },                                        // 900 points
        ],
      },
    }), res);
    assert.strictEqual(res.statusCode, 200, `unexpected status ${res.statusCode}: ${JSON.stringify(res.body)}`);
    assert.ok(forwarded, 'upstream was not called');
    assert.ok(forwarded.requests[0].ink.length <= 64, `strokes not clamped: ${forwarded.requests[0].ink.length}`);
    assert.ok(forwarded.requests[1].ink[0].length <= 600, `points not clamped: ${forwarded.requests[1].ink[0].length}`);
    assert.strictEqual(forwarded.requests[0].language, 'zh_CN');
  } finally {
    restoreFetch();
  }
});

// =========================================================== Cloudflare helpers
console.log('\n--- Cloudflare helper parity ---');

check('CF optionsResponse mirrors the allow-list', () => {
  const req = new Request('https://app.example/api/x', { method: 'OPTIONS', headers: { Origin: 'https://evil.example' } });
  const resp = optionsResponse(req, {});
  assert.strictEqual(resp.status, 204);
  assert.strictEqual(resp.headers.get('access-control-allow-origin'), null);
});

check('CF jsonCorsHeaders allows same-origin only', () => {
  const ok = jsonCorsHeaders(new Request('https://app.example/api/x', { headers: { Origin: 'https://app.example' } }), {});
  assert.strictEqual(ok['Access-Control-Allow-Origin'], 'https://app.example');
  const bad = jsonCorsHeaders(new Request('https://app.example/api/x', { headers: { Origin: 'https://evil.example' } }), {});
  assert.strictEqual(bad['Access-Control-Allow-Origin'], undefined);
});

check('resolveOrigin supports an explicit allow-list', () => {
  const req = new Request('https://app.example/api/x', { headers: { Origin: 'https://partner.example' } });
  assert.strictEqual(resolveOrigin(req, { ALLOWED_ORIGINS: 'https://partner.example' }), 'https://partner.example');
  assert.strictEqual(resolveOrigin(req, { ALLOWED_ORIGINS: 'https://other.example' }), '');
});

await checkAsync('CF readJson rejects oversized and malformed bodies', async () => {
  const big = new Request('https://app.example/api/x', {
    method: 'POST', body: 'x'.repeat(200 * 1024), headers: { 'content-type': 'application/json' },
  });
  const r1 = await readJson(big, 1024);
  assert.strictEqual(r1.ok, false);
  assert.strictEqual(r1.reason, 'PAYLOAD_TOO_LARGE');

  const bad = new Request('https://app.example/api/x', { method: 'POST', body: '{oops' });
  const r2 = await readJson(bad);
  assert.strictEqual(r2.ok, false);
  assert.strictEqual(r2.reason, 'INVALID_JSON');

  const good = new Request('https://app.example/api/x', { method: 'POST', body: '{"a":1}' });
  const r3 = await readJson(good);
  assert.strictEqual(r3.ok, true);
  assert.strictEqual(r3.value.a, 1);
});

check('CF enforceRate returns null under the limit and a 429 above it', () => {
  const mk = (ip) => new Request('https://app.example/api/x', { headers: { 'CF-Connecting-IP': ip } });
  const ip = nextIp();
  assert.strictEqual(enforceRate(mk(ip), {}, 'unit', 2, 60000), null);
  assert.strictEqual(enforceRate(mk(ip), {}, 'unit', 2, 60000), null);
  const limited = enforceRate(mk(ip), {}, 'unit', 2, 60000);
  assert.ok(limited, 'expected a Response when over budget');
  assert.strictEqual(limited.status, 429);
});

// ------------------------------------------------------------------ helper glue
function applyTranslate(res, req) { return translateHandler(req, res); }
function applySemantic(res, req) { return semanticHandler(req, res); }

async function withKeyAsync(fn) {
  const prev = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'test-key-not-real';
  try { return await fn(); } finally {
    if (prev === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = prev;
  }
}

// repair handler is imported so that a broken import chain is caught here too
assert.strictEqual(typeof repairHandler, 'function');

console.log(`\n${failed === 0 ? '🎉' : '❌'} ${passed} passed, ${failed} failed.\n`);
process.exit(failed === 0 ? 0 : 1);
