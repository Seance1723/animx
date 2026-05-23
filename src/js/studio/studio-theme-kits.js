export const themeKits = {
  "premium-soft": {
    id: "premium-soft",
    name: "Premium Soft",
    description: "Soft, polished animation style for SaaS and premium websites",
    tokens: {
      durationFast: 250,
      durationNormal: 650,
      durationSlow: 1000,
      easePrimary: "smooth",
      staggerSmall: 60,
      staggerNormal: 120,
      distanceSmall: 16,
      distanceNormal: 32,
      intensity: "soft"
    },
    mappings: {
      "hero.heading": "text-mask-up",
      "hero.copy": "fade-up",
      "hero.cta": "button-glow-soft",
      "card.default": "card-lift-soft",
      "section.default": "section-fade-up",
      "image.default": "image-zoom-in"
    }
  },
  "enterprise-clean": {
    id: "enterprise-clean",
    name: "Enterprise Clean",
    description: "Subtle, professional animations designed not to distract.",
    tokens: {
      durationFast: 200,
      durationNormal: 400,
      durationSlow: 800,
      easePrimary: "linear",
      staggerSmall: 40,
      staggerNormal: 80,
      distanceSmall: 8,
      distanceNormal: 16,
      intensity: "minimal"
    },
    mappings: {
      "hero.heading": "fade-up",
      "hero.copy": "fade-in",
      "hero.cta": "button-lift",
      "card.default": "card-fade-up",
      "section.default": "fade-in",
      "image.default": "fade-in"
    }
  }
  // Other kits will be expanded via local overrides.
};

export function getThemeKit(id) {
  return themeKits[id] || themeKits["premium-soft"];
}

export function getAllThemeKits() {
  return Object.values(themeKits);
}
