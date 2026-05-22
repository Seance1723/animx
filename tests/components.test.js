
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    const compInst = AnimX.component('.missing', 'button-ripple');
    assert.ok(compInst);
    assert.doesNotThrow(() => compInst.enable());
    assert.doesNotThrow(() => compInst.destroy());
  
