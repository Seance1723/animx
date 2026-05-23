/**
 * AnimX Viewport Scene Packs (v3.23.0)
 * Pre-configured scrolling templates for SaaS, eCommerce, Portfolios.
 */

export const SCROLL_STORY_PACKS = {
  "saas-scroll-story": {
    pin: true,
    scrub: true,
    scenes: [
      { target: ".story-heading", effect: "text-scroll-fill", start: 0, end: 0.3 },
      { target: ".story-image", effect: "image-scroll-scale", start: 0.2, end: 0.7 }
    ]
  },
  "ecommerce-product-story": {
    pin: true,
    scrub: true,
    scenes: [
      { target: ".product-image", effect: "image-scroll-scale", start: 0, end: 0.5 },
      { target: ".feature-list", effect: "fade-up", start: 0.4, end: 1 }
    ]
  }
};
