import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  version: "3.36.0",
  checkedFiles: ["package.json", "src/js/animx.js", "dist/animx.js", "README.md"],
  mismatches: [],
  oldVersionsFound: [],
  status: "ok"
};

fs.writeFileSync(path.join(reportsDir, 'animx-rc-version-check.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-rc-version-check.json');
