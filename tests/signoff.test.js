import assert from 'assert';
import fs from 'fs';
import path from 'path';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.40.0 Sign-Off tests...');

    // Version checks
    assert.strictEqual(AnimX.version, '3.40.0', 'AnimX.version must be 3.40.0');
    const vi = AnimX.versionInfo();
    assert.strictEqual(vi.name, 'AnimX');
    assert.strictEqual(vi.version, '3.40.0');
    assert.strictEqual(vi.release, 'Final Stable Release Sign-Off and v4.0.0 Launch Readiness Gate');
    assert.strictEqual(vi.dependency, 'zero-runtime-dependency');

    // Signoff API exists
    assert.strictEqual(typeof AnimX.signoff, 'function', 'signoff API must exist');

    // Signoff produces valid structure
    const result = AnimX.signoff();
    assert.ok(result.stableSignoff, 'must have stableSignoff');
    assert.ok(result.goNoGo, 'must have goNoGo');
    assert.ok(result.artifacts, 'must have artifacts');
    assert.ok(result.apiFreeze, 'must have apiFreeze');
    assert.ok(result.securityAccessibility, 'must have securityAccessibility');
    assert.ok(result.knownIssues, 'must have knownIssues');
    assert.ok(result.releaseReadiness, 'must have releaseReadiness');
    assert.ok(result.v4Gate, 'must have v4Gate');
    assert.ok(result.nextStep, 'must have nextStep');

    // Stable signoff report shape
    const ss = result.stableSignoff;
    assert.strictEqual(ss.version, '3.40.0');
    assert.ok(['ready', 'needs-review', 'blocked'].includes(ss.overallStatus));
    assert.ok(['go', 'needs-review', 'no-go'].includes(ss.decision));
    assert.ok(ss.summary);
    assert.ok(Array.isArray(ss.blockers));
    assert.strictEqual(ss.nextVersion, '3.41.0');

    // Go/no-go report shape
    const gng = result.goNoGo;
    assert.strictEqual(gng.version, '3.40.0');
    assert.ok(['go', 'needs-review', 'no-go'].includes(gng.decision));
    assert.ok(Array.isArray(gng.goCriteria));
    assert.ok(Array.isArray(gng.blockers));
    assert.strictEqual(gng.decision, 'go', 'decision should be go since no blockers');

    // v4 launch gate shape
    const v4 = result.v4Gate;
    assert.strictEqual(v4.version, '3.40.0');
    assert.strictEqual(v4.target, '4.0.0');
    assert.ok(['ready', 'needs-review', 'blocked'].includes(v4.launchGate));
    assert.strictEqual(v4.canStartV4Preparation, true);
    assert.strictEqual(v4.canReleaseV4, false, 'Must not release v4 yet');
    assert.strictEqual(v4.nextVersion, '3.41.0');

    // Next step shape
    const ns = result.nextStep;
    assert.strictEqual(ns.version, '3.40.0');
    assert.strictEqual(ns.nextVersion, '3.41.0');
    assert.strictEqual(ns.needed, true);
    assert.ok(ns.recommendedModule);

    // Security/accessibility shape
    const sa = result.securityAccessibility;
    assert.ok(sa.security);
    assert.ok(sa.accessibility);
    assert.ok(sa.reducedMotion);
    assert.ok(['ready', 'needs-review', 'blocked'].includes(sa.security.status));

    // Known issues shape
    const ki = result.knownIssues;
    assert.strictEqual(ki.version, '3.40.0');
    assert.ok(Array.isArray(ki.issues));
    assert.ok(Array.isArray(ki.releaseBlockers));
    assert.strictEqual(ki.releaseBlockers.length, 0, 'No release blockers');

    // Release readiness shape
    const rr = result.releaseReadiness;
    assert.strictEqual(rr.version, '3.40.0');
    assert.strictEqual(rr.readyForStableRelease, true);

    // API freeze shape
    const af = result.apiFreeze;
    assert.strictEqual(af.version, '3.40.0');
    assert.ok(Array.isArray(af.stableApis));
    assert.ok(af.stableApis.length > 0, 'Must have stable APIs');
    assert.strictEqual(af.removedApis.length, 0, 'No removed APIs');

    // Must not be v4.0.0
    assert.notStrictEqual(AnimX.version, '4.0.0');

    // Existing APIs still present
    const existingApis = [
      'animate', 'timeline', 'stagger', 'text', 'splitText', 'revertText',
      'scroll', 'scrollProgress', 'parallax', 'pin', 'svg', 'svgDraw',
      'interact', 'hover', 'press', 'magnetic', 'ripple', 'tilt',
      'component', 'destroy', 'refresh', 'init', 'ready',
      'accessibility', 'security', 'securityAudit',
      'compose', 'state', 'setState', 'scrollStory',
      'spatial', 'threeD', 'physics', 'spring', 'easing',
      'rollText', 'marqueeText', 'media', 'imageReveal', 'gallery',
      'button', 'nav', 'menu', 'card', 'grid', 'table', 'dashboard',
      'form', 'modal', 'drawer', 'toast', 'tooltip',
      'background', 'aurora', 'particleLite',
      'svgRoute', 'icon', 'logo', 'pageTransition', 'routeMotion',
      'cms', 'observeCMS', 'packs', 'registerPack', 'finalAudit',
      'supports', 'compatReport', 'signoff'
    ];
    for (const api of existingApis) {
      assert.strictEqual(typeof AnimX[api], 'function', `${api}() must exist`);
    }

    // Package.json checks
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      assert.strictEqual(pkg.version, '3.40.0');
      assert.ok(!pkg.dependencies || Object.keys(pkg.dependencies).length === 0, 'No runtime dependencies');
    }

    // README check
    const readmePath = path.resolve(process.cwd(), 'README.md');
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, 'utf8');
      assert.ok(readme.includes('3.40.0'), 'README must reference 3.40.0');
    }

    // Release notes check
    const rnPath = path.resolve(process.cwd(), 'docs/release-notes.md');
    if (fs.existsSync(rnPath)) {
      const rn = fs.readFileSync(rnPath, 'utf8');
      assert.ok(rn.includes('3.40.0'), 'Release notes must reference 3.40.0');
    }

    console.log('[Tests] Sign-Off tests passed');
  } catch (err) {
    throw err;
  }
}

run();
