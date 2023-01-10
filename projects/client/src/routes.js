export default [
  {
    path: "/",
    name: "Login",
    component: () => import("./views/Login.vue"),
  },
  {
    path: "/account/create",
    name: "CreateAccount",
    component: () => import("./views/account/Create.vue"),
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
