/**
 * AnimX CMS Recipe Registry (v3.28.0)
 */

const registry = new Map();

// Built-in recipes
registry.set('cms-saas-hero-reveal', { id: 'cms-saas-hero-reveal', platform: 'generic-cms', type: 'section-recipe' });
registry.set('cms-feature-grid-stagger', { id: 'cms-feature-grid-stagger', platform: 'generic-cms', type: 'section-recipe' });
registry.set('wp-gutenberg-hero-reveal', { id: 'wp-gutenberg-hero-reveal', platform: 'wordpress', type: 'section-recipe' });
registry.set('wf-cms-collection-stagger', { id: 'wf-cms-collection-stagger', platform: 'webflow', type: 'section-recipe' });
registry.set('wp-woocommerce-product-card', { id: 'wp-woocommerce-product-card', platform: 'wordpress', type: 'component-recipe' });

export function registerRecipe(id, config) {
  registry.set(id, config);
}

export function getRecipe(id) {
  return registry.get(id);
}

export function getRecipes() {
  return Array.from(registry.keys());
}

export function getCMSRecipes() {
  return Array.from(registry.values());
}
