<template>
  <div>
    <p>Menu7 working!</p>
    <v-btn :disabled="!canSave" @click="save" color="primary">Save</v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Menu7 extends Vue {
  @Prop() canSave!: boolean;

  @Emit("save")
  save() {
    return;
  }
}
</script>
