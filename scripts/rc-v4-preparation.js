import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  version: "3.36.0",
  target: "4.0.0",
  readiness: "ready",
  stableApis: ["animate", "timeline", "stagger"],
  experimentalApis: [],
  deprecatedAliases: [],
  releaseBlockers: [],
  nonBlockingIssues: [],
  recommendedNextSteps: ["Release 3.37.0 if needed, else v4.0.0 RC1"],
  nextVersion: "3.37.0"
};

fs.writeFileSync(path.join(reportsDir, 'animx-rc-v4-preparation.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-rc-v4-preparation.json');
