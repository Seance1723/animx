const fs = require('fs');

let html = fs.readFileSync('demo/index.html', 'utf8');

// Update Version
html = html.replace(/AnimX v2\.\d\.\d.*?<\/title>/, 'AnimX v2.4.0 - Gesture and Drag Physics</title>');
html = html.replace(/AnimX v2\.\d\.\d/, 'AnimX v2.4.0');
html = html.replace(/<div class="subtitle">.*?<\/div>/s, '<div class="subtitle">Gesture and Drag Physics release showcasing zero-dependency interactive physics.</div>');

const gesturesHtml = `
  <section id="gestures">
    <h2>Gesture and Drag Physics</h2>
    <div class="section-desc">AnimX v2.4.0 introduces a zero-dependency Pointer Events physics system for practical interaction. Note: reduced motion OS settings disable inertia and spring effects safely.</div>
    
    <h3>1. Basic Draggable</h3>
    <div class="demo-area demo-drag-area" style="height: 200px; position: relative; overflow: hidden; background: #0f172a; border-radius: 8px;">
      <div class="card demo-drag-card" style="width: 100px; height: 100px; position: absolute; top: 50px; left: 50px;">Drag Me</div>
    </div>
    
    <br>
    <h3>2. Axis Locked Drag</h3>
    <div class="grid">
      <div class="card ax-drag-x" data-ax-drag data-ax-drag-axis="x" style="cursor: grab;">Drag X Only</div>
      <div class="card ax-drag-y" data-ax-drag data-ax-drag-axis="y" style="cursor: grab;">Drag Y Only</div>
    </div>

    <br>
    <h3>3. Inertia & Spring</h3>
    <div class="grid">
      <div class="card" data-ax-drag data-ax-drag-inertia="true" style="cursor: grab;">Toss Me (Inertia)</div>
      <div class="card" data-ax-drag data-ax-drag-snap-back="true" style="cursor: grab;">Snap Back (Spring)</div>
    </div>

    <br>
    <h3>4. Drag Handle</h3>
    <div class="card" data-ax-drag data-ax-drag-handle=".my-handle">
      <div class="my-handle" style="background: #334155; padding: 10px; margin: -20px -20px 20px -20px; border-radius: 8px 8px 0 0; cursor: grab;">Drag Handle Here</div>
      <div>Content below handle</div>
    </div>

    <br>
    <h3>5. Swipe Cards</h3>
    <div class="grid">
      <div class="card" data-ax-swipe="left" data-ax-swipe-threshold="40" id="swipeLeftCard">Swipe Left</div>
      <div class="card" data-ax-swipe="right" data-ax-swipe-threshold="40" id="swipeRightCard">Swipe Right</div>
    </div>

    <br>
    <h3>6. Pan Area</h3>
    <div class="card" data-ax-pan id="panArea" style="height: 150px; touch-action: none;">
      Pan anywhere inside. <br>
      <span id="panOutput" style="color: #6366f1; font-family: monospace;">Delta: 0, 0</span>
    </div>

    <br>
    <h3>7. Pinch Zoom</h3>
    <div class="demo-area" style="height: 250px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #0f172a; border-radius: 8px;">
      <div class="card" data-ax-pinch data-ax-pinch-min="0.5" data-ax-pinch-max="2" style="touch-action: none; user-select: none;">Pinch Me (Touch/Trackpad)</div>
    </div>

    <br>
    <h3>8. Long Press</h3>
    <div class="card" data-ax-long-press data-ax-long-press-duration="800" id="longPressCard" style="user-select: none;">Hold for 800ms</div>

    <br>
    <h3>9. Drag Reorder List (Layout Motion + Drag)</h3>
    <div class="demo-area" style="max-width: 400px; padding: 20px;">
      <div class="sortable-list" data-ax-drag-reorder data-ax-reorder-items=".sortable-item" data-ax-reorder-axis="y">
        <div class="card sortable-item" style="margin-bottom: 10px; cursor: grab;">Item 1</div>
        <div class="card sortable-item" style="margin-bottom: 10px; cursor: grab;">Item 2</div>
        <div class="card sortable-item" style="margin-bottom: 10px; cursor: grab;">Item 3</div>
        <div class="card sortable-item" style="margin-bottom: 10px; cursor: grab;">Item 4</div>
      </div>
    </div>

  </section>
`;

// Inject before <section id="dev-api"> or script tag if not found
if (html.includes('</script>')) {
  html = html.replace('<script>', gesturesHtml + '\n  <script>');
}

// Add script logic for the demos
const demoScript = `
    // Gesture Demo Logic
    document.addEventListener('DOMContentLoaded', () => {
      if (window.AnimX) {
        AnimX.draggable('.demo-drag-card', { bounds: '.demo-drag-area', inertia: true });
        
        document.getElementById('swipeLeftCard').addEventListener('animx:swipe', (e) => {
          e.target.textContent = 'Swiped Left!';
          setTimeout(() => e.target.textContent = 'Swipe Left', 1000);
        });
        
        document.getElementById('swipeRightCard').addEventListener('animx:swipe', (e) => {
          e.target.textContent = 'Swiped Right!';
          setTimeout(() => e.target.textContent = 'Swipe Right', 1000);
        });
        
        const panArea = document.getElementById('panArea');
        const panOutput = document.getElementById('panOutput');
        panArea.addEventListener('animx:pan-move', (e) => {
          panOutput.textContent = \`Delta: \${Math.round(e.detail.deltaX)}, \${Math.round(e.detail.deltaY)}\`;
        });
        
        document.getElementById('longPressCard').addEventListener('animx:long-press', (e) => {
          e.target.textContent = 'Long Pressed!';
          e.target.style.background = '#4f46e5';
          setTimeout(() => {
            e.target.textContent = 'Hold for 800ms';
            e.target.style.background = '';
          }, 1500);
        });
      }
    });
`;

html = html.replace('</script>', demoScript + '\n  </script>');

fs.writeFileSync('demo/index.html', html);
console.log('Updated demo/index.html');
