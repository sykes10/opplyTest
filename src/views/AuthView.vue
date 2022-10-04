<template>
  <div
    class="max-w-lg w-full mx-auto shadow border rounded p-4 -translate-x-1/2 left-1/2 absolute top-1/2 -translate-y-1/2"
  >
    <AppLogin v-if="$route.name === 'Login'" />
    <AppSignup v-else />
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import AppLogin from "@/components/AppLogin.vue";
import AppSignup from "@/components/AppSignup.vue";
const $route = useRoute();
</script>
