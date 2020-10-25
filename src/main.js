import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import router from "./router"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    isJoined: false
  },

  mutations: {
    storeUser (state, payload) {
      state.user = payload
    },

    setIsJoined (state, payload) {
      state.isJoined = payload
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')