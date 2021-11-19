<template>
  <v-card
    class="overflow-hidden"
    height="64"
  >
    <v-app-bar
      color='background'
    >
      <v-img class="mr-5" src="@/assets/logo.svg" height='64px' max-width='64px' contain/>
      <v-toolbar-title class="d-flex align-center">
        a carbon tool
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="loggedIn" class="d-flex align-center">
        <v-btn color="secondary" text>About</v-btn>
        <v-btn color="secondary" text>Help</v-btn>
        <v-btn color="secondary" text class="mr-2">Log Out</v-btn>
        <v-btn color="secondary" text>New Assessment</v-btn>
      </div>
    </v-app-bar>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
  @Prop() loggedIn!: boolean;
}
</script>
