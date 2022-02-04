<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title
          class="text-body-2 font-weight-bold"
          style="color: black"
        >
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="pa-4"
        v-html="message"
      ></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn color="grey" text class="body-2 font-weight-bold" @click="cancel"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          class="body-2 font-weight-bold"
          outlined
          @click="agree"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class ConfirmDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() message!: string;
  @Prop({ default: "Confirm" }) title!: string;

  dialogModel = this.dialog;

  @Emit("cancel")
  cancel() {
    return;
  }
  @Emit("agree")
  agree() {
    return;
  }
}
</script>
