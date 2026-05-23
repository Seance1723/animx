import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

export function generateSizeReport() {
  const reportPath = path.join(distDir, 'reports', 'animx-size-report.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  const filesToMeasure = [
    'animx.js', 'animx.min.js', 'animx.esm.js', 'animx.esm.min.js',
    'animx.css', 'animx.min.css',
    'animx.core.js', 'animx.core.min.js'
  ];

  const report = {
    version: "3.32.0",
    generatedAt: new Date().toISOString(),
    files: [],
    summary: { totalBytes: 0, jsBytes: 0, cssBytes: 0 }
  };

  for (const file of filesToMeasure) {
    const filePath = path.join(distDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const kb = +(stats.size / 1024).toFixed(2);
      let status = "ok";
      
      // Basic size budgets
      if (file.endsWith('.js') && kb > 150) status = "warning";
      if (file.endsWith('.css') && kb > 50) status = "warning";

      report.files.push({ file, bytes: stats.size, kb, status });
      report.summary.totalBytes += stats.size;
      if (file.endsWith('.js')) report.summary.jsBytes += stats.size;
      if (file.endsWith('.css')) report.summary.cssBytes += stats.size;
    }
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('Generated animx-size-report.json');
}

if (process.argv[1] === __filename) generateSizeReport();
