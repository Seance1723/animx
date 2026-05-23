import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

export function generateBundleHealth() {
  const reportPath = path.join(distDir, 'reports', 'animx-build-health.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  const report = {
    version: "3.31.0",
    generatedAt: new Date().toISOString(),
    status: "ok",
    warnings: [],
    checks: {
      hasCoreJs: fs.existsSync(path.join(distDir, 'animx.min.js')),
      hasCoreCss: fs.existsSync(path.join(distDir, 'animx.min.css')),
      hasEsmJs: fs.existsSync(path.join(distDir, 'animx.esm.min.js')),
      hasDemoHtml: fs.existsSync(path.join(distDir, 'animx.demo.html'))
    }
  };

  if (!report.checks.hasCoreJs) {
    report.warnings.push("Missing core animx.min.js bundle");
    report.status = "warning";
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('Generated animx-build-health.json');
}

if (process.argv[1] === __filename) generateBundleHealth();
