/**
 * AnimX Effect Conflict Resolver (v3.15.0)
 * Scans a chain of effects for overlapping properties that might overwrite each other.
 */

export function validateChain(effects) {
  const result = {
    ok: true,
    conflicts: [],
    warnings: [],
    reducedMotion: "minimal-fade"
  };

  if (!Array.isArray(effects)) {
    result.ok = false;
    result.warnings.push("Effect chain must be an array.");
    return result;
  }

  const transformEffects = [];
  const opacityEffects = [];

  effects.forEach(eff => {
    let name = typeof eff === 'string' ? eff : eff.effect;
    if (!name) return;
    
    // Naive heuristic detection for core properties
    if (name.includes('up') || name.includes('down') || name.includes('left') || name.includes('right') || name.includes('zoom') || name.includes('lift') || name.includes('flip')) {
      transformEffects.push(name);
    }
    if (name.includes('fade') || name.includes('reveal')) {
      opacityEffects.push(name);
    }
  });

  if (transformEffects.length > 1) {
    result.warnings.push(`Potential Transform Conflict: [${transformEffects.join(', ')}]. Use CSS variables to compose transforms safely.`);
  }

  if (opacityEffects.length > 1) {
    result.warnings.push(`Potential Opacity Conflict: [${opacityEffects.join(', ')}]. Ensure entrance and hover states don't clash.`);
  }

  return result;
}
