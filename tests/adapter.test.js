
import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';


    // Mock environments
    global.window.jQuery = function() { return { toArray: () => [], addClass: function() { return this; } }; };
    global.window.jQuery.fn = {};
    global.window.AnimX = AnimX;
    
    global.window.Alpine = {
      directive: function(name, callback) {
        this._directives = this._directives || {};
        this._directives[name] = callback;
      }
    };
    
    // Load adapters (these usually execute immediately)
    // We will dynamically import them to simulate browser loading
    await import('../src/js/adapters/jquery-adapter.js');
    await import('../src/js/adapters/alpine-adapter.js');
    await import('../src/js/adapters/wordpress-adapter.js');
    await import('../src/js/adapters/webflow-adapter.js');
    
    // Dispatch Alpine init to trigger directive registration
    global.document.dispatchEvent(new Event('alpine:init'));
    
    assert.ok(typeof global.window.jQuery.fn.animx === 'function', 'jQuery plugin registered');
    assert.ok(typeof AnimX.wp === 'object', 'WordPress helper registered');
    assert.ok(typeof AnimX.webflow === 'object', 'Webflow helper registered');
    
    const integrations = AnimX.detectIntegration();
    assert.strictEqual(integrations.jquery, true, 'detectIntegration finds jQuery');
    assert.strictEqual(integrations.alpine, true, 'detectIntegration finds Alpine');
    
    console.log('✅ Adapter APIs exposed successfully');
  
