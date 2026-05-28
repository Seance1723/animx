import { buildAnimationRegistry } from './animation-registry.js';
import { cloneRegistryValue, normalizeEffectId } from './registry-utils.js';

export function getEffectsByElement(element) {
  const normalized = normalizeEffectId(element);
  if (!normalized) return [];
  return cloneRegistryValue(buildAnimationRegistry().filter(effect => effect.element === normalized));
}

export function getEffectsByFamily(family) {
  const normalized = normalizeEffectId(family);
  if (!normalized) return [];
  return cloneRegistryValue(buildAnimationRegistry().filter(effect => effect.family === normalized || effect.category === normalized));
}

export function getEffectsByStatus(status) {
  const normalized = normalizeEffectId(status);
  if (!normalized) return [];
  return cloneRegistryValue(buildAnimationRegistry().filter(effect => effect.status === normalized));
}

export function searchEffects(query) {
  if (typeof query !== 'string' || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return cloneRegistryValue(buildAnimationRegistry().filter(effect => {
    const tags = effect.tags || [];
    return effect.id.includes(q) ||
      effect.name.toLowerCase().includes(q) ||
      effect.family.includes(q) ||
      effect.category.toLowerCase().includes(q) ||
      effect.element.includes(q) ||
      effect.description.toLowerCase().includes(q) ||
      tags.some(tag => String(tag).toLowerCase().includes(q));
  }));
}
