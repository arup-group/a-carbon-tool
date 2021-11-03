<template>
  <div v-if="group.objects.length > 0">
    <md-card class="md-layout object-row md-elevation-0 md-alignment-center-left" md-with-hover>
      <div class="md-layout-item md-size-50 xxxrow-cell">
        <md-icon
          :style="visible ? 'color:#4F4F4F' : 'color:gray'"
          @click.native="toggleVisible()"
        >remove_red_eye</md-icon>&nbsp;
        <md-icon
          :style="isolated ? 'color:#4F4F4F' : 'color:gray'"
          @click.native="toggleIsolation()"
        >location_searching</md-icon>&nbsp;
        <md-chip style="width: auto" @mouseover.native="hover()" @mouseleave.native="unhover()">
          <md-icon>{{ isOk ? "check_circle" : "error_outline" }}</md-icon>
          &nbsp;{{ group.name }}
          <span
            class="md-caption"
            style="color:#808080"
          >{{ group.objects.length }} objs</span>
        </md-chip>
      </div>
      <div class="md-layout-item md-size-45 md-caption text-right"></div>
    </md-card>
  </div>
</template>
<script>
export default {
  name: "ObjectGroupSimple",
  components: {},
  props: {
    group: Object,
    isOk: { type: Boolean, default: false },
  },
  watch: {
    group() {
      this.currentIndex = 5;
    },
  },
  computed: {
    objects() {
      return this.$store.state.objects
        .filter(obj => this.group.objects.includes(obj._id))
        .slice(0, this.currentIndex);
    },
  },
  data() {
    return {
      isolated: false,
      visible: true,
      currentIndex: 5,
      showDetails: false,
    };
  },
  methods: {
    hover() {
      if (this.isHovering) return;
      this.isHovering = true;
      window.renderer.highlightObjects(this.group.objects);
    },
    unhover() {
      if (!this.isHovering) return;
      this.isHovering = false;
      window.renderer.unHighlightObjects(this.group.objects);
    },
    toggleVisible() {
      if (this.visible) {
        window.renderer.hideObjects(this.group.objects);
        this.visible = false;
      } else {
        window.renderer.showObjects(this.group.objects);
        this.visible = true;
      }
    },
    toggleIsolation() {
      if (this.isolated) {
        window.renderer.showObjects([]);
        this.isolated = false;
      } else {
        this.visible = true;
        window.renderer.isolateObjects(this.group.objects);
        this.isolated = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
/*
  TODO: Cleanup, this is copypasted css from object detail row component
 */

.object-row {
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  border-bottom: 0 !important;
  min-height: 60px;
  line-height: 60px;
  white-space: nowrap;
  overflow: hidden;
}

.object-row:first-of-type {
  border-top: 0 !important;
}

.row-cell:last-of-type {
  border-right: 0;
}

.row-cell {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  padding-right: 8px;
  display: inline-block;
  border-right: 1px dashed #808080;
}
</style>
