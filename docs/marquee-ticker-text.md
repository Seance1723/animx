# Marquee & Ticker Text (v3.20.0)

AnimX clones DOM elements securely to create seamless infinite scrolling carousels.

```javascript
AnimX.marqueeText(".banner", {
  speed: 60
});
```

To maintain SEO indexing and prevent duplicate reading by screen readers, cloned elements injected by the `marqueeText` engine are automatically assigned `aria-hidden="true"`.
