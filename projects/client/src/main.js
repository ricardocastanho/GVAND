import Vue from 'vue';

import App from "./App.vue";
import router from "./plugins/router.js";
import vuetify from './plugins/vuetify.js'

const app = new Vue({
  router,
  vuetify,
  render: (h) => h(App),
})

app.$mount("#app");
