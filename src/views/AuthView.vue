<template>
  <div
    class="max-w-lg w-full mx-auto shadow border rounded p-4 -translate-x-1/2 left-1/2 absolute top-1/2 -translate-y-1/2"
  >
    <h1 class="font-bold text-3xl text-center mb-4">{{ authMode }}</h1>
    <form @submit.prevent="handleAuth" class="flex flex-col gap-8">
      <AppInput
        type="text"
        label="username"
        v-model="userData.username"
        placeholder="choose a username"
      />
      <AppInput
        type="password"
        label="password"
        v-model="userData.password"
        placeholder="set your password"
      />
      <AppButton
        class="uppercase border-none rounded bg-purple-700 text-white font-medium px-3 py-1 h-10"
      >
        {{ authMode }}
      </AppButton>
    </form>
    <p class="text-red-600 font-medium mt-2" v-if="errorMessage.length">
      {{ errorMessage[0] }}
    </p>
    <p class="text-center">
      {{ authAlternativeModeText }}
      <RouterLink
        class="hover:underline text-purple-700 font-bold"
        :to="authAlternativeModePath"
      >
        {{ authAlternativeMode }}
      </RouterLink>
    </p>
  </div>
</template>
<script lang="ts" setup>
import { useOpplyAPI } from "@/composables/useOpplyAPI";
import type { UnsuccessfulSinupResponse } from "@/types/api";
import { computed, ref, watch } from "vue";
import { useRouter, RouterLink, useRoute } from "vue-router";
import AppInput from "@/components/AppInput.vue";
import AppButton from "@/components/AppButton.vue";

const $router = useRouter();
const $route = useRoute();
const errorMessage = ref<string[]>([]);
const authMode = computed(() =>
  $route.name === "Login" ? "Log In" : "Sign Up"
);
const authAlternativeMode = computed(() =>
  $route.name === "Login" ? "Sign Up" : "Log In"
);
const authAlternativeModeText = computed(() =>
  $route.name === "Login"
    ? "Don't have an account?"
    : "Already have an account?"
);
const authAlternativeModePath = computed(() =>
  $route.name === "Login" ? "/signup" : "/login"
);

watch(
  () => $route.name,
  () => (errorMessage.value = [])
);

const { signup, login, userData, collectAPIErrors } = useOpplyAPI();

async function handleAuth() {
  try {
    const { data, error } =
      authMode.value === "Log In" ? await login() : await signup();
    if (error.value) {
      errorMessage.value = collectAPIErrors(
        data.value as UnsuccessfulSinupResponse
      );
      return;
    }
    if (!error.value && data.value) {
      $router.push("/");
    }
  } catch (error) {
    errorMessage.value[0] = "Unexpected error happened";
  }
}
</script>
