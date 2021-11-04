<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { HelloWorld }
})
export default class Login extends Vue {

}
</script>
