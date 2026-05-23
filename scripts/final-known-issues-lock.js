import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const report = {
  version: '3.40.0',
  issues: [
    { severity: 'P3', module: '3D/Spatial', summary: 'Safari sub-pixel rendering in CSS perspective transforms', workaround: 'Use 2D fallback transforms', targetFix: 'v4.x' },
    { severity: 'P3', module: 'Studio', summary: 'Some optional Studio panels marked incomplete', workaround: 'Panels are honestly marked as incomplete in UI', targetFix: 'v4.x' },
    { severity: 'P3', module: 'Accessibility', summary: 'Focus trap in modals is a documented caveat', workaround: 'Use native dialog or dedicated focus-trap library', targetFix: 'v4.x' }
  ],
  releaseBlockers: [],
  nonBlockingIssues: [],
  deferredIssues: [
    { severity: 'P3', module: '3D/Spatial', summary: 'Safari sub-pixel rendering in CSS perspective transforms' },
    { severity: 'P3', module: 'Studio', summary: 'Some optional Studio panels marked incomplete' },
    { severity: 'P3', module: 'Accessibility', summary: 'Focus trap in modals is a documented caveat' }
  ],
  status: 'ready'
};

fs.writeFileSync(path.join(reportsDir, 'animx-final-known-issues-lock.json'), JSON.stringify(report, null, 2));
console.log('Generated animx-final-known-issues-lock.json');
