<template>
  <div>
    <v-form>
      <v-card-text>
        <v-combobox
          v-model="source"
          label="Source"
          :items="souceItems"
          required
        ></v-combobox>
        <v-combobox
          v-model="groupBy"
          label="Group Objects By"
          :items="groupByItems"
          required
        ></v-combobox>
      </v-card-text>
    </v-form>
    <v-btn color="secondary"> Review Materials </v-btn>
    <ul>
      <li v-for="item in materials" :key="item.message">
        <v-form>
          {{ item }}
          <v-combobox
            v-model="setMaterial"
            label="Set Material"
            :items="materialItems"
            required
          ></v-combobox>
        </v-form>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Menu2 extends Vue {
  groupBy = "";
  source = "";
  sourceItems = [];
  groupByItems = [];
  materialItems = [];
  materials = [1, 2, 3];
}
</script>
