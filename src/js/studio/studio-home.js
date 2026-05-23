/**
 * AnimX Studio Home Dashboard (v3.14.0)
 * Renders the dashboard cards, status center, and onboarding logic.
 */

export function renderHomeDashboard() {
  const container = document.getElementById('panel-home-content');
  if (!container) return;

  const version = window.AnimX ? window.AnimX.version : 'Unknown';

  container.innerHTML = `
    <div class="ax-dashboard-grid">
      <!-- Section 1: Start New -->
      <div class="ax-dashboard-card">
        <h3>Start New</h3>
        <p>Begin a new zero-dependency visual project.</p>
        <div class="ax-dash-actions">
          <button class="ax-btn ax-btn-primary" onclick="AnimXStudio.navigateTo('scene-builder')">Build Timeline</button>
          <button class="ax-btn" onclick="AnimXStudio.navigateTo('project')">New Project</button>
        </div>
      </div>

      <!-- Section 2: Creative Tools -->
      <div class="ax-dashboard-card">
        <h3>Creative Tools</h3>
        <p>Access 300+ primitives and complex effects.</p>
        <div class="ax-dash-actions">
          <button class="ax-btn" onclick="AnimXStudio.navigateTo('catalog')">Creative Catalog</button>
          <button class="ax-btn" onclick="window.open('playground.html', '_blank')">Live Playground</button>
        </div>
      </div>

      <!-- Section 3: Delivery Tools -->
      <div class="ax-dashboard-card">
        <h3>Delivery & Handoff</h3>
        <p>Generate documentation and QA reports.</p>
        <div class="ax-dash-actions">
          <button class="ax-btn" onclick="AnimXStudio.navigateTo('qa')">Run QA Assistant</button>
          <button class="ax-btn" onclick="AnimXStudio.navigateTo('checklist')">Release Readiness</button>
        </div>
      </div>

      <!-- Section 4: Status Center -->
      <div class="ax-dashboard-card ax-status-card">
        <h3>Status Center</h3>
        <ul>
          <li><strong>AnimX Core:</strong> v${version}</li>
          <li><strong>Studio:</strong> v3.14.0 (Public Release)</li>
          <li><strong>Storage:</strong> ${localStorage ? 'Local Available' : 'Unavailable'}</li>
          <li><strong>Safe Mode:</strong> Active</li>
        </ul>
      </div>
    </div>
  `;
}

export function checkOnboarding() {
  try {
    if (!localStorage.getItem('animx_studio_onboarded')) {
      showOnboardingOverlay();
    }
  } catch(e) {}
}

function showOnboardingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'ax-onboarding-overlay';
  overlay.innerHTML = `
    <div class="ax-onboarding-box">
      <h2>Welcome to AnimX Studio (v3.14.0)</h2>
      <p>AnimX Studio is a <strong>100% local, zero-dependency visual builder</strong> for the AnimX core library.</p>
      <ul>
        <li>Everything runs in your browser. No accounts, no cloud.</li>
        <li>You can export code blocks cleanly at any time.</li>
        <li>Your data is saved securely in your browser's LocalStorage.</li>
      </ul>
      <button class="ax-btn ax-btn-primary" id="btn-close-onboarding">Get Started</button>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById('btn-close-onboarding').addEventListener('click', () => {
    overlay.remove();
    try { localStorage.setItem('animx_studio_onboarded', 'true'); } catch(e) {}
  });
}
