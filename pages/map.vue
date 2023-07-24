<template>
  <div id="map-wrap">
    <GMap
      ref="map"
      language="en"
      :center="mapCenter"
      :zoom="18"
      :options="{
        mapTypeControl: false,
        zoomControl: false,
        disableDefaultUI: true
      }"
      @center_changed="$store.dispatch('position/setMapCenter', { lat: $event.map.center.lat(), lng: $event.map.center.lng()})"
    >
      <GMapMarker
        :position="userPosition"
        :clickable="true"
        :options="{ icon: `${assetsPath}/images/rec.png` }"
      />

      <GMapMarker
        v-for="(tap, index) in taps"
        :key="index"
        :position="tap.position"
        :clickable="true"
        :options="{ icon: `${assetsPath}/images/drop.png` }"
        @click="handleMarkerClick(tap)"
      />
    </GMap>

    <v-btn
      color="red"
      class="bottom-button lighten-1 elevation-5"
      fab
      dark
      bottom
      right
      absolute
      @click="$store.dispatch('position/centerMap', $refs.map)"
    >
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>

    <v-btn
      color="red"
      class="bottom-button lighten-1 elevation-5"
      fab
      dark
      bottom
      left
      absolute
      to="/taps/new"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

import { Tap } from '~/types/Tap'

export default defineComponent({
  name: 'MapPage',
  computed: {
    ...mapGetters({
      userPosition: 'position/getUserPosition',
      mapCenter: 'position/getMapCenter',
      taps: 'taps/getTaps'
    }),
    assetsPath () {
      return process.env.NODE_ENV === 'production' ? '/tapp' : ''
    }
  },
  methods: {
    handleMarkerClick (tap: Tap) {
      window.location.href = `google.navigation:q=${tap.position.lat},${tap.position.lng}&mode=w`
    },
    handleAddTapClick () {
      this.$router.push('/taps/new')
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

  .bottom-button {
    bottom: 20px;
  }
}
</style>
