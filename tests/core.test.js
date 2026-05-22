
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    assert.strictEqual(AnimX.version, '2.1.0');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));
  
