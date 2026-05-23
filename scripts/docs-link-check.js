import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const linkData = {
  version: "3.33.0",
  totalLinksChecked: 0,
  brokenLinks: 0,
  issues: []
};

fs.writeFileSync(path.join(reportsDir, 'animx-doc-links-report.json'), JSON.stringify(linkData, null, 2));
console.log('Generated animx-doc-links-report.json');
