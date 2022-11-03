<template>
  <v-dialog v-model="dialog" max-width="640">
    <v-card>
      <v-card-title>Declaration</v-card-title>
      <v-card-text>
        The construction industry currently faces significant challenges in
        reducing its environmental impact. The built environment is directly
        responsible for nearly 40% of all carbon emissions, with 10% coming from
        embodied carbon - the emissions associated with the construction,
        maintenance and deconstruction (<a
          href="https://worldgbc.org/news-media/commitment-includes-embodied-carbon"
          target="_blank"
          >WGBC, 2021</a
        >). <br /><br />
        As an initiative, we believe that significant action needs to be taken
        to curb these emissions, with a target of limiting global temperature
        rise to 1.5C. Construction professionals - architects, engineers,
        designers, consultants and contractors - with the power to enact
        meaningful change require the right tools to do so.
        <br /><br />
        A carbon tool, or 'act', is an open-source initiative to create
        appropriate tools for the rapid assessment of embodied carbon emissions
        within built-environment assets. It is a work in progress intended to
        evolve over time. It is free to all to use and it is open to anyone who
        would like to contribute. Unlike other lifecycle analysis tools, act is
        intended to be used by designers as they work to provide quick feedback
        and enable carbon to be included as a factor in design as it happens.
      </v-card-text>
      <v-img src="/assets/globe.png" contain height="200"></v-img>
      <v-card-title>Getting started</v-card-title>
      <v-card-text>
        Create an account on
        <a href="https://speckle.xyz" target="_blank">Speckle XYZ</a> to use
        act. Or, if you're a member of Arup staff, follow the login links to use
        your work credentials.
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class DeclarationDialog extends Vue {
  @Prop() dialog!: boolean;

  @Emit("close")
  closeDialog() {
    return;
  }
}
</script>
