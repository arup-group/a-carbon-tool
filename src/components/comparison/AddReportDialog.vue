<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title>Add reports</v-card-title>
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <div
            class="d-flex align-center"
            v-for="input in inputs"
            :key="input.id"
          >
            <v-select
              :rules="rules"
              :items="branches"
              v-model="input.model"
            ></v-select>
            <v-btn
              class="ml-2"
              v-if="inputs.length > 1"
              icon
              @click="removeModel(input.id)"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>

          <div class="d-flex justify-center" style="width: 100%">
            <v-btn
              v-if="canAdd"
              class="mx-2"
              fab
              dark
              outlined
              color="primary"
              @click="addInput"
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="pt-3">
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            class="body-2 font-weight-bold"
            @click="cancel"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            class="body-2 font-weight-bold"
            outlined
            type="submit"
            >OK</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import { AddReportInput } from "@/models/comparison";

@Component
export default class AddReportDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() branches!: string[];

  inputs: AddReportInput[] = [
    {
      id: Math.random(),
      model: "",
    },
  ];

  rules = [
    (v: string) =>
      this.inputs.length === 1 ||
      this.inputs.filter((i) => i.model !== v).length !== 0 ||
      "No duplicate branches",
    (v: string) => v !== "" || "Must select a branch",
  ];

  get canAdd() {
    return (
      this.inputs.length !== this.branches.length &&
      this.inputs[this.inputs.length - 1].model !== ""
    );
  }

  removeModel(id: number) {
    const input = this.inputs.find((i) => i.id === id);
    if (input) {
      this.inputs = this.inputs.filter((i) => i.id !== input.id);
    }
  }

  addInput() {
    this.inputs.push({ model: "", id: Math.random() });
  }

  @Emit("cancel")
  cancel() {
    return;
  }

  submit() {
    if ((this.$refs.form as any).validate()) this.agree();
    else console.log("no");
  }

  @Emit("agree")
  agree() {
    console.log("validate:", (this.$refs.form as any).validate());
    return this.inputs;
  }
}
</script>
