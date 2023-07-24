<template>
  <v-card
    :key="tap.id"
    outlined
    class="mx-auto my-5 elevation-5"
    @click="$nuxt.$emit('tap-selected', tap)"
  >
    <v-card-text class="d-flex align-center">
      <div class="flex-grow-1">
        <h6 class="text-h6">
          {{ tap.name }}
        </h6>
        <span v-if="tap.distance">{{ tap.distance }}m</span>
      </div>

      <div class="d-flex justify-end">
        <v-icon v-for="(_star, index) in Array(tap.rating)" :key="index" size="14px">
          mdi-star
        </v-icon>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TapListItem',
  props: {
    tap: {
      type: Object,
      required: true
    }
  },
  computed: {
    distance () {
      return this.$store.getters['position/getDistanceFromUser'](this.tap.position)
    }
  }
}
</script>
