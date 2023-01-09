export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'BaseLayout',
    },
    component: () => import('./views/Index.vue'),
  }
]
