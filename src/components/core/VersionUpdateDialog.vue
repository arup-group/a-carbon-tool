<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title>act | a carbon tool - {{ version }} update</v-card-title>
      <v-card-text>
        <h3 v-if="features.length > 0" class="d-flex align-center mb-2 mt-2">
          <v-icon color="yellow" class="mr-2">mdi-thumb-up</v-icon>
          New features/additions
        </h3>
        <v-list v-if="features.length > 0">
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
        <h3 v-if="fixes.length > 0" class="d-flex align-center mb-2 mt-2">
          <v-icon color="red" class="mr-2">mdi-bug-outline</v-icon>
          New fixes
        </h3>
        <v-list v-if="fixes.length > 0">
          <template v-for="(item, index) in fixes">
            <div :key="index">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title> FIX: {{ item.title }} </v-list-item-title>
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
      title: "Report Object v2",
      subtitle: `The way that we store your carbon reports has now changed. The updates allow for faster loading, carbon heat maps, and makes it easier to access your data.`,
    }
  ];

  fixes: { title: string; subtitle: string }[] = [];

  @Emit("close")
  close() {
    return;
  }
}
</script>
