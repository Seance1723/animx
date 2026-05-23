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

console.log('▶ Running studio.test.js...');

export async function run() {
  try {
    const AnimX = (await import('../src/js/animx.js')).default;
    
    // Check version
    assert.strictEqual(AnimX.build.version, '3.6.0', 'AnimX version should be 3.6.0');
    assert.strictEqual(AnimX.build.versionInfo().version, '3.6.0', 'versionInfo should be 3.6.0');
    assert.strictEqual(AnimX.build.versionInfo().release, 'Advanced Creative Animation Catalog and Playground Expansion', 'release name should match');
    
    // Check if studio shortcut exists
    assert.strictEqual(typeof AnimX.studio, 'function', 'AnimX.studio() should exist');
    
    // Check Export Validator
    const safeCheck = validateExport('<div class="ax-fade">Hello</div>');
    assert.strictEqual(safeCheck.ok, true, 'Safe string should pass validation');
    
    const unsafeCheck = validateExport('<div class="ax-fade">Hello<script>alert(1)</script></div>');
    assert.strictEqual(unsafeCheck.ok, false, 'Unsafe string should fail validation');
    
    // Check Project State defaults
    const state = getProjectState();
    assert.strictEqual(state.version, '3.6.0', 'Project state should default to 3.6.0');
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
    assert.strictEqual(pkgObj.animxVersion, '3.6.0', 'Package version should match animx version');
    
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
    assert.strictEqual(qaReport.score, 100, 'Score should be 100 initially');
    
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
    
    console.log('✅ studio.test.js passed.');
  } catch (error) {
    console.error('❌ studio.test.js failed:', error);
    process.exit(1);
  }
}

run();
