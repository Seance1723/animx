import assert from 'assert';
import './setup.js';
import { Hardening } from '../src/js/hardening/hardening-api.js';

export function run() {
  try {
    console.log('[Tests] Running AnimX v3.37.0 Hardening Security checks...');

    // 1. Prototype Pollution Guard
    const obj = {};
    const malicious = JSON.parse('{"__proto__": {"polluted": true}}');
    Hardening.safeMerge(obj, malicious);
    assert.strictEqual({}.polluted, undefined, 'Prototype pollution must be blocked');
    
    // 2. URL Safety
    assert.strictEqual(Hardening.isSafeUrl('javascript:alert(1)'), false, 'javascript: URLs must be blocked');
    assert.strictEqual(Hardening.isSafeUrl('VBSCRIPT:alert(1)'), false, 'vbscript: URLs must be blocked');
    assert.strictEqual(Hardening.isSafeUrl('data:text/html,<script>alert(1)</script>'), false, 'data:text HTML must be blocked');
    assert.strictEqual(Hardening.isSafeUrl('https://example.com'), true, 'https: URLs must be allowed');
    assert.strictEqual(Hardening.isSafeUrl('/local/path'), true, 'relative URLs must be allowed');

    // 3. Safe Parsing
    assert.strictEqual(Hardening.safeParseBoolean('TRUE'), true, 'Booleans must parse safely');
    assert.strictEqual(Hardening.safeParseNumber('99', 0, 0, 100), 99, 'Numbers must parse safely');
    
    // 4. Report structure
    const report = Hardening.report();
    assert.strictEqual(report.version, '3.37.0', 'Hardening API version should be 3.37.0');
    assert.strictEqual(report.ok, true, 'Hardening API report should be OK');

    console.log('[Tests] Hardening verification passed');
  } catch (err) {
    throw err;
  }
}

run();
