/**
 * AnimX Advanced CMS API (v3.28.0)
 */

import { registerRecipe, getRecipe, getRecipes, getCMSRecipes } from './cms-recipe-registry.js';
import { applyRecipe } from './cms-recipe-runner.js';
import { refreshCMS } from './cms-refresh-manager.js';
import { observeCMS, disconnectCMS } from './cms-mutation-observer.js';

export function cms(config = {}) {
  console.log('[AnimX CMS] Initializing...', config);
  if (config.autoInit) {
    refreshCMS(config.root || document.body);
  }
  if (config.observe) {
    observeCMS(config.root || document.body, config);
  }
}

export function validateCMSRecipe(recipe) {
  if (!recipe || !recipe.id) return { ok: false, errors: ['Invalid recipe shape'] };
  return { ok: true, errors: [] };
}

export function exportCMSRecipe(recipeId, format = 'json') {
  console.log(`[AnimX CMS] Exporting recipe ${recipeId} as ${format}`);
  return {};
}

export function cmsAudit() {
  return { status: 'healthy', nodesObserved: 0 };
}

export function destroyCMS() {
  disconnectCMS();
  console.log('[AnimX CMS] Destroyed (observers disconnected)');
}

export { registerRecipe, getRecipe, getRecipes, getCMSRecipes, applyRecipe, refreshCMS, observeCMS, disconnectCMS };
