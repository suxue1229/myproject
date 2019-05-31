<template>
  <header id="header">
    <div class="header-left">
      <img class="header-logo" src= "/static/img/header-logo.png"/>
      <h1 class="header-title">洱源县城镇及村落污水处理智慧管理平台</h1>
    </div>
    <div class="header-right">
      <h2>{{formatDateTime(new Date())}}</h2>
    </div>
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
  #header {
    width: 100%;
    height: 60px;
    position: absolute;
    display: flex;
    color: #28d7fe;
    text-align: center;
    line-height: 60px;
    border-bottom: 3px solid hsla(0,0%,100%,.1);
  }
  #header .header-left{
    margin-left: 2%;
    height: 100%;
    flex-grow: 1;
    display: flex;
  }
  #header .header-left .header-logo{
    width: 9%;
    height: 50px;
  }
  #header .header-left .header-title{
    text-align: left;
    margin-left: 2%;
    min-width: 90%;
    flex-grow: 1;
  }
  #header .header-right {
    width: 300px;
    height: 100%;
    margin-right: 2%;
  }
</style>
