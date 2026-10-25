# Lightweight Python 3.10 image for RapidOCR ONNX inference
FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive \
    PORT=8000

# Install minimal system dependencies required by OpenCV / Pillow
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY app.py .

# Run as an unprivileged user: a compromised OCR container should not be root.
RUN useradd --create-home --uid 10001 ocruser \
    && chown -R ocruser:ocruser /app
USER ocruser

EXPOSE 8000

# Run FastAPI with uvicorn
CMD ["python", "app.py"]
