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
    questionnaire: {
      title: "🎉🎉你看到的这是他吗的个标题",
      description: "你看这个碗他又大又圆，你看这个面他又长又宽",
      questions: [template.radio, template.checkbox, template.texteare]
    }
  },
  mutations: {
    ADD_QUESTIONS(state, type) {
      state.questionnaire.questions.push(template[type])
    },
  },
  actions: {

  }
})