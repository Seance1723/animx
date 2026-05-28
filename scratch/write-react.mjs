import fs from 'fs';
import path from 'path';

const srcDir = path.resolve(process.cwd(), 'animxWebsite/src');

const files = {
  'main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
  'App.jsx': `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageShell from './components/layout/PageShell';
import LandingPage from './routes/LandingPage';
import PlaygroundPage from './routes/PlaygroundPage';
import DocumentationPage from './routes/DocumentationPage';
import useAnimX from './hooks/useAnimX';

function App() {
  useAnimX();
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
        </Routes>
      </PageShell>
    </BrowserRouter>
  );
}

export default App;
`,
  'components/layout/PageShell.jsx': `import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function PageShell({ children }) {
  return (
    <div className="page-shell">
      <AppHeader />
      <main className="main-content">{children}</main>
      <AppFooter />
    </div>
  );
}`,
  'components/layout/AppHeader.jsx': `import { Link } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header className="app-header">
      <div className="logo"><Link to="/">AnimX</Link></div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/playground">Playground</Link>
        <Link to="/docs">Docs</Link>
      </nav>
      <div className="actions">
        <Link to="/playground" className="btn primary">Open Playground</Link>
      </div>
    </header>
  );
}`,
  'components/layout/AppFooter.jsx': `export default function AppFooter() {
  return (
    <footer className="app-footer">
      <p>AnimX: The Zero-Dependency Animation Engine.</p>
    </footer>
  );
}`,
  'routes/LandingPage.jsx': `import HeroJourney from '../components/landing/HeroJourney';
import CapabilityJourney from '../components/landing/CapabilityJourney';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroJourney />
      <CapabilityJourney />
    </div>
  );
}`,
  'routes/PlaygroundPage.jsx': `import PlaygroundLayout from '../components/playground/PlaygroundLayout';

export default function PlaygroundPage() {
  return (
    <div className="playground-page">
      <PlaygroundLayout />
    </div>
  );
}`,
  'routes/DocumentationPage.jsx': `export default function DocumentationPage() {
  return (
    <div className="docs-page">
      <h1>Documentation</h1>
      <p>Quick start and usage examples.</p>
    </div>
  );
}`,
  'components/landing/HeroJourney.jsx': `import { Link } from 'react-router-dom';
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
}`,
  'components/landing/CapabilityJourney.jsx': `export default function CapabilityJourney() {
  return (
    <section className="capabilities">
      <h2>Capabilities</h2>
      <div className="grid">
        <div className="card"><h3>Text Reveal</h3></div>
        <div className="card"><h3>Interactions</h3></div>
        <div className="card"><h3>Data UI</h3></div>
      </div>
    </section>
  );
}`,
  'components/playground/PlaygroundLayout.jsx': `import { useState } from 'react';
import ElementSelector from './ElementSelector';
import DynamicOptionsPanel from './DynamicOptionsPanel';
import LivePreviewStage from './LivePreviewStage';
import ExportSnippetsPanel from './ExportSnippetsPanel';

export default function PlaygroundLayout() {
  const [selectedElement, setSelectedElement] = useState('text');
  const [options, setOptions] = useState({ effect: 'reveal' });

  return (
    <div className="playground-layout">
      <div className="panel left">
        <ElementSelector selected={selectedElement} onSelect={setSelectedElement} />
        <DynamicOptionsPanel element={selectedElement} options={options} onChange={setOptions} />
      </div>
      <div className="panel center">
        <LivePreviewStage element={selectedElement} options={options} />
      </div>
      <div className="panel right">
        <ExportSnippetsPanel element={selectedElement} options={options} />
      </div>
    </div>
  );
}`,
  'components/playground/ElementSelector.jsx': `export default function ElementSelector({ selected, onSelect }) {
  const elements = ['text', 'button', 'card', 'image'];
  return (
    <div className="element-selector">
      <h3>Select Element</h3>
      <select value={selected} onChange={e => onSelect(e.target.value)}>
        {elements.map(el => <option key={el} value={el}>{el}</option>)}
      </select>
    </div>
  );
}`,
  'components/playground/DynamicOptionsPanel.jsx': `export default function DynamicOptionsPanel({ element, options, onChange }) {
  return (
    <div className="options-panel">
      <h3>Options for {element}</h3>
      <label>
        Effect:
        <select value={options.effect} onChange={e => onChange({ ...options, effect: e.target.value })}>
          <option value="reveal">Reveal</option>
          <option value="fade">Fade</option>
          <option value="bounce">Bounce</option>
        </select>
      </label>
    </div>
  );
}`,
  'components/playground/LivePreviewStage.jsx': `import { useRef, useEffect } from 'react';
import { safePreview } from '../../utils/safePreview';

export default function LivePreviewStage({ element, options }) {
  const stageRef = useRef(null);

  useEffect(() => {
    safePreview(stageRef.current, element, options);
  }, [element, options]);

  return (
    <div className="live-preview">
      <h3>Live Preview</h3>
      <div ref={stageRef} className="stage">
        {element === 'text' && <h2>Animated Text</h2>}
        {element === 'button' && <button>Animated Button</button>}
        {element === 'card' && <div className="demo-card">Card Content</div>}
        {element === 'image' && <div className="demo-image">Image Placeholder</div>}
      </div>
    </div>
  );
}`,
  'components/playground/ExportSnippetsPanel.jsx': `import { generateHTML } from '../../utils/snippetGenerator';

export default function ExportSnippetsPanel({ element, options }) {
  const code = generateHTML(element, options);
  return (
    <div className="export-panel">
      <h3>Export Snippets</h3>
      <pre><code>{code}</code></pre>
      <button onClick={() => navigator.clipboard.writeText(code)}>Copy Snippet</button>
    </div>
  );
}`,
  'hooks/useAnimX.js': `import { useEffect } from 'react';
import { loadAnimX } from '../utils/animxLoader';

export default function useAnimX() {
  useEffect(() => {
    loadAnimX();
  }, []);
}`,
  'utils/animxLoader.js': `export function loadAnimX() {
  if (window.AnimX) return;
  const script = document.createElement('script');
  script.src = '../dist/animx.min.js'; // Assumes running from animxWebsite root pointing to upper dist
  document.body.appendChild(script);
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '../dist/animx.min.css';
  document.head.appendChild(link);
}`,
  'utils/safePreview.js': `export function safePreview(container, element, options) {
  if (!window.AnimX || !container) return;
  
  try {
    // Reset contents and attributes
    const target = container.firstElementChild;
    if (target) {
      target.removeAttribute('data-ax');
      target.removeAttribute('data-ax-duration');
      
      // Apply new
      target.setAttribute('data-ax', options.effect);
      window.AnimX.animate(); // trigger scan
    }
  } catch (err) {
    console.error('AnimX safe preview error', err);
  }
}`,
  'utils/snippetGenerator.js': `export function generateHTML(element, options) {
  let tag = 'div';
  if (element === 'text') tag = 'h2';
  if (element === 'button') tag = 'button';
  
  return \`<\${tag} data-ax="\${options.effect}">\n  Content\n</\${tag}>\`;
}`,
  'styles/main.scss': `@import 'tokens';
@import 'layout';
@import 'landing';
@import 'playground';

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: var(--bg-main);
  color: var(--text-main);
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  &.primary { background: #007bff; color: #fff; }
  &.secondary { background: #eee; color: #333; }
}
`,
  'styles/_tokens.scss': `:root {
  --bg-main: #f9f9f9;
  --bg-panel: #fff;
  --text-main: #111;
  --text-muted: #666;
  --border: #ddd;
}`,
  'styles/_layout.scss': `.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--bg-panel);
  border-bottom: 1px solid var(--border);
  nav a { margin: 0 10px; text-decoration: none; color: var(--text-main); }
}

.main-content {
  flex: 1;
  padding: 20px;
}`,
  'styles/_landing.scss': `.hero {
  text-align: center;
  padding: 100px 20px;
  h1 { font-size: 3rem; margin-bottom: 10px; }
  p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 30px; }
  .hero-actions .btn { margin: 0 10px; }
}`,
  'styles/_playground.scss': `.playground-layout {
  display: flex;
  gap: 20px;
  height: calc(100vh - 150px);
}
.panel {
  flex: 1;
  background: var(--bg-panel);
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow-y: auto;
}
.center { flex: 2; display: flex; align-items: center; justify-content: center; }
.live-preview .stage { padding: 40px; background: #fafafa; border: 1px dashed #ccc; }
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, filepath), content, 'utf8');
}
console.log('React files created.');
