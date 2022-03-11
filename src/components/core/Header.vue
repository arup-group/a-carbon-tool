<template>
  <v-app-bar v-if="li" fixed app :clipped-left="clipped" elevation="0">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      act | a carbon tool &beta;
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="changeRoute()" class='mx-2'>
      <v-img height='24px' src="/assets/logo.svg" contain></v-img>
    </v-btn>
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

  changeRoute() {
    if (this.$route.path !== "/") this.$router.push("/");
    return;
  }
}
</script>


