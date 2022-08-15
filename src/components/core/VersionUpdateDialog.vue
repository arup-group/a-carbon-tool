<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title>act | a carbon tool - {{ version }} update</v-card-title>
      <v-card-text>
        <h3 class="d-flex align-center mb-2 mt-2">
          <v-icon color="yellow" class="mr-2">mdi-thumb-up</v-icon>
          New features/additions
        </h3>
        <v-list>
          <template v-for="(item, index) in features">
            <div :key="index">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title> NEW: {{ item.title }} </v-list-item-title>
                  <v-list-item-subtitle style="white-space: normal">
                    {{ item.subtitle }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index !== features.length - 1"></v-divider>
            </div>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="close" color="primary" outlined>Got it!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class VersionUpdateDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() version!: string;

  features: { title: string; subtitle: string }[] = [
    {
      title: "Report editing",
      subtitle: `The "edit" button on reports now works!`,
    },
    {
      title: "Multiple reports per speckle stream",
      subtitle:
        "Multiple reports can now be run and saved on the same speckle stream",
    },
    {
      title: `"Quick report" feature`,
      subtitle: `Select the "edit" button on a report and a popup with your report will appear for quick editing`,
    },
    {
      title: "History view",
      subtitle:
        "View the history of your reports, track how the total carbon has changed over time",
    },
    {
      title: "Comparison view",
      subtitle:
        "Compare different reports that you have run on the same building model",
    },
    {
      title: "Custom grouping of materials",
      subtitle: "You can now create your own groups on the assessment page",
    },
    {
      title: "Filter objects",
      subtitle: "On the 'Materials' tab when running an assessment, click the group name to see just those objects"
    }
  ];

  @Emit("close")
  close() {
    return;
  }
}
</script>
