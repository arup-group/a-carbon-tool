<template>
  <v-container
    class="d-flex justify-center align-center"
    :style="[
      this.$store.state.darkMode
        ? { 'background-color': '#121212 !important' }
        : { 'background-color': '#FFFFFF !important' },
    ]"
  >
    <v-card outlined class="align-center justify-center">
      <v-card-title>Login</v-card-title>
      <v-card-subtitle>Select server to connect to:</v-card-subtitle>
      <v-card-actions class="justify-center">
        <v-row dense>
          <v-col cols="12" align="center">
            <v-btn
              outlined
              color="secondary"
              class="mb-2"
              @click="signIn('xyz_server')"
            >
              Speckle XYZ
            </v-btn>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              outlined
              color="primary"
              class="mb-2"
              type="submit"
              @click="signIn('arup')"
            >
              Arup Staff
            </v-btn>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              outlined
              class="mb-4"
              type="submit"
              @click="openCustomServerDialog"
            >
              Custom server
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Server, Servers } from "@/models/auth/";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class LoginCard extends Vue {
  @Prop() servers!: Servers;

  @Emit("openCustomServerDialog")
  openCustomServerDialog() {
    return;
  }

  signIn(serverDestination: string) {
    if (serverDestination === "arup") {
      this.submit(this.servers.arup);
    } else if (serverDestination === "xyz_server") {
      this.submit(this.servers.xyz_server);
    }
  }

  @Emit("submit")
  submit(server: Server) {
    return server;
  }
}
</script>
