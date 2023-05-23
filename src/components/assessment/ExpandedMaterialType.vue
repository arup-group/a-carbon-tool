<template>
  <v-card
    flat
    color=""
    :style="[
      this.$store.state.darkMode
        ? { 'background-color': '#1C1C1C !important' }
        : { 'background-color': '#FFFFFF !important' },
    ]"
  >
    <v-card-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-chip v-bind="attrs" v-on="on">
            {{ cleanType(type.name) }}
          </v-chip>
        </template>
        <span>Objects: {{ type.objects.length }} </span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>
      <v-row v-for="part in partMaterial" :key="part.id" dense align="end">
        <v-col cols="7">
          <v-combobox
            v-model="part.material"
            :items="materials"
            :item-text="(materials) => materials['name']"
            @change="checkMaterialUpdated"
            chips
          >
            <template #selection="{ item }">
              <v-chip
                :color="item.color"
                :textColor="getContrastYIQ(item.color)"
                >{{ item.name }}</v-chip
              >
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="part.percentage"
            single-line
            type="number"
            max="100"
            @input="percentageChanged(part)"
            append-icon="mdi-percent"
          />
        </v-col>
        <v-col cols="2" v-if="partMaterial.length !== 1">
          <v-btn fab small @click="removePart(part.id)">
            <v-icon> mdi-minus </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div style="width: 100%" class="d-flex justify-center">
        <v-btn fab small @click="addPart">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </div>
      <p v-if="invalid" style="color: red">{{ invalidMessage }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!changed" @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import {
  MaterialGrouping,
  PartMaterial,
  SelectedBuildupEmit,
} from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";

import MaterialType from "./MaterialType.vue";
import { ReportFullGroup } from "@/models/report";

@Component({
  components: { MaterialType },
})
export default class ExpandedMaterialType extends Vue {
  @Prop() materials!: MaterialFull[];
  @Prop() type!: ReportFullGroup;

  partMaterial: PartMaterial[] = [{ id: 0 }];
  changed = true;

  invalid = false;
  invalidMessage = "";

  mounted() {
    this.partMaterial = Object.entries(this.type.objects[0].materials).map(
      ([k, v], i) => ({
        id: i,
        material: v.material,
        percentage: (100 * (v.volume / this.type.objects[0].volume)).toString(),
      })
    );
  }

  save() {
    this.changed = false;
    let pass = true;
    let totalPercentage = 0;
    this.partMaterial.forEach((p) => {
      if (p.percentage !== undefined) totalPercentage += +p.percentage;
      else pass = false;
      if (!p.material) pass = false;
    });
    if (!pass) {
      this.invalidMessage = "All fields must be filled in";
      this.invalid = true;
      return;
    } else if (totalPercentage !== 100) {
      this.invalidMessage = "Percentages must equal 100";
      this.invalid = true;
      return;
    }

    this.selectBuildup();
  }

  getType(type: MaterialGrouping) {
    return type;
  }
  addPart() {
    this.partMaterial.push({
      id: this.partMaterial[this.partMaterial.length - 1].id + 1,
    });
  }
  removePart(id: number) {
    this.partMaterial = this.partMaterial.filter((p) => p.id != id);
  }

  cleanType(type: string) {
    const typeArr = type.split(".");
    return typeArr[typeArr.length - 1];
  }

  checkMaterialUpdated() {
    this.changed = true;
    this.invalid = false;
  }

  percentageChanged(part: PartMaterial) {
    if (part.percentage) {
      if (+part.percentage > 100) part.percentage = "100";
      else if (+part.percentage < 0) part.percentage = "0";
    }

    this.changed = true;
    this.invalid = false;
  }

  getContrastYIQ(hexcolor: string) {
    if (hexcolor.slice(0, 1) === "#") {
      hexcolor = hexcolor.slice(1);
    }
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }

  @Emit("selectBuildup")
  selectBuildup(): SelectedBuildupEmit {
    return {
      ids: this.type.objects.map((o) => o.id),
      materials: this.partMaterial,
    };
  }
}
</script>
