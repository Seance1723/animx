/**
 * AnimX Studio Scene Export (v3.9.0)
 * Generates JS and HTML from scene data model.
 */

import { validateScene } from './studio-scene-validator.js';

export function exportSceneToJS(scene) {
  if (!validateScene(scene).ok) return '// Invalid scene configuration';

  let js = `// AnimX v3.9.0 Timeline Scene: ${scene.name}\n`;
  js += `const scene = AnimX.timeline({\n  defaults: {\n    ease: "${scene.settings?.ease || 'smooth'}"\n  }\n});\n\nscene`;

  scene.steps.forEach(step => {
    let opts = step.options ? JSON.stringify(step.options) : '{}';
    let posStr = step.position ? `, "${step.position}"` : '';

    if (step.type === 'text') {
      let mergedOpts = JSON.stringify({ type: 'text', animation: step.preset, ...step.options });
      js += `\n  .add("${step.target}", ${mergedOpts}${posStr})`;
    } else if (step.type === 'wait') {
      js += `\n  .add("wait", ${step.duration}${posStr})`;
    } else {
      js += `\n  .add("${step.target}", "${step.preset}", ${opts}${posStr})`;
    }
  });

  js += `\n  .play();\n`;
  return js;
}

export function exportSceneToHTML(scene) {
  if (!validateScene(scene).ok) return '<!-- Invalid scene configuration -->';

  let html = `<!-- AnimX v3.9.0 Timeline Scene: ${scene.name} -->\n`;
  html += `<section data-ax-sequence="true" data-ax-trigger="${scene.trigger || 'load'}">\n`;

  // Warning for complex timelines
  const hasComplexPositions = scene.steps.some(s => s.position && s.position.includes('<'));
  if (hasComplexPositions) {
    html += `  <!-- WARNING: This scene uses complex overlap positions ('<') which may not perfectly map to simple data attributes. Consider using the JS Export for exact fidelity. -->\n`;
  }

  scene.steps.forEach(step => {
    if (step.type === 'wait' || step.type === 'callback-note') return;
    
    let attrs = `data-ax-step="${step.preset}"`;
    if (step.position) attrs += ` data-ax-step-position="${step.position}"`;
    if (step.options?.duration) attrs += ` data-ax-duration="${step.options.duration}"`;
    if (step.options?.delay) attrs += ` data-ax-delay="${step.options.delay}"`;
    if (step.options?.ease) attrs += ` data-ax-ease="${step.options.ease}"`;
    if (step.options?.stagger) attrs += ` data-ax-stagger="${step.options.stagger}"`;

    if (step.type === 'text' && step.options?.split) {
      attrs += ` data-ax-text="${step.options.split}"`;
    }

    html += `  <div class="${step.target.replace('.', '')}" ${attrs}>Target Content</div>\n`;
  });

  html += `</section>\n`;
  return html;
}

export function exportSceneToRecipe(scene) {
  if (!validateScene(scene).ok) return '<!-- Invalid scene configuration -->';
  return `<section data-ax-recipe="${scene.sceneId}">\n  <!-- Load recipe JSON to apply steps -->\n</section>`;
}
