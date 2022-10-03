import { createFetch, type UseFetchReturn } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import type {
  AuthVariables,
  SuccessfulLoginResponse,
  UnsuccessfulLoginResponse,
  UnsuccessfulSinupResponse,
  SuccessfulSinupResponse,
} from "@/types/api";
import type { Ref } from "vue";

const useFetch = createFetch({
  baseUrl: "https://february-21.herokuapp.com",
  options: {
    async beforeFetch({ options, url }) {
      if (url !== "/auth") {
        const userStore = useUserStore();
        if (userStore.$state.user.token) {
          options.headers = {
            ...options.headers,
            Authorization: `Token ${userStore.$state.user.token}`,
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
    mode: "cors",
  },
});

export function useOpplyAPI() {
  async function login(
    userData: AuthVariables
  ): Promise<
    UseFetchReturn<SuccessfulLoginResponse | UnsuccessfulLoginResponse>
  > {
    try {
      return useFetch<SuccessfulLoginResponse>("/api-token-auth/", {
        async afterFetch(context) {
          const userStore = useUserStore();
          if (context.data.token) {
            userStore.user.token = context.data.token;
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
  async function signup(
    userData: AuthVariables
  ): Promise<
    UseFetchReturn<SuccessfulSinupResponse | UnsuccessfulSinupResponse>
  > {
    try {
      return useFetch("/api/v1/users/")
        .post(userData)
        .json<SuccessfulSinupResponse | UnsuccessfulSinupResponse>();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  return { login, signup };
}
