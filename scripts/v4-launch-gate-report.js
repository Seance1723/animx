import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.40.0",
  "target": "4.0.0",
  "launchGate": "ready",
  "canStartV4Preparation": true,
  "canReleaseV4": false,
  "stableApis": [
    "animate",
    "timeline",
    "stagger",
    "scroll",
    "text",
    "packs",
    "cms",
    "composer",
    "stateRules",
    "scrollStory",
    "gestureMotion",
    "layoutMotion",
    "compatReport",
    "versionInfo",
    "destroy"
  ],
  "experimentalApis": [],
  "releaseBlockers": [],
  "nonBlockingIssues": [
    "AX-KNOWN-002"
  ],
  "requiredBeforeV4": [
    "v3.43.0 final launch buffer"
  ],
  "recommendedBeforeV4": [
    "Final demo website UX rebuild"
  ],
  "notes": [
    "v4.0.0 can begin preparation. Do not release v4 until v3.41 launch buffer is complete."
  ],
  "nextVersion": "3.43.0",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-v4-launch-gate-report.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-v4-launch-gate-report.json');
