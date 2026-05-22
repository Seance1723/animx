import { normalizeSelector } from '../core/selector.js';
import { normalizeTextOptions } from './text-parser.js';
import { performSplitText, revertSplitText } from './split-text.js';
import { runTypewriter } from './text-typewriter.js';
import { runScramble } from './text-scramble.js';
import { runCounter } from './text-counter.js';
import { runSwap } from './text-swap.js';
import { runTicker } from './text-ticker.js';
import { textStateMap } from './text-state.js';
import { dispatchTextEvent } from './text-utils.js';
import { observeResponsiveText, unobserveResponsiveText } from './responsive-split.js';
import { refreshScrollMetrics } from '../scroll/scroll-ticker.js';

let coreInstance = null;

export function bindTextAnimX(instance) {
  coreInstance = instance;
}

export function splitText(selector, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) return [];
  
  const normOptions = normalizeTextOptions({ ...options, type: 'split' });
  
  const results = elements.map(el => {
    // If already split, revert first
    if (textStateMap.has(el)) {
      revertText(el);
    }
    const splitData = performSplitText(el, normOptions);
    dispatchTextEvent(el, 'text-split', { split: splitData, options: normOptions });
    
    return {
      ...splitData,
      revert: () => revertText(el)
    };
  });
  
  return results.length === 1 ? results[0] : results;
}

export function revertText(selector) {
  const elements = normalizeSelector(selector);
  elements.forEach(el => {
    const state = textStateMap.get(el);
    if (!state) return;
    
    if (state.stop) state.stop();
    
    if (state.type === 'split') {
      revertSplitText(el);
      unobserveResponsiveText(el);
    } else {
      el.innerHTML = state.originalHTML;
      textStateMap.delete(el);
    }
    
    dispatchTextEvent(el, 'text-revert', { element: el });
  });
}

export function text(selector, options = {}) {
  const elements = normalizeSelector(selector);
  if (elements.length === 0) {
    return { play: () => {}, stop: () => {}, reset: () => {}, revert: () => {}, destroy: () => {} };
  }
  const normOptions = normalizeTextOptions(options);
  
  const instances = elements.map(el => {
    // Revert existing
    if (textStateMap.has(el)) revertText(el);
    
    let instance;
    
    if (normOptions.type === 'split') {
      const splitData = performSplitText(el, normOptions);
      dispatchTextEvent(el, 'text-split', { split: splitData, options: normOptions });
      
      // Determine what to animate based on options.split
      let targets = [];
      const splits = Array.isArray(normOptions.split) ? normOptions.split : [normOptions.split];
      if (splits.includes('chars')) targets = splitData.chars;
      else if (splits.includes('words')) targets = splitData.words;
      else if (splits.includes('lines')) targets = splitData.lines;
      
      if (targets.length > 0) {
        // Delegate to stagger
        const staggerOpts = {
          ...normOptions,
          onStart: () => dispatchTextEvent(el, 'text-start', { type: 'split', options: normOptions }),
          onComplete: () => dispatchTextEvent(el, 'text-complete', { type: 'split', options: normOptions })
        };
        // Normalize stagger prop mapping
        if (typeof normOptions.stagger === 'object') {
          Object.assign(staggerOpts, normOptions.stagger);
        } else {
          staggerOpts.each = normOptions.stagger;
        }
        
        instance = coreInstance.stagger(targets, normOptions.animation, staggerOpts);
        
        // Attach revert
        const origDestroy = instance.destroy;
        instance.revert = () => revertText(el);
        instance.destroy = () => {
          origDestroy.call(instance);
          revertText(el);
        };
        
        // Store in state so revertText can stop it
        const state = textStateMap.get(el);
        if (state) {
          state.stop = () => instance.stop();
          state.replay = () => instance.replay();
        }
        
        // Handle responsive re-splitting
        if (normOptions.responsive) {
          observeResponsiveText(el, normOptions, () => {
            // Revert without killing the whole state object
            revertSplitText(el);
            const newSplitData = performSplitText(el, normOptions);
            
            // The existing stagger instance targets the OLD DOM nodes.
            // We need to recreate the stagger instance silently.
            if (instance && instance.destroy) instance.destroy();
            
            let newTargets = [];
            const splits = Array.isArray(normOptions.split) ? normOptions.split : [normOptions.split];
            if (splits.includes('chars')) newTargets = newSplitData.chars;
            else if (splits.includes('words')) newTargets = newSplitData.words;
            else if (splits.includes('lines')) newTargets = newSplitData.lines;
            
            instance = coreInstance.stagger(newTargets, normOptions.animation, staggerOpts);
            const state = textStateMap.get(el);
            if (state) {
              state.stop = () => instance.stop();
              state.replay = () => instance.replay();
            }
            refreshScrollMetrics(); // Update any scroll metrics if height changed
            return newSplitData;
          });
        }
      }
    } else if (normOptions.type === 'typewriter') {
      instance = runTypewriter(el, normOptions);
    } else if (normOptions.type === 'scramble') {
      instance = runScramble(el, normOptions);
    } else if (normOptions.type === 'counter') {
      instance = runCounter(el, normOptions);
    } else if (normOptions.type === 'swap') {
      instance = runSwap(el, normOptions, coreInstance);
    } else if (normOptions.type === 'ticker') {
      instance = runTicker(el, normOptions);
    }
    
    return instance;
  }).filter(Boolean);
  
  return instances.length === 1 ? instances[0] : instances;
}
