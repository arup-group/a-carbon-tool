<template>
  <div v-if="objectMaterialGroups">
    <br />
    <md-divider></md-divider>
    <p class="md-caption"><br />Assigned Materials:</p>
    <br />
    <md-card
      class="md-layout object-row md-elevation-0 md-alignment-center-left"
      v-for="group in objectMaterialGroups"
      :key="group.name"
      md-with-hover
      @mouseover.native="hover(group.objects)"
      @mouseleave.native="unhover(group.objects)"
    >
      <div class="md-layout-item md-size-40">
        <md-avatar
          class="md-elevation-5 md-small"
          :style="`background-color:${getHexFromString(group.name)}`"
        ></md-avatar
        >&nbsp;
        <md-chip style="width: auto">
          {{ group.name }}
          <span class="md-caption" style="color:#808080">
            {{ group.objects.length }} objs
          </span>
        </md-chip>
      </div>
      <div
        class="md-layout-item md-size-60 md-caption"
        v-html="materialSummary(group.material)"
      ></div>
    </md-card>
    <br />&nbsp;
    <md-card class="md-elevation-0" style="border-radius: 20px" md-with-hover>
      <md-card-content style="padding-bottom:16px;">
        <p class="text-center">
          <md-icon>{{ hasOrphans ? "error_outline" : "check_circle" }}</md-icon>
          &nbsp;
          {{
            hasOrphans
              ? "Some objects do not have materials. They will not be included in the calculations."
              : "All objects have an assigned matrial. Good job!"
          }}
        </p>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
export default {
  name: "MaterialDisplay",
  props: {},
  watch: {
    objectMaterialGroups() {
      if (this.$store.state.appStep === "material-input")
        window.renderer.colorByProperty({
          propertyName: "_carbon_MatFullName",
        });
      if (
        this.objectMaterialGroups.find(gr =>
          gr.name.includes("NOT ASSIGNED (will be ignored)"),
        )
      )
        this.hasOrphans = true;
      else this.hasOrphans = false;
    },
  },
  computed: {
    objectMaterialGroups() {
      let groups = [],
        addedOrphans = false,
        orphanGroup = { name: "NOT ASSIGNED (will be ignored)", objects: [] };

      this.$store.state.objects.forEach(object => {
        if (object.properties.hasOwnProperty("_carbon_MatFullName")) {
          let group = groups.find(
            gr => gr.name === object.properties._carbon_MatFullName,
          );
          if (group) {
            group.objects.push(object._id);
          } else {
            groups.push({
              name: object.properties._carbon_MatFullName,
              objects: [object._id],
              material: object.properties._carbonMaterial,
            });
          }
        } else {
          // orphaned object
          if (!addedOrphans) {
            addedOrphans = true;
            groups.unshift(orphanGroup);
          }
          orphanGroup.objects.push(object._id);
        }
      });
      return groups;
    },
  },
  data() {
    return {
      hasOrphans: false,
    };
  },
  methods: {
    materialSummary(material) {
      if (!material) return "";
      return `Origin database: ${material.Database}; ${
        material["MJ/kg"]
      } MJ/kg | ${material["kgCO2/kg"]} kgCO2/kg | <strong>${
        material["kgCO2e/kg"]
      }</strong> kgCO2e/kg <br> <i>${
        material.ICE_Comment ? material.ICE_Comment : ""
      }</i>`;
    },
    hover(objects) {
      if (this.isHovering) return;
      this.isHovering = true;
      window.renderer.highlightObjects(objects);
    },
    unhover(objects) {
      if (!this.isHovering) return;
      this.isHovering = false;
      window.renderer.unHighlightObjects(objects);
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
  height: 60px;
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
  /*
  max-width: 150px;*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  padding-right: 8px;
  display: inline-block;
  border-right: 1px dashed #808080;
}
</style>
