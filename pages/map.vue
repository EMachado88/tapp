<template>
  <div id="map-wrap">
    <GMap
      ref="map"
      :center="mapCenter"
      :zoom="18"
      :options="{
        mapTypeControl: false,
        zoomControl: false,
        disableDefaultUI: true
      }"
      @center_changed="$store.dispatch('position/setMapCenter', $event.map.center)"
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
      />
    </GMap>

    <v-btn
      color="red"
      class="center-button lighten-1 elevation-5"
      fab
      dark
      absolute
      bottom
      right
      @click="$store.dispatch('position/centerMap')"
    >
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

import { taps } from '~/mocks/taps'

export default defineComponent({
  name: 'MapPage',
  data () {
    return {
      taps
    }
  },
  computed: {
    ...mapGetters({
      userPosition: 'position/getUserPosition',
      mapCenter: 'position/getMapCenter'
    }),
    assetsPath () {
      return process.env.NODE_ENV === 'production' ? '/tapp' : ''
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
