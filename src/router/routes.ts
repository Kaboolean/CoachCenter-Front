import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/homepage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/homepage', component: () => import('pages/IndexPage.vue') },
      //admin
      {
        path: '/users',
        component: () => import('src/pages/users/UsersPage.vue'),
        meta: { requiredRoles: ['admin'] },
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
      //clients / coaches
      {
        path: '/account',
        component: () => import('src/pages/account/UserAccount.vue'),
      },
      {
        path: '/account/client/edit/:userId',
        name: 'edit-client',
        component: () => import('src/pages/account/EditAccountDetails.vue'),
        props: true,
      },
      //coaches
      {
        path: '/sessions/create',
        component: () => import('src/pages/coach/CreateSession.vue'),
        meta: { requiredRoles: ['coach'] },
      },
      {
        path: '/sessions/list',
        name: 'sessionsList',
        component: () => import('src/pages/coach/CoachSessions.vue'),
        children: [
          {
            path: '/sessions/list/:sessionId',
            name: 'check-session',
            component: () => import('src/pages/coach/CheckSession.vue'),
            props: true,
          },
          {
            path: '/sessions/list/edit/:sessionId',
            name: 'edit-session',
            component: () => import('src/pages/coach/EditSession.vue'),
            props: true,
          },
        ],
      },

      //clients
      {
        path: '/mysessions',
        component: () => import('src/pages/client/MySessions.vue'),
      },
      {
        path: '/sessions/find',
        component: () => import('src/pages/client/FindSession.vue'),
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

      //Contact page
      {
        path: '/contact',
        component: () => import('src/pages/contact/ContactForm.vue'),
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
