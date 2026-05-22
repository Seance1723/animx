
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    const textInst = AnimX.text('.missing', { type: 'split' });
    assert.ok(textInst);
    assert.doesNotThrow(() => textInst.destroy());
    
    const splitData = AnimX.splitText('.missing');
    assert.ok(Array.isArray(splitData));
    assert.doesNotThrow(() => AnimX.revertText('.missing'));
  
