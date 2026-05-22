const fs = require('fs');

let html = fs.readFileSync('demo/index.html', 'utf8');

// Update Version
html = html.replace(/AnimX v2\.\d\.\d.*?<\/title>/, 'AnimX v2.6.0 - Framework Adapters</title>');
html = html.replace(/AnimX v2\.\d\.\d/, 'AnimX v2.6.0');
html = html.replace(/<div class="subtitle">.*?<\/div>/s, '<div class="subtitle">Framework Adapters / Integration Layer release.</div>');

const integrationHtml = `
  <section id="integration-adapters">
    <h2>Framework Adapters / Integration Layer</h2>
    <div class="section-desc">AnimX core remains 100% zero-dependency. The new adapters are optional, tiny wrappers to make integrating AnimX into jQuery, WordPress, Webflow, and Alpine.js environments effortless.</div>
    
    <h3>1. Optional jQuery Adapter</h3>
    <div class="demo-area" style="text-align: left; padding: 20px; background: #0f172a; border-radius: 8px;">
      <pre><code style="color: #6366f1;">
&lt;!-- Load core --&gt;
&lt;script src="dist/animx.min.js"&gt;&lt;/script&gt;
&lt;!-- Load optional adapter --&gt;
&lt;script src="dist/adapters/animx.jquery.min.js"&gt;&lt;/script&gt;

&lt;script&gt;
// Automatically handles arrays and chaining
$(".box").animx("fade-up").addClass("active");
$(".title").animx("text", { animation: "text-rise", split: "chars" });
&lt;/script&gt;
      </code></pre>
    </div>

    <br>
    <h3>2. WordPress Helper</h3>
    <div class="demo-area" style="text-align: left; padding: 20px; background: #0f172a; border-radius: 8px;">
      <p style="color: #cbd5e1;">Safely animates Gutenberg blocks and Elementor widgets while respecting editor-mode rules.</p>
      <pre><code style="color: #6366f1;">
&lt;script src="dist/adapters/animx.wordpress.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
// Auto-initializes on load.
// Bypasses animations if block-editor-page or wp-admin is detected to prevent breaking builders.
AnimX.wp.observe(); // To watch for dynamic blocks
&lt;/script&gt;
      </code></pre>
    </div>

    <br>
    <h3>3. Webflow Helper</h3>
    <div class="demo-area" style="text-align: left; padding: 20px; background: #0f172a; border-radius: 8px;">
      <pre><code style="color: #6366f1;">
&lt;script src="dist/adapters/animx.webflow.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
// Automatically hooks into window.Webflow.push()
// Safely animates interactions after Webflow finishes its internal initializations.
&lt;/script&gt;
      </code></pre>
    </div>

    <br>
    <h3>4. Alpine.js Adapter</h3>
    <div class="demo-area" style="text-align: left; padding: 20px; background: #0f172a; border-radius: 8px;">
      <pre><code style="color: #6366f1;">
&lt;script src="dist/adapters/animx.alpine.min.js"&gt;&lt;/script&gt;

&lt;!-- Use standard Alpine directives --&gt;
&lt;div x-data x-animx="'fade-up'"&gt;Hello Alpine!&lt;/div&gt;

&lt;div x-data x-animx="{ animation: 'card-lift', duration: 700 }"&gt;
  Advanced Config
&lt;/div&gt;
      </code></pre>
    </div>

    <br>
    <h3>5. React Usage (Zero Dependencies)</h3>
    <div class="demo-area" style="text-align: left; padding: 20px; background: #0f172a; border-radius: 8px;">
      <p style="color: #cbd5e1;">We don't force a heavy React wrapper on you. Just use a standard \`useRef\` and \`useEffect\` with cleanup.</p>
      <pre><code style="color: #6366f1;">
import { useEffect, useRef } from "react";
import AnimX from "animx";

export default function MyComponent() {
  const ref = useRef(null);

  useEffect(() => {
    const instance = AnimX.animate(ref.current, "fade-up");
    
    // Crucial for React 18 Strict Mode double-mount safety!
    return () => instance.destroy();
  }, []);

  return &lt;div ref={ref}&gt;Animated React Component&lt;/div&gt;;
}
      </code></pre>
    </div>
  </section>
`;

if (html.includes('</script>')) {
  html = html.replace('<section id="dev-api">', integrationHtml + '\n  <section id="dev-api">');
}

fs.writeFileSync('demo/index.html', html);
console.log('Updated demo/index.html');
