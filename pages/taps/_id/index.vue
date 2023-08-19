<template>
  <v-container>
    <Header icon="mdi-map-marker" text="Tap" />

    <section class="mt-10">
      <GMap
        v-if="tap.position.lat !== 0 && tap.position.lng !== 0"
        ref="map"
        class="map"
        language="en"
        :center="tap.position"
        :zoom="18"
        :options="{
          mapTypeControl: false,
          zoomControl: false,
          disableDefaultUI: true,
          draggable: false
        }"
      >
        <GMapMarker
          :key="tap._id"
          :position="tap.position"
          :options="{ icon: `${assetsPath}/images/drop.png` }"
        />
      </GMap>

      <div class="d-flex justify-space-between align-center mt-5">
        <div class="mr-2">
          <h6 class="text-h6">
            Address
          </h6>
          <p class="">
            {{ tap.address }}
          </p>
        </div>

        <div class="ml-2 mb-2 d-flex flex-wrap justify-end">
          <v-btn class="blue lighten-1 mb-2" @click="getDirections">
            <span>Directions</span>
          </v-btn>
          <v-btn v-if="user.isAdmin" class="ml-2">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </div>
    </section>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TapPage',
  computed: {
    tap () {
      return this.$store.getters['taps/getTapById'](this.$route.params.id) || { position: { lat: 0, lng: 0 } }
    },
    user () {
      return this.$store.getters['user/getUser'] || { isAdmin: false }
    },
    assetsPath () {
      return process.env.NODE_ENV === 'production' ? '/tapp' : ''
    }
  },
  methods: {
    getDirections () {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${this.tap.position.lat},${this.tap.position.lng}&travelmode=walking`)
    }
  }
})
</script>

<style lang="scss">
.map {
  height: 300px;

  .GMap__Wrapper {
    height: 100%;
  }
}
</style>
