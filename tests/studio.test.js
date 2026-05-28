import assert from 'assert';
import { validateExport } from '../src/js/studio/studio-export-validator.js';
import { getProjectState, setProjectState } from '../src/js/studio/studio-project-state.js';
import { sanitizeImportedHtml } from '../src/js/studio/studio-import-safety.js';
import { getThemeKit, getAllThemeKits } from '../src/js/studio/studio-theme-kits.js';
import { applyThemeToProject } from '../src/js/studio/studio-motion-tokens.js';
import { buildProjectPackage } from '../src/js/studio/studio-package-builder.js';
import { validatePackage } from '../src/js/studio/studio-package-validator.js';
import { runFullProjectQa } from '../src/js/studio/studio-qa-runner.js';
import { runReleaseAssistant } from '../src/js/studio/studio-release-assistant.js';
import { getCreativeEffects, getCreativeFamilies } from '../src/js/creative/creative-catalog.js';
import { 
  generateClientMotionGuide, 
  generateDeveloperGuide, 
  generateCMSGuide, 
  generateWordPressGuide, 
  generateWebflowGuide
} from '../src/js/studio/studio-handoff.js';
import { generateDeliveryKit } from '../src/js/studio/studio-delivery.js';
import { validatePresetPack, importPresetPack } from '../src/js/studio/studio-preset-pack-manager.js';
import { validateRecipe, importRecipe } from '../src/js/studio/studio-recipe-library.js';
import { validateScene } from '../src/js/studio/studio-scene-validator.js';
import { getPatterns } from '../src/js/patterns/pattern-registry.js';
import { exportPatternHTML } from '../src/js/patterns/pattern-export.js';
import fs from 'fs';
import path from 'path';

console.log('▶ Running studio.test.js...');

export async function run() {
  try {
    const AnimX = (await import('../src/js/animx.js')).default;
    
    // Validate version tracking
    assert.strictEqual(AnimX.version, '3.41.0', 'AnimX version should be 3.41.0');
    assert.strictEqual(AnimX.versionInfo().version, '3.41.0', 'versionInfo should be 3.41.0');
    assert.strictEqual(AnimX.versionInfo().release, 'Animation Registry Rebuild, Capability Matrix, and Playground-Ready Metadata Foundation', 'release name should match');
    
    // Check if studio shortcut exists
    assert.strictEqual(typeof AnimX.studio, 'function', 'AnimX.studio() should exist');
    
    // Check Export Validator
    const safeCheck = validateExport('<div class="ax-fade">Hello</div>');
    assert.strictEqual(safeCheck.ok, true, 'Safe string should pass validation');
    
    const unsafeCheck = validateExport('<div class="ax-fade">Hello<script>alert(1)</script></div>');
    assert.strictEqual(unsafeCheck.ok, false, 'Unsafe string should fail validation');
    
    // Check Project State defaults
    const state = getProjectState();
    assert.strictEqual(state.version, '3.26.0', 'Project state should default to 3.26.0');
    assert.strictEqual(state.motionStyle, 'smooth-professional', 'Default motion style should be smooth-professional');
    assert.strictEqual(state.sections.length, 0, 'Should start with no sections');
    
    // Check HTML Sanitizer
    const dirtyHtml = '<div onclick="alert(1)">Hello<script>malicious()</script><a href="javascript:foo()">link</a></div>';
    const safeHtmlObj = sanitizeImportedHtml(dirtyHtml);
    assert.strictEqual(safeHtmlObj.ok, true, 'Sanitization should complete successfully');
    assert.strictEqual(safeHtmlObj.cleanHtml.includes('script'), false, 'Script tag should be removed');
    assert.strictEqual(safeHtmlObj.cleanHtml.includes('onclick'), false, 'onclick attribute should be removed');
    assert.strictEqual(safeHtmlObj.cleanHtml.includes('javascript:'), false, 'javascript protocol should be removed');
    assert.strictEqual(safeHtmlObj.warnings.length >= 2, true, 'Should generate at least 2 warnings');
    
    // Check Theme Kits
    const premiumSoft = getThemeKit('premium-soft');
    assert.strictEqual(premiumSoft.id, 'premium-soft', 'Theme kit should exist');
    const enterpriseClean = getThemeKit('enterprise-clean');
    assert.strictEqual(enterpriseClean.id, 'enterprise-clean', 'Theme kit should exist');
    
    const themedState = applyThemeToProject(state, 'enterprise-clean');
    assert.strictEqual(themedState.themeKit, 'enterprise-clean', 'Theme should be applied to state');
    assert.strictEqual(themedState.motionTokens.durationFast, 200, 'Motion tokens should update');
    
    // Check Project Packaging
    const pkgObj = buildProjectPackage(themedState);
    assert.strictEqual(pkgObj.schema, 'animx-package', 'Schema ID should be correct');
    assert.strictEqual(pkgObj.animxVersion, '3.26.0', 'Package version should match animx version');
    
    const validResult = validatePackage(JSON.stringify(pkgObj));
    assert.strictEqual(validResult.ok, true, 'Valid package should pass validation');
    
    const invalidPkg = JSON.stringify({ schema: 'bad-schema' });
    const invalidResult = validatePackage(invalidPkg);
    assert.strictEqual(invalidResult.ok, false, 'Invalid package should fail validation');
    
    const maliciousPkg = JSON.stringify({ schema: 'animx-package', badData: '<script>alert()</script>' });
    const maliciousResult = validatePackage(maliciousPkg);
    assert.strictEqual(maliciousResult.errors.length > 0, true, 'Malicious package should generate an error');
    
    // Check QA Runner
    const qaState = JSON.parse(JSON.stringify(themedState));
    qaState.sections.push({ type: 'hero', settings: { headingPreset: 'fade-up' } });
    const qaReport = runFullProjectQa(qaState);
    assert.strictEqual(qaReport.status, 'pass', 'QA report should pass for a default valid project');
    // v3.26.0 Pattern Library Integration
    assert.strictEqual(typeof getPatterns, 'function', 'getPatterns API should exist');
    assert.strictEqual(typeof exportPatternHTML, 'function', 'exportPatternHTML API should exist');
    const patterns = getPatterns();
    assert.ok(patterns.length > 0, 'Pattern registry should not be empty');
    const saasPattern = patterns.find(p => p.id === 'hero-premium-soft');
    assert.ok(saasPattern, 'SaaS Hero Pattern should exist');
    assert.ok(exportPatternHTML(saasPattern).length > 0, 'Pattern HTML export should return string');

    console.log('[Tests] Studio validation passed');

    // Inject bad export payload
    const badState = JSON.parse(JSON.stringify(themedState));
    badState.name = "<script>alert(1)</script>";
    badState.sections.push({ type: 'hero', settings: { headingPreset: 'unknown-preset-123' } });
    
    const badQaReport = runFullProjectQa(badState);
    assert.strictEqual(badQaReport.status, 'fail', 'QA report should fail if script tag or unknown preset is found');
    assert.strictEqual(badQaReport.score < 100, true, 'Score should be penalized');
    assert.strictEqual(badQaReport.errors.length > 0, true, 'Should have errors mapped from nested reports');
    
    // Check Release Assistant
    const releaseRes = runReleaseAssistant(badState);
    assert.strictEqual(releaseRes.ready, false, 'Release should not be ready with failed QA');
    assert.strictEqual(releaseRes.releaseDraft.includes('unknown-preset-123'), true, 'Draft should list known limitations');
    
    // Check Creative Catalog
    const effects = getCreativeEffects();
    assert.strictEqual(Array.isArray(effects), true, 'Creative effects should return an array');
    assert.strictEqual(effects.length > 0, true, 'Creative effects should not be empty');
    assert.strictEqual(effects[0].category, 'rolling-text', 'First category should be rolling text');
    
    const families = getCreativeFamilies();
    assert.strictEqual(families.includes('roll'), true, 'Families should include roll');
    assert.strictEqual(families.includes('kinetic'), true, 'Families should include kinetic');
    
    // Check Handoff and Delivery Kits
    const sampleProject = { name: "Test Project", motionStyle: "default", sections: [] };
    const devGuide = generateDeveloperGuide(sampleProject);
    assert.strictEqual(devGuide.includes('animx.min.css'), true, 'Dev guide should include css loading');
    assert.strictEqual(devGuide.includes('animx.min.js'), true, 'Dev guide should include js loading');
    
    const wpGuide = generateWordPressGuide(sampleProject);
    assert.strictEqual(wpGuide.includes("wp_enqueue_style('animx'"), true, 'WP guide should include enqueue style');
    
    const dkOptions = { includeClient: true, includeDev: true, includeCms: true, includeWp: true, includeWebflow: true, includeMap: true, includeInventory: true, includeQa: true, includeChecklist: true };
    const deliveryKit = generateDeliveryKit(sampleProject, dkOptions);
    assert.strictEqual(deliveryKit.version, '3.26.0', 'Delivery Kit should include version 3.26.0');
    assert.strictEqual(deliveryKit.projectName, 'Test Project', 'Delivery Kit should match project name');
    
    // HTML checks
    const studioHtml = fs.readFileSync(path.resolve('./demo/studio.html'), 'utf8');
    assert.strictEqual(studioHtml.includes('Handoff Documentation'), true, 'demo/studio.html should contain Handoff Documentation');
    assert.strictEqual(studioHtml.includes('Delivery Kit'), true, 'demo/studio.html should contain Delivery Kit');
    assert.strictEqual(studioHtml.includes('Client Motion Guide'), true, 'demo/studio.html should contain Client Motion Guide');
    assert.strictEqual(studioHtml.includes('Developer Implementation Guide'), true, 'demo/studio.html should contain Developer Implementation Guide');
    assert.strictEqual(studioHtml.includes('WordPress Handoff Guide'), true, 'demo/studio.html should contain WordPress Handoff Guide');
    assert.strictEqual(studioHtml.includes('Webflow Handoff Guide'), true, 'demo/studio.html should contain Webflow Handoff Guide');
    assert.strictEqual(studioHtml.includes('Animation Map'), true, 'demo/studio.html should contain Animation Map');
    assert.strictEqual(studioHtml.includes('Preset Inventory'), true, 'demo/studio.html should contain Preset Inventory');
    
    // Playground Checks
    const playgroundHtml = fs.readFileSync(path.resolve('./demo/playground.html'), 'utf8');
    assert.strictEqual(playgroundHtml.includes('Handoff and Delivery Kit Playground'), true, 'demo/playground.html should contain Handoff and Delivery Kit Playground');

    // v3.26.0 Preset Pack & Recipe Tests
    const badPackStr = JSON.stringify({ schema: "animx-preset-pack", packId: "test", name: "Test", __proto__: { poll: "ution" }, presets: [] }).replace('"presets":[]', '"__proto__":{"poll":"ution"},"presets":[]');
    const badPackResult = importPresetPack(badPackStr);
    assert.strictEqual(badPackResult.success, false, 'Should block __proto__ in preset pack import');
    
    const validPackStr = JSON.stringify({ schema: "animx-preset-pack", packId: "test", name: "Test", presets: [] });
    const importResult = importPresetPack(validPackStr);
    assert.strictEqual(importResult.success, true, 'Should successfully import valid pack json');
    
    const badRecipeStr = JSON.stringify({ id: "test", name: "Test", steps: [{ target: "<script>alert(1)</script>", preset: "fade" }] });
    const badRecipeResult = importRecipe(badRecipeStr);
    assert.strictEqual(badRecipeResult.success, false, 'Should fail to import recipe with script tags');
    
    // v3.26.0 Scene Validation Tests
    const { importScene } = await import('../src/js/studio/studio-scene-storage.js');
    const { validateScene } = await import('../src/js/studio/studio-scene-validator.js');

    const badSceneStr = JSON.stringify({ schema: "animx-timeline-scene", sceneId: "test", name: "Test" }).replace('}', ',"__proto__":{"poll":"ution"}}');
    const badSceneResult = importScene(badSceneStr);
    assert.strictEqual(badSceneResult.success, false, 'Should block __proto__ in scene import');
    
    const validSceneStr = JSON.stringify({ schema: "animx-timeline-scene", schemaVersion: "1.0", animxVersion: "3.26.0", sceneId: "test-scene", name: "Test", tracks: [], steps: [] });
    const importSceneResult = importScene(validSceneStr);
    assert.strictEqual(importSceneResult.success, true, 'Should successfully import valid scene json');

    console.log('✅ studio.test.js passed.');
  } catch (error) {
    console.error('❌ studio.test.js failed:', error);
    process.exit(1);
  }
}

run();
