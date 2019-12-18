import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    number: 10
  },
  mutations: {
    SET_NUMBER(state) {
      state.number = state.number * 2
    }
  },
  actions: {

  }
})