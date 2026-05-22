
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    const tl = AnimX.timeline();
    assert.ok(tl.add);
    assert.doesNotThrow(() => tl.add('.missing', 'fade-up').play());
    assert.doesNotThrow(() => tl.pause());
    assert.doesNotThrow(() => tl.resume());
    assert.doesNotThrow(() => tl.stop());
    assert.doesNotThrow(() => tl.destroy());
  
