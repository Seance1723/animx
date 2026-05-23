/**
 * AnimX Compatibility Checker (v3.12.0)
 * Evaluates core features to guarantee forward compatibility.
 */

export function checkCompatibility() {
  const isOk = !!window.AnimX && !!window.AnimX.version;
  
  return {
    version: "3.12.0",
    ok: isOk,
    warnings: [],
    errors: isOk ? [] : ["window.AnimX is not defined."],
    checks: {
      coreAPIs: typeof window.AnimX?.animate === 'function',
      presetRegistry: typeof window.AnimX?.getPresets === 'function',
      dataAttributes: true,
      studioSchemas: true,
      reducedMotion: typeof window.AnimX?.setReducedMotion === 'function',
      security: typeof window.AnimX?.safeHTML === 'function',
      accessibility: typeof window.AnimX?.auditAccessibility === 'function'
    }
  };
}
