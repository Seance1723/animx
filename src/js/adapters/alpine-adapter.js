/**
 * AnimX v2.6.0 - Alpine.js Adapter
 * Registers x-animx directive.
 */
(function() {
  if (typeof window === 'undefined' || !window.AnimX) return;

  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('alpine:init', () => {
      if (!window.Alpine) return;

      window.Alpine.directive('animx', (el, { expression, evaluate }, { cleanup }) => {
        let options = evaluate(expression);
        
        let animationName = null;
        let animxOptions = {};

        if (typeof options === 'string') {
          animationName = options;
        } else if (typeof options === 'object' && options !== null) {
          animationName = options.animation || options.preset;
          animxOptions = { ...options };
          delete animxOptions.animation;
          delete animxOptions.preset;
        }

        if (animationName) {
          const instance = window.AnimX.animate(el, animationName, animxOptions);
          
          cleanup(() => {
            if (instance && instance.destroy) {
              instance.destroy();
            }
          });
        }
      });
    });
  }

})();
