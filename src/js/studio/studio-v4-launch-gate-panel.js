export function renderV4LaunchGatePanel(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="ax-studio-panel ax-v4-gate-panel">
      <h3>v4.0.0 Launch Gate (v3.40.0)</h3>
      <div class="ax-signoff-status">
        <span class="ax-badge ax-badge-ready">Gate: Ready</span>
      </div>
      <p>v4.0.0 preparation can begin after v3.41.0 launch buffer is complete.</p>
      <ul>
        <li>Can start v4 preparation: Yes</li>
        <li>Can release v4: Not yet — v3.41.0 launch buffer required first</li>
        <li>Next version: v3.41.0</li>
      </ul>
    </div>`;
}
