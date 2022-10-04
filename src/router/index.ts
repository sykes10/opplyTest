import { createRouter, createWebHistory } from 'vue-router';
import SuppliersListView from '@/views/SuppliersListView.vue';
import { useUserStore } from '@/stores/user';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/suppliers',
    },
    {
      path: '/suppliers',
      name: 'SuppliersList',
      component: SuppliersListView,
    },
    {
      path: '/supplier/:id',
      name: 'SuppliersDetail',
      component: () => import('@/views/SuppliersDetailView.vue'),
    },
    {
      path: '/quotes',
      name: 'QuotesList',
      component: () => import('@/views/QuotesListView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/AuthView.vue'),
    },

    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/AuthView.vue'),
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const allowedPaths = ['/login', '/signup'];
  if (
    !userStore.$state.user.auth_token &&
    !allowedPaths.includes(to.fullPath)
  ) {
    return { name: 'Login' };
  }
});

export default router;
