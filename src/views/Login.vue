<template>
  <v-main>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-card
          flat
          border
          class="justify-center"
          :color="this.$store.state.darkMode ? '#121212' : ''"
        >
          <v-img src="/assets/logo.svg" max-height="160px" contain class="mt-8">
          </v-img>
          <v-card-title class="text-h4 justify-center">
            act | a carbon tool
            <v-btn
              icon
              color="primary"
              class="ml-1"
              @click.stop="declarationDialog = true"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle class="text-center pa-4"
            ><i>creating with conscience</i></v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="9" class="d-flex justify-center align-center">
        <LoginCard :servers="servers" @submit="logIn" @openCustomServerDialog="openCustomServerDialog" />
      </v-col>
      <v-col cols="12">
        <v-card flat :color="this.$store.state.darkMode ? '#121212' : ''">
          <v-card-actions class="justify-center">
            <v-btn
              icon
              x-large
              color="primary"
              href="https://github.com/arup-group/a-carbon-tool"
              target="_blank"
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-subtitle class="text-center">
            created by <strong>Arup</strong>
            <br />
            powered by <strong>Speckle</strong>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <declaration-dialog
      :dialog="declarationDialog"
      @close="closeDeclarationDialog"
    />
    <custom-server-dialog
      :dialog="customServerDialog"
      @submit="customLogin"
      @close="closeCustomServerDialog"
    />
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { Server, Servers } from "@/models/auth/";

import LoginCard from "@/components/login/LoginCard.vue";
import DeclarationDialog from "@/components/login/DeclarationDialog.vue";
import CustomServerDialog from "@/components/login/CustomServerDialog.vue";

@Component({
  components: { LoginCard, DeclarationDialog, CustomServerDialog },
})
export default class Login extends Vue {
  declarationDialog = window.localStorage.getItem("hide-dialog") !== "true";
  closeDeclarationDialog() {
    this.declarationDialog = false;
    window.localStorage.setItem("hide-dialog", "true");
  }

  servers: Servers = this.$store.state.servers;

  customLogin(server: string) {
    const s = this.servers.custom;
    s.url = server;
    this.logIn(s);
  }

  logIn(server: Server) {
    this.$store.dispatch("redirectToAuth", server);
  }

  customServerDialog = false;
  openCustomServerDialog() {
    this.customServerDialog = true;
  }
  closeCustomServerDialog() {
    this.customServerDialog = false;
  }
}
</script>
