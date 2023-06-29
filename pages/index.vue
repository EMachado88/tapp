<template>
  <v-container>
    <article>
      <v-card
        v-for="tap in taps"
        :key="tap.name"
        outlined
        class="mx-auto my-12 elevation-5"
      >
        <v-card-text>
          Latitude: {{ tap.position.lat }}
          <br>
          Longitude: {{ tap.position.lon }}
        </v-card-text>
      </v-card>
    </article>
  </v-container>
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
