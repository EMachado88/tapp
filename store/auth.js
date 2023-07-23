export const state = () => ({
  user: null
})

export const getters = {
  getUser: (state) => {
    return state.user
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  async login ({ commit }, { identifier, password }) {
    try {
      const { jwt, user } = await this.$axios.$post('/auth/local', {
        identifier,
        password
      })

      this.$axios.setToken(jwt, 'Bearer')
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
      await this.$axios.$post('/auth/local/register', {
        username,
        email,
        password,
        firstName,
        lastName
      })

      await dispatch('login', { identifier: email, password })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
