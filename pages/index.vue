<template>
  <v-container>
    <Header icon="mdi-format-list-bulleted-square" text="Taps list" />

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
  computed: {
    ...mapGetters({
      taps: 'taps/getTaps',
      user: 'auth/getUser'
    }),
    processedTaps (): any[] {
      return this.taps
        .map((tap: any) => {
          const distance = this.$store.getters['position/getDistanceFromUser'](tap.position)
          return {
            ...tap,
            distance
          }
        })
        .filter((tap: any) => this.user.isAdmin || tap.isActive)
        .sort((a: any, b: any) => a.distance - b.distance)
    }
  }
})
</script>
