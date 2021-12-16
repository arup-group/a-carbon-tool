<template>
  <v-container class="d-flex justify-center align-center">
    <v-card style="width: 60%">
      <v-card-title class="">New Assessment</v-card-title>
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="completed" step="1" @click.native="e6 = 1">
          Data
        </v-stepper-step>
        <v-stepper-content step="1">
          <Menu1b v-if="streams.length !== 0" :streams="streams" />
        </v-stepper-content>
        <v-stepper-step :complete="completed" step="2" @click.native="e6 = 2">
          Materials
        </v-stepper-step>
        <v-stepper-content step="2"> <Menu2 /> </v-stepper-content>
        <v-stepper-step :complete="completed" step="3" @click.native="e6 = 3">
          Transport
        </v-stepper-step>
        <v-stepper-content step="3"> <Menu3 /></v-stepper-content>
        <v-stepper-step :complete="completed" step="4" @click.native="e6 = 4">
          Quantities
        </v-stepper-step>
        <v-stepper-content step="5"> </v-stepper-content>
        <v-stepper-step :complete="completed" step="5" @click.native="e6 = 5">
          Review
        </v-stepper-step>
        <v-stepper-content step="5"> </v-stepper-content>
        <v-stepper-step :complete="completed" step="6" @click.native="e6 = 6">
          Preview
        </v-stepper-step>
        <v-stepper-content step="6"> </v-stepper-content>
        <v-stepper-step :complete="completed" step="7" @click.native="e6 = 7">
          Report
        </v-stepper-step>
        <v-stepper-content step="7"> </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Menu1b from "@/components/Menu1b.vue";
import Menu2 from "@/components/Menu2.vue";
import Menu3 from "@/components/Menu3.vue";

@Component({
  components: { Menu1b, Menu2, Menu3 },
})
export default class AssessmentStepper extends Vue {
  @Prop() streams!: any;
  "completed" = false;
  "e6" = 1;
}
</script>
