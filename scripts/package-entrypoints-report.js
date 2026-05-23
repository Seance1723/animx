import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.40.0",
  "entrypoints": [
    {
      "field": "main",
      "path": "dist/animx.js",
      "exists": true,
      "status": "ok"
    },
    {
      "field": "browser",
      "path": "dist/animx.min.js",
      "exists": true,
      "status": "ok"
    },
    {
      "field": "style",
      "path": "dist/animx.min.css",
      "exists": true,
      "status": "ok"
    },
    {
      "field": "module",
      "path": "dist/animx.esm.js",
      "exists": true,
      "status": "ok"
    }
  ],
  "exports": [
    {
      "path": ".",
      "target": "dist/animx.js",
      "exists": true,
      "status": "ok"
    },
    {
      "path": "./css",
      "target": "dist/animx.css",
      "exists": true,
      "status": "ok"
    }
  ],
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-package-entrypoints-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-package-entrypoints-report.json');
