<template>
  <div class="login">
    <div class="login__wrapper">
      <h1 class="login__title">登录</h1>
      <div class="login__form">
        <el-form
          :model="form"
          ref="form"
        >
          <el-form-item
            prop="age"
            :rules="[{ required: true, message: '账号不能为空'},{ type: 'number', message: '账号必须为数字值'}]"
          >
            <el-input placeholder="账号" type="age" v-model.number="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            prop="age"
            :rules="[{ required: true, message: '密码不能为空'},{ type: 'number', message: '密码必须为数字值'}]"
          >
            <el-input placeholder="密码" type="age" v-model.number="form.age" autocomplete="off"></el-input>
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
  padding: 1rem 3rem;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px 0px;
}
.login__title {
  margin: 1.5rem 0;
}
.login__form {
  width: 100%;
}
.login-button {
  width: 100%;
  margin-bottom: 2rem;
}
</style>