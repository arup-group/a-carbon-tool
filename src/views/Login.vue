<template>
  <v-main>
    <LoginCard :servers="servers" @defaultServer="logIn" @customServer="customLogIn"/>
  </v-main>
</template>

<script lang="ts">
import LoginCard from "@/components/LoginCard.vue";

import { Vue, Component } from "vue-property-decorator";

import { Server } from "@/models/server";

@Component({
  components: { LoginCard }
})
export default class Login extends Vue {
  servers: Server[] = [
      {
        region: "UKIMEA",
        url: "https://uk.speckle.arup.com/api",
      },
      {
        region: "Europe",
        url: "https://ireland.speckle.arup.com/api",
      },
      {
        region: "Canada",
        url: "https://canada.speckle.arup.com/api",
      },
      {
        region: "Australia",
        url: "https://australia.speckle.arup.com/api",
      },
      {
        region: "East Asia",
        url: "https://hongkong.speckle.arup.com/api",
      },
    ];

  logIn(server: Server) {
    console.log("default login server:", server);
  }
  customLogIn(url: string) {
    console.log("cutom login url:", url);
  }
}
</script>
