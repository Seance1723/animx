
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    const svgInst = AnimX.svg('.missing', {});
    assert.ok(svgInst);
    assert.doesNotThrow(() => svgInst.destroy());
    
    const drawInst = AnimX.svgDraw('.missing', {});
    assert.doesNotThrow(() => drawInst.destroy());
  
