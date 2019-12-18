<template>
  <div class="login">
    <div class="login__wrapper">
      <h1 class="login__title">登录</h1>
      <div class="login__form">
        <el-form
          :model="form"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="账号"
            prop="age"
            :rules="[{ required: true, message: '账号不能为空'},{ type: 'number', message: '账号必须为数字值'}]"
          >
            <el-input type="age" v-model.number="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="age"
            :rules="[{ required: true, message: '密码不能为空'},{ type: 'number', message: '密码必须为数字值'}]"
          >
            <el-input type="age" v-model.number="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-button class="login-button" type="primary" @click="submitForm('form')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  props: {},
  data() {
    return {
      form: {
        age: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$router.push('/home')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login__wrapper {
  width: 26rem;
  border: 3px solid gainsboro;
  box-shadow: 6px 6px 0 0 rgb(88, 88, 88);
}
.login__form {
  display: inline-block;
}
.login-button {
  width: 80%;
  margin-bottom: 2rem;
}
</style>