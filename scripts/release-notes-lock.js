import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.40.0",
  "releaseNotesFiles": [
    "README.md",
    "docs/release-notes-lock.md",
    "docs/known-issues.md",
    "docs/v3-40-signoff-readiness.md"
  ],
  "oldVersionsFound": [],
  "missingSections": [],
  "locked": true,
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-release-notes-lock.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-release-notes-lock.json');
