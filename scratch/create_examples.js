import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AnimX v2.1.0 - Examples</title>
  <link rel="stylesheet" href="../dist/animx.min.css">
  <style>
    :root {
      --bg: #0f172a; --text: #f8fafc; --primary: #6366f1; --primary-hover: #4f46e5;
      --card: #1e293b; --border: #334155; --text-muted: #94a3b8;
    }
    body {
      margin: 0; font-family: system-ui, sans-serif;
      background-color: var(--bg); color: var(--text);
    }
    .container { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }
    header { text-align: center; margin-bottom: 40px; }
    h1 { color: #818cf8; margin-bottom: 10px; font-size: 3rem; }
    .nav-links { margin-bottom: 30px; display: flex; justify-content: center; gap: 20px; }
    .nav-links a { color: #818cf8; text-decoration: none; font-weight: bold; }
    
    .example-section { margin-bottom: 60px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
    .example-header { padding: 20px; background: #1e1b4b; border-bottom: 1px solid #4f46e5; }
    .example-header h2 { margin: 0 0 10px 0; color: #e2e8f0; }
    .example-header p { margin: 0; color: var(--text-muted); }
    
    .example-preview { padding: 40px 20px; display: flex; justify-content: center; align-items: center; min-height: 150px; background: var(--bg); border-bottom: 1px solid var(--border); position: relative; }
    .example-code { padding: 20px; background: #020617; }
    pre { margin: 0; color: #a5b4fc; font-family: monospace; font-size: 0.9rem; overflow-x: auto; }
    
    .btn-replay { position: absolute; top: 10px; right: 10px; background: #334155; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
    .btn-replay:hover { background: var(--primary); }
    
    .box { background: var(--primary); color: white; padding: 20px; border-radius: 8px; font-weight: bold; min-width: 100px; text-align: center; margin: 10px; }
    .stagger-grid { display: flex; gap: 10px; }
    .stagger-box { width: 40px; height: 40px; background: #c084fc; border-radius: 4px; }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>Copy-Paste Examples</h1>
      <p style="color: var(--text-muted);">Practical real-world usage recipes for AnimX.</p>
      <div class="nav-links">
        <a href="index.html">← Home</a>
        <a href="gallery.html">Preset Gallery</a>
        <a href="docs.html">Documentation</a>
      </div>
    </header>

    <div class="example-section">
      <div class="example-header">
        <h2>1. Basic Scroll Reveal</h2>
        <p>Reveal an element when it scrolls into view using data attributes.</p>
      </div>
      <div class="example-preview">
        <div class="box" data-ax-scroll="fade-up" id="ex1">Scroll Target</div>
        <button class="btn-replay" onclick="AnimX.replay('#ex1')">Replay</button>
      </div>
      <div class="example-code">
<pre><code>&lt;div data-ax-scroll="fade-up" data-ax-duration="800"&gt;
  I will fade up when scrolled into view.
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <div class="example-section">
      <div class="example-header">
        <h2>2. Stagger Grid</h2>
        <p>Stagger multiple children beautifully.</p>
      </div>
      <div class="example-preview" style="flex-direction: column;">
        <div class="stagger-grid" id="stagger-container">
          <div class="stagger-box stag-item"></div><div class="stagger-box stag-item"></div><div class="stagger-box stag-item"></div>
          <div class="stagger-box stag-item"></div><div class="stagger-box stag-item"></div>
        </div>
        <button class="btn-replay" onclick="AnimX.stagger('.stag-item', 'zoom-in', { stagger: 50, direction: 'center' })">Replay</button>
      </div>
      <div class="example-code">
<pre><code>AnimX.stagger('.stag-item', 'zoom-in', { 
  stagger: 50, 
  direction: 'center', 
  duration: 400 
});</code></pre>
      </div>
    </div>

    <div class="example-section">
      <div class="example-header">
        <h2>3. Hero Timeline</h2>
        <p>Chain sequences together.</p>
      </div>
      <div class="example-preview" style="flex-direction: column; gap: 10px;">
        <h3 class="tl-target" style="margin:0;">Hero Title</h3>
        <p class="tl-target" style="margin:0;">Hero subtitle goes here</p>
        <button class="tl-target" style="padding: 10px; background: #818cf8; border: none; border-radius: 4px; color: white;">Get Started</button>
        <button class="btn-replay" onclick="playHeroTL()">Replay</button>
      </div>
      <div class="example-code">
<pre><code>const tl = AnimX.timeline();
tl.add(targets[0], 'text-rise')
  .add(targets[1], 'fade-up', {}, '-=200') // Overlap
  .add(targets[2], 'zoom-in', {}, '-=100')
  .play();</code></pre>
      </div>
    </div>

    <div class="example-section">
      <div class="example-header">
        <h2>4. Interactive Card</h2>
        <p>Magnetic and hover lift interactions.</p>
      </div>
      <div class="example-preview">
        <div class="box" id="int-card" style="width: 200px; height: 150px;">Hover Me</div>
      </div>
      <div class="example-code">
<pre><code>AnimX.hover('#int-card', 'ax-button-lift');
AnimX.magnetic('#int-card');</code></pre>
      </div>
    </div>

    <div class="example-section">
      <div class="example-header">
        <h2>5. Text Scramble</h2>
        <p>Scramble decode text accessibly.</p>
      </div>
      <div class="example-preview">
        <h2 id="scramble-target">ACCESS GRANTED</h2>
        <button class="btn-replay" onclick="AnimX.text('#scramble-target', { type: 'scramble', animation: 'decode' })">Replay</button>
      </div>
      <div class="example-code">
<pre><code>AnimX.text('#scramble-target', { 
  type: 'scramble', 
  animation: 'decode',
  duration: 1000
});</code></pre>
      </div>
    </div>

  </div>

  <script src="../dist/animx.min.js"></script>
  <script>
    function playHeroTL() {
      const targets = document.querySelectorAll('.tl-target');
      AnimX.timeline()
        .add(targets[0], 'text-rise')
        .add(targets[1], 'fade-up', {}, '-=200')
        .add(targets[2], 'zoom-in', {}, '-=100')
        .play();
    }
    
    document.addEventListener('DOMContentLoaded', () => {
      AnimX.stagger('.stag-item', 'zoom-in', { stagger: 50, direction: 'center' });
      playHeroTL();
      AnimX.hover('#int-card', 'ax-button-lift');
      AnimX.magnetic('#int-card');
      AnimX.text('#scramble-target', { type: 'scramble', animation: 'decode' });
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '../demo/examples.html'), html);
console.log('demo/examples.html created');
