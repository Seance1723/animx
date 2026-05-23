import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  version: "3.37.0",
  status: "ok",
  report: "runtime-patch-report",
  timestamp: new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-runtime-patch-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-runtime-patch-report.json');
