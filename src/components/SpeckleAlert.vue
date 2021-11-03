<template>
  <md-content class="speckle-alert md-accent md-elevation-2">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-80">
        <slot></slot>
      </div>
      <div class="md-layout-item md-size-20" style="text-align: right">
        <md-button
          class="md-icon-button md-raised"
          @click.native="$emit('closed')"
        >
          <md-icon>close</md-icon>
        </md-button>
      </div>
    </div>
  </md-content>
</template>
<script>
export default {
  name: "SpeckleAlert",
  props: {
    type: String, // can be alert or info
  },
};
</script>
<style scoped lang="scss">
.speckle-alert {
  padding: 10px;
  border-radius: 2px;
}
</style>
