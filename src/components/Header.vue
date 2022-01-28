<template>
  <!-- <arc-navbar slot="nav" logo="/assets/logo.svg" arup="false">
    <div slot="name">act | a carbon tool</div>
  </arc-navbar> -->
  <v-app-bar fixed app :clipped-left="clipped">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>act | a carbon tool</v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import "@arc-web/components/dist/components/button/arc-button.js";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() li!: boolean; // li = Logged In
  @Prop() drawer!: boolean;
  @Prop() clipped!: boolean;

  @Emit("toggleDrawer")
  toggleDrawer() {
    return;
  }

  @Emit("toggleClipped")
  toggleClipped() {
    return;
  }
}
</script>
