# Scramble & Decode Text (v3.20.0)

AnimX can generate randomized, hacker-style text decipher animations natively via `requestAnimationFrame`.

```javascript
AnimX.scrambleText(".logo", {
  charset: "A-Z0-9",
  duration: 1500
});
```

### XSS Prevention
To prevent Cross-Site Scripting (XSS), the scramble engine utilizes `Node.textContent` exclusively, guaranteeing that scrambled configurations cannot inject executable payloads into the DOM.
