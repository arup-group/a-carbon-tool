<template>
  <arc-navbar slot="nav" logo="./assets/logo.svg" arup="false">
    <div slot="name">A Carbon Tool</div>
    <arc-button v-if="li" type="tab" color="secondary">Home</arc-button>
    <arc-button v-if="li" type="tab" color="secondary">About</arc-button>
    <arc-button v-if="li" type="tab" color="secondary">Help</arc-button>
    <arc-button v-if="li" type="tab" color="secondary">Log Out</arc-button>
    <arc-button v-if="li" size="large" type="tab">New Assessment</arc-button>
  </arc-navbar>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {
  @Prop() li!: boolean; // li = Logged In
}
</script>
