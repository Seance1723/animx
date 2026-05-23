/**
 * AnimX Motion State Manager (v3.16.0)
 * Stores logic mapping state names to specific variants or effects on DOM elements.
 */

// Registry for element -> states
const elementStates = new WeakMap();

export function registerState(target, config) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  if (!elements || elements.length === 0) return;

  elements.forEach(el => {
    let map = elementStates.get(el) || { current: null, states: {} };
    if (config.states) {
      map.states = { ...map.states, ...config.states };
    }
    
    elementStates.set(el, map);

    if (config.initial) {
      setState(el, config.initial);
    }
  });
}

export function setState(target, stateName) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : ((typeof NodeList !== 'undefined' && target instanceof NodeList) || Array.isArray(target) ? target : [target]);
  
  elements.forEach(el => {
    const map = elementStates.get(el);
    if (!map || !map.states[stateName]) {
      console.warn(`[AnimX State] State '${stateName}' not found on element.`);
      return;
    }

    map.current = stateName;
    const effectName = map.states[stateName].variant || map.states[stateName].effect || map.states[stateName];

    // Delegate to Composer
    if (typeof window !== 'undefined' && window.AnimX && window.AnimX.compose) {
      window.AnimX.compose(el, effectName);
    } else {
      console.warn('[AnimX State] Composer not loaded. Cannot trigger effect.');
    }
  });
}

export function getState(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return null;
  const map = elementStates.get(el);
  return map ? map.current : null;
}

export function toggleState(target, statesMap) {
  const current = getState(target);
  const keys = Object.keys(statesMap);
  if (keys.length < 2) return;
  const next = current === keys[0] ? keys[1] : keys[0];
  
  registerState(target, { states: statesMap });
  setState(target, next);
}
