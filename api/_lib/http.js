// api/_lib/http.js - Shared hardening helpers for the serverless endpoints.
//
// Why this exists:
//   * every endpoint used to send `Access-Control-Allow-Origin: *` together with
//     `Access-Control-Allow-Credentials: true` (an invalid pair) and with no origin
//     allow-list at all, so any website could spend this project's Gemini / OCR quota;
//   * there was no rate limiting whatsoever on endpoints that cost real money;
//   * request shapes were forwarded upstream without any size or item-count cap.
//
// Configure the allowed origins with the ALLOWED_ORIGINS environment variable
// (comma separated, e.g. "https://halouzhongwen.com,https://ncz-fanyi.pages.dev").
// Same-origin requests are always allowed, so a default deployment keeps working.

const DEFAULT_BODY_LIMIT = 96 * 1024; // 96 KB

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

function requestHost(req) {
  const h = (req && req.headers && (req.headers.host || req.headers['x-forwarded-host'])) || '';
  return String(h).toLowerCase();
}

/**
 * Decide whether an Origin may call this endpoint.
 * Returns the value to echo in Access-Control-Allow-Origin, or '' for no CORS header.
 */
export function resolveOrigin(origin, req, env) {
  if (!origin) return ''; // same-origin / non-browser clients: no CORS header needed
  const allowed = parseOrigins(env);
  if (allowed.includes('*')) return '*';
  if (allowed.includes(origin)) return origin;
  if (origin !== 'null' && hostOf(origin) && hostOf(origin) === requestHost(req)) return origin;
  return '';
}

/** Apply safe CORS headers to a Vercel-style (req, res) pair. */
export function applyCors(req, res, env) {
  const origin = (req.headers && req.headers.origin) || '';
  const allow = resolveOrigin(origin, req, env);
  if (allow) {
    res.setHeader('Access-Control-Allow-Origin', allow);
    if (allow !== '*') res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  return allow;
}

/** Reject a request whose Origin is not allowed. */
export function rejectDisallowedOrigin(origin, req, env) {
  if (!origin) return false;
  return resolveOrigin(origin, req, env) === '';
}

// ---------------------------------------------------------------- rate limiting
// Best-effort, per-instance fixed window. Serverless instances do not share memory, so
// this is a speed bump against casual abuse, not a global quota. For a hard quota put
// a WAF / API-gateway rule in front of these routes.
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
    // Still oversized (traffic spike): drop the oldest entries.
    if (buckets.size > MAX_BUCKETS) {
      const firstKey = buckets.keys().next().value;
      if (firstKey !== undefined) buckets.delete(firstKey);
    }
  }

  return {
    ok: b.count <= limit,
    remaining: Math.max(0, limit - b.count),
    retryAfter: Math.max(1, Math.ceil((windowMs - (now - b.start)) / 1000)),
  };
}

export function clientIp(req) {
  const h = (req && req.headers) || {};
  const fwd = h['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  if (h['cf-connecting-ip']) return String(h['cf-connecting-ip']).trim();
  if (h['x-real-ip']) return String(h['x-real-ip']).trim();
  return (req && req.socket && req.socket.remoteAddress) || 'unknown';
}

/** Apply a rate limit and return true when the request must be rejected. */
export function enforceRateLimit(req, res, name, limit, windowMs) {
  const key = name + ':' + clientIp(req);
  const rl = rateLimit(key, limit, windowMs);
  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(rl.remaining));
  if (rl.ok) return false;
  res.setHeader('Retry-After', String(rl.retryAfter));
  res.status(429).json({
    error: 'RATE_LIMITED',
    message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.',
    retryAfter: rl.retryAfter,
  });
  return true;
}

// ------------------------------------------------------------------ utilities
export function clampString(value, maxLen) {
  if (typeof value !== 'string') return '';
  const v = value.trim();
  return v.length > maxLen ? v.slice(0, maxLen) : v;
}

/** Defensive JSON body reader: rejects oversized or malformed payloads. */
export function readBody(req, limit = DEFAULT_BODY_LIMIT) {
  const body = req && req.body;
  if (body === undefined || body === null) return { ok: true, value: {} };
  if (typeof body === 'string') {
    if (body.length > limit) return { ok: false, reason: 'PAYLOAD_TOO_LARGE' };
    try {
      return { ok: true, value: JSON.parse(body) };
    } catch (e) {
      return { ok: false, reason: 'INVALID_JSON' };
    }
  }
  if (typeof body === 'object') {
    let size = 0;
    try {
      size = JSON.stringify(body).length;
    } catch (e) {
      return { ok: false, reason: 'INVALID_JSON' };
    }
    if (size > limit) return { ok: false, reason: 'PAYLOAD_TOO_LARGE' };
    return { ok: true, value: body };
  }
  return { ok: false, reason: 'INVALID_JSON' };
}

export function noStore(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

/**
 * Never forward a raw upstream error body to the client.
 * Upstream payloads can contain key fragments, quota details and internal hints.
 */
export function upstreamError(res, status, publicMessage) {
  return res.status(status || 502).json({
    error: 'UPSTREAM_ERROR',
    message: publicMessage || 'Dịch vụ AI tạm thời không phản hồi. Vui lòng thử lại.',
  });
}

export { DEFAULT_BODY_LIMIT };
