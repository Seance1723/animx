# Pattern Export Guide

Every pattern in Studio can be exported into three formats:

## 1. Data HTML
Perfect for zero-JS setups. Outputs standard `data-ax` attributes attached to the DOM.

## 2. JS Timelines
Perfect for complex orchestrations. Outputs a native `AnimX.timeline()` script to programmatically drive the UI.

## 3. CMS / Webflow
Strips out code that might conflict with builders, outputting safe custom attributes.
