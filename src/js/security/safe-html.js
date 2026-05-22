import { getSecurityConfig } from './security-state.js';

export function safeHTML(htmlString) {
  const config = getSecurityConfig();
  const result = {
    ok: true,
    fragment: null,
    html: '',
    removed: [],
    warnings: []
  };

  if (!htmlString || typeof htmlString !== 'string') {
    result.ok = false;
    result.warnings.push('Input is not a string');
    return result;
  }

  if (typeof DOMParser === 'undefined') {
    result.ok = false;
    result.warnings.push('DOMParser not available');
    return result;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  if (config.blockScriptHTML) {
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => {
      script.remove();
      result.removed.push('<script>');
    });
  }

  const elements = doc.querySelectorAll('*');
  elements.forEach(el => {
    // Block inline event handlers
    if (config.blockInlineEventHandlers) {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.toLowerCase().startsWith('on')) {
          el.removeAttribute(attr.name);
          result.removed.push(attr.name);
        }
      });
    }

    // Block javascript: URLs
    if (config.blockJavascriptURLs) {
      ['href', 'src'].forEach(attrName => {
        if (el.hasAttribute(attrName)) {
          const val = el.getAttribute(attrName).trim().toLowerCase();
          if (val.startsWith('javascript:')) {
            el.removeAttribute(attrName);
            result.removed.push(`javascript:${attrName}`);
          }
        }
      });
    }
  });

  result.html = doc.body.innerHTML;
  
  const fragment = document.createDocumentFragment();
  Array.from(doc.body.childNodes).forEach(node => fragment.appendChild(node));
  result.fragment = fragment;

  return result;
}
