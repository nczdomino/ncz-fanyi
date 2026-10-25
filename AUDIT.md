# NCZ Fanyi — Audit kỹ thuật & nhật ký sửa lỗi

> Phạm vi: toàn bộ repo (frontend `index.html` + `js/`, Vercel `api/`, Cloudflare `functions/`, `ocr_service/`).
> Mục tiêu: tìm bug – lỗ hổng bảo mật – lỗi logic, và sửa tận gốc vấn đề "tra từ điển trả kết quả tào lao".
> Mọi thay đổi đều có test hồi quy: `npm test`.

---

## 0. TL;DR

| Hạng mục | Trước | Sau |
|---|---|---|
| Tra `ăn` | 吃 rồi **安静, 按照, 安全, 安排, 按时, 安慰** (nhiễu pinyin `ān`) | 吃, 吃饭, 打扮(ăn diện), 契合(ăn khớp) |
| Tra `di` | **底 (dǐ)** hạng 1, 去 (đi) hạng 2 | 去, 走, 吧, 穿 — 底 xuống hạng 5 |
| Tra `to` | 对 (duì) hạng 1 | 大 (lớn, to) hạng 1 |
| Tra `ăn cơm` | chỉ 2 kết quả slang, **mất 吃饭** | 吃饭 hạng 1 |
| Gõ sai `aple` | không gợi ý gì (hàm Levenshtein có sẵn nhưng **chưa từng được gọi**) | gợi ý 苹果 |
| Tra `でんしゃ` / `がっこう` / `ねむい` (tiếng Nhật) | **không có kết quả** (kana bị hỏng do NFD) | 电车, 学校, 困 |
| Tra `phở` / `xe máy` / `áo dài` | **không có**, hoặc trả 普通 / 推广 (trùng Hán-Việt) | 河粉, 摩托车, 奥黛 |
| Tra `tôi yêu bạn` / `bạn khỏe không` | **không có kết quả** | 我爱你, 你好吗 |
| Tra `to eat` / `very big` / `chi fan` | 干饭人 / không có / không có | 吃, 大, 吃饭 |
| Số mục từ điển | 1.535 | **1.615** (+80) · reverse dict 166 → **226** |
| Tốc độ tra (~1.6k mục) | ~55 ms / lần gõ | **0.7–3.4 ms / lần gõ** |
| CORS + rate limit API | `*` cho mọi origin, không giới hạn | allow-list + rate limit + size cap |
| Test | 64 assertion | **+111 test hồi quy mới**, tổng 100% pass |

---

## 1. Nguyên nhân gốc: vì sao tra từ ra kết quả "tào lao"

Toàn bộ nằm trong `js/features/dict.js`, hàm `renderDictView()` — một vòng lặp tự chấm điểm
cho từng mục trong `MINI_DICT` (cũ dòng 430–598).

### 1.1. Pinyin lấn át nghĩa thật (HIGH)

Thang điểm cũ:

```js
// pinyin — áp dụng cho MỌI truy vấn, không phân biệt ngôn ngữ
if (entryPyLower === query || entryPyClean === cleanQuery) score = Math.max(score, 1100);
else if (cleanQuery.length >= 2 && entryPyClean.startsWith(cleanQuery)) score = Math.max(score, 850);

// nghĩa tiếng Việt khớp chính xác
if (viLower === query || viNoTone === queryNoTone) score = Math.max(score, 950);
```

`1100 > 950` → hễ chữ Hán nào có pinyin trùng chuỗi gõ là thắng.

* `di` → **底 (dǐ) = 1100** đứng trên 去 (qù, nghĩa "đi") = 950.
* `ăn` → `cleanQuery = "an"`, nên toàn bộ từ có pinyin bắt đầu bằng `an` (安静, 按照, 安全,
  安排, 按时, 安慰, 昂贵, 安利…) được **850 điểm**, chỉ xếp sau 吃 (950). 9/10 kết quả là rác.
* `latin` (không dấu) luôn rơi vào nhánh này vì `detectSearchLanguage()` có tồn tại
  nhưng **không hề được dùng để định tuyến điểm số**.

### 1.2. Nghĩa được so khớp như một khối, không tách từng nghĩa (HIGH)

`entry.vi` là chuỗi kiểu `"đi, nhé, nha"`. Code cũ so `viLower === query` hoặc
`viNoTone.includes(queryNoTone)` trên **cả khối**, rồi mọi trường hợp không khớp chính xác
đều dồn về cùng một mức 800–820. Kết quả: hàng chục từ đồng điểm, thứ hạng do
"từ nào ngắn hơn" quyết định.

Ví dụ `yêu` cũ: 要求 (yêu cầu) hạng 1, 爱 không nằm trong top 10.
Ví dụ `tôi` cũ: 我 (800) ngang điểm 到/向 ("tới") và 晚上 ("tối").

### 1.3. `includes()` không có biên từ (MEDIUM)

`entryPyLower.includes(query)` với truy vấn 2 ký tự → `"di"` khớp giữa
`diànshì`, `diànnǎo`, `dì-yī`, `dìtiě`… `viNoTone.includes(queryNoTone)` cũng vậy.

### 1.4. Dung sai gõ sai được "quảng cáo" nhưng chưa hề chạy (MEDIUM)

`dict-search-engine.js` có `levenshteinDistance()` và header ghi
"Nếu gõ sai chính tả 1 ký tự vẫn tìm ra", nhưng **`dict.js` không gọi hàm này một lần nào**.
Tính năng không tồn tại trên thực tế.

### 1.5. Bộ lọc HSK áp cả vào kết quả tìm kiếm (MEDIUM — bug logic)

`filterHSK` được kiểm tra ngay trong nhánh search. Người dùng bấm chip "HSK 3" (để *duyệt*
từ vựng) rồi gõ `ăn` → chỉ còn từ HSK 3, và 吃 (HSK 1) **biến mất**. Trông như từ điển hỏng.

### 1.6. Các lỗi phụ trong cùng luồng

| Lỗi | Chi tiết |
|---|---|
| Từ ghép liên quan sai | `chars.some(c => w.includes(c))` → tra 学生 trả về mọi từ chứa 学 **hoặc** 生 |
| Sắp xếp không ổn định | comparator `if (a.startsWith(key)) return -1` trả −1 cả khi `b` cũng vậy |
| Dịch máy bùng nổ request | khi `meaningLang === 'ja'`, mỗi lần gõ phát 1 request/card (tới 80 request/lần) |
| Chỉ mục reverse-dict đóng băng | `buildReverseDictIndex()` chạy lúc load, khi `stripVietnameseTones` chưa tồn tại, rồi cache vĩnh viễn bản thiếu dấu |

---

## 2. Cách sửa: engine chấm điểm mới

Thêm `js/features/dict-scoring.js` (~700 dòng, **thuần, không phụ thuộc DOM**, test được bằng Node).

### 2.1. Kiến trúc

```
truy vấn
   │
   ├─ detectSearchLanguage()  → zh | ja | vi | pinyin | latin
   │      (định tuyến: pinyin chỉ được bật khi truy vấn thực sự có thể là pinyin)
   │
   ├─ exact synonym   (tách "ăn, dùng bữa" thành 2 nghĩa, so từng nghĩa)
   ├─ phrase / prefix / token   (có kiểm tra biên từ)
   ├─ kanji reading (cho truy vấn kana/romaji)
   ├─ pinyin         (bị hạ bậc nếu đã có nghĩa khớp thật)
   ├─ Hán-Việt
   └─ fuzzy          (Levenshtein theo token — nay mới thực sự chạy)
   │
   └─ tier: primary (≥850) | related (≥560) | weak
```

### 2.2. Bốn quy tắc then chốt

1. **Tách nghĩa.** `"đi, nhé, nha"` → 3 nghĩa. Nghĩa 0 là nghĩa chính nên được cộng điểm;
   định nghĩa càng ít nghĩa càng cụ thể nên cũng được cộng. Đây là thứ phá vỡ thế "hòa điểm".
2. **Pinyin bị hạ bậc, không bị xóa.** Có nghĩa khớp thật (≥850) ⇒ pinyin chính xác tụt xuống
   845, pinyin tiền tố/bộ phận bị loại. Người gõ pinyin vẫn thấy 底/的/第 (hạng ~5) nhưng
   không còn chiếm hạng 1.
3. **Phạt dấu.** Truy vấn có dấu ⇒ `an toàn` không còn được tính là khớp mạnh của `ăn`
   (phạt 135 điểm). Truy vấn không dấu thì không phạt (vì `sach` phải tìm được cả 书 lẫn 干净).
4. **Phân tầng hiển thị.** Kết quả chắc chắn ở trên; phần "Từ liên quan" nằm dưới một dải phân
   cách riêng. Đây là thay đổi UX quan trọng: một truy vấn 1 âm tiết không còn trông như
   "một bức tường rác" nữa.

### 2.3. Hiệu năng

Chỉ mục (nghĩa đã chuẩn hóa + token + pinyin + Hán-Việt + kanji reading + "blob" để lọc thô)
được dựng **một lần** rồi cache; mỗi lần tra chỉ còn quét `indexOf` trên blob.

| Truy vấn | Cũ | Mới |
|---|---|---|
| `ăn` | 55 ms | **0.75 ms** |
| `xin chào` | — | 3.0 ms |
| `研究` (Hán) | 0.4 ms | 0.22 ms |

---

## 2b. Đợt hai: lỗi tiếng Nhật, trùng Hán-Việt và độ phủ dữ liệu

Sau khi engine mới chạy, mình dò lại ~90 truy vấn thực tế của cả ba nhóm người dùng và tìm thêm
được 4 lỗi hệ thống nữa.

### 2b.1. Kana bị hỏng bởi NFD — toàn bộ tiếng Nhật gần như không tra được (HIGH)

`stripVietnameseTones()` chạy `normalize('NFD')` rồi xoá dấu tổ hợp, nhưng **không compose lại**:

```js
return res.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
```

NFD tách cả kana có dakuten: `ず` (U+305A) → `す` + U+3099, và U+3099 **nằm ngoài** khoảng
`U+0300..U+036F` nên không bị xoá, nhưng chuỗi thì không còn khớp với dữ liệu.

Hệ quả: `みず`, `がっこう`, `でんしゃ`, `ともだち`, `ねむい`… **không tra được gì**,
trong khi `たべる`, `のむ`, `ねこ` (không có dakuten) vẫn chạy — đúng kiểu lỗi cực khó đoán.
Sửa: thêm `.normalize('NFC')` sau bước xoá dấu (cả bản chính và bản fallback trong engine).

### 2b.2. Âm Hán-Nhật (katakana) không được quy đổi (HIGH)

`KANJI_DATA` lưu âm On bằng **katakana** (`スイ`, `ホン`), người học gõ **hiragana**
(`すい`, `ほん`) ⇒ không khớp. Sửa: thêm `katakanaToHiragana()` (có NFC) và quy đổi **cả hai phía**
trước khi so sánh, trong cả `buildIndex` (blob dùng để lọc thô) và `scoreKanjiReadings`.

### 2b.3. `JA_COMMON_DICT` (1.789 mục) chưa từng được dùng để tra (HIGH)

File `js/data/ja-common.js` có 1.789 cặp Hán ↔ Nhật, nhưng engine cũ **chỉ dùng để hiển thị**.
Với người dùng Nhật, đây là kho tra cứu lớn nhất mà app có — và nó không được nối vào.

Sửa: dựng chỉ mục đảo Nhật → Hán (đọc cả phần trong ngoặc: `"山 (やま)"` → index cả `山` và `やま`),
dùng trong `lookupJaIndex()`. Thêm 308 mục có trong `JA_COMMON_DICT` mà không có trong `MINI_DICT`
vẫn trả về được (kèm Hán-Việt tự suy ra).

### 2b.4. Trùng Hán-Việt và trùng dấu vẫn tạo kết quả sai (MEDIUM)

* `phở` → **普通 / 普通话 / 普遍** vì Hán-Việt của 普通 là `phổ thông`, mà `phở` và `phổ` chỉ khác dấu.
  → Khi truy vấn **có dấu**, Hán-Việt phải khớp cả dấu, không chỉ khớp chuỗi không dấu.
* `thức dậy` → **推动 (thúc đẩy)** đứng hạng 1, vì bỏ dấu cả hai đều là `thuc day`.
  → Khớp chính xác nhưng **lệch dấu** trên truy vấn có dấu bị trừ 210 điểm ⇒ chỉ còn ở nhóm "liên quan",
  không bao giờ là kết quả chắc chắn.
* `thức dậy` không còn kéo theo 鞭策 / 促进; `phở` không còn trả 普通.

### 2b.5. Thiếu từ là giới hạn lớn nhất còn lại — đã bổ sung 80 mục

Engine đúng điểm nhưng **không có mục từ thì không thể trả kết quả**. Khảo sát 92 từ Hán
phổ biến: **thiếu 42**. Đã thêm:

* `js/data/common-words.js` — **81 mục** (80 mục mới thực sự vào từ điển): 火, 困, 起床, 知道,
  觉得, 打算, 讨厌, 危险, 银行, 车站, 火车, 电车, 摩托车, 船, 电话, 公司, 警察, 律师, 老板,
  ông bà/anh chị em, 生日, 生日快乐, 早上好, 晚上好, 晚安, 我爱你, 你好吗, 我不知道, 等一下,
  帮帮我, 让我看看, 非常感谢, 河粉 (phở), 米粉 (bún), 春卷 (nem), 奥黛 (áo dài), 旗袍 (sườn xám)…
  (không bao giờ ghi đè mục đã có — có test riêng)
* `js/data/reverse-dict.js` — thêm **60 mục** (166 → 226): khoá **kana** cho từ Nhật thông dụng
  (でんしゃ, でんわ, ねむい, おはよう, こんばんは, ごはん, やま, かわ, うみ…) và cụm tiếng Việt
  (đi ngủ, nhớ nhà, yêu nhau, tan học, uống cà phê, bún chả…).

### 2b.6. Ba quy tắc chấm điểm mới

| Quy tắc | Vì sao |
|---|---|
| Truy vấn dài hơn mục từ vẫn khớp (`"xin lỗi nhé"` → 对不起) | người dùng gõ thêm trợ từ; yêu cầu nghĩa phủ ≥ 50% độ dài truy vấn để không nhiễu |
| `to eat` / `very big` → bỏ từ chức năng đầu câu rồi tra lại | gloss lưu là `eat` / `big`, người học gõ kèm `to` |
| Âm Hán-Nhật 2 kana phải khớp chính xác | `やま` từng khớp `病` qua âm `やまい` và `感嘆してやまない` |

---

## 3. Bảo mật

### 3.1. Đã sửa

| # | Mức | Vấn đề | Sửa |
|---|---|---|---|
| S1 | **High** | 5 endpoint × 2 nền tảng trả `Access-Control-Allow-Origin: *` **kèm** `Allow-Credentials: true` (cặp không hợp lệ) và không có allow-list ⇒ **bất kỳ website nào cũng gọi được** `/api/translate`, `/api/dict/semantic`, `/api/ocr/repair` để tiêu quota Gemini của bạn | allow-list theo `ALLOWED_ORIGINS` + same-origin mặc định; bỏ hẳn `Allow-Credentials` |
| S2 | **High** | Không có rate limit trên endpoint tốn tiền | fixed-window per-IP: translate 30/ph, semantic 20/ph, ocr-repair 20/ph, handwriting 60/ph, ocr 30/ph + header `Retry-After` |
| S3 | Med | `/api/ocr` chuyển nguyên `req.body` lên upstream, không giới hạn | 8 MB cap + `readBody()` kiểm tra shape |
| S4 | Med | `/api/handwriting` nhận mảng `requests`/`ink` tùy ý ⇒ khuếch đại | max 8 requests, 64 nét, 600 điểm/nét, tọa độ ép về số |
| S5 | Med | Trả `details: <body lỗi upstream>` cho client (lộ host nội bộ, gợi ý credential) | log server-side, client chỉ nhận mã lỗi chung |
| S6 | Med | `type` trong `/api/translate` được nội suy thẳng vào prompt (prompt injection điều khiển schema) | allow-list `lenses / full / analyze_word` |
| S7 | Med | `/api/ocr` và `/api/ocr` (CF) trả `configured: true/false` cho người lạ | bỏ cờ dò cấu hình |
| S8 | Med | `ocr_service`: `allow_origins=["*"]` + `allow_credentials=True`; không giới hạn kích thước ảnh; lỗi trả `str(exception)`; container chạy **root** | CORS theo `OCR_ALLOWED_ORIGINS`, `OCR_REQUIRE_TOKEN` (fail-closed), 12 MB / 40 MP, `Image.MAX_IMAGE_PIXELS`, allow-list định dạng, so token bằng `compare_digest`, user `ocruser` (uid 10001) |
| S9 | Low | `onclick="openWordSheet('${escapeHtml(word)}')"` — `escapeHtml` trong ngữ cảnh **chuỗi JS**. Dấu `'` được mã hóa thành `&#39;`, trình duyệt giải mã lại thành `'` **trước khi** JS được parse ⇒ cắt chuỗi và chèn mã | dùng `escapeQuotes()` (escape đúng ngữ cảnh) |
| S10 | Low | `id="dict-meaning-${escapeHtml(word)}"` dùng dữ liệu từ điển làm id | giữ nguyên nhưng đã escape; an toàn ở ngữ cảnh attribute |

> **Đánh giá trung thực về S9:** hiện `ENRICH.remote` chỉ đọc từ `localStorage.cr_slang_remote`,
> và không có code nào ghi key này từ mạng. Vì vậy đây là lỗi **phòng thủ theo chiều sâu**,
> không phải lỗ hổng khai thác từ xa. Vẫn phải sửa vì chỉ cần một nguồn dữ liệu từ điển
> nhập từ ngoài là thành XSS thật.

### 3.2. Đã kiểm tra và **không** có lỗi

* Đầu ra AI (Gemini) trong `word-sheet.js` được `escapeHtml` ở **mọi** trường
  (`primaryMeaning`, `nuanceAndUsage`, `memoryTip`, `examples`, `synonyms`) ⇒ không XSS từ model.
* Không có secret nào trong bundle client (`GEMINI_API_KEY` chỉ ở server).
* Không có `eval` / `new Function` trên dữ liệu người dùng.
* `functions/api/ocr-repair.js` chỉ re-export, không nhân bản logic.

### 3.3. Khuyến nghị còn lại (chưa làm, cần hạ tầng)

1. **Rate limit toàn cục**: bộ đếm hiện tại nằm trong bộ nhớ mỗi instance (serverless
   không chia sẻ RAM). Muốn chặn cứng thì dùng Cloudflare Rate Limiting Rules / Vercel WAF,
   hoặc Upstash Redis.
2. **Xác thực người dùng** cho các endpoint AI nếu app mở công khai.
3. **CSP** trong `index.html` (hiện chưa có) — giảm thiệt hại nếu có XSS tương lai.

---

## 4. Lỗi logic khác đã sửa

| # | File | Vấn đề |
|---|---|---|
| L1 | `js/features/dict.js` | Bộ lọc HSK áp vào cả chế độ tìm kiếm (mục 1.5) |
| L2 | `js/features/dict.js` | `getCompoundWords()`: `chars.some()` → trả về từ ghép không liên quan; comparator không đối xứng → thứ tự nhảy |
| L3 | `js/features/dict.js` | Auto-dịch ja: 1 request/card/lần gõ → cap 12 + `Set` chống lặp + chỉ dịch nhóm primary |
| L4 | `js/data/reverse-dict.js` | Chỉ mục xây lúc load (khi helper chưa có) rồi cache vĩnh viễn → mất biến thể không dấu; nay tự rebuild một lần khi helper xuất hiện |
| L5 | `js/features/dict.js` | Xóa code chết sau refactor (`queryNoTone`, `jaNorm`, `stemmedEn`, `cleanQuery`, `removeToneMarks`) |
| L6 | `js/features/dict.js` | `dict-meaning-<word>` khi `meaningLang === 'ja'` không có fallback → hiện `...` vĩnh viễn nếu dịch lỗi |
| L7 | `js/features/dict-search-engine.js` | `stripVietnameseTones()` làm hỏng kana có dakuten (NFD không compose lại) → toàn bộ tiếng Nhật không tra được (mục 2b.1) |
| L8 | `js/features/dict-scoring.js` | Âm Hán-Nhật lưu bằng katakana, không quy đổi sang hiragana trước khi so (mục 2b.2) |
| L9 | `js/features/dict-scoring.js` | Hán-Việt bỏ qua dấu → `phở` khớp `phổ thông` (mục 2b.4) |
| L10 | `js/features/dict-scoring.js` | Pre-filter `blob.indexOf(query)` loại mất mục từ khi truy vấn **dài hơn** nghĩa (mục 2b.6) |
| L11 | `js/features/dict-scoring.js` | Fuzzy so với gloss tiếng Anh chạy cả khi truy vấn là tiếng Việt có dấu → `phở` trả 博士 |
| L12 | `js/features/dict-scoring.js` | Âm Hán-Nhật 2 kana khớp tiền tố bất kỳ → `やま` khớp `病` (やまい) và `感嘆してやまない` |

---

## 5. Kiểm thử

```
npm test
```

| Bộ test | Nội dung | Kết quả |
|---|---|---|
| `test_dict_scoring.js` | **mới** — 76 test hồi quy cho engine (vi/en/ja/zh, kana, gõ sai, câu, dữ liệu, hiệu năng, kiểm tra tĩnh) | 76/76 |
| `test_dict_render.js` | **mới** — smoke test DOM thật: load đúng thứ tự `index.html`, gọi `renderDictView()`, kiểm tra HTML sinh ra + XSS | pass |
| `test_dict_search.js` | bộ cũ (7 nhóm) | 7/7 |
| `test_hsk789_and_live_dict.js` | HSK 7-9 + live dict + i18n | pass |
| `test_ocr.js` | endpoint OCR (Vercel + Cloudflare) | 12/12 |
| `test_handwriting.js` | proxy viết tay | 47/47 |

Các test hồi quy then chốt (đều **fail** trên code cũ):

```js
top('ăn')[0] === '吃'                     // cũ: 吃 đúng nhưng 8/10 sau là rác pinyin
!top('ăn', 4).includes('安静')            // cũ: 安静 hạng 2
top('di')[0] === '去' && rank('di','底') > 2   // cũ: 底 hạng 1
top('ăn cơm')[0] === '吃饭'               // cũ: 吃饭 biến mất
has('aple', '苹果')                       // cũ: không có gì (fuzzy chưa từng chạy)
stripVietnameseTones('みず') === 'みず'    // cũ: trả 3 ký tự (kana bị tách bởi NFD)
top('でんしゃ')[0] === '电车'              // cũ: không có kết quả
top('phở')[0] === '河粉'                   // cũ: 普通 / 推广 (trùng Hán-Việt)
top('tôi yêu bạn')[0] === '我爱你'          // cũ: không có kết quả
top('to eat')[0] === '吃'                  // cũ: 干饭人
```

---

## 6. Thay đổi theo file

```
 M api/dict/semantic.js          CORS + rate limit + size cap + không lộ lỗi upstream
 M api/handwriting.js            CORS + rate limit + cap requests/ink
 M api/ocr.js                    CORS + rate limit + 8MB cap + bỏ cờ configured
 M api/ocr/repair.js             CORS + rate limit + 64KB cap + không lộ lỗi
 M api/translate.js              CORS + rate limit + allow-list type + không lộ lỗi
 M functions/api/*               (tương đương, bản Cloudflare)
 M css/dict.css                  style cho nhóm "Từ liên quan"
 M index.html                    nạp js/features/dict-scoring.js trước dict.js
 M js/data/reverse-dict.js       rebuild chỉ mục khi helper sẵn sàng
 M js/features/dict.js           dùng engine mới, sửa filter/compound/XSS/auto-translate
 M ocr_service/app.py            CORS, token fail-closed, size/pixel cap, không lộ lỗi
 M ocr_service/Dockerfile        chạy bằng user không phải root
 M test_handwriting.js           cập nhật kiểm tra CORS theo helper mới
?? api/_lib/http.js              helper bảo mật dùng chung (Vercel)
?? functions/_lib/http.js        helper bảo mật dùng chung (Cloudflare)
?? js/features/dict-scoring.js   ENGINE MỚI
?? js/data/common-words.js       +80 mục từ thông dụng còn thiếu
?? test_dict_scoring.js          76 test hồi quy
?? test_dict_render.js           smoke test DOM
?? package.json                  npm test
```

Sửa trong đợt hai (ngoài danh sách trên): `js/features/dict-search-engine.js` (NFC sau khi bỏ dấu,
`katakanaToHiragana` export), `js/data/reverse-dict.js` (+60 mục kana/tiếng Việt), `index.html`
(nạp `common-words.js`).

---

## 6b. Vấn đề dữ liệu phát hiện thêm (chưa sửa — cần dữ liệu chuẩn)

| # | Vấn đề | Số liệu đo được | Hướng xử lý |
|---|---|---|---|
| D1 | "Bộ thủ" không đầy đủ: `RADICALS_DATA` chỉ có **28 bộ**, và là bộ **biến thể** (亻, 氵, 扌…) chứ không phải 214 bộ Khang Hy | Phủ **404/1250 chữ Hán (32.3%)** trong `MINI_DICT` ⇒ `getWordRadical()` trả `null` cho ~2/3 số từ | Nạp bảng 214 bộ Khang Hy + bảng phân rã `kRSUnicode` từ Unihan (Unicode, miễn phí), rồi tra theo chữ |
| D2 | Trong mỗi bộ, chuỗi `chars` có **120 ký tự trùng lặp** | vd. bộ 女 chứa "好, 姐, 妹, 妈" hai lần | Sinh `chars` bằng script từ Unihan thay vì gõ tay |
| D3 | `MEASURE_WORDS` chỉ có **55 mục**, phần còn lại dựa vào heuristic `word.endsWith(key)` | Đúng cho 汽车→辆, 报纸→份, 电影→部…; nhưng 学生/房间/问题 không có lượng từ | Mở rộng danh sách + thêm nhánh "không chắc thì ẩn đi" thay vì suy đoán |

Ba mục này **không gây trả kết quả sai** (chúng chỉ thiếu hoặc không hiển thị), nên được ưu tiên sau
phần sửa logic/bảo mật ở trên.

---

## 7. Điều đáng làm tiếp (chưa nằm trong lần sửa này)

1. **Độ phủ từ điển** vẫn là giới hạn thật sự còn lại: nay **1.615 mục** (đã +80), nhưng một
   từ điển dùng thật cần 20k–120k mục. Import **CC-CEDICT** (~120k mục, CC BY-SA 4.0) là bước
   nâng cấp lớn nhất còn lại. Với 1.6k mục engine chạy 0.7–3.4 ms; 120k mục nên chuyển sang
   **Web Worker + IndexedDB** (dựng chỉ mục một lần, lưu lại), nếu không mỗi lần mở app sẽ mất
   vài trăm ms.
2. **Chuẩn hóa giản/phồn thể** (汉/漢) — hiện chỉ khớp đúng mặt chữ.
3. **Tách file** `dict.js` (1.100 dòng) thành `dict-view.js` + `dict-compounds.js`.
4. **i18n cho thông báo lỗi API** — hiện message tiếng Việt hard-code.
