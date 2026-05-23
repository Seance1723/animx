import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.38.0",
  "surfaces": {
    "readme": "frozen",
    "docs": "frozen",
    "demo": "frozen",
    "playground": "frozen",
    "gallery": "frozen",
    "studio": "frozen",
    "apiReference": "frozen",
    "presetReference": "frozen",
    "snippets": "frozen"
  },
  "blockers": [],
  "warnings": [],
  "needsReview": [
    "safari-3d-perspective"
  ],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-public-surface-freeze-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-public-surface-freeze-report.json');
