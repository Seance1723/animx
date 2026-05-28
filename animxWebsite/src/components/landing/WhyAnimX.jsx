export default function WhyAnimX() {
  return (
    <section className="why-animx" style={{ marginTop: '4rem' }}>
      <h2>The Core Philosophy</h2>
      <p className="subtitle-paragraph">AnimX is not just an animation library; it is a unified developer-designer handoff system.</p>
      
      <div className="card-grid">
        <div className="card">
          <h3>Zero Dependencies</h3>
          <p>Super-lightweight core using native Web Animations API (WAAPI) for hardware-accelerated fluid transitions.</p>
        </div>
        <div className="card">
          <h3>Multi-Modal Triggers</h3>
          <p>Deploy using pure CSS utility classes, auto scroll-revealing data attributes, or precise imperative JS APIs.</p>
        </div>
        <div className="card">
          <h3>Accessibility First</h3>
          <p>Respects OS-level <code>prefers-reduced-motion</code>, resolving all animations instantly to fallback states.</p>
        </div>
      </div>
    </section>
  );
}