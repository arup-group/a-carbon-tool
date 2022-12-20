<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title> Upload Excel data </v-card-title>
      <v-card-subtitle>
        <!-- TODO: Add spreadsheet download to this section -->
        Upload a new sheet of data. Structure the data in this format.
      </v-card-subtitle>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-text-field label="Name" v-model="name" />
          <p>Drag and drop to upload file</p>
          <div
            id="file"
            class="drag-drop-input"
            :class="{
              'grey lighten-2': dragover,
              'dark-mode-border': darkMode,
              'light-mode-border': !darkMode,
            }"
            @drop.prevent="onDrop($event)"
            @dragover.prevent="dragover = true"
            @dragenter.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
          >
            <!-- <input type="file" id="file" name="file" /> -->
            <!-- <v-file-input label="Input File" v-model="file" /> -->
            <!-- <label class="custom-file-upload">
              <input type="file" /> -->
            <!-- <v-btn type="file">Upload</v-btn> -->
            <!-- <div
                class="v-btn v-btn--outlined v-size--default button"
                :class="{ 'theme--dark': darkMode, 'theme--light': !darkMode }"
              >
                Or click to upload -->
            <!-- </div> -->
            <!-- </label> -->
            <!-- <span class="d-flex justify-center align-center">Or click to upload <v-file-input hide-input v-model="file" /></span> -->
            <v-btn outlined @click="handleFileImport" :loading="isSelecting" >Or click to upload</v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              @change="onFileChanged"
            />
          </div>
          <div v-if="files.length > 0">This is here????</div>
          <v-virtual-scroll
            v-if="files.length > 0"
            :items="files"
            height="64"
            item-height="64"
            :key="scrollKey"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item.name">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                    <span class="ml-3 text--secondary">
                      {{ item.size }} bytes</span
                    >
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn @click.stop="removeFile(item.name)" icon>
                    <v-icon> mdi-close-circle </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-virtual-scroll>
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

@Component
export default class ExcelImportDialog extends Vue {
  @Prop() dialog!: boolean;

  name = "";
  dragover = false;
  darkMode = window.localStorage.getItem("darkMode") === "true";
  file: File = {} as File;
  files: File[] = [];
  isSelecting = false;
  scrollKey = 0
//   $refs!: {

//   }

  @Watch("file", { deep: true })
  fileChange() {
    console.log("file:", this.file);
    if (this.file) this.files[0] = this.file;
    console.log("this.files:", this.files);
    this.scrollKey ++;
  }

  handleFileImport() {
    this.isSelecting = true;

    //After obtaining the focus when closing the FilePicker, return the button state to normal
    window.addEventListener(
      "focus",
      () => {
        this.isSelecting = false;
      },
      { once: true }
    );

    // Trigger click on the FileInput
    // this.$refs.uploader.click();
    (this.$refs.uploader as any).click();
  }

  onFileChanged(event: Event) {
    console.log("event:", event);
    console.log("file:", (event.target as any).files[0])
    this.file = (event.target as any).files[0];
    console.log("this.files:", this.files);
  }

  onDrop(event: DragEvent) {
    console.log("event:", event);
    this.dragover = false;

    console.log("files[0]:", event.dataTransfer?.files[0]);
    if (event.dataTransfer) this.files[0] = event.dataTransfer?.files[0];
  }

  removeFile() {
    this.files = [];
  }

  submit() {
    console.log("submit");
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>
<style scoped>
.drag-drop-input {
  width: 100%;
  height: 10rem;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dark-mode-border {
  border: 5px dotted white;
}
.light-mode-border {
  border: 5px dotted black;
}
.button {
  cursor: pointer;
}
input[type="file"] {
  display: none;
}
</style>
