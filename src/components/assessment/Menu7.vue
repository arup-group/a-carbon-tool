<template>
  <div>
    <div>
      <v-btn :style="colStyle" :disabled="!canSave" @click="checkSave"
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
  @Prop() colStyle!: any;

  @Emit("checkSave")
  checkSave() {
    return;
  }
}
</script>
