import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/matter",
    name: "matter",
    component: () => import("../views/matter.vue"),
  },
  {
    path: "/share",
    name: "share",
    component: () => import("../views/share.vue"),
  },
  {
    path: "/project",
    name: "project",
    alias: "/share",
    component: () => import("../views/share.vue"),
  },
  {
    path: "/gx",
    name: "gx",
    component: () => import("../views/gx.vue"),
  },
];

const router = new VueRouter({
  routes,
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
