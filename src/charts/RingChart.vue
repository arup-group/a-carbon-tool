<template>
  <div>
    <ve-ring
      :loading="isLoading"
      :data="chartData"
      :colors="colors"
      :legend="options.legend"
      :settings="chartSettings"
      :events="chartEvents"
      :height="height"
    />
  </div>
</template>
<script>
export default {
  name: "RingChart",
  props: {
    chartData: Object,
    colors: Array,
    isLoading: Boolean,
    proportional: { type: Boolean, default: false },
    height: { type: String, default: "450px" },
  },
  computed: {},
  data() {
    return {
      options: {
        legend: { textStyle: { color: "#A1A2A6" }, bottom: 0 },
      },
      chartSettings: {
        roseType: this.proportional ? "rose" : "",
        dataType: "kgCO2e",
      },
      chartEvents: {
        legendselectchanged: v => {
          this.$emit("legend-clicked", v);
        },
      },
    };
  },
  methods: {},
};
</script>
<style scoped lang="scss" />
