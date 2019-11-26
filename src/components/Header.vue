<template>
  <header class="navbar fixed-top header-style">
      <div class="navbar navbar-default ">
        <div class="navbar-header">
          <a href="#" class="navbar-brand">
            <img alt="Brand" class="logo" src="/static/img/header-logo.png">
          </a>
        </div>
        <ul class="nav narbar-nav">
          <li><h1 class="narbar-color">CWT污水处理智慧管理平台</h1></li>
        </ul>
      </div>
      <div class="navbar navbar-default navbar-right">
        <h3 class="narbar-color">{{formatDateTime(new Date())}}</h3></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      // msg: new Date('1900/1/1 00:00:00')
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
    }
  }
}
</script>

<style scoped>
  .header-style{
    position: sticky;
    top: 0px;
    background: #060C19;
    padding: 0;
    border-bottom: solid 1px rgba(16,46,86,.8);
  }
  .logo{
      height: 50px;
  }
  .narbar-color{
    color: #28d7fe;
  }
</style>
