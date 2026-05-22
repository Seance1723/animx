
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    const st = AnimX.stagger('.missing', 'fade-up', { stagger: 100 });
    assert.ok(st);
    assert.doesNotThrow(() => st.destroy());
  
