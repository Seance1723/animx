export function isEditorEnvironment() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  const bodyClass = document.body.className || '';
  const url = (window.location && window.location.href) || '';

  const editorSignals = [
    'wp-admin', // WordPress admin
    'elementor-editor-active', // Elementor
    'block-editor-page', // Gutenberg
    'customize-partial-edit-shortcuts-shown', // WP Customizer
    'is-builder' // Generic builder class
  ];

  const urlSignals = [
    'elementor-preview',
    'customize.php',
    'oxygen-iframe',
    'et_fb=' // Divi
  ];

  const hasBodySignal = editorSignals.some(sig => bodyClass.includes(sig));
  const hasUrlSignal = urlSignals.some(sig => url.includes(sig));
  
  // Basic iframe check if accessible
  let isIframe = false;
  try {
    isIframe = window.self !== window.top;
  } catch (e) {
    isIframe = true; // Cross-origin iframe usually means embedding/preview
  }

  return hasBodySignal || hasUrlSignal || isIframe;
}
