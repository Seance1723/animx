import { getConfig, setConfig } from '../core/config.js';
import { safeMerge } from './safe-merge.js';

export function security(options) {
  if (!options) {
    // Return current config
    return getConfig().security || {};
  }

  // Update config safely
  const existing = getConfig().security || {};
  const mergedSecurity = safeMerge({ ...existing }, options);
  
  // We use the root config setter to ensure listeners or updates trigger properly
  // Since we only pass the security object, it merges safely.
  setConfig({ security: mergedSecurity });
}
