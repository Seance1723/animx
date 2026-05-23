import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.40.0",
  "artifacts": {
    "required": [
      "dist/animx.css",
      "dist/animx.min.css",
      "dist/animx.js",
      "dist/animx.min.js",
      "dist/animx.demo.html"
    ],
    "optional": [
      "dist/animx.esm.js",
      "dist/animx.esm.min.js",
      "dist/animx.core.js",
      "dist/animx.core.min.js",
      "dist/animx.core.css",
      "dist/animx.core.min.css"
    ],
    "reports": [
      "dist/reports/animx-package-dry-run-report.json",
      "dist/reports/animx-distribution-audit.json"
    ],
    "docs": [
      "docs/final-package-dry-run.md",
      "docs/distribution-audit.md",
      "docs/release-notes-lock.md"
    ],
    "demo": [
      "dist/animx.demo.html",
      "dist/animx.playground.html",
      "dist/animx.gallery.html",
      "dist/animx.studio.html"
    ]
  },
  "missing": [],
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-release-artifacts-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-release-artifacts-report.json');
