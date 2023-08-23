<template>
  <v-card
    :key="tap._id"
    outlined
    class="mx-auto my-5 elevation-5"
    @click="$nuxt.$emit('tap-selected', tap)"
  >
    <v-card-text class="d-flex align-center">
      <div class="flex-grow-1">
        <h6 class="text-body-2 font-weight-bold mr-2 mb-2">
          {{ tap.address }}
        </h6>
        <span v-if="tap.distance">in {{ tap.distance }}m</span>
      </div>

      <div class="d-flex justify-end">
        <v-icon v-for="(_star, index) in Array(tap.rating)" :key="index" size="14px">
          mdi-star
        </v-icon>
      </div>
    </v-card-text>
    <v-card-actions v-if="user.isAdmin">
      <v-btn :to="`/taps/${tap._id}/edit`" color="warning">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
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
    },
    user () {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
