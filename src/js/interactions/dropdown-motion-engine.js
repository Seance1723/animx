/**
 * AnimX Dropdown Motion Engine (v3.22.0)
 */

export function initDropdown(target, config) {
  const triggers = document.querySelectorAll(config.trigger);
  const panels = document.querySelectorAll(config.panel);
  
  if (triggers.length === 0 || panels.length === 0) return;

  triggers.forEach((trigger, index) => {
    const panel = panels[index] || panels[0];
    
    // Accessibility bounds
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-haspopup', 'true');
    panel.style.display = 'none';
    panel.style.opacity = '0';
    panel.style.transition = 'opacity 0.3s ease';

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.opacity = '0';
        setTimeout(() => panel.style.display = 'none', 300);
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.display = 'block';
        requestAnimationFrame(() => panel.style.opacity = '1');
      }
    });
  });
}

export function initMenu(target, config) {
  initDropdown(target, config);
}
