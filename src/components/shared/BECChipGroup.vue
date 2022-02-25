<template>
  <v-col class="d-flex justify-start">
    <BECChip v-for="cat in categories" :key="cat" :category="cat" />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BECChip from "./BECChip.vue";

@Component({
  components: { BECChip },
})
export default class BECChipGroup extends Vue {
  @Prop() categories!: string[];
}
</script>
