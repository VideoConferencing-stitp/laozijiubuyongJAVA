import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const template = {
  radio: {
    type: "radio", // 单选
    title: "这他吗的是个单选题？",
    radio: "",
    labels: ["10-19", "20-22", "35+"]
  },
  checkbox: {
    type: "checkbox", // 多选
    title: "这他吗的不是个多选题？",
    checkList: [],
    labels: ["A", "B", "C"]
  },
  texteare: {
    type: "texteare", //填空
    title: "我没告诉你这是个填空题？",
    value: "描述你的想法"
  }
};

export default new Vuex.Store({
  state: {
    user: {
      questionnaireList: [
        { title: "术语速查手册 - Apache ECharts (incubating)", id: 0 },
        { title: "Vue.js 源码构建", id: 1 },
        { title: "2-3 运行架构设计模板", id: 2 },
        { title: "生成活码和生成二维码有什么区别", id: 3 }
      ]
    },
    questionnaire: {
      title: "🎉🎉这里是踏🐎个标题",
      description: "你看这个碗他又大又圆，你看这个面他又长又宽",
      questions: [template.radio, template.checkbox, template.texteare]
    }
  },
  mutations: {
    ADD_QUESTIONS(state, type) {
      state.questionnaire.questions.push(template[type])
    },
    REMOVE_QUESTIONNAIRE_LIST(state, id) {
      state.user.questionnaireList = state.user.questionnaireList.filter(item => item.id !== id)
    }
  },
  actions: {

  }
})