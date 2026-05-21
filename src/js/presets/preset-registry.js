import { log } from '../core/utils.js';

const registry = new Map();

export function registerPreset(name, config) {
  if (!name || typeof name !== 'string') return;
  registry.set(name, config);
  log(`Preset registered: ${name}`);
}

export function getPreset(name) {
  if (!registry.has(name)) {
    log(`Preset not found: ${name}`);
    return null;
  }
  return registry.get(name);
}

export function getPresets() {
  return Array.from(registry.entries()).map(([name, config]) => ({ name, ...config }));
}

export function getComponentPresets() {
  const components = {};
  for (const [name, config] of registry.entries()) {
    if (config.type === 'component') {
      const comp = config.component || 'other';
      if (!components[comp]) components[comp] = [];
      components[comp].push(name);
    }
  }
  return components;
}

export function getPresetCategories() {
  return ['core', 'component', 'text', 'interaction', 'loader', 'background', 'svg'];
}
