import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

import { userStates } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { id: { value: Uid }, token: { value: Authorization } } = userStates;
  if (to.path === "/") {
    next({ name: "login" })
  }
  if (!['login', 'register'].includes(to.name as string) && (!Authorization || !Uid)) {
    next({ name: 'login' });
  } /* else if (['login', 'register'].includes(to.name as string) && (Authorization && Uid)) {
    next({ name: (from.name as string) });
  } */ else {
    next();
  };
});

export default router
