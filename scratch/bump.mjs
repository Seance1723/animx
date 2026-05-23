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
  'src/js/core/devtools.js',
  'src/js/creative/creative-catalog.js',
  'src/js/studio/studio-delivery.js',
  'src/js/studio/studio-dom-scanner.js',
  'src/js/studio/studio-handoff.js',
  'src/js/studio/studio-package-builder.js',
  'src/js/studio/studio-project-state.js',
  'src/js/studio/studio-projects.js',
  'src/js/studio/studio-qa-runner.js',
  'src/js/studio/studio-preset-pack-manager.js',
  'src/js/studio/studio-recipe-library.js',
  'src/js/studio/studio-custom-preset-builder.js',
  'tests/core.test.js',
  'tests/dx.test.js',
  'tests/smoke.test.js',
  'tests/studio.test.js'
];

files.forEach(f => {
  const p = path.resolve(__dirname, '../', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/3\.8\.0/g, '3.9.0');
    content = content.replace(/Studio Local Preset Pack Manager and Custom Recipe Library/g, 'Studio Advanced Timeline Scene Builder');
    fs.writeFileSync(p, content);
    console.log('Bumped', f);
  } else {
    console.warn('Not found', p);
  }
});
