import { FAMILY_VALUES, ELEMENT_VALUES } from './animation-taxonomy.js';

export function cloneRegistryValue(value) {
  if (value == null) return value;
  return JSON.parse(JSON.stringify(value));
}

export function normalizeEffectId(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function titleFromId(id) {
  return String(id || '')
    .split('-')
    .filter(Boolean)
    .map(part => part === 'svg' ? 'SVG' : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function normalizeFamily(preset) {
  const source = String(preset.family || preset.category || '').toLowerCase();
  const element = String(preset.element || '').toLowerCase();
  if (source.includes('text') || element === 'text') return 'text';
  if (source.includes('button') || source.includes('link') || source.includes('nav') || source.includes('hover') || source.includes('press')) return 'interaction';
  if (source.includes('svg') || element === 'svg') return 'svg';
  if (source.includes('image') || source.includes('video') || source.includes('media')) return 'media';
  if (source.includes('background') || source === 'pan' || source === 'gradient' || element === 'bg') return 'background';
  if (source.includes('layout')) return 'layout';
  if (source.includes('gesture')) return 'gesture';
  if (source.includes('cms')) return 'cms';
  if (source.includes('kpi') || source.includes('chart') || source.includes('table') || source.includes('list')) return 'data-ui';
  if (source.includes('modal') || source.includes('toast') || source.includes('tooltip') || source.includes('drawer')) return 'component';
  if (source.includes('loader') || source.includes('skeleton')) return 'utility';
  return FAMILY_VALUES.includes(source) ? source : 'utility';
}

export function normalizeElement(preset) {
  const source = String(preset.element || preset.family || preset.category || preset.name || '').toLowerCase();
  if (source.includes('text')) return 'text';
  if (source.includes('button')) return 'button';
  if (source.includes('link')) return 'link';
  if (source.includes('nav') || source === 'menu') return 'navigation';
  if (source.includes('card')) return 'card';
  if (source.includes('image')) return 'image';
  if (source.includes('gallery')) return 'gallery';
  if (source.includes('video')) return 'video';
  if (source.includes('svg')) return 'svg';
  if (source.includes('icon')) return 'icon';
  if (source.includes('logo')) return 'logo';
  if (source.includes('bg') || source.includes('background') || source.includes('gradient')) return 'background';
  if (source.includes('input') || source.includes('form')) return 'form-input';
  if (source.includes('modal') || source.includes('drawer')) return 'modal';
  if (source.includes('toast')) return 'toast';
  if (source.includes('tooltip')) return 'tooltip';
  if (source.includes('accordion')) return 'accordion';
  if (source.includes('table') || source.includes('list-row')) return 'table-row';
  if (source.includes('kpi') || source.includes('counter')) return 'kpi-card';
  if (source.includes('chart')) return 'chart';
  if (source.includes('section')) return 'section';
  if (source.includes('page') || source.includes('route')) return 'page';
  if (source.includes('cms')) return 'cms-block';
  if (source.includes('layout')) return 'layout';
  if (source.includes('physics') || source.includes('spring') || source.includes('inertia') || source.includes('bounce') || source.includes('snap') || source.includes('elastic')) return 'utility';
  if (source.includes('gesture') || source.includes('drag') || source.includes('swipe')) return 'gesture';
  return ELEMENT_VALUES.includes(source) ? source : 'utility';
}

export function hasUsageMode(effect) {
  const modes = effect && effect.usageModes;
  return !!(modes && (modes.class || modes.data || modes.js || modes.cms));
}
