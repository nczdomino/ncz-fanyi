// functions/api/handwriting.js - Cloudflare Pages Function: Google Input Tools Handwriting Proxy
// LƯU Ý BẢO MẬT & PHÁP LÝ:
// Đây là endpoint proxy gọi API không chính thức (unofficial) của Google Input Tools.
// Google có thể thay đổi định dạng, áp dụng rate-limit hoặc chặn endpoint này bất cứ lúc nào.
// Engine trên client PHẢI dùng FallbackEngine để tự động quay về HanziLookup offline nếu proxy thất bại.

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function onRequestPost(context) {
  const { request } = context;

  const corsHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  };

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: 'INVALID_JSON', message: 'Payload JSON không hợp lệ' }),
      { status: 400, headers: corsHeaders }
    );
  }

  const { options, requests } = body || {};
  if (!requests || !Array.isArray(requests) || requests.length === 0) {
    return new Response(
      JSON.stringify({ success: false, error: 'MISSING_REQUESTS', message: 'Thiếu mảng requests nét vẽ ink' }),
      { status: 400, headers: corsHeaders }
    );
  }

  // Chuẩn bị payload theo đúng format của Google Input Tools
  const googlePayload = {
    options: options || 'enable_pre_space',
    requests: requests.map(req => ({
      writing_guide: req.writing_guide || {
        writing_area_width: 300,
        writing_area_height: 300,
      },
      ink: req.ink || [],
      language: req.language === 'zh_TW' ? 'zh_TW' : 'zh_CN',
      max_num_results: Math.min(20, Math.max(1, req.max_num_results || 10)),
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
      return new Response(
        JSON.stringify({
          success: false,
          error: 'UPSTREAM_HTTP_ERROR',
          status: googleRes.status,
          message: `Lỗi upstream Google Input Tools (${googleRes.status})`,
        }),
        { status: 502, headers: corsHeaders }
      );
    }

    const data = await googleRes.json();
    // Định dạng response của Google: ["SUCCESS", [ [ "iso_code", [ "你", "伯", ... ] ] ] ]
    if (Array.isArray(data) && data[0] === 'SUCCESS' && data[1] && data[1][0] && Array.isArray(data[1][0][1])) {
      const candidates = data[1][0][1];
      return new Response(
        JSON.stringify({
          success: true,
          candidates,
          raw: data,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'UNEXPECTED_RESPONSE',
        message: 'Cấu trúc phản hồi từ Google không đúng kỳ vọng',
        raw: data,
      }),
      { status: 502, headers: corsHeaders }
    );
  } catch (netErr) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'NETWORK_TIMEOUT',
        message: netErr.message || 'Không thể kết nối tới Google Input Tools',
      }),
      { status: 504, headers: corsHeaders }
    );
  }
}

