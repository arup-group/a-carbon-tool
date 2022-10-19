<template>
  <v-col class="d-flex flex-wrap">
    <div v-if="showDots">
      <BECChip
        v-for="cat in firstTwoCategories"
        :key="cat.name"
        :category="cat.name"
      />
      <BECChip :category="dotCat" @switchShowDots="switchShowDots" />
    </div>
    <div v-else>
      <BECChip v-for="cat in categories" :key="cat.name" :category="cat.name" />
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
  get cats() {
    return this.categories ? this.categories : [];
  }

  get moreThanTwoCats() {
    return [...this.cats].length > 2;
  }

  get firstTwoCategories() {
    if ([...this.cats].length > 1) {
      return [...this.cats.slice(0, 2)];
    } else {
      return [...this.cats];
    }
  }

  get dotCat() {
    return "+" + ([...this.cats].length - 2) + " more...";
  }

  switchShowDots() {
    this.showDots = this.showDots ? false : true;
    return;
  }
}
</script>
