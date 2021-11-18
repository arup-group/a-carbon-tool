<template>
  <v-form ref="form" @submit.prevent="checkSubmit" v-model="valid">
    <v-container class="d-flex justify-center align-center">
      <v-card style="width: 50%">
        <v-card-title class="">Log In</v-card-title>
        <v-card-subtitle class="text--primary">
          Define the Speckle server you wish to connect to
        </v-card-subtitle>
        <v-card-text>
          <v-select
            v-model="model"
            :items="items"
            label="Select server"
            :rules="rules"
          ></v-select>
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
import { Server } from "@/models/auth/";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

type Rule = (s: string) => boolean | string;

@Component({})
export default class LoginCard extends Vue {
  @Prop() servers!: Server[];
  model: Server = {} as Server;
  valid = false;

  emptyRule: Rule = (s) => s !== "" || "Please select an option";

  rules: Rule[] = [this.emptyRule];

  get items() {
    if (this.servers) {
      return this.servers.map((s) => {
        return {
          text: `${s.region} - ${s.url}`,
          value: s
        }
      });
    } else {
      return [];
    }
  }

  checkSubmit() {
    if (this.model.region) {
      this.submit(this.model);
    }
  }

  @Emit("submit")
  submit(server: Server) {
    return server;
  }
}
</script>
<style scoped>
.subtitle {
  font-size: 1rem;
}
</style>
