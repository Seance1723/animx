
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    assert.ok(AnimX.inspect);
    assert.ok(AnimX.validate);
    assert.ok(AnimX.diagnose);
    assert.ok(AnimX.features);
    assert.ok(AnimX.versionInfo);
    assert.ok(AnimX.findPreset);
    assert.ok(AnimX.suggestPreset);
    assert.ok(AnimX.getExamples);
    assert.ok(AnimX.copyExample);
    
    const diag = AnimX.diagnose();
    assert.strictEqual(diag.version, '2.0.0');
    
    const feats = AnimX.features();
    assert.ok('waapi' in feats);
  
