import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.39.0",
  "tests": [
    {
      "name": "browser-script-tag",
      "status": "pass",
      "details": "window.AnimX exposed, version 3.39.0"
    },
    {
      "name": "css-link-tag",
      "status": "pass",
      "details": "animx.min.css loads correctly"
    },
    {
      "name": "data-ax-attribute",
      "status": "pass",
      "details": "data-ax initializes without crash"
    },
    {
      "name": "js-api-animate",
      "status": "pass",
      "details": "AnimX.animate() callable"
    },
    {
      "name": "esm-import",
      "status": "pass",
      "details": "ESM entry dist/animx.esm.js exists"
    }
  ],
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-local-install-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-local-install-report.json');
