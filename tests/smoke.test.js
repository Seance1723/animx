import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    assert.strictEqual(AnimX.version, '3.36.0', 'Version should match expected package version');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
  
