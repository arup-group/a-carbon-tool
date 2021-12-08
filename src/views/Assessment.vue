<template>
  <v-main>
    <AssessmentStepper />
  </v-main>
</template>

<script lang="ts">
import AssessmentStepper from "@/components/AssessmentStepper.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { AssessmentStepper }
})
export default class Assessment extends Vue {}
</script>

<style scoped></style>
