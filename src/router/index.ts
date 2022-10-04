import { createRouter, createWebHistory } from "vue-router";
import SuppliersListView from "../views/SuppliersListView.vue";
import { useUserStore } from "@/stores/user";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "SuppliersList",
      component: SuppliersListView,
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/AuthView.vue"),
    },

    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/AuthView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const allowedPaths = ["/login", "/signup"];
  if (
    !userStore.$state.user.auth_token &&
    !allowedPaths.includes(to.fullPath)
  ) {
    return { name: "Login" };
  }
});

export default router;
