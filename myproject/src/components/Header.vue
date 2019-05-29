<template>
  <header class="header">
    <div class="header-left">
      <img class="header-logo" src= "/static/header-logo.png"/>
      <span class="header-title">洱源县城镇及村落污水处理智慧管理平台</span>
    </div>
    <div class="header-right">
      <span >{{formatDateTime(new Date())}}</span>
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
  .header {
    width: 100%;
    height: 50px;
    position: relative;
    background-color: rgba(7,32,65,.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-left{
    margin-left: 2%;
    flex-grow: 4;
  }
  .header-logo{
    width: 10%;
    height: 100%;
    vertical-align: middle;
    text-align: center;
  }
  span{
    height: 50px;
    font-size: 20px;
    color: #28d7fe;
    font-weight: bold;
    text-align: center;
    line-height: 50px;
  }
  .header-title{
    margin-left: 2%;
    height: 50px;
  }
  .header-right {
    margin-right: 2%;
    flex-grow: 1;
  }
</style>
