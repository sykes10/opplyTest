import { createFetch } from '@vueuse/core';
import { useUserStore } from '@/stores/user';
import type {
  AuthVariables,
  SuccessfulLoginResponse,
  UnsuccessfulLoginResponse,
  UnsuccessfulSinupResponse,
  SuccessfulSinupResponse,
  GetQoutesResponse,
  GetSuppliersResponse,
} from '@/types/api';
import { reactive } from 'vue';

const useFetch = createFetch({
  baseUrl: 'https://february-21.herokuapp.com',
  options: {
    async beforeFetch({ options, url }) {
      if (url !== '/auth') {
        const userStore = useUserStore();
        if (userStore.$state.user.auth_token) {
          options.headers = {
            ...options.headers,
            Authorization: `Token ${userStore.$state.user.auth_token}`,
          };
        }
      }
      return {
        options,
        url,
      };
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});

export function useOpplyAPI() {
  const userData = reactive<AuthVariables>({
    username: '',
    password: '',
  });

  async function login() {
    try {
      return useFetch<SuccessfulLoginResponse>('/api-token-auth/', {
        async afterFetch(context) {
          const userStore = useUserStore();
          if (context.data.token) {
            userStore.setToken(context.data.token);
          }
          return context;
        },
      })
        .post(userData)
        .json<SuccessfulLoginResponse | UnsuccessfulLoginResponse>();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function signup() {
    try {
      return useFetch('/api/v1/users/', {
        async afterFetch(context) {
          const userStore = useUserStore();
          if (context.data.id) {
            const user = context.data as SuccessfulSinupResponse;
            userStore.setUser(user);
          }
          return context;
        },
      })
        .post(userData)
        .json<SuccessfulSinupResponse | UnsuccessfulSinupResponse>();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function getQuotes() {
    try {
      return useFetch('/api/v1/quotes/').get().json<GetQoutesResponse>();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async function getSuppliers() {
    try {
      return useFetch('​/api​/v1​/suppliers​/')
        .get()
        .json<GetSuppliersResponse>();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async function getSuppliersById(id: number) {
    try {
      return useFetch(`/api/v1/suppliers/${id}`)
        .get()
        .json<GetSuppliersResponse>();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  function collectAPIErrors(errors: { [key: string]: string[] }): string[] {
    return Object.values(errors).flatMap((error) => error[0]);
  }

  return {
    login,
    signup,
    userData,
    collectAPIErrors,
    getSuppliers,
    getQuotes,
    getSuppliersById,
  };
}
