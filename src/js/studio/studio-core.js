import { loadState, subscribe } from './studio-state.js';
import { initCanvas } from './studio-canvas.js';
import { initPresets } from './studio-presets.js';
import { initControls } from './studio-controls.js';
import { runPreview } from './studio-preview.js';
import { initExport, updateExportCode } from './studio-export.js';
import { initAudit } from './studio-audit.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure core AnimX is available
  if (!window.AnimX) {
    console.error('[AnimX Studio] Core AnimX library not found. Studio cannot run.');
    return;
  }
  
  console.log('[AnimX Studio] Initializing v3.0.0 Visual Builder...');
  
  // Load state from localStorage
  const state = loadState();
  window._studioCurrentState = state;
  
  // Initialize panels
  initCanvas(state);
  initPresets(state);
  const syncControls = initControls(state);
  initExport(state);
  initAudit();
  
  // Buttons
  document.getElementById('btn-play').onclick = () => runPreview(window._studioCurrentState);
  document.getElementById('btn-reset').onclick = () => {
    // Reset canvas by reloading current template
    initCanvas(window._studioCurrentState);
  };
  
  // Reduced Motion toggle
  document.getElementById('btn-reduced-motion').onclick = (e) => {
    const btn = e.target;
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      window.AnimX.setReducedMotion('never');
      btn.style.background = '';
    } else {
      btn.classList.add('active');
      window.AnimX.setReducedMotion('always');
      btn.style.background = '#ef4444';
      btn.style.color = 'white';
    }
  };
  
  // State changes
  subscribe((newState) => {
    window._studioCurrentState = newState;
    syncControls(newState);
    updateExportCode(newState);
    runPreview(newState);
  });
});
