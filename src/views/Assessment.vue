<template>
  <v-main>
    <Menu1b/>
  </v-main>
</template>

<script lang="ts">
import Menu1b from "@/components/Menu1b.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Menu1b }
})
export default class Assessment extends Vue {}
</script>

<style scoped></style>
