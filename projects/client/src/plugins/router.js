import Vue from "vue";
import VueRouter from "vue-router";

import routes from '../routes'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const userData = localStorage.getItem("user");

  if (!to.name) {
    next({ name: 'Login' });
    return;
  }

  if (userData && to.name === 'Login') {
    next({ name: 'MoviesIndex' });
    return;
  }

  if (!userData && to.name !== 'Login') {
    next({ name: 'Login' });
    return;
  }
  
  next();
});

export default router;
