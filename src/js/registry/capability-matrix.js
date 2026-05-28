import { buildAnimationRegistry } from './animation-registry.js';
import { ANIMX_REGISTRY_VERSION, MATRIX_ELEMENTS } from './animation-taxonomy.js';
import { cloneRegistryValue } from './registry-utils.js';

export function buildCapabilityMatrix(effects = buildAnimationRegistry(), generatedAt = '') {
  const matrix = {
    version: ANIMX_REGISTRY_VERSION,
    generatedAt,
    elements: {},
    summary: {
      totalEffects: effects.length,
      readyEffects: 0,
      experimentalEffects: 0,
      needsReviewEffects: 0,
      deprecatedEffects: 0
    }
  };

  MATRIX_ELEMENTS.forEach(([id, label]) => {
    matrix.elements[id] = {
      label,
      families: [],
      effects: [],
      readyCount: 0,
      experimentalCount: 0,
      needsReviewCount: 0,
      usageModes: {
        class: 0,
        data: 0,
        js: 0,
        cms: 0
      }
    };
  });

  effects.forEach(effect => {
    const bucket = matrix.elements[effect.element] || matrix.elements.utility;
    if (!bucket) return;
    if (!bucket.families.includes(effect.category)) bucket.families.push(effect.category);
    bucket.effects.push({
      id: effect.id,
      name: effect.name,
      family: effect.family,
      category: effect.category,
      status: effect.status,
      usageModes: effect.usageModes,
      playgroundReady: !!(effect.playground && effect.playground.ready)
    });
    if (effect.status === 'ready') bucket.readyCount += 1;
    if (effect.status === 'experimental') bucket.experimentalCount += 1;
    if (effect.status === 'needs-review') bucket.needsReviewCount += 1;
    Object.keys(bucket.usageModes).forEach(mode => {
      if (effect.usageModes && effect.usageModes[mode]) bucket.usageModes[mode] += 1;
    });
  });

  effects.forEach(effect => {
    if (effect.status === 'ready') matrix.summary.readyEffects += 1;
    if (effect.status === 'experimental') matrix.summary.experimentalEffects += 1;
    if (effect.status === 'needs-review') matrix.summary.needsReviewEffects += 1;
    if (effect.status === 'deprecated') matrix.summary.deprecatedEffects += 1;
  });

  Object.values(matrix.elements).forEach(element => {
    element.families.sort();
    element.effects.sort((a, b) => a.id.localeCompare(b.id));
  });

  return matrix;
}

export function getCapabilityMatrix() {
  return cloneRegistryValue(buildCapabilityMatrix());
}
