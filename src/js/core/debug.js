// debug.js
import { getConfig } from './config.js';

const warnings = new Set();

export const debug = {
  warnOnce(id, message, ...args) {
    if (getConfig().debug && !warnings.has(id)) {
      console.warn(`[AnimX] ${message}`, ...args);
      warnings.add(id);
    }
  },
  warn(message, ...args) {
    if (getConfig().debug) {
      console.warn(`[AnimX] ${message}`, ...args);
    }
  },
  info(message, ...args) {
    if (getConfig().debug) {
      console.info(`[AnimX] ${message}`, ...args);
    }
  },
  error(message, ...args) {
    if (getConfig().debug) {
      console.error(`[AnimX Error] ${message}`, ...args);
    }
  },
  clear() {
    warnings.clear();
  }
};
