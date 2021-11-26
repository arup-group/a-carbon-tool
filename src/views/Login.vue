<template>
  <v-main>
    <LoginCard :servers="servers" @submit="logIn" />
  </v-main>
</template>

<script lang="ts">
import LoginCard from "@/components/LoginCard.vue";

import { Vue, Component } from "vue-property-decorator";

import { Server } from "@/models/auth/";

@Component({
  components: { LoginCard }
})
export default class Login extends Vue {
  servers: Server[] = this.$store.state.servers;

  logIn(server: Server) {
    this.$store.dispatch("redirectToAuth", server);
  }
}
</script>
