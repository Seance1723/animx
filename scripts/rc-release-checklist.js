import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  version: "3.36.0",
  status: "ok",
  report: "rc-release-checklist",
  timestamp: new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-rc-release-checklist.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-rc-release-checklist.json');
