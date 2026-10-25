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

  const ocrServiceUrl = process.env.RAPIDOCR_API_URL ? process.env.RAPIDOCR_API_URL.trim() : '';
  const ocrAuthToken = (process.env.RAPIDOCR_API_KEY || process.env.RAPIDOCR_AUTH_TOKEN || process.env.RAPIDOCR_SECRET_KEY || '').trim();

  if (req.method === 'GET') {
    // No `configured` flag: an anonymous probe must not reveal whether the upstream
    // OCR service is wired up.
    return res.status(200).json({ status: 'ok', service: 'RapidOCR Proxy' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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

    const parsedBody = readBody(req, 8 * 1024 * 1024); // 8 MB base64 ceiling
    if (!parsedBody.ok) {
      return res.status(parsedBody.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 400).json({
        success: false,
        error: parsedBody.reason,
        fallback: 'client',
      });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);

    const backendResp = await fetch(targetEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(parsedBody.value || {}),
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
    console.error('[ocr] network error', err && err.message);
    return res.status(200).json({
      success: false,
      configured: true,
      fallback: 'client',
      error: 'NETWORK_ERROR',
      message: 'Không thể kết nối đến máy chủ RapidOCR',
    });
  }
}
