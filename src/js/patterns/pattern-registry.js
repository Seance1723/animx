/**
 * AnimX Pattern Registry (v3.18.0)
 * Stores real-world section-level patterns.
 */

export const patterns = [
  {
    id: "hero-premium-soft",
    name: "SaaS Hero Premium Soft",
    type: "section-pattern",
    industry: "saas",
    section: "hero",
    description: "A polished hero sequence with title reveal, copy fade, CTA motion, and visual panel entrance.",
    difficulty: "easy",
    uses: ["text-mask-up", "fade-up", "button-glow-soft", "image-zoom-reveal"],
    html: `
<section class="ax-pattern-hero" style="text-align:center; padding: 100px 20px;">
  <h1 data-ax-text="lines" data-ax="text-mask-up">Build faster with AnimX</h1>
  <p data-ax="fade-up" data-ax-delay="150">Production-ready motion for modern websites.</p>
  <div style="margin-top:20px;">
    <a href="#" data-ax-component="button-glow-soft" class="ax-btn ax-btn-primary">Get started</a>
  </div>
</section>`,
    reducedMotion: "final-state",
    tags: ["hero", "saas", "text", "cta"]
  },
  {
    id: "pricing-cards-stagger",
    name: "Pricing Cards Stagger",
    type: "section-pattern",
    industry: "saas",
    section: "pricing",
    description: "A 3-column pricing grid that staggers in smoothly.",
    difficulty: "easy",
    uses: ["fade-up"],
    html: `
<section class="ax-pattern-pricing" data-ax="fade-up" data-ax-stagger="100">
  <div class="pricing-card" data-ax-item>Basic</div>
  <div class="pricing-card" data-ax-item>Pro</div>
  <div class="pricing-card" data-ax-item>Enterprise</div>
</section>`,
    reducedMotion: "final-state",
    tags: ["pricing", "grid", "stagger"]
  },
  {
    id: "dashboard-kpi-grid",
    name: "Dashboard KPI Grid",
    type: "section-pattern",
    industry: "dashboard",
    section: "stats",
    description: "Grid of KPI metrics that roll up numbers on reveal.",
    difficulty: "medium",
    uses: ["kpi-number-roll", "fade-up"],
    html: `
<div class="ax-pattern-dashboard" style="display:flex; gap:20px;">
  <div data-ax="fade-up">
    <h3>Revenue</h3>
    <h2 data-ax="kpi-number-roll" data-ax-target="5000">0</h2>
  </div>
</div>`,
    reducedMotion: "final-state",
    tags: ["dashboard", "kpi", "numbers"]
  },
  {
    id: "ecommerce-product-detail-motion",
    name: "Product Detail Motion",
    type: "section-pattern",
    industry: "ecommerce",
    section: "product",
    description: "Product page intro with gallery reveal and add-to-cart emphasis.",
    difficulty: "medium",
    uses: ["image-zoom-reveal", "fade-up", "button-ripple"],
    html: `
<div class="ax-pattern-ecommerce" style="display:flex; gap:40px;">
  <div data-ax="image-zoom-reveal">Product Image</div>
  <div>
    <h1 data-ax="fade-up">Premium Sneaker</h1>
    <button data-ax-component="button-ripple">Add to Cart</button>
  </div>
</div>`,
    reducedMotion: "final-state",
    tags: ["ecommerce", "product", "gallery"]
  },
  {
    id: "blog-card-grid-reveal",
    name: "Blog Card Grid Reveal",
    type: "section-pattern",
    industry: "blog",
    section: "blog grid",
    description: "Grid of blog cards revealing on scroll.",
    difficulty: "easy",
    uses: ["fade-up"],
    html: `
<div class="ax-pattern-blog" data-ax="fade-up" data-ax-stagger="150">
  <div data-ax-item>Article 1</div>
  <div data-ax-item>Article 2</div>
  <div data-ax-item>Article 3</div>
</div>`,
    reducedMotion: "final-state",
    tags: ["blog", "grid", "stagger"]
  },
  {
    id: "docs-sidebar-reveal",
    name: "Docs Sidebar Reveal",
    type: "section-pattern",
    industry: "documentation",
    section: "navigation",
    description: "Documentation sidebar sliding in.",
    difficulty: "easy",
    uses: ["drawer-left"],
    html: `
<nav class="ax-pattern-docs" data-ax="drawer-left">
  <ul><li>Item 1</li><li>Item 2</li></ul>
</nav>`,
    reducedMotion: "final-state",
    tags: ["docs", "sidebar", "nav"]
  }
];

export function getPatterns() {
  return patterns;
}
