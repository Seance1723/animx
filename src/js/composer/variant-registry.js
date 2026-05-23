/**
 * AnimX Variant Registry (v3.15.0)
 * Stores named combinations of animation effects.
 */

const variantRegistry = new Map();

// Default Variants
const defaultVariants = [
  {
    name: "premium-card-hover",
    element: "card",
    effects: [
      { type: "entrance", effect: "fade-up" },
      { type: "hover", effect: "card-lift" },
      { type: "hover", effect: "card-spotlight-hover" }
    ],
    reducedMotion: "minimal-fade"
  },
  {
    name: "variant-hero-text-premium",
    element: "text",
    effects: [
      { type: "entrance", effect: "text-mask-up", options: { split: "lines", stagger: 80 } }
    ],
    reducedMotion: "minimal-fade"
  },
  {
    name: "variant-cta-button-premium",
    element: "button",
    effects: [
      { type: "entrance", effect: "fade-up" },
      { type: "hover", effect: "button-glow-soft" }
    ],
    reducedMotion: "minimal-fade"
  },
  {
    name: "variant-dashboard-kpi-card",
    element: "card",
    effects: [
      { type: "entrance", effect: "fade-up", options: { duration: 400 } },
      { type: "entrance", effect: "kpi-number-roll" }
    ],
    reducedMotion: "minimal-fade"
  }
];

defaultVariants.forEach(v => variantRegistry.set(v.name, v));

export function registerVariant(name, config) {
  if (!name || !config || !config.effects) {
    console.warn('[AnimX] Invalid variant registration format.');
    return;
  }
  variantRegistry.set(name, config);
}

export function getVariant(name) {
  return variantRegistry.get(name);
}

export function getVariants() {
  return Array.from(variantRegistry.values());
}
