export function setupMockBrowser() {
  global.window = {
    matchMedia: () => ({ matches: false }),
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
    location: { href: 'http://localhost' },
    PointerEvent: class PointerEvent {}
  };
  
  global.document = {
    readyState: 'complete',
    querySelectorAll: (s) => {
      if (s && s.includes('[') && !s.includes(']')) throw new Error('SyntaxError');
      return [];
    },
    querySelector: (s) => {
      if (s && s.includes('[') && !s.includes(']')) throw new Error('SyntaxError');
      return null;
    },
    dispatchEvent: () => {},
    createElement: (tag) => {
      const el = { 
        tagName: tag.toUpperCase(),
        classList: { add: () => {}, remove: () => {}, contains: () => false }, 
        getBoundingClientRect: () => ({left: 0, top: 0, width: 0, height: 0}), 
        dataset: {},
        setAttribute: function(name, value) {
          if (name.startsWith('data-')) {
            const camelCaseName = name.slice(5).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            this.dataset[camelCaseName] = value;
          }
        }, 
        getAttribute: () => null,
        appendChild: () => {}, 
        textContent: '',
        style: {}
      };
      return el;
    },
    createDocumentFragment: () => ({ appendChild: () => {} }),
    createTextNode: () => ({ nodeValue: '' }),
    body: { scrollHeight: 1000, offsetHeight: 1000, clientHeight: 1000, className: '', classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} } },
    documentElement: { scrollHeight: 1000, offsetHeight: 1000, clientHeight: 1000 }
  };
  
  global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
  global.cancelAnimationFrame = (id) => clearTimeout(id);
  
  global.MutationObserver = class MutationObserver {
    observe() {}
    disconnect() {}
  };
  
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  global.CustomEvent = class CustomEvent {
    constructor(type, params = { bubbles: false, cancelable: false, detail: null }) {
      this.type = type;
      this.detail = params.detail;
    }
  };
  
  global.DOMParser = class DOMParser {
    parseFromString(str, type) {
      return {
        querySelectorAll: (q) => {
          if (q === 'script') return str.includes('<script>') ? [{ remove: () => {} }] : [];
          if (q === '*') return [{
            attributes: str.includes('onclick') ? [{ name: 'onclick' }] : [],
            removeAttribute: () => {},
            hasAttribute: (a) => a === 'href' && str.includes('javascript:'),
            getAttribute: () => 'javascript:x'
          }];
          return [];
        },
        body: { innerHTML: '', childNodes: [] }
      };
    }
  };
}

// Call immediately when imported
setupMockBrowser();
