<template>
  <v-toolbar flat rounded outlined class="my-4">
    <back-button />
    <v-toolbar-title class="mr-4 ml-2">
      {{ streamName }}
    </v-toolbar-title>
    <v-text-field
      v-model="search"
      clearable
      flat
      solo
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
    ></v-text-field>
    <v-menu offset-y rounded="lg">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="ml-4">More</v-btn>
      </template>
      <v-list>
        <v-list-item link @click="openComparison">
          <v-list-item-title>Comparison</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="openHistory">
          <v-list-item-title>History</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="openAddData">
          <v-list-item-title>Add Data</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import BackButton from "@/components/shared/BackButton.vue";

@Component({
  components: { BackButton },
})
export default class StreamReportsHeader extends Vue {
  @Prop() streamName!: string;
  @Prop() value!: string;

  search = this.value || "";

  @Watch("search")
  @Emit("input")
  emitSearch() {
    return this.search;
  }

  @Emit("openComparison")
  openComparison() {
    return;
  }

  @Emit("openHistory")
  openHistory() {
    return;
  }

  @Emit("openAddData")
  openAddData() {
    return;
  }
}
</script>
