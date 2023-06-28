<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      fixed
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        class="red lighten-1 text-center"
      >
        <v-card-text>
          <span
            v-for="item in navItems"
            :key="item.icon"
            class="nav-item"
          >
            <v-btn
              class="mx-4"
              text
              :to="item.path"
              fab
              x-large
            >
              <v-icon size="32px">
                {{ item.icon }}
              </v-icon>
            </v-btn>
          </span>
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text text-caption">
          <strong>Taps</strong> | &copy; {{ new Date().getFullYear() }} <strong>Emanuel Machado</strong>. All rights reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface NavItem {
  name: string,
  icon: string,
  path: string
}

export default defineComponent({
  name: 'DefaultLayout',
  data () {
    return {
      navItems: [
        {
          name: 'Home',
          icon: 'mdi-home',
          path: '/'
        },
        {
          name: 'Map',
          icon: 'mdi-map-marker',
          path: '/map'
        },
        {
          name: 'Settings',
          icon: 'mdi-cog',
          path: '/settings'
        }
      ] as NavItem[]
    }
  }
})
</script>
