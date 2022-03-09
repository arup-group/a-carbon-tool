<template>
  <v-app-bar v-if="li" fixed app :clipped-left="clipped">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title @click="changeRoute()">
      act (beta)
    </v-app-bar-title>
    <v-img src="/assets/logo.svg" height="48px" width='48px' class="ma-4" contain></v-img>
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


