<template>
  <form @submit.prevent="onSignup" novalidate>
    <input type="text" />
    <input type="password" />
    <button>Sign Up</button>
  </form>
  {{ errorMessage }}
</template>
<script lang="ts" setup>
import { useOpplyAPI } from "@/composables/useOpplyAPI";
import type {
  UnsuccessfulLoginResponse,
  UnsuccessfulSinupResponse,
} from "@/types/api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const errorMessage = ref("");
const user = ref<any>("");
const { login, signup } = useOpplyAPI();

async function onSignup() {
  try {
    const { data, error, isFetching } = await signup({
      username: "userTesta",
      password: "test1234",
    });
    if (error) {
      errorMessage.value = (
        data.value as UnsuccessfulSinupResponse
      )?.username[0];
      return;
    }
    if (!error && data) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
}
async function onLogin() {
  try {
    const { data, error, isFetching } = await login({
      username: "userTest",
      password: "test1234",
    });
    if (error) {
      errorMessage.value = (
        data.value as UnsuccessfulLoginResponse
      ).non_field_errors[0];
    }
    if (!error && data) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
