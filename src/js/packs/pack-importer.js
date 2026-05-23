import { validatePack } from './pack-validator.js';
import { auditPack } from './pack-security-audit.js';
import { registerPack, getPack } from './pack-registry.js';

export function importPack(packJson, options = { dryRun: true, overwrite: false }) {
  const report = {
    ok: false,
    dryRun: options.dryRun,
    installed: [],
    skipped: [],
    warnings: [],
    errors: []
  };

  try {
    const pack = typeof packJson === 'string' ? JSON.parse(packJson) : packJson;

    // 1. Audit
    const auditRes = auditPack(pack);
    if (!auditRes.ok) {
      report.errors.push(...auditRes.blocked);
      report.errors.push("Security audit failed. Import aborted.");
      return report;
    }

    // 2. Validate
    const valRes = validatePack(pack);
    if (!valRes.ok) {
      report.errors.push(...valRes.errors);
      report.errors.push("Validation failed. Import aborted.");
      return report;
    }
    report.warnings.push(...valRes.warnings);

    // 3. Register Pack
    if (getPack(pack.id) && !options.overwrite) {
      report.skipped.push(pack.id);
      report.warnings.push(`Pack ${pack.id} already exists. Skipping.`);
    } else {
      if (!options.dryRun) {
        registerPack(pack);
      }
      report.installed.push(pack.id);
    }

    report.ok = report.errors.length === 0;

  } catch (err) {
    report.errors.push(`Invalid JSON payload: ${err.message}`);
  }

  return report;
}
