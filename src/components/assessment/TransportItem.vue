<template>
  <div>
    <p>{{ typeName }}</p>
    <div class="d-flex align-center justify-space-between">
      <v-select
        :items="transportTypes"
        :item-text="(types) => types['name']"
        :item-value="(types) => types"
        v-model="selected"
        chips
      >
        <template #selection="{ item }">
        <v-chip :color="item.color">{{ item.name }}</v-chip>
      </template>
      </v-select>
      <v-text-field
        label="road (km)"
        v-model="road"
        :disabled="!isCustom"
      ></v-text-field>
      <v-text-field
        label="rail (km)"
        v-model="rail"
        :disabled="!isCustom"
      ></v-text-field>
      <v-text-field
        label="sea (km)"
        v-model="sea"
        :disabled="!isCustom"
      ></v-text-field>
      <v-btn :disabled="saveDisabled" @click="customSave">Save</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SpeckleType,
  TransportSelected,
  TransportType,
} from "@/models/newAssessment";
import { Vue, Prop, Watch, Component, Emit } from "vue-property-decorator";

type Selected = null | TransportType;

@Component
export default class Item extends Vue {
  @Prop() transportTypes!: TransportType[];
  @Prop() type!: SpeckleType;

  selected: Selected = null;
  road = 0;
  rail = 0;
  sea = 0;
  customSaved = false;

  @Watch("selected")
  onSelectedChange(value: Selected) {
    if (value !== null) {
      this.road = value.values.road;
      this.rail = value.values.rail;
      this.sea = value.values.sea;
      if (value.name !== "custom" && this.selected) {
        this.transportSelected(this.selected);
      }
    }
  }

  @Watch("road")
  @Watch("rail")
  @Watch("sea")
  formChanged() {
    if (this.isCustom) this.customSaved = false;
  }

  customSave() {
    // should always be true, but good to check
    if (this.selected) {
      const transportType: TransportType = {
        name: this.selected.name,
        color: this.selected.color,
        values: {
          road: +this.road,
          rail: +this.rail,
          sea: +this.sea,
        },
      };
      this.customSaved = true;
      this.transportSelected(transportType);
    }
  }

  @Emit("transportSelected")
  transportSelected(transportType: TransportType): TransportSelected {
    return {
      speckleType: this.type,
      transportType: transportType,
    };
  }

  get displayTransportTypes() {
    return this.transportTypes ? this.transportTypes : [];
  }

  get isCustom() {
    return this.selected ? this.selected.name === "custom" : false;
  }

  get typeName() {
    const typeArr = this.type.type.split(".");
    return typeArr[typeArr.length - 1];
  }

  get saveDisabled() {
    if (this.isCustom) {
      return this.customSaved;
    } else return !this.isCustom;
  }
}
</script>
