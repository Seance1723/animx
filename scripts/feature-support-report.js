import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

export function generateFeatureSupportReport() {
  const reportPath = path.join(distDir, 'reports', 'animx-feature-support-report.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  const report = {
    version: "3.32.0",
    features: [
      {
        name: "IntersectionObserver",
        requiredBy: ["scroll trigger"],
        fallback: "immediate execution",
        critical: false
      },
      {
        name: "Web Animations API",
        requiredBy: ["JS object animations"],
        fallback: "requestAnimationFrame / CSS",
        critical: false
      },
      {
        name: "CSS clip-path",
        requiredBy: ["mask presets"],
        fallback: "fade equivalents",
        critical: false
      }
    ]
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('Generated animx-feature-support-report.json');
}

if (process.argv[1] === __filename) generateFeatureSupportReport();
