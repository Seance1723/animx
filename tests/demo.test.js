import assert from 'assert';
import fs from 'fs';
import path from 'path';
import './setup.js';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.41.0 Animation Registry Rebuild, Capability Matrix, and Playground-Ready Metadata Foundation checks...');

    // 1. Version checks
    assert.strictEqual(AnimX.version, '3.41.0', 'AnimX.version should be 3.41.0');
    
    const info = AnimX.versionInfo();
    assert.strictEqual(info.version, '3.41.0', 'versionInfo version should match');
    assert.ok(info.release.includes('Animation Registry Rebuild, Capability Matrix, and Playground-Ready Metadata Foundation'), 'versionInfo release string should contain Animation Registry Rebuild, Capability Matrix, and Playground-Ready Metadata Foundation');

    // 2. Demo existence checks
    const demoPath = path.resolve(process.cwd(), 'demo');
    const requiredDemos = [
      'index.html',
      'showcase.html',
      'saas.html',
      'ecommerce.html',
      'dashboard.html',
      'portfolio.html',
      'agency.html',
      'documentation.html',
      'cms.html',
      'text.html',
      'media.html',
      'interactions.html',
      'data-ui.html',
      'feedback.html',
      'backgrounds.html',
      'svg.html',
      'transitions.html'
    ];

    for (const demo of requiredDemos) {
      const p = path.join(demoPath, demo);
      assert.ok(fs.existsSync(p), `Required demo page ${demo} must exist`);
      
      const content = fs.readFileSync(p, 'utf8');
      
      // Strict demo validation
      assert.ok(!content.includes('localhost'), `${demo} contains illegal localhost reference`);
      assert.ok(!content.includes('/src/'), `${demo} contains illegal /src/ reference`);
      assert.ok(!content.includes('unpkg.com') && !content.includes('cdn.jsdelivr.net'), `${demo} contains illegal CDN reference`);
    }

    console.log('[Tests] Demo website verification passed');
  } catch (err) {
    throw err;
  }
}

run();
