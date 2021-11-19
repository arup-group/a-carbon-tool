<template>
  <v-app-bar app color="white">
    <v-toolbar-title class="d-flex align-center">
      <img class="mr-5" src="@/assets/logo.svg" />

      A Carbon Tool
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="loggedIn" class="d-flex align-center">
      <v-btn color="secondary" text>About</v-btn>
      <v-btn color="secondary" text>Help</v-btn>
      <v-btn color="secondary" text class="mr-2">Log Out</v-btn>
      <v-btn color="secondary" text>New Assessment</v-btn>
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
