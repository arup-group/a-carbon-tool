import store from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: '/signin/callback',
    name: 'signin-cb',
    component: () => import('../views/SigninCallback.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("thing");
  if (to.query.access_code) {
    console.log("contains access code");
    // If the route contains an access code, exchange it
    try {
      await store.dispatch("exchangeAccessCode", to.query.access_code);
    } catch(err) {
      console.warn("exchange failed", err);
    }
    // Whatever happens, go home.
    next("/");
  }
  next();
})

export default router;
