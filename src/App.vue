<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header class="w-full bg-purple-700">
    <h1
      class="container text-4xl tracking-widest flex h-16 items-center text-white font-peralta"
    >
      OPPLY
    </h1>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>
