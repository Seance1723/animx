const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'package.json',
  'src/js/animx.js',
  'src/js/core/devtools.js',
  'src/js/core/inspector.js',
  'tests/generate_tests.js',
  'scripts/size-check.js',
  'build-post.js'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('2.8.0')) {
      content = content.replace(/2\.8\.0/g, '2.9.0');
      
      // Update release text in devtools if necessary
      if (file === 'src/js/core/devtools.js') {
        content = content.replace(/Accessibility and Compliance Hardening/g, 'Security and Defensive Runtime Hardening');
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Updated version in ${file}`);
    }
  }
});
