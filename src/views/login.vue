<template>
  <div class='login-box'>
    <form class='login-form'>
      <h3 class='title'>洱源污水处理智慧管理平台</h3>
      <div class='input-box username'>
        <el-input type="text" autofocus required="required" placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="user.loginForm.username"> </el-input>
      </div>
      <div class='input-box password'>
        <el-input placeholder="请输入密码" required="required" prefix-icon="el-icon-lock" @keyup.enter="Login" v-model="user.loginForm.password" show-password></el-input>
      </div>
      <div class='register'>
        <a href="#">注册账号</a>
      </div>
      <div class='login'>
        <el-button type="primary" style="width:100%" @click="Login" >登陆</el-button>
      </div>
    </form>
  </div>
</template>
<script>
import QS from 'qs'
export default {
  name: 'login',
  data () {
    return {
      user: {
        loginForm: {
          username: '',
          password: ''
        }
      }
    }
  },
  methods: {
    Login () {
      let _this = this
      if (this.user.loginForm.username === '' || this.user.loginForm.password === '') {
        alert('账号或密码不能为空')
      } else {
        this.$axios.post(this.HOST + '/user/authorize', QS.stringify({grant_type: 'password', username: this.user.loginForm.username, password: this.user.loginForm.password}).replace('%40', '@'), {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'}})
          .then(res => {
            this.$store.dispatch('user_authorize', res.data)
            this.$axios.defaults.headers.common['Authorization'] = this.$store.getters.Authorization
            _this.$router.push('/overview')
          })
          .catch(error => {
            alert('账号或密码错误')
            console.log(error)
          })
      }
    }
  }
}
</script>
<style scoped>
  .login-box{
    position: relative;
    width: 100%;
    height: 100%;
    height: 100vh;
    background-color: #2d3a4b;
  }
  .login-box .login-form{
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .login-box .login-form .title{
    font-size: 26px;
    font-weight: 400;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-box .login-form .input-box{
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 20px;
    position: relative;
    font-size: 14px;
  }
  .login-box .login-form .register{
    overflow: hidden;
  }
  .login-box .login-form .register a{
    float:right;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    color: rgb(64, 158, 255);
    padding: 0px 0px 15px;
  }
  .login-box .login-form .login{
   line-height: 40px;
   font-size: 14px;
  }
</style>
