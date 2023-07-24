<template>
  <v-container>
    <h5 class="text-h5 d-flex align-center">
      <v-icon class="mr-3" size="32px">
        mdi-format-list-bulleted-square
      </v-icon>
      Taps list
    </h5>
    <section class="mt-10">
      <TapListItem v-for="tap in processedTaps" :key="tap.id" :tap="tap" />
    </section>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'IndexPage',
  components: {
    TapListItem: () => import('@/components/TapListItem.vue')
  },
  computed: {
    ...mapGetters({
      taps: 'taps/getTaps'
    }),
    processedTaps (): any[] {
      return this.taps.map((tap: any) => {
        const distance = this.$store.getters['position/getDistanceFromUser'](tap.position)
        return {
          ...tap,
          distance
        }
      }).sort((a: any, b: any) => a.distance - b.distance)
    }
  }
})
</script>
