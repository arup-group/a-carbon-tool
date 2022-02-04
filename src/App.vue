<template>
  <v-app>
    <Sidebar
      :li="isAuthenticated"
      :username="name"
      :darkModeButtonText="darkModeButtonText"
      :darkModeState="darkModeState"
      :drawer="drawer"
      @update:drawer="drawer = $event"
      :clipped="clipped"
      @toggleDarkMode="toggleDarkMode"
      @logout="logout"
      @toggleDrawer="toggleDrawer"
    />

    <Header
      :li="isAuthenticated"
      :drawer="drawer"
      :clipped="clipped"
      @toggleDrawer="toggleDrawer"
    />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Header from "./components/core/Header.vue";
import Sidebar from "./components/core/Sidebar.vue";

// ARC stuff
import "@arc-web/components/dist/themes/index.css";
import "@arc-web/components/dist/themes/light.css";
import "@arc-web/components/dist/themes/dark.css";

import "@arc-web/components/dist/components/container/arc-container.js";
import "@arc-web/components/dist/components/navbar/arc-navbar.js";

import { setBasePath } from "@arc-web/components/dist/utilities/base-path";
setBasePath("/");

import "@/assets/style.css";

@Component({
  components: { Header, Sidebar },
})
export default class App extends Vue {
  get name() {
    if (this.isAuthenticated) return this.$store.state.user.name;
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

  get darkModeButtonText() {
    return this.darkModeState ? "🌞" : "🌚";
  }

  get darkModeState() {
    return this.$store.state.darkMode;
  }

  drawer = false;
  clipped = true;

  toggleDrawer() {
    this.$data.drawer = this.$data.drawer ? false : true;
  }

  logout() {
    this.$store.dispatch("logout");
  }

  toggleDarkMode() {
    this.$store.dispatch("setDarkMode");
    this.$vuetify.theme.dark = this.$store.state.darkMode ? true : false;
  }
}
</script>
