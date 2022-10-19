<template>
  <v-menu offset-y origin="center center" transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group @change="update">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          :value="item.name"
        >
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

type Name = "Edit" | "Delete";

interface Item {
  icon: string;
  name: Name;
}

@Component
export default class LandingOptions extends Vue {
  update(val: Name) {
    if (val === "Edit") this.edit();
    else this.delete();
  }
  @Emit("edit")
  edit() {
    return;
  }

  @Emit("delete")
  delete() {
    return;
  }

  items: Item[] = [
    {
      icon: "mdi-pencil",
      name: "Edit",
    },
    {
      icon: "mdi-delete",
      name: "Delete",
    },
  ];
}
</script>
