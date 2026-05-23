/**
 * AnimX Studio UX Polish Helpers (v3.12.0)
 * Handles empty states, safe errors, and global settings.
 */

export function renderEmptyState(containerId, title, message, actionText, actionCallbackStr) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="ax-empty-state">
      <div class="ax-empty-icon">📂</div>
      <h3>${title}</h3>
      <p>${message}</p>
      ${actionText ? `<button class="ax-btn ax-btn-primary" onclick="${actionCallbackStr}">${actionText}</button>` : ''}
    </div>
  `;
}

export function safeExecute(fn, fallbackMessage = "An error occurred.") {
  try {
    return fn();
  } catch (e) {
    console.error('[AnimX Studio SafeError]', e);
    return { ok: false, error: fallbackMessage, detail: e.message };
  }
}

export function clearStudioData() {
  if (confirm("Are you sure you want to completely wipe all local AnimX Studio projects, scenes, and settings? This cannot be undone.")) {
    try {
      localStorage.clear();
      alert("Local data wiped. Reloading Studio.");
      window.location.reload();
    } catch(e) {
      alert("Failed to wipe data: " + e.message);
    }
  }
}
