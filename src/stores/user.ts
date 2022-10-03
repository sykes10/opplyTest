import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>({
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    token: "",
  });

  function setToken(token: string) {
    user.value.token = token;
    useLocalStorage("token", token);
  }

  return { user };
});
