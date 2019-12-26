<template>
  <div class="edit">
    <div class="header">
      <el-page-header @back="() => $router.back()" content="问卷编辑" />
    </div>
    <!-- QN === questionnaire -->
    <div class="QN__header">
      <!-- 问卷标题 -->
      <div class="QN__title">
        <el-input
          ref="inputTitleDOM"
          v-if="titleEditing"
          v-model="questionnaire.title"
          :placeholder="questionnaire.title"
          @blur="titleEditing = false"
          @keyup.enter.native="titleEditing = false"
        ></el-input>
        <h1 v-else @click="handleTitleClick">{{questionnaire.title}}</h1>
      </div>
      <!-- 问卷描述 -->
      <div class="QN__description">
        <el-input
          ref="inputSubtitleDOM"
          v-if="subtitleEditing"
          v-model="questionnaire.description"
          :placeholder="questionnaire.description"
          @blur="subtitleEditing = false"
          @keyup.enter.native="subtitleEditing = false"
        ></el-input>
        <p v-else @click="handleSubtitleClick">{{questionnaire.description}}</p>
      </div>
    </div>
    <!-- 问卷内容 -->
    <div class="QN__questions">
      <div
        class="QN__question"
        v-for="(question, i) of questionnaire.questions"
        :key="i"
        @mouseover="() => { hoverQuestion = true; activeQuestionIndex = i }"
        @mouseout="hoverQuestion = false"
      >
        <i
          v-show="hoverQuestion && activeQuestionIndex === i"
          class="el-icon-delete delete-icon"
          @click="deleteQuestion(i)"
        ></i>
        <el-input
          :ref="`title${i}`"
          v-if="questionTitleEditing && currentQuestionTitleIndex === `${i}`"
          :placeholder="question.title"
          v-model="question.title"
          @blur="questionTitleEditing = false"
          @keyup.enter.native="questionTitleEditing = false"
        ></el-input>
        <p v-else @click="handleQuestionTitleClick(`${i}`, `title${i}`)">{{question.title}}</p>
        <!-- 单选 -->
        <div v-if="question.type === 'radio'">
          <el-radio-group v-model="question.radio" class="el-radio-group">
            <div v-for="(label, j) of question.labels" :key="j">
              <el-input
                :ref="`DOM${i}${j}`"
                v-if="radioEditing && currentRadioIndex === `${i}${j}`"
                :placeholder="label"
                v-model="question.labels[j]"
                @blur="radioEditing = false"
                @keyup.enter.native="radioEditing = false"
              ></el-input>
              <el-radio
                v-else
                class="el-radio"
                :label="label"
                @click.native="handleRadioClick(`${i}${j}`, `DOM${i}${j}`)"
              >{{ label }}</el-radio>
            </div>
          </el-radio-group>
        </div>
        <!-- 多选 -->
        <div v-else-if="question.type === 'checkbox'">
          <el-checkbox-group v-model="question.checkList">
            <div v-for="(label, j) of question.labels" :key="j">
              <el-input
                :ref="`DOM${i}${j}`"
                v-if="checkboxEditing && currentCheckboxIndex === `${i}${j}`"
                :placeholder="label"
                v-model="question.labels[j]"
                @blur="checkboxEditing = false"
                @keyup.enter.native="checkboxEditing = false"
              ></el-input>
              <el-checkbox
                v-else
                class="el-checkbox"
                :label="label"
                @click.native="handleCheckboxClick(`${i}${j}`, `DOM${i}${j}`)"
              ></el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <!-- 填空 -->
        <div v-else-if="question.type === 'texteare'">
          <el-input v-model="question.value">texteare</el-input>
        </div>
      </div>
    </div>
    <!-- 操作 -->
    <div class="operation">
      <el-dropdown @command="addQuestion">
        <el-button type="primary">
          添加题目
          <i class="el-icon-circle-plus el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="radio">单选题</el-dropdown-item>
          <el-dropdown-item command="checkbox">多选题</el-dropdown-item>
          <el-dropdown-item command="texteare">填空题</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button-group>
        <el-button class="release-button" type="primary" @click="preview">预览</el-button>
        <el-button class="release-button" type="primary" @click="release">发布</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
// 函数返回值保证新产生的数据
// 不受响应式数据的副作用影响
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
      titleEditing: false,
      subtitleEditing: false,
      radioEditing: false,
      checkboxEditing: false,
      questionTitleEditing: false,
      hoverQuestion: false,
      currentRadioIndex: "",
      currentCheckboxIndex: "",
      currentTitleIndex: "",
      currentQuestionTitleIndex: "",
      activeQuestionIndex: 0,

      questionnaire: {
        title: "🎉🎉这里是踏🐎个标题",
        description:
          "你看这个碗他又大又圆，你看这个面他又长又宽你看这个碗他又大又圆，你看这个面他又长又宽",
        questions: [
          getTemplate("radio"),
          getTemplate("checkbox"),
          getTemplate("texteare")
        ]
      }
    };
  },
  mounted() {
    console.log(getTemplate("radio") === getTemplate("radio"));
  },
  methods: {
    handleTitleClick() {
      this.titleEditing = true;
      this.$nextTick(() => {
        this.$refs.inputTitleDOM.focus();
      });
    },
    handleSubtitleClick() {
      this.subtitleEditing = true;
      this.$nextTick(() => {
        this.$refs.inputSubtitleDOM.focus();
      });
    },
    handleRadioClick(index, ref) {
      this.radioEditing = true;
      this.currentRadioIndex = index;
      this.$nextTick(() => {
        this.$refs[ref][0].focus();
      });
    },
    handleCheckboxClick(index, ref) {
      this.checkboxEditing = true;
      this.currentCheckboxIndex = index;
      this.$nextTick(() => {
        this.$refs[ref][0].focus();
      });
    },
    handleQuestionTitleClick(index, ref) {
      this.questionTitleEditing = true;
      this.currentQuestionTitleIndex = index;
      this.$nextTick(() => {
        this.$refs[ref][0].focus();
      });
    },

    deleteQuestion(index) {
      this.questionnaire.questions = this.questionnaire.questions.filter(
        (item, i) => i !== index
      );
    },

    addQuestion(command) {
      this.questionnaire.questions.push(getTemplate(command));
    },

    release() {

      // 发布成功的逻辑
      this.$message({
        type: "success",
        message: "发布成功"
      });
    },

    preview() {
      this.$store.commit("SET_QUESTIONNAIRE", this.questionnaire);
      this.$router.push("/preview");
    }
  }
};
</script>
<style scoped lang='scss'>
.edit {
  padding-bottom: 5rem;
}
.header {
  padding: 1.5rem 2rem;
  border-bottom: solid 1px #e6e6e6;
  margin-bottom: 1rem;
}
.delete-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  position: relative;
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

.operation {
  margin: 1rem 3rem;
  display: flex;
  justify-content: center;
}

.release-button {
  width: 6rem;
  margin-left: 2rem;
}
</style>