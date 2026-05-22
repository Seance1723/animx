const fs = require('fs');
const path = require('path');

const demoPath = path.resolve(__dirname, '../demo/index.html');
let html = fs.readFileSync(demoPath, 'utf8');

// Inject the Production Optimization section before </main>
if (!html.includes('id="production"')) {
  const newSection = `
  <section id="production">
    <div class="ax-container">
      <h2>Production Optimization <span class="badge">v2.7.0</span></h2>
      <p>AnimX is rigorously optimized for production environments with bundle awareness and zero-dependency guarantees.</p>
      
      <div class="ax-grid">
        <div class="ax-card">
          <h3>Build Diagnostics</h3>
          <p>Run the internal diagnostics tool to verify your current loaded build and capabilities.</p>
          <div class="ax-actions">
            <button class="ax-btn" onclick="console.table(AnimX.diagnose()); alert('Check console for diagnostics!')">Run diagnose()</button>
            <button class="ax-btn" onclick="console.log(AnimX.productionCheck()); alert('Check console for production check!')">Run productionCheck()</button>
          </div>
        </div>
        
        <div class="ax-card">
          <h3>Build Info</h3>
          <p>View internal bundle metadata directly from the engine.</p>
          <div class="ax-actions">
            <button class="ax-btn" onclick="alert('Current Build: ' + AnimX.build.name + '\\nVersion: ' + AnimX.build.version + '\\nModules: ' + AnimX.build.modules.length)">Show Build Info</button>
            <a href="../dist/animx.bundle-report.json" target="_blank" class="ax-btn" style="text-decoration:none; display:inline-block; text-align:center;">View Bundle Report</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  html = html.replace('</main>', `${newSection}\n</main>`);
  fs.writeFileSync(demoPath, html);
  console.log('Injected Production Optimization section into demo.');
} else {
  console.log('Production Optimization section already exists.');
}
