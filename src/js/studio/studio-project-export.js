import { generateProjectRecipe } from './studio-recipe-generator.js';
import { getProjectState } from './studio-project-state.js';
import { validateProjectExport } from './studio-project-validator.js';

export function exportFullProject(type = 'data') {
  const proj = getProjectState();
  const validation = validateProjectExport(proj);
  
  if (!validation.ok) {
    return { ok: false, error: "Validation failed", warnings: validation.warnings };
  }
  
  const recipe = generateProjectRecipe(type);
  
  return {
    ok: true,
    html: recipe.html,
    js: recipe.js,
    warnings: validation.warnings
  };
}
