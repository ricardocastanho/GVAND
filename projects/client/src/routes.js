export default [
  {
    path: "/",
    name: "Login",
    component: () => import("./views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "BaseLayout",
    },
    component: () => import("./views/Dashboard.vue"),
  },
];
