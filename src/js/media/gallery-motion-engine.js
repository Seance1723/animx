/**
 * AnimX Gallery Motion Engine (v3.21.0)
 */

export function initGallery(target, config) {
  const containers = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!containers || containers.length === 0) return;

  if (!config.item) {
    console.warn('[AnimX Media] Valid item selector required for gallery staggering.');
    return;
  }

  containers.forEach(container => {
    const items = container.querySelectorAll(config.item);
    // In full implementation, this routes into AnimX's native stagger() function
    console.log(`[AnimX Media] Staggering ${items.length} gallery items.`);
  });
}
