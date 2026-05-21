import { getConfig } from '../core/config.js';

export function normalizeTextOptions(options = {}) {
  const config = getConfig().text || {};
  
  const type = options.type || 'split'; // split, typewriter, scramble, counter
  
  return {
    type,
    split: options.split || config.split || 'chars', // chars, words, lines, or array
    animation: options.animation || config.animation || 'text-rise',
    stagger: options.stagger !== undefined ? options.stagger : config.stagger || 35,
    duration: options.duration || config.duration || undefined,
    ease: options.ease || undefined,
    mask: options.mask || false, // true, false, 'lines'
    preserveAccessibility: options.preserveAccessibility !== undefined ? options.preserveAccessibility : config.preserveAccessibility !== false,
    
    // Typewriter
    text: options.text || null,
    speed: options.speed || config.typewriterSpeed || 45,
    cursor: options.cursor !== false,
    cursorChar: options.cursorChar || '|',
    
    // Scramble
    chars: options.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    revealDirection: options.revealDirection || 'start',
    
    // Counter
    from: options.from !== undefined ? Number(options.from) : 0,
    to: options.to !== undefined ? Number(options.to) : 100,
    decimals: options.decimals !== undefined ? Number(options.decimals) : 0,
    prefix: options.prefix || '',
    suffix: options.suffix || '',
    format: options.format || 'number', // 'number' means we can use localeString
    
    // Callbacks
    onStart: options.onStart || null,
    onComplete: options.onComplete || null
  };
}
