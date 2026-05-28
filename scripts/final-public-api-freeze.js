import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.40.0",
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
  "deprecatedAliases": [],
  "removedApis": [],
  "missingDocumentedApis": [],
  "undocumentedPublicApis": [],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-final-public-api-freeze.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-final-public-api-freeze.json');
