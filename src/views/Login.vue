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
        <LoginCard :servers="servers" @submit="logIn" />
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
    <declaration-dialog :dialog="declarationDialog" @close="closeDeclarationDialog" />
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { Server } from "@/models/auth/";
import LoginCard from "@/components/login/LoginCard.vue";
import DeclarationDialog from "@/components/login/DeclarationDialog.vue";

@Component({
  components: { LoginCard, DeclarationDialog },
})
export default class Login extends Vue {
  declarationDialog = window.localStorage.getItem("hide-dialog") !== "true";
  closeDeclarationDialog() {
    this.declarationDialog = false;
    window.localStorage.setItem("hide-dialog", "true");
  }

  servers: { arup: Server; xyz_server: Server } = this.$store.state.servers;

  logIn(server: Server) {
    this.$store.dispatch("redirectToAuth", server);
  }
}
</script>
