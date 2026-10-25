// functions/api/handwriting.js - Cloudflare Pages Function: Google Input Tools Handwriting Proxy
// LƯU Ý BẢO MẬT & PHÁP LÝ:
// Đây là endpoint proxy gọi API không chính thức (unofficial) của Google Input Tools.
// Google có thể thay đổi định dạng, áp dụng rate-limit hoặc chặn endpoint này bất cứ lúc nào.
// Engine trên client PHẢI dùng FallbackEngine để tự động quay về HanziLookup offline nếu proxy thất bại.
import { optionsResponse, jsonCorsHeaders, rejectOrigin, enforceRate, readJson } from '../_lib/http.js';

export async function onRequestOptions(context) {
  return optionsResponse(context.request, context.env);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = jsonCorsHeaders(request, env);

  if (rejectOrigin(request, env)) {
    return new Response(JSON.stringify({ error: 'ORIGIN_NOT_ALLOWED' }), {
      status: 403,
      headers: corsHeaders,
    });
  }

  // Cost control: this endpoint calls a paid upstream.
  const limited = enforceRate(request, env, 'handwriting', 60, 60000);
  if (limited) return limited;

  let body;
  try {
    const __parsed = await readJson(request, 262144);
    if (!__parsed.ok) {
      return new Response(JSON.stringify({ error: __parsed.reason }), {
        status: __parsed.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 400,
        headers: corsHeaders,
      });
    }
    body = __parsed.value;
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

  // Caps stop a single caller from turning this proxy into an amplification vector.
  const MAX_REQUESTS = 8;
  const MAX_STROKES = 64;
  const MAX_POINTS_PER_STROKE = 600;
  if (requests.length > MAX_REQUESTS) {
    return new Response(
      JSON.stringify({ success: false, error: 'TOO_MANY_REQUESTS_IN_PAYLOAD' }),
      { status: 400, headers: corsHeaders }
    );
  }

  // Chuẩn bị payload theo đúng format của Google Input Tools
  const googlePayload = {
    options: options === 'enable_pre_space' ? options : 'enable_pre_space',
    requests: requests.map(req => ({
      writing_guide: req && req.writing_guide
        ? {
            writing_area_width: Math.min(2048, Math.max(1, Number(req.writing_guide.writing_area_width) || 300)),
            writing_area_height: Math.min(2048, Math.max(1, Number(req.writing_guide.writing_area_height) || 300)),
          }
        : { writing_area_width: 300, writing_area_height: 300 },
      ink: (Array.isArray(req && req.ink) ? req.ink : []).slice(0, MAX_STROKES).map(stroke =>
        Array.isArray(stroke)
          ? stroke.slice(0, MAX_POINTS_PER_STROKE)
              .filter(pt => Array.isArray(pt) && pt.length >= 2)
              .map(pt => [Number(pt[0]) || 0, Number(pt[1]) || 0])
          : []
      ),
      language: (req && req.language) === 'zh_TW' ? 'zh_TW' : 'zh_CN',
      max_num_results: Math.min(20, Math.max(1, Number(req && req.max_num_results) || 10)),
    })),
  };

  try {
    const googleRes = await fetch(
      'https://inputtools.google.com/request?itc=zh-t-i0-handwriting&app=translate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'User-Agent': 'Mozilla/5.0 (Halou-Hanzi-Handwriting-Proxy)',
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

