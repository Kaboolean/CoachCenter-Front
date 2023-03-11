import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/IndexPage.vue') },
      {
        path: '/users',
        component: () => import('src/pages/users/UsersPage.vue'),
        children: [
          {
            name: 'user-create',
            path: 'create',
            component: () => import('src/pages/users/CreateUserPage.vue'),
          },
          {
            name: 'user-edit',
            path: ':userId',
            component: () => import('src/pages/users/EditUserPage.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/account',
        component: () => import('src/pages/account/UserAccount.vue'),
      },
      //auth
      {
        path: '/login',
        component: () => import('src/pages/auth/LoginPage.vue'),
      },
      {
        path: '/register',
        component: () => import('src/pages/auth/RegisterPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
