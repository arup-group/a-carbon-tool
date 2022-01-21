<template>
  <arc-navbar slot="nav" logo="/assets/logo.svg" arup="false">
    <div slot="name">act | a carbon tool</div>
  </arc-navbar>
</template>

<script lang="ts">
import "@arc-web/components/dist/components/button/arc-button.js";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() li!: boolean; // li = Logged In
}
</script>
