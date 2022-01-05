<template>
  <div>
    <p>Objects grouped by speckle_type</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Menu3 extends Vue {
  @Prop() transportTypes!: string[];
}
</script>
