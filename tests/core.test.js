import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    assert.strictEqual(AnimX.version, '3.21.0', 'Version should match package');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));

    // v3.21.0 Migration Hook Tests
    assert.strictEqual(typeof AnimX.migrateDataAttributes, 'function', 'migrateDataAttributes API should exist');

    // v3.21.0 Composer API Tests
    assert.strictEqual(typeof AnimX.compose, 'function', 'compose API should exist');
    assert.strictEqual(typeof AnimX.registerVariant, 'function', 'registerVariant API should exist');
    assert.strictEqual(typeof AnimX.validateChain, 'function', 'validateChain API should exist');

    const testVariant = { name: "test", effects: [{ type: "entrance", effect: "fade-up" }] };
    AnimX.registerVariant("test-variant", testVariant);
    const retrieved = AnimX.getVariant("test-variant");
    assert.strictEqual(retrieved.name, "test", "Should store and retrieve variants");

    const validation = AnimX.validateChain([
      { effect: "fade-up" },
      { effect: "card-lift" },
      { effect: "card-spotlight-hover" }
    ]);
    assert.strictEqual(validation.ok, true, "Valid chain should pass");

    // v3.21.0 State API Tests
    assert.strictEqual(typeof AnimX.state, 'function', 'state API should exist');
    assert.strictEqual(typeof AnimX.setState, 'function', 'setState API should exist');
    assert.strictEqual(typeof AnimX.trigger, 'function', 'trigger API should exist');

    const stateTarget = document.createElement('div');
    AnimX.state(stateTarget, { initial: "idle", states: { idle: "fade", loading: "zoom" } });
    assert.strictEqual(AnimX.getState(stateTarget), "idle", "State should initialize correctly");

    // v3.21.0 Scroll Story Tests
    assert.strictEqual(typeof AnimX.scrollStory, 'function', 'scrollStory API should exist');
    assert.strictEqual(typeof AnimX.responsiveMotion, 'function', 'responsiveMotion API should exist');
    assert.strictEqual(typeof AnimX.viewportMotion, 'function', 'viewportMotion API should exist');
    assert.strictEqual(typeof AnimX.validateScrollStory, 'function', 'validateScrollStory API should exist');

    const validationScroll = AnimX.validateScrollStory({ scenes: [{ target: '.dummy', effect: 'fade' }] });
    assert.strictEqual(validationScroll.ok, true, "Valid story should pass");

    // v3.21.0 3D & Spatial Tests
    assert.strictEqual(typeof AnimX.spatial, 'function', 'spatial API should exist');
    assert.strictEqual(typeof AnimX.threeD, 'function', 'threeD API should exist');
    assert.strictEqual(typeof AnimX.validate3D, 'function', 'validate3D API should exist');

    const validation3D = AnimX.validate3D({ effect: 'card-3d-tilt-soft' });
    assert.strictEqual(validation3D.ok, true, "Valid 3D config should pass");

    // v3.21.0 Easing & Physics Tests
    assert.strictEqual(typeof AnimX.easing, 'function', 'easing API should exist');
    assert.strictEqual(typeof AnimX.physics, 'function', 'physics API should exist');
    assert.strictEqual(typeof AnimX.spring, 'function', 'spring API should exist');
    
    assert.strictEqual(AnimX.validateEase("cubic-bezier(0.22, 1, 0.36, 1)"), true, "Valid bezier should pass");
    assert.strictEqual(AnimX.validateEase("invalid-string"), false, "Invalid bezier should fail");

    const validationPhysics = AnimX.validatePhysics({ type: 'spring', stiffness: 100 });
    assert.strictEqual(validationPhysics.ok, true, "Valid physics config should pass");

    // v3.20.0 Text Typography Tests
    assert.strictEqual(typeof AnimX.splitText, 'function', 'splitText API should exist');
    assert.strictEqual(typeof AnimX.scrambleText, 'function', 'scrambleText API should exist');
    assert.strictEqual(typeof AnimX.counterText, 'function', 'counterText API should exist');
    
    const validationText = AnimX.validateTextEffect({ split: 'chars' });
    assert.strictEqual(validationText.ok, true, "Valid text config should pass");

    // v3.21.0 Media Tests
    assert.strictEqual(typeof AnimX.media, 'function', 'media API should exist');
    assert.strictEqual(typeof AnimX.imageReveal, 'function', 'imageReveal API should exist');
    assert.strictEqual(typeof AnimX.imageMask, 'function', 'imageMask API should exist');
    assert.strictEqual(typeof AnimX.videoMotion, 'function', 'videoMotion API should exist');
    assert.strictEqual(typeof AnimX.gallery, 'function', 'gallery API should exist');
    
    const validationMedia = AnimX.validateMediaEffect({ effect: 'image-mask-reveal' });
    assert.strictEqual(validationMedia.ok, true, "Valid media config should pass");

    console.log('[Tests] core API check passed');
    
  } catch (err) {
    throw err;
  }
}

run();
