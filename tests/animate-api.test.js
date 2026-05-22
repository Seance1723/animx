
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    const el = document.createElement('div');
    const inst = AnimX.animate(el, 'fade-up');
    assert.ok(inst);
    assert.doesNotThrow(() => inst.play());
    assert.doesNotThrow(() => inst.stop());
    assert.doesNotThrow(() => inst.destroy());
    
    // Missing
    const missingInst = AnimX.animate('.non-existent', 'fade-up');
    assert.doesNotThrow(() => missingInst.play());
    assert.doesNotThrow(() => missingInst.destroy());
  
