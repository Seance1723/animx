/**
 * AnimX Mobile Menu Motion Engine (v3.22.0)
 */

export function initMobileMenu(target, config) {
  const triggers = document.querySelectorAll(config.trigger);
  const panels = document.querySelectorAll(config.panel);

  if (triggers.length === 0 || panels.length === 0) return;

  triggers.forEach((trigger, index) => {
    const panel = panels[index] || panels[0];
    
    trigger.setAttribute('aria-expanded', 'false');
    
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.remove('ax-menu-open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.classList.add('ax-menu-open');
      }
    });
  });
}
