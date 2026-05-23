import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

const industryData = {
  version: "3.34.0",
  industryPages: [
    {
      name: "SaaS",
      status: "ready",
      sections: [],
      missing: [],
      warnings: []
    }
  ]
};

fs.writeFileSync(path.join(reportsDir, 'animx-industry-demo-audit.json'), JSON.stringify(industryData, null, 2));
console.log('Generated animx-industry-demo-audit.json');
