<template>
  <v-container class="d-flex align-center justify-center flex-column">
    <div class="mb-5">
      <h5 class="text-h5 d-flex align-center">
        <v-icon class="mr-3" size="32px">
          mdi-map-marker
        </v-icon>
        Please enable location
      </h5>
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
