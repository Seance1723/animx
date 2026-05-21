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
