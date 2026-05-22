import { CMS_RECIPES } from './cms-recipes.js';
import { isCMSInitialized, setCMSInitialized } from './cms-state.js';
import { isEditorEnvironment } from './cms-safety.js';
import { querySafe } from './cms-utils.js';

export function parseAndApplyCMS(root, animx) {
  if (!root || typeof root.querySelectorAll !== 'function') return;

  const isEditor = isEditorEnvironment();

  // 1. Recipes
  const recipes = querySafe(root, '[data-ax-recipe]');
  recipes.forEach(el => {
    if (isCMSInitialized(el)) return;
    const recipeName = el.getAttribute('data-ax-recipe');
    if (isEditor && el.getAttribute('data-ax-editor-safe') === 'true') {
      el.classList.add('ax-editor-safe');
      setCMSInitialized(el);
      return;
    }
    const recipe = CMS_RECIPES[recipeName];
    if (recipe && typeof recipe.apply === 'function') {
      recipe.apply(el, animx);
      setCMSInitialized(el);
    }
  });

  // 2. Section Shortcuts
  const sections = querySafe(root, '[data-ax-section]');
  sections.forEach(el => {
    if (isCMSInitialized(el)) return;
    const secName = el.getAttribute('data-ax-section');
    if (isEditor && el.getAttribute('data-ax-editor-safe') === 'true') {
      setCMSInitialized(el);
      return;
    }
    const recipeName = `section-${secName}`;
    const recipe = CMS_RECIPES[recipeName];
    if (recipe && typeof recipe.apply === 'function') {
      recipe.apply(el, animx);
      setCMSInitialized(el);
    }
  });

  // 3. Items / Stagger Shortcut
  const itemsContainers = querySafe(root, '[data-ax-items]');
  itemsContainers.forEach(el => {
    if (isCMSInitialized(el)) return;
    if (isEditor && el.getAttribute('data-ax-editor-safe') === 'true') {
      setCMSInitialized(el);
      return;
    }
    const animation = el.getAttribute('data-ax-items');
    const childSel = el.getAttribute('data-ax-child-selector') || '> *';
    const trigger = el.getAttribute('data-ax-trigger') || el.getAttribute('data-ax-on') || 'load';
    const delayStep = parseInt(el.getAttribute('data-ax-delay-step') || el.getAttribute('data-ax-stagger') || 100, 10);
    
    const children = querySafe(el, childSel);
    if (children.length > 0) {
      animx.stagger(children, animation, { stagger: { each: delayStep }, on: trigger });
    }
    setCMSInitialized(el);
  });

  // 4. HTML Sequence
  const sequences = querySafe(root, '[data-ax-sequence]');
  sequences.forEach(el => {
    if (isCMSInitialized(el)) return;
    if (isEditor && el.getAttribute('data-ax-editor-safe') === 'true') {
      setCMSInitialized(el);
      return;
    }
    
    const trigger = el.getAttribute('data-ax-trigger') || el.getAttribute('data-ax-on') || 'load';
    const tl = animx.timeline({ on: trigger, scrollTarget: el });
    
    const steps = querySafe(el, '[data-ax-step]');
    steps.forEach(stepEl => {
      const animation = stepEl.getAttribute('data-ax-step');
      const pos = stepEl.getAttribute('data-ax-step-position') || undefined;
      tl.add(stepEl, { animation }, pos);
    });
    
    if (trigger === 'load') tl.play();
    setCMSInitialized(el);
  });
}
