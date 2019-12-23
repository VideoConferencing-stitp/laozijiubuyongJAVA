<template>
  <div class="home">
    <!-- <qrcode :value="valueNoError" :options="{ width: 200 }"></qrcode> -->
    <!-- <el-input v-model="value" placeholder="输入同步映射QR"></el-input> -->
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
import api from "../api/getQnListApi";

export default {
  name: "Home",
  components: {
    QuestionnaireList
  },
  created() {
    this.loadQnList();
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
    loadQnList() {
      api({ userId: "123456" }).then(res => {
        console.log(res)
        this.$store.commit("SET_QUESTIONNAIRE_LIST", res.qnList);
      }).catch(e => {
        console.error(e)
      });
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