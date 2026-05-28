import { Link } from 'react-router-dom';
export default function HeroJourney() {
  return (
    <section className="hero">
      <h1 data-ax="reveal">Animate anything. Ship with zero dependencies.</h1>
      <p data-ax="fade" data-ax-delay="200">One animation system for websites, products, dashboards, and CMS pages.</p>
      <div className="hero-actions" data-ax="fade" data-ax-delay="400">
        <Link to="/playground" className="btn primary">Open Playground</Link>
        <Link to="/docs" className="btn secondary">Read Docs</Link>
      </div>
    </section>
  );
}