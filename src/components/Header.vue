<template>
  <v-app-bar v-if="li" fixed app :clipped-left="clipped">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>act | a carbon tool</v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
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
}
</script>
