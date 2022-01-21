<template>
  <arc-sidebar
    slot="side"
    :title="username"
    v-if="li"
    style="--sidebar-width: clamp(15rem, 10%, var(--arc-sidebar-width))"
  >
    <arc-menu>
      <arc-menu-item @click="$router.push('/landing')">
        <arc-icon name="home" slot="prefix" size="small"></arc-icon>
        Home
      </arc-menu-item>
      <arc-menu-item @click="$router.push('/about')">
        <arc-icon name="info" slot="prefix" size="small"></arc-icon>
        About
      </arc-menu-item>
      <arc-menu-item>
        <arc-icon name="question" slot="prefix" size="small"></arc-icon>
        Help
      </arc-menu-item>
    </arc-menu>
    <arc-menu>
      <arc-menu-item>
        <arc-icon name="settings" slot="prefix" size="medium"></arc-icon>
        Settings
      </arc-menu-item>
      <arc-menu-item v-if="li" @click="logout">
        <arc-icon name="lock-open" slot="prefix" size="medium"></arc-icon>Sign
        out</arc-menu-item
      >
    </arc-menu>
  </arc-sidebar>
</template>

<script lang="ts">
import "@arc-web/components/dist/components/button/arc-button.js";
import "@arc-web/components/dist/components/icon/arc-icon.js";
import "@arc-web/components/dist/components/sidebar/arc-sidebar.js";
import "@arc-web/components/dist/components/container/arc-container.js";
import "@arc-web/components/dist/components/menu/arc-menu.js";
import "@arc-web/components/dist/components/menu-item/arc-menu-item.js";

import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Sidebar extends Vue {
  @Prop() li!: boolean; // li = Logged In
  @Prop() username!: string;

  @Emit("logout")
  logout() {
    console.log(""); // method needs something in to avoid prettier rules, doesn't need to do anything, just emits
  }
}
</script>
