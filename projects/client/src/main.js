import Vue from 'vue';

import App from "./App.vue";

import apolloProvider from './plugins/apollo.js'
import pinia from "./plugins/pinia.js";
import router from "./plugins/router.js";
import vuetify from './plugins/vuetify.js'

const app = new Vue({
  apolloProvider,
  pinia,
  router,
  vuetify,
  render: (h) => h(App),
})

app.$mount("#app");
