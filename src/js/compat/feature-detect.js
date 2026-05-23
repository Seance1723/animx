/**
 * AnimX Feature Detection Engine
 * Uses safe, localized checks to determine browser capabilities.
 */

let cachedFeatures = null;

export function getFeatureSupport() {
  if (cachedFeatures) return cachedFeatures;

  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  
  if (!isBrowser) {
    return {
      webAnimations: false,
      intersectionObserver: false,
      resizeObserver: false,
      mutationObserver: false,
      cssVariables: false,
      cssMask: false,
      clipPath: false,
      viewTransitions: false,
      pointerEvents: false,
      requestAnimationFrame: false
    };
  }

  const supports = (typeof CSS !== 'undefined' && CSS.supports) ? CSS.supports : () => false;

  cachedFeatures = {
    webAnimations: typeof document.body.animate === 'function',
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    mutationObserver: 'MutationObserver' in window,
    cssVariables: supports('--a', '0'),
    cssMask: supports('-webkit-mask-image', 'url()') || supports('mask-image', 'url()'),
    clipPath: supports('clip-path', 'circle(0)'),
    viewTransitions: 'startViewTransition' in document,
    pointerEvents: 'PointerEvent' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window
  };

  return cachedFeatures;
}

export function supports(feature) {
  const features = getFeatureSupport();
  return !!features[feature];
}

export function isReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getBrowserInfo() {
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  
  return {
    name: "Unknown",
    engine: "Unknown",
    isMobile,
    isTouch
  };
}

// Allow simulated failures for testing
export function _simulateMissingFeature(feature) {
  if (!cachedFeatures) getFeatureSupport();
  cachedFeatures[feature] = false;
}

export function _resetSimulations() {
  cachedFeatures = null;
}
