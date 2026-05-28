import fs from 'fs';
import path from 'path';
import { minify } from 'terser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const distDir = path.resolve(__dirname, 'dist');
  
  // 1. Minify JS & CSS for all builds
  const builds = ['animx', 'animx.core'];
  const reportFiles = [];

  for (const base of builds) {
    // JS
    const jsPath = path.join(distDir, `${base}.js`);
    const minJsPath = path.join(distDir, `${base}.min.js`);
    if (fs.existsSync(jsPath)) {
      const code = fs.readFileSync(jsPath, 'utf8');
      const result = await minify(code);
      fs.writeFileSync(minJsPath, result.code);
      console.log(`Generated ${base}.min.js`);
      
      reportFiles.push({
        file: `${base}.min.js`,
        bytes: Buffer.byteLength(result.code, 'utf8'),
        kb: +(Buffer.byteLength(result.code, 'utf8') / 1024).toFixed(2)
      });
    }

    // ESM JS
    const esmPath = path.join(distDir, `${base}.esm.js`);
    const minEsmPath = path.join(distDir, `${base}.esm.min.js`);
    if (fs.existsSync(esmPath)) {
      const code = fs.readFileSync(esmPath, 'utf8');
      const result = await minify(code, { module: true });
      fs.writeFileSync(minEsmPath, result.code);
      console.log(`Generated ${base}.esm.min.js`);
      
      reportFiles.push({
        file: `${base}.esm.min.js`,
        bytes: Buffer.byteLength(result.code, 'utf8'),
        kb: +(Buffer.byteLength(result.code, 'utf8') / 1024).toFixed(2)
      });
    }

    // CSS
    const cssPath = path.join(distDir, `${base}.css`);
    const minCssPath = path.join(distDir, `${base}.min.css`);
    if (fs.existsSync(cssPath)) {
      let cssCode = fs.readFileSync(cssPath, 'utf8');
      cssCode = cssCode.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
      cssCode = cssCode.replace(/\s+/g, ' '); // Collapse whitespace
      cssCode = cssCode.replace(/\s*([{}:;,])\s*/g, '$1'); // Remove space around separators
      cssCode = cssCode.replace(/;}/g, '}'); // Remove trailing semicolon
      const finalCss = cssCode.trim();
      fs.writeFileSync(minCssPath, finalCss);
      console.log(`Generated ${base}.min.css`);
      
      reportFiles.push({
        file: `${base}.min.css`,
        bytes: Buffer.byteLength(finalCss, 'utf8'),
        kb: +(Buffer.byteLength(finalCss, 'utf8') / 1024).toFixed(2)
      });
    }
  }

  // 3. Copy HTML Pages
  const pages = ['index.html', 'gallery.html', 'examples.html', 'docs.html', 'playground.html', 'studio.html'];
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
      html = html.replace(/\/src\/scss\/studio\/animx-studio\.scss/g, 'studio/animx-studio.css');
      html = html.replace(/<script type="module" src="\/src\/js\/studio\/studio-core\.js"><\/script>/g, '<script src="studio/animx-studio.js"></script>');
      fs.writeFileSync(destPath, html);
      console.log(`Generated ${destName}`);
    }
  });

  // 4. Generate animx.version.json
  const versionJsonPath = path.join(distDir, 'animx.version.json');
  const versionJson = {
    name: 'AnimX',
    version: '3.41.0',
    release: 'Animation Registry Rebuild, Capability Matrix, and Playground-Ready Metadata Foundation',
    dependency: 'zero-runtime-dependency',
    defaultFiles: {
      css: 'animx.min.css',
      js: 'animx.min.js'
    }
  };
  fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 2));
  console.log('Generated animx.version.json');

  // 5. Generate registry reports and animx.preset-data.json
  try {
    const reportsDir = path.join(distDir, 'reports');
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

    const presetDataPath = path.join(distDir, 'animx.preset-data.json');
    await import('./tests/setup.js');
    const AnimX = (await import('./src/js/animx.js')).default;
    const {
      buildPlaygroundReadinessReport,
      buildEffectCrossCheckReport,
      buildPresetData
    } = await import('./src/js/registry/registry-report.js');
    
    const generatedAt = new Date().toISOString();
    const registry = AnimX.getRegistry();
    const effects = registry.effects;
    const capabilityMatrix = AnimX.getCapabilityMatrix();
    capabilityMatrix.generatedAt = generatedAt;
    const playgroundReport = buildPlaygroundReadinessReport(effects);
    const crossCheckReport = buildEffectCrossCheckReport(effects);
    const validationReport = AnimX.validateRegistry();
    const searchReport = {
      version: '3.41.0',
      generatedAt,
      samples: {
        mask: AnimX.searchEffects('mask').map(effect => effect.id),
        text: AnimX.getEffectsByElement('text').map(effect => effect.id),
        ready: AnimX.getEffectsByStatus('ready').map(effect => effect.id)
      }
    };
    const graphifyReport = {
      version: '3.41.0',
      generatedAt,
      graphifyFound: fs.existsSync(path.resolve(__dirname, 'graphify-out', 'graph.json')),
      graphifyRoot: fs.existsSync(path.resolve(__dirname, 'graphify-out', '.graphify_root'))
        ? fs.readFileSync(path.resolve(__dirname, 'graphify-out', '.graphify_root'), 'utf8').trim()
        : null
    };
    
    const presetData = buildPresetData(effects, generatedAt);
    
    fs.writeFileSync(presetDataPath, JSON.stringify(presetData, null, 2));
    fs.writeFileSync(path.join(reportsDir, 'animx-capability-matrix.json'), JSON.stringify(capabilityMatrix, null, 2));
    fs.writeFileSync(path.join(reportsDir, 'animx-playground-readiness.json'), JSON.stringify(playgroundReport, null, 2));
    fs.writeFileSync(path.join(reportsDir, 'animx-effect-cross-check-report.json'), JSON.stringify(crossCheckReport, null, 2));
    fs.writeFileSync(path.join(reportsDir, 'animx-registry-validation-report.json'), JSON.stringify(validationReport, null, 2));
    fs.writeFileSync(path.join(reportsDir, 'animx-registry-search-report.json'), JSON.stringify(searchReport, null, 2));
    fs.writeFileSync(path.join(reportsDir, 'animx-graphify-review-report.json'), JSON.stringify(graphifyReport, null, 2));
    console.log('Generated animx.preset-data.json');
    console.log('Generated registry reports');
  } catch (err) {
    console.error('Failed to generate registry reports:', err);
  }

  // 6. Build Adapters
  const adaptersDir = path.resolve(__dirname, 'src/js/adapters');
  const distAdaptersDir = path.join(distDir, 'adapters');
  
  if (fs.existsSync(adaptersDir)) {
    if (!fs.existsSync(distAdaptersDir)) {
      fs.mkdirSync(distAdaptersDir, { recursive: true });
    }
    
    const adapters = ['jquery-adapter.js', 'wordpress-adapter.js', 'webflow-adapter.js', 'alpine-adapter.js'];
    
    for (const file of adapters) {
      const src = path.join(adaptersDir, file);
      if (fs.existsSync(src)) {
        const destName = file.replace('-adapter.js', '.js'); // e.g. animx.jquery.js
        const outFileName = `animx.${destName}`;
        const destJS = path.join(distAdaptersDir, outFileName);
        const destMinJS = path.join(distAdaptersDir, outFileName.replace('.js', '.min.js'));
        
        const code = fs.readFileSync(src, 'utf8');
        fs.writeFileSync(destJS, code);
        
        const minified = await minify(code);
        fs.writeFileSync(destMinJS, minified.code);
        
        reportFiles.push({
          file: `adapters/${outFileName.replace('.js', '.min.js')}`,
          bytes: Buffer.byteLength(minified.code, 'utf8'),
          kb: +(Buffer.byteLength(minified.code, 'utf8') / 1024).toFixed(2)
        });
        
        console.log(`Generated ${outFileName} and ${outFileName.replace('.js', '.min.js')}`);
      }
    }
  }

  // 7. Generate Bundle Report
  const bundleReportPath = path.join(distDir, 'animx.bundle-report.json');
  const bundleReport = {
    name: "AnimX",
    version: "3.41.0",
    generatedAt: new Date().toISOString(),
    files: reportFiles,
    builds: {
      "default": ["animx.css", "animx.js"],
      "minified": ["animx.min.css", "animx.min.js"],
      "core": ["animx.core.min.css", "animx.core.min.js"],
      "full": ["animx.full.min.css", "animx.full.min.js"]
    },
    dependency: "zero-runtime-dependency"
  };
  fs.writeFileSync(bundleReportPath, JSON.stringify(bundleReport, null, 2));
  console.log('Generated animx.bundle-report.json');
}

run().catch(console.error);
