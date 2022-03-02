<template>
  <div v-if="moreThanThreeCats">
    <v-col class="d-flex flex-wrap">
      <div v-if="showDots">
        <BECChip
          v-for="cat in firstThreeCategories"
          :key="cat"
          :category="cat"
        />
        <BECChip :category="dotCat" @switchShowDots="switchShowDots" />
      </div>
      <div v-else>
        <BECChip v-for="cat in categories" :key="cat" :category="cat" />
      </div>
    </v-col>
  </div>
  <div v-else>
    <v-col class="d-flex flex-wrap">
      <BECChip v-for="cat in categories" :key="cat" :category="cat" />
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import BECChip from "./BECChip.vue";

@Component({
  components: { BECChip },
})
export default class BECChipGroup extends Vue {
  @Prop() categories!: string[];

  get moreThanThreeCats() {
    return this.categories.length > 3;
  }

  get firstThreeCategories() {
    if (this.categories.length > 2) {
      return [...this.categories.slice(0, 3)];
    } else {
      return [...this.categories];
    }
  }

  get dotCat() {
    return "...";
  }

  get showDots() {
    return this.moreThanThreeCats ? true : false;
  }

  switchShowDots() {
    console.log(this.showDots);
    return this.showDots ? false : true;
  }
}
</script>
