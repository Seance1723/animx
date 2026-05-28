import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(process.cwd(), 'animxWebsite/src');

const files = {
  'components/landing/PowerPreview.jsx': `
export default function PowerPreview() {
  return (
    <section className="power-preview">
      <h2>Power Preview</h2>
      <div className="preview-strip">
        <div className="preview-item" data-ax="fade-up">Fade</div>
        <div className="preview-item" data-ax="zoom-in">Zoom</div>
        <div className="preview-item" data-ax="flip">Flip</div>
      </div>
    </section>
  );
}
`,
  'components/landing/WhyAnimX.jsx': `
export default function WhyAnimX() {
  return (
    <section className="why-animx">
      <h2>Why AnimX?</h2>
      <ul>
        <li>Zero dependency</li>
        <li>Class, data attribute, and JS API usage</li>
        <li>Built for developers and no-code/CMS users</li>
        <li>Reduced-motion and fallback thinking</li>
      </ul>
    </section>
  );
}
`,
  'components/landing/UseCases.jsx': `
export default function UseCases() {
  return (
    <section className="use-cases">
      <h2>Use Cases</h2>
      <p>Dashboards, Ecommerce, Portfolios, and more.</p>
    </section>
  );
}
`,
  'components/landing/FinalCTA.jsx': `
import { Link } from 'react-router-dom';
export default function FinalCTA() {
  return (
    <section className="final-cta">
      <h2>Build your animation in the playground</h2>
      <Link to="/playground" className="btn primary">Open Playground</Link>
      <Link to="/docs" className="btn secondary">Documentation</Link>
    </section>
  );
}
`,
  'routes/LandingPage.jsx': `
import HeroJourney from '../components/landing/HeroJourney';
import ProblemSection from '../components/landing/ProblemSection';
import PowerPreview from '../components/landing/PowerPreview';
import CapabilityJourney from '../components/landing/CapabilityJourney';
import WhyAnimX from '../components/landing/WhyAnimX';
import UseCases from '../components/landing/UseCases';
import FinalCTA from '../components/landing/FinalCTA';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroJourney />
      <ProblemSection />
      <PowerPreview />
      <CapabilityJourney />
      <WhyAnimX />
      <UseCases />
      <FinalCTA />
    </div>
  );
}
`,
  'components/landing/ProblemSection.jsx': `
export default function ProblemSection() {
  return (
    <section className="problem">
      <h2>Most animation libraries solve one piece. AnimX gives you one practical system.</h2>
      <div className="grid">
        <div className="card">Too many dependencies</div>
        <div className="card">Scattered animation snippets</div>
        <div className="card">Hard handoff between designer & developer</div>
      </div>
    </section>
  );
}
`,
  'components/docs/DocsSidebar.jsx': `
import { docsCategories } from '../../data/docsData';
export default function DocsSidebar() {
  return (
    <aside className="docs-sidebar">
      <ul>
        {docsCategories.map(cat => (
          <li key={cat.id}><a href={\`#\${cat.id}\`}>{cat.label}</a></li>
        ))}
      </ul>
    </aside>
  );
}
`,
  'components/docs/DocsContent.jsx': `
export default function DocsContent() {
  return (
    <div className="docs-content">
      <h2 id="getting-started">Getting Started</h2>
      <p>Install via npm or use the CDN.</p>
      
      <h2 id="class-usage">Class Usage</h2>
      <pre><code>&lt;div class="ax-fade-up"&gt;&lt;/div&gt;</code></pre>
      
      <h2 id="data-attributes">Data Attributes</h2>
      <pre><code>&lt;div data-ax="fade-up" data-ax-duration="800"&gt;&lt;/div&gt;</code></pre>
    </div>
  );
}
`,
  'routes/DocumentationPage.jsx': `
import DocsSidebar from '../components/docs/DocsSidebar';
import DocsContent from '../components/docs/DocsContent';

export default function DocumentationPage() {
  return (
    <div className="docs-page">
      <DocsSidebar />
      <DocsContent />
    </div>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
}
console.log('Landing and Docs generated.');
