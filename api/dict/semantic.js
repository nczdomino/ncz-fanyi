// api/dict/semantic.js - Vercel Serverless Function Proxy for AI Semantic Reverse Dictionary Search
export default async function handler(req, res) {
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
    const { query, targetLang = 'vi' } = req.body || {};
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Missing or invalid "query" parameter' });
    }

    const cleanQuery = query.trim().slice(0, 300);
    const lang = targetLang || 'vi';
    const isJa = lang === 'ja';
    const isEn = lang === 'en';

    let prompt = '';
    if (isJa) {
      prompt = `あなたは中国語語彙の専門家です。ユーザーが入力した以下の説明・文脈・ニュアンスに最も合致する中国語の単語・成語・表現を3〜5個厳選して提案してください。
ユーザーの検索クエリ: "${cleanQuery}"

必ず以下のJSONスキーマに従い、有効なJSONのみを出力してください:
{
  "concept": "クエリが表す概念の簡潔なまとめ",
  "matches": [
    {
      "word": "中国語の単語（漢字）",
      "pinyin": "ピンイン（声調付き）",
      "meaning": "自然な日本語の意味",
      "nuance": "使われるニュアンス・文脈",
      "hsk": "HSKレベル（例: HSK 1〜6、または成語 / スラング）",
      "example": "短い実用的な中国語例文（ピンインと日本語訳付き）"
    }
  ]
}`;
    } else if (isEn) {
      prompt = `You are an expert Chinese lexicographer. Based on the user's description, context, or feeling below, suggest 3 to 5 best-fitting Chinese words, idioms, or colloquial expressions.
User search query: "${cleanQuery}"

Strict requirement: Return ONLY a valid JSON object matching this schema:
{
  "concept": "Brief title of the searched concept",
  "matches": [
    {
      "word": "Chinese word/phrase in Hanzi",
      "pinyin": "accurate pinyin with tone marks",
      "meaning": "natural English definition",
      "nuance": "connotation, register, and usage context",
      "hsk": "HSK level (e.g. HSK 1-6, Idiom, or Slang)",
      "example": "short practical example sentence with pinyin and translation"
    }
  ]
}`;
    } else {
      prompt = `Bạn là một chuyên gia ngữ văn và từ điển học tiếng Trung. Dựa trên mô tả, cảm xúc, ngữ cảnh hoặc ý định của người dùng dưới đây, hãy gợi ý 3 đến 5 từ vựng, thành ngữ hoặc cách diễn đạt tiếng Trung chuẩn xác và tự nhiên nhất.
Mô tả người dùng tìm kiếm: "${cleanQuery}"

YÊU CẦU BẮT BUỘC: Trả về ĐÚNG định dạng JSON hợp lệ theo schema sau, không kèm bất kỳ giải thích nào bên ngoài:
{
  "concept": "Tóm tắt ngắn gọn khái niệm đang tìm kiếm",
  "matches": [
    {
      "word": "Chữ Hán chuẩn xác",
      "pinyin": "Phiên âm pinyin có dấu chuẩn",
      "meaning": "Nghĩa tiếng Việt tự nhiên, chuẩn mực",
      "nuance": "Sắc thái biểu cảm và hoàn cảnh sử dụng",
      "hsk": "Cấp độ (ví dụ: HSK 1-6, Thành ngữ, hoặc Slang)",
      "example": "Câu ví dụ thực tế ngắn kèm pinyin và dịch nghĩa"
    }
  ]
}`;
    }

    const geminiBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    };

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
      return res.status(lastStatus || 500).json({
        error: 'AI API responded with error',
        details: errDetails,
      });
    }

    const data = await response.json();
    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    try {
      const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.status(200).json({
        success: true,
        concept: parsed.concept || cleanQuery,
        matches: Array.isArray(parsed.matches) ? parsed.matches : [],
      });
    } catch (parseErr) {
      return res.status(500).json({
        error: 'Failed to parse AI JSON response',
        raw: outputText,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
