import { getConfig } from './config.js';

export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  
  const config = getConfig();
  if (config.reducedMotion === 'always') return true;
  if (config.reducedMotion === 'never') return false;
  
  // 'system' is default
  if (typeof window.matchMedia === 'function') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery && mediaQuery.matches;
  }
  
  return false;
}
