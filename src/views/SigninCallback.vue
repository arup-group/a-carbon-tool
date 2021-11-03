<template>
  <md-content
    class="md-layout md-alignment-center-center"
    style="min-height: 100vh"
  >
    <md-card class="md-elevation-3">
      <md-card v-if="showError">
        <md-card-header>
          <div class="md-title">Fail...</div>
        </md-card-header>
        <md-card-content>{{ errorMessage }}</md-card-content>
      </md-card>

      <md-card v-if="!showError">
        <md-card-header>
          <div class="md-title">Redirecting...</div>
        </md-card-header>
        <md-card-content>Please wait</md-card-content>
      </md-card>
    </md-card>
  </md-content>
</template>

<script>
export default {
  name: "SigninViewCallback",
  components: {},
  computed: {},
  watch: {},
  data() {
    return {
      server: null,
      errorMessage: null,
      showError: false,
      sslProblem: false,
    };
  },
  methods: {},
  activated() {
    if (this.$store.state.isAuth === true) {
      return this.$router.push("/");
    }
    let conn = window.decodeURIComponent(this.$route.query.token);
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
            "omit=objects,layers&isComputedResult=false&sort=updatedAt",
          );
          this.$router.push("/"); // TODO: Check redirect (?)
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err;
          this.showError = true;
        });
    }
  },
};
</script>

<style scoped />
