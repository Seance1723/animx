/**
 * AnimX Studio Recipe Library (v3.26.0)
 * Handles CRUD, validation, import/export for local custom recipes.
 * Local-only, zero-dependency.
 */

const STORAGE_KEY = 'animx_studio_recipes';

const DEFAULT_RECIPES = [
  {
    id: "saas-hero-recipe",
    name: "SaaS Hero Recipe",
    description: "Hero heading, copy, CTA, and visual reveal sequence",
    type: "section-recipe",
    targetSection: "hero",
    steps: [
      {
        target: "[data-ax-role='heading']",
        preset: "text-mask-up",
        mode: "text",
        options: { split: "lines", stagger: 100 }
      },
      {
        target: "[data-ax-role='copy']",
        preset: "fade-up",
        options: { duration: 600, delay: 200 }
      }
    ],
    export: { data: true, js: true, cms: true }
  }
];

export function getRecipes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return JSON.parse(JSON.stringify(DEFAULT_RECIPES));
    return JSON.parse(data);
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_RECIPES));
  }
}

export function saveRecipe(recipe) {
  if (!validateRecipe(recipe).ok) return false;
  
  const recipes = getRecipes();
  const idx = recipes.findIndex(r => r.id === recipe.id);
  if (idx >= 0) {
    recipes[idx] = recipe;
  } else {
    recipes.push(recipe);
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return true;
  } catch (e) {
    return false;
  }
}

export function deleteRecipe(recipeId) {
  const recipes = getRecipes().filter(r => r.id !== recipeId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return true;
  } catch (e) {
    return false;
  }
}

export function validateRecipe(recipe) {
  const result = { ok: true, errors: [], warnings: [] };
  
  if (!recipe || typeof recipe !== 'object') {
    result.ok = false;
    result.errors.push('Recipe is not a valid object');
    return result;
  }
  
  if (!recipe.id || !/^[a-z0-9-]+$/.test(recipe.id)) result.errors.push('Invalid recipe id. Must be lowercase alphanumeric with hyphens.');
  if (!recipe.name) result.errors.push('Missing recipe name.');
  if (!Array.isArray(recipe.steps)) result.errors.push('Recipe steps must be an array.');
  
  if (result.errors.length === 0) {
    recipe.steps.forEach((step, idx) => {
      if (!step.target) result.errors.push(`Step ${idx} missing target selector.`);
      if (!step.preset) result.errors.push(`Step ${idx} missing preset.`);
      if (step.target && (step.target.includes('<script>') || step.target.includes('javascript:'))) {
        result.errors.push(`Step ${idx} contains unsafe target selector.`);
      }
    });
  }

  if (result.errors.length > 0) result.ok = false;
  return result;
}

export function importRecipe(jsonStr) {
  try {
    if (jsonStr.includes('__proto__') || jsonStr.includes('prototype')) {
      throw new Error("Unsafe keys detected in JSON string.");
    }
    const parsed = JSON.parse(jsonStr);
    const validation = validateRecipe(parsed);
    if (!validation.ok) return { success: false, errors: validation.errors };
    
    saveRecipe(parsed);
    return { success: true, recipe: parsed };
  } catch (e) {
    return { success: false, errors: [e.message] };
  }
}

export function exportRecipeToJS(recipe) {
  if (!recipe || !recipe.steps) return '';
  let js = `// AnimX v3.26.0 Recipe: ${recipe.name}\nAnimX.timeline()`;
  recipe.steps.forEach(step => {
    let opts = step.options ? JSON.stringify(step.options) : '{}';
    if (step.mode === 'text' && step.options) {
      opts = JSON.stringify({ type: 'text', animation: step.preset, ...step.options });
      js += `\n  .add("${step.target}", ${opts})`;
    } else {
      js += `\n  .add("${step.target}", "${step.preset}", ${opts})`;
    }
  });
  js += `\n  .play();`;
  return js;
}

export function exportRecipeToHTML(recipe) {
  if (!recipe || !recipe.steps) return '';
  let html = `<!-- AnimX v3.26.0 Recipe: ${recipe.name} -->\n<section data-ax-recipe="${recipe.id}">\n`;
  recipe.steps.forEach(step => {
    html += `  <!-- Target: ${step.target} | Preset: ${step.preset} -->\n`;
  });
  html += `</section>`;
  return html;
}
