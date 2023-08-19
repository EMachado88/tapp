<template>
  <v-container class="d-flex align-center justify-center flex-column">
    <div class="mb-5">
      <Header text="Please enable location" icon="mdi-map-marker" />
    </div>
    <v-btn block color="primary" to="/">
      Retry
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'EnableLocationPage',
  layout: 'empty'
})
</script>

<style lang="scss">
.container {
  height: 100vh;
}
</style>
