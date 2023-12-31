<template>
  <v-container>
    <Header icon="mdi-account" text="Account" />

    <client-only>
      <section class="mt-10">
        <v-card outlined class="mx-auto my-5 elevation-5">
          <v-card-text>
            <div v-if="user">
              <v-card-title>
                <h5 class="text-h5">
                  Welcome back, {{ user.firstName }} {{ user.lastName }}
                </h5>
              </v-card-title>

              <v-card-actions>
                <v-btn color="primary" @click="logout">
                  Logout
                </v-btn>

                <v-btn outlined color="secondary" @click="deleteDialog = true">
                  Delete Account
                </v-btn>
              </v-card-actions>
            </div>

            <div v-else>
              <v-tabs v-model="tab">
                <v-tab>Login</v-tab>
                <v-tab>Register</v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <!-- Login form -->
                  <v-form ref="loginForm" :disabled="loginFormDisabled" @submit.prevent="login">
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="Email"
                            type="email"
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
                          <v-btn block type="submit" color="primary mt-2">
                            Login
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <!-- end Login form -->
                </v-tab-item>

                <v-tab-item>
                  <!-- Register form -->
                  <v-form ref="registerForm" :disabled="registerFormDisabled" @submit.prevent="register">
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="email" :rules="emailRules" label="Email" type="email" required />
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field v-model="firstName" :rules="firstNameRules" label="First name" required />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field v-model="lastName" :rules="lastNameRules" label="Last name" required />
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" md="6">
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

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="confirmPassword"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            :rules="confirmPasswordRules"
                            label="Confirm password"
                            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            required
                            @click:append="() => (showConfirmPassword = !showConfirmPassword)"
                          />
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <v-btn block type="submit" color="primary mt-2">
                            Register
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <!-- end Register form -->
                </v-tab-item>
              </v-tabs-items>
            </div>
          </v-card-text>
        </v-card>
      </section>
    </client-only>

    <v-snackbar v-model="loginErrorSnackbar" color="red" class="elevation-5">
      Wrong email or password
    </v-snackbar>

    <v-snackbar v-model="registerErrorSnackbar" color="red" class="elevation-5">
      Email already taken
    </v-snackbar>

    <v-snackbar v-model="deleteErrorSnackbar" color="red" class="elevation-5">
      Wrong password
    </v-snackbar>

    <v-dialog
      v-model="deleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Account deletion
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete your account?
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>

          <v-spacer />

          <v-btn
            color="secondary"
            @click="deleteAccount"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountPage',
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'Email must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,30}$/.test(v) || 'Password must be 8-30 characters long and contain at least one uppercase letter, one number and one special character'
      ],
      firstName: '',
      firstNameRules: [
        v => !!v || 'First name is required'
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Last name is required'
      ],
      confirmPassword: '',
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.password || 'Confirm password must match password'
      ],
      showPassword: false,
      showConfirmPassword: false,
      loginFormDisabled: false,
      loginErrorSnackbar: false,
      registerFormDisabled: false,
      registerErrorSnackbar: false,
      deleteErrorSnackbar: false,
      tab: 0,
      deleteDialog: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
  methods: {
    async login() {
      if (!this.loginFormDisabled && this.$refs.loginForm.validate()) {
        this.loginFormDisabled = true

        try {
          await this.$store.dispatch('auth/login', {
            username: this.email,
            password: this.password
          })
        } catch (error) {
          this.loginErrorSnackbar = true
        } finally {
          this.loginFormDisabled = false
        }
      }
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
    async register() {
      if (!this.registerFormDisabled && this.$refs.registerForm.validate()) {
        this.registerFormDisabled = true

        try {
          await this.$store.dispatch('auth/register', {
            username: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password
          })
        } catch (error) {
          this.registerErrorSnackbar = true
        } finally {
          this.registerFormDisabled = false
        }
      }
    },
    async deleteAccount() {
      try {
        await this.$store.dispatch('auth/deleteAccount')
      } catch (error) {
        this.deleteErrorSnackbar = true
      } finally {
        this.password = ''
        this.deleteDialog = false
      }
    }
  }
}
</script>
