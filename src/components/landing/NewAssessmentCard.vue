<template>
  <v-container fluid class="d-flex align-center justify-center">
    <v-sheet
      outlined
      color="primary"
      rounded
      class="d-flex align-center justify-center"
      height="100%"
      width="100%"
      style="min-height: 35rem"
    >
      <v-card
        flat
        class="d-flex align-center justify-center"
        height="100%"
        min-height="400"
        width="100%"
      >
        <v-card-actions class="justify-center">
          <v-btn x-large outlined color="primary" @click="newAssessment">
            <v-icon> mdi-plus </v-icon>
            New Assessment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class NewAssessmentCard extends Vue {
  @Emit("newAssessment")
  newAssessment() {
    return;
  }
}
</script>
