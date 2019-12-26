<template>
  <div class="login">
    <div class="login__wrapper">
      <h1 class="login__title">登录</h1>
      <div class="login__form">
        <el-form :model="form" ref="form">
          <el-form-item prop="account" :rules="[{ required: true, message: '账号不能为空'}]">
            <el-input
              placeholder="账号"
              type="account"
              v-model.number="form.account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
            <el-input placeholder="密码" type="password" v-model.number="form.password" show-password></el-input>
          </el-form-item>
          <el-button class="login-button" type="primary" @click="submitForm('form')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import loginApi from "../api/loginApi";

export default {
  name: "Login",
  props: {},
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 表单本地校验成功
          try {
            this.form.account = this.form.account+''
            this.form.password = this.form.password+''
            const res = await loginApi(this.form);
            const { code, msg, data } = res;
            if (code === 200) {
              this.$store.commit("SET_USER_ID", data.userId);
              this.$message({ type: "success", message: msg });
              this.$router.push("/home");
            } else {
              this.$message({ type: "error", message: msg });
            }
          } catch (e) {
            this.$message({ type: "error", message: e.message });
            console.error(e);
          }
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