
import assert from 'assert';
import AnimX from '../src/js/animx.js';


    import fs from 'fs';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const distPath = path.resolve(__dirname, '../dist');
    if (fs.existsSync(distPath)) {
      assert.ok(fs.existsSync(path.join(distPath, 'animx.css')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.min.css')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.js')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.min.js')));
      
      const jsContent = fs.readFileSync(path.join(distPath, 'animx.min.js'), 'utf-8');
      assert.ok(jsContent.includes('1.8.0'));
    }
  
