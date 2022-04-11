<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title>Report already exists</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitUpdate">
          <p class="mb-0">Update existing report</p>
          <v-select
            label="Existing reports"
            :items="branchNames"
            v-model="selectModel"
          />
          <v-btn type="submit">Update report</v-btn>
        </v-form>
        <v-form @submit.prevent="submitName" ref="form">
          <p class="pt-5 mb-0">Or create a new report</p>
          <v-text-field
            label="Branch name"
            v-model="newBranchModel"
            :rules="newBranchRules"
          ></v-text-field>
          <v-btn type="submit">New report</v-btn>
          {{ branchExistsError }}
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";

@Component
export default class NewBranchDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() branchNames!: string[];
  @Prop() reportName!: string;
  @Prop() branchExistsError!: boolean;
  selectModel: null | string = "main";
  newBranchModel = this.reportName;
  newBranchRules = [
    (v: string) => !this.branchExistsError || "branch name already exists",
  ];

  @Watch("reportName")
  reportNameUpdate(newVal: string) {
    this.newBranchModel = newVal;
  }

  @Watch("branchExistsError")
  branchExistsErrorUpdate() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  submitUpdate() {
    if (this.selectModel) this.updateBranch(this.selectModel);
  }
  submitName() {
    if (this.reportName) this.newBranch(this.newBranchModel);
  }

  @Emit("updateBranch")
  updateBranch(name: string) {
    return name;
  }

  @Emit("newBranch")
  newBranch(name: string) {
    return name;
  }
}
</script>
