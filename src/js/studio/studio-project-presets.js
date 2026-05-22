const projectPresets = [
  {
    id: "saas-landing",
    name: "SaaS Landing Page",
    description: "A smooth animation system for modern SaaS landing pages",
    targetSections: ["hero", "features", "pricing", "cta"],
    recommendedMotionStyle: "smooth-professional",
    recommendedExport: "data"
  },
  {
    id: "agency-website",
    name: "Agency Website",
    description: "Bold reveals and creative scroll interactions.",
    targetSections: ["hero", "portfolio", "testimonials", "contact"],
    recommendedMotionStyle: "bold-launch",
    recommendedExport: "js"
  },
  {
    id: "cms-blog",
    name: "CMS Blog Listing",
    description: "Simple stagger load for cards suitable for Webflow/WP.",
    targetSections: ["hero", "blog-grid"],
    recommendedMotionStyle: "minimal-subtle",
    recommendedExport: "cms"
  }
];

export function getProjectPresets() {
  return projectPresets;
}

export function getProjectPresetById(id) {
  return projectPresets.find(p => p.id === id);
}
