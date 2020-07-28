import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: () =>
  //     import(/* webpackChunkName: "index" */ "../views/index.vue"),
  // },
  {
    path: "/",
    name: "matter",
    component: () =>
      import(/* webpackChunkName: "matter" */ "../views/matter.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
