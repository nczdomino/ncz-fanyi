// functions/api/translate.js - Cloudflare Pages Function Proxy for Google Gemini AI
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
  const { request, env } = context;

  // Common CORS headers
  const corsHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  };

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'GEMINI_API_KEY is not configured in Cloudflare Pages Environment Variables',
      }),
      { status: 503, headers: corsHeaders }
    );
  }

  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON request body' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { text, targetLang = 'vi', type = 'lenses' } = body || {};
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid "text" parameter' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const langName = targetLang === 'vi' ? 'Tiếng Việt' : (targetLang === 'ja' ? 'Tiếng Nhật' : 'Tiếng Anh');

    let prompt = '';
    if (type === 'full') {
      prompt = `Bạn là một chuyên gia dịch thuật cao cấp chuyên ngữ văn tiếng Trung. Hãy dịch toàn bộ văn bản sau sang ${langName} một cách chuẩn xác, nhuần nhuyễn, tự nhiên, giữ trọn vẹn ngữ cảnh và giữ nguyên cấu trúc phân đoạn văn bản:\n\n${text}\n\nCHÚ Ý: Chỉ xuất ra nội dung bản dịch hoàn chỉnh, không thêm lời chào, phần mở đầu hay giải thích gì thêm.`;
    } else {
      prompt = `Bạn là một chuyên gia dịch thuật tiếng Trung sang ${langName}. Hãy phân tích câu tiếng Trung sau và tạo ra 3 phiên bản dịch (3 lăng kính) phong phú, chính xác theo đúng ngữ cảnh:
1. "native": Phong cách thuần thục tự nhiên, văn phong nhuần nhuyễn, gọt giũa từ ngữ Hán Việt thô ráp thành cách diễn đạt đời thường tự nhiên nhất.
2. "genz": Phong cách trẻ trung, dí dỏm, bắt trend mạng xã hội/Douyin/Weibo nếu câu chứa từ lóng hoặc tiếng lóng internet.
3. "business": Phong cách công sở trang trọng, lịch thiệp, chuẩn mực dùng cho đàm phán, thư từ, hợp tác kinh doanh.

Câu tiếng Trung cần dịch: "${text}"

YÊU CẦU BẮT BUỘC: Trả về ĐÚNG một chuỗi JSON hợp lệ với cấu trúc sau, không kèm bất kỳ markdown hay text giải thích nào bên ngoài:
{
  "native": "Bản dịch phong cách tự nhiên",
  "genz": "Bản dịch phong cách giới trẻ mạng xã hội",
  "business": "Bản dịch phong cách công sở trang trọng"
}`;
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    };

    if (type !== 'full') {
      geminiBody.generationConfig.responseMimeType = 'application/json';
    }

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });

    if (!response.ok) {
      const errDetails = await response.text();
      return new Response(
        JSON.stringify({
          error: 'Google Gemini API responded with error',
          details: errDetails,
        }),
        { status: response.status, headers: corsHeaders }
      );
    }

    const data = await response.json();
    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (type === 'full') {
      return new Response(
        JSON.stringify({ result: outputText.trim() }),
        { status: 200, headers: corsHeaders }
      );
    }

    try {
      const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);
      return new Response(
        JSON.stringify({ lenses: parsed }),
        { status: 200, headers: corsHeaders }
      );
    } catch (parseErr) {
      return new Response(
        JSON.stringify({
          lenses: {
            native: outputText.trim(),
            genz: outputText.trim(),
            business: outputText.trim(),
          },
        }),
        { status: 200, headers: corsHeaders }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
