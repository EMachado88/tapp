<template>
  <v-container>
    <h4 class="text-h4">
      <v-icon class="mr-2" size="32px">
        mdi-format-list-bulleted-square
      </v-icon> Taps list
    </h4>
    <article>
      <v-card
        v-for="tap in processedTaps"
        :key="tap.id"
        outlined
        class="mx-auto my-12 elevation-5"
        @click="$nuxt.$emit('tap-selected', tap)"
      >
        <v-card-text>
          <h5 class="text-h5">
            {{ tap.name }}
          </h5>
          <span class="text-caption">{{ tap.position.lat }}, {{ tap.position.lng }}</span>
          <br>
          Distance: {{ tap.distance }}m
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
  },
  computed: {
    processedTaps (): any[] {
      return this.taps.map((tap: any) => {
        const distance = this.$store.getters['position/getDistanceFromUser'](tap.position)
        return {
          ...tap,
          distance
        }
      })
    }
  }
})
</script>
