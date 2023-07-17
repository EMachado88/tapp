<template>
  <v-container>
    <h5 class="text-h5 d-flex align-center">
      <v-icon class="mr-3" size="32px">
        mdi-account
      </v-icon>
      Account
    </h5>

    <section class="mt-10">
      <v-card outlined class="mx-auto my-5 elevation-5">
        <v-card-text>
          <form @submit.prevent="login">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    append-icon="mdi-email"
                    required
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="passwordRules"
                    label="Password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    required
                    @click:append="() => (showPassword = !showPassword)"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-btn type="submit" color="red lighten-1 mt-2">
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </v-card-text>
      </v-card>
    </section>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccountPage',
  data () {
    return {
      email: '',
      emailRules: [
        (v: string) => !!v || 'Email is required',
        (v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'Email must be valid'
      ],
      password: '',
      passwordRules: [
        (v: string) => !!v || 'Password is required'
      ],
      showPassword: false
    }
  },
  methods: {
    login (e: Event) {
      e.preventDefault()
      console.log('login') // eslint-disable-line no-console
    }
  }
})
</script>
