// api/handwriting.js - Vercel Serverless Function: Google Input Tools Handwriting Proxy
import { applyCors, rejectDisallowedOrigin, enforceRateLimit, readBody, noStore } from './_lib/http.js';
export default async function handler(req, res) {
  // Restricted CORS: this endpoint previously answered with `*` for every caller.
  applyCors(req, res, process.env);
  noStore(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (rejectDisallowedOrigin((req.headers && req.headers.origin) || '', req, process.env)) {
    return res.status(403).json({ error: 'ORIGIN_NOT_ALLOWED' });
  }

  // Cost control: this endpoint calls a paid upstream.
  if (enforceRateLimit(req, res, 'handwriting', 60, 60000)) return;

  const parsedBody = readBody(req, 256 * 1024);
  if (!parsedBody.ok) {
    return res.status(parsedBody.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 400)
      .json({ success: false, error: parsedBody.reason });
  }

  const { options, requests } = parsedBody.value || {};
  if (!requests || !Array.isArray(requests) || requests.length === 0) {
    return res.status(400).json({ success: false, error: 'MISSING_REQUESTS', message: 'Thiếu mảng requests nét vẽ ink' });
  }

  // Caps stop a single caller from turning this proxy into an amplification vector.
  const MAX_REQUESTS = 8;
  const MAX_STROKES = 64;
  const MAX_POINTS_PER_STROKE = 600;
  if (requests.length > MAX_REQUESTS) {
    return res.status(400).json({ success: false, error: 'TOO_MANY_REQUESTS_IN_PAYLOAD' });
  }

  const googlePayload = {
    options: options === 'enable_pre_space' ? options : 'enable_pre_space',
    requests: requests.map(r => ({
      writing_guide: r && r.writing_guide
        ? {
            writing_area_width: Math.min(2048, Math.max(1, Number(r.writing_guide.writing_area_width) || 300)),
            writing_area_height: Math.min(2048, Math.max(1, Number(r.writing_guide.writing_area_height) || 300)),
          }
        : { writing_area_width: 300, writing_area_height: 300 },
      ink: (Array.isArray(r && r.ink) ? r.ink : []).slice(0, MAX_STROKES).map(stroke =>
        Array.isArray(stroke)
          ? stroke.slice(0, MAX_POINTS_PER_STROKE)
              .filter(pt => Array.isArray(pt) && pt.length >= 2)
              .map(pt => [Number(pt[0]) || 0, Number(pt[1]) || 0])
          : []
      ),
      language: (r && r.language) === 'zh_TW' ? 'zh_TW' : 'zh_CN',
      max_num_results: Math.min(20, Math.max(1, Number(r && r.max_num_results) || 10)),
    })),
  };

  try {
    const googleRes = await fetch(
      'https://inputtools.google.com/request?itc=zh-t-i0-handwriting&app=translate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'User-Agent': 'Mozilla/5.0 (NCZ-Hanzi-Handwriting-Proxy)',
        },
        body: JSON.stringify(googlePayload),
      }
    );

    if (!googleRes.ok) {
      return res.status(502).json({
        success: false,
        error: 'UPSTREAM_HTTP_ERROR',
        status: googleRes.status,
      });
    }

    const data = await googleRes.json();
    if (Array.isArray(data) && data[0] === 'SUCCESS' && data[1] && data[1][0] && Array.isArray(data[1][0][1])) {
      return res.status(200).json({
        success: true,
        candidates: data[1][0][1],
      });
    }

    return res.status(502).json({
      success: false,
      error: 'UNEXPECTED_RESPONSE',
      raw: data,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      error: 'NETWORK_TIMEOUT',
      message: err.message,
    });
  }
}

