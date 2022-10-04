<template>
  <h1 class="font-bold text-3xl text-center mb-4">Log In</h1>
  <form @submit.prevent="onLogin" class="flex flex-col gap-8">
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
      Log In
    </AppButton>
  </form>
  <p class="text-red-600 font-medium my-2" v-if="errorMessage.length">
    {{ errorMessage[0] }}
  </p>
  <p class="text-center">
    Don't have an account?
    <RouterLink
      class="hover:underline text-purple-700 font-bold"
      :to="'/signup'"
    >
      Sign Up
    </RouterLink>
  </p>
</template>
<script lang="ts" setup>
import { useOpplyAPI } from "@/composables/useOpplyAPI";
import type { UnsuccessfulLoginResponse } from "@/types/api";
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import AppInput from "@/components/AppInput.vue";
import AppButton from "@/components/AppButton.vue";

const $router = useRouter();

let errorMessage = ref<string[]>([]);

const { login, userData, collectAPIErrors } = useOpplyAPI();

async function onLogin() {
  try {
    const { data, error } = await login();

    if (error.value) {
      errorMessage.value = collectAPIErrors(
        data.value as UnsuccessfulLoginResponse
      );
    }
    if (!error.value && data.value) {
      $router.push("/");
    }
  } catch (error) {
    errorMessage.value[0] = "Unexpected error happened";
  }
}
</script>
