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
  </div>
</template>
<script>
import getQnApi from "../api/getQnApi";
import submitQnApi from "../api/submitQnApi";

export default {
  name: "Fill",
  data() {
    return {
      qnId: window.location.search.split("=")[1],
      questionnaire: null
    };
  },
  methods: {
    async loadQn() {
      const res = await getQnApi({ qnId: this.qnId });
      const { code, msg, data } = res;
      if (code === 200) {
        this.questionnaire = data;
      } else {
        this.$message({
          type: "error",
          message: msg
        });
      }
    },
    async submmit() {
      submitQnApi();
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
</style>