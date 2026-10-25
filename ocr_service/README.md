# RapidOCR Microservice cho Halou (哈喽中文)

Dịch vụ backend Python chuyên dụng nhận diện ảnh tài liệu tiếng Trung mã nguồn mở (RapidOCR + ONNX Runtime), tương thích hoàn hảo với Cloudflare Pages Functions của Halou (哈喽中文).

---

## 🚀 Cách Triển Khai Miễn Phí (Chọn 1 trong các cách sau)

### Cách 1: Triển khai 100% Miễn phí trên Hugging Face Spaces (Khuyên dùng)
1. Đăng ký tài khoản miễn phí tại [HuggingFace.co](https://huggingface.co).
2. Nhấn **New Space** ➜ Chọn **Docker** (Blank) ➜ Đặt Space là **Public** (hoặc Private kèm Access Token).
3. Tải lên 3 file trong thư mục `ocr_service`:
   - `Dockerfile`
   - `requirements.txt`
   - `app.py`
4. Hugging Face sẽ tự động build và chạy container.
5. Sau khi build xong, copy URL Space của bạn (Ví dụ: `https://your-username-halou-ocr.hf.space`).
6. Vào **Cloudflare Pages** ➜ **Settings** ➜ **Environment variables** ➜ Thêm:
   - Variable name: `RAPIDOCR_API_URL`
   - Value: `https://your-username-halou-ocr.hf.space`

---

### Cách 2: Triển khai Miễn phí trên Render.com
1. Đăng nhập [Render.com](https://render.com).
2. Tạo **New Web Service** ➜ Chọn kho GitHub của bạn.
3. Chọn **Root Directory**: `ocr_service`
4. **Environment**: `Python 3`
5. **Build Command**: `pip install -r requirements.txt`
6. **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
7. Copy URL dịch vụ (Ví dụ: `https://halou-ocr.onrender.com`) và cấu hình vào Cloudflare Pages (`RAPIDOCR_API_URL`).

---

### Cách 3: Chạy cục bộ bằng Docker hoặc Python
```bash
cd ocr_service
pip install -r requirements.txt
python app.py
# Hoặc chạy Docker:
docker build -t halou-rapidocr .
docker run -p 8000:8000 halou-rapidocr
```

---

## 🔒 Tùy chọn bảo vệ Token (Bảo mật)
Nếu bạn muốn đặt mật khẩu cho dịch vụ RapidOCR:
1. Thêm biến môi trường vào server OCR: `RAPIDOCR_SECRET_KEY=mat_khau_cua_ban`
2. Thêm biến môi trường vào Cloudflare Pages: `RAPIDOCR_SECRET_KEY=mat_khau_cua_ban`
Hệ thống sẽ tự động xác thực qua Bearer Token ở mọi lượt gọi.
