// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'tapp',
    storage: window.localStorage,
    reducer: state => ({
      auth: state.auth
    })
  }).plugin(store)
}
