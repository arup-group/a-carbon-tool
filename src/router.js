import base64url from 'base64url'
import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'

Vue.use(Router)

let myRouter = new Router({
  linkExactActiveClass: 'is-active',
  routes: [{
      path: '/',
      name: 'dashboard',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Dashboard.vue'),
    },
    {
      path: '/login/:redirectTo?',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signin/callback',
      name: 'signin-cb',
      component: () => import('./views/SigninCallback.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/methodology',
      name: 'methodology',
      component: () => import('./views/Methodology.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contacts.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('./views/UserHelp.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: () => import('./views/FAQs.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/carbon',
      name: 'carbon',
      component: () => import('./views/CarbonMain.vue'),
      children: [{
        name: 'calculator',
        path: 'calc/:streamIds?',
        component: () => import('./views/Calculator.vue'),
        meta: {
          requiresAuth: true
        },
      }, {
        name: 'reporter',
        path: 'report/:reportId?',
        component: () => import('./views/Report.vue'),
        meta: {
          requiresAuth: false
        },
      }]
    }
  ]
})

myRouter.afterEach((to, from) => {
  if (to.name === 'signin-cb') return

  let existingQueryObject = to.query.s ? JSON.parse(base64url.decode(to.query.s)) : {}
  if (existingQueryObject && existingQueryObject.server && existingQueryObject.server === Store.state.server)
    return

  if (Store.state.server)
    existingQueryObject.server = Store.state.server

  if (myRouter.$Countly) {
    myRouter.$Countly.q.push(['track_pageview', to.name])
  }

  myRouter.replace({
    params: to.params,
    query: {
      s: base64url(JSON.stringify(existingQueryObject))
    }
  })
})

myRouter.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (to.meta.requiresAuth === true && Store.state.isAuth === false)
      return next({
        path: '/login' + (to !== null ? "/" + window.btoa(to.path) : "")
      })
  }
  next()
})

export default myRouter
