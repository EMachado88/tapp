<template>
  <div id="map-wrap">
    <ClientOnly fallback-tag="span" fallback="Loading map...">
      <GMap
        ref="map"
        :center="mapCenter"
        :zoom="18"
        :options="{
          mapTypeControl: false,
          zoomControl: false,
          disableDefaultUI: true
        }"
      >
        <GMapMarker
          :position="userPosition"
          :clickable="true"
          :options="{ icon: '/images/rec.png' }"
          @click="mapCenter = userPosition"
        />

        <GMapMarker
          v-for="(tap, index) in taps"
          :key="index"
          :position="tap.position"
          :clickable="true"
          @click="mapCenter = tap.position"
        />
      </GMap>
    </ClientOnly>

    <v-btn
      color="red"
      class="center-button lighten-1 elevation-5"
      fab
      dark
      absolute
      bottom
      right
      @click="center()"
    >
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { taps } from '~/mocks/taps'

export default defineComponent({
  name: 'MapPage',
  data () {
    return {
      taps,
      mapCenter: { lat: 0, lng: 0 },
      userPosition: { lat: 0, lng: 0 },
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
      },
      error => console.error(error), // eslint-disable-line
      {
        enableHighAccuracy: true
      })
    },
    center () {
      this.mapCenter = this.userPosition
    }
  }
})
</script>

<style lang="scss">
#map-wrap {
  position: relative;
  width: 100%;
  height: 100%;

  .GMap {
    width: 100%;
    height: 100%;
  }

  .GMap__Wrapper {
    height: 100%;
  }

  .center-button {
    bottom: 20px;
  }
}
</style>
