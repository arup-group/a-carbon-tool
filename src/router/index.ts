import { AuthError } from "@/models/auth";
import store from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.query.access_code) {
    // If the route contains an access code, exchange it
    try {
      await store.dispatch("exchangeAccessCode", to.query.access_code);
    } catch (err) {
      console.warn("exchange failed", err);
    }
    // Whatever happens, go home.
    next("/");
  } else {
    if (to.name !== "Login") {
      try {
        const goto = await store.dispatch("getUser");
        next();
      } catch (err: any) {
        if (err.message === AuthError.NOT_SIGNED_IN) next("/login");
        else next("/")
      }
    }
  }
  next();
});

export default router;
