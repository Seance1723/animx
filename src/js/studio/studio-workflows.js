export const workflows = [
  {
    id: "wf-quick-landing",
    name: "Quick Landing Page Setup",
    description: "Generates a standard SaaS landing page with Hero, Features, Pricing, and CTA.",
    execute: (projectState) => {
      projectState.type = "saas-landing";
      projectState.motionStyle = "smooth-professional";
      projectState.sections = [
        { id: "hero-1", type: "hero", preset: "hero-saas-v1" },
        { id: "features-1", type: "features", preset: "feature-grid-stagger-v1" },
        { id: "pricing-1", type: "pricing", preset: "pricing-three-card-v1" },
        { id: "cta-1", type: "cta", preset: "cta-final-reveal-v1" }
      ];
      return projectState;
    }
  },
  {
    id: "wf-cms-setup",
    name: "CMS No-Code Setup",
    description: "Configures data-attribute driven sections suitable for WordPress/Webflow.",
    execute: (projectState) => {
      projectState.type = "cms-blog";
      projectState.motionStyle = "minimal-subtle";
      projectState.sections = [
        { id: "hero-1", type: "hero", preset: "cms-hero-recipe-v1" },
        { id: "blog-1", type: "blog", preset: "cms-feature-grid-v1" }
      ];
      return projectState;
    }
  }
];

export function getWorkflows() {
  return workflows;
}
