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

  // 3. Copy Demo HTML
  const demoSrc = path.resolve(__dirname, 'demo/index.html');
  const demoDest = path.join(distDir, 'animx.demo.html');
  
  if (fs.existsSync(demoSrc)) {
    // Update paths in demo HTML to work in dist/
    let demoHtml = fs.readFileSync(demoSrc, 'utf8');
    demoHtml = demoHtml.replace(/\.\.\/dist\//g, '');
    fs.writeFileSync(demoDest, demoHtml);
    console.log('Generated animx.demo.html');
  }
}

run().catch(console.error);
