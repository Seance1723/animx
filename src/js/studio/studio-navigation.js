/**
 * AnimX Studio Navigation (v3.25.0)
 * Handles the unified sidebar routing, active states, and Command Menu (Ctrl+K).
 */

export function initNavigation() {
  const navLinks = document.querySelectorAll('.ax-sidebar-nav button[data-mode]');
  const panels = document.querySelectorAll('.ax-studio-panel');
  const canvasArea = document.getElementById('studio-canvas');

  navLinks.forEach(btn => {
    btn.addEventListener('click', (e) => {
      navigateTo(e.currentTarget.getAttribute('data-mode'));
    });
  });

  // Init keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleCommandMenu();
    }
  });
}

export function navigateTo(mode) {
  const navLinks = document.querySelectorAll('.ax-sidebar-nav button[data-mode]');
  const panels = document.querySelectorAll('.ax-studio-panel');
  const canvasArea = document.getElementById('studio-canvas');

  navLinks.forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.ax-sidebar-nav button[data-mode="${mode}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  panels.forEach(p => p.style.display = 'none');
  if (canvasArea) canvasArea.style.display = 'none';

  const targetPanel = document.getElementById(`panel-${mode}`);
  if (targetPanel) {
    targetPanel.style.display = 'block';
    
    // Lazy-load sub-modules
    if (mode === 'home' && window.AnimXStudio.renderHomeDashboard) window.AnimXStudio.renderHomeDashboard();
    if (mode === 'preset-packs' && window.AnimXStudio.getPresetPacks) { /* previously loadPresetPacks() */ }
    if (mode === 'scene-builder' && window.AnimXStudio.loadScenesUI) window.AnimXStudio.loadScenesUI();
    if (mode === 'checklist' && window.AnimXStudio.renderReleaseChecklist) window.AnimXStudio.renderReleaseChecklist();
  } else if (canvasArea) {
    canvasArea.style.display = 'block'; // Default to canvas for core tools
  }
}

function toggleCommandMenu() {
  let menu = document.getElementById('ax-command-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'ax-command-menu';
    menu.innerHTML = `
      <div class="ax-cmd-overlay">
        <div class="ax-cmd-box">
          <input type="text" placeholder="Search Studio (e.g. Catalog, Preset)..." id="ax-cmd-input" />
          <div class="ax-cmd-results">
            <button onclick="AnimXStudio.navigateTo('catalog')">Open Creative Catalog</button>
            <button onclick="AnimXStudio.navigateTo('scene-builder')">Open Timeline Builder</button>
            <button onclick="AnimXStudio.navigateTo('handoff')">Open Handoff</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(menu);
  }
  
  const isVisible = menu.style.display === 'block';
  menu.style.display = isVisible ? 'none' : 'block';
  if (!isVisible) document.getElementById('ax-cmd-input').focus();
}

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('ax-command-menu');
    if (menu) menu.style.display = 'none';
  }
});
