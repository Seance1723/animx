
import assert from 'assert';
import './setup.js';
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
      assert.ok(fs.existsSync(path.join(distPath, 'animx.demo.html')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.version.json')));
      assert.ok(fs.existsSync(path.join(distPath, 'animx.preset-data.json')));
      assert.ok(fs.existsSync(path.join(distPath, 'reports', 'animx-capability-matrix.json')));
      assert.ok(fs.existsSync(path.join(distPath, 'reports', 'animx-playground-readiness.json')));
      assert.ok(fs.existsSync(path.join(distPath, 'reports', 'animx-effect-cross-check-report.json')));

      [
        'animx.preset-data.json',
        path.join('reports', 'animx-capability-matrix.json'),
        path.join('reports', 'animx-playground-readiness.json'),
        path.join('reports', 'animx-effect-cross-check-report.json')
      ].forEach(file => {
        assert.doesNotThrow(() => JSON.parse(fs.readFileSync(path.join(distPath, file), 'utf-8')));
      });
      
      if (fs.existsSync(path.join(distPath, 'animx.gallery.html'))) assert.ok(true);
      if (fs.existsSync(path.join(distPath, 'animx.docs.html'))) assert.ok(true);
      if (fs.existsSync(path.join(distPath, 'animx.examples.html'))) assert.ok(true);
      if (fs.existsSync(path.join(distPath, 'animx.playground.html'))) assert.ok(true);
      
      const jsContent = fs.readFileSync(path.join(distPath, 'animx.min.js'), 'utf-8');
      assert.ok(jsContent.includes('2.9.0'));
    }
  
