
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    // Accessibility Tests
    assert.ok(typeof window.AnimX.accessibility === 'function', 'AnimX.accessibility missing');
    assert.ok(typeof window.AnimX.a11y === 'function', 'AnimX.a11y missing');
    assert.ok(typeof window.AnimX.auditAccessibility === 'function', 'AnimX.auditAccessibility missing');
    assert.ok(typeof window.AnimX.motionSafe === 'function', 'AnimX.motionSafe missing');
    assert.ok(typeof window.AnimX.setReducedMotion === 'function', 'AnimX.setReducedMotion missing');
    assert.ok(typeof window.AnimX.getReducedMotion === 'function', 'AnimX.getReducedMotion missing');
    assert.ok(typeof window.AnimX.focusSafe === 'function', 'AnimX.focusSafe missing');
    assert.ok(typeof window.AnimX.announce === 'function', 'AnimX.announce missing');
    
    // Test setReducedMotion
    window.AnimX.setReducedMotion('always');
    let rm = window.AnimX.getReducedMotion();
    assert.strictEqual(rm.mode, 'always', 'setReducedMotion failed for "always"');
    assert.strictEqual(rm.active, true, 'setReducedMotion failed for "always"');
    
    window.AnimX.setReducedMotion('never');
    rm = window.AnimX.getReducedMotion();
    assert.strictEqual(rm.mode, 'never', 'setReducedMotion failed for "never"');
    assert.strictEqual(rm.active, false, 'setReducedMotion failed for "never"');
    
    window.AnimX.setReducedMotion('system');
    
    // Test auditAccessibility
    const audit = window.AnimX.auditAccessibility();
    assert.strictEqual(typeof audit.ok, 'boolean', 'auditAccessibility returned bad format');
    assert.ok(Array.isArray(audit.warnings), 'auditAccessibility warnings missing');
    
    console.log('✅ accessibility.test.js passed.');
  
