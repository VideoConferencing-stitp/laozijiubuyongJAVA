<template>
  <div class='home'>
    <nav class="navbar">head</nav>
    <!-- <qrcode :value="valueNoError" :options="{ width: 200 }"></qrcode> -->
    <!-- <el-input v-model="value" placeholder="输入同步映射QR"></el-input> -->
    <div class="questionnaire__list">
      <QuestionnaireList :list="questionnaireList"/>
    </div>
  </div>
</template>
<script>
import QuestionnaireList from '../components/QuestionnaireList'
   export default {
    name: 'Home',
    components: {
      QuestionnaireList
    },
    props: {},
    data() {
      return {
        value: 'http://www.baidu.com',
        questionnaireList: [ 
          { title: "djiwajdiajw", id: 0 },
          { title: "ajdiajw", id: 1 },
          { title: "jiwajdiajw", id: 2 },
          { title: "djiwajiajw", id: 3 },
        ]
      }
    },
    computed: {
      valueNoError() {
        return !this.value ? 'http://www.baidu.com' : this.value
      }
    },
    methods: {
      handle() {
        this.$store.commit('SET_NUMBER')
      }
    }
  }
</script>
<style scoped lang='scss'>
.navbar {
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
}
</style>