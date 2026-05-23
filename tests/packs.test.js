import assert from 'assert';
import AnimX from '../src/js/animx.js';

export function run() {
  try {
    // 1. Initial State
    const packs = AnimX.getPacks();
    assert.ok(packs.length >= 3, "Default packs should be registered on load");

    // 2. Export test
    const jsonStr = AnimX.exportPack('animx-text-essentials-pack');
    assert.ok(typeof jsonStr === 'string', "Export should yield stringified JSON");
    const parsed = JSON.parse(jsonStr);
    assert.strictEqual(parsed.id, 'animx-text-essentials-pack');

    // 3. Security Audit - Safe
    let audit = AnimX.auditPack(parsed);
    assert.strictEqual(audit.ok, true, "Safe pack should pass audit");

    // 4. Security Audit - Prototype Pollution
    const maliciousPack = { ...parsed };
    maliciousPack["__proto__"] = { hacked: true };
    audit = AnimX.auditPack(maliciousPack);
    assert.strictEqual(audit.ok, false, "Should block prototype pollution");
    assert.ok(audit.blocked.some(m => m.includes('__proto__')));

    // 5. Security Audit - XSS
    const xssPack = { ...parsed, description: "<script>alert(1)</script>" };
    audit = AnimX.auditPack(xssPack);
    assert.strictEqual(audit.ok, false, "Should block script tags");

    // 6. Validation - Invalid ID
    const badPack = { ...parsed, id: "BAD ID!" };
    let val = AnimX.validatePack(badPack);
    assert.strictEqual(val.ok, false, "Should fail on bad ID format");

    // 7. Import Dry Run
    const newPack = {
      schema: "animx-pack-manifest",
      id: "my-test-pack",
      name: "Test",
      version: "1.0",
      type: "preset-pack",
      contents: { presets: ["fade-up"] } // Assuming fade-up exists
    };
    
    const importRes = AnimX.importPack(newPack, { dryRun: true });
    assert.strictEqual(importRes.ok, true, "Valid import dry-run should pass");
    assert.strictEqual(AnimX.getPack("my-test-pack"), undefined, "Dry run should not install pack");

    // 8. Real Import
    const realImport = AnimX.importPack(newPack, { dryRun: false });
    assert.strictEqual(realImport.ok, true, "Real import should pass");
    assert.ok(AnimX.getPack("my-test-pack"), "Real import should install pack");

    console.log("✅ packs.test.js passed.");
  } catch (err) {
    console.error("❌ packs.test.js failed:\n", err);
    process.exit(1);
  }
}
