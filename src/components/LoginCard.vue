<template>
  <v-form @submit.prevent="checkSubmit" v-model="valid">
    <v-container class="d-flex justify-center align-center">
      <v-card style="width: 50%">
        <v-card-title class="">Log In</v-card-title>
        <v-card-subtitle class="text--primary">
          Define the Speckle server you wish to connect to
        </v-card-subtitle>
        <v-card-text>
          <v-combobox
            v-model="model"
            :items="items"
            label="Select from existing or define"
            :rules="rules"
            :error="showError"
            :error-messages="errorMessage"
          ></v-combobox>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" text type="submit" :disabled="!valid">
            Log In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { Server } from "@/models/server";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import Axios from "axios";

type Rule = (s: string) => boolean | string;

@Component({})
export default class LoginCard extends Vue {
  @Prop() servers!: Server[];
  model = "";
  valid = false;

  errorMessage = "";
  showError = false;

  defaultCheck: Rule = (s) => {
    console.log("rule checking...", s);
    let [region, url] = s.split(" - ");
    if (url) {
      let server: Server = {
        region,
        url,
      };
      let contained = false;
      this.servers.forEach((s) => {
        if (s.region === server.region && s.url === server.url) {
          contained = true;
        }
      });
      if (contained) {
        // if the user has used one of the default servers, return it
        return true;
      } else {
        // if the user has messed with one of the default servers, something should be done here, probably throw an error
        return false || "Remove region to change default";
      }
    } else {
      return true;
    }
  };
  emptyRule: Rule = (s) => s !== "" || "Input cannot be empty";

  isURL: Rule = (s) => {
    let [region, url] = s.split(" - ");
    if (url) {
      return true;
    } else {
      try {
        // below will throw an error if the url is not valid
        let url = new URL(s);
        return true;
      } catch (e) {
        return false || "Not valid URL";
      }
    }
  };

  rules: Rule[] = [this.defaultCheck, this.emptyRule, this.isURL];

  get items() {
    if (this.servers) {
      return this.servers.map((s) => `${s.region} - ${s.url}`);
    } else {
      return [];
    }
  }

  async checkServer(server: string) {
    if (server && server !== "" && !server.includes("api")) server += "/api";
    try {
      let res = await Axios.get(server);
      if (!Object.prototype.hasOwnProperty.call(res.data, "serverName"))
        return false;
      this.errorMessage = ``;
      this.showError = false;
      Axios.defaults.baseURL = server;
      return true;
    } catch (err) {
      return false;
    }
  }

  async checkSubmit() {
    let [region, url] = this.model.split(" - ");
    if (url) {
      // if the user has inputted a default server. The rule `defaultCheck` makes sure this has happened
      this.submit({
        region,
        url,
      });
    } else {
      // if the user has inputted their own server, TODO make something happen
      try {
        let check = await this.checkServer(this.model);
        if (check)
          this.submit({
            region: "",
            url: this.model,
          });
        else {
          this.showError = true;
          this.errorMessage = "Server problem";
        }
      } catch (err) {
        console.error("err:", err);
      }
    }
  }

  @Emit("submit")
  submit(server: Server) {
    return server.url;
  }
}
</script>
<style scoped>
.subtitle {
  font-size: 1rem;
}
</style>
