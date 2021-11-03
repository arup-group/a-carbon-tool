<template>
  <md-card md-with-hover :class="{ 'stream-card': true, selected: selected }">
    <md-card-header @click="selected = !selected">
      <md-card-header-text>
        <div class="md-title">{{ stream.name }}</div>
        <div class="md-subhead" stlye="user-select:all;">
          Id: {{ stream.streamId }}
        </div>
        <div class="md-caption">
          Units:
          <strong>{{ units }}</strong>
        </div>
      </md-card-header-text>
      <md-button class="md-icon-button" @click.native="removeStream()">
        <md-icon>close</md-icon>
      </md-button>
    </md-card-header>
  </md-card>
</template>
<script>
import marked from "marked";

export default {
  name: "StreamCard",
  props: {
    stream: Object,
  },
  watch: {
    selected() {
      this.$emit("selected", this.stream);
    },
  },
  computed: {
    owner() {
      return this.$store.state.users.find(u => u._id === this.stream.owner);
    },
    createdAt() {
      let date = new Date(this.stream.createdAt);
      return date.toLocaleString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    compiledDescription() {
      return marked(this.stream.description.substring(0, 220) + " ...", {
        sanitize: true,
      });
    },
    canEdit() {
      return this.isOwner
        ? true
        : this.stream.canWrite.indexOf(this.$store.state.user._id) !== -1;
    },
    isOwner() {
      return this.stream.owner === this.$store.state.user._id;
    },
    units() {
      return this.stream.baseProperties && this.stream.baseProperties.units
        ? this.stream.baseProperties.units
        : "no unit specified";
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    removeStream() {
      this.$emit("remove-stream", this.stream.streamId);
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.stream-card {
  margin-bottom: 20px;
}
</style>
