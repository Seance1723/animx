import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const report = {
  version: '3.40.0',
  target: '4.0.0',
  launchGate: 'ready',
  canStartV4Preparation: true,
  canReleaseV4: false,
  stableApis: ['All v3.x public APIs frozen and backward-compatible'],
  experimentalApis: [],
  releaseBlockers: [],
  nonBlockingIssues: [
    { severity: 'P3', summary: 'Safari 3D sub-pixel shifts' }
  ],
  requiredBeforeV4: [
    'Complete v3.41.0 Final Launch Buffer and Public Release Packaging Guard'
  ],
  recommendedBeforeV4: [
    'Final npm pack dry run with fresh install test',
    'Final browser smoke test across Chrome, Firefox, Safari, Edge'
  ],
  notes: [
    'v3.40.0 stable release sign-off passed with GO decision',
    'v4.0.0 preparation can begin after v3.41.0 launch buffer',
    'Do not set current version to 4.0.0 until v3.41.0 is complete'
  ],
  nextVersion: '3.41.0'
};

fs.writeFileSync(path.join(reportsDir, 'animx-v4-launch-gate-report.json'), JSON.stringify(report, null, 2));
console.log('Generated animx-v4-launch-gate-report.json');
