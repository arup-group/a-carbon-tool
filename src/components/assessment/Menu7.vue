<template>
  <div>
    <div>
      <v-btn :disabled="!canSave" @click="checkSave" color="primary"
        >Save</v-btn
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
@Component
export default class Menu7 extends Vue {
  @Prop() canSave!: boolean;

  @Emit("checkSave")
  checkSave() {
    return;
  }
}
</script>
