<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card height="50%">
      <v-card-title>Diagnostics tool</v-card-title>
      <v-card-subtitle>
        The stream is broken, please follow the below steps
      </v-card-subtitle>
      <v-card-text style="height: 100%">
        <div v-if="loadingStep" style="width: 100%">
          <loading-spinner />
        </div>
        <div v-else-if="detectStep" class="d-flex justify-center align-center" style="height: 100%">
          <v-btn color="primary" outlined @click="detect">Find issues</v-btn>
        </div>
        <div v-else-if="fixStep">
          <ul>
            <li v-for="issue in detectedIssues" :key="issue.message">
              {{ issue.message }}
            </li>
          </ul>
          <v-btn color="primary" outlined @click="fix">
            Attempt to fix issues
          </v-btn>
        </div>
        <div v-else-if="checkStep">
          <ul>
            <li v-for="issue in issuesFixed" :key="issue.name">
              <span v-if="issue.fixed">
                {{ issue.name }}
                fixed :)
              </span>
              <span v-else>
                {{ issue.name }}
                not fixed :(
              </span>
            </li>
          </ul>
          <p v-if="someErrors">
            Sorry, looks like there were some errors. Please contact a member of
            the act team and give them the name of the issues that were not
            fixed
          </p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" outlined @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import * as I from "@/models/diagnostic/detectors/issues";
import { IssuesImport, CheckRes, FixRes } from "@/models/diagnostic";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";

enum Step {
  DETECT = 0,
  FIX = 1,
  CHECK = 2,
  LOADING = 3,
}

@Component({
  components: {
    LoadingSpinner,
  },
})
export default class DiagnosticsDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() streamid!: string;

  step = Step.DETECT; // three steps

  detectedIssues!: CheckRes[];
  issuesFixed!: FixRes[];

  get Issues() {
    const baseObjs = I as unknown as IssuesImport;
    return Object.keys(baseObjs).map(
      (obj) => new baseObjs[obj](this.$store, this.streamid)
    );
  }

  async detect() {
    this.step = Step.LOADING;
    this.detectedIssues = await Promise.all(
      this.Issues.map(async (issue) => {
        return issue.check();
      })
    );
    this.step = Step.FIX;
  }

  async fix() {
    this.step = Step.LOADING;

    const filteredIssues = this.Issues.filter((issue) => issue.present);

    this.issuesFixed = await Promise.all(
      filteredIssues.map(async (issue) => issue.fix())
    );

    this.step = Step.CHECK;
  }

  get detectStep() {
    return this.step === Step.DETECT;
  }
  get fixStep() {
    return this.step === Step.FIX;
  }
  get loadingStep() {
    return this.step === Step.LOADING;
  }
  get checkStep() {
    return this.step === Step.CHECK;
  }

  get someErrors() {
    for (let i = 0; i < this.issuesFixed.length; i++) {
      if (this.issuesFixed[i].fixed === false) return true;
    }
    return false;
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>
