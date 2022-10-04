import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/entities';
import { useSessionStorage } from '@vueuse/core';

const localStorage = useSessionStorage('token', '');

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    email: '',
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    auth_token: localStorage.value || '',
  });

  function persistToken(token: string) {
    localStorage.value = token;
  }

  function setToken(token: string) {
    user.value.auth_token = token;
    persistToken(token);
  }

  function setUser(userData: User) {
    user.value = userData;
    persistToken(userData.auth_token);
  }

  return { user, setUser, setToken };
});
