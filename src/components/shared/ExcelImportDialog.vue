<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title> Upload Excel data </v-card-title>
      <v-card-subtitle>
        <!-- TODO: Add spreadsheet download to this section -->
        Upload a new sheet of data. Structure the data in this format.
      </v-card-subtitle>
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <drag-drop-input v-model="file" :darkMode="darkMode" />
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit">Submit</v-btn>
          <v-btn @click="close">Close</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import DragDropInput from "./DragDropInput.vue";

@Component({
  components: { DragDropInput },
})
export default class ExcelImportDialog extends Vue {
  @Prop() dialog!: boolean;

  darkMode = window.localStorage.getItem("darkMode") === "true";
  name = "";
  file: File = {} as File;

  nameRules = [
    (n: string) => n != "" || "Must include a name"
  ];

  submit() {
    console.log("submit");
    if ((this.$refs.form as any).validate() && this.file.name) {
      console.log("name:", this.name);
      console.log("file:", this.file);
    } else {
      console.log("invalid")
    }
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>
