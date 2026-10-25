// js/features/handwriting/pad.js - Interactive Multi-Character Handwriting Recognition Component (<HandwritingPad />)
// Dependencies: js/features/handwriting/engine.js, js/core/utils.js, js/data/i18n-data.js

class HandwritingPad {
  /**
   * @param {Object} props
   * @param {HTMLElement|string} props.container - Container DOM element or selector
   * @param {HandwritingEngine} [props.engine] - Recognition engine (defaults to FallbackEngine)
   * @param {string} [props.initialText=''] - Initial text to populate in buffer
   * @param {'search'|'insert'} [props.confirmType='search'] - Type of confirmation action
   * @param {boolean} [props.isTraditional=false] - Recognize Traditional Chinese (zh_TW)
   * @param {(text: string) => void} [props.onConfirm] - Confirm/Search callback with full composed string
   * @param {(buffer: string) => void} [props.onBufferChange] - Triggered whenever buffer changes
   */
  constructor(props = {}) {
    this.props = props;
    this.container = typeof props.container === 'string'
      ? document.querySelector(props.container)
      : props.container;

    this.engine = props.engine || (window.FallbackEngine ? new window.FallbackEngine() : null);
    this.confirmType = props.confirmType || 'search'; // 'search' | 'insert'
    this.buffer = props.initialText || '';
    this.isTraditional = props.isTraditional || false;
    this.onConfirm = props.onConfirm || (() => {});
    this.onBufferChange = props.onBufferChange || (() => {});

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
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="hw-pad-wrapper">
        <!-- 1. Composed Text Buffer Display (Liền mạch nhiều chữ) -->
        <div class="hw-buffer-box">
          <div class="hw-buffer-display" id="hw-buffer-display">
            <span class="hw-buffer-content" id="hw-buffer-content">${escapeHtml(this.buffer)}</span>
            <span class="hw-buffer-placeholder" id="hw-buffer-placeholder" style="display:${this.buffer ? 'none' : 'inline'};">
              ${t('hwBufferPlaceholder') || tx('Các chữ đã vẽ sẽ xuất hiện ở đây...', 'Composed characters will appear here...', '入力した漢字がここに表示されます...')}
            </span>
            <span class="hw-buffer-cursor"></span>
          </div>

          <div class="hw-buffer-actions">
            <button type="button" class="btn btn-secondary btn-sm hw-buffer-btn" id="btn-hw-backspace" title="${t('hwBackspace') || 'Xóa 1 chữ (⌫)'}" aria-label="${t('hwBackspace')}">
              ⌫
            </button>
            <button type="button" class="btn btn-secondary btn-sm hw-buffer-btn" id="btn-hw-clear-buffer" title="${t('hwClearBuffer') || 'Xóa toàn bộ'}" aria-label="${t('hwClearBuffer')}">
              ✕
            </button>
            <button type="button" class="btn btn-primary btn-sm hw-buffer-confirm-btn" id="btn-hw-confirm" title="Xác nhận">
              <span id="hw-confirm-icon">${this.confirmType === 'search' ? '🔍' : '✓'}</span>
              <span id="hw-confirm-label">${this.confirmType === 'search' ? (t('hwSearchBtn') || 'Tra từ') : (t('hwInsertBtn') || 'Chèn chữ')}</span>
            </button>
          </div>
        </div>

        <!-- 2. Candidate Bar (Thanh ứng viên thời gian thực) -->
        <div class="hw-candidate-bar" id="hw-candidate-bar" role="toolbar" aria-label="${t('hwCandidateBar')}">
          <div class="hw-candidate-loading" id="hw-loading-indicator" style="display:none;" title="Đang nhận diện...">
            <span class="hw-spinner"></span>
          </div>
          <div class="hw-candidates-list" id="hw-candidates-list">
            <span class="hw-placeholder-text" id="hw-candidate-placeholder">${t('hwCandidatePlaceholder') || tx('Vẽ chữ Hán lên khung dưới để nhận diện...', 'Draw a Chinese character below to recognize...', '下の枠に漢字を書いて認識...')}</span>
          </div>
        </div>

        <!-- 3. Canvas Drawing Area -->
        <div class="hw-canvas-container" id="hw-canvas-container">
          <canvas class="hw-canvas" id="hw-canvas" touch-action="none"></canvas>
        </div>

        <!-- 4. Canvas Action Bar (Hoàn tác, Xóa nét, Đổi lưới) -->
        <div class="hw-action-bar">
          <div class="hw-action-left">
            <button type="button" class="btn btn-secondary btn-sm hw-btn" id="btn-hw-undo" title="${t('hwUndoStroke') || 'Hoàn tác nét vẽ cuối'}" aria-label="${t('hwUndoStroke')}">
              <span>↩</span> <span class="hw-btn-label" id="hw-undo-label">${t('hwUndo') || tx('Hoàn tác nét', 'Undo', '一画戻す')}</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm hw-btn" id="btn-hw-clear" title="${t('hwClearCanvas') || 'Xóa khung vẽ'}" aria-label="${t('hwClearCanvas')}">
              <span>🗑</span> <span class="hw-btn-label" id="hw-clear-label">${t('hwClear') || tx('Xóa nét', 'Clear', '消去')}</span>
            </button>
          </div>

          <div class="hw-action-right">
            <button type="button" class="btn btn-secondary btn-sm hw-btn" id="btn-hw-grid" title="${t('hwChangeGrid')}" aria-label="${t('hwChangeGrid')}">
              <span>🔲</span> <span class="hw-btn-label" id="hw-grid-label">${this.getGridLabel()}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.canvas = this.container.querySelector('#hw-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.bufferContentEl = this.container.querySelector('#hw-buffer-content');
    this.bufferPlaceholderEl = this.container.querySelector('#hw-buffer-placeholder');
    this.candidatesListEl = this.container.querySelector('#hw-candidates-list');
    this.loadingIndicator = this.container.querySelector('#hw-loading-indicator');
  }

  setupCanvas() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const size = Math.max(220, Math.min(rect.width || 300, 360));
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

    // Buffer actions
    const btnBackspace = this.container.querySelector('#btn-hw-backspace');
    if (btnBackspace) btnBackspace.addEventListener('click', () => this.backspace());

    const btnClearBuffer = this.container.querySelector('#btn-hw-clear-buffer');
    if (btnClearBuffer) btnClearBuffer.addEventListener('click', () => this.clearBuffer());

    const btnConfirm = this.container.querySelector('#btn-hw-confirm');
    if (btnConfirm) btnConfirm.addEventListener('click', () => this.confirm());

    // Canvas actions
    const btnUndo = this.container.querySelector('#btn-hw-undo');
    if (btnUndo) btnUndo.addEventListener('click', () => this.undoStroke());

    const btnClear = this.container.querySelector('#btn-hw-clear');
    if (btnClear) btnClear.addEventListener('click', () => this.clearCanvas());

    const btnGrid = this.container.querySelector('#btn-hw-grid');
    if (btnGrid) btnGrid.addEventListener('click', () => this.toggleGrid());

    // Auto-update canvas stroke and grid colors when dark/light theme toggles
    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined' && document.documentElement) {
      this._themeObserver = new MutationObserver(() => {
        this.redrawCanvas();
      });
      this._themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }
  }

  _getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const t = Date.now();
    return [Math.max(0, Math.min(this.canvasWidth, x)), Math.max(0, Math.min(this.canvasHeight, y)), t];
  }

  _handlePointerDown(e) {
    e.preventDefault();
    this.canvas.setPointerCapture(e.pointerId);
    this.isDrawing = true;

    const pt = this._getCanvasPoint(e);
    this.currentStroke = [pt];
    this.strokes.push(this.currentStroke);

    this.redrawCanvas();
  }

  _handlePointerMove(e) {
    if (!this.isDrawing || !this.currentStroke) return;
    e.preventDefault();

    const pt = this._getCanvasPoint(e);
    const lastPt = this.currentStroke[this.currentStroke.length - 1];

    // Stroke thinning / simplification: Ignore tiny movements < 2.0px to avoid lag
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

    // Trigger real-time recognition after each stroke with 75ms debounce
    this.triggerRealtimeRecognition();
  }

  _handleKeyDown(e) {
    // Number keys 1-9: Select candidate
    if (this.candidates.length > 0) {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= this.candidates.length) {
        e.preventDefault();
        this.selectCandidate(this.candidates[num - 1].char);
        return;
      }
    }

    // Enter key: Confirm/Search
    if (e.key === 'Enter') {
      e.preventDefault();
      this.confirm();
      return;
    }

    // Backspace key: If canvas has strokes -> undo stroke; else delete last character from buffer
    if (e.key === 'Backspace') {
      if (this.strokes.length > 0) {
        e.preventDefault();
        this.undoStroke();
      } else if (this.buffer.length > 0) {
        e.preventDefault();
        this.backspace();
      }
    }
  }

  _handleResize() {
    this.setupCanvas();
  }

  _isDarkMode() {
    if (typeof document === 'undefined' || !document.documentElement) return false;
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
           (typeof state !== 'undefined' && state.darkMode === 'dark');
  }

  redrawCanvas() {
    if (!this.ctx) return;
    const w = this.canvasWidth;
    const h = this.canvasHeight;

    this.ctx.clearRect(0, 0, w, h);

    const isDark = this._isDarkMode();

    // 1. Draw Grid
    this.drawGrid(w, h, isDark);

    // 2. Draw user strokes
    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = Math.max(4.5, Math.min(7.0, w / 45));
    // High-contrast ink: off-white/light in dark mode, dark slate in light mode
    this.ctx.strokeStyle = isDark ? '#F8FAFC' : '#1E293B';

    for (const stroke of this.strokes) {
      if (!stroke || stroke.length === 0) continue;
      this.ctx.beginPath();
      if (stroke.length === 1) {
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

  drawGrid(w, h, isDark = false) {
    if (this.gridType === 'none') return;

    this.ctx.save();
    // Outer border
    this.ctx.strokeStyle = isDark ? 'rgba(244, 63, 94, 0.45)' : 'rgba(226, 54, 78, 0.25)';
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeRect(4, 4, w - 8, h - 8);

    // Grid guide lines (dashed)
    this.ctx.strokeStyle = isDark ? 'rgba(244, 63, 94, 0.25)' : 'rgba(226, 54, 78, 0.16)';
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

  getGridLabel() {
    if (this.gridType === 'mi') return t('hwGridMi') || tx('Lưới Mễ (米)', 'Mi Grid (米)', '米字格子');
    if (this.gridType === 'tian') return t('hwGridTian') || tx('Lưới Điền (田)', 'Tian Grid (田)', '田字格子');
    return t('hwGridNone') || tx('Không lưới', 'No Grid', 'グリッドなし');
  }

  toggleGrid() {
    const types = ['mi', 'tian', 'none'];
    const nextIdx = (types.indexOf(this.gridType) + 1) % types.length;
    this.gridType = types[nextIdx];

    const labelEl = this.container.querySelector('#hw-grid-label');
    if (labelEl) labelEl.textContent = this.getGridLabel();

    this.redrawCanvas();
  }

  undoStroke() {
    if (this.strokes.length === 0) return;
    this.strokes.pop();
    this.redrawCanvas();
    this.triggerRealtimeRecognition();
  }

  clearCanvas() {
    this.strokes = [];
    this.currentStroke = null;
    this.candidates = [];
    this.redrawCanvas();
    this.renderCandidateBar([]);
  }

  // --- Buffer Management (Quản lý chuỗi nhiều chữ Hán liền mạch) ---
  setBuffer(text) {
    this.buffer = String(text || '');
    this.updateBufferDisplay();
  }

  appendChar(char) {
    if (!char) return;
    this.buffer += char;
    this.updateBufferDisplay();
  }

  backspace() {
    if (!this.buffer) return;
    // Handle surrogate pairs properly (Unicode characters)
    const chars = Array.from(this.buffer);
    chars.pop();
    this.buffer = chars.join('');
    this.updateBufferDisplay();
  }

  clearBuffer() {
    this.buffer = '';
    this.updateBufferDisplay();
  }

  updateBufferDisplay() {
    if (this.bufferContentEl) {
      this.bufferContentEl.textContent = this.buffer;
    }
    if (this.bufferPlaceholderEl) {
      this.bufferPlaceholderEl.style.display = this.buffer ? 'none' : 'inline';
    }
    this.onBufferChange(this.buffer);
  }

  confirm() {
    const textToConfirm = this.buffer.trim();
    if (textToConfirm) {
      this.onConfirm(textToConfirm);
    }
    // Also clear canvas
    this.clearCanvas();
  }

  // --- Candidate Recognition & Selection ---
  triggerRealtimeRecognition() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    if (this.strokes.length === 0) {
      this.renderCandidateBar([]);
      return;
    }

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

      // Race-condition guard: ignore stale results if another stroke has been drawn
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
      const hint = this.buffer
        ? tx('Vẽ chữ tiếp theo hoặc bấm Tra từ...', 'Draw next character or tap Search...', '次の漢字を書くか検索を押してください...')
        : (t('hwCandidatePlaceholder') || tx('Vẽ chữ Hán lên khung dưới để nhận diện...', 'Draw a Chinese character below to recognize...', '下の枠に漢字を書いて認識...'));
      this.candidatesListEl.innerHTML = `<span class="hw-placeholder-text">${escapeHtml(hint)}</span>`;
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

  /**
   * User clicks a candidate:
   * Appends to buffer, clears canvas, ready for user to draw next character!
   */
  selectCandidate(char) {
    if (!char) return;
    this.appendChar(char);
    // Clear canvas so user is immediately ready to write next character
    this.clearCanvas();
  }

  /**
   * Updates all button labels, tooltips, and placeholders according to current language
   */
  updateI18nLabels() {
    if (!this.container) return;

    const placeholder = this.container.querySelector('#hw-buffer-placeholder');
    if (placeholder) {
      placeholder.textContent = t('hwBufferPlaceholder') || tx('Các chữ đã vẽ sẽ xuất hiện ở đây...', 'Composed characters will appear here...', '入力した漢字がここに表示されます...');
    }

    const candPlaceholder = this.container.querySelector('#hw-candidate-placeholder');
    if (candPlaceholder && this.strokes.length === 0) {
      candPlaceholder.textContent = t('hwCandidatePlaceholder') || tx('Vẽ chữ Hán lên khung dưới để nhận diện...', 'Draw a Chinese character below to recognize...', '下の枠に漢字を書いて認識...');
    }

    const btnBackspace = this.container.querySelector('#btn-hw-backspace');
    if (btnBackspace) btnBackspace.title = t('hwBackspace') || 'Xóa 1 chữ (⌫)';

    const btnClearBuffer = this.container.querySelector('#btn-hw-clear-buffer');
    if (btnClearBuffer) btnClearBuffer.title = t('hwClearBuffer') || 'Xóa toàn bộ';

    const confirmLabel = this.container.querySelector('#hw-confirm-label');
    if (confirmLabel) {
      confirmLabel.textContent = this.confirmType === 'search' ? (t('hwSearchBtn') || 'Tra từ') : (t('hwInsertBtn') || 'Chèn chữ');
    }

    const undoLabel = this.container.querySelector('#hw-undo-label');
    if (undoLabel) undoLabel.textContent = t('hwUndo') || tx('Hoàn tác nét', 'Undo', '一画戻す');

    const clearLabel = this.container.querySelector('#hw-clear-label');
    if (clearLabel) clearLabel.textContent = t('hwClear') || tx('Xóa nét', 'Clear', '消去');

    const gridLabel = this.container.querySelector('#hw-grid-label');
    if (gridLabel) gridLabel.textContent = this.getGridLabel();
  }

  destroy() {
    if (this._themeObserver) {
      this._themeObserver.disconnect();
      this._themeObserver = null;
    }
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
