
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    assert.ok(AnimX.cms);
    assert.doesNotThrow(() => AnimX.refreshCMS());
    assert.doesNotThrow(() => AnimX.observeCMS());
    assert.doesNotThrow(() => AnimX.disconnectCMS());
    assert.ok(AnimX.getCMSRecipes().length > 0);
    assert.doesNotThrow(() => AnimX.applyRecipe('.missing', 'hero-saas-intro'));
  
