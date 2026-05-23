# Page Animation Flows

Page flows instruct developers on how to orchestrate global page loads.

When stitching multiple Section Patterns together, AnimX recommends grouping them logically so that off-screen sections (like Footers or bottom CTA blocks) wait for IntersectionObserver scroll triggers rather than executing on page load.
