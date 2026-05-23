import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reportPath = path.resolve(__dirname, '../dist/animx.bundle-report.json');

if (!fs.existsSync(reportPath)) {
  console.error('Bundle report not found. Run `npm run build` first.');
  process.exit(1);
}

const VERSION = '3.19.0';
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

console.log(`\n--- AnimX v${VERSION} Size Report ---`);

const maxFileLen = Math.max(...report.files.map(f => f.file.length));

report.files.forEach(f => {
  console.log(`${f.file.padEnd(maxFileLen + 2)} : ${f.kb.toFixed(2)} kb`);
});

const jsFile = report.files.find(f => f.file === 'animx.min.js');
if (jsFile && jsFile.kb > 250) {
  console.warn('\n⚠️ WARNING: animx.min.js is over 250kb');
}

console.log('---------------------------------');
