<template>
  <v-navigation-drawer
    v-if="li"
    :value="drawer"
    @input="$emit('update:drawer', $event)"
    clipped="clipped"
    app
    height="100vh"
    floating
    disable-route-watcher
    fixed
    temporary
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="/assets/logo.svg" contain alt="logo"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>{{ username }}</v-list-item-title>
      <v-btn icon @click.stop="toggleDrawer">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="changeRoute(item.route)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    <v-list dense style="position: absolute; bottom: 0; width: 100%">
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
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Sidebar extends Vue {
  @Prop() li!: boolean; // li = Logged In
  @Prop() username!: string;
  @Prop() darkModeButtonText!: string;
  @Prop() darkModeState!: boolean;
  @Prop() drawer!: boolean;
  @Prop() clipped!: boolean;

  @Emit("toggleDarkMode")
  toggleDarkMode() {
    return;
  }

  @Emit("logout")
  logout() {
    console.log(""); // method needs something in to avoid prettier rules, doesn't need to do anything, just emits
  }

  @Emit("toggleDrawer")
  toggleDrawer() {
    return;
  }

  changeRoute(newPath: string) {
    if (this.$route.path !== newPath) {
      this.$router.push(newPath);
    }
    return;
  }

  items = [
    {
      title: "New Assessment",
      icon: "mdi-molecule-co2",
      route: "/assessment",
    },
    { title: "Home", icon: "mdi-home", route: "/landing" },
    { title: "About", icon: "mdi-information-outline", route: "/about" },
  ];
}
</script>
