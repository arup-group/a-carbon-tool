<template>
  <div>
    <v-btn :disabled="!canSave" @click="save" color="primary">Save</v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
@Component
export default class Menu7 extends Vue {
  @Prop() canSave!: boolean;

  @Emit("save")
  save() {
    return;
  }
}
</script>
