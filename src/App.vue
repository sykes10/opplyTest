<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <header class="w-full bg-purple-700">
    <nav class="container flex justify-between">
      <RouterLink to="/">
        <h1
          class="container text-4xl tracking-widest flex h-16 items-center text-white font-peralta"
        >
          OPPLY
        </h1>
      </RouterLink>
      <ul class="flex text-white font-bold gap-4 items-center">
        <RouterLink
          class="hover:underline cursor-pointer decoration-2 underline-offset-4"
          to="/suppliers"
          >Suppliers</RouterLink
        >
        <RouterLink
          class="hover:underline cursor-pointer decoration-2 underline-offset-4"
          to="/quotes"
          >Quotes</RouterLink
        >
      </ul>
    </nav>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>

<style>
.router-link-active {
  @apply underline;
}
</style>
