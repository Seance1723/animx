import fs from 'fs';
import path from 'path';

const reportsDir = path.resolve(process.cwd(), 'dist/reports');
if (fs.existsSync(reportsDir)) {
  const files = fs.readdirSync(reportsDir);
  for (const file of files) {
    if (file.endsWith('.json')) {
      const p = path.join(reportsDir, file);
      let content = fs.readFileSync(p, 'utf8');
      content = content.replace(/"version": "3\.40\.0"/g, '"version": "3.41.0"');
      fs.writeFileSync(p, content, 'utf8');
    }
  }
}
console.log('Done JSONs');
