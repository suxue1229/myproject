<template>
  <div class='login-box'>
    <form class='login-form'>
      <h3 class='title'>洱源污水处理智慧管理平台</h3>
      <div class='input-box username'>
        <el-input type="text" autofocus required="required" placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="loginForm.username"> </el-input>
      </div>
      <div class='input-box password'>
        <el-input placeholder="请输入密码" required="required" prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
      </div>
      <div class='register'>
        <a href="#">注册账号</a>
      </div>
      <div class='login'>
        <el-button type="primary" style="width:100%" @click="Login()">登陆</el-button>
      </div>
      <div>
        {{this.$store.getters.Authorization}}
      </div>
    </form>
  </div>
</template>
<script>
import QS from 'qs'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  // computed: {
  //   ...mapGetters(['Authorization'])
  //  },
  methods: {
    async initData () {
      let token = await this.$store.dispatch('user_authorize', QS.stringify({grant_type: 'password', username: this.loginForm.username, password: this.loginForm.password}).replace('%40', '@'))
    },
    async Login () {
      this.initData()
      let _this = this;
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        alert('账号或密码不能为空')
      } else {
          let Data = await this.$store.dispatch('user_account')
          .then(res => {
          if(res.status === 0){
            alert('true')
            _this.$router.push('/first')
            alert('登陆成功')
          }
         }).catch(error => {
          alert('账号或密码错误22')
          sessionStorage.removeItem('Authorization')
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
