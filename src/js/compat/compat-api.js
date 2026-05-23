import { getFeatureSupport, supports, getBrowserInfo, isReducedMotion } from './feature-detect.js';
import { getFallbackMap, registerFallback, resolveFallback } from './fallback-registry.js';

export const compatApi = {
  supports,
  getFeatureSupport,
  getBrowserInfo,
  getFallback: (presetName) => {
    const map = getFallbackMap();
    return map[presetName] || null;
  },
  registerFallback,
  resolveFallback,
  validateFallbacks: () => {
    return true; // Simplified for now
  },
  compatReport: () => {
    return {
      version: "3.32.0",
      features: getFeatureSupport(),
      browser: getBrowserInfo(),
      reducedMotion: isReducedMotion()
    };
  }
};
