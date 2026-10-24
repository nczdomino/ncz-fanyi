// functions/api/ocr.js - Cloudflare Pages Function Proxy for RapidOCR Service
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function onRequestGet(context) {
  const { env } = context;
  const isConfigured = Boolean(env && env.RAPIDOCR_API_URL);
  return new Response(
    JSON.stringify({
      status: 'ok',
      service: 'RapidOCR Proxy',
      configured: isConfigured,
      hint: isConfigured
        ? 'RapidOCR URL is configured.'
        : 'Set RAPIDOCR_API_URL in Cloudflare Pages Environment Variables to enable server-side RapidOCR.',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  };

  const ocrServiceUrl = (env && env.RAPIDOCR_API_URL) ? env.RAPIDOCR_API_URL.trim() : '';
  const ocrAuthToken = (env && (env.RAPIDOCR_API_KEY || env.RAPIDOCR_AUTH_TOKEN || env.RAPIDOCR_SECRET_KEY)) ? (env.RAPIDOCR_API_KEY || env.RAPIDOCR_AUTH_TOKEN || env.RAPIDOCR_SECRET_KEY).trim() : '';

  if (!ocrServiceUrl) {
    return new Response(
      JSON.stringify({
        success: false,
        configured: false,
        fallback: 'client',
        error: 'RAPIDOCR_NOT_CONFIGURED',
        message: 'Biến môi trường RAPIDOCR_API_URL chưa được cấu hình trên Cloudflare Pages. Hệ thống sẽ tự động dùng bộ nhận diện cục bộ.',
      }),
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let targetEndpoint = ocrServiceUrl;
    if (!targetEndpoint.endsWith('/ocr') && !targetEndpoint.endsWith('/api/ocr')) {
      targetEndpoint = targetEndpoint.replace(/\/+$/, '') + '/ocr';
    }

    const forwardHeaders = {};
    if (ocrAuthToken) {
      forwardHeaders['Authorization'] = `Bearer ${ocrAuthToken}`;
      forwardHeaders['X-API-Key'] = ocrAuthToken;
    }

    let fetchOptions = {
      method: 'POST',
      headers: forwardHeaders,
    };

    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (!body || !body.image) {
        return new Response(
          JSON.stringify({ success: false, error: 'Thiếu dữ liệu ảnh (image base64)' }),
          { status: 400, headers: corsHeaders }
        );
      }
      forwardHeaders['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(body);
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') || formData.get('image');
      if (!file) {
        return new Response(
          JSON.stringify({ success: false, error: 'Thiếu file ảnh tải lên' }),
          { status: 400, headers: corsHeaders }
        );
      }
      const outgoingFormData = new FormData();
      outgoingFormData.append('file', file);
      fetchOptions.body = outgoingFormData;
    } else {
      // Raw binary image
      const arrayBuffer = await request.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        return new Response(
          JSON.stringify({ success: false, error: 'Dữ liệu ảnh rỗng' }),
          { status: 400, headers: corsHeaders }
        );
      }
      const outgoingFormData = new FormData();
      outgoingFormData.append('file', new Blob([arrayBuffer]), 'image.jpg');
      fetchOptions.body = outgoingFormData;
    }

    // Set 25s timeout for OCR server response
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    fetchOptions.signal = controller.signal;

    let response;
    try {
      response = await fetch(targetEndpoint, fetchOptions);
    } catch (netErr) {
      clearTimeout(timeoutId);
      const isTimeout = netErr.name === 'AbortError';
      return new Response(
        JSON.stringify({
          success: false,
          configured: true,
          fallback: 'client',
          error: isTimeout ? 'OCR_TIMEOUT' : 'OCR_NETWORK_ERROR',
          message: isTimeout
            ? 'Dịch vụ RapidOCR phản hồi quá thời gian cho phép (25s).'
            : `Không thể kết nối đến máy chủ RapidOCR (${netErr.message}).`,
        }),
        { status: 502, headers: corsHeaders }
      );
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({
          success: false,
          configured: true,
          fallback: 'client',
          error: `HTTP_${response.status}`,
          message: `Dịch vụ RapidOCR trả về mã lỗi HTTP ${response.status}`,
          details: errText.slice(0, 500),
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const ocrData = await response.json();
    return new Response(
      JSON.stringify({
        success: true,
        engine: 'RapidOCR',
        lines: ocrData.lines || ocrData.data || ocrData.result || [],
        rawText: ocrData.rawText || ocrData.text || '',
        elapse_ms: ocrData.time_ms || ocrData.elapse || null,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INTERNAL_ERROR',
        message: err.message || 'Lỗi xử lý yêu cầu OCR trên Cloudflare Function',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
