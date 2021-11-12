<template>
  <v-main
    class=""
    style="min-height: 100vh"
  >
  <v-container class="d-flex justify-center align-center">
    <v-card style="width: 50%">
      <v-card v-if="showError">
        <v-card-title>
          Fail...
        </v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
      </v-card>

      <v-card v-if="!showError">
        <v-card-title>
          Redirecting...
        </v-card-title>
        <v-card-text>Please wait</v-card-text>
      </v-card>
    </v-card>
  </v-container>
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class SigninCallback extends Vue {
  server = null;
  errorMessage = null;
  showError = false;
  sslProblem = false;

  mounted() {
    let token = this.$route.query.token as string;
    let conn = window.decodeURIComponent(token);
    let jwt = conn.split(":::")[0];
    let server = localStorage.getItem("server") || this.$store.state.server;
    if (server) {
      let url = new URL(server);
      if (url.protocol !== "https") {
        this.sslProblem = true;
      }
      this.$store
        .dispatch("authenticate", { server: server, token: jwt })
        .then(() => {
          this.$store.dispatch(
            "getStreams",
            "omit=objects,layers&isComputedResult=false&sort=updatedAt"
          );
          this.$router.push("/"); // TODO: Check redirect (?)
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = err;
          this.showError = true;
        });
    }
  }
}
</script>
