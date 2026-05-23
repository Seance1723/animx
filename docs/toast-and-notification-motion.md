# Toast and Notification Motion (v3.24.0)

`AnimX.toast()` handles spawning sequential notification blocks.

## DOM Injection
If you target a container that doesn't exist (or simply target `body`), AnimX will automatically spawn an `.ax-toast-stack` wrapper fixed to the bottom right of the screen to route your alerts safely.

```javascript
AnimX.toast('body', { effect: 'toast-slide-right' });
```
