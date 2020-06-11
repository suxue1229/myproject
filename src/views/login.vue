<template>
  <div class='login-box'>
    <form class='login-form'>
      <h3 class='title'>洱源污水处理智慧管理平台</h3>
      <div class='input-box username'>
        <el-input type="text" autofocus required="required" placeholder="请输入用户名" prefix-icon="el-icon-user" v-model.trim="user.loginForm.username"> </el-input>
      </div>
      <div class='input-box password'>
        <el-input placeholder="请输入密码" required="required" prefix-icon="el-icon-lock" @keyup.enter="Login" v-model.trim="user.loginForm.password" show-password></el-input>
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
// import QS from 'qs'
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
  computed: {
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    Login () {
      if (this.user.loginForm.username === '' || this.user.loginForm.password === '') {
        alert('账号或密码不能为空')
      } else {
        this.$store.dispatch('user_authorize', this.user)
          .then(() => {
            // this.getUserInfo()
            this.$router.push('/')
          }
          ).catch(error => {
            alert('账号或密码错误')
            console.log(error)
          })
      }
    },
    getUserInfo () {
      this.$store.dispatch('user_account')
    }
  }
}
</script>
<style scoped>
  .login-box{
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #2d3a4b;
  }
  .login-box .login-form{
    position: absolute;
    width: 400px;
    padding: 35px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
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
