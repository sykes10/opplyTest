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
      path: "/auth",
      name: "Authentication",
      component: () => import("../views/AuthView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  if (!userStore.$state.user.token && to.fullPath !== "/auth") {
    return { name: "Authentication" };
  }
});

export default router;
