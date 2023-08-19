<template>
  <v-app dark>
    <v-main class="main">
      <Nuxt />
    </v-main>
    <v-footer padless>
      <v-card flat tile width="100%" class="primary text-center">
        <v-card-text>
          <nav>
            <span v-for="item in navItems" :key="item.icon" class="nav-item">
              <v-btn class="mx-4" text :to="item.path" fab x-large>
                <v-icon size="32px">
                  {{ item.icon }}
                </v-icon>
              </v-btn>
            </span>
          </nav>
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text text-caption">
          &copy; {{ new Date().getFullYear() }} <strong>Tapp</strong>. All rights
          reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { NavItem } from '@/types/NavItem'
import { Tap } from '@/types/Tap'

export default defineComponent({
  name: 'DefaultLayout',
  data() {
    return {
      navItems: [
        {
          name: 'Home',
          icon: 'mdi-format-list-bulleted-square',
          path: '/'
        },
        {
          name: 'Map',
          icon: 'mdi-map-marker',
          path: '/map'
        },
        {
          name: 'Profile',
          icon: 'mdi-account',
          path: '/account'
        }
      ] as NavItem[]
    }
  },
  created() {
    this.$store.dispatch('taps/fetchTaps')

    this.$nuxt.$on('tap-selected', this.handleTapSelect)
  },
  mounted() {
    this.$store.dispatch('position/setUserPosition')
  },
  methods: {
    handleTapSelect(tap: Tap) {
      this.$nuxt.$router.push('/map')
      this.$store.dispatch('position/setMapCenter', tap.position)
    }
  }
})
</script>

<style lang="scss">
.main {
  max-height: calc(100vh - 157px);
  overflow: auto;
}
</style>
