<template>
  <v-dialog v-model="dialog" max-width="640" persistent>
    <v-card>
      <v-card-title>Custom Server</v-card-title>
      <v-form v-model="valid">
        <v-card-text>
          <v-combobox
            v-model="server"
            @input.native="onChange"
            :items="storedServers"
            label="url"
            :rules="activeUrlRules"
          ></v-combobox>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" :disabled="!valid" @click="submit">Submit</v-btn>
          <v-btn text color="primary" @click="close">Close</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Server } from "@/models/auth";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

type Rule = (value: string) => boolean | string

@Component
export default class CustomServerDialog extends Vue {
  @Prop() dialog!: boolean;

  server = "";
  storedServers = [];
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
    else console.log("not valid");
  }

  @Emit("submit")
  emitSubmit() {
    console.log("submit:", this.server);
    return this.server;
  }
}
</script>
