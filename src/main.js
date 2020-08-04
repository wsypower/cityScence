import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/font/iconfont.css";
// ie polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";
import service from "@/api/axios.js";
Vue.use(service);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
