/**
 * AnimX Particle-Lite Engine (v3.25.0)
 */

export function initParticleLite(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const count = Math.min(config.count || 24, 50); // Hard cap at 50

  elements.forEach(container => {
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    for(let i=0; i<count; i++) {
      const p = document.createElement('div');
      p.className = 'ax-particle';
      p.style.position = 'absolute';
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.width = '4px';
      p.style.height = '4px';
      p.style.background = 'currentColor';
      p.style.borderRadius = '50%';
      p.style.opacity = Math.random() * 0.5 + 0.1;
      container.appendChild(p);
    }
  });
}
