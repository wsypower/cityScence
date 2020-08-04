import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    router: "/",
  },
  mutations: {
    changeRouter(state, routers) {
      state.router = routers;
    },
  },
  actions: {},
  modules: {},
});
