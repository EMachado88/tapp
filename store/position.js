import haversine from 'haversine-distance'

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
  },
  // Returns the distance from user, in meters
  getDistanceFromUser (state) {
    return (position) => {
      return parseInt(haversine(state.userPosition, position))
    }
  }
}

export const mutations = {
  setUserPosition (state, position) {
    state.userPosition = position
  },
  setWatchId (state, watchId) {
    state.watchId = watchId
  },
  setMapCenter (state, position) {
    state.mapCenter = position
  }
}

export const actions = {
  setUserPosition ({ commit, state }) {
    // Watch position and move user marker
    commit('setWatchId', navigator.geolocation.watchPosition((position) => {
      commit('setUserPosition', {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })

      if (!(state.userPosition.lat === 0 && state.userPosition.lng === 0)) {
        commit('setMapCenter', state.userPosition)
      }
    },
    // Error callback
    (error) => {
      console.log(error) // eslint-disable-line no-console
      this.$router.push('/enable-location')
    },
    // Options
    {
      enableHighAccuracy: true,
      maximumAge: 0
    }))
  },
  async centerMap ({ commit, state }, map) {
    await commit('setMapCenter', state.userPosition)
    map.initMap()
  },
  setMapCenter ({ commit }, position) {
    commit('setMapCenter', position)
  }
}
