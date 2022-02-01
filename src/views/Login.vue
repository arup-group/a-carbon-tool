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
          <v-card-title class="text-h4 justify-center"
            >act | a carbon tool</v-card-title
          >
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
              large
              href="https://github.com/arup-group/a-carbon-tool"
              target="_blank"
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-subtitle class="text-center">
            created by <strong>Arup</strong>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import LoginCard from "@/components/LoginCard.vue";

import { Vue, Component } from "vue-property-decorator";

import { Server } from "@/models/auth/";

@Component({
  components: { LoginCard },
})
export default class Login extends Vue {
  servers: { arup: Server; xyz: Server } = this.$store.state.servers;

  logIn(server: Server) {
    this.$store.dispatch("redirectToAuth", server);
  }
}
</script>
