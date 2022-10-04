import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>({
    email: "",
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    auth_token: "",
  });

  function persistToken(token: string) {
    user.value.auth_token = token;
    useLocalStorage("token", token);
  }

  function setUser(userData: User) {
    user.value = userData;
    persistToken(userData.auth_token);
  }

  return { user, setUser, persistToken };
});
