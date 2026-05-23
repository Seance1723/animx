import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const auditData = {
  version: "3.33.0",
  summary: {
    docsFiles: 0,
    apiDocumented: 0,
    apiMissing: [],
    presetsDocumented: 0,
    brokenLinks: 0,
    snippetsChecked: 0,
    warnings: 0
  },
  sections: {},
  missing: [],
  warnings: [],
  recommendations: []
};

fs.writeFileSync(path.join(reportsDir, 'animx-docs-audit.json'), JSON.stringify(auditData, null, 2));
console.log('Generated animx-docs-audit.json');
