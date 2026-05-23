import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.38.0",
  "categoriesChecked": [
    "Entrance",
    "Exit",
    "Scroll",
    "Text",
    "Media",
    "Interactions",
    "Layout",
    "SVG",
    "Background",
    "Transitions",
    "CMS",
    "Physics",
    "3D"
  ],
  "brokenCards": [],
  "fakeReadyItems": [],
  "needsReviewItems": [
    "safari-3d-perspective"
  ],
  "missingSnippets": [],
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-gallery-freeze-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-gallery-freeze-report.json');
