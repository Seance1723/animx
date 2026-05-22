// debug.js
import { getConfig } from './config.js';

const warnings = new Set();

export const debug = {
  warnOnce(code, message, ...args) {
    if (getConfig().debug && !warnings.has(code)) {
      console.warn(`AnimX [${code}]: ${message}`, ...args);
      warnings.add(code);
    }
  },
  warn(code, message, ...args) {
    if (getConfig().debug) {
      // If code doesn't look like an AX_ code, treat it as just a message
      if (code && typeof code === 'string' && code.startsWith('AX_')) {
        console.warn(`AnimX [${code}]: ${message}`, ...args);
      } else {
        console.warn(`[AnimX] ${code}`, message, ...args); // Fallback for legacy
      }
    }
  },
  info(message, ...args) {
    if (getConfig().debug) {
      console.info(`[AnimX] ${message}`, ...args);
    }
  },
  error(code, message, ...args) {
    if (getConfig().debug) {
      if (code && typeof code === 'string' && code.startsWith('AX_')) {
        console.error(`AnimX Error [${code}]: ${message}`, ...args);
      } else {
        console.error(`[AnimX Error] ${code}`, message, ...args);
      }
    }
  },
  clear() {
    warnings.clear();
  }
};
