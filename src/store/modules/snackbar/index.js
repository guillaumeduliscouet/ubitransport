export default {
  namespaced: true,
  state: {
    show: false,
    message: ''
  },
  getters: {
    show (state) {
      return state.show
    }
  },
  mutations: {
    show (state, { message }) {
      state.show = true
      state.message = message
    },
    hide (state) {
      state.show = false
    }
  },
  actions: {
    show ({ commit }, { message = '' }) {
      commit('show', { message })
    },
    hide ({ commit }) {
      commit('hide')
    }
  }
}
