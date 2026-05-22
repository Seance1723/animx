// svg-morph-validator.js
// Validates if two path command arrays are structurally compatible

import { parsePathString } from './svg-path-parser.js';
import { absolutizeCommands } from './svg-path-normalizer.js';

export function validateMorph(fromStr, toStr) {
  if (!fromStr || !toStr) {
    return { ok: false, reason: 'Missing source or target path data', strategy: 'fallback' };
  }

  const fromRaw = parsePathString(fromStr);
  const toRaw = parsePathString(toStr);

  if (fromRaw.length === 0 || toRaw.length === 0) {
    return { ok: false, reason: 'Empty path data', strategy: 'fallback' };
  }

  // Strategy 1: Direct Command Alignment
  // If the commands perfectly align, we can just interpolate their numbers.
  let directOk = true;
  if (fromRaw.length !== toRaw.length) {
    directOk = false;
  } else {
    for (let i = 0; i < fromRaw.length; i++) {
      if (fromRaw[i].type !== toRaw[i].type || fromRaw[i].values.length !== toRaw[i].values.length) {
        directOk = false;
        break;
      }
    }
  }

  if (directOk) {
    return { 
      ok: true, 
      strategy: 'direct', 
      fromPoints: fromRaw.length, 
      toPoints: toRaw.length,
      fromCmds: fromRaw,
      toCmds: toRaw
    };
  }

  // Strategy 2: Absolute Normalization
  // If they only differ by relative vs absolute, or H/V vs L, absolutize them and check again.
  const fromAbs = absolutizeCommands(fromRaw);
  const toAbs = absolutizeCommands(toRaw);

  let absOk = true;
  if (fromAbs.length !== toAbs.length) {
    absOk = false;
  } else {
    for (let i = 0; i < fromAbs.length; i++) {
      if (fromAbs[i].type !== toAbs[i].type || fromAbs[i].values.length !== toAbs[i].values.length) {
        absOk = false;
        break;
      }
    }
  }

  if (absOk) {
    return {
      ok: true,
      strategy: 'normalized',
      fromPoints: fromAbs.length,
      toPoints: toAbs.length,
      fromCmds: fromAbs,
      toCmds: toAbs
    };
  }

  // Mismatch in command counts or types.
  // In a full editor library (like GSAP MorphSVG) we would subdivide paths here.
  // For AnimX's practical zero-dependency engine, we fall back safely.
  return {
    ok: false,
    reason: `Incompatible path structure. Source has ${fromRaw.length} commands, Target has ${toRaw.length} commands. Ensure paths have matching curves/lines or use fallback.`,
    strategy: 'fallback',
    fromPoints: fromRaw.length,
    toPoints: toRaw.length
  };
}
