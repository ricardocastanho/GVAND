export default [
  // Login
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/Login.vue"),
  },

  // Profile
  {
    path: "/profile/create",
    name: "ProfileCreate",
    component: () => import("./views/profile/Create.vue"),
  },
  {
    path: "/profile/update",
    name: "ProfileEdit",
    meta: {
      layout: "BaseLayout",
    },
    component: () => import("./views/profile/Update.vue"),
  },

  // Movies
  {
    path: "/movies",
    name: "MoviesIndex",
    meta: {
      layout: "BaseLayout",
    },
    component: () => import("./views/movies/Index.vue"),
  },
  {
    path: "/movies/:movieId",
    name: "MoviesDetail",
    props: true,
    meta: {
      layout: "BaseLayout",
    },
    component: () => import("./views/movies/_movieId/Index.vue"),
  },
  {
    path: "/search",
    name: "SearchIndex",
    props: true,
    meta: {
      layout: "BaseLayout",
    },
    component: () => import("./views/movies/search/Index.vue"),
  },
];
