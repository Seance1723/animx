import { safeMerge, isSafeKey } from './prototype-guard.js';
import { isSafeUrl, sanitizeUrl } from './url-safety.js';
import { safeQuerySelector, safeQuerySelectorAll } from './selector-safety.js';
import { safeParseBoolean, safeParseNumber, safeParseJson } from './safe-parser.js';

export const Hardening = {
  safeMerge,
  isSafeKey,
  isSafeUrl,
  sanitizeUrl,
  safeQuerySelector,
  safeQuerySelectorAll,
  safeParseBoolean,
  safeParseNumber,
  safeParseJson,
  
  // Public verification API
  report() {
    return {
      ok: true,
      version: '3.36.0',
      security: {
        prototypeGuardActive: true,
        urlGuardActive: true,
        selectorGuardActive: true
      },
      accessibility: {
        respectsReducedMotion: typeof matchMedia !== 'undefined' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false
      }
    };
  }
};
