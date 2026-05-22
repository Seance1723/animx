const fs = require('fs');

let pg = fs.readFileSync('scratch/create_playground.js', 'utf8');

if (!pg.includes('Gestures')) {
  pg = pg.replace('<button class="tab-btn" data-target="layout-mode">Layout</button>', '<button class="tab-btn" data-target="layout-mode">Layout</button>\n      <button class="tab-btn" data-target="gesture-mode">Gestures</button>');
  
  const gestureHtml = `
    <!-- Gestures Mode -->
    <div id="gesture-mode" class="mode-panel">
      <div class="control-group">
        <label>Gesture Target</label>
        <select id="pg-gesture-target">
          <option value=".pg-box-1">Box 1</option>
        </select>
      </div>
      <div class="control-group">
        <label>Drag Axis</label>
        <select id="pg-drag-axis">
          <option value="both">Both</option>
          <option value="x">X Only</option>
          <option value="y">Y Only</option>
        </select>
      </div>
      <div class="control-group">
        <label>Physics</label>
        <label style="display:flex;align-items:center;gap:10px;"><input type="checkbox" id="pg-drag-inertia"> Inertia</label>
        <label style="display:flex;align-items:center;gap:10px;"><input type="checkbox" id="pg-drag-spring"> Spring Back</label>
      </div>
      <button class="export-btn" id="pg-gesture-btn">Apply & Export Drag</button>
    </div>
  `;
  
  pg = pg.replace('</div>\n    \n    <div class="preview-area">', gestureHtml + '\n    </div>\n    \n    <div class="preview-area">');
  
  const gestureLogic = `
    document.getElementById('pg-gesture-btn').addEventListener('click', () => {
      const target = document.getElementById('pg-gesture-target').value;
      const axis = document.getElementById('pg-drag-axis').value;
      const inertia = document.getElementById('pg-drag-inertia').checked;
      const spring = document.getElementById('pg-drag-spring').checked;
      
      const box = document.querySelector(target);
      if(box) box.style.transform = ''; // reset
      
      AnimX.destroyGestures(target);
      AnimX.drag(target, { axis, inertia, snapBack: spring });
      
      const code = \`AnimX.drag('\${target}', {
  axis: '\${axis}',
  inertia: \${inertia},
  snapBack: \${spring}
});\`;
      document.getElementById('snippet-code').textContent = code;
    });
  `;
  
  pg = pg.replace('// Init mode tabs', gestureLogic + '\n    // Init mode tabs');
  
  fs.writeFileSync('scratch/create_playground.js', pg);
  console.log('Updated create_playground.js');
} else {
  console.log('Playground already updated.');
}
