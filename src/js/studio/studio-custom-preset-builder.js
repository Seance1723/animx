/**
 * AnimX Studio Custom Preset Builder (v3.11.0)
 */

export function buildCustomPreset(formData) {
  // formData is expected to have: name, base, description, duration, delay, ease, stagger, reducedMotion, etc.
  const preset = {
    name: formData.name || 'custom-preset',
    type: formData.type || 'element',
    category: formData.category || 'custom',
    base: formData.base || 'fade',
    description: formData.description || '',
    options: {},
    dataAttributes: {},
    reducedMotion: formData.reducedMotion || 'final-state'
  };

  if (formData.duration) preset.options.duration = parseInt(formData.duration, 10);
  if (formData.delay) preset.options.delay = parseInt(formData.delay, 10);
  if (formData.ease) preset.options.ease = formData.ease;
  if (formData.stagger) preset.options.stagger = parseInt(formData.stagger, 10);

  // Map to data attributes
  preset.dataAttributes['data-ax'] = preset.base;
  if (formData.duration) preset.dataAttributes['data-ax-duration'] = formData.duration;
  if (formData.delay) preset.dataAttributes['data-ax-delay'] = formData.delay;
  if (formData.ease) preset.dataAttributes['data-ax-ease'] = formData.ease;
  if (formData.stagger) preset.dataAttributes['data-ax-stagger'] = formData.stagger;
  
  if (preset.type === 'text' && formData.split) {
    preset.options.split = formData.split;
    preset.dataAttributes['data-ax-text'] = formData.split;
  }

  return preset;
}
