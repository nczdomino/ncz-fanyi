// js/features/handwriting/worker.js - Dedicated Web Worker for off-thread HanziLookup matching
// Chạy hoàn toàn trên thread riêng để không block giao diện khi người dùng vẽ 60fps trên Canvas.

let isInitialized = false;
let initPromise = null;

self.onmessage = async function(e) {
  const { type, id, payload } = e.data || {};

  // 1. Khởi tạo engine và nạp dữ liệu MakeMeAHanzi (mmah.json)
  if (type === 'INIT') {
    try {
      if (!isInitialized) {
        if (!initPromise) {
          initPromise = initHanziLookup(payload.scriptUrl, payload.dataUrl);
        }
        await initPromise;
        isInitialized = true;
      }
      self.postMessage({ type: 'INIT_RESULT', success: true });
    } catch (err) {
      self.postMessage({ type: 'INIT_RESULT', success: false, error: err.message });
    }
    return;
  }

  // 2. Nhận diện các nét vẽ
  if (type === 'RECOGNIZE') {
    if (!isInitialized) {
      self.postMessage({ type: 'RECOGNIZE_RESULT', id, candidates: [], error: 'NOT_INITIALIZED' });
      return;
    }

    try {
      const { strokes, limit } = payload || {};
      const sanitized = sanitizeStrokes(strokes);
      if (sanitized.length === 0) {
        self.postMessage({ type: 'RECOGNIZE_RESULT', id, candidates: [] });
        return;
      }

      const analyzed = new self.HanziLookup.AnalyzedCharacter(sanitized);
      const matcher = new self.HanziLookup.Matcher('mmah');
      matcher.match(analyzed, limit || 10, function(matches) {
        const candidates = (matches || [])
          .filter(m => m && m.character && m.score > -999 && !isNaN(m.score))
          .map(m => ({
            char: m.character,
            // Chuẩn hóa score về dải 0.0 -> 1.0
            score: Math.max(0, Math.min(1, (m.score + 1.5) / 3.5))
          }));
        self.postMessage({ type: 'RECOGNIZE_RESULT', id, candidates });
      });
    } catch (matchErr) {
      self.postMessage({ type: 'RECOGNIZE_RESULT', id, candidates: [], error: matchErr.message });
    }
  }
};

async function initHanziLookup(scriptUrl, dataUrl) {
  if (!self.HanziLookup) {
    importScripts(scriptUrl);
  }
  return new Promise((resolve, reject) => {
    self.HanziLookup.init('mmah', dataUrl, function(success) {
      if (success) resolve();
      else reject(new Error('HanziLookup.init failed for ' + dataUrl));
    });
  });
}

/**
 * Chuẩn hóa các nét vẽ để tránh crash thư viện:
 * - HanziLookup yêu cầu mỗi nét phải có ít nhất 2 điểm.
 * - Nếu người dùng chỉ chấm 1 điểm (tap/dot), mở rộng thành 2 điểm cách nhau 1.2px.
 * - Loại bỏ các nét rỗng.
 */
function sanitizeStrokes(strokes) {
  if (!Array.isArray(strokes) || strokes.length === 0) return [];
  const result = [];
  for (const stroke of strokes) {
    if (!Array.isArray(stroke) || stroke.length === 0) continue;
    if (stroke.length === 1) {
      const p = stroke[0];
      result.push([[p[0], p[1]], [p[0] + 1.2, p[1] + 1.2]]);
    } else {
      result.push(stroke.map(p => [p[0], p[1]]));
    }
  }
  return result;
}

