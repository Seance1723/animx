export default function ProblemSection() {
  return (
    <section className="problem-section" style={{ marginTop: '4rem' }}>
      <h2 style={{ textAlign: 'center' }}>Unified Animation Orchestration</h2>
      <p className="subtitle-paragraph">Most animation libraries solve one small piece. AnimX gives you a single, robust runtime system.</p>
      
      <div className="card-grid">
        <div className="card">
          <h3>Too Many Dependencies</h3>
          <p>Lighter load, zero external JS libraries required, keeping your production bundles extremely tight.</p>
        </div>
        <div className="card">
          <h3>Scattered Snippets</h3>
          <p>Consolidated presets keep your classes, attributes, and JS calls completely structured and uniform.</p>
        </div>
        <div className="card">
          <h3>Hard Design-Dev Handoff</h3>
          <p>Pre-packaged CMS layers allow designers to trigger full, complex animations directly from their markup editor.</p>
        </div>
      </div>
    </section>
  );
}