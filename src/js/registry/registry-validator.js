import { buildAnimationRegistry } from './animation-registry.js';
import { ANIMX_REGISTRY_VERSION, STATUS_VALUES, FAMILY_VALUES, ELEMENT_VALUES } from './animation-taxonomy.js';
import { hasUsageMode } from './registry-utils.js';

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateRegistry(effects = buildAnimationRegistry()) {
  const errors = [];
  const warnings = [];
  const ids = new Set();
  const names = new Set();

  effects.forEach(effect => {
    if (!effect.id) errors.push('Effect missing id');
    if (effect.id && !ID_RE.test(effect.id)) errors.push(`Invalid id format: ${effect.id}`);
    if (ids.has(effect.id)) errors.push(`Duplicate id: ${effect.id}`);
    ids.add(effect.id);

    const canonicalName = String(effect.name || '').trim().toLowerCase();
    if (!canonicalName) errors.push(`Missing name: ${effect.id}`);
    if (canonicalName && names.has(canonicalName)) warnings.push(`Duplicate canonical name: ${effect.name}`);
    names.add(canonicalName);

    if (!effect.family) errors.push(`Missing family: ${effect.id}`);
    if (effect.family && !FAMILY_VALUES.includes(effect.family)) errors.push(`Invalid family: ${effect.id}:${effect.family}`);
    if (!effect.category) errors.push(`Missing category: ${effect.id}`);
    if (!effect.element) errors.push(`Missing element: ${effect.id}`);
    if (effect.element && !ELEMENT_VALUES.includes(effect.element)) errors.push(`Invalid element: ${effect.id}:${effect.element}`);
    if (!effect.status) errors.push(`Missing status: ${effect.id}`);
    if (effect.status && !STATUS_VALUES.includes(effect.status)) errors.push(`Invalid status: ${effect.id}:${effect.status}`);

    if (effect.status === 'ready') {
      if (!effect.implementation || !effect.implementation.verified) errors.push(`Ready effect without implementation: ${effect.id}`);
      if (!hasUsageMode(effect)) errors.push(`Ready effect without usage mode: ${effect.id}`);
      if (!effect.reducedMotion || !effect.reducedMotion.behavior) errors.push(`Ready effect missing reduced-motion behavior: ${effect.id}`);
      const finalState = effect.reducedMotion && effect.reducedMotion.behavior === 'final-state';
      if (!finalState && (!effect.fallback || !effect.fallback.effect)) errors.push(`Ready effect without fallback or final-state behavior: ${effect.id}`);
      if (effect.usageModes.class && !effect.cssClass) errors.push(`Class usage without class mapping: ${effect.id}`);
      if (effect.usageModes.data && !effect.dataAttribute) errors.push(`Data usage without data mapping: ${effect.id}`);
      if (effect.usageModes.js && !effect.jsApi) errors.push(`JS usage without API mapping: ${effect.id}`);
      if (effect.usageModes.cms && !effect.dataAttribute) errors.push(`CMS usage without data path: ${effect.id}`);
    }

    if (effect.playground && effect.playground.ready) {
      if (!effect.playground.previewType) errors.push(`Playground-ready effect without preview type: ${effect.id}`);
      if (!hasUsageMode(effect)) errors.push(`Playground-ready effect without usage mode: ${effect.id}`);
      if (!effect.reducedMotion || !effect.reducedMotion.safe) errors.push(`Playground-ready effect without safe reduced motion: ${effect.id}`);
    }
  });

  effects.forEach(effect => {
    if (effect.fallback && effect.fallback.effect && !ids.has(effect.fallback.effect)) {
      errors.push(`Fallback points to missing effect: ${effect.id} -> ${effect.fallback.effect}`);
    }
  });

  const summary = {
    totalEffects: effects.length,
    ready: effects.filter(effect => effect.status === 'ready').length,
    experimental: effects.filter(effect => effect.status === 'experimental').length,
    needsReview: effects.filter(effect => effect.status === 'needs-review').length,
    deprecated: effects.filter(effect => effect.status === 'deprecated').length
  };

  return {
    ok: errors.length === 0,
    version: ANIMX_REGISTRY_VERSION,
    errors,
    warnings,
    summary
  };
}
