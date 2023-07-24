<template>
  <v-container>
    <h5 class="text-h5 d-flex align-center">
      <v-icon class="mr-3" size="32px">
        mdi-water
      </v-icon>
      Add Tap
    </h5>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NewTapPage',
  middleware: 'auth'
})
</script>
