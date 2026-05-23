const fs = require('fs');
const path = require('path');

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
  'tests/core.test.js',
  'tests/dx.test.js',
  'tests/smoke.test.js',
  'tests/studio.test.js'
];

files.forEach(f => {
  const p = path.resolve(__dirname, '../', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/3\.7\.0/g, '3.8.0');
    content = content.replace(/Studio Handoff Documentation and Client Delivery Kits/g, 'Studio Local Preset Pack Manager and Custom Recipe Library');
    fs.writeFileSync(p, content);
    console.log('Bumped', f);
  } else {
    console.warn('Not found', p);
  }
});
