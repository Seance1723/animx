/**
 * AnimX Preset Alias Mapper (v3.14.0)
 * Safely resolves old v1.x camelCase naming conventions to v3.x kebab-case standard.
 */

export const PRESET_ALIASES = {
  "fadeUp": "fade-up",
  "fadeup": "fade-up",
  "fadeDown": "fade-down",
  "zoomIn": "zoom-in",
  "textMaskUp": "text-mask-up",
  "buttonGlow": "button-glow",
  "slideLeft": "slide-left",
  "slideRight": "slide-right"
};

export function resolvePresetAlias(name) {
  if (PRESET_ALIASES[name]) return PRESET_ALIASES[name];
  
  // Basic heuristic: Convert camelCase to kebab-case
  if (/^[a-z]+[A-Z][a-zA-Z]*$/.test(name)) {
    return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  
  return name;
}
