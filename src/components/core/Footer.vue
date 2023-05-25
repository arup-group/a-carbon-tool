<template>
  <v-footer v-if="li">
    <v-row dense justify="center" align="center">
      <v-col cols="6">
        <v-card-actions class="justify-end">
          <v-btn
            icon
            x-large
            color="primary"
            href="https://github.com/arup-group/a-carbon-tool"
            target="_blank"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col cols="6">
        <v-card-subtitle class="text-left pa-2">
          <a
            href="https://www.arup.com/"
            target="_blank"
            class="text-decoration-none"
            style="color: inherit"
            >created by <strong>Arup</strong></a
          >
          <br />
          <a
            href="https://speckle.systems/"
            target="_blank"
            class="text-decoration-none"
            style="color: inherit"
            >powered by <strong>Speckle</strong></a
          >
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  @Prop() li!: boolean; // li = Logged In
}
</script>
