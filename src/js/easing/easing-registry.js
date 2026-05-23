/**
 * AnimX Easing Registry (v3.19.0)
 * Manages custom cubic-bezier math parsing securely.
 */

const easingMap = {
  "premium-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
  "premium-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
  "snappy-out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "elastic-soft": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  "bounce-soft": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "natural": "cubic-bezier(0.25, 0.1, 0.25, 1)"
};

export function registerEase(name, bezierStr) {
  const isValid = /^cubic-bezier\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*\)$/.test(bezierStr);
  if (!isValid) {
    console.warn(`[AnimX Easing] Invalid cubic-bezier rejected for ${name}: ${bezierStr}`);
    return false;
  }
  easingMap[name] = bezierStr;
  return true;
}

export function getEase(name) {
  return easingMap[name] || null;
}

export function getEases() {
  return { ...easingMap };
}

export function validateEase(bezierStr) {
  return /^cubic-bezier\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*\)$/.test(bezierStr);
}
