export function safeQuerySelector(selector, root = document) {
  if (typeof selector !== 'string') return null;
  if (!root || typeof root.querySelector !== 'function') return null;
  
  // Basic sanity check to prevent regex DoS or wildly malformed selectors
  if (selector.includes('<') || selector.includes('>script')) {
    console.warn('[AnimX Hardening] Blocked dangerous selector:', selector);
    return null;
  }

  try {
    return root.querySelector(selector);
  } catch (err) {
    console.warn('[AnimX Hardening] Invalid selector safely caught:', selector);
    return null;
  }
}

export function safeQuerySelectorAll(selector, root = document) {
  if (typeof selector !== 'string') return [];
  if (!root || typeof root.querySelectorAll !== 'function') return [];
  
  if (selector.includes('<') || selector.includes('>script')) {
    console.warn('[AnimX Hardening] Blocked dangerous selector:', selector);
    return [];
  }

  try {
    return Array.from(root.querySelectorAll(selector));
  } catch (err) {
    console.warn('[AnimX Hardening] Invalid selector safely caught:', selector);
    return [];
  }
}
