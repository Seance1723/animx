import { Link } from 'react-router-dom';

export default function UseCases() {
  const templates = [
    { title: 'SaaS / AI', desc: 'Landing page template with rolling text and feature reveals.' },
    { title: 'Ecommerce', desc: 'Product reveals, galleries, and interactions.' },
    { title: 'Dashboard', desc: 'KPI cards, charts, and table animations.' },
    { title: 'Portfolio', desc: 'Case study transitions and storytelling.' },
    { title: 'Agency', desc: 'Service cards and sticky transitions.' },
    { title: 'Documentation', desc: 'Interactive docs with tab/accordion motion.' },
    { title: 'CMS / No-Code', desc: 'Recipes for Webflow and WordPress structures.' }
  ];

  return (
    <section className="use-cases" style={{ marginTop: '4rem' }}>
      <h2>Industry Templates</h2>
      <p className="subtitle-paragraph">Pre-built standard micro-layout recipes to copy and deploy instantly.</p>
      
      <div className="card-grid">
        {templates.map((t, idx) => (
          <div key={idx} className="card">
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <Link to="/playground" className="btn">Open Builder</Link>
          </div>
        ))}
      </div>
    </section>
  );
}