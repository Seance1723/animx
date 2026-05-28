# UX Roadmap

## Old Problem
The existing demo pages were too scattered. The user journey was broken, featuring too many separate pages, audit/report-style sections, and unclear navigation, leading to confusion about why someone should use AnimX.

## New User Journey
1. User lands on homepage and instantly understands AnimX is a zero-dependency animation library.
2. User sees real animations without being overwhelmed.
3. User clicks “Open Playground”.
4. User selects an element in a 3-column playground layout.
5. User adjusts relevant options.
6. User sees live output in the center stage.
7. User copies HTML/data/JS snippet from the right panel.
8. User checks docs for deeper usage.

## Page Structure
- Landing Page (Hero, Problem, Power Preview, Capability Journey, Why AnimX, CTA)
- Playground (3-column layout: Element/Options -> Live Preview -> Snippets)
- Documentation (Quick Start, Usage Methods, Component Use Cases, etc.)

## Playground Model
- `selectedElement`: The target UI element.
- `selectedEffect`: The type of animation.
- Dynamic options tied to the element/effect choice.

## Docs Model
- Sidebar categories with direct links to usage types.
- Copyable, realistic snippets for everyday development needs.

## Responsive Strategy
- Desktop: 3-column builder.
- Mobile: Tabbed interface (Choose, Preview, Export).

## Future Improvements
- Expanded preset gallery within the playground.
- Direct export to CodePen/CodeSandbox.
