import assert from 'assert';
import { validateExport } from '../src/js/studio/studio-export-validator.js';
import { getProjectState, setProjectState } from '../src/js/studio/studio-project-state.js';
import { sanitizeImportedHtml } from '../src/js/studio/studio-import-safety.js';
import { getThemeKit, getAllThemeKits } from '../src/js/studio/studio-theme-kits.js';
import { applyThemeToProject } from '../src/js/studio/studio-motion-tokens.js';
import { buildProjectPackage } from '../src/js/studio/studio-package-builder.js';
import { validatePackage } from '../src/js/studio/studio-package-validator.js';

console.log('▶ Running studio.test.js...');

export async function run() {
  try {
    const AnimX = (await import('../src/js/animx.js')).default;
    
    // Check version
    assert.strictEqual(AnimX.build.version, '3.4.0', 'AnimX version should be 3.4.0');
    assert.strictEqual(AnimX.build.versionInfo().version, '3.4.0', 'versionInfo should be 3.4.0');
    assert.strictEqual(AnimX.build.versionInfo().release, 'Studio Collaboration-Free Project Packaging and Theme Kits', 'release name should match');
    
    // Check if studio shortcut exists
    assert.strictEqual(typeof AnimX.studio, 'function', 'AnimX.studio() should exist');
    
    // Check Export Validator
    const safeCheck = validateExport('<div class="ax-fade">Hello</div>');
    assert.strictEqual(safeCheck.ok, true, 'Safe string should pass validation');
    
    const unsafeCheck = validateExport('<div class="ax-fade">Hello<script>alert(1)</script></div>');
    assert.strictEqual(unsafeCheck.ok, false, 'Unsafe string should fail validation');
    
    // Check Project State defaults
    const state = getProjectState();
    assert.strictEqual(state.version, '3.4.0', 'Project state should default to 3.4.0');
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
    assert.strictEqual(pkgObj.animxVersion, '3.4.0', 'Package version should match animx version');
    
    const validResult = validatePackage(JSON.stringify(pkgObj));
    assert.strictEqual(validResult.ok, true, 'Valid package should pass validation');
    
    const invalidPkg = JSON.stringify({ schema: 'bad-schema' });
    const invalidResult = validatePackage(invalidPkg);
    assert.strictEqual(invalidResult.ok, false, 'Invalid package should fail validation');
    
    const maliciousPkg = JSON.stringify({ schema: 'animx-package', badData: '<script>alert()</script>' });
    const maliciousResult = validatePackage(maliciousPkg);
    assert.strictEqual(maliciousResult.errors.length > 0, true, 'Malicious package should generate an error');
    
    console.log('✅ studio.test.js passed.');
  } catch (error) {
    console.error('❌ studio.test.js failed:', error);
    process.exit(1);
  }
}

run();
