export default [
  {
    path: '/login',
    name: 'login',
    // component: LoginView,
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue'),
  },
  {
    path: '/daily',
    name: 'daily',
    component: () => import('../views/DailyPage.vue'),
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/CalendarPage.vue'),
  },
  {
    path: '/annual',
    name: 'annual',
    component: () => import('../views/AnnualPage.vue'),
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/ChartPage.vue'),
  },
  {
    path: '/z',
    name: 'z',
    component: () => import('../views/ZView.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue'),
  // }
]