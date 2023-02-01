<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title> Upload Excel data </v-card-title>
      <v-card-subtitle>
        Upload a new sheet of data. Structure the data in <a href="assets\excel\test input spreadsheet.xlsx">this format</a>.
      </v-card-subtitle>
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <drag-drop-input v-model="file" :darkMode="darkMode" :excelFileValid="excelFileValid" />
          <v-checkbox
            v-model="saveToSpeckle"
            label="Save to speckle for future reports"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" :loading="loading">Submit</v-btn>
          <v-btn @click="close" :disabled="loading">Close</v-btn>
        </v-card-actions>
      </v-form>
      <v-overlay
        absolute
        :value="overlay"
        opacity="0.9"
      >
        <div class="d-flex flex-column justify-center align-center">
          <p>Success!</p>
          <div class="d-flex justify-space-around">
            <v-btn @click="removeOverlay" class="mr-4">Got it!</v-btn>
            <v-btn @click="close">Close</v-btn>
          </div>
        </div>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import DragDropInput from "./DragDropInput.vue";

import * as XLSX from "xlsx";
import * as ExcelImportUtils from "@/views/utils/ExcelImportUtils";
import { materialCarbonFactors } from "@/store/utilities/material-carbon-factors";
import { SaveNewRegionInput } from "@/store";

@Component({
  components: { DragDropInput },
})
export default class ExcelImportDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() streamId!: string;

  darkMode = window.localStorage.getItem("darkMode") === "true";
  name = "";
  file: File = {} as File;
  saveToSpeckle = true;
  excelFileValid = true;
  loading = false;
  overlay = false;

  nameRules = [
    (n: string) => n != "" || "Must include a name"
  ];

  removeOverlay() {
    if (this.dialog && this.overlay) this.overlay = false;
  }

  submit() {
    if ((this.$refs.form as any).validate() && this.file.name) {
      this.loading = true;
      var reader = new FileReader();
      // eslint-disable-next-line
      var vm = this;
      reader.onload = async function(e) {
        vm.excelFileValid = true;
        let worksheet = ExcelImportUtils.excelToJson(e);
        let excelData = ExcelImportUtils.verify(XLSX.utils.sheet_to_json(worksheet));
        if (excelData) {
          let regionName = `${vm.name} (${vm.streamId})`;
          let formatted = ExcelImportUtils.convertToStateMaterial(excelData, regionName);
          materialCarbonFactors[regionName] = formatted;
          vm.$store.commit("addRegion", regionName);
          if (vm.saveToSpeckle) {
            const input: SaveNewRegionInput = {
              name: regionName,
              streamid: vm.streamId,
              data: excelData
            }

            await vm.$store.dispatch("saveNewRegion", input);
          }
          vm.overlay = true;
          vm.loading = false;
        } else {
          vm.excelFileValid = false;
          vm.loading = false;
        }

        return excelData;
      };
      reader.readAsArrayBuffer(this.file);
    }
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>
