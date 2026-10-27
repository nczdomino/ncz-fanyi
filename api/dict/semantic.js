// api/dict/semantic.js - Vercel Serverless Function Proxy for AI Semantic Reverse Dictionary Search
import { applyCors, rejectDisallowedOrigin, enforceRateLimit, readBody, noStore } from '../_lib/http.js';

// Best-effort per-instance cache for the automatic fallback. A warm instance answers
// repeated queries for free; the browser also caches them for 30 days.
const SEMANTIC_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const SEMANTIC_CACHE_MAX = 300;
const semanticCache = new Map();

function semanticCacheGet(key) {
  const hit = semanticCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > SEMANTIC_CACHE_TTL_MS) {
    semanticCache.delete(key);
    return null;
  }
  return hit.value;
}

function semanticCacheSet(key, value) {
  semanticCache.set(key, { ts: Date.now(), value });
  if (semanticCache.size > SEMANTIC_CACHE_MAX) {
    const oldest = semanticCache.keys().next().value;
    if (oldest !== undefined) semanticCache.delete(oldest);
  }
}

export default async function handler(req, res) {
  // Restricted CORS: this endpoint previously answered with `*` for every caller.
  applyCors(req, res, process.env);
  noStore(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (rejectDisallowedOrigin((req.headers && req.headers.origin) || '', req, process.env)) {
    return res.status(403).json({ error: 'ORIGIN_NOT_ALLOWED' });
  }

  // Cost control: this endpoint calls a paid upstream.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  if (enforceRateLimit(req, res, 'semantic', 20, 60000)) return;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured in Vercel environment variables'
    });
  }

  try {
    const parsedBody = readBody(req, 32 * 1024);
    if (!parsedBody.ok) {
      return res.status(parsedBody.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 400)
        .json({ error: parsedBody.reason });
    }

    const { query, targetLang = 'vi', fast = false } = parsedBody.value || {};
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Missing or invalid "query" parameter' });
    }

    const cleanQuery = query.trim().slice(0, 300);
    const lang = (targetLang === 'ja' || targetLang === 'en') ? targetLang : 'vi';
    const isJa = lang === 'ja';
    const isEn = lang === 'en';
    const isFast = fast === true;

    const cacheKey = lang + ':' + (isFast ? 'f:' : 'n:') + cleanQuery.toLowerCase();
    const cached = semanticCacheGet(cacheKey);
    if (cached) {
      return res.status(200).json({
        success: true,
        concept: cached.concept,
        matches: cached.matches,
        cached: true,
        model: 'cache',
      });
    }

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

    // Automatic fallback: ask for a handful of concise matches. The output is uncapped
    // so the JSON answer is never cut off mid-object.
    if (isFast) {
      prompt += isJa
        ? '\n\n最も適切な4件を返し、各項目は簡潔にしてください。'
        : (isEn
          ? '\n\nReturn the 4 best matches and keep every field concise.'
          : '\n\nTrả về 4 kết quả phù hợp nhất và giữ mỗi trường ngắn gọn.');
    }

    const geminiBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        // Uncapped output: the fast path asks for 4 concise matches, but the answer
        // must never be truncated mid-JSON.
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    };

    // The automatic fallback is a retrieval task. Explicitly asking for minimal
    // thinking avoids the 10-20s "medium" detour on Gemini 3.5 Flash.
    if (isFast) {
      geminiBody.generationConfig.thinkingConfig = { thinkingLevel: 'minimal' };
    }

    // Production measurement: flash-lite was slower than flash for this structured
    // JSON prompt (24-33s vs 18s), so fast mode starts with flash.
    const CANDIDATE_MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
    let response = null;
    let usedModel = '';
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
          usedModel = modelName;
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
      console.error('[semantic] upstream failure', lastStatus, String(errDetails).slice(0, 300));
      return res.status(lastStatus === 429 ? 429 : 502).json({
        error: 'AI_API_ERROR',
        message: 'Dịch vụ AI tạm thời không phản hồi. Vui lòng thử lại sau.',
      });
    }

    const data = await response.json();
    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    try {
      const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);
      const concept = parsed.concept || cleanQuery;
      const matches = Array.isArray(parsed.matches) ? parsed.matches : [];
      semanticCacheSet(cacheKey, { concept, matches });
      return res.status(200).json({
        success: true,
        concept,
        matches,
        model: usedModel,
        usage: data.usageMetadata || null,
      });
    } catch (parseErr) {
      return res.status(500).json({
        error: 'Failed to parse AI JSON response',
        raw: outputText,
      });
    }
  } catch (error) {
    console.error('[semantic] internal error', error && error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

