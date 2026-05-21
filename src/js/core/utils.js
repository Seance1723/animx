import { getConfig } from './config.js';

export function log(...args) {
  if (getConfig().debug) {
    console.log('[AnimX]', ...args);
  }
}

export function warn(...args) {
  console.warn('[AnimX]', ...args);
}
