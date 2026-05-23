/**
 * AnimX 3D API Export Bundle (v3.18.0)
 */

export function threeD(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  elements.forEach(el => {
    el.classList.add('ax-preserve-3d');
    if (config.effect) {
      el.classList.add(`ax-${config.effect}`);
    }
  });
}

export function perspective(target, config) {
  threeD(target, config);
}

export function validate3D(config) {
  if (!config || !config.effect) return { ok: false, errors: ['Missing effect'] };
  return { ok: true, errors: [] };
}
