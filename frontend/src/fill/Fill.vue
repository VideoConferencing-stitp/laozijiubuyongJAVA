<template>
  <div v-if="questionnaire" class="fill">
    <!-- QN === questionnaire -->
    <div class="QN__header">
      <!-- 问卷标题 -->
      <div class="QN__title">
        <h1>{{questionnaire.title}}</h1>
      </div>
      <!-- 问卷描述 -->
      <div class="QN__description">
        <p>{{questionnaire.description}}</p>
      </div>
    </div>
    <!-- 问卷内容 -->
    <div class="QN__questions">
      <div class="QN__question" v-for="(question, i) of questionnaire.questions" :key="i">
        <!-- 单选 -->
        <div v-if="question.type === 'radio'">
          <p>{{question.title}}</p>
          <el-radio-group v-model="question.radio">
            <el-radio
              class="el-radio"
              v-for="(label, j) of question.labels"
              :key="j"
              :label="label"
            >{{ label }}</el-radio>
          </el-radio-group>
        </div>
        <!-- 多选 -->
        <div v-else-if="question.type === 'checkbox'">
          <p>{{question.title}}</p>
          <el-checkbox-group v-model="question.checkList">
            <el-checkbox
              class="el-checkbox"
              v-for="(lable, j) of question.labels"
              :label="lable"
              :key="j"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- 填空 -->
        <div class v-else-if="question.type === 'texteare'">
          <p>{{question.title}}</p>
          <el-input v-model="question.value">texteare</el-input>
        </div>
      </div>
    </div>
    <el-button class="release-button" type="primary" size="medium">提交</el-button>
  </div>
</template>
<script>
const getTemplate = function(type) {
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
  return template[type];
};
export default {
  components: {},
  name: "Edit",
  props: {},
  data() {
    return {
      questionnaire: {
        title: "🎉🎉这里是踏🐎个标题",
        questions: [
          getTemplate("radio"),
          getTemplate("checkbox")
        ]
      }
    }
  },
  methods: {
    async loadQuestionnaire() {
      
    }
  }
};
</script>
<style scoped lang='scss'>
.fill {
  padding-bottom: 5rem;
}
.header {
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
}

.QN__title {
  h1 {
    text-align: center;
    margin-bottom: 0.8em;
  }
}

.QN__description {
  p {
    text-align: center;
  }
}

.QN__header,
.QN__question {
  padding: 2rem 4rem;
  margin: 1rem 3rem;
  border-bottom: solid 1px #e6e6e6;
}

.QN__question {
  p {
    margin-bottom: 1em;
  }
}

.QN__questions {
  margin-bottom: 3rem;
}


.el-radio-group {
  display: block;
}

.el-radio,
.el-checkbox {
  display: block;
  padding: 0.5em;
}


.release-button {
  display: block;
  width: 10rem;
  margin: 0 auto;
}
</style>