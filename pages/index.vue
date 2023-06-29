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

interface Tap {
  name: string,
  lat: number,
  lon: number
}

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      taps: [
        {
          name: '1',
          lat: 41.6367603208299,
          lon: -8.14457114236497
        }
      ] as Tap[]
    }
  }
})
</script>
