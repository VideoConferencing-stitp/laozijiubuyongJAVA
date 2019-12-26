<template>
  <div class="home">
    <div class="menu">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">我的项目</el-menu-item>
        <el-menu-item index="2" disabled>免费模版</el-menu-item>
      </el-menu>
    </div>
    <div class="controler">
      <router-link to="./edit">
        <el-button class="controler__btn-1" type="primary" size="medium">新建项目+</el-button>
      </router-link>
    </div>
    <div class="list">
      <QuestionnaireList :list="questionnaireList" />
    </div>
  </div>
</template>
<script>
import QuestionnaireList from "../components/QuestionnaireList";
import getQnListApi from "../api/getQnListApi";

export default {
  name: "Home",
  components: {
    QuestionnaireList
  },
  created() {
    this.loadQnList();
    this.$store.commit("SET_QUESTIONNAIRE", null);
  },
  computed: {
    questionnaireList() {
      return this.$store.state.user.questionnaireList;
    }
  },
  methods: {
    handle() {
      this.$store.commit("SET_NUMBER");
    },
    async loadQnList() {
      try {
        const { userId } = this.$store.state.user;
        const res = await getQnListApi({ userId });
        this.$store.commit("SET_QUESTIONNAIRE_LIST", res.qnList);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
<style scoped lang='scss'>
.menu {
  margin-bottom: 1rem;
}
.controler {
  padding: 1rem;
}
.controler__btn-1 {
}
</style>