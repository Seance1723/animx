import React, { useState } from 'react';
import { generateHTML, generateJS, generateCSSClass, generateReact, generateCMS } from '../../utils/snippetGenerator';

export default function ExportSnippetsPanel({ element, options }) {
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'html', label: 'HTML5 Attributes' },
    { id: 'css', label: 'Utility Classes' },
    { id: 'js', label: 'JavaScript API' },
    { id: 'react', label: 'React / Next' },
    { id: 'cms', label: 'No-Code / CMS' }
  ];

  const getCode = () => {
    switch (activeTab) {
      case 'html': return generateHTML(element, options);
      case 'css': return generateCSSClass(element, options);
      case 'js': return generateJS(element, options);
      case 'react': return generateReact(element, options);
      case 'cms': return generateCMS(element, options);
      default: return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="export-snippets-container">
      <h3 className="section-title">4. Deploy Code</h3>
      
      <div className="snippets-tabs-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="snippets-content-wrapper">
        <div className="snippets-code-header">
          <span className="code-lang-label">{activeTab.toUpperCase()} Integration</span>
          <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
            {copied ? '✔️ Copied!' : '📋 Copy Code'}
          </button>
        </div>
        <pre className="code-block-playground">
          <code>{getCode()}</code>
        </pre>
      </div>

      <div className="integration-guide-note">
        <p>
          💡 <strong>Production Tip:</strong> AnimX core has zero external runtime overhead. Styles automatically compile to hardware-accelerated transforms for ultra-responsive animations.
        </p>
      </div>
    </div>
  );
}