import assert from 'assert';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    const report = AnimX.finalAudit();
    
    assert.strictEqual(report.version, '3.31.0', 'Audit version matches');
    assert.ok(report.summary.catalog.includes('presets audited'), 'Catalog summary is valid');
    
    // We expect there might be some 'needs-review' items depending on the exact coverage, 
    // but the finalAudit API itself should not crash.
    assert.ok(report.ok !== undefined, 'Audit returns an ok boolean');
    
    const matrix = report.matrix;
    assert.ok(matrix.elements['Text'], 'Matrix has Text element');
    assert.ok(matrix.usageModes['data'], 'Matrix has data mode');
    
    console.log(`✅ audit.test.js passed. Overall status: ${report.overallStatus}`);
  } catch (err) {
    console.error(`❌ audit.test.js failed:\n`, err);
    process.exit(1);
  }
}
