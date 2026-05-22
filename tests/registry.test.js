
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    assert.ok(AnimX.getPreset('fade-up'));
    assert.ok(AnimX.getPreset('text-rise'));
    assert.ok(AnimX.getPreset('svg-draw'));
    assert.ok(AnimX.getPreset('button-ripple'));
    assert.strictEqual(AnimX.getPreset('not-a-real-preset'), null);
    assert.ok(AnimX.searchPresets('fade').length > 0);
    assert.ok(AnimX.getPresetsByCategory('entrance').length > 0);
    assert.ok(AnimX.getPresetCategories().length > 0);
  
