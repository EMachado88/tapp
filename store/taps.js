export const state = () => ({
  taps: []
})

export const getters = {
  getTaps: (state) => {
    return state.taps
  },

  getTapById: state => (id) => {
    return state.taps.find(tap => tap.id === id)
  }
}

export const mutations = {
  setTaps (state, taps) {
    state.taps = taps
  }
}

export const actions = {
  async fetchTaps ({ commit }) {
    try {
      const response = await this.$axios.$get('/taps')

      const taps = response.map((tap) => {
        const { _id, address, latitude, longitude } = tap
        return {
          id: _id,
          address,
          position: {
            lat: latitude,
            lng: longitude
          },
          rating: tap.rating
        }
      })

      commit('setTaps', taps)
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
  },
  async addTap ({ commit }, tap) {
    try {
      const response = await this.$axios.$post('/taps', {
        name: tap.name,
        latitude: tap.position.lat,
        longitude: tap.position.lng,
        description: tap.description
      })

      const newTap = {
        id: response.id,
        name: response.name,
        position: {
          lat: response.latitude,
          lng: response.longitude
        }
      }

      commit('setTaps', [...this.state.taps, newTap])
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
  }
}
