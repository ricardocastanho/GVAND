export default [
  {
    path: "/",
    name: "Login",
    meta: {
      layout: "BlankLayout",
    },
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
