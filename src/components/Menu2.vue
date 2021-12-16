<template>
  <div>
    <v-form>
      <v-card-text>
        <v-combobox
          v-model="source"
          label="Source"
          :items="sourceItems"
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
      <li v-for="item in materials" :key="item">
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
            <v-form>
              {{ item }}
              <v-combobox
                v-model="setMaterial"
                label="Set Material"
                :items="materialItems"
                required
              ></v-combobox>
            </v-form>
          </v-card>
        </v-hover>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Menu2 extends Vue {
  setMaterial = "";
  groupBy = "";
  source = "";
  sourceItems = [];
  groupByItems = [];
  materialItems = [];
  materials = [1, 2, 3];
}
</script>
