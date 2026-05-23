export const creativeCatalog = {
  version: "3.20.0",
  families: ["roll", "scroll", "kinetic", "3d", "hover"],
  effects: [
    {
      name: "text-roll-up",
      category: "rolling-text",
      element: "text",
      family: "roll",
      tags: ["text", "rolling"],
      api: ["text", "data", "js"],
      reducedMotion: "final-state"
    },
    {
      name: "text-scroll-fill",
      category: "scroll-typography",
      element: "text",
      family: "scroll",
      tags: ["text", "scroll", "fill"],
      api: ["text", "data", "js"],
      reducedMotion: "final-state"
    },
    {
      name: "text-kinetic-wave",
      category: "kinetic-text",
      element: "text",
      family: "kinetic",
      tags: ["text", "kinetic", "wave"],
      api: ["text", "data", "js"],
      reducedMotion: "final-state"
    }
  ]
};

export function getCreativeEffects() {
  return creativeCatalog.effects;
}

export function getCreativeFamilies() {
  return creativeCatalog.families;
}
