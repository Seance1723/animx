import { Link } from 'react-router-dom';

export default function CapabilityJourney() {
  const showcases = [
    { title: 'Text Motion', tab: 'text' },
    { title: 'Media & Images', tab: 'image' },
    { title: 'Interactions', tab: 'button' },
    { title: 'Data UI', tab: 'card' },
    { title: 'Feedback UI', tab: 'button' },
    { title: 'Backgrounds', tab: 'background' },
    { title: 'SVG & Paths', tab: 'text' },
    { title: 'Transitions', tab: 'card' }
  ];

  return (
    <section className="capabilities" style={{ marginTop: '4rem' }}>
      <h2>Component Showcases</h2>
      <p className="subtitle-paragraph">Explore component animation formulas instantly in the sandbox canvas.</p>
      
      <div className="card-grid">
        {showcases.map((s, idx) => (
          <div key={idx} className="card">
            <h3>{s.title}</h3>
            <p>Native hardware-accelerated preset transitions for {s.title.toLowerCase()} layouts.</p>
            <Link to={`/playground?element=${s.tab}`} className="btn">View Showcase</Link>
          </div>
        ))}
      </div>
    </section>
  );
}