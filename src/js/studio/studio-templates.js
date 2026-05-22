export const templates = {
  hero: {
    name: 'Hero Section',
    html: `
      <div style="padding: 50px; text-align: center; max-width: 600px; margin: 0 auto;">
        <h1 id="template-hero-title" class="ax-studio-selectable" style="font-size: 3rem; margin-bottom: 20px;">Welcome to AnimX</h1>
        <p id="template-hero-copy" class="ax-studio-selectable" style="font-size: 1.2rem; color: #64748b; margin-bottom: 30px;">Build stunning animations with zero dependencies.</p>
        <button id="template-hero-btn" class="ax-studio-selectable" style="background: #6366f1; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 1rem; cursor: pointer;">Get Started</button>
      </div>
    `
  },
  cards: {
    name: 'Card Grid',
    html: `
      <div style="padding: 30px;">
        <h2 id="template-cards-title" class="ax-studio-selectable" style="text-align: center; margin-bottom: 30px;">Our Features</h2>
        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
          <div id="template-card-1" class="ax-studio-selectable" style="width: 200px; background: #f8fafc; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="width: 40px; height: 40px; background: #818cf8; border-radius: 8px; margin-bottom: 15px;"></div>
            <h3>Feature 1</h3>
            <p style="color: #64748b; font-size: 0.9rem;">Clean, minimal, fast.</p>
          </div>
          <div id="template-card-2" class="ax-studio-selectable" style="width: 200px; background: #f8fafc; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="width: 40px; height: 40px; background: #c084fc; border-radius: 8px; margin-bottom: 15px;"></div>
            <h3>Feature 2</h3>
            <p style="color: #64748b; font-size: 0.9rem;">Production ready.</p>
          </div>
          <div id="template-card-3" class="ax-studio-selectable" style="width: 200px; background: #f8fafc; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="width: 40px; height: 40px; background: #34d399; border-radius: 8px; margin-bottom: 15px;"></div>
            <h3>Feature 3</h3>
            <p style="color: #64748b; font-size: 0.9rem;">Fully accessible.</p>
          </div>
        </div>
      </div>
    `
  },
  text: {
    name: 'Text Engine',
    html: `
      <div style="padding: 50px; text-align: center;">
        <h1 id="template-text-1" class="ax-studio-selectable" style="font-size: 4rem; letter-spacing: -0.02em;">Split Text Reveal</h1>
      </div>
    `
  }
};
