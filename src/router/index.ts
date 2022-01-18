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
  {
    path: "/landing",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/assessment/view",
    name: "ViewAssessment",
    component: () => import("../views/ViewAssessment.vue"),
  },
  {
    path: "/assessment",
    name: "NewAssessment",
    component: () => import("../views/Assessment.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("../views/Help.vue"),
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
      // if the user is going to a page that isn't the login page, check that they're logged in
      try {
        await store.dispatch("getUser");
        next();
      } catch (err: any) {
        // redirect to login page if the user is not signed in
        if (err.message === AuthError.NOT_SIGNED_IN) next("/login");
        else next("/");
      }
    }
  }
  next();
});

export default router;
