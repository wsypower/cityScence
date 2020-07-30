import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index.vue"),
  },
  {
    path: "/matter",
    name: "matter",
    component: () =>
      import(/* webpackChunkName: "matter" */ "../views/matter.vue"),
  },
  {
    path: "/share",
    name: "share",
    component: () =>
      import(/* webpackChunkName: "share" */ "../views/share.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
