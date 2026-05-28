import { getConfig } from '../core/config.js';

const SPLIT_ALIASES = {
  chars: ['chars'],
  characters: ['chars'],
  words: ['words'],
  lines: ['lines'],
  'words-and-chars': ['words', 'chars'],
  'chars-and-words': ['words', 'chars'],
  'lines-and-words': ['lines', 'words']
};

export function normalizeSplitMode(split) {
  if (Array.isArray(split)) {
    const normalized = split.flatMap(item => normalizeSplitMode(item));
    return [...new Set(normalized.length ? normalized : ['chars'])];
  }
  const raw = String(split || 'chars').trim().toLowerCase();
  if (SPLIT_ALIASES[raw]) return SPLIT_ALIASES[raw];
  if (raw.includes(' ')) {
    return [...new Set(raw.split(/\s+/).flatMap(item => normalizeSplitMode(item)))];
  }
  return ['chars'];
}

function defaultSplitForEffect(effect, fallback) {
  if (/^line-|paragraph-/.test(effect)) return 'lines';
  if (/^word-/.test(effect)) return 'words';
  if (/^char-/.test(effect)) return 'chars';
  return fallback || 'chars';
}

export function normalizeTextOptions(options = {}) {
  const conf = getConfig().text || {};
  const effect = options.effect || options.animation || conf.animation || 'text-rise';
  const split = normalizeSplitMode(options.split || defaultSplitForEffect(effect, conf.split));
  
  return {
    type: options.type || conf.type || 'split',
    effect,
    split,
    animation: effect,
    stagger: options.stagger !== undefined ? options.stagger : conf.stagger,
    text: options.text || '',
    mask: options.mask !== undefined ? options.mask : (/mask|curtain|clip/.test(effect) ? true : false),
    speed: options.speed || conf.speed || conf.typewriterSpeed || 45,
    from: options.from !== undefined ? options.from : 0,
    to: options.to !== undefined ? options.to : 100,
    decimals: options.decimals || 0,
    prefix: options.prefix || '',
    suffix: options.suffix || '',
    chars: options.chars || undefined,
    duration: options.duration || conf.scrambleDuration || conf.counterDuration || 1000,
    responsive: options.responsive !== undefined ? options.responsive : (conf.responsive !== false),
    resplitDebounce: options.resplitDebounce || conf.resplitDebounce || 150,
    replayOnResplit: options.replayOnResplit || false,
    preset: options.preset || undefined,
    values: options.values || [],
    interval: options.interval || conf.swapInterval || 1600,
    format: options.format || undefined,
    locale: options.locale || undefined,
    currency: options.currency || undefined,
    separator: options.separator || undefined,
    compact: options.compact !== undefined ? options.compact : false,
    direction: options.direction || 'left',
    pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
    preserveAccessibility: options.preserveAccessibility !== undefined ? options.preserveAccessibility : conf.preserveAccessibility,
    
    // Callbacks
    onStart: options.onStart || null,
    onComplete: options.onComplete || null
  };
}

export function parseTextAttributes(element) {
  const result = { type: 'split' };
  
  if (element.hasAttribute('data-ax-text-type')) {
    result.type = element.getAttribute('data-ax-text-type');
  }
  if (element.hasAttribute('data-ax-text-value')) {
    result.text = element.getAttribute('data-ax-text-value');
  }
  if (element.hasAttribute('data-ax-text')) {
    result.split = element.getAttribute('data-ax-text').split(' ');
  }
  if (element.hasAttribute('data-ax-responsive')) {
    result.responsive = element.getAttribute('data-ax-responsive') !== 'false';
  }
  if (element.hasAttribute('data-ax-scramble-preset')) {
    result.preset = element.getAttribute('data-ax-scramble-preset');
  }
  if (element.hasAttribute('data-ax-values')) {
    result.values = element.getAttribute('data-ax-values').split('|');
  }
  if (element.hasAttribute('data-ax-interval')) {
    result.interval = parseInt(element.getAttribute('data-ax-interval'), 10);
  }
  if (element.hasAttribute('data-ax-animation')) {
    result.animation = element.getAttribute('data-ax-animation');
  }
  if (element.hasAttribute('data-ax-format')) {
    result.format = element.getAttribute('data-ax-format');
  }
  if (element.hasAttribute('data-ax-locale')) {
    result.locale = element.getAttribute('data-ax-locale');
  }
  if (element.hasAttribute('data-ax-currency')) {
    result.currency = element.getAttribute('data-ax-currency');
  }
  if (element.hasAttribute('data-ax-separator')) {
    result.separator = element.getAttribute('data-ax-separator');
  }
  if (element.hasAttribute('data-ax-compact')) {
    result.compact = element.getAttribute('data-ax-compact') !== 'false';
  }
  if (element.hasAttribute('data-ax-direction')) {
    result.direction = element.getAttribute('data-ax-direction');
  }
  if (element.hasAttribute('data-ax-pause-on-hover')) {
    result.pauseOnHover = element.getAttribute('data-ax-pause-on-hover') !== 'false';
  }
  
  if (element.hasAttribute('data-ax-mask')) {
    const maskVal = element.getAttribute('data-ax-mask');
    result.mask = maskVal === 'lines' ? 'lines' : maskVal !== 'false';
  }
  
  if (element.hasAttribute('data-ax-speed')) {
    const speed = parseInt(element.getAttribute('data-ax-speed'), 10);
    if (!isNaN(speed)) result.speed = speed;
  }

  // Fallback to old behavior for backward compat
  if (element.hasAttribute('data-ax-typewriter-speed')) {
    result.type = 'typewriter';
    result.speed = parseInt(element.getAttribute('data-ax-typewriter-speed'), 10) || 45;
  }
  
  if (element.hasAttribute('data-ax-from')) {
    result.from = parseFloat(element.getAttribute('data-ax-from'));
  }
  if (element.hasAttribute('data-ax-to')) {
    result.to = parseFloat(element.getAttribute('data-ax-to'));
  }
  if (element.hasAttribute('data-ax-prefix')) {
    result.prefix = element.getAttribute('data-ax-prefix');
  }
  if (element.hasAttribute('data-ax-suffix')) {
    result.suffix = element.getAttribute('data-ax-suffix');
  }

  return result;
}
