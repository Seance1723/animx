import { registerPack } from './pack-registry.js';

export const defaultPacks = [
  {
    schema: "animx-pack-manifest",
    schemaVersion: "1.0.0",
    animxVersion: "3.29.0",
    id: "animx-text-essentials-pack",
    name: "AnimX Text Essentials Pack",
    version: "1.0.0",
    description: "Core text reveals, masking, and staggering presets.",
    type: "preset-pack",
    category: "text",
    tags: ["text", "typography", "stagger", "reveal"],
    tier: "free",
    compatibility: { animx: ">=3.29.0", core: true },
    quality: { validated: true, securityChecked: true, accessibilityChecked: true, reducedMotionChecked: true },
    contents: {
      presets: ["text-mask-up", "text-fade-up", "text-roll-up"]
    }
  },
  {
    schema: "animx-pack-manifest",
    schemaVersion: "1.0.0",
    animxVersion: "3.29.0",
    id: "animx-media-reveal-pack",
    name: "AnimX Media Reveal Pack",
    version: "1.0.0",
    description: "Image reveals, masks, clips, and parallax wrappers.",
    type: "preset-pack",
    category: "media",
    tags: ["image", "video", "mask", "reveal", "parallax"],
    tier: "free",
    compatibility: { animx: ">=3.29.0", core: true },
    quality: { validated: true, securityChecked: true, accessibilityChecked: true, reducedMotionChecked: true },
    contents: {
      presets: ["image-reveal-left", "image-mask-up", "media-parallax-y"]
    }
  },
  {
    schema: "animx-pack-manifest",
    schemaVersion: "1.0.0",
    animxVersion: "3.29.0",
    id: "animx-cms-recipes-pack",
    name: "AnimX CMS Recipes Pack",
    version: "1.0.0",
    description: "Ready-to-use recipes for WordPress, Webflow, and generic CMS lists.",
    type: "recipe-pack",
    category: "cms",
    tags: ["cms", "webflow", "wordpress", "stagger", "list"],
    tier: "free",
    compatibility: { animx: ">=3.29.0", core: true },
    quality: { validated: true, securityChecked: true, accessibilityChecked: true, reducedMotionChecked: true },
    contents: {
      recipes: ["cms-feature-grid-stagger", "cms-list-stagger"]
    }
  }
];

export function initDefaultPacks() {
  defaultPacks.forEach(p => registerPack(p));
}
