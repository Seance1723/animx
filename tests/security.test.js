
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    // Security Tests
    assert.ok(typeof window.AnimX.security === 'function', 'AnimX.security missing');
    assert.ok(typeof window.AnimX.securityAudit === 'function', 'AnimX.securityAudit missing');
    assert.ok(typeof window.AnimX.safeHTML === 'function', 'AnimX.safeHTML missing');
    assert.ok(typeof window.AnimX.safeSelector === 'function', 'AnimX.safeSelector missing');
    assert.ok(typeof window.AnimX.sanitizeOptions === 'function', 'AnimX.sanitizeOptions missing');
    
    // Prototype pollution test
    const payload = JSON.parse('{"__proto__":{"polluted":true}}');
    window.AnimX.config(payload);
    assert.strictEqual({}.polluted, undefined, 'Prototype was polluted by config');

    // Safe Selector test
    const badSel = window.AnimX.safeSelector("[bad-selector");
    assert.strictEqual(badSel.ok, false, 'Bad selector should fail safely');
    assert.doesNotThrow(() => window.AnimX.animate("[bad-selector", "fade-up"), 'animate should not throw on bad selector');

    // Safe HTML test
    const htmlTest = window.AnimX.safeHTML('<p>Hello</p><script>alert(1)</script><a href="javascript:x">Link</a><div onclick="x()">x</div>');
    assert.strictEqual(htmlTest.ok, true);
    assert.ok(htmlTest.removed.includes('<script>'), 'safeHTML must remove script');
    assert.ok(htmlTest.removed.includes('onclick'), 'safeHTML must remove onclick');
    assert.ok(htmlTest.removed.includes('javascript:href'), 'safeHTML must remove javascript: hrefs');

    // Swap safety test
    window.AnimX.security({ allowHTMLStringSwap: false });
    const dummy = document.createElement('div');
    dummy.className = 'dummy-swap';
    
    // Should ignore strings entirely
    window.AnimX.swap(dummy, '<img src="x" onerror="alert(1)">', { animation: 'fade' });
    assert.strictEqual(dummy.innerHTML, undefined, 'String swap should be blocked when allowHTMLStringSwap is false');
    
    console.log('✅ security.test.js passed.');
  
