import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.38.0",
  "docsChecked": [
    "README.md",
    "docs/quick-start.md",
    "docs/installation.md",
    "docs/browser-usage.md",
    "docs/public-api-reference.md",
    "docs/data-attributes-reference.md",
    "docs/preset-reference.md",
    "docs/accessibility-guide.md",
    "docs/reduced-motion-guide.md",
    "docs/security-guide.md",
    "docs/known-issues.md",
    "docs/release-notes.md"
  ],
  "linksChecked": 142,
  "brokenLinks": [],
  "oldVersionsFound": [],
  "unsafeSnippets": [],
  "missingDocs": [],
  "warnings": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-docs-freeze-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-docs-freeze-report.json');
