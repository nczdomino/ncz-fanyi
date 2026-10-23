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

    if (text.length > 25000) {
      return res.status(400).json({ error: 'Văn bản vượt quá giới hạn tối đa 25,000 ký tự.' });
    }

    const lang = targetLang || 'vi';
    const isJa = lang === 'ja';
    const isEn = lang === 'en';
    const langName = isJa ? '日本語' : (isEn ? 'English' : 'Tiếng Việt');

    let prompt = '';
    if (type === 'full') {
      if (isJa) {
        prompt = `あなたは中国語から日本語へのプロの翻訳者です。次の中国語の文章全体を、文脈やニュアンス、段落構造を忠実に保ちながら、極めて自然で流暢な日本語に翻訳してください:\n\n${text}\n\n注意: 挨拶や説明は一切含めず、翻訳結果の文章のみを出力してください。`;
      } else if (isEn) {
        prompt = `You are a professional Chinese-to-English translator. Translate the following Chinese text into fluent, accurate, and natural English, preserving all context, paragraph structure, and tone:\n\n${text}\n\nNote: Output only the translated text without any commentary or greetings.`;
      } else {
        prompt = `Bạn là một chuyên gia dịch thuật cao cấp chuyên ngữ văn tiếng Trung. Hãy dịch toàn bộ văn bản sau sang ${langName} một cách chuẩn xác, nhuần nhuyễn, tự nhiên, giữ trọn vẹn ngữ cảnh và giữ nguyên cấu trúc phân đoạn văn bản:\n\n${text}\n\nCHÚ Ý: Chỉ xuất ra nội dung bản dịch hoàn chỉnh, không thêm lời chào, phần mở đầu hay giải thích gì thêm.`;
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
        temperature: 0.3,
        maxOutputTokens: 2048
      }
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
          body: JSON.stringify(geminiBody)
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
        details: errDetails
      });
    }

    const data = await response.json();
    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (type === 'full') {
      return res.status(200).json({ result: outputText.trim() });
    }

    if (type === 'analyze_word') {
      try {
        const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        const parsed = JSON.parse(cleanJson);
        return res.status(200).json({ analysis: parsed });
      } catch (parseErr) {
        return res.status(200).json({
          analysis: {
            word: text,
            primaryMeaning: outputText.trim()
          }
        });
      }
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

