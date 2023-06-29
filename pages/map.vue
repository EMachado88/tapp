<template>
  <GmapMap
    ref="map"
    :center="mapCenter"
    :zoom="18"
    :options="{
      mapTypeControl: false,
      zoomControl: false,
    }"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      v-for="(tap, index) in taps"
      :key="index"
      :position="tap.position"
      :clickable="true"
      @click="mapCenter = tap.position"
    />
  </GmapMap>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { taps } from '~/mocks/taps'

export default defineComponent({
  name: 'MapPage',
  data () {
    return {
      taps,
      mapCenter: { lat: 10, lng: 10 }
    }
  },
  mounted () {
    this.geolocateAndCenter()
  },
  methods: {
    geolocateAndCenter () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
})
</script>
