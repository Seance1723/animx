/**
 * AnimX CMS Mutation Observer (v3.28.0)
 */

import { refreshCMS } from './cms-refresh-manager.js';

let observer = null;
let timer = null;

export function observeCMS(root = document.body, config = {}) {
  const rootEl = typeof root === 'string' ? document.querySelector(root) : root;
  if (!rootEl) return;

  disconnectCMS(); // Ensure clean slate

  const maxNodes = config.maxNodesPerRefresh || 500;
  const debounceTime = config.debounce || 80;

  observer = new MutationObserver((mutations) => {
    let addedNodesCount = 0;
    let shouldRefresh = false;

    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldRefresh = true;
        addedNodesCount += mutation.addedNodes.length;
      }
    });

    if (shouldRefresh) {
      if (addedNodesCount > maxNodes) {
        console.warn(`[AnimX CMS] Mutation node count (${addedNodesCount}) exceeded max threshold (${maxNodes}). Throttling refresh to prevent jank.`);
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        refreshCMS(rootEl);
      }, debounceTime);
    }
  });

  observer.observe(rootEl, { childList: true, subtree: true });
  console.log(`[AnimX CMS] Observer attached to root`, rootEl);
}

export function disconnectCMS() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  clearTimeout(timer);
}
