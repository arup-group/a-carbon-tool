<template>
  <arc-sidebar
    slot="side"
    :title="username"
    v-if="li"
    :theme="this.$store.state.darkMode ? 'ACT-dark' : 'ACT-light'"
  >
    <arc-menu>
      <arc-menu-item v-if="li" @click="$router.push('/assessment')">
        <arc-icon
          name="note"
          slot="prefix"
          size="small"
          style="margin-right: 7px"
        ></arc-icon>
        New Assessment
      </arc-menu-item>
      <arc-menu-item @click="$router.push('/landing')">
        <arc-icon
          name="home"
          slot="prefix"
          size="small"
          style="margin-right: 7px"
        ></arc-icon>
        Home
      </arc-menu-item>
      <arc-menu-item @click="$router.push('/about')">
        <arc-icon
          name="info"
          slot="prefix"
          size="small"
          style="margin-right: 7px"
        ></arc-icon>
        About
      </arc-menu-item>
      <!-- <arc-menu-item>
        <arc-icon
          name="question"
          slot="prefix"
          size="small"
          style="margin-right: 7px"
        ></arc-icon>
        Help
      </arc-menu-item> -->
    </arc-menu>
    <arc-menu style="flex-shrink: 100">
      <!-- <arc-menu-item>
        <arc-icon
          name="settings"
          slot="prefix"
          size="medium"
          style="margin-right: 7px"
        ></arc-icon>
        Settings
      </arc-menu-item> -->
      <arc-button
        v-if="li"
        type="tab"
        size="small"
        style="width: 50%"
        @click="logout"
      >
        <arc-icon name="lock-open" slot="prefix" size="small"></arc-icon>Sign
        out</arc-button
      >
      <arc-button
        v-if="li"
        type="tab"
        size="small"
        style="width: 50%"
        @click="toggleDarkMode"
        >{{ darkModeButtonText }}
      </arc-button>
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
  @Prop() darkModeButtonText!: string;
  @Prop() darkModeState!: boolean;

  @Emit("toggleDarkMode")
  toggleDarkMode() {
    return;
  }

  @Emit("logout")
  logout() {
    console.log(""); // method needs something in to avoid prettier rules, doesn't need to do anything, just emits
  }
}
</script>
