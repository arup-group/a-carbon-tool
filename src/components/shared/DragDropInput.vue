<template>
  <div>
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
      <v-btn outlined @click="handleFileImport" :loading="isSelecting">
        Or click to upload
      </v-btn>
      <!-- Hide the below file input, the button above will trigger it to add a new file -->
      <input
        ref="uploader"
        class="d-none"
        type="file"
        @change="onFileChanged"
      />
    </div>
    <p v-if="fileTypeError" style="color: red">File must be of type .xlsx</p>
    <v-list-item v-if="file.name">
      <v-list-item-content>
        <v-list-item-title>
          {{ file.name }}
          <span class="ml-3 text--secondary"> {{ file.size }} bytes</span>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn @click.stop="removeFile(file.name)" icon>
          <v-icon> mdi-close-circle </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class DragDropInput extends Vue {
  @Prop() value!: File;
  @Prop() darkMode!: boolean;

  @Watch("value", { deep: true })
  valueChange() {
    this.file = this.value;
    this.fileChange();
  }

  dragover = false;
  file: File = this.value || ({} as File);
  isSelecting = false;
  fileTypeError = false;

  // would normally make this an @Watch, but that isn't working for some reason
  fileChange() {
    if (this.file.name && this.file.name.split(".").pop() !== "xlsx") {
      this.file = {} as File;
      this.fileTypeError = true;
    } else {
      this.fileTypeError = false;
      if (!(this.file && this.file.name)) {
        // reset the hidden file input so new files can be added
        (this.$refs.uploader as any).value = "";
      }
      this.emitFile();
    }
  }

  @Emit("input")
  emitFile() {
    return this.file;
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
    (this.$refs.uploader as any).click();
  }

  onFileChanged(event: Event) {
    this.file = (event.target as any).files[0];
    this.fileChange();
  }

  onDrop(event: DragEvent) {
    this.dragover = false;

    if (event.dataTransfer) this.file = event.dataTransfer?.files[0];

    this.fileChange();
  }

  removeFile() {
    this.file = {} as File;

    this.fileChange();
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
