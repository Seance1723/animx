// AnimX Studio Template Registry
export const templateRegistry = [
  // Hero Sections
  {
    id: "hero-saas-v1",
    name: "SaaS Hero Intro",
    category: "Hero",
    description: "Animated SaaS hero with text reveal and CTA.",
    tags: ["hero", "saas", "timeline", "text", "cta"],
    difficulty: "easy",
    recommendedExport: ["data", "js"],
    template: {
      html: `
        <div style="padding: 80px 20px; text-align: center; max-width: 800px; margin: 0 auto;">
          <div id="hero-badge" class="ax-studio-selectable" style="display: inline-block; padding: 4px 12px; background: #e0e7ff; color: #4f46e5; border-radius: 99px; margin-bottom: 20px; font-weight: 600; font-size: 0.85rem;">New Version 3.1 is here</div>
          <h1 id="hero-title" class="ax-studio-selectable" style="font-size: 4rem; line-height: 1.1; margin: 0 0 20px 0; letter-spacing: -0.02em;">Build better software <span style="color: #6366f1;">faster</span>.</h1>
          <p id="hero-copy" class="ax-studio-selectable" style="font-size: 1.25rem; color: #64748b; margin: 0 0 40px 0; max-width: 600px; margin-left: auto; margin-right: auto;">The ultimate tool for developers who want to ship performant features without the headache.</p>
          <div style="display: flex; gap: 15px; justify-content: center;">
            <button id="hero-btn-primary" class="ax-studio-selectable" style="background: #4f46e5; color: white; padding: 14px 28px; border-radius: 8px; border: none; font-size: 1.1rem; cursor: pointer; font-weight: 600;">Get Started</button>
            <button id="hero-btn-secondary" class="ax-studio-selectable" style="background: white; color: #0f172a; border: 1px solid #cbd5e1; padding: 14px 28px; border-radius: 8px; font-size: 1.1rem; cursor: pointer; font-weight: 600;">View Docs</button>
          </div>
        </div>
      `
    }
  },
  {
    id: "hero-agency-v1",
    name: "Agency Hero",
    category: "Hero",
    tags: ["hero", "agency", "creative"],
    difficulty: "easy",
    recommendedExport: ["data"],
    template: {
      html: `<div style="padding: 100px 20px;"><h1 id="agency-title" class="ax-studio-selectable" style="font-size: 5rem; font-weight: 900; text-transform: uppercase;">We Create <br>Digital Magic</h1></div>`
    }
  },
  // Features
  {
    id: "feature-grid-stagger-v1",
    name: "Staggered Feature Grid",
    category: "Features",
    tags: ["grid", "cards", "stagger"],
    difficulty: "easy",
    recommendedExport: ["data", "cms"],
    template: {
      html: `
        <div style="padding: 60px 20px; max-width: 1000px; margin: 0 auto;">
          <h2 id="feature-title" class="ax-studio-selectable" style="text-align: center; font-size: 2.5rem; margin-bottom: 40px;">Everything you need</h2>
          <div id="feature-grid" class="ax-studio-selectable" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
            <div class="ax-studio-selectable" style="padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
              <div style="width: 48px; height: 48px; background: #fee2e2; border-radius: 12px; margin-bottom: 20px;"></div>
              <h3 style="margin: 0 0 10px 0;">Lightning Fast</h3>
              <p style="margin: 0; color: #64748b; line-height: 1.6;">Optimized for speed and performance out of the box.</p>
            </div>
            <div class="ax-studio-selectable" style="padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
              <div style="width: 48px; height: 48px; background: #dcfce7; border-radius: 12px; margin-bottom: 20px;"></div>
              <h3 style="margin: 0 0 10px 0;">Fully Secure</h3>
              <p style="margin: 0; color: #64748b; line-height: 1.6;">Built with security-first architecture.</p>
            </div>
            <div class="ax-studio-selectable" style="padding: 30px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
              <div style="width: 48px; height: 48px; background: #e0e7ff; border-radius: 12px; margin-bottom: 20px;"></div>
              <h3 style="margin: 0 0 10px 0;">Easy Integration</h3>
              <p style="margin: 0; color: #64748b; line-height: 1.6;">Works with your existing stack seamlessly.</p>
            </div>
          </div>
        </div>
      `
    }
  },
  // Pricing
  {
    id: "pricing-three-card-v1",
    name: "3-Tier Pricing",
    category: "Pricing",
    tags: ["pricing", "stagger", "cards"],
    difficulty: "intermediate",
    recommendedExport: ["data", "js"],
    template: {
      html: `
        <div style="padding: 60px 20px; max-width: 1000px; margin: 0 auto; text-align: center;">
          <h2 id="pricing-title" class="ax-studio-selectable" style="font-size: 2.5rem; margin-bottom: 10px;">Simple Pricing</h2>
          <p id="pricing-copy" class="ax-studio-selectable" style="color: #64748b; margin-bottom: 40px;">No hidden fees. Cancel anytime.</p>
          <div id="pricing-grid" class="ax-studio-selectable" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: center;">
            <div style="padding: 40px 30px; background: white; border-radius: 16px; border: 1px solid #e2e8f0;">
              <h3>Starter</h3><div style="font-size: 2.5rem; font-weight: bold; margin: 20px 0;">$9<span style="font-size:1rem;color:#94a3b8">/mo</span></div>
            </div>
            <div style="padding: 50px 30px; background: #0f172a; color: white; border-radius: 16px; transform: scale(1.05); z-index: 2;">
              <div style="color: #818cf8; font-weight: bold; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 15px;">Most Popular</div>
              <h3 style="color: white;">Pro</h3><div style="font-size: 2.5rem; font-weight: bold; margin: 20px 0;">$29<span style="font-size:1rem;color:#94a3b8">/mo</span></div>
            </div>
            <div style="padding: 40px 30px; background: white; border-radius: 16px; border: 1px solid #e2e8f0;">
              <h3>Enterprise</h3><div style="font-size: 2.5rem; font-weight: bold; margin: 20px 0;">$99<span style="font-size:1rem;color:#94a3b8">/mo</span></div>
            </div>
          </div>
        </div>
      `
    }
  },
  // Text
  {
    id: "text-scramble-hero-v1",
    name: "Scramble Text Reveal",
    category: "Text",
    tags: ["text", "scramble", "hero"],
    difficulty: "advanced",
    recommendedExport: ["js"],
    template: {
      html: `
        <div style="padding: 100px 20px; text-align: center;">
          <h1 id="text-scramble" class="ax-studio-selectable" style="font-size: 4rem; font-family: monospace;">INITIALIZING_SYSTEM...</h1>
        </div>
      `
    }
  },
  // CMS
  {
    id: "cms-hero-recipe-v1",
    name: "CMS Hero Recipe",
    category: "CMS/no-code",
    tags: ["cms", "recipe", "hero"],
    difficulty: "easy",
    recommendedExport: ["cms"],
    template: {
      html: `
        <div data-ax-recipe="hero-saas-intro" class="ax-studio-selectable" style="padding: 60px 20px; text-align: center; background: #f8fafc; border: 2px dashed #cbd5e1;">
          <h1>Dynamic CMS Title</h1>
          <p>This entire block is controlled by a single data-ax-recipe attribute.</p>
        </div>
      `
    }
  }
];

export function getTemplates() {
  return templateRegistry;
}

export function getTemplateById(id) {
  return templateRegistry.find(t => t.id === id);
}

export function getCategories() {
  const cats = new Set(templateRegistry.map(t => t.category));
  return Array.from(cats).sort();
}
