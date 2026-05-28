import fs from 'fs';
import path from 'path';

const testDir = path.resolve(process.cwd(), 'tests');
const files = fs.readdirSync(testDir);

for (const file of files) {
  if (file.endsWith('.test.js')) {
    const p = path.join(testDir, file);
    let content = fs.readFileSync(p, 'utf8');
    let modified = false;

    if (content.includes('3.40.0')) {
      content = content.replace(/3\.40\.0/g, '3.41.0');
      modified = true;
    }
    if (content.includes('Final Stable Release Sign-Off and v4.0.0 Launch Readiness Gate')) {
      content = content.replace(/Final Stable Release Sign-Off and v4.0.0 Launch Readiness Gate/g, 'Demo Website UX Rebuild, React Mini-Site, Journey Landing, Playground Builder, and Documentation Portal');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(p, content, 'utf8');
      console.log('Bumped ' + file);
    }
  }
}
console.log('Done bumping tests.');
