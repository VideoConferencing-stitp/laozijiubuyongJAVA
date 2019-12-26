import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      userId: '', // 用户id
      questionnaireList: []  // home页面的问卷列表
    },
    currentQnId: '', // 最近点击的问卷Id
    questionnaire: null, // 当前预览的问卷
    loading: false // 全局 loading
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.user.userId = id
    },
    SET_QUESTIONNAIRE_LIST(state, payload) {
      state.user.questionnaireList = payload
    },
    SET_QUESTIONNAIRE(state, payload) {
      state.questionnaire = payload
    },
    REMOVE_QUESTIONNAIRE_LIST(state, id) {
      state.user.questionnaireList = state.user.questionnaireList.filter(item => item.id !== id)
    },
    SET_CURRENT_QNID(state, qnId) {
      state.currentQnId = qnId
    },
    SET_LOADING(state, value) {
      state.loading = value
    }
  }
})