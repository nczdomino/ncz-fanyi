// functions/_lib/http.js - Shared hardening helpers for the Cloudflare Pages Functions.
//
// Mirrors api/_lib/http.js. Every endpoint used to answer with
// `Access-Control-Allow-Origin: *` and no rate limit, so any website could spend this
// project's Gemini quota. Set ALLOWED_ORIGINS (comma separated) in the Pages project
// environment to restrict callers; same-origin requests are always allowed.

const DEFAULT_BODY_LIMIT = 96 * 1024;

export function parseOrigins(env) {
  const raw = (env && env.ALLOWED_ORIGINS) || '';
  return String(raw).split(',').map((s) => s.trim()).filter(Boolean);
}

function hostOf(value) {
  try {
    return new URL(value).host.toLowerCase();
  } catch (e) {
    return '';
  }
}

export function resolveOrigin(request, env) {
  const origin = (request && request.headers && request.headers.get('Origin')) || '';
  if (!origin) return '';
  const allowed = parseOrigins(env);
  if (allowed.includes('*')) return '*';
  if (allowed.includes(origin)) return origin;
  let requestHost = '';
  try {
    requestHost = new URL(request.url).host.toLowerCase();
  } catch (e) {
    requestHost = '';
  }
  if (origin !== 'null' && hostOf(origin) && hostOf(origin) === requestHost) return origin;
  return '';
}

export function jsonCorsHeaders(request, env) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };
  const allow = resolveOrigin(request, env);
  if (allow) {
    headers['Access-Control-Allow-Origin'] = allow;
    if (allow !== '*') headers['Vary'] = 'Origin';
  }
  return headers;
}

export function optionsResponse(request, env) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };
  const allow = resolveOrigin(request, env);
  if (allow) {
    headers['Access-Control-Allow-Origin'] = allow;
    if (allow !== '*') headers['Vary'] = 'Origin';
  }
  return new Response(null, { status: 204, headers });
}

export function rejectOrigin(request, env) {
  const origin = (request && request.headers && request.headers.get('Origin')) || '';
  if (!origin) return false;
  return resolveOrigin(request, env) === '';
}

// Best-effort per-isolate fixed window. Cloudflare runs many isolates, so this is a
// speed bump, not a global quota. Use Cloudflare Rate Limiting rules for a hard cap.
const buckets = new Map();
const MAX_BUCKETS = 5000;

export function rateLimit(bucketKey, limit, windowMs) {
  const now = Date.now();
  let b = buckets.get(bucketKey);
  if (!b || now - b.start >= windowMs) {
    b = { start: now, count: 0 };
    buckets.set(bucketKey, b);
  }
  b.count += 1;
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, v] of buckets) {
      if (now - v.start >= windowMs) buckets.delete(k);
    }
    if (buckets.size > MAX_BUCKETS) {
      const firstKey = buckets.keys().next().value;
      if (firstKey !== undefined) buckets.delete(firstKey);
    }
  }
  return {
    ok: b.count <= limit,
    retryAfter: Math.max(1, Math.ceil((windowMs - (now - b.start)) / 1000)),
  };
}

export function clientIp(request) {
  return (request.headers.get('CF-Connecting-IP') ||
    (request.headers.get('X-Forwarded-For') || '').split(',')[0].trim() ||
    'unknown');
}

/** Returns a 429 Response when over budget, otherwise null. */
export function enforceRate(request, env, name, limit, windowMs) {
  const r = rateLimit(name + ':' + clientIp(request), limit, windowMs);
  if (r.ok) return null;
  return new Response(
    JSON.stringify({
      error: 'RATE_LIMITED',
      message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.',
      retryAfter: r.retryAfter,
    }),
    {
      status: 429,
      headers: Object.assign(jsonCorsHeaders(request, env), { 'Retry-After': String(r.retryAfter) }),
    }
  );
}

/** Read and size-check a JSON request body. */
export async function readJson(request, limit = DEFAULT_BODY_LIMIT) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared && declared > limit) return { ok: false, reason: 'PAYLOAD_TOO_LARGE' };
  let raw;
  try {
    raw = await request.text();
  } catch (e) {
    return { ok: false, reason: 'INVALID_JSON' };
  }
  if (raw.length > limit) return { ok: false, reason: 'PAYLOAD_TOO_LARGE' };
  try {
    return { ok: true, value: raw ? JSON.parse(raw) : {} };
  } catch (e) {
    return { ok: false, reason: 'INVALID_JSON' };
  }
}

export { DEFAULT_BODY_LIMIT };
