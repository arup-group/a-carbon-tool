<template>
  <div>
    <md-card
      class="md-layout md-alignment-top-left md-elevation-0 md-gutter"
      v-for="(mat, i) in materialsArr"
      :key="`${mat.subtype}-${mat.material}-${i}`"
      style="margin-bottom:10px; padding:20px 10px; border-radius:20px;"
      md-with-hover
    >
      <div
        class="md-layout-item md-size-30 md-medium-size-100"
        :style="
          'color:' +
            getHexFromString(
              (mat.material || mat.Material) +
                ' - ' +
                (mat.subtype || mat.Subtype),
            ) +
            ';'
        "
      >
        <strong
          >{{ mat.material || mat.Material }} -
          {{ mat.subtype || mat.Subtype }}</strong
        >
      </div>
      <div
        class="md-layout-item md-size-20 md-medium-size-100 md-caption xxx-text-center"
      >
        <strong>Total: {{ mat.totalCost.toLocaleString() }} kgCO2e</strong>
        <br />&nbsp;
        <md-divider></md-divider>
        <br />
        <strong>A1A3:</strong>
        {{ mat.totalA1A3.toLocaleString() }} kgCO2e
        <br />
        <strong>A4:</strong>
        {{ mat.totalA4Transport.toLocaleString() }} kgCO2e
        <br />
        <strong>A5:</strong>
        {{ mat.totalA5Wastage.toLocaleString() }} kgCO2e
      </div>
      <div class="md-layout-item md-size-20 md-medium-size-100 md-caption">
        <strong>Volume:</strong>
        {{ mat.totalVolume.toLocaleString() }} m3
        <br />
        <strong>Weight:</strong>
        {{ mat.totalWeight.toLocaleString() }} kg
      </div>
      <div class="md-layout-item md-size-30 md-medium-size-100 md-caption">
        <i>Comments:</i>
        {{ mat.Comments ? mat.Comments : "n/a" }}
      </div>
    </md-card>
  </div>
</template>
<script>
export default {
  name: "MaterialDescriptions",
  props: ["materials"],
  watch: {
    materials(newVal) {
      if (!newVal) return [];
      this.materialsArr = newVal;
    },
  },
  computed: {},
  data() {
    return {
      materialsArr: [],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped lang="scss" />
