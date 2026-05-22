/**
 * AnimX v2.6.0 - Webflow Helper
 * Injects AnimX safely into the Webflow lifecycle.
 */
(function() {
  if (typeof window === 'undefined' || !window.AnimX) return;

  const webflowHelper = {
    init: function() {
      window.AnimX.init();
      window.AnimX.cms();
    },
    refresh: function() {
      window.AnimX.refreshCMS();
    },
    observe: function() {
      window.AnimX.observeCMS();
    },
    disconnect: function() {
      if (window.AnimX.disconnectCMS) {
        window.AnimX.disconnectCMS();
      }
    }
  };

  window.AnimX.webflow = webflowHelper;

  if (window.Webflow && Array.isArray(window.Webflow)) {
    window.Webflow.push(() => {
      webflowHelper.init();
    });
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => webflowHelper.init());
  } else {
    webflowHelper.init();
  }

})();
