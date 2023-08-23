export default function ({ $axios, store }) {
  if (store.state.auth.accessToken) {
    $axios.setToken(store.state.auth.accessToken, 'Bearer')
  }
}
