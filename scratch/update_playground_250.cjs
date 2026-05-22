const fs = require('fs');

let pg = fs.readFileSync('scratch/create_playground.js', 'utf8');

if (!pg.includes('SVG Morph')) {
  pg = pg.replace('<button class="tab-btn" data-target="gesture-mode">Gestures</button>', '<button class="tab-btn" data-target="gesture-mode">Gestures</button>\n      <button class="tab-btn" data-target="morph-mode">SVG Morph</button>');
  
  const morphHtml = `
    <!-- Morph Mode -->
    <div id="morph-mode" class="mode-panel">
      <div class="control-group">
        <label>Morph Preset</label>
        <select id="pg-morph-preset">
          <option value="custom">Custom Path</option>
          <option value="menu-close">Menu to Close</option>
          <option value="plus-minus">Plus to Minus</option>
          <option value="play-pause">Play to Pause</option>
        </select>
      </div>
      <div class="control-group">
        <label>Target Path</label>
        <input type="text" id="pg-morph-to" value="M50 10 C80 10 90 40 90 50 C90 80 60 90 50 90 C20 90 10 60 10 50 C10 20 40 10 50 10 Z">
      </div>
      <div class="control-group">
        <label>Options</label>
        <label style="display:flex;align-items:center;gap:10px;"><input type="checkbox" id="pg-morph-yoyo"> Yoyo</label>
        <label style="display:flex;align-items:center;gap:10px;"><input type="checkbox" id="pg-morph-loop"> Loop</label>
      </div>
      <button class="export-btn" id="pg-morph-btn">Apply Morph</button>
      <button class="export-btn" id="pg-val-btn" style="margin-top: 10px; background:#475569;">Validate Path</button>
    </div>
  `;
  
  pg = pg.replace('</div>\n    \n    <div class="preview-area">', morphHtml + '\n    </div>\n    \n    <div class="preview-area">');
  
  const morphLogic = `
    document.getElementById('pg-morph-btn').addEventListener('click', () => {
      const preset = document.getElementById('pg-morph-preset').value;
      const toPath = document.getElementById('pg-morph-to').value;
      const yoyo = document.getElementById('pg-morph-yoyo').checked;
      const loop = document.getElementById('pg-morph-loop').checked;
      const duration = parseInt(document.getElementById('pg-duration').value, 10);
      
      const box = document.querySelector('.pg-box-1');
      if(box) {
        box.innerHTML = '<svg width="100" height="100" viewBox="0 0 100 100"><path id="pg-demo-path" fill="#6366f1" d="M10 10 L90 10 L90 90 L10 90 Z" stroke="currentColor" stroke-width="2"/></svg>';
      }
      
      let code = '';
      if (preset === 'custom') {
        AnimX.svgMorph('#pg-demo-path', { to: toPath, yoyo, loop, duration });
        code = \`AnimX.svgMorph('#my-path', {
  to: '\${toPath}',
  yoyo: \${yoyo},
  loop: \${loop},
  duration: \${duration}
});\`;
      } else {
        const paths = preset.split('-');
        box.innerHTML = \`<svg width="100" height="100" viewBox="0 0 24 24" stroke="#6366f1" stroke-width="2" fill="none"><path id="pg-demo-icon" d="\${AnimX.getIconPath(paths[0])}" /></svg>\`;
        AnimX.morphIcon('#pg-demo-icon', { icon: preset, yoyo, loop, duration });
        code = \`AnimX.morphIcon('#my-icon', {
  icon: '\${preset}',
  yoyo: \${yoyo},
  loop: \${loop},
  duration: \${duration}
});\`;
      }
      document.getElementById('snippet-code').textContent = code;
    });

    document.getElementById('pg-val-btn').addEventListener('click', () => {
      const toPath = document.getElementById('pg-morph-to').value;
      const res = AnimX.validateMorph('M10 10 L90 10 L90 90 L10 90 Z', toPath);
      alert('Validation Result: ' + (res.ok ? 'Compatible! Strategy: ' + res.strategy : 'Incompatible: ' + res.reason));
    });
  `;
  
  pg = pg.replace('// Init mode tabs', morphLogic + '\n    // Init mode tabs');
  
  fs.writeFileSync('scratch/create_playground.js', pg);
  console.log('Updated create_playground.js');
} else {
  console.log('Playground already updated.');
}
