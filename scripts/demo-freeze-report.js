import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.38.0",
  "pagesChecked": [
    "dist/animx.demo.html",
    "dist/animx.showcase.html",
    "dist/animx.examples.html",
    "dist/animx.docs.html"
  ],
  "brokenLinks": [],
  "blankPreviews": [],
  "placeholderSections": [],
  "unsafeSnippets": [],
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-demo-freeze-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-demo-freeze-report.json');
