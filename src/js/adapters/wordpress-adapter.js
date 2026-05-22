/**
 * AnimX v2.6.0 - WordPress Helper
 * Provides a safe initialization loop for Gutenberg, Elementor, and standard themes.
 */
(function() {
  if (typeof window === 'undefined' || !window.AnimX) return;

  const wpHelper = {
    isEditor: function() {
      const body = document.body;
      if (!body) return false;
      return body.classList.contains('wp-admin') || 
             body.classList.contains('block-editor-page') || 
             body.classList.contains('elementor-editor-active') ||
             window.location.href.includes('customize.php') ||
             window.location.href.includes('elementor-preview');
    },

    init: function() {
      // If we are in the editor, we bypass scroll triggers to avoid breaking layout
      if (this.isEditor()) {
        if (window.AnimX.debug && window.AnimX.debug()) {
          console.log('[AnimX] WordPress editor detected. Bypassing aggressive animations.');
        }
        return;
      }
      // Standard CMS init
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.AnimX.cms());
      } else {
        window.AnimX.cms();
      }
    },

    refresh: function() {
      if (this.isEditor()) return;
      window.AnimX.refreshCMS();
    },

    observe: function() {
      if (this.isEditor()) return;
      window.AnimX.observeCMS();
    },

    disconnect: function() {
      // Assuming a disconnect function is exported by core CMS
      if (window.AnimX.disconnectCMS) {
        window.AnimX.disconnectCMS();
      }
    }
  };

  window.AnimX.wp = wpHelper;

  // Auto-init on script load
  wpHelper.init();

})();
