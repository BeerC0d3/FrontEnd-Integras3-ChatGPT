import { RouteRecordRaw } from 'vue-router';
import { routes as authRoutes } from '../auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/app' },
      {
        path: 'app',
        component: () => import('pages/IndexPage.vue'),
        children: [
          {
            path: '',
            component: () => import('../pages/chat/Index.vue'),
          },
          {
            path: 'MyQuestion',
            component: () => import('../pages/chat/MyQuestion.vue'),
          },
          {
            path: 'MyChat',
            component: () => import('../pages/chat/MyChat.vue'),
          },

          // {
          //   path: 'auth',
          //   //component: () => import('pages/IndexPage.vue'),
          //   children: [
          //     {
          //       path: 'login',
          //       component: () => import('../auth/pages/Login.vue'),
          //     },
          //   ],
          // },
        ],
      },
      // {
      //   path: 'aut',
      //   component: () => import('pages/IndexPage.vue'),
      //   children: [
      //     {
      //       path: '',
      //       component: () => import('../pages/chat/Index.vue'),
      //     },
      //     {
      //       path: 'MyQuestion',
      //       component: () => import('../pages/chat/MyQuestion.vue'),
      //     },
      //   ],
      // },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default [...routes, ...authRoutes];
//export default routes;
