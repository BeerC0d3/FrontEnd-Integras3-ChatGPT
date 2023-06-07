export default [
  {
    path: '/admin',
    component: () => import('../layouts/LayoutLogin.vue'),
    children: [
      {
        name: 'Page Login',
        path: 'login',
        component: () => import('../pages/Login.vue'),
      },
      {
        path: 'scroll',
        component: () => import('../pages/scroll.vue'),
      },
      {
        path: 'dashboard',
        component: () => import('../layouts/MainLayout.vue'),
        // meta: { requireLogin: true },
        children: [
          {
            path: '',
            component: () => import('../pages/IndexPage.vue'),
            // meta: { requireLogin: true },
            children: [
              {
                path: '',
                component: () => import('../pages/Welcome.vue'),
                // meta: { requireLogin: true },
              },
              {
                path: 'context-add-edit',
                component: () => import('../pages/ContextSupportAddEdit.vue'),
                // meta: { requireLogin: true },
              },
            ],
          },
        ],
      },
    ],
  },
];
