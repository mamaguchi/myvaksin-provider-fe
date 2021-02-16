export default {

  auth (state, authData) {
    state.auth = authData
  },

  setPrevRoute (state, prevRoute) {
    state.prevRoute = prevRoute
  },

  signupStatus (state, signupStatus) {
    state.signupStatus = signupStatus
  }

}
