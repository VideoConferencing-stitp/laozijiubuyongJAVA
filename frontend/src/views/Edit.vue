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
          class="el-input__inner"
          :placeholder="questionnaire.title"
          @blur="titleEditing = false"
          @keyup.enter.native="titleEditing = false"
        ></el-input>
        <h1 v-else @click="handleTitleClick">{{questionnaire.title}}</h1>
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
          <el-radio-group class="el-radio-group" v-model="question.radio">
            <div
              v-for="(label, j) of question.labels"
              :key="j"
              class="lable-wrapper"
              @mouseenter="hoverLabel = true; activeLableIndex = `${i}${j}`"
              @mouseleave="hoverLabel = false"
            >
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
              <span v-show="hoverLabel && activeLableIndex === `${i}${j}`" class="label-operation">
                <i class="el-icon-remove remove-label-icon" @click="removeLable(i, j)"></i>
                <i class="el-icon-circle-plus add-label-icon" @click="addLable(i, j)"></i>
              </span>
            </div>
          </el-radio-group>
        </div>
        <!-- 多选 -->
        <div v-else-if="question.type === 'checkbox'">
          <el-checkbox-group v-model="question.checkList">
            <div
              v-for="(label, j) of question.labels"
              :key="j"
              class="lable-wrapper"
              @mouseenter="hoverLabel = true; activeLableIndex = `${i}${j}`"
              @mouseleave="hoverLabel = false"
            >
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
              <span v-show="hoverLabel && activeLableIndex === `${i}${j}`" class="label-operation">
                <i class="el-icon-remove remove-label-icon" @click="removeLable(i, j)"></i>
                <i class="el-icon-circle-plus add-label-icon" @click="addLable(i, j)"></i>
              </span>
            </div>
          </el-checkbox-group>
        </div>
        <!-- 填空 -->
        <!-- <div v-else-if="question.type === 'texteare'">
          <el-input v-model="question.value">texteare</el-input>
        </div>-->
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
        </el-dropdown-menu>
      </el-dropdown>
      <el-button-group>
        <el-button class="release-button" type="primary" @click="preview">预览</el-button>
        <el-button class="release-button" type="primary" @click="release">发布</el-button>
      </el-button-group>
    </div>

    <!-- 发布成功的信息弹层 -->
    <el-dialog title="分享问卷" :visible.sync="dialogVisible" width="25rem" @close="$router.replace('/home')">
      <div class="qr-wrapper">
        <div class="cell">
          <qrcode :value="releaseInfo.url" :options="{ width: 200 }"></qrcode>
        </div>
        <div class="cell">
          <a :href="releaseInfo.url">{{releaseInfo.url}}</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 函数返回值保证新产生的数据
// 不受响应式数据的副作用影响
const getTemplate = function(type) {
  const template = {
    radio: {
      type: "radio", // 单选
      title: "你可以添加单选题？",
      radio: "",
      labels: ["选项-1", "选项-2", "选项-3"]
    },
    checkbox: {
      type: "checkbox", // 多选
      title: "你也可以添加多选题？",
      checkList: [],
      labels: ["选项-1", "选项-2", "选项-3"]
    },
    texteare: {
      type: "texteare", //填空
      title: "我没告诉你这是个填空题？",
      value: "描述你的想法"
    }
  };
  return template[type];
};
import createQnApi from "../api/createQnApi";
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
      hoverLabel: false,
      currentRadioIndex: "",
      currentCheckboxIndex: "",
      currentTitleIndex: "",
      currentQuestionTitleIndex: "",
      activeQuestionIndex: 0,
      activeLableIndex: "",

      questionnaire: this.$store.state.questionnaire || {
        title: "这是一个正常的标题",
        questions: [getTemplate("radio"), getTemplate("checkbox")]
      },

      dialogVisible: false,

      releaseInfo: {
        url: ""
      }
    };
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

    addLable(i, j) {
      this.questionnaire.questions[i].labels.splice(j + 1, 0, "新增选项");
    },
    removeLable(i, j) {
      this.questionnaire.questions[i].labels.splice(j, 1);
    },

    addQuestion(command) {
      this.questionnaire.questions.push(getTemplate(command));
    },

    async release() {
      try {
        const userId = this.$store.state.user.userId;
        const res = await createQnApi({
          questionnaire: this.questionnaire,
          userId
        });
        const { code, msg, data } = res;
        // // 发布成功的逻辑
        if (code === 200) {
          this.releaseInfo.url = data.url;
          this.dialogVisible = true;
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
        this.$message({
          type: "error",
          message: e.message
        });
        console.error(e);
      }
    },

    preview() {
      this.$store.commit("SET_QUESTIONNAIRE", this.questionnaire);
      this.$router.push("/preview");
    },
  }
};
</script>
<style scoped lang='scss'>
// .el-input__inner {
//   text-align:center;
//   font-size: 2rem;
// }
.edit {
  padding-bottom: 5rem;
}
.header {
  padding: 1.5rem 2rem;
  border-bottom: solid 1px #e6e6e6;
  margin-bottom: 1rem;
}

.add-label-icon,
.remove-label-icon {
  font-size: 1rem;
  position: absolute;
  top: 0rem;
  right: 0rem;
}

.remove-label-icon {
  right: 1.5rem;
}
.delete-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.lable-wrapper {
  position: relative;
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
  position: relative;
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

.qr-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cell {
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>