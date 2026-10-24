// pwa.js - Dynamic PWA manifest blob injection - Dependencies: none
(function() {
  try {
    const origin = (window.location && window.location.origin && window.location.origin.startsWith('http')) 
      ? window.location.origin 
      : '';
    const pathname = (window.location && window.location.pathname) ? window.location.pathname : '/';
    const startUrl = origin ? (origin + pathname) : '.';

    const manifest = {
      name: "NCZ 翻译 · Trợ Thủ Đọc & Học Tiếng Trung AI",
      short_name: "NCZ 翻译",
      description: "Ứng dụng tra cứu từ điển HSK 1-6 tức thì, phát âm giọng chuẩn bản xứ AI, nhận diện tài liệu ảnh OCR và dịch tiếng Trung của tác giả 聂诚忠 (Nie Thanh Trung)",
      author: "聂诚忠 (Nie Thanh Trung)",
      start_url: startUrl,
      scope: origin ? (origin + pathname) : './',
      display: "standalone",
      orientation: "any",
      background_color: "#F8F9FA",
      theme_color: "#E8344E",
      icons: [
        {
          src: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bgGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23FF385C%22%2F%3E%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23E8344E%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23C01632%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22goldGrad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23FFE885%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23F5A623%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22512%22%20height%3D%22512%22%20rx%3D%22118%22%20fill%3D%22url(%23bgGrad)%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%22492%22%20height%3D%22492%22%20rx%3D%22108%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.25)%22%20stroke-width%3D%225%22%2F%3E%3Ctext%20x%3D%22256%22%20y%3D%22335%22%20font-family%3D%22'Noto%20Sans%20SC'%2C%20system-ui%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%22240%22%20text-anchor%3D%22middle%22%20fill%3D%22%23FFFFFF%22%3E%E8%AF%BB%3C%2Ftext%3E%3Crect%20x%3D%22156%22%20y%3D%2252%22%20width%3D%22200%22%20height%3D%2256%22%20rx%3D%2228%22%20fill%3D%22rgba(0%2C0%2C0%2C0.28)%22%2F%3E%3Crect%20x%3D%22158%22%20y%3D%2254%22%20width%3D%22196%22%20height%3D%2252%22%20rx%3D%2226%22%20fill%3D%22none%22%20stroke%3D%22url(%23goldGrad)%22%20stroke-width%3D%222.5%22%2F%3E%3Ctext%20x%3D%22256%22%20y%3D%2291%22%20font-family%3D%22system-ui%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2226%22%20fill%3D%22url(%23goldGrad)%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%223%22%3ENCZ%20%E7%BF%BB%E8%AF%91%3C%2Ftext%3E%3Ctext%20x%3D%22256%22%20y%3D%22448%22%20font-family%3D%22system-ui%2C%20sans-serif%22%20font-weight%3D%22800%22%20font-size%3D%2226%22%20fill%3D%22rgba(255%2C255%2C255%2C0.92)%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%223%22%3EAI%20CHINESE%20READER%3C%2Ftext%3E%3C%2Fsvg%3E",
          sizes: "192x192 512x512",
          type: "image/svg+xml",
          purpose: "any maskable"
        }
      ]
    };
    const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(blob);
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = manifestUrl;
    document.head.appendChild(link);
  } catch(e) {
    console.warn("Manifest injection warning", e);
  }
})();
