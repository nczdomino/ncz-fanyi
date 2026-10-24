// api/handwriting.js - Vercel Serverless Function: Google Input Tools Handwriting Proxy
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'METHOD_NOT_ALLOWED' });
  }

  const { options, requests } = req.body || {};
  if (!requests || !Array.isArray(requests) || requests.length === 0) {
    return res.status(400).json({ success: false, error: 'MISSING_REQUESTS', message: 'Thiếu mảng requests nét vẽ ink' });
  }

  const googlePayload = {
    options: options || 'enable_pre_space',
    requests: requests.map(r => ({
      writing_guide: r.writing_guide || { writing_area_width: 300, writing_area_height: 300 },
      ink: r.ink || [],
      language: r.language === 'zh_TW' ? 'zh_TW' : 'zh_CN',
      max_num_results: Math.min(20, Math.max(1, r.max_num_results || 10)),
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

