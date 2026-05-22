const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, '../src/js'), (filePath) => {
  if (filePath.endsWith('.js')) {
    let code = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    if (code.includes('../core/reduced-motion.js')) {
      code = code.replace(/\.\.\/core\/reduced-motion\.js/g, '../accessibility/accessibility-state.js');
      modified = true;
    }
    if (code.includes('./core/reduced-motion.js')) {
      code = code.replace(/\.\/core\/reduced-motion\.js/g, './accessibility/accessibility-state.js');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, code);
      console.log('Fixed imports in', filePath);
    }
  }
});
