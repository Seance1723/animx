/**
 * AnimX Industry Demo Packs (v3.19.0)
 * Page-level flows combining multiple section patterns.
 */

export const industryPacks = [
  {
    id: "saas-landing-flow",
    name: "SaaS Landing Page Flow",
    industry: "saas",
    sections: [
      "hero-premium-soft",
      "pricing-cards-stagger"
    ],
    motionStyle: "premium-soft",
    exportTypes: ["data", "js", "cms"]
  },
  {
    id: "dashboard-overview-flow",
    name: "Dashboard Overview Flow",
    industry: "dashboard",
    sections: [
      "dashboard-kpi-grid"
    ],
    motionStyle: "snappy",
    exportTypes: ["data", "js"]
  },
  {
    id: "ecommerce-product-flow",
    name: "Ecommerce Product Flow",
    industry: "ecommerce",
    sections: [
      "ecommerce-product-detail-motion"
    ],
    motionStyle: "smooth",
    exportTypes: ["data", "js"]
  }
];

export function getIndustryPacks() {
  return industryPacks;
}
