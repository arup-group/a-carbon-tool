<template>
  <v-dialog v-model="dialog" max-width="640" persistent>
    <v-card>
      <v-card-title>Custom Server</v-card-title>
      <v-form v-model="valid" @submit.prevent="submit">
        <v-card-text>
          <p>
            Please enter the url of your Speckle server. Note: this feature
            currently only works with Arup Speckle servers
          </p>
          <v-combobox
            v-model="server"
            @input.native="onChange"
            :items="storedServers"
            label="url"
            :rules="activeUrlRules"
          ></v-combobox>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" :disabled="!valid" type="submit"
            >Submit</v-btn
          >
          <v-btn text color="primary" @click="close">Close</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { CustomServerStorage } from "@/models/auth";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

type Rule = (value: string) => boolean | string;

@Component
export default class CustomServerDialog extends Vue {
  @Prop() dialog!: boolean;

  lastServer = localStorage.getItem(CustomServerStorage.LAST_SERVER);

  server = this.lastServer ? this.lastServer.slice(1, -1) : "";
  get storedServers() {
    const customServers = localStorage.getItem(
      CustomServerStorage.CUSTOM_SERVERS
    );
    let customServersJson: string[]; // array of server urls
    if (customServers) customServersJson = JSON.parse(customServers);
    else customServersJson = [];
    return customServersJson;
  }
  valid = true;

  activeUrlRules: Rule[] = [];
  urlRules: Rule[] = [
    (value: string) => !!value || "Required",
    (value: string) => this.isURL(value) || "URL is not valid",
  ];
  onChange(e: any) {
    this.server = e.target.value;
  }

  isURL(str: string) {
    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  @Emit("close")
  close() {
    return;
  }

  submit() {
    this.activeUrlRules = this.urlRules;
    if (this.isURL(this.server)) this.emitSubmit();
  }

  @Emit("submit")
  emitSubmit() {
    if (this.server.endsWith("/")) this.server = this.server.slice(0, -1);
    return this.server;
  }
}
</script>
