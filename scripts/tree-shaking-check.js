import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

export function generateTreeShakingReport() {
  const reportPath = path.join(distDir, 'reports', 'animx-tree-shaking-report.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  // Load package.json
  const pkgPath = path.join(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  const report = {
    version: "3.31.0",
    generatedAt: new Date().toISOString(),
    esmEntry: !!pkg.exports?.['.']?.import,
    coreEntry: !!pkg.exports?.['./core']?.import,
    sideEffects: pkg.sideEffects || [],
    issues: [],
    recommendations: []
  };

  if (!report.esmEntry) report.issues.push("Missing main ESM export.");
  if (report.sideEffects.length === 0) report.issues.push("No sideEffects array. Entire package might be marked as side-effectful by bundlers.");

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('Generated animx-tree-shaking-report.json');
}

if (process.argv[1] === __filename) generateTreeShakingReport();
