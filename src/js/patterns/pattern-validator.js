/**
 * AnimX Pattern Validator (v3.16.0)
 * Validates patterns against runtime presets and security rules.
 */

export function validatePattern(pattern, activePresets) {
  const result = {
    ok: true,
    patternId: pattern.id,
    warnings: [],
    errors: [],
    suggestions: []
  };

  // 1. Check presets exist
  pattern.uses.forEach(presetName => {
    if (!activePresets.find(p => p.name === presetName)) {
      result.errors.push(`Unknown preset: ${presetName}`);
    }
  });

  // 2. Check security rules
  if (pattern.html.includes('<script')) {
    result.errors.push(`Unsafe HTML: Script tags are not allowed in patterns.`);
  }
  if (pattern.html.includes('onmouseover=') || pattern.html.includes('onclick=')) {
    result.errors.push(`Unsafe HTML: Inline event handlers are not allowed.`);
  }

  result.ok = result.errors.length === 0;
  return result;
}
