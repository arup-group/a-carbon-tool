import { AuthError, Server } from "@/models/auth";
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
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/assessment/view/:streamId/:branchName",
    name: "ViewAssessment",
    component: () => import("../views/ViewAssessment.vue"),
  },
  {
    path: "/:streamId/history",
    name: "AssessmentHistory",
    component: () => import("../views/AssessmentHistory.vue"),
  },
  {
    path: "/assessment",
    name: "NewAssessment",
    component: () => import("../views/Assessment.vue"),
  },
  {
    path: "/assessment/:streamId/:branchName",
    name: "UpdateAssessmentBranch",
    component: () => import("../views/Assessment.vue"),
  },
  {
    path: "/assessment/:streamId",
    name: "UpdateAssessment",
    component: () => import("../views/Assessment.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/:streamId/comparison",
    name: "Comparison",
    component: () => import("../views/Comparison.vue"),
  },
  {
    path: "/:streamid",
    name: "StreamReports",
    component: () => import("../views/StreamReports.vue"),
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
        // if there is a redirect path set then move the user there
        const redirectPath = localStorage.getItem("redirect-path");
        if (redirectPath !== null && redirectPath !== "") {
          localStorage.setItem("redirect-path", "");
          next(redirectPath);
        }
        next();
      } catch (err: any) {
        // redirect to login page if the user is not signed in
        if (err.message === AuthError.NOT_SIGNED_IN) {
          if (to.name === "ViewAssessment") {
            const { server } = to.query;

            if (server) {
              let fullReportServer = {} as Server;
              let serverSet = false;
              Object.values(
                store.state.servers as { [server: string]: Server }
              ).forEach((s) => {
                if (s.url === server) {
                  fullReportServer = s;
                  serverSet = true;
                }
              });
              if (!serverSet) {
                fullReportServer = store.state.servers.custom;
                fullReportServer.url = server as string;
              }

              localStorage.setItem("redirect-path", to.fullPath);

              store.dispatch("redirectToAuth", fullReportServer);
              next();
            }
          }
          next("/login");
        } else next("/");
      }
    }
  }
  next();
});

export default router;
