<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="pa-7">
        <div class="text-h4">act | a carbon tool</div>
        <div class="subtitle-2 font-weight-light">
          An open-source platform for performing embodied carbon emission
          calculations from Building Information Models through
          <a
            href="https://speckle.systems/"
            target="_blank"
            class="secondary--text"
            >Speckle</a
          >
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LandingHeader extends Vue {}
</script>
