
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    const el = document.createElement('div');
    const inst = AnimX.scroll(el, 'fade-up');
    assert.doesNotThrow(() => AnimX.refreshScroll());
    assert.doesNotThrow(() => AnimX.unobserve(el));
    
    // Missing
    const missing = AnimX.scroll('.missing', 'fade-up');
    assert.doesNotThrow(() => missing.destroy && missing.destroy());
  
