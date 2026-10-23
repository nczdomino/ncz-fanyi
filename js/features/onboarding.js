// js/features/onboarding.js - User onboarding slides and initialization check - Dependencies: js/core/utils.js, js/features/theme-i18n.js

// --- Module: Onboarding ---
let onboardingStep = 1;
function checkOnboarding() {
  const seen = localStorage.getItem('cr_onboarding_seen');
  if (!seen) {
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) overlay.classList.add('active');
    showOnboardingStep(1);
  }
}

function showOnboardingStep(step) {
  onboardingStep = step;
  document.querySelectorAll('.onboarding-slide').forEach(s => s.style.display = 'none');
  const slide = document.getElementById('onboarding-step-' + step);
  if (slide) slide.style.display = 'block';

  document.querySelectorAll('.onboarding-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx + 1 === step);
  });
}

function nextOnboarding() {
  if (onboardingStep < 3) {
    showOnboardingStep(onboardingStep + 1);
  } else {
    finishOnboarding();
  }
}

function finishOnboarding() {
  localStorage.setItem('cr_onboarding_seen', 'true');
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.classList.remove('active');
}
