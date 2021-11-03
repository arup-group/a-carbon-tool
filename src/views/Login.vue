<template>
  <md-content
    class="md-layout md-alignment-center-center"
    style="min-height: 100vh"
  >
    <form
      class="md-layout-item md-size-33 md-small-size-100 md-medium-size-50"
      @submit.prevent="login"
      v-if="$store.state.isAuth === false"
    >
      <md-card class="md-elevation-3">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Login</div>
            <div class="md-caption">
              Do you want to
              <router-link to="/register">register</router-link>?
            </div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <md-radio v-model="isPredefined" :value="true"
            >Select server from list</md-radio
          >
          <md-radio v-model="isPredefined" :value="false"
            >Define server yourself</md-radio
          >
        </md-card-content>
        <md-card-content v-if="isPredefined">
          <md-field>
            <label>Select Region</label>
            <md-select v-model="server" md-dense>
              <md-option
                v-for="s in $store.state.servers"
                :value="s.url"
                :key="s.url"
                >{{ s.region }} - {{ s.url }}
              </md-option>
            </md-select>
          </md-field>
        </md-card-content>
        <md-card-content v-else>
          <md-field>
            <label>Define Server API address</label>
            <md-input
              type="url"
              v-model="server"
              name="server"
              @blur="checkServer"
            ></md-input>
          </md-field>
        </md-card-content>
        <md-card-actions v-if="!$store.state.isAuth">
          <md-button type="submit" class="md-primary md-raised"
            >Login</md-button
          >
        </md-card-actions>
        <br />
        <speckle-alert
          type="error"
          v-on:closed="showError = false"
          v-show="showError"
          >{{ errorMessage }}</speckle-alert
        >
      </md-card>
    </form>
    <md-card class="md-elevation-3" style="padding:20px" v-else>
      <md-card-content>You are logged in.</md-card-content>
    </md-card>
  </md-content>
</template>

<script>
import Axios from "axios";
import SpeckleAlert from "../components/SpeckleAlert.vue";

export default {
  name: "LoginView",
  components: {
    SpeckleAlert,
  },
  computed: {
    cachedServer() {
      return localStorage.getItem("server");
    },
  },
  watch: {
    server(newVal) {
      localStorage.setItem("server", newVal.toString());
      this.$store.state.server = newVal;
    },
  },
  data() {
    return {
      isPredefined: true,
      server: this.cachedServer || this.$store.state.servers[0].url,
      email: null,
      password: null,
      errorMessage: null,
      showError: false,
    };
  },
  methods: {
    login() {
      this.showError = false;
      let url = null;
      try {
        url = new URL(this.server);
        window.open(
          `${url.origin}/signin?redirectUrl=${window.encodeURIComponent(
            location.origin + "/#/signin/callback",
          )}`,
          "login screen",
          "height=700,width=800",
        );
      } catch (err) {
        this.errorMessage = err.message;
        this.showError = true;
      }
    },
    checkServer() {
      if (this.server && !this.server !== "" && !this.server.includes("api"))
        this.server += "/api";
      Axios.get(this.server)
        .then(res => {
          if (!res.data.hasOwnProperty("serverName"))
            throw new Error("Failed to get server.");
          this.errorMessage = ``;
          this.showError = false;
          this.$store.commit("SET_SERVER", this.server);
          this.$store.commit("SET_SERVER_DETAILS", res.data);
          localStorage.setItem("server", this.server);
          Axios.defaults.baseURL = this.server;
        })
        .catch(() => {
          this.errorMessage = `Server url is incorrect.`;
          this.showError = true;
        });
    },
  },
  mounted() {
    if (this.$store.state.servers.length) {
      this.server = this.$store.state.servers[0].url;
      this.checkServer();
    }
    if (this.$store.state.isAuth === true) {
      this.$router.push("/");
    }
  },
};
</script>
<style scoped lang="scss" />
