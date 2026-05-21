// instance-registry.js
const registry = new WeakMap();

export function registerInstance(element, instance) {
  if (!element || !instance) return;
  if (!registry.has(element)) {
    registry.set(element, new Set());
  }
  registry.get(element).add(instance);
}

export function getInstances(element) {
  return registry.get(element) || new Set();
}

export function destroyInstances(element) {
  const instances = registry.get(element);
  if (instances) {
    instances.forEach(inst => {
      if (inst && typeof inst.destroy === 'function') {
        inst.destroy();
      } else if (inst && typeof inst.stop === 'function') {
        inst.stop();
      }
    });
    registry.delete(element);
  }
}

export function clearInstances(element) {
  registry.delete(element);
}

export function hasInstances(element) {
  return registry.has(element) && registry.get(element).size > 0;
}
