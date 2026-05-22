/**
 * AnimX v2.6.0 - jQuery Adapter
 * Optional wrapper to use AnimX natively inside jQuery.
 * Does NOT bundle jQuery. Fails safely if jQuery or AnimX is missing.
 */
(function($) {
  if (typeof $ === 'undefined' || typeof window === 'undefined' || !window.AnimX) {
    if (window.AnimX && window.AnimX.debug && window.AnimX.debug()) {
      console.warn('[AnimX] jQuery adapter skipped: jQuery or AnimX not found.');
    }
    return;
  }

  $.fn.animx = function(method, ...args) {
    // Basic init or animate shortcut: $(".box").animx("fade-up")
    if (typeof method === 'string' && !['animate', 'component', 'scroll', 'text', 'stagger', 'svg', 'layout', 'drag', 'gesture', 'destroy', 'refresh'].includes(method)) {
      AnimX.animate(this.toArray(), method, args[0]);
      return this;
    }

    // Explicit command: $(".box").animx("scroll", { animation: "fade-up" })
    switch(method) {
      case 'animate':
        AnimX.animate(this.toArray(), args[0], args[1]);
        break;
      case 'component':
        AnimX.component(this.toArray(), args[0], args[1]);
        break;
      case 'scroll':
        AnimX.scroll(this.toArray(), args[0]);
        break;
      case 'text':
        AnimX.text(this.toArray(), args[0]);
        break;
      case 'stagger':
        AnimX.stagger(this.toArray(), args[0], args[1]);
        break;
      case 'svg':
        AnimX.svg(this.toArray(), args[0]);
        break;
      case 'layout':
        AnimX.layout(this.toArray(), args[0]);
        break;
      case 'drag':
        AnimX.drag(this.toArray(), args[0]);
        break;
      case 'gesture':
        AnimX.gesture(this.toArray(), args[0]);
        break;
      case 'destroy':
        // Safe destroy if possible via core
        if (AnimX.destroyAll) AnimX.destroyAll(this.toArray());
        break;
      case 'refresh':
        AnimX.refresh(this.toArray());
        break;
    }
    return this;
  };

})(typeof window !== 'undefined' ? window.jQuery : undefined);
