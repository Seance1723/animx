import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

export function generateBrowserCompatReport() {
  const reportPath = path.join(distDir, 'reports', 'animx-browser-compat-report.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }

  const report = {
    version: "3.32.0",
    generatedAt: new Date().toISOString(),
    supportTiers: {
      tier1: ["Latest Chrome", "Latest Safari", "Latest Firefox"],
      tier2: ["Older Chromium", "iOS Safari 13+"],
      tier3: ["Legacy Browsers (Fallback mode)"]
    },
    features: {
      webAnimations: "Supported (Native)",
      intersectionObserver: "Supported (Native)",
      cssMask: "Supported (Vendor Prefix)"
    },
    knownFallbacks: {
      "missing-waapi": "CSS fallback",
      "missing-intersection-observer": "Immediate Execution (No-Stuck-Hidden)"
    },
    warnings: [],
    recommendations: []
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('Generated animx-browser-compat-report.json');
}

if (process.argv[1] === __filename) generateBrowserCompatReport();
