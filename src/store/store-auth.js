import { auth } from 'boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser({}, payload) {
    Loading.show()
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => console.log(response))
      .catch(error => showErrorMessage(error.message))
  },
  loginUser({}, payload) {
    Loading.show()
    auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => console.log(response))
      .catch(error => showErrorMessage(error.message))
  },
  logoutUser() {
    auth.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    auth.onAuthStateChanged((user) => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(e => {})
        dispatch('tasks/firebaseReadData', null, { root: true })
      } else {
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(e => {})
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
