/**
 * AnimX Before/After Slider Engine (v3.21.0)
 */

export function initBeforeAfter(target, config) {
  const containers = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!containers || containers.length === 0) return;

  containers.forEach(container => {
    // Requires two images natively stacked in the DOM
    if (container.children.length < 2) return;
    
    const foreground = container.children[1];
    foreground.style.clipPath = `inset(0 ${100 - (config.reveal * 100 || 50)}% 0 0)`;
    
    // Create accessible handle
    const handle = document.createElement('button');
    handle.setAttribute('aria-label', 'Drag to compare images');
    handle.style.position = 'absolute';
    handle.style.top = '50%';
    handle.style.left = `${config.reveal * 100 || 50}%`;
    handle.style.transform = 'translate(-50%, -50%)';
    handle.style.zIndex = '10';
    
    container.style.position = 'relative';
    container.appendChild(handle);
    
    // Simplified pointer logic
    let isDragging = false;
    handle.addEventListener('pointerdown', () => isDragging = true);
    window.addEventListener('pointerup', () => isDragging = false);
    
    container.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      let percent = (e.clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));
      
      handle.style.left = `${percent * 100}%`;
      foreground.style.clipPath = `inset(0 ${100 - (percent * 100)}% 0 0)`;
    });
  });
}
