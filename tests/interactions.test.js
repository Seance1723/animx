
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    const interactInst = AnimX.interact('.missing', { hover: 'fade-up' });
    assert.doesNotThrow(() => interactInst.destroy && interactInst.destroy());
    
    const hoverInst = AnimX.hover('.missing', 'fade-up');
    assert.doesNotThrow(() => hoverInst.destroy && hoverInst.destroy());
    
    const pressInst = AnimX.press('.missing', 'fade-up');
    assert.doesNotThrow(() => pressInst.destroy && pressInst.destroy());
    
    const rippleInst = AnimX.ripple('.missing');
    assert.doesNotThrow(() => rippleInst.destroy && rippleInst.destroy());
  
