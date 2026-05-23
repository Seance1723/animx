/**
 * AnimX CMS Refresh Manager (v3.28.0)
 */

import { applyRecipe } from './cms-recipe-runner.js';

export function refreshCMS(root = document.body) {
  const rootEl = typeof root === 'string' ? document.querySelector(root) : root;
  if (!rootEl || typeof rootEl.querySelectorAll !== 'function') return;

  const recipes = rootEl.querySelectorAll('[data-ax-recipe]');
  recipes.forEach(el => {
    const id = el.getAttribute('data-ax-recipe');
    applyRecipe(el, id);
  });
}
