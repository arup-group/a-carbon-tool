<template>
  <v-main>
    <LoginCard :servers="servers" @submit="logIn" @customServer="customLogIn"/>
  </v-main>
</template>

<script lang="ts">
import LoginCard from "@/components/LoginCard.vue";

import { Vue, Component } from "vue-property-decorator";

import { Server } from "@/models/server";

@Component({
  components: { LoginCard }
})
export default class Login extends Vue {
  servers: Server[] = this.$store.state.servers;

  errorMessage = '';
  showError = false;

  logIn(server: Server) {
    console.log("default login server:", server);
    try {
      let url = new URL(server.url);
      window.open(
          `${url.origin}/signin?redirectUrl=${window.encodeURIComponent(
            location.origin + "/signin/callback",
          )}`,
          "login screen",
          "height=700,width=800",
        );
    } catch(err: any) {
      this.errorMessage = err.message;
      this.showError = true;
    }
  }
  customLogIn(server: string) {
    console.log("cutom login url:", server);
    try {
      this.logIn({
        region: "",
        url: server,
        speckleId: "",
        speckleSecret: ""
        });
    } catch(err) {
      console.log(err);
    }
  }
}
</script>
