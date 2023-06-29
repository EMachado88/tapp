<template>
  <article>
    <v-card
      v-for="tap in taps"
      :key="tap.name"
      outlined
      class="mx-auto my-12 elevation-5"
    >
      <v-card-text>
        Latitude: {{ tap.lat }}
        <br>
        Longitude: {{ tap.lon }}
      </v-card-text>
    </v-card>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { taps } from '@/mocks/taps'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      taps
    }
  }
})
</script>
