import { debounce } from './cms-utils.js';

let observer = null;

export function startCMSObserver(root, callback, debounceMs = 120) {
  if (typeof MutationObserver === 'undefined') return;
  if (observer) observer.disconnect();

  const handleMutations = debounce((mutations) => {
    let hasAddedNodes = false;
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) { // ELEMENT_NODE
            const tag = node.tagName.toLowerCase();
            if (tag !== 'script' && tag !== 'style' && tag !== 'link' && tag !== 'meta') {
              hasAddedNodes = true;
              break;
            }
          }
        }
      }
      if (hasAddedNodes) break;
    }

    if (hasAddedNodes) {
      callback();
    }
  }, debounceMs);

  observer = new MutationObserver(handleMutations);
  observer.observe(root, { childList: true, subtree: true });
}

export function stopCMSObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
