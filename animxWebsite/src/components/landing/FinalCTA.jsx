import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <h2>Ready to Build?</h2>
      <p>Configure dynamic easing, stagger, and delay inside our interactive playground, and export clean snippets.</p>
      <div className="cta-actions">
        <Link to="/playground" className="btn">Open Playground Sandbox</Link>
        <Link to="/docs" className="btn secondary">View Core API Documentation</Link>
      </div>
    </section>
  );
}