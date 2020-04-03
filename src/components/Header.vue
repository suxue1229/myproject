<template>
  <header class="navbar header-style">
      <div class="navbar navbar-default ">
        <div class="navbar-header">
          <a href="#" class="navbar-brand">
            <img alt="Brand" class="logo" src="/static/img/logo.png">
          </a>
        </div>
        <ul class="nav narbar-nav">
          <li><h1 class="narbar-color">CWT污水处理智慧管理平台</h1></li>
        </ul>
      </div>
      <div class="navbar navbar-default navbar-right">
        <h3 class="narbar-color">{{formatDateTime(new Date())}}</h3>
        <i class="el-icon-user iconstyle" @click="getuserinfo"></i>
      </div>
      <userinfo class="infostyle" v-show="isshowing"></userinfo>
  </header>
</template>

<script>
import userinfo from './UserInfo'
export default {
  name: 'Header',
  data () {
    return {
      isshowing: false
    }
  },
  components: {
    userinfo
  },
  created () {
    if (window.sessionStorage.getItem('loginForm')) {
    }
  },
  methods: {
    // 时间戳转日期格式
    formatDateTime: function (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      var second = date.getSeconds()
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    getuserinfo () {
      if (!this.isshowing) {
        this.isshowing = true
      } else {
        this.isshowing = false
      }
    }
  }
}
</script>

<style scoped>
  .header-style{
    position: fixed;
    width: 100%;
    top: 0px;
    padding: 0;
    background: #304156;
    border-bottom: solid 1px rgba(16,46,86,.8);
  }
  .logo{
    width: 100%;
      height: 100%;
  }
  .narbar-color{
    color: #BFCBD9;
  }
  .iconstyle{
  font-size: 28px;
  color: #BFCBD9;
  margin-left: 30px;
  flex: 0.2;
}
.infostyle {
  position: fixed;
  margin-left: 85%;
  z-index: 9999 !important;
}
</style>
