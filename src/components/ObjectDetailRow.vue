<template>
  <md-card
    class="md-elevation-0"
    @mouseover.native="hover()"
    @mouseleave.native="unhover()"
    md-with-hover
    style="margin:0"
    v-if="object"
  >
    <div class="md-layout object-row md-elevation-0" ref="rowdiv">
      <div class="md-layout-item md-size-5 row-cell">
        <md-icon @click.native="zoomTo()" class="pointer-hover">
          zoom_out_map
        </md-icon>
      </div>
      <div class="md-layout-item md-size-10 row-cell">
        <strong>Id:</strong>
        {{ object._id }}
      </div>
      <div class="md-layout-item md-size-80 row-cell">
        <span class v-for="kvp in limitKvps" v-bind:key="kvp.id">
          <strong>
            <span class="md-caption">{{ kvp.key }}:</span>
          </strong>
          {{ kvp.value }}
        </span>
      </div>
      <div class="md-layout-item md-size-5 text-center row-cell">
        <md-icon @click.native="expanded = !expanded" class="pointer-hover">{{
          expanded ? "expand_less" : "expand_more"
        }}</md-icon>
      </div>
    </div>
    <div v-if="expanded">
      <br />
      <div
        v-for="kvp in kvps"
        v-bind:key="kvp.id"
        class="md-layout md-gutter expanded-props md-alignment-center-space-around"
      >
        <div class="md-layout-item md-size-5"></div>
        <div class="md-layout-item md-size-25">
          <span class="md-caption">{{ kvp.key }}:</span>
        </div>
        <div class="md-layout-item md-size-60 row-cell">
          <code>{{ kvp.value }}</code>
        </div>
      </div>
      <br />
    </div>
  </md-card>
</template>
<script>
import flatten from "flat";
export default {
  name: "ObjectDetailRow",
  props: {
    object: Object,
    expandRow: { type: Boolean, default: false },
  },
  computed: {
    limitKvps() {
      return this.kvps.slice(this.sliceStart, this.sliceEnd);
    },
    kvps() {
      let kvps = [];
      let flatProps = flatten(this.object.properties);
      for (let key in flatProps) kvps.push({ key: key, value: flatProps[key] });
      return kvps;
    },
  },
  data() {
    return {
      sliceStart: 0,
      sliceEnd: 50,
      isHovering: false,
      expanded: false,
    };
  },
  methods: {
    hover() {
      if (this.isHovering) return;
      this.isHovering = true;
      window.renderer.highlightObjects([this.object._id]);
    },
    unhover() {
      if (!this.isHovering) return;
      this.isHovering = false;
      window.renderer.unHighlightObjects([this.object._id]);
    },
    zoomTo() {
      window.renderer.zoomToObject(this.object._id);
    },
  },
  created() {
    this.expanded = this.expandRow;
  },
};
</script>
<style lang="scss">
.pointer-hover:hover {
  cursor: pointer;
}

.object-row {
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  border-bottom: 1px dashed #808080;
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  overflow: hidden;
}
.object-row:first-of-type {
  border-top: 1px dashed #808080;
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
