<template>
  <v-app>
    <Sidebar
      :li="isAuthenticated"
      :username="name"
      :darkModeButtonText="darkModeButtonText"
      :darkModeState="darkModeState"
      :drawer="drawer"
      :clipped="clipped"
      :server="server"
      :version="version"
      @update:drawer="drawer = $event"
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

    <version-update-dialog
      :dialog="update"
      :version="version"
      @close="closeDialog"
    />

    <v-snackbar
      v-model="customRegionLoadingSnack"
      :timeout="snackBarTimeout"
      color="blue"
      right
    >
      <v-icon>
        mdi-information
      </v-icon>
      <span class="ml-2">{{ customRegionLoadingSnackText }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="closeCustomRegionSnack"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "./components/core/Header.vue";
import Sidebar from "./components/core/Sidebar.vue";
import Footer from "./components/core/Footer.vue";
import VersionUpdateDialog from "./components/core/VersionUpdateDialog.vue";

// posthog
import posthog from "posthog-js";
posthog.init(process.env.VUE_APP_POSTHOG, {
  api_host: "https://posthog.insights.arup.com",
});

import "@/assets/style.css";

@Component({
  components: { Header, Sidebar, Footer, VersionUpdateDialog },
})
export default class App extends Vue {
  update = false;
  customRegionLoadingSnack = false;
  snackBarTimeout = 3000;
  customRegionLoadingSnackText = "";
  alertCustomRegionLoading = false;
  mounted() {
    // update = true if the version has updated since the user last came to the site and they have visited the site before
    const storedVersion = window.localStorage.getItem("version");
    this.update = storedVersion !== this.$store.state.version;
    if (this.$route.name === "NewAssessment" || this.$route.name === "UpdateAssessment" || this.$route.name === "UpdateAssessmentBranch") {
      this.customRegionLoadingSnackText = "Loading custom regions...";
      this.alertCustomRegionLoading = true;
      this.customRegionLoadingSnack = true;
    }
    // using .then to avoid holding anything else up
    this.$store.dispatch("getCustomRegions").then(() => {
      if (this.alertCustomRegionLoading || this.$route.name === "NewAssessment") {
        this.customRegionLoadingSnackText = "Finished loading custom regions";
        this.customRegionLoadingSnack = true;
      }
    })
  }

  closeCustomRegionSnack() {
    this.customRegionLoadingSnack = false;
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
  get server() {
    if (
      this.$store.state.selectedServer &&
      this.$store.state.selectedServer.url
    )
      return this.$store.state.selectedServer.url
        .replace("https://", "")
        .replace("http://", "");
    else return "";
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
