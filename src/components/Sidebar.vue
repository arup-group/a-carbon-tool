<template>
  <v-card>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ username }}</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toggleDarkMode">
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ darkModeButtonText }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
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

  data() {
    return {
      drawer: true,
      items: [
        {
          title: "New Assessment",
          icon: "mdi-molecule-co2",
          route: "/assessment",
        },
        { title: "Home", icon: "mdi-home", route: "/landing" },
        { title: "About", icon: "mdi-information-outline", route: "/about" },
      ],
      mini: true,
    };
  }
}
</script>
