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
          <v-form v-if="!user" ref="loginForm" :disabled="loginFormDisabled" @submit.prevent="login">
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
                  <v-btn type="submit" color="blue lighten-1 mt-2">
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <div v-else>
            <v-card-title>
              <h5 class="text-h5">
                Welcome back, {{ user.username }}
              </h5>
            </v-card-title>

            <v-card-actions>
              <v-btn color="blue lighten-1" @click="logout">
                Logout
              </v-btn>
            </v-card-actions>
          </div>
        </v-card-text>
      </v-card>
    </section>

    <v-snackbar
      v-model="loginErrorSnackbar"
      color="red"
      class="elevation-5"
    >
      Wrong email or password
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

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
      showPassword: false,
      loginFormDisabled: false,
      loginErrorSnackbar: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
  methods: {
    async login () {
      if (!this.loginFormDisabled && (this.$refs.loginForm as Vue & { validate: () => boolean }).validate()) {
        this.loginFormDisabled = true

        try {
          await this.$store.dispatch('auth/login', {
            identifier: this.email,
            password: this.password
          })
        } catch (error) {
          this.loginErrorSnackbar = true
        } finally {
          this.loginFormDisabled = false
        }
      }
    },
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
})
</script>
