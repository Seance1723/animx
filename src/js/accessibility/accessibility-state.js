import { getConfig, setConfig } from '../core/config.js';

/**
 * Returns current reduced motion status.
 * Evaluates 'system', 'always', or 'never' against the OS preferences.
 */
export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  
  const config = getConfig();
  
  // Backwards compatibility and primary check
  const mode = (config.accessibility && config.accessibility.reducedMotion) 
               ? config.accessibility.reducedMotion 
               : config.reducedMotion;

  if (mode === 'always') return true;
  if (mode === 'never') return false;
  
  // 'system' is default
  if (typeof window.matchMedia === 'function') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery && mediaQuery.matches;
  }
  
  return false;
}

export function setReducedMotion(mode) {
  if (!['system', 'always', 'never'].includes(mode)) {
    console.warn(`[AnimX] Invalid reduced motion mode: ${mode}. Expected 'system', 'always', or 'never'.`);
    return;
  }
  setConfig({ reducedMotion: mode });
  if (getConfig().accessibility) {
    setConfig({ accessibility: { ...getConfig().accessibility, reducedMotion: mode } });
  }
}

export function getReducedMotion() {
  if (typeof window === 'undefined') {
    return { mode: 'system', active: false, systemPrefersReduced: false };
  }
  
  const config = getConfig();
  const mode = (config.accessibility && config.accessibility.reducedMotion) 
               ? config.accessibility.reducedMotion 
               : config.reducedMotion;
               
  let systemPrefersReduced = false;
  if (typeof window.matchMedia === 'function') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    systemPrefersReduced = mediaQuery && mediaQuery.matches;
  }
  
  return {
    mode: mode || 'system',
    active: isReducedMotion(),
    systemPrefersReduced
  };
}
