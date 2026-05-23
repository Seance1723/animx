# Table Motion Effects (v3.23.0)

`AnimX.table()` specifically handles `<tbody> <tr>` row reveals safely.
Unlike generic layout libraries that force `position: absolute` or `display: block` onto rows—destroying native table semantics and breaking screen readers—AnimX dynamically leverages `opacity` arrays and non-layout breaking transforms to retain 100% semantic compliance.

```javascript
AnimX.table('.user-table', { effect: 'table-row-fade' });
```
