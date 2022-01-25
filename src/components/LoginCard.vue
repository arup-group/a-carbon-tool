<template>
  <v-container class="d-flex justify-center align-center">
    <v-card outlined>
      <div>
        <v-card-subtitle class="d-flex justify-center">
          Please select your server</v-card-subtitle
        >
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
</template>

<script lang="ts">
import { Server } from "@/models/auth/";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class LoginCard extends Vue {
  @Prop() servers!: { arup: Server; xyz: Server };

  signIn(serverDestination: string) {
    if (serverDestination === "arup") {
      //console.log(this.servers.arup);
      this.submit(this.servers.arup);
    } else if (serverDestination === "xyz") this.submit(this.servers.xyz);
  }

  @Emit("submit")
  submit(server: Server) {
    return server;
  }
}
</script>
