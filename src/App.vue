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
    <v-main class="pt-4">
      <router-view />
    </v-main>
    <Footer :li="isAuthenticated" />

    <version-update-dialog :dialog="update" :version="version" @close="closeDialog" />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "./components/core/Header.vue";
import Sidebar from "./components/core/Sidebar.vue";
import Footer from "./components/core/Footer.vue";
import VersionUpdateDialog from "./components/core/VersionUpdateDialog.vue";
// ARC stuff
import "@arc-web/components/dist/themes/index.css";
import "@arc-web/components/dist/themes/light.css";
import "@arc-web/components/dist/themes/dark.css";
import "@arc-web/components/dist/components/container/arc-container.js";
import "@arc-web/components/dist/components/navbar/arc-navbar.js";
import { setBasePath } from "@arc-web/components/dist/utilities/base-path";

// posthog
import posthog from "posthog-js";
posthog.init(process.env.VUE_APP_POSTHOG, {
  api_host: "https://posthog.insights.arup.com",
});

setBasePath("/");

import "@/assets/style.css";

@Component({
  components: { Header, Sidebar, Footer, VersionUpdateDialog },
})
export default class App extends Vue {
  update = false;
  mounted() {
    // update = true if the version has updated since the user last came to the site and they have visited the site before
    const storedVersion = window.localStorage.getItem("version");
    this.update = storedVersion !== null && storedVersion !== this.$store.state.version;
  }

  get name(): string {
    if (this.isAuthenticated) return this.$store.state.user.name;
    return "";
  }
  get company(): string {
    return this.$store.state.serverInfo.company;
  }
  get serverName(): string {
    return this.$store.state.serverInfo.name;
  }
  get isAuthenticated(): boolean {
    return this.$store.getters.isAuthenticated;
  }
  get darkModeButtonText() {
    return this.darkModeState ? "🌞" : "🌚";
  }
  get darkModeState(): boolean {
    return this.$store.state.darkMode;
  }
  get version() {
    return this.$store.state.version;
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

  closeDialog() {
    window.localStorage.setItem("version", this.$store.state.version);
    this.update = false;
  }
}
</script>
