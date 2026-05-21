// Using WeakMap to safely track which elements have been processed without memory leaks
const stateMap = new WeakMap();

export function setElementState(element, stateName) {
  if (!element || element.nodeType !== 1) return;
  
  // Remove existing state classes
  element.classList.remove('ax-ready', 'ax-running', 'ax-complete', 'ax-cancelled');
  
  if (stateName) {
    element.classList.add(`ax-${stateName}`);
    stateMap.set(element, stateName);
  } else {
    stateMap.delete(element);
  }
}

export function getElementState(element) {
  return stateMap.get(element) || null;
}

export function isElementInitialized(element) {
  return stateMap.has(element);
}
