import { getConfig, setConfig } from '../core/config.js';
import { isReducedMotion } from './accessibility-state.js';

export function accessibility(options) {
  if (!options) {
    // Return current config
    const current = getConfig().accessibility || {};
    return {
      reducedMotion: current.reducedMotion || getConfig().reducedMotion || 'system',
      preserveFocus: current.preserveFocus ?? true,
      focusVisibleSafe: current.focusVisibleSafe ?? true,
      preventHiddenContent: current.preventHiddenContent ?? true,
      announceChanges: current.announceChanges ?? false,
      liveRegion: current.liveRegion ?? false,
      livePoliteness: current.livePoliteness || 'polite',
      keyboardSafe: current.keyboardSafe ?? true,
      auditWarnings: current.auditWarnings ?? true
    };
  }

  // Update config
  const existing = getConfig().accessibility || {};
  const merged = { ...existing, ...options };
  setConfig({ accessibility: merged });
  
  // Synchronize reducedMotion
  if (options.reducedMotion) {
    setConfig({ reducedMotion: options.reducedMotion });
  }
}

export function motionSafe(onSafe, onReduced) {
  if (isReducedMotion()) {
    if (typeof onReduced === 'function') {
      return onReduced();
    }
    // Fallback if no reduced function provided:
    // This is essentially skipping heavy manual logic, but the driver clamped logic
    // handles native animations safely.
    return null;
  }
  
  if (typeof onSafe === 'function') {
    return onSafe();
  }
  return null;
}
