export const state = () => ({
  taps: []
})

export const getters = {
  getTaps: (state) => {
    return state.taps
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
      const { data } = await this.$axios.$get('/taps')

      const taps = data.map((tap) => {
        return {
          id: tap.id,
          name: tap.name,
          position: {
            lat: tap.latitude,
            lng: tap.longitude
          },
          rating: tap.rating
        }
      })

      commit('setTaps', taps)
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
  }
}
