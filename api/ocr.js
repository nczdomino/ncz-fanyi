// api/ocr.js - Vercel Serverless Function Proxy for RapidOCR Service
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
  if (enforceRateLimit(req, res, 'ocr', 30, 60000)) return;

  if (!ocrServiceUrl) {
    return res.status(200).json({
      success: false,
      configured: false,
      fallback: 'client',
      error: 'RAPIDOCR_NOT_CONFIGURED',
      message: 'Biến môi trường RAPIDOCR_API_URL chưa được cấu hình. Hệ thống sẽ tự động chuyển sang nhận diện cục bộ.',
    });
  }

  try {
    let targetEndpoint = ocrServiceUrl;
    if (!targetEndpoint.endsWith('/ocr') && !targetEndpoint.endsWith('/api/ocr')) {
      targetEndpoint = targetEndpoint.replace(/\/+$/, '') + '/ocr';
    }

    const headers = { 'Content-Type': 'application/json' };
    if (ocrAuthToken) {
      headers['Authorization'] = `Bearer ${ocrAuthToken}`;
      headers['X-API-Key'] = ocrAuthToken;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);

    const backendResp = await fetch(targetEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body || {}),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!backendResp.ok) {
      // Upstream error bodies can contain internal host names and credential hints.
      console.error('[ocr] upstream HTTP', backendResp.status);
      return res.status(200).json({
        success: false,
        configured: true,
        fallback: 'client',
        error: `HTTP_${backendResp.status}`,
        message: 'Dịch vụ RapidOCR trả về lỗi',
      });
    }

    const data = await backendResp.json();
    return res.status(200).json({
      success: true,
      engine: 'RapidOCR',
      lines: data.lines || data.data || data.result || [],
      rawText: data.rawText || data.text || '',
      elapse_ms: data.time_ms || data.elapse || null,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      configured: true,
      fallback: 'client',
      error: 'NETWORK_ERROR',
      message: err.message || 'Không thể kết nối đến máy chủ RapidOCR',
    });
  }
}
