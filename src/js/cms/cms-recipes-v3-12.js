/**
 * AnimX CMS Recipes (v3.12.0)
 * High-level configurations for complete UI patterns.
 */

export const cmsRecipes312 = [
  {
    name: 'cms-blog-grid-reveal',
    family: 'cms', category: 'recipe', element: 'section', tags: ['blog', 'grid'],
    reducedMotion: 'instant',
    usage: ['data'],
    description: 'Staggers a blog grid automatically.'
  },
  {
    name: 'cms-dashboard-kpi-reveal',
    family: 'cms', category: 'recipe', element: 'section', tags: ['dashboard'],
    reducedMotion: 'instant',
    usage: ['data'],
    description: 'Animates the KPI numbers and charts when a dashboard section loads.'
  },
  {
    name: 'cms-navigation-motion',
    family: 'cms', category: 'recipe', element: 'nav', tags: ['header'],
    reducedMotion: 'instant',
    usage: ['data'],
    description: 'Applies standard slide-down and hover effects to a standard CMS header.'
  }
];
