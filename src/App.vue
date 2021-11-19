<template>
  <v-app>
    <arc-container theme="light">
      <Header :loggedIn="loggedIn" />
      <v-main>
        <arc-button @click="test()" type="pill">this is a button</arc-button>
        <router-view />
      </v-main>
    </arc-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "./components/Header.vue";

// ARC stuff
import "@arc-web/components/dist/components/container/arc-container.js";
import '@arc-web/components/dist/components/button/arc-button.js';

import '@arc-web/components/dist/themes/light.css';

import { setBasePath } from "@arc-web/components/dist/utilities/base-path";
setBasePath("/");

@Component({
  components: { Header },
})
export default class App extends Vue {
  loggedIn = true;

  test() {
    console.log("the button has been clicked");
  }
}
</script>
