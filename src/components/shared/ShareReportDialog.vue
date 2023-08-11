<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title>Share Report: {{ reportName }}</v-card-title>
      <v-card-text class="white--text">
        <template v-if="isPublic !== 'nope'">
          <template v-if="isPublic === true">
            <p>
              Your stream is PUBLIC, therefore you should be able to share your
              report with anyone with access to your current server.
            </p>
          </template>
          <template v-else>
            <p>
              Your stream is PRIVATE, therefore you will not be able to share
              your report with anyone who is not already added to your stream.
              Please consult your stream owner on whether to make your stream
              public.
            </p>
          </template>
        </template>
        <p v-else>Loading</p>
        <p>Please use the link below to share your report with others:</p>
        <v-text-field
          ref="input"
          color="primary"
          append-icon="mdi-content-copy"
          @focus="highlighted($event)"
          @click:append="copyLink"
          :messages="messages"
          :value="fullShareLink"
          :readonly="true"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class ShareReportDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() shareLink!: string;
  @Prop() streamid!: string;
  @Prop() reportName!: string;

  get fullShareLink() {
    return `${this.shareLink}?server=${this.$store.state.selectedServer.url}`;
  }

  messages: string[] = [];
  isPublic?: boolean | string = "nope";

  @Emit("close")
  close() {
    return;
  }

  async mounted() {
    if (this.streamid)
      this.isPublic = await this.$store.dispatch("checkStreamPublic", {
        streamid: this.streamid,
      });
  }

  @Watch("streamid")
  async streamIdChange() {
    this.isPublic = await this.$store.dispatch("checkStreamPublic", {
      streamid: this.streamid,
    });
  }

  highlighted(event: any) {
    event.target.select();
    navigator.clipboard.writeText(this.fullShareLink);
    this.successMessage();
  }

  copyLink() {
    (this.$refs as any).input.onFocus();
    this.successMessage();
  }

  successMessage() {
    this.messages = ["Copied to clipboard"];
    setTimeout(() => (this.messages = []), 4000);
  }
}
</script>
