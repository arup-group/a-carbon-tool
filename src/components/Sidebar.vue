<template>
  <arc-sidebar slot="side" title="title">
    <arc-menu>
      <arc-menu-item
        value="home"
        aria-disabled="false"
        role="menuitem"
        tabindex="0"
      >
        <arc-icon name="home" slot="prefix" size="medium"></arc-icon>
        Home
      </arc-menu-item>
      <arc-menu-item
        value="messages"
        aria-disabled="false"
        role="menuitem"
        tabindex="-1"
      >
        <arc-icon name="speech" slot="prefix" size="medium"></arc-icon>
        Messages
      </arc-menu-item>
    </arc-menu>
    <arc-menu>
      <arc-menu-item
        value="settings"
        aria-disabled="false"
        role="menuitem"
        tabindex="0"
      >
        <arc-icon name="settings" slot="prefix" size="medium"></arc-icon>
        Settings
      </arc-menu-item>
    </arc-menu>
  </arc-sidebar>
</template>

<script lang="ts">
import "@arc-web/components/dist/components/button/arc-button.js";
import "@arc-web/components/dist/components/icon/arc-icon";
import "@arc-web/components/dist/components/sidebar/arc-sidebar";
import "@arc-web/components/dist/components/container/arc-container";

import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Sidebar extends Vue {
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
