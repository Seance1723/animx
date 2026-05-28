import { buildAnimationRegistry } from './animation-registry.js';
import { buildCapabilityMatrix } from './capability-matrix.js';
import { validateRegistry } from './registry-validator.js';
import { ANIMX_REGISTRY_VERSION } from './animation-taxonomy.js';

export function buildPlaygroundReadinessReport(effects = buildAnimationRegistry()) {
  const report = {
    version: ANIMX_REGISTRY_VERSION,
    readyForPlayground: [],
    notReadyForPlayground: [],
    missingPreviewType: [],
    missingUsageMode: [],
    missingFallback: [],
    warnings: []
  };

  effects.forEach(effect => {
    if (effect.playground && effect.playground.ready) report.readyForPlayground.push(effect.id);
    else report.notReadyForPlayground.push(effect.id);
    if (effect.playground && effect.playground.ready && !effect.playground.previewType) report.missingPreviewType.push(effect.id);
    if (effect.playground && effect.playground.ready && !Object.values(effect.usageModes || {}).some(Boolean)) report.missingUsageMode.push(effect.id);
    if (effect.playground && effect.playground.ready && (!effect.fallback || (!effect.fallback.effect && effect.reducedMotion?.behavior !== 'final-state'))) report.missingFallback.push(effect.id);
  });

  return report;
}

export function buildEffectCrossCheckReport(effects = buildAnimationRegistry()) {
  const validation = validateRegistry(effects);
  const missingImplementations = effects.filter(effect => effect.status === 'ready' && !effect.implementation?.verified).map(effect => effect.id);
  const missingCssClasses = effects.filter(effect => effect.status === 'ready' && effect.usageModes.class && !effect.cssClass).map(effect => effect.id);
  const missingDataMappings = effects.filter(effect => effect.status === 'ready' && effect.usageModes.data && !effect.dataAttribute).map(effect => effect.id);
  const missingJsMappings = effects.filter(effect => effect.status === 'ready' && effect.usageModes.js && !effect.jsApi).map(effect => effect.id);
  const readyVerified = effects.filter(effect => effect.status === 'ready' && effect.implementation?.verified).map(effect => effect.id);

  return {
    version: ANIMX_REGISTRY_VERSION,
    checkedEffects: effects.map(effect => effect.id),
    readyVerified,
    fixedEffects: [],
    downgradedToNeedsReview: effects.filter(effect => effect.status === 'needs-review').map(effect => effect.id),
    downgradedToExperimental: effects.filter(effect => effect.status === 'experimental').map(effect => effect.id),
    deprecatedEffects: effects.filter(effect => effect.status === 'deprecated').map(effect => effect.id),
    missingImplementations,
    missingCssClasses,
    missingDataMappings,
    missingJsMappings,
    brokenFallbacks: validation.errors.filter(error => error.includes('Fallback points to missing effect')),
    warnings: validation.warnings,
    status: validation.ok ? 'ready' : 'needs-review'
  };
}

export function buildPresetData(effects = buildAnimationRegistry(), generatedAt = '') {
  return {
    version: ANIMX_REGISTRY_VERSION,
    effects,
    elements: Array.from(new Set(effects.map(effect => effect.element))).sort(),
    families: Array.from(new Set(effects.map(effect => effect.family))).sort(),
    categories: Array.from(new Set(effects.map(effect => effect.category))).sort(),
    statuses: Array.from(new Set(effects.map(effect => effect.status))).sort(),
    usageModes: ['class', 'data', 'js', 'cms'],
    capabilityMatrix: buildCapabilityMatrix(effects, generatedAt),
    playgroundReady: effects.filter(effect => effect.playground?.ready).map(effect => effect.id),
    generatedAt
  };
}
