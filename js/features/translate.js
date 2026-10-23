// js/features/translate.js - Online translation service with DB caching & 3-Lens Translation System - Dependencies: js/core/state.js, js/core/storage.js, js/core/db.js

// --- Module: Translation API ---
// Thử Google Translate unofficial trước (chất lượng cao hơn cho idiom/slang)
// Fallback sang MyMemory nếu bị block
async function translateTextOnline(text, targetLang) {
  if (!text) return '';
  const langMap = { vi: 'vi', en: 'en', ja: 'ja' };
  const tl = langMap[targetLang] || 'en';
  const cacheKey = tl + ':' + text;

  // 1. Kiểm tra từ điển người dùng tự sửa (ưu tiên cao nhất)
  const userDict = getUserDict();
  const userKey = targetLang + ':' + text;
  if (userDict[userKey]) return userDict[userKey];

  // 2. Kiểm tra cache RAM
  if (state.cachedTranslations[cacheKey]) return state.cachedTranslations[cacheKey];

  // 3. Kiểm tra cache IndexedDB
  const fromDB = await getFromDB('translations', cacheKey);
  if (fromDB && fromDB.result) {
    state.cachedTranslations[cacheKey] = fromDB.result;
    return fromDB.result;
  }

  // 4. Gọi Google Translate unofficial (chất lượng tốt hơn cho idiom/slang)
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text);
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      // Kết quả nằm ở data[0][*][0], ghép lại
      let result = '';
      if (Array.isArray(data[0])) {
        result = data[0].map(seg => (seg && seg[0]) ? seg[0] : '').join('');
      }
      if (result) {
        state.cachedTranslations[cacheKey] = result;
        await putToDB('translations', { q: cacheKey, result });
        return result;
      }
    }
  } catch (e1) {
    console.warn('Google Translate unofficial failed, trying MyMemory', e1);
  }

  // 5. Fallback: MyMemory
  try {
    const langPair = tl === 'vi' ? 'zh|vi' : (tl === 'ja' ? 'zh|ja' : 'zh|en');
    const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + langPair;
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let result = data.responseData.translatedText;
        if (result.includes('MYMEMORY WARNING')) result = result.split('\n')[0];
        if (result) {
          state.cachedTranslations[cacheKey] = result;
          await putToDB('translations', { q: cacheKey, result });
          return result;
        }
      }
    }
  } catch (e2) {
    console.warn('MyMemory also failed', e2);
  }
  return '';
}

// ===== MODULE: 3-LENS TRANSLATION ENGINE (HỆ THỐNG DỊCH 3 LĂNG KÍNH ĐỘT PHÁ) =====
// Lăng kính 1: 🌱 Thuần Việt Tự Nhiên (Native Casual)
// Lăng kính 2: 🔥 Gen Z & Mạng Xã Hội (Netizen & Slang)
// Lăng kính 3: 👔 Công Sở & Thương Mại (Business & Formal)

const VI_WORD_BOUNDARY_CHARS = "a-zA-Z0-9àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ_";

function replaceViWord(str, word, repl) {
  if (!str) return "";
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(?<![${VI_WORD_BOUNDARY_CHARS}])${esc}(?![${VI_WORD_BOUNDARY_CHARS}])`, "gi");
  return str.replace(regex, repl);
}

function cleanNativeVi(vi) {
  if (!vi) return "";
  let s = vi.trim();
  s = replaceViWord(s, "của một cái gì đó", "của thứ gì đó");
  s = replaceViWord(s, "của một", "của");
  s = replaceViWord(s, "một cách rất", "rất");
  s = replaceViWord(s, "ở tại", "ở");
  s = replaceViWord(s, "được một", "được");
  s = replaceViWord(s, "cái này", "điều này");
  return s;
}

function generateThreeLenses(zh, baseTrans, lang) {
  if (!baseTrans) return null;
  const isVi = !lang || lang === 'vi';

  if (!isVi) {
    const isJa = lang === 'ja';
    return {
      native: {
        id: 'native',
        badge: isJa ? '🌱 日常・自然' : '🌱 Natural Casual',
        title: isJa ? '自然な日常会話' : 'Natural Casual',
        desc: isJa ? '自然な日常表現' : 'Everyday fluent expression',
        text: baseTrans,
        color: '#10B981'
      },
      genz: {
        id: 'genz',
        badge: isJa ? '🔥 若者言葉・流行語' : '🔥 Gen Z & Slang',
        title: isJa ? 'ネット流行語・スラング' : 'Gen Z & Netizen',
        desc: isJa ? 'SNS・最新トレンド' : 'Trendy social media tone',
        text: baseTrans,
        color: '#F59E0B'
      },
      business: {
        id: 'business',
        badge: isJa ? '👔 ビジネス・敬語' : '👔 Business & Formal',
        title: isJa ? 'ビジネス・敬語表現' : 'Business & Formal',
        desc: isJa ? '礼儀正しい公の表現' : 'Polite corporate tone',
        text: baseTrans,
        color: '#3B82F6'
      }
    };
  }

  // 1. LĂNG KÍNH 1: Thuần Việt Tự Nhiên (Native Casual)
  let native = cleanNativeVi(baseTrans);

  // 2. LĂNG KÍNH 2: Gen Z & Mạng Xã Hội (Netizen & Slang)
  let genz = native;
  // Bóc tách & chuyển hóa các từ lóng Douyin / Weibo / mạng xã hội
  if (/破防/g.test(zh)) { genz = replaceViWord(genz, "thất vọng", "sang chấn tâm lý luôn á"); genz = replaceViWord(genz, "suy sụp", "sang chấn tâm lý"); }
  if (/躺平/g.test(zh)) { genz = replaceViWord(genz, "nằm im", "nằm yên mặc kệ sự đời"); genz = replaceViWord(genz, "nằm thẳng", "nằm yên kệ đời"); }
  if (/吃瓜/g.test(zh)) { genz = replaceViWord(genz, "hóng chuyện", "hóng drama biến căng"); genz = replaceViWord(genz, "ăn dưa", "hóng drama"); }
  if (/内卷/g.test(zh)) { genz = replaceViWord(genz, "cạnh tranh", "cày bục mặt cạnh tranh"); }
  if (/凡尔赛/g.test(zh)) { genz = replaceViWord(genz, "khoe khoang", "flex kín"); }
  if (/打工人/g.test(zh)) { genz = replaceViWord(genz, "người lao động", "phận làm thuê culi"); genz = replaceViWord(genz, "công nhân", "kiếp cày thuê"); }
  if (/毙了/g.test(zh)) { genz = replaceViWord(genz, "hủy", "gạt phăng luôn"); genz = replaceViWord(genz, "bác bỏ", "gạt phăng luôn"); }
  if (/无语/g.test(zh)) { genz = replaceViWord(genz, "cạn lời", "cạn lời sa mạc lời"); genz = replaceViWord(genz, "không nói nên lời", "sa mạc lời"); }
  if (/真香/g.test(zh)) { genz = replaceViWord(genz, "thơm thật", "quay xe cực gắt"); }
  if (/牛逼|太牛了/g.test(zh)) { genz = replaceViWord(genz, "rất giỏi", "đỉnh nóc kịch trần"); genz = replaceViWord(genz, "tuyệt vời", "đỉnh chóp vippro"); }
  if (/绝了/g.test(zh)) { genz = replaceViWord(genz, "tuyệt vời", "10 điểm không có nhưng"); }
  if (/太难了/g.test(zh)) { genz = replaceViWord(genz, "quá khó", "kiếp nạn thứ 82 thực sự"); }
  if (/笑死/g.test(zh)) { genz = replaceViWord(genz, "buồn cười chết mất", "cười ẻ xỉu ngang"); genz = replaceViWord(genz, "cười chết", "cười ẻ luôn á"); }
  if (/翻车/g.test(zh)) { genz = replaceViWord(genz, "lật xe", "bể kèo toang nặng"); genz = replaceViWord(genz, "thất bại", "toang nặng"); }
  if (/网红/g.test(zh)) { genz = replaceViWord(genz, "người nổi tiếng trên mạng", "idol tóp tóp"); genz = replaceViWord(genz, "hot girl", "idol tóp tóp"); }
  if (/大佬/g.test(zh)) { genz = replaceViWord(genz, "ông trùm", "trùm cuối đại thần"); genz = replaceViWord(genz, "chuyên gia", "đại thần"); }
  if (/菜鸟/g.test(zh)) { genz = replaceViWord(genz, "người mới", "chiếu mới gà mờ"); }
  if (/秒杀/g.test(zh)) { genz = replaceViWord(genz, "giết chết trong giây lát", "out trình trong 1 nốt nhạc"); }
  if (/拉胯/g.test(zh)) { genz = replaceViWord(genz, "kém cỏi", "xu cà na phế toàn tập"); genz = replaceViWord(genz, "thất vọng", "xu cà na"); }
  if (/白嫖/g.test(zh)) { genz = replaceViWord(genz, "miễn phí", "xài chùa đỉnh nóc"); }
  if (/栓Q|拴Q/g.test(zh)) { genz = replaceViWord(genz, "cảm ơn", "cảm ơn nhiều (cay cú thật sự)"); }
  if (/芭比Q|芭比q/g.test(zh)) { genz = replaceViWord(genz, "xong rồi", "toang thật rồi ông giáo ạ"); }
  if (/绷不住/g.test(zh)) { genz = replaceViWord(genz, "không chịu nổi", "vỡ trận nhịn không nổi"); }
  if (/上头/g.test(zh)) { genz = replaceViWord(genz, "hưng phấn", "dính đòn nghiện xỉu"); }
  if (/种草/g.test(zh)) { genz = replaceViWord(genz, "giới thiệu", "bị dụ chốt đơn"); }
  if (/拔草/g.test(zh)) { genz = replaceViWord(genz, "mua", "chốt đơn thành công"); }
  if (/安利/g.test(zh)) { genz = replaceViWord(genz, "khuyên", "rủ rê nhiệt tình"); }
  if (/卷王/g.test(zh)) { genz = replaceViWord(genz, "người chăm chỉ", "chiến thần cày cuốc"); }
  if (/躺赢/g.test(zh)) { genz = replaceViWord(genz, "thắng dễ dàng", "ngồi không cũng win"); }
  if (/柠檬精/g.test(zh)) { genz = replaceViWord(genz, "ghen tị", "gato đỏ mắt"); }
  if (/工具人/g.test(zh)) { genz = replaceViWord(genz, "công cụ", "con cờ thế thân"); }
  if (/舔狗/g.test(zh)) { genz = replaceViWord(genz, "người theo đuổi", "simp chúa"); }
  if (/绿茶/g.test(zh)) { genz = replaceViWord(genz, "người giả tạo", "trà xanh chính hiệu"); }
  if (/渣男/g.test(zh)) { genz = replaceViWord(genz, "đàn ông tồi", "tra nam"); }
  if (/佛系/g.test(zh)) { genz = replaceViWord(genz, "bình thản", "chill chill mặc kệ đời"); }
  if (/离谱/g.test(zh)) { genz = replaceViWord(genz, "vô lý", "ảo thật đấy"); }
  if (/老铁/g.test(zh)) { genz = replaceViWord(genz, "anh bạn", "anh em chí cốt"); }
  if (/666/g.test(zh)) { genz = replaceViWord(genz, "giỏi", "đỉnh chóp vippro"); }
  if (/小丑/g.test(zh)) { genz = replaceViWord(genz, "người làm trò", "chú hề chính là tôi"); }
  if (/红温/g.test(zh)) { genz = replaceViWord(genz, "tức giận", "nóng máu cay đỏ mắt"); }
  if (/班味/g.test(zh)) { genz = replaceViWord(genz, "mệt mỏi đi làm", "mùi culi công sở"); }
  if (/显眼包/g.test(zh)) { genz = replaceViWord(genz, "người nổi bật", "cây hài nổi bần bật"); }
  if (/电子榨菜/g.test(zh)) { genz = replaceViWord(genz, "video giải trí", "clip nhai cơm"); }
  if (/yyds/gi.test(zh)) { genz = replaceViWord(genz, "tốt nhất", "mãi đỉnh tượng đài"); }
  if (/emo/gi.test(zh)) { genz = replaceViWord(genz, "buồn bã", "tụt mood suy sụp"); }
  if (/吃醋/g.test(zh)) { genz = replaceViWord(genz, "ghen tuông", "ghen lồng lộn"); }

  // Sắc thái ngữ điệu Gen Z Việt Nam
  genz = replaceViWord(genz, "anh ấy", "hắn");
  genz = replaceViWord(genz, "cô ấy", "bả");
  genz = replaceViWord(genz, "họ", "mấy người đó");
  genz = replaceViWord(genz, "chúng tôi", "tụi mình");
  genz = replaceViWord(genz, "chúng ta", "tụi mình");
  genz = replaceViWord(genz, "rất tốt", "đỉnh chóp");
  genz = replaceViWord(genz, "rất đẹp", "đẹp xỉu");
  genz = replaceViWord(genz, "rất ngon", "ngon nhức nách");
  genz = replaceViWord(genz, "rất thích", "mê xỉu");
  genz = replaceViWord(genz, "làm sao bây giờ", "giờ tính sao đây trời");
  genz = replaceViWord(genz, "không biết", "chịu chết chả biết");
  genz = replaceViWord(genz, "bạn bè", "cạ cứng");
  genz = replaceViWord(genz, "quá mệt", "đuối như trái chuối");
  genz = replaceViWord(genz, "tan làm", "hết giờ cày cuốc");

  // 3. LĂNG KÍNH 3: Công Sở & Thương Mại (Business & Formal)
  let busin = native;
  busin = replaceViWord(busin, "sếp", "Ban Giám đốc");
  busin = replaceViWord(busin, "ông chủ", "Ban Lãnh đạo");
  busin = replaceViWord(busin, "anh ấy", "nhân sự phụ trách");
  busin = replaceViWord(busin, "cô ấy", "nhân sự phụ trách");
  busin = replaceViWord(busin, "chúng tôi", "Phía chúng tôi");
  busin = replaceViWord(busin, "chúng ta", "Phía chúng tôi");
  busin = replaceViWord(busin, "bạn", "Quý Anh/Chị");
  busin = replaceViWord(busin, "các bạn", "Quý Đối tác");
  busin = replaceViWord(busin, "mọi người", "Quý Anh/Chị cán bộ");
  busin = replaceViWord(busin, "họ", "phía đối tác");
  busin = replaceViWord(busin, "hủy", "chưa thể thông qua");
  busin = replaceViWord(busin, "bác bỏ", "xin phép bảo lưu ý kiến");
  busin = replaceViWord(busin, "rất tốt", "đáp ứng tiêu chuẩn đề ra");
  busin = replaceViWord(busin, "cuộc họp", "phiên làm việc");
  busin = replaceViWord(busin, "họp", "hội đàm trao đổi");
  busin = replaceViWord(busin, "thảo luận", "hội đàm trao đổi");
  busin = replaceViWord(busin, "phương án", "đề án chiến lược");
  busin = replaceViWord(busin, "kế hoạch", "kế hoạch công tác");
  busin = replaceViWord(busin, "tiền", "ngân sách dự toán");
  busin = replaceViWord(busin, "vấn đề", "tồn đọng phát sinh");
  busin = replaceViWord(busin, "làm xong", "hoàn tất nghiệm thu");
  busin = replaceViWord(busin, "làm việc", "triển khai công tác");
  busin = replaceViWord(busin, "giúp đỡ", "hỗ trợ phối hợp");
  busin = replaceViWord(busin, "nhanh lên", "khẩn trương đẩy nhanh tiến độ");
  busin = replaceViWord(busin, "nhanh chóng", "khẩn trương");
  busin = replaceViWord(busin, "chuẩn bị", "hoàn thiện hồ sơ chuẩn bị");
  busin = replaceViWord(busin, "hợp đồng", "văn bản hợp đồng kinh tế");
  busin = replaceViWord(busin, "báo cáo", "báo cáo tài liệu");
  busin = replaceViWord(busin, "khách hàng", "Quý Khách hàng đối tác");
  busin = replaceViWord(busin, "nghĩ cách", "đề xuất giải pháp");
  busin = replaceViWord(busin, "đồng ý", "thống nhất phê duyệt");
  busin = replaceViWord(busin, "mua bán", "giao dịch thương mại");

  if (/破防/g.test(zh)) busin = replaceViWord(busin, "thất vọng", "ảnh hưởng lớn đến tinh thần đội ngũ");
  if (/躺平/g.test(zh)) busin = replaceViWord(busin, "nằm im", "tạm thời nghỉ ngơi tái tạo năng lượng làm việc");
  if (/吃瓜/g.test(zh)) busin = replaceViWord(busin, "hóng chuyện", "theo dõi thông tin dư luận");

  if (!busin.startsWith("Kính trình") && !busin.startsWith("Kính gửi") && /老板|领导|客户|会议|方案|报告|合同/g.test(zh)) {
    busin = "Kính trình: " + busin;
  }

  return {
    native: {
      id: 'native',
      badge: '🌱 Thuần Việt',
      title: 'Thuần Việt Tự Nhiên',
      desc: 'Diễn đạt đời thường, trôi chảy, tự nhiên chuẩn người Việt.',
      text: native,
      color: '#10B981'
    },
    genz: {
      id: 'genz',
      badge: '🔥 Gen Z & Mạng',
      title: 'Gen Z & Mạng Xã Hội',
      desc: 'Trẻ trung, bắt trend Douyin / Weibo, lột tả chuẩn từ lóng mạng.',
      text: genz,
      color: '#F59E0B'
    },
    business: {
      id: 'business',
      badge: '👔 Công Sở',
      title: 'Công Sở & Thương Mại',
      desc: 'Trang trọng, lịch sự, điềm tĩnh, chuẩn mực văn phòng & đối ngoại.',
      text: busin,
      color: '#3B82F6'
    }
  };
}

// Gọi Gemini AI từ serverless backend proxy (nếu có), fallback tự động sang offline rule engine
async function getSentenceLensesWithAi(sentence, targetLang) {
  const isVi = !targetLang || targetLang === 'vi';
  const isJa = targetLang === 'ja';

  // 1. Thử gọi backend Gemini AI trước
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: sentence, targetLang, type: 'lenses' })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.lenses && data.lenses.native) {
        return {
          isAi: true,
          native: {
            id: 'native',
            badge: isJa ? '🌱 日常・自然 (Gemini AI)' : (isVi ? '🌱 Thuần Việt Tự Nhiên (Gemini AI)' : '🌱 Natural Casual (Gemini AI)'),
            title: isJa ? '自然な日常会話' : (isVi ? 'Thuần Việt Tự Nhiên' : 'Natural Casual'),
            desc: isJa ? '文脈に合わせた自然な表現' : (isVi ? 'Văn phong tự nhiên gọt giũa chuẩn ngữ cảnh' : 'Fluent contextual phrasing'),
            text: data.lenses.native,
            color: '#10B981'
          },
          genz: {
            id: 'genz',
            badge: isJa ? '🔥 若者言葉・流行語 (Gemini AI)' : (isVi ? '🔥 Gen Z & Mạng Xã Hội (Gemini AI)' : '🔥 Gen Z & Slang (Gemini AI)'),
            title: isJa ? 'ネット流行語・スラング' : (isVi ? 'Gen Z & Mạng Xã Hội' : 'Gen Z & Netizen'),
            desc: isJa ? 'SNS最新トレンド' : (isVi ? 'Bắt trend mạng xã hội Douyin/Weibo' : 'Trendy social media tone'),
            text: data.lenses.genz || data.lenses.native,
            color: '#F59E0B'
          },
          business: {
            id: 'business',
            badge: isJa ? '👔 ビジネス・敬語 (Gemini AI)' : (isVi ? '👔 Công Sở & Thương Mại (Gemini AI)' : '👔 Business & Formal (Gemini AI)'),
            title: isJa ? 'ビジネス・敬語表現' : (isVi ? 'Công Sở & Thương Mại' : 'Business & Formal'),
            desc: isJa ? '公の場にふさわしい丁寧な表現' : (isVi ? 'Trang trọng, lịch thiệp dùng trong công việc' : 'Polite corporate tone'),
            text: data.lenses.business || data.lenses.native,
            color: '#3B82F6'
          }
        };
      }
    }
  } catch (err) {
    // Nếu chạy web tĩnh thuần túy hoặc backend chưa deploy, tiếp tục kiểm tra direct key
  }

  // 1.5. Thử gọi trực tiếp bằng key trình duyệt (nếu người dùng đã lưu)
  const directKey = localStorage.getItem('cr_gemini_api_key');
  if (directKey) {
    try {
      const prompt = `Bạn là một chuyên gia dịch thuật tiếng Trung sang ${isVi ? 'Tiếng Việt' : (isJa ? 'Tiếng Nhật' : 'Tiếng Anh')}. Hãy phân tích câu: "${sentence}" và dịch sang 3 phong cách theo đúng JSON: {"native": "...", "genz": "...", "business": "..."}`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(directKey.trim())}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json'
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const parsed = JSON.parse(raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim());
        if (parsed && parsed.native) {
          return {
            isAi: true,
            native: {
              id: 'native',
              badge: isJa ? '🌱 日常・自然 (Gemini AI)' : (isVi ? '🌱 Thuần Việt Tự Nhiên (Gemini AI)' : '🌱 Natural Casual (Gemini AI)'),
              title: isJa ? '自然な日常会話' : (isVi ? 'Thuần Việt Tự Nhiên' : 'Natural Casual'),
              desc: isJa ? '文脈に合わせた自然な表現' : (isVi ? 'Văn phong tự nhiên gọt giũa chuẩn ngữ cảnh' : 'Fluent contextual phrasing'),
              text: parsed.native,
              color: '#10B981'
            },
            genz: {
              id: 'genz',
              badge: isJa ? '🔥 若者言葉・流行語 (Gemini AI)' : (isVi ? '🔥 Gen Z & Mạng Xã Hội (Gemini AI)' : '🔥 Gen Z & Slang (Gemini AI)'),
              title: isJa ? 'ネット流行語・スラング' : (isVi ? 'Gen Z & Mạng Xã Hội' : 'Gen Z & Netizen'),
              desc: isJa ? 'SNS最新トレンド' : (isVi ? 'Bắt trend mạng xã hội Douyin/Weibo' : 'Trendy social media tone'),
              text: parsed.genz || parsed.native,
              color: '#F59E0B'
            },
            business: {
              id: 'business',
              badge: isJa ? '👔 ビジネス・敬語 (Gemini AI)' : (isVi ? '👔 Công Sở & Thương Mại (Gemini AI)' : '👔 Business & Formal (Gemini AI)'),
              title: isJa ? 'ビジネス・敬語表現' : (isVi ? 'Công Sở & Thương Mại' : 'Business & Formal'),
              desc: isJa ? '公の場にふさわしい丁寧な表現' : (isVi ? 'Trang trọng, lịch thiệp dùng trong công việc' : 'Polite corporate tone'),
              text: parsed.business || parsed.native,
              color: '#3B82F6'
            }
          };
        }
      }
    } catch (e) {}
  }

  // 2. Fallback: Google Translate + Engine 3 lăng kính nội bộ
  const baseTrans = await translateTextOnline(sentence, targetLang);
  return generateThreeLenses(sentence, baseTrans, targetLang);
}

function renderSentenceLenses(box) {
  if (!box) box = document.getElementById('sentence-trans-box');
  if (!box || !state.currentSentenceLenses) return;

  const { sentence, trans1, trans2, lenses } = state.currentSentenceLenses;
  const activeLens = state.activeLens || 'native';

  if (!lenses) {
    box.innerHTML = `<span style="color:var(--text-muted);">${t('noMeaning')}</span>`;
    return;
  }

  let html = `
    <div class="trans-lens-container">
      <div class="trans-lens-header">
        <div style="display:flex; align-items:center; gap:6px;">
          <span style="font-weight:700; font-size:12px; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px;">🔀 3 Lăng Kính Dịch Thuật</span>
        </div>
        <div class="trans-lens-tabs">
          <button type="button" class="trans-lens-tab ${activeLens === 'native' ? 'active' : ''}" data-lens="native" onclick="switchTranslationLens('native')">
            <span>🌱</span> Thuần Việt
          </button>
          <button type="button" class="trans-lens-tab ${activeLens === 'genz' ? 'active' : ''}" data-lens="genz" onclick="switchTranslationLens('genz')">
            <span>🔥</span> Gen Z & Mạng
          </button>
          <button type="button" class="trans-lens-tab ${activeLens === 'business' ? 'active' : ''}" data-lens="business" onclick="switchTranslationLens('business')">
            <span>👔</span> Công Sở
          </button>
          <button type="button" class="trans-lens-tab ${activeLens === 'all' ? 'active' : ''}" data-lens="all" onclick="switchTranslationLens('all')">
            <span>📑</span> Xem Cả 3
          </button>
        </div>
      </div>
      <div class="trans-lens-body">
  `;

  function renderCard(lKey, isStacked) {
    const item = lenses[lKey];
    if (!item) return '';
    return `
      <div class="trans-lens-card lens-${item.id}" style="${isStacked ? 'margin-bottom:8px;' : ''}">
        <div class="trans-lens-card-header">
          <div class="trans-lens-badge ${item.id}">
            <span class="lens-dot" style="background:${item.color};"></span>
            <b>${escapeHtml(item.badge)}</b>
            <span style="color:var(--text-muted); font-weight:400; font-size:11px; margin-left:4px;">• ${escapeHtml(item.desc)}</span>
          </div>
          <button type="button" class="trans-lens-copy-btn" onclick="copyLensText('${escapeQuotes(item.text)}', this)" title="Sao chép bản dịch">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <span>Sao chép</span>
          </button>
        </div>
        <div class="trans-lens-text">${escapeHtml(item.text)}</div>
      </div>
    `;
  }

  if (activeLens === 'all') {
    html += `
      <div class="trans-lens-stacked">
        ${renderCard('native', true)}
        ${renderCard('genz', true)}
        ${renderCard('business', true)}
      </div>
    `;
  } else {
    html += renderCard(activeLens, false);
  }

  if (trans2 && state.meaningLang2 && state.meaningLang2 !== state.meaningLang) {
    html += `
      <div class="trans-lens-secondary-lang">
        <span class="badge" style="margin-right:6px;">${getLangName(state.meaningLang2)}</span>
        <span style="color:var(--text-secondary); font-size:13px;">${escapeHtml(trans2)}</span>
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  box.innerHTML = html;
}

function switchTranslationLens(lensId) {
  state.activeLens = lensId;
  localStorage.setItem('cr_active_lens', lensId);
  renderSentenceLenses();
}

function copyLensText(text, btn) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Đã chép!';
      btn.style.color = '#10B981';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.color = '';
      }, 1500);
    }
    showToast(tx('Đã sao chép bản dịch', 'Translation copied', '翻訳をコピーしました'));
  }).catch(() => {
    showToast(tx('Không thể sao chép', 'Copy failed', 'コピーに失敗しました'));
  });
}

let _lastFullTranslation = '';

function copyFullTextTranslation(btn) {
  if (_lastFullTranslation) {
    copyLensText(_lastFullTranslation, btn);
  }
}

// ===== DỊCH TOÀN BỘ VĂN BẢN / ĐOẠN DÀI =====
async function translateFullText() {
  const box = document.getElementById('full-text-trans-box');
  if (!box) return;

  if (box.classList.contains('show')) {
    box.classList.remove('show');
    const toggleBtn = document.getElementById('btn-full-trans-toggle');
    if (toggleBtn) toggleBtn.classList.remove('active');
    return;
  }

  box.classList.add('show');
  const toggleBtn = document.getElementById('btn-full-trans-toggle');
  if (toggleBtn) toggleBtn.classList.add('active');

  box.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; color:var(--text-muted); padding:14px;">
      <span class="spinner-small" style="display:inline-block; width:16px; height:16px; border:2px solid var(--accent); border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite;"></span>
      <em>Đang dịch toàn bộ bài viết...</em>
    </div>
  `;

  const fullText = state.currentText || (state.sentences ? state.sentences.join('\n') : '');
  if (!fullText) {
    box.innerHTML = '<span style="color:var(--text-muted);">Không có văn bản để dịch.</span>';
    return;
  }

  const langName = getLangName(state.meaningLang);

  // 1. Thử gọi backend Gemini AI cho toàn bộ bài viết (chuẩn văn cảnh nhất)
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: fullText, targetLang: state.meaningLang, type: 'full' })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        const fullAiResult = data.result.trim();
        _lastFullTranslation = fullAiResult;
        const aiParas = fullAiResult.split(/\n+/).map(p => p.trim()).filter(Boolean);

        box.innerHTML = `
          <div class="trans-lens-container" style="margin-top:6px;">
            <div class="trans-lens-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-weight:700; font-size:13.5px; color:var(--accent);">✨ Bản Dịch Toàn Bộ Bài Viết (Google Gemini AI · ${langName})</span>
              </div>
              <div style="display:flex; gap:6px;">
                <button type="button" class="trans-lens-copy-btn" onclick="copyFullTextTranslation(this)" title="Sao chép toàn bộ bản dịch">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <span>Sao chép tất cả</span>
                </button>
                <button type="button" class="trans-lens-copy-btn" onclick="document.getElementById('full-text-trans-box').classList.remove('show'); const b = document.getElementById('btn-full-trans-toggle'); if (b) b.classList.remove('active');" title="Đóng bản dịch">
                  ✕
                </button>
              </div>
            </div>
            <div class="trans-lens-card lens-native">
              ${aiParas.map(p => `<p style="margin-bottom:12px; line-height:1.7; font-size:15px; color:var(--text-primary);">${escapeHtml(p)}</p>`).join('')}
            </div>
          </div>
        `;
        return;
      }
    }
  } catch (err) {
    // Nếu chưa có backend, fallback kiểm tra key trực tiếp
  }

  // 1.5. Thử gọi trực tiếp bằng key trình duyệt (nếu có)
  const directKey = localStorage.getItem('cr_gemini_api_key');
  if (directKey) {
    try {
      const prompt = `Bạn là một chuyên gia dịch thuật cao cấp. Hãy dịch toàn bộ văn bản sau sang ${langName} một cách chuẩn xác, tự nhiên, trôi chảy, giữ nguyên ngữ cảnh và cấu trúc từng đoạn văn:\n\n${fullText}\n\nChỉ xuất ra nội dung bản dịch, không thêm lời dẫn giải thích.`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(directKey.trim())}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const fullAiResult = (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
        if (fullAiResult) {
          _lastFullTranslation = fullAiResult;
          const aiParas = fullAiResult.split(/\n+/).map(p => p.trim()).filter(Boolean);
          box.innerHTML = `
            <div class="trans-lens-container" style="margin-top:6px;">
              <div class="trans-lens-header">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-weight:700; font-size:13.5px; color:var(--accent);">✨ Bản Dịch Toàn Bộ Bài Viết (Google Gemini AI · ${langName})</span>
                </div>
                <div style="display:flex; gap:6px;">
                  <button type="button" class="trans-lens-copy-btn" onclick="copyFullTextTranslation(this)" title="Sao chép toàn bộ bản dịch">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span>Sao chép tất cả</span>
                  </button>
                  <button type="button" class="trans-lens-copy-btn" onclick="document.getElementById('full-text-trans-box').classList.remove('show'); const b = document.getElementById('btn-full-trans-toggle'); if (b) b.classList.remove('active');" title="Đóng bản dịch">
                    ✕
                  </button>
                </div>
              </div>
              <div class="trans-lens-card lens-native">
                ${aiParas.map(p => `<p style="margin-bottom:12px; line-height:1.7; font-size:15px; color:var(--text-primary);">${escapeHtml(p)}</p>`).join('')}
              </div>
            </div>
          `;
          return;
        }
      }
    } catch (e) {}
  }

  // 2. Fallback: Tách theo từng đoạn hoặc từng câu lớn để giữ nguyên cấu trúc bài viết
  const paras = fullText.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const translatedParas = [];

  for (const para of paras) {
    const res = await translateTextOnline(para, state.meaningLang);
    translatedParas.push(res || para);
  }

  const cleanedParas = translatedParas.map(p => cleanNativeVi(p));
  _lastFullTranslation = cleanedParas.join('\n\n');

  box.innerHTML = `
    <div class="trans-lens-container" style="margin-top:6px;">
      <div class="trans-lens-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-weight:700; font-size:13.5px; color:var(--accent);">🌐 Bản Dịch Toàn Bộ Bài Viết (${langName})</span>
        </div>
        <div style="display:flex; gap:6px;">
          <button type="button" class="trans-lens-copy-btn" onclick="copyFullTextTranslation(this)" title="Sao chép toàn bộ bản dịch">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <span>Sao chép tất cả</span>
          </button>
          <button type="button" class="trans-lens-copy-btn" onclick="document.getElementById('full-text-trans-box').classList.remove('show'); const b = document.getElementById('btn-full-trans-toggle'); if (b) b.classList.remove('active');" title="Đóng bản dịch">
            ✕
          </button>
        </div>
      </div>
      <div class="trans-lens-card lens-native">
        ${cleanedParas.map(p => `<p style="margin-bottom:12px; line-height:1.7; font-size:15px; color:var(--text-primary);">${escapeHtml(p)}</p>`).join('')}
      </div>
    </div>
  `;
}
