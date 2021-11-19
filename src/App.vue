<template>
  <v-app>
    <Header :loggedIn="loggedIn" />
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
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "./components/Header.vue";

@Component({
  components: { Header }
})
export default class App extends Vue {
  loggedIn = false;
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
