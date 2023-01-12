<template>
  <v-card>
    <v-card-text>
      <div class="d-flex align-center">
        <span class="mr-5">Sun shadows</span>
        <v-switch v-model="value.enabled" inset :label="``" />
      </div>
      <v-slider
        v-model="value.intensity"
        step="0"
        max="10"
        min="1"
        :thumb-size="24"
        label="Sun intensity"
        :disabled="!value.enabled"
      />
      <v-slider
        v-model="value.elevation"
        step="0"
        :min="0"
        :max="Math.PI"
        :thumb-size="24"
        label="Sun elevation"
        :disabled="!value.enabled"
      />
      <v-slider
        v-model="value.azimuth"
        step="0"
        :min="-Math.PI * 0.5"
        :max="Math.PI * 0.5"
        :thumb-size="24"
        label="Sun azimuth"
        :disabled="!value.enabled"
      />
      <v-slider
        v-model="value.indirectLightIntensity"
        step="0"
        min="0.0"
        max="5.0"
        :thumb-size="24"
        label="Indirect light"
      />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { SunLightConfiguration } from "@speckle/viewer";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class RendererLightingOptions extends Vue {
    @Prop() value!: SunLightConfiguration;

    @Watch("value", { deep: true })
    @Emit("input")
    input() {
        return this.value;
    }
}
</script>

