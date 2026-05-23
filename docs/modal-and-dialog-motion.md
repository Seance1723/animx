# Modal and Dialog Motion (v3.24.0)

`AnimX.modal()` provides entrance and exit choreographies (e.g., `modal-scale-blur` with `backdrop-fade`) for popups.

## Accessibility Caveat
AnimX handles the **visual motion** of the modal perfectly.
However, to ensure we remain a zero-dependency motion library, we do **not** enforce a rigid Focus Trap. If you require strict focus management, we recommend pairing `AnimX.modal()` with the native `<dialog>` element or your framework's native focus trapping tools.

```javascript
AnimX.modal('.modal-window', { effect: 'modal-pop' });
```
