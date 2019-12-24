import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '', // 用户id
      questionnaireList: [ // home页面的问卷列表
        // { title: "术语速查手册 - Apache ECharts (incubating)", id: 0 },
        // { title: "Vue.js 源码构建", id: 1 },
        // { title: "2-3 运行架构设计模板", id: 2 },
        // { title: "生成活码和生成二维码有什么区别", id: 3 }
      ]
    },
    questionnaire: {}
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.user.id = id
    },
    SET_QUESTIONNAIRE_LIST(state, payload) {
      state.user.questionnaireList = payload
    },
    SET_QUESTIONNAIRE(state, payload) {
      state.questionnaire = payload
    },
    REMOVE_QUESTIONNAIRE_LIST(state, id) {
      state.user.questionnaireList = state.user.questionnaireList.filter(item => item.id !== id)
    }
  },
  actions: {

  }
})