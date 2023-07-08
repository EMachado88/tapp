<template>
  <v-app dark>
    <v-main class="main">
      <Nuxt @tap-selected="handleTapSelect" />
    </v-main>
    <v-footer fixed padless>
      <v-card flat tile width="100%" class="red lighten-1 text-center">
        <v-card-text>
          <span v-for="item in navItems" :key="item.icon" class="nav-item">
            <v-btn class="mx-4" text :to="item.path" fab x-large>
              <v-icon size="32px">
                {{ item.icon }}
              </v-icon>
            </v-btn>
          </span>
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text text-caption">
          <strong>Tapp</strong> | &copy; {{ new Date().getFullYear() }} <strong>Emanuel Machado</strong>. All rights
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
  data () {
    return {
      navItems: [
        {
          name: 'Home',
          icon: 'mdi-home',
          path: '/'
        } as NavItem,
        {
          name: 'Map',
          icon: 'mdi-map-marker',
          path: '/map'
        } as NavItem,
        {
          name: 'Settings',
          icon: 'mdi-cog',
          path: '/settings'
        } as NavItem
      ] as NavItem[]
    }
  },
  created () {
    this.$nuxt.$on('tap-selected', this.handleTapSelect)
  },
  mounted () {
    this.$store.dispatch('position/setUserPosition')
  },
  methods: {
    handleTapSelect (_tap: Tap) {
      this.$nuxt.$router.push('/map')
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
