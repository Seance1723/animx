const fs = require('fs');
const path = require('path');

const demoPath = path.resolve(__dirname, '../demo/index.html');
let html = fs.readFileSync(demoPath, 'utf8');

// Inject the Accessibility section before </main>
if (!html.includes('id="accessibility"')) {
  const newSection = `
  <section id="accessibility">
    <div class="ax-container">
      <h2>Accessibility and Motion Safety <span class="badge">v2.8.0</span></h2>
      <p>AnimX natively respects OS-level motion preferences and provides tools to ensure screen reader compatibility.</p>
      
      <div class="ax-grid">
        <div class="ax-card">
          <h3>Reduced Motion Override</h3>
          <p>Test the clamping engine by forcing reduced motion globally. Notice how animations complete instantly without hiding content.</p>
          <div class="ax-actions">
            <button class="ax-btn" onclick="AnimX.setReducedMotion('system'); alert('Set to: System')">System</button>
            <button class="ax-btn" onclick="AnimX.setReducedMotion('always'); alert('Set to: Always Reduce')">Always</button>
            <button class="ax-btn" onclick="AnimX.setReducedMotion('never'); alert('Set to: Never Reduce')">Never</button>
          </div>
          <p style="margin-top: 1rem;">
            <button class="ax-btn" onclick="alert(JSON.stringify(AnimX.getReducedMotion(), null, 2))">Check Status</button>
          </p>
        </div>
        
        <div class="ax-card">
          <h3>Accessibility Auditing & Status</h3>
          <p>Run a lightweight scan to detect missing screen reader attributes or permanently hidden animated elements.</p>
          <div class="ax-actions">
            <button class="ax-btn" onclick="console.table(AnimX.auditAccessibility().warnings); alert('Check console for warnings!')">Run Audit</button>
            <button class="ax-btn" onclick="AnimX.announce('Action successfully completed!', { politeness: 'assertive' }); alert('Screen reader announcement sent!')">Trigger Live Region</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  html = html.replace('</main>', `${newSection}\n</main>`);
  fs.writeFileSync(demoPath, html);
  console.log('Injected Accessibility section into demo.');
} else {
  console.log('Accessibility section already exists.');
}
