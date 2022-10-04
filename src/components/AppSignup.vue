<template>
  <h1 class="font-bold text-3xl text-center mb-4">Sign Up</h1>
  <form @submit.prevent="onSignup" class="flex flex-col gap-8">
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
  <p class="text-red-600 font-medium mt-2">{{ errorMessage }}</p>
  <p>
    Already have an account?
    <RouterLink class="hover:underline text-purple-700 font-bold" :to="'/login'"
      >Log In</RouterLink
    >
  </p>
</template>
<script lang="ts" setup>
import { useOpplyAPI } from "@/composables/useOpplyAPI";
import type { UnsuccessfulSinupResponse } from "@/types/api";
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import AppInput from "@/components/AppInput.vue";
import AppButton from "@/components/AppButton.vue";

const $router = useRouter();

const errorMessage = ref<string[]>([]);

const { signup, userData, collectAPIErrors } = useOpplyAPI();

async function onSignup() {
  try {
    const { data, error } = await signup();
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
