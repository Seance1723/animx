export const CMS_RECIPES = {
  'hero-saas-intro': {
    name: 'hero-saas-intro',
    type: 'cms-recipe',
    description: 'Hero heading, subtext, CTA, and visual reveal sequence',
    apply(element, animx) {
      const heading = element.querySelector('h1, h2, [data-ax-role="heading"]');
      const copy = element.querySelector('p, [data-ax-role="copy"]');
      const cta = element.querySelectorAll('a, button, [data-ax-role="cta"]');
      const visual = element.querySelector('img, video, svg, [data-ax-role="visual"]');

      const tl = animx.timeline();
      
      if (heading) {
        tl.add(heading, { animation: 'text-mask-up', split: 'lines', duration: 800 });
      }
      if (copy) {
        tl.add(copy, { animation: 'fade-up', duration: 600 }, '-=400');
      }
      if (cta.length) {
        tl.add(cta, { animation: 'fade-up', stagger: 100, duration: 500 }, '-=400');
      }
      if (visual) {
        tl.add(visual, { animation: 'zoom-in', duration: 800 }, '-=400');
      }
      tl.play();
    }
  },
  'hero-agency-intro': {
    name: 'hero-agency-intro',
    apply(element, animx) {
      const heading = element.querySelector('h1, h2, [data-ax-role="heading"]');
      const copy = element.querySelector('p, [data-ax-role="copy"]');
      const cta = element.querySelectorAll('a, button, [data-ax-role="cta"]');
      
      const tl = animx.timeline();
      if (heading) tl.add(heading, { animation: 'text-rise', split: 'words', duration: 800, stagger: 40 });
      if (copy) tl.add(copy, { animation: 'fade-up', duration: 600 }, '-=400');
      if (cta.length) tl.add(cta, { animation: 'zoom-in', stagger: 100 }, '-=300');
      tl.play();
    }
  },
  'hero-product-launch': {
    name: 'hero-product-launch',
    apply(element, animx) {
      const heading = element.querySelector('h1, h2, [data-ax-role="heading"]');
      const visual = element.querySelector('img, video, svg, [data-ax-role="visual"]');
      const tl = animx.timeline();
      if (visual) tl.add(visual, { animation: 'zoom-in', duration: 1000 });
      if (heading) tl.add(heading, { animation: 'fade-up', duration: 600 }, '-=600');
      tl.play();
    }
  },
  'section-soft-reveal': {
    name: 'section-soft-reveal',
    apply(element, animx) {
      animx.scroll(element, { animation: 'fade-up-soft', duration: 800, once: true });
    }
  },
  'section-image-text': {
    name: 'section-image-text',
    apply(element, animx) {
      const img = element.querySelector('img, [data-ax-role="image"]');
      const text = element.querySelector('.text-content, [data-ax-role="text"]');
      if (img) animx.scroll(img, { animation: 'slide-right', duration: 800, once: true });
      if (text) animx.scroll(text, { animation: 'slide-left', duration: 800, once: true });
    }
  },
  'feature-grid-stagger': {
    name: 'feature-grid-stagger',
    apply(element, animx) {
      const heading = element.querySelector('h2, [data-ax-role="heading"]');
      const cards = element.querySelectorAll('.card, .feature, [data-ax-role="card"]');
      if (heading) animx.scroll(heading, { animation: 'fade-up', once: true });
      if (cards.length) animx.stagger(cards, 'fade-up', { stagger: { each: 100 }, on: 'scroll' });
    }
  },
  'pricing-stagger-cards': {
    name: 'pricing-stagger-cards',
    apply(element, animx) {
      const cards = element.querySelectorAll('.card, .pricing-plan, [data-ax-role="card"]');
      if (cards.length) animx.stagger(cards, 'card-lift', { stagger: { each: 150 }, on: 'scroll' });
    }
  },
  'stats-counter-reveal': {
    name: 'stats-counter-reveal',
    apply(element, animx) {
      const counters = element.querySelectorAll('[data-ax-counter], .stat-number');
      const labels = element.querySelectorAll('.stat-label');
      if (counters.length) {
        counters.forEach(c => {
          const to = c.getAttribute('data-ax-to') || c.innerText;
          const suffix = c.getAttribute('data-ax-suffix') || '';
          animx.text(c, { type: 'counter', to: parseFloat(to), suffix, duration: 1500, on: 'scroll' });
        });
      }
      if (labels.length) animx.stagger(labels, 'fade-up', { stagger: { each: 100 }, on: 'scroll' });
    }
  },
  'testimonial-reveal': {
    name: 'testimonial-reveal',
    apply(element, animx) {
      const cards = element.querySelectorAll('.testimonial, [data-ax-role="card"]');
      if (cards.length) animx.stagger(cards, 'blur-up', { stagger: { each: 200 }, on: 'scroll' });
    }
  },
  'blog-card-list': {
    name: 'blog-card-list',
    apply(element, animx) {
      const cards = element.querySelectorAll('article, .post, [data-ax-role="card"]');
      if (cards.length) animx.stagger(cards, 'fade-up', { stagger: { each: 100 }, on: 'scroll' });
    }
  },
  'faq-accordion-motion': {
    name: 'faq-accordion-motion',
    apply(element, animx) {
      const rows = element.querySelectorAll('details, .faq-item, [data-ax-role="faq-row"]');
      if (rows.length) animx.stagger(rows, 'fade-right', { stagger: { each: 100 }, on: 'scroll' });
    }
  },
  'cta-final-reveal': {
    name: 'cta-final-reveal',
    apply(element, animx) {
      const box = element.querySelector('.cta-box, [data-ax-role="cta-box"]') || element;
      animx.scroll(box, { animation: 'zoom-in', duration: 800, once: true });
    }
  },
  'footer-soft-reveal': {
    name: 'footer-soft-reveal',
    apply(element, animx) {
      animx.scroll(element, { animation: 'fade-up-soft', duration: 1000, once: true });
    }
  }
};
