import { getPreset } from '../presets/preset-registry.js';

export function getExamples(presetName) {
  const preset = presetName ? getPreset(presetName) : null;
  const name = preset ? preset.name : (presetName || 'fade-up');
  const className = preset ? preset.className : `ax-${name}`;

  return {
    preset: name,
    html: `<div class="ax ${className}">...</div>`,
    data: `<div data-ax="${name}">...</div>`,
    js: `AnimX.animate('.box', '${name}');`
  };
}

export function copyExample(presetName, type = 'js') {
  const examples = getExamples(presetName);
  const text = examples[type] || examples.js;

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => text).catch(() => text);
  }
  return Promise.resolve(text);
}
