# ocr_service/app.py - High-performance RapidOCR FastAPI microservice for Chinese document processing
import os
import time
import base64
import io
from typing import Optional, List, Dict, Any

from fastapi import FastAPI, UploadFile, File, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import numpy as np

# Hard limits: a hostile upload must not be able to exhaust the container.
# Pillow's decompression-bomb guard is raised only as far as we actually need.
Image.MAX_IMAGE_PIXELS = 40_000_000          # ~40 MP
MAX_UPLOAD_BYTES = 12 * 1024 * 1024          # 12 MB
MAX_PIXELS = 40_000_000
ALLOWED_FORMATS = {"PNG", "JPEG", "JPG", "WEBP", "BMP", "GIF", "TIFF"}

# RapidOCR engine loader (supports both rapidocr and rapidocr_onnxruntime)
try:
    from rapidocr import RapidOCR
except ImportError:
    try:
        from rapidocr_onnxruntime import RapidOCR
    except ImportError:
        RapidOCR = None

app = FastAPI(
    title="Halou RapidOCR Microservice",
    description="Dedicated Chinese Document OCR Engine for Halou Hanzi Dictionary",
    version="1.0.0"
)

# CORS: `allow_origins=["*"]` together with `allow_credentials=True` is an invalid,
# security-relevant combination (browsers reject it and it signals a misconfiguration).
# Set OCR_ALLOWED_ORIGINS="https://site-a.example,https://site-b.example" to restrict.
_raw_origins = os.environ.get("OCR_ALLOWED_ORIGINS", "").strip()
_allowed_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()] or ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=False,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-API-Key"],
)

# Optional security token via environment variable.
# Set OCR_REQUIRE_TOKEN=1 in production so the service refuses to start without one
# instead of silently serving unauthenticated requests.
SECRET_TOKEN = os.environ.get("RAPIDOCR_SECRET_KEY", "").strip()
REQUIRE_TOKEN = os.environ.get("OCR_REQUIRE_TOKEN", "").strip() in ("1", "true", "yes")
if REQUIRE_TOKEN and not SECRET_TOKEN:
    raise RuntimeError(
        "OCR_REQUIRE_TOKEN is set but RAPIDOCR_SECRET_KEY is empty: refusing to start "
        "an unauthenticated public OCR service."
    )

# Lazy-loaded singleton OCR engine
_ocr_engine = None

def get_engine():
    global _ocr_engine
    if _ocr_engine is None:
        if RapidOCR is None:
            raise RuntimeError("RapidOCR library is not installed. Please run 'pip install -r requirements.txt'")
        # Initialize RapidOCR with default Chinese + English recognition models
        _ocr_engine = RapidOCR()
    return _ocr_engine

def verify_token(authorization: Optional[str] = Header(None), x_api_key: Optional[str] = Header(None)):
    if not SECRET_TOKEN:
        return True
    token = ""
    if authorization and authorization.lower().startswith("bearer "):
        token = authorization[7:].strip()
    elif x_api_key:
        token = x_api_key.strip()
    
    import secrets as _secrets
    if not _secrets.compare_digest(token, SECRET_TOKEN):
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid OCR Secret Key")
    return True

class JsonOcrRequest(BaseModel):
    image: str # Base64 data URL or raw base64 string

def parse_rapidocr_result(raw_result: Any) -> List[Dict[str, Any]]:
    """Normalizes output from different versions of RapidOCR into a uniform list of text lines."""
    if not raw_result:
        return []

    # If returned as (result, elapse) tuple
    if isinstance(raw_result, tuple):
        raw_result = raw_result[0]

    lines = []
    
    # Format A: Object with .boxes, .txts, .scores (rapidocr v3)
    if hasattr(raw_result, 'boxes') and hasattr(raw_result, 'txts'):
        boxes = raw_result.boxes or []
        txts = raw_result.txts or []
        scores = getattr(raw_result, 'scores', []) or []
        for i, text in enumerate(txts):
            b = boxes[i].tolist() if hasattr(boxes[i], 'tolist') else boxes[i]
            s = float(scores[i]) if i < len(scores) else 1.0
            lines.append({
                "text": str(text).strip(),
                "score": round(s, 4),
                "box": b
            })
        return lines

    # Format B: List of items [[box_coords], text, score]
    if isinstance(raw_result, list):
        for item in raw_result:
            if not item:
                continue
            if isinstance(item, (list, tuple)) and len(item) >= 2:
                b = item[0]
                t = str(item[1]).strip()
                s = float(item[2]) if len(item) > 2 else 1.0
                if hasattr(b, 'tolist'):
                    b = b.tolist()
                lines.append({
                    "text": t,
                    "score": round(s, 4),
                    "box": b
                })

    return lines

@app.get("/")
@app.get("/health")
def health_check():
    engine_ready = RapidOCR is not None
    return {
        "status": "healthy" if engine_ready else "error",
        "engine": "RapidOCR",
        "supported_languages": ["zh-CN", "zh-TW", "en"],
        "token_protected": bool(SECRET_TOKEN)
    }

@app.post("/ocr")
@app.post("/api/ocr")
async def run_ocr(
    file: Optional[UploadFile] = File(None),
    json_body: Optional[JsonOcrRequest] = None,
    _: bool = Depends(verify_token)
):
    start_time = time.time()
    img_bytes = None

    if file:
        img_bytes = await file.read(MAX_UPLOAD_BYTES + 1)
    elif json_body and json_body.image:
        b64_str = json_body.image
        if "," in b64_str:
            b64_str = b64_str.split(",", 1)[1]
        # base64 is ~4/3 of the raw size; reject before decoding.
        if len(b64_str) > MAX_UPLOAD_BYTES * 2:
            raise HTTPException(status_code=413, detail="Image payload too large")
        try:
            img_bytes = base64.b64decode(b64_str, validate=False)
        except Exception:
            # Do not echo decoder internals back to the caller.
            raise HTTPException(status_code=400, detail="Invalid base64 image data")

    if not img_bytes:
        raise HTTPException(status_code=400, detail="No image provided. Send multipart 'file' or JSON 'image' base64.")

    if len(img_bytes) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image payload too large")

    # Image validation and safety check
    try:
        pil_img = Image.open(io.BytesIO(img_bytes))
        if pil_img.format not in ALLOWED_FORMATS:
            raise HTTPException(status_code=415, detail="Unsupported image format")
        width, height = pil_img.size
        if width * height > MAX_PIXELS:
            raise HTTPException(status_code=413, detail="Image resolution too large")
        pil_img.verify()
        pil_img = Image.open(io.BytesIO(img_bytes))  # Reopen after verify
    except HTTPException:
        raise
    except Exception:
        # Never leak decoder internals (file paths, library versions) to the caller.
        raise HTTPException(status_code=400, detail="Cannot decode image file")

    # Execute RapidOCR inference
    try:
        engine = get_engine()
        # Convert PIL to RGB numpy array for ONNX Runtime
        rgb_img = np.array(pil_img.convert("RGB"))
        ocr_out = engine(rgb_img)
    except Exception as infer_err:
        print(f"[ocr] inference error: {type(infer_err).__name__}: {infer_err}")
        raise HTTPException(status_code=500, detail="RapidOCR inference error")

    parsed_lines = parse_rapidocr_result(ocr_out)
    total_time_ms = round((time.time() - start_time) * 1000, 2)
    raw_text = "\n".join(l["text"] for l in parsed_lines)

    return {
        "success": True,
        "engine": "RapidOCR",
        "count": len(parsed_lines),
        "lines": parsed_lines,
        "rawText": raw_text,
        "time_ms": total_time_ms
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting RapidOCR microservice on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
