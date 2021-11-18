<template>
  <v-app>
    <Header :loggedIn="loggedIn" />
    <v-main>
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
  loggedIn = this.$store.state.isAuth;
}
</script>
