// api/ocr/repair.js - Vercel Serverless Function: Gemini OCR Text Repair
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    return res.status(503).json({
      success: false,
      error: 'GEMINI_KEY_MISSING',
      message: 'GEMINI_API_KEY chưa được cấu hình.',
    });
  }

  const { text, segments, context: surroundingContext } = req.body || {};
  const textToFix = (typeof text === 'string' && text.trim())
    ? text.trim()
    : (Array.isArray(segments) ? segments.map(s => typeof s === 'string' ? s : (s.text || '')).join('\n') : '');

  if (!textToFix) {
    return res.status(400).json({ success: false, error: 'EMPTY_TEXT', message: 'Không có văn bản cần sửa' });
  }

  if (textToFix.length > 4000) {
    return res.status(400).json({
      success: false,
      error: 'TEXT_TOO_LONG',
      message: 'Văn bản quá dài để sửa bằng AI một lần (tối đa 4,000 ký tự).',
    });
  }

  const systemInstructionText = `Bạn là công cụ phục hồi văn bản OCR tiếng Trung.

Nhiệm vụ duy nhất của bạn là sửa những lỗi nhận diện chữ và lỗi ngắt dòng có căn cứ rõ ràng.

Quy tắc:
1. Giữ nguyên ý nghĩa và nội dung gốc.
2. Không viết lại câu theo phong cách của bạn.
3. Không dịch sang ngôn ngữ khác.
4. Không tự ý thêm ví dụ, giải thích hoặc bình luận.
5. Không tự bịa chữ bị mất hoặc nội dung không nhìn thấy.
6. Không tự ý thay thế từ vựng chỉ vì một cách diễn đạt khác nghe tự nhiên hơn.
7. Khôi phục dấu câu chỉ khi có đủ căn cứ.
8. Ghép dòng khi chúng thuộc cùng một câu hoặc đoạn văn.
9. Giữ nguyên tiêu đề, số thứ tự, tên riêng, số liệu và các đoạn trích dẫn.
10. Nếu không chắc chắn về một chữ, hãy giữ nguyên văn bản OCR thay vì đoán.
11. Chỉ trả về văn bản đã xử lý, không kèm giải thích.
12. Nếu đoạn văn không cần sửa, trả về nguyên văn.`;

  let userPrompt = `Văn bản OCR tiếng Trung cần phục hồi:\n${textToFix}`;
  if (surroundingContext && typeof surroundingContext === 'string' && surroundingContext.length < 500) {
    userPrompt = `Ngữ cảnh xung quanh:\n${surroundingContext.trim()}\n\n` + userPrompt;
  }

  const geminiPayload = {
    system_instruction: {
      parts: [{ text: systemInstructionText }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 2048,
    }
  };

  const CANDIDATE_MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
  let geminiResp = null;
  let lastErr = '';
  let lastStatus = 500;

  for (const model of CANDIDATE_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      });
      if (resp.ok) {
        geminiResp = resp;
        break;
      } else {
        lastStatus = resp.status;
        lastErr = await resp.text();
      }
    } catch (e) {
      lastErr = e.message;
    }
  }

  if (!geminiResp || !geminiResp.ok) {
    return res.status(lastStatus || 500).json({
      success: false,
      error: 'GEMINI_CALL_FAILED',
      message: 'Google Gemini API trả về lỗi',
      details: lastErr.slice(0, 500),
    });
  }

  const data = await geminiResp.json();
  const repairedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const usage = data?.usageMetadata || null;

  return res.status(200).json({
    success: true,
    repairedText: repairedText.trim(),
    tokens: usage
      ? {
          prompt: usage.promptTokenCount || 0,
          candidates: usage.candidatesTokenCount || 0,
          total: usage.totalTokenCount || 0,
        }
      : null,
  });
}
