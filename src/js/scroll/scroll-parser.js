import { getConfig } from '../core/config.js';
import { parseDataAttributes } from '../data/data-parser.js';

export function parseScrollAttributes(element) {
  if (!element || !element.dataset) return null;
  
  const ds = element.dataset;
  const config = getConfig();
  
  // Base data attributes (animation, options, duration, etc)
  const baseParsed = parseDataAttributes(element) || { options: {} };
  
  // If animation was not set via base parser, it might be a child logic handled later or direct JS injection
  const animation = baseParsed.animation || null;
  
  // Scroll specific
  let threshold = config.scroll.threshold;
  if (ds.axThreshold !== undefined) {
    const p = parseFloat(ds.axThreshold);
    if (!isNaN(p)) threshold = Math.max(0, Math.min(1, p));
  }
  
  let rootMargin = ds.axRootMargin || config.scroll.rootMargin;
  if (ds.axOffset) {
    // Basic offset convenience mapping
    rootMargin = `0px 0px ${ds.axOffset} 0px`;
  }
  
  let once = config.scroll.once;
  if (ds.axOnce === 'false' || ds.axOnce === '0') once = false;
  
  let stagger = baseParsed.options.stagger || null;
  if (!stagger && ds.axStagger !== undefined) {
    const p = parseInt(ds.axStagger, 10);
    if (!isNaN(p)) {
      stagger = { each: p };
    }
  }
  if (stagger) baseParsed.options.stagger = stagger;
  
  const isGroup = baseParsed.isGroup || ds.axGroup !== undefined;
  const childAnim = baseParsed.childAnimation || ds.axChild || null;
  const isText = baseParsed.isText || ds.axText !== undefined || ds.axTextType !== undefined;
  const textOptions = baseParsed.textOptions || null;
  
  return {
    animation,
    id: ds.axId || null,
    scrollClass: ds.axScrollClass || null,
    enterClass: ds.axEnterClass || null,
    exitClass: ds.axExitClass || null,
    threshold,
    rootMargin,
    once,
    stagger,
    isGroup,
    childAnim,
    options: baseParsed.options
  };
}
