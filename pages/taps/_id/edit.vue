<template>
  <v-container>
    <Header icon="mdi-map-marker" text="Tap" />

    <section class="mt-10">
      <GMap
        v-if="tap.position && tap.position.lat !== 0 && tap.position.lng !== 0"
        ref="map"
        class="map"
        language="en"
        :center="tap.position"
        :zoom="18"
        :options="{
          mapTypeControl: false,
          zoomControl: false,
          disableDefaultUI: true,
          draggable: true,
        }"
        @center_changed="centerChanged"
      >
        <img class="tap-marker" :src="`${assetsPath}/images/drop.png`" alt="Tap">
      </GMap>

      <div class="mt-5">
        <div class="mb-2 d-flex flex-wrap justify-space-between">
          <p class="text-caption">
            {{ tap.position.lat }},{{ tap.position.lng }}
          </p>
          <v-btn class="blue lighten-1 mb-2" @click="getDirections">
            <v-icon>mdi-directions</v-icon>
            <span class="ml-1">Directions</span>
          </v-btn>
        </div>

        <v-form ref="tapForm" :disabled="formDisabled" @submit.prevent="save">
          <v-text-field v-model="tap.address" type="text" label="Address" required :rules="addressRules" />

          <v-switch
            v-model="tap.active"
            label="Active"
          />

          <div v-if="hasChanged" class="d-flex justify-space-between">
            <v-btn type="submit" class="primary">
              <v-icon>mdi-floppy</v-icon>
              <span class="ml-1">Save</span>
            </v-btn>
            <v-btn class="ml-2" @click="cancel">
              <span>Reset</span>
            </v-btn>
          </div>
        </v-form>
      </div>
    </section>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const initialTap = { _id: 0, address: '', position: { lat: 0, lng: 0 }, active: false, rating: 5 }

export default defineComponent({
  name: 'TapEditPage',
  data() {
    return {
      tap: initialTap,
      initialTap,
      formDisabled: false,
      addressRules: [
        (v: string) => !!v || 'Address is required'
      ]
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`/taps/${this.$route.params.id}`)

    const initialData = {
      _id: data._id,
      address: data.address,
      position: {
        lat: data.latitude,
        lng: data.longitude
      },
      active: data.active,
      rating: Math.round(data.reviews.reduce((total: number, review: any) => total + review.rating, 0) / data.reviews.length)
    }

    this.tap = { ...initialData }
    this.initialTap = { ...initialData }
  },
  computed: {
    assetsPath(): string {
      return process.env.NODE_ENV === 'production' ? '/tapp' : ''
    },
    hasChanged(): boolean {
      return JSON.stringify(this.tap) !== JSON.stringify(this.initialTap)
    }
  },
  methods: {
    getDirections() {
      window.open(`geo:${this.tap.position.lat},${this.tap.position.lng}`)
    },
    centerChanged(event: any) {
      this.tap.position = {
        lat: event.map.center.lat(),
        lng: event.map.center.lng()
      }
    },
    cancel() {
      this.tap = { ...this.initialTap }
      this.$nextTick(() => (this.$refs.map as any).initMap())
    },
    async save() {
      this.formDisabled = true

      if (this.hasChanged && (this.$refs.tapForm as HTMLFormElement).validate()) {
        try {
          await this.$axios.$patch(`/taps/${this.$route.params.id}`, {
            address: this.tap.address,
            latitude: this.tap.position.lat,
            longitude: this.tap.position.lng,
            active: this.tap.active
          })

          this.initialTap = { ...this.tap }
        } catch (error) {
          console.error(error)
        }
      }

      this.formDisabled = false
    }
  }
})
</script>

<style lang="scss">
.map {
  height: 300px;
  position: relative;

  .GMap__Wrapper {
    height: 100%;
  }

  .tap-marker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    pointer-events: none;
  }
}

.review-rating {
  .star {
    cursor: pointer;

    &:hover {
      transform: scale3d(.5, .5, .5);
    }
  }
}
</style>
