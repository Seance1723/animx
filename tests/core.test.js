import assert from 'assert';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    assert.strictEqual(AnimX.version, '3.36.0', 'Version should match package');
    assert.doesNotThrow(() => AnimX.config({ debug: true }));
    assert.doesNotThrow(() => AnimX.config({ debug: false }));
    assert.doesNotThrow(() => AnimX.ready(() => {}));
    const safeInst = AnimX.animate(null, 'fade-up');
    assert.ok(safeInst.play);
    assert.doesNotThrow(() => safeInst.destroy());
    assert.doesNotThrow(() => AnimX.destroy('.missing-target-does-not-crash'));

    // v3.28.0 Migration Hook Tests
    assert.strictEqual(typeof AnimX.migrateDataAttributes, 'function', 'migrateDataAttributes API should exist');

    // v3.28.0 Composer API Tests
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

    // v3.28.0 State API Tests
    assert.strictEqual(typeof AnimX.state, 'function', 'state API should exist');
    assert.strictEqual(typeof AnimX.setState, 'function', 'setState API should exist');
    assert.strictEqual(typeof AnimX.trigger, 'function', 'trigger API should exist');

    const stateTarget = document.createElement('div');
    AnimX.state(stateTarget, { initial: "idle", states: { idle: "fade", loading: "zoom" } });
    assert.strictEqual(AnimX.getState(stateTarget), "idle", "State should initialize correctly");

    // v3.28.0 Scroll Story Tests
    assert.strictEqual(typeof AnimX.scrollStory, 'function', 'scrollStory API should exist');
    assert.strictEqual(typeof AnimX.responsiveMotion, 'function', 'responsiveMotion API should exist');
    assert.strictEqual(typeof AnimX.viewportMotion, 'function', 'viewportMotion API should exist');
    assert.strictEqual(typeof AnimX.validateScrollStory, 'function', 'validateScrollStory API should exist');

    const validationScroll = AnimX.validateScrollStory({ scenes: [{ target: '.dummy', effect: 'fade' }] });
    assert.strictEqual(validationScroll.ok, true, "Valid story should pass");

    // v3.28.0 3D & Spatial Tests
    assert.strictEqual(typeof AnimX.spatial, 'function', 'spatial API should exist');
    assert.strictEqual(typeof AnimX.threeD, 'function', 'threeD API should exist');
    assert.strictEqual(typeof AnimX.validate3D, 'function', 'validate3D API should exist');

    const validation3D = AnimX.validate3D({ effect: 'card-3d-tilt-soft' });
    assert.strictEqual(validation3D.ok, true, "Valid 3D config should pass");

    // v3.28.0 Easing & Physics Tests
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

    // v3.28.0 Advanced Button & Micro-Interactions Tests
    assert.strictEqual(typeof AnimX.button, 'function', 'button API should exist');
    assert.strictEqual(typeof AnimX.link, 'function', 'link API should exist');
    assert.strictEqual(typeof AnimX.nav, 'function', 'nav API should exist');
    assert.strictEqual(typeof AnimX.dropdown, 'function', 'dropdown API should exist');
    assert.strictEqual(typeof AnimX.mobileMenu, 'function', 'mobileMenu API should exist');
    assert.strictEqual(typeof AnimX.buttonState, 'function', 'buttonState API should exist');
    assert.strictEqual(typeof AnimX.validateInteractionEffect, 'function', 'validateInteractionEffect API should exist');

    const validationInteraction = AnimX.validateInteractionEffect({ effect: 'button-glow' });
    assert.strictEqual(validationInteraction.ok, true, "Valid interaction config should pass");

    // v3.28.0 Data UI Tests
    assert.strictEqual(typeof AnimX.card, 'function', 'card API should exist');
    assert.strictEqual(typeof AnimX.grid, 'function', 'grid API should exist');
    assert.strictEqual(typeof AnimX.table, 'function', 'table API should exist');
    assert.strictEqual(typeof AnimX.dashboard, 'function', 'dashboard API should exist');
    assert.strictEqual(typeof AnimX.kpi, 'function', 'kpi API should exist');
    assert.strictEqual(typeof AnimX.chartReveal, 'function', 'chartReveal API should exist');
    assert.strictEqual(typeof AnimX.feed, 'function', 'feed API should exist');
    assert.strictEqual(typeof AnimX.validateDataUIEffect, 'function', 'validateDataUIEffect API should exist');

    const validationDataUI = AnimX.validateDataUIEffect({ effect: 'table-row-fade' });
    assert.strictEqual(validationDataUI.ok, true, "Valid data UI config should pass");

    // v3.28.0 UI Feedback Tests
    assert.strictEqual(typeof AnimX.form, 'function', 'form API should exist');
    assert.strictEqual(typeof AnimX.input, 'function', 'input API should exist');
    assert.strictEqual(typeof AnimX.validationMotion, 'function', 'validationMotion API should exist');
    assert.strictEqual(typeof AnimX.modal, 'function', 'modal API should exist');
    assert.strictEqual(typeof AnimX.drawer, 'function', 'drawer API should exist');
    assert.strictEqual(typeof AnimX.toast, 'function', 'toast API should exist');
    assert.strictEqual(typeof AnimX.tooltip, 'function', 'tooltip API should exist');
    assert.strictEqual(typeof AnimX.accordion, 'function', 'accordion API should exist');
    assert.strictEqual(typeof AnimX.validateFeedbackEffect, 'function', 'validateFeedbackEffect API should exist');

    const validationFeedback = AnimX.validateFeedbackEffect({ effect: 'input-focus-glow' });
    assert.strictEqual(validationFeedback.ok, true, "Valid feedback config should pass");

    // v3.28.0 Backgrounds Tests
    assert.strictEqual(typeof AnimX.background, 'function', 'background API should exist');
    assert.strictEqual(typeof AnimX.meshGradient, 'function', 'meshGradient API should exist');
    assert.strictEqual(typeof AnimX.aurora, 'function', 'aurora API should exist');
    assert.strictEqual(typeof AnimX.orbs, 'function', 'orbs API should exist');
    assert.strictEqual(typeof AnimX.spotlight, 'function', 'spotlight API should exist');
    assert.strictEqual(typeof AnimX.particleLite, 'function', 'particleLite API should exist');
    assert.strictEqual(typeof AnimX.validateBackgroundEffect, 'function', 'validateBackgroundEffect API should exist');

    const validationBackground = AnimX.validateBackgroundEffect({ effect: 'bg-mesh-gradient' });
    assert.strictEqual(validationBackground.ok, true, "Valid background config should pass");

    // v3.28.0 SVG Tests
    assert.strictEqual(typeof AnimX.svg, 'function', 'svg API should exist');
    assert.strictEqual(typeof AnimX.svgDraw, 'function', 'svgDraw API should exist');
    assert.strictEqual(typeof AnimX.svgPathFollow, 'function', 'svgPathFollow API should exist');
    assert.strictEqual(typeof AnimX.icon, 'function', 'icon API should exist');
    assert.strictEqual(typeof AnimX.logo, 'function', 'logo API should exist');
    assert.strictEqual(typeof AnimX.infographic, 'function', 'infographic API should exist');
    assert.strictEqual(typeof AnimX.validateSVGEffect, 'function', 'validateSVGEffect API should exist');

    const validationSvg = AnimX.validateSVGEffect({ effect: 'svg-draw-stagger' });
    assert.strictEqual(validationSvg.ok, true, "Valid SVG config should pass");

    // v3.28.0 Transition Tests
    assert.strictEqual(typeof AnimX.pageTransition, 'function', 'pageTransition API should exist');
    assert.strictEqual(typeof AnimX.sectionTransition, 'function', 'sectionTransition API should exist');
    assert.strictEqual(typeof AnimX.routeMotion, 'function', 'routeMotion API should exist');
    assert.strictEqual(typeof AnimX.viewTransition, 'function', 'viewTransition API should exist');
    assert.strictEqual(typeof AnimX.contentSwap, 'function', 'contentSwap API should exist');
    assert.strictEqual(typeof AnimX.sharedElement, 'function', 'sharedElement API should exist');

    // v3.28.0 CMS Tests
    assert.strictEqual(typeof AnimX.cms, 'function', 'cms API should exist');
    assert.strictEqual(typeof AnimX.refreshCMS, 'function', 'refreshCMS API should exist');
    assert.strictEqual(typeof AnimX.observeCMS, 'function', 'observeCMS API should exist');
    assert.strictEqual(typeof AnimX.disconnectCMS, 'function', 'disconnectCMS API should exist');
    
    // Test validation
    const invalidCMS = AnimX.validateCMSRecipe({});
    assert.strictEqual(invalidCMS.ok, false, "Invalid CMS recipe config should fail");

    console.log('[Tests] core API check passed');
    
  } catch (err) {
    throw err;
  }
}

run();
