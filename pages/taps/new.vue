<template>
  <v-container>
    <h5 class="text-h5 d-flex align-center">
      <v-icon class="mr-3" size="32px">
        mdi-water
      </v-icon>
      Add Tap
    </h5>

    <v-card outlined class="mx-auto my-5 elevation-5">
      <v-card-text>
        <v-form ref="newTapForm" :disabled="newTapFormDisabled" @submit.prevent="addTap">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Name"
                  :rules="nameRules"
                  required
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Description"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <GMap
                  ref="map"
                  :center="mapCenter"
                  :zoom="18"
                  :options="{
                    mapTypeControl: false,
                    zoomControl: false,
                    disableDefaultUI: true
                  }"
                  @center_changed="$store.dispatch('position/setMapCenter', { lat: $event.map.center.lat(), lng: $event.map.center.lng()})"
                  @click="handleMapClick"
                >
                  <GMapMarker
                    :position="position"
                    :options="{
                      icon: `${assetsPath}/images/drop.png`
                    }"
                  />
                </GMap>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn block color="blue lighten-1" type="submit">
                  Add Tap
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewTapPage',
  middleware: 'auth',
  data () {
    return {
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      description: '',
      position: {
        lat: 0,
        lng: 0
      },
      newTapFormDisabled: false
    }
  },
  computed: {
    ...mapGetters({
      mapCenter: 'position/getMapCenter'
    }),
    assetsPath () {
      return process.env.NODE_ENV === 'production' ? '/tapp' : ''
    }
  },
  methods: {
    async addTap () {
      this.newTapFormDisabled = true

      try {
        await this.$store.dispatch('taps/addTap', {
          name: this.name,
          description: this.description,
          position: this.position
        })

        this.$router.push('/taps')
      } catch (error) {
        console.error(error)
      } finally {
        this.newTapFormDisabled = false
      }
    },
    handleMapClick (event) {
      this.position = {
        lat: event.event.latLng.lat(),
        lng: event.event.latLng.lng()
      }
      this.$store.dispatch('position/setMapCenter', this.position)
      this.$refs.map.initMap()
      console.log(this.position)
    }
  }
}
</script>
