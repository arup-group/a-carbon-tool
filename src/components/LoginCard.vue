<template>
  <v-form ref="form" @submit.prevent="checkSubmit">
    <v-container class="d-flex justify-center align-center">
      <v-card outlined>
        <div>
          <v-card-subtitle class="d-flex justify-center"> Please select your server</v-card-subtitle>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" text type="submit" @click="signIn('arup')">
              arup Staff
            </v-btn>
            <v-btn color="secondary" text @click="signIn('xyz')">
              xyzServer
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Server } from "@/models/auth/";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class LoginCard extends Vue {
  @Prop() servers!: {arup: Server; xyz: Server;};

<<<<<<< HEAD
  signIn(serverDestination:string) {
    if (serverDestination === "arup") this.submit(this.servers.arup);
    else if (serverDestination === "xyz") this.submit(this.servers.xyz);
=======
  get items() {
    if (this.servers) {
      return this.servers.map((s) => {
        return {
          text: `${s.region} - ${s.url}`,
          value: s,
        };
      });
    } else {
      return [];
    }
  }

  checkSubmit() {
    if (this.model.region) {
      this.submit(this.model);
    }
>>>>>>> 06527efb2f9ca7f6ec2f6e1164b3d3282d3e9649
  }

  @Emit("submit")
  submit(server: Server) {
    return server;
  }
}
</script>
