<template>
    <v-app-bar
      app
      color="white"
    >
      <v-toolbar-title class="d-flex align-center">
          <!-- div to be replaced with svg of logo -->
        <div class="logo">CAP</div>

        Carbon Assessment Platform
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="loggedIn" class="d-flex align-center">
          <v-btn color="primary" text>Home</v-btn>
          <v-btn color="primary" text>About</v-btn>
          <v-btn color="primary" text>Help</v-btn>
          <v-btn color="primary" text class="mr-2">Log Out</v-btn>
          <v-btn color="primary" text>New Assessment</v-btn>
      </div>
    </v-app-bar>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
    @Prop() loggedIn!: boolean;
}
</script>
<style scoped>
.logo {
    color: #2962B2;
    font-size: 1.5rem;
    padding-right: 0.75rem;
}
</style>
