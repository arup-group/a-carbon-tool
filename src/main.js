import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

// import comps
// NOTE: The VueMaterial in this is specially built to incroporate a fix
// to the router links. See https://github.com/vuematerial/vue-material/pull/1978
import VueMaterial from "vue-material";
import VueTimeago from "vue-timeago";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);

import VeLine from "v-charts/lib/line.common";
import VeRing from "v-charts/lib/ring.common";
import VeBar from "v-charts/lib/bar.common";
Vue.component(VeLine.name, VeLine);
Vue.component(VeRing.name, VeRing);
Vue.component(VeBar.name, VeBar);

Vue.use(VueTimeago, {
  locale: "en",
});

// Set up the server route.
let server = localStorage.getItem("server");
if (server) Store.state.server = server;

// set default server
Axios.defaults.baseURL = Store.state.server;

// Get the token, if any is present.
let token = localStorage.getItem("token");

// Start the init flow
Axios.get(Store.state.server)
  .then(response => {
    Store.state.serverManifest = response.data;
    return Axios.get(`${Store.state.server}/accounts?omit=logins`, {
      headers: {
        Authorization: token,
      },
    });
  })
  .then(response => {
    // means we're logged out
    if (response === null) {
      // TODO
      initApp();
      return;
    }
    // needs to log in
    if (response.status !== 200) {
      // TODO
      initApp();
      return;
    }
    // set defaults in axios, if we got this far things should be fine
    Axios.defaults.headers.common["Authorization"] = token;
    // update the store
    Store.state.isAuth = true;
    Store.state.user = response.data.resource;
    Store.state.token = token;

    initApp();
  })
  .catch(err => {
    initApp();
  });

// set axios as default $http request lib
Vue.prototype.$http = Axios;

// event bus used for triggerring events cross-hirearchy
window.bus = new Vue();

// get hex color from string global mixin
import CH from "color-hash";
let ColorHasher = new CH();
Vue.mixin({
  methods: {
    getHexFromString: str => ColorHasher.hex(str),
    numberWithCommas: x => x.toLocaleString(),
    chunk: (array, chunk) => {
      let i,
        j,
        chunks = [];
      for (i = 0, j = array.length; i < j; i += chunk) {
        chunks.push(array.slice(i, i + chunk));
      }
      return chunks;
    },
    processLargeArrayAsync: (array, fn, chunk, context) => {
      context = context || this;
      chunk = chunk || 100; // 100 elems at a time
      let index = 0;

      function doChunk() {
        let count = chunk;
        while (count-- && index < array.length) {
          fn.call(context, array[index], index, array);
          ++index;
        }
        if (index < array.length) setTimeout(doChunk, 0);
      }
      doChunk();
    },
    chunkArray: (arr, len) => {
      var chunks = [],
        i = 0,
        n = arr.length;
      len = len || 50;
      while (i < n) chunks.push(arr.slice(i, (i += len)));

      return chunks;
    },
  },
});

import EditableSpan from "./components/EditableSpan.vue";
Vue.component("editable-span", EditableSpan);

// The init logic (it's called after we do some auth flows)
let initApp = () => {
  new Vue({
    router: Router,
    store: Store,
    render: h => h(App),
  }).$mount("#app");
};
