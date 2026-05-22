// gesture-state.js
// Tracks active gestures per element to avoid duplicate bindings and facilitate cleanup

const gestureRegistry = new WeakMap();

export function getGestureInstances(element) {
  if (!gestureRegistry.has(element)) {
    gestureRegistry.set(element, new Set());
  }
  return gestureRegistry.get(element);
}

export function addGestureInstance(element, instance) {
  getGestureInstances(element).add(instance);
}

export function removeGestureInstance(element, instance) {
  const instances = gestureRegistry.get(element);
  if (instances) {
    instances.delete(instance);
    if (instances.size === 0) {
      gestureRegistry.delete(element);
    }
  }
}

export function destroyGestures(element) {
  const instances = gestureRegistry.get(element);
  if (instances) {
    instances.forEach(instance => {
      if (typeof instance.destroy === 'function') {
        instance.destroy();
      }
    });
    gestureRegistry.delete(element);
  }
}

export function refreshGestures(element) {
  const instances = gestureRegistry.get(element);
  if (instances) {
    instances.forEach(instance => {
      if (typeof instance.refresh === 'function') {
        instance.refresh();
      }
    });
  }
}
