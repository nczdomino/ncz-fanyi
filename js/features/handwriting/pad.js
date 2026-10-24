// js/features/handwriting/pad.js - Interactive Handwriting Canvas & Quiz Component (<HandwritingPad />)
// Dependencies: js/features/handwriting/engine.js, js/core/utils.js, js/data/i18n-data.js, optional: window.HanziWriter

class HandwritingPad {
  /**
   * @param {Object} props
   * @param {HTMLElement|string} props.container - Container DOM element or selector
   * @param {HandwritingEngine} [props.engine] - Recognition engine (defaults to FallbackEngine)
   * @param {'recognize'|'quiz'} [props.mode='recognize'] - Operating mode
   * @param {string} [props.targetChar] - Target character for quiz mode
   * @param {boolean} [props.isTraditional=false] - Recognize Traditional Chinese (zh_TW)
   * @param {(char: string) => void} [props.onSelect] - Candidate selection callback
   * @param {(summary: Object) => void} [props.onQuizComplete] - Quiz completion callback
   * @param {(mode: string) => void} [props.onModeChange] - Mode switch callback
   */
  constructor(props = {}) {
    this.props = props;
    this.container = typeof props.container === 'string'
      ? document.querySelector(props.container)
      : props.container;

    this.engine = props.engine || (window.FallbackEngine ? new window.FallbackEngine() : null);
    this.mode = props.mode || 'recognize'; // 'recognize' | 'quiz'
    this.targetChar = props.targetChar || '';
    this.isTraditional = props.isTraditional || false;
    this.onSelect = props.onSelect || (() => {});
    this.onQuizComplete = props.onQuizComplete || (() => {});
    this.onModeChange = props.onModeChange || (() => {});

    // Drawing state
    this.strokes = []; // Array of strokes: [ [ [x, y, t], ... ], ... ]
    this.currentStroke = null;
    this.isDrawing = false;
    this.gridType = 'mi'; // 'mi' (Mễ 米) | 'tian' (Điền 田) | 'none'
    this.candidates = [];
    this.isLoading = false;

    // Concurrency & Debounce
    this.debounceTimer = null;
    this.currentRequestId = 0;

    // Quiz state (HanziWriter)
    this.writer = null;
    this.quizMistakes = 0;
    this.quizTotalStrokes = 0;

    // Bound listeners for clean cleanup
    this._onPointerDown = this._handlePointerDown.bind(this);
    this._onPointerMove = this._handlePointerMove.bind(this);
    this._onPointerUp = this._handlePointerUp.bind(this);
    this._onKeyDown = this._handleKeyDown.bind(this);
    this._onResize = this._handleResize.bind(this);

    if (this.container) {
      this.mount(this.container);
    }
  }

  mount(container) {
    this.container = container;
    this.render();
    this.setupCanvas();
    this.attachEvents();

    if (this.engine && typeof this.engine.init === 'function') {
      this.engine.init().catch(e => console.warn('[HandwritingPad] Engine init note:', e));
    }

    if (this.mode === 'quiz' && this.targetChar) {
      this.initQuiz(this.targetChar);
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="hw-pad-wrapper" data-mode="${this.mode}">
        <!-- Top Toolbar & Candidate Bar -->
        <div class="hw-candidate-bar" id="hw-candidate-bar" role="toolbar" aria-label="Gợi ý chữ ứng viên">
          <div class="hw-candidate-loading" id="hw-loading-indicator" style="display:none;" title="Đang nhận diện...">
            <span class="hw-spinner"></span>
          </div>
          <div class="hw-candidates-list" id="hw-candidates-list">
            <span class="hw-placeholder-text">${tx('Viết chữ Hán lên khung dưới để nhận diện...', 'Draw a Chinese character below to recognize...', '下の枠に漢字を書いて認識...')}</span>
          </div>
        </div>

        <!-- Canvas Drawing & Quiz Container -->
        <div class="hw-canvas-container" id="hw-canvas-container">
          <canvas class="hw-canvas" id="hw-canvas" touch-action="none"></canvas>
          <div class="hw-quiz-target-layer" id="hw-quiz-layer" style="display:none;"></div>
        </div>

        <!-- Quiz Stats Bar (Only visible in quiz mode) -->
        <div class="hw-quiz-bar" id="hw-quiz-bar" style="display:${this.mode === 'quiz' ? 'flex' : 'none'};">
          <div class="hw-quiz-target-badge">
            <span>Mục tiêu:</span> <b id="hw-quiz-char">${escapeHtml(this.targetChar || '—')}</b>
          </div>
          <div class="hw-quiz-stats">
            <span class="hw-stat-item">Lỗi: <b id="hw-quiz-mistakes">0</b></span>
            <span class="hw-stat-item">Điểm: <b id="hw-quiz-score">100%</b></span>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-hw-quiz-reset" title="Thử lại chữ này">↺ Làm lại</button>
        </div>

        <!-- Bottom Action Bar -->
        <div class="hw-action-bar">
          <div class="hw-action-left">
            <button type="button" class="btn btn-secondary btn-sm hw-btn" id="btn-hw-undo" title="Hoàn tác nét cuối (Undo)" aria-label="Hoàn tác nét cuối">
              <span>↩</span> <span class="hw-btn-label">${tx('Hoàn tác', 'Undo', '元に戻す')}</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm hw-btn" id="btn-hw-clear" title="Xóa toàn bộ khung vẽ" aria-label="Xóa nét vẽ">
              <span>🗑</span> <span class="hw-btn-label">${tx('Xóa hết', 'Clear', '消去')}</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm hw-btn" id="btn-hw-grid" title="Đổi kiểu lưới viết (Mễ / Điền / Trống)" aria-label="Đổi kiểu lưới">
              <span>🔲</span> <span class="hw-btn-label" id="hw-grid-label">Lưới Mễ</span>
            </button>
          </div>

          <div class="hw-action-right">
            <!-- Mode Switcher -->
            <button type="button" class="btn btn-outline btn-sm hw-btn" id="btn-hw-mode" title="Chuyển chế độ Luyện viết nét / Nhận diện tự do">
              <span>${this.mode === 'quiz' ? '✍️' : '🎯'}</span>
              <span id="hw-mode-label">${this.mode === 'quiz' ? tx('Nhận diện', 'Recognize', '認識モード') : tx('Luyện nét (Quiz)', 'Quiz Mode', 'クイズ練習')}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.canvas = this.container.querySelector('#hw-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.candidatesListEl = this.container.querySelector('#hw-candidates-list');
    this.loadingIndicator = this.container.querySelector('#hw-loading-indicator');
    this.quizLayer = this.container.querySelector('#hw-quiz-layer');
    this.quizBar = this.container.querySelector('#hw-quiz-bar');
  }

  setupCanvas() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set square size based on container width
    const size = Math.max(240, Math.min(rect.width || 320, 380));
    this.canvasWidth = size;
    this.canvasHeight = size;

    this.canvas.width = Math.round(size * dpr);
    this.canvas.height = Math.round(size * dpr);
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';

    this.ctx.resetTransform && this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    this.redrawCanvas();
  }

  attachEvents() {
    if (!this.canvas) return;

    this.canvas.addEventListener('pointerdown', this._onPointerDown);
    this.canvas.addEventListener('pointermove', this._onPointerMove);
    this.canvas.addEventListener('pointerup', this._onPointerUp);
    this.canvas.addEventListener('pointercancel', this._onPointerUp);

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('resize', this._onResize);

    // Button actions
    const btnUndo = this.container.querySelector('#btn-hw-undo');
    if (btnUndo) btnUndo.addEventListener('click', () => this.undo());

    const btnClear = this.container.querySelector('#btn-hw-clear');
    if (btnClear) btnClear.addEventListener('click', () => this.clear());

    const btnGrid = this.container.querySelector('#btn-hw-grid');
    if (btnGrid) btnGrid.addEventListener('click', () => this.toggleGrid());

    const btnMode = this.container.querySelector('#btn-hw-mode');
    if (btnMode) btnMode.addEventListener('click', () => this.toggleMode());

    const btnQuizReset = this.container.querySelector('#btn-hw-quiz-reset');
    if (btnQuizReset) btnQuizReset.addEventListener('click', () => this.resetQuiz());
  }

  _getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const t = Date.now();
    return [Math.max(0, Math.min(this.canvasWidth, x)), Math.max(0, Math.min(this.canvasHeight, y)), t];
  }

  _handlePointerDown(e) {
    if (this.mode === 'quiz') return; // In quiz mode, HanziWriter handles interaction
    e.preventDefault();
    this.canvas.setPointerCapture(e.pointerId);
    this.isDrawing = true;

    const pt = this._getCanvasPoint(e);
    this.currentStroke = [pt];
    this.strokes.push(this.currentStroke);

    this.redrawCanvas();
  }

  _handlePointerMove(e) {
    if (!this.isDrawing || !this.currentStroke || this.mode === 'quiz') return;
    e.preventDefault();

    const pt = this._getCanvasPoint(e);
    const lastPt = this.currentStroke[this.currentStroke.length - 1];

    // Stroke thinning / simplification: Ignore tiny movements < 2px to avoid bloat
    if (lastPt) {
      const dx = pt[0] - lastPt[0];
      const dy = pt[1] - lastPt[1];
      if (dx * dx + dy * dy < 4.0) return;
    }

    this.currentStroke.push(pt);
    this.redrawCanvas();
  }

  _handlePointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (ignore) {}

    // Trigger real-time recognition after each stroke with 80ms debounce
    this.triggerRealtimeRecognition();
  }

  _handleKeyDown(e) {
    // Keyboard support: Number keys 1-9 select candidates
    if (this.mode === 'recognize' && this.candidates.length > 0) {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= this.candidates.length) {
        e.preventDefault();
        this.selectCandidate(this.candidates[num - 1].char);
      }
    }
  }

  _handleResize() {
    this.setupCanvas();
  }

  redrawCanvas() {
    if (!this.ctx) return;
    const w = this.canvasWidth;
    const h = this.canvasHeight;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Grid
    this.drawGrid(w, h);

    // 2. Draw user strokes
    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = Math.max(4.5, Math.min(7.0, w / 45));
    this.ctx.strokeStyle = '#1E293B';

    for (const stroke of this.strokes) {
      if (!stroke || stroke.length === 0) continue;
      this.ctx.beginPath();
      if (stroke.length === 1) {
        // Single point dot
        this.ctx.arc(stroke[0][0], stroke[0][1], this.ctx.lineWidth / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.fill();
      } else {
        this.ctx.moveTo(stroke[0][0], stroke[0][1]);
        for (let i = 1; i < stroke.length; i++) {
          this.ctx.lineTo(stroke[i][0], stroke[i][1]);
        }
        this.ctx.stroke();
      }
    }
    this.ctx.restore();
  }

  drawGrid(w, h) {
    if (this.gridType === 'none') return;

    this.ctx.save();
    // Outer border
    this.ctx.strokeStyle = 'rgba(226, 54, 78, 0.25)';
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeRect(4, 4, w - 8, h - 8);

    // Grid guide lines (dashed)
    this.ctx.strokeStyle = 'rgba(226, 54, 78, 0.16)';
    this.ctx.lineWidth = 1.0;
    this.ctx.setLineDash([4, 4]);

    this.ctx.beginPath();
    // Cross center lines (田字格)
    this.ctx.moveTo(w / 2, 4);
    this.ctx.lineTo(w / 2, h - 4);
    this.ctx.moveTo(4, h / 2);
    this.ctx.lineTo(w - 4, h / 2);

    // Diagonal lines (Mễ tự cách 米字格)
    if (this.gridType === 'mi') {
      this.ctx.moveTo(4, 4);
      this.ctx.lineTo(w - 4, h - 4);
      this.ctx.moveTo(w - 4, 4);
      this.ctx.lineTo(4, h - 4);
    }

    this.ctx.stroke();
    this.ctx.restore();
  }

  toggleGrid() {
    const types = ['mi', 'tian', 'none'];
    const labels = {
      mi: 'Lưới Mễ (米)',
      tian: 'Lưới Điền (田)',
      none: 'Không lưới',
    };
    const nextIdx = (types.indexOf(this.gridType) + 1) % types.length;
    this.gridType = types[nextIdx];

    const labelEl = this.container.querySelector('#hw-grid-label');
    if (labelEl) labelEl.textContent = labels[this.gridType];

    this.redrawCanvas();
  }

  undo() {
    if (this.strokes.length === 0) return;
    this.strokes.pop();
    this.redrawCanvas();
    this.triggerRealtimeRecognition();
  }

  clear() {
    this.strokes = [];
    this.currentStroke = null;
    this.candidates = [];
    this.redrawCanvas();
    this.renderCandidateBar([]);
  }

  triggerRealtimeRecognition() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    if (this.strokes.length === 0) {
      this.renderCandidateBar([]);
      return;
    }

    // Debounce 75ms to bundle rapid stroke events
    this.debounceTimer = setTimeout(() => {
      this.recognize();
    }, 75);
  }

  async recognize() {
    if (!this.engine || this.strokes.length === 0) return;

    const reqId = ++this.currentRequestId;
    this.setLoading(true);

    try {
      const candidates = await this.engine.recognize(this.strokes, {
        limit: 10,
        isTraditional: this.isTraditional,
        width: this.canvasWidth,
        height: this.canvasHeight,
      });

      // Ignore stale response if a newer stroke was drawn in the meantime (Race-condition protection)
      if (reqId !== this.currentRequestId) return;

      this.candidates = candidates || [];
      this.renderCandidateBar(this.candidates);
    } catch (err) {
      if (reqId === this.currentRequestId) {
        console.warn('[HandwritingPad] Recognition error:', err);
      }
    } finally {
      if (reqId === this.currentRequestId) {
        this.setLoading(false);
      }
    }
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
    if (this.loadingIndicator) {
      this.loadingIndicator.style.display = isLoading ? 'inline-flex' : 'none';
    }
  }

  renderCandidateBar(candidates) {
    if (!this.candidatesListEl) return;

    if (!candidates || candidates.length === 0) {
      this.candidatesListEl.innerHTML = `<span class="hw-placeholder-text">${tx('Viết chữ Hán lên khung dưới để nhận diện...', 'Draw a Chinese character below to recognize...', '下の枠に漢字を書いて認識...')}</span>`;
      return;
    }

    let html = '';
    candidates.slice(0, 10).forEach((cand, idx) => {
      const char = cand.char;
      const keyNum = idx < 9 ? (idx + 1) : '';
      html += `
        <button type="button" class="hw-candidate-item" data-char="${escapeHtml(char)}" title="Chọn chữ '${escapeHtml(char)}' (Phím ${keyNum})">
          <span class="hw-cand-char">${escapeHtml(char)}</span>
          ${keyNum ? `<span class="hw-cand-key">${keyNum}</span>` : ''}
        </button>
      `;
    });

    this.candidatesListEl.innerHTML = html;

    // Attach click handlers
    this.candidatesListEl.querySelectorAll('.hw-candidate-item').forEach(item => {
      item.addEventListener('click', () => {
        const char = item.getAttribute('data-char');
        if (char) this.selectCandidate(char);
      });
    });
  }

  selectCandidate(char) {
    if (!char) return;
    this.onSelect(char);
    // Clear canvas and prepare for next character
    this.clear();
  }

  // --- Quiz Mode (HanziWriter Integration) ---
  toggleMode() {
    const nextMode = this.mode === 'recognize' ? 'quiz' : 'recognize';
    this.setMode(nextMode);
  }

  setMode(mode, targetChar = null) {
    this.mode = mode;
    if (targetChar) this.targetChar = targetChar;

    const wrapper = this.container.querySelector('.hw-pad-wrapper');
    if (wrapper) wrapper.setAttribute('data-mode', mode);

    const modeLabel = this.container.querySelector('#hw-mode-label');
    if (modeLabel) {
      modeLabel.textContent = mode === 'quiz' ? tx('Nhận diện', 'Recognize', '認識モード') : tx('Luyện nét (Quiz)', 'Quiz Mode', 'クイズ練習');
    }

    if (this.quizBar) {
      this.quizBar.style.display = mode === 'quiz' ? 'flex' : 'none';
    }

    if (mode === 'quiz') {
      const charToQuiz = this.targetChar || '好';
      this.initQuiz(charToQuiz);
    } else {
      if (this.quizLayer) this.quizLayer.style.display = 'none';
      if (this.canvas) this.canvas.style.display = 'block';
      this.clear();
    }

    this.onModeChange(mode);
  }

  initQuiz(char) {
    this.targetChar = char;
    this.quizMistakes = 0;
    this.quizTotalStrokes = 0;

    const charBadge = this.container.querySelector('#hw-quiz-char');
    if (charBadge) charBadge.textContent = char;
    this.updateQuizStats();

    if (!window.HanziWriter) {
      showToast(tx('Đang tải bộ kiểm tra nét chữ...', 'Loading stroke evaluator...', '筆順評価エンジンを読み込み中...'));
      loadScriptOnce('https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js')
        .then(() => this.initQuiz(char))
        .catch(err => console.error('HanziWriter load error', err));
      return;
    }

    if (this.canvas) this.canvas.style.display = 'none';
    if (this.quizLayer) {
      this.quizLayer.style.display = 'flex';
      this.quizLayer.innerHTML = '';
    }

    const size = Math.max(240, Math.min(this.canvasWidth || 300, 360));
    const quizDiv = document.createElement('div');
    quizDiv.id = 'hw-quiz-hanzi-target';
    quizDiv.style.width = size + 'px';
    quizDiv.style.height = size + 'px';
    this.quizLayer.appendChild(quizDiv);

    try {
      this.writer = window.HanziWriter.create(quizDiv.id, char, {
        width: size,
        height: size,
        padding: 15,
        showOutline: true,
        showCharacter: false,
        showHintAfterMisses: 2,
        highlightOnComplete: true,
        strokeColor: '#E8344E',
        outlineColor: 'rgba(232, 52, 78, 0.18)',
        drawingColor: '#1F2937',
        drawingWidth: 16,
      });

      this.writer.quiz({
        onMistake: (strokeData) => {
          this.quizMistakes++;
          this.updateQuizStats();
        },
        onCorrectStroke: (strokeData) => {
          this.quizTotalStrokes = strokeData.totalStrokes || (this.quizTotalStrokes + 1);
          this.updateQuizStats();
        },
        onComplete: (summary) => {
          const totalMistakes = summary.totalMistakes || 0;
          const strokeNum = summary.strokeNum || this.quizTotalStrokes || 1;
          const score = Math.max(0, Math.round(100 - (totalMistakes / strokeNum) * 35));

          showToast(tx(`🎉 Hoàn thành xuất sắc chữ '${char}'! Điểm: ${score}%`, `🎉 Great job! Completed '${char}' with ${score}%`, `🎉 完了！'${char}' スコア: ${score}%`));

          this.onQuizComplete({
            char,
            mistakes: totalMistakes,
            totalStrokes: strokeNum,
            score,
          });
        },
      });
    } catch (hwErr) {
      console.warn('[HandwritingPad] HanziWriter quiz error:', hwErr);
    }
  }

  resetQuiz() {
    if (this.writer && this.targetChar) {
      this.initQuiz(this.targetChar);
    }
  }

  updateQuizStats() {
    const mistakesEl = this.container.querySelector('#hw-quiz-mistakes');
    const scoreEl = this.container.querySelector('#hw-quiz-score');
    if (mistakesEl) mistakesEl.textContent = this.quizMistakes;
    if (scoreEl) {
      const score = Math.max(0, Math.round(100 - this.quizMistakes * 10));
      scoreEl.textContent = score + '%';
    }
  }

  destroy() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('resize', this._onResize);

    if (this.canvas) {
      this.canvas.removeEventListener('pointerdown', this._onPointerDown);
      this.canvas.removeEventListener('pointermove', this._onPointerMove);
      this.canvas.removeEventListener('pointerup', this._onPointerUp);
      this.canvas.removeEventListener('pointercancel', this._onPointerUp);
    }

    if (this.engine) {
      this.engine.destroy();
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Global export
if (typeof window !== 'undefined') {
  window.HandwritingPad = HandwritingPad;
}

