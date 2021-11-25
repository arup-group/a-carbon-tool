<template>
  <v-app style="height: 100vh">
    <arc-container theme="ACT-light" style="height:100%">
    <Header :li="isAuthenticated" />
    <v-main>
      <div v-if="isAuthenticated">
        Welcome
        <b>{{ name }}</b>
        ! You are connected to
        <b>
          {{ company }}'s
          <em>{{ serverName }}</em>
        </b>
        <v-btn @click="logout">logout</v-btn>
      </div>
      <router-view/>
    </v-main>
    </arc-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "./components/Header.vue";

// ARC stuff
import "@arc-web/components/dist/themes/index.css";
import "@arc-web/components/dist/themes/light.css";

import "@arc-web/components/dist/components/container/arc-container.js";
import "@arc-web/components/dist/components/button/arc-button.js";
import "@arc-web/components/dist/components/navbar/arc-navbar.js";

import { setBasePath } from "@arc-web/components/dist/utilities/base-path";
setBasePath("/");

import "@/assets/style.css";

@Component({
  components: { Header },
})
export default class App extends Vue {
  get name() {
    if (this.isAuthenticated)
      return this.$store.state.user.name;
    return "";
  }
  get company() {
    return this.$store.state.serverInfo.company;
  }
  get serverName() {
    return this.$store.state.serverInfo.name;
  }

  get isAuthenticated() {
    return this.$store.getters.isAuthenticated;
  }

  logout() {
    this.$store.dispatch("logout");
  }
}
</script>
