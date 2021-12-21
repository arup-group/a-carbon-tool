<template>
  <v-main>
    <AssessmentStepper
      v-if="availableStreams.length !== 0"
      :streams="availableStreams"
    />
  </v-main>
</template>

<script lang="ts">
import AssessmentStepper from "@/components/AssessmentStepper.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { AssessmentStepper },
})
export default class Assessment extends Vue {
  availableStreams = []
  mounted() {
    this.$store.dispatch("getUserStreams").then((res) => {
      this.availableStreams = res.data.user.streams.items.map((i: any) => {
        return { label: i.name, value: i.id };
      })
      console.log(res);
    });
  }
}
</script>

<style scoped></style>
