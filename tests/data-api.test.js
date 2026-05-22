
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    import { parseDataAttributes } from '../src/js/data/data-parser.js';
    const el = document.createElement('div');
    el.setAttribute('data-ax', 'fade-up');
    el.setAttribute('data-ax-duration', '1000');
    const res = parseDataAttributes(el, { defaultDuration: 500 });
    assert.ok(res, 'Should not be null');
    assert.strictEqual(res.animation, 'fade-up');
    assert.strictEqual(res.options.duration, 1000);
  
