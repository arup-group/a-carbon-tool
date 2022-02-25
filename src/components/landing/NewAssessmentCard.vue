<template>
  <v-container fluid>
    <v-sheet outlined color="primary" rounded class="my-1">
      <v-card flat height="650" class="d-flex align-center justify-center">
        <v-card-actions class="justify-center">
          <v-btn
            x-large
            outlined
            color="primary"
            @click="$router.push('/assessment')"
          >
            <v-icon> mdi-plus </v-icon>
            New Assessment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NewAssessmentCard extends Vue {}
</script>
