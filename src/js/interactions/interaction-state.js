// Maps element to an object containing active interaction instances by type.
// Example: interactionStateMap.get(element) === { hover: HoverInstance, ripple: RippleInstance }
export const interactionStateMap = new WeakMap();

export function saveInteractionState(element, type, instance) {
  let states = interactionStateMap.get(element);
  if (!states) {
    states = {};
    interactionStateMap.set(element, states);
  }
  states[type] = instance;
}

export function getInteractionState(element, type) {
  const states = interactionStateMap.get(element);
  return states ? states[type] : null;
}

export function removeInteractionState(element, type) {
  const states = interactionStateMap.get(element);
  if (states) {
    delete states[type];
    // If no interactions left, we could optionally delete the element from WeakMap,
    // but WeakMap handles cleanup on DOM removal anyway.
  }
}

export function getAllInteractions(element) {
  return interactionStateMap.get(element) || {};
}
