<template>
  <arc-navbar slot="nav" logo="/assets/logo.svg" arup="false">
    <div slot="name">act | a carbon tool</div>
    <arc-button
      v-if="li"
      type="tab"
      color="secondary"
      @click="$router.push('/landing')"
      >Home</arc-button
    >
    <arc-button
      v-if="li"
      type="tab"
      color="secondary"
      @click="$router.push('/about')"
      >About</arc-button
    >
    <arc-button v-if="li" type="tab" color="secondary">Help</arc-button>
    <arc-button v-if="li" type="tab" color="secondary" @click="logout"
      >Log Out</arc-button
    >
    <arc-button
      v-if="li"
      size="large"
      type="tab"
      @click="$router.push('/assessment')"
      >New Assessment</arc-button
    >
    <arc-button
      v-if="li"
      type="tab"
      color="secondary"
      @click="toggleDarkMode"
      >{{ darkModeButtonText }}</arc-button
    >
  </arc-navbar>
</template>

<script lang="ts">
import "@arc-web/components/dist/components/button/arc-button.js";

import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() li!: boolean; // li = Logged In
  @Prop() darkModeButtonText!: string;
  @Prop() darkModeState!: boolean;

  @Emit("logout")
  logout() {
    console.log(""); // method needs something in to avoid prettier rules, doesn't need to do anything, just emits
  }

  @Emit("toggleDarkMode")
  toggleDarkMode() {
    return;
  }
}
</script>
