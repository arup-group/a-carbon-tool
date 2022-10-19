<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title>An error has occurred</v-card-title>
      <v-card-text>
        An error has occurred while loading this stream. Please either retry to
        load the stream, rerun a report on this stream, or contact one of the
        <b>act</b> team to solve this issue.
      </v-card-text>
      <v-card-actions>
        <v-btn outlined color="primary" @click="close">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class ErrorInfoDialog extends Vue {
  @Prop() dialog!: boolean;

  @Emit("close")
  close() {
    return;
  }
}
</script>
