import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  version: "3.37.0",
  status: "ok",
  report: "known-issues-update",
  timestamp: new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-known-issues-update.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-known-issues-update.json');
