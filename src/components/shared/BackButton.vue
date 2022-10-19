<template>
  <v-btn @click="back" text class="mr-2">
    <v-icon> mdi-arrow-left </v-icon>
  </v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class BackButton extends Vue {
    @Prop() overrideRoute!: boolean; // if false, the component will handle the routing automatically, otherwise it will send an emit when clicked
  back() {
    if (!this.overrideRoute) {
        const route = this.$router.currentRoute.path;
        const splitRoute = route.split("/");
        let newRoute = splitRoute.slice(0, -1).join("/");
        newRoute = newRoute !== "" ? newRoute : "/";
        this.$router.push(newRoute);
    } else {
        this.emitBack();
    }
  }

  @Emit("back")
  emitBack() {
    return;
  }
}
</script>
