<template>
  <header class="main-style">
    <div class="navbar header-style">
        <div class="navbar ">
          <div class="navbar-header">
            <a href="#" class="navbar-brand">
              <img alt="Brand" class="logo" src="/static/img/logo.png">
            </a>
          </div>
          <h1 class="narbar-color">CWT污水处理智慧管理平台</h1>
        </div>
        <div class="navbar ">
          <h3 class="narbar-color">{{formatDateTime(new Date())}}</h3>
          <i class="el-icon-user iconstyle" @click="getuserinfo" ></i>
        </div>
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
    this.isshowing = false
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
.main-style{
  position: fixed;
  width: 100%;
  top: 0px;
  padding: 0px;
  background: #304156;
  border-bottom: solid 1px rgba(16,46,86,.8);
  z-index: 999;
}
  .header-style{
    padding: 0px;
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
}
.infostyle {
  position: fixed;
  top:90px;
  right: 30px;
}
</style>
