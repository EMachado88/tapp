export default function ({ store, redirect }) {
  if (!store.getters['auth/getUser']) {
    return redirect('/account')
  }
}
