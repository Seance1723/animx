const fs = require('fs');

let html = fs.readFileSync('demo/index.html', 'utf8');

// Update Version
html = html.replace(/AnimX v2\.\d\.\d.*?<\/title>/, 'AnimX v2.5.0 - Advanced SVG Morphing</title>');
html = html.replace(/AnimX v2\.\d\.\d/, 'AnimX v2.5.0');
html = html.replace(/<div class="subtitle">.*?<\/div>/s, '<div class="subtitle">Advanced SVG Morphing release introducing zero-dependency compatible path interpolation.</div>');

const morphHtml = `
  <section id="svg-morph">
    <h2>Advanced SVG Morphing</h2>
    <div class="section-desc">AnimX v2.5.0 adds high-performance path interpolation using native requestAnimationFrame, avoiding massive external geometry libraries. Note: reduced motion safely drops back to instant switching.</div>
    
    <h3>1. Basic Path Morph</h3>
    <div class="demo-area" style="text-align: center; padding: 20px; background: #0f172a; border-radius: 8px;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path id="basic-morph-path" fill="#6366f1" d="M10 10 L90 10 L90 90 L10 90 Z" />
      </svg>
      <br>
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="AnimX.svgMorph('#basic-morph-path', { to: 'M50 10 C80 10 90 40 90 50 C90 80 60 90 50 90 C20 90 10 60 10 50 C10 20 40 10 50 10 Z', duration: 700 })">Morph to Blob</button>
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="AnimX.svgMorph('#basic-morph-path', { to: 'M10 10 L90 10 L90 90 L10 90 Z', duration: 700 })">Morph to Square</button>
    </div>

    <br>
    <h3>2. Shape Morph (Circle to Rect)</h3>
    <div class="demo-area" style="text-align: center; padding: 20px; background: #0f172a; border-radius: 8px;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path id="shape-morph" fill="#c084fc" d="M50,10 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0" />
      </svg>
      <br>
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="AnimX.morphShape('#shape-morph', '#hidden-rect', { duration: 600 })">Morph to Rect</button>
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="AnimX.morphShape('#shape-morph', '#hidden-circle', { duration: 600 })">Morph to Circle</button>
      <svg style="display:none;"><rect id="hidden-rect" x="10" y="10" width="80" height="80" /><circle id="hidden-circle" cx="50" cy="50" r="40" /></svg>
    </div>

    <br>
    <h3>3. Icon Morph Presets</h3>
    <div class="grid" style="text-align: center;">
      <div class="card" onclick="this.toggle = !this.toggle; AnimX.morphIcon(this.querySelector('svg'), { icon: this.toggle ? 'menu-close' : 'close-menu' })" style="cursor: pointer;">
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M2 5 L22 5 M2 12 L22 12 M2 19 L22 19" /></svg>
        <p>Menu / Close</p>
      </div>
      <div class="card" onclick="this.toggle = !this.toggle; AnimX.morphIcon(this.querySelector('svg'), { icon: this.toggle ? 'plus-minus' : 'minus-plus' })" style="cursor: pointer;">
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2 L12 22 M2 12 L22 12" /></svg>
        <p>Plus / Minus</p>
      </div>
      <div class="card" onclick="this.toggle = !this.toggle; AnimX.morphIcon(this.querySelector('svg'), { icon: this.toggle ? 'play-pause' : 'pause-play' })" style="cursor: pointer;">
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M5 4 L19 12 L19 12 L5 20 M5 4 L5 20 L5 20 L5 20" /></svg>
        <p>Play / Pause</p>
      </div>
    </div>

    <br>
    <h3>4. Scroll-Triggered Morph</h3>
    <div class="demo-area" style="text-align: center; padding: 50px 20px; background: #1e293b; border-radius: 8px;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path data-ax-svg-morph="M50 10 L90 50 L50 90 L10 50 Z" data-ax-on="scroll" fill="#10b981" d="M10 10 L90 10 L90 90 L10 90 Z" />
      </svg>
      <p>Scroll up/down past here</p>
    </div>

    <br>
    <h3>5. Timeline Morph</h3>
    <div class="demo-area" style="text-align: center; padding: 20px; background: #0f172a; border-radius: 8px;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path id="tl-morph" fill="#f59e0b" d="M10 10 L90 10 L90 90 L10 90 Z" />
      </svg>
      <p id="tl-caption" style="opacity: 0;">Morph Complete!</p>
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="
        AnimX.timeline()
          .add('#tl-morph', { type: 'morph', to: 'M50 10 L90 90 L10 90 Z', duration: 500 })
          .add('#tl-caption', 'fade-up', { duration: 400 })
          .play()
      ">Play Timeline</button>
    </div>

    <br>
    <h3>6. Data Attribute Hover Morph</h3>
    <div class="demo-area" style="text-align: center; padding: 20px; background: #1e293b; border-radius: 8px;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path data-ax-svg-morph="M50 10 C80 10 90 40 90 50 C90 80 60 90 50 90 C20 90 10 60 10 50 C10 20 40 10 50 10 Z" data-ax-on="hover" fill="#ef4444" d="M10 10 L90 10 L90 90 L10 90 Z" />
      </svg>
      <p>Hover me</p>
    </div>

    <br>
    <h3>7. API Validation Check</h3>
    <div class="demo-area" style="padding: 20px; background: #0f172a; border-radius: 8px;">
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="
        const res = AnimX.validateMorph('M10 10 L90 10 Z', 'M20 20 L80 20 Z');
        document.getElementById('val-out').textContent = JSON.stringify(res, null, 2);
      ">Validate Compatible</button>
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="
        const res = AnimX.validateMorph('M10 10 L90 10 Z', 'M20 20 L80 20 L50 90 Z');
        document.getElementById('val-out').textContent = JSON.stringify(res, null, 2);
      ">Validate Incompatible</button>
      <pre id="val-out" style="color: #6366f1; margin-top: 10px;"></pre>
    </div>

    <br>
    <h3>8. Fallback Safety</h3>
    <div class="demo-area" style="text-align: center; padding: 20px; background: #1e293b; border-radius: 8px;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path id="fallback-morph" fill="#8b5cf6" d="M10 10 L90 10 L90 90 L10 90 Z" />
      </svg>
      <br>
      <button class="nav-links a" style="padding: 10px; cursor: pointer; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 4px;" onclick="
        AnimX.svgMorph('#fallback-morph', { to: 'M20 20 L80 20 L50 90 Z', fallback: 'fade', duration: 600 })
      ">Morph Incompatible (Triggers Fade Fallback)</button>
    </div>

    <br>
    <h3>9. Reduced Motion Respect</h3>
    <div class="demo-area" style="padding: 20px; background: #0f172a; border-radius: 8px;">
      <p style="color:#94a3b8">If your OS has "Reduced Motion" enabled, all path morphing will automatically use the instant "jump" fallback to prevent nauseating transformations.</p>
    </div>

  </section>
`;

// Inject before <section id="dev-api"> or script tag if not found
if (html.includes('</script>')) {
  html = html.replace('<section id="dev-api">', morphHtml + '\n  <section id="dev-api">');
}

fs.writeFileSync('demo/index.html', html);
console.log('Updated demo/index.html');
