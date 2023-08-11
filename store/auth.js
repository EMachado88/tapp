export const state = () => ({
  user: null,
  accessToken: null
})

export const getters = {
  getUser: (state) => {
    return state.user
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    try {
      const { accessToken, user } = await this.$axios.$post('/auth/login', {
        email,
        password
      })

      this.$axios.setToken(accessToken, 'Bearer')
      commit('setUser', user)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  logout ({ commit }) {
    this.$axios.setToken(false)
    commit('setUser', null)
  },
  async register ({ _commit, dispatch }, { username, email, password, firstName, lastName }) {
    try {
      await this.$axios.$post('/auth/signup', {
        username,
        email,
        password,
        firstName,
        lastName
      })

      await dispatch('login', { email, password })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
