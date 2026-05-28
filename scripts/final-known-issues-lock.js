import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const reportData = {
  "version": "3.40.0",
  "issues": [
    {
      "id": "AX-KNOWN-002",
      "severity": "low",
      "module": "spatial/3D",
      "summary": "Safari 3D perspective sub-pixel shifts",
      "workaround": "Use wrapper element for perspective",
      "targetFix": "post-v4.0.0",
      "blocker": false
    }
  ],
  "releaseBlockers": [],
  "nonBlockingIssues": [
    "AX-KNOWN-002"
  ],
  "deferredIssues": [
    "AX-KNOWN-002"
  ],
  "status": "ready",
  "generatedAt": new Date().toISOString()
};

fs.writeFileSync(path.join(reportsDir, 'animx-final-known-issues-lock.json'), JSON.stringify(reportData, null, 2));
console.log('Generated animx-final-known-issues-lock.json');
