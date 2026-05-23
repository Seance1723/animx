/**
 * AnimX Responsive Motion Engine (v3.26.0)
 * Evaluates breakpoints to apply different animation payloads per device.
 */

export function responsiveMotion(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  const isTablet = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

  let activeEffect = config.desktop;
  if (isMobile && config.mobile) activeEffect = config.mobile;
  else if (isTablet && config.tablet) activeEffect = config.tablet;

  if (activeEffect && typeof window !== 'undefined' && window.AnimX && window.AnimX.compose) {
    elements.forEach(el => {
      window.AnimX.compose(el, activeEffect);
    });
  }
}

export function viewportMotion(target, config) {
  return responsiveMotion(target, config);
}
