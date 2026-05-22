
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    const el = document.createElement('div');
    const inst = AnimX.animate(el, 'fade-up');
    assert.doesNotThrow(() => AnimX.destroy(el));
    assert.doesNotThrow(() => AnimX.destroy('.non-existent-clean'));
  
