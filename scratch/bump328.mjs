import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'package.json',
  'scripts/size-check.js',
  'build-post.js',
  'src/js/animx.js',
  'demo/studio.html',
  'demo/index.html',
  'demo/playground.html',
  'tests/core.test.js',
  'tests/smoke.test.js'
];

files.forEach(f => {
  const p = path.resolve(__dirname, '../', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/3\.27\.0/g, '3.28.0');
    content = content.replace(/Advanced Page Transitions, Section Transitions, and Route Motion Packs/g, 'Advanced CMS, WordPress, Webflow, and No-Code Animation Recipes');
    fs.writeFileSync(p, content);
    console.log('Bumped', f);
  } else {
    console.warn('Not found', p);
  }
});
