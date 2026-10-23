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
    } else if (type === 'analyze_word') {
      prompt = `Bạn là trợ lý từ điển tiếng Trung cao cấp dành cho người Việt học tiếng Trung.

Hãy phân tích chuyên sâu từ: "${text}"

Yêu cầu nội dung phân tích (bằng tiếng Việt):
1. Nghĩa tiếng Việt chính và các nghĩa phụ (nếu có).
2. Pinyin chuẩn và từ loại (danh từ, động từ, tính từ, từ lóng...).
3. Ngữ cảnh sử dụng, sắc thái (hài hước, tự trào, tiêu cực, tích cực...) và mức độ trang trọng (khẩu ngữ, mạng xã hội, văn viết, công sở...).
4. Hai đến ba câu ví dụ tiếng Trung kèm pinyin và bản dịch tiếng Việt thực tế.
5. Từ đồng nghĩa, trái nghĩa và sự khác biệt rõ nét trong cách dùng (so sánh sắc thái tinh tế).
6. Lỗi thường gặp của người học khi dùng từ này (nếu có).
7. Mẹo ghi nhớ từ vựng (chiết tự, hình ảnh, liên tưởng vui hoặc nguồn gốc từ).

Nếu từ có nhiều nghĩa, hãy phân biệt từng nghĩa rõ ràng. Không tự khẳng định thông tin chưa chắc chắn. Nếu thiếu ngữ cảnh để xác định nghĩa chính xác, hãy nói rõ.

YÊU CẦU BẮT BUỘC: Trả về ĐÚNG VÀ DUY NHẤT một chuỗi JSON hợp lệ theo schema sau (không kèm markdown bên ngoài):
{
  "word": "${text}",
  "pinyin": "phiên âm pinyin",
  "partOfSpeech": "từ loại",
  "primaryMeaning": "nghĩa tiếng Việt chính",
  "secondaryMeanings": ["nghĩa phụ 1"],
  "nuanceAndUsage": "ngữ cảnh sử dụng và sắc thái",
  "formality": "mức độ trang trọng (khẩu ngữ / mạng xã hội / trang trọng...)",
  "examples": [
    {
      "zh": "câu tiếng Trung ví dụ 1",
      "pinyin": "pinyin của câu",
      "vi": "bản dịch tiếng Việt thực tế"
    }
  ],
  "synonymsAndDifferences": [
    {
      "word": "từ gần nghĩa kèm pinyin",
      "diff": "sự khác biệt về sắc thái và cách dùng"
    }
  ],
  "commonMistakes": "lỗi người học hay mắc phải nếu có",
  "memoryTip": "mẹo ghi nhớ từ vựng"
}`;
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

    // Google API: gemini-3.5-flash is the verified active model
    const CANDIDATE_MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
    let response = null;
    let errDetails = '';
    let lastStatus = 500;

    for (const modelName of CANDIDATE_MODELS) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      try {
        const resp = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiBody),
        });
        if (resp.ok) {
          response = resp;
          break;
        } else {
          lastStatus = resp.status;
          errDetails = await resp.text();
        }
      } catch (fErr) {
        errDetails = fErr.message;
      }
    }

    if (!response || !response.ok) {
      return new Response(
        JSON.stringify({
          error: 'Google Gemini API responded with error',
          details: errDetails,
        }),
        { status: lastStatus || 500, headers: corsHeaders }
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

    if (type === 'analyze_word') {
      try {
        const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        const parsed = JSON.parse(cleanJson);
        return new Response(
          JSON.stringify({ analysis: parsed }),
          { status: 200, headers: corsHeaders }
        );
      } catch (parseErr) {
        return new Response(
          JSON.stringify({
            analysis: {
              word: text,
              primaryMeaning: outputText.trim(),
            },
          }),
          { status: 200, headers: corsHeaders }
        );
      }
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

