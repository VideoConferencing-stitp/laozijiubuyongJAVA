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
    <el-button class="submmit__button" type="primary" size="medium" @click="submmit">提交</el-button>
  </div>
</template>
<script>
import getQnApi from "../api/getQnApi";
import submitQnApi from "../api/submitQnApi";

const num2UpperAlpha = num => String.fromCharCode(65 + num);

export default {
  name: "Fill",
  data() {
    return {
      qnId: '',
      questionnaire: null
    };
  },
  created() {
    this.qnId = this.$route.query['qnId']
    console.log(this.qnId);
    this.loadQn();
  },
  methods: {
    async loadQn() {
      try {
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
      } catch (e) {
        console.error(e);
      }
    },
    mergeQuestion() {
      let data = {
        qnId: "",
        answers: []
      };

      const { id, questions } = this.questionnaire;
      data.qnId = id;
      questions.forEach(question => {
        const { type, labels, qId, radio, checkList } = question;
        let answer = {
          qId,
          checkList: []
        };
        if (type === "radio") {
          if (labels.indexOf(radio) !== -1) {
            answer.checkList.push(num2UpperAlpha(labels.indexOf(radio)));
          }
        } else {
          checkList.forEach(radio => {
            if (labels.indexOf(radio) !== -1) {
              answer.checkList.push(num2UpperAlpha(labels.indexOf(radio)));
            }
          });
        }
        data.answers.push(answer);
      });

      return data;
    },
    async submmit() {
      const questionnaire = this.mergeQuestion();
      try {
        const res = await submitQnApi(questionnaire);
        const { code, msg } = res;
        if (code === 200) {
          this.$message({
            type: "success",
            message: msg
          });
        } else {
          this.$message({
            type: "error",
            message: msg
          });
        }
      } catch (e) {
        console.error(e);
      }
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

.submmit__button {
  display: block;
  width: 15rem;
  margin: 0 auto;
}
</style>