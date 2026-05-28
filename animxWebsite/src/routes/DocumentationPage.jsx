import React from 'react';

export default function DocumentationPage() {
  return (
    <div className="docs-page-container">
      <div className="docs-content-wrapper">
        <header className="docs-header">
          <h1>Documentation</h1>
          <p className="subtitle">The official guides and API references for AnimX.</p>
        </header>

        <h2>Getting Started</h2>
        <p>AnimX is a zero-dependency animation library running on the native Web Animations API. To start, include the files in your project:</p>
        <pre><code>{`<link rel="stylesheet" href="animx.min.css">
<script src="animx.min.js"></script>`}</code></pre>

        <h2>Quick Reference</h2>
        <div className="doc-grid">
          <div className="doc-card">
            <h3>HTML / CSS Usage</h3>
            <p>Use classes for pure CSS animations (no JS observer).</p>
            <code>{`<div class="ax-fade-up">`}</code>
          </div>
          <div className="doc-card">
            <h3>Data Attributes</h3>
            <p>Use data attributes for auto scroll-reveal.</p>
            <code>{`<div data-ax="zoom-in">`}</code>
          </div>
          <div className="doc-card">
            <h3>JS API</h3>
            <p>Control programmatically with full WAAPI access.</p>
            <code>{`AnimX.animate('.box', 'fade');`}</code>
          </div>
        </div>

        <h2>Core APIs</h2>
        
        <h3>AnimX.animate(targets, presetName, options)</h3>
        <p>Animates target elements using a registered preset or a custom WAAPI keyframe array.</p>
        <pre><code>{`AnimX.animate('.hero', 'fade-up', { duration: 1000, delay: 200 });`}</code></pre>

        <h3>AnimX.timeline()</h3>
        <p>Creates a chainable timeline sequence.</p>
        <pre><code>{`const tl = AnimX.timeline();
tl.add('.a', 'fade-up').add('.b', 'zoom-in', {}, '-=100').play();`}</code></pre>

        <h3>AnimX.stagger(targets, preset, options)</h3>
        <p>Animates multiple items with a delay between them. Supports directions: <code>start</code>, <code>center</code>, <code>random</code>.</p>
        <pre><code>{`AnimX.stagger('.items', 'slide-left', { stagger: 50 });`}</code></pre>

        <h3>AnimX.scroll(targets, preset, options)</h3>
        <p>Manually sets up an IntersectionObserver for targets.</p>
        <pre><code>{`AnimX.scroll('.scroll-box', 'fade-up');`}</code></pre>

        <h2>Advanced Engines</h2>
        
        <h3>Text Engine</h3>
        <p>Splits text by chars, words, or lines, or runs tickers and scramblers.</p>
        <pre><code>{`AnimX.text('h1', { type: 'split', splitType: 'words', animation: 'fade-up' });`}</code></pre>

        <h3>SVG Engine</h3>
        <p>Draws strokes or runs objects along a path.</p>
        <pre><code>{`AnimX.svgDraw('path');`}</code></pre>

        <h2>QA & Diagnostics</h2>
        <p>Ensure your setup is working flawlessly in development or production:</p>
        <pre><code>{`console.log(AnimX.diagnose()); // Memory & Module State
console.log(AnimX.validate()); // Checks missing DOM nodes
console.log(AnimX.versionInfo()); // Version details`}</code></pre>

        <h2>Reduced Motion</h2>
        <p>AnimX natively respects <code>prefers-reduced-motion</code>. If a user requests reduced motion in their OS, AnimX instantly resolves all animations to their final state, preserving layout and functionality without motion sickness.</p>
      </div>
    </div>
  );
}