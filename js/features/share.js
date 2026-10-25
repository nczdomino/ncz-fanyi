// js/features/share.js - Native Web Share API and link copying - Dependencies: js/core/utils.js

// --- Module: Share & App Promotion ---
function shareApp() {
  const promoTitle = 'Halou (哈喽中文) · ' + t('promoTitle');
  const promoText = '🌟 Halou (哈喽中文) · ' + t('promoTitle') + '\n' +
    '📖 ' + t('promoDesc') + '\n' +
    '👉 ' + window.location.href;

  const shareData = {
    title: promoTitle,
    text: promoText,
    url: window.location.href
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    navigator.share(shareData).catch(err => {
      if (err.name !== 'AbortError') copyShareLink();
    });
  } else {
    copyShareLink();
  }
}

function copyShareLink() {
  const promoText = `🌟 Halou (哈喽中文) · ${t('promoTitle')}\n📖 ${t('promoDesc')}\n👉 ${window.location.href}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(promoText).then(() => {
      showToast(t('shareCopied') || 'Đã sao chép link và lời giới thiệu app!');
    }).catch(() => {
      fallbackCopy(promoText);
    });
  } else {
    fallbackCopy(promoText);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(t('shareCopied') || 'Đã sao chép link chia sẻ app!');
  } catch (e) {
    prompt(tx('Link chia sẻ Halou (哈喽中文):', 'Halou share link:', 'Halou 共有リンク:'), window.location.href);
  }
  if (ta.parentNode) ta.parentNode.removeChild(ta);
}
