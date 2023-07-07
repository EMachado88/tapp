<template>
  <GmapMap
    ref="map"
    :center="mapCenter"
    :zoom="18"
    :options="{
      mapTypeControl: false,
      zoomControl: false,
      disableDefaultUI: true
    }"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      :position="userPosition"
      :clickable="true"
      icon="/images/rec.png"
      @click="mapCenter = userPosition"
    />

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
      mapCenter: { lat: 10, lng: 10 },
      userPosition: { lat: 10, lng: 10 },
      watchId: 0
    }
  },
  mounted () {
    this.geolocateAndCenter()
  },
  beforeUnmount () {
    navigator.geolocation.clearWatch(this.watchId)
  },
  methods: {
    geolocateAndCenter () {
      // Get current position and center map on it
      navigator.geolocation.getCurrentPosition((position) => {
        const positionLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.mapCenter = positionLatLng
        this.userPosition = positionLatLng
      })

      // Watch position and move user marker
      this.watchId = navigator.geolocation.watchPosition((position) => {
        const positionLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.userPosition = positionLatLng
      })
    }
  }
})
</script>
