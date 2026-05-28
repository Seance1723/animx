import { getPresets } from '../presets/preset-registry.js';
import { ANIMX_REGISTRY_VERSION, READY_CSS_EFFECT_IDS, READY_JS_EFFECTS } from './animation-taxonomy.js';
import { createEffectRecord } from './animation-schema.js';
import { cloneRegistryValue, normalizeEffectId, normalizeElement, normalizeFamily, titleFromId } from './registry-utils.js';

const registryCache = { presetCount: -1, effects: null };

function statusForPreset(id, preset) {
  if (preset && ['ready', 'experimental', 'needs-review', 'deprecated'].includes(preset.status)) return preset.status;
  if (READY_CSS_EFFECT_IDS.has(id)) return 'ready';
  if (preset && preset.experimental) return 'experimental';
  if (preset && preset.deprecated) return 'deprecated';
  return 'needs-review';
}

function cssPresetToEffect(preset) {
  const id = normalizeEffectId(preset.name);
  const cssClass = preset.className || `ax-${id}`;
  const status = statusForPreset(id, preset);
  const family = normalizeFamily(preset);
  const element = normalizeElement(preset);
  const ready = status === 'ready';
  const implemented = ready || status === 'experimental';
  const split = preset.split || (id.startsWith('line-') || id.startsWith('paragraph-') ? 'lines' : id.startsWith('word-') ? 'words' : id.startsWith('char-') ? 'chars' : undefined);
  const dataAttribute = family === 'text'
    ? `data-ax-text-effect="${id}"${split ? ` data-ax-split="${split}"` : ''}`
    : `data-ax="${id}"`;

  return createEffectRecord({
    id,
    name: titleFromId(id),
    family,
    category: preset.category || preset.family || family,
    element,
    description: preset.description || `${titleFromId(id)} animation.`,
    status,
    usageModes: {
      class: implemented,
      data: implemented,
      js: implemented,
      cms: implemented
    },
    cssClass: implemented ? cssClass : '',
    dataAttribute: implemented ? dataAttribute : '',
    jsApi: implemented ? 'AnimX.animate' : '',
    options: {
      duration: true,
      delay: true,
      easing: true,
      stagger: family === 'text' || element === 'card' || element === 'table-row',
      split: split || false,
      direction: /-(up|down|left|right)$/.test(id),
      intensity: /-(soft|hard|strong)$/.test(id)
    },
    reducedMotion: {
      behavior: 'final-state',
      safe: true
    },
    fallback: {
      effect: id === 'fade-in' ? '' : 'fade-in',
      reason: 'Fallback keeps content visible when the requested motion is unavailable'
    },
    playground: {
      ready,
      previewType: ready ? element : '',
      defaultText: 'Animate anything with AnimX',
      defaultOptions: {},
      supportedControls: ready ? (family === 'text' ? ['split', 'duration', 'delay', 'stagger', 'easing'] : ['duration', 'delay', 'easing']) : [],
      exportTypes: ready ? ['html', 'class', 'data', 'js', 'react', 'cms'] : []
    },
    docs: {
      hasExample: ready,
      docsPath: ready ? `docs/preset-reference.md#${id}` : ''
    },
    tests: {
      covered: ['fade-up', 'text-rise', 'svg-draw', 'nav-link-underline-slide', 'modal-pop', 'kpi-number-roll'].includes(id),
      testIds: []
    },
    implementation: {
      kind: implemented ? 'css-preset' : 'metadata',
      verified: implemented,
      source: implemented ? cssClass : ''
    }
  });
}

function jsEffectToRecord(id, meta) {
  return createEffectRecord({
    id,
    name: titleFromId(id),
    family: meta.family,
    category: meta.category,
    element: meta.element,
    description: `${titleFromId(id)} JavaScript effect.`,
    status: 'ready',
    usageModes: {
      class: false,
      data: id === 'split',
      js: true,
      cms: id === 'split'
    },
    cssClass: '',
    dataAttribute: id === 'split' ? 'data-ax-text-effect="split"' : '',
    jsApi: meta.jsApi,
    reducedMotion: {
      behavior: 'final-state',
      safe: true
    },
    fallback: {
      effect: meta.family === 'text' ? 'text-rise' : '',
      reason: 'Use final readable state when JavaScript animation is unavailable'
    },
    playground: {
      ready: true,
      previewType: meta.previewType,
      defaultText: 'Animate anything with AnimX',
      defaultOptions: {},
      supportedControls: ['duration', 'delay', 'easing'],
      exportTypes: ['html', 'data', 'js', 'react', 'cms']
    },
    docs: {
      hasExample: true,
      docsPath: `docs/api-reference.md#${id}`
    },
    tests: {
      covered: true,
      testIds: []
    },
    implementation: {
      kind: 'js-api',
      verified: true,
      source: meta.jsApi
    }
  });
}

export function buildAnimationRegistry() {
  const presets = getPresets();
  if (registryCache.effects && registryCache.presetCount === presets.length) {
    return registryCache.effects;
  }

  const byId = new Map();
  presets.forEach(preset => {
    const id = normalizeEffectId(preset.name);
    if (!id) return;
    byId.set(id, cssPresetToEffect(preset));
  });

  Object.keys(READY_JS_EFFECTS).forEach(id => {
    if (!byId.has(id)) byId.set(id, jsEffectToRecord(id, READY_JS_EFFECTS[id]));
  });

  registryCache.presetCount = presets.length;
  registryCache.effects = Array.from(byId.values()).sort((a, b) => a.id.localeCompare(b.id));
  return registryCache.effects;
}

export function getRegistry() {
  const effects = buildAnimationRegistry();
  return cloneRegistryValue({
    version: ANIMX_REGISTRY_VERSION,
    effects
  });
}

export function getEffects() {
  return cloneRegistryValue(buildAnimationRegistry());
}

export function getEffectById(id) {
  const normalized = normalizeEffectId(id);
  return cloneRegistryValue(buildAnimationRegistry().find(effect => effect.id === normalized) || null);
}
