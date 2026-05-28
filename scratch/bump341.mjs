import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'package.json',
  'src/js/animx.js',
  'src/js/core/devtools.js',
  'src/js/hardening/hardening-api.js',
  'README.md'
];

for (const file of filesToUpdate) {
  const p = path.resolve(process.cwd(), file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/3\.40\.0/g, '3.41.0');
    content = content.replace(/Final Stable Release Sign-Off and v4.0.0 Launch Readiness Gate/g, 'Demo Website UX Rebuild, React Mini-Site, Journey Landing, Playground Builder, and Documentation Portal');
    fs.writeFileSync(p, content, 'utf8');
    console.log('Bumped ' + file);
  }
}
