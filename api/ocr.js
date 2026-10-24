// api/ocr.js - Vercel Serverless Function Proxy for RapidOCR Service
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const ocrServiceUrl = process.env.RAPIDOCR_API_URL ? process.env.RAPIDOCR_API_URL.trim() : '';
  const ocrAuthToken = (process.env.RAPIDOCR_API_KEY || process.env.RAPIDOCR_AUTH_TOKEN || process.env.RAPIDOCR_SECRET_KEY || '').trim();

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      configured: Boolean(ocrServiceUrl),
      service: 'RapidOCR Proxy',
    });
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
      const errText = await backendResp.text();
      return res.status(200).json({
        success: false,
        configured: true,
        fallback: 'client',
        error: `HTTP_${backendResp.status}`,
        message: 'Dịch vụ RapidOCR trả về lỗi',
        details: errText.slice(0, 500),
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
