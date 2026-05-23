/**
 * AnimX CMS Recipe Runner (v3.28.0)
 */

import { getRecipe } from './cms-recipe-registry.js';

export function applyRecipe(target, recipeId) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const recipe = getRecipe(recipeId);
  if (!recipe) {
    console.warn(`[AnimX CMS] Recipe not found: ${recipeId}`);
    return;
  }

  elements.forEach(el => {
    // Avoid double initialization
    if (el.hasAttribute('data-ax-cms-initialized')) return;
    
    console.log(`[AnimX CMS] Applying recipe ${recipeId} to`, el);
    el.setAttribute('data-ax-cms-initialized', 'true');
    // Actual effect application would map nested selectors here
  });
}
