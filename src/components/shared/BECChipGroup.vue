<template>
  <v-col class="d-flex flex-wrap">
    <div v-if="showDots">
      <BECChip v-for="cat in firstTwoCategories" :key="cat" :category="cat" />
      <BECChip :category="dotCat" @switchShowDots="switchShowDots" />
    </div>
    <div v-else>
      <BECChip v-for="cat in categories" :key="cat" :category="cat" />
    </div>
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
  showDots = this.moreThanTwoCats ? true : false;

  get moreThanTwoCats() {
    return [...this.categories].length > 2;
  }

  get firstTwoCategories() {
    if ([...this.categories].length > 1) {
      return [...this.categories.slice(0, 2)];
    } else {
      return [...this.categories];
    }
  }

  get dotCat() {
    return "+" + ([...this.categories].length - 2) + " more...";
  }

  switchShowDots() {
    this.showDots = this.showDots ? false : true;
    return;
  }
}
</script>
