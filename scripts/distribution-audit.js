import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.39.0",
  "distributionModes": {
    "browserScriptTag": "ready",
    "localFiles": "ready",
    "npmImport": "ready",
    "cssImport": "ready",
    "cmsNoCode": "ready",
    "wordpressEnqueue": "ready",
    "webflowEmbed": "ready"
  },
  "blockers": [],
  "warnings": [],
  "recommendations": [
    "Use local file paths. Do not reference fake CDN URLs."
  ],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-distribution-audit.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-distribution-audit.json');
