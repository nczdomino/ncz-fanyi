// functions/api/translate.js - Cloudflare Pages Function Proxy for Google Gemini AI
import { optionsResponse, jsonCorsHeaders, rejectOrigin, enforceRate, readJson } from '../_lib/http.js';

// Best-effort per-instance cache for the automatic dictionary fallback (see api/translate.js).
const LOOKUP_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const LOOKUP_CACHE_MAX = 500;
const lookupCache = new Map();

function lookupCacheGet(key) {
  const hit = lookupCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > LOOKUP_CACHE_TTL_MS) {
    lookupCache.delete(key);
    return null;
  }
  return hit.value;
}

function lookupCacheSet(key, value) {
  lookupCache.set(key, { ts: Date.now(), value });
  if (lookupCache.size > LOOKUP_CACHE_MAX) {
    const oldest = lookupCache.keys().next().value;
    if (oldest !== undefined) lookupCache.delete(oldest);
  }
}

export async function onRequestOptions(context) {
  return optionsResponse(context.request, context.env);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Common CORS headers
  const corsHeaders = jsonCorsHeaders(request, env);

  if (rejectOrigin(request, env)) {
    return new Response(JSON.stringify({ error: 'ORIGIN_NOT_ALLOWED' }), {
      status: 403,
      headers: corsHeaders,
    });
  }

  // Cost control: this endpoint calls a paid upstream.
  const limited = enforceRate(request, env, 'translate', 30, 60000);
  if (limited) return limited;

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
      const __parsed = await readJson(request, 131072);
    if (!__parsed.ok) {
      return new Response(JSON.stringify({ error: __parsed.reason }), {
        status: __parsed.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 400,
        headers: corsHeaders,
      });
    }
    body = __parsed.value;
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON request body' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { text, targetLang = 'vi', type: rawType = 'lenses' } = body || {};
    // Never build the prompt from an attacker-controlled "type".
    const ALLOWED_TYPES = ['lenses', 'full', 'analyze_word', 'dict_lookup'];
    if (ALLOWED_TYPES.indexOf(rawType) === -1) {
      return new Response(JSON.stringify({ error: 'INVALID_TYPE' }), { status: 400, headers: corsHeaders });
    }
    const type = rawType;
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid "text" parameter' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (text.length > 25000) {
      return new Response(
        JSON.stringify({ error: 'Văn bản vượt quá giới hạn tối đa 25,000 ký tự.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const lang = (targetLang === 'ja' || targetLang === 'en') ? targetLang : 'vi';
    const isJa = lang === 'ja';
    const isEn = lang === 'en';
    const langName = isJa ? '日本語' : (isEn ? 'English' : 'Tiếng Việt');

    if (type === 'dict_lookup') {
      const cached = lookupCacheGet(lang + ':' + text.trim().toLowerCase());
      if (cached) {
        return new Response(
          JSON.stringify({ entry: cached, cached: true }),
          { status: 200, headers: corsHeaders }
        );
      }
    }

    let prompt = '';
    if (type === 'full') {
      if (isJa) {
        prompt = `あなたは中国語から日本語へのプロの翻訳者です。次の中国語の文章全体を、文脈やニュアンス、段落構造を忠実に保ちながら、極めて自然で流暢な日本語に翻訳してください:\n\n${text}\n\n注意: 挨拶や説明は一切含めず、翻訳結果の文章のみを出力してください。`;
      } else if (isEn) {
        prompt = `You are a professional Chinese-to-English translator. Translate the following Chinese text into fluent, accurate, and natural English, preserving all context, paragraph structure, and tone:\n\n${text}\n\nNote: Output only the translated text without any commentary or greetings.`;
      } else {
        prompt = `Bạn là một chuyên gia dịch thuật cao cấp chuyên ngữ văn tiếng Trung. Hãy dịch toàn bộ văn bản sau sang ${langName} một cách chuẩn xác, nhuần nhuyễn, tự nhiên, giữ trọn vẹn ngữ cảnh và giữ nguyên cấu trúc phân đoạn văn bản:\n\n${text}\n\nCHÚ Ý: Chỉ xuất ra nội dung bản dịch hoàn chỉnh, không thêm lời chào, phần mở đầu hay giải thích gì thêm.`;
      }
    } else if (type === 'dict_lookup') {
      if (isJa) {
        prompt = `あなたは中国語辞典です。次の見出し語を調べてください: "${text}"

有効なJSONのみを出力してください:
{"word":"${text}","pinyin":"ピンイン","partOfSpeech":"品詞","primaryMeaning":"主な日本語の意味","secondaryMeanings":["最大3つ"],"nuanceAndUsage":"ニュアンスを2〜3文で","formality":"口語/フォーマルなど","examples":[{"zh":"中国語例文","pinyin":"ピンイン","vi":"日本語訳"}],"synonymsAndDifferences":[{"word":"類義語","diff":"違い"}],"memoryTip":"覚え方"}

例文は3つ、類義語は3つまで。JSON以外は出力しないでください。`;
      } else if (isEn) {
        prompt = `You are a Chinese dictionary. Look up this headword: "${text}"

Return ONLY valid JSON:
{"word":"${text}","pinyin":"pinyin","partOfSpeech":"part of speech","primaryMeaning":"primary English meaning","secondaryMeanings":["max 3"],"nuanceAndUsage":"2-3 sentences of nuance and usage","formality":"casual/formal/etc","examples":[{"zh":"Chinese example","pinyin":"pinyin","vi":"English translation"}],"synonymsAndDifferences":[{"word":"synonym","diff":"difference"}],"memoryTip":"memory tip"}

Up to 3 examples and 3 synonyms. Output JSON only.`;
      } else {
        prompt = `Bạn là từ điển tiếng Trung. Tra mục từ: "${text}"

Chỉ trả về JSON hợp lệ:
{"word":"${text}","pinyin":"pinyin","partOfSpeech":"từ loại","primaryMeaning":"nghĩa tiếng Việt ngắn gọn","secondaryMeanings":["tối đa 3"],"nuanceAndUsage":"2-3 câu về sắc thái và cách dùng","formality":"khẩu ngữ/trang trọng...","examples":[{"zh":"câu tiếng Trung","pinyin":"pinyin","vi":"bản dịch tiếng Việt"}],"synonymsAndDifferences":[{"word":"từ gần nghĩa","diff":"khác biệt"}],"memoryTip":"mẹo nhớ"}

Tối đa 3 ví dụ và 3 từ gần nghĩa. Không thêm chữ nào ngoài JSON.`;
      }
    } else if (type === 'analyze_word') {
      if (isJa) {
        prompt = `あなたは中国語学習者のためのプロの辞書アシスタントです。
次の中国語の単語/成語を詳細に分析し、すべて自然な日本語で解説してください: "${text}"

解説すべき項目:
1. 主な日本語の意味および補足的な意味
2. 正確なピンインと品詞（名詞、動詞、形容詞、ネットスラングなど）
3. 使用される文脈、ニュアンス、フォーマル度（口語、SNS、改まったビジネスなど）
4. 実用的な例文（中国語・ピンイン・自然な日本語訳）2〜3つ
5. 類義語・対義語・ニュアンスの細かな使い分けの違い
6. 学習者がよく犯す間違い・注意点（もしあれば）
7. 覚え方のコツ（語源、部首・漢字の成り立ち、イメージなど）

必ず以下のJSONスキーマに従い、有効なJSONのみを出力してください:
{
  "word": "${text}",
  "pinyin": "ピンイン",
  "partOfSpeech": "品詞",
  "primaryMeaning": "主な日本語の意味",
  "secondaryMeanings": ["補足の意味1"],
  "nuanceAndUsage": "使用文脈とニュアンスの詳細",
  "formality": "フォーマル度（口語 / SNS / ビジネス など）",
  "examples": [
    {
      "zh": "中国語の例文1",
      "pinyin": "ピンイン",
      "vi": "自然な日本語訳"
    }
  ],
  "synonymsAndDifferences": [
    {
      "word": "類義語とピンイン",
      "diff": "ニュアンスや使い分けの違い"
    }
  ],
  "commonMistakes": "よくある間違いや注意点",
  "memoryTip": "覚え方のコツ・イメージ"
}`;
      } else if (isEn) {
        prompt = `You are an expert Chinese lexicographer and tutor.
Analyze the following Chinese word/phrase in depth, explaining everything in fluent English: "${text}"

Required breakdown:
1. Primary English meaning and secondary meanings (if any).
2. Pinyin and part of speech (noun, verb, adjective, slang, etc.).
3. Usage context, nuance, and formality (casual, social media, business, formal, etc.).
4. 2-3 real-world Chinese example sentences with accurate pinyin and natural English translations.
5. Synonyms, antonyms, and subtle differences in usage/connotation.
6. Common mistakes by learners (if any).
7. Mnemonic / memory tips to remember this word easily.

Strict requirement: Return ONLY a valid JSON object matching this schema:
{
  "word": "${text}",
  "pinyin": "pinyin",
  "partOfSpeech": "part of speech",
  "primaryMeaning": "primary English meaning",
  "secondaryMeanings": ["secondary meaning 1"],
  "nuanceAndUsage": "usage context and nuance",
  "formality": "formality level (Casual / Slang / Formal / Business)",
  "examples": [
    {
      "zh": "Chinese example sentence 1",
      "pinyin": "pinyin",
      "vi": "natural English translation"
    }
  ],
  "synonymsAndDifferences": [
    {
      "word": "synonym with pinyin",
      "diff": "nuance and usage difference"
    }
  ],
  "commonMistakes": "common learner mistakes",
  "memoryTip": "memory tip"
}`;
      } else {
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
      }
    } else {
      if (isJa) {
        prompt = `あなたは中国語から日本語へのプロの翻訳者です。次の中国語の文を文脈に応じて3つの異なるレンズ（スタイル）で日本語に翻訳してください:
1. "native": 自然な日常会話（不自然な直訳を避け、ネイティブが普段使う自然で流暢な日本語）
2. "genz": 若者言葉・ネットスラング（SNS、Weibo、Douyinのトレンド感や俗語を反映したくだけた口語表現）
3. "business": ビジネス敬語・改まった表現（公の場やビジネスメールで使える丁寧で礼儀正しい表現）

中国語文: "${text}"

必ず有効なJSONのみを出力してください:
{
  "native": "自然な日常表現の日本語訳",
  "genz": "若者言葉・ネットスラング風の日本語訳",
  "business": "ビジネス敬語・改まった日本語訳"
}`;
      } else if (isEn) {
        prompt = `You are a professional Chinese-to-English translator. Translate the following Chinese sentence into 3 distinct styles/lenses:
1. "native": Natural Casual (fluent, natural everyday English avoiding awkward word-for-word translation)
2. "genz": Gen Z & Social Media Slang (punchy, witty, capturing internet slang and modern idioms)
3. "business": Professional & Formal (courteous, corporate tone suitable for workplace and official correspondence)

Chinese text: "${text}"

Return ONLY a valid JSON object:
{
  "native": "Natural everyday English translation",
  "genz": "Gen Z / internet slang translation",
  "business": "Professional / formal corporate translation"
}`;
      } else {
        prompt = `Bạn là một chuyên gia dịch thuật tiếng Trung sang Tiếng Việt. Hãy phân tích câu tiếng Trung sau và tạo ra 3 phiên bản dịch (3 lăng kính) phong phú, chính xác theo đúng ngữ cảnh:
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
    }

    const geminiBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        // Uncapped output so dictionary cards are never cut mid-sentence.
        temperature: 0.3,
      },
    };

    if (type !== 'full') {
      geminiBody.generationConfig.responseMimeType = 'application/json';
    }

    // Try the cheaper "lite" model first for the automatic, high-volume lookup path.
    const CANDIDATE_MODELS = type === 'dict_lookup'
      ? ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest']
      : ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
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
      console.error('[translate] upstream failure', lastStatus, String(errDetails).slice(0, 300));
      return new Response(
        JSON.stringify({
          error: 'AI_API_ERROR',
          message: 'Dịch vụ AI tạm thời không phản hồi. Vui lòng thử lại sau.',
        }),
        { status: lastStatus === 429 ? 429 : 502, headers: corsHeaders }
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

    if (type === 'dict_lookup') {
      const cacheKey = lang + ':' + text.trim().toLowerCase();
      try {
        const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        const parsed = JSON.parse(cleanJson);
        lookupCacheSet(cacheKey, parsed);
        return new Response(
          JSON.stringify({ entry: parsed }),
          { status: 200, headers: corsHeaders }
        );
      } catch (parseErr) {
        const fallbackEntry = { word: text, primaryMeaning: outputText.trim() };
        lookupCacheSet(cacheKey, fallbackEntry);
        return new Response(
          JSON.stringify({ entry: fallbackEntry }),
          { status: 200, headers: corsHeaders }
        );
      }
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

