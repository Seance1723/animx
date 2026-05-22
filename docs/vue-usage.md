# Vue / Nuxt Usage

AnimX plays perfectly with Vue 3's composition API.

## Installation

```bash
npm install animx
```

## Basic Component

Use template refs and lifecycle hooks to manage animations.

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AnimX from 'animx';
import 'animx/dist/animx.css';

const boxRef = ref(null);
let animInstance = null;

onMounted(() => {
  animInstance = AnimX.animate(boxRef.value, 'fade-up', {
    duration: 800
  });
});

onUnmounted(() => {
  if (animInstance) animInstance.destroy();
});
</script>

<template>
  <div ref="boxRef">Hello Vue</div>
</template>
```
