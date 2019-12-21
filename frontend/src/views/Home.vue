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
export default {
  name: "Home",
  components: {
    QuestionnaireList
  },
  props: {},
  data() {
    return {
      value: "http://www.baidu.com",
      questionnaireList: [
        { title: "术语速查手册 - Apache ECharts (incubating)", id: 0 },
        { title: "Vue.js 源码构建", id: 1 },
        { title: "2-3 运行架构设计模板", id: 2 },
        { title: "生成活码和生成二维码有什么区别", id: 3 }
      ]
    };
  },
  computed: {
    valueNoError() {
      return !this.value ? "http://www.baidu.com" : this.value;
    }
  },
  methods: {
    handle() {
      this.$store.commit("SET_NUMBER");
    }
  }
};
</script>
<style scoped lang='scss'>
.menu {
  margin-bottom: 1rem;
}
.controler__btn-1{
}
</style>