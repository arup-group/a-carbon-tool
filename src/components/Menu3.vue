<template>
  <div>
    <v-form>
      <v-card-text>
        <v-combobox
          v-model="groupBy"
          label="Group Objects By"
          :items="groupByItems"
          required
        ></v-combobox>
      </v-card-text>
    </v-form>
    <ul>
      <li v-for="item in groupedTransport" :key="item">
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
            <v-form>
              <v-chip>{{ item }}</v-chip>
              <v-select
                v-model="selectedTransport[item]"
                :items="transportItems"
                required
              >
              </v-select>
              <v-chip-group row>
                <v-chip
                  v-if="transportParams[selectedTransport[item]]"
                  :value="transportParams[selectedTransport[item][0]]"
                >
                  Road: {{ transportParams[selectedTransport[item]][0] }} km
                </v-chip>
                <v-chip
                  v-if="transportParams[selectedTransport[item]]"
                  :value="transportParams[selectedTransport[item]][1]"
                >
                  Rail: {{ transportParams[selectedTransport[item]][1] }} km
                </v-chip>
                <v-chip
                  v-if="transportParams[selectedTransport[item]]"
                  :value="transportParams[selectedTransport[item]][2]"
                >
                  Sea: {{ transportParams[selectedTransport[item]][2] }} km
                </v-chip>
              </v-chip-group>
            </v-form>
          </v-card>
        </v-hover>
      </li>
    </ul>
    <v-card-text>
      Legend
      <v-chip-group row>
        <v-chip v-for="item in transportItems" :key="item">{{ item }} </v-chip>
      </v-chip-group>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Menu3 extends Vue {
  selectedTransport = {};
  result="";
  groupBy = "";
  sourceItems = [];
  groupByItems = [];
  transportItems = ["local", "regional", "global"];
  groupedTransport = ["a", "b", "c"];
  transportParams = {
    local: [50, 0, 0],
    regional: [300, 0, 0],
    global: [200, 0, 10000],
  };
}
</script>
