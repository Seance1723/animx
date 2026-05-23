import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX Compatibility & Fallbacks tests...');
    
    assert(typeof AnimX.supports === 'function', 'AnimX.supports is a function');
    assert(typeof AnimX.getFeatureSupport === 'function', 'AnimX.getFeatureSupport is a function');
    assert(typeof AnimX.getFallback === 'function', 'AnimX.getFallback is a function');

    const fallbackDef = AnimX.getFallback('text-mask-up');
    assert(fallbackDef !== null, 'text-mask-up has a fallback definition');
    assert(fallbackDef.fallback === 'text-fade-up', 'text-mask-up falls back to text-fade-up');

    AnimX.registerFallback('test-3d-flip', {
      requires: ['cssVariables'],
      fallback: 'fade-up',
      reducedMotion: 'final-state'
    });
    
    const def = AnimX.getFallback('test-3d-flip');
    assert(def.fallback === 'fade-up', 'Custom fallback registered successfully');

    const features = AnimX.getFeatureSupport();
    assert(typeof features.intersectionObserver === 'boolean', 'intersectionObserver is boolean');
    
    console.log('[Tests] compat API check passed');
  } catch (err) {
    throw err;
  }
}

run();
