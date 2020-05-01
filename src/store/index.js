import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://favouritequiz-707a.restdb.io/rest/items',
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '5eac3aa9161b39295cdee7d9'
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    quizes: []
  },

  actions: {
    async fetchQuizes ({ commit }) {
      commit('SET_LOADING', true)
      const { data } = await api.get()
      commit('SET_QUIZES', data)
      commit('SET_LOADING', false)
    },
    async addQuiz ({ dispatch, commit }, quizData) {
      commit('SET_LOADING', true)
      await api.post('', {
        quiz: quizData
      })
      dispatch('fetchQuizes')
    }
  },

  mutations: {
    SET_LOADING (state, status) {
      state.loading = status
    },
    SET_QUIZES (state, quizes) {
      state.quizes = [...quizes]
    }
  }
})
