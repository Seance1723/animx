/**
 * AnimX Fallback Registry
 * Maps advanced effects to simpler safe fallbacks when APIs are missing.
 */

const fallbackMap = {
  "text-mask-up": {
    requires: ["cssVariables", "clipPath"],
    fallback: "text-fade-up",
    reducedMotion: "final-state"
  },
  "image-mask-reveal": {
    requires: ["clipPath"],
    fallback: "image-fade-up"
  },
  "bg-aurora-soft": {
    requires: ["cssVariables", "filter"], // filter is often needed for aurora
    fallback: "bg-gradient-shift"
  },
  "view-transition-card-expand": {
    requires: ["viewTransitions"],
    fallback: "shared-element-scale-fade"
  }
};

export function getFallbackMap() {
  return fallbackMap;
}

export function registerFallback(presetName, fallbackDef) {
  fallbackMap[presetName] = fallbackDef;
}

export function resolveFallback(presetName, features, isReduced) {
  if (isReduced) {
    const def = fallbackMap[presetName];
    if (def && def.reducedMotion) return def.reducedMotion;
    return "final-state"; // Default safety
  }

  const def = fallbackMap[presetName];
  if (!def) return presetName; // No known fallback, attempt to run normally

  let needsFallback = false;
  for (const req of def.requires) {
    if (!features[req]) {
      needsFallback = true;
      break;
    }
  }

  if (needsFallback) {
    return def.fallback || "final-state";
  }

  return presetName;
}
