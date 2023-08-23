export const state = () => ({
  user: {
    isAdmin: false
  },
  accessToken: null
})

export const getters = {
  getUser: (state) => {
    return state.user
  },
  getAccessToken: (state) => {
    return state.accessToken
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  }
}

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const { accessToken, user } = await this.$axios.$post('/auth/login', {
        username,
        password
      })

      if (!user) {
        return Promise.reject(new Error('Invalid user'))
      }

      commit('setUser', user)
      commit('setAccessToken', accessToken)
      this.$axios.setToken(accessToken, 'Bearer')
    } catch (error) {
      return Promise.reject(error)
    }
  },
  logout({ commit }) {
    this.$axios.setToken(false)
    commit('setUser', null)
  },
  async register(
    { dispatch },
    { username, password, firstName, lastName }
  ) {
    try {
      await this.$axios.$post('/auth/signup', {
        username,
        password,
        firstName,
        lastName
      })

      await dispatch('login', { username, password })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async deleteAccount({ commit, dispatch }) {
    try {
      await this.$axios.$delete(`/auth/delete/${this.state.auth.user._id}`)

      dispatch('logout')
      commit('setUser', null)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
