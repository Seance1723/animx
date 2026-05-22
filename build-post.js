import fs from 'fs';
import path from 'path';
import { minify } from 'terser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const distDir = path.resolve(__dirname, 'dist');
  
  // 1. Minify JS
  const jsPath = path.join(distDir, 'animx.js');
  const minJsPath = path.join(distDir, 'animx.min.js');
  
  if (fs.existsSync(jsPath)) {
    const code = fs.readFileSync(jsPath, 'utf8');
    const result = await minify(code);
    fs.writeFileSync(minJsPath, result.code);
    console.log('Generated animx.min.js');
  }

  // 2. Minify CSS (using a simple regex based minifier or sass compress since we don't have cssnano installed)
  // Actually, we can just remove whitespace since it's zero-dependency.
  const cssPath = path.join(distDir, 'animx.css');
  const minCssPath = path.join(distDir, 'animx.min.css');
  
  if (fs.existsSync(cssPath)) {
    let cssCode = fs.readFileSync(cssPath, 'utf8');
    // Basic CSS minification
    cssCode = cssCode.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
    cssCode = cssCode.replace(/\s+/g, ' '); // Collapse whitespace
    cssCode = cssCode.replace(/\s*([{}:;,])\s*/g, '$1'); // Remove space around separators
    cssCode = cssCode.replace(/;}/g, '}'); // Remove trailing semicolon
    fs.writeFileSync(minCssPath, cssCode.trim());
    console.log('Generated animx.min.css');
  }

  // 3. Copy HTML Pages
  const pages = ['index.html', 'gallery.html', 'examples.html', 'docs.html', 'playground.html'];
  pages.forEach(page => {
    const srcPath = path.resolve(__dirname, `demo/${page}`);
    const destName = page === 'index.html' ? 'animx.demo.html' : `animx.${page}`;
    const destPath = path.join(distDir, destName);
    
    if (fs.existsSync(srcPath)) {
      let html = fs.readFileSync(srcPath, 'utf8');
      html = html.replace(/\/src\/scss\/animx\.scss/g, 'animx.css');
      html = html.replace(/<script type="module" src="\/src\/js\/animx\.js"><\/script>/g, '<script src="animx.js"></script>');
      html = html.replace(/<link rel="stylesheet" href="\.\.\/dist\/animx\.min\.css">/g, '<link rel="stylesheet" href="animx.css">');
      html = html.replace(/<script src="\.\.\/dist\/animx\.min\.js"><\/script>/g, '<script src="animx.js"></script>');
      fs.writeFileSync(destPath, html);
      console.log(`Generated ${destName}`);
    }
  });

  // 4. Generate animx.version.json
  const versionJsonPath = path.join(distDir, 'animx.version.json');
  const versionJson = {
    name: 'AnimX',
    version: '2.2.0',
    release: 'Playground and Live Builder Upgrade',
    dependency: 'zero-runtime-dependency'
  };
  fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 2));
  console.log('Generated animx.version.json');

  // 5. Generate animx.preset-data.json
  try {
    const presetDataPath = path.join(distDir, 'animx.preset-data.json');
    await import('./tests/setup.js');
    const AnimX = (await import('./src/js/animx.js')).default;
    
    const presets = AnimX.getPresets();
    const categories = AnimX.getPresetCategories();
    
    const presetData = {
      version: '2.1.0',
      total: presets.length,
      categories: categories,
      presets: presets
    };
    
    fs.writeFileSync(presetDataPath, JSON.stringify(presetData, null, 2));
    console.log('Generated animx.preset-data.json');
  } catch (err) {
    console.error('Failed to generate preset data:', err);
  }
}

run().catch(console.error);
