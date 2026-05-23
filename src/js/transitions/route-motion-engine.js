/**
 * AnimX Route Motion Engine (v3.27.0)
 */

export function initRouteMotion(config) {
  const links = document.querySelectorAll(config.links || 'a[data-ax-route]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Safety fail-safes
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // Modifier keys
      if (link.target === '_blank') return; // External tab
      if (link.href.startsWith('javascript:')) return; // Unsafe protocol
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return; // External domain

      e.preventDefault();
      
      console.log(`[AnimX Route] Intercepted navigation to ${url.pathname}`);
      
      // Fire transition out...
      const effect = config.transition || 'route-fade-swap';
      console.log(`[AnimX Route] Firing out effect: ${effect}`);
      
      setTimeout(() => {
        // Fallback standard navigation after transition completes
        window.location.href = url.href;
      }, 500);
    });
  });
}
