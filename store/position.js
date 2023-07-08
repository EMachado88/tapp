export const state = () => ({
  mapCenter: { lat: 0, lng: 0 },
  userPosition: { lat: 0, lng: 0 },
  watchId: 0
})

export const getters = {
  getUserPosition (state) {
    return state.userPosition
  },
  getMapCenter (state) {
    return state.mapCenter
  }
}

export const mutations = {
  setUserPosition (state, position) {
    state.userPosition = position
  },
  setWatchId (state, watchId) {
    state.watchId = watchId
  },
  centerMap (state) {
    state.mapCenter = state.userPosition
  },
  setMapCenter (state, position) {
    state.mapCenter = position
  }
}

export const actions = {
  setUserPosition ({ commit, state }) {
    // Watch position and move user marker
    commit('setWatchId', navigator.geolocation.watchPosition((position) => {
      const positionLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      commit('setUserPosition', positionLatLng)

      if (!(state.userPosition.lat === 0 && state.userPosition.lng === 0)) {
        commit('centerMap')
      }
    },
    error => console.error(error), // eslint-disable-line
    {
      enableHighAccuracy: true
    }))
  },
  centerMap ({ commit }) {
    commit('centerMap')
  },
  setMapCenter ({ commit }, position) {
    commit('setMapCenter', position)
  }
}
