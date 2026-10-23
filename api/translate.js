// api/translate.js - Vercel Serverless Function Proxy for Google Gemini AI
export default async function handler(req, res) {
  // Setup CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured in Vercel environment variables'
    });
  }

  try {
    const { text, targetLang = 'vi', type = 'lenses' } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "text" parameter' });
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

    // Use gemini-1.5-flash for ultra fast & free quota
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048
      }
    };

    if (type !== 'full') {
      geminiBody.generationConfig.responseMimeType = 'application/json';
    }

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    if (!response.ok) {
      const errDetails = await response.text();
      return res.status(response.status).json({
        error: 'Google Gemini API responded with error',
        details: errDetails
      });
    }

    const data = await response.json();
    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (type === 'full') {
      return res.status(200).json({ result: outputText.trim() });
    }

    try {
      const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.status(200).json({ lenses: parsed });
    } catch (parseErr) {
      return res.status(200).json({
        lenses: {
          native: outputText.trim(),
          genz: outputText.trim(),
          business: outputText.trim()
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

