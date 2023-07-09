<template>
  <v-container>
    <h5 class="text-h5 d-flex align-center">
      <v-icon class="mr-3" size="32px">
        mdi-format-list-bulleted-square
      </v-icon>
      Taps list
    </h5>
    <section class="mt-10">
      <v-card
        v-for="tap in processedTaps"
        :key="tap.id"
        outlined
        class="mx-auto my-5 elevation-5"
        @click="$nuxt.$emit('tap-selected', tap)"
      >
        <v-card-text>
          <h6 class="text-h6">
            {{ tap.name }}
          </h6>
          <span class="text-caption">{{ tap.position.lat }}, {{ tap.position.lng }}</span>
          <br>
          Distance: {{ tap.distance }}m
        </v-card-text>
      </v-card>
    </section>
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
  },
  computed: {
    processedTaps (): any[] {
      return this.taps.map((tap: any) => {
        const distance = this.$store.getters['position/getDistanceFromUser'](tap.position)
        return {
          ...tap,
          distance
        }
      }).sort((a: any, b: any) => a.distance - b.distance)
    }
  }
})
</script>
