<template>
  <div class="edit">
    <!-- QN === questionnaire -->
    <!-- 问卷标题 -->
    <div class="QN__title">
      <h1>{{questionnaire.title}}</h1>
    </div>
    <!-- 问卷描述 -->
    <div class="QN__description">
      <p>{{questionnaire.description}}</p>
    </div>
    <!-- 问卷内容 -->
    <div class="QN__questions">
      <template v-for="(question, i) of questionnaire.questions">
        <!-- 单选 -->
        <div v-if="question.type === 'radio'" :key="i">
          <p>{{question.title}}</p>
          <el-radio-group v-model="question.radio">
            <el-radio v-for="(label, j) of question.labels" :key="j" :label="label">{{ label }}</el-radio>
          </el-radio-group>
        </div>
        <!-- 多选 -->
        <div v-else-if="question.type === 'checkbox'" :key="i">
          <p>{{question.title}}</p>
          <el-checkbox-group v-model="question.checkList">
            <el-checkbox v-for="(lable, j) of question.labels" :label="lable" :key="j"></el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- 填空 -->
        <div class v-else-if="question.type === 'texteare'" :key="i">
          <p>{{question.title}}</p>
          <el-input v-model="question.value">texteare</el-input>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Edit",
  props: {},
  data() {
    return {
      questionnaire: {
        title: "🎉🎉车克闹",
        description: "你看这个碗他又大又圆，你看这个面他又长又宽",
        questions: [
          {
            type: "radio", // 单选
            title: "How old are you?",
            radio: "A",
            labels: ["10-19", "20-22", "35+"]
          },
          {
            type: "checkbox", // 多选
            title: "How old are you?",
            checkList: ["A"],
            labels: ["A", "B", "C"]
          },
          {
            type: "texteare", //填空
            title: "How old are you?",
            value: "描述你的想法"
          },
        ]
      }
    };
  },
  watch: {
    radio(newV) {
      console.log(newV);
    }
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
</style>