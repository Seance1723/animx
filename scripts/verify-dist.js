import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

export function verifyDist() {
  const reportPath = path.join(distDir, 'reports', 'animx-dist-audit.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  const files = [
    'animx.css', 'animx.min.css',
    'animx.js', 'animx.min.js',
    'animx.demo.html',
    'animx.preset-data.json',
    'reports/animx-capability-matrix.json',
    'reports/animx-playground-readiness.json',
    'reports/animx-text-reveal-pack-report.json',
    'reports/animx-text-split-safety-report.json',
    'reports/animx-text-effect-cross-check-report.json',
    'reports/animx-text-playground-readiness.json'
  ];

  let ok = true;
  const issues = [];

  for (const file of files) {
    const fPath = path.join(distDir, file);
    if (!fs.existsSync(fPath)) {
      ok = false;
      issues.push(`Missing required file: ${file}`);
    } else if (fs.statSync(fPath).size === 0) {
      ok = false;
      issues.push(`Empty file: ${file}`);
    }
  }

  const report = {
    version: "3.42.0",
    generatedAt: new Date().toISOString(),
    status: ok ? "ok" : "failed",
    issues
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('Generated animx-dist-audit.json. Status: ' + report.status);
  
  if (!ok) {
    console.error("Verification failed:", issues);
    process.exit(1);
  }
}

if (process.argv[1] === __filename) verifyDist();
