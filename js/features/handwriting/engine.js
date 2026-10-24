// js/features/handwriting/engine.js - Chinese Handwriting Recognition Engines
// Architecture:
// - HandwritingEngine (Interface base)
// - HanziLookupEngine (Offline WebWorker via HanziLookup + mmah.json)
// - CloudEngine (Optional Google Input Tools via backend proxy /api/handwriting)
// - FallbackEngine (Hybrid offline-first with optional cloud fallback)

/**
 * @typedef {[number, number]} Point
 * @typedef {Point[]} Stroke
 * @typedef {{ char: string, score: number }} Candidate
 */

/**
 * Base abstract class defining the HandwritingEngine interface
 */
class HandwritingEngine {
  constructor(options = {}) {
    this.options = options;
  }

  async init() {
    return true;
  }

  /**
   * Recognizes character from an array of strokes
   * @param {Stroke[]} strokes
   * @param {{ limit?: number, isTraditional?: boolean, width?: number, height?: number }} [opts]
   * @returns {Promise<Candidate[]>}
   */
  async recognize(strokes, opts = {}) {
    throw new Error('recognize() must be implemented by subclass');
  }

  destroy() {}
}

/**
 * 1. HanziLookupEngine (MẶC ĐỊNH):
 * Sử dụng thư viện Hanzi Lookup (mmah.json 9,500+ chữ Hán) chạy hoàn toàn offline trên trình duyệt.
 * Chạy trong Web Worker để đảm bảo giao diện vẽ canvas mượt mà 60fps không bị lag.
 */
class HanziLookupEngine extends HandwritingEngine {
  constructor(options = {}) {
    super(options);
    this.scriptUrl = options.scriptUrl || '/js/vendor/hanzilookup/hanzilookup.min.js';
    this.dataUrl = options.dataUrl || '/js/vendor/hanzilookup/mmah.json';
    this.workerPath = options.workerPath || '/js/features/handwriting/worker.js';

    this.worker = null;
    this.isReady = false;
    this.initPromise = null;
    this.pendingRequests = new Map();
    this.reqIdCounter = 0;
  }

  async init() {
    if (this.isReady) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      try {
        if (typeof Worker !== 'undefined') {
          this.worker = new Worker(this.workerPath);
          this.worker.onmessage = (e) => this._handleWorkerMessage(e);
          this.worker.onerror = (err) => {
            console.error('[HanziLookupEngine] Worker error, falling back to main thread:', err);
            this._initMainThreadFallback().then(resolve).catch(reject);
          };

          // Send init command to worker
          this.worker.postMessage({
            type: 'INIT',
            payload: {
              scriptUrl: this.scriptUrl,
              dataUrl: this.dataUrl,
            },
          });

          // Worker init callback listener
          const initHandler = (e) => {
            if (e.data && e.data.type === 'INIT_RESULT') {
              this.worker.removeEventListener('message', initHandler);
              if (e.data.success) {
                this.isReady = true;
                resolve(true);
              } else {
                console.warn('[HanziLookupEngine] Worker init failed, trying main thread:', e.data.error);
                this._initMainThreadFallback().then(resolve).catch(reject);
              }
            }
          };
          this.worker.addEventListener('message', initHandler);
        } else {
          // No worker support -> Main thread fallback
          this._initMainThreadFallback().then(resolve).catch(reject);
        }
      } catch (err) {
        console.warn('[HanziLookupEngine] Worker init exception:', err);
        this._initMainThreadFallback().then(resolve).catch(reject);
      }
    });

    return this.initPromise;
  }

  async _initMainThreadFallback() {
    if (this.isReady) return true;
    if (!window.HanziLookup) {
      await loadScriptOnce(this.scriptUrl);
    }
    return new Promise((resolve, reject) => {
      window.HanziLookup.init('mmah', this.dataUrl, (success) => {
        if (success) {
          this.isReady = true;
          this.mainThreadMode = true;
          resolve(true);
        } else {
          reject(new Error('Failed to load HanziLookup data on main thread'));
        }
      });
    });
  }

  _handleWorkerMessage(e) {
    const { type, id, candidates, error } = e.data || {};
    if (type === 'RECOGNIZE_RESULT' && this.pendingRequests.has(id)) {
      const { resolve, reject } = this.pendingRequests.get(id);
      this.pendingRequests.delete(id);
      if (error) {
        resolve([]); // Graceful empty fallback instead of crash
      } else {
        resolve(candidates || []);
      }
    }
  }

  async recognize(strokes, opts = {}) {
    if (!strokes || strokes.length === 0) return [];
    await this.init();

    const limit = opts.limit || 10;

    // A. Main thread mode (fallback when worker unavailable)
    if (this.mainThreadMode) {
      return this._recognizeMainThread(strokes, limit);
    }

    // B. Web Worker mode
    const id = ++this.reqIdCounter;
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.worker.postMessage({
        type: 'RECOGNIZE',
        id,
        payload: { strokes, limit },
      });

      // Safety timeout: 4 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          resolve([]);
        }
      }, 4000);
    });
  }

  _recognizeMainThread(strokes, limit) {
    try {
      const sanitized = strokes.map(st => {
        if (st.length === 1) return [[st[0][0], st[0][1]], [st[0][0] + 1.2, st[0][1] + 1.2]];
        return st.map(p => [p[0], p[1]]);
      });
      const analyzed = new window.HanziLookup.AnalyzedCharacter(sanitized);
      const matcher = new window.HanziLookup.Matcher('mmah');
      return new Promise((resolve) => {
        matcher.match(analyzed, limit, (matches) => {
          const results = (matches || [])
            .filter(m => m && m.character && m.score > -999 && !isNaN(m.score))
            .map(m => ({
              char: m.character,
              score: Math.max(0, Math.min(1, (m.score + 1.5) / 3.5))
            }));
          resolve(results);
        });
      });
    } catch (err) {
      console.warn('[HanziLookupEngine] Main thread recognize error:', err);
      return [];
    }
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pendingRequests.clear();
    this.isReady = false;
  }
}

/**
 * 2. CloudEngine (TÙY CHỌN, tắt mặc định bằng feature flag):
 * Gọi endpoint không chính thức của Google Input Tools thông qua backend proxy /api/handwriting.
 * (KHÔNG gọi trực tiếp từ trình duyệt để tránh CORS và bảo vệ cấu trúc ứng dụng).
 */
class CloudEngine extends HandwritingEngine {
  constructor(options = {}) {
    super(options);
    this.apiEndpoint = options.apiEndpoint || '/api/handwriting';
  }

  async recognize(strokes, opts = {}) {
    if (!strokes || strokes.length === 0) return [];

    const width = opts.width || 300;
    const height = opts.height || 300;
    const limit = opts.limit || 10;
    const language = opts.isTraditional ? 'zh_TW' : 'zh_CN';

    // Định dạng ink theo chuẩn Google: [ [xs, ys, ts], ... ]
    const ink = strokes.map(stroke => {
      const xs = stroke.map(p => Math.round(p[0]));
      const ys = stroke.map(p => Math.round(p[1]));
      const ts = stroke.map((p, idx) => p[2] || (idx * 20));
      return [xs, ys, ts];
    });

    const payload = {
      options: 'enable_pre_space',
      requests: [
        {
          writing_guide: {
            writing_area_width: width,
            writing_area_height: height,
          },
          ink,
          language,
          max_num_results: limit,
        },
      ],
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`CloudEngine HTTP ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && Array.isArray(resData.candidates)) {
        const total = resData.candidates.length;
        return resData.candidates.map((c, i) => ({
          char: typeof c === 'string' ? c : (c.char || String(c)),
          // Gán score tương đối dựa trên thứ tự xếp hạng
          score: Math.max(0.2, (total - i) / total),
        }));
      }

      return [];
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn('[CloudEngine] Proxy request error:', err.message);
      throw err;
    }
  }
}

/**
 * 3. FallbackEngine:
 * Chiến lược ưu tiên: Thử HanziLookup offline trước.
 * Nếu kết quả tốt nhất có độ tin cậy thấp (< confidenceThreshold) và cloud đang bật (cloudEnabled = true),
 * thì thử CloudEngine. Nếu lỗi mạng hoặc timeout thì quay về kết quả offline.
 * Không bao giờ để lỗi mạng làm hỏng trải nghiệm người dùng.
 */
class FallbackEngine extends HandwritingEngine {
  constructor(options = {}) {
    super(options);
    this.offlineEngine = options.offlineEngine || new HanziLookupEngine(options);
    this.cloudEngine = options.cloudEngine || new CloudEngine(options);
    this.cloudEnabled = options.cloudEnabled ?? false; // Tắt mặc định theo yêu cầu
    this.confidenceThreshold = options.confidenceThreshold || 0.65;
  }

  setCloudEnabled(enabled) {
    this.cloudEnabled = !!enabled;
  }

  isCloudEnabled() {
    return this.cloudEnabled;
  }

  async init() {
    return this.offlineEngine.init();
  }

  async recognize(strokes, opts = {}) {
    if (!strokes || strokes.length === 0) return [];

    let offlineResults = [];
    try {
      offlineResults = await this.offlineEngine.recognize(strokes, opts);
    } catch (offlineErr) {
      console.warn('[FallbackEngine] Offline engine failed:', offlineErr);
    }

    const topScore = offlineResults[0]?.score || 0;
    const shouldTryCloud = this.cloudEnabled && (offlineResults.length === 0 || topScore < this.confidenceThreshold);

    if (shouldTryCloud) {
      try {
        const cloudResults = await this.cloudEngine.recognize(strokes, opts);
        if (cloudResults && cloudResults.length > 0) {
          return cloudResults;
        }
      } catch (cloudErr) {
        console.warn('[FallbackEngine] Cloud recognition failed, gracefully falling back to offline results:', cloudErr.message);
      }
    }

    return offlineResults;
  }

  destroy() {
    this.offlineEngine.destroy();
    this.cloudEngine.destroy();
  }
}

// Global exports for vanilla JS and ES module compatibility
if (typeof window !== 'undefined') {
  window.HandwritingEngine = HandwritingEngine;
  window.HanziLookupEngine = HanziLookupEngine;
  window.CloudEngine = CloudEngine;
  window.FallbackEngine = FallbackEngine;
}

