<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title> Speckle Server Mismatch </v-card-title>
      <v-card-text class="white--text">
        <p>
          The Speckle server that you're signed in to does not match the server
          for this report.
        </p>
        <div class="d-flex justify-space-around">
          <div>
            <p>Your server:</p>
            <p>{{ currentServer }}</p>
          </div>
          <div>
            <p>Report server:</p>
            <p>{{ reportServer }}</p>
          </div>
        </div>
        <p>Would you like to attempt to log into the correct server?</p>
        <div class="d-flex justify-center">
            <v-btn color="primary" outlined @click="attemptLogin">Attempt login</v-btn>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="toDashboard">Back to dashboard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class ChangeServerDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() currentServer!: string;
  @Prop() reportServer!: string;

  @Emit("close")
  close() {
    return;
  }

  @Emit("attemptLogin")
  attemptLogin() {
    return this.reportServer;
  }

  @Emit("toDashboard")
  toDashboard() {
    return;
  }
}
</script>
